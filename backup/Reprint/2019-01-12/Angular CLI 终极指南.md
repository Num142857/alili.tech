---
title: 'Angular CLI 终极指南' 
date: 2019-01-12 2:30:24
hidden: true
slug: 4ena60zqdp6
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<h2 id="articleHeader0">Angular CLI 是什么？</h2>
<p><a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a> 是一个命令行接口(Command Line Interface)，用于实现自动化开发工作流程。它允许你做以下这些事情：</p>
<ul>
<li>创建一个新的 Angular 应用程序</li>
<li>运行带有 <code>LiveReload</code> 支持的开发服务器，以便在开发过程中预览应用程序</li>
<li>添加功能到现有的 Angular 应用程序</li>
<li>运行应用程序的单元测试</li>
<li>运行应用程序的端到端 (E2E) 测试</li>
<li>构建应用程序</li>
</ul>
<p>在详细介绍 <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a> 之前，我们先来看一下如何安装 <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a>。</p>
<h2 id="articleHeader1">前提条件</h2>
<p>在使用 Angular CLI 之前，你必须确保系统中 Node.js 的版本高于 <code>6.9.0</code> 且 npm 的版本高于 <code>3.0.0</code>。</p>
<p>若你尚未安装 Node.js，你可以访问 <a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">Node.js 官网</a>，然后根据你所用的操作系统选择对应的安装方式。</p>
<p>若你本机已经安装 Node.js 和 npm，你可以通过运行以下命令，确认一下当前环境信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node - v # 显示当前Node.js的版本
$ npm -v # 显示当前npm的版本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">$ <span class="hljs-keyword">node</span> <span class="hljs-title">- v</span> <span class="hljs-comment"># 显示当前Node.js的版本</span>
$ npm -v <span class="hljs-comment"># 显示当前npm的版本</span></code></pre>
<p>当你本机 Node.js 环境确认无误后，你可以在命令行使用 npm 安装 <a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TypeScript</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g typescript # 安装最新的TypeScript稳定版" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> -g typescript <span class="hljs-comment"># 安装最新的TypeScript稳定版</span></code></pre>
<h2 id="articleHeader2">安装 Angular CLI</h2>
<p>若要安装 <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a>，只需在命令行中运行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g @angular/cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> install -g @angular/cli</code></pre>
<p>验证是否成功安装 Angular CLI，可在命令行运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng <span class="hljs-built_in">version</span></code></pre>
<p>在我本机运行上述命令，则输出以下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@angular/cli: 1.1.1
node: 6.10.2
os: darwin x64" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@angular</span>/cli: <span class="hljs-number">1.1</span><span class="hljs-number">.1</span>
node: <span class="hljs-number">6.10</span><span class="hljs-number">.2</span>
os: darwin x64</code></pre>
<p>安装完 Angular CLI，接下来我们来使用它创建新的应用程序。</p>
<h2 id="articleHeader3">创建新的 Angular 应用程序</h2>
<p>Angular CLI 为我们提供了两种方式，用于创建新的应用程序：</p>
<ul>
<li>ng init - 在当前目录创建新的应用程序</li>
<li>ng new - 创建新的目录，然后在新建的目录中运行 <code>ng init</code> 命令</li>
</ul>
<p>因此 <code>ng new</code> 与 <code>ng init</code> 的功能是相似的，只是 <code>ng new</code> 会为我们创建新的目录。</p>
<p>假设你还未创建新的目录，那么我们需要使用 <code>ng new</code> 命令来创建新的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng new my-app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng <span class="hljs-keyword">new</span> <span class="hljs-type">my</span>-app</code></pre>
<p>当运行上面的命令后，将发生以下事情：</p>
<ul>
<li>新的 <code>my-app</code> 目录被创建</li>
<li>应用程序相关的源文件和目录将会被创建</li>
<li>应用程序的所有依赖 (package.json中配置的依赖项) 将会被自动安装</li>
<li>自动配置项目中的 TypeScript 开发环境</li>
<li>自动配置 <a href="https://karma-runner.github.io/" rel="nofollow noreferrer" target="_blank">Karma</a> 单元测试环境</li>
<li>自动配置 <a href="http://www.protractortest.org/" rel="nofollow noreferrer" target="_blank">Protractor</a> (end-to-end) 测试环境</li>
<li>创建 <code>environment</code> 相关的文件并初始化为默认的设置</li>
</ul>
<p>此时 <code>my-app</code> 目录中 Angular 应用程序的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
├── e2e
│   ├── app.e2e-spec.ts
│   ├── app.po.ts
│   └── tsconfig.e2e.json
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
└── tslint.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">.
├── README.md
├── e2e
│   ├── app.e2e-spec.ts
│   ├── app.po.ts
│   └── tsconfig.e2e.json
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
└── tslint.json</code></pre>
<h3 id="articleHeader4">可用选项</h3>
<ul>
<li>
<code>--dry-run</code>: boolean, 默认为 <code>false</code>, 若设置 <code>dry-run</code> 则不会创建任何文件</li>
<li>
<code>--verbose</code>: boolean, 默认为 <code>false</code>
</li>
<li>
<code>--link-cli</code>: boolean, 默认为 <code>false</code>, 自动链接到 <code>@angular/cli</code> 包</li>
<li>
<code>--skip-install</code>: boolean, 默认为 <code>false</code>, 表示跳过 <code>npm install</code>
</li>
<li>
<code>--skip-git</code>: boolean, 默认为 <code>false</code>, 表示该目录不初始化为 git 仓库</li>
<li>
<code>--skip-tests</code>: boolean, 默认为 <code>false</code>, 表示不创建 tests 相关文件</li>
<li>
<code>--skip-commit</code>: boolean, 默认为 <code>false</code>, 表示不进行初始提交</li>
<li>
<code>--directory</code>: string, 用于设置创建的目录名，默认与应用程序的同名</li>
<li>
<code>--source-dir</code>: string, 默认为 <code>'src'</code>, 用于设置源文件目录的名称</li>
<li>
<code>--style</code>: string, 默认为 <code>'css'</code>, 用于设置选用的样式语法 (<code>'css'</code>, <code>'less'</code> or <code>'scss'</code>)</li>
<li>
<code>--prefix</code>: string, 默认为 <code>'app'</code>, 用于设置创建新组件时，组件选择器使用的前缀</li>
<li>
<code>--mobile</code>: boolean, 默认为 <code>false</code>,表示是否生成 Progressive Web App 应用程序</li>
<li>
<code>--routing</code>: boolean, 默认为 <code>false</code>, 表示新增带有路由信息的模块，并添加到根模块中</li>
<li>
<code>--inline-style</code>: boolean, 默认为 <code>false</code>, 表示当创建新的应用程序时，使用内联样式</li>
<li>
<code>--inline-template</code>: boolean, 默认为 <code>false</code>, 表示当创建新的应用程序时，使用内联模板</li>
</ul>
<p>除此之外，你可以在本机上运行 <code>ng generate --help</code> 查看更多的可用选项。接下来让我们来看一下如何运行应用程序。</p>
<h2 id="articleHeader5">运行应用程序</h2>
<p>首先进入使用 Angular CLI 创建的应用程序目录，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd my-app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">cd</span> my-<span class="hljs-keyword">app</span></code></pre>
<p>然后运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>ng serve</code></pre>
<p>当运行上面的命令后，将发生以下事情：</p>
<ul>
<li>Angular CLI 从 <code>.angular-cli.json</code> 文件中加载配置信息</li>
<li>Angular CLI 运行 Webpack 打包相关 JavaScript 和 CSS 文件</li>
<li>Angular CLI 启动 <a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack dev server</a> 本地开发服务器，默认的地址是 <code>localhost:4200</code>
</li>
</ul>
<p>若要停止应用程序，你可以使用 <code>ctrl+c</code> 快捷键。</p>
<h2 id="articleHeader6">添加功能到现有的 Angular 应用程序</h2>
<p>你可以使用 <code>ng generate</code> 命令，为已有的 Angular 应用程序添加新的功能。</p>
<ul>
<li>
<code>ng generate class my-new-class</code>: 新建 class</li>
<li>
<code>ng generate component my-new-component</code>: 新建组件</li>
<li>
<code>ng generate directive my-new-directive</code>: 新建指令</li>
<li>
<code>ng generate enum my-new-enum</code>: 新建枚举</li>
<li>
<code>ng generate module my-new-module</code>: 新建模块</li>
<li>
<code>ng generate pipe my-new-pipe</code>: 新建管道</li>
<li>
<code>ng generate service my-new-service</code>: 新建服务</li>
</ul>
<p><code>ng generate</code> 命令与其它的子命令一样，也有快捷键，具体如下：</p>
<ul>
<li>
<code>ng g cl my-new-class</code>: 新建 class</li>
<li>
<code>ng g c my-new-component</code>: 新建组件</li>
<li>
<code>ng g d my-new-directive</code>: 新建指令</li>
<li>
<code>ng g e my-new-enum</code>: 新建枚举</li>
<li>
<code>ng g m my-new-module</code>: 新建模块</li>
<li>
<code>ng g p my-new-pipe</code>: 新建管道</li>
<li>
<code>ng g s my-new-service</code>: 新建服务</li>
</ul>
<h3 id="articleHeader7">添加新的类</h3>
<p>为了添加类名为 <code>UserProfile</code> 类，我们可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate class user-profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">class</span> user-profile</code></pre>
<p>Angular CLI 会自动调整文件名和类名的字母大小写，因此以下命令具有相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate class user-profile
$ ng generate class userProfile
$ ng generate class UserProfile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell">$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">class</span> user-profile
$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">class</span> userProfile
$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">class</span> UserProfile</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul><li>在 <code>src/app</code> 目录下将创建一个 <code>user-profile.ts</code> 文件，该文件导出一个名为 <code>UserProfile</code> 的类</li></ul>
<h4>可用选项</h4>
<ul><li>
<code>--spec</code>: boolean, 默认为 <code>false</code>, 表示是否生成单元测试相关的 <code>spec</code> 文件</li></ul>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Generate class 'UserProfile'
$ ng generate class user-profile

# Generate class 'UserProfile' with unit test
$ ng generate class user-profile --spec" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="shell"># <span class="hljs-type">Generate</span> <span class="hljs-class"><span class="hljs-keyword">class</span> '<span class="hljs-title">UserProfile</span>'</span>
$ ng generate <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">user-profile</span></span>

# <span class="hljs-type">Generate</span> <span class="hljs-class"><span class="hljs-keyword">class</span> '<span class="hljs-title">UserProfile</span>' <span class="hljs-keyword">with</span> <span class="hljs-title">unit</span> <span class="hljs-title">test</span></span>
$ ng generate <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">user-profile</span> <span class="hljs-title">--spec</span></span></code></pre>
<h3 id="articleHeader8">添加新的组件</h3>
<p>若想创建一个选择器为 <code>app-site-header</code> 的组件，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate component site-header
installing component
  create src/app/site-header/site-header.component.css
  create src/app/site-header/site-header.component.html
  create src/app/site-header/site-header.component.spec.ts
  create src/app/site-header/site-header.component.ts
  update src/app/app.module.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">$ ng generate component site-<span class="hljs-selector-tag">header</span>
installing component
  create src/app/site-header/site-<span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.css</span>
  create src/app/site-header/site-<span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.html</span>
  create src/app/site-header/site-<span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
  create src/app/site-header/site-<span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
  update src/app/app<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span></code></pre>
<p>Angular CLI 将自动调整文件名和组件名称的字母大小写，并将前缀应用于组件选择器，因此以下命令具有相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate component site-header
$ ng generate component siteHeader
$ ng generate component SiteHeader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell">$ ng <span class="hljs-keyword">generate</span> component site-header
$ ng <span class="hljs-keyword">generate</span> component siteHeader
$ ng <span class="hljs-keyword">generate</span> component SiteHeader</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>
<code>src/app/site-header</code> 目录被创建</li>
<li>
<p><code>site-header</code> 目录下会生成以下四个文件：</p>
<ul>
<li>CSS 样式文件，用于设置组件的样式</li>
<li>HTML 模板文件，用于设置组件的模板</li>
<li>TypeScript 文件，里面包含一个 <code>SiteHeaderComponent</code> 组件类和组件的元信息</li>
<li>Spec 文件，包含组件相关的测试用例</li>
</ul>
</li>
<li>
<code>SiteHeaderComponent</code> 组件会被自动地添加到最近模块 <code>@NgModule</code> 装饰器的 <code>declarations</code> 属性中。</li>
</ul>
<h4>可用选项</h4>
<ul>
<li>
<code>--flat</code>: boolean, 默认为 <code>false</code>, 表示在 <code>src/app</code> 目录下生成组件而不是在 <code>src/app/site-header</code> 目录中</li>
<li>
<code>--inline-template</code>: boolean, 默认为 <code>false</code>, 表示使用内联模板而不是使用独立的模板文件</li>
<li>
<code>--inline-style</code>: boolean, 默认为 <code>false</code>, 表示使用内联样式而不是使用独立的样式文件</li>
<li>
<code>--prefix</code>: boolean, 默认为 <code>true</code>, 使用 <code>.angular-cli.json</code> 配置的前缀作为组件选择器的前缀</li>
<li>
<code>--spec</code>: boolean, 默认为 <code>true</code>, 表示生成包含单元测试的 spec 文件</li>
<li>
<code>--view-encapsulation</code>: string, 用于设置组件的视图封装策略</li>
<li>
<code>--change-detection</code>: string, 用于设置组件的变化检测策略</li>
</ul>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Generate component 'site-header'
$ ng generate component site-header

# Generate component 'site-header' with inline template and inline styles
$ ng generate component site-header --inline-template --inline-style" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code class="shell"># <span class="hljs-keyword">Generate</span> <span class="hljs-keyword">component</span> <span class="hljs-symbol">'site</span>-header'
$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">component</span> site-header

# <span class="hljs-keyword">Generate</span> <span class="hljs-keyword">component</span> <span class="hljs-symbol">'site</span>-header' <span class="hljs-keyword">with</span> inline template <span class="hljs-keyword">and</span> inline styles
$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">component</span> site-header <span class="hljs-comment">--inline-template --inline-style</span></code></pre>
<h3 id="articleHeader9">添加新的指令</h3>
<p>若想创建一个选择器为 <code>appAdminLink</code> 的指令，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate directive admin-link
installing directive
  create src/app/admin-link.directive.spec.ts
  create src/app/admin-link.directive.ts
  update src/app/app.module.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">$ ng generate directive admin-link
installing directive
  create src/app/admin-link<span class="hljs-selector-class">.directive</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
  create src/app/admin-link<span class="hljs-selector-class">.directive</span><span class="hljs-selector-class">.ts</span>
  update src/app/app<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span></code></pre>
<p>Angular CLI 将自动调整文件名和指令名称的字母大小写，并将前缀应用于指令选择器，因此以下命令具有相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate directive admin-link
$ ng generate directive adminLink
$ ng generate directive AdminLink" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell">$ ng <span class="hljs-keyword">generate</span> directive admin-link
$ ng <span class="hljs-keyword">generate</span> directive adminLink
$ ng <span class="hljs-keyword">generate</span> directive AdminLink</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>
<code>src/app/admin-link.directive.ts</code> 文件被创建，该文件导出一个名为 <code>AdminLinkDirective</code> 且选择器为 <code>appAdminLink</code> 的指令</li>
<li>
<code>src/app/admin-link.directive.spec.ts</code> 文件被创建，该文件包含指令相关的单元测试信息</li>
<li>
<code>AdminLinkDirective</code> 指令会被自动地添加到最近模块 <code>@NgModule</code> 装饰器的 <code>declarations</code> 属性中。</li>
</ul>
<h4>可用选项</h4>
<ul>
<li>
<code>--flat</code>: boolean, 默认为 <code>true</code>, 表示在 <code>src/app</code> 目录中生成指令而不是在 <code>src/app/admin-link</code> 目录下</li>
<li>
<code>--prefix</code>: boolean, 默认为 <code>true</code>, 使用 <code>.angular-cli.json</code> 配置的前缀作为指令选择器的前缀</li>
<li>
<code>--spec</code>: boolean, 默认为 <code>true</code>, 表示生成包含单元测试的 spec 文件</li>
</ul>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Generate directive 'adminLink'
$ ng generate directive admin-link

# Generate directive 'adminLink' without unit test
$ ng generate directive admin-link --spec=false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell"># Generate directive 'adminLink'
$ ng <span class="hljs-keyword">generate</span> directive admin-link

# Generate directive 'adminLink' without unit test
$ ng <span class="hljs-keyword">generate</span> directive admin-link --spec=false</code></pre>
<h3 id="articleHeader10">添加新的枚举</h3>
<p>若想创建一个名为 <code>Direction</code> 的枚举类 ，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate enum direction
installing enum
  create src/app/direction.enum.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="shell">$ ng generate <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">direction</span></span>
installing <span class="hljs-class"><span class="hljs-keyword">enum</span></span>
  create src/app/direction.<span class="hljs-keyword">enum</span>.ts</code></pre>
<p>Angular CLI 会自动调整文件名和枚举名称的字母大小写，因此以下命令具有相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate enum direction
$ ng generate enum Direction" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="shell">$ ng generate <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">direction</span></span>
$ ng generate <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">Direction</span></span></code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul><li>
<code>src/app.direction.enum.ts</code> 文件被创建，该文件导出名为 <code>Direction</code> 的枚举</li></ul>
<h3 id="articleHeader11">添加新的模块</h3>
<p>若想创建一个新的模块 ，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate module admin
installing module
  create src/app/admin/admin.module.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell">$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">module</span> admin
installing <span class="hljs-keyword">module</span>
  create src/app/admin/admin<span class="hljs-variable">.module</span><span class="hljs-variable">.ts</span></code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>
<code>src/app/admin</code> 目录被创建</li>
<li>在 <code>src/app/admin/admin.module.ts</code> 文件中，<code>AdminModule</code> 模块被创建</li>
</ul>
<p>需要注意的是，新增的模块不会被自动添加到 <code>src/app/app.module.ts</code> 文件中的 <code>AppModule</code> 模块中，用户可以根据具体需求导入对应的模块。</p>
<p>若要在其它模块中导入刚才新增的模块，可以在 <code>@NgModule</code> 的 <code>imports</code> 属性中设定该新增的模块。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { AdminModule } from './admin/admin.module';

@NgModule({
  // ...
  imports: [
    AdminModule
  ]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { AdminModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'./admin/admin.module'</span>;

<span class="hljs-meta">@NgModule</span>({
  <span class="hljs-comment">// ...</span>
  imports: [
    AdminModule
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>可用选项</h4>
<ul>
<li>
<code>--routing</code>: boolean, 默认为 <code>false</code>, 表示生成一个额外包含路由信息的 <code>AdminRoutingModule</code> 模块，且该模块会被自动地导入到新建的模块中</li>
<li>
<code>--spec</code>: boolean, 默认为 <code>false</code>, 表示添加 <code>src/app/admin/admin.module.spec.ts</code> 单元测试文件</li>
</ul>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Add module 'admin'
$ ng generate module admin

# Add module 'admin' with additional module containing routing information
$ ng generate module admin --routing" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell"># Add <span class="hljs-keyword">module</span> 'admin'
$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">module</span> admin

# Add <span class="hljs-keyword">module</span> 'admin' <span class="hljs-keyword">with</span> additional <span class="hljs-keyword">module</span> containing routing information
$ ng <span class="hljs-keyword">generate</span> <span class="hljs-keyword">module</span> admin --routing</code></pre>
<h3 id="articleHeader12">添加新的管道</h3>
<p>若想创建一个名为 <code>convertToEuro</code> 的管道 ，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate pipe convert-to-euro
installing pipe
  create src/app/convert-to-euro.pipe.spec.ts
  create src/app/convert-to-euro.pipe.ts
  update src/app/app.module.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">$ ng generate pipe convert-to-euro
installing pipe
  create src/app/convert-to-euro<span class="hljs-selector-class">.pipe</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
  create src/app/convert-to-euro<span class="hljs-selector-class">.pipe</span><span class="hljs-selector-class">.ts</span>
  update src/app/app<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span></code></pre>
<p>Angular CLI 会自动调整文件名和管道名称的字母大小写，因此以下命令具有相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate pipe convert-to-euro
$ ng generate pipe convertToEuro
$ ng generate pipe ConvertToEuro" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell">$ ng <span class="hljs-keyword">generate</span> pipe convert-to-euro
$ ng <span class="hljs-keyword">generate</span> pipe convertToEuro
$ ng <span class="hljs-keyword">generate</span> pipe ConvertToEuro</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>
<code>src/app/convert-to-euro.pipe.ts</code> 文件被创建，该文件导出一个名为 <code>ConvertToEuroPipe</code> 的管道类</li>
<li>
<code>src/app/convert-to-euro.pipe.spec.ts</code> 文件被创建，该文件包含管道相关的单元测试信息</li>
<li>
<code>CovertToEuroPipe</code>  管道会被自动地添加到最近模块 <code>@NgModule</code> 装饰器的 <code>declarations</code> 属性中。</li>
</ul>
<h4>可用选项</h4>
<ul>
<li>
<code>--flat</code>: boolean, 默认为 <code>true</code>, 表示在 <code>src/app</code> 目录中生成管道而不是在 <code>src/app/convert-to-euro</code> 目录下</li>
<li>
<code>--spec</code>: boolean, 默认为 <code>true</code>, 表示生成包含单元测试的 spec 文件</li>
</ul>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Generate pipe 'convertToEuro' with spec and in /src/app directory
$ ng generate pipe convert-to-euro

# Generate pipe 'convertToEuro' without spec and in /src/app/convert-to-euro directory
$ ng generate pipe convert-to-euro --spec=false --flat=false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code class="shell"># <span class="hljs-keyword">Generate</span> pipe <span class="hljs-symbol">'convertToEuro</span>' <span class="hljs-keyword">with</span> spec <span class="hljs-keyword">and</span> <span class="hljs-keyword">in</span> /src/app directory
$ ng <span class="hljs-keyword">generate</span> pipe convert-<span class="hljs-keyword">to</span>-euro

# <span class="hljs-keyword">Generate</span> pipe <span class="hljs-symbol">'convertToEuro</span>' without spec <span class="hljs-keyword">and</span> <span class="hljs-keyword">in</span> /src/app/convert-<span class="hljs-keyword">to</span>-euro directory
$ ng <span class="hljs-keyword">generate</span> pipe convert-<span class="hljs-keyword">to</span>-euro <span class="hljs-comment">--spec=false --flat=false</span></code></pre>
<h3 id="articleHeader13">添加新的服务</h3>
<p>若想创建一个名为 <code>BackendApiService</code> 的服务 ，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate service backend-api
installing service
  create src/app/backend-api.service.spec.ts
  create src/app/backend-api.service.ts
  WARNING Service is generated but not provided, it must be provided to be used" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="shell">$ ng generate service <span class="hljs-keyword">backend-api
</span><span class="hljs-symbol">installing</span> service
  create src/app/<span class="hljs-keyword">backend-api.service.spec.ts
</span>  create src/app/<span class="hljs-keyword">backend-api.service.ts
</span>  WARNING Service is generated <span class="hljs-keyword">but </span>not provided, <span class="hljs-keyword">it </span>must <span class="hljs-keyword">be </span>provided to <span class="hljs-keyword">be </span>used</code></pre>
<p>Angular CLI 会自动调整文件名和服务名称的字母大小写，因此以下命令具有相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng generate service backend-api
$ ng generate service backendApi
$ ng generate service BackendApi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell">$ ng <span class="hljs-keyword">generate</span> service backend-api
$ ng <span class="hljs-keyword">generate</span> service backendApi
$ ng <span class="hljs-keyword">generate</span> service BackendApi</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>
<code>src/app/backend-api.service</code> 文件被创建，该文件导出一个名为 <code>BackendApiService</code> 的服务类</li>
<li>
<code>src/app/back-api.service.spec.ts</code> 文件被创建，该文件包含管道相关的单元测试信息</li>
</ul>
<p>需要注意的是，Angular CLI 会提醒用户服务已成功创建，但尚未配置该服务。用户可以根据具体需求在模块或组件的 <code>providers</code> 属性中配置该新建的服务。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BackendApiService } from './backend-api.service';

@NgModule({
  // ...
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { BackendApiService } <span class="hljs-keyword">from</span> <span class="hljs-string">'./backend-api.service'</span>;

<span class="hljs-meta">@NgModule</span>({
  <span class="hljs-comment">// ...</span>
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})</code></pre>
<h4>可用选项</h4>
<ul>
<li>
<code>--flat</code>: boolean, 默认为 <code>true</code>, 表示在 <code>src/app</code> 目录中生成服务而不是在 <code>src/app/backend-api</code> 目录下</li>
<li>
<code>--spec</code>: boolean, 默认为 <code>true</code>, 表示生成包含单元测试的 spec 文件</li>
</ul>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Generate service with DI token 'BackendApiService' in /src/app directory
$ ng generate service backend-api

# Generate service with DI token 'BackendApiService' in /src/app/backend-api directory
$ ng generate service backend-api --flat=false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code class="shell"># Generate service <span class="hljs-keyword">with</span> DI token <span class="hljs-number">'Bac</span>kendApiService' in /src/app directory
$ ng <span class="hljs-keyword">generate</span> service backend-api

# Generate service <span class="hljs-keyword">with</span> DI token <span class="hljs-number">'Bac</span>kendApiService' in /src/app/backend-api directory
$ ng <span class="hljs-keyword">generate</span> service backend-api --flat=false</code></pre>
<h2 id="articleHeader14">运行单元测试</h2>
<p>Angular CLI 在新建项目的时候，自动为我们集成了 <a href="https://karma-runner.github.io/" rel="nofollow noreferrer" target="_blank">Karma test runner</a> 测试框架。当添加新的功能时，我们可以利用 <code>--spec</code> 选项，告诉 Angular CLI 让它为我们生成功能相关的 <code>.spec.ts</code> 测试单元测试文件。</p>
<p><code>spec</code> 文件在 <code>src</code> 目录中相应功能的同一目录下创建，这使得我们可以在使用功能时轻松找到它们。</p>
<p>若要运行单元测试，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng <span class="hljs-built_in">test</span></code></pre>
<p>此时在你的控制台将输出以下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng test
[karma]: No captured browser, open http://localhost:9876/
[karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
[launcher]: Launching browser Chrome with unlimited concurrency
[launcher]: Starting browser Chrome" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code class="shell">$ ng test
[<span class="hljs-symbol">karma</span>]: <span class="hljs-link">No captured browser, open http://localhost:9876/</span>
[<span class="hljs-symbol">karma</span>]: <span class="hljs-link">Karma v1.4.1 server started at http://0.0.0.0:9876/</span>
[<span class="hljs-symbol">launcher</span>]: <span class="hljs-link">Launching browser Chrome with unlimited concurrency</span>
[<span class="hljs-symbol">launcher</span>]: <span class="hljs-link">Starting browser Chrome</span></code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>Angular CLI 从 <code>.angular-cli.json</code> 文件中加载配置信息</li>
<li>Angular CLI 基于 <code>.angular-cli.json</code> 文件中的 <code>Karma</code> 相关的配置信息，运行 <code>Karma</code>。Karma 的配置文件默认在根目录下，文件名为  <code>karma.conf.js</code> 。</li>
<li>Karma 打开配置中设定的浏览器，默认是 <code>Chrome</code>。</li>
<li>Karma 然后指示浏览器 (Chrome) 使用 Karma 配置中指定的测试框架运行 <code>src/test.ts</code>。默认情况下，采用的是 <code>Jasmine</code> 框架。创建应用程序时，会自动创建 <code>src/test.ts</code> 文件。它预先配置为加载和配置测试Angular 应用程序所需的代码，并运行 <code>src</code> 目录中以 <code>.spec.ts</code> 结尾的所有文件。</li>
<li>Karma 将测试结果报告给控制台。</li>
<li>Karma 监听 <code>src</code> 目录下的文件的变化，然后自动运行单元测试。</li>
</ul>
<h2 id="articleHeader15">运行 End-to-End 测试</h2>
<p>若要运行 e2e 测试，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng e2e" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>ng e2e</code></pre>
<h2 id="articleHeader16">构建应用程序</h2>
<p>若要构建应用程序，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>ng build</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>Angular CLI 从 <code>.angular-cli.json</code> 文件中加载配置信息</li>
<li>Angular CLI 运行 <code>Webpack</code> 打包项目相关的 JavaScript 与 CSS 文件</li>
<li>打包后的资源，将被输出到配置文件中 <code>outDir</code> 所指定的目录，默认是输出到 <code>dist</code> 目录</li>
</ul>
<h4>可用选项</h4>
<ul>
<li>
<code>--aot</code>:  开启 <code>ahead-of-time</code> 编译</li>
<li>
<code>--base-href</code>: string, 设置 <code>index.html</code> 文件中 <code>&lt;base&gt;</code> 元素的链接地址</li>
<li>
<code>--environment</code>: string, 设置所使用的环境，默认为 <code>dev</code>
</li>
<li>
<code>--output-path</code>: string,  设置输出的路径</li>
<li>
<code>--target</code>: string, 设置所使用的环境，默认为 <code>development</code>
</li>
<li>
<code>--watch</code>: boolean, 默认为 <code>false</code>, 开启 <code>watch</code> 模式，监听文件异动并自动重新构建</li>
</ul>
<h4>Targets</h4>
<p>指定 <code>target</code> 的值，会影响到构建流程的运行方式。它的可选值：</p>
<ul>
<li>development:  默认的模式，意味着不进行代码压缩或混淆</li>
<li>production: 压缩和混淆代码</li>
</ul>
<p>若需使用 <code>production</code> 模式，构建应用程序，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng build --target=production" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="shell" style="word-break: break-word; white-space: initial;">$ ng build <span class="hljs-comment">--target=production</span></code></pre>
<h4>Environments</h4>
<p><code>Environments</code> 让你能够自定义应用程序行为。</p>
<p>你可以在 <code>.angular-cli.json</code> 文件中定义自己的 <code>environments</code> 文件。默认的是：</p>
<ul><li>dev：<code>environments/environment.ts</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const environment = {
  production: false
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> environment = {
  production: <span class="hljs-literal">false</span>
};</code></pre>
<ul><li>prod：<code>environments/environment.prod.ts</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const environment = {
  production: true
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> environment = {
  production: <span class="hljs-literal">true</span>
};</code></pre>
<p>需要注意的是，构建流程默认使用 <code>dev</code> 环境。</p>
<p>如果指定了不同的环境，构建过程将使用相应的环境：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Uses environments/environment.ts
$ ng build

# Also uses environments/environment.ts
$ ng build --environment=dev
$ ng build --env=dev

# Uses environments/environment.prod.ts
$ ng build --environment=prod
$ ng build --env=prod" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell"><span class="hljs-comment"># Uses environments/environment.ts</span>
<span class="hljs-variable">$ </span>ng build

<span class="hljs-comment"># Also uses environments/environment.ts</span>
<span class="hljs-variable">$ </span>ng build --environment=dev
<span class="hljs-variable">$ </span>ng build --env=dev

<span class="hljs-comment"># Uses environments/environment.prod.ts</span>
<span class="hljs-variable">$ </span>ng build --environment=prod
<span class="hljs-variable">$ </span>ng build --env=prod</code></pre>
<p>正如你在 <code>src/main.ts</code> 文件中看到的，通过导入 <code>./environments/environment</code> 文件，我们就可以访问到 <code>environment</code> 相关的配置信息，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { enableProdMode } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { platformBrowserDynamic } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser-dynamic'</span>;

<span class="hljs-keyword">import</span> { AppModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/app.module'</span>;
<span class="hljs-keyword">import</span> { environment } <span class="hljs-keyword">from</span> <span class="hljs-string">'./environments/environment'</span>;

<span class="hljs-keyword">if</span> (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);</code></pre>
<h2 id="articleHeader17">自定义构建流程</h2>
<p>从 v1.0 开始，Angular CLI 提供了一个命令，用于将你的应用程序与 Angular CLI 分离。</p>
<p>默认情况下，Angular CLI 为您管理基础 Webpack 配置，因此您无需处理其复杂性。如果你希望手动配置webpack，并且您不再需要在Angular应用程序中使用Angular CLI，则可以运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ng eject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>ng eject</code></pre>
<p>此时在你的控制台将输出以下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="==========================================================================================
Ejection was successful.

To run your builds, you now need to do the following commands:
   - &quot;npm run build&quot; to build.
   - &quot;npm run test&quot; to run unit tests.
   - &quot;npm start&quot; to serve the app using webpack-dev-server.
   - &quot;npm run e2e&quot; to run protractor.

Running the equivalent CLI commands will result in an error.

==========================================================================================
Some packages were added. Please run &quot;npm install&quot;." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell">==========================================================================================
Ejection was successful.

To <span class="hljs-built_in">run</span> your builds, you now need <span class="hljs-keyword">to</span> do <span class="hljs-keyword">the</span> following commands:
   - <span class="hljs-string">"npm run build"</span> <span class="hljs-keyword">to</span> build.
   - <span class="hljs-string">"npm run test"</span> <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span> unit tests.
   - <span class="hljs-string">"npm start"</span> <span class="hljs-keyword">to</span> serve <span class="hljs-keyword">the</span> app using webpack-dev-server.
   - <span class="hljs-string">"npm run e2e"</span> <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span> protractor.

Running <span class="hljs-keyword">the</span> equivalent CLI commands will <span class="hljs-literal">result</span> <span class="hljs-keyword">in</span> an <span class="hljs-keyword">error</span>.

==========================================================================================
Some packages were added. Please <span class="hljs-built_in">run</span> <span class="hljs-string">"npm install"</span>.</code></pre>
<p>运行上述命令后，在幕后将发生以下事情：</p>
<ul>
<li>
<code>ejected: true</code> 的属性被添加到 <code>.angular-cli.json</code> 文件中</li>
<li>在应用程序的根目录下将生成独立的 <code>webpack.config.js</code> 文件，因此你可以在没有使用 <code>Angular CLI</code> 的环境下构建项目</li>
<li>
<code>package.json</code> 中的构建脚本会被更新，因此你可以运行 <code>npm run build</code> 来构建项目</li>
<li>
<code>package.json</code> 中的测试脚本会被更新，因此你可以运行 <code>npm run test</code> 来运行单元测试</li>
<li>
<code>package.json</code> 中的启动脚本会被更新，因此你可以运行 <code>npm run start</code> 或 <code>npm start</code> 来启动开发服务器</li>
<li>
<code>package.json</code> 中的 <code>e2e</code> 脚本会被更新，因此你可以运行 <code>npm run e2e</code> 来运行 <code>End-to-End</code> 测试</li>
</ul>
<p>把应用程序与 Angular CLI 分离后，你就可以根据自己的要求自定义 <code>Webpack</code> 的配置。</p>
<h2 id="articleHeader18">参考资源</h2>
<ul><li><a href="https://www.sitepoint.com/ultimate-angular-cli-reference/" rel="nofollow noreferrer" target="_blank">ultimate-angular-cli-reference</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular CLI 终极指南

## 原文链接
[https://segmentfault.com/a/1190000009771946](https://segmentfault.com/a/1190000009771946)

