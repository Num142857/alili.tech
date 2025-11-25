---
title: 'React系列---React（一）初识React' 
date: 2019-01-11 2:30:08
hidden: true
slug: jcr1kwph98a
categories: [reprint]
---

{{< raw >}}

                    
<p>React系列---React（一）初识React<br><a href="https://segmentfault.com/a/1190000009921542">React系列---React（二）组件的prop和state</a><br><a href="https://segmentfault.com/a/1190000009921634" target="_blank">React系列---React（三）组件的生命周期</a></p>
<p><span class="img-wrap"><img data-src="/img/bVPDaH?w=578&amp;h=270" src="https://static.alili.tech/img/bVPDaH?w=578&amp;h=270" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>React是Facebook推出的一个JavaScript库，它的口号就是“用来创建用户界面的JavaScript库”，所以它只是和用户界面打交道，可以把它看成MVC中的V（视图）层。</p>
<h1 id="articleHeader0">React三大特性</h1>
<h2 id="articleHeader1">组件</h2>
<p>React的一切基于组件。使用React，唯一要关心的就是构建组件。各个组件有各自的状态，状态变更时，会自动重新渲染组件。组件特性也是Web前端发展的趋势。</p>
<p>一个Profile组件的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Profile.jsx
import React from 'react';
export default Class Profile extends React.Component {
    render() {
        return (
          <div  className=&quot;profile-component&quot;>
            <h2>Hi, I am {this.props.name}</h2>
          </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Profile.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Class Profile extends React.Component {
    render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>  <span class="hljs-attr">className</span>=<span class="hljs-string">"profile-component"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Hi, I am {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>其他组件中，可以像HTML标签一样引用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Profile from './profile';

export default function(props) {
    return (
      <Profile />
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Profile <span class="hljs-keyword">from</span> <span class="hljs-string">'./profile'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Profile</span> /&gt;</span>
    )
}</span></code></pre>
<h2 id="articleHeader2">JSX</h2>
<p>上面的render方法中，有一种直接把HTML嵌套在JS中的写法，被称作JSX。这种语法结合了JavaScript和HTML的优点，即可以像平常一样使用HTML，也可以在里面嵌套JavaScript语法，运行时，Babel等工具会将JSX编译成JavaScript语法。</p>
<p>用HTML这种语义化的方式代替写JavaScript，总让人惬意许多。</p>
<h2 id="articleHeader3">Virtual DOM</h2>
<p>React的设计中，开发者基本上无需操纵实际的DOM节点，每个React组件都是用Virtual DOM渲染的，可以看成是一种用JavaScript实现的内存DOM抽象。React在Virtual DOM上实现了一个Diff算法，渲染组件时，会高效的找出变更的节点，刷新到实际DOM上。</p>
<h1 id="articleHeader4">理解React特性</h1>
<h2 id="articleHeader5">理解Virtual DOM</h2>
<p>Web页面是由一个个HTML元素嵌套组合而成的。当使用JavaScript来描述这些元素时，这些元素可以简单地被表示成纯粹的JSON对象的。<br>比如现在需要描述一个按钮（button），我们都知道，HTML语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;btn btn-blue&quot;>
    <em>Confirm</em>
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"btn btn-blue"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>Confirm<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/button&gt;</span></code></pre>
<p>其中包括了元素的类型和属性。我们可以用这样一个JSON对象去表达这个按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'button',
  props: {
    className: 'btn btn-blue',
    children: {
      type: 'em',
      props: {
        children: 'Confirm'
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'button'</span>,
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">className</span>: <span class="hljs-string">'btn btn-blue'</span>,
    <span class="hljs-attribute">children</span>: {
      <span class="hljs-attribute">type</span>: <span class="hljs-string">'em'</span>,
      <span class="hljs-attribute">props</span>: {
        <span class="hljs-attribute">children</span>: <span class="hljs-string">'Confirm'</span>
      }
    }
  }
}</code></pre>
<p>这即是Virtual DOM的思想：将实际DOM节点抽象为内存中的JavaScript对象。</p>
<h2 id="articleHeader6">理解组件</h2>
<p>当然，我们可以很方便地封装上述button元素，得到一种构建按钮的公共方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button => ({ color, text }) {
    return {
      type: 'button',
      props: {
        className: `btn btn-${color}`,
        children: {
          type: 'em',
          props: {
            children: text,
          },
        },
      },
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>const Button =&gt; ({ color, text }) {
    return {
      type: <span class="hljs-string">'button'</span>,
      props: {
        className: `btn btn-${color}`,
        children: {
          type: <span class="hljs-string">'em'</span>,
          props: {
            children: text,
          },
        },
      },
    };
}</code></pre>
<p>当我们要生成DOM元素中具体按钮时，就可以调用Button({color:'blue', text:'Confirm'})来创建。<br>仔细思考这个过程可以发现，Button方法其实也可以作为元素存在（上面的Profile组件，就是这一回事），方法名对应了DOM元素类型，参数对应了DOM元素属性，这样构建的元素就是React的组件元素。JSON结构描述这个组件的话，大概是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    type: Button,
    props: {
      color: 'blue',
      children: 'Confirm'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">type</span>: Button,
    props: {
      color: <span class="hljs-string">'blue'</span>,
      children: <span class="hljs-string">'Confirm'</span>
    }
}</code></pre>
<p>这也是React的核心思想之一。因为有公共的表达方法，我们就可以让元素们彼此嵌套混合。这些层层封装的React组件元素，最终递归渲染出完整的DOM树。</p>
<hr>
<p>React系列---React（一）初识React<br><a href="https://segmentfault.com/a/1190000009921542">React系列---React（二）组件的prop和state</a><br><a href="https://segmentfault.com/a/1190000009921634" target="_blank">React系列---React（三）组件的生命周期</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---React（一）初识React

## 原文链接
[https://segmentfault.com/a/1190000009882841](https://segmentfault.com/a/1190000009882841)

