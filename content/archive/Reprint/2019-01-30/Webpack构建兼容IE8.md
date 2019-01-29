---
title: 'Webpack构建兼容IE8' 
date: 2019-01-30 2:30:23
hidden: true
slug: 7b773er03yn
categories: [reprint]
---

{{< raw >}}

                    
<p>IE8中运行webpack打包后的程序会出现各种问题，请注意，真的会有各种问题，所以尽可能不要在IE8上运行webpack，连淘宝都不支持IE8了，为什么我们还要兼容它呢？毕竟是十年前的东西了。但是，如果产品经理非要兼容IE8，或者目标用户就是那些用IE8的群体（暴露年龄的东西），讲道理还是可以解决的，只是要多费些脑细胞。</p>
<p>首先要知道IE8 不怎么兼容es5特性，所以要加入es5的compatibility，常用的有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--[if lt IE 9]>
    <script type=&quot;text/javascript&quot; src=&quot;/statics/vendor/es5-shim/es5-shim.min.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;/statics/vendor/es5-shim/es5-sham.min.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;/statics/vendor/respond/respond.min.js&quot;></script>
<![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;!--[<span class="hljs-keyword">if</span> lt IE <span class="hljs-number">9</span>]&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/statics/vendor/es5-shim/es5-shim.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script type=<span class="hljs-string">"text/javascript"</span> src=<span class="hljs-string">"/statics/vendor/es5-shim/es5-sham.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script type=<span class="hljs-string">"text/javascript"</span> src=<span class="hljs-string">"/statics/vendor/respond/respond.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;![endif]--&gt;</code></pre>
<p>上述中的respond.min.js是为了给bootstrap( <a href="http://getbootstrap.com" rel="nofollow noreferrer" target="_blank">http://getbootstrap.com</a> )的栅格布局做兼容，谁让IE8不支持medaiquery呢。</p>
<p>仅仅如此还是不够的，万恶的IE8还不支持__proto__，所以还要写一些小小的兼容代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       (function() {
          var testObject = {};
          if (!(Object.setPrototypeOf || testObject.__proto__)) {
              var nativeGetPrototypeOf = Object.getPrototypeOf;

              Object.getPrototypeOf = function(object) {
                  if (object.__proto__) {
                      return object.__proto__;
                  } else {
                      return nativeGetPrototypeOf.call(Object, object);
                  }
              }
          }
        })();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>       (<span class="hljs-name">function</span>() {
          var testObject = {}<span class="hljs-comment">;</span>
          if (<span class="hljs-name">!</span>(<span class="hljs-name">Object.setPrototypeOf</span> || testObject.__proto__)) {
              var nativeGetPrototypeOf = Object.getPrototypeOf;

              Object.getPrototypeOf = function(<span class="hljs-name">object</span>) {
                  if (<span class="hljs-name">object.__proto__</span>) {
                      return object.__proto__;
                  } else {
                      return nativeGetPrototypeOf.call(<span class="hljs-name">Object</span>, object)<span class="hljs-comment">;</span>
                  }
              }
          }
        })()<span class="hljs-comment">;</span></code></pre>
<p>终于可以让IE8兼容大部分的es5特性了，但是webpack引入的模块化还是可能导致很多问题，最主要的一个问题就是default。</p>
<p><span class="img-wrap"><img data-src="/img/bVGtcj?w=420&amp;h=40" src="https://static.alili.tech/img/bVGtcj?w=420&amp;h=40" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//报错来自这里
function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>//报错来自这里
<span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(obj) { <span class="hljs-keyword">return</span> <span class="hljs-type">obj</span> &amp;&amp; obj.__esModule ? obj : { <span class="hljs-type">default</span>: obj }; }</code></pre>
<p>这个问题就是export default 不被IE8支持，注意default是IE8是关键字不能用。网上有一些解决方案：</p>
<ol>
<li><p>react 项目的一个ie8兼容性问题 <a href="http://www.aliued.com/?p=3240" rel="nofollow noreferrer" target="_blank">http://www.aliued.com/?p=3240</a>  引入es3ify-loader</p></li>
<li><p>使用transform-es2015-modules-simple-commonjs <a href="https://segmentfault.com/q/1010000005095558">https://segmentfault.com/q/10...</a></p></li>
<li><p>babel-plugin-transform-es3-property-literals <a href="http://babeljs.io/docs/plugins/transform-es3-property-literals/" rel="nofollow noreferrer" target="_blank">http://babeljs.io/docs/plugin...</a></p></li>
<li><p>...</p></li>
</ol>
<p>当然还有很多其他的方案，但是要花耐心去尝试。其实最简单的方式不在代码中使用 <code>export default</code>， 写代码的时候就要充分考虑这个问题。另外，在代码中不能使用default这个关键字，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="option['default'](data)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">option[<span class="hljs-string">'default'</span>](<span class="hljs-link">data</span>)</code></pre>
<p>这样的代码在uglify之后就会还是会出现问题，一定不要用<code>default</code>.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack构建兼容IE8

## 原文链接
[https://segmentfault.com/a/1190000007699918](https://segmentfault.com/a/1190000007699918)

