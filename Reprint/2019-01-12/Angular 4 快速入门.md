---
title: 'Angular 4 快速入门' 
date: 2019-01-12 2:30:25
hidden: true
slug: 7v8ufkqdg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>建了个群有兴趣的朋友可以加一下 QQ 群：Angular 修仙之路(1)群 - 153742079 (已满)，请加 Angular 修仙之路(2)群 - 648681235。</blockquote>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>第一节 - Angular 简介</li>
<li>第二节 - Angular 环境搭建</li>
<li>第三节 - 插值表达式</li>
<li>第四节 - 自定义组件</li>
<li>第五节 - 常用指令简介</li>
<li>第六节 - 事件绑定</li>
<li>第七节 - 表单模块简介</li>
<li>第八节 - Http 模块简介</li>
<li>第九节 - 注入服务</li>
<li>第十节 - 路由模块简介</li>
</ul>
<blockquote><strong>查看新版教程，请访问 <a href="http://www.semlinker.com/ng-quick-start/" rel="nofollow noreferrer" target="_blank">Angular 6.x 快速入门</a></strong></blockquote>
<h2 id="articleHeader1">第一节 Angular 简介</h2>
<h3 id="articleHeader2">Angular 是什么</h3>
<p><a href="https://www.angular.cn/" rel="nofollow noreferrer" target="_blank">Angular</a> 是由谷歌开发与维护一个开发跨平台应用程序的框架，同时适用于手机与桌面。</p>
<h3 id="articleHeader3">Angular 有什么特点</h3>
<ul>
<li>基于 Angular 我们可以构建适用于所有平台的应用。比如：Web 应用、移动 Web 应用、移动应用和桌面应用等。</li>
<li>通过 Web Worker和服务端渲染 (SSR)，达到在如今Web平台上所能达到的最高渲染速度。</li>
<li>Angular 让你能够有效掌控可伸缩性。基于 RxJS、Immutable.js 和其它推送模型，能适应海量数据需求。</li>
</ul>
<h3 id="articleHeader4">Angular 提供了哪些功能</h3>
<ul>
<li>动态HTML</li>
<li>强大的表单系统 (模板驱动和模型驱动)</li>
<li>强大的视图引擎</li>
<li>事件处理</li>
<li>快速的页面渲染</li>
<li>灵活的路由</li>
<li>HTTP 服务</li>
<li>视图封装</li>
<li>AOT、Tree Shaking</li>
</ul>
<h3 id="articleHeader5">Angular 与 AngularJS 有什么区别</h3>
<ul>
<li>不再有<code>Controller</code>和 <code>Scope</code>
</li>
<li>更好的组件化及代码复用</li>
<li>更好的移动端支持</li>
<li>引入了 <code>RxJS</code> 与 <code>Observable</code>
</li>
<li>引入了 <code>Zone.js</code>，提供更加智能的变化检测</li>
</ul>
<h2 id="articleHeader6">第二节 - Angular 环境搭建</h2>
<h3 id="articleHeader7">基础要求</h3>
<ul>
<li><a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Node.js</a></li>
<li><a href="https://git-scm.com/" rel="nofollow noreferrer" target="_blank">Git</a></li>
</ul>
<h3 id="articleHeader8">Angular 开发环境配置方式</h3>
<ul>
<li>
<p>基于 Angular Quickstart</p>
<ul><li><a href="https://github.com/angular/quickstart" rel="nofollow noreferrer" target="_blank">https://github.com/angular/qu...</a></li></ul>
</li>
<li>
<p>基于 Angular CLI</p>
<ul><li>npm install -g @angular/cli</li></ul>
</li>
</ul>
<h3 id="articleHeader9">配置开发环境</h3>
<p>本快速入门教程，选用第一种配置方式搭建 Angular 开发环境：</p>
<h4>基于 Angular Quickstart</h4>
<ul><li>使用 <code>Git</code> 克隆 quickstart 项目</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/angular/quickstart ng4-quickstart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/angular/quickstart ng4-quickstart</code></pre>
<ul><li>使用 <code>IDE</code> 打开已新建的项目 (本教程使用的 IDE 是 <a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">Visual Studio Code</a>)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="code ./ng4-quickstart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">code</span> ./ng4-quickstart</code></pre>
<ul><li>安装项目所需依赖</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> </code></pre>
<ul><li>验证环境是否搭建成功</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<h4>基于 Angular CLI</h4>
<ul><li>安装 <a href="https://github.com/angular/angular-cli" rel="nofollow noreferrer" target="_blank">Angular CLI</a> (可选)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @angular/cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install -g @angular/cli</code></pre>
<ul><li>检测 Angular CLI 是否安装成功</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng --version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">ng <span class="hljs-comment">--version</span></code></pre>
<ul><li>创建新的项目</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng new PROJECT-NAME" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">ng <span class="hljs-keyword">new</span> <span class="hljs-keyword">PROJECT</span>-NAME</code></pre>
<ul><li>启动本地服务器</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd PROJECT-NAME
ng serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> PROJECT-NAME
ng serve</code></pre>
<h2 id="articleHeader10">第三节 - 插值表达式</h2>
<p>在 Angular 中，我们可以使用 <code>"{{""}}"</code> 插值语法实现数据绑定。</p>
<h3 id="articleHeader11">绑定普通文本</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello "{{"name"}}"</h1>`,
})
export class AppComponent  {
  name = 'Angular'; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`&lt;h1&gt;Hello "{{"name"}}"&lt;/h1&gt;`</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent  {
  name = <span class="hljs-string">'Angular'</span>; 
}</code></pre>
<h3 id="articleHeader12">绑定对象属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h2>大家好，我是"{{"name"}}"</h2>
    <p>我来自<strong>"{{"address.province"}}"</strong>省,
      <strong>"{{"address.city"}}"</strong>市
    </p>
  `,
})
export class AppComponent {
  name = 'Semlinker';
  address = {
    province: '福建',
    city: '厦门'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;h2&gt;大家好，我是"{{"name"}}"&lt;/h2&gt;
    &lt;p&gt;我来自&lt;strong&gt;"{{"address.province"}}"&lt;/strong&gt;省,
      &lt;strong&gt;"{{"address.city"}}"&lt;/strong&gt;市
    &lt;/p&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  name = <span class="hljs-string">'Semlinker'</span>;
  address = {
    province: <span class="hljs-string">'福建'</span>,
    city: <span class="hljs-string">'厦门'</span>
  }
}</code></pre>
<p>值得一提的是，我们可以使用 Angular 内置的 <code>json</code> 管道，来显示对象信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-app',
  template: `
    ...
    <p>"{{"address | json"}}"</p>
  `,
})
export class AppComponent {
  name = 'Semlinker';
  address = {
    province: '福建',
    city: '厦门'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    ...
    &lt;p&gt;"{{"address | json"}}"&lt;/p&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {
  name = <span class="hljs-string">'Semlinker'</span>;
  address = {
    province: <span class="hljs-string">'福建'</span>,
    city: <span class="hljs-string">'厦门'</span>
  }
}</code></pre>
<h2 id="articleHeader13">第四节 - 自定义组件</h2>
<p>在 Angular 中，我们可以通过 <code>Component</code> 装饰器和自定义组件类来创建自定义组件。</p>
<h3 id="articleHeader14">基础知识</h3>
<h4>定义组件的元信息</h4>
<p>在 Angular 中，我们可以使用 <code>Component</code> 装饰器来定义组件的元信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-app', // 用于定义组件在HTML代码中匹配的标签
  template: `<h1>Hello "{{"name"}}"</h1>`, // 定义组件内嵌视图
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>, <span class="hljs-comment">// 用于定义组件在HTML代码中匹配的标签</span>
  template: <span class="hljs-string">`&lt;h1&gt;Hello "{{"name"}}"&lt;/h1&gt;`</span>, <span class="hljs-comment">// 定义组件内嵌视图</span>
})</code></pre>
<h4>定义组件类</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class AppComponent  {
  name = 'Angular'; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent  {
  name = <span class="hljs-string">'Angular'</span>; 
}</code></pre>
<h4>定义数据接口</h4>
<p>在 TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Person {
  name: string;
  age: number;
}

let semlinker: Person = {
  name: 'semlinker',
  age: 31
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> Person {
  name: <span class="hljs-built_in">string</span>;
  age: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">let</span> semlinker: Person = {
  name: <span class="hljs-string">'semlinker'</span>,
  age: <span class="hljs-number">31</span>
};</code></pre>
<h3 id="articleHeader15">自定义组件示例</h3>
<h4>创建 UserComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
    selector: 'sl-user',
    template: `
    <h2>大家好，我是"{{"name"}}"</h2>
    <p>我来自<strong>"{{"address.province"}}"</strong>省,
      <strong>"{{"address.city"}}"</strong>市
    </p>
    `
})
export class UserComponent {
    name = 'Semlinker';
    address = {
        province: '福建',
        city: '厦门'
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-user'</span>,
    template: <span class="hljs-string">`
    &lt;h2&gt;大家好，我是"{{"name"}}"&lt;/h2&gt;
    &lt;p&gt;我来自&lt;strong&gt;"{{"address.province"}}"&lt;/strong&gt;省,
      &lt;strong&gt;"{{"address.city"}}"&lt;/strong&gt;市
    &lt;/p&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
    name = <span class="hljs-string">'Semlinker'</span>;
    address = {
        province: <span class="hljs-string">'福建'</span>,
        city: <span class="hljs-string">'厦门'</span>
    };
}</code></pre>
<h4>声明  UserComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
import { UserComponent } from './user.component';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, UserComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { UserComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./user.component'</span>;
<span class="hljs-meta">@NgModule</span>({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, UserComponent],
  bootstrap:    [ AppComponent ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>使用  UserComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <sl-user></sl-user>
  `,
})
export class AppComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;sl-user&gt;&lt;/sl-user&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {}</code></pre>
<h4>使用构造函数初始化数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({...})
export class UserComponent {
    name: string;
    address: any;

    constructor() {
        this.name = 'Semlinker';
        this.address = {
            province: '福建',
            city: '厦门'
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({...})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
    name: <span class="hljs-built_in">string</span>;
    address: <span class="hljs-built_in">any</span>;

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Semlinker'</span>;
        <span class="hljs-keyword">this</span>.address = {
            province: <span class="hljs-string">'福建'</span>,
            city: <span class="hljs-string">'厦门'</span>
        }
    }
}</code></pre>
<h3 id="articleHeader16">接口使用示例</h3>
<h4>定义 Address 接口</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Address {
    province: string;
    city: string;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> Address {
    province: <span class="hljs-built_in">string</span>;
    city: <span class="hljs-built_in">string</span>;
}</code></pre>
<h4>使用 Address 接口</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class UserComponent {
    name: string;
    address: Address;
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
    name: <span class="hljs-built_in">string</span>;
    address: Address;
    <span class="hljs-comment">// ...</span>
}</code></pre>
<h2 id="articleHeader17">第五节 - 常用指令简介</h2>
<p>在 Angular 实际项目中，最常用的指令是 <code>ngIf</code> 和 <code>ngFor</code> 指令。</p>
<h3 id="articleHeader18">基础知识</h3>
<h4>ngIf 指令简介</h4>
<p>该指令用于根据表达式的值，动态控制模板内容的显示与隐藏。它与 AngularJS 1.x 中的 <code>ng-if</code> 指令的功能是等价的。</p>
<h4>ngIf 指令语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div *ngIf=&quot;condition&quot;>...</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">&lt;div *ngIf=<span class="hljs-string">"condition"</span>&gt;...&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<h4>ngFor 指令简介</h4>
<p>该指令用于基于可迭代对象中的每一项创建相应的模板。它与 AngularJS 1.x 中的 <code>ng-repeat</code> 指令的功能是等价的。</p>
<h4>ngFor 指令语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li *ngFor=&quot;let item of items;&quot;>...</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">&lt;li *ngFor=<span class="hljs-string">"let item of items;"</span>&gt;...&lt;<span class="hljs-regexp">/li&gt;</span></code></pre>
<h3 id="articleHeader19">ngIf 与 ngFor 指令使用示例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

interface Address {
    province: string;
    city: string;
}

@Component({
    selector: 'sl-user',
    template: `
    <h2>大家好，我是"{{"name"}}"</h2>
    <p>我来自<strong>"{{"address.province"}}"</strong>省,
      <strong>"{{"address.city"}}"</strong>市
    </p>
    <div *ngIf=&quot;showSkills&quot;>
        <h3>我的技能</h3>
        <ul>
            <li *ngFor=&quot;let skill of skills&quot;>
                "{{"skill"}}"
            </li>
        </ul>
    </div>
    `
})
export class UserComponent {
    name: string;
    address: Address;
    showSkills: boolean;
    skills: string[];

    constructor() {
        this.name = 'Semlinker';
        this.address = {
            province: '福建',
            city: '厦门'
        };
        this.showSkills = true;
        this.skills = ['AngularJS 1.x', 'Angular 2.x', 'Angular 4.x'];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-keyword">interface</span> Address {
    province: <span class="hljs-built_in">string</span>;
    city: <span class="hljs-built_in">string</span>;
}

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-user'</span>,
    template: <span class="hljs-string">`
    &lt;h2&gt;大家好，我是"{{"name"}}"&lt;/h2&gt;
    &lt;p&gt;我来自&lt;strong&gt;"{{"address.province"}}"&lt;/strong&gt;省,
      &lt;strong&gt;"{{"address.city"}}"&lt;/strong&gt;市
    &lt;/p&gt;
    &lt;div *ngIf="showSkills"&gt;
        &lt;h3&gt;我的技能&lt;/h3&gt;
        &lt;ul&gt;
            &lt;li *ngFor="let skill of skills"&gt;
                "{{"skill"}}"
            &lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
    name: <span class="hljs-built_in">string</span>;
    address: Address;
    showSkills: <span class="hljs-built_in">boolean</span>;
    skills: <span class="hljs-built_in">string</span>[];

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Semlinker'</span>;
        <span class="hljs-keyword">this</span>.address = {
            province: <span class="hljs-string">'福建'</span>,
            city: <span class="hljs-string">'厦门'</span>
        };
        <span class="hljs-keyword">this</span>.showSkills = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.skills = [<span class="hljs-string">'AngularJS 1.x'</span>, <span class="hljs-string">'Angular 2.x'</span>, <span class="hljs-string">'Angular 4.x'</span>];
    }
}</code></pre>
<h2 id="articleHeader20">第六节 - 事件绑定</h2>
<p>在 Angular 中，我们可以通过 <code>(eventName)</code> 的语法，实现事件绑定。</p>
<h3 id="articleHeader21">基础知识</h3>
<h4>事件绑定语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<date-picker (dateChanged)=&quot;statement()&quot;></date-picker>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">date-picker</span> (<span class="hljs-attr">dateChanged</span>)=<span class="hljs-string">"statement()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">date-picker</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<date-picker on-dateChanged=&quot;statement()&quot;></date-picker>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-built_in">date</span>-picker <span class="hljs-keyword">on</span>-dateChanged=<span class="hljs-string">"statement()"</span>&gt;&lt;/<span class="hljs-built_in">date</span>-picker&gt;</code></pre>
<p>介绍完事件绑定的语法，接下来我们来为第五节中的 <code>UserComponent</code> 组件，开发一个功能，即可以让用户动态控制技能信息的显示与隐藏。</p>
<h3 id="articleHeader22">事件绑定示例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sl-user',
    template: `
    ...
    <button (click)=&quot;toggleSkills()&quot;>
        "{{" showSkills ? &quot;隐藏技能&quot; : &quot;显示技能&quot; "}}"
    </button>
    ...
    `
})
export class UserComponent {
    // ...
    toggleSkills() {
        this.showSkills = !this.showSkills;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-user'</span>,
    template: <span class="hljs-string">`
    ...
    &lt;button (click)="toggleSkills()"&gt;
        "{{" showSkills ? "隐藏技能" : "显示技能" "}}"
    &lt;/button&gt;
    ...
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
    <span class="hljs-comment">// ...</span>
    toggleSkills() {
        <span class="hljs-keyword">this</span>.showSkills = !<span class="hljs-keyword">this</span>.showSkills;
    }
}</code></pre>
<h2 id="articleHeader23">第七节 - 表单模块简介</h2>
<p>Angular 中有两种表单：</p>
<ul>
<li>Template Driven Forms - 模板驱动式表单 (类似于 AngularJS 1.x 中的表单 )</li>
<li>Reactive Forms - 响应式表单</li>
</ul>
<p>本小节主要介绍模板驱动式的表单，接下来我们来演示如何通过表单来为我们的之前创建的 <code>UserComponent</code> 组件，增加让用户自定义技能的功能。</p>
<h3 id="articleHeader24">基础知识</h3>
<h4>导入表单模块</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FormsModule } from '@angular/forms';
// ...
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { FormsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/forms'</span>;
<span class="hljs-comment">// ...</span>
<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, UserComponent],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>模板变量语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video #player></video> 
<button (click)=&quot;player.pause()&quot;>Pause</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">&lt;video #player&gt;&lt;<span class="hljs-regexp">/video&gt; 
&lt;button (click)="player.pause()"&gt;Pause&lt;/</span>button&gt;</code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video ref-player></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;video ref-player&gt;</span><span class="hljs-section">&lt;/video&gt;</span></code></pre>
<h3 id="articleHeader25">表单使用示例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    selector: 'sl-user',
    template: `
    ...
    <div *ngIf=&quot;showSkills&quot;>
        <h3>我的技能</h3>
        ...
        <form (submit)=&quot;addSkill(skill.value)&quot;>
            <label>添加技能</label>
            <input type=&quot;text&quot; #skill>
        </form>
    </div>
    `
})
export class UserComponent {
   // ...
    addSkill(skill: string) {
        let skillStr = skill.trim();
        if (this.skills.indexOf(skillStr) === -1) {
            this.skills.push(skillStr);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-user'</span>,
    template: <span class="hljs-string">`
    ...
    &lt;div *ngIf="showSkills"&gt;
        &lt;h3&gt;我的技能&lt;/h3&gt;
        ...
        &lt;form (submit)="addSkill(skill.value)"&gt;
            &lt;label&gt;添加技能&lt;/label&gt;
            &lt;input type="text" #skill&gt;
        &lt;/form&gt;
    &lt;/div&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
   <span class="hljs-comment">// ...</span>
    addSkill(skill: <span class="hljs-built_in">string</span>) {
        <span class="hljs-keyword">let</span> skillStr = skill.trim();
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.skills.indexOf(skillStr) === <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">this</span>.skills.push(skillStr);
        }
    }
}</code></pre>
<h2 id="articleHeader26">第八节 - Http 模块简介</h2>
<blockquote>Angular 4.3 版本后，推荐使用 HttpClient，可以参考 <a href="https://segmentfault.com/a/1190000010259536">Angular HTTP Client 快速入门</a>
</blockquote>
<h3 id="articleHeader27">基础知识</h3>
<h4>导入 Http 模块</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ... 
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// ... </span>
<span class="hljs-keyword">import</span> { HttpModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, UserComponent],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>使用 Http 服务步骤</h4>
<p>(1) 从 <code>@angular/http</code> 模块中导入 Http 类</p>
<p>(2) 导入 RxJS 中的 <code>map</code> 操作符</p>
<p>(3) 使用 DI 方式注入 http 服务</p>
<p>(4) 调用 http 服务的 <code>get()</code> 方法，设置请求地址并发送 HTTP 请求</p>
<p>(5) 调用 Response 对象的 <code>json()</code> 方法，把响应体转成 JSON 对象</p>
<p>(6) 把请求的结果，赋值给对应的属性</p>
<h3 id="articleHeader28">Http 服务使用示例</h3>
<h4>使用 Http 服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'; // (1)
import 'rxjs/add/operator/map'; // (2)

interface Member {
    id: string;
    login: string;
    avatar_url: string;
}

@Component({
    selector: 'sl-members',
    template: `
    <h3>Angular Orgs Members</h3>
    <ul *ngIf=&quot;members&quot;>
      <li *ngFor=&quot;let member of members;&quot;>
        <p>
          <img [src]=&quot;member.avatar_url&quot; width=&quot;48&quot; height=&quot;48&quot;/>
          ID：<span>"{{"member.id"}}"</span>
          Name: <span>"{{"member.login"}}"</span>
        </p>
      </li>
    </ul>
    `
})
export class MembersComponent implements OnInit {
  members: Member[];

  constructor(private http: Http) { } // (3)

  ngOnInit() {
    this.http.get(`https://api.github.com/orgs/angular/members?page=1&amp;per_page=5`) // (4)
        .map(res => res.json()) // (5)
        .subscribe(data => {
           if (data) this.members = data; // (6)
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>; <span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>; <span class="hljs-comment">// (2)</span>

<span class="hljs-keyword">interface</span> Member {
    id: <span class="hljs-built_in">string</span>;
    login: <span class="hljs-built_in">string</span>;
    avatar_url: <span class="hljs-built_in">string</span>;
}

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-members'</span>,
    template: <span class="hljs-string">`
    &lt;h3&gt;Angular Orgs Members&lt;/h3&gt;
    &lt;ul *ngIf="members"&gt;
      &lt;li *ngFor="let member of members;"&gt;
        &lt;p&gt;
          &lt;img [src]="member.avatar_url" width="48" height="48"/&gt;
          ID：&lt;span&gt;"{{"member.id"}}"&lt;/span&gt;
          Name: &lt;span&gt;"{{"member.login"}}"&lt;/span&gt;
        &lt;/p&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MembersComponent <span class="hljs-keyword">implements</span> OnInit {
  members: Member[];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { } <span class="hljs-comment">// (3)</span>

  ngOnInit() {
    <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">`https://api.github.com/orgs/angular/members?page=1&amp;per_page=5`</span>) <span class="hljs-comment">// (4)</span>
        .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json()) <span class="hljs-comment">// (5)</span>
        .subscribe(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
           <span class="hljs-keyword">if</span> (data) <span class="hljs-keyword">this</span>.members = data; <span class="hljs-comment">// (6)</span>
        });
    }
}</code></pre>
<h4>声明 MembersComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
import { MembersComponent } from './members.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, UserComponent, MembersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { MembersComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./members.component'</span>;

<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, UserComponent, MembersComponent],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>使用 MembersComponent 组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <sl-members></sl-members>
  `,
})
export class AppComponent {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;sl-members&gt;&lt;/sl-members&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {}</code></pre>
<h2 id="articleHeader29">第九节 - 注入服务</h2>
<h3 id="articleHeader30">基础知识</h3>
<h4>组件中注入服务步骤</h4>
<p>(1) 配置已创建的服务，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  // ...
  providers: [MemberService]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@NgModule</span>({
  <span class="hljs-comment">// ...</span>
  providers: [MemberService]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<p>(2) 导入已创建的服务，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MemberService } from '../member.service';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { MemberService } <span class="hljs-keyword">from</span> <span class="hljs-string">'../member.service'</span>;</code></pre>
<p>(3) 使用构造注入方式，注入服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class MembersComponent implements OnInit {
   // ...
   constructor(private memberService: MemberService) { }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MembersComponent <span class="hljs-keyword">implements</span> OnInit {
   <span class="hljs-comment">// ...</span>
   <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> memberService: MemberService</span>) { }
}</code></pre>
<h3 id="articleHeader31">服务使用示例</h3>
<h4>创建 MemberService 服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MemberService {
    constructor(private http: Http) { }

    getMembers() {
        return this.http
            .get(`https://api.github.com/orgs/angular/members?page=1&amp;per_page=5`)
            .map(res => res.json())
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MemberService {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { }

    getMembers() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http
            .get(<span class="hljs-string">`https://api.github.com/orgs/angular/members?page=1&amp;per_page=5`</span>)
            .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
    }
}</code></pre>
<h4>配置 MemberService 服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MemberService } from &quot;./member.service&quot;;

@NgModule({
  // ...
  providers:[MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { MemberService } <span class="hljs-keyword">from</span> <span class="hljs-string">"./member.service"</span>;

<span class="hljs-meta">@NgModule</span>({
  <span class="hljs-comment">// ...</span>
  providers:[MemberService],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>使用 MemberService 服务</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
import { MemberService } from &quot;./member.service&quot;;

@Component({...})
export class MembersComponent implements OnInit {
    members: Member[];

    constructor(private memberService: MemberService) { }

    ngOnInit() {
        this.memberService.getMembers()
            .subscribe(data => {
                if (data) this.members = data;
            });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { MemberService } <span class="hljs-keyword">from</span> <span class="hljs-string">"./member.service"</span>;

<span class="hljs-meta">@Component</span>({...})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MembersComponent <span class="hljs-keyword">implements</span> OnInit {
    members: Member[];

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> memberService: MemberService</span>) { }

    ngOnInit() {
        <span class="hljs-keyword">this</span>.memberService.getMembers()
            .subscribe(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (data) <span class="hljs-keyword">this</span>.members = data;
            });
    }
}</code></pre>
<h2 id="articleHeader32">第十节 - 路由模块简介</h2>
<h3 id="articleHeader33">基础知识</h3>
<h4>导入路由模块</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule],
  declarations: [AppComponent, UserComponent, MembersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { RouterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule],
  declarations: [AppComponent, UserComponent, MembersComponent],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>配置路由信息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

export const ROUTES: Routes = [
  { path: 'user', component: UserComponent }
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
<span class="hljs-keyword">import</span> { UserComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./user.component'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  { path: <span class="hljs-string">'user'</span>, component: UserComponent }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<h4>routerLink 指令</h4>
<p>为了让我们链接到已设置的路由，我们需要使用 routerLink 指令，具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<nav>
  <a routerLink=&quot;/&quot;>首页</a>
  <a routerLink=&quot;/user&quot;>我的</a>
</nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/user"</span>&gt;</span>我的<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<p>当我们点击以上的任意链接时，页面不会被重新加载。反之，我们的路径将在 URL 地址栏中显示，随后进行后续视图更新，以匹配 <code>routerLink</code> 中设置的值。</p>
<h4>router-outlet 指令</h4>
<p>该指令用于告诉 Angular 在哪里加载组件，当 Angular 路由匹配到响应路径，并成功找到需要加载的组件时，它将动态创建对应的组件，并将其作为兄弟元素，插入到 <code>router-outlet</code> 元素中。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
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
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h3&gt;Our app&lt;/h3&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent {}</code></pre>
<h3 id="articleHeader34">路由使用示例</h3>
<h4>配置路由信息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  { path: 'user', component: UserComponent },
  { path: 'members', component: MembersComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(ROUTES)],
  // ...
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  { path: <span class="hljs-string">''</span>, pathMatch: <span class="hljs-string">'full'</span>, redirectTo: <span class="hljs-string">'user'</span> },
  { path: <span class="hljs-string">'user'</span>, component: UserComponent },
  { path: <span class="hljs-string">'members'</span>, component: MembersComponent }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(ROUTES)],
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h4>配置路由导航</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class=&quot;app&quot;>
      <h1>欢迎来到Angular的世界</h1>
      <nav>
        <a routerLink=&quot;/user&quot;>我的</a>
        <a routerLink=&quot;/members&quot;>Angular成员</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h1&gt;欢迎来到Angular的世界&lt;/h1&gt;
      &lt;nav&gt;
        &lt;a routerLink="/user"&gt;我的&lt;/a&gt;
        &lt;a routerLink="/members"&gt;Angular成员&lt;/a&gt;
      &lt;/nav&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h2 id="articleHeader35">完整示例</h2>
<h3 id="articleHeader36">AppModule</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { MembersComponent } from './members.component';
import { MemberService } from &quot;./member.service&quot;;

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  { path: 'user', component: UserComponent },
  { path: 'members', component: MembersComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(ROUTES)],
  declarations: [AppComponent, UserComponent, MembersComponent],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { NgModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { BrowserModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;
<span class="hljs-keyword">import</span> { FormsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/forms'</span>;
<span class="hljs-keyword">import</span> { HttpModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;
<span class="hljs-keyword">import</span> { RouterModule, Routes } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.component'</span>;
<span class="hljs-keyword">import</span> { UserComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./user.component'</span>;
<span class="hljs-keyword">import</span> { MembersComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./members.component'</span>;
<span class="hljs-keyword">import</span> { MemberService } <span class="hljs-keyword">from</span> <span class="hljs-string">"./member.service"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTES: Routes = [
  { path: <span class="hljs-string">''</span>, pathMatch: <span class="hljs-string">'full'</span>, redirectTo: <span class="hljs-string">'user'</span> },
  { path: <span class="hljs-string">'user'</span>, component: UserComponent },
  { path: <span class="hljs-string">'members'</span>, component: MembersComponent }
];

<span class="hljs-meta">@NgModule</span>({
  imports: [BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(ROUTES)],
  declarations: [AppComponent, UserComponent, MembersComponent],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h3 id="articleHeader37">AppComponent</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class=&quot;app&quot;>
      <h1>欢迎来到Angular的世界</h1>
      <nav>
        <a routerLink=&quot;/user&quot;>我的</a>
        <a routerLink=&quot;/members&quot;>Angular成员</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;div class="app"&gt;
      &lt;h1&gt;欢迎来到Angular的世界&lt;/h1&gt;
      &lt;nav&gt;
        &lt;a routerLink="/user"&gt;我的&lt;/a&gt;
        &lt;a routerLink="/members"&gt;Angular成员&lt;/a&gt;
      &lt;/nav&gt;
      &lt;router-outlet&gt;&lt;/router-outlet&gt;
    &lt;/div&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre>
<h3 id="articleHeader38">UserComponent</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';


interface Address {
    province: string;
    city: string;
}

@Component({
    selector: 'sl-user',
    template: `
    <h2>大家好，我是"{{"name"}}"</h2>
    <p>我来自<strong>"{{"address.province"}}"</strong>省,
      <strong>"{{"address.city"}}"</strong>市
    </p>
    <button (click)=&quot;toggleSkills()&quot;>
        "{{" showSkills ? &quot;隐藏技能&quot; : &quot;显示技能&quot; "}}"
    </button>
    <div *ngIf=&quot;showSkills&quot;>
        <h3>我的技能</h3>
        <ul>
            <li *ngFor=&quot;let skill of skills&quot;>
                "{{"skill"}}"
            </li>
        </ul>
        <form (submit)=&quot;addSkill(skill.value)&quot;>
            <label>添加技能</label>
            <input type=&quot;text&quot; #skill>
        </form>
    </div>
    `
})
export class UserComponent {
    name: string;
    address: Address;
    showSkills: boolean;
    skills: string[];

    constructor() {
        this.name = 'Semlinker';
        this.address = {
            province: '福建',
            city: '厦门'
        };
        this.showSkills = true;
        this.skills = ['AngularJS 1.x', 'Angular 2.x', 'Angular 4.x'];
    }

    toggleSkills() {
        this.showSkills = !this.showSkills;
    }

    addSkill(skill: string) {
        let skillStr = skill.trim();
        if (this.skills.indexOf(skillStr) === -1) {
            this.skills.push(skillStr);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;


<span class="hljs-keyword">interface</span> Address {
    province: <span class="hljs-built_in">string</span>;
    city: <span class="hljs-built_in">string</span>;
}

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-user'</span>,
    template: <span class="hljs-string">`
    &lt;h2&gt;大家好，我是"{{"name"}}"&lt;/h2&gt;
    &lt;p&gt;我来自&lt;strong&gt;"{{"address.province"}}"&lt;/strong&gt;省,
      &lt;strong&gt;"{{"address.city"}}"&lt;/strong&gt;市
    &lt;/p&gt;
    &lt;button (click)="toggleSkills()"&gt;
        "{{" showSkills ? "隐藏技能" : "显示技能" "}}"
    &lt;/button&gt;
    &lt;div *ngIf="showSkills"&gt;
        &lt;h3&gt;我的技能&lt;/h3&gt;
        &lt;ul&gt;
            &lt;li *ngFor="let skill of skills"&gt;
                "{{"skill"}}"
            &lt;/li&gt;
        &lt;/ul&gt;
        &lt;form (submit)="addSkill(skill.value)"&gt;
            &lt;label&gt;添加技能&lt;/label&gt;
            &lt;input type="text" #skill&gt;
        &lt;/form&gt;
    &lt;/div&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> UserComponent {
    name: <span class="hljs-built_in">string</span>;
    address: Address;
    showSkills: <span class="hljs-built_in">boolean</span>;
    skills: <span class="hljs-built_in">string</span>[];

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Semlinker'</span>;
        <span class="hljs-keyword">this</span>.address = {
            province: <span class="hljs-string">'福建'</span>,
            city: <span class="hljs-string">'厦门'</span>
        };
        <span class="hljs-keyword">this</span>.showSkills = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.skills = [<span class="hljs-string">'AngularJS 1.x'</span>, <span class="hljs-string">'Angular 2.x'</span>, <span class="hljs-string">'Angular 4.x'</span>];
    }

    toggleSkills() {
        <span class="hljs-keyword">this</span>.showSkills = !<span class="hljs-keyword">this</span>.showSkills;
    }

    addSkill(skill: <span class="hljs-built_in">string</span>) {
        <span class="hljs-keyword">let</span> skillStr = skill.trim();
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.skills.indexOf(skillStr) === <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">this</span>.skills.push(skillStr);
        }
    }
}</code></pre>
<h3 id="articleHeader39">MembersComponent</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { MemberService } from &quot;./member.service&quot;;

interface Member {
    id: string;
    login: string;
    avatar_url: string;
}

@Component({
    selector: 'sl-members',
    template: `
    <h3>Angular Orgs Members</h3>
    <ul *ngIf=&quot;members&quot;>
      <li *ngFor=&quot;let member of members;&quot;>
        <p>
          <img [src]=&quot;member.avatar_url&quot; width=&quot;48&quot; height=&quot;48&quot;/>
          ID：<span>"{{"member.id"}}"</span>
          Name: <span>"{{"member.login"}}"</span>
        </p>
      </li>
    </ul>
    `
})
export class MembersComponent implements OnInit {
    members: Member[];

    constructor(private memberService: MemberService) { }

    ngOnInit() {
        this.memberService.getMembers()
            .subscribe(data => {
                if (data) this.members = data;
            });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>;

<span class="hljs-keyword">import</span> { MemberService } <span class="hljs-keyword">from</span> <span class="hljs-string">"./member.service"</span>;

<span class="hljs-keyword">interface</span> Member {
    id: <span class="hljs-built_in">string</span>;
    login: <span class="hljs-built_in">string</span>;
    avatar_url: <span class="hljs-built_in">string</span>;
}

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'sl-members'</span>,
    template: <span class="hljs-string">`
    &lt;h3&gt;Angular Orgs Members&lt;/h3&gt;
    &lt;ul *ngIf="members"&gt;
      &lt;li *ngFor="let member of members;"&gt;
        &lt;p&gt;
          &lt;img [src]="member.avatar_url" width="48" height="48"/&gt;
          ID：&lt;span&gt;"{{"member.id"}}"&lt;/span&gt;
          Name: &lt;span&gt;"{{"member.login"}}"&lt;/span&gt;
        &lt;/p&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MembersComponent <span class="hljs-keyword">implements</span> OnInit {
    members: Member[];

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> memberService: MemberService</span>) { }

    ngOnInit() {
        <span class="hljs-keyword">this</span>.memberService.getMembers()
            .subscribe(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (data) <span class="hljs-keyword">this</span>.members = data;
            });
    }
}</code></pre>
<h3 id="articleHeader40">MemberService</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MemberService {
    constructor(private http: Http) { }

    getMembers() {
        return this.http
            .get(`https://api.github.com/orgs/angular/members?page=1&amp;per_page=5`)
            .map(res => res.json())
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MemberService {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { }

    getMembers() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http
            .get(<span class="hljs-string">`https://api.github.com/orgs/angular/members?page=1&amp;per_page=5`</span>)
            .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
    }
}</code></pre>
<h2 id="articleHeader41">我有话说</h2>
<h3 id="articleHeader42">除了本系列教程外，还有其它学习资源么？</h3>
<p>本系列教程的主要目的是让初学者对 Angular 的相关基础知识，有一定的了解。除了本系列教程外，初学者还可以参考以下教程：</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000009652980" target="_blank">Angular 4 表单快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009674089">Angular 4 指令快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009265310" target="_blank">Angular 4.x 路由快速入门</a></li>
<li><a href="https://segmentfault.com/a/1190000009612113">Angular 4 依赖注入教程之一 依赖注入简介(共八节)</a></li>
<li><a href="https://segmentfault.com/a/1190000008754631#articleHeader1" target="_blank">Angular 4 组件学习线路(仅供参考)</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4 快速入门

## 原文链接
[https://segmentfault.com/a/1190000009733649](https://segmentfault.com/a/1190000009733649)

