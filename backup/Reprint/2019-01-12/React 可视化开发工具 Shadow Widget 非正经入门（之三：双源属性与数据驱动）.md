---
title: 'React 可视化开发工具 Shadow Widget 非正经入门（之三：双源属性与数据驱动）' 
date: 2019-01-12 2:30:25
hidden: true
slug: rrcax8ys5b
categories: [reprint]
---

{{< raw >}}

                    
<p>本系列博文从 Shadow Widget 作者的视角，解释该框架的设计要点。本篇讲解双源属性、不可变数据、事件驱动等。</p>
<p><span class="img-wrap"><img data-src="/img/bVOWCc?w=812&amp;h=590" src="https://static.alili.tech/img/bVOWCc?w=812&amp;h=590" alt="Love job" title="Love job" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1. React 中的隐式双源</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mainComp = null;

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class DivText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:'Wayne'};
    mainComp = this;
  }
  
  render() {
    return (
      <div key='main'>
        <Welcome key='txt' name={this.state.name} />
      </div>
    );
  }
}

ReactDOM.render(
  <DivText />,
  document.getElementById('root')
);

setTimeout( function() {
  mainComp.setState({name:'George'});
},5000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mainComp = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DivText</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">name</span>:<span class="hljs-string">'Wayne'</span>};
    mainComp = <span class="hljs-keyword">this</span>;
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'main'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Welcome</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'txt'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{this.state.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

ReactDOM.render(
  <span class="hljs-tag">&lt;<span class="hljs-name">DivText</span> /&gt;</span>,
  document.getElementById('root')
);

setTimeout( function() {
  mainComp.setState({name:'George'});
},5000);</span></code></pre>
<p>这个例子创建的 component 树如下图，<code>main</code> 节点的 <code>state.name</code> 传递给 <code>txt</code> 节点用作 <code>props.name</code>。<code>txt</code> 节点初始显示 <code>"Hello, Wayne"</code>，过 5 秒后切换为 <code>"Hello, George"</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <root node>
  +-- main      // div
  |   +-- txt   // h1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> <span class="hljs-params">&lt;root node&gt;</span>
  +-- main      <span class="hljs-comment">// div</span>
  |   +-- txt   <span class="hljs-comment">// h1</span></code></pre>
<p>我们研究一下 5 秒后切换都发生了什么，<code>mainComp.setState({name:'George'})</code> 一句更改 <code>main</code> 节点的 <code>state.name</code>，然后系统触发下级 <code>txt</code> 节点的 <code>props.name</code> 变化，再驱动 <code>txt</code> 节点内容刷新。</p>
<p>本处 React 技术实现让初学者很费解，<code>main</code> 节点的 <code>render</code> 函数用 JSX 返回 Element，并非每次渲染都用 <code>&lt;Welcome&gt;</code> 创建子节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  render() {
    return (
      <div key='main'>
        <Welcome key='txt' name={this.state.name} />
      </div>
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'main'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Welcome</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'txt'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{this.state.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }</span></code></pre>
<p>而是首次渲染时创建一次，其后 <code>render()</code> 调用只对已存在的节点做更新，由 <code>props.name</code> 变化驱动子节点内容刷新。所以，<strong>上面 <code>txt</code> 节点的 <code>props.name</code> 对节点自身来说，是不变量，但对父节点来说，是可变量</strong>。由 <code>state.xxx</code> 驱动刷新与 <code>props.xxx</code> 驱动刷新本质是一回事，只不过 React 编程模型在表面弄了一点限制。</p>
<p><code>props.xxx</code> 驱动的刷新是一个源头，<code>state.xxx</code> 驱动的刷新是另一个源头，合起来是 "双源驱动"。</p>
<h2 id="articleHeader1">2. 改造双源驱动</h2>
<p>由于 React 限定本节点 <code>props.xxx</code> 是只读的，我们通过改造，让一个节点既接受 <code>props.xxx</code> 驱动，也接受 <code>state.xxx</code> 驱动。让 React 隐式的双源驱动，变成显式的双源驱动，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var txtComp = null;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:props.name};
    this.oldName = props.name;
    txtComp = this;
  }

  render() {
    var name = this.state.name;
    if (this.oldName !== this.props.name)
      name = this.state.name = this.oldName = this.props.name;
    return <h1>Hello, {name}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> txtComp = <span class="hljs-literal">null</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">name</span>:props.name};
    <span class="hljs-keyword">this</span>.oldName = props.name;
    txtComp = <span class="hljs-keyword">this</span>;
  }

  render() {
    <span class="hljs-keyword">var</span> name = <span class="hljs-keyword">this</span>.state.name;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.oldName !== <span class="hljs-keyword">this</span>.props.name)
      name = <span class="hljs-keyword">this</span>.state.name = <span class="hljs-keyword">this</span>.oldName = <span class="hljs-keyword">this</span>.props.name;
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
}</code></pre>
<p>这样，在 <code>txt</code> 节点，既可用 <code>txtComp.setState({name:'George'})</code> 驱动刷新，也可由父节点传入的 <code>props.name</code> 变化来驱动刷新。我们额外要做的是，在 <code>txt</code> 节点用 <code>this.oldName</code> 记录 <code>props.name</code> 旧值，由 <code>this.oldName !== this.props.name</code> 来识别传入 <code>props.name</code> 是否变化了。</p>
<p>这么改造的意义在于：</p>
<ol>
<li>自身状态变迁与父级驱动变迁，是两种普遍存在的现象，我们引用正规的 "双源驱动" 概念，便于将两种源头归一，如后面叙述，用 <code>this.duals.xxx</code> 表达，归一后才能构造事件发布与订阅的机制。</li>
<li>React 让 props 属性只读的设计有点尴尬，有违普遍认知。   <br>如前面介绍，它不是不可变，而是限定本级与下级不可修改，这个规则对保障单向数据传递有利。但大众对 DOM 节点的认知是这样的，以 <code>&lt;input&gt;</code> 为例，<code>type='button'</code> 这个属性可以用 <code>props.type</code> 表达，因为生存周期里它不该有变化，而 <code>title='for test'</code> 属性应让本节点参与管理，生存期内可变。</li>
</ol>
<p>让自身节点管理类似 <code>props.name, props.title</code> 的属性，大致有两种方法，其一，采取上面介绍的方法，让两个源头归一，再驱动本节点输出。其二，按严格的单向数据流要求，把代码写成下面样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  
  setName(newName) {
    mainComp.setState({name:newName});
  }
  
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  
  setName(newName) {
    mainComp.setState({<span class="hljs-attr">name</span>:newName});
  }
  
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
}</code></pre>
<p>也就是借助父节点的 <code>setState()</code> 实现刷新，理论上，这也是单向数据流，理解有点别扭，自身节点的属性不能直接管理，非要到父节点跑一圈。</p>
<p><span class="img-wrap"><img data-src="/img/bVO6wi?w=251&amp;h=144" src="https://static.alili.tech/img/bVO6wi?w=251&amp;h=144" alt="结点关系" title="结点关系" style="cursor: pointer;"></span></p>
<p>Shadow Widget 双源驱动的优点在于 <strong>"让 DOM 节点功能回归本原"</strong>，让 <code>props.xxx</code> 服务于生存周期中不变量，让 <code>duals.xxx</code> 服务于可变量，<code>state.xxx</code> 也服务于可变量，但倾向于用来表达自身节点的私有状态。</p>
<p><a href="https://github.com/reflux/refluxjs" rel="nofollow noreferrer" target="_blank">reflux</a> 为实现 React flux 机制，仿 component 接口设计了 store，如果没有上述 <code>props.xxx</code> 限制，我相信把 component 与 store 合一远优于现有设计。回归原本的设计好处是潜在的，因为倾斜的地基会导致上层建筑更加倾斜。</p>
<h2 id="articleHeader2">3. 数据侦听机制</h2>
<p>Shadow Widget 将双源驱动归一后，用 <code>duals.attr</code> 存取属性，而且系统内部对读写 <code>duals.attr</code> 做了封装，"读属性" 自动转从 <code>state.attr</code> 读值，"写属性" 则封装成事件驱动机制，等效于调用 <code>comp.setState({attr:value})</code>，但它所做的事远不止这个，还包括：</p>
<ol>
<li>用户可以调用 <code>comp.defineDual(attr,setterFunc)</code> 注册自定义的 setter 函数，甚至对同一 <code>duals.attr</code> 多次注册不同 settrer 函数，比如基类定义一个 setter 函数，继承类中再定义另一个 setter，两个 setter 会依顺被调用。即 <code>duals.attr</code> 的 setter 也具有一种可继承的机制。</li>
<li>
<code>duals.attr</code> 可被侦听，被侦听后源头 <code>duals.attr</code> 若发生变化，相应的侦听函数将自动被调起。</li>
<li>多个 component 节点的双源属性可以串接，源头更改其它地方会自动更新。</li>
<li>对某节点的 <code>duals.attr</code> 赋值，会导致多种联动响应，如果导致本节点其它双源属性更新，更新将在同一周期立即进行，如果导致其它节点的双源属性更新，将在下一周期在其它节点 <code>render()</code> 时进行，如果触发侦听事件，也在下一周期调用侦听函数。Shadow Widget 对 <code>duals.attr</code> 赋值的设计，已兼顾考虑了本节点内双源属性递归回调的效率，也保证了数据流传递的单向性。</li>
<li>在各节点注册 <code>duals.attr</code> 的 setter 函数、侦听函数，能自动适应它的生存周期。比如 B 节点侦听 A 节点的 <code>duals.attr</code>，无论 A 节点，还是 B 节点先被卸载，侦听链都会自动断开。</li>
</ol>
<p>侦听源节点的双源属性，常见代码有这么两种写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  sourceComp.listen('attr',targetComp,'attrMethod');
  sourceComp.listen('attr',function(value,oldValue){});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  sourceComp.listen(<span class="hljs-string">'attr'</span>,targetComp,<span class="hljs-string">'attrMethod'</span>);
  sourceComp.listen(<span class="hljs-string">'attr'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,oldValue</span>)</span>{});</code></pre>
<p>第 1 行写法的效果是：sourceComp.duals.attr 发生变化后，自动触发 targetComp['attrMethod'] 的函数调用。第 2 行则触发由参数指定的回调函数。</p>
<h2 id="articleHeader3">4. 数据更新的判断依据</h2>
<p>Shadow Widget 采用 "恒等比较" 的方式判断两个数值是否更改为，在 <code>comp.duals.attr = value</code> 与 <code>comp.setState({attr:value})</code> 语句中，当所赋新值（<code>value</code>）与旧值恒等（即 <code>===</code>），则视作数据未更新，也就不会触发相应的 setter 调用或 listen 调用。</p>
<p>Shadow Widget 已为各构件配置 <code>shouldComponentUpdate()</code> 与 <code>componentWillReceiveProps()</code> 缺省处理，除非有特别理由，您不应改变缺省 "以各属性新旧值是否恒等" 的判断方式。</p>
<p>至于如何对 Array 或 Object 快速构造新数据，以便被系统判断为 "非恒等"，我们建议用 React addon 提供的 <code>update</code> 接口，Shadow Widget 已缺省内置该函数，即 <code>ex.update()</code>，请参考 Shadow Widget 的 API 手册。</p>
<h2 id="articleHeader4">5. 自动定义的双源属性</h2>
<p>双源属性一般要调用 <code>comp.defineDual()</code> 注册后才使用，但对于 DOM 节点内置属性是例外，如 <code>title, id, name</code> 等，这些属性只要节点在创建时，传入的 <code>props</code> 用到了，就会被系统自动注册为双源属性。</p>
<p>另外，命名为 <code>data-*, aria-*, dual-*</code> 的属性，也自动注册为双源属性。</p>
<p>自动注册双源属性的设计目的是为了简化编程，如果遇到不想变成双源属性却自动注册了的情况，不使用 <code>duals.xxx</code> 即可。</p>
<p>（本文完）</p>
<p>本专栏历史文章：</p>
<ol>
<li><a href="https://segmentfault.com/a/1190000009688749">介绍一项让 React 可以与 Vue 抗衡的技术</a></li>
<li><a href="https://segmentfault.com/a/1190000009719938" target="_blank">React 可视化开发工具 Shadow Widget 非正经入门（之一：React 三宗罪）</a></li>
<li><a href="https://segmentfault.com/a/1190000009742514">React 可视化开发工具 Shadow Widget 非正经入门（之二：分离界面设计）</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 可视化开发工具 Shadow Widget 非正经入门（之三：双源属性与数据驱动）

## 原文链接
[https://segmentfault.com/a/1190000009756694](https://segmentfault.com/a/1190000009756694)

