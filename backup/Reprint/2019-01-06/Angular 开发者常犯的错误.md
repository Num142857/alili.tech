---
title: 'Angular 开发者常犯的错误' 
date: 2019-01-06 2:30:10
hidden: true
slug: fd5iyba4a4u
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<p>本文基于 <a href="https://hackernoon.com/top-common-mistakes-of-angular-developers-2a36524f2c21" rel="nofollow noreferrer" target="_blank">Top Common Mistakes of Angular Developers</a>  这篇文章的内容进行整理和扩展，建议有兴趣的读者直接阅读原文。如果你刚接触 Angular，也可以参考一下 <a href="https://github.com/semlinker/angular-faq" rel="nofollow noreferrer" target="_blank">Angular 常见问题汇总</a> 这篇文章。</p>
<h3 id="articleHeader0">Angular vs Angular 2 vs Angular 4</h3>
<p>Angular 1.x 版本统称为 AngularJS，Angular 2+ (4/5) 统称为 Angular。</p>
<p>第三方库的命名也有一定的规则。假设早期版本的命名以 <code>ng-</code> 作为前缀，当 Angular 2 发布后，该库名称会使用 <code>ng2-</code> 作为前缀。但当 Angular 4 发布以后，新的命名规则就随之出现了。新的术语是使用 <code>ngx-</code> 作为前缀，因为 Angular 使用语义版本，每六个月会发布一个新版本。因此，举个例子，当我们把 <code>ng2-bootstrap</code> 更名为 <code>ngx-bootstrap</code> 后，今后就不需要再频繁更换库的名称了。</p>
<h3 id="articleHeader1">ngOnChanges vs ngDoCheck</h3>
<p>AngularJS 使用 <code>watcher</code> 和 <code>listener</code> 的概念。watcher 是一个函数，返回被监测的值。通常情况下，这些值是对象模型的属性值。但也不总是数据模型的属性 - 我们可以跟踪组件的状态、计算新值等。如果该函数返回的值与前一次的值不一样，Angular 就会调用 <code>listener</code>，通常它用来更新 UI 状态。</p>
<p>Angular 移除了 <code>watch</code> 和 <code>scope</code>，现在我们将使用组件的输入属性。除此之外，Angular 为我们提供了 <code>ngOnChanges</code> 生命周期钩子。为了提高变化检测的性能，对于对象比较，Angular 内部直接使用 <code>===</code> 运算符进行值比较。因此当输入属性是引用类型，当改变对象内部属性时，是不会调用 <code>ngOnChanges</code> 生命周期钩子的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// JS has NaN !== NaN
export function looseIdentical(a: any, b: any): boolean {
  return a === b || typeof a === 'number' &amp;&amp; typeof b === 'number'
    &amp;&amp; isNaN(a) &amp;&amp; isNaN(b);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// JS has NaN !== NaN</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">looseIdentical</span>(<span class="hljs-params">a: any, b: any</span>): <span class="hljs-title">boolean</span> </span>{
  <span class="hljs-keyword">return</span> a === b || <span class="hljs-keyword">typeof</span> a === <span class="hljs-string">'number'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> b === <span class="hljs-string">'number'</span>
    &amp;&amp; <span class="hljs-built_in">isNaN</span>(a) &amp;&amp; <span class="hljs-built_in">isNaN</span>(b);
}</code></pre>
<p>许多开发人员不知道这一点，陷入这个陷阱。为了解决这个问题，有各种解决方案：</p>
<ul>
<li>使用 <code>ngDoCheck</code> 生命周期钩子</li>
<li>使用不可变的数据结构</li>
<li>把输入对象拆分为多个输入 (即不是直接传递引用对象，而是把内部属性抽离成独立的字段)</li>
<li>使用 <code>subscriptions</code>
</li>
</ul>
<p>使用 <code>ngDoCheck</code> 生命周期挂钩是解决此问题的常用方法。当变化检测运行时会自动调用此钩子。在使用此生命周期钩子时，你要小心控制该钩子的内部逻辑，因为通常每分钟会触发多次变化检测 (可以参考下面的源码)。</p>
<blockquote>
<code>ngStyle</code> 指令内部也实现了 <code>DoCheck</code> 接口，然后利用 <code>KeyValueDiffer</code> 对象来检测对象的变化 (如内部属性的新增、修改、移除操作)。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// packages/core/src/view/provider.ts
// 变化检测: 
// checkAndUpdateView -> Services.updateDirectives(view, CheckType.CheckAndUpdate)
function checkAndUpdateDirectiveInline(
    view: ViewData, 
    def: NodeDef, 
    v0: any, v1: any, v2: any,
    v3: any, v4: any, v5: any, 
    v6: any, v7: any, v8: any, 
    v9: any): boolean {
  const providerData = asProviderData(view, def.index);
  const directive = providerData.instance;
  let changed = false;
  let changes: SimpleChanges = undefined !;
  const bindLen = def.bindings.length;
  // 判断输入属性值是否改变，若发生改变则更新changes对象相应的属性。 
  if (bindLen > 0 &amp;&amp; checkBinding(view, def, 0, v0)) {
    changed = true;
    changes = updateProp(view, providerData, def, 0, v0, changes);
  }
  // ...
  if (bindLen > 9 &amp;&amp; checkBinding(view, def, 9, v9)) {
    changed = true;
    changes = updateProp(view, providerData, def, 9, v9, changes);
  }
  // 若输入属性发生变化才会调用ngOnChanges生命周期钩子
  if (changes) {
    directive.ngOnChanges(changes);
  }
  // 若首次执行变化检测及实现OnInit生命周期钩子，则调用ngOnInit生命周期钩子 
  if ((view.state &amp; ViewState.FirstCheck) &amp;&amp; (def.flags &amp; NodeFlags.OnInit)) {
    directive.ngOnInit();
  }
  // 若实现DoCheck接口，则调用ngDoCheck生命周期钩子
  if (def.flags &amp; NodeFlags.DoCheck) {
    directive.ngDoCheck();
  }
  return changed; // 返回SimpleChanges对象
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// packages/core/src/view/provider.ts</span>
<span class="hljs-comment">// 变化检测: </span>
<span class="hljs-comment">// checkAndUpdateView -&gt; Services.updateDirectives(view, CheckType.CheckAndUpdate)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkAndUpdateDirectiveInline</span>(<span class="hljs-params">
    view: ViewData, 
    def: NodeDef, 
    v0: <span class="hljs-built_in">any</span>, v1: <span class="hljs-built_in">any</span>, v2: <span class="hljs-built_in">any</span>,
    v3: <span class="hljs-built_in">any</span>, v4: <span class="hljs-built_in">any</span>, v5: <span class="hljs-built_in">any</span>, 
    v6: <span class="hljs-built_in">any</span>, v7: <span class="hljs-built_in">any</span>, v8: <span class="hljs-built_in">any</span>, 
    v9: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">boolean</span> </span>{
  <span class="hljs-keyword">const</span> providerData = asProviderData(view, def.index);
  <span class="hljs-keyword">const</span> directive = providerData.instance;
  <span class="hljs-keyword">let</span> changed = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">let</span> changes: SimpleChanges = <span class="hljs-literal">undefined</span> !;
  <span class="hljs-keyword">const</span> bindLen = def.bindings.length;
  <span class="hljs-comment">// 判断输入属性值是否改变，若发生改变则更新changes对象相应的属性。 </span>
  <span class="hljs-keyword">if</span> (bindLen &gt; <span class="hljs-number">0</span> &amp;&amp; checkBinding(view, def, <span class="hljs-number">0</span>, v0)) {
    changed = <span class="hljs-literal">true</span>;
    changes = updateProp(view, providerData, def, <span class="hljs-number">0</span>, v0, changes);
  }
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">if</span> (bindLen &gt; <span class="hljs-number">9</span> &amp;&amp; checkBinding(view, def, <span class="hljs-number">9</span>, v9)) {
    changed = <span class="hljs-literal">true</span>;
    changes = updateProp(view, providerData, def, <span class="hljs-number">9</span>, v9, changes);
  }
  <span class="hljs-comment">// 若输入属性发生变化才会调用ngOnChanges生命周期钩子</span>
  <span class="hljs-keyword">if</span> (changes) {
    directive.ngOnChanges(changes);
  }
  <span class="hljs-comment">// 若首次执行变化检测及实现OnInit生命周期钩子，则调用ngOnInit生命周期钩子 </span>
  <span class="hljs-keyword">if</span> ((view.state &amp; ViewState.FirstCheck) &amp;&amp; (def.flags &amp; NodeFlags.OnInit)) {
    directive.ngOnInit();
  }
  <span class="hljs-comment">// 若实现DoCheck接口，则调用ngDoCheck生命周期钩子</span>
  <span class="hljs-keyword">if</span> (def.flags &amp; NodeFlags.DoCheck) {
    directive.ngDoCheck();
  }
  <span class="hljs-keyword">return</span> changed; <span class="hljs-comment">// 返回SimpleChanges对象</span>
}</code></pre>
<h3 id="articleHeader2">未及时释放资源</h3>
<p>你可能知道当你订阅 Observable 对象或设置事件监听时，在某个时间点，你需要执行取消订阅操作，进而释放操作系统的内存。否则，你的应用程序可能会出现内存泄露。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({ ... })
export class HeroComponent implements OnInit, OnDestroy {
  heroForm: FormGroup;
  valueChanges$: Observable;

  ngOnInit() {
    this.valueChanges$ = this.heroForm.valueChanges.subscribe(...);
  }

  ngOnDestroy() {
    this.valueChanges$.unsubscribe();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({ ... })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroComponent <span class="hljs-keyword">implements</span> OnInit, OnDestroy {
  heroForm: FormGroup;
  valueChanges$: Observable;

  ngOnInit() {
    <span class="hljs-keyword">this</span>.valueChanges$ = <span class="hljs-keyword">this</span>.heroForm.valueChanges.subscribe(...);
  }

  ngOnDestroy() {
    <span class="hljs-keyword">this</span>.valueChanges$.unsubscribe();
  }
}</code></pre>
<p>大多数情况下，当你在组件类中执行订阅操作，你可以在 <code>ngOnDestroy</code> 生命周期钩子中，执行取消订阅的操作。</p>
<h3 id="articleHeader3">额外取消订阅操作</h3>
<p>上面介绍了在某些场景下需要手动执行取消订阅操作，进而释放相应的资源。但有些场景下，无需我们开发者手动执行额外的取消订阅操作。因为在这些场景下，Angular 内部会自动执行取消订阅操作。比如，使用 <code>async</code> 的场景：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'heroes-garden',
  template: `<hero [hero]=&quot;heroes$ | async&quot;></todos>`
})
export class HeroesGardenComponent implements OnInit, OnDestroy {
  heroesChanged$: Observable;

  ngOnInit() {
    this.heroesChanged$ = this.store.select('heroes');
  }

  ngOnDestroy() {
    this.heroesChanged$.unsubscribe();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'heroes-garden'</span>,
  template: <span class="hljs-string">`&lt;hero [hero]="heroes$ | async"&gt;&lt;/todos&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroesGardenComponent <span class="hljs-keyword">implements</span> OnInit, OnDestroy {
  heroesChanged$: Observable;

  ngOnInit() {
    <span class="hljs-keyword">this</span>.heroesChanged$ = <span class="hljs-keyword">this</span>.store.select(<span class="hljs-string">'heroes'</span>);
  }

  ngOnDestroy() {
    <span class="hljs-keyword">this</span>.heroesChanged$.unsubscribe();
  }
}</code></pre>
<p>除了使用 <code>async</code> 的场景外，还有以下场景会自动取消订阅：</p>
<ul>
<li>Observer.timer(1000).subscribe(...)</li>
<li>http.get('<a href="https://segmentfault.com/u/">https://segmentfault.com/u/</a>').subscribe(...)</li>
<li>RxJS 中的 take()、takeWhile()、first() 等操作符</li>
</ul>
<p>若想进一步了解手动释放资源和自动释放资源的场景，可以参考专栏 <a href="https://segmentfault.com/a/1190000010104703" target="_blank">Angular 中何时取消订阅</a> 这篇文章。</p>
<h3 id="articleHeader4">@Component.providers vs @NgModule.providers</h3>
<p>分层依赖注入作为 Angular 的新机制的一部分，让我们可以灵活地控制依赖注入。在 AngularJS 中，服务都是单例的，而 Angular 2.x 以上的版本，我们可以多次实例化一个服务。</p>
<p>假设我们已经定义了一个 <code>HeroesService</code> 服务，用来获取英雄信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Injectable()
export class HeroesService {
  heroes: Hero[] = [];
  
  constructor(private http: Http) {
    this.http.get('http://give-me-heroes.com')
      .map(res => res.json())
      .subscribe((heroes: Hero[]) => {
         this.heroes = heroes;
    });
  }

  getHeroes() {
    return this.heroes;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroesService {
  heroes: Hero[] = [];
  
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) {
    <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">'http://give-me-heroes.com'</span>)
      .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .subscribe(<span class="hljs-function">(<span class="hljs-params">heroes: Hero[]</span>) =&gt;</span> {
         <span class="hljs-keyword">this</span>.heroes = heroes;
    });
  }

  getHeroes() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.heroes;
  }
}</code></pre>
<p>正如你所见，我们在构造函数中获取英雄的数据，此外我们定义了 <code>getHeroes()</code> 方法，用来获取英雄信息。</p>
<p>现在我们来使用刚创建的 <code>HeroesService</code> 服务：</p>
<ul><li>在组件中声明服务</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'hero',
  template: '...',
  providers: [HeroesService]
})
export class HeroComponent {
  constructor(private heroesService: HeroesService) {}
}

@NgModule({
  declarations: [HeroComponent]
}
export class HeroesModule { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'hero'</span>,
  template: <span class="hljs-string">'...'</span>,
  providers: [HeroesService]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> heroesService: HeroesService</span>) {}
}

<span class="hljs-meta">@NgModule</span>({
  declarations: [HeroComponent]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroesModule { ... }</code></pre>
<p>在 <code>HeroComponent </code> 中，我们在 <code>@Component.providers</code> 数组中声明 <code>HeroesService</code> 服务，然后在 <code>HeroComponent</code> 组件类的构造函数中注入该服务。使用这种方式会有问题，每当实例化新的 <code>HeroComponent</code> 组件时，都会创建一个新的 <code>HeroService</code> 实例，这会导致发送多次 Http 请求。</p>
<p>解决上述问题的一种方案是在 <code>@NgModule.providers</code> 中声明服务。</p>
<ul><li>在模块中声明服务</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'hero',
  template: '...'
})
export class HeroComponent {
  constructor(private heroesService: HeroesService) {}
}

@NgModule({
  declarations: [HeroComponent],
  providers: [HeroesService]
}
export class HeroesModule { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'hero'</span>,
  template: <span class="hljs-string">'...'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> heroesService: HeroesService</span>) {}
}

<span class="hljs-meta">@NgModule</span>({
  declarations: [HeroComponent],
  providers: [HeroesService]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroesModule { ... }</code></pre>
<p>采用这种方式的话，对于多个 <code>HeroComponent</code> 组件，<code>HeroesService</code> 服务只会被实例化一次。因为，当在模块中声明 <code>provider</code> ，它所相关的依赖对象，将是单例的，其它的模块都能够使用它。我们不需要通过 <code>@NgModule.exports</code> 数组来导出对应的 <code>provider</code>，它会被自动导出。</p>
<h3 id="articleHeader5">直接操作 DOM</h3>
<p>Angular 不再是简单的 Web 框架，Angular 是一个平台，它的一个优点是允许我们将应用程序代码与渲染器分离，从而编写可以在浏览器、服务器上运行的应用程序，甚至可以编写原生应用。</p>
<p>此外解耦后，也为我们提供更多的能力，如使用 AOT (Ahead of time) 或 Web Worker。AOT 意味着在构建阶段进行模板编译，AOT 编译模式的开发流程：</p>
<ul>
<li>使用 TypeScript 开发 Angular 应用</li>
<li>
<p>运行 ngc 编译应用程序</p>
<ul>
<li>使用 Angular Compiler 编译模板，一般输出 TypeScript 代码</li>
<li>运行 tsc 编译 TypeScript 代码</li>
</ul>
</li>
<li>使用 Webpack 或 Gulp 等其他工具构建项目，如代码压缩、合并等</li>
<li>部署应用</li>
</ul>
<p>除此之外 AOT 还有以下优点：</p>
<ul>
<li>在客户端我们不需要导入体积庞大的 angular 编译器，这样可以减少我们 JavaScript 脚本库的大小</li>
<li>使用 AOT 编译后的应用，不再包含任何 HTML 片段，取而代之的是编译生成的 TypeScript 代码，这样的话 TypeScript 编译器就能提前发现错误。总而言之，采用 AOT 编译模式，我们的模板是类型安全的。</li>
</ul>
<p>如果我们现在或将来要使用这种功能，我们需要遵守一定的规则。其中一个规则是不能使用 jQuery，document 对象或 ElementRef.nativeElement 来直接操作 DOM。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({ ... })
export class HeroComponent {
  constructor(private _elementRef: ElementRef) {}

  doBadThings() {
    $('.bad-with-jquery').click();
    this._elementRef.nativeElement.xyz = 'bad with native element';
    document.getElementById('bad-with-document');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({ ... })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> _elementRef: ElementRef</span>) {}

  doBadThings() {
    $(<span class="hljs-string">'.bad-with-jquery'</span>).click();
    <span class="hljs-keyword">this</span>._elementRef.nativeElement.xyz = <span class="hljs-string">'bad with native element'</span>;
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'bad-with-document'</span>);
  }
}</code></pre>
<p>如你所见，<code>doBadThings()</code> 方法中有三行代码，这三行代码演示了直接操作 DOM 的三种方式。在 Angular 中我们推荐通过 <code>Renderer2</code> 服务执行 DOM 操作 (Angular 2 中使用 Renderer)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({ ... })
export class HeroComponent {
  constructor(
    private _renderer2: Renderer2,
    private _elementRef: ElementRef) {}

  doGoodThings() {
    this._renderer2.setElementProperty(this._elementRef,
      'some-property', true);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({ ... })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> _renderer2: Renderer2,
    <span class="hljs-keyword">private</span> _elementRef: ElementRef</span>) {}

  doGoodThings() {
    <span class="hljs-keyword">this</span>._renderer2.setElementProperty(<span class="hljs-keyword">this</span>._elementRef,
      <span class="hljs-string">'some-property'</span>, <span class="hljs-literal">true</span>);
  }
}</code></pre>
<p>上面代码中，我们通过依赖注入方式注入 <code>Renderer2</code> 和 <code>ElementRef</code> 实例，然后在 <code>doGoodThings()</code> 方法中调用 <code>Renderer2</code> 实例提供的 <code>setElementProperty()</code> 方法来设置元素的属性。 此外，为了方便开发者获取视图中的元素，Angular 为我们提供了 <code>@ViewChild</code>、<code>@ViewChildren</code>、<code>@ContentChild</code> 和 <code>@ContentChildren</code> 等装饰器。</p>
<p>渲染器是视图层的封装。当我们在浏览器中时，将使用默认渲染器。当应用程序在不同平台 (如 WebWorker ) 上运行时，渲染器将被替换为平台对应的渲染器。此渲染器需要实现 <code>Renderer2</code> 抽象类，并利用 DI (依赖注入) 机制作为默认的 Renderer 对象注入到组件或服务中。</p>
<p>若想深入了解 Angular 渲染器，可以参考专栏 <a href="https://segmentfault.com/a/1190000010326100">Angular Renderer (渲染器)</a> 这篇文章。</p>
<h3 id="articleHeader6">多次声明同一个组件</h3>
<p>组件是 Angular 应用程序中的常见构建块。每个组件都需要在 <code>@NgModule.declarations</code> 数组中声明，才能够使用。</p>
<p>在 Angular 中是不允许在多个模块中声明同一个组件，如果一个组件在多个模块中声明的话，那么 Angular 编译器将会抛出异常。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'hero',
  template: '...',
})
export class HeroComponent { ... }

@NgModule({
  declarations: [HeroComponent]
}
export class HeroesModule { ... }

@NgModule({
  declarations: [HeroComponent]
}
export class AnotherModule { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'hero'</span>,
  template: <span class="hljs-string">'...'</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroComponent { ... }

<span class="hljs-meta">@NgModule</span>({
  declarations: [HeroComponent]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroesModule { ... }

<span class="hljs-meta">@NgModule</span>({
  declarations: [HeroComponent]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AnotherModule { ... }</code></pre>
<p>如你所见，<code>HeroComponent</code> 组件在 HeroesModule 以及 AnotherModule 中进行声明。在多个模块中使用同一个组件是允许的。但当这种情况发生时，我们应该考虑模块之间的关系是什么。如果一个模块作为另一个模块的子模块，那么针对上面的场景解决方案将是：</p>
<ul>
<li>在子模块的 <code>@NgModule.declaration</code> 中声明 <code>HeroComponent</code> 组件</li>
<li>通过子模块的 <code>@NgModule.exports</code> 数组中导出该组件</li>
<li>在父模块的 <code>@NgModule.imports</code> 数组中导入子模块</li>
</ul>
<p>而对于其它情况，我们可以创建一个新的模块，如 <code>SharedModule</code>  模块。具体步骤如下：</p>
<ul>
<li>在 SharedModule 中声明和导出 HeroComponent</li>
<li>在需要使用 HeroComponent 的模块中导入 SharedModule</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NgModule({
  declarations: [HeroComponent],
  exports: [HeroComponent]
}
export class SharedModule { ... }

NgModule({
  imports: [SharedModule]
}
export class HeroesModule { ... }

@NgModule({
  imports: [SharedModule]
}
export class AnotherModule { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">NgModule({
  declarations: [HeroComponent],
  exports: [HeroComponent]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SharedModule { ... }

NgModule({
  imports: [SharedModule]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroesModule { ... }

<span class="hljs-meta">@NgModule</span>({
  imports: [SharedModule]
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AnotherModule { ... }</code></pre>
<h2 id="articleHeader7">参考资源</h2>
<ul><li><a href="https://hackernoon.com/top-common-mistakes-of-angular-developers-2a36524f2c21" rel="nofollow noreferrer" target="_blank">top-common-mistakes-of-angular-developers</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 开发者常犯的错误

## 原文链接
[https://segmentfault.com/a/1190000010438679](https://segmentfault.com/a/1190000010438679)

