---
title: '浅析 React 生命周期' 
date: 2019-01-26 2:30:18
hidden: true
slug: yshfcc35dgp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Overview</h3>
<p>最近常有学习React相关的技术，写了几个React的小Demo，使用 <code>React/Express</code> 技术栈。实在太小，羞于拿出来细说。React 的确是一个值得追随的技术。但React体系实在庞大，我目前仅略知一二。这里要挑出来说的，是React的<a href="https://facebook.github.io/react/docs/react-component.html" rel="nofollow noreferrer" target="_blank">生命周期</a>机制。Demo的学习过程中，对它的方便、易用之处实在是深有体会，在一些细节处也值得斟酌，在这里做一下记录，便于分享。</p>
<p>如果你接触过React，大概对<code>render</code>和<code>componentWillMount</code>等，会相对的熟悉，因为它们再常用不过。但用归用，其中的一些理论上的细节，往往容易在使用的过程中被忽略，使我们多敲了不少代码，心很累的 : )</p>
<p>通俗来讲，React 将组件 <code>component</code> 在web中的形成、修改和渲染等划分为若干个阶段，组成组件的生命周期。在一个完整的生命周期内，一个组件会经过若干个阶段，在特殊的阶段组件会调用一个特别的<code>lifecycle method</code>，即生命周期方法。如下：</p>
<ol>
<li><p><code>constructor(props)</code></p></li>
<li><p><code>componentWillMount()</code></p></li>
<li><p><code>render()</code></p></li>
<li><p><code>componentDidMount()</code></p></li>
<li><p>componentWillReceiveProps(nextProps)</p></li>
<li><p>shouldComponentUpdate(nextProps, nextState)</p></li>
<li><p>componentWillUpdate(nextProps, nextState)</p></li>
<li><p>render( )*  //理解上与3. render()略有不同，见下。</p></li>
<li><p>componentDidUpdate(prevProps, prevState )</p></li>
<li><p>componentWillUnmount( )</p></li>
</ol>
<blockquote><p>值得注意，这些生命周期是React 内置的，在特定条件下就会被调用。而开发者可以做的就是 <code>override</code>（重载)这些方法，以实现想要的功能。</p></blockquote>
<h3 id="articleHeader1">constructor</h3>
<blockquote><p><code>constructor(props)</code>，组件形成时调用。</p></blockquote>
<p>constructor 函数可理解为组件的构造函数，从组件的类(class) 实例化一个组件实例。这个函数在组件形成时被调用，是所有生命周期函数中<code>最先执行</code>的。在constructor函数内，如有必要，进行state的初始化以及绑定方法；否则可以省去constructor函数的声明。</p>
<p>有以下几点在开发时值得注意:</p>
<ol>
<li><p>constructor 函数内，在执行任何statement之前，必须是super() 函数，如果有参数须将参数带上。这点跟Java很像。</p></li>
<li><p>在constructor 函数内，<code>this.props</code> 返回 <code>undefined</code></p></li>
<li><p>不要在初试化state时引用props 里的值，否则每当props更新时，都需要在componentWillReceiveProps 函数内对state进行更新。（同时这也涉及到组件state选取的原则，如有需要请阅读<a href="https://facebook.github.io/react/docs/thinking-in-react.html" rel="nofollow noreferrer" target="_blank">Thinking in React</a>）</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  constructor(props) {
    super(props);//------------(1)
    console.log(this.props);// undefined ------------(2)
    //initialize the state
    this.state = {
      value: '',
      color: props.initialColor  // 不可取  ------------(3)
    }
    //bind methods
    this.handleClick = this.handleClick.bind(this);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);<span class="hljs-comment">//------------(1)</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.props);<span class="hljs-comment">// undefined ------------(2)</span>
    <span class="hljs-comment">//initialize the state</span>
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">value</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">color</span>: props.initialColor  <span class="hljs-comment">// 不可取  ------------(3)</span>
    }
    <span class="hljs-comment">//bind methods</span>
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
}</code></pre>
<h3 id="articleHeader2">componentWillMount</h3>
<blockquote><p><code>componentWillMount()</code>，在组件首次渲染(<code>render</code>)之前调用。</p></blockquote>
<p><code>mount</code>有<code>安装</code>之意，我们可以理解为<code>组件首次被加载在web中</code>。因此每次页面加载/刷新，或者某个组件第一次加载进入web时可以调用componentWillMount( ) 函数。举个例子，在首次进入文章列表时时，可在 componentWillMount 对所有文章进行查询。这样，在render之前，就能拿到所有文章的数据，以便在render中使用。</p>
<blockquote><p>在componentWillMount ( ) 函数内，若对<code>this.state</code>进行更新，无法触发重新渲染组件。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class PostList extends Component {
  //...
  //在componentWillMount 组件内获取所有博客列表
  componentWillMount(){
    axios.get('/posts')
         .then(res=>{
           //...
         });
  }
  //在 render 函数内将拿到的博客列表 渲染在页面中
  render(){
    //...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PostList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">//...</span>
  <span class="hljs-comment">//在componentWillMount 组件内获取所有博客列表</span>
  componentWillMount(){
    axios.get(<span class="hljs-string">'/posts'</span>)
         .then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
           <span class="hljs-comment">//...</span>
         });
  }
  <span class="hljs-comment">//在 render 函数内将拿到的博客列表 渲染在页面中</span>
  render(){
    <span class="hljs-comment">//...</span>
  }
}</code></pre>
<h3 id="articleHeader3">Render</h3>
<blockquote><p><code>render()</code></p></blockquote>
<p>render 即 渲染函数，是编写组件代码时，唯一一个<code>必须</code>的函数。该函数须有返回值，返回一个组件，即最终渲染出来的组件。在使用组件的class进行组件实例化时，得到的便是其返回值。</p>
<p>返回值有两种类型：</p>
<ol>
<li><p>一个父标签，这个父标签内可以包含若干个子标签，在最外层标签必须只有一个。</p></li>
<li><p><code>false</code> 或者 <code>null</code>，代表不渲染任何DOM</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  //...
  render(){
    return (
      <div>
          //...
      </div>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">//...</span>
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
          <span class="hljs-comment">//...</span>
      &lt;/div&gt;
    )
  }
}
</code></pre>
<blockquote>
<p><code>注意:</code>在render函数中只做与返回组件相关的工作，勿在其中对<code>state</code>进行操作，可以保证每次调用render函数，返回的组件都是相同的。否则将加大项目维护成本。</p>
<p>另外，如果<code>shouldComponentUpdate</code>函数返回<code>false</code>，则不执行render函数。关于shouldComponentUpdate将在下面介绍。</p>
</blockquote>
<h3 id="articleHeader4">componentDidMount</h3>
<blockquote><p><code>componentDidMount()</code>，一旦组件首次加载完成，便会调用</p></blockquote>
<p>如果需要对渲染出来的DOM节点做任何操作，可以在此处进行。(<code>提示</code>: this.refs 可获取真实DOM)。</p>
<blockquote><p><code>在该组件内设置state将会导致组件被重新渲染。</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  //..
  componentDidMount(){
    //将会触发组件重新渲染
    this.setState({
      value: '100'
    })：
    //对节点进行操作
      this.refs.div.appendChild(newChild);
  }
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">//..</span>
  componentDidMount(){
    <span class="hljs-comment">//将会触发组件重新渲染</span>
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">value</span>: <span class="hljs-string">'100'</span>
    })：
    <span class="hljs-comment">//对节点进行操作</span>
      <span class="hljs-keyword">this</span>.refs.div.appendChild(newChild);
  }
  
}</code></pre>
<p>上面对 <code>React生命周期函数</code>中的<code>constructor </code>/ <code>componentWillMount</code> / <code>render</code> / <code>componentDidMount</code> 四个函数进行了介绍。下面将继续介绍另外5个方法。在此之前，先总结一下，下面列表中列出的<code>3.render()</code>与<code>8.render()</code>的在逻辑上的区别和联系。先上一个列表。</p>
<ol>
<li><p>constructor(props)</p></li>
<li><p>componentWillMount( )</p></li>
<li><p>render( )</p></li>
<li><p>componentDidMount( )</p></li>
<li><p><code>componentWillReceiveProps(nextProps)</code></p></li>
<li><p><code>shouldComponentUpdate(nextProps, nextState)</code></p></li>
<li><p><code>componentWillUpdate(nextProps, nextState)</code></p></li>
<li><p><code>render()</code>*</p></li>
<li><p><code>componentDidUpdate(prevProps, prevState)</code></p></li>
<li><p><code>componentWillUnmount()</code></p></li>
</ol>
<h3 id="articleHeader5">「两个」render( )方法的区别</h3>
<blockquote><p>3.render( ) 与 8.render( )*</p></blockquote>
<p>实质上，这两个方法毫无区别。但这里为什么要提及它们之间的区别呢？其实，它们只是同一函数 render( ) 在组件生命周期的两个不同阶段的不同理解而已。</p>
<p>前一个 render( ) 方法指在组件第一次被加载进入页面时，调用的 render( ) 方法；后一个则指除去第一次，之后调用的 render( ) 方法。</p>
<p>因此，我们更愿意称第一次的 render( ) 方法为 <code>mount</code>( 安装 )，称后一个 render( ) 方法为 <code>re-render</code> ( 重新渲染 ) 。这也是为什么组件首次 render 前后的方法名中带有<code>mount</code>一词的缘故了。</p>
<p>这是 React 的伎俩，或者设计哲学吧。怎么认为都行，我认为很有趣?</p>
<p><strong><em>下面介绍的方法，都是围绕第二个 render( ) ，即重新渲染 re-render 展开的。</em></strong></p>
<h3 id="articleHeader6">componentWillReceiveProps</h3>
<blockquote><p><code>componentWillReceiveProps(nextprops)</code>，<code>已加载的组件</code>在 props 发生变化时调用。</p></blockquote>
<p>如果需要通过监听 props 的改变来修改 state 的值，则可以通过重载该函数实现。</p>
<p><code>需要注意</code>，在有些情况下，组件的 props 未发生改变也会调用该函数。因此如果在该函数内的逻辑，只是想捕获当前 props 与 接收的 nextProps 的不同来做出一些操作，则最好先将 props 与 nextProps 进行比较。</p>
<blockquote>
<p>1.在<code>mounting</code>阶段，即首次 render ，不调用 componentWillReceiveProps 方法。理解了两个 render( ) 的不同，便知道这里是为什么了。</p>
<p>2.<code>this.setState({…})</code> 不触发 componentWillReceiveProps 方法。因为该方法只监听 this.props 的改变，不关心 this.state 值的变化。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  componentWillReceiveProps(nextProps){
    //接收的颜色 与 当前颜色不同时
    if (this.props.color !== nextProps.color){
      ...
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentWillReceiveProps(nextProps){
    <span class="hljs-comment">//接收的颜色 与 当前颜色不同时</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.color !== nextProps.color){
      ...
    }
  }
}</code></pre>
<h3 id="articleHeader7">shouldComponentUpdate</h3>
<blockquote>
<p><code>shouldComponentUpdate(nextProps, nextState)</code></p>
<p>返回 <code>true</code> or<code>false</code></p>
</blockquote>
<p>要不要更新(重新渲染)组件？浅显易懂。这个方法的返回值决定了，当 props 或者 state 值发生变化时，组件是否重新渲染。两种情况:</p>
<ol>
<li><p>返回<code>true</code>，重新渲染。紧接着，继续执行 <code>componentWillUpdate()</code> → <code>render()</code> → <code>componentDidUpdate()</code>。</p></li>
<li><p><code>false</code>，不重新渲染。不再执行任何生命周期函数函数（亦不执行该组件的 render( ) 函数）。但是，并不妨碍其子组件。也就是说，如果其子组件的 props 或 state 发生改变时，只会取决于那个组件的 shouleComponentUpdate ( ) 方法的返回值。道理虽懂，但遇到是可能会犯迷糊，因为开发中常常会遇见组件嵌套的情况，父子组件之间传递同一套 props 或 state，一来二去，谁更新谁不更新，容易迷糊，需要仔细咯。</p></li>
</ol>
<blockquote><ol>
<li><p>在绝大部分情况下，当 props 或 state 改变时，都是需要重新渲染组件的。</p></li>
<li><p><code>注意</code>，根据 <a href="https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate" rel="nofollow noreferrer" target="_blank">React 官方 </a>的说法，就算 shouldComponentUpdate( ) 方法返回 <code>false</code>，组件也会重新渲染。需要随时注意官方文档的变化。</p></li>
</ol></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class PostList extends Component {
  shouldComponentUpdate(nextProps, nextState){
    //return true;默认
    return false;// 不更新组件
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PostList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  shouldComponentUpdate(nextProps, nextState){
    <span class="hljs-comment">//return true;默认</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;<span class="hljs-comment">// 不更新组件</span>
  }
}</code></pre>
<h3 id="articleHeader8">componentWillUpdate</h3>
<blockquote><p><code>componentWillUpdate(nextProps, nextState)</code>，当 shouldComponentUpdate( ) 方法返回 true 后调用。</p></blockquote>
<p>这个方法提供了一个为重新渲染作准备的机会，意思是要在这里，趁接下来的 render( ) 方法重新渲染之前，完成该完成的操作。这个方法在 mount 阶段不会被调用，只在 re-render 阶段被调用。</p>
<blockquote><p><code>注意</code>，不要在该方法内调用 <code>this.setState({…})</code>，如有需要，请在 componentWillReceiveProps( ) 方法中完成。养成良好的编程规范。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  componentWillUpdate(nextProps, nextState){
    var isLate = this.nextProps.isLate;
    if(isLate){
      //...
    } else {
      //...
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentWillUpdate(nextProps, nextState){
    <span class="hljs-keyword">var</span> isLate = <span class="hljs-keyword">this</span>.nextProps.isLate;
    <span class="hljs-keyword">if</span>(isLate){
      <span class="hljs-comment">//...</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//...</span>
    }
  }
}</code></pre>
<h3 id="articleHeader9">componentDidUpdate</h3>
<blockquote><p><code>componentDidUpdate(prevProps, preState)</code>，一旦组件首次更新（重新渲染）完成时调用。</p></blockquote>
<p>因此像 componentDidMount( ) 一样，如果需要对渲染出来的DOM节点做任何操作，可以在此处进行。(<code>提示</code>: this.refs 可获取真实DOM)。</p>
<blockquote><p><code>在该组件内设置state将会导致组件被重新渲染。</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  //..
  componentDidUpdate(){
    //将会触发组件重新渲染
    this.setState({
      value: '100'
    });
    //对节点进行操作
    this.refs.div.appendChild(newChild);
  }
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">//..</span>
  componentDidUpdate(){
    <span class="hljs-comment">//将会触发组件重新渲染</span>
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">value</span>: <span class="hljs-string">'100'</span>
    });
    <span class="hljs-comment">//对节点进行操作</span>
    <span class="hljs-keyword">this</span>.refs.div.appendChild(newChild);
  }
  
}</code></pre>
<h3 id="articleHeader10">componentWillUnmount</h3>
<blockquote><p><code>componentWillUnmount()</code>，在组件即将被卸载(或销毁)之前调用。</p></blockquote>
<p>在这个方法中，适合做一些清理善后工作。例如清楚timer，取消网络请求，或者清除在 componentDidMount 或 componentDidUpdate 中生成的相关 DOM 节点。</p>
<h3 id="articleHeader11">总结</h3>
<ol>
<li><p><code>mount</code> 与 <code>re-render</code> 的是有区别的。</p></li>
<li><p><code>mount</code>阶段使用<a href="https://fivesheep.me/2017/02/10/react-lifecycle/" rel="nofollow noreferrer" target="_blank">前一部分</a>的四个方法( <strong><em>constructor / componentWillMount / render / componentDidMount</em></strong>)，围绕组件首次加载而调用；</p></li>
<li><p><a href="https://fivesheep.me/2017/02/12/react-lifecycle-2/" rel="nofollow noreferrer" target="_blank">后一部分</a> <code>re-render</code> 相关的，使用 <strong><em>componentWillReceiveProps / shouldComponentUpdate / componentWillUpdate / render / componentDidUpdate</em></strong> ，围绕组件重新渲染而调用。</p></li>
</ol>
<p><strong><em>我总结了一张流程图和一个表格，以表示这些周期函数之间的关系，以及在何种情况下会调用这些函数。</em></strong></p>
<blockquote><p><code>注意:</code>componentWillUnmount 方法未包含其中。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008325026?w=1674&amp;h=1258" src="https://static.alili.tech/img/remote/1460000008325026?w=1674&amp;h=1258" alt="lifecycle" title="lifecycle" style="cursor: pointer; display: inline;"></span></p>
<table>
<thead><tr>
<th align="center"><code>mount</code></th>
<th align="center"><code>props 变化</code></th>
<th align="center"><code>state 变化</code></th>
</tr></thead>
<tbody>
<tr>
<td align="center"><strong>constructor</strong></td>
<td align="center"><strong>componentWillReceiveProps</strong></td>
<td align="center"><strong>shouldComponentUpdate</strong></td>
</tr>
<tr>
<td align="center"><strong>componentWillMount</strong></td>
<td align="center"><strong>shouldComponentUpdate</strong></td>
<td align="center">(return true)  ⏬  /  结束</td>
</tr>
<tr>
<td align="center"><strong>render</strong></td>
<td align="center">(return true)  ⏬  /  结束</td>
<td align="center"><strong>componentWillUpdate</strong></td>
</tr>
<tr>
<td align="center"><strong>componentDidMount</strong></td>
<td align="center"><strong>componentWillUpdate</strong></td>
<td align="center"><strong>render</strong></td>
</tr>
<tr>
<td align="center">/</td>
<td align="center"><strong>render</strong></td>
<td align="center"><strong>componentDidUpdate</strong></td>
</tr>
<tr>
<td align="center">/</td>
<td align="center"><strong>componentDidUpdate</strong></td>
<td align="center">/</td>
</tr>
</tbody>
</table>
<p><strong>完。</strong></p>
<p>文章为本人原创，原文见本人个博：<br><a href="https://fivesheep.me/2017/02/10/react-lifecycle/" rel="nofollow noreferrer" target="_blank">浅析「React」生命周期(一)</a><br><a href="https://fivesheep.me/2017/02/12/react-lifecycle-2/" rel="nofollow noreferrer" target="_blank">浅析「React」生命周期(二)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析 React 生命周期

## 原文链接
[https://segmentfault.com/a/1190000008325023](https://segmentfault.com/a/1190000008325023)

