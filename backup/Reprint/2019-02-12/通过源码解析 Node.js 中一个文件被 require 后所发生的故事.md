---
title: '通过源码解析 Node.js 中一个文件被 require 后所发生的故事' 
date: 2019-02-12 2:30:12
hidden: true
slug: hxl51jf33e
categories: [reprint]
---

{{< raw >}}

                    
<p>在 Node.js 中，要说如果有几乎会在每一个文件都要用到的一个全局函数和一个全局对象，那应该是非 <code>require</code> 和 <code>module.exports</code> 莫属了。它们是 Node.js 模块机制的基石。大家在使用它们享受模块化的好处时，有时也不禁好奇：</p>
<ul><li><p>为何它俩使用起来像是全局函数/对象，却在 <code>global</code> 对象下访问不到它们？</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
console.log(require) // Function 
console.log(module) // Object 
console.log(global.require) // undefined
console.log(global.module) // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">require</span>) <span class="hljs-comment">// Function </span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>) <span class="hljs-comment">// Object </span>
<span class="hljs-built_in">console</span>.log(global.require) <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(global.module) <span class="hljs-comment">// undefined</span></code></pre>
<ul>
<li><p>这两个“类全局”对象是在什么时候，怎么生成的？</p></li>
<li><p>当 <code>require</code> 一个目录时，Node.js 是如何替我们找到具体该执行的文件的？</p></li>
<li><p>模块内的代码具体是以何种方式被执行的？</p></li>
<li><p>循环依赖了怎么办？</p></li>
</ul>
<p>让我们从 Node.js 项目的 <code>lib/module.js</code> 中的代码里，细细看一番，一个文件被 <code>require</code> 后，具体发生的故事，从而来解答上面这些问题。</p>
<h2 id="articleHeader0">一个文件被 <code>require</code> 后所发生的故事</h2>
<p>当我们在命令行中敲下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node ./index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="sh" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">./index</span>.js</code></pre>
<p>之后，<code>src/node.cc</code> 中的 <code>node::LoadEnvironment</code> 函数会被调用，在该函数内则会接着调用 <code>src/node.js</code> 中的代码，并执行 <code>startup</code> 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/node.js
// ...

function startup() {
  // ...
  Module.runMain();
}

// lib/module.js
// ...

Module.runMain = function() {
  // ...
  Module._load(process.argv[1], null, true);
  // ... 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/node.js</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startup</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
  Module.runMain();
}

<span class="hljs-comment">// lib/module.js</span>
<span class="hljs-comment">// ...</span>

Module.runMain = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
  Module._load(process.argv[<span class="hljs-number">1</span>], <span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>);
  <span class="hljs-comment">// ... </span>
};</code></pre>
<p>所以，最后会执行到 <code>Module._load(process.argv[1], null, true);</code> 这条语句来加载模块，不过其实，这个<code>Module._load</code>在<code>require</code>函数的代码中也会被调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/module.js
// ... 

Module.prototype.require = function(path) {
  assert(path, 'missing path');
  assert(typeof path === 'string', 'path must be a string');
  return Module._load(path, this, false);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/module.js</span>
<span class="hljs-comment">// ... </span>

Module.prototype.require = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
  assert(path, <span class="hljs-string">'missing path'</span>);
  assert(<span class="hljs-keyword">typeof</span> path === <span class="hljs-string">'string'</span>, <span class="hljs-string">'path must be a string'</span>);
  <span class="hljs-keyword">return</span> Module._load(path, <span class="hljs-keyword">this</span>, <span class="hljs-literal">false</span>);
};</code></pre>
<p>所以说，当我们在命令行中敲下 <code>node ./index.js</code>，某种意义上，可以说随后 Node.js 的表现即为立刻进行一次 <code>require</code> ， 即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./index.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./index.js'</span>)</code></pre>
<p>随后的步骤就是 <code>require</code> 一个普通模块了，让我们继续往下看，<code>Module._load</code> 方法做的第一件事，便是调用内部方法 <code>Module._resolveFilename</code> ，而该内部方法在进行了一些参数预处理后，最终会调用 <code>Module._findPath</code> 方法，来得到需被导入模块的完整路径，让我们从代码中来总结出它的路径分析规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/module.js
// ...

Module._findPath = function(request, paths) {
  // 优先取缓存
  var cacheKey = JSON.stringify({request: request, paths: paths});
  if (Module._pathCache[cacheKey]) {
    return Module._pathCache[cacheKey];
  }

  // ...
  for (var i = 0, PL = paths.length; i < PL; i++) {
    if (!trailingSlash) { 
      const rc = stat(basePath);
      if (rc === 0) {  // 若是文件.
        filename = toRealPath(basePath);
      } else if (rc === 1) {  // 若是目录
        filename = tryPackage(basePath, exts);
      }

      if (!filename) {
        // 带上 .js .json .node 后缀进行尝试
        filename = tryExtensions(basePath, exts);
      }
    }

    if (!filename) {
      filename = tryPackage(basePath, exts);
    }

    if (!filename) {
      // 尝试 index.js index.json index.node
      filename = tryExtensions(path.resolve(basePath, 'index'), exts);
    }

    if (filename) {
      // ...
      Module._pathCache[cacheKey] = filename;
      return filename;
    }
  }
  return false;
};

function tryPackage(requestPath, exts) {
  var pkg = readPackage(requestPath); // 获取 package.json 中 main 属性的值

  // ...
  return tryFile(filename) || tryExtensions(filename, exts) ||
         tryExtensions(path.resolve(filename, 'index'), exts);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/module.js</span>
<span class="hljs-comment">// ...</span>

Module._findPath = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, paths</span>) </span>{
  <span class="hljs-comment">// 优先取缓存</span>
  <span class="hljs-keyword">var</span> cacheKey = <span class="hljs-built_in">JSON</span>.stringify({<span class="hljs-attr">request</span>: request, <span class="hljs-attr">paths</span>: paths});
  <span class="hljs-keyword">if</span> (Module._pathCache[cacheKey]) {
    <span class="hljs-keyword">return</span> Module._pathCache[cacheKey];
  }

  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, PL = paths.length; i &lt; PL; i++) {
    <span class="hljs-keyword">if</span> (!trailingSlash) { 
      <span class="hljs-keyword">const</span> rc = stat(basePath);
      <span class="hljs-keyword">if</span> (rc === <span class="hljs-number">0</span>) {  <span class="hljs-comment">// 若是文件.</span>
        filename = toRealPath(basePath);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rc === <span class="hljs-number">1</span>) {  <span class="hljs-comment">// 若是目录</span>
        filename = tryPackage(basePath, exts);
      }

      <span class="hljs-keyword">if</span> (!filename) {
        <span class="hljs-comment">// 带上 .js .json .node 后缀进行尝试</span>
        filename = tryExtensions(basePath, exts);
      }
    }

    <span class="hljs-keyword">if</span> (!filename) {
      filename = tryPackage(basePath, exts);
    }

    <span class="hljs-keyword">if</span> (!filename) {
      <span class="hljs-comment">// 尝试 index.js index.json index.node</span>
      filename = tryExtensions(path.resolve(basePath, <span class="hljs-string">'index'</span>), exts);
    }

    <span class="hljs-keyword">if</span> (filename) {
      <span class="hljs-comment">// ...</span>
      Module._pathCache[cacheKey] = filename;
      <span class="hljs-keyword">return</span> filename;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tryPackage</span>(<span class="hljs-params">requestPath, exts</span>) </span>{
  <span class="hljs-keyword">var</span> pkg = readPackage(requestPath); <span class="hljs-comment">// 获取 package.json 中 main 属性的值</span>

  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> tryFile(filename) || tryExtensions(filename, exts) ||
         tryExtensions(path.resolve(filename, <span class="hljs-string">'index'</span>), exts);
}</code></pre>
<p>代码中的条件判断十分清晰，让我们来总结一下：</p>
<ul>
<li>
<p>若模块的路径不以 <code>/</code> 结尾，则先检查该路径是否真实存在：</p>
<ul>
<li><p>若存在且为一个文件，则直接返回文件路径作为结果。</p></li>
<li>
<p>若存在且为一个目录，则尝试读取该目录下的 <code>package.json</code> 中 <code>main</code> 属性所指向的文件路径。</p>
<ul>
<li><p>判断该文件路径是否存在，若存在，则直接作为结果返回。</p></li>
<li><p>尝试在该路径后依次加上 <code>.js</code> ， <code>.json</code> 和 <code>.node</code> 后缀，判断是否存在，若存在则返回加上后缀后的路径。</p></li>
<li><p>尝试在该路径后依次加上 <code>index.js</code> ， <code>index.json</code> 和 <code>index.node</code>，判断是否存在，若存在则返回拼接后的路径。</p></li>
</ul>
</li>
<li><p>若仍未返回，则为指定的模块路径依次加上 <code>.js</code> ， <code>.json</code> 和 <code>.node</code> 后缀，判断是否存在，若存在则返回加上后缀后的路径。</p></li>
</ul>
</li>
<li>
<p>若模块以 <code>/</code> 结尾，则尝试读取该目录下的 <code>package.json</code> 中 <code>main</code> 属性所指向的文件路径。</p>
<ul>
<li><p>判断该文件路径是否存在，若存在，则直接作为结果返回。</p></li>
<li><p>尝试在该路径后依次加上 <code>.js</code> ， <code>.json</code> 和 <code>.node</code> 后缀，判断是否存在，若存在则返回加上后缀后的路径。</p></li>
<li><p>尝试在该路径后依次加上 <code>index.js</code> ， <code>index.json</code> 和 <code>index.node</code>，判断是否存在，若存在则返回拼接后的路径。</p></li>
</ul>
</li>
<li><p>若仍未返回，则为指定的模块路径依次加上 <code>index.js</code> ， <code>index.json</code> 和 <code>index.node</code>，判断是否存在，若存在则返回拼接后的路径。</p></li>
</ul>
<p>在取得了模块的完整路径后，便该是执行模块了，我们以执行 <code>.js</code> 后缀的 JavaScript 模块为例。首先 Node.js 会通过 <code>fs.readFileSync</code> 方法，以 UTF-8 的格式，将 JavaScript 代码以字符串的形式读出，传递给内部方法 <code>module._compile</code>，在这个内部方法里，则会调用 <code>NativeModule.wrap</code> 方法，将我们的模块代码包裹在一个函数中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/node.js
// ...

NativeModule.wrap = function(script) {
  return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
};

NativeModule.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/node.js</span>
<span class="hljs-comment">// ...</span>

NativeModule.wrap = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">script</span>) </span>{
  <span class="hljs-keyword">return</span> NativeModule.wrapper[<span class="hljs-number">0</span>] + script + NativeModule.wrapper[<span class="hljs-number">1</span>];
};

NativeModule.wrapper = [
  <span class="hljs-string">'(function (exports, require, module, __filename, __dirname) { '</span>,
  <span class="hljs-string">'\n});'</span>
];</code></pre>
<p>所以，这便解答了我们之前提出的，在 <code>global</code> 对象下取不到它们的问题，因为它们是以包裹在外的函数的参数的形式传递进来的。所以顺便提一句，我们平常在文件的顶上写的 <code>use strict</code> ，其实最终声明的并不是 <code>script-level</code> 的严格模式，而都是 <code>function-level</code> 的严格模式。</p>
<p>最后一步， Node.js 会使用 <code>vm.runInThisContext</code> 执行这个拼接完毕的字符串，取得一个 JavaScript 函数，最后带着对应的对象参数执行它们，并将赋值在 <code>module.exports</code> 上的对象返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/module.js
// ...

Module.prototype._compile = function(content, filename) {
  // ...

  var compiledWrapper = runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true
  });

  // ...
  const args = [this.exports, require, this, filename, dirname];
  
  const result = compiledWrapper.apply(this.exports, args);
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/module.js</span>
<span class="hljs-comment">// ...</span>

Module.prototype._compile = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content, filename</span>) </span>{
  <span class="hljs-comment">// ...</span>

  <span class="hljs-keyword">var</span> compiledWrapper = runInThisContext(wrapper, {
    <span class="hljs-attr">filename</span>: filename,
    <span class="hljs-attr">lineOffset</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">displayErrors</span>: <span class="hljs-literal">true</span>
  });

  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">const</span> args = [<span class="hljs-keyword">this</span>.exports, <span class="hljs-built_in">require</span>, <span class="hljs-keyword">this</span>, filename, dirname];
  
  <span class="hljs-keyword">const</span> result = compiledWrapper.apply(<span class="hljs-keyword">this</span>.exports, args);
  <span class="hljs-comment">// ...</span>
};</code></pre>
<p>至此，一个同步的 <code>require</code> 操作便圆满结束啦。</p>
<h2 id="articleHeader1">循环依赖</h2>
<p>通过上文我们已经可以知道，在 <code>Module._load</code> 内部方法里 Node.js 在加载模块之前，首先就会把传模块内的 <code>module</code> 对象的引用给缓存起来（此时它的 <code>exports</code> 属性还是一个空对象），然后执行模块内代码，在这个过程中渐渐为 <code>module.exports</code> 对象附上该有的属性。所以当 Node.js 这么做时，出现循环依赖的时候，仅仅只会让循环依赖点取到中间值，而不会让 <code>require</code> 死循环卡住。一个经典的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a.js
'use strict'
console.log('a starting')
exports.done = false
var b = require('./b')
console.log(`in a, b.done=${b.done}`)
exports.done = true
console.log('a done')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// a.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a starting'</span>)
exports.done = <span class="hljs-literal">false</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`in a, b.done=<span class="hljs-subst">${b.done}</span>`</span>)
exports.done = <span class="hljs-literal">true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a done'</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// b.js
'use strict'
console.log('b start')
exports.done = false
let a = require('./a')
console.log(`in b, a.done=${a.done}`)
exports.done = true
console.log('b done')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// b.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b start'</span>)
exports.done = <span class="hljs-literal">false</span>
<span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`in b, a.done=<span class="hljs-subst">${a.done}</span>`</span>)
exports.done = <span class="hljs-literal">true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'b done'</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
'use strict'
console.log('main start')
let a = require('./a')
let b = require('./b')
console.log(`in main, a.done=${a.done}, b.done=${b.done}`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// main.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'main start'</span>)
<span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>)
<span class="hljs-keyword">let</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`in main, a.done=<span class="hljs-subst">${a.done}</span>, b.done=<span class="hljs-subst">${b.done}</span>`</span>)</code></pre>
<p>执行 <code>node main.js</code> ，打印：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="main start
a starting
b start
in b, a.done=false => 循环依赖点取到了中间值
b done
in a, b.done=true
a done
in main, a.done=true, b.done=true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>main start
<span class="hljs-selector-tag">a</span> starting
<span class="hljs-selector-tag">b</span> start
<span class="hljs-keyword">in</span> <span class="hljs-selector-tag">b</span>, <span class="hljs-selector-tag">a</span>.done=false =&gt; 循环依赖点取到了中间值
<span class="hljs-selector-tag">b</span> done
<span class="hljs-keyword">in</span> <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">b</span>.done=true
<span class="hljs-selector-tag">a</span> done
<span class="hljs-keyword">in</span> main, <span class="hljs-selector-tag">a</span>.done=true, <span class="hljs-selector-tag">b</span>.done=true </code></pre>
<h2 id="articleHeader2">最后</h2>
<p>由于 Node.js 中的模块导入和 ES6 规范中的不同，它的导入过程是同步的。所以实现起来会方便许多，代码量同样也不多。十分推荐大家阅读一下完整的实现。</p>
<p>参考：</p>
<ul>
<li><p><a href="https://github.com/nodejs/node/blob/v5.x/lib/module.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/v5.x/lib/module.js</a></p></li>
<li><p><a href="https://github.com/nodejs/node/blob/v5.x/src/node.js" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/v5.x/src/node.js</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过源码解析 Node.js 中一个文件被 require 后所发生的故事

## 原文链接
[https://segmentfault.com/a/1190000004695582](https://segmentfault.com/a/1190000004695582)

