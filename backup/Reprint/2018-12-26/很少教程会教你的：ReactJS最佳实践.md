---
title: '很少教程会教你的：ReactJS最佳实践' 
date: 2018-12-26 2:30:14
hidden: true
slug: 5g7gmqefr2c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 前言</h2>
<p>我自己使用ReactJS有一定时间了，慢慢的也积累了很多所谓的Best Practice，之前内容比较少，都是记在脑子里，后来就记在有道云笔记里，而且原本打算在团队内部开分享会议的时候，在团队内部分享的，但由于种种原因一直没有机会，索性干脆整理一下分享在社区了，也省的像之前用AngularJS的时候，有很多的心得在长时间不用之后慢慢都忘记了。正所谓好记性不如烂笔头嘛，尤其是时间久了。</p>
<p>以下所有的代码，内容几乎都是ES6，如果你还没有开始用ES6代码，可以在准备好简历之后，恶狠狠的指着你们总监的鼻子羞辱他，因为我个人觉得离开ES6，ReactJS带来的开发的便捷性会大打折扣。好不了解ES6的猿可以去网上找阮一峰老师的在线教程，九浅一深，啊不！由浅入深的学习ES6。文章也假设你对React有一定的了解，知道React的各个生命周期阶段的函数，但不要求精通。（这不废话嘛！精通了还看这篇文章干嘛。）</p>
<h2 id="articleHeader1">2 奇淫技巧</h2>
<h3 id="articleHeader2">2.1 <code>context</code>的妙用</h3>
<h4>2.1.1 使用场景</h4>
<p>话不多说，看图：<br><span class="img-wrap"><img data-src="/img/bVXFKY?w=800&amp;h=448" src="https://static.alili.tech/img/bVXFKY?w=800&amp;h=448" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>图片来源：<a href="https://segmentfault.com/a/1190000004636213">https://segmentfault.com/a/11...</a></p></blockquote>
<p>有时候会有这样一种情况，组件嵌套层次很深，而最又内层组件又需要最外层组件的一个属性，比如图中D组件需要A组件中的一个属性username，这时候最容易想到的就是:A组件内把这个username作为props传给B组件，B组件再原封不动的传给C组件，C再传给D，而B,C组件有可能都没有用到这个username，只是作为中间媒介在传递属性。但是你依然不得不书写这个props，针对这种情况就可以用到ReactJS中的context。</p>
<h4>2.1.2 使用方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 组件A
class A extends Component {
    // 其他代码省略，只上关键代码
    constructor(props) {
        super(props);
        this.state = {
            username: 'Neil'
        };
    }
    getChildContext() {
        return {
            username: this.state.username
        };
    }
}

A.childContextTypes = {
    username: PropTypes.string
};

// 组件D
class D extends Component {
    render() {
        return <div>{this.context.username}</div>
    }
}
D.contextChild = {
    username: PropTypes.string
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// 组件A</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// 其他代码省略，只上关键代码</span>
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            username: <span class="hljs-symbol">'Nei</span>l'
        };
    }
    getChildContext() {
        <span class="hljs-keyword">return</span> {
            username: <span class="hljs-keyword">this</span>.state.username
        };
    }
}

<span class="hljs-type">A</span>.childContextTypes = {
    username: <span class="hljs-type">PropTypes</span>.string
};

<span class="hljs-comment">// 组件D</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">D</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.context.username}&lt;/div&gt;
    }
}
<span class="hljs-type">D</span>.contextChild = {
    username: <span class="hljs-type">PropTypes</span>.string
}</code></pre>
<p>可以看到<code>context</code>的使用还是比较简单的，根组件A作为<code>Context Provider</code>,需要在其中添加一个成员方法<code>getChildContext</code>（该方法必须返回一个对象），和一个静态属性<code>childContextTypes</code>。然后为任何一个你想使用该context的子组件添加一个静态属性<code>contextTypes</code>来告诉React你要用哪个<code>context</code>。</p>
<h4>2.1.3 注意事项</h4>
<p>虽然使用比较简单，但是官方也明确表示，并不推荐使用context，因为这会使得原本简单并可控的React单向数据流变得复杂，不可预期。所以使用中还是有以下几点需要注意：</p>
<ul>
<li>推荐把不经常变动的值作为context传递，比如在组件树中，username就像一个全局常量一样，不经常变动。</li>
<li>
<p>在上面的例子中，组件使用context以后，在D组件的生命周期的这几个函数中会有额外多余的参数：</p>
<ul>
<li><code>constructor(props, context)</code></li>
<li><code>componentWillReceiveProps(nextProps, nextContext)</code></li>
<li><code>shouldComponentUpdate(nextProps, nextState, nextContext)</code></li>
<li><code>componentWillUpdate(nextProps, nextState, nextContext)</code></li>
</ul>
</li>
</ul>
<blockquote><p>在React15之前的本版本中，<code>componentDidUpdate</code>会有<code>prevContext</code>参数，但是最新的React16版本不再接收此参数。</p></blockquote>
<ul><li>在无状态的函数式组件（<code>Stateless Functional Components</code>，关于什么是函数式组件，后面会讲到）中也可以使用<code>context</code>，比如：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const D = (props, context) => {
    return <div>{context.username}</div>
};

D.contextChild = {username: PropTypes.string};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> D = <span class="hljs-function">(<span class="hljs-params">props, context</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{context.username}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
};

D.contextChild = {<span class="hljs-attr">username</span>: PropTypes.string};</code></pre>
<ul><li>尽量不要更新<code>context</code>。<code>context</code>只适用于传递那些不经常变动的变量，但是如果你不得不更改context，例如上面的例子中A组件中的username实际上来自于A的<code>state</code>，假如我们在A中调用<code>this.setState({username: 'Michel'})</code>， 那么在D组件中context也会更新。因为A组件中声明的<code>getChildContext</code>方法在A组件的初始化阶段和更新阶段都会被调用。<strong>但要注意的是，假如B组件或者C组件实现了<code>shouldComponentUpdate</code>，并在某些条件下返回了false，那么，D组件中的context将不会再更新。</strong>因为此时，B组件或者C组件的render并不会重新被调用。D组件也就不会更新（换句话说，在D组件生命周期的更新阶段，任何的hook函数都不会被调用）。<strong>所以我们应极力避免更新context</strong>，因为这会使应用的数据流变得非常混乱，这背离了React的设计思想。</li></ul>
<h3 id="articleHeader3">2.2 自定义组件<code>ref</code>属性的使用</h3>
<p>React组件基本分为两类，一类是原生的组件比如<code>div</code>,<code>span</code>,<code>ul</code>等等这类的HTML标签（其实你也可以直接叫他HTML DOM元素，只是我自己认为他也是一类组件），一类是自定义组件，包括用<code>class</code>定义的组件和用函数定义的组件，<code>ref</code>属性在这两种组件中所代表的含义是不一样的。</p>
<h4>2.2.1 <code>ref</code>在<code>HTML</code>标签上使用</h4>
<p>看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CustomComponent extends React.Component {
  render() {
    return (
      <div>
      <input type=&quot;text&quot;
          ref={(input) => { this.textInput = input; "}}" />
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
      &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          ref={(input) =&gt; { <span class="hljs-keyword">this</span>.textInput = input; "}}" /&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>此时在<code>CustomComponent</code>组件内部的<code>input</code>标签上有一个<code>ref</code>属性，该属性是一个匿名函数，该函数有一个形参，代表的是<code>input</code>这个标签的<strong>DOM对象的引用</strong>，然后再函数体中将该对象赋值给<code>this.textInput</code>属性。</p>
<h4>2.2.2 ref在自定义组件上的应用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Parent extends React.Component {
  render() {
    return (<Child ref={component => {this.child = component"}}"/>);
  }
}

class Child extends React.Component {
  render() {return (<div> I am a child.</div>);}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (&lt;<span class="hljs-type">Child</span> ref={component =&gt; {<span class="hljs-keyword">this</span>.child = component"}}"/&gt;);
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {<span class="hljs-keyword">return</span> (&lt;div&gt; <span class="hljs-type">I</span> am a child.&lt;/div&gt;);}
}</code></pre>
<p>上例中，我们在父组件<code>Parent</code>中调用了<code>Child</code>组件，<code>Child</code>组件上同样传递了这个特殊的属性<code>ref</code>，在匿名函数体内，同样将函数的参数赋值给<code>this.child</code>，此时在控制台中打印出<code>this.child</code>：<br><span class="img-wrap"><img data-src="/img/bVXJ5z?w=1203&amp;h=165" src="https://static.alili.tech/img/bVXJ5z?w=1203&amp;h=165" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到该对象就是<strong>组件实例化之后的对象</strong>，包含<code>props</code>, <code>context</code>和<code>state</code>等属性。<strong>这种特性可以允许我们访问某个子组件的内部状态</strong>。</p>
<h4>2.2.3 <code>ref</code>在函数式组件上的使用</h4>
<p><code>ref</code>属性不可以在函数式组件上使用，假如将上例的<code>Child</code>改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Child = (props) => {
    return (<div> I am a child.</div>);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Child = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> I am a child.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
}</code></pre>
<p>此时在<code>Parent</code>组件中便不能为<code>Child</code>组件添加<code>ref</code>属性，因为函数式组件没有实例，但是可以在函数式组件内部使用<code>ref</code>属性，比如我们在<code>Child</code>组件中使用<code>ref</code>。</p>
<h3 id="articleHeader4">2.3 将某个<code>props</code>复制给<code>state</code>
</h3>
<p>之所以想把这个拿出来说一说是因为在我刚开始学React的时候，团队的加拿大Leader在review我代码的时候，看到我写了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CustomComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        };
    }      
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            username: props.username
        };
    }      
}</code></pre>
<p>之后，要求我不要这么写，说这么写是不规范的。其实后来看官方文档，这么写也是可以的。只不过在组件的<code>props.username</code>更新之后，<code>this.state.username</code>并不再更新。如果想保证两者值同步，可以在组件的生命周期函数<code>componentWillReceiveProps</code>中更新<code>state</code>,<strong>因为在组件的更新阶段，<code>componentWillReceiveProps</code>函数是唯一一个可以在更新组件之前再次调用<code>setState</code>来更新组件状态的地方</strong>，需要注意的是如果的组件的更新是因为某个地方调用<code>setState</code>，那么在组件的更新阶段这个函数并不会被调用，以避免陷入死循环。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps) {
    this.setState({username: nextProps.username});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">componentWillReceiveProps</span>(nextProps) {
    <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setState</span>({<span class="hljs-attribute">username</span>: nextProps.username});
}</code></pre>
<h2 id="articleHeader5">3 最佳实践</h2>
<h3 id="articleHeader6">3.1 避免直接在组件上写用bind函数</h3>
<p>很多React教程在讲到React事件处理的时候，都会有类似的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ButtonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: props.username
        };
    }
    
    handleClick() {
        const {count} = this.state;
        this.setState({count: count + 1});
    }
    
    render() {
        return (
          // 假设Button是我们自定义的一个组件，这个组件需要一个onClick属性，属性类型必须为函数
          <Button onClick={this.handleClick.bind(this)} />
        )    
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ButtonList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            state: props.username
        };
    }
    
    handleClick() {
        const {count} = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">this</span>.setState({count: count + <span class="hljs-number">1</span>});
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
          <span class="hljs-comment">// 假设Button是我们自定义的一个组件，这个组件需要一个onClick属性，属性类型必须为函数</span>
          &lt;<span class="hljs-type">Button</span> onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)} /&gt;
        )    
    }
}</code></pre>
<p>这样的写法并没有错，但是可有可能会引起一些性能问题，因为<code>ButtonList</code>的<code>render</code>函数每一次被调用的时候，都会创建一个新的函数，然后赋值给<code>onClick</code>属性，在<code>Button</code>组件内部属性的比较又是用<code>===</code>，在某些情况下，这样会引起Button组件不必要的重新渲染。深究其原因是因为每次调用<code>bind</code>函数都会返回一个新的函数(还没彻底弄明白<code>bind</code>函数原理的猿可以看<a href="http://www.admin10000.com/document/6711.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>)。比如，下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print() {
    console.log(this.a);
}
let obj = {a: 'A'}
print.bind(obj) === print.bind(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    console.log(this.a);
}</span>
<span class="hljs-title">let</span> <span class="hljs-title">obj</span> = <span class="hljs-comment">{a: 'A'}</span>
<span class="hljs-title">print</span>.<span class="hljs-title">bind</span><span class="hljs-params">(obj)</span> === <span class="hljs-title">print</span>.<span class="hljs-title">bind</span><span class="hljs-params">(obj)</span>;</span></code></pre>
<p>最后一行代码比较的结果始终是false，因为每次调用bind函数都会返回一个新的函数对象的引用。这就是为什么要尽量避免在行内写bind函数，<code>&lt;Button type='button' onClick={(event) =&gt; {"}}" /&gt;</code>这样的写法也有相同的问题，因为这样相当于每次都声明一个新的匿名函数。最佳的写法是在<code>constructor</code>内写<code>this.handleClick = this.handleClick.bind(this)</code>（相当于在组件初始化时，就把<code>bind</code>函数返回的新函数保存在一个成员变量中，这样，在组件的更新阶段，每次给<code>onClick</code>属性都传递的都是同一个函数的引用），并在组件上这样写<code>&lt;Button onClick={this.handleClick} /&gt;</code>。<br>但是，假如在演示组件<code>ButtonList</code>有十几个函数需要绑定，你可能会抱怨，每添加一个事件处理函数，都要写类似这样的代码，导致组件臃肿不堪。身为一个有逼格的程序猿，怎么可以干这种重复的机械运动呢！这时，你可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor() {
    // 省略其他非关键代码,并假设我们已经声明了以下事件处理函数
    this.bind([
      'eventHandler1',
      'eventHandler2',
      'eventHandler3',
      'eventHandler4',
      'eventHandler5'
    ])
}

bind(methodArray) {
    methodArray.forEach(method => this[method] = this[method].bind(this));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// 省略其他非关键代码,并假设我们已经声明了以下事件处理函数</span>
    <span class="hljs-keyword">this</span>.bind([
      <span class="hljs-string">'eventHandler1'</span>,
      <span class="hljs-string">'eventHandler2'</span>,
      <span class="hljs-string">'eventHandler3'</span>,
      <span class="hljs-string">'eventHandler4'</span>,
      <span class="hljs-string">'eventHandler5'</span>
    ])
}

bind(methodArray) {
    methodArray.forEach(method =&gt; <span class="hljs-keyword">this</span>[method] = <span class="hljs-keyword">this</span>[method].bind(<span class="hljs-keyword">this</span>));
}</code></pre>
<h3 id="articleHeader7">3.2 多用函数式组件（Stateless Functional Component, SFC）</h3>
<h4>3.2.1 使用方法</h4>
<p>React中自定义组件，最简单的写法可以是这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Custom(props) {
    // props以函数参数的形式传递
    return(<div>This is a functional component, {props.name}</div>);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Custom</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// props以函数参数的形式传递</span>
    <span class="hljs-keyword">return</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>This is a functional component, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
}</code></pre>
<p>也可以用ES6语法这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Custom extend Component {
    render() {
        return(<div>This is a functional component</div>);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Custom</span> <span class="hljs-title">extend</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>This is a functional component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
    }
}</code></pre>
<p>这两种写法属于不同类型的组件，前一种称为函数式组件，后一种称为class类组件。这两种组件在使用上有一些区别，比如2.2.2小结讲到的ref属性的使用。这里推荐使用第一种写法。因为第一种写法的代码量更少，而且函数式组件也有更加优秀的性能表现（关于两种组件的性能比较，我还没找更多的证据，据说能够减少很多无意义的检测和内存分配）总之这样写，更加优雅（装逼）啦。如果你在用ES6语法，前一种写法还可以是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Custom = ({name}) => {
    return(<div>This is a functional component, {name}</div>);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Custom = <span class="hljs-function">(<span class="hljs-params">{name}</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>This is a functional component, {name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
};</code></pre>
<p>这中写法最迷人的地方在于代码量很少，代码易读，看函数声明很容知道该组件需要哪些属性。</p>
<h4>3.2.2 注意事项</h4>
<p>函数式组件虽好，但不是任何情况下都能使用函数式组件。这里给两条参照标准：</p>
<ol>
<li>正如该组件的英文名称：Stateless Functional Component，只有在组件没有状态的时候才适用。</li>
<li>函数式组件没有生命周期的hook函数，如果你想调用任何一个生命周期钩子函数，请使用类组件。</li>
</ol>
<h3 id="articleHeader8">3.3 避免直接修改<code>porps</code>或者<code>state</code>
</h3>
<p>关于这条，很多人在一开始学习React的时候就被灌输了这个概念：<strong>不能在组件内部修改porps ，修改state要用setState</strong>。但是在一些复杂的情况下，大家往往会在不经意间犯了这两个错误。看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假设data是这样的结构:
// data = [
//     {
//         name: 'Lily',
//         age: 19
//     },
//     {
//         name: 'Tom',
//         age: 20
//     }
// ];
const data = this.props.data;
data.push({name: 'Neil', age: 22});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 假设data是这样的结构:</span>
<span class="hljs-comment">// data = [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         name: 'Lily',</span>
<span class="hljs-comment">//         age: 19</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         name: 'Tom',</span>
<span class="hljs-comment">//         age: 20</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ];</span>
const <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>.props.<span class="hljs-keyword">data</span>;
<span class="hljs-keyword">data</span>.push({name: <span class="hljs-string">'Neil'</span>, age: <span class="hljs-number">22</span>});</code></pre>
<p>包括我的同事在内，他们经常会写类似这样的代码，然后困惑的跑来问我，为什么组件没有按照预期更新，因为这样的写法，已经更新了props。这涉及到JS中一个很重的知识点：<strong>JS中将对象（Function和Array也是对象）赋值给某一个变量，本质上是把对象的引用赋值给这个变量，作为函数的实参传递时也是一样的道理</strong>（如果还不明白什么是对象的引用，网上有很多教程解释的很清楚，我比较懒，就不解释这么基础的概念了）。比如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {a: 1};
function test(obj) {
    obj.a = 2;
}
test(obj);
console.log(obj.a); // 打印出2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>let obj = <span class="hljs-comment">{a: 1}</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">(obj)</span> <span class="hljs-comment">{
    obj.a = 2;
}</span>
<span class="hljs-title">test</span><span class="hljs-params">(obj)</span>;</span>
console.log(obj.a); <span class="hljs-comment">// 打印出2</span></code></pre>
<p>所以在组件内这样的代码：<code>data.push({name: 'Neil', age: 22})</code>实际上已经更改了实际上已经不经意间在子组件内修改了父组件的传来的props。如果将示例中的代码换成<code>const data = this.state.data; data.push({name: 'Neil', age: 22});</code>后也会有相同的问题。正确的写法应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 利用ES6的spread语法
// Spread会返回一个新数组，并将新数组的引用赋值给变量data，
// 修改data也就不会影响this.props.data
const data = [...this.props.data];

// 或者不利用ES6你在ES5中也可以这样：
// concat函数也会返回一个新的数组
var data = [].concat(this.props.data);

// 如果this.props.data是一个对象（字面量对象，非数组对象或函数对象）
// assign函数也会返回一个新的对象。
var data = Object.assign({}, this.props.data);


data.push({name: 'Neil', age: 22});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 利用ES6的spread语法</span>
<span class="hljs-comment">// Spread会返回一个新数组，并将新数组的引用赋值给变量data，</span>
<span class="hljs-comment">// 修改data也就不会影响this.props.data</span>
const <span class="hljs-keyword">data</span> = [...<span class="hljs-keyword">this</span>.props.<span class="hljs-keyword">data</span>];

<span class="hljs-comment">// 或者不利用ES6你在ES5中也可以这样：</span>
<span class="hljs-comment">// concat函数也会返回一个新的数组</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = [].concat(<span class="hljs-keyword">this</span>.props.<span class="hljs-keyword">data</span>);

<span class="hljs-comment">// 如果this.props.data是一个对象（字面量对象，非数组对象或函数对象）</span>
<span class="hljs-comment">// assign函数也会返回一个新的对象。</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = Object.assign({}, <span class="hljs-keyword">this</span>.props.<span class="hljs-keyword">data</span>);


<span class="hljs-keyword">data</span>.push({name: <span class="hljs-string">'Neil'</span>, age: <span class="hljs-number">22</span>});
</code></pre>
<h2 id="articleHeader9">4 最后</h2>
<p>还有其他的东西，由于篇幅和时间有限没来得及写，以后有机会写一写。文章有任何错误之处，请不吝赐教或轻喷。附上参考文章及链接：</p>
<blockquote><p><a href="https://reactjs.org/" rel="nofollow noreferrer" target="_blank">https://reactjs.org/</a><br><a href="https://segmentfault.com/a/1190000004636213">https://segmentfault.com/a/11...</a><br><a href="http://www.react.express/" rel="nofollow noreferrer" target="_blank">http://www.react.express/</a><br><a href="https://segmentfault.com/a/1190000007553885">https://segmentfault.com/a/11...</a><br><a href="http://www.admin10000.com/document/6711.html" rel="nofollow noreferrer" target="_blank">http://www.admin10000.com/doc...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
很少教程会教你的：ReactJS最佳实践

## 原文链接
[https://segmentfault.com/a/1190000011891035](https://segmentfault.com/a/1190000011891035)

