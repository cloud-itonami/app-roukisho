goog.provide('roukisho.state');
if((typeof roukisho !== 'undefined') && (typeof roukisho.state !== 'undefined') && (typeof roukisho.state.app_meta !== 'undefined')){
} else {
roukisho.state.app_meta = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"routes","routes",457900162),new cljs.core.Keyword(null,"xrpc","xrpc",-1294004094),new cljs.core.Keyword(null,"relative-path","relative-path",1848635172),new cljs.core.Keyword(null,"xrpc-namespaces","xrpc-namespaces",-1634760538),new cljs.core.Keyword(null,"domains","domains",1410387719),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"nanoid","nanoid",-90964628),new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"project","project",1124394579),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"vars","vars",-2046957217)],[cljs.core.PersistentVector.EMPTY,true,"etzhayyim-wasm-roukisho-actor-r0uk15h0/cljs/src/roukisho/desktop.cljs",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["com.etzhayyim.apps.roukisho.listOffices","com.etzhayyim.apps.roukisho.getOffice","com.etzhayyim.apps.roukisho.recordCommunication","com.etzhayyim.apps.roukisho.listCommunications"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["roukisho.etzhayyim.com","r0uk15h0.etzhayyim.com"], null),"etzhayyim-wasm-roukisho-actor-r0uk15h0","r0uk15h0","Roukisho Actor R0uk15h0","etzhayyim-project-roukisho","cloudflare surface",cljs.core.PersistentVector.EMPTY]));
}
roukisho.state.app_meta_value = (function roukisho$state$app_meta_value(k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(roukisho.state.app_meta),k);
});

//# sourceMappingURL=roukisho.state.js.map
