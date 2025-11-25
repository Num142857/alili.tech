---
title: 'weex脚手架' 
date: 2018-12-26 2:30:14
hidden: true
slug: sen6379teyp
categories: [reprint]
---

{{< raw >}}

                    
<p>此篇文章不要注意排版</p>
<p>经上级领导的要求，我们公司开始步入weex的队列，虽然现在已经处于开始阶段，但是是一个好的开始，一个艰苦的开始。</p>
<p>废话不多说，我们先聊一聊刚开始的整个过程</p>
<h2 id="articleHeader0">一、关于运行weex项目</h2>
<p>npm要求5.+，因此安装了node8.7.0,自带安装了 npm 5.4.2<br>为了方便切换node版本，mac上我们可以安装n来管理<br>sudo npm n -g<br>n 8.7.0便已切换</p>
<p>为了 npm install 的速度快一点，设置淘宝镜像<br>npm config set registry <a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a></p>
<h2 id="articleHeader1">二、开始weex</h2>
<p>1.安装weex： sudo npm install -g weex-toolkit<br>2初始化工程：weex init projectName<br>3.运行demo<br>weex src/index.vue<br>然后即可以使用playground app二维码扫描来查看效果了</p>
<p>我的weex版本：</p>
<p><span class="img-wrap"><img data-src="/img/bVX5bW?w=269&amp;h=93" src="https://static.alili.tech/img/bVX5bW?w=269&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">三、开始自己的脚手架</h2>
<p>首先weex号称可以一套代码跑三端，那么我们暂且区分两端，原生和H5.<br>网上巴拉巴拉查询一通，可以使用vue-router写单页面，但是据说在原生APP上切换页面的时候很卡，因为是dom级别的切换，于是，查到建议使用navigator来跳转</p>
<p>然后，然后我们就想办法，自己封装一个router，让咱代码既兼容vue-router，也兼容原生。<br>以下是我的项目目录：</p>
<p><span class="img-wrap"><img data-src="/img/bVX4Wo?w=384&amp;h=612" src="https://static.alili.tech/img/bVX4Wo?w=384&amp;h=612" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>原生端route<br>weex-routes.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const basePath = 'http://192.168.21.75:8088/dist/views';

const routeList = [
    {path: '/bankList', component: basePath + '/bankList.weex.js'},
    {path: '/bank', component: basePath + '/bank.weex.js'},
    {path: '/home', component: basePath + '/home/home.weex.js'},
    {path: '/material', component: basePath + '/home/material.weex.js'},
    {path: '/user/register', component: basePath + '/user/register/index.weex.js'},
    {path: '/user/modifyPassword', component: basePath + '/user/modifyPassword.index.weex.js'},
];

export default routeList;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const basePath = <span class="hljs-string">'http://192.168.21.75:8088/dist/views'</span>;

const routeList = [
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/bankList'</span>, <span class="hljs-string">component:</span> basePath + <span class="hljs-string">'/bankList.weex.js'</span>},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/bank'</span>, <span class="hljs-string">component:</span> basePath + <span class="hljs-string">'/bank.weex.js'</span>},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/home'</span>, <span class="hljs-string">component:</span> basePath + <span class="hljs-string">'/home/home.weex.js'</span>},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/material'</span>, <span class="hljs-string">component:</span> basePath + <span class="hljs-string">'/home/material.weex.js'</span>},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/user/register'</span>, <span class="hljs-string">component:</span> basePath + <span class="hljs-string">'/user/register/index.weex.js'</span>},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/user/modifyPassword'</span>, <span class="hljs-string">component:</span> basePath + <span class="hljs-string">'/user/modifyPassword.index.weex.js'</span>},
];

export <span class="hljs-keyword">default</span> routeList;</code></pre>
<p>web端route配置<br>web-routes.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bankList from 'views/bankList.vue';
import bank from 'views/bank.vue';
import home from 'views/home/home.vue';
import material from 'views/home/material.vue';
import register from 'views/user/register/index.vue';
import modifyPassword from 'views/user/modifyPassword/index.vue';

const routeList = [
    {path: '/bankList', component: bankList},
    {path: '/bank', component: bank},
    {path: '/home/home', component: home},
    {path: '/home/material', component: material},
    {path: '/user/register', component: register},
    {path: '/user/modifyPassword', component: modifyPassword},
];

export default routeList;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">import</span> bankList from <span class="hljs-string">'views/bankList.vue'</span>;
<span class="hljs-keyword">import</span> bank from <span class="hljs-string">'views/bank.vue'</span>;
<span class="hljs-keyword">import</span> home from <span class="hljs-string">'views/home/home.vue'</span>;
<span class="hljs-keyword">import</span> material from <span class="hljs-string">'views/home/material.vue'</span>;
<span class="hljs-keyword">import</span> register from <span class="hljs-string">'views/user/register/index.vue'</span>;
<span class="hljs-keyword">import</span> modifyPassword from <span class="hljs-string">'views/user/modifyPassword/index.vue'</span>;

const routeList = [
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/bankList'</span>, <span class="hljs-string">component:</span> bankList},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/bank'</span>, <span class="hljs-string">component:</span> bank},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/home/home'</span>, <span class="hljs-string">component:</span> home},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/home/material'</span>, <span class="hljs-string">component:</span> material},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/user/register'</span>, <span class="hljs-string">component:</span> register},
    {<span class="hljs-string">path:</span> <span class="hljs-string">'/user/modifyPassword'</span>, <span class="hljs-string">component:</span> modifyPassword},
];

export <span class="hljs-keyword">default</span> routeList;</code></pre>
<p>web端H5由于我们做成一个单页面，所以还需要一个入口文件<br>app.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueRouter from 'vue-router';
import routeList from './web-routes.js';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: routeList,
    mode: 'history'
});

new Vue({
    template: '<div id=&quot;root&quot;><router-view></router-view></div>',
    router
}).$mount('#root');

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> routeList <span class="hljs-keyword">from</span> <span class="hljs-string">'./web-routes.js'</span>;
Vue.use(VueRouter);

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: routeList,
    <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>
});

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div id="root"&gt;&lt;router-view&gt;&lt;/router-view&gt;&lt;/div&gt;'</span>,
    router
}).$mount(<span class="hljs-string">'#root'</span>);

</code></pre>
<p>接下来就是我们来封装一下router了，让我们的代码兼容APP和H5端,<br>router.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import routeList from './weex-routes';
const navigator = weex.requireModule('navigator');

/**
* 从weex路由表中获取路由
* @params route String|Object
*/
function getWeexRoute (route) {
    const item = routeList.find(item => {
        if (item.path === route.path || route === route.path) {
            return item;
        }
    });
    if (!item) {
        throw new Error(`routes路由表中不存在该路径${route.path}`);
    }
    return item;
};


const routerConfig = {
    install () {

        // H5不需要重置router属性，直接返回
        if (weex.config.env.rem) {
            return;
        }
        const url = weex.config.bundleUrl;
        const query = getQueryData(url);

        Object.defineProperty(Vue.prototype, &quot;$router&quot;, {
            value: {
                push (route) {
                    const currentRoute = getWeexRoute(route);
                    let query = '';
                    if (route.query) {
                        query = createQuery(route.query);
                    }
                    navigator.push({
                        url: currentRoute.component + query,
                        animated: 'true'
                    });
                },
                back () {
                    if (navigator) {
                        navigator.pop();
                    }
                }
            },
            configurable: false
        });

        Object.defineProperty(Vue.prototype, '$route', {
            configurable: false,
            value: {
                query: query,
                fullPath: '',
                name: '',
                params: {},
                path: '',
                hash: '',
            }
        });
    }
}

Vue.use(routerConfig);

// object 转 URL 参数
function createQuery (obj) {
    let url = '?';
    for (let key in obj) {
        if (obj[key] !== null) {
            url += (key + '=' + encodeURIComponent(obj[key]) + '&amp;');
        }
    }
    return url.substring(0, url.lastIndexOf('&amp;'));
};

// 'xxx.js?name=aa' 转 {name: 'aa'}
function getQueryData (url) {
    url = url.substring(url.indexOf('.js?') + 3);
    var result = {};
    if (url.indexOf(&quot;?&quot;) != -1) {
        var str = url.substr(1);
        var strs = str.split(&quot;&amp;&quot;);
        for (var i = 0; i < strs.length; i++) {
            result[strs[i].split(&quot;=&quot;)[0]] = decodeURIComponent(strs[i].split(&quot;=&quot;)[1]);
        }
    }
    return result;
 };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">import</span> routeList from <span class="hljs-string">'./weex-routes'</span>;
<span class="hljs-keyword">const</span> navigator = weex.requireModule(<span class="hljs-string">'navigator'</span>);

<span class="hljs-comment">/**
* 从weex路由表中获取路由
* @params route String|Object
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWeexRoute</span> (<span class="hljs-params">route</span>) </span>{
    <span class="hljs-keyword">const</span> item = routeList.find(item =&gt; {
        <span class="hljs-keyword">if</span> (item.path === route.path || route === route.path) {
            <span class="hljs-keyword">return</span> item;
        }
    });
    <span class="hljs-keyword">if</span> (!item) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`routes路由表中不存在该路径<span class="hljs-subst">${route.path}</span>`</span>);
    }
    <span class="hljs-keyword">return</span> item;
};


<span class="hljs-keyword">const</span> routerConfig = {
    install () {

        <span class="hljs-comment">// H5不需要重置router属性，直接返回</span>
        <span class="hljs-keyword">if</span> (weex.config.env.rem) {
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = weex.config.bundleUrl;
        <span class="hljs-keyword">const</span> query = getQueryData(<span class="hljs-built_in">url</span>);

        <span class="hljs-built_in">Object</span>.defineProperty(Vue.prototype, <span class="hljs-string">"$router"</span>, {
            <span class="hljs-attribute">value</span>: {
                push (route) {
                    <span class="hljs-keyword">const</span> currentRoute = getWeexRoute(route);
                    <span class="hljs-keyword">let</span> query = <span class="hljs-string">''</span>;
                    <span class="hljs-keyword">if</span> (route.query) {
                        query = createQuery(route.query);
                    }
                    navigator.push({
                        <span class="hljs-attribute">url</span>: currentRoute.component + query,
                        <span class="hljs-attribute">animated</span>: <span class="hljs-string">'true'</span>
                    });
                },
                back () {
                    <span class="hljs-keyword">if</span> (navigator) {
                        navigator.pop();
                    }
                }
            },
            <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">false</span>
        });

        <span class="hljs-built_in">Object</span>.defineProperty(Vue.prototype, <span class="hljs-string">'$route'</span>, {
            <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attribute">value</span>: {
                <span class="hljs-attribute">query</span>: query,
                <span class="hljs-attribute">fullPath</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attribute">name</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attribute">params</span>: {},
                <span class="hljs-attribute">path</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attribute">hash</span>: <span class="hljs-string">''</span>,
            }
        });
    }
}

Vue.use(routerConfig);

<span class="hljs-comment">// object 转 URL 参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createQuery</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'?'</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (obj[key] !== <span class="hljs-literal">null</span>) {
            <span class="hljs-built_in">url</span> += (key + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(obj[key]) + <span class="hljs-string">'&amp;'</span>);
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">url</span>.substring(<span class="hljs-number">0</span>, <span class="hljs-built_in">url</span>.lastIndexOf(<span class="hljs-string">'&amp;'</span>));
};

<span class="hljs-comment">// 'xxx.js?name=aa' 转 {name: 'aa'}</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQueryData</span> (<span class="hljs-params">url</span>) </span>{
    <span class="hljs-built_in">url</span> = <span class="hljs-built_in">url</span>.substring(<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">'.js?'</span>) + <span class="hljs-number">3</span>);
    <span class="hljs-built_in">var</span> result = {};
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">"?"</span>) != <span class="hljs-number">-1</span>) {
        <span class="hljs-built_in">var</span> str = <span class="hljs-built_in">url</span>.substr(<span class="hljs-number">1</span>);
        <span class="hljs-built_in">var</span> strs = str.split(<span class="hljs-string">"&amp;"</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; strs.length; i++) {
            result[strs[i].split(<span class="hljs-string">"="</span>)[<span class="hljs-number">0</span>]] = <span class="hljs-built_in">decodeURIComponent</span>(strs[i].split(<span class="hljs-string">"="</span>)[<span class="hljs-number">1</span>]);
        }
    }
    <span class="hljs-keyword">return</span> result;
 };
</code></pre>
<p>ok基础设施已大功告成，我们需要在我们的业务代码中使用router了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首先需要引入我们的router.js
import '../../router.js';
this.$router.push({path: '/material', query: this.form});

// 当跳转到material.vue中我们则可以直接获取url中的参数了，此法兼容原生和H5
import '../../router.js';
this.query = this.$route.query;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 首先需要引入我们的router.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../../router.js'</span>;
<span class="hljs-keyword">this</span>.$router.push({path: <span class="hljs-string">'/material'</span>, query: <span class="hljs-keyword">this</span>.form});

<span class="hljs-comment">// 当跳转到material.vue中我们则可以直接获取url中的参数了，此法兼容原生和H5</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../../router.js'</span>;
<span class="hljs-keyword">this</span>.query = <span class="hljs-keyword">this</span>.$route.query;
</code></pre>
<p>基础的配置我们已经操作完毕，接下来要配置webpack了<br>我们需要一个build xx.wexx.js的webpack配置<br>和一个web的单页的webpack配置</p>
<p>webpack.web.js配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ip = require('ip').address();
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log('server is running! Please open ' + chalk.green('http://' + ip + ':8080/'));
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';


module.exports = function() {
    const config = {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash:7].web.js',
        },
        resolve: {
            extensions: ['*', '.vue', '.js'],
            alias: {
                'src': path.join(__dirname, './src'),
                'views': path.join(__dirname, './src/views'),
                'services': path.join(__dirname, './src/services'),
                'utils': path.join(__dirname, './src/utils'),
                'constants': path.join(__dirname, './src/constants'),
                'assets': path.join(__dirname, './src/assets'),
            }
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.vue(\?[^?]+)?$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },

        plugins: [
            new webpack.BannerPlugin({
                banner: '// { &quot;framework&quot;: ' + ('.vue' === '.vue' ? '&quot;Vue&quot;' : '&quot;Weex&quot;') + '} \n',
                raw: true,
                exclude: 'Vue'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            })
        ]
    };

    if (!isProd) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: 'web/index.dev.html',
                title: 'Hello Weex',
                isDevServer: true,
                chunksSortMode: 'dependency',
                inject: 'head'
            })
        );

        config.devServer = {
            compress: true,
            host: '0.0.0.0',
            port: '8080',
            historyApiFallback: true,
            public: ip + ':8080',
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        };

    } else {
        // 抽取vue文件css
        config.module.rules[0].options = {
            loaders: {
                css: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'vue-style-loader'
                })
            }
        };
        config.plugins.push(
            new ExtractTextPlugin('[name].[hash:7].css'),
            new HtmlWebpackPlugin({
                template: 'web/index.html',
                inject: true,
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
    }

    return config;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> ip = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ip'</span>).address();
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running! Please open '</span> + chalk.green(<span class="hljs-string">'http://'</span> + ip + <span class="hljs-string">':8080/'</span>));
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> ScriptExtHtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'script-ext-html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> isProd = process.env.NODE_ENV === <span class="hljs-string">'production'</span>;


<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> config = {
        entry: {
            app: <span class="hljs-string">'./src/app.js'</span>
        },
        output: {
            path: path.join(__dirname, <span class="hljs-string">'./dist'</span>),
            filename: <span class="hljs-string">'[name].[hash:7].web.js'</span>,
        },
        resolve: {
            extensions: [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.js'</span>],
            alias: {
                <span class="hljs-string">'src'</span>: path.join(__dirname, <span class="hljs-string">'./src'</span>),
                <span class="hljs-string">'views'</span>: path.join(__dirname, <span class="hljs-string">'./src/views'</span>),
                <span class="hljs-string">'services'</span>: path.join(__dirname, <span class="hljs-string">'./src/services'</span>),
                <span class="hljs-string">'utils'</span>: path.join(__dirname, <span class="hljs-string">'./src/utils'</span>),
                <span class="hljs-string">'constants'</span>: path.join(__dirname, <span class="hljs-string">'./src/constants'</span>),
                <span class="hljs-string">'assets'</span>: path.join(__dirname, <span class="hljs-string">'./src/assets'</span>),
            }
        },
        devtool: <span class="hljs-string">'source-map'</span>,
        <span class="hljs-keyword">module</span>: {
            rules: [
                {
                    test: <span class="hljs-regexp">/\.vue(\?[^?]+)?$/</span>,
                    loader: <span class="hljs-string">'vue-loader'</span>,
                },
                {
                    test: <span class="hljs-regexp">/\.html$/</span>,
                    loader: <span class="hljs-string">'raw-loader'</span>,
                },
                {
                    test: <span class="hljs-regexp">/\.js$/</span>,
                    use: <span class="hljs-string">'babel-loader'</span>,
                    exclude: <span class="hljs-regexp">/node_modules/</span>
                }
            ]
        },

        plugins: [
            <span class="hljs-keyword">new</span> webpack.BannerPlugin({
                banner: <span class="hljs-string">'// { "framework": '</span> + (<span class="hljs-string">'.vue'</span> === <span class="hljs-string">'.vue'</span> ? <span class="hljs-string">'"Vue"'</span> : <span class="hljs-string">'"Weex"'</span>) + <span class="hljs-string">'} \n'</span>,
                raw: <span class="hljs-literal">true</span>,
                exclude: <span class="hljs-string">'Vue'</span>
            }),
            <span class="hljs-keyword">new</span> ScriptExtHtmlWebpackPlugin({
                defaultAttribute: <span class="hljs-string">'defer'</span>
            })
        ]
    };

    <span class="hljs-keyword">if</span> (!isProd) {
        config.plugins.push(
            <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
                template: <span class="hljs-string">'web/index.dev.html'</span>,
                title: <span class="hljs-string">'Hello Weex'</span>,
                isDevServer: <span class="hljs-literal">true</span>,
                chunksSortMode: <span class="hljs-string">'dependency'</span>,
                inject: <span class="hljs-string">'head'</span>
            })
        );

        config.devServer = {
            compress: <span class="hljs-literal">true</span>,
            host: <span class="hljs-string">'0.0.0.0'</span>,
            port: <span class="hljs-string">'8080'</span>,
            historyApiFallback: <span class="hljs-literal">true</span>,
            <span class="hljs-keyword">public</span>: ip + <span class="hljs-string">':8080'</span>,
            watchOptions: {
                aggregateTimeout: <span class="hljs-number">300</span>,
                poll: <span class="hljs-number">1000</span>
            }
        };

    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 抽取vue文件css</span>
        config.module.rules[<span class="hljs-number">0</span>].options = {
            loaders: {
                css: ExtractTextPlugin.extract({
                    use: [<span class="hljs-string">'css-loader'</span>],
                    fallback: <span class="hljs-string">'vue-style-loader'</span>
                })
            }
        };
        config.plugins.push(
            <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].[hash:7].css'</span>),
            <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
                template: <span class="hljs-string">'web/index.html'</span>,
                inject: <span class="hljs-literal">true</span>,
            }),
            <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: <span class="hljs-literal">false</span>
                }
            })
        )
    }

    <span class="hljs-keyword">return</span> config;

}</code></pre>
<p>原生端的webpack.config.js配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pathTo = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');

const entry = {};
const weexEntry = {};
const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
var isWin = /^win/.test(process.platform);


function getEntryFileContent(entryPath, vueFilePath) {
  let relativePath = pathTo.relative(pathTo.join(entryPath, '../'), vueFilePath);
  let contents = '';
  if (hasPluginInstalled) {
    const plugindir = pathTo.resolve('./web/plugin.js');
    contents = 'require(\'' + plugindir + '\') \n';
  }
  if (isWin) {
    relativePath = relativePath.replace(/\\/g,'\\\\');
  }
  contents += 'var App = require(\'' + relativePath + '\')\n';
  contents += 'App.el = \'#root\'\n';
  contents += 'new Vue(App)\n';
  return contents;
}

var fileType = '';

function walk(dir) {
  dir = dir || '.';
  const directory = pathTo.join(__dirname, 'src', dir);
  fs.readdirSync(directory)
    .forEach((file) => {
      const fullpath = pathTo.join(directory, file);
      const stat = fs.statSync(fullpath);
      const extname = pathTo.extname(fullpath);
      if (stat.isFile() &amp;&amp; extname === '.vue' || extname === '.we') {
        if (!fileType) {
          fileType = extname;
        }
        if (fileType &amp;&amp; extname !== fileType) {
          console.log('Error: This is not a good practice when you use &quot;.we&quot; and &quot;.vue&quot; togither!');
        }
        const name = pathTo.join(dir, pathTo.basename(file, extname));
        if (extname === '.vue') {
          const entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + '.js');
          fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath));
          
          entry[name] = pathTo.join(__dirname, entryFile) + '?entry=true';
        } 
        if (fullpath.includes('/views')) {
          weexEntry[name] = fullpath + '?entry=true';
        }
      } else if (stat.isDirectory() &amp;&amp; file !== 'build' &amp;&amp; file !== 'include') {
        const subdir = pathTo.join(dir, file);
        walk(subdir);
      }
    });
}

walk();
// web need vue-loader
const plugins = [
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.BannerPlugin({
    banner: '// { &quot;framework&quot;: ' + (fileType === '.vue' ? '&quot;Vue&quot;' : '&quot;Weex&quot;') + '} \n',
    raw: true,
    exclude: 'Vue'
  })
];

const weexConfig = {
  entry: weexEntry,
  output: {
    path: pathTo.join(__dirname, 'dist'),
    filename: '[name].weex.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules(?!\/.*(weex).*)/
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader'
        }]
      },
      {
        test: /\.we(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader'
        }]
      }
    ]
  },
  plugins: plugins,
};

module.exports = weexConfig;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> pathTo = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs-extra'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">const</span> entry = {};
<span class="hljs-keyword">const</span> weexEntry = {};
<span class="hljs-keyword">const</span> vueWebTemp = <span class="hljs-string">'temp'</span>;
<span class="hljs-keyword">const</span> hasPluginInstalled = fs.existsSync(<span class="hljs-string">'./web/plugin.js'</span>);
<span class="hljs-keyword">var</span> isWin = <span class="hljs-regexp">/^win/</span>.test(process.platform);


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEntryFileContent</span>(<span class="hljs-params">entryPath, vueFilePath</span>) </span>{
  <span class="hljs-keyword">let</span> relativePath = pathTo.relative(pathTo.join(entryPath, <span class="hljs-string">'../'</span>), vueFilePath);
  <span class="hljs-keyword">let</span> contents = <span class="hljs-string">''</span>;
  <span class="hljs-keyword">if</span> (hasPluginInstalled) {
    <span class="hljs-keyword">const</span> plugindir = pathTo.resolve(<span class="hljs-string">'./web/plugin.js'</span>);
    contents = <span class="hljs-string">'require(\''</span> + plugindir + <span class="hljs-string">'\') \n'</span>;
  }
  <span class="hljs-keyword">if</span> (isWin) {
    relativePath = relativePath.replace(<span class="hljs-regexp">/\\/g</span>,<span class="hljs-string">'\\\\'</span>);
  }
  contents += <span class="hljs-string">'var App = require(\''</span> + relativePath + <span class="hljs-string">'\')\n'</span>;
  contents += <span class="hljs-string">'App.el = \'#root\'\n'</span>;
  contents += <span class="hljs-string">'new Vue(App)\n'</span>;
  <span class="hljs-keyword">return</span> contents;
}

<span class="hljs-keyword">var</span> fileType = <span class="hljs-string">''</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">walk</span>(<span class="hljs-params">dir</span>) </span>{
  dir = dir || <span class="hljs-string">'.'</span>;
  <span class="hljs-keyword">const</span> directory = pathTo.join(__dirname, <span class="hljs-string">'src'</span>, dir);
  fs.readdirSync(directory)
    .forEach(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> fullpath = pathTo.join(directory, file);
      <span class="hljs-keyword">const</span> stat = fs.statSync(fullpath);
      <span class="hljs-keyword">const</span> extname = pathTo.extname(fullpath);
      <span class="hljs-keyword">if</span> (stat.isFile() &amp;&amp; extname === <span class="hljs-string">'.vue'</span> || extname === <span class="hljs-string">'.we'</span>) {
        <span class="hljs-keyword">if</span> (!fileType) {
          fileType = extname;
        }
        <span class="hljs-keyword">if</span> (fileType &amp;&amp; extname !== fileType) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error: This is not a good practice when you use ".we" and ".vue" togither!'</span>);
        }
        <span class="hljs-keyword">const</span> name = pathTo.join(dir, pathTo.basename(file, extname));
        <span class="hljs-keyword">if</span> (extname === <span class="hljs-string">'.vue'</span>) {
          <span class="hljs-keyword">const</span> entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + <span class="hljs-string">'.js'</span>);
          fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath));
          
          entry[name] = pathTo.join(__dirname, entryFile) + <span class="hljs-string">'?entry=true'</span>;
        } 
        <span class="hljs-keyword">if</span> (fullpath.includes(<span class="hljs-string">'/views'</span>)) {
          weexEntry[name] = fullpath + <span class="hljs-string">'?entry=true'</span>;
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (stat.isDirectory() &amp;&amp; file !== <span class="hljs-string">'build'</span> &amp;&amp; file !== <span class="hljs-string">'include'</span>) {
        <span class="hljs-keyword">const</span> subdir = pathTo.join(dir, file);
        walk(subdir);
      }
    });
}

walk();
<span class="hljs-comment">// web need vue-loader</span>
<span class="hljs-keyword">const</span> plugins = [
  <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({<span class="hljs-attr">minimize</span>: <span class="hljs-literal">true</span>}),
  <span class="hljs-keyword">new</span> webpack.BannerPlugin({
    <span class="hljs-attr">banner</span>: <span class="hljs-string">'// { "framework": '</span> + (fileType === <span class="hljs-string">'.vue'</span> ? <span class="hljs-string">'"Vue"'</span> : <span class="hljs-string">'"Weex"'</span>) + <span class="hljs-string">'} \n'</span>,
    <span class="hljs-attr">raw</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">exclude</span>: <span class="hljs-string">'Vue'</span>
  })
];

<span class="hljs-keyword">const</span> weexConfig = {
  <span class="hljs-attr">entry</span>: weexEntry,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: pathTo.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].weex.js'</span>,
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        }],
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules(?!\/.*(weex).*)/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue(\?[^?]+)?$/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'weex-loader'</span>
        }]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.we(\?[^?]+)?$/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'weex-loader'</span>
        }]
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: plugins,
};

<span class="hljs-built_in">module</span>.exports = weexConfig;
</code></pre>
<p>package.json配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: &quot;rm -rf dist &amp;&amp; cross-env NODE_ENV=production webpack --config webpack.web.js &amp;&amp; webpack --config webpack.config.js&quot;,
    &quot;web1&quot;: &quot;webpack --config webpack.web.js --watch&quot;,
    &quot;web2&quot;: &quot;webpack-dev-server --config webpack.web.js --progress --watch --open&quot;,
    &quot;web&quot;: &quot;rm -rf dist&amp;npm run web1&amp;npm run web2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"build"</span>: <span class="hljs-string">"rm -rf dist &amp;&amp; cross-env NODE_ENV=production webpack --config webpack.web.js &amp;&amp; webpack --config webpack.config.js"</span>,
    <span class="hljs-string">"web1"</span>: <span class="hljs-string">"webpack --config webpack.web.js --watch"</span>,
    <span class="hljs-string">"web2"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.web.js --progress --watch --open"</span>,
    <span class="hljs-string">"web"</span>: <span class="hljs-string">"rm -rf dist&amp;npm run web1&amp;npm run web2"</span></code></pre>
<p>打包执行 npm run build，就会把weex和H5的文件都给生产到dist目录中了<br>.weex文件是原生的，.css .web index.html是H5的</p>
<p><span class="img-wrap"><img data-src="/img/bVX44p?w=498&amp;h=744" src="https://static.alili.tech/img/bVX44p?w=498&amp;h=744" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>还需要注意的地方：<br>由于我们也是刚开始接触weex，希望这这只是一个参考案例，毕竟我们也不是高手。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
weex脚手架

## 原文链接
[https://segmentfault.com/a/1190000011896848](https://segmentfault.com/a/1190000011896848)

