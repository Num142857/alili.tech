---
title: '爱吃螃蟹的前端：登上 Bootstrap 4.0 的大船' 
date: 2019-02-11 2:30:49
hidden: true
slug: ajzba2rl2ch
categories: [reprint]
---

{{< raw >}}

                    
<p>Bootstrap 这个号称世界第一的 <strong>responsive</strong> 和 <strong>mobile first</strong> 前端样式组件库去年八月发布了 <em>v4.0 Alpha</em>，去年年底时发布了 <em>v4.0 Alpha 2</em> 版本。可能是 <em>v3</em> 用的过于顺手，直到今天才决定踏上 <em>v4.0</em> 这艘船，让我们一起来看它是说翻就翻，还是屹立不倒。</p>
<h2 id="articleHeader0">4.0 vs 3.0</h2>
<p>根据官方文档，我们先来看看 <em>v4.0</em> 相比 <em>v3.0</em> 做了那些改变：</p>
<ul>
<li><p>从 Less 迁移到 Sass。感谢 Libsass, Bootstrap 现在编译的更快了，而且 Sass 社区在快速壮大。</p></li>
<li><p>升级栅格系统。我们添加了新的栅格排列来根更好地适应移动设备，并且完全重构了语义的 <code>mixins</code>。</p></li>
<li><p>有了可选的 <code>flexbox</code> 支持。通过一个变量开关，你可以重新编译你的CSS 使用基于 <code>flexbox</code> 的栅格系统和组件，直接进入未来模式。</p></li>
<li><p>去掉了 <code>well</code>，<code>thumbnail</code> 和 <code>panel</code>，并用 <code>card</code> 来代替。 <code>card</code> 是 Bootstrap 中一个全新的组件，你会觉得它似曾相识，因为它和 <code>well</code>，<code>thumbnail</code> 和 <code>panel</code> 的用法差不多，并且会更好。</p></li>
<li><p>加固了所有的 <code>HTML reset</code> 代码，用一个新的模块：<code>Reboot</code>。 <code>Reboot</code> 做了一些 <code>Normalize.css</code> 没有做的事。在一个单独的 Sass 文件中给你提供了很多的重置选项，例如：<code>box-sizing: border-box</code>, <code>margin tweaks</code> 等。</p></li>
<li><p>全新的自定义选项。并非像 v3 中那样把装饰性样式，如：<code>gradients</code>, <code>transitions</code>, <code>shadows</code> 等放在各自的文件中。我们把这些选项移到了 Sass 的变量中。希望默认的把 <code>transitions</code> 应用到所有元素上或者禁用掉圆角？你只需要更新一个变量然后重新编译。</p></li>
<li><p>去掉了对 IE8 的支持，并使用 <code>rem</code> 和 <code>em</code> 单位。抛弃 IE8 意味着我们可以使用 CSS 中最好的那些属性而不用被 <code>CSS hacks</code> 或 <code>fallbacks</code> 所牵制。使用 <code>rem</code> 和 <code>em</code> 替代像素更适合做响应式排版，调整组件大小更方便了。如果你需要支持 IE8，继续用 Bootstrap 3 就好。</p></li>
<li><p>重写了我们所有的 JavaScript 插件。所有插件使用 ES6 重写，得以使用最新的 JavaScript 特性。并且他们现在支持 UMD，通用的 <code>teardown</code> 方法，参数类型检查，等很多优点。</p></li>
<li><p>增强 <code>tooltip</code> and <code>popover</code> 的自动定位，多亏了 Tether 这个开源库的支持。</p></li>
<li><p>改进了文档。我们用 Markdown 重写了它，并且添加了一些好用的插件来提高例子和代码片段的效率。还用这种方法改进了搜索。</p></li>
<li><p>当然还有成吨的优化！你可以自定义 <code>form control</code>，<code>margin</code> 和 <code>padding</code> 的类，还有很多新的工具类。</p></li>
</ul>
<h2 id="articleHeader1">Alpha 2 vs Alpha 1</h2>
<p>再来看看 <em>Bootstrap 4.0 Alpha 2</em> 相比之前的 <em>Alpha 1</em> 版本做了哪些改进工作：</p>
<ul>
<li><p>使用数字堆叠彻底重构了间隔工具类(spacing utilities)（避免与栅格混淆）</p></li>
<li><p>持续地重构，在多个组件中使用相同的类来替换某些根据标签的选择器（包括分页，列表等）。还有更多其他组件也在重构中。</p></li>
<li><p>恢复媒体查询和栅格容器的单位 <code>rem</code> 到 <code>pixel</code> 因为 <code>viewports</code> 不会被 <code>font-size</code> 影响。（详情见 issue #17403。我们还有成吨的栅格需要处理。请关注 issue #18471）</p></li>
<li><p>为了组件的一致性恢复边框宽度 <code>.0625rem</code> 到 <code>1px</code>，以避免缩放和 <code>font-size</code>的 bug 在不同浏览器的兼容问题。</p></li>
<li><p>重命名 <code>.img-responsive</code> 为 <code>.img-fluid</code> 以避免将来各种响应图像解决方案出现混乱。</p></li>
<li><p>替换 <code>ZeroClipboard</code> 为 <code>clipboard.js</code>，可以不依赖 flash 了。</p></li>
<li><p>输入框和按钮共享相同的边框值以确保组件总是同样大小。</p></li>
<li><p>更新了所有伪元素选择器的使用规范，首选双冒号（如，<code>::before</code> 而不是 <code>:before</code>）。</p></li>
<li><p>卡片现在有不同的轮廓和 <code>mixins</code> 进一步支持基于类的扩展。</p></li>
<li><p>用来实现 <code>floats</code> 和文字对齐的工具类现在有了响应式范围。这意味着我们已经放弃了非响应类，以避免重复。</p></li>
<li><p>增加了对 jQuery 2 的支持</p></li>
<li><p>还有成百上千的 Sass 优化，bug 修复，文档更新等等。</p></li>
</ul>
<p>看完这些，心里大致有了个底：<br><em>js</em> 的 <em>API</em> 基本没变（算你有良心）。<code>well</code>，<code>thumbnail</code> 和 <code>panel</code> 被干掉了，全部用 <code>card</code> 代替（之前的确实太复杂）。长度单位被换成了 <code>rem</code> 和 <code>em</code>，但是 <code>rem</code> 有兼容性 bug，某些地方又被换回了 'px'（心好累）。添加了一些新的工具类，可以直接写 class 设置间隔了（敲黑板，曾经为了偷懒，我们一直在这么玩）。</p>
<p>下面让我们来仔细看看 <em>Bootstrap v4.0 Alpha 2</em> 的新特性。</p>
<h2 id="articleHeader2">Reboot</h2>
<p><em>v4.0</em> 中使用 Reboot 重置浏览器的默认样式。</p>
<h3 id="articleHeader3">hidden 属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; hidden>

[hidden] { display: none !important; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>&lt;input <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-keyword">hidden</span>&gt;

[<span class="hljs-keyword">hidden</span>] { display: none <span class="hljs-title">!important</span><span class="hljs-comment">; }</span></code></pre>
<p>HTML5 添加了一个全局的新属性 <code>[hidden]</code>，它的默认效果和 <code>display: none</code> 一样。这里借用了 PureCSS 的思想。虽然  <code>[hidden]</code> 在 IE9-10 中并不被支持，通过明确的声明解决了这个问题明确声明.</p>
<h3 id="articleHeader4">优化触摸屏的点击延时</h3>
<p>值得一提的是，<em>v4.0</em> 针对触摸屏设备的点击延时做了优化。做过移动端页面调优的同学都知道，在移动设备上，用户的点击事件有大约 300 毫秒的延时，这个特性是为了方便识别的用户双击操作，以自动放大或缩小屏幕。</p>
<h2 id="articleHeader5">响应式增强</h2>
<p><em>v4.0</em> 的一大特点是，增强了对响应式的支持，或者说：强制你写出支持响应式的页面。</p>
<h3 id="articleHeader6">.hidden-*-*</h3>
<p><span class="img-wrap"><img data-src="/img/bVvfuO" src="https://static.alili.tech/img/bVvfuO" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>v4.0</em> 已经没有了 <code>.hidden</code> 这个通用的 class，想要隐藏某个元素的话强烈建议遵循响应式的需求使用响应式的 class 向上生效，或者向下生效。</p>
<h2 id="articleHeader7">新组件</h2>
<h3 id="articleHeader8">Card</h3>
<p><em>v4.0</em> 去掉了 <em>well</em>，<em>thumbnail</em> 和 <em>panel</em>，用一个 <em>card</em><br>解决所有问题。</p>
<p><span class="img-wrap"><img data-src="/img/bVvfBH" src="https://static.alili.tech/img/bVvfBH" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;card&quot;>
  <img class=&quot;card-img-top&quot; data-src=&quot;...&quot; alt=&quot;Card image cap&quot;>
  <div class=&quot;card-block&quot;>
    <h4 class=&quot;card-title&quot;>Card title</h4>
    <p class=&quot;card-text&quot;>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href=&quot;#&quot; class=&quot;btn btn-primary&quot;>Button</a>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"card"</span>&gt;
  &lt;img <span class="hljs-built_in">class</span>=<span class="hljs-string">"card-img-top"</span> data-src=<span class="hljs-string">"..."</span> alt=<span class="hljs-string">"Card image cap"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"card-block"</span>&gt;
    &lt;h4 <span class="hljs-built_in">class</span>=<span class="hljs-string">"card-title"</span>&gt;Card title&lt;/h4&gt;
    &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">"card-text"</span>&gt;Some quick example <span class="hljs-built_in">text</span> <span class="hljs-keyword">to</span> build <span class="hljs-keyword">on</span> <span class="hljs-keyword">the</span> card title <span class="hljs-keyword">and</span> make up <span class="hljs-keyword">the</span> bulk <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> card's content.&lt;/p&gt;
    &lt;a href=<span class="hljs-string">"#"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn btn-primary"</span>&gt;Button&lt;/a&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>这样可以少纠结那些的细小的区别了。</p>
<p><span class="img-wrap"><img data-src="/img/bVvfCG" src="https://static.alili.tech/img/bVvfCG" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;card card-inverse card-success text-xs-center&quot;>
  <div class=&quot;card-block&quot;>
    <blockquote class=&quot;card-blockquote&quot;>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer>Someone famous in <cite title=&quot;Source Title&quot;>Source Title</cite></footer>
    </blockquote>
  </div>
</div>
<div class=&quot;card card-inverse card-info text-xs-center&quot;>
  <div class=&quot;card-block&quot;>
    <blockquote class=&quot;card-blockquote&quot;>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer>Someone famous in <cite title=&quot;Source Title&quot;>Source Title</cite></footer>
    </blockquote>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card card-inverse card-success text-xs-center"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-block"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">blockquote</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-blockquote"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>Someone famous in <span class="hljs-tag">&lt;<span class="hljs-name">cite</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Source Title"</span>&gt;</span>Source Title<span class="hljs-tag">&lt;/<span class="hljs-name">cite</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">blockquote</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card card-inverse card-info text-xs-center"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-block"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">blockquote</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-blockquote"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>Someone famous in <span class="hljs-tag">&lt;<span class="hljs-name">cite</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Source Title"</span>&gt;</span>Source Title<span class="hljs-tag">&lt;/<span class="hljs-name">cite</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">blockquote</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>用 <em>card</em> 实现的 <em>well</em></p>
<h2 id="articleHeader9">工具 Class</h2>
<p>v4.0 中新增了很多方便调用的工具类，我们来大概刷一遍。</p>
<h3 id="articleHeader10">Spacing Class</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".m-t-0 {
  margin-top: 0 !important;
}

.m-l-1 {
  margin-left: $spacer-x !important;
}

.p-x-2 {
  padding-left: ($spacer-x * 1.5) !important;
  padding-right: ($spacer-x * 1.5) !important;
}

.p-a-3 {
  padding: ($spacer-y * 3) ($spacer-x * 3) !important;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.m-t-0</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span> <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.m-l-1</span> {
  <span class="hljs-attribute">margin-left</span>: $spacer-x <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.p-x-2</span> {
  <span class="hljs-attribute">padding-left</span>: ($spacer-x * <span class="hljs-number">1.5</span>) <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">padding-right</span>: ($spacer-x * <span class="hljs-number">1.5</span>) <span class="hljs-meta">!important</span>;
}

<span class="hljs-selector-class">.p-a-3</span> {
  <span class="hljs-attribute">padding</span>: ($spacer-y * <span class="hljs-number">3</span>) ($spacer-x * <span class="hljs-number">3</span>) <span class="hljs-meta">!important</span>;
}</code></pre>
<p>哇擦！这些用来设置间距的工具类，你们感受一下。<code>x</code> 代表水平方向，<code>a</code> 代表全部。最后的数字可以简单理解为一个字符的宽度（水平方向）或者一行的高度（垂直方向）。使用后的感受是：这样调间距方便极了，有木有！</p>
<p>Bootstrap 甚至还包含了一个 <code>.m-x-auto</code> 的 class，用它可以快速把水平 margin 设为 auto。</p>
<h3 id="articleHeader11">.center-block</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Class
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

// Usage as a mixin
.element {
  @include center-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// Class</span>
<span class="hljs-selector-class">.center-block</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">margin-left</span>: auto;
  <span class="hljs-attribute">margin-right</span>: auto;
}

<span class="hljs-comment">// Usage as a mixin</span>
<span class="hljs-selector-class">.element</span> {
  @<span class="hljs-keyword">include</span> center-block;
}</code></pre>
<p>使用 <code>margin</code> 的 <code>auto</code> 值剧中块级元素。</p>
<h3 id="articleHeader12">.text-hide</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .text-hide {
    font: &quot;0/0&quot; a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
}

// Usage as a mixin
.heading {
  @include text-hide;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-selector-class">.text-hide</span> {
    <span class="hljs-attribute">font</span>: <span class="hljs-string">"0/0"</span> a;
    <span class="hljs-attribute">color</span>: transparent;
    <span class="hljs-attribute">text-shadow</span>: none;
    <span class="hljs-attribute">background-color</span>: transparent;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-comment">// Usage as a mixin</span>
<span class="hljs-selector-class">.heading</span> {
  @<span class="hljs-keyword">include</span> text-hide;
}</code></pre>
<p>通过给文字设置透明的颜色来隐藏文字，用来做 logo 图片的文字隐藏最好不过了。</p>
<h3 id="articleHeader13">.invisible</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Class
.invisible {
  visibility: hidden;
}

// Usage as a mixin
.element {
  .invisible();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// Class</span>
.<span class="hljs-class">invisible </span>{
<span class="hljs-symbol">  visibility:</span> hidden;
}

<span class="hljs-comment">// Usage as a mixin</span>
.<span class="hljs-class">element </span>{
  .invisible();
}</code></pre>
<p>替开发者想的真是周到。</p>
<h2 id="articleHeader14">总结</h2>
<p><span class="img-wrap"><img data-src="/img/bVvfGI" src="https://static.alili.tech/img/bVvfGI" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>大国之重器，前端黑科技<br>我们啥都不缺！</p>
<p>—Bootstrap v4.0</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
爱吃螃蟹的前端：登上 Bootstrap 4.0 的大船

## 原文链接
[https://segmentfault.com/a/1190000005014014](https://segmentfault.com/a/1190000005014014)

