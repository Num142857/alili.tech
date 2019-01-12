---
title: 'Angular 4 指令快速入门' 
date: 2019-01-13 2:30:11
hidden: true
slug: wqqfqpl147q
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>建了个群有兴趣的朋友可以加一下 QQ 群：Angular 修仙之路(1)群 - 153742079 (已满)，请加 Angular 修仙之路(2)群 - 648681235。</blockquote>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>第一节 - 创建指令</li>
<li>第二节 - 定义输入属性</li>
<li>第三节 - 事件处理</li>
<li>第四节 - 获取宿主元素属性值</li>
<li>第五节 - 使用 <code>&lt;ng-template&gt;</code> 元素</li>
<li>第六节 - 使用 <code>ngTemplateOutlet</code> 指令</li>
<li>第七节 - 创建结构指令</li>
</ul>
<h2 id="articleHeader1">阅读须知</h2>
<p>本系列教程的开发环境及开发语言：</p>
<ul>
<li><a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">Angular 4 +</a></li>
<li><a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a></li>
<li><a href="https://www.typescriptlang.org/index.html" rel="nofollow noreferrer" target="_blank">TypeScript</a></li>
</ul>
<h2 id="articleHeader2">基础知识</h2>
<h3 id="articleHeader3">Angular CLI 基本使用</h3>
<ul><li>安装 <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a> (可选)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @angular/cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install -g @angular/cli</code></pre>
<ul><li>创建新的项目</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng new PROJECT-NAME" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">ng <span class="hljs-keyword">new</span> <span class="hljs-keyword">PROJECT</span>-NAME</code></pre>
<ul><li>启动本地服务器</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd PROJECT-NAME
ng serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> PROJECT-NAME
ng serve</code></pre>
<h3 id="articleHeader4">Angular 指令简介</h3>
<p>Angular 的指令分为三种：</p>
<ul>
<li>组件(Component directive)：用于构建UI组件，继承于 Directive 类</li>
<li>属性指令(Attribute directive)：用于改变组件的外观或行为</li>
<li>结构指令(Structural directive)：用于动态添加或删除 <code>DOM</code> 元素来改变 <code>DOM </code> 布局</li>
</ul>
<h4>Angular 指令分类图</h4>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVKPVI?w=933&amp;h=387" src="https://static.alili.techhttps://segmentfault.com/img/bVKPVI?w=933&amp;h=387" alt="angular-directive" title="angular-directive" style="cursor: pointer; display: inline;"></span></p>
<h4>Angular 组件组成图</h4>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVKQcl?w=922&amp;h=344" src="https://static.alili.techhttps://segmentfault.com/img/bVKQcl?w=922&amp;h=344" alt="angular-component-compose" title="angular-component-compose" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">第一节 - 创建指令</h2>
<p>在 Angular 中，我们可以使用 <code>HostBinding</code> 装饰器，实现元素的属性绑定。</p>
<h3 id="articleHeader6">指令的作用</h3>
<p>该指令用于演示如何利用 <code>HostBinding</code> 装饰器，设置元素的 <code>innerText</code> 属性。</p>
<h3 id="articleHeader7">指令的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostBinding} from '@angular/core';

@Directive({
    selector: '[greet]'
})
export class GreetDirective {
  @HostBinding() innerText = 'Hello, Everyone!';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostBinding} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[greet]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> GreetDirective {
  <span class="hljs-meta">@HostBinding</span>() innerText = <span class="hljs-string">'Hello, Everyone!'</span>;
}</code></pre>
<h3 id="articleHeader8">指令的应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Hello, Angular</h2>
    <h2 greet>Hello, Angular</h2>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h2&gt;Hello, Angular&lt;/h2&gt;
    &lt;h2 greet&gt;Hello, Angular&lt;/h2&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h2 id="articleHeader9">第二节 - 定义输入属性</h2>
<p>为了能够让用户自定义 <code>GreetDirective</code> 指令的问候内容，我们需要使用 <code>Input</code> 装饰器去定义指令的输入属性。</p>
<h3 id="articleHeader10">指令的作用</h3>
<p>该指令用于演示如何利用 <code>Input</code> 装饰器，定义指令的输入属性，从而实现让用户自定义问候内容。</p>
<h3 id="articleHeader11">指令的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[greet]'
})
export class GreetDirective {
    @Input() greet: string;
    @HostBinding() get innerText() {
        return this.greet;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostBinding, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[greet]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> GreetDirective {
    <span class="hljs-meta">@Input</span>() greet: <span class="hljs-built_in">string</span>;
    <span class="hljs-meta">@HostBinding</span>() <span class="hljs-keyword">get</span> innerText() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.greet;
    }
}</code></pre>
<h3 id="articleHeader12">指令的应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Hello, Angular</h2>
    <h2 [greet]=&quot;'Hello, Semlinker!'&quot;>Hello, Angular</h2>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h2&gt;Hello, Angular&lt;/h2&gt;
    &lt;h2 [greet]="'Hello, Semlinker!'"&gt;Hello, Angular&lt;/h2&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h2 id="articleHeader13">第三节 - 事件处理</h2>
<p>在 Angular 中，我们可以使用 <code>HostListener</code> 属性装饰器，实现元素的事件绑定。</p>
<h3 id="articleHeader14">指令的作用</h3>
<p>该指令用于演示如何利用 <code>HostListener</code> 装饰器，监听用户的点击事件。</p>
<h3 id="articleHeader15">指令的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[greet]'
})
export class GreetDirective {
   @Input() greet: string;

   @HostBinding() get innerText() {
      return this.greet;
   }

   @HostListener('click',['$event']) 
    onClick(event) {
      this.greet = 'Clicked!';
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostBinding, HostListener, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[greet]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> GreetDirective {
   <span class="hljs-meta">@Input</span>() greet: <span class="hljs-built_in">string</span>;

   <span class="hljs-meta">@HostBinding</span>() <span class="hljs-keyword">get</span> innerText() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.greet;
   }

   <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'click'</span>,[<span class="hljs-string">'$event'</span>]) 
    onClick(event) {
      <span class="hljs-keyword">this</span>.greet = <span class="hljs-string">'Clicked!'</span>;
   }
}</code></pre>
<h3 id="articleHeader16">指令的应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Hello, Angular</h2>
    <h2 [greet]=&quot;'Hello, Semlinker!'&quot;>Hello, Angular</h2>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h2&gt;Hello, Angular&lt;/h2&gt;
    &lt;h2 [greet]="'Hello, Semlinker!'"&gt;Hello, Angular&lt;/h2&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h2 id="articleHeader17">第四节 - 获取宿主元素属性值</h2>
<p>在 Angular 中，我们可以通过 <code>Attribute</code> 装饰器来获取指令宿主元素的属性值。</p>
<h3 id="articleHeader18">指令的作用</h3>
<p>该指令用于演示如何利用 <code>Attribute</code> 装饰器，获取指令宿主元素上的自定义属性 <code>author</code> 的值。</p>
<h3 id="articleHeader19">指令的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostBinding, HostListener, Input, Attribute } from '@angular/core';

@Directive({
    selector: '[greet]'
})
export class GreetDirective {
    @Input() greet: string;

    @HostBinding() get innerText() {
        return this.greet;
    }

    @HostListener('click',['$event']) 
    onClick(event) {
        this.greet = 'Clicked!';
        console.dir(event);
    }

    constructor(@Attribute('author') public author: string) {
        console.log(author);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostBinding, HostListener, Input, Attribute } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[greet]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> GreetDirective {
    <span class="hljs-meta">@Input</span>() greet: <span class="hljs-built_in">string</span>;

    <span class="hljs-meta">@HostBinding</span>() <span class="hljs-keyword">get</span> innerText() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.greet;
    }

    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'click'</span>,[<span class="hljs-string">'$event'</span>]) 
    onClick(event) {
        <span class="hljs-keyword">this</span>.greet = <span class="hljs-string">'Clicked!'</span>;
        <span class="hljs-built_in">console</span>.dir(event);
    }

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">@Attribute('author'</span>) public author: string) {
        <span class="hljs-built_in">console</span>.log(author);
    }
}</code></pre>
<h3 id="articleHeader20">指令的应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Hello, Angular</h2>
    <h2 [greet]=&quot;'Hello, Semlinker!'&quot; 
      author=&quot;semlinker&quot;>Hello, Angular</h2>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h2&gt;Hello, Angular&lt;/h2&gt;
    &lt;h2 [greet]="'Hello, Semlinker!'" 
      author="semlinker"&gt;Hello, Angular&lt;/h2&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h2 id="articleHeader21">第五节 - 使用 <code>&lt;ng-template&gt;</code> 元素</h2>
<p>在 Angular 中，我们可以通过 <code>ViewChild</code> 装饰器来获取视图中定义的模板元素，然后利用 <code>ViewContainerRef</code> 对象的 <code>createEmbeddedView()</code> 方法，创建内嵌视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, TemplateRef, ViewContainerRef, ViewChild, 
  AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-template #tpl>
      Hello, Semlinker!
    </ng-template>
  `,
})
export class AppComponent implements AfterViewInit{
  @ViewChild('tpl')
  tplRef: TemplateRef<any>;

  constructor(private vcRef: ViewContainerRef) {}

  ngAfterViewInit() {
    this.vcRef.createEmbeddedView(this.tplRef);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, TemplateRef, ViewContainerRef, ViewChild, 
  AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;ng-template #tpl&gt;
      Hello, Semlinker!
    &lt;/ng-template&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> AfterViewInit{
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'tpl'</span>)
  tplRef: TemplateRef&lt;<span class="hljs-built_in">any</span>&gt;;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> vcRef: ViewContainerRef</span>) {}

  ngAfterViewInit() {
    <span class="hljs-keyword">this</span>.vcRef.createEmbeddedView(<span class="hljs-keyword">this</span>.tplRef);
  }
}</code></pre>
<h2 id="articleHeader22">第六节 - 使用 <code>ngTemplateOutlet</code> 指令</h2>
<h3 id="articleHeader23">ngTemplateOutlet 的作用</h3>
<p>该指令用于基于已有的 <code>TemplateRef</code> 对象，插入对应的内嵌视图。在应用 NgTemplateOutlet 指令时，我们可以通过 <code>[ngTemplateOutletContext]</code> 属性来设置 <code>EmbeddedViewRef</code> 的上下文对象。绑定的上下文应该是一个对象，此外可通过 <code>let</code>语法来声明绑定上下文对象属性名。</p>
<h3 id="articleHeader24">ngTemplateOutlet 的使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-template #stpl>
      Hello, Semlinker!
    </ng-template>
    <ng-template #atpl>
      Hello, Angular!
    </ng-template>
    <div [ngTemplateOutlet]=&quot;atpl&quot;></div>
    <div [ngTemplateOutlet]=&quot;stpl&quot;></div>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;ng-template #stpl&gt;
      Hello, Semlinker!
    &lt;/ng-template&gt;
    &lt;ng-template #atpl&gt;
      Hello, Angular!
    &lt;/ng-template&gt;
    &lt;div [ngTemplateOutlet]="atpl"&gt;&lt;/div&gt;
    &lt;div [ngTemplateOutlet]="stpl"&gt;&lt;/div&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h3 id="articleHeader25">ngOutletContext 的使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-template #stpl let-message=&quot;message&quot;>
      <p>"{{"message"}}"</p>
    </ng-template>
    <ng-template #atpl let-msg=&quot;message&quot;>
      <p>"{{"msg"}}"</p>
    </ng-template>
    <ng-template #otpl let-msg>
      <p>"{{"msg"}}"</p>
    </ng-template>
    <div [ngTemplateOutlet]=&quot;atpl&quot;
      [ngTemplateOutletContext]=&quot;context&quot;>
    </div>
    <div [ngTemplateOutlet]=&quot;stpl&quot;
      [ngTemplateOutletContext]=&quot;context&quot;>
    </div>
    <div [ngTemplateOutlet]=&quot;otpl&quot;
      [ngTemplateOutletContext]=&quot;context&quot;>
    </div>
  `,
})
export class AppComponent {
  context = { message: 'Hello ngOutletContext!', 
    $implicit: 'Hello, Semlinker!' };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;ng-template #stpl let-message="message"&gt;
      &lt;p&gt;"{{"message"}}"&lt;/p&gt;
    &lt;/ng-template&gt;
    &lt;ng-template #atpl let-msg="message"&gt;
      &lt;p&gt;"{{"msg"}}"&lt;/p&gt;
    &lt;/ng-template&gt;
    &lt;ng-template #otpl let-msg&gt;
      &lt;p&gt;"{{"msg"}}"&lt;/p&gt;
    &lt;/ng-template&gt;
    &lt;div [ngTemplateOutlet]="atpl"
      [ngTemplateOutletContext]="context"&gt;
    &lt;/div&gt;
    &lt;div [ngTemplateOutlet]="stpl"
      [ngTemplateOutletContext]="context"&gt;
    &lt;/div&gt;
    &lt;div [ngTemplateOutlet]="otpl"
      [ngTemplateOutletContext]="context"&gt;
    &lt;/div&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  context = { message: <span class="hljs-string">'Hello ngOutletContext!'</span>, 
    $implicit: <span class="hljs-string">'Hello, Semlinker!'</span> };
}</code></pre>
<h2 id="articleHeader26">第七节 - 创建结构指令</h2>
<h3 id="articleHeader27">指令的功能</h3>
<p>该指令实现 <code>ngIf</code> 指令相反的效果，当指令的输入条件为 <code>Falsy</code> 值时，显示DOM元素。</p>
<h3 id="articleHeader28">指令的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[exeUnless]'
})
export class UnlessDirective {

    @Input('exeUnless')
    set condition(newCondition: boolean) {
        if (!newCondition) { 
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, Input, TemplateRef, ViewContainerRef } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[exeUnless]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UnlessDirective {

    <span class="hljs-meta">@Input</span>(<span class="hljs-string">'exeUnless'</span>)
    <span class="hljs-keyword">set</span> condition(newCondition: <span class="hljs-built_in">boolean</span>) {
        <span class="hljs-keyword">if</span> (!newCondition) { 
            <span class="hljs-keyword">this</span>.viewContainer.createEmbeddedView(<span class="hljs-keyword">this</span>.templateRef);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.viewContainer.clear();
        }
    }

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> templateRef: TemplateRef&lt;<span class="hljs-built_in">any</span>&gt;,
        <span class="hljs-keyword">private</span> viewContainer: ViewContainerRef</span>) {
    }
}</code></pre>
<h3 id="articleHeader29">指令的应用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <h2 *exeUnless=&quot;condition&quot;>Hello, Semlinker!</h2> 
  `,
})
export class AppComponent {
  condition: boolean = false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
   &lt;h2 *exeUnless="condition"&gt;Hello, Semlinker!&lt;/h2&gt; 
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  condition: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">false</span>;
}</code></pre>
<h2 id="articleHeader30">我有话说</h2>
<h3 id="articleHeader31">Angular 中指令与组件有什么关系？</h3>
<p>组件继承于指令，并扩展了与 UI 视图相关的属性，如 template、styles、animations、encapsulation 等。</p>
<p>详细内容请参考 - <a href="https://segmentfault.com/a/1190000008716308">Angular 2 Directive Lifecycle</a></p>
<h3 id="articleHeader32">结构指令中的 <code>TemplateRef</code> 与 <code>ViewContainerRef</code> 有什么作用？</h3>
<p>TemplateRef：用于表示内嵌的 template 模板元素，通过 TemplateRef 实例，我们可以方便创建内嵌视图(Embedded Views)，且可以轻松地访问到通过 ElementRef 封装后的 nativeElement。需要注意的是组件视图中的 template 模板元素，经过渲染后会被替换成 comment 元素。</p>
<p>ViewContainerRef：用于表示一个视图容器，可添加一个或多个视图。通ViewContainerRef 实例，我们可以基于 TemplateRef 实例创建内嵌视图，并能指定内嵌视图的插入位置，也可以方便对视图容器中已有的视图进行管理。简而言之，ViewContainerRef 的主要作用是创建和管理内嵌视图或组件视图。</p>
<p>详细内容请参考 - <a href="https://segmentfault.com/a/1190000008672478" target="_blank">Angular 2 TemplateRef &amp; ViewContainerRef</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4 指令快速入门

## 原文链接
[https://segmentfault.com/a/1190000009674089](https://segmentfault.com/a/1190000009674089)

