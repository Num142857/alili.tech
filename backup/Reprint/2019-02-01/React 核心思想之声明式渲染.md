---
title: 'React 核心思想之声明式渲染' 
date: 2019-02-01 2:30:10
hidden: true
slug: wzhng1fv9b
categories: [reprint]
---

{{< raw >}}

                    
<p>React 发展很快，概念也多，本文目的在于帮助初学者理清 React 核心概念。</p>
<p>React 及 React 生态</p>
<p><span class="img-wrap"><img data-src="http://www.ruanyifeng.com/blogimg/asset/2016/bg2016092301.png" src="https://static.alili.techhttp://www.ruanyifeng.com/blogimg/asset/2016/bg2016092301.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>React 的核心概念只有 2 点：</p>
<ul>
<li><p>声明式渲染(Declarative)</p></li>
<li><p>基于组件(Component-Based)</p></li>
</ul>
<h2 id="articleHeader0">声明式渲染</h2>
<h3 id="articleHeader1">声明式与命令式</h3>
<ul>
<li><p>命令式编程：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。</p></li>
<li><p>声明式编程：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="http://note.youdao.com/yws/public/resource/7a41fe2b3bf3998ade89bf3cdbfe8b55/WEBRESOURCE9d1a28a088c1183ed2f96c850f39272e" src="https://static.alili.techhttp://note.youdao.com/yws/public/resource/7a41fe2b3bf3998ade89bf3cdbfe8b55/WEBRESOURCE9d1a28a088c1183ed2f96c850f39272e" alt="" title="" style="cursor: pointer;"></span></p>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 命令式关注如何做（how）

var numbers = [1,2,3,4,5]

var doubled = []

for(var i = 0; i < numbers.length; i++) {

  var newNumber = numbers[i] * 2
  doubled.push(newNumber)

}
console.log(doubled) //=> [2,4,6,8,10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 命令式关注如何做（how）</span>

<span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]

<span class="hljs-keyword">var</span> doubled = []

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; numbers.length; i++) {

  <span class="hljs-keyword">var</span> newNumber = numbers[i] * <span class="hljs-number">2</span>
  doubled.push(newNumber)

}
<span class="hljs-built_in">console</span>.log(doubled) <span class="hljs-comment">//=&gt; [2,4,6,8,10]</span></code></pre>
<p>遍历整个数组，取出每个元素，乘以二，然后把翻倍后的值放入新数组，每次都要操作这个双倍数组，直到计算完所有元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明式关注做什么（what）

var numbers = [1,2,3,4,5]

var doubled = numbers.map(function(n) {

  return n * 2
})
console.log(doubled) //=> [2,4,6,8,10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 声明式关注做什么（what）</span>

<span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]

<span class="hljs-keyword">var</span> doubled = numbers.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{

  <span class="hljs-keyword">return</span> n * <span class="hljs-number">2</span>
})
<span class="hljs-built_in">console</span>.log(doubled) <span class="hljs-comment">//=&gt; [2,4,6,8,10]</span></code></pre>
<p>map 函数所作的事情是将直接遍历整个数组的过程归纳抽离出来，让我们专注于描述我们想要的是什么(what)。</p>
<h3 id="articleHeader2">模板渲染</h3>
<p>渲染：模板 =&gt; HTML =&gt; 页面视图</p>
<p>发生在服务器的叫后端模板渲染，公司用的是<code>velocity</code>。</p>
<p>发生在客户端的叫前端模板渲染，常用的有 <a href="https://github.com/aui/artTemplate" rel="nofollow noreferrer" target="_blank">artTemplate</a>。</p>
<p>以 <code>artTemplate</code> 为例。</p>
<ul><li><p>模板</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script id=&quot;test&quot; type=&quot;text/html&quot;>
    <div>
        <h2>北京时间： "{{" date.toLocaleTimeString() "}}".</h2>
    </div>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>北京时间： </span><span class="hljs-template-variable">"{{" date.toLocaleTimeString() "}}"</span><span class="xml">.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul>
<li><p>数据</p></li>
<li><p>渲染</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setInterval(function() {
    // 数据
    var data = {
        date: new Date()
    };
    // 渲染（将数据和模板绑定在）
    var html = template('test', data);
    // 渲染
    document.getElementById('container').innerHTML = html;
},100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 数据</span>
    <span class="hljs-keyword">var</span> data = {
        <span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    };
    <span class="hljs-comment">// 渲染（将数据和模板绑定在）</span>
    <span class="hljs-keyword">var</span> html = template(<span class="hljs-string">'test'</span>, data);
    <span class="hljs-comment">// 渲染</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>).innerHTML = html;
},<span class="hljs-number">100</span>)</code></pre>
<h3 id="articleHeader3">React 声明式渲染</h3>
<p>和普通模板不同的是，React 模板写在 JS 文件中，而不是 html 的 <code>&lt;script&gt;</code> 标签中。能使用所有 JS 语法，而不只有模板语法，所以更加灵活。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

// 数据
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

// 模板
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

// 渲染
ReactDOM.render(
  element,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatName</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">return</span> user.firstName + <span class="hljs-string">' '</span> + user.lastName;
}

<span class="hljs-comment">// 数据</span>
<span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Harper'</span>,
  <span class="hljs-attr">lastName</span>: <span class="hljs-string">'Perez'</span>
};

<span class="hljs-comment">// 模板</span>
<span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
    Hello, {formatName(user)}!
  <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
);

<span class="hljs-comment">// 渲染</span>
ReactDOM.render(
  element,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>React 可局部渲染，且只渲染改变了的数据。纯模板只能整体渲染。</p>
<p>高效的局部渲染意味着，开发者 只需要维护可变的数据 <strong>state</strong> (what) ，让 react 框架帮助我们处理 DOM 操作(what)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// React.createClass 创建模板容器（类）
class Clock extends Component {
  render() {
      return (
          <div>
              <h2>北京时间： { this.props.date.toLocaleTimeString() }</h2>
          </div>
      );
  }
}

setInterval(function() {
    // ReactDOM.render 渲染指令
    ReactDOM.render(
      // date 数据
      <Clock date={new Date()} />,
      document.getElementById('container')
    );
}, 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// React.createClass 创建模板容器（类）</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
      <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>北京时间： { this.props.date.toLocaleTimeString() }<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
  }
}

setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ReactDOM.render 渲染指令</span>
    ReactDOM.render(
      <span class="hljs-comment">// date 数据</span>
      &lt;Clock date={<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()} /&gt;,
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
    );
}, <span class="hljs-number">100</span>);</code></pre>
<p>state 只用于存放可变的数据。</p>
<p>通过 setState 告诉 react 什么数据变了，React 会自动更新数据改变部分的视图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Clock extends Component {
  // 初始化
  constructor(props) {
    super(props);
    // state 只用于存放可变的状态
    this.state = {date: new Date()};
  }
  // 初始化完成后执行
  componentDidMount() {
    setInterval(() => {
      // setState 在修改 state 参数后会自动调用 render 方法。
      this.setState({
        date: new Date()
      })
    },100)
  }

  render() {
      return <h2>北京时间： { this.state.date.toLocaleTimeString() }</h2>
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('js-main')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 初始化</span>
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-comment">// state 只用于存放可变的状态</span>
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()};
  }
  <span class="hljs-comment">// 初始化完成后执行</span>
  componentDidMount() {
    setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">// setState 在修改 state 参数后会自动调用 render 方法。</span>
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
      })
    },<span class="hljs-number">100</span>)
  }

  render() {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>北京时间： { this.state.date.toLocaleTimeString() }<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
  }
}

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>,
  document.getElementById('js-main')
);</span></code></pre>
<p><span class="img-wrap"><img data-src="http://image.slidesharecdn.com/reactredux-160310130354/95/react-redux-4-638.jpg?cb=1457615084" src="https://static.alili.techhttp://image.slidesharecdn.com/reactredux-160310130354/95/react-redux-4-638.jpg?cb=1457615084" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>React 通过 diffing 算法计算如何更新视图。而 diffing 算法有个 的假设前提，开发人员会提供给长列表的每个子项一个 ID，帮助算法进行对比。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> numbers = props.numbers;
  <span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function">(<span class="hljs-params">number</span>) =&gt;</span>
    &lt;li key={number.toString()}&gt;
      {number}
    &lt;<span class="hljs-regexp">/li&gt;
  );
  return (
    &lt;ul&gt;{listItems}&lt;/u</span>l&gt;
  );
}

<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NumberList</span> <span class="hljs-attr">numbers</span>=<span class="hljs-string">{numbers}</span> /&gt;</span>,
  document.getElementById('root')
);</span></code></pre>
<h3 id="articleHeader4">完成的渲染流程</h3>
<p>初始化的渲染流程分为 3 步。</p>
<p>第一步，开发者使用 JSX 语法写 React，<code>babel</code> 会将 JSX 编译为浏览器能识别的 React JS 语法。这一步，一般配合 <code>webpack</code> 在本地进行。</p>
<p>第二步，执行 <code>ReactDOM.render</code> 函数，渲染出虚拟DOM。</p>
<p>第三步，react 将虚拟DOM，渲染成真实的DOM。</p>
<p>页面更新的流程同样也是 3 步。</p>
<p>第一步，当页面需要更新时，通过声明式的方法，调用 <code>setState</code> 告诉 react。</p>
<p>第二步，react 自动调用组件的 render 方法，渲染出虚拟 DOM。</p>
<p>第三步，react 会通过 <code>diffing</code> 算法，对比当前虚拟 DOM 和需要更新的虚拟 DOM 有什么区别。然后重新渲染区别部分的真实 DOM。</p>
<p><span class="img-wrap"><img data-src="http://note.youdao.com/yws/public/resource/7a41fe2b3bf3998ade89bf3cdbfe8b55/WEBRESOURCE5ffab2274cfce841fd64e08a6fc34789" src="https://static.alili.techhttp://note.youdao.com/yws/public/resource/7a41fe2b3bf3998ade89bf3cdbfe8b55/WEBRESOURCE5ffab2274cfce841fd64e08a6fc34789" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 核心思想之声明式渲染

## 原文链接
[https://segmentfault.com/a/1190000007463108](https://segmentfault.com/a/1190000007463108)

