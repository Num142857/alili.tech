---
title: '高级 Vue 组件模式 (6)' 
date: 2019-02-13 2:31:23
hidden: true
slug: bdid00xzvy7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">06 通过 directive 增强组件内容</h2>
<h3 id="articleHeader1">目标</h3>
<p>之前的五篇文章中，<code>switch</code> 组件一直是被视为内部组件存在的，细心的读者应该会发现，这个组件除了帮我们提供开关的交互以外，还会根据当前 <code>toggle</code> 的开关状态，为 <code>button</code> 元素增加 <code>aria-expanded</code> 属性，以 <code>aira</code> 开头的属性叫作内容增强属性，它用于描述当前元素的某种特殊状态，帮助残障人士更好地浏览网站内容。</p>
<p>但是，作为组件调用者，未必会对使用这种相关属性对网站内容进行增强，那么如何更好地解决这个问题呢？答案就是使用 directive。</p>
<p>我们期望能够显示地声明当前的元素是一个 <code>toggler</code> 职能的组件或者元素，这个组件或者元素，可以根据当前 <code>toggle</code> 组件的开关状态，动态地更新它本身的 <code>aria-expanded</code> 属性，以便针对无障碍访问提供适配。</p>
<h3 id="articleHeader2">实现</h3>
<h4>简单实现</h4>
<p>首先创建一个 toggler 指令函数，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function(el, binding, vnode) {
  const on = binding.value

  if (on) {
    el.setAttribute(`aria-expanded`, true);
  } else {
    el.removeAttribute(`aria-expanded`, false);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding, vnode</span>) </span>{
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">on</span> = binding.value

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">on</span>) {
    el.setAttribute(<span class="hljs-string">`aria-expanded`</span>, <span class="hljs-literal">true</span>);
  } <span class="hljs-title">else</span> {
    el.removeAttribute(<span class="hljs-string">`aria-expanded`</span>, <span class="hljs-literal">false</span>);
  }
}</code></pre>
<p>这个指令函数很简单，就是通过传入指令的表达式的值来判定，是否在当前元素上增加一个 <code>aria-expanded</code> 属性。之后再 <code>app</code> 引入该指令，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="directives: {
  toggler
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">directives:</span> {
  toggler
}</code></pre>
<p>之后就可以在 <code>app</code> 组件的模板中使用该指令了，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<custom-button v-toggler=&quot;status.on&quot; ref=&quot;customButton&quot; :on=&quot;status.on&quot; :toggle=&quot;toggle&quot;></custom-button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;custom-button v-toggler=<span class="hljs-string">"status.on"</span> ref=<span class="hljs-string">"customButton"</span> <span class="hljs-symbol">:on=<span class="hljs-string">"status.on"</span></span> <span class="hljs-symbol">:toggle=<span class="hljs-string">"toggle"</span>&gt;&lt;/custom-button&gt;</span></code></pre>
<p>一切都将按预期中运行，当 <code>toggle</code> 组件的状态为开时，<code>custom-button</code> 组件的根元素会增加一个 <code>aria-expanded="true"</code> 的内容增强属性。</p>
<p>Note: 这里关于指令的引入，使用的函数简写的方式，会在指令的 bind 和 update 钩子函数中触发相同的逻辑，vue 中的指令包含 5 个不同的钩子函数，这里就不赘述了，不熟悉的读者可以通过阅读官方文档来了解。</p>
<h4>注入当前组件实例</h4>
<p>上文中的指令会通过 <code>binding.value</code> 来获取 <code>toggle</code> 组件的开关状态，这样虽然可行，但在使用该指令时，<code>custom-button</code> 本身的 prop 属性 <code>on</code> 已经代表了当前的开关状态，能否直接在指令中获取当前所绑定的组件实例呢？答案是可以的。指令函数的第三个参数即为当前所绑定组件的虚拟 dom 节点实例，其 componentInstance 属性指向当前组件实例，所以可以将之前的指令改版如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function(el, binding, vnode) {
  const comp = vnode.componentInstance;
  const on = binding.value || comp.on;

  if (on) {
    el.setAttribute(`aria-expanded`, true);
  } else {
    el.removeAttribute(`aria-expanded`, false);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding, vnode</span>) </span>{
  <span class="hljs-keyword">const</span> comp = vnode.componentInstance;
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">on</span> = binding.value || comp.on;

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">on</span>) {
    el.setAttribute(<span class="hljs-string">`aria-expanded`</span>, <span class="hljs-literal">true</span>);
  } <span class="hljs-title">else</span> {
    el.removeAttribute(<span class="hljs-string">`aria-expanded`</span>, <span class="hljs-literal">false</span>);
  }
}</code></pre>
<p>这样，即使不向指令传入表达式，它也可以自动去注入当前修饰组件所拥有的 prop 属性 on 的值，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<custom-button v-toggler ref=&quot;customButton&quot; :on=&quot;status.on&quot; :toggle=&quot;toggle&quot;></custom-button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;custom-button v-toggler ref=<span class="hljs-string">"customButton"</span> <span class="hljs-symbol">:on=<span class="hljs-string">"status.on"</span></span> <span class="hljs-symbol">:toggle=<span class="hljs-string">"toggle"</span>&gt;&lt;/custom-button&gt;</span></code></pre>
<h4>提供更多灵活性</h4>
<p>指令函数的第二个参数除了可以获取传入指令内部的表达式的值以外，还有其他若干属性，比如 name、arg、modifiers等，详细说明可以去参考官方文档。</p>
<p>为了尽可能地使指令保证灵活性，我们期望可以自定义无障碍属性 aria 的后缀名称，比如叫做 <code>aria-on</code>，这里我们可以通过 arg 这个参数轻松实现，改版如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function(el, binding, vnode) {
  const comp = vnode.componentInstance;
  const suffix = binding.arg || &quot;expanded&quot;;
  const on = binding.value || comp.on;

  if (on) {
    el.setAttribute(`aria-${suffix}`, true);
  } else {
    el.removeAttribute(`aria-${suffix}`, false);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding, vnode</span>) </span>{
  <span class="hljs-keyword">const</span> comp = vnode.componentInstance;
  <span class="hljs-keyword">const</span> suffix = binding.arg || <span class="hljs-string">"expanded"</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">on</span> = binding.value || comp.on;

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">on</span>) {
    el.setAttribute(<span class="hljs-string">`aria-<span class="hljs-subst">${suffix}</span>`</span>, <span class="hljs-literal">true</span>);
  } <span class="hljs-title">else</span> {
    el.removeAttribute(<span class="hljs-string">`aria-<span class="hljs-subst">${suffix}</span>`</span>, <span class="hljs-literal">false</span>);
  }
}</code></pre>
<p>可以发现，这里通过 <code>binding.arg</code> 来获取无障碍属性的后缀名称，并当没有传递该参数时，降级至 <code>expanded</code>。这里仅仅是为了演示，读者有兴趣的话，还可以利用 binding 对象的其他属性提供更多的灵活性。</p>
<h3 id="articleHeader3">成果</h3>
<p>最终的运行结果就不用语言描述了，直接截了一个图，是 toggle 组件开关状态为开时的截图:<br><span class="img-wrap"><img data-src="/img/bVbisGN?w=952&amp;h=142" src="https://static.alili.tech/img/bVbisGN?w=952&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/x3yj248w8w" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-6" rel="nofollow noreferrer" target="_blank">part-6</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>关于指令的概念，我自身还是在 angularjs(v1.2以下版本) 中第一次接触，当时其实不兴组件化开发这个概念，指令本身的设计理念也是基于<strong>增强</strong>这个概念的，即增强某个 html 标签。到后来兴起了组件化开发的开发思想，指令似乎是随着 angularjs 的没落而消失了踪影。</p>
<p>但仔细想想的话，web 开发流程中，并不是所有的场景都可以拿组件来抽象和描述的，比如说，你想提供一个类似高亮边框的公用功能，到底如何来按组件化的思想抽象它呢？这时候使用指令往往是一个很好的切入点。</p>
<p>因此，当你面临解决的问题，颗粒度小于组件化抽象的粒度，同时又具备复用性，那就大胆的使用指令来解决它吧。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (6)

## 原文链接
[https://segmentfault.com/a/1190000016754202](https://segmentfault.com/a/1190000016754202)

