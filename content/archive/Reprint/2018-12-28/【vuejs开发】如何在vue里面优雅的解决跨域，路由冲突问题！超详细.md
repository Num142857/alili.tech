---
title: '【vuejs开发】如何在vue里面优雅的解决跨域，路由冲突问题！超详细' 
date: 2018-12-28 2:30:10
hidden: true
slug: 35kuq88cjvv
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">如何在vue里面优雅的解决跨域，路由冲突问题</h1>
<h2 id="articleHeader1">当我们在路由里面配置成以下代理可以解决跨域问题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
            '/goods/*': {
                target: 'http://localhost:3000'
            },
            '/users/*': {
                target: 'http://localhost:3000'
            }
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>    proxyTable: {
            <span class="hljs-string">'/goods/*'</span>: {
                target: <span class="hljs-string">'http://localhost:3000'</span>
            },
            <span class="hljs-string">'/users/*'</span>: {
                target: <span class="hljs-string">'http://localhost:3000'</span>
            }
        },</code></pre>
<blockquote>这种配置方式在一定程度上解决了跨域问题，但是会带来一些问题，<br>比如我们的vue 路由 也命名为 goods，这时候就会产生了冲突，<br>如果项目中接口很多，都在这里配置是很麻烦的，也容易产生路由冲突。</blockquote>
<h2 id="articleHeader2">　正确的姿势</h2>
<h2 id="articleHeader3">如果把所有的接口，统一规范为一个入口，在一定程度上会解决冲突</h2>
<p>把以上配置统一前面加上 /api/</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
            '/api/**': {
                target: 'http://localhost:3000'
            },
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">proxyTable</span>: {
            <span class="hljs-string">'/api/**'</span>: {
                <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000'</span>
            },
        },</code></pre>
<h2 id="articleHeader4">如果我们配置成这种方式,在使用http请求的时候就会发生变化，会在请求前面加上一个api，相对路由也会发生变化，也会在接口前面加上api，这样也会很麻烦,我们可以使用以下方式来解决这个问题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
            '/api/**': {
                target: 'http://localhost:3000',
                pathRewrite:{
                    '^/api':'/'
                }
            },
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">proxyTable</span>: {
            <span class="hljs-string">'/api/**'</span>: {
                <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000'</span>,
                <span class="hljs-attribute">pathRewrite</span>:{
                    <span class="hljs-string">'^/api'</span>:<span class="hljs-string">'/'</span>
                }
            },
        },</code></pre>
<h2 id="articleHeader5">上面这个代码，就是把咱们虚拟的这个api接口，去掉，此时真正去后端请求的时候，不会加上api这个前缀了，那么这样我们前台http请求的时候，还必须加上api前缀才能匹配到这个代理,代码如下：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    logout(){
        axios.post('/api/users/logout').then(result=>{
            let res = result.data;
            this.nickName = '';
            console.log(res);
        })
    },
    getGoods(){
        axios.post('/api/goods/list').then(result=>{
            let res = result.data;
            this.nickName = '';
            console.log(res);
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    logout(){
        axios.post(<span class="hljs-string">'/api/users/logout'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> res = result.data;
            <span class="hljs-keyword">this</span>.nickName = <span class="hljs-string">''</span>;
            <span class="hljs-built_in">console</span>.log(res);
        })
    },
    getGoods(){
        axios.post(<span class="hljs-string">'/api/goods/list'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> res = result.data;
            <span class="hljs-keyword">this</span>.nickName = <span class="hljs-string">''</span>;
            <span class="hljs-built_in">console</span>.log(res);
        })
    }</code></pre>
<h2 id="articleHeader6">我们可以利用axios的baseUrl直接默认值是 api，这样我们每次访问的时候，自动补上这个api前缀，就不需要我们自己手工在每个接口上面写这个前缀了</h2>
<p>在入口文件里面配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = 'api'

如果这配置 'api/' 会默认读取本地的域" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> VueAxios <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-axios'</span>

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = <span class="hljs-string">'api'</span>

如果这配置 <span class="hljs-string">'api/'</span> 会默认读取本地的域</code></pre>
<h3 id="articleHeader7">上面这样配置的话，不会区分生产和开发环境</h3>
<p>在config 文件夹里面新建一个 api.config.js 配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://www.vnshop.cn/api/' : 'api/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> isPro = Object.is(<span class="hljs-built_in">process</span>.env.NODE_ENV, <span class="hljs-string">'production'</span>)

<span class="hljs-keyword">module</span>.exports = {
    baseUrl: isPro ? <span class="hljs-string">'http://www.vnshop.cn/api/'</span> : <span class="hljs-string">'api/'</span>
}</code></pre>
<h3 id="articleHeader8">然后在main.js 里面引入,这样可以保证动态的匹配生产和开发的定义前缀</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import apiConfig from '../config/api.config'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> apiConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'../config/api.config'</span>

<span class="hljs-keyword">import</span> Axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> VueAxios <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-axios'</span>

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl</code></pre>
<h3 id="articleHeader9">经过上面配置后，在dom里面可以这样轻松的访问,也不需要在任何组件里面引入axios模块了。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    logout(){
        this.$http.post('/users/logout').then(result=>{
            let res = result.data;
            this.nickName = '';
            console.log(res);
        })
    },
    getGoods(){
        this.$http.post('/goods/list').then(result=>{
            let res = result.data;
            this.nickName = '';
            console.log(res);
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    logout(){
        <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/users/logout'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> res = result.data;
            <span class="hljs-keyword">this</span>.nickName = <span class="hljs-string">''</span>;
            <span class="hljs-built_in">console</span>.log(res);
        })
    },
    getGoods(){
        <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/goods/list'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> res = result.data;
            <span class="hljs-keyword">this</span>.nickName = <span class="hljs-string">''</span>;
            <span class="hljs-built_in">console</span>.log(res);
        })
    }</code></pre>
<h2 id="articleHeader10">最终代码</h2>
<h3 id="articleHeader11">在代理里面配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
            '/api/**': {
                target: 'http://localhost:3000',
                pathRewrite:{
                    '^/api':'/'
                }
            },
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">proxyTable</span>: {
            <span class="hljs-string">'/api/**'</span>: {
                <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000'</span>,
                <span class="hljs-attribute">pathRewrite</span>:{
                    <span class="hljs-string">'^/api'</span>:<span class="hljs-string">'/'</span>
                }
            },
        },</code></pre>
<h3 id="articleHeader12">在config里面的api.config.js 配置</h3>
<p>在config 文件夹里面新建一个 api.config.js 配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://www.vnshop.cn/api/' : 'api/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> isPro = Object.is(<span class="hljs-built_in">process</span>.env.NODE_ENV, <span class="hljs-string">'production'</span>)

<span class="hljs-keyword">module</span>.exports = {
    baseUrl: isPro ? <span class="hljs-string">'http://www.vnshop.cn/api/'</span> : <span class="hljs-string">'api/'</span>
}</code></pre>
<h4>关于生产和开发配置不太了解</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可以去 dev-server.js 里面看配置代码
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production') ?
    require('./webpack.prod.conf') :
    require('./webpack.dev.conf')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>可以去 dev-server.js 里面看配置代码
const webpackConfig = (<span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">'testing'</span> || <span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">'production'</span>) ?
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>) :
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.dev.conf'</span>)</code></pre>
<h3 id="articleHeader13">在main.js 入口文件里面配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import apiConfig from '../config/api.config'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> apiConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'../config/api.config'</span>

<span class="hljs-keyword">import</span> Axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> VueAxios <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-axios'</span>

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl</code></pre>
<h3 id="articleHeader14">在dom里面请求api的姿势</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    logout(){
        this.$http.post('/users/logout').then(result=>{
            let res = result.data;
            this.nickName = '';
            console.log(res);
        })
    },
    getGoods(){
        this.$http.post('/goods/list').then(result=>{
            let res = result.data;
            this.nickName = '';
            console.log(res);
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    logout(){
        <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/users/logout'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> res = result.data;
            <span class="hljs-keyword">this</span>.nickName = <span class="hljs-string">''</span>;
            <span class="hljs-built_in">console</span>.log(res);
        })
    },
    getGoods(){
        <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">'/goods/list'</span>).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
            <span class="hljs-keyword">let</span> res = result.data;
            <span class="hljs-keyword">this</span>.nickName = <span class="hljs-string">''</span>;
            <span class="hljs-built_in">console</span>.log(res);
        })
    }</code></pre>
<h2 id="articleHeader15">vuejs项目生产环境，上线解决跨域问题，请看以下文章</h2>
<p><a href="https://segmentfault.com/a/1190000010792260">vue项目上线</a>  看看这个文章，专门讲上线的</p>
<h2 id="articleHeader16">有疑问可以探讨</h2>
<h2 id="articleHeader17">如有帮助，请您点赞</h2>
<p><span class="img-wrap"><img data-src="/img/bVbioom?w=300&amp;h=300" src="https://static.alili.tech/img/bVbioom?w=300&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader18">欢迎加入组织</h1>
<p><a href="https://www.yuque.com/rdhub/about/info" rel="nofollow noreferrer" target="_blank">https://www.yuque.com/rdhub/a...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVbiooO?w=148&amp;h=148" src="https://static.alili.tech/img/bVbiooO?w=148&amp;h=148" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>QQ群：274583408</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vuejs开发】如何在vue里面优雅的解决跨域，路由冲突问题！超详细

## 原文链接
[https://segmentfault.com/a/1190000011715088](https://segmentfault.com/a/1190000011715088)

