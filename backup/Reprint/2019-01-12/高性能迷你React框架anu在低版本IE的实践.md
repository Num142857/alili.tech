---
title: '高性能迷你React框架anu在低版本IE的实践' 
date: 2019-01-12 2:30:25
hidden: true
slug: frphvyavaa
categories: [reprint]
---

{{< raw >}}

                    
<p>理想是丰满的，现实是骨感的，react早期的版本虽然号称支持IE8，但是页面总会不自觉切换到奇异模式下，导致报错。因此必须让react连IE6，7都支持，这才是最安全。但React本身并不支持IE6，7，因此anu使有用武之地了。</p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p>但光是anu不行，兼容IE是一个系统性的工程，涉及到打包压缩，各种polyfill垫片。</p>
<p>首先说一下anu如何支持低版本浏览器。anu本身没有用到太高级的API，像Object.defineProperty, Object.seal, Object.freeze, Proxy, WeakMap等无法 模拟的新API，anu一个也没有用，而const, let, 箭头函数，es6模块，通过babel编译就可以搞定了。</p>
<p>而框架用到的一些es5,es6方法，我已经提供了一个叫polyfill的文件为大家准备好，大家也可以使用bable.polyfill实现兼容。</p>
<ol>
<li><p>Array.prototype.forEach</p></li>
<li><p>Function.prototype.bind</p></li>
<li><p>JSON</p></li>
<li><p>window.console</p></li>
<li><p>Object.keys</p></li>
<li><p>Object.is</p></li>
<li><p>Object.assign</p></li>
<li><p>Array.isArray</p></li>
</ol>
<p><a href="https://github.com/RubyLouvre/anu/blob/master/dist/polyfill.js" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p>剩下就是<strong>事件系统</strong>的兼容。React为了实现一个全能的事件系统，3万行的react-dom，有一半是在搞事件的。事件系统之所以这么难写，是因为React要实现整个标准事件流，从捕获阶段到target阶段再到冒泡阶段。如果能获取事件源对象到document这一路经过的所有元素，就能实现事件流了。但是在IE下，只有冒泡阶段，并且许多重要的表单事件不支持冒泡到document。为了事件冒泡，自jQuery时代起，前端高手们已经摸索出一套方案了。使用另一个相似的事件来伪装不冒泡事件，冒泡到document后，然后变成原来的事件触发对应的事件。</p>
<p>比如说IE下，使用focusin冒充focus, focusout冒充blur。chrome下，则通过addEventListener的第三个参加为true，强制让focus, blur被document捕获到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Ie6-9
if(msie < 9){
  eventHooks.onFocus = function(dom) {
    addEvent(dom, &quot;focusin&quot;, function(e) {
      addEvent.fire(dom, &quot;focus&quot;);
    });
  };
  eventHooks.onBlur = function(dom) {
    addEvent(dom, &quot;blurout&quot;, function(e) {
      addEvent.fire(dom, &quot;blur&quot;);
    });
  };
}else{
eventHooks.onFocus = function(dom) {
  addEvent(
    dom,
    &quot;focus&quot;,
    function(e) {
      addEvent.fire(dom, &quot;focus&quot;);
    },
    true
  );
};
eventHooks.onBlur = function(dom) {
  addEvent(
    dom,
    &quot;blur&quot;,
    function(e) {
      addEvent.fire(dom, &quot;blur&quot;);
    },
    true
  );
};
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//Ie6-9</span>
<span class="hljs-keyword">if</span>(msie &lt; <span class="hljs-number">9</span>){
  eventHooks.onFocus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>) </span>{
    addEvent(dom, <span class="hljs-string">"focusin"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
      addEvent.fire(dom, <span class="hljs-string">"focus"</span>);
    });
  };
  eventHooks.onBlur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>) </span>{
    addEvent(dom, <span class="hljs-string">"blurout"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
      addEvent.fire(dom, <span class="hljs-string">"blur"</span>);
    });
  };
}<span class="hljs-keyword">else</span>{
eventHooks.onFocus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>) </span>{
  addEvent(
    dom,
    <span class="hljs-string">"focus"</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
      addEvent.fire(dom, <span class="hljs-string">"focus"</span>);
    },
    <span class="hljs-literal">true</span>
  );
};
eventHooks.onBlur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>) </span>{
  addEvent(
    dom,
    <span class="hljs-string">"blur"</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
      addEvent.fire(dom, <span class="hljs-string">"blur"</span>);
    },
    <span class="hljs-literal">true</span>
  );
};
}
</code></pre>
<p>低版本的oninput， onchange事件是一个麻烦，它们最多冒泡到form元素上。并且IE也没有oninput，只有一个相似的onpropertychange事件。IE9,IE10的oninput其实也有许多BUG，但大家要求放低些，我们也不用理会IE9,IE10的oninput事件。IE6－8的oninput事件，我们是直接在元素上绑定onpropertychange事件，然后触发一个datasetchanged 事件冒泡到document上，并且这个datasetchanged事件对象带有一个__type__属性，用来说明它原先冒充的事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fixIEInput(dom, name) {
  addEvent(dom, &quot;propertychange&quot;, function(e) {
    if (e.propertyName === &quot;value&quot;) {
      addEvent.fire(dom, &quot;input&quot;);
    }
  });
}

addEvent.fire = function dispatchIEEvent(dom, type, obj) {
    try {
      var hackEvent = document.createEventObject();
      if (obj) {
        Object.assign(hackEvent, obj);
      }
      hackEvent.__type__ = type;
      //IE6-8触发事件必须保证在DOM树中,否则报&quot;SCRIPT16389: 未指明的错误&quot;
      dom.fireEvent(&quot;ondatasetchanged&quot;, hackEvent);
    } catch (e) {}
  };


function dispatchEvent(e) {//document上绑定的事件派发器
  var __type__ = e.__type__ || e.type;
  e = new SyntheticEvent(e);
  var target = e.target;
  var paths = [];//获取整个冒泡的路径
  do {
    var events = target.__events;
    if (events) {
      paths.push({ dom: target, props: events });
    }
  } while ((target = target.parentNode) &amp;&amp; target.nodeType === 1);
  // ...略
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fixIEInput</span>(<span class="hljs-params">dom, name</span>) </span>{
  addEvent(dom, <span class="hljs-string">"propertychange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (e.propertyName === <span class="hljs-string">"value"</span>) {
      addEvent.fire(dom, <span class="hljs-string">"input"</span>);
    }
  });
}

addEvent.fire = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchIEEvent</span>(<span class="hljs-params">dom, type, obj</span>) </span>{
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">var</span> hackEvent = <span class="hljs-built_in">document</span>.createEventObject();
      <span class="hljs-keyword">if</span> (obj) {
        <span class="hljs-built_in">Object</span>.assign(hackEvent, obj);
      }
      hackEvent.__type__ = type;
      <span class="hljs-comment">//IE6-8触发事件必须保证在DOM树中,否则报"SCRIPT16389: 未指明的错误"</span>
      dom.fireEvent(<span class="hljs-string">"ondatasetchanged"</span>, hackEvent);
    } <span class="hljs-keyword">catch</span> (e) {}
  };


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchEvent</span>(<span class="hljs-params">e</span>) </span>{<span class="hljs-comment">//document上绑定的事件派发器</span>
  <span class="hljs-keyword">var</span> __type__ = e.__type__ || e.type;
  e = <span class="hljs-keyword">new</span> SyntheticEvent(e);
  <span class="hljs-keyword">var</span> target = e.target;
  <span class="hljs-keyword">var</span> paths = [];<span class="hljs-comment">//获取整个冒泡的路径</span>
  <span class="hljs-keyword">do</span> {
    <span class="hljs-keyword">var</span> events = target.__events;
    <span class="hljs-keyword">if</span> (events) {
      paths.push({ <span class="hljs-attr">dom</span>: target, <span class="hljs-attr">props</span>: events });
    }
  } <span class="hljs-keyword">while</span> ((target = target.parentNode) &amp;&amp; target.nodeType === <span class="hljs-number">1</span>);
  <span class="hljs-comment">// ...略</span>
}
</code></pre>
<p>addEvent.fire这个方法在不同浏览器的实现是不一样的，这里显示的IE6－8的版本，IE9及标准浏览器是使用document.createEvent,  initEvent, dispatchEvent等API来创建事件对象与触发事件。在IE6－8中，则需要用document.createEventObject创建事件对象，fireEvent来触发事件。</p>
<p>ondatasetchanged事件是IE一个非常偏门的事件，因为IE的 fireEvent只能触发它官网上列举的几十个事件，不能触发自定义事件。而ondatasetchanged事件在IE9，chrome, firefox等浏览器中是当成一个自定义事件来对待，但那时它是使用elem.dispatchEvent来触发了。ondatasetchanged是一个能冒泡的事件，只是充作<strong>信使</strong>，将我们要修改的属性带到document上。</p>
<p>此是其一，onchange事件也要通过ondatasetchanged也冒充，因为IE下它也不能冒泡到document。onchange事件在IE还是有许多BUG（或叫差异点）。checkbox, radio的onchange事件必须在失去焦点时才触发，因此我们在内部用onclick来触发，而select元素在单选时候下，用户选中了某个option, select.value会变成option的value值，但在IE6－8下它竟然不会发生改变。最绝的是select元素也不让你修改value值，后来我奠出修改HTMLSelectElement原型链的大招搞定它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  try {
    Object.defineProperty(HTMLSelectElement.prototype, &quot;value&quot;, {
      set: function(v) {
        this._fixIEValue = v;
      },
      get: function() {
        return this._fixIEValue;
      }
    });
  } catch (e) {}

function fixIEChange(dom, name) {
  //IE6-8, radio, checkbox的点击事件必须在失去焦点时才触发
  var eventType = dom.type === &quot;radio&quot; || dom.type === &quot;checkbox&quot;
    ? &quot;click&quot;
    : &quot;change&quot;;
  addEvent(dom, eventType, function(e) {
    if (dom.type === &quot;select-one&quot;) {
      var idx = dom.selectedIndex,
        option,
        attr;
      if (idx > -1) {
        //IE 下select.value不会改变
        option = dom.options[idx];
        attr = option.attributes.value;
        dom.value = attr &amp;&amp; attr.specified ? option.value : option.text;
      }
    }
    addEvent.fire(dom, &quot;change&quot;);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-keyword">try</span> {
    Object.defineProperty(HTMLSelectElement.prototype, <span class="hljs-string">"value"</span>, {
      <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(v)</span> </span>{
        <span class="hljs-keyword">this</span>._fixIEValue = v;
      },
      <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._fixIEValue;
      }
    });
  } <span class="hljs-keyword">catch</span> (e) {}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fixIEChange</span><span class="hljs-params">(dom, name)</span> </span>{
  <span class="hljs-comment">//IE6-8, radio, checkbox的点击事件必须在失去焦点时才触发</span>
  <span class="hljs-keyword">var</span> eventType = dom.type === <span class="hljs-string">"radio"</span> || dom.type === <span class="hljs-string">"checkbox"</span>
    ? <span class="hljs-string">"click"</span>
    : <span class="hljs-string">"change"</span>;
  addEvent(dom, eventType, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">if</span> (dom.type === <span class="hljs-string">"select-one"</span>) {
      <span class="hljs-keyword">var</span> idx = dom.selectedIndex,
        option,
        attr;
      <span class="hljs-keyword">if</span> (idx &gt; <span class="hljs-number">-1</span>) {
        <span class="hljs-comment">//IE 下select.value不会改变</span>
        option = dom.options[idx];
        attr = option.attributes.value;
        dom.value = attr &amp;&amp; attr.specified ? option.value : option.text;
      }
    }
    addEvent.fire(dom, <span class="hljs-string">"change"</span>);
  });
}</code></pre>
<p>此外，滚动事件的兼容性也非常多，但在React官网中，统一大家用onWheel接口来调用，在内部实现则需要我们根据浏览器分别用onmousewheel, onwheel, DOMMouseScroll来模拟了。</p>
<p>当然还有很多很多细节，这里就不一一列举了。为了防止像React那样代码膨胀，针对旧版本的事件兼容，我都移到ieEvent.js文件中。然后基于它，打包了一个专门针对旧版本IE的ReactIE</p>
<p><a href="https://github.com/RubyLouvre/anu/tree/master/dist" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p>大家也可以通过npm安装，1.0.2就拥有这个文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install anujs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> anujs</code></pre>
<p>下面通过一个示例介绍如何使用ReactIE.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>

    <script src=&quot;./dist/polyfill.js&quot;></script>
    <script src=&quot;./dist/ReactIE.js&quot;></script>
    <script src=&quot;./dist/index9.js&quot;></script>

</head>

<body>

    <div>这个默认会被清掉</div>
    <div id='example'></div>


</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/polyfill.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/ReactIE.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/index9.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这个默认会被清掉<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'example'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>首先建立一个页面，里面有三个JS，其实前两个文件也能单独打包的。</p>
<p>index.js的源码是这样的，业务线开发时是直接上JSX与es6，为了兼容IE6－8，请不要在业务代码上用Object.defineProperty与Proxy</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Select extends React.Component{
     constructor() {
        super()
        this.state = {
            value: 'bbb'
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
       console.log(e.target.value)
       this.setState({
           value: e.target.value
       })
    }
    render() {
        return <div><select  value={this.state.value} onChange={this.onChange}>
            <option value='aaa'>aaa</option>
            <option value='bbb'>bbb</option>
            <option value='ccc'>ccc</option>
        </select><p>{this.state.value}</p></div>
    }
}
class Input extends React.Component{
     constructor() {
        super()
        this.state = {
            value: 'input'
        }
        this.onInput = this.onInput.bind(this)
    }
    onInput(e){
       this.setState({
           value: e.target.value
       })
    }
    render() {
        return <div><input value={this.state.value} onInput={this.onInput} />{this.state.value}</div>
    }
}
class Radio extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        console.log(e.target.value)
       this.setState({
           value: e.target.value
       })
    }
    render() {
        return <span><input type='radio' name={this.props.name} value={this.props.value}  onChange={this.onChange} />{this.state.value+''}</span>
    }
}
class Playground extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: '请上下滚动鼠标滚轮'
        }
        this.onWheel = this.onWheel.bind(this)
    }
    onWheel(e){
       this.setState({
           value: e.wheelDelta
       })
    }
    render() {
        return <div style="{{"width:300,height:300,backgroundColor:'red',display:'inline-block'"}}" onWheel={this.onWheel} >{this.state.value}</div>
    }
}
class MouseMove extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: '请在绿色区域移动'
        }
        this.onMouseMove = this.onMouseMove.bind(this)
    }
    onMouseMove(e){
       var v = e.pageX+' '+e.pageY;
       this.setState({
           value: v
       })
    }
    render() {
        return <div style="{{"width:300,height:300,backgroundColor:'#a9ea00',display:'inline-block'"}}" onMouseMove={this.onMouseMove} >{this.state.value}</div>
    }
}
class FocusEl extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: '点我'
        }
        this.onFocus = this.onFocus.bind(this)
    }
    onFocus(e){
       console.log(e.target.title)
    }
    render() {
        return <input  title={this.props.title} onKeyUp={(e)=>{console.log(e.which)"}}" style="{{"width:100,height:50,backgroundColor:'green',display:'inline-block'"}}" onFocus={this.onFocus} />
    }
}
window.onload = function(){
    window.s = ReactDOM.render( <div><Select /><Input /><Radio name='sex' value=&quot;男&quot; /><Radio name='sex' value='女'/>
    <p><Playground /> <MouseMove /><FocusEl title=&quot;aaa&quot; /><FocusEl title=&quot;bbb&quot; /></p>
    
    </div>, document.getElementById('example'))
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Select</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
     <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>()
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">value</span>: <span class="hljs-string">'bbb'</span>
        }
        <span class="hljs-keyword">this</span>.onChange = <span class="hljs-keyword">this</span>.onChange.bind(<span class="hljs-keyword">this</span>)
    }
    onChange(e){
       <span class="hljs-built_in">console</span>.log(e.target.value)
       <span class="hljs-keyword">this</span>.setState({
           <span class="hljs-attr">value</span>: e.target.value
       })
    }
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">select</span>  <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'aaa'</span>&gt;</span>aaa<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'bbb'</span>&gt;</span>bbb<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'ccc'</span>&gt;</span>ccc<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{this.state.value}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Input</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
     <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>()
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">value</span>: <span class="hljs-string">'input'</span>
        }
        <span class="hljs-keyword">this</span>.onInput = <span class="hljs-keyword">this</span>.onInput.bind(<span class="hljs-keyword">this</span>)
    }
    onInput(e){
       <span class="hljs-keyword">this</span>.setState({
           <span class="hljs-attr">value</span>: e.target.value
       })
    }
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;&lt;input value={this.state.value} onInput={this.onInput} /&gt;{this.state.value}&lt;/div&gt;
    }
}
class Radio extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        console.log(e.target.value)
       this.setState({
           value: e.target.value
       })
    }
    render() {
        return &lt;span&gt;&lt;input type='radio' name={this.props.name} value={this.props.value}  onChange={this.onChange} /&gt;{this.state.value+''}&lt;/span&gt;
    }
}
class Playground extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: '请上下滚动鼠标滚轮'
        }
        this.onWheel = this.onWheel.bind(this)
    }
    onWheel(e){
       this.setState({
           value: e.wheelDelta
       })
    }
    render() {
        return &lt;div style="{{"width:300,height:300,backgroundColor:'red',display:'inline-block'"}}" onWheel={this.onWheel} &gt;{this.state.value}&lt;/div&gt;
    }
}
class MouseMove extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: '请在绿色区域移动'
        }
        this.onMouseMove = this.onMouseMove.bind(this)
    }
    onMouseMove(e){
       var v = e.pageX+' '+e.pageY;
       this.setState({
           value: v
       })
    }
    render() {
        return &lt;div style="{{"width:300,height:300,backgroundColor:'#a9ea00',display:'inline-block'"}}" onMouseMove={this.onMouseMove} &gt;{this.state.value}&lt;/div&gt;
    }
}
class FocusEl extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            value: '点我'
        }
        this.onFocus = this.onFocus.bind(this)
    }
    onFocus(e){
       console.log(e.target.title)
    }
    render() {
        return &lt;input  title={this.props.title} onKeyUp={(e)=&gt;{console.log(e.which)"}}" style="{{"width:100,height:50,backgroundColor:'green',display:'inline-block'"}}" onFocus={this.onFocus} /&gt;
    }
}
window.onload = function(){
    window.s = ReactDOM.render( &lt;div&gt;&lt;Select /&gt;&lt;Input /&gt;&lt;Radio name='sex' value="男" /&gt;&lt;Radio name='sex' value='女'/&gt;
    &lt;p&gt;&lt;Playground /&gt; &lt;MouseMove /&gt;&lt;FocusEl title="aaa" /&gt;&lt;FocusEl title="bbb" /&gt;&lt;/p&gt;
    
    &lt;/div&gt;, document.getElementById('example'))
}
</code></pre>
<p>然后我们建一个webpack.config.js，用的是webpack1</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&quot;webpack&quot;);
const path = require(&quot;path&quot;);
const fs = require(&quot;fs&quot;);
var es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    index9: &quot;./src/index9.js&quot;
  },
  output: {
    path: __dirname + &quot;/dist/&quot;,
    filename: &quot;[name].js&quot;
  },
  plugins: [new es3ifyPlugin()],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: &quot;babel-loader&quot;,
        exclude: path.resolve(__dirname, &quot;node_modules&quot;)
      }
    ]
  },

  resolve: {
    //如果不使用anu，就可以把这里注释掉
    alias: {
      react: &quot;anujs/dist/ReactIE.js&quot;,
      &quot;react-dom&quot;: &quot;anujs/dist/ReactIE.js&quot;
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">var</span> es3ifyPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'es3ify-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: __dirname,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">index9</span>: <span class="hljs-string">"./src/index9.js"</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">"/dist/"</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].js"</span>
  },
  <span class="hljs-attr">plugins</span>: [<span class="hljs-keyword">new</span> es3ifyPlugin()],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel-loader"</span>,
        <span class="hljs-attr">exclude</span>: path.resolve(__dirname, <span class="hljs-string">"node_modules"</span>)
      }
    ]
  },

  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">//如果不使用anu，就可以把这里注释掉</span>
    alias: {
      <span class="hljs-attr">react</span>: <span class="hljs-string">"anujs/dist/ReactIE.js"</span>,
      <span class="hljs-string">"react-dom"</span>: <span class="hljs-string">"anujs/dist/ReactIE.js"</span>
    }
  }
};</code></pre>
<p>es3ify-webpack-plugin是专门将es5代码转换为es3代码，因为es5是允许用关键字，保留字作为对象的方法与属性，而es3不能。万一碰上module.default，我们就坑大了。es3ify是一个利器。</p>
<p>babel是通过.babelrc来配置，里面用到一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
     &quot;presets&quot;: [
         [&quot;es2015&quot;, { &quot;modules&quot;: false }], &quot;react&quot;
     ],
     &quot;plugins&quot;: [
         [
             &quot;transform-es2015-classes&quot;, {
                 &quot;loose&quot;: true
             }
         ]
     ]
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"> {
     <span class="hljs-attr">"presets"</span>: [
         [<span class="hljs-string">"es2015"</span>, { <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span> }], <span class="hljs-string">"react"</span>
     ],
     <span class="hljs-attr">"plugins"</span>: [
         [
             <span class="hljs-string">"transform-es2015-classes"</span>, {
                 <span class="hljs-attr">"loose"</span>: <span class="hljs-literal">true</span>
             }
         ]
     ]
 }</code></pre>
<p>babel-plugin-transform-es2015-classes记使用loose模式。</p>
<p>babel-preset-es2015后面这样设置是禁用生成<strong> "use strict"</strong>,也建议直接换成<strong>babel-preset-avalon</strong>，这是个preset生成的代码兼容性更好。</p>
<p>如果大家用 uglify-js进行代码上线，这也要注意一下，这里有许多坑，它默认会把es3ify干的活全部白做了。详见 <a href="https://github.com/zuojj/fedlab/issues/5" rel="nofollow noreferrer" target="_blank">https://github.com/zuojj/fedl...</a> 这篇文章</p>
<p>最后大家可以通过加Q 79641290 联系我。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高性能迷你React框架anu在低版本IE的实践

## 原文链接
[https://segmentfault.com/a/1190000009751424](https://segmentfault.com/a/1190000009751424)

