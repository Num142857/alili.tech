---
title: '一次vue-cli 2.x项目打包优化经历（优化xlsx插件）' 
date: 2018-12-06 2:30:09
hidden: true
slug: hwu5ihn3qn
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、分析各模块打包后大小</h3>
<p>用vue-cli创建的项目，已经集成 webpack-bundle-analyzer。<br>详见文件 build/webpack.prod.conf.js，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-keyword">if</span> (config<span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.bundleAnalyzerReport</span>) {
  const BundleAnalyzerPlugin = require(<span class="hljs-string">'webpack-bundle-analyzer'</span>)<span class="hljs-selector-class">.BundleAnalyzerPlugin</span>
  webpackConfig<span class="hljs-selector-class">.plugins</span><span class="hljs-selector-class">.push</span>(new BundleAnalyzerPlugin())
}</code></pre>
<p>运行<code>npm run build --report</code>后，会提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Webpack Bundle Analyzer is started at http://127.0.0.1:8888
Use Ctrl+C to close it" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Webpack Bundle Analyzer is started <span class="hljs-keyword">at</span> <span class="hljs-keyword">http</span>://<span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">8888</span>
Use Ctrl+C <span class="hljs-built_in">to</span> <span class="hljs-built_in">close</span> <span class="hljs-keyword">it</span></code></pre>
<p>在该网址上可查看详细信息。</p>
<h3 id="articleHeader1">二、发现项目里打包后比较大的模块</h3>
<p>发现xlsx（官方github地址：<a href="https://github.com/SheetJS/js-xlsx" rel="nofollow noreferrer" target="_blank">https://github.com/SheetJS/js...</a>）打包后很大，因为在好多组件里都引用了 <code>import XLSX from 'xlsx'</code>，每个组件都会包含这个xlsx。</p>
<h3 id="articleHeader2">三、优化</h3>
<p>将引用放在 src/main.js 中，只引用一次，再绑定的Vue的prototype上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import XLSX from 'xlsx'
Vue.prototype.$XLSX = XLSX" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> XLSX <span class="hljs-keyword">from</span> <span class="hljs-string">'xlsx'</span>
Vue.prototype.$XLSX = XLSX</code></pre>
<p>其他组件里使用，直接调用<code>this.$XLSX</code>就可以了。</p>
<h3 id="articleHeader3">四、结论</h3>
<p>一次引用，绑定到Vue的prototype上，在组件里使用。这样能避免组件每次都import，也避免组件打包后很大。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一次vue-cli 2.x项目打包优化经历（优化xlsx插件）

## 原文链接
[https://segmentfault.com/a/1190000014284449](https://segmentfault.com/a/1190000014284449)

