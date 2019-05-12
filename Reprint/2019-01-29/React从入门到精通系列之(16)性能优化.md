---
title: 'React从入门到精通系列之(16)性能优化' 
date: 2019-01-29 2:30:10
hidden: true
slug: tjeml12s3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十六、性能优化</h2>
<p>在React内部，React使用了几种比较聪明的技术来实现<code>最小化更新UI所需的昂贵的DOM操作</code>的数量。</p>
<p>对于许多应用来说，使用React将很快速的渲染出用户界面，从而无需进行大量工作来专门做优化性能的工作。</p>
<p>大概有以下有几种方法来加快你的React应用程序。</p>
<h3 id="articleHeader1">使用生产环境的配置进行构建</h3>
<p>如果你在React应用中进行基准测试或这遇到了性能问题，请首先确保你是使用的压缩后线上版本js文件来进行的测试：</p>
<ul>
<li><p>对于<code>Create React App</code>来说，你需要在构建时运行<code>npm run build</code>。</p></li>
<li><p>对于单文件来说，我们提供了生产环境版本<code>.min.js</code>。</p></li>
<li><p>使用的是Browserify，你先设置<code>NODE_ENV=production</code>然后运行。</p></li>
<li><p>使用的是webpack，你需要在生产环境配置中加入以下插件：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
}),
new webpack.optimize.UglifyJSPlugin();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">'process.env'</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
    }
}),
<span class="hljs-keyword">new</span> webpack.optimize.UglifyJSPlugin();</code></pre>
<p>在构建应用程序时开发构建工具可以打印一些有帮助的额外警告。<br>但是由于需要额外地记录这些警告信息，所以它也会变得更慢。</p>
<h3 id="articleHeader2">避免重复处理DOM</h3>
<p>React会创建并维护所渲染的UI内部表示信息。其中包括从组件返回的React元素。 此表示信息使React避免创建DOM节点和访问那些没有必要的节点，因为这样做可能会比JavaScript对象上的一些操作更慢。 有时它被称为<code>“虚拟DOM”</code>。</p>
<p>当组件的<code>props</code>或<code>state</code>更改时，React通过将最新返回的元素与先前渲染的元素进行比较来决定是否需要实际的DOM更新。 当它们不相等时，React将更新DOM。</p>
<p>在某些情况下，您的组件可以通过重写生命周期函数<code>shouldComponentUpdate</code>来加快所有这些操作。这个函数会在重新渲染之前触发。 此函数的默认实现返回<code>true</code>，让React执行更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate(nextProps, nextState) {
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">shouldComponentUpdate(nextProps, nextState) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>如果你知道在某些情况下你的组件不需要更新，你可以从<code>shouldComponentUpdate</code>中返回<code>false</code>，而不是跳过整个渲染过程，其中包括调用当前组件和下面的<code>render()</code>。</p>
<h3 id="articleHeader3">shouldComponentUpdate的应用</h3>
<p>这里是一个组件的子树。 对于其中每一个子树来说，<code>SCU</code>指示<code>shouldComponentUpdate</code>返回什么，<code>vDOMEq</code>指示渲染的React元素是否相等。 最后，圆圈的颜色表示组件是否必须重新处理。</p>
<p><span class="img-wrap"><img data-src="/img/bVGXZA?w=977&amp;h=692" src="https://static.alili.tech/img/bVGXZA?w=977&amp;h=692" alt="虚拟DOM比较" title="虚拟DOM比较" style="cursor: pointer; display: inline;"></span></p>
<p>因为<code>shouldComponentUpdate</code>对于以<code>C2</code>为根的子树返回了<code>false</code>，所以React没有尝试渲染<code>C2</code>，因此甚至不必在<code>C4</code>和<code>C5</code>上调用<code>shouldComponentUpdate</code>。</p>
<p>对于<code>C1</code>和<code>C3</code>，<code>shouldComponentUpdate</code>返回true，因此React必须下到子树中并检查它们。 对于<code>C6 </code> 子树<code>shouldComponentUpdate</code>返回<code>true</code>，并且因为渲染的元素不是相同的，React不得不更新DOM。</p>
<p>最后一个有趣的例子是<code>C8</code>。 React不得不渲染这个组件，不过由于React元素返回的元素等于之前渲染的元素，所以它不必更新DOM。</p>
<p>注意，React只需要做<code>C6</code>的DOM重新处理，这是不可避免的。<br>对于<code>C8</code>，它通过比较渲染的React元素来决定是否重新处理DOM。至于<code>C2</code>的子树和<code>C7</code>，我们在<code>shouldComponentUpdate</code>返回<code>false</code>时它甚至都不需要比较元素，并且也没有调用<code>render()</code>。</p>
<h3 id="articleHeader4">例子</h3>
<p>如果你的组件的唯一的改变方式就是改变<code>props.color</code>或<code>state.count</code>，你可以用<code>shouldComponentUpdate</code>检查：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

class CounterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 1};
        this.click = this.click.bind(this);
    }

    click() {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        return this.state.count !== nextState.count;
    }

    render() {
        return (
            <button color={this.props.color} onClick={this.click}>
                Count：{this.state.count}
            </button>
        );
    }
}
ReactDOM.render(
    <CounterButton color=&quot;blue&quot;/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">1</span>};
        <span class="hljs-keyword">this</span>.click = <span class="hljs-keyword">this</span>.click.bind(<span class="hljs-keyword">this</span>);
    }

    click() {
        <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
            <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
        }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.color !== nextProps.color) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.count !== nextState.count;
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">{this.props.color}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click}</span>&gt;</span>
                Count：{this.state.count}
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
        );
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CounterButton</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span>/&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>在这段代码中，<code>shouldComponentUpdate</code>只是检查<code>props.color</code>或<code>state.count</code>是否有任何变化。 如果它们的值没有更改，则组件不更新。 如果你的组件比这个例子中的组件更复杂，你可以使用类似的模式在props和state的所有字段之间做一个<code>“浅比较”</code>，以确定组件是否应该更新。</p>
<p>比较常见的模式是使用React提供的一个帮助对象来使用这个逻辑，可以直接继承<code>React.PureComponent</code>。 <br> 所以上面这段代码有一个更简单的方法来实现同样的事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

class CounterButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {count: 1};
        this.click = this.click.bind(this);
    }

    click() {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    render() {
        return (
            <button color={this.props.color} onClick={this.click}>
                Count: {this.state.count}
            </button>
        );
    }
}
ReactDOM.render(
    <CounterButton color=&quot;blue&quot;/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">1</span>};
        <span class="hljs-keyword">this</span>.click = <span class="hljs-keyword">this</span>.click.bind(<span class="hljs-keyword">this</span>);
    }

    click() {
        <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
            <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
        }));
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">{this.props.color}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click}</span>&gt;</span>
                Count: {this.state.count}
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
        );
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CounterButton</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span>/&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>大多数时候，你可以使用<code>React.PureComponent</code>而不是编写自己的<code>shouldComponentUpdate</code>。 它只做一个浅层的比较，所以你不需要直接使用它，如果你的组件内部<code>props</code>或<code>state</code>的数据有可能会<code>突然变化</code>，那么<code>浅比较</code>将失效。</p>
<p><code>浅比较</code>的失效可能是一个更加复杂的数据结构问题(<code>突然变化</code>)。 例如，假设您想要一个以逗号分隔单词列表的<code>ListOfWords</code>组件，使用一个父<code>WordAdder</code>组件，当你单击一个按钮用来添加一个单词到列表中时。 下面的代码将无法正常工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// PureComponent在内部会帮我们对props和state进行简单对比(浅比较)
// 值类型比较值，引用类型比较引用，但是不会比较引用类型的内部数据是否改变。
// 所以就会出现一个bug，不管你怎么点button，div是不会增加的。
class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {words: ['zhangyatao']};
        this.click = this.click.bind(this);
    }
    click() {
        // 这么写是不对的，因为state的更新是异步的，所以可能会导致一些不必要的bug
        const words = this.state.word;
        words.push('zhangyatao');
        this.setState({words: words});
    }
    render() {
        return (
            <div>
                <button onClick={this.click} />
                <ListOfWords words={this.state.words} />
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// PureComponent在内部会帮我们对props和state进行简单对比(浅比较)</span>
<span class="hljs-comment">// 值类型比较值，引用类型比较引用，但是不会比较引用类型的内部数据是否改变。</span>
<span class="hljs-comment">// 所以就会出现一个bug，不管你怎么点button，div是不会增加的。</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListOfWords</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.words.join(',')}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WordAdder</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">words</span>: [<span class="hljs-string">'zhangyatao'</span>]};
        <span class="hljs-keyword">this</span>.click = <span class="hljs-keyword">this</span>.click.bind(<span class="hljs-keyword">this</span>);
    }
    click() {
        <span class="hljs-comment">// 这么写是不对的，因为state的更新是异步的，所以可能会导致一些不必要的bug</span>
        <span class="hljs-keyword">const</span> words = <span class="hljs-keyword">this</span>.state.word;
        words.push(<span class="hljs-string">'zhangyatao'</span>);
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">words</span>: words});
    }
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;button onClick={this.click} /&gt;
                &lt;ListOfWords words={this.state.words} /&gt;
            &lt;/div&gt;
        );
    }
}</code></pre>
<p>问题是<code>PureComponent</code>将对<code>this.props.words</code>的旧值和新值进行简单比较。 由于这个代码在<code>WordAdder</code>的<code>click</code>方法中改变了单词数组，所以即使数组中的实际单词已经改变，<code>ListOfWords</code>组件中的<code>this.props.words</code>的旧值和新值还是相等的。 因此即便<code>ListOfWords</code>具有要被渲染出来的新单词它也还是不更新任何内容。</p>
<h3 id="articleHeader5">超能力之『不会突然变化的数据』</h3>
<p>避免此问题的最简单的方法就是避免将那些<code>可能突然变化的数据</code>作为你的props或state。 例如，上面的<code>click</code>方法里面使用<code>concat</code>代替<code>push</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="click() {
    this.setState(prevState => ({
        count: prevState.words.concat(['zhangyatao'])
    }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">click() {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
        <span class="hljs-attr">count</span>: prevState.words.concat([<span class="hljs-string">'zhangyatao'</span>])
    }));
}</code></pre>
<p>ES6支持数组的<code>spread</code>语法可以让这变得更容易。 如果您使用的是<code>Create React App</code>，那么此语法默认可以使用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="click() {
    this.setState(prevState => ({
        words: [...prevState.words, 'zhangyatao']
    }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">click() {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
        <span class="hljs-attr">words</span>: [...prevState.words, <span class="hljs-string">'zhangyatao'</span>]
    }));
}</code></pre>
<p>您还可以把那部分<code>有可能突然变化的数据</code>的代码按照上面的方式给重写下，从而以避免这种问题。 <br>例如，假设我们有一个名为<code>colormap</code>的对象，我们要写一个函数，将<code>colormap.right</code>改为<code>'blue'</code>。 我们可以写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateColorMap(colormap) {
    colormap.right = 'blue';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateColorMap</span>(<span class="hljs-params">colormap</span>) </span>{
    colormap.right = <span class="hljs-string">'blue'</span>;
}</code></pre>
<p>要将上面的代码写成不会濡染改变的对象，我们可以使用<code>Object.assign</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateColorMap(colormap) {
    return Object.assign(colormap, {right: 'blue'});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateColorMap</span>(<span class="hljs-params">colormap</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign(colormap, {<span class="hljs-attr">right</span>: <span class="hljs-string">'blue'</span>});
}</code></pre>
<p><code>updateColorMap</code>现在会返回一个新对象，而不是改变之前的旧对象。 <code>Object.assign</code>在ES6中，需要<code>polyfill</code>。</p>
<p>有一个JavaScript提议来添加对象<code>spread</code>属性，以便不会<code>突然变化</code>的更新对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateColorMap(colormap) {
    return {...colormap, right: 'blue'};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateColorMap</span>(<span class="hljs-params">colormap</span>) </span>{
    <span class="hljs-keyword">return</span> {...colormap, <span class="hljs-attr">right</span>: <span class="hljs-string">'blue'</span>};
}</code></pre>
<p>如果使用<code>Create React App</code>，默认情况下<code>Object.assign</code>和对象<code>spread</code>语法都可用。</p>
<h3 id="articleHeader6">使用不突变的数据结构</h3>
<p><code>Immutable.js</code>是另一种解决这个问题的方法。 它提供不可变的，持久的集合，通过结构共享工作：</p>
<ul>
<li><p>不可变：一旦创建，集合不能在另一个时间点更改。</p></li>
<li><p>持久性：可以从先前的集合和类集合的突变中创建处一个新集合。 创建新集合后，原始集合仍然有效。</p></li>
<li><p>结构共享：使用尽可能多的与原始集合相同的结构创建新集合，从而将最低程度的减少复制来提高性能。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(16)性能优化

## 原文链接
[https://segmentfault.com/a/1190000007818047](https://segmentfault.com/a/1190000007818047)

