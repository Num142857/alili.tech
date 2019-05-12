---
title: '在npm上发布你的组件' 
date: 2019-01-17 2:30:25
hidden: true
slug: m2el4orij7k
categories: [reprint]
---

{{< raw >}}

                    
<p>现如今npm已经成为前端开发中必不可少的一部分，目前在npm上发布的包超过34万个，每周仍有超过1万个新包被发布，包一周下载量超过十亿次。作为一名好奇的前端，自然希望能把自己造的轮子让更多人看到。不同于传统的js模块，发布我们的组件还需要多一丢丢东西要做：</p>
<ol>
<li><p>设置npm账号</p></li>
<li><p>设置忽略项</p></li>
<li><p>使用babel cli</p></li>
<li><p>发布</p></li>
<li><p>组件质量认证</p></li>
</ol>
<h2 id="articleHeader0">1.设置npm账号</h2>
<p>首先，要在npm发布包，首先得<a href="https://www.npmjs.com/signup" rel="nofollow noreferrer" target="_blank">注册一个账号</a>，与github一样，npm对于公共包是免费的。</p>
<p>第二步，添加账号。在我们的Dos环境下，输入命令<code>npm adduser</code>，然后键入你在npm上注册的账号和密码。另外，<code>npm config ls</code>可以查看你的npm配置。</p>
<p>接下来，使用<code>npm publish</code>就可以发布你的包了。但在发布之前，我们还有一些工作要做。</p>
<h2 id="articleHeader1">2.设置忽略项</h2>
<p>一个简单的js模块可能就只需要一个js文件，而一个完善的组件，往往还需要测试、文档、样例等目录，对于ES6或其他语法编写的源代码，还会有编译的目录。例如，ant-design的项目目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-components
|-coverage
|-dist
|-docs
|-lib
|-node_modules
|-scripts
|-site
|-tests
|-typings
|-.babelrc
|-.gitignore
|-package.json
|-webpack.config.js
|-..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-components</span>
<span class="hljs-string">|-coverage</span>
<span class="hljs-string">|-dist</span>
<span class="hljs-string">|-docs</span>
<span class="hljs-string">|-lib</span>
<span class="hljs-string">|-node_modules</span>
<span class="hljs-string">|-scripts</span>
<span class="hljs-string">|-site</span>
<span class="hljs-string">|-tests</span>
<span class="hljs-string">|-typings</span>
<span class="hljs-string">|-.babelrc</span>
<span class="hljs-string">|-.gitignore</span>
<span class="hljs-string">|-package.json</span>
<span class="hljs-string">|-webpack.config.js</span>
<span class="hljs-string">|-...</span></code></pre>
<p>我们不需要把所有文件或目录提交到npm包，可以看到antd发布的包仅包含了其中几项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-dist
|-lib
|-package.json
|-..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>|-dist
|-<span class="hljs-class"><span class="hljs-keyword">lib</span></span>
|-package.json
|-...</code></pre>
<p>npm会发布所有的文件，除了.gitignore所忽略的文件。也可以使用.npmignore来覆盖.gitignore配置的忽略。不过，有一种更便捷的方式，就是在package.json中设置你要发布的文件或路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;files&quot;: [
       &quot;dist&quot;,
    &quot;lib&quot;
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"files"</span>: [
       <span class="hljs-string">"dist"</span>,
    <span class="hljs-string">"lib"</span>
  ],
}</code></pre>
<p>如上配置，就只有dist和lib目录会被发布出去，不过，有些文件是npm不会忽略的，有些文件是npm一定会忽略的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不会被npm忽略的文件
package.json
README (and its variants)
CHANGELOG (and its variants)
LICENSE / LICENCE

// 一定会忽略的
node_modules
.*.swp
._*
.DS_Store
.git
.hg
.npmrc
.lock-wscript
.svn
.wafpickle-*
config.gypi
CVS
npm-debug.log" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>// 不会被npm忽略的文件
package.json
README (<span class="hljs-keyword">and</span> its variants)
CHANGELOG (<span class="hljs-keyword">and</span> its variants)
LICENSE / LICENCE

// 一定会忽略的
node_modules
.*.swp
<span class="hljs-meta">._</span>*
<span class="hljs-meta">.DS_Store</span>
<span class="hljs-meta">.git</span>
<span class="hljs-meta">.hg</span>
<span class="hljs-meta">.npmrc</span>
<span class="hljs-meta">.lock-wscript</span>
<span class="hljs-meta">.svn</span>
<span class="hljs-meta">.wafpickle-</span>*
config.gypi
CVS
npm-debug.log</code></pre>
<h2 id="articleHeader2">3.使用babel cli</h2>
<p>现在，拜babel的强大功能，前端越来越多的使用更方便、更强大的语法，如ES6、ES7、jsx等，来编写代码。在发布代码前，我们必须要考虑到用户的使用环境，他们可能不使用这些语法进行开发，那么，最好的做法就是把所有源代码转译成兼容的ES5代码。仔细看上面的目录，会发现发布的组件并不是我们的源代码<code>/src</code>，而是编译到<code>/lib</code>和<code>/dist</code>的js文件。</p>
<p>首先，要先安装babel cli，安装好后就可以使用babel命令编译</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-cli</code></pre>
<p>第二步，配置<code>.babelrc</code>文件，把你需要的babel插件添加进去。如果你使用webpack，就可以把babel-loader的配置项项目复制到这个配置文件，以下是我一个React项目的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;es2015&quot;,
    &quot;stage-2&quot;,
    &quot;react&quot;
  ],
  plugins: ['transform-decorators-legacy'],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"es2015"</span>,
    <span class="hljs-string">"stage-2"</span>,
    <span class="hljs-string">"react"</span>
  ],
  plugins: ['transform-decorators-legacy'],
}</code></pre>
<p>其中plugins配置的是ES7装饰者（非必需）。接下来，在package.json中配置脚本来运行babel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;clean&quot;: &quot;rd /s/q lib &amp;&amp; mkdir lib&quot;,
  &quot;lib&quot;: &quot;npm run clean &amp;&amp; babel src --out-dir lib 
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"clean"</span>: <span class="hljs-string">"rd /s/q lib &amp;&amp; mkdir lib"</span>,
  <span class="hljs-string">"lib"</span>: "npm <span class="hljs-keyword">run</span> clean &amp;&amp; babel src --<span class="hljs-keyword">out</span>-<span class="hljs-keyword">dir</span> lib 
},</code></pre>
<p>这里，先清空lib目录，然后将<code>/src</code>的源文件，用babel转译至<code>/lib</code>目录下，<code>/lib</code>就是我们要发布的目录，在DOS中键入<code>npm run lib</code>就能看到效果了。当然，脚本的具体配置因项目而异。</p>
<h2 id="articleHeader3">4.发布</h2>
<p>至此，为项目取个不重复的响亮名字，在DOS项目目录下输入<code>npm publish</code>就能发布你的组件了。每次发布时，需要注意更新版本号:</p>
<blockquote><p>一般来讲大部分的软件版本号分3段，比如 A.B.C</p></blockquote>
<ul>
<li><p>A 表示大版本号，一般当软件整体重写，或出现不向后兼容的改变时，增加A，A为零时表示软件还在开发阶段。</p></li>
<li><p>B 表示功能更新，出现新功能时增加B</p></li>
<li><p>C 表示小修改，如修复bug，只要有修改就增加C</p></li>
</ul>
<p>为了让更多人了解发布的包，务必加上精炼的README文档，中、英文最好。</p>
<h2 id="articleHeader4">5.组件质量认证</h2>
<p>一个包能够被用户采用，除了功能满足需求，稳定的版本、充分的测试、准确地文档、合适的样例、npm下载量等等，都可能是用户的考察项。另外，最好将你的项目开源到github上，github能够自动连接CI服务，在线上测试你的代码，并提供诸如代码覆盖率报告等服务，并把这些信息用小标签的形式展现出来，来给包的质量背书。下面是antd的小标签：</p>
<p><a href="https://travis-ci.org/ant-design/ant-design" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836100" src="https://static.alili.tech/img/remote/1460000008836100" alt="" title="" style="cursor: pointer;"></span></a><br><a href="https://codecov.io/gh/ant-design/ant-design/branch/master" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836101" src="https://static.alili.tech/img/remote/1460000008836101" alt="Codecov" title="Codecov" style="cursor: pointer;"></span></a><br><a href="https://gemnasium.com/ant-design/ant-design" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836102" src="https://static.alili.tech/img/remote/1460000008836102" alt="Dependency Status" title="Dependency Status" style="cursor: pointer;"></span></a><br><a href="https://www.npmjs.org/package/antd" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836103" src="https://static.alili.tech/img/remote/1460000008836103" alt="npm package" title="npm package" style="cursor: pointer;"></span></a><br><a href="https://npmjs.org/package/antd" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836104" src="https://static.alili.tech/img/remote/1460000008836104" alt="NPM downloads" title="NPM downloads" style="cursor: pointer; display: inline;"></span></a><br><a href="http://isitmaintained.com/project/ant-design/ant-design" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836105" src="https://static.alili.tech/img/remote/1460000008836105" alt="Percentage of issues still open" title="Percentage of issues still open" style="cursor: pointer; display: inline;"></span></a><br><a href="https://gitter.im/ant-design/ant-design?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008836106" src="https://static.alili.tech/img/remote/1460000008836106" alt="Join the chat at https://gitter.im/ant-design/ant-design" title="Join the chat at https://gitter.im/ant-design/ant-design" style="cursor: pointer; display: inline;"></span></a></p>
<p>如果对如何获得这些标签感兴趣，可以关注我之后的文章(ง •̀_•́)ง。</p>
<h2 id="articleHeader5">写在最后</h2>
<p>中国互谅网行业的快速发展全世界有目共睹，希望在开源生态里，能看到越来越多的中国名字。</p>
<p><a href="https://github.com/huangbuyi/react-freecolor" rel="nofollow noreferrer" target="_blank">★★react-freecolor★★</a>是我开发一个react组件，没开发完，但目录结构和项目配置基本成型，有兴趣的可以看看。</p>
<h2 id="articleHeader6">参考</h2>
<ul>
<li><p><a href="https://unpm.nodesource.com/" rel="nofollow noreferrer" target="_blank">understand npm</a></p></li>
<li><p><a href="https://www.zhihu.com/question/20289602" rel="nofollow noreferrer" target="_blank">软件的版本号是如何确定的？</a></p></li>
<li><p><a href="http://shields.io/" rel="nofollow noreferrer" target="_blank">shields.i</a></p></li>
<li><p><a href="http://4bin.cn" rel="nofollow noreferrer" target="_blank">4bin's Blog</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在npm上发布你的组件

## 原文链接
[https://segmentfault.com/a/1190000008836097](https://segmentfault.com/a/1190000008836097)

