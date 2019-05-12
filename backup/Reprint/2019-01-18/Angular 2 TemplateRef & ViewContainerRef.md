---
title: 'Angular 2 TemplateRef & ViewContainerRef' 
date: 2019-01-18 2:30:35
hidden: true
slug: 4rbq2bsqelx
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<h3 id="articleHeader0">TemplateRef</h3>
<p>在介绍 TemplateRef 前，我们先来了解一下 HTML <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template" rel="nofollow noreferrer" target="_blank">模板元素</a> -  &lt;template&gt; 。模板元素是一种机制，允许包含加载页面时不渲染，但又可以随后通过 JavaScript 进行实例化的客户端内容。我们可以将模板视作为存储在页面上稍后使用的一小段内容。</p>
<p>在 HTML5 标准引入 template 模板元素之前，我们都是使用 &lt;script&gt; 标签进行客户端模板的定义，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script id=&quot;tpl-mock&quot; type=&quot;text/template&quot;>
   <span>I am span in mock template</span>
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl-mock"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span>&gt;</span><span class="handlebars"><span class="xml">
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am span in mock template<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>对于支持 HTML5 template 模板元素的浏览器，我们可以这样创建客户端模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;tpl&quot;>
    <span>I am span in template</span>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am span in template<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>下面我们来看一下 HTML5 template 模板元素的使用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head><meta charset=&quot;UTF-8&quot;> <title>HTML5 Template Element Demo</title></head>
<body>
<h4>HTML5 Template Element Demo</h4>
<!-- Template Container -->
<div class=&quot;tpl-container&quot;></div>
<!-- Template -->
<template id=&quot;tpl&quot;>
    <span>I am span in template</span>
</template>
<!-- Script -->
<script type=&quot;text/javascript&quot;>
    (function renderTpl() {
        if ('content' in document.createElement('template')) {
            var tpl = document.querySelector('#tpl');
            var tplContainer = document.querySelector('.tpl-container');
            var tplNode = document.importNode(tpl.content, true);
            tplContainer.appendChild(tplNode); 
        } else {
            throw  new Error(&quot;Current browser doesn't support template element&quot;);
        }
    })();
</script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>HTML5 Template Element Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>HTML5 Template Element Demo<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Template Container --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tpl-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>I am span in template<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Script --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderTpl</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-string">'content'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'template'</span>)) {
            <span class="hljs-keyword">var</span> tpl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#tpl'</span>);
            <span class="hljs-keyword">var</span> tplContainer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.tpl-container'</span>);
            <span class="hljs-keyword">var</span> tplNode = <span class="hljs-built_in">document</span>.importNode(tpl.content, <span class="hljs-literal">true</span>);
            tplContainer.appendChild(tplNode); 
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">throw</span>  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Current browser doesn't support template element"</span>);
        }
    })();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>以上代码运行后，在浏览器中我们会看到以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTML5 Template Element Demo

I am span in template
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>HTML5 Template Element Demo

I am <span class="hljs-selector-tag">span</span> <span class="hljs-keyword">in</span> template
</code></pre>
<p>而当我们注释掉 tplContainer.appendChild(tplNode) 语句时，刷新浏览器后看到的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTML5 Template Element Demo
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>HTML5 Template <span class="hljs-built_in">Element</span> Demo
</code></pre>
<p>这说明页面中  &lt;template&gt;  模板元素中的内容，如果没有进行处理对用户来说是不可见的。Angular 2 中，&lt;template&gt; 模板元素主要应用在结构指令中，此外在 <a href="https://segmentfault.com/a/1190000008626070">Angular 2 属性指令 vs 结构指令</a> 文章中我们也介绍了 &lt;template&gt; 模板元素和自定义结构指令，接下来我们先来介绍一下本文中的第一个主角 - TemplateRef：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <template #tpl>
      <span>I am span in template</span>
    </template>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';

  @ViewChild('tpl')
  tpl: TemplateRef<any>;

  ngAfterViewInit() {
    console.dir(this.tpl);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> {Component, TemplateRef, ViewChild, AfterViewInit} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h1&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h1&gt;
    &lt;template #tpl&gt;
      &lt;span&gt;I am span in template&lt;/</span>span&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>
  name: string = <span class="hljs-string">'Semlinker'</span>;

  @ViewChild(<span class="hljs-string">'tpl'</span>)
  tpl: TemplateRef&lt;any&gt;;

  ngAfterViewInit() {
    <span class="hljs-built_in">console</span>.dir(<span class="hljs-keyword">this</span>.tpl);
  }
}
</code></pre>
<p>上述代码运行后的控制台的输出结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVKyfR?w=680&amp;h=389" src="https://static.alili.tech/img/bVKyfR?w=680&amp;h=389" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从上图中，我们发现 @Component template 中定义的 &lt;template&gt; 模板元素，渲染后被替换成 comment 元素，其内容为 "template bindings={}" 。此外我们通过 @ViewChild 获取的模板元素，是 TemplateRef_ 类的实例，接下来我们来研究一下 TemplateRef_ 类：</p>
<p><strong>TemplateRef_</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @angular/core/src/linker/template_ref.d.ts
export declare class TemplateRef_<C> extends TemplateRef<C> {
    private _parentView;
    private _nodeIndex;
    private _nativeElement;
    constructor(_parentView: AppView<any>, _nodeIndex: number, _nativeElement: any);
    createEmbeddedView(context: C): EmbeddedViewRef<C>;
    elementRef: ElementRef;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// @angular/core/src/linker/template_ref.d.ts</span>
export declare <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TemplateRef_&lt;C&gt;</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">TemplateRef&lt;C&gt;</span> </span>{
    <span class="hljs-keyword">private</span> _parentView;
    <span class="hljs-keyword">private</span> _nodeIndex;
    <span class="hljs-keyword">private</span> _nativeElement;
    constructor(_parentView: <span class="hljs-type">AppView</span>&lt;any&gt;, _nodeIndex: number, _nativeElement: any);
    createEmbeddedView(context: <span class="hljs-type">C</span>): <span class="hljs-type">EmbeddedViewRef</span>&lt;<span class="hljs-type">C</span>&gt;;
    elementRef: <span class="hljs-type">ElementRef</span>;
}
</code></pre>
<p><strong>TemplateRef</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @angular/core/src/linker/template_ref.d.ts
// 用于表示内嵌的template模板，能够用于创建内嵌视图(Embedded Views)
export declare abstract class TemplateRef<C> {
    elementRef: ElementRef;
    abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// @angular/core/src/linker/template_ref.d.ts</span>
<span class="hljs-comment">// 用于表示内嵌的template模板，能够用于创建内嵌视图(Embedded Views)</span>
<span class="hljs-keyword">export</span> declare <span class="hljs-keyword">abstract</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TemplateRef</span>&lt;<span class="hljs-title">C</span>&gt; </span>{
    elementRef: ElementRef;
    <span class="hljs-keyword">abstract</span> createEmbeddedView(context: C): EmbeddedViewRef&lt;C&gt;;
}
</code></pre>
<p>(备注：抽象类与普通类的区别是抽象类有包含抽象方法，不能直接实例化抽象类，只能实例化该抽象类的子类)</p>
<p>我们已经知道 &lt;template&gt; 模板元素，渲染后被替换成 comment 元素，那么应该如何显示我们模板中定义的内容呢 ？我们注意到了 TemplateRef 抽象类中定义的 createEmbeddedView<br>抽象方法，该方法的返回值是 EmbeddedViewRef 对象。那好我们马上来试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <template #tpl>
      <span>I am span in template</span>
    </template>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';

  @ViewChild('tpl')
  tpl: TemplateRef<any>;

  ngAfterViewInit() {
    let embeddedView = this.tpl.createEmbeddedView(null);
    console.dir(embeddedView);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> {Component, TemplateRef, ViewChild, AfterViewInit} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h1&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h1&gt;
    &lt;template #tpl&gt;
      &lt;span&gt;I am span in template&lt;/</span>span&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>
  name: string = <span class="hljs-string">'Semlinker'</span>;

  @ViewChild(<span class="hljs-string">'tpl'</span>)
  tpl: TemplateRef&lt;any&gt;;

  ngAfterViewInit() {
    let embeddedView = <span class="hljs-keyword">this</span>.tpl.createEmbeddedView(<span class="hljs-literal">null</span>);
    <span class="hljs-built_in">console</span>.dir(embeddedView);
  }
}
</code></pre>
<p>上述代码运行后的控制台的输出结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVKyfW?w=469&amp;h=201" src="https://static.alili.tech/img/bVKyfW?w=469&amp;h=201" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从图中我们可以知道，当调用 createEmbeddedView 方法后返回了 ViewRef_ 视图对象。该视图对象的 rootNodes 属性包含了 &lt;template&gt; 模板中的内容。在上面的例子中，我们知道了 TemplateRef 实例对象中的 elementRef 属性封装了我们的 comment 元素，那么我们可以通过 insertBefore 方法来创建我们模板中定义的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <template #tpl>
      <span>I am span in template "{{"name"}}"</span>
    </template>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';

  @ViewChild('tpl')
  tpl: TemplateRef<any>;

  ngAfterViewInit() {
    // 页面中的<!--template bindings={}-->元素
    let commentElement = this.tpl.elementRef.nativeElement;
    // 创建内嵌视图
    let embeddedView = this.tpl.createEmbeddedView(null);
    // 动态添加子节点
    embeddedView.rootNodes.forEach((node) => {
        commentElement.parentNode
          .insertBefore(node, commentElement.nextSibling);
    });
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Component, TemplateRef, ViewChild, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;h1&gt;Welcome to Angular World&lt;/h1&gt;
    &lt;template #tpl&gt;
      &lt;span&gt;I am span in template "{{"name"}}"&lt;/span&gt;
    &lt;/template&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  name: <span class="hljs-built_in">string</span> = <span class="hljs-string">'Semlinker'</span>;

  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'tpl'</span>)
  tpl: TemplateRef&lt;<span class="hljs-built_in">any</span>&gt;;

  ngAfterViewInit() {
    <span class="hljs-comment">// 页面中的&lt;!--template bindings={}--&gt;元素</span>
    <span class="hljs-keyword">let</span> commentElement = <span class="hljs-keyword">this</span>.tpl.elementRef.nativeElement;
    <span class="hljs-comment">// 创建内嵌视图</span>
    <span class="hljs-keyword">let</span> embeddedView = <span class="hljs-keyword">this</span>.tpl.createEmbeddedView(<span class="hljs-literal">null</span>);
    <span class="hljs-comment">// 动态添加子节点</span>
    embeddedView.rootNodes.forEach(<span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
        commentElement.parentNode
          .insertBefore(node, commentElement.nextSibling);
    });
  }
}
</code></pre>
<p>成功运行上面的代码后，在浏览器中我们会看到以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Welcome to Angular World

I am span in template
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Welcome to Angular World

I am <span class="hljs-selector-tag">span</span> <span class="hljs-keyword">in</span> template
</code></pre>
<p>现在我们来回顾一下，上面的处理步骤：</p>
<ul>
<li>创建内嵌视图(embedded view)</li>
<li>遍历内嵌视图中的 rootNodes，动态的插入 node</li>
</ul>
<p>虽然我们已经成功的显示出 template 模板元素中的内容，但发现整个流程还是太复杂了，那有没有简单地方式呢 ？是时候介绍本文中第二个主角 - ViewContainerRef。</p>
<h3 id="articleHeader1">ViewContainerRef</h3>
<p>我们先来检验一下它的能力，然后再来好好地分析它。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <template #tpl>
      <span>I am span in template</span>
    </template>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';

  @ViewChild('tpl')
  tplRef: TemplateRef<any>;

  @ViewChild('tpl', { read: ViewContainerRef })
  tplVcRef: ViewContainerRef;

  ngAfterViewInit() {
    // console.dir(this.tplVcRef); (1)
    this.tplVcRef.createEmbeddedView(this.tplRef);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h1&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h1&gt;
    &lt;template #tpl&gt;
      &lt;span&gt;I am span in template&lt;/</span>span&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>
  name: string = <span class="hljs-string">'Semlinker'</span>;

  @ViewChild(<span class="hljs-string">'tpl'</span>)
  tplRef: TemplateRef&lt;any&gt;;

  @ViewChild(<span class="hljs-string">'tpl'</span>, { read: ViewContainerRef })
  tplVcRef: ViewContainerRef;

  ngAfterViewInit() {
    <span class="hljs-regexp">//</span> <span class="hljs-built_in">console</span>.dir(<span class="hljs-keyword">this</span>.tplVcRef); (<span class="hljs-number">1</span>)
    <span class="hljs-keyword">this</span>.tplVcRef.createEmbeddedView(<span class="hljs-keyword">this</span>.tplRef);
  }
}
</code></pre>
<p>移除上面代码中的注释，即可在控制台看到以下的输出信息：</p>
<p><span class="img-wrap"><img data-src="/img/bVKyf1?w=677&amp;h=422" src="https://static.alili.tech/img/bVKyf1?w=677&amp;h=422" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>而在浏览器中我们会看到以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Welcome to Angular World

I am span in template
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Welcome to Angular World

I am <span class="hljs-selector-tag">span</span> <span class="hljs-keyword">in</span> template
</code></pre>
<p>接下来我们来看一下 ViewContainerRef_ 类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @angular/core/src/linker/view_container_ref.d.ts
// 用于表示一个视图容器，可添加一个或多个视图
export declare class ViewContainerRef_ implements ViewContainerRef {
    ...
    length: number; // 返回视图容器中已存在的视图个数
    element: ElementRef;
    injector: Injector;
    parentInjector: Injector;
      // 基于TemplateRef创建内嵌视图，并自动添加到视图容器中，可通过index设置
    // 视图添加的位置
    createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, 
      index?: number): EmbeddedViewRef<C>;
    // 基 ComponentFactory创建组件视图
    createComponent<C>(componentFactory: ComponentFactory<C>,
      index?: number, injector?: Injector, projectableNodes?: any[][]): ComponentRef<C>;
    insert(viewRef: ViewRef, index?: number): ViewRef;
    move(viewRef: ViewRef, currentIndex: number): ViewRef;
    indexOf(viewRef: ViewRef): number;
    remove(index?: number): void;
    detach(index?: number): ViewRef;
    clear(): void;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// @angular/core/src/linker/view_container_ref.d.ts</span>
<span class="hljs-comment">// 用于表示一个视图容器，可添加一个或多个视图</span>
export declare <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ViewContainerRef_</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">ViewContainerRef</span> {</span>
    ...
<span class="hljs-symbol">    length:</span> number; <span class="hljs-comment">// 返回视图容器中已存在的视图个数</span>
<span class="hljs-symbol">    element:</span> ElementRef;
<span class="hljs-symbol">    injector:</span> Injector;
<span class="hljs-symbol">    parentInjector:</span> Injector;
      <span class="hljs-comment">// 基于TemplateRef创建内嵌视图，并自动添加到视图容器中，可通过index设置</span>
    <span class="hljs-comment">// 视图添加的位置</span>
    createEmbeddedView&lt;C&gt;(<span class="hljs-string">templateRef:</span> TemplateRef&lt;C&gt;, context?: C, 
      index?: number): EmbeddedViewRef&lt;C&gt;;
    <span class="hljs-comment">// 基 ComponentFactory创建组件视图</span>
    createComponent&lt;C&gt;(<span class="hljs-string">componentFactory:</span> ComponentFactory&lt;C&gt;,
      index?: number, injector?: Injector, projectableNodes?: any[][]): ComponentRef&lt;C&gt;;
    insert(<span class="hljs-string">viewRef:</span> ViewRef, index?: number): ViewRef;
    move(<span class="hljs-string">viewRef:</span> ViewRef, <span class="hljs-string">currentIndex:</span> number): ViewRef;
    indexOf(<span class="hljs-string">viewRef:</span> ViewRef): number;
    remove(index?: number): <span class="hljs-keyword">void</span>;
    detach(index?: number): ViewRef;
    clear(): <span class="hljs-keyword">void</span>;
}
</code></pre>
<p>通过源码我们可以知道通过 ViewContainerRef_ 实例，我们可以方便地操作视图，也可以方便地基于 TemplateRef 创建视图。现在我们来总结一下 TemplateRef 与 ViewContainerRef。</p>
<p>TemplateRef：用于表示内嵌的 template 模板元素，通过 TemplateRef 实例，我们可以方便创建内嵌视图(Embedded Views)，且可以轻松地访问到通过 ElementRef 封装后的 nativeElement。需要注意的是组件视图中的 template 模板元素，经过渲染后会被替换成 comment 元素。</p>
<p>ViewContainerRef：用于表示一个视图容器，可添加一个或多个视图。通过 ViewContainer<br>Ref 实例，我们可以基于 TemplateRef 实例创建内嵌视图，并能指定内嵌视图的插入位置，也可以方便对视图容器中已有的视图进行管理。简而言之，ViewContainerRef 的主要作用是创建和管理内嵌视图或组件视图。</p>
<h3 id="articleHeader2">我有话说</h3>
<p>1.Angular 2 支持的 View(视图) 类型有哪几种 ？</p>
<ul>
<li>Embedded Views - Template 模板元素</li>
<li>Host Views - Component 组件</li>
</ul>
<p>1.1 如何创建 Embedded View</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>ngAfterViewInit() {
    <span class="hljs-keyword">let</span> view = <span class="hljs-keyword">this</span>.tpl.createEmbeddedView(<span class="hljs-literal">null</span>);
}
</code></pre>
<p>1.2 如何创建 Host View</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(private injector: Injector,
    private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(AppComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(<span class="hljs-keyword">private</span> injector: Injector,
    <span class="hljs-keyword">private</span> r: ComponentFactoryResolver)</span> <span class="hljs-comment">{
    let factory = this.r.resolveComponentFactory(AppComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}</span>
</span></code></pre>
<p>2.Angular 2 Component 组件中定义的 &lt;template&gt; 模板元素为什么渲染后会被移除 ？</p>
<p>因为 &lt;template&gt; 模板元素，已经被 Angular 2 解析并封装成 TemplateRef 实例，通过 TemplateRef 实例，我们可以方便地创建内嵌视图(Embedded View)，我们不需要像开篇中的例子那样，手动操作 &lt;template&gt; 模板元素。</p>
<p>3.ViewRef 与 EmbeddedViewRef 之间有什么关系 ？</p>
<p>ViewRef 用于表示 Angular View(视图)，视图是可视化的 UI 界面。EmbeddedViewRef 继承于 ViewRef，用于表示 &lt;template&gt; 模板元素中定义的 UI 元素。</p>
<p>ViewRef</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @angular/core/src/linker/view_ref.d.ts
export declare abstract class ViewRef {
    destroyed: boolean;
    abstract onDestroy(callback: Function): any;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// @angular/core/src/linker/view_ref.d.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">declare</span> <span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> ViewRef {
    destroyed: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-keyword">abstract</span> onDestroy(callback: <span class="hljs-built_in">Function</span>): <span class="hljs-built_in">any</span>;
}
</code></pre>
<p>EmbeddedViewRef</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @angular/core/src/linker/view_ref.d.ts
export declare abstract class EmbeddedViewRef<C> extends ViewRef {
    context: C;
    rootNodes: any[]; // 保存<template>模板中定义的元素
    abstract destroy(): void; // 用于销毁视图
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// @angular/core/src/linker/view_ref.d.ts</span>
export declare <span class="hljs-keyword">abstract</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EmbeddedViewRef&lt;C&gt;</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">ViewRef</span> </span>{
    context: <span class="hljs-type">C</span>;
    rootNodes: any[]; <span class="hljs-comment">// 保存&lt;template&gt;模板中定义的元素</span>
    <span class="hljs-keyword">abstract</span> destroy(): void; <span class="hljs-comment">// 用于销毁视图</span>
}
</code></pre>
<h3 id="articleHeader3">总结</h3>
<p>Angular 2 中 TemplateRef 与 ViewContainerRef 的概念对于初学者来说会比较羞涩难懂，本文从基本的 HTML 5 &lt;template&gt; 模板元素开始，介绍了如何操作和应用页面中定义的模板。然后通过实例介绍了 Angular 2 中 TemplateRef 和 ViewContainerRef 的定义和作用。希望通过这篇文章，读者能更好的理解 TemplateRef 与 ViewContainerRef。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2 TemplateRef & ViewContainerRef

## 原文链接
[https://segmentfault.com/a/1190000008672478](https://segmentfault.com/a/1190000008672478)

