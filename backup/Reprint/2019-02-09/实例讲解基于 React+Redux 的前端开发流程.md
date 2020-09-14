---
title: '实例讲解基于 React+Redux 的前端开发流程' 
date: 2019-02-09 2:30:59
hidden: true
slug: fdqbm8ifyww
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：在当下的前端界，react 和 redux 发展得如火如荼，react 在 github 的 star 数达 42000 +，超过了 jquery 的 39000+，也即将超过前几年比较火的angular 1 的 49000+；redux 的 star 数也要接近 20000，可见大家对其的热情程度，究竟是什么魔力让大家为之疯狂呢？让我们上车，亲自体验一波试试~~本文章偏向于讲解redux流程。</p>
<p>宅印前端基于 react + redux 的模式开发，我们指定了一套分工明确的并行开发流程。下面通过一个 <strong>“苹果篮子”</strong> 实例，来看看整个应用开发流程。</p>
<blockquote>非常感谢 @ckinmind 为本教程提供完整源码demo <br>完整源码：<a href="https://github.com/ckinmind/apple-basket-redux" rel="nofollow noreferrer" target="_blank">https://github.com/ckinmind/a...</a><br>实例体验 <a href="https://ckinmind.github.io/apple-basket-redux/" rel="nofollow noreferrer" target="_blank">https://ckinmind.github.io/ap...</a><br>(摘苹果的过程模拟请求网络，体现一个异步动作，所以响应看起来有些延迟)</blockquote>
<p><strong>更优雅的方式</strong>：如果你想更优雅地使用  react + redux ，欢迎查看我的最新系列文章 <a href="https://segmentfault.com/a/1190000013985433">pastate.js 响应式 react 框架</a>。</p>
<p>首先，我们来看看这个实例的原型：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633602" src="https://static.alili.tech/img/remote/1460000007633602" alt="苹果篮子" title="苹果篮子" style="cursor: pointer;"></span></p>
<p>看到这个水果篮子的样子，大家应该可以明白它的功能：你可以做两件事 -- 摘苹果和吃苹果。当你摘苹果时，应用会向后台发送ajax请求索取苹果，每个苹果有两个属性：编号和重量。当你吃苹果掉时，不用告诉后台，在前端偷偷吃掉就好啦~ 同时苹果篮子会显示当前的苹果量和已经吃掉的苹果量。好！那下面我们来开工！</p>
<p>下面先来总体了解一下 redux 应用的基本原理，一图胜千言：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633603" src="https://static.alili.tech/img/remote/1460000007633603" alt="redux 流程" title="redux 流程" style="cursor: pointer;"></span></p>
<p>可见整个redux流程的逻辑非常清晰，数据流是单向循环的，就像一个生产的流水线：</p>
<blockquote>store（存放状态） -&gt; container（显示状态） -&gt; reducer （处理动作）-&gt; store</blockquote>
<p>这一点对精细化分工协作很有好处。</p>
<p>我们来看看这三个概念：</p>
<ul>
<li>
<strong>store</strong> 是应用的状态管理中心，保存着是应用的状态（state），当收到状态的更新时，会触发视觉组件进行更新。</li>
<li>
<strong>container</strong>  是视觉组件的容器，负责把传入的状态变量渲染成视觉组件，在浏览器显示出来。</li>
<li>
<strong>reducer</strong> 是动作(action)的处理中心， 负责处理各种动作并产生新的状态（state），返回给store。</li>
</ul>
<p>NOTE：从对象的包含关系上讲，reducer 是store的一部分，但在逻辑上我们把它分出来，这样会比较容易理解整个redux流程。</p>
<p>我们可以做个形象的比喻，把 js 比喻成巴士，把 store, container, reducer 比喻为三个车站，再把 state 和 action 比喻成两种乘客。这是一趟环路巴士：</p>
<ol>
<li>
<em><code>js巴士</code></em> 从 <em><code>store车站</code></em> 出发，载上 <em><code>state乘客</code></em> ，<em><code>state乘客</code></em> 到达某个 <em><code>container车站</code></em> 下车并把自己展示出来</li>
<li>过了一会，有一个 <em><code>action乘客</code></em> 上车了，<em><code>js巴士</code></em> 把 <em><code>action乘客</code></em> 送到 <em><code>reducer车站</code></em>，在这里 <em><code>action乘客</code></em> 和  <em><code>state乘客</code></em> 生了一个孩子 <em><code>new state</code></em>，js巴士把 <em><code>new state</code></em> 送回了 <em><code>store车站</code></em>（好像是人生轮回→_→）</li>
</ol>
<p>redux 只是定义了应用的数据流程，只解决了 “数据层”（model layer） 的问题，一般还会使用 react， angular 等作为“显示层” （UI layer） 来一起使用，我们项目采用 react 作为显示框架。</p>
<p>在开始之前，这里先提供一些介绍react和redux的参考资料，如果在下文遇到哪些点不理解，可以来这里翻看参考资料：</p>
<ul>
<li>react相关： <a href="http://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">react官网</a>, <a href="http://reactjs.cn/" rel="nofollow noreferrer" target="_blank">react中文站点</a>,  <a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">阮一峰react 入门</a>, <a href="http://react-china.org/c/jiao-cheng" rel="nofollow noreferrer" target="_blank">react教程集合</a>
</li>
<li>redux相关：<a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">redux官网</a> , <a href="http://cn.redux.js.org/" rel="nofollow noreferrer" target="_blank">redux中文文档</a>
</li>
</ul>
<p>下文的展示的js代码，会用到少量简单的 <a href="http://es6.ruanyifeng.com/#docs/intro" rel="nofollow noreferrer" target="_blank">es6</a> 语法，可以在遇到时参考这里，或自己查找资料：</p>
<ul>
<li>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import" rel="nofollow noreferrer" target="_blank">import</a> / <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export" rel="nofollow noreferrer" target="_blank">export</a> ：es6代码模块化模式</li>
<li>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let" rel="nofollow noreferrer" target="_blank">let 声明语句</a> ： 块级变量声明语句</li>
<li>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="nofollow noreferrer" target="_blank">箭头函数</a>： (..) =&gt; {..} 形式的函数</li>
</ul>
<p>我们会使用 babel 编译器把es6语法编译成es5, 所以大家不必担心浏览器兼容性问题，可以大胆使用es6。</p>
<p>应用的基础配置工作由前端开发主管负责，大家不必详细理解。</p>
<h2 id="articleHeader0">按任务分工来分步讲解</h2>
<p>按照开发的内容，我们把前端团队分为两个小组： “布局组” 和 “逻辑组”，每个小组有2种任务，一共4种任务。</p>
<ul>
<li>
<p><strong>布局组</strong> - 负责 contianer、component 部分</p>
<ul>
<li>任务1：<strong>静态布局</strong>  - 使用 HTML + CSS 静态布局</li>
<li>任务2：<strong>动态布局</strong>  - 使用 JSX 语法对静态布局做动态渲染处理</li>
</ul>
</li>
<li>
<p><strong>逻辑组</strong> - 负责 action、reducer 部分</p>
<ul>
<li>任务1：<strong>action 开发</strong> - 制作 redux 流程的 action</li>
<li>任务2：<strong>reducer 开发</strong> - 制作 redux 流程的 reducer</li>
</ul>
</li>
</ul>
<p><strong>布局组</strong> 要求对 HTML + CSS 布局比较熟悉，只需要会简单的 js 即可， 不需要完整地理解redux流程。<br><strong>逻辑组</strong> 要求对 js 比较熟悉，最好可以比较完整地理解redux流程， 但基本不需要涉及HTML + CSS布局工作。</p>
<p>接下来，先给出我们教程相关的 src 目录。这里大家可以先一扫而过，大概了解即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- src              源码文件夹：包含项目源码，我们基本都在这个文件夹下做开发
    - containers   容器文件夹：存放容器组件，比如 “苹果篮子”
    - components   组件文件夹：存放普通显示组件，比如 “苹果”
    - actions      actions文件夹：存放可以发出的action 
    - reducers     reducers文件夹：存放action的处理器reducers
    - services     服务文件夹：存放经过封装的服务，如 ajax服务, 模拟数据服务
    - styles       样式文件夹：存放应用的样式，如css, scss
    - images       图片文件夹：存放图片资源
    - apis         开发接口文件夹：存放开发接口文档" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> src              源码文件夹：包含项目源码，我们基本都在这个文件夹下做开发
</span>    -<span class="ruby"> containers   容器文件夹：存放容器组件，比如 “苹果篮子”
</span>    -<span class="ruby"> components   组件文件夹：存放普通显示组件，比如 “苹果”
</span>    -<span class="ruby"> actions      actions文件夹：存放可以发出的action 
</span>    -<span class="ruby"> reducers     reducers文件夹：存放action的处理器reducers
</span>    -<span class="ruby"> services     服务文件夹：存放经过封装的服务，如 ajax服务, 模拟数据服务
</span>    -<span class="ruby"> styles       样式文件夹：存放应用的样式，如css, scss
</span>    -<span class="ruby"> images       图片文件夹：存放图片资源
</span>    -<span class="ruby"> apis         开发接口文件夹：存放开发接口文档</span></code></pre>
<p>下面正式开始啦，先从布局组开始。</p>
<h2 id="articleHeader1">布局组</h2>
<h3 id="articleHeader2">任务1：静态布局</h3>
<ul>
<li>能力要求：只需要会使用 HTML + CSS （SASS）进行布局即可</li>
<li>任务内容：1. 苹果篮子组件（容器组件） 2. 水果组件（显示组件）</li>
</ul>
<p>redux 的组件分为两类，一类是<strong>容器组件 container</strong> ，一类是<strong>普通显示组件 component</strong>。容器负责接收store中的state和并发送action, 大多数时候需要和store直接连接，容器一般不需要多次使用，比如我们这个应用的苹果篮子。普通组件放在容器里面，由容器确定显示的时机、数量和内容，普通组件一般会多次使用。</p>
<h4>1. 苹果篮子容器 AppleBasket.jsx + appleBasket.scss</h4>
<p>苹果篮子组件的原型如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633604" src="https://static.alili.tech/img/remote/1460000007633604" alt="苹果篮子" title="苹果篮子" style="cursor: pointer;"></span></p>
<p>对于容器，我们使用 React 组件类 的方式书写，这里主要是静态的jsx代码，相当于html。</p>
<p>下面是 <em>AppleBasket.jsx</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { connect } from 'react-redux';

class AppleBusket extends React.Component {
  
  render(){
    return (
      <div className=&quot;appleBusket&quot;>
        <div className=&quot;title&quot;>苹果篮子</div>
        
        <div className=&quot;stats&quot;>
            <div className=&quot;section&quot;>
                <div className=&quot;head&quot;>当前</div>
                <div className=&quot;content&quot;>0个苹果，0克</div>
            </div>
            <div className=&quot;section&quot;>
                <div className=&quot;head&quot;>已吃掉</div>
                <div className=&quot;content&quot;>2个苹果，480克</div>
            </div>            
        </div>
                    
        <div className=&quot;appleList&quot;>
            <div className=&quot;empty-tip&quot;>苹果篮子空空如也</div>
        </div>
        
        <div className=&quot;btn-div&quot;>
            <button>摘苹果</button>
        </div>
        
      </div>
    );
  }

}

export default connect()(AppleBusket);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppleBusket</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  
  render(){
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"appleBusket"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"title"</span>&gt;</span>苹果篮子<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"stats"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"section"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"head"</span>&gt;</span>当前<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"content"</span>&gt;</span>0个苹果，0克<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"section"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"head"</span>&gt;</span>已吃掉<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"content"</span>&gt;</span>2个苹果，480克<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>            
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"appleList"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"empty-tip"</span>&gt;</span>苹果篮子空空如也<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn-div"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>摘苹果<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect()(AppleBusket);</code></pre>
<p>同时静态布局开发人员还要负责书写样式，宅印的样式使用sass 书写，  下面是的例子是<em>appleBasket.scss</em> , 大家可以做参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".appleBusket{
    width: 400px;
    margin: 20px;
    border-radius: 4px;
    border: 1px solid #ddd;
    >.title{
        padding: 6px 0px;
        text-align: center;
        color: #069;
        font-size: 20px;
        //font-weight: 600;
    }
    >.stats{
        width: 100%;
        $border: 1px dashed #ddd;
        border-top: $border;
        border-bottom: $border;
        padding: 10px 0px;
        .section{
            display: inline-block;
            width: 50%;
            padding-left: 8px;
            .head{
                padding: 6px 0px;
                font-size: 16px;
                color: #069;
            }
            .content{
                font-size: 20px;
                font-weight: 200;
            }
            &amp;:first-of-type{
                border-right: 1px solid #f0f0f0;
            }
        }
    }
    >.appleList{
        padding: 10px 0px;
        .empty-tip{
            text-align: center;
            font-size: 16px;
            color: #ccc;
            padding: 20px 0px;
        }
    }
    >.btn-div{
        text-align: center;
        button{
            color: #fff;
            background-color: #096;
            border: none;
            font-size: 14px;
            padding: 6px 40px; 
            border-radius: 6px;
            margin: 20px auto;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.appleBusket</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
    &gt;<span class="hljs-selector-class">.title</span>{
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#069</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-comment">//font-weight: 600;</span>
    }
    &gt;<span class="hljs-selector-class">.stats</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-variable">$border</span>: <span class="hljs-number">1px</span> dashed <span class="hljs-number">#ddd</span>;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-variable">$border</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-variable">$border</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0px</span>;
        <span class="hljs-selector-class">.section</span>{
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">8px</span>;
            <span class="hljs-selector-class">.head</span>{
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">0px</span>;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
                <span class="hljs-attribute">color</span>: <span class="hljs-number">#069</span>;
            }
            <span class="hljs-selector-class">.content</span>{
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
                <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">200</span>;
            }
            &amp;:first-of-type{
                <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#f0f0f0</span>;
            }
        }
    }
    &gt;<span class="hljs-selector-class">.appleList</span>{
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0px</span>;
        <span class="hljs-selector-class">.empty-tip</span>{
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0px</span>;
        }
    }
    &gt;<span class="hljs-selector-class">.btn-div</span>{
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#096</span>;
            <span class="hljs-attribute">border</span>: none;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">40px</span>; 
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        }
    }
}</code></pre>
<h4>2. 苹果组件 AppleItem.jsx + appleItem.scss</h4>
<p>苹果组件的样子如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633605" src="https://static.alili.tech/img/remote/1460000007633605" alt="苹果组件" title="苹果组件" style="cursor: pointer;"></span></p>
<p>普通组件的定义方法和容器类似，只是其不需要使用redux连接器来封装，如下：</p>
<p><em>AppleItem.jsx</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class AppleItem extends React.Component {

    render() {

        return (
            <div className=&quot;appleItem&quot;>
                <div className=&quot;apple&quot;><img src=&quot;../images/apple.png&quot; alt=&quot;&quot;/></div>
                <div className=&quot;info&quot;>
                    <div className=&quot;name&quot;>红苹果 - 1号</div>
                    <div className=&quot;weight&quot;>265克</div>
                </div>
                <div className=&quot;btn-div&quot;><button>吃掉</button></div>
            </div>
        );

    }


}

export default AppleItem;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppleItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

    render() {

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"appleItem"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"apple"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../images/apple.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"info"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"name"</span>&gt;</span>红苹果 - 1号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"weight"</span>&gt;</span>265克<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn-div"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>吃掉<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );

    }


}

export default AppleItem;</span></code></pre>
<p>样式文件 appleItem.scss 在此省略。</p>
<p>哪些显示元素要作为容器，哪些要作为普通组件，没有百分之百确定划分规则，大家根据自己的理解把它划分到某一类即可。</p>
<p>这些就是任务一的内容，书写静态布局，基本都是html+css工作，不需要涉及js代码。</p>
<h3 id="articleHeader3">任务2：动态渲染</h3>
<p>写完了静态布局后，接下来要进行动态渲染啦~</p>
<p>动态渲染听起来很高大上，其实意思就是根据一个stete数据对象来显示内容而已。首先需要确定其state的结构。<strong>容器</strong>的state 是 store 中state的一部分，前端管理员会事先约定好其数据结构，并在对应的reducer中给出，只要去那里复制一份出来即可。<strong>普通组件</strong>的state只要自己定义即可，并在文件中说明清楚。</p>
<h4>1. 容器的动态渲染</h4>
<p>下面看看“苹果篮子”的动态布局，我们去 appleBasketReducer.js 可以得到水果篮子的 state 的结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    isPicking : false,
    newAppleId: 1,
    apples: [
        /*{
            id: 0,
            weight: 235,
            isEaten: false
         }*/
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
    <span class="hljs-string">isPicking</span> <span class="hljs-string">:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    newAppleId:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    apples:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">/*{</span>
<span class="hljs-attr">            id:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">            weight:</span> <span class="hljs-number">235</span><span class="hljs-string">,</span>
<span class="hljs-attr">            isEaten:</span> <span class="hljs-literal">false</span>
         <span class="hljs-string">}*/</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">}</span></code></pre>
<p>我们这个数据结构把它 “实例化”，如下这样放在我们改成写的 AppleBasket.jsx 中，然后我们开始书写我们的动态渲染代码啦，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { connect } from 'react-redux';

import AppleItem from '../components/AppleItem';

class AppleBusket extends React.Component {

    render() {
        
        let { state } = this.props;
        
        //这部分从对应的 appleBasketReducer.js 中拷贝
        let mockState = {
            isPicking : false,
            newAppleId: 3,
            apples: [
                {
                    id: 1,
                    weight: 235,
                    isEaten: true
                },
                {
                    id: 2,
                    weight: 256,
                    isEaten: false
                }
            ]
        };
        
        //是否开启模拟数据的开关，注释这行代码关闭模拟数据
        state = mockState;
        
        
        //对 state 做显示级别的转化
        let stats = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        
        state.apples.map(apple => {
            let selector = apple.isEaten ? 'appleEaten':'appleNow';
            stats[selector].quantity ++;
            stats[selector].weight += apple.weight;
        })
        
        
        return (
            <div className=&quot;appleBusket&quot;>
                <div className=&quot;title&quot;>苹果篮子</div>

                <div className=&quot;stats&quot;>
                    <div className=&quot;section&quot;>
                        <div className=&quot;head&quot;>当前</div>
                        <div className=&quot;content&quot;>
                            {stats.appleNow.quantity}个苹果，
                            {stats.appleNow.weight}克
                        </div>
                    </div>
                    <div className=&quot;section&quot;>
                        <div className=&quot;head&quot;>已吃掉</div>
                        <div className=&quot;content&quot;>
                            {stats.appleEaten.quantity}个苹果，
                            {stats.appleEaten.weight}克
                        </div>
                    </div>
                </div>

                <div className=&quot;appleList&quot;>
                    { state.apples.map(apple => <AppleItem state ={apple} />) }
                </div>

                <div className=&quot;btn-div&quot;>
                    <button>摘苹果</button>
                </div>

            </div>
        );
    }

}

function select(state) {
    return {
        state: state.appleBusket
    }
}

export default connect(select)(AppleBusket);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;

<span class="hljs-keyword">import</span> AppleItem <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/AppleItem'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppleBusket</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

    render() {
        
        <span class="hljs-keyword">let</span> { state } = <span class="hljs-keyword">this</span>.props;
        
        <span class="hljs-comment">//这部分从对应的 appleBasketReducer.js 中拷贝</span>
        <span class="hljs-keyword">let</span> mockState = {
            <span class="hljs-attr">isPicking</span> : <span class="hljs-literal">false</span>,
            <span class="hljs-attr">newAppleId</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">apples</span>: [
                {
                    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
                    <span class="hljs-attr">weight</span>: <span class="hljs-number">235</span>,
                    <span class="hljs-attr">isEaten</span>: <span class="hljs-literal">true</span>
                },
                {
                    <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
                    <span class="hljs-attr">weight</span>: <span class="hljs-number">256</span>,
                    <span class="hljs-attr">isEaten</span>: <span class="hljs-literal">false</span>
                }
            ]
        };
        
        <span class="hljs-comment">//是否开启模拟数据的开关，注释这行代码关闭模拟数据</span>
        state = mockState;
        
        
        <span class="hljs-comment">//对 state 做显示级别的转化</span>
        <span class="hljs-keyword">let</span> stats = {
            <span class="hljs-attr">appleNow</span>: {
                <span class="hljs-attr">quantity</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">weight</span>: <span class="hljs-number">0</span>
            },
            <span class="hljs-attr">appleEaten</span>: {
                <span class="hljs-attr">quantity</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">weight</span>: <span class="hljs-number">0</span>
            }
        };
        
        state.apples.map(<span class="hljs-function"><span class="hljs-params">apple</span> =&gt;</span> {
            <span class="hljs-keyword">let</span> selector = apple.isEaten ? <span class="hljs-string">'appleEaten'</span>:<span class="hljs-string">'appleNow'</span>;
            stats[selector].quantity ++;
            stats[selector].weight += apple.weight;
        })
        
        
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"appleBusket"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"title"</span>&gt;</span>苹果篮子<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"stats"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"section"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"head"</span>&gt;</span>当前<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"content"</span>&gt;</span>
                            {stats.appleNow.quantity}个苹果，
                            {stats.appleNow.weight}克
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"section"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"head"</span>&gt;</span>已吃掉<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"content"</span>&gt;</span>
                            {stats.appleEaten.quantity}个苹果，
                            {stats.appleEaten.weight}克
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"appleList"</span>&gt;</span>
                    { state.apples.map(apple =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">AppleItem</span> <span class="hljs-attr">state</span> =<span class="hljs-string">{apple}</span> /&gt;</span>) }
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn-div"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>摘苹果<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }

}

function select(state) {
    return {
        state: state.appleBusket
    }
}

export default connect(select)(AppleBusket);</span></code></pre>
<p>可见，动态布局的工作要求只是在 HTML + CSS 布局的基础上，再加上 JSX 语法能力即可。</p>
<h4>2. 普通显示组件的动态渲染</h4>
<p>普通显示组件的动态渲染和容器类似，只是这里的state可以自己规定，并给出示例的mockState（模拟state），使用组件的人按照示例传入数据即可使用。</p>
<p>AppleItem.jsx 的更新如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class AppleItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.state != this.props.state;
    }

    render() {

        let { state, actions } = this.props;

        /**
         * 这个区域是 mock 数据区，也作为组件文档，请书写清楚
         * //在组件发布时，请注释掉，提高性能
         */
        let mockState = {
            id: 1,
            weight: 256,
            isEaten: false
        };
        
        let mockActions = {
            eatApple : id => console.log('eatApple',id)
        };

        /**
         * 开关这行代码，用于切换装入的数据来源。(为了开关的方便，请把两句代码合成一行)
         * 在开发阶段打开，使用内部 state 和 action, 开发完成后请注释关闭
         */
        state = mockState; actions = mockActions;

        if (state.isEaten) return null;

        return (
            <div className=&quot;appleItem&quot;>
                <div className=&quot;apple&quot;><img src=&quot;../images/apple.png&quot; alt=&quot;&quot;/></div>
                <div className=&quot;info&quot;>
                    <div className=&quot;name&quot;>红苹果 - {state.id}号</div>
                    <div className=&quot;weight&quot;>{state.weight}克</div>
                </div>
                <div className=&quot;btn-div&quot;><button onClick={() => actions.eatApple(state.id) }>吃掉</button></div>
            </div>
        );

    }


}

export default AppleItem;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import React <span class="hljs-keyword">from</span> 'react';

class AppleItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.<span class="hljs-keyword">state</span> != this.props.<span class="hljs-keyword">state</span>;
    }

    render() {

        let { <span class="hljs-keyword">state</span>, actions } = this.props;

        /**
         * 这个区域是 mock 数据区，也作为组件文档，请书写清楚
         * //在组件发布时，请注释掉，提高性能
         */
        let mockState = {
            id: <span class="hljs-number">1</span>,
            weight: <span class="hljs-number">256</span>,
            isEaten: false
        };
        
        let mockActions = {
            eatApple : id =&gt; console.<span class="hljs-keyword">log</span>('eatApple',id)
        };

        /**
         * 开关这行代码，用于切换装入的数据来源。(为了开关的方便，请把两句代码合成一行)
         * 在开发阶段打开，使用内部 <span class="hljs-keyword">state</span> 和 action, 开发完成后请注释关闭
         */
        <span class="hljs-keyword">state</span> = mockState; actions = mockActions;

        if (<span class="hljs-keyword">state</span>.isEaten) return null;

        return (
            <span class="hljs-variable">&lt;div className="appleItem"&gt;</span>
                <span class="hljs-variable">&lt;div className="apple"&gt;</span><span class="hljs-variable">&lt;img src="../images/apple.png" alt=""/&gt;</span>&lt;/div&gt;
                <span class="hljs-variable">&lt;div className="info"&gt;</span>
                    <span class="hljs-variable">&lt;div className="name"&gt;</span>红苹果 - {<span class="hljs-keyword">state</span>.id}号&lt;/div&gt;
                    <span class="hljs-variable">&lt;div className="weight"&gt;</span>{<span class="hljs-keyword">state</span>.weight}克&lt;/div&gt;
                &lt;/div&gt;
                <span class="hljs-variable">&lt;div className="btn-div"&gt;</span><span class="hljs-variable">&lt;button onClick={() =&gt;</span> actions.eatApple(<span class="hljs-keyword">state</span>.id) }&gt;吃掉&lt;/button&gt;&lt;/div&gt;
            &lt;/div&gt;
        );

    }


}

export <span class="hljs-keyword">default</span> AppleItem;
</code></pre>
<p>容器和普通显示组件state的对比：</p>
<ol>
<li>
<p>容器的state我们是从store中的总state直接获得的，注意 AppleBusket.jsx 靠后面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function select(state) {
    return {
        state: state.appleBusket
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function select(<span class="hljs-keyword">state</span>) {
    return {
        <span class="hljs-keyword">state</span>: <span class="hljs-keyword">state</span>.appleBusket
    }
}</code></pre>
<p>select是一个state筛选器, 功能是选择总state中的 appleBusket 作为本容器的state。而这个state的格式我们会在其对应的reducer中规定（因为我们需要在reducer中提供对应state的默认值）</p>
</li>
<li>
<p>普通显示组件的state格式由组件开发人员自己约定即可，并在mockState 区域给出例子。当别人要使用你的显示组件时，必须根据你规定的格式传入state数据。在组件里面，我们一般会实现如下这样一个自动切换器，当组件的使用者在使用该组件时没有传入state, 就会显示内部的模拟state，为使用者带来预览效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(state === undefined)  state = mockState;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">if(<span class="hljs-keyword">state</span> === undefined)  <span class="hljs-keyword">state</span> = mockState;</code></pre>
</li>
</ol>
<p>以上就是<strong>布局组</strong>的开发工作： 静态布局 + 动态布局。前者只需要会html+css布局即可，后者还要会一些jsx的语法和基本的js语法。</p>
<h2 id="articleHeader4">逻辑组</h2>
<h3 id="articleHeader5">任务1：<strong>action 开发</strong>&nbsp;</h3>
<p>任务内容：开发 redux 流程的 action，并把action部署到对应容器和组件中。<br>技能要求：需要对js比较熟悉，并要求要会使用jq的ajax功能。</p>
<p>首先，我们先来看看 action 的定义。</p>
<p><strong>1. 狭义的 action</strong></p>
<p>狭义的action是指一个简单的对象，对象的结构如下，只要在对象内包含type属性指明action的名称即可，同时，在对象的其他属性里，可以以任何形式自由保存其他相关数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let action = {
    type: 'ACTION_NAME',
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> action = {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'ACTION_NAME'</span>,
    <span class="hljs-params">...</span>
}</code></pre>
<p>一般 type 的内容使用 大写字母+下划线 的格式。</p>
<p>在这个定义的基础上，业界提出以一种标准 action， 叫做 <a href="https://github.com/acdlite/flux-standard-action" rel="nofollow noreferrer" target="_blank">Flux Standard Action</a> , 该标准下的action除了type属性之外，只允许多加（不是必须包含）这三个属性：payload，error，meta。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let FSA = {
    type: 'ACTION_NAME',
    payload: <bool | number | string | object>, //action的负载，可以是数据或 error 对象
    error: <bool>, // 指明该action是否是一个以 error 为负载的action
    meta: <string> // action元数据， 包含解释该action含义的信息
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">let</span> FSA = {
    type: <span class="hljs-string">'ACTION_NAME'</span>,
    payload: &lt;<span class="hljs-keyword">bool</span> | number | <span class="hljs-keyword">string</span> | <span class="hljs-keyword">object</span>&gt;, <span class="hljs-comment">//action的负载，可以是数据或 error 对象</span>
    error: &lt;<span class="hljs-keyword">bool</span>&gt;, <span class="hljs-comment">// 指明该action是否是一个以 error 为负载的action</span>
    meta: &lt;<span class="hljs-keyword">string</span>&gt; <span class="hljs-comment">// action元数据， 包含解释该action含义的信息</span>
}</code></pre>
<p>我们宅印约定都要使用 Flux Standard Action，下面是吃苹果 action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let FSA = {
    type: 'EAT_APPLE',
    payload: 3, // 负载是3, 说明吃掉3号苹果， 这里也可以写成 { id : 3 }
    meta: 'This action will eat an apple!' // (不是必须的)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> FSA = {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'EAT_APPLE'</span>,
    payload: <span class="hljs-number">3</span>, <span class="hljs-comment">// 负载是3, 说明吃掉3号苹果， 这里也可以写成 { id : 3 }</span>
    meta: <span class="hljs-string">'This action will eat an apple!'</span> <span class="hljs-comment">// (不是必须的)</span>
}</code></pre>
<p>一个action只是一个对象，他需要根据时机被 store 的 dispatch 函数调用才会开始进行处理：<code>store.dispatch(action_1)</code>。</p>
<p><strong>2. 广义的 action</strong></p>
<p>广义的 action 是指在中间件的支持下，dispatch 函数可以调用的数据类型，除了普通action之外，常见的有 thunk, promise 等。我们用常用的 thunk来举个例子。</p>
<p>thunk 其实就是一个代码片段，可以简单理解为一种特定的函数，我们可以dispatch 这个thunk。 thunk函数具有如下的签名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(dispatch, getState) => { 
    //在函数体内可以使用 dispatch 方法来发射其他 action
    //在函数体内可以使用 getState 方法来获取当前的state
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>(dispatch, getState) =&gt; { 
    //在函数体内可以使用 dispatch 方法来发射其他 action
    //在函数体内可以使用 getState 方法来获取当前的<span class="hljs-keyword">state</span>
}</code></pre>
<p>下面是一个我们摘苹果动作的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let pickAppleAction = (dispatch, getState) => { 
    ajax({
        url: '/pickApple',
        method: 'GET',
    }).done(data => {
        //发射普通 action
        dispatch({
            type: 'DONE_PICK_APPLE',
            payload: data.weight // 或者 payload: {weight: data.weight}
        }); 
    }).fail(xhr => {
        //发射普通 action, 其负载是一个error
        dispatch({
            type: 'FAIL_PICK_APPLE',
            payload: new Error(xhr.responseText) ,
            error: true
        }); 
    })
}
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> pickAppleAction = <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> { 
    ajax({
        url: <span class="hljs-string">'/pickApple'</span>,
        method: <span class="hljs-string">'GET'</span>,
    }).done(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
        <span class="hljs-comment">//发射普通 action</span>
        dispatch({
            <span class="hljs-keyword">type</span>: <span class="hljs-string">'DONE_PICK_APPLE'</span>,
            payload: data.weight <span class="hljs-comment">// 或者 payload: {weight: data.weight}</span>
        }); 
    }).fail(<span class="hljs-function"><span class="hljs-params">xhr</span> =&gt;</span> {
        <span class="hljs-comment">//发射普通 action, 其负载是一个error</span>
        dispatch({
            <span class="hljs-keyword">type</span>: <span class="hljs-string">'FAIL_PICK_APPLE'</span>,
            payload: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(xhr.responseText) ,
            error: <span class="hljs-literal">true</span>
        }); 
    })
}
        </code></pre>
<p>定义好之后，我们可以直接这样调用这个thunk：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch( pickAppleAction )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">dispatch</span><span class="hljs-params">( pickAppleAction )</span></span></code></pre>
<p>接下来，我们来做进一步优化，把action统一为actionCreator , 我们不难察觉，每次都要书写{ type: 'ACTION_NAME' ... } 是很麻烦也很容易出错的，actionCreator 就是为解决这个问题而生的，actionCreator 就是一个产生特定action（这里指广义的action）的函数，下面来看简单的actionCreator 例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//传统写法
var eatApple = function(id) {
    return {
        type: 'EAT_APPLE', 
        payload: id
    }
}

// es6 写法
let eatApple = id => ({
    type: 'EAT_APPLE', 
    payload: id
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//传统写法</span>
<span class="hljs-keyword">var</span> eatApple = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'EAT_APPLE'</span>, 
        payload: id
    }
}

<span class="hljs-comment">// es6 写法</span>
<span class="hljs-keyword">let</span> eatApple = <span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'EAT_APPLE'</span>, 
    payload: id
})
</code></pre>
<p>这样一来，一方面是使用起来比较简单方便，另一方面是具有文档作用。<br>只需要这样发射action就可以啦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch(eatApple(3))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">dispatch(<span class="hljs-name">eatApple</span>(<span class="hljs-number">3</span>))</code></pre>
<p>普通action的actionCreator封装工作, 可以使用 <a href="https://github.com/acdlite/redux-actions" rel="nofollow noreferrer" target="_blank">redux-actions</a> 自动完成, 查看其文档就可以快速上手，可以根据情况使用。</p>
<p>在项目中，我们会为每个板块写一个的action文件，并统一使用actionCreator, 所以最终 appleAction.js 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ajax from '../services/ajax'; //经过封装的加强型 ajax 函数

//这是名空间，对普通action做划分
const prefix = 'apple/';

let actions = {

    //注意这里需要 () => ... , 不然 pickAppleAction 不是一个actionCreator, 而是一个thunk
    pickApple: () => (dispatch, getState) => {
        
        //如果正在摘苹果，则结束这个thunk, 不执行摘苹果
        if(getState().isPicking)
            return;
        
        //通知开始摘苹果
        dispatch(actions.beginPickApple());
        
        //发送摘苹果请求
        ajax({
            url: '/appleBasket/pickApple',
            method: 'GET'
        }).done(data => {
            dispatch(actions.donePickApple(data.weight))
        })
        .fail(xhr => {
            dispatch(actions.failPickApple(xhr.responseText));
        })
    },
    
    beginPickApple: () => ({
        type: 'apple/BEGIN_PICK_APPLE'
    }),
    
    donePickApple: appleWeight => ({
        type: 'apple/DONE_PICK_APPLE',
        payload: appleWeight
    }),
    
    failPickApple: errMsg => ({
        type: 'apple/FAIL_PICK_APPLE',
        payload: new Error(errMsg),
        error: true
    }),
    
    eatApple: appleId => ({
        type: 'apple/EAT_APPLE',
        payload: appleId
    })

};

export default actions;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> ajax <span class="hljs-keyword">from</span> <span class="hljs-string">'../services/ajax'</span>; <span class="hljs-comment">//经过封装的加强型 ajax 函数</span>

<span class="hljs-comment">//这是名空间，对普通action做划分</span>
<span class="hljs-keyword">const</span> prefix = <span class="hljs-string">'apple/'</span>;

<span class="hljs-keyword">let</span> actions = {

    <span class="hljs-comment">//注意这里需要 () =&gt; ... , 不然 pickAppleAction 不是一个actionCreator, 而是一个thunk</span>
    pickApple: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (dispatch, getState) =&gt; {
        
        <span class="hljs-comment">//如果正在摘苹果，则结束这个thunk, 不执行摘苹果</span>
        <span class="hljs-keyword">if</span>(getState().isPicking)
            <span class="hljs-keyword">return</span>;
        
        <span class="hljs-comment">//通知开始摘苹果</span>
        dispatch(actions.beginPickApple());
        
        <span class="hljs-comment">//发送摘苹果请求</span>
        ajax({
            url: <span class="hljs-string">'/appleBasket/pickApple'</span>,
            method: <span class="hljs-string">'GET'</span>
        }).done(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
            dispatch(actions.donePickApple(data.weight))
        })
        .fail(<span class="hljs-function"><span class="hljs-params">xhr</span> =&gt;</span> {
            dispatch(actions.failPickApple(xhr.responseText));
        })
    },
    
    beginPickApple: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/BEGIN_PICK_APPLE'</span>
    }),
    
    donePickApple: <span class="hljs-function"><span class="hljs-params">appleWeight</span> =&gt;</span> ({
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/DONE_PICK_APPLE'</span>,
        payload: appleWeight
    }),
    
    failPickApple: <span class="hljs-function"><span class="hljs-params">errMsg</span> =&gt;</span> ({
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/FAIL_PICK_APPLE'</span>,
        payload: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(errMsg),
        error: <span class="hljs-literal">true</span>
    }),
    
    eatApple: <span class="hljs-function"><span class="hljs-params">appleId</span> =&gt;</span> ({
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/EAT_APPLE'</span>,
        payload: appleId
    })

};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> actions;</code></pre>
<p>这样一来，只要引入 &nbsp;appleAction.js ，就可以快速使用定义好的action，结合某些编辑器的智能提示功能，非常方便，下面是 vsCode 编辑器的效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633606" src="https://static.alili.tech/img/remote/1460000007633606" alt="导入苹果篮子板块的action" title="导入苹果篮子板块的action" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633607" src="https://static.alili.tech/img/remote/1460000007633607" alt="vsCode中的智能提示 " title="vsCode中的智能提示 " style="cursor: pointer;"></span></p>
<p>写好了action之后，只要在 container 的对应位置装上action就好了,  下面是appleBasket.jsx 总体代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { connect } from 'react-redux';

import AppleItem from '../components/AppleItem';
import actions from '../actions/appleActions';

class AppleBusket extends React.Component {
    render() {
        let { state, dispatch } = this.props;
        ...
        return (
          ...
          <div className=&quot;appleList&quot;>
              { state.apples.map(apple =>
                  <AppleItem
                      state ={apple}
                      actions="{{"eatApple: id => dispatch(actions.eatApple(id))"}}"
                      key={apple.id}
                  />
              ) }
          </div>

          <div className=&quot;btn-div&quot;>
              <button onClick={() => dispatch(actions.pickApple())}>摘苹果</button>
          </div>
          ...
       )
    }
}

function selectState(state) {
    return {
        state: state.appleBusket
    }
}
export default connect(selectState)(AppleBusket);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import React <span class="hljs-keyword">from</span> 'react';
import { connect } <span class="hljs-keyword">from</span> 'react-redux';

import AppleItem <span class="hljs-keyword">from</span> '../components/AppleItem';
import actions <span class="hljs-keyword">from</span> '../actions/appleActions';

class AppleBusket extends React.Component {
    render() {
        let { <span class="hljs-keyword">state</span>, dispatch } = this.props;
        ...
        return (
          ...
          <span class="hljs-variable">&lt;div className="appleList"&gt;</span>
              { <span class="hljs-keyword">state</span>.apples.map(apple =&gt;
                  <span class="hljs-variable">&lt;AppleItem
                      state ={apple}
                      actions="{{"eatApple: id =&gt;</span> dispatch(actions.eatApple(id))"}}"
                      key={apple.id}
                  /&gt;
              ) }
          &lt;/div&gt;

          <span class="hljs-variable">&lt;div className="btn-div"&gt;</span>
              <span class="hljs-variable">&lt;button onClick={() =&gt;</span> dispatch(actions.pickApple())}&gt;摘苹果&lt;/button&gt;
          &lt;/div&gt;
          ...
       )
    }
}

function selectState(<span class="hljs-keyword">state</span>) {
    return {
        <span class="hljs-keyword">state</span>: <span class="hljs-keyword">state</span>.appleBusket
    }
}
export <span class="hljs-keyword">default</span> connect(selectState)(AppleBusket);
</code></pre>
<p>注意这两行。就是装入action的地方</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="actions="{{"eatApple: id => dispatch(actions.eatApple(id))"}}"
<button onClick={() => dispatch(actions.pickApple())}>摘苹果</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">actions=</span><span class="hljs-template-variable">"{{"eatApple: id =&gt; dispatch(actions.eatApple(id))"}}"</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(actions.pickApple())}&gt;摘苹果<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></code></pre>
<p>上面代码中引入的actions其实是actionCreators。</p>
<p>此外，actionCreator还有很简洁的用法：对actionCreator做dispatch级别的封装，这个过程我们可以使用 redux 提供的 bindActionCreators 函数自动完成。然后就可以直接调用action，而不需要使用dispatch方法去调用actionCreator。看下面更新后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppleItem from '../components/AppleItem';
import actions from '../actions/appleActions';

class AppleBusket extends React.Component {
    render() {
        let { state, actions} = this.props;
        ...
        return (
          ...
          <div className=&quot;appleList&quot;>
              { state.apples.map(apple =>
                  <AppleItem
                      state ={apple}
                      actions="{{"eatApple: actions.eatApple"}}"
                      key={apple.id}
                  />
              ) }
          </div>

          <div className=&quot;btn-div&quot;>
              <button onClick={actions.pickApple}>摘苹果</button>
          </div>
          ...
       )
    }
}

function selectState(state) {
    return {
        state: state.appleBusket
    }
}

function buildActionDispatcher(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(selectState, buildActionDispatcher)(AppleBusket);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import React <span class="hljs-keyword">from</span> 'react';
import { bindActionCreators } <span class="hljs-keyword">from</span> 'redux';
import { connect } <span class="hljs-keyword">from</span> 'react-redux';

import AppleItem <span class="hljs-keyword">from</span> '../components/AppleItem';
import actions <span class="hljs-keyword">from</span> '../actions/appleActions';

class AppleBusket extends React.Component {
    render() {
        let { <span class="hljs-keyword">state</span>, actions} = this.props;
        ...
        return (
          ...
          <span class="hljs-variable">&lt;div className="appleList"&gt;</span>
              { <span class="hljs-keyword">state</span>.apples.map(apple =&gt;
                  <span class="hljs-variable">&lt;AppleItem
                      state ={apple}
                      actions="{{"eatApple: actions.eatApple"}}"
                      key={apple.id}
                  /&gt;</span>
              ) }
          &lt;/div&gt;

          <span class="hljs-variable">&lt;div className="btn-div"&gt;</span>
              <span class="hljs-variable">&lt;button onClick={actions.pickApple}&gt;</span>摘苹果&lt;/button&gt;
          &lt;/div&gt;
          ...
       )
    }
}

function selectState(<span class="hljs-keyword">state</span>) {
    return {
        <span class="hljs-keyword">state</span>: <span class="hljs-keyword">state</span>.appleBusket
    }
}

function buildActionDispatcher(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
    }
}

export <span class="hljs-keyword">default</span> connect(selectState, buildActionDispatcher)(AppleBusket);
</code></pre>
<p>注意这三个变动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { state, actions } = this.props;
actions="{{"eatApple: actions.eatApple "}}"
<button onClick={actions.pickApple}>摘苹果</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let { <span class="hljs-keyword">state</span>, actions } = this.props;
actions="{{"eatApple: actions.eatApple "}}"
<span class="hljs-variable">&lt;button onClick={actions.pickApple}&gt;</span>摘苹果&lt;/button&gt;</code></pre>
<p>我们对比一下之前的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { state, dispatch } = this.props
actions="{{"eatApple: id => dispatch(actions.eatApple(id))"}}"
<button onClick={() => dispatch(actions.pickApple())}>摘苹果</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let { <span class="hljs-keyword">state</span>, dispatch } = this.props
actions="{{"eatApple: id =&gt; dispatch(actions.eatApple(id))"}}"
<span class="hljs-variable">&lt;button onClick={() =&gt;</span> dispatch(actions.pickApple())}&gt;摘苹果&lt;/button&gt;</code></pre>
<p>可以发现使用新的方式使代码简洁了很多！</p>
<p>但是，这对于有对象属性提示功能编辑器来说，这种方式会使编辑器无法分析对象属性：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633608" src="https://static.alili.tech/img/remote/1460000007633608" alt="不能判断出对象的属性，大家可以对比上一图的效果" title="不能判断出对象的属性，大家可以对比上一图的效果" style="cursor: pointer;"></span></p>
<p>这时，需要一边看actions文件对该actions对象的定义，一边在目标位置填入action，不过这也不是很麻烦。而且对于使用没有对象属性提示的编辑器的开发者来说，这个 drawback 根本就不存在。我们相对推荐使用这种经过dispatch封装的action, 但不要求，大家根据自己的情况使用即可。</p>
<p><strong>对于普通显示组件</strong></p>
<p>对于普通显示组件的actions传递方式，我们统一使用actions属性传递，如下：</p>
<p><em>AppleBasket.jsx</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
<AppleItem
    state ={apple}
    actions="{{"eatApple: actions.eatApple "}}"
    key={apple.id}
/>
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>...
<span class="hljs-tag">&lt;<span class="hljs-name">AppleItem</span>
    <span class="hljs-attr">state</span> =<span class="hljs-string">{apple}</span>
    <span class="hljs-attr">actions</span>=<span class="hljs-string">"{{"eatApple:</span> <span class="hljs-attr">actions.eatApple</span> "}}"
    <span class="hljs-attr">key</span>=<span class="hljs-string">{apple.id}</span>
/&gt;</span>
...</code></pre>
<p><em>AppleItem.jsx</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
<button onClick={() => actions.eatApple(state.id)}>吃掉</button>
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>...
<span class="hljs-variable">&lt;button onClick={() =&gt;</span> actions.eatApple(<span class="hljs-keyword">state</span>.id)}&gt;吃掉&lt;/button&gt;
...</code></pre>
<p>普通显示组件使用统一actions属性接受父级的action，可以在组件内部建立mockActions, 这个mockActions 既有文档功能，也有测试功能，非常实用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let mockActions = {
    eatApple : id => console.log('eatApple',id), //指定了函数的签名
    foo: (arg1,arg2) => console.log('foo',arg1,arg2) //也响应了调用测试
};

/**
  * 开关这行代码，用于切换装入的state和actions来源。(为了开关的方便，请把两句代码合成一行)
  * 在开发阶段打开，使用内部 state 和 action, 开发完成后请注释关闭
  */
state = mockState; actions = mockActions;    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let mockActions = {
    eatApple : id =&gt; console.<span class="hljs-keyword">log</span>('eatApple',id), //指定了函数的签名
    foo: (arg1,arg2) =&gt; console.<span class="hljs-keyword">log</span>('foo',arg1,arg2) //也响应了调用测试
};

/**
  * 开关这行代码，用于切换装入的<span class="hljs-keyword">state</span>和actions来源。(为了开关的方便，请把两句代码合成一行)
  * 在开发阶段打开，使用内部 <span class="hljs-keyword">state</span> 和 action, 开发完成后请注释关闭
  */
<span class="hljs-keyword">state</span> = mockState; actions = mockActions;    </code></pre>
<p>点击 “摘苹果” 和 “吃掉” 按钮，我们看看控制台，已经可以发出我们想要的action啦：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633609" src="https://static.alili.tech/img/remote/1460000007633609" alt="该log功能需要 redux-log 中间件支持" title="该log功能需要 redux-log 中间件支持" style="cursor: pointer;"></span></p>
<p>好啦，actions 开发的内容就介绍到这里。我们来总结一下我们对action所做的封装：</p>
<blockquote>
<strong>action</strong> -&gt; <strong>actionCreator</strong> -&gt; <strong>actionDispatcher</strong>
</blockquote>
<h3 id="articleHeader6">任务2：reducer 开发</h3>
<p>开发内容： reducer的其实就是action的<strong>处理器</strong>。其开发的内容很明确清晰，就是开发一类函数，接受action 和 当前的state，返回新的state。</p>
<p>技术要求：要求对js比较熟悉，需要会使用 immutable.js 这个数据静态化库。</p>
<p>下面是reducer功能的图解：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633610" src="https://static.alili.tech/img/remote/1460000007633610" alt="reducer的功能" title="reducer的功能" style="cursor: pointer;"></span></p>
<p>我们先看看我们苹果板块的state的数据结构，非常简单，这里是某个时刻的状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    isPicking : false,
    newAppleId: 1,
    apples: [
        {
            id: 0,
            weight: 235,
            isEaten: false
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
    <span class="hljs-string">isPicking</span> <span class="hljs-string">:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    newAppleId:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    apples:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">            id:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">            weight:</span> <span class="hljs-number">235</span><span class="hljs-string">,</span>
<span class="hljs-attr">            isEaten:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">}</span></code></pre>
<p>有三个一级属性：</p>
<ul>
<li>
<strong>isPicking</strong> ：表示是否正在摘苹果，我们在上面已经知道，摘苹果其实是发送一个ajax请求，向后台摘一个苹果，这个请求在进行时我们会把 isPicking 设置为ture, 表明正在摘苹果，同时禁止在完成前再发送摘苹果请求</li>
<li>
<strong>newAppleId</strong>：表示新苹果的编号</li>
<li>
<strong>apples</strong>：是苹果列表数组，存放着苹果对象，苹果对象的结构在apples数组里有给出实例。</li>
</ul>
<p>我们上面提及actions分为广义的action和狭义的普通action。其实，非普通action, 如thunk，一般会以发起普通action结束。我们reducer只需要处理狭义上的普通action,。在我们摘苹果应用里，总共有这4个普通action:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通知store应用开始摘苹果
beginPickApple: () => ({
    type: 'apple/BEGIN_PICK_APPLE'
}),

//摘苹果成功    
donePickApple: appleWeight => ({
    type: 'apple/DONE_PICK_APPLE',
    payload: appleWeight
}),

//摘苹果失败    
failPickApple: error => ({
    type: 'apple/FAIL_PICK_APPLE',
    payload: error,
    error: true
}),

//吃苹果
eatApple: appleId => ({
    type: 'apple/EAT_APPLE',
    payload: appleId
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//通知store应用开始摘苹果</span>
beginPickApple: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/BEGIN_PICK_APPLE'</span>
}),

<span class="hljs-comment">//摘苹果成功    </span>
donePickApple: <span class="hljs-function"><span class="hljs-params">appleWeight</span> =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/DONE_PICK_APPLE'</span>,
    payload: appleWeight
}),

<span class="hljs-comment">//摘苹果失败    </span>
failPickApple: <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/FAIL_PICK_APPLE'</span>,
    payload: error,
    error: <span class="hljs-literal">true</span>
}),

<span class="hljs-comment">//吃苹果</span>
eatApple: <span class="hljs-function"><span class="hljs-params">appleId</span> =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'apple/EAT_APPLE'</span>,
    payload: appleId
})
</code></pre>
<p>下面是根据action，写出的 reducer 的基本结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" (state = defaultState, action) => {

    switch (action.type) {
        case 'apple/BEGIN_PICK_APPLE':
            //TODO
            return state;
            
        case 'apple/DONE_PICK_APPLE':
            //TODO
            return state;
            
        case 'apple/FAIL_PICK_APPLE':
            //TODO
            return state;
            
        case 'apple/EAT_APPLE':
            //TODO
            return state;
            
        default:
            return state;
    }
  
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code> (<span class="hljs-keyword">state</span> = <span class="hljs-keyword">default</span>State, action) =&gt; {

    switch (action.type) {
        case 'apple/BEGIN_PICK_APPLE':
            //TODO
            return <span class="hljs-keyword">state</span>;
            
        case 'apple/DONE_PICK_APPLE':
            //TODO
            return <span class="hljs-keyword">state</span>;
            
        case 'apple/FAIL_PICK_APPLE':
            //TODO
            return <span class="hljs-keyword">state</span>;
            
        case 'apple/EAT_APPLE':
            //TODO
            return <span class="hljs-keyword">state</span>;
            
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
  
};</code></pre>
<p>我们可以看到，reducer是一个函数，接受state和action两个参数，在函数内部，根据 action.type 来确定要做哪些操作，并且每种操作都要返回state（或者是新的，或者是原来的）。</p>
<p>我们以 <code>apple/EAT_APPLE</code>动作为例，讲解如何书写reducer。EAT_APPLE 动作的含义是吃苹果，我们可以非常简单地处理这个动作：直接把对应苹果对象的 isEaten 属性设为true即可。</p>
<p>按照一般的思维，我们会这样处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
    case 'apple/EAT_APPLE':
        state.apples[action.payload].isEaten = true;
        return state;
...
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>...
    case 'apple/EAT_APPLE':
        <span class="hljs-keyword">state</span>.apples[action.payload].isEaten = true;
        return <span class="hljs-keyword">state</span>;
...
            </code></pre>
<p>但是，这种方法在 redux 应用里看不到作用，因为这种写法不会使store触发react进行重新渲染，为什么呢？因为 <code>newState == oldState</code> ! 下面我们来做一些解释：</p>
<p>首先，要先从js对象的相等判断运算说起，我们看下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = { foo: 'bar'};
let b = { foo: 'bar'};
console.log( a == b ); //结果是 false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> a = { foo: <span class="hljs-string">'bar'</span>};
<span class="hljs-keyword">let</span> b = { foo: <span class="hljs-string">'bar'</span>};
console.log( a == b ); //结果是 <span class="hljs-literal">false</span></code></pre>
<p>a 和 b 看起来一样，但为什么是false呢？因为对象和数组的赋值是引用赋值， a 和 b 只是一个引用符号，其所指向的对象实体不同（比如 a -&gt; object#001, b -&gt; object#002），js的对象（数组）相等判断是根据是否指向同一个对象实体来的确定的 (object#001 ？= object#002 // false)，详见 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality" rel="nofollow noreferrer" target="_blank">MDN</a>。</p>
<p>再看看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = {foo: 'bar'};
let b = a;
b.foo = 'good';

console.log( a == b ); //结果是 true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>let a = {foo: <span class="hljs-string">'bar'</span>}<span class="hljs-comment">;</span>
let <span class="hljs-keyword">b </span>= a<span class="hljs-comment">;</span>
<span class="hljs-keyword">b.foo </span>= <span class="hljs-string">'good'</span><span class="hljs-comment">;</span>

console.log( a == <span class="hljs-keyword">b </span>)<span class="hljs-comment">; //结果是 true</span></code></pre>
<p>现在应该可以理解刚才为什么<code>newState == oldState</code>了吧~</p>
<p>redux 是根据返回的state是否改变来决定是否通知 react 更新的。根据这种情况所，可能有人会这样改进刚才的reducer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    state.apples[action.payload].isEaten = true;
    newState = Object.assign({},state);
    return newState;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>    <span class="hljs-keyword">state</span>.apples[action.payload].isEaten = true;
    newState = Object.assign({},<span class="hljs-keyword">state</span>);
    return newState;</code></pre>
<p>这样一来，点击 “吃掉”按钮，看到了有效果了，苹果不见了！但是，这种写法只是迎合了redux更新视觉组件的触发条件，还具有很大的局限性，不是我们redux规定的reducer。下面我们来看看正确的reducer：</p>
<p>首先，reducer有这样的重要约束：<strong>在reducer里，不可以修改原来的state，需要保持使每个版本的state不变</strong>。</p>
<p>这种保持数据不变（<a href="https://en.wikipedia.org/wiki/Persistent_data_structure" rel="nofollow noreferrer" target="_blank">Persistent data structure</a>）的方式在函数式编程（<a href="https://en.wikipedia.org/wiki/Functional_programming" rel="nofollow noreferrer" target="_blank">Functional programming</a>）非常常见。在我们的redux应用里，其意义在于：</p>
<p><strong>1. 调试意义</strong>：保持每个版本的state的不变性，使得我们可以跟踪每个时刻的state, 跟踪应用的“发展史”，这个特性为调试带来了很大的方便。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633611" src="https://static.alili.tech/img/remote/1460000007633611" alt="我们点击了摘苹果按钮，最终发起了两个(普通)action, 我们可以轻松查看action前后的state" title="我们点击了摘苹果按钮，最终发起了两个(普通)action, 我们可以轻松查看action前后的state" style="cursor: pointer;"></span></p>
<p><strong>2. 性能意义</strong>：保持state不变这个约束引导我们使用<strong>局部更新对象的方法</strong>，这样会可以非常有效地提高react或其他显示框架的渲染效率。我们先来看看为了保持数据不变性，要怎么对state做更新，以我们的苹果篮子state为例：</p>
<p>例子：通知开始摘苹果：<code>apple/BEGIN_PICK_APPLE</code></p>
<p>为了保证每个版本的state不变性，我们有两种实现方式：“深复制”，“浅复制”。我们来看两种模式的内部原理：</p>
<p><strong>深复制方式</strong>：有人会这样想：“保持state的不变性很容易，只需要深复制一个state, 让后在新的state要怎么修改就怎么修改，不ok了吗？”，如下就是深复制</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633612" src="https://static.alili.tech/img/remote/1460000007633612" alt="深复制" title="深复制" style="cursor: pointer;"></span></p>
<p>这种方式是一种很低级保持不变性的方式：</p>
<ol>
<li>深复制操作运行效率低</li>
<li>没有为渲染环节提供提高渲染效率的铺垫</li>
</ol>
<p>它只是简单迎合保持数据不变性的约束，虽然有一定调试意义，但是，不但没有提高程序的性能，反而降低了程序的总体性能！没有实践意义。</p>
<p><strong>浅复制方式</strong>：浅复制模式只对内部数据发生变化的引用做更新，如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633613" src="https://static.alili.tech/img/remote/1460000007633613" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>“state” 对象的内部数据发生变化，所以创建新的state引用；而apples array 内部数据不发生变化，所以就不对该引用做更新！在这个操作中，这种浅复制的方法运行效率比较高，而且其简单地实现了数据不变性，为调试带来方便，同时，也是更重要的，这种浅复制的方式极大地提高了视觉组件渲染阶段的运行效率！我们来对比一下：当用户点击摘苹果时，如果使用“深复制”，渲染程序需要重新遍历整个state对象树来做视觉更新，而使用浅复制来实现数据不变性时，渲染程序只需要遍历state对象的<strong>一级子节点</strong>即可，而不需要对apples array 做遍历，性能大大地提高。尤其是当苹果很多的时候，两种方式的性能差距是非常明显的。</p>
<p>备注：在react组件里面，要开启条件更新这个生命周期函数 shouldComponentUpdate， 才会对把这个性能提高点释放出来，类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
shouldComponentUpdate(nextProps) {
    return nextProps.state != this.props.state;
}
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>...
shouldComponentUpdate(nextProps) {
    return nextProps.<span class="hljs-keyword">state</span> != this.props.<span class="hljs-keyword">state</span>;
}
...
</code></pre>
<p>下面我们再给出 “吃苹果” reducer 进行浅复制的例子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633614" src="https://static.alili.tech/img/remote/1460000007633614" alt="吃苹果过程" title="吃苹果过程" style="cursor: pointer;"></span></p>
<p>现在大家应该理解了用浅复制实现数据不变性的原理和意义了，下面我们来看具体的代码实现。</p>
<p>我们的代码用 es6 编写，这里要用到 es6 两个非常方便的特性：</p>
<ol>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" rel="nofollow noreferrer" target="_blank">Obejct.assign()</a> 方法，该方法用于产生新的对象</li>
<li>延展操作符 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator" rel="nofollow noreferrer" target="_blank">Spread operator</a> : ...</li>
</ol>
<p>大家可以稍微看一下文档，或者看我下面的例子就知道其用法了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// apple basket reducer

export default (state = {
    isPicking: false,
    newAppleId: 1,
    apples: [
        {
            id: 0,
            weight: 235,
            isEaten: false
        }
    ]
}, action) => {
    
    let newState ;
    

    switch (action.type) {
        case 'apple/BEGIN_PICK_APPLE':
            newState = Object.assign({}, state, {
                isPicking: true
            });
            return newState;

        case 'apple/DONE_PICK_APPLE':
            newState = Object.assign({}, state, {
                apples: [
                    ...state.apples,
                    {
                        id: state.newAppleId,
                        weight: action.payload,
                        isEaten: false
                    }
                ],
                newAppleId: state.newAppleId + 1,
                isPicking: false
            })
            return newState;

        case 'apple/FAIL_PICK_APPLE':
            //这里只是简单处理
            newState = Object.assign({}, state, {
                isPicking: false
            });
            return newState;

        case 'apple/EAT_APPLE':
            newState = Object.assign({}, state, {
                apples: [
                    ...state.apples.slice(0, action.payload),
                    Object.assign({}, state.apples[action.payload], { isEaten: true }),
                    ...state.apples.slice(action.payload + 1)
                ]
            })
            return newState;

        default:
            return state;
    }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// apple basket reducer

export <span class="hljs-keyword">default</span> (<span class="hljs-keyword">state</span> = {
    isPicking: false,
    newAppleId: <span class="hljs-number">1</span>,
    apples: [
        {
            id: <span class="hljs-number">0</span>,
            weight: <span class="hljs-number">235</span>,
            isEaten: false
        }
    ]
}, action) =&gt; {
    
    let newState ;
    

    switch (action.type) {
        case 'apple/BEGIN_PICK_APPLE':
            newState = Object.assign({}, <span class="hljs-keyword">state</span>, {
                isPicking: true
            });
            return newState;

        case 'apple/DONE_PICK_APPLE':
            newState = Object.assign({}, <span class="hljs-keyword">state</span>, {
                apples: [
                    ...<span class="hljs-keyword">state</span>.apples,
                    {
                        id: <span class="hljs-keyword">state</span>.newAppleId,
                        weight: action.payload,
                        isEaten: false
                    }
                ],
                newAppleId: <span class="hljs-keyword">state</span>.newAppleId + <span class="hljs-number">1</span>,
                isPicking: false
            })
            return newState;

        case 'apple/FAIL_PICK_APPLE':
            //这里只是简单处理
            newState = Object.assign({}, <span class="hljs-keyword">state</span>, {
                isPicking: false
            });
            return newState;

        case 'apple/EAT_APPLE':
            newState = Object.assign({}, <span class="hljs-keyword">state</span>, {
                apples: [
                    ...<span class="hljs-keyword">state</span>.apples.slice(<span class="hljs-number">0</span>, action.payload),
                    Object.assign({}, <span class="hljs-keyword">state</span>.apples[action.payload], { isEaten: true }),
                    ...<span class="hljs-keyword">state</span>.apples.slice(action.payload + <span class="hljs-number">1</span>)
                ]
            })
            return newState;

        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }

};</code></pre>
<p>大家会发现这种浅复制操作在开发的过程会复杂一点，于是就有了 <a href="http://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a> 这个专门处理不变性数据的库(也是facebook出品)，它可以使用类似赋值的方式生成浅复制的不变性数据，下面来看看它怎么简化我们的开发：</p>
<p>我们用 <code>apple/EAT_APPLE</code> 这个reducer来说明。</p>
<p>这是原来的 reducer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
case 'apple/EAT_APPLE':
    newState = Object.assign({}, state, {
        apples: [
            ...state.apples.slice(0, action.payload),
            Object.assign({}, state.apples[action.payload], { isEaten: true }),
            ...state.apples.slice(action.payload + 1)
        ]
    })
    return newState;
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>...
case 'apple/EAT_APPLE':
    newState = Object.assign({}, <span class="hljs-keyword">state</span>, {
        apples: [
            ...<span class="hljs-keyword">state</span>.apples.slice(<span class="hljs-number">0</span>, action.payload),
            Object.assign({}, <span class="hljs-keyword">state</span>.apples[action.payload], { isEaten: true }),
            ...<span class="hljs-keyword">state</span>.apples.slice(action.payload + <span class="hljs-number">1</span>)
        ]
    })
    return newState;
...</code></pre>
<p>这是使用 immutable.js 库的reducer :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { fromJS } from 'immutable';
...
case 'apple/EAT_APPLE':
    return fromJS(state).setIn(['apples',action.payload,'isEaten'], true).toJS();
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { <span class="hljs-keyword">from</span>JS } <span class="hljs-keyword">from</span> 'immutable';
...
case 'apple/EAT_APPLE':
    return <span class="hljs-keyword">from</span>JS(<span class="hljs-keyword">state</span>).<span class="hljs-built_in">set</span>In(['apples',action.payload,'isEaten'], true).<span class="hljs-keyword">to</span>JS();
...</code></pre>
<p>用了immutable.js后，轻松一行代码搞定！如果团队约定 state 都用 immutable 内部的数据类型，就可以连 fromJS 和 toJS 的转化都省了，超级方便！</p>
<p>到这里， reducer 任务的介绍就结束啦~</p>
<h2 id="articleHeader7">总结</h2>
<p>至此，我们四个任务都介绍完了，大家应该对redux流程有一定概念了，我们来回顾一下我们的4个任务：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007633615" src="https://static.alili.tech/img/remote/1460000007633615" alt="redux开发流程" title="redux开发流程" style="cursor: pointer;"></span></p>
<p>这样子，我们通过流程化把 react + redux 的主要流程都定义好了，这种模式的可构建性很高，可以构建非常复杂的单页面应用，不会因为应用的业务复杂性增加而增加开发复杂性。</p>
<p>并且在这种分工里面，布局组对专注于写样式布局，大多是基本的HTML+CSS 工作；逻辑组专注于开发应用逻辑，基本都是JS工作，分工得到非常明确的规划，人们可以更好地做精自己负责的工作，各个部件的耦合性很低，人员安排灵活性比较大。</p>
<p>这就是我们用苹果篮子实例讲解的react+redux开发流程，大家形成redux流程基本的概念就好，具体的理解还是要在实践中慢慢参透。</p>
<p>一些依赖的JS库没有在这里给大家介绍，大家可以在后面的相关js库中查看。</p>
<blockquote>非常感谢 @ckinmind 为本教程提供完整源码demo <br>完整源码：<a href="https://github.com/ckinmind/apple-basket-redux" rel="nofollow noreferrer" target="_blank">https://github.com/ckinmind/a...</a><br>实例体验 <a href="https://ckinmind.github.io/apple-basket-redux/" rel="nofollow noreferrer" target="_blank">https://ckinmind.github.io/ap...</a><br>(摘苹果的过程模拟请求网络，体现一个异步动作，所以响应看起来有些延迟)</blockquote>
<h2 id="articleHeader8">参考资料</h2>
<ol>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" rel="nofollow noreferrer" target="_blank">《MDN Javascript Documents》</a></li>
<li>阮一峰 <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">《ECMAScript 6入门》</a>
</li>
<li>IVAN ROGIC <a href="https://www.toptal.com/react/react-redux-and-immutablejs" rel="nofollow noreferrer" target="_blank">《React, Redux and Immutable.js: Ingredients for Efficient Web Applications》</a>
</li>
</ol>
<p>项目相关js库列表：</p>
<ul>
<li>
<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a> ： js开发环境和打包器</li>
<li>
<a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">babel</a> ： es6 编译器</li>
<li>
<a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a> ： 当下非常火的显示框架</li>
<li>
<a href="https://github.com/reactjs/react-router" rel="nofollow noreferrer" target="_blank">react-router</a> ： 与react搭配的前端路由器</li>
<li>
<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a> ： web应用的状态容器（定义了一套非常清晰的数据传递   流程）</li>
<li>
<a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a> ： react 和 redux 的连接器</li>
<li>
<a href="https://github.com/theaqua/redux-logger" rel="nofollow noreferrer" target="_blank">redux-logger</a> ： redux 的控制台 log 中间件</li>
<li>
<a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">redux-thunk</a>： redux 的 thunk 中间件</li>
<li>
<a href="https://github.com/reactjs/react-router-redux" rel="nofollow noreferrer" target="_blank">react-router-redux</a> : react-router和 redux 配套使用的连接器</li>
<li>
<a href="https://github.com/facebook/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a>: js 持久化数据框架</li>
<li>
<a href="https://github.com/nuysoft/Mock" rel="nofollow noreferrer" target="_blank">mock.js</a> ： 用于产生模拟后台数据的框架</li>
<li>
<a href="https://github.com/jquery/jquery" rel="nofollow noreferrer" target="_blank">jquery</a>: 在项目中，我们仅使用它的非常通行的 ajax 功能</li>
</ul>
<p>感谢您的阅读，希望这篇文章对大家有帮助，欢迎回复和讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实例讲解基于 React+Redux 的前端开发流程

## 原文链接
[https://segmentfault.com/a/1190000005356568](https://segmentfault.com/a/1190000005356568)

