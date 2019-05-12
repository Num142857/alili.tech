---
title: 'babel-preset-env：一个帮你配置babel的preset' 
date: 2019-01-20 2:30:11
hidden: true
slug: hv7oi5hpk3u
categories: [reprint]
---

{{< raw >}}

            <p><a href="https://github.com/babel/babel-preset-env/">babel-preset-env</a> 一个帮你配置babel的preset，根据配置的目标环境自动采用需要的babel插件。</p>
<h2>问题  </h2>
<p>目前，几个presets就能让你确定babel应该支持那些功能：</p>
<ul>
<li><code>babel-preset-es2015</code>， <code>babel-preset-es2016</code>等：支持不同版本的ECMAScript规范。 <code>es2015</code> 转译了ES6比ES5的新特性， <code>es2016</code> 转译了ES2016比ES6的新特性等等。</li>
<li><a href="http://babeljs.io/docs/plugins/preset-latest/"><code>babel-preset-latest</code></a>： 支持现有所有ECMAScript版本的新特性，包括处于stage 4里的特性（已经确定的规范，将被添加到下个年度的）。</li>
</ul>
<p>问题是这些presets有时做的多余了，举个例子，大部分现代浏览器已经支持ES6的generators了，但是如果你设置了<code>babel-preset-es2015</code>，generator函数还是会被转译成复杂的ES5代码。</p>
<h2>解决方案 </h2>
<p><code>babel-preset-env</code> 功能类似 <code>babel-preset-latest</code>，优点是它会根据目标环境选择不支持的新特性来转译。</p>
<p>note：实验性的属性（<code>babel-preset-latest</code>不支持的）需要手动安装配置相应的plugins或者presets。这样你再不需要 <code>es20xx</code> presets了。</p>
<h3>浏览器</h3>
<p>你可以选择指定相应的浏览器配置:</p>
<ul>
<li><p>browsers参数在这里查询 <a href="https://github.com/ai/browserslist">browserslist</a> . 举个例子:</p>
<ul>
<li><p>支持每个浏览器最近的两个版本和IE大于等于7的版本所需的polyfill和代码转译。</p>
<pre><code class="hljs prolog"><span class="hljs-string">"babel"</span>: {
  <span class="hljs-string">"presets"</span>: [
    [
      <span class="hljs-string">"env"</span>,
      {
        <span class="hljs-string">"targets"</span>: {
          <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"ie &gt;= 7"</span>]
        }
      }
    ]
  ]
},

</code></pre>
</li>
<li><p>支持市场份额超过5%的浏览器。</p>
<pre><code class="hljs xquery"><span class="hljs-string">"targets"</span>: {
  <span class="hljs-string">"browsers"</span>: <span class="hljs-string">"&gt; 5%"</span>
}

</code></pre>
</li>
</ul>
</li>
<li><p>指定浏览器版本:</p>
<pre><code class="hljs xquery"> <span class="hljs-string">"targets"</span>: {
   <span class="hljs-string">"chrome"</span>: <span class="hljs-number">56</span>
 }

</code></pre>
</li>
</ul>
<h3>Node.js</h3>
<p>如果你通过Babel编译你的Node.js代码，<code>babel-preset-env</code> 很有用，设置 <code>"targets.node"</code> 是 <code>"current"</code>，支持的是当前运行版本的nodejs：</p>
<pre><code class="hljs xquery"><span class="hljs-string">"babel"</span>: {
  <span class="hljs-string">"presets"</span>: [
    [
      <span class="hljs-string">"env"</span>,
      {
        <span class="hljs-string">"targets"</span>: {
          <span class="hljs-string">"node"</span>: <span class="hljs-string">"current"</span>
        }
      }
    ]
  ]
},

</code></pre>
<p>我的GitHub上有个测试node参数的例子，请参考 <a href="https://github.com/rauschma/async-iter-demo"><code>async-iter-demo</code></a>.</p>
<h2>其他配置</h2>
<p>下面会列举 <code>babel-preset-env</code>部分常用配置。所有配置请查看点击 <a href="https://github.com/babel/babel/tree/master/packages/babel-preset-env">env preset</a>； <a href="https://babeljs.cn/docs/plugins/preset-env/">中文版本</a>。</p>
<h3><code>modules</code> (string, 默认值: <code>"commonjs"</code>)</h3>
<p>将ES6模块语法转换为另一种模块类型，可选值:</p>
<ul>
<li>各种流行的模块化规范：<code>"amd"</code>、 <code>"commonjs"</code>、 <code>"systemjs"</code>、 <code>"umd"</code></li>
<li>禁止转译：<code>false</code></li>
</ul>
<h3><code>include</code>, <code>exclude</code> (Array of strings, 默认值: <code>[]</code>)</h3>
<ul>
<li><code>include</code> 必须要转译的功能 (比如 覆盖有故障的本地功能)。跟单独启用相应插件是一样的。</li>
<li><code>exclude</code> 禁止转译的功能。</li>
</ul>
<h3><code>useBuiltIns</code> (boolean, 默认值: <code>false</code>)</h3>
<p>babel为标准库中的新功能提供了polyfill，为内置对象，静态方法，实例方法，生成器函数提供支持。 <code>babel-preset-env</code>可以实现基于特定环境引入需要的polyfill。</p>
<p>两种使用方法:</p>
<ul>
<li><code>core-js</code>， 根据需要引入ES5，ES6+标准方法的实现。<ul>
<li>安装 polyfill: <code>npm install core-js --save</code></li>
<li>引入 polyfill: <code>import "core-js";</code></li>
</ul>
</li>
<li><code>babel-polyfill</code> 包含<code>core-js</code> 和regenerate-runtime (提供 async 语法编译后的运行时环境)。<ul>
<li>安装 polyfill: <code>npm install babel-polyfill --save</code></li>
<li>引入 polyfill: <code>import "babel-polyfill";</code></li>
</ul>
</li>
</ul>
<p>两种方法最终都会根据环境转译成特定的polyfill。 比如:</p>
<pre><code class="hljs xl"><span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/modules/es7.string.pad-start"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/modules/es7.string.pad-end"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/modules/web.timers"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/modules/web.immediate"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"core-js/modules/web.dom.iterable"</span>;

</code></pre>
<p>note:</p>
<ul>
<li>在整个应用里只能引入一次polyfill，可以在 “main” 模块里一次引入。</li>
<li><code>useBuiltIns</code> 会使浏览器下载的代码变少 (最终打包的文件大小变小了)。但是不会节约内存， 因为polyfill本身只会安装缺少的部分。</li>
</ul>
<p>更多polyfill的内容请参考《Setting up ES6》中的章节：“<a href="https://leanpub.com/setting-up-es6/read#ch_babel-helpers-standard-library">Babel: configuring standard library and helpers</a>”</p>
<h3><code>debug</code> (boolean, default: <code>false</code>)</h3>
<p>以下内容都会用<code>console.log</code>输出 :</p>
<ul>
<li>目标环境</li>
<li>启用的transforms</li>
<li>启用的plugins</li>
<li>启用的polyfills</li>
</ul>
<p>尝试下面的示例，瞧瞧console输出。</p>
<h3>举例</h3>
<p>下面的例子选自preset的readme文件:</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"presets"</span>: [
    [ <span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"targets"</span>: {
        <span class="hljs-attr">"safari"</span>: <span class="hljs-number">10</span>
      },
      <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">"useBuiltIns"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">"debug"</span>: <span class="hljs-literal">true</span>
    }]
  ]
}

</code></pre>
<p>模块不会被转译，可以将imports和exports让webpack去处理。</p>
<p> <code>debug</code> 的输出如下:</p>
<pre><code class="hljs stylus">Using targets:
{
  <span class="hljs-string">"safari"</span>: <span class="hljs-number">10</span>
}

Modules <span class="hljs-attribute">transform</span>: false

Using plugins:
  <span class="hljs-attribute">transform</span>-exponentiation-operator {}
  <span class="hljs-attribute">transform</span>-async-to-generator {}

Using polyfills:
  es7<span class="hljs-selector-class">.object</span><span class="hljs-selector-class">.values</span> {}
  es7<span class="hljs-selector-class">.object</span><span class="hljs-selector-class">.entries</span> {}
  es7<span class="hljs-selector-class">.object</span><span class="hljs-selector-class">.get-own-property-descriptors</span> {}
  web<span class="hljs-selector-class">.timers</span> {}
  web<span class="hljs-selector-class">.immediate</span> {}
  web<span class="hljs-selector-class">.dom</span><span class="hljs-selector-class">.iterable</span> {}

</code></pre>
<h2> env是如何基于目标环境去匹配哪些是需要转译的?  </h2>
<p>根据以下外部数据来确定目标环境支持的情况，可以定期执行<a href="https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js">build-data.js</a> 来生成 <a href="https://github.com/babel/babel-preset-env/blob/master/data/plugins.json">plugins.json</a>。</p>
<ul>
<li>ECMAScript标准兼容性列表 <a href="https://github.com/kangax/compat-table">compat-table</a>。</li>
<li>plugins包含特性列表 <a href="https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js"><code>plugin-features.js</code></a>。</li>
<li><a href="https://github.com/ai/browserslist">browserslist</a> </li>
</ul>
<h2>下一步还能做什么?  </h2>
<h3>有可以访问‘环境’ 的插件</h3>
<p>未来计划让插件拥有检查当前环境具有什么可能性的能力，两个好处:</p>
<ul>
<li><p>一些plugins (<a href="https://babeljs.io/docs/plugins/transform-object-rest-spread/#options">比如对象扩展运算符</a>) 目前通过选项告诉他们是否使用本地功能或polyfills。如果能知道当前 “环境”，就不需要配置了。</p>
</li>
<li><p>基于babel的minifiers可以确定是否可以输出。比如，箭头函数。</p>
</li>
</ul>
<h3>简化presets</h3>
<ul>
<li><p>基于ECMAScript版本的Presets (<code>es2015</code> 等)很多已经过时了 。Babel团队考虑会在未来的版本中移除他们 (比如， 通过废弃处理)。</p>
</li>
<li><p>基于TC39不同阶段的提案的Presets (<code>stage-0，1，2，3</code>等) 也是去除的候选，因为在这些statges中的标准是不断变化的。提案可以在2个月内改变。因此，直接引用一些实验性的plugins会是更好的选择。</p>
</li>
</ul>
<h2>感谢  </h2>
<ul>
<li>感谢 <a href="https://twitter.com/left_pad">Henry Zhu</a> 为此博客的输出</li>
</ul>
<h2>延伸阅读</h2>
<ul>
<li><a href="https://github.com/babel/babel-preset-env/blob/master/README.md">babel-preset-env的readme</a></li>
<li>“<a href="http://exploringjs.com/setting-up-es6.html">Setting up ES6</a>” (Babel 6+配置)</li>
</ul>
<hr>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
babel-preset-env：一个帮你配置babel的preset

## 原文链接
[https://www.zcfy.cc/article/babel-preset-env-a-preset-that-configures-babel-for-you](https://www.zcfy.cc/article/babel-preset-env-a-preset-that-configures-babel-for-you)

