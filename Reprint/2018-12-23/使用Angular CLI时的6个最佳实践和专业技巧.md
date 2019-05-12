---
title: '使用Angular CLI时的6个最佳实践和专业技巧' 
date: 2018-12-23 2:30:07
hidden: true
slug: umea266j45d
categories: [reprint]
---

{{< raw >}}

                    
<p>使用Angular CLI开发angular应用程序是一种非常愉快的体验！Angular团队为我们提供了令人惊叹的CLI，它支持了任何重要项目开箱即用所需的大部分东西。</p>
<p>规范化的项目结构与全面的测试能力（包括单元测试和端到端测试），脚手架，支持使用特定的环境配置去构建产品。这在构建每一个新项目时候节约了大量时间。感谢Angular团队！?</p>
<p>虽然Angular CLI的工作的很好，但我们可以利用一些潜在的配置和最佳实践使我们的项目更好！</p>
<h4>我们将要学习什么？</h4>
<ol>
<li>具有Core(核心)，Shared(共享)，lazy-loaded Feature modules(延迟加载功能模块)体系结构的最佳实践</li>
<li>为app和environments文件夹使用别名来支持更干净的导入</li>
<li>为什么和如何使用Sass ，Angular Material</li>
<li>如何组织好的产品构建方式</li>
<li>如何向PhantomJS说再见以及使用Headless Chrome来替代(测试)</li>
<li>如何发布我们的项目通过自动生成更新日志和正确的版本号</li>
</ol>
<h3 id="articleHeader0">1. 关于项目的的文件结构</h3>
<blockquote><p>好的, 我们使用Angular CLI生成了新的项目，但是现在呢？我们应该继续在一些随机文件夹生成我们的服务和组件吗？我们应该如何组织我们的项目？</p></blockquote>
<p>一个好的指导原则应该是遵循将应用程序分成至少三个不同的模块： Core(核心模块), Shared(共享模块) 和 Feature(功能模块) (不过我们可能需要更多的功能模块。?).</p>
<h4>核心模块</h4>
<p>所有服务都应该在核心模块实现。典型的例子比如认证服务或用户服务。让我们看个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 3rd party libraries */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/* our own custom services  */
import { SomeSingletonService } from './some-singleton/some-singleton.service';

@NgModule({
  imports: [
    /* 3rd party libraries */
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    /* our own custom services  */
    SomeSingletonService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 3rd party libraries */</span>
<span class="hljs-keyword">import</span> { NgModule, Optional, SkipSelf } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CommonModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common'</span>;
<span class="hljs-keyword">import</span> { HttpClientModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;

<span class="hljs-comment">/* our own custom services  */</span>
<span class="hljs-keyword">import</span> { SomeSingletonService } <span class="hljs-keyword">from</span> <span class="hljs-string">'./some-singleton/some-singleton.service'</span>;

@NgModule({
  <span class="hljs-attr">imports</span>: [
    <span class="hljs-comment">/* 3rd party libraries */</span>
    CommonModule,
    HttpClientModule,
  ],
  <span class="hljs-attr">declarations</span>: [],
  <span class="hljs-attr">providers</span>: [
    <span class="hljs-comment">/* our own custom services  */</span>
    SomeSingletonService
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CoreModule</span> </span>{
  <span class="hljs-comment">/* make sure CoreModule is imported only by one NgModule the AppModule */</span>
  <span class="hljs-keyword">constructor</span> (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    <span class="hljs-keyword">if</span> (parentModule) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'CoreModule is already loaded. Import only in AppModule'</span>);
    }
  }
}</code></pre>
<h4>共享模块</h4>
<p>所有的“dumb(哑)”组件和管道都应该在这里实现。这些组件不能从核心模块或其他特性模块的构造函数中的导入和注入服务。它们应该使用组件的模板中的属性接收所有数据。这一切都归结到这一事实，SharedModule(共享模块)没有任何依赖于我们的应用程序的其余部分。</p>
<p>这也是导入和重新导入Angular Material 组件库的完美场所。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { MdButtonModule } from '@angular/material';

/* our own custom components */
import { SomeCustomComponent } from './some-custom/some-custom.component';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule,

    /* 3rd party components */
    MdButtonModule,
  ],
  declarations: [
    SomeCustomComponent
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,

    /* 3rd party components */
    MdButtonModule,

    /* our own custom components */
    SomeCustomComponent
  ]
})
export class SharedModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 3rd party libraries */</span>
<span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CommonModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common'</span>;
<span class="hljs-keyword">import</span> { FormsModule  } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/forms'</span>;
<span class="hljs-keyword">import</span> { MdButtonModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/material'</span>;

<span class="hljs-comment">/* our own custom components */</span>
<span class="hljs-keyword">import</span> { SomeCustomComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./some-custom/some-custom.component'</span>;

@NgModule({
  <span class="hljs-attr">imports</span>: [
    <span class="hljs-comment">/* angular stuff */</span>
    CommonModule,
    FormsModule,

    <span class="hljs-comment">/* 3rd party components */</span>
    MdButtonModule,
  ],
  <span class="hljs-attr">declarations</span>: [
    SomeCustomComponent
  ],
  <span class="hljs-attr">exports</span>: [
    <span class="hljs-comment">/* angular stuff */</span>
    CommonModule,
    FormsModule,

    <span class="hljs-comment">/* 3rd party components */</span>
    MdButtonModule,

    <span class="hljs-comment">/* our own custom components */</span>
    SomeCustomComponent
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SharedModule</span> </span>{ }</code></pre>
<h4>如何使用Angular CLI编写项目结构</h4>
<p>我们可以在创建新项目后立即生成核心和共享模块。这样，我们就可以从一开始就准备生成额外的组件和服务。</p>
<p>运行命令<code>ng generate module core</code>生成核心模块。然后在<code>core</code>文件夹创建index.ts文件，再重新导出<code>CoreModule</code>。我们将重新导出额外的公共服务，这些服务在整个开发过程中都可以使用。 </p>
<p>完成后，我们可以对shared module(共享模块)执行同样的操作。</p>
<h4>功能模块</h4>
<p>我们将为应用程序的每一个独立特性创建多个功能模块。Feature modules(功能模块)应该只能从CoreModule导入服务。如果功能模块A需要从功能模块B导入服务，可以考虑将该服务迁移到CoreModule。</p>
<blockquote><p>在某些情况下，需要只是某些功能模块共享的服务，将它们移动到核心是没有意义的。在这种情况下，我们可以创建特殊的共享功能模块，如本文后面所述。</p></blockquote>
<blockquote><p>经验法则是： 我们创建的功能模块尽量不依赖其他功能模块，仅仅服务由CoreModule提供，组件由SharedModule提供</p></blockquote>
<p>这将保持我们的代码干净，易于维护和扩展的新功能。它还减少了重构所需的工作量。如果遵循得当，我们将确信对一个功能的更改不会影响或破坏我们的应用程序的其余部分。</p>
<h4>延迟加载</h4>
<p>我们应该尽可能延迟加载我们的功能模块。理论上，只有一个功能模块应该在应用程序启动时同步加载以显示初始内容。每个其他功能模块应该在用户触发导航后缓慢加载。</p>
<h3 id="articleHeader1">2. app 和 environments 的别名使用</h3>
<p>我们的app 和 environments文件夹使用别名将使我们能够实现干净的导入，在我们的应用程序这将是一致的。</p>
<p>假设，但通常情况。我们正在研究一个组件，它位于功能模块A中的三个文件夹深处，我们希望从核心模块中导入位于两个文件夹深处的服务。这将导致导入声明看起来有点像<code>import { SomeService } from '../../../core/subpackage1/subpackage2/some.service'</code>。</p>
<p>绝对不是最干净的导入申明…</p>
<p>更糟糕的是，每当我们想改变这两个文件中任何一个的位置时，我们的导入语句都会中断。相比之下，更短的导入申明<code>import { SomeService } from "@app/core"</code>。看起来更好，不是吗？</p>
<p>能够使用别名必须添加URL地址和路径属性，我们<code>tsconfig.json</code>文件像这样…</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;...&quot;: &quot;reduced for brevity&quot;,
    
    &quot;baseUrl&quot;: &quot;src&quot;,
    &quot;paths&quot;: {
      &quot;@app/*&quot;: [&quot;app/*&quot;],
      &quot;@env/*&quot;: [&quot;environments/*&quot;]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"..."</span>: <span class="hljs-string">"reduced for brevity"</span>,
    
    <span class="hljs-attr">"baseUrl"</span>: <span class="hljs-string">"src"</span>,
    <span class="hljs-attr">"paths"</span>: {
      <span class="hljs-attr">"@app/*"</span>: [<span class="hljs-string">"app/*"</span>],
      <span class="hljs-attr">"@env/*"</span>: [<span class="hljs-string">"environments/*"</span>]
    }
  }
}</code></pre>
<blockquote><p>我们还添加了<code>@env</code>别名，以便能够从<code>import { environment } from "@env/environment"</code>中使用同一个导入申明轻松地从应用程序的任何地方访问环境变量。它将为所有指定的<code>environments</code>工作，因为它将根据传递给<code>ng build</code>命令的<code>--env</code>标志自动解析正确的环境配置文件。</p></blockquote>
<p>通过我们的路径，我们现在可以像这样导入environment 和 services …</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 3rd party libraries */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/* globally accessible app code (in every feature module) */
import { SomeSingletonService } from '@app/core';
import { environment } from '@env/environment';

/* localy accessible feature module code, always use relative path */
import { ExampleService } from './example.service';

@Component({
  /* ... */
})
export class ExampleComponent implements OnInit {
  constructor(
    private someSingletonService: SomeSingletonService,
    private exampleService: ExampleService
  ) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 3rd party libraries */</span>
<span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Observable } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/Observable'</span>;

<span class="hljs-comment">/* globally accessible app code (in every feature module) */</span>
<span class="hljs-keyword">import</span> { SomeSingletonService } <span class="hljs-keyword">from</span> <span class="hljs-string">'@app/core'</span>;
<span class="hljs-keyword">import</span> { environment } <span class="hljs-keyword">from</span> <span class="hljs-string">'@env/environment'</span>;

<span class="hljs-comment">/* localy accessible feature module code, always use relative path */</span>
<span class="hljs-keyword">import</span> { ExampleService } <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.service'</span>;

@Component({
  <span class="hljs-comment">/* ... */</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{
  <span class="hljs-keyword">constructor</span>(
    private someSingletonService: SomeSingletonService,
    private exampleService: ExampleService
  ) {}
}</code></pre>
<p>在上面的例子中，你也许注意到我们直接导入服务<code>SomeSingletonService</code>是通过<code>@app/core</code>，代替了<code>@app/core/some-package/some-singleton.service</code>。这得感谢核心模块的入口文件index.ts重新导出了每一个公共实体。我们在每一个包(文件夹)都创建了一个文件index.ts，它看起来像这样...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export * from './core.module';
export * from './auth/auth.service';
export * from './user/user.service';
export * from './some-singleton-service/some-singleton.service';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">'./core.module'</span>;
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">'./auth/auth.service'</span>;
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">'./user/user.service'</span>;
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">'./some-singleton-service/some-singleton.service'</span>;</code></pre>
<p>在大多数的应用程序中，特殊功能模块的组件和服务的通常只需要访问服务的 CoreModule 和组件的SharedModule。有时这可能不足以解决特定的业务情况，我们还需要某种“shared feature module(共享功能模块)”，它为其他功能模块的有限子集提供功能。</p>
<p>在这种情况下，我们将得到类似的东西<code>import { SomeService } from '@app/shared-feature';</code>。和核心模块一样，共享功能模块使用别名<code>@app</code>进行访问。</p>
<p><span class="img-wrap"><img data-src="/img/bVZTwX?w=800&amp;h=501" src="https://static.alili.tech/img/bVZTwX?w=800&amp;h=501" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">3. 使用SASS</h3>
<p>SASS是一个CSS的预处理器，支持有趣的东西，像variables(尽管CSS将要实现变量），functions，mixin等等。</p>
<p>SASS在<a href="https://material.angular.io/" rel="nofollow noreferrer" target="_blank">Angular Material Components</a>官方库的多主题中进行有效的使用。项目中默认选择使用SASS可以假设是安全的。</p>
<p>为了使用SASS我们在使用Angular CLI生成我们的项目时候必须用命令<code>ng new command --style scss </code>。这就设置了大部分必须的配置。默认情况下不添加<code>stylePreprocessorOptions includePaths</code>，我们可以自己设置成根目录 "./" 和 可选的 "./themes"。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;apps&quot;: [
    {
      &quot;...&quot;: &quot;reduced for brevity&quot;,
      
      &quot;stylePreprocessorOptions&quot;: {
        &quot;includePaths&quot;: [&quot;./&quot;, &quot;./themes&quot;]
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"apps"</span>: [
    {
      <span class="hljs-attr">"..."</span>: <span class="hljs-string">"reduced for brevity"</span>,
      
      <span class="hljs-attr">"stylePreprocessorOptions"</span>: {
        <span class="hljs-attr">"includePaths"</span>: [<span class="hljs-string">"./"</span>, <span class="hljs-string">"./themes"</span>]
      }
    }
  ]
}</code></pre>
<p>这有助于我们的编辑器找到导入标志，并且通过Angular Material的变量和工具函数的代码完成来增强开发人员的体验。</p>
<blockquote><p>When theming Angular Material apps it’s a good practice to extract theme definitions into separate themes folder, one theme per file.</p></blockquote>
<h3 id="articleHeader3">4. 应用产品构建</h3>
<p>Angular CLI声称的项目只提供了一个非常简单开箱即用的构建脚本<code>ng build</code>。为了生成产品级的工件，我们必须自己做一些定制。</p>
<p>我们在package.json中添加脚本<code>"build:prod": "ng build --target production --build-optimizer --vendor-chunk"</code> 。</p>
<h4>Target Production</h4>
<p>这是一个标志能使代码压缩，以及还有很多默认的有用的构建标志。使用如下：</p>
<ul>
<li>--environment prod —使用 environment.prod.ts 文件设置环境变量</li>
<li>--aot —预编译，提前编译. 这将在未来的Angular CLI是默认设置，但是现在我们必须手动启动。</li>
<li>--output-hashing all — 将生成的文件的散列内容添加到文件名中，以方便浏览器缓存破坏（文件内容的任何更改都会导致不同的哈希值，因此浏览器被迫加载新版本的文件）</li>
<li>--extract-css true — 将所有的css提取到到单独的样式表文件</li>
<li>--sourcemaps false — 禁用source maps的生成</li>
<li>--named-chunks false — 禁用使用可读的名字，用数字替代</li>
</ul>
<h4>Other useful flags</h4>
<ul>
<li>--build-optimizer — 新的功能，导致更小的捆绑，但更长的构建时间，所以慎用！（将来也应该默认启用）</li>
<li>--vendor-chunk — 将所有第三方（库）代码提取到单独的块中</li>
</ul>
<p>去<a href="https://github.com/angular/angular-cli/wiki/build" rel="nofollow noreferrer" target="_blank">官方文档</a>检查其他有用的配置项，也许在个人项目中用得上。</p>
<h3 id="articleHeader4">5. Phantom JS 死了! Headless Chrome 永存!</h3>
<p>PhantomJS是一个非常著名的无头的浏览器。这是事实上的解决方案，在CI服务器和许多开发机器上运行前端测试。</p>
<p>虽然有好的，这是现代ECMAScript支持滞后。更重要的是，它是不规范的行为，在许多情况下导致头痛，当测试通过本地没有问题，但他们仍然在CI环境出现问题。</p>
<p>幸运的是，我们不再需要处理它了！</p>
<p><span class="img-wrap"><img data-src="/img/bVZTZG?w=1000&amp;h=692" src="https://static.alili.tech/img/bVZTZG?w=1000&amp;h=692" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>就像<a href="https://developers.google.com/web/updates/2017/04/headless-chrome" rel="nofollow noreferrer" target="_blank">官方文档</a>说的一样…</p>
<blockquote><p>Headless Chrome 是在Chrome 59上运行。这是在Headless环境下运行Chrome浏览器的一种方式。本质上，运行没有Chrome的Chrome！它将Chrome和闪烁渲染引擎提供的所有现代Web平台特性带到命令行。</p></blockquote>
<p><em>很棒，那我们在Angular CLI上使用它呢？</em></p>
<p>我们在package.json上添加脚本<code>"test": "ng test --browser ChromeHeadless --single-run"</code> 和 <code>"watch": "ng test --browser ChromeHeadless"</code></p>
<p>很简单，对吧！</p>
<h3 id="articleHeader5">6. 使用标准的提交信息 &amp; 自动生成更新日志</h3>
<p>对我们感兴趣的项目的新特性和bug修复有一个快速概述总是很棒的。</p>
<p><strong><em>让我们为用户提供同样的便利！</em></strong></p>
<p>手动写更改日志将是极其繁琐，而且容易出错的任务，所以它最好是自动化的过程。有很多可用的工具可以做这项工作，但是让我们看下<a href="https://github.com/conventional-changelog/standard-version" rel="nofollow noreferrer" target="_blank">standard-version</a>。</p>
<p>这个工具根据<a href="https://conventionalcommits.org/" rel="nofollow noreferrer" target="_blank">Conventional Commits specification</a>把所有提交自动生成和更新changelog.md文件，并且正确地确定我们项目的新版本。</p>
<p>常规提交定义了强制类型、可选（范围）：其次是提交消息。还可以添加可选的正文和页脚，它们都由空行分隔。让我们来看看<a href="https://github.com/tomastrajan/ngx-model" rel="nofollow noreferrer" target="_blank">ngx-model</a>库所有提交信息的一个实践例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fix(dependency): multiple versions of rxjs in single project (TS90010)

BREAKING CHANGE: rxjs is now peerDependency instead of dependency

closes #1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">fix(dependency)</span>: multiple versions of rxjs in single project (TS90010)

<span class="mipsasm"><span class="hljs-keyword">BREAKING </span>CHANGE: rxjs is now peerDependency <span class="hljs-keyword">instead </span>of dependency

<span class="hljs-keyword">closes </span><span class="hljs-comment">#1</span></span></code></pre>
<p>标准版本将正确地撞击(bump)项目的主要版本，因为在提交主体中存在着BREAKING CHANGE关键字。</p>
<p>生成的 CHANGELOG.md 文件将像这个样子….</p>
<p><span class="img-wrap"><img data-src="/img/bVZVOZ?w=800&amp;h=472" src="https://static.alili.tech/img/bVZVOZ?w=800&amp;h=472" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看起来很好！那么我们如何在我们的项目中使用它呢？</p>
<p>首先我们需要通过命令<code>npm install -D standard-version</code>安装到<code>devDependencies </code>，然后添加脚本<code>"release": "standard-version"</code>到package.json文件中。</p>
<p>我们也可以通过<code>git push</code>和<code>npm publish</code>使整个过程自动化。本例子中使用脚本<code>"release": "standard-version &amp;&amp; git push — follow-tags origin master &amp;&amp; npm publish"</code>。</p>
<blockquote><p>注意我们使用&amp;&amp;链接命令是平台相关的，只能在基于Unix的系统上（因此也对Windows Cygwin，gitbash，或新的win10）。</p></blockquote>
<h3 id="articleHeader6">附赠 Use resource root (Intellij IDEA, Webstorm only)</h3>
<p>IntelliJ IDEA永远不会找到所有默认情况下(带有错误的标记和残废的红色代码)的路径。幸运的是，解决方案非常简单。只需选择SRC文件夹并将其标记为Sources Root。</p>
<p><span class="img-wrap"><img data-src="/img/bVZVVY?w=800&amp;h=694" src="https://static.alili.tech/img/bVZVVY?w=800&amp;h=694" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">很棒! 你终于读完了它!</h3>
<p>我希望你能找到一些有用的技巧和最佳实践！请支持这篇文章，以便向更多的受众传播这些建议！</p>
<h3 id="articleHeader8">参考资源</h3>
<hr>
<ul><li><a href="https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81" rel="nofollow noreferrer" target="_blank">6 Best Practices &amp; Pro Tips when using Angular CLI</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Angular CLI时的6个最佳实践和专业技巧

## 原文链接
[https://segmentfault.com/a/1190000012330491](https://segmentfault.com/a/1190000012330491)

