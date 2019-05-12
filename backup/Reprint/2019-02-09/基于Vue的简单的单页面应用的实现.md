---
title: '基于Vue的简单的单页面应用的实现' 
date: 2019-02-09 2:30:58
hidden: true
slug: xdggjbrqtk
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="http://mrzhang123.github.io/2016/06/08/vue-demo-1/" rel="nofollow noreferrer" target="_blank">http://mrzhang123.github.io/2016/06/08/vue-demo-1/</a></p>
<h3 id="articleHeader0">本文基于<code>vue1.x</code>
</h3>
<h3 id="articleHeader1">基于<code>vue2.x&amp;webpack2.x</code>请移步至</h3>
<p><a href="https://segmentfault.com/a/1190000008279436">Vue2.x踩坑与总结</a><br><a href="https://segmentfault.com/a/1190000008279459" target="_blank">Webpack2.x踩坑与总结</a></p>
<h2 id="articleHeader2">基于Vue的简单的单页面应用</h2>
<p>在对Vue和webpack有了一定了解后，我们就可以开始利用所了解的东西做一个简单的webapp了，不了解的同学可以看下我的前两篇关于vue和webpack的基本应用：<br><a href="https://segmentfault.com/a/1190000005614864">webpack+vue起步</a><br><a href="https://segmentfault.com/a/1190000005616974" target="_blank">利用webpack和vue实现组件化</a></p>
<h2 id="articleHeader3">构建项目</h2>
<p>首先创建各个组件，我的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//没有后缀名的都是文件夹
|-wechat
    |-dist
    |-src
    |  |-components         //存放vue组件
    |  |    |-tab           //存放home.vue中的tab，动态切换的模板
    |  |    |    |-tab_1.vue
    |  |    |    |-tab_2.vue
    |  |    |-home.vue      //app的首页
    |  |    |-list.vue      //点击home中的链接跳转到
    |  |    |-detail.vue    //点击list中的链接跳转到
    |  |-app.vue            //主要的vue文件(用于将各个组件的挂载)
    |  |-main.js            //主要的js(用于配置路由)    
    |-static                //存放静态资源
    |-index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//没有后缀名的都是文件夹</span>
|-wechat
    |-dist
    |-src
    |  |-components         <span class="hljs-comment">//存放vue组件</span>
    |  |    |-tab           <span class="hljs-comment">//存放home.vue中的tab，动态切换的模板</span>
    |  |    |    |-tab_1.vue
    |  |    |    |-tab_2.vue
    |  |    |-home.vue      <span class="hljs-comment">//app的首页</span>
    |  |    |-list.vue      <span class="hljs-comment">//点击home中的链接跳转到</span>
    |  |    |-detail.vue    <span class="hljs-comment">//点击list中的链接跳转到</span>
    |  |-app.vue            <span class="hljs-comment">//主要的vue文件(用于将各个组件的挂载)</span>
    |  |-main.js            <span class="hljs-comment">//主要的js(用于配置路由)    </span>
    |-<span class="hljs-keyword">static</span>                <span class="hljs-comment">//存放静态资源</span>
    |-index.html</code></pre>
<h2 id="articleHeader4">配置路由</h2>
<p>首先在我们的项目中安装vue-router</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install vue-router</code></pre>
<p>引入各个组件并配置路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js

import Vue from 'vue';
import VueRouter from 'vue-router';
//引入组件
import App from './app.vue';
import home from './components/home.vue';
import list from './components/list.vue';
import detail from './components/detail.vue';

Vue.use(VueRouter);

var app=Vue.extend(App);

var router=new VueRouter();

//配置路由
router.map({
  '/home': {
    component: home
  },
  '/list': {
    component: list    
  },
  '/detail': {
    component: detail
  }
});
//设置默认情况下打开的页面
router.redirect({
  '/':'home'
});
router.start(app,'#app');
//暴露路由接口调试
window.router = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//main.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-comment">//引入组件</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.vue'</span>;
<span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home.vue'</span>;
<span class="hljs-keyword">import</span> list <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/list.vue'</span>;
<span class="hljs-keyword">import</span> detail <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/detail.vue'</span>;

Vue.use(VueRouter);

<span class="hljs-keyword">var</span> app=Vue.extend(App);

<span class="hljs-keyword">var</span> router=<span class="hljs-keyword">new</span> VueRouter();

<span class="hljs-comment">//配置路由</span>
router.map({
  <span class="hljs-string">'/home'</span>: {
    <span class="hljs-attr">component</span>: home
  },
  <span class="hljs-string">'/list'</span>: {
    <span class="hljs-attr">component</span>: list    
  },
  <span class="hljs-string">'/detail'</span>: {
    <span class="hljs-attr">component</span>: detail
  }
});
<span class="hljs-comment">//设置默认情况下打开的页面</span>
router.redirect({
  <span class="hljs-string">'/'</span>:<span class="hljs-string">'home'</span>
});
router.start(app,<span class="hljs-string">'#app'</span>);
<span class="hljs-comment">//暴露路由接口调试</span>
<span class="hljs-built_in">window</span>.router = router;</code></pre>
<p>关于vue-router的介绍，官方文档介绍很清楚，地址：<a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn/index.html</a>。<br>配置好路由后，需要将匹配好的组件正确的渲染到页面中，此时用到<code>&lt;router-view&gt;&lt;/router-view&gt;</code>，它基于Vue的动态组件系统，所以它会继承一个正常动态组件的很多特性。在这里我们用到两个：</p>
<ul>
<li><p><code>v-transition</code>和<code>transition-mode</code>的完整支持，为了切换效果能正常工作，路由组件必须不是一个<a href="http://vuejs.org/guide/components.html#Fragment_Instance" rel="nofollow noreferrer" target="_blank">片段实例</a>。</p></li>
<li><p>在路由的0.7.2+中支持<code>keep-alive</code>（<a href="https://vuejs.org.cn/guide/components.html#keep-alive" rel="nofollow noreferrer" target="_blank">关于keep-alive</a>）</p></li>
</ul>
<p>所以在app.vue写入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;main&quot;>
        <router-view
          keep-alive
          transition=&quot;fade&quot;
          transition-mode='out-in'></router-view>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>
          <span class="hljs-attr">keep-alive</span>
          <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>
          <span class="hljs-attr">transition-mode</span>=<span class="hljs-string">'out-in'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>打开命令行启动webpack-dev-server：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$ webpack-dev-server --inline --hot</code></pre>
<p>此时我们在页面中看到的页面就是home.vue</p>
<h2 id="articleHeader5">在home.vue中实现tab切换</h2>
<p>tab切换作为一个常见的效果，出现的频率很高，那么如何用vuejs写一个tab切换效果呢？<br>利用当前被点击的tab是第几个，从而动态的切换相应的动态组件是vuejs实现切换的一种方式。动态组件的介绍如下：<a href="https://vuejs.org.cn/guide/components.html#" rel="nofollow noreferrer" target="_blank">https://vuejs.org.cn/guide/components.html#动态组件</a>。所以实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;home&quot;>
    <div class=&quot;bd&quot; style=&quot;height: 100%;&quot;>
        <div class=&quot;weui_tab&quot;>
            <ul class=&quot;weui_navbar&quot;>
                <li class=&quot;weui_navbar_item&quot;
                    v-for=&quot;tab in tabs&quot;
                    :class=&quot;{'weui_bar_item_on':$index===selected}&quot;
                    @click=&quot;choose($index)&quot;>"{{"tab.tabName"}}"</li>
            </ul>
            <div class=&quot;weui_tab_bd&quot;>
                <component :is=&quot;currentView&quot; transition=&quot;fade&quot; transition-mode=&quot;out-in&quot;></component>
            </div>
        </div>
    </div>      
</div>
</template>
<script>
import  tab_1 from './tab/tab_1.vue';
import  tab_2 from './tab/tab_2.vue';
export default{
    data(){
        return{
            tabs:[
                {tabName:'Vuejs'},
                {tabName:'VueTab'}
            ],
            selected:0,
            currentView:'view_0'
        }
    },
    components:{
        'view_0':tab_1,
        'view_1':tab_2
    },
    methods:{
        choose(index) {
            this.selected=index;
            this.currentView='view_'+index;
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"home"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bd"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: 100%;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui_tab"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui_navbar"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui_navbar_item"</span>
                    <span class="hljs-attr">v-for</span>=<span class="hljs-string">"tab in tabs"</span>
                    <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'weui_bar_item_on':$index===selected}"</span>
                    @<span class="hljs-attr">click</span>=<span class="hljs-string">"choose($index)"</span>&gt;</span>"{{"tab.tabName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui_tab_bd"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span> <span class="hljs-attr">transition-mode</span>=<span class="hljs-string">"out-in"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>      
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span>  tab_1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./tab/tab_1.vue'</span>;
<span class="hljs-keyword">import</span>  tab_2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./tab/tab_2.vue'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">tabs</span>:[
                {<span class="hljs-attr">tabName</span>:<span class="hljs-string">'Vuejs'</span>},
                {<span class="hljs-attr">tabName</span>:<span class="hljs-string">'VueTab'</span>}
            ],
            <span class="hljs-attr">selected</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">currentView</span>:<span class="hljs-string">'view_0'</span>
        }
    },
    <span class="hljs-attr">components</span>:{
        <span class="hljs-string">'view_0'</span>:tab_1,
        <span class="hljs-string">'view_1'</span>:tab_2
    },
    <span class="hljs-attr">methods</span>:{
        choose(index) {
            <span class="hljs-keyword">this</span>.selected=index;
            <span class="hljs-keyword">this</span>.currentView=<span class="hljs-string">'view_'</span>+index;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>两个动态组件为tab_1.vue和tab_2.vue。引入这两个模块，对外输出对组件的操作<code>export default{}</code>，在<code>template</code>模板中将动态组件加载进去，使用保留的<code>&lt;component&gt;</code>元素，动态地绑定它的<code>is</code>特性，从而根据不同的值动态的切换组件，在需要点击的tab导航上，需要<code>v-for</code>循环出两个导航，然后动态绑定class，根据当前点击的tab导航<code>$index</code>动态的切换class名<code>:class="{'weui_bar_item_on':$index===selected}"</code>，然后给<code>li</code>绑定click事件，从而让其在被点击时执行事件<code>@click="choose($index)"</code>。<br>由于默认情况下显示第一个组件且第一个<code>tab</code>变灰，所以在<code>data</code>设置默认值。为了切换有过渡，添加了<code>transition="fade" transition-mode="out-in"</code>并在css中设置动画的执行过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*切换动画*/
.fade-transition {
    transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave {
    opacity: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*切换动画*/</span>
<span class="hljs-selector-class">.fade-transition</span> {
    <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">0.3s</span> ease;
}
<span class="hljs-selector-class">.fade-enter</span>,
<span class="hljs-selector-class">.fade-leave</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}</code></pre>
<h2 id="articleHeader6">利用<code>v-link</code>实现路由链接</h2>
<p>在组件中，用到了路由，在给<code>a</code>写路由链接时候要使用<code>v-link</code>而不是<code>href</code>。在带有<code>v-link</code>指令的元素，如果<code>v-link</code>对应的URL匹配当前路径，则该元素会被添加一个特定的class，默认为<code>.v-link-active</code>，这个默认值，我们可以通过在创建路由时指定<code>linkActiveClass</code>全局选项来自定义，也可以通过<code>activeClass</code>内联选项来单独制定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-link=&quot;{path:'/a',activeClass:'active'}&quot;>test</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{path:'/a',activeClass:'active'}"</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h2 id="articleHeader7">遇到的一些问题</h2>
<h3 id="articleHeader8">1.<code>v-for</code>循环插入图片</h3>
<p>在写循环插入图片的时候，写的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bio-slide&quot; v-for=&quot;item in items&quot;>   
    <img src=&quot;"{{"item.image"}}"&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bio-slide"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>   
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""{{"item.image"}}""</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>此时在控制台会出现警告<br><code>[Vue Warn]: src=""{{"item.image"}}"": interpolation in "src" attribute will cause a 404 request. Use v-bind:src instead.</code><br>这里意思是<code>在src属性插值将导致404请求。使用v-绑定：src代替。</code><br>所以替换成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bio-slide&quot; v-for=&quot;item in items&quot;>   
    <img v-bind:src=&quot;item.image&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bio-slide"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>   
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-bind:src</span>=<span class="hljs-string">"item.image"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这里需要主要，v-bind在写的时候不建议再用双花括号"{{""}}"，根据官方的说法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-bind:href=&quot;url&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-bind:href</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>这里<code> href </code>是参数，它告诉 <code>v-bind </code>指令将元素的 <code>href </code>特性跟表达式 url 的值绑定。可能你已注意到可以用特性插值<code> href=""{{"url"}}""</code> 获得同样的结果：这样没错，并且实际上在内部特性插值会转为<code> v-bind</code> 绑定。</p>
<h3 id="articleHeader9">2.<code>v-model</code>的使用</h3>
<p><code>v-model</code>用于在表单上创建双向绑定，只能用于<code>&lt;input&gt;</code>、<code>&lt;select&gt;</code>、<code>&lt;textarea&gt;</code>，如果用在其他元素中，则会在产生警告。</p>
<h3 id="articleHeader10">3.如何让组件的CSS样式只在组件中起作用</h3>
<p>在每一个vue组件中都可以定义各自的css，js，如果想写的css只对当前组件起作用，则在<code>style</code>中写入<code>scoped</code>，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped></style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">scoped</span>&gt;&lt;/<span class="hljs-selector-tag">style</span>&gt;</code></pre>
<p>这样就完成了一个简单的基于Vue+webpack+vue-router的单页面应用，具体实现代码见github:<a href="https://github.com/MrZhang123/Vue_project/tree/master/vue1.x" rel="nofollow noreferrer" target="_blank">https://github.com/MrZhang123...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue的简单的单页面应用的实现

## 原文链接
[https://segmentfault.com/a/1190000005667546](https://segmentfault.com/a/1190000005667546)

