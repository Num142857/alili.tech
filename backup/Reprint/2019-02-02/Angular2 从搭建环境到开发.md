---
title: 'Angular2 从搭建环境到开发' 
date: 2019-02-02 2:30:10
hidden: true
slug: ntcnydzx8hn
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVEg3q?w=3064&amp;h=728" src="https://static.alili.tech/img/bVEg3q?w=3064&amp;h=728" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>Angular2 的发布带来了一阵热议，很久之前就在筹备了，当时的官方答复就是彻底推翻重写，问世之后大家的呼声就是学习成本太高，虽然去掉了 1.x 里的一部分概念，但是加进了 typescript，虽然不强制使用，但是我推荐大家都试一试，毕竟此次改版是谷歌和微软两大家的产物。</p>
<p>对于会部署环境的可以尝试本文最后一节加入 Angular material2 ，个人认为对高度个性化的项目不推荐使用，对企业级的 CMS 省去了写样式的时间，直接开始正文。</p>
<h2 id="articleHeader0">Angular-CLI</h2>
<p>说到 cli 大家不陌生，没出一个框架都会有对应的 cli ，俗称脚手架。angular2 本身提供了起步项目 <a href="https://github.com/valor-software/angular2-quickstart" rel="nofollow noreferrer" target="_blank">angular2-quickstart</a>，我尝试了一下，发现不是很好用，其它的大部分扩展需要自行安装，之后看了一下 angular-cli 部署简单易用，还提供了快捷搭建项目的目录。</p>
<p>Github地址： <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">https://github.com/angular/an...</a></p>
<p>我就简单说下 Github 里的文档吧，细部的大家扩展阅读。</p>
<h3 id="articleHeader1">安装</h3>
<p>首先，最好先升级 node 到 6.x 可以避免 node 版本过低带来的不必要的麻烦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g angular-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g angular-cli</code></pre>
<h3 id="articleHeader2">用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng --help" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng --help</code></pre>
<p>查看所有用法</p>
<h3 id="articleHeader3">创建本地开发环境生成和运行angular2项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng new PROJECT_NAME
cd PROJECT_NAME
ng serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">ng new PROJECT_NAME
<span class="hljs-built_in">cd</span> PROJECT_NAME
ng serve</code></pre>
<p>PROJECT_NAME 是你自己的项目名</p>
<p>部署成功后不报错的情况下到浏览器 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:4200/，修改项目中文件后会自动部署</p>
<p>您可以配置默认的 HTTP 端口和一个 LiveReload server 用 <code>--</code>， 形如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153</code></pre>
<h3 id="articleHeader4">生成组件、指令、管道和服务</h3>
<p>命令以 <code>ng generate</code> 开头，可以缩写为 <code>ng g</code>，下面给出创建 component 的几种方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng generate component my-new-component
ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
ng g component ../newer-cmp
# your component will be generated in src/app/newer-cmp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">ng generate component my-new-component
ng g component my-new-component <span class="hljs-comment"># using the alias</span>

<span class="hljs-comment"># components support relative path generation</span>
<span class="hljs-comment"># if in the directory src/app/feature/ and you run</span>
ng g component new-cmp
<span class="hljs-comment"># your component will be generated in src/app/feature/new-cmp</span>
<span class="hljs-comment"># but if you were to run</span>
ng g component ../newer-cmp
<span class="hljs-comment"># your component will be generated in src/app/newer-cmp</span></code></pre>
<p>下表里是所有的命令：</p>
<table>
<thead><tr>
<th>Scaffold</th>
<th>Usage</th>
</tr></thead>
<tbody>
<tr>
<td>Component</td>
<td>ng g component my-new-component</td>
</tr>
<tr>
<td>Directive</td>
<td>ng g directive my-new-directive</td>
</tr>
<tr>
<td>Pipe</td>
<td>ng g pipe my-new-pipe</td>
</tr>
<tr>
<td>Service</td>
<td>ng g service my-new-service</td>
</tr>
<tr>
<td>Class</td>
<td>ng g class my-new-class</td>
</tr>
<tr>
<td>Interface</td>
<td>ng g interface my-new-interface</td>
</tr>
<tr>
<td>Enum</td>
<td>ng g enum my-new-enum</td>
</tr>
<tr>
<td>Module</td>
<td>ng g module my-module</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">创建路由</h3>
<p>这里 cli 暂时禁用了创建路由，新的路由生成器即将到来，您可以在这里阅读新路由器的官方文档：<a href="https://angular.io/docs/ts/latest/guide/router.html" rel="nofollow noreferrer" target="_blank">https://angular.io/docs/ts/la...</a></p>
<h3 id="articleHeader6">建立一个 build</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">ng build</span></code></pre>
<p>会生成到 <code>dist/</code> 目录下，其它关于测试，配置文件请大家去 Github 仔细阅读，这里只给最基本的搭建流程。</p>
<h2 id="articleHeader7">组件实战</h2>
<p>看到这你可能已经开始尝试了，创建项目的步骤相信大家参照上文可以轻松解决，这里我先尝试创建一个 component，命令如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng g component nav" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">ng g component nav</span></code></pre>
<p>这里我创建了一个 nav 组件。执行成功后，后台会自动部署。我们看一下文件目录有什么改变</p>
<p><span class="img-wrap"><img data-src="/img/bVEg3r?w=1104&amp;h=884" src="https://static.alili.tech/img/bVEg3r?w=1104&amp;h=884" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>多了一个叫做 nav 的文件夹，看一看文件目录</p>
<p><span class="img-wrap"><img data-src="/img/bVEg3s?w=1116&amp;h=452" src="https://static.alili.tech/img/bVEg3s?w=1116&amp;h=452" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们发现与项目创建时自带的 app component 目录结构相同，内容也大同小异，大家可以尝试去创建一个自己的组件，组件的样式可以去对应的 css 文件中修改。</p>
<p>这时我的 <code>app.module.ts</code> 变成了如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { BrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;
<span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { FormsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/forms'</span>;
<span class="hljs-keyword">import</span> { HttpModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.component'</span>;
<span class="hljs-keyword">import</span> { NavComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./nav/nav.component'</span>;

@NgModule({
  <span class="hljs-attr">declarations</span>: [
    AppComponent,
    NavComponent
  ],
  <span class="hljs-attr">imports</span>: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  <span class="hljs-attr">providers</span>: [],
  <span class="hljs-attr">bootstrap</span>: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppModule</span> </span>{ }</code></pre>
<p>这里不难看出全局自动引入了 nav.component 组件。我们现在关心的问题是组件之间的引用和数据传输，这里为了简单起见，只给引入的方法，而数据传输、路由机制这里不做解释大家自行官网。</p>
<p>下面说一下 app 内引入 nav 组件，只需要改变 <code>app.component.html</code> 如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1 class=&quot;title&quot;>
  "{{"title"}}"
</h1>
<app-nav></app-nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>
  "{{"title"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">app-nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-nav</span>&gt;</span></code></pre>
<p>这里的 class 在对应的 <code>app.component.css</code> 如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title {
  font-size: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.title</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>这时页面自动刷新字号变大 ，那么这里的 <code>app-nav</code> 标签从哪里得到的呢？</p>
<p>我们去 <code>nav.component.ts</code> 里看一眼</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-nav'</span>,
  <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">'./nav.component.html'</span>,
  <span class="hljs-attr">styleUrls</span>: [<span class="hljs-string">'./nav.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NavComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  <span class="hljs-keyword">constructor</span>() { }

  ngOnInit() {
  }

}</code></pre>
<p>这里的 <code>selector: 'app-nav'</code> 说明我们的选择器选择的是 <code>app-nav</code> 标签，同样的可以通过 <code>[app-nav]</code> 选择属性。</p>
<blockquote>注：这里 selector 类似 css 中的选择器，大家也可以根据 1.x 中的 directive 来理解这里的组件</blockquote>
<p>此时页面会呈现成这样</p>
<p><span class="img-wrap"><img data-src="/img/bVEg3t?w=2308&amp;h=1020" src="https://static.alili.tech/img/bVEg3t?w=2308&amp;h=1020" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>好，到这里简单的组件引用已经实现。</p>
<h2 id="articleHeader8">引入 Angular material2</h2>
<p>文章开头已经阐述了引入 Angular material2 的优点，用过其它组件样式框架的都明白。</p>
<p>安装命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save @angular/material" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save @angular/material</code></pre>
<p>在 <code>src/app/app.module.ts</code> 中引入框架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MaterialModule } from '@angular/material';
// other imports
@NgModule({
  imports: [MaterialModule.forRoot()],
  ...
})
export class PizzaPartyAppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { MaterialModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/material'</span>;
<span class="hljs-comment">// other imports</span>
@NgModule({
  <span class="hljs-attr">imports</span>: [MaterialModule.forRoot()],
  ...
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PizzaPartyAppModule</span> </span>{ }</code></pre>
<p>引入核心和主体风格，较 Angular material 1.x 的改进在于可以选择不同的色系。具体看文档链接：<a href="https://github.com/angular/material2/blob/master/docs/theming.md" rel="nofollow noreferrer" target="_blank">https://github.com/angular/ma...</a></p>
<p>我们这里用的是 Angular CLI 这里又可以钻空子啦，添加下面一行到 <code>style.css</code>，注意是 <code>src</code> 目录下的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import '~@angular/material/core/theming/prebuilt/deeppurple-amber.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">import</span> <span class="hljs-string">'~@angular/material/core/theming/prebuilt/deeppurple-amber.css'</span>;</code></pre>
<p><code>deeppurple-amber</code> 主题颜色是可变的，具体看上文的文档链接。</p>
<p>到这里一直打开控制台（是个好习惯）的朋友会发现类似下面的报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client:49 [default] J:\workspace\angular2\ts\epimss\node_modules\@angular2-material\slide-toggle\slide-toggle.d.ts:67:19
Cannot find name 'HammerInput'.

client:49 [default] J:\workspace\angular2\ts\epimss\node_modules\@angular2-material\core\gestures\MdGestureConfig.d.ts:4:39
Cannot find name 'HammerManager'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">client:<span class="hljs-number">49</span> [<span class="hljs-keyword">default</span>] J:\workspace\angular2\ts\epimss\node_modules\@angular2-material\slide-toggle\slide-toggle.d.ts:<span class="hljs-number">67</span>:<span class="hljs-number">19</span>
Cannot find name <span class="hljs-string">'HammerInput'</span>.

client:<span class="hljs-number">49</span> [<span class="hljs-keyword">default</span>] J:\workspace\angular2\ts\epimss\node_modules\@angular2-material\core\gestures\MdGestureConfig.d.ts:<span class="hljs-number">4</span>:<span class="hljs-number">39</span>
Cannot find name <span class="hljs-string">'HammerManager'</span>.</code></pre>
<p>文档也给出了解释，因为框架中 <code>md-slide-toggle</code> 和 <code>md-slider</code> 两个组件依赖外部第三方组件 <a href="http://hammerjs.github.io/" rel="nofollow noreferrer" target="_blank">HammerJS</a> 需要额外的配置。</p>
<p>我们不急着用文档给的 npm 或引入 cdn 路径，因为亲测还是会报错，可能我引入方式有误，为了大家少走弯路直接给亲测有效的方法</p>
<p>我们先去命令行工具运行 <code>npm i --save-dev @types/hammerjs</code></p>
<p>然后编辑 <code>tsconfig.json</code> 文件将 hammerjs 添加到 types 下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;types&quot;: [
  &quot;jasmine&quot;, &quot;hammerjs&quot;
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"types"</span>: [
  <span class="hljs-string">"jasmine"</span>, <span class="hljs-string">"hammerjs"</span>
]</code></pre>
<p>到这里发现页面自动刷新后报错消失了，如果需要字体图标可以在 <code>src/index.html</code> 中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link href=&quot;https://fonts.googleapis.com/icon?family=Material+Icons&quot; rel=&quot;stylesheet&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://fonts.googleapis.com/icon?family=Material+Icons"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span></code></pre>
<p>目前为止，整个 Angular material2 已经整装待发。全部语法看这里：<a href="https://github.com/angular/material2#feature-status" rel="nofollow noreferrer" target="_blank">https://github.com/angular/ma...</a></p>
<p>我们尝试着添加多个按钮组件测试一下，修改 <code>app.component.html</code> 文件，完整代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1 class=&quot;title&quot;>
  "{{"title"}}"
</h1>
<app-nav></app-nav>

<button md-button>FLAT</button>
<button md-raised-button>RAISED</button>
<button md-icon-button>
  <md-icon class=&quot;md-24&quot;>favorite</md-icon>
</button>
<button md-fab>
  <md-icon class=&quot;md-24&quot;>add</md-icon>
</button>
<button md-mini-fab>
  <md-icon class=&quot;md-24&quot;>add</md-icon>
</button>
<br/>
<br/>

<button md-raised-button color=&quot;primary&quot;>PRIMARY</button>
<button md-raised-button color=&quot;accent&quot;>ACCENT</button>
<button md-raised-button color=&quot;warn&quot;>WARN</button>
<br/>
<br/>

<button md-button disabled>OFF</button>
<button md-raised-button [disabled]=&quot;isDisabled&quot;>OFF</button>
<button md-mini-fab [disabled]=&quot;isDisabled&quot;><md-icon>check</md-icon></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>
  "{{"title"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">app-nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-nav</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-button</span>&gt;</span>FLAT<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-raised-button</span>&gt;</span>RAISED<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-icon-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"md-24"</span>&gt;</span>favorite<span class="hljs-tag">&lt;/<span class="hljs-name">md-icon</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-fab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"md-24"</span>&gt;</span>add<span class="hljs-tag">&lt;/<span class="hljs-name">md-icon</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-mini-fab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"md-24"</span>&gt;</span>add<span class="hljs-tag">&lt;/<span class="hljs-name">md-icon</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-raised-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"primary"</span>&gt;</span>PRIMARY<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-raised-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"accent"</span>&gt;</span>ACCENT<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-raised-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"warn"</span>&gt;</span>WARN<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-button</span> <span class="hljs-attr">disabled</span>&gt;</span>OFF<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-raised-button</span> [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"isDisabled"</span>&gt;</span>OFF<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-mini-fab</span> [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"isDisabled"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">md-icon</span>&gt;</span>check<span class="hljs-tag">&lt;/<span class="hljs-name">md-icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>没问题这里手懒不写布局样式了，直接给 br 换行大家方便看些，待页面部署完成后我们会看到以下效果</p>
<p><span class="img-wrap"><img data-src="/img/bVEg3u?w=2296&amp;h=1860" src="https://static.alili.tech/img/bVEg3u?w=2296&amp;h=1860" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>炫酷的组件，更多组件语法参考上面给的链接，到这里相信大家学习 angular2 的信心倍增，真对已有组件可以完成快速开发，下一步就是大家去 Angular2 官网看其它概念的时候啦，处理数据实现与后端对接。项目上线，大功告成。</p>
<h2 id="articleHeader9">总结</h2>
<p>orange 最近也是在学习新技术，更底层框架方面的知识还再学习，当今前端框架层出不穷，不要盲从，要根据公司需求和员工的工作经验选择框架，真说到性能方面哪个框架快的话，我虽然没测试过，但我确定 React、Vue、Angular2 几个之间相差无几，除非在实现的时候代码存在问题，因为这几个框架都经过了大型项目的考验。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular2 从搭建环境到开发

## 原文链接
[https://segmentfault.com/a/1190000007176295](https://segmentfault.com/a/1190000007176295)

