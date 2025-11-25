---
title: 'React组件生命周期' 
date: 2019-02-04 2:30:58
hidden: true
slug: lvac13l8yi9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React组件生命周期</h1>
<h3 id="articleHeader1">前言</h3>
<p>组件会随着组件的<code>props</code>和<code>state</code>改变而发生变化，它的DOM也会有相应的变化。</p>
<blockquote>一个组件就是一个状态机：对于特定的输入，它总会返回一致的输出。</blockquote>
<p>React组件提供了<code>生命周期</code>的<code>钩子函数</code>去响应组件不同时刻的状态，组件的<code>生命周期</code>如下：</p>
<ul>
<li>实例化</li>
<li>存在期</li>
<li>销毁期</li>
</ul>
<p><code>钩子函数</code>是我们重点关注的地方，下面来详细了解下<code>生命周期</code>下的<code>钩子函数</code>调用顺序和作用。每个<code>生命周期</code>阶段调用的<code>钩子函数</code>会略有不同。下面的图片或许对你有帮助。</p>
<p><span class="img-wrap"><img data-src="/img/bVCOam?w=800&amp;h=652" src="https://static.alili.tech/img/bVCOam?w=800&amp;h=652" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以查看CodePen在线Demo,<a href="https://codepen.io/nange/pen/RGwPXB" rel="nofollow noreferrer" target="_blank">React生命周期</a><button class="btn btn-xs btn-default ml10 preview" data-url="nange/pen/RGwPXB" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader2">实例化</h3>
<p>首次调用组件时，有以下方法会被调用（注意顺序，从上到下先后执行）：</p>
<ul>
<li>
<p><code>getDefaultProps</code></p>
<p>这个方法是用来设置组件默认的<code>props</code>，组件<code>生命周期</code>只会调用一次。但是只适合<code>React.createClass</code>直接创建的组件，使用ES6/ES7创建的这个方法不可使用，ES6/ES7可以使用下面方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es7
class Component {
  static defaultProps = {}
}
//或者也可以在外面定义es6
//Compnent.defaultProps" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code class="jsx"><span class="hljs-comment">//es7</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> defaultProps = {}
}
<span class="hljs-comment">//或者也可以在外面定义es6</span>
<span class="hljs-comment">//Compnent.defaultProps</span></code></pre>
</li>
<li>
<p><code>getInitialState</code></p>
<p>设置state初始值，在这个方法中你已经可以访问到<code>this.props</code>。<code>getDefaultProps</code>只适合<code>React.createClass</code>使用。使用ES6初始化state方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      render: true,
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  constructor(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      render: <span class="hljs-literal">true</span>,
    }
  }
}</code></pre>
<p>或者这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component extends React.Component{
  state = {
    render: true
  }
  render(){return false;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  state = {
    render: <span class="hljs-literal">true</span>
  }
  render(){<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;}
}</code></pre>
</li>
<li>
<code>componentWillMount</code><p>改方法会在组件首次渲染之前调用，这个是在render方法调用前可修改state的最后一次机会。这个方法很少用到。</p>
</li>
<li>
<p><code>render</code></p>
<p>这个方法以后大家都应该会很熟悉，JSX通过这里，解析成对应的<code>虚拟DOM</code>，渲染成最终效果。格式大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component extends React.Component{
  render(){
    return (
       <div></div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  render(){
    <span class="hljs-keyword">return</span> (
       &lt;div&gt;&lt;/div&gt;
    )
  }
}</code></pre>
<p>​</p>
</li>
<li>
<code>componentDidMount</code><p>这个方法在首次真实的DOM渲染后调用（仅此一次）当我们需要访问真实的DOM时，这个方法就经常用到。如何访问真实的DOM这里就不想说了。当我们需要请求外部接口数据，一般都在这里处理。</p>
</li>
</ul>
<h3 id="articleHeader3">存在期</h3>
<p>实例化后，当<code>props</code>或者<code>state</code>发生变化时，下面方法依次被调用：</p>
<ul>
<li>
<p>componentWillReceiveProps</p>
<p>没当我们通过父组件更新子组件props时（这个也是唯一途径），这个方法就会被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">componentWillReceiveProps</span><span class="hljs-params">(nextProps)</span></span>{}</code></pre>
</li>
<li>
<p>shouldComponentUpdate</p>
<p>字面意思，是否应该更新组件，默认返回true。当返回false时，后期函数就不会调用，组件不会在次渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate(nextProps,nextState){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">shouldComponentUpdate</span><span class="hljs-params">(nextProps,nextState)</span></span>{}</code></pre>
</li>
<li>componentWillUpdate<p>字面意思组件将会更新，<code>props</code>和<code>state</code>改变后必调用。</p>
</li>
<li>render<p>跟实例化时的render一样，不多说</p>
</li>
<li>componentDidUpdate<p>这个方法在更新真实的DOM成功后调用，当我们需要访问真实的DOM时，这个方法就也经常用到。</p>
</li>
</ul>
<h3 id="articleHeader4">销毁期</h3>
<p>销毁阶段，只有一个函数被调用：</p>
<ul><li>componentWillUnmount<p>没当组件使用完成，这个组件就必须从DOM中销毁，此时该方法就会被调用。当我们在组件中使用了setInterval，那我们就需要在这个方法中调用clearTimeout。</p>
</li></ul>
<h3 id="articleHeader5">参考文章</h3>
<ul><li><a href="https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js-aa3796ad85aa#.pmi9akipj" rel="nofollow noreferrer" target="_blank">An Introduction to Life Cycle Events in&nbsp;React.js</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React组件生命周期

## 原文链接
[https://segmentfault.com/a/1190000006792687](https://segmentfault.com/a/1190000006792687)

