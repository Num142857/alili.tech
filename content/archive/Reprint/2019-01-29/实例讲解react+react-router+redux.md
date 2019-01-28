---
title: '实例讲解react+react-router+redux' 
date: 2019-01-29 2:30:10
hidden: true
slug: kljhw25tv5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><strong>总括：</strong> 本文采用react+redux+react-router+less+es6+webpack,以实现一个简易备忘录(todolist)为例尽可能全面的讲述使用react全家桶实现一个完整应用的过程。</p>
<ul>
<li><p>代码地址：<a href="https://github.com/damonare/memos" rel="nofollow noreferrer" target="_blank">React全家桶实现一个简易备忘录</a></p></li>
<li><p>原文博客地址：<a href="http://damonare.github.io/2016/12/19/React%E5%85%A8%E5%AE%B6%E6%A1%B6%E5%AE%9E%E7%8E%B0%E7%AE%80%E6%98%93%E5%A4%87%E5%BF%98%E5%BD%95/#more" rel="nofollow noreferrer" target="_blank">React全家桶实现一个简易备忘录</a></p></li>
<li><p>知乎专栏&amp;&amp;简书专题：<a href="https://zhuanlan.zhihu.com/damonare" rel="nofollow noreferrer" target="_blank">前端进击者（知乎）</a>&amp;&amp;<a href="http://www.jianshu.com/collection/bbaa63e264f5" rel="nofollow noreferrer" target="_blank">前端进击者（简书）</a></p></li>
<li><p>博主博客地址：<a href="http://damonare.cn" rel="nofollow noreferrer" target="_blank">Damonare的个人博客</a></p></li>
</ul>
<p><strong>人生不失意，焉能暴己知。</strong></p>
<h3 id="articleHeader1">技术说明</h3>
<blockquote>
<p>技术架构：本备忘录使用react+react-router+redux+less+ES6+webpack实现;</p>
<p>页面UI参照：<a href="http://www.todolist.cn/" rel="nofollow noreferrer" target="_blank">TodoList官网</a>实现;</p>
<p>在线演示地址：<a href="http://damonare.cn/memos" rel="nofollow noreferrer" target="_blank">Damonare的备忘录</a>;</p>
</blockquote>
<h3 id="articleHeader2">功能说明</h3>
<ul>
<li><p>支持回车添加新事项;</p></li>
<li><p>支持删除事项(点击X符号);</p></li>
<li>
<p>支持状态转换具体包括：</p>
<ul>
<li><p>新建事项-&gt;正在进行(点击checkbox选项)</p></li>
<li><p>正在进行-&gt;已完成(点击文字内容本身)</p></li>
<li><p>正在进行-&gt;新建事项(点击checkbox选项)</p></li>
<li><p>已完成-&gt;正在进行(点击文字本身)</p></li>
</ul>
</li>
<li><p>支持判断输入空字符，过长字符(20个汉字以内);</p></li>
<li><p>支持搜索;</p></li>
<li><p>支持本地化存储;</p></li>
<li><p>支持状态的展开隐藏(点击标题)</p></li>
<li><p>兼容手机端(iPhone6及以上)</p></li>
<li><p>支持路由切换</p></li>
</ul>
<h2 id="articleHeader3">正文</h2>
<h3 id="articleHeader4">1. React浅谈</h3>
<h4>1.1  组件化</h4>
<p>​    毫无疑问，当谈到<code>React</code>的时候不能避免的会提到组件化思想。React刚开始想解决的问题只是UI这一层面的问题，也就是MVC中view层面的问题，不成想如今越滚越大，从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。对于<code>React</code>组件的理解同样要站在view层面的角度出发，一个完整的页面是由大大小小的组件堆叠而成，就好像搭积木，每一块积木都是一个组件，组件套组件组成了用户所能看到的完整的页面。</p>
<h4>1.2  JSX语法糖</h4>
<p>​    使用<code>React</code>，不一定非要使用<code>JSX</code>语法，可以使用原生的JS进行开发。但是<code>React</code>作者强烈建议我们使用<code>JSX</code>，因为<code>JSX</code>在定义类似HTML这种树形结构时，十分的简单明了。这里简单的讲下<code>JSX</code>的由来。</p>
<p>​    比如，下面一个div元素，我们用HTML语法描述为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test&quot;>
  <span>Test</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>如果换做使用javascript描述这个元素呢？最好的方式可以简单的转化为<code>json</code>对象，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type:&quot;div&quot;,
  props:{
    className:&quot;test&quot;,
    children:{
      type:&quot;span&quot;,
      props:{
        children:&quot;Test&quot;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  type:<span class="hljs-string">"div"</span>,
  props:{
    className:<span class="hljs-string">"test"</span>,
    children:{
      type:<span class="hljs-string">"span"</span>,
      props:{
        children:<span class="hljs-string">"Test"</span>
      }
    }
  }
}</code></pre>
<p>这样我们就可以在javascript中创建一个<code>Virtual DOM</code>（虚拟DOM）了。当然，这样是没法复用的，我们再把它封装一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Div=>({text}){
  return {
    type:&quot;div&quot;,
    props:{
      className:&quot;test&quot;,
      children:{
        type:&quot;span&quot;,
        props:{
          children: text,
        },
      },
    },
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Div=&gt;({text}){
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>:<span class="hljs-string">"div"</span>,
    <span class="hljs-attr">props</span>:{
      <span class="hljs-attr">className</span>:<span class="hljs-string">"test"</span>,
      <span class="hljs-attr">children</span>:{
        <span class="hljs-attr">type</span>:<span class="hljs-string">"span"</span>,
        <span class="hljs-attr">props</span>:{
          <span class="hljs-attr">children</span>: text,
        },
      },
    },
  }
}</code></pre>
<p>接下来再实现这个div就可以直接调用Div('Test')来创建。但上述结构看起来实在让人不爽，写起来也很容易写混，一旦结构复杂了，很容易让人找不着北，于是<code>JSX</code>语法应运而生。我们用写HTML的方式写这段代码，再经过翻译器转换成javascript后交给浏览器执行。上述代码用<code>JSX</code>重写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Div =()=>(
<div className=&quot;test&quot;>
  <span>Test</span>
</div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> Div =<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"test"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<p>多么简单明了！！！具体的<code>JSX语法</code>不多说了，学习更多戳这：<a href="http://reactjs.cn/react/docs/jsx-in-depth.html" rel="nofollow noreferrer" target="_blank">JSX in Depth</a></p>
<h4>1.3  Virtual DOM</h4>
<p>其实上面已经提到了<code>Virtual DOM</code>，它的存在也是<code>React</code>长久不衰的原因之一，虚拟DOM的概念并不是FB首创却在FB的手上大火了起来(后台是多么重要)。</p>
<p>我们知道真实的页面对应了一个DOM树，在传统页面的开发模式中，每次需要更新页面时，都需要对DOM进行更新，DOM操作十分昂贵，为减少对于真实DOM的操作，诞生了<code>Virtual DOM</code>的概念，也就是用javascript把真实的DOM树描述了一遍，使用的也就是我们刚刚说过的<code>JSX</code>语法。对比如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007862106?w=500&amp;h=304" src="https://static.alili.tech/img/remote/1460000007862106?w=500&amp;h=304" alt="Virtual DOM原理" title="Virtual DOM原理" style="cursor: pointer;"></span></p>
<p>每次数据更新之后，重新计算<code>Virtual DOM</code>，并和上一次的<code>Virtual DOM</code>对比，对发生的变化进行批量更新。React也提供了<code>shouldComponentUpdate</code>生命周期回调，来减少数据变化后不必要的<code>Virtual DOM</code>对比过程，提升了性能。</p>
<p><code>Virtual DOM</code>虽然渲染方式比传统的DOM操作要好一些，但并不明显，因为对比DOM节点也是需要计算的，最大的好处在于可以很方便的和其它平台集成，比如<code>react-native</code>就是基于<code>Virtual DOM</code>渲染出原生控件。具体渲染出的是<code>Web DOM</code>还是<code>Android</code>控件或是<code>iOS</code>控件就由平台决定了。所以我们说<code>react</code>的出现是一场革命，一次对于<code>native app</code>的宣战,就像<code>react-native</code>那句口号——<strong>Learn Once,Write Anywhere</strong>.</p>
<h4>1.4 函数式编程</h4>
<p>​    过去编程方式主要是以命令式编程为主，什么意思呢？简单说电脑的思维方式和我们人类的思考方式是不一样的。我们人类的大脑擅长的是分析问题，提出一个解决问题的方案，电脑则是生硬的执行指令，命令式编程就像是给电脑下达命令，让电脑去执行一样，现在主要的编程语言（比如：Java，C，C++等）都是由命令式编程构建起来的。</p>
<p>​   而函数式编程就不一样了，这是模仿我们人类的思维方式发明出来的。例如：操作某个数组的每一个元素然后返回一个新数组，如果是计算机的思考方式，会这样想：创建一个新数组=&gt;遍历旧数组=&gt;给新数组赋值。如果是人类的思考方式，会这样想：创建一个数组方法，作用在旧数组上，返回新数组。这样此方法可以被重复利用。而这就是函数式编程了。</p>
<h4>1.5 数据流</h4>
<p>在React中，数据的流动是单向的，即从父节点传递到子节点。也因此组件是简单的，他们只需要从父组件获取props渲染即可。如果顶层的props改变了，React会递归的向下遍历整个组件树，重新渲染所有使用这个属性的组件。那么父组件如何获取子组件数据呢？很简单，通过回调就可以了，父组件定义某个方法供给子组件调用，子组件调用方法传递给父组件数据，Over。</p>
<h3 id="articleHeader5">2. React-router</h3>
<p>这东西我觉得没啥难度，官方例子都很不错，跟着官方例子来一遍基本就明白到底是个啥玩意了，官方例子：<a href="https://github.com/reactjs/react-router-tutorial/tree/master/lessons" rel="nofollow noreferrer" target="_blank"><strong>react-router-tutorial。</strong></a></p>
<p>完事以后可以再看一下阮一峰老师的教程，主要是对一些API的讲解：<a href="http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu" rel="nofollow noreferrer" target="_blank">React Router 使用教程</a>。</p>
<p>还有啥不明白的欢迎评论留言共同探讨。</p>
<h3 id="articleHeader6">3. Redux</h3>
<h4>3.1 简介</h4>
<p>随着 JavaScript 单页应用开发日趋复杂，<strong>JavaScript 需要管理比任何时候都要多的 state （状态）</strong>。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。乱！</p>
<p>这时候<code>Redux</code>就强势登场了，现在你可以把<code>React</code>的model看作是一个个的子民，每一个子民都有自己的一个状态，纷纷扰扰，各自维护着自己状态，我行我素，那哪行啊！太乱了，我们需要一个King来领导大家，我们就可以把<code>Redux</code>看作是这个King。网罗所有的组件组成一个国家，掌控着一切子民的状态！防止有人叛乱生事！</p>
<p>这个时候就把组件分成了两种：容器组件(King或是路由)和展示组件(子民)。</p>
<ul>
<li><p>容器组件：即<code>redux</code>或是<code>router</code>,起到了维护状态，出发action的作用，其实就是King高高在上下达指令。</p></li>
<li><p>展示组件：不维护状态，所有的状态由容器组件通过<code>props</code>传给他，所有操作通过回调完成。</p></li>
</ul>
<table>
<thead><tr>
<th align="center"> </th>
<th align="center">展示组件</th>
<th align="center">容器组件</th>
</tr></thead>
<tbody>
<tr>
<td align="center">作用</td>
<td align="center">描述如何展现（骨架、样式）</td>
<td align="center">描述如何运行（数据获取、状态更新）</td>
</tr>
<tr>
<td align="center">直接使用 Redux</td>
<td align="center">否</td>
<td align="center">是</td>
</tr>
<tr>
<td align="center">数据来源</td>
<td align="center">props</td>
<td align="center">监听 Redux state</td>
</tr>
<tr>
<td align="center">数据修改</td>
<td align="center">从 props 调用回调函数</td>
<td align="center">向 Redux 派发 actions</td>
</tr>
<tr>
<td align="center">调用方式</td>
<td align="center">手动</td>
<td align="center">通常由 React Redux 生成</td>
</tr>
</tbody>
</table>
<p>Redux三大部分：<code>store</code>,<code>action</code>,<code>reducer</code>。相当于King的直系下属。</p>
<p>那么也可以看出<code>Redux</code>只是一个状态管理方案，完全可以单独拿出来使用，这个King不仅仅可以是React的，去Angular，Ember那里也是可以做King的。在React中维系King和组件关系的库叫做<code>&nbsp;react-redux</code>。</p>
<p>， 它主要有提供两个东西：<code>Provider</code> 和<code> connect</code>，具体使用文后说明。</p>
<p>提供几个Redux的学习地址：<a href="http://cn.redux.js.org/index.html" rel="nofollow noreferrer" target="_blank">官方教程-中文版</a>，<a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html" rel="nofollow noreferrer" target="_blank">Redux 入门教程（一）：基本用法</a></p>
<h4>3.2 Store</h4>
<p>Store 就是保存数据的地方，它实际上是一个<code>Object tree</code>。整个应用只能有一个 Store。这个Store可以看做是King的首相，掌控一切子民(组件)的活动(state)。</p>
<p>Redux 提供<code>createStore</code>这个函数，用来生成 Store。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';
const store = createStore(func);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">const</span> store = createStore(func);</code></pre>
<p>createStore接受一个函数作为参数，返回一个Store对象(首相诞生记)</p>
<p>我们来看一下Store(首相)的职责：</p>
<ul>
<li><p>维持应用的 state；</p></li>
<li><p>提供&nbsp;<a href="http://cn.redux.js.org/docs/api/Store.html#getState" rel="nofollow noreferrer" target="_blank"><code>getState()</code></a>&nbsp;方法获取 state；</p></li>
<li><p>提供&nbsp;<a href="http://cn.redux.js.org/docs/api/Store.html#dispatch" rel="nofollow noreferrer" target="_blank"><code>dispatch(action)</code></a>&nbsp;方法更新 state；</p></li>
<li><p>通过&nbsp;<a href="http://cn.redux.js.org/docs/api/Store.html#subscribe" rel="nofollow noreferrer" target="_blank"><code>subscribe(listener)</code></a>&nbsp;注册监听器;</p></li>
<li><p>通过&nbsp;<a href="http://cn.redux.js.org/docs/api/Store.html#subscribe" rel="nofollow noreferrer" target="_blank"><code>subscribe(listener)</code></a>&nbsp;返回的函数注销监听器。</p></li>
</ul>
<h4>3.3 action</h4>
<p>State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。即store的数据变化来自于用户操作。action就是一个通知，它可以看作是首相下面的邮递员，通知子民(组件)改变状态。它是 store 数据的<strong>唯一</strong>来源。一般来说会通过&nbsp;<a href="http://cn.redux.js.org/docs/api/Store.html#dispatch" rel="nofollow noreferrer" target="_blank"><code>store.dispatch()</code></a>&nbsp;将 action 传到 store。</p>
<p>Action 是一个对象。其中的<code>type</code>属性是必须的，表示 Action 的名称。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> action = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
  <span class="hljs-attr">payload</span>: <span class="hljs-string">'Learn Redux'</span>
};</code></pre>
<p><strong>Action创建函数</strong></p>
<p><strong>Action 创建函数</strong>&nbsp;就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。</p>
<p>在 Redux 中的 action 创建函数只是简单的返回一个 action:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTodo</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: ADD_TODO,
    text
  }
}</code></pre>
<p>这样做将使 action 创建函数更容易被移植和测试。</p>
<h4>3.4 reducer</h4>
<p><strong>Action</strong>&nbsp;只是描述了<strong>有事情发生了</strong>这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。也就是邮递员(action)只负责通知，具体你(组件)如何去做，他不负责，这事情只能是你们村长(reducer)告诉你如何去做才能符合社会主义核心价值观，如何做才能对建设共产主义社会有利。</p>
<p>专业解释: <strong>Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。</strong></p>
<p>Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reducer = function (state, action) {
  // ...
  return new_state;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> reducer = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> new_state;
};</code></pre>
<h4>3.5 数据流</h4>
<p><strong>严格的单向数据流</strong>是 Redux 架构的设计核心。</p>
<p>Redux 应用中数据的生命周期遵循下面 4 个步骤：</p>
<ul>
<li><p><strong>调用</strong>&nbsp;<a href="http://cn.redux.js.org/docs/api/Store.html#dispatch" rel="nofollow noreferrer" target="_blank"><code>store.dispatch(action)</code></a>。</p></li>
<li><p><strong>Redux store 调用传入的 reducer 函数。</strong></p></li>
<li><p><strong>根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。</strong></p></li>
<li><p><strong>Redux store 保存了根 reducer 返回的完整 state 树</strong>。</p></li>
</ul>
<p>工作流程图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007862107?w=600&amp;h=277" src="https://static.alili.tech/img/remote/1460000007862107?w=600&amp;h=277" alt="redux工作原理图" title="redux工作原理图" style="cursor: pointer;"></span></p>
<h4>3.6 Connect</h4>
<p>这里需要再强调一下：Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。</p>
<p>尽管如此，Redux 还是和&nbsp;<a href="http://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>&nbsp;和&nbsp;<a href="https://github.com/dekujs/deku" rel="nofollow noreferrer" target="_blank">Deku</a>&nbsp;这类框架搭配起来用最好，因为这类框架允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。</p>
<p>Redux 默认并不包含&nbsp;<a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">React 绑定库</a>，需要单独安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react-redux" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="text" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save react-redux</span></code></pre>
<p>当然，我们这个实例里是不需要的，所有需要的依赖已经在package.json里配置好了。</p>
<p><code>React-Redux</code> 提供<code>connect</code>方法，用于从 UI 组件生成容器组件。<code>connect</code>的意思，就是将这两种组件连起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from 'react-redux';
const TodoList = connect()(Memos);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">const</span> TodoList = connect()(Memos);</code></pre>
<p>上面代码中<code>Memos</code>是个UI组件，<code>TodoList</code>就是由 React-Redux 通过<code>connect</code>方法自动生成的容器组件。</p>
<p>而只是纯粹的这样把Memos包裹起来毫无意义，完整的connect方法这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from 'react-redux'
const TodoList = connect(
  mapStateToProps
)(Memos)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">const</span> TodoList = connect(
  mapStateToProps
)(Memos)</code></pre>
<p>上面代码中，<code>connect</code>方法接受两个参数：<code>mapStateToProps</code>和<code>mapDispatchToProps</code>。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将<code>state</code>映射到 UI 组件的参数（<code>props</code>），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。</p>
<h4>3.7 Provider</h4>
<p>&nbsp;这个Provider 其实是一个中间件，它是为了解决让容器组件拿到King的指令(<code>state</code>对象)而存在的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
let store = createStore(todoApp);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> todoApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/App'</span>
<span class="hljs-keyword">let</span> store = createStore(todoApp);
render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
)
</code></pre>
<p>上面代码中，<code>Provider</code>在根组件外面包了一层，这样一来，<code>App</code>的所有子组件就默认都可以拿到<code>state</code>了。</p>
<h3 id="articleHeader7">4.实战备忘录</h3>
<p>讲解之前可以先看一下github上的代码，你可以clone下来学习，也可以在线给我提issue，欢迎戳这:<a href="https://github.com/damonare/memos" rel="nofollow noreferrer" target="_blank">React全家桶实现简易备忘录</a></p>
<h4>4.1目录结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── app                 #开发目录
|   |   
|   ├──actions          #action的文件
|   |   
|   ├──components       #展示组件
|   |   
|   ├──containers       #容器组件,主页
|   |   
|   ├──reducers         #reducer文件
|   |
|   |——routes           #路由文件，容器组件
|   |
|   |——static           #静态文件
|   |
|   ├──stores           #store配置文件
|   |
|   |——main.less        #路由样式
|   |
|   └──main.js          #入口文件
|      
├── build                #发布目录
├── node_modules        #包文件夹
├── .gitignore     
├── .jshintrc      
├── webpack.production.config.js  #生产环境配置      
├── webpack.config.js   #webpack配置文件
├── package.json        #环境配置
└── README.md           #使用说明
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>.
├── app                 <span class="hljs-comment">#开发目录</span>
|<span class="hljs-string">   </span>|<span class="hljs-string">   
</span>|<span class="hljs-string">   ├──actions          #action的文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   
</span>|<span class="hljs-string">   ├──components       #展示组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   
</span>|<span class="hljs-string">   ├──containers       #容器组件,主页
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   
</span>|<span class="hljs-string">   ├──reducers         #reducer文件
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">——routes           #路由文件，容器组件
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">——static           #静态文件
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   ├──stores           #store配置文件
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">——main.less        #路由样式
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   └──main.js          #入口文件
</span>|<span class="hljs-string">      
├── build                #发布目录
├── node_modules        #包文件夹
├── .gitignore     
├── .jshintrc      
├── webpack.production.config.js  #生产环境配置      
├── webpack.config.js   #webpack配置文件
├── package.json        #环境配置
└── README.md           #使用说明
</span></code></pre>
<p>接下来，我们只关注app目录就好了。</p>
<h4>4.2入口文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, browserHistory, Router} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './container/App';
import AllMemosRoute from './routes/AllMemosRoute';
import TodoRoute from './routes/TodoRoute';
import DoingRoute from './routes/DoingRoute';
import DoneRoute from './routes/DoneRoute';
import configureStore from './stores';
import './main.less';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path=&quot;/&quot;  component={App}>
                <IndexRoute component={AllMemosRoute}/>
                <Route path=&quot;/todo&quot; component={TodoRoute}/>
                <Route path=&quot;/doing&quot; component={DoingRoute}/>
                <Route path=&quot;/done&quot; component={DoneRoute}/>
            </Route>
        </Router>
   </Provider>,
 document.body.appendChild(document.createElement('div')))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {Route, IndexRoute, browserHistory, Router} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> {Provider} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./container/App'</span>;
<span class="hljs-keyword">import</span> AllMemosRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/AllMemosRoute'</span>;
<span class="hljs-keyword">import</span> TodoRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/TodoRoute'</span>;
<span class="hljs-keyword">import</span> DoingRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/DoingRoute'</span>;
<span class="hljs-keyword">import</span> DoneRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/DoneRoute'</span>;
<span class="hljs-keyword">import</span> configureStore <span class="hljs-keyword">from</span> <span class="hljs-string">'./stores'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./main.less'</span>;
<span class="hljs-keyword">const</span> store = configureStore();
ReactDOM.render(
    &lt;Provider store={store}&gt;
        &lt;Router history={browserHistory}&gt;
            &lt;Route path="/"  component={App}&gt;
                &lt;IndexRoute component={AllMemosRoute}/&gt;
                &lt;Route path="/todo" component={TodoRoute}/&gt;
                &lt;Route path="/doing" component={DoingRoute}/&gt;
                &lt;Route path="/done" component={DoneRoute}/&gt;
            &lt;/Route&gt;
        &lt;/Router&gt;
   &lt;/Provider&gt;,
 document.body.appendChild(document.createElement('div')))</code></pre>
<p>这里我们从<code> react-redux </code>中获取到 Provider 组件，我们把它渲染到应用的最外层。<br>他需要一个属性 store ，他把这个 store 放在context里，给Router(connect)用。</p>
<h4>4.3 Store</h4>
<blockquote><p>app/store/index.jsx</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';
import reducer from '../reducers';
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../reducers'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">configureStore</span>(<span class="hljs-params">initialState</span>) </span>{
  <span class="hljs-keyword">const</span> store = createStore(reducer, initialState);
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-comment">// Enable Webpack hot module replacement for reducers</span>
    <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">'../reducers'</span>, () =&gt; {
      <span class="hljs-keyword">const</span> nextReducer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../reducers'</span>);
      store.replaceReducer(nextReducer);
    });
  }
  <span class="hljs-keyword">return</span> store;
}</code></pre>
<h4>4.4 Action 创建函数和常量</h4>
<blockquote><p>app/action/index.jsx</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
/*
 * @author Damonare 2016-12-10
 * @version 1.0.0
 * action 类型
 */
export const Add_Todo = 'Add_Todo';
export const Change_Todo_To_Doing = 'Change_Todo_To_Doing';
export const Change_Doing_To_Done = 'Change_Doing_To_Done';
export const Change_Done_To_Doing = 'Change_Done_To_Doing';
export const Change_Doing_To_Todo = 'Change_Doing_To_Todo';
export const Search='Search';
export const Delete_Todo='Delete_Todo';
/*
 * action 创建函数
 * @method  addTodo添加新事项
 * @param  {String} text 添加事项的内容
 */
export function addTodo(text) {
  return {
      type: Add_Todo,
      text
  }
}
/*
 * @method  search 查找事项
 * @param  {String} text 查找事项的内容
 */
export function search(text) {
  return {
      type: Search,
      text
  }
}
/*
 * @method  changeTodoToDoing 状态由todo转为doing
 * @param  {Number} index 需要改变状态的事项的下标
 */
export function changeTodoToDoing(index) {
  return {
      type: Change_Todo_To_Doing,
      index
  }
}
/*
 * @method  changeDoneToDoing 状态由done转为doing
 * @param  {Number} index 需要改变状态的事项的下标
 */
export function changeDoneToDoing(index) {
  return {
      type: Change_Done_To_Doing,
      index
  }
}
/*
 * @method  changeDoingToTodo 状态由doing转为todo
 * @param  {Number} index 需要改变状态的事项的下标
 */
export function changeDoingToTodo(index) {
  return {
      type: Change_Doing_To_Todo,
      index
  }
}
/*
 * @method  changeDoingToDone 状态由doing转为done
 * @param  {Number} index 需要改变状态的事项的下标
 */
export function changeDoingToDone(index) {
  return {
      type: Change_Doing_To_Done,
      index
  }
}
/*
 * @method  deleteTodo 删除事项
 * @param  {Number} index 需要删除的事项的下标
 */
export function deleteTodo(index) {
  return {
      type: Delete_Todo,
      index
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-comment">/*
 * @author Damonare 2016-12-10
 * @version 1.0.0
 * action 类型
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Add_Todo = <span class="hljs-string">'Add_Todo'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Change_Todo_To_Doing = <span class="hljs-string">'Change_Todo_To_Doing'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Change_Doing_To_Done = <span class="hljs-string">'Change_Doing_To_Done'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Change_Done_To_Doing = <span class="hljs-string">'Change_Done_To_Doing'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Change_Doing_To_Todo = <span class="hljs-string">'Change_Doing_To_Todo'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Search=<span class="hljs-string">'Search'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Delete_Todo=<span class="hljs-string">'Delete_Todo'</span>;
<span class="hljs-comment">/*
 * action 创建函数
 * @method  addTodo添加新事项
 * @param  {String} text 添加事项的内容
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTodo</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Add_Todo,
      text
  }
}
<span class="hljs-comment">/*
 * @method  search 查找事项
 * @param  {String} text 查找事项的内容
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">search</span>(<span class="hljs-params">text</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Search,
      text
  }
}
<span class="hljs-comment">/*
 * @method  changeTodoToDoing 状态由todo转为doing
 * @param  {Number} index 需要改变状态的事项的下标
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeTodoToDoing</span>(<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Change_Todo_To_Doing,
      index
  }
}
<span class="hljs-comment">/*
 * @method  changeDoneToDoing 状态由done转为doing
 * @param  {Number} index 需要改变状态的事项的下标
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeDoneToDoing</span>(<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Change_Done_To_Doing,
      index
  }
}
<span class="hljs-comment">/*
 * @method  changeDoingToTodo 状态由doing转为todo
 * @param  {Number} index 需要改变状态的事项的下标
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeDoingToTodo</span>(<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Change_Doing_To_Todo,
      index
  }
}
<span class="hljs-comment">/*
 * @method  changeDoingToDone 状态由doing转为done
 * @param  {Number} index 需要改变状态的事项的下标
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeDoingToDone</span>(<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Change_Doing_To_Done,
      index
  }
}
<span class="hljs-comment">/*
 * @method  deleteTodo 删除事项
 * @param  {Number} index 需要删除的事项的下标
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deleteTodo</span>(<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: Delete_Todo,
      index
  }
}
</code></pre>
<p>在声明每一个返回 action 函数的时候，我们需要在头部声明这个 action 的 type，以便好组织管理。<br>每个函数都会返回一个 action 对象，所以在 容器组件里面调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="text =>
  dispatch(addTodo(text))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">text =&gt;
  dispatch(addTodo(text))</code></pre>
<p>就是调用<code>dispatch(action)</code>&nbsp;。</p>
<h4>4.5 Reducers</h4>
<blockquote><p>app/reducers/index.jsx</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux';
import todolist from './todos';
// import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  todolist
});

export default reducer;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> todolist <span class="hljs-keyword">from</span> <span class="hljs-string">'./todos'</span>;
<span class="hljs-comment">// import visibilityFilter from './visibilityFilter';</span>

<span class="hljs-keyword">const</span> reducer = combineReducers({
  todolist
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> reducer;
</code></pre>
<blockquote><p>app/reducers/todos.jsx</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
    Add_Todo,
    Delete_Todo,
    Change_Todo_To_Doing,
    Change_Doing_To_Done,
    Change_Doing_To_Todo,
    Change_Done_To_Doing,
    Search
} from '../actions';
let todos;
(function() {
    if (localStorage.todos) {
        todos = JSON.parse(localStorage.todos)
    } else {
        todos = []
    }
})();
function todolist(state = todos, action) {
    switch (action.type) {
            /*
        *  添加新的事项
        *  并进行本地化存储
        *  使用ES6展开运算符链接新事项和旧事项
        *  JSON.stringify进行对象深拷贝
        */
        case Add_Todo:
            localStorage.setItem('todos', JSON.stringify([
                ...state, {
                    todo: action.text,
                    istodo: true,
                    doing: false,
                    done: false
                }
            ]));
            return [
                ...state, {
                    todo: action.text,
                    istodo: true,
                    doing: false,
                    done: false
                }
            ];
            /*
            *  将todo转为doing状态，注意action.index的类型转换
            */
        case Change_Todo_To_Doing:
            localStorage.setItem('todos', JSON.stringify([
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: false,
                    doing: true,
                    done: false
                },
                ...state.slice(parseInt(action.index) + 1)
            ]));
            return [
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: false,
                    doing: true,
                    done: false
                },
                ...state.slice(parseInt(action.index) + 1)
            ];
            /*
            *  将doing转为done状态
            */
        case Change_Doing_To_Done:
            localStorage.setItem('todos', JSON.stringify([
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: false,
                    doing: false,
                    done: true
                },
                ...state.slice(parseInt(action.index) + 1)
            ]));
            return [
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: false,
                    doing: false,
                    done: true
                },
                ...state.slice(parseInt(action.index) + 1)
            ];
            /*
            *  将done转为doing状态
            */
        case Change_Done_To_Doing:
            localStorage.setItem('todos', JSON.stringify([
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: false,
                    doing: true,
                    done: false
                },
                ...state.slice(parseInt(action.index) + 1)
            ]));
            return [
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: false,
                    doing: true,
                    done: false
                },
                ...state.slice(parseInt(action.index) + 1)
            ];
            /*
            *  将doing转为todo状态
            */
        case Change_Doing_To_Todo:
            localStorage.setItem('todos', JSON.stringify([
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: true,
                    doing: false,
                    done: false
                },
                ...state.slice(parseInt(action.index) + 1)
            ]));
            return [
                ...state.slice(0, action.index),
                {
                    todo:state[action.index].todo,
                    istodo: true,
                    doing: false,
                    done: false
                },
                ...state.slice(parseInt(action.index) + 1)
            ];
            /*
            *  删除某个事项
            */
        case Delete_Todo:
            localStorage.setItem('todos', JSON.stringify([
                ...state.slice(0, action.index),
                ...state.slice(parseInt(action.index) + 1)
            ]));
            return [
                ...state.slice(0, action.index),
                ...state.slice(parseInt(action.index) + 1)
            ];
            /*
            *  搜索
            */
        case Search:
        let text=action.text;
        let reg=eval(&quot;/&quot;+text+&quot;/gi&quot;);
            return state.filter(item=> item.todo.match(reg));
        default:
            return state;
    }
}
export default todolist;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {
    Add_Todo,
    Delete_Todo,
    Change_Todo_To_Doing,
    Change_Doing_To_Done,
    Change_Doing_To_Todo,
    Change_Done_To_Doing,
    Search
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions'</span>;
<span class="hljs-keyword">let</span> todos;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (localStorage.todos) {
        todos = <span class="hljs-built_in">JSON</span>.parse(localStorage.todos)
    } <span class="hljs-keyword">else</span> {
        todos = []
    }
})();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todolist</span>(<span class="hljs-params">state = todos, action</span>) </span>{
    <span class="hljs-keyword">switch</span> (action.type) {
            <span class="hljs-comment">/*
        *  添加新的事项
        *  并进行本地化存储
        *  使用ES6展开运算符链接新事项和旧事项
        *  JSON.stringify进行对象深拷贝
        */</span>
        <span class="hljs-keyword">case</span> Add_Todo:
            localStorage.setItem(<span class="hljs-string">'todos'</span>, <span class="hljs-built_in">JSON</span>.stringify([
                ...state, {
                    <span class="hljs-attr">todo</span>: action.text,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                }
            ]));
            <span class="hljs-keyword">return</span> [
                ...state, {
                    <span class="hljs-attr">todo</span>: action.text,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                }
            ];
            <span class="hljs-comment">/*
            *  将todo转为doing状态，注意action.index的类型转换
            */</span>
        <span class="hljs-keyword">case</span> Change_Todo_To_Doing:
            localStorage.setItem(<span class="hljs-string">'todos'</span>, <span class="hljs-built_in">JSON</span>.stringify([
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ]));
            <span class="hljs-keyword">return</span> [
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ];
            <span class="hljs-comment">/*
            *  将doing转为done状态
            */</span>
        <span class="hljs-keyword">case</span> Change_Doing_To_Done:
            localStorage.setItem(<span class="hljs-string">'todos'</span>, <span class="hljs-built_in">JSON</span>.stringify([
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ]));
            <span class="hljs-keyword">return</span> [
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ];
            <span class="hljs-comment">/*
            *  将done转为doing状态
            */</span>
        <span class="hljs-keyword">case</span> Change_Done_To_Doing:
            localStorage.setItem(<span class="hljs-string">'todos'</span>, <span class="hljs-built_in">JSON</span>.stringify([
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ]));
            <span class="hljs-keyword">return</span> [
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ];
            <span class="hljs-comment">/*
            *  将doing转为todo状态
            */</span>
        <span class="hljs-keyword">case</span> Change_Doing_To_Todo:
            localStorage.setItem(<span class="hljs-string">'todos'</span>, <span class="hljs-built_in">JSON</span>.stringify([
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ]));
            <span class="hljs-keyword">return</span> [
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                {
                    <span class="hljs-attr">todo</span>:state[action.index].todo,
                    <span class="hljs-attr">istodo</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">doing</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
                },
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ];
            <span class="hljs-comment">/*
            *  删除某个事项
            */</span>
        <span class="hljs-keyword">case</span> Delete_Todo:
            localStorage.setItem(<span class="hljs-string">'todos'</span>, <span class="hljs-built_in">JSON</span>.stringify([
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ]));
            <span class="hljs-keyword">return</span> [
                ...state.slice(<span class="hljs-number">0</span>, action.index),
                ...state.slice(<span class="hljs-built_in">parseInt</span>(action.index) + <span class="hljs-number">1</span>)
            ];
            <span class="hljs-comment">/*
            *  搜索
            */</span>
        <span class="hljs-keyword">case</span> Search:
        <span class="hljs-keyword">let</span> text=action.text;
        <span class="hljs-keyword">let</span> reg=<span class="hljs-built_in">eval</span>(<span class="hljs-string">"/"</span>+text+<span class="hljs-string">"/gi"</span>);
            <span class="hljs-keyword">return</span> state.filter(<span class="hljs-function"><span class="hljs-params">item</span>=&gt;</span> item.todo.match(reg));
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> state;
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> todolist;</code></pre>
<p>具体的展示组件这里就不罗列代码了，感兴趣的可以戳这：<a href="https://github.com/damonare/memos/tree/master/app/components" rel="nofollow noreferrer" target="_blank">备忘录展示组件地址</a></p>
<h2 id="articleHeader8">后记</h2>
<p>严格来说，这个备忘录并不是使用的react全家桶，毕竟还有一部分less代码，不过这一个应用也算是比较全面的使用了react+react-router+redux，作为react全家桶技术学习的练手的小项目再适合不过了。如果您对这个小东西感兴趣，欢迎戳这:<a href="https://github.com/damonare/memos" rel="nofollow noreferrer" target="_blank">React全家桶实现简易备忘录</a>给个star。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实例讲解react+react-router+redux

## 原文链接
[https://segmentfault.com/a/1190000007862103](https://segmentfault.com/a/1190000007862103)

