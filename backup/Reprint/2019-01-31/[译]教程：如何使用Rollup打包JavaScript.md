---
title: '[译]教程：如何使用Rollup打包JavaScript' 
date: 2019-01-31 2:31:16
hidden: true
slug: tosbjv63d4g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">教程：如何使用Rollup打包JavaScript</h2>
<p>通过这个系列教程一步一步学习如何使用更小更快的Rollup取代webpack和Browserify打包JavaScript文件。</p>
<p>这周，我们要使用Rollup构建我们的第一个项目，Rollup是一个打包JavaScript(和样式，不过下周才会做)的构建工具。</p>
<p>通过这个教程，我们的Rollup将能够：</p>
<ul>
<li><p>合并scripts代码，</p></li>
<li><p>删除多余代码，</p></li>
<li><p>编译成对旧浏览器友好的代码，</p></li>
<li><p>支持在浏览器中使用Node模块，</p></li>
<li><p>能使用环境变量，</p></li>
<li><p>尽可能的压缩，减少文件大小。</p></li>
</ul>
<h2 id="articleHeader1">准备工作</h2>
<ul>
<li><p>至少懂一点JavaScript的话将会更好理解。</p></li>
<li><p>对<a href="https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch3.md#modules" rel="nofollow noreferrer" target="_blank">ES2015 modules</a>有基本了解，不过不了解也无妨。</p></li>
<li><p>在你的设备上要有npm。(还没有？<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">在这下载Node.js</a>)</p></li>
</ul>
<h2 id="articleHeader2">Rollup是什么？</h2>
<p>用他们自己的话说：</p>
<p>Rollup是下一代JavaScript模块打包工具。开发者可以在你的应用或库中使用ES2015模块，然后高效地将它们打包成一个单一文件用于浏览器和Node.js使用。</p>
<p>和Browserify和webpack很像。</p>
<p>你也可以称Rollup是一个构建工具，可以和像Grunt和Gulp等一起配置使用。但是，需要注意的一点是当你使用Grunt和Gulp来处理像打包JavaScript这样的任务时，这些工具的底层还是使用了像Rollup，Browserify或webpack这些东西。</p>
<h2 id="articleHeader3">为什么应该关注Rollup？</h2>
<p>Rollup最令人激动的地方，就是能让打包文件体积很小。这么说很难理解，更详细的解释：相比其他JavaScript打包工具，Rollup总能打出更小，更快的包。</p>
<p>因为Rollup基于ES2015模块，比webpack和Browserify使用的CommonJS模块机制更高效。这也让Rollup从模块中删除无用的代码，即<code>tree-shaking</code>变得更容易。</p>
<p>当我们引入拥有大量函数和方法的三方工具或者框架时<code>tree-shaking</code>会变得很重要。想想<code>lodash</code>或者<code>jQuery</code>，如果我们只使用一个或者两个方法，就会因为加载其余内容而产生大量无用的开销。</p>
<p>Browserify和webpack就会包含大量无用的代码。但是Rollup不会 - 它只会包括我们真正用到的东西。</p>
<blockquote><p>更新 (2016-08-22): 澄清一下，Rollup只能对ES模块上进行tree-shaking。CommonJS模块 - 像lodash和jQuery那样写的模块不能进行tree-shaking。然而，tree-shaking不是Rollup在速度/性能上唯一的优势。可以看<a href="https://www.reddit.com/r/javascript/comments/4yprc5/how_to_bundle_javascript_with_rollup_stepbystep/d6qzgzm" rel="nofollow noreferrer" target="_blank">Rich Harris的解释</a>和<a href="https://www.reddit.com/r/javascript/comments/4yprc5/how_to_bundle_javascript_with_rollup_stepbystep/d6qzmgh?context=3" rel="nofollow noreferrer" target="_blank">Nolan Lawson的补充</a>了解更多。</p></blockquote>
<p>还有一个大新闻。</p>
<blockquote><p>注意: 由于Rollup很高效，webpack 2 也将支持tree-shaking。</p></blockquote>
<h2 id="articleHeader4">Part I: 如何使用Rollup处理并打包JavaScript文件</h2>
<p>为了展示Rollup如何使用，让我们通过构建一个简单的项目来走一遍使用Rollup打包JavaScript的过程。</p>
<h4>STEP 0: 创建一个包含将被编译的JavaScript和CSS的项目.</h4>
<p>为了开始工作，我们需要一些用来处理的代码。这个教程里，我们将用一个小应用，可从<a href="https://github.com/jlengstorf/learn-rollup" rel="nofollow noreferrer" target="_blank">GitHub</a>获取。</p>
<p>目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="learn-rollup/
├── src/
│   ├── scripts/
│   │   ├── modules/
│   │   │   ├── mod1.js
│   │   │   └── mod2.js
│   │   └── main.js
│   └── styles/
│       └── main.css
└── package.json
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>learn-rollup/
├── src/
│   ├── scripts/
│   │   ├── modules/
│   │   │   ├── mod1<span class="hljs-selector-class">.js</span>
│   │   │   └── mod2<span class="hljs-selector-class">.js</span>
│   │   └── main<span class="hljs-selector-class">.js</span>
│   └── styles/
│       └── main<span class="hljs-selector-class">.css</span>
└── package<span class="hljs-selector-class">.json</span>
</code></pre>
<p>你可以在终端执行下面的命令下载这个应用，我们将在这个教程中使用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Move to the folder where you keep your dev projects.
cd /path/to/your/projects

# Clone the starter branch of the app from GitHub.
git clone -b step-0 --single-branch https://github.com/jlengstorf/learn-rollup.git

# The files are downloaded to /path/to/your/projects/learn-rollup/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-comment"># Move to the folder where you keep your dev projects.</span>
cd <span class="hljs-regexp">/path/</span>to<span class="hljs-regexp">/your/</span>projects

<span class="hljs-comment"># Clone the starter branch of the app from GitHub.</span>
git clone -b step-<span class="hljs-number">0</span> --single-branch https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/jlengstorf/</span>learn-rollup.git

<span class="hljs-comment"># The files are downloaded to /path/to/your/projects/learn-rollup/</span>
</code></pre>
<h4>STEP 1: 安装Rollup并且创建配置文件。</h4>
<p>第一步，执行下面的命令安装Rollup：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev rollup
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> rollup
</code></pre>
<p>然后，在<code>learn-rollup</code>文件夹下新建<code>rollup.config.js</code>。在文件中添加如下内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">entry</span>: <span class="hljs-string">'src/scripts/main.js'</span>,
  dest: <span class="hljs-string">'build/js/main.min.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  sourceMap: <span class="hljs-string">'inline'</span>,
};
</code></pre>
<p>说说每个配置项实际上做了什么：</p>
<ul>
<li><p><code>entry</code> — 希望Rollup处理的文件路径。大多数应用中，它将是入口文件，初始化所有东西并启动应用。</p></li>
<li><p><code>dest</code> — 编译完的文件需要被存放的路径。</p></li>
<li><p><code>format</code> — Rollup支持多种输出格式。因为我们是要在浏览器中使用，需要使用立即执行函数表达式(IIFE)[注1]</p></li>
<li><p><code>sourceMap</code> — 调试时sourcemap是非常有用的。这个配置项会在生成文件中添加一个sourcemap，让开发更方便。</p></li>
</ul>
<blockquote><p>NOTE: 对于其他的<code>format</code>选项以及你为什么需要他们，看<a href="https://github.com/rollup/rollup/wiki/JavaScript-API#format" rel="nofollow noreferrer" target="_blank">Rollup’s wiki</a>。</p></blockquote>
<h4>测试Rollup配置</h4>
<p>当创建好配置文件后，在终端执行下面的命令测试每项配置是否工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/rollup -c
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>./node_modules/.<span class="hljs-keyword">bin/rollup </span>-c
</code></pre>
<p>在你的项目下会出现一个<code>build</code>目录，包含<code>js</code>子目录，子目录中包含生成的<code>main.min.js</code>文件。</p>
<p>在浏览器中打开<code>build/index.html</code>可以看到打包文件正确生成了。</p>
<p>完成第一步后我们的示例项目的状态。</p>
<blockquote><p>注意：现在，只有现代浏览器下不会报错。为了能够在不支持ES2015/ES6的老浏览器中运行，我们需要添加一些插件。</p></blockquote>
<h4>看看打包出来的文件</h4>
<p>事实上Rollup强大是因为它使用了“tree-shaking”，可以在你引入的模块中删除没有用的代码。举个例子，在<code>src/scripts/modules/mod1.js</code>中的<code>sayGoodbyeTo()</code>函数在我们的应用中并没有使用 - 而且因为它从不会被使用，Rollup不会将它打包到bundle中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
'use strict';

/**
 * Says hello.
 * @param  {String} name a name
 * @return {String}      a greeting for `name`
 */
function sayHelloTo( name ) {
  const toSay = `Hello, ${name}!`;

  return toSay;
}

/**
 * Adds all the values in an array.
 * @param  {Array} arr an array of numbers
 * @return {Number}    the sum of all the array values
 */
const addArray = arr => {
  const result = arr.reduce((a, b) => a + b, 0);

  return result;
};

// Import a couple modules for testing.
// Run some functions from our imported modules.
const result1 = sayHelloTo('Jason');
const result2 = addArray([1, 2, 3, 4]);

// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0];

printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}`;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">/**
 * Says hello.
 * @param  {String} name a name
 * @return {String}      a greeting for `name`
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHelloTo</span>(<span class="hljs-params"> name </span>) </span>{
  <span class="hljs-keyword">const</span> toSay = <span class="hljs-string">`Hello, <span class="hljs-subst">${name}</span>!`</span>;

  <span class="hljs-keyword">return</span> toSay;
}

<span class="hljs-comment">/**
 * Adds all the values in an array.
 * @param  {Array} arr an array of numbers
 * @return {Number}    the sum of all the array values
 */</span>
<span class="hljs-keyword">const</span> addArray = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> result = arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> result;
};

<span class="hljs-comment">// Import a couple modules for testing.</span>
<span class="hljs-comment">// Run some functions from our imported modules.</span>
<span class="hljs-keyword">const</span> result1 = sayHelloTo(<span class="hljs-string">'Jason'</span>);
<span class="hljs-keyword">const</span> result2 = addArray([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]);

<span class="hljs-comment">// Print the results on the page.</span>
<span class="hljs-keyword">const</span> printTarget = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'debug__output'</span>)[<span class="hljs-number">0</span>];

printTarget.innerText = <span class="hljs-string">`sayHelloTo('Jason') =&gt; <span class="hljs-subst">${result1}</span>\n\n`</span>
printTarget.innerText += <span class="hljs-string">`addArray([1, 2, 3, 4]) =&gt; <span class="hljs-subst">${result2}</span>`</span>;

}());
<span class="hljs-comment">//# sourceMappingURL=data:application/json;charset=utf-8;base64,...</span>
</code></pre>
<p>其他的构建工具则不是这样的，所以如果我们引入了一个像lodash这样一个很大的库而只是使用其中一两个函数时，我们的包文件会变得非常大。</p>
<p>比如使用<a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a>的话，<code>sayGoodbyeTo()</code>也会打包进去，产生的打包文件比Rollup生成的大了两倍多。</p>
<h4>STEP 2: 配置babel支持JavaScript新特性。</h4>
<p>现在我们已经得到能在现代浏览器中运行的包文件了，但是在一些旧版本浏览器中就会崩溃 - 这并不理想。</p>
<p>幸运的是，<a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a>已发布了。这个项目<a href="https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them" rel="nofollow noreferrer" target="_blank">编译</a>JavaScript新特性(<a href="https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch1.md" rel="nofollow noreferrer" target="_blank">ES6/ES2015等等</a>)到ES5, 差不多在今天的任何浏览器上都能运行。</p>
<p>如果你还没用过Babel，那么你的开发生涯要永远地改变了。使用JavaScript的新方法让语言更简单，更简洁而且整体上更友好。</p>
<p>那么让我们为Rollup加上这个过程，就不用担心上面的问题了。</p>
<h4>INSTALL THE NECESSARY MODULES.</h4>
<h4>安装必要模块</h4>
<p>首先，我们需要安装<a href="https://github.com/rollup/rollup-plugin-babel" rel="nofollow noreferrer" target="_blank">Babel Rollup plugin</a>和适当的<a href="https://github.com/rollup/babel-preset-es2015-rollup" rel="nofollow noreferrer" target="_blank">Babel preset</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Install Rollup’s Babel plugin.
npm install --save-dev rollup-plugin-babel

# Install the Babel preset for transpiling ES2015 using Rollup.
npm install --save-dev babel-preset-es2015-rollup
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-comment"># Install Rollup’s Babel plugin.</span>
npm <span class="hljs-keyword">install </span>--save-dev rollup-plugin-<span class="hljs-keyword">babel
</span>
<span class="hljs-comment"># Install the Babel preset for transpiling ES2015 using Rollup.</span>
npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-preset-es2015-rollup
</span></code></pre>
<blockquote><p>提示: Babel preset是告诉Babel我们实际需要哪些babel插件的集合。</p></blockquote>
<h4>创建<code>.babelrc</code>
</h4>
<p>然后，在项目根目录(<code>learn-rollup/</code>)下创建一个<code>.babelrc</code>文件。在文件中添加下面的JSON：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015-rollup&quot;],
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015-rollup"</span>],
}
</code></pre>
<p>它会告诉Babel在转换时哪些preset将会用到。</p>
<h4>更新<code>rollup.config.js</code>
</h4>
<p>为了让它能真正工作，我们需要更新<code>rollup.config.js</code>。</p>
<p>在文件中，<code>import</code>Babel插件，将它添加到新配置属性<code>plugins</code>中，这个属性接收一个插件组成的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Rollup plugins
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// Rollup plugins</span>
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;

export <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'src/scripts/main.js'</span>,
  dest: <span class="hljs-string">'build/js/main.min.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  sourceMap: <span class="hljs-string">'inline'</span>,
  plugins: [
    babel({
      <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
    }),
  ],
};
</code></pre>
<p>为避免编译三方脚本，通过设置<code>exclude</code>属性忽略<code>node_modules</code>目录。</p>
<h4>检查输出文件</h4>
<p>全部都安装并配置好后，重新打包一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/rollup -c
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>./node_modules/.<span class="hljs-keyword">bin/rollup </span>-c
</code></pre>
<p>再看一下输出结果，大部分是一样的。但是有一些地方不一样：比如，<code>addArray()</code>这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addArray = function addArray(arr) {
  var result = arr.reduce(function (a, b) {
    return a + b;
  }, 0);

  return result;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> addArray = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addArray</span><span class="hljs-params">(arr)</span> </span>{
  <span class="hljs-keyword">var</span> result = arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(a, b)</span> </span>{
    <span class="hljs-keyword">return</span> a + b;
  }, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> result;
};
</code></pre>
<p>Babel是如何将<a href="https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/" rel="nofollow noreferrer" target="_blank">箭头函数</a><code>(arr.reduce((a, b) =&gt; a + b, 0))</code>转换成一个普通函数的呢？</p>
<p>这就是编译的意义：结果是相同的，但是现在的代码可以向后支持到IE9.</p>
<blockquote><p>注意: Babel也提供了<a href="https://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">babel-polyfill</a>,使得像<code>Array.prototype.reduce()</code>这些方法在IE8甚至更早的浏览器也能使用。</p></blockquote>
<h4>STEP 3: 添加ESLint检查常规JavaScript错误</h4>
<p>在你的项目中使用linter是个好主意，因为它强制统一了代码风格并且能帮你发现很难找到的bug，比如花括号或者圆括号。</p>
<p>在这个项目中，我们将使用<a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank">ESLint</a>。</p>
<h4>安装模块</h4>
<p>为使用ESLint，我们需要安装<a href="https://github.com/TrySound/rollup-plugin-eslint" rel="nofollow noreferrer" target="_blank">ESLint Rollup plugin</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev rollup-plugin-eslint
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> rollup-plugin-eslint
</code></pre>
<h4>生成一个<code>.eslintrc.json</code>
</h4>
<p>为确保我们只得到我们想检测的错误，首先要配置ESLint。很幸运，我们可以通过执行下面的命令自动生成大多数配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/.bin/eslint --init
? How would you like to configure ESLint? Answer questions about your style
? Are you using ECMAScript 6 features? Yes
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? No
? Do you use JSX? No
? What style of indentation do you use? Spaces
? What quotes do you use for strings? Single
? What line endings do you use? Unix
? Do you require semicolons? Yes
? What format do you want your config file to be in? JSON
Successfully created .eslintrc.json file in /Users/jlengstorf/dev/code.lengstorf.com/projects/learn-rollup
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ ./node_modules/.bin/eslint <span class="hljs-comment">--init</span>
? How would you like to configure ESLint? Answer questions about your style
? Are you using ECMAScript 6 features? Yes
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? <span class="hljs-keyword">Do</span> you <span class="hljs-keyword">use</span> CommonJS? <span class="hljs-keyword">No</span>
? <span class="hljs-keyword">Do</span> you <span class="hljs-keyword">use</span> JSX? <span class="hljs-keyword">No</span>
? What <span class="hljs-keyword">style</span> <span class="hljs-keyword">of</span> indentation <span class="hljs-keyword">do</span> you <span class="hljs-keyword">use</span>? Spaces
? What quotes <span class="hljs-keyword">do</span> you <span class="hljs-keyword">use</span> <span class="hljs-keyword">for</span> strings? Single
? What line endings <span class="hljs-keyword">do</span> you <span class="hljs-keyword">use</span>? Unix
? <span class="hljs-keyword">Do</span> you require semicolons? Yes
? What <span class="hljs-keyword">format</span> <span class="hljs-keyword">do</span> you want your config <span class="hljs-keyword">file</span> <span class="hljs-keyword">to</span> be <span class="hljs-keyword">in</span>? <span class="hljs-keyword">JSON</span>
Successfully created .eslintrc.json <span class="hljs-keyword">file</span> <span class="hljs-keyword">in</span> /<span class="hljs-keyword">Users</span>/jlengstorf/dev/code.lengstorf.com/projects/learn-<span class="hljs-keyword">rollup</span>
</code></pre>
<p>如果你按上面展示的那样回答问题，你将在生成的<code>.eslintrc.json</code>中得到下面的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;env&quot;: {
    &quot;browser&quot;: true,
    &quot;es6&quot;: true
  },
  &quot;extends&quot;: &quot;eslint:recommended&quot;,
  &quot;parserOptions&quot;: {
    &quot;sourceType&quot;: &quot;module&quot;
  },
  &quot;rules&quot;: {
    &quot;indent&quot;: [
      &quot;error&quot;,
      4
    ],
    &quot;linebreak-style&quot;: [
      &quot;error&quot;,
      &quot;unix&quot;
    ],
    &quot;quotes&quot;: [
      &quot;error&quot;,
      &quot;single&quot;
    ],
    &quot;semi&quot;: [
      &quot;error&quot;,
      &quot;always&quot;
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"browser"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"es6"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"eslint:recommended"</span>,
  <span class="hljs-attr">"parserOptions"</span>: {
    <span class="hljs-attr">"sourceType"</span>: <span class="hljs-string">"module"</span>
  },
  <span class="hljs-attr">"rules"</span>: {
    <span class="hljs-attr">"indent"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-number">4</span>
    ],
    <span class="hljs-attr">"linebreak-style"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"unix"</span>
    ],
    <span class="hljs-attr">"quotes"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"single"</span>
    ],
    <span class="hljs-attr">"semi"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"always"</span>
    ]
  }
}
</code></pre>
<h4>修改<code>.eslintrc.json</code>
</h4>
<p>然而我们需要改动两个地方来避免项目报错。</p>
<ul>
<li><p>使用2空格代替4空格。</p></li>
<li><p>后面会使用到<code>ENV</code>这个全局变量，因此要把它加入白名单中。</p></li>
</ul>
<p>在<code>.eslintrc.json</code>进行如下修改 — 添加<code>globals</code>属性并修改<code>indent</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;env&quot;: {
    &quot;browser&quot;: true,
    &quot;es6&quot;: true
  },
  &quot;globals&quot;: {
    &quot;ENV&quot;: true
  },
  &quot;extends&quot;: &quot;eslint:recommended&quot;,
  &quot;parserOptions&quot;: {
    &quot;sourceType&quot;: &quot;module&quot;
  },
  &quot;rules&quot;: {
    &quot;indent&quot;: [
      &quot;error&quot;,
      2
    ],
    &quot;linebreak-style&quot;: [
      &quot;error&quot;,
      &quot;unix&quot;
    ],
    &quot;quotes&quot;: [
      &quot;error&quot;,
      &quot;single&quot;
    ],
    &quot;semi&quot;: [
      &quot;error&quot;,
      &quot;always&quot;
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"browser"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"es6"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">"globals"</span>: {
    <span class="hljs-attr">"ENV"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"eslint:recommended"</span>,
  <span class="hljs-attr">"parserOptions"</span>: {
    <span class="hljs-attr">"sourceType"</span>: <span class="hljs-string">"module"</span>
  },
  <span class="hljs-attr">"rules"</span>: {
    <span class="hljs-attr">"indent"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-number">2</span>
    ],
    <span class="hljs-attr">"linebreak-style"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"unix"</span>
    ],
    <span class="hljs-attr">"quotes"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"single"</span>
    ],
    <span class="hljs-attr">"semi"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"always"</span>
    ]
  }
}
</code></pre>
<h4>更新<code>rollup.config.js</code>
</h4>
<p>然后，引入ESLint插件并添加到Rollup配置中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// Rollup plugins</span>
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;
<span class="hljs-keyword">import</span> eslint <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-eslint'</span>;

export <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'src/scripts/main.js'</span>,
  dest: <span class="hljs-string">'build/js/main.min.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  sourceMap: <span class="hljs-string">'inline'</span>,
  plugins: [
    babel({
      <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
    }),
    eslint({
      <span class="hljs-keyword">exclude</span>: [
        <span class="hljs-string">'src/styles/**'</span>,
      ]
    }),
  ],
};
</code></pre>
<h4>检查控制台输出</h4>
<p>第一次，当执行<code>./node_modules/.bin/rollup -c</code>时，似乎什么都没发生。因为这表示应用的代码通过了linter，没有问题。</p>
<p>但是如果我们制造一个错误 - 比如删除一个分号 - 我们会看到ESLint是如何提示的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/.bin/rollup -c

/Users/jlengstorf/dev/code.lengstorf.com/projects/learn-rollup/src/scripts/main.js
  12:64  error  Missing semicolon  semi

✖ 1 problem (1 error, 0 warnings)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>$ ./node_modules/.bin/rollup -c

/Users/jlengstorf/dev/<span class="hljs-selector-tag">code</span><span class="hljs-selector-class">.lengstorf</span><span class="hljs-selector-class">.com</span>/projects/learn-rollup/src/scripts/main<span class="hljs-selector-class">.js</span>
  <span class="hljs-number">12</span>:<span class="hljs-number">64</span>  error  Missing semicolon  semi

✖ <span class="hljs-number">1</span> problem (<span class="hljs-number">1</span> error, <span class="hljs-number">0</span> warnings)
</code></pre>
<p>一些包含潜在风险和解释神秘bug的东西立刻出现了，包括出现问题的文件，行和列。</p>
<p>但是它不能排除我们调试时的所有问题，很多由于拼写错误和疏漏产生的bug还是要自己花时间去解决。</p>
<h4>STEP 4: 添加插件处理非ES模块</h4>
<p>如果你的依赖中有任何使用Node风格的模块这个插件就很重要。如果没有它，你会得到关于<code>require</code>的错误。</p>
<h4>添加一个Node模块作为依赖</h4>
<p>在这个小项目中不引用三方模块很正常，但实际项目中不会如此。所以为了让我们的Rollup配置变得真正可用，需要保证在我们的代码中也能引用是三方模块。</p>
<p>举个简单的例子，我们将使用<a href="https://www.npmjs.com/package/debug" rel="nofollow noreferrer" target="_blank">debug</a>包添加一个简单的日志打印器到项目中。先安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save debug
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>npm install --<span class="hljs-keyword">save</span> <span class="hljs-keyword">debug</span>
</code></pre>
<blockquote><p>注意：因为它是会在主程序中引用的，应该使用<code>--save</code>参数，可以避免在生产环境下出现错误，因为<code>devDependencies</code>在生产环境下不会被安装。</p></blockquote>
<p>然后在<code>src/scripts/main.js</code>中添加一个简单的日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Import a couple modules for testing.
import { sayHelloTo } from './modules/mod1';
import addArray from './modules/mod2';

// Import a logger for easier debugging.
import debug from 'debug';
const log = debug('app:log');

// Enable the logger.
debug.enable('*');
log('Logging is enabled!');

// Run some functions from our imported modules.
const result1 = sayHelloTo('Jason');
const result2 = addArray([1, 2, 3, 4]);

// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0];

printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`;
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}`;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Import a couple modules for testing.</span>
<span class="hljs-keyword">import</span> { sayHelloTo } <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/mod1'</span>;
<span class="hljs-keyword">import</span> addArray <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/mod2'</span>;

<span class="hljs-comment">// Import a logger for easier debugging.</span>
<span class="hljs-keyword">import</span> debug <span class="hljs-keyword">from</span> <span class="hljs-string">'debug'</span>;
<span class="hljs-keyword">const</span> log = debug(<span class="hljs-string">'app:log'</span>);

<span class="hljs-comment">// Enable the logger.</span>
debug.enable(<span class="hljs-string">'*'</span>);
log(<span class="hljs-string">'Logging is enabled!'</span>);

<span class="hljs-comment">// Run some functions from our imported modules.</span>
<span class="hljs-keyword">const</span> result1 = sayHelloTo(<span class="hljs-string">'Jason'</span>);
<span class="hljs-keyword">const</span> result2 = addArray([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]);

<span class="hljs-comment">// Print the results on the page.</span>
<span class="hljs-keyword">const</span> printTarget = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'debug__output'</span>)[<span class="hljs-number">0</span>];

printTarget.innerText = <span class="hljs-string">`sayHelloTo('Jason') =&gt; <span class="hljs-subst">${result1}</span>\n\n`</span>;
printTarget.innerText += <span class="hljs-string">`addArray([1, 2, 3, 4]) =&gt; <span class="hljs-subst">${result2}</span>`</span>;
</code></pre>
<p>到此一切都很好，但是当运行rollup时会得到一个警告：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/.bin/rollup -c
Treating 'debug' as external dependency
No name was provided for external module 'debug' in options.globals – guessing 'debug'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>$ ./node_modules/.bin/rollup -c
Treating <span class="hljs-string">'debug'</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">external</span> dependency
No <span class="hljs-keyword">name</span> was provided <span class="hljs-keyword">for</span> <span class="hljs-keyword">external</span> module <span class="hljs-string">'debug'</span> <span class="hljs-keyword">in</span> options.globals – guessing <span class="hljs-string">'debug'</span>
</code></pre>
<p>而且如果在查看<code>index.html</code>，会发现一个<code>ReferenceError</code>抛出了：</p>
<blockquote><p>默认情况下，三方的Node模块无法在Rollup中正确加载。</p></blockquote>
<p>哦，真糟糕。完全无法运行。</p>
<p>因为Node模块使用<a href="http://wiki.commonjs.org/wiki/Modules/1.1" rel="nofollow noreferrer" target="_blank">CommonJS</a>，无法与Rollup直接兼容。为解决这个问题，需要添加一组处理Node模块和CommonJS模块的插件。</p>
<h4>安装模块</h4>
<p>围绕这个问题，我们将在Rollup中新增两个插件：</p>
<ul>
<li><p><a href="https://github.com/rollup/rollup-plugin-node-resolve" rel="nofollow noreferrer" target="_blank">rollup-plugin-node-resolve</a>，运行加载<code>node_modules</code>中的三方模块。</p></li>
<li><p><a href="https://github.com/rollup/rollup-plugin-commonjs" rel="nofollow noreferrer" target="_blank">rollup-plugin-commonjs</a>，将CommonJS模块转换成ES6，防止他们在Rollup中失效。</p></li>
</ul>
<p>通过下面的命令安装两个插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev rollup-plugin-node-resolve rollup-plugin-commonjs
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm install --save-dev rollup-plugin-<span class="hljs-keyword">node</span><span class="hljs-title">-resolve</span> rollup-plugin-commonjs
</code></pre>
<h4>更新<code>rollup.config.js.</code>
</h4>
<p>然后，引入插件并添加进Rollup配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// Rollup plugins</span>
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;
<span class="hljs-keyword">import</span> eslint <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-eslint'</span>;
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>;

export <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'src/scripts/main.js'</span>,
  dest: <span class="hljs-string">'build/js/main.min.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  sourceMap: <span class="hljs-string">'inline'</span>,
  plugins: [
    resolve({
      jsnext: <span class="hljs-keyword">true</span>,
      main: <span class="hljs-keyword">true</span>,
      browser: <span class="hljs-keyword">true</span>,
    }),
    commonjs(),
    eslint({
      <span class="hljs-keyword">exclude</span>: [
        <span class="hljs-string">'src/styles/**'</span>,
      ]
    }),
    babel({
      <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
    }),
  ],
};
</code></pre>
<blockquote><p>注意: <code>jsnext</code>属性是为了帮助<a href="https://github.com/rollup/rollup/wiki/jsnext:main" rel="nofollow noreferrer" target="_blank">Node模块迁移到ES2015</a>的一部分。<code>main</code>和<code>browser</code> 属性帮助插件决定哪个文件应该被bundle文件使用。</p></blockquote>
<h4>检查控制台输出</h4>
<p>执行<code>./node_modules/.bin/rollup -c</code>重新打包，然后再检查浏览器输出：</p>
<p>成功了！日志现在打印出来了。</p>
<h4>STEP 5: 添加插件替换环境变量</h4>
<p>环境变量使开发流程更强大，让我们有能力做一些事情，比如打开或关闭日志，注入仅在开发环境使用的脚本等等。</p>
<p>那么让Rollup支持这些功能吧。</p>
<h4>在<code>main.js</code>中添加<code>ENV</code>变量</h4>
<p>让我们通过一个环境变量控制日志脚本，让日志脚本只能在非生产环境下使用。在<code>src/scripts/main.js</code>中修改<code>log()</code>的初始化方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Import a logger for easier debugging.
import debug from 'debug';
const log = debug('app:log');

// The logger should only be disabled if we’re not in production.
if (ENV !== 'production') {

  // Enable the logger.
  debug.enable('*');
  log('Logging is enabled!');
} else {
  debug.disable();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// Import a logger for easier debugging.</span>
import <span class="hljs-keyword">debug</span> from '<span class="hljs-keyword">debug</span>';
const <span class="hljs-built_in">log</span> = <span class="hljs-keyword">debug</span>('app:<span class="hljs-built_in">log</span>');

<span class="hljs-comment">// The logger should only be disabled if we’re not in production.</span>
<span class="hljs-keyword">if</span> (ENV !== 'production') {

  <span class="hljs-comment">// Enable the logger.</span>
  <span class="hljs-keyword">debug</span>.<span class="hljs-keyword">enable</span>('*');
  <span class="hljs-built_in">log</span>('Logging is enabled!');
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">debug</span>.<span class="hljs-keyword">disable</span>();
}
</code></pre>
<p>然而，重新打包(<code>./node_modules/.bin/rollup -c</code>)后检查浏览器，会看到一个<code>ENV</code>的<code>ReferenceError</code>。</p>
<p>不必惊讶，因为我们没有在任何地方定义它。如果我们尝试<code>ENV=production ./node_modules/.bin/rollup -c</code>，还是不会成功。因为那样设置的环境变量只是在Rollup中可用，不是在Rollup打包的bundle中可用。</p>
<p>我们需要使用一个插件将环境变量传入bundle。</p>
<h4>安装模块</h4>
<p>安装<a href="https://github.com/rollup/rollup-plugin-replace" rel="nofollow noreferrer" target="_blank">rollup-plugin-replace</a>插件，它本质上只是做了查找-替换的工作。它能做很多事情，但现在我们只需要让它简单地找到出现的环境变量并将其替换成实际的值。（比如，所有在bundle出现的<code>ENV</code>变量都会被替换成<code>"production"</code> ）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev rollup-plugin-replace
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>npm install --<span class="hljs-keyword">save</span>-dev rollup-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">replace</span>
</code></pre>
<h4>更新<code>rollup.config.js</code>
</h4>
<p>在<code>rollup.config.js</code>中引入插件并且添加到插件列表中。</p>
<p>配置非常简单：只需添加一个键值对的列表，<code>key</code>是将被替换的字符串，<code>value</code>是应该被替换成的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// Rollup plugins</span>
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;
<span class="hljs-keyword">import</span> eslint <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-eslint'</span>;
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>;
<span class="hljs-keyword">import</span> replace <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-replace'</span>;

export <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'src/scripts/main.js'</span>,
  dest: <span class="hljs-string">'build/js/main.min.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  sourceMap: <span class="hljs-string">'inline'</span>,
  plugins: [
    resolve({
      jsnext: <span class="hljs-keyword">true</span>,
      main: <span class="hljs-keyword">true</span>,
      browser: <span class="hljs-keyword">true</span>,
    }),
    commonjs(),
    eslint({
      <span class="hljs-keyword">exclude</span>: [
        <span class="hljs-string">'src/styles/**'</span>,
      ]
    }),
    babel({
      <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
    }),
    replace({
      <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
      ENV: JSON.stringify(process.env.NODE_ENV || <span class="hljs-string">'development'</span>),
    }),
  ],
};
</code></pre>
<p>在我们的配置中，将找打所有出现的<code>ENV</code>并且替换成<code>process.env.NODE_ENV</code> - 在Node应用中最普遍的设置环境变量的方法 - 或者 "development"中的一个。使用<code>JSON.stringify()</code>确保值被双引号包裹，如果<code>ENV</code>没有的话。</p>
<p>为了确保不会和三方代码造成问题，同样设置<code>exclude</code>属性来忽略<code>node_modules</code>目录和其中的全部包。(幸亏<a href="https://github.com/jlengstorf/learn-rollup/issues/3" rel="nofollow noreferrer" target="_blank">@wesleycoder先在这上面踩坑了</a>。)</p>
<h4>检查结果</h4>
<p>首先，重新打包然后在浏览器中检查。控制台日志会显示，就像之前一样。很棒 - 这意味着我们的默认值生效了。</p>
<p>为了展示新引入的能力，我们在<code>production</code>模式下运行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NODE_ENV=production ./node_modules/.bin/rollup -c
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">NODE_ENV</span>=production ./node_modules/.bin/rollup -c
</code></pre>
<blockquote><p>注意: 在Windows上，使用<code>SET NODE_ENV=production ./node_modules/.bin/rollup -c</code>防止在设置环境变量时报错。</p></blockquote>
<p>当刷新浏览器后，控制台没有任何日志打出了：</p>
<p>不改变任何代码的情况下，使用一个环境变量禁用了日志插件。</p>
<h4>STEP 6: 添加UglifyJS压缩减小生成代码体积</h4>
<p>这个教程中最后一步是添加UglifyJS来减小和压缩bundle文件。可以通过移除注释，缩短变量名和其他压缩换行等方式大幅度减少bundle的大小 - 会让文件的可读性变差，但提高了网络间传输的效率。</p>
<h4>安装插件</h4>
<p>我们将使用<a href="https://github.com/mishoo/UglifyJS2/" rel="nofollow noreferrer" target="_blank">UglifyJS</a>压缩bundle，通过<a href="https://github.com/TrySound/rollup-plugin-uglify" rel="nofollow noreferrer" target="_blank">rollup-plugin-uglify</a>插件。</p>
<p>通过下面命令安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev rollup-plugin-uglify
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> rollup-plugin-uglify
</code></pre>
<h4>更新<code>rollup.config.js</code>
</h4>
<p>然后添加Uglify到Rollup配置。为了开发环境下可读性更好，设置代码丑化仅在生产环境下使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' &amp;&amp; uglify()),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// Rollup plugins</span>
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;
<span class="hljs-keyword">import</span> eslint <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-eslint'</span>;
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>;
<span class="hljs-keyword">import</span> replace <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-replace'</span>;
<span class="hljs-keyword">import</span> uglify <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-uglify'</span>;

export <span class="hljs-keyword">default</span> {
  entry: <span class="hljs-string">'src/scripts/main.js'</span>,
  dest: <span class="hljs-string">'build/js/main.min.js'</span>,
  format: <span class="hljs-string">'iife'</span>,
  sourceMap: <span class="hljs-string">'inline'</span>,
  plugins: [
    resolve({
      jsnext: <span class="hljs-keyword">true</span>,
      main: <span class="hljs-keyword">true</span>,
      browser: <span class="hljs-keyword">true</span>,
    }),
    commonjs(),
    eslint({
      <span class="hljs-keyword">exclude</span>: [
        <span class="hljs-string">'src/styles/**'</span>,
      ]
    }),
    babel({
      <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || <span class="hljs-string">'development'</span>),
    }),
    (process.env.NODE_ENV === <span class="hljs-string">'production'</span> &amp;&amp; uglify()),
  ],
};
</code></pre>
<p>我们使用了<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-Circuit_Evaluation" rel="nofollow noreferrer" target="_blank">短路运算</a>，很常用(虽然<a href="http://stackoverflow.com/questions/5049006/using-s-short-circuiting-as-an-if-statement" rel="nofollow noreferrer" target="_blank">也有争议</a>)的条件性设置值的方法。[注4]</p>
<p>在我们的例子中，只有在<code>NODE_ENV</code>是<code>"production"</code>时才会加载<code>uglify()</code>。</p>
<h4>检查压缩过的bundle</h4>
<p>保存配置文件，让我们在生成环境下运行Rollup：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NODE_ENV=production ./node_modules/.bin/rollup -c
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">NODE_ENV</span>=production ./node_modules/.bin/rollup -c
</code></pre>
<blockquote><p>注意: 在Windows上，使用<code>SET NODE_ENV=production ./node_modules/.bin/rollup -c</code>防止在设置环境变量时报错。</p></blockquote>
<p>输出内容并不美观，但是更小了。这有<code>build/js/main.min.js</code>的截屏，看起来像这样：</p>
<p>丑化过的代码确实能更高效地传输。</p>
<p>之前，我们的bundle大约42KB。使用UglifyJS后，减少到大约29KB - 在没做其他优化的情况下节省了超过30%文件大小。</p>
<h2 id="articleHeader5">接下来的内容</h2>
<p>在这个系列的下一节，我们将了解通过Rollup和<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">PostCSS</a>处理样式，并且添加live reloading来实时看见我们的修改。</p>
<h2 id="articleHeader6">Further Reading</h2>
<h2 id="articleHeader7">扩展阅读</h2>
<ul>
<li><p><a href="https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/" rel="nofollow noreferrer" target="_blank">The cost of small modules</a> - 这篇文章让我开始对Rollup感兴趣，因为它展示了一些Rollup相比webpack和Browserify的优势。</p></li>
<li><p><a href="http://rollupjs.org/guide/" rel="nofollow noreferrer" target="_blank">Rollup’s getting started guide</a></p></li>
<li><p><a href="https://github.com/rollup/rollup/wiki/Command-Line-Interface" rel="nofollow noreferrer" target="_blank">Rollup’s CLI docs</a></p></li>
<li><p><a href="https://github.com/rollup/rollup/wiki/Plugins" rel="nofollow noreferrer" target="_blank">A list of Rollup plugins</a></p></li>
<li><p>注1： 这是一个非常难理解的概念，所以没全理解也不要有压力。简单来说，我们希望我们的代码在他们自己的作用域中，防止和其它脚本的冲突。IIFE是一个包括我们的代码在自身作用域的一个[闭包]。</p></li>
<li><p>注2：It’s important to keep in mind, though, that when we’re dealing with such a small example app it doesn’t take much to double a file size. The comparison at this point is ~3KB vs. ~8KB.</p></li>
<li><p>注3：作为曾经花数小时找bug然后发现拼错一个变量名的人，不需要夸大使用linter带来的效率提升。</p></li>
<li><p>注4：举个例子，使用这种方法来赋默认值时非常常见的。（比如<code>var foo = maybeThisExists || 'default';</code>）</p></li>
</ul>
<p>这篇文章的代码放在GitHub上。你可以<a href="https://github.com/jlengstorf/learn-rollup" rel="nofollow noreferrer" target="_blank">fork 这个仓库</a>进行修改或测试，<a href="https://github.com/jlengstorf/learn-rollup/issues" rel="nofollow noreferrer" target="_blank">开issue</a>或者报告bug，或者<a href="https://github.com/jlengstorf/learn-rollup/compare" rel="nofollow noreferrer" target="_blank">新建pull request</a>进行建议或者修改。</p>
<p><a href="https://code.lengstorf.com/learn-rollup-js/" rel="nofollow noreferrer" target="_blank">原文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]教程：如何使用Rollup打包JavaScript

## 原文链接
[https://segmentfault.com/a/1190000007543162](https://segmentfault.com/a/1190000007543162)

