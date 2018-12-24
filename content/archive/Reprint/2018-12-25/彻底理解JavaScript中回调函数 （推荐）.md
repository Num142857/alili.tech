---
title: '彻底理解JavaScript中回调函数 （推荐）' 
date: 2018-12-25 2:30:11
hidden: true
slug: digrum9c228
categories: [reprint]
---

{{< raw >}}

                    
<p>在javascript中回调函数非常重要，它们几乎无处不在。像其他更加传统的编程语言都有回调函数概念，但是非常奇怪的是，完完整整谈论回调函数的在线教程比较少，倒是有一堆关于call()和apply()函数的，或者有一些简短的关于callback的使用示例。<br>首先你得先明白一点：</p>
<h2 id="articleHeader0">函数也是对象</h2>
<p>　想弄明白回调函数，首先的清楚地明白函数的规则。先来看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//可以这样创建函数
var fn = new Function(&quot;arg1&quot;, &quot;arg2&quot;, &quot;return arg1 * arg2;&quot;);
fn(2, 3);   //6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//可以这样创建函数</span>
<span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">(<span class="hljs-string">"arg1"</span>, <span class="hljs-string">"arg2"</span>, <span class="hljs-string">"return arg1 * arg2;"</span>)</span></span>;
fn(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);   <span class="hljs-comment">//6</span></code></pre>
<p>　这样做的一个好处，可以传递代码给其他函数，也可以传递正则变量或者对象（因为代码字面上只是对象而已）。<br>在javascript中，函数是比较奇怪的，但它确确实实是对象。确切地说，函数是用Function()构造函数创建的Function对象。Function对象包含一个字符串，字符串包含函数的javascript代码。</p>
<p>理解了函数也是对象，先不急聊回调函数，先看看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function say (value) {
    alert(value);
}
alert(say);
alert(say('hi js.'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span> <span class="hljs-params">(value)</span> <span class="hljs-comment">{
    alert(value);
}</span>
<span class="hljs-title">alert</span><span class="hljs-params">(say)</span>;</span>
alert(say(<span class="hljs-string">'hi js.'</span>));</code></pre>
<blockquote><p>只写变量名  say   返回的将会是 say方法本身，以字符串的形式表现出来。<br>而在变量名后加()如say()返回的就会使say方法调用后的结果，这里是弹出value的值。</p></blockquote>
<h2 id="articleHeader1">js中函数可以作为参数传递</h2>
<p>再看下面两段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function say (value) {
    alert(value);
}
function execute (someFunction, value) {
    someFunction(value);
}
execute(say, 'hi js.');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>function say (value) {
    alert(value);
}
function<span class="hljs-built_in"> execute </span>(someFunction, value) {
    someFunction(value);
}
execute(say, 'hi js.');</code></pre>
<p>与</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function execute (someFunction, value) {
    someFunction(value);
}
execute(function(value){alert(value);}, 'hi js.');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>function<span class="hljs-built_in"> execute </span>(someFunction, value) {
    someFunction(value);
}
execute(function(value){alert(value);}, 'hi js.');</code></pre>
<p>上面第一段代码是将say方法作为参数传递给execute方法 <br>第二段代码则是直接将匿名函数作为参数传递给execute方法</p>
<p>实际上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function say (value) {
    alert(value);
}
// 注意看下面,直接写say方法的方法名与下面的匿名函数可以认为是一个东西
// 这样再看上面两段代码是不是对函数可以作为参数传递就更加清晰了
say;

function (value) {
    alert(value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span> <span class="hljs-params">(value)</span> </span>{
    alert(value);
}
<span class="hljs-comment">// 注意看下面,直接写say方法的方法名与下面的匿名函数可以认为是一个东西</span>
<span class="hljs-comment">// 这样再看上面两段代码是不是对函数可以作为参数传递就更加清晰了</span>
say;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
    alert(value);
}</code></pre>
<p>这里的say或者匿名函数就被称为回调函数！</p>
<p>如果还不懂，看看下面并不是很完美的比喻：<br>你到一个商店买东西，刚好你要的东西没有货，于是你在店员那里留下了你的电话，过了几天店里有货了，店员就打了你的电话，然后你接到电话后就到店里去取了货。在这个例子里，你的电话号码就叫回调函数，你把电话留给店员就叫登记回调函数，店里后来有货了叫做触发了回调关联的事件，店员给你打电话叫做调用回调函数，你到店里去取货叫做响应回调事件。<br><span class="img-wrap"><img data-src="/img/bVYCFF?w=189&amp;h=198" src="https://static.alili.tech/img/bVYCFF?w=189&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">回调函数容易混淆点——传参</h2>
<p>两种回调函数传参的方法：</p>
<ul><li><p>将回调函数的参数作为与回调函数同等级的参数进行传递</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYCFL?w=1487&amp;h=479" src="https://static.alili.tech/img/bVYCFL?w=1487&amp;h=479" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><p>回调函数的参数在调用回调函数内部创建</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYCFM?w=1415&amp;h=594" src="https://static.alili.tech/img/bVYCFM?w=1415&amp;h=594" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<p>希望我对回调函数的一点点小总结能对大家有帮助，<br>关于回调函数还有什么问题可以在下面留言，一起交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
彻底理解JavaScript中回调函数 （推荐）

## 原文链接
[https://segmentfault.com/a/1190000012026011](https://segmentfault.com/a/1190000012026011)

