---
title: '从一道题解读JS原型链' 
date: 2019-02-13 2:31:22
hidden: true
slug: 13b3olmeeez
categories: [reprint]
---

{{< raw >}}

                    
<p>之前对js原型和原型链的理解一直觉得很绕，绕来绕去的，在看了《JavaScript高级程序设计》和各种文章之后，终于对原型和原型链有了初步的了解，可是还是没有很深入的了解，今次通过以前段时间遇到的一道题，分析一下，用自己的想法进行解读，加深自己对原型和原型链的理解。</p>
<h2 id="articleHeader0">一、题目</h2>
<p>下面程序运行结果是什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {
    this.name = 'Animal';
}

Animal.prototype.changeName = function (name) {
    this.name = name;
}

function Cat() {
    this.name = 'Cat';
}

var animal = new Animal();

Cat.prototype = animal;
Cat.prototype.constructor = Cat;

var cat = new Cat();

animal.changeName('Tiger');

console.log(cat.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Animal'</span>;
}

Animal.prototype.changeName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Cat'</span>;
}

<span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal();

Cat.prototype = animal;
Cat.prototype.constructor = Cat;

<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat();

animal.changeName(<span class="hljs-string">'Tiger'</span>);

<span class="hljs-built_in">console</span>.log(cat.name)</code></pre>
<p>A. Animal<br>B. Cat   <br>C. Tiger   <br>D. 都不是</p>
<p>答案是 <strong>B Cat</strong></p>
<h2 id="articleHeader1">二、解读</h2>
<h3 id="articleHeader2">1. 原型对象</h3>
<blockquote>无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个<code>prototype</code>属性，这个属性指向函数的原型对象。在默认情况下，所有的原型对象都会自动获得一个<code>constructor</code>（构造函数）属性，这个属性是一个指向<code>prototype</code>属性所在函数的指针。<br>下面用图来说明</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal() {
    this.name = 'Animal';
}
Animal.prototype.changeName = function (name) {
    this.name = name;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Animal'</span>;
}
Animal.prototype.changeName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(name)</span> </span>{
    <span class="hljs-keyword">this</span>.name = name;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbinzL?w=872&amp;h=223" src="https://static.alili.tech/img/bVbinzL?w=872&amp;h=223" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>首先创建了一个Animal函数，Animal中含有一个<code>prototype</code>属性，指向Animal Prototype，而<code>Animal.prototype.constructor</code>指向Animal。这个时候由于<code>name</code>属性是在函数中定义的，所以不在Animal Prototype中，而<code>changeName </code>函数是通过<code>Animal.prototype.changeName</code>定义的，所以我们可以通过这种方式，在实例化多个对象时，共享原型所保存的方法。<br>同理，当创建了Cat函数时，也是一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat() {
    this.name = 'Cat';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Cat'</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbinCK?w=850&amp;h=568" src="https://static.alili.tech/img/bVbinCK?w=850&amp;h=568" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">2. 创建实例</h3>
<blockquote>当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。在ECMA-262第5版中管这个指针叫<code>[[Prototype]]</code>。虽然在脚本中没有标准的方式访问<code>[[Prototype]]</code>，但Firefox、Safari和Chrome在每个对象上都支持一个属性<code>__proto__</code>。明确重要的一点，这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVbinGO?w=848&amp;h=347" src="https://static.alili.tech/img/bVbinGO?w=848&amp;h=347" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将Cat的原型对象指向animal实例，获得animal中的属性，原有的属性丢失
Cat.prototype = animal;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code>// 将Cat的原型对象指向<span class="hljs-keyword">animal</span>实例，获得<span class="hljs-keyword">animal</span>中的属性，原有的属性丢失
Cat.prototype = <span class="hljs-keyword">animal</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbinOO?w=862&amp;h=729" src="https://static.alili.tech/img/bVbinOO?w=862&amp;h=729" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这一部分相当于是把Cat的原型对象的指针指向了<code>animal</code>实例，所以原来Cat原型对象中的<code>constructor</code>属性丢失，替换成了<code>animal</code>实例中的属性，包括<code>name</code>属性以及<code>__proto__</code>内部属性，同时<code>__proto__</code>属性也指向<code>Animal.prototype</code>，因此Cat也可以通过原型链查找调用到Animal中的属性和方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 相当于重新创建了constructor，指向Cat构造函数
Cat.prototype.constructor = Cat;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 相当于重新创建了constructor，指向Cat构造函数</span>
<span class="hljs-keyword">Cat</span>.prototype.constructor = <span class="hljs-keyword">Cat</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbinSl?w=864&amp;h=740" src="https://static.alili.tech/img/bVbinSl?w=864&amp;h=740" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这一部分相当于是重新在原型对象中创建了一个<code>constructor</code>属性，同时指向Cat构造函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cat = new Cat();   // 实例化一个Cat对象，跟实例化Animal相似" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> <span class="hljs-type">Cat</span>();   <span class="hljs-comment">// 实例化一个Cat对象，跟实例化Animal相似</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbin3l?w=658&amp;h=681" src="https://static.alili.tech/img/bVbin3l?w=658&amp;h=681" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">3. 调用方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animal.changeName('Tiger');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">animal</span><span class="hljs-selector-class">.changeName</span>(<span class="hljs-string">'Tiger'</span>);</code></pre>
<p>当<code>var animal = new Animal();</code>实例化了一个Animal对象后，<code>animal</code>都包含一个内部属性，该属性指向了<code>Animal.prototype</code>；换句话说，<code>animal</code>与构造函数Animal没有直接的关系。可是，可以看到虽然在实例中不含<code>changeName</code>，但我们却可以调用<code>animal.changeName(name)</code>，这是通过查找对象属性的过程来实现的，即：</p>
<p>首先查找实例中实例中<code>animal</code>是否有<code>changeName</code>方法，如果没有则继续寻找，去到<code>Animal.prototype</code>寻找是否有<code>changeName</code>方法，如果有则调用，没有则继续寻找，到<code>Object.prototype</code>中寻找，最后没找到则会返回一个<code>null</code>。</p>
<p>很明显，在这里实例<code>animal</code>中没有<code>changeName</code>方法，所以需要到<code>Animal.prototype</code>寻找<code>changeName</code>方法，并调用成功修改了实例<code>animal</code>中的<code>name</code>属性，为<code>Tiger</code>。</p>
<p>这个时候由于<code>Cat.prototype</code>是指向实例<code>animal</code>的，因此<code>Cat.prototype</code>中的<code>name</code>属性也变为<code>Tiger</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVbin0m?w=691&amp;h=685" src="https://static.alili.tech/img/bVbin0m?w=691&amp;h=685" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(cat.name)  // Cat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(cat.<span class="hljs-built_in">name</span>)  <span class="hljs-comment">// Cat</span></code></pre>
<p>最后，获取<code>cat.name</code>，与查找方法同样，也是先去实例中<code>cat</code>查找是否含有<code>name</code>属性，在这里很明显是存在的，因此直接结束寻找，此时<code>cat.name = 'Cat'</code>。</p>
<h2 id="articleHeader5">三、总结</h2>
<p>通过这道题，加深了我对原型和原型链的理解，其实这道题也可以扩展到关于继承的知识点，在JavaScript中实现继承主要是依靠原型链来实现。之后等我再搞的更清楚一点再继续写吧。</p>
<p>此文章是本人自己对于原型和原型链的一点小小的理解，中间可能存在偏差或者错误的，请多多指点！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从一道题解读JS原型链

## 原文链接
[https://segmentfault.com/a/1190000016736112](https://segmentfault.com/a/1190000016736112)

