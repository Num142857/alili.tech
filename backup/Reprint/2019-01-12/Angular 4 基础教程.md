---
title: 'Angular 4 基础教程' 
date: 2019-01-12 2:30:24
hidden: true
slug: ssznrn5dc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本系列教程的主要内容来源于 <a href="https://egghead.io/courses/get-started-with-angular" rel="nofollow noreferrer" target="_blank">egghead.io get-started-with-angular</a> 视频教程，但针对视频中的介绍的知识点做了适当地补充，建议有兴趣的同学直接查看该视频教程。<br>另外建了个群有兴趣的朋友可以加一下 QQ 群：Angular 修仙之路 - 153742079 (群名称规则：城市 + 昵称)</blockquote>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>第一节 - 基于 Angular CLI 新建项目</li>
<li>第二节 - 创建简单的组件</li>
<li>​第三节 - 事件和模板引用</li>
<li>第四节 - 事件进阶</li>
<li>第五节 - 注入服务</li>
<li>第六节 - 使用 ngFor 指令</li>
<li>第七节 - 使用 Input 装饰器</li>
<li>第八节 - 使用双向绑定</li>
<li>第九节 - 使用 Output 装饰器</li>
<li>第十节 - 组件样式</li>
</ul>
<blockquote>查看新版教程，请访问 <a href="http://www.semlinker.com/ng-base-tutorial/" rel="nofollow noreferrer" target="_blank">Angular 6.x 基础教程</a>
</blockquote>
<h2 id="articleHeader1">第一节 - 基于 Angular CLI 新建项目</h2>
<h3 id="articleHeader2">安装 Angular CLI (可选)</h3>
<ul><li>安装 <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a> (可选)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g @angular/cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> install -g @angular/cli</code></pre>
<ul><li>检测 Angular CLI 是否安装成功</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng --version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng <span class="hljs-comment">--version</span></code></pre>
<h3 id="articleHeader3">使用 Angular CLI</h3>
<ul><li>新建项目</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng new angular4-fundamentals" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng <span class="hljs-keyword">new</span> <span class="hljs-type">angular4</span>-fundamentals</code></pre>
<ul><li>启动本地服务器</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>ng serve</code></pre>
<p>若想进一步了解 Angular CLI 的详细信息，请参考 <a href="https://segmentfault.com/a/1190000009771946">Angular CLI 终极指南</a>。</p>
<h2 id="articleHeader4">第二节 - 创建简单的组件</h2>
<h3 id="articleHeader5">新建组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate component simple-form --inline-template --inline-style
# Or
$ ng g c simple-form -it -is # 表示新建组件，该组件使用内联模板和内联样式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell">$ ng generate component simple-form <span class="hljs-comment">--inline-template --inline-style</span>
<span class="hljs-comment"># Or</span>
$ ng g c simple-form -<span class="hljs-keyword">it</span> -<span class="hljs-keyword">is</span> <span class="hljs-comment"># 表示新建组件，该组件使用内联模板和内联样式</span></code></pre>
<p>在命令行窗口运行以上命令后，将输出以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="installing component
  create src/app/simple-form/simple-form.component.spec.ts
  create src/app/simple-form/simple-form.component.ts
  update src/app/app.module.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">installing component
  create src/app/simple-form/simple-<span class="hljs-selector-tag">form</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
  create src/app/simple-form/simple-<span class="hljs-selector-tag">form</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
  update src/app/app<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span></code></pre>
<p>即执行上述操作后，创建了两个文件：</p>
<ul>
<li>simple-form.component.spec.ts - 用于单元测试</li>
<li>simple-form.component.ts - 新建的组件</li>
</ul>
<p>除此之外，<code>update src/app/app.module.ts</code> 表示执行上述操作后，Angular CLI 会自动帮我们更新 <code>app.module.ts</code> 文件。所更新的内容是把我们新建的组件添加到 <code>NgModule</code> 的 <code>declarations</code> 数组中，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent
  ],
  ...
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@NgModule</span>({
  declarations: [
    AppComponent,
    SimpleFormComponent
  ],
  ...
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h3 id="articleHeader6">使用组件</h3>
<h4>AppComponent</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>"{{"title"}}"</h3>
    <div>
      <app-simple-form></app-simple-form>
    </div>
  `
})
export class AppComponent {
  title = 'Hello, Angular';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;"{{"title"}}"&lt;/h3&gt;
    &lt;div&gt;
      &lt;app-simple-form&gt;&lt;/app-simple-form&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;
}</code></pre>
<h4>SimpleFormComponent</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <p>
      simple-form Works!
    </p>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;
      simple-form Works!
    &lt;/p&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
  ngOnInit() {
  }
}</code></pre>
<p>从生成的 <code>SimpleFormComponent</code> 组件中，我们发现组件的 <code>selector</code> 是 <code>app-simple-form</code>，而我们是使用以下命令创建该组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng g c simple-form -it -is" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng g c simple-form -<span class="hljs-keyword">it</span> -<span class="hljs-keyword">is</span></code></pre>
<p>即 Angular CLI 在创建组件时，自动帮我们添加了前缀。那为什么前缀是 <code>app</code> 呢？答案是在项目根目录下的 <code>.angular-cli.json</code> 文件中，已经默认帮我们配置了默认的前缀，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  ...
  &quot;apps&quot;: [
    {
      &quot;root&quot;: &quot;src&quot;,
      &quot;outDir&quot;: &quot;dist&quot;,
      ...
      &quot;prefix&quot;: &quot;app&quot;,
       ...
    }
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  ...
  <span class="hljs-attr">"apps"</span>: [
    {
      <span class="hljs-attr">"root"</span>: <span class="hljs-string">"src"</span>,
      <span class="hljs-attr">"outDir"</span>: <span class="hljs-string">"dist"</span>,
      ...
      <span class="hljs-attr">"prefix"</span>: <span class="hljs-string">"app"</span>,
       ...
    }
  ],
}</code></pre>
<p>当然你可以根据实际需求，自行更改默认的前缀配置。</p>
<h2 id="articleHeader7">第三节 - 事件和模板引用</h2>
<p>在 Angular 中，我们可以使用 <code>(eventName)</code> 语法，进行事件绑定。此外，可以使用 <code>#variableName</code> 的语法，定义模板引用。具体示例如下：</p>
<h3 id="articleHeader8">SimpleFormComponent</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     <input #myInput type=&quot;text&quot;>
     <button (click)=&quot;onClick(myInput.value)&quot;>点击</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {
  onClick(value) {
    console.log(value);
  }

  ngOnInit() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     &lt;input #myInput type="text"&gt;
     &lt;button (click)="onClick(myInput.value)"&gt;点击&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  onClick(value) {
    <span class="hljs-built_in">console</span>.log(value);
  }

  ngOnInit() {}
}</code></pre>
<p>需要注意的是，若我们改变绑定的表达式为 <code>(click)="onClick(myInput)"</code> ，当我们点击按钮时，控制台输出的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code class="shell" style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>&gt;</code></pre>
<p>通过该输出结果，我们可以知道 <code>#variableName</code> 语法，我们获取的对象是对应 DOM 元素的引用。</p>
<h2 id="articleHeader9">第四节 - 事件进阶</h2>
<h3 id="articleHeader10">获取鼠标事件</h3>
<p>在第三节的示例中，假如我们需要获取鼠标事件，那应该怎么办呢？这时，我们可以引入 <code>$event</code> 变量，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     <input #myInput type=&quot;text&quot;>
     <button (click)=&quot;onClick($event, myInput.value)&quot;>点击</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {
  onClick(event, value) {
    console.log(event);
    console.log(value);
  }
  ngOnInit() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     &lt;input #myInput type="text"&gt;
     &lt;button (click)="onClick($event, myInput.value)"&gt;点击&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  onClick(event, value) {
    <span class="hljs-built_in">console</span>.log(event);
    <span class="hljs-built_in">console</span>.log(value);
  }
  ngOnInit() {}
}</code></pre>
<p>成功运行以上代码，当我们点击按钮时，控制台将输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MouseEvent {isTrusted: true, screenX: 180, screenY: 207, clientX: 165,
  clientY: 75…}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="shell"><span class="hljs-string">MouseEvent</span> <span class="hljs-string">{isTrusted:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">screenX:</span> <span class="hljs-number">180</span><span class="hljs-string">,</span> <span class="hljs-attr">screenY:</span> <span class="hljs-number">207</span><span class="hljs-string">,</span> <span class="hljs-attr">clientX:</span> <span class="hljs-number">165</span><span class="hljs-string">,</span>
<span class="hljs-attr">  clientY:</span> <span class="hljs-number">75</span><span class="hljs-string">…}</span></code></pre>
<p>需要注意的是，参数名一定要使用 <code>$event</code> ，否则无法获取正确的鼠标事件。此外，<code>onClick($event, myInput.value)</code> 表达式中，<code>$event</code> 的顺序是任意的，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button (click)=&quot;onClick(myInput.value, $event)&quot;>点击</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick(myInput.value, $event)"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>当 Angular 在调用我们的事件处理函数时，会自动帮我们处理调用的参数。<code>$event</code> 自动映射为触发的事件，与我们 <code>Provider</code> 中 <code>Token</code> 的作用类似。除了监听鼠标事件外，我们还可以监听键盘事件。</p>
<h3 id="articleHeader11">获取键盘事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     <input #myInput type=&quot;text&quot; (keydown.enter)=&quot;onEnter($event, myInput.value)&quot;>
     <button (click)=&quot;onClick($event, myInput.value)&quot;>点击</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {
  // ...
  onEnter(event, value) {
    console.log(event);
    console.log(value);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     &lt;input #myInput type="text" (keydown.enter)="onEnter($event, myInput.value)"&gt;
     &lt;button (click)="onClick($event, myInput.value)"&gt;点击&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-comment">// ...</span>
  onEnter(event, value) {
    <span class="hljs-built_in">console</span>.log(event);
    <span class="hljs-built_in">console</span>.log(value);
  }
}</code></pre>
<p>以上代码中， <code>(keydown.enter)="onEnter($event, myInput.value)"</code> 表达式表示我们监听键盘 <code>enter</code> 键的按下事件，当我们按下键盘的 <code>enter</code> 键时，将会调用组件类中定义的 <code>onEnter()</code> 方法。我们同样也可以通过 <code>$event</code> 来获取 <code>KeyboardEvent</code> 对象。</p>
<h2 id="articleHeader12">第五节 - 注入服务</h2>
<h3 id="articleHeader13">新建服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng g s mail" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>ng g s mail</code></pre>
<p>在命令行窗口运行以上命令后，将输出以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="installing service
  create src/app/mail.service.spec.ts
  create src/app/mail.service.ts
  WARNING Service is generated but not provided, it must be provided to be used" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell">installing service
  <span class="hljs-keyword">create</span> src/app/mail.service.spec.ts
  <span class="hljs-keyword">create</span> src/app/mail.service.ts
  <span class="hljs-keyword">WARNING</span> Service <span class="hljs-keyword">is</span> <span class="hljs-keyword">generated</span> but <span class="hljs-keyword">not</span> provided, it must be provided <span class="hljs-keyword">to</span> be used</code></pre>
<p>即执行上述操作后，创建了两个文件：</p>
<ul>
<li>mail.service.spec.ts - 用于单元测试</li>
<li>mail.service.ts - 新建的服务</li>
</ul>
<p>除此之外，<code>WARNING Service is generated but not provided,...</code> 表示执行上述操作后，Angular CLI 只会帮我们创建 <code>MailService</code> 服务，不会自动帮我们配置该服务。</p>
<h3 id="articleHeader14">配置服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {MailService} from &quot;./mail.service&quot;;

@NgModule({
  ...
  providers: [MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {MailService} <span class="hljs-keyword">from</span> <span class="hljs-string">"./mail.service"</span>;

<span class="hljs-meta">@NgModule</span>({
  ...
  providers: [MailService],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h3 id="articleHeader15">更新服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
  message: string  ='该消息来自MailService';
  constructor() { }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MailService {
  message: <span class="hljs-built_in">string</span>  =<span class="hljs-string">'该消息来自MailService'</span>;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
}</code></pre>
<h3 id="articleHeader16">使用服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';
import {MailService} from &quot;./mail.service&quot;;

@Component({
  selector: 'app-root',
  template: `
    <h3>"{{"title"}}"</h3>
    <div>
      <app-simple-form></app-simple-form>
      "{{"mailService.message"}}"
    </div>
  `
})
export class AppComponent {
  title = 'Hello, Angular';
  constructor(private mailService: MailService) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> {MailService} <span class="hljs-keyword">from</span> <span class="hljs-string">"./mail.service"</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;"{{"title"}}"&lt;/h3&gt;
    &lt;div&gt;
      &lt;app-simple-form&gt;&lt;/app-simple-form&gt;
      "{{"mailService.message"}}"
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> mailService: MailService</span>) {}
}</code></pre>
<p>除了使用 <code>constructor(private mailService: MailService)</code> 方式注入服务外，我们也可以使用 <code>Inject</code> 装饰器来注入 <code>MailService</code> 服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, Inject} from '@angular/core';

@Component({...})
export class AppComponent {
  title = 'Hello, Angular';
  
  constructor(@Inject(MailService) private mailService) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, Inject} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({...})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;
  
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">@Inject(MailService</span>) private mailService) {}
}</code></pre>
<p>不过对于 <code>Type</code> 类型(函数类型) 的对象，我们一般使用 <code>constructor(private mailService: MailService)</code> 方式进行注入。而 <code>Inject </code> 装饰器一般用来注入非 <code>Type</code> 类型的对象。</p>
<h3 id="articleHeader17">使用Inject装饰器</h3>
<h4>AppModule</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  ...
  providers: [
    MailService,
    {provide: 'apiUrl', useValue: 'https://jsonplaceholder.typicode.com/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@NgModule</span>({
  ...
  providers: [
    MailService,
    {provide: <span class="hljs-string">'apiUrl'</span>, useValue: <span class="hljs-string">'https://jsonplaceholder.typicode.com/'</span>}
  ],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>AppComponent</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-root',
  template: `
    <h3>"{{"title"}}"</h3>
    <div>
      <app-simple-form></app-simple-form>
      "{{"mailService.message"}}"
      <p>API_URL: "{{"apiUrl"}}"</p>
    </div>
  `
})
export class AppComponent {
  title = 'Hello, Angular';

  constructor(
    @Inject(MailService) private mailService,
    @Inject('apiUrl') private apiUrl
  ) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;"{{"title"}}"&lt;/h3&gt;
    &lt;div&gt;
      &lt;app-simple-form&gt;&lt;/app-simple-form&gt;
      "{{"mailService.message"}}"
      &lt;p&gt;API_URL: "{{"apiUrl"}}"&lt;/p&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
    @Inject(MailService</span>) private mailService,
    @Inject(<span class="hljs-params">'apiUrl'</span>) private apiUrl
  ) {}
}</code></pre>
<h2 id="articleHeader18">第六节 - 使用 ngFor 指令</h2>
<p>在 Angular 中我们可以使用 <code>ngFor</code> 指令来显示数组中每一项的信息。</p>
<h3 id="articleHeader19">使用 ngFor 指令</h3>
<h4>更新 MailService 服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
  messages: string[] = [
    '天之骄子，加入修仙之路群',
    'Shadows，加入修仙之路群',
    'Keriy，加入修仙之路群'
  ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MailService {
  messages: <span class="hljs-built_in">string</span>[] = [
    <span class="hljs-string">'天之骄子，加入修仙之路群'</span>,
    <span class="hljs-string">'Shadows，加入修仙之路群'</span>,
    <span class="hljs-string">'Keriy，加入修仙之路群'</span>
  ];
}</code></pre>
<h4>更新 AppComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component} from '@angular/core';
import {MailService} from &quot;./mail.service&quot;;

@Component({
  selector: 'app-root',
  template: `
    <h3>"{{"title"}}"</h3>
    <ul>
      <li *ngFor=&quot;let message of mailService.messages; index as i;&quot;>
        "{{"i"}}" - "{{"message"}}"
      </li>
    </ul>
  `
})
export class AppComponent {
  title = 'Hello, Angular';

  constructor(private mailService: MailService) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> {MailService} <span class="hljs-keyword">from</span> <span class="hljs-string">"./mail.service"</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;"{{"title"}}"&lt;/h3&gt;
    &lt;ul&gt;
      &lt;li *ngFor="let message of mailService.messages; index as i;"&gt;
        "{{"i"}}" - "{{"message"}}"
      &lt;/li&gt;
    &lt;/ul&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> mailService: MailService</span>) {}
}</code></pre>
<p>在 AppComponent 组件的模板中，我们使用 <code>let item of items; </code> 语法迭代数组中的每一项，另外我们使用 <code>index as i</code> 用来访问数组中每一项的索引值。除了 <code>index</code> 外，我们还可以获取以下的值：</p>
<ul>
<li>first: boolean - 若当前项是可迭代对象的第一项，则返回 true</li>
<li>last: boolean - 若当前项是可迭代对象的最后一项，则返回 true</li>
<li>even: boolean - 若当前项的索引值是偶数，则返回 true</li>
<li>odd: boolean - 若当前项的索引值是奇数，则返回 true</li>
</ul>
<p>需要注意的是，<code>*ngFor</code> 中的 <code>*</code> 号是语法糖，表示结构指令。因为该语法最终会转换成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ng-template ngFor let-item [ngForOf]=&quot;items&quot; let-i=&quot;index&quot;>
  <li>...</li>
</ng-template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span> <span class="hljs-attr">ngFor</span> <span class="hljs-attr">let-item</span> [<span class="hljs-attr">ngForOf</span>]=<span class="hljs-string">"items"</span> <span class="hljs-attr">let-i</span>=<span class="hljs-string">"index"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span></code></pre>
<p>除了 <code>*ngFor</code> 外，常用的结构指令还有 <code>*ngIf</code>、<code>*ngSwitchCase</code> 指令。</p>
<h2 id="articleHeader20">第七节 - 使用 Input 装饰器</h2>
<p>为了让我们能够开发更灵活的组件，Angular 为我们提供了 <code>Input</code> 装饰器，用于定义组件的输入属性。</p>
<h3 id="articleHeader21">使用 Input 装饰器</h3>
<h4>更新 SimpleFormComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     "{{"message"}}"
     <input #myInput type=&quot;text&quot; (keydown.enter)=&quot;onEnter($event, myInput.value)&quot;>
     <button (click)=&quot;onClick($event, myInput.value)&quot;>点击</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {
  @Input() message: string;
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit,Input} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     "{{"message"}}"
     &lt;input #myInput type="text" (keydown.enter)="onEnter($event, myInput.value)"&gt;
     &lt;button (click)="onClick($event, myInput.value)"&gt;点击&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-meta">@Input</span>() message: <span class="hljs-built_in">string</span>;
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h4>更新 AppComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component} from '@angular/core';
import {MailService} from &quot;./mail.service&quot;;

@Component({
  selector: 'app-root',
  template: `
    <h3>"{{"title"}}"</h3>
    <app-simple-form *ngFor=&quot;let message of mailService.messages;&quot;
      [message]=&quot;message&quot;>
    </app-simple-form>
  `
})
export class AppComponent {
  title = 'Hello, Angular';

  constructor(private mailService: MailService) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> {MailService} <span class="hljs-keyword">from</span> <span class="hljs-string">"./mail.service"</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;"{{"title"}}"&lt;/h3&gt;
    &lt;app-simple-form *ngFor="let message of mailService.messages;"
      [message]="message"&gt;
    &lt;/app-simple-form&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> mailService: MailService</span>) {}
}</code></pre>
<p>在 AppComponent 组件模板中，我们使用 <code>[message]="message"</code> 属性绑定的语法，实现数据传递。即把数据从 <code>AppComponent</code> 组件，传递到 <code>SimpleFormComponent</code> 组件中。</p>
<p>需要注意的是，当 <code>SimpleFormComponent</code> 组件类的属性名称不是 <code>message</code> 时，我们需要告诉 Angular 如何进行属性值绑定，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class SimpleFormComponent implements OnInit {
  @Input('message') msg: string;
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-meta">@Input</span>(<span class="hljs-string">'message'</span>) msg: <span class="hljs-built_in">string</span>;
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>不过一般不推荐这样做，尽量保持名称一致。</p>
<h2 id="articleHeader22">第八节 - 使用双向绑定</h2>
<p>使用过 AngularJS 1.x 的同学，应该很熟悉 <code>ng-model</code> 指令，通过该指令我们可能方便地实现数据的双向绑定。而在 Angular 中，我们是通过 <code>ngModel</code> 指令，来实现双向绑定。</p>
<h3 id="articleHeader23">使用双向绑定</h3>
<h4>引入 FormsModule</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {FormsModule} from &quot;@angular/forms&quot;;

@NgModule({
  // ...
  imports: [
    BrowserModule,
    FormsModule
  ],
  // ...
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {FormsModule} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/forms"</span>;

<span class="hljs-meta">@NgModule</span>({
  <span class="hljs-comment">// ...</span>
  imports: [
    BrowserModule,
    FormsModule
  ],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>使用 ngModel 指令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     "{{"message"}}"
     <input #myInput type=&quot;text&quot; [(ngModel)]=&quot;message&quot;>
     <button (click)=&quot;onClick($event, myInput.value)&quot;>点击</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit { // ...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     "{{"message"}}"
     &lt;input #myInput type="text" [(ngModel)]="message"&gt;
     &lt;button (click)="onClick($event, myInput.value)"&gt;点击&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit { <span class="hljs-comment">// ...}</span></code></pre>
<p>上面示例中，我们使用 <code>[(ngModel)]="message"</code> 语法实现数据的双向绑定。该语法也称作 <code>Banana in  the Box</code> 语法，即香蕉在盒子里 (比较形象生动，记忆该语法)。</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVK3Xs?w=300&amp;h=211" src="https://static.alili.techhttps://segmentfault.com/img/bVK3Xs?w=300&amp;h=211" alt="banana-in-box" title="banana-in-box" style="cursor: pointer;"></span></p>
<p>除了使用双向绑定，我们也可以通过 <code>ngModel</code> 指令，实现单向数据绑定，如 <code>[ngModel]="message"</code>。</p>
<h2 id="articleHeader24">第九节 - 使用 Output 装饰器</h2>
<p><code>Output</code> 装饰器的作用是用来实现子组件将信息，通过事件的形式通知到父级组件。</p>
<p>在介绍 Output 属性装饰器前，我们先来介绍一下 <code>EventEmitter</code> 这个幕后英雄：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numberEmitter: EventEmitter<number> = new EventEmitter<number>(); 
numberEmitter.subscribe((value: number) => console.log(value));
numberEmitter.emit(10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> numberEmitter: EventEmitter&lt;<span class="hljs-built_in">number</span>&gt; = <span class="hljs-keyword">new</span> EventEmitter&lt;<span class="hljs-built_in">number</span>&gt;(); 
numberEmitter.subscribe(<span class="hljs-function">(<span class="hljs-params">value: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value));
numberEmitter.emit(<span class="hljs-number">10</span>);</code></pre>
<p>接下来我们来介绍如何使用 <code>Output</code> 装饰器。</p>
<h3 id="articleHeader25">使用 Output 装饰器</h3>
<h4>更新 SimpleFormComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     "{{"message"}}"
     <input #myInput type=&quot;text&quot; [(ngModel)]=&quot;message&quot;>
     <button (click)=&quot;update.emit({text: message})&quot;>更新</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {
  @Input() message: string;
  @Output() update = new EventEmitter<{text: string}>();

  ngOnInit() { }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit, Input, Output, EventEmitter} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     "{{"message"}}"
     &lt;input #myInput type="text" [(ngModel)]="message"&gt;
     &lt;button (click)="update.emit({text: message})"&gt;更新&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: []
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-meta">@Input</span>() message: <span class="hljs-built_in">string</span>;
  <span class="hljs-meta">@Output</span>() update = <span class="hljs-keyword">new</span> EventEmitter&lt;{text: <span class="hljs-built_in">string</span>}&gt;();

  ngOnInit() { }
}</code></pre>
<h4>更新 MailService 服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Injectable} from '@angular/core';

@Injectable()
export class MailService {

  messages: Array<{id: number, text: string}> = [
    {id: 0, text: '天之骄子，加入修仙之路群'},
    {id: 1, text: 'Shadows，加入修仙之路群'},
    {id: 2, text: 'Keriy，加入修仙之路群'}
  ];

  update(id, text) {
    this.messages = this.messages.map(msg => {
      return msg.id === id ? {id, text} : msg;
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Injectable} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MailService {

  messages: <span class="hljs-built_in">Array</span>&lt;{id: <span class="hljs-built_in">number</span>, text: <span class="hljs-built_in">string</span>}&gt; = [
    {id: <span class="hljs-number">0</span>, text: <span class="hljs-string">'天之骄子，加入修仙之路群'</span>},
    {id: <span class="hljs-number">1</span>, text: <span class="hljs-string">'Shadows，加入修仙之路群'</span>},
    {id: <span class="hljs-number">2</span>, text: <span class="hljs-string">'Keriy，加入修仙之路群'</span>}
  ];

  update(id, text) {
    <span class="hljs-keyword">this</span>.messages = <span class="hljs-keyword">this</span>.messages.map(<span class="hljs-function"><span class="hljs-params">msg</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> msg.id === id ? {id, text} : msg;
    });
  }
}</code></pre>
<h4>更新 AppComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component} from '@angular/core';
import {MailService} from &quot;./mail.service&quot;;

@Component({
  selector: 'app-root',
  template: `
    <h3>"{{"title"}}"</h3>
    <ul>
      <li *ngFor=&quot;let message of mailService.messages;&quot;>
        "{{"message.text"}}"
      </li>
    </ul>
    <app-simple-form *ngFor=&quot;let message of mailService.messages;&quot;
      [message]=&quot;message.text&quot;
      (update)=&quot;onUpdate(message.id, $event.text)&quot;>
    </app-simple-form>
  `
})
export class AppComponent {
  title = 'Hello, Angular';

  onUpdate(id, text) {
    this.mailService.update(id, text);
  }

  constructor(private mailService: MailService) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> {MailService} <span class="hljs-keyword">from</span> <span class="hljs-string">"./mail.service"</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;h3&gt;"{{"title"}}"&lt;/h3&gt;
    &lt;ul&gt;
      &lt;li *ngFor="let message of mailService.messages;"&gt;
        "{{"message.text"}}"
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;app-simple-form *ngFor="let message of mailService.messages;"
      [message]="message.text"
      (update)="onUpdate(message.id, $event.text)"&gt;
    &lt;/app-simple-form&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  title = <span class="hljs-string">'Hello, Angular'</span>;

  onUpdate(id, text) {
    <span class="hljs-keyword">this</span>.mailService.update(id, text);
  }

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> mailService: MailService</span>) {}
}</code></pre>
<p>上面示例中，我们仍然使用 <code>(eventName)</code> 事件绑定的语法，监听我们自定义的 <code>update</code> 事件。当在 <code>SimpleFormComponent</code> 组件中修改 <code>input</code> 输入框的文本消息后，点击更新按钮，将会调用 <code>AppComponent</code> 组件类中的 <code>onUpdate()</code>  方法，更新对应的信息。</p>
<h2 id="articleHeader26">第十节 - 组件样式</h2>
<p>在 Angular 中，我们可以在设置组件元数据时通过 <code>styles</code> 或 <code>styleUrls </code> 属性，来设置组件的内联样式和外联样式。</p>
<h3 id="articleHeader27">使用 styles 属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    ...
  `,
  styles: [`
   :host { margin: 10px; }
   
   input:focus { font-weight: bold;}
  `
  ]
})
export class SimpleFormComponent implements OnInit {
  @Input() message: string;
  @Output() update = new EventEmitter<{text: string}>();

  ngOnInit() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit, Input, Output, EventEmitter} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    ...
  `</span>,
  styles: [<span class="hljs-string">`
   :host { margin: 10px; }
   
   input:focus { font-weight: bold;}
  `</span>
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-meta">@Input</span>() message: <span class="hljs-built_in">string</span>;
  <span class="hljs-meta">@Output</span>() update = <span class="hljs-keyword">new</span> EventEmitter&lt;{text: <span class="hljs-built_in">string</span>}&gt;();

  ngOnInit() {}
}</code></pre>
<p>上面示例中 <code>:host</code> 表示选择宿主元素，即 <code>AppComponent</code> 组件模板中的 <code>app-simple-form</code> 元素。</p>
<p>用过 AngularJS 1.x 的同学，对 <code>ng-class</code> 应该很熟悉，通过它我们能够根据条件，为元素动态的添加或移除对应的样式。在 Angular 中，对应的指令是 <code>ngClass</code> 。接下来我们来看一下，<code>ngClass</code> 指令的具体应用。</p>
<h3 id="articleHeader28">使用 ngClass 指令</h3>
<p><code>ngClass</code> 指令接收一个对象字面量，对象的 <code>key</code> 是 CSS class 的名称，<code>value</code> 的值是 <code>truthy/falsy</code> 的值，表示是否应用该样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-simple-form',
  template: `
    <div>
     "{{"message"}}"
     <input #myInput 
      type=&quot;text&quot; 
      [(ngModel)]=&quot;message&quot;
      [ngClass]=&quot;{mousedown: isMousedown}&quot;
      (mousedown)=&quot;isMousedown = true&quot;
      (mouseup)=&quot;isMousedown = false&quot;
      (mouseleave)=&quot;isMousedown = false&quot;
      >
     <button (click)=&quot;update.emit({text: message})&quot;>更新</button>
    </div>
  `,
  styles: [`
   :host { margin: 10px; }
   
   .mousedown { border: 2px solid green; }
   
   input:focus { font-weight: bold; outline: none;}
  `
  ]
})
export class SimpleFormComponent implements OnInit {
  isMousedown: boolean;
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-simple-form'</span>,
  template: <span class="hljs-string">`
    &lt;div&gt;
     "{{"message"}}"
     &lt;input #myInput 
      type="text" 
      [(ngModel)]="message"
      [ngClass]="{mousedown: isMousedown}"
      (mousedown)="isMousedown = true"
      (mouseup)="isMousedown = false"
      (mouseleave)="isMousedown = false"
      &gt;
     &lt;button (click)="update.emit({text: message})"&gt;更新&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  styles: [<span class="hljs-string">`
   :host { margin: 10px; }
   
   .mousedown { border: 2px solid green; }
   
   input:focus { font-weight: bold; outline: none;}
  `</span>
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleFormComponent <span class="hljs-keyword">implements</span> OnInit {
  isMousedown: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h4>ngClass 指令用法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 使用布尔值 -->
<div [ngClass]=&quot;{bordered: false}&quot;>This is never bordered</div>
<div [ngClass]=&quot;{bordered: true}&quot;>This is always bordered</div>

<!-- 使用组件实例的属性 -->
<div [ngClass]=&quot;{bordered: isBordered}&quot;>
   Using object literal. Border "{{" isBordered ? &quot;ON&quot; : &quot;OFF&quot; "}}"
</div>

<!-- 样式名包含'-' -->
<div[ngClass]=&quot;{'bordered-box': false}&quot;>
   Class names contains dashes must use single quote
</div>

<!-- 使用样式列表 -->
<div class=&quot;base&quot; [ngClass]=&quot;['blue', 'round']&quot;> 
  This will always have a blue background and round corners
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 使用布尔值 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"{bordered: false}"</span>&gt;</span>This is never bordered<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"{bordered: true}"</span>&gt;</span>This is always bordered<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 使用组件实例的属性 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"{bordered: isBordered}"</span>&gt;</span>
   Using object literal. Border "{{" isBordered ? "ON" : "OFF" "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 样式名包含'-' --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div[ngClass]="{'bordered-box':</span> <span class="hljs-attr">false</span>}"&gt;</span>
   Class names contains dashes must use single quote
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 使用样式列表 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"base"</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"['blue', 'round']"</span>&gt;</span> 
  This will always have a blue background and round corners
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>除了 <code>ngClass</code> 指令外，Angular 还为我们提供了 <code>ngStyle</code> 指令。</p>
<h3 id="articleHeader29">使用 ngStyle 指令</h3>
<p><code>ngStyle</code> 指令让我们可以方便得通过 Angular 表达式，设置 DOM 元素的 CSS 属性。</p>
<h4>ngStyle 指令用法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [ngStyle]=&quot;{color: 'white', 'background-color': 'blue'}&quot;>
   Uses fixed white text on blue background
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngStyle</span>]=<span class="hljs-string">"{color: 'white', 'background-color': 'blue'}"</span>&gt;</span>
   Uses fixed white text on blue background
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>需要注意的是， <code>background-color</code> 需要使用单引号，而 <code>color</code> 不需要。这其中的原因是，<code>ng-style</code> 要求的参数是一个 <code>Javascript</code> 对象，<code>color</code> 是一个有效的 <code>key</code>，而 <code>background-color</code> 不是一个有效的 <code>key</code> ，所以需要添加 <code>''</code>。</p>
<p>对于一些场合，我们也可以直接利用 Angular 属性绑定的语法，来快速设置元素的样式。</p>
<ul><li>设置元素的背景颜色</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [style.background-color=&quot;'yellow'&quot;]>
  Use fixed yellow background
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">style.background-color</span>=<span class="hljs-string">"'yellow'"</span>]&gt;</span>
  Use fixed yellow background
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<ul><li>设置元素的字体大小</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 支持单位: px | em | %-->
<div>
   <span [ngStyle]=&quot;{color: 'red'}&quot; [style.font-size.px]=&quot;fontSize&quot;>
      Red Text
   </span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 支持单位: px | em | %--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> [<span class="hljs-attr">ngStyle</span>]=<span class="hljs-string">"{color: 'red'}"</span> [<span class="hljs-attr">style.font-size.px</span>]=<span class="hljs-string">"fontSize"</span>&gt;</span>
      Red Text
   <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader30">我有话说</h2>
<h3 id="articleHeader31">应该如何引入第三方 UI 库，如 bootstrap</h3>
<p>若要引入第三方 UI 库，可以在 <code>.angular-cli.json</code> 文件中，配置对应的样式文件地址，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;apps&quot;: {
     &quot;styles&quot;: [
         &quot;styles.css&quot;,
         &quot;../node_modules/bootstrap/dist/css/bootstrap.min.css&quot;
      ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"apps"</span>: {
     <span class="hljs-attr">"styles"</span>: [
         <span class="hljs-string">"styles.css"</span>,
         <span class="hljs-string">"../node_modules/bootstrap/dist/css/bootstrap.min.css"</span>
      ]
  }
}</code></pre>
<h3 id="articleHeader32">除了本系列教程外，还有其它入门的资料么？</h3>
<p>本系列教程的主要目的是让初学者对 Angular 的相关基础知识，有一定的了解。除了本系列教程外，初学者还可以参考以下教程：</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000009733649" target="_blank">Angular 4 快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009652980">Angular 4 表单快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009674089" target="_blank">Angular 4 指令快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009265310">Angular 4.x 路由快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009612113" target="_blank">Angular 4 依赖注入教程之一 依赖注入简介(共八节)</a></li>
<li><a href="https://segmentfault.com/a/1190000008754631#articleHeader1">Angular 4 组件学习线路(仅供参考)</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4 基础教程

## 原文链接
[https://segmentfault.com/a/1190000009819720](https://segmentfault.com/a/1190000009819720)

