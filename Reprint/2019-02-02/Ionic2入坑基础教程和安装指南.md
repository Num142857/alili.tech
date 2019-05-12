---
title: 'Ionic2入坑基础教程和安装指南' 
date: 2019-02-02 2:30:11
hidden: true
slug: 5n6e7oj31zb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">安装Ionic</h1>
<p>Ionic 2 程序主要通过Ionic命令行工具<code>CLI</code>来创建和开发，并使用<code>Cordova</code>来构建和部署为原生应用程序。也就是说我们需要先安装一些工具来实现程序开发。</p>
<h2 id="articleHeader1">安装Ionic CLI 和 Cordova</h2>
<p>要创建 Ionic 2 项目，你需要安装最新版本的 <code>CLI</code> 和 <code>Cordova</code>。在此之前你需要安装最新版本的<code>Node.js</code>。<a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">点这里</a> 下载安装<code>Node.js</code>，然后继续安装<code>Ionic CLI</code>和<code>Cordova</code>来进行应用程序开发：</p>
<p><em>安装 Ionic</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g ionic" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g ionic</code></pre>
<p><em>安装 Cordova</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g cordova" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g cordova</code></pre>
<blockquote><p>命令前面可能需要添加<code>sudo</code>提权来进行全局安装。</p></blockquote>
<p>安装完成后来创建你的第一个 Ionic 应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ionic start cutePuppyPics --v2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">ionic <span class="hljs-built_in">start</span> cutePuppyPics <span class="hljs-comment">--v2</span></code></pre>
<blockquote><p><code>cutePuppyPics</code>可以替换成你的应用程序名称。<code>--v2</code>表示当前生成的是 Ionic 2 版本的应用，不添加则生成 Ionic 1 应用。</p></blockquote>
<p>创建完成后<code>cd</code>到你的程序目录中，执行<code>ionic serve</code>来启动你的Ionic应用，并确保测试在浏览器中能够正常显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd cutePuppyPics
ionic serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> cutePuppyPics
ionic serve</code></pre>
<h2 id="articleHeader2">平台指南</h2>
<p>对于那些为iOS和Android构建原生应用程序（大多数人），每个平台都有一定的功能和安装要求，才能充分利用Ionic和Cordova开发。</p>
<p>对于iOS开发人员，请查看<a href="https://cordova.apache.org/docs/en/latest/guide/platforms/ios/" rel="nofollow noreferrer" target="_blank">Cordova iOS平台指南</a>，并按照说明安装或升级Xcode，并注册开发人员帐户，开始为iOS开发应用程序。</p>
<p>对于Android开发人员，请查看<a href="https://cordova.apache.org/docs/en/latest/guide/platforms/android/" rel="nofollow noreferrer" target="_blank">Cordova Android平台指南</a>，并按照说明安装SDK或Android Studio，开始为Android开发应用程序。</p>
<h1 id="articleHeader3">Ionic 2 基础教程</h1>
<p>确保完成之前的安装并测试启动成功。下面我们将启动新的应用程序，添加页面，并在这些页面之间导航等过程。 让我们开始吧！</p>
<h2 id="articleHeader4">启动一个新的Ionic 2应用</h2>
<p>用<code>start</code>命令来创建一个新的Ionic 2应用。别忘了添加<code>--v2</code>来指定这是一个 Ionic 2 的应用程序。再添加一个<code>tutorial</code>参数，指定使用<code>tutorial</code>模版创建该应用。这样一个基于<code>TypeScript</code>的Ionic 2应用就被成功创建了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ionic start MyIonic2Project tutorial --v2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">ionic <span class="hljs-built_in">start</span> MyIonic2Project tutorial <span class="hljs-comment">--v2</span></code></pre>
<blockquote><p>在这个过程中将会下载 Ionic 2 库包，安装所需的npm模块，并为应用配置好Cordova。如果在创建时不指定<code>tutorial</code>参数，ionic默认使用<code> tabs</code>模版来创建应用。</p></blockquote>
<h2 id="articleHeader5">在浏览器中查看应用</h2>
<p>现在你可以<code>cd</code>到创建好的项目文件夹中，使用<code>serve</code>命令在浏览器中预览你的应用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd MyIonic2Project/
ionic serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> MyIonic2Project/
ionic serve</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007131087?w=824&amp;h=354" src="https://static.alili.tech/img/remote/1460000007131087?w=824&amp;h=354" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果成功启动，你将看到上面这样的欢迎界面。</p>
<h1 id="articleHeader6">项目结构</h1>
<p>让我们来剖析一下Ionic 2应用，在我们创建的文件夹中，我们可以看到一个典型的Cordova项目结构。我们可以在其中安装原生插件，并创建平台特定的项目文件。</p>
<h2 id="articleHeader7">./src/index.html</h2>
<p><code>src/index.html</code>是 Ionic 2 应用的主入口文件，其目的是设置脚本和CSS引导，然后开始运行我们的应用程序。 我们不会在这个文件中花费大量的时间。</p>
<p>为了让应用正常运作，Ionic 2 会在HTML中寻找<code>&lt;ion-app&gt;</code>标记。 在这个例子中，我们有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-app></ion-app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;ion-app&gt;</span><span class="hljs-section">&lt;/ion-app&gt;</span></code></pre>
<p>并且在下方我们还能看到这样的脚本引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <script src=&quot;cordova.js&quot;></script>
  <script src=&quot;build/polyfills.js&quot;></script>
  <script src=&quot;build/main.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"cordova.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"build/polyfills.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"build/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul>
<li><p><code>cordova.js</code>是Cordova应用的需求文件，我们在开发过程中这个文件将会提示404错误，这不需要担心。Cordova将会在构建过程中自动注入这个文件。</p></li>
<li><p><code>build/polyfills.js</code> 是在构建过程中自动生成的，我们不需要过多关注。</p></li>
<li><p><code>build/main.js</code>是一个包含了Ionic, Angular和你的JS脚本的文件。</p></li>
</ul>
<h2 id="articleHeader8">./src/app/app.component.ts</h2>
<p>在<code>app</code>文件夹中能找到我们的预编译代码。这是Ionic 2应用程序的大部分工作起始的地方。当我们运行<code>ionic serve</code>时，<code>app</code>中的代码将被编译成当前浏览器能够执行的javascript版本（当前是ES5）。也就是说我们可以使用TypeScript或更高级别的 ES6+ 进行开发，而在编译时会自动降级为浏览器可识别的版本。</p>
<p><code>app.component.ts</code> 是应用的入口文件。</p>
<p>在文件中我们能够看到这样的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  constructor(
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-meta">@Component({
  templateUrl: <span class="hljs-meta-string">'app.html'</span>
})</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyApp</span> </span>{
  <span class="hljs-keyword">constructor</span>(
  )
}</code></pre>
<p>每个应用程序都有一个根组件，用于控制应用程序的其余部分。这跟Ionic 1和Angular 1中的<code>ng-app</code>非常相似。原先的启动配置被放倒了<code>app.module.ts</code>文件中。</p>
<p>在这个组件中，我们设置了模版文件<code>app.html</code>，下面我们来看一下这个文件。</p>
<h2 id="articleHeader9">./src/app/app.html</h2>
<p><code>app.html</code>里是我们应用的主模版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-menu [content]=&quot;content&quot;>

  <ion-header>
    <ion-toolbar>
      <ion-title>Pages</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <button ion-item *ngFor=&quot;let p of pages&quot; (click)=&quot;openPage(p)&quot;>
        "{{"p.title"}}"
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<ion-nav [root]=&quot;rootPage&quot; #content swipeBackEnabled=&quot;false&quot;></ion-nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ion-menu</span> [<span class="hljs-attr">content</span>]=<span class="hljs-string">"content"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">ion-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-toolbar</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ion-title</span>&gt;</span>Pages<span class="hljs-tag">&lt;/<span class="hljs-name">ion-title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ion-toolbar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ion-header</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">ion-content</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-list</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ion-item</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let p of pages"</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"openPage(p)"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"p.title"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ion-list</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ion-content</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">ion-menu</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ion-nav</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">"rootPage"</span> #<span class="hljs-attr">content</span> <span class="hljs-attr">swipeBackEnabled</span>=<span class="hljs-string">"false"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ion-nav</span>&gt;</span></span></code></pre>
<p>在这个模板中，我们设置了一个<code>ion-menu</code>作为侧面菜单，然后一个<code>ion-nav</code>组件作为主要内容区域。<code>ion-menu</code>菜单的<code>[content]</code>属性绑定到了我们<code>ion-nav</code>的本地变量<code>content</code>上。所以我们知道哪里会发生动作变化。</p>
<p>接下来，我们来看看如何创建更多页面并执行基本的导航。</p>
<h1 id="articleHeader10">添加页面</h1>
<p>现在我们对Ionic 2应用的布局有一个基本的掌握，让我们来了解一下在应用中创建和导航到页面的过程。<br>让我们看一下<code>app.html</code>页面的底部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-nav [root]=&quot;rootPage&quot; #content swipeBackEnabled=&quot;false&quot;></ion-nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;ion-<span class="hljs-selector-tag">nav</span> [root]=<span class="hljs-string">"rootPage"</span> <span class="hljs-selector-id">#content</span> swipeBackEnabled=<span class="hljs-string">"false"</span>&gt;&lt;/ion-nav&gt;</code></pre>
<p>注意<code>[root]</code>属性绑定。 这本质上是设置了ion-nav组件的“root”页面。 当ion-nav加载时，变量<code>rootPage</code>引用的组件将是根页面。</p>
<p>在<code>app.component.ts</code>中，<code>MyApp</code>组件在其构造函数中指定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
...

export class MyApp {
  ...
  
  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;

    constructor(
      public platform: Platform,
      public menu: MenuController
    ) {
    ...
  }

  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>...
<span class="hljs-keyword">import</span> { HelloIonicPage } <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/hello-ionic/hello-ionic'</span>;
...

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MyApp {
  ...
  
  <span class="hljs-comment">// make HelloIonicPage the root (or first) page</span>
  rootPage: <span class="hljs-built_in">any</span> = HelloIonicPage;

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
      <span class="hljs-keyword">public</span> platform: Platform,
      <span class="hljs-keyword">public</span> menu: MenuController
    </span>) {
    ...
  }

  ...
}</code></pre>
<p>我们看到<code>rootPage</code>设置成了<code>HelloIonicPage </code>，所以<code>HelloIonicPage</code>将是在nav控制器中加载的第一个页面。</p>
<h2 id="articleHeader11">创建一个页面</h2>
<p>接下来，让我们看看我们正在导入的<code>HelloIonicPage</code>。在<code>src/app/pages/hello-ionic/</code>文件夹中，找到并打开<code>hello-ionic.ts</code>。</p>
<blockquote><p>你可能已经注意到每个页面都有自己的文件夹，该文件夹以页面命名。 在每个文件夹内，我们还可以看到一个.html和一个.scss同名文件。 例如，在<code>hello-ionic/</code>我们将找到<code>hello-ionic.ts</code>，<code>hello-ionic.html</code>和<code>hello-ionic.scss</code>。 虽然使用这种模式不是必需的，但它可以有助于保持项目的组织结构。</p></blockquote>
<p>然后我们找到<code>HelloIonicPage</code>类，在创建的页面中提供了一个Angular组件和已经使用Ionic的导航系统加载的所有Ionic指令。注意，因为页面是动态加载的，所以它们没有选择器（<code>selector </code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';


@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor() {

  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;


<span class="hljs-meta">@Component</span>({
  templateUrl: <span class="hljs-string">'hello-ionic.html'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HelloIonicPage {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {

  }
}
</code></pre>
<p>所有的页面都会有一个类和一个关联的模版。让我们再看一下<code>src/app/pages/hello-ionic/hello-ionic.html</code>，这是一个模版页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-header>
  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name=&quot;menu&quot;></ion-icon>
    </button>
    <ion-title>Hello Ionic</ion-title>
  </ion-navbar>
</ion-header>


<ion-content padding>

  <h3>Welcome to your first Ionic app!</h3>

  <p>
    This starter project is our way of helping you get a functional app running in record time.
  </p>
  <p>
    Follow along on the tutorial section of the Ionic docs!
  </p>
  <p>
    <button ion-button color=&quot;primary&quot; menuToggle>Toggle Menu</button>
  </p>

</ion-content>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ion-header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ion-navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ion-button</span> <span class="hljs-attr">menuToggle</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ion-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"menu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ion-icon</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-title</span>&gt;</span>Hello Ionic<span class="hljs-tag">&lt;/<span class="hljs-name">ion-title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ion-navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ion-header</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">ion-content</span> <span class="hljs-attr">padding</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Welcome to your first Ionic app!<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    This starter project is our way of helping you get a functional app running in record time.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    Follow along on the tutorial section of the Ionic docs!
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ion-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">menuToggle</span>&gt;</span>Toggle Menu<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">ion-content</span>&gt;</span>
</code></pre>
<p><code>&lt;ion-navbar&gt;</code>是这个页面中导航栏的模版。当我们导航到这个页面，导航栏的按钮和标题作为页面转换的一部分进行过渡。</p>
<p>模板的其余部分是标准的Ionic代码，用于设置我们的内容区域并输出我们的欢迎信息。</p>
<h2 id="articleHeader12">创建其他页面</h2>
<p>要创建一个其他的页面，我们不需要太多的事情，只要确保配置标题和我们期望在导航栏显示的东西即可。</p>
<p>让我们来看一下<code>src/app/pages/list/list.ts</code>。在这里，你会看到一个新的页面被定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-keyword">import</span> { NavController, NavParams } <span class="hljs-keyword">from</span> <span class="hljs-string">'ionic-angular'</span>;

<span class="hljs-keyword">import</span> { ItemDetailsPage } <span class="hljs-keyword">from</span> <span class="hljs-string">'../item-details/item-details'</span>;


<span class="hljs-meta">@Component</span>({
  templateUrl: <span class="hljs-string">'list.html'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ListPage {
  selectedItem: <span class="hljs-built_in">any</span>;
  icons: <span class="hljs-built_in">string</span>[];
  items: <span class="hljs-built_in">Array</span>&lt;{title: <span class="hljs-built_in">string</span>, note: <span class="hljs-built_in">string</span>, icon: <span class="hljs-built_in">string</span>}&gt;;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> navCtrl: NavController, <span class="hljs-keyword">public</span> navParams: NavParams</span>) {
    <span class="hljs-comment">// If we navigated to this page, we will have an item available as a nav param</span>
    <span class="hljs-keyword">this</span>.selectedItem = navParams.get(<span class="hljs-string">'item'</span>);

    <span class="hljs-keyword">this</span>.icons = [<span class="hljs-string">'flask'</span>, <span class="hljs-string">'wifi'</span>, <span class="hljs-string">'beer'</span>, <span class="hljs-string">'football'</span>, <span class="hljs-string">'basketball'</span>, <span class="hljs-string">'paper-plane'</span>,
    <span class="hljs-string">'american-football'</span>, <span class="hljs-string">'boat'</span>, <span class="hljs-string">'bluetooth'</span>, <span class="hljs-string">'build'</span>];

    <span class="hljs-keyword">this</span>.items = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">11</span>; i++) {
      <span class="hljs-keyword">this</span>.items.push({
        title: <span class="hljs-string">'Item '</span> + i,
        note: <span class="hljs-string">'This is item #'</span> + i,
        icon: <span class="hljs-keyword">this</span>.icons[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-keyword">this</span>.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    <span class="hljs-keyword">this</span>.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}</code></pre>
<p>此页面将创建一个包含多个项目的基本列表页面。</p>
<p>总的来说，这个页面和我们之前看到的<code>HelloIonicPage</code>非常相似。 在下一节中，我们将学习如何导航到新页面！</p>
<h1 id="articleHeader13">导航到页面</h1>
<p>回想上一部分我们在<code>ListPage</code>类中有一个函数，看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>  <span class="hljs-keyword">itemTapped(event, </span><span class="hljs-keyword">item) </span>{
    this.navCtrl.<span class="hljs-keyword">push(ItemDetailsPage, </span>{
<span class="hljs-symbol">      item:</span> <span class="hljs-keyword">item
</span>    })<span class="hljs-comment">;</span>
  }</code></pre>
<p>你可能已经注意到我们引用了一个<code>ItemDetailsPage</code>。这是一个包含在教程启动器中的页面。我们要在<code>list.ts</code>中导入它，我们可以这样导入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
import { ItemDetailsPage } from '../item-details/item-details';
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>...
<span class="hljs-keyword">import</span> { ItemDetailsPage } <span class="hljs-keyword">from</span> <span class="hljs-string">'../item-details/item-details'</span>;
...</code></pre>
<p>保存好之后。你会发现<code>ionic serve</code>将重新编译应用程序并刷新浏览器，你的修改将会出现在程序中。让我们在浏览器中重新访问我们的应用程序，当我们点击一个项目，它将导航到项目详细信息页面！请注意，菜单切换按钮将被替换为后退按钮。这是Ionic遵循的原生风格，但可以按需配置。</p>
<h2 id="articleHeader14">工作原理</h2>
<p>Ionic 2 导航的工作原理就像一个简单的堆栈，我们通过<code>push</code>将一个页面推到堆栈的顶端，这会让我们的应用前进一步并显示一个返回按钮。反之，我们也可以<code>pop</code>掉一个页面。因为我们在构造函数中设置了<code>this.navCtrl</code>，我们可以调用<code>this.navCtrl.push()</code>,并传递我们要导航到的页面。我们还可以传递一个数据对象给我们想要导航到的页面。使用<code>push</code>导航到新页面很简单，而且Ionic的导航系统非常的灵活。你可以查看<a href="http://ionicframework.com/docs/v2/components/#navigation" rel="nofollow noreferrer" target="_blank">导航文档</a>找到更多高级导航示例。</p>
<blockquote><p>当涉及到URL，Ionic 2的工作方式有点不同于Ionic 1。不使用URL导航，可以确保我们可以总是回到一个页面（例如应用程序启动）。这意味着我们不只是限于使用href来导航。无论怎样，我们仍然可以选择在必要时使用网址导航到某个网页。</p></blockquote>
<h1 id="articleHeader15">后续步骤</h1>
<p>到此你已经完成了Ionic 2基本教程，了解了Ionic 2并开始朝着掌握Ionic 2进发。有能力的话最好去<a href="http://ionicframework.com" rel="nofollow noreferrer" target="_blank">Ionic官网</a>阅读完整的技术文档。</p>
<ul>
<li><p>建议熟悉一下TypeScript的基本语法和使用，包括@types使用和d.ts编写。</p></li>
<li><p>掌握Angular2的基本原理和开发思路。</p></li>
<li><p>熟悉Ionic 2的所有Components和API。</p></li>
<li><p>了解Cordova的使用方法和插件。</p></li>
</ul>
<p>祝在Ionic踩坑之路上越走越远。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ionic2入坑基础教程和安装指南

## 原文链接
[https://segmentfault.com/a/1190000007131084](https://segmentfault.com/a/1190000007131084)

