---
title: '通过nodejs实现自定义命令' 
date: 2018-12-20 2:30:10
hidden: true
slug: 895slfr95mh
categories: [reprint]
---

{{< raw >}}

                    
<p>我们开发用到的一些库都有自己特有的命令，如webpack，babel和jest等。通过给这些命令输入不同的参数，可以得到相应的功能。通过篇文章，你将学会如何一步步地编写运行在弄的环境的自定义命令。</p>
<h3 id="articleHeader0">编写命令文件</h3>
<p>新建一个文件夹cmd，然后建一个main.js文件，文件内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

console.log('hello command');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#!/usr/bin/env node</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello command'</span>);</code></pre>
<p>注意一定要有这行代码：<code>#!/usr/bin/env node</code>，这行代码叫<code>shebang</code>或者<code>hashbang</code>，它会告诉操作系统在运行这个文件文件的时候，需要用node的解析器来解析。</p>
<p>这时候如果想直接运行这个命令，将会得到一个报错：<br><span class="img-wrap"><img data-src="/img/bV0S44?w=576&amp;h=68" src="https://static.alili.tech/img/bV0S44?w=576&amp;h=68" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>需要给这个文件添加一个执行的权限：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chomd +x main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">chomd</span> +<span class="hljs-selector-tag">x</span> <span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span></code></pre>
<p>这样就能正常的运行这一命令了：<br><span class="img-wrap"><img data-src="/img/bV0S5W?w=426&amp;h=76" src="https://static.alili.tech/img/bV0S5W?w=426&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下一步，我们将借助npm的特性，来给我们的命令命名。</p>
<h3 id="articleHeader1">使用npm定制命令</h3>
<p>先在cmd目录初始化npm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>然后在生成的package.json文件中添加以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;bin&quot;:{
    &quot;mycmd&quot;: &quot;main.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"bin"</span>:{
    <span class="hljs-string">"mycmd"</span>: <span class="hljs-string">"main.js"</span>
  },</code></pre>
<p>然后再运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm link" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> link</code></pre>
<p>完成后就可以直接输入mycmd命令得到结果了<img src="https://static.alili.techundefined" class="emoji" alt="sunglasses" title="sunglasses"></p>
<p><span class="img-wrap"><img data-src="/img/bV0TrL?w=364&amp;h=78" src="https://static.alili.tech/img/bV0TrL?w=364&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此时你可能会感到疑惑，为什么通过npm link就能实现自定义命令呢？下面我们再详细了解npm link的运作机制。</p>
<h3 id="articleHeader2">npm link</h3>
<p>输入命令后，npm帮我们做了以下这些工作</p>
<ul><li>在全局的npm包环境中帮我们建立一个软链，路径在{prefix}/lib/node_modules/&lt;package&gt;。其中prefix可以通过这条命令查询到：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm get prefix" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">get</span> <span class="hljs-built_in">prefix</span></code></pre>
<ul><li>将配置文件中的bins链接到全局：{prefix}/bin/{name}</li></ul>
<p>看到这里，你应该了解我们正是借助第二布，实现自定义命令的。但第一步的命令又有什么作用呢？</p>
<p>npm link第一步所做的工作将会为我们本地开发工具库带来很大的帮助。当我们的工具库还没完成的时候，我们并不想将其<code>npm publish</code>出去，而是希望先在本地调试一下。这时候，可以进入调试的目标项目，比如cmd-test文件夹，运行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm link cmd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm link <span class="hljs-keyword">cmd</span></code><span class="bash"></span></pre>
<p>其中cmd就是我们的包名。运行完此命令后，npm会帮我们在cmd-test文件夹中的node_modules目录下建立一个cmd的软链。当然，前提是cmd-test文件夹中已经有node_modules目录，否则会一直向上找node_modules目录直到根目录位置。你也可以手动建一个。</p>
<p><code>npm link cmd</code>的效果跟<code>npm install cmd</code>效果是完全一样的，我们可以使用link过来的所有功能，这对我们本地调试工具库非常有帮助。</p>
<p>说得有点远了，再扯回到自定义命令上面来。如果我们希望给命令传入参数，该如何做呢？</p>
<h3 id="articleHeader3">commander</h3>
<p>我们可以借助commander这个工具，帮我们获取到从<code>process.argv</code>里面传进来的参数，使用方法也很简单:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#!/usr/bin/env node</span>

<span class="hljs-comment">/**
 * Module dependencies.
 */</span>

<span class="hljs-keyword">var</span> program = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>);

program
  .version(<span class="hljs-string">'0.1.0'</span>)
  .option(<span class="hljs-string">'-p, --peppers'</span>, <span class="hljs-string">'Add peppers'</span>)
  .option(<span class="hljs-string">'-P, --pineapple'</span>, <span class="hljs-string">'Add pineapple'</span>)
  .option(<span class="hljs-string">'-b, --bbq-sauce'</span>, <span class="hljs-string">'Add bbq sauce'</span>)
  .option(<span class="hljs-string">'-c, --cheese [type]'</span>, <span class="hljs-string">'Add the specified type of cheese [marble]'</span>, <span class="hljs-string">'marble'</span>)
  .parse(process.argv);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'you ordered a pizza with:'</span>);
<span class="hljs-keyword">if</span> (program.peppers) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - peppers'</span>);
<span class="hljs-keyword">if</span> (program.pineapple) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - pineapple'</span>);
<span class="hljs-keyword">if</span> (program.bbqSauce) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - bbq'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  - %s cheese'</span>, program.cheese);</code></pre>
<p>通过option这个函数来定义支持的参数，然后在使用的时候直接通过获取program的属性拿到传进来的参数。具体用法请看官方文档：<a href="https://github.com/tj/commander.js/" rel="nofollow noreferrer" target="_blank">commander</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过nodejs实现自定义命令

## 原文链接
[https://segmentfault.com/a/1190000012567323](https://segmentfault.com/a/1190000012567323)

