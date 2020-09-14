---
title: 'Nodejs基础：路径处理模块path总结' 
date: 2019-01-31 2:31:16
hidden: true
slug: y62oejm8cr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文摘录自《Nodejs学习笔记》，更多章节及更新，请访问 <a href="https://github.com/chyingp/nodejs-learning-guide" rel="nofollow noreferrer" target="_blank">github主页地址</a>。欢迎加群交流，群号 197339705。</p></blockquote>
<h2 id="articleHeader0">模块概览</h2>
<p>在nodejs中，path是个使用频率很高，但却让人又爱又恨的模块。部分因为文档说的不够清晰，部分因为接口的平台差异性。</p>
<p>将path的接口按照用途归类，仔细琢磨琢磨，也就没那么费解了。</p>
<h2 id="articleHeader1">获取路径/文件名/扩展名</h2>
<ul>
<li><p>获取路径：path.dirname(filepath)</p></li>
<li><p>获取文件名：path.basename(filepath)</p></li>
<li><p>获取扩展名：path.extname(filepath)</p></li>
</ul>
<h3 id="articleHeader2">获取所在路径</h3>
<p>例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：/tmp/demo/js
console.log( path.dirname(filepath) );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> filepath = <span class="hljs-string">'/tmp/demo/js/test.js'</span>;

<span class="hljs-comment">// 输出：/tmp/demo/js</span>
<span class="hljs-built_in">console</span>.log( path.dirname(filepath) );</code></pre>
<h3 id="articleHeader3">获取文件名</h3>
<p>严格意义上来说，path.basename(filepath) 只是输出路径的最后一部分，并不会判断是否文件名。</p>
<p>但大部分时候，我们可以用它来作为简易的“获取文件名“的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

// 输出：test.js
console.log( path.basename('/tmp/demo/js/test.js') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test/') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test') );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-comment">// 输出：test.js</span>
<span class="hljs-built_in">console</span>.log( path.basename(<span class="hljs-string">'/tmp/demo/js/test.js'</span>) );

<span class="hljs-comment">// 输出：test</span>
<span class="hljs-built_in">console</span>.log( path.basename(<span class="hljs-string">'/tmp/demo/js/test/'</span>) );

<span class="hljs-comment">// 输出：test</span>
<span class="hljs-built_in">console</span>.log( path.basename(<span class="hljs-string">'/tmp/demo/js/test'</span>) );</code></pre>
<p>如果只想获取文件名，单不包括文件扩展呢？可以用上第二个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 输出：test
console.log( path.basename('/tmp/demo/js/test.js', '.js') );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 输出：test</span>
<span class="hljs-built_in">console</span>.log( path.basename(<span class="hljs-string">'/tmp/demo/js/test.js'</span>, <span class="hljs-string">'.js'</span>) );</code></pre>
<h3 id="articleHeader4">获取文件扩展名</h3>
<p>简单的例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：.js
console.log( path.extname(filepath) );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> filepath = <span class="hljs-string">'/tmp/demo/js/test.js'</span>;

<span class="hljs-comment">// 输出：.js</span>
<span class="hljs-built_in">console</span>.log( path.extname(filepath) );</code></pre>
<p>更详细的规则是如下：（假设 path.basename(filepath) === B ）</p>
<ul>
<li><p>从B的最后一个<code>.</code>开始截取，直到最后一个字符。</p></li>
<li><p>如果B中不存在<code>.</code>，或者B的第一个字符就是<code>.</code>，那么返回空字符串。</p></li>
</ul>
<p>直接看<a href="https://nodejs.org/api/path.html#path_path_extname_path" rel="nofollow noreferrer" target="_blank">官方文档</a>的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path.extname('index.html')
// returns '.html'

path.extname('index.coffee.md')
// returns '.md'

path.extname('index.')
// returns '.'

path.extname('index')
// returns ''

path.extname('.index')
// returns ''
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">path.extname(<span class="hljs-string">'index.html'</span>)
<span class="hljs-comment">// returns '.html'</span>

path.extname(<span class="hljs-string">'index.coffee.md'</span>)
<span class="hljs-comment">// returns '.md'</span>

path.extname(<span class="hljs-string">'index.'</span>)
<span class="hljs-comment">// returns '.'</span>

path.extname(<span class="hljs-string">'index'</span>)
<span class="hljs-comment">// returns ''</span>

path.extname(<span class="hljs-string">'.index'</span>)
<span class="hljs-comment">// returns ''</span>
</code></pre>
<h2 id="articleHeader5">路径组合</h2>
<ul>
<li><p>path.join([...paths])</p></li>
<li><p>path.resolve([...paths])</p></li>
</ul>
<h3 id="articleHeader6">path.join([...paths])</h3>
<p>把<code>paths</code>拼起来，然后再normalize一下。这句话反正我自己看着也是莫名其妙，可以参考下面的伪代码定义。</p>
<p>例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

// 输出 '/foo/bar/baz/asdf'
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code class="javacript"><span class="hljs-built_in">var</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-comment">// 输出 '/foo/bar/baz/asdf'</span>
path.<span class="hljs-keyword">join</span>(<span class="hljs-string">'/foo'</span>, <span class="hljs-string">'bar'</span>, <span class="hljs-string">'baz/asdf'</span>, <span class="hljs-string">'quux'</span>, <span class="hljs-string">'..'</span>);</code></pre>
<p>path定义的伪代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports.join = function(){
  var paths = Array.prototye.slice.call(arguments, 0);
  return this.normalize( paths.join('/') );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports.join = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> paths = <span class="hljs-built_in">Array</span>.prototye.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">0</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.normalize( paths.join(<span class="hljs-string">'/'</span>) );
};</code></pre>
<h3 id="articleHeader7">path.resolve([...paths])</h3>
<p>这个接口的说明有点啰嗦。你可以想象现在你在shell下面，从左到右运行一遍<code>cd path</code>命令，最终获取的绝对路径/文件名，就是这个接口所返回的结果了。</p>
<p>比如 <code>path.resolve('/foo/bar', './baz')</code> 可以看成下面命令的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /foo/bar
cd ./baz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-built_in">cd</span> /foo/bar
<span class="hljs-built_in">cd</span> ./baz</code></pre>
<p>更多对比例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

// 假设当前工作路径是 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('') )

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('.') )

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz') );

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz/') );

// 输出 /tmp/file
console.log( path.resolve('/foo/bar', '/tmp/file/') );

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path/www/js/mod.js
console.log( path.resolve('www', 'js/upload', '../mod.js') );
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-comment">// 假设当前工作路径是 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path</span>

<span class="hljs-comment">// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path</span>
<span class="hljs-built_in">console</span>.log( path.resolve(<span class="hljs-string">''</span>) )

<span class="hljs-comment">// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path</span>
<span class="hljs-built_in">console</span>.log( path.resolve(<span class="hljs-string">'.'</span>) )

<span class="hljs-comment">// 输出 /foo/bar/baz</span>
<span class="hljs-built_in">console</span>.log( path.resolve(<span class="hljs-string">'/foo/bar'</span>, <span class="hljs-string">'./baz'</span>) );

<span class="hljs-comment">// 输出 /foo/bar/baz</span>
<span class="hljs-built_in">console</span>.log( path.resolve(<span class="hljs-string">'/foo/bar'</span>, <span class="hljs-string">'./baz/'</span>) );

<span class="hljs-comment">// 输出 /tmp/file</span>
<span class="hljs-built_in">console</span>.log( path.resolve(<span class="hljs-string">'/foo/bar'</span>, <span class="hljs-string">'/tmp/file/'</span>) );

<span class="hljs-comment">// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path/www/js/mod.js</span>
<span class="hljs-built_in">console</span>.log( path.resolve(<span class="hljs-string">'www'</span>, <span class="hljs-string">'js/upload'</span>, <span class="hljs-string">'../mod.js'</span>) );
</code></pre>
<h2 id="articleHeader8">路径解析</h2>
<p>path.parse(path)</p>
<h2 id="articleHeader9">path.normalize(filepath)</h2>
<p>从官方文档的描述来看，path.normalize(filepath) 应该是比较简单的一个API，不过用起来总是觉得没底。</p>
<p>为什么呢？API说明过于简略了，包括如下：</p>
<ul>
<li><p>如果路径为空，返回<code>.</code>，相当于当前的工作路径。</p></li>
<li><p>将对路径中重复的路径分隔符（比如linux下的<code>/</code>)合并为一个。</p></li>
<li><p>对路径中的<code>.</code>、<code>..</code>进行处理。（类似于shell里的<code>cd ..</code>）</p></li>
<li><p>如果路径最后有<code>/</code>，那么保留该<code>/</code>。</p></li>
</ul>
<p>感觉stackoverflow上一个兄弟对这个API的解释更实在，<a href="http://stackoverflow.com/questions/10822574/difference-between-path-normalize-and-path-resolve-in-node-js" rel="nofollow noreferrer" target="_blank">原文链接</a>。</p>
<blockquote><p>In other words, path.normalize is "What is the shortest path I can take that will take me to the same place as the input"</p></blockquote>
<p>代码示例如下。建议读者把代码拷贝出来运行下，看下实际效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var filepath = '/tmp/demo/js/test.js';

var index = 0;

var compare = function(desc, callback){
  console.log('[用例%d]：%s', ++index, desc);
  callback();
  console.log('\n');
};

compare('路径为空', function(){
  // 输出 .
  console.log( path.normalize('') );
});

compare('路径结尾是否带/', function(){
  // 输出 /tmp/demo/js/upload
  console.log( path.normalize('/tmp/demo/js/upload') );

  // /tmp/demo/js/upload/
  console.log( path.normalize('/tmp/demo/js/upload/') );
});

compare('重复的/', function(){
  // 输出 /tmp/demo/js
  console.log( path.normalize('/tmp/demo//js') );
});

compare('路径带..', function(){
  // 输出 /tmp/demo/js
  console.log( path.normalize('/tmp/demo/js/upload/..') );
});

compare('相对路径', function(){
  // 输出 demo/js/upload/
  console.log( path.normalize('./demo/js/upload/') );

  // 输出 demo/js/upload/
  console.log( path.normalize('demo/js/upload/') );
});

compare('不常用边界', function(){
  // 输出 ..
  console.log( path.normalize('./..') );

  // 输出 ..
  console.log( path.normalize('..') );

  // 输出 ../
  console.log( path.normalize('../') );

  // 输出 /
  console.log( path.normalize('/../') );
  
  // 输出 /
  console.log( path.normalize('/..') );
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> filepath = <span class="hljs-string">'/tmp/demo/js/test.js'</span>;

<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;

<span class="hljs-keyword">var</span> compare = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">desc, callback</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[用例%d]：%s'</span>, ++index, desc);
  callback();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n'</span>);
};

compare(<span class="hljs-string">'路径为空'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 输出 .</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">''</span>) );
});

compare(<span class="hljs-string">'路径结尾是否带/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 输出 /tmp/demo/js/upload</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'/tmp/demo/js/upload'</span>) );

  <span class="hljs-comment">// /tmp/demo/js/upload/</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'/tmp/demo/js/upload/'</span>) );
});

compare(<span class="hljs-string">'重复的/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 输出 /tmp/demo/js</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'/tmp/demo//js'</span>) );
});

compare(<span class="hljs-string">'路径带..'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 输出 /tmp/demo/js</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'/tmp/demo/js/upload/..'</span>) );
});

compare(<span class="hljs-string">'相对路径'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 输出 demo/js/upload/</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'./demo/js/upload/'</span>) );

  <span class="hljs-comment">// 输出 demo/js/upload/</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'demo/js/upload/'</span>) );
});

compare(<span class="hljs-string">'不常用边界'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 输出 ..</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'./..'</span>) );

  <span class="hljs-comment">// 输出 ..</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'..'</span>) );

  <span class="hljs-comment">// 输出 ../</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'../'</span>) );

  <span class="hljs-comment">// 输出 /</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'/../'</span>) );
  
  <span class="hljs-comment">// 输出 /</span>
  <span class="hljs-built_in">console</span>.log( path.normalize(<span class="hljs-string">'/..'</span>) );
});</code></pre>
<p>感兴趣的可以看下 path.normalize(filepath) 的node源码如下：<a href="https://github.com/nodejs/node/blob/master/lib/path.js" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<h2 id="articleHeader10">文件路径分解/组合</h2>
<ul>
<li><p>path.format(pathObject)：将pathObject的root、dir、base、name、ext属性，按照一定的规则，组合成一个文件路径。</p></li>
<li><p>path.parse(filepath)：path.format()方法的反向操作。</p></li>
</ul>
<p>我们先来看看官网对相关属性的说明。</p>
<p>首先是linux下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
&quot;  /    home/user/dir / file  .txt &quot;
└──────┴──────────────┴──────┴─────┘
(all spaces in the &quot;&quot; line should be ignored -- they are purely for formatting)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
<span class="hljs-string">"  /    home/user/dir / file  .txt "</span>
└──────┴──────────────┴──────┴─────┘
(all spaces <span class="hljs-keyword">in</span> the <span class="hljs-string">""</span> line should be ignored -- they are purely <span class="hljs-keyword">for</span> formatting)</code></pre>
<p>然后是windows下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
&quot; C:\      path\dir   \ file  .txt &quot;
└──────┴──────────────┴──────┴─────┘
(all spaces in the &quot;&quot; line should be ignored -- they are purely for formatting)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
<span class="hljs-string">" C:\      path\dir   \ file  .txt "</span>
└──────┴──────────────┴──────┴─────┘
(all spaces <span class="hljs-keyword">in</span> the <span class="hljs-string">""</span> line should be ignored -- they are purely <span class="hljs-keyword">for</span> formatting)</code></pre>
<h3 id="articleHeader11">path.format(pathObject)</h3>
<p>阅读相关API文档说明后发现，path.format(pathObject)中，pathObject的配置属性是可以进一步精简的。</p>
<p>根据接口的描述来看，以下两者是等价的。</p>
<ul>
<li><p><code>root</code> vs <code>dir</code>：两者可以互相替换，区别在于，路径拼接时，<code>root</code>后不会自动加<code>/</code>，而<code>dir</code>会。</p></li>
<li><p><code>base</code> vs <code>name+ext</code>：两者可以互相替换。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

var p1 = path.format({
  root: '/tmp/', 
  base: 'hello.js'
});
console.log( p1 ); // 输出 /tmp/hello.js

var p2 = path.format({
  dir: '/tmp', 
  name: 'hello',
  ext: '.js'
});
console.log( p2 );  // 输出 /tmp/hello.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">var</span> p1 = path.format({
  <span class="hljs-attr">root</span>: <span class="hljs-string">'/tmp/'</span>, 
  <span class="hljs-attr">base</span>: <span class="hljs-string">'hello.js'</span>
});
<span class="hljs-built_in">console</span>.log( p1 ); <span class="hljs-comment">// 输出 /tmp/hello.js</span>

<span class="hljs-keyword">var</span> p2 = path.format({
  <span class="hljs-attr">dir</span>: <span class="hljs-string">'/tmp'</span>, 
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  <span class="hljs-attr">ext</span>: <span class="hljs-string">'.js'</span>
});
<span class="hljs-built_in">console</span>.log( p2 );  <span class="hljs-comment">// 输出 /tmp/hello.js</span></code></pre>
<h3 id="articleHeader12">path.parse(filepath)</h3>
<p>path.format(pathObject) 的反向操作，直接上官网例子。</p>
<p>四个属性，对于使用者是挺便利的，不过path.format(pathObject) 中也是四个配置属性，就有点容易搞混。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="path.parse('/home/user/dir/file.txt')
// returns
// {
//    root : &quot;/&quot;,
//    dir : &quot;/home/user/dir&quot;,
//    base : &quot;file.txt&quot;,
//    ext : &quot;.txt&quot;,
//    name : &quot;file&quot;
// }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">path.parse(<span class="hljs-string">'/home/user/dir/file.txt'</span>)
<span class="hljs-comment">// returns</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//    root : "/",</span>
<span class="hljs-comment">//    dir : "/home/user/dir",</span>
<span class="hljs-comment">//    base : "file.txt",</span>
<span class="hljs-comment">//    ext : ".txt",</span>
<span class="hljs-comment">//    name : "file"</span>
<span class="hljs-comment">// }</span></code></pre>
<h2 id="articleHeader13">获取相对路径</h2>
<p>接口：path.relative(from, to)</p>
<p>描述：从<code>from</code>路径，到<code>to</code>路径的相对路径。</p>
<p>边界：</p>
<ul>
<li><p>如果<code>from</code>、<code>to</code>指向同个路径，那么，返回空字符串。</p></li>
<li><p>如果<code>from</code>、<code>to</code>中任一者为空，那么，返回当前工作路径。</p></li>
</ul>
<p>上例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

var p1 = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
console.log(p1);  // 输出 &quot;../../impl/bbb&quot;

var p2 = path.relative('/data/demo', '/data/demo');
console.log(p2);  // 输出 &quot;&quot;

var p3 = path.relative('/data/demo', '');
console.log(p3);  // 输出 &quot;../../Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">var</span> p1 = path.relative(<span class="hljs-string">'/data/orandea/test/aaa'</span>, <span class="hljs-string">'/data/orandea/impl/bbb'</span>);
<span class="hljs-built_in">console</span>.log(p1);  <span class="hljs-comment">// 输出 "../../impl/bbb"</span>

<span class="hljs-keyword">var</span> p2 = path.relative(<span class="hljs-string">'/data/demo'</span>, <span class="hljs-string">'/data/demo'</span>);
<span class="hljs-built_in">console</span>.log(p2);  <span class="hljs-comment">// 输出 ""</span>

<span class="hljs-keyword">var</span> p3 = path.relative(<span class="hljs-string">'/data/demo'</span>, <span class="hljs-string">''</span>);
<span class="hljs-built_in">console</span>.log(p3);  <span class="hljs-comment">// 输出 "../../Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path"</span></code></pre>
<h2 id="articleHeader14">平台相关接口/属性</h2>
<p>以下属性、接口，都跟平台的具体实现相关。也就是说，同样的属性、接口，在不同平台上的表现不同。</p>
<ul>
<li><p>path.posix：path相关属性、接口的linux实现。</p></li>
<li><p>path.win32：path相关属性、接口的win32实现。</p></li>
<li><p>path.sep：路径分隔符。在linux上是<code>/</code>，在windows上是``。</p></li>
<li><p>path.delimiter：path设置的分割符。linux上是<code>:</code>，windows上是<code>;</code>。</p></li>
</ul>
<p>注意，当使用 path.win32 相关接口时，参数同样可以使用<code>/</code>做分隔符，但接口返回值的分割符只会是``。</p>
<p>直接来例子更直观。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> path.win32.join('/tmp', 'fuck')
'\\tmp\\fuck'
> path.win32.sep
'\\'
> path.win32.join('\tmp', 'demo')
'\\tmp\\demo'
> path.win32.join('/tmp', 'demo')
'\\tmp\\demo'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; path.win32.join(<span class="hljs-string">'/tmp'</span>, <span class="hljs-string">'fuck'</span>)
<span class="hljs-string">'\\tmp\\fuck'</span>
&gt; path.win32.sep
<span class="hljs-string">'\\'</span>
&gt; path.win32.join(<span class="hljs-string">'\tmp'</span>, <span class="hljs-string">'demo'</span>)
<span class="hljs-string">'\\tmp\\demo'</span>
&gt; path.win32.join(<span class="hljs-string">'/tmp'</span>, <span class="hljs-string">'demo'</span>)
<span class="hljs-string">'\\tmp\\demo'</span></code></pre>
<h3 id="articleHeader15">path.delimiter</h3>
<p>linux系统例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.env.PATH)
// '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

process.env.PATH.split(path.delimiter)
// returns ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">console.log(process.env.PATH)
// <span class="hljs-string">'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'</span>

process.env.PATH.split(path.delimiter)
// returns [<span class="hljs-string">'/usr/bin'</span>, <span class="hljs-string">'/bin'</span>, <span class="hljs-string">'/usr/sbin'</span>, <span class="hljs-string">'/sbin'</span>, <span class="hljs-string">'/usr/local/bin'</span>]</code></pre>
<p>windows系统例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.env.PATH)
// 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter)
// returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">console.log(process.env.PATH)
// <span class="hljs-string">'C:\Windows\system32;C:\Windows;C:\Program Files\node\'</span>

process.env.PATH.split(path.delimiter)
// returns [<span class="hljs-string">'C:\\Windows\\system32'</span>, <span class="hljs-string">'C:\\Windows'</span>, <span class="hljs-string">'C:\\Program Files\\node\\'</span>]</code></pre>
<h2 id="articleHeader16">相关链接</h2>
<p>官方文档：<a href="https://nodejs.org/api/path.html#path_path" rel="nofollow noreferrer" target="_blank">https://nodejs.org/api/path.h...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nodejs基础：路径处理模块path总结

## 原文链接
[https://segmentfault.com/a/1190000007471775](https://segmentfault.com/a/1190000007471775)

