---
title: 'react开发教程（八）React组件通信' 
date: 2019-01-05 2:30:10
hidden: true
slug: 5hgm83xlv2
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">父子组件通讯</h1>
<p><strong>通讯手段</strong><br>这是最常见的通信方式，父组件只需要将子组件需要的props传给子组件，子组件直接通过this.props来使用。<br><strong>通讯内容</strong><br>更多要提的是如何合理的设置子组件的props，要想将子组件设计成一个复用性强的通用组件，需要将能够复用的部分抽象出来，抽象出来的props有两种形成，一种是简单的<code>变量</code>，另一种是抽象出来处理某种<code>逻辑函数</code>。</p>
<p>以Header 组件为例<br><span class="img-wrap"><img data-src="/img/bVSCYv?w=750&amp;h=88" src="https://static.alili.tech/img/bVSCYv?w=750&amp;h=88" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//HeaderBar.jsx  子组件

import React, { Component } from 'react';

class Header extends Component {
    constructor() {
        super();
        this.handleClick = (e) => {
            console.log(this)
        }
    }

    renderLeftComponent() {

        let leftDOM = {};
        if (this.props.renderLeftComponent) {
            return this.props.renderLeftComponent();
        }

        if (this.props.showBack) {
            let backFunc = this.props.onBack || this.goBack;
            leftDOM = (<a onClick={backFunc.bind(this)}><i className=&quot;icon left-icon icon-left-arrow&quot;></i></a>);
        }
        return leftDOM;
    }
    

    renderRightComponent() {
        if (this.props.renderRightComponent) {
            return this.props.renderRightComponent();
        }
    }

    goBack() {
        alert(&quot;返回上一页&quot;)
    }

    render() {
        return (
            <header className=&quot;header-bar&quot;>
                {this.renderLeftComponent()}
                <span>{this.props.title || '滴滴'}</span>
                {this.renderRightComponent()}
            </header>
        );
    }
}

export default Header;

//父亲组件部分代码App.jsx
import HeaderBar from &quot;./components/Header&quot;;

let leftIcon = function () {
  return (
    <a><i className=&quot;icon left-icon icon-left-haha&quot;></i>左边按钮</a>
  )
}
class App extends Component {

  render() {
    return (
      <div className=&quot;App&quot;>
        <HeaderBar title=&quot;滴滴打车&quot;  renderLeftComponent={leftIcon} />
      </div>
    );
  }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//HeaderBar.jsx  子组件</span>

<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
        }
    }

    renderLeftComponent() {

        <span class="hljs-keyword">let</span> leftDOM = {};
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.renderLeftComponent) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.renderLeftComponent();
        }

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.showBack) {
            <span class="hljs-keyword">let</span> backFunc = <span class="hljs-keyword">this</span>.props.onBack || <span class="hljs-keyword">this</span>.goBack;
            leftDOM = (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{backFunc.bind(this)}</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"icon left-icon icon-left-arrow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>);
        }
        <span class="hljs-keyword">return</span> leftDOM;
    }
    

    renderRightComponent() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.renderRightComponent) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.renderRightComponent();
        }
    }

    goBack() {
        alert(<span class="hljs-string">"返回上一页"</span>)
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"header-bar"</span>&gt;</span>
                {this.renderLeftComponent()}
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{this.props.title || '滴滴'}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                {this.renderRightComponent()}
            <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Header;

<span class="hljs-comment">//父亲组件部分代码App.jsx</span>
<span class="hljs-keyword">import</span> HeaderBar <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/Header"</span>;

<span class="hljs-keyword">let</span> leftIcon = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"icon left-icon icon-left-haha"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>左边按钮<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
  )
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">HeaderBar</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"滴滴打车"</span>  <span class="hljs-attr">renderLeftComponent</span>=<span class="hljs-string">{leftIcon}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

</span></code></pre>
<h1 id="articleHeader1">子父组件通讯</h1>
<p>父-子组件通信的手段是通过子组件的props是子组件用父组件的东西，子-父组件通信，是父组件用子组件的东西，暂时了解的两种方法</p>
<h2 id="articleHeader2">利用回调函数</h2>
<p>父组件通过props传递一个方法给子组件，子组件通过props方法将子组件数据传递给父组件</p>
<h2 id="articleHeader3">利用ref</h2>
<p>父组件通过refs调用子组件的属性</p>
<h1 id="articleHeader4">跨级组件通信</h1>
<p>在React中当一个属性反复使用并且存在与好几个子组件中的时候，这个时候我们如果通过props一级一级传递的话可以实现多层级访问，但是这样出现一个问题就是会使代码非常混乱，在React中国年，我们还可以使用 context 来实现跨级父子组件间的通信；<br>在react中context称为<code>虫洞</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Component 父级
class parentComponent extends React.Component {
    
    // add the following property
    static childContextTypes = {
        color: React.PropTypes.string
    }
    
    // 添加下面方法
    getChildContext() {
        return {
            color: &quot;#f00&quot;
        }
    }
    
    render() {
        <div>
            <Child1 />
        </div>
    }
}


// Component Child1
class Child1 extends React.Component {
    // 添加下面属性
    static contextTypes = {
        color: React.PropTypes.string
    }
    
    render() {
        <div>{this.context.color}</div>
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// Component 父级</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">parentComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    
    <span class="hljs-comment">// add the following property</span>
    static childContextTypes = {
        color: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
    }
    
    <span class="hljs-comment">// 添加下面方法</span>
    getChildContext() {
        <span class="hljs-keyword">return</span> {
            color: <span class="hljs-string">"#f00"</span>
        }
    }
    
    render() {
        &lt;div&gt;
            &lt;<span class="hljs-type">Child1</span> /&gt;
        &lt;/div&gt;
    }
}


<span class="hljs-comment">// Component Child1</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// 添加下面属性</span>
    static contextTypes = {
        color: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
    }
    
    render() {
        &lt;div&gt;{<span class="hljs-keyword">this</span>.context.color}&lt;/div&gt;
    }
}
</code></pre>
<h1 id="articleHeader5">同级组件通信</h1>
<blockquote><p>同级组件之间的通信还是需要通过父组件作为中介，利用多次父-子组件通信，项目中将需要传递的数据放在了父组件的state中，变动时可以自动的同步传递。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（八）React组件通信

## 原文链接
[https://segmentfault.com/a/1190000010602438](https://segmentfault.com/a/1190000010602438)

