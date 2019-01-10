---
title: 'react进阶系列：高阶组件详解（一）' 
date: 2019-01-11 2:30:07
hidden: true
slug: bdc11l693cl
categories: [reprint]
---

{{< raw >}}

                    
<p>很多人写文章喜欢把问题复杂化，因此当我学习高阶组件的时候，查阅到的很多文章都给人一种高阶组件高深莫测的感觉。但是事实上却未必。</p>
<p>有一个词叫做“封装”。相信写代码这么久了，大家对这个词所表达的含义都不会陌生。我们通常会将功能相同或者相似的代码提取出来封装成为一个可共用的函数或者对象，这也是我们从初学者慢慢进阶的必经之路。而高阶组件就是一个封装行为。</p>
<p>但是高阶组件的封装与我们通常所使用的不太一样，如果完全一样也就不是那么难理解了。好在我们有一个常用的口头语“<code>包一层</code>“刚好可以用来简单解释高阶组件的不同。在普通组件外面包一层逻辑，就是高阶组件。</p>
<p>关于”包一层“，可以通过一个非常简单的例子来理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

class Div extends Component {
    componentDidMount() {
        console.log('这是新增的能力');
    }
    render () {
        return (
            <div>{ this.props.children }</div>
        )
    }
}

export default Div;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Div</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        console.log('这是新增的能力');
    }
    render () {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;{ <span class="hljs-keyword">this</span>.props.children }&lt;/div&gt;
        )
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Div</span>;</code></pre>
<p>在上面的例子中，我们把html的DIV标签作为基础元件。对他新增了一个输出一条提示信息的能力。而新的Div组件，就可以理解为div标签的高阶组件。到这里希望大家已经理解了包一层的具体含义。</p>
<p>为了更加透彻的理解“包一层”的概念，我们需要来回顾一下new与构造函数之间的关系。在前面我有文章提到过为什么构造函数中this在运行时会指向new出来的实例，不知道还有没有人记得。我将那段代码复制过来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 先一本正经的创建一个构造函数，其实该函数与普通函数并无区别
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        return this.name;
    }
}

// 将构造函数以参数形式传入
function New(func) {

    // 声明一个中间对象，该对象为最终返回的实例
    var res = {};
    if (func.prototype !== null) {

        // 将实例的原型指向构造函数的原型
        res.__proto__ = func.prototype;
    }

    // ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

    // 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
    if ((typeof ret === &quot;object&quot; || typeof ret === &quot;function&quot;) &amp;&amp; ret !== null) {
        return ret;
    }

    // 如果没有明确指定返回对象，则默认返回res，这个res就是实例对象
    return res;
}

// 通过new声明创建实例，这里的p1，实际接收的正是new中返回的res
var p1 = New(Person, 'tom', 20);
console.log(p1.getName());

// 当然，这里也可以判断出实例的类型了
console.log(p1 instanceof Person); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 先一本正经的创建一个构造函数，其实该函数与普通函数并无区别</span>
<span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-comment">// 将构造函数以参数形式传入</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">New</span>(<span class="hljs-params">func</span>) </span>{

    <span class="hljs-comment">// 声明一个中间对象，该对象为最终返回的实例</span>
    <span class="hljs-keyword">var</span> res = {};
    <span class="hljs-keyword">if</span> (func.prototype !== <span class="hljs-literal">null</span>) {

        <span class="hljs-comment">// 将实例的原型指向构造函数的原型</span>
        res.__proto__ = func.prototype;
    }

    <span class="hljs-comment">// ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象</span>
    <span class="hljs-keyword">var</span> ret = func.apply(res, <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>));

    <span class="hljs-comment">// 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象</span>
    <span class="hljs-keyword">if</span> ((<span class="hljs-keyword">typeof</span> ret === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> ret === <span class="hljs-string">"function"</span>) &amp;&amp; ret !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> ret;
    }

    <span class="hljs-comment">// 如果没有明确指定返回对象，则默认返回res，这个res就是实例对象</span>
    <span class="hljs-keyword">return</span> res;
}

<span class="hljs-comment">// 通过new声明创建实例，这里的p1，实际接收的正是new中返回的res</span>
<span class="hljs-keyword">var</span> p1 = New(Person, <span class="hljs-string">'tom'</span>, <span class="hljs-number">20</span>);
<span class="hljs-built_in">console</span>.log(p1.getName());

<span class="hljs-comment">// 当然，这里也可以判断出实例的类型了</span>
<span class="hljs-built_in">console</span>.log(p1 <span class="hljs-keyword">instanceof</span> Person); <span class="hljs-comment">// true</span></code></pre>
<p>在上面的例子中，首先我们定义了一个本质上与普通函数没区别的构造函数，然后将该构造函数作为参数传入New函数中。我在New函数中进行了一些的逻辑处理，让New函数的返回值为一个实例，正因为New的内部逻辑，让构造函数中的this能够指向返回的实例。这个例子就是一个“包一层”的案例。如果因为基础不够扎实导致你对上面的例子确实理解不了，我们还可以简单粗暴的把上面的例子分成三个步骤来记忆。</p>
<ol>
<li>创建一个普通函数（因为new的存在所以变成构造函数）</li>
<li>
<p>创建一个new方法</p>
<ul>
<li>在new方法中，创建一个中间实例res</li>
<li>对中间实例res经过逻辑处理之后返回res</li>
</ul>
</li>
<li>使用new方法创建实例</li>
</ol>
<p>而恰好，高阶组件的创建逻辑与使用，与这里的new方法<strong>完全一致</strong>。因为new方法其实就是构造函数的”高阶组件“。按照这个步骤，我们来尝试一步一步创建一个高阶组件。</p>
<p>第一步，创建一个最简单的基础组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Basic extends Component {
    render() {
        return (
            <div>{ this.props.children }</div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Basic</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{ this.props.children }<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>第二步，根据上栗new方法的步骤，来创建高阶组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/Addsss.jsx
import React from 'react';

// 基础组件作为高阶组件的参数传入
function Addsss(Container) {

    // 创建一个中间组件，该中间组件会在添加了逻辑之后返回
    return class Asss extends React.Component {
        componentDidMount() {}
        render() {
            return (
                // 高阶组件往基础组件中传入了一个name属性，这是高阶组件赋予基础组件的新能力，当然，根据实际需求还可以添加更为复杂的新能力
                <Container name=&quot;asper&quot;>{ this.props.children }</Container>
            )
        }
    }
}

export default Addsss;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/Addsss.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-comment">// 基础组件作为高阶组件的参数传入</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Addsss</span>(<span class="hljs-params">Container</span>) </span>{

    <span class="hljs-comment">// 创建一个中间组件，该中间组件会在添加了逻辑之后返回</span>
    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Asss</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        componentDidMount() {}
        render() {
            <span class="hljs-keyword">return</span> (
                <span class="hljs-comment">// 高阶组件往基础组件中传入了一个name属性，这是高阶组件赋予基础组件的新能力，当然，根据实际需求还可以添加更为复杂的新能力</span>
                &lt;Container name=<span class="hljs-string">"asper"</span>&gt;{ <span class="hljs-keyword">this</span>.props.children }&lt;<span class="hljs-regexp">/Container&gt;
            )
        }
    }
}

export default Addsss;</span></code></pre>
<p>高阶组件在基础组件中调用，并将高阶组件的运行结果返回给模块外部。因此基础组件的代码调整如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/basic.jsx
import React, { Component } from 'react';
import Addsss from './Addsss';

class Basic extends Component {
    componentDidMount() {
        // 在基础组件中试图访问高阶组件传入的新参数
        console.log(this.props.name);
    }
    render() {
        return (
            <div className={this.props.name}>{ this.props.children }</div>
        )
    }
}

// 这里相当于执行了一次new操作，返回了一个实例，其实运行结果真是高阶组件中的中间组件
export default Addsss(Basic);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/basic.jsx</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Addsss <span class="hljs-keyword">from</span> <span class="hljs-string">'./Addsss'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Basic</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        <span class="hljs-comment">// 在基础组件中试图访问高阶组件传入的新参数</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.props.name);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{this.props.name}</span>&gt;</span>{ this.props.children }<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-comment">// 这里相当于执行了一次new操作，返回了一个实例，其实运行结果真是高阶组件中的中间组件</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Addsss(Basic);</code></pre>
<p>我们看到其实在基础组件中，对外抛出的接口是Addsss(Basic)，这是高阶组件里定义的函数运行的结果。也就是说，其实基础组件中返回的是高阶组件中定义的Asss中间组件。这和new的思路几乎完全一致。</p>
<p>所以我们可以简单理解为：react组件的高阶组件，就是在基础react组件外面包一层，给该基础组件赋予新的能力。</p>
<p>当然，想要熟练使用高阶组件并不是一件容易的事情，我们还需要更多的思考他。在下面一篇文章中我将会以实际的案例来分析高阶组件的使用场景与他到底给我们带来了哪些便利。</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react进阶系列：高阶组件详解（一）

## 原文链接
[https://segmentfault.com/a/1190000009937019](https://segmentfault.com/a/1190000009937019)

