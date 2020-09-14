---
title: 'React进阶—性能优化' 
date: 2019-01-17 2:30:25
hidden: true
slug: 95a9jt04dzc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React性能优化思路</h2>
<p>软件的性能优化思路就像生活中去看病，大致是这样的：</p>
<ol>
<li><p>使用工具来分析性能瓶颈（找病根）</p></li>
<li><p>尝试使用优化技巧解决这些问题（服药）</p></li>
<li><p>使用工具测试性能是否确实有提升（疗效确认）</p></li>
</ol>
<h3 id="articleHeader1">React性能优化的特殊性</h3>
<p>看过《高性能JavaScript》这本书的小伙伴都知道，JavaScipt的语言特性、数据结构和算法、浏览器机理、网络传输等都可能导致性能问题。同样是web实现，跟传统的技术（如原生js、jQuery）相比, react的性能优化有什么不同呢？</p>
<p>使用jQuery时，要考虑怎么使用选择器来提高元素查找效率、不要在循环体内进行DOM操作、使用事件委托呀等等。到了React这里，这些东西好像都用不上了。是的，因为React有一个很大的不同点，它实现了虚拟DOM，并且接管了DOM的操作。你不能直接去操作DOM来改变UI，你只能通过改变数据源（props和state）来驱动UI的变化。</p>
<p>说起React的性能分析，还得从它的生命周期和渲染机制说起：</p>
<h4>React组件生命周期</h4>
<p><span class="img-wrap"><img data-src="/img/bVLyCB?w=2803&amp;h=2945" src="https://static.alili.tech/img/bVLyCB?w=2803&amp;h=2945" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>当 props 和 state 发生变化时，React会根据shouldComponentUpdate方法来决定是否重新渲染整个组件。</p>
<h4>React组件树渲染机制</h4>
<p><span class="img-wrap"><img data-src="/img/bVLBVL?w=1164&amp;h=742" src="https://static.alili.tech/img/bVLBVL?w=1164&amp;h=742" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>父亲组件的props 和 state发生变化时，它和它的子组件、孙子组件等所有后代组件都会重新渲染。</p>
<hr>
<p>综上所述，可以得出React的性能优化就是围绕shouldComponentUpdate方法（SCU）来进行的，无外乎两点：</p>
<ol>
<li><p><strong>缩短SCU方法的执行时间(或者不执行)。</strong></p></li>
<li><p><strong>没必要的渲染，SCU应该返回false。</strong></p></li>
</ol>
<h2 id="articleHeader2">React 性能分析工具</h2>
<h3 id="articleHeader3">Web通用工具：Chrome DevTools</h3>
<p>最常用到的是Chrome DevTools的Timeline和Profiles。</p>
<ul>
<li><p>Timeline工具栏提供了对于在装载你的Web应用的过程中，时间花费情况的概览，这些应用包括处理DOM事件, 页面布局渲染或者向屏幕绘制元素。</p></li>
<li><p>通过Timeline发现是脚本问题时，使用Profiles作进一步分析。Profiles可以提供更加详细的脚本信息。</p></li>
</ul>
<h3 id="articleHeader4">React特色工具：Perf</h3>
<p><a href="https://facebook.github.io/react/docs/perf.html" rel="nofollow noreferrer" target="_blank">Perf</a> 是react官方提供的性能分析工具。Perf最核心的方法莫过于<code>Perf.printWasted(measurements)</code>了，该方法会列出那些没必要的组件渲染。很大程度上，React的性能优化就是干掉这些无谓的渲染。</p>
<p>有童鞋开发了Chrome扩展程序“React Perf”（<a href="https://chrome.google.com/webstore/detail/react-perf/hacmcodfllhbnekmghgdlplbdnahmhmm" rel="nofollow noreferrer" target="_blank">戳这里</a>）。相比自己在代码中插入Perf方法进行分析，这个小工具更加灵活方便，墙裂推荐！</p>
<h2 id="articleHeader5">案例分析：TodoList</h2>
<p>TodoList的功能很简单，就是对待办事项进行增加和删除操作：<br><span class="img-wrap"><img data-src="/img/bVLBOY?w=460&amp;h=708" src="https://static.alili.tech/img/bVLBOY?w=460&amp;h=708" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {PropTypes, Component} from 'react';

class TodoItem extends Component {

    static propTypes = {
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }).isRequired,
    };

    deleteItem = ()=>{
        let id = this.props.item.id;
        this.props.deleteItem(id);
    };

    render() {
        return (
            <div>
                <button style="{{"width: 30"}}" onClick={this.deleteItem}>X</button>
                &amp;nbsp;
                <span>{this.props.item.text}</span>
            </div>
        );
    }

}

class Todos extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            items: this.props.initialItems,
            text: '',
        };
    }

    static propTypes = {
        initialItems: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }).isRequired).isRequired,
    };

    addTask = (e)=> {
        e.preventDefault();
        this.setState({
            items: [{id: ID++, text: this.state.text}].concat(this.state.items),
            text: '',
        });
    };

    deleteItem = (itemId)=> {
        this.setState({
            items: this.state.items.filter((item) => item.id !== itemId),
        });
    };

    render() {
        return (
            <div>
                <h1>待办事项</h1>
                <form onSubmit={this.addTask}>
                    <input value={this.state.text} onChange={(v)=>{this.setState({text:v.target.value});"}}"/>
                    <button>添加</button>
                </form>
                {this.state.items.map((item) => {
                    return (
                        <TodoItem key={item.id}
                                  item={item}
                                  deleteItem={this.deleteItem}/>
                    );
                })}
            </div>
        );
    }
}

let ID = 0;
const items = [];
for (let i = 0; i < 1000; i++) {
    items.push({id: ID++, text: '事项' + i});
}

class TodoList extends Component {
    render() {
        return (
            <Todos initialItems={items}/>
        );
    }
}

export default TodoList;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {PropTypes, Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">deleteItem</span>: PropTypes.func.isRequired,
        <span class="hljs-attr">item</span>: PropTypes.shape({
            <span class="hljs-attr">text</span>: PropTypes.string.isRequired,
            <span class="hljs-attr">id</span>: PropTypes.number.isRequired,
        }).isRequired,
    };

    deleteItem = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">let</span> id = <span class="hljs-keyword">this</span>.props.item.id;
        <span class="hljs-keyword">this</span>.props.deleteItem(id);
    };

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"width:</span> <span class="hljs-attr">30</span>"}}" <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.deleteItem}</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                &amp;nbsp;
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{this.props.item.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }

}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Todos</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

    <span class="hljs-comment">// 构造</span>
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-comment">// 初始状态</span>
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">items</span>: <span class="hljs-keyword">this</span>.props.initialItems,
            <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>,
        };
    }

    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">initialItems</span>: PropTypes.arrayOf(PropTypes.shape({
            <span class="hljs-attr">text</span>: PropTypes.string.isRequired,
            <span class="hljs-attr">id</span>: PropTypes.number.isRequired,
        }).isRequired).isRequired,
    };

    addTask = <span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span> {
        e.preventDefault();
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">items</span>: [{<span class="hljs-attr">id</span>: ID++, <span class="hljs-attr">text</span>: <span class="hljs-keyword">this</span>.state.text}].concat(<span class="hljs-keyword">this</span>.state.items),
            <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>,
        });
    };

    deleteItem = <span class="hljs-function">(<span class="hljs-params">itemId</span>)=&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">items</span>: <span class="hljs-keyword">this</span>.state.items.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.id !== itemId),
        });
    };

    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;h1&gt;待办事项&lt;/h1&gt;
                &lt;form onSubmit={this.addTask}&gt;
                    &lt;input value={this.state.text} onChange={(v)=&gt;{this.setState({text:v.target.value});"}}"/&gt;
                    &lt;button&gt;添加&lt;/button&gt;
                &lt;/form&gt;
                {this.state.items.map((item) =&gt; {
                    return (
                        &lt;TodoItem key={item.id}
                                  item={item}
                                  deleteItem={this.deleteItem}/&gt;
                    );
                })}
            &lt;/div&gt;
        );
    }
}

let ID = 0;
const items = [];
for (let i = 0; i &lt; 1000; i++) {
    items.push({id: ID++, text: '事项' + i});
}

class TodoList extends Component {
    render() {
        return (
            &lt;Todos initialItems={items}/&gt;
        );
    }
}

export default TodoList;</code></pre>
<p><strong>在待办事项输入框里输入一个字母</strong>，接下来我们以这个行为为例来进行性能分析和优化。</p>
<h3 id="articleHeader6">第一次优化</h3>
<p>使用Chrome开发者工具的Timeline记录下这个过程：<br><span class="img-wrap"><img data-src="/img/bVLBSD?w=1994&amp;h=1268" src="https://static.alili.tech/img/bVLBSD?w=1994&amp;h=1268" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>重点关注出现的红色块，代表这个行为存在性能问题。从上图我们可以看出，耗时的<code>Event(keypress)</code>长条花了98.8ms,其中98.5ms用于脚本处理，可见脚本问题是罪魁祸首。</p>
<p>接着，我们使用Profiles来进一步分析脚本问题：<br><span class="img-wrap"><img data-src="/img/bVLBSX?w=1480&amp;h=488" src="https://static.alili.tech/img/bVLBSX?w=1480&amp;h=488" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>对Total Time进行降序排列，发现耗时最长的是dispatchEvent，来自react源码。这时，我们就可以确定是react这一层出现了性能问题。</p>
<p>嗯，轮到Perf出场了：<br><span class="img-wrap"><img data-src="/img/bVLBUk?w=1764&amp;h=350" src="https://static.alili.tech/img/bVLBUk?w=1764&amp;h=350" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>上图表示，有1000次不必要的渲染发生在TodoItem组件上. </p>
<p>打开react面板，我们来看看组件的层次和相应的state、props值：<br><span class="img-wrap"><img data-src="/img/bVLBUZ?w=1748&amp;h=1158" src="https://static.alili.tech/img/bVLBUZ?w=1748&amp;h=1158" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>TodoItem是Todos的子组件，当我们在输入框输入字母“s”时，Todos的state值发生改变时，文章开头所说的react的渲染机制导致Todos下的1000个TodoItem组件都会重新渲染一次。但是，TodoItem的展现其实没有任何变化。<br>从代码中，我们可以看出，TodoItem组件展现只跟props（deleteItem、item）相关。props没有变化，TodoItem就没必要渲染。</p>
<p>所以，我们应该优化下TodoItem的SCU方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class TodoItem extends Component {
    
    ...
    
    //在props没有变化的时候返回false，不重新渲染
    shouldComponentUpdate(nextState,nextProps) {
        if(this.props.item == nextProps.item &amp;&amp; this.props.deleteItem == nextProps.deleteItem){
            return false;
        }
        return true;
    }

    render() {
       ... 
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    
    ...
    
    <span class="hljs-comment">//在props没有变化的时候返回false，不重新渲染</span>
    shouldComponentUpdate(nextState,nextProps) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.props.item == nextProps.item &amp;&amp; <span class="hljs-keyword">this</span>.props.deleteItem == nextProps.deleteItem){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    render() {
       ... 
    }

}
</code></pre>
<p>(PS: TodoItem中的SCU方法，使用的是浅比较，也可以使用PureComponent代替。实际项目中，往往需要使用复杂的深比较，可以考虑使用<a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable.js</a>)</p>
<p>验证下优化效果，使用Perf测试，发现1000个多余的渲染被干掉了！<br>再次使用Timeline分析，<code>Event(keypress)</code>耗时从98.5ms降到了26.49ms，性能提升了2.7倍：<br><span class="img-wrap"><img data-src="/img/bVLBYw?w=1514&amp;h=892" src="https://static.alili.tech/img/bVLBYw?w=1514&amp;h=892" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>疗效还不错！</p>
<h3 id="articleHeader7">第二次优化</h3>
<p>通过SCU返回false，我们避免了无谓的渲染。但是，我们还是调用了1000次TodoItem的SCU方法，这也是一笔不小的性能开支。</p>
<p>是否可以不用调用呢？通过合理地规划组件粒度，可以做到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//将增加待办事项抽象成一个组件
class AddItem extends Component{
     constructor(props) {
       super(props);
       this.state = {
           text:&quot;&quot;
       };
     }

    static PropTypes = {
      addTask:PropTypes.func.isRequired
    };

    addTask = (e)=>{
        e.preventDefault();
        this.props.addTask(this.state.text);
    };

    render(){
        return (
            <form onSubmit={this.addTask}>
                <input value={this.state.text} onChange={(v)=>{this.setState({text:v.target.value});"}}"/>
                <button>添加</button>
            </form>
        );

    }
}

class Todos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.initialItems,
        };
    }

    static propTypes = {
        initialItems: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }).isRequired).isRequired,
    };

    addTask = (text)=>{
        this.setState({
            items: [{id: ID++, text:text}].concat(this.state.items),
            text: '',
        });
    };

    deleteItem = (itemId)=>{
        this.setState({
            items: this.state.items.filter((item) => item.id !== itemId),
        });
    };

    render() {
        return (
            <div>
                <h1>待办事项V3</h1>
                <AddItem addTask={this.addTask}/>
                {this.state.items.map((item) => {
                    return (
                        <TodoItem key={item.id}
                                  item={item}
                                  deleteItem={this.deleteItem}/>
                    );
                })}
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//将增加待办事项抽象成一个组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AddItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
     <span class="hljs-keyword">constructor</span>(props) {
       <span class="hljs-keyword">super</span>(props);
       <span class="hljs-keyword">this</span>.state = {
           <span class="hljs-attr">text</span>:<span class="hljs-string">""</span>
       };
     }

    <span class="hljs-keyword">static</span> PropTypes = {
      <span class="hljs-attr">addTask</span>:PropTypes.func.isRequired
    };

    addTask = <span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
        e.preventDefault();
        <span class="hljs-keyword">this</span>.props.addTask(<span class="hljs-keyword">this</span>.state.text);
    };

    render(){
        <span class="hljs-keyword">return</span> (
            &lt;form onSubmit={this.addTask}&gt;
                &lt;input value={this.state.text} onChange={(v)=&gt;{this.setState({text:v.target.value});"}}"/&gt;
                &lt;button&gt;添加&lt;/button&gt;
            &lt;/form&gt;
        );

    }
}

class Todos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.initialItems,
        };
    }

    static propTypes = {
        initialItems: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }).isRequired).isRequired,
    };

    addTask = (text)=&gt;{
        this.setState({
            items: [{id: ID++, text:text}].concat(this.state.items),
            text: '',
        });
    };

    deleteItem = (itemId)=&gt;{
        this.setState({
            items: this.state.items.filter((item) =&gt; item.id !== itemId),
        });
    };

    render() {
        return (
            &lt;div&gt;
                &lt;h1&gt;待办事项V3&lt;/h1&gt;
                &lt;AddItem addTask={this.addTask}/&gt;
                {this.state.items.map((item) =&gt; {
                    return (
                        &lt;TodoItem key={item.id}
                                  item={item}
                                  deleteItem={this.deleteItem}/&gt;
                    );
                })}
            &lt;/div&gt;
        );
    }
}</code></pre>
<p>把增加待办事项抽象成一个AddItem组件。这样一来，组件树从原来的<br><span class="img-wrap"><img data-src="/img/bVLB03?w=612&amp;h=430" src="https://static.alili.tech/img/bVLB03?w=612&amp;h=430" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>变成</p>
<p><span class="img-wrap"><img data-src="/img/bVLB04?w=700&amp;h=470" src="https://static.alili.tech/img/bVLB04?w=700&amp;h=470" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>输入信息时触发变化的text这个state值，被下放到AddItem组件来管理，因此不会导致兄弟组件（TodoItem）的重新渲染。</p>
<p>再次运行Timeline测试，这时<code>Event(keypress)</code>耗时从26.49ms降到了7.98ms,性能提升了2.3倍：<br><span class="img-wrap"><img data-src="/img/bVLB1R?w=1268&amp;h=872" src="https://static.alili.tech/img/bVLB1R?w=1268&amp;h=872" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>至此，性能优化完毕~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React进阶—性能优化

## 原文链接
[https://segmentfault.com/a/1190000008925295](https://segmentfault.com/a/1190000008925295)

