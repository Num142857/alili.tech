---
title: 'Angular 2.x 从0到1 (一）史上最简单的Angular2教程' 
date: 2019-01-27 2:30:59
hidden: true
slug: bjekuvlf84p
categories: [reprint]
---

{{< raw >}}

                    
<p>第一节：<a href="https://segmentfault.com/a/1190000008213941">Angular 2.0 从0到1 （一）</a><br>第二节：<a href="https://segmentfault.com/a/1190000008213984" target="_blank">Angular 2.0 从0到1 （二）</a><br>第三节：<a href="https://segmentfault.com/a/1190000008242018">Angular 2.0 从0到1 （三）</a></p>
<h1 id="articleHeader0">第一章：认识Angular 2.0</h1>
<h2 id="articleHeader1">Angular2简介</h2>
<p><a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">Angular 2</a> 是Google推出的一个跨平台全终端的框架，和目前比较火的React和Vue.js相比，有如下优点：</p>
<ol>
<li><p>由于Google的目的是推出一个完整解决方案，所以官方默认提供的类库（比如routing，http，依赖性注入（DI）等）非常完整，无需自己选择。React的一大痛点就是选择太多导致在配置寻找组件和类库的过程中消耗太多精力，当然从另一方面看这也是其优势，选择众多且自由。</p></li>
<li><p>官方支持<a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TypeScript</a>（微软出品，是JavaScript的超集，是 JavaScript 的强类型版本）作为首选编程语言，使得开发脚本语言的一些问题可以更早更方便的找到。</p></li>
<li><p><a href="http://reactivex.io/rxjs/" rel="nofollow noreferrer" target="_blank">RxJS</a>友好使得响应式编程在Augular2中变得极为容易（Google开发的框架依赖这么多的微软的产品，可见微软的转型还是很成功的）</p></li>
<li><p>支持<a href="https://www.nativescript.org/" rel="nofollow noreferrer" target="_blank">NativeScript</a>甚至<a href="http://angular.github.io/react-native-renderer/" rel="nofollow noreferrer" target="_blank">ReactNative</a>等进行原生Android/iOS应用开发（React支持React Native）</p></li>
<li><p>支持服务器端渲染（React也支持）</p></li>
</ol>
<p>但总体来讲，个人认为Angular2更适合从原生App开发或后端Java/.Net等转型过来开发前端的程序员，因为它的开发模型更接近于传统强类型语言的模式，加上官方内建的组件和类库比较完整，有<a href="https://angular.cn" rel="nofollow noreferrer" target="_blank">官方中文网站 </a><a href="https://angular.cn" rel="nofollow noreferrer" target="_blank">https://angular.cn</a> ，学习曲线要低一些。有过Angular 1.x 开发经验的同学要注意了，虽然只有一个版本号的差距，但2.x和1.x是完全不同的，不要奢望1.x的应用会平滑迁移到2.x。</p>
<p>Angular 支持大多数常用浏览器，包括下列版本：</p>
<table>
<thead><tr>
<th>Chrome</th>
<th>Firefox</th>
<th>Edge</th>
<th>IE</th>
<th>Safari</th>
<th>iOS</th>
<th>Android</th>
<th>IE Mobile</th>
</tr></thead>
<tbody><tr>
<td>45以上</td>
<td>40以上</td>
<td>13以上</td>
<td>9以上</td>
<td>7以上</td>
<td>7以上</td>
<td>4.1以上</td>
<td>11以上</td>
</tr></tbody>
</table>
<h2 id="articleHeader2">环境配置要求</h2>
<p>Angular2需要<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node.js</a>和npm，我们下面的例子需要node.js 6.x.x和npm 3.x.x，请使用 <code>node -v</code> 和 <code>npm -v</code> 来检查。由于众所周知的原因，<a href="http://npmjs.org" rel="nofollow noreferrer" target="_blank">http://npmjs.org</a> 的站点访问经常不是很顺畅，这里给出一个由淘宝团队维护的国内镜像 <a href="http://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">http://npm.taobao.org/</a> 。安装好node后，请输入<code>npm config set registry https://registry.npm.taobao.org</code></p>
<p>和<a href="https://angular.cn/docs/ts/latest/quickstart.html" rel="nofollow noreferrer" target="_blank">官方快速起步文档</a>给出的例子不同，我们下面要使用Angular团队目前正在开发中的一个工具--<a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a> 。这是一个类似于React CLI和Ember CLI的命令行工具，用于快速构建Angular2的应用。它的优点是进一步屏蔽了很多配置的步骤、自动按官方推荐的模式进行代码组织、自动生成组件/服务等模板以及更方便的发布和测试代码。由于目前这个工具还在beta阶段，安装时请使用 <code>npm install -g angular-cli@latest</code> 命令。</p>
<p>IDE的选择也比较多，免费的<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">Visual Studio Code</a> 和 <a href="https://atom.io/" rel="nofollow noreferrer" target="_blank">Atom</a>，收费的有<a href="https://www.jetbrains.com/webstorm/" rel="nofollow noreferrer" target="_blank">WebStorm</a>。我们这里推荐采用 Visual Studio Code，可以到 <a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com/</a> 下载 Windows/Linux/MacOS 版本。</p>
<p>安装完以上这些工具，开发环境就部署好了，下面我们将开始Angular2的探险之旅。</p>
<h2 id="articleHeader3">第一个小应用 Hello Angular</h2>
<p>那么现在开启一个terminal（命令行窗口），键入 <code>ng new hello-angular</code></p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/zrmu59kvd6986hbojldvzu4t/c1_s1_ng_new_hello-angular.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/zrmu59kvd6986hbojldvzu4t/c1_s1_ng_new_hello-angular.png" alt="angular-cli创建新项目" title="angular-cli创建新项目" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，这个命令为我们新建了一个名为“hello-angular”的工程，进入该工程目录，键入 <code>code .</code> 可以打开IDE看到如下目录</p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/hwsg3a6eashfnxhodwgzmd6r/c1_s1_vscode_project_struct.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/hwsg3a6eashfnxhodwgzmd6r/c1_s1_vscode_project_struct.png" alt="VSCode管理工程" title="VSCode管理工程" style="cursor: pointer; display: inline;"></span></p>
<p>使用Mac的用户可能发现找不到我们刚才使用的命令行的 <code>code</code>，您需要通过IDE安装一下，点击F1，输入install，即可看到“在Path中安装code命令”，选择之后就ok了。</p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/2k52lgyw9say0bk0pzudz4qk/image_1b3i1ig2aqnq17ac1gk31lvtu579.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/2k52lgyw9say0bk0pzudz4qk/image_1b3i1ig2aqnq17ac1gk31lvtu579.png" alt="Mac用户需要安装命令行" title="Mac用户需要安装命令行" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/djkgkmm92yjakfp1tf53a8tu/image_1b2aksv68uhs3mf64j1h9st7o9.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/djkgkmm92yjakfp1tf53a8tu/image_1b2aksv68uhs3mf64j1h9st7o9.png" alt="文件目录结构" title="文件目录结构" style="cursor: pointer; display: inline;"></span></p>
<p>大概了解了文件目录结构后，我们重新回到命令行，在应用根目录键入 <code>ng serve</code> 可以看到应用编译打包后server运行在4200端口。</p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/4xrvfcelykg9dbmft73rm3ym/c1_s1_ng_serve.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/4xrvfcelykg9dbmft73rm3ym/c1_s1_ng_serve.png" alt="使用ng serve运行应用" title="使用ng serve运行应用" style="cursor: pointer;"></span></p>
<p>打开浏览器输入 <a href="http://localhost:4200" rel="nofollow noreferrer" target="_blank">http://localhost:4200</a> 即可看到程序运行成功啦！</p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/1fhyangnbqqjemxr5md4qa2p/c1_s1_project_1st_browser.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/1fhyangnbqqjemxr5md4qa2p/c1_s1_project_1st_browser.png" alt="第一次运行应用" title="第一次运行应用" style="cursor: pointer;"></span></p>
<p>自动生成的太没有成就感了是不是，那么我们动手改一下吧。保持运行服务的命令窗口，然后进入VSCode，打开 <code>src/app/app.component.ts</code> 修改title，比如： <code>title = 'This is a hello-angular app';</code>，保存后返回浏览器看一下吧，结果已经更新了，这种热装载的特性使得开发变得很方便。</p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/00ujvqg9m6ir0km0nzp54x4d/c1_s1_project_1st_browser_update.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/00ujvqg9m6ir0km0nzp54x4d/c1_s1_project_1st_browser_update.png" alt="第一次小修改" title="第一次小修改" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">第一个组件</h2>
<p>那么我们来为我们的app增加一个Component吧，在命令行窗口输入 <code>ng generate component login --inline-template --inline-style</code> 。 顾名思义，参数generate是用来生成文件的，参数component是说明我们要生成一个组件，login呢是我们的组件名称，你可以自己想个其他有意思的名字。后面的两个参数是告诉angular-cli：生成组件时，请把组件的HTML模板和CSS样式和组件放在同一个文件中（其实分开文件更清晰，但第一个例子我们还是采用inline方式了）。</p>
<p>是不是感觉这个命令行太长了？幸运的是Angular团队也这么想，所以你可以把上面的命令改写成 <code>ng g c login -it -is</code> ,也就是说可以用generate的首字母g来代替generate，用component的首字母c来代替component，类似的<code>--inline-template</code>的两个词分别取首字母变成<code>-it</code></p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/cemx8k69lys6xcjtecvgns3o/image_1b27r02qlo6f11f19qg1q9k1fclm.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/cemx8k69lys6xcjtecvgns3o/image_1b27r02qlo6f11f19qg1q9k1fclm.png" alt="CLI生成新组件" title="CLI生成新组件" style="cursor: pointer; display: inline;"></span></p>
<p>angular-cli为我们在srcapp目录下生成了一个新文件夹login，在login目录下生成了2个文件，其中 <code>login.component.spec.ts</code> 是测试文件，我们这里暂时不提。另一个是 <code>login.component.ts</code> 这个就是我们新建的Component了。</p>
<p>Angular提倡的文件命名方式是这样的：<code>组件名称.component.ts</code> ，组件的HTML模板命名为： <code>组件名称.component.html</code>，组件的样式文件命名为： <code>组件名称.component.css</code>,大家在编码中尽量遵循Google的官方建议。</p>
<p>我们新生成的Login组件源码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

//@Component是Angular提供的装饰器函数，用来描述Compoent的元数据
//其中selector是指这个组件的在HTML模板中的标签是什么
//template是嵌入（inline）的HTML模板，如果使用单独文件可用templateUrl
//styles是嵌入（inline）的CSS样式，如果使用单独文件可用styleUrls
@Component({
  selector: 'app-login',
  template: `
    <p>
      login Works!
    </p>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-comment">//@Component是Angular提供的装饰器函数，用来描述Compoent的元数据</span>
<span class="hljs-comment">//其中selector是指这个组件的在HTML模板中的标签是什么</span>
<span class="hljs-comment">//template是嵌入（inline）的HTML模板，如果使用单独文件可用templateUrl</span>
<span class="hljs-comment">//styles是嵌入（inline）的CSS样式，如果使用单独文件可用styleUrls</span>
@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;p&gt;
      login Works!
    &lt;/p&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: []
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  <span class="hljs-keyword">constructor</span>() { }

  ngOnInit() {
  }

}</code></pre>
<p>那么这个组件建成后，我们怎么使用呢？注意上面的代码中@Component修饰配置中的 <code>selector: 'app-login'</code>，这意味着我们可以在其他组件的template中使用 <code>&lt;app-login&gt;&lt;/app-login&gt;</code> 来引用我们的这个组件。</p>
<p>现在我们打开 <code>hello-angular\src\app\app.component.html</code> 加入我们的组件引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>
  "{{"title"}}"
</h1>
<app-login></app-login>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
  "{{"title"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">app-login</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-login</span>&gt;</span></code></pre>
<p>保存后返回浏览器，可以看到我们的第一个组件也显示出来了。</p>
<p><span class="img-wrap"><img data-src="http://static.zybuluo.com/wpcfan/hykairb7gc7indb3ytousn2r/image_1b27qsmhp1nlrb8g1uh6cp71qcj9.png" src="https://static.alili.techhttp://static.zybuluo.com/wpcfan/hykairb7gc7indb3ytousn2r/image_1b27qsmhp1nlrb8g1uh6cp71qcj9.png" alt="image_1b27qsmhp1nlrb8g1uh6cp71qcj9.png-19kB" title="image_1b27qsmhp1nlrb8g1uh6cp71qcj9.png-19kB" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">一些基础概念</h2>
<p>这里我们粗略介绍一些Angular的基础概念，这些基础概念在后面的章节中会更详细的讲解。</p>
<h3 id="articleHeader6">什么是模块？</h3>
<p>简单来说模块就是提供相对独立功能的功能块，每块聚焦于一个特定业务领域。Angular内建的很多库是以模块形式提供的，比如FormsModule封装了表单处理，HttpModule封装了Http的处理等等。</p>
<p>每个Angular应用至少有一个模块类 —— <em>根模块</em>，我们将通过引导根模块来启动应用。按照约定，根模块的类名叫做AppModule，被放在 <code>app.module.ts</code> 文件中。我们这个例子中的根模块位于 <code>hello-angular\src\app\app.module.ts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { BrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;
<span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { FormsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/forms'</span>;
<span class="hljs-keyword">import</span> { HttpModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.component'</span>;
<span class="hljs-keyword">import</span> { LoginComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./login/login.component'</span>;

@NgModule({
  <span class="hljs-attr">declarations</span>: [
    AppComponent,
    LoginComponent
  ],
  <span class="hljs-attr">imports</span>: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  <span class="hljs-attr">providers</span>: [],
  <span class="hljs-attr">bootstrap</span>: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppModule</span> </span>{ }</code></pre>
<p>@NgModule装饰器用来为模块定义元数据。declarations列出了应用中的顶层组件，包括引导性组件AppComponent和我们刚刚创建的LoginComponent。在module里面声明的组件在module范围内都可以直接使用，也就是说在同一module里面的任何Component都可以在其模板文件中直接使用声明的组件，就想我们在AppComponent的模板末尾加上 <code>&lt;app-login&gt;&lt;/app-login&gt;</code> 一样。</p>
<p>imports引入了3个辅助模块：</p>
<ul>
<li><p>BrowserModule提供了运行在浏览器中的应用所需要的关键服务（Service）和指令（Directive），这个模块所有需要在浏览器中跑的应用都必须引用；</p></li>
<li><p>FormsModule提供了表单处理和双向绑定等服务和指令</p></li>
<li><p>HttpModule提供Http请求和响应的服务</p></li>
</ul>
<p>providers列出会在此模块中“注入”的服务（Service），关于依赖性注入会在后面章节中详细解释。</p>
<p>bootstrap指明哪个组件为引导性组件（本案例中的AppComponent）。当Angular引导应用时，它会在DOM中渲染这个引导性组件，并把结果放进index.html的该组件的元素标签中（本案例中的app-root）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>HelloAngular</title>
  <base href=&quot;/&quot;>

  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
  <link rel=&quot;icon&quot; type=&quot;image/x-icon&quot; href=&quot;favicon.ico&quot;>
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>HelloAngular<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/x-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"favicon.ico"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader7">引导过程</h3>
<p>Angular2通过在main.ts中引导AppModule来启动应用。针对不同的平台，Angular提供了很多引导选项。下面的代码是通过即时（JiT）编译器动态引导，一般在进行开发调试时，默认采用这种方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.ts
import './polyfills.ts';

// 连同Angular编译器一起发布到浏览器
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}
//Angular编译器在浏览器中编译并引导该应用
platformBrowserDynamic().bootstrapModule(AppModule);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./polyfills.ts'</span>;

<span class="hljs-comment">// 连同Angular编译器一起发布到浏览器</span>
<span class="hljs-keyword">import</span> { platformBrowserDynamic } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser-dynamic'</span>;
<span class="hljs-keyword">import</span> { enableProdMode } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { environment } <span class="hljs-keyword">from</span> <span class="hljs-string">'./environments/environment'</span>;
<span class="hljs-keyword">import</span> { AppModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/'</span>;

<span class="hljs-keyword">if</span> (environment.production) {
  enableProdMode();
}
<span class="hljs-comment">//Angular编译器在浏览器中编译并引导该应用</span>
platformBrowserDynamic().bootstrapModule(AppModule);</code></pre>
<p>另一种方式是使用预编译器（AoT - Ahead-Of-Time）进行静态引导，静态方案可以生成更小、启动更快的应用，建议优先使用它，特别是在移动设备或高延迟网络下。使用static选项，Angular编译器作为构建流程的一部分提前运行，生成一组类工厂。它们的核心就是AppModuleNgFactory。引导预编译的AppModuleNgFactory的语法和动态引导AppModule类的方式很相似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不把编译器发布到浏览器
import { platformBrowser } from '@angular/platform-browser';

// 静态编译器会生成一个AppModule的工厂AppModuleNgFactory
import { AppModuleNgFactory } from './app.module.ngfactory';

// 引导AppModuleNgFactory
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 不把编译器发布到浏览器</span>
<span class="hljs-keyword">import</span> { platformBrowser } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;

<span class="hljs-comment">// 静态编译器会生成一个AppModule的工厂AppModuleNgFactory</span>
<span class="hljs-keyword">import</span> { AppModuleNgFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.module.ngfactory'</span>;

<span class="hljs-comment">// 引导AppModuleNgFactory</span>
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);</code></pre>
<p>本节代码：<a href="https://github.com/wpcfan/awesome-tutorials/tree/chap01/angular2/ng2-tut" rel="nofollow noreferrer" target="_blank">https://github.com/wpcfan/awe...</a></p>
<p>下一节我们再继续，记住大叔能学会的你也能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2.x 从0到1 (一）史上最简单的Angular2教程

## 原文链接
[https://segmentfault.com/a/1190000008213941](https://segmentfault.com/a/1190000008213941)

