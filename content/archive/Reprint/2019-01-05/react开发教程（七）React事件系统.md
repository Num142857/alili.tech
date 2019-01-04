---
title: 'react开发教程（七）React事件系统' 
date: 2019-01-05 2:30:10
hidden: true
slug: 8lldynzql9h
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">事件系统</h1>
<p>Virtual DOM在内存中是以对象的形式存在的，如果想要在这些对象上添加事件的话，React是基于Virtual DOM实现了一个<strong>合成事件</strong>层，他完全符合w3c标准，不存在ie的兼容问题。并且拥有和浏览器原生事件一样的接口，支持冒泡，可以使用stopPropagation()和preventDefault()来中断它。好吧不要想太多记住就是和浏览器事件一样，处了调用形式</p>
<h2 id="articleHeader1">合成事件的绑定方式</h2>
<p>简单的很</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jsx：
<button onClick={this.handleClick}>按钮</button>
//浏览器原生：
<button onclick=&quot;handleClick()&quot;>按钮</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code><span class="hljs-comment">//jsx：</span>
&lt;<span class="hljs-keyword">button</span> <span class="hljs-keyword">onClick</span>={this.handleClick}&gt;按钮&lt;/<span class="hljs-keyword">button</span>&gt;
<span class="hljs-comment">//浏览器原生：</span>
&lt;<span class="hljs-keyword">button</span> <span class="hljs-keyword">onclick</span>=<span class="hljs-string">"handleClick()"</span>&gt;按钮&lt;/<span class="hljs-keyword">button</span>&gt;
</code></pre>
<p>react只是借鉴DOM0级事件的这种写法</p>
<h2 id="articleHeader2">绑定方法</h2>
<p>在react组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。而且React还会对这种引用进行缓存，以达到CPU和内存的最优化。在使用ES6 class或者纯粹函数时，这种绑定就不复存在了，我们需要手动实现this绑定</p>
<h3 id="articleHeader3">bind方法</h3>
<p>这个方法可以帮助我们绑定事件处理器内的this，并且可以向事件处理器中传递参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } form 'react';

class App extends Component {
    handleClick (e, arg) {
        console.log(e, arg)
    }
    render () {
        return (
            <button onClick={this.handleClick.bind(this,'test')}>按钮</button>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } form <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    handleClick (e, arg) {
        console.log(e, arg)
    }
    render () {
        <span class="hljs-keyword">return</span> (
            &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>,<span class="hljs-symbol">'tes</span>t')}&gt;按钮&lt;/button&gt;
        )
    }
}
</code></pre>
<h3 id="articleHeader4">构造器内声明</h3>
<p>在组件的构造器内完成了this的绑定，这种绑定方式的好处在于仅需要进行一次绑定，而不需要每次调用事件监听器时去执行绑定操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } form 'react';

class App extends Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this,arg);
    }
    handleClick (e, arg) {
        console.log(e, arg)
    }
    render () {
        return (
            <button onClick={this.handleClick(this,'test')}>按钮</button>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } form <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor () {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>,arg);
    }
    handleClick (e, arg) {
        console.log(e, arg)
    }
    render () {
        <span class="hljs-keyword">return</span> (
            &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick(<span class="hljs-keyword">this</span>,<span class="hljs-symbol">'tes</span>t')}&gt;按钮&lt;/button&gt;
        )
    }
}
</code></pre>
<h3 id="articleHeader5">箭头函数</h3>
<p>箭头函数不仅是函数的语法糖，它还自动绑定定义此函数作用域的this，因此我们不需要对它使用bind方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } form 'react';

class App extends Component {
    constructor () {
        super();
        this.handleClick = (e, arg) => {
          console.log(e, arg)
        }
    }
 
    render () {
        return (
            <button onClick={this.handleClick(this,'test')}>按钮</button>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } form <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor () {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.handleClick = (e, arg) =&gt; {
          console.log(e, arg)
        }
    }
 
    render () {
        <span class="hljs-keyword">return</span> (
            &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick(<span class="hljs-keyword">this</span>,<span class="hljs-symbol">'tes</span>t')}&gt;按钮&lt;/button&gt;
        )
    }
}
</code></pre>
<h2 id="articleHeader6">React中使用原生事件</h2>
<p>React中提供了很好的合成事件系统，但有时候也需要用到原生事件。在React生命周期中提供了componentDidMount会在组件已经完成安装并且在浏览器中存在真实的DOM后调用，此时我们就可以完成原生事件的绑定。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } form 'react';

class App extends Component {
    constructor () {
        super();
    }
    
    componentDidMount () {
        this.refs.button.addEventListener('click', e => {
            handleClick(e);
        })
    }
    
    handleClick (e) {
        console.log(e)
    }
    
    componentWillUnmount () {
        this.refs.button.removeEventListener('click')
    }
    
    render () {
        return (
            <button ref=&quot;button&quot;>按钮</button>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } form <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor () {
        <span class="hljs-keyword">super</span>();
    }
    
    componentDidMount () {
        <span class="hljs-keyword">this</span>.refs.button.addEventListener(<span class="hljs-symbol">'clic</span>k', e =&gt; {
            handleClick(e);
        })
    }
    
    handleClick (e) {
        console.log(e)
    }
    
    componentWillUnmount () {
        <span class="hljs-keyword">this</span>.refs.button.removeEventListener(<span class="hljs-symbol">'clic</span>k')
    }
    
    render () {
        <span class="hljs-keyword">return</span> (
            &lt;button ref=<span class="hljs-string">"button"</span>&gt;按钮&lt;/button&gt;
        )
    }
}
</code></pre>
<blockquote>一定要注意在React中使用原生DOM事件时，一定要在组件卸载时手动移除，否则很可能出现内存泄漏的问题。2而使用合成事件系统时则不需要，因为React内部以及处理了。</blockquote>
<h1 id="articleHeader7">事件类型</h1>
<h2 id="articleHeader8">键盘事件</h2>
<p>onKeyDown <br>onKeyPress<br>onKeyUp</p>
<h2 id="articleHeader9">焦点事件</h2>
<p>onFocus <br>onBlur</p>
<h2 id="articleHeader10">表单事件</h2>
<p>onChange <br>onInput<br>onSubmit</p>
<h2 id="articleHeader11">鼠标事件</h2>
<p>onClick<br>onContextMenu<br>onDoubleClick<br>onMouseDown<br>onMouseUp<br>onMouseOver<br>onMouseOut<br>onMouseMove<br>onMouseEnter<br>onMouseLeave<br>onDrag</p>
<h2 id="articleHeader12">选择事件</h2>
<p>onSelect</p>
<h2 id="articleHeader13">触摸事件</h2>
<p>onTouchCancel <br>onTouchEnd<br>onTouchMove<br>onTouchStart</p>
<h2 id="articleHeader14">UI事件</h2>
<p>onScroll</p>
<h2 id="articleHeader15">动画事件</h2>
<p>onAnimationStart <br>onAnimationEnd<br>onAnimationIteration</p>
<h2 id="articleHeader16">图像事件</h2>
<p>onLoad <br>onError</p>
<h2 id="articleHeader17">媒体事件</h2>
<p>onPause<br>onPlay<br>onCanPlay<br>onLoadStart<br>onProgress</p>
<h2 id="articleHeader18">剪贴板事件</h2>
<p>onCopy <br>onCut<br>onPaste </p>
<p>上一篇：<a href="https://segmentfault.com/a/1190000010593738">react开发教程（六）React与DOM</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（七）React事件系统

## 原文链接
[https://segmentfault.com/a/1190000010596244](https://segmentfault.com/a/1190000010596244)

