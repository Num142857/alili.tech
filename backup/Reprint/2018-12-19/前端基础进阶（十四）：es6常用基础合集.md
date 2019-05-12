---
title: '前端基础进阶（十四）：es6常用基础合集' 
date: 2018-12-19 2:30:07
hidden: true
slug: cxe5erb49vr
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009078532" src="https://static.alili.tech/img/remote/1460000009078532" alt="ES6基础智商划重点" title="ES6基础智商划重点" style="cursor: pointer; display: inline;"></span></p>
<p>在实际开发中，ES6已经非常普及了。掌握ES6的知识变成了一种必须。尽管我们在使用时仍然需要经过babel编译。</p>
<p>ES6彻底改变了前端的编码风格，可以说对于前端的影响非常巨大。值得高兴的是，如果你熟悉ES5，学习ES6并不需要花费太多的时间就可以掌握，因为常用的基础语法并不多，花少量的时间，就可以开始我们的ES6之旅了。</p>
<p>这篇文章不会详细的告诉你ES6的每一个细节知识，只会根据我自己的开发经验，将我在实际开发中常常用到的知识点分享给大家，给大家学习ES6一个方向的指引。这是因为考虑到很多同学虽然知道ES6的重要性，但是不知道自己需要掌握那些ES6的知识，也不知道这些知识需要掌握到什么程度，这给新手朋友带来了许多困惑，因此这篇文章就算是一个划重点吧，掌握这些，就可以轻轻松松得进行进一步学习了。</p>
<blockquote>在学习之前，推荐大家使用babel官方提供的在线编译工具，编写自己的demo，会在右侧实时显示出编译之后的代码，以供参考学习  <a href="http://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">http://babeljs.io/repl/</a>
</blockquote>
<h5>一、新的变量声明方式 let/const</h5>
<p>与var不同，新的变量声明方式带来了一些不一样的特性，其中最重要的两个特性就是提供了块级作用域与不再具备变量提升。</p>
<p>通过2个简单的例子来说明这两点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let a = 20;
}

console.log(a);  // a is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-keyword">let</span> a = <span class="hljs-number">20</span>;
}

<span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// a is not defined</span></code></pre>
<p>而这个简单的例子，会被编译为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let _a = 20;
}

console.log(a);  // a is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-keyword">let</span> _a = <span class="hljs-number">20</span>;
}

<span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// a is not defined</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
console.log(a);   // undefined
var a = 20;

// ES6
console.log(a); // a is not defined
let a = 20;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES5</span>
<span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">// undefined</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;

<span class="hljs-comment">// ES6</span>
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// a is not defined</span>
<span class="hljs-keyword">let</span> a = <span class="hljs-number">20</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009078533" src="https://static.alili.tech/img/remote/1460000009078533" alt="变量提升demo示例" title="变量提升demo示例" style="cursor: pointer; display: inline;"></span></p>
<p>当然，你的代码编译成为了ES5之后，仍然会存在变量提升，这一点只需要我们记住即可。在实际使用中，也需要尽量避免使用变量提升的特性带来的负面影响。只有在面试题中，才会对变量提升不停的滥用。</p>
<p>使用ES6，我们需要全面使用let/const替换var，那么什么时候用let，什么时候用const就成为了一个大家要熟练区分的一个知识点。</p>
<p><strong>我们常常使用let来声明一个值会被改变的变量，而使用const来声明一个值不会被改变的变量，也可以称之为常量</strong>。</p>
<p>当值为基础数据类型时，那么这里的值，就是指值本身。<br>而当值对应的为引用数据类型时，那么我这里说的值，则表示指向该对象的引用。这里需要注意，正因为该值为一个引用，只需要保证引用不变就可以，我们仍然可以改变该引用所指向的对象。</p>
<p>当我们试图改变const声明的变量时，则会报错。</p>
<p>写几个例子，大家可以仔细揣摩一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = null;
a = 20;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a = <span class="hljs-literal">null</span>;
a = <span class="hljs-number">20</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obDev = {
    a: 20,
    b: 30
}

obDev.a = 30;

console.log(obDev); // Object {a: 30, b: 30}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obDev = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">30</span>
}

obDev.a = <span class="hljs-number">30</span>;

<span class="hljs-built_in">console</span>.log(obDev); <span class="hljs-comment">// Object {a: 30, b: 30}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fn = function() {}
const a = obDev.a;
... ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">const</span> a = obDev.a;
... ...</code></pre>
<p>只要抓住上面我说的特性，那么在使用let/const时就会显得游刃有余。<br>根据我自己的经验，使用const的场景要比使用let的场景多很多。</p>
<h5>二、 箭头函数的使用</h5>
<p>之前我说ES6颠覆了js的编码习惯，箭头函数的使用占了很大一部分。</p>
<p>首先是写法上的不同:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es5
var fn = function(a, b) {
    return a + b;
}

// es6 箭头函数写法，当函数直接被return时，可以省略函数体的括号
const fn = (a, b) => a + b;

// es5
var foo = function() {
    var a = 20；
    var b = 30;
    return a + b;
}

// es6
const foo = () => {
   const a = 20;
   const b = 30;
   return a + b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// es6 箭头函数写法，当函数直接被return时，可以省略函数体的括号</span>
<span class="hljs-keyword">const</span> fn = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b;

<span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>；
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">30</span>;
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
   <span class="hljs-keyword">const</span> a = <span class="hljs-number">20</span>;
   <span class="hljs-keyword">const</span> b = <span class="hljs-number">30</span>;
   <span class="hljs-keyword">return</span> a + b;
}</code></pre>
<blockquote>箭头函数可以替换函数表达式，但是不能替换函数声明</blockquote>
<p>其次还有一个至关重要的一点，那就是箭头函数中，没有this。如果你在箭头函数中使用了this，那么该this一定就是外层的this。</p>
<p>也正是因为箭头函数中没有this，因此我们也就无从谈起用call/apply/bind来改变this指向。记住这个特性，能让你在react组件之间传值时少走无数弯路。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    name: 'tom',
    getName: function() {
        return this.name;
    }
}

// 我们试图用ES6的写法来重构上面的对象
const person = {
    name: 'tom',
    getName: () => this.name
}

// 但是编译结果却是
var person = {
    name: 'tom',
    getName: function getName() {
        return undefined.name;
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'tom'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-comment">// 我们试图用ES6的写法来重构上面的对象</span>
<span class="hljs-keyword">const</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'tom'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.name
}

<span class="hljs-comment">// 但是编译结果却是</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'tom'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>.name;
    }
};
</code></pre>
<blockquote>在ES6中，会默认采用严格模式，因此this也不会自动指向window对象了，而箭头函数本身并没有this，因此this就只能是undefined，这一点，在使用的时候，一定要慎重慎重再慎重，不然踩了坑你都不知道自己错在哪！这种情况，如果你还想用this，就不要用使用箭头函数的写法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 可以稍做改动
const person = {
    name: 'tom',
    getName: function() {
        return setTimeout(() => this.name, 1000);
    }
}

// 编译之后变成
var person = {
    name: 'tom',
    getName: function getName() {
        var _this = this;  // 使用了我们在es5时常用的方式保存this引用

        return setTimeout(function () {
            return _this.name;
        }, 1000);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 可以稍做改动</span>
<span class="hljs-keyword">const</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'tom'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.name, <span class="hljs-number">1000</span>);
    }
}

<span class="hljs-comment">// 编译之后变成</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'tom'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">// 使用了我们在es5时常用的方式保存this引用</span>

        <span class="hljs-keyword">return</span> setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> _this.name;
        }, <span class="hljs-number">1000</span>);
    }
};</code></pre>
<p>先记住箭头函数的写法，并留意箭头函数中关于this的特殊性，更过实践与注意事项我们在封装react组件时再慢慢来感受。</p>
<p>除此之外，箭头函数中无法访问<code>arguments</code>对象。</p>
<h5>三、模板字符串</h5>
<p>模板字符串是为了解决使用<code>+</code>号拼接字符串的不便利而出现的。它的功能非常强大，但是我们大多数时候使用它则非常简单。看一个例子大家就明白怎么使用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es6
const a = 20;
const b = 30;
const string = `${a}+${b}=${a+b}`;

// es5
var a = 20;
var b = 30;
var string = a + &quot;+&quot; + b + &quot;=&quot; + (a + b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-number">20</span>;
<span class="hljs-keyword">const</span> b = <span class="hljs-number">30</span>;
<span class="hljs-keyword">const</span> string = <span class="hljs-string">`<span class="hljs-subst">${a}</span>+<span class="hljs-subst">${b}</span>=<span class="hljs-subst">${a+b}</span>`</span>;

<span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">30</span>;
<span class="hljs-keyword">var</span> string = a + <span class="hljs-string">"+"</span> + b + <span class="hljs-string">"="</span> + (a + b);</code></pre>
<p>使用 `` 将整个字符串包裹起来，而在其中使用 ${} 来包裹一个变量或者一个表达式。</p>
<p>当然模板字符串还支持换行等强大的功能，更多的大家可通过参考资料进一步学习。</p>
<h5>四、 解析结构</h5>
<p>解析结构是一种全新的写法，我们只需要使用一个例子，大家就能够明白解析结构到底是怎么一回事儿。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首先有这么一个对象
const props = {
    className: 'tiger-button',
    loading: false,
    clicked: true,
    disabled: 'disabled'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 首先有这么一个对象</span>
<span class="hljs-keyword">const</span> props = {
    <span class="hljs-attr">className</span>: <span class="hljs-string">'tiger-button'</span>,
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">clicked</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-string">'disabled'</span>
}</code></pre>
<p>当我们想要取得其中的2个值：loading与clicked时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es5
var loading = props.loading;
var clicked = props.clicked;

// es6
const { loading, clicked } = props;

// 给一个默认值，当props对象中找不到loading时，loading就等于该默认值
const { loading = false, clicked } = props;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> loading = props.loading;
<span class="hljs-keyword">var</span> clicked = props.clicked;

<span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> { loading, clicked } = props;

<span class="hljs-comment">// 给一个默认值，当props对象中找不到loading时，loading就等于该默认值</span>
<span class="hljs-keyword">const</span> { loading = <span class="hljs-literal">false</span>, clicked } = props;</code></pre>
<p>是不是简单了许多？正是由于解析结构大大减少了代码量，因此它大受欢迎，在很多代码中它的影子随处可见。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 比如
// section1
import React, { Component } from 'react';

// section2
export { default } from './Button';

// section3
const { click, loading } = this.props;
const { isCheck } = this.state;

// more  任何获取对象属性值的场景都可以使用解析结构来减少我们的代码量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 比如</span>
<span class="hljs-comment">// section1</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-comment">// section2</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./Button'</span>;

<span class="hljs-comment">// section3</span>
<span class="hljs-keyword">const</span> { click, loading } = <span class="hljs-keyword">this</span>.props;
<span class="hljs-keyword">const</span> { isCheck } = <span class="hljs-keyword">this</span>.state;

<span class="hljs-comment">// more  任何获取对象属性值的场景都可以使用解析结构来减少我们的代码量</span></code></pre>
<p>另外，数组也有属于自己的解析结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es6
const arr = [1, 2, 3];
const [a, b, c] = arr;

// es5
var arr = [1, 2, 3];
var a = arr[0];
var b = arr[1];
var c = arr[2];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> [a, b, c] = arr;

<span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> a = arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> b = arr[<span class="hljs-number">1</span>];
<span class="hljs-keyword">var</span> c = arr[<span class="hljs-number">2</span>];</code></pre>
<p>数组以序列号一一对应，这是一个有序的对应关系。<br>而对象根据属性名一一对应，这是一个无序的对应关系。<br>根据这个特性，使用解析结构从对象中获取属性值更加具有可用性。</p>
<h5>五、 函数默认参数</h5>
<p>之前我们不能直接为函数指定默认参数，因此很多时候为了保证传入的参数具备一个默认值，我们常常使用如下的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x, y) {
    var x = x || 20;
    var y = y || 30;
    return x + y;
}

console.log(add()); // 50" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">var</span> x = x || <span class="hljs-number">20</span>;
    <span class="hljs-keyword">var</span> y = y || <span class="hljs-number">30</span>;
    <span class="hljs-keyword">return</span> x + y;
}

<span class="hljs-built_in">console</span>.log(add()); <span class="hljs-comment">// 50</span></code></pre>
<blockquote>这种方式并不是没有缺点，比如当我传入一个x值为false，这个时候任然会取到默认值，就不是我们的本意了。</blockquote>
<p>来看看ES6的默认值写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(x = 20, y = 30) {
    return x + y;
}

console.log(add());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x = <span class="hljs-number">20</span>, y = <span class="hljs-number">30</span></span>) </span>{
    <span class="hljs-keyword">return</span> x + y;
}

<span class="hljs-built_in">console</span>.log(add());</code></pre>
<p>在实际开发中给参数添加适当的默认值，可以让我们对函数的参数类型有一个直观的认知。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ButtonGroupProps = {
    size: 'normal',
    className: 'xxxx-button-group',
    borderColor: '#333'
}

export default function ButtonGroup(props = ButtonGroupProps) {
    ... ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ButtonGroupProps = {
    <span class="hljs-attr">size</span>: <span class="hljs-string">'normal'</span>,
    <span class="hljs-attr">className</span>: <span class="hljs-string">'xxxx-button-group'</span>,
    <span class="hljs-attr">borderColor</span>: <span class="hljs-string">'#333'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ButtonGroup</span>(<span class="hljs-params">props = ButtonGroupProps</span>) </span>{
    ... ...
}</code></pre>
<h5>六、 展开运算符</h5>
<p>在ES6中用<code>...</code>来表示展开运算符，它可以将数组方法或者对象进行展开。先来看一个例子它是如何使用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr1 = [1, 2, 3];
const arr2 = [...arr1, 10, 20, 30];

// 这样，arr2 就变成了[1, 2, 3, 10, 20, 30];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> arr1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> arr2 = [...arr1, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>];

<span class="hljs-comment">// 这样，arr2 就变成了[1, 2, 3, 10, 20, 30];</span></code></pre>
<p>当然，展开对象数据也是可以得到类似的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj1 = {
  a: 1,
  b: 2,
  c: 3
}

const obj2 = {
  ...obj1,
  d: 4,
  e: 5,
  f: 6
}

// 结果类似于 const obj2 = Object.assign({}, obj1, {d: 4})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj1 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
}

<span class="hljs-keyword">const</span> obj2 = {
  ...obj1,
  <span class="hljs-attr">d</span>: <span class="hljs-number">4</span>,
  <span class="hljs-attr">e</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">f</span>: <span class="hljs-number">6</span>
}

<span class="hljs-comment">// 结果类似于 const obj2 = Object.assign({}, obj1, {d: 4})</span></code></pre>
<p>展开运算符还常常运用在解析结构之中，例如我们在Raect封装组件的时候常常不确定props到底还有多少数据会传进来，就会利用展开运算符来处理剩余的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这种方式在react中十分常用
const props = {
  size: 1,
  src: 'xxxx',
  mode: 'si'
}


const { size, ...others } = props;

console.log(others)

// 然后再利用暂开运算符传递给下一个元素，再以后封装react组件时会大量使用到这种方式，正在学习react的同学一定要搞懂这种使用方式
<button {...others} size={size} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这种方式在react中十分常用</span>
<span class="hljs-keyword">const</span> props = {
  <span class="hljs-attr">size</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">src</span>: <span class="hljs-string">'xxxx'</span>,
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'si'</span>
}


<span class="hljs-keyword">const</span> { size, ...others } = props;

<span class="hljs-built_in">console</span>.log(others)

<span class="hljs-comment">// 然后再利用暂开运算符传递给下一个元素，再以后封装react组件时会大量使用到这种方式，正在学习react的同学一定要搞懂这种使用方式</span>
&lt;button {...others} size={size} /&gt;</code></pre>
<p>展开运算符还用在函数的参数中，来表示函数的不定参。只有放在最后才能作为函数的不定参，否则会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 所有参数之和
const add = (a, b, ...more) => {
    return more.reduce((m, n) => m + n) + a + b
}

console.log(add(1, 23, 1, 2, 3, 4, 5)) // 39" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 所有参数之和</span>
<span class="hljs-keyword">const</span> add = <span class="hljs-function">(<span class="hljs-params">a, b, ...more</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> more.reduce(<span class="hljs-function">(<span class="hljs-params">m, n</span>) =&gt;</span> m + n) + a + b
}

<span class="hljs-built_in">console</span>.log(add(<span class="hljs-number">1</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)) <span class="hljs-comment">// 39</span></code></pre>
<p>展开运算符的运用可以大大提高我们的代码效率，但是在刚开始使用的时候比较绕脑，掌握好了用起来还是非常爽的，记住这些使用场景，平时在用的时候可以刻意多运用就行了。</p>
<h5>七、对象字面量 与 class</h5>
<p>ES6针对对象字面量做了许多简化语法的处理。</p>
<ul><li>当属性与值的变量同名时。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const name = 'Jane';
const age = 20

// es6
const person = {
  name,
  age
}

// es5
var person = {
  name: name,
  age: age
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> name = <span class="hljs-string">'Jane'</span>;
<span class="hljs-keyword">const</span> age = <span class="hljs-number">20</span>

<span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> person = {
  name,
  age
}

<span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: name,
  <span class="hljs-attr">age</span>: age
};</code></pre>
<p>那么这种方式在任何地方都可以使用，比如在一个模块对外提供接口时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getName = () => person.name;
const getAge = () => person.age;

// commonJS的方式
module.exports = { getName, getAge }

// ES6 modules的方式
export default { getName, getAge  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> getName = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> person.name;
<span class="hljs-keyword">const</span> getAge = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> person.age;

<span class="hljs-comment">// commonJS的方式</span>
<span class="hljs-built_in">module</span>.exports = { getName, getAge }

<span class="hljs-comment">// ES6 modules的方式</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> { getName, getAge  }</code></pre>
<ul><li>除了属性之外，对象字面量写法中的方法也可以有简写方式。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es6
const person = {
  name,
  age,
  getName() { // 只要不使用箭头函数，this就还是我们熟悉的this
    return this.name
  }
}

// es5
var person = {
  name: name,
  age: age,
  getName: function getName() {
    return this.name;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// es6</span>
<span class="hljs-keyword">const</span> person = {
  name,
  age,
  getName() { <span class="hljs-comment">// 只要不使用箭头函数，this就还是我们熟悉的this</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}

<span class="hljs-comment">// es5</span>
<span class="hljs-keyword">var</span> person = {
  <span class="hljs-attr">name</span>: name,
  <span class="hljs-attr">age</span>: age,
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
  }
};</code></pre>
<ul><li>在对象字面量中可以使用中括号作为属性，表示属性名也能是一个变量了。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const name = 'Jane';
const age = 20

const person = {
  [name]: true,
  [age]: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> name = <span class="hljs-string">'Jane'</span>;
<span class="hljs-keyword">const</span> age = <span class="hljs-number">20</span>

<span class="hljs-keyword">const</span> person = {
  [name]: <span class="hljs-literal">true</span>,
  [age]: <span class="hljs-literal">true</span>
}</code></pre>
<p>在ant-design的源码实现中，就大量使用了这种方式来拼接当前元素的className，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let alertCls = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !this.state.closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner,
 }, className);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> alertCls = classNames(prefixCls, {
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-<span class="hljs-subst">${type}</span>`</span>]: <span class="hljs-literal">true</span>,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-close`</span>]: !<span class="hljs-keyword">this</span>.state.closing,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-with-description`</span>]: !!description,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-no-icon`</span>]: !showIcon,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-banner`</span>]: !!banner,
 }, className);</code></pre>
<blockquote>ant-design是一个认可度非常高的UI组件库，官方使用react的方式进行了实现，除此之外，还有vue也有对应的实现，有兴趣的同学可以去他们的官网了解学习。<a href="https://ant.design/index-cn" rel="nofollow noreferrer" target="_blank">https://ant.design/index-cn</a>
</blockquote>
<ul><li>class</li></ul>
<p>ES6为我们创建对象提供了新的语法糖，这就是Class语法。如果你对ES5中面向对象的方式比较熟悉的话，Class掌握起来也是非常迅速的，因为除了写法的不同，它并不会增加新的难以理解的知识点。我们先利用一个简单的例子来看看写法的不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 原型方法
Person.prototype.getName = function() {
  return this.name
}

// ES6
class Person {
  constructor(name, age) {  // 构造函数
    this.name = name;
    this.age = age;
  }

  getName() {  // 原型方法
    return this.name
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES5</span>
<span class="hljs-comment">// 构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-comment">// 原型方法</span>
Person.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
}

<span class="hljs-comment">// ES6</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, age) {  <span class="hljs-comment">// 构造函数</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
  }

  getName() {  <span class="hljs-comment">// 原型方法</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}</code></pre>
<blockquote>babel会将ES6的写法编译成为利用Object.defineProperty实现的方式，这个方法的具体用处大家可以在《JavaScript高级编程3》中学习了解，包括get，set，等都有详细的说明</blockquote>
<p>除此之外，我们还需要特别注意在实际使用中的几种写法方式的不同，在下面的例子注释中，我说明了他们分别对应的ES5中的含义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor(name, age) {  // 构造函数
    this.name = name;
    this.age = age;
  }

  getName() {   // 这种写法表示将方法添加到原型中
    return this.name
  }

  static a = 20;  // 等同于 Person.a = 20

  c = 20;   // 表示在构造函数中添加属性 在构造函数中等同于 this.c = 20

// 箭头函数的写法表示在构造函数中添加方法，在构造函数中等同于this.getAge = function() {}
  getAge = () => this.age   

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, age) {  <span class="hljs-comment">// 构造函数</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
  }

  getName() {   <span class="hljs-comment">// 这种写法表示将方法添加到原型中</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }

  <span class="hljs-keyword">static</span> a = <span class="hljs-number">20</span>;  <span class="hljs-comment">// 等同于 Person.a = 20</span>

  c = <span class="hljs-number">20</span>;   <span class="hljs-comment">// 表示在构造函数中添加属性 在构造函数中等同于 this.c = 20</span>

<span class="hljs-comment">// 箭头函数的写法表示在构造函数中添加方法，在构造函数中等同于this.getAge = function() {}</span>
  getAge = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.age   

}
</code></pre>
<p>箭头函数需要注意的仍然是this的指向问题，因为箭头函数this指向不能被改变的特性，因此在react组件中常常利用这个特性来在不同的组件进行传值会更加方便。</p>
<ul><li>继承 extends</li></ul>
<p>相比ES5，ES6的继承就要简单很多，我们直接来看一个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name
  }
}

// Student类继承Person类
class Student extends Person {
  constructor(name, age, gender, classes) {
    super(name, age);
    this.gender = gender;
    this.classes = classes;
  }

  getGender() {
    return this.gender;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, age) {
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
  }

  getName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}

<span class="hljs-comment">// Student类继承Person类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, age, gender, classes) {
    <span class="hljs-keyword">super</span>(name, age);
    <span class="hljs-keyword">this</span>.gender = gender;
    <span class="hljs-keyword">this</span>.classes = classes;
  }

  getGender() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.gender;
  }
}</code></pre>
<p>我们只需要一个extends关键字，就可以实现继承了，不用像ES5那样去担心构造函数继承和原型继承，除此之外，我们还需要关注一个叫做<code>super</code>的方法。</p>
<p>在继承的构造函数中，我们必须如上面的例子那么调用一次super方法，它表示构造函数的继承，与ES5中利用call/apply继承构造函数是一样的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数中
// es6
super(name, age);

// es5
Person.call(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 构造函数中</span>
<span class="hljs-comment">// es6</span>
<span class="hljs-keyword">super</span>(name, age);

<span class="hljs-comment">// es5</span>
Person.call(<span class="hljs-keyword">this</span>);</code></pre>
<blockquote>super还可以直接调用父级的原型方法，<code>super.getName</code>，但是我自己从来没这样用过，也就不扩展说了。</blockquote>
<p>继承在react中有大量的使用场景，许多组件都利用继承来创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

class App extends Component {

  defaultProps = {}
  state = {}
  componentWillMount() {}
  componentDidMount() {}

  btnClick = e => {}

  render() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  defaultProps = {}
  state = {}
  componentWillMount() {}
  componentDidMount() {}

  btnClick = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {}

  render() {}
}</code></pre>
<p>只要根据我们上面所学到的知识，明确的知道哪些属性方法是放在构造函数中，哪些属性方法是放到了原型中，那么我们自己在编写react组件的时候就要简单和清晰很多。</p>
<p>其实只要我们ES5面向对象的知识足够扎实，ES6和react掌握起来也没有太多的难度，所有的学习难点，并不在ES6这些不同的语法糖上，而在于ES5中的原理，因此我在前面分享ES5的核心知识的时候，很多读者老爷都迫不及待的希望我能够更多的说一说ES6的知识。其实我们都没有必要那么着急，只要前面10多篇文章的知识足够扎实，这篇文章所涉及到的常用的ES6知识，最多花30分钟也就掌握了。这些写法上的不同并不会造成大家理解上的困难，只需要有一个熟悉过程就行了。所以大家的重点，还是要回归到基础上来。</p>
<h5>八、Promise</h5>
<p><a href="http://www.jianshu.com/p/fe5f173276bd" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/fe5f...</a></p>
<h5>九、 模块 Modules</h5>
<p>因为学习模块需要一个学习场景，因此我决定在下一篇文章中结合<code>create-react-app</code>一起分享给大家。</p>
<p>深入学习ES6推荐 <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/</a></p>
<p><a href="https://segmentfault.com/a/1190000012646488">前端基础进阶系列目录</a></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端基础进阶（十四）：es6常用基础合集

## 原文链接
[https://segmentfault.com/a/1190000012646425](https://segmentfault.com/a/1190000012646425)

