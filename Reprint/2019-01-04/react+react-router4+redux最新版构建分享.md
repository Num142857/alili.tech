---
title: 'react+react-router4+redux最新版构建分享' 
date: 2019-01-04 2:30:11
hidden: true
slug: 4os59l0zeel
categories: [reprint]
---

{{< raw >}}

                    
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相信很多刚入坑React的小伙伴们有一个同样的疑惑，由于React相关库不断的再进行版本迭代，网上很多以前的技术分享变得不再适用。比如<code>react-touter2</code>与<code>react-router4</code>在写法上存在不少区别，以前的调用方法将无法使得项目正常工作。我最近用React全家桶在构建一个spa，由于官方文档给的比较繁琐，使用类似<code>react-cli</code>的脚手架工具会使你的理解停留在表面，能用单反相机就不用傻瓜相机~~最好还是自己动手丰衣足食。在这里希望能用通俗易懂的方式来说一下如何快速构建spa。(PS:此文旨在让大家少走弯路，因此在项目结构上力求全而简)</p>
<hr>
<p>在此之前你先需要懂得基本的 nodejs 操作与 ES2015 语法。<br>通过<code>npm</code>安装webpack:<code>npm install webpack</code>,然后用node运行配配置文件(这里并非绝对，也可以直接在cmd里运行，但不推荐)</p>
<hr>
<p>首先给出项目结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--component    //组件文件夹
  ㄴ--hello.jsx    //组件jsx
  --more-component  //嵌套组件可以放在次级目录
--js
  ㄴ--common.js    //自己常用的js方法，
--css            
  ㄴ--hello.css   //每个组件对应一个css文件，便于管理
--img
--route
  ㄴ--router.jsx    //路由配置组件
--store            //redux相关
  ㄴ--action.js     //状态发起动作方法
  ㄴ--reducer.js    //接受动作后改变状态
entry.jsx          //打包入口
temp.html         //打包模板html
webpack.config.js  //webpack配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>--component    <span class="hljs-comment">//组件文件夹</span>
  ㄴ--hello<span class="hljs-selector-class">.jsx</span>    <span class="hljs-comment">//组件jsx</span>
  --more-component  <span class="hljs-comment">//嵌套组件可以放在次级目录</span>
--js
  ㄴ--common<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">//自己常用的js方法，</span>
--css            
  ㄴ--hello<span class="hljs-selector-class">.css</span>   <span class="hljs-comment">//每个组件对应一个css文件，便于管理</span>
--<span class="hljs-selector-tag">img</span>
--route
  ㄴ--router<span class="hljs-selector-class">.jsx</span>    <span class="hljs-comment">//路由配置组件</span>
--store            <span class="hljs-comment">//redux相关</span>
  ㄴ--action<span class="hljs-selector-class">.js</span>     <span class="hljs-comment">//状态发起动作方法</span>
  ㄴ--reducer<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">//接受动作后改变状态</span>
entry<span class="hljs-selector-class">.jsx</span>          <span class="hljs-comment">//打包入口</span>
temp<span class="hljs-selector-class">.html</span>         <span class="hljs-comment">//打包模板html</span>
webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">//webpack配置</span></code></pre>
<p>项目结构根据个人习惯可以修改，但原则上要保持条理清晰，有时候还要根据项目结构修改webpack配置等。</p>
<hr>
<p>接下来配置<code>webpack</code>,同时<code>npm</code>安装所需要的 <code>loader</code>。<code>webpack</code>相关配置请参考<a href="https://doc.webpack-china.org/configuration/" rel="nofollow noreferrer" target="_blank">webpack中文文档</a>。本章不多做赘述。<br>给出一个简单配置：<br>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&quot;webpack&quot;);
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const compiler = webpack({
    entry: &quot;./entry.jsx&quot;，
    output:{
        path: path.resolve(__dirname, &quot;./dist&quot;),
        filename:&quot;code.min.js&quot;
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                include:[path.resolve(__dirname, &quot;./&quot;)],
                loader:&quot;style-loader!css-loader&quot;
            },
            {
                test:/\.js$/,
                include:[path.resolve(__dirname, &quot;./&quot;)],
                loader:&quot;babel-loader&quot;,
                options: {
                    presets: ['es2015',&quot;stage-0&quot;]
                }
            },
            {
                test:/\.jsx$/,
                include:[path.resolve(__dirname, &quot;./&quot;)],
                loader:&quot;babel-loader&quot;,
                options: {
                    presets: ['es2015',&quot;stage-0&quot;,&quot;react&quot;]
                }
            },
            {
                test: /\.(png|jpeg|jpg)$/,
                include:[path.resolve(__dirname, &quot;./img&quot;)],
                loader:'file-loader?name=img/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./temp.html',
            filename:'./spa.html',
            inject:'body'
        })
    ]
});

const watching = compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => {
    if (err || stats.hasErrors())console.log(stats.compilation.errors);
    else{console.log('success')}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);

<span class="hljs-keyword">const</span> compiler = webpack({
    entry: <span class="hljs-string">"./entry.jsx"</span>，
    output:{
        path: path.resolve(__dirname, <span class="hljs-string">"./dist"</span>),
        filename:<span class="hljs-string">"code.min.js"</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                include:[path.resolve(__dirname, <span class="hljs-string">"./"</span>)],
                loader:<span class="hljs-string">"style-loader!css-loader"</span>
            },
            {
                test:<span class="hljs-regexp">/\.js$/</span>,
                include:[path.resolve(__dirname, <span class="hljs-string">"./"</span>)],
                loader:<span class="hljs-string">"babel-loader"</span>,
                options: {
                    presets: [<span class="hljs-string">'es2015'</span>,<span class="hljs-string">"stage-0"</span>]
                }
            },
            {
                test:<span class="hljs-regexp">/\.jsx$/</span>,
                include:[path.resolve(__dirname, <span class="hljs-string">"./"</span>)],
                loader:<span class="hljs-string">"babel-loader"</span>,
                options: {
                    presets: [<span class="hljs-string">'es2015'</span>,<span class="hljs-string">"stage-0"</span>,<span class="hljs-string">"react"</span>]
                }
            },
            {
                test: <span class="hljs-regexp">/\.(png|jpeg|jpg)$/</span>,
                include:[path.resolve(__dirname, <span class="hljs-string">"./img"</span>)],
                loader:<span class="hljs-string">'file-loader?name=img/[name]-[hash].[ext]'</span>
            }
        ]
    },
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            template:<span class="hljs-string">'./temp.html'</span>,
            filename:<span class="hljs-string">'./spa.html'</span>,
            inject:<span class="hljs-string">'body'</span>
        })
    ]
});

<span class="hljs-keyword">const</span> watching = compiler.watch({
    aggregateTimeout: <span class="hljs-number">300</span>,
    poll: <span class="hljs-literal">undefined</span>
}, <span class="hljs-function">(<span class="hljs-params">err, stats</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err || stats.hasErrors())<span class="hljs-built_in">console</span>.log(stats.compilation.errors);
    <span class="hljs-keyword">else</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success'</span>)}
})</code></pre>
<p>当编写好<code>webpack.config.js</code>文件后，我们只需要用node运行它，那么当我们的react项目改变时会自行编译到一个自动生成的<code>dist</code>文件夹里（建议一定开启监听文件改变编译，而不是每次改变后手动运行<code>webpack.config.js</code>，因为那样会很慢！）</p>
<hr>
<p>做好了这些准备工作，接下来正式进入 <code>React</code> 世界：<br>entry.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import todoApp from './store/reducers'
import Main from './route/router.jsx'

let store = createStore(todoApp)

render(
    <Main store={store} />,
    document.body
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> todoApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./store/reducers'</span>
<span class="hljs-keyword">import</span> Main <span class="hljs-keyword">from</span> <span class="hljs-string">'./route/router.jsx'</span>

<span class="hljs-keyword">let</span> store = createStore(todoApp)

render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Main</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span> /&gt;</span>,
    document.body
)</span></code></pre>
<p>上面<code>import</code>的模块请<code>npm</code>安装，我们在<code>entry</code>里仅仅创建一个状态管理的<code>store</code>对象，并且将<code>router.jsx</code>的路由模块渲染到<code>body</code>中，<code>reducers</code>是<code>redux</code>中具体需要更改哪些状态的js文件，在<code>creatStore</code>里绑定。(关于redux的更多使用方法及理解需要详细具体讲解，涉及篇幅较大，本文暂不涉及，有兴趣可以看文档<a href="http://cn.redux.js.org/" rel="nofollow noreferrer" target="_blank">redux中文文档</a>，我会整理后再单独章节分享)</p>
<hr>
<p>接下来我们将编写路由组件<br>router.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { HashRouter as Router,Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Hello from '../component/hello.jsx';

class Main extends React.Component {
    render(){
        const { store } = this.props
        return (
            <Router hashType=&quot;noslash&quot;>
                <Provider store={store}>
                <Route render={({ location }) => {
                    return(
                        <div key={location.pathname} name={location.pathname}>
                            <Route location={location} path=&quot;/hello&quot; component={Hello}/>
                        </div>
                    )
                "}}"/>
                </Provider>
            </Router>
        )
    }
}

export default Main ;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> { <span class="hljs-type">HashRouter</span> as <span class="hljs-type">Router</span>,<span class="hljs-type">Route</span> } from <span class="hljs-symbol">'react</span>-router-dom'
<span class="hljs-keyword">import</span> { <span class="hljs-type">Provider</span> } from <span class="hljs-symbol">'react</span>-redux'

<span class="hljs-keyword">import</span> <span class="hljs-type">Hello</span> from '../component/hello.jsx';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Main</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render(){
        const { store } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">Router</span> hashType=<span class="hljs-string">"noslash"</span>&gt;
                &lt;<span class="hljs-type">Provider</span> store={store}&gt;
                &lt;<span class="hljs-type">Route</span> render={({ location }) =&gt; {
                    <span class="hljs-keyword">return</span>(
                        &lt;div key={location.pathname} name={location.pathname}&gt;
                            &lt;<span class="hljs-type">Route</span> location={location} path=<span class="hljs-string">"/hello"</span> component={<span class="hljs-type">Hello</span>}/&gt;
                        &lt;/div&gt;
                    )
                "}}"/&gt;
                &lt;/<span class="hljs-type">Provider</span>&gt;
            &lt;/<span class="hljs-type">Router</span>&gt;
        )
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Main</span> ;</code></pre>
<p>这与<code>react-router2</code>有一些差别，原来的方法已经不再使用，在<code>react-router4</code>中<code>HashRouter</code>或<code>BrowserRouter</code>组件从<code>react-redux-dom</code>中引入。</p>
<hr>
<p>关于业务组件的编写，相信大家都很熟悉，即使以前使用<code>es5</code>开发的小伙伴也应该能很快上手<br>hello.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import '../css/xxx.css';
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../store/actions';

class Hello extends React.Component{
    constructor(props){
        super(props)
        this.state={...}
    }
    componentDidMount(){
        this.props.dispatch(action.hi())
    }
    render() {
        const { name } = this.props
        return (
            <div>{name}</div>
        )
    }
}

export default connect(state => state)(Hello)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'../css/xxx.css'</span>;
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> action <span class="hljs-keyword">from</span> <span class="hljs-string">'../store/actions'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props){
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state={...}
    }
    componentDidMount(){
        <span class="hljs-keyword">this</span>.props.dispatch(action.hi())
    }
    render() {
        <span class="hljs-keyword">const</span> { name } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state)(Hello)</code></pre>
<p>在这个组件里，我们将<code>redux</code>中管理的<code>state</code>和触发状态更改的<code>dispatch</code>方法通过<code>connect</code>绑定在了<code>props</code>中，可以随时调用，同时该组件将监听<code>redux</code>中<code>state</code>的变化实时更新数据。</p>
<hr>
<p>我们需要改变<code>redux</code>状态时所触发的动作<br>action.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const hi = () => {
    return {
        type:'hi',
        ...//其他你需要的属性
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> hi = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>:<span class="hljs-string">'hi'</span>,
        ...<span class="hljs-comment">//其他你需要的属性</span>
    }
}</code></pre>
<p>根据<code>redux</code>要求，这里的<code>type</code>属性是必须的，不能用别的字段名，否则运行时浏览器会报<code>type</code>不存在。</p>
<hr>
<p>接收<code>action</code>后执行状态改变的文件就是<br>reducers.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux'

const name = (state='', action) => {
    switch (action.type) {
        case 'hi':
            return &quot;hello world!&quot;
        default :
            return state
    }
}

const todoApp = combineReducers({
    name,
    //more state
})  

export default todoApp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { combineReducers } <span class="hljs-keyword">from</span> 'redux'

const name = (<span class="hljs-keyword">state</span>='', action) =&gt; {
    switch (action.type) {
        case 'hi':
            return <span class="hljs-string">"hello world!"</span>
        <span class="hljs-keyword">default</span> :
            return <span class="hljs-keyword">state</span>
    }
}

const todoApp = combineReducers({
    name,
    //more <span class="hljs-keyword">state</span>
})  

export <span class="hljs-keyword">default</span> todoApp;</code></pre>
<p><code>reducer</code>首先用<code>action</code>中传入的<code>type</code>属性来判断我们要做的是哪种操作，然后再根据传入的其他属性当做参数做你想要的改变，最后返回一个<code>{name : ...}</code>的对象，然后所有类似的对象通过<code>combineReducers</code>合并为一个总状态对象暴露给组件访问。</p>
<hr>
<p>当以上文件利用webpack编译打包好以后，一个最简单的react全家桶spa就完成了（虽然只包含一个组件）。<br>在实际的使用过程中，需要更多的库来使我们的应用更强大且美观。比如路由过度动画<code>react-addons-css-transition-group</code>，redux异步更改state数据<code>redux-thunk</code>，Ajax的兼容shim<code>whatwg-fetch</code>，移动端滚动<code>iscroll</code>等等。</p>
<p>关于<code>react-router4</code>与<code>redux</code>的详细用法还是建议要静下心来理解文档，这样才能在变化多端的开发需求中运用自如。（我之前也用过<code>vuex</code>，感觉相比之下<code>redux</code>文档稍显繁琐，<code>vuex</code>文档看了很容易就理解上手了）</p>
<p>如果感兴趣可以访问我的成熟项目源码<a href="https://github.com/yukilzw/hospital-app-by-React" rel="nofollow noreferrer" target="_blank">React医疗类移动app --Github</a>，欢迎各位多多指教，多多star ^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react+react-router4+redux最新版构建分享

## 原文链接
[https://segmentfault.com/a/1190000010632731](https://segmentfault.com/a/1190000010632731)

