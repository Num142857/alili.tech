---
title: '关于Angular样式封装' 
date: 2018-12-25 2:30:11
hidden: true
slug: ewh4m9l1qsi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">引导</h1>
<p>这是一个很简单的话题，但是你很难在搜索到一篇比较完整的介绍它的文章，或者说单纯的告诉你 <code>ViewEncapsulation</code> 的用法而已，这在实际项目中远远不够的。</p>
<h1 id="articleHeader1">一、封装模式</h1>
<p>分别为：</p>
<ul>
<li><p><code>Native</code> 原先浏览器<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM" rel="nofollow noreferrer" target="_blank">Shadow DOM</a>行为。</p></li>
<li><p><code>Emulated</code> 仿真模式，通过Angular来模拟类似Shadow DOM的行为。</p></li>
<li><p><code>None</code> 无任何封装行为。</p></li>
</ul>
<p>以上三种模式唯一的区别在于Shadow DOM，当然其作用是让组件的样式<strong>只进不出</strong>，换言之即组件内的样式不会影响到外部组件。有关于Shadow DOM更多的细节不在这里讨论。</p>
<p><strong>三者的表现形式</strong></p>
<p>假定使用以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  template: `<h1>test</h1>`,
  styles: [`h1 { color: #f50; }`],
  encapsulation: ViewEncapsulation.Native
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  template: <span class="hljs-string">`&lt;h1&gt;test&lt;/h1&gt;`</span>,
  styles: [<span class="hljs-string">`h1 { color: #f50; }`</span>],
  encapsulation: ViewEncapsulation.Native
})</code></pre>
<p>在不同模式下产生的HTML&amp;CSS风格都不尽相同，了解这些不一样尤为重要。它们分别为：</p>
<p><em>Native:</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#shadow-root (open)
    <style>h1 { color: #f50; }</style>
    <h1>test</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">#shadow-root (open)
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"><span class="hljs-selector-tag">h1</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#f50</span>; }</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<p><em>Emulated:</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>h1[_ngcontent-c0] { color: #f50; }</style>
<h1 _ngcontent-c0>test</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"><span class="hljs-selector-tag">h1</span><span class="hljs-selector-attr">[_ngcontent-c0]</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#f50</span>; }</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">_ngcontent-c0</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<p><em>None:</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>h1 { color: #f50; }</style>
<h1>test</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"><span class="hljs-selector-tag">h1</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#f50</span>; }</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<blockquote><p><code>Native</code> &amp; <code>None</code> 在内容是一样的，但其后者会影响至其他外部组件的 <code>h1</code> 元素。</p></blockquote>
<h1 id="articleHeader2">二、组件样式</h1>
<p>组件样式的封装模式取决于我们对 <code>encapsulation</code> 的配置，例如上面的示例。当然你可以了在 <code>main.ts</code> 时为所有组件统一设定一种行的模式，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="platformBrowserDynamic().bootstrapModule(AppModule, {
  defaultEncapsulation: ViewEncapsulation.None
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">platformBrowserDynamic().bootstrapModule(AppModule, {
  defaultEncapsulation: ViewEncapsulation.None
})</code></pre>
<p>虽然三种模式都有不同的风格，但对于一个组件而言，如果没有一很合理的使用风格在实际项目中会让我们很头疼，特别是当项目中使用第三方组件库（例如：ngx-bootstrap、ng-zorro-antd、material2 等）时，有时很容易受组件库的影响抑或需要让组件库与业务组件样式做一些微调时，了解一些细节非常重要。</p>
<p>例如一个用于渲染页面标头名曰：<code>app-header</code> 组件，其中 <code>&lt;nz-breadcrumb&gt;</code> <a href="https://ng.ant.design/#/components/breadcrumb" rel="nofollow noreferrer" target="_blank">面包屑</a> 默认情况下它会对最后一项进行<strong>加粗</strong>，但假设这不是我们希望的，而应该是一个不加粗和其他项一样的文本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nz-breadcrumb>
  <nz-breadcrumb-item>Home</nz-breadcrumb-item>
  <nz-breadcrumb-item>Detail</nz-breadcrumb-item>
</nz-breadcrumb>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nz-breadcrumb</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nz-breadcrumb-item</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">nz-breadcrumb-item</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nz-breadcrumb-item</span>&gt;</span>Detail<span class="hljs-tag">&lt;/<span class="hljs-name">nz-breadcrumb-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nz-breadcrumb</span>&gt;</span></code></pre>
<p>最终生成的HTML是这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nz-breadcrumb _ngcontent-c1=&quot;&quot; class=&quot;ant-breadcrumb&quot;>
    <nz-breadcrumb-item _ngcontent-c1=&quot;&quot;>
    <span class=&quot;ant-breadcrumb-link&quot;>
      Home
    </span>
    <span class=&quot;ant-breadcrumb-separator&quot;>/</span></nz-breadcrumb-item>
    <nz-breadcrumb-item _ngcontent-c1=&quot;&quot;>
    <span class=&quot;ant-breadcrumb-link&quot;>
      Detail
    </span>
    <span class=&quot;ant-breadcrumb-separator&quot;>/</span></nz-breadcrumb-item>
  </nz-breadcrumb>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nz-breadcrumb</span> <span class="hljs-attr">_ngcontent-c1</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ant-breadcrumb"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nz-breadcrumb-item</span> <span class="hljs-attr">_ngcontent-c1</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ant-breadcrumb-link"</span>&gt;</span>
      Home
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ant-breadcrumb-separator"</span>&gt;</span>/<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nz-breadcrumb-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nz-breadcrumb-item</span> <span class="hljs-attr">_ngcontent-c1</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ant-breadcrumb-link"</span>&gt;</span>
      Detail
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ant-breadcrumb-separator"</span>&gt;</span>/<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nz-breadcrumb-item</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nz-breadcrumb</span>&gt;</span></code></pre>
<p>倘若你不假思索的在 <code>app-header</code> 组件的 <code>styles</code> 属性中加上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ant-breadcrumb-link {
    font-weight: normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ant-breadcrumb-link</span> {
    <span class="hljs-attribute">font-weight</span>: normal;
}</code></pre>
<p>正如你期望的那样，可能不一定会有你想要的结果，亦或的结果可能会存在隐患。前面我说过三种模式唯一的区别在于Shadow DOM，因此说白了是两种不同的结果。</p>
<p>若组件设定为 <code>None</code> 模式，而会生效，但只要 <code>app-header</code> 组件出现过一次在未来所有即使不再使用 <code>app-header</code> 组件的情况下所有的面包屑的最后一项都是是不加粗的，这便是我说的隐患。</p>
<p>反之，对于 Shadow 行为，它会为 <code>nz-breadcrumb</code> 创建一个额外的属性 <code>_ngcontent-c1</code> 来<strong>标识</strong>（不管是 <code>Native</code>、<code>Emulated</code> 本质是一样的）所设定的样式仅限于 <code>app-header</code> 组件当中。而 Angular 中即采用 <code>:host</code> 来表示组件自身，所以前面的CSS样式应该变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":host .ant-breadcrumb-link {
    font-weight: normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:host</span> <span class="hljs-selector-class">.ant-breadcrumb-link</span> {
    <span class="hljs-attribute">font-weight</span>: normal;
}</code></pre>
<p>最后生成的样式会变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[_nghost-c1] .ant-breadcrumb-link[_ngcontent-c1] {
  font-weight: normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[_nghost-c1]</span> <span class="hljs-selector-class">.ant-breadcrumb-link</span><span class="hljs-selector-attr">[_ngcontent-c1]</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}</code></pre>
<p>我认为我们没有必要去理解生成的<strong>标识符</strong>是怎么样，只需要知道 <code>:host</code> 表示组件自身。</p>
<p>然而我们会发现，对于第三方组件 <code>nz-breadcrumb</code> 组件而言，<code>.ant-breadcrumb-link</code> 是其组件内部某个HTML元素的 <code>class</code> 而已，且它有自己的一套组件封装规则。但我们生成的CSS中包括了一个奇怪的字符 <code>[_ngcontent-c1]</code>，最终导致 <code>app-header</code> 组件样式无法改变第三方组件 <code>nz-breadcrumb</code> 组件内容的样式。</p>
<p>这是很合理的，我的领地不可侵犯，Angular 组件本身即是 Web Component 标准的具体实现。</p>
<p>难道我们没有办法侵犯第三方组件了吗？好在 Angular 提供了一种对未来工具更好兼容性的命令 <code>::ng-deep</code> 来强制样式允许侵入子组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":host ::ng-deep .ant-breadcrumb-link {
  font-weight: normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:host</span> <span class="hljs-selector-pseudo">::ng-deep</span> <span class="hljs-selector-class">.ant-breadcrumb-link</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}</code></pre>
<p>生成的CSS会是这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[_nghost-c1] .ant-breadcrumb-link {
  font-weight: normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[_nghost-c1]</span> <span class="hljs-selector-class">.ant-breadcrumb-link</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}</code></pre>
<p>最终这个不加粗的效果只会在 <code>app-header</code> 组件内部有效。</p>
<h1 id="articleHeader3">总结</h1>
<p>熟悉 <code>:host</code>、<code>::ng-deep</code> 组合用法对组件样式的构建很关键，Angular 组件有自己的业务逻辑、样式、HTML模板它们是构建一个 Web Component 的基础技术核心。</p>
<p>希望此篇能帮助大家更好理解组件样式。</p>
<p>Happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Angular样式封装

## 原文链接
[https://segmentfault.com/a/1190000012086737](https://segmentfault.com/a/1190000012086737)

