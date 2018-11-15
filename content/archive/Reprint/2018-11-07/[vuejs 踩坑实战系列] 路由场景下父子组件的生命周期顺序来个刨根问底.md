---
title: '[vuejs 踩坑实战系列] 路由场景下父子组件的生命周期顺序来个刨根问底'
hidden: true
categories: reprint
slug: 466e2be8
date: 2018-11-07 02:30:15
---

{{< raw >}}
<p>&#x5927;&#x5BB6;&#x4E2D;&#x79CB;&#x5047;&#x671F;&#x5FEB;&#x4E50;&#xFF0C;&#x5047;&#x671F;&#x5206;&#x4EAB;&#x4E00;&#x4E9B;&#x539F;&#x7406;&#x8BBE;&#x8BA1;&#x6587;&#x7AE0;&#x7ED9;&#x5927;&#x5BB6;</p><p><code>&#x539F;&#x521B;&#x4E0D;&#x6613;&#xFF0C;&#x6B22;&#x8FCE;&#x8F6C;&#x53D1;&#xFF0C;&#x4E00;&#x8D77;&#x5B66;&#x4E60;(&#x51CC;&#x6668;&#x5199;&#x7684;&#xFF0C;&#x4E0D;&#x5BB9;&#x6613;&#x54C8;&#xFF0C;&#x6536;&#x85CF;&#x6216;&#x8005;&#x70B9;&#x4E2A;&#x8D5E;&#x5427;)</code></p><hr><p>&#x5728;&#x5E38;&#x89C1;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x6839; App.vue &#x6587;&#x4EF6;&#xFF0C;&#x91CC;&#x9762;&#x653E;&#x7F6E;&#x4E00;&#x4E2A; router-view &#x7136;&#x540E;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#x6765;&#x5207;&#x6362;.</p><p>&#x5F88;&#x591A;&#x4EBA;&#x5728;&#x5B50;&#x7236;&#x7EC4;&#x4EF6;&#x5D4C;&#x5957;&#x5173;&#x7CFB;&#x4E0B;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x5982;&#x4F55;&#x5E94;&#x7528;&#xFF0C;&#x8C01;&#x5148;&#x8C01;&#x540E;&#xFF08;&#x6BD4;&#x5982;&#x54EA;&#x4E2A;&#x7528;&#x6765;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x6570;&#x636E;&#x4F20;&#x9012;&#xFF09;&#x7B49;&#x6709;&#x6240;&#x7591;&#x95EE;&#x3002;</p><p>&#x672C;&#x6587;&#x805A;&#x7126; <code>mounted</code> &#x4E8B;&#x4EF6;(&#x9700;&#x8981; <code>created</code> &#x7684;&#x53EF;&#x4EE5;&#x7559;&#x8A00;&#x54C8;)&#xFF0C;&#x5148;&#x629B;&#x7ED3;&#x8BBA;&#xFF1A;</p><blockquote>&#x5B50;&#x7EC4;&#x4EF6;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x5F80;&#x5916;&#x89E6;&#x53D1;&#xFF0C;&#x6700;&#x7EC8;&#x89E6;&#x53D1;&#x6839; App.vue &#x7684; mounted</blockquote><p>&#x9A8C;&#x8BC1;&#x7684;&#x505A;&#x6CD5;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><blockquote>&#x4F60;&#x53EA;&#x9700;&#x8981;&#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x7684; mounted &#x589E;&#x52A0;&#x6253;&#x5370;&#x65E5;&#x5FD7;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5177;&#x4F53;&#x6765;&#x770B;&#x770B;&#x8BBE;&#x8BA1;&#x539F;&#x7406;</blockquote><p>&#x73B0;&#x5728;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x914D;&#x7F6E;&#x4E86;&#x8DEF;&#x7531;&#xFF1A;</p><p>&#x4E00;&#x7EA7;&#x662F; /user/:id &#x4E8C;&#x7EA7;&#x662F; profile</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { 
      path: &apos;/user/:id&apos;, 
      component: User,
      children: [
        {
          // &#x5F53; /user/:id/profile &#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;
          // UserProfile &#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x5728; User &#x7684; &lt;router-view&gt; &#x4E2D;
          path: &apos;profile&apos;,
          component: UserProfile
        }
      ]
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
  route<span class="hljs-variable">s:</span> [
    { 
      path: <span class="hljs-string">&apos;/user/:id&apos;</span>, 
      componen<span class="hljs-variable">t:</span> User,
      children: [
        {
          // &#x5F53; /user/:id/<span class="hljs-keyword">profile</span> &#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;
          // UserProfile &#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x5728; User &#x7684; <span class="hljs-symbol">&lt;router-view&gt;</span> &#x4E2D;
          path: <span class="hljs-string">&apos;profile&apos;</span>,
          componen<span class="hljs-variable">t:</span> UserProfile
        }
      ]
    }
  ]
})</code></pre><p>&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x6240;&#x6709;&#x7684; <code>mounted</code> &#x6700;&#x7EC8;&#x5728;&#x5404;&#x81EA;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x662F;&#x5982;&#x4F55;<code>&#x88AB;&#x8C03;&#x7528;</code>&#x7684;&#xFF1A;</p><p>&#x901A;&#x8FC7; <code>vm.$options</code> &#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7; <code>call</code> &#x65B9;&#x6CD5;</p><p><span class="img-wrap"><img data-src="/img/bVbhokT?w=854&amp;h=556" src="https://static.alili.tech/img/bVbhokT?w=854&amp;h=556" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E0B;&#x9762;&#x7684;&#x6211;&#x4EEC;&#x53C8;&#x4F1A;&#x9047;&#x5230; vnode&#xFF08;&#x6240;&#x4EE5;&#x638C;&#x63E1;&#x5B83;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x5728;&#x524D;&#x9762;&#x7684; <a href="https://segmentfault.com/a/1190000016323531">vue.js &#x6E90;&#x7801;&#x539F;&#x521B;&#x7CFB;&#x5217; ref &#x4E0E; $refs &#x5982;&#x4F55;&#x5173;&#x8054;</a> &#x4E5F;&#x63D0;&#x5230;&#x4E86;&#x4E00;&#x4E9B; vnode&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#xFF09;&#xFF0C;&#x5C31;&#x662F;&#x4E0B;&#x9762; componentVNodeHooks &#x91CC;&#x9762;&#x7684; insert &#x51FD;&#x6570;&#x7684;<code>&#x53C2;&#x6570;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var componentVNodeHooks = {
  insert: function insert (vnode) {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> componentVNodeHooks = {
  insert: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insert</span> <span class="hljs-params">(vnode)</span> </span>{}
}</code></pre><p>&#x91CC;&#x9762;&#x5462;&#xFF0C;&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x4ECE; vnode &#x91CC;&#x9762;&#x83B7;&#x53D6; componentInstance</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var componentInstance = vnode.componentInstance;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">var componentInstance</span> = vnode.componentInstance;</code></pre><p>&#x7136;&#x540E;&#x5224;&#x65AD; <code>_isMounted</code> &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x8FC7; mounted (&#x5F88;&#x5E38;&#x7528;&#x7684;&#x72B6;&#x6001;&#x4E8C;&#x6B21;&#x786E;&#x5B9A;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x524D;&#x9762;&#x7684; _ &#x4E00;&#x822C;&#x4EE3;&#x8868;&#x5185;&#x90E8;&#x4F7F;&#x7528;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!componentInstance._isMounted) {
  componentInstance._isMounted = true;
  callHook(componentInstance, &apos;mounted&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code><span class="hljs-keyword">if</span> (!componentInstance.<span class="hljs-variable">_isMounted</span>) {
  componentInstance.<span class="hljs-variable">_isMounted</span> = <span class="hljs-literal">true</span>;
  callHook(componentInstance, <span class="hljs-string">&apos;mounted&apos;</span>);
}</code></pre><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x7528;&#x5230;&#x4E86; <code>callHook</code> &#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x4F20;&#x5165;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E5F;&#x6B63;&#x662F;&#x672C;&#x6587;&#x8BA8;&#x8BBA;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684; <code>mounted</code></p><p>&#x518D;&#x5F80;&#x540E;&#x6709;&#x4E00;&#x4E2A; invokeInsertHook &#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function invokeInsertHook (vnode, queue, initial) {
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invokeInsertHook</span> <span class="hljs-params">(vnode, queue, initial)</span> </span>{
}</code></pre><p>&#x6CE8;&#x610F;&#x4E00;&#x4E0B;&#x6E90;&#x7801;&#x91CC;&#x9762;&#x7684;&#x6CE8;&#x91CA;&#xFF1A;</p><blockquote>delay insert hooks for component root nodes, invoke them after the element is really inserted</blockquote><p>&#x8BBE;&#x7F6E;&#x4E86; <code>pendingInsert</code>(&#x540E;&#x9762;&#x4F1A;&#x5728; <code>initComponent</code> &#x4E2D;&#x4F7F;&#x7528;)&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isTrue(initial) &amp;&amp; isDef(vnode.parent)) {
  vnode.parent.data.pendingInsert = queue;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-keyword">if</span> (isTrue(initial) &amp;&amp; isDef(vnode.<span class="hljs-keyword">parent</span>)) {
  vnode.<span class="hljs-keyword">parent</span>.<span class="hljs-built_in">data</span>.pendingInsert = <span class="hljs-built_in">queue</span>;
}</code></pre><p>&#x5185;&#x90E8;&#x8BBE;&#x8BA1;&#xFF1A;&#x5FAA;&#x73AF; queue &#x8FD9;&#x4E2A;&#x5305;&#x542B; vnode &#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbholT?w=832&amp;h=926" src="https://static.alili.tech/img/bVbholT?w=832&amp;h=926" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6CE8;&#x610F;&#x4E00;&#x4E0B;&#x6807;&#x6CE8;&#x7684; <code>data.hook</code>&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4F1A;&#x4F7F;&#x7528;&#x5230;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684; <code>componentVNodeHooks</code> &#x5BF9;&#x8C61;&#x7684; <code>insert</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i &lt; queue.length; ++i) {
  queue[i].data.hook.insert(queue[i]);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; queue.<span class="hljs-built_in">length</span>; ++<span class="hljs-built_in">i</span>) {
  queue[i].data.hook.insert(queue[i]);
}</code></pre><p>&#x518D;&#x5F80;&#x4E0B;&#xFF0C;&#x5E26;&#x7740;&#x7591;&#x95EE;&#xFF1A;</p><blockquote>&#x8FD9;&#x4E2A; queue &#x662F;&#x5982;&#x4F55;&#x751F;&#x6210; vnode &#x6570;&#x7EC4;&#x7684;&#x5462;&#xFF1F;</blockquote><p>&#x6700;&#x5F00;&#x59CB;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var insertedVnodeQueue = [];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">var insertedVnodeQueue</span> = [];</code></pre><p>&#x5728;&#x521A;&#x624D;&#x7684; &#x5BF9;&#x8C61;&#x4E2D;&#x8FD8;&#x6709; <code>init</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var componentVNodeHooks = {
  init: function init () {
    // ...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> componentVNodeHooks = {
  init: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// ...</span>
  }
}</code></pre><p><code>init</code> &#x51FD;&#x6570;&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; <code>child</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = vnode.componentInstance = createComponentInstanceForVnode(...)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">var</span> child = vnode<span class="hljs-selector-class">.componentInstance</span> = createComponentInstanceForVnode(...)</code></pre><p>&#x7136;&#x540E;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x4E2A; <code>$mount</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="child.$mount(hydrating ? vnode.elm : undefined, hydrating);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code style="word-break:break-word;white-space:initial">child.<span class="hljs-variable">$mount</span>(hydrating ? vnode<span class="hljs-selector-class">.elm</span> : undefined, hydrating);</code></pre><p>&#x5728;&#x51FD;&#x6570; <code>initComponent</code> &#x4E2D;&#x4F1A;&#x7528;&#x5230;&#x4E4B;&#x524D;&#x7684; <code>pendingInsert</code>&#xFF0C;&#x800C;&#x4E14; <code>insertedVnodeQueue &#x8FD9;&#x4E2A;&#x6570;&#x7EC4;</code>&#x5BF9;&#x8C61;&#x4F1A;&#x8C03;&#x7528; <code>push</code> &#x63D2;&#x5165;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initComponent (vnode, insertedVnodeQueue) {
  if (isDef(vnode.data.pendingInsert)) {
    insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    vnode.data.pendingInsert = null;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>function initComponent (vnode, <span class="hljs-keyword">insertedVnodeQueue) </span>{
  if (isDef(vnode<span class="hljs-meta">.data</span>.pendingInsert)) {
    <span class="hljs-keyword">insertedVnodeQueue.push.apply(insertedVnodeQueue, </span>vnode<span class="hljs-meta">.data</span>.pendingInsert)<span class="hljs-comment">;</span>
    vnode<span class="hljs-meta">.data</span>.pendingInsert = null<span class="hljs-comment">;</span>
  }
}</code></pre><p>&#x5728;&#x51FD;&#x6570; <code>invokeCreateHooks</code> &#x5185;&#x90E8;<code>insertedVnodeQueue &#x8FD9;&#x4E2A;&#x6570;&#x7EC4;</code>&#x5BF9;&#x8C61;&#x4F1A;&#x8C03;&#x7528; <code>push</code> &#x63D2;&#x5165;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function invokeCreateHooks (vnode, insertedVnodeQueue) {
  i = vnode.data.hook; // Reuse variable
  if (isDef(i)) {
    if (isDef(i.insert)) { 
      insertedVnodeQueue.push(vnode); 
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invokeCreateHooks</span> <span class="hljs-params">(vnode, insertedVnodeQueue)</span> </span>{
  i = vnode.data.hook; <span class="hljs-comment">// Reuse variable</span>
  <span class="hljs-keyword">if</span> (isDef(i)) {
    <span class="hljs-keyword">if</span> (isDef(i.insert)) { 
      insertedVnodeQueue.push(vnode); 
    }
  }
}</code></pre><p>&#x5728;&#x51FD;&#x6570; <code>mountComponent</code> &#x5185;&#x90E8;&#x5F53; vm.$vnode &#x4E3A; null &#x4E5F;&#x4F1A;&#x8C03;&#x7528; <code>callHook</code>&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x5165; <code>mounted</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mountComponent () {
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, &apos;mounted&apos;);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mountComponent</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (vm.$vnode == <span class="hljs-keyword">null</span>) {
    vm._isMounted = <span class="hljs-keyword">true</span>;
    callHook(vm, <span class="hljs-string">&apos;mounted&apos;</span>);
  }
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[vuejs 踩坑实战系列] 路由场景下父子组件的生命周期顺序来个刨根问底

## 原文链接
[https://segmentfault.com/a/1190000016499274](https://segmentfault.com/a/1190000016499274)

