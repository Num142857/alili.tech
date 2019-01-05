---
title: '记前端从“刀耕火种”过渡到到“现代化”的自动构建工具(在ThinkPHP的项目里使用webpack)' 
date: 2019-01-06 2:30:10
hidden: true
slug: 81oxoypnbqo
categories: [reprint]
---

{{< raw >}}

                    
<p>我是14年入的程序员大军，当时主<code>java</code>兼具前端开发的活儿，在现在看来的一些流开发框架和新兴思想，早在<code>node.js</code>开始进入大家视野的时候就流行起来了，只是在那时博主并没有关注前端的生态圈（然而java好像也并没有关注，逃），所以还是处在很多人所描述的<code>刀耕火种</code>的阶段，前端代码全部挂载到全局作用域，包括插件导出的变量。那更别提<code>组件化</code>和<code>模块化</code>的编程思想了，甚至代码都不用压缩优化就直接上传到服务器发布了。</p>
<p>后来换了一家公司，没有<strong>前端开发</strong>这个职位，是从javaer转过去的，因为项目需要，渐渐的也就坐实了这个岗位。项目到现在（2014年8月-2017年7月22日）一共出现了三个阶段</p>
<blockquote><ul>
<li>用着十年前的开发（或者叫整合）技术的<strong>简陋期</strong>
</li>
<li>经历4、5个月的半模块化改造的<strong>准现代期</strong>
</li>
<li>到现在能整合全局资源（仅限web静态资源）,随意整合新技术的<strong>现代期</strong>（未实施）</li>
</ul></blockquote>
<p>为什么要不断的去折腾，去改造？仅仅是为了跟上“现代”的步伐吗？下面我将讲述每个阶段是如何无痛改造的，为什么要改造。</p>
<h3 id="articleHeader0">从<code>简陋期</code>到<code>准现代期</code>
</h3>
<p>举个例子，我们以前的代码是这样的</p>
<h4>html页面部分</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>

<link href=&quot;style.css&quot; rel=&quot;stylesheet&quot;/>
</head>
<body>

<!-- 通用的代码 -->
<script src=&quot;common.js&quot;></script>
<!-- 第三方的插件代码 -->
<script src=&quot;plugin.js&quot;></script>
<!-- 我们的主入口 -->
<script src=&quot;individual.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"style.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 通用的代码 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"common.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 第三方的插件代码 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"plugin.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 我们的主入口 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"individual.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>javascript部分</h4>
<p>在<code>common.js</code>里，是我们的定义的通用函数，比如一些特定组件的部分代码如<code>header</code>或<code>footer</code>，或者是字符串处理，日期格式化的函数等等，这些函数都以对象或函数的形式暴露在全局作用域里，<strong>非常的冗杂</strong>和不安全，随着代码量的增加，容易导致覆盖，出现难以预料的bug，还有一个致命的弱点就是无法按需加载资源，我哪怕只是用到了其中一个小小的常量，都需要引用整个文件，然后从全局作用域里拿。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// common.js
var Header = {
  var1: '',
  var2: {},
  fn1: function() {
    // some code
  },
  fn2: function() {
    // some code
  }
}

function strReplace() {
  // some code
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// common.js</span>
<span class="hljs-keyword">var</span> Header = {
  <span class="hljs-attr">var1</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">var2</span>: {},
  <span class="hljs-attr">fn1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// some code</span>
  },
  <span class="hljs-attr">fn2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// some code</span>
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strReplace</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// some code</span>
}
...</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// individual.js
// 也许我们早已有觉悟 使用了自执行匿名函数来防止全局变量的污染
(function() {
  // 这里我们需要用到commonjs的函数 常量等
  var afterHandleStr = strReplace(str);

  // 也许我们忘记strReplace函数已存在全局作用域又或者换了一个人
  // 来维护这个文件可能又会定义一个函数叫strReplace
  function strReplace() {
    // 那么此时根据javascript特性，原先的函数已经被覆盖了，
    // 上面的调用逻辑优先从最近的作用域开始找，于是会执行到这里
  }

  ...
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// individual.js</span>
<span class="hljs-comment">// 也许我们早已有觉悟 使用了自执行匿名函数来防止全局变量的污染</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 这里我们需要用到commonjs的函数 常量等</span>
  <span class="hljs-keyword">var</span> afterHandleStr = strReplace(str);

  <span class="hljs-comment">// 也许我们忘记strReplace函数已存在全局作用域又或者换了一个人</span>
  <span class="hljs-comment">// 来维护这个文件可能又会定义一个函数叫strReplace</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strReplace</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 那么此时根据javascript特性，原先的函数已经被覆盖了，</span>
    <span class="hljs-comment">// 上面的调用逻辑优先从最近的作用域开始找，于是会执行到这里</span>
  }

  ...
}());</code></pre>
<p>因为项目是迭代开发的，功能一点点叠加上去，考虑到整个项目的生命周期，不至于到后期完全无法维护，所以我们必须以优雅的姿态去重构整个项目的资源引用方式，那就是<strong>模块化</strong>，一个模块做一件事情，并暴露它对外提供的接口以供具象化的页面来使用。比如<code>header</code>，<code>footer</code>，<code>nav</code>，<code>sidebar</code>，<code>utils</code>等等。前端的模块化有俩个标准，一个<code>AMD(Asynchronous Module Definition)</code>，一个是<code>CMD(Common Module Definition)</code>，前者是<strong>异步模块定义，推崇依赖前置</strong>，后者是<strong>通用模块定义，推崇依赖就近</strong>，AMD的代表框架有<code>requirejs</code>，CMD的代表框架有<code>seajs</code>，都是很优秀的作品，<a href="https://www.zhihu.com/question/20351507" rel="nofollow noreferrer" target="_blank">这里对二者有详细的介绍</a>。最后我选择了<code>requirejs</code>作为本次重构的基础，其实就当是的代码来说，改造起来并没有什么难度，就是需要细心，细心，细心，只需要将<code>common.js</code>这个通用模块进行拆分就好了，页面只需要引入一个js文件，如下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>

<link href=&quot;style.css&quot; rel=&quot;stylesheet&quot;/>
</head>
<body>
...
<script type=&quot;text/javascript&quot; data-main=&quot;/individual.js&quot; src=&quot;/require.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"style.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">data-main</span>=<span class="hljs-string">"/individual.js"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/require.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>data-main</code>是我们的代码主入口，<code>src</code>是<code>requireJs</code>的源码。从文件引用来说，至少我们不必再关心每次使用一个插件都要手动来加入一个<code>script</code>标签了，如何引用呢？我下面会介绍。<br>假如我们以前的代码是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// common.js
(function(){

  var exportObj = {
    aa: 'aa',
    bb: 'bb'
    ...
  }

  var utils = {
    replaceStr: function() {

    }
    ...
  }

  // 放到全局作用域
  window.exportObj = exportObj;
  window.utils = utils;
}());



// individual。js
(function(){

  var aa = constants.aa;
  var bb = constants.bb;
  
  var tempStr = utils.replaceStr('tempStr');

}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// common.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

  <span class="hljs-keyword">var</span> exportObj = {
    <span class="hljs-attr">aa</span>: <span class="hljs-string">'aa'</span>,
    <span class="hljs-attr">bb</span>: <span class="hljs-string">'bb'</span>
    ...
  }

  <span class="hljs-keyword">var</span> utils = {
    <span class="hljs-attr">replaceStr</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    }
    ...
  }

  <span class="hljs-comment">// 放到全局作用域</span>
  <span class="hljs-built_in">window</span>.exportObj = exportObj;
  <span class="hljs-built_in">window</span>.utils = utils;
}());



<span class="hljs-comment">// individual。js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

  <span class="hljs-keyword">var</span> aa = constants.aa;
  <span class="hljs-keyword">var</span> bb = constants.bb;
  
  <span class="hljs-keyword">var</span> tempStr = utils.replaceStr(<span class="hljs-string">'tempStr'</span>);

}());</code></pre>
<p>上面的代码使用了两个全局对象，<code>constants</code>和<code>utils</code>，那么改造后应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// constants.js
// 如果它不依赖于其他模块，就不必声明依赖的数组
define( function() {
  var exportObj = {
    aa: 'aa',
    bb: 'bb'
    ...
  }

  // 返回我们要暴露出来的对象，不用再放到全局作用域
  return exportObj;
} );

// utils.js
define( function() {

  // 返回我们要暴露出来的对象，不用再放到全局作用域
  return  {
    replaceStr: function() {

    }
    ...
  };
} );

// individual
define( [
  'constants',
  'utils'
], function( consts, utils ) {
  var aa = consts.aa;
  var bb = consts.bb;
  
  var tempStr = utils.replaceStr('tempStr');
} );
// 或者
define( [
  'constants',
  'utils'
], function() {
  var consts = require('constants');
  var utils = require('utils');

  var aa = consts.aa;
  var bb = consts.bb;
  
  var tempStr = utils.replaceStr('tempStr');
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// constants.js</span>
<span class="hljs-comment">// 如果它不依赖于其他模块，就不必声明依赖的数组</span>
define( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> exportObj = {
    <span class="hljs-attr">aa</span>: <span class="hljs-string">'aa'</span>,
    <span class="hljs-attr">bb</span>: <span class="hljs-string">'bb'</span>
    ...
  }

  <span class="hljs-comment">// 返回我们要暴露出来的对象，不用再放到全局作用域</span>
  <span class="hljs-keyword">return</span> exportObj;
} );

<span class="hljs-comment">// utils.js</span>
define( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-comment">// 返回我们要暴露出来的对象，不用再放到全局作用域</span>
  <span class="hljs-keyword">return</span>  {
    <span class="hljs-attr">replaceStr</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    }
    ...
  };
} );

<span class="hljs-comment">// individual</span>
define( [
  <span class="hljs-string">'constants'</span>,
  <span class="hljs-string">'utils'</span>
], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> consts, utils </span>) </span>{
  <span class="hljs-keyword">var</span> aa = consts.aa;
  <span class="hljs-keyword">var</span> bb = consts.bb;
  
  <span class="hljs-keyword">var</span> tempStr = utils.replaceStr(<span class="hljs-string">'tempStr'</span>);
} );
<span class="hljs-comment">// 或者</span>
define( [
  <span class="hljs-string">'constants'</span>,
  <span class="hljs-string">'utils'</span>
], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> consts = <span class="hljs-built_in">require</span>(<span class="hljs-string">'constants'</span>);
  <span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'utils'</span>);

  <span class="hljs-keyword">var</span> aa = consts.aa;
  <span class="hljs-keyword">var</span> bb = consts.bb;
  
  <span class="hljs-keyword">var</span> tempStr = utils.replaceStr(<span class="hljs-string">'tempStr'</span>);
} );</code></pre>
<p>是不是感觉毫无挑战性，对，这就是一个体力活，细心点就好了</p>
<blockquote><p>我们不必担心还需要手动去改动第三方插件，现在的主流插件基本都会<code>UMD</code>方式去适配，也就是兼容了<code>AMD</code>，<code>CMD</code>，所以只需要直接引用第三方插件就行了，不必再去html文件里手动引用script标签了，其他具体实现细节和必备的配置可以参照<a href="http://requirejs.org/" rel="nofollow noreferrer" target="_blank">requirejs官网</a>的例子</p></blockquote>
<p>等到改造完，也还没有愉快的结束，我们的<strong>准现代期</strong>增加了一个优化环节，官方提供了<code>r.js</code>这个优化器来帮我们打包压缩代码（毕竟生产环境过多的请求数还是不被允许的），此时的改造才真的做到了<strong>模块化</strong>，<strong>能优化</strong>，从<strong>简陋期</strong>无痛过渡到<strong>准现代期</strong>。此时的代码，其实已经具备了进入<strong>现代期</strong>的要求，那就是<strong>规范模块化</strong>。下面是我们即将进行的改造，顺利过渡到<strong>现代期</strong>，从而拥抱你想使用的新技术</p>
<h3 id="articleHeader1">从<code>准现代期</code>到<code>现代期</code>
</h3>
<p>其实这个阶段，因为对一些新工具新技术的不熟悉，绕了很多弯子，花费了不少的精力，好在弄出来了，基于<code>webpack</code>构建工具，解放键盘<code>F5</code>，加入代码风格和规范的检查工具，加入<code>ECMAScript 6</code>语法转换工具等等，为什么要使用这些，概括为主要以下几点：</p>
<ul>
<li>提升开发效率和代码质量</li>
<li>新语法新和技术能解决开发上的很多痛点和盲点</li>
<li>强大的整合性和包容性（相对于封闭的<code>r.js</code>优化器终于可定制了）</li>
<li>emmmmmm思考中</li>
</ul>
<p>首先我们介绍一下<code>webapck</code>是什么<br><img alt="webpack" title="webpack" src="https://static.alili.techundefined" style="cursor: pointer;"><br>这是<code>webpack</code>官方文档首页对其的简单描述（ps: 其实中间的正方体是会旋转的哦），强大的<code>webpack</code>能整合所有依赖的文件进行处理，如<code>less</code>编译（依赖<code>less-loader</code>），<code>ES6</code>语法转换（依赖<code>babel-loader</code>），文件<code>hash</code>添加，自动上传ftp发布生产环境等等。还有就是<code>webpack-dev-server</code>这个开发神器，<strong>热替换</strong>、<strong>自动监测文件变化刷新浏览器</strong>，虽然<code>现代期</code>并没有用到实际项目中去，但是到现在（2017年7月22日）,我已经能完全拿出一套方案，使现有项目平滑过度到<code>webpack</code>。（ps：网上的教程大多是基于单页单入口的SPA应用，和后端完全解耦的，我们的项目是和后端处于半解耦状态，并且是多页多入口，所以并不能使用大多数的webpack配置文件，需要进行变通处理）</p>
<p>我们先来说说处理一般的<code>SPA</code>应用的配置参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    // webpack生成的文件名和入口文件
    // 我们是多页入口，先以首页为例
    index: './Public/dev/page/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
  },
  module: {
    rules: [  {
      // 各种loaders
    } ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      // 模板生成后的文件名（可以加上路径）
      filename: 'index.html',
      // 入口文件的模板（也就是承载你页面视图的地方）
      template: 'index.html',
      inject: true
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">// webpack生成的文件名和入口文件</span>
    <span class="hljs-comment">// 我们是多页入口，先以首页为例</span>
    index: <span class="hljs-string">'./Public/dev/page/main.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [  {
      <span class="hljs-comment">// 各种loaders</span>
    } ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin( {
      <span class="hljs-comment">// 模板生成后的文件名（可以加上路径）</span>
      filename: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-comment">// 入口文件的模板（也就是承载你页面视图的地方）</span>
      template: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
    })
  ]
}</code></pre>
<p>抛开其他杂七杂八配置不谈，上面的配置就是大多数的<code>SPA</code>应用的配置。用在我们的项目里，在根目录运行<code>webpack</code>会发现发生错误，并提示缺少很多的模块，因为这些我们自定义的模块<code>webpack</code>本身并不能识别，所以这里有至关重要的一步，将现有的<code>requirejs</code>的配置文件里的<code>paths</code>同步迁移到<code>webpack</code>的配置文件里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在requirejs配置文件里可能是这样写的
require.config( {

  paths: {
    header: './modules/header',
  }

} );

// 那么我们就应该将此配置交给webpack
resolve: {
  alias: {
    header: 'modules/header' // 路径可能不一定是这个
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在requirejs配置文件里可能是这样写的</span>
<span class="hljs-built_in">require</span>.config( {

  <span class="hljs-attr">paths</span>: {
    <span class="hljs-attr">header</span>: <span class="hljs-string">'./modules/header'</span>,
  }

} );

<span class="hljs-comment">// 那么我们就应该将此配置交给webpack</span>
resolve: {
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-attr">header</span>: <span class="hljs-string">'modules/header'</span> <span class="hljs-comment">// 路径可能不一定是这个</span>
  }
}</code></pre>
<p>然后我们再打包，运行，发现丫的居然会报错了？最明显的错误就是<code>define is not defined</code>。让我们来翻翻上面我们<strong>准现代期</strong>的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// individual
define( [
  'constants',
  'utils'
], function( consts, utils ) {
  var aa = consts.aa;
  var bb = consts.bb;
  
  var tempStr = utils.replaceStr('tempStr');
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// individual</span>
define( [
  <span class="hljs-string">'constants'</span>,
  <span class="hljs-string">'utils'</span>
], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> consts, utils </span>) </span>{
  <span class="hljs-keyword">var</span> aa = consts.aa;
  <span class="hljs-keyword">var</span> bb = consts.bb;
  
  <span class="hljs-keyword">var</span> tempStr = utils.replaceStr(<span class="hljs-string">'tempStr'</span>);
} );</code></pre>
<p>这里的<code>define</code>就是报错的原因（<code>webpack</code>有时候并不能识别这里，有时候却又能正确转换成能运行的代码，没有深究这里的原因，虽然<code>webpack2</code>已经支持AMD风格的代码打包，但是我还是决定对这里稍作修改，变成CMD风格，即使是使用<code>CMD</code>风格的<code>seajs</code>依然是需要去掉外面那层包裹的函数的，不管怎样都得改）,于是我们只需要将上面的代码调整为：</p>
<hr>
<p>2017年7月24日22点50分更新，经过我的尝试，只要配置依赖都正确，完全可以直接打包，不用非得改成CMD，于是换成<code>webpack</code>更轻松了~~?</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var consts = require('constants');
var utils = require('utils');

var aa = consts.aa;
var bb = consts.bb;
var tempStr = utils.replaceStr('tempStr');

// 如果这里有return的话需要将return obj调整为
module.exports = obj;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> consts = <span class="hljs-built_in">require</span>(<span class="hljs-string">'constants'</span>);
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'utils'</span>);

<span class="hljs-keyword">var</span> aa = consts.aa;
<span class="hljs-keyword">var</span> bb = consts.bb;
<span class="hljs-keyword">var</span> tempStr = utils.replaceStr(<span class="hljs-string">'tempStr'</span>);

<span class="hljs-comment">// 如果这里有return的话需要将return obj调整为</span>
<span class="hljs-built_in">module</span>.exports = obj;</code></pre>
<p>至此我们再打包便可以轻轻松松合并了（当然如果你要提取公共代码的话又是另外一个插件了，这里不再赘述）</p>
<p>打包发布的问题解决了，最重要的一环<strong>开发环境的搭建</strong>呢？</p>
<p>其实机智的我早料到这种配置在我们的项目并不完美，因为<code>HtmlWebpackPlugin</code>这个插件需要的模板是放在硬盘里的静态文件模板，它会自动插入构建好的<code>js</code>和<code>css</code>文件，我们的模板不是静态的，是从php后端渲染的一段动态的html，还是作死试了试，果然出现了以下情况</p>
<ul>
<li>动态引用的<code>header、footer</code>不见了</li>
<li>页面出现一堆后端模板的语法<code>{$xxx}{$yyy}{$zzz}</code>
</li>
</ul>
<p>其实<code>webpack-dev-server</code>提供了一个代理功能，那这里的问题解决起来就美滋滋了。单纯的我最先的配置是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require( 'express' )
var proxyMiddleware = require( 'http-proxy-middleware' )
var app = express();
// 这是代理的
var proxyTable = {
  '/': {
    target: 'http://xxxx.cn/'
  }
}
Object.keys( proxyTable ).forEach( function( context ) {
  var options = proxyTable[ context ]
  if ( typeof options === 'string' ) {
    options = {
      target: options
    }
  }
  // 应用代理地址和代理目标
  app.use( proxyMiddleware( options.filter || context, options ) )
} )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>( <span class="hljs-string">'express'</span> )
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>( <span class="hljs-string">'http-proxy-middleware'</span> )
<span class="hljs-keyword">var</span> app = express();
<span class="hljs-comment">// 这是代理的</span>
<span class="hljs-keyword">var</span> proxyTable = {
  <span class="hljs-string">'/'</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://xxxx.cn/'</span>
  }
}
<span class="hljs-built_in">Object</span>.keys( proxyTable ).forEach( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> context </span>) </span>{
  <span class="hljs-keyword">var</span> options = proxyTable[ context ]
  <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'string'</span> ) {
    options = {
      <span class="hljs-attr">target</span>: options
    }
  }
  <span class="hljs-comment">// 应用代理地址和代理目标</span>
  app.use( proxyMiddleware( options.filter || context, options ) )
} )</code></pre>
<p>以上代码将我们所有的请求路径一股脑全部代理给后端<code>php</code>服务了，<code>HtmlWebpackPlugin</code>这个插件会自动写入依赖的脚本文件和样式表文件，但是此时的文件是<code>webpack-dev-server</code>服务生成的，并且存在于内存里，所以此时我们再运行<code>webpack</code>开启的服务，就会造成页面出来了(包括任何动态从服务端渲染的数据)，但是样式和<code>js</code>都没有加载，因为请求被代理到了后端，后端的目录里并不存在这些文件（废话么），所以我们需要过滤掉这些特定的请求不让<code>http-proxy-middleware</code>插件进行代理，为了区分这些特定的请求，我们将<code>entry</code>字段里的文件名都加上一个前缀<code>__webpack</code>或任何独一无二的与后台请求开头不一样的字符串，此时<code>proxyTable</code>里的<code>filter</code>函数就派上用场了，查看官方文档是这么描述这个函数的</p>
<blockquote>
<p>For full control you can provide a custom function to determine which requests should be proxied or not.</p>
<p>为了完全控制你的请求，你可以定义一个函数来确定这些请求是否应该被提交</p>
</blockquote>
<p>于是我终于拿出一个满意的代理配置文件，开心得我仿佛升职加薪了一样?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proxyTable = {
  '/': {
    target: 'http://xxx.cn/',
    changeOrigin: true,
    filter( pathname, req ) {
      return !new RegExp( `^\/(__webpack|${assetsSubDirectory})` ).test( pathname );
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> proxyTable = {
  <span class="hljs-string">'/'</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://xxx.cn/'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
    filter( pathname, req ) {
      <span class="hljs-keyword">return</span> !<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">`^\/(__webpack|<span class="hljs-subst">${assetsSubDirectory}</span>)`</span> ).test( pathname );
    }
  }
}</code></pre>
<p>让我来解释一下上面的代码：未匹配到以<code>__webpack</code>开头的请求，都进行代理，这里添加了一个<code>assetsSubDirectory</code>变量，这个变量其实是webpack生成的<strong>图片、字体文件、json文件、svg</strong>等仍然存在于内存里的引用的路径，因为在内存里随着我们的编码可能实时变动，所以它们还是不需要做代理，直接过滤掉。</p>
<p>对了，遗漏了一个很重要的配置，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new HtmlWebpackPlugin( {
    alwaysWriteToDisk: true,
    // php端使用到的模板
    filename: `${ROOT}/Application/Home/View/Index/index.html`,
    // 模板文件
    template: `${ROOT}/Application/Home/View-template/Index/index.html`,
    chunks: [ '__webpack-indexController' ],
    inject: true
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin( {
    <span class="hljs-attr">alwaysWriteToDisk</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// php端使用到的模板</span>
    filename: <span class="hljs-string">`<span class="hljs-subst">${ROOT}</span>/Application/Home/View/Index/index.html`</span>,
    <span class="hljs-comment">// 模板文件</span>
    template: <span class="hljs-string">`<span class="hljs-subst">${ROOT}</span>/Application/Home/View-template/Index/index.html`</span>,
    <span class="hljs-attr">chunks</span>: [ <span class="hljs-string">'__webpack-indexController'</span> ],
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
  })
]</code></pre>
<p>机智的我们肯定能发现<code>View-template</code>这里的不同，见名知意，这个文件夹里的html都是对应的后端的模板视图文件，我们通过<code>alwaysWriteToDisk</code>这个参数（其实还需要配合另外一个插件）以<code>template</code>字段的值为目标，实时写入到<code>filename</code>对应的文件里，而此时，因为浏览器访问的页面里因为我们启动<code>webpack-dev-server</code>时已经编译了这个文件，js会主动和webpack服务建立一个<code>eventSource</code>长连接（这个连接也是排除在代理范围内的）来监听文件变化，所以就会自动刷新浏览器，从而实现我们的<code>live-reload</code>。</p>
<p>至此，从<code>准现代期</code>到<code>现代期</code>的过渡方案就算是完成了，接下面便是寻找一个合适的时间点实施到项目中去。若你要问我那么多页面是不是全都一个个得配，当然是，但是为了方便易维护，能不侵入现有项目去修改文件名，我们肯定需要去手动编写一个<code>map</code>映射文件，来指明我们的模板文件对应的入口文件，通过这个map我们再来动态生成<code>entry</code>和<code>HtmlWebpackPlugin</code>需要的模板路径，当然这里并不是没有便捷的办法，我们可以写一个脚本去读取<code>View-template</code>下面的目录来自动生成map但是因为我们童鞋在命名的时候文件夹和对应的入口文件并不能对应上，就得修改，这并不是推荐的做法，而且也不方便我们在改造代码风格的时候进行单个调试。</p>
<p>上面的示例代码都不是完整的，因为我并不是要提供一个<code>webpack</code>的教程，而是解决后端和前端html耦合的<code>webpack-dev-server</code>配置的问题。</p>
<hr>
<p>以上内容都转自我自己的博客<a href="http://ryuurock.me/2017/07/22/new-front-end/" rel="nofollow noreferrer" target="_blank">原文地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记前端从“刀耕火种”过渡到到“现代化”的自动构建工具(在ThinkPHP的项目里使用webpack)

## 原文链接
[https://segmentfault.com/a/1190000010419398](https://segmentfault.com/a/1190000010419398)

