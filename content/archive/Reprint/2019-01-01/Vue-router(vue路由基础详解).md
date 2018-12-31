---
title: 'Vue-router(vue路由基础详解)' 
date: 2019-01-01 2:30:07
hidden: true
slug: 5auw9v3zf7t
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue.js路由(Vue-router)</h1>
<h2 id="articleHeader1">安装</h2>
<h3 id="articleHeader2">直接引入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;vue.js&quot;></script>
<script src=&quot;vue-router.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script src=<span class="hljs-string">"vue.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"vue-router.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>vue-router下载链接<br><a href="https://unpkg.com/vue-router/dist/vue-router.js" rel="nofollow noreferrer" target="_blank">https://unpkg.com/vue-router/...</a></p>
<h3 id="articleHeader3">npm下载</h3>
<blockquote><p>npm install vue-router</p></blockquote>
<p>如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：<br>在你的文件夹下的 src 文件夹下的 main.js 文件内写入以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

Vue.use(VueRouter)</code></pre>
<h2 id="articleHeader4">开始</h2>
<p>引入Vue和VueRouter插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;vue.js&quot;></script>
<script src=&quot;vue-router.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>书写html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;> 

</div>
<!--定义模版-->
<template id=&quot;a&quot;>
    <div>
        第一个router
    </div>
</template>
<template id=&quot;b&quot;>
    <div>
        第二个router
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span> 

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--定义模版--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"a"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        第一个router
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"b"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        第二个router
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>书写js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var routes = [
    {
        path:&quot;/one&quot;,

        component:{template:&quot;#a&quot;}
    },
    {
        path:&quot;/two&quot;,
        component:{template:&quot;#b&quot;}
    },
];
// 定义路由组件
var router = new VueRouter({
    routes
});
// 定义路由
new Vue({
    el:&quot;#box&quot;,
    router
});
// 创建和挂载实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> routes = [
    {
        <span class="hljs-attr">path</span>:<span class="hljs-string">"/one"</span>,

        <span class="hljs-attr">component</span>:{<span class="hljs-attr">template</span>:<span class="hljs-string">"#a"</span>}
    },
    {
        <span class="hljs-attr">path</span>:<span class="hljs-string">"/two"</span>,
        <span class="hljs-attr">component</span>:{<span class="hljs-attr">template</span>:<span class="hljs-string">"#b"</span>}
    },
];
<span class="hljs-comment">// 定义路由组件</span>
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    routes
});
<span class="hljs-comment">// 定义路由</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">"#box"</span>,
    router
});
<span class="hljs-comment">// 创建和挂载实例</span></code></pre>
<p>将模版增添链接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;> 
    <router-link to=&quot;/one&quot;>One</router-link>
    <router-link to=&quot;/two&quot;>Two</router-link>
    <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/one"</span>&gt;</span>One<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/two"</span>&gt;</span>Two<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<blockquote>
<p>&lt; router-link &gt; 默认会被渲染成一个 <code>&lt;a&gt;</code> 标签 &gt;&gt;&gt;to=""为我们定义的路由</p>
<p>&lt; router-view &gt; 路由匹配到的组件将渲染在这里</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011123093" src="https://static.alili.tech/img/remote/1460000011123093" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">动态路由匹配</h2>
<p>我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』（dynamic segment）来达到这个效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path:&quot;/two:id&quot;,
    component:{template:&quot;#b&quot;},
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">path</span>:<span class="hljs-string">"/two:id"</span>,
    <span class="hljs-attr">component</span>:{<span class="hljs-attr">template</span>:<span class="hljs-string">"#b"</span>},
},</code></pre>
<p>当我们在地址后面直接添加任意字符,我们会发现文档内容随着我们的更改而改变.</p>
<h2 id="articleHeader6">嵌套路由</h2>
<p>我们经常将动态路由和嵌套路由共同使用,嵌套路由即是在原路由的基础上增加一个 children ,children 是一个数组.并且我们还需要在原来的组件上添加&lt; router-view &gt;来渲染 chlidren 里面的路由.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;b&quot;>
    <div>
        第二个router
        <router-view>
                
        </router-view> 
    </div>
</template>
<template id=&quot;c&quot;>
    <div>
        user:"{{" $route.params.id "}}"
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"b"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        第二个router
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span>
                
        <span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span> 
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"c"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        user:"{{" $route.params.id "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path:&quot;/two&quot;,
    component:{template:&quot;#b&quot;},
    children:[
        {
            path:&quot;:id&quot;,
            component:{
                template:&quot;#c&quot;
            }
        }
    ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">path</span>:<span class="hljs-string">"/two"</span>,
    <span class="hljs-attr">component</span>:{<span class="hljs-attr">template</span>:<span class="hljs-string">"#b"</span>},
    <span class="hljs-attr">children</span>:[
        {
            <span class="hljs-attr">path</span>:<span class="hljs-string">":id"</span>,
            <span class="hljs-attr">component</span>:{
                <span class="hljs-attr">template</span>:<span class="hljs-string">"#c"</span>
            }
        }
    ]
},</code></pre>
<p>这样我们就可以这样添加地址<br><span class="img-wrap"><img data-src="/img/remote/1460000011123092" src="https://static.alili.tech/img/remote/1460000011123092" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">编程式导航</h2>
<p>除了使用 &lt;router-link&gt; 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。</p>
<blockquote><p>router.push(location)</p></blockquote>
<p>想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。</p>
<p>当你点击 &lt;router-link&gt; 时，这个方法会在内部调用，所以说，点击 &lt;router-link :to="..."&gt; 等同于调用 router.push(...)。</p>
<p>该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 "}}")

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' "}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 字符串</span>
router.push(<span class="hljs-string">'home'</span>)

<span class="hljs-comment">// 对象</span>
router.push({ <span class="hljs-attr">path</span>: <span class="hljs-string">'home'</span> })

<span class="hljs-comment">// 命名的路由</span>
router.push({ <span class="hljs-attr">name</span>: <span class="hljs-string">'user'</span>, <span class="hljs-attr">params</span>: { <span class="hljs-attr">userId</span>: <span class="hljs-number">123</span> "}}")

<span class="hljs-comment">// 带查询参数，变成 /register?plan=private</span>
router.push({ <span class="hljs-attr">path</span>: <span class="hljs-string">'register'</span>, <span class="hljs-attr">query</span>: { <span class="hljs-attr">plan</span>: <span class="hljs-string">'private'</span> "}}")</code></pre>
<blockquote><p>router.replace(location)</p></blockquote>
<p>跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。</p>
<blockquote><p>router.go(n)</p></blockquote>
<p>这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在浏览器记录中前进一步，等同于 history.forward()</span>
router.go(<span class="hljs-number">1</span>)

<span class="hljs-comment">// 后退一步记录，等同于 history.back()</span>
router.go(<span class="hljs-number">-1</span>)

<span class="hljs-comment">// 前进 3 步记录</span>
router.go(<span class="hljs-number">3</span>)

<span class="hljs-comment">// 如果 history 记录不够用，那就默默地失败呗</span>
router.go(<span class="hljs-number">-100</span>)
router.go(<span class="hljs-number">100</span>)</code></pre>
<h2 id="articleHeader8">命名路由</h2>
<p>有时我们通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。</p>
<p>我们直接在路由下添加一个 name 即可.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var routes = [
    {
        path:&quot;/one&quot;,
        name:&quot;one&quot;,
        component:{template:&quot;#a&quot;}
    },
    {
        path:&quot;/two&quot;,
        name:&quot;two&quot;,
        component:{template:&quot;#b&quot;},
    },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> routes = [
    {
        <span class="hljs-attr">path</span>:<span class="hljs-string">"/one"</span>,
        <span class="hljs-attr">name</span>:<span class="hljs-string">"one"</span>,
        <span class="hljs-attr">component</span>:{<span class="hljs-attr">template</span>:<span class="hljs-string">"#a"</span>}
    },
    {
        <span class="hljs-attr">path</span>:<span class="hljs-string">"/two"</span>,
        <span class="hljs-attr">name</span>:<span class="hljs-string">"two"</span>,
        <span class="hljs-attr">component</span>:{<span class="hljs-attr">template</span>:<span class="hljs-string">"#b"</span>},
    },
]</code></pre>
<p>要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{ name: 'one'}&quot;>User</router-link>
<router-link :to=&quot;{ name: 'two'}&quot;>User</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{ name: 'one'}"</span>&gt;</span>User<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{ name: 'two'}"</span>&gt;</span>User<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011123094" src="https://static.alili.tech/img/remote/1460000011123094" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">命名视图</h2>
<p>有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <router-view></router-view>
    <router-view></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></code></pre>
<p>当我们的视图如上时,我们会发现每一个路由被渲染了两次,所以我们需要为视图命名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <router-view name=&quot;a&quot;></router-view>
    <router-view name=&quot;b&quot;></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Foo = { template: '<div>foo</div>' }
var Bar = { template: '<div>bar</div>' }
var routes = [
        {
            path:&quot;/one&quot;,
            name:&quot;one&quot;,
            components:{
                a:Foo,
                b:Bar
            }
        },
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Foo = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;foo&lt;/div&gt;'</span> }
<span class="hljs-keyword">var</span> Bar = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;bar&lt;/div&gt;'</span> }
<span class="hljs-keyword">var</span> routes = [
        {
            <span class="hljs-attr">path</span>:<span class="hljs-string">"/one"</span>,
            <span class="hljs-attr">name</span>:<span class="hljs-string">"one"</span>,
            <span class="hljs-attr">components</span>:{
                <span class="hljs-attr">a</span>:Foo,
                <span class="hljs-attr">b</span>:Bar
            }
        },
    ]</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011123095" src="https://static.alili.tech/img/remote/1460000011123095" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">重定向和别名</h2>
<h3 id="articleHeader11">重定向</h3>
<p>重定向(Redirect)就是通过各种方法将各种网络请求重新定个方向转到其它位置,用于网站调整或网页被移到一个新地址,它也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/a'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/b'</span> }
  ]
})</code></pre>
<h3 id="articleHeader12">别名</h3>
<p>/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。简单的说就是给 /a 起了一个外号叫做 /b ,但是本质上还是 /a</p>
<p>上面对应的路由配置为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/a'</span>, <span class="hljs-attr">component</span>: A, <span class="hljs-attr">alias</span>: <span class="hljs-string">'/b'</span> }
  ]
})</code></pre>
<p>『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-router(vue路由基础详解)

## 原文链接
[https://segmentfault.com/a/1190000011123089](https://segmentfault.com/a/1190000011123089)

