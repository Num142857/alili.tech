---
title: '如何自己写一个公用的NPM包' 
date: 2019-01-05 2:30:11
hidden: true
slug: dq9hxckjk8f
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>以 <a href="https://github.com/rawbin-/markdown-clear" rel="nofollow noreferrer" target="_blank">markdown-clear</a> ,创建过程为例，讲解整个NPM包创建和发布流程</strong></p>
<h3 id="articleHeader0">1 如何创建一个包</h3>
<h4>1.1 创建并使用一个工程</h4>
<ul>
<li><p>在GitHub上新建一个仓库,其名<code>markdown-clear</code></p></li>
<li><p><code>clone</code> 这个工程到本地</p></li>
</ul>
<h4>1.2 添加<code>LICENCE</code>或<code>LICENSE</code>文件， 说明对应的开源协议</h4>
<ul>
<li><p>到<a href="https://spdx.org/licenses/" rel="nofollow noreferrer" target="_blank">SPDX License List</a> 或者<a href="https://opensource.org/licenses/alphabetical" rel="nofollow noreferrer" target="_blank">Open Source Initiative</a>，下载相应协议的模板，我们这里选用MIT</p></li>
<li><p>修改必要的协议时间和作者</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MIT License
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>MIT License
Copyright (c) &lt;year&gt; &lt;copyright holders&gt;

Permission <span class="hljs-keyword">is</span> hereby granted, free <span class="hljs-keyword">of</span> charge, <span class="hljs-keyword">to</span> any person obtaining a copy <span class="hljs-keyword">of</span> this software <span class="hljs-keyword">and</span> associated documentation files (the <span class="hljs-string">"Software"</span>), <span class="hljs-keyword">to</span> deal <span class="hljs-keyword">in</span> the Software without restriction, including without limitation the rights <span class="hljs-keyword">to</span> <span class="hljs-keyword">use</span>, copy, modify, merge, publish, distribute, sublicense, <span class="hljs-keyword">and</span>/<span class="hljs-keyword">or</span> sell copies <span class="hljs-keyword">of</span> the Software, <span class="hljs-keyword">and</span> <span class="hljs-keyword">to</span> permit persons <span class="hljs-keyword">to</span> whom the Software <span class="hljs-keyword">is</span> furnished <span class="hljs-keyword">to</span> do so, subject <span class="hljs-keyword">to</span> the following conditions:

The above copyright notice <span class="hljs-keyword">and</span> this permission notice shall be included <span class="hljs-keyword">in</span> <span class="hljs-keyword">all</span> copies <span class="hljs-keyword">or</span> substantial portions <span class="hljs-keyword">of</span> the Software.

THE SOFTWARE <span class="hljs-keyword">IS</span> PROVIDED <span class="hljs-string">"AS IS"</span>, WITHOUT WARRANTY <span class="hljs-keyword">OF</span> ANY KIND, EXPRESS <span class="hljs-keyword">OR</span> IMPLIED, INCLUDING BUT <span class="hljs-keyword">NOT</span> LIMITED <span class="hljs-keyword">TO</span> THE WARRANTIES <span class="hljs-keyword">OF</span> MERCHANTABILITY, FITNESS <span class="hljs-keyword">FOR</span> A PARTICULAR PURPOSE <span class="hljs-keyword">AND</span> NONINFRINGEMENT. <span class="hljs-keyword">IN</span> NO EVENT SHALL THE AUTHORS <span class="hljs-keyword">OR</span> COPYRIGHT HOLDERS BE LIABLE <span class="hljs-keyword">FOR</span> ANY CLAIM, DAMAGES <span class="hljs-keyword">OR</span> OTHER LIABILITY, WHETHER <span class="hljs-keyword">IN</span> AN ACTION <span class="hljs-keyword">OF</span> CONTRACT, TORT <span class="hljs-keyword">OR</span> OTHERWISE, ARISING FROM, <span class="hljs-keyword">OUT</span> <span class="hljs-keyword">OF</span> <span class="hljs-keyword">OR</span> <span class="hljs-keyword">IN</span> CONNECTION <span class="hljs-keyword">WITH</span> THE SOFTWARE <span class="hljs-keyword">OR</span> THE <span class="hljs-keyword">USE</span> <span class="hljs-keyword">OR</span> OTHER DEALINGS <span class="hljs-keyword">IN</span> THE SOFTWARE.</code></pre>
<h4>1.3 添加<code>README</code>或者<code>ReadMe.md</code>或者<code>README.md</code>文件</h4>
<ul>
<li><p>说明项目的一些信息</p></li>
<li><p>给出详细参考资料的链接</p></li>
<li><p>给读者一个整体的导航内容</p></li>
</ul>
<h4>1.4 添加<code>.gitignore</code> 文件，忽略不需要提交的文件变更</h4>
<ul>
<li><p>可以去<a href="https://github.com/github/gitignore" rel="nofollow noreferrer" target="_blank">github gitignore</a> 下载一个最相近的模板然后改改</p></li>
<li><p>可以去<a href="https://www.gitignore.io/" rel="nofollow noreferrer" target="_blank">gitignore.io</a>生成一个,然后把内容拿下了</p></li>
<li><p>可以参考<a href="https://github.com/joeblau/gitignore.io" rel="nofollow noreferrer" target="_blank">gitignore.io 文档</a>，自己配命令行工具，以便随时可以玩</p></li>
<li><p>我们这里生成了一个<a href="https://www.gitignore.io/api/node%2Cintellij%2Ball" rel="nofollow noreferrer" target="_blank">Node + IntellJ-all</a> 的结果</p></li>
<li><p>内容语法参考<a href="https://git-scm.com/docs/gitignore" rel="nofollow noreferrer" target="_blank">gitignore doc</a></p></li>
</ul>
<h4>1.5 初始化NPM包</h4>
<ul>
<li><p>使用<code>npm init</code> 初始化工程</p></li>
<li><p>按照提示填入相应的内容</p></li>
</ul>
<h4>1.6 到这里的目录结构</h4>
<ul><li><p>工程三大件以及npm包配置文件都有了</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="markdown-clear
------------- .gitignore
------------- LICENCE
------------- README.md
------------- package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>markdown-clear
-<span class="ruby">------------ .gitignore
</span>-<span class="ruby">------------ LICENCE
</span>-<span class="ruby">------------ README.md
</span>-<span class="ruby">------------ package.json</span></code></pre>
<h4>1.7 EditorConfig</h4>
<p>跨编辑器的编辑器设置，网站挂了，<a href="http://editorconfig.org/" rel="nofollow noreferrer" target="_blank">EditorConfig</a></p>
<h4>1.8 ESLint</h4>
<p>新一代JavaScript代码质量检测工具<a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank">ESLint</a></p>
<h3 id="articleHeader1">2 代码结构组织</h3>
<h4>2.1 加入代码相关的目录</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="markdown-clear
-------------- src     // 源代码目录 比如coffee,typescript,es6+等代码的目录
-------------- lib     // 转义生成的代码目录，比如babel转义后的es5代码的目录
-------------- docs    // 代码相关的设计和使用文档
-------------- tests   // 相关的测试目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>markdown-clear
-<span class="ruby">------------- src     /<span class="hljs-regexp">/ 源代码目录 比如coffee,typescript,es6+等代码的目录
</span></span>-<span class="ruby"><span class="hljs-regexp">------------- lib     /</span><span class="hljs-regexp">/ 转义生成的代码目录，比如babel转义后的es5代码的目录
</span></span>-<span class="ruby"><span class="hljs-regexp">------------- docs    /</span><span class="hljs-regexp">/ 代码相关的设计和使用文档
</span></span>-<span class="ruby"><span class="hljs-regexp">------------- tests   /</span><span class="hljs-regexp">/ 相关的测试目录</span></span></code></pre>
<h4>2.2 代码实现</h4>
<ul>
<li><p>写代码 src 目录</p></li>
<li><p>转换后的代码 lib 目录</p></li>
</ul>
<h5>2.2.1 使用babel 转换代码</h5>
<ul>
<li><p><a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">babel官网</a></p></li>
<li><p>babel 配置文件 <code>.babelrc</code></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;:[&quot;es2015&quot;,&quot;stage-0&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>:[<span class="hljs-string">"es2015"</span>,<span class="hljs-string">"stage-0"</span>]
}</code></pre>
<ul><li><p>添加 npm 命令</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;babel src -d lib&quot;,
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"babel src -d lib"</span>,
   }</code></pre>
<h5>2.2.2 实现一个可以全局安装的npm包</h5>
<ul><li><p>添加<code>package.json</code>的配置</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;bin&quot;: {
    &quot;markdown-clear&quot;: &quot;./lib/cli.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"bin"</span>: {
    <span class="hljs-string">"markdown-clear"</span>: <span class="hljs-string">"./lib/cli.js"</span>
  }</code></pre>
<ul><li><p><code>cli.js</code>文件第一行添加</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta">#!/usr/bin/env node</span></code></pre>
<h4>2.3 测试</h4>
<ul>
<li><p>写测试用例 tests 目录</p></li>
<li><p>调用最终生成的 lib 下面的目录</p></li>
<li><p>可以考虑使用测试框架 mocha, jasmine, karma...</p></li>
</ul>
<h5>2.3.1 安装测试</h5>
<ul><li><p>使用npm 安装本地文件 作为本地包</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install path/to/markdown-clear" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">path</span>/<span class="hljs-keyword">to</span>/markdown-<span class="hljs-keyword">clear</span></code></pre>
<ul><li><p>使用npm 安装本地文件 作为全局包</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install path/to/markdown-clear -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">path</span>/<span class="hljs-keyword">to</span>/markdown-<span class="hljs-keyword">clear</span> -g</code></pre>
<h4>2.4 文档输出</h4>
<ul>
<li><p>写文档 docs 目录</p></li>
<li><p>写代码相关的设计和使用文档，没有自然可以不用写</p></li>
<li><p>这里的文档应该在README.md 中会有入口。</p></li>
</ul>
<h3 id="articleHeader2">3 发布NPM包</h3>
<ul>
<li><p><a href="https://docs.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm文档</a></p></li>
<li><p>如果没有注册npm账户</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm adduser USERNAME" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">npm</span> <span class="hljs-keyword">adduser </span>USERNAME</code></pre>
<ul><li><p>如果没有登录</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> login</code></pre>
<ul><li><p>登录后发布包，在工程目录下执行</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> publish</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何自己写一个公用的NPM包

## 原文链接
[https://segmentfault.com/a/1190000010521272](https://segmentfault.com/a/1190000010521272)

