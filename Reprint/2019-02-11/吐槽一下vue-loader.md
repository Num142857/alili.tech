---
title: '吐槽一下vue-loader' 
date: 2019-02-11 2:30:49
hidden: true
slug: uyyi49mtdo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>前几天在<a href="https://segmentfault.com/a/1190000004932720?_ea=731409">如何创建一个webpack loader</a>中提到我要吐槽一下vue-loader，于是今天我就来吐槽了</p></blockquote>
<p>先来看一段webpack官网的定义：</p>
<blockquote>
<p>do only a single task<br>Loaders can be chained. Create loaders for every step, instead of a loader that does everything at once.</p>
<p>This also means they should not convert to JavaScript if not necessary.</p>
<p>Example: Render HTML from a template file by applying the query parameters</p>
<p>I could write a loader that compiles the template from source, execute it and return a module that exports a string containing the HTML code. This is bad.</p>
</blockquote>
<p>啥意思？就是官方推荐一个loader应该只做一件事情，如果对于一个文件有多次处理，可以把这些处理放在不同的loader里面进行链式调用。比如我们如果要写less，那么我们的webpack配置文件中应该会出现<code>style!css!less</code>这代表我们对于一个less文件，首先要将less处理成css，然后再有css-loader进行一些处理成js可用的css，最后通过style-loader统一抛出去。</p>
<p>分工明确吧？这样的好处就是style-loader和css-loader可以复用，sass，stylus都可以这么用。</p>
<h3 id="articleHeader0">那么vue-loader做了什么呢？代码我就不贴了，直接说原理吧</h3>
<p>首先vue-loader要做的是loader一个.vue文件，这个文件中会包含html，js，css三个部分，最终的处理结果应该是css处理通过style-loader抛出去的方式，html处理成字符串，js处理成一个vue-component并require之前的html当做自己的模板，所以最终一个.vue文件最终会变成三个module</p>
<p>越是尤大神就在vue-loader里面做了这么一件事，vue-loader的最终产出如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;!!vue-style-loader!css-loader?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js!sass!./../node_modules/vue-loader/lib/selector.js?type=style&amp;index=0!./button.vue&quot;)
__vue_script__ = require(&quot;!!babel-loader?presets[]=es2015&amp;plugins[]=transform-runtime&amp;comments=false!./../node_modules/vue-loader/lib/selector.js?type=script&amp;index=0!./button.vue&quot;)
if (__vue_script__ &amp;&amp;
    __vue_script__.__esModule &amp;&amp;
    Object.keys(__vue_script__).length > 1) {
  console.warn(&quot;[vue-loader] example/button.vue: named exports in *.vue files are ignored.&quot;)}
__vue_template__ = require(&quot;!!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&amp;index=0!./button.vue&quot;)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
if (__vue_template__) {
(typeof module.exports === &quot;function&quot; ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
}
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require(&quot;vue-hot-reload-api&quot;)
  hotAPI.install(require(&quot;vue&quot;), true)
  if (!hotAPI.compatible) return
  var id = &quot;/Users/Jokcy/workspace/office/x-vue/example/button.vue&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"!!vue-style-loader!css-loader?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js!sass!./../node_modules/vue-loader/lib/selector.js?type=style&amp;index=0!./button.vue"</span>)
__vue_script__ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"!!babel-loader?presets[]=es2015&amp;plugins[]=transform-runtime&amp;comments=false!./../node_modules/vue-loader/lib/selector.js?type=script&amp;index=0!./button.vue"</span>)
<span class="hljs-keyword">if</span> (__vue_script__ &amp;&amp;
    __vue_script__.__esModule &amp;&amp;
    <span class="hljs-built_in">Object</span>.keys(__vue_script__).length &gt; <span class="hljs-number">1</span>) {
  <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"[vue-loader] example/button.vue: named exports in *.vue files are ignored."</span>)}
__vue_template__ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"!!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&amp;index=0!./button.vue"</span>)
<span class="hljs-built_in">module</span>.exports = __vue_script__ || {}
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.exports.__esModule) <span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">module</span>.exports.default
<span class="hljs-keyword">if</span> (__vue_template__) {
(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span>.exports === <span class="hljs-string">"function"</span> ? (<span class="hljs-built_in">module</span>.exports.options || (<span class="hljs-built_in">module</span>.exports.options = {})) : <span class="hljs-built_in">module</span>.exports).template = __vue_template__
}
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  <span class="hljs-built_in">module</span>.hot.accept()
  <span class="hljs-keyword">var</span> hotAPI = <span class="hljs-built_in">require</span>(<span class="hljs-string">"vue-hot-reload-api"</span>)
  hotAPI.install(<span class="hljs-built_in">require</span>(<span class="hljs-string">"vue"</span>), <span class="hljs-literal">true</span>)
  <span class="hljs-keyword">if</span> (!hotAPI.compatible) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">var</span> id = <span class="hljs-string">"/Users/Jokcy/workspace/office/x-vue/example/button.vue"</span></code></pre>
<p>其中有三个require，这几个require里面的内容前面各不相同，但是最后却有一些类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!./../node_modules/vue-loader/lib/selector.js?type=style&amp;index=0!./button.vue

!./../node_modules/vue-loader/lib/selector.js?type=script&amp;index=0!./button.vue

!./../node_modules/vue-loader/lib/selector.js?type=script&amp;index=0!./button.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>!.<span class="hljs-regexp">/../</span>node_modules<span class="hljs-regexp">/vue-loader/</span>lib<span class="hljs-regexp">/selector.js?type=style&amp;index=0!./</span>button.vue

!.<span class="hljs-regexp">/../</span>node_modules<span class="hljs-regexp">/vue-loader/</span>lib<span class="hljs-regexp">/selector.js?type=script&amp;index=0!./</span>button.vue

!.<span class="hljs-regexp">/../</span>node_modules<span class="hljs-regexp">/vue-loader/</span>lib<span class="hljs-regexp">/selector.js?type=script&amp;index=0!./</span>button.vue</code></pre>
<p>是的，都是通过vue-loader里面的一个selector.js去loader同一个.vue文件，也就是vue-loader正在loader的文件</p>
<p>所以：vue-loader根本没有处理.vue文件里面的内容！！！根本没有！他只是告诉你应该尤其他的方式来loader来处理这个文件，而且一次来还是三个（你考虑过.vue文件的感受么！！！）</p>
<p>可能到这里你们还没觉得这有什么不对。那我就来扯一扯</p>
<p>首先这个之前webpack官方的建议就不一致，vue-loader不能进行链式调用，因为他不接受在vue-loader之前处理过的内容（因为最终selector.js还是会重新去读一遍源文件），同时你也不能再vue-loader之后去修改一些内容（因为他暴露出来的内容跟原内容没半毛钱关系）。所以vue-loader是一个独立的个体，我们无法对其进行扩展，这导致我们失去了很多具有想象力的做法（比如我要做的就是对特定的.vue文件进行一些处理，自动生成文档），这样的做法让vue-loader显得有点hack，同时我们也要考虑这样的做法对未来是否真的做好了准备。</p>
<p>最近这半年进场看到尤大推广他的vue，并经常跟react比较，甚至从某些方面给人感觉vue相较react还有挺大的优越性。其实没必要这样做，现在的vue跟react根本没有可比性，vue目前的生态和react的生态相比简直就跟清朝人民见了美帝的军舰一样，这不是你一个人在四处游说vue的好处能抵消的。我并不是说vue不好，我现在在用vue做项目，目前一个vue的组件库也正在建立中，可能马上回开源，但目前来说，vue真的没有react好。</p>
<p>但不管怎样，希望尤大继续努力，可能多发展一下社区的力量，壮大一下vue的生态圈，生态圈壮大了，才能有vue更好的发展。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
吐槽一下vue-loader

## 原文链接
[https://segmentfault.com/a/1190000004944322](https://segmentfault.com/a/1190000004944322)

