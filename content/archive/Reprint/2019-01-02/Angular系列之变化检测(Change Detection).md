---
title: 'Angular系列之变化检测(Change Detection)' 
date: 2019-01-02 2:30:09
hidden: true
slug: zvnv3kt7ylj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">概述</h1>
<blockquote><p>简单来说变化检测就是<code>Angular</code>用来检测视图与模型之间绑定的值是否发生了改变，当检测到模型中绑定的值发生改变时，则同步到视图上，反之，当检测到视图上绑定的值发生改变时，则回调对应的绑定函数。</p></blockquote>
<h1 id="articleHeader1">什么情况下会引起变化检测？</h1>
<p>总结起来, 主要有如下几种情况可能也改变数据：</p>
<ul>
<li>用户输入操作，比如点击，提交等</li>
<li>请求服务端数据(XHR)</li>
<li>定时事件，比如<code>setTimeout</code>，<code>setInterval</code>
</li>
</ul>
<p>上述三种情况都有一个共同点，即这些导致绑定值发生改变的事件都是异步发生的。如果这些异步的事件在发生时能够通知到<code>Angular</code>框架，那么<code>Angular</code>框架就能及时的检测到变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVT0qO?w=663&amp;h=291" src="https://static.alili.tech/img/bVT0qO?w=663&amp;h=291" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>左边表示将要运行的代码，这里的<code>stack</code>表示<code>Javascript</code>的运行栈，而<code>webApi</code>则是浏览器中提供的一些<code>Javascript</code>的<code>API</code>，<code>TaskQueue</code>表示<code>Javascript</code>中任务队列，因为<code>Javascript</code>是单线程的，异步任务在任务队列中执行。</p>
<p>具体来说，异步执行的运行机制如下:</p>
<ol>
<li>所有同步任务都在主线程上执行，形成一个执行栈（<code>execution context stack</code>）。</li>
<li>主线程之外，还存在一个"任务队列"（<code>task queue</code>）。只要异步任务有了运行结果，就在"任务队列"之        中放置一个事件。</li>
<li>一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。</li>
<li>主线程不断重复上面的第三步。</li>
</ol>
<p>当上述代码在<code>Javascript</code>中执行时，首先<code>func1</code> 进入运行栈，<code>func1</code>执行完毕后，<code>setTimeout</code>进入运行栈，执行<code>setTimeout</code>过程中将回调函数<code>cb</code> 加入到任务队列，然后<code>setTimeout</code>出栈，接着执行<code>func2</code>函数，<code>func2</code>函数执行完毕时，运行栈为空，接着任务队列中<code>cb</code> 进入运行栈得到执行。可以看出异步任务首先会进入任务队列，当运行栈中的同步任务都执行完毕时，异步任务进入运行栈得到执行。如果这些异步的任务执行前与执行后能提供一些钩子函数，通过这些钩子函数，<code>Angular</code>便能获知异步任务的执行。</p>
<h1 id="articleHeader2">angular2 获取变化通知</h1>
<p>那么问题来了，<code>angular2</code>是如何知道数据发生了改变？又是如何知道需要修改DOM的位置，准确的最小范围的修改DOM呢？没错，尽可能小的范围修改DOM，因为操作DOM对于性能来说可是一件奢侈品。</p>
<p>在<code>AngularJS</code>中是由代码<code>$scope.$apply()</code>或者<code>$scope.$digest</code>触发，而<code>Angular</code>接入了<code>ZoneJS</code>，由它监听了<code>Angular</code>所有的异步事件。</p>
<p><code>ZoneJS</code>是怎么做到的呢？</p>
<p>实际上Zone有一个叫猴子补丁的东西。在<code>Zone.js</code>运行时，就会为这些异步事件做一层代理包裹，也就是说Zone.js运行后，调用<code>setTimeout、addEventListener</code>等浏览器异步事件时，不再是调用原生的方法，而是被猴子补丁包装过后的代理方法。代理里setup了钩子函数, 通过这些钩子函数, 可以方便的进入异步任务执行的上下文.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//以下是Zone.js启动时执行逻辑的抽象代码片段
function zoneAwareAddEventListener() {...}
function zoneAwareRemoveEventListener() {...}
function zoneAwarePromise() {...}
function patchTimeout() {...}
window.prototype.addEventListener=zoneAwareAddEventListener;
window.prototype.removeEventListener=zoneAwareRemoveEventListener;
window.prototype.promise = zoneAwarePromise;
window.prototype.setTimeout = patchTimeout;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//以下是Zone.js启动时执行逻辑的抽象代码片段</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoneAwareAddEventListener</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoneAwareRemoveEventListener</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoneAwarePromise</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchTimeout</span>(<span class="hljs-params"></span>) </span>{...}
<span class="hljs-built_in">window</span>.prototype.addEventListener=zoneAwareAddEventListener;
<span class="hljs-built_in">window</span>.prototype.removeEventListener=zoneAwareRemoveEventListener;
<span class="hljs-built_in">window</span>.prototype.promise = zoneAwarePromise;
<span class="hljs-built_in">window</span>.prototype.setTimeout = patchTimeout;</code></pre>
<h1 id="articleHeader3">变化检测的过程</h1>
<p><code>Angular</code>的核心是组件化，组件的嵌套会使得最终形成一棵组件树。Angular的变化检测可以分组件进行，每一个<code>Component</code>都对应有一个changeDetector，我们可以在Component中通过依赖注入来获取到<code>changeDetector</code>。而我们的多个<code>Component</code>是一个树状结构的组织，由于一个Component对应一个<code>changeDetector</code>，那么<code>changeDetector</code>之间同样是一个树状结构的组织.</p>
<p>另外，Angular的数据流是自顶而下，从父组件到子组件单向流动。单向数据流向保证了高效、可预测的变化检测。尽管检查了父组件之后，子组件可能会改变父组件的数据使得父组件需要再次被检查，这是不被推荐的数据处理方式。在开发模式下，Angular会进行二次检查，如果出现上述情况，二次检查就会报错：<code>Expression Changed After It Has Been Checked Error</code>。而在生产环境中，脏检查只会执行一次。</p>
<p>相比之下，<code>AngularJS</code>采用的是双向数据流，错综复杂的数据流使得它不得不多次检查，使得数据最终趋向稳定。理论上，数据可能永远不稳定。<code>AngularJS</code>给出的策略是，脏检查超过10次，就认为程序有问题，不再进行检查。</p>
<p><span class="img-wrap"><img data-src="/img/bVT00z?w=600&amp;h=450" src="https://static.alili.tech/img/bVT00z?w=600&amp;h=450" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">变化检测策略</h1>
<blockquote><p>Angular有两种变化检测策略。<code>Default</code>是Angular默认的变化检测策略，也就是上述提到的脏检查,只要有值发生变化，就全部从父组件到所有子组件进行检查,。另一种更加高效的变化检测方式：<code>OnPush</code>。OnPush策略，<strong>就是只有当输入数据(即@Input)的引用发生变化或者有事件触发时，组件才进行变化检测。</strong></p></blockquote>
<h2 id="articleHeader5">defalut 策略</h2>
<p>main.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-root',
  template: `
  <h1>变更检测策略</h1>
  <p>"{{" slogan "}}"</p>
  <button type=&quot;button&quot; (click)=&quot;changeStar()&quot;>  改变明星属性
  </button>
  <button type=&quot;button&quot; (click)=&quot;changeStarObject()&quot;>
     改变明星对象
  </button>
  <movie [title]=&quot;title&quot; [star]=&quot;star&quot;></movie>`,
})
export class AppComponent {
  slogan: string = 'change detection';
  title: string = 'default 策略';
  star: Star = new Star('周', '杰伦');
  changeStar() {
    this.star.firstName = '吴';
    this.star.lastName = '彦祖';
  }
  changeStarObject() {
    this.star = new Star('刘', '德华');
  }
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>@Component({
  selector: <span class="hljs-string">'app-root'</span>,
  template: `<span class="javascript">
  &lt;h1&gt;变更检测策略&lt;<span class="hljs-regexp">/h1&gt;
  &lt;p&gt;"{{" slogan "}}"&lt;/</span>p&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"changeStar()"</span>&gt;</span>  改变明星属性
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  &lt;button type=<span class="hljs-string">"button"</span> (click)=<span class="hljs-string">"changeStarObject()"</span>&gt;
     改变明星对象
  &lt;<span class="hljs-regexp">/button&gt;
  &lt;movie [title]="title" [star]="star"&gt;&lt;/m</span>ovie&gt;</span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>
  slogan: string = <span class="hljs-string">'change detection'</span>;
  title: string = <span class="hljs-string">'default 策略'</span>;
  star: Star = <span class="hljs-keyword">new</span> Star(<span class="hljs-string">'周'</span>, <span class="hljs-string">'杰伦'</span>);
  changeStar() {
    <span class="hljs-keyword">this</span>.star.firstName = <span class="hljs-string">'吴'</span>;
    <span class="hljs-keyword">this</span>.star.lastName = <span class="hljs-string">'彦祖'</span>;
  }
  changeStarObject() {
    <span class="hljs-keyword">this</span>.star = <span class="hljs-keyword">new</span> Star(<span class="hljs-string">'刘'</span>, <span class="hljs-string">'德华'</span>);
  }
  
}</code></pre>
<p>movie.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
<div>
<h3>"{{" title "}}"</h3>
<p>
<label>Star:</label>
<span>"{{"star.firstName"}}" "{{"star.lastName"}}"</span>
</p>
</div>`,

})
export class MovieComponent {
  @Input() title: string;
  @Input() star;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>@Component({
  selector: <span class="hljs-string">'movie'</span>,
  styles: [<span class="hljs-string">'div {border: 1px solid black}'</span>],
  template: `<span class="javascript">
&lt;div&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>"{{" title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
&lt;p&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Star:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></span>
&lt;span&gt;"{{"star.firstName"}}" "{{"star.lastName"}}"&lt;<span class="hljs-regexp">/span&gt;
&lt;/</span>p&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></span>`,

})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MovieComponent</span> {</span>
  @Input() title: string;
  @Input() star;

}</code></pre>
<p>上面代码中, 当点击第一个按钮改变明星属性时,依次对<code>slogan</code>, <code>title</code>, <code>star</code>三个属性进行检测, 此时三个属性都没有变化, <code>star</code>没有发生变化,是因为实质上在对<code>star</code>检测时只检测<code>star</code>本身的引用值是否发生了改变，改变<code>star</code>的属性值并未改变<code>star</code>本身的引用，因此是没有发生变化。</p>
<p>而当我们点击第二个按钮改变明星对象时 ，重新new了一个 <code>star</code> ，这时变化检测才会检测到 <code>star</code>发生了改变。</p>
<p>然后变化检测进入到子组件中,检测到<code>star.firstName</code>和<code>star.lastName</code>发生了变化, 然后更新视图.</p>
<h2 id="articleHeader6">OnPush策略</h2>
<p>与上面代码相比, 只在<code>movie.component.ts</code>中的<code>@component</code>中增加了一行代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" changeDetection:ChangeDetectionStrategy.OnPush " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"> changeDetection:ChangeDetectionStrategy<span class="hljs-selector-class">.OnPush</span> </code></pre>
<p>此时, 当点击第一个按钮时, 检测到<code>star</code>没有发生变化, ok,变化检测到此结束, 不会进入到子组件中, 视图不会发生变化.</p>
<p>当点击第二个按钮时,检测到<code>star</code>发生了变化, 然后变化检测进入到子组件中,检测到<code>star.firstName</code>和<code>star.lastName</code>发生了变化, 然后更新视图.</p>
<p>所以，当你使用了<code>OnPush</code>检测机制时，在修改一个绑定值的属性时，要确保同时修改到了绑定值本身的引用。但是每次需要改变属性值的时候去new一个新的对象会很麻烦，immutable.js 你值得拥有！</p>
<h2 id="articleHeader7">变化检测对象引用</h2>
<p>通过引用变化检测对象<code>ChangeDetectorRef</code>，可以手动去操作变化检测。我们可以在组件中的通过依赖注入的方式来获取该对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(
    private changeRef:ChangeDetectorRef
  ){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(
    <span class="hljs-keyword">private</span> changeRef:ChangeDetectorRef
  )</span><span class="hljs-comment">{}</span></span></code></pre>
<p>变化检测对象提供的方法有以下几种：</p>
<ul>
<li>
<code>markForCheck()</code> - 在组件的 metadata 中如果设置了 <code>changeDetection:ChangeDetectionStrategy.OnPush</code> 条件，那么变化检测不会再次执行，除非手动调用该方法, 该方法的意思是在变化监测时必须检测该组件。</li>
<li>
<code>detach()</code> - 从变化检测树中分离变化检测器，该组件的变化检测器将不再执行变化检测，除非手动调用 reattach() 方法。</li>
<li>
<code>reattach()</code> - 重新添加已分离的变化检测器，使得该组件及其子组件都能执行变化检测</li>
<li>
<code>detectChanges()</code> - 从该组件到各个子组件执行一次变化检测</li>
</ul>
<h2 id="articleHeader8">OnPush策略下手动发起变化检测</h2>
<ul><li>
<p>组件中添加事件改变输入属性</p>
<p>在上面代码movie.component.ts中修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
<div>
<h3>"{{" title "}}"</h3>
<p>
<button (click)=&quot;changeStar()&quot;>点击切换名字</button>        
<label>Star:</label>
<span>"{{"star.firstName"}}" "{{"star.lastName"}}"</span>
</p>
</div>`,
changeDetection:ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  constructor(
    private changeRef:ChangeDetectorRef
  ){}
  @Input() title: string;
  @Input() star;
  
  changeStar(){
    this.star.lastName = 'xjl';
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>@Component({
  selector: <span class="hljs-string">'movie'</span>,
  styles: [<span class="hljs-string">'div {border: 1px solid black}'</span>],
  template: `<span class="javascript">
&lt;div&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>"{{" title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
&lt;p&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"changeStar()"</span>&gt;</span>点击切换名字<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>        
&lt;label&gt;Star:<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></span>
&lt;span&gt;"{{"star.firstName"}}" "{{"star.lastName"}}"&lt;<span class="hljs-regexp">/span&gt;
&lt;/</span>p&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></span>`,
changeDetection:ChangeDetectionStrategy.OnPush
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MovieComponent</span> {</span>
  constructor(
    private changeRef:ChangeDetectorRef
  ){}
  @Input() title: string;
  @Input() star;
  
  changeStar(){
    <span class="hljs-keyword">this</span>.star.lastName = <span class="hljs-string">'xjl'</span>;
  }
}</code></pre>
</li></ul>
<p>此时点击按钮切换名字时,star更改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="![图片描述][3]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>![<span class="hljs-string">图片描述</span>][<span class="hljs-symbol">3</span>]
</code></pre>
<ul><li>
<p>第二种就是上面讲到的使用变化检测对象中的 <code>markForCheck()</code>方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
    setInterval(() => {
      this.star.lastName = 'xjl';
      this.changeRef.markForCheck();
    }, 1000);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>ngOnInit() {
    setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.star.lastName = <span class="hljs-string">'xjl'</span>;
      <span class="hljs-keyword">this</span>.changeRef.markForCheck();
    }, <span class="hljs-number">1000</span>);
  }</code></pre>
</li></ul>
<h1 id="articleHeader9">输入属性为Observable</h1>
<p>修改app.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-root',
  template: `
  <h1>变更检测策略</h1>
  <p>"{{" slogan "}}"</p>
  <button type=&quot;button&quot; (click)=&quot;changeStar()&quot;>  改变明星属性
  </button>
  <button type=&quot;button&quot; (click)=&quot;changeStarObject()&quot;>
     改变明星对象
  </button>
  <movie [title]=&quot;title&quot; [star]=&quot;star&quot; [addCount]=&quot;count&quot;></movie>`,
})
export class AppComponent implements OnInit{
  slogan: string = 'change detection';
  title: string = 'OnPush 策略';
  star: Star = new Star('周', '杰伦');
  count:Observable<any>;

  ngOnInit(){
    this.count = Observable.timer(0, 1000)
  }
  changeStar() {
    this.star.firstName = '吴';
    this.star.lastName = '彦祖';
  }
  changeStarObject() {
    this.star = new Star('刘', '德华');
  }
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>@Component({
  selector: <span class="hljs-string">'app-root'</span>,
  <span class="hljs-keyword">template</span>: `
  &lt;h1&gt;变更检测策略&lt;/h1&gt;
  &lt;p&gt;"{{" slogan "}}"&lt;/p&gt;
  &lt;button type=<span class="hljs-string">"button"</span> (<span class="hljs-built_in">click</span>)=<span class="hljs-string">"changeStar()"</span>&gt;  改变明星属性
  &lt;/button&gt;
  &lt;button type=<span class="hljs-string">"button"</span> (<span class="hljs-built_in">click</span>)=<span class="hljs-string">"changeStarObject()"</span>&gt;
     改变明星对象
  &lt;/button&gt;
  &lt;movie [title]=<span class="hljs-string">"title"</span> [star]=<span class="hljs-string">"star"</span> [addCount]=<span class="hljs-string">"count"</span>&gt;&lt;/movie&gt;`,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent implements OnInit{
  slogan: <span class="hljs-keyword">string</span> = <span class="hljs-string">'change detection'</span>;
  title: <span class="hljs-keyword">string</span> = <span class="hljs-string">'OnPush 策略'</span>;
  star: Star = <span class="hljs-keyword">new</span> Star(<span class="hljs-string">'周'</span>, <span class="hljs-string">'杰伦'</span>);
  count:Observable&lt;any&gt;;

  ngOnInit(){
    <span class="hljs-keyword">this</span>.count = Observable.timer(<span class="hljs-number">0</span>, <span class="hljs-number">1000</span>)
  }
  changeStar() {
    <span class="hljs-keyword">this</span>.star.firstName = <span class="hljs-string">'吴'</span>;
    <span class="hljs-keyword">this</span>.star.lastName = <span class="hljs-string">'彦祖'</span>;
  }
  changeStarObject() {
    <span class="hljs-keyword">this</span>.star = <span class="hljs-keyword">new</span> Star(<span class="hljs-string">'刘'</span>, <span class="hljs-string">'德华'</span>);
  }
  
}</code></pre>
<p>此时,有两种方式让MovieComponent进入检测,一种是使用变化检测对象中的 <code>markForCheck()</code>方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
    this.addCount.subscribe(() => {
      this.count++;
      this.changeRef.markForCheck();
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>ngOnInit() {
    <span class="hljs-keyword">this</span>.addCount.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.count++;
      <span class="hljs-keyword">this</span>.changeRef.markForCheck();
    })</code></pre>
<p>另外一种是使用async pipe 管道</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
<div>
<h3>"{{" title "}}"</h3>
<p>
<button (click)=&quot;changeStar()&quot;>点击切换名字</button>        
<label>Star:</label>
<span>"{{"star.firstName"}}" "{{"star.lastName"}}"</span>
</p>
<p>"{{"addCount | async"}}"</p>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">@Component(</span><span class="hljs-template-variable">{
  selector: 'movie',
  styles: ['div {border: 1px solid black}</span><span class="xml">'],
  template: `
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{" title }</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"changeStar()"</span>&gt;</span>点击切换名字<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>        
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Star:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"star.firstName}</span><span class="xml">} </span><span class="hljs-template-variable">"{{"star.lastName}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"addCount | async}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular系列之变化检测(Change Detection)

## 原文链接
[https://segmentfault.com/a/1190000010928087](https://segmentfault.com/a/1190000010928087)

