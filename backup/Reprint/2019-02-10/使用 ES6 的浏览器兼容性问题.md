---
title: '使用 ES6 的浏览器兼容性问题' 
date: 2019-02-10 2:30:42
hidden: true
slug: t08viij43lb
categories: [reprint]
---

{{< raw >}}

                    
<p>以前对浏览器兼容性问题只是大概知道一些点，没想到这次真正着手去做的时候，还是碰到了很多问题。刚开始的时候一边解决问题，一边想着：用 IE8 的都是神经病，到后来，我发现完了，I LOVE IE。</p>
<h2 id="articleHeader0">0x00 起源</h2>
<p>在这次做小蜜 PC 版的时候，由于早于 PC 版，无线版已经重新设计了全新版，做了很多架构上的优化调整。所以在做的时候把无线版的前端架构拿了过来，主要的考虑就是品牌和功能保持跟无线版统一的同时，技术上也可相互支持以及组件复用。</p>
<p>无线版技术上主要采用 ES6 + Webpack + Babel 的方式，由于项目的独特性和特殊需求，并没有使用任何框架，只引入 zepto 作为一个标准支撑库。</p>
<p>而 PC 版的架构跟无线版基本保持一致，主要是把 zepto 换成了 jQuery。</p>
<p>下面是一些基本的开发依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;~6.3.15&quot;,
    &quot;babel-loader&quot;: &quot;~6.2.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;~6.3.13&quot;,
    &quot;babel-preset-stage-0&quot;: &quot;~6.3.13&quot;,
    &quot;babel-runtime&quot;: &quot;~6.3.13&quot;,
    &quot;extract-text-webpack-plugin&quot;: &quot;~0.9.1&quot;,
    &quot;less-loader&quot;: &quot;~2.2.1&quot;,
    &quot;nunjucks-loader&quot;: &quot;~1.0.7&quot;,
    &quot;style-loader&quot;: &quot;~0.10.2&quot;,
    &quot;webpack&quot;: &quot;~1.12.9&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.10.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"~6.3.15"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"~6.2.0"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"~6.3.13"</span>,
    <span class="hljs-attr">"babel-preset-stage-0"</span>: <span class="hljs-string">"~6.3.13"</span>,
    <span class="hljs-attr">"babel-runtime"</span>: <span class="hljs-string">"~6.3.13"</span>,
    <span class="hljs-attr">"extract-text-webpack-plugin"</span>: <span class="hljs-string">"~0.9.1"</span>,
    <span class="hljs-attr">"less-loader"</span>: <span class="hljs-string">"~2.2.1"</span>,
    <span class="hljs-attr">"nunjucks-loader"</span>: <span class="hljs-string">"~1.0.7"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"~0.10.2"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"~1.12.9"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.10.1"</span>
  }
}</code></pre>
<h2 id="articleHeader1">0x01 polyfill</h2>
<p>由于 Babel 默认只转换转各种 ES2015 语法，而不转换新的 API，比如 Promise，以及 Object.assign、Array.from 这些新方法，这时我们需要提供一些 ployfill 来模拟出这样一个提供原生支持功能的浏览器环境。</p>
<p>主要有两种方式：<code>babel-runtime</code> 和 <code>babel-polyfill</code>。</p>
<h3 id="articleHeader2">babel-runtime</h3>
<p>babel-runtime 的作用是模拟 ES2015 环境，包含各种分散的 polyfill 模块，我们可以在自己的模块里单独引入，比如 promise：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-runtime/core-js/promise'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-runtime/core-js/promise'</span></code></pre>
<p>它们不会在全局环境添加未实现的方法，只是这样手动引用每个 polyfill 会非常低效，我们可以借助 <code>Runtime transform</code> 插件来自动化处理这一切。</p>
<p>首先使用 npm 安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-plugin-transform-runtime --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="sh" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-transform-runtime <span class="hljs-comment">--save-dev</span></code></pre>
<p>然后在 webpack 配置文件的 babel-loader 增加选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader: [&quot;babel-loader&quot;],
query: {
  plugins: [
    &quot;transform-runtime&quot;
  ],
  presets: ['es2015', 'stage-0']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">loader: [<span class="hljs-string">"babel-loader"</span>],
<span class="hljs-attr">query</span>: {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-string">"transform-runtime"</span>
  ],
  <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>]
}</code></pre>
<h3 id="articleHeader3">babel-polyfill</h3>
<p>而 <code>babel-polyfill</code> 是针对全局环境的，引入它浏览器就好像具备了规范里定义的完整的特性，一旦引入，就会跑一个 <code>babel-polyfill</code> 实例。用法如下：</p>
<p>1.安装 babel-polyfill</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-polyfill --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="sh" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-polyfill </span>--save</code></pre>
<p>2.在入口文件中引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span></code></pre>
<h3 id="articleHeader4">小结</h3>
<p>其实做到这些，在大部分浏览器就可以正常跑了，但我们做的是一个用户环境很不确定的产品，对一些年代久远但又不容忽视的运行环境，比如 IE8，我们做的还不够。</p>
<p>接下来将开始讲述我们在兼容性方面遇到的一些问题，和解决方法。</p>
<h2 id="articleHeader5">0x02 开始在 IE8 运行</h2>
<p>最开始做的时候并没有针对 IE 做一些兼容性方面的处理，结果在 IE8 上一跑一堆问题。</p>
<p>第一步，我们把 <code>jQuery</code> 换成 1.12.1 ，因为 2.X 已经不再支持 IE8。</p>
<p>但并没有像我们想象中的那样，只是简单换一下 <code>jQuery</code> 版本就可以正常运行了。</p>
<h2 id="articleHeader6">0x03 default or catch</h2>
<p>这是遇到的第一个问题。在兼容性测试过程中，对下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }</code></pre>
<p>或者这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = _main2.default;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">module</span>.exports = _main2.default;</code></pre>
<p>在 IE8 下会直接报”缺少标识符、字符串或数字”的错。</p>
<p>我们得在对象的属性上加 <code>''</code> 才可以。就像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _interopRequireDefault(obj) {
  return obj &amp;&amp; obj.__esModule ? obj : { 'default': obj };
}

module.exports = _main2['default'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-string">'default'</span>: obj };
}

<span class="hljs-built_in">module</span>.exports = _main2[<span class="hljs-string">'default'</span>];</code></pre>
<p>至于原因，并不是 IE8 下对象的属性必须得加 <code>''</code> 才行，而是 <code>default</code> 的问题，作为一个关键字，同样的问题还包括 <code>catch</code>。</p>
<p>这两种情况，可以通过使用 <code>transform-es3-property-literals</code> 和 <code>transform-es3-member-expression-literals</code> 这两个插件搞定。</p>
<p>总之，在平时写代码的时候避免使用关键字，或者保留字作为对象的属性值，尤其是在习惯不加引号的情况下。相关讨论：<a href="https://github.com/airbnb/javascript/issues/61" rel="nofollow noreferrer" target="_blank">Allow reserved words for properties</a></p>
<h2 id="articleHeader7">0x04 es5-shim、es5-sham</h2>
<p>为了兼容像 IE8 这样的老版本浏览器，我们引入 <code>es5-shim</code> 作为 polyfill。</p>
<p>但在遇到 <code>Object.defineProperty</code> 仍提示 "对象不支持此操作"</p>
<blockquote><p>As currently implemented, the Object.defineProperty shim will not install on IE8 because IE8 already has such a method. However, the built-in IE8 method only works when applied to DOM objects.</p></blockquote>
<p>其实 es5-shim 明确说明，这个方法的 polyfill 在 IE8 会失败，因为 IE8 已经有个同名的方法，但只是用于 DOM 对象。</p>
<p>同样的问题还包括 <code>Object.create</code>，上述问题可以再引入 es5-sham 解决.</p>
<h2 id="articleHeader8">0x05 addEventListener</h2>
<p>项目中有部分代码直接使用 <code>addEventListener</code> 这个 API，但在 IE8 下的事件绑定并不是这个方法。</p>
<p>这个问题很容易解决，也无需去写额外的 polyfill。我们已经把 jQuery 换成 1.x，所以只需把代码中 <code>addEventListener</code> 换成 <code>jQuery</code> 的写法就 Okay 了。</p>
<p><code>jQuery</code> 其实为我们封装了很多 API，并做了很多兼容性的封装，类似的只要使用封装好的就可以了。</p>
<h2 id="articleHeader9">0x06 无法获取未定义或 null 引用的属性</h2>
<p>这个问题是在特定场景下【转人工】出现的，出现问题的不是 IE8，而是 IE9 和 IE10。</p>
<p>原因是 ocs 实例创建失败，因为没有调用父类的构造函数。</p>
<p>通过安装 <code>transform-es2015-classes</code> 和 <code>transform-proto-to-assign</code> 解决。</p>
<p>在配置项加上这两个插件的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [
      [&quot;transform-es2015-classes&quot;, { &quot;loose&quot;: true }],
      &quot;transform-proto-to-assign&quot;

  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"plugins"</span>: [
      [<span class="hljs-string">"transform-es2015-classes"</span>, { <span class="hljs-string">"loose"</span>: <span class="hljs-literal">true</span> }],
      <span class="hljs-string">"transform-proto-to-assign"</span>

  ]
}</code></pre>
<h2 id="articleHeader10">0x07 postMessage</h2>
<p>虽然 <code>postMessage</code> 是 HTML5 的特性，但 IE8 和 Firefox3 很早就实现了这个 API，当然，跟后来的标准并不一致。这其实也不能怪 IE8。</p>
<blockquote><p>The postMessage method is supported in Internet Explorer from version 8, Firefox from version 3 and Opera from version 9.5.</p></blockquote>
<p>我们可能会这样去使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parent.postMessage({success: 'ok', name: ‘mirreal’}, ‘*’);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">parent.postMessage({<span class="hljs-attr">success</span>: <span class="hljs-string">'ok'</span>, <span class="hljs-attr">name</span>: ‘mirreal’}, ‘*’);</code></pre>
<p>但是为了兼容 IE8，我们得转成字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parent.postMessage(JSON.stringify({success: 'ok', name: &quot;mirreal&quot;}), ‘*’);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">parent.postMessage(<span class="hljs-built_in">JSON</span>.stringify({<span class="hljs-attr">success</span>: <span class="hljs-string">'ok'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"mirreal"</span>}), ‘*’);</code></pre>
<p>另外一个需要注意的点是：在 IE8 下 <code>window.postMessage</code> 是同步的。</p>
<blockquote><p>window.postMessage is syncronouse in IE 8</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var syncronouse = true;
window.onmessage = function () {
  console.log(syncronouse); // 在 IE8 下会在控制台打印 true
};
window.postMessage('test', '*');
syncronouse = false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> syncronouse = <span class="hljs-literal">true</span>;
<span class="hljs-built_in">window</span>.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(syncronouse); <span class="hljs-comment">// 在 IE8 下会在控制台打印 true</span>
};
<span class="hljs-built_in">window</span>.postMessage(<span class="hljs-string">'test'</span>, <span class="hljs-string">'*'</span>);
syncronouse = <span class="hljs-literal">false</span>;</code></pre>
<h2 id="articleHeader11">0x08 IE8/IE9 的控制台</h2>
<p>遇到一个奇怪的问题，在刚开始遇到的时候（其实搞清楚原因，好像也挺正常的），小蜜在 IE8 IE9 无法加载。在 IE8 那个古老浏览器的左下角，好像也是唯一会在页面提示脚本错误的浏览器，提示 <code>script error</code>。</p>
<p>第一反应就是应该又是某个函数在 IE 下不支持，准备打开控制台看看到底哪里报错，结果却什么事都没有了，页面竟然顺畅地加载出来了，这下该怎么调试好呢？</p>
<p>开始思考：什么东西是依赖控制台而存在的，到底会是什么呢。。。其实就是控制台本身。</p>
<p>原因就是我们在代码中添加了一些控制信息会打印在控制台，而 IE8/IE9 要开启 IE Dev Tools 才能使用 <code>console</code> 对象。</p>
<p>切忌把 IE8/9 想成 Chrome/Firefox，以为永远有 <code>window.console</code> 可用.终于，IE10 改邪归正，<code>console</code> 不再像段誉的六脉神剑时有时无。</p>
<blockquote><p>console.log is there in IE8, but the console object isn't created until you open DevTools. Therefore, a call to console.log may result in an error, for example if it occurs on page load before you have a chance to open the dev tools.</p></blockquote>
<p>但只要 IE8/9 还在一天，console 检查还是不能少的</p>
<p>事实上，IE8/9 从未死去，所以</p>
<p>就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
if (window.console) {
  console.log('log here');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.console) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'log here'</span>);
}</code></pre>
<p>要是有一堆 <code>console.log</code>, <code>console.count</code>, <code>console.error</code>, <code>console.time</code>, <code>console.profile</code>，... 这样去写，那还不把人写到恶心死。</p>
<p>写个简单的 console polyfill 吧，检测是否存在 <code>console</code>，不存在可以常见一个同名的空方法达到不报错的目的。当然，生产环境的代码其实也不会有那么多奇奇怪怪的 <code>console</code>。</p>
<h2 id="articleHeader12">0x09 定义文档兼容性</h2>
<p><code>X-UA-Compatible</code> 当初是针对 IE8 新加的一个配置。用于为 IE8 指定不同的页面渲染模式，比如使用 IE7 兼容模式，或者是采用最新的引擎。</p>
<p>现在基本也不需要前者的降级模式，更多的是写入 <code>IE=edge</code> 支持最新特性。而 <code>chrome=1</code> 则会激活 Google Chrome Frame，前提是你的 IE 安装过这个插件。</p>
<p>有什么用呢，当然有用，有些 API 是作为新特性存在于 IE8 中的，比如 <code>JSON</code>，不开启的话就用不了。</p>
<h3 id="articleHeader13">为什么要用 X-UA-Compatible？</h3>
<p>在 IE8 刚推出的时候，很多网页由于重构的问题，无法适应较高级的浏览器，所以使用 <code>X-UA-Compatible</code> 强制 IE8 采用低版本方式渲染。</p>
<p>比如：使用下面这段代码后，开发者无需考虑网页是否兼容 IE8 浏览器，只要确保网页在 IE6、IE7 下的表现就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=EmulateIE7&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=EmulateIE7"</span> /&gt;</span></code></pre>
<p>而这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span> /&gt;</span></code></pre>
<p><code>IE=edge</code> 告诉 IE 使用最新的引擎渲染网页，<code>chrome=1</code> 则可以激活 Chrome Frame[1]。</p>
<h2 id="articleHeader14">0x0a 条件注释 or 条件编译</h2>
<p>最后说说 IE 的条件注释，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!    [if !IE]    The NOT operator. This is placed immediately in front of the feature, operator, or subexpression to reverse the Boolean meaning of the expression.

lt    [if lt IE 5.5]    The less-than operator. Returns true if the first argument is less than the second argument.

lte    [if lte IE 6]    The less-than or equal operator. Returns true if the first argument is less than or equal to the second argument.

gt    [if gt IE 5]    The greater-than operator. Returns true if the first argument is greater than the second argument.

gte    [if gte IE 7]    The greater-than or equal operator. Returns true if the first argument is greater than or equal to the second argument.

( )    [if !(IE 7)]    Subexpression operators. Used in conjunction with boolean operators to create more complex expressions.

&amp;    [if (gt IE 5)&amp;(lt IE 7)]    The AND operator. Returns true if all subexpressions evaluate to true

|    [if (IE 6)|(IE 7)]    The OR operator. Returns true if any of the subexpressions evaluates to true.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="text">!    [<span class="hljs-keyword">if</span> !IE]    The NOT operator. This <span class="hljs-keyword">is</span> placed immediately <span class="hljs-keyword">in</span> <span class="hljs-keyword">front</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> feature, operator, <span class="hljs-keyword">or</span> subexpression <span class="hljs-keyword">to</span> <span class="hljs-built_in">reverse</span> <span class="hljs-keyword">the</span> Boolean meaning <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> expression.

lt    [<span class="hljs-keyword">if</span> lt IE <span class="hljs-number">5.5</span>]    The less-than operator. Returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">first</span> argument <span class="hljs-keyword">is</span> <span class="hljs-keyword">less than</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">second</span> argument.

lte    [<span class="hljs-keyword">if</span> lte IE <span class="hljs-number">6</span>]    The less-than <span class="hljs-keyword">or</span> <span class="hljs-keyword">equal</span> operator. Returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">first</span> argument <span class="hljs-keyword">is</span> <span class="hljs-keyword">less than or equal</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">second</span> argument.

gt    [<span class="hljs-keyword">if</span> gt IE <span class="hljs-number">5</span>]    The greater-than operator. Returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">first</span> argument <span class="hljs-keyword">is</span> <span class="hljs-keyword">greater than</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">second</span> argument.

gte    [<span class="hljs-keyword">if</span> gte IE <span class="hljs-number">7</span>]    The greater-than <span class="hljs-keyword">or</span> <span class="hljs-keyword">equal</span> operator. Returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">first</span> argument <span class="hljs-keyword">is</span> <span class="hljs-keyword">greater than</span> <span class="hljs-keyword">or</span> <span class="hljs-keyword">equal</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">second</span> argument.

( )    [<span class="hljs-keyword">if</span> !(IE <span class="hljs-number">7</span>)]    Subexpression operators. Used <span class="hljs-keyword">in</span> conjunction <span class="hljs-keyword">with</span> <span class="hljs-built_in">boolean</span> operators <span class="hljs-keyword">to</span> create more complex expressions.

&amp;    [<span class="hljs-keyword">if</span> (gt IE <span class="hljs-number">5</span>)&amp;(lt IE <span class="hljs-number">7</span>)]    The AND operator. Returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> all subexpressions evaluate <span class="hljs-keyword">to</span> <span class="hljs-literal">true</span>

|    [<span class="hljs-keyword">if</span> (IE <span class="hljs-number">6</span>)|(IE <span class="hljs-number">7</span>)]    The OR operator. Returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> any <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> subexpressions evaluates <span class="hljs-keyword">to</span> <span class="hljs-literal">true</span>.
</code></pre>
<p>另外一个类似的东西是在 Javascript 中的条件编译（conditional compilation）。我们可以使用这段简单的代码来做浏览器嗅探：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isIE = /*@cc_on!@*/false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> isIE = <span class="hljs-comment">/*@cc_on!@*/</span><span class="hljs-literal">false</span></code></pre>
<p>在其他浏览器中，false 前的被视为注释，而在 IE 中，<code>/*@cc_on .... @*/</code> 之间的部分可以被 IE 识别并作为程序执行，同时启用 IE 的条件编译。</p>
<p>常用变量如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* @_win32 如果在 Win32 系统上运行，则为 true。
* @_win16 如果在 Win16 系统上运行，则为 true。
* @_mac 如果在 Apple Macintosh 系统上运行，则为 true。
* @_alpha 如果在 DEC Alpha 处理器上运行，则为 true。
* @_x86 如果在 Intel 处理器上运行，则为 true。
* @_mc680x0 如果在 Motorola 680x0 处理器上运行，则为 true。
* @_PowerPC 如果在 Motorola PowerPC 处理器上运行，则为 true。
* @_jscript 始终为 true。
* @_jscript_build 包含 JavaScript 脚本引擎的生成号。
* @_jscript_version 包含 major.minor 格式的 JavaScript 版本号。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code class="text">* <span class="hljs-variable">@_win32</span> 如果在 Win32 系统上运行，则为 true。
* <span class="hljs-variable">@_win16</span> 如果在 Win16 系统上运行，则为 true。
* <span class="hljs-variable">@_mac</span> 如果在 Apple Macintosh 系统上运行，则为 true。
* <span class="hljs-variable">@_alpha</span> 如果在 DEC Alpha 处理器上运行，则为 true。
* <span class="hljs-variable">@_x86</span> 如果在 Intel 处理器上运行，则为 true。
* <span class="hljs-variable">@_mc680x0</span> 如果在 Motorola <span class="hljs-number">680</span>x0 处理器上运行，则为 true。
* <span class="hljs-variable">@_PowerPC</span> 如果在 Motorola PowerPC 处理器上运行，则为 true。
* <span class="hljs-variable">@_jscript</span> 始终为 true。
* <span class="hljs-variable">@_jscript_build</span> 包含 JavaScript 脚本引擎的生成号。
* <span class="hljs-variable">@_jscript_version</span> 包含 major.minor 格式的 JavaScript 版本号。</code></pre>
<blockquote><p>Internet Explorer 11 之前的所有版本的 Internet Explorer 都支持条件编译。  从 Internet Explorer 11 标准模式开始，Windows 8.x 应用商店应用不支持条件编译。</p></blockquote>
<h2 id="articleHeader15">后</h2>
<p>之前一直在做移动端的开发，没想到做 PC 端也会遇到这么多的兼容性问题。不同于移动端设备的繁杂和不确定性，PC 版的兼容更侧重于对特定浏览器的特性的了解，相比而言更为明确，而非因为某一款手机的诡异表现。</p>
<h2 id="articleHeader16">参考文档</h2>
<ul>
<li><a href="https://github.com/airbnb/javascript/issues/61" rel="nofollow noreferrer" target="_blank">Allow reserved words for properties</a></li>
<li><a href="https://github.com/es-shims/es5-shim/issues/5" rel="nofollow noreferrer" target="_blank">IE8 defineProperty/getOwnPropertyDescriptor clash with shim</a></li>
<li><a href="http://babeljs.io/docs/plugins/transform-runtime/" rel="nofollow noreferrer" target="_blank">Runtime transform</a></li>
<li><a href="https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-runtime definitions</a></li>
<li><a href="https://github.com/babel/babelify/issues/133" rel="nofollow noreferrer" target="_blank">super() not calling parent's constructor on IE9</a></li>
<li><a href="http://help.dottoro.com/ljgheukc.php" rel="nofollow noreferrer" target="_blank">postMessage method (window) Javascript</a></li>
<li>
<a href="https://msdn.microsoft.com/library/gg589530(v=vs.85" rel="nofollow noreferrer" target="_blank">使用 F12 工具控制台查看错误和状态</a>.aspx)</li>
<li>
<a href="https://msdn.microsoft.com/zh-cn/library/cc288325(v=vs.85" rel="nofollow noreferrer" target="_blank">定义文档兼容性</a>.aspx)</li>
<li>
<a href="https://msdn.microsoft.com/zh-cn/library/121hztk3(v=vs.94" rel="nofollow noreferrer" target="_blank">条件编译 (JavaScript)</a>.aspx)</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 ES6 的浏览器兼容性问题

## 原文链接
[https://segmentfault.com/a/1190000005128101](https://segmentfault.com/a/1190000005128101)

