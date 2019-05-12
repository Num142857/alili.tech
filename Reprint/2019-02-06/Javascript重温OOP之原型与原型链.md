---
title: 'Javascript重温OOP之原型与原型链' 
date: 2019-02-06 2:30:09
hidden: true
slug: 8ushtsj82lf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">prototype原型对象</h2>
<p>每个函数都有一个默认的<code>prototype</code>属性，其实际上还是一个对象，如果被用在继承中，姑且叫做原型对象。</p>
<p>在构造函数中的<code>prototype</code>中定义的属性和方法，会被创建的对象所继承下来。举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function F(){}
F.prototype.work = function(){
    console.log('F is working..');
};
var f = new F();
f.work(); // F is working.." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{}
F.prototype.work = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'F is working..'</span>);
};
<span class="hljs-keyword">var</span> f = <span class="hljs-keyword">new</span> F();
f.work(); <span class="hljs-comment">// F is working..</span></code></pre>
<p>当你创建函数时，JS会为这个函数自动添加 <code>prototype</code> 属性，值是空对象。而一旦你把这个函数当作构造函数（ <code>constructor</code> ）调用（即通过 new 关键字调用），那么JS就会帮你创建该构造函数的实例，实例继承构造函数 <code>prototype</code> 的所有属性和方法（实例通过设置自己的<code> __proto__ </code>指向承构造函数的 <code>prototype</code> 来实现这种继承）。</p>
<h2 id="articleHeader1">神秘的<code>__proto__</code>
</h2>
<p>JS的对象中都包含了一个<code>__proto__</code>属性，其指向的是创建该对象时的构造函数的原型对象prototype。</p>
<p><span class="img-wrap"><img data-src="/img/bVzPrk" src="https://static.alili.tech/img/bVzPrk" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从上面的输出结果看出，<code>f.__proto__</code>指向了其构造函数F的<code>prototype</code>，而<code>F.prototype</code>本身也是一个对象，其内部也有<code>__proto__</code>属性，其指向的是<code>Object.prototype</code>,直到最后<code>Object.prototype</code>指向<code>null</code>，这条原型链才结束。</p>
<p>因此，<code>__proto__</code>这个神秘的属性才是原型链形成的真正原因。</p>
<h2 id="articleHeader2">原型链</h2>
<p>由于原型对象本身也是对象，根据上边的定义，它也有自己的原型，而它自己的原型对象又可以有自己的原型，这样就组成了一条链，这个就是原型链，JavaScritp引擎在访问对象的属性时，如果在对象本身中没有找到，则会去原型链中查找，如果找到，直接返回值，如果整个链都遍历且没有找到属性，则返回undefined。原型链一般实现为一个链表，这样就可以按照一定的顺序来查找。</p>
<p>下面是一张经典的图：</p>
<p><span class="img-wrap"><img data-src="/img/bVcXNb" src="https://static.alili.tech/img/bVcXNb" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从上图看出：</p>
<ol>
<li><p><code>Object.prototype</code>是顶级对象，所有对象都继承自它。</p></li>
<li><p><code>Function</code> 继承 <code>Function</code> 本身， <code>Function.prototype</code> 继承 <code>Object.prototype</code> 。</p></li>
<li><p><code>Function.prototype</code> 和 <code>Function.__proto__</code> 都指向 <code>Function.prototype</code></p></li>
<li><p><code>Object.prototype.__proto__</code> === <code>null</code> ，说明原型链到 <code>Object.prototype</code> 终止。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript重温OOP之原型与原型链

## 原文链接
[https://segmentfault.com/a/1190000006118638](https://segmentfault.com/a/1190000006118638)

