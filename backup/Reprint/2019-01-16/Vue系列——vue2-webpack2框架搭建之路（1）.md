---
title: 'Vue系列——vue2-webpack2框架搭建之路（1）' 
date: 2019-01-16 2:30:08
hidden: true
slug: 3fbc50sj3ph
categories: [reprint]
---

{{< raw >}}

                    
<p>一直以来，我从事react开发，突然想用vue来搭建一个项目，看看我的踩坑之路。</p>
<p>react、vue、angular代表了3种前端工程化的思想，学习三大框架主要是理解它们的核心概念，比如组件、生命周期、单向数据流、双向绑定等。这些概念在非框架开发中，很少人会去这样系统化的思考，对于新手来说，很多概念都没有接触过，不知道从何入手一个react、vue或者是angular项目，下面我将会从零搭建vue项目，边做项目边学习vue的思想。</p>
<h3 id="articleHeader0"><strong>1、想要使用vue，我首先该怎么做？</strong></h3>
<p>想要学习vue，我第一件事是去vue官网看简介：<a href="https://cn.vuejs.org/v2/guide/installation.html" rel="nofollow noreferrer" target="_blank"></a><a href="https://cn.vuejs.org/v2/guide/installation.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a> ，仔细一看，vue现在有1.X和2.X的区别，很好，我果断选择2.X。</p>
<p>选中了vue版本，我上知乎搜索了vue框架搭建的方式，看了前辈的各种分享，了解到一个叫做 <a href="http://elemefe.github.io/cooking/" rel="nofollow noreferrer" target="_blank">cooking</a> 的好玩意，好在哪里？</p>
<p>cooking 的目标是将你从繁琐的构建配置中解放出来，同时还省去每个项目都要安装一堆开发依赖的麻烦。基于 webapck 但更友好的配置项、易用的扩展配置机制，让你专注项目忘掉配置。</p>
<p>哇，看到cooking官网介绍的这么好，我果断按照它的教程去做，瞎搞了一下下，发现用的不爽啊，一键配置环境看起来很高大上，可是还得去学习cooking的使用，而且本地得安装cooking，搞得我头晕，虽然在浏览器成功访问到了网页，但我还是放弃了这个好玩意。</p>
<p>这时候只能自己从0开始搭建项目了。</p>
<h3 id="articleHeader1"><strong>2、在github新建vue2-web项目。</strong></h3>
<p>打开github首页，点击start a project。</p>
<p>接着你会看到Create a new repository，需要你填写项目信息，这个步骤跳过。</p>
<p>然后项目就建好了，clone到本地。</p>
<h3 id="articleHeader2"><strong>3、初始化npm</strong></h3>
<p>用shell或者cmd进入项目根目录，执行下面的命令，选项什么的直接跳过，最后会生成package.json文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<h3 id="articleHeader3"><strong>4、安装webpack</strong></h3>
<p>没有webpack就活不下去的感觉，但是配置webpack也会让人活不下去，太难记住webpack的配置项了，不过别担心，我已经帮你搞定这一步了，咋们都必须使用webpack2啊。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack</code></pre>
<p>还需要前端服务器，做热更新呀，webpack-dev-server登场。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack-<span class="hljs-built_in">dev</span>-server</code></pre>
<h3 id="articleHeader4"><strong>5、创建webpack.config.js文件</strong></h3>
<p>和react中的webpack配置文件没什么区别，只是稍微改动一个地方即可移植过来使用。<br><strong>千万不要把js和vue放到一起</strong>，不起作用的，必须分开，必须，这个坑我已经踩过了，为了找这个坑，浪费了我好几个小时，最最最隐蔽的一个地方。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            include: resolve('src')
        },{
            test: /\.vue$/,
            use: ['vue-loader'],
            exclude: /node_modules/,
            include: resolve('src')
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>rules: [{
            test: <span class="hljs-regexp">/\.js$/</span>,
            use: [<span class="hljs-string">'babel-loader'</span>],
            <span class="hljs-keyword">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-keyword">include</span>: resolve(<span class="hljs-string">'src'</span>)
        },{
            test: <span class="hljs-regexp">/\.vue$/</span>,
            use: [<span class="hljs-string">'vue-loader'</span>],
            <span class="hljs-keyword">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-keyword">include</span>: resolve(<span class="hljs-string">'src'</span>)
        },</code></pre>
<h3 id="articleHeader5"><strong>6、创建.babelrc文件。</strong></h3>
<p>babel少不了，注意这里不是用react了，而是vue，包括下面几个插件，flow-vue、transform-vue-jsx。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;flow-vue&quot;, &quot;stage-0&quot;, &quot;stage-2&quot;],
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;],
  &quot;comments&quot;: false,
  &quot;env&quot;: {
    &quot;production&quot;: {
      &quot;plugins&quot;: [
        [&quot;transform-runtime&quot;, { &quot;polyfill&quot;: false, &quot;regenerator&quot;: false }]
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"flow-vue"</span>, <span class="hljs-string">"stage-0"</span>, <span class="hljs-string">"stage-2"</span>],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>],
  <span class="hljs-attr">"comments"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"production"</span>: {
      <span class="hljs-attr">"plugins"</span>: [
        [<span class="hljs-string">"transform-runtime"</span>, { <span class="hljs-attr">"polyfill"</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">"regenerator"</span>: <span class="hljs-literal">false</span> }]
      ]
    }
  }
}</code></pre>
<h3 id="articleHeader6"><strong>7、在package.json添加start命令</strong></h3>
<p>直接使用webpack-dev-server启动，哇塞，一堆报错，说少了哪个module，这个简单，因为配置文件里面引用的一堆module，还没有安装到项目呢，这时候一个个安装好就行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;webpack-dev-server&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">"<span class="hljs-keyword">start</span><span class="hljs-string">": "</span>webpack-dev-<span class="hljs-keyword">server</span><span class="hljs-string">",</span></code></pre>
<h3 id="articleHeader7"><strong>8、项目入口main.js文件。</strong></h3>
<p>这个文件名自己喜欢咋取就咋取，代码挺简单的，实例化一个Vue和路由，是不是和react的入口文件很像？当然，我做的是SPA，所以采用单入口的形式，如果是非SPA模式，就不是这种配置方式了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import VueResource from 'vue-resource';

Vue.use(VueResource); //http请求注册
Vue.use(VueRouter); //路由注册

// 实例化路由
const router = new VueRouter({
    // mode: 'history', //H5 路由模式，需要服务端做渲染防止404错误
    base: __dirname,
    linkActiveClass: 'on',
    routes
})

let render = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

render;

// if (module.hot) {
//     非必须
//     module.hot.accept('./App.vue', () => render);
// }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>;
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>;

Vue.use(VueResource); <span class="hljs-comment">//http请求注册</span>
Vue.use(VueRouter); <span class="hljs-comment">//路由注册</span>

<span class="hljs-comment">// 实例化路由</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-comment">// mode: 'history', //H5 路由模式，需要服务端做渲染防止404错误</span>
    base: __dirname,
    <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">'on'</span>,
    routes
})

<span class="hljs-keyword">let</span> render = <span class="hljs-keyword">new</span> Vue({
    router,
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});

render;

<span class="hljs-comment">// if (module.hot) {</span>
<span class="hljs-comment">//     非必须</span>
<span class="hljs-comment">//     module.hot.accept('./App.vue', () =&gt; render);</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h3 id="articleHeader8"><strong>9、路由routes.js</strong></h3>
<p>路由和react也非常像（简直一样好不），这里的vue页面采用.vue后缀的方式来写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Home from './components/home/Home.vue';
import Bang from './components/bang/Bang.vue';

export default [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/bang',
        component: Bang
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home/Home.vue'</span>;
<span class="hljs-keyword">import</span> Bang <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/bang/Bang.vue'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
    {
        path: <span class="hljs-string">'/'</span>,
        redirect: <span class="hljs-string">'home'</span>
    },
    {
        path: <span class="hljs-string">'/home'</span>,
        component: Home
    },
    {
        path: <span class="hljs-string">'/bang'</span>,
        component: Bang
    }
]</code></pre>
<h3 id="articleHeader9"><strong>10、单页顶层容器App.vue</strong></h3>
<p>从index进来，就是这个文件，现在开始学习vue的精华。</p>
<p>template：vue的模板语言，也叫作jsx。<br>transition：过渡动画。<br>router-view：路由显示容器，通过router-link跳转加载的.vue会在这个容器渲染。router-link被我封装到nav.vue组件里面了。<br>script：导入了当前顶级容器需要用到的vue组件，包括头部、导航、首页。还有更多丰富的设置我没有研究，后续的学习中会深入下去。<br>style: 当前组件的样式，我配置了less语法支持。将style改成&lt;style lang="less"&gt;即可写less。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <app-header logo=&quot;logo&quot; ></app-header>
        <app-nav></app-nav>
        <transition name=&quot;fade&quot; mode=&quot;out-in&quot;>
            <router-view class=&quot;view&quot;></router-view>
        </transition>
    </div>
</template>

<script>
    import Header from './components/common/Header.vue';
    import Nav from './components/common/Nav.vue';
    import Home from './components/home/Home.vue';
    export default {
        name: 'App',
        components: {
            &quot;app-header&quot;: Header,
            &quot;app-nav&quot;: Nav,
            &quot;app-home&quot;: Home
        }
    };
</script>

<style>
    body, html {
        font-size: 12px;
        margin: 0;
        padding: 0;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">app-header</span> <span class="hljs-attr">logo</span>=<span class="hljs-string">"logo"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">app-nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"out-in"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/common/Header.vue'</span>;
    <span class="hljs-keyword">import</span> Nav <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/common/Nav.vue'</span>;
    <span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home/Home.vue'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">"app-header"</span>: Header,
            <span class="hljs-string">"app-nav"</span>: Nav,
            <span class="hljs-string">"app-home"</span>: Home
        }
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>踩坑的过程中，也遇到了好几个报错情况，最后都圆满解决了。<br>如果你想看更详细的vue组件代码，可以看具体项目：<a href="https://github.com/hyy1115/vue2-web" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/hyy1115/vue2-web" rel="nofollow noreferrer" target="_blank">https://github.com/hyy1115/vu...</a></p>
<p>接下来我会继续完善该项目，探究一个更加灵活的vue架构实现。</p>
<h3 id="articleHeader10">运行效果图:<a href="https://hyy1115.github.io/blog/" rel="nofollow noreferrer" target="_blank">vue-酷我demo</a>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVMsyF?w=321&amp;h=600" src="https://static.alili.tech/img/bVMsyF?w=321&amp;h=600" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<p>下一章：<a href="https://segmentfault.com/a/1190000009143923">vue2封装swiper轮播组件（2）</a></p>
<p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue系列——vue2-webpack2框架搭建之路（1）

## 原文链接
[https://segmentfault.com/a/1190000009127162](https://segmentfault.com/a/1190000009127162)

