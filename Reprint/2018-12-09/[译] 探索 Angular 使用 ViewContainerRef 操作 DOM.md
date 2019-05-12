---
title: '[译] 探索 Angular 使用 ViewContainerRef 操作 DOM' 
date: 2018-12-09 2:30:09
hidden: true
slug: rv0ca6suys
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文链接：<strong><a href="https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02" rel="nofollow noreferrer" target="_blank">Exploring Angular DOM manipulation techniques using ViewContainerRef</a></strong><p>如果想深入学习 Angular 如何使用 Renderer 和 View Containers 技术操作 DOM，可以查阅 YouTube 视频 <strong><a href="https://www.youtube.com/watch?v=qWmqiYDrnDc&amp;list=PLVI0Ut22uwY4UC1v5fUvi2RIU4R4jPkba&amp;sns=tw" rel="nofollow noreferrer" target="_blank">my talk at NgVikings</a></strong>。</p>
</blockquote>
<p>每次我读到 Angular 如何操作 DOM 相关文章时，总会发现这些文章提到 <code>ElementRef</code>、<code>TemplateRef</code>、<code>ViewContainerRef</code> 和其他的类。尽管这些类在 Angular 官方文档或相关文章会有涉及，但是很少会去描述整体思路，这些类如何一起作用的相关示例也很少，而本文就主要描述这些内容。</p>
<p>如果你来自于 angular.js 世界，很容易明白如何使用 angular.js 操作 DOM。angular.js 会在 <code>link</code> 函数中注入 DOM <code>element</code>，你可以在组件模板里查询任何节点（node），添加或删除节点（node），修改样式（styles），等等。然而这种方式有个主要缺陷：<strong>与浏览器平台紧耦合</strong>。</p>
<p>新版本 Angular 需要在不同平台上运行，如 Browser 平台，Mobile 平台或者 Web Worker 平台，所以，就需要在特定平台的 API 和框架接口之间进行一层抽象（abstraction）。Angular 中的这层抽象就包括这些引用类型：<code>ElementRef</code>、<code>TemplateRef</code>、<code>ViewRef</code>、<code>ComponentRef</code> 和 <code>ViewContainerRef</code>。本文将详细讲解每一个引用类型（reference type）和该引用类型如何操作 DOM。</p>
<h2 id="articleHeader0">@ViewChild</h2>
<p>在探索 DOM 抽象类前，先了解下如何在组件/指令中获取这些抽象类。Angular 提供了一种叫做 DOM Query 的技术，主要来源于 <code>@ViewChild</code> 和 <code>@ViewChildren</code> 装饰器（decorators）。两者基本功能相同，唯一区别是 <code>@ViewChild</code> 返回单个引用，<code>@ViewChildren</code> 返回由 <strong><a href="https://angular.io/api/core/QueryList" rel="nofollow noreferrer" target="_blank">QueryList</a></strong> 对象包装好的多个引用。本文示例中主要以 <code>ViewChild</code> 为例，并且描述时省略 <code>@</code>。</p>
<p>通常这两个装饰器与模板引用变量（<strong><a href="https://angular.io/guide/template-syntax#!#ref-vars" rel="nofollow noreferrer" target="_blank">template reference variable</a></strong>）一起使用，模板引用变量仅仅是对模板（template）内 DOM 元素命名式引用（a named reference），类似于 <code>html</code> 元素的 <code>id</code> 属性。你可以使用模板引用（template reference）来标记一个 DOM 元素，并在组件/指令类中使用 <code>ViewChild</code> 装饰器查询（query）它，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sample',
    template: `
        <span #tref>I am span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild(&quot;tref&quot;, {read: ElementRef}) tref: ElementRef;

    ngAfterViewInit(): void {
        // outputs `I am span`
        console.log(this.tref.nativeElement.textContent);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'sample'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;span #tref&gt;I am span&lt;/span&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">AfterViewInit</span> </span>{
    @ViewChild(<span class="hljs-string">"tref"</span>, {<span class="hljs-attr">read</span>: ElementRef}) tref: ElementRef;

    ngAfterViewInit(): <span class="hljs-keyword">void</span> {
        <span class="hljs-comment">// outputs `I am span`</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.tref.nativeElement.textContent);
    }
}</code></pre>
<p><code>ViewChild</code> 装饰器基本语法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@ViewChild([reference from template], {read: [reference type]});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">@ViewChild([reference <span class="hljs-keyword">from</span> template], {<span class="hljs-attr">read</span>: [reference type]});</code></pre>
<p>上例中你可以看到，我把 <code>tref</code> 作为模板引用名称，并将 <code>ElementRef</code> 与该元素联系起来。第二个参数 <code>read</code> 是可选的，因为 Angular 会根据 DOM 元素的类型推断出该引用类型。例如，如果它（#tref）挂载的是类似 <code>span</code> 的简单 html 元素，Angular 返回 <code>ElementRef</code>；如果它挂载的是 <code>template</code> 元素，Angular 返回 <code>TemplateRef</code>。一些引用类型如 <code>ViewContainerRef</code> 就不可以被 Angular 推断出来，所以必须在 <code>read</code> 参数中显式申明。其他的如 <code>ViewRef</code> 不可以挂载在 DOM 元素中，所以必须手动在构造函数中编码构造出来。</p>
<p>现在，让我们看看应该如何获取这些引用，一起去探索吧。</p>
<h2 id="articleHeader1">ElementRef</h2>
<p>这是最基本的抽象类，如果你查看它的类结构，就发现它只包含所挂载的元素对象，这对访问原生 DOM 元素很有用，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// outputs `I am span`
console.log(this.tref.nativeElement.textContent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// outputs `I am span`</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.tref.nativeElement.textContent);</code></pre>
<p>然而，<strong><a href="https://angular.io/docs/ts/latest/api/core/index/ElementRef-class.html" rel="nofollow noreferrer" target="_blank">Angular 团队不鼓励这种写法</a></strong>，不但因为这种方式会暴露安全风险，而且还会让你的程序与渲染层（rendering layers）紧耦合，这样就很难在多平台运行你的程序。我认为这个问题并不是使用 <code>nativeElement</code> 而是使用特定的 DOM API 造成的，如 <code>textContent</code>。但是后文你会看到，Angular 实现了操作 DOM 的整体思路模型，这样就不再需要低阶 API，如 <code>textContent</code>。</p>
<p>使用 <code>ViewChild</code>装饰的 DOM 元素会返回 <code>ElementRef</code>，但是由于所有组件挂载于自定义 DOM 元素，所有指令作用于 DOM 元素，所以组件和指令都可以通过 DI（Dependency Injection）获取宿主元素的<code>ElementRef</code> 对象。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sample',
    ...
export class SampleComponent{
      constructor(private hostElement: ElementRef) {
          //outputs <sample>...</sample>
             console.log(this.hostElement.nativeElement.outerHTML);
      }
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'sample'</span>,
    ...
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span></span>{
      <span class="hljs-keyword">constructor</span>(private hostElement: ElementRef) {
          <span class="hljs-comment">//outputs &lt;sample&gt;...&lt;/sample&gt;</span>
             <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.hostElement.nativeElement.outerHTML);
      }
    ...</code></pre>
<p>所以组件通过 DI（Dependency Injection）可以访问到它的宿主元素，但 <code>ViewChild</code> 装饰器经常被用来获取模板视图中的 DOM 元素。然而指令却相反，因为指令没有视图模板，所以主要用来获取指令挂载的宿主元素。</p>
<h2 id="articleHeader2">TemplateRef</h2>
<p>对于大部分开发者来说，模板概念很熟悉，就是跨程序视图内一堆 DOM 元素的组合。在 HTML5 引入  <strong><a href="https://developer.mozilla.org/en/docs/Web/HTML/Element/template" rel="nofollow noreferrer" target="_blank">template</a></strong> 标签前，浏览器通过在 <code>script</code> 标签内设置 <code>type</code> 属性来引入模板，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script id=&quot;tpl&quot; type=&quot;text/template&quot;>
  <span>I am span in template</span>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script id=<span class="hljs-string">"tpl"</span> type=<span class="hljs-string">"text/template"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am span in template<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>这种方式不仅有语义缺陷，还需要手动创建 DOM 模型，然而通过 <code>template</code> 标签，浏览器可以解析 <code>html</code> 并创建 <code>DOM</code> 树，但不会渲染它，该 DOM 树可以通过 <code>content</code> 属性访问，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    let tpl = document.querySelector('#tpl');
    let container = document.querySelector('.insert-after-me');
    insertAfter(container, tpl.content);
</script>
<div class=&quot;insert-after-me&quot;></div>
<ng-template id=&quot;tpl&quot;>
    <span>I am span in template</span>
</ng-template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
    <span class="hljs-keyword">let</span> tpl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#tpl'</span>);
    <span class="hljs-keyword">let</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.insert-after-me'</span>);
    insertAfter(container, tpl.content);
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"insert-after-me"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;ng-template id=<span class="hljs-string">"tpl"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am span in template<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ng-template&gt;</span></code></pre>
<p>Angular 采用 <code>template</code> 标签这种方式，实现了 <code>TemplateRef</code> 抽象类来和 <code>template</code> 标签一起合作，看看它是如何使用的（译者注：ng-template 是 Angular 提供的类似于 template 原生 html 标签）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sample',
    template: `
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild(&quot;tpl&quot;) tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let elementRef = this.tpl.elementRef;
        // outputs `template bindings={}`
        console.log(elementRef.nativeElement.textContent);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'sample'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;ng-template #tpl&gt;
            &lt;span&gt;I am span in template&lt;/span&gt;
        &lt;/ng-template&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">AfterViewInit</span> </span>{
    @ViewChild(<span class="hljs-string">"tpl"</span>) tpl: TemplateRef&lt;any&gt;;

    ngAfterViewInit() {
        <span class="hljs-keyword">let</span> elementRef = <span class="hljs-keyword">this</span>.tpl.elementRef;
        <span class="hljs-comment">// outputs `template bindings={}`</span>
        <span class="hljs-built_in">console</span>.log(elementRef.nativeElement.textContent);
    }
}</code></pre>
<p>Angular 框架从 DOM 中移除 <code>template</code> 元素，并在其位置插入注释，这是渲染后的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<sample>
    <!--template bindings={}-->
</sample>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">sample</span>&gt;</span>
    <span class="hljs-comment">&lt;!--template bindings={}--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">sample</span>&gt;</span></code></pre>
<p><code>TemplateRef</code> 是一个结构简单的抽象类，它的 <code>elementRef</code> 属性是对其宿主元素的引用，还有一个 <code>createEmbeddedView</code> 方法。然而 <code>createEmbeddedView</code> 方法很有用，因为它可以创建一个视图（view）并返回该视图的引用对象 <code>ViewRef</code>。</p>
<h2 id="articleHeader3">ViewRef</h2>
<p>该抽象表示一个 Angular 视图（View），在 Angular 世界里，视图（View）是一堆元素的组合，一起被创建和销毁，是构建程序 UI 的基石。Angular 鼓励开发者把 UI 作为一堆视图（View）的组合，而不仅仅是 html 标签组成的树。</p>
<p>Angular 支持两种类型视图：</p>
<ul>
<li>嵌入视图（Embedded View），由 <code>Template</code> 提供</li>
<li>宿主视图（Host View），由 <code>Component</code> 提供</li>
</ul>
<h3 id="articleHeader4">创建嵌入视图</h3>
<p>模板仅仅是视图的蓝图，可以通过之前提到的 <code>createEmbeddedView</code> 方法创建视图，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ngAfterViewInit() {
    <span class="hljs-keyword">let</span> view = <span class="hljs-keyword">this</span>.tpl.createEmbeddedView(<span class="hljs-literal">null</span>);
}</code></pre>
<h3 id="articleHeader5">创建宿主视图</h3>
<p>宿主视图是在组件动态实例化时创建的，一个动态组件（dynamic component）可以通过 <code>ComponentFactoryResolver</code> 创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(private injector: Injector,
            private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(private injector: Injector,
            private r: ComponentFactoryResolver) {
    <span class="hljs-keyword">let</span> factory = <span class="hljs-keyword">this</span>.r.resolveComponentFactory(ColorComponent);
    <span class="hljs-keyword">let</span> componentRef = factory.create(injector);
    <span class="hljs-keyword">let</span> view = componentRef.hostView;
}</code></pre>
<p>在 Angular 中，每一个组件绑定着一个注入器（Injector）实例，所以创建 <code>ColorComponent</code> 组件时传入当前组件（即 SampleComponent）的注入器。另外，别忘了，动态创建组件时需要在模块（module）或宿主组件的 <strong><a href="https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#q-entry-component-defined" rel="nofollow noreferrer" target="_blank">EntryComponents</a></strong> 属性添加被创建的组件。</p>
<p>现在，我们已经看到嵌入视图和宿主视图是如何被创建的，一旦视图被创建，它就可以使用 <code>ViewContainer</code> 插入 DOM 树中。下文主要探索这个功能。</p>
<h2 id="articleHeader6">ViewContainerRef</h2>
<p>视图容器就是挂载一个或多个视图的容器。</p>
<p>首先需要说的是，任何 DOM 元素都可以作为视图容器，然而有趣的是，对于绑定 <code>ViewContainer</code> 的 DOM 元素，Angular 不会把视图插入该元素的内部，而是追加到该元素后面，这类似于 <code>router-outlet</code> 插入组件的方式。</p>
<p>通常，比较好的方式是把 <code>ViewContainer</code> 绑定在 <code>ng-container</code> 元素上，因为 <code>ng-container</code> 元素会被渲染为注释，从而不会在 DOM 中引入多余的 html 元素。下面示例描述在组建模板中如何创建 <code>ViewContainer</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container #vc></ng-container>
        <span>I am last span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild(&quot;vc&quot;, {read: ViewContainerRef}) vc: ViewContainerRef;

    ngAfterViewInit(): void {
        // outputs `template bindings={}`
        console.log(this.vc.element.nativeElement.textContent);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'sample'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;span&gt;I am first span&lt;/span&gt;
        &lt;ng-container #vc&gt;&lt;/ng-container&gt;
        &lt;span&gt;I am last span&lt;/span&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">AfterViewInit</span> </span>{
    @ViewChild(<span class="hljs-string">"vc"</span>, {<span class="hljs-attr">read</span>: ViewContainerRef}) vc: ViewContainerRef;

    ngAfterViewInit(): <span class="hljs-keyword">void</span> {
        <span class="hljs-comment">// outputs `template bindings={}`</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.vc.element.nativeElement.textContent);
    }
}</code></pre>
<p>如同其他抽象类一样，<code>ViewContainer</code> 通过 <code>element</code> 属性绑定 DOM 元素，比如上例中，绑定的是 会被渲染为注释的 <code>ng-container</code> 元素，所以输出也将是 <code>template bindings={}</code>。</p>
<h3 id="articleHeader7">操作视图</h3>
<p><code>ViewContainer</code> 提供了一些操作视图 API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ViewContainerRef {
    ...
    clear() : void
    insert(viewRef: ViewRef, index?: number) : ViewRef
    get(index: number) : ViewRef
    indexOf(viewRef: ViewRef) : number
    detach(index?: number) : ViewRef
    move(viewRef: ViewRef, currentIndex: number) : ViewRef
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ViewContainerRef</span> </span>{
    ...
    clear() : <span class="hljs-keyword">void</span>
    insert(viewRef: ViewRef, index?: number) : ViewRef
    get(index: number) : ViewRef
    indexOf(viewRef: ViewRef) : number
    detach(index?: number) : ViewRef
    move(viewRef: ViewRef, <span class="hljs-attr">currentIndex</span>: number) : ViewRef
}</code></pre>
<p>从上文我们已经知道如何通过模板和组件创建两种类型视图，即嵌入视图和组件视图。一旦有了视图，就可以通过 <code>insert</code> 方法插入 DOM 中。下面示例描述如何通过模板创建嵌入视图，并在 <code>ng-container</code> 标记的地方插入该视图（译者注：从上文中知道是追加到<code>ng-container</code>后面，而不是插入到该 DOM 元素内部）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container #vc></ng-container>
        <span>I am last span</span>
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild(&quot;vc&quot;, {read: ViewContainerRef}) vc: ViewContainerRef;
    @ViewChild(&quot;tpl&quot;) tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let view = this.tpl.createEmbeddedView(null);
        this.vc.insert(view);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'sample'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;span&gt;I am first span&lt;/span&gt;
        &lt;ng-container #vc&gt;&lt;/ng-container&gt;
        &lt;span&gt;I am last span&lt;/span&gt;
        &lt;ng-template #tpl&gt;
            &lt;span&gt;I am span in template&lt;/span&gt;
        &lt;/ng-template&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">AfterViewInit</span> </span>{
    @ViewChild(<span class="hljs-string">"vc"</span>, {<span class="hljs-attr">read</span>: ViewContainerRef}) vc: ViewContainerRef;
    @ViewChild(<span class="hljs-string">"tpl"</span>) tpl: TemplateRef&lt;any&gt;;

    ngAfterViewInit() {
        <span class="hljs-keyword">let</span> view = <span class="hljs-keyword">this</span>.tpl.createEmbeddedView(<span class="hljs-literal">null</span>);
        <span class="hljs-keyword">this</span>.vc.insert(view);
    }
}</code></pre>
<p>通过上面的实现，最后的 <code>html</code> 看起来是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<sample>
    <span>I am first span</span>
    <!--template bindings={}-->
    <span>I am span in template</span>

    <span>I am last span</span>
    <!--template bindings={}-->
</sample>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">sample</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am first span<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-comment">&lt;!--template bindings=</span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="hljs-comment">--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am span in template<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am last span<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-comment">&lt;!--template bindings=</span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="hljs-comment">--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">sample</span>&gt;</span></span></code></pre>
<p>可以通过 <code>detach</code> 方法从视图中移除 DOM，其他的方法可以通过方法名知道其含义，如通过索引获取视图引用对象，移动视图位置，或者从视图容器中移除所有视图。</p>
<h3 id="articleHeader8">创建视图</h3>
<p><code>ViewContainer</code> 也提供了手动创建视图 API ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ViewContainerRef {
    element: ElementRef
    length: number

    createComponent(componentFactory...): ComponentRef<C>
    createEmbeddedView(templateRef...): EmbeddedViewRef<C>
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ViewContainerRef</span> </span>{
    element: ElementRef
    length: number

    createComponent(componentFactory...): ComponentRef&lt;C&gt;
    createEmbeddedView(templateRef...): EmbeddedViewRef&lt;C&gt;
    ...
}</code></pre>
<p>上面两个方法是个很好的封装，可以传入模板引用对象或组件工厂对象来创建视图，并将该视图插入视图容器中特定位置。</p>
<h2 id="articleHeader9">ngTemplateOutlet 和 ngComponentOutlet</h2>
<p>尽管知道 Angular 操作 DOM 的内部机制是好事，但是要是有某种快捷方式就更好了啊。没错，Angular 提供了两种快捷指令：<code>ngTemplateOutlet</code> 和 <code>ngComponentOutlet</code>。写作本文时这两个指令都是实验性的，<code>ngComponentOutlet</code> 也将在版本 4 中可用（译者注：现在版本 5.* 也是实验性的，也都可用）。如果你读完了上文，就很容易知道这两个指令是做什么的。</p>
<h3 id="articleHeader10">ngTemplateOutlet</h3>
<p>该指令会把 DOM 元素标记为 <code>ViewContainer</code>，并插入由模板创建的嵌入视图，从而不需要在组件类中显式创建该嵌入视图。这样，上面实例中，针对创建嵌入视图并插入 <code>#vc</code> DOM 元素的代码就可以重写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container [ngTemplateOutlet]=&quot;tpl&quot;></ng-container>
        <span>I am last span</span>
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Component({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'sample'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;span&gt;I am first span&lt;/span&gt;
        &lt;ng-container [ngTemplateOutlet]="tpl"&gt;&lt;/ng-container&gt;
        &lt;span&gt;I am last span&lt;/span&gt;
        &lt;ng-template #tpl&gt;
            &lt;span&gt;I am span in template&lt;/span&gt;
        &lt;/ng-template&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SampleComponent</span> </span>{}</code></pre>
<p>从上面示例看到我们不需要在组件类中写任何实例化视图的代码。非常方便，对不对。</p>
<h3 id="articleHeader11">ngComponentOutlet</h3>
<p>这个指令与 <code>ngTemplateOutlet</code> 很相似，区别是 <code>ngComponentOutlet</code> 创建的是由组件实例化生成的宿主视图，不是嵌入视图。你可以这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ng-container *ngComponentOutlet=&quot;ColorComponent&quot;></ng-container>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;ng-container *ngComponentOutlet=<span class="hljs-string">"ColorComponent"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ng-container</span>&gt;</span></span></code></pre>
<h2 id="articleHeader12">总结</h2>
<p>看似有很多新知识需要消化啊，但实际上 Angular 通过视图操作 DOM 的思路模型是很清晰和连贯的。你可以使用 <code>ViewChild</code> 查询模板引用变量来获得 Angular DOM 抽象类。DOM 元素的最简单封装是 <code>ElementRef</code>；而对于模板，你可以使用 <code>TemplateRef</code> 来创建嵌入视图；而对于组件，可以使用 <code>ComponentRef</code> 来创建宿主视图，同时又可以使用 <code>ComponentFactoryResolver</code> 创建 <code>ComponentRef</code>。这两个创建的视图（即嵌入视图和宿主视图）又会被 <code>ViewContainerRef</code> 管理。最后，Angular 又提供了两个快捷指令自动化这个过程：<code>ngTemplateOutlet</code> 指令使用模板创建嵌入视图；<code>ngComponentOutlet</code> 使用动态组件创建宿主视图。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 探索 Angular 使用 ViewContainerRef 操作 DOM

## 原文链接
[https://segmentfault.com/a/1190000013860896](https://segmentfault.com/a/1190000013860896)

