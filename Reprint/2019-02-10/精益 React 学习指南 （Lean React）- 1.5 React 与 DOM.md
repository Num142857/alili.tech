---
title: '精益 React 学习指南 （Lean React）- 1.5 React 与 DOM' 
date: 2019-02-10 2:30:42
hidden: true
slug: ia6hx9lm5fo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">1.5 React 与 DOM</h1>
<p><span class="img-wrap"><img data-src="/img/bVvUtM" src="https://static.alili.tech/img/bVvUtM" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在这一节中，主要的讨论范围为 React 与 DOM 相关的处理，包括：</p>
<ol>
<li><p>如何获取 DOM 元素</p></li>
<li><p>如何做事件响应处理</p></li>
<li><p>表单处理</p></li>
<li><p>style 属性</p></li>
</ol>
<p>这节讲述过后，我们将会为 TODO 应用添加完整的事件响应，包括新增，删除，标记完成等。</p>
<h2 id="articleHeader1">1.5.1 获取 DOM 元素</h2>
<p>上一节我们已经讲过组件的生命周期，DOM 真正被添加到 HTML 中的 hook 为</p>
<ul>
<li><p>componentDidMount</p></li>
<li><p>componentDidUpdate</p></li>
</ul>
<p>在这两个 hook 函数中， 我们可以获取真正的 DOM 元素，React 提供的获取方法两种方式</p>
<h3 id="articleHeader2">findDOMNode()</h3>
<p>通过 ReactDOM 提供的 findDOMNode 方法， 传入参数我组件实例，eg</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = React.createClass({
    render: function() {
        return <div> .... </div>
    },
    componentDidMount: function() {
        var $root = ReactDOM.findDOMNode(this);
        console.log($root);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var MyComponent = React.createClass({
    render: function() {
        return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> .... <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    },
    componentDidMount: function() {
        var $root = ReactDOM.findDOMNode(this);
        console.log($root);
    }
})</code></pre>
<blockquote><p>需要注意的是此方法不能应用到无状态组件上</p></blockquote>
<h3 id="articleHeader3">Refs</h3>
<p>上面的方法只能获取到 root  元素，那如果我的 DOM 有很多层级，我想获取一个子级的元素呢？<br>React 提供了 ref 属性来实现这种需求。</p>
<p>每个组件实例都有一个 <code>this.refs</code> 属性，会自动引用所有包含 ref 属性组件的 DOM, eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = React.createClass({
    render: function() {
        return  <div>
                    <button ref=&quot;btn&quot;>...</button>
                    <a href=&quot;&quot; ref=&quot;link&quot;></a>
                </div>
    },
    componentDidMount: function() {
        var $btn = this.refs.btn;
        var $link = this.refs.link;
        console.log($btn, $link);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var MyComponent = React.createClass({
    render: function() {
        return  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"btn"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"link"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    },
    componentDidMount: function() {
        var $btn = this.refs.btn;
        var $link = this.refs.link;
        console.log($btn, $link);
    }
})</code></pre>
<h2 id="articleHeader4">1.5.2 DOM 事件</h2>
<blockquote><p>官方事件文档 <a href="http://facebook.github.io/react/docs/events.html" rel="nofollow noreferrer" target="_blank">http://facebook.github.io/react/docs/events.html</a></p></blockquote>
<h3 id="articleHeader5">绑定事件</h3>
<p>在 React 中绑定事件的方式很简单，只需要在元素中添加事件名称的属性已经对应的处理函数，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = React.creatClass({
    render: function() {
        return  <div>
                    <button onClick={this.onClick}>Click Me</button>
                </div>
    },
    onClick: function() {
        console.log('click me');
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var MyComponent = React.creatClass({
    render: function() {
        return  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClick}</span>&gt;</span>Click Me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    },
    onClick: function() {
        console.log('click me');
    }
});</code></pre>
<p>事件名称和其他属性名称一样，服从驼峰式命名。</p>
<h3 id="articleHeader6">合成事件（SyntheticEvent）</h3>
<p>在 React 中， 事件的处理由其内部自己实现的事件系统完成，触发的事件都叫做 合成事件（SyntheticEvent），事件系统对浏览器做了兼容，其提供的 API 与原生的事件无异。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
<span class="hljs-keyword">void</span> preventDefault()
boolean isDefaultPrevented()
<span class="hljs-keyword">void</span> stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type</code></pre>
<p>和原生事件的区别在于，事件不能异步话，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => &quot;click&quot;
  var eventType = event.type; // => &quot;click&quot;

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => &quot;click&quot;
  }, 0);

  this.setState({clickEvent: event}); // Won't work. this.state.clickEvent will only contain null values.
  this.setState({eventType: event.type}); // You can still export event properties.
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-built_in">console</span>.log(event); <span class="hljs-comment">// =&gt; nullified object.</span>
  <span class="hljs-built_in">console</span>.log(event.type); <span class="hljs-comment">// =&gt; "click"</span>
  <span class="hljs-keyword">var</span> eventType = event.type; <span class="hljs-comment">// =&gt; "click"</span>

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(event.type); <span class="hljs-comment">// =&gt; null</span>
    <span class="hljs-built_in">console</span>.log(eventType); <span class="hljs-comment">// =&gt; "click"</span>
  }, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">clickEvent</span>: event}); <span class="hljs-comment">// Won't work. this.state.clickEvent will only contain null values.</span>
  <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">eventType</span>: event.type}); <span class="hljs-comment">// You can still export event properties.</span>
}</code></pre>
<p>原因是在事件系统的内部实现当中， 一个事件对象可能会被重用（也就是事件做了池化 Pooling）。当一个事件响应函数执行过后，事件的属性被设置为 null， 如果想用保持事件的值的话，可以调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    event.persist()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    event.persist()</code></pre>
<p>这样，属性会被保留，并且事件也会被从池中取出。</p>
<h3 id="articleHeader7">事件捕获和冒泡</h3>
<p>在 DOM2.0 事件分为捕获阶段和冒泡阶段，React 中通常我们注册的事件为冒泡事件，如果要注册捕获阶段的事件，可以在事件名称后加 Capture 如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onClick
onClickCapture" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">onClick</span>
<span class="hljs-literal">on</span>ClickCapture</code></pre>
<h3 id="articleHeader8">支持事件列表</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="粘贴板事件 {
    事件名称：onCopy onCut onPaste
    属性：DOMDataTransfer clipboardData
}

编辑事件 {
    事件名称：onCompositionEnd onCompositionStart onCompositionUpdate
    属性：string data
}

键盘事件 {
    事件名称：onKeyDown onKeyPress onKeyUp
    属性： {
        boolean altKey
        number charCode
        boolean ctrlKey
        boolean getModifierState(key)
        string key
        number keyCode
        string locale
        number location
        boolean metaKey
        boolean repeat
        boolean shiftKey
        number which
    }
}

// 焦点事件除了表单元素以外，可以应用到所有元素中
焦点事件 {
    名称：onFocus onBlur
    属性：DOMEventTarget relatedTarget
}

表单事件 {
    名称：onChange onInput onSubmit
}

鼠标事件 {
    名称：{
        onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp
    }
    属性：{
        boolean altKey
        number button
        number buttons
        number clientX
        number clientY
        boolean ctrlKey
        boolean getModifierState(key)
        boolean metaKey
        number pageX
        number pageY
        DOMEventTarget relatedTarget
        number screenX
        number screenY
        boolean shiftKey
    }
}

选择事件 {
    名称：onSelect
}

触摸事件 {
    名称：onTouchCancel onTouchEnd onTouchMove onTouchStart
    属性：{
        boolean altKey
        DOMTouchList changedTouches
        boolean ctrlKey
        boolean getModifierState(key)
        boolean metaKey
        boolean shiftKey
        DOMTouchList targetTouches
        DOMTouchList touches
    }
}

UI 事件 {
    名称：onScroll
    属性：{
        number detail
        DOMAbstractView view
    }
}

滚轮事件 {
    名称：onWheel
    属性：{
        number deltaMode
        number deltaX
        number deltaY
        number deltaZ
    }
}

媒体事件 {
    名称：{
        onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting
    }
}

图像事件 {
    名称：onLoad onError
}

动画事件 {
    名称：onAnimationStart onAnimationEnd onAnimationIteration
    属性：{
        string animationName
        string pseudoElement
        float elapsedTime
    }
}

渐变事件 {
    名称：onTransitionEnd
    属性： {
        string propertyName
        string pseudoElement
        float elapsedTime
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">粘贴板事件 {
    事件名称：onCopy onCut onPaste
    属性：DOMDataTransfer clipboardData
}

编辑事件 {
    事件名称：onCompositionEnd onCompositionStart onCompositionUpdate
    属性：string data
}

键盘事件 {
    事件名称：onKeyDown onKeyPress onKeyUp
    属性： {
        boolean altKey
        number charCode
        boolean ctrlKey
        boolean getModifierState(key)
        string key
        number keyCode
        string locale
        number location
        boolean metaKey
        boolean repeat
        boolean shiftKey
        number which
    }
}

<span class="hljs-comment">// 焦点事件除了表单元素以外，可以应用到所有元素中</span>
焦点事件 {
    名称：onFocus onBlur
    属性：DOMEventTarget relatedTarget
}

表单事件 {
    名称：onChange onInput onSubmit
}

鼠标事件 {
    名称：{
        onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp
    }
    属性：{
        boolean altKey
        number button
        number buttons
        number clientX
        number clientY
        boolean ctrlKey
        boolean getModifierState(key)
        boolean metaKey
        number pageX
        number pageY
        DOMEventTarget relatedTarget
        number screenX
        number screenY
        boolean shiftKey
    }
}

选择事件 {
    名称：onSelect
}

触摸事件 {
    名称：onTouchCancel onTouchEnd onTouchMove onTouchStart
    属性：{
        boolean altKey
        DOMTouchList changedTouches
        boolean ctrlKey
        boolean getModifierState(key)
        boolean metaKey
        boolean shiftKey
        DOMTouchList targetTouches
        DOMTouchList touches
    }
}

UI 事件 {
    名称：onScroll
    属性：{
        number detail
        DOMAbstractView view
    }
}

滚轮事件 {
    名称：onWheel
    属性：{
        number deltaMode
        number deltaX
        number deltaY
        number deltaZ
    }
}

媒体事件 {
    名称：{
        onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting
    }
}

图像事件 {
    名称：onLoad onError
}

动画事件 {
    名称：onAnimationStart onAnimationEnd onAnimationIteration
    属性：{
        string animationName
        string pseudoElement
        float elapsedTime
    }
}

渐变事件 {
    名称：onTransitionEnd
    属性： {
        string propertyName
        string pseudoElement
        float elapsedTime
    }
}</code></pre>
<h2 id="articleHeader9">1.5.3 表单事件</h2>
<p>在 React 中比较特殊的事件是表单事件，大多数组件都是通过属性和状态来决定的，但是表单组件如 <code>input</code>, <code>select</code>, <code>option</code> 这些组件的状态用户可以修改，在 React 中会特殊处理这些组件的事件。</p>
<h3 id="articleHeader10">onChange 事件</h3>
<p>和普通 HTML 中的 onChange 事件不同， 在原生组件中，只有 input 元素失去焦点才会触发 onChange 事件， 在 React 中，只要元素的值被修改就会触发 onChange 事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        }
    },
    render: function() {
        return  <div onChange={this.onChangeBubble}>
                    <input value={this.state.value} onChange={this.onChange}/>
                </div>
    },
    onChange: function(ev) {
        console.log('change: ' + ev.target.value);
        this.setState({
            value: ev.target.value
        });
    },
    // onChange 事件支持所有组件，可以被用于监听冒泡事件
    onChangeBubble: function(ev) {
        console.log('bubble onChange event', + ev.target.value);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var MyComponent = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        }
    },
    render: function() {
        return  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChangeBubble}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}/</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    },
    onChange: function(ev) {
        console.log('change: ' + ev.target.value);
        this.setState({
            value: ev.target.value
        });
    },
    // onChange 事件支持所有组件，可以被用于监听冒泡事件
    onChangeBubble: function(ev) {
        console.log('bubble onChange event', + ev.target.value);
    }
})</code></pre>
<h3 id="articleHeader11">交互属性</h3>
<p>表单组件中能被用户修改的属性叫交互属性，包括：</p>
<ol>
<li><p><code>value</code>    =&gt; <strong>&lt;input&gt;</strong> 和 <strong>&lt;select&gt;</strong> 组件</p></li>
<li><p><code>checked</code>  =&gt; <strong>&lt;input type="checkbox|radio"&gt;</strong></p></li>
<li><p><code>selected</code> =&gt; <strong>&lt;opiton&gt;</strong></p></li>
</ol>
<h3 id="articleHeader12">textara</h3>
<p>在 HTML 中，textarea 的值是像如下定义的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<textarea name=&quot;&quot; id=&quot;&quot; cols=&quot;30&quot; rows=&quot;10&quot;>
    some value
</textarea>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span>&gt;</span>
    some value
<span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span></code></pre>
<p>而在 React 中， TextArea 的使用方式同 input 组件，使用 value 来设置值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = function() {
    render: function() {
        return <div>
                    <textarea value={...} onChange={...}/>
                </div>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var MyComponent = function() {
    render: function() {
        return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{...}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{...}/</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    }
}</code></pre>
<h3 id="articleHeader13">select 组件</h3>
<p>在 React 中 select 组件支持 value 值，value 值还支持多选</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  <select value=&quot;B&quot;>
    <option value=&quot;A&quot;>Apple</option>
    <option value=&quot;B&quot;>Banana</option>
    <option value=&quot;C&quot;>Cranberry</option>
  </select>

  <select multiple={true} value={['B', 'C']}>
    <option value=&quot;A&quot;>Apple</option>
    <option value=&quot;B&quot;>Banana</option>
    <option value=&quot;C&quot;>Cranberry</option>
  </select>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
  <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"B"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"A"</span>&gt;</span>Apple<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"B"</span>&gt;</span>Banana<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"C"</span>&gt;</span>Cranberry<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">multiple</span>=<span class="hljs-string">{true}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{[</span>'<span class="hljs-attr">B</span>', '<span class="hljs-attr">C</span>']}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"A"</span>&gt;</span>Apple<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"B"</span>&gt;</span>Banana<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"C"</span>&gt;</span>Cranberry<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
</code></pre>
<h3 id="articleHeader14">受控组件</h3>
<p>在 React 中表单组件可分为两类，受控与非受控组件，受控组件是包含了 value 值的，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function() {
    return <input type=&quot;text&quot; value=&quot;.....&quot;/>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">render: function() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"....."</span>/&gt;</span>
}</code></pre>
<p>为什么叫受控组件？ 因为这个时候用户不能修改 input 的值， input 的值永远是 value 固定了的值。<br>如果去掉 value 属性，那么就可以输入值了。</p>
<p>那如何修改受控组件的值呢？ 如上面的例子中， 添加 onChange 事件，事件内修改 value 属性，value 属性的值会被设置到组件的 value 中。</p>
<h3 id="articleHeader15">非受控组件</h3>
<p>对应受控组件，也有非受控组件，那么那种是非受控组价呢？</p>
<p>没有 value 值的 input</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function() {
    return <input type=&quot;text&quot;/>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">render: function() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>/&gt;</span>
}</code></pre>
<p>那如果想设置默认值呢？</p>
<p>可以通过 defaultValue 属性来设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function() {
    return <input type=&quot;text&quot; defaultValue=&quot;Default Value&quot;>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">render: function() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">"Default Value"</span>&gt;</span>
}</code></pre>
<p>类似的对于 checkbox 有 defaultChecked 属性</p>
<blockquote><p>需要注意的是，默认值只适用于第一次渲染，在重渲染阶段将不会适用。</p></blockquote>
<h3 id="articleHeader16">checkbox 和 radio</h3>
<p>checkbox 和 radio 比较特殊， 如果在 onChange 事件中调用了 preventDefault ，那么浏览器不会更新 checked 状态，即便事实上组件的值已经 checked 或者 unchecked 了 。</p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CheckBox = React.createClass({
    getInitialState: function(){
        return {
            checked: false
        }
    },
    render: function() {
        return  <div>
            <input type=&quot;checkbox&quot; 
                checked={this.state.checked} 
                onChange={this.onChange}/>
        </div>
    },
    onChange: function(ev) {
        this.setState({
            checked: true
        });
        ev.preventDefault();
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var CheckBox = React.createClass({
    getInitialState: function(){
        return {
            checked: false
        }
    },
    render: function() {
        return  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> 
                <span class="hljs-attr">checked</span>=<span class="hljs-string">{this.state.checked}</span> 
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}/</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    },
    onChange: function(ev) {
        this.setState({
            checked: true
        });
        ev.preventDefault();
    }
})</code></pre>
<p>这个例子里边，checked 虽然更新为 true ，但是 input 的值 checked 为 false</p>
<p>那应如何处理 checkbox 呢？</p>
<ol>
<li><p>避免调用 ev.preventDefault 就行</p></li>
<li><p>在 setTimeout 中处理 checked 的修改</p></li>
<li><p>使用 click 事件</p></li>
</ol>
<h2 id="articleHeader17">1.5.4 style 属性</h2>
<p>在 React 中，可以直接设置 style 属性来控制样式，不过与 HTML 不同的是， 传入的 style 值为一个对象， 对象的所有 key 都是驼峰式命名，eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function() {
    var style = {
        backgroundColor: 'red',
        height: 100,
        width: 100
    }
    return <div style={style}></div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">render: function() {
    var style = {
        backgroundColor: 'red',
        height: 100,
        width: 100
    }
    return <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
}</code></pre>
<p>其中还可以看到不同的地方时，为了简写宽度高度值，可以直接设置数字，对应 <code>100 -&gt; 100px</code>。如果某些属性不需要添加 px 后缀，React 也会自动去除。</p>
<p>通过属性值驼峰式的原因是 DOM 内部访问 style 也是驼峰式。如果需要添加浏览器前缀瑞 <code>-webkit-</code>、<code>-ms-</code> 大驼峰(除了 ms ), 如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var divStyle = {
  WebkitTransition: 'all', // 'W' 是大写
  msTransition: 'all'      // 'ms' 为小写
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> divStyle = {
  <span class="hljs-attr">WebkitTransition</span>: <span class="hljs-string">'all'</span>, <span class="hljs-comment">// 'W' 是大写</span>
  msTransition: <span class="hljs-string">'all'</span>      <span class="hljs-comment">// 'ms' 为小写</span>
};</code></pre>
<h3 id="articleHeader18">为什么要用 inline 的样式？</h3>
<p>在以前的前端开发方式是 样式结构和逻辑要分离， 而现在 React 中却有很多人推崇 inline 的样式。 在我看来因人而异，React 的这种模式也能做到样式模块化，样式重用（借用 Js 的特点）。并且因为 React 的实现方式，Inline 样式的性能甚至比 class 的方式高。</p>
<h2 id="articleHeader19">1.5.5 实例练习：完整功能的 TODO 应用</h2>
<p>@todo</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 1.5 React 与 DOM

## 原文链接
[https://segmentfault.com/a/1190000005182270](https://segmentfault.com/a/1190000005182270)

