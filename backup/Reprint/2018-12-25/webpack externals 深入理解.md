---
title: 'webpack externals 深入理解' 
date: 2018-12-25 2:30:11
hidden: true
slug: t7glydl0pk
categories: [reprint]
---

{{< raw >}}

                    
<p>按照官方文档的解释，如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。</p>
<p>假设：我们开发了一个自己的库，里面引用了lodash这个包，经过webpack打包的时候，发现如果把这个lodash包打入进去，打包文件就会非常大。那么我们就可以externals的方式引入。也就是说，自己的库本身不打包这个lodash，需要用户环境提供。</p>
<p>使用lodash</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;</code></pre>
<p>配置externals</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: {
  &quot;lodash&quot;: {
        commonjs: &quot;lodash&quot;,//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
        commonjs2: &quot;lodash&quot;,//同上
        amd: &quot;lodash&quot;,//如果我们的库使用require.js等加载,等价于 define([&quot;lodash&quot;], factory);
        root: &quot;_&quot;//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals: {
  <span class="hljs-string">"lodash"</span>: {
        <span class="hljs-attr">commonjs</span>: <span class="hljs-string">"lodash"</span>,<span class="hljs-comment">//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')</span>
        commonjs2: <span class="hljs-string">"lodash"</span>,<span class="hljs-comment">//同上</span>
        amd: <span class="hljs-string">"lodash"</span>,<span class="hljs-comment">//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);</span>
        root: <span class="hljs-string">"_"</span><span class="hljs-comment">//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);</span>
  }
}</code></pre>
<blockquote><p>总得来说，externals配置就是为了使<code>import _ from 'lodash'</code>这句代码，在本身不引入lodash的情况下，能够在各个环境都能解释执行。</p></blockquote>
<p>有一点需要注意的是，假如lodash中在浏览器环境中不提供<code>_</code>的全局变量，那么就没有办法使用。这个"_"是不能随便乱写的。如果外部库lodash提供的是全局变量<code>lodash</code>,那你就得使用<code>lodash</code>。</p>
<blockquote><p>如果你写的库要支持各种环境，你需要设置output中的libraryTarget为umd，也就是将打包的文件，生成为umd规范，适用于各种环境。libraryTarget和externals有藕断丝连的关系，后面会提到。</p></blockquote>
<p>下面进入正题，externals的配置有以下几种：array , object ,reg。这三种形式都可以传入，前者其实是对后者的包含。</p>
<p><a href="http://www.tangshuang.net/3343.html" rel="nofollow noreferrer" target="_blank">参考这里</a></p>
<h3 id="articleHeader0">Array</h3>
<p>数组内的每一个元素又可以是多种形式，包括object, reg, function, string</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: [
    { // ① object形式
          jquery: 'jQuery', // 
        a: false, // 不是external，配置错误
        b: true, // b 是 external， `module.exports = b`，适用于你所引用的库暴露出的变量和你所使用的库的名称一致的情况，比如moment
        &quot;./c&quot;: &quot;c&quot;, // &quot;./c&quot; 是 external `module.exports = c`
        &quot;./d&quot;: &quot;var d&quot;, // &quot;./d&quot; 是 external `module.exports = ./d`  语法错误
        &quot;./f&quot;: &quot;commonjs2 ./a/b&quot;, // &quot;./f&quot; 是 external `module.exports = require(&quot;./a/b&quot;)`
        &quot;./f&quot;: &quot;commonjs ./a/b&quot;, // ...和 commonjs2一样
        &quot;./f&quot;: &quot;this ./a/b&quot;, // &quot;./f&quot; 是 external `(function() { module.exports = this[&quot;./a/b&quot;]; }())`
    },
    // abc -> require(&quot;abc&quot;)
    /^[a-z\-0-9]+$/, // ② reg形式
    function(context, request, callback) { // ③ function形式
        // Every module prefixed with &quot;global-&quot; becomes external
        // &quot;global-abc&quot; -> abc
        if(/^global-/.test(request))
            return callback(null, &quot;var &quot; + request.substr(7));
        callback();
    },
    &quot;./e&quot; // &quot;./e&quot; 是 external ( require(&quot;./e&quot;) ) // ④ string形式
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals: [
    { <span class="hljs-comment">// ① object形式</span>
          jquery: <span class="hljs-string">'jQuery'</span>, <span class="hljs-comment">// </span>
        a: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 不是external，配置错误</span>
        b: <span class="hljs-literal">true</span>, <span class="hljs-comment">// b 是 external， `module.exports = b`，适用于你所引用的库暴露出的变量和你所使用的库的名称一致的情况，比如moment</span>
        <span class="hljs-string">"./c"</span>: <span class="hljs-string">"c"</span>, <span class="hljs-comment">// "./c" 是 external `module.exports = c`</span>
        <span class="hljs-string">"./d"</span>: <span class="hljs-string">"var d"</span>, <span class="hljs-comment">// "./d" 是 external `module.exports = ./d`  语法错误</span>
        <span class="hljs-string">"./f"</span>: <span class="hljs-string">"commonjs2 ./a/b"</span>, <span class="hljs-comment">// "./f" 是 external `module.exports = require("./a/b")`</span>
        <span class="hljs-string">"./f"</span>: <span class="hljs-string">"commonjs ./a/b"</span>, <span class="hljs-comment">// ...和 commonjs2一样</span>
        <span class="hljs-string">"./f"</span>: <span class="hljs-string">"this ./a/b"</span>, <span class="hljs-comment">// "./f" 是 external `(function() { module.exports = this["./a/b"]; }())`</span>
    },
    <span class="hljs-comment">// abc -&gt; require("abc")</span>
    /^[a-z\<span class="hljs-number">-0</span><span class="hljs-number">-9</span>]+$/, <span class="hljs-comment">// ② reg形式</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context, request, callback</span>) </span>{ <span class="hljs-comment">// ③ function形式</span>
        <span class="hljs-comment">// Every module prefixed with "global-" becomes external</span>
        <span class="hljs-comment">// "global-abc" -&gt; abc</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^global-/</span>.test(request))
            <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, <span class="hljs-string">"var "</span> + request.substr(<span class="hljs-number">7</span>));
        callback();
    },
    <span class="hljs-string">"./e"</span> <span class="hljs-comment">// "./e" 是 external ( require("./e") ) // ④ string形式</span>
]</code></pre>
<h3 id="articleHeader1">Object</h3>
<p>Object形式和上面类似，但是它里面一定是key: value的形式，所以像上面那种string的形式就不可能出现在object形式中。这种情况下使用的最多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals:{ 
          jquery: 'jQuery', // 
        a: false, // 不是external，配置错误
        b: true, // b 是 external， `module.exports = b`，适用于你所引用的库暴露出的变量和你所使用的库的名称一致的情况，比如moment
        &quot;./c&quot;: &quot;c&quot;, // &quot;./c&quot; 是 external `module.exports = c`
        &quot;./d&quot;: &quot;var d&quot;, // &quot;./d&quot; 是 external `module.exports = ./d`  语法错误
        &quot;./f&quot;: &quot;commonjs2 ./a/b&quot;, // &quot;./f&quot; 是 external `module.exports = require(&quot;./a/b&quot;)`
        &quot;./f&quot;: &quot;commonjs ./a/b&quot;, // ...和 commonjs2一样
        &quot;./f&quot;: &quot;this ./a/b&quot;, // &quot;./f&quot; 是 external `(function() { module.exports = this[&quot;./a/b&quot;]; }())`
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals:{ 
          <span class="hljs-attr">jquery</span>: <span class="hljs-string">'jQuery'</span>, <span class="hljs-comment">// </span>
        a: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 不是external，配置错误</span>
        b: <span class="hljs-literal">true</span>, <span class="hljs-comment">// b 是 external， `module.exports = b`，适用于你所引用的库暴露出的变量和你所使用的库的名称一致的情况，比如moment</span>
        <span class="hljs-string">"./c"</span>: <span class="hljs-string">"c"</span>, <span class="hljs-comment">// "./c" 是 external `module.exports = c`</span>
        <span class="hljs-string">"./d"</span>: <span class="hljs-string">"var d"</span>, <span class="hljs-comment">// "./d" 是 external `module.exports = ./d`  语法错误</span>
        <span class="hljs-string">"./f"</span>: <span class="hljs-string">"commonjs2 ./a/b"</span>, <span class="hljs-comment">// "./f" 是 external `module.exports = require("./a/b")`</span>
        <span class="hljs-string">"./f"</span>: <span class="hljs-string">"commonjs ./a/b"</span>, <span class="hljs-comment">// ...和 commonjs2一样</span>
        <span class="hljs-string">"./f"</span>: <span class="hljs-string">"this ./a/b"</span>, <span class="hljs-comment">// "./f" 是 external `(function() { module.exports = this["./a/b"]; }())`</span>
    },</code></pre>
<p>reg就不介绍了，也就是正则匹配的形式。可以类比Array类型中的string。</p>
<p>externals引入jquery后，那么不管在代码中使用<code>import $ from 'jquery'</code>还是<code>var $ = require('jquery');</code>,这些代码都能在浏览器中很好的执行。这很好的验证了使用externals的情况。</p>
<blockquote><p>想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用</p></blockquote>
<p>那如果想要这样使用<code> import $ from 'jquery'</code>，并且想在Node环境中使用，那么就必须要使用这样<code>    jquery: 'commonjs2 jquery'</code>使用。这样webpack就会把你所需要的模块打包成<code>module.exports = require('jquery')</code>，可以再Node环境中使用。</p>
<p><code>externals</code> 支持以下模块上下文(module context)</p>
<ul>
<li><p><strong>global</strong> - 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。这是 externals 的默认设置。</p></li>
<li><p><strong>commonjs</strong> - 用户(consumer)应用程序可能使用 CommonJS 模块系统，因此外部 library 应该使用 CommonJS 模块系统，并且应该是一个 CommonJS 模块。</p></li>
<li><p><strong>commonjs2</strong> - 类似上面几行，但导出的是 <code>module.exports.default</code>。</p></li>
<li><p><strong>amd</strong> - 类似上面几行，但使用 AMD 模块系统。</p></li>
</ul>
<h3 id="articleHeader2">不同环境设置externals方式</h3>
<ol><li><p>如果你的代码想运行在Node环境中，那么你需要在external中添加前缀commonjs2或者commonjs</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals:{
  react:'commonjs2 react',
  jquery:'commonjs2 jquery'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals:{
  <span class="hljs-attr">react</span>:<span class="hljs-string">'commonjs2 react'</span>,
  <span class="hljs-attr">jquery</span>:<span class="hljs-string">'commonjs2 jquery'</span>
}</code></pre>
<ol><li><p>如果需要requirejs等符合AMD规范的环境中加载，那就要添加amd</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals:{
  react:'amd React',
  jquery:'amd jQuery'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals:{
  <span class="hljs-attr">react</span>:<span class="hljs-string">'amd React'</span>,
  <span class="hljs-attr">jquery</span>:<span class="hljs-string">'amd jQuery'</span>
}</code></pre>
<ol><li><p>如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global。</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals:{
  react:'React',
  jquery:'jQuery'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals:{
  <span class="hljs-attr">react</span>:<span class="hljs-string">'React'</span>,
  <span class="hljs-attr">jquery</span>:<span class="hljs-string">'jQuery'</span>
}</code></pre>
<p>也可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals:[&quot;React&quot;,&quot;jQuery&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">externals:</span>[<span class="hljs-string">"React"</span>,<span class="hljs-string">"jQuery"</span>]</code></pre>
<p>这种方式配置下，就是配置你所引用你的库暴露出的全局变量。上面两种模式下或者说，如果你想运行代码在浏览器中，你所引用的包，必须暴露出一个全局变量。如果没有，这种方式不适合在浏览器下使用，可以尝试dll的方式。</p>
<p>这里你可以看出，不同模式下，value是不一样的。2，3模式下，是要引入去全局变量，1模式是要加载包名。那如果这个包的包名和在浏览器下引入的全局变量一致，上面就可以写成一样了，比如moment。</p>
<h3 id="articleHeader3">
<code>externals</code>和<code>libraryTarget</code>的关系</h3>
<ul>
<li><p>libraryTarget配置如何暴露 library。如果不设置library,那这个library就不暴露。就相当于一个自执行函数</p></li>
<li><p>externals是决定的是以哪种模式去加载所引入的额外的包</p></li>
<li><p>libraryTarget决定了你的library运行在哪个环境，哪个环境也就决定了你哪种模式去加载所引入的额外的包。也就是说，externals应该和libraryTarget保持一致。library运行在浏览器中的，你设置externals的模式为commonjs，那代码肯定就运行不了了。</p></li>
<li><p>如果是应用程序开发，一般是运行在浏览器环境libraryTarget可以不设置，externals默认的模式是global，也就是以全局变量的模式加载所引入外部的库。</p></li>
</ul>
<p>参考：</p>
<p><a href="http://www.css88.com/doc/webpack2/guides/author-libraries" rel="nofollow noreferrer" target="_blank">http://www.css88.com/doc/webp...</a></p>
<p><a href="http://www.css88.com/doc/webpack2/configuration/externals" rel="nofollow noreferrer" target="_blank">http://www.css88.com/doc/webp...</a></p>
<p><a href="http://www.tangshuang.net/3343.html" rel="nofollow noreferrer" target="_blank">http://www.tangshuang.net/334...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack externals 深入理解

## 原文链接
[https://segmentfault.com/a/1190000012113011](https://segmentfault.com/a/1190000012113011)

