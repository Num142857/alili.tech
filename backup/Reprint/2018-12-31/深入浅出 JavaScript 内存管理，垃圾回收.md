---
title: '深入浅出 JavaScript 内存管理，垃圾回收' 
date: 2018-12-31 2:30:29
hidden: true
slug: iff1dnsnyl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>本篇文章讲解JavaScript 中垃圾回收机制，内存泄漏，结合一些常遇到的例子，相信各位看完后，会对JS 中垃圾回收机制有个深入的了解。</p>
<p><a href="https://github.com/hankzhuo/Blog/blob/master/JS/%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86.md" rel="nofollow noreferrer" target="_blank">我的github，欢迎 star</a></p>
<h2 id="articleHeader1">内存生命周期</h2>
<p>首先，不管什么程序语言，内存生命周期基本是一致的：</p>
<ul>
<li>分配你所需要的内存</li>
<li>使用分配到的内存（读、写）</li>
<li>不需要时将其释放归还</li>
</ul>
<p>&nbsp;在所有语言中第一和第二部分都很清晰。最后一步在低级语言中(C语言等)很清晰，但是在像JavaScript 等高级语言中，这一步是隐藏的、透明的。因为JavaScript 具有<strong>自动垃圾收集机制</strong>（Garbage collected ）。在编写 JS 时，不需要关心内存使用问题，所需内存分配以及无用内存的回收完全实现了自动管理。</p>
<h2 id="articleHeader2">内存泄漏</h2>
<p>内存泄漏（memory leaks），什么情况下回导致内存泄漏？可以简单理解为有些代码本来要被回收的，但没有被回收，还一直占用着操作系统内存，从而越积越多，最终会导致内存泄漏（可以理解为，内存满了，就溢出了）。</p>
<h2 id="articleHeader3">管理内存（Memory Management）</h2>
<p>分配给web浏览器的可用内存数量通常要比分配给桌面应用程序少。这样做的目的主要是处于安全方面考虑，目的是防止运行JS 的网页耗尽全部系统内存而导致系统崩溃。内存限制问题不仅会影响给变量分配内存，同时还会影响调用栈以及在一个线程中能够同时执行的语句数量。</p>
<p>因此，确保占用最少的内存可以让页面获得更好的性能。而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为 null 来释放其引用。这个方法叫做<strong>解除引用</strong>。这一做法适用于大多数的全局变量和全局对象的属性。局部变量会在他们离开执行环境时自动被解除引用。</p>
<p>解除一个值的引用并不意味着自动回收改值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收。</p>
<h2 id="articleHeader4">标记清除（Mark and Sweep）</h2>
<p>通常，<strong>垃圾收集器（garbage collector）</strong>在运行时候会给储存在内存中的所有变量都加上<strong>标记</strong>。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除的工作。</p>
<p>那标记清除具体是如何呢？有以下几种算法：</p>
<ul>
<li>在JavaScript 中，全局变量（Global）和window 对象会一直存在，不会被垃圾收集器回收；</li>
<li>递归所用到的所有（包括变量和方法），都不会被回收；</li>
<li>所有没有被标记为“活跃（active）”的，都会被认为是垃圾，收集器释放会回收垃圾，并把内存还给操作系统。</li>
</ul>
<h2 id="articleHeader5">例子：</h2>
<h3 id="articleHeader6">例一：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = 123; 
// 给数值变量分配内存

var s = &quot;azerty&quot;; 
// 给字符串分配内存

// 给对象及其包含的值分配内存
var o = {
  a: 1,
  b: null
};

// 给函数（可调用的对象）分配内存
function f(a){
  return a + 2;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> n = <span class="hljs-number">123</span>; 
<span class="hljs-comment">// 给数值变量分配内存</span>

<span class="hljs-keyword">var</span> s = <span class="hljs-string">"azerty"</span>; 
<span class="hljs-comment">// 给字符串分配内存</span>

<span class="hljs-comment">// 给对象及其包含的值分配内存</span>
<span class="hljs-keyword">var</span> o = {
  a: <span class="hljs-number">1</span>,
  b: <span class="hljs-literal">null</span>
};

<span class="hljs-comment">// 给函数（可调用的对象）分配内存</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span><span class="hljs-params">(a)</span></span>{
  <span class="hljs-keyword">return</span> a + <span class="hljs-number">2</span>;
}
</code></pre>
<h3 id="articleHeader7">例二：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
  // 此处bar 是全局变量，window.bar 可以访问，所以也不会被回收
  bar = &quot;this is a hidden global variable&quot;;
} 

function foo() {
  // 此处this 代表 window
  this.variable = &quot;potential accidental global&quot;;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(arg)</span> </span>{
  <span class="hljs-comment">// 此处bar 是全局变量，window.bar 可以访问，所以也不会被回收</span>
  bar = <span class="hljs-string">"this is a hidden global variable"</span>;
} 

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// 此处this 代表 window</span>
  <span class="hljs-keyword">this</span>.variable = <span class="hljs-string">"potential accidental global"</span>;
} 
</code></pre>
<h3 id="articleHeader8">例三：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var someResource = getData();
setInterval(function() {
  var node = document.getElementById('Node');
  if(node) {
    node.innerHTML = JSON.stringify(someResource));
  }
}, 1000);

// 上面这段代码，定时器setInterval 和 someResource 一直存在，不会被回收。可以改成下面代码

var element = document.getElementById('button');

function onClick(event) {
    element.innerHtml = 'text';
}

element.addEventListener('click', onClick);
// 手动移除事件监听器和变量
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> someResource = getData();
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> node = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'Node'</span>);
  <span class="hljs-keyword">if</span>(node) {
    node.innerHTML = <span class="hljs-built_in">JSON</span>.stringify(someResource));
  }
}, <span class="hljs-number">1000</span>);

<span class="hljs-comment">// 上面这段代码，定时器setInterval 和 someResource 一直存在，不会被回收。可以改成下面代码</span>

<span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'button'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params">event</span>) </span>{
    element.innerHtml = <span class="hljs-string">'text'</span>;
}

element.addEventListener(<span class="hljs-string">'click'</span>, onClick);
<span class="hljs-comment">// 手动移除事件监听器和变量</span>
element.removeEventListener(<span class="hljs-string">'click'</span>, onClick);
element.parentNode.removeChild(element);
</code></pre>
<h3 id="articleHeader9">例四：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var intervalId = null, params;

function createChunks() {
  var div, foo, i, str;
  for (i = 0; i < 20; i++) {
    div = document.createElement(&quot;div&quot;);
    str = new Array(1000000).join('x');
      foo = {
        str: str,
        div: div
      };
      div.foo = foo;
  }
}

function start() {
  if (intervalId) {
    return;
  }
  intervalId = setInterval(createChunks, 1000);
}

function stop() {
  if (intervalId) {
    // 清除定时器
    clearInterval(intervalId);
  }
  // 清除变量
  intervalId = null;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> intervalId = <span class="hljs-literal">null</span>, params;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createChunks</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> div, foo, i, str;
  <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">20</span>; i++) {
    div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
    str = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000000</span>).join(<span class="hljs-string">'x'</span>);
      foo = {
        <span class="hljs-attr">str</span>: str,
        <span class="hljs-attr">div</span>: div
      };
      div.foo = foo;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (intervalId) {
    <span class="hljs-keyword">return</span>;
  }
  intervalId = setInterval(createChunks, <span class="hljs-number">1000</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (intervalId) {
    <span class="hljs-comment">// 清除定时器</span>
    clearInterval(intervalId);
  }
  <span class="hljs-comment">// 清除变量</span>
  intervalId = <span class="hljs-literal">null</span>;
}
</code></pre>
<p><a href="https://developer.chrome.com/devtools/docs/demos/memory/example2" rel="nofollow noreferrer" target="_blank">链接观察垃圾回收是怎么工作的—Google: Watching the GC work</a></p>
<p><span class="img-wrap"><img data-src="/img/bVVhTW?w=3350&amp;h=1820" src="https://static.alili.tech/img/bVVhTW?w=3350&amp;h=1820" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在上面图片中，可以观察到，点击 start 按钮，内存和节点数暴增，当点击stop 时，垃圾收集器回收了这些定时器、变量等，从而释放了内存。</p>
<h2 id="articleHeader10">上期博客</h2>
<ul>
<li><a href="https://github.com/hankzhuo/Blog/blob/master/JS/%E4%BB%A3%E7%A0%81%E9%87%8D%E6%9E%84.md" rel="nofollow noreferrer" target="_blank">重构你的JS代码</a></li>
<li><a href="https://github.com/hankzhuo/Blog/blob/master/CSS/%E4%B8%80%E4%BA%9B%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C.md" rel="nofollow noreferrer" target="_blank">一些CSS3动画</a></li>
</ul>
<p><a href="https://github.com/hankzhuo/Blog/blob/master/JS/%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86.md" rel="nofollow noreferrer" target="_blank">我的github，欢迎star</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出 JavaScript 内存管理，垃圾回收

## 原文链接
[https://segmentfault.com/a/1190000011231206](https://segmentfault.com/a/1190000011231206)

