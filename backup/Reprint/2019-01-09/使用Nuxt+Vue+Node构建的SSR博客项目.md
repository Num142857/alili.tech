---
title: '使用Nuxt+Vue+Node构建的SSR博客项目' 
date: 2019-01-09 2:30:11
hidden: true
slug: q517z3zvm8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>以前的博客使用的是Ghost，不过被攻击了，勒索我几百美元，还是算了吧，顺便说一句，数据备份很重要！前段时间学了Vue.js，以前看的Node还能记起来点，主要为了锻炼自己吧，这次的博客没有用Hexo，Ghost什么的，自己写的。由于有SEO的需求，毕竟自己写自己看也没什么意思，最终的使用的技术方案：Vue.js+Nuxt.js+ES6+Webpack+Mysql+Noyde.js+Express.js。动手之前其实还有很多东西不是很熟，不过最终也算是完成了，这个项目给了我一个启发：实践是学习的最快途径，看再多次文档真不如动手写一个项目来的实在。</p></blockquote>
<h2 id="articleHeader0">Vue.js和Nuxt.js</h2>
<p><strong>Vue.js</strong></p>
<p>当前流行的前端框架，官网地址：<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/</a>，文档写的很好，点个赞！</p>
<p><strong>Nuxt.js</strong></p>
<p><a href="https://zh.nuxtjs.org/guide" rel="nofollow noreferrer" target="_blank">Nuxt.js</a>的文档写的也不错，话说Vue.js系列的文档写的都很好，再次点赞，官网是这样介绍自己的：</p>
<blockquote>
<p>Nuxt.js 是一个基于 Vue.js 的通用应用框架。</p>
<p>通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。</p>
<p>我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。</p>
<p>Nuxt.js 预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。</p>
<p>除此之外，我们还提供了一种命令叫：nuxt generate，为基于 Vue.js 的应用提供生成对应的静态站点的功能。</p>
<p>我们相信这个命令所提供的功能，是向开发集成各种微服务（miscroservices）的 Web 应用迈开的新一步。</p>
<p>作为框架，Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。</p>
</blockquote>
<p>总结一下，Nuxt.js就是一个利用Vue, webpack 和 Node.js帮我们简单方便实现SSR的框架。</p>
<h2 id="articleHeader1">关于SSR</h2>
<p><strong>什么是SSR</strong></p>
<p>SSR是Server Side Render的缩写，即服务器端渲染。在没有SPA之前，绝大多数的网页都是通过服务器渲染生成的：用户向服务器发送请求，服务器获取请求，然后再查询数据库，根据查询的数据动态的生成一张网页，最后将网页内容返回给浏览器端。</p>
<p>现在拿Vue来说，在通常情况下，Vue.js是运行在浏览器中的，在浏览器你发送一个请求，然后获得了后台返回的数据，最后通过Vue.js将数据渲染成需要的HTML片段。现在，我们把将组件渲染成HTML这个工作拿到Node上来执行，可以将Node看成一个隐形的“浏览器”，在这个“浏览器”中我们将组件都渲染好，然后将渲染好的HTML直接发送给实际的浏览器（客户端），这就是Vue SSR。</p>
<p><strong>SSR的好处</strong></p>
<p>通过前端框架（Vue，Angular,React）构建的SPA（Single-Page Application - 单页应用程序），因为内容是通过Ajax获取的，所以就有一个天然的缺陷，就是搜索引擎没法获取里面的内容。右键查看一个SPA网页的源代码，你会发现你里面几乎没什么内容。对于像博客，新闻这样的网站，这一点是不可接收的。</p>
<p>总结起来，SSR带来的好处就是能够SEO，顺便因为内容在服务器端已经渲染好了，还能够减少请求数量，对于一些比较老旧的浏览器（Vue.js不支持），也能看到基础的内容。</p>
<h3 id="articleHeader2">开发总结</h3>
<p>开发中遇到了不少问题，在这里我列举一下，可以让大家尽量少走弯路，解决方案我尽量说的简洁点，有些东西我会单独开一篇博文。</p>
<p><strong>Restful</strong></p>
<p>项目后台使用的是Restful API，后台框架用的是express，你可以用<code>vue init nuxt-community/express-template &lt;project-name&gt;</code>生成一套基于express的模板文件，后台的代码在server目录，这个目录里面就是关于Node和express的内容了，这里不展开。</p>
<p><strong>asyncData多个请求</strong></p>
<p>参考下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async asyncData({ req, error }) {
    const page = 0
    let [pageRes, countRes] = await Promise.all([
        axios.get(`/api/post/page/${page}?scope=published`),
        axios.get('/api/post/count/published'),
    ])
    return {
        posts: pageRes.data.list,
        count: countRes.data.result,
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>async asyncData({ req, <span class="hljs-keyword">error</span> }) {
    <span class="hljs-keyword">const</span> page = 0
    let [pageRes, countRes] = await Promise.all([
        axios.<span class="hljs-built_in">get</span>(`/api/<span class="hljs-keyword">post</span>/page/<span class="hljs-variable">${page}</span>?scope=published`),
        axios.<span class="hljs-built_in">get</span>('/api/<span class="hljs-keyword">post</span>/<span class="hljs-keyword">count</span>/published'),
    ])
    <span class="hljs-keyword">return</span> {
        posts: pageRes.data.<span class="hljs-keyword">list</span>,
        <span class="hljs-keyword">count</span>: countRes.data.result,
    }
}</code></pre>
<p><strong>中间件</strong></p>
<p>中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。每一个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称(middleware/auth.js将成为 auth 中间件)。下面是一个示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { isLogin } from '../util/assist'
const needAuth = require('../util/api.config').needAuth
export default function ({ isClient, isServer, route, req, res, redirect }) {
    //在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
    if (isServer) {
        let cookies = req.cookies
        let path = req.originalUrl;

        if (path.indexOf('admin') > 0 &amp;&amp; !cookies.token) {
            redirect('/login')
        }
    }
    //在客户端判读是否需要登陆
    if (isClient) {
        if (route.path.indexOf('admin') > 0 &amp;&amp; !isLogin()) {
            redirect('login')
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { isLogin } <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/assist'</span>
<span class="hljs-keyword">const</span> needAuth = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../util/api.config'</span>).needAuth
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{ isClient, isServer, route, req, res, redirect }</span>) </span>{
    <span class="hljs-comment">//在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)</span>
    <span class="hljs-keyword">if</span> (isServer) {
        <span class="hljs-keyword">let</span> cookies = req.cookies
        <span class="hljs-keyword">let</span> path = req.originalUrl;

        <span class="hljs-keyword">if</span> (path.indexOf(<span class="hljs-string">'admin'</span>) &gt; <span class="hljs-number">0</span> &amp;&amp; !cookies.token) {
            redirect(<span class="hljs-string">'/login'</span>)
        }
    }
    <span class="hljs-comment">//在客户端判读是否需要登陆</span>
    <span class="hljs-keyword">if</span> (isClient) {
        <span class="hljs-keyword">if</span> (route.path.indexOf(<span class="hljs-string">'admin'</span>) &gt; <span class="hljs-number">0</span> &amp;&amp; !isLogin()) {
            redirect(<span class="hljs-string">'login'</span>)
        }
    }
}</code></pre>
<p><strong>Node循环+异步问题</strong></p>
<p>在项目里面有这样一个需求：显示文章（Post）对应的若干个标签（Tag），解决办法就是获取PostList，然后循环这个List并获取PostId，根据PostId去查对应的Tag。由于获取PostList异步操作，然后又在循环里面套了许多异步操作（获取Tag），所以用回调的方式就没法写下去了，最后使用的是<code>async</code>这个库，贴一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取Post列表
let list = (params, callback) => {
    postModel.list(params, (err, posts) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        //get each posts' tags
        async.eachSeries(posts, (post, tagCallback) => {
            postTagModel.tagsByPostId(post.id, (err, result) => {
                if (err) {
                    tagCallback(err)
                }
                post.tags = result;
                tagCallback()
            });
        }, (err) => {
            if (err) {
                callback({ code: 404, message: 'no result' });
                return false;
            }
            callback({ code: 404, message: 'no result', list: posts });
        });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//获取Post列表</span>
let <span class="hljs-keyword">list</span> = (params, callback) =&gt; {
    postModel.<span class="hljs-keyword">list</span>(params, (<span class="hljs-keyword">err</span>, posts) =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
            <span class="hljs-keyword">return</span> callback({ code: 404, message: '<span class="hljs-keyword">no</span> result' });
        }
        <span class="hljs-comment">//get each posts' tags</span>
        async.eachSeries(posts, (<span class="hljs-keyword">post</span>, tagCallback) =&gt; {
            postTagModel.tagsByPostId(<span class="hljs-keyword">post</span>.id, (<span class="hljs-keyword">err</span>, result) =&gt; {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
                    tagCallback(<span class="hljs-keyword">err</span>)
                }
                <span class="hljs-keyword">post</span>.tags = result;
                tagCallback()
            });
        }, (<span class="hljs-keyword">err</span>) =&gt; {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
                callback({ code: 404, message: '<span class="hljs-keyword">no</span> result' });
                <span class="hljs-keyword">return</span> false;
            }
            callback({ code: 404, message: '<span class="hljs-keyword">no</span> result', <span class="hljs-keyword">list</span>: posts });
        });
    });
}</code></pre>
<p><strong>静态资源</strong></p>
<p>在Nuxt中，你可以将静态文件放到项目根目录的static文件夹中，然后直接使用根路径<code>/</code>就可以访问了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 假设static目录下有一张图片my-image.png，可以这样直接访问 -->
<img src=&quot;/my-image.png&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 假设static目录下有一张图片my-image.png，可以这样直接访问 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/my-image.png"</span>/&gt;</span></code></pre>
<p><strong>登陆</strong></p>
<p>第一次使用restful，登陆问题一直困扰着我，搜了不少资料，最后的解决方案是使用token。</p>
<p>在前端，检测到用户没有登陆就跳转到登陆页面，用户发送登陆请求后先在后台校验用户名和密码，校验成功之后返回一个token。前端接收到这个token后将它存在本地，以后每次发送请求时将这个token带上，之后的请求后台对这个token进行校验，如果合法就认为登陆成功。</p>
<p>下面的代码用于生成token（使用的是jwt-simple），uid是用户ID，exp的取值是七天后的时间，jwtSecret是加密和解密的密钥。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let auth = (user, callback) => {
    if (user.account.trim() == '') {
        return callback({ code: 403, message: '用户名不正确' });
    }
    if (user.password.trim() == '') {
        return callback({ code: 403, message: '密码不正确' });
    }
    userModel.auth(user, (err, user) => {
        if (err) {
            return callback({ code: 404, message: '登陆失败' });
        }
        if (user.length === 1) {
            //设置七天有效期
            let expires = moment().add(7, 'days').valueOf();

            let token = jwt.encode({
                uid: user[0].id,
                exp: expires
            }, jwtSecret)

            return callback({ code: 200, message: 'success', token: token });
        }
        callback({ code: 404, message: '登陆失败' });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>let auth = (user, callback) =&gt; {
    <span class="hljs-keyword">if</span> (user.account.trim() == <span class="hljs-string">''</span>) {
        <span class="hljs-keyword">return</span> callback({ <span class="hljs-string">code:</span> <span class="hljs-number">403</span>, <span class="hljs-string">message:</span> <span class="hljs-string">'用户名不正确'</span> });
    }
    <span class="hljs-keyword">if</span> (user.password.trim() == <span class="hljs-string">''</span>) {
        <span class="hljs-keyword">return</span> callback({ <span class="hljs-string">code:</span> <span class="hljs-number">403</span>, <span class="hljs-string">message:</span> <span class="hljs-string">'密码不正确'</span> });
    }
    userModel.auth(user, (err, user) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-keyword">return</span> callback({ <span class="hljs-string">code:</span> <span class="hljs-number">404</span>, <span class="hljs-string">message:</span> <span class="hljs-string">'登陆失败'</span> });
        }
        <span class="hljs-keyword">if</span> (user.length === <span class="hljs-number">1</span>) {
            <span class="hljs-comment">//设置七天有效期</span>
            let expires = moment().add(<span class="hljs-number">7</span>, <span class="hljs-string">'days'</span>).valueOf();

            let token = jwt.encode({
<span class="hljs-symbol">                uid:</span> user[<span class="hljs-number">0</span>].id,
<span class="hljs-symbol">                exp:</span> expires
            }, jwtSecret)

            <span class="hljs-keyword">return</span> callback({ <span class="hljs-string">code:</span> <span class="hljs-number">200</span>, <span class="hljs-string">message:</span> <span class="hljs-string">'success'</span>, <span class="hljs-string">token:</span> token });
        }
        callback({ <span class="hljs-string">code:</span> <span class="hljs-number">404</span>, <span class="hljs-string">message:</span> <span class="hljs-string">'登陆失败'</span> });
    });
}</code></pre>
<p>我使用的Ajax工具是axios，下面代码的作用是给所有请求添加一个header。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 拦截request
$http.interceptors.request.use(
  config => {
    if (typeof document === 'object') {
      let token = getCookieInClient('token')
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  }, err => {
    return Promise.reject(err);
  }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 拦截request</span>
$http.interceptors.request.use(
  <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">document</span> === <span class="hljs-string">'object'</span>) {
      <span class="hljs-keyword">let</span> token = getCookieInClient(<span class="hljs-string">'token'</span>)
      <span class="hljs-keyword">if</span> (token) {
        config.headers.Authorization = token;
      }
    }
    <span class="hljs-keyword">return</span> config;
  }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
  }
);</code></pre>
<p>下面是校验token的中间件，先判断接口是否需要验证身份，不需要就直接Next，如果需要就获取并校验token，校验做的比较粗糙，就是直接判断token是否在有效期内，当然可以有更安全的做法，你可以自己去搜索一下。登陆成功的标志就是token校验合法，然后下一步操作。校验失败就直接返回，前端根据响应跳转到登陆页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (req, res, next) {
    let path = req.originalUrl
    
    //接口不需要登陆：直接next
    if (needAuth.indexOf(path) < 0) {
        return next();
    }
    
    //接口需要登陆
    var token = req.headers['authorization']
    if (!token) {
        return res.json({
            code: 401,
            message: 'you need login:there is no token'
        })
    }
    
    try {
        //解密获取的token
        let decoded = jwt.decode(token, jwtSecret);

        //校验有效期
        if (decoded.exp <= Date.now()) {
            return res.json({
                code: 401,
                message: 'you need login:token is expired'
            });
        }
        next();
    } catch (err) {
        return res.json({
            code: 401,
            message: 'you need login:decode token fail'
        })
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">let</span> path = req.originalUrl
    
    <span class="hljs-comment">//接口不需要登陆：直接next</span>
    <span class="hljs-keyword">if</span> (needAuth.indexOf(path) &lt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> next();
    }
    
    <span class="hljs-comment">//接口需要登陆</span>
    <span class="hljs-keyword">var</span> token = req.headers[<span class="hljs-string">'authorization'</span>]
    <span class="hljs-keyword">if</span> (!token) {
        <span class="hljs-keyword">return</span> res.json({
            <span class="hljs-attr">code</span>: <span class="hljs-number">401</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'you need login:there is no token'</span>
        })
    }
    
    <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">//解密获取的token</span>
        <span class="hljs-keyword">let</span> decoded = jwt.decode(token, jwtSecret);

        <span class="hljs-comment">//校验有效期</span>
        <span class="hljs-keyword">if</span> (decoded.exp &lt;= <span class="hljs-built_in">Date</span>.now()) {
            <span class="hljs-keyword">return</span> res.json({
                <span class="hljs-attr">code</span>: <span class="hljs-number">401</span>,
                <span class="hljs-attr">message</span>: <span class="hljs-string">'you need login:token is expired'</span>
            });
        }
        next();
    } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">return</span> res.json({
            <span class="hljs-attr">code</span>: <span class="hljs-number">401</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'you need login:decode token fail'</span>
        })
    }
};</code></pre>
<p><strong>nuxt.config</strong></p>
<p>nuxt的配置文件，具体的配置项可以参考<a href="https://zh.nuxtjs.org/guide/configuration" rel="nofollow noreferrer" target="_blank">这个链接</a>，下面是我的配置文件，里面的内容应该是一看就懂。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  //页面的head标签
  head: {
    title: 'JustYeh的前端博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '叶文祥的前端博客' },
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'author', content: '叶文祥,justyeh@163.com' },
      { name: 'apple-mobile-web-app-title', content: '叶文祥的前端博客' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#263238' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-page-mode', content: 'app' },
      { name: 'theme-color', content: '#263238' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  //全局引用的css文件
  css: ['~assets/css/main.css', '~assets/css/font-awesome.min.css'],
  // 页面顶部loading效果
  loading: {
    color: '#04acf7',
    height: '4px',
    failedColor: 'red'
  },
  //页面的过渡效果
  transition: {
    name: 'page'
  },
  //配置路由中间件
  router: {
    middleware: 'adminAuth'
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>module.exports = {
  <span class="hljs-comment">//页面的head标签</span>
<span class="hljs-symbol">  head:</span> {
<span class="hljs-symbol">    title:</span> <span class="hljs-string">'JustYeh的前端博客'</span>,
<span class="hljs-symbol">    meta:</span> [
      { <span class="hljs-string">charset:</span> <span class="hljs-string">'utf-8'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'viewport'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'width=device-width, initial-scale=1, user-scalable=no'</span> },
      { <span class="hljs-string">hid:</span> <span class="hljs-string">'description'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'description'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'叶文祥的前端博客'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'renderer'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'webkit'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'X-UA-Compatible'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'IE=edge'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'author'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'叶文祥,justyeh@163.com'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'apple-mobile-web-app-title'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'叶文祥的前端博客'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'apple-mobile-web-app-capable'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'yes'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'apple-mobile-web-app-status-bar-style'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'#263238'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'screen-orientation'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'portrait'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'x5-orientation'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'portrait'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'full-screen'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'yes'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'x5-fullscreen'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'true'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'browsermode'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'application'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'x5-page-mode'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'app'</span> },
      { <span class="hljs-string">name:</span> <span class="hljs-string">'theme-color'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'#263238'</span> },
    ],
<span class="hljs-symbol">    link:</span> [
      { <span class="hljs-string">rel:</span> <span class="hljs-string">'icon'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'image/x-icon'</span>, <span class="hljs-string">href:</span> <span class="hljs-string">'/favicon.ico'</span> }
    ]
  },
  <span class="hljs-comment">//全局引用的css文件</span>
<span class="hljs-symbol">  css:</span> [<span class="hljs-string">'~assets/css/main.css'</span>, <span class="hljs-string">'~assets/css/font-awesome.min.css'</span>],
  <span class="hljs-comment">// 页面顶部loading效果</span>
<span class="hljs-symbol">  loading:</span> {
<span class="hljs-symbol">    color:</span> <span class="hljs-string">'#04acf7'</span>,
<span class="hljs-symbol">    height:</span> <span class="hljs-string">'4px'</span>,
<span class="hljs-symbol">    failedColor:</span> <span class="hljs-string">'red'</span>
  },
  <span class="hljs-comment">//页面的过渡效果</span>
<span class="hljs-symbol">  transition:</span> {
<span class="hljs-symbol">    name:</span> <span class="hljs-string">'page'</span>
  },
  <span class="hljs-comment">//配置路由中间件</span>
<span class="hljs-symbol">  router:</span> {
<span class="hljs-symbol">    middleware:</span> <span class="hljs-string">'adminAuth'</span>
  }

}</code></pre>
<p><strong>部署</strong></p>
<p>部署一直不怎么会弄，这次也确实在上面遇到了不少问题，这里就不说了。最终使用的是<a href="http://pm2.keymetrics.io/" rel="nofollow noreferrer" target="_blank">pm2</a>，现在假设你已经安装好了node、pm2、vue等之类的包，依次运行下面的命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#进入文件所在目录
cd your_project
#安装项目所需依赖
npm insatll
#打包
npm run build
#运行,--name 'your project name'是可选的
pm2 start npm [--name 'your project name'] -- start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment">#进入文件所在目录</span>
cd your_project
<span class="hljs-comment">#安装项目所需依赖</span>
<span class="hljs-built_in">npm</span> insatll
<span class="hljs-comment">#打包</span>
<span class="hljs-built_in">npm</span> run build
<span class="hljs-comment">#运行,--name 'your project name'是可选的</span>
pm2 start <span class="hljs-built_in">npm</span> [--name <span class="hljs-string">'your project name'</span>] -- start</code></pre>
<h3 id="articleHeader3">说在最后</h3>
<p>上面的东西比较琐碎，如果你正好遇到相关的问题可能就有帮助了。系统性的梳理我也不知道怎么展开，只能抱歉了。</p>
<p>好了，全部的代码在这里：<a href="https://github.com/justyeh/justyeh.com" rel="nofollow noreferrer" target="_blank">https://github.com/justyeh/justyeh.com</a>，关于细节你都可以在这里面查看。这个是最终的成果：<a href="http://justyeh.com/" rel="nofollow noreferrer" target="_blank">http://justyeh.com/</a>，鉴于这个是私人项目，线上后台就不公布了，不过可以直接clone我的项目，数据库什么的都在，直接在本地就可以跑起来。</p>
<p>水平有限，如果有什么错误的地方还请包含。喜欢的话，可以给个star。如果你有什么好的建议和意见，欢迎<a href="http://justyeh.com/about" rel="nofollow noreferrer" target="_blank">联系我</a>！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Nuxt+Vue+Node构建的SSR博客项目

## 原文链接
[https://segmentfault.com/a/1190000010140155](https://segmentfault.com/a/1190000010140155)

