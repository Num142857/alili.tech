---
title: 'vue.js路由vue-router（二）——路由进阶' 
date: 2019-01-14 2:30:07
hidden: true
slug: iei4m0x6959
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">导航钩子</h1>
<p>导航钩子类似于生命周期钩子，包含路由进入前，进入后，更新时，退出前等几个周期，主要用于控制导航的前进后退或跳转等。</p>
<p>在开始之前，我们先来写两个路由<br>新建html,引入vue.js及vue-router.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>路由</title>
    <script src=&quot;js/vue.js&quot;></script>
    <script src=&quot;js/vue-router.js&quot;></script>
</head>
<body>
    <div id=&quot;app&quot;>
        <div>
            <button><router-link to='/route1'>路由一</router-link></button>
            <button><router-link to='/route2'>路由二</router-link></button>
        </div>
        <router-view></router-view>
    </div>

    <script src=&quot;js/router.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>路由<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/route1'</span>&gt;</span>路由一<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/route2'</span>&gt;</span>路由二<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在router.js中定义路由及vue实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构建组件
var route1 = Vue.extend({
    template: '<div>路由一内容</div>'
});

var route2 = Vue.extend({
    template: '<div>路由二内容</div>'
});

//定义路由
var router = new VueRouter({
    routes: [
        {
            path: '/route1',
            name: 'route1',
            component: route1
        },
        {
            path: '/route2',
            name: 'route2',
            component: route2
        }
    ]
});

//定义vue实例
var app = new Vue({
    el: '#app',
    router
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//构建组件</span>
<span class="hljs-keyword">var</span> route1 = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;路由一内容&lt;/div&gt;'</span>
});

<span class="hljs-keyword">var</span> route2 = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;路由二内容&lt;/div&gt;'</span>
});

<span class="hljs-comment">//定义路由</span>
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    routes: [
        {
            path: <span class="hljs-string">'/route1'</span>,
            name: <span class="hljs-string">'route1'</span>,
            component: route1
        },
        {
            path: <span class="hljs-string">'/route2'</span>,
            name: <span class="hljs-string">'route2'</span>,
            component: route2
        }
    ]
});

<span class="hljs-comment">//定义vue实例</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    router
})</code></pre>
<p>打开浏览器，查看效果<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-078976f671405f66.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-078976f671405f66.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">1.全局钩子</h2>
<p>定义路由之后，接着就可以使用<code>router.beforeEach</code>定义全局钩子<br>在router.js中定义路由后面加上如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to,from,next) => {
    console.log(to)
    console.log(from)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to,<span class="hljs-keyword">from</span>,next)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(to)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>)
})</code></pre>
<p>全局钩子作用于所有路由，里面的参数<code>to</code>表示即将要进入的路由对象，<code>from</code>表示即将要离开的路由对象，<code>next</code>是继续跳转或中断的方法。<br>我们来看一下打印出的对象<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-e53cfaf9d89d1a42.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-e53cfaf9d89d1a42.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span><br>我们的操作是点击路由一按钮，即将由'/'跳转至'/route1'，可以看到打印出的第一个对象<code>to</code>的path为'/route1'，第二个对象<code>from</code>的path为'/'。<br>有一个问题，点击按钮之后路由并没有进行跳转，这是因为我们没有写next方法。next方法有以下3种：</p>
<blockquote><p>1.<code>next()</code>  默认跳转<br>2.<code>next(false)</code>保持当前路由不进行跳转</p></blockquote>
<p>3.<code>next('路由路径') </code>指定路由跳转</p>
<p><strong>（1）默认跳转</strong><br>我们先来试第一种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to,from,next) => {
    console.log(to)
    console.log(from)
    next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to,<span class="hljs-keyword">from</span>,next)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(to)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>)
    next()
})</code></pre>
<p>打开浏览器，可以看到路由跳转正常，并且以默认的路由进行跳转<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-0aad57e8c88992cb.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-0aad57e8c88992cb.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>（2）保持当前路由不进行跳转</strong><br>如果不写next方法就不会进行跳转，那么与next(false)的区别就在于，后者是不管url怎么改变，也会重置到from对应的路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to,from,next) => {
    console.log(to)
    console.log(from)
    next(false)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to,<span class="hljs-keyword">from</span>,next)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(to)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>)
    next(<span class="hljs-literal">false</span>)
})</code></pre>
<p>可以看到点击按钮并无反应，在地址栏输入其他路由也跳转回当前路由<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-5906891f445205c3.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-5906891f445205c3.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>（3）指定路由跳转</strong><br>这个方法最好不要写在全局钩子中，不然会陷入无限循环，跳转到指定路由又触发该导航钩子又进行跳转</p>
<h2 id="articleHeader2">2.路由内钩子</h2>
<p>导航钩子也可以通过<code>beforeEnter</code>写在某个路由内部</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
    routes: [
        {
            path: '/route1',
            name: 'route1',
            component: route1,
            meta:{title: '路由一'}
            beforeEnter: function(to,from,next){
                console.log(to)
                console.log(from)
                next()
            }
        },
        {
            path: '/route2',
            name: 'route2',
            component: route2,
            meta:{title: '路由二'}
        }
    ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    routes: [
        {
            path: <span class="hljs-string">'/route1'</span>,
            name: <span class="hljs-string">'route1'</span>,
            component: route1,
            meta:{title: <span class="hljs-string">'路由一'</span>}
            beforeEnter: <span class="hljs-keyword">function</span>(<span class="hljs-keyword">to</span>,<span class="hljs-keyword">from</span>,next){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">to</span>)
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>)
                next()
            }
        },
        {
            path: <span class="hljs-string">'/route2'</span>,
            name: <span class="hljs-string">'route2'</span>,
            component: route2,
            meta:{title: <span class="hljs-string">'路由二'</span>}
        }
    ]
});</code></pre>
<p>这样只在路由'/route1'下才会触发该钩子<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-bbf9fe97c69f48a6.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-bbf9fe97c69f48a6.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">3.组件内钩子</h2>
<p>组件内钩子有三种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var route1 = Vue.extend({
    template: '<div>路由一内容</div>',
    //对应该组件的路由被确认之前，此时还未创建组件实例
    beforeRouteEnter:function(to,from,next){
        
    },
    //对应该组件的路由被重复调用之时，如嵌套路由，此时组件实例已被创建
    beforeRouteUpdate:function(to,from,next){

    },
    //即将离开对应该组件的路由时
    beforeRouteLeave:function(to,from,next){

    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> route1 = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;路由一内容&lt;/div&gt;'</span>,
    <span class="hljs-comment">//对应该组件的路由被确认之前，此时还未创建组件实例</span>
    beforeRouteEnter:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(to,from,next)</span></span>{
        
    },
    <span class="hljs-comment">//对应该组件的路由被重复调用之时，如嵌套路由，此时组件实例已被创建</span>
    beforeRouteUpdate:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(to,from,next)</span></span>{

    },
    <span class="hljs-comment">//即将离开对应该组件的路由时</span>
    beforeRouteLeave:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(to,from,next)</span></span>{

    }
});</code></pre>
<h1 id="articleHeader4">路由元信息</h1>
<p>定义路由的时候可以设置<code>meta</code>字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
    routes: [
        {
            path: '/route1',
            name: 'route1',
            component: route1,
            meta:{title: '路由一'},
        },
        {
            path: '/route2',
            name: 'route2',
            component: route2,
            meta:{title: '路由二'}
        }
    ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>var router = new VueRouter({
    routes: [
        {
            <span class="hljs-built_in">path</span>: <span class="hljs-string">'/route1'</span>,
            <span class="hljs-keyword">name</span>: <span class="hljs-string">'route1'</span>,
            component: route1,
            meta:{<span class="hljs-built_in">title</span>: <span class="hljs-string">'路由一'</span>},
        },
        {
            <span class="hljs-built_in">path</span>: <span class="hljs-string">'/route2'</span>,
            <span class="hljs-keyword">name</span>: <span class="hljs-string">'route2'</span>,
            component: route2,
            meta:{<span class="hljs-built_in">title</span>: <span class="hljs-string">'路由二'</span>}
        }
    ]
});</code></pre>
<p>通过这个我们可以在全局钩子中设置页面的标题之类的，例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach(function(to,from,next){
    console.log(to)
    console.log(from)
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = '路由'
    }
    
    next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>router.beforeEach(<span class="hljs-keyword">function</span>(<span class="hljs-keyword">to</span>,<span class="hljs-keyword">from</span>,next){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">to</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>)
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">to</span>.meta.title){
        <span class="hljs-built_in">document</span>.title = <span class="hljs-keyword">to</span>.meta.title
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">document</span>.title = <span class="hljs-string">'路由'</span>
    }
    
    next()
})</code></pre>
<p>查看效果<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-1936a072abe189a6.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-1936a072abe189a6.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader5">过渡动效</h1>
<p>在路由中可以给路由视图<code>&lt;router-view&gt;</code>用<code>&lt;transition&gt;</code>标签设置总的过渡类名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;fade&quot; v-on:before-enter=&quot;enter&quot;>
    <router-view></router-view>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;transition <span class="hljs-built_in">name</span>=<span class="hljs-string">"fade"</span> v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">before</span>-enter=<span class="hljs-string">"enter"</span>&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
&lt;/transition&gt;</code></pre>
<p>其中<code>before-enter</code>为钩子函数，钩子函数有以下几种，本例中只写了第一种“进入之前”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition
  v-on:before-enter=&quot;beforeEnter&quot;
  v-on:enter=&quot;enter&quot;
  v-on:after-enter=&quot;afterEnter&quot;
  v-on:enter-cancelled=&quot;enterCancelled&quot;
  v-on:before-leave=&quot;beforeLeave&quot;
  v-on:leave=&quot;leave&quot;
  v-on:after-leave=&quot;afterLeave&quot;
  v-on:leave-cancelled=&quot;leaveCancelled&quot;
>
  <!-- ... -->
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;transition
  v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">before</span>-enter=<span class="hljs-string">"beforeEnter"</span>
  v-<span class="hljs-keyword">on</span>:enter=<span class="hljs-string">"enter"</span>
  v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">after</span>-enter=<span class="hljs-string">"afterEnter"</span>
  v-<span class="hljs-keyword">on</span>:enter-cancelled=<span class="hljs-string">"enterCancelled"</span>
  v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">before</span>-leave=<span class="hljs-string">"beforeLeave"</span>
  v-<span class="hljs-keyword">on</span>:leave=<span class="hljs-string">"leave"</span>
  v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">after</span>-leave=<span class="hljs-string">"afterLeave"</span>
  v-<span class="hljs-keyword">on</span>:leave-cancelled=<span class="hljs-string">"leaveCancelled"</span>
&gt;
  &lt;!<span class="hljs-comment">-- ... --&gt;</span>
&lt;/transition&gt;</code></pre>
<p>接着给<code>fade</code>类写过渡样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fade-enter-active, .fade-leave-active{transition: all 0.5s ease;}
.fade-enter, .fade-leave-active{opacity:0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.fade-enter-active</span>, <span class="hljs-selector-class">.fade-leave-active</span>{<span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.5s</span> ease;}
<span class="hljs-selector-class">.fade-enter</span>, <span class="hljs-selector-class">.fade-leave-active</span>{<span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;}</code></pre>
<p>查看效果<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/5700710-cd4c141dfda494b3.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/5700710-cd4c141dfda494b3.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js路由vue-router（二）——路由进阶

## 原文链接
[https://segmentfault.com/a/1190000009425705](https://segmentfault.com/a/1190000009425705)

