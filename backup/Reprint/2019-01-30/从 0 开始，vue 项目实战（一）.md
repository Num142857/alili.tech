---
title: '从 0 开始，vue 项目实战（一）' 
date: 2019-01-30 2:30:23
hidden: true
slug: ozixvh5k6qj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>从 0 开始开发一个 vue 的 SPA 项目。<br>如果你还没有学习过 vue，请先按照 <a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">官网</a> 或者 <a href="https://vuefe.cn/v2/guide/" rel="nofollow noreferrer" target="_blank">社区</a> 的教程做一遍。<br>像这样，做几个例子，不然的话看这篇文章的意义不大。</p>
<p><span class="img-wrap"><img data-src="/img/bVGjI8?w=1425&amp;h=763" src="https://static.alili.tech/img/bVGjI8?w=1425&amp;h=763" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这篇文章比较适合已经跟着官网的例子做了一遍的朋友们看。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>这篇文章比较适合已经跟着官网的例子做了一遍的朋友们看。
</code></pre>
<h2 id="articleHeader1">技术栈</h2>
<p>vue2 + vuex + vue-router + mint-ui + zepto + es6 + less<br>另外参考了小伙伴提供  <a href="https://github.com/shinygang/Vue-cnodejs" rel="nofollow noreferrer" target="_blank">vue项目例子</a>，大家也可以去看一下。</p>
<h2 id="articleHeader2">环境搭建</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果你已经跟着教程做一遍了，那么接下来可以来做项目了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">如果你已经跟着教程做一遍了，那么接下来可以来做项目了</code></pre>
<p>以前我只会写点jquery ，会一点切图，对 vue 并没有怎么了解。<br>虽然说 jquery 已经很方便开发了，操作 dom 非常的方便，然而 vue 不用操作 dom 让我觉得原来可以这么简单。<br>大家是不是还经历过这样的项目结构呢？<br><span class="img-wrap"><img data-src="/img/bVGjdz?w=172&amp;h=124" src="https://static.alili.tech/img/bVGjdz?w=172&amp;h=124" alt="目录结构" title="目录结构" style="cursor: pointer; display: inline;"></span></p>
<p>一直以来我觉得这样子就可以了，想要什么就去插件网上下载就好了，比如 jquery，jquery.datepicker 等等。<br>这完全没有什么问题，在我还只会切切图的时候我就是这样的项目结构。<br>然而现在需要搭建一个复杂一点的环境，这会帮助我们做一些 合并压缩，热更新，自动化等等一些麻烦事，方便我们的开发。<br>我们不再推荐下载 vue.js 到 js 文件夹，然后 html 里面引入使用。<br>然而写这些配置是相当麻烦的一件事，这里 vue-cli 帮助我们很好的解决了这个问题。<br>它能自动帮助我们生成一些配置和基础项目。<br>它生成的项目结构是这样子的。<br>(～￣▽￣)～</p>
<p><span class="img-wrap"><img data-src="/img/bVGjeB?w=291&amp;h=315" src="https://static.alili.tech/img/bVGjeB?w=291&amp;h=315" alt="新的目录结构biaoqing" title="新的目录结构biaoqing" style="cursor: pointer; display: inline;"></span></p>
<p>不得不说真是方便呢，如果对前端工程化一点基础的没有，是不是瞬间懵逼呢？ (｡･∀･)ﾉﾞ<br>是的，刚开始我也觉得这个很奇怪，为什么要弄的这么复杂，难道以前那样子不好吗？&lt;(￣ˇ￣)/<br>我以前的话基本上是写个模板，然后扔给后端，让后端去使用这个模板，现在前后端分离了，自然而然前端就需要一个项目，当然不能像之前那么简单啦，以前那样的目录只是方便后端使用而已。(○´･д･)ﾉ<br>压缩编译这些东西都得前端来解决，不能再像之前那样子了。</p>
<p>那么，跟着下面的步骤一步步搭建好环境吧。</p>
<p><strong>1、下载 <a href="http://rj.baidu.com/soft/detail/30195.html" rel="nofollow noreferrer" target="_blank">Git</a> </strong><br>首先需要下载一个命令行工具，话说我是QQ电脑管家里面直接下载的，也可以点<a href="http://rj.baidu.com/soft/detail/30195.html" rel="nofollow noreferrer" target="_blank">这里</a>下载<br>如果有的话就不需要了，win10 自带的命令行也是可以的。<br><span class="img-wrap"><img data-src="/img/bVGjfN?w=347&amp;h=86" src="https://static.alili.tech/img/bVGjfN?w=347&amp;h=86" alt="git命令行工具" title="git命令行工具" style="cursor: pointer;"></span></p>
<p><strong>2、下载 <a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node</a></strong><br>然后下载一个node。<br><span class="img-wrap"><img data-src="/img/bVGjgS?w=396&amp;h=80" src="https://static.alili.tech/img/bVGjgS?w=396&amp;h=80" alt="node" title="node" style="cursor: pointer;"></span></p>
<p><strong>3、使用命令行</strong><br>然后新建个文件夹放你的项目，进入文件夹，右键打开命令行工具。<br><span class="img-wrap"><img data-src="/img/bVGjjP?w=569&amp;h=457" src="https://static.alili.tech/img/bVGjjP?w=569&amp;h=457" alt="右键打开命令行工具" title="右键打开命令行工具" style="cursor: pointer;"></span></p>
<p><strong>4、使用淘宝镜像资源 <a href="http://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">cnpm</a></strong><br>输入下面这个东西，安装淘宝镜像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g cnpm --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install -g cnpm --registry=https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org</code></pre>
<p>这个比 npm 好用。</p>
<p><span class="img-wrap"><img data-src="/img/bVGjkt?w=532&amp;h=196" src="https://static.alili.tech/img/bVGjkt?w=532&amp;h=196" alt="cnpm" title="cnpm" style="cursor: pointer;"></span></p>
<p>输入一下指令看是否安装完成。<br><span class="img-wrap"><img data-src="/img/bVGjk5?w=546&amp;h=256" src="https://static.alili.tech/img/bVGjk5?w=546&amp;h=256" alt="安装完成" title="安装完成" style="cursor: pointer; display: inline;"></span></p>
<p><strong>如果安装失败请尝试清一下缓存再安装！</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm cache clean
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> cache clean
</code></pre>
<p><strong>5、安装 webpack vue-cli</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install -g vue-cli
cnpm install -g webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>cnpm <span class="hljs-keyword">install</span> -g vue-cli
cnpm <span class="hljs-keyword">install</span> -g webpack
</code></pre>
<p>输入一下 <strong>-v</strong> ，测试是否安装成功<br><span class="img-wrap"><img data-src="/img/bVGjyb?w=659&amp;h=614" src="https://static.alili.tech/img/bVGjyb?w=659&amp;h=614" alt="安装成功" title="安装成功" style="cursor: pointer; display: inline;"></span></p>
<p><strong>6、生成项目</strong><br>只要输入这三个东西之后一直 n 回车就好了，至于下面那堆是什么暂时就不管了。(⊙v⊙)<br>第一遍如果等待时间太长 直接 ctrl + c 跳出就好了。<br><span class="img-wrap"><img data-src="/img/bVGjX0?w=714&amp;h=688" src="https://static.alili.tech/img/bVGjX0?w=714&amp;h=688" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>到这里项目已经生成完毕了，你可以在目录下面看到你生成的项目了。</p>
<p><strong>7、启动项目</strong><br>然后按照提示安装一下以来，我们就可以看到页面了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd menu
cnpm install &amp;&amp; cnpm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>cd menu
cnpm install &amp;&amp; cnpm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGjBs?w=693&amp;h=436" src="https://static.alili.tech/img/bVGjBs?w=693&amp;h=436" alt="生成成功" title="生成成功" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVGjCO?w=686&amp;h=686" src="https://static.alili.tech/img/bVGjCO?w=686&amp;h=686" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="恭喜恭喜，我们已经成功的搭建了一个项目了，接下来我们需要一款编辑器，如果你使用其他编辑器也是可以的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>恭喜恭喜，我们已经成功的搭建了一个项目了，接下来我们需要一款编辑器，如果你使用其他编辑器也是可以的。
</code></pre>
<p><strong>8、下载编辑器 <a href="https://code.visualstudio.com/?utm_expid=101350005-35.Eg8306GUR6SersZwpBjURQ.0&amp;utm_referrer=https://www.baidu.com/link?url=3L13-ETpRSaH3BBuKYGnicacUpOKsFZ0jEQ3Fc0J_aJBjtZ9Bn_0q9K9qVoffy0B&amp;wd=&amp;eqid=dedbeaea0000acb500000004583fcee7" rel="nofollow noreferrer" target="_blank">vscode</a></strong><br><span class="img-wrap"><img data-src="/img/bVGjhv?w=345&amp;h=80" src="https://static.alili.tech/img/bVGjhv?w=345&amp;h=80" alt="vscode" title="vscode" style="cursor: pointer;"></span></p>
<p>再装一下 vscode 里面的一些插件<br><span class="img-wrap"><img data-src="/img/bVGjhW?w=1031&amp;h=683" src="https://static.alili.tech/img/bVGjhW?w=1031&amp;h=683" alt="vscode插件" title="vscode插件" style="cursor: pointer; display: inline;"></span></p>
<p>安装了记得开启 <strong>主题</strong> 和 <strong>文件图标主题</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVGjik?w=618&amp;h=534" src="https://static.alili.tech/img/bVGjik?w=618&amp;h=534" alt="插件使用" title="插件使用" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">项目结构</h2>
<p>到这里我们就搭建好了需要的开发环境，接下我们就可以开始开发了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package.json 保存了我们刚才安装的选项和依赖。 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>package<span class="hljs-selector-class">.json</span> 保存了我们刚才安装的选项和依赖。 
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGjGJ?w=1024&amp;h=768" src="https://static.alili.tech/img/bVGjGJ?w=1024&amp;h=768" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">最后</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果有什么想跟我讨论的话，请私信。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>如果有什么想跟我讨论的话，请私信。
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 开始，vue 项目实战（一）

## 原文链接
[https://segmentfault.com/a/1190000007663659](https://segmentfault.com/a/1190000007663659)

