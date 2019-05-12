---
title: '我们要的是一个简单的react-router路由' 
date: 2018-11-23 2:30:11
hidden: true
slug: 5gjbokgdvdl
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x6211;&#x4EEC;&#x8981;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;react-router&#x8DEF;&#x7531;</h1><blockquote>&#x6211;&#x4EEC;&#x8981;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;react-router&#x8DEF;&#x7531;</blockquote><p>&#x4E60;&#x60EF;&#x4E86; vue-router &#x8DEF;&#x7531;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x518D;&#x7528;react-router&#x603B;&#x611F;&#x89C9;&#x633A;&#x9EBB;&#x70E6;&#x7684;&#x3002;</p><p>&#x90A3;&#x4E48;react&#x6709;&#x6CA1;&#x6709;&#x7528;&#x6CD5;&#x8DDF;vue-router&#x4E00;&#x6837;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;&#x8DEF;&#x7531;&#x63D2;&#x4EF6;&#x5462;&#xFF1F;</p><p>&#x7BA1;&#x5B83;&#x6709;&#x6CA1;&#x6709;&#xFF0C;&#x8F6E;&#x5B50;&#x6211;&#x5DF2;&#x7ECF;&#x9020;&#x597D;&#x4E86;&#xFF0C;&#x8BF7;&#x6536;&#x4E0B;&#x3002;</p><h1 id="articleHeader1">react-concise-router</h1><p><code>react-concise-router</code> &#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; <a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">react-router v4.x</a> &#x5C01;&#x88C5;&#x7684;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x63D2;&#x4EF6;&#x3002;</p><h2 id="articleHeader2">1&#x3001;&#x5B89;&#x88C5;</h2><p>&#x76F4;&#x63A5;&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -S react-concise-router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code class="ls" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> -S react-concise-router</code></pre><p><strong>&#x4F60;&#x8FD8;&#x9700;&#x8981;&#x5B89;&#x88C5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -S react-router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code class="ls" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> -S react-router</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -S react-router-dom" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code class="ls" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> -S react-router-dom</code></pre><h2 id="articleHeader3">2&#x3001;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x5217;&#x8868;&#x5BF9;&#x8C61;</h2><p><strong>router.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Router from &apos;react-concise-router&apos;
import Home from &apos;./views/Home&apos;
import User from &apos;./views/User&apos;
import UserInfo from &apos;./views/UserInfo&apos;
import ErrorPage from &apos;./views/Error&apos;
import view from &apos;./views/admin/view&apos;
import Dashboard from &apos;./views/admin/Dashboard&apos;

const router = new Router ({
  mode: &apos;hash&apos;,
  routes: [
    {path: &apos;/&apos;, component: Home},
    {path: &apos;/user&apos;, component: User},
    {path: &apos;/user/:userId&apos;, name: &apos;info&apos;, component: UserInfo},
    {
      path: &apos;/admin&apos;,
      component: view,
      name: &apos;admin-view&apos;,

      children: [
        {path: &apos;/&apos;, component: Dashboard},
        {path: &apos;/test&apos;, component: Dashboard},
        {component: ErrorPage}
      ]
    },
    {path: &apos;*&apos;, component: ErrorPage},
  ]
})

export default router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-concise-router&apos;</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/Home&apos;</span>
<span class="hljs-keyword">import</span> User <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/User&apos;</span>
<span class="hljs-keyword">import</span> UserInfo <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/UserInfo&apos;</span>
<span class="hljs-keyword">import</span> ErrorPage <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/Error&apos;</span>
<span class="hljs-keyword">import</span> view <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/admin/view&apos;</span>
<span class="hljs-keyword">import</span> Dashboard <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./views/admin/Dashboard&apos;</span>

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router ({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;hash&apos;</span>,
  <span class="hljs-attr">routes</span>: [
    {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-attr">component</span>: Home},
    {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/user&apos;</span>, <span class="hljs-attr">component</span>: User},
    {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/user/:userId&apos;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;info&apos;</span>, <span class="hljs-attr">component</span>: UserInfo},
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/admin&apos;</span>,
      <span class="hljs-attr">component</span>: view,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;admin-view&apos;</span>,

      <span class="hljs-attr">children</span>: [
        {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-attr">component</span>: Dashboard},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/test&apos;</span>, <span class="hljs-attr">component</span>: Dashboard},
        {<span class="hljs-attr">component</span>: ErrorPage}
      ]
    },
    {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;*&apos;</span>, <span class="hljs-attr">component</span>: ErrorPage},
  ]
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router</code></pre><p><strong>App.jsx</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import router from &apos;./router&apos;

export default class App extends React.Component {
  render () {
    return (
      &lt;div&gt;
        &lt;p&gt;wellcome !&lt;/p&gt;
        &lt;router.view /&gt;
      &lt;/div&gt;
    )
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>wellcome !<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router.view</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}
</span></code></pre><h2 id="articleHeader4">API</h2><p><strong>new Router(options)</strong> &#x521B;&#x5EFA;&#x8DEF;&#x7531;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD4;&#x56DE;router&#x3002;</p><ul><li><strong>options</strong> object &#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x7684;&#x5BF9;&#x8C61;</li><li><strong>options.mode</strong> string &#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x7C7B;&#x578B;&#xFF0C;hash|history</li><li><strong>options.routes</strong> array &#x8DEF;&#x7531;&#x5217;&#x8868;</li><li><strong>options.routes[].name</strong> string &#x8DEF;&#x7531;&#x540D;&#x79F0;&#xFF0C;&#x5982;&#x679C;&#x5F53;&#x524D;&#x5B58;&#x5728;children&#x5C5E;&#x6027;&#xFF0C;&#x8868;&#x793A;&#x8DEF;&#x7531;&#x51FA;&#x53E3;&#x540D;&#x79F0;</li><li><strong>options.routes[].path</strong> string &#x8DEF;&#x5F84;</li><li><strong>options.routes[].component</strong> Function &#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#xFF1B;&#x5982;&#x679C;&#x5F53;&#x524D;&#x5B58;&#x5728;children&#x5C5E;&#x6027;&#xFF0C;&#x8868;&#x793A;&#x5B50;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;</li><li><strong>options.routes[].children</strong> array &#x5B50;&#x8DEF;&#x7531;&#x5217;&#x8868;</li></ul><blockquote><code>options.path</code> &#x4E0D;&#x5B58;&#x5728;&#x6216;&#x8005;&#x4E3A; <code>*</code> &#x8DEF;&#x7531;&#x4F1A;&#x5F53;&#x505A;notMath&#x8DEF;&#x7531;&#xFF0C;&#x5339;&#x914D;404</blockquote><h3 id="articleHeader5">router</h3><ul><li><strong>router.route(route)</strong> &#x751F;&#x6210;url&#xFF0C;&#x7528;&#x4E8E;history.push&#x3002;</li><li><strong>router.beforeEach(cxt, next)</strong> &#x8DEF;&#x7531;&#x5207;&#x6362;&#x4E2D;&#x95F4;&#x4EF6;</li></ul><h4>router.view</h4><p><code>&lt;router.view /&gt;</code> &#x662F;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x51FA;&#x53E3;&#x7EC4;&#x4EF6;&#x3002;</p><p><strong>props</strong></p><ul><li><strong>props.name</strong> string &#x8DEF;&#x7531;&#x51FA;&#x53E3;&#x5B50;&#x540D;&#x79F0;&#xFF0C;&#x9ED8;&#x8BA4;&apos;default&apos;&#xFF1B;&#x5728; <code>options.routes[].name</code> &#x8BBE;&#x7F6E;&#x3002;</li></ul><h4>router.link</h4><p><code>router.link</code> &#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x4E8E; <code>Link</code> &#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><p><strong>props</strong></p><ul><li><strong>props.to</strong> object|string &#x8DEF;&#x5F84;&#x6216;&#x8005;&#x8DEF;&#x5F84;&#x5BF9;&#x8C61;route&#x3002;</li></ul><h4>router.beforeEach</h4><p><code>router.beforeEach</code> &#x662F;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E9B;&#x8DEF;&#x7531;&#x5207;&#x6362;&#x4E8B;&#x4EF6;&#xFF1B;&#x6BD4;&#x5982;&#x6388;&#x6743;&#x62E6;&#x622A;&#xFF0C;&#x91CD;&#x5B9A;&#x5411;&#xFF0C;&#x7B49;&#x5F85;&#x7B49;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x4F60;&#x5E94;&#x8BE5;&#x628A;&#x5B83;&#x5B9A;&#x4E49;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach = function (ctx, next) {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">router.beforeEach = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{}</code></pre><ul><li><strong>ctx</strong> &#x8FD9;&#x4E2A;&#x662F;&#x4E00;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#xFF0C;{route, router, history,...}</li><li><strong>next</strong> &#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x8BF7;&#x5728;&#x6700;&#x540E;&#x8C03;&#x7528;&#x5B83;&#xFF1B;<code>next</code> &#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x8DEF;&#x5F84;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x522B;&#x7684;&#x8DEF;&#x7531;&#x3002;</li></ul><h3 id="articleHeader6">route</h3><ul><li><strong>route.name</strong> string &#x547D;&#x540D;&#x8DEF;&#x7531;name&#xFF0C;&#x4F18;&#x5148;&#x4E8E;path</li><li><strong>route.path</strong> string &#x8DEF;&#x5F84;</li><li><strong>route.params</strong> object &#x8DEF;&#x7531;&#x53C2;&#x6570;&#x5BF9;&#x8C61;</li><li><strong>route.query</strong> object &#x67E5;&#x8BE2;&#x5B57;&#x7B26;&#x4E32;&#x5BF9;&#x8C61;</li><li><strong>route.hash</strong> string &#x94FE;&#x63A5;hash</li></ul><h1 id="articleHeader7">&#x6700;&#x540E;</h1><p>&#x5B89;&#x5229;&#x4E00;&#x4E2A;&#x8BE6;&#x7EC6;&#x7684;&#x5217;&#x5B50;&#xFF1A;<a href="https://github.com/mengdu/ant-admin-platform" rel="nofollow noreferrer" target="_blank">ant-admin-platform</a></p><p>&#x6E90;&#x7801;&#xFF1A;<a href="https://github.com/mengdu/react-concise-router" rel="nofollow noreferrer" target="_blank">react-concise-router</a></p><blockquote>&#x518D;&#x8BF4;&#x4E0B;&#xFF1A;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x51FA;&#x6765;&#x4E0D;&#x4E45;&#xFF0C;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x8BF7;&#x63D0;issues&#xFF0C;&#x611F;&#x8C22;&#x4F60;&#x7684;&#x4F7F;&#x7528;&#x3002;<br>&#x521A;&#x4ECE;&#x4E8B;react&#x5F00;&#x53D1;&#x4E0D;&#x4E45;&#xFF0C;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x5408;&#x7406;&#x7684;&#x53EF;&#x4EE5;&#x5728;&#x4E0B;&#x65B9;&#x8BC4;&#x8BBA;&#x4EA4;&#x6D41;&#x4E0B;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我们要的是一个简单的react-router路由

## 原文链接
[https://segmentfault.com/a/1190000015604765](https://segmentfault.com/a/1190000015604765)

