---
title: 'react、react-router、redux 也许是最佳小实践1' 
date: 2019-01-13 2:30:11
hidden: true
slug: qpjf8gparsa
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">小前言</h3>
<blockquote>
<p>这是一个小小的有关<code>react</code>的小例子，希望通过一个小例子，可以让新手更好的了解到<code>react、react-router4.0、redux</code>的集中使用方法。</p>
<ol>
<li><p>这是基于<a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a>来开发的，一种简单的快速创建 <code>React web</code> 项目的方式是使用 <code>Create React App</code> 工具，相当于一个<code>react</code>手脚架，此工具由 <code>Facebook</code> 开发并维护。如果你还没有使用过 <code>create-react-app</code>，你需要先安装。然后就可以通过它创建一个新项目。</p></li>
<li><p><a href="https://reacttraining.cn/" rel="nofollow noreferrer" target="_blank">React Router4.0</a> 号称一次学习，随处路由。通过声明式编程模型定义组件，是 <code>React</code> 最强大的核心功能。 <code>React Router</code> 可以为您的应用已声明式的方式定义导航组件最强大的核心功能。 无论是 <code>Web App</code> 的浏览器书签 <code>URLs</code>，还是 <code>React Native</code> 的导航功能， 只要是可以使用 <code>React</code> 的地方，就可以使用 <code>React Router</code>。</p></li>
<li><p><a href="http://www.redux.org.cn/" rel="nofollow noreferrer" target="_blank">Redux</a> 是一个用来管理JavaScript应用中 data-state(数据状态)和UI-state(UI状态)的工具，对于那些随着时间推移状态管理变得越来越复杂的单页面应用（SPAs）它是比较理想。<a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html" rel="nofollow noreferrer" target="_blank">阮老师redux的教程</a></p></li>
</ol>
</blockquote>
<h4>下面我们看看完成后的小 demo</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009684960?w=1025&amp;h=538" src="https://static.alili.tech/img/remote/1460000009684960?w=1025&amp;h=538" alt="react-plan" title="react-plan" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">开始用<code>create-react-app</code>创建我们的 app</h3>
<p>首先 安装好<code>create-react-app</code>，已经安装好了就不用重复安装啦。</p>
<p><code>npm install -g create-react-app</code></p>
<blockquote><p>mac不成功记得用 sudo</p></blockquote>
<p>安装完毕之后:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create-react-app react-plan 
cd react-plan/
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">react-plan </span>
<span class="hljs-string">cd </span><span class="hljs-string">react-plan/</span>
<span class="hljs-string">npm </span><span class="hljs-string">start</span></code></pre>
<blockquote><p>安装会有点慢，耐心等待一下</p></blockquote>
<p>安装完毕之后，在浏览器地址栏输入<code>localhost:3000</code>，就可以浏览到刚才创建的 app 啦，这个手脚架很简单。如下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009684961?w=1180&amp;h=781" src="https://static.alili.tech/img/remote/1460000009684961?w=1180&amp;h=781" alt="react-plan" title="react-plan" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">代码开始</h3>
<p>创建好应用之后，我们就开始写我们的代码了，在 <code>src</code>文件夹下面创建一个<code>components</code>文件夹，并且在这个文件夹下面创建一个<code>home.js</code>的文件,然后写上我们首页的内容。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009684962?w=852&amp;h=848" src="https://static.alili.tech/img/remote/1460000009684962?w=852&amp;h=848" alt="react-plan" title="react-plan" style="cursor: pointer;"></span></p>
<p>首页介绍组件</p>
<blockquote><p>src/components/home.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <h2>首页</h2>
                <p>这是一个 react 学习的基本操作的小栗子</p>
                <p>通过本次学习可以清楚的掌握， react-router、redux的基本使用方法</p>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}
export default Home" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }
    render () {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一个 react 学习的基本操作的小栗子<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>通过本次学习可以清楚的掌握， react-router、redux的基本使用方法<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Home</code></pre>
<p>写好了 home.js 之后我们先引入我们的 app 看看</p>
<p>然后在<code>src/App.js</code>引入我们的 <code>home.js</code>，App.js就变成了</p>
<blockquote><p>src/App.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import logo from './logo.svg';
// 引入 homejs
import Home from './components/home.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className=&quot;App&quot;>
        <div className=&quot;App-header&quot;>
          <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
          <h2>Welcome to React</h2>
        </div>
        <p className=&quot;App-intro&quot;>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        // 使用 home 组件
        <Home />
      </div>
    );
  }
}
export default App;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-comment">// 引入 homejs</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home.js'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-logo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Welcome to React<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-intro"</span>&gt;</span>
          To get started, edit <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>src/App.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> and save to reload.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        // 使用 home 组件
        <span class="hljs-tag">&lt;<span class="hljs-name">Home</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}
export default App;
</span></code></pre>
<p>写好之后我们就可以成功的写完了<code>home.js</code>组件啦，是不是很简单，是不是很happy？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009684963?w=1178&amp;h=509" src="https://static.alili.tech/img/remote/1460000009684963?w=1178&amp;h=509" alt="react-plan" title="react-plan" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">一鼓作气，完成所有组件</h3>
<p>继续在<code>components</code>文件夹创建一个<code>plan.js</code>(计划表)、<code>detail.js</code>(计划详情)、<code>pupop.js</code>(添加计划)、的js文件和<code>comment.css</code>(组件的样式),我们这时候不涉路由的跳转，只要把所有静态的组件先一鼓作气写好来。</p>
<p>tips：这个例子小，为了方便，我把所有的组件样式文件都写到<code>comment.css</code>里面了，这时候写好的了 css 记得在<code>App.js</code>里面引入</p>
<blockquote><p>src/App.js增加一句 <code>import './components/comment.css'</code></p></blockquote>
<hr>
<blockquote><p>src/components/comment.css</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main {
  padding: 10px;
  flex-direction: row;
  display: flex;
}
.NavBox {
    width: 250px;
    margin-right: 20px;
}
.listNav{
    text-align: center;
}
.listNav li {
    line-height: 40px;
}
.listNav li a {
    text-decoration: none;
}
.listNav li.active{
    background: #00a6f7;
}
.listNav li.active a{
    color: #fff;
}
.side{
    width: 100%;
}
.slist{
    font-size: 14px;
}
.addBtn {
    font-size: 14px;
    font-weight: normal;
    background: skyblue;
    display: inline-block;
    padding: 10px;
    margin-left:  10px;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
}
.slist li{
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: solid 1px cornflowerblue;
}

.slist li h3{
    font-weight: normal;
}

.slist li div span{
    text-decoration: underline;
    padding: 0 10px;
}
.popup{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex !important;
    justify-content: center;
    align-items: center;
}
.popup .pbox {
    width: 50%;
    height: 320px;
    background: #ffffff;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
}
.popup .pbox h4{
    font-size: 14px;
}
.popup .pbox input {
    margin: 10px 0 20px 0;
}
.popup .pbox input, .popup .pbox textarea{
    display: block;
    width: 100%;
    height: 32px;
    border: 1px solid skyblue;
    text-indent: 10px;
}

.popup .pbox textarea {
    resize: none;
    height: 100px;
    margin: 10px 0;
}

.popup .pbox .close {
    position: absolute;
    width: 30px;
    height: 30px;
    background: red;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    color: #ffffff;
    right: -15px;
    top: -15px;
    transition: 0.5s;
    cursor: pointer;
}
.popup .pbox .close:hover{
    transform: rotate(180deg);
}
.popup .pbox .pBtn {
    display: flex;
    justify-content: center;
    padding-top: 20px;
}
.popup .pbox .pBtn span{
    padding: 10px 20px;
    background: skyblue;
    margin: 0 10px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
}
.plant{
    line-height: 50px;
    position: relative;
}
.plant p{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    background: blue;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #fff;
}
.planlist{
    width: 100%;
    padding: 10px;
    border-collapse: collapse;
}
.planlist td, th{
    border: 1px solid blue;
    line-height: 32px;
    font-size: 14px;

}
.plan-delect{
    color: red;
    cursor: pointer;
}
.plan-delect:hover{
    color: blue;
    text-decoration: underline;
}
.plan-title{
    width: 80%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">flex-direction</span>: row;
  <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.NavBox</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">250px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.listNav</span>{
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.listNav</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.listNav</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-class">.listNav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.active</span>{
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#00a6f7</span>;
}
<span class="hljs-selector-class">.listNav</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.active</span> <span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.side</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.slist</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-class">.addBtn</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">font-weight</span>: normal;
    <span class="hljs-attribute">background</span>: skyblue;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">margin-left</span>:  <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ffffff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.slist</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: row;
    <span class="hljs-attribute">justify-content</span>: space-between;
    <span class="hljs-attribute">border-bottom</span>: solid <span class="hljs-number">1px</span> cornflowerblue;
}

<span class="hljs-selector-class">.slist</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">h3</span>{
    <span class="hljs-attribute">font-weight</span>: normal;
}

<span class="hljs-selector-class">.slist</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">text-decoration</span>: underline;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.popup</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.6);
    <span class="hljs-attribute">display</span>: flex <span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">320px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-tag">h4</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-tag">input</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-tag">textarea</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid skyblue;
    <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-tag">textarea</span> {
    <span class="hljs-attribute">resize</span>: none;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-class">.close</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background</span>: red;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ffffff</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">15px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">15px</span>;
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.5s</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-class">.close</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-class">.pBtn</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.popup</span> <span class="hljs-selector-class">.pbox</span> <span class="hljs-selector-class">.pBtn</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: skyblue;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ffffff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.plant</span>{
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.plant</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">background</span>: blue;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.planlist</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-collapse</span>: collapse;
}
<span class="hljs-selector-class">.planlist</span> <span class="hljs-selector-tag">td</span>, <span class="hljs-selector-tag">th</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid blue;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;

}
<span class="hljs-selector-class">.plan-delect</span>{
    <span class="hljs-attribute">color</span>: red;
    <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.plan-delect</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">color</span>: blue;
    <span class="hljs-attribute">text-decoration</span>: underline;
}
<span class="hljs-selector-class">.plan-title</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
}</code></pre>
<p>计划组件</p>
<blockquote><p>src/components/plan.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

class Plan extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <div className=&quot;plant&quot;>
                    <h3>计划表</h3>
                    <p>添加计划</p>
                </div>
                <table className=&quot;planlist&quot;>
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=&quot;plan-title&quot;>计划1</td>
                            <td className=&quot;plan-delect&quot;>删除</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Plan;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Plan</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }
    render () {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"plant"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>计划表<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>添加计划<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"planlist"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>标题<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>操作<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"plan-title"</span>&gt;</span>计划1<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"plan-delect"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Plan;</code></pre>
<p>测试的时候直接把<code>App.js</code>刚才写的<code>import Home from './components/home.js'</code>改成 <code>import Home from './components/plan.js'</code>,就可以测试plan 组件啦。是不是很简单？下面的同理。</p>
<p>计划详情组件</p>
<blockquote><p>src/components/detail.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

class Detail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style="{{"padding: '20px'"}}">
                <h3>计划详情</h3>
                <p>id： 123</p>
                <p>标题： 测试标题</p>
                <p>内容： 测试内容</p>
            </div>

        )
    }
}
export default Detail" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Detail</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"padding:</span> '<span class="hljs-attr">20px</span>'"}}"&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>计划详情<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>id： 123<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>标题： 测试标题<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容： 测试内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

        )
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Detail</code></pre>
<p>添加计划组件</p>
<blockquote><p>src/components/popup.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

class Pupop extends Component{
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '1',
      content: '1'
    }
  }
  render() {
    let self = this;
    return (
      <section className=&quot;popup&quot; style="{{"display: 'block'"}}">
        <div className=&quot;pbox&quot;>
          <span className=&quot;close&quot;>X</span>
          <div>
            <h4>计划标题</h4>
            <input value={this.state.title} placeholder=&quot;请输入计划标题&quot;/>
          </div>
          <div>
            <h4>计划内容</h4>
            <textarea value={this.state.content} placeholder=&quot;请输入计划内容&quot; rows=&quot;3&quot;></textarea>
          </div>
          <div className=&quot;pBtn&quot;>
            <span>取消</span>
            <span>确认</span>
          </div>
        </div>
      </section>
    )
  }
}
export default Pupop
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Pupop</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  <span class="hljs-keyword">constructor</span> (props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'1'</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">'1'</span>
    }
  }
  render() {
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"popup"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"display:</span> '<span class="hljs-attr">block</span>'"}}"&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pbox"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"close"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>计划标题<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.title}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入计划标题"</span>/&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>计划内容<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.content}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入计划内容"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pBtn"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>确认<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    )
  }
}
export default Pupop
</span></code></pre>
<p>呼~~~终于把所有组件都写好了。下面我们就用路由把他们全都串联起来吧。实现点击跳转咯</p>
<h3 id="articleHeader4">加入路由</h3>
<p>首先记得安装路由 <code>npm install react-router-dom history --save</code></p>
<blockquote><p>history这个模块是用来做 js 的跳转，后面我们会介绍到。</p></blockquote>
<p>安装完成路由模块之后，在<code>src/components/</code>下面我们在增加一个测试二级路由的文件<code>testrouter.js</code>,里面的内容很简单，直接把官网的拿进来。</p>
<blockquote><p>src/components/testrouter.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

class TestRouter extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render () {
        return (
            <div>
            <h2>二级路由</h2>
            <ul>
              <li>
                <Link to={`${this.props.match.url}/rendering`}>
                  使用 React 渲染
                </Link>
              </li>
              <li>
                <Link to={`${this.props.match.url}/components`}>
                  组件
                </Link>
              </li>
              <li>
                <Link to={`${this.props.match.url}/props-v-state`}>
                  属性 v. 状态
                </Link>
              </li>
            </ul>

            <Route path={`${this.props.match.url}/:topicId`} component={Topic}/>
            <Route exact path={this.props.match.url} render={() => (
              <h3>请选择一个主题。</h3>
            )}/>
          </div>
        )
    }
}
export default TestRouter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Topic = ({ match }) =&gt; (
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{match.params.topicId}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)

class TestRouter extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render () {
        return (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>二级路由<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">this.props.match.url</span>}/<span class="hljs-attr">rendering</span>`}&gt;</span>
                  使用 React 渲染
                <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">this.props.match.url</span>}/<span class="hljs-attr">components</span>`}&gt;</span>
                  组件
                <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">this.props.match.url</span>}/<span class="hljs-attr">props-v-state</span>`}&gt;</span>
                  属性 v. 状态
                <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">this.props.match.url</span>}/<span class="hljs-attr">:topicId</span>`} <span class="hljs-attr">component</span>=<span class="hljs-string">{Topic}/</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{this.props.match.url}</span> <span class="hljs-attr">render</span>=<span class="hljs-string">{()</span> =&gt;</span> (
              <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>请选择一个主题。<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            )}/&gt;
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        )
    }
}
export default TestRouter</code></pre>
<p>然后在App.js做一点改动，引入所有需要的模块，看注释</p>
<blockquote><p>src/App.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg'
// 引入4个模块组件
import Plan from './components/plan.js'
import Home from './components/home.js'
import Popup from './components/popup.js'
import TestRouter from './components/testrouter.js'
import Detail from './components/detail.js'
// 引入样式文件
import './App.css'
import './components/comment.css'
// 引入路由
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
// 开始代码
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className=&quot;App&quot;>
          <div className=&quot;App-header&quot;>
            <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
            <h2 className='App-title'>Welcome to React Plan</h2>
          </div>
          <div>
            // 路由配置
            <Router history = {history}>
               <div className=&quot;contentBox&quot;>
                  // 编写导航
                  <ul className=&quot;nav&quot;>
                    <li><Link to=&quot;/&quot;>首页</Link></li>
                    <li><Link to=&quot;/plan&quot;>计划表</Link></li>
                    <li><Link to=&quot;/test&quot;>二级路由</Link></li>
                  </ul>
                  // 路由匹配
                  <div className=&quot;content&quot;> 
                    <Route exact path=&quot;/&quot; component={Home}/>
                    <Route path=&quot;/plan&quot; component={Plan}/>
                    <Route path=&quot;/test&quot; component={TestRouter}/>
                    <Route path=&quot;/detail/:id&quot; component={Detail}/>
                  </div>
              </div>
            </Router>
          </div>
          <Popup/>
      </div>
    );
  }
}

export default App
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {
  BrowserRouter <span class="hljs-keyword">as</span> Router,
  Route,
  Link
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>
<span class="hljs-comment">// 引入4个模块组件</span>
<span class="hljs-keyword">import</span> Plan <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/plan.js'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home.js'</span>
<span class="hljs-keyword">import</span> Popup <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/popup.js'</span>
<span class="hljs-keyword">import</span> TestRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/testrouter.js'</span>
<span class="hljs-keyword">import</span> Detail <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/detail.js'</span>
<span class="hljs-comment">// 引入样式文件</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./components/comment.css'</span>
<span class="hljs-comment">// 引入路由</span>
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>
const history = createHistory()
<span class="hljs-comment">// 开始代码</span>
<span class="hljs-keyword">class</span> App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      &lt;div className=<span class="hljs-string">"App"</span>&gt;
          &lt;div className=<span class="hljs-string">"App-header"</span>&gt;
            &lt;img src={logo} className=<span class="hljs-string">"App-logo"</span> alt=<span class="hljs-string">"logo"</span> /&gt;
            &lt;h2 className=<span class="hljs-string">'App-title'</span>&gt;Welcome to React Plan&lt;/h2&gt;
          &lt;/div&gt;
          &lt;div&gt;
            <span class="hljs-comment">// 路由配置</span>
            &lt;Router history = {history}&gt;
               &lt;div className=<span class="hljs-string">"contentBox"</span>&gt;
                  <span class="hljs-comment">// 编写导航</span>
                  &lt;ul className=<span class="hljs-string">"nav"</span>&gt;
                    &lt;li&gt;&lt;Link to=<span class="hljs-string">"/"</span>&gt;首页&lt;/Link&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;Link to=<span class="hljs-string">"/plan"</span>&gt;计划表&lt;/Link&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;Link to=<span class="hljs-string">"/test"</span>&gt;二级路由&lt;/Link&gt;&lt;/li&gt;
                  &lt;/ul&gt;
                  <span class="hljs-comment">// 路由匹配</span>
                  &lt;div className=<span class="hljs-string">"content"</span>&gt; 
                    &lt;Route exact path=<span class="hljs-string">"/"</span> component={Home}/&gt;
                    &lt;Route path=<span class="hljs-string">"/plan"</span> component={Plan}/&gt;
                    &lt;Route path=<span class="hljs-string">"/test"</span> component={TestRouter}/&gt;
                    &lt;Route path=<span class="hljs-string">"/detail/:id"</span> component={Detail}/&gt;
                  &lt;/div&gt;
              &lt;/div&gt;
            &lt;/Router&gt;
          &lt;/div&gt;
          &lt;Popup/&gt;
      &lt;/div&gt;
    );
  }
}

<span class="hljs-keyword">export</span> default App
</code></pre>
<p>不是结束的结束：好啦~~~路由也配置好，打开浏览器，在代码正确的情况下，可以愉快的实现跳转咯。之后我们再把 redux 加入进来，这样子就可以，每个组件就可以操作全局的数据了。稍后奉上。<a href="https://segmentfault.com/a/1190000009694761">react、react-router、redux 也许是最佳小实践2</a></p>
<p><a href="https://github.com/naihe138/react-plan" rel="nofollow noreferrer" target="_blank">github地址</a>，觉得有帮助的话，请点击一下 start，嘿嘿</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react、react-router、redux 也许是最佳小实践1

## 原文链接
[https://segmentfault.com/a/1190000009684957](https://segmentfault.com/a/1190000009684957)

