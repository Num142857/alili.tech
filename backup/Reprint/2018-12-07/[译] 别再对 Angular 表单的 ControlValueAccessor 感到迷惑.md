---
title: '[译] 别再对 Angular 表单的 ControlValueAccessor 感到迷惑' 
date: 2018-12-07 2:30:10
hidden: true
slug: 7tkdo3rjtiq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文链接：<strong><a href="https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83" rel="nofollow noreferrer" target="_blank">Never again be confused when implementing ControlValueAccessor in Angular&nbsp;forms</a></strong>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV7rR7?w=400&amp;h=391" src="https://static.alili.tech/img/bV7rR7?w=400&amp;h=391" alt="ceasy-control-value-accessor" title="ceasy-control-value-accessor" style="cursor: pointer; display: inline;"></span></p>
<p>如果你正在做一个复杂项目，必然会需要自定义表单控件，这个控件主要需要实现 <code>ControlValueAccessor</code> 接口（译者注：该接口定义方法可参考 <strong><a href="https://angular.io/api/forms/ControlValueAccessor" rel="nofollow noreferrer" target="_blank">API 文档说明</a></strong>，也可参考 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/control_value_accessor.ts" rel="nofollow noreferrer" target="_blank">Angular 源码定义</a></strong>）。网上有大量文章描述如何实现这个接口，但很少说到它在 Angular 表单架构里扮演什么角色，如果你不仅仅想知道如何实现，还想知道为什么这样实现，那本文正合你的胃口。</p>
<p>首先我解释下为啥需要 <code>ControlValueAccessor</code> 接口以及它在 Angular 中是如何使用的。然后我将展示如何封装第三方组件作为 Angular 组件，以及如何使用输入输出机制实现组件间通信（译者注：Angular 组件间通信输入输出机制可参考<strong><a href="https://angular.io/guide/component-interaction" rel="nofollow noreferrer" target="_blank">官网文档</a></strong>），最后将展示如何使用 <code>ControlValueAccessor</code> 来实现一种<strong>针对 Angular 表单</strong>新的数据通信机制。</p>
<h2 id="articleHeader0">FormControl 和 ControlValueAccessor</h2>
<p>如果你之前使用过 Angular 表单，你可能会熟悉 <strong><a href="https://angular.io/api/forms/FormControl" rel="nofollow noreferrer" target="_blank">FormControl</a></strong> ，Angular 官方文档将它描述为追踪单个表单控件<strong>值和有效性</strong>的实体对象。需要明白，不管你使用模板驱动还是响应式表单（译者注：即模型驱动），<code>FormControl</code> 都总会被创建。如果你使用响应式表单，你需要显式创建 <code>FormControl</code> 对象，并使用 <code>formControl</code> 或 <code>formControlName</code> 指令来绑定原生控件；如果你使用模板驱动方法，<code>FormControl</code> 对象会被 <strong><a href="https://angular.io/api/forms/NgModel" rel="nofollow noreferrer" target="_blank"><code>NgModel</code></a></strong> 指令隐式创建（译者注：可查看 Angular 源码<strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/ng_model.ts#L113" rel="nofollow noreferrer" target="_blank">这一行</a></strong>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Directive({
  selector: '[ngModel]...',
  ...
})
export class NgModel ... {
  _control = new FormControl();   <---------------- here" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Directive</span>({
  selector: <span class="hljs-string">'[ngModel]...'</span>,
  ...
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> NgModel ... {
  _control = <span class="hljs-keyword">new</span> FormControl();   &lt;---------------- here</code></pre>
<p>不管 <code>formControl</code> 是隐式还是显式创建，都必须和原生 DOM 表单控件如 <code>input,textarea</code> 进行交互，并且很有可能需要自定义一个表单控件作为 Angular 组件而不是使用原生表单控件，而通常自定义表单控件会封装一个使用纯 JS 写的控件如 <strong><a href="https://jqueryui.com/slider/" rel="nofollow noreferrer" target="_blank"><code>jQuery UI's Slider</code></a></strong>。本文我将使用<strong>原生表单控件</strong>术语来区分 Angular 特定的 <code>formControl</code> 和你在 <code>html</code> 使用的表单控件，但你需要知道任何一个自定义表单控件都可以和 <code>formControl</code> 指令进行交互，而不是原生表单控件如 <code>input</code>。</p>
<p>原生表单控件数量是有限的，但是自定义表单控件是无限的，所以 Angular 需要一种通用机制来<strong>桥接</strong>原生/自定义表单控件和 <code>formControl</code> 指令，而这正是 <strong><a href="https://angular.io/api/forms/ControlValueAccessor" rel="nofollow noreferrer" target="_blank"><code>ControlValueAccessor</code></a></strong> 干的事情。这个对象桥接原生表单控件和 <code>formControl</code> 指令，并同步两者的值。官方文档是这么描述的（译者注：为清晰理解，该描述不翻译）：</p>
<blockquote>&nbsp;ControlValueAccessor&nbsp;acts as a bridge between the Angular forms API and a native element in the DOM.</blockquote>
<p>任何一个组件或指令都可以通过实现 <code>ControlValueAccessor</code> 接口并注册为 <code>NG_VALUE_ACCESSOR</code>，从而转变成 <code>ControlValueAccessor</code> 类型的对象，稍后我们将一起看看如何做。另外，这个接口还定义两个重要方法——<code>writeValue</code> 和 <code>registerOnChange</code> （译者注：可查看 Angular 源码<strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/control_value_accessor.ts" rel="nofollow noreferrer" target="_blank">这一行</a></strong>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ControlValueAccessor {
  writeValue(obj: any): void
  registerOnChange(fn: any): void
  registerOnTouched(fn: any): void
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">ControlValueAccessor</span> {</span>
  writeValue(<span class="hljs-string">obj:</span> any): <span class="hljs-keyword">void</span>
  registerOnChange(<span class="hljs-string">fn:</span> any): <span class="hljs-keyword">void</span>
  registerOnTouched(<span class="hljs-string">fn:</span> any): <span class="hljs-keyword">void</span>
  ...
}</code></pre>
<p><code>formControl</code> 指令使用 <code>writeValue</code> 方法设置原生表单控件的值（译者注：你可能会参考 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/reactive_directives/form_control_directive.ts#L186" rel="nofollow noreferrer" target="_blank">L186</a></strong> 和 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L41" rel="nofollow noreferrer" target="_blank">L41</a></strong>）；使用 <code>registerOnChange</code> 方法来注册由每次原生表单控件值更新时触发的回调函数（译者注：你可能会参考这三行，<strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/reactive_directives/form_control_directive.ts#L186" rel="nofollow noreferrer" target="_blank">L186</a></strong> 和 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L43" rel="nofollow noreferrer" target="_blank">L43</a></strong>，以及 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L85" rel="nofollow noreferrer" target="_blank">L85</a></strong>），<strong>你需要把更新的值传给这个回调函数，这样对应的 Angular 表单控件值也会更新</strong>（译者注：这一点可以参考 Angular 它自己写的 <code>DefaultValueAccessor</code> 的写法是如何把 input 控件每次更新值传给回调函数的，<strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/default_value_accessor.ts#L52" rel="nofollow noreferrer" target="_blank">L52</a></strong> 和 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/default_value_accessor.ts#L89" rel="nofollow noreferrer" target="_blank">L89</a></strong>）；使用 <code>registerOnTouched</code> 方法来注册用户和控件交互时触发的回调（译者注：你可能会参考 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L95" rel="nofollow noreferrer" target="_blank">L95</a></strong>）。</p>
<p>下图是 <code>Angular 表单控件</code> 如何通过 <code>ControlValueAccessor</code> 来和<code>原生表单控件</code>交互的（译者注：<code>formControl</code> 和<strong>你写的或者 Angular 提供的 <code>CustomControlValueAccessor</code></strong> 两个都是要绑定到 native DOM element 的指令，而 <code>formControl</code> 指令需要借助 <code>CustomControlValueAccessor</code> 指令/组件，来和 native DOM element 交换数据。）：</p>
<p><span class="img-wrap"><img data-src="/img/bV7rSH?w=684&amp;h=188" src="https://static.alili.tech/img/bV7rSH?w=684&amp;h=188" alt="angular_form_control-controlValueAccessor-native_form_control" title="angular_form_control-controlValueAccessor-native_form_control" style="cursor: pointer; display: inline;"></span></p>
<p>再次强调，不管是使用响应式表单显式创建还是使用模板驱动表单隐式创建，<code>ControlValueAccessor</code> 都总是和 Angular 表单控件进行交互。</p>
<p>Angular 也为所有原生 DOM 表单元素创建了 <code>Angular</code> 表单控件（译者注：Angular 内置的 ControlValueAccessor）：</p>
<table>
<thead><tr>
<th>Accessor</th>
<th>Form Element</th>
</tr></thead>
<tbody>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/default_value_accessor.ts#L47" rel="nofollow noreferrer" target="_blank">DefaultValueAccessor</a></strong></td>
<td>input,textarea</td>
</tr>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/checkbox_value_accessor.ts#L31" rel="nofollow noreferrer" target="_blank">CheckboxControlValueAccessor</a></strong></td>
<td>input[type=checkbox]</td>
</tr>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/number_value_accessor.ts#L30" rel="nofollow noreferrer" target="_blank">NumberValueAccessor</a></strong></td>
<td>input[type=number]</td>
</tr>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/radio_control_value_accessor.ts#L88" rel="nofollow noreferrer" target="_blank">RadioControlValueAccessor</a></strong></td>
<td>input[type=radio]</td>
</tr>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/range_value_accessor.ts" rel="nofollow noreferrer" target="_blank">RangeValueAccessor</a></strong></td>
<td>input[type=range]</td>
</tr>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/select_control_value_accessor.ts#L94" rel="nofollow noreferrer" target="_blank">SelectControlValueAccessor</a></strong></td>
<td>select</td>
</tr>
<tr>
<td><strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/select_multiple_control_value_accessor.ts#L74" rel="nofollow noreferrer" target="_blank">SelectMultipleControlValueAccessor</a></strong></td>
<td>select[multiple]</td>
</tr>
</tbody>
</table>
<p>从上表中可看到，当 Angular 在组件模板中中遇到 <code>input</code> 或 <code>textarea</code> DOM 原生控件时，会使用<code>DefaultValueAccessor</code> 指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-app',
  template: `
      <input [formControl]=&quot;ctrl&quot;>
  `
})
export class AppComponent {
  ctrl = new FormControl(3);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
      &lt;input [formControl]="ctrl"&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  ctrl = <span class="hljs-keyword">new</span> FormControl(<span class="hljs-number">3</span>);
}</code></pre>
<p>所有表单指令，包括上面代码中的 <code>formControl</code> 指令，都会调用 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L35" rel="nofollow noreferrer" target="_blank">setUpControl</a></strong> 函数来让表单控件和<code>DefaultValueAccessor</code> 实现交互（译者注：意思就是上面代码中绑定的 <code>formControl</code> 指令，在其自身实例化时，会调用 <code>setUpControl()</code> 函数给同样绑定到 <code>input </code> 的 <code>DefaultValueAccessor</code> 指令做好安装工作，如  <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L85" rel="nofollow noreferrer" target="_blank">L85</a></strong>，这样 <code>formControl</code> 指令就可以借助 <code>DefaultValueAccessor</code> 来和 <code>input</code> 元素交换数据了）。细节可参考 <code>formControl</code> 指令的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class FormControlDirective ... {
  ...
  ngOnChanges(changes: SimpleChanges): void {
    if (this._isControlChanged(changes)) {
      setUpControl(this.form, this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> FormControlDirective ... {
  ...
  ngOnChanges(changes: SimpleChanges): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._isControlChanged(changes)) {
      setUpControl(<span class="hljs-keyword">this</span>.form, <span class="hljs-keyword">this</span>);</code></pre>
<p>还有 <code>setUpControl</code> 函数源码也指出了原生表单控件和 Angular 表单控件是如何数据同步的（译者注：作者贴的可能是 Angular v4.x 的代码，v5 有了点小小变动，但基本相似）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function setUpControl(control: FormControl, dir: NgControl) {
  
  // initialize a form control
  // 调用 writeValue() 初始化表单控件值
  dir.valueAccessor.writeValue(control.value);
  
  // setup a listener for changes on the native control
  // and set this value to form control
  // 设置原生控件值更新时监听器，每当原生控件值更新，Angular 表单控件值也更新
  valueAccessor.registerOnChange((newValue: any) => {
    control.setValue(newValue, {emitModelToViewChange: false});
  });

  // setup a listener for changes on the Angular formControl
  // and set this value to the native control
  // 设置 Angular 表单控件值更新监听器，每当 Angular 表单控件值更新，原生控件值也更新
  control.registerOnChange((newValue: any, ...) => {
    dir.valueAccessor.writeValue(newValue);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setUpControl</span>(<span class="hljs-params">control: FormControl, dir: NgControl</span>) </span>{
  
  <span class="hljs-comment">// initialize a form control</span>
  <span class="hljs-comment">// 调用 writeValue() 初始化表单控件值</span>
  dir.valueAccessor.writeValue(control.value);
  
  <span class="hljs-comment">// setup a listener for changes on the native control</span>
  <span class="hljs-comment">// and set this value to form control</span>
  <span class="hljs-comment">// 设置原生控件值更新时监听器，每当原生控件值更新，Angular 表单控件值也更新</span>
  valueAccessor.registerOnChange(<span class="hljs-function">(<span class="hljs-params">newValue: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
    control.setValue(newValue, {emitModelToViewChange: <span class="hljs-literal">false</span>});
  });

  <span class="hljs-comment">// setup a listener for changes on the Angular formControl</span>
  <span class="hljs-comment">// and set this value to the native control</span>
  <span class="hljs-comment">// 设置 Angular 表单控件值更新监听器，每当 Angular 表单控件值更新，原生控件值也更新</span>
  control.registerOnChange(<span class="hljs-function">(<span class="hljs-params">newValue: <span class="hljs-built_in">any</span>, ...</span>) =&gt;</span> {
    dir.valueAccessor.writeValue(newValue);
  });</code></pre>
<p>只要我们理解了内部机制，就可以实现我们自定义的 Angular 表单控件了。</p>
<h2 id="articleHeader1">组件封装器</h2>
<p>由于 Angular 为所有默认原生控件提供了控件值访问器，所以在封装第三方插件或组件时，需要写一个新的控件值访问器。我们将使用上文提到的 jQuery UI 库的 <strong><a href="https://jqueryui.com/slider/" rel="nofollow noreferrer" target="_blank">slider</a></strong> 插件，来实现一个自定义表单控件吧。</p>
<h3 id="articleHeader2">简单的封装器</h3>
<p>最基础实现是通过简单封装使其能在屏幕上显示出来，所以我们需要一个 <code>NgxJquerySliderComponent</code> 组件，并在其模板里渲染出 <code>slider</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'ngx-jquery-slider',
  template: `
      <div #location></div>
  `,
  styles: ['div {width: 100px}']
})
export class NgxJquerySliderComponent {
  @ViewChild('location') location;
  widget;
  ngOnInit() {
    this.widget = $(this.location.nativeElement).slider();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'ngx-jquery-slider'</span>,
  template: <span class="hljs-string">`
      &lt;div #location&gt;&lt;/div&gt;
  `</span>,
  styles: [<span class="hljs-string">'div {width: 100px}'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> NgxJquerySliderComponent {
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'location'</span>) location;
  widget;
  ngOnInit() {
    <span class="hljs-keyword">this</span>.widget = $(<span class="hljs-keyword">this</span>.location.nativeElement).slider();
  }
}</code></pre>
<p>这里我们使用标准的 <code>jQuery</code> 方法在原生 DOM 元素上创建一个 <code>slider</code> 控件，然后使用 <code>widget</code> 属性引用这个控件。</p>
<p>一旦简单封装好了 <code>slider</code> 组件，我们就可以在父组件模板里使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-app',
  template: `
      <h1>Hello "{{"name"}}"</h1>
      <ngx-jquery-slider></ngx-jquery-slider>
  `
})
export class AppComponent { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
      &lt;h1&gt;Hello "{{"name"}}"&lt;/h1&gt;
      &lt;ngx-jquery-slider&gt;&lt;/ngx-jquery-slider&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { ... }</code></pre>
<p>为了运行程序我们需要加入 <code>jQuery</code> 相关依赖，简化起见，在 <code>index.html</code> 中添加全局依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://code.jquery.com/jquery-3.2.1.js&quot;></script>
<script src=&quot;https://code.jquery.com/ui/1.12.1/jquery-ui.js&quot;></script>
<link rel=&quot;stylesheet&quot; href=&quot;//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://code.jquery.com/jquery-3.2.1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://code.jquery.com/ui/1.12.1/jquery-ui.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css"</span>&gt;</span></code></pre>
<p>这里是安装依赖的<strong><a href="https://plnkr.co/edit/OyCXMLwVcWQelO1en9tR?p=preview" rel="nofollow noreferrer" target="_blank">源码</a></strong>。</p>
<h3 id="articleHeader3">交互式表单控件</h3>
<p>上面的实现还不能让我们自定义的 <code>slider</code> 控件与父组件交互，所以还得使用输入/输出绑定来是实现组件间数据通信：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class NgxJquerySliderComponent {
  @ViewChild('location') location;
  @Input() value;
  @Output() private valueChange = new EventEmitter();
  widget;

  ngOnInit() {
    this.widget = $(this.location.nativeElement).slider();   
    this.widget.slider('value', this.value);
    this.widget.on('slidestop', (event, ui) => {
      this.valueChange.emit(ui.value);
    });
  }

  ngOnChanges() {
    if (this.widget &amp;&amp; this.widget.slider('value') !== this.value) {
      this.widget.slider('value', this.value);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> NgxJquerySliderComponent {
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'location'</span>) location;
  <span class="hljs-meta">@Input</span>() value;
  <span class="hljs-meta">@Output</span>() <span class="hljs-keyword">private</span> valueChange = <span class="hljs-keyword">new</span> EventEmitter();
  widget;

  ngOnInit() {
    <span class="hljs-keyword">this</span>.widget = $(<span class="hljs-keyword">this</span>.location.nativeElement).slider();   
    <span class="hljs-keyword">this</span>.widget.slider(<span class="hljs-string">'value'</span>, <span class="hljs-keyword">this</span>.value);
    <span class="hljs-keyword">this</span>.widget.on(<span class="hljs-string">'slidestop'</span>, <span class="hljs-function">(<span class="hljs-params">event, ui</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.valueChange.emit(ui.value);
    });
  }

  ngOnChanges() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.widget &amp;&amp; <span class="hljs-keyword">this</span>.widget.slider(<span class="hljs-string">'value'</span>) !== <span class="hljs-keyword">this</span>.value) {
      <span class="hljs-keyword">this</span>.widget.slider(<span class="hljs-string">'value'</span>, <span class="hljs-keyword">this</span>.value);
    }
  }
}</code></pre>
<p>一旦 <code>slider</code> 组件创建，就可以订阅 <code>slidestop</code> 事件获取变化的值，一旦 <code>slidestop</code> 事件被触发了，就可以使用输出事件发射器 <code>valueChanges</code> 通知父组件。当然我们也可以使用 <code>ngOnChanges</code> 生命周期钩子来追踪输入属性 <code>value</code> 值的变化，一旦其值变化，我们就将该值设置为 <code>slider</code> 控件的值。</p>
<p>然后就是父组件中如何使用 <code>slider</code> 组件的代码实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ngx-jquery-slider
    [value]=&quot;sliderValue&quot;
    (valueChange)=&quot;onSliderValueChange($event)&quot;>
</ngx-jquery-slider>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts">&lt;ngx-jquery-slider
    [value]=<span class="hljs-string">"sliderValue"</span>
    (valueChange)=<span class="hljs-string">"onSliderValueChange($event)"</span>&gt;
&lt;<span class="hljs-regexp">/ngx-jquery-slider&gt;</span></code></pre>
<p><strong><a href="https://plnkr.co/edit/bCrkvABQkRZXrnVvTW7D?p=preview" rel="nofollow noreferrer" target="_blank">源码</a></strong>在这里。</p>
<p>但是，我们想要的是，使用 <code>slider</code> 组件作为表单的一部分，并使用模板驱动表单或响应式表单的指令与其数据通信，那就需要让其实现 <code>ControlValueAccessor</code> 接口了。由于我们将实现的是新的组件通信方式，所以不需要标准的输入输出属性绑定方式，那就移除相关代码吧。（译者注：作者先实现标准的输入输出属性绑定的通信方式，又要删除，主要是为了引入<strong>新的表单组件交互方式</strong>，即 <code>ControlValueAccessor</code>。）</p>
<h2 id="articleHeader4">实现自定义控件值访问器</h2>
<p>实现自定义控件值访问器并不难，只需要两步：</p>
<ol>
<li>注册 <code>NG_VALUE_ACCESSOR</code> 提供者</li>
<li>实现 <code>ControlValueAccessor</code> 接口</li>
</ol>
<p><code>NG_VALUE_ACCESSOR</code> 提供者用来指定实现了 <code>ControlValueAccessor</code> 接口的类，并且被 Angular 用来和 <code>formControl</code> 同步，通常是使用组件类或指令来注册。所有表单指令都是使用<code>NG_VALUE_ACCESSOR</code> 标识来注入控件值访问器，然后选择合适的访问器（译者注：这句话可参考这两行代码，<strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/reactive_directives/form_control_directive.ts#L175" rel="nofollow noreferrer" target="_blank">L175</a></strong> 和 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/reactive_directives/form_control_directive.ts#L181" rel="nofollow noreferrer" target="_blank">L181</a></strong>）。要么选择<code>DefaultValueAccessor</code> 或者内置的数据访问器，否则 Angular 将会选择自定义的数据访问器，并且有且只有一个自定义的数据访问器（译者注：这句话参考 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L186" rel="nofollow noreferrer" target="_blank"><code>selectValueAccessor</code> 源码实现</a></strong>）。</p>
<p>让我们首先定义提供者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'ngx-jquery-slider',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxJquerySliderComponent,
    multi: true
  }]
  ...
})
class NgxJquerySliderComponent implements ControlValueAccessor {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>@<span class="hljs-type">Component</span>({
  selector: 'ngx-jquery-slider',
  providers: [{
    provide: <span class="hljs-type">NG_VALUE_ACCESSOR</span>,
    useExisting: <span class="hljs-type">NgxJquerySliderComponent</span>,
    multi: <span class="hljs-literal">true</span>
  }]
  ...
})
class <span class="hljs-type">NgxJquerySliderComponent</span> implements <span class="hljs-type">ControlValueAccessor</span> <span class="hljs-meta">{...}</span></code></pre>
<p>我们直接在组件装饰器里直接指定类名，然而 Angular 源码默认实现是放在类装饰器外面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultValueAccessor),
  multi: true
};
@Directive({
  selector:'input',
  providers: [DEFAULT_VALUE_ACCESSOR]
  ...
})
export class DefaultValueAccessor implements ControlValueAccessor {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DEFAULT_VALUE_ACCESSOR: <span class="hljs-built_in">any</span> = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> DefaultValueAccessor),
  multi: <span class="hljs-literal">true</span>
};
<span class="hljs-meta">@Directive</span>({
  selector:<span class="hljs-string">'input'</span>,
  providers: [DEFAULT_VALUE_ACCESSOR]
  ...
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DefaultValueAccessor <span class="hljs-keyword">implements</span> ControlValueAccessor {}</code></pre>
<p>放在外面就需要使用 <code>forwardRef</code>，关于原因可以参考 <strong><a href="https://blog.angularindepth.com/what-is-forwardref-in-angular-and-why-we-need-it-6ecefb417d48" rel="nofollow noreferrer" target="_blank">What is forwardRef in Angular and why we need it</a></strong> 。当实现自定义 <code>controlValueAccessor</code>，我建议还是放在类装饰器里吧（译者注：个人建议还是学习 Angular 源码那样放在外面）。</p>
<p>一旦定义了提供者后，就让我们实现 <code>controlValueAccessor</code> 接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class NgxJquerySliderComponent implements ControlValueAccessor {
  @ViewChild('location') location;
  widget;
  onChange;
  value;
  
ngOnInit() {
    this.widget = $(this.location.nativeElement).slider(this.value);
   this.widget.on('slidestop', (event, ui) => {
      this.onChange(ui.value);
    });
}
  
writeValue(value) {
    this.value = value;
    if (this.widget &amp;&amp; value) {
      this.widget.slider('value', value);
    }
  }
  
registerOnChange(fn) { this.onChange = fn;  }

registerOnTouched(fn) {  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> NgxJquerySliderComponent <span class="hljs-keyword">implements</span> ControlValueAccessor {
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'location'</span>) location;
  widget;
  onChange;
  value;
  
ngOnInit() {
    <span class="hljs-keyword">this</span>.widget = $(<span class="hljs-keyword">this</span>.location.nativeElement).slider(<span class="hljs-keyword">this</span>.value);
   <span class="hljs-keyword">this</span>.widget.on(<span class="hljs-string">'slidestop'</span>, <span class="hljs-function">(<span class="hljs-params">event, ui</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.onChange(ui.value);
    });
}
  
writeValue(value) {
    <span class="hljs-keyword">this</span>.value = value;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.widget &amp;&amp; value) {
      <span class="hljs-keyword">this</span>.widget.slider(<span class="hljs-string">'value'</span>, value);
    }
  }
  
registerOnChange(fn) { <span class="hljs-keyword">this</span>.onChange = fn;  }

registerOnTouched(fn) {  }</code></pre>
<p>由于我们对用户是否与组件交互不感兴趣，所以先把 <code>registerOnTouched</code> 置空吧。在<code>registerOnChange</code> 里我们简单保存了对回调函数 <code>fn</code> 的引用，回调函数是由 <code>formControl</code> 指令传入的（译者注：参考 <strong><a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/shared.ts#L85" rel="nofollow noreferrer" target="_blank">L85</a></strong>），只要每次 <code>slider</code> 组件值发生改变，就会触发这个回调函数。在 <code>writeValue</code> 方法内我们把得到的值传给 <code>slider</code> 组件。</p>
<p>现在我们把上面描述的功能做成一张交互式图：</p>
<p><span class="img-wrap"><img data-src="/img/bV7rTf?w=762&amp;h=257" src="https://static.alili.tech/img/bV7rTf?w=762&amp;h=257" alt="jQuery_slider-slider_component-form_control" title="jQuery_slider-slider_component-form_control" style="cursor: pointer; display: inline;"></span></p>
<p>如果你把简单封装和 <code>controlValueAccessor</code> 封装进行比较，你会发现父子组件交互方式是不一样的，尽管封装的组件与 <code>slider</code> 组件的交互是一样的。你可能注意到 <code>formControl</code> 指令实际上简化了与父组件交互的方式。这里我们使用 <code>writeValue</code> 来向子组件写入数据，而在简单封装方法中使用 <code>ngOnChanges</code>；调用 <code>this.onChange</code> 方法输出数据，而在简单封装方法中使用 <code>this.valueChange.emit(ui.value)</code>。</p>
<p>现在，实现了 <code>ControlValueAccessor</code> 接口的自定义 <code>slider</code> 表单控件完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-app',
  template: `
      <h1>Hello "{{"name"}}"</h1>
      <span>Current slider value: "{{"ctrl.value"}}"</span>
      <ngx-jquery-slider [formControl]=&quot;ctrl&quot;></ngx-jquery-slider>
      <input [value]=&quot;ctrl.value&quot; (change)=&quot;updateSlider($event)&quot;>
  `
})
export class AppComponent {
  ctrl = new FormControl(11);

  updateSlider($event) {
    this.ctrl.setValue($event.currentTarget.value, {emitModelToViewChange: true});
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `
      &lt;h1&gt;Hello "{{"name"}}"&lt;/h1&gt;
      &lt;span&gt;Current slider <span class="hljs-keyword">value</span>: "{{"ctrl.<span class="hljs-keyword">value</span>"}}"&lt;/span&gt;
      &lt;ngx-jquery-slider [formControl]=<span class="hljs-string">"ctrl"</span>&gt;&lt;/ngx-jquery-slider&gt;
      &lt;input [<span class="hljs-keyword">value</span>]=<span class="hljs-string">"ctrl.value"</span> (change)=<span class="hljs-string">"updateSlider($event)"</span>&gt;
  `
})
export <span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {
  ctrl = <span class="hljs-keyword">new</span> FormControl(<span class="hljs-number">11</span>);

  updateSlider($<span class="hljs-keyword">event</span>) {
    <span class="hljs-keyword">this</span>.ctrl.setValue($<span class="hljs-keyword">event</span>.currentTarget.<span class="hljs-keyword">value</span>, {emitModelToViewChange: <span class="hljs-literal">true</span>});
  }
}</code></pre>
<p>你可以查看程序的<strong><a href="https://plnkr.co/edit/c3tUH819er2gA9ertQS6?p=preview" rel="nofollow noreferrer" target="_blank">最终实现</a></strong>。</p>
<h2 id="articleHeader5">Github</h2>
<p>项目的 <strong><a href="https://github.com/maximusk/custom-form-control-that-implements-control-value-accessor-and-wraps-jquery-slider" rel="nofollow noreferrer" target="_blank">Github 仓库</a></strong>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 别再对 Angular 表单的 ControlValueAccessor 感到迷惑

## 原文链接
[https://segmentfault.com/a/1190000014129567](https://segmentfault.com/a/1190000014129567)

