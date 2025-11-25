---
title: 'Vue.js入门（一）--MVVM框架理解' 
date: 2019-01-14 2:30:07
hidden: true
slug: hxeehl0o1ng
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">入门VUE</h1>
<p>开始在某公司实习，第一个接手的项目是用vue+bootstrap搭建网页。开始读官网<a href="https://cn.vuejs.org/v2" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2</a>的入门教程和API，有些吃力。想先了解一下此框架大体的内容和原理。</p>
<hr>
<h2 id="articleHeader1">MVC、MVP、MVVM模型原理</h2>
<p>参考了阮大大的博客文章<a href="http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a>，总结了下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVNAHW?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVNAHW?w=1080&amp;h=1920" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>总结：</strong>这三种模式的区别主要在于中间层，也就是MVC的控制层所起到的作用的差别。<br>参考博客<a href="http://www.cnblogs.com/onepixel/p/6034307.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/onepix...</a>，说明了MVC模式不那么适合前段开发的理由：</p>
<blockquote>
<p>这种 MVC 架构模式对于简单的应用来看起是OK 的，也符合软件架构的分层思想。 但实际上，随着H5 的不断发展，人们更希望使用H5开发的应用能和Native媲美，或者接近于原生App的体验效果，于是前端应用的复杂程度已不同往日，今非昔比。这时前端开发就暴露出了三个痛点问题：</p>
<p>1、开发者在代码中大量调用相同的 DOM API, 处理繁琐 ，操作冗余，使得代码难以维护。</p>
<p>2、大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。</p>
<p>3、当 Model 频繁发生变化，开发者需要主动更新到View ；当用户的操作导致 View 发生变化，开发者同样需要将变化的数据同步到Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。</p>
<p>其实，早期jquery 的出现就是为了前端能更简洁的操作DOM 而设计的，但它只解决了第一个问题，另外两个问题始终伴随着前端一直存在。</p>
</blockquote>
<p>----------</p>
<h2 id="articleHeader2">MVVM 的出现，完美解决了以上三个问题</h2>
<p>MVVM 由 Model,View,ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。</p>
<p>在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。</p>
<p>ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。</p>
<hr>
<h2 id="articleHeader3">Vue.js与MVVM模型的联系</h2>
<p>Vue.js 可以说是MVVM 架构的最佳实践，专注于 MVVM 中的 ViewModel，不仅做到了数据双向绑定，而且也是一款相对比较轻量级的JS 库，API 简洁，很容易上手。Vue的基础知识网上有现成的教程，此处不再赘述， 下面简单了解一下 Vue.js 关于双向绑定的一些实现细节：</p>
<p>Vue.js 是采用 Object.defineProperty 的 getter 和 setter，并结合观察者模式来实现数据绑定的。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVNALb?w=649&amp;h=347" src="https://static.alili.tech/img/bVNALb?w=649&amp;h=347" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>Observer<br>数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。</p>
<p>Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。</p>
<p>Watcher 订阅者， 作为连接 Observer 和 Compile<br>的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。</p>
<p>Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update<br>方法。</p>
</blockquote>
<p>我是这样理解vue框架对应MVVM模型关系的：</p>
<ul>
<li><p>Observer相当于Model层观察vue实例中的data数据，当数据发生变化时，通知Watcher订阅者。</p></li>
<li><p>Compile指令解析器位于View层，初始化View的视图，将数据变化与更新函数绑定，传给Watcher订阅者。</p></li>
<li><p>Watcher是整个模型的核心，对应ViewModel层，连接Observer和Compile。所有的Watchers存于Dep订阅器中，Watcher将Observer监听到的数据变化对应相应的回调函数，处理数据，反馈给View层更新界面视图。</p></li>
</ul>
<hr>
<h2 id="articleHeader4">Vue生命周期图</h2>
<p><span class="img-wrap"><img data-src="/img/bVNAQr?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVNAQr?w=1080&amp;h=1920" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">实例生命周期</h2>
<p>每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset=&quot;utf-8&quot;>
    <script src=&quot;http://unpkg.com/vue/dist/vue.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        window.onload = function(){
            new Vue({
                el:'#box',
                data:{
                    msg:'welcome'
                },
                created:function(){
                    console.log('实例已经创建,msg变量还未渲染到模板')
                },
                mounted:function(){
                    console.log('已经挂载到模板上:msg变量渲染到模板')  
                },
                updated:function(){
                    console.log('实例更新啦')    
                },
                destroyed:function(){
                    console.log('销毁啦')  
                }
            });
        }
    </script>
</head>
<body> 
    <div id=&quot;box&quot;>
        <input type=&quot;text&quot; v-model=&quot;msg&quot;><br/>
        "{{"msg"}}"
    </div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#box'</span>,
                <span class="hljs-attr">data</span>:{
                    <span class="hljs-attr">msg</span>:<span class="hljs-string">'welcome'</span>
                },
                <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'实例已经创建,msg变量还未渲染到模板'</span>)
                },
                <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'已经挂载到模板上:msg变量渲染到模板'</span>)  
                },
                <span class="hljs-attr">updated</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'实例更新啦'</span>)    
                },
                <span class="hljs-attr">destroyed</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'销毁啦'</span>)  
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
        </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<p>接下来要学习Vue.js中的API，包括全局API、选项、实例属性、实例方法、指令、特殊属性、内置组件等。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js入门（一）--MVVM框架理解

## 原文链接
[https://segmentfault.com/a/1190000009397476](https://segmentfault.com/a/1190000009397476)

