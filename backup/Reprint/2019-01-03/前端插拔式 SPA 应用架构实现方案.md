---
title: '前端插拔式 SPA 应用架构实现方案' 
date: 2019-01-03 2:30:11
hidden: true
slug: dsamjzf9md
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016053325?w=2250&amp;h=1500" src="https://static.alili.tech/img/remote/1460000016053325?w=2250&amp;h=1500" alt="主题大图" title="主题大图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">背景</h2>
<p>随着互联网云的兴起，一种将多个不同的服务集中在一个大平台上统一对外开放的概念逐渐为人熟知，越来越多与云相关或不相关的中后台管理系统或企业级信息系统曾经或开始采用了这种「统一平台」的形式。同时，前端领域保持着高速发展，早期的 jQuery+Backbone+Bootstrap 的 MVC 解决方案支撑起了业务相当长的一段时间；后来，Angular、Ember 等 MVVM 框架开始崭露头角，前后端分离和前端组件化的思想在此时达到了鼎盛期。而在国内，Vue 框架凭着其简洁易懂的 API 和出色的周边生态支持独领鳌头，越来越多的中小型企业和开发者们开始转向 Vue 阵营；与此同时，在设计上独树一帜的纯 View 层框架 React 开始兴起，其充满技术感的 Diff DOM 思想吸引了大批开发者，成为各大技术社区最火爆的话题，其周边生态也随之快速发展，成为了各大公司搭建技术栈时的首选框架。</p>
<p>回到平台的话题。一个集成了不同业务的大平台，很多情况下都是将业务拆分成多个子系统进行开发，最后由平台提供统一的入口。而在当前快速变化的前端大环境下，此类平台需要考虑以下几个难题：</p>
<ol>
<li>怎样将不同业务子系统集中到一个大平台上，统一对外开放？</li>
<li>如何给不同用户赋予权限让其能够访问平台的特定业务模块同时禁止其访问无权限的业务模块？</li>
<li>如何快速接入新的子系统，并对子系统进行版本管理，保证功能同步？</li>
<li>针对于老系统，如何实现从 Backbone 技术栈到 React 技术栈或 Vue 技术栈的平滑升级？</li>
</ol>
<p>接下来，我将分别基于这几个问题介绍我们的实现方案。</p>
<h2 id="articleHeader1">产品模型</h2>
<p>首先我们来讨论第一个问题：怎样将不同业务子系统集中到一个大平台上，统一对外开放？</p>
<p>如下图所示，假设我们有三个业务子系统，用户如果要使用三个系统中的不同功能，他就需要同时在三个系统中登录然后来回切换进行操作。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054421?w=1304&amp;h=696" src="https://static.alili.tech/img/remote/1460000016054421?w=1304&amp;h=696" alt="插图1" title="插图1" style="cursor: pointer; display: inline;"></span></p>
<p>而实际上理想的状态是：A、B、C 三个子系统在同一个大平台上，通过菜单提供入口进入，用户可以自由访问任意一个子系统的页面。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054422?w=1304&amp;h=652" src="https://static.alili.tech/img/remote/1460000016054422?w=1304&amp;h=652" alt="插图2" title="插图2" style="cursor: pointer;"></span></p>
<p>注意到上图中我们给 A、B、C 都标记了 App（Application），把大平台标记为了 Product，以下为了方便说明，我们把每个子系统都称为 App，把集成子系统的平台称为 Product。</p>
<p>事实上，对于真正的业务场景，除了用户体验的改善，图 2 所示系统还有很多优势，比如果企业想按业务模块售卖产品，第二种方式显然更好，用户支付模块费用后赋予其模块权限就可以使用新模块了，而不是提供给用户一个新系统。除此以外，对企业来说避免部署独立的业务系统也就意味着省掉了域名、服务器、运维方面的资源，节省了企业成本。</p>
<h2 id="articleHeader2">架构方案</h2>
<p>确定了 Product 包含 App 的产品模型后，我们接下来要考虑以怎样的一种形式，让每个 App 的访问都能够在 Product 下实现无缝切换。</p>
<p>如下图所示，在访问页面时，我们为访问路径附加上了<strong>应用前缀</strong>，标识当前访问的是哪个 App，App 路径前缀之后才是当前访问的页面路径，这是一个前提<strong>约定</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054423?w=1304&amp;h=624" src="https://static.alili.tech/img/remote/1460000016054423?w=1304&amp;h=624" alt="插图3" title="插图3" style="cursor: pointer;"></span></p>
<p>而从 Product 角度来看，我们希望用户在使用平台时，感受不到各个 App 在切换时是在切换各系统模块，所以 Product 需要控制所有 App 的视图渲染时机，即：Product 需统一管理所有 App 的视图路由。</p>
<p>同时，为了给不同权限用户展现不同的视图页面，我们把从后端返回的用户权限数据也传入 Product，Product 会自动过滤掉没有权限的路由，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054424?w=1304&amp;h=749" src="https://static.alili.tech/img/remote/1460000016054424?w=1304&amp;h=749" alt="插图4" title="插图4" style="cursor: pointer; display: inline;"></span></p>
<p>这里，因为需要让各 App 之间的切换对用户来说就如同切换一个系统应用的各个页面，我们采用了单页面应用（SPA）的形式实现 Product 的路由控制。</p>
<p>整个方案的架构如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054425?w=1304&amp;h=944" src="https://static.alili.tech/img/remote/1460000016054425?w=1304&amp;h=944" alt="插图5" title="插图5" style="cursor: pointer; display: inline;"></span></p>
<p>在这个架构方案下，各子业务模块可以根据需要动态加入大平台下，不需要时屏蔽访问路径前缀即可；对平台系统而言，各子业务模块如同一个个功能插件，即插即用，不用即拔。这种插拔式的思想由来已久，我们称之为「插拔式应用架构」。插拔式应用架构方案和传统前端架构相比有以下几个优势：</p>
<ul>
<li>业务模块分布式开发，代码仓库更易管理。</li>
<li>业务模块（App）移植性强，可单独部署，也可整合到大平台（Product）下。</li>
<li>模块代码高内聚，更专注业务。</li>
<li>符合开闭原则，新模块的接入不需要修改已有模块，不会影响其他模块的功能。</li>
</ul>
<h2 id="articleHeader3">资源权限管理</h2>
<p>在介绍架构方案的具体实现之前，我们需要先做些准备工作，先来看下开头我们提出的第二、三两个问题。</p>
<p>首先是第二个问题：<strong>如何给不同用户赋予权限让其能够访问平台的特定业务模块同时禁止其访问无权限的业务模块？</strong></p>
<p>上文中简单提到了后端将访问权限数据传入 Product，我们的具体做法是每个 App 将自己的全量路由路径传入 Product ，而在启动平台（Product）时，Product 会从后端根据当前登录用户获取其有权限的路由路径，当访问 App 任一路由时，会在首次与有权限的路由路径进行比对，比对失败的路由路径会自动导向无权限的页面视图。</p>
<p>至于路由的权限维护，可以做一个可视化配置路由的管理页面，权限的细化程度根据自己的业务情况自定义即可。</p>
<p>其次是第三个问题：<strong>如何快速接入新的子系统，并对子系统进行版本管理，保证功能同步？</strong></p>
<p>要回答这个问题，我们就要清楚每个 App 具体的接入方式。上文中有提到每个 App 的访问依赖于当前的路径前缀，我们的具体做法是后端维护所有 App 基于 webpack 打出的 bundle 包的地址，并将这些包地址的配置映射关系传入 Product，当首次访问到某个 App 时，Product 会首先加载该 App 相关的 bundle 包，而其 js bundle 包内会调用全局的 Product 注入自己的路由信息，然后将后续的路由处理交给 Product 执行。</p>
<p>当然，上述的实现会涉及到渲染 App 视图时的一些问题，在接下来的实现方案中我们会介绍到。</p>
<h2 id="articleHeader4">实现方案</h2>
<p>上面我们讨论了很多理论性的内容，接下来进入干货环节：如何实现一个插拔式应用框架？</p>
<p>根据上文中介绍一些实现思路，我们对将要实现的插拔式框架会先有一个大概的功能轮廓：</p>
<ul>
<li>自实现一个 Router，该 Router 需要在路由时根据路径自动解析出 App 标识，然后基于标识动态加载 App 对应的资源包。</li>
<li>App 加载其 js 资源包后立即执行，自动向 Product 内注入 App 相关的路由信息。</li>
<li>Router 在 App 加载完资源包后（script 脚本会在加载后立即执行），尝试根据路径渲染 App 视图页面。</li>
<li>切换路由后，如果切换至了其他子 App，原 App 应基于自身的生命周期，清除相关 DOM 和事件等逻辑。</li>
</ul>
<p>简单归纳一下，我们的插拔式应用框架应在实现上做出以下几个功能点：动态路由、脚本加载和调度、子应用视图渲染、应用生命周期管理。</p>
<p>接下来我们分别一一介绍各功能点的实现思路。</p>
<h3 id="articleHeader5">动态路由</h3>
<p>说起路由，对于不同的技术栈，有着不同的实现方案。如 Vue 有 vue-router，React 有 react-router 等。而为了适配各子 App 采用不同的技术体系开发的情形，我们需要将路由配置加以规范和统一管理。所以，我们需要重新设计一个 Router，这个 Router 必须能够做到：动态注入路由且同时支持不同技术体系组件的渲染。</p>
<p>这里，我们采用了灵活性较强的 <a href="https://www.npmjs.com/package/universal-router" rel="nofollow noreferrer" target="_blank">universal-router</a>，其 <em>path</em> 和 <em>action</em> 的配置方式能够让我们很方便地进行自定义的路由逻辑处理。虽然它不支持动态注入路由，但其代码组织合理，配合大名鼎鼎的 <a href="https://www.npmjs.com/package/history" rel="nofollow noreferrer" target="_blank">history</a> 库，我很容易便实现了满足自己需求的 Router。</p>
<p>如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054426?w=1806&amp;h=903" src="https://static.alili.tech/img/remote/1460000016054426?w=1806&amp;h=903" alt="插图6" title="插图6" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">脚本加载和调度</h3>
<p>在完成动态路由的基本功能后，我们就要开始处理路由逻辑的第一步了：动态加载当前访问 App 的脚本等资源包。</p>
<p>首先我们先分析出处理流程：在开始路由时，我们需要根据请求路径的第一段路径名（如 <code>/a/b</code> 的第一段为 <code>a</code>）确定当前要路由的路径对应的是哪一个 App，若对应的 App 尚未注入路由信息，就需要动态加载 App 的资源包，待执行了 js 脚本资源包后，再继续执行后续的渲染逻辑。</p>
<p>App 的资源包可以有多种形式的打包方式，如 AMD、Commonjs、UMD 等。而为了兼容 App 能够分别单独部署和集成至平台两种情况，且保持最简化的依赖，我们仍旧采用基于 webpack 打出 UMD 包的形式——让 JS 加载后立即执行即可，省去了如对 AMD 包加载器如 Requirejs 的依赖。</p>
<p>那么，依托于浏览器自身的脚本加载机制，我们的资源包加载器就很好实现了：分别使用 link 和 script 标签在 head 和 body 标签下动态插入资源包地址即可。</p>
<blockquote>当然，也有人会考虑到资源包先后顺序加载依赖的问题。一般情况下，webpack 打包时会自行处理依赖关系，如果对多个资源包插件有先后执行顺序的依赖需求（如 jQuery 插件依赖），可在加载时做特殊的串行处理。</blockquote>
<p>App 脚本加载流程如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016054427?w=1527&amp;h=912" src="https://static.alili.tech/img/remote/1460000016054427?w=1527&amp;h=912" alt="插图7" title="插图7" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">应用视图渲染</h3>
<p>处理了 App 资源包的动态加载后，我们就要实现路由模块最核心的功能了：应用视图的渲染。</p>
<p>首先，在上文介绍方案时，我们提到每个子 App 既要能支持单独部署，又需要能够接入 Product 内，在平台上运行。所以，我们应该意识到：各 App 视图的渲染应该交由每个子 App 自己完成，而不是由框架统一完成。</p>
<p>如果你对上面的结论感觉太突兀，那么，请思考以下两个问题：</p>
<ol>
<li>如果框架统一渲染路由结果，那么如何保证对 React Component、Backbone View 等各种不同形式组件的兼容？</li>
<li>如果框架统一渲染路由结果，就需要引入渲染接口，那么如何保证兼容各子 App 的接口版本（如 ReactDOM 版本等）？</li>
</ol>
<p>所以，为了体现框架兼顾不同技术体系 App 的插拔式设计思想，我们必须要将应用视图的渲染从框架内抽离出去。</p>
<p>那么，框架的路由在视图渲染逻辑上还需要做什么事呢？</p>
<p>我们很快就会想到视图渲染逻辑抽离出去后存在的问题：各子 App 要自己实现渲染了，那框架提效的作用体现在了何处？渲染接口又该如何统一？</p>
<p>前文中提到了开闭原则，开闭原则最主要的设计思想就是面向对象设计。我们的解决方案就是：</p>
<ol>
<li>提供一个 Application 基类，规范渲染接口，各子 App 在注入应用时必须注入继承自 Application 基类的应用实例。</li>
<li>默认提供使用较广的 React Application 和适用性较强的 Backbone Application 两个渲染实现应用类（均继承自 Application 基类）。</li>
</ol>
<p>在各子 App 的入口 JS 文件内，可以根据自己的技术体系直接实例化 ReactApplication 或 BackboneApplication，也可以继承自 Application 基类自实现渲染接口。当然，如果自己的应用类使用较多，可以作为插件贡献出去。</p>
<p>Application 基类的示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application/index.js
class Application {
  static DEFAULTS = {
    // ...
  }

  constructor(options = {}) {
    this._options = Object.assign({}, DEFAULTS, options);
  }

  start() {
    // 启动应用，开启 view 的路径变化监听事件
  }

  stop() {
    // 停止路径变化监听事件
  }

  renderLayout() {
    // 渲染布局的接口
  }

  render() {
    // 渲染主体内容的接口
  }

  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// application/index.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> </span>{
  <span class="hljs-keyword">static</span> DEFAULTS = {
    <span class="hljs-comment">// ...</span>
  }

  <span class="hljs-keyword">constructor</span>(options = {}) {
    <span class="hljs-keyword">this</span>._options = <span class="hljs-built_in">Object</span>.assign({}, DEFAULTS, options);
  }

  start() {
    <span class="hljs-comment">// 启动应用，开启 view 的路径变化监听事件</span>
  }

  stop() {
    <span class="hljs-comment">// 停止路径变化监听事件</span>
  }

  renderLayout() {
    <span class="hljs-comment">// 渲染布局的接口</span>
  }

  render() {
    <span class="hljs-comment">// 渲染主体内容的接口</span>
  }

  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>ReactApplication 类的实现示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application/react/index.js
import Application from '../index.js';

class ReactApplication extends Application {
  render(err, children, params = {}) {
    if (err) {
      // 渲染错误页
      throw err;
    }
    // React 和 ReactDOM 在实例化时由 App 自己传入，便于各 App 自己控制 React 版本
    const { React, ReactDOM } = this._options;
    ReactDOM.render(children, this._container);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// application/react/index.js</span>
<span class="hljs-keyword">import</span> Application <span class="hljs-keyword">from</span> <span class="hljs-string">'../index.js'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ReactApplication</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Application</span> </span>{
  render(err, children, params = {}) {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-comment">// 渲染错误页</span>
      <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-comment">// React 和 ReactDOM 在实例化时由 App 自己传入，便于各 App 自己控制 React 版本</span>
    <span class="hljs-keyword">const</span> { React, ReactDOM } = <span class="hljs-keyword">this</span>._options;
    ReactDOM.render(children, <span class="hljs-keyword">this</span>._container);
  }
}</code></pre>
<p>BackboneApplication 类的实现示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application/backbone/index.js
import Application from '../index.js';

class BackboneApplication extends Application {
  render(err, viewAction, params = {}) {
    if (err) {
      // 渲染错误页
      throw err;
    }
    if (viewAction.prototype &amp;&amp; isFunction(viewAction.prototype.render)) {
      this._currentView = new viewAction(params);
      return this._currentView.render();
    }
    if (typeof viewAction.render === 'function') {
      return viewAction.render(params);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// application/backbone/index.js</span>
<span class="hljs-keyword">import</span> Application <span class="hljs-keyword">from</span> <span class="hljs-string">'../index.js'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BackboneApplication</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Application</span> </span>{
  render(err, viewAction, params = {}) {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-comment">// 渲染错误页</span>
      <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-keyword">if</span> (viewAction.prototype &amp;&amp; isFunction(viewAction.prototype.render)) {
      <span class="hljs-keyword">this</span>._currentView = <span class="hljs-keyword">new</span> viewAction(params);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._currentView.render();
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> viewAction.render === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> viewAction.render(params);
    }
  }
}</code></pre>
<p>将渲染逻辑交给各子 App 自己实现后，我们就可以避免在框架的 View 类中根据不同技术体系实现不同的渲染逻辑。如果子 App 换了 Backbone 和 React 之外的其他渲染方式，我们也不必修改框架的实现重新发布新的版本。</p>
<p>另外，除了应用实例外，我们还需要构造一个 Product 类，提供注入应用实例的入口。示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Product {
  static registerApplication = (app) => {
    // 缓存 app 实例，并注入 app 路由
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Product</span> </span>{
  <span class="hljs-keyword">static</span> registerApplication = <span class="hljs-function">(<span class="hljs-params">app</span>) =&gt;</span> {
    <span class="hljs-comment">// 缓存 app 实例，并注入 app 路由</span>
  }
}</code></pre>
<p>在各子 App 的入口 JS 文件内，调用 Product 类注入当前 app 实例（以 React App 为例）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/app.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Product, ReactApplication } from 'plugin-pkg';

const app = new ReactApplication({
  React,
  ReactDOM,
  // ...
});

Product.registerApplication(app);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/app.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Product, ReactApplication } <span class="hljs-keyword">from</span> <span class="hljs-string">'plugin-pkg'</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> ReactApplication({
  React,
  ReactDOM,
  <span class="hljs-comment">// ...</span>
});

Product.registerApplication(app);</code></pre>
<h3 id="articleHeader8">应用生命周期管理</h3>
<p>到这里，从动态路由到视图渲染，我们都已经有了具体的实现思路，现在考虑实际应用时的一个问题：在切换各子 App 时，上一个 App 的 DOM 会被替换，但相关的事件并未正确清除。拿 React 来说，我们直接替换掉 DOM 内容，但未正确触发 React 组件的 UnMount 事件，Backbone View 的 destroy 回调同理。</p>
<p>所以，我们需要为 Application 类添加 destroy 接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Application {
  destroy() {
    // 在当前 App 实例切换出去时调用
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> </span>{
  destroy() {
    <span class="hljs-comment">// 在当前 App 实例切换出去时调用</span>
  }
}</code></pre>
<p>除了销毁事件，有时在 App 切换进来后也会需要一些统一处理，我们同时需要添加 ready 接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Application {
  ready() {
    // 在当前 App 实例切换进来时调用
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> </span>{
  ready() {
    <span class="hljs-comment">// 在当前 App 实例切换进来时调用</span>
  }
}</code></pre>
<p>生命周期的处理实现，各 App 实例根据自己的实际情况自行实现相关逻辑即可。</p>
<p>框架在切换 App 时，需自动调用上一个应用实例的销毁接口，然后在渲染 App 后，再自动调用当前 App 的准备接口。</p>
<h3 id="articleHeader9">构建配置</h3>
<p>上面的内容都是插拔式框架需要实现的功能，另外，各子 App 在打包时也要统一配置。如框架的依赖应设为 external 的形式，在打包时不打入资源包。因为我们的各 App JS 资源包都是 UMD 包直接执行的形式，在实际运行时使用 Product 统一引入的框架包的全局变量即可。</p>
<p>webpack 配置的示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
const path = require('path');

const resolveApp = relativePath => path.join(process.cwd(), relativePath);

module.exports = {
  entry: {
    bundle: resolveApp('src/app.js');
  },
  module: {
    // ...
  },
  plugins: [
    // ...
  ],
  externals: {
    'plugin-pkg': 'Plugin',
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">const</span> resolveApp = <span class="hljs-function"><span class="hljs-params">relativePath</span> =&gt;</span> path.join(process.cwd(), relativePath);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">bundle</span>: resolveApp(<span class="hljs-string">'src/app.js'</span>);
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// ...</span>
  ],
  <span class="hljs-attr">externals</span>: {
    <span class="hljs-string">'plugin-pkg'</span>: <span class="hljs-string">'Plugin'</span>,
  },
};</code></pre>
<p>这样，不但能兼容独立部署和集成入平台两种形式，也能在插入平台模式下统一用平台的插拔式框架包，便于平台的统一升级。</p>
<h2 id="articleHeader10">总结</h2>
<p>以上的插拔式应用设计是因为考虑到了兼容不同技术体系的子业务模块，路由的实现稍显繁复，脚本的动态加载也比较简单。在实际业务需求中，如果已经确定了统一技术体系，大部分情况下就不必考虑兼容不同子业务模块的问题了，完全可以选定一种技术体系（如 Vue 或 React）来实现，多做的可能也只有权限处理这一小块。</p>
<p>所以，以上内容仅作参考，根据实际业务不同，设计出适合自己业务的插拔式方案，才是最好用的方案。</p>
<h2 id="articleHeader11">参考</h2>
<ul><li><a href="https://single-spa.js.org/docs/getting-started-overview.html" rel="nofollow noreferrer" target="_blank">single-spa</a></li></ul>
<blockquote>文章可随意转载，但请保留此 <a href="https://www.yuque.com/es2049/blog" rel="nofollow noreferrer" target="_blank">原文链接</a> 。<br>非常欢迎有激情的你加入 <a href="https://es2049.studio/" rel="nofollow noreferrer" target="_blank">ES2049 Studio</a>，简历请发送至 caijun.hcj(at)alibaba-inc.com 。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端插拔式 SPA 应用架构实现方案

## 原文链接
[https://segmentfault.com/a/1190000016053322](https://segmentfault.com/a/1190000016053322)

