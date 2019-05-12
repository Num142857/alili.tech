---
title: 'react开发教程（三）组件的构建' 
date: 2019-01-16 2:30:08
hidden: true
slug: e6ndmck91n9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">什么是组件</h1>
<p>组件化就好像我们的电脑装机一样，一个电脑由显示器、主板、内存、显卡、硬盘，键盘，鼠标...。</p>
<p>组件化开发有如下的好处：<br>降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求。<br>例如输入框，可以替换为日历、时间、范围等组件作具体的实现。调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单。<br>提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级。</p>
<p>在团队开发中，组件化带来的优势是便于协同开发，由于代码中的耦合度降低了，每个模块都可以分拆为一个组件，例如异步请求组件，路由组件，各个视图组件。<br>团队中每个人发挥所长维护各自组件，对整个应用来说是精细的打磨。</p>
<p>在Javascript 的开发中，组件化其实和模块化的意义相当，大概是根据功能、业务进行代码划分，使到这部分的代码可以被复用，例如 $、_ 这些工具库就是将功能进行模块化。<br>其实组件化的本质上和我们以往的模块化并无差别。<br>只不过模块化是对js进行了模块的打包，而一个组件包含了对应的（css，js，数据）</p>
<h2 id="articleHeader1">组件的规范</h2>
<p>组件化的封装思路就是面向对象思想；</p>
<ol>
<li>基本的封装特性</li>
<li>简单的生命周期（组件的创建，更新，卸载）</li>
<li>明确的数据流动（更具参数的不同做出不同的响应）</li>
</ol>
<h1 id="articleHeader2">React组件构建</h1>
<p>Web Components通过自定义元素的方式实现组件化，而React的本质就是关心元素的构成，React组件即为组件元素。组件元素被描述成纯粹的JSON对象，意味着可以使用方法或是类来构建。React组件基本由3个部分构成----属性(props)、状态（state）、以及生命周期方法。</p>
<h2 id="articleHeader3">React.createClass</h2>
<p>用React.creatClass构建组件是React最传统，也是兼容性最好的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    const List = React.createClass({
        getDefaultProps() {
            return {
                color : &quot;#f00&quot;,
                text : &quot;我是列表&quot;
            }
        },
        
        render() {
            const {color,test} = this.props;
            return (
                <li className={`btn btn-${color}`}>{test}</li>
            )
        }
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">List</span> = React.createClass({
        getDefaultProps() {
            <span class="hljs-keyword">return</span> {
                color : <span class="hljs-string">"#f00"</span>,
                text : <span class="hljs-string">"我是列表"</span>
            }
        },
        
        render() {
            <span class="hljs-keyword">const</span> {color,<span class="hljs-keyword">test</span>} = this.props;
            <span class="hljs-keyword">return</span> (
                &lt;<span class="hljs-keyword">li</span> className={`btn btn-<span class="hljs-variable">${color}</span>`}&gt;{<span class="hljs-keyword">test</span>}&lt;/<span class="hljs-keyword">li</span>&gt;
            )
        }
    })
</code></pre>
<p>调用的时候只需要&lt;List/&gt;,每一次调用都会被编译成React.createElement(List)方法来创建List实例，这意味着每次调用&lt;List/&gt;就会创建一次li;</p>
<h2 id="articleHeader4">ES6 class</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    import React, {Component} from 'react';
    class List extends Component {
        constructor(props) {
            super(props)
        }
        
        static defaultProps = {
            color : &quot;#f00&quot;,
            text : &quot;我是列表&quot;
        };
        
        render() {
            const {color,test} = this.props;
            return (
                <li className={`btn btn-${color}`}>{test}</li>
            )
        }
        
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        <span class="hljs-keyword">constructor</span>(props) {
            <span class="hljs-keyword">super</span>(props)
        }
        
        <span class="hljs-keyword">static</span> defaultProps = {
            <span class="hljs-attr">color</span> : <span class="hljs-string">"#f00"</span>,
            <span class="hljs-attr">text</span> : <span class="hljs-string">"我是列表"</span>
        };
        
        render() {
            <span class="hljs-keyword">const</span> {color,test} = <span class="hljs-keyword">this</span>.props;
            <span class="hljs-keyword">return</span> (
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn-</span>${<span class="hljs-attr">color</span>}`}&gt;</span>{test}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
            )
        }
        
    }
</code></pre>
<h2 id="articleHeader5">无状态函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    function List({color=&quot;#f00&quot;,test=&quot;我是列表&quot;}){
        return (
            <li className={`btn btn-${color}`}>{test}</li>
        )
    } 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">List</span>(<span class="hljs-params">{color=<span class="hljs-string">"#f00"</span>,test=<span class="hljs-string">"我是列表"</span>}</span>)</span>{
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn-</span>${<span class="hljs-attr">color</span>}`}&gt;</span>{test}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        )
    } 
</code></pre>
<p>无状态函数构建的组件称为无状态组件，这种构建方式是0.14版本后新增的，官方推崇</p>
<p>在合适的情况下我们都应该使用这种组件方式。无状态组件不像上述两种方法在调用时会创建新实例，它创建时始终保持了一个实例，避免了不必要的检查和内存分配，做到了内存优化。</p>
<p>上一篇：<a href="https://segmentfault.com/a/1190000009099250">react开发教程（二）安装</a><br>下一篇：<a href="https://segmentfault.com/a/1190000009139532" target="_blank">react开发教程（四）React数据流</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（三）组件的构建

## 原文链接
[https://segmentfault.com/a/1190000009123395](https://segmentfault.com/a/1190000009123395)

