# operator quickstart — app-roukisho

**この repo を「起動する」ことはできない。** 配備先の 3 ホストはどれも DNS に存在せず
（`README.md` §5）、配備される worker が転送する先の MCP router も存在しない。
`npm run dev` で SvelteKit のページは出るが、その XRPC endpoint は宛先の無い proxy である。

operator にできることは 3 つで、この文書はその 3 つの手順である:

1. **保管が壊れていないことを検査する**（§2。これがこの repo の主たる仕事）
2. **配備される成果物が実際にビルドできることを確かめる**（§3）
3. **孤立している半分がビルドできないことを確かめる**（§4）

下の手順は **2026-08-17 (UTC)** に `cloud-itonami/main`（`cd4deed`）から切った
worktree で端から端まで実走したもので、掲載している値は**そのとき実際に印字された値**
である。

実測環境: macOS (Darwin 25.3.0) / node **v26.3.0** / npm 11.12.1 / nbb **v1.4.210** /
git **2.51.0** / curl **8.7.1** / `gh` は認証済み。

---

## 0. 先に知っておくこと —— 2 つのノイズ

### (a) `error: could not read IPC response`

このワークスペースでは `git` がこれを stderr に吐くことがある。`~/.gitconfig` の
`core.fsmonitor` に由来する **このマシンの設定**であって、この repo の問題ではない。
**exit code は 0 で標準出力は正しい。** 以降の判定は各手順の**標準出力と exit code**
だけで行い、このメッセージは無視してよい。

### (b) パイプは exit code を隠す

```bash
npm install --dry-run 2>&1 | tail -5 ; echo "exit=$?"
```

これは **`tail` の exit code**（常に 0）を印字する。実際に npm は 1 で落ちている。
本当の値が要るときはリダイレクトしてから読む:

```bash
npm install --dry-run >/tmp/out.txt 2>&1 ; echo "REAL exit=$?"
```

§4 はこれを踏む手順なので、ここを間違えると**失敗を成功として記録する**。

## 1. 取ってくる

```bash
git clone git@github.com:cloud-itonami/app-roukisho.git
cd app-roukisho
```

west 管理下の checkout（`orgs/cloud-itonami/app-roukisho`）で作業する場合、remote は
`origin` ではなく **`cloud-itonami`** という名前である。`git fetch origin` は
`Please make sure you have the correct access rights` で落ちる —— repo が無いのではなく
remote 名が違う。

```bash
git remote -v
```
```
cloud-itonami	git@github.com:cloud-itonami/app-roukisho (fetch)
cloud-itonami	git@github.com:cloud-itonami/app-roukisho (push)
```

## 2. 保管検査（この repo の主たる仕事）

```bash
nbb docs/verify-custody.cljs --origin
```

実測（exit **0**）:

```
SCANNED	12 保管ファイル / 4 検査
  ok   出所 tree（再構成 vs 記録）
         got  db819fe4ee17ef22797d1fb9f6b03930465a2beb
  ok   保管ファイル数
         got  12
  ok   保管バイト数
         got  20062
  ok   出所 GitHub の実 tree（etzhayyim/root@c9e7df4b:60-apps/etzhayyim-project-roukisho）
         got  db819fe4ee17ef22797d1fb9f6b03930465a2beb
PASS — 保管対象 12 ファイルは出所と同一
```

`--origin` を外すと検査は 3 本になり network を要さない（exit 0、`SCANNED` は同じ 12）。

**何をしているか。** `git ls-tree HEAD` のルートエントリから、`migration.edn` の
`:identity :allowed-additions` が占める名前を落として `git mktree` で tree を組み直し、
`:source :tree` と比べている。手で追うならこうなる:

```bash
git ls-tree HEAD | grep -v -e 'README.edn$' -e 'migration.edn$' \
                           -e 'README.md$'  -e '\sdocs$' | git mktree
```

### この検査が捕まえるもの / 捕まえないもの

12 通りの変異を実際に当てて確かめた（無改変では exit 0）。

| 壊し方 | 結果 |
|---|---|
| 保管ファイルの中身を 1 バイト変える | **FAIL**（tree・バイト数） |
| 保管ファイルを 1 本消す | **FAIL**（tree・ファイル数・バイト数） |
| 保管ファイルを 1 本足す | **FAIL**（tree・ファイル数・バイト数） |
| 保管ファイルの名前を `:allowed-additions` に足して検査から隠す | **FAIL**（tree・ファイル数）—— 隠した分だけ再構成 tree から消えるので合わなくなる |
| `migration.edn` の `:tree` を書き換える | ローカルのみでは **FAIL**（記録と実体が食い違う）。`--origin` でも FAIL |
| `migration.edn` の `:bytes` / `:tracked-files` を書き換える | **FAIL** |
| `migration.edn` の末尾に余計なフォームを足す | **FAIL**（下記） |
| `migration.edn` を壊れた EDN にする | **exit 3**（判定できなかった） |
| `migration.edn` を消す | **exit 3** |
| `:allowed-additions` を消す | **exit 3** |
| git repo でない場所で走らせる | **exit 3** |
| `:allowed-additions` に全ルートエントリを入れる | **exit 3**（検査対象 0 件を PASS にしない） |

**exit 3 は「答えられなかった」専用の値**で、0 でも 1 でもない。測れなかった実行が
「問題なし」と同じ値を返すと、沈黙が緑として溜まる。

⚠ **`migration.edn` をリーダに読ませるとき、ファイル全体を `[` `]` で包んでいる。**
包まないと `edn/read-string` は**先頭 1 フォームしか読まず残りを黙って捨てる**ので、
末尾に何を足しても素通りする。包めば全バイトを消費させられ、フォーム数が 1 でないことも
検出できる。

⚠ **`:destination` は誰も検査していない。** 書き換えても全検査が通る。custody の錨は
`:source` 側なので影響は無いが、「この repo がどこに置かれるべきか」の記述は
この repo の中では裏付けられない。

## 3. 配備される成果物をビルドする

`wrangler.jsonc` の `main` は `svelte/.svelte-kit/cloudflare/_worker.js`。それを作る。

```bash
cd etzhayyim-wasm-roukisho-actor-r0uk15h0/svelte
npm install --no-audit --no-fund
npm run build
```

⚠ このワークスペースでは重いビルドを直接起動せず resource governor を通す
（CLAUDE.md の repo-wide mandatory）:

```bash
node /path/to/com-junkawasaki/scripts/resource-guard.mjs run build -- npm install --no-audit --no-fund
node /path/to/com-junkawasaki/scripts/resource-guard.mjs run build -- npm run build
```

実測: install exit **0**（`added 92 packages in 9s`）、build exit **0**
（`✓ built in 452ms` / `✓ built in 4.09s` / `Using @sveltejs/adapter-cloudflare ✔ done`）。

**成果物が本当に出来たか、そこに何が入っているか:**

```bash
ls .svelte-kit/cloudflare/_worker.js .svelte-kit/cloudflare/client >/dev/null && echo "artifact OK"
grep -rl 'mcp.etzhayyim.com' .svelte-kit/
grep -rl 'listOffices\|OFFICES_SEED\|中央労働基準監督署' .svelte-kit/ || echo "(src/app.ts は成果物に入っていない)"
```

実測:

```
artifact OK
.svelte-kit/output/server/entries/endpoints/xrpc/_...path_/_server.ts.js
(src/app.ts は成果物に入っていない)
```

つまり**配備される worker には `src/app.ts` の 4 メソッドが 1 つも入らない**
（`README.md` §2）。入っているのは外部 MCP router への proxy だけである。

`_worker.js` 自体は 4,335 バイトの薄い入口で、中身は `../output/server/index.js` を
import している。**`.svelte-kit/cloudflare/` だけを配ると壊れる** —— 実体は
`.svelte-kit/output/` 側にあり、相対 import がそのディレクトリの外へ出ている。

### 後片付け（重要）

**この repo に `.gitignore` は無い。** ビルドすると 3 つの未追跡物が残り、
`git add -A` のような操作で保管検査を壊す:

```bash
git status --porcelain
```
```
?? etzhayyim-wasm-roukisho-actor-r0uk15h0/svelte/.svelte-kit/
?? etzhayyim-wasm-roukisho-actor-r0uk15h0/svelte/node_modules/
?? etzhayyim-wasm-roukisho-actor-r0uk15h0/svelte/package-lock.json
```

**§2 の検査はこれらを見ない**（追跡されていないので `git ls-files` にも
`git ls-tree` にも出ない）。commit した瞬間に初めて FAIL する。消すには:

```bash
rm -rf .svelte-kit node_modules package-lock.json
```

## 4. 孤立している半分（`src/app.ts`）

```bash
cd etzhayyim-wasm-roukisho-actor-r0uk15h0
npm install --dry-run >/tmp/roukisho-npm.txt 2>&1 ; echo "REAL exit=$?"
tail -3 /tmp/roukisho-npm.txt
```

実測（**exit 1**）:

```
REAL exit=1
npm error code EUNSUPPORTEDPROTOCOL
npm error Unsupported URL Type "workspace:": workspace:*
```

`package.json` の依存が `"@etzhayyim/kotodama-host-sdk": "workspace:*"` で、その
workspace は抽出時に持って来られていない（この repo にルートの `package.json` も
lockfile も無い）。**`src/app.ts` はこの repo 単体では install も型検査もできない。**

これは壊れているのではなく、**抽出の境界がここに引かれている**ということである。
直すには出所側の workspace（`etzhayyim/root`）か、SDK の公開版が要る。

## 5. 宛先が生きているか

```bash
for u in https://www.mhlw.go.jp/ \
         https://jsite.mhlw.go.jp/tokyo-roudoukyoku/ \
         https://roukisho.etzhayyim.com/ \
         https://mcp.etzhayyim.com/xrpc/com.etzhayyim.mcp.message ; do
  printf '%-56s %s\n' "$u" "$(curl -sS -o /dev/null -w '%{http_code}' -m 15 -L "$u" 2>/dev/null || echo ERR)"
done
```

実測:

```
https://www.mhlw.go.jp/                                  200
https://jsite.mhlw.go.jp/tokyo-roudoukyoku/              200
https://roukisho.etzhayyim.com/                          000
https://mcp.etzhayyim.com/xrpc/com.etzhayyim.mcp.message 000
```

`000` は HTTP status ではなく**接続に至らなかった**という意味である。原因を分ける:

```bash
host roukisho.etzhayyim.com ; host etzhayyim.com
```

実測: `roukisho.etzhayyim.com` は答えが無く（NXDOMAIN）、`etzhayyim.com` 自体は
`104.21.51.111` に解決する。**ゾーンは在るがサブドメインが無い。**

⚠ **この節の結果を README に定数として書き写さないこと。** 到達性は測るたびに変わる。
`README.md` §5 の表は 2026-08-17 の測定値として日付付きで置いてあり、判断に使うなら
その場で測り直す。

## 6. この文書が答えていないこと

- **~320 署のディレクトリをどう backfill するか。** `src/app.ts` は
  `jsite.mhlw.go.jp` からの ingest worker を future work として挙げているだけで、
  その worker はこの repo に無い。
- **`recordCommunication` で書いた記録をどう読むか。** `listCommunications` は
  常に空を返す（`README.md` §3）。読み出し経路は実装されていない。
- **この actor を配備してよいか。** 3 ホストとも DNS に無く、`wrangler.jsonc` の
  `routes` は `etzhayyim.com` ゾーンを指している。ゾーンの所有と配備の可否は
  この repo の外の判断である。
