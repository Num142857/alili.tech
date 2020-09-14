---
title: 'vue使用keep-alive实现数据缓存不刷新' 
date: 2018-12-28 2:30:11
hidden: true
slug: 8swgwihthlm
categories: [reprint]
---

{{< raw >}}

                    
<p>到现在，接触vue也小段时间了，项目进行到了一定程度，然而项目缺少了缓存机制，所以每次跳转页面都会重新created一下数据，虽说系统的数据请求速度很快，但是这样做对系统的性能会有很大的坏处的，所以到这里就要对系统优化下，添加缓存了。<br>其实到现在，对于vue还是没有玩通，每深挖一次，就会发现一次vue的精彩，开始不清楚要用什么实现缓存，找了好久，有好几种说法，就是用vuex、vuet或者keep-alive，然后对比了一下，在我认为，vuex和vuet是实现状态管理，重心是在数据处理上；想要实现整体的缓存，阻止created的刷新，就要用keep-alive。<br>所以这里我想要给大家介绍下如何用keep-alive实现缓存的页面？其实很简单，就是几句话而已。</p>
<p>1、keep-alive要配合router-view使用，这里要注意一点就是，keep-alive本身是vue2.0的功能，并不是vue-router的，所以再vue1.0版本是不支持的。keep-alive官方文档点<a href="https://cn.vuejs.org/v2/api/#keep-alive" rel="nofollow noreferrer" target="_blank">这里</a>，代码实现如下，router-view是在入口APP.vue里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
    <!--这里是其他的代码-->
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!--这里是其他的代码--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>2、这样就会实现组件的缓存，但是有个缺点就是所有组件都会被缓存，可是现实中就是我们有些页面还是要及时刷新的，比如列表数据，想要查看详情的时候都是共用一个组件，只是刷新页面，所以这个共用的组件是不能够缓存的，不然会造成点其他的条目都是之前缓存的数据。那要怎么自定义呢，那就要在router-view里面多加个v-if判断了，然后在router定义的文件里面在想要缓存的页面多加上“meta:{keepAlive:true}”，不想要缓存就是“meta:{keepAlive:false}”或者不写，只有为true的时候是会被keep-alive识别然后缓存的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <!--缓存想要缓存的页面，实现后退不刷新-->
    <!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面-->
    <keep-alive>
      <router-view v-if=&quot;$route.meta.keepAlive&quot;></router-view>
    </keep-alive>
    <router-view v-if=&quot;!$route.meta.keepAlive&quot;></router-view>
    
    <!--这里是其他的代码-->
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--缓存想要缓存的页面，实现后退不刷新--&gt;</span>
    <span class="hljs-comment">&lt;!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"$route.meta.keepAlive"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!$route.meta.keepAlive"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!--这里是其他的代码--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>3、在router文件加上meta判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    {//home会被缓存
        path:&quot;/home&quot;,
        component:home,
        meta:{keepAlive: true}
    }
    {//hello不会被缓存
        path:&quot;/hello&quot;,
        component:hello,
        meta:{keepAlive: false}
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

Vue.use(Router)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    {<span class="hljs-comment">//home会被缓存</span>
        path:<span class="hljs-string">"/home"</span>,
        <span class="hljs-attr">component</span>:home,
        <span class="hljs-attr">meta</span>:{<span class="hljs-attr">keepAlive</span>: <span class="hljs-literal">true</span>}
    }
    {<span class="hljs-comment">//hello不会被缓存</span>
        path:<span class="hljs-string">"/hello"</span>,
        <span class="hljs-attr">component</span>:hello,
        <span class="hljs-attr">meta</span>:{<span class="hljs-attr">keepAlive</span>: <span class="hljs-literal">false</span>}
    }
})</code></pre>
<p>想要看有没有缓存成功，可以在各个组件的created钩子里面打印输出标志，缓存成功就是首次进入页面，created会请求数据，后面就不会再次请求而是直接调用缓存的</p>
<p>添加了缓存可以大大减少对系统性能的损坏，毕竟做数据处理型的系统，数据过于庞大，每次都要请求一下页面是很不好的，有了缓存，该缓存的缓存，不想缓存也可以实时刷新</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue使用keep-alive实现数据缓存不刷新

## 原文链接
[https://segmentfault.com/a/1190000011640453](https://segmentfault.com/a/1190000011640453)

