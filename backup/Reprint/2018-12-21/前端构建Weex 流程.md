---
title: '前端构建Weex 流程' 
date: 2018-12-21 2:30:11
hidden: true
slug: 9tzbyi9c7g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">weex初识</h2>
<blockquote>weex 具有很多优势。</blockquote>
<ul>
<li>一种代码 多端运行</li>
<li>减少包的大小</li>
<li>无痕改bug</li>
<li>vue语法</li>
</ul>
<blockquote>weex弱势</blockquote>
<ul>
<li>官方文档坑</li>
<li>限制比较大</li>
</ul>
<blockquote>做为前端构建weex需要储备什么</blockquote>
<ul>
<li>安卓环境搭建</li>
<li>XCode安装 了解CocoaPods。</li>
</ul>
<h2 id="articleHeader1">weex环境搭建</h2>
<h3 id="articleHeader2">web相关</h3>
<blockquote>node环境 npm包管理 weex-toolkit weex脚手架  <strong>安装成功后直接weex 会看到help</strong>
</blockquote>
<ul>
<li><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node </a></li>
<li>npm</li>
<li>cnpm install -g weex-toolkit</li>
<li>cnpm install webpack -g</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012485139?w=660&amp;h=450" src="https://static.alili.tech/img/remote/1460000012485139?w=660&amp;h=450" alt="成功后的图" title="成功后的图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">安卓相关</h3>
<blockquote>只有一个注意点 <strong>耐心</strong>。 会下载超多依赖</blockquote>
<ul>
<li><a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" rel="nofollow noreferrer" target="_blank">下载java sdk</a></li>
<li><a href="http://jingyan.baidu.com/article/6dad5075d1dc40a123e36ea3.html" rel="nofollow noreferrer" target="_blank">配置sdk</a></li>
<li><a href="http://www.androiddevtools.cn/" rel="nofollow noreferrer" target="_blank">下载AndroidStudio ,不推荐官方下载</a></li>
<li><a href="http://www.tuicool.com/articles/AVjAva" rel="nofollow noreferrer" target="_blank">配置AndroidStudio</a></li>
<li><a href="http://www.jianshu.com/p/fe0fa478e1cc" rel="nofollow noreferrer" target="_blank">第一次打开AndroidStudio巨慢解决方法，见附件</a></li>
</ul>
<h2 id="articleHeader4">weex项目搭建</h2>
<h3 id="articleHeader5">node 相关搭建</h3>
<blockquote>weex create 搭建一个含有三端的应用。 weex init 搭建一个 vue项目。build生成js 直接导入安卓项目即可。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="weex create HelloWeex
cd HelloWeex
cnpm install 
weex platform add android (还可以添加ios)
weex run android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>weex create HelloWeex
cd HelloWeex
cnpm install 
weex platform <span class="hljs-keyword">add</span><span class="bash"> android (还可以添加ios)
</span>weex <span class="hljs-keyword">run</span><span class="bash"> android</span></code></pre>
<ul><li>weex platform add android 运行了这句话后 项目会多一个android 这个文件就是之后安卓项目工程。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012485140" src="https://static.alili.tech/img/remote/1460000012485140" alt="列表图" title="列表图" style="cursor: pointer;"></span></p>
<ul><li>通过修改vue看不同内容。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012485141" src="https://static.alili.tech/img/remote/1460000012485141" alt="这个文件" title="这个文件" style="cursor: pointer;"></span></p>
<ul><li>weex run android (可以用真机和模拟机 真机记得开发模式)</li></ul>
<h3 id="articleHeader6">AndroidStudio中打开</h3>
<blockquote>一直下载依赖，直到没有error.打开慢的话可以看<a href="http://www.jianshu.com/p/fe0fa478e1cc" rel="nofollow noreferrer" target="_blank">第一次打开AndroidStudio巨慢解决方法，见附件</a>
</blockquote>
<ul><li>点build-&gt;打包构建包</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="weex init awesome-project
之后我们进入项目所在路径，weex-toolkit 已经为我们生成了标准项目结构。

在 package.json 中，已经配置好了几个常用的 npm script，分别是：
build: 源码打包，生成 JS Bundle
dev: webpack watch 模式，方便开发
serve: 开启静态服务器
debug: 调试模式
我们先通过 npm install 安装项目依赖。之后运行 npm run dev 和 npm run serve 开启watch 模式和静态服务器。

然后我们打开浏览器，进入 http://localhost:8080/index.html 即可看到 weex h5 页面。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>weex init awesome-project
之后我们进入项目所在路径，weex-toolkit 已经为我们生成了标准项目结构。

在 <span class="hljs-keyword">package</span>.json 中，已经配置好了几个常用的 npm script，分别是：
<span class="hljs-string">build:</span> 源码打包，生成 JS Bundle
<span class="hljs-string">dev:</span> webpack watch 模式，方便开发
<span class="hljs-string">serve:</span> 开启静态服务器
<span class="hljs-string">debug:</span> 调试模式
我们先通过 npm install 安装项目依赖。之后运行 npm run dev 和 npm run serve 开启watch 模式和静态服务器。

然后我们打开浏览器，进入 <span class="hljs-string">http:</span><span class="hljs-comment">//localhost:8080/index.html 即可看到 weex h5 页面。</span></code></pre>
<blockquote>端口冲突 直接更改端口即可</blockquote>
<ul><li>build之后</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012485142" src="https://static.alili.tech/img/remote/1460000012485142" alt="image" title="image" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012485143" src="https://static.alili.tech/img/remote/1460000012485143" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul>
<li>安装包链接（jdk64windowgradle-3.4.1 gradle-2.14.1-all）</li>
<li>链接：<a href="http://pan.baidu.com/s/1o8LX3OQ" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1o8LX3OQ</a> 密码：ipfl</li>
</ul>
<blockquote>后续更新原理调研及搜集向文档。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端构建Weex 流程

## 原文链接
[https://segmentfault.com/a/1190000012485134](https://segmentfault.com/a/1190000012485134)

