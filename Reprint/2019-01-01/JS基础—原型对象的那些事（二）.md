---
title: 'JS基础—原型对象的那些事（二）' 
date: 2019-01-01 2:30:07
hidden: true
slug: jmkgy46f5u
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇讲了<br>①原型对象是什么；<br>②<code>__proto__</code>、<code>prototype</code>、<code>constructor</code>的关系；<br>③原型对象的作用；<br>④原型对象带来的一些需要注意的问题；</p>
<p>没理解的可以再复习一下。<br>传送门：<a href="https://segmentfault.com/a/1190000010842024">JS基础—原型对象的那些事（一）</a></p>
<p>今天讲一下原型链以及原型链的关系图。</p>
<h2 id="articleHeader0">原型链是什么</h2>
<p>每个对象都有一个<code>__proto__</code>属性，指向对象的原型。</p>
<p><strong>ps:准确的说，是每一个实例都有一个<code>[[Prototype]]</code>属性，指向原型对象。这是一个隐式属性，存在但是我们的脚本访问不到，不过浏览器厂商大部分都支持一个<code>__proto__</code>属性，用来显示指向原型，虽然能用，但<code>__proto__</code>不是ECMA中的规范。</strong></p>
<p>原型的值可以是一个对象，也可以是<code>null</code>。如果它的值是一个对象，那么这个对象也一定有自己的原型。这样就形成了一条线性的链，我们称之为<strong>原型链</strong>。</p>
<p>当我们在对象上调用一个属性或者方法时，会先在这个对象上寻找，没有的话就去它的原型对象上找，原型对象上没有就去原型对象的原型对象上找，一直找到原型对象为<code>null</code>为止，没有的话就是<code>undefined</code>。</p>
<p>简而言之，对象寻找一个属性会沿着原型链向上寻找，直到原型链的顶端。</p>
<p>还是以上一篇的<code>Person</code>为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name) {
    this.name = name
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
var person = new Person(&quot;张三&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
}
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
<span class="hljs-keyword">var</span> person = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"张三"</span>)</code></pre>
<p>我们先来画一个简单的关于原型的关系图</p>
<p><span class="img-wrap"><img data-src="/img/bVUIAa?w=714&amp;h=361" src="https://static.alili.tech/img/bVUIAa?w=714&amp;h=361" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以上是<strong>实例</strong>、<strong>构造函数</strong>和<strong>原型对象</strong>三者的关系图。</p>
<p><strong>PS: <code>prototype</code>只是构造函数上的一个属性，它是一个指针，指向原型对象，并不表示Person.prototype就是原型对象。这里将<code>Person.prototype</code>认为是原型对象，是为了方便理解，需要注意哦。</strong></p>
<p>看不懂的同学去复习上一篇的内容，看懂的我们继续。</p>
<h2 id="articleHeader1">注意点一</h2>
<blockquote><p>原型对象也是对象，是对象就有<code>__proto__</code>属性，指向它的原型对象。</p></blockquote>
<p>在上一个例子中，<code>Person.prototype</code>就是一个对象，这个对象可以说是原生<code>Object</code>构造函数的实例，所以</p>
<p><code>Person.prototype.__proto__ === Object.prototype</code></p>
<p><code>Object.prototype</code>也是一个对象，所以它也有<code>__proto__</code>属性，不过它的<code>__proto__</code>指向<code>null</code>,也就是原型链的顶端，再往上就没有了。</p>
<p>重新补充一下关系图</p>
<p><span class="img-wrap"><img data-src="/img/bVUIAl?w=744&amp;h=595" src="https://static.alili.tech/img/bVUIAl?w=744&amp;h=595" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看懂的我们继续</p>
<h2 id="articleHeader2">注意点二</h2>
<blockquote><p>任何函数都可以说是原生<code>Function</code>构造函数的实例。</p></blockquote>
<p>所以<code>Person</code>构造函数是<code>Function</code>构造函数的实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.__proto__ === Function.prototype
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Person</span>.__proto__ === <span class="hljs-type">Function</span>.proto<span class="hljs-keyword">type</span>
</code></pre>
<p>继续我完善我们的关系图</p>
<p><span class="img-wrap"><img data-src="/img/bVUIAr?w=1247&amp;h=756" src="https://static.alili.tech/img/bVUIAr?w=1247&amp;h=756" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可能有人疑惑，<code>Person</code>不是函数吗，函数怎么也有<code>__proto__</code>，函数不是只有<code>prototype</code>吗？</p>
<p>因为函数本质也是对象啊，在JS的世界里，万物皆对象，所以函数有<code>__proto__</code>没毛病。</p>
<h2 id="articleHeader3">注意点三</h2>
<p><code>Function.prototype</code>也是对象，所以和<code>Person.prototype</code>一样，<code>Function.prototype</code>可以说是原生<code>Object</code>构造函数的实例，所以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.__proto__ === Object.prototype
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">Function</span>.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype
</code></pre>
<p>补充我们的图（红色的线）</p>
<p><span class="img-wrap"><img data-src="/img/bVUIAt?w=1247&amp;h=756" src="https://static.alili.tech/img/bVUIAt?w=1247&amp;h=756" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">注意点四</h2>
<p><code>Function</code>和<code>Object</code>都是构造函数，根据第二点<strong>任何函数都可以说是原生<code>Function</code>构造函数的实例</strong>，那么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.__proto__ === Function.prototype

Object.__proto__ === Function.prototype
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">__proto__</span></span> === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>

Object.__proto__ === <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>
</code></pre>
<p>完善我们的图（蓝色的线），大功告成。</p>
<p><span class="img-wrap"><img data-src="/img/bVUIAu?w=1247&amp;h=756" src="https://static.alili.tech/img/bVUIAu?w=1247&amp;h=756" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>恩，就是这么神奇，<code>Function</code>是<code>Function</code>的实例。。。</p>
<p>以上就是原型链的关系图，将这个图弄懂，原型对象的知识基本就掌握了。</p>
<p>虽然在真实场景中，这些知识用到的没这么复杂，但是掌握了最基础的知识，将来出现问题时，就能更快的找到问题的原因。</p>
<p>对于新手而言，原型链和作用域链经常搞混，this和静态作用域不知道在场景中怎么使用，确实是很头疼的问题，但这也许就是js的魅力所在吧。有时间的话再写一下作用域的知识~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础—原型对象的那些事（二）

## 原文链接
[https://segmentfault.com/a/1190000011095622](https://segmentfault.com/a/1190000011095622)

