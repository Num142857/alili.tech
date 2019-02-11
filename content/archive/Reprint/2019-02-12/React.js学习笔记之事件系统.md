---
title: 'React.js学习笔记之事件系统' 
date: 2019-02-12 2:30:12
hidden: true
slug: 6von8dzltdw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React.js学习笔记之事件系统</h1>
<p>@(React学习)</p>
<h2 id="articleHeader1">事件系统</h2>
<blockquote><p>React 标准化了事件对象，因此在不同的浏览器中都会有相同的属性。</p></blockquote>
<p>组件createClass后创建的是许多方法组成的对象。组件中使用的方法分为React自有的方法与用户定义的方法。其中React自有方法是组件生命周期中的方法，如：<code>render</code>、<code>componentWillUpdate</code>、<code>componentDidMount</code>等。用户自定义的方法可以起符合JS命名规范的方法就可以（最好使用驼峰命名），如：<code>handleClick</code>、<code>handleChange</code>、<code>handleMouseover</code>等。</p>
<blockquote><p>事件绑定语法：onClick = {this.handleClick}</p></blockquote>
<h3 id="articleHeader2">绑定事件处理函数</h3>
<h4>鼠标类</h4>
<blockquote><ul>
<li><p>onClick</p></li>
<li><p>onContextMenu</p></li>
<li><p>onDoubleClick</p></li>
<li><p>onMouseDown</p></li>
<li><p>onMouseEnter</p></li>
<li><p>onMouseLeave</p></li>
<li><p>onMouseMove</p></li>
<li><p>onMouseOut</p></li>
<li><p>onMouseOver</p></li>
<li><p>onMouseUp</p></li>
</ul></blockquote>
<p>拖拽事件：</p>
<blockquote><ul>
<li><p>onDrop</p></li>
<li><p>onDrag</p></li>
<li><p>onDragEnd</p></li>
<li><p>onDragEnter</p></li>
<li><p>onDragExit</p></li>
<li><p>onDragLeave</p></li>
<li><p>onDragOver</p></li>
<li><p>onDragStart</p></li>
</ul></blockquote>
<h4>触摸</h4>
<blockquote><ul>
<li><p>onTouchCancel</p></li>
<li><p>onTouchEnd</p></li>
<li><p>onTouchMove</p></li>
<li><p>onTouchStart</p></li>
</ul></blockquote>
<p>触摸只会在移动设备上产生</p>
<h4>键盘</h4>
<p><code>onKeyPress</code>是<code>onKeyDown</code>和<code>onKeyUp</code>的组合</p>
<blockquote><ul>
<li><p>onKeyDown</p></li>
<li><p>onKeyPress</p></li>
<li><p>onKeyUp</p></li>
</ul></blockquote>
<h4>剪切类</h4>
<blockquote><ul>
<li><p>onCopy</p></li>
<li><p>onCut</p></li>
<li><p>onPaste</p></li>
</ul></blockquote>
<p>对应的是我们常常使用的复制、剪切和粘贴</p>
<h4>表单类</h4>
<p>(会专门总结表单类事件，在此仅仅简单列出)</p>
<blockquote><ul>
<li><p>onChange</p></li>
<li><p>onInput</p></li>
<li><p>onSubmit</p></li>
</ul></blockquote>
<p><code>onChange</code>可以用在输入框、单选框、下拉列表里，每当内容发生变化时我们都能获得通知。<code>onInput</code>使用在文字输入。<code>onSubmit</code>是用在整个表单的输入提交，常用在禁止表单的默认操作。</p>
<h4>焦点事件</h4>
<blockquote><ul>
<li><p>onFocus</p></li>
<li><p>onBlur</p></li>
</ul></blockquote>
<h4>UI元素类</h4>
<blockquote><ul><li><p>onScroll</p></li></ul></blockquote>
<p>滚动事件触发的时候会触发onScroll事件</p>
<h4>滚动</h4>
<blockquote><ul><li><p>onWheel</p></li></ul></blockquote>
<p>鼠标滚轮触发的事件，监听滚动幅度，滚动方位</p>
<h4>组成事件</h4>
<blockquote><ul>
<li><p>onCompositionEnd</p></li>
<li><p>onCompositionStart</p></li>
<li><p>onCompositionUpdate</p></li>
</ul></blockquote>
<h4>图片类</h4>
<blockquote><ul>
<li><p>onLoad</p></li>
<li><p>onError</p></li>
</ul></blockquote>
<h4>多媒体类</h4>
<blockquote><p>onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting</p></blockquote>
<h3 id="articleHeader3">实例演示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HelloDada = React.creatClass({
    getInitialState:function(){
        return{
            name:''
        };
    },
    handleChange:function(e){
        this.setState({
            name:e.target.value
        });
    },
    render:function(){
        return <div>
        <input onChange={this.handleChange} />
        </div>
    }
});
ReactDom.render(<HelloDada/>,document.body);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HelloDada = React.creatClass({
    <span class="hljs-attr">getInitialState</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">name</span>:<span class="hljs-string">''</span>
        };
    },
    <span class="hljs-attr">handleChange</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">name</span>:e.target.value
        });
    },
    <span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChange}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    }
});
ReactDom.render(<span class="hljs-tag">&lt;<span class="hljs-name">HelloDada</span>/&gt;</span>,document.body);</span></code></pre>
<h2 id="articleHeader4">事件池</h2>
<p>虚拟事件对象已经被合并。这意味着虚拟事件对象将被重新使用，而该事件回调被调用之后所有的属性将无效。这是出于性能的考虑。因此，您不能以异步的方式访问事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onClick(event) {
  console.log(event); // =>无效的对象
  console.log(event.type); // => &quot;click&quot;
  var eventType = event.type; // => &quot;click&quot;

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => &quot;click&quot;
  }, 0);

  this.setState({clickEvent: event}); // 不起作用.this.state.clickEvent 将只包含空值.
  this.setState({eventType: event.type}); // 您依然可以导出事件属性
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-built_in">console</span>.log(event); <span class="hljs-comment">// =&gt;无效的对象</span>
  <span class="hljs-built_in">console</span>.log(event.type); <span class="hljs-comment">// =&gt; "click"</span>
  <span class="hljs-keyword">var</span> eventType = event.type; <span class="hljs-comment">// =&gt; "click"</span>

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(event.type); <span class="hljs-comment">// =&gt; null</span>
    <span class="hljs-built_in">console</span>.log(eventType); <span class="hljs-comment">// =&gt; "click"</span>
  }, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">clickEvent</span>: event}); <span class="hljs-comment">// 不起作用.this.state.clickEvent 将只包含空值.</span>
  <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">eventType</span>: event.type}); <span class="hljs-comment">// 您依然可以导出事件属性</span>
}</code></pre>
<blockquote><p>如果您想以一个异步的方式来访问事件属性，您应该对事件调用<code>event.persist()</code>。这将从事件池中取出合成的事件，并允许该事件的引用，使用户的代码被保留。</p></blockquote>
<h2 id="articleHeader5">事件对象</h2>
<p>事件处理器将会传入<code>SyntheticEvent</code>的实例，一个对浏览器本地事件的跨浏览器封装。它有和浏览器本地事件相同的属性和方法，包括<code>stopPropagation()</code>和<code>preventDefault()</code>，但是没有浏览器兼容问题。<br>如果因为一些因素，需要底层的浏览器事件对象，只要使用<code>nativeEvent</code>属性就可以获取到它了。</p>
<blockquote><p>对于 v0.14，在事件处理函数中返回 false 将不会阻止事件冒泡。取而代之的是在合适的应用场景下，手动调用<code>e.stopPropagation()</code>或者<code>e.preventDefault()</code>。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    handleChange:function(e){
        console.log(e.target.value);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    handleChange:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(e.target.value);
    }</code></pre>
<p>其中<code>e</code>是事件对象<code>target</code>是事件对象的属性</p>
<p><em>(以下内容括号内为类型)</em></p>
<h3 id="articleHeader6">通用属性</h3>
<ul>
<li><p>bubbles (boolean) 表示事件是否冒泡</p></li>
<li><p>cancelable(boolean) 表示事件是否可以取消</p></li>
<li><p>currentTarget(DOMEventTarget) 与Target类似，由于事件可以冒泡，所以两者表示的内容是不同的</p></li>
<li><p>defaultPrevented(boolean) 表示事件是否禁止了默认行为</p></li>
<li><p>eventPhase(number) 表示事件所处的阶段</p></li>
<li><p>isTrusted(boolean) 表示事件是否可信。所谓的可信事件表示的是用户操作的事件，不可信事件就是通过JS代码来触发的事件。</p></li>
<li><p>nativeEvent(DOMEvent)</p></li>
<li><p>preventDefault() (void) 对应的defaultPrevented，表示的是禁止默认行为</p></li>
<li><p>stopPropagaTion() (void) 对应的是bubbles，表示的是sh</p></li>
<li><p>target(DOMEventTarget)</p></li>
<li><p>timeStamp(number) 时间戳，也就是事件触发的事件</p></li>
<li><p>type(string) 事件的类型</p></li>
</ul>
<h3 id="articleHeader7">不同事件对象的特有属性</h3>
<h4>剪切事件</h4>
<ul><li><p>clipboardData(DOMDataTransfer)表示拿到的数据</p></li></ul>
<h4>键盘事件</h4>
<ul>
<li><p>altKey(boolean) 表示是否按下alt键</p></li>
<li><p>charCode(Number) 表示的是按键的字符编码，可以通过编码来判断按下的是什么键</p></li>
<li><p>ctrlKey(boolean) 表示是否按下ctrl键</p></li>
<li><p>getModifierState(key) (function) 表示是否按下辅助按键（辅助按键就是雷士ctrl、shift等辅助按键）可以传入按键编码来判断是否按下</p></li>
<li><p>key(string) 字符串，按下的键</p></li>
<li><p>keyCode(Number) 表示那些不是字符编码的按键</p></li>
<li><p>locale(String) 表示本地化得一些字符串</p></li>
<li><p>location(number) 表示位置</p></li>
<li><p>metaKey(boolean) 表示的是win系统下的win键，mac系统下对应的command键</p></li>
<li><p>repeat(boolean) 表示按键是否重复</p></li>
<li><p>shiftKey(boolean) 表示是否按下shift</p></li>
<li><p>which(Number) 表示经过通用化得charCode和keyCode</p></li>
</ul>
<h4>焦点事件</h4>
<ul><li><p>relatedTarget(DOMEventTarget) 相关焦点对象</p></li></ul>
<h4>鼠标事件</h4>
<ul>
<li><p>altKey(boolean)</p></li>
<li><p>button(Number)</p></li>
<li><p>buttons(Number)</p></li>
<li><p>clientX(Number) 原点为浏览器左上角</p></li>
<li><p>clinetY(Number) 原点为浏览器左上角</p></li>
<li><p>ctrlKey(boolean)</p></li>
<li><p>getModifierState(key) (function)</p></li>
<li><p>metaKey(boolean)</p></li>
<li><p>pageX(Number) 原点为HTML页面的左上角</p></li>
<li><p>pageY(Number) 原点为HTML页面的左上角</p></li>
<li><p>relatedTarget(DOMEventTarget)</p></li>
<li><p>screenX(Number) 原点为显示器的左上角</p></li>
<li><p>screenY(Number) 原点为显示器的左上角</p></li>
<li><p>shiftKey(boolean)</p></li>
</ul>
<h4>触摸事件</h4>
<blockquote><p>为了使触摸事件生效，在渲染所有组件之前调用 <code>React.initializeTouchEvents(true)</code>。</p></blockquote>
<ul>
<li><p>altKey(boolean)</p></li>
<li><p>ctrlKey(boolean)</p></li>
<li><p>getModifierState(key)</p></li>
<li><p>metaKey(boolean)</p></li>
<li><p>shiftKey(boolean)</p></li>
<li><p>changedTouches(DOMTouchList) 判断手势操作</p></li>
<li><p>targetTouches(DOMTouchList) 判断手势操作</p></li>
<li><p>touches(DOMTouchList) 判断手势操作</p></li>
</ul>
<h4>UI元素事件</h4>
<ul>
<li><p>detail(Number) 滚动的距离</p></li>
<li><p>view(DOMAbstractView) 界面，视窗</p></li>
</ul>
<h4>鼠标滚动</h4>
<ul>
<li><p>deltaMode(Number) 可以理解为移动的单位</p></li>
<li><p>deltaX(Number) X轴移动的相对距离固定值</p></li>
<li><p>deltaY(Number) Y轴移动的相对距离固定值</p></li>
<li><p>deltaZ(Number) Z轴移动的相对距离固定值</p></li>
</ul>
<h3 id="articleHeader8">实例</h3>
<ol><li><p>滚动事件对象</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HelloDada = React.creatClass({
    getInitialState:function(){
        return {
            backgroundColor:'#FFFFFF'
        }
    },
    handleWheel:function(e){
        var newColor = (parseInt(this.state.backgroundColor.substr(1),16)+e.deltaY*997).tiString(16);
        this.setState({
            backgroundColor:newColor
        })
    },
    render:function(){
        return <div onWheel={this.handleWheel} style={this.state}>
        <p>Dada Shuaige</p>
        </div>
    }
});
ReactDOM.render(<HelloDada />,document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HelloDada = React.creatClass({
    <span class="hljs-attr">getInitialState</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">backgroundColor</span>:<span class="hljs-string">'#FFFFFF'</span>
        }
    },
    <span class="hljs-attr">handleWheel</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">var</span> newColor = (<span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.state.backgroundColor.substr(<span class="hljs-number">1</span>),<span class="hljs-number">16</span>)+e.deltaY*<span class="hljs-number">997</span>).tiString(<span class="hljs-number">16</span>);
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">backgroundColor</span>:newColor
        })
    },
    <span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onWheel</span>=<span class="hljs-string">{this.handleWheel}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{this.state}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Dada Shuaige<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
});
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">HelloDada</span> /&gt;</span>,document.body)</span></code></pre>
<p>2.键盘事件对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Dada =React.creatClass{
    getInitialState:function(){
        return{
            password:''
        }
    },
    handleKeyPress:function(e){
        this.setState({
            paddword:this.state.password+e.which
        });
    },
    handleChange:function(e){
        e.target.value='';
    },
    render:function(){
        return <div>
        <input onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
        <p style="{{"
            'display':this.state.password.indexOf('495051') >=0?'block':'none'
        "}}">Dada handsomeboy</p>
        </div>
    }
};
ReactDOM.render(<Dada />,document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Dada =React.creatClass{
    <span class="hljs-attr">getInitialState</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">password</span>:<span class="hljs-string">''</span>
        }
    },
    <span class="hljs-attr">handleKeyPress</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">paddword</span>:<span class="hljs-keyword">this</span>.state.password+e.which
        });
    },
    <span class="hljs-attr">handleChange</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        e.target.value=<span class="hljs-string">''</span>;
    },
    <span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onKeyPress</span>=<span class="hljs-string">{this.handleKeyPress}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChange}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
            '<span class="hljs-attr">display</span>'<span class="hljs-attr">:this.state.password.indexOf</span>('<span class="hljs-attr">495051</span>') &gt;</span>=0?'block':'none'
        "}}"&gt;Dada handsomeboy<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    }
};
ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">Dada</span> /&gt;</span>,document.body)</span></code></pre>
<h2 id="articleHeader9">事件与状态关联</h2>
<p>状态不仅仅实现了组件内部结果的清晰对应，还实现了组件与用户之间的交互，使用户与组件的行为紧紧结合起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleChange:function(e){
    this.setState({Dada:e.target.value});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleChange:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">Dada</span>:e.target.value});
}</code></pre>
<blockquote><p>this.setState设置状态</p></blockquote>
<h3 id="articleHeader10">实例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Dada =React.creatClass({
    getInitialState:function(){
        return{
            x:0,
            y:0
        }
    },
    handleMouseMove:function(e){
        this.setState({
            x:e.clientX,
            y:e.clientY
        });
    },
    render:function(){
        return <div onMouseMove={this.handleMouseMove} style="{{"
            width:'200px',
            height:'200px',
            backgroundColor:'#999'
        "}}">
        {this.state.x+'.'+this.state.y}
        </div>
    }
});
ReactDOM.render(<Dada />,document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Dada =React.creatClass({
    <span class="hljs-attr">getInitialState</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">x</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">y</span>:<span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">handleMouseMove</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">x</span>:e.clientX,
            <span class="hljs-attr">y</span>:e.clientY
        });
    },
    <span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onMouseMove</span>=<span class="hljs-string">{this.handleMouseMove}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
            <span class="hljs-attr">width:</span>'<span class="hljs-attr">200px</span>',
            <span class="hljs-attr">height:</span>'<span class="hljs-attr">200px</span>',
            <span class="hljs-attr">backgroundColor:</span>'#<span class="hljs-attr">999</span>'
        "}}"&gt;</span>
        {this.state.x+'.'+this.state.y}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
});
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dada</span> /&gt;</span>,document.body)</span></code></pre>
<h2 id="articleHeader11">小结</h2>
<p>本节主要介绍了React的事件系统，很详细的列出了每一个事件对象与事件对象的属性，可以作为一个查找的参考。</p>
<h2 id="articleHeader12">特别感谢</h2>
<ul>
<li><p><a href="http://www.jikexueyuan.com/course/reactjs/" rel="nofollow noreferrer" target="_blank">极客学院React.js系列课程</a></p></li>
<li><p><a href="http://facebook.github.io/react/index.html" rel="nofollow noreferrer" target="_blank">React.js官方文档</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.js学习笔记之事件系统

## 原文链接
[https://segmentfault.com/a/1190000004642694](https://segmentfault.com/a/1190000004642694)

