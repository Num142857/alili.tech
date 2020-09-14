---
title: '高级 Vue 组件模式 (5)' 
date: 2019-02-13 2:31:23
hidden: true
slug: 65bpy8zwdu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">05 使用 $refs 访问子组件引用</h2>
<h3 id="articleHeader1">目标</h3>
<p>在之前的文章中，详细阐述了子组件获取父组件所提供属性及方法的一些解决方案，如果我们想在父组件之中访问子组件的一些方法和属性怎么办呢？设想以下一个场景：</p>
<ul>
<li>当前的 custom-button 组件中，有一个 input 元素</li>
<li>我们期望当 toggle 的开关状态为<strong>开</strong>时，显示 input 元素并自动获得焦点</li>
</ul>
<p>这里要想完成目标，需要获取某个组件或者每个元素的引用，在不同的 mvvm 框架中，都提供了相关特性来完成这一点：</p>
<ul>
<li>angularjs: 可以使用依赖注入的 $element 服务</li>
<li>Angular: 可以使用 ViewChild、ContentChild 或者 template ref 来获取引用</li>
<li>react: 使用 <code>ref</code> 属性声明获取引用的逻辑</li>
</ul>
<p>在 vue 中，获取引用的方法与 react 类似，通过声明 <code>ref</code> 属性来完成。</p>
<h3 id="articleHeader2">实现</h3>
<p>首先，在 <code>custom-button</code> 组件中增加一个 input 元素，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-if=&quot;on&quot; ref=&quot;input&quot; type=&quot;text&quot; placeholder=&quot;addtional messages&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">input</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"on"</span> <span class="hljs-keyword">ref</span>=<span class="hljs-string">"input"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> placeholder=<span class="hljs-string">"addtional messages"</span>&gt;</code></pre>
<p>注意这里的 <code>ref="input"</code>，这样在组件内部，可以通过 <code>this.$refs.input</code> 获得该元素的引用，为了实现目标中提及的需求，再添加一个新的方法 <code>focus</code> 来使 input 元素获取焦点，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="focus() {
  this.$nextTick(function() {
    this.$refs.input.focus();
  });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>focus() {
  <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.$refs.input.focus();
  });
},</code></pre>
<p>注意这里的 <code>this.$nextTick</code>，正常情况下，直接调用 input 的 <code>focus</code> 方法是没有问题的，然而却不行。因为 input 的渲染逻辑取决于 prop 属性 on 的状态，如果直接调用 <code>focus</code> 方法，这时 input 元素的渲染工作很可能还未结束，这时 <code>this.$refs.input</code> 所指向的引用值为 <code>undefined</code>，继续调用方法则会抛出异常，因此我们利用 <code>this.$nextTick</code> 方法，将调用的逻辑延迟至下次 DOM 更新循环之后执行。</p>
<p>同理，在 <code>app</code> 组件中，为 <code>custom-button</code> 添加一个 <code>ref</code> 属性，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<custom-button ref=&quot;customButton&quot; :on=&quot;status.on&quot; :toggle=&quot;toggle&quot;></custom-button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;custom-button ref=<span class="hljs-string">"customButton"</span> <span class="hljs-symbol">:on=<span class="hljs-string">"status.on"</span></span> <span class="hljs-symbol">:toggle=<span class="hljs-string">"toggle"</span>&gt;&lt;/custom-button&gt;</span></code></pre>
<p>之后修改 <code>onToggle</code> 方法中的逻辑以满足目标中的需求，当 <code>toggle</code> 组件状态为开时，调用 <code>custom-button</code> 组件的 <code>focus</code> 方法，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onToggle(on) {
  if (on) this.$refs.customButton.focus();
  console.log(&quot;toggle&quot;, on);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>onToggle(<span class="hljs-keyword">on</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">on</span>) this.$refs.customButton.focus();
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"toggle"</span>, <span class="hljs-keyword">on</span>);
}</code></pre>
<h3 id="articleHeader3">成果</h3>
<p>点击按钮会发现，每当开关为开时，input 元素都会显示，并会自动获得焦点。</p>
<p>你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/vmww2rk1m7" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-5" rel="nofollow noreferrer" target="_blank">part-5</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>当期望获得子元素或者子组件的引用时，切记使用 ref 和 $refs 来解决问题。文章中所举例子的交互，在实际场景中很常见，比如：</p>
<ul>
<li>当通过一个 icon 触发搜索框时，期望自动获得焦点</li>
<li>当表单校验失败时，期望自动获得发生错误的表单项的焦点</li>
<li>当复杂列表的筛选器展开时，期望第一个筛选单元获得焦点</li>
</ul>
<p>这几种情况下，都可以使用该模式来高效地解决问题，而不是通过使用 DOM 中的 api 或者引入 jquery 获取相关元素再进行操作。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (5)

## 原文链接
[https://segmentfault.com/a/1190000016752855](https://segmentfault.com/a/1190000016752855)

