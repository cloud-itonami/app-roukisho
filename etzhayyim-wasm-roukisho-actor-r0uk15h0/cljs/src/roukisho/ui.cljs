(ns roukisho.ui
  (:require [roukisho.state :as state]
            [reagent.core :as reagent]))

;; appkit.core is still src/appkit/core.cljk on main — invisible to
;; shadow-cljs 2.28.20, so this surface hand-rolls its structural chrome
;; (same class contract as kafun.ui / saiban.ui: top/facts/panel) rather
;; than require a namespace shadow cannot resolve.

(defn chrome-section [label body]
  [:section {:class "panel"}
   [:h2 label]
   body])

(defn facts-grid []
  [:section {:class "facts"}
   [:div [:span "Project"] [:strong (:project @state/app-meta)]]
   [:div [:span "Routes"] [:strong (count (:routes @state/app-meta))]]
   [:div [:span "XRPC"]
    [:strong (if (:xrpc @state/app-meta) "enabled" "not configured")]]])

(defn routes-panel []
  (chrome-section "Public Routes"
    (if (seq (:routes @state/app-meta))
      [:ul (for [r (:routes @state/app-meta)] [:li r])]
      [:p {:class "muted"} "No public route is declared next to this app surface."])))

(defn vars-panel []
  (chrome-section "Runtime Bindings"
    (if (seq (:vars @state/app-meta))
      [:ul {:class "chips"} (for [v (:vars @state/app-meta)] [:li v])]
      [:p {:class "muted"} "No public vars are declared in the nearest wrangler config."])))

(defn source-panel []
  (chrome-section "Source"
    [:p {:class "path"} (:relative-path @state/app-meta)]))

(defn top-section []
  [:section {:class "top"}
   [:p (str "Cloudflare " (:kind @state/app-meta))]
   [:h1 (:title @state/app-meta)]
   [:span (:name @state/app-meta)]])

(defn root-view []
  [:main
   [top-section]
   [facts-grid]
   [routes-panel]
   [vars-panel]
   [source-panel]])
