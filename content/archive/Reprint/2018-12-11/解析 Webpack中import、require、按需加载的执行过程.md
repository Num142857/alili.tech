---
title: '解析 Webpack中import、require、按需加载的执行过程' 
date: 2018-12-11 2:30:10
hidden: true
slug: 805le58v8gi
categories: [reprint]
---

{{< raw >}}

                    
<p>最近由于一篇<a href="https://www.w3cplus.com/css/taobao-2018-year.html" rel="nofollow noreferrer" target="_blank">分享手淘过年项目中采用到的前端技术</a>的影响,重新研究了一下项目中<code>CSS的架构</code>.本来打算写一篇文章,但是写到一半突然发现自己像在写文档介绍一样,所以后来就放弃了。但是觉得过程中研究的 <code>Webpack</code> 倒是可以单独拿出来讲一讲</p>
<blockquote>在这里非常感谢<a href="https://docschina.org/home/about" rel="nofollow noreferrer" target="_blank">印记中文</a> 团队翻译的 <a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">Webpack 文档</a>.</blockquote>
<h3 id="articleHeader0">搭建一个简单环境</h3>
<ol>
<li>npm init</li>
<li>npm install css-loader html-webpack-plugin style-loader webpack webpack-cli</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack 4.0
const htmlPlugin = require(&quot;html-webpack-plugin&quot;);

module.exports = {
  mode: &quot;development&quot;,
  entry: &quot;./src/index.js&quot;,
  output: {
    filename: &quot;[name].js&quot;,
    path: __dirname + &quot;/dist&quot;
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: &quot;style-loader&quot;
          },
          {
            loader: &quot;css-loader&quot;,
          },
        ]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      title: &quot;Test Webpack&quot;,
      filename: &quot;index.html&quot;
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// Webpack 4.0</span>
<span class="hljs-keyword">const</span> htmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">"development"</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-string">"./src/index.js"</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].js"</span>,
    <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">"/dist"</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: [
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader"</span>
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
          },
        ]
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> htmlPlugin({
      <span class="hljs-attr">title</span>: <span class="hljs-string">"Test Webpack"</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.html"</span>
    })
  ]
};</code></pre>
<p>一个基本的配置就搭建好了,详细的配置内容我就不介绍了, 然后我们在 <code>src/index.js</code> 上面写我们的测试代码, 在 <code>dist/main.js</code> 看一下 <code>webpack</code> 实现的原理,那么目前我们的项目结构是这样子的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- project
    |-- dist
    |-- src
        |-- index.js
    |-- node_modules
    |-- webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-- project</span>
    <span class="hljs-string">|-- dist</span>
    <span class="hljs-string">|-- src</span>
        <span class="hljs-string">|-- index.js</span>
    <span class="hljs-string">|-- node_modules</span>
    <span class="hljs-string">|-- webpack.config.js</span></code></pre>
<h3 id="articleHeader1">webpack 中 require 和 import 的执行过程</h3>
<p>在进入按需加载的讲解之前,我们需要看一个问题 <code>require</code> 和 <code>import</code>在 <code>webpack</code> 的执行过程是怎样的呢 ？现在我们在 <code>src</code>建立两个文件 <code>index.js</code>、<code>module-es6.js</code> 和 <code>module-commonjs.js</code>。我们通过这三个文件解析 <code>require</code> 和 <code>import</code> 的执行过程</p>
<p>首先我们要区分的是 <code>CommonJS</code> 和 <code>ES6</code> 模块导出之间的区别,在 <code>CommonJS</code> 中你导出模块方式是改变 <code>module.exports</code>,但是对于 <code>ES6</code> 来说并不存在 <code>module</code> 这个变量,他的导出方式是通过一个关键词 <code>export</code>来实现的。在我们书写 <code>JS</code>文件的时候,我们发现无论是以 <code>CommomJS</code> 还是 <code>ES6</code> 的形式导出都可以实现,这是因为 <code>Webpack</code>做了一个兼容处理</p>
<p>我们建立一个小 DEMO 来查看一下,我们现在上面建立的三个文件的代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
// import moduleDefault, { moduleValue } from &quot;./module-es6.js&quot;;
// import moduleDefault, { moduleValue1, moduleValue2 } from &quot;./module-commanjs.js&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// index.js</span>
<span class="hljs-comment">// import moduleDefault, { moduleValue } from "./module-es6.js";</span>
<span class="hljs-comment">// import moduleDefault, { moduleValue1, moduleValue2 } from "./module-commanjs.js";</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// module-es6.js
export let moduleValue = &quot;moduleValue&quot; //ES6模块导出
export default &quot;ModuleDefaultValue&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// module-es6.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> moduleValue = <span class="hljs-string">"moduleValue"</span> <span class="hljs-comment">//ES6模块导出</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">"ModuleDefaultValue"</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// module-commonjs.js
exports.moduleValue1 = &quot;moduleValue1&quot;
exports.moduleValue2 = &quot;moduleValue2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// module-commonjs.js</span>
exports.moduleValue1 = <span class="hljs-string">"moduleValue1"</span>
exports.moduleValue2 = <span class="hljs-string">"moduleValue2"</span></code></pre>
<p>现在我们打开 <code>index.js</code> 中加载 <code>module-commonjs.js</code> 的代码,首先会先给当前模块打上 <code>ES6</code>模块的标识符,在 <code>index</code> 则会产生两个变量 <code>A</code> 和 <code>B</code>. <code>A</code> 保存 <code>module-commonjs</code> 的导出的结果,<code>B</code> 则是兼容 <code>CommonJs</code>中没有 <code>ES6</code>通过 <code>export default</code>导出的结果，其值跟 <code>A</code>一样. 用<code>B</code>来兼容 <code>export default</code> 的结果</p>
<p>然后我们重新注释代码,再打开 <code>index.js</code> 中加载 <code>module-es6.js</code> 的代码</p>
<p>这次和上面一样会先给当前模块打上 <code>ES6</code>模块的标识符,然后去加载 <code>module-es6</code>,获取他的导出值。但是浏览器是不识别 <code>export</code> 这个关键词的所以 <code>Webpack</code> 会对的代码进行解释,首先给 <code>module.exports</code> 设定导出的值,如果是 <code>export default</code> 会直接赋值给 <code>module.exports</code>,如果是其他形式,则给<code>module.exports</code>的导出的<code>key</code>设定一个 <code>getter</code>,该 <code>getter</code> 的返回值就是导出的结果</p>
<p>而对于<code>require</code>来说整个执行过程其实过程和<code>import</code>是一样的。</p>
<p>对于 <code>webpack</code> 来说只要你使用了 <code>import</code> 或者 <code>export</code>等关键字, 他就会给 <code>module.exports</code>添加一个<code>__esModule : true</code> 来识别这是一个 <code>ES6</code>的模块,通过这个值来做一些特殊处理</p>
<p>如果觉得我上面讲的不太明白 那可以看看下面这些代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let commonjs = {
  &quot;./src/index.js&quot;: function(module, __webpack_exports__, __webpack_require__) {
    &quot;use strict&quot;;
    //给当前模块打上 `ES6`模块的标识符
    __webpack_require__.r(__webpack_exports__); //给当前模块打上 `ES6`模块的标识符

    // 执行 ./src/module-commonjs.js 的代码 获取导出值
    var A = __webpack_require__(&quot;./src/module-commonjs.js&quot;);

    // 根据 ./src/module-commonjs.js 是否为ES6模块 给返回值增加不同的 getter函数
    var B = __webpack_require__.n(A);
  },
  &quot;./src/module-commonjs.js&quot;: function(module, exports) {
    exports.moduleValue1 = &quot;moduleValue1&quot;;
    exports.moduleValue2 = &quot;moduleValue2&quot;;
  }
};

let es6 = {
  &quot;./src/index.js&quot;: function(module, __webpack_exports__, __webpack_require__) {
    &quot;use strict&quot;;
    //给当前模块打上 `ES6`模块的标识符
    __webpack_require__.r(__webpack_exports__);

    // 执行 ./src/module-commonjs.js 的代码 获取导出值
    var A = __webpack_require__(&quot;./src/module-es6.js&quot;);
  },

  &quot;./src/module-es6.js&quot;: function(module, __webpack_exports__, __webpack_require__) {
    //给当前模块打上 `ES6`模块的标识符
    __webpack_require__.r(__webpack_exports__);

    // 设置 __webpack_exports__.moduleValue 的 getter
    __webpack_require__.d(__webpack_exports__, &quot;moduleValue&quot;, function() {
      return moduleValue;z
    });

    __webpack_exports__[&quot;default&quot;] = &quot;ModuleDefaultValue&quot;;

    let moduleValue = &quot;moduleValue&quot;;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">let</span> commonjs = {
  <span class="hljs-string">"./src/index.js"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-comment">//给当前模块打上 `ES6`模块的标识符</span>
    __webpack_require__.r(__webpack_exports__); <span class="hljs-comment">//给当前模块打上 `ES6`模块的标识符</span>

    <span class="hljs-comment">// 执行 ./src/module-commonjs.js 的代码 获取导出值</span>
    <span class="hljs-keyword">var</span> A = __webpack_require__(<span class="hljs-string">"./src/module-commonjs.js"</span>);

    <span class="hljs-comment">// 根据 ./src/module-commonjs.js 是否为ES6模块 给返回值增加不同的 getter函数</span>
    <span class="hljs-keyword">var</span> B = __webpack_require__.n(A);
  },
  <span class="hljs-string">"./src/module-commonjs.js"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    exports.moduleValue1 = <span class="hljs-string">"moduleValue1"</span>;
    exports.moduleValue2 = <span class="hljs-string">"moduleValue2"</span>;
  }
};

<span class="hljs-keyword">let</span> es6 = {
  <span class="hljs-string">"./src/index.js"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-comment">//给当前模块打上 `ES6`模块的标识符</span>
    __webpack_require__.r(__webpack_exports__);

    <span class="hljs-comment">// 执行 ./src/module-commonjs.js 的代码 获取导出值</span>
    <span class="hljs-keyword">var</span> A = __webpack_require__(<span class="hljs-string">"./src/module-es6.js"</span>);
  },

  <span class="hljs-string">"./src/module-es6.js"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">//给当前模块打上 `ES6`模块的标识符</span>
    __webpack_require__.r(__webpack_exports__);

    <span class="hljs-comment">// 设置 __webpack_exports__.moduleValue 的 getter</span>
    __webpack_require__.d(__webpack_exports__, <span class="hljs-string">"moduleValue"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> moduleValue;z
    });

    __webpack_exports__[<span class="hljs-string">"default"</span>] = <span class="hljs-string">"ModuleDefaultValue"</span>;

    <span class="hljs-keyword">let</span> moduleValue = <span class="hljs-string">"moduleValue"</span>;
  }
};</code></pre>
<h3 id="articleHeader2">按需加载的执行过程</h3>
<p>看完上面的 <code>require</code> 和 <code>import</code>,我们回到 <code>按需加载</code> 这个执行过程. <code>webpack</code> 的按需加载是通过 <code>import()</code> 或者 <code>require.ensure()</code>来实现的,有些读者可能对于 <code>require.ensure</code> 比较熟悉,所以我们先看看 <code>require.ensure</code> 的执行过程,<br>现在我们修改建立一个 <code>module-dynamic.js</code>文件,然后修改 <code>index.js</code>文件</p>
<blockquote>这里吐槽一个问题,require.ensure 第一个参数是一个尴尬的存在,写和不写根本没差,如果你填了的这个参数,webpack 会帮你把文件加载近来,但是不执行。一堆不执行的代码是没有意义的,你想让他执行就必须 require() 一遍,但是执行力 require 也会帮你加载文件。所以根本没差</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
setTimeout(function() {
  require.ensure([], function() {
    let d = require(&quot;./module2&quot;)
  });
}, 1000);

// module2.js
module.exports = {
  name : &quot;Jason&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// index.js</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> d = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./module2"</span>)
  });
}, <span class="hljs-number">1000</span>);

<span class="hljs-comment">// module2.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">name</span> : <span class="hljs-string">"Jason"</span>
}</code></pre>
<p>执行 <code>require.ensure(dependencies,callback,errorCallback,chunkName)</code> 实际上会返回一个 <code>promise</code> , 里面的实现逻辑是 先判断 <code>dependencies</code> 是否已经被加载过,如果加载过则取缓存值的 <code>promise</code>, 如果没有被加载过 则生成一个 <code>promise</code> 并将 <code>promise</code> 里面的 <code>resolve</code>,<code>reject</code> 和 <code>promise</code>本身 存入一个数组,然后缓存起来.接着生成一个 <code>script</code> 标签,填充完信息之后添加到<code>HTML</code>文件上,其中的 <code>script</code> 的 <code>src</code>属性 就是我们按需加载的文件(<code>module2</code>),<code>webpack</code> 会对这个 <code>script</code> 标签监听 <code>error</code> 和 <code>load</code>时间,从而做相应的处理。</p>
<p><code>webpack</code>打包过程中会给 <code>module2</code> 添加一些代码,主要就是主动触发 <code>window["webpackJsonp"].push</code>这个函数,这个函数会传递<br>两个参数 <code>文件ID</code> 和 <code>文件内容对象</code>,其中 <code>文件标示</code>如果没有配置的话,会按载入序号自动增长,<code>文件内容对象</code>实际上就是上文说的 <code>require.ensure</code>第一个参数<code>dependencies</code>的文件内容,或者是 <code>callback</code>,<code>errorCallback</code>里面需要加载的文件,以 <code>key(文件路径) --- value(文件内容)</code>的形式出现.里面执行的事情其实就是执行上面创建的<code>promise</code>的<code>resolve</code>函数,让<code>require.ensure</code>里面的<code>callback</code>执行,之后的执行情况就跟我上面将 <code>requir</code> 和 <code>import</code> 一样了</p>
<p>当然其实讲了那么长的 <code>require.ensure</code>并没有什么用,因为这个函数已经被 <code>import()</code> 取代了,但是考虑到之前的版本应该有很多人都是用 <code>require.ensure</code> 方法去加载的,所以还是讲一下,而且其实 <code>import</code> 的执行过程跟 <code>require.ensure</code> 是一样的,只不过用了更友好的语法而已,所以关于 <code>import</code> 的执行流程我也没啥好讲的了,感兴趣的人看一下两者的 <code>API</code>介绍就好了。</p>
<p>到这里就正式讲完了,如果有大牛路过看到有不对的地方,希望能帮我指出来.非常谢谢!!!</p>
<p>然后再次感谢<a href="https://docschina.org/home/about" rel="nofollow noreferrer" target="_blank">印记中文</a> 团队翻译的 <a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">Webpack 文档</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解析 Webpack中import、require、按需加载的执行过程

## 原文链接
[https://segmentfault.com/a/1190000013630936](https://segmentfault.com/a/1190000013630936)

