---
title: '玩转 React（六）- 处理事件' 
date: 2018-12-26 2:30:14
hidden: true
slug: 1kx8ys5mfxf
categories: [reprint]
---

{{< raw >}}

                    
<p>前面的文章介绍了 React 的 JSX 语法、组件的创建方式、组件的属性、组件的内部状态以及组件的生命周期。另外，还顺带说了各个知识点要重点注意的事情，以及我在项目实践中的一些经验。如果你觉得对自己有帮助，可以通过 <a href="https://segmentfault.com/a/1190000011336838">玩转 React（一）- 前言</a> 中的文章目录进行阅读。</p>
<p>另外，为了方便大家更好地交流 React、分享前端开发经验，我建了一个微信群，由于微信群二维码有时间限制，你可以先加我好友（<strong>我的微信：leobaba88</strong>），验证信息 <code>玩转 React</code>，我会拉你入群，欢迎大家，下面是我的微信二维码。</p>
<p>好的，言归正传，今天我们说一下在 React 中是如何处理事件的。事件处理是前端开发过程中非常重要的一部分，通过事件处理机制，我们的前端应用可以响应用户的各种操作，从而实现一个富交互的前端应用。</p>
<h1 id="articleHeader0">内容摘要</h1>
<ul>
<li><p>如何为 React 的内置组件设置事件处理函数。</p></li>
<li><p>React 事件对象与浏览器原生 DOM 事件对象的区别。</p></li>
<li><p>默认情况下不能以异步的方式使用事件对象，如在 <code>setTimeout</code> 中。</p></li>
<li><p>不要在组件中使用 <code>addEventListener</code> 注册事件处理函数，有坑。</p></li>
<li><p>绑定事件处理函数 this 指向的四中方式以及他们的优缺点。</p></li>
</ul>
<h1 id="articleHeader1">React 内置组件的事件处理</h1>
<p>我所说的 React 内置组件是指 React 中已经定义好的，可以直接使用的如 div、button、input 等与原生 HTML 标签对应的组件。</p>
<p>我们先回顾一下浏览器原生 DOM 上注册事件的方式。</p>
<p><strong>第一种方式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#&quot; onclick=&quot;console.info('You clicked me.'); return false;&quot;>
    Click me.
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"console.info('You clicked me.'); return false;"</span>&gt;</span>
    Click me.
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>这是一种古老的方式，在 DOM level 1 规范中的事件注册方式，现在已经很少使用了。</p>
<p>这种方式，用来注册事件的 HTML 属性的值是一个字符串，是一段需要执行的 JavaScript 代码。</p>
<p>可以通过 <code>return false;</code> 来阻止当前 HMTL 元素的默认行为，如 a 标签的页面跳转。</p>
<p>关于 DOM 规范的级别可以参考：<a href="https://developer.mozilla.org/fr/docs/DOM_Levels" rel="nofollow noreferrer" target="_blank">DOM Levels</a></p>
<p><strong>第二种方式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#&quot; id=&quot;my-link&quot;>
    Click me.
</a>

<script type=&quot;text/javascript&quot;>
    document.querySelector('#my-link').addEventListener('click', (e) => {
        e.preventDefault();
        console.info(&quot;You clicked me.&quot;);
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"my-link"</span>&gt;</span>
    Click me.
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#my-link'</span>).addEventListener(<span class="hljs-string">'click'</span>, (e) =&gt; {
        e.preventDefault();
        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">"You clicked me."</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这是 DOM level 2 规范中引入的事件注册方式，目前各浏览器也支持的很好，用得是最多的，就是写起来有点啰嗦哈。</p>
<p>在 React 中，事件注册与方式一非常类似，不过有如下几点不同：</p>
<ul>
<li><p>属性名称采用驼峰式（如：onClick，onKeyDown），而不是全小写字母。</p></li>
<li><p>属性值接受一个函数，而不是字符串。</p></li>
<li><p><code>return false;</code> 不会阻止组件的默认行为，需要调用 <code>e.preventDefault();</code></p></li>
</ul>
<p>如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href=&quot;#&quot; onClick={handleClick}>
      Click me
    </a>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ActionLink</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleClick</span>(<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The link was clicked.'</span>);
  }

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>
      Click me
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
  );
}</code></pre>
<p>这是一个以函数方式定义的组件，组件渲染一个 a 元素，设置l链接的点击事件，通过事件处理函数接收到的事件对象（e），阻止了链接的默认行为，并打印 "The link was clicked." 到控制台上。设置 React 内置组件的事件处理函数是不是非常简单。</p>
<h1 id="articleHeader2">React 事件对象 VS 原生的 DOM 事件对象</h1>
<p>React 中的事件对象称之为 <code>SyntheticEvent</code>（合成对象），它是依据 <a href="https://www.w3.org/TR/DOM-Level-3-Events/" rel="nofollow noreferrer" target="_blank">DOM Level 3</a> 的事件规范实现的，这样做最大的好处是可以屏蔽浏览器的差异，各种厂商的浏览器对规范的实现程度是不一样的，如果直接使用原生 DOM 事件对象的话，有些情况下你需要考虑浏览器的兼容性。而 React 通过 <code>SyntheticEvent</code> 已经把这些琐事帮你搞定了，在任何 React 支持的浏览器下，事件对象都有一致的接口。</p>
<p>React 中所有的事件处理函数都会接收到一个 <code>SyntheticEvent</code> 的实例 e 作为参数，如果在某些特殊的场景中，你需要用到原生的 DOM 事件对象，可以通过 <code>e.nativeEvent</code> 来获取。</p>
<h2 id="articleHeader3">不要在异步过程中使用 React 事件对象</h2>
<p>需要说明的是，出于性能的考虑，React 并不是为每一个事件处理函数生成一个全新的事件对象，事件对象会被复用，当事件处理函数被执行以后，事件对象的所有属性会被设置为 null，所以<strong>在事件处理函数中，你不能以异步的方式使用 React 的事件对象</strong>，因为那时候事件对象的所有属性都是 null 了，或者已经不是你关心的那个事件了。</p>
<h2 id="articleHeader4">尽量不要使用 <code>addEventListener</code>
</h2>
<p>这里稍微深入一下，不然我怕有的同学会踩坑。React 内部自己实现了一套高效的事件机制，为了提高框架的性能，React 通过 DOM 事件冒泡，只在 <code>document</code> 节点上注册原生的 DOM 事件，React 内部自己管理所有组件的事件处理函数，以及事件的冒泡、捕获。</p>
<p>所以说，如果你通过 <code>addEventListener</code> 注册了某个 DOM 节点的某事件处理函数，并且通过 <code>e.stopPropagation();</code> 阻断了事件的冒泡或者捕获，那么该节点下的所有节点上，同类型的 React 事件处理函数都会失效。</p>
<p>如下示例，虽然设置的链接的点击事件，但是它却执行不了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CounterLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.querySelector('.my-link').addEventListener('click', (e) => {
      console.info('raw click');
      e.stopPropagation();
    })
  }
  handleClick(e) {
    e.preventDefault();
    console.info('react click');
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div className=&quot;my-link&quot;>
        <a href=&quot;#&quot; onClick={this.handleClick}>Clicked me {this.state.count} times.</a>    
      </div>
    )
  }
}
ReactDOM.render(<CounterLink/>, document.querySelector(&quot;#root&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CounterLink</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  componentDidMount() {
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.my-link'</span>).addEventListener(<span class="hljs-string">'click'</span>, (e) =&gt; {
      <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'raw click'</span>);
      e.stopPropagation();
    })
  }
  handleClick(e) {
    e.preventDefault();
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'react click'</span>);
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> });
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"my-link"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>Clicked me {this.state.count} times.<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>    
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CounterLink</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#root"</span>));</code></pre>
<p><a href="https://codepen.io/Sarike/pen/gXrVRv" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/gXrVRv" data-typeid="3">点击预览</button></p>
<h1 id="articleHeader5">如何绑定事件处理函数的 this</h1>
<p>在以类继承的方式定义的组件中，为了能方便地调用当前组件的其他成员方法或属性（如：this.state），通常需要将事件处理函数运行时的 this 指向当前组件实例。</p>
<p>如下面的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return <a href=&quot;#&quot; onClick={this.handleClick}>Clicked me {this.state.count} times.</a>    
  }

}

ReactDOM.render(<Link/>, document.querySelector(&quot;#root&quot;))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Link</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      count: <span class="hljs-number">0</span>
    }
  }
  handleClick(e) {
    e.preventDefault();
    <span class="hljs-keyword">this</span>.setState({ count: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> })
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;a href=<span class="hljs-string">"#"</span> onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;<span class="hljs-type">Clicked</span> me {<span class="hljs-keyword">this</span>.state.count} times.&lt;/a&gt;    
  }

}

<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">Link</span>/&gt;, document.querySelector(<span class="hljs-string">"#root"</span>))</code></pre>
<p>当点击链接时，控制台会报错：<code>Uncaught TypeError: Cannot read property 'setState' of undefined</code>，就是因为没有将 <code>handleClick</code> 运行时的 this 绑定到当前组件。</p>
<p>绑定事件处理函数的 this 到当前组件，有如下几种方式。</p>
<p><strong>第一种方式</strong>，通过 bind 方法，原地绑定事件处理函数的 this 指向，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#&quot; onClick={this.handleClick.bind(this)}>
    Clicked me {this.state.count} times.
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"#"</span> onClick={this<span class="hljs-selector-class">.handleClick</span><span class="hljs-selector-class">.bind</span>(this)}&gt;
    Clicked me {this<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.count</span>} times.
&lt;/a&gt;</code></pre>
<p>这种方式的优点是书写起来相对简单，但是每次渲染都会执行 bind 方法生成一个新的函数，会有额外的开销，由于事件处理函数是作为属性传递的，所以从而导致子组件进行重新渲染，显然这不是一种好的方式。</p>
<p><strong>第二种方式</strong>，通过一个箭头函数将真实的事件处理函数包装一下，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#&quot; onClick={e => this.handleClick(e)}>
    Clicked me {this.state.count} times.
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-variable">&lt;a href="#" onClick={e =&gt;</span> this.handleClick(e)}&gt;
    Clicked me {this.<span class="hljs-keyword">state</span>.count} times.
&lt;/a&gt;</code></pre>
<p>这种方式书写起来也不算麻烦，不过也没有解决第一种方式面临的性能开销和重新渲染的问题。但是这种方式的一个好处是能清晰描述事件处理函数接收的参数列表（这一点可能因人而异，个人观点觉得这是一个优点）。</p>
<p><strong>第三种方式</strong>，在 constructor 中预先将所有的事件处理函数通过 bind 方法进行绑定。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    
    // 重点在这里
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return <a href=&quot;#&quot; onClick={this.handleClick}>Clicked me {this.state.count} times.</a>    
  }
}

ReactDOM.render(<Link/>, document.querySelector(&quot;#root&quot;))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Link</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      count: <span class="hljs-number">0</span>
    }
    
    <span class="hljs-comment">// 重点在这里</span>
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  handleClick(e) {
    e.preventDefault();
    <span class="hljs-keyword">this</span>.setState({ count: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> })
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;a href=<span class="hljs-string">"#"</span> onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;<span class="hljs-type">Clicked</span> me {<span class="hljs-keyword">this</span>.state.count} times.&lt;/a&gt;    
  }
}

<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">Link</span>/&gt;, document.querySelector(<span class="hljs-string">"#root"</span>))</code></pre>
<p>这种方式能解决前两种方式面临的额外开销和重新渲染的问题，但是写起来略微有点复杂，因为一个事件处理函数要分别在三个不同的地方进行定义、绑定 this 和使用。</p>
<p><strong>第四种方式</strong>，使用类的成员字段定义语法，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  handleClick = e => {
    e.preventDefault();
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return <a href=&quot;#&quot; onClick={this.handleClick}>Clicked me {this.state.count} times.</a>    
  }
}
ReactDOM.render(<Link/>, document.querySelector(&quot;#root&quot;))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Link</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  }
  handleClick = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    e.preventDefault();
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> })
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>Clicked me {this.state.count} times.<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>    
  }
}
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#root"</span>))</code></pre>
<p>这种方式解决了上面三种方式面临的性能开销、重新渲染以及书写麻烦的问题。唯一的问题就是这种语法目前处于 Stage 3，还未纳入到正式的 ES 规范中。参考：<a href="https://github.com/tc39/proposal-class-fields" rel="nofollow noreferrer" target="_blank">https://github.com/tc39/propo...</a></p>
<p>不过这也没太大关系。</p>
<h1 id="articleHeader6">总结</h1>
<p>本文的内容并不多，可能说的有点啰嗦。简单总结一下，React 中通过设置组件的 <a href="https://reactjs.org/docs/events.html#supported-events" rel="nofollow noreferrer" target="_blank">事件属性</a> 来注册事件，React 内部自己实现了一套包含冒泡、捕获逻辑在内的事件机制，所以尽量不要使用 <code>addEventListener</code>，除非你知道自己在干什么。有四种为事件处理函数绑定 this 的方法，推荐使用类属性定义的方式来定义处理函数，如果你不太在意哪一点性能开销的话，可以使用箭头函数包装真实事件回调的方式。另外，事件对象在 React 中是被复用的，事件回调被执行以后，事件对象的所有属性会被重置为 null，所以不要在异步的过程中使用事件对象。</p>
<p><strong>好了，有什么疑问可以加微信群交流，我的微信号：<code>leobaba88</code>，验证信息：玩转 React。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转 React（六）- 处理事件

## 原文链接
[https://segmentfault.com/a/1190000011877137](https://segmentfault.com/a/1190000011877137)

