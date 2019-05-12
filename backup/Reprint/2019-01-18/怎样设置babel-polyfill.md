---
title: '怎样设置babel-polyfill' 
date: 2019-01-18 2:30:35
hidden: true
slug: b0bdczljslf
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>Babel 包括一个<a href="https://segmentfault.com/n/1330000009039640">垫片</a>，这个垫片包含定制过的<a href="https://github.com/facebook/regenerator/blob/master/runtime.js" rel="nofollow noreferrer" target="_blank"><code>regenerator runtime</code></a>和<a href="https://github.com/zloirock/core-js" rel="nofollow noreferrer" target="_blank"><code>core-js</code></a>。</strong></p>
<p>他会模拟es6环境，并且倾向在应用中使用而不是当作一个库或者工具。在使用<code>babel-node</code>时会自动加载。</p>
<p>这意味着你可以使用新的内置的东西如<code>Promise</code>和<code>weakMap</code>等。静态方法如<code>Array.from</code> <code>Object.assign</code>等。实例方法<code>Array.prototype.include</code>，<code>generator</code>函数(建议你使用regenator插件).polyfill会添加到全局的环境中，作为原生的原型如<code>String</code>那样的方式执行。</p>
<p><strong>如果正在寻找那些不会定义到全局的库或者插件，查看<code>transform-runtime</code>插件。这样的话你就不能够使用上面提到的实例方法。如<code>Array.prototype.includes</code>。</strong></p>
<p><strong>提示：</strong><br>已使用ES2015的一些方法，不意味着你必须要使用<code>babel-polyfill</code>或者runtime plugin。你也许只是想要使用那些是需要用到的垫片(例如<code>Object.assign</code>)，或者那些运行环境不存在需要加载的垫片。</p>
<h2 id="articleHeader0">安装</h2>
<p><code>命令行</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save babel-polyfill" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babel-polyfill</span></code></pre>
<h2 id="articleHeader1">在Node/Browserify/webpack中使用</h2>
<p>要使用垫片你需要在应用开头的入口引入。<br><code>js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babel-polyfill&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">"babel-polyfill"</span>)</span></span></code></pre>
<p>如果你的英文入口使用ES6<code>import</code>语法，你应该在入口的开头替代导入垫片，以保证他是最先加载的：<br><code>js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span></code></pre>
<p>在<code>webpack.config.js</code>中加入<code>babel-polyfill</code>到你的入口数组：<br><code>js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:[&quot;babel-polyfill&quot;,&quot;./app/js&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry:[<span class="hljs-string">"babel-polyfill"</span>,<span class="hljs-string">"./app/js"</span>]
}</code></pre>
<h2 id="articleHeader2">在浏览器中使用</h2>
<p>在用npm下载的<code>babel-polyfill</code>文件中找到<code>dist/polyfill.js</code>文件。这个需要你在babel编译代码之前引入。你可以把它添加到你的编译文件最前面或者用&lt;script&gt;标签放到最前面。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怎样设置babel-polyfill

## 原文链接
[https://segmentfault.com/a/1190000008706628](https://segmentfault.com/a/1190000008706628)

