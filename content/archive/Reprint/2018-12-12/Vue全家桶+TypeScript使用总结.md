---
title: 'Vue全家桶+TypeScript使用总结' 
date: 2018-12-12 2:30:10
hidden: true
slug: o1z1pqgjii
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>最近重构了我之前项目 qq 音乐移动端，使用的技术是 vue，vuex，vue-router，和 typescript，在这期间，遇到的问题还是蛮多的，一会儿我会把我遇到的问题以及解决方法列出来，避免忘记。</blockquote>
<p>重构完成的项目 ===&gt; <a href="https://github.com/shenzekun/vue-qq-music" rel="nofollow noreferrer" target="_blank">vue-qq-music</a></p>
<p>TypeScript与Vue全家桶的配置可以参考以下两篇文章（在这里由衷感谢两位作者）：</p>
<ol>
<li><a href="https://segmentfault.com/a/1190000011744210#articleHeader12">vue + typescript 新项目起手式</a></li>
<li><a href="https://segmentfault.com/a/1190000011864013" target="_blank">Vue2.5+ Typescript 引入全面指南 - Vuex篇</a></li>
</ol>
<h2 id="articleHeader1">TypeScript</h2>
<p>为什么我要将<code>TypeScript</code> 和 <code>Vue</code> 集成呢？因为TypeScript 有以下几个优势：</p>
<ul>
<li>
<strong>可读性</strong>。TypeScript 是 JavaScript 的超集，这意味着他支持所有的 JavaScript 语法。并在此之上对 JavaScript 添加了一些扩展，如interface等。这样会大大提升代码的可阅读性</li>
<li>
<strong>静态类型检查</strong>。静态类型检查可以避免很多不必要的错误，不用在调试的时候才发现问题。</li>
<li>
<strong>代码提示</strong>。ts 搭配 vscode，代码提示非常友好</li>
<li>
<strong>代码重构</strong>。例如全项目更改某个变量名（也可以是类名、方法名，甚至是文件名[重命名文件自动修改的是整个项目的import]），在JS中是不可能的，而TS可以轻松做到。看看下面发生了什么神奇的事情?⬇️</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013462423?w=635&amp;h=598" src="https://static.alili.tech/img/remote/1460000013462423?w=635&amp;h=598" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">遇到的问题以及解决方法</h2>
<h3 id="articleHeader3">问题一</h3>
<p>ts 无法识别$ref</p>
<p><strong>解决方法</strong><br>① 直接在 this.$refs.xxx 后面申明类型如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$refs.lyricsLines as HTMLDivElement;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$refs.lyricsLines <span class="hljs-keyword">as</span> HTMLDivElement;</code></pre>
<p>② 在<code>export default class xxx extends Vue</code>里面声明全部的$ref 的类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$refs: {
    audio: HTMLAudioElement,
    lyricsLines: HTMLDivElement
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$refs: {
    <span class="hljs-attr">audio</span>: HTMLAudioElement,
    <span class="hljs-attr">lyricsLines</span>: HTMLDivElement
}</code></pre>
<h3 id="articleHeader4">问题二</h3>
<p>ts 无法识别 require</p>
<p><strong>解决方法</strong></p>
<p>安装声明文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add @types/webpack-env -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yarn add @types/webpack-env -D</code></pre>
<h3 id="articleHeader5">问题三</h3>
<p>运行<code>npm run build</code> 出现<br><span class="img-wrap"><img data-src="/img/remote/1460000013462424?w=1320&amp;h=864" src="https://static.alili.tech/img/remote/1460000013462424?w=1320&amp;h=864" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>解决方法</strong></p>
<blockquote>You can fix this by <strong>using the most recent beta version</strong> of <code>uglifyjs-webpack-plugin</code>. Our team is working to remove completely the UglifyJsPlugin from within webpack, and instead have it as a standalone plugin.<p>If you do <code>yarn add uglifyjs-webpack-plugin@beta --dev</code> or <code>npm install uglifyjs-webpack-plugin@beta --save-dev </code>you should receive the latest beta which does successfully minify es6 syntax. We are hoping to have this released from beta extremely soon, however it should save you from errors for now!</p>
</blockquote>
<p>也就是说升级你的uglifyjs-webpack-plugin版本：<br><code>yarn add uglifyjs-webpack-plugin@beta --dev</code></p>
<h3 id="articleHeader6">问题四</h3>
<p><a href="https://github.com/kaorun343/vue-property-decorator" rel="nofollow noreferrer" target="_blank">vue-property-decorator</a> 装饰器写法不对。当时我是要把 mixins，注入到组件里，我就这样写：<br><span class="img-wrap"><img data-src="/img/remote/1460000013462425?w=1156&amp;h=288" src="https://static.alili.tech/img/remote/1460000013462425?w=1156&amp;h=288" alt="" title="" style="cursor: pointer; display: inline;"></span><br>ts提示找不到 mixin。我就很纳闷为什么找不到名字，由于官网vue-property-decorator例子太少，只好一步一步摸索?</p>
<p><strong>解决方法</strong></p>
<p>把mixins写在@Component里面...，像这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013462426?w=736&amp;h=288" src="https://static.alili.tech/img/remote/1460000013462426?w=736&amp;h=288" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">注意点</h2>
<ol>
<li>如果你引用第三方无类型声明的库，那就需要自己编写x.d.ts文件</li>
<li>如果引用 ui 组件的时候，如果控制台出现<code>Property '$xxx' does not exist on type 'App'</code>的话，那么可以在<code>vue-shim.d.ts</code>增加</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module 'vue/types/vue' {
  interface Vue {
    $xxx: any,
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> 'vue/types/vue' {
  <span class="hljs-keyword">interface</span> Vue {
    $xxx: <span class="hljs-built_in">any</span>,
  }
}</code></pre>
<h2 id="articleHeader8">最后</h2>
<p>经过几天的折腾，终于把项目重构完成，我个人认为加上 <code>TypeScript</code>，确实效率挺高了许多，不过 <code>Vue+TypeScript</code> 还是没 <code>Angular</code>支持那么完善，相信之后 vue 对于 ts 的集成会更加完善！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶+TypeScript使用总结

## 原文链接
[https://segmentfault.com/a/1190000013462418](https://segmentfault.com/a/1190000013462418)

