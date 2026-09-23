goog.provide('roukisho.ui');
roukisho.ui.chrome_section = (function roukisho$ui$chrome_section(label,body){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"panel"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),label], null),body], null);
});
roukisho.ui.facts_grid = (function roukisho$ui$facts_grid(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"facts"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Project"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),new cljs.core.Keyword(null,"project","project",1124394579).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Routes"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),cljs.core.count(new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"XRPC"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),(cljs.core.truth_(new cljs.core.Keyword(null,"xrpc","xrpc",-1294004094).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta)))?"enabled":"not configured")], null)], null)], null);
});
roukisho.ui.routes_panel = (function roukisho$ui$routes_panel(){
return roukisho.ui.chrome_section("Public Routes",((cljs.core.seq(new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5480__auto__ = (function roukisho$ui$routes_panel_$_iter__22693(s__22694){
return (new cljs.core.LazySeq(null,(function (){
var s__22694__$1 = s__22694;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__22694__$1);
if(temp__5823__auto__){
var s__22694__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22694__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22694__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22696 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22695 = (0);
while(true){
if((i__22695 < size__5479__auto__)){
var r = cljs.core._nth(c__5478__auto__,i__22695);
cljs.core.chunk_append(b__22696,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),r], null));

var G__22703 = (i__22695 + (1));
i__22695 = G__22703;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22696),roukisho$ui$routes_panel_$_iter__22693(cljs.core.chunk_rest(s__22694__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22696),null);
}
} else {
var r = cljs.core.first(s__22694__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),r], null),roukisho$ui$routes_panel_$_iter__22693(cljs.core.rest(s__22694__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta)));
})()], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"muted"], null),"No public route is declared next to this app surface."], null)));
});
roukisho.ui.vars_panel = (function roukisho$ui$vars_panel(){
return roukisho.ui.chrome_section("Runtime Bindings",((cljs.core.seq(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta))))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"chips"], null),(function (){var iter__5480__auto__ = (function roukisho$ui$vars_panel_$_iter__22697(s__22698){
return (new cljs.core.LazySeq(null,(function (){
var s__22698__$1 = s__22698;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__22698__$1);
if(temp__5823__auto__){
var s__22698__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22698__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22698__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22700 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22699 = (0);
while(true){
if((i__22699 < size__5479__auto__)){
var v = cljs.core._nth(c__5478__auto__,i__22699);
cljs.core.chunk_append(b__22700,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),v], null));

var G__22704 = (i__22699 + (1));
i__22699 = G__22704;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22700),roukisho$ui$vars_panel_$_iter__22697(cljs.core.chunk_rest(s__22698__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22700),null);
}
} else {
var v = cljs.core.first(s__22698__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),v], null),roukisho$ui$vars_panel_$_iter__22697(cljs.core.rest(s__22698__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta)));
})()], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"muted"], null),"No public vars are declared in the nearest wrangler config."], null)));
});
roukisho.ui.source_panel = (function roukisho$ui$source_panel(){
return roukisho.ui.chrome_section("Source",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"path"], null),new cljs.core.Keyword(null,"relative-path","relative-path",1848635172).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta))], null));
});
roukisho.ui.top_section = (function roukisho$ui$top_section(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"top"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Cloudflare ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta)))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(roukisho.state.app_meta))], null)], null);
});
roukisho.ui.root_view = (function roukisho$ui$root_view(){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main","main",-2117802661),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [roukisho.ui.top_section], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [roukisho.ui.facts_grid], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [roukisho.ui.routes_panel], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [roukisho.ui.vars_panel], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [roukisho.ui.source_panel], null)], null);
});

//# sourceMappingURL=roukisho.ui.js.map
