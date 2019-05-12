---
title: '【vuejs路由】vuejs 路由基础入门实战操作详细指南' 
date: 2018-12-28 2:30:11
hidden: true
slug: kfysdgg5c08
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">【vuejs路由】vuejs 路由基础入门实战操作详细指南</h1>
<h2 id="articleHeader1">官方文档：</h2>
<p><a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh-cn/</a></p>
<p>用 Vue.js + vue-router 创建单页应用，是非常简单的。使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 vue-router 添加进来，我们需要做的是，将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。</p>
<h2 id="articleHeader2">hash 和 history模式</h2>
<h3 id="articleHeader3">默认hash模式：</h3>
<p>以#/开始匹配，这种叫作哈希模式（hash）</p>
<h3 id="articleHeader4">HTML5 History 模式：</h3>
<p>/开始，就是我们常见的方式没有 # 符号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <a href=&quot;/&quot;>首页</a>
    <a href=&quot;/work&quot;>工作</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/work"</span>&gt;</span>工作<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<blockquote><p>我们此时使用a标签来切换比较麻烦，每次更改路由模式的时候，需要单独改a标签里面herf的链接</p></blockquote>
<p>在vue里面提供了一个更好的方式，来解决这个问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <router-link to=&quot;/&quot;>home主页</router-link>
    <router-link to=&quot;/work&quot;>我的工作</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>   <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>home主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/work"</span>&gt;</span>我的工作<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h2 id="articleHeader5">&lt;router-view/&gt;</h2>
<blockquote><p>每次切换路由的时候，里面的内容都依靠&lt;router-view/&gt; 来显示在页面上</p></blockquote>
<p>只有页面有导航的地方，打算让组件显示在页面上，必须写&lt;router-view/&gt;这个标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <router-link to=&quot;/&quot;>home主页</router-link>
    <router-link to=&quot;/work&quot;>我的工作</router-link>
    <router-view/> 这个标签用来显示页面内容
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>home主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/work"</span>&gt;</span>我的工作<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span> 这个标签用来显示页面内容
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h2 id="articleHeader6">router-link 默认解析成a标签</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#/&quot; class=&quot;router-link-active&quot;>home主页</a>
<a href=&quot;#/work&quot; class=&quot;router-link-exact-active router-link-active&quot;>我的工作</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"router-link-active"</span>&gt;</span>home主页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/work"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"router-link-exact-active router-link-active"</span>&gt;</span>我的工作<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h2 id="articleHeader7">给导航添加激活样式</h2>
<p>通过css里面设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".router-link-active{
    background-color:red
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.router-link-active</span>{
    <span class="hljs-attribute">background-color</span>:red
}</code></pre>
<blockquote><p>当我们单独设置激活样式的时候，根路由 /  永远都会匹配到样式</p></blockquote>
<h2 id="articleHeader8">我们可以在标签中添加 exact 方式来解决永远都会匹配到跟路径样式问题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    直接加在标签属性上
    <router-link exact to=&quot;/&quot;>home主页</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    直接加在标签属性上
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>home主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h2 id="articleHeader9">我们自己来给导航添加自定义class名字</h2>
<blockquote><p>通过 设置 active-class属性值 改变默认的激活样式类</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <router-link to=&quot;/work&quot; active-class=&quot;starkwang&quot;>我的工作</router-link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;router-link <span class="hljs-keyword">to</span>=<span class="hljs-string">"/work"</span> active-<span class="hljs-built_in">class</span>=<span class="hljs-string">"starkwang"</span>&gt;我的工作&lt;/router-link&gt;
</code></pre>
<h2 id="articleHeader10">统一更改激活样式</h2>
<p>在 router/index.js里面设置 linkExactActiveClass属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    // mode: 'history',
    mode: 'hash',
    linkExactActiveClass: 'shudong', //通过设置这个属性值，给所有的激活样式，添加统一的类


当我们统一设置后，每次激活的路由标签，都带着自己设置的这个shudong类
<a href=&quot;#/work&quot; class=&quot;shudong starkwang&quot;>我的工作</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-comment">// mode: 'history',</span>
    mode: <span class="hljs-string">'hash'</span>,
    <span class="hljs-attr">linkExactActiveClass</span>: <span class="hljs-string">'shudong'</span>, <span class="hljs-comment">//通过设置这个属性值，给所有的激活样式，添加统一的类</span>


当我们统一设置后，每次激活的路由标签，都带着自己设置的这个shudong类
&lt;a href=<span class="hljs-string">"#/work"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"shudong starkwang"</span>&gt;我的工作&lt;<span class="hljs-regexp">/a&gt;</span></code></pre>
<h2 id="articleHeader11">使用属性 tag 统一更改路由编译后的标签名字<a></a> -&gt; &lt;li&gt; &lt;/li&gt;</h2>
<blockquote><p>默认编译的标签名字是 a</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <router-link to=&quot;/stark&quot; tag=&quot;li&quot;>我的Stark</router-link>

更改完后的dom
<li class=&quot;shudong router-link-active&quot;>我的Stark</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/stark"</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"li"</span>&gt;</span>我的Stark<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>

更改完后的dom
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shudong router-link-active"</span>&gt;</span>我的Stark<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<h2 id="articleHeader12">路由嵌套 chidren</h2>
<p>使用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        {
            path: '/about',  // 这是一级路由
            component: About,
            children: [{  // 里面是嵌套路由
                    path: 'blog',  //如果在这个嵌套
                    name: 'blog',
                    component: Blog
                },
                {
                    path: '/info',
                    name: 'info',
                    component: Info
                }
            ]
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>        {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/about'</span>,  <span class="hljs-comment">// 这是一级路由</span>
            <span class="hljs-attribute">component</span>: About,
            <span class="hljs-attribute">children</span>: [{  <span class="hljs-comment">// 里面是嵌套路由</span>
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'blog'</span>,  <span class="hljs-comment">//如果在这个嵌套</span>
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attribute">component</span>: Blog
                },
                {
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/info'</span>,
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'info'</span>,
                    <span class="hljs-attribute">component</span>: Info
                }
            ]
        }</code></pre>
<h3 id="articleHeader13">如果在这个嵌套里面的path:'' 留空，默认会显示这个组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8080/#/about
此时会把 这个默认留空的嵌套路由组件显示出来，也就是上面的blog 组件显示出来 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">http:</span>//localhost:<span class="hljs-number">8080</span>/<span class="hljs-meta">#/about</span>
此时会把 这个默认留空的嵌套路由组件显示出来，也就是上面的blog 组件显示出来 </code></pre>
<h3 id="articleHeader14">如果嵌套路由里面的path:'blog' 写具体的路由,则访问的时候必须匹配</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
必须是这个路由精准匹配

http://localhost:8080/#/about/blog

这样才会把这个blog嵌套路由组件显示出来
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>
必须是这个路由精准匹配
<span class="hljs-symbol">
http:</span>//localhost:<span class="hljs-number">8080</span>/#/about/<span class="hljs-keyword">blog
</span>
这样才会把这个<span class="hljs-keyword">blog嵌套路由组件显示出来
</span></code></pre>
<h3 id="articleHeader15">以 / 开头的嵌套路径会被当作根路径。</h3>
<p>这让你充分的使用嵌套组件而无须设置嵌套的路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            {
            path: '/about',  // 这是一级路由
            component: About,
            children: [{  // 里面是嵌套路由
                    path: 'blog',  //如果在这个嵌套
                    name: 'blog',
                    component: Blog
                },
                {
                    path: '/info', // 以 / 开头的嵌套路径会被当作跟路径
                    name: 'info',
                    component: Info
                }
            ]
        }

    访问方式：
    http://localhost:8080/#/info" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>            {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/about'</span>,  <span class="hljs-comment">// 这是一级路由</span>
            <span class="hljs-attribute">component</span>: About,
            <span class="hljs-attribute">children</span>: [{  <span class="hljs-comment">// 里面是嵌套路由</span>
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'blog'</span>,  <span class="hljs-comment">//如果在这个嵌套</span>
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attribute">component</span>: Blog
                },
                {
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/info'</span>, <span class="hljs-comment">// 以 / 开头的嵌套路径会被当作跟路径</span>
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'info'</span>,
                    <span class="hljs-attribute">component</span>: Info
                }
            ]
        }

    访问方式：
    <span class="hljs-attribute">http</span>:<span class="hljs-comment">//localhost:8080/#/info</span></code></pre>
<h3 id="articleHeader16">如果去掉/ 此时去掉了 '/info'  -&gt; 'info'</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        {
            path: '/about',  // 这是一级路由
            component: About,
            children: [{  // 里面是嵌套路由
                    path: 'blog',  //如果在这个嵌套
                    name: 'blog',
                    component: Blog
                },
                {
                    path: 'info', // 此时去掉了 '/info'  -> 'info'
                    name: 'info',
                    component: Info
                }
            ]
        }

      访问方式：
    http://localhost:8080/#/about/info
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>        {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/about'</span>,  <span class="hljs-comment">// 这是一级路由</span>
            <span class="hljs-attribute">component</span>: About,
            <span class="hljs-attribute">children</span>: [{  <span class="hljs-comment">// 里面是嵌套路由</span>
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'blog'</span>,  <span class="hljs-comment">//如果在这个嵌套</span>
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attribute">component</span>: Blog
                },
                {
                    <span class="hljs-attribute">path</span>: <span class="hljs-string">'info'</span>, <span class="hljs-comment">// 此时去掉了 '/info'  -&gt; 'info'</span>
                    <span class="hljs-attribute">name</span>: <span class="hljs-string">'info'</span>,
                    <span class="hljs-attribute">component</span>: Info
                }
            ]
        }

      访问方式：
    <span class="hljs-attribute">http</span>:<span class="hljs-comment">//localhost:8080/#/about/info</span>
</code></pre>
<blockquote>
<p>你会发现，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。</p>
<p>此时，基于上面的配置，当你访问 /about/info 时，about 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。</p>
</blockquote>
<h2 id="articleHeader17">重定向</h2>
<h3 id="articleHeader18">使用方式 path:'*'</h3>
<p>这个 * 是匹配上面没有找到的路径，会到这里<br>可以直接写：component: NotFound,</p>
<p>redirect 这是一个函数，里面有参数 to<br>to 打印出来是一个对象<br>{name: undefined, meta: {…}, path: "/aaa", hash: "", query: {…}, …}</p>
<h3 id="articleHeader19">通过 to.path 可以获取当前用户访问的路径，来写一些逻辑跳转下面是使用详细方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path: '*',
    // component: NotFound,
    redirect: (to) => {
        console.log(to);
        if (to.path === '/aaa') {
            return '/work'
        } else if (to.path === '/bbb') {
            return '/info'
        } else {
            return '/'
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>{
    path: <span class="hljs-string">'*'</span>,
    <span class="hljs-comment">// component: NotFound,</span>
    redirect: (<span class="hljs-keyword">to</span>) =&gt; {
        console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">to</span>);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.path === <span class="hljs-string">'/aaa'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'/work'</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.path === <span class="hljs-string">'/bbb'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'/info'</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'/'</span>
        }
    }
}</code></pre>
<h2 id="articleHeader20">最后附上所有路由文件代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Work from '@/components/Work'
import Stark from '@/components/Stark'

Vue.use(Router)
const UserProfile = { template: `<div> 我是profile 组件 </div>` };
const UserPosts = { template: `<div> 我是UserPosts 组件 </div>` };
const Blog = { template: `<div> 我是Blog 组件 </div>` };
const Info = { template: `<div> 我是Info 组件 </div>` };
const NotFound = { template: `<div>404 您访问的页面不存在 </div>` };
const About = { template: `<div> 我是About组件 <router-view> </router-view> </div>` };
const User = {
    // template: '<div>User "{{" $route.params.id "}}"</div>'
    template: ' <div class=&quot;user&quot;> \
            <h2> User "{{" $route.params.id } } </h2> \
            <router-view> </router-view> \
            </div>'
}

export default new Router({
    // mode: 'history',
    mode: 'hash',
    linkExactActiveClass: 'shudong',
    routes: [{
            path: '/',
            name: 'Hello',
            component: HelloWorld
        },
        {
            path: '/work',
            name: 'Work',
            component: Work
        },
        {
            path: '/stark',
            name: 'stark',
            component: Stark
        },
        // { path: '/user/:id', component: User }
        {
            path: '/user/:id',
            component: User,
            children: [{
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                },
                {
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                }
            ]
        },
        {
            path: '/about',
            component: About,
            children: [{
                    path: 'blog',
                    name: 'blog',
                    component: Blog
                },
                {
                    path: '/info',
                    name: 'info',
                    component: Info
                }
            ]
        },
        {
            path: '*',
            // component: NotFound,
            redirect: (to) => {
                console.log(to);
                if (to.path === '/aaa') {
                    return '/work'
                } else if (to.path === '/bbb') {
                    return '/info'
                } else {
                    return '/'
                }
            }
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>
<span class="hljs-keyword">import</span> Work <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Work'</span>
<span class="hljs-keyword">import</span> Stark <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Stark'</span>

Vue.use(Router)
<span class="hljs-keyword">const</span> UserProfile = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是profile 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> UserPosts = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是UserPosts 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> Blog = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是Blog 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> Info = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是Info 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> NotFound = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;404 您访问的页面不存在 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> About = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是About组件 &lt;router-view&gt; &lt;/router-view&gt; &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> User = {
    <span class="hljs-comment">// template: '&lt;div&gt;User "{{" $route.params.id "}}"&lt;/div&gt;'</span>
    template: <span class="hljs-string">' &lt;div class="user"&gt; \
            &lt;h2&gt; User "{{" $route.params.id } } &lt;/h2&gt; \
            &lt;router-view&gt; &lt;/router-view&gt; \
            &lt;/div&gt;'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-comment">// mode: 'history',</span>
    mode: <span class="hljs-string">'hash'</span>,
    <span class="hljs-attr">linkExactActiveClass</span>: <span class="hljs-string">'shudong'</span>,
    <span class="hljs-attr">routes</span>: [{
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'Hello'</span>,
            <span class="hljs-attr">component</span>: HelloWorld
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/work'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'Work'</span>,
            <span class="hljs-attr">component</span>: Work
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/stark'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'stark'</span>,
            <span class="hljs-attr">component</span>: Stark
        },
        <span class="hljs-comment">// { path: '/user/:id', component: User }</span>
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/user/:id'</span>,
            <span class="hljs-attr">component</span>: User,
            <span class="hljs-attr">children</span>: [{
                    <span class="hljs-comment">// 当 /user/:id/profile 匹配成功，</span>
                    <span class="hljs-comment">// UserProfile 会被渲染在 User 的 &lt;router-view&gt; 中</span>
                    path: <span class="hljs-string">'profile'</span>,
                    <span class="hljs-attr">component</span>: UserProfile
                },
                {
                    <span class="hljs-comment">// 当 /user/:id/posts 匹配成功</span>
                    <span class="hljs-comment">// UserPosts 会被渲染在 User 的 &lt;router-view&gt; 中</span>
                    path: <span class="hljs-string">'posts'</span>,
                    <span class="hljs-attr">component</span>: UserPosts
                }
            ]
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>,
            <span class="hljs-attr">component</span>: About,
            <span class="hljs-attr">children</span>: [{
                    <span class="hljs-attr">path</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attr">component</span>: Blog
                },
                {
                    <span class="hljs-attr">path</span>: <span class="hljs-string">'/info'</span>,
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'info'</span>,
                    <span class="hljs-attr">component</span>: Info
                }
            ]
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
            <span class="hljs-comment">// component: NotFound,</span>
            redirect: <span class="hljs-function">(<span class="hljs-params">to</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(to);
                <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/aaa'</span>) {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'/work'</span>
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/bbb'</span>) {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'/info'</span>
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'/'</span>
                }
            }
        }
    ]
})</code></pre>
<h2 id="articleHeader21">路由传参</h2>
<h3 id="articleHeader22">传一个参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在路由里面的path:'/user/:stark'   这个冒号后面跟的字符串相当于 key 
在组件里面使用 this.$route.params.stark 来获取这个value的值
访问方式：

http://localhost:8080/#/user/wang

wang 就是console.log(this.$route.params.stark) 值

在后面跟 ？号
可以 写wang 或不写 后面的参数
如果不跟？号 ，必须写这个参数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>在路由里面的path:<span class="hljs-string">'/user/:stark'</span>   这个冒号后面跟的字符串相当于 key 
在组件里面使用 this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.stark</span> 来获取这个value的值
访问方式：

http:<span class="hljs-comment">//localhost:8080/#/user/wang</span>

wang 就是console.log(this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.stark</span>) 值

在后面跟 ？号
可以 写wang 或不写 后面的参数
如果不跟？号 ，必须写这个参数</code></pre>
<h3 id="articleHeader23">如果想传多个参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在路由里面添加多个key
path: '/user/:stark?/:name?

访问方式
http://localhost:8080/#/user/wang/stark

打印结果 console.log(this.$route.params)
{stark: &quot;wang&quot;, name: &quot;shudong&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>在路由里面添加多个key
path: '/<span class="hljs-keyword">user</span>/:stark?/:name?

访问方式
http://localhost:<span class="hljs-number">8080</span>/<span class="hljs-comment">#/user/wang/stark</span>

打印结果 console.<span class="hljs-keyword">log</span>(this.<span class="hljs-variable">$route</span>.params)
{stark: <span class="hljs-string">"wang"</span>, name: <span class="hljs-string">"shudong"</span>}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {
    path: '/user/:stark?/:name?',
    name: 'user',
    component: User
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/user/:stark?/:name?'</span>,
    name: <span class="hljs-string">'user'</span>,
    component: User
},</code></pre>
<h3 id="articleHeader24">案例：</h3>
<h4>user 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <router-link :to=&quot;'/user/' + item.id&quot; v-for=&quot;item in userList&quot;>"{{"item.username"}}" </router-link>
        <div>
                <p> 姓名："{{"userInfo.username"}}"</p>
                <p> 爱好："{{"userInfo.hobby"}}"</p>
                <p> 性别："{{"userInfo.sex"}}"</p>
        </div>
    </div>
</template> 

<script>
    let data = [
        {
            id:1,
            tip:'vip',
            username:'luchang',
            sex:'男',
            hobby:'coding'
        },
        {
            id:2,
            tip:'vip',
            username:'guomian',
            sex:'男',
            hobby:'女'
        },
        {
            id:3,
            tip:'common',
            username:'zhangming',
            sex:'男',
            hobby:'bug'
        },
    ]
    export default{
        data(){
            return{
                userList:data,
                userInfo:''
            }
        },
        watch:{
            $route(){
                this.getData();
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                // let id = this.$route;
                console.log(this.$route);
                let id = this.$route.params.userId;
                if(id){
                    this.userInfo = this.userList.filter((item)=>{
                        return item.id == id;
                    })[0]
                }
                console.log(this.userInfo);
                // console.log(this.$route.params.stark);
            }
        }
    }
</script> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"'/user/' + item.id"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in userList"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.username"}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> 姓名：</span><span class="hljs-template-variable">"{{"userInfo.username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> 爱好：</span><span class="hljs-template-variable">"{{"userInfo.hobby"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> 性别：</span><span class="hljs-template-variable">"{{"userInfo.sex"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span> 

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> data = [
        {
            <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,
            <span class="hljs-attr">tip</span>:<span class="hljs-string">'vip'</span>,
            <span class="hljs-attr">username</span>:<span class="hljs-string">'luchang'</span>,
            <span class="hljs-attr">sex</span>:<span class="hljs-string">'男'</span>,
            <span class="hljs-attr">hobby</span>:<span class="hljs-string">'coding'</span>
        },
        {
            <span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,
            <span class="hljs-attr">tip</span>:<span class="hljs-string">'vip'</span>,
            <span class="hljs-attr">username</span>:<span class="hljs-string">'guomian'</span>,
            <span class="hljs-attr">sex</span>:<span class="hljs-string">'男'</span>,
            <span class="hljs-attr">hobby</span>:<span class="hljs-string">'女'</span>
        },
        {
            <span class="hljs-attr">id</span>:<span class="hljs-number">3</span>,
            <span class="hljs-attr">tip</span>:<span class="hljs-string">'common'</span>,
            <span class="hljs-attr">username</span>:<span class="hljs-string">'zhangming'</span>,
            <span class="hljs-attr">sex</span>:<span class="hljs-string">'男'</span>,
            <span class="hljs-attr">hobby</span>:<span class="hljs-string">'bug'</span>
        },
    ]
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">userList</span>:data,
                <span class="hljs-attr">userInfo</span>:<span class="hljs-string">''</span>
            }
        },
        <span class="hljs-attr">watch</span>:{
            $route(){
                <span class="hljs-keyword">this</span>.getData();
            }
        },
        created(){
            <span class="hljs-keyword">this</span>.getData();
        },
        <span class="hljs-attr">methods</span>:{
            getData(){
                <span class="hljs-comment">// let id = this.$route;</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$route);
                <span class="hljs-keyword">let</span> id = <span class="hljs-keyword">this</span>.$route.params.userId;
                <span class="hljs-keyword">if</span>(id){
                    <span class="hljs-keyword">this</span>.userInfo = <span class="hljs-keyword">this</span>.userList.filter(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
                        <span class="hljs-keyword">return</span> item.id == id;
                    })[<span class="hljs-number">0</span>]
                }
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.userInfo);
                <span class="hljs-comment">// console.log(this.$route.params.stark);</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
</span></code></pre>
<h4>路由</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Work from '@/components/Work'
import Stark from '@/components/Stark'
import User from '@/components/User'

Vue.use(Router)
const UserProfile = { template: `<div> 我是profile 组件 </div>` };
const UserPosts = { template: `<div> 我是UserPosts 组件 </div>` };
const Blog = { template: `<div> 我是Blog 组件 </div>` };
const Info = { template: `<div> 我是Info 组件 </div>` };
const NotFound = { template: `<div>404 您访问的页面不存在 </div>` };
const About = { template: `<div> 我是About组件 <router-view> </router-view> </div>` };
const Users = {
    // template: '<div>User "{{" $route.params.id "}}"</div>'
    template: ' <div class=&quot;user&quot;> \
            <h2> User "{{" $route.params.id } } </h2> \
            <router-view> </router-view> \
            </div>'
}

export default new Router({
    // mode: 'history',
    mode: 'hash',
    linkExactActiveClass: 'shudong',
    routes: [{
            path: '/',
            name: 'Hello',
            component: HelloWorld
        },
        {
            path: '/work',
            name: 'Work',
            component: Work
        },
        {
            path: '/user/:userId?/:name?',
            name: 'user',
            component: User
        },
        {
            path: '/stark',
            name: 'stark',
            component: Stark
        },
        // { path: '/user/:id', component: User }
        {
            path: '/users/:id',
            component: Users,
            children: [{
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                },
                {
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                }
            ]
        },
        {
            path: '/about',
            component: About,
            children: [{
                    path: 'blog',
                    name: 'blog',
                    component: Blog
                },
                {
                    path: '/info',
                    name: 'info',
                    component: Info
                }
            ]
        },
        {
            path: '*',
            // component: NotFound,
            redirect: (to) => {
                // console.log(to);
                if (to.path === '/aaa') {
                    return '/work'
                } else if (to.path === '/bbb') {
                    return '/info'
                } else {
                    return '/'
                }
            }
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>
<span class="hljs-keyword">import</span> Work <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Work'</span>
<span class="hljs-keyword">import</span> Stark <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Stark'</span>
<span class="hljs-keyword">import</span> User <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/User'</span>

Vue.use(Router)
<span class="hljs-keyword">const</span> UserProfile = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是profile 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> UserPosts = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是UserPosts 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> Blog = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是Blog 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> Info = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是Info 组件 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> NotFound = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;404 您访问的页面不存在 &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> About = { <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt; 我是About组件 &lt;router-view&gt; &lt;/router-view&gt; &lt;/div&gt;`</span> };
<span class="hljs-keyword">const</span> Users = {
    <span class="hljs-comment">// template: '&lt;div&gt;User "{{" $route.params.id "}}"&lt;/div&gt;'</span>
    template: <span class="hljs-string">' &lt;div class="user"&gt; \
            &lt;h2&gt; User "{{" $route.params.id } } &lt;/h2&gt; \
            &lt;router-view&gt; &lt;/router-view&gt; \
            &lt;/div&gt;'</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-comment">// mode: 'history',</span>
    mode: <span class="hljs-string">'hash'</span>,
    <span class="hljs-attr">linkExactActiveClass</span>: <span class="hljs-string">'shudong'</span>,
    <span class="hljs-attr">routes</span>: [{
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'Hello'</span>,
            <span class="hljs-attr">component</span>: HelloWorld
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/work'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'Work'</span>,
            <span class="hljs-attr">component</span>: Work
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/user/:userId?/:name?'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'user'</span>,
            <span class="hljs-attr">component</span>: User
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/stark'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'stark'</span>,
            <span class="hljs-attr">component</span>: Stark
        },
        <span class="hljs-comment">// { path: '/user/:id', component: User }</span>
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/users/:id'</span>,
            <span class="hljs-attr">component</span>: Users,
            <span class="hljs-attr">children</span>: [{
                    <span class="hljs-comment">// 当 /user/:id/profile 匹配成功，</span>
                    <span class="hljs-comment">// UserProfile 会被渲染在 User 的 &lt;router-view&gt; 中</span>
                    path: <span class="hljs-string">'profile'</span>,
                    <span class="hljs-attr">component</span>: UserProfile
                },
                {
                    <span class="hljs-comment">// 当 /user/:id/posts 匹配成功</span>
                    <span class="hljs-comment">// UserPosts 会被渲染在 User 的 &lt;router-view&gt; 中</span>
                    path: <span class="hljs-string">'posts'</span>,
                    <span class="hljs-attr">component</span>: UserPosts
                }
            ]
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>,
            <span class="hljs-attr">component</span>: About,
            <span class="hljs-attr">children</span>: [{
                    <span class="hljs-attr">path</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'blog'</span>,
                    <span class="hljs-attr">component</span>: Blog
                },
                {
                    <span class="hljs-attr">path</span>: <span class="hljs-string">'/info'</span>,
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'info'</span>,
                    <span class="hljs-attr">component</span>: Info
                }
            ]
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
            <span class="hljs-comment">// component: NotFound,</span>
            redirect: <span class="hljs-function">(<span class="hljs-params">to</span>) =&gt;</span> {
                <span class="hljs-comment">// console.log(to);</span>
                <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/aaa'</span>) {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'/work'</span>
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/bbb'</span>) {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'/info'</span>
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'/'</span>
                }
            }
        }
    ]
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vuejs路由】vuejs 路由基础入门实战操作详细指南

## 原文链接
[https://segmentfault.com/a/1190000011612365](https://segmentfault.com/a/1190000011612365)

