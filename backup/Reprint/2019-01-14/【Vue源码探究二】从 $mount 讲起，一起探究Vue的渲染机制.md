---
title: '【Vue源码探究二】从 $mount 讲起，一起探究Vue的渲染机制' 
date: 2019-01-14 2:30:07
hidden: true
slug: yqcdkn9kcio
categories: [reprint]
---

{{< raw >}}

                    
<p>mount， 意思为挂载。可以理解为将vue实例（逻辑应用），挂靠在某个dom元素（载体）上的一个过程。</p>
<h2 id="articleHeader0">一、创建Vue实例时的渲染过程</h2>
<p>上一篇文章我们讲到， 在创建一个vue实例的时候(var vm = new Vue(options))。Vue的构造函数将自动运行 this._init（启动函数）。启动函数的最后一步为initRender(vm)，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Vue.prototype._init
    ...
    initLifecycle(vm);
    initEvents(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    initRender(vm);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// Vue.prototype._init</span>
    ...
    <span class="hljs-selector-tag">initLifecycle</span>(vm);
    <span class="hljs-selector-tag">initEvents</span>(vm);
    <span class="hljs-selector-tag">callHook</span>(vm, <span class="hljs-string">'beforeCreate'</span>);
    <span class="hljs-selector-tag">initState</span>(vm);
    <span class="hljs-selector-tag">callHook</span>(vm, <span class="hljs-string">'created'</span>);
    <span class="hljs-selector-tag">initRender</span>(vm);</code></pre>
<p>initRender中调用vm.$mount(vm.$options.el)，将实例挂载到dom上，至此启动函数完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//initRender
  ...
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//initRender</span>
  <span class="hljs-params">...</span>
  <span class="hljs-keyword">if</span> (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }</code></pre>
<p>可以看出，vm.$mount为vue渲染的主要函数</p>
<h2 id="articleHeader1">二、Vue的渲染机制</h2>
<p><span class="img-wrap"><img data-src="/img/bVNSij?w=1023&amp;h=761" src="https://static.alili.tech/img/bVNSij?w=1023&amp;h=761" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图，展示的是独立构建时的一个渲染流程图</p>
<p><strong>模板字符串</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//模板字符串
<div id = &quot;app&quot;>
  "{{"message"}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//模板字符串</span>
&lt;<span class="hljs-keyword">div</span> id = <span class="hljs-string">"app"</span>&gt;
  "{{"message"}}"
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><strong>render函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//render函数
function anonymous() {
with(this){return _h('div',{attrs:{&quot;id&quot;:&quot;app&quot;"}}",[&quot;\n  &quot;+_s(message)+&quot;\n&quot;])}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//render函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anonymous</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">with</span>(<span class="hljs-keyword">this</span>){<span class="hljs-keyword">return</span> _h(<span class="hljs-string">'div'</span>,{attrs:{<span class="hljs-string">"id"</span>:<span class="hljs-string">"app"</span>"}}",[<span class="hljs-string">"\n  "</span>+_s(message)+<span class="hljs-string">"\n"</span>])}
}</code></pre>
<p><strong>vnode</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVNSwj?w=278&amp;h=367" src="https://static.alili.tech/img/bVNSwj?w=278&amp;h=367" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>真实dom节点($el)</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVNSwT?w=146&amp;h=56" src="https://static.alili.tech/img/bVNSwT?w=146&amp;h=56" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">独立构建 与 运行时构建</h3>
<p>我们先看一下官方文档 <a href="https://cn.vuejs.org/v2/guide/installation.html#%E7%8B%AC%E7%AB%8B%E6%9E%84%E5%BB%BA-vs-%E8%BF%90%E8%A1%8C%E6%97%B6%E6%9E%84%E5%BB%BA" rel="nofollow noreferrer" target="_blank">独立构建和运行时构建</a></p>
<p><span class="img-wrap"><img data-src="/img/bVNSxk?w=906&amp;h=310" src="https://static.alili.tech/img/bVNSxk?w=906&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这两个概念，我在初学的时候是一头雾水。现在对照着渲染的流程图，我们可以知道</p>
<p><strong>独立构建：包含模板编译器</strong><br>渲染过程:  html字符串 → render函数 → vnode → 真实dom节点</p>
<p><strong>运行时构建： 不包含模板编译器</strong><br>渲染过程:  render函数 → vnode → 真实dom节点</p>
<p>运行时构建通过砍掉模板编译器，让整个包少了30%（官方数据）。我在阅读源码的过程中，发现vue源码7000余行，而和模板编译相关的代码，则约有1000行左右。看起来确实是轻便了。这是在鼓励我们多用render函数吗？</p>
<h2 id="articleHeader3">三、$mount函数</h2>
<p>上面我们说到，运行时构建的包，会比独立构建少一个模板编译器。在$mount函数上也不同</p>
<p>运行时构建的 $mount函数</p>
<p><span class="img-wrap"><img data-src="/img/bVNSz7?w=510&amp;h=160" src="https://static.alili.tech/img/bVNSz7?w=510&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而独立构建的 $mount函数，会先用一个临时变量mount保存上面的$mount方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mount = Vue$2.prototype.$mount;  //此处mount即为运行时版的 $mount" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">var mount = Vue<span class="hljs-variable">$2</span>.prototype.<span class="hljs-variable">$mount</span>;  <span class="hljs-regexp">//</span>此处mount即为运行时版的 <span class="hljs-variable">$mount</span></code></pre>
<p>然后重写$mount函数，这时，调用$mount就会包括模板编译功能了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mount = Vue$2.prototype.$mount;
Vue$2.prototype.$mount = function (el, hydrating) {
  ...省略代码（里面为模板编译器入口）...
  return mount.call(this, el, hydrating)
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> mount = Vue$<span class="hljs-number">2.</span>prototype.$mount;
Vue$<span class="hljs-number">2.</span>prototype.$mount = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, hydrating)</span> </span>{
  ...省略代码（里面为模板编译器入口）...
  <span class="hljs-keyword">return</span> mount.call(this, el, hydrating)
};
</code></pre>
<p>我们可以看到，不管独立构建还是运行时构建，都会调用 vm._mount方法我们来看看源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._mount = function(el, hydrating) {
    ...一些防止运行时的包，却用了template的报错代码...


    callHook(vm, 'beforeMount');

    vm._watcher = new Watcher(vm, function () {
      vm._update(vm._render(), hydrating);
    }, noop);
    
    hydrating = false;

    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm    
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>Vue.prototype._mount = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el, hydrating)</span> </span>{
    ...一些防止运行时的包，却用了template的报错代码...


    callHook(vm, <span class="hljs-string">'beforeMount'</span>);

    vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      vm._update(vm._render(), hydrating);
    }, noop);
    
    hydrating = <span class="hljs-keyword">false</span>;

    <span class="hljs-keyword">if</span> (vm.$vnode == <span class="hljs-keyword">null</span>) {
      vm._isMounted = <span class="hljs-keyword">true</span>;
      callHook(vm, <span class="hljs-string">'mounted'</span>);
    }
    <span class="hljs-keyword">return</span> vm    
    
}</code></pre>
<p>使用过的vue的人，都会很敏锐地发现， 在调用beforeMount生命周期，和mounted生命周期中间的关键代码为</p>
<p><span class="img-wrap"><img data-src="/img/bVNSPS?w=447&amp;h=112" src="https://static.alili.tech/img/bVNSPS?w=447&amp;h=112" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>鉴于大牛已经讲过很多次这里的数据监听了，我们只讲其中渲染部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm._update(vm._render(), hydrating);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">vm</span><span class="hljs-selector-class">._update</span>(<span class="hljs-selector-tag">vm</span><span class="hljs-selector-class">._render</span>(), <span class="hljs-selector-tag">hydrating</span>);</code></pre>
<p>vm._render函数返回一个vnode作为 vm._update的参数。  hydrating是与服务器渲染(SSR)相关的，浏览器端可以不用管。</p>
<p><strong>vm._render  (将render函数转化成vnode)</strong></p>
<p>最核心代码为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var render = vm.$options.render
try{
  vnode = render.call(vm._renderProxy, vm.$createElement);
}catch{
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>var <span class="hljs-keyword">render</span> = vm.$options.<span class="hljs-keyword">render</span>
try{
  vnode = <span class="hljs-keyword">render</span>.call(vm._renderProxy, vm.$createElement);
}<span class="hljs-keyword">catch</span>{
  ...
}</code></pre>
<p>此处，使用call方法， 将this指向 vm.renderProxy js功底差的同学要去补补知识了。  <br>vm.renderProxy是个代理，代理vm，主要用来报错，如果render函数上使用了vm上没有的属性或方法，就会报错。<br>vm.$createElement 这个是创建vnode的方法，作为第一个参数传入。</p>
<p><span class="img-wrap"><img data-src="/img/bVNSVq?w=867&amp;h=458" src="https://static.alili.tech/img/bVNSVq?w=867&amp;h=458" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">render函数</a><br>这里的h即是， vm.$createElement ，便是在vm._render这个阶段被传入。</p>
<p><strong>vm._update （将vnode生成真实dom节点）</strong></p>
<p>最关键一句话为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" vm.$el = vm.__patch__(prevVnode, vnode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;"> vm.$el = vm.__patch__(prevVnode, vnode)<span class="hljs-comment">;</span></code></pre>
<p>vm.__patch__也是个大家伙，我之后会再去研究。<br>里面的方法，将新旧vnode使用 diff算法进行比对，找出要替换的地方，这样更新dom的性能会有较大优化。<br>最后会返回一个dom节点。<br><strong>这个时候将vm.$el 赋值为这个dom节点，挂载完成！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Vue源码探究二】从 $mount 讲起，一起探究Vue的渲染机制

## 原文链接
[https://segmentfault.com/a/1190000009467029](https://segmentfault.com/a/1190000009467029)

