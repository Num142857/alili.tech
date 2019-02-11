---
title: '玩物圈前端技术栈总结（React+Redux）' 
date: 2019-02-12 2:30:12
hidden: true
slug: e6ogpuhz3di
categories: [reprint]
---

{{< raw >}}

                    
<p>本文代码模版：<a href="https://github.com/logzh/react-redux-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">react-redux-webpack-boilerplate</a></p>
<p>好记性不如烂笔头，之前陆续写过几篇关于玩物圈前端所用到技术栈的总结，现在在<strong> <a href="http://wwq.qq.com" rel="nofollow noreferrer" target="_blank">玩物圈PC版</a> </strong>上线之前，将玩物圈前端用到技术栈整体简单总结梳理下。</p>
<p>前端基本框架图</p>
<p><span class="img-wrap"><img data-src="/img/bVtIC7?w=933&amp;h=747" src="https://static.alili.tech/img/bVtIC7?w=933&amp;h=747" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1、webpack</h2>
<p>webpack是一款模块加载器兼打包工具，具体使用参考<a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">官方文档</a>，<strong>很详细</strong>。</p>
<p>项目中的主要作用：</p>
<ul>
<li><p>模块管理：模块化管理js、css、image等文件</p></li>
<li><p>按照模板生成html：主要使用了html-webpack-plugin插件，按照模版生成html文件，并注入指定的chunks</p></li>
<li><p>静态资源管理，md5，路径重定位</p></li>
</ul>
<p>生产配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var path = require('path');
var entry = require('./entry.js');
var templateConfig = require('./html.template.config.js').pro;
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'static/js/vendor.[hash:8].js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: entry,
  output: {
    path: __dirname + '/product',
    publicPath: 'http://cdn.xx.com/', 
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],// 配置可以不书写的后缀名
    root: path.join(__dirname, 'public/') //配置绝对路径，alias、entry中会使用
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'public'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(jpg|png|gif)$/,
        loader: 'url?limit=1024&amp;name=static/images/[hash].[ext]'//小于1kb的图片转化为base64，css中其他的图片地址会被体会为打包的地址，此处用到了publicPath
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')}
    ]
  },
  plugins: [
    commonsPlugin,
    new ExtractTextPlugin('static/css/[name].[chunkhash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '&quot;production&quot;'
    }),
    commonsPlugin
  ]
};

for (var i = 0; i < templateConfig.length; i++) {
  config.plugins.push(new HtmlWebpackPlugin(templateConfig[i]));
}

module.exports = config;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> entry = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./entry.js'</span>);
<span class="hljs-keyword">var</span> templateConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./html.template.config.js'</span>).pro;
<span class="hljs-keyword">var</span> commonsPlugin = <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'static/js/vendor.[hash:8].js'</span>);

<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-keyword">var</span> config = {
  entry: entry,
  output: {
    path: __dirname + <span class="hljs-string">'/product'</span>,
    publicPath: <span class="hljs-string">'http://cdn.xx.com/'</span>, 
    filename: <span class="hljs-string">'static/js/[name].[chunkhash:8].js'</span>
  },
  resolve: {
    extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>],<span class="hljs-comment">// 配置可以不书写的后缀名</span>
    root: path.join(__dirname, <span class="hljs-string">'public/'</span>) <span class="hljs-comment">//配置绝对路径，alias、entry中会使用</span>
  },
  <span class="hljs-keyword">module</span>: {
    loaders: [
      {
        test: <span class="hljs-regexp">/\.js[x]?$/</span>,
        include: path.resolve(__dirname, <span class="hljs-string">'public'</span>),
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        loader: <span class="hljs-string">'babel-loader'</span>
      }, {
        test: <span class="hljs-regexp">/\.(jpg|png|gif)$/</span>,
        loader: <span class="hljs-string">'url?limit=1024&amp;name=static/images/[hash].[ext]'</span><span class="hljs-comment">//小于1kb的图片转化为base64，css中其他的图片地址会被体会为打包的地址，此处用到了publicPath</span>
      },
      {test: <span class="hljs-regexp">/\.css$/</span>, loader: ExtractTextPlugin.extract(<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader?sourceMap'</span>)}
    ]
  },
  plugins: [
    commonsPlugin,
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'static/css/[name].[chunkhash:8].css'</span>),
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-string">'"production"'</span>
    }),
    commonsPlugin
  ]
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; templateConfig.length; i++) {
  config.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(templateConfig[i]));
}

<span class="hljs-built_in">module</span>.exports = config;
</code></pre>
<p>参考文档：</p>
<ul>
<li><p><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">官方文档</a></p></li>
<li><p><a href="https://github.com/ruanyf/react-babel-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">阮一峰 react-babel-webpack-boilerplate</a></p></li>
</ul>
<h2 id="articleHeader1">2、Babel</h2>
<p><a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a>是一个广泛使用的转码器，可以将ES6代码转为ES5代码，JSX语法代码转为ES5代码。<br>项目中主要使用Babel将源代码ES6、JSX转码为ES5。</p>
<h2 id="articleHeader2">3、React</h2>
<p>React提供应用的 View 层，表现为组件，具体参考<a href="http://facebook.github.io/react/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<p>主要知识点：</p>
<ul>
<li><p>JSX （可选的）</p></li>
<li><p>组件（props、state、生命周期、事件、Form、几个api）</p></li>
<li><p>Virtual Dom</p></li>
</ul>
<p>参考：</p>
<ul>
<li><p><a href="http://facebook.github.io/react/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">官方文档</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004657228">React入门总结(JSX与组件)</a></p></li>
</ul>
<h2 id="articleHeader3">4、Redux（单向数据流）</h2>
<p>Redux 是 JavaScript 状态容器，提供可预测化的状态管理。本身跟react没有任何关系。</p>
<p>Redux 除了和 React 一起用外，还支持其它界面库。</p>
<h3 id="articleHeader4">4.1 基本思想</h3>
<p>可以参考<a href="https://segmentfault.com/a/1190000004660632" target="_blank">Redux：一种更优雅的 Flux 实现</a></p>
<ul>
<li>
<p>Action（普通Action、异步Action）</p>
<ul>
<li><p>普通Action，本质是JS普通对象</p></li>
<li><p>异步Action，使用了 Thunk middleware 异步 action</p></li>
</ul>
</li>
<li>
<p>Reducer</p>
<ul>
<li><p>( previousState, action ) =&gt; newState</p></li>
<li><p>处理数据逻辑</p></li>
<li><p>拆分和合并reducer（用 ES6 的 import、export 语法，非常方便）</p></li>
</ul>
</li>
<li>
<p>Store</p>
<ul><li><p>联系Action与Reducer的对象，为应用提供state</p></li></ul>
</li>
</ul>
<h3 id="articleHeader5">4.2 中间件Middleware</h3>
<p>类似 Express 或 Koa 框架中的中间件。它提供的是位于 action 被发起之后，到达 reducer 之前的扩展。<br>中间件的设计使用了非常多的函数式编程的思想，包括：高阶函数，复合函数，柯里化和ES6语法，源码仅仅20行左右。<br>项目中主要使用了三个中间件，分别解决不同的问题。</p>
<ul>
<li><p>thunkMiddleware：处理异步Action</p></li>
<li><p>apiMiddleware：统一处理API请求。一般情况下，每个 API 请求都至少需要 dispatch 三个不同的 action（请求前、请求成功、请求失败），通过这个中间件可以很方便处理。</p></li>
<li><p>loggerMiddleware：开发环境调试使用，控制台输出应用state日志</p></li>
</ul>
<p>参考：</p>
<ul>
<li><p><a href="http://camsong.github.io/redux-in-chinese/" rel="nofollow noreferrer" target="_blank">redux中文文档</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004660632">Redux 入门总结</a></p></li>
</ul>
<h2 id="articleHeader6">5、react-redux</h2>
<p>react-redux的作用是连接（connect）store和容器组件的。store是redux提供的，容器组件是react提供的。</p>
<h3 id="articleHeader7">5.1 组织应用的组件</h3>
<ul><li>
<p>组织应用的组件</p>
<ul>
<li><p>容器组件</p></li>
<li><p>展示组件</p></li>
</ul>
</li></ul>
<p>容器组件：位于应用最顶层的组件，用来与redux连接的。从redux中获取数据作为props。<br>展示组件：位于应用的中间或者子组件，是纯粹的组件，与redux没有关系。他们从自己的父组件获取数据作为props，他们的共同根组件是应用的唯一的容器组件。展示组件可以维持少量的自身状态信息。</p>
<h3 id="articleHeader8">5.2 连接Store与组件</h3>
<p>react-redux仅仅提供两个关键模块：Provider和connect。</p>
<p>源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Provider from './components/Provider'
import connect from './components/connect'

export { Provider, connect }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> Provider from <span class="hljs-string">'./components/Provider'</span>
<span class="hljs-keyword">import</span> <span class="hljs-built_in">connect</span> from <span class="hljs-string">'./components/connect'</span>

<span class="hljs-keyword">export</span> { Provider, <span class="hljs-built_in">connect</span> }</code></pre>
<ul><li><p>Provider：是一个组件，接受一个store属性和一个子组件（也就是上面说到的：store是redux提供的，容器组件是是react提供的。）</p></li></ul>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <Provider store={store}>
      {/* note &quot;routerState&quot; here: important to pass it down */}
      <Handler routerState={routerState} />
    </Provider>,
    document.getElementById('root')
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">ReactDOM.render(
    <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=</span></span><span class="hljs-template-variable">{store}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      </span><span class="hljs-template-tag">{/* <span class="hljs-name">note</span> <span class="hljs-string">"routerState"</span> here: important to pass it down */}</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">Handler</span> <span class="hljs-attr">routerState</span>=</span></span><span class="hljs-template-variable">{routerState}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>,
    document.getElementById('root')
  );</span></code></pre>
<ul><li><p>connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])：connect返回一个函数，它接受一个React组件的构造函数作为连接对象，最终返回连接好的组件构造函数。</p></li></ul>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps, actionCreators)(MyRootComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import * as actionCreators <span class="hljs-keyword">from</span> './actionCreators'

function mapStateToProps(<span class="hljs-keyword">state</span>) {
  return { todos: <span class="hljs-keyword">state</span>.todos }
}

export <span class="hljs-keyword">default</span> connect(mapStateToProps, actionCreators)(MyRootComponent)</code></pre>
<p>参考：</p>
<ul>
<li><p><a href="http://camsong.github.io/redux-in-chinese/" rel="nofollow noreferrer" target="_blank">redux中文文档</a></p></li>
<li><p><a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux项目</a></p></li>
</ul>
<h2 id="articleHeader9">6、ES6</h2>
<p>目前主流的框架（Angular2，React，Koa，Redux）全面转向ES6。项目中使用了部分ES6的明星特性。一开始我是拒绝的，不习惯，现在的感觉是：非常方便，非常爽。</p>
<h3 id="articleHeader10">6.1 Class和Module</h3>
<p>模块化：组件按模块编写以及使用、Action和Reducer按模块拆分合并、使用第三方模块，这些在项目中都是使用的是ES6的Module特性，其中编写React组件使用了ES6的Class特性。</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Types} from '../constants/base/order';

export * from './base/user';
export {fetchCart} from './base/shopCart';
export {fetchOrder} from './base/order';

export function fetchPayResult(id) {
  return {
    url: '/mall/order/payResult/' + id,
    method: 'GET',
    types: ['REQUEST', Types.FETCH_PAY_RESULT, 'FAILURE']
  };
}

export function changePayType(payType) {
  return {
    type: Types.SELECT_PAY_TYPE, payType
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {Types} <span class="hljs-keyword">from</span> <span class="hljs-string">'../constants/base/order'</span>;

<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">'./base/user'</span>;
<span class="hljs-keyword">export</span> {fetchCart} <span class="hljs-keyword">from</span> <span class="hljs-string">'./base/shopCart'</span>;
<span class="hljs-keyword">export</span> {fetchOrder} <span class="hljs-keyword">from</span> <span class="hljs-string">'./base/order'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchPayResult</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">url</span>: <span class="hljs-string">'/mall/order/payResult/'</span> + id,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">types</span>: [<span class="hljs-string">'REQUEST'</span>, Types.FETCH_PAY_RESULT, <span class="hljs-string">'FAILURE'</span>]
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changePayType</span>(<span class="hljs-params">payType</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: Types.SELECT_PAY_TYPE, payType
  };
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {count: props.initialCount};
  }
  tick() {
    <span class="hljs-keyword">this</span>.setState({count: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>});
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div onClick={<span class="hljs-keyword">this</span>.tick.bind(<span class="hljs-keyword">this</span>)}&gt;
        <span class="hljs-type">Clicks</span>: {<span class="hljs-keyword">this</span>.state.count}
      &lt;/div&gt;
    );
  }
}
<span class="hljs-type">Counter</span>.propTypes = { initialCount: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.number };
<span class="hljs-type">Counter</span>.defaultProps = { initialCount: <span class="hljs-number">0</span> };</code></pre>
<h3 id="articleHeader11">6.2 变量结构赋值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var {
      types,
      url = '',
      mockUrl = '',
      method = 'GET',
      dataType = 'json',
      data = {}
      } = action;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> {
      types,
      url = <span class="hljs-string">''</span>,
      mockUrl = <span class="hljs-string">''</span>,
      method = <span class="hljs-string">'GET'</span>,
      dataType = <span class="hljs-string">'json'</span>,
      <span class="hljs-keyword">data</span> = {}
      } = action;</code></pre>
<h3 id="articleHeader12">6.3 函数的扩展：箭头函数、函数参数的默认值</h3>
<ul><li><p>箭头函数：箭头函数在项目中也用得比较多，简化函数的编写，React Stateless function components 的编写。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const noop = ()=> false;

let createItem = (item, index) =><Order order={item} key={index}/>;

const Coupon = (props) => (
    <li>
      <div className=&quot;coupon-tit&quot;>抵用券</div>
      <div className=&quot;coupon-price&quot;><span>￥</span><strong>{props.coupon.price}</strong></div>
      <div className=&quot;coupon-info&quot;>
        <p>{props.coupon.code}</p>

        <p className=&quot;time&quot;>{props.coupon.endTime}前可用</p>
      </div>
    </li>
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> noop = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> <span class="hljs-literal">false</span>;

<span class="hljs-keyword">let</span> createItem = <span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Order</span> <span class="hljs-attr">order</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}/</span>&gt;</span>;

const Coupon = (props) =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"coupon-tit"</span>&gt;</span>抵用券<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"coupon-price"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>￥<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>{props.coupon.price}<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"coupon-info"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{props.coupon.code}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"time"</span>&gt;</span>{props.coupon.endTime}前可用<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
);
</span></code></pre>
<ul><li><p>函数参数的默认值：典型的应用是编写Reducer。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function address(state = {}, action) {
  switch (action.type) {
    case Types.SELECT_ADDRESS:
      return objectAssign({}, action.payload);
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>export <span class="hljs-function"><span class="hljs-keyword">function</span></span> address(state = {}, <span class="hljs-keyword">action</span>) {
  switch (<span class="hljs-keyword">action</span>.<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> Types.SELECT_ADDRESS:
      <span class="hljs-keyword">return</span> objectAssign({}, <span class="hljs-keyword">action</span>.payload);
...</code></pre>
<h3 id="articleHeader13">6.4 字符串扩展：模板字符串</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="href={`/pc/mall/order/confirm.html?${param}`}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">href={`<span class="hljs-regexp">/pc/m</span>all<span class="hljs-regexp">/order/</span>confirm.html?<span class="hljs-variable">${param}</span>`}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
    mockUrl: '/static/mock/user.address.save.json',
    url: `/user/address/${id}`,
    method: 'PUT',
    data: {id, isDefault},
    types: ['REQUEST', Types.SET_DEFAULT_ADDRESS, 'FAILURE']
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>return <span class="hljs-comment">{
    mockUrl: '/static/mock/user.address.save.json',
    url: `/user/address/${id}</span>`,
    <span class="hljs-function"><span class="hljs-keyword">method</span>:</span> <span class="hljs-string">'PUT'</span>,
    data: <span class="hljs-comment">{id, isDefault}</span>,
    types: [<span class="hljs-string">'REQUEST'</span>, Types.SET_DEFAULT_ADDRESS, <span class="hljs-string">'FAILURE'</span>]
  };</code></pre>
<h3 id="articleHeader14">6.5 对象的扩展：属性的简洁表示法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setVisibilityFilter = <span class="hljs-function">(<span class="hljs-params">filter</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'SET_VISIBILITY_FILTER'</span>,
    filter
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
    mockUrl: '/static/mock/user.address.save.json',
    url: `/user/address/${id}`,
    method: 'PUT',
    data: {id, isDefault},
    types: ['REQUEST', Types.SET_DEFAULT_ADDRESS, 'FAILURE']
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>return <span class="hljs-comment">{
    mockUrl: '/static/mock/user.address.save.json',
    url: `/user/address/${id}</span>`,
    <span class="hljs-function"><span class="hljs-keyword">method</span>:</span> <span class="hljs-string">'PUT'</span>,
    data: <span class="hljs-comment">{id, isDefault}</span>,
    types: [<span class="hljs-string">'REQUEST'</span>, Types.SET_DEFAULT_ADDRESS, <span class="hljs-string">'FAILURE'</span>]
  };</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="App.defaultProps = {
  user: {},
  tips: {visible: false},
  carts: [],
  visibleDropCart: false,
  visibleLoginDialog: false,
  switchLoginDialog() {
  },
  switchTips() {
  },
  switchDropCart() {
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">App.defaultProps</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  user:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">  tips:</span> <span class="hljs-string">{visible:</span> <span class="hljs-literal">false</span><span class="hljs-string">},</span>
<span class="hljs-attr">  carts:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">  visibleDropCart:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  visibleLoginDialog:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
  <span class="hljs-string">switchLoginDialog()</span> <span class="hljs-string">{</span>
  <span class="hljs-string">},</span>
  <span class="hljs-string">switchTips()</span> <span class="hljs-string">{</span>
  <span class="hljs-string">},</span>
  <span class="hljs-string">switchDropCart()</span> <span class="hljs-string">{</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">};</span></code></pre>
<h3 id="articleHeader15">6.6 let和const</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const noop = ()=> false;

let createItem = (item, index) =><Order order={item} key={index}/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> noop = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> <span class="hljs-literal">false</span>;

<span class="hljs-keyword">let</span> createItem = <span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Order</span> <span class="hljs-attr">order</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}/</span>&gt;</span>;</span></code></pre>
<p>参考：</p>
<ul><li><p><a href="https://wohugb.gitbooks.io/ecmascript-6/content/docs/intro.html" rel="nofollow noreferrer" target="_blank">Ecmascript 6 入门</a></p></li></ul>
<h2 id="articleHeader16">7、Gulp</h2>
<p>Gulp与Grunt一样，也是一个自动任务运行器。它充分借鉴了Unix操作系统的管道（pipe）思想，很多人认为，在操作上，它要比Grunt简单。</p>
<p>项目中主要用到的功能：结合webpack使用、压缩js、ESLint代码检查、压缩css。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require(&quot;gulp&quot;);
var gutil = require(&quot;gulp-util&quot;);
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var reporter = require('eslint-html-reporter');
var fs = require('fs');
var path = require('path');

var webpack = require(&quot;webpack&quot;);

var webpackConfigProduct = require(&quot;./webpack.production.config.js&quot;);
var webpackConfigDevelop = require(&quot;./webpack.development.config.js&quot;);

gulp.task(&quot;webpack&quot;, function(callback) {
  webpack(webpackConfigProduct, function(err, stats) {
    if (err) throw new gutil.PluginError(&quot;webpack&quot;, err);
    callback();
  });
});

gulp.task(&quot;webpackDevelop&quot;, function(callback) {
  webpack(webpackConfigDevelop, function(err, stats) {
    if (err) throw new gutil.PluginError(&quot;webpack&quot;, err);
    callback();
  });
});

var srcJsDir = './public/static/js/';

gulp.task('lint', function() {
  return gulp.src([srcJsDir + '**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format(reporter, function(results) {
            fs.writeFileSync(path.join(__dirname, 'lint-report.html'), results);
          })
      );
});

gulp.task(&quot;minifyJs&quot;, ['webpack'], function() {
  return gulp.src(&quot;./product/**/*.js&quot;)
      .pipe(uglify({
        output: {
          max_line_len: 100
        }
      }))
      .pipe(gulp.dest(&quot;./product&quot;));
});

gulp.task(&quot;minifycssPro&quot;, ['webpack'], function() {
  return gulp.src(&quot;./product/**/*.css&quot;)
      .pipe(minifyCss())
      .pipe(gulp.dest(&quot;./product&quot;));
});

gulp.task(&quot;minifycssDev&quot;, ['webpackDevelop'], function() {
  return gulp.src(&quot;./development/**/*.css&quot;)
      .pipe(minifyCss())
      .pipe(gulp.dest(&quot;./development&quot;));
});

gulp.task('copyJson', function() {
  return gulp.src('./public/static/mock/**/*.json')
      .pipe(gulp.dest('./development/static/mock/'));
});

gulp.task('product', ['minifycssPro', 'minifyJs']);

gulp.task('default', ['minifycssDev', 'copyJson']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp"</span>);
<span class="hljs-keyword">var</span> gutil = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-util"</span>);
<span class="hljs-keyword">var</span> minifyCss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-minify-css'</span>);
<span class="hljs-keyword">var</span> uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-uglify'</span>);
<span class="hljs-keyword">var</span> eslint = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-eslint'</span>);
<span class="hljs-keyword">var</span> reporter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-html-reporter'</span>);
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);

<span class="hljs-keyword">var</span> webpackConfigProduct = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.production.config.js"</span>);
<span class="hljs-keyword">var</span> webpackConfigDevelop = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.development.config.js"</span>);

gulp.task(<span class="hljs-string">"webpack"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
  webpack(webpackConfigProduct, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> gutil.PluginError(<span class="hljs-string">"webpack"</span>, err);
    callback();
  });
});

gulp.task(<span class="hljs-string">"webpackDevelop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
  webpack(webpackConfigDevelop, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> gutil.PluginError(<span class="hljs-string">"webpack"</span>, err);
    callback();
  });
});

<span class="hljs-keyword">var</span> srcJsDir = <span class="hljs-string">'./public/static/js/'</span>;

gulp.task(<span class="hljs-string">'lint'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src([srcJsDir + <span class="hljs-string">'**/*.js'</span>])
      .pipe(eslint())
      .pipe(eslint.format(reporter, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">results</span>) </span>{
            fs.writeFileSync(path.join(__dirname, <span class="hljs-string">'lint-report.html'</span>), results);
          })
      );
});

gulp.task(<span class="hljs-string">"minifyJs"</span>, [<span class="hljs-string">'webpack'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"./product/**/*.js"</span>)
      .pipe(uglify({
        <span class="hljs-attr">output</span>: {
          <span class="hljs-attr">max_line_len</span>: <span class="hljs-number">100</span>
        }
      }))
      .pipe(gulp.dest(<span class="hljs-string">"./product"</span>));
});

gulp.task(<span class="hljs-string">"minifycssPro"</span>, [<span class="hljs-string">'webpack'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"./product/**/*.css"</span>)
      .pipe(minifyCss())
      .pipe(gulp.dest(<span class="hljs-string">"./product"</span>));
});

gulp.task(<span class="hljs-string">"minifycssDev"</span>, [<span class="hljs-string">'webpackDevelop'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"./development/**/*.css"</span>)
      .pipe(minifyCss())
      .pipe(gulp.dest(<span class="hljs-string">"./development"</span>));
});

gulp.task(<span class="hljs-string">'copyJson'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./public/static/mock/**/*.json'</span>)
      .pipe(gulp.dest(<span class="hljs-string">'./development/static/mock/'</span>));
});

gulp.task(<span class="hljs-string">'product'</span>, [<span class="hljs-string">'minifycssPro'</span>, <span class="hljs-string">'minifyJs'</span>]);

gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'minifycssDev'</span>, <span class="hljs-string">'copyJson'</span>]);</code></pre>
<p>参考：</p>
<ul>
<li><p><a href="http://gulpjs.com/" rel="nofollow noreferrer" target="_blank">官网</a></p></li>
<li><p><a href="http://javascript.ruanyifeng.com/tool/gulp.html" rel="nofollow noreferrer" target="_blank">Gulp：任务自动管理工具</a></p></li>
<li><p><a href="https://webpack.github.io/docs/usage-with-gulp.html" rel="nofollow noreferrer" target="_blank">usage with gulp - Webpack</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩物圈前端技术栈总结（React+Redux）

## 原文链接
[https://segmentfault.com/a/1190000004660725](https://segmentfault.com/a/1190000004660725)

