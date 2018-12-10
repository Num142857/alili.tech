---
title: 'React同构总结' 
date: 2018-12-11 2:30:10
hidden: true
slug: w08f4x7fdkc
categories: [reprint]
---

{{< raw >}}

                    
<p>最近花了点时间研究React同构实践，赶上过年回家，心也散了，两个月没写文章。</p>
<p>同构也算是前端的一个应用模式，目的是为了加速首屏显示时间和seo优化，很多公司都将同构作为前端优化的一个优化点来做，同时Raect16版本中也添加了很多对同构的支持，可以看出FB也是默认支持这一场景使用的。</p>
<h2 id="articleHeader0">同构原理</h2>
<h3 id="articleHeader1">什么是同构</h3>
<p>一套代码既可以在服务端运行又可以在客户端运行，这就是同构应用。简而言之, 就是服务端直出和客户端渲染的组合, 能够充分结合两者的优势，并有效避免两者的不足。</p>
<p>概括地说，同构就是服务端（Node）替客户端请求接口，获取到数据后，将有数据和结构的页面渲染好之后返回给客户端，这样避免了客户端页面首次渲染，同时服务端RPC比客户端请求要快。</p>
<h3 id="articleHeader2">为什么要同构</h3>
<ul>
<li>性能: 通过Node直出, 将传统的三次串行http请求简化成一次http请求，降低首屏渲染时间</li>
<li>SEO: 服务端渲染对搜索引擎的爬取有着天然的优势，虽然阿里电商体系对SEO需求并不强，但随着国际化的推进, 越来越多的国际业务加入阿里大家庭，很多的业务依赖Google等搜索引擎的流量导入，比如Lazada.</li>
<li>兼容性: 部分展示类页面能够有效规避客户端兼容性问题，比如白屏。</li>
</ul>
<h3 id="articleHeader3">同构与SPA流程对比</h3>
<p><span class="img-wrap"><img data-src="/img/bV5gsU?w=740&amp;h=790" src="https://static.alili.tech/img/bV5gsU?w=740&amp;h=790" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>SPA：服务端替客户端请求数据，完成第一次render，将render完成之后的html页面返回给客户端，相对于客户端渲染，客户端第一次获取的html是个有数据有结构的html，结合样式文件下载客户端可以较快的看到首屏内容。</p>
<p>SSR：服务端Node也可以运行React解析出页面内容，并且要比客户端更快；客户端通常要在render一次之后请求数据，数据返回之后再render一次，服务端渲染可以解决客户端重复渲染问题。</p>
<h3 id="articleHeader4">同构与SPA时间对比</h3>
<p><span class="img-wrap"><img data-src="/img/bV5gtH?w=920&amp;h=680" src="https://static.alili.tech/img/bV5gtH?w=920&amp;h=680" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>以一个常见的场景为例：</p>
<p>进入页面，componentDidMount中请求数据，同时页面loading，请求返回后，取消loading，页面可交互。</p>
<p><strong>SPA</strong>：</p>
<ol>
<li>客户端请求页面，服务端返回SPA的html，此html不可视；（request&amp;response）</li>
<li>html加载完之后，去加载页面中的js；（processing）</li>
<li>js加载完成之后开始执行；（rendering）</li>
<li>页面首次渲染完毕，向后端请求数据（loading）</li>
<li>请求返回，页面再次渲染，用户可交互（useing）</li>
</ol>
<p><strong>SSR</strong>：</p>
<ol>
<li>客户端请求页面，服务端去请求数据，请求返回后渲染页面，将渲染好的html返回给客户端，此时页面可视；（request&amp;response）</li>
<li>html加载完之后，去加载页面中的js；（processing）</li>
<li>js加载完成之后开始执行；（rendering）</li>
<li>js解析完毕，用户可交互；（useing）</li>
</ol>
<p>通过上述流程图可发现，理论上同构要比客户端渲染要快，而且体验要好。</p>
<h2 id="articleHeader5">预期问题</h2>
<p>原理了解之后，动手之前思考一些可能出现的问题：</p>
<p><strong>1. Node服务器如何识别es6以及React</strong></p>
<p>Node识别ES6可以使用<code>babel-register</code>插件，该插件使用起来跟<code>.babelrc</code>一样简便。</p>
<p>React中有一个<code>renderToString</code>方法，该方法将解析好的jsx片段以html字符串形式输出，就是为了同构而诞生。</p>
<p><strong>2. 服务端如何引入js，css，图片，字体等静态资源</strong></p>
<p>实现方法有多种，我这里使用<code>webpack-isomorphic-tools</code>插件来实现，之后会做介绍。</p>
<p><strong>3. 服务端如何路由匹配</strong></p>
<p>通常我们只做首页，或者关键页面的服务端渲染，相当于从首页进去是服务端渲染，但是从项目其他页面进入就跟正常的SPA一样。所以在服务端将要ssr的路由匹配出来，其他的路由仍交给SPA。</p>
<p><strong>4. SSR的Redux怎么办</strong></p>
<p>通常来讲，我们从接口获取数据，都要将一些数据放到store中，便于其他页面共享。</p>
<p>SSR中，服务端跟SPA公用一部分action和reducer，相同的reducer生成的store是一样的，之后再通过createStore时候将store注入进入，返回给客户端。</p>
<p><strong>5. SSR的开发流程怎样</strong></p>
<p>实际上SSR开发通常是在一个项目基础上改，而不是重新搭建一个项目，比较很多人拿它当做优化，而不是重构。</p>
<p>通常来说我们一个项目按照SPA模式开发，针对特定页面做SSR的修改，修改之后的项目既可以SPA也可以SSR，只不过SPA模式时对应页面获取不到数据，因为获取数据的方法均被修改。</p>
<p><strong>6. SSR之后，项目的JS体积是否会减小</strong></p>
<p>不会减小，所谓同构，其实就是服务端借助客户端的JS去渲染页面，没有影响到客户端的JS，还是正常打包，客户端做代码分割也不会受影响。</p>
<h2 id="articleHeader6">同构实现</h2>
<p>带着上面的问题来看同构如何实现。</p>
<p>React实现同构方法有多重，而且都较为成熟，这里选用的<code>webpack-isomorphic-tools</code>插件来实现。</p>
<h3 id="articleHeader7">Next.js</h3>
<p>先插一嘴，现在有个叫<a href="https://github.com/zeit/next.js/" rel="nofollow noreferrer" target="_blank">Next</a>框架，索性也试了下，真的很简便，快速搭建SSR项目，但是问题也很明显：</p>
<ol>
<li>框架高度封装，扩展性有限。</li>
<li>适合从头搭建项目，不适合现有项目SSR迁移。</li>
<li>上手很快，但是初学者不知道里面原理如何，适合熟练手玩。</li>
</ol>
<p>所以没有选用该框架进行尝试，不过该框架凭借着简单易上手，未来还是很有市场的。</p>
<h3 id="articleHeader8">webpack-isomorphic-tools</h3>
<p>上面第二个问题就提到了服务端如何处理静态资源，这里使用<code>webpack-isomorphic-tools</code>插件，该插件处理静态资源的。</p>
<p>首先一个<code>webpack-isomorphic-tools-configuration.js</code>文件配置你想要处理的文件格式与处理方法，跟webpack配置loader类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const config = require('../config/');

module.exports = {
    webpack_assets_file_path: `${config.base_path}/webpack-assets.json`,
    webpack_stats_file_path: `${config.base_path}/webpack-stats.json`,
    assets: {
        images: {
            extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
        },
        fonts: {
            extensions: ['woff', 'woff2', 'eot', 'ttf', 'swf', 'otf']
        },
        // styles: {
        //     extensions: ['scss', 'css'],
        //     filter: function(module, regex, options, log) {
        //         if (options.development) {
        //             // in development mode there's webpack &quot;style-loader&quot;,
        //             // so the module.name is not equal to module.name
        //             return webpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        //         } else {
        //             // in production mode there's no webpack &quot;style-loader&quot;,
        //             // so the module.name will be equal to the asset path
        //             return regex.test(module.name);
        //         }
        //     },
        //     // How to correctly transform kinda weird `module.name`
        //     // of the `module` created by Webpack &quot;css-loader&quot;
        //     // into the correct asset path:
        //     path: webpackIsomorphicToolsPlugin.style_loader_path_extractor,
        //
        //     // How to extract these Webpack `module`s' javascript `source` code.
        //     // Basically takes `module.source` and modifies its `module.exports` a little.
        //     parser: webpackIsomorphicToolsPlugin.css_loader_parser
        // }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpackIsomorphicToolsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-isomorphic-tools/plugin'</span>);
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">webpack_assets_file_path</span>: <span class="hljs-string">`<span class="hljs-subst">${config.base_path}</span>/webpack-assets.json`</span>,
    <span class="hljs-attr">webpack_stats_file_path</span>: <span class="hljs-string">`<span class="hljs-subst">${config.base_path}</span>/webpack-stats.json`</span>,
    <span class="hljs-attr">assets</span>: {
        <span class="hljs-attr">images</span>: {
            <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'png'</span>, <span class="hljs-string">'jpg'</span>, <span class="hljs-string">'gif'</span>, <span class="hljs-string">'ico'</span>, <span class="hljs-string">'svg'</span>]
        },
        <span class="hljs-attr">fonts</span>: {
            <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'woff'</span>, <span class="hljs-string">'woff2'</span>, <span class="hljs-string">'eot'</span>, <span class="hljs-string">'ttf'</span>, <span class="hljs-string">'swf'</span>, <span class="hljs-string">'otf'</span>]
        },
        <span class="hljs-comment">// styles: {</span>
        <span class="hljs-comment">//     extensions: ['scss', 'css'],</span>
        <span class="hljs-comment">//     filter: function(module, regex, options, log) {</span>
        <span class="hljs-comment">//         if (options.development) {</span>
        <span class="hljs-comment">//             // in development mode there's webpack "style-loader",</span>
        <span class="hljs-comment">//             // so the module.name is not equal to module.name</span>
        <span class="hljs-comment">//             return webpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);</span>
        <span class="hljs-comment">//         } else {</span>
        <span class="hljs-comment">//             // in production mode there's no webpack "style-loader",</span>
        <span class="hljs-comment">//             // so the module.name will be equal to the asset path</span>
        <span class="hljs-comment">//             return regex.test(module.name);</span>
        <span class="hljs-comment">//         }</span>
        <span class="hljs-comment">//     },</span>
        <span class="hljs-comment">//     // How to correctly transform kinda weird `module.name`</span>
        <span class="hljs-comment">//     // of the `module` created by Webpack "css-loader"</span>
        <span class="hljs-comment">//     // into the correct asset path:</span>
        <span class="hljs-comment">//     path: webpackIsomorphicToolsPlugin.style_loader_path_extractor,</span>
        <span class="hljs-comment">//</span>
        <span class="hljs-comment">//     // How to extract these Webpack `module`s' javascript `source` code.</span>
        <span class="hljs-comment">//     // Basically takes `module.source` and modifies its `module.exports` a little.</span>
        <span class="hljs-comment">//     parser: webpackIsomorphicToolsPlugin.css_loader_parser</span>
        <span class="hljs-comment">// }</span>
    }
}</code></pre>
<p>该文件配置可以参考<a href="https://www.npmjs.com/package/webpack-isomorphic-tools" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<p>然后在webpack中，配置对应的资源的时候，引入该文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 同构处理静态资源的插件
const webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPluginIns =
    new webpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development();
...
module: {
  rules: [
    ...
    {
                test: webpackIsomorphicToolsPluginIns.regular_expression('images'),
                loader: 'url-loader?limit=8192', // 这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
                options: {
                    name: 'assets/images/[name]_[hash:8].[ext]'
                }
            },
            {
                test: webpackIsomorphicToolsPluginIns.regular_expression('fonts'),
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            }
  ]
}
plugins: [
  webpackIsomorphicToolsPluginIns,
  ....
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 同构处理静态资源的插件</span>
<span class="hljs-keyword">const</span> webpackIsomorphicToolsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-isomorphic-tools/plugin'</span>);
<span class="hljs-keyword">const</span> webpackIsomorphicToolsPluginIns =
    <span class="hljs-keyword">new</span> webpackIsomorphicToolsPlugin(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-isomorphic-tools-configuration'</span>)).development();
...
module: {
  <span class="hljs-attr">rules</span>: [
    ...
    {
                <span class="hljs-attr">test</span>: webpackIsomorphicToolsPluginIns.regular_expression(<span class="hljs-string">'images'</span>),
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=8192'</span>, <span class="hljs-comment">// 这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。</span>
                options: {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'assets/images/[name]_[hash:8].[ext]'</span>
                }
            },
            {
                <span class="hljs-attr">test</span>: webpackIsomorphicToolsPluginIns.regular_expression(<span class="hljs-string">'fonts'</span>),
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
                <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'assets/fonts/[name].[ext]'</span>
                }
            }
  ]
}
plugins: [
  webpackIsomorphicToolsPluginIns,
  ....
]
</code></pre>
<p>然后运行webpack，将文件打包之后，会生成一个<code>webpack-assets.json</code>文件，该文件就是存储静态资源的映射关系的json：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;javascript&quot;: {
    &quot;app&quot;: &quot;/assets/js/app_360a53bf78ee0e398bb2.js&quot;,
    &quot;vendor&quot;: &quot;/assets/js/vendor_360a53bf78ee0e398bb2.js&quot;
  },
  &quot;styles&quot;: {
    &quot;app&quot;: &quot;/assets/css/app_360a53bf78ee0e398bb2.css&quot;
  },
  &quot;assets&quot;: {
    &quot;./public/images/react.svg&quot;: &quot;data....&quot;
  },
  &quot;webpack&quot;: {
    &quot;version&quot;: &quot;2.7.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"javascript"</span>: {
    <span class="hljs-attr">"app"</span>: <span class="hljs-string">"/assets/js/app_360a53bf78ee0e398bb2.js"</span>,
    <span class="hljs-attr">"vendor"</span>: <span class="hljs-string">"/assets/js/vendor_360a53bf78ee0e398bb2.js"</span>
  },
  <span class="hljs-attr">"styles"</span>: {
    <span class="hljs-attr">"app"</span>: <span class="hljs-string">"/assets/css/app_360a53bf78ee0e398bb2.css"</span>
  },
  <span class="hljs-attr">"assets"</span>: {
    <span class="hljs-attr">"./public/images/react.svg"</span>: <span class="hljs-string">"data...."</span>
  },
  <span class="hljs-attr">"webpack"</span>: {
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"2.7.0"</span>
  }
}</code></pre>
<p>这样我们通过该json文件就可以获取到对应静态资源。</p>
<h3 id="articleHeader9">Express服务</h3>
<p>这里选用Express框架作为服务器，原因就是简单，很多人也选用koa，都一样。</p>
<p>这里服务端启动部分跟正常的Express启动类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import render from &quot;./render&quot;;
import fetch from &quot;./fetch&quot;;

app.use('*', (req, res, next) => {

    const { promises, store } = fetch(req);

    Promise.all(promises).then(data => {
        const html = render(req, res, store);
        res.send(html);
    }).catch(err =>{
        console.log('err');
        console.log(err);
        res.end('server error,please visit later')
    })

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> render <span class="hljs-keyword">from</span> <span class="hljs-string">"./render"</span>;
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">"./fetch"</span>;

app.use(<span class="hljs-string">'*'</span>, (req, res, next) =&gt; {

    <span class="hljs-keyword">const</span> { promises, store } = fetch(req);

    <span class="hljs-built_in">Promise</span>.all(promises).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> html = render(req, res, store);
        res.send(html);
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err'</span>);
        <span class="hljs-built_in">console</span>.log(err);
        res.end(<span class="hljs-string">'server error,please visit later'</span>)
    })

});</code></pre>
<p>核心在于路由部分：这里匹配所有路由（也可以是首页路由），使用<code>fetch</code>方法获取到了<code>promises</code>和<code>store</code>，然后再用<code>render</code>方法生成了html返回给客户端，这两个方法都是封装过的，</p>
<h3 id="articleHeader10">公用Action，Reducer</h3>
<p>我们在SPA开发中，请求一般都封装成actionCreator，方便调用与修改，SSR中就共用了actionCreator和reducer。</p>
<p><code>fetch</code>方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'isomorphic-fetch';

import { createStore } from &quot;redux&quot;;
import {actions} from '../src/actions/';

import reducer from &quot;../src/reducers&quot;;

const fetchHomeList = (store) => {
    return fetch('http://localhost:9000/api/aaa')
        .then((response)=>{
            console.log('then response------');
            return response.json();
        })
        .then((res)=>{
            console.log(res.data.length);
            store.dispatch(actions.updateHomeList(res.data));

            return res;
        })
        .catch((res)=>{
            console.log('catch res------');
            console.log(res);
        });
};

export default function (req) {
    const store = createStore(reducer);

    const promises = [
        fetchHomeList(store)
    ];

    return {
        promises,
        store
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">'isomorphic-fetch'</span>;

<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">"redux"</span>;
<span class="hljs-keyword">import</span> {actions} <span class="hljs-keyword">from</span> <span class="hljs-string">'../src/actions/'</span>;

<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">"../src/reducers"</span>;

<span class="hljs-keyword">const</span> fetchHomeList = <span class="hljs-function">(<span class="hljs-params">store</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'http://localhost:9000/api/aaa'</span>)
        .then(<span class="hljs-function">(<span class="hljs-params">response</span>)=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'then response------'</span>);
            <span class="hljs-keyword">return</span> response.json();
        })
        .then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(res.data.length);
            store.dispatch(actions.updateHomeList(res.data));

            <span class="hljs-keyword">return</span> res;
        })
        .catch(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'catch res------'</span>);
            <span class="hljs-built_in">console</span>.log(res);
        });
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req</span>) </span>{
    <span class="hljs-keyword">const</span> store = createStore(reducer);

    <span class="hljs-keyword">const</span> promises = [
        fetchHomeList(store)
    ];

    <span class="hljs-keyword">return</span> {
        promises,
        store
    }
}</code></pre>
<p>在<code>fetch</code>文件中，我们将首页需要获取的数据通过<code>isomorphic-fetch</code>来获取，然后跟SPA一样，<code>dispatch</code>到<code>store</code>中，然后暴露出去。</p>
<h3 id="articleHeader11">Render页面</h3>
<p>SSR返回的是首次渲染过后的html，首次渲染就是在<code>render</code>方法中实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fs from 'fs'
import path from 'path'

import React from 'react';
// import ReactDOM from 'react-dom';
import { StaticRouter as Router } from &quot;react-router-dom&quot;
import { renderToString } from &quot;react-dom/server&quot;
import { Provider } from &quot;react-redux&quot;
import Routes from '../src/route';

function getAssets() {
    return getAssets.assets || (() => {
            getAssets.assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../webpack-assets.json')));
            return getAssets.assets
        })()
}

export default function render(req, res, store) {
    const context = {};

    const html = renderToString(
        <Provider store={store}>
            <Router location={req.baseUrl} context={context}>
                <Routes />
            </Router>
        </Provider>
    );

    // <Route>中访问/,重定向到/home路由时
    if (context.url) {
        res.redirect('/home');
        return;
    }

    const main = getAssets();
    const app = main.javascript.app;
    const vendor = main.javascript.vendor;
    const style = main.styles.app;

    return `
    <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;utf-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;>
        <link href=${style} rel=&quot;stylesheet&quot;></link>
        <title>SSR</title>
    </head>
    <body>
        <div id=&quot;root&quot;>
            ${html}
        </div>
    </body>
    <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
    </script>
    <script src=${vendor}></script>
    <script src=${app}></script>
    </html>
    `
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">'fs'</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>

<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-comment">// import ReactDOM from 'react-dom';</span>
<span class="hljs-keyword">import</span> { StaticRouter <span class="hljs-keyword">as</span> Router } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-router-dom"</span>
<span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom/server"</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-redux"</span>
<span class="hljs-keyword">import</span> Routes <span class="hljs-keyword">from</span> <span class="hljs-string">'../src/route'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAssets</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> getAssets.assets || <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
            getAssets.assets = <span class="hljs-built_in">JSON</span>.parse(fs.readFileSync(path.join(__dirname, <span class="hljs-string">'../webpack-assets.json'</span>)));
            <span class="hljs-keyword">return</span> getAssets.assets
        })()
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">req, res, store</span>) </span>{
    <span class="hljs-keyword">const</span> context = {};

    <span class="hljs-keyword">const</span> html = renderToString(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">location</span>=<span class="hljs-string">{req.baseUrl}</span> <span class="hljs-attr">context</span>=<span class="hljs-string">{context}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Routes</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
    );

    <span class="hljs-comment">// &lt;Route&gt;中访问/,重定向到/home路由时</span>
    <span class="hljs-keyword">if</span> (context.url) {
        res.redirect(<span class="hljs-string">'/home'</span>);
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> main = getAssets();
    <span class="hljs-keyword">const</span> app = main.javascript.app;
    <span class="hljs-keyword">const</span> vendor = main.javascript.vendor;
    <span class="hljs-keyword">const</span> style = main.styles.app;

    <span class="hljs-keyword">return</span> <span class="hljs-string">`
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="utf-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"&gt;
        &lt;link href=<span class="hljs-subst">${style}</span> rel="stylesheet"&gt;&lt;/link&gt;
        &lt;title&gt;SSR&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id="root"&gt;
            <span class="hljs-subst">${html}</span>
        &lt;/div&gt;
    &lt;/body&gt;
    &lt;script&gt;
        window.__INITIAL_STATE__ = <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(store.getState())}</span>
    &lt;/script&gt;
    &lt;script src=<span class="hljs-subst">${vendor}</span>&gt;&lt;/script&gt;
    &lt;script src=<span class="hljs-subst">${app}</span>&gt;&lt;/script&gt;
    &lt;/html&gt;
    `</span>
}</code></pre>
<p>这里显而易见，我们准备一段html模板，跟SPA那个html模板类似，将<code>renderToString</code>的片段塞进去，同时根据<code>webpack-assets.json</code>获取到打包好的js和css，塞进去；最后，将上面刚刚配置好的store注入进去。</p>
<h2 id="articleHeader12">效果</h2>
<p>我们制作一个接口，使用setTimeout 500ms模拟网络开销，效果如下：<br><span class="img-wrap"><img data-src="/img/bV5UXn?w=840&amp;h=540" src="https://static.alili.tech/img/bV5UXn?w=840&amp;h=540" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>(gif上传不上去不知道为啥。。。)</p>
<p>可以看到SSR要比SPA明显的更快速得到首屏效果。</p>
<h2 id="articleHeader13">思考</h2>
<p>项目完成的同时，也在思考一些问题：</p>
<p><strong>1. 既然SSR首屏速度快，为何不所有路由全都SSR</strong></p>
<p>所有页面SSR可以做，这样每个页面的首屏都会很快，同时js也会小很多。但是带来的问题服务器压力会很大，维护起来成本较高。而且服务端毕竟是模拟客户端环境渲染，一些地方还是不一样的比如没有Document，没有window对象，无法进行DOM操作等。所以推荐首页等重要页面进行SSR。</p>
<p><strong>2. 如果接口时间过长，是不是白屏时间较长</strong></p>
<p>确实有这个问题，理论上讲，RPC要比客户端请求快很多，这样可以节省很多时间；但是如果接口很慢会造成白屏时间过长，得不偿失。所以接口很慢的页面不建议做SSR，同时接口也应该有严格的规范控制接口返回时间。</p>
<p><strong>3. 如果项目首页有很重的逻辑，或者Layout中有重逻辑该如何</strong></p>
<p>页面如果有很重的逻辑比如判断很多不同条件，做出很多相应处理；依次请求很多接口，或者一起请求大量数据等情况，这些逻辑处理都需要一同写进SSR中。</p>
<p><strong>4. Node服务器带来的维护及并发压力等问题</strong></p>
<p>使用Node服务器的话，还涉及到服务器的日常维护问题，日志收集，错误报警等问题，以及性能问题。要求前端（SA）有一定的Node服务器的维护经验，这时前端已经不是纯前端了。</p>
<p><strong>5. 什么项目适合SSR</strong></p>
<p>这个问题才是关键的问题。并不是所有项目都适合SSR，就好像不是所有项目都适合Redux一样。根据SSR特点适合场景：</p>
<ol>
<li>项目要求SEO，SSR就很合适。</li>
<li>需求项目某页面首屏时间要求很快，SSR可以减少白屏时间。</li>
<li>一般是首页，列表页等大量数据页面使用比较常见。</li>
</ol>
<p>欢迎大家提出些不同意见用以讨论。</p>
<h2 id="articleHeader14">参考</h2>
<ol>
<li><a href="https://github.com/xiyuyizhi/movies" rel="nofollow noreferrer" target="_blank">xiyuyizhi/movies</a></li>
<li><a href="https://cnodejs.org/topic/5865a866189fd5ad6459006c" rel="nofollow noreferrer" target="_blank">教你如何搭建一个超完美的React.js服务端渲染开发环境</a></li>
<li><a href="http://web.jobbole.com/93421/" rel="nofollow noreferrer" target="_blank">React 同构与极致的性能优化</a></li>
<li><a href="http://www.alloyteam.com/2017/01/react-from-scratch-server-render/" rel="nofollow noreferrer" target="_blank">从零开始React服务端渲染</a></li>
<li><a href="https://github.com/camsong/blog/issues/8" rel="nofollow noreferrer" target="_blank">精读前后端渲染之争</a></li>
</ol>
<p>项目源码：<a href="https://github.com/Aus0049/react-redux-isomorphic-demo" rel="nofollow noreferrer" target="_blank">https://github.com/Aus0049/re...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React同构总结

## 原文链接
[https://segmentfault.com/a/1190000013609085](https://segmentfault.com/a/1190000013609085)

