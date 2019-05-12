---
title: 'vue-cli 配置flexible' 
date: 2018-12-26 2:30:14
hidden: true
slug: ielucnfxjw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基于vue-cli配置手淘的<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">lib-flexible</a> + rem，实现移动端自适应</h2>
<p><strong>没接触过flexible的建议先看看<a href="http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html" rel="nofollow noreferrer" target="_blank">大漠的这篇文章</a>这样你才会知道长度为什么用rem，而字体要用px</strong></p>
<ul><li><h3 id="articleHeader1">安装flexible</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install lib-flexible --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">    npm install <span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">flexible</span> --<span class="hljs-title">save</span></span></code></pre>
<ul><li><h3 id="articleHeader2">引入flexible</h3></li></ul>
<p>在项目入口文件main.js中添加如下代码，引入flexible</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'lib-flexible'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'lib-flexible'</span></code></pre>
<ul><li><h3 id="articleHeader3">px 转 rem</h3></li></ul>
<p>使用 webpack 的 px2rem-loader,自动将px转换为rem</p>
<ul><li><h3 id="articleHeader4">安装px2rem-loader</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install px2rem-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install px2rem-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<ul><li><h3 id="articleHeader5">配置px2rem-loader</h3></li></ul>
<p>在vue-cli生成的文件中,找到以下文件 build/utils.js,如下图添加配置</p>
<p><span class="img-wrap"><img data-src="/img/bVYGt3?w=683&amp;h=439" src="https://static.alili.tech/img/bVYGt3?w=683&amp;h=439" alt="配置px2remLoader" title="配置px2remLoader" style="cursor: pointer; display: inline;"></span></p>
<p>关于<code>importLoaders</code>：如若有疑问，请参考<a href="http://www.imooc.com/learn/802" rel="nofollow noreferrer" target="_blank">webpack深入与实战4-4</a><br><strong>2017.12.8更新说明：</strong>是否需要配置<code>importLoaders</code>，可参考最底部的说明。</p>
<p><span class="img-wrap"><img data-src="/img/bVX1tB?w=603&amp;h=286" src="https://static.alili.tech/img/bVX1tB?w=603&amp;h=286" alt="放入loaders数组" title="放入loaders数组" style="cursor: pointer; display: inline;"></span></p>
<ul><li><h3 id="articleHeader6">px2rem 用法</h3></li></ul>
<p>安装px2rem后，再使用px上有些不同，大家可以参考<a href="https://www.npmjs.com/package/px2rem" rel="nofollow noreferrer" target="_blank">px2rem</a>官方介绍，下面简单介绍一下。</p>
<blockquote><p>直接写px，编译后会直接转化成rem          ----  除开下面两种情况，其他长度用这个<br>在px后面添加<code>/*no*/</code>，不会转化px，会原样输出。  --- 一般border需用这个<br>在px后面添加<code>/*px*/</code>,会根据dpr的不同，生成三套代码。---- 一般字体需用这个</p></blockquote>
<p><em>示例代码</em><br>编译前（自己写的代码）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".selector {
    width: 150px;
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.selector</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>; <span class="hljs-comment">/*px*/</span>
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">28px</span>; <span class="hljs-comment">/*px*/</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>; <span class="hljs-comment">/*no*/</span>
}</code></pre>
<p>编译后（打包后的代码）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr=&quot;1&quot;] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr=&quot;2&quot;] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr=&quot;3&quot;] .selector {
    height: 96px;
    font-size: 42px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.selector</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2rem</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
}
<span class="hljs-selector-attr">[data-dpr="1"]</span> <span class="hljs-selector-class">.selector</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-attr">[data-dpr="2"]</span> <span class="hljs-selector-class">.selector</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">64px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">28px</span>;
}
<span class="hljs-selector-attr">[data-dpr="3"]</span> <span class="hljs-selector-class">.selector</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">96px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">42px</span>;
}</code></pre>
<ul><li><h3 id="articleHeader7">重启项目，就可以愉快的用设计稿上的px了。</h3></li></ul>
<hr>
<h2 id="articleHeader8">注意：坑</h2>
<ul><li>不能在index.html的头部加 name 为 viewport 的 meta 标签，flexible会自动为我们添加！</li></ul>
<h2 id="articleHeader9">更新：对外部引入css，px2rem能不能转换rem问题</h2>
<blockquote><p><strong>2017.12.8更新</strong>：在实际运用中发现对于外部引入的css文件，有时候px2rem能正常转换，有时候又不能转换，到底是什么原因呢？试验了三种不同的css引入情况，发现第一种能正常转换，二三不能正常转换，至于原因，由于才疏学浅，还是不懂，求大神解答三种引入方式的区别。</p></blockquote>
<p>如果明白了这些方法，就没必要再配置<code>cssLoader</code>的<code>importLoaders</code>了，因为下面的方法更容易控制外部引入的css是否需要转rem，而更改<code>importLoaders</code>就控制不了了，它会强制转换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style src='../assets/style.css'>
 /* px2rem能正常转换 */
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'../assets/style.css'</span>&gt;</span><span class="css">
 <span class="hljs-comment">/* px2rem能正常转换 */</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  /* px2rem不能正常转换 */
  @import '../assets/style.css';
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-comment">/* px2rem不能正常转换 */</span>
  @<span class="hljs-keyword">import</span> <span class="hljs-string">'../assets/style.css'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  /* px2rem不能正常转换 */
  @import url('../assets/style.css');

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-comment">/* px2rem不能正常转换 */</span>
  @<span class="hljs-keyword">import</span> url(<span class="hljs-string">'../assets/style.css'</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli 配置flexible

## 原文链接
[https://segmentfault.com/a/1190000011883121](https://segmentfault.com/a/1190000011883121)

