---
title: 'Angular Renderer (渲染器)' 
date: 2019-01-07 2:30:11
hidden: true
slug: s8k2kpunchj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<p>Angular 其中的一个设计目标是使浏览器与 DOM 独立。DOM 是复杂的，因此使组件与它分离，会让我们的应用程序，更容易测试与重构。另外的好处是，由于这种解耦，使得我们的应用能够运行在其它平台 (比如：Node.js、WebWorkers、NativeScript 等)。</p>
<p>为了能够支持跨平台，Angular 通过抽象层封装了不同平台的差异。比如定义了抽象类 Renderer、Renderer2 、抽象类 RootRenderer 等。此外还定义了以下引用类型：ElementRef、TemplateRef、ViewRef 、ComponentRef 和 ViewContainerRef 等。</p>
<p>本文的主要内容是分析 Angular 中 Renderer (渲染器)，不过在进行具体分析前，我们先来介绍一下平台的概念。</p>
<h2 id="articleHeader0">平台</h2>
<h3 id="articleHeader1">什么是平台</h3>
<p>平台是应用程序运行的环境。它是一组服务，可以用来访问你的应用程序和 Angular 框架本身的内置功能。由于Angular 主要是一个 UI 框架，平台提供的最重要的功能之一就是页面渲染。</p>
<h3 id="articleHeader2">平台和引导应用程序</h3>
<p>在我们开始构建一个自定义渲染器之前，我们来看一下如何设置平台，以及引导应用程序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],
  bootstrap: [AppCmp]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {platformBrowserDynamic} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser-dynamic'</span>;
<span class="hljs-keyword">import</span> {BrowserModule} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;

<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule],
  bootstrap: [AppCmp]
})
<span class="hljs-keyword">class</span> AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);</code></pre>
<p>如你所见，引导过程由两部分组成：创建平台和引导模块。在这个例子中，我们导入 BrowserModule 模块，它是浏览器平台的一部分。应用中只能有一个激活的平台，但是我们可以利用它来引导多个模块，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const platformRef: PlatformRef = platformBrowserDynamic();
platformRef.bootstrapModule(AppModule1);
platformRef.bootstrapModule(AppModule2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> platformRef: PlatformRef = platformBrowserDynamic();
platformRef.bootstrapModule(AppModule1);
platformRef.bootstrapModule(AppModule2);</code></pre>
<p>由于应用中只能有一个激活的平台，单例的服务必须在该平台中注册。比如，浏览器只有一个地址栏，对应的服务对象就是单例。此外如何让我们自定义的 UI 界面，能够在浏览器中显示出来呢，这就需要使用 Angular 为我们提供的渲染器。</p>
<h2 id="articleHeader3">渲染器</h2>
<h3 id="articleHeader4">什么是渲染器</h3>
<p>渲染器是 Angular 为我们提供的一种内置服务，用于执行 UI 渲染操作。在浏览器中，渲染是将模型映射到视图的过程。模型的值可以是 JavaScript 中的原始数据类型、对象、数组或其它的数据对象。然而视图可以是页面中的段落、表单、按钮等其他元素，这些页面元素内部使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model" rel="nofollow noreferrer" target="_blank">DOM</a> (Document Object Model) 来表示。</p>
<h3 id="articleHeader5">Angular Renderer</h3>
<p><a href="https://github.com/angular/angular/blob/master/packages/core/src/render/api.ts#L112" rel="nofollow noreferrer" target="_blank">RootRenderer</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export abstract class RootRenderer {
  abstract renderComponent(componentType: RenderComponentType): Renderer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> RootRenderer {
  <span class="hljs-keyword">abstract</span> renderComponent(componentType: RenderComponentType): Renderer;
}</code></pre>
<p><a href="https://github.com/angular/angular/blob/master/packages/core/src/render/api.ts#L48" rel="nofollow noreferrer" target="_blank">Renderer</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @deprecated Use the `Renderer2` instead.
 */
export abstract class Renderer {
  abstract createElement(parentElement: any, name: string, 
    debugInfo?: RenderDebugInfo): any;
  abstract createText(parentElement: any, value: string, 
    debugInfo?: RenderDebugInfo): any;
  abstract listen(renderElement: any, name: string, callback: Function): Function;
  abstract listenGlobal(target: string, name: string, callback: Function): Function;
  abstract setElementProperty(renderElement: any, propertyName: string, propertyValue: 
    any): void;
  abstract setElementAttribute(renderElement: any, attributeName: string, 
    attributeValue: string): void;
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">/**
 * @deprecated Use the `Renderer2` instead.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> Renderer {
  <span class="hljs-keyword">abstract</span> createElement(parentElement: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>, 
    debugInfo?: RenderDebugInfo): <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">abstract</span> createText(parentElement: <span class="hljs-built_in">any</span>, value: <span class="hljs-built_in">string</span>, 
    debugInfo?: RenderDebugInfo): <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">abstract</span> listen(renderElement: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>, callback: <span class="hljs-built_in">Function</span>): <span class="hljs-built_in">Function</span>;
  <span class="hljs-keyword">abstract</span> listenGlobal(target: <span class="hljs-built_in">string</span>, name: <span class="hljs-built_in">string</span>, callback: <span class="hljs-built_in">Function</span>): <span class="hljs-built_in">Function</span>;
  <span class="hljs-keyword">abstract</span> setElementProperty(renderElement: <span class="hljs-built_in">any</span>, propertyName: <span class="hljs-built_in">string</span>, propertyValue: 
    <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> setElementAttribute(renderElement: <span class="hljs-built_in">any</span>, attributeName: <span class="hljs-built_in">string</span>, 
    attributeValue: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p><a href="https://github.com/angular/angular/blob/master/packages/core/src/render/api.ts#L147" rel="nofollow noreferrer" target="_blank">Renderer2</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export abstract class Renderer2 {
  abstract createElement(name: string, namespace?: string|null): any;
  abstract createComment(value: string): any;
  abstract createText(value: string): any;
  abstract setAttribute(el: any, name: string, value: string,
    namespace?: string|null): void;
  abstract removeAttribute(el: any, name: string, namespace?: string|null): void;
  abstract addClass(el: any, name: string): void;
  abstract removeClass(el: any, name: string): void;
  abstract setStyle(el: any, style: string, value: any, 
    flags?: RendererStyleFlags2): void;
  abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void;
  abstract setProperty(el: any, name: string, value: any): void;
  abstract setValue(node: any, value: string): void;
  abstract listen(
      target: 'window'|'document'|'body'|any, eventName: string,
      callback: (event: any) => boolean | void): () => void;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> Renderer2 {
  <span class="hljs-keyword">abstract</span> createElement(name: <span class="hljs-built_in">string</span>, <span class="hljs-keyword">namespace</span>?: <span class="hljs-built_in">string</span>|<span class="hljs-literal">null</span>): <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">abstract</span> createComment(value: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">abstract</span> createText(value: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">abstract</span> setAttribute(el: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>, value: <span class="hljs-built_in">string</span>,
    <span class="hljs-keyword">namespace</span>?: <span class="hljs-built_in">string</span>|<span class="hljs-literal">null</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> removeAttribute(el: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>, <span class="hljs-keyword">namespace</span>?: <span class="hljs-built_in">string</span>|<span class="hljs-literal">null</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> addClass(el: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> removeClass(el: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> setStyle(el: <span class="hljs-built_in">any</span>, style: <span class="hljs-built_in">string</span>, value: <span class="hljs-built_in">any</span>, 
    flags?: RendererStyleFlags2): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> removeStyle(el: <span class="hljs-built_in">any</span>, style: <span class="hljs-built_in">string</span>, flags?: RendererStyleFlags2): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> setProperty(el: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>, value: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> setValue(node: <span class="hljs-built_in">any</span>, value: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-keyword">abstract</span> listen(
      target: <span class="hljs-string">'window'</span>|<span class="hljs-string">'document'</span>|<span class="hljs-string">'body'</span>|<span class="hljs-built_in">any</span>, eventName: <span class="hljs-built_in">string</span>,
      callback: <span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span> | <span class="hljs-built_in">void</span>): <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;
}</code></pre>
<p>需要注意的是在 Angular 4.x+ 版本，我们使用 <code>Renderer2</code> 替代 <code>Renderer</code>。通过观察 Renderer 相关的抽象类 (Renderer、Renderer2)，我们发现抽象类中定义了很多抽象方法，用来创建元素、文本、设置属性、添加样式和设置事件监听等。</p>
<h3 id="articleHeader6">渲染器如何工作</h3>
<p>在实例化一个组件时，Angular 会调用 <code>renderComponent()</code> 方法并将其获取的渲染器与该组件实例相关联。Angular 将会在渲染组件时通过渲染器执行对应相关的操作，比如，创建元素、设置属性、添加样式和订阅事件等。</p>
<p><span class="img-wrap"><img data-src="/img/bVRurJ?w=983&amp;h=317" src="https://static.alili.tech/img/bVRurJ?w=983&amp;h=317" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">使用 Renderer</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'exe-cmp',
  template: `
    <h3>Exe Component</h3>
  `
})
export class ExeComponent {
  constructor(private renderer: Renderer2, elRef: ElementRef) {
    this.renderer.setProperty(elRef.nativeElement, 'author', 'semlinker');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-cmp'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;Exe Component&lt;/h3&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExeComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> renderer: Renderer2, elRef: ElementRef</span>) {
    <span class="hljs-keyword">this</span>.renderer.setProperty(elRef.nativeElement, <span class="hljs-string">'author'</span>, <span class="hljs-string">'semlinker'</span>);
  }
}</code></pre>
<p>以上代码中，我们利用构造注入的方式，注入 Renderer2 和 ElementRef 实例。有些读者可能会问，注入的实例对象是怎么生成的。这里我们只是稍微介绍一下相关知识，并不会详细展开。具体代码如下：</p>
<p><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/provider.ts#L20" rel="nofollow noreferrer" target="_blank">TokenKey</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/core/src/view/util.ts
const _tokenKeyCache = new Map<any, string>();
export function tokenKey(token: any): string {
  let key = _tokenKeyCache.get(token);
  if (!key) {
    key = stringify(token) + '_' + _tokenKeyCache.size;
    _tokenKeyCache.set(token, key);
  }
  return key;
}

// packages/core/src/view/provider.ts
const RendererV1TokenKey = tokenKey(RendererV1);
const Renderer2TokenKey = tokenKey(Renderer2);
const ElementRefTokenKey = tokenKey(ElementRef);
const ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
const TemplateRefTokenKey = tokenKey(TemplateRef);
const ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
const InjectorRefTokenKey = tokenKey(Injector);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/core/src/view/util.ts</span>
<span class="hljs-keyword">const</span> _tokenKeyCache = <span class="hljs-keyword">new</span> Map&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">string</span>&gt;();
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tokenKey</span>(<span class="hljs-params">token: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">string</span> </span>{
  <span class="hljs-keyword">let</span> key = _tokenKeyCache.get(token);
  <span class="hljs-keyword">if</span> (!key) {
    key = stringify(token) + <span class="hljs-string">'_'</span> + _tokenKeyCache.size;
    _tokenKeyCache.set(token, key);
  }
  <span class="hljs-keyword">return</span> key;
}

<span class="hljs-comment">// packages/core/src/view/provider.ts</span>
<span class="hljs-keyword">const</span> RendererV1TokenKey = tokenKey(RendererV1);
<span class="hljs-keyword">const</span> Renderer2TokenKey = tokenKey(Renderer2);
<span class="hljs-keyword">const</span> ElementRefTokenKey = tokenKey(ElementRef);
<span class="hljs-keyword">const</span> ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
<span class="hljs-keyword">const</span> TemplateRefTokenKey = tokenKey(TemplateRef);
<span class="hljs-keyword">const</span> ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
<span class="hljs-keyword">const</span> InjectorRefTokenKey = tokenKey(Injector);</code></pre>
<p><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/provider.ts#L343" rel="nofollow noreferrer" target="_blank">resolveDep()</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function resolveDep(
    view: ViewData, elDef: NodeDef, 
    allowPrivateServices: boolean, depDef: DepDef,
    notFoundValue: any = Injector.THROW_IF_NOT_FOUND): any {
  const tokenKey = depDef.tokenKey;
 // ...
  while (view) {
    if (elDef) {
      switch (tokenKey) {
        case RendererV1TokenKey: { // tokenKey(RendererV1)
          const compView = findCompView(view, elDef, allowPrivateServices);
          return createRendererV1(compView);
        }
        case Renderer2TokenKey: { // tokenKey(Renderer2)
          const compView = findCompView(view, elDef, allowPrivateServices);
          return compView.renderer;
        }
        case ElementRefTokenKey: // tokenKey(ElementRef)
          return new ElementRef(asElementData(view, elDef.index).renderElement);
           // ... 此外还包括：ViewContainerRefTokenKey、TemplateRefTokenKey、
        // ChangeDetectorRefTokenKey 等
      }
    }
  }
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolveDep</span>(<span class="hljs-params">
    view: ViewData, elDef: NodeDef, 
    allowPrivateServices: <span class="hljs-built_in">boolean</span>, depDef: DepDef,
    notFoundValue: <span class="hljs-built_in">any</span> = Injector.THROW_IF_NOT_FOUND</span>): <span class="hljs-title">any</span> </span>{
  <span class="hljs-keyword">const</span> tokenKey = depDef.tokenKey;
 <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">while</span> (view) {
    <span class="hljs-keyword">if</span> (elDef) {
      <span class="hljs-keyword">switch</span> (tokenKey) {
        <span class="hljs-keyword">case</span> RendererV1TokenKey: { <span class="hljs-comment">// tokenKey(RendererV1)</span>
          <span class="hljs-keyword">const</span> compView = findCompView(view, elDef, allowPrivateServices);
          <span class="hljs-keyword">return</span> createRendererV1(compView);
        }
        <span class="hljs-keyword">case</span> Renderer2TokenKey: { <span class="hljs-comment">// tokenKey(Renderer2)</span>
          <span class="hljs-keyword">const</span> compView = findCompView(view, elDef, allowPrivateServices);
          <span class="hljs-keyword">return</span> compView.renderer;
        }
        <span class="hljs-keyword">case</span> ElementRefTokenKey: <span class="hljs-comment">// tokenKey(ElementRef)</span>
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ElementRef(asElementData(view, elDef.index).renderElement);
           <span class="hljs-comment">// ... 此外还包括：ViewContainerRefTokenKey、TemplateRefTokenKey、</span>
        <span class="hljs-comment">// ChangeDetectorRefTokenKey 等</span>
      }
    }
  }
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>通过以上代码，我们发现当我们在组件类的构造函数中声明相应的依赖对象时，如 Renderer2 和 ElementRef，Angular 内部会调用 <code>resolveDep()</code> 方法，实例化 Token 对应依赖对象。</p>
<p>在大多数情况下，我们开发的 Angular 应用程序是运行在浏览器平台，接下来我们来了解一下该平台下的默认渲染器 - DefaultDomRenderer2。</p>
<h3 id="articleHeader8">DefaultDomRenderer2</h3>
<p>在浏览器平台下，我们可以通过调用 <code>DomRendererFactory2</code> 工厂，根据不同的视图封装方案，创建对应渲染器。</p>
<p><a href="https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/dom_renderer.ts#L62" rel="nofollow noreferrer" target="_blank">DomRendererFactory2</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/platform-browser/src/dom/dom_renderer.ts
@Injectable()
export class DomRendererFactory2 implements RendererFactory2 {
  private rendererByCompId = new Map<string, Renderer2>();
  private defaultRenderer: Renderer2;

  constructor(
    private eventManager: EventManager, 
    private sharedStylesHost: DomSharedStylesHost) {
    // 创建默认的DOM渲染器
    this.defaultRenderer = new DefaultDomRenderer2(eventManager);
  };

  createRenderer(element: any, type: RendererType2|null): Renderer2 {
    if (!element || !type) {
      return this.defaultRenderer;
    }
    // 根据不同的视图封装方案，创建不同的渲染器
    switch (type.encapsulation) {
      // 无 Shadow DOM，但是通过 Angular 提供的样式包装机制来封装组件，
      // 使得组件的样式不受外部影响，这是 Angular 的默认设置。
      case ViewEncapsulation.Emulated: {
        let renderer = this.rendererByCompId.get(type.id);
        if (!renderer) {
          renderer =
              new EmulatedEncapsulationDomRenderer2(this.eventManager, 
                  this.sharedStylesHost, type);
          this.rendererByCompId.set(type.id, renderer);
        }
        (<EmulatedEncapsulationDomRenderer2>renderer).applyToHost(element);
        return renderer;
      }
      // 使用原生的 Shadow DOM 特性  
      case ViewEncapsulation.Native:
        return new ShadowDomRenderer(this.eventManager, 
          this.sharedStylesHost, element, type);
      // 无 Shadow DOM，并且也无样式包装
      default: {
        // ...
        return this.defaultRenderer;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/platform-browser/src/dom/dom_renderer.ts</span>
<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DomRendererFactory2 <span class="hljs-keyword">implements</span> RendererFactory2 {
  <span class="hljs-keyword">private</span> rendererByCompId = <span class="hljs-keyword">new</span> Map&lt;<span class="hljs-built_in">string</span>, Renderer2&gt;();
  <span class="hljs-keyword">private</span> defaultRenderer: Renderer2;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> eventManager: EventManager, 
    <span class="hljs-keyword">private</span> sharedStylesHost: DomSharedStylesHost</span>) {
    <span class="hljs-comment">// 创建默认的DOM渲染器</span>
    <span class="hljs-keyword">this</span>.defaultRenderer = <span class="hljs-keyword">new</span> DefaultDomRenderer2(eventManager);
  };

  createRenderer(element: <span class="hljs-built_in">any</span>, <span class="hljs-keyword">type</span>: RendererType2|<span class="hljs-literal">null</span>): Renderer2 {
    <span class="hljs-keyword">if</span> (!element || !<span class="hljs-keyword">type</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.defaultRenderer;
    }
    <span class="hljs-comment">// 根据不同的视图封装方案，创建不同的渲染器</span>
    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>.encapsulation) {
      <span class="hljs-comment">// 无 Shadow DOM，但是通过 Angular 提供的样式包装机制来封装组件，</span>
      <span class="hljs-comment">// 使得组件的样式不受外部影响，这是 Angular 的默认设置。</span>
      <span class="hljs-keyword">case</span> ViewEncapsulation.Emulated: {
        <span class="hljs-keyword">let</span> renderer = <span class="hljs-keyword">this</span>.rendererByCompId.get(<span class="hljs-keyword">type</span>.id);
        <span class="hljs-keyword">if</span> (!renderer) {
          renderer =
              <span class="hljs-keyword">new</span> EmulatedEncapsulationDomRenderer2(<span class="hljs-keyword">this</span>.eventManager, 
                  <span class="hljs-keyword">this</span>.sharedStylesHost, <span class="hljs-keyword">type</span>);
          <span class="hljs-keyword">this</span>.rendererByCompId.set(<span class="hljs-keyword">type</span>.id, renderer);
        }
        (&lt;EmulatedEncapsulationDomRenderer2&gt;renderer).applyToHost(element);
        <span class="hljs-keyword">return</span> renderer;
      }
      <span class="hljs-comment">// 使用原生的 Shadow DOM 特性  </span>
      <span class="hljs-keyword">case</span> ViewEncapsulation.Native:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ShadowDomRenderer(<span class="hljs-keyword">this</span>.eventManager, 
          <span class="hljs-keyword">this</span>.sharedStylesHost, element, <span class="hljs-keyword">type</span>);
      <span class="hljs-comment">// 无 Shadow DOM，并且也无样式包装</span>
      <span class="hljs-keyword">default</span>: {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.defaultRenderer;
      }
    }
  }
}</code></pre>
<p>上面代码中的 <code>EmulatedEncapsulationDomRenderer2</code> 和 <code>ShadowDomRenderer</code> 类都继承于 <code>DefaultDomRenderer2</code> 类，接下来我们再来看一下 <a href="https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/dom_renderer.ts#L102" rel="nofollow noreferrer" target="_blank">DefaultDomRenderer2</a> 类的内部实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DefaultDomRenderer2 implements Renderer2 {  
  constructor(private eventManager: EventManager) {}

  // 省略 Renderer2 抽象类中定义的其它方法
  createElement(name: string, namespace?: string): any {
    if (namespace) {
      return document.createElementNS(NAMESPACE_URIS[namespace], name);
    }
    return document.createElement(name);
  }

  createComment(value: string): any { return document.createComment(value); }

  createText(value: string): any { return document.createTextNode(value); }

  addClass(el: any, name: string): void { el.classList.add(name); }

  setStyle(el: any, style: string, value: any, flags: RendererStyleFlags2): void {
    if (flags &amp; RendererStyleFlags2.DashCase) {
      el.style.setProperty(
          style, value, !!(flags &amp; RendererStyleFlags2.Important) ? 'important' : '');
    } else {
      el.style[style] = value;
    }
  }

  listen(
    target: 'window'|'document'|'body'|any, 
    event: string, 
    callback: (event: any) => boolean):
      () => void {
    checkNoSyntheticProp(event, 'listener');
    if (typeof target === 'string') {
      return <() => void>this.eventManager.addGlobalEventListener(
          target, event, decoratePreventDefault(callback));
    }
    return <() => void>this.eventManager.addEventListener(
          target, event, decoratePreventDefault(callback)) as() => void;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> DefaultDomRenderer2 <span class="hljs-keyword">implements</span> Renderer2 {  
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> eventManager: EventManager</span>) {}

  <span class="hljs-comment">// 省略 Renderer2 抽象类中定义的其它方法</span>
  createElement(name: <span class="hljs-built_in">string</span>, <span class="hljs-keyword">namespace</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">namespace</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.createElementNS(NAMESPACE_URIS[<span class="hljs-keyword">namespace</span>], name);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.createElement(name);
  }

  createComment(value: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span> { <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.createComment(value); }

  createText(value: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span> { <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.createTextNode(value); }

  addClass(el: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> { el.classList.add(name); }

  setStyle(el: <span class="hljs-built_in">any</span>, style: <span class="hljs-built_in">string</span>, value: <span class="hljs-built_in">any</span>, flags: RendererStyleFlags2): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (flags &amp; RendererStyleFlags2.DashCase) {
      el.style.setProperty(
          style, value, !!(flags &amp; RendererStyleFlags2.Important) ? <span class="hljs-string">'important'</span> : <span class="hljs-string">''</span>);
    } <span class="hljs-keyword">else</span> {
      el.style[style] = value;
    }
  }

  listen(
    target: <span class="hljs-string">'window'</span>|<span class="hljs-string">'document'</span>|<span class="hljs-string">'body'</span>|<span class="hljs-built_in">any</span>, 
    event: <span class="hljs-built_in">string</span>, 
    callback: <span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>):
      <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span> {
    checkNoSyntheticProp(event, <span class="hljs-string">'listener'</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target === <span class="hljs-string">'string'</span>) {
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>&gt;<span class="hljs-keyword">this</span>.eventManager.addGlobalEventListener(
          target, event, decoratePreventDefault(callback));
    }
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>&gt;<span class="hljs-keyword">this</span>.eventManager.addEventListener(
          target, event, decoratePreventDefault(callback)) <span class="hljs-keyword">as</span>() =&gt; <span class="hljs-built_in">void</span>;
  }
}</code></pre>
<p>介绍完 <code>DomRendererFactory2</code> 和 <code>DefaultDomRenderer2</code> 类，最后我们来看一下 Angular 内部如何利用它们。</p>
<h3 id="articleHeader9">DomRendererFactory2 内部应用</h3>
<p><a href="https://github.com/angular/angular/blob/master/packages/platform-browser/src/browser.ts#L79" rel="nofollow noreferrer" target="_blank">BrowserModule</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/platform-browser/src/browser.ts
@NgModule({
  providers: [
    // 配置 DomRendererFactory2 和 RendererFactory2 provider
    DomRendererFactory2,
    {provide: RendererFactory2, useExisting: DomRendererFactory2},
    // ...
  ],
  exports: [CommonModule, ApplicationModule]
})
export class BrowserModule {
  constructor(@Optional() @SkipSelf() parentModule: BrowserModule) {
    // 用于判断应用中是否已经导入BrowserModule模块
    if (parentModule) {
      throw new Error(
       `BrowserModule has already been loaded. If you need access to common 
        directives such as NgIf and NgFor from a lazy loaded module, 
        import CommonModule instead.`);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/platform-browser/src/browser.ts</span>
<span class="hljs-meta">@NgModule</span>({
  providers: [
    <span class="hljs-comment">// 配置 DomRendererFactory2 和 RendererFactory2 provider</span>
    DomRendererFactory2,
    {provide: RendererFactory2, useExisting: DomRendererFactory2},
    <span class="hljs-comment">// ...</span>
  ],
  exports: [CommonModule, ApplicationModule]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> BrowserModule {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">@Optional(</span>) @SkipSelf(<span class="hljs-params"></span>) parentModule: BrowserModule) {
    <span class="hljs-comment">// 用于判断应用中是否已经导入BrowserModule模块</span>
    <span class="hljs-keyword">if</span> (parentModule) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
       <span class="hljs-string">`BrowserModule has already been loaded. If you need access to common 
        directives such as NgIf and NgFor from a lazy loaded module, 
        import CommonModule instead.`</span>);
    }
  }
}</code></pre>
<p><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/view.ts#L204" rel="nofollow noreferrer" target="_blank">createComponentView()</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/core/src/view/view.ts
export function createComponentView(
  parentView: ViewData, 
  nodeDef: NodeDef, 
  viewDef: ViewDefinition, 
  hostElement: any): ViewData {
  const rendererType = nodeDef.element !.componentRendererType; // 步骤一
  let compRenderer: Renderer2;
  if (!rendererType) { // 步骤二
    compRenderer = parentView.root.renderer;
  } else {
    compRenderer = parentView.root.rendererFactory
      .createRenderer(hostElement, rendererType);
  }
  
  return createView(
    parentView.root, compRenderer, parentView, 
     nodeDef.element !.componentProvider, viewDef);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/core/src/view/view.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createComponentView</span>(<span class="hljs-params">
  parentView: ViewData, 
  nodeDef: NodeDef, 
  viewDef: ViewDefinition, 
  hostElement: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">ViewData</span> </span>{
  <span class="hljs-keyword">const</span> rendererType = nodeDef.element !.componentRendererType; <span class="hljs-comment">// 步骤一</span>
  <span class="hljs-keyword">let</span> compRenderer: Renderer2;
  <span class="hljs-keyword">if</span> (!rendererType) { <span class="hljs-comment">// 步骤二</span>
    compRenderer = parentView.root.renderer;
  } <span class="hljs-keyword">else</span> {
    compRenderer = parentView.root.rendererFactory
      .createRenderer(hostElement, rendererType);
  }
  
  <span class="hljs-keyword">return</span> createView(
    parentView.root, compRenderer, parentView, 
     nodeDef.element !.componentProvider, viewDef);
}</code></pre>
<ul><li>步骤一</li></ul>
<p>当 Angular 在创建组件视图时，会根据 <code>nodeDef.element</code> 对象的 <code>componentRendererType</code> 属性值，来创建组件的渲染器。接下来我们先来看一下 <code>NodeDef</code> 、 <code>ElementDef</code> 和 <code>RendererType2</code> 接口定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/core/src/view/types.ts
// 视图中节点的定义
export interface NodeDef {
  bindingIndex: number;
  bindings: BindingDef[];
  bindingFlags: BindingFlags;
  outputs: OutputDef[];
  element: ElementDef|null; // nodeDef.element
  provider: ProviderDef|null;
 // ...
}

// 元素的定义
export interface ElementDef {
  name: string|null;
  attrs: [string, string, string][]|null;
  template: ViewDefinition|null;
  componentProvider: NodeDef|null;
  // 设置组件渲染器的类型
  componentRendererType: RendererType2|null; // nodeDef.element.componentRendererType
  componentView: ViewDefinitionFactory|null;
  handleEvent: ElementHandleEventFn|null;
  // ...
}

// packages/core/src/render/api.ts
// RendererType2 接口定义
export interface RendererType2 {
  id: string;
  encapsulation: ViewEncapsulation; // Emulated、Native、None
  styles: (string|any[])[];
  data: {[kind: string]: any};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/core/src/view/types.ts</span>
<span class="hljs-comment">// 视图中节点的定义</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> NodeDef {
  bindingIndex: <span class="hljs-built_in">number</span>;
  bindings: BindingDef[];
  bindingFlags: BindingFlags;
  outputs: OutputDef[];
  element: ElementDef|<span class="hljs-literal">null</span>; <span class="hljs-comment">// nodeDef.element</span>
  provider: ProviderDef|<span class="hljs-literal">null</span>;
 <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// 元素的定义</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> ElementDef {
  name: <span class="hljs-built_in">string</span>|<span class="hljs-literal">null</span>;
  attrs: [<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>][]|<span class="hljs-literal">null</span>;
  template: ViewDefinition|<span class="hljs-literal">null</span>;
  componentProvider: NodeDef|<span class="hljs-literal">null</span>;
  <span class="hljs-comment">// 设置组件渲染器的类型</span>
  componentRendererType: RendererType2|<span class="hljs-literal">null</span>; <span class="hljs-comment">// nodeDef.element.componentRendererType</span>
  componentView: ViewDefinitionFactory|<span class="hljs-literal">null</span>;
  handleEvent: ElementHandleEventFn|<span class="hljs-literal">null</span>;
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// packages/core/src/render/api.ts</span>
<span class="hljs-comment">// RendererType2 接口定义</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> RendererType2 {
  id: <span class="hljs-built_in">string</span>;
  encapsulation: ViewEncapsulation; <span class="hljs-comment">// Emulated、Native、None</span>
  styles: (<span class="hljs-built_in">string</span>|<span class="hljs-built_in">any</span>[])[];
  data: {[kind: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span>};
}</code></pre>
<ul><li>步骤二</li></ul>
<p>获取 <code>componentRendererType</code> 的属性值后，如果该值为 <code>null</code> 的话，则直接使用 <code>parentView.root</code> 属性值对应的  <code>renderer</code> 对象。若该值不为空，则调用 <code>parentView.root</code> 对象的 <code>rendererFactory()</code> 方法创建 <code>renderer</code> 对象。</p>
<p>通过上面分析，我们发现不管走哪条分支，我们都需要使用 <code>parentView.root</code> 对象，然而该对象是什么特殊对象？我们发现 <code>parentView</code> 的数据类型是 <code>ViewData</code> ，该数据接口定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/core/src/view/types.ts
export interface ViewData {
  def: ViewDefinition;
  root: RootData;
  renderer: Renderer2;
  nodes: {[key: number]: NodeData};
  state: ViewState;
  oldValues: any[];
  disposables: DisposableFn[]|null;
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/core/src/view/types.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> ViewData {
  def: ViewDefinition;
  root: RootData;
  renderer: Renderer2;
  nodes: {[key: <span class="hljs-built_in">number</span>]: NodeData};
  state: ViewState;
  oldValues: <span class="hljs-built_in">any</span>[];
  disposables: DisposableFn[]|<span class="hljs-literal">null</span>;
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>通过 <code>ViewData</code> 的接口定义，我们终于发现了 <code>parentView.root</code> 的属性类型，即 <code>RootData</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/core/src/view/types.ts
export interface RootData {
  injector: Injector;
  ngModule: NgModuleRef<any>;
  projectableNodes: any[][];
  selectorOrNode: any;
  renderer: Renderer2;
  rendererFactory: RendererFactory2;
  errorHandler: ErrorHandler;
  sanitizer: Sanitizer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/core/src/view/types.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> RootData {
  injector: Injector;
  ngModule: NgModuleRef&lt;<span class="hljs-built_in">any</span>&gt;;
  projectableNodes: <span class="hljs-built_in">any</span>[][];
  selectorOrNode: <span class="hljs-built_in">any</span>;
  renderer: Renderer2;
  rendererFactory: RendererFactory2;
  errorHandler: ErrorHandler;
  sanitizer: Sanitizer;
}</code></pre>
<p>那好，现在问题来了：</p>
<ul>
<li>什么时候创建 <code>RootData</code> 对象？</li>
<li>怎么创建 <code>RootData</code> 对象？</li>
</ul>
<h4>什么时候创建 <code>RootData</code> 对象？</h4>
<p>当创建根视图的时候会创建 RootData，在开发环境会调用 <code>debugCreateRootView()</code> 方法创建 <code>RootView</code>，而在生产环境会调用 <code>createProdRootView()</code> 方法创建 <code>RootView</code>。简单起见，我们只分析 <code>createProdRootView()</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createProdRootView(
    elInjector: Injector, 
    projectableNodes: any[][], 
    rootSelectorOrNode: string | any,
    def: ViewDefinition, 
    ngModule: NgModuleRef<any>, 
    context?: any): ViewData {
  /** RendererFactory2 Provider 配置
   *  DomRendererFactory2,
   *  {provide: RendererFactory2, useExisting: DomRendererFactory2},
   */
  const rendererFactory: RendererFactory2 = ngModule.injector.get(RendererFactory2);
      
  return createRootView(
      createRootData(elInjector, ngModule, rendererFactory,
        projectableNodes, rootSelectorOrNode),
      def, context);
}

// 创建根视图
export function createRootView(root: RootData, def: ViewDefinition, 
  context?: any): ViewData {
  // 创建ViewData对象
  const view = createView(root, root.renderer, null, null, def);
  initView(view, context, context);
  createViewNodes(view);
  return view;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createProdRootView</span>(<span class="hljs-params">
    elInjector: Injector, 
    projectableNodes: <span class="hljs-built_in">any</span>[][], 
    rootSelectorOrNode: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">any</span>,
    def: ViewDefinition, 
    ngModule: NgModuleRef&lt;<span class="hljs-built_in">any</span>&gt;, 
    context?: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">ViewData</span> </span>{
  <span class="hljs-comment">/** RendererFactory2 Provider 配置
   *  DomRendererFactory2,
   *  {provide: RendererFactory2, useExisting: DomRendererFactory2},
   */</span>
  <span class="hljs-keyword">const</span> rendererFactory: RendererFactory2 = ngModule.injector.get(RendererFactory2);
      
  <span class="hljs-keyword">return</span> createRootView(
      createRootData(elInjector, ngModule, rendererFactory,
        projectableNodes, rootSelectorOrNode),
      def, context);
}

<span class="hljs-comment">// 创建根视图</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRootView</span>(<span class="hljs-params">root: RootData, def: ViewDefinition, 
  context?: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">ViewData</span> </span>{
  <span class="hljs-comment">// 创建ViewData对象</span>
  <span class="hljs-keyword">const</span> view = createView(root, root.renderer, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, def);
  initView(view, context, context);
  createViewNodes(view);
  <span class="hljs-keyword">return</span> view;
}</code></pre>
<p>上面代码中，当创建 <code>RootView</code> 的时候，会调用 <code>createRootData()</code> 方法创建 <code>RootData</code> 对象。最后一步就是分析 <code>createRootData()</code> 方法。</p>
<h4>怎么创建 <code>RootData</code> 对象？</h4>
<p>通过上面分析，我们知道通过 <code>createRootData()</code> 方法，来创建 <code>RootData</code> 对象。<code>createRootData()</code> 方法具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createRootData(
    elInjector: Injector, 
    ngModule: NgModuleRef<any>, 
    rendererFactory: RendererFactory2,
    projectableNodes: any[][], 
    rootSelectorOrNode: any): RootData {
  const sanitizer = ngModule.injector.get(Sanitizer);
  const errorHandler = ngModule.injector.get(ErrorHandler);
  // 创建RootRenderer
  const renderer = rendererFactory.createRenderer(null, null); 
  return {
    ngModule,
    injector: elInjector,
    projectableNodes,
    selectorOrNode: rootSelectorOrNode, 
    sanitizer, 
    rendererFactory, 
    renderer,
    errorHandler
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRootData</span>(<span class="hljs-params">
    elInjector: Injector, 
    ngModule: NgModuleRef&lt;<span class="hljs-built_in">any</span>&gt;, 
    rendererFactory: RendererFactory2,
    projectableNodes: <span class="hljs-built_in">any</span>[][], 
    rootSelectorOrNode: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">RootData</span> </span>{
  <span class="hljs-keyword">const</span> sanitizer = ngModule.injector.get(Sanitizer);
  <span class="hljs-keyword">const</span> errorHandler = ngModule.injector.get(ErrorHandler);
  <span class="hljs-comment">// 创建RootRenderer</span>
  <span class="hljs-keyword">const</span> renderer = rendererFactory.createRenderer(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>); 
  <span class="hljs-keyword">return</span> {
    ngModule,
    injector: elInjector,
    projectableNodes,
    selectorOrNode: rootSelectorOrNode, 
    sanitizer, 
    rendererFactory, 
    renderer,
    errorHandler
  };
}</code></pre>
<p>此时浏览器平台下， <code>Renderer</code> 渲染器的相关基础知识已介绍完毕。接下来，我们做一个简单总结：</p>
<ul>
<li>Angular 应用程序启动时会创建 RootView (生产环境下通过调用 createProdRootView() 方法)</li>
<li>创建 RootView 的过程中，会创建 RootData 对象，该对象可以通过 ViewData 的 root 属性访问到。基于  RootData 对象，我们可以通过 <code>renderer</code> 访问到默认的渲染器，即 DefaultDomRenderer2 实例，此外也可以通过 <code>rendererFactory</code> 访问到 <code>RendererFactory2</code> 实例。</li>
<li>在创建组件视图 (ViewData) 时，会根据 <code>componentRendererType</code> 的属性值，来设置组件关联的 <code>renderer</code> 渲染器。</li>
<li>当渲染组件视图的时候，Angular 会利用该组件关联的 <code>renderer</code> 提供的 API，创建该视图中的节点或执行视图的相关操作，比如创建元素 (createElement)、创建文本 (createText)、设置样式 (setStyle) 和 设置事件监听 (listen) 等。</li>
</ul>
<p>后面如果有时间的话，我们会介绍如何自定义渲染器，有兴趣的读者，可以先查阅 "参考资源" 中的链接。</p>
<h2 id="articleHeader10">参考资源</h2>
<ul><li><a href="https://blog.nrwl.io/experiments-with-angular-renderers-c5f647d4fd9e" rel="nofollow noreferrer" target="_blank">Experiments with Angular Renderers</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular Renderer (渲染器)

## 原文链接
[https://segmentfault.com/a/1190000010326100](https://segmentfault.com/a/1190000010326100)

