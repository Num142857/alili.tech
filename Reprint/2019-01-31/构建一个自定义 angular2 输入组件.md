---
title: '构建一个自定义 angular2 输入组件' 
date: 2019-01-31 2:31:16
hidden: true
slug: rcmlmgo4g2f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">构建一个自定义 angular2 输入组件</h2>
<p>今天我们来学习如何正确的构建和一个具有和 <code>&lt;input type="text"&gt;</code> 同样作用，但同时也具有自己的逻辑的输入组件。</p>
<p>在读这篇文章之前，希望你已经把官方的文档和案例都看过至少一遍了，具体的一些概念和细节不会在文章中讲解。</p>
<p>我们先来看一下我们这篇文章里面所介绍的组件的表现形式是怎么样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVF4gi?w=480&amp;h=789" src="https://static.alili.tech/img/bVF4gi?w=480&amp;h=789" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>OK，上图就是我们所要达到的效果了。那么，我们来分析下我们这个组件该具备哪些功能。</p>
<ul>
<li><p>聚焦的时候，底部边框为绿色</p></li>
<li><p>具有自己的部分逻辑，比如在有输入值的情况下，会出现一个删除图标</p></li>
<li><p>当输入值为空的时候，提示错误文案</p></li>
<li><p>可以插入其它的 DOM，比如最下面的发送验证码按钮</p></li>
<li><p>支持 <code>input</code> 的必要属性，比如 <code>maxlength、placeholder</code>等</p></li>
<li><p>支持表单 <code>angular2 form-control</code> 表单绑定，如上图中的值都是从 <code>FormBuilder</code> 中构建的</p></li>
</ul>
<p>我们将在后面一步步的来讲解如何实现这样一个自定义组件的功能；</p>
<h2 id="articleHeader1">创建一个 angular2 组件</h2>
<p>我们先来构建一个基础的 <code>angular2</code> 组件,这里我们先新建一个叫做 <code>input-control</code> 的组件。</p>
<p>首先是 <code>input-control.component.ts</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'input-control'</span>,
  templateUrl: <span class="hljs-string">'input-control.component.html'</span>,
  styleUrls: [<span class="hljs-string">'input-control.component.scss'</span>],
  encapsulation: ViewEncapsulation.None,
})</code></pre>
<p>然后是 <code>input-control.component.html</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input #input
  [type]=&quot;type&quot;
  [name]=&quot;name&quot;
  (focus)=&quot;_handleFocus($event)&quot;
  (blur)=&quot;_handleBlur($event)&quot;
  [placeholder]=&quot;placeholder&quot;
  [(ngModel)]=&quot;value&quot;
  [minlength]=&quot;minlength&quot;
  [maxlength]=&quot;maxlength&quot;
  [readonly]=&quot;readonly&quot;
  [disabled]=&quot;disabled&quot;>
<i #iconDelete *ngIf=&quot;focused &amp;&amp; !readonly&quot; class=&quot;icon icon-delete&quot; (click)=&quot;_handleClear($event)&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> #<span class="hljs-attr">input</span>
  [<span class="hljs-attr">type</span>]=<span class="hljs-string">"type"</span>
  [<span class="hljs-attr">name</span>]=<span class="hljs-string">"name"</span>
  (<span class="hljs-attr">focus</span>)=<span class="hljs-string">"_handleFocus($event)"</span>
  (<span class="hljs-attr">blur</span>)=<span class="hljs-string">"_handleBlur($event)"</span>
  [<span class="hljs-attr">placeholder</span>]=<span class="hljs-string">"placeholder"</span>
  [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"value"</span>
  [<span class="hljs-attr">minlength</span>]=<span class="hljs-string">"minlength"</span>
  [<span class="hljs-attr">maxlength</span>]=<span class="hljs-string">"maxlength"</span>
  [<span class="hljs-attr">readonly</span>]=<span class="hljs-string">"readonly"</span>
  [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"disabled"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span> #<span class="hljs-attr">iconDelete</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"focused &amp;&amp; !readonly"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon-delete"</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"_handleClear($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre>
<p>剩下就是 <code>input-control.component.scss</code> 文件了，这里我就不贴出代码了，各位可以根据自己的项目来设置对应的样式</p>
<p>最后，就是我们调用的时候的方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input-control class=&quot;input-control&quot;
  [class.error]=&quot;!mobile.valid &amp;&amp; mobile.touched&quot;
  type=&quot;tel&quot;
  name=&quot;mobile&quot;
  placeholder=&quot;手机号&quot;
  maxlength=&quot;11&quot;
  [formControl]=&quot;mobile&quot;>
  <p *ngIf=&quot;mobile.touched &amp;&amp; mobile.hasError('mobile')&quot; class=&quot;error-tips&quot;>请输入正确的手机号码</p>
</input-control>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input-control</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input-control"</span>
  [<span class="hljs-attr">class.error</span>]=<span class="hljs-string">"!mobile.valid &amp;&amp; mobile.touched"</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"tel"</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">"mobile"</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"手机号"</span>
  <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"11"</span>
  [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"mobile"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"mobile.touched &amp;&amp; mobile.hasError('mobile')"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"error-tips"</span>&gt;</span>请输入正确的手机号码<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">input-control</span>&gt;</span></code></pre>
<p>是否对于上面的一些属性和变量感到困惑，别急，让我一步步道来！</p>
<h2 id="articleHeader2">功能细分</h2>
<h3 id="articleHeader3">输入属性 <code>@Input()</code>
</h3>
<p>有一点要谨记：<strong>我们是在用 DIV 来模拟一个 input 的表现，同时具备自己的逻辑</strong>; 所以，当我们需要 <code>input</code> 的对应属性值的时候，我们都需要从父容器传递到组件内部的 <code>input</code> 上面，所以在这里我们需要用到 <code>@Input</code> 特性了</p>
<p>我们在 <code>input-control.component.ts</code> 定义我们所需的一些属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.scss'],
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  }
})
export class InputControlComponent {
  private _focused: boolean = false;
  private _value: any = '';
  private _disabled: boolean = false;
  private _readonly: boolean = false;
  private _required: boolean = false;

  // 外部传入属性
  @Input() type: string = 'text';
  @Input() name: string = null;
  @Input() placeholder: string = null;
  @Input() minlength: number;
  @Input() maxlength: number;

  // value 属性，以 get 方式拦截
  get value(): any {
    return this._value;
  };

  @Input() set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      // 触发值改变事件，冒泡给父级
      this._onChangeCallback(v);
    }
  }

  // 只读属性
  get focused() {
    return this._focused;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = this._coerceBooleanProperty(value);
  }

  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = this._coerceBooleanProperty(value);
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value) {
    this._required = this._coerceBooleanProperty(value);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'input-control'</span>,
  templateUrl: <span class="hljs-string">'input-control.component.html'</span>,
  styleUrls: [<span class="hljs-string">'input-control.component.scss'</span>],
  host: {
    <span class="hljs-comment">// 宿主元素 click 事件，触发 focus() 事件</span>
    <span class="hljs-string">'(click)'</span>: <span class="hljs-string">'focus()'</span>,
    <span class="hljs-comment">// 切换宿主元素 focus 样式</span>
    <span class="hljs-string">'[class.focus]'</span>: <span class="hljs-string">'focused'</span>
  }
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> InputControlComponent {
  <span class="hljs-keyword">private</span> _focused: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> _value: <span class="hljs-built_in">any</span> = <span class="hljs-string">''</span>;
  <span class="hljs-keyword">private</span> _disabled: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> _readonly: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> _required: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// 外部传入属性</span>
  <span class="hljs-meta">@Input</span>() <span class="hljs-keyword">type</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">'text'</span>;
  <span class="hljs-meta">@Input</span>() name: <span class="hljs-built_in">string</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-meta">@Input</span>() placeholder: <span class="hljs-built_in">string</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-meta">@Input</span>() minlength: <span class="hljs-built_in">number</span>;
  <span class="hljs-meta">@Input</span>() maxlength: <span class="hljs-built_in">number</span>;

  <span class="hljs-comment">// value 属性，以 get 方式拦截</span>
  <span class="hljs-keyword">get</span> value(): <span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._value;
  };

  <span class="hljs-meta">@Input</span>() <span class="hljs-keyword">set</span> value(v: <span class="hljs-built_in">any</span>) {
    v = <span class="hljs-keyword">this</span>._convertValueForInputType(v);
    <span class="hljs-keyword">if</span> (v !== <span class="hljs-keyword">this</span>._value) {
      <span class="hljs-keyword">this</span>._value = v;
      <span class="hljs-comment">// 触发值改变事件，冒泡给父级</span>
      <span class="hljs-keyword">this</span>._onChangeCallback(v);
    }
  }

  <span class="hljs-comment">// 只读属性</span>
  <span class="hljs-keyword">get</span> focused() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._focused;
  }

  <span class="hljs-meta">@Input</span>()
  <span class="hljs-keyword">get</span> disabled(): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._disabled;
  }
  <span class="hljs-keyword">set</span> disabled(value) {
    <span class="hljs-keyword">this</span>._disabled = <span class="hljs-keyword">this</span>._coerceBooleanProperty(value);
  }

  <span class="hljs-meta">@Input</span>()
  <span class="hljs-keyword">get</span> readonly(): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._readonly;
  }
  <span class="hljs-keyword">set</span> readonly(value) {
    <span class="hljs-keyword">this</span>._readonly = <span class="hljs-keyword">this</span>._coerceBooleanProperty(value);
  }

  <span class="hljs-meta">@Input</span>()
  <span class="hljs-keyword">get</span> required(): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._required;
  }
  <span class="hljs-keyword">set</span> required(value) {
    <span class="hljs-keyword">this</span>._required = <span class="hljs-keyword">this</span>._coerceBooleanProperty(value);
  }
}</code></pre>
<p>回顾的我们前面的 <code>input-control.component.html</code> 文件，我们定义了 <code>type</code>、<code>name</code>、<code>placeholder</code>、<code>minlength</code>、<code>maxlength</code> 可读写的属性，同时还有 <code>value</code>、<code>readonly</code>、<code>disabled</code>、<code>required</code> 等只读属性。通过 <code>[属性]="源"</code> 方式，接收父级传入的数据。</p>
<p>OK，属性我们都知道如何从父级去接收了，那么接下来我们来实现 <strong>点击</strong> 操作： </p>
<p>我们先修改 <code>input-control.component.ts</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  ……
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  ……
  host: {
    <span class="hljs-comment">// 宿主元素 click 事件，触发 focus() 事件</span>
    <span class="hljs-string">'(click)'</span>: <span class="hljs-string">'focus()'</span>,
    <span class="hljs-comment">// 切换宿主元素 focus 样式</span>
    <span class="hljs-string">'[class.focus]'</span>: <span class="hljs-string">'focused'</span>
  }
})</code></pre>
<p>我们利用了 <code>host</code> 这个属性，用来给宿主元素对应操作，传送门 <a href="https://angular.cn/docs/ts/latest/api/core/index/Component-decorator.html" rel="nofollow noreferrer" target="_blank">@Component 相关属性</a>;<br>我们给宿主元素也就是 <code>&lt;input-control&gt;&lt;/input-control&gt;</code> 绑定了一个 <code>click</code> 事件，同时根据自身属性 <code>focused</code> 来切换一个 <code>.focus</code> 类。在我们组件的 <code>focus()</code> 事件中，我们需要让组件内部的 <code>input</code> 聚焦，同时切换自身的 <code>focused</code> 值。为了拿到我们组件内部的 <code>input</code> 元素，这里我们需要使用 <code>@ViewChild()</code>。</p>
<p>修改 <code>input-control.component.ts</code> 文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  ……
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  }
})
export class InputControlComponent {
  ……
  ……

  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @ViewChild('input') _inputElement: ElementRef; // 组件内部 input 元素
  @ViewChild('iconDelete') iconDelete: ElementRef; // 删除图标元素

  constructor(private hostRef: ElementRef) {
  }

  // 监听全局的点击事件，如果不是当前 input-control 组，则视为失去焦点操作
  @HostListener('window:click', ['$event'])
  inputControlBlurHandler(event) {
    var parent = event.target;
    // 如何当前节点不是宿主节点，并且不等于 document 节点
    while (parent &amp;&amp; parent != this.hostRef.nativeElement &amp;&amp; parent != document) {
      // 取当前节点的父节点继续寻找
      parent = parent.parentNode;
    }

    // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
    if (parent == document) {
      this._focused = false;
    }
  }

  // 宿主聚焦
  focus() {
    // 触发下面的 _handleFocus() 事件
    this._inputElement.nativeElement.focus();
  }

  // 输入框聚焦
  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  // 清空输入值
  _handleClear() {
    this.value = '';
    return false;
  }

  // 这里触发 blur 操作，但是不改变 this._focused 的值，
  // 不然删除图标无法实现它的功能，
  //设置 this._focused 的值将由上面的 @HostListener('window:click', ['$event']) 来处理
  // 触发父级的 blur 事件
  _handleBlur(event: any) {
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
  }

  // 对外暴露 focus 事件
  @Output('focus') onFocus = this._focusEmitter.asObservable();
  ……
  ……
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  ……
  host: {
    <span class="hljs-comment">// 宿主元素 click 事件，触发 focus() 事件</span>
    <span class="hljs-string">'(click)'</span>: <span class="hljs-string">'focus()'</span>,
    <span class="hljs-comment">// 切换宿主元素 focus 样式</span>
    <span class="hljs-string">'[class.focus]'</span>: <span class="hljs-string">'focused'</span>
  }
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> InputControlComponent {
  ……
  ……

  <span class="hljs-keyword">private</span> _focusEmitter: EventEmitter&lt;FocusEvent&gt; = <span class="hljs-keyword">new</span> EventEmitter&lt;FocusEvent&gt;();
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'input'</span>) _inputElement: ElementRef; <span class="hljs-comment">// 组件内部 input 元素</span>
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'iconDelete'</span>) iconDelete: ElementRef; <span class="hljs-comment">// 删除图标元素</span>

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> hostRef: ElementRef</span>) {
  }

  <span class="hljs-comment">// 监听全局的点击事件，如果不是当前 input-control 组，则视为失去焦点操作</span>
  <span class="hljs-meta">@HostListener</span>(<span class="hljs-string">'window:click'</span>, [<span class="hljs-string">'$event'</span>])
  inputControlBlurHandler(event) {
    <span class="hljs-keyword">var</span> parent = event.target;
    <span class="hljs-comment">// 如何当前节点不是宿主节点，并且不等于 document 节点</span>
    <span class="hljs-keyword">while</span> (parent &amp;&amp; parent != <span class="hljs-keyword">this</span>.hostRef.nativeElement &amp;&amp; parent != <span class="hljs-built_in">document</span>) {
      <span class="hljs-comment">// 取当前节点的父节点继续寻找</span>
      parent = parent.parentNode;
    }

    <span class="hljs-comment">// 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn</span>
    <span class="hljs-keyword">if</span> (parent == <span class="hljs-built_in">document</span>) {
      <span class="hljs-keyword">this</span>._focused = <span class="hljs-literal">false</span>;
    }
  }

  <span class="hljs-comment">// 宿主聚焦</span>
  focus() {
    <span class="hljs-comment">// 触发下面的 _handleFocus() 事件</span>
    <span class="hljs-keyword">this</span>._inputElement.nativeElement.focus();
  }

  <span class="hljs-comment">// 输入框聚焦</span>
  _handleFocus(event: FocusEvent) {
    <span class="hljs-keyword">this</span>._focused = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>._focusEmitter.emit(event);
  }

  <span class="hljs-comment">// 清空输入值</span>
  _handleClear() {
    <span class="hljs-keyword">this</span>.value = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// 这里触发 blur 操作，但是不改变 this._focused 的值，</span>
  <span class="hljs-comment">// 不然删除图标无法实现它的功能，</span>
  <span class="hljs-comment">//设置 this._focused 的值将由上面的 @HostListener('window:click', ['$event']) 来处理</span>
  <span class="hljs-comment">// 触发父级的 blur 事件</span>
  _handleBlur(event: <span class="hljs-built_in">any</span>) {
    <span class="hljs-keyword">this</span>._onTouchedCallback();
    <span class="hljs-keyword">this</span>._blurEmitter.emit(event);
  }

  <span class="hljs-comment">// 对外暴露 focus 事件</span>
  <span class="hljs-meta">@Output</span>(<span class="hljs-string">'focus'</span>) onFocus = <span class="hljs-keyword">this</span>._focusEmitter.asObservable();
  ……
  ……
}</code></pre>
<p>在上面的代码中，我们通过宿主的 <code>focus()</code> 事件，让 <code>input</code> 元素 <code>focus</code>, 同时 <code>input</code> 元素聚焦之后，会触发下面的 <code>_handleFocus()</code> 方法，在这个方法里面，我们修改组件自身的 <code>focused</code> 属性，并对外发射一个 <code>focus</code> 事件，用来向父级传递使用。同时，我们的删除图标也是根据组件的 <code>focused</code> 属性切换显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input #input
  [type]=&quot;type&quot;
  [name]=&quot;name&quot;
  (focus)=&quot;_handleFocus($event)&quot;
  (blur)=&quot;_handleBlur($event)&quot;
  [placeholder]=&quot;placeholder&quot;
  [(ngModel)]=&quot;value&quot;>
<i #iconDelete 
    *ngIf=&quot;focused &amp;&amp; !readonly&quot; 
    class=&quot;icon icon-delete&quot; 
    (click)=&quot;_handleClear($event)&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> #<span class="hljs-attr">input</span>
  [<span class="hljs-attr">type</span>]=<span class="hljs-string">"type"</span>
  [<span class="hljs-attr">name</span>]=<span class="hljs-string">"name"</span>
  (<span class="hljs-attr">focus</span>)=<span class="hljs-string">"_handleFocus($event)"</span>
  (<span class="hljs-attr">blur</span>)=<span class="hljs-string">"_handleBlur($event)"</span>
  [<span class="hljs-attr">placeholder</span>]=<span class="hljs-string">"placeholder"</span>
  [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"value"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span> #<span class="hljs-attr">iconDelete</span> 
    *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"focused &amp;&amp; !readonly"</span> 
    <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon-delete"</span> 
    (<span class="hljs-attr">click</span>)=<span class="hljs-string">"_handleClear($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre>
<p>我们的 <code>input</code> 和组件内部的 <code>value</code> 属性进行了双向绑定，所以在 <code>_handleClear</code> 之后，我们的输入框的值自然也就被清空了。</p>
<h3 id="articleHeader4">值访问器 <a href="https://angular.cn/docs/ts/latest/api/forms/index/ControlValueAccessor-interface.html" rel="nofollow noreferrer" target="_blank">ControlValueAccessor</a>
</h3>
<p>在完成上面的一些步骤之后，我们的组件基本功能完成了，但是接下来还有最重要的一部分内容，那就是让我们的自定义组件获得 <code>值访问</code> 权限。<br>在官方的文档中有提到一点 <a href="https://github.com/angular/material2/blob/master/src/lib/input/input.ts" rel="nofollow noreferrer" target="_blank">https://github.com/angular/material2/blob/master/src/lib/input/input.ts</a> </p>
<p><span class="img-wrap"><img data-src="/img/bVF4gG?w=1029&amp;h=446" src="https://static.alili.tech/img/bVF4gG?w=1029&amp;h=446" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>在查看官方的文档之后，我们发现要实现自定义组件的值访问权限，我们需要继承 <code>ControlValueAccessor</code> 接口，同时实现它内部的对应的接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 要实现双向数据绑定，这个不可少
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputControlComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'input-control',
  templateUrl: 'input-control.component.html',
  styleUrls: ['input-control.component.scss'],
  host: {
    // 宿主元素 click 事件，触发 focus() 事件
    '(click)': 'focus()',
    // 切换宿主元素 focus 样式
    '[class.focus]': 'focused'
  },
  // 
  encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputControlComponent implements ControlValueAccessor {
  ……
  ……
  /** Callback registered via registerOnTouched (ControlValueAccessor)
   * 此属性在做表单校验的时候，不可少，
   * 如果缺少了这个属性，FormControl.touched 属性将监测不到，切记！！
   */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  /**
   * Write a new value to the element.
   */
  writeValue(value: any) {
    this._value = value;
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  };

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
  ……
  ……
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// 要实现双向数据绑定，这个不可少</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INPUT_CONTROL_VALUE_ACCESSOR: <span class="hljs-built_in">any</span> = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> InputControlComponent),
  multi: <span class="hljs-literal">true</span>
};

<span class="hljs-keyword">const</span> noop = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
};

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'input-control'</span>,
  templateUrl: <span class="hljs-string">'input-control.component.html'</span>,
  styleUrls: [<span class="hljs-string">'input-control.component.scss'</span>],
  host: {
    <span class="hljs-comment">// 宿主元素 click 事件，触发 focus() 事件</span>
    <span class="hljs-string">'(click)'</span>: <span class="hljs-string">'focus()'</span>,
    <span class="hljs-comment">// 切换宿主元素 focus 样式</span>
    <span class="hljs-string">'[class.focus]'</span>: <span class="hljs-string">'focused'</span>
  },
  <span class="hljs-comment">// </span>
  encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> InputControlComponent <span class="hljs-keyword">implements</span> ControlValueAccessor {
  ……
  ……
  <span class="hljs-comment">/** Callback registered via registerOnTouched (ControlValueAccessor)
   * 此属性在做表单校验的时候，不可少，
   * 如果缺少了这个属性，FormControl.touched 属性将监测不到，切记！！
   */</span>
  <span class="hljs-keyword">private</span> _onTouchedCallback: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span> = noop;
  <span class="hljs-comment">/** Callback registered via registerOnChange (ControlValueAccessor) */</span>
  <span class="hljs-keyword">private</span> _onChangeCallback: <span class="hljs-function">(<span class="hljs-params">_: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span> = noop;

  <span class="hljs-comment">/**
   * Write a new value to the element.
   */</span>
  writeValue(value: <span class="hljs-built_in">any</span>) {
    <span class="hljs-keyword">this</span>._value = value;
  }

  <span class="hljs-comment">/**
   * Set the function to be called when the control receives a change event.
   */</span>
  registerOnChange(fn: <span class="hljs-built_in">any</span>) {
    <span class="hljs-keyword">this</span>._onChangeCallback = fn;
  };

  <span class="hljs-comment">/**
   * Set the function to be called when the control receives a touch event.
   */</span>
  registerOnTouched(fn: <span class="hljs-built_in">any</span>) {
    <span class="hljs-keyword">this</span>._onTouchedCallback = fn;
  }
  ……
  ……
}</code></pre>
<p>正如上面代码中所示的一样，实现了这些对应的接口之后，我们就能像使用普通的 <code>input</code> 元素一样使用我们的自定义组件了。</p>
<h3 id="articleHeader5">允许组件加载内部其它的 DOM 元素</h3>
<p>回顾我们前面文章开头的 GIF 图片，我们还有一个获取验证码的按钮，同时，我们的错误提示也是放在组件内部的。要支持这种形式的，我们需要在组件内部加上 <code>&lt;ng-content&gt;&lt;/ng-content&gt;</code> 标签<br>有了这个之后，所有包裹在 <code>&lt;input-control&gt;&lt;/input-control&gt;</code> 组件内部的元素都将被渲染到组件内部</p>
<p>父组件调用 <code>input-control</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input-control class=&quot;input-control sms-control&quot;
  [class.error]=&quot;!captcha.valid &amp;&amp; captcha.touched&quot;
  type=&quot;tel&quot;
  name=&quot;captcha&quot;
  placeholder=&quot;请输入验证码&quot;
  [formControl]=&quot;captcha&quot;
  maxlength=&quot;5&quot;>
  <count-down class=&quot;btn-send-sms&quot; counter=&quot;50&quot; title=&quot;获取验证码&quot; countText=&quot;秒后重新获取&quot;></count-down>
  <p *ngIf=&quot;!captcha.valid &amp;&amp; captcha.touched&quot; class=&quot;error-tips&quot;>请输入验证码</p>
</input-control>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input-control</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input-control sms-control"</span>
  [<span class="hljs-attr">class.error</span>]=<span class="hljs-string">"!captcha.valid &amp;&amp; captcha.touched"</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"tel"</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">"captcha"</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入验证码"</span>
  [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"captcha"</span>
  <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"5"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">count-down</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-send-sms"</span> <span class="hljs-attr">counter</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"获取验证码"</span> <span class="hljs-attr">countText</span>=<span class="hljs-string">"秒后重新获取"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">count-down</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"!captcha.valid &amp;&amp; captcha.touched"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"error-tips"</span>&gt;</span>请输入验证码<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">input-control</span>&gt;</span></code></pre>
<p>浏览器渲染之后的的 DOM 结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input-control class=&quot;input-control sms-control ng-untouched ng-pristine ng-invalid&quot; maxlength=&quot;5&quot; name=&quot;captcha&quot; placeholder=&quot;请输入验证码&quot; type=&quot;tel&quot; ng-reflect-maxlength=&quot;5&quot; ng-reflect-type=&quot;tel&quot; ng-reflect-name=&quot;captcha&quot; ng-reflect-placeholder=&quot;请输入验证码&quot; ng-reflect-form=&quot;[object Object]&quot;>
  <input ng-reflect-maxlength=&quot;5&quot; ng-reflect-name=&quot;captcha&quot; ng-reflect-type=&quot;tel&quot; type=&quot;tel&quot; ng-reflect-placeholder=&quot;请输入验证码&quot; placeholder=&quot;请输入验证码&quot; maxlength=&quot;5&quot; class=&quot;ng-untouched ng-pristine ng-valid&quot;>
<!--template bindings={
  &quot;ng-reflect-ng-if&quot;: null
}-->
  <count-down class=&quot;btn-send-sms&quot; counttext=&quot;秒后重新获取&quot; counter=&quot;50&quot; title=&quot;获取验证码&quot; ng-reflect-counter=&quot;50&quot; ng-reflect-title=&quot;获取验证码&quot; ng-reflect-count-text=&quot;秒后重新获取&quot;><button>获取验证码</button></count-down>
      <!--template bindings={
  &quot;ng-reflect-ng-if&quot;: null
}-->
</input-control>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input-control</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input-control sms-control ng-untouched ng-pristine ng-invalid"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"captcha"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入验证码"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"tel"</span> <span class="hljs-attr">ng-reflect-maxlength</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">ng-reflect-type</span>=<span class="hljs-string">"tel"</span> <span class="hljs-attr">ng-reflect-name</span>=<span class="hljs-string">"captcha"</span> <span class="hljs-attr">ng-reflect-placeholder</span>=<span class="hljs-string">"请输入验证码"</span> <span class="hljs-attr">ng-reflect-form</span>=<span class="hljs-string">"[object Object]"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ng-reflect-maxlength</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">ng-reflect-name</span>=<span class="hljs-string">"captcha"</span> <span class="hljs-attr">ng-reflect-type</span>=<span class="hljs-string">"tel"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"tel"</span> <span class="hljs-attr">ng-reflect-placeholder</span>=<span class="hljs-string">"请输入验证码"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入验证码"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-untouched ng-pristine ng-valid"</span>&gt;</span>
<span class="hljs-comment">&lt;!--template bindings={
  "ng-reflect-ng-if": null
}--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">count-down</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-send-sms"</span> <span class="hljs-attr">counttext</span>=<span class="hljs-string">"秒后重新获取"</span> <span class="hljs-attr">counter</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"获取验证码"</span> <span class="hljs-attr">ng-reflect-counter</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">ng-reflect-title</span>=<span class="hljs-string">"获取验证码"</span> <span class="hljs-attr">ng-reflect-count-text</span>=<span class="hljs-string">"秒后重新获取"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>获取验证码<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">count-down</span>&gt;</span>
      <span class="hljs-comment">&lt;!--template bindings={
  "ng-reflect-ng-if": null
}--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">input-control</span>&gt;</span></code></pre>
<h3 id="articleHeader6">与 FormControl 结合使用注意事项</h3>
<p>在后期的时候，我整合了自定输入组件与 <code>FormControl</code> 一起使用，在使用过程中，发现在需要使用 <code>.touched</code> 特性的时候，发现无法生效，通过查资料发现，如果需要让这个特性生性，我们的输入组件必须监听 <code>blur</code> 事件并且在处理事件中调用触发对外的 blur 事件，具体代码见前面的 <code>_handleBlur()</code> 内容。   <br><br><br>完整 Demo 地址：<a href="https://github.com/lichenbuliren/mcare-app" rel="nofollow noreferrer" target="_blank">mcare-app</a> <br>这个 Demo 里面整合了路由、子模块、服务、动态表单等特性的使用方法，有兴趣的可以参考下，还在持续完善中。这个 Demo 是参照自己做过的项目部分UI，当然不会涉及核心的业务代码：）。</p>
<h2 id="articleHeader7">参考资料</h2>
<p><a href="https://github.com/angular/material2/blob/master/src/lib/input/input.ts" rel="nofollow noreferrer" target="_blank">Angular2 material2 官方UI库</a><br><a href="http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html" rel="nofollow noreferrer" target="_blank">CUSTOM FORM CONTROLS IN ANGULAR 2</a><br><a href="http://stackoverflow.com/questions/38447681/touched-untouched-not-updating-in-custom-input-component-angular-2" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/38447681/touched-untouched-not-updating-in-custom-input-component-angular-2</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
构建一个自定义 angular2 输入组件

## 原文链接
[https://segmentfault.com/a/1190000007603861](https://segmentfault.com/a/1190000007603861)

