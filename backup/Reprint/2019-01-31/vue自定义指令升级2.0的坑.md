---
title: 'vue自定义指令升级2.0的坑' 
date: 2019-01-31 2:31:16
hidden: true
slug: 7a1v71nfv33
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>
<p>从1.0.X版本就开始使用vue了，应该也是vue很早的一批用户。在我司使用vue这一年多以来（偏向移动端），我发现vue的插件真的是少之又少，这也是我当初一开始想写v-tap指令插件的初衷。</p>
<p>如今vue升级2.0后，在自定义指令部分的API全部变化了！对于一个插件作者来说这简直是崩溃的！毫无兼容可言。本文我就讲介绍下一个自定义指令从1.0升级到2.0所走的坑。T.T</p>
</blockquote>
<h2 id="articleHeader1">吐槽</h2>
<p>我们知道，一个方法最重要的就是<strong>传参</strong>，所以自定义指令最需要的也是这点。在实现过程中，最大的变化就是这点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.0版本能实现以下API
v-tap=&quot;args($index,el,$event)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1.0版本能实现以下API</span>
v-tap=<span class="hljs-string">"args($index,el,$event)"</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 而2.0版本后完全不能，必须使用对象的形式，如下
v-tap=&quot;{ methods:args , index : index, item:item }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 而2.0版本后完全不能，必须使用对象的形式，如下</span>
v-tap=<span class="hljs-string">"{ methods:args , index : index, item:item }"</span></code></pre>
<p>简直了！完全不知道作者为啥这样设计！（这太让我蛋碎了，如果你有更好的姿势，请尽快告诉我）</p>
<p>好吧，习惯了这样不优雅的画风之后其实还是可以勉强适应的。</p>
<h2 id="articleHeader2">踩坑</h2>
<p>一开始如果你直接实现一个指令不需要传参你会发现，vue的指令机制是直接取<code>value</code>得，所以你可以直接写<code>v-directive="func"</code>这样执行完全没有问题，在你的自定义指令中只需要 <code>binding.value.call</code>即可</p>
<p>但是如果你写了 <code>v-directive="func('aa')"</code> 你将会发现，vue的指令机制把它解析成了expression，正如文档所说（大写懵逼）</p>
<blockquote><p>expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。</p></blockquote>
<p>这又将导致了一个问题，在vue1.0中你可以写<code>v-directive="a++"</code> 这样可以直接使data里的变量a++，而在2.0中这会报错，应该都是解析成了expression的原因</p>
<p>在我使用百般姿势后，最后不得不从了文档中的最后一种写法--对象字面量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-demo=&quot;{ color: 'white', text: 'hello!' }&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-demo</span>=<span class="hljs-string">"{ color: 'white', text: 'hello!' }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => &quot;white&quot;
  console.log(binding.value.text)  // => &quot;hello!&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.directive(<span class="hljs-string">'demo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, binding</span>) </span>{
  <span class="hljs-built_in">console</span>.log(binding.value.color) <span class="hljs-comment">// =&gt; "white"</span>
  <span class="hljs-built_in">console</span>.log(binding.value.text)  <span class="hljs-comment">// =&gt; "hello!"</span>
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007622218?w=129&amp;h=107" src="https://static.alili.tech/img/remote/1460000007622218?w=129&amp;h=107" alt="" title="" style="cursor: pointer;"></span></p>
<p>那指令插件如何兼容1.0和2.0呢？我是这样处理的，分别写两个对象，判断版本不同注册不同指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vue1 = { ... };
var vue2 = { ... };

vueTap.install = function (Vue) {
    if(Vue.version.substr(0,1) > 1 ) {
        isVue2 = true;
    }
    
    Vue.directive('tap', isVue2 ? vue2 : vue1);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vue1 = { ... };
<span class="hljs-keyword">var</span> vue2 = { ... };

vueTap.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue</span>) </span>{
    <span class="hljs-keyword">if</span>(Vue.version.substr(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>) &gt; <span class="hljs-number">1</span> ) {
        isVue2 = <span class="hljs-literal">true</span>;
    }
    
    Vue.directive(<span class="hljs-string">'tap'</span>, isVue2 ? vue2 : vue1);
};</code></pre>
<p>以上就是本次自定义指令升级的两个大坑！</p>
<p><a href="https://segmentfault.com/a/1190000004108445">vue自定义指令实现v-tap插件</a></p>
<p><a href="https://github.com/MeCKodo/vue-tap" rel="nofollow noreferrer" target="_blank">github vue-tap</a></p>
<hr>
<blockquote><p>这个月的奶粉钱有没有，就看你们赞赏不啦了。</p></blockquote>
<p>Have a nice day</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue自定义指令升级2.0的坑

## 原文链接
[https://segmentfault.com/a/1190000007622215](https://segmentfault.com/a/1190000007622215)

