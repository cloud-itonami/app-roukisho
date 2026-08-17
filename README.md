# app-roukisho

**労働基準監督署（労基署 / Labor Standards Inspection Office）の registry actor** —— 厚生労働省
→ 47 都道府県労働局 → 各地の労働基準監督署という階層のディレクトリと、その窓口との
通信記録（電話・FAX・郵送・来署）を追跡するために書かれた actor である。

repo 名の `roukisho` は 労基署 のローマ字表記で、それ以外の手掛かりを名前は持たない。
この節が名乗りである。

**この repo は `etzhayyim/root` からの抽出物で、保管されている 12 ファイルは出所と
バイト単位で同一である**（§6）。読む前に知っておくべき食い違いが 3 つあり（§2〜§4）、
どれも「書いてあることが実装されていない」形をしている。

---

## 1. 在庫

`git ls-files` は 15 ファイル（2026-08-17 実測、この文書と quickstart と verifier を含む）。
中身は 3 層に分かれる。

| 層 | 数 | バイト | 何か |
|---|---|---|---|
| **保管対象**（出所からそのまま） | **12** | **20,062** | `NOTICE` と `etzhayyim-wasm-roukisho-actor-r0uk15h0/` 配下すべて |
| 抽出時の生成レコード | 2 | 465 | `README.edn` / `migration.edn` |
| 後から足した文書（保管対象ではない） | 3 | 可変 | この `README.md` と `docs/` の 2 本 |

保管対象の 12 / 20,062 は `migration.edn` の `:source` に記録された値と一致する。
**この一致は検査できる**（§6）。

コード側の実体は 2 つである:

- `etzhayyim-wasm-roukisho-actor-r0uk15h0/src/app.ts`（6,104 バイト、この repo で最大の
  ファイル）—— `@etzhayyim/kotodama-host-sdk` を使う TS Worker。4 つの XRPC メソッド
  `listOffices` / `getOffice` / `recordCommunication` / `listCommunications` を登録する。
- `etzhayyim-wasm-roukisho-actor-r0uk15h0/svelte/` —— SvelteKit のアプリ。`xrpc/[...path]`
  という 1 本の endpoint を持つ。

**この 2 つは繋がっていない。** 次節がその話である。

## 2. 配備されるのは `src/app.ts` ではない

`wrangler.jsonc` の `main` は次を指している:

```
svelte/.svelte-kit/cloudflare/_worker.js
```

これは **SvelteKit のビルド出力**であって、`src/app.ts` ではない。そして
`svelte/` の中から `src/app.ts` を参照している箇所は 1 つも無い（`grep` で 0 件）。

実際にビルドして確かめた（手順と実測出力は `docs/operator-quickstart.md` §3）。
ビルドは成功し、出来た成果物の中身は:

| 探した文字列 | ビルド出力での所在 |
|---|---|
| `mcp.etzhayyim.com` | `output/server/entries/endpoints/xrpc/_...path_/_server.ts.js` に**在る** |
| `listOffices` / `OFFICES_SEED` / `中央労働基準監督署` | `.svelte-kit` 配下の**どこにも無い** |

つまり配備された worker が XRPC 要求を受けたとき実際に走るのは
`svelte/src/routes/xrpc/[...path]/+server.ts` で、これは受けた呼び出しを
**そのまま外部の MCP router (`https://mcp.etzhayyim.com/xrpc/com.etzhayyim.mcp.message`)
へ転送するだけの proxy** である。労基署ディレクトリの検索も通信記録の保存も、
この repo の中では起こらない。

**`src/app.ts` は配備経路に載っていない。** ドメインロジックを読みに来た人が最初に開く
ファイルが、動いているものではない —— このワークスペースが `verify-appview-facade` で
fleet 横断に検出している型と同じである。

さらに `src/app.ts` は**この repo だけでは型検査もできない**。依存が
`"@etzhayyim/kotodama-host-sdk": "workspace:*"` で、その workspace（ルートの
`package.json` / lockfile）は抽出時に持って来られていない。実測:

```
npm error code EUNSUPPORTEDPROTOCOL
npm error Unsupported URL Type "workspace:": workspace:*
```

## 3. 「~320 署」は 1 署である

`kotodama.jsonld` の `convoSystemPrompt` と `profile.description` は、この actor が
**~320 の労働基準監督署の authoritative なディレクトリを保持する**と述べている。

実際に入っているデータ（2026-08-17 実測）:

| 場所 | 件数 | 中身 |
|---|---|---|
| `src/app.ts` の `OFFICES_SEED` | **1** | 中央労働基準監督署（東京）のみ |
| `kotodama.jsonld` の `entities[]` | **3** | 厚生労働省 1 / 東京労働局 1 / 監督署 1 |

`src/app.ts` 自身はこれを隠していない —— コメントに
`Full 320-office directory to be backfilled from jsite.mhlw.go.jp via a follow-based
ingest worker (future work)` と書いてある。食い違っているのは `kotodama.jsonld` 側の
断定形の記述で、そこには「将来」と書かれていない。

`listCommunications` も同様に**常に空を返す**。実装は
`return { ok: true, communications: [], total: 0, ... }` で、保存された記録を読む経路が無い
（`src/app.ts` 冒頭の `Graph reads via Kysely pending.` がこれを指している）。
つまり `recordCommunication` で書いたものを、この actor から読み出す手段は無い。

## 4. トップページの数字は実物と合っていない

`svelte/src/routes/+page.svelte` は自分の設定を表示するページだが、その値は
生成時に埋め込まれた定数で、`wrangler.jsonc` の実際の値と合っていない:

| ページの表示 | `wrangler.jsonc` の実際 |
|---|---|
| `routeCount: 0` / `routes: []` | 2 本（`r0uk15h0.etzhayyim.com/*` と `roukisho.etzhayyim.com/*`） |
| `vars: []` | 9 個（`APP_*` 8 個 + `AGENTGATEWAY_MCP_ROUTER_URL`） |

ページは「No public route is declared next to this app surface.」と表示するが、
その隣の `wrangler.jsonc` は 2 本を宣言している。

## 5. 宣言されているホストは 3 つとも存在しない

2026-08-17 実測（`curl` と `host`）:

| URL | 結果 |
|---|---|
| `https://www.mhlw.go.jp/` | **200** |
| `https://jsite.mhlw.go.jp/` | **200** |
| `https://jsite.mhlw.go.jp/tokyo-roudoukyoku/` | **200** |
| `https://roukisho.etzhayyim.com/` | **NXDOMAIN** |
| `https://r0uk15h0.etzhayyim.com/` | **NXDOMAIN** |
| `https://mcp.etzhayyim.com/xrpc/com.etzhayyim.mcp.message` | **NXDOMAIN** |
| `https://etzhayyim.com/ns/kotodama/v1`（JSON-LD の `@context`） | 404（`etzhayyim.com` 自体は解決する） |

参照している**上流の出典（厚労省）は生きていて、この actor 自身の配備先は存在しない**。
`mcp.etzhayyim.com` が無いということは、§2 の proxy 経路も現状では宛先が無い。

つまり **`https://roukisho.etzhayyim.com` は動いていない。** この repo は
「かつて配備を意図された設定と、その一部の実装」を保管しているものであって、
稼働中サービスのソースではない。

## 6. 保管されていること自体は検査できる

上記の食い違いは全部「中身の話」だが、**この repo が出所を正しく保管しているか**は
暗号学的に確かめられる。`migration.edn` は出所の git tree SHA を記録している:

```
etzhayyim/root@c9e7df4b :  60-apps/etzhayyim-project-roukisho
tree                    :  db819fe4ee17ef22797d1fb9f6b03930465a2beb
```

`:identity :allowed-additions` に挙がっている追加物を除いてルート tree を再構成すると、
この SHA になるはずである。バイト総数の一致ではなく**ハッシュ**で見るので、
足し引きが相殺する改変も捕まる。

```bash
nbb docs/verify-custody.cljs            # ローカルのみ
nbb docs/verify-custody.cljs --origin   # 出所 GitHub の実 tree とも突き合わせる
```

実測（exit 0）:

```
SCANNED	12 保管ファイル / 4 検査
  ok   出所 tree（再構成 vs 記録）
  ok   保管ファイル数            12
  ok   保管バイト数              20062
  ok   出所 GitHub の実 tree（etzhayyim/root@c9e7df4b:60-apps/etzhayyim-project-roukisho）
PASS
```

`--origin` が効くのは、この検査が**この repo の外に錨を持てる**からである。
`migration.edn` の `:tree` を書き換えて改変を隠そうとしても、`--origin` は
GitHub 側の実 tree と比べるので合わなくなる。

手順の全体と、この検査が実際に何を捕まえて何を捕まえないかは
`docs/operator-quickstart.md`。

## 7. 出所と、この文書が足したもの

出所は `etzhayyim/root`（`c9e7df4b`、2026-07-19）の `60-apps/etzhayyim-project-roukisho`。
ライセンスと charter rider は `NOTICE` を参照。

**`migration.edn` の `:identity :allowed-additions` は、この文書を足したときに
3 エントリ増やした**（`README.md` / `docs/operator-quickstart.md` /
`docs/verify-custody.cljs`）。これは記録を現実に合わせるための更新で、
custody の錨である `:source` ブロック（`:revision` / `:tree` / `:tracked-files` /
`:bytes`）は 1 バイトも触っていない —— そちらを触れば §6 の検査が落ちる。

保管対象の 12 ファイルは、この文書を書く過程で 1 つも編集していない。
