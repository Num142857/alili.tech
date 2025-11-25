---
title: '【译】React 组件的生命周期' 
date: 2019-02-04 2:30:58
hidden: true
slug: qjpub8ochad
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p><strong>原文：<a href="https://medium.com/react-ecosystem/react-components-lifecycle-ce09239010df#.j7h6w8ccc" rel="nofollow noreferrer" target="_blank">https://medium.com/react-ecosystem/react-components-lifecycle-ce09239010df#.j7h6w8ccc</a></strong></p>
<p>译者序：React组件生命周期有很多文章介绍了，这篇作者列出了很多开发中可能不会注意的细节，比如哪些阶段执行setState是否会导致render等，对React组件性能优化有一定的帮助，故译之，不当之处敬请指正！</p>
</blockquote>
<p>github issue: <a href="https://github.com/chemdemo/chemdemo.github.io/issues/14" rel="nofollow noreferrer" target="_blank">https://github.com/chemdemo/c...</a></p>
<h2 id="articleHeader0">一段探索React自建内部构造的旅程</h2>
<p>在先前的文章里我们涵盖了<a href="https://medium.com/react-ecosystem/react-a-gentle-introduction-407fb59d3514#.su1qzoxp7" rel="nofollow noreferrer" target="_blank">React基本原理</a>和<a href="https://medium.com/react-ecosystem/components-the-war-horses-of-react-1085dddc14e5#.qnz8wjnq2" rel="nofollow noreferrer" target="_blank">如何构建更加复杂的交互组件</a>。此篇文章我们将会继续探索React组件的特性，特别是生命周期。</p>
<p>稍微思考一下React组件所做的事，首先想到的是一点是：React描述了如何去渲染（DOM）。我们已经知道React使用<code>render()</code>方法来达到这个目的。然而仅有<code>render()</code>方法可能不一定都能满足我们的需求。如果在组件rendered之前或之后我们需要做些额外的事情该怎么做呢？我们需要做些什么以避免重复渲染(re-render)呢？</p>
<p>看起来我们需要对组件（运行）的各个阶段进行控制，组件运行所有涉及的各个阶段叫做<strong>组件的生命周期</strong>，并且每一个React组件都会经历这些阶段。React提供了一些方法并在组件处于相应的阶段时通知我们。这些方法叫做React<strong>组件的生命周期方法</strong>且会根据特定并可预测的顺序被调用。</p>
<p>基本上所有的React组件的生命周期方法都可以被分割成四个阶段：<strong>初始化</strong>、<strong>挂载阶段（mounting）</strong>、<strong>更新阶段</strong>、<strong>卸载阶段（unmounting）</strong>。让我们来近距离分别研究下各个阶段。</p>
<h2 id="articleHeader1">初始化阶段</h2>
<p>初始化阶段就是我们分别通过<code>getDefaultProps()</code>和<code>getInitialState()</code>方法定义<code>this.props</code>默认值和<code>this.state</code>初始值的阶段。</p>
<p><code>getDefaultProps()</code>方法被<strong>调用一次并缓存</strong>起来——在多个类实例之间共享。在组件的任何实例被创建之前，我们（的代码逻辑）不能依赖这里的<code>this.props</code>。这个方法返回一个对象并且属性如果没有通过父组件传入的话相应的属性会挂载到<code>this.props</code>对象上。</p>
<p><code>getInitialState()</code>方法也只会被调用一次，（调用时机）刚好是<strong>mounting阶段开始之前</strong>。返回值将会被当成<code>this.state</code>的初始值，且必须是一个对象。</p>
<p>现在我们来证明上面的猜想，实现一个显示的值可以被增加和减少的组件，基本上就是一个拥有“+”和“-”按钮的计数器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Counter = React.createClass({
    getDefaultProps: function() {
        console.log('getDefaultProps');
        return {
            title: 'Basic counter!!!'
        }
    },

    getInitialState: function() {
        console.log('getInitialState');
        return {
            count: 0
        }
    },

    render: function() {
        console.log('render');
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>{this.state.count}</div>
                <input type='button' value='+' onClick={this.handleIncrement} />
                <input type='button' value='-' onClick={this.handleDecrement} />
            </div>
        );
    },

    handleIncrement: function() {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
    },

    handleDecrement: function() {
        var newCount = this.state.count - 1;
        this.setState({count: newCount});
    },

    propTypes: {
        title: React.PropTypes.string
    }
});

ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('app-container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Counter = React.createClass({
    <span class="hljs-attr">getDefaultProps</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getDefaultProps'</span>);
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">title</span>: <span class="hljs-string">'Basic counter!!!'</span>
        }
    },

    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getInitialState'</span>);
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
        }
    },

    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'render'</span>);
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;h1&gt;{this.props.title}&lt;/h1&gt;
                &lt;div&gt;{this.state.count}&lt;/div&gt;
                &lt;input type='button' value='+' onClick={this.handleIncrement} /&gt;
                &lt;input type='button' value='-' onClick={this.handleDecrement} /&gt;
            &lt;/div&gt;
        );
    },

    handleIncrement: function() {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
    },

    handleDecrement: function() {
        var newCount = this.state.count - 1;
        this.setState({count: newCount});
    },

    propTypes: {
        title: React.PropTypes.string
    }
});

ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('app-container')
);</code></pre>
<p>我们通过<code>getDefaultProps()</code>方法配置一个“title”属性，如果没有传入则提供一个默认值。然后通过<code>getInitialState()</code>为组件设置一个初始state值“{count: 0}”。如果运行这段代码你将会看到控制台输出如下结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006807634?w=800&amp;h=272" src="https://static.alili.tech/img/remote/1460000006807634?w=800&amp;h=272" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>现在我们想要让Counter组件可以设置<code>this.state.count</code>初始值和增加/减少的步长值，但依然提供一个默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Component = React.createClass({
    getDefaultProps: function() {
        console.log('getDefaultProps');
        return {
            title: &quot;Basic counter!!!&quot;,
            step: 1
        }
    },

    getInitialState: function() {
        console.log('getInitialState');
        return {
            count: (this.props.initialCount || 0)
        };
    },

    render: function() {
        console.log('render');
        var step = this.props.step;

        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>{this.state.count}</div>
                <input type='button' value='+' onClick={this.updateCounter.bind(this, step)} />
                <input type='button' value='-' onClick={this.updateCounter.bind(this, -step)} />
            </div>
        );
    },

    updateCounter: function(value) {
        var newCount = this.state.count + value;
        this.setState({count: newCount});
    },

    propTypes: {
        title: React.PropTypes.string,
        initialCount: React.PropTypes.number,
        step: React.PropTypes.number
    }
});

ReactDOM.render(
    React.createElement(Component, {initialCount: 5, step: 2}),
    document.getElementById('app-container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Component = React.createClass({
    <span class="hljs-attr">getDefaultProps</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getDefaultProps'</span>);
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">title</span>: <span class="hljs-string">"Basic counter!!!"</span>,
            <span class="hljs-attr">step</span>: <span class="hljs-number">1</span>
        }
    },

    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getInitialState'</span>);
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">count</span>: (<span class="hljs-keyword">this</span>.props.initialCount || <span class="hljs-number">0</span>)
        };
    },

    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'render'</span>);
        <span class="hljs-keyword">var</span> step = <span class="hljs-keyword">this</span>.props.step;

        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;h1&gt;{this.props.title}&lt;/h1&gt;
                &lt;div&gt;{this.state.count}&lt;/div&gt;
                &lt;input type='button' value='+' onClick={this.updateCounter.bind(this, step)} /&gt;
                &lt;input type='button' value='-' onClick={this.updateCounter.bind(this, -step)} /&gt;
            &lt;/div&gt;
        );
    },

    updateCounter: function(value) {
        var newCount = this.state.count + value;
        this.setState({count: newCount});
    },

    propTypes: {
        title: React.PropTypes.string,
        initialCount: React.PropTypes.number,
        step: React.PropTypes.number
    }
});

ReactDOM.render(
    React.createElement(Component, {initialCount: 5, step: 2}),
    document.getElementById('app-container')
);</code></pre>
<blockquote><p>这里通过<a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/bind" rel="nofollow noreferrer" target="_blank">Function.prototype.bind</a>使用<a href="https://en.wikipedia.org/wiki/Partial_application" rel="nofollow noreferrer" target="_blank">偏函数应用(Partial Application)</a>来达到复用代码的目的。</p></blockquote>
<p>现在我们拥有了一个可定制化的组件。</p>
<h2 id="articleHeader2">增长（Mounting）阶段</h2>
<p>Mounting阶段发生在组件即将被插入到DOM之前。这个阶段有两个方法可以用：<code>componentWillMount()</code>和<code>componentDidMount()</code>。</p>
<p><code>componentWillMount()</code>方法是这个阶段最先调用的，它只在<strong>刚好初始渲染（initial rendering）发生之前</strong>被调用<strong>一次</strong>，也就是React在DOM插入组件之前。需要注意的是在此处<strong>调用<code>this.setState()</code>方法将不会触发重复渲染（re-render）</strong>。如果添加下面的代码到计数器组件我们将会看到此方法在<code>getInitialState()</code>之后且<code>render()</code>之前被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getInitialState: function() {...},
componentWillMount: function() {
    console.log('componentWillMount');
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getInitialState: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{...},
<span class="hljs-attr">componentWillMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'componentWillMount'</span>);
},</code></pre>
<p><code>componentDidMount()</code>是这个阶段第二个被调用的方法，刚好发生在<strong>React插入组件到DOM之后</strong>，且也只被调用<strong>一次</strong>。现在可以更新DOM元素了，这意味着这个方法是初始化其他需要访问DOM或操作数据的第三方库的最佳时机。</p>
<p>假设我们想要通过API拉取数据来初始化组件。我们应该直接在计数器组件的<code>componentDidMount()</code>方法拉取数据，但是这让组件看起来有太多逻辑了，更可取的方案是使用<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.pqy4fd1c5" rel="nofollow noreferrer" target="_blank">容器组件</a>来做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Container = React.createClass({
    getInitialState: function() {
        return {
            data: null,
            fetching: false,
            error: null
        };
    },

    render: function() {
        if (this.props.fetching) {
            return <div>Loading...</div>;
        }

        if (this.props.error) {
            return (
                <div className='error'>
                    {this.state.error.message}
                </div>
            );
        }

        return <Counter {...data} />
    },

    componentDidMount: function() {
        this.setState({fetching: true});

        Axios.get(this.props.url).then(function(res) {
            this.setState({data: res.data, fetching: false});
        }).catch(function(res) {
            this.setState({error: res.data, fetching: false});
        });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Container = React.createClass({
    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
            <span class="hljs-attr">fetching</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>
        };
    },

    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.fetching) {
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
        }

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.error) {
            <span class="hljs-keyword">return</span> (
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'error'</span>&gt;</span>
                    {this.state.error.message}
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            );
        }

        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> {<span class="hljs-attr">...data</span>} /&gt;</span>
    },

    componentDidMount: function() {
        this.setState({fetching: true});

        Axios.get(this.props.url).then(function(res) {
            this.setState({data: res.data, fetching: false});
        }).catch(function(res) {
            this.setState({error: res.data, fetching: false});
        });
    }
});</span></code></pre>
<blockquote><p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">Axios</a>是一个基于priomise的跨浏览器和Node.js的HTTP客户端。</p></blockquote>
<h2 id="articleHeader3">　更新阶段</h2>
<p><strong>当组件的属性或者状态更新时</strong>也需要一些方法来供我们执行代码，这些方法也是组件更新阶段的一部分且按照以下的顺序被调用：</p>
<p>1、当从父组件接收到新的属性时：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006807652?w=505&amp;h=533" src="https://static.alili.tech/img/remote/1460000006807652?w=505&amp;h=533" alt="props updated" title="props updated" style="cursor: pointer;"></span></p>
<p>2、当通过<code>this.setState()</code>改变状态时：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006807653?w=515&amp;h=477" src="https://static.alili.tech/img/remote/1460000006807653?w=515&amp;h=477" alt="state updated" title="state updated" style="cursor: pointer;"></span></p>
<p>此阶段React组件已经被插入DOM了，因此这些方法将不会在首次render时被调用。</p>
<p>最先被调用的方法是<code>componentWillReceiveProps()</code>，当组件接收到新属性时被调用。我们可以利用此方法为React组件提供一个在render之前修改state的机会。<strong>在此方法内调用<code>this.setState()</code>将不会导致重复render</strong>，然后可以通过<code>this.props</code>访问旧的属性。例如计数器组件，如果我们想要在任何时候父组件传入“initialCount”时更新状态，可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
componentWillReceiveProps: function(newProps) {
    this.setState({count: newProps.initialCount});
},
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
componentWillReceiveProps: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newProps</span>) </span>{
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">count</span>: newProps.initialCount});
},
...</code></pre>
<p><code>shouldComponentUpdate()</code>方法允许我们自行决定下一个state更新时是否触发重复render。此方法返回一个布尔值，且默认是true。但是我们也可以返回false，这样下面的（生命周期）方法将不会被调用：</p>
<ul>
<li><p>componentWillUpdate()</p></li>
<li><p>render()</p></li>
<li><p>componentDidUpdate()</p></li>
</ul>
<p>当有性能瓶颈时也可以使用<code>shouldComponentUpdate()</code>方法（来优化）。尤其是数百个组件一起时重新render的代价将会十分昂贵。为了证明这个猜想我们来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var TextComponent = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        if (this.props.text === nextProps.text) return false;
        return true;
    },

    render: function() {
        return <textarea value={this.props.text} />;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> TextComponent = React.createClass({
    <span class="hljs-attr">shouldComponentUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.text === nextProps.text) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    },

    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.props.text}</span> /&gt;</span>;
    }
});</span></code></pre>
<p>此例中无论何时父组件传入一个“text”属性到<code>TextComponent</code>并且text属性等于当前的“text”属性时，组件将会不会重复render。</p>
<p>当接收到新的属性或者state时在render之前会立刻调用<code>componentWillUpdate()</code>方法。可以利用此时机来为更新做一些准备工作，虽然这个阶段不能调用<code>this.setState()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
componentWillUpdate: function(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
},
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
componentWillUpdate: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'componentWillUpdate'</span>, nextProps, nextState);
},
...</code></pre>
<p><code>componentDidUpdate()</code>方法在React更新DOM之后立刻被调用。可以在此方法里操作被更新过的DOM或者执行一些后置动作（action）。此方法有两个参数：</p>
<ol>
<li><p>prevProps：旧的属性</p></li>
<li><p>prevState：旧的state</p></li>
</ol>
<p>这个方法的一个常见使用场景是当我们使用需要操作更新后的DOM才能工作的第三方库——如jQuery插件的时候。在<code>componentDidMount()</code>方法内初始化第三方库，但是在属性或state更新触发DOM更新之后也需要同步更新第三方库来保持接口一致，这些必须在<code>componentDidUpdate()</code>方法内来完成。为了验证这一点，让我们看看如何开发一个<a href="https://select2.github.io/" rel="nofollow noreferrer" target="_blank">Select2库</a>包裹（wrapper）React组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Select2 = React.createClass({
    componentDidMount: function() {
        $(this._ref).select2({data: this.props.items});
    },

    render: function() {
        return (
            <select
                ref={
                    function(input) {
                        this._ref = input;
                    }.bind(this)
                }>
            </select>
        );
    },

    componentDidUpdate: function() {
        $(this._ref).select2('destroy');
        $(this._ref).select2({data: this.props.items});
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Select2 = React.createClass({
    <span class="hljs-attr">componentDidMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-keyword">this</span>._ref).select2({<span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.props.items});
    },

    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>
                <span class="hljs-attr">ref</span>=<span class="hljs-string">{</span>
                    <span class="hljs-attr">function</span>(<span class="hljs-attr">input</span>) {
                        <span class="hljs-attr">this._ref</span> = <span class="hljs-string">input;</span>
                    }<span class="hljs-attr">.bind</span>(<span class="hljs-attr">this</span>)
                }&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>
        );
    },

    <span class="hljs-attr">componentDidUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-keyword">this</span>._ref).select2(<span class="hljs-string">'destroy'</span>);
        $(<span class="hljs-keyword">this</span>._ref).select2({<span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.props.items});
    }
});</code></pre>
<h2 id="articleHeader4">卸载阶段（unmounting）</h2>
<p>此阶段React只提供了一个方法：</p>
<ul><li><p>componentWillUnmount()</p></li></ul>
<p>它将在组件从DOM卸载之前被调用。可以在内部执行任何可能需要的清理工作，如无效的计数器或者清理一些在<code>componentDidMount()</code>/<code>componentDidUpdate()</code>内创建的DOM。比如在Select2组件里边我们可以这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
componetWillUnmount: function(){
   $(this._ref).select2('destroy');
},
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">...
componetWillUnmount: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   $(<span class="hljs-keyword">this</span>._ref).select2(<span class="hljs-string">'destroy'</span>);
},
...</code></pre>
<h2 id="articleHeader5">概述</h2>
<p>React为我们提供了一种在创建组件时申明一些将会在组件生命周期的特定时机被自动调用的方法的可能。现在我们很清晰的理解了每一个组件生命周期方法所扮演的角色以及他们被调用的顺序。这使我们有机会在组件创建和销毁时执行一些操作。也允许我们在当属性和状态变化时做出相应的反应从而更容易的整合第三方库和追踪性能问题。</p>
<p>希望您觉得此文对您有用，如果是这样，请推荐之！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】React 组件的生命周期

## 原文链接
[https://segmentfault.com/a/1190000006807631](https://segmentfault.com/a/1190000006807631)

