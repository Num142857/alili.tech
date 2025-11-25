---
title: '高级 Vue 组件模式 (7)' 
date: 2019-02-14 2:30:37
hidden: true
slug: wztzaq160rk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">07 使用 State Initializers</h2>
<h3 id="articleHeader1">目标</h3>
<p>到目前为止，仅从 <code>toggle</code> 组件自身的角度来看，它已经可以满足大多数的业务场景了。但我们会发现一个问题，就是当前 <code>toggle</code> 组件的状态对于调用者来说，完全是黑盒状态，即调用者无法初始化，也无法更改组件的开关状态，这在一些场景无法满足需求。</p>
<p>对于无法初始化开关状态的问题，倒是很好解决，我们可以在 <code>toggle</code> 组件声明一个 prop 属性 <code>on</code> 来代表组件的默认开关状态，同时在 <code>mounted</code> 生命周期函数中将这个默认值同步到组件 data 相应的属性中去。</p>
<p>对于无法更改开关状态的问题，似乎无法简单通过声明一个 <code>prop</code> 属性的方式来解决，并且如果我们期望的更改逻辑是异步的话，同样无法满足。</p>
<p>因此这篇文章着重来解决这两个问题：</p>
<ul>
<li>
<code>toggle</code> 组件能够支持开关状态的初始化功能</li>
<li>
<code>toggle</code> 组件能够提供一个 <code>reset</code> 方法以供重置开关状态</li>
<li>重置开关状态可以以异步的方式进行</li>
</ul>
<h3 id="articleHeader2">实现</h3>
<h4>初始化开关状态</h4>
<p>为了使 <code>toggle</code> 组件能够支持默认状态的传入，我们采用声明 prop 属性的方式，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on: {
  type: Boolean,
  default: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">on:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  type:</span> <span class="hljs-string">Boolean,</span>
<span class="hljs-attr">  default:</span> <span class="hljs-literal">false</span>
<span class="hljs-string">}</span></code></pre>
<p>之后在其 <code>mounted</code> 生命周期对开关状态进行同步，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
    this.status.on = this.on;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>mounted() {
    <span class="hljs-keyword">this</span>.status.<span class="hljs-literal">on</span> = <span class="hljs-keyword">this</span>.<span class="hljs-literal">on</span>;
  }</code></pre>
<p>这样当我们期望 <code>toggle</code> 以<strong>开</strong>的状态进行渲染时，可以这样调用组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<toggle :on=&quot;true&quot; @toggle=&quot;onToggle&quot;>
  ...
</toggle>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;toggle :<span class="hljs-keyword">on</span>=<span class="hljs-string">"true"</span> @toggle=<span class="hljs-string">"onToggle"</span>&gt;
  ...
&lt;/toggle&gt;</code></pre>
<h4>重置开关状态</h4>
<p>为了能够从外部更改 <code>toggle</code> 组件的开关状态，我们可以在组件内部声明一个观测 <code>on</code> prop 属性的监听器，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  on(val){
    // do something...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>watch: {
  on(val){
    <span class="hljs-regexp">//</span> <span class="hljs-keyword">do</span> something...
  }
}</code></pre>
<p>但如果这么做，会存在一个问题，即目标中关于开关状态的更改逻辑的编写者是<strong>组件调用者</strong>，而 watch 函数的编写者是<strong>组件实现者</strong>，由于实现者无法预知调用者更改状态的逻辑，所以使用 watch 是无法满足条件的。</p>
<p>让我们换一个角度来思考问题，既然实现者无法预知调用者的逻辑，何不把重置开关状态的逻辑全部交由调用者来实现？别忘了 Vue 组件也是可以传入 Function 类型的 <code>prop</code> 属性的，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onReset: {
  type: Function,
  default: () => this.on
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>onReset: {
  <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Function</span>,
  <span class="hljs-keyword">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.on
},</code></pre>
<p>这样就将提供重置状态的逻辑暴露给了组件调用者，当然，如果调用者没有提供相关重置逻辑，组件内部会自动降级为使用 <code>on</code> 属性来作为重置的状态值。</p>
<p>组件内部额外声明一个 reset 方法，在其内部重置当前的开关状态，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reset(){
  this.status.on = this.onReset(this.status.on)
  this.$emit(&quot;reset&quot;, this.status.on)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">reset</span><span class="hljs-params">()</span></span>{
  this<span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.on</span> = this.onReset(this<span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.on</span>)
  this.<span class="hljs-variable">$emit</span>(<span class="hljs-string">"reset"</span>, this<span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.on</span>)
}</code></pre>
<p>这里会首先以当前开关状态为参数，调用 <code>onReset</code> 方法，再将返回值赋值给当前状态，并触发一个 <code>reset</code> 事件以供父组件订阅。</p>
<p>之后在 app 组件中，可以按如下方式传入 <code>onReset</code> 函数，并编写具体的重置逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// template
<toggle :on=&quot;false&quot; @toggle=&quot;onToggle&quot; :on-reset=&quot;resetToTrue&quot;>
...
</toggle>

// script
...
resetToTrue(on) {
  return true;
},
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// template</span>
&lt;toggle :<span class="hljs-keyword">on</span>=<span class="hljs-string">"false"</span> @toggle=<span class="hljs-string">"onToggle"</span> :<span class="hljs-keyword">on</span><span class="hljs-params">-reset</span>=<span class="hljs-string">"resetToTrue"</span>&gt;
<span class="hljs-params">...</span>
&lt;/toggle&gt;

<span class="hljs-comment">// script</span>
<span class="hljs-params">...</span>
resetToTrue(<span class="hljs-keyword">on</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
},
<span class="hljs-params">...</span></code></pre>
<p>运行效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiIx4?w=145&amp;h=89" src="https://static.alili.tech/img/bVbiIx4?w=145&amp;h=89" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>支持异步重置</h4>
<p>在实现同步重置的基础上，实现异步重置十分简单，通常情况下，处理异步较好的方式是使用 Promise，使用 callback 也可以，使用 Observable 也是不错的选择，这里我们选择 Promise。</p>
<p>由于要同时处理同步和异步两种情况，只需把同步情况视为异步情况即可，比如以下两种情况在效果上是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sync
this.status.on = this.onReset(this.status.on)

// async
Promise.resolve(this.onReset(this.status.on))
    .then(on => {
      this.status.on = on
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// sync</span>
<span class="hljs-keyword">this</span>.status.<span class="hljs-keyword">on</span> = <span class="hljs-keyword">this</span>.onReset(<span class="hljs-keyword">this</span>.status.<span class="hljs-keyword">on</span>)

<span class="hljs-comment">// async</span>
Promise.resolve(<span class="hljs-keyword">this</span>.onReset(<span class="hljs-keyword">this</span>.status.<span class="hljs-keyword">on</span>))
    .then(<span class="hljs-keyword">on</span> =&gt; {
      <span class="hljs-keyword">this</span>.status.<span class="hljs-keyword">on</span> = <span class="hljs-keyword">on</span>
    })</code></pre>
<p>而 <code>onReset</code> 函数如果返回的是一个 <code>Promise</code> 实例的话，<code>Promise.resolve</code> 也会正确解析到当它为 <code>fullfill</code> 状态的值，这样关于 <code>reset</code> 方法我们改版如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reset(){
  Promise.resolve(this.onReset(this.status.on))
    .then(on => {
      this.status.on = on
      this.$emit(&quot;reset&quot;, this.status.on)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">reset</span><span class="hljs-params">()</span></span>{
  Promise.resolve(this.onReset(this<span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.on</span>))
    .then(on =&gt; {
      this<span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.on</span> = on
      this.<span class="hljs-variable">$emit</span>(<span class="hljs-string">"reset"</span>, this<span class="hljs-selector-class">.status</span><span class="hljs-selector-class">.on</span>)
    })
}</code></pre>
<p>在 app 组件中，可以传入一个异步的重置逻辑，这里就不贴代码了，直接上一个运行截图，组件会在点击重置按钮后 1 秒后，重置为<strong>开</strong>状态：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiIx3?w=145&amp;h=89" src="https://static.alili.tech/img/bVbiIx3?w=145&amp;h=89" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">成果</h3>
<p>你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/03vjr18zwv" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-7" rel="nofollow noreferrer" target="_blank">part-7</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>Function 类型的 prop 属性在一些情况下非常有用，比如文章中提及的状态初始化，这其实是工厂模式的一种体现，在其他的框架中也有体现，比如 React 中，HOC 中提及的 <code>render props</code> 就是一种比较具体的应用，Angular 在声明具有循环依赖的 Module 时，可以通过 <code>() =&gt; Module</code> 的方式进行声明等等。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (7)

## 原文链接
[https://segmentfault.com/a/1190000016815173](https://segmentfault.com/a/1190000016815173)

