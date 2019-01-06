---
title: '关于Babel配置项的这点事' 
date: 2019-01-05 2:30:11
hidden: true
slug: loh9392lz9f
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://babeljs.io" rel="nofollow noreferrer" target="_blank">Babel</a>作为一个JavaScript的语法编译器，可以将<code>ES6/7/8</code>代码转为<code>ES5</code>代码，从而在现有环境执行。</p>
<p>但是初次配置<code>.babelrc</code>的时候，各种<code>presets</code>、<code>plugins</code>看的眼花缭乱，不知道如何下手，下面就自己学习Babel时遇到的问题做一下总结：</p>
<blockquote>如果你是初次接触babel，推荐阅读阮一峰的《<a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">Babel 入门教程</a>》</blockquote>
<h2 id="articleHeader0">Plugin、Preset、Stage-X的关系</h2>
<p>按照Babel官网的<a href="http://babeljs.io/docs/plugins/" rel="nofollow noreferrer" target="_blank">介绍</a>，其实<strong>Preset</strong>和<strong>Stage-X</strong>都是归属到<strong>Plugin</strong>里面的，只不过所覆盖的范围不同而已。</p>
<p>举个例子，如果需要转换ES2015(ES6)的语法，那么你可以在<code>.babelrc</code>的<code>plugins</code>中按需引入<code>check-es2015-constants</code>、<code>es2015-arrow-functions</code>、<code>es2015-block-scoped-functions</code>等等几十个不同作用的plugin：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
  &quot;plugins&quot;: [
    &quot;check-es2015-constants&quot;,
    &quot;es2015-arrow-functions&quot;,
    &quot;es2015-block-scoped-functions&quot;,
    // ...
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">// .babelrc
{
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"check-es2015-constants"</span>,
    <span class="hljs-string">"es2015-arrow-functions"</span>,
    <span class="hljs-string">"es2015-block-scoped-functions"</span>,
    // ...
  ]
}</code></pre>
<p>但是Babel团队为了方便，将<a href="http://babeljs.io/docs/plugins/preset-es2015/" rel="nofollow noreferrer" target="_blank">同属ES2015的几十个Transform Plugins</a>集合到<code>babel-preset-es2015</code>一个Preset中，这样你只需要在<code>.babelrc</code>的<code>presets</code>加入<code>es2015</code>一个配置就可以完成全部ES2015语法的支持了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
  &quot;presets&quot;: [
    &quot;es2015&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">// .babelrc
{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"es2015"</span>
  ]
}</code></pre>
<p>另外，不论是Plugin还是Preset，有不少都有单独属于自己的配置项，具体如何操作的可以看一下<a href="http://babeljs.io/docs/plugins/#plugin-preset-options" rel="nofollow noreferrer" target="_blank">官网的说明</a>。</p>
<p>上面介绍了Plugin与Preset，那么Stage-X就很好理解了，<code>stage-0</code>、<code>stage-1</code>、<code>stage-2</code>、<code>stage-3</code>、<del><code>stage-4</code></del>分别对应的就是进入标准之前的5个阶段，不同<code>stage-x</code>之间存在依赖关系，数字越小，阶段越靠后，靠后阶段包含前面阶段所有的功能，简单理解就是<code>stage-0</code>包含<code>stage-1/2/3</code>的内容，所以如果你不知道需要哪个<code>stage-x</code>的话，直接引入<code>stage-0</code>就好了。</p>
<blockquote>PS: <code>babel-preset-stage-4</code>已经整合入Presets不单独发布了。</blockquote>
<p>以上就是一些基础概念，目前，官方推荐使用<a href="http://babeljs.io/docs/plugins/preset-env/" rel="nofollow noreferrer" target="_blank"><code>babel-preset-env</code></a>，它可以根据你的配置结合<a href="https://github.com/kangax/compat-table" rel="nofollow noreferrer" target="_blank"><code>compat-table</code></a>来帮你自动引入你需要的plugins，它有很多<a href="http://babeljs.io/docs/plugins/preset-env/#options" rel="nofollow noreferrer" target="_blank">配置项</a>，下面介绍几个常用的：</p>
<ul><li>
<strong>targets</strong>： <code>{ [string]: number | string }</code>，默认 <code>{}</code>；</li></ul>
<p>需要支持的环境，可选例如：<code>chrome</code>, <code>edge</code>, <code>firefox</code>, <code>safari</code>, <code>ie</code>, <code>ios</code>, <code>node</code>，甚至可以指定版本，如<code>node: "6.10"</code>或者<code>node: "current"</code>代表使用当前的版本；</p>
<ul><li>
<strong>targets.node</strong>： <code>number | string | "current" | true</code>；</li></ul>
<p>指定<code>node</code>的版本，例如：<code>6.10</code>；</p>
<ul><li>
<strong>targets.browsers</strong>： <code>Array&lt;string&gt; | string</code>；</li></ul>
<p>指定需要兼容的浏览器清单，具体参考<a href="https://github.com/ai/browserslist" rel="nofollow noreferrer" target="_blank">browserslist</a>，例如：<code>["last 2 versions", "safari &gt;= 7"]</code>；</p>
<p>例如需要配置兼容<code>["last 2 versions", "safari &gt;= 7"]</code>的<code>babel-preset-env</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
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
      </div><pre class="json hljs"><code class="JSON">// .babelrc
{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"targets"</span>: {
        <span class="hljs-attr">"browsers"</span>: [<span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"safari &gt;= 7"</span>]
      }
    }]
  ]
}</code></pre>
<p>此外，不同的plugins和presets或许有些功能是重复的，有些存在依赖关系，在配置的时候还有前后顺序的不同，那么Babel在运行的时候是怎么处理的呢？总结一下，规律大概有以下几点：</p>
<ol>
<li>plugins优先于presets进行编译；</li>
<li>plugins按照数组的index增序(从数组第一个到最后一个)进行编译；</li>
<li>presets按照数组的index倒序(从数组最后一个到第一个)进行编译，因为作者认为大部分会把presets写成<code>["es2015", "stage-0"]</code>，具体细节可以看<a href="https://github.com/babel/notes/blob/master/2016-08/august-01.md#potential-api-changes-for-traversal" rel="nofollow noreferrer" target="_blank">这个</a>。</li>
</ol>
<blockquote>摘自《<a href="https://excaliburhan.com/post/babel-preset-and-plugins.html" rel="nofollow noreferrer" target="_blank">如何写好.babelrc？Babel的presets和plugins配置解析</a>》</blockquote>
<h2 id="articleHeader1">
<code>babel-polyfill</code>与<code>babel-runtime</code>的选择</h2>
<p>Babel默认只转换新的JavaScript语法，而不转换新的API，比如<code>Iterator</code>、<code>Generator</code>、<code>Set</code>、<code>Maps</code>、<code>Promise</code>等等全局对象，以及一些定义在全局对象上的方法（比如<code>Object.assign</code>）都不会转码，具体的可以参考<code>babel-plugin-transform-runtime</code>模块的<a href="https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js" rel="nofollow noreferrer" target="_blank">definitions.js</a>文件。</p>
<p><code>babel-polyfill</code>与<code>babel-runtime</code>就是为了解决这种全局对象或者全局对象方法不足的问题，而诞生的2种解决方式。</p>
<blockquote>当然，你还可以用<code>promise-polyfill</code>此类Polyfill解决全局对象的问题；<br>或者用<code>lodash</code>此类Utils解决<code>Object.assign</code>这种方法扩展的问题。</blockquote>
<p>先说说<code>babel-polyfill</code>，它的做法比较暴力，就是将全局对象通通污染一遍，这样做的坏处有几点：</p>
<ol>
<li>可能会增加很多根本没有用到的polyfill；</li>
<li>可能会污染子模块的局部作用域，严重的或许会导致冲突；</li>
</ol>
<p>但是，这样做也有好处，如果你的运行环境比较low，比如说Android一些老机子，而你有需要大量使用<code>Promise</code>、<code>Object.assign</code>、<code>Array.find</code>之类的全局对象或者其所属方法，那么使用<code>babel-polyfill</code>，绝对是一劳永逸。</p>
<p>接着，再来说说<code>babel-runtime</code>，相对而言，它的处理方式比较温柔，套用步步高的广告词就是哪里需要加哪里，比如说你需要<code>Promise</code>，你只需要<code>import Promise from 'babel-runtime/core-js/promise'</code>即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。</p>
<p>不过，如果N个文件都需要<code>Promise</code>，难道得一个个文件的加<code>import Promise from 'babel-runtime/core-js/promise'</code>么，显然不是，Babel已经为这样情况考虑过了，只需要使用<code>babel-plugin-transform-runtime</code>就可以轻松的帮你省去手动<code>import</code>的痛苦，而且，它还做了公用方法的抽离，哪怕你有100个模块使用了<code>Promise</code>，但是promise的polyfill仅仅存在1份，所有要的地方都是引用一地方，具体的配置参考如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
  &quot;presets&quot;: [
    &quot;env&quot;,
    &quot;stage-0&quot;
  ],
  &quot;plugins&quot;: [
    &quot;transform-runtime&quot;
  ],
  &quot;comments&quot;: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">// .babelrc
{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"env"</span>,
    <span class="hljs-string">"stage-0"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"transform-runtime"</span>
  ],
  <span class="hljs-attr">"comments"</span>: <span class="hljs-literal">false</span>
}</code></pre>
<p>写在最后，我在<a href="https://github.com/tonyc726/babel-note" rel="nofollow noreferrer" target="_blank">Github上开了一个项目</a>，做了几个测试，有兴趣的可以一起来试试看。</p>
<hr>
<blockquote>2017.8.30 补充</blockquote>
<p>关于<code>babel</code>与<code>webpack</code>结合使用的教程网上已经有很多了，有不少却还在用<code>v1.*</code>的版本（不推荐），从而在过渡到<code>v2.*</code>或者<code>v3.*</code>(推荐)的版本时，碰到一个关于<code>babel</code>的配置问题，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc - webpack v1.*
{
  &quot;presets&quot;: [
    &quot;env&quot;,
    &quot;stage-0&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>// .<span class="hljs-keyword">babelrc </span>- webpack <span class="hljs-built_in">v1</span>.*
{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"env"</span>,
    <span class="hljs-string">"stage-0"</span>
  ]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc - webpack v2.* - v3.*
{
  &quot;presets&quot;: [
    [&quot;env&quot;, {
        &quot;modules&quot;: false
    }],
    &quot;stage-0&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>// .<span class="hljs-keyword">babelrc </span>- webpack <span class="hljs-built_in">v2</span>.* - <span class="hljs-built_in">v3</span>.*
{
  <span class="hljs-string">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
        <span class="hljs-string">"modules"</span>: false
    }],
    <span class="hljs-string">"stage-0"</span>
  ]
}</code></pre>
<p>很明显，一眼就能看出相对于<code>v1.*</code>的版本，<code>v2.*</code>或者<code>v3.*</code>版本多了<code>"modules": false</code>这项配置，如果仔细看<a href="https://webpack.js.org/guides/migrating/#mixing-es2015-with-amd-and-commonjs" rel="nofollow noreferrer" target="_blank">官网的迁移指南</a>，你就能明白了，以前你可能需要用<code>babel</code>来将<code>ES6</code>的模块语法转换为<code>AMD</code>、<code>CommonJS</code>、<code>UMD</code>之类的模块化标准语法，但是现在webpack已经把这个事情做了，所以就不需要<code>babel</code>来做了，但是<code>babel</code>配置项中的<code>modules</code><a href="https://babeljs.io/docs/plugins/preset-env/#optionsmodules" rel="nofollow noreferrer" target="_blank">默认值</a>是<code>commonjs</code>，所以你需要将<code>modules</code>设置为<code>false</code>才行，不然就冲突了。</p>
<hr>
<h6>参考资料</h6>
<ol>
<li><a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></li>
<li><a href="https://excaliburhan.com/post/babel-preset-and-plugins.html" rel="nofollow noreferrer" target="_blank">https://excaliburhan.com/post...</a></li>
<li><a href="https://segmentfault.com/q/1010000005596587?from=singlemessage&amp;isappinstalled=1">https://segmentfault.com/q/10...</a></li>
<li><a href="https://github.com/brunoyang/blog/issues/20" rel="nofollow noreferrer" target="_blank">https://github.com/brunoyang/...</a></li>
<li><a href="https://github.com/lmk123/blog/issues/45" rel="nofollow noreferrer" target="_blank">https://github.com/lmk123/blo...</a></li>
<li><a href="http://www.cnblogs.com/flyingzl/p/5501247.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/flying...</a></li>
</ol>
<blockquote>本文先发布于我的个人博客《<a href="https://itony.net/post/babel-note.html" rel="nofollow noreferrer" target="_blank">Babel笔记</a>》，后续如有更新，可以查看原文。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Babel配置项的这点事

## 原文链接
[https://segmentfault.com/a/1190000010468759](https://segmentfault.com/a/1190000010468759)

