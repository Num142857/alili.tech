---
title: 'React+webpack+es6的环境配置及demo改写' 
date: 2019-02-10 2:30:42
hidden: true
slug: rz5d1kp841
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/react-learning" rel="nofollow noreferrer" target="_blank">jrainlau/react-es6</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/jrainlau/react-learning
cd react-learning &amp;&amp; npm install
npm run dev

然后浏览器打开localhost:8080即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>git clone http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/jrainlau/react-learning
<span class="hljs-keyword">cd</span> react-learning &amp;&amp; npm install
npm run dev

然后浏览器打开localhos<span class="hljs-variable">t:8080</span>即可</code></pre>
<p>最近在家闲得无聊，所以打算折腾一下react。在此之前，我是一个vue的重度使用用户，但是看到react确实非常火爆，所以也就趁此机会去了解一下react，增长一下见识。</p>
<p>学习react的参考资料，很大一部分来自 @阮一峰 的<a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">React入门实例教程</a>。但是阮大神是用传统的<code>script</code>标签以及es5的写法，所以我针对教程，通过配置webpack，最终使用es6的写法来改写教程的demo，结合组件化的思想，完成最终的demo的改写。</p>
<h2 id="articleHeader1">环境配置</h2>
<p>环境配置参照了<a href="/u/minooo">@minooo</a> 的文章：<a href="http://sfau.lt/b5tnpX" rel="nofollow noreferrer" target="_blank">webpack-es6-react （为系统学习React布一个良好的开局）</a>。这里引用一些关键包的说明：</p>
<blockquote>
<h3 id="articleHeader2">package.json 中的 包/库 部分说明</h3>
<ul>
<li><p><code>babel-core</code> babel6 的基础模块</p></li>
<li><p><code>babel-eslint</code> <a href="https://github.com/eslint/eslint" rel="nofollow noreferrer" target="_blank">ESLint</a> 是前端JS代码检测利器。而 <a href="http://npm.taobao.org/package/babel-eslint" rel="nofollow noreferrer" target="_blank">babel-eslint</a> 则允许你检测所有的 Babel 代码。</p></li>
<li><p><code>babel-loader</code> 这个包允许你使用 Babel 和 webpack 转译（Transpiling） JavaScript 文件。</p></li>
<li><p><code>babel-plugin-react-transform</code> 这个插件通过任意转换的方式去封装 React 组件。换句话说，你可以随心所欲的摆弄你的组件了。</p></li>
<li><p><code>babel-plugin-transform-runtime</code> 在 Babel 转换过程中，详细的展示引用的相关辅助工具和内置命令，并自动的聚合填充你的代码而不会污染全局。</p></li>
<li><p><code>babel-preset-es2015</code> 此预设包含了所有的 es2015 插件。</p></li>
<li><p><code>babel-preset-react</code> 此预设包含了所有的 React 插件。</p></li>
<li><p><code>babel-preset-stage-0</code> 此预设包含了 stage 0 中的所有插件。</p></li>
<li><p><code>eslint</code> JavaScript 语法检测利器：分析出你代码潜在的错误和非标准用法。</p></li>
<li><p><code>eslint-plugin-react</code>  ESLint 中关于 React 语法检测的插件。</p></li>
<li><p><code>react-transform-hmr</code> 一个 React 转换装置，该装置通过引用 Hot Module Replacement API 使热重载 React 的类成为可能。</p></li>
<li><p><code>react-transform-catch-errors</code> 呈现你 React 组件的错误信息。</p></li>
<li><p><code>webpack-dev-server</code> 为 wepack app 提供一个服务器，如果你的代码有任何变化，浏览器将自动刷新显示，极大的方便前期开发。</p></li>
<li><p><code>babel-runtime</code> Babel 自带的运行环境。</p></li>
</ul>
</blockquote>
<p>另外，我增加了<code>style-loader</code>，<code>css-loader</code>，<code>less</code>，<code>less-loader</code>这四个包用于加载<code>.less</code>文件模块。（注意，<code>less-loader</code>与<code>less</code>必须同时存在才能正常工作。）</p>
<blockquote>
<h3 id="articleHeader3">根目录下文件部分说明</h3>
<ul>
<li><p><code>.babelrc</code> : 什么是 <code>.babelrc</code> 文件呢？熟悉 linux 的同学一定知道，rc 结尾的文件通常代表运行时自动加载的文件，配置等。同样在这里也是有同样作用的。里面的 <code>env</code> 字段，可以对 BABEL_ENV 或 NODE_ENV 指定不同的环境变量，进行不同编译。</p></li>
<li><p><code>eslintignore</code> 通知 <code>eslint</code> 忽略那些不应该被检测的文件。</p></li>
<li><p><code>eslintrc</code> eslint 配置文件，使 JavaScript 代码规范化，标准化书写。</p></li>
</ul>
</blockquote>
<h2 id="articleHeader4">使用es6改写demo</h2>
<p>首先可以参考这篇文章<a href="https://babeljs.io/blog/2015/06/07/react-on-es6-plus" rel="nofollow noreferrer" target="_blank">React on ES6+</a>，里面提及了关于如何使用es6进行react开发的方法。</p>
<blockquote><p>使用<code>React.Component</code>代替<code>React.createClass</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The ES5 way
var Photo = React.createClass({
  handleDoubleTap: function(e) { … },
  render: function() { … },
});

// The ES6+ way
class Photo extends React.Component {
  handleDoubleTap(e) { … }
  render() { … }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// The ES5 way</span>
<span class="hljs-keyword">var</span> <span class="hljs-type">Photo</span> = <span class="hljs-type">React</span>.createClass({
  handleDoubleTap: function(e) { … },
  render: function() { … },
});

<span class="hljs-comment">// The ES6+ way</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Photo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleDoubleTap(e) { … }
  render() { … }
}</code></pre>
<blockquote><p>使用<code>static</code>关键字完成属性初始化工作（这是es7的内容，注意<code>state</code>可以直接通过<code>state = { key: value }</code>来定义）</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The ES5 way
var Video = React.createClass({
  getDefaultProps: function() {
    return {
      autoPlay: false,
      maxLoops: 10,
    };
  },
  getInitialState: function() {
    return {
      loopsRemaining: this.props.maxLoops,
    };
  },
  propTypes: {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired,
    posterFrameSrc: React.PropTypes.string.isRequired,
    videoSrc: React.PropTypes.string.isRequired,
  },
});

// The ES6+ way
class Video extends React.Component {
  static defaultProps = {
    autoPlay: false,
    maxLoops: 10,
  }
  static propTypes = {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired,
    posterFrameSrc: React.PropTypes.string.isRequired,
    videoSrc: React.PropTypes.string.isRequired,
  }
  state = {
    loopsRemaining: this.props.maxLoops,
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// The ES5 way</span>
var Video = React.createClass({
<span class="hljs-symbol">  getDefaultProps:</span> function() {
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">      autoPlay:</span> false,
<span class="hljs-symbol">      maxLoops:</span> <span class="hljs-number">10</span>,
    };
  },
<span class="hljs-symbol">  getInitialState:</span> function() {
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">      loopsRemaining:</span> this.props.maxLoops,
    };
  },
<span class="hljs-symbol">  propTypes:</span> {
<span class="hljs-symbol">    autoPlay:</span> React.PropTypes.bool.isRequired,
<span class="hljs-symbol">    maxLoops:</span> React.PropTypes.number.isRequired,
<span class="hljs-symbol">    posterFrameSrc:</span> React.PropTypes.string.isRequired,
<span class="hljs-symbol">    videoSrc:</span> React.PropTypes.string.isRequired,
  },
});

<span class="hljs-comment">// The ES6+ way</span>
class Video extends React.<span class="hljs-class">Component </span>{
  static defaultProps = {
<span class="hljs-symbol">    autoPlay:</span> false,
<span class="hljs-symbol">    maxLoops:</span> <span class="hljs-number">10</span>,
  }
  static propTypes = {
<span class="hljs-symbol">    autoPlay:</span> React.PropTypes.bool.isRequired,
<span class="hljs-symbol">    maxLoops:</span> React.PropTypes.number.isRequired,
<span class="hljs-symbol">    posterFrameSrc:</span> React.PropTypes.string.isRequired,
<span class="hljs-symbol">    videoSrc:</span> React.PropTypes.string.isRequired,
  }
  state = {
<span class="hljs-symbol">    loopsRemaining:</span> this.props.maxLoops,
  }
}</code></pre>
<blockquote><p>在<code>constractor</code>中定义<code>state</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The ES5 way
var Video = React.createClass({
  getInitialState: function() {
    return {
      loopsRemaining: ...
    };
  }
});

//The ES6 way
class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loopsRemaining: ...
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// The ES5 way</span>
<span class="hljs-keyword">var</span> <span class="hljs-type">Video</span> = <span class="hljs-type">React</span>.createClass({
  getInitialState: function() {
    <span class="hljs-keyword">return</span> {
      loopsRemaining: ...
    };
  }
});

<span class="hljs-comment">//The ES6 way</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Video</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state = {
            loopsRemaining: ...
        }
    }
}</code></pre>
<h2 id="articleHeader5">组件化思路</h2>
<p>通过es6的模块功能，可以很方便地利用webpack实现页面组件化。</p>
<p>我们总共有7个小的demo，我把它们作为不同的组件，最终加载到根组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js

import React, { Component } from 'react'
import Component1 from './demo1.js'
import Component2 from './demo2.js'
import Component3 from './demo3.js'
import Component4 from './demo4.js'
import Component5 from './demo5.js'
import Component6 from './demo6.js'
import Component7 from './demo7.js'

export default class Demo extends Component {
  render() {
    return (
      <div>
        <Component1></Component1>
        <Component2></Component2>
        <Component3 title='Props example'></Component3>
        <Component4>
            <span>Hello</span>
            <span>React</span>
        </Component4>
        <Component5 content='This is the content'></Component5>
        <Component6></Component6>
        <Component7></Component7>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app.js</span>

<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Component1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo1.js'</span>
<span class="hljs-keyword">import</span> Component2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo2.js'</span>
<span class="hljs-keyword">import</span> Component3 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo3.js'</span>
<span class="hljs-keyword">import</span> Component4 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo4.js'</span>
<span class="hljs-keyword">import</span> Component5 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo5.js'</span>
<span class="hljs-keyword">import</span> Component6 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo6.js'</span>
<span class="hljs-keyword">import</span> Component7 <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo7.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Component1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Component2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component3</span> <span class="hljs-attr">title</span>=<span class="hljs-string">'Props example'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Component3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component4</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>React<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Component4</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component5</span> <span class="hljs-attr">content</span>=<span class="hljs-string">'This is the content'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Component5</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component6</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Component6</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Component7</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Component7</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>具体请进入<a href="https://github.com/jrainlau/react-learning" rel="nofollow noreferrer" target="_blank">我的项目</a>查看代码。</p>
<p>可以看到，通过es6的改写，在react中实现组件化是非常清晰简单的，只需要把需要的组件import进来即可。</p>
<p>另外，由于我非常讨厌行内样式，并且是不写less会死星人，所以并没有按照官方推荐的样子去定义一个<code>style object</code>，而是通过<code>less-loader</code>在需要定义样式的地方直接把样式require进来，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo7.js

render() {
    let word = this.state.words
    require('../less/test.less')
    return (
        <div>
            <h3 className='test-h1'>DEMO 7, state</h3>
            <p>{ word }</p>
            <input type=&quot;text&quot; onChange={ this.stateFn }/>
            <hr/>
        </div>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// demo7.js</span>

render() {
    <span class="hljs-keyword">let</span> word = <span class="hljs-keyword">this</span>.state.words
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'../less/test.less'</span>)
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'test-h1'</span>&gt;</span>DEMO 7, state<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{ word }<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{</span> <span class="hljs-attr">this.stateFn</span> }/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
}</span></code></pre>
<h2 id="articleHeader6">结语</h2>
<p>这个demo仅仅作为入门学习使用，react更多深层次的内容可能会在后续慢慢更新，比如加上react-router，redux什么的……如果这篇文章能够对你有所启发是最好不过，如果有任何错漏也欢迎拍砖指出，谢谢大家~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React+webpack+es6的环境配置及demo改写

## 原文链接
[https://segmentfault.com/a/1190000005121464](https://segmentfault.com/a/1190000005121464)

