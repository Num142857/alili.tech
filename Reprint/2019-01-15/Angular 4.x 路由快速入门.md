---
title: 'Angular 4.x 路由快速入门' 
date: 2019-01-15 2:30:12
hidden: true
slug: hpnk8c00qxc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>建了个群有兴趣的朋友可以加一下 QQ 群：Angular 修仙之路(1)群 - 153742079 (已满)，请加 Angular 修仙之路(2)群 - 648681235。</blockquote>
<p>路由是 Angular 应用程序的核心，它加载与所请求路由相关联的组件，以及获取特定路由的相关数据。这允许我们通过控制不同的路由，获取不同的数据，从而渲染不同的页面。</p>
<p>接下来我们将按照以下目录的内容，介绍 Angular 的路由。具体目录如下：</p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>
<p>Installing the router</p>
<ul><li>Base href</li></ul>
</li>
<li>
<p>Using the router</p>
<ul>
<li>RouterModule.forRoot</li>
<li>RouterModule.forChild</li>
</ul>
</li>
<li>Configuring a route</li>
<li>Displaying routes</li>
<li>
<p>Futher configuration</p>
<ul>
<li>Dynamic routes</li>
<li>Child routes</li>
<li>Component-less routes</li>
<li>loadChildren</li>
</ul>
</li>
<li>
<p>Router directives</p>
<ul>
<li>routerLink</li>
<li>routerLinkActive</li>
</ul>
</li>
<li>Router API</li>
</ul>
<h2 id="articleHeader1">Installing the router</h2>
<p>首先第一件事，我们需要安装 Angular Router。你可以通过运行以下任一操作来执行此操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add @angular/router
# OR
npm i --save @angular/router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell">yarn add @angular/router
<span class="hljs-comment"># OR</span>
<span class="hljs-built_in">npm</span> i --save @angular/router</code></pre>
<p>以上命令执行后，将会自动下载 <code>@angular/router</code> 模块到 <code>node_modules</code> 文件夹中。</p>
<h3 id="articleHeader2">Base href</h3>
<p>我们需要做的最后一件事，是将 <code>&lt;base&gt;</code> 标签添加到我们的 <code>index.html</code> 文件中。路由需要根据这个来确定应用程序的根目录。例如，当我们转到 <code>http://example.com/page1</code> 时，如果我们没有定义应用程序的基础路径，路由将无法知道我们的应用的托管地址是 <code>http://example.com</code> 还是 <code>http://example.com/page1</code> 。</p>
<p>这件事操作起来很简单，只需打开项目中的 <code>index.html</code> 文件，添加相应的 <code>&lt;base&gt;</code> 标签，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
  <head>
    <base href=&quot;/&quot;>
    <title>Application</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Application<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>以上配置信息告诉 Angular 路由，应用程序的根目录是 <code>/</code> 。</p>
<h2 id="articleHeader3">Using the router</h2>
<p>要使用路由，我们需要在 <code>AppModule</code> 模块中，导入 <code>RouterModule </code>。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ]
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { BrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;
<span class="hljs-keyword">import</span> { RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.component'</span>;

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>此时我们的路由还不能正常工作，因为我们还未配置应用程序路由的相关信息。<code>RouterModule</code> 对象为我们提供了两个静态的方法：<code>forRoot()</code> 和 <code>forChild()</code> 来配置路由信息。</p>
<h3 id="articleHeader4">RouterModule.forRoot()</h3>
<p>RouterModule.forRoot() 方法用于在主模块中定义主要的路由信息，通过调用该方法使得我们的主模块可以访问路由模块中定义的所有指令。接下来我们来看一下如何使用 <code>forRoot()</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { Routes, RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>我们通过使用 <code>const</code> 定义路由的配置信息，然后把它作为参数调用 <code>RouterModule.forRoot()</code> 方法，而不是直接使用 <code>RouterModule.forRoot([...])</code> 这种方式，这样做的好处是方便我们在需要的时候导出 <code>ROUTES</code> 到其它模块中。</p>
<h3 id="articleHeader5">RouterModule.forChild()</h3>
<p>RouterModule.forChild() 与 Router.forRoot() 方法类似，但它只能应用在特性模块中。</p>
<blockquote>友情提示：根模块中使用 <code>forRoot()</code>，子模块中使用 <code>forChild()</code>
</blockquote>
<p>这个功能非常强大，因为我们不必在一个地方（我们的主模块）定义所有路由信息。反之，我们可以在特性模块中定义模块特有的路由信息，并在必要的时候将它们导入我们主模块。<code>RouterModule.forChild()</code> 的使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  // ...
})
export class ChildModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CommonModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common'</span>;
<span class="hljs-keyword">import</span> { Routes, RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ChildModule {}</code></pre>
<p>通过以上示例，我们知道在主模块和特性模块中，路由配置对象的类型是一样的，区别只是主模块和特性模块中需调用不同的方法，来配置模块路由。接下来我们来介绍一下如何配置 <code>ROUTES</code> 对象。</p>
<h2 id="articleHeader6">Configuring a route</h2>
<p>我们定义的所有路由都是作为 <code>ROUTES</code> 数组中的对象。首先，为我们的主页定义一个路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Routes, RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">import</span> { HomeComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./home/home.component'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  { path: <span class="hljs-string">''</span>, component: HomeComponent }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>示例中我们通过 <code>path</code> 属性定义路由的匹配路径，而 <code>component</code> 属性用于定义路由匹配时需要加载的组件。</p>
<blockquote>友情提示：我们使用 <code>path: ''</code> 来匹配空的路径，例如：<code>https://yourdomain.com</code>
</blockquote>
<h2 id="articleHeader7">Displaying routes</h2>
<p>配置完路由信息后，下一步是使用一个名为 <code>router-outlet</code> 的指令告诉 Angular 在哪里加载组件。当 Angular 路由匹配到响应路径，并成功找到需要加载的组件时，它将动态创建对应的组件，并将其作为兄弟元素，插入到 <code>router-outlet</code> 元素之后。</p>
<p>在我们 <code>AppComponent</code> 组件中，我们可以在任意位置插入 <code>router-outlet</code> 指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class=&quot;app&quot;>
      <h3>Our app</h3>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h3&gt;Our app&lt;/h3&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {}</code></pre>
<p>我们现在已经建立了应用程序的主路由，我们可以进一步了解路由的其它配置选项。</p>
<h2 id="articleHeader8">Further configuration</h2>
<p>到目前为止我们已经介绍的内容只是一个开始 ，接下来我们来看看其它一些选项和功能。</p>
<h3 id="articleHeader9">Dynamic routes</h3>
<p>如果路由始终是静态的，那没有多大的用处。例如 <code>path: ''</code> 是加载我们 <code>HomeComponent</code> 组件的静态路由。我们将介绍动态路由，基于动态路由我们可以根据不同的路由参数，渲染不同的页面。</p>
<p>例如，如果我们想要在个人资料页面根据不同的用户名显示不同的用户信息，我们可以使用以下方式定义路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: '/profile/:username', component: ProfileComponent }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { HomeComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./home/home.component'</span>;
<span class="hljs-keyword">import</span> { ProfileComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./profile/profile.component'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  { path: <span class="hljs-string">''</span>, component: HomeComponent },
  { path: <span class="hljs-string">'/profile/:username'</span>, component: ProfileComponent }
];</code></pre>
<p>这里的关键点是 <code>:</code> ，它告诉 Angular 路由，<code>:username</code> 是路由参数，而不是 URL 中实际的部分。</p>
<blockquote>友情提示：如果没有使用 <code>:</code> ，它将作为静态路由，仅匹配 <code>/profile/username</code> 路径</blockquote>
<p>现在我们已经建立一个动态路由，此时最重要的事情就是如何获取路由参数。要访问当前路由的相关信息，我们需要先从 <code>@angular/router</code> 模块中导入 <code>ActivatedRoute</code> ，然后在组件类的构造函数中注入该对象，最后通过订阅该对象的 <code>params</code> 属性，来获取路由参数，具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-page',
  template: `
    <div class=&quot;profile&quot;>
      <h3>"{{" username "}}"</h3>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  username: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => this.username = params.username);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { ActivatedRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'profile-page'</span>,
  template: <span class="hljs-string">`
    &lt;div class="profile"&gt;
      &lt;h3&gt;"{{" username "}}"&lt;/h3&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SettingsComponent <span class="hljs-keyword">implements</span> OnInit {
  username: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> route: ActivatedRoute</span>) {}
  ngOnInit() {
    <span class="hljs-keyword">this</span>.route.params.subscribe(<span class="hljs-function">(<span class="hljs-params">params</span>) =&gt;</span> <span class="hljs-keyword">this</span>.username = params.username);
  }
}</code></pre>
<p>介绍完动态路由，我们来探讨一下如何创建 <code>child routes</code>。</p>
<h3 id="articleHeader10">Child routes</h3>
<p>实际上每个路由都支持子路由，假设在我们 <code>/settings</code> 设置页面下有 <code>/settings/profile</code> 和 <code>/settings/password</code> 两个页面，分别表示个人资料页和修改密码页。</p>
<p>我们可能希望我们的 <code>/ settings</code> 页面拥有自己的组件，然后在设置页面组件中显示 <code>/ settings/profile</code> 和 <code>/ settings/password</code> 页面。我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { SettingsComponent } from './settings/settings.component';
import { ProfileSettingsComponent } from './settings/profile/profile.component';
import { PasswordSettingsComponent } from './settings/password/password.component';

export const ROUTES: Routes = [
  { 
    path: 'settings', 
    component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { SettingsComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./settings/settings.component'</span>;
<span class="hljs-keyword">import</span> { ProfileSettingsComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./settings/profile/profile.component'</span>;
<span class="hljs-keyword">import</span> { PasswordSettingsComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./settings/password/password.component'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  { 
    path: <span class="hljs-string">'settings'</span>, 
    component: SettingsComponent,
    children: [
      { path: <span class="hljs-string">'profile'</span>, component: ProfileSettingsComponent },
      { path: <span class="hljs-string">'password'</span>, component: PasswordSettingsComponent }
    ]
  }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>在这里，我们在 <code>setttings</code> 路由中定义了两个子路由，它们将继承父路由的路径，因此修改密码页面的路由匹配地址是 <code>/settings/password</code> ，依此类推。</p>
<p>接下来，我们需要做的最后一件事是在我们的 <code>SettingsComponent</code> 组件中添加 <code>router-outlet</code> 指令，因为我们要在设置页面中呈现子路由。如果我们没有在 <code>SettingsComponent</code> 组件中添加 <code>router-outlet</code> 指令，尽管 <code>/settings/password</code> 匹配修改密码页面的路由地址，但修改密码页面将无法正常显示。具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'settings-page',
  template: `
    <div class=&quot;settings&quot;>
      <settings-header></settings-header>
      <settings-sidebar></settings-sidebar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class SettingsComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'settings-page'</span>,
  template: <span class="hljs-string">`
    &lt;div class="settings"&gt;
      &lt;settings-header&gt;&lt;/settings-header&gt;
      &lt;settings-sidebar&gt;&lt;/settings-sidebar&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SettingsComponent {}</code></pre>
<h3 id="articleHeader11">Component-less routes</h3>
<p>另一个很有用的路由功能是 <code>component-less</code> 路由。使用 <code>component-less</code> 路由允许我们将路由组合在一起，并让它们共享路由配置信息和 outlet。</p>
<p>例如，我们可以定义 <code>setttings</code> 路由而不需要使用 <code>SettingsComponent</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { ProfileSettingsComponent } from './settings/profile/profile.component';
import { PasswordSettingsComponent } from './settings/password/password.component';

export const ROUTES: Routes = [
  {
    path: 'settings',
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { ProfileSettingsComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./settings/profile/profile.component'</span>;
<span class="hljs-keyword">import</span> { PasswordSettingsComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./settings/password/password.component'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  {
    path: <span class="hljs-string">'settings'</span>,
    children: [
      { path: <span class="hljs-string">'profile'</span>, component: ProfileSettingsComponent },
      { path: <span class="hljs-string">'password'</span>, component: PasswordSettingsComponent }
    ]
  }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>此时， <code>/settings/profile</code> 和 <code>/settings/password</code> 路由定义的内容，将显示在 <code>AppComponent</code> 组件的 <code>router-outlet</code> 元素中。</p>
<h3 id="articleHeader12">loadChildren</h3>
<p>我们也可以告诉路由从另一个模块中获取子路由。这将我们谈论的两个想法联系在一起 - 我们可以指定另一个模块中定义的子路由，以及通过将这些子路由设置到特定的路径下，来充分利用 <code>component-less</code> 路由的功能。 </p>
<p>让我们创建一个 <code>    SettingsModule</code> 模块，用来保存所有 <code>setttings</code> 相关的路由信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class SettingsModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CommonModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common'</span>;
<span class="hljs-keyword">import</span> { Routes, RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  {
    path: <span class="hljs-string">''</span>,
    component: SettingsComponent,
    children: [
      { path: <span class="hljs-string">'profile'</span>, component: ProfileSettingsComponent },
      { path: <span class="hljs-string">'password'</span>, component: PasswordSettingsComponent }
    ]
  }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SettingsModule {}</code></pre>
<p>需要注意的是，在 <code>SettingsModule</code> 模块中我们使用 <code>forChild()</code> 方法，因为 <code>SettingsModule</code> 不是我们应用的主模块。    </p>
<p>另一个主要的区别是我们将 <code>SettingsModule</code> 模块的主路径设置为空路径 ('')。因为如果我们路径设置为 <code>/settings</code> ，它将匹配 <code>/settings/settings</code> ，很明显这不是我们想要的结果。通过指定一个空的路径，它就会匹配 <code>/settings</code> 路径，这就是我们想要的结果。</p>
<p>那么 <code>/settings</code> 路由信息，需要在哪里配置？答案是在 <code>AppModule</code> 中。这时我们就需要用到 <code>loadChildren</code> 属性，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const ROUTES: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  {
    path: <span class="hljs-string">'settings'</span>,
    loadChildren: <span class="hljs-string">'./settings/settings.module#SettingsModule'</span>
  }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>需要注意的是，我们没有将 <code>SettingsModule</code> 导入到我们的 <code>AppModule</code> 中，而是通过 <code>loadChildren</code> 属性，告诉 Angular 路由依据 <code>loadChildren</code> 属性配置的路径去加载 <code>SettingsModule</code> 模块。这就是模块懒加载功能的具体应用，当用户访问 <code>/settings/**</code> 路径的时候，才会加载对应的 <code>SettingsModule</code> 模块，这减少了应用启动时加载资源的大小。</p>
<p>另外我们传递一个字符串作为 <code>loadChildren</code> 的属性值，该字符串由三部分组成：</p>
<ul>
<li>需要导入模块的相对路径</li>
<li>
<code>#</code> 分隔符</li>
<li>导出模块类的名称</li>
</ul>
<p>了解完路由的一些高级选项和功能，接下来我们来介绍路由指令。</p>
<h2 id="articleHeader13">Router Directives</h2>
<p>除了 <code>router-outlet</code> 指令，路由模块中还提供了一些其它指令。让我们来看看它们如何与我们之前介绍的内容结合使用。</p>
<h3 id="articleHeader14">routerLink</h3>
<p>为了让我们链接到已设置的路由，我们需要使用 <code>routerLink</code> 指令，具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav>
  <a routerLink=&quot;/&quot;>Home</a>
  <a routerLink=&quot;/settings/password&quot;>Change password</a>
  <a routerLink=&quot;/settings/profile&quot;>Profile Settings</a>
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/settings/password"</span>&gt;</span>Change password<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/settings/profile"</span>&gt;</span>Profile Settings<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>当我们点击以上的任意链接时，页面不会被重新加载。反之，我们的路径将在 URL 地址栏中显示，随后进行后续视图更新，以匹配 <code>routerLink</code> 中设置的值。</p>
<blockquote>友情提示：我们也可以将 <code>routerLink</code> 的属性值，改成数组形式，以便我们传递特定的路由信息</blockquote>
<p>如果我们想要链接到动态的路由地址，且该地址有一个 <code>username</code> 的路由变量，则我们可以按照以下方式配置 <code>routerLink</code> 对应的属性值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a [routerLink]=&quot;['/profile', username]&quot;>
  Go to "{{" username "}}"'s profile.
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> [<span class="hljs-attr">routerLink</span>]=<span class="hljs-string">"['/profile', username]"</span>&gt;</span>
  Go to "{{" username "}}"'s profile.
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h3 id="articleHeader15">routerLinkActive</h3>
<p>在实际开发中，我们需要让用户知道哪个路由处于激活状态，通常情况下我们通过向激活的链接添加一个 class 来实现该功能。为了解决上述问题，Angular 路由模块为我们提供了 <code>routerLinkActive</code> 指令，该指令的使用示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav>
  <a routerLink=&quot;/settings&quot; routerLinkActive=&quot;active&quot;>Home</a>
  <a routerLink=&quot;/settings/password&quot; routerLinkActive=&quot;active&quot;>Change password</a>
  <a routerLink=&quot;/settings/profile&quot; routerLinkActive=&quot;active&quot;>Profile Settings</a>
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">&lt;nav&gt;
  &lt;a routerLink=<span class="hljs-string">"/settings"</span> routerLinkActive=<span class="hljs-string">"active"</span>&gt;Home&lt;<span class="hljs-regexp">/a&gt;
  &lt;a routerLink="/</span>settings/password<span class="hljs-string">" routerLinkActive="</span>active<span class="hljs-string">"&gt;Change password&lt;/a&gt;
  &lt;a routerLink="</span>/settings/profile<span class="hljs-string">" routerLinkActive="</span>active<span class="hljs-string">"&gt;Profile Settings&lt;/a&gt;
&lt;/nav&gt;</span></code></pre>
<p>通过使用 <code>routerLinkActive</code> 指令，当 <code>a</code> 元素对应的路由处于激活状态时，<code>active</code> 类将会自动添加到 <code>a</code> 元素上。</p>
<p>最后，我们来简单介绍一下 Router API。</p>
<h2 id="articleHeader16">Router API</h2>
<p>我们可以通过路由还提供的 API 实现与 <code>routerLink</code> 相同的功能。要使用 Router API，我们需要在组件类中注入 <code>Router</code> 对象，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class=&quot;app&quot;>
      <h3>Our app</h3>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(private router: Router) {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h3&gt;Our app&lt;/h3&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> router: Router</span>) {}
}</code></pre>
<p>组件类中注入的 <code>router</code> 对象中有一个 <code>navigate()</code> 方法，该方法支持的参数类型与 <code>routerLink</code> 指令一样，当调用该方法后，页面将会自动跳转到对应的路由地址。具体使用示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class=&quot;app&quot;>
      <h3>Our app</h3>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/settings']);
    }, 5000);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h3&gt;Our app&lt;/h3&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> router: Router</span>) {}
  ngOnInit() {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/settings'</span>]);
    }, <span class="hljs-number">5000</span>);
  }
}</code></pre>
<p>若以上代码成功运行，用户界面将在 5 秒后被重定向到 <code>/settings</code> 页面。这个方法非常有用，例如当检测到用户尚未登录时，自动重定向到登录页面。</p>
<p>另一个使用示例是演示页面跳转时如何传递数据，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class=&quot;app&quot;>
      <h3>Users</h3>
      <div *ngFor=&quot;let user of users&quot;>
        <user-component 
          [user]=&quot;user&quot;
          (select)=&quot;handleSelect($event)&quot;>
        </user-component>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  users: Username[] = [
    { name: 'toddmotto', id: 0 },
    { name: 'travisbarker', id: 1 },
    { name: 'tomdelonge', id: 2 }
  ];
  
  constructor(private router: Router) {}
  
  handleSelect(event) {
    this.router.navigate(['/profile', event.name]);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h3&gt;Users&lt;/h3&gt;
      &lt;div *ngFor="let user of users"&gt;
        &lt;user-component 
          [user]="user"
          (select)="handleSelect($event)"&gt;
        &lt;/user-component&gt;
      &lt;/div&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  users: Username[] = [
    { name: <span class="hljs-string">'toddmotto'</span>, id: <span class="hljs-number">0</span> },
    { name: <span class="hljs-string">'travisbarker'</span>, id: <span class="hljs-number">1</span> },
    { name: <span class="hljs-string">'tomdelonge'</span>, id: <span class="hljs-number">2</span> }
  ];
  
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> router: Router</span>) {}
  
  handleSelect(event) {
    <span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/profile'</span>, event.name]);
  }
}</code></pre>
<p>Angular 路由的功能非常强大，既可以使用指令方式也可以使用命令式 API，希望本文可以帮助你尽快入门，若要进一步了解路由详细信息，请访问 - <a href="https://angular.io/docs/ts/latest/guide/router.html" rel="nofollow noreferrer" target="_blank">Angular Router 官文文档</a>。</p>
<h2 id="articleHeader17">我有话说</h2>
<h3 id="articleHeader18">除了使用 <code>navigate()</code> 方法外还有没有其它方法可以实现页面导航？</h3>
<p>Angular Router API 为我们提供了 <code>navigate()</code> 和 <code>navigateByUrl()</code> 方法来实现页面导航。那为什么会有两个不同的方法呢？</p>
<p>使用 <code>router.navigateByUrl()</code> 方法与直接改变地址栏上的 URL 地址一样，我们使用了一个新的 URL 地址。然而 <code>router.navigate()</code> 方法基于一系列输入参数，产生一个新的 URL 地址。为了更好的区分它们之间的差异，我们来看个例子，假设当前的 URL 地址是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/inbox/11/message/22(popup:compose)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">/inbox/</span><span class="hljs-number">11</span><span class="hljs-regexp">/message/</span><span class="hljs-number">22</span>(<span class="hljs-string">popup:</span>compose)</code></pre>
<p>当我们调用 <code>router.navigateByUrl('/inbox/33/message/44')</code>  方法后，此时的 URL 地址将变成 <code>/inbox/33/message/44</code> 。但如果我们是调用 <code>router.navigate('/inbox/33/message/44')</code> 方法，当前的 URL 地址将变成 <code>/inbox/33/message/44(popup:compose)</code> 。</p>
<h2 id="articleHeader19">参考资源</h2>
<ul><li><a href="https://toddmotto.com/angular-component-router" rel="nofollow noreferrer" target="_blank">Toddd - Getting started with Angular's Router</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4.x 路由快速入门

## 原文链接
[https://segmentfault.com/a/1190000009265310](https://segmentfault.com/a/1190000009265310)

