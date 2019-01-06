---
title: 'keep-alive的深入理解与使用(配合router-view缓存整个路由页面)' 
date: 2019-01-05 2:30:10
hidden: true
slug: agyqmjzzkaa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原来来自: <a href="http://blog.myweb.kim/vue/keep-alive/?utm-source=segmentfault" rel="nofollow noreferrer" target="_blank">http://blog.myweb.kim/vue/kee...</a> 转发请注明出处。</p></blockquote>
<p>在搭建 vue 项目时，有某些组件没必要多次渲染，所以需要将组件在内存中进行‘持久化’，此时 <code>&lt;keep-alive&gt;</code> 便可以派上用场了。 <code>&lt;keep-alive&gt;</code> 可以使被包含的组件状态维持不变，即便是组件切换了，其内的状态依旧维持在内存之中。在下一次显示时，也不会重现渲染。</p>
<blockquote><p>PS：<code>&lt;keep-alive&gt;</code> 与 <code>&lt;transition&gt;</code>相似，只是一个抽象组件，它不会在DOM树中渲染(真实或者虚拟都不会)，也不在父组件链中存在，比如：你永远在 <code>this.$parent</code> 中找不到 <code>keep-alive</code> 。</p></blockquote>
<h3 id="articleHeader0">1. keep-alive的基础使用</h3>
<p>最基础的一般是结合动态组件去使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
    <component :is=&quot;currentView&quot;></component>
</keep-alive>

new Vue({
    el: '#app',
    data(){
        return {
            currentView: Test //Test为引入的子组件
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;keep-alive&gt;</span>
    &lt;component :<span class="hljs-keyword">is</span>=<span class="hljs-string">"currentView"</span>&gt;&lt;/component&gt;
&lt;/keep-alive&gt;

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            currentVie<span class="hljs-variable">w:</span> Test //Test为引入的子组件
        }
    }
})</code></pre>
<p>不过此种方式并无太大的实用意义。</p>
<h3 id="articleHeader1">2. 生命周期钩子</h3>
<p>被包含在 <code>&lt;keep-alive&gt;</code> 中创建的组件，会多出两个生命周期的钩子: <code>activated</code> 与 <code>deactivated</code></p>
<ul><li><p>activated</p></li></ul>
<p>在组件被激活时调用，<strong>在组件第一次渲染时也会被调用</strong>，之后每次keep-alive激活时被调用。</p>
<ul><li><p>deactivated</p></li></ul>
<p>在组件被停用时调用。</p>
<blockquote><p>注意：只有组件被 <code>keep-alive</code> 包裹时，这两个生命周期才会被调用，如果作为正常组件使用，是不会被调用，以及在 <code>2.1.0</code> 版本之后，使用 <code>exclude</code> 排除之后，就算被包裹在 <code>keep-alive</code> 中，这两个钩子依然不会被调用！另外在服务端渲染时此钩子也不会被调用的。</p></blockquote>
<h3 id="articleHeader2">3. 配合router-view使用</h3>
<p>有些时候可能需要将整个路由页面一切缓存下来，也就是将 <code>&lt;router-view&gt;</code> 进行缓存。这种使用场景还是蛮多的。</p>
<p>在vue <code>2.1.0</code> 之前，大部分是这样实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- template -->
<keep-alive>
    <router-view v-if=&quot;$router.meta.keepAlive&quot;></router-view>
</keep-alive>
<router-view v-if=&quot;!$router.meta.keepAlive&quot;></router-view>

//router配置
new Router({
    routes: [
        {
            name: 'a',
            path: '/a',
            component: A,
            meta: {
                keepAlive: true
            }
        },
        {
            name: 'b',
            path: '/b',
            component: B
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!-- template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"$router.meta.keepAlive"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!$router.meta.keepAlive"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>

//router配置
new Router(</span><span class="hljs-template-variable">{
    routes: [
        {
            name: 'a',
            path: '/a',
            component: A,
            meta: {
                keepAlive: true
            }</span><span class="xml">
        },
        </span><span class="hljs-template-variable">{
            name: 'b',
            path: '/b',
            component: B
        }</span><span class="xml">
    ]
})</span></code></pre>
<p>这样配置路由的路由元信息之后，a路由的 <code>$router.meta.keepAlive</code> 便为 <code>true</code> ，而b路由则为 <code>false</code> 。<br>所以为 <code>true</code> 的将被包裹在 <code>keep-alive</code> 中，为 <code>false</code> 的则在外层。这样a路由便达到了被缓存的效果，如果还有想要缓存的路由，只需要在路由元中加入 <code>keepAlive: true</code> 即可。</p>
<h3 id="articleHeader3">4. 在2.1.0版本之后</h3>
<p>在vue <code>2.1.0</code> 版本之后，<code>keep-alive</code> 新加入了两个属性: <code>include</code>(包含的组件缓存生效) 与 <code>exclude</code>(排除的组件不缓存，优先级大于include) 。</p>
<p><code>include</code> 和 <code>exclude</code> 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。<br>当使用正则或者是数组时，一定要使用 <code>v-bind</code> !</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 逗号分隔字符串，只有组件a与b被缓存。这样使用场景变得更有意义了 -->
<keep-alive include=&quot;a,b&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>

<!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
<keep-alive :include=&quot;/a|b/&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>

<!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
<keep-alive :include=&quot;['a', 'b']&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 逗号分隔字符串，只有组件a与b被缓存。这样使用场景变得更有意义了 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">"a,b"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">"/a|b/"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Array (需要使用 v-bind，被包含的都会被缓存) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">"['a', 'b']"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<p>有了include之后，再与 <code>router-view</code> 一起使用时便方便许多了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 一个include解决了，不需要多写一个标签，也不需要在路由元中添加keepAlive了 -->
<keep-alive include='a'>
    <router-view></router-view>
</keeo-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 一个include解决了，不需要多写一个标签，也不需要在路由元中添加keepAlive了 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">'a'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keeo-alive</span>&gt;</span></code></pre>
<h3 id="articleHeader4">4. 需要注意的地方</h3>
<ol>
<li><p><code>&lt;keep-alive&gt;</code> 先匹配被包含组件的 <code>name</code> 字段，如果 <code>name</code> 不可用，则匹配当前组件 <code>componetns</code> 配置中的注册名称。</p></li>
<li><p><code>&lt;keep-alive&gt;</code> 不会在函数式组件中正常工作，因为它们没有缓存实例。</p></li>
<li><p>当匹配条件同时在 <code>include</code> 与 <code>exclude</code> 存在时，以 <code>exclude</code> 优先级最高(当前vue 2.4.2 version)。比如：包含于排除同时匹配到了组件A，那组件A不会被缓存。</p></li>
<li><p>包含在 <code>&lt;keep-alive&gt;</code> 中，但符合 <code>exclude</code> ，不会调用<code>activated</code> 和 <code>deactivated</code>。</p></li>
</ol>
<h3 id="articleHeader5">以上, 致那颗骚动的心……</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
keep-alive的深入理解与使用(配合router-view缓存整个路由页面)

## 原文链接
[https://segmentfault.com/a/1190000010546663](https://segmentfault.com/a/1190000010546663)

