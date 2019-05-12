---
title: '阿里egg.js初体验(一)' 
date: 2018-12-17 2:30:07
hidden: true
slug: nonz9pxvjrs
categories: [reprint]
---

{{< raw >}}

                    
<p>egg.js是阿里推出的基于koa的node开发框架，今天抽空体验了下，按官方教程做一个Hacker News。其实官方有脚手架提供，但是这次我们不用。</p>
<p>开始之前，我们先看下KOA对于中间件的洋葱模型，了解这个，对于我们之后理解一个请求的执行路径会很有帮助。<br><span class="img-wrap"><img data-src="/img/bVLSos?w=478&amp;h=435" src="https://static.alili.tech/img/bVLSos?w=478&amp;h=435" alt="68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67" title="68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67" style="cursor: pointer; display: inline;"></span><br>好了，让我们开始我们的egg之旅吧！</p>
<p>1, 先初始化项目结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir egg-example
$ cd egg-example
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>mkdir egg-example
<span class="hljs-variable">$ </span>cd egg-example
<span class="hljs-variable">$ </span>npm init
<span class="hljs-variable">$ </span>npm i egg --save
<span class="hljs-variable">$ </span>npm i egg-bin --save-dev</code></pre>
<p>2, 在package.json里，添加如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;egg-bin dev&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"egg-bin dev"</span>
  }</code></pre>
<p>3， 开始编写代码，这之前，我们应该对项目的目录结构有个约定，官方的说明在这里 <a href="https://eggjs.org/zh-cn/basics/structure.html" rel="nofollow noreferrer" target="_blank">https://eggjs.org/zh-cn/basic...</a>  我们到时候在回来说下这个目录。</p>
<p>4 我们需要一个controller，一个router，一个config，内如如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};


// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app/controller/home.js</span>
<span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">'egg'</span>).Controller;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
  <span class="hljs-keyword">async</span> index() {
    <span class="hljs-keyword">this</span>.ctx.body = <span class="hljs-string">'Hello world'</span>;
  }
}

<span class="hljs-built_in">module</span>.exports = HomeController;

<span class="hljs-comment">// app/router.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> { router, controller } = app;
  router.get(<span class="hljs-string">'/'</span>, controller.home.index);
};


<span class="hljs-comment">// config/config.default.js</span>
exports.keys = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">此处改为你自己的</span> <span class="hljs-attr">Cookie</span> 安全字符串&gt;</span>;</span></code></pre>
<p>此时，目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="egg-example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>egg-example
├── app
│   ├── controller
│   │   └── home<span class="hljs-selector-class">.js</span>
│   └── router<span class="hljs-selector-class">.js</span>
├── config
│   └── config<span class="hljs-selector-class">.default</span><span class="hljs-selector-class">.js</span>
└── package.json</code></pre>
<p>好了，现在检查下，运行 npm run dev，<br>在 <a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:7001/ 检查下，一切ok</p>
<p>这里有几个地方要注意下</p>
<ol>
<li>
<p>Controller 有class和exports两个写法，那么这两个写法有什么区别呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="按照类的方式编写Controller，不仅可以让我们更好的对 Controller层代码进行抽象（例如将一些统一的处理抽象成一些私有方法），还可以通过自定义Controller 基类的方式封装应用中常用的方法。至于方法的方式，官方不推荐使用，只是为了做兼容，其中，每一个 Controller 都是一个 async function，它的入参为请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的各种便捷属性和方法 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">按照类的方式编写Controller，不仅可以让我们更好的对 Controller层代码进行抽象（例如将一些统一的处理抽象成一些私有方法），还可以通过自定义Controller 基类的方式封装应用中常用的方法。至于方法的方式，官方不推荐使用，只是为了做兼容，其中，每一个 Controller 都是一个 async <span class="hljs-function"><span class="hljs-keyword">function</span></span>，它的入参为请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的各种便捷属性和方法 </code></pre>
</li>
<li>
<p>config也有module.exports 和 exports两种写法，那么这两种写法有什么区别呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports是Module系统创建对象的语法，但是如果你希望你的
module是一个类的实例，你可以将实例赋予moduel.exports，如这时候
module.exprots指向的就是一个A的实例了，可以用以下方式调用A的方
法 module.exports.xxx(),等价于 a.xxx()。但是如果只是exports=
new ClassA();这个只是简单的将本模块变量exports重新绑定了而已。注
意，对module.exports的绑定不能是异步绑定或者回调中！

可以这样理解，其他模块使用本模块时，用的是module.exports指向的东
西，而exports是模块内部变量，外部模块是无法访问的。
module.exports和exports是两个变量，只是一开始这两个是指向同一个对
象而已。可以在模块内部用exports作为module.exports的快捷方式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>是Module系统创建对象的语法，但是如果你希望你的
<span class="hljs-keyword">module</span>是一个类的实例，你可以将实例赋予moduel.<span class="hljs-keyword">exports</span>，如这时候
<span class="hljs-keyword">module</span>.exprots指向的就是一个A的实例了，可以用以下方式调用A的方
法 <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>.xxx(),等价于 a.xxx()。但是如果只是<span class="hljs-keyword">exports</span>=
<span class="hljs-keyword">new</span> ClassA();这个只是简单的将本模块变量<span class="hljs-keyword">exports</span>重新绑定了而已。注
意，对<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>的绑定不能是异步绑定或者回调中！

可以这样理解，其他模块使用本模块时，用的是<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>指向的东
西，而<span class="hljs-keyword">exports</span>是模块内部变量，外部模块是无法访问的。
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>和<span class="hljs-keyword">exports</span>是两个变量，只是一开始这两个是指向同一个对
象而已。可以在模块内部用<span class="hljs-keyword">exports</span>作为<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>的快捷方式
</code></pre>
</li>
</ol>
<p>现在，我们看下官方的目录结构规范：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">egg-project</span>
├── <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.js</span> (可选)
├── <span class="hljs-selector-tag">agent</span><span class="hljs-selector-class">.js</span> (可选)
├── <span class="hljs-selector-tag">app</span>
|   ├── <span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.js</span>
│   ├── <span class="hljs-selector-tag">controller</span>
│   |   └── <span class="hljs-selector-tag">home</span><span class="hljs-selector-class">.js</span>
│   ├── <span class="hljs-selector-tag">service</span> (可选)
│   |   └── <span class="hljs-selector-tag">user</span><span class="hljs-selector-class">.js</span>
│   ├── <span class="hljs-selector-tag">middleware</span> (可选)
│   |   └── <span class="hljs-selector-tag">response_time</span><span class="hljs-selector-class">.js</span>
│   ├── <span class="hljs-selector-tag">schedule</span> (可选)
│   |   └── <span class="hljs-selector-tag">my_task</span><span class="hljs-selector-class">.js</span>
│   ├── <span class="hljs-selector-tag">public</span> (可选)
│   |   └── <span class="hljs-selector-tag">reset</span><span class="hljs-selector-class">.css</span>
│   ├── <span class="hljs-selector-tag">view</span> (可选)
│   |   └── <span class="hljs-selector-tag">home</span><span class="hljs-selector-class">.tpl</span>
│   └── <span class="hljs-selector-tag">extend</span> (可选)
│       ├── <span class="hljs-selector-tag">helper</span><span class="hljs-selector-class">.js</span> (可选)
│       ├── <span class="hljs-selector-tag">request</span><span class="hljs-selector-class">.js</span> (可选)
│       ├── <span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.js</span> (可选)
│       ├── <span class="hljs-selector-tag">context</span><span class="hljs-selector-class">.js</span> (可选)
│       ├── <span class="hljs-selector-tag">application</span><span class="hljs-selector-class">.js</span> (可选)
│       └── <span class="hljs-selector-tag">agent</span><span class="hljs-selector-class">.js</span> (可选)
├── <span class="hljs-selector-tag">config</span>
|   ├── <span class="hljs-selector-tag">plugin</span><span class="hljs-selector-class">.js</span>
|   ├── <span class="hljs-selector-tag">config</span><span class="hljs-selector-class">.default</span><span class="hljs-selector-class">.js</span>
│   ├── <span class="hljs-selector-tag">config</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.js</span>
|   ├── <span class="hljs-selector-tag">config</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span> (可选)
|   ├── <span class="hljs-selector-tag">config</span><span class="hljs-selector-class">.local</span><span class="hljs-selector-class">.js</span> (可选)
|   └── <span class="hljs-selector-tag">config</span><span class="hljs-selector-class">.unittest</span><span class="hljs-selector-class">.js</span> (可选)
└── <span class="hljs-selector-tag">test</span>
    ├── <span class="hljs-selector-tag">middleware</span>
    |   └── <span class="hljs-selector-tag">response_time</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span>
    └── <span class="hljs-selector-tag">controller</span>
        └── <span class="hljs-selector-tag">home</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span></code></pre>
<p>如上，由框架约定的目录：<br>app/router.js 用于配置 URL 路由规则，具体参见 Router。<br>app/controller/** 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。<br>app/service/** 用于编写业务逻辑层，可选，建议使用，具体参见 Service。<br>app/middleware/** 用于编写中间件，可选，具体参见 Middleware。<br>app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。<br>app/extend/** 用于框架的扩展，可选，具体参见框架扩展。<br>config/config.{env}.js 用于编写配置文件，具体参见配置。<br>config/plugin.js 用于配置需要加载的插件，具体参见插件。<br>test/** 用于单元测试，具体参见单元测试。<br>app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于agent.js的作用参见Agent机制。</p>
<p>由内置插件约定的目录：<br>app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。<br>app/schedule/** 用于定时任务，可选，具体参见定时任务。</p>
<p>若需自定义自己的目录规范，参见 Loader API<br>app/view/** 用于放置模板文件，可选，由模板插件约定，具体参见模板渲染。<br>app/model/** 用于放置领域模型，可选，由领域类相关插件约定，如 egg-sequelize。</p>
<p>（未完待续）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
阿里egg.js初体验(一)

## 原文链接
[https://segmentfault.com/a/1190000012831977](https://segmentfault.com/a/1190000012831977)

