---
title: 'vue.js路由vue-router（一）——简单路由基础' 
date: 2019-01-14 2:30:07
hidden: true
slug: i5w5aqy1td
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>vue.js除了拥有组件开发体系之外，还有自己的路由vue-router。在没有使用路由之前，我们页面的跳转要么是后台进行管控，要么是用a标签写链接。使用vue-router后，我们可以自己定义组件路由之间的跳转，还可以设置稍复杂的嵌套路由，创建真正的spa（单页面应用）。我之前用vue-cli脚手架写了一个简单的<a href="http://www.jianshu.com/p/5d9b341d650f" rel="nofollow noreferrer" target="_blank">人员管理实例</a>，现在我们不用脚手架，就用原生的vue来写，本文也主要是通过实例来讲解vue.js+vue-router相关知识。</p>
<h1 id="articleHeader1">简单路由跳转实例</h1>
<h2 id="articleHeader2">1.起步</h2>
<p>下载<a href="https://unpkg.com/vue-router@2.5.3/dist/vue-router.js" rel="nofollow noreferrer" target="_blank">vue-router.js</a>，新建项目文件夹命名为router，将下载的vue-router.js放在router/js/路径下。新建index.html作为主页，引入样式文件，引入两个关键的js，vue和vue-router，再在body标签底部引入一个main.js用来写vue实例及配置路由，注意引用顺序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>首页</title>
    <link rel=&quot;stylesheet&quot; href=&quot;css/main.css&quot;>
    <script src=&quot;js/vue.js&quot;></script>
    <script src=&quot;js/vue-router.js&quot;></script>
</head>
<body>
     <div id=&quot;app&quot;></div>
     <template></template> //组件区域
     <script src=&quot;js/main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/main.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span> //组件区域
     <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader3">2.定义路由视图</h2>
<p>调用foot-nav组件，将底部导航组件引入在这里，是因为两个路由页面都要用到它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <router-view></router-view>
    <foot-nav></foot-nav>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">foot-nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">foot-nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader4">知识点:：&lt;router-view&gt;</h3>
<p>&lt;router-view&gt;标签相当于一个插槽，用于将匹配到的组件渲染出来，一个个路由定义的组件相当于卡，跳转某个路由时，该路由下的页面就插在这个插槽中渲染显示。<br>一个组件可以有多个&lt;router-view&gt;视图，并用name值去区分它们，这种多用在网页布局方面，如上左主结构，这个时候就可以定义三个&lt;router-view&gt;<br><strong>示例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <router-view name=&quot;top&quot;></router-view>
    <router-view name=&quot;left&quot;></router-view>
    <router-view name=&quot;main&quot;></router-view>
</div>

<script>
    var topCom = Vue.extend({
        template: '<div>顶部</div>'
    })

    var leftCom = Vue.extend({
        template: '<div>侧边栏</div>'
    })

    var mainCom = Vue.extend({
        template: '<div>主页</div>'
    })

    var router = new VueRouter({
        routes:[
            {
                path: '/',
                name: 'home',
                components:{
                    top: topCom,
                    left: leftCom,
                    main: mainCom
                }
            }
        ]
    })

    var app = new Vue({
        el: '#app',
        router
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"main"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> topCom = Vue.extend({
        template: <span class="hljs-string">'&lt;div&gt;顶部&lt;/div&gt;'</span>
    })

    <span class="hljs-keyword">var</span> leftCom = Vue.extend({
        template: <span class="hljs-string">'&lt;div&gt;侧边栏&lt;/div&gt;'</span>
    })

    <span class="hljs-keyword">var</span> mainCom = Vue.extend({
        template: <span class="hljs-string">'&lt;div&gt;主页&lt;/div&gt;'</span>
    })

    <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
        routes:[
            {
                path: <span class="hljs-string">'/'</span>,
                name: <span class="hljs-string">'home'</span>,
                components:{
                    top: topCom,
                    left: leftCom,
                    main: mainCom
                }
            }
        ]
    })

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        router
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>再为各个板块设置一下样式，打开浏览器查看效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009350682?w=1006&amp;h=617" src="https://static.alili.tech/img/remote/1460000009350682?w=1006&amp;h=617" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">3.子组件（底部导航）</h2>
<h3 id="articleHeader6">3.1 创建子组件</h3>
<p>人员管理系统分为两个模块，一个首页，一个管理页，两个页面都需引入一个公共组件：底部导航。在首页index.html中加入以下模板</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;footer&quot;>
    <div class=&quot;footer fixed&quot;>
        <ul>
            <li><router-link to=&quot;/&quot;>首页</router-link></li>
            <li><router-link :to=&quot;{name:'manage',params:{id:1"}}"&quot;>人员管理</router-link></li>
        </ul>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"footer"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer fixed"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'manage',params:{id:1}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span>&gt;</span>人员管理<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<h3 id="articleHeader7">知识点:：&lt;router-link&gt;</h3>
<p>&lt;router-link&gt;标签主要实现跳转链接功能，属性to='/'即是跳转到path为'/'的路径（我们等会得配置路径为'/'和'/manage'的路由）<br>router-link除了可以跳转链接之外，还可以传参，可以传多个参数，一般格式为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;路由路径&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"路由路径"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{ path:路由路径}&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{ path:路由路径}"</span>&gt;&lt;/router-link&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{name:'路由命名',params:{参数名:参数值,参数名:参数值"}}"&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{name:'路由命名',params:{参数名:参数值,参数名:参数值"}}""</span>&gt;&lt;/router-link&gt;</span></code></pre>
<h3 id="articleHeader8">知识点：this.$router.push</h3>
<p>如果不想用&lt;router-link&gt;标签，也可以给需要跳转的地方添加一个点击事件，在事件里写this.$router.push方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.push('路由路径')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$router.<span class="hljs-keyword">push</span>(<span class="hljs-string">'路由路径'</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.push({name:'路由命名',params:{参数名:参数值,参数名:参数值"}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$router.push({<span class="hljs-string">name:</span><span class="hljs-string">'路由命名'</span>,<span class="hljs-string">params:</span>{参数名:参数值,参数名:参数值"}}")</code></pre>
<h3 id="articleHeader9">3.2 注册子组件</h3>
<p>在main.js中全局注册子组件并且定义vue实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('foot-nav',{
    template: '#footer'
})

var app = new Vue({
    el: '#app'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>Vue.component(<span class="hljs-string">'foot-nav'</span>,{
    template: <span class="hljs-type"></span>'<span class="hljs-meta">#footer'</span>
})

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el: <span class="hljs-type"></span>'<span class="hljs-meta">#app'</span>
})</code></pre>
<h2 id="articleHeader10">4.首页及管理页组件</h2>
<h3 id="articleHeader11">4.1 创建首页及管理页</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;index&quot;>
    <div>
        首页
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"index"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        首页
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;manage&quot;>
    <div>
        人员管理
        <p>id:"{{"id"}}"</p>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"manage"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        人员管理
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>id:</span><span class="hljs-template-variable">"{{"id"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<h3 id="articleHeader12">4.2 注册主页及管理页</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Home = Vue.extend({
    template: '#index'
})

var Manage = Vue.extend({
    template: '#manage',
    data(){
        return{
            id: ''
        }
    },
    mounted:function(){
        this.id = this.$route.params.id
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> Home = Vue.extend({
    template: <span class="hljs-string">'#index'</span>
})

<span class="hljs-selector-tag">var</span> Manage = Vue.extend({
    template: <span class="hljs-string">'#manage'</span>,
    data(){
        return{
            id: <span class="hljs-string">''</span>
        }
    },
    mounted:function(){
        this<span class="hljs-selector-class">.id</span> = this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.id</span>
    }
})</code></pre>
<h3 id="articleHeader13">知识点：this.$route.params</h3>
<p>this.$route指向vue实例的路由，params是路由传过来的参数集合</p>
<h2 id="articleHeader14">5.定义路由</h2>
<p>定义路由router，并引进vue实例中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
    routes:[
        {
            path:'/',
            name: 'home',
            component:Home
        },
        {
            path:'/manage/:id',
            name: 'manage',
            component:Manage
        }
    ]
})

var app = new Vue({
    el: '#app',
    router
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var router = <span class="hljs-keyword">new</span> VueRouter({
    route<span class="hljs-variable">s:</span>[
        {
            path:<span class="hljs-string">'/'</span>,
            name: <span class="hljs-string">'home'</span>,
            componen<span class="hljs-variable">t:Home</span>
        },
        {
            path:<span class="hljs-string">'/manage/:id'</span>,
            name: <span class="hljs-string">'manage'</span>,
            componen<span class="hljs-variable">t:Manage</span>
        }
    ]
})

var app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
    router
})</code></pre>
<h3 id="articleHeader15">知识点：path:'/路径/:参数名'</h3>
<p>一个路由要传参时，需在path路径后面添加一个‘/’并加上冒号和参数名</p>
<h3 id="articleHeader16">知识点：路由激活class</h3>
<p>vue-router当路由处于激活状态时，会有一个class类“router-link-exact-active”，我们只需为这个类添加样式就可以实现路由激活状态下的样式编写<br>接下来去浏览器查看路由跳转效果<br><span class="img-wrap"><img data-src="/img/remote/1460000009350683?w=422&amp;h=631" src="https://static.alili.tech/img/remote/1460000009350683?w=422&amp;h=631" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader17">6.嵌套路由</h2>
<p>有时我们项目由多层嵌套组件组成，这个时候就需要用到嵌套路由<br>先看下图例子，我们给manage路由再添加两个子路由<br><span class="img-wrap"><img data-src="/img/remote/1460000009350684?w=443&amp;h=497" src="https://static.alili.tech/img/remote/1460000009350684?w=443&amp;h=497" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">6.1 在组件内部添加&lt;router-view&gt;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;manage&quot;>
    <div>
        人员管理
        <ul>
            <li><router-link to=&quot;/manage/list&quot;>人员列表</router-link></li>
            <li><router-link to=&quot;/manage/edit&quot;>编辑</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"manage"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        人员管理
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/manage/list"</span>&gt;</span>人员列表<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/manage/edit"</span>&gt;</span>编辑<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader19">6.2 定义子路由</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构建组件
var List = Vue.extend({
    template: '<div>人员列表</div>'
})

var Edit = Vue.extend({
    template: '<div>编辑</div>'
})



var router = new VueRouter({
    routes:[
        {
            path:'/',
            name: 'home',
            component:Home
        },
        {
            path:'/manage',
            name: 'manage',
            component:Manage,
        //子路由由children表示
            children:[
                {
                    path:'list',
                    name: 'list',
                    component:List
                },
                {
                    path:'edit',
                    name: 'edit',
                    component:Edit
                }
            ]
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-comment">//构建组件</span>
var List = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;人员列表&lt;/div&gt;'</span>
})

var Edit = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;编辑&lt;/div&gt;'</span>
})



var router = new VueRouter({
    routes:[
        {
            <span class="hljs-built_in">path</span>:<span class="hljs-string">'/'</span>,
            <span class="hljs-keyword">name</span>: <span class="hljs-string">'home'</span>,
            component:Home
        },
        {
            <span class="hljs-built_in">path</span>:<span class="hljs-string">'/manage'</span>,
            <span class="hljs-keyword">name</span>: <span class="hljs-string">'manage'</span>,
            component:Manage,
        <span class="hljs-comment">//子路由由children表示</span>
            children:[
                {
                    <span class="hljs-built_in">path</span>:<span class="hljs-string">'list'</span>,
                    <span class="hljs-keyword">name</span>: <span class="hljs-string">'list'</span>,
                    component:List
                },
                {
                    <span class="hljs-built_in">path</span>:<span class="hljs-string">'edit'</span>,
                    <span class="hljs-keyword">name</span>: <span class="hljs-string">'edit'</span>,
                    component:Edit
                }
            ]
        }
    ]
})</code></pre>
<h2 id="articleHeader20">7.路由重定向</h2>
<p>未设置路由重定向时，当我们随意输入一个路径，会显示一片空白或404。为了防止这种现象发生，我们一般在配置路由时再定义一个重定向路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
    routes:[
        {
            path:'/',
            name: 'home',
            component:Home
        },
        {
            path:'*',
            redirect: '/'
        },
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var router = <span class="hljs-keyword">new</span> VueRouter({
    route<span class="hljs-variable">s:</span>[
        {
            path:<span class="hljs-string">'/'</span>,
            name: <span class="hljs-string">'home'</span>,
            componen<span class="hljs-variable">t:Home</span>
        },
        {
            path:<span class="hljs-string">'*'</span>,
            redirec<span class="hljs-variable">t:</span> <span class="hljs-string">'/'</span>
        },
    ]
})</code></pre>
<p>打开浏览器，随意输入一个未定义的路由查看效果<br><span class="img-wrap"><img data-src="/img/remote/1460000009350685?w=443&amp;h=632" src="https://static.alili.tech/img/remote/1460000009350685?w=443&amp;h=632" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js路由vue-router（一）——简单路由基础

## 原文链接
[https://segmentfault.com/a/1190000009350679](https://segmentfault.com/a/1190000009350679)

