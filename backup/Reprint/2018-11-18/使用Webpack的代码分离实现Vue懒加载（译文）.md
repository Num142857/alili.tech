---
title: '使用Webpack的代码分离实现Vue懒加载（译文）' 
date: 2018-11-18 3:32:07
hidden: true
slug: 142g252zkno
categories: [reprint]
---

{{< raw >}}
<p>&#x5F53;&#x4E00;&#x4E2A;Vue&#x7684;&#x9879;&#x76EE;&#x4F53;&#x79EF;&#x53D8;&#x5F97;&#x5341;&#x5206;&#x5E9E;&#x5927;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F7F;&#x7528;Webpack&#x7684;&#x4EE3;&#x7801;&#x5206;&#x79BB;&#x529F;&#x80FD;&#x5C06;<code>Vue Components</code>&#xFF0C;<code>routes</code>&#x6216;<code>Vuex</code>&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5206;&#x79BB;&#x5E76;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x4F1A;&#x6781;&#x5927;&#x7684;&#x63D0;&#x9AD8;App&#x7684;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015894228?w=1041&amp;h=324" src="https://static.alili.tech/img/remote/1460000015894228?w=1041&amp;h=324" alt="image_1ck53hs7oe40usv1ria21scqm9.png-576.8kB" title="image_1ck53hs7oe40usv1ria21scqm9.png-576.8kB" style="cursor:pointer;display:inline"></span></p><p>&#x5728;Vue&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x4E09;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528;&#x61D2;&#x52A0;&#x8F7D;&#x548C;&#x4EE3;&#x7801;&#x5206;&#x79BB;&#x529F;&#x80FD;&#xFF1A;</p><ul><li>Vue&#x7EC4;&#x4EF6;&#xFF0C;&#x4E5F;&#x79F0;&#x4E3A;<a href="https://vuejs.org/v2/guide/components.html#Async-Components" rel="nofollow noreferrer" target="_blank">&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;</a></li><li>Vue-Router</li><li>Vuex</li></ul><p>&#x4E09;&#x8005;&#x7684;&#x5171;&#x540C;&#x70B9;&#x90FD;&#x662F;&#x4F7F;&#x7528;&#x7684;<a href="https://github.com/tc39/proposal-dynamic-import" rel="nofollow noreferrer" target="_blank">&#x52A8;&#x6001;import</a>&#xFF0C;&#x8FD9;&#x5728;Webpack&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x7248;&#x672C;&#x5C31;&#x5F00;&#x59CB;&#x88AB;&#x652F;&#x6301;&#x3002;</p><h3 id="articleHeader0"><strong>&#x5728;Vue&#x7EC4;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x61D2;&#x52A0;&#x8F7D;</strong></h3><p>&#x5728;Eggheads&#x4E2D;&#x6709;&#x5173;&#x4E8E;<a href="https://egghead.io/lessons/load-components-when-needed-with-vue-async-components" rel="nofollow noreferrer" target="_blank">&#x4F7F;&#x7528;Vue&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;</a>&#x7684;&#x89E3;&#x91CA;&#x3002;</p><p>&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x53EA;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>import</code>&#x51FD;&#x6570;&#x53BB;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;AsyncCmp&apos;, () =&gt; import(&apos;./AsyncCmp&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript" style="word-break:break-word;white-space:initial">Vue.component(<span class="hljs-string">&apos;AsyncCmp&apos;</span>, () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./AsyncCmp&apos;</span>))</code></pre><p>&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x672C;&#x5730;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  // ...
  components: {
    &apos;AsyncCmp&apos;: () =&gt; import(&apos;./AsyncCmp&apos;)
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-comment">// ...</span>
  components: {
    <span class="hljs-string">&apos;AsyncCmp&apos;</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./AsyncCmp&apos;</span>)
  }
})</code></pre><p>&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6307;&#x5411;<code>import</code>&#x51FD;&#x6570;&#xFF0C;<code>Vue</code>&#x5C06;&#x4F1A;&#x5728;&#x9700;&#x8981;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x624D;&#x6267;&#x884C;&#x8BF7;&#x6C42;&#x52A0;&#x8F7D;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x5982;&#x679C;&#x5BFC;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x662F;&#x4F7F;&#x7528;&#x547D;&#x540D;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5BFC;&#x51FA;&#x7684;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5728;<code>Promise</code>&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4E2D;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x52A0;&#x8F7D;<a href="https://github.com/JosephusPaye/Keen-UI" rel="nofollow noreferrer" target="_blank">KeenUI</a>&#x7684; UiAlert&#x7EC4;&#x4EF6;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components: {
  UiAlert: () =&gt; import(&apos;keen-ui&apos;).then(({ UiAlert }) =&gt; UiAlert)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript">components: {
  <span class="hljs-attr">UiAlert</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;keen-ui&apos;</span>).then(<span class="hljs-function">(<span class="hljs-params">{ UiAlert }</span>) =&gt;</span> UiAlert)
}</code></pre><h3 id="articleHeader1"><strong>&#x5728;Vue router&#x4E2D;&#x8FDB;&#x884C;&#x61D2;&#x52A0;&#x8F7D;</strong></h3><p>Vue router&#x5728;&#x539F;&#x751F;&#x652F;&#x6301;<a href="https://router.vuejs.org/guide/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">&#x61D2;&#x52A0;&#x8F7D;</a>&#x3002;&#x548C;&#x61D2;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x4E00;&#x6837;&#xFF0C;&#x90FD;&#x662F;&#x4F7F;&#x7528;<code>import</code>&#x51FD;&#x6570;&#x3002;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x60F3;&#x5728;<code>/login</code>&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#x4E0B;&#x61D2;&#x52A0;&#x8F7D;<code>Login</code>&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x518D;&#x4F7F;&#x7528; import Login from &apos;./login&apos;
const Login = () =&gt; import(&apos;./login&apos;)

new VueRouter({
  routes: [
    { path: &apos;/login&apos;, component: Login }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// &#x4E0D;&#x518D;&#x4F7F;&#x7528; import Login from &apos;./login&apos;</span>
<span class="hljs-keyword">const</span> Login = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./login&apos;</span>)

<span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>, <span class="hljs-attr">component</span>: Login }
  ]
})</code></pre><h3 id="articleHeader2"><strong>&#x5728;Vuex&#x4E2D;&#x8FDB;&#x884C;&#x61D2;&#x52A0;&#x8F7D;</strong></h3><p>Vuex&#x7684;<code>registerModule</code>&#x65B9;&#x6CD5;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x52A8;&#x6001;&#x7684;&#x521B;&#x5EFA;Vuex&#x7684;&#x6A21;&#x5757;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>import</code>&#x51FD;&#x6570;&#x5728;<code>Promise</code>&#x4E2D;&#x8FD4;&#x56DE;&#x6A21;&#x5757;&#x4F5C;&#x4E3A;&#x8F7D;&#x8377;&#xFF08;payload&#xFF09;&#xFF0C;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x61D2;&#x52A0;&#x8F7D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store()

...

// &#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x60F3;&#x52A0;&#x8F7D;&apos;login&apos;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;
import(&apos;./store/login&apos;).then(loginModule =&gt; {
  store.registerModule(&apos;login&apos;, loginModule)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store()

...

<span class="hljs-comment">// &#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x60F3;&#x52A0;&#x8F7D;&apos;login&apos;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;</span>
<span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./store/login&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">loginModule</span> =&gt;</span> {
  store.registerModule(<span class="hljs-string">&apos;login&apos;</span>, loginModule)
})</code></pre><h3 id="articleHeader3"><strong>&#x603B;&#x7ED3;</strong></h3><p>&#x5728;Vue + Webpack&#x4E2D;&#x662F;&#x61D2;&#x52A0;&#x8F7D;&#x5341;&#x5206;&#x7B80;&#x5355;&#x3002;&#x8D76;&#x5FEB;&#x4F7F;&#x7528;&#x4E0A;&#x9762;&#x5B66;&#x4E60;&#x5230;&#x7684;&#x65B9;&#x6CD5;&#x5C06;&#x4F60;&#x7684;Vue&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5206;&#x79BB;&#x5E76;&#x5728;&#x5B83;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x663E;&#x8457;&#x51CF;&#x5C11;&#x5E94;&#x7528;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x95F4;&#x3002;</p><blockquote>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A; <a href="https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/" rel="nofollow noreferrer" target="_blank">Lazy Loading in Vue using Webpack&apos;s Code Splitting</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Webpack的代码分离实现Vue懒加载（译文）

## 原文链接
[https://segmentfault.com/a/1190000015894225](https://segmentfault.com/a/1190000015894225)

