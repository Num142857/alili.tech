---
title: 'React从入门到精通系列之(14)refs和DOM元素' 
date: 2019-01-29 2:30:10
hidden: true
slug: f1uq3yxj6l8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十四、refs和DOM元素</h2>
<p>在典型的React数据流中，props是父组件与其子组件交互的唯一方式。 要修改子组件，需要使用一个新的props进行重新渲染。 </p>
<p>但是，在某些情况下，您需要在典型数据流之外强制修改子组件。 要修改的子组件可以是React组件实例，也可以是DOM元素。 对于这两种情况，React提供了一个以下这样的功能。</p>
<h3 id="articleHeader1">通过ref属性设置回调函数</h3>
<p>React提供可以附加到任何组件的特殊属性。 <code>ref</code>属性接受一个回调函数，回调函数将在组件被挂载或卸载后立即执行。</p>
<p>当在HTML元素上使用<code>ref</code>属性时，<code>ref</code>回调函数接收一个基础的DOM元素作为其参数。 例如，此代码使用<code>ref</code>回调函数来存储对DOM节点的引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
    }

    focus() {
        // textInput是一个标准的DOM元素
        this.textInput.focus();
    }

    render() {
        return (
            <div>
                <input type=&quot;text&quot; ref={input => {
                    this.textInput = input;
                "}}"/>
                <input type=&quot;button&quot; value=&quot;选中上面的text input&quot; onClick={this.focus}/>
            </div>
        );
    }
}
ReactDOM.render(
    <CustomTextInput/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomTextInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.focus = <span class="hljs-keyword">this</span>.focus.bind(<span class="hljs-keyword">this</span>);
    }

    focus() {
        <span class="hljs-comment">// textInput是一个标准的DOM元素</span>
        <span class="hljs-keyword">this</span>.textInput.focus();
    }

    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;input type="text" ref={input =&gt; {
                    this.textInput = input;
                "}}"/&gt;
                &lt;input type="button" value="选中上面的text input" onClick={this.focus}/&gt;
            &lt;/div&gt;
        );
    }
}
ReactDOM.render(
    &lt;CustomTextInput/&gt;,
    document.getElementById('root')
);</code></pre>
<p>当组件装载(mounting)时，React将使用DOM元素调用<code>ref</code>回调函数，并在卸载时用<code>null</code>调用它。</p>
<p>使用<code>ref</code>回调函数是为类设置一个属性来访问DOM元素的常见模式。 如果您目前正在使用<code>this.refs.myRefName</code>来访问DOM引用的话，我会建议你使用此模式。</p>
<p>当在自定义组件上使用<code>ref</code>属性时，<code>ref</code>回调接收组件的已装入的组件实例作为其参数。 例如，如果我们想要包装上面的<code>CustomTextInput</code>来模拟它在装载(mounting)后立即被点击：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AutoFocusTextInput extends React.Component {
    componentDidMount() {
        this.textInput.focus();
    }
    render() {
        return (
            <CustomTextInput ref={input => {this.textInput = input; "}}" />
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AutoFocusTextInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        <span class="hljs-keyword">this</span>.textInput.focus();
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CustomTextInput</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{input</span> =&gt;</span> {this.textInput = input; "}}" /&gt;
        );
    }
}</span></code></pre>
<p>您不能在功能性组件上使用<code>ref</code>属性，因为它们没有实例。 但是，您可以使用功能性组件的<code>render</code>函数内的<code>ref</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CustomTextInput(props) {
    // 这里必须提前顶一个textInput，只有这样才可以正常执行ref回调函数
    let textInput = null;
    function click() {
        textInput.focus();
    }
    return (
        <div>
            <input type=&quot;text&quot; ref={input => { textInput = input; "}}" />
            <input type=&quot;button&quot; value=&quot;选中这个输入框&quot; onClick={click} />
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CustomTextInput</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这里必须提前顶一个textInput，只有这样才可以正常执行ref回调函数</span>
    <span class="hljs-keyword">let</span> textInput = <span class="hljs-literal">null</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">click</span>(<span class="hljs-params"></span>) </span>{
        textInput.focus();
    }
    <span class="hljs-keyword">return</span> (
        &lt;div&gt;
            &lt;input type="text" ref={input =&gt; { textInput = input; "}}" /&gt;
            &lt;input type="button" value="选中这个输入框" onClick={click} /&gt;
        &lt;/div&gt;
    );
}</code></pre>
<h3 id="articleHeader2">不要过度使用ref</h3>
<p>你的第一个倾向可能是使用<code>refs</code>在你的应用中<code>“make things happen”</code>。 </p>
<p>如果是这种情况，你必须花一点时间，关键去考虑在组件层次结构中应该拥有什么状态。<br>通常，在层次结构中处于更高级别的组件“拥有”状态是一个让一切便清除的最适当位置。 有关示例，请参阅本系列的第10篇《提升state》。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(14)refs和DOM元素

## 原文链接
[https://segmentfault.com/a/1190000007815434](https://segmentfault.com/a/1190000007815434)

