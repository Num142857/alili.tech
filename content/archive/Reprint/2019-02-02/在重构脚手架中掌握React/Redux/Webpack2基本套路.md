---
title: '在重构脚手架中掌握React/Redux/Webpack2基本套路' 
date: 2019-02-02 2:30:11
hidden: true
slug: jbjafkzanw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本文从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/Frontend" rel="nofollow noreferrer" target="_blank">Web Frontend Introduction And Best Practices:前端入门与最佳实践</a>,项目的Github地址为<a href="https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate" rel="nofollow noreferrer" target="_blank">Webpack2-React-Redux-Boilerplate</a>.</p>
<p>Warning!笔者自己构建的基于Webpack+React+Redux的脚手架已经经历了三个版本,之前的两个版本参考<a href="https://segmentfault.com/a/1190000003873739">Webpack实战之Quick Start</a>以及<a href="https://segmentfault.com/a/1190000005122575" target="_blank">我的Webpack套装</a>。在本文文首此处,我必须严肃吐槽下,我深刻感觉到Boilerplate就像当年的Rails,方便入门的同时会给你无尽的束缚,因此笔者不建议任何人在正式项目中直接使用自己不能完全掌控的脚手架。我觉得我是无法忘记当初被<a href="https://github.com/erikras/react-redux-universal-hot-example" rel="nofollow noreferrer" target="_blank">react-redux-universal-hot-example</a>支配的恐惧。</p>
</blockquote>
<h1 id="articleHeader0">Webpack2 React Redux Boilerplate</h1>
<blockquote><p>核心组件代码与脚手架之间务必存在有机分割，整个程序架构清晰易懂。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166610?w=1400&amp;h=1120" src="https://static.alili.tech/img/remote/1460000007166610?w=1400&amp;h=1120" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果你是完全的React初学者,那么建议首先了解下<a href="https://segmentfault.com/a/1190000006055973">使用Facebook的create-react-app快速构建React开发环境</a>，同时参考笔者的<a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/Frontend/Framework/View/React" rel="nofollow noreferrer" target="_blank">React 入门与最佳实践</a>以及<a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/Frontend/Framework/StateManagement/Redux" rel="nofollow noreferrer" target="_blank">Redux 入门与最佳实践</a>。本项目算是个半自动化的脚手架工具,笔者并不希望做成完全傻瓜式的开箱即用的工具,这只会给你的项目埋下危险的伏笔,希望每个可能用这个Boilerplate的同学都能阅读文本,至少要保证对文本提及的知识点有个全局的了解。</p>
<h2 id="articleHeader1">Features</h2>
<p>本部分假设你已经对Webpack有了大概的了解，这里我们会针对笔者自己在生产环境下使用的Webpack编译脚本进行的一个总结，在介绍具体的配置方案之前笔者想先概述下该配置文件的设计的目标，或者说是笔者认为一个前端编译环境应该达成的特性，这样以后即使Webpack被淘汰了也可以利用其他的譬如JSPM之类的来完成类似的工作。</p>
<ul>
<li><p>考虑到同一项目对多编译目标的支持，包括开发环境、纯前端运行环境（包括Cordova、APICloud、Weapp这种面向移动端的方案）、同构直出环境，并且保证项目可以在这三个环境之间平滑切换，合理分割脚手架工具与核心应用代码。</p></li>
<li><p>单一的配置文件：很多项目里面是把开发环境与生产环境写了两个配置文件，可能笔者比较懒吧，不喜欢这么做，因此笔者的第一个特性就是单一的配置文件，然后通过npm封装不同的编译命令传入环境变量，然后在配置文件中根据不同的环境变量进行动态响应。另外，要保证一个Boilerplate能够在最小修改的情况下应用到其他项目。</p></li>
<li><p>多应用入口支持：无论是单页应用还是多页应用，在Webpack中往往会把一个html文件作为一个入口。笔者在进行项目开发时，往往会需要面对多个入口，即多个HTML文件，然后这个HTML文件加载不同的JS或者CSS文件。譬如登录页面与主界面，往往可以视作两个不同的入口。Webpack原生提倡的配置方案是面向过程的，而笔者在这里是面向应用方式的封装配置。</p></li>
<li><p>调试时热加载：这个特性毋庸多言，不过热加载因为走得是中间服务器，同时只能支持监听一个项目，因此需要在多应用配置的情况下加上一个参数，即指定当前调试的应用。</p></li>
<li><p>自动化的Polyfill：这个是Webpack自带的一个特性吧，不过笔者就加以整合，主要是实现了对于ES6、React、CSS(Flexbox)等等的自动Polyfill。</p></li>
<li><p>资源文件的自动管理：这部分主要指从模板自动生成目标HTML文件、自动处理图片/字体等资源文件以及自动提取出CSS文件等。</p></li>
<li><p>文件分割与异步加载：可以将多个应用中的公共文件，譬如都引用了React类库的话，可以将这部分文件提取出来，这样前端可以减少一定的数据传输。另外的话还需要支持组件的异步加载，譬如用了React Router，那需要支持组件在需要时再加载。</p></li>
</ul>
<h2 id="articleHeader2">真的需要Redux吗?</h2>
<blockquote><ul>
<li><p><a href="https://segmentfault.com/a/1190000007103433">思考:我需要怎样的前端状态管理工具?</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006966262" target="_blank">你不一定需要Redux</a></p></li>
</ul></blockquote>
<p>虽然本项目是面向Webpack+React+Redux的Boilerplate，但是笔者还是希望在此抛出这个问题，也是便于大家能够理解Redux。对于这个问题笔者没有明确的答案,但是在这两年的自己对于Redux的实战中,也一直在摇把。我坚定的认为Redux指明了解决某类问题的正确方向,但是它真的适合于所有的项目吗?笔者在<a href="https://segmentfault.com/a/1190000004292245">我的前端之路</a>一文中提及,从以DOM操作为核心的jQuery时代到以声明式组件为核心的React时代的变迁是声明式编程对于命令式的慢慢代替,而Redux则是纯粹的声明式编程典范。这里以某个登录认证的小例子进行说明，产品的需求是允许用户在登录成功之后在登录页面上显示“登录成功，正在跳转”，然后延时跳转到其他页面。这里强调要在登录页面上进行回显是因为很多人习惯将，跳转作为Side Effect在Thunk或者Saga中就处理了，并没有影响到界面本身。具体的代码对比可以参考<a href="https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/react/component/login.js" rel="nofollow noreferrer" target="_blank">纯粹的React实现的登录跳转</a>与<a href="https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/redux/container/login.js" rel="nofollow noreferrer" target="_blank">基于Redux实现的登录跳转</a>。首先，如果是纯粹的React命令式的话，会是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ReactComponent{
  ...
  if(!isValid){ //isValid是外部传入的状态变量，存放用户是否已经登录
  //如果尚未登录，则进行登录操作
  login().then(()=>{
    //登录成功之后，显示文字并且执行跳转
    show('登录成功，正在跳转');
    redirect();
  });
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ReactComponent</span>{</span>
  ...
  <span class="hljs-keyword">if</span>(!isValid){ <span class="hljs-regexp">//i</span>sValid是外部传入的状态变量，存放用户是否已经登录
  <span class="hljs-regexp">//</span>如果尚未登录，则进行登录操作
  login().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-regexp">//</span>登录成功之后，显示文字并且执行跳转
    show(<span class="hljs-string">'登录成功，正在跳转'</span>);
    redirect();
  });
}
}</code></pre>
<p>如果我们引入Redux，并且将Component中的所有副作用移除的话:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ReduxComponent{
  ...
  if(!isValid){ 
      login(); //执行登录操作，其会dispatch某个Action，触发外部状态变化
  }
  
  if(shouldRedirect){ //需要添加该变量来记录是否需要进行跳转
    show('登录成功，正在跳转');
    dispatch({type:'SET_SHOULDREDIRECT_FALSE'});//将控制是否跳转的状态变量重置
    redirect();
  }
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">class</span> <span class="hljs-selector-tag">ReduxComponent</span>{
  ...
  <span class="hljs-selector-tag">if</span>(!isValid){ 
      <span class="hljs-selector-tag">login</span>(); <span class="hljs-comment">//执行登录操作，其会dispatch某个Action，触发外部状态变化</span>
  }
  
  <span class="hljs-selector-tag">if</span>(shouldRedirect){ <span class="hljs-comment">//需要添加该变量来记录是否需要进行跳转</span>
    <span class="hljs-selector-tag">show</span>(<span class="hljs-string">'登录成功，正在跳转'</span>);
    <span class="hljs-selector-tag">dispatch</span>({<span class="hljs-attribute">type</span>:<span class="hljs-string">'SET_SHOULDREDIRECT_FALSE'</span>});<span class="hljs-comment">//将控制是否跳转的状态变量重置</span>
    <span class="hljs-selector-tag">redirect</span>();
  }
}
}</code></pre>
<p>从上面的例子中我们能看出,就好像能量守恒定理一样,对于任何的业务逻辑的实现要么以命令的方式,要么以声明的方式辅以大量的状态变量（参考基于变量的循环与基于迭代的循环二者的代码复杂度比较）。Redux以函数式编程的强约束将我们很多的逻辑拆分为了多个纯函数表示,并以数据流驱动整个项目。Redux允许我们以支离破碎的逻辑代码与相较于命令式编程膨胀很多的模板代码为代价实现百分百的可测试性与可预测性。经过这么长时间的摸索与社区广泛的讨论实践，Redux的优势与劣势都已经很明显了。对于具体的使用者也是见仁见智，以笔者而言因为一直都在中小型企业中，往往对于产品进度的要求会多余测试，并且更多的以人工测试为主，因此笔者目前是尝试在项目中混用<a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/OpenSource/mobx-react-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">MobX</a>与Redux，希望能够有效平衡开发速度与整体的鲁棒性/可扩展性。</p>
<h2 id="articleHeader3">Personal Best Practice</h2>
<p>本部分是列举一些通用的个人最佳实践的感受，不局限于React或者Redux。具体的关于React与Redux的实践建议会在下文中介绍。</p>
<ul><li><p>Promise</p></li></ul>
<p>使用Promise进行异步操作，建议使用await/async作为Promise语法糖构建异步函数。</p>
<ul><li><p>fetch</p></li></ul>
<p>使用fetch作为统一的数据获取函数，在本项目中使用了笔者的[fluent-fetcher]()作为fetch的上层封装使用。</p>
<ul><li><p>尽可能少的使用行内样式,将每个组件的样式文件与组件声明文件同地存放<br>  譬如Material-UI这个著名的React样式组件库与<a href="https://github.com/erikras/react-redux-universal-hot-example" rel="nofollow noreferrer" target="_blank">react-redux-universal-hot-example</a></p></li></ul>
<p>之前的版本都是用的CSS-IN-JavaScript,全部内联样式。笔者感觉还是需要将CSS与JS剥离开来,一方面是处于职责分割的考虑,另一方面也是为了样式的可变性。通过样式类的方式来定义方式很方便地可以通过CSS来修正样式,而不需要每次都要找半天内联样式在哪里,然后去重新编译整个项目。</p>
<ul><li><p>适当合理地编写纯函数，在合理范围内尽可能地将逻辑处理抽象为纯函数</p></li></ul>
<h2 id="articleHeader4">Reference</h2>
<h3 id="articleHeader5">Boilerplate</h3>
<ul>
<li><p><a href="https://github.com/gaearon/react-transform-boilerplate" rel="nofollow noreferrer" target="_blank">react-transform-boilerplate</a></p></li>
<li><p><a href="https://github.com/mxstbr/react-boilerplate" rel="nofollow noreferrer" target="_blank">react-boilerplate</a></p></li>
<li><p><a href="https://github.com/gilbarbara/react-redux-saga-boilerplate" rel="nofollow noreferrer" target="_blank">react-redux-saga-boilerplate</a></p></li>
<li><p><a href="https://github.com/erikras/react-redux-universal-hot-example" rel="nofollow noreferrer" target="_blank">react-redux-universal-hot-example</a></p></li>
</ul>
<h3 id="articleHeader6">Blogs</h3>
<ul>
<li><p><a href="https://medium.freecodecamp.com/webpack-for-the-fast-and-the-furious-bf8d3746adbd#.poot9r5ee" rel="nofollow noreferrer" target="_blank">webpack-for-the-fast-and-the-furious</a></p></li>
<li><p><a href="https://github.com/ryanflorence/react-project#lazy" rel="nofollow noreferrer" target="_blank">react-project</a></p></li>
</ul>
<h1 id="articleHeader7">Quick Start</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166611?w=1280&amp;h=852" src="https://static.alili.tech/img/remote/1460000007166611?w=1280&amp;h=852" alt="" title="" style="cursor: pointer;"></span></p>
<p>本部分笔者首先会介绍本项目中所有预置的项目编译及运行命令。首先需要明确的两点，本Boilerplate是希望达成以下两个目标：</p>
<p>（1）将关于应用的配置与关于Webpack的配置剥离开</p>
<p>项目中开发配置主要在dev-config目录下，如果你要基于本项目进行二次开发,可以直接拷贝dev-config与package.json到你自己的项目中,然后根据需要配置dev-config/apps.config.js项目。而主要的应用配置信息目前是抽象到了<code>dev-config/app.config.js</code>文件中，主要的可配置项如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by apple on 16/6/8.
 */
const defaultIndexPage = &quot;./dev-config/server/template.html&quot;;

module.exports = {
  apps: [
    //HelloWorld
    {
      id: &quot;helloworld&quot;,
      src: &quot;./src/simple/helloworld/helloworld.js&quot;,
      indexPage: defaultIndexPage,
      compiled: false //控制在执行npm run build时是否会编译该app
    },
    {
      id: &quot;react&quot;,
      src: &quot;./src/react/react_app.js&quot;,
      indexPage: defaultIndexPage,
      compiled: true
    },
    {
      id: &quot;redux&quot;,
      src: &quot;./src/redux/redux_app.js&quot;,
      indexPage: defaultIndexPage,
      compiled: false
    }
  ],

  //开发服务器配置
  devServer: {
    appEntrySrc: &quot;./src/react/react_app.js&quot;, //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },

  //依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    backend: &quot;&quot;,
  },

  //如果是生成的依赖库的配置项
  library: {
    name: &quot;library_portal&quot;,//依赖项入口名
    entry: &quot;./src/library/library_portal.js&quot;,//依赖库的入口,
    libraryName: &quot;libraryName&quot;,//生成的挂载在全局依赖项下面的名称
    libraryTarget: &quot;var&quot;//挂载的全局变量名
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">/**
 * Created by apple on 16/6/8.
 */</span>
const defaultIndexPage = <span class="hljs-string">"./dev-config/server/template.html"</span>;

module.exports = {
<span class="hljs-symbol">  apps:</span> [
    <span class="hljs-comment">//HelloWorld</span>
    {
<span class="hljs-symbol">      id:</span> <span class="hljs-string">"helloworld"</span>,
<span class="hljs-symbol">      src:</span> <span class="hljs-string">"./src/simple/helloworld/helloworld.js"</span>,
<span class="hljs-symbol">      indexPage:</span> defaultIndexPage,
<span class="hljs-symbol">      compiled:</span> false <span class="hljs-comment">//控制在执行npm run build时是否会编译该app</span>
    },
    {
<span class="hljs-symbol">      id:</span> <span class="hljs-string">"react"</span>,
<span class="hljs-symbol">      src:</span> <span class="hljs-string">"./src/react/react_app.js"</span>,
<span class="hljs-symbol">      indexPage:</span> defaultIndexPage,
<span class="hljs-symbol">      compiled:</span> true
    },
    {
<span class="hljs-symbol">      id:</span> <span class="hljs-string">"redux"</span>,
<span class="hljs-symbol">      src:</span> <span class="hljs-string">"./src/redux/redux_app.js"</span>,
<span class="hljs-symbol">      indexPage:</span> defaultIndexPage,
<span class="hljs-symbol">      compiled:</span> false
    }
  ],

  <span class="hljs-comment">//开发服务器配置</span>
<span class="hljs-symbol">  devServer:</span> {
<span class="hljs-symbol">    appEntrySrc:</span> <span class="hljs-string">"./src/react/react_app.js"</span>, <span class="hljs-comment">//当前待调试的APP的入口文件</span>
<span class="hljs-symbol">    port:</span> <span class="hljs-number">3000</span> <span class="hljs-comment">//监听的Server端口</span>
  },

  <span class="hljs-comment">//依赖项配置</span>
<span class="hljs-symbol">  proxy:</span> {
    <span class="hljs-comment">//后端服务器地址 http://your.backend/</span>
<span class="hljs-symbol">    backend:</span> <span class="hljs-string">""</span>,
  },

  <span class="hljs-comment">//如果是生成的依赖库的配置项</span>
<span class="hljs-symbol">  library:</span> {
<span class="hljs-symbol">    name:</span> <span class="hljs-string">"library_portal"</span>,<span class="hljs-comment">//依赖项入口名</span>
<span class="hljs-symbol">    entry:</span> <span class="hljs-string">"./src/library/library_portal.js"</span>,<span class="hljs-comment">//依赖库的入口,</span>
<span class="hljs-symbol">    libraryName:</span> <span class="hljs-string">"libraryName"</span>,<span class="hljs-comment">//生成的挂载在全局依赖项下面的名称</span>
<span class="hljs-symbol">    libraryTarget:</span> <span class="hljs-string">"var"</span><span class="hljs-comment">//挂载的全局变量名</span>
  }
};</code></pre>
<p>（2）能够以平滑的方式编译为三个不同的目标，主要是独立部署（往往作为单页应用或者离线WebAPP）与Server Side Rendering这两种。</p>
<h2 id="articleHeader8">Simple</h2>
<blockquote><p>笔者正在逐步采用<a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/Server/NodeJS/Yarn.md" rel="nofollow noreferrer" target="_blank">yarn</a>作为替代npm的依赖管理工具，不过在目前的README中还是保留了npm方式，有兴趣的朋友可以自己进行尝试。</p></blockquote>
<p>首先使用<code>git clone</code>命令将项目Clone到本地:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate
cd Webpack2-React-Redux-Boilerplate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate
cd Webpack2-React-Redux-Boilerplate</code></pre>
<p>然后使用 <code>npm install</code> / <code>npm link</code>命令安装依赖项目，同时如果你要实现部署的话还需要一些全局命令，可以使用<code>sh install.sh</code>进行安装。然后将<code>dev-config/app.config.js</code>作如下配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //开发服务器配置
  devServer: {
    appEntrySrc: &quot;./src/simple/helloworld/helloworld.js&quot;, //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>  <span class="hljs-comment">//开发服务器配置</span>
<span class="hljs-symbol">  devServer:</span> {
<span class="hljs-symbol">    appEntrySrc:</span> <span class="hljs-string">"./src/simple/helloworld/helloworld.js"</span>, <span class="hljs-comment">//当前待调试的APP的入口文件</span>
<span class="hljs-symbol">    port:</span> <span class="hljs-number">3000</span> <span class="hljs-comment">//监听的Server端口</span>
  },</code></pre>
<p>然后使用<code>npm start</code>命令启动调试服务器，此时在命令行中Webpack DashBoard会自动输出编译信息:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166612?w=2700&amp;h=658" src="https://static.alili.tech/img/remote/1460000007166612?w=2700&amp;h=658" alt="" title="" style="cursor: pointer;"></span></p>
<p>然后在浏览器中打开<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>，你可以看到如下画面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166613?w=1490&amp;h=744" src="https://static.alili.tech/img/remote/1460000007166613?w=1490&amp;h=744" alt="" title="" style="cursor: pointer;"></span></p>
<p>此时在编辑器中实时修改App.js，结果可以通过热加载实时反馈到界面上，热加载主要是利用实时传送描述热加载的json与js文件:<br><span class="img-wrap"><img data-src="/img/remote/1460000007166614?w=1726&amp;h=725" src="https://static.alili.tech/img/remote/1460000007166614?w=1726&amp;h=725" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样当我们有需要自定义某些热加载的规则时可以同样利用这种方式。我们通过<code>npm start</code>利用WebpackDevServer来启动开发服务器，这个很方便我们进行开发。接下来我们通过<code>npm run build</code>命令来构建可发布版本，这种方式编译得出的基于hashHistory，可以用于单页应用（路径不变）或者离线应用（譬如应用到Cordova中），首先我们需要在<code>dev-config/apps.config.js</code>中将目标应用编译状态设置为true。注意，如果同时编译多个应用，那么CommonsChunkPlugin会将这几个应用中的公共代码抽取出来:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //HelloWorld
    {
      id: &quot;helloworld&quot;,
      src: &quot;./src/simple/helloworld/helloworld.js&quot;,
      indexPage: defaultIndexPage,
      compiled: true //控制在执行npm run build时是否会编译该app
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>    <span class="hljs-comment">//HelloWorld</span>
    {
<span class="hljs-symbol">      id:</span> <span class="hljs-string">"helloworld"</span>,
<span class="hljs-symbol">      src:</span> <span class="hljs-string">"./src/simple/helloworld/helloworld.js"</span>,
<span class="hljs-symbol">      indexPage:</span> defaultIndexPage,
<span class="hljs-symbol">      compiled:</span> true <span class="hljs-comment">//控制在执行npm run build时是否会编译该app</span>
    },</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166615?w=633&amp;h=206" src="https://static.alili.tech/img/remote/1460000007166615?w=633&amp;h=206" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>直接在浏览器中打开<code>helloworld.html</code>文件，即可看到与刚才热加载时相同的页面。另外需要注意的是，这里使用的HTML模板都是统一放置于<code>dev-config/server/template.html</code>文件，笔者建议使用<a href="https://github.com/nfl/react-helmet" rel="nofollow noreferrer" target="_blank">Helmet</a>来为HTML添加自定义的元标签或者样式脚本等。</p>
<h3 id="articleHeader9">Library</h3>
<p>以上述方式编译的是独立可运行的脚本，而在有些情况下我们希望以类似于jQuery的方式挂载全局变量/函数的方式使用部分功能，这里我们就需要将编译目标设置为Library。首先将<code>dev-config/apps.config.js</code>中Library配置如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //如果是生成的依赖库的配置项
  library: {
    name: &quot;library_portal&quot;,//依赖项入口名
    entry: &quot;./src/simple/library/library_portal.js&quot;,//依赖库的入口,
    libraryName: &quot;libraryName&quot;,//生成的挂载在全局依赖项下面的名称
    libraryTarget: &quot;var&quot;//挂载的全局变量名
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>  <span class="hljs-comment">//如果是生成的依赖库的配置项</span>
<span class="hljs-symbol">  library:</span> {
<span class="hljs-symbol">    name:</span> <span class="hljs-string">"library_portal"</span>,<span class="hljs-comment">//依赖项入口名</span>
<span class="hljs-symbol">    entry:</span> <span class="hljs-string">"./src/simple/library/library_portal.js"</span>,<span class="hljs-comment">//依赖库的入口,</span>
<span class="hljs-symbol">    libraryName:</span> <span class="hljs-string">"libraryName"</span>,<span class="hljs-comment">//生成的挂载在全局依赖项下面的名称</span>
<span class="hljs-symbol">    libraryTarget:</span> <span class="hljs-string">"var"</span><span class="hljs-comment">//挂载的全局变量名</span>
  }</code></pre>
<p>然后使用<code>npm run build:library</code>进行编译，这里我们希望将某个简单的ES6类导出到页面中使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @function 基于ES6的服务类
 */
export class FooService {

    static echo(){

        const fooService = new FooService();

        return fooService.getMessage();
    }

    /**
     * @function 默认构造函数
     */
    constructor() {
        this.message = &quot;This is Message From FooService!&quot;;
    }

    getMessage() {
        return this.message;
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @function 基于ES6的服务类
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FooService</span> </span>{

    <span class="hljs-keyword">static</span> echo(){

        <span class="hljs-keyword">const</span> fooService = <span class="hljs-keyword">new</span> FooService();

        <span class="hljs-keyword">return</span> fooService.getMessage();
    }

    <span class="hljs-comment">/**
     * @function 默认构造函数
     */</span>
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.message = <span class="hljs-string">"This is Message From FooService!"</span>;
    }

    getMessage() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.message;
    }

}</code></pre>
<p>我们还需要设置专门的入口文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by apple on 16/7/23.
 */
import {FooService} from &quot;./foo&quot;;

/**
 * @function 配置需要暴露的API
 * @type "{{"foo: {echo: FooService.echo"}}"}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>/**
 * Created <span class="hljs-keyword">by</span> apple on <span class="hljs-number">16</span>/<span class="hljs-number">7</span>/<span class="hljs-number">23</span>.
 */
<span class="hljs-keyword">import</span> {FooService} from <span class="hljs-string">"./foo"</span>;

/**
 * @<span class="hljs-keyword">function</span> 配置需要暴露的API
 * @type "{{"foo: {echo: FooService.echo"}}"}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};</code></pre>
<p>然后在需要的页面中引入编译好的两个脚本:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;../../../dist/vendors.bundle.js&quot;></script>
<script src=&quot;../../../dist/library_portal.library.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../../dist/vendors.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../../dist/library_portal.library.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>此时打开该界面，即可以弹出如下窗口:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166616?w=862&amp;h=607" src="https://static.alili.tech/img/remote/1460000007166616?w=862&amp;h=607" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">Server Side Rendering Support</h2>
<p>本部分我们使用react_app这个应用作为示例，首先同样将配置中调试目标设置为react_app.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //开发服务器配置
  devServer: {
    appEntrySrc: &quot;./src/react/react_app.js&quot;, //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>  <span class="hljs-comment">//开发服务器配置</span>
<span class="hljs-symbol">  devServer:</span> {
<span class="hljs-symbol">    appEntrySrc:</span> <span class="hljs-string">"./src/react/react_app.js"</span>, <span class="hljs-comment">//当前待调试的APP的入口文件</span>
<span class="hljs-symbol">    port:</span> <span class="hljs-number">3000</span> <span class="hljs-comment">//监听的Server端口</span>
  },</code></pre>
<p>然后使用<code>npm start</code>命令来启动开发服务器，然后同样可以使用<code>npm run build</code>命令编译可发布版本。然后打开<code>dist/</code>目录下的<code>react.html</code>文件，即可以看到界面，注意，此时使用的是hashHistory，因此URL的形式为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="react.html?_ijt=4t0fmg7f6rhsv85efsau6j3t1r#/detail?_k=f9r3og" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">react.html?_ijt=<span class="hljs-number">4</span>t<span class="hljs-number">0</span>fm<span class="hljs-name">g7</span>f<span class="hljs-number">6</span>rhsv<span class="hljs-number">85</span>efsau<span class="hljs-number">6</span>j<span class="hljs-number">3</span>t<span class="hljs-number">1</span>r<span class="hljs-attr">#/detail?_k=f9</span>r<span class="hljs-number">3</span>og</code></pre>
<p>然后我们需要以Server Side Rendering的方式发布项目，其主要区别在于支持browserHistory以及服务端完成渲染。注意，实际上页面发送到客户端之后还会依靠加载的JS脚本全部重新渲染，其只是为了方便SEO/首屏显示速度/填充初始状态到界面中。</p>
<p>首先，我们需要将<code>apps.config.js</code>文件中的ssrServer项目设置为我们目标的ssrServer:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: './src/react/ssr_server.js'
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">//用于服务端渲染的Server路径</span>
  <span class="hljs-attribute">ssrServer</span>: {
    <span class="hljs-attribute">serverEntrySrc</span>: <span class="hljs-string">'./src/react/ssr_server.js'</span>
  },</code></pre>
<p>我们使用<code>npm run build:ssr</code>命令进行编译，在<code>dist</code>目录下可以得到如下文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── react.bundle.js
├── react.css
├── react.html
├── ssr_server.bundle.js
├── ssr_server.bundle.js.map
└── vendors.bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── react<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>
├── react<span class="hljs-selector-class">.css</span>
├── react<span class="hljs-selector-class">.html</span>
├── ssr_server<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>
├── ssr_server<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
└── vendors<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span></code></pre>
<p>在本项目中为了尽可能的代码复用，使用了变量来控制是否支持服务端渲染，我们直接使用<code> node dist/ssr_server.bundle.js</code>即可以启动服务器，此时URL格式为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:3001/login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//localhost:3001/login</span></code></pre>
<h1 id="articleHeader11">Develop Environment:开发环境机制详解</h1>
<h2 id="articleHeader12">Webpack2</h2>
<blockquote><ul><li><p><a href="https://gist.github.com/sokra/27b24881210b56bbaff7" rel="nofollow noreferrer" target="_blank">What's new in webpack 2</a><button class="btn btn-xs btn-default ml10 preview" data-url="sokra/27b24881210b56bbaff7" data-typeid="1">点击预览</button></p></li></ul></blockquote>
<p>本项目中使用Webpack 2替代原本的Webpack 1，从Webpack 1到Webpack 2很多的配置项目发生了变化，详细列表可以参考引用中提供的链接。而在本项目中，其中几个典型的修改为:<br>（1）所有loader的配置提取到了LoaderOptionsPlugin中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: '/',
      postcss: [
        utils.postCSSConfig
      ]
    }
  })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">//提取Loader定义到同一地方</span>
  <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.LoaderOptionsPlugin</span>({
    <span class="hljs-attribute">minimize</span>: true,
    <span class="hljs-attribute">debug</span>: false,
    <span class="hljs-attribute">options</span>: {
      <span class="hljs-attribute">context</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attribute">postcss</span>: [
        utils.postCSSConfig
      ]
    }
  }),</code></pre>
<p>这里包含对于原本的UglifyJsPlugin与PostCSS的配置。</p>
<p>（2）loader配置更加灵活。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loaders: [
    {
        test: /\.css$/,
        loaders: [
            &quot;style-loader&quot;,
            { loader: &quot;css-loader&quot;, query: { modules: true } },
            {
                loader: &quot;sass-loader&quot;,
                query: {
                    includePaths: [
                        path.resolve(__dirname, &quot;some-folder&quot;)
                    ]
                }
            }
        ]
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">loaders:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        test:</span> <span class="hljs-string">/\.css$/,</span>
<span class="hljs-attr">        loaders:</span> <span class="hljs-string">[</span>
            <span class="hljs-string">"style-loader"</span><span class="hljs-string">,</span>
            <span class="hljs-string">{</span> <span class="hljs-attr">loader:</span> <span class="hljs-string">"css-loader"</span><span class="hljs-string">,</span> <span class="hljs-attr">query:</span> <span class="hljs-string">{</span> <span class="hljs-attr">modules:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span> <span class="hljs-string">},</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">                loader:</span> <span class="hljs-string">"sass-loader"</span><span class="hljs-string">,</span>
<span class="hljs-attr">                query:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                    includePaths:</span> <span class="hljs-string">[</span>
                        <span class="hljs-string">path.resolve(__dirname,</span> <span class="hljs-string">"some-folder"</span><span class="hljs-string">)</span>
                    <span class="hljs-string">]</span>
                <span class="hljs-string">}</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">]</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">]</span></code></pre>
<h2 id="articleHeader13">WebpackDevServer &amp; Hot Loader</h2>
<p>在前一版本的devServer中，笔者使用了express加上webpack-dev-middleware与webpack-hot-middleware中间件，本版本中是迁移到了WebpackDevServer:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new WebpackDevServer(webpack(config), {
  //设置WebpackDevServer的开发目录
  contentBase: path.join(__dirname + &quot;/&quot;),
  // publicPath: `http://0.0.0.0:${appsConfig.devServer.port}/`,
  hot: true,
  historyApiFallback: true,
  quiet:true,
  // noInfo: true,
  stats: {colors: true}
}).listen(appsConfig.devServer.port, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://0.0.0.0:${appsConfig.devServer.port}/`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> WebpackDevServer(webpack(config), {
  <span class="hljs-comment">//设置WebpackDevServer的开发目录</span>
  contentBase: path.join(__dirname + <span class="hljs-string">"/"</span>),
  <span class="hljs-comment">// publicPath: `http://0.0.0.0:${appsConfig.devServer.port}/`,</span>
  hot: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">quiet</span>:<span class="hljs-literal">true</span>,
  <span class="hljs-comment">// noInfo: true,</span>
  stats: {<span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>}
}).listen(appsConfig.devServer.port, <span class="hljs-string">'0.0.0.0'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err);
  }

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Listening at http://0.0.0.0:<span class="hljs-subst">${appsConfig.devServer.port}</span>/`</span>);
});</code></pre>
<p>另外就是对于HotReloader的使用，目前很多热加载的实现方式还是基于<a href="https://github.com/gaearon/react-transform-boilerplate" rel="nofollow noreferrer" target="_blank">react-transform</a>，不过该项目已经废弃了，因此这里如果要自己添加热加载组件的话，建议使用<a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">react-hot-loader</a>，目前笔者使用了3.0版本。我们分别需要将上面的WebpackDevServer中的hot设置为true，并且在Babel配置文件中添加如下配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;env&quot;: {
    &quot;development&quot;: {
      &quot;presets&quot;: [
        &quot;react-hmre&quot;
      ],
      &quot;plugins&quot;: [
        &quot;react-hot-loader/babel&quot;
      ]
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>  <span class="hljs-string">"env"</span>: {
    <span class="hljs-string">"development"</span>: {
      <span class="hljs-string">"presets"</span>: [
        <span class="hljs-string">"react-hmre"</span>
      ],
      <span class="hljs-string">"plugins"</span>: [
        <span class="hljs-string">"react-hot-loader/babel"</span>
      ]
    }
  }</code></pre>
<h2 id="articleHeader14">API Proxy</h2>
<p>待补充。</p>
<h1 id="articleHeader15">React Router &amp; Server Side Rendering</h1>
<blockquote><ul><li><p><a href="https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/Frontend/Framework/View/React/Router/React-Router.md" rel="nofollow noreferrer" target="_blank">React路由解决方案React-Router介绍与实践</a></p></li></ul></blockquote>
<h2 id="articleHeader16">Pure Frontend</h2>
<p>我们首先从应用的入口程序看起:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let history;

//判断是否为SSR从而确定应该选用哪个History
if (__SSR__) {
  //如果是浏览器环境,则使用browserHistory
  history = browserHistory;
} else {
  //如果是独立环境,则使用hashHistory
  history = hashHistory;
}

//在浏览器环境下使用hashHistory
const router = <Router history={history}>
  {getRoutes(localStorage)}
</Router>;

//将组件渲染到DOM中
render(
  router,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> history;

<span class="hljs-comment">//判断是否为SSR从而确定应该选用哪个History</span>
<span class="hljs-keyword">if</span> (__SSR__) {
  <span class="hljs-comment">//如果是浏览器环境,则使用browserHistory</span>
  history = browserHistory;
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">//如果是独立环境,则使用hashHistory</span>
  history = hashHistory;
}

<span class="hljs-comment">//在浏览器环境下使用hashHistory</span>
<span class="hljs-keyword">const</span> router = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
  {getRoutes(localStorage)}
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>;

<span class="hljs-comment">//将组件渲染到DOM中</span>
render(
  router,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>这里将路由配置提取到单独文件中，是因为路由配置是需要在服务端与客户端共享的，因此将可能是DOM下独有的localStorage或者类似的对象以参数方式传入。对于Route的配置倒是客户端与服务端保持一致:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  return (
    <Route path=&quot;/&quot; history={browserHistory} component={Container}>
      <IndexRoute component={Home}/>
      <Route path=&quot;home&quot; component={withRouter(Home)}/>
      <Route path=&quot;login&quot; component={withRouter(Login)}/>
      <Route path=&quot;detail&quot; component={withRouter(Detail)} onEnter={auth}/>
    </Route>
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  return (
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{browserHistory}</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Container}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"home"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{withRouter(Home)}/</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"login"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{withRouter(Login)}/</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"detail"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{withRouter(Detail)}</span> <span class="hljs-attr">onEnter</span>=<span class="hljs-string">{auth}/</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
  );</code></pre>
<p>其余的代码不多，可以自行浏览整个项目。这里有个关于React Router的点我想说明下,在Route配置时使用<code>withRouter</code>这个方法可以以HOC方式注入router对象到Props中，这样我们在进行页面跳转时可以使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.props.router.goBack()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.router</span><span class="hljs-selector-class">.goBack</span>()</code></pre>
<h2 id="articleHeader17">Server Side Rendering</h2>
<p>首先我们说几句废话，需要了解服务端渲染到底做了啥:</p>
<p>（1）Server端只负责首页的渲染，其他页面仍然由客户端进行渲染。即虽然URL Path发生了变化，但是并未触发整个页面的完全刷新。</p>
<p>（2）以Redux为代表的状态管理工具中的Store只是在第一次渲染时将数据传递给客户端，在后续的页面切换/认证等操作中的所有代码皆在客户端运行。</p>
<p>这里我们不需要改造上面的客户端入口文件，而需要添加一个用于服务端运行的文件，其核心代码为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//处理所有的请求地址
app.get('/*', function (req, res) {

  //匹配客户端路由
  match({routes: getRoutes(), location:req.originalUrl}, (error, redirectLocation, renderProps) => {

    if (error) {

      res.status(500).send(error.message)

    } else if (redirectLocation) {

      res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    } else if (renderProps) {

      let html = renderToString(<RouterContext {...renderProps} />);

      res.status(200).send(renderHTML(html, {key: &quot;value&quot;}, ['/static/vendors.bundle.js', '/static/react.bundle.js']));

    } else {
      res.status(404).send('Not found')
    }
  })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>//处理所有的请求地址
app.get(<span class="hljs-string">'/*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span></span> {

  //匹配客户端路由
  match({routes: getRoutes(), location:req.originalUrl}, (<span class="hljs-built_in">error</span>, redirectLocation, renderProps) =&gt; {

    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {

      res.<span class="hljs-built_in">status</span>(<span class="hljs-number">500</span>).send(<span class="hljs-built_in">error</span>.message)

    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (redirectLocation) {

      res.redirect(<span class="hljs-number">302</span>, redirectLocation.pathname + redirectLocation.search)

    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (renderProps) {

      let html = renderToString(&lt;RouterContext {...renderProps} /&gt;);

      res.<span class="hljs-built_in">status</span>(<span class="hljs-number">200</span>).send(renderHTML(html, {key: <span class="hljs-string">"value"</span>}, [<span class="hljs-string">'/static/vendors.bundle.js'</span>, <span class="hljs-string">'/static/react.bundle.js'</span>]));

    } <span class="hljs-keyword">else</span> {
      res.<span class="hljs-built_in">status</span>(<span class="hljs-number">404</span>).send(<span class="hljs-string">'Not found'</span>)
    }
  })
});</code></pre>
<p>可以看出，即是用户首次向服务端发起请求时，首先对于首屏展示的组件进行渲染。我们来做一个对比，服务端渲染之后的得到的HTML字符串为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div data-reactroot=&quot;&quot; data-reactid=&quot;1&quot; data-react-checksum=&quot;663537196&quot;>
    <section class=&quot;login__container&quot; data-reactid=&quot;2&quot;><!-- react-text: 3 -->登陆界面<!-- /react-text -->
        <div data-reactid=&quot;4utton data-reactid=&quot; 5
        &quot;>点击登陆</button>
        <button data-reactid=&quot;6&quot;>点击登出</button>
</div></section></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div data-reactroot=<span class="hljs-string">""</span> data-reactid=<span class="hljs-string">"1"</span> data-react-checksum=<span class="hljs-string">"663537196"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login__container"</span> <span class="hljs-attr">data-reactid</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-comment">&lt;!-- react-text: 3 --&gt;</span>登陆界面<span class="hljs-comment">&lt;!-- /react-text --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-reactid</span>=<span class="hljs-string">"4utton data-reactid="</span> <span class="hljs-attr">5</span>
        "&gt;</span>点击登陆<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-reactid</span>=<span class="hljs-string">"6"</span>&gt;</span>点击登出<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>而原始的JSX组件如下，可以发现事件处理等很多代码都被过滤了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by apple on 16/9/13.
 */
export class Login extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    return <section className=&quot;login__container&quot;>
      登陆界面

      <div>
        <button onClick={()=> {
          //将登陆信息写入cookies与localStorage
          login().then(()=> {
            //登陆成功跳转到详情页
            this.props.router.push('/detail');
          });
        "}}">
          点击登陆
        </button>

        <button onClick={()=> {
          //将登陆信息写入cookies与localStorage
          logout();
          //登陆成功跳转到详情页
          this.props.router.push('/');
        "}}">
          点击登出
        </button>
      </div>

    </section>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">/**
 * Created by apple on 16/9/13.
 */</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-comment">/**
   * @function 默认渲染函数
   * @return {XML}
   */</span>
  render() {
    <span class="hljs-keyword">return</span> &lt;section className=<span class="hljs-string">"login__container"</span>&gt;
      登陆界面

      &lt;div&gt;
        &lt;button onClick={()=&gt; {
          <span class="hljs-comment">//将登陆信息写入cookies与localStorage</span>
          login().then(()=&gt; {
            <span class="hljs-comment">//登陆成功跳转到详情页</span>
            <span class="hljs-keyword">this</span>.props.router.push('/detail');
          });
        "}}"&gt;
          点击登陆
        &lt;/button&gt;

        &lt;button onClick={()=&gt; {
          <span class="hljs-comment">//将登陆信息写入cookies与localStorage</span>
          logout();
          <span class="hljs-comment">//登陆成功跳转到详情页</span>
          <span class="hljs-keyword">this</span>.props.router.push('/');
        "}}"&gt;
          点击登出
        &lt;/button&gt;
      &lt;/div&gt;

    &lt;/section&gt;
  }
}</code></pre>
<h2 id="articleHeader18">Authentication</h2>
<p>有时候我们需要对某些URL添加权限认证，即只允许认证用户才能访问，这里我们可以通过Route中的onEnter属性进行控制:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;detail&quot; component={withRouter(Detail)} onEnter={auth}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"detail"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{withRouter(Detail)}</span> <span class="hljs-attr">onEnter</span>=<span class="hljs-string">{auth}/</span>&gt;</span></code></pre>
<p>而我们在上文中传入的Store对象也是在这个时候派上用场:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
   * @function 判断用户是否登陆,如果未登陆则强制性跳转到登录页面
   * @param nextState
   * @param replace
   * @param callback
   */
  async function auth(nextState, replace, callback) {

    let userToken = store.userToken;

    //在这里执行异步认证,假设传入的store中包含userToken
    //这里使用Promise执行异步操作
    //如果是SSR,则本部分代码会在服务端运行

    let isValid = await valid_user(userToken);

    //如果用户尚未认证,则进行跳转操作
    isValid || replace('/login');

    //执行回调函数
    callback();

  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-comment">/**
   * <span class="hljs-doctag">@function</span> 判断用户是否登陆,如果未登陆则强制性跳转到登录页面
   * <span class="hljs-doctag">@param</span> nextState
   * <span class="hljs-doctag">@param</span> replace
   * <span class="hljs-doctag">@param</span> callback
   */</span>
  async <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">auth</span><span class="hljs-params">(nextState, replace, callback)</span> </span>{

    <span class="hljs-keyword">let</span> userToken = store.userToken;

    <span class="hljs-comment">//在这里执行异步认证,假设传入的store中包含userToken</span>
    <span class="hljs-comment">//这里使用Promise执行异步操作</span>
    <span class="hljs-comment">//如果是SSR,则本部分代码会在服务端运行</span>

    <span class="hljs-keyword">let</span> isValid = await valid_user(userToken);

    <span class="hljs-comment">//如果用户尚未认证,则进行跳转操作</span>
    isValid || replace(<span class="hljs-string">'/login'</span>);

    <span class="hljs-comment">//执行回调函数</span>
    callback();

  }</code></pre>
<h1 id="articleHeader19">Isomorphic Redux</h1>
<p>笔者目前在自己主导的几个前端项目中渐渐的转向MobX与Redux并行.本项目中对于Redux的文件布局采取的是<a href="https://github.com/erikras/ducks-modular-redux" rel="nofollow noreferrer" target="_blank">Ducks</a>这种方式,参考了<a href="https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5#.yot2mml9t" rel="nofollow noreferrer" target="_blank">my-journey-toward-a-maintainable-project-structure-for-react-redux</a>一文。即按照特性来将Reducers、ActionCreators、Actions、Selectors集中到单个文件中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/ducks/auth.js
const AUTO_LOGIN = 'AUTH/AUTH_AUTO_LOGIN'
const SIGNUP_REQUEST = 'AUTH/SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'AUTH/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'AUTH/SIGNUP_FAILURE'
const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE'
const LOGOUT = 'AUTH/LOGOUT'

const initialState = {
  user: null,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null }

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user }

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error }

    case LOGOUT:
      return { ...state, user: null }

    default:
      return state
  }
}

export const signup = (email, password) => ({ type: SIGNUP_REQUEST, email, password })
export const login = (email, password) => ({ type: LOGIN_REQUEST, email, password })
export const logout = () => ({ type: LOGOUT })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// src/ducks/auth.js</span>
<span class="hljs-keyword">const</span> AUTO_LOGIN = <span class="hljs-string">'AUTH/AUTH_AUTO_LOGIN'</span>
<span class="hljs-keyword">const</span> SIGNUP_REQUEST = <span class="hljs-string">'AUTH/SIGNUP_REQUEST'</span>
<span class="hljs-keyword">const</span> SIGNUP_SUCCESS = <span class="hljs-string">'AUTH/SIGNUP_SUCCESS'</span>
<span class="hljs-keyword">const</span> SIGNUP_FAILURE = <span class="hljs-string">'AUTH/SIGNUP_FAILURE'</span>
<span class="hljs-keyword">const</span> LOGIN_REQUEST = <span class="hljs-string">'AUTH/LOGIN_REQUEST'</span>
<span class="hljs-keyword">const</span> LOGIN_SUCCESS = <span class="hljs-string">'AUTH/LOGIN_SUCCESS'</span>
<span class="hljs-keyword">const</span> LOGIN_FAILURE = <span class="hljs-string">'AUTH/LOGIN_FAILURE'</span>
<span class="hljs-keyword">const</span> LOGOUT = <span class="hljs-string">'AUTH/LOGOUT'</span>

<span class="hljs-keyword">const</span> initialState = {
  user: <span class="hljs-literal">null</span>,
  isLoading: <span class="hljs-literal">false</span>,
  error: <span class="hljs-literal">null</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (state = initialState, action) =&gt; {
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> SIGNUP_REQUEST:
    <span class="hljs-keyword">case</span> LOGIN_REQUEST:
      <span class="hljs-keyword">return</span> { ...state, isLoading: <span class="hljs-literal">true</span>, error: <span class="hljs-literal">null</span> }

    <span class="hljs-keyword">case</span> SIGNUP_SUCCESS:
    <span class="hljs-keyword">case</span> LOGIN_SUCCESS:
      <span class="hljs-keyword">return</span> { ...state, isLoading: <span class="hljs-literal">false</span>, user: action.user }

    <span class="hljs-keyword">case</span> SIGNUP_FAILURE:
    <span class="hljs-keyword">case</span> LOGIN_FAILURE:
      <span class="hljs-keyword">return</span> { ...state, isLoading: <span class="hljs-literal">false</span>, error: action.error }

    <span class="hljs-keyword">case</span> LOGOUT:
      <span class="hljs-keyword">return</span> { ...state, user: <span class="hljs-literal">null</span> }

    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> signup = <span class="hljs-function">(<span class="hljs-params">email, password</span>) =&gt;</span> ({ <span class="hljs-keyword">type</span>: SIGNUP_REQUEST, email, password })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> login = <span class="hljs-function">(<span class="hljs-params">email, password</span>) =&gt;</span> ({ <span class="hljs-keyword">type</span>: LOGIN_REQUEST, email, password })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> logout = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-keyword">type</span>: LOGOUT })</code></pre>
<p>对于<a href="https://github.com/gaearon/redux-devtools#browser-extension" rel="nofollow noreferrer" target="_blank">Redux Dev Tools</a>,请自行使用[Browser Extension]()。</p>
<h2 id="articleHeader20">Simple Count</h2>
<p>我们首先以简单的基于Redux的计数器为例，将<code>dev-config/apps.config.js</code>中的开发配置设置为如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //开发服务器配置
  devServer: {
    appEntrySrc: &quot;./src/redux/redux_app.js&quot;, //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>  <span class="hljs-comment">//开发服务器配置</span>
<span class="hljs-symbol">  devServer:</span> {
<span class="hljs-symbol">    appEntrySrc:</span> <span class="hljs-string">"./src/redux/redux_app.js"</span>, <span class="hljs-comment">//当前待调试的APP的入口文件</span>
<span class="hljs-symbol">    port:</span> <span class="hljs-number">3000</span> <span class="hljs-comment">//监听的Server端口</span>
  },</code></pre>
<p>然后使用<code>npm start</code>运行开发服务器，界面上的如下表示即为该示例:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007166617?w=1865&amp;h=1132" src="https://static.alili.tech/img/remote/1460000007166617?w=1865&amp;h=1132" alt="" title="" style="cursor: pointer;"></span></p>
<p>在Redux DevTools中，红色框线标示出的即为count相关的状态，我们接下来简单描述下其核心代码。在Redux开发中，我们首先需要构建一个Ducks，即包含Action、ActionCreator与Reducer:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by apple on 16/10/11.
 */
// no changes here ?

/**
 * @function 定义Actions
 * @type {string}
 */
export const INCREMENT_COUNT = 'INCREMENT';

export const DECREMENT_COUNT = 'DECREMENT';

/**
 * @function 定义Reducer
 * @param state
 * @param action
 * @return {number}
 */
export default (state = 0, {type}) => {
  switch (type) {
    case INCREMENT_COUNT:
      return state + 1;
    case DECREMENT_COUNT:
      return state - 1;
    default:
      return state
  }
}

/**
 *@region 定义Action Creator
 */

/**
 * @function 触发加1操作
 * @return "{{"type: string"}}"
 */
export const increment = ()=> {

  return {
    type: INCREMENT_COUNT
  }

};

/**
 * @function 在这里进行异步加1操作
 * @return {function(*)}
 */
export const incrementAsync = ()=> {

  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
};

/**
 * @function 执行计数器减一操作
 * @return "{{"type: string"}}"
 */
export const decrement = ()=> {

  return {
    type: DECREMENT_COUNT
  }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/**
 * Created by apple on 16/10/11.
 */</span>
<span class="hljs-comment">// no changes here ?</span>

<span class="hljs-comment">/**
 * @function 定义Actions
 * @type {string}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INCREMENT_COUNT = <span class="hljs-string">'INCREMENT'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DECREMENT_COUNT = <span class="hljs-string">'DECREMENT'</span>;

<span class="hljs-comment">/**
 * @function 定义Reducer
 * @param state
 * @param action
 * @return {number}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (state = <span class="hljs-number">0</span>, {<span class="hljs-keyword">type</span>}) =&gt; {
  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> INCREMENT_COUNT:
      <span class="hljs-keyword">return</span> state + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">case</span> DECREMENT_COUNT:
      <span class="hljs-keyword">return</span> state - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state
  }
}

<span class="hljs-comment">/**
 *@region 定义Action Creator
 */</span>

<span class="hljs-comment">/**
 * @function 触发加1操作
 * @return "{{"type: string"}}"
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> increment = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {

  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: INCREMENT_COUNT
  }

};

<span class="hljs-comment">/**
 * @function 在这里进行异步加1操作
 * @return {function(*)}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> incrementAsync = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">// Yay! Can invoke sync or async actions with `dispatch`</span>
      dispatch(increment());
    }, <span class="hljs-number">1000</span>);
  };
};

<span class="hljs-comment">/**
 * @function 执行计数器减一操作
 * @return "{{"type: string"}}"
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> decrement = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {

  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: DECREMENT_COUNT
  }

};</code></pre>
<p>这里为了简单起见，我们是使用了redux-thunk来处理异步Action，实际上在Redux中对于异步Action的处理也有各种各样的实践，包括笔者在这里自定义的promiseMiddleware，也是一种方式。然后我们需要构建一个Store来存放全局的状态，Store本身是基于Reducer来递归生成状态树的,其核心代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    typeof window === 'object' &amp;&amp; typeof window.devToolsExtension !== 'undefined' &amp;&amp; __DEV__ ? window.devToolsExtension() : f => f);

  /**
   * @function 保证Redux Reducer的热加载
   */
  if (__DEV__ &amp;&amp; module.hot) {
    module.hot.accept('./reducer', () => {
      //替换Store中的Reducer
      store.replaceReducer(require('./reducer'));
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>  <span class="hljs-keyword">const</span> store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.devToolsExtension !== <span class="hljs-string">'undefined'</span> &amp;&amp; __DEV__ ? <span class="hljs-built_in">window</span>.devToolsExtension() : <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> f);

  <span class="hljs-comment">/**
   * @function 保证Redux Reducer的热加载
   */</span>
  <span class="hljs-keyword">if</span> (__DEV__ &amp;&amp; <span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">'./reducer'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">//替换Store中的Reducer</span>
      store.replaceReducer(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./reducer'</span>));
    })
  }</code></pre>
<p>现在我们已经写完了Redux部分的代码，下面就是需要将状态导入到界面中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@connect(
  state => ({
    count: state.count
  }),
  {pushState: push, increment, incrementAsync, decrement}
)
export class Home extends Component {
  render() {

    //在非SSR状态下导入SCSS文件
    __SSR__ || require('./home.scss');

    const {count, pushState, increment, incrementAsync, decrement} = this.props;

    return <section className=&quot;home__container&quot;>

      <div>
        王下邀月熊 Webpack2-React-Redux-Boilerplate
      </div>

      <br/>
      <br/>

      <div>导航栏目:</div>

      <li>
        <button onClick={()=> {
          pushState('/detail')
        "}}">
          详情页(需要先进行登陆操作)
        </button>
      </li>
      <li><Link to=&quot;/login&quot;>登陆页</Link></li>

      <br/>
      <br/>

      <div>基于Redux的Count实例</div>
      <div>{count}</div>
      <div>
        <button onClick={increment}>加1</button>
        <button onClick={incrementAsync}>异步加1</button>
        <button onClick={decrement}>减1</button>
      </div>

    </section>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>@connect(
  <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
    <span class="hljs-attr">count</span>: state.count
  }),
  {<span class="hljs-attr">pushState</span>: push, increment, incrementAsync, decrement}
)
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {

    <span class="hljs-comment">//在非SSR状态下导入SCSS文件</span>
    __SSR__ || <span class="hljs-built_in">require</span>(<span class="hljs-string">'./home.scss'</span>);

    <span class="hljs-keyword">const</span> {count, pushState, increment, incrementAsync, decrement} = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"home__container"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        王下邀月熊 Webpack2-React-Redux-Boilerplate
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>导航栏目:<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span> {
          pushState('/detail')
        "}}"&gt;
          详情页(需要先进行登陆操作)
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/login"</span>&gt;</span>登陆页<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>基于Redux的Count实例<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>加1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{incrementAsync}</span>&gt;</span>异步加1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{decrement}</span>&gt;</span>减1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
  }
}</code></pre>
<h2 id="articleHeader21"><a href="https://github.com/reactjs/react-router-redux" rel="nofollow noreferrer" target="_blank">React Router Redux</a></h2>
<p>React Router Redux的代码还是简单易懂的,其只是在用户点击/跳转与React Router自身的History之间加上了一层封装</p>
<blockquote><p><a href="https://github.com/reactjs/history" rel="nofollow noreferrer" target="_blank">history</a>&nbsp;+&nbsp;<code>store</code>&nbsp;(<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a>) →&nbsp;<a href="https://github.com/reactjs/react-router-redux" rel="nofollow noreferrer" target="_blank"><strong>react-router-redux</strong></a>&nbsp;→ enhanced&nbsp;<a href="https://github.com/reactjs/history" rel="nofollow noreferrer" target="_blank">history</a>&nbsp;→&nbsp;<a href="https://github.com/reactjs/react-router" rel="nofollow noreferrer" target="_blank">react-router</a></p></blockquote>
<p>如果你需要自定义其他的Location,譬如如果你需要引入ImmutableJS作为Store:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Immutable from 'immutable';
import {
    LOCATION_CHANGE
} from 'react-router-redux';

let initialState;

initialState = Immutable.fromJS({
    locationBeforeTransitions: undefined
});

export default (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }

    return state;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Immutable <span class="hljs-keyword">from</span> 'immutable';
import {
    LOCATION_CHANGE
} <span class="hljs-keyword">from</span> 'react-router-redux';

let initialState;

initialState = Immutable.<span class="hljs-keyword">from</span>JS({
    locationBeforeTransitions: undefined
});

export <span class="hljs-keyword">default</span> (<span class="hljs-keyword">state</span> = initialState, action) =&gt; {
    if (action.type === LOCATION_CHANGE) {
        return <span class="hljs-keyword">state</span>.merge({
            locationBeforeTransitions: action.payload
        });
    }

    return <span class="hljs-keyword">state</span>;
};</code></pre>
<h2 id="articleHeader22">SSR</h2>
<p>与上文中的Server Side Rendering Server相比，其添加了对于状态传递的支持:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//处理所有的请求地址
app.get('/*', function (req, res) {

  //构建出内存中历史记录
  const memoryHistory = createHistory(req.originalUrl);

  //服务端构建出Store
  const store = createStore(memoryHistory);

  //构建出与Store同步的history
  const history = syncHistoryWithStore(memoryHistory, store);

  //匹配客户端路由
  match({history, routes: getRoutes(), location: req.originalUrl}, (error, redirectLocation, renderProps) => {

    if (error) {

      res.status(500).send(error.message)

    } else if (redirectLocation) {

      res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    } else if (renderProps) {

      let html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      //设置全局的navigator值
      // global.navigator = {userAgent: req.headers['user-agent']};

      res.status(200).send(renderHTML(html, {key: &quot;value&quot;}, ['/static/vendors.bundle.js', '/static/redux.bundle.js']));

    } else {
      res.status(404).send('Not found')
    }
  })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code>
<span class="hljs-comment">//处理所有的请求地址</span>
app.get(<span class="hljs-string">'/*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{

  <span class="hljs-comment">//构建出内存中历史记录</span>
  <span class="hljs-keyword">const</span> memoryHistory = createHistory(req.originalUrl);

  <span class="hljs-comment">//服务端构建出Store</span>
  <span class="hljs-keyword">const</span> store = createStore(memoryHistory);

  <span class="hljs-comment">//构建出与Store同步的history</span>
  <span class="hljs-keyword">const</span> history = syncHistoryWithStore(memoryHistory, store);

  <span class="hljs-comment">//匹配客户端路由</span>
  match({history, routes: getRoutes(), location: req.originalUrl}, (error, redirectLocation, renderProps) =&gt; {

    <span class="hljs-keyword">if</span> (error) {

      res.status(<span class="hljs-number">500</span>).send(error.message)

    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (redirectLocation) {

      res.redirect(<span class="hljs-number">302</span>, redirectLocation.pathname + redirectLocation.search)

    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (renderProps) {

      <span class="hljs-keyword">let</span> html = renderToString(
        &lt;Provider store={store}&gt;
          &lt;RouterContext {...renderProps} /&gt;
        &lt;/Provider&gt;
      );

      <span class="hljs-comment">//设置全局的navigator值</span>
      <span class="hljs-comment">// global.navigator = {userAgent: req.headers['user-agent']};</span>

      res.status(<span class="hljs-number">200</span>).send(renderHTML(html, {key: <span class="hljs-string">"value"</span>}, [<span class="hljs-string">'/static/vendors.bundle.js'</span>, <span class="hljs-string">'/static/redux.bundle.js'</span>]));

    } <span class="hljs-keyword">else</span> {
      res.status(<span class="hljs-number">404</span>).send(<span class="hljs-string">'Not found'</span>)
    }
  })
});</code></pre>
<blockquote><p>欢迎大家指导与讨论,同时再次建议,在不能掌握本项目的情况慎重直接用于大型项目中,对自己负责。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在重构脚手架中掌握React/Redux/Webpack2基本套路

## 原文链接
[https://segmentfault.com/a/1190000007166607](https://segmentfault.com/a/1190000007166607)

