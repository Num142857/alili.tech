---
title: 'React深度编程：受控组件与非受控组件' 
date: 2018-12-21 2:30:11
hidden: true
slug: 4vjt2x2eqyq
categories: [reprint]
---

{{< raw >}}

                    
<p>受控组件与非受控组件在官网与国内网上的资料都不多，有些人觉得它可有可不有，也不在意。这恰恰显示React的威力，满足不同规模大小的工程需求。譬如你只是做ListView这样简单的数据显示，将数据拍出来，那么for循坏与<code>{}</code>就足够了，但后台系统存在大量报表，不同的表单联动，缺了受控组件真的不行。</p>
<p>受控组件与非受控组件是React处理表单的入口。从React的思路来讲，作者肯定让数据控制一切，或者简单的理解为，页面的生成与更新得忠实地执行JSX的指令。</p>
<p>但是表单元素有其特殊之处，用户可以通过键盘输入与鼠标选择，改变界面的显示。界面的改变也意味着有一些数据被改动，比较明显的是input的<strong>value</strong>，textarea的<strong>innerHTML</strong>，radio/checkbox的<strong>checked</strong>，不太明显的是option的<strong>selected</strong>与<strong>selectedIndex</strong>，这两个是被动修改的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input value={this.state.value} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jsx" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> value={this<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.value</span>} /&gt;</code></pre>
<p>当input.value是由组件的state.value拍出来的，当用户进行输入修改后，然后JSX再次重刷视图，这时input.value是采取用户的新值还是state的新值？基于这个分歧，React给出一个折衷的方案，两者都支持，于是就产生了今天的主题了。</p>
<p>React认为value/checked不能单独存在，需要与onInput/onChange/disabed/readOnly等控制value/checked的属性或事件一起使用。 它们共同构成<strong>受控组件</strong>，受控是受JSX的控制。如果用户没有写这些额外的属性与事件，那么框架内部会给它添加一些事件，如onClick, onInput, onChange，阻止你进行输入或选择，让你无法修改它的值。在框架内部，有一个顽固的变量，我称之为 persistValue，它一直保持JSX上次赋给它的值，只能让内部事件修改它。</p>
<p>因此我们可以断言，受控组件是可通过<strong>事件</strong>完成的对value的控制。</p>
<p>在受控组件中，persistValue总能被刷新。</p>
<p>我们再看非受控组件，既然value/checked已经被占用了，React启用了HTML中另一组被忽略的属性defaultValue/defaultChecked。一般认为它们是与value/checked相通的，即，value不存在的情况下，defaultValue的值就当作是value。</p>
<p>上面我们已经说过，表单元素的显示情况是由内部的 persistValue 控制的，因此defaultXXX也会同步persistValue，然后再由persistValue同步DOM。但非受控组件的出发点是忠实于用户操作，如果用户在代码中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input.value = &quot;xxxx&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">input.value = <span class="hljs-string">"xxxx"</span></code></pre>
<p>以后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input defaultValue={this.state.value} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jsx" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> defaultValue={this<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.value</span>} /&gt;</code></pre>
<p>就再不生效，一直是xxxx。</p>
<p>它怎么做到这一点，怎么辨识这个修改是来自框架内部或外部呢？我翻看了一下React的源码，原来它有一个叫valueTracker的东西跟踪用户的输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tracker = {
    getValue: function () {
      return currentValue;
    },
    setValue: function (value) {
      currentValue = '' + value;
    },
    stopTracking: function () {
      detachTracker(node);
      delete node[valueField];
    }
  };
  return tracker;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tracker = {
    <span class="hljs-attr">getValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> currentValue;
    },
    <span class="hljs-attr">setValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
      currentValue = <span class="hljs-string">''</span> + value;
    },
    <span class="hljs-attr">stopTracking</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      detachTracker(node);
      <span class="hljs-keyword">delete</span> node[valueField];
    }
  };
  <span class="hljs-keyword">return</span> tracker;
}</code></pre>
<p>这个东西又是通过Object.defineProperty打进元素的value/checked的内部，因此就知晓用户对它的取值赋值操作。</p>
<p>但value/checked还是两个很核心的属性，涉及到太多内部机制（比如说value与oninput, onchange, 输入法事件oncompositionstart,<br>compositionchange, oncompositionend, onpaste, oncut），为了平缓地修改value/checked，<br>还要用到<code>Object.getOwnPropertyDescriptor</code>。如果我要兼容IE8，没有这么高级的玩艺儿。我采取另一种更安全的方式，<br>只用Object.defineProperty修改<code>defaultValue/defaultChecked</code>。</p>
<p>首先我为元素添加一个<code>_uncontrolled</code>的属性，用来表示我已经劫持过defaultXXX。 然后描述对象 （<code>Object.defineProperty的第三个参数</code>）的set方法里面再添加一个开关，<code>_observing</code>。在框架内部更新视图，此值为false,更新完，它置为true。</p>
<p>这样就知晓 input.defaultValue = "xxx"时，这是由用户还是框架修改的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f (!dom._uncontrolled) {
    dom._uncontrolled = true;
    inputMonitor.observe(dom, name); //重写defaultXXX的setter/getter
}
dom._observing = false;//此时是框架在修改视图，因此需要关闭开关
dom[name] = val;
dom._observing = true;//打开开关，来监听用户的修改行为" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">f (!dom._uncontrolled) {
    dom._uncontrolled = <span class="hljs-literal">true</span>;
    inputMonitor.observe(dom, name); <span class="hljs-comment">//重写defaultXXX的setter/getter</span>
}
dom._observing = <span class="hljs-literal">false</span>;<span class="hljs-comment">//此时是框架在修改视图，因此需要关闭开关</span>
dom[name] = val;
dom._observing = <span class="hljs-literal">true</span>;<span class="hljs-comment">//打开开关，来监听用户的修改行为</span></code></pre>
<p>inputMonitor的实现如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export var inputMonitor = {};
var rcheck = /checked|radio/;
var describe = {
    set: function(value) {
        var controllProp = rcheck.test(this.type) ? &quot;checked&quot; : &quot;value&quot;;
        if (this.type === &quot;textarea&quot;) {
            this.innerHTML = value;
        }
        if (!this._observing) {
            if (!this._setValue) {
                //defaultXXX只会同步一次_persistValue
                var parsedValue = (this[controllProp] = value);
                this._persistValue = Array.isArray(value) ? value : parsedValue;
                this._setValue = true;
            }
        } else {
            //如果用户私下改变defaultValue，那么_setValue会被抺掉
            this._setValue = value == null ? false : true;
        }
        this._defaultValue = value;
    },
    get: function() {
        return this._defaultValue;
    },
    configurable: true
};

inputMonitor.observe = function(dom, name) {
    try {
        if (&quot;_persistValue&quot; in dom) {
            dom._setValue = true;
        }
        Object.defineProperty(dom, name, describe);
    } catch (e) {}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> inputMonitor = {};
<span class="hljs-keyword">var</span> rcheck = <span class="hljs-regexp">/checked|radio/</span>;
<span class="hljs-keyword">var</span> describe = {
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">var</span> controllProp = rcheck.test(<span class="hljs-keyword">this</span>.type) ? <span class="hljs-string">"checked"</span> : <span class="hljs-string">"value"</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.type === <span class="hljs-string">"textarea"</span>) {
            <span class="hljs-keyword">this</span>.innerHTML = value;
        }
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._observing) {
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._setValue) {
                <span class="hljs-comment">//defaultXXX只会同步一次_persistValue</span>
                <span class="hljs-keyword">var</span> parsedValue = (<span class="hljs-keyword">this</span>[controllProp] = value);
                <span class="hljs-keyword">this</span>._persistValue = <span class="hljs-built_in">Array</span>.isArray(value) ? value : parsedValue;
                <span class="hljs-keyword">this</span>._setValue = <span class="hljs-literal">true</span>;
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//如果用户私下改变defaultValue，那么_setValue会被抺掉</span>
            <span class="hljs-keyword">this</span>._setValue = value == <span class="hljs-literal">null</span> ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">this</span>._defaultValue = value;
    },
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._defaultValue;
    },
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
};

inputMonitor.observe = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom, name</span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-string">"_persistValue"</span> <span class="hljs-keyword">in</span> dom) {
            dom._setValue = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-built_in">Object</span>.defineProperty(dom, name, describe);
    } <span class="hljs-keyword">catch</span> (e) {}
};</code></pre>
<p>又不小心贴了这么烧脑的代码，这是码农的坏毛病。不过，到这步，大家都明白，无论是官方react还是anu/qreact都是通过Object.defineProperty来控制用户的输入的。</p>
<p>于是我们可以理解以下的代码的行为了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a =  ReactDOM.render(<textarea defaultValue=&quot;foo&quot; />, container);
    ReactDOM.render(<textarea defaultValue=&quot;bar&quot; />, container);
    ReactDOM.render(<textarea defaultValue=&quot;noise&quot; />, container);
    expect(a.defaultValue).toBe(&quot;noise&quot;);
    expect(a.value).toBe(&quot;foo&quot;);
    expect(a.textContent).toBe(&quot;noise&quot;);
    expect(a.innerHTML).toBe(&quot;noise&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code class="jsx">    var a =  ReactDOM.<span class="hljs-keyword">render</span>(&lt;textarea defaultValue=<span class="hljs-string">"foo"</span> /&gt;, <span class="hljs-keyword">container</span>);
    ReactDOM.<span class="hljs-keyword">render</span>(&lt;textarea defaultValue=<span class="hljs-string">"bar"</span> /&gt;, <span class="hljs-keyword">container</span>);
    ReactDOM.<span class="hljs-keyword">render</span>(&lt;textarea defaultValue=<span class="hljs-string">"noise"</span> /&gt;, <span class="hljs-keyword">container</span>);
    expect(a.defaultValue).toBe(<span class="hljs-string">"noise"</span>);
    expect(a.value).toBe(<span class="hljs-string">"foo"</span>);
    expect(a.textContent).toBe(<span class="hljs-string">"noise"</span>);
    expect(a.innerHTML).toBe(<span class="hljs-string">"noise"</span>);</code></pre>
<p>由于用户一直没有手动修改 defaultValue，<code>dom._setValue</code> 一直为<strong>false/undefined</strong>，因此 <code>_persistValue</code> 一直能修改。</p>
<p>另一个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var renderTextarea = function(component, container) {
    if (!container) {
        container = document.createElement(&quot;div&quot;);
    }
    const node = ReactDOM.render(component, container);
    node.defaultValue = node.innerHTML.replace(/^\n/, &quot;&quot;);
    return node;
};

const container = document.createElement(&quot;div&quot;);
//注意这个方法，用户在renderTextarea中手动改变了defaultValue，_setValue就变成true
const node = renderTextarea(<textarea defaultValue=&quot;giraffe&quot; />, container);

expect(node.value).toBe(&quot;giraffe&quot;);

// _setValue后，gorilla就不能同步到_persistValue，因此还是giraffe
renderTextarea(<textarea defaultValue=&quot;gorilla&quot; />, container);
//  expect(node.value).toEqual(&quot;giraffe&quot;);

node.value = &quot;cat&quot;;
// 这个又是什么回事了呢，因此非监控属性是在diffProps中批量处理的，在监控属性，则是在更后的方法中处理
// 检测到node.value !== _persistValue，于是重写 _persistValue = node.value，于是输出cat
renderTextarea(<textarea defaultValue=&quot;monkey&quot; />, container);
expect(node.value).toEqual(&quot;cat&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> renderTextarea = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">component, container</span>) </span>{
    <span class="hljs-keyword">if</span> (!container) {
        container = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
    }
    <span class="hljs-keyword">const</span> node = ReactDOM.render(component, container);
    node.defaultValue = node.innerHTML.replace(<span class="hljs-regexp">/^\n/</span>, <span class="hljs-string">""</span>);
    <span class="hljs-keyword">return</span> node;
};

<span class="hljs-keyword">const</span> container = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
<span class="hljs-comment">//注意这个方法，用户在renderTextarea中手动改变了defaultValue，_setValue就变成true</span>
<span class="hljs-keyword">const</span> node = renderTextarea(&lt;textarea defaultValue="giraffe" /&gt;, container);

expect(node.value).toBe("giraffe");

// _setValue后，gorilla就不能同步到_persistValue，因此还是giraffe
renderTextarea(&lt;textarea defaultValue="gorilla" /&gt;, container);
//  expect(node.value).toEqual("giraffe");

node.value = "cat";
// 这个又是什么回事了呢，因此非监控属性是在diffProps中批量处理的，在监控属性，则是在更后的方法中处理
// 检测到node.value !== _persistValue，于是重写 _persistValue = node.value，于是输出cat
renderTextarea(&lt;textarea defaultValue="monkey" /&gt;, container);
expect(node.value).toEqual("cat");</code></pre>
<p>当然表单元素也分许多种，每种表单元素也有其默认行为。</p>
<p>纯文本类：text, textarea, JSX的值，总是往字符串转换<br>type="number"的控制，值总是为数字，不填或为“”则转换为“0”<br>radio有联动效果，同一父节点下的相同name的radio控制只能选择一个。<br>select的value/defaultValue支持数组，不做转换，但用户对底下的option元素做增删操作，selected会跟着变动。</p>
<p>此外select还有模糊匹配与精确匹配之分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//精确匹配
var dom = ReactDOM.render(
    <select value={222}>
        <option value={111}>aaa</option>
        <option value={&quot;222&quot;}>xxx</option>
        <option value={222}>bbb</option>
        <option value={333}>ccc</option>
    </select>,
    container
);
expect(dom.options[2].selected).toBe(true);//选中第三个" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//精确匹配</span>
<span class="hljs-keyword">var</span> dom = ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{222}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{111}</span>&gt;</span>aaa<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">222</span>"}&gt;</span>xxx<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{222}</span>&gt;</span>bbb<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{333}</span>&gt;</span>ccc<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>,
    container
);
expect(dom.options[<span class="hljs-number">2</span>].selected).toBe(<span class="hljs-literal">true</span>);<span class="hljs-comment">//选中第三个</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//模糊匹配
var dom = ReactDOM.render(
    <select value={222}>
        <option value={111}>aaa</option>
        <option value={&quot;222&quot;}>xxx</option>
        <option value={333}>ccc</option>
    </select>,
    container
);
expect(dom.options[2].selected).toBe(true);//选中第二个" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//模糊匹配</span>
<span class="hljs-keyword">var</span> dom = ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{222}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{111}</span>&gt;</span>aaa<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">222</span>"}&gt;</span>xxx<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{333}</span>&gt;</span>ccc<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>,
    container
);
expect(dom.options[<span class="hljs-number">2</span>].selected).toBe(<span class="hljs-literal">true</span>);<span class="hljs-comment">//选中第二个</span></code></pre>
<p>凡此种种，React/anu都是做了大量工作，迷你如preact/react-lite之流则可能遇坑。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React深度编程：受控组件与非受控组件

## 原文链接
[https://segmentfault.com/a/1190000012458996](https://segmentfault.com/a/1190000012458996)

