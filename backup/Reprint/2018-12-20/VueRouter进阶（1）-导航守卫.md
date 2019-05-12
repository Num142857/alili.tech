---
title: 'VueRouter进阶（1）-导航守卫' 
date: 2018-12-20 2:30:10
hidden: true
slug: owxnm1ud6o
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>主要用来通过跳转或取消的方式守卫导航。<br>例如判断登录信息：没登录全部跳到登录页。判断必要操作是否进行没进行的话中断跳转。</p>
<p>分为三大类：全局守卫、路由守卫、组件守卫</p>
<h2 id="articleHeader1">全局守卫</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 1. beforeEach
 2. beforeResolve
 3. afterEach" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>
 <span class="hljs-number">1.</span> beforeEach
 <span class="hljs-number">2.</span> beforeResolve
 <span class="hljs-number">3.</span> afterEach</code></pre>
<h2 id="articleHeader2">路由守卫</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. beforeEnter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-bullet">1. </span>beforeEnter</code></pre>
<h2 id="articleHeader3">组件守卫</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. beforeRouteEnter
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    虽然无法直接获取组件实力
    但是我们可以通过next参数的回调函数获取到当前实例进行操作
    beforeRouteEnter: (to, from, next) => {
        next((vm) => {
            //vm就是当前组件实例
        });
    }
 2. beforeRouteUpdate
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
 3. beforeRouteLeave
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code> <span class="hljs-number">1</span>. beforeRouteEnter
    <span class="hljs-regexp">//</span> 在渲染该组件的对应路由被 confirm 前调用
    <span class="hljs-regexp">//</span> 不！能！获取组件实例 `this`
    <span class="hljs-regexp">//</span> 因为当守卫执行前，组件实例还没被创建
    虽然无法直接获取组件实力
    但是我们可以通过<span class="hljs-keyword">next</span>参数的回调函数获取到当前实例进行操作
    beforeRouteEnter: (to, from, <span class="hljs-keyword">next</span>) =&gt; {
        <span class="hljs-keyword">next</span>((vm) =&gt; {
            <span class="hljs-regexp">//</span>vm就是当前组件实例
        });
    }
 <span class="hljs-number">2</span>. beforeRouteUpdate
    <span class="hljs-regexp">//</span> 在当前路由改变，但是该组件被复用时调用
    <span class="hljs-regexp">//</span> 举例来说，对于一个带有动态参数的路径 <span class="hljs-regexp">/foo/</span>:id，在 <span class="hljs-regexp">/foo/</span><span class="hljs-number">1</span> 和 <span class="hljs-regexp">/foo/</span><span class="hljs-number">2</span> 之间跳转的时候，
    <span class="hljs-regexp">//</span> 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
 <span class="hljs-number">3</span>. beforeRouteLeave
    <span class="hljs-regexp">//</span> 导航离开该组件的对应路由时调用
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`</code></pre>
<h2 id="articleHeader4">参数介绍</h2>
<p>这些导航守卫涉及到的参数：to、from、next<br>除了全局守卫的afterEach只有to和from外其余都有三个参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（摘抄自官网）
to: Route: 即将要进入的目标 路由对象

from: Route: 当前导航正要离开的路由

next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
    next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
    next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>（摘抄自官网）
<span class="hljs-keyword">to</span>: Route: 即将要进入的目标 路由对象

<span class="hljs-keyword">from</span>: Route: 当前导航正要离开的路由

<span class="hljs-keyword">next</span>: <span class="hljs-keyword">Function</span>: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 <span class="hljs-keyword">next</span> 方法的调用参数。

    <span class="hljs-keyword">next</span>(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
    <span class="hljs-keyword">next</span>(<span class="hljs-literal">false</span>): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 <span class="hljs-keyword">from</span> 路由对应的地址。
    <span class="hljs-keyword">next</span>(<span class="hljs-comment">'/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。</span>
    <span class="hljs-keyword">next</span>(<span class="hljs-keyword">error</span>): (<span class="hljs-number">2.4</span><span class="hljs-number">.0</span>+) 如果传入 <span class="hljs-keyword">next</span> 的参数是一个 <span class="hljs-keyword">Error</span> 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。</code></pre>
<h2 id="articleHeader5">运行机制</h2>
<p>上图（别问我图是谁）：（流程图通过<a href="https://www.processon.com" rel="nofollow noreferrer" target="_blank">https://www.processon.com</a> 进行绘制）<br><span class="img-wrap"><img data-src="/img/bV0SzG?w=371&amp;h=787" src="https://static.alili.tech/img/bV0SzG?w=371&amp;h=787" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VueRouter进阶（1）-导航守卫

## 原文链接
[https://segmentfault.com/a/1190000012563794](https://segmentfault.com/a/1190000012563794)

