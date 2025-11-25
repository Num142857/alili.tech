---
title: 'react开发教程（六）React与DOM' 
date: 2019-01-05 2:30:10
hidden: true
slug: qhu5x31w6cb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">ReactDOM</h1>
<blockquote>
<h2 id="articleHeader1">findeDOMNode</h2>
<p>语法：DOMElement findDOMNode(ReactComponent component)<br>描述：获取改组件实例相对应的DOM节点 案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this)
    }
    
    render() {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        const dom = <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>)
    }
    
    render() {}
}
</code></pre>
<h2 id="articleHeader2">render</h2>
<p>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactComponent render(
    ReactElement element,
    DOMElement container,
    [function callback]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>ReactComponent render(
    ReactElement <span class="hljs-keyword">element</span>,
    DOMElement container,
    [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>]</span>
)</code></pre>
<p>描述：改方法吧元素挂载到container中，并且返回element的实例（即refs的引用）。当组件装载完毕时，callback就会被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this)
    }
    
    render() {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        const dom = <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>)
    }
    
    render() {}
}
</code></pre>
<h2 id="articleHeader3">unstable_renderSubtreeIntoContainer</h2>
<p>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactComponent unstable_renderSubtreeIntoContainer(
      parentComponent component,
    ReactElement element,
    DOMElement container,
    [function callback]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>ReactComponent unstable_renderSubtreeIntoContainer(
      parentComponent component,
    ReactElement <span class="hljs-keyword">element</span>,
    DOMElement container,
    [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>]</span>
)</code></pre>
<p>描述：更新组件到传入的DOM节点上，可以使用它完成在组件内部实现跨组件的DOM操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this)
    }
    
    render() {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        const dom = <span class="hljs-type">ReactDOM</span>.findDOMNode(<span class="hljs-keyword">this</span>)
    }
    
    render() {}
}
</code></pre>
</blockquote>
<h1 id="articleHeader4">refs</h1>
<p>它是react组件中非常特殊的prop，可以附加到任何一个组件上，组件调用是会新建一个该组件的实例，而refs就会指向这个实例。<br>它可以是一个回调函数，这个回调函数会在组件被挂载后立即执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; ref={(ref)=>this.textInput = ref} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code>&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-keyword">ref</span>={(<span class="hljs-keyword">ref</span>)=&gt;<span class="hljs-keyword">this</span><span class="hljs-variable">.textInput</span> = <span class="hljs-keyword">ref</span>} /&gt;
</code></pre>
<p>也可以是一个字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Comp ref=&quot;myComp&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;Comp <span class="hljs-keyword">ref</span>=<span class="hljs-string">"myComp"</span>/&gt;
</code></pre>
<p>吧refs放到原生的DOM组件中，我们可以通过refs获取到DOM节点；而如果吧refs放到React组件上获取到的就是组件的实例</p>
<p>上一篇：<a href="https://segmentfault.com/a/1190000009153245">react开发教程（五）生命周期</a></p>
<p>下一篇：<a href="https://segmentfault.com/a/1190000010596244" target="_blank">react开发教程（七）React事件系统</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（六）React与DOM

## 原文链接
[https://segmentfault.com/a/1190000010593738](https://segmentfault.com/a/1190000010593738)

