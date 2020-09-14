---
title: 'IE报vuex requires a Promise polyfill in this browser问题解决' 
date: 2019-01-13 2:30:11
hidden: true
slug: c4akic2dr4b
categories: [reprint]
---

{{< raw >}}

                    
<p>解决方法<br>第一步： 安装 babel-polyfill 。 babel-polyfill可以模拟ES6使用的环境，可以使用ES6的所有新方法</p>
<p>npm install --save babel-polyfill</p>
<p>第二步： 在 Webpack/Browserify/Node中使用</p>
<p>在webpack.config.js文件中，使用</p>
<p>module.exports = {<br>  entry: {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app: [&quot;babel-polyfill&quot;, &quot;./src/main.js&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">app:</span> [<span class="hljs-string">"babel-polyfill"</span>, <span class="hljs-string">"./src/main.js"</span>]</code></pre>
<p>}<br>};</p>
<p>替换</p>
<p>module.exports = {<br>  entry: {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app:  './src/main.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">app:</span>  <span class="hljs-string">'./src/main.js'</span></code></pre>
<p>}<br>}</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IE报vuex requires a Promise polyfill in this browser问题解决

## 原文链接
[https://segmentfault.com/a/1190000009703763](https://segmentfault.com/a/1190000009703763)

