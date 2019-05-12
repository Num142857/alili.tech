---
title: 'React组件懒加载' 
date: 2019-01-04 2:30:10
hidden: true
slug: sfb9gqeig
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React组件懒加载</h1>
<blockquote><p>Web应用一个重要的优势就在于可以只加载我们想要的功能，而不必每次打开都把整个系统载入</p></blockquote>
<p>那么，在React里我们怎样实现当用到我们需求的功能时再请求对应的组件，而不是一次性的请求全部代码呢？</p>
<h2 id="articleHeader1">bundle-loader</h2>
<p>新版的React建议我们使用<a href="https://github.com/webpack-contrib/bundle-loader" rel="nofollow noreferrer" target="_blank">bundle-loader</a>进行代码的分离,下面我们看下它的用法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当你用到这个函数时，这个chunk才会被请求
var waitForChunk = require(&quot;bundle-loader!./file.js&quot;);

//  当请求的chunk加载完成才会执行传入的回调函数，并将请求的模块作为参数传入回调函数
waitForChunk(function(file) {
    // 接收到懒加载模块，类似于下面代码
    // var file = require(&quot;./file.js&quot;);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 当你用到这个函数时，这个chunk才会被请求</span>
<span class="hljs-keyword">var</span> waitForChunk = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bundle-loader!./file.js"</span>);

<span class="hljs-comment">//  当请求的chunk加载完成才会执行传入的回调函数，并将请求的模块作为参数传入回调函数</span>
waitForChunk(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
    <span class="hljs-comment">// 接收到懒加载模块，类似于下面代码</span>
    <span class="hljs-comment">// var file = require("./file.js");</span>
});
</code></pre>
<p>这个插件使用非常简单，只是对require.ensure的封装，使用起来类似于AMD的方式，<br>只需在回调函数里接收到懒加载的模块即可。</p>
<h2 id="articleHeader2">结合React</h2>
<p>React 组件也是模块，因此可以使用bundle-loader进行代码分离,只是需要在合适的地方请求调用即可。</p>
<p>怎样知道何时需要请求这个组件呢？社区建议的是先加载一个bundle容器组件（这个bundle容器组件本身非常小），当这个容器组件被渲染到dom时则可认为我们需要请求对应的懒加载组件了。</p>
<p>我们可以为所有的懒加载组件封装一个通用的容器组件:<br>(这里也有已经封装好的:<a href="https://github.com/flypie2/react-lazy-bundle" rel="nofollow noreferrer" target="_blank">react-lazy-bundle</a>,直接安装即可）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;

class Bundle extends Component {
  state = {
    // 因为module被占用了，我们用mod定义变量
    mod: null
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load(mod => {
      this.setState({
        // 为了兼容es module 和 AMD module
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    //若加载完成则渲染对应懒加载的组件，反之加载beforeLoad传入的组件
    return this.state.mod
      ? <this.state.mod {...this.props} />
      : <this.props.beforeLoad {...this.props} />;
  }
}

export default Bundle;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">"react"</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bundle</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-comment">// 因为module被占用了，我们用mod定义变量</span>
    mod: <span class="hljs-literal">null</span>
  };

  componentWillMount() {
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.props);
  }

  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (nextProps.load !== <span class="hljs-keyword">this</span>.props.load) {
      <span class="hljs-keyword">this</span>.load(nextProps);
    }
  }

  load(props) {
    <span class="hljs-keyword">this</span>.setState({
      mod: <span class="hljs-literal">null</span>
    });
    props.load(mod =&gt; {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-comment">// 为了兼容es module 和 AMD module</span>
        mod: mod.<span class="hljs-keyword">default</span> ? mod.<span class="hljs-keyword">default</span> : mod
      });
    });
  }

  render() {
    <span class="hljs-comment">//若加载完成则渲染对应懒加载的组件，反之加载beforeLoad传入的组件</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.mod
      ? &lt;<span class="hljs-keyword">this</span>.state.mod {...<span class="hljs-keyword">this</span>.props} /&gt;
      : &lt;<span class="hljs-keyword">this</span>.props.beforeLoad {...<span class="hljs-keyword">this</span>.props} /&gt;;
  }
}

export <span class="hljs-keyword">default</span> Bundle;
</code></pre>
<p>如上封装，使用时我们只需如下即可:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;
import Bundle from &quot;./Bundle&quot;;

import Test from &quot;bundle-loader?lazy&amp;name=[name]!./test&quot;;

const BeforeLoadComponent = props =>
  <div>
    before load {props.name}
  </div>;

class HomePage extends Component {
  render() {
    return (
      <div>
        <Bundle name=&quot;flypie&quot; load={Test} beforeLoad={BeforeLoadComponent} />
      </div>
    );
  }
}

export default HomePage;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-type">Bundle</span> from <span class="hljs-string">"./Bundle"</span>;

<span class="hljs-keyword">import</span> <span class="hljs-type">Test</span> from <span class="hljs-string">"bundle-loader?lazy&amp;name=[name]!./test"</span>;

const <span class="hljs-type">BeforeLoadComponent</span> = props =&gt;
  &lt;div&gt;
    before load {props.name}
  &lt;/div&gt;;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomePage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Bundle</span> name=<span class="hljs-string">"flypie"</span> load={<span class="hljs-type">Test</span>} beforeLoad={<span class="hljs-type">BeforeLoadComponent</span>} /&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">HomePage</span>;
</code></pre>
<p>怎么样，是不是特别简单</p>
<h2 id="articleHeader3">结合React Router</h2>
<p>结合React Router也非常简单,因为已经把Bundle作为Route的component参数了，<br>所以要再封装一层，把load和beforeLoad预先传入即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Bundle from &quot;./Bundle&quot;;
import About from &quot;bundle-loader?lazy&amp;name=[name]!./About&quot;;

const AboutWrapper = props => <Bundle load={About} {...props}/>;

class App extends Component {

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Route path=&quot;/about&quot; component={AboutWrapper}/>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Bundle <span class="hljs-keyword">from</span> <span class="hljs-string">"./Bundle"</span>;
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">"bundle-loader?lazy&amp;name=[name]!./About"</span>;

<span class="hljs-keyword">const</span> AboutWrapper = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> &lt;Bundle load={About} {...props}/&gt;;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/about"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AboutWrapper}/</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React组件懒加载

## 原文链接
[https://segmentfault.com/a/1190000010640236](https://segmentfault.com/a/1190000010640236)

