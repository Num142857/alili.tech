---
title: 'angular2初入眼帘之－搭个环境' 
date: 2019-02-11 2:30:49
hidden: true
slug: cnrmy7643rp
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">angular2</a>是什么？我猜不容我赘述，各位一定略有耳闻，无论是曾经<a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">AngularJS</a>的拥趸，亦或是<a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>的粉丝，都或多或少的对她有过一点了解。未见其物、先闻其声，<a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">angular2</a>在问世之前已经做足了宣传，想必诸位也一定被下面各种词汇所震慑，什么：<a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TypeScript</a>、 <a href="http://www.ecma-international.org/ecma-262/5.1/" rel="nofollow noreferrer" target="_blank">ES5</a>、 <a href="http://www.ecma-international.org/ecma-262/6.0/" rel="nofollow noreferrer" target="_blank">ES6</a>、 <a href="https://www.dartlang.org/" rel="nofollow noreferrer" target="_blank">Dart</a>、 <a href="https://en.wikipedia.org/wiki/Immutable_object" rel="nofollow noreferrer" target="_blank">Immutable</a>、 <a href="https://medium.com/@AdamRNeary/unidirectional-data-flow-yes-flux-i-am-not-so-sure-b4acf988196c#.bxd6ripaq" rel="nofollow noreferrer" target="_blank">Unidirectional Data Flow</a>、 <a href="https://en.wikipedia.org/wiki/Reactive_programming" rel="nofollow noreferrer" target="_blank">Reactive Programming</a>、 <a href="https://en.wikipedia.org/wiki/Decorator_pattern" rel="nofollow noreferrer" target="_blank">Decorators</a>、 <a href="https://github.com/systemjs/systemjs" rel="nofollow noreferrer" target="_blank">System.js</a>、 <a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a>...，天花乱坠，美不胜收！但我们不禁要问，“都说<a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">AngularJS</a>学习曲线陡峭，也没陡出这些个莫名词汇！”，<a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">angular2</a>究竟该如何上手？看了这些个知识点，有木有吓得手抖，都搞不清从何处入手了！？</p>
<p>本教程主旨：多些操作、少点说教(理论是进阶必须的，千万不要误读)，让我们从实践中追寻真理吧！</p>
<p>本章源码：<a href="https://github.com/leftstick/angular2-lesson/tree/master/examples/environment" rel="nofollow noreferrer" target="_blank">environment</a></p>
<p>本章使用<code>angular2</code>版本为：<code>2.4.5</code>, <code>webpack</code>版本为: <code>2.2.0</code></p>
<h2 id="articleHeader0">推荐开发工具</h2>
<h3 id="articleHeader1">vscode</h3>
<p>这里我推荐使用<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">vscode</a>(原谅我变了，之前推荐的是<code>atom</code>)。很爽的哦！</p>
<h2 id="articleHeader2">创建项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir environment
cd environment
npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code class="shell"><span class="hljs-built_in">mkdir</span> environment
<span class="hljs-built_in">cd</span> environment
npm init</code></pre>
<p>根据<code>npm init</code>提问，创建<code>package.json</code>文件，创建后去掉不必要的字段，像这样即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;environment&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;I will show you how to set up angular2 development environment&quot;,
  &quot;keywords&quot;: [
    &quot;angular2&quot;,
    &quot;environment&quot;
  ],
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server --hot--host 0.0.0.0&quot;
  },
  &quot;author&quot;: &quot;Howard.Zuo&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;dependencies&quot;: {
    &quot;@angular/common&quot;: &quot;^2.4.5&quot;,
    &quot;@angular/compiler&quot;: &quot;^2.4.5&quot;,
    &quot;@angular/core&quot;: &quot;^2.4.5&quot;,
    &quot;@angular/platform-browser&quot;: &quot;^2.4.5&quot;,
    &quot;@angular/platform-browser-dynamic&quot;: &quot;^2.4.5&quot;,
    &quot;@angular/forms&quot;: &quot;^2.4.5&quot;,
    &quot;core-js&quot;: &quot;^2.4.1&quot;,
    &quot;rxjs&quot;: &quot;5.0.3&quot;,
    &quot;zone.js&quot;: &quot;^0.7.6&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;@types/core-js&quot;: &quot;^0.9.35&quot;,
    &quot;ts-loader&quot;: &quot;^2.0.0&quot;,
    &quot;typescript&quot;: &quot;^2.1.5&quot;,
    &quot;webpack&quot;: &quot;^2.2.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.2.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"environment"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"I will show you how to set up angular2 development environment"</span>,
  <span class="hljs-attr">"keywords"</span>: [
    <span class="hljs-string">"angular2"</span>,
    <span class="hljs-string">"environment"</span>
  ],
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"webpack-dev-server --hot--host 0.0.0.0"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Howard.Zuo"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"@angular/common"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-attr">"@angular/compiler"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-attr">"@angular/core"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-attr">"@angular/platform-browser"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-attr">"@angular/platform-browser-dynamic"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-attr">"@angular/forms"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-attr">"core-js"</span>: <span class="hljs-string">"^2.4.1"</span>,
    <span class="hljs-attr">"rxjs"</span>: <span class="hljs-string">"5.0.3"</span>,
    <span class="hljs-attr">"zone.js"</span>: <span class="hljs-string">"^0.7.6"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"@types/core-js"</span>: <span class="hljs-string">"^0.9.35"</span>,
    <span class="hljs-attr">"ts-loader"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-attr">"typescript"</span>: <span class="hljs-string">"^2.1.5"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^2.2.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.2.0"</span>
  }
}</code></pre>
<h2 id="articleHeader3">安装依赖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<ul>
<li><p><a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">@angular</a>: 这个必须的，没意见吧？之所以分了多个包，这是最新<code>2.1.2</code>的变化，可以按需引入，增加灵活性</p></li>
<li><p><a href="https://github.com/zloirock/core-js" rel="nofollow noreferrer" target="_blank">core-js</a>: <code>javascript</code>的一个标准库实现，包含了大量<code>ES2015</code>, <code>ES2016</code>的<code>ES5</code>实现</p></li>
<li><p><a href="https://github.com/ReactiveX/rxjs" rel="nofollow noreferrer" target="_blank">rxjs</a>: 一个<code>Reactive Programming</code>的<code>JavaScript</code>实现。这里对她的依赖是因为<code>angular2</code>支持多种数据更新模式，比如：<a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">flux</a>、<a href="https://github.com/ReactiveX/rxjs" rel="nofollow noreferrer" target="_blank">Rx.js</a></p></li>
<li><p><a href="https://github.com/angular/zone.js/" rel="nofollow noreferrer" target="_blank">zone.js</a>: 用来对异步任务提供<code>Hooks</code>支持，使得在异步任务运行之前/之后做额外操作成为可能。在<code>angular2</code>里的主要应用场景是提高脏检查效率、降低性能损耗。</p></li>
<li><p><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack</a>: 我们这里使用<code>webpack2</code>对源码进行编译、打包，而不是用官网介绍的<code>System.js</code>的运行时加载、解释、执行。合并打包的好处不用我多说吧？减少请求数、<code>uglify</code>、预检查...</p></li>
<li><p><a href="http://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a>: 一个轻量级的，支持<code>webpack</code>编译的静态服务器(调试工具)，本章节我们就用它启动程序</p></li>
<li><p><a href="https://github.com/TypeStrong/ts-loader" rel="nofollow noreferrer" target="_blank">ts-loader</a>: <code>TypeStrong</code>出品的<code>TypeScript</code>加载器，通过该加载器，<code>TypeScript</code>源码可以顺利被编译成<code>ES5</code>代码</p></li>
<li><p><a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">typescript</a>: <code>angular2</code>官方推荐的开发语言，我们在教程里也将使用该语言进行代码编写</p></li>
<li><p><a href="https://www.npmjs.com/package/@types/core-js" rel="nofollow noreferrer" target="_blank">@types/core-js</a>: 自<code>typescript</code> <code>2.0.0</code>以后，使用<code>@types</code>管理声明文件，由于<code>angular2</code>依赖<code>ES2015</code>的诸多特性，譬如：<code>Promise</code>、<code>Map</code>等，所以需要引入这些API的声明</p></li>
</ul>
<h2 id="articleHeader4">第一个示例</h2>
<h3 id="articleHeader5">创建<code>index.html</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs irpf90"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">touch</span> <span class="hljs-built_in">index</span>.html</code></pre>
<p>向刚才创建的<code>index.html</code>里添加如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
    <title>environment</title>
</head>
<body>
    <!--这里引用我们的第一个component-->
    <my-app></my-app>
    <!--加载使用webpack编译后的bundle-->
    <script type=&quot;text/javascript&quot; src=&quot;/dist/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>environment<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!--这里引用我们的第一个component--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-app</span>&gt;</span>
    <span class="hljs-comment">&lt;!--加载使用webpack编译后的bundle--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader6">创建<code>app.ts</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir ts
touch ts/app.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="shell"><span class="hljs-built_in">mkdir</span> <span class="hljs-keyword">ts</span>
touch <span class="hljs-keyword">ts</span>/app.<span class="hljs-keyword">ts</span></code></pre>
<p>向刚才创建的<code>ts/app.ts</code>里添加如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component} from '@angular/core';

//声明第一个Component
@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-comment">//声明第一个Component</span>
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'my-app'</span>,
    template: <span class="hljs-string">'&lt;h1&gt;My First Angular 2 App&lt;/h1&gt;'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h3 id="articleHeader7">创建<code>index.ts</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch ts/index.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="shell" style="word-break: break-word; white-space: initial;">touch <span class="hljs-keyword">ts</span>/<span class="hljs-built_in">index</span>.<span class="hljs-keyword">ts</span></code></pre>
<p>向刚才创建的<code>ts/index.ts</code>里添加如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//不显示引入，你会得到&quot;Uncaught reflect-metadata shim is required when using class decorators&quot;的错误
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

//引入NgModule装饰器
import { NgModule }      from '@angular/core';

//引入浏览器模块
import { BrowserModule } from '@angular/platform-browser';

//引入启动器
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//引入我们刚才创建的第一个component
import { AppComponent }  from './app';

//声明一个应用模块
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
class AppModule { }

//启动应用
platformBrowserDynamic().bootstrapModule(AppModule);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">//不显示引入，你会得到"Uncaught reflect-metadata shim is required when using class decorators"的错误</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'core-js/es6'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'core-js/es7/reflect'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'zone.js/dist/zone'</span>;

<span class="hljs-comment">//引入NgModule装饰器</span>
<span class="hljs-keyword">import</span> { NgModule }      <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-comment">//引入浏览器模块</span>
<span class="hljs-keyword">import</span> { BrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;

<span class="hljs-comment">//引入启动器</span>
<span class="hljs-keyword">import</span> { platformBrowserDynamic } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser-dynamic'</span>;

<span class="hljs-comment">//引入我们刚才创建的第一个component</span>
<span class="hljs-keyword">import</span> { AppComponent }  <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>;

<span class="hljs-comment">//声明一个应用模块</span>
<span class="hljs-meta">@NgModule</span>({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
<span class="hljs-keyword">class</span> AppModule { }

<span class="hljs-comment">//启动应用</span>
platformBrowserDynamic().bootstrapModule(AppModule);</code></pre>
<h3 id="articleHeader8">创建<code>webpack.config.js</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">touch webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<p>向刚才创建的<code>webpack.config.js</code>里添加如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {resolve} = require('path');

module.exports = {
    entry: {
        index: './ts/index.ts'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ]
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> {resolve} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">index</span>: <span class="hljs-string">'./ts/index.ts'</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: resolve(__dirname, <span class="hljs-string">'dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'dist/'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">exprContextCritical</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.ts$/</span>,
                <span class="hljs-attr">use</span>: [<span class="hljs-string">'ts-loader'</span>]
            }
        ]
    },
    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">extensions</span>: [
            <span class="hljs-string">'.js'</span>,
            <span class="hljs-string">'.ts'</span>
        ]
    }
};
</code></pre>
<h3 id="articleHeader9">创建<code>tsconfig.json</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch tsconfig.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">touch</span> <span class="hljs-selector-tag">tsconfig</span><span class="hljs-selector-class">.json</span></code></pre>
<p>向刚才创建的<code>tsconfig.json</code>里添加如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;compilerOptions&quot;: {
        &quot;module&quot;: &quot;commonjs&quot;,
        &quot;target&quot;: &quot;es5&quot;,
        &quot;moduleResolution&quot;: &quot;node&quot;,
        &quot;noImplicitAny&quot;: true,
        &quot;removeComments&quot;: true,
        &quot;emitDecoratorMetadata&quot;: true,
        &quot;experimentalDecorators&quot;: true,
        &quot;sourceMap&quot;: true,
        &quot;declaration&quot;: false
    },
    &quot;buildOnSave&quot;: false,
    &quot;compileOnSave&quot;: false,
    &quot;exclude&quot;: [
        &quot;node_modules&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"compilerOptions"</span>: {
        <span class="hljs-attr">"module"</span>: <span class="hljs-string">"commonjs"</span>,
        <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es5"</span>,
        <span class="hljs-attr">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
        <span class="hljs-attr">"noImplicitAny"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"removeComments"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"emitDecoratorMetadata"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"declaration"</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">"buildOnSave"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"compileOnSave"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"exclude"</span>: [
        <span class="hljs-string">"node_modules"</span>
    ]
}</code></pre>
<h2 id="articleHeader10">运行</h2>
<p>好了，到目前为止，我们第一个示例的开发/运行环境就基本搭好了，现在启动试试看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<p>你会看到：</p>
<p><span class="img-wrap"><img data-src="/img/bVuQHp?w=510&amp;h=120" src="https://static.alili.tech/img/bVuQHp?w=510&amp;h=120" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>下回预告：<a href="https://segmentfault.com/a/1190000004942003">牛刀小试<code>component</code></a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular2初入眼帘之－搭个环境

## 原文链接
[https://segmentfault.com/a/1190000004930079](https://segmentfault.com/a/1190000004930079)

