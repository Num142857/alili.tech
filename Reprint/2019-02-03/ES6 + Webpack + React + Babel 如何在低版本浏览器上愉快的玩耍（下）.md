---
title: 'ES6 + Webpack + React + Babel 如何在低版本浏览器上愉快的玩耍（下）' 
date: 2019-02-03 2:30:40
hidden: true
slug: qsw902j95k
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">回顾</h2>
<p>起因：</p>
<blockquote><p>某天，某测试说：“这个页面在 IE8 下白屏，9也白。。”<br>某前端开发: 吭哧吭哧。。。一上午的时间就过去了，搞定了。<br>第二天，某测试说：“IE 又白了。。”<br>某前端开发: 嘿咻嘿咻。。。谁用的 <code>Object.assign</code>，出来我保证削不屎你。</p></blockquote>
<p>在<a href="https://segmentfault.com/a/1190000006929961">上篇</a>，我们主要抛出了两个问题，并给出了第一个问题的解决方案。</p>
<ol>
<li><p><code>SCRIPT5007: 无法获取属性 xxx 的值，对象为 null 或未定义</code>，这种情况一般是组件继承后，无法继承到在构造函数里定义的属性或方法，同样类属性或方法也同样无法继承</p></li>
<li><p><code>SCRIPT438: 对象不支持 xxx 属性或方法</code>，这种情况一般是使用了 es6、es7 的高级语法，<code>Object.assign</code> <code>Object.values</code> 等，这种情况在移动端的一些 ‘神机’ 也一样会挂。</p></li>
</ol>
<p>本篇将给出第二个问题的解决方案, 并对第一个问题的解决方案有了更新的进展。</p>
<p>文章略长，请耐心看~嘿嘿嘿~</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006930016?w=435&amp;h=309" src="https://static.alili.tech/img/remote/1460000006930016?w=435&amp;h=309" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">正文开始</h2>
<p>想要不支持该方法的浏览器支持，无非两种办法</p>
<ol>
<li><p>局部引用，引入一个相同的方法代替，其缺点则是使用起来比较麻烦，每个用到的文件都要去引入。</p></li>
<li><p>全局实现，与之相反的方法是使用 polyfill ，其优点便是使用方便，缺点则是会全局污染，特别是实例方法，涉及到修改其 prototype ，不是你的类，你去修改它原型是不推荐的。</p></li>
</ol>
<p>针对这两种办法，提供出以下几种方案，供大家参考</p>
<h3 id="articleHeader2">方案一：引入额外的库</h3>
<p>拿最常用的 assign 来说，可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import assign from 'object-assign';
assign({}, {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> assign <span class="hljs-keyword">from</span> <span class="hljs-string">'object-assign'</span>;
assign({}, {});</code></pre>
<p>其实这种也是我们之前的使用方式，缺点就是需要去找到对应的库，比如 Promise 我们可以使用 <a href="https://github.com/calvinmetcalf/lie" rel="nofollow noreferrer" target="_blank">lie</a> </p>
<p>另一方面一旦有人没有按照这个规则，而直接使用了 <code>Object.assign</code>，那这个人就可能被削。</p>
<h3 id="articleHeader3">方案二：全局引入 babel-polyfill</h3>
<p>在项目的程序入口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>;</code></pre>
<p>babel 提供了这个 polyfill，有了它，你就可以尽情使用高级方法，包括 <code>Object.values</code> <code>[].includes</code> <code>Set</code> <code>generator</code> <code>Promise</code> 等等。其底层依赖的是 <a href="https://github.com/zloirock/core-js" rel="nofollow noreferrer" target="_blank">core-js</a> 。</p>
<p>但是这种方案显然有些暴力， polyfill 构建并 uglify 后的大小为 98k，gzip 后为32.6k，32k 对与移动端还是有点大的。</p>
<p>性能与使用是否方便自己权衡，比如离线包后或也可以接受。</p>
<h3 id="articleHeader4">方案三：手动引入 <a href="https://github.com/zloirock/core-js" rel="nofollow noreferrer" target="_blank">core-js</a>
</h3>
<p>这个方案也稍微有些麻烦， core-js 里实现了大部分 e6、es7 的高级语法，具体列表可以去这里查看 <a href="https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js" rel="nofollow noreferrer" target="_blank">https://github.com/babel/babe...</a></p>
<p>我先截取一部分做下参考</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Object: {
      assign: &quot;object/assign&quot;,
      create: &quot;object/create&quot;,
      defineProperties: &quot;object/define-properties&quot;,
      defineProperty: &quot;object/define-property&quot;,
      entries: &quot;object/entries&quot;,
      freeze: &quot;object/freeze&quot;,
      ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-built_in">Object</span>: {
      <span class="hljs-attr">assign</span>: <span class="hljs-string">"object/assign"</span>,
      <span class="hljs-attr">create</span>: <span class="hljs-string">"object/create"</span>,
      <span class="hljs-attr">defineProperties</span>: <span class="hljs-string">"object/define-properties"</span>,
      <span class="hljs-attr">defineProperty</span>: <span class="hljs-string">"object/define-property"</span>,
      <span class="hljs-attr">entries</span>: <span class="hljs-string">"object/entries"</span>,
      <span class="hljs-attr">freeze</span>: <span class="hljs-string">"object/freeze"</span>,
      ...
  }</code></pre>
<p>具体怎么使用呢？找到要使用的方法的值，如：assign 是 "object/assign"，将其拼接至一个固定路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import assign from 'core-js/library/fn/object/assign'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> assign <span class="hljs-keyword">from</span> <span class="hljs-string">'core-js/library/fn/object/assign'</span></code></pre>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'core-js/fn/object/assign'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'core-js/fn/object/assign'</span></code></pre>
<p>这里包含上述所说的局部使用和全局实现的两种</p>
<p>直接引入 'core-js/fn/' 下的即为全局实现，你可以在程序入口引入你想使用的，这样相对于方案二避免了多余的库的引入</p>
<p>引入 'core-js/library/fn/' 下的即为局部使用，和方案一一样，只是省去了自己去寻找类库。</p>
<p>但是，实际使用，import 要写辣么长的路径，还是感觉有些麻烦。</p>
<h3 id="articleHeader5">方案四：使用 <a href="https://babeljs.io/docs/plugins/transform-runtime/" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-runtime</a>
</h3>
<p>本文会重点介绍下这个插件</p>
<p>先看下如何使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// without options
{
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}

// with options
{
  &quot;plugins&quot;: [
    [&quot;transform-runtime&quot;, {
     &quot;helpers&quot;: false, // defaults to true; v6.12.0 (2016-07-27) 新增;
      &quot;polyfill&quot;: true, // defaults to true
      &quot;regenerator&quot;: true, // defaults to true
      // v6.15.0 (2016-08-31) 新增
      // defaults to &quot;babel-runtime&quot;
      // 可以这样配置
      // moduleName: path.dirname(require.resolve('babel-runtime/package'))
      &quot;moduleName&quot;: &quot;babel-runtime&quot;
    }]
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// without options</span>
{
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}

<span class="hljs-comment">// with options</span>
{
  <span class="hljs-string">"plugins"</span>: [
    [<span class="hljs-string">"transform-runtime"</span>, {
     <span class="hljs-string">"helpers"</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// defaults to true; v6.12.0 (2016-07-27) 新增;</span>
      <span class="hljs-string">"polyfill"</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// defaults to true</span>
      <span class="hljs-string">"regenerator"</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// defaults to true</span>
      <span class="hljs-comment">// v6.15.0 (2016-08-31) 新增</span>
      <span class="hljs-comment">// defaults to "babel-runtime"</span>
      <span class="hljs-comment">// 可以这样配置</span>
      <span class="hljs-comment">// moduleName: path.dirname(require.resolve('babel-runtime/package'))</span>
      <span class="hljs-string">"moduleName"</span>: <span class="hljs-string">"babel-runtime"</span>
    }]
  ]
}
</code></pre>
<p>该插件会做三件事情</p>
<blockquote>
<p>The runtime transformer plugin does three things:</p>
<ul>
<li><p>Automatically requires babel-runtime/regenerator when you use generators/async functions.</p></li>
<li><p>Automatically requires babel-runtime/core-js and maps ES6 static methods (Object.assign) and built-ins (Promise).</p></li>
<li><p>Removes the inline babel helpers and uses the module babel-runtime/helpers instead.</p></li>
</ul>
</blockquote>
<ul>
<li>
<p>第一件，如果你想使用 generator ， 有两个办法，一个就是引入 bable-polyfill 这个大家伙儿，另一个就是使用这个插件，否则你会看到这个错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught ReferenceError: regeneratorRuntime is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">Uncaught ReferenceError: regeneratorRuntime <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined</code></pre>
</li>
<li><p>第二件，就是能帮助我们解决一些高级语法的问题，它会在构建时帮你自动引入，用到什么引什么。</p></li>
</ul>
<p>但是它的缺陷是它只能帮我们引入静态方法和一些内建模块，如 <code>Object.assign</code> <code>Promise</code> 等。实例方法是不会做转换的，如 <code>"foobar".includes("foo")</code> ,官方提示在这里:</p>
<blockquote><p>NOTE: Instance methods such as "foobar".includes("foo") will not work since that would require modification of existing builtins (Use babel-polyfill for that).</p></blockquote>
<p>翻译一下就是，不要越俎代庖，不是你的东西你别乱碰，欠儿欠儿的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006930017?w=569&amp;h=553" src="https://static.alili.tech/img/remote/1460000006930017?w=569&amp;h=553" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>所以这个方案不会像方案二那样随心所欲的使用，但其实也基本够用了。</p>
<p>没有的实例方法可以采用方案三委屈下。</p>
<p>个人还是比较推荐这两种合体的方案。</p>
<p>需要注意的一点是：</p>
<p>开启 polyfill 后，会与 <code>export * from 'xx'</code> 有冲突</p>
<p>请看构建后的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    // 这是什么鬼。
    import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
    import _Object$keys from 'babel-runtime/core-js/object/keys';
    Object.defineProperty(exports, &quot;__esModule&quot;, {
      value: true
    });
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 106 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">
    'use strict'</span>;
    <span class="hljs-comment">// 这是什么鬼。</span>
    <span class="hljs-keyword">import</span> _Object$defineProperty <span class="hljs-keyword">from</span> <span class="hljs-string">'babel-runtime/core-js/object/define-property'</span>;
    <span class="hljs-keyword">import</span> _Object$keys <span class="hljs-keyword">from</span> <span class="hljs-string">'babel-runtime/core-js/object/keys'</span>;
    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">"__esModule"</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
    });
    ...</code></pre>
<p>截止 2016-09-10，官方尚未解决此 <a href="https://github.com/babel/babel-loader/issues/195" rel="nofollow noreferrer" target="_blank">issue</a>, 只有先避开 <code>export * from 'xx'</code> 这种写法。或在<a href="https://webcache.googleusercontent.com/search?q=cache:zy5NcASoKlEJ:https://phabricator.babeljs.io/T2877+&amp;cd=1&amp;hl=zh-CN&amp;ct=clnk&amp;gl=cn" rel="nofollow noreferrer" target="_blank">这里</a>找答案。</p>
<ul><li><p>第三件，是会引入一些 helper 来代替每次都生成的通用函数，看个例子就明白了</p></li></ul>
<p>原来构建好的代码每个模块都有类似这种代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _classCallCheck(instance, Constructor)...

function _possibleConstructorReturn(self, call)...

function _inherits(subClass, superClass)...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>)...

<span class="hljs-title">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>)...

<span class="hljs-title">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>)...
</span></code></pre>
<p>开启 helper 后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _inherits2 = require('babel-runtime/helpers/inherits');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _classCallCheck2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/helpers/classCallCheck'</span>);

<span class="hljs-keyword">var</span> _possibleConstructorReturn2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/helpers/possibleConstructorReturn'</span>);

<span class="hljs-keyword">var</span> _inherits2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/helpers/inherits'</span>);</code></pre>
<p>这样统一引用了 helper，去处了冗余，看起来也更优雅了。</p>
<p>在 v6.12.0 之前 helper 也是默认开启的，没有配置可改，其他的 ployfill regenerator 都是有配置可以设置的。也许是推荐你使用 helper 。</p>
<p>但是 v6.12.0 (2016-07-27) 增加了 helper 的配置。为什么呢？</p>
<p>我最开始用这个插件的时候也很诧异，按道理来说，去除了冗余代码，代码的体积应该变小才对，但实际测试却变大了，我测试时是未经 uglify 的代码从 18k 增加到了 78k，查看构建模块增加了将近 100 个 <a href="http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/vision/render-engine/8e6be96d5fbf2a99ea549fd071a607ec/image.png" rel="nofollow noreferrer" target="_blank">详情</a>。</p>
<p>原因是从 babel-runtime 里引入的 helper 依赖很多，全部都是兼容最底层的。比如 <code>Object.create</code> <code>typeof</code> 这种方法全部被重写了。</p>
<p>后来 gaearon 大神都忍不了了，他测试的结果是增加了 5kB min+gzip <a href="https://github.com/facebookincubator/create-react-app/pull/238" rel="nofollow noreferrer" target="_blank">详情</a>。</p>
<p>于是有了 helper 这个配置项。</p>
<p>另外还有一点，如果开启了 helper 的话，你会发现之前引用的 <a href="https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-proto-to-assign" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-proto-to-assign</a> 就失效了,虽然他本来就不该被使用，后面会讲到。</p>
<p>所以目前看来这个 helper 不用也罢。</p>
<p>再说下 moduleName 这个参数是干什么的？</p>
<p>还记得开启 helper 后的代码吗</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> _classCallCheck2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/helpers/classCallCheck'</span>);</code></pre>
<p>看下这个路径，如果是本地项目安装了 babel-runtime 是没问题的，但如果你是用的通用构建工具，比如 <a href="https://github.com/nowa-webpack/nowa" rel="nofollow noreferrer" target="_blank">nowa</a>，所有的构建依赖库都是在公共的地方，毕竟 babel 太太了。这里就会报错了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cannot resolve module babel-runtime/regenerator" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">Cannot resolve <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">babel</span>-<span class="hljs-title">runtime</span>/<span class="hljs-title">regenerator</span></span></code></pre>
<p>gaearon 大神在写  <a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a> 时也发现了这个问题， <a href="https://github.com/facebookincubator/create-react-app/issues/255" rel="nofollow noreferrer" target="_blank">详情</a></p>
<p>虽然这个问题可以通过 webpack 的 resolve.root 来解决，但是 gaearon 大神看其不爽，觉得依赖 webpack 不够优雅，<a href="https://github.com/babel/babel/pull/3612" rel="nofollow noreferrer" target="_blank">#3612</a> 于是乎就有了 moduleName 这个参数，已发布 v6.15.0 (2016-08-31)。</p>
<h2 id="articleHeader6">放弃 loose 模式， 放弃 ie8</h2>
<p>上篇中提到了开启了 loose 模式来解决低版本浏览器无法继承到在构造函数里定义的属性或方法。</p>
<p>我们是通过 <code>babel-preset-es2015-ie</code> 这个插件，主要是改写了 <code>babel-plugin-transform-es2015-classes: {loose: true}</code> 和添加了插件 <code>babel-plugin-transform-proto-to-assign</code>（解决类方法继承的问题）</p>
<p>在 <code>babel-preset-es2015</code> v6.13.0 (2016-08-04) 时，presets 已经支持了参数配置，可以直接开启 loose 模式。</p>
<p>它内部会把开启一些插件的 loose 模式，不只是<code>babel-plugin-transform-es2015-classes</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  presets: [
    [&quot;es2015&quot;, { &quot;loose&quot;: true }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">presets</span>: [
    [<span class="hljs-string">"es2015"</span>, { <span class="hljs-string">"loose"</span>: <span class="hljs-literal">true</span> }]
  ]
}</code></pre>
<p>这样我们就可以直接使用 <code>babel-preset-es2015</code>，至于 <code>babel-plugin-transform-proto-to-assign</code> 可以单独配置，也可不使用，因为类方法本来就不该被继承，要使用就直接 <code>Parent.defaultProps</code> 就可以了。</p>
<p>在上文中并没有提到开启 loose 模式的另一个原因是解决 ie8 下的两个 es3 属性名关键字的问题，因为上文测试均在 ie9 上，所以上述的方案也是停留在必须支持 ie8。</p>
<p>那么如果我们放弃了 ie8 ,看一看是不是会海阔天空。</p>
<p>在 <code>babel-plugin-transform-es2015-classes</code> v6.14.0 (2016-08-23) 一个 ‘大胡子哥’（原谅我不认识他） 修复了 <code>__proto__ </code>这个问题 <a href="https://github.com/babel/babel/pull/3527" rel="nofollow noreferrer" target="_blank">#3527 Fix class inheritance in IE &lt;=10 without loose mode.</a> <br>这样我们就可以在 ie9+ 上使用正常的 es6 模式了。</p>
<p>毕竟我们该向前看，loose 模式有点后退的赶脚。</p>
<p><a href="http://www.2ality.com/2015/12/babel6-loose-mode.html?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">这篇文章</a>也表达了不推荐使用 loose 模式</p>
<blockquote><p>Con: You risk getting problems later on, when you switch from transpiled ES6 to native ES6. That is rarely a risk worth taking.</p></blockquote>
<p>当然，如果真的离不开 ie8，就针对 es3 关键字的问题引用两个插件即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('babel-plugin-transform-es3-member-expression-literals'),
require('babel-plugin-transform-es3-property-literals')," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-plugin-transform-es3-member-expression-literals'</span>),
<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-plugin-transform-es3-property-literals'</span>),</code></pre>
<p>我们再稍微看下‘大胡子哥’的修改，其实很简单,也很巧妙，看一行关键代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改后生成的代码多了一个 先取 `xxx.__proto__` 再使用 `Object.getPrototypeOf`
  var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 修改后生成的代码多了一个 先取 `xxx.__proto__` 再使用 `Object.getPrototypeOf`</span>
  <span class="hljs-keyword">var</span> _this = _possibleConstructorReturn(<span class="hljs-keyword">this</span>, (Test.__proto__ || <span class="hljs-built_in">Object</span>.getPrototypeOf(Test)).call(<span class="hljs-keyword">this</span>, props));
</code></pre>
<p>回顾下 inherits 方法的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) {
    ...
    // 虽然 ie9/10 不支持 `__proto__`，这里只是作为了普通对象给予赋值，`Object.getPrototypeOf` 获取不到但可以直接 `.__proto__` 获取
  Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
    ...
    <span class="hljs-comment">// 虽然 ie9/10 不支持 `__proto__`，这里只是作为了普通对象给予赋值，`Object.getPrototypeOf` 获取不到但可以直接 `.__proto__` 获取</span>
  <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  ...</code></pre>
<p>如果你看懂了实现方式，不知道你有没有发现 <code>babel-plugin-transform-proto-to-assign</code>（解决类方法继承的问题）这个家伙真的不能用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) { 
  ...
  // 因为它会将 `__proto__` 转为 `_default` 
  Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ 
  ...
  <span class="hljs-comment">// 因为它会将 `__proto__` 转为 `_default` </span>
  <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
}</code></pre>
<p>这样上述的修复就无效了。切记不能使用，还是那句话，类方法本来就不该被继承。</p>
<p>最后看下终极方案的通用配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
    [&quot;transform-runtime&quot;, {
      &quot;helpers&quot;: false,
      &quot;polyfill&quot;: true,
      &quot;regenerator&quot;: true
    }],
    'add-module-exports',
    'transform-es3-member-expression-literals',
    'transform-es3-property-literals',
  ],
  &quot;presets&quot;: [
    'react',
    'es2015',
    'stage-1'
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">plugins</span>: [
    [<span class="hljs-string">"transform-runtime"</span>, {
      <span class="hljs-string">"helpers"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">"polyfill"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">"regenerator"</span>: <span class="hljs-literal">true</span>
    }],
    <span class="hljs-string">'add-module-exports'</span>,
    <span class="hljs-string">'transform-es3-member-expression-literals'</span>,
    <span class="hljs-string">'transform-es3-property-literals'</span>,
  ],
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">'react'</span>,
    <span class="hljs-string">'es2015'</span>,
    <span class="hljs-string">'stage-1'</span>
  ],
}</code></pre>
<p>更简单、完整的解决方案，请查看 <a href="https://github.com/nowa-webpack/nowa" rel="nofollow noreferrer" target="_blank">nowa</a></p>
<p>感谢阅读。</p>
<h2 id="articleHeader7">参考链接</h2>
<ul>
<li><p><a href="https://babeljs.io/docs/plugins/transform-runtime" rel="nofollow noreferrer" target="_blank">https://babeljs.io/docs/plugi...</a></p></li>
<li><p><a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">https://github.com/babel/babel</a></p></li>
</ul>
<h2 id="articleHeader8">广告时间： 请献出你的小星星</h2>
<ul>
<li><p><a href="https://github.com/saltjs/salt-ui" rel="nofollow noreferrer" target="_blank">https://github.com/saltjs/sal...</a></p></li>
<li><p><a href="https://github.com/uxcore/uxcore" rel="nofollow noreferrer" target="_blank">https://github.com/uxcore/uxcore</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 + Webpack + React + Babel 如何在低版本浏览器上愉快的玩耍（下）

## 原文链接
[https://segmentfault.com/a/1190000006930013](https://segmentfault.com/a/1190000006930013)

