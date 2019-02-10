---
title: 'React移动项目总结' 
date: 2019-02-11 2:30:49
hidden: true
slug: 4gt1y6yqp4k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React移动项目总结</h1>
<h2 id="articleHeader1">背景</h2>
<p>接触React半年了，一路走过来，团队做了几个项目，不断的总结经验，不断的重构，也看了很多大牛总结的react经验。<br>尝试把自己遇到的问题总结分享出来，希望更多前辈指导指导。</p>
<p>总结基于两个项目</p>
<ul>
<li><p><a href="https://github.com/gmfe/react-mgm" rel="nofollow noreferrer" target="_blank">react-mgm</a> 代码在Github上，一个组件库，包括了大部分的总结内容，内部的demo也算一个小SPA项目。</p></li>
<li><p><a href="http://bshop.guanmai.cn/v587/" rel="nofollow noreferrer" target="_blank">下单系统</a></p></li>
</ul>
<p>Mac下开发</p>
<h2 id="articleHeader2">js</h2>
<h3 id="articleHeader3">react</h3>
<p>用class的写法写组件，和React.createClass不太一样。具体babel有文字介绍<a href="https://babeljs.io/blog/2015/06/07/react-on-es6-plus" rel="nofollow noreferrer" target="_blank">react-on-es6-plus</a></p>
<p>有自己团队的一套简单的规范<a href="https://github.com/gmfe/standard" rel="nofollow noreferrer" target="_blank">standard</a>，就是<a href="https://github.com/airbnb/javascript/tree/master/react" rel="nofollow noreferrer" target="_blank">airbnb</a>搬过来的</p>
<h3 id="articleHeader4">redux</h3>
<p>用redux做数据流，redux-thunk做异步。</p>
<p>貌似actions reducers没法异步按需加载，于是自己倒腾了异步加载的<a href="https://github.com/liyatang/redux-async-actions-reducers" rel="nofollow noreferrer" target="_blank">redux-async-actions-reducers</a></p>
<p>and 如果你的应用不够大的话，就没有必要异步加载了，比如手机web。 全部打包也不会很大。</p>
<p>比如说下单系统的公共文件 common.xxxx.js 占了80%的代码量，在开发的时候达到1.4M，webpack -p 后是 500+kb，经过gzip压缩之后是100kb。所以文件大小压根不是什么事，没有必要纠结太多。之前是否使用immutable就纠结了很久。</p>
<p>然而，更多应该关注到js的执行时间上，css和html的渲染处理上，文件大小真的没有这么重要。</p>
<h3 id="articleHeader5">react-router</h3>
<p><code>browserHistory</code>需要后台配合，所以用了<code>hashHistory</code>。 但肯定前者更友好。</p>
<p>路由过场动画react-addons-css-transition-group。做到了想微信那样前进后退的切换，很爽。（后来考虑到移动端性能不足问题，没有采用动画）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component{
    render(){
        const action = this.props.location.action;
        let transitionName = 'page';
        // REPLEASE
        if (action === 'PUSH') {
            transitionName = 'page-r2l';
        } else if (action === 'POP') {
            transitionName = 'page-l2r';
        }
        return (
            <ReactCSSTransitionGroup
                component=&quot;div&quot;
                transitionName={transitionName}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </ReactCSSTransitionGroup>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">const</span> action = <span class="hljs-keyword">this</span>.props.location.action;
        <span class="hljs-keyword">let</span> transitionName = <span class="hljs-string">'page'</span>;
        <span class="hljs-comment">// REPLEASE</span>
        <span class="hljs-keyword">if</span> (action === <span class="hljs-string">'PUSH'</span>) {
            transitionName = <span class="hljs-string">'page-r2l'</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action === <span class="hljs-string">'POP'</span>) {
            transitionName = <span class="hljs-string">'page-l2r'</span>;
        }
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ReactCSSTransitionGroup</span>
                <span class="hljs-attr">component</span>=<span class="hljs-string">"div"</span>
                <span class="hljs-attr">transitionName</span>=<span class="hljs-string">{transitionName}</span>
                <span class="hljs-attr">transitionEnterTimeout</span>=<span class="hljs-string">{200}</span>
                <span class="hljs-attr">transitionLeaveTimeout</span>=<span class="hljs-string">{200}</span>
            &gt;</span>
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ReactCSSTransitionGroup</span>&gt;</span></span>
        );
    }
}</code></pre>
<h3 id="articleHeader6">es6/7</h3>
<p>写代码太爽了，跟着潮流走。需要在<code>.babelrc</code>文件上配置好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;react&quot;,
    &quot;es2015&quot;,
    &quot;stage-0&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"es2015"</span>,
    <span class="hljs-string">"stage-0"</span>
  ]
}</code></pre>
<p>至于es7的stage-x是啥，看<a href="http://www.csdn.net/article/2015-11-27/2826347?reload=1" rel="nofollow noreferrer" target="_blank">http://www.csdn.net/article/2...</a>。也可以无脑的设置stage-0</p>
<h3 id="articleHeader7">immutable</h3>
<p>确实是会因为一些引用问题导致数据不正确，问题难以发现和排查。和组件的多次渲染。</p>
<p>于是引用immutable，需要克服的是团队的接受能力，需要点学习成本，但是带来的性能提升是很高的（做shouleComponentUpdate）。</p>
<p>至于很多人都提到包大小问题，个人认为不用担心，webpack -p压缩+gzip，基本压到很小的体积。我的在120kb，这可是全部代码（js+css）啊。</p>
<h3 id="articleHeader8">fastclick</h3>
<p>在移动端会点击延迟，原因百度吧。用了<code>react-fastclick</code>来处理，具体看这里 <a href="http://www.jianshu.com/p/6e2b68a93c88" rel="nofollow noreferrer" target="_blank">移动端300ms点击延迟和点击穿透问题</a></p>
<h3 id="articleHeader9">兼容</h3>
<p>项目用了很多es6特性，浏览器不支持。可以引入 babel-polyfill。<br>当然babel-polyfill比较大，你也可以根据项目的具体情况来引入指定的方法。如<code>core-js/es6/object.js</code> <code>core-js/es6/promise.js</code>等等</p>
<p>直接和commons一起打包即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    'commons': [
        'core-js/es6/object.js',
        'core-js/es6/promise.js',
        ...
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
    <span class="hljs-string">'commons'</span>: [
        <span class="hljs-string">'core-js/es6/object.js'</span>,
        <span class="hljs-string">'core-js/es6/promise.js'</span>,
        ...
    ]
}</code></pre>
<p>btw，我在移动端口的时候引入core-js的2.x版本，直接就报错了。 遇到的同学可以降级到1.x版本。<em>(具体原因还没有排查)</em></p>
<p>如果需要兼容到ie，据说有挺多坑。 推荐看下这篇文章<a href="https://segmentfault.com/a/1190000005128101">使用ES6的浏览器兼容性问题</a></p>
<h2 id="articleHeader10">css</h2>
<p>产品主要场景在微信端，所以选择了<code>weui</code>，使用的感觉是目前weui提供的组件相对少，但是足够用。weui的克制也保证了weui的质量。有时候读代码时候发现weui确实沉淀了很多精华在里面。 配色方面基于weui做改造覆盖，所以我们选择了引入weui的less，方便用里面的已经定义好的变量。</p>
<p>用了大量的Flex布局，很灵活，降低CSS难度。</p>
<p>字体文件用了阿里的<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a>。 收集好图片下载下来，推送到github，然后在发布到npm。</p>
<h2 id="articleHeader11">border</h2>
<p>Retina屏的boder和pc的不一样。 有很多解决方案，可以参考<a>weui</a>对于border的处理。 还可以看这里 <a href="http://jinlong.github.io/2015/05/24/css-retina-hairlines/" rel="nofollow noreferrer" target="_blank">Retina屏的移动设备如何实现真正1px的线</a></p>
<p>然后实践过程中1px遇到的问题远不止于此，上一个链接提到的只是点也不够全面，独立总结了下 <a href="http://liyatang.github.io/14679634456119.html" rel="nofollow noreferrer" target="_blank">移动端1px border</a></p>
<h2 id="articleHeader12">构建</h2>
<h3 id="articleHeader13">babel</h3>
<p>babel做es6/7的转换，以前一般在loaders上直接写babel的配置，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 写在webpack.config.js中
loaders: [{
    test: /\.js$/,
    loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 写在webpack.config.js中</span>
<span class="hljs-string">loaders:</span> [{
<span class="hljs-symbol">    test:</span> <span class="hljs-regexp">/\.js$/</span>,
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'</span>
}]</code></pre>
<p>现在切换到用<code>.babelrc</code>配置上.（也是官方推荐的方法）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{   &quot;presets&quot;: [     &quot;react&quot;,     &quot;es2015&quot;,     &quot;stage-0&quot;   ] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">{   <span class="hljs-attr">"presets"</span>: [     <span class="hljs-string">"react"</span>,     <span class="hljs-string">"es2015"</span>,     <span class="hljs-string">"stage-0"</span>   ] }</code></pre>
<h3 id="articleHeader14">热加载</h3>
<p>可以在webpack.config.dev.js中配置，不过用命令行的形式更简洁</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --inline --hot ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span></code></pre>
<h3 id="articleHeader15">css</h3>
<p>用了<code>postcss</code>来处理css3的兼容性。</p>
<p>然而你可能会有机会发现开发的时候会生成 -webkit-flex 这种前缀，发布后却丢失了。（日了狗）也许是国外的浏览器环境及比较好（国内android被微信内置浏览器统一了，iOS微信还有大约10%的iOS8的用户，有些css属性需要-webkit-前缀）</p>
<p>鉴于此，特别注意这个写法<code>css?-autoprefixer</code>，具体看<a href="http://liyatang.github.io/14687265941131.html" rel="nofollow noreferrer" target="_blank">-webkit-flex 被移除了</a></p>
<h3 id="articleHeader16">js版本控制</h3>
<p>官方介绍的很详细 <a href="http://webpack.github.io/docs/long-term-caching.html" rel="nofollow noreferrer" target="_blank">long-term-caching</a></p>
<p>用hash做js的版本号，通过<code>AssetsPlugin</code>生成记录版本号的文件<code>build/webpack-assets.js</code>，然后页面引入这个文件就可以得到js文件的版本号了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/react-mgm/build/'
},
plugins: [
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin({
        filename: 'build/webpack-assets.js',
        processOutput: function (assets) {
            return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
        }
    })
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>output: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'build'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[hash].js'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/react-mgm/build/'</span>
},
<span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin(),
    <span class="hljs-keyword">new</span> AssetsPlugin({
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'build/webpack-assets.js'</span>,
        <span class="hljs-attr">processOutput</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">assets</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-string">'window.WEBPACK_ASSETS = '</span> + <span class="hljs-built_in">JSON</span>.stringify(assets);
        }
    })
],</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html
<script>
    document.write('<script src=&quot;../build/webpack-assets.js&quot;><\/script>');
</script>
<script
    document.write('<script src=&quot;' + window.WEBPACK_ASSETS['index'].js + '&quot;><\/script>');
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// index.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    document.write('<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../build/webpack-assets.js"</span>&gt;</span><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">\</span>/<span class="hljs-attr">script</span>&gt;</span>');
</span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>
    <span class="hljs-attr">document.write</span>('&lt;<span class="hljs-attr">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"' + window.WEBPACK_ASSETS['index'].js + '"</span>&gt;</span><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">\</span>/<span class="hljs-attr">script</span>&gt;</span>');
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader17">公共文件commons处理</h3>
<p>见 <br><a href="http://liyatang.github.io/14716966091212.html" rel="nofollow noreferrer" target="_blank">webpack commons hash</a><br><a href="http://liyatang.github.io/14716985009978.html" rel="nofollow noreferrer" target="_blank">如何确定哪些文件应该打包在commons</a></p>
<h3 id="articleHeader18">构建加速</h3>
<p>1<br><a href="http://webpack.github.io/docs/configuration.html#devtool" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a><br>devtool 设置 eval </p>
<p>2<br>一些文件直接引用打包好的版本可以加快构建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    (...省略)
    noParse: [
        // 'react/dist/react.min.js',
        // 'react-dom/dist/react-dom.min.js',
        'react-router/umd/ReactRouter.min.js',
        'redux/dist/redux.min.js',
        'react-redux/dist/react-redux.min.js',
        'underscore/underscore-min.js'
    ]
},
resolve: {
    alias: {
        // react 没法加速build，因为react-addons-css-transition-group
        // 'react': 'react/dist/react.min.js',
        // 'react-dom': 'react-dom/dist/react-dom.min.js',
        'react-router': 'react-router/umd/ReactRouter.min.js',
        'redux': 'redux/dist/redux.min.js',
        'react-redux': 'react-redux/dist/react-redux.min.js',
        'underscore': 'underscore/underscore-min.js'
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>module: {
    (...省略)
    noParse: [
        <span class="hljs-regexp">//</span> <span class="hljs-string">'react/dist/react.min.js'</span>,
        <span class="hljs-regexp">//</span> <span class="hljs-string">'react-dom/dist/react-dom.min.js'</span>,
        <span class="hljs-string">'react-router/umd/ReactRouter.min.js'</span>,
        <span class="hljs-string">'redux/dist/redux.min.js'</span>,
        <span class="hljs-string">'react-redux/dist/react-redux.min.js'</span>,
        <span class="hljs-string">'underscore/underscore-min.js'</span>
    ]
},
resolve: {
    alias: {
        <span class="hljs-regexp">//</span> react 没法加速build，因为react-addons-css-transition-group
        <span class="hljs-regexp">//</span> <span class="hljs-string">'react'</span>: <span class="hljs-string">'react/dist/react.min.js'</span>,
        <span class="hljs-regexp">//</span> <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'react-dom/dist/react-dom.min.js'</span>,
        <span class="hljs-string">'react-router'</span>: <span class="hljs-string">'react-router/umd/ReactRouter.min.js'</span>,
        <span class="hljs-string">'redux'</span>: <span class="hljs-string">'redux/dist/redux.min.js'</span>,
        <span class="hljs-string">'react-redux'</span>: <span class="hljs-string">'react-redux/dist/react-redux.min.js'</span>,
        <span class="hljs-string">'underscore'</span>: <span class="hljs-string">'underscore/underscore-min.js'</span>
    }
},</code></pre>
<h3 id="articleHeader19">构建环境</h3>
<p>目前知道需要设置两个地方，命令行中加入 NODE_ENV</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NODE_ENV=production webpack xxxxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">NODE_ENV</span>=production webpack xxxxx</code></pre>
<p>and webpack配置里面加入plugin，这样代码就能通过<code>if(__DEBUG__)</code>这种代码做环境差异。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({     __DEBUG__: env === 'development' ? true : false,     &quot;process.env&quot;: { // 干掉 https://fb.me/react-minification 提示         NODE_ENV: env === 'development' ? JSON.stringify(&quot;development&quot;) : JSON.stringify(&quot;production&quot;)     } })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.DefinePlugin</span>({     <span class="hljs-attribute">__DEBUG__</span>: env === <span class="hljs-string">'development'</span> ? true : false,     <span class="hljs-string">"process.env"</span>: { // 干掉 https://fb.me/react-minification 提示         NODE_ENV: env === <span class="hljs-string">'development'</span> ? JSON.<span class="hljs-built_in">stringify</span>(<span class="hljs-string">"development"</span>) : JSON.<span class="hljs-built_in">stringify</span>(<span class="hljs-string">"production"</span>)     } })</code></pre>
<h3 id="articleHeader20">打包库文件</h3>
<p>见<code>webpack.config.js</code> <code>webpack.config.min.js</code><br>有些库作为依赖项，不应该打包进库文件中，用<code>externals</code>来描述</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'underscore': 'underscore',
    'classnames': 'classnames'
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>externals: {
    <span class="hljs-symbol">'react'</span>: <span class="hljs-symbol">'react'</span>,
    <span class="hljs-symbol">'react</span>-dom': <span class="hljs-symbol">'react</span>-dom',
    <span class="hljs-symbol">'underscore'</span>: <span class="hljs-symbol">'underscore'</span>,
    <span class="hljs-symbol">'classnames'</span>: <span class="hljs-symbol">'classnames'</span>
},</code></pre>
<p>css文件独立打包，用<code>ExtractTextPlugin</code>来描述。</p>
<p>最后做压缩</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">    compressor:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        screw_ie8:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        warnings:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">})</span></code></pre>
<h3 id="articleHeader21">npm</h3>
<p>用了npm script来统一开发规范。<br><code>npm start</code>来开启开发<br><code>npm run deploy</code>来发布<br><code>npm run publishpatch</code>来发布到npm，并同步到淘宝镜像来做加速</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;eslint ./src/component/&quot;,
    &quot;pre&quot;: &quot;npm install;&quot;,
    &quot;clear&quot;: &quot;rm -rf build; mkdir build;&quot;,
    &quot;start&quot;: &quot;npm run clear; webpack-dev-server --config webpack.config.dev.js --port 4000 --host 0.0.0.0 --inline --hot --devtool eval --progress --color --profile&quot;,
    &quot;deploy&quot;: &quot;npm install; npm run build &amp;&amp; npm run build:min&quot;,
    &quot;build&quot;: &quot;webpack --progress --color --profile&quot;,
    &quot;build:min&quot;: &quot;webpack --config webpack.config.min.js&quot;,
    &quot;publishpatch&quot;: &quot;npm run deploy; git add --all; git commit -m 'c'; npm version patch; git push origin master:master; npm publish; npm publish --registry='https://registry.npmjs.org'; cnpm sync react-mgm; npm version;&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"precommit"</span>: <span class="hljs-string">"eslint ./src/component/"</span>,
    <span class="hljs-attr">"pre"</span>: <span class="hljs-string">"npm install;"</span>,
    <span class="hljs-attr">"clear"</span>: <span class="hljs-string">"rm -rf build; mkdir build;"</span>,
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"npm run clear; webpack-dev-server --config webpack.config.dev.js --port 4000 --host 0.0.0.0 --inline --hot --devtool eval --progress --color --profile"</span>,
    <span class="hljs-attr">"deploy"</span>: <span class="hljs-string">"npm install; npm run build &amp;&amp; npm run build:min"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack --progress --color --profile"</span>,
    <span class="hljs-attr">"build:min"</span>: <span class="hljs-string">"webpack --config webpack.config.min.js"</span>,
    <span class="hljs-attr">"publishpatch"</span>: <span class="hljs-string">"npm run deploy; git add --all; git commit -m 'c'; npm version patch; git push origin master:master; npm publish; npm publish --registry='https://registry.npmjs.org'; cnpm sync react-mgm; npm version;"</span>
  },</code></pre>
<p>另外在项目中遇到版本依赖的问题。开发的时候好好的，发布后就出问题了。 原因是npm依赖不一致问题。要么固定版本号，但是只能固定项目的依赖，依赖的依赖就没法固定了。 有个方案不错 <a href="http://tech.meituan.com/npm-shrinkwrap.html" rel="nofollow noreferrer" target="_blank">npm shrinkwrap</a></p>
<h2 id="articleHeader22">规范</h2>
<h3 id="articleHeader23">eslint</h3>
<p>安装<code>npm install husky</code>的时候会自动往你的git hooks上加代码，提交代码的时候触发想要的npm scripts。</p>
<p>我们用eslint来做检测，配置见package.json的<code>npm run precommit</code></p>
<p>eslint的配置用<code>eslintrc.js</code>官方推荐的写法，具体配置弄成一个自己的库了。</p>
<p>用了<a href="http://eslint.org/docs/rules/" rel="nofollow noreferrer" target="_blank">eslint推荐的配置</a>再结合<a href="https://github.com/yannickcr/eslint-plugin-react" rel="nofollow noreferrer" target="_blank">eslint-plugin-react</a>的配置</p>
<p>具体见<a href="https://github.com/gmfe/eslint-plugin-gm" rel="nofollow noreferrer" target="_blank">eslint-plugin-gm</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    &quot;plugins&quot;: [
        &quot;gm&quot;
    ],
    &quot;extends&quot;: [&quot;plugin:gm/recommended&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-string">"plugins"</span>: [
        <span class="hljs-string">"gm"</span>
    ],
    <span class="hljs-string">"extends"</span>: [<span class="hljs-string">"plugin:gm/recommended"</span>]
}</code></pre>
<h2 id="articleHeader24">server服务</h2>
<p>在开发时间避免等后台api，找了<a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server</a>来做api服务，rest风格，很方便。<br>等后台ready了，再通过上面提到的server代理调用联调。</p>
<h2 id="articleHeader25">性能优化</h2>
<p>见 <a href="http://liyatang.github.io/14679634318513.html" rel="nofollow noreferrer" target="_blank">react性能优化</a></p>
<h2 id="articleHeader26">其他</h2>
<h3 id="articleHeader27">键盘呼气</h3>
<p>如果你的输入框比较低的话，键盘呼气就会挡住输入框。 iphone会自动把input移到可见的位置，而android不会。 可以在android上对输入框使用 scrollIntoViewIfNeed 使元素可见。</p>
<p>and在react下，会出现本来点输入框的，结果却是点了其他东西，触发其他逻辑了。 所以这里就搞了500ms的延迟。</p>
<h3 id="articleHeader28">自动呼气键盘</h3>
<p>在android键盘需要用户触发才可以呼气。iOS 加个autoFocus即可。</p>
<h3 id="articleHeader29">判断元素可见</h3>
<p>一开始是慢慢的算offsetTop,如果层次很深的话，还要算多个parent的offsetTop，然后才能得出，如此必然很烦。  可以用 getBoundingClientRect 即可。</p>
<h3 id="articleHeader30">微信title的处理</h3>
<p><a href="https://segmentfault.com/a/1190000005912548">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React移动项目总结

## 原文链接
[https://segmentfault.com/a/1190000005044324](https://segmentfault.com/a/1190000005044324)

