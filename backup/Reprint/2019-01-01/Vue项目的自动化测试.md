---
title: 'Vue项目的自动化测试' 
date: 2019-01-01 2:30:07
hidden: true
slug: jms3prsfpm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue项目的自动化测试</h1>
<p>说到自动化测试，许多开发团队都是听说过、尝试过，但最后都止步于尝试，不能将TDD（测试驱动开发）、BDD（行为驱动开发）的完整流程贯彻到项目中。思考其中的原因：终究还是成本抵不上收益。</p>
<p>很多后端开发人员可能写过很多自动化的单元测试代码，但是对前端测试一头雾水。这是因为相对于后端开发人员的自动化单元测试，前端的自动化测试成本更高。</p>
<p>自动化测试就是通过自动化脚本将一个又一个测试用例串起来，每个测试用例都要模拟环境、模拟输入、然后断言输出。前端自动化最难的地方就是模拟环境、模拟输入和断言输出了！<br>我们可以试想一下现实中的使用场景：</p>
<p>模拟环境：首先前端代码是跑在不同的终端环境上的，纯粹的使用某台机子的运行环境进行模拟是无法发现真正存在的问题。所以我们的测试用例必须跑在真实的环境下，这里面包括不同的机器：Android、ios、pc、macbook；不同的系统：window10、window8、linux、mac；不同的运行载体：IE、safari、chrome、firefox、Opera、Android webview、UIWebview、WKWebview；不同网络环境：WiFi、4G、3G、offline</p>
<p>模拟输入：前端的输入不好模拟，在PC上有鼠标click，double Click、drag、mouseDown、mouseOver、input等等，在mobile上有swipe、tap、scroll、摇一摇、屏幕翻转等。相对于后端的单元测试，前端的输入种类繁多，每一种模拟起来都十分复杂，而且很多bug隐藏在几种连贯的输入之后才会复现。</p>
<p>断言输出：前端的断言不是简单的判断值是否相等，很多情况是即使值相等、效果完全不一样。<br>很多展示效果更是不能通过简单的断言来检测，比如区域是否能滑动，输入时键盘是否正确弹起等。</p>
<p>当你跨越千山万水把上面的问题解决了，测试用例写好了，功能代码写好，完美！然后UE跑过来和你说那个这根线往左边移动一像素的时候，你会瞬间崩溃。可能这一像素你很多测试用例都得重写。所以前端自动化测试的成本真不一定抵得上收益。</p>
<p>但是困难不代表解决不了，部分场景不适合不代表所有场景都不适合！</p>
<p>正因为面临这么多的困难，我们的前端社区开发出了很多工具帮我们解决这些问题。本章节主要是结合Vue这个框架介绍前端自动化测试的一些工具和方法。</p>
<p>我们使用vue-cli去新建一个vue的新项目，在这个项目中开启默认的unit tests和e2e tests</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bogon:work xiaorenhui$ vue init webpack vueExample

? Project name vue-example
? Project description A Vue.js project
? Author kukuv <kukuv>
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">bogon:work xiaorenhui$ vue init webpack vueExample

? Project name vue-example
? Project description A Vue.js project
? Author kukuv &lt;kukuv&gt;
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes</code></pre>
<p>下面列举下这个新项目中涉及到的一些开源项目：</p>
<ul>
<li>
<p>karma</p>
<ul><li>Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous integration）工具，也可和其他代码编辑器一起使用。这个测试工具的一个强大特性就是，它可以监控(Watch)文件的变化，然后自行执行，通过console.log显示测试结果。</li></ul>
</li>
<li>
<p>Mocha</p>
<ul><li>mocha是一款功能丰富的javascript单元测试框架，它既可以运行在nodejs环境中，也可以运行在浏览器环境中。</li></ul>
</li>
<li>
<p>Nightwatch</p>
<ul><li>Nightwatch是一套基于Node.js的测试框架，使用Selenium WebDriver API以将Web应用测试自动化。它提供了简单的语法，支持使用JavaScript和CSS选择器，来编写运行在Selenium服务器上的端到端测试。</li></ul>
</li>
<li>
<p>phantomjs</p>
<ul><li>一个基于webkit内核的无头浏览器，即没有UI界面，即它就是一个浏览器，只是其内的点击、翻页等人为相关操作需要程序设计实现。</li></ul>
</li>
<li>
<p>sinon-chai</p>
<ul><li>sinon-chai是 sinon和chai这两个断言库的结合，提供丰富的断言方法</li></ul>
</li>
</ul>
<p>很多人看到这么多新名词一定头晕，心想一个单元测试咋需要懂这么多东西。情况是上面只是单元测试框架的一小部分、还有许多框架没有列出来。正因为前端的自动化测试面临着许多问题，所以我们才有这么多的框架来帮忙解决问题。</p>
<h2 id="articleHeader1">unit tests</h2>
<p>我们先来分析一下这个项目中的unit tests，这里面用到了 Karma、Mocha、sinon-chai、phantomjs。项目中已经有一个默认的单元测试例子。karma作为测试执行过程管理工具把Mocha、sinon-chai、phantomjs等框架组织起来。Mocha用来描述测试用例、sinon-chai用来断言、然后使用phamtomjs作为运行环境来跑测试用例。</p>
<p>npm install 将依赖的库都安装好，这里面phantomjs的依赖会比较难装，如果你之间没有安装过phantom，因为phantom比较大，而且加上国内的网络环境等原因。如果phantomjs装不上可以尝试使用chrome作为运行环境，这需要安装 "karma-chrome-launcher"，需要修改配置文件。</p>
<p>然后 npm run unit 跑一下unit tests，如果提示权限问题就 使用sudo 来提升下权限。跑完后我们看一下目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└── unit
    ├── coverage  代码覆盖率报告，src下面的index.html可以直接用浏览器打开
    │   ├── lcov-report
    │   │   ├── base.css
    │   │   ├── index.html
    │   │   ├── prettify.css
    │   │   ├── prettify.js
    │   │   ├── sort-arrow-sprite.png
    │   │   ├── sorter.js
    │   │   └── src
    │   │       ├── App.vue.html
    │   │       ├── components
    │   │       │   ├── Hello.vue.html
    │   │       │   └── index.html
    │   │       └── index.html
    │   └── lcov.info
    ├── index.js 运行测试用例前先加载的文件，方便统计代码覆盖率
    ├── karma.conf.js karma的配置文件
    └── specs 所有的测试用例都放在这里
        └── Hello.spec.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">└── unit
    ├── coverage  代码覆盖率报告，src下面的index.html可以直接用浏览器打开
    │   ├── lcov-report
    │   │   ├── base.css
    │   │   ├── index.html
    │   │   ├── prettify.css
    │   │   ├── prettify.js
    │   │   ├── sort-arrow-sprite.png
    │   │   ├── sorter.js
    │   │   └── src
    │   │       ├── App.vue.html
    │   │       ├── components
    │   │       │   ├── Hello.vue.html
    │   │       │   └── index.html
    │   │       └── index.html
    │   └── lcov.info
    ├── index.js 运行测试用例前先加载的文件，方便统计代码覆盖率
    ├── karma.conf.js karma的配置文件
    └── specs 所有的测试用例都放在这里
        └── Hello.spec.js</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载所有的测试用例、 testsContext.keys().forEach(testsContext)这种写法是webpack中的加载目录下所有文件的写法

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// 加载所有代码文件，方便统计代码覆盖率
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 加载所有的测试用例、 testsContext.keys().forEach(testsContext)这种写法是webpack中的加载目录下所有文件的写法</span>

<span class="hljs-keyword">const</span> testsContext = <span class="hljs-built_in">require</span>.context(<span class="hljs-string">'./specs'</span>, <span class="hljs-literal">true</span>, /\.spec$/)
testsContext.keys().forEach(testsContext)

<span class="hljs-comment">// 加载所有代码文件，方便统计代码覆盖率</span>
<span class="hljs-keyword">const</span> srcContext = <span class="hljs-built_in">require</span>.context(<span class="hljs-string">'../../src'</span>, <span class="hljs-literal">true</span>, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.set({
    // 在几个环境里跑你的测试用例
    // browsers: ['PhantomJS','Chrome'], 
    browsers: ['Chrome'],
    // 默认加载几个框架
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    // 使用那些汇报框架
    reporters: ['spec', 'coverage'],
    // 预加载文件
    files: ['./index.js'],
    // 预处理
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    // webpack 配置
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    // coverage 配置
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">config.set({
    <span class="hljs-comment">// 在几个环境里跑你的测试用例</span>
    <span class="hljs-comment">// browsers: ['PhantomJS','Chrome'], </span>
    browsers: [<span class="hljs-string">'Chrome'</span>],
    <span class="hljs-comment">// 默认加载几个框架</span>
    frameworks: [<span class="hljs-string">'mocha'</span>, <span class="hljs-string">'sinon-chai'</span>, <span class="hljs-string">'phantomjs-shim'</span>],
    <span class="hljs-comment">// 使用那些汇报框架</span>
    reporters: [<span class="hljs-string">'spec'</span>, <span class="hljs-string">'coverage'</span>],
    <span class="hljs-comment">// 预加载文件</span>
    files: [<span class="hljs-string">'./index.js'</span>],
    <span class="hljs-comment">// 预处理</span>
    preprocessors: {
      <span class="hljs-string">'./index.js'</span>: [<span class="hljs-string">'webpack'</span>, <span class="hljs-string">'sourcemap'</span>]
    },
    <span class="hljs-comment">// webpack 配置</span>
    webpack: webpackConfig,
    <span class="hljs-attr">webpackMiddleware</span>: {
      <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// coverage 配置</span>
    coverageReporter: {
      <span class="hljs-attr">dir</span>: <span class="hljs-string">'./coverage'</span>,
      <span class="hljs-attr">reporters</span>: [
        { <span class="hljs-attr">type</span>: <span class="hljs-string">'lcov'</span>, <span class="hljs-attr">subdir</span>: <span class="hljs-string">'.'</span> },
        { <span class="hljs-attr">type</span>: <span class="hljs-string">'text-summary'</span> }
      ]
    }
  })</code></pre>
<p>上面使用的插件例如 mocha、spec、coverage除了karma默认自带的都需要你在npm<br>上安装对应的插件，例如以下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;karma&quot;: &quot;^1.4.1&quot;,
    &quot;karma-chrome-launcher&quot;: &quot;^2.2.0&quot;,
    &quot;karma-coverage&quot;: &quot;^1.1.1&quot;,
    &quot;karma-mocha&quot;: &quot;^1.3.0&quot;,
    &quot;karma-phantomjs-launcher&quot;: &quot;^1.0.2&quot;,
    &quot;karma-phantomjs-shim&quot;: &quot;^1.4.0&quot;,
    &quot;karma-sinon-chai&quot;: &quot;^1.3.1&quot;,
    &quot;karma-sourcemap-loader&quot;: &quot;^0.3.7&quot;,
    &quot;karma-spec-reporter&quot;: &quot;0.0.31&quot;,
    &quot;karma-webpack&quot;: &quot;^2.0.2&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-string">"karma"</span>: <span class="hljs-string">"^1.4.1"</span>,
    <span class="hljs-string">"karma-chrome-launcher"</span>: <span class="hljs-string">"^2.2.0"</span>,
    <span class="hljs-string">"karma-coverage"</span>: <span class="hljs-string">"^1.1.1"</span>,
    <span class="hljs-string">"karma-mocha"</span>: <span class="hljs-string">"^1.3.0"</span>,
    <span class="hljs-string">"karma-phantomjs-launcher"</span>: <span class="hljs-string">"^1.0.2"</span>,
    <span class="hljs-string">"karma-phantomjs-shim"</span>: <span class="hljs-string">"^1.4.0"</span>,
    <span class="hljs-string">"karma-sinon-chai"</span>: <span class="hljs-string">"^1.3.1"</span>,
    <span class="hljs-string">"karma-sourcemap-loader"</span>: <span class="hljs-string">"^0.3.7"</span>,
    <span class="hljs-string">"karma-spec-reporter"</span>: <span class="hljs-string">"0.0.31"</span>,
    <span class="hljs-string">"karma-webpack"</span>: <span class="hljs-string">"^2.0.2"</span>,</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> vue-exampl@1.0.0 unit /Users/xiaorenhui/work/vueExample
> cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run

07 09 2017 12:08:13.004:INFO [karma]: Karma v1.7.0 server started at http://0.0.0.0:9876/
07 09 2017 12:08:13.007:INFO [launcher]: Launching browser Chrome with unlimited concurrency
07 09 2017 12:08:13.015:INFO [launcher]: Starting browser Chrome
07 09 2017 12:08:15.475:INFO [Chrome 60.0.3112 (Mac OS X 10.12.3)]: Connected on socket qDaxr51TuQCfQBcVAAAA with id 73077049
INFO LOG: 'Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools'
LOG LOG: 'data'

  Hello.vue
    ✓ should render correct contents

Chrome 60.0.3112 (Mac OS X 10.12.3): Executed 1 of 1 SUCCESS (0.024 secs / 0.011 secs)
TOTAL: 1 SUCCESS


=============================== Coverage summary ===============================
Statements   : 60% ( 3/5 )
Branches     : 50% ( 1/2 )
Functions    : 0% ( 0/1 )
Lines        : 60% ( 3/5 )
================================================================================" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; vue-exampl@1.0.0 unit /Users/xiaorenhui/work/vueExample
&gt; cross-env BABEL_ENV=<span class="hljs-built_in">test</span> karma start <span class="hljs-built_in">test</span>/unit/karma.conf.js --single-run

07 09 2017 12:08:13.004:INFO [karma]: Karma v1.7.0 server started at http://0.0.0.0:9876/
07 09 2017 12:08:13.007:INFO [launcher]: Launching browser Chrome with unlimited concurrency
07 09 2017 12:08:13.015:INFO [launcher]: Starting browser Chrome
07 09 2017 12:08:15.475:INFO [Chrome 60.0.3112 (Mac OS X 10.12.3)]: Connected on socket qDaxr51TuQCfQBcVAAAA with id 73077049
INFO LOG: <span class="hljs-string">'Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools'</span>
LOG LOG: <span class="hljs-string">'data'</span>

  Hello.vue
    ✓ should render correct contents

Chrome 60.0.3112 (Mac OS X 10.12.3): Executed 1 of 1 SUCCESS (0.024 secs / 0.011 secs)
TOTAL: 1 SUCCESS


=============================== Coverage summary ===============================
Statements   : 60% ( 3/5 )
Branches     : 50% ( 1/2 )
Functions    : 0% ( 0/1 )
Lines        : 60% ( 3/5 )
================================================================================</code></pre>
<p>我修改了一下Hello.vue这个组件，可以看到coverage 里精确的显示了测试代码的覆盖率,下面是我做的修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: 'hello',
  data () {
      console.log('data');
      function aa() {

      }
      if(false){
          console.log('data aa');
      }
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      aa(){
          console.log('methods aa');
      }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data'</span>);
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span>(<span class="hljs-params"></span>) </span>{

      }
      <span class="hljs-keyword">if</span>(<span class="hljs-literal">false</span>){
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data aa'</span>);
      }
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>
    }
  },
  <span class="hljs-attr">methods</span>:{
      aa(){
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'methods aa'</span>);
      }
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUzUh?w=1423&amp;h=187" src="https://static.alili.tech/img/bVUzUh?w=1423&amp;h=187" alt="" title="" style="cursor: pointer;"></span><br>打开reporter下面的index.html我们可以看到代码覆盖的具体情况。<br>点开Hello.vue更有直观的方式展示哪些代码被覆盖了，哪些没有。<br><span class="img-wrap"><img data-src="/img/bVUzUI?w=474&amp;h=363" src="https://static.alili.tech/img/bVUzUI?w=474&amp;h=363" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">e2e测试</h2>
<p>既然我们已经有了单元测试，那e2e测试有和单元测试有什么区别呢？Nightwatch是前端e2e测试的一个有代表性的框架。单元测试TDD的粒度很细，我们会为许多函数、方法去写单元测试，而e2e更接近BDD。直白点说，就是TDD的测试单元是一个个函数、方法，而BDD测试的单元是一个个预期的行为表现。e2e做的事情就是打开浏览器，并且真正的访问我们最终的页面，然后在这个真实的浏览器、真实的页面中我们去做各种断言，而单元测试不会要去我们去访问最终的页面，单元测试要保证的是一个个单元是没有问题的，但这些单元组合起来跑在页面上是否有问题，不是单元测试能够保证的，尤其是在前端这种模拟环境、模拟输入非常复杂的领域中，这是单元测试的短板，而e2e测试就是用来解决这些短板的。</p>
<p>我们来看看项目中使用Nightwatch来进行e2e测试的例子</p>
<p>首先看一下目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── e2e
│   ├── custom-assertions
│   │   └── elementCount.js 自定义的断言方法
│   ├── nightwatch.conf.js nightwatch的配置文件
│   ├── reports 
│   │   ├── CHROME_60.0.3112.101_Mac\ OS\ X_test.xml
│   │   └── CHROME_60.0.3112.113_Mac\ OS\ X_test.xml
│   ├── runner.js  bootstrap文件，起我们的页面server和nightwatch文件
│   └── specs
│       └── test.js 测试用例
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├── e2e
│   ├── custom-assertions
│   │   └── elementCount.js 自定义的断言方法
│   ├── nightwatch.conf.js nightwatch的配置文件
│   ├── reports 
│   │   ├── CHROME_60.0.3112.101_Mac\ OS\ X_test.xml
│   │   └── CHROME_60.0.3112.113_Mac\ OS\ X_test.xml
│   ├── runner.js  bootstrap文件，起我们的页面server和nightwatch文件
│   └── specs
│       └── test.js 测试用例
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUzUN?w=799&amp;h=336" src="https://static.alili.tech/img/bVUzUN?w=799&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>selenium是一个用java写的e2e测试工具集，它的API被纳入 w3c的webDriver Api中， nightWatch是对selenium的一个nodejs封装。所有我们需要再配置文件中配置selenium。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
    // 对selenium的配置
  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },
    // 测试环境的配置
  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  src_folders: [<span class="hljs-string">'test/e2e/specs'</span>],
  <span class="hljs-attr">output_folder</span>: <span class="hljs-string">'test/e2e/reports'</span>,
  <span class="hljs-attr">custom_assertions_path</span>: [<span class="hljs-string">'test/e2e/custom-assertions'</span>],
    <span class="hljs-comment">// 对selenium的配置</span>
  selenium: {
    <span class="hljs-attr">start_process</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">server_path</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'selenium-server'</span>).path,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'127.0.0.1'</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">4444</span>,
    <span class="hljs-attr">cli_args</span>: {
      <span class="hljs-string">'webdriver.chrome.driver'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'chromedriver'</span>).path
    }
  },
    <span class="hljs-comment">// 测试环境的配置</span>
  test_settings: {
    <span class="hljs-attr">default</span>: {
      <span class="hljs-attr">selenium_port</span>: <span class="hljs-number">4444</span>,
      <span class="hljs-attr">selenium_host</span>: <span class="hljs-string">'localhost'</span>,
      <span class="hljs-attr">silent</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">globals</span>: {
        <span class="hljs-attr">devServerURL</span>: <span class="hljs-string">'http://localhost:'</span> + (process.env.PORT || config.dev.port)
      }
    },

    <span class="hljs-attr">chrome</span>: {
      <span class="hljs-attr">desiredCapabilities</span>: {
        <span class="hljs-attr">browserName</span>: <span class="hljs-string">'chrome'</span>,
        <span class="hljs-attr">javascriptEnabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">acceptSslCerts</span>: <span class="hljs-literal">true</span>
      }
    },

    <span class="hljs-attr">firefox</span>: {
      <span class="hljs-attr">desiredCapabilities</span>: {
        <span class="hljs-attr">browserName</span>: <span class="hljs-string">'firefox'</span>,
        <span class="hljs-attr">javascriptEnabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">acceptSslCerts</span>: <span class="hljs-literal">true</span>
      }
    }
  }</code></pre>
<p>下面的runner需要先起一个我们的网页服务然后再起nightWatch服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var server = require('../../build/dev-server.js')

server.ready.then(() => {
  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under &quot;test_settings&quot;
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  var opts = process.argv.slice(2)
    console.log(opts);
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome,firefox'])
  }

  var spawn = require('cross-spawn')
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../build/dev-server.js'</span>)

server.ready.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 2. run the nightwatch test suite against it</span>
  <span class="hljs-comment">// to run in additional browsers:</span>
  <span class="hljs-comment">//    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"</span>
  <span class="hljs-comment">//    2. add it to the --env flag below</span>
  <span class="hljs-comment">// or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`</span>
  <span class="hljs-comment">// For more information on Nightwatch's config file, see</span>
  <span class="hljs-comment">// http://nightwatchjs.org/guide#settings-file</span>
  <span class="hljs-keyword">var</span> opts = process.argv.slice(<span class="hljs-number">2</span>)
    <span class="hljs-built_in">console</span>.log(opts);
  <span class="hljs-keyword">if</span> (opts.indexOf(<span class="hljs-string">'--config'</span>) === <span class="hljs-number">-1</span>) {
    opts = opts.concat([<span class="hljs-string">'--config'</span>, <span class="hljs-string">'test/e2e/nightwatch.conf.js'</span>])
  }
  <span class="hljs-keyword">if</span> (opts.indexOf(<span class="hljs-string">'--env'</span>) === <span class="hljs-number">-1</span>) {
    opts = opts.concat([<span class="hljs-string">'--env'</span>, <span class="hljs-string">'chrome,firefox'</span>])
  }

  <span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cross-spawn'</span>)
  <span class="hljs-keyword">var</span> runner = spawn(<span class="hljs-string">'./node_modules/.bin/nightwatch'</span>, opts, { <span class="hljs-attr">stdio</span>: <span class="hljs-string">'inherit'</span> })

  runner.on(<span class="hljs-string">'exit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">code</span>) </span>{
    server.close()
    process.exit(code)
  })

  runner.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    server.close()
    <span class="hljs-keyword">throw</span> err
  })
})
</code></pre>
<p>sudo npm run e2e后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> node test/e2e/runner.js

> Starting dev server...

Starting to optimize CSS...
> Listening at http://localhost:8080

[]
Starting selenium server... started - PID:  74459

[Test] Test Suite
=====================

Running:  default e2e tests
 ✔ Element <#app> was visible after 81 milliseconds.
 ✔ Testing if element <.hello> is present.
 ✔ Testing if element <h1> contains text: &quot;Welcome to Your Vue.js App&quot;.
 ✔ Testing if element <img> has count: 1

OK. 4 assertions passed. (3.951s)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&gt; node test/e2e/runner.js

&gt; Starting dev server...

Starting to optimize CSS...
&gt; Listening at http:<span class="hljs-comment">//localhost:8080</span>

[]
Starting selenium server... started - PID:  <span class="hljs-number">74459</span>

[Test] Test Suite
=====================

Running:  <span class="hljs-keyword">default</span> e2e tests
 ✔ Element &lt;#app&gt; was visible after <span class="hljs-number">81</span> milliseconds.
 ✔ Testing <span class="hljs-keyword">if</span> element &lt;.hello&gt; is present.
 ✔ Testing <span class="hljs-keyword">if</span> element &lt;h1&gt; contains text: <span class="hljs-string">"Welcome to Your Vue.js App"</span>.
 ✔ Testing <span class="hljs-keyword">if</span> element &lt;img&gt; has count: <span class="hljs-number">1</span>

OK. <span class="hljs-number">4</span> assertions passed. (<span class="hljs-number">3.951</span>s)</code></pre>
<p>在控制台上我们能看到各种断言的结果</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue项目的自动化测试

## 原文链接
[https://segmentfault.com/a/1190000011062084](https://segmentfault.com/a/1190000011062084)

