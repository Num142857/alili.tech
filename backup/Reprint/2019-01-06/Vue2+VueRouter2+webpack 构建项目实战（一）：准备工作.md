---
title: 'Vue2+VueRouter2+webpack 构建项目实战（一）：准备工作' 
date: 2019-01-06 2:30:10
hidden: true
slug: wspz6ch008
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">环境准备</h2>
<p>首先，要开始工作之前，还是需要把环境搭建好。需要的环境是nodejs+npm，当然现在安装node都自带了npm。</p>
<p>在终端下面输入命令<code>node -v</code>会有版本号出来。就说明安装成功了。输入<code>npm -v</code>也会有版本号出来，就说明，npm也已经安装好了。</p>
<h2 id="articleHeader1">vue-cil构建项目</h2>
<p><code>vue-cil</code>是vue的脚手架工具。其模板可以通过 <a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vuejs-templates</a> 来查看。</p>
<p>首先安装<code>vue-cil</code>，命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">$ npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<blockquote><p>注：上面代码中的 $ 为终端前缀，不是让你输入的。下面涉及到终端的部分均是如此，不再累述。</p></blockquote>
<p>这个命令是全局安装，只需要运行一次就可以了。</p>
<p>首先进入到工程目录下，命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd  vue_test_project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">cd</span>  vue_test_project</code></pre>
<p>新建一个vue项目,创建一个基于"webpack"的项目,项目名为vuedemo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vue init webpack vuedemo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>vue init webpack vuedemo</code></pre>
<p>输入这个命令之后，会出现一些提示，是什么不用管，一直按回车即可。<br><span class="img-wrap"><img data-src="/img/bVRVSP?w=630&amp;h=445" src="https://static.alili.tech/img/bVRVSP?w=630&amp;h=445" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，就说明我们的项目构建成功了。</p>
<p>接下来进入项目目录下安装依赖，进入目录命令：<code>cd vuedemo</code>,安装依赖命令：<code>npm install</code></p>
<p>总命令如下，依次执行就行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd vuedemo
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd vuedemo
<span class="hljs-variable">$ </span>npm install</code></pre>
<p>执行npm install需要一点时间，因为会从服务器上下载代码啦之类的。并且在执行过程中会有一些警告信息。不用管，等着就是了。如果长时间没有响应，就<code>ctrl+c</code>停止掉，然后再执行一次即可。</p>
<p>安装完成后，如图所示：<br><span class="img-wrap"><img data-src="/img/bVRVY7?w=352&amp;h=674" src="https://static.alili.tech/img/bVRVY7?w=352&amp;h=674" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>最后运行测试，执行下面一句，把项目跑起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>执行后,如图所示：<br><span class="img-wrap"><img data-src="/img/bVRVZ5?w=545&amp;h=226" src="https://static.alili.tech/img/bVRVZ5?w=545&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在运行了npm run dev之后，会自动打开一个浏览器窗口，就可以看到实际的效果了。如图所示：<br><span class="img-wrap"><img data-src="/img/bVRV0T?w=1149&amp;h=609" src="https://static.alili.tech/img/bVRV0T?w=1149&amp;h=609" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好，我们的第一步，已经顺利完成了。</p>
<h2 id="articleHeader2">总结</h2>
<p>总结一下vue-cil构建项目的基本步骤：</p>
<ul>
<li>首先安装vue-cil，命令：<code>$ npm install -g vue-cli</code>
</li>
<li>创建一个基于"webpack"的项目，项目名为‘vuedemo’,命令：<code>$ vue init webpack vuedemo</code>
</li>
<li>进入项目目录下安装依赖，进入目录命令：<code>cd vuedemo</code>,安装依赖命令：<code>npm install</code>
</li>
<li>最后运行测试。依赖安装完成后就可以运行我们的项目了命令：<code>npm run dev</code>
</li>
</ul>
<h2 id="articleHeader3">参考</h2>
<p>参考地址：<a href="http://blog.csdn.net/fungleo/article/details/53171052" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/fungleo/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2+VueRouter2+webpack 构建项目实战（一）：准备工作

## 原文链接
[https://segmentfault.com/a/1190000010432463](https://segmentfault.com/a/1190000010432463)

