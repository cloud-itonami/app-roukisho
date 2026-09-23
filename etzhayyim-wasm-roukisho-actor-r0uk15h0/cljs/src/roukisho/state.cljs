(ns roukisho.state
  (:require [reagent.core :as reagent]))

;; App surface metadata mirroring the declared appview identity (untrusted
;; source data, read-only): title/project/kind/domains/xrpc namespaces.
;; Same surface contract as kafun.state / saiban.state — the appview declares
;; its nanoid, project, runtime and XRPC surface in kotodama.jsonld / app.ts.
(defonce app-meta
  (reagent/atom {:title "Roukisho Actor R0uk15h0"
                 :project "etzhayyim-project-roukisho"
                 :name "etzhayyim-wasm-roukisho-actor-r0uk15h0"
                 :kind "cloudflare surface"
                 :nanoid "r0uk15h0"
                 :routes []
                 :vars []
                 :domains ["roukisho.etzhayyim.com"
                           "r0uk15h0.etzhayyim.com"]
                 :xrpc-namespaces ["com.etzhayyim.apps.roukisho.listOffices"
                                   "com.etzhayyim.apps.roukisho.getOffice"
                                   "com.etzhayyim.apps.roukisho.recordCommunication"
                                   "com.etzhayyim.apps.roukisho.listCommunications"]
                 :xrpc true
                 :relative-path "etzhayyim-wasm-roukisho-actor-r0uk15h0/cljs/src/roukisho/desktop.cljs"}))

(defn app-meta-value [k]
  (get @app-meta k))
