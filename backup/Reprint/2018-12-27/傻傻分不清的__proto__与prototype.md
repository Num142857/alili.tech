---
title: '傻傻分不清的__proto__与prototype' 
date: 2018-12-27 2:30:12
hidden: true
slug: bybav5w2af9
categories: [reprint]
---

{{< raw >}}

                    
<p>今天同事小英童鞋问了我一个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName; 
}
Foo.prototype.logName = function(){
    Foo.combineName();
    console.log(this.fullName);
}
Foo.prototype.combineName = function(){
    this.fullName = `${this.firstName} ${this.lastName}`
}

var foo = new Foo('Sanfeng', 'Zhang');
foo.logName(); // Uncaught TypeError: Foo.combineName is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params">firstName, lastName</span>)</span>{
    <span class="hljs-keyword">this</span>.firstName = firstName;
    <span class="hljs-keyword">this</span>.lastName = lastName; 
}
Foo.prototype.logName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    Foo.combineName();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.fullName);
}
Foo.prototype.combineName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.fullName = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.firstName}</span> <span class="hljs-subst">${<span class="hljs-keyword">this</span>.lastName}</span>`</span>
}

<span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Foo(<span class="hljs-string">'Sanfeng'</span>, <span class="hljs-string">'Zhang'</span>);
foo.logName(); <span class="hljs-comment">// Uncaught TypeError: Foo.combineName is not a function</span></code></pre>
<p>小英童鞋认为<code>Foo</code>的原型对象是<code>Foo.prototype</code>，所以<code>Foo</code>会继承<code>Foo.prototype</code>的属性，调用<code>Foo.combineName()</code>相当于调用<code>Foo.prototype.combineName()</code>，但结果<code>Foo.combineName()</code>不是一个方法。</p>
<p>会造成这个问题的原因一定是因为小英童鞋弄混了原型和继承的一些原理，下面我们来整理一下原型和继承的相关原理，找出问题的根本原因。</p>
<h2 id="articleHeader0"><code>prototype</code></h2>
<p><code>prototype</code>是一个拥有 <strong>[[Construct]]</strong> 内部方法的对象才有的属性。</p>
<p>例如函数，对象的方法，<strong>ES6</strong> 中的类。注意 <strong>ES6</strong> 中的箭头函数没有 <strong>[[Construct]]</strong> 方法，因此没有<code>prototype</code>这个属性，除非你为它添加一个。</p>
<p>当创建函数时，<strong>JavaScript</strong> 会为这个函数自动添加<code>prototype</code>属性，这个属性指向的是一个原型对象<code>Functionname.prototype</code>。我们可以向这个原型对象添加属性或对象，甚至可以指向一个现有的对象。</p>
<h2 id="articleHeader1"><code>__proto__</code></h2>
<p>接下来我们说说继承，每个对象都有一个<code>__proto__</code>属性，这个属性是用来标识自己所继承的原型。</p>
<p>注意： <strong>JavaScript</strong> 中任意对象都有一个内置属性 <strong>[[Prototype]]</strong> ，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过<code>__proto__</code>来访问。以下统一使用<code>__proto__</code>来访问 <strong>[[Prototype]]</strong>，在实际开发中是不能这样访问的。</p>
<h2 id="articleHeader2">原型链</h2>
<p><strong>JavaScript</strong> 可以通过<code>prototype</code>和<code>__proto__</code>在两个对象之间创建一个关联，使得一个对象就可以通过委托访问另一个对象的属性和函数。</p>
<p>这样的一个关联就是原型链，一个由对象组成的有限对象链，用于实现继承和共享属性。</p>
<h2 id="articleHeader3">构造函数创建对象实例</h2>
<p><strong>JavaScript</strong> 函数有两个不同的内部方法：<strong>[[Call]]</strong> 和 <strong>[[Construct]]</strong> 。</p>
<p>如果不通过<code>new</code>关键字调用函数，则执行 <strong>[[Call]]</strong> 函数，从而直接执行代码中的函数体。</p>
<p>当通过<code>new</code>关键字调用函数时，执行的是 <strong>[[Construct]]</strong> 函数，它负责创建一个实例对象，把实例对象的<code>__proto__</code>属性指向构造函数的<code>prototype</code>来实现继承构造函数<code>prototype</code>的所有属性和方法，将<code>this</code>绑定到实例上，然后再执行函数体。</p>
<p>模拟一个构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createObject(proto) {
    if (!(proto === null || typeof proto === &quot;object&quot; || typeof proto === &quot;function&quot;){
        throw TypeError('Argument must be an object, or null');
    }
    var obj = new Object();
    obj.__proto__ = proto;
    return obj;
}

var foo = createObject(Foo.prototype);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createObject</span>(<span class="hljs-params">proto</span>) </span>{
    <span class="hljs-keyword">if</span> (!(proto === <span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> proto === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> proto === <span class="hljs-string">"function"</span>){
        <span class="hljs-keyword">throw</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Argument must be an object, or null'</span>);
    }
    <span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    obj.__proto__ = proto;
    <span class="hljs-keyword">return</span> obj;
}

<span class="hljs-keyword">var</span> foo = createObject(Foo.prototype);</code></pre>
<p>至此我们了解了<code>prototype</code>和<code>__proto__</code>的作用，也了解使用构造函数创建对象实例时这两个属性的指向，以下使用一张图来总结一下如何通过<code>prototype</code>和<code>__proto__</code>实现原型链。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011806323?w=800&amp;h=737" src="https://static.alili.tech/img/remote/1460000011806323?w=800&amp;h=737" alt="proto" title="proto" style="cursor: pointer; display: inline;"></span></p>
<p>从上图我们可以找出<code>foo</code>对象和<code>Foo</code>函数的原型链：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.__proto__ == Foo.prototype;
foo.__proto__.__proto__ == Foo.prototype.__proto__ == Object.prototype;
foo.__proto__.__proto__.__proto__ == Foo.prototype.__proto__.__proto__ == Object.prototype.__proto__ == null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>foo.<span class="hljs-strong">__proto__</span> == Foo.prototype;
foo.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span> == Foo.prototype.<span class="hljs-strong">__proto__</span> == Object.prototype;
foo.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span> == Foo.prototype.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span> == Object.prototype.<span class="hljs-strong">__proto__</span> == null;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011801133?w=770&amp;h=104" src="https://static.alili.tech/img/remote/1460000011801133?w=770&amp;h=104" alt="foo" title="foo" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo.__proto__ == Function.prototype;
Foo.__proto__.__proto__ == Function.prototype.__proto__;
Foo.__proto__.__proto__.__proto__ == Function.prototype.__proto__.__proto__ == Object.prototype.__proto__ == null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>Foo.<span class="hljs-strong">__proto__</span> == Function.prototype;
Foo.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span> == Function.prototype.<span class="hljs-strong">__proto__</span>;
Foo.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span> == Function.prototype.<span class="hljs-strong">__proto__</span>.<span class="hljs-strong">__proto__</span> == Object.prototype.<span class="hljs-strong">__proto__</span> == null;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011801134?w=840&amp;h=104" src="https://static.alili.tech/img/remote/1460000011801134?w=840&amp;h=104" alt="class-foo" title="class-foo" style="cursor: pointer; display: inline;"></span></p>
<p>构造函数<code>Foo</code>的原型链上没有<code>Foo.prototype</code>，因此无法继承<code>Foo.prototype</code>上的属性和方法。而实例<code>foo</code>的原型链上有<code>Foo.prototype</code>，因此<code>foo</code>可以继承<code>Foo.prototype</code>上的属性和方法。</p>
<p>到这里，我们可以很简单的解答小英童鞋的问题了，在<code>Foo</code>的原型链上没有<code>Foo.prototype</code>，无法继承<code>Foo.prototype</code>上的<code>combineName</code>方法，因此会抛出<code>Foo.combineName is not a function</code>的异常。要想使用<code>combineName</code>方法，可以这样<code>Foo.prototype.combineName.call(this)</code>，或者这样<code>this.combineName()</code>（<code>this</code>指向实例对象）。</p>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000011801127" target="_blank">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
傻傻分不清的__proto__与prototype

## 原文链接
[https://segmentfault.com/a/1190000011801127](https://segmentfault.com/a/1190000011801127)

