---
title: 'webpack中imports-loader,exports-loader,expose-loader的区别' 
date: 2019-01-31 2:31:16
hidden: true
slug: 40vva46ctl
categories: [reprint]
---

{{< raw >}}

                    
<p>Webpack有几个和模块化相关的loader，<code>imports-loader</code>,<code>exports-loader</code>,<code>expose-loader</code>，比较容易混淆。今天，我们来理一理。</p>
<h1 id="articleHeader0">imports-loaders</h1>
<p>文档介绍的是：用于向一个模块的作用域内注入变量（Can be used to inject variables into the scope of a module.）,官方的文档总是言简意赅但是不太好懂。我们来举个例子。<br>例子完整的代码可以<a href="https://github.com/a932455223/webpackDemo/tree/master/importsDemo" rel="nofollow noreferrer" target="_blank">点这里</a><br><code>jqGreen.js</code>文件里仅一行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//没有模块化
$('#box').css('color','green');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//没有模块化</span>
$(<span class="hljs-string">'#box'</span>).css(<span class="hljs-string">'color'</span>,<span class="hljs-string">'green'</span>);</code></pre>
<p><code>index.js</code>文件也只有一行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./jqGreen');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./jqGreen'</span>);</code></pre>
<p>我们的配置文件中，是把<code>index.js</code>作为入口文件的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry:{
    index:'./src/js/index.js'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">entry</span>:{
    <span class="hljs-attr">index</span>:<span class="hljs-string">'./src/js/index.js'</span>
    }
}</code></pre>
<p>注意，我们并没有引入<code>jquery</code>。所以运行的结果是<code>$ is not defined</code>。</p>
<p>但是如果我们稍微修改一下<code>jqGreen</code>的引入方式，就能很轻松的解决这个问题。<br><code>index.js</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('imports?$=jquery!./jqGreen');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'imports?$=jquery!./jqGreen'</span>);</code></pre>
<p>当然，这个能运行之前，我们要<code>npm install imports-loader</code>一下。上面代码，把变量<code>$</code>注入进模块<code>jqGreen.js</code>。同时，我们指定了变量<code>$=jquery</code>。等于是在<code>jqGreen.js</code>文件的最顶上，加上了<code>var $=require('jquery')</code>。这样，程序就不会报<code>$ is not defined</code>的错误了。</p>
<h1 id="articleHeader1">exports-loader</h1>
<p>exports有<code>导出</code>的意思，这让我们猜测它有从模块中导出变量的功能。实际情况大致如此。我们来看个小例子。<br>例子的完整代码在 <a href="https://github.com/a932455223/webpackDemo/tree/master/exportsDemo" rel="nofollow noreferrer" target="_blank">这里</a><br><code>Hello.js</code>文件中仅有一个方法，直接绑定在全局变量<code>window</code>上面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.Hello = function(){
    console.log('say hello.');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.Hello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'say hello.'</span>);
}</code></pre>
<p>然后我们在<code>index.js</code>文件里去引用这个<code>Hello.js</code>:<code>var hello = require('./Hello.js');</code>。这样引用的结果是变量<code>hello</code>是<code>undefined</code>。因为我们在<code>Hello.js</code>文件里没有写<code>module.exports=window.Hello</code>，所以<code>index.js</code>里我们<code>require</code>的结果就是<code>undefined</code>。这个时候，<code>exports-loader</code>就派上用场了。我们只用把<code>index.js</code>的代码稍微改动一下：<code>var hello = require('exports?window.Hello!./Hello.js');</code>，这个时候，代码就能正确的运行了。变量<code>hello</code>就是我们定义的<code>window.hello</code>啦。<br><code>var hello = require('exports?window.Hello!./Hello.js');</code>这行代码，等于在<code>Hello.js</code>里加上一句<code>module.exports=window.Hello</code>，所以我们才能正确的导入。</p>
<h1 id="articleHeader2">expose-loader</h1>
<p>把一个模块导出并付给一个全局变量。文档里给了一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;expose?libraryName!./file.js&quot;);
// Exposes the exports for file.js to the global context on property &quot;libraryName&quot;.
// In web browsers, window.libraryName is then available." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">"expose?libraryName!./file.js"</span>);
<span class="hljs-comment">// Exposes the exports for file.js to the global context on property "libraryName".</span>
<span class="hljs-comment">// In web browsers, window.libraryName is then available.</span></code></pre>
<p>例子中的注释是说<code>把file.js中exports出来的变量付给全局变量"libraryName"</code>。假如<code>file.js</code>中有代码<code>module.exports=1</code>，那么<code>require("expose?libraryName!./file.js")</code>后<code>window.libraryName</code>的值就为1（我们这里只讨论浏览器环境）。<br>我这里还有一个稍稍复杂点的从一个umd模块的文件里导出到全局变量的例子，有兴趣的同学点击<a href="https://github.com/a932455223/webpackDemo/tree/master/exposeDemo" rel="nofollow noreferrer" target="_blank">这里</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack中imports-loader,exports-loader,expose-loader的区别

## 原文链接
[https://segmentfault.com/a/1190000007515136](https://segmentfault.com/a/1190000007515136)

