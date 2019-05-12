---
title: 'JavaScript 装逼指南' 
date: 2019-02-11 2:30:49
hidden: true
slug: 0k42h9r0qfz6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Summary</h2>
<p>本文秉承着</p>
<blockquote><p>你看不懂是你sb，我写的代码就是牛逼</p></blockquote>
<p>的理念来介绍一些js的装逼技巧。</p>
<p>下面的技巧，后三个，请谨慎用于团队项目中(主要考虑到可读性的原因)，不然，leader 可能请你喝茶。</p>
<h2 id="articleHeader1">Boolean</h2>
<p>这个技巧用的很多，也非常的简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!!'fuck'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">!!<span class="hljs-string">'fuck'</span></code></pre>
<p>通过两个取反，可以强制转换为Boolean类型。较为常用。</p>
<h2 id="articleHeader2">Number</h2>
<p>这个也特别简单，String转化为Number</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+'45'
+new Date" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">+<span class="hljs-string">'45'</span>
+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span></code></pre>
<p>会自动转化为number类型的。较为常用。</p>
<h2 id="articleHeader3">IIFE</h2>
<p>这个其实非常有实用价值，不算是装逼。只是其他语言里没有这么玩的，给不太了解js的同学看那可牛逼大了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(arg) {
    // to do
})(arg)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-comment">// to do</span>
})(arg)</code></pre>
<p>实用价值在于可以防止全局污染。不过现在随着ES2015的普及已经没什么必要用这个了，我相信五年之后，这种写法就会逐渐没落。</p>
<p>自己干五年，在实习生面前装逼用也是蛮不错的嘛~</p>
<h2 id="articleHeader4">Closure</h2>
<p>闭包嘛，js 特别好玩的一个地方。上面的立即执行函数就是对闭包的一种运用。</p>
<p>不了解的回去翻翻书，知乎上也有很多讨论，可以去看看。</p>
<p>闭包用起来对初学者来说简直就是大牛的标志(其实并不是)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = function() {
    var count = 0
    return function() {
        return count++
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> counter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> count++
    }
}</code></pre>
<p>上面用到了闭包，看起来还挺装逼的吧。不过好像没什么实用价值。</p>
<p>那么这样呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isType = function(type) {
    return function(obj) {
        return toString.call(obj) == '[Object ' + type + ']';
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> isType = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">return</span> toString.call(obj) == <span class="hljs-string">'[Object '</span> + type + <span class="hljs-string">']'</span>;
    }
}</code></pre>
<p>通过高阶函数很轻松的实现判定类别。(别忘了有判定Array的Array.isArray())</p>
<p>当然，很明显，这只是基础，并不能更装逼一点。来看下一节</p>
<h2 id="articleHeader5">Event</h2>
<p>事件响应前端肯定都写烂了，一般来说如何写一个计数器呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var times = 0
var fuck = document.querySelector('.fuck')
fuck.addEventListener('click', function() {
    times++
    console.log(times)
}, false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> times = <span class="hljs-number">0</span>
<span class="hljs-keyword">var</span> fuck = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.fuck'</span>)
fuck.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    times++
    <span class="hljs-built_in">console</span>.log(times)
}, <span class="hljs-literal">false</span>)</code></pre>
<p>好像是没什么问题哦，但是！变量<code>times</code>为什么放在外面，就用了一次放在外面，命名冲突了怎么办，或者万一在外面修改了怎么办。</p>
<p>这个时候这样一个事件监听代码就比较牛逼了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fuck.addEventListener('click', (function() {
    var times = 0
    return function() {
        times++
        console.log(times)
    }
})(), false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fuck.addEventListener(<span class="hljs-string">'click'</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> times = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        times++
        <span class="hljs-built_in">console</span>.log(times)
    }
})(), <span class="hljs-literal">false</span>)</code></pre>
<p>怎么样，是不是立刻感觉不一样了。瞬间逼格高了起来！</p>
<p>通过创建一个闭包，把<code>times</code>封装到里面，然后返回函数。这个用法不太常见。</p>
<h2 id="articleHeader6">parseInt</h2>
<blockquote>
<p>高能预警</p>
<p>从这里开始，下面的代码谨慎写到公司代码里！</p>
</blockquote>
<p><code>parseInt</code>这个函数太普通了，怎么能装逼。答案是<code>~~</code></p>
<p>现在摁下<code>F12</code>，在console里复制粘贴这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~~3.14159
// => 3
~~5.678
// => 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">~~<span class="hljs-number">3.14159</span>
<span class="hljs-comment">// =&gt; 3</span>
~~<span class="hljs-number">5.678</span>
<span class="hljs-comment">// =&gt; 5</span></code></pre>
<p>这个技巧十分装逼，原理是<code>~</code>是一个叫做<strong>按位非</strong>的操作，会返回数值的反码。是二进制操作。</p>
<h2 id="articleHeader7">Hex</h2>
<p>十六进制操作。其实就是一个<code>Array.prototype.toString(16)</code>的用法</p>
<p>看到这个词脑袋里冒出的肯定是CSS的颜色。</p>
<p>做到随机的话可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(~~(Math.random()*((1<<24)-1))).toString(16)+'00000').substring(0,7)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">(~~(<span class="hljs-built_in">Math</span>.random()*((<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">24</span>)<span class="hljs-number">-1</span>))).toString(<span class="hljs-number">16</span>)+<span class="hljs-string">'00000'</span>).substring(<span class="hljs-number">0</span>,<span class="hljs-number">7</span>)</code></pre>
<blockquote><p>谢谢@scar勘误</p></blockquote>
<p>底下的原文链接非常建议去读一下，后三个技巧都是在那里学到的。</p>
<h2 id="articleHeader8">&lt;&lt;</h2>
<p>左移操作。这个操作特别叼。一般得玩 <em>C</em> 玩得多的，这个操作会懂一些。一般半路出家的前端码农可能不太了解(说的是我 ☹)。</p>
<p>这个也是二进制操作。将数值二进制左移</p>
<p>解释上面的<code>1&lt;&lt;24</code>的操作。</p>
<p>其实是1左移24位。<code>000000000000000000000001</code>左移<em>24位</em>，变成了<code>1000000000000000000000000</code></p>
<p>不信？</p>
<p>试着在console粘贴下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('1000000000000000000000000', 2) === (1 << 24)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'1000000000000000000000000'</span>, <span class="hljs-number">2</span>) === (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">24</span>)</code></pre>
<p>其实还有一种更容易理解的方法来解释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.pow(2,24) === (1 << 24)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">24</span>) === (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">24</span>)</code></pre>
<p>因为是二进制操作，所以速度是很快的。</p>
<h2 id="articleHeader9">BTW</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].forEach.call($$(&quot;*&quot;),function(a){
    a.style.outline=&quot;1px solid #&quot;+(~~(Math.random()*(1<<24))).toString(16)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[].forEach.call($$(<span class="hljs-string">"*"</span>),<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
    a.style.outline=<span class="hljs-string">"1px solid #"</span>+(~~(<span class="hljs-built_in">Math</span>.random()*(<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">24</span>))).toString(<span class="hljs-number">16</span>)
})</code></pre>
<p>翻译成正常语言就是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.forEach.call(document.querySelectorAll('*'), dom => dom.style.outline = `1px solid #${parseInt(Math.random() * Math.pow(2,24)).toString(16)}`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'*'</span>), dom =&gt; dom.style.outline = <span class="hljs-string">`1px solid #<span class="hljs-subst">${<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">24</span>)).toString(<span class="hljs-number">16</span>)}</span>`</span>)</code></pre>
<h2 id="articleHeader10">Others</h2>
<p>其他的，像是一些<strong>await</strong>, <strong>Decorators</strong>什么的。用上<strong>TypeScript</strong>基本就懂的东西我就不介绍了。</p>
<p>祝愿大家越玩越牛逼</p>
<h2 id="articleHeader11">References</h2>
<ul>
<li><p><a href="https://www.sdk.cn/news/3025" rel="nofollow noreferrer" target="_blank">从一行代码里面学点JavaScript</a></p></li>
<li><p><a href="https://www.amazon.cn/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode-js-%E6%9C%B4%E7%81%B5/dp/B00GOM5IL4/ref=sr_1_1?s=books&amp;ie=UTF8&amp;qid=1461059069&amp;sr=1-1&amp;keywords=%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BA+node.js" rel="nofollow noreferrer" target="_blank">深入浅出Node.js</a></p></li>
<li><p><a href="https://www.amazon.cn/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1-%E6%B3%BD%E5%8D%A1%E6%96%AF/dp/B007OQQVMY/ref=sr_1_1?s=books&amp;ie=UTF8&amp;qid=1461058289&amp;sr=1-1&amp;keywords=javascript+%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1" rel="nofollow noreferrer" target="_blank">JavaScript高级程序设计</a></p></li>
<li><p><a href="https://www.amazon.cn/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%BC%80%E5%8F%91%E5%AE%9E%E8%B7%B5-%E6%9B%BE%E6%8E%A2/dp/B00XJ2AU3S/ref=sr_1_1?s=books&amp;ie=UTF8&amp;qid=1461059025&amp;sr=1-1&amp;keywords=javascript+%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%BC%80%E5%8F%91%E5%AE%9E%E8%B7%B5" rel="nofollow noreferrer" target="_blank">JavaScript设计模式与开发实践</a></p></li>
</ul>
<blockquote><p>原文：<a href="https://annatarhe.github.io/2016/04/19/hack-js-code.html" rel="nofollow noreferrer" target="_blank">JavaScript 装逼指南</a><br>顺便求Web实习</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 装逼指南

## 原文链接
[https://segmentfault.com/a/1190000004972445](https://segmentfault.com/a/1190000004972445)

