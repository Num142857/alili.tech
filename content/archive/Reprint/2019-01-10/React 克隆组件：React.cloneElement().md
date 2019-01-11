---
title: 'React 克隆组件：React.cloneElement()' 
date: 2019-01-10 2:30:08
hidden: true
slug: 36evlv758l5
categories: [reprint]
---

{{< raw >}}

                    
<p>react提供了一个克隆 API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.cloneElement(
  element,
  [props],
  [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">React</span><span class="hljs-selector-class">.cloneElement</span>(
  <span class="hljs-selector-tag">element</span>,
  <span class="hljs-selector-attr">[props]</span>,
  <span class="hljs-selector-attr">[...children]</span>
)</code></pre>
<p>官方定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Clone and return a new React element using element as the starting point. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. key and ref from the original element will be preserved." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">Clone <span class="hljs-keyword">and</span> <span class="hljs-literal">return</span> <span class="hljs-keyword">a</span> <span class="hljs-built_in">new</span> React <span class="hljs-keyword">element</span> <span class="hljs-keyword">using</span> <span class="hljs-keyword">element</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">the</span> starting point. The resulting <span class="hljs-keyword">element</span> will have <span class="hljs-keyword">the</span> original <span class="hljs-keyword">element</span><span class="hljs-string">'s props with the new props merged in shallowly. New children will replace existing children. key and ref from the original element will be preserved.</span></code></pre>
<p>下面实现一个demo，通过 React.cloneElement 向子组件传递 state 及 function，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MyContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.state.count++;
        this.setState({
            count: this.state.count++
        })
        console.log(this.state)
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, 
            {
                parentState: this.state.count,
                handleClick: this.handleClick
            }
        ));
        return (
            <div style="{{"border:&quot;1px solid blue&quot;"}}">
                <span>父容器:</span>
                { childrenWithProps }
            </div>
        )
    }
}
class MySub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false
        }
    }

    render() {
        return (
            <div style="{{"margin: &quot;15px&quot;, border: &quot;1px solid red&quot;"}}">
                子元素:{this.props.subInfo}
                <br/>
                父组件属性count值: { this.props.parentState }
                <br/>
                <span onClick={ () => this.props.handleClick() } 
                      style="{{"display:&quot;inline-block&quot;,padding: &quot;3px 5px&quot;, color:&quot;#ffffff&quot;, background: &quot;green&quot;, borderRadius: &quot;3px&quot;, cursor: &quot;pointer&quot;"}}" 
                >click me</span>
            </div>
        )
    }
}
ReactDOM.render (
    (
        <MyContainer>
            <MySub subInfo={&quot;1&quot;}/>
            <MySub subInfo={&quot;2&quot;}/>
        </MyContainer>
    )
    , document.getElementById('content'))
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">'react</span>-dom';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state = {
            count: <span class="hljs-number">1</span>
        }
        <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
    }

    handleClick() {
        <span class="hljs-keyword">this</span>.state.count++;
        <span class="hljs-keyword">this</span>.setState({
            count: <span class="hljs-keyword">this</span>.state.count++
        })
        console.log(<span class="hljs-keyword">this</span>.state)
    }

    render() {
        const childrenWithProps = <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.map(<span class="hljs-keyword">this</span>.props.children, child =&gt; <span class="hljs-type">React</span>.cloneElement(child, 
            {
                parentState: <span class="hljs-keyword">this</span>.state.count,
                handleClick: <span class="hljs-keyword">this</span>.handleClick
            }
        ));
        <span class="hljs-keyword">return</span> (
            &lt;div style="{{"border:<span class="hljs-string">"1px solid blue"</span>"}}"&gt;
                &lt;span&gt;父容器:&lt;/span&gt;
                { childrenWithProps }
            &lt;/div&gt;
        )
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MySub</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state = {
            flag: <span class="hljs-literal">false</span>
        }
    }

    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div style="{{"margin: <span class="hljs-string">"15px"</span>, border: <span class="hljs-string">"1px solid red"</span>"}}"&gt;
                子元素:{<span class="hljs-keyword">this</span>.props.subInfo}
                &lt;br/&gt;
                父组件属性count值: { <span class="hljs-keyword">this</span>.props.parentState }
                &lt;br/&gt;
                &lt;span onClick={ () =&gt; <span class="hljs-keyword">this</span>.props.handleClick() } 
                      style="{{"display:<span class="hljs-string">"inline-block"</span>,padding: <span class="hljs-string">"3px 5px"</span>, color:<span class="hljs-string">"#ffffff"</span>, background: <span class="hljs-string">"green"</span>, borderRadius: <span class="hljs-string">"3px"</span>, cursor: <span class="hljs-string">"pointer"</span>"}}" 
                &gt;click me&lt;/span&gt;
            &lt;/div&gt;
        )
    }
}
<span class="hljs-type">ReactDOM</span>.render (
    (
        &lt;<span class="hljs-type">MyContainer</span>&gt;
            &lt;<span class="hljs-type">MySub</span> subInfo={<span class="hljs-string">"1"</span>}/&gt;
            &lt;<span class="hljs-type">MySub</span> subInfo={<span class="hljs-string">"2"</span>}/&gt;
        &lt;/<span class="hljs-type">MyContainer</span>&gt;
    )
    , document.getElementById(<span class="hljs-symbol">'conten</span>t'))
    </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!DOCTYPE html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>react drag components example...</title>
    <link rel=&quot;stylesheet&quot; href=&quot;/build/main.css&quot;>
</head>

<body>
    <div id=&quot;content&quot;></div>
    <script src=&quot;bundle.js&quot;></script>
</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>react drag components example...<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/build/main.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>需要注意，在父组件的构造器中，需要动态制定函数的 this 指向，否则该函数通过事件触发时，this指向子组件。通过下面语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.handleClick = this.handleClick.bind(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);</code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bVQnWd?w=827&amp;h=257" src="https://static.alili.tech/img/bVQnWd?w=827&amp;h=257" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 克隆组件：React.cloneElement()

## 原文链接
[https://segmentfault.com/a/1190000010062928](https://segmentfault.com/a/1190000010062928)

