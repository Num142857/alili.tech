---
title: 'ng-content 中隐藏的内容' 
date: 2019-01-04 2:30:10
hidden: true
slug: nn5kkhh0sw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<p>如果你尝试在 Angular 中编写可重复使用的组件，则可能会接触到内容投射的概念。然后你发现了 <code>&lt;ng-content&gt;</code>，并找到了一些关于它的文章，进而实现了所需的功能。</p>
<p>接下来我们来通过一个简单的示例，一步步介绍 <code>&lt;ng-content&gt;</code> 所涉及的内容。</p>
<h3 id="articleHeader0">Simple example</h3>
<p>在本文中我们使用一个示例，来演示不同的方式实现内容投影。由于许多问题与Angular 中的组件生命周期相关，因此我们的主要组件将显示一个计数器，用于展示它已被实例化的次数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

let instances = 0;

@Component({
  selector: 'counter',
  template: '<h1>"{{"this.id"}}"</h1>'
})
class Counter {
  id: number;
  
  constructor() {
    this.id = ++instances;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-keyword">let</span> instances = <span class="hljs-number">0</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'counter'</span>,
  template: <span class="hljs-string">'&lt;h1&gt;"{{"this.id"}}"&lt;/h1&gt;'</span>
})
<span class="hljs-keyword">class</span> Counter {
  id: <span class="hljs-built_in">number</span>;
  
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">this</span>.id = ++instances;
  }
}</code></pre>
<p>上面示例中我们定义了 Counter 组件，组件类中的 id 属性用于显示本组件被实例化的次数。接着我们继续定义一个 Wrapper 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'wrapper',
  template: `
    <div class=&quot;box&quot;>
      <ng-content></ng-content>
    </div>
  `
})
class Wrapper {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'wrapper'</span>,
  template: <span class="hljs-string">`
    &lt;div class="box"&gt;
      &lt;ng-content&gt;&lt;/ng-content&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">class</span> Wrapper {}</code></pre>
<p>现在我们来验证一下效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<wrapper>
  <counter></counter>
  <counter></counter>
  <counter></counter>
</wrapper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">&lt;wrapper&gt;
  &lt;counter&gt;&lt;<span class="hljs-regexp">/counter&gt;
  &lt;counter&gt;&lt;/</span>counter&gt;
  &lt;counter&gt;&lt;<span class="hljs-regexp">/counter&gt;
&lt;/</span>wrapper&gt;</code></pre>
<h3 id="articleHeader1">Targeted projection</h3>
<p>有时你希望将包装器的不同子项投影到模板的不同部分。为了处理这个问题，<code>&lt;ng-content&gt;</code> 支持一个 <code>select</code> 属性，可以让你在特定的地方投射具体的内容。该属性支持 CSS 选择器（my-element，.my-class，[my-attribute]，...）来匹配你想要的内容。如果 ng-content 上没有设置 <code>select</code> 属性，它将接收全部内容，或接收不匹配任何其他 <code>ng-content</code> 元素的内容。长话短说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'wrapper',
  template: `
  <div class=&quot;box red&quot;>
    <ng-content></ng-content>
  </div>
  <div class=&quot;box blue&quot;>
    <ng-content select=&quot;counter&quot;></ng-content>
  </div>
  `,
  styles: [`
    .red {background: red;}
    .blue {background: blue;}
  `]
})
export class Wrapper { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'wrapper'</span>,
  template: <span class="hljs-string">`
  &lt;div class="box red"&gt;
    &lt;ng-content&gt;&lt;/ng-content&gt;
  &lt;/div&gt;
  &lt;div class="box blue"&gt;
    &lt;ng-content select="counter"&gt;&lt;/ng-content&gt;
  &lt;/div&gt;
  `</span>,
  styles: [<span class="hljs-string">`
    .red {background: red;}
    .blue {background: blue;}
  `</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Wrapper { }</code></pre>
<p>上面示例中，我们引入了 <code>select</code> 属性，来选择投射的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<wrapper>
  <span>This is not a counter</span>
  <counter></counter>
</wrapper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">wrapper</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>This is not a counter<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">wrapper</span>&gt;</span></code></pre>
<p>上述代码成功运行后，<code>counter</code> 组件被正确投影到第二个蓝色框中，而 span 元素最终会在全部红色框中。请注意，目标 <code>ng-content</code> 会优先于 catch-all，即使它在模板中的位置靠后。</p>
<h3 id="articleHeader2">ngProjectAs</h3>
<p>有时你的内部组件会被隐藏在另一个更大的组件中。有时你只需要将其包装在额外的容器中即可应用 <code>ngIf</code> 或 <code>ngSwitch</code>。无论什么原因，通常情况下，你的内部组件不是包装器的直接子节点。为了演示上述情况，我们将 Counter 组件包装在一个 <code>&lt;ng-container&gt;</code> 中，看看我们的目标投影会发生什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<wrapper>
  <ng-container>
    <counter></counter>
  </ng-container>
</wrapper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">wrapper</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ng-container</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-container</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">wrapper</span>&gt;</span></code></pre>
<p>现在我们的 couter 组件会被投影到第一个红色框中。因为 <code>ng-container</code> 容器不再匹配 <code>select="counter"</code>。为了解决这个问题，我们必须使用 <code>ngProjectAs</code> 属性，它可以应用于任何元素上。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<wrapper>
  <ng-container ngProjectAs=&quot;counter&quot;>
    <counter></counter>
  </ng-container>
</wrapper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">wrapper</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ng-container</span> <span class="hljs-attr">ngProjectAs</span>=<span class="hljs-string">"counter"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-container</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">wrapper</span>&gt;</span></code></pre>
<p>通过设置 <code>ngProjectAs</code> 属性，终于让我们的 counter 组件重回蓝色框的怀抱了。</p>
<h3 id="articleHeader3">Time to poke and prod</h3>
<p>我们从一个简单的实验开始：将两个 <code>&lt;ng-content&gt;</code> 块放在我们的模板中，没有选择器。会出现什么情况？</p>
<p>页面中会显示一个或两个框，如果我们包含两个框，它们的内容是显示 1 和 1 或 1 和 2？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box red&quot;>
    <ng-content></ng-content>
</div>
<div class=&quot;box blue&quot;>
    <ng-content></ng-content>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box red"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ng-content</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ng-content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box blue"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ng-content</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ng-content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>答案是我们在最后一个 <code>&lt;ng-content&gt;</code> 中得到一个计数器，另一个是空的！在我们尝试解释为什么之前，让我们再来验证一个问题，即在 <code>ng-content</code> 指令的外层容器中添加 <code>ngIf</code> 指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'wrapper',
  template: `
    <button (click)=&quot;show = !show&quot;>
      "{{" show ? 'Hide' : 'Show' "}}"
    </button>
    <div class=&quot;box&quot; *ngIf=&quot;show&quot;>
      <ng-content></ng-content>
    </div>
  `
})
class Wrapper {
  show = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'wrapper'</span>,
  template: <span class="hljs-string">`
    &lt;button (click)="show = !show"&gt;
      "{{" show ? 'Hide' : 'Show' "}}"
    &lt;/button&gt;
    &lt;div class="box" *ngIf="show"&gt;
      &lt;ng-content&gt;&lt;/ng-content&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">class</span> Wrapper {
  show = <span class="hljs-literal">true</span>;
}</code></pre>
<p>乍一看，似乎正常运行。但是如果你通过按钮进行切换操作，你会注意到计数器的值不会增加。这意味着我们的计数器组件只被实例化了一次 - 从未被销毁和重新创建。难道这是 <code>ngIf</code> 指令产生的问题，让我们测试一下 <code>ngFor</code> 指令，看看是否有同样的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'wrapper',
  template: `
    <div class=&quot;box&quot; *ngFor=&quot;let item of items&quot;>
      <ng-content></ng-content>
    </div>
  `
})
class Wrapper {
  items = [0, 0, 0];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'wrapper'</span>,
  template: <span class="hljs-string">`
    &lt;div class="box" *ngFor="let item of items"&gt;
      &lt;ng-content&gt;&lt;/ng-content&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">class</span> Wrapper {
  items = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>];
}</code></pre>
<p>以上代码运行后与我们使用多个 <code>&lt;ng-content&gt;</code> 的效果是一样的，只会显示一个计数器！为什么不按照我们的预期运行？</p>
<h3 id="articleHeader4">The explanation</h3>
<p><code>&lt;ng-content&gt;</code> 不会 "产生" 内容，它只是投影现有的内容。你可以认为它等价于 <code>node.appendChild(el) </code> 或 jQuery 中的 <code>$(node).append(el)</code> 方法：使用这些方法，节点不被克隆，它被简单地移动到它的新位置。因此，投影内容的生命周期将被绑定到它被声明的地方，而不是显示在地方。</p>
<p>这种行为有两个原因：期望一致性和性能。什么 "期望的一致性" 意味着作为开发人员，可以基于应用程序的代码，猜测其行为。假设我写了以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;my-wrapper&quot;>
  <counter></counter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-wrapper"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>很显然计数器将被实例化一次，但现在假如我们使用第三方库的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<third-party-wrapper>
  <counter></counter>
</third-party-wrapper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">third-party-wrapper</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">third-party-wrapper</span>&gt;</span></code></pre>
<p>如果第三方库能够控制 counter 组件的生命周期，我将无法知道它被实例化了多少次。其中唯一方法就是查看第三方库的代码，了解它们的内部处理逻辑。将组件的生命周期被绑定到我们的应用程序组件而不是包装器的意义是，开发者可以掌控计数器只被实例化一次，而不用了解第三方库的内部代码。</p>
<p>性能的原因更为重要。因为 <code>ng-content</code> 只是移动元素，所以可以在编译时完成，而不是在运行时，这大大减少了实际应用程序的工作量。</p>
<h3 id="articleHeader5">The solution</h3>
<p>为了让包装器能够控制其子元素的实例化，我们可以通过两种方式完成：在我们的内容周围使用 <code>&lt;ng-template&gt;</code> 元素，或者使用带有 "*" 语法的结构指令。为简单起见，我们将在示例中使用 <code>&lt;ng-template&gt;</code> 语法，我们的新应用程序如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<wrapper>
  <ng-template>
    <counter></counter>
  </ng-template>
</wrapper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">wrapper</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">wrapper</span>&gt;</span></code></pre>
<p>包装器不再使用 <code>&lt;ng-content&gt;</code>，因为它接收到一个模板。我们需要使用 <code>@ContentChild</code> 访问模板，并使用<code>ngTemplateOutlet</code> 来显示它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'wrapper',
  template: `
    <button (click)=&quot;show = !show&quot;>
      "{{" show ? 'Hide' : 'Show' "}}"
    </button>
    <div class=&quot;box&quot; *ngIf=&quot;show&quot;>
      <ng-container [ngTemplateOutlet]=&quot;template&quot;></ng-container>
    </div>
  `
})
class Wrapper {
  show = true;
  @ContentChild(TemplateRef) template: TemplateRef;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'wrapper'</span>,
  template: <span class="hljs-string">`
    &lt;button (click)="show = !show"&gt;
      "{{" show ? 'Hide' : 'Show' "}}"
    &lt;/button&gt;
    &lt;div class="box" *ngIf="show"&gt;
      &lt;ng-container [ngTemplateOutlet]="template"&gt;&lt;/ng-container&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">class</span> Wrapper {
  show = <span class="hljs-literal">true</span>;
  <span class="hljs-meta">@ContentChild</span>(TemplateRef) template: TemplateRef;
}</code></pre>
<p>现在我们的 counter 组件，每当我们隐藏并重新显示时都正确递增！让我们再验证一下 <code>*ngFor</code> 指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'wrapper',
  template: `
    <div class=&quot;box&quot; *ngFor=&quot;let item of items&quot;>
      <ng-container [ngTemplateOutlet]=&quot;template&quot;></ng-container>
    </div>
  `
})
class Wrapper {
  items = [0, 0, 0];
  @ContentChild(TemplateRef) template: TemplateRef;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'wrapper'</span>,
  template: <span class="hljs-string">`
    &lt;div class="box" *ngFor="let item of items"&gt;
      &lt;ng-container [ngTemplateOutlet]="template"&gt;&lt;/ng-container&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">class</span> Wrapper {
  items = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>];
  <span class="hljs-meta">@ContentChild</span>(TemplateRef) template: TemplateRef;
}</code></pre>
<p>上面代码成功运行后，每个盒子中有一个计数器，显示 1，2 和 3，这正是我们之前预期的结果。</p>
<h2 id="articleHeader6">参考资源</h2>
<ul><li><a href="https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b" rel="nofollow noreferrer" target="_blank">ng-content-the-hidden-docs</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ng-content 中隐藏的内容

## 原文链接
[https://segmentfault.com/a/1190000010730597](https://segmentfault.com/a/1190000010730597)

