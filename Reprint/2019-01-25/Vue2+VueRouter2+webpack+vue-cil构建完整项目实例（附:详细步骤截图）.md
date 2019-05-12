---
title: 'Vue2+VueRouter2+webpack+vue-cil构建完整项目实例（附:详细步骤截图）' 
date: 2019-01-25 2:30:23
hidden: true
slug: q6ns1jv1rl8
categories: [reprint]
---

{{< raw >}}

                    
<p>一、用vue-cil来构建一个项目，先把基本项目跑起来<br>1、新建文件夹目录：<br><span class="img-wrap"><img data-src="/img/bVJ4o5?w=151&amp;h=33" src="https://static.alili.tech/img/bVJ4o5?w=151&amp;h=33" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、打开vueProject文件夹按住shift键右击选择在此处打开命令窗口（cmd）<br><span class="img-wrap"><img data-src="/img/bVJ3qx?w=268&amp;h=86" src="https://static.alili.tech/img/bVJ3qx?w=268&amp;h=86" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3、检测nodejs和npm本版，确认已经安装node环境和npm包管理工具（下载地址：<a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank"></a><a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank">http://nodejs.cn/</a>；）；</p>
<p><span class="img-wrap"><img data-src="/img/bVJ3r3?w=342&amp;h=182" src="https://static.alili.tech/img/bVJ3r3?w=342&amp;h=182" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>4、首先，需要安装vue-cil，命令如下：（vue-cil是vue的脚手架工具）</p>
<p>$ npm install -g vue-cli</p>
<p><span class="img-wrap"><img data-src="/img/bVJ3vT?w=677&amp;h=442" src="https://static.alili.tech/img/bVJ3vT?w=677&amp;h=442" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>5、新建一个自己的vue项目，如vuedemo项目名（输入这个命令之后，会出现一些提示，是什么不用管，一直按回车即可。）</p>
<p>$ vue init webpack vuedemo</p>
<p><span class="img-wrap"><img data-src="/img/bVJ3yc?w=987&amp;h=410" src="https://static.alili.tech/img/bVJ3yc?w=987&amp;h=410" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>6、进入新建的vuedemo目录，命令如下：<br>$ cd vuedemo<br><span class="img-wrap"><img data-src="/img/bVJ3zx?w=306&amp;h=54" src="https://static.alili.tech/img/bVJ3zx?w=306&amp;h=54" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>7、安装依赖（需要等待一段时间，如果长时间没有响应，就ctrl+c停止掉，然后再执行一次即可）</p>
<p>$ npm install</p>
<p><span class="img-wrap"><img data-src="/img/bVJ3Ea?w=361&amp;h=444" src="https://static.alili.tech/img/bVJ3Ea?w=361&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>8、把项目跑起来，在运行了npm run dev之后，会自动打开一个浏览器窗口，就可以看到实际的效果了。</p>
<p>$ npm run dev</p>
<p><span class="img-wrap"><img data-src="/img/bVJ3DO?w=1038&amp;h=508" src="https://static.alili.tech/img/bVJ3DO?w=1038&amp;h=508" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>二、根据实际项目改造目录，以及路由配置<br>1、编辑器打开vuedemo项目（红色波浪线是编辑器不识别新的语法，忽略）<br>src文件：（我们的开发目录，基本上绝大多数工作都是在这里开展的，这里我只说src文件）<br>//commponents目录里面放了一个演示的组件文件。</p>
<p>//router文件放路由配置文件；</p>
<p>//App.vue是项目入口文件。</p>
<p>//main.js这是项目的核心文件。全局的配置都在这个文件里面配置。</p>
<p><span class="img-wrap"><img data-src="/img/bVJ3Kd?w=241&amp;h=519" src="https://static.alili.tech/img/bVJ3Kd?w=241&amp;h=519" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、整理后的文件目录：</p>
<p><span class="img-wrap"><img data-src="/img/bVJ4e9?w=236&amp;h=364" src="https://static.alili.tech/img/bVJ4e9?w=236&amp;h=364" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>新增pages目录，放详情页面，如下：<br>firstPage.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;firstP&quot;>
    firstPage
  </div>
</template>
<style>
    .firstP{
      color:red;
    }
</style>
<script>

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"firstP"</span>&gt;</span>
    firstPage
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.firstP</span>{
      <span class="hljs-attribute">color</span>:red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>secondPage.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;secondP&quot;>
        secondPage
    </div>
</template>
<style>
    .secondP{
      color:blue;
    }
</style>
<script>

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"secondP"</span>&gt;</span>
        secondPage
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.secondP</span>{
      <span class="hljs-attribute">color</span>:blue;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>router文件下index.js文件可屏蔽掉，新增routes.js文件代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import firstPage from '../pages/firstPage'
import secondPage from '../pages/secondPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/first',
      name: 'first',
      component: firstPage
    },
    {
      path: '/second',
      name: 'second',
      component: secondPage
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Hello'</span>
<span class="hljs-keyword">import</span> firstPage <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/firstPage'</span>
<span class="hljs-keyword">import</span> secondPage <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/secondPage'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Hello'</span>,
      component: Hello
    },
    {
      path: <span class="hljs-string">'/first'</span>,
      name: <span class="hljs-string">'first'</span>,
      component: firstPage
    },
    {
      path: <span class="hljs-string">'/second'</span>,
      name: <span class="hljs-string">'second'</span>,
      component: secondPage
    }
  ]
})</code></pre>
<p>App.vue文件修改代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <div class=&quot;nav-list&quot;>
      <router-link class=&quot;nav-item&quot; to=&quot;/&quot;>index</router-link>
      <router-link class=&quot;nav-item&quot; to=&quot;/first&quot;>页面一</router-link>
      <router-link class=&quot;nav-item&quot; to=&quot;/second&quot;>页面二</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-item"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>index<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-item"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/first"</span>&gt;</span>页面一<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-item"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/second"</span>&gt;</span>页面二<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>main.js 文件修改代码如下：<br>注意：变动部分为引入路由配置文件路径：</p>
<p><span class="img-wrap"><img data-src="/img/bVJ4hZ?w=362&amp;h=31" src="https://static.alili.tech/img/bVJ4hZ?w=362&amp;h=31" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import router from './router/routes.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/routes.js'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})
</code></pre>
<p>ok，效果截图：</p>
<p><span class="img-wrap"><img data-src="/img/bVJ4iv?w=939&amp;h=615" src="https://static.alili.tech/img/bVJ4iv?w=939&amp;h=615" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVJ4iO?w=859&amp;h=397" src="https://static.alili.tech/img/bVJ4iO?w=859&amp;h=397" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVJ4iS?w=867&amp;h=415" src="https://static.alili.tech/img/bVJ4iS?w=867&amp;h=415" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>希望小伙伴们可以一次跑通项目流程</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2+VueRouter2+webpack+vue-cil构建完整项目实例（附:详细步骤截图）

## 原文链接
[https://segmentfault.com/a/1190000008557578](https://segmentfault.com/a/1190000008557578)

