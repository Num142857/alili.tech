---
title: '慕课 《React.js入门基础与案例开发》 总结' 
date: 2019-01-13 2:30:11
hidden: true
slug: q1zxeb4o9eh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">慕课  《React.js入门基础与案例开发》 总结</h2>
<blockquote><p>最近在慕课网听了React入门的项目，写篇文章小结一下，为这个课程画上一个句号。</p></blockquote>
<h3 id="articleHeader1">1.预备知识</h3>
<blockquote><p>这个课程的内容是用<code>React</code>写一个新闻网页，我们用<code>npm</code>来管理项目，且使用<code>webpack</code>模块打包机进行打包。</p></blockquote>
<p><strong>1.1 关于<code>npm</code></strong></p>
<p><code>npm</code>通常称为<code>node</code>包管理器。顾名思义，它的主要功能就是管理<code>node</code>包，包括：安装、卸载、更新、查看、搜索、发布等；</p>
<p>在进行此项目之前，我有一定的<code>npm</code>基础，所以在做项目的过程中，没有遇到太多问题。想了解<code>npm</code>的小伙伴可以参考下面两篇文章：</p>
<ul>
<li><p><a href="http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143450141843488beddae2a1044cab5acb5125baf0882000" rel="nofollow noreferrer" target="_blank">安装Node.js和npm</a></p></li>
<li><p><a href="http://www.tuicool.com/articles/VB7nYn" rel="nofollow noreferrer" target="_blank">NPM小结 - 程序猿小卡</a></p></li>
</ul>
<hr>
<p><strong>主要回顾一下<code>npm</code>配置国内资源</strong></p>
<blockquote><p><code>npm</code>是一个非常大的<code>JavaScript</code>包，但是在国外，所以由于网速的原因，我们使用<code>npm</code>进行安装的时候，有时会失败。</p></blockquote>
<p>还好，淘宝做了一个<code>npm</code>的国内镜像。我们安装之后，使用<code>cnpm install [xxx]</code> 命令使用淘宝的镜像进行安装了。<code>cnpm</code>的安装和使用<a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">淘宝 NPM 镜像</a>说的很清晰。</p>
<p>另一种方式是直接修改<code>npm</code>的配置项<code>register</code>，将<code>npm</code>所在的位置修改为淘宝的地址，Mac 的做法如下：在命令行中输入如下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd ~ //进入根目录
atom .npmrc //用atom打开.npmrc文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>cd ~ <span class="hljs-comment">//进入根目录</span>
atom <span class="hljs-selector-class">.npmrc</span> <span class="hljs-comment">//用atom打开.npmrc文件</span></code></pre>
<p>将<code>.npmrc</code>文件中的内容修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registry = https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">registry = <span class="hljs-string">https:</span><span class="hljs-comment">//registry.npm.taobao.org</span></code></pre>
<p>这样我们使用 <code>npm install [xxx]</code> 就是从淘宝镜像进行安装了。</p>
<p>注：关于npm配置国内资源，慕课老师写了一篇文章，讲的很是明白<a href="http://blog.parryqiu.com/2016/08/18/ionic_installation/" rel="nofollow noreferrer" target="_blank">使用 CNPM 进行 Ionic 环境的安装与配置</a></p>
<p><strong>1.2 关于<code>webpack</code></strong></p>
<blockquote><p><code>webpack</code>是一个强大的模块打包机，本项目中使用了<code>React</code>和<code>ES6</code>的语法，所以使用<code>webpack</code>是非常合适的呢！</p></blockquote>
<p><code>webpack</code>的内容还是很多的，比如说配置文件<code>webpack.config.js</code>、<code>loader</code>的配置等等；我在学习<code>webpack</code>的过程中，还是花了很多力气的。想学习<code>webpack</code>的小伙伴，我推荐下面这篇文章（真心讲的很好）：</p>
<ul><li><p><a href="http://www.jianshu.com/p/42e11515c10f" rel="nofollow noreferrer" target="_blank">入门Webpack，看这篇就够了</a></p></li></ul>
<hr>
<p><strong>我们主要说说<code>webpack</code>的热加载的配置，这个功能真的很好用。</strong></p>
<ol>
<li><p>常规情况下，我们配置好<code>webpack.config.js</code>文件之后，使用<code>webpack</code>命令进行打包，然后手动刷新页面。就是说，我们在编写代码的过程中，要不断的执行<code>webpack</code>命令，再手动刷新，才能看到效果。</p></li>
<li><p>还有一种厉害一点的方法，<code>webpack --watch</code> 命令来动态监听文件的改变并实时打包，输出新 bundle.js 文件，但是还是要我们手动进行刷新。</p></li>
<li>
<p>最厉害的就是热加载， <code>webpack-dev-server </code>主要是启动了一个使用 <code>express</code> 的 <code>Http</code>服务器 。它的作用主要是用来伺服资源文件 。此外这个 <code>Http</code>服务器 和 <code>client</code> 使用了 <code>websocket</code> 通讯协议，原始文件作出改动后， <code>webpack-dev-server</code> 会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，实时编译后的文件都保存到了内存当中。因此使用<code>webpack-dev-server</code>进行开发的时候都看不到编译后的文件。</p>
<ul>
<li><p>首先安装 <code>npm install webpack-dev-server</code></p></li>
<li><p>终端输入命令 <code>webpack-dev-server --inline</code></p></li>
</ul>
</li>
</ol>
<p>这样我们在浏览器输入  <code>http://localhost:8080/</code> 就能看到我们编写的页面了，并能时时刷新。</p>
<p><strong>需要注意的是：</strong></p>
<ul>
<li><p><code>webpack-dev-server</code>并不能读取你的<code>webpack.config.js</code>的配置<code>output </code>，你在<code>webpack.config.js</code>里面的配置<code>output</code>属性是你用<code>webpack</code>打包时候才起作用的，对<code>webpack-dev-server</code>并不起作用</p></li>
<li><p><code>webpack-dev-server</code>打包生产的文件并不会添加在你的项目目录中。你启动<code>webpack-dev-server</code>后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中，它默认打包的文件名是bundle.js。</p></li>
<li>
<p>因此在使用热加载时，我们引入的文件应该是<code>webpack-dev-server</code>打包生产的文件(引用<code>bundle.js</code>文件需要直接引用根目录下面的！)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样就能享受时时刷新的待遇啦！</p>
</li>
</ul>
<h3 id="articleHeader2">2.框架</h3>
<p>项目中使用<code>AntDesign</code>框架来书写样式，<code>AntDesign</code>框架的很多组件很好用，比如：<code>Tabs</code>、<code>Form</code>、<code>Carousel</code>、<code>Modal</code>、<code>Menu</code>、<code>Button</code>等；<br><code>AntDesign</code>的 <a href="https://ant.design/index-cn" rel="nofollow noreferrer" target="_blank">官网</a> 是中文的，学习起来容易一些呢！</p>
<p><code>React</code>项目的重点当然是<code>React</code>了，<code>React</code>的核心思想是数据驱动，我们从后台取到数据，再将取到的数据用 <code>this.setState()</code>进行保存，从而导致页面重新<code>render</code>。关于<code>React</code>我也在学习的过程中，下面的三篇文献是我最近正在学习的：</p>
<ul>
<li><p><a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">React 入门实例教程</a></p></li>
<li><p><a href="https://discountry.github.io/react/" rel="nofollow noreferrer" target="_blank">React官网</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu" rel="nofollow noreferrer" target="_blank">React Router 使用教程</a></p></li>
</ul>
<hr>
<p>阮一峰大神曾说过：真正学会 React 是一个漫长的过程。</p>
<p>一起加油吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
慕课 《React.js入门基础与案例开发》 总结

## 原文链接
[https://segmentfault.com/a/1190000009544877](https://segmentfault.com/a/1190000009544877)

