---
title: 'webpack的安装和配置' 
date: 2018-12-07 2:30:09
hidden: true
slug: w85hqdsjihg
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack的配置问题一直很让人头疼，最近我也在学习webpack，看着网上的教程，也想着把自己的学习过程写下来。<br>首先，配置webpack需要先安装nodejs，这是nodejs的官网<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">链接描述</a>记得需要node8以上的版本</p>
<p>点开下载包，一路next下去，然后我们的nodejs就安装完成了，想卸载也可以再点击一次这个安装包来uninstall。<br><span class="img-wrap"><img data-src="/img/bV7Oi1?w=499&amp;h=388" src="https://static.alili.tech/img/bV7Oi1?w=499&amp;h=388" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV7OmM?w=499&amp;h=389" src="https://static.alili.tech/img/bV7OmM?w=499&amp;h=389" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来是安装webpack<br>打开cmd命令行，输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> webpack -g</code></pre>
<p>系统就会自动下载安装包 -g代表全局安装<br>成功应该是如图所示效果<br><span class="img-wrap"><img data-src="/img/bV7Oo0?w=993&amp;h=519" src="https://static.alili.tech/img/bV7Oo0?w=993&amp;h=519" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV7Oo8?w=993&amp;h=519" src="https://static.alili.tech/img/bV7Oo8?w=993&amp;h=519" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>接下来输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">webpack <span class="hljs-comment">--version</span></code></pre>
<p>会有下图的提示<br><span class="img-wrap"><img data-src="/img/bV7Ope?w=993&amp;h=519" src="https://static.alili.tech/img/bV7Ope?w=993&amp;h=519" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>提示我们需要webpack-cli<br>输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g webpack-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g webpack-cli</code></pre>
<p>系统会自动给我们安装webpack-cli<br>之后再输入webapck --version，就会展示我们安装的webpack的版本号了，如图所示<br><span class="img-wrap"><img data-src="/img/bV7OEc?w=677&amp;h=442" src="https://static.alili.tech/img/bV7OEc?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这时候我们全局的webpack变量就安装完啦！</p>
<p>接下来是如何使用webpack了<br>找到你的项目文件夹，shift+右键，在命令行中打开，此时的目录就是当前目录，然后我们输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV7OxQ?w=677&amp;h=442" src="https://static.alili.tech/img/bV7OxQ?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>就会如下图所示，要你写版本号等各种信息什么的，一路回车下去就是了</p>
<p><span class="img-wrap"><img data-src="/img/bV7Ox7?w=677&amp;h=442" src="https://static.alili.tech/img/bV7Ox7?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后你会发现文件夹中多了一个package.json文件，<br>接下来在命令行中输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm  install webpack --save-dev 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm  install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> 
</code></pre>
<p>-dev是表示开发环境的依赖，也可以取消掉dev这是生成环境的依赖<br>等待系统安装完毕之后，就会发现在项目文件夹下多了一个node_modules文件夹，此时我们的项目目录的webpack就安装成功了，目录结构入下图所示<br><span class="img-wrap"><img data-src="/img/bV7OyR?w=853&amp;h=600" src="https://static.alili.tech/img/bV7OyR?w=853&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是webapck的安装流程，具体的配置流程我也写了一篇文章<a href="https://segmentfault.com/a/1190000014271439?_ea=3591482">链接描述</a>，希望能帮到头疼webpack的大家。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack的安装和配置

## 原文链接
[https://segmentfault.com/a/1190000014213597](https://segmentfault.com/a/1190000014213597)

