---
title: '聊聊 node.js 中各种 dependency' 
date: 2019-01-26 2:30:18
hidden: true
slug: 0j58in6148
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000008398822?w=600&amp;h=340" src="https://static.alili.tech/img/remote/1460000008398822?w=600&amp;h=340" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>node 项目中常见 <code>dependency</code>，<code>devDependency</code>，<code>peerDependency</code>，平时开发的时候总是遇到，但就是没细了解过它们之间的异同，今天简单深入一下，记录下来。</p>
<p>首先看下方的图，project-main 的 dependency 是 package-a，package-a 的 <em>devDependency</em> 是 package-a-1，此外，project-main 也有一个 <em>devDependency</em> 是 package-b：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── project-main
    ├── package-a (dependency)
    │   └── package-a-1 (devDependency)
    └── package-b (devDependency)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├── project-main
    ├── package<span class="hljs-_">-a</span> (dependency)
    │   └── package<span class="hljs-_">-a</span>-1 (devDependency)
    └── package-b (devDependency)
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
  &quot;name&quot;: &quot;project-main&quot;,
  &quot;dependencies&quot;: {
    &quot;package-a&quot;: &quot;^1.0.0&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;package-b&quot;: &quot;^1.0.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// package.json</span>
{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"project-main"</span>,
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"package-a"</span>: <span class="hljs-string">"^1.0.0"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"package-b"</span>: <span class="hljs-string">"^1.0.0"</span>
  }
}</code></pre>
<p>在 project-main 下执行 <code>npm install</code> 之后，package-a 和 package-b 都会被安装，但 package-a-1 不会被安装，所以你在 project-main 的 node_modules 文件夹下找不到 package-c。</p>
<h3 id="articleHeader0">dependency 与 devDependency 的异同</h3>
<p>这是 <code>dependency</code> 与 <code>devDependency</code> 的不同点之一。项目依赖的 package 的 devDependency <em>不会</em>被安装，但自身的 devDependency 会被安装，而所有的 dependency 都会被安装。如果不想安装自身的 devDependency 就使用 <code>npm install --production</code> 这个指令来，这样的话 对于 project-main 来说，它的 devDependency 也不会被安装了。</p>
<p>所以，在开发一个 node 包时，要注意区分什么时候用 dependencies 什么时候用 devDependencies，一般做测试、打包、ES6转ES5此类的工作所依赖的库就使用 devDependencies，而正常功能所依赖的包就使用 dependencies 声明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install react --save  // 做为 dependencies 安装
> npm install eslint --save-dev // 做为 devDependencies 安装" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="shell">&gt; npm install react --<span class="hljs-built_in">save</span>  <span class="hljs-comment">// 做为 dependencies 安装</span>
&gt; npm install eslint --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> <span class="hljs-comment">// 做为 devDependencies 安装</span></code></pre>
<h3 id="articleHeader1">peerDependencies</h3>
<p>还是拿上面的例子来说，假如 project-main 依赖的 package-a 的 package.json 中声明了 peerDependency 是 <code>package-apeer@^1.0.0</code>，而 project-main 中没有任何 package-apeer 的配置，此时在 project-main 下使用 <code>npm3</code> 执行 <code>npm install</code>，控制台就会告警 <code>UNMET PEER DEPENDENCY package-apeer@^1.0.0</code>，意思就是说使用到 package-a 的项目必须安装同时安装 <code>package-apeer@^1.0.0</code> ，否则程序就可能会有异常，而在 <code>npm@1</code> 和 <code>npm@2</code> 下，就不会报错而是自动把 <code>package-apeer@^1.0.0</code> 安装上，因为很多用户反应这样很困惑，我没声明这个包，你为什么要给我安装呢？所以在 <code>npm@3</code> 中这个 peerDependencies 如果没装就变成了控制台告警。</p>
<h2 id="articleHeader2">其它的 dependency</h2>
<p>其实 node 还有另外两种 dependency 配置。</p>
<h3 id="articleHeader3">bundleDependencies</h3>
<p>它还有一个别名，bundledDependencies，这个配置的作用如下：</p>
<p>对于下面这个包 package-a</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;package-a&quot;,
  &quot;dependencies&quot;: {
    &quot;react&quot;: &quot;^15.0.0&quot;,
    &quot;core-js&quot;: &quot;^2.0.0&quot;,
    &quot;lodash&quot;: &quot;^4.0.0&quot;
  },
  &quot;bundleDependencies&quot;: [
    &quot;react&quot;,
    &quot;core-js&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"package-a"</span>,
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"react"</span>: <span class="hljs-string">"^15.0.0"</span>,
    <span class="hljs-string">"core-js"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-string">"lodash"</span>: <span class="hljs-string">"^4.0.0"</span>
  },
  <span class="hljs-string">"bundleDependencies"</span>: [
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"core-js"</span>
  ]
}</code></pre>
<p>在你的项目中使用 <code>npm@3</code> 安装 package-a 之后，项目的 node_modules 的文件结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── node_modules
    ├── package-a
    │   └── react
    │   └── core-js
    └── loadsh" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── node_modules
    ├── package-<span class="hljs-selector-tag">a</span>
    │   └── react
    │   └── core-js
    └── loadsh</code></pre>
<p>bundleDependencies 的作用就是在用户安装了 package-a 之后，将 package-a 所声明的依赖包汇总到 package-a 自身的 node_modules 下，便于用户管理，如果 package-a 中没有配置 bundleDepencies，在安装了 package-a 的项目下 node_modules 就会长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── node_modules
    ├── package-a
    ├── react
    ├── core-js
    └── loadsh" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── node_modules
    ├── package-<span class="hljs-selector-tag">a</span>
    ├── react
    ├── core-js
    └── loadsh</code></pre>
<h3 id="articleHeader4">optionalDependencies</h3>
<p>如果你的node项目依赖了一个包 package-optional，假如这个 package-optional 没有安装，你仍然想让程序正常执行，这个时候 optionalDependencies 就非常适合你这个需求，optionalDependencies 跟 dependencies 声明方式完全一致，而且一个依赖如果同时在 dependencies 和 optionalDependencies 中声明，option 还会<em>覆盖</em> dependency 的声明。如果 package-optional 这个包是可选的，在代码中就可以这样写了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
    var pkgOpt = require('package-optional');
} catch (e) {
    pkgOpt = null;
}
console.log(pkgOpt);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">var</span> pkgOpt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'package-optional'</span>);
} <span class="hljs-keyword">catch</span> (e) {
    pkgOpt = <span class="hljs-literal">null</span>;
}
<span class="hljs-built_in">console</span>.log(pkgOpt);</code></pre>
<h2 id="articleHeader5">结语</h2>
<p>node package 的依赖管理在如今的前端工程化时代背景下变得尤为重要，构建优雅可维护的 node_modules 结构是值得探讨的一个话题，希望今天本文能对你有所帮助和启发。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊 node.js 中各种 dependency

## 原文链接
[https://segmentfault.com/a/1190000008398819](https://segmentfault.com/a/1190000008398819)

