---
title: '腾讯新闻 React 同构直出优化实践' 
date: 2019-02-08 2:30:40
hidden: true
slug: bvgx5doke3j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文地址：<a href="https://github.com/lcxfs1991/blog/issues/10)" rel="nofollow noreferrer" target="_blank">https://github.com/lcxfs1991/blog/issues/10)</a><br>本文 starter kit：<a href="https://github.com/SteamerTeam/steamer-react" rel="nofollow noreferrer" target="_blank">steamer-react</a></p></blockquote>
<h2 id="articleHeader0">为什么做直出</h2>
<p>就是为了“性能”！！！<br>按照经验来说，直出，能够减少20% - 50%不等的首屏时间，因此尽管增加一定维护成本，前端们还是前赴后继地在搞直出。</p>
<p>除此之外，有些特定的业务做直出能够弥补前后端分离带来的SEO问题。像这次选取的腾讯新闻，大多数页面首屏其实都是直出的（但肯定不是React直出）。</p>
<h2 id="articleHeader1">性能指标</h2>
<p>刚提到的首屏时间，只是单纯内容的渲染，另外还有首屏可交互时间，即除了内容渲染之余，还能够让用户能够对首屏的内容进行交互，如点击、滚动等等。现在市面上有关React的性能报告，尤其是那些截了Chrome渲染映像的，都归到首屏时间。</p>
<h2 id="articleHeader2">为什么选择腾讯新闻</h2>
<ul>
<li><p>我并非腾讯新闻的业务相关方，可以比较大胆地作为例子使用</p></li>
<li><p>腾讯新闻页面更为丰富，可以做更多场景的实践</p></li>
<li><p>验证全套脱胎手Q家校群react的优化策略、实践方案和开发工具</p></li>
</ul>
<p>由于只是实验，数据都是拉取腾讯新闻现网提供的，而样式简单地仿照了一下，做得略粗糙，请见谅。</p>
<h2 id="articleHeader3">参考的资料和使用的工具</h2>
<p>做这次实践阅读了不少文章，文章提到过的内容我这里就不再赘述了，后文主要是做补充。<br>这次同构直出实践，我们使用的是脱胎于手Q家校群的react start kit，名曰<a href="https://github.com/SteamerTeam/steamer-react" rel="nofollow noreferrer" target="_blank">steamer-react</a>。目前可以试用。它有2个分支，一个是react分支，目前只是提供纯前端的boilerplate。另一个是react-isomorphic，同时包括前端和后台的boilerplate。有什么问题可以给我提issue。</p>
<p>文章：</p>
<ul>
<li><p><a href="http://www.aliued.com/?p=3077" rel="nofollow noreferrer" target="_blank">React+Redux 同构应用开发</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004671209#articleHeader2">React 同构实践与思考</a></p></li>
<li><p><a href="https://github.com/joeyguo/blog/issues/9" rel="nofollow noreferrer" target="_blank">React同构直出优化总结</a></p></li>
<li><p><a href="http://toutiao.com/i6284121573897011714/" rel="nofollow noreferrer" target="_blank">ReactJS 服务端同构实践QQ音乐web团队</a></p></li>
<li><p><a href="https://strongloop.com/strongblog/node-js-react-isomorphic-javascript-why-it-matters/" rel="nofollow noreferrer" target="_blank">How to Implement Node + React Isomorphic JavaScript &amp; Why it Matters</a></p></li>
<li><p><a href="https://github.com/lcxfs1991/blog/issues/6" rel="nofollow noreferrer" target="_blank">性能优化三部曲之三——Node直出让你的网页秒开</a></p></li>
</ul>
<h2 id="articleHeader4">分析场景</h2>
<p>这次我们选取的是腾讯新闻的列表页、详情页和评论页。平时我们浏览腾讯新闻的时候，都会发现从列表页进详情页，或者从详情页进入评论页，都需要跳转，就像steamer-react中，访问index.html页一样。这样对于用户体验欠佳，因此我做了另外一版，spa.html，使用react + react-router做了一版无跳转的单页面应用。</p>
<ul>
<li><p>列表页<br><span class="img-wrap"><img data-src="/img/bVyxmZ" src="https://static.alili.tech/img/bVyxmZ" alt="492be8be-3c0b-11e6-9974-3d96c9b27539.png" title="492be8be-3c0b-11e6-9974-3d96c9b27539.png" style="cursor: pointer;"></span></p></li>
<li><p>详情页<br><span class="img-wrap"><img data-src="/img/bVyxnf" src="https://static.alili.tech/img/bVyxnf" alt="50985844-3c0b-11e6-9002-c109213d8fec.png" title="50985844-3c0b-11e6-9002-c109213d8fec.png" style="cursor: pointer;"></span></p></li>
<li><p>评论页<br><span class="img-wrap"><img data-src="/img/bVyxnj" src="https://static.alili.tech/img/bVyxnj" alt="5575867a-3c0b-11e6-9266-ce51e90ecb13.png" title="5575867a-3c0b-11e6-9266-ce51e90ecb13.png" style="cursor: pointer;"></span></p></li>
</ul>
<p>可是单页面应用在SEO的优化方面，处于略势，因此对于新闻类业务来说，需要做直出来弥补。下面我们逐步来拆解React同构直出的步骤。</p>
<h2 id="articleHeader5">用Koa搭建后台</h2>
<p>AlloyTeam团队目前以Koa为基础搭建了玄武直出平台，目前不少手Q基础的web业务也有接入，包括早前做过同构优化的手Q家校群列表页。是次实践，在steamer-react下面新建了一个node文件夹，存放后台服务。后台服务包括返回数据的api，还有直出的controller层。controller层仿照玄武的写法，对于腾讯内的同事，做适当修改便可以快速接入玄武直出平台，对于腾讯外的，也可以作有用的参照，嵌入自己的业务也不费什么功夫。</p>
<p>那直出的controller层具体怎么写呢？</p>
<p>直出controller层和数据返回的api都一律写在controller.js里面，然后去require存放在node/asset/下面具体直出逻辑文件，然后将yield出来的值直接吐出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.spa = function* () {
    let dir = path.dirname(path.resolve()),
        appPath = path.join(dir, '/pub/node/index.js');

    if (fs.existsSync(appPath)) {  // 若asset中无此文件，则输出其它值
        var ReactRender = require(appPath);
        yield ReactRender(this.request, this.response);   // 给ReactRender函数传入request和response
        this.body = this.response.body;
    }
    else {
        this.body = &quot;spa list&quot;;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>exports.spa = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> dir = path.dirname(path.resolve()),
        appPath = path.join(dir, <span class="hljs-string">'/pub/node/index.js'</span>);

    <span class="hljs-keyword">if</span> (fs.existsSync(appPath)) {  <span class="hljs-comment">// 若asset中无此文件，则输出其它值</span>
        <span class="hljs-keyword">var</span> ReactRender = <span class="hljs-built_in">require</span>(appPath);
        <span class="hljs-keyword">yield</span> ReactRender(<span class="hljs-keyword">this</span>.request, <span class="hljs-keyword">this</span>.response);   <span class="hljs-comment">// 给ReactRender函数传入request和response</span>
        <span class="hljs-keyword">this</span>.body = <span class="hljs-keyword">this</span>.response.body;
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.body = <span class="hljs-string">"spa list"</span>;
    }
};</code></pre>
<p>而ReactRender函数，大概长这样，其实就是一个generator function，具体拉取数据和React同构渲染的逻辑都写在这里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function* (req, res) {
    // some code
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-params">(req, res)</span> {</span>
    <span class="hljs-comment">// some code</span>
｝</code></pre>
<p>你直接写好的逻辑，有不少可能node并不识别，例如import, window对象等，这些需要构建去处理，后文会有论述。</p>
<p>其实整个直出过程非常简单。基本就是三部曲，拉数据、存数据和吐内容。</p>
<h3 id="articleHeader6">拉数据</h3>
<p>拉数据这里封装了一个requestSync的库，可以直接通过yield对request库做同步的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// requestSync.js
var request = require('request');

exports.requestSync = function(option) {
    return function(callback) {
        request(option, function (error, response, body) {
                callback(error, response);
        });
    };
} ;

// 拉数据逻辑
var response = yield requestSync.requestSync({
    uri: CGI_PATH['GET_TOP_NEWS'] + urlParam,
    method: 'GET'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// requestSync.js</span>
<span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>);

exports.requestSync = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">option</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
        request(option, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, response, body</span>) </span>{
                callback(error, response);
        });
    };
} ;

<span class="hljs-comment">// 拉数据逻辑</span>
<span class="hljs-keyword">var</span> response = <span class="hljs-keyword">yield</span> requestSync.requestSync({
    <span class="hljs-attr">uri</span>: CGI_PATH[<span class="hljs-string">'GET_TOP_NEWS'</span>] + urlParam,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>
});</code></pre>
<p>// 在编译的时候，你可能会发现<code>require('request')</code>报错，这是因为你缺少了一些babel插件。但也有另外一个办法让你去寻找一个不知名的babel插件。我改用plugin('requestSync')而不是require。因为require会直接去读取node_modules包的内容，plugin并不会编译，它会保留原样，等Koa读取的时候再实时运行。plugin实质是定义在global全局变量里的一个函数，然后将它nodeUtils在controller.js中require进来，就能达到保留原样的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 直出逻辑
var requestSync = plugin('requestSync');

// nodeUtils.js
global.plugin = function(pkg) {
    return require('./' + pkg);
}

// controller.js
var nodeUtils = require('../common/nodeUtils');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 直出逻辑</span>
<span class="hljs-keyword">var</span> requestSync = plugin(<span class="hljs-string">'requestSync'</span>);

<span class="hljs-comment">// nodeUtils.js</span>
<span class="hljs-keyword">global</span>.plugin = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pkg)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">require</span>(<span class="hljs-string">'./'</span> + pkg);
}

<span class="hljs-comment">// controller.js</span>
<span class="hljs-keyword">var</span> nodeUtils = <span class="hljs-keyword">require</span>(<span class="hljs-string">'../common/nodeUtils'</span>);</code></pre>
<h3 id="articleHeader7">存数据</h3>
<p>由于我们采用redux做统一数据的处理，因此我们需要将数据存一份到store里，以便后面吐内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = configureStore();

store.dispatch({
        type: 'xxx action',
        data: response.body,
        param:{
            
        }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">const</span> store = configureStore();

<span class="hljs-title">store</span>.dispatch({
        <span class="hljs-class"><span class="hljs-keyword">type</span>: 'xxx action',</span>
        <span class="hljs-class"><span class="hljs-keyword">data</span>: response.body,</span>
        param:{
            
        }
});</code></pre>
<h3 id="articleHeader8">吐内容</h3>
<p>如果我们没有使用react-router，我们直接将store存给最主要的React Component，然后就可以开始直出了，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { renderToString } from 'react-dom/server';
var Root = React.createFactory(require('Root').default);
ren html = renderToString(Root(store.getState()));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>;
<span class="hljs-keyword">var</span> Root = React.createFactory(<span class="hljs-built_in">require</span>(<span class="hljs-string">'Root'</span>).<span class="hljs-keyword">default</span>);
ren html = renderToString(Root(store.getState()));
</code></pre>
<p>但如果我们使用了react-router，我们就需要引用react-router比较底层的match来做路径匹配和内容吐出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { match, RouterContext } from 'react-router';
import { routeConfig } from 'routes';

match({ routes: routeConfig, location: req.url }, (error, redirectLocation, renderProps) => {
     if (renderProps) {
     reactHtml = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );
     } 
    else {
      res.body = &quot;404&quot;;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code><span class="hljs-keyword">import</span> { match, RouterContext } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> { routeConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">'routes'</span>;

match({ <span class="hljs-name">routes</span>: routeConfig, <span class="hljs-name">location</span>: req.url }, <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>, redirectLocation, renderProps)</span> =&gt;</span> {
     <span class="hljs-keyword">if</span> (renderProps) {
     reactHtml = renderToString(
        &lt;Provider store={store}&gt;
            &lt;RouterContext {...renderProps} /&gt;
        &lt;/Provider&gt;
    );
     } 
    <span class="hljs-keyword">else</span> {
      res.body = <span class="hljs-string">"404"</span>;
    }
});</code></pre>
<p>客户端也需要做类似的写法，且我们不采用hashHistory，而是browserHistory</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let  history = syncHistoryWithStore(browserHistory, store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes: routeConfig, location: location }, () => {
    render(
        <Provider store={store}> //  Redux相关
            <div>
                <Router routes={routeConfig} history={history} /> // Router 相关
            </div>
        </Provider>,
        document.getElementById('pages')
    )
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span>  history = syncHistoryWithStore(browserHistory, store);
<span class="hljs-keyword">const</span> { pathname, search, hash } = <span class="hljs-built_in">window</span>.location;
<span class="hljs-keyword">const</span> location = <span class="hljs-string">`<span class="hljs-subst">${pathname}</span><span class="hljs-subst">${search}</span><span class="hljs-subst">${hash}</span>`</span>;

match({ <span class="hljs-attr">routes</span>: routeConfig, <span class="hljs-attr">location</span>: location }, () =&gt; {
    render(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span> //  Redux相关
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">routes</span>=<span class="hljs-string">{routeConfig}</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span> /&gt;</span> // Router 相关
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>,
        document.getElementById('pages')
    )
});</span></code></pre>
<p>在吐内容(html)的同时，请记得将store也吐一份到<code>&lt;script&gt;</code>标签里，因为客户端的js中也需要用到。</p>
<p>在首次吐出内容之后，你会发现还不能马上进行交互，需要客户端再次执行一行Root.js里面的代码，才能够将可交互的事件绑定。</p>
<h2 id="articleHeader9">前端代码的改动</h2>
<p>前端的代码改动不大，不过前端这里主要完成最后关键的一步，事件挂载。</p>
<h3 id="articleHeader10">事件挂载</h3>
<p>后台渲染完后，给客户端吐出html字符串，这时还没有任何事件的绑定，需要客户端的代码进行事件挂载，这里需要注意2点：</p>
<ul>
<li><p>保持dom结构一致<br>否则会报错或者触发重新渲染</p></li>
<li><p>将部份事件放到componentDitMount中触发<br>服务端的生命周期只走到componentWillMount，而客户端则会有完整的生命周期，因此部份事件可以挪到componentDidMount中处理。例如这次实践做的列表页有一个我的收藏功能，这里的数据存储用到localstorage。这个服务端无法渲染，因此会选择在componentDidMount的时候再去触发读取localstorage数据的action。</p></li>
<li><p>兼顾后台没有的对象<br>除了以上提到的，前端部份的代码主要注意的是一些后台没有的对象，例如window。可以通过构建手段注入全局变量去替换或者在服务端渲染的时候不执行部份代码。</p></li>
</ul>
<h2 id="articleHeader11">构建的使用</h2>
<p>react-isomorphic比react的分支多了一个webpack.node.js，用于设置直出的相关构建内容。一些需要留意的配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target: 'node',  // 构建输出node可以识别的内容
node: {
    __filename: true,
    __dirname: true
},
{ 
    test: /\.js?$/,
    loader: 'babel',
    query: {
        cacheDirectory: '/webpack_cache/',
        plugins: [
            'transform-decorators-legacy',
            [
                &quot;transform-runtime&quot;, {  
                    &quot;polyfill&quot;: false,
                    &quot;regenerator&quot;: true // 识别regenerator
                }
            ]
        ],
        presets: [
            'es2015-loose', 
            'react',
        ]
    },
    exclude: /node_modules/,
},
{
    test: /\.css$/,
    loader: &quot;ignore-loader&quot;,   // ignore-loader对css/scss输出空内容
},
plugins: [
    new webpack.BannerPlugin(&quot;module.exports = &quot;, {entryOnly : true, raw: true}), 
    // react/node/asset/下的文件生产到/react/pub/node/之后，需要在最前面注入module.exports，
   // 这样Koa才能正常引用
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">target:</span> <span class="hljs-string">'node'</span>,  <span class="hljs-comment">// 构建输出node可以识别的内容</span>
<span class="hljs-string">node:</span> {
<span class="hljs-symbol">    __filename:</span> <span class="hljs-literal">true</span>,
<span class="hljs-symbol">    __dirname:</span> <span class="hljs-literal">true</span>
},
{ 
<span class="hljs-symbol">    test:</span> <span class="hljs-regexp">/\.js?$/</span>,
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">'babel'</span>,
<span class="hljs-symbol">    query:</span> {
<span class="hljs-symbol">        cacheDirectory:</span> <span class="hljs-string">'/webpack_cache/'</span>,
<span class="hljs-symbol">        plugins:</span> [
            <span class="hljs-string">'transform-decorators-legacy'</span>,
            [
                <span class="hljs-string">"transform-runtime"</span>, {  
                    <span class="hljs-string">"polyfill"</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-string">"regenerator"</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 识别regenerator</span>
                }
            ]
        ],
<span class="hljs-symbol">        presets:</span> [
            <span class="hljs-string">'es2015-loose'</span>, 
            <span class="hljs-string">'react'</span>,
        ]
    },
<span class="hljs-symbol">    exclude:</span> <span class="hljs-regexp">/node_modules/</span>,
},
{
<span class="hljs-symbol">    test:</span> <span class="hljs-regexp">/\.css$/</span>,
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">"ignore-loader"</span>,   <span class="hljs-comment">// ignore-loader对css/scss输出空内容</span>
},
<span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">"module.exports = "</span>, {<span class="hljs-string">entryOnly :</span> <span class="hljs-literal">true</span>, <span class="hljs-string">raw:</span> <span class="hljs-literal">true</span>}), 
    <span class="hljs-comment">// react/node/asset/下的文件生产到/react/pub/node/之后，需要在最前面注入module.exports，</span>
   <span class="hljs-comment">// 这样Koa才能正常引用</span>
]</code></pre>
<h2 id="articleHeader12">性能优化</h2>
<p>如下面两图，是直出前后的Chrome映像对比图，直出要比非直出快400ms，近40%的性能提升。除了直出之外，还采用了react-router，使页面可以无缝切换，大大提高了用户的体验。你可能还会担心这么多页面的逻辑放在一个js bundle会让js很大，如果js bundle膨胀到一定程度，你可以考虑使用webpack和react-router的特性进行拆包。</p>
<p><span class="img-wrap"><img data-src="/img/bVyxnq" src="https://static.alili.tech/img/bVyxnq" alt="cd5cca16-3c12-11e6-8aca-64dccaf72a36.png" title="cd5cca16-3c12-11e6-8aca-64dccaf72a36.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVyxns" src="https://static.alili.tech/img/bVyxns" alt="cd697da6-3c12-11e6-8923-c741b45bcf86.png" title="cd697da6-3c12-11e6-8923-c741b45bcf86.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">总结</h2>
<p>可能你会惊诧于习惯写长文的我居然只写这么少，但React同构下出真的就是这么简单，而借助脱胎于手Q家校群，验证于腾讯新闻的<a href="https://github.com/SteamerTeam/steamer-react" rel="nofollow noreferrer" target="_blank">steamer-react</a> start kit，你会更事半功倍。</p>
<p>如有错误，恳请斧正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
腾讯新闻 React 同构直出优化实践

## 原文链接
[https://segmentfault.com/a/1190000005809109](https://segmentfault.com/a/1190000005809109)

