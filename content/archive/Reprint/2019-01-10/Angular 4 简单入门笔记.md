---
title: 'Angular 4 简单入门笔记' 
date: 2019-01-10 2:30:08
hidden: true
slug: fzzefd8o32m
categories: [reprint]
---

{{< raw >}}

                    
<p>刚实习的时候用过AngularJS，那时候真的是连原生JavaScript都不会写，依样画葫芦做了几个管理后台。然后突然换项目了，AngularJS就不写了，感觉前前后后接触了一年多的AngularJS，结果只懂点皮毛。</p>
<p>最近又有个管理后台的需求，决定再拾起，但现在是升级版的Angular了。终于，有机会好好再看一眼Angular了，这次希望能深入一点了解。</p>
<p>本文是笔者在学习开发过程中的总结输出，目的在于让初次接触Angular的开发者对该框架能有整体的认识，并且能快速上手开发工作。</p>
<h2 id="articleHeader0">AngularJS VS Angular</h2>
<p>AngularJS最大版本号只有1.x，2.x/4.x的版本号都是针对于全新的框架Angular。但不能说Angular和AngularJS一点关系都没有，你看名字这么像，是吧？！回忆一下AngularJS被人念念不忘的特性，双向数据绑定，MVC，指令，服务，过滤器，模块化，脏检查机制，依赖注入，Scope，路由，表单校验等等。</p>
<p>看下AngularJS到Angular的过程中，哪些概念被保留下来，哪些被剔除了（所谓的取其精华，去其糟粕）。</p>
<p>剔除的部分：</p>
<ul>
<li><p>ng-controller指令：控制器主要是业务逻辑的控制部分</p></li>
<li><p>$scope概念：很强大又很复杂</p></li>
<li><p>数据双向绑定：数据双向流通可能导致数据的震荡（故才有最多检查10次的限制，10次之后还不稳定就报错）</p></li>
</ul>
<p>保留/改善的部分：</p>
<ul>
<li><p>路由嵌套：AngularJS自带的路由系统是不能嵌套路由的，到了Angular你想怎么嵌套就怎么嵌套</p></li>
<li><p>过滤器（Filter）变成管道（Pipe），概念的变化</p></li>
<li><p>依赖注入机制：直接在构造器中注入，还有分层依赖注入的概念</p></li>
<li>
<p>指令写法：</p>
<ul>
<li><p>(事件) ng-click变成(click)</p></li>
<li><p>[属性] href = ""{{""}}""可以写成 [href]</p></li>
<li><p>[(ngModel)]代替以前的ng-model</p></li>
<li><p>*ngFor 代替 ng-repeat，不适用于对象，适用任何有Symbol.iterator属性的数据结构（能用for...of来访问），比如数组，集合等</p></li>
<li><p>*ngIf 代替 ng-if，去掉ng-show，ng-hide</p></li>
</ul>
</li>
<li><p>对移动端的支持</p></li>
<li><p>模版，数据绑定，服务，模块，脏检查机制等</p></li>
</ul>
<p>新增的部分：</p>
<ul>
<li><p>组件化：Angular的核心所在</p></li>
<li><p>Typescript作为默认的开发语言</p></li>
<li><p>ZoneJS监听所有（可能导致数据变化）的异步事件</p></li>
<li><p>支持服务端渲染</p></li>
</ul>
<h2 id="articleHeader1">Angular Cli</h2>
<p>Angular团队为开发者提供了一个开箱即用（out of the box）的脚手架工具：Angular Cli。我们再也不用担心在项目初始化时，要搭建配置一系列的工具，比如webpack，karma，tslint，protractor等。</p>
<p>操作很简单，只要运行如下命令行就搞定了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010048668" src="https://static.alili.tech/img/remote/1460000010048668" alt="" title="" style="cursor: pointer;"></span></p>
<p>具体的语法教程可参考<a href="https://github.com/angular/angular-cli/wiki" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>安装之后，文件目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="my-dream-app
    e2e                      // 端到端测试
        app.e2e-spec.ts
        app.po.ts
        tsconfig.e2e.json
    node_modules/...         // npm包
    src/...                  // 源码
    angular-cli.json         // 配置项
    .editorconfig            // 编辑器配置
    .gitignore               // git忽略文件配置
    karma.conf.js            // karma配置
    package.json             // npm配置
    protractor.conf.js       // 测试配置项
    README.md                // 项目说明
    tsconfig.json            // ts编辑器的配置
    tslint.json              // tslint配置项
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>my-dream-app
    e2e                      <span class="hljs-comment">// 端到端测试</span>
        app<span class="hljs-selector-class">.e2e-spec</span><span class="hljs-selector-class">.ts</span>
        app<span class="hljs-selector-class">.po</span><span class="hljs-selector-class">.ts</span>
        tsconfig<span class="hljs-selector-class">.e2e</span><span class="hljs-selector-class">.json</span>
    node_modules/...         <span class="hljs-comment">// npm包</span>
    src/...                  <span class="hljs-comment">// 源码</span>
    angular-cli<span class="hljs-selector-class">.json</span>         <span class="hljs-comment">// 配置项</span>
    <span class="hljs-selector-class">.editorconfig</span>            <span class="hljs-comment">// 编辑器配置</span>
    <span class="hljs-selector-class">.gitignore</span>               <span class="hljs-comment">// git忽略文件配置</span>
    karma<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// karma配置</span>
    package<span class="hljs-selector-class">.json</span>             <span class="hljs-comment">// npm配置</span>
    protractor<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>       <span class="hljs-comment">// 测试配置项</span>
    README<span class="hljs-selector-class">.md</span>                <span class="hljs-comment">// 项目说明</span>
    tsconfig<span class="hljs-selector-class">.json</span>            <span class="hljs-comment">// ts编辑器的配置</span>
    tslint<span class="hljs-selector-class">.json</span>              <span class="hljs-comment">// tslint配置项</span>
  </code></pre>
<p>我们需要关注的是<code>src</code>文件夹，这里存放我们所有的源代码，开发的时候基本都在<code>src</code>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
    app                      // 代码的主要文件夹
        app.component.css    // 根组件样式
        app.component.html   // 根组件模版
        app.component.spec.ts// 根组件测试
        app.component.ts     // 根组件脚本
        app.module.ts        // 根模块
    assets                   // 静态资源
        .gitkeep             // 保存空文件夹
    environments             // 环境配置
        environment.prod.ts
        environment.ts
    favicon.ico              // 图标
    index.html               // 页面主入口
    main.ts                  // 脚本主入口
    polyfills.ts             // 兼容浏览器
    styles.css               // 全局css样式
    test.ts                  // 单元测试主入口
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src
    app                      <span class="hljs-comment">// 代码的主要文件夹</span>
        app<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.css</span>    <span class="hljs-comment">// 根组件样式</span>
        app<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.html</span>   <span class="hljs-comment">// 根组件模版</span>
        app<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span><span class="hljs-comment">// 根组件测试</span>
        app<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>     <span class="hljs-comment">// 根组件脚本</span>
        app<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span>        <span class="hljs-comment">// 根模块</span>
    assets                   <span class="hljs-comment">// 静态资源</span>
        <span class="hljs-selector-class">.gitkeep</span>             <span class="hljs-comment">// 保存空文件夹</span>
    environments             <span class="hljs-comment">// 环境配置</span>
        environment<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.ts</span>
        environment<span class="hljs-selector-class">.ts</span>
    favicon<span class="hljs-selector-class">.ico</span>              <span class="hljs-comment">// 图标</span>
    index<span class="hljs-selector-class">.html</span>               <span class="hljs-comment">// 页面主入口</span>
    main<span class="hljs-selector-class">.ts</span>                  <span class="hljs-comment">// 脚本主入口</span>
    polyfills<span class="hljs-selector-class">.ts</span>             <span class="hljs-comment">// 兼容浏览器</span>
    styles<span class="hljs-selector-class">.css</span>               <span class="hljs-comment">// 全局css样式</span>
    test<span class="hljs-selector-class">.ts</span>                  <span class="hljs-comment">// 单元测试主入口</span>
</code></pre>
<h2 id="articleHeader2">模块</h2>
<p>Angular很重要的概念之一仍然是模块。Angular整个框架就是由很多个模块组成的，而不同的模块需要从不同的地方导入。打开<code>package.json</code>文件，可以看到依赖的angular包可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;@angular/common&quot;: &quot;^2.3.1&quot;,
&quot;@angular/compiler&quot;: &quot;^2.3.1&quot;,
&quot;@angular/core&quot;: &quot;^2.3.1&quot;,
&quot;@angular/forms&quot;: &quot;^2.3.1&quot;,
&quot;@angular/http&quot;: &quot;^2.3.1&quot;,
&quot;@angular/platform-browser&quot;: &quot;^2.3.1&quot;,
&quot;@angular/platform-browser-dynamic&quot;: &quot;^2.3.1&quot;,
&quot;@angular/router&quot;: &quot;^3.3.1&quot;,
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code><span class="hljs-string">"@angular/common"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/compiler"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/core"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/forms"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/http"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/platform-browser"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/platform-browser-dynamic"</span>: <span class="hljs-string">"^2.3.1"</span>,
<span class="hljs-string">"@angular/router"</span>: <span class="hljs-string">"^3.3.1"</span>,
</code></pre>
<p>来简单看下这些angular包中包含了哪些常用的模块（至少目前为止，我觉得常用的）。</p>
<ul>
<li>
<p>@angular/core：这里包含了很多常用的模块</p>
<ul>
<li><p>NgModule：模块定义装饰器</p></li>
<li><p>Component：组件定义装饰器</p></li>
<li><p>Directive：指令定义装饰器</p></li>
<li><p>Pipe ：管道定义装饰器</p></li>
<li><p>PipeTransform：管道接口</p></li>
<li><p>Injectable：服务定义装饰器</p></li>
<li><p>ElmentRef：元素引用</p></li>
<li><p>ViewChild：获取子元素</p></li>
<li><p>Render：渲染</p></li>
<li><p>Input：接受参数输入</p></li>
<li><p>Output：事件输出</p></li>
<li><p>EventEmitter：触发自定义事件</p></li>
</ul>
</li>
<li>
<p>@angular/common</p>
<ul><li><p>CommonModule：通用模块，包含内置指令ngIf，ngFor</p></li></ul>
</li>
<li>
<p>@angular/forms</p>
<ul>
<li><p>FormsModule：定义模版驱动表单</p></li>
<li><p>ReactiveFormsModule：定义响应式表单</p></li>
<li><p>FormGroup, FormArray, FormControl, FormBuilder：响应式表单元素</p></li>
<li><p>Validators：表单校验</p></li>
</ul>
</li>
<li>
<p>@angular/http</p>
<ul><li><p>HttpModule：http请求模块</p></li></ul>
</li>
<li>
<p>@angular/router</p>
<ul>
<li><p>RouterModule 路由模块</p></li>
<li><p>Routes 路由数据结构</p></li>
</ul>
</li>
<li>
<p>@angular/platform-browser</p>
<ul>
<li><p>platformBrowser：AoT编译</p></li>
<li><p>BrowserModule：浏览器支持，注意该模块导入了CommonModule，然后导出去，所以引用了这个模块也就引用了CommonModule</p></li>
</ul>
</li>
<li>
<p>@angular/platform-browser-dynamic</p>
<ul><li><p>platformBrowserDynamic：JIT编译</p></li></ul>
</li>
</ul>
<p>以上模块都是Angular框架中的自带模块，而我们开发的完整单元也是模块。<strong>一个应用中至少要有一个模块，也就是根模块。</strong> 一些共享的功能属性我们可以抽象出来，成为共享模块。然后就是一些特性模块了。</p>
<p>模块的组成由组件，服务，指令，管道等等组成，这些概念会在下面讲到。定义模块的语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@NgModuel({
    declarations: [],   // 用到的组件，指令，管道
    providers: [],      // 依赖注入服务 
    imports: [],        // 导入需要的模块
    exports: [],        // 导出的模块，跨模块交流
    entryComponents: [] // 需提前编译好的模块
    bootstrap: []       // 设置根组件
    
})
export class AppModule { }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>
<span class="hljs-variable">@NgModuel</span>({
    <span class="hljs-attribute">declarations</span>: [],   <span class="hljs-comment">// 用到的组件，指令，管道</span>
    <span class="hljs-attribute">providers</span>: [],      <span class="hljs-comment">// 依赖注入服务 </span>
    <span class="hljs-attribute">imports</span>: [],        <span class="hljs-comment">// 导入需要的模块</span>
    <span class="hljs-attribute">exports</span>: [],        <span class="hljs-comment">// 导出的模块，跨模块交流</span>
    <span class="hljs-attribute">entryComponents</span>: [] <span class="hljs-comment">// 需提前编译好的模块</span>
    <span class="hljs-attribute">bootstrap</span>: []       <span class="hljs-comment">// 设置根组件</span>
    
})
export class AppModule { }
</code></pre>
<blockquote><p>所有用到的组件，指令，管道，模块都需要事先在模块中声明好，才能在具体组件中使用。服务可以在模块，组件，指令中的<code>providers</code>声明，也可以直接在运行时提供（参见Trotyl Yu的<a href="http://plnkr.co/edit/fiOq9J3BpD2csuV3FGhu?p=preview" rel="nofollow noreferrer" target="_blank">例子</a>）。</p></blockquote>
<p>一般情况下，在根模块的<code>bootstrap</code>中设置启动的根组件即可，但也可以动态处理（参见Trotyl Yu的<a href="http://plnkr.co/edit/fzJtvnPKTyzOB8UILtoD?p=preview" rel="nofollow noreferrer" target="_blank">例子</a>）。</p>
<p>那如何启动根模块呢？</p>
<p>在入口脚本中，也就是Angular Cli项目中的<code>main.ts</code>中，启动如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 导入需要模块
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 根模块
import { AppModule } from './app/app.module';

// 编译启动模块
platformBrowserDynamic().bootstrapModule(AppModule);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// 导入需要模块</span>
<span class="hljs-keyword">import</span> { platformBrowserDynamic } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser-dynamic'</span>;

<span class="hljs-comment">// 根模块</span>
<span class="hljs-keyword">import</span> { AppModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/app.module'</span>;

<span class="hljs-comment">// 编译启动模块</span>
platformBrowserDynamic().bootstrapModule(AppModule);
</code></pre>
<p>至此，我们对模块有所了解，也知道了模块的定义。</p>
<h2 id="articleHeader3">组件</h2>
<p>自从采用组件化的React大火之后，目前市面上炙手可热的框架全都采用了组件化的理念，Angular当然也不能落后了。可以说，组件化是Angular的核心理念。按Angular在中国的布道者大漠穷秋的话来说，就是：</p>
<blockquote><p>Angular的核心概念是组件，模块化机制NgModule是为组件化服务的，实际上所有其它机制都是围绕组件化而来的。只有从组件化这个角度才能把握Angular的精神内核。</p></blockquote>
<p>组件通常都是由模版和业务逻辑组成，看一下如何用Angular写一个很简单的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

// hello.component.ts

import { Component } from '@angular/core';

@Component({              
    selector: 'hello',
    template: '<p> "{{"greeting"}}" </p>',
    styles: [`p { color: red;}`]
})
export class HelloComponent{
    private greeting: string;
    constructor(){
        this.greeting = 'Hello, Angular2!';
    }
}

// 使用
<hello></hello>

// 渲染结果
<hello>
    <p> Hello, Angular2! </p> 
</hello>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="kotlin"><span class="hljs-comment">// hello.component.ts</span>

<span class="hljs-keyword">import</span> { Component } from <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component({              
    selector: <span class="hljs-meta-string">'hello'</span>,
    template: <span class="hljs-meta-string">'&lt;p&gt; "{{"greeting"}}" &lt;/p&gt;'</span>,
    styles: [`p { color: red;}`]
})</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloComponent</span></span>{
    <span class="hljs-keyword">private</span> greeting: string;
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.greeting = <span class="hljs-string">'Hello, Angular2!'</span>;
    }
}

<span class="hljs-comment">// 使用</span>
&lt;hello&gt;&lt;/hello&gt;

<span class="hljs-comment">// 渲染结果</span>
&lt;hello&gt;
    &lt;p&gt; Hello, Angular2! &lt;/p&gt; 
&lt;/hello&gt;
</span></code></pre>
<p>定义类<code>HelloComponent</code>的时候，加上装饰器<code>@Component</code>（Typescript语法），告诉Angular这个类是组件类。里面的数据称之为元数据（metadata），<code>selector</code>属性说明了该组件对外的使用标记，<code>template</code>就是组件的模版，<code>styles</code>是组件的样式。而<code>HelloComponent</code>中定义的就是该组件的业务逻辑了。 </p>
<p>如果模版内容太多，可以单独写在一个html文件中，用<code>templateUrl</code>属性引入；同理，样式文件用<code>styleUrls</code>引入。</p>
<h2 id="articleHeader4">组件生命周期</h2>
<p>正如其他框架的组件，Angular的组件也是有生命周期这个概念。在不同的阶段不同的场景下，可以调用不同的生命周期函数钩子（hook）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010048669?w=200&amp;h=283" src="https://static.alili.tech/img/remote/1460000010048669?w=200&amp;h=283" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li><p>constructor：构造器函数，一般用于注入服务</p></li>
<li><p>ngOnChanges：检测到输入数据变化，首次触发发生在ngOnInit前。注意对象的属性发生变化时监听不到</p></li>
<li><p>ngOnInit：组件初始化，通常会设置一些初始值</p></li>
<li>
<p>ngDoCheck：手动触发更新检查</p>
<ul>
<li><p>ngAfterContentInit：内容初始化到组件之后</p></li>
<li><p>ngAfterContentChecked：内容变更检测之后</p></li>
<li><p>ngAfterViewInit：视图 初始化之后</p></li>
<li><p>ngAfterViewChecked：视图发生变化检测之后，这个可以用来保证用户视图的及时更新</p></li>
</ul>
</li>
<li><p>ngOnDestroy：组件注销时的清理工作，通常用于移除事件监听，退订可观察对象等</p></li>
</ul>
<p>具体说明可以参考<a href="https://angular.io/guide/lifecycle-hooks" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader5">组件通信</h2>
<p>可以想像得到，组件化的页面结构最终会形成一颗组件树。盗一张Vue的图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010048670?w=1406&amp;h=544" src="https://static.alili.tech/img/remote/1460000010048670?w=1406&amp;h=544" alt="组件树" title="组件树" style="cursor: pointer;"></span></p>
<p>不可避免，我们需要考虑父子组件之间的参数传递问题。Anuglar提供的通信方式有如下几种：</p>
<ul><li><p>父组件到子组件：父组件用属性绑定将值传入，子组件通过@Input来接收。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 父组件
import { Component } from '@angular/core'; 
 
@Component({
  selector: 'hero-parent',
  template: `<h2> heroes </h2>
    <hero-child *ngFor=&quot;let hero of heroes&quot;
      [hero]=&quot;hero&quot; >
    </hero-child>
  `
})
export class HeroParentComponent {
  heroes = [{
    name: 'John'
  }, {
    name: 'Lily'
  }]; 
}

// 子组件
import { Component, Input } from '@angular/core';

import { Hero } from './hero';
 
@Component({
  selector: 'hero-child',
  template: `
    <h3>"{{"hero.name"}}"</h3> 
  `
})
export class HeroChildComponent {
  @Input() hero: Hero; 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// 父组件</span>
<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>; 
 
@Component({
  selector: <span class="hljs-string">'hero-parent'</span>,
  template: `&lt;h2&gt; heroes &lt;/h2&gt;
    &lt;hero-child *ngFor=<span class="hljs-string">"let hero of heroes"</span>
      [hero]=<span class="hljs-string">"hero"</span> &gt;
    &lt;/hero-child&gt;
  `
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroParentComponent {
  heroes = [{
    name: <span class="hljs-string">'John'</span>
  }, {
    name: <span class="hljs-string">'Lily'</span>
  }]; 
}

<span class="hljs-comment">// 子组件</span>
<span class="hljs-keyword">import</span> { Component, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">'./hero'</span>;
 
@Component({
  selector: <span class="hljs-string">'hero-child'</span>,
  template: `
    &lt;h3&gt;"{{"hero.name"}}"&lt;/h3&gt; 
  `
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HeroChildComponent {
  @Input() hero: Hero; 
}
</code></pre>
<ul><li><p>子组件到父组件：子组件自定义事件用@Output传出，父组件用事件绑定获取。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 子组件
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-voter',
  template: `
    <h4>"{{"name"}}"</h4>
    <button (click)=&quot;vote(true)&quot;>Agree</button> 
  `
})
export class VoterComponent { 
  @Output() onVoted = new EventEmitter<boolean>(); 
 
  vote(agreed: boolean) {
    this.onVoted.emit(agreed); 
  }
}

// 父组件
import { Component } from '@angular/core';

@Component({
  selector: 'vote-taker',
  template: `
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: "{{"agreed"}}", Disagree: "{{"disagreed"}}"</h3>
    <my-voter *ngFor=&quot;let voter of voters&quot;
      [name]=&quot;voter&quot;
      (onVoted)=&quot;onVoted($event)&quot;>
    </my-voter>
  `
})
export class VoteTakerComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
 
  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 子组件</span>
<span class="hljs-keyword">import</span> { Component, EventEmitter, Output } from <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">'my-voter'</span>,
  template: `
    &lt;h4&gt;"{{"name"}}"&lt;/h4&gt;
    &lt;button (click)</span>=<span class="hljs-string">"vote(true)"</span>&gt;Agree&lt;/button&gt; 
  `
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VoterComponent</span> </span>{ 
  <span class="hljs-meta">@Output()</span> onVoted = new EventEmitter&lt;boolean&gt;(); 
 
  vote(agreed: boolean) {
    <span class="hljs-keyword">this</span>.onVoted.emit(agreed); 
  }
}

<span class="hljs-comment">// 父组件</span>
<span class="hljs-keyword">import</span> { Component } from <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">'vote-taker'</span>,
  template: `
    &lt;h2&gt;Should mankind colonize the Universe?&lt;/h2&gt;
    &lt;h3&gt;Agree: "{{"agreed"}}", Disagree: "{{"disagreed"}}"&lt;/h3&gt;
    &lt;my-voter *ngFor=<span class="hljs-meta-string">"let voter of voters"</span>
      [name]=<span class="hljs-meta-string">"voter"</span>
      (onVoted)</span>=<span class="hljs-string">"onVoted(<span class="hljs-subst">$event</span>)"</span>&gt;
    &lt;/my-voter&gt;
  `
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VoteTakerComponent</span> </span>{
  agreed = <span class="hljs-number">0</span>;
  disagreed = <span class="hljs-number">0</span>;
  voters = [<span class="hljs-string">'Mr. IQ'</span>, <span class="hljs-string">'Ms. Universe'</span>, <span class="hljs-string">'Bombasto'</span>];
 
  onVoted(agreed: boolean) {
    agreed ? <span class="hljs-keyword">this</span>.agreed++ : <span class="hljs-keyword">this</span>.disagreed++;
  }
}
</code></pre>
<ul><li><p>子组件引用：在父组件模版中添加对子组件的引用，即可通过该子组件去访问子组件的方法。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h3>Countdown to Liftoff (via local variable)</h3>
<button (click)=&quot;timer.start()&quot;>Start</button>
<button (click)=&quot;timer.stop()&quot;>Stop</button>
<div class=&quot;seconds&quot;>"{{"timer.seconds"}}"</div>
<countdown-timer #timer></countdown-timer>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Countdown to Liftoff (via local variable)<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"timer.start()"</span>&gt;</span>Start<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"timer.stop()"</span>&gt;</span>Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"seconds"</span>&gt;</span></span><span class="hljs-template-variable">"{{"timer.seconds"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">countdown-timer</span> #<span class="hljs-attr">timer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">countdown-timer</span>&gt;</span>
</span></code></pre>
<ul><li><p>@ViewChild()：类似的，也可以在脚本中用@ViewChild()来获取子组件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { AfterViewInit, ViewChild } from '@angular/core';
import { Component }                from '@angular/core';
import { CountdownTimerComponent }  from './countdown-timer.component';
 
@Component({
  selector: 'countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)=&quot;start()&quot;>Start</button>
  <button (click)=&quot;stop()&quot;>Stop</button>
  <div class=&quot;seconds&quot;>"{{" seconds() "}}"</div>
  <countdown-timer></countdown-timer>
  `
})
export class CountdownViewChildParentComponent implements AfterViewInit {
 
  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;
 
  seconds() { return 0; }
 
  ngAfterViewInit() { 
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }
 
  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { AfterViewInit, ViewChild } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Component }                <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CountdownTimerComponent }  <span class="hljs-keyword">from</span> <span class="hljs-string">'./countdown-timer.component'</span>;
 
@Component({
  selector: <span class="hljs-string">'countdown-parent-vc'</span>,
  template: `<span class="javascript">
  &lt;h3&gt;Countdown to Liftoff (via ViewChild)&lt;<span class="hljs-regexp">/h3&gt;
  &lt;button (click)="start()"&gt;Start&lt;/</span>button&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"stop()"</span>&gt;</span>Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"seconds"</span>&gt;"{{" seconds() "}}"&lt;<span class="hljs-regexp">/div&gt;
  &lt;countdown-timer&gt;&lt;/</span>countdown-timer&gt;
  </span>`
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CountdownViewChildParentComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">AfterViewInit</span> {</span>
 
  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;
 
  seconds() { <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>; }
 
  ngAfterViewInit() { 
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.seconds = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.timerComponent.seconds, <span class="hljs-number">0</span>);
  }
 
  start() { <span class="hljs-keyword">this</span>.timerComponent.start(); }
  stop() { <span class="hljs-keyword">this</span>.timerComponent.stop(); }
}
</code></pre>
<ul>
<li><p>将数据保存在服务中</p></li>
<li><p>@ngrx/store：参见<a href="https://zhuanlan.zhihu.com/p/27656424" rel="nofollow noreferrer" target="_blank">【译】手把手教你用ngrx管理Angular状态</a></p></li>
</ul>
<h2 id="articleHeader6">模板与数据绑定</h2>
<p>模版说白了就是html的内容，常规的html基本都是静态内容，而模版结合了框架中的新语法使得html动态化。来看看Angular中的模版有什么便利的语法：</p>
<ul><li><p>插值绑定：双花括号<code>"{{""}}"</code></p></li></ul>
<p>我们可以看到上一节组件例子中的<code>"{{"greeting"}}"</code>就是插值绑定。不仅可以获取变量的值，还可以直接写表达式。</p>
<ul><li><p>属性（Property）绑定</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input [value]='myData'>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> [value]=<span class="hljs-string">'myData'</span>&gt;
</code></pre>
<p>还有其他的，比如样式绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [ngClass]=&quot;{special: isSpecial}&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{special: isSpecial}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<blockquote>
<p>注意点：property和attribute不一样，想要绑定attribute，你需要写成property。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr><td colspan=&quot;"{{"1 + 1"}}"&quot;>Three-Four</td></tr>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">colspan</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"1 + 1"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>Three-Four<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
</span></code></pre>
</blockquote>
<p>你将会得到如下错误信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Template parse errors:
Can't bind to 'colspan' since it isn't a known native property
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Template parse errors:
Can't bind <span class="hljs-keyword">to</span> 'colspan' <span class="hljs-keyword">since</span> <span class="hljs-keyword">it</span> <span class="hljs-keyword">isn't</span> a known native <span class="hljs-keyword">property</span>
</code></pre>
<p>你需要改写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr><td [attr.colspan]=&quot;1 + 1&quot;>One-Two</td></tr>
// 或者
<tr><td attr.colspan=&quot;"{{"1 + 1"}}"&quot;>One-Two</td></tr>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;tr&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">td</span> [<span class="hljs-attr">attr.colspan</span>]=<span class="hljs-string">"1 + 1"</span>&gt;</span>One-Two<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
<span class="hljs-comment">// 或者</span>
&lt;tr&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">attr.colspan</span>=<span class="hljs-string">""{{"1 + 1"}}""</span>&gt;</span>One-Two<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
</code></pre>
<ul><li><p>事件绑定</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input (keyup)='handle($event)' >
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> (keyup)=<span class="hljs-string">'handle($event)'</span> &gt;
</code></pre>
<p>可以是原生的事件：click，change，keydown，mousemove等，也可以是自定义事件，也可以是指令事件，比如<code>ngSubmit</code>。</p>
<ul><li><p>双向绑定</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input [(ngModel)] = 'data'>
// 双向绑定的背后其实是单向绑定和事件触发，等价于下面
<input [ngModel]=&quot;data&quot; (ngModelChange)=&quot;data=$event&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> [(ngModel)] = <span class="hljs-string">'data'</span>&gt;
<span class="hljs-comment">// 双向绑定的背后其实是单向绑定和事件触发，等价于下面</span>
&lt;<span class="hljs-selector-tag">input</span> [ngModel]=<span class="hljs-string">"data"</span> (ngModelChange)=<span class="hljs-string">"data=$event"</span>&gt;
</code></pre>
<blockquote><p>注意点：使用ngModel，需要引入FormsModule模块。</p></blockquote>
<p>还有些内置的指令：</p>
<ul><li><p>模版引用变量（# ／ ref-）</p></li></ul>
<p>可以在元素上用#或者ref-前缀来标记这个元素，然后在其他地方引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input #fax placeholder=&quot;fax number&quot;>
( <input ref-fax placeholder=&quot;fax number&quot;> )
<button (click)=&quot;callFax(fax.value)&quot;>Fax</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> <span class="hljs-selector-id">#fax</span> placeholder=<span class="hljs-string">"fax number"</span>&gt;
( &lt;<span class="hljs-selector-tag">input</span> ref-fax placeholder=<span class="hljs-string">"fax number"</span>&gt; )
&lt;<span class="hljs-selector-tag">button</span> (click)=<span class="hljs-string">"callFax(fax.value)"</span>&gt;Fax&lt;/button&gt;
</code></pre>
<ul><li>
<p>*ngIf：控制内容的有无</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

<div *ngIf=&quot;show&quot;> Can you see this? </div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="axapta">&lt;<span class="hljs-keyword">div</span> *ngIf=<span class="hljs-string">"show"</span>&gt; Can you see <span class="hljs-keyword">this</span>? &lt;/<span class="hljs-keyword">div</span>&gt;
</span></code></pre>
<p>如果还有else部分，可以如下操作：</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div *ngIf=&quot;show; else elseBlock&quot;> Can you see this? </div>
<ng-template #elseBlock>  else block   </ng-template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>&lt;div *ngIf=<span class="hljs-string">"show; else elseBlock"</span>&gt; Can you see <span class="hljs-keyword">this</span>? &lt;/div&gt;
&lt;ng-<span class="hljs-keyword">template</span> #elseBlock&gt;  <span class="hljs-keyword">else</span> block   &lt;/ng-<span class="hljs-keyword">template</span>&gt;</code></pre>
<ul><li><p>*ngFor：循环</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div *ngFor=&quot;let hero of heroes; let i=index> "{{"i"}}"： "{{"hero.name"}}"</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mizar"><code>&lt;div *ngFor="<span class="hljs-keyword">let</span> hero <span class="hljs-keyword">of</span> heroes; <span class="hljs-keyword">let</span> i=index&gt; "{{"i"}}"： "{{"hero.name"}}"&lt;/div&gt;
</code></pre>
<p>具体的模版语法可以参考<a href="https://angular.io/guide/template-syntax" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader7">路由</h2>
<p>一个模块有了多个组件之后，需要用路由来配置哪个url呈现哪个组件。</p>
<p>首先，我们需要在入口页面的index.html中配置根路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
...
<head>
<base href=&quot;/&quot;>
...
</head>
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
...
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>
...
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
...
</code></pre>
<p>然后创建一个路由模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
...

// 路由配置
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">import</span> { NgModule }              from <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { RouterModule, Routes }  from <span class="hljs-string">'@angular/router'</span>;
 
...

<span class="hljs-comment">// 路由配置</span>
const <span class="hljs-string">appRoutes:</span> Routes = [
  { <span class="hljs-string">path:</span> <span class="hljs-string">'home'</span>, <span class="hljs-string">component:</span> HomeComponent },
  { <span class="hljs-string">path:</span> <span class="hljs-string">'heroes'</span>, <span class="hljs-string">component:</span> HeroesComponent },
  { <span class="hljs-string">path:</span> <span class="hljs-string">''</span>,   <span class="hljs-string">redirectTo:</span> <span class="hljs-string">'/home'</span>, <span class="hljs-string">pathMatch:</span> <span class="hljs-string">'full'</span> },
  { <span class="hljs-string">path:</span> <span class="hljs-string">'**'</span>, <span class="hljs-string">component:</span> PageNotFoundComponent }
];
 
<span class="hljs-meta">@NgModule</span>({
<span class="hljs-symbol">  imports:</span> [
    RouterModule.forRoot(appRoutes)
  ],
<span class="hljs-symbol">  exports:</span> [
    RouterModule
  ]
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppRoutingModule</span> {</span>}
</code></pre>
<p>在主模块中导入配置好的路由模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
 
...
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeroesComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { NgModule }       <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { BrowserModule }  <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;
<span class="hljs-keyword">import</span> { FormsModule }    <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/forms'</span>;
 
...
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeroesComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppModule</span> { }</span>
</code></pre>
<p>而在页面中需要一个容器<code> &lt;router-outlet&gt;&lt;/router-outlet&gt;</code>去承载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';
 
@Component({
  selector: 'my-app',
  template: `
    <h1>Angular Router</h1>
    <nav>
      <a routerLink=&quot;/home&quot; routerLinkActive=&quot;active&quot;>Home</a>
      <a routerLink=&quot;/heroes&quot; routerLinkActive=&quot;active&quot;>Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>import { Component } from '@angular/core';
 
@Component({
  selector: 'my-app',
  template: `
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Angular Router<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/home"</span> <span class="hljs-attr">routerLinkActive</span>=<span class="hljs-string">"active"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/heroes"</span> <span class="hljs-attr">routerLinkActive</span>=<span class="hljs-string">"active"</span>&gt;</span>Heroes<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-outlet</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-outlet</span>&gt;</span>
  `
})
export class AppComponent { }
</code></pre>
<p>上面代码中的<code>routerLink</code>定义了用户点击后的路由跳转，<code>routerLinkActive</code>定义该路由激活时的样式类。</p>
<p>路由上还可以带上一些索引参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" { path: 'heroes/:id', component: HeroesComponent },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> { <span class="hljs-attribute">path</span>: <span class="hljs-string">'heroes/:id'</span>, component: HeroesComponent },
</code></pre>
<p>获取的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { ActivatedRoute, Params }   from '@angular/router';

...
export class a {
    constructor( 
      private route: ActivatedRoute 
    ) {}
    
    // 路由参数
    this.route.params
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { ActivatedRoute, Params }   <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

...
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> a {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"> 
      <span class="hljs-keyword">private</span> route: ActivatedRoute 
    </span>) {}
    
    <span class="hljs-comment">// 路由参数</span>
    <span class="hljs-keyword">this</span>.route.params
}
</code></pre>
<p>当模块很多，路由也很多的时候，我们可以使用模块懒加载的方式。懒加载的方式也很简单，在配置路由的时候修改如下即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes: Routes = [
    {    // 默认转到订单管理
        path: '',
        redirectTo: '/order',
        pathMatch: 'full'
     },
    {
        path: 'order',
        loadChildren: './order/order.module#OrderModule'
    },
    {
        path: 'warehouse',
        loadChildren: './warehouse/warehouse.module#WarehouseModule' 
    },
    {
        path: 'statistics/sales',
        component: SalesComponent
    }
];

// 在子模块中用RouterModule.forChild

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { OrderComponent } from './order.component';


const orderRoutes = [
    {
        path:'',
        component: OrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(orderRoutes)],
    exports: [RouterModule]
})

export class OrderRoutingModule {
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> routes: Routes = [
    {    <span class="hljs-comment">// 默认转到订单管理</span>
        path: <span class="hljs-string">''</span>,
        <span class="hljs-attr">redirectTo</span>: <span class="hljs-string">'/order'</span>,
        <span class="hljs-attr">pathMatch</span>: <span class="hljs-string">'full'</span>
     },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'order'</span>,
        <span class="hljs-attr">loadChildren</span>: <span class="hljs-string">'./order/order.module#OrderModule'</span>
    },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'warehouse'</span>,
        <span class="hljs-attr">loadChildren</span>: <span class="hljs-string">'./warehouse/warehouse.module#WarehouseModule'</span> 
    },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'statistics/sales'</span>,
        <span class="hljs-attr">component</span>: SalesComponent
    }
];

<span class="hljs-comment">// 在子模块中用RouterModule.forChild</span>

<span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>; 
<span class="hljs-keyword">import</span> { OrderComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./order.component'</span>;


<span class="hljs-keyword">const</span> orderRoutes = [
    {
        <span class="hljs-attr">path</span>:<span class="hljs-string">''</span>,
        <span class="hljs-attr">component</span>: OrderComponent
    }
];

@NgModule({
    <span class="hljs-attr">imports</span>: [RouterModule.forChild(orderRoutes)],
    <span class="hljs-attr">exports</span>: [RouterModule]
})

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OrderRoutingModule</span> </span>{
}
</code></pre>
<h2 id="articleHeader8">服务与依赖注入</h2>
<p>服务是什么概念？可以简单地认为它是一个功能模块，重要在于它是单例对象，并且可以注入到其他的地方使用。</p>
<p>依赖注入是来自后端的概念，其实就是自动创建一个实例，省去每次需要手动创建的麻烦。</p>
<p>在Angular中定义一个服务很简单，主要在类之前加上<code>@Injectable</code>装饰器的功能。这是最常见的依赖注入方式useClass，其他具体参见<a href="https://angular.io/guide/dependency-injection" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';  

@Injectable() 
export class Service {
    counter: number = 0;
    
    getData(){
        return this.counter++;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> { Injectable } from <span class="hljs-string">'@angular/core'</span>;  

<span class="hljs-meta">@Injectable()</span> 
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Service</span> </span>{
    counter: number = <span class="hljs-number">0</span>;
    
    getData(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.counter++;
    }
}
</code></pre>
<p>然后在模块的<code>providers</code>中声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Service } from './service';
...

@NgModule({
    imports: [
        ...
    ],
    declarations: [
        ...
    ],
    providers: [ Service ],  // 注入服务
    bootstrap: [...]
})
export class AppModule {
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { Service } <span class="hljs-keyword">from</span> <span class="hljs-string">'./service'</span>;
...

@NgModule({
    imports: [
        ...
    ],
    declarations: [
        ...
    ],
    providers: [ Service ],  <span class="hljs-comment">// 注入服务</span>
    bootstrap: [...]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {
} 
</code></pre>
<p>使用的时候需要在构造器中建立关联：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core'; 
import { Service } from './service';
...

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public service: Service) {
        // this.service被成功注入
        // 相当于 this.service = new Service(); 
        // 然后可以调用服务
        this.service.getData();
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>; 
<span class="hljs-keyword">import</span> { Service } <span class="hljs-keyword">from</span> <span class="hljs-string">'./service'</span>;
...

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'my-app'</span>,
    templateUrl: <span class="hljs-string">'./app.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./app.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> service: Service</span>) {
        <span class="hljs-comment">// this.service被成功注入</span>
        <span class="hljs-comment">// 相当于 this.service = new Service(); </span>
        <span class="hljs-comment">// 然后可以调用服务</span>
        <span class="hljs-keyword">this</span>.service.getData();
    }
}
</code></pre>
<p>由于该服务是在模块中注入，所以该模块中的所有组件使用这个服务时，使用的都是同一个实例。    </p>
<p>除了在模块中声明，还可以在组件中声明。假设<code>AppComponent</code>下还有组件<code>HomeComponent</code>，此时我们在<code>AppComponent</code>中注入这个服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core'; 
import { Service } from './service';
...

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ Service ],  // 注入服务
})
export class AppComponent {
    constructor(public service: Service) {
        // this.service被成功注入
        // 相当于 this.service = new Service(); 
        // 然后可以调用服务
        this.service.getData();
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>; 
<span class="hljs-keyword">import</span> { Service } <span class="hljs-keyword">from</span> <span class="hljs-string">'./service'</span>;
...

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'my-app'</span>,
    templateUrl: <span class="hljs-string">'./app.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./app.component.css'</span>],
    providers: [ Service ],  <span class="hljs-comment">// 注入服务</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> service: Service</span>) {
        <span class="hljs-comment">// this.service被成功注入</span>
        <span class="hljs-comment">// 相当于 this.service = new Service(); </span>
        <span class="hljs-comment">// 然后可以调用服务</span>
        <span class="hljs-keyword">this</span>.service.getData();
    }
}
</code></pre>
<p>如果<code>HomeComponent</code>也使用了这个服务，那它使用的将是同一个实例。这个可以从Service中的数据变化来看出。</p>
<p>Angular还有个分层依赖注入的概念，也就是说，你可以为任一组件创建自己独立的服务。就像上面的例子，如果想要<code>HomeComponent</code>不和它的父组件同使用一个服务实例的话，只要在该组件中重新注入即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
...
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ Service ],  // 重新注入服务
})
export class HomeComponent {
    ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>
...
@<span class="hljs-selector-tag">Component</span>({
    <span class="hljs-attribute">selector</span>: <span class="hljs-string">'home'</span>,
    <span class="hljs-attribute">templateUrl</span>: <span class="hljs-string">'./home.component.html'</span>,
    <span class="hljs-attribute">styleUrls</span>: [<span class="hljs-string">'./home.component.css'</span>],
    <span class="hljs-attribute">providers</span>: [ Service ],  <span class="hljs-comment">// 重新注入服务</span>
})
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">class</span> <span class="hljs-selector-tag">HomeComponent</span> {
    ...
}
</code></pre>
<p>对于前后端的接口，通常会写成服务。下面说下请求后端数据这块应该怎么写。在模块这节中提过，http有专门的<code>HttpModule</code>模块处理请求。首先要在模块中导入<code>HttpModule</code>，然后引入http服务，调用相应的请求方法即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
  
import 'rxjs/add/operator/toPromise';
  
 
@Injectable()
export class HttpService {
 
  constructor(private http: Http) {}
 
  getFromServer():any {
    return this.http.get(`/data`)
        .toPromise()
        .then(res => res.json())
        .catch();
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http }       <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;
  
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/toPromise'</span>;
  
 
<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HttpService {
 
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) {}
 
  getFromServer():<span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">`/data`</span>)
        .toPromise()
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
        .catch();
  }
}
</code></pre>
<p>由于请求返回的对象是个可观察对象，可以转成Promise对象处理。这里需要用到RxJS的<code>toPromise</code>操作符，然后用<code>then</code>去处理返回成功结果，<code>catch</code>处理失败情况。这样就搞定了后端数据的请求了。</p>
<p>RxJS又是另外一个比较高深的话题了，有机会深入学习一下再聊。</p>
<h2 id="articleHeader9">指令</h2>
<p>Angular的指令概念跟AngularJS的指令差不多，最重要的区别在于Angular中的组件继承指令，算是特殊的指令。我们看下用指令的方式去写组件的简单例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive,Input,ElementRef } from '@angular/core';

@Directive({
    selector: 'hello'
})
export class HelloDirective { 
    @Input() name: string;

    constructor(private el: ElementRef) {}

    public ngOnInit(): void {
        
        this.el.nativeElement.innerText = `hello ${this.name}!`;
    }
}

// 使用组件指令
<hello name=&quot;Yecao&quot;></hello>

// 渲染结果
<hello> hello, Yecao! </hello>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Directive,Input,ElementRef } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Directive({
    <span class="hljs-attr">selector</span>: <span class="hljs-string">'hello'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloDirective</span> </span>{ 
    @Input() name: string;

    <span class="hljs-keyword">constructor</span>(private el: ElementRef) {}

    public ngOnInit(): <span class="hljs-keyword">void</span> {
        
        <span class="hljs-keyword">this</span>.el.nativeElement.innerText = <span class="hljs-string">`hello <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>!`</span>;
    }
}

<span class="hljs-comment">// 使用组件指令</span>
&lt;hello name=<span class="hljs-string">"Yecao"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span></span>

<span class="hljs-comment">// 渲染结果</span>
&lt;hello&gt; hello, Yecao! <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span></span>
</code></pre>
<p>不要忘记在使用前先在模块中声明哦，我觉得这是Angular最烦人的一点。</p>
<p>除此之外，还有属性指令和结构指令，属性指令只改变元素的样式或者行为。要写成属性指令，需要在<code>selector</code>属性中用<code>[]</code>包裹起来。来看简单地例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, ElementRef, Renderer2 } from '@angular/core';  

@Directive({   
  selector: '[highLight]'  
})  

export class HighLightDirective {    
  constructor(private el: ElementRef, private renderer2: Renderer2) { }    
  
  ngAfterViewInit() {   
    this.renderer2.addClass(this.el.nativeElement, 'highlight');   
  }  
}

// 使用属性指令
<p highLight> 这一段会高亮显示 </p>
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> { Directive, ElementRef, Renderer2 } from <span class="hljs-string">'@angular/core'</span>;  

<span class="hljs-meta">@Directive({   
  selector: <span class="hljs-meta-string">'[highLight]'</span>  
})</span>  

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HighLightDirective</span> </span>{    
  <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">private</span> el: ElementRef, <span class="hljs-keyword">private</span> renderer2: Renderer2) { }    
  
  ngAfterViewInit() {   
    <span class="hljs-keyword">this</span>.renderer2.addClass(<span class="hljs-keyword">this</span>.el.nativeElement, <span class="hljs-string">'highlight'</span>);   
  }  
}

<span class="hljs-comment">// 使用属性指令</span>
&lt;p highLight&gt; 这一段会高亮显示 &lt;/p&gt;
 </code></pre>
<p>结构指令就是模板中提到的<em>ngIf，</em>ngFor等指令，它修改了DOM结构。举个例子，重写*ngIf：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';   

@Directive({   
  selector: '[myIf]'  
})  

export class MyIfDirective {    

  constructor(private templateRef: TemplateRef<any>,   
      private viewContainer: ViewContainerRef) { }   

  @Input() set appMyIf(condition: boolean) {   
    if (condition) {   
      this.viewContainer.createEmbeddedView(this.templateRef);   
    } else {   
      this.viewContainer.clear();   
    }   
  }  
}  

// 使用结构指令
<p *myIf=&quot;false&quot;> 这一段不会显示 </p> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> { Directive, Input, ViewContainerRef, TemplateRef } from <span class="hljs-string">'@angular/core'</span>;   

<span class="hljs-meta">@Directive({   
  selector: <span class="hljs-meta-string">'[myIf]'</span>  
})</span>  

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyIfDirective</span> </span>{    

  <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">private</span> templateRef: TemplateRef&lt;any&gt;,   
      <span class="hljs-keyword">private</span> viewContainer: ViewContainerRef) { }   

  <span class="hljs-meta">@Input()</span> <span class="hljs-keyword">set</span> appMyIf(condition: boolean) {   
    <span class="hljs-keyword">if</span> (condition) {   
      <span class="hljs-keyword">this</span>.viewContainer.createEmbeddedView(<span class="hljs-keyword">this</span>.templateRef);   
    } <span class="hljs-keyword">else</span> {   
      <span class="hljs-keyword">this</span>.viewContainer.clear();   
    }   
  }  
}  

<span class="hljs-comment">// 使用结构指令</span>
&lt;p *myIf=<span class="hljs-string">"false"</span>&gt; 这一段不会显示 &lt;/p&gt; 
</code></pre>
<h2 id="articleHeader10">管道（过滤器）</h2>
<p>管道其实就是过滤器，就是叫法不一致而已。主要用于格式化源数据，而不改变源数据。定义和使用的方式也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Pipe, PipeTransform } from '@angular/core'; 

/*
 * 订单取消状态：默认为ALL表示全部，CANCEL表示已取消，NOTCANCEL表示正常
*/
@Pipe({ name: 'cancelStatus' })
export class CancelStatusPipe implements PipeTransform {
    transform(status:string, blank: boolean):string {
         const map = {
             &quot;ALL&quot;: &quot;全部&quot;, 
             &quot;NOTCANCEL&quot;: &quot;正常&quot;,
             &quot;CANCEL&quot;: &quot;已取消&quot;,
              &quot;&quot;: &quot;暂无&quot;,  
         }

         return blank? '特殊情况': map[status];
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">import</span> { Pipe, PipeTransform } from <span class="hljs-string">'@angular/core'</span>; 

<span class="hljs-comment">/*
 * 订单取消状态：默认为ALL表示全部，CANCEL表示已取消，NOTCANCEL表示正常
*/</span>
<span class="hljs-meta">@Pipe</span>({ <span class="hljs-string">name:</span> <span class="hljs-string">'cancelStatus'</span> })
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CancelStatusPipe</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">PipeTransform</span> {</span>
    transform(<span class="hljs-string">status:</span>string, <span class="hljs-string">blank:</span> <span class="hljs-keyword">boolean</span>):string {
         const map = {
             <span class="hljs-string">"ALL"</span>: <span class="hljs-string">"全部"</span>, 
             <span class="hljs-string">"NOTCANCEL"</span>: <span class="hljs-string">"正常"</span>,
             <span class="hljs-string">"CANCEL"</span>: <span class="hljs-string">"已取消"</span>,
              <span class="hljs-string">""</span>: <span class="hljs-string">"暂无"</span>,  
         }

         <span class="hljs-keyword">return</span> blank? '特殊情况': map[status];
    }
}
</code></pre>
<p>使用前记得在模块的<code>declarations</code>声明，或者导到共享模块，在共享模块中导出去。使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" &quot;ALL&quot; | cancelStatus "}}"  // 全部
"{{" &quot;ALL&quot; | cancelStatus: true "}}"  // 特殊情况
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>"{{" <span class="hljs-string">"ALL"</span> | cancelStatus "}}"  <span class="hljs-comment">// 全部</span>
"{{" <span class="hljs-string">"ALL"</span> | <span class="hljs-string">cancelStatus:</span> <span class="hljs-literal">true</span> "}}"  <span class="hljs-comment">// 特殊情况</span>
</code></pre>
<p>Angular内置了一些管道：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 日期 DatePipe
"{{" expression | date:&quot;MM/dd/yy&quot; "}}" 

// 数字 DecimalPipe,digitInfo的组成 {minIntegerDigits}.{minFractionDigits}-{maxfractionDigits}
// minIntegerDigits：整数部分保留最小的位数，默认值为1.
// minFractionDigits：小数部分保留最小的位数，默认值为0.
// maxFractionDigits：小数部分保留最大的位数，默认值为3.
"{{" expression | number[:digitInfo] "}}"

// 大写
"{{" expression | uppercase "}}"

// 小写
"{{" expression | lowercase "}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// 日期 DatePipe</span>
"{{" <span class="hljs-keyword">expression</span> | <span class="hljs-keyword">date</span>:<span class="hljs-string">"MM/dd/yy"</span> "}}" 

<span class="hljs-comment">// 数字 DecimalPipe,digitInfo的组成 {minIntegerDigits}.{minFractionDigits}-{maxfractionDigits}</span>
<span class="hljs-comment">// minIntegerDigits：整数部分保留最小的位数，默认值为1.</span>
<span class="hljs-comment">// minFractionDigits：小数部分保留最小的位数，默认值为0.</span>
<span class="hljs-comment">// maxFractionDigits：小数部分保留最大的位数，默认值为3.</span>
"{{" <span class="hljs-keyword">expression</span> | number[:digitInfo] "}}"

<span class="hljs-comment">// 大写</span>
"{{" <span class="hljs-keyword">expression</span> | uppercase "}}"

<span class="hljs-comment">// 小写</span>
"{{" <span class="hljs-keyword">expression</span> | lowercase "}}"
</code></pre>
<h2 id="articleHeader11">后语</h2>
<p>由于篇幅的限制，Angular的每个特性都点到为止，只是讲了一些基本概念和使用方法（我也只会这点而已），让你在项目中会用。还有一块项目中肯定会用到的是表单及其校验，这是个大头，还是放在下一篇单独拎出来说吧。</p>
<p>如果你看到了这里，谢谢你花了那么多时间阅读。最近刚淘了视频，出自<a href="https://www.udemy.com/the-complete-guide-to-angular-2/" rel="nofollow noreferrer" target="_blank">这里</a>。 跟大家分享一下，链接: <a href="http://pan.baidu.com/s/1c2CGkVY" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1c2CGkVY</a> 密码: xwg6。</p>
<p>整体来说，接触Angular2不到一个月的时候，现在项目开发中。简单说下我的学习路径：</p>
<ul>
<li><p>大致浏览了下有关Angular2的文章，跟Angular1的比较，有个大体的印象</p></li>
<li><p>看参考资料中的几个视频教程，我觉得蛮不错的，让我对Angular2有个整体的概念</p></li>
<li><p>参考官网教程做了一下英雄展示板的例子</p></li>
<li><p>开始上手开发，边开发边去看文档</p></li>
<li><p>开发的时候可以尝试一些新的知识点，比如多模块，共享模块，路由懒加载，自定义表单验证指令，响应式表单，ngrx状态管理等等</p></li>
<li><p>总结输出，也就是现在在写的这边博客</p></li>
</ul>
<p>参考资料</p>
<ul>
<li><p><a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">Angular官网（英文）</a></p></li>
<li><p><a href="https://cli.angular.io/" rel="nofollow noreferrer" target="_blank">Angular Cli</a></p></li>
<li><p><a href="https://angular.cn/" rel="nofollow noreferrer" target="_blank">Angular官网（中文）</a></p></li>
<li><p><a href="https://angular.cn/docs/ts/latest/tutorial/" rel="nofollow noreferrer" target="_blank">官网英雄展示板例子</a></p></li>
<li><p><a href="http://www.shikezhi.com/html/2016/angularjs_0929/1221189.html" rel="nofollow noreferrer" target="_blank">英文视频教程</a></p></li>
<li><p><a href="http://www.imooc.com/learn/789" rel="nofollow noreferrer" target="_blank">Angular2一小时快速入门</a></p></li>
<li><p><a href="https://www.youtube.com/channel/UC6cY3GTGIk4-ahaIRj7Bk-Q" rel="nofollow noreferrer" target="_blank">大漠穷秋 Angular2 0视频教程</a></p></li>
<li><p><a href="http://www.jsout.com/page/420.html" rel="nofollow noreferrer" target="_blank">angularjs 1 和 2区别,这才是Angular2的灵魂！</a></p></li>
<li><p><a href="https://juejin.im/post/5860ee191b69e6006ce1347b" rel="nofollow noreferrer" target="_blank">Redux你的Angular 2应用--ngRx使用体验</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009674089#articleHeader14">Angular 4 指令快速入门</a></p></li>
</ul>
<p>本文首发于<a href="https://wufenfen.github.io/2017/07/03/Angular4%E7%AE%80%E5%8D%95%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B0/" rel="nofollow noreferrer" target="_blank">野草园</a>，转载请注明出处。不当之处，欢迎批评指正！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4 简单入门笔记

## 原文链接
[https://segmentfault.com/a/1190000010048663](https://segmentfault.com/a/1190000010048663)

