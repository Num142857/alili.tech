---
title: 'Angular 2+ 监听路由变化动态设置页面标题' 
date: 2019-01-10 2:30:08
hidden: true
slug: tvoiauyswv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>现在很多web网站都采用了SPA单页应用，单页面有很多优点：用户体验好、应用响应快、对服务器压力小 等等。同时也有一些缺点：首次加载资源太多，不利于SEO，前进、后退、地址栏需要手动管理。今天我们实现<code>Angular</code>单页面应用中路由变化设置页面标题，来优化用户的用户体验。可以先去掘金看下效果。<a href="https://juejin.im/" rel="nofollow noreferrer" target="_blank">稀土掘金</a></p></blockquote>
<p>在AngularJS（1.x）中动态设置页面标题通常是通过一个全局$rootScope对象来完成的，通过$rootScope对象监听路由变化获取当前路由信息并映射到页面标题。在Angular（v2 +）中，解决起来要比1.x容易得多，我们可以通过注入一个provider，在路由变化事件中使用provider提供的API来动态更新页面标题。</p>
<h2 id="articleHeader0">Title Service</h2>
<p>在angular中，我们可以通过Title来设置页面标题。我们从<code>platform-browser</code>导入<code>Title</code>, 同时也导入<code>Router</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">import</span> { <span class="hljs-attribute">Title</span> } from <span class="hljs-string">'<span class="hljs-variable">@angular</span>/platform-browser'</span>;
<span class="hljs-section">import</span> { <span class="hljs-attribute">Router</span> } from <span class="hljs-string">'<span class="hljs-variable">@angular</span>/router'</span>;</code></pre>
<p>导入之后，我们在组件的构造函数中注入他们</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-root',
  templateUrl: `
    <div>
      Hello world!
    </div>
  `
})
export class AppComponent {
  constructor(private router: Router, private titleService: Title) {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@Component</span>({
  <span class="hljs-attribute">selector</span>: <span class="hljs-string">'app-root'</span>,
  <span class="hljs-attribute">templateUrl</span>: <span class="hljs-built_in">`
    &lt;div&gt;
      Hello world!
    &lt;/div&gt;
  `</span>
})
export class AppComponent {
  <span class="hljs-selector-tag">constructor</span>(private <span class="hljs-attribute">router</span>: Router, private <span class="hljs-attribute">titleService</span>: Title) {}
}
</code></pre>
<p>在使用<code>Title</code>之前，我们先看下<code>Title</code>是如何定义的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Title {
  /**
   * Get the title of the current HTML document.
   * @returns {string}
   */
  getTitle(): string { return getDOM().getTitle(); }

  /**
   * Set the title of the current HTML document.
   * @param newTitle
   */
  setTitle(newTitle: string) { getDOM().setTitle(newTitle); }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> </span>{
  <span class="hljs-comment">/**
   * Get the title of the current HTML document.
   * @returns {string}
   */</span>
  getTitle(): <span class="hljs-type">string </span>{ <span class="hljs-keyword">return</span> getDOM().getTitle(); }

  <span class="hljs-comment">/**
   * Set the title of the current HTML document.
   * @param newTitle
   */</span>
  setTitle(<span class="hljs-keyword">new</span><span class="hljs-type">Title</span>: string) { getDOM().setTitle(<span class="hljs-keyword">new</span><span class="hljs-type">Title</span>); }
}
</code></pre>
<p><code>Title</code>类有两个方法，一个用来获取页面标题<code>getTitle</code>， 一个是用来设置页面标题的<code>setTitle</code></p>
<p>要更新页面标题，我们可以简单的调用<code>setTitle</code>方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({...})
export class AppComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {}
  ngOnInit() {
    this.titleService.setTitle('My awesome app');
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-meta">@Component</span>({...})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">OnInit</span> {</span>
  constructor(<span class="hljs-keyword">private</span> <span class="hljs-string">router:</span> Router, <span class="hljs-keyword">private</span> <span class="hljs-string">titleService:</span> Title) {}
  ngOnInit() {
    <span class="hljs-keyword">this</span>.titleService.setTitle(<span class="hljs-string">'My awesome app'</span>);
  }
}
</code></pre>
<p>这样就可以设置我们的页面标题了，但是很不优雅。我们接着往下看。</p>
<p>在AngularJS中，我们可以使用ui-router为每个路由添加一个自定义对象，自定义的对象在路由器的状态链中继承：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// AngularJS 1.x + ui-router
.config(function ($stateProvider) {
  $stateProvider
    .state('about', {
      url: '/about',
      component: 'about',
      data: {
        title: 'About page'
      }
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// AngularJS 1.x + ui-router</span>
<span class="hljs-selector-class">.config</span>(function ($stateProvider) {
  $<span class="hljs-selector-tag">stateProvider</span>
    <span class="hljs-selector-class">.state</span>(<span class="hljs-string">'about'</span>, {
      <span class="hljs-attribute">url</span>: <span class="hljs-string">'/about'</span>,
      <span class="hljs-attribute">component</span>: <span class="hljs-string">'about'</span>,
      <span class="hljs-attribute">data</span>: {
        <span class="hljs-attribute">title</span>: <span class="hljs-string">'About page'</span>
      }
    });
});
</code></pre>
<p>在Angular2+中，我们也可以为每个路由定义一个data对象，然后再在监听路由变化时做一些额外的逻辑处理就可以实现动态设置页面标题。首先，我们定义一个基本的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes: Routes = [{
  path: 'calendar',
  component: CalendarComponent,
  children: [
    { path: '', redirectTo: 'new', pathMatch: 'full' },
    { path: 'all', component: CalendarListComponent },
    { path: 'new', component: CalendarEventComponent },
    { path: ':id', component: CalendarEventComponent }
  ]
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const <span class="hljs-string">routes:</span> Routes = [{
<span class="hljs-symbol">  path:</span> <span class="hljs-string">'calendar'</span>,
<span class="hljs-symbol">  component:</span> CalendarComponent,
<span class="hljs-symbol">  children:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">''</span>, <span class="hljs-string">redirectTo:</span> <span class="hljs-string">'new'</span>, <span class="hljs-string">pathMatch:</span> <span class="hljs-string">'full'</span> },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'all'</span>, <span class="hljs-string">component:</span> CalendarListComponent },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'new'</span>, <span class="hljs-string">component:</span> CalendarEventComponent },
    { <span class="hljs-string">path:</span> <span class="hljs-string">':id'</span>, <span class="hljs-string">component:</span> CalendarEventComponent }
  ]
}];</code></pre>
<p>在这里定义一个日历应用，他有一个路由<code>/calendar</code>， 还有三个子路由， <code>/all</code>对应日历列表页，<code>new</code>对应新建日历，<code>:id</code>对应日历详情。现在，我们定义一个<code>data</code>对象然后设置一个<code>title</code>属性来作为每个页面的标题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes: Routes = [{
  path: 'calendar',
  component: CalendarComponent,
  children: [
    { path: '', redirectTo: 'new', pathMatch: 'full' },
    { path: 'all', component: CalendarListComponent, data: { title: 'My Calendar' } },
    { path: 'new', component: CalendarEventComponent, data: { title: 'New Calendar Entry' } },
    { path: ':id', component: CalendarEventComponent, data: { title: 'Calendar Entry' } }
  ]
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const <span class="hljs-string">routes:</span> Routes = [{
<span class="hljs-symbol">  path:</span> <span class="hljs-string">'calendar'</span>,
<span class="hljs-symbol">  component:</span> CalendarComponent,
<span class="hljs-symbol">  children:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">''</span>, <span class="hljs-string">redirectTo:</span> <span class="hljs-string">'new'</span>, <span class="hljs-string">pathMatch:</span> <span class="hljs-string">'full'</span> },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'all'</span>, <span class="hljs-string">component:</span> CalendarListComponent, <span class="hljs-string">data:</span> { <span class="hljs-string">title:</span> <span class="hljs-string">'My Calendar'</span> } },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'new'</span>, <span class="hljs-string">component:</span> CalendarEventComponent, <span class="hljs-string">data:</span> { <span class="hljs-string">title:</span> <span class="hljs-string">'New Calendar Entry'</span> } },
    { <span class="hljs-string">path:</span> <span class="hljs-string">':id'</span>, <span class="hljs-string">component:</span> CalendarEventComponent, <span class="hljs-string">data:</span> { <span class="hljs-string">title:</span> <span class="hljs-string">'Calendar Entry'</span> } }
  ]
}];</code></pre>
<p>好了，路由定义完了，现在我们看下如何监听路由变化</p>
<h2 id="articleHeader1">Routing events</h2>
<p>Angular路由配置非常简单，但是路由通过Observables使用起来也非常强大。<br>我们可以在根组件中全局监听路由的变化:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
  this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      console.log(event);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>ngOnInit() {
  <span class="hljs-keyword">this</span>.router.events
    .subscribe(<span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
      <span class="hljs-regexp">//</span> example: NavigationStart, RoutesRecognized, NavigationEnd
      <span class="hljs-built_in">console</span>.log(event);
    });
}</code></pre>
<p>我们要做的就是在导航结束时获取到定义的数据然后设置页面标题，可以检查 <a href="https://angular.cn/docs/ts/latest/api/router/index/NavigationStart-class.html" rel="nofollow noreferrer" target="_blank">NavigationStart</a>, <a href="https://angular.cn/docs/ts/latest/api/router/index/RoutesRecognized-class.html" rel="nofollow noreferrer" target="_blank">RoutesRecognized</a>, <a href="https://angular.cn/docs/ts/latest/api/router/index/NavigationEnd-class.html" rel="nofollow noreferrer" target="_blank">NavigationEnd</a> 哪种事件是我们需要的方式，理想情况下<code>NavigationEnd</code>，我们可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.router.events
  .subscribe((event) => {
    if (event instanceof NavigationEnd) { // 当导航成功结束时执行
      console.log('NavigationEnd:', event);
    }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.router.events
  .subscribe(<span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (event <span class="hljs-keyword">instanceof</span> NavigationEnd) { <span class="hljs-regexp">//</span> 当导航成功结束时执行
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NavigationEnd:'</span>, event);
    }
  });</code></pre>
<p>这样我们就可以在导航成功结束时做一些逻辑了，因为Angular路由器是<code>reactive</code>响应式的，所以我们可以使用 <a href="https://github.com/Reactive-Extensions/RxJS" rel="nofollow noreferrer" target="_blank">RxJS</a> 实现更多的逻辑，我们来导入以下操作符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'rxjs/add/operator/filter';</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'rxjs/add/operator/map';</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'rxjs/add/operator/mergeMap';</span></code></pre>
<p>现在我们已经添加了 <code>filter</code>，<code>map</code> 和 <code>mergeMap</code> 三个操作符，我们可以过滤出导航结束的事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.router.events
  .filter(event => event instanceof NavigationEnd)
  .subscribe((event) => {
    console.log('NavigationEnd:', event);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.router.events
  .filter(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> event <span class="hljs-keyword">instanceof</span> NavigationEnd)
  .subscribe(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NavigationEnd:'</span>, event);
  });</code></pre>
<p>其次，因为我们已经注入了Router类，我们可以使用 <a href="https://angular.cn/docs/ts/latest/api/router/index/RouterState-interface.html" rel="nofollow noreferrer" target="_blank">routerState</a> 来获取路由状态树得到最后一个导航成功的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.router.events
  .filter(event => event instanceof NavigationEnd)
  .map(() => this.router.routerState.root)
  .subscribe((event) => {
    console.log('NavigationEnd:', event);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.router.events
  .filter(event =&gt; event <span class="hljs-keyword">instanceof</span> NavigationEnd)
  .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.router.routerState.root)
  .subscribe(<span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NavigationEnd:'</span>, event);
  });</code></pre>
<p>然而，一个更好的方式就是使用 <a href="https://angular.cn/docs/ts/latest/api/router/index/ActivatedRoute-interface.html" rel="nofollow noreferrer" target="_blank">ActivatedRoute</a> 来代替 <code>routerState.root</code>,  我们可以将其<code>ActivatedRoute</code>注入类中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({...})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit() {
    // our code is in here
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">import</span> { <span class="hljs-type">Router</span>, <span class="hljs-type">NavigationEnd</span>, <span class="hljs-type">ActivatedRoute</span> } <span class="hljs-keyword">from</span> '@angular/router';

@<span class="hljs-type">Component</span>(<span class="hljs-meta">{...}</span>)
<span class="hljs-keyword">export</span> class <span class="hljs-type">AppComponent</span> implements <span class="hljs-type">OnInit</span> {
  constructor(
    private router: <span class="hljs-type">Router</span>,
    private activatedRoute: <span class="hljs-type">ActivatedRoute</span>,
    private titleService: <span class="hljs-type">Title</span>
  ) {}
  ngOnInit() {
    // our code <span class="hljs-keyword">is</span> <span class="hljs-keyword">in</span> here
  }
}</code></pre>
<p>注入之后我们再来优化下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.router.events
  .filter(event => event instanceof NavigationEnd)
  .map(() => this.activatedRoute)
  .subscribe((event) => {
    console.log('NavigationEnd:', event);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.router.events
  .filter(event =&gt; event <span class="hljs-keyword">instanceof</span> NavigationEnd)
  .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.activatedRoute)
  .subscribe(<span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NavigationEnd:'</span>, event);
  });</code></pre>
<p>我们使用 <code>map</code> 转换了我们观察到的内容，返回一个新的对象 <code>this.activatedRoute</code> 在 <code>stream</code> 流中继续执行。 我们使用 <code>filter(过滤出导航成功结束)</code> 和 <code>map(返回我们的路由状态树)</code> 成功地返回我们想要的事件类型 <code>NavigationEnd</code>。</p>
<p>接下来是最有意思的部分，我们将创建一个while循环遍历状态树得到最后激活的 route，然后将其作为结果返回到流中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.router.events
  .filter(event => event instanceof NavigationEnd)
  .map(() => this.activatedRoute)
  .map(route => {
    while (route.firstChild) route = route.firstChild;
    return route;
  })
  .subscribe((event) => {
    console.log('NavigationEnd:', event);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.router.events
  .filter(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> event <span class="hljs-keyword">instanceof</span> NavigationEnd)
  .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.activatedRoute)
  .map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    <span class="hljs-keyword">while</span> (route.firstChild) route = route.firstChild;
    <span class="hljs-keyword">return</span> route;
  })
  .subscribe(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NavigationEnd:'</span>, event);
  });</code></pre>
<p>接下来我们可以通过路由配置的属性来获取相应的页面标题。然后，我们还需要另外两个运算符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.router.events
  .filter(event => event instanceof NavigationEnd)
  .map(() => this.activatedRoute)
  .map(route => {
    while (route.firstChild) route = route.firstChild;
    return route;
  })
  .filter(route => route.outlet === 'primary')  // 过滤出未命名的outlet，<router-outlet>
  .mergeMap(route => route.data)                // 获取路由配置数据
  .subscribe((event) => {
    console.log('NavigationEnd:', event);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.router.events
  .filter(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> event <span class="hljs-keyword">instanceof</span> NavigationEnd)
  .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.activatedRoute)
  .map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    <span class="hljs-keyword">while</span> (route.firstChild) route = route.firstChild;
    <span class="hljs-keyword">return</span> route;
  })
  .filter(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> route.outlet === <span class="hljs-string">'primary'</span>)  <span class="hljs-comment">// 过滤出未命名的outlet，&lt;router-outlet&gt;</span>
  .mergeMap(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> route.data)                <span class="hljs-comment">// 获取路由配置数据</span>
  .subscribe(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'NavigationEnd:'</span>, event);
  });</code></pre>
<p>现在我们 <code>titleService</code> 只需要实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".subscribe((event) => this.titleService.setTitle(event['title']));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>.subscribe(<span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> <span class="hljs-keyword">this</span>.titleService.setTitle(event[<span class="hljs-string">'title'</span>]));
</code></pre>
<p>下面看一下最终代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({...})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/filter'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/mergeMap'</span>;

<span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Router, NavigationEnd, ActivatedRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;
<span class="hljs-keyword">import</span> { Title } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;

<span class="hljs-meta">@Component</span>({...})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> router: Router,
    <span class="hljs-keyword">private</span> activatedRoute: ActivatedRoute,
    <span class="hljs-keyword">private</span> titleService: Title
  </span>) {}
  ngOnInit() {
    <span class="hljs-keyword">this</span>.router.events
      .filter(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> event <span class="hljs-keyword">instanceof</span> NavigationEnd)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.activatedRoute)
      .map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
        <span class="hljs-keyword">while</span> (route.firstChild) route = route.firstChild;
        <span class="hljs-keyword">return</span> route;
      })
      .filter(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> route.outlet === <span class="hljs-string">'primary'</span>)
      .mergeMap(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> route.data)
      .subscribe(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> <span class="hljs-keyword">this</span>.titleService.setTitle(event[<span class="hljs-string">'title'</span>]));
  }
}</code></pre>
<p>本文翻译自<a href="https://toddmotto.com/dynamic-page-titles-angular-2-router-events" rel="nofollow noreferrer" target="_blank">dynamic-page-titles-angular-2-router-events</a>, 本人水平有限，如果有翻译不好的地方欢迎大家联系我</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2+ 监听路由变化动态设置页面标题

## 原文链接
[https://segmentfault.com/a/1190000009971757](https://segmentfault.com/a/1190000009971757)

