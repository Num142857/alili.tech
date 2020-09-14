---
title: '在Vue工作流中使用CSS Modules' 
date: 2019-02-01 2:30:10
hidden: true
slug: yxoqi8usq1c
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">CSS在工程化上的一些问题</h3>
<p>关于React的CSS in JS，有一个<a href="https://speakerdeck.com/vjeux/react-css-in-js" rel="nofollow noreferrer" target="_blank">著名的talk</a>，由Facebook的工程师<a href="https://github.com/vjeux" rel="nofollow noreferrer" target="_blank">vjeux</a>带来。</p>
<p>里面最有名的一张slide是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007468607?w=1490&amp;h=1122" src="https://static.alili.tech/img/remote/1460000007468607?w=1490&amp;h=1122" alt="css in js" title="css in js" style="cursor: pointer; display: inline;"></span></p>
<p>里面列举了CSS的一些问题。其中，Dead Code Elimination，Minification，和Sharing Constants这些问题我们已经通过在我们的工作流中加入SASS和PostCSS这样的CSS预处理器解决了。</p>
<p>然而还有一些问题没有解决，比如全局命名空间。同一个document下的所有CSS的类名，都是在同一个“作用域”下的，因此我们常常要考虑如何避免命名冲突问题。现有的解决办法主要是靠BEM这样的命名惯例，或者是用多层CSS父子选择器来模拟命名空间。然而这样的办法对工程师有许多的限制。多级选择器有比较高的优先级，不容易维护。</p>
<h3 id="articleHeader1">解决全局作用域：Webpack css-loader</h3>
<p>Webpack的css-loader首先做出了解决全局作用域的尝试。解决办法就是在写CSS类名时加入<code>:local(...)</code>这样的标记。</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":local(.className) { background: red; }
:local .className { color: green; }
:local(.className .subClass) { color: green; }
:local .className .subClass :global(.global-class-name) { color: blue; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-meta">:local(.className) { background:</span> red; }
<span class="hljs-meta">:local .className { color:</span> green; }
<span class="hljs-meta">:local(.className .subClass) { color:</span> green; }
<span class="hljs-meta">:local .className .subClass :global(.global-class-name)</span> { color: blue; }</code></pre>
<p>会被转化为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="._23_aKvs-b8bW2Vg3fwHozO { background: red; }
._23_aKvs-b8bW2Vg3fwHozO { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name { color: blue; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">._23_aKvs-b8bW2Vg3fwHozO</span> { <span class="hljs-attribute">background</span>: red; }
<span class="hljs-selector-class">._23_aKvs-b8bW2Vg3fwHozO</span> { <span class="hljs-attribute">color</span>: green; }
<span class="hljs-selector-class">._23_aKvs-b8bW2Vg3fwHozO</span> <span class="hljs-selector-class">._13LGdX8RMStbBE9w-t0gZ1</span> { <span class="hljs-attribute">color</span>: green; }
<span class="hljs-selector-class">._23_aKvs-b8bW2Vg3fwHozO</span> <span class="hljs-selector-class">._13LGdX8RMStbBE9w-t0gZ1</span> <span class="hljs-selector-class">.global-class-name</span> { <span class="hljs-attribute">color</span>: blue; }</code></pre>
<p>这里的办法就是把CSS类名转化为hash字符串，这样就可以保证每个类名都是独一无二的，自然也就不用在意命名冲突的问题了。只要在类名在当前模块内不会相互冲突就可以了。</p>
<h3 id="articleHeader2">CSS Modules</h3>
<p>上述的办法，还是有一些不便。大多数情况下，比如在JavaScript中，变量都默认是局部变量。你想要声明一个全局变量，只能去全局作用域声明，或者把变量挂到local上（非严格模式下，不写var声明的是全局变量这种坑就不说了）。</p>
<p>Webpack的开发者之后将css-loader中的local变成了默认设定，于是CSS Modules这个规范就呼之欲出了。</p>
<p><a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">CSS Modules规范</a>。我们可以通过<code>css-loader?modules</code>这个参数来开启CSS Modules。</p>
<p>CSS Modules中的类名默认就是local的，如果你想要声明全局类名，可以加上<code>:global(...)</code>这个标记。</p>
<h3 id="articleHeader3">Single Responsibility Principle</h3>
<p>讲CSS Modules的下一个特性之前。我们先聊点其他的，我们知道设计模式中有一条叫做Single Responsibility Principle。</p>
<p>比如我们有一个button：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
    display:inline-block;
    padding:2em;
    background-color:red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.button</span> {
    <span class="hljs-attribute">display</span>:inline-block;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">2em</span>;
    <span class="hljs-attribute">background-color</span>:red;
}</code></pre>
<p>与其把这些属性写在一个class里，我们可以把它拆分成多个单独的class：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
    display:inline-block;
}
.button--large{
    padding:2em;
}
.button--warnning{
    background-color:red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.button</span> {
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.button--large</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">2em</span>;
}
<span class="hljs-selector-class">.button--warnning</span>{
    <span class="hljs-attribute">background-color</span>:red;
}</code></pre>
<p>然后在HTML中组合使用就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;button button--large button--warnning&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">&lt;button <span class="hljs-keyword">class</span>=<span class="hljs-string">"button button--large button--warnning"</span>&gt;</code></pre>
<p>这样的好处是什么呢？我们的UI中，一个组件往往有很多不同的状态。如果我们将每一个class写成只专注于一个属性，做好一件事，那就可以用这些class组合成所有我们想要的不同状态的组件。相比给每个状态的组件写一个单独的class，代码要更优雅简洁一些。</p>
<p>比如我们想要一个small尺寸的普通button，只要加两个class:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button {
    display:inline-block;
}
.button--small{
    padding:1em;
}
.button--large{
    padding:2em;
}
.button--normal{
    background-color:blue;
}
.button--warnning{
    background-color:red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.button</span> {
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.button--small</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">1em</span>;
}
<span class="hljs-selector-class">.button--large</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">2em</span>;
}
<span class="hljs-selector-class">.button--normal</span>{
    <span class="hljs-attribute">background-color</span>:blue;
}
<span class="hljs-selector-class">.button--warnning</span>{
    <span class="hljs-attribute">background-color</span>:red;
}</code></pre>
<p>然后组合就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;button button--small button--normal&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">&lt;button <span class="hljs-keyword">class</span>=<span class="hljs-string">"button button--small button--normal"</span>&gt;</code></pre>
<h3 id="articleHeader4">CSS Classes Composing</h3>
<p>要想实现上述的这种组合，可以使用SASS的Mixin，但Mixin主要是提供了源代码中的抽象，最后生成的代码，和手写不同状态class的代码量，是一样的。</p>
<p>CSS Modules提供的Classes Composing则刚好可以满足我们的需求。</p>
<p>比如我们想渲染一段文字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".text{
  font-size: 20px;
  composes: red from &quot;./common/color.css&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.text</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">composes</span>: red from <span class="hljs-string">"./common/color.css"</span>;
}</code></pre>
<p>color.css里是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".red{
    color: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.red</span>{
    <span class="hljs-attribute">color</span>: red;
}</code></pre>
<p>最后渲染出的class是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;App-text-2AEnE_0 color-red-3ag3h_0&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"App-text-2AEnE_0 color-red-3ag3h_0"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><code>composes</code>引入的类被作为一个单独的class引入，而不是和text类合在一起。</p>
<h3 id="articleHeader5">CSS Modules和Vue工作流的整合</h3>
<p>Vue-loader在v9.8.0之后加入了对CSS Modules的支持。</p>
<p>我们只要在<code>.vue</code>文件的<code>&lt;style&gt;</code>处加一个<code>module</code>就行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot; module>
.text{
  font-size: 20px;
  composes: red from &quot;sass!./common/color.scss&quot;;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span> <span class="hljs-attr">module</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.text</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">composes</span>: red from <span class="hljs-string">"sass!./common/color.scss"</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这里有一点要注意，就是<code>composes</code>引入的如果是需要预处理器处理的，要在前面加上预处理器的标记，比如SASS用户就加上<code>sass!</code>。</p>
<p>如果需要对CSS Modules进行一些配置（其实这个是对Webpack的css-loader的配置，所以配置时可以参考<a href="https://github.com/webpack/css-loader" rel="nofollow noreferrer" target="_blank">css-loader的文档</a>），写在vue-loader的配置的<code>cssModules</code>属性里即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader: 'vue',
options: {
    cssModules: {
        localIdentName: '[name]-[local]-[hash:base64:5]',
        camelCase: true
    }
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">loader</span>: <span class="hljs-string">'vue'</span>,
<span class="hljs-attribute">options</span>: {
    <span class="hljs-attribute">cssModules</span>: {
        <span class="hljs-attribute">localIdentName</span>: <span class="hljs-string">'[name]-[local]-[hash:base64:5]'</span>,
        <span class="hljs-attribute">camelCase</span>: true
    }
}    </code></pre>
<p>vue-loader会自动将一个<code>$style</code>属性注入到对应的Vue实例中。在模板中用class binding语法写就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div :class=&quot;$style.app&quot;>
    <div :class=&quot;$style.text&quot;>
      some text
    </div>
    <main-text></main-text>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
  &lt;<span class="hljs-keyword">div</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"$style.app"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"$style.text"</span>&gt;
      <span class="hljs-keyword">some</span> <span class="hljs-built_in">text</span>
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;main-<span class="hljs-built_in">text</span>&gt;&lt;/main-<span class="hljs-built_in">text</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<p><code>$style</code>其实是一个原class名和处理之后class名的hash，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  app: &quot;App-app-3cl75_0&quot;,
  text: &quot;App-text-2AEnE_0 color-red-3ag3h_0&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">app</span>: <span class="hljs-string">"App-app-3cl75_0"</span>,
  text: <span class="hljs-string">"App-text-2AEnE_0 color-red-3ag3h_0"</span>
}</code></pre>
<p>我写一了一个简单的<a href="https://github.com/zxc0328/css-modules-demo" rel="nofollow noreferrer" target="_blank">DEMO仓库</a>，可以供参考。</p>
<h3 id="articleHeader6">结语</h3>
<p>CSS Modules可以解决全局作用域和Class组合两个问题，加上SASS等预处理器，着实让我们在写CSS时的工程化程度大大提高了。</p>
<p>对于使用Vue的同学来说，vue-loader可以使CSS Modules可以轻松的整合到已有的工作流中。如果你正在使用Vue，可以试试使用CSS Modules。</p>
<h3 id="articleHeader7">Links</h3>
<ul>
<li><p><a href="http://glenmaddern.com/articles/css-modules" rel="nofollow noreferrer" target="_blank">CSS Modules Welcome to the Future</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=zR1lOuyQEt8&amp;index=29&amp;list=LLHdx8Qwo6uxw0fj3gQ5yeTg" rel="nofollow noreferrer" target="_blank">The case for CSS modules - Mark Dalgleish</a></p></li>
<li><p><a href="https://speakerdeck.com/vjeux/react-css-in-js" rel="nofollow noreferrer" target="_blank">React: CSS in JS by vjeux</a></p></li>
</ul>
<p><strong><a href="http://zxc0328.github.io/2016/11/12/css-modules/" rel="nofollow noreferrer" target="_blank">博客原文链接</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Vue工作流中使用CSS Modules

## 原文链接
[https://segmentfault.com/a/1190000007468604](https://segmentfault.com/a/1190000007468604)

