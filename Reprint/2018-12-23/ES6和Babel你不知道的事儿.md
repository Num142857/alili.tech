---
title: 'ES6和Babel你不知道的事儿' 
date: 2018-12-23 2:30:07
hidden: true
slug: neb835a7f0e
categories: [reprint]
---

{{< raw >}}

                    
<p>因babel的版本从5升级到6有很多改动，比如babel本身不再提供任何transform的工作，都需要借助插件来完成，本文的所有讨论都是建立在babel 6之上的。如果只想看结论，直接跳到文章最后。  ---写在前面</p>
<p>ES6即ECMAScript 6，是前端开发的JS最新规范，现在大家的开发都在使用ES6，对此并不陌生了。只是浏览器对ES6的支持并不完整，想要更好让ES6在各个平台完美运行还需一番折腾，特此一叙。下图是ES6的浏览器兼容性一览表（已ES6的Number为例）：</p>
<p><span class="img-wrap"><img data-src="/img/bVZThD?w=2266&amp;h=1020" src="https://static.alili.tech/img/bVZThD?w=2266&amp;h=1020" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>另外国内浏览器都号称是“双核”，实际上浏览器的版本号较新，打包的Webkit内核确很低，比如市场份额很高的360安全浏览器，最新版本是9.1，Webkit内核版本才是55.0.2883，要知道Chrome官方最新版本已是62.0.3202，相差之远不甚理解。</p>
<ul>
<li>版本截图：<p><span class="img-wrap"><img data-src="/img/bVZThV?w=487&amp;h=201" src="https://static.alili.tech/img/bVZThV?w=487&amp;h=201" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>userAgent：<br>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36 QIHU 360SE"</li>
</ul>
<p>当然，搜狗浏览器市场份额也不低，官方最新版本是7.1，内核版本是49.0.2623，为之一惊。</p>
<ul>
<li>版本截图：<br><span class="img-wrap"><img data-src="/img/bVZTiu?w=415&amp;h=215" src="https://static.alili.tech/img/bVZTiu?w=415&amp;h=215" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>userAgent：<br>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0"</li>
</ul>
<p>因此，我们想要在所有的浏览器上平稳、完美的运行ES6代码，必须要了解它的忠实伴侣 <a href="https://babeljs.cn/" rel="nofollow noreferrer" target="_blank">Babel</a>。</p>
<p>大家可能对此也并不陌生，但是对babel的内部机制、插件的作用、兼容的配置还缺乏一些认识，本文就是特意尝试来补全这些内容。</p>
<p>使用babel无非要用到.babelrc文件或者在package.json增加babel字段。我们以.babelrc文件为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;:[&quot;es2015&quot;,&quot;stage-0&quot;],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>:[<span class="hljs-string">"es2015"</span>,<span class="hljs-string">"stage-0"</span>],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<p>这是最常见的babel配置，然后结合webpack下的babel-loader完成对JS代码的babel编译。</p>
<p>上面代码的presets和plugins分别是什么含义呢？如果是下面的配置有何不可呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;:[&quot;es2015&quot;,&quot;stage-0&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>:[<span class="hljs-string">"es2015"</span>,<span class="hljs-string">"stage-0"</span>]
}</code></pre>
<p>首先来明确一个概念: presets是一系列plugin的集合。比如上述配置中es2015表示babel-preset-es2015，它包含以下plugin:</p>
<ul>
<li>check-es2015-constants</li>
<li>transform-es2015-arrow-functions</li>
<li>transform-es2015-block-scoped-functions</li>
<li>transform-es2015-block-scoping</li>
<li>transform-es2015-classes</li>
<li>transform-es2015-computed-properties</li>
<li>transform-es2015-destructuring</li>
<li>transform-es2015-duplicate-keys</li>
<li>transform-es2015-for-of</li>
<li>transform-es2015-function-name</li>
<li>transform-es2015-literals</li>
<li>transform-es2015-modules-commonjs</li>
<li>transform-es2015-object-super</li>
<li>transform-es2015-parameters</li>
<li>transform-es2015-shorthand-properties</li>
<li>transform-es2015-spread</li>
<li>transform-es2015-sticky-regex</li>
<li>transform-es2015-template-literals</li>
<li>transform-es2015-typeof-symbol</li>
<li>transform-es2015-unicode-regex</li>
<li>transform-regenerator</li>
</ul>
<p>使用presets的好处就是不用再plugins配置里一个一个的写了。</p>
<p>然后，我们通过对代码的编译来看下上面两个配置的区别。源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a=1;
let b=(item)=>{return item+1};
let c='1'.padStart(2,'0');
let d=Object.assign({k:2},{t:4});
let e=new Set();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a=<span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> b=<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{<span class="hljs-keyword">return</span> item+<span class="hljs-number">1</span>};
<span class="hljs-keyword">let</span> c=<span class="hljs-string">'1'</span>.padStart(<span class="hljs-number">2</span>,<span class="hljs-string">'0'</span>);
<span class="hljs-keyword">let</span> d=<span class="hljs-built_in">Object</span>.assign({<span class="hljs-attr">k</span>:<span class="hljs-number">2</span>},{<span class="hljs-attr">t</span>:<span class="hljs-number">4</span>});
<span class="hljs-keyword">let</span> e=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();</code></pre>
<p>我们使用第二种配置，得到的编译结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
var a = 1;
var b = function b(item) {
  return item + 1;
};
var c = '1'.padStart(2, '0');
var d = Object.assign({ k: 2 }, { t: 4 });
var e = new Set();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">return</span> item + <span class="hljs-number">1</span>;
};
<span class="hljs-keyword">var</span> c = <span class="hljs-string">'1'</span>.padStart(<span class="hljs-number">2</span>, <span class="hljs-string">'0'</span>);
<span class="hljs-keyword">var</span> d = <span class="hljs-built_in">Object</span>.assign({ <span class="hljs-attr">k</span>: <span class="hljs-number">2</span> }, { <span class="hljs-attr">t</span>: <span class="hljs-number">4</span> });
<span class="hljs-keyword">var</span> e = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();</code></pre>
<p>从编译结果来看，let、箭头函数都被编译了，然而padStart和Object.assign原样输出了。原因很简单，let被编译是使用了es2015中的transform-es2015-block-scoping，箭头函数编译是使用了es2015的transform-es2015-arrow-functions。padStart、Object.assign和Set并未在es2015和state-0中找到对应plugin。我们再使用第一种配置编译，结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var _set = require('babel-runtime/core-js/set');
var _set2 = _interopRequireDefault(_set);
var _assign = require('babel-runtime/core-js/object/assign');
var _assign2 = _interopRequireDefault(_assign);
function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }
var a = 1;
var b = function b(item) {
  return item + 1;
};
var c = '1'.padStart(2, '0');
var d = (0, _assign2.default)({ k: 2 }, { t: 4 });
var e = new _set2.default();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> _set = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/core-js/set'</span>);
<span class="hljs-keyword">var</span> _set2 = _interopRequireDefault(_set);
<span class="hljs-keyword">var</span> _assign = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/core-js/object/assign'</span>);
<span class="hljs-keyword">var</span> _assign2 = _interopRequireDefault(_assign);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">return</span> item + <span class="hljs-number">1</span>;
};
<span class="hljs-keyword">var</span> c = <span class="hljs-string">'1'</span>.padStart(<span class="hljs-number">2</span>, <span class="hljs-string">'0'</span>);
<span class="hljs-keyword">var</span> d = (<span class="hljs-number">0</span>, _assign2.default)({ <span class="hljs-attr">k</span>: <span class="hljs-number">2</span> }, { <span class="hljs-attr">t</span>: <span class="hljs-number">4</span> });
<span class="hljs-keyword">var</span> e = <span class="hljs-keyword">new</span> _set2.default();</code></pre>
<p>从编译结果看，let、箭头函数、Object.assign、Set都被正确编译，padStart仍岿然不动。在这友情提醒一下，babel-plugin-transform-runtime是依赖babel-runtime的。那么如何让padStart方法也能被成功编译呢，这么大的开场白终于聊到了我们今天的主题：babel的polyfill方案。</p>
<p>官方推荐的方式是使用babel-polyfill。</p>
<blockquote>
<p>This will emulate a full ES2015+ environment and is intended to be used in an application rather than a library/tool. This polyfill is automatically loaded when using babel-node.</p>
<p>This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.</p>
</blockquote>
<p>用最简单的方式概括官方的说法就是：只要引入了babel-polyfill你可以大胆的用ES6。基本方法如下：</p>
<ol>
<li>
<p>先安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save babel-polyfill" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babel-polyfill</span></code></pre>
</li>
<li>
<p>后使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在代码中显示调用
require(&quot;babel-polyfill&quot;);
// or
import &quot;babel-polyfill&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在代码中显示调用</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-polyfill"</span>);
<span class="hljs-comment">// or</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">"babel-polyfill"</span>;</code></pre>
<p>或者在webpack中配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: [&quot;babel-polyfill&quot;, &quot;./index.js&quot;]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">"babel-polyfill"</span>, <span class="hljs-string">"./index.js"</span>]
};</code></pre>
</li>
</ol>
<p>那么问题来了，既然使用这么简单，有啥弊端没？这个问题的答案也很简单：它无疑大大增加了代码的体积，即使你只有1k的代码，也会打包出几百k出来。如果不在意这个代码的体积，肆意大胆的去用吧。如果想做到代码清爽、合理的利用babel的功能还请继续阅读。</p>
<p>使用babel-polyfill可以不使用presets和transform-runtime，但是不意味着presets和transform-runtime没有用武之地。在此总结了几个原则：</p>
<ol>
<li>
<p><strong>纯业务开发</strong></p>
<ul>
<li>
<strong>第一、先要考虑所有兼容的平台和环境，选择性的使用babel-polyfill和transform-runtime</strong>。<br>通常情况下业务代码较重，再加上业务逻辑复杂的话，使用的ES6语法比较全面很频繁，还要考虑到各个小伙伴的代码兼容性，使用babel-polyfill结合webpack抽离出公共代码库，整体上还是能节省代码体积的。如果想全盘使用babel-polyfill并且在此基础上进行优化的话，请参考第二点。</li>
<li>
<p><strong>第二、放弃使用preset-es2015、preset-state-0，请使用preset-env</strong>。<br>babel-polyfill的引入会自动加入很多代码，有时候我们并不完全需要。比如：做移动端开发不需要考虑IE之类的、B端产品线只考虑指定的浏览器等。这个时候使用prest-env就可以了。配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;, {
      &quot;targets&quot;: {
        &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;safari >= 7&quot;]
      }
    }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"targets"</span>: {
        <span class="hljs-attr">"browsers"</span>: [<span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"safari &gt;= 7"</span>]
      }
    }]
  ]
}</code></pre>
<p>browsers的可选值参考 <a href="https://github.com/ai/browserslist" rel="nofollow noreferrer" target="_blank">browserslist</a>；有几个点要提醒一下：</p>
<ul>
<li>上述的"last 2 versions"是主版本，这样配置会引入很多代码，建议针对性的配置。</li>
<li>虽然使用了preset-env会针对指定的平台进行编译代码，但是要注意，即使你的代码都是ES5，打包出来的体积也不会小，因为它不是根据你的代码来选择性的编译，而是根据平台。如果想进一步优化，如根据平台也要根据代码来选择性的polyfill，请参考 <a href="https://www.npmjs.com/package/@babel/preset-env" rel="nofollow noreferrer" target="_blank">@babel/preset-env</a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>类库和工具开发</strong></p>
<ul>
<li>
<p><strong>第一、尽量避免使用babel-polyfill而使用tranform-runtime</strong></p>
<blockquote><p>If you are looking for something that won't modify globals to be used in a tool/library, checkout the transform-runtime plugin. This means you won't be able to use the instance methods mentioned above like Array.prototype.includes.</p></blockquote>
<p>官方这句话换个角度讲就是类库的开发建议使用transform-runtime，它的原则是不改变原型链上的方法，但是通过babel-runtime或者core-js手动引入，这样不仅代码优雅编译的包体积会小很多。</p>
</li>
<li>
<p><strong>第二、选择性的使用ES6语法</strong></p>
<p>ES6虽然很强大，但是很多方法使用ES5仍可轻松实现。看下刚才提及的 Array.prototype.includes方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6写法
let a=[1,2,3];
if(a.includes(1)){
  console.log('1 is finded');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6写法</span>
<span class="hljs-keyword">let</span> a=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">if</span>(a.includes(<span class="hljs-number">1</span>)){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1 is finded'</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5写法
let a=[1,2,3];
if(a.some((item)=>{return item===1})){
  console.log('1 is finded');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES5写法</span>
<span class="hljs-keyword">let</span> a=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">if</span>(a.some(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{<span class="hljs-keyword">return</span> item===<span class="hljs-number">1</span>})){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1 is finded'</span>);
}</code></pre>
<p>这两个写法区别并不大，但是如果使用ES6的写法再加上polyfill的引入，代码要多不少。</p>
</li>
</ul>
</li>
<li>
<strong>兼容到IE8-</strong><p>请老老实实使用babel-polyfill。</p>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6和Babel你不知道的事儿

## 原文链接
[https://segmentfault.com/a/1190000012328326](https://segmentfault.com/a/1190000012328326)

