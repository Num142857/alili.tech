---
title: 'Angular 2 HostListener & HostBinding' 
date: 2019-01-17 2:30:25
hidden: true
slug: h3y040iintq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<h2 id="articleHeader0">Host Element</h2>
<p>在介绍 HostListener 和 HostBinding 属性装饰器之前，我们先来了解一下 host element (宿主元素)。</p>
<p>宿主元素的概念同时适用于指令和组件。对于指令来说，这个概念是相当简单的。应用指令的元素，就是宿主元素。假设我们已声明了一个 HighlightDirective 指令 (selector: '[exeHighlight]')：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p exeHighlight>
   <span>高亮的文本</span>
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">exeHighlight</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>高亮的文本<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>上面 html 代码中，<code>p</code> 元素就是宿主元素。如果该指令应用于自定义组件中如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<exe-counter exeHighlight>
    <span>高亮的文本</span>
</exe-counter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">exe-counter</span> <span class="hljs-attr">exeHighlight</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>高亮的文本<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">exe-counter</span>&gt;</span></code></pre>
<p>此时 <code>exe-counter</code> 自定义元素，就是宿主元素。</p>
<h2 id="articleHeader1">HostListener</h2>
<p>HostListener 是属性装饰器，用来为宿主元素添加事件监听。</p>
<h3 id="articleHeader2">HostListenerDecorator 装饰器定义</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface HostListenerDecorator {
    (eventName: string, args?: string[]): any;
    new (eventName: string, args?: string[]): any;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> HostListenerDecorator {
    (eventName: <span class="hljs-built_in">string</span>, args?: <span class="hljs-built_in">string</span>[]): <span class="hljs-built_in">any</span>;
    <span class="hljs-keyword">new</span> (eventName: <span class="hljs-built_in">string</span>, args?: <span class="hljs-built_in">string</span>[]): <span class="hljs-built_in">any</span>;
}</code></pre>
<h3 id="articleHeader3">HostListenerDecorator 装饰器应用</h3>
<p>counting.directive.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: 'button[counting]'
})
class CountClicks {
    numberOfClicks = 0;

    @HostListener('click', ['$event.target'])
    onClick(btn: HTMLElement) {
        console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostListener } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'button[counting]'</span>
})
<span class="hljs-keyword">class</span> CountClicks {
    numberOfClicks = <span class="hljs-number">0</span>;

    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'click'</span>, [<span class="hljs-string">'$event.target'</span>])
    onClick(btn: HTMLElement) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'button'</span>, btn, <span class="hljs-string">'number of clicks:'</span>, <span class="hljs-keyword">this</span>.numberOfClicks++);
    }
}</code></pre>
<p>app.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component} from '@angular/core';

@Component({
  selector: 'exe-app',
  styles: [`
    button {
      background: blue;
      color: white;
      border: 1px solid #eee;
    }
  `],
  template: `
    <button counting>增加点击次数</button>
  `
})
export class AppComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-app'</span>,
  styles: [<span class="hljs-string">`
    button {
      background: blue;
      color: white;
      border: 1px solid #eee;
    }
  `</span>],
  template: <span class="hljs-string">`
    &lt;button counting&gt;增加点击次数&lt;/button&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {}</code></pre>
<p>以上代码运行后浏览器显示的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVLpXL?w=1598&amp;h=200" src="https://static.alili.tech/img/bVLpXL?w=1598&amp;h=200" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>此外，我们也可以监听宿主元素外，其它对象产生的事件，如  <code>window</code> 或 <code>document</code> 对象。具体示例如下：</p>
<p>highlight.directive.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[exeHighlight]'
})
export class ExeHighlight {
    constructor(private el: ElementRef, private renderer: Renderer) { }

    @HostListener('document:click', ['$event'])
    onClick(btn: Event) {
        if (this.el.nativeElement.contains(event.target)) {
            this.highlight('yellow');
        } else {
            this.highlight(null);
        }
    }

    highlight(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostListener, ElementRef, Renderer } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[exeHighlight]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExeHighlight {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> el: ElementRef, <span class="hljs-keyword">private</span> renderer: Renderer</span>) { }

    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'document:click'</span>, [<span class="hljs-string">'$event'</span>])
    onClick(btn: Event) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.el.nativeElement.contains(event.target)) {
            <span class="hljs-keyword">this</span>.highlight(<span class="hljs-string">'yellow'</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.highlight(<span class="hljs-literal">null</span>);
        }
    }

    highlight(color: <span class="hljs-built_in">string</span>) {
        <span class="hljs-keyword">this</span>.renderer.setElementStyle(<span class="hljs-keyword">this</span>.el.nativeElement, <span class="hljs-string">'backgroundColor'</span>, color);
    }
}</code></pre>
<p>app.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component} from '@angular/core';

@Component({
  selector: 'exe-app',
  template: `
    <h4 exeHighlight>点击该区域，元素会被高亮。点击其它区域，元素会取消高亮</h4>
  `
})
export class AppComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-app'</span>,
  template: <span class="hljs-string">`
    &lt;h4 exeHighlight&gt;点击该区域，元素会被高亮。点击其它区域，元素会取消高亮&lt;/h4&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {}</code></pre>
<p>以上代码运行后浏览器显示的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVLpXS?w=1000&amp;h=114" src="https://static.alili.tech/img/bVLpXS?w=1000&amp;h=114" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">Host Event Listener</h2>
<p>我们也可以在指令的 metadata 信息中，设定宿主元素的事件监听信息，具体示例如下：</p>
<p>counting.directive.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive } from '@angular/core';

@Directive({
    selector: 'button[counting]',
    host: {
      '(click)': 'onClick($event.target)'
    }
})
export class CountClicks {
    numberOfClicks = 0;

    onClick(btn: HTMLElement) {
        console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'button[counting]'</span>,
    host: {
      <span class="hljs-string">'(click)'</span>: <span class="hljs-string">'onClick($event.target)'</span>
    }
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> CountClicks {
    numberOfClicks = <span class="hljs-number">0</span>;

    onClick(btn: HTMLElement) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'button'</span>, btn, <span class="hljs-string">'number of clicks:'</span>, <span class="hljs-keyword">this</span>.numberOfClicks++);
    }
}</code></pre>
<h2 id="articleHeader5">HostBinding</h2>
<p>HostBinding 是属性装饰器，用来动态设置宿主元素的属性值。</p>
<h3 id="articleHeader6">HostBinding 装饰器定义</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface HostBindingDecorator {
    (hostPropertyName?: string): any;
    new (hostPropertyName?: string): any;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> HostBindingDecorator {
    (hostPropertyName?: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span>;
    <span class="hljs-keyword">new</span> (hostPropertyName?: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span>;
}</code></pre>
<h3 id="articleHeader7">HostBinding 装饰器应用</h3>
<p>button-press.directive.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[exeButtonPress]'
})
export class ExeButtonPress {
    @HostBinding('attr.role') role = 'button';
    @HostBinding('class.pressed') isPressed: boolean;

    @HostListener('mousedown') hasPressed() {
        this.isPressed = true;
    }
    @HostListener('mouseup') hasReleased() {
        this.isPressed = false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostBinding, HostListener } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[exeButtonPress]'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExeButtonPress {
    <span class="hljs-meta">@HostBinding</span>(<span class="hljs-string">'attr.role'</span>) role = <span class="hljs-string">'button'</span>;
    <span class="hljs-meta">@HostBinding</span>(<span class="hljs-string">'class.pressed'</span>) isPressed: <span class="hljs-built_in">boolean</span>;

    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'mousedown'</span>) hasPressed() {
        <span class="hljs-keyword">this</span>.isPressed = <span class="hljs-literal">true</span>;
    }
    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'mouseup'</span>) hasReleased() {
        <span class="hljs-keyword">this</span>.isPressed = <span class="hljs-literal">false</span>;
    }
}</code></pre>
<p>app.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'exe-app',
  styles: [`
    button {
      background: blue;
      color: white;
      border: 1px solid #eee;
    }
    button.pressed {
      background: red;
    }
  `],
  template: `
    <button exeButtonPress>按下按钮</button>
  `
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-app'</span>,
  styles: [<span class="hljs-string">`
    button {
      background: blue;
      color: white;
      border: 1px solid #eee;
    }
    button.pressed {
      background: red;
    }
  `</span>],
  template: <span class="hljs-string">`
    &lt;button exeButtonPress&gt;按下按钮&lt;/button&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<p>以上代码运行后浏览器显示的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVLpX0?w=1310&amp;h=550" src="https://static.alili.tech/img/bVLpX0?w=1310&amp;h=550" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">Host Property Bindings</h2>
<p>我们也可以在指令的 metadata 信息中，设定宿主元素的属性绑定信息，具体示例如下：</p>
<p>button-press.directive.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[exeButtonPress]',
    host: {
      'role': 'button',
      '[class.pressed]': 'isPressed'
    }
})
export class ExeButtonPress {
    isPressed: boolean;

    @HostListener('mousedown') hasPressed() {
        this.isPressed = true;
    }
    @HostListener('mouseup') hasReleased() {
        this.isPressed = false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Directive, HostListener } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Directive</span>({
    selector: <span class="hljs-string">'[exeButtonPress]'</span>,
    host: {
      <span class="hljs-string">'role'</span>: <span class="hljs-string">'button'</span>,
      <span class="hljs-string">'[class.pressed]'</span>: <span class="hljs-string">'isPressed'</span>
    }
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExeButtonPress {
    isPressed: <span class="hljs-built_in">boolean</span>;

    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'mousedown'</span>) hasPressed() {
        <span class="hljs-keyword">this</span>.isPressed = <span class="hljs-literal">true</span>;
    }
    <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'mouseup'</span>) hasReleased() {
        <span class="hljs-keyword">this</span>.isPressed = <span class="hljs-literal">false</span>;
    }
}</code></pre>
<h2 id="articleHeader9">我有话说</h2>
<p>1.宿主元素属性和事件绑定风格指南</p>
<p>优先使用 @HostListener 和 @HostBinding ，而不是 @Directive 和 @Component 装饰器的 host 属性：</p>
<p>对于关联到 <code>@HostBinding</code> 的属性或关联到 <code>@HostListener</code> 的方法，要修改时，只需在指令类中的一个地方修改。 如果使用元数据属性 <code>host</code>，你就得在组件类中修改属性声明的同时修改相关的元数据。</p>
<p>详细信息请参考 - <a href="https://angular.cn/docs/ts/latest/guide/style-guide.html#!#06-03" rel="nofollow noreferrer" target="_blank">Angular 2 风格指南 - STYLE 06-03</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2 HostListener & HostBinding

## 原文链接
[https://segmentfault.com/a/1190000008878888](https://segmentfault.com/a/1190000008878888)

