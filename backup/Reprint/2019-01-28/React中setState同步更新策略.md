---
title: 'React中setState同步更新策略' 
date: 2019-01-28 2:30:09
hidden: true
slug: 4ty6btjsq7k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/24781259" rel="nofollow noreferrer" target="_blank">React中setState同步更新策略</a>从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与工程实践</a>中的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/tree/master/Framework/View/React" rel="nofollow noreferrer" target="_blank">React入门与最佳实践系列总纲</a>系列文章，推荐阅读<a href="https://zhuanlan.zhihu.com/p/24575395" rel="nofollow noreferrer" target="_blank">2016-我的前端之路:工具化与工程化</a>。</p></blockquote>
<h1 id="articleHeader0">setState 同步更新</h1>
<p>我们在上文中提及，为了提高性能React将setState设置为批次更新，即是异步操作函数，并不能以顺序控制流的方式设置某些事件，我们也不能依赖于<code>this.state</code>来计算未来状态。典型的譬如我们希望在从服务端抓取数据并且渲染到界面之后，再隐藏加载进度条或者外部加载提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    fetch('https://example.com')
        .then((res) => res.json())
        .then(
            (something) => {
                this.setState({ something });
                StatusBar.setNetworkActivityIndicatorVisible(false);
            }
        );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>componentDidMount() {
    fetch(<span class="hljs-string">'https://example.com'</span>)
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(res)</span> =&gt;</span> res.json())
        .<span class="hljs-keyword">then</span>(
            <span class="hljs-function"><span class="hljs-params">(something)</span> =&gt;</span> {
                <span class="hljs-keyword">this</span>.setState({ something });
                StatusBar.setNetworkActivityIndicatorVisible(<span class="hljs-literal">false</span>);
            }
        );
}</code></pre>
<p>因为<code>setState</code>函数并不会阻塞等待状态更新完毕，因此<code>setNetworkActivityIndicatorVisible</code>有可能先于数据渲染完毕就执行。我们可以选择在<code>componentWillUpdate</code>与<code>componentDidUpdate</code>这两个生命周期的回调函数中执行<code>setNetworkActivityIndicatorVisible</code>，但是会让代码变得破碎，可读性也不好。实际上在项目开发中我们更频繁遇见此类问题的场景是以某个变量控制元素可见性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({showForm : !this.state.showForm});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-built_in">set</span>State({showForm : !this.<span class="hljs-keyword">state</span>.showForm});</code></pre>
<p>我们预期的效果是每次事件触发后改变表单的可见性，但是在大型应用程序中如果事件的触发速度快于<code>setState</code>的更新速度，那么我们的值计算完全就是错的。本节就是讨论两种方式来保证<code>setState</code>的同步更新。</p>
<h2 id="articleHeader1">完成回调</h2>
<p><code>setState</code>函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用，譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.setState({
      load: !this.state.load,
      count: this.state.count + 1
    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>    this.<span class="hljs-built_in">set</span>State({
      <span class="hljs-built_in">load</span>: !this.<span class="hljs-keyword">state</span>.<span class="hljs-built_in">load</span>,
      count: this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>
    }, () =&gt; {
      console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.count);
      console.<span class="hljs-keyword">log</span>('加载完成')
    });</code></pre>
<p>这里的回调函数用法相信大家很熟悉，就是JavaScript异步编程相关知识，我们可以引入Promise来封装setState:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>  <span class="hljs-built_in">set</span>StateAsync(<span class="hljs-keyword">state</span>) {
    return new Promise((resolve) =&gt; {
      this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span>, resolve)
    });
  }</code></pre>
<p><code>setStateAsync </code>返回的是Promise对象，在调用时我们可以使用Async/Await语法来优化代码风格：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async componentDidMount() {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const res = await fetch('https://api.ipify.org?format=json')
    const {ip} = await res.json()
    await this.setStateAsync({ipAddress: ip})
    StatusBar.setNetworkActivityIndicatorVisible(false)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>  <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">componentDidMount</span>(<span class="hljs-params"></span>) </span>{
    StatusBar.setNetworkActivityIndicatorVisible(<span class="hljs-literal">true</span>)
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'https://api.ipify.org?format=json'</span>)
    <span class="hljs-keyword">const</span> {ip} = <span class="hljs-keyword">await</span> res.json()
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.setStateAsync({ipAddress: ip})
    StatusBar.setNetworkActivityIndicatorVisible(<span class="hljs-literal">false</span>)
  }</code></pre>
<p>这里我们就可以保证在<code>setState</code>渲染完毕之后调用外部状态栏将网络请求状态修改为已结束，整个组件的完整定义为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AwesomeProject extends Component {
  state = {}
  setStateAsync(state) {
    ...
  }
  async componentDidMount() {
   ...
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My IP is {this.state.ipAddress || 'Unknown'}
        </Text>
      </View>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>class AwesomeProject extends Component {
  <span class="hljs-keyword">state</span> = {}
  <span class="hljs-built_in">set</span>StateAsync(<span class="hljs-keyword">state</span>) {
    ...
  }
  async componentDidMount() {
   ...
  }
  render() {
    return (
      <span class="hljs-variable">&lt;View style={styles.container}&gt;</span>
        <span class="hljs-variable">&lt;Text style={styles.welcome}&gt;</span>
          My IP is {this.<span class="hljs-keyword">state</span>.ipAddress || 'Unknown'}
        &lt;/Text&gt;
      &lt;/View&gt;
    );
  }
}</code></pre>
<p>该组件的执行效果如下所示:<br><span class="img-wrap"><img data-src="/img/remote/1460000008051631?w=750&amp;h=1334" src="https://static.alili.tech/img/remote/1460000008051631?w=750&amp;h=1334" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">传入状态计算函数</h2>
<p>除了使用回调函数的方式监听状态更新结果之外，React还允许我们传入某个状态计算函数而不是对象来作为第一个参数。状态计算函数能够为我们提供可信赖的组件的State与Props值，即会自动地将我们的状态更新操作添加到队列中并等待前面的更新完毕后传入最新的状态值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   this.setState(function(prevState, props){
      return {showForm: !prevState.showForm}
   });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>   <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(prevState, props)</span></span>{
      <span class="hljs-keyword">return</span> {showForm: !prevState.showForm}
   });</code></pre>
<p>这里我们以简单的计数器为例，我们希望用户点击按钮之后将计数值连加两次，基本的组件为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {count : 0} 
    this.incrementCount = this.incrementCount.bind(this)
  }
  incrementCount(){
    ...
  }
  render(){
    return <div>
              <button onClick={this.incrementCount}>Increment</button>
              <div>{this.state.count}</div>
          </div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {count : <span class="hljs-number">0</span>} 
    <span class="hljs-keyword">this</span>.incrementCount = <span class="hljs-keyword">this</span>.incrementCount.bind(<span class="hljs-keyword">this</span>)
  }
  incrementCount(){
    ...
  }
  render(){
    <span class="hljs-keyword">return</span> &lt;div&gt;
              &lt;button onClick={<span class="hljs-keyword">this</span>.incrementCount}&gt;<span class="hljs-type">Increment</span>&lt;/button&gt;
              &lt;div&gt;{<span class="hljs-keyword">this</span>.state.count}&lt;/div&gt;
          &lt;/div&gt;
  }
}</code></pre>
<p>直观的写法我们可以连续调用两次<code>setState</code>函数，这边的用法可能看起来有点怪异，不过更多的是为了说明异步更新带来的数据不可预测问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  incrementCount(){
    this.setState({count : this.state.count + 1}) 
    this.setState({count : this.state.count + 1})
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>  incrementCount(){
    this.<span class="hljs-built_in">set</span>State({count : this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>}) 
    this.<span class="hljs-built_in">set</span>State({count : this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>})
  }</code></pre>
<p>上述代码的效果是每次点击之后计数值只会加1，实际上第二个<code>setState</code>并没有等待第一个<code>setState</code>执行完毕就开始执行了，因此其依赖的当前计数值完全是错的。我们当然可以使用上文提及的<code>setStateAsync</code>来进行同步控制，不过这里我们使用状态计算函数来保证同步性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  incrementCount(){
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  incrementCount(){
   <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">(prevState, props)</span> =&gt;</span> ({
      count: prevState.count + <span class="hljs-number">1</span>
    }));
   <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">(prevState, props)</span> =&gt;</span> ({
      count: prevState.count + <span class="hljs-number">1</span>
    }));
  }</code></pre>
<p>这里的第二个<code>setState</code>传入的<code>prevState</code>值就是第一个<code>setState</code>执行完毕之后的计数值，也顺利保证了连续自增两次。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中setState同步更新策略

## 原文链接
[https://segmentfault.com/a/1190000008051628](https://segmentfault.com/a/1190000008051628)

