---
title: '【前端工程师手册】JavaScript之原型' 
date: 2018-11-29 9:34:56
hidden: true
slug: 9oi2l8ctuqc
categories: [reprint]
---

{{< raw >}}

                    
<p>又是一个比较重要的知识点——原型（prototype）。</p>
<h2 id="articleHeader0">一个例子</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function F() {}
var f = new F()
F.prototype  // {constructor: ƒ}
f.__proto__  // {constructor: ƒ}
F.prototype === f.__proto__  // true
F.prototype.constructor === F  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span><span class="hljs-params">()</span> </span>{}
<span class="hljs-keyword">var</span> f = <span class="hljs-keyword">new</span> F()
F.prototype  <span class="hljs-comment">// {constructor: ƒ}</span>
f.__proto__  <span class="hljs-comment">// {constructor: ƒ}</span>
F.prototype === f.__proto__  <span class="hljs-comment">// true</span>
F.prototype.constructor === F  <span class="hljs-comment">// true</span></code></pre>
<p>可以看到F函数有一个属性prototype指向了一个对象{constructor: ƒ}，由F函数new出来的对象f有一个属性__proto__指向一个对象{constructor: ƒ}。且f.__proto__和F.prototype指向了同一个对象。F.prototype有一个constructor属性又指回了F本身。<br>总结一下即是：</p>
<ul>
<li>prototype：JavaScript中每个<strong>函数</strong>都有一个prototype属性，此属性指向了该函数的原型对象</li>
<li>__proto__：JavaScript中每一个<strong>对象</strong>（null除外），包括函数创建的对象、函数自身、原型对象，都有一个__proto__属性，指向了创建该对象的函数的原型</li>
<li>constructor：该属性属于原型对象，指向相关的构造函数</li>
</ul>
<h2 id="articleHeader1">继续探究</h2>
<p>既然刚刚说了每一个对象包括原型对象都有__proto__属性，那么继续来试验：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接上一段代码
F.__proto  // ƒ () { [native code] }
F.prototype.__proto__  // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ,&nbsp;…}
F.__proto__ === Function.prototype  // true
F.prototype.__proto__ === Object.prototype  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// 接上一段代码</span>
F.<span class="hljs-variable">__proto</span>  <span class="hljs-comment">// ƒ () { [native code] }</span>
F.prototype.<span class="hljs-variable">__proto__</span>  <span class="hljs-comment">// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ,&nbsp;…}</span>
F.<span class="hljs-variable">__proto__</span> === Function.prototype  <span class="hljs-comment">// true</span>
F.prototype.<span class="hljs-variable">__proto__</span> === Object.prototype  <span class="hljs-comment">// true</span></code></pre>
<p>首先，F作为一个函数的同时它也是对象，所以它拥有属性__proto__指向了Function.prototype，因为所有的函数都可以理解为Function的实例；同样的，F.prototype作为一个对象，它的__proto__指向Object.prototype，因为它是对象且没有指明的构造函数，所以它直接是Object函数生成的实例，自然__proto__就指向Object.prototype。</p>
<p>现在再来探究一下Object.prototype作为一个对象，它的__proto__又指向了什么呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype .__proto__  // null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Object<span class="hljs-selector-class">.prototype</span> .__proto__  <span class="hljs-comment">// null</span></code></pre>
<p>Object.prototype.__proto__指向了null，这也说明了null是原型链的顶端。</p>
<p>上述的所有指向关系可以用一张图来表示：<br><span class="img-wrap"><img data-src="/img/bVbaWk2?w=838&amp;h=814" src="https://static.alili.tech/img/bVbaWk2?w=838&amp;h=814" alt="prototype" title="prototype" style="cursor: pointer; display: inline;"></span><br>ps：这里面有一个细节，Function.__proto__ ===  Function.prototype<br>Function作为方法，它有自己的prototype；Function作为对象，它的__proto__指向了Function.prototype，这似乎是在说：Function方法生成了Function对象？<br>针对这个问题，我觉得还是看<a href="https://github.com/jawil/blog/issues/13" rel="nofollow noreferrer" target="_blank">这篇文章</a>比较合适，我就不费口舌了。</p>
<h2 id="articleHeader2">可以是使用prototype做什么？</h2>
<p><strong>创建对象的数据共享</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){}
Person.prototype.name = &quot;Nicholas&quot;;
Person.prototype.age = 29;
Person.prototype.job = &quot;Software Engineer&quot;;
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
person1.sayName();   //&quot;Nicholas&quot;
var person2 = new Person();
person2.sayName(); //&quot;Nicholas&quot;
alert(person1.sayName == person2.sayName);  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">()</span></span>{}
Person.prototype.name = <span class="hljs-string">"Nicholas"</span>;
Person.prototype.age = <span class="hljs-number">29</span>;
Person.prototype.job = <span class="hljs-string">"Software Engineer"</span>;
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.name);
};
<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person();
person1.sayName();   <span class="hljs-comment">//"Nicholas"</span>
<span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person();
person2.sayName(); <span class="hljs-comment">//"Nicholas"</span>
alert(person1.sayName == person2.sayName);  <span class="hljs-comment">//true</span></code></pre>
<p>把一些实例共享的属性和方法放在原型上，节约空间。</p>
<h2 id="articleHeader3">基于原型链的委托继承</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Child(){}

function Parent(){
    this.name = 'ppp'
}

Child.prototype = new Parent()

var c = new Child()

c.name   // 'ppp'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span><span class="hljs-params">()</span></span>{}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'ppp'</span>
}

Child.prototype = <span class="hljs-keyword">new</span> Parent()

<span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> Child()

c.name   <span class="hljs-comment">// 'ppp'</span></code></pre>
<p>这个原型继承的关系可以用图来表示：<br><span class="img-wrap"><img data-src="/img/bVba6wr?w=626&amp;h=635" src="https://static.alili.tech/img/bVba6wr?w=626&amp;h=635" alt="原型继承" title="原型继承" style="cursor: pointer; display: inline;"></span></p>
<p>参考资料：<br><a href="https://github.com/mqyqingfeng/Blog/issues/2" rel="nofollow noreferrer" target="_blank">JavaScript深入之从原型到原型链</a><br><a href="http://www.cnblogs.com/TomXu/archive/2012/01/05/2305453.html" rel="nofollow noreferrer" target="_blank">强大的原型和原型链</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端工程师手册】JavaScript之原型

## 原文链接
[https://segmentfault.com/a/1190000015001229](https://segmentfault.com/a/1190000015001229)

