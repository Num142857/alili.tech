---
title: '修改ElementUI源码小计' 
date: 2019-01-02 2:30:09
hidden: true
slug: s97ww5lo11
categories: [reprint]
---

{{< raw >}}

                    
<p>在使用element-ui的时候，有些功能不能满足我们的需求，就需要修改源码来满足。阅读官方给的教程，对于我这小菜鸟过于简略，结合自己的实践整理一下修改方法：</p>
<h2 id="articleHeader0">克隆element官方的仓库到本地</h2>
<blockquote><p>git clone <a href="https://github.com/ElemeFE/element.git" rel="nofollow noreferrer" target="_blank">https://github.com/ElemeFE/el...</a></p></blockquote>
<h2 id="articleHeader1">下载到本地之后安装依赖包</h2>
<blockquote><p>cd element &amp;&amp; npm install<br>npm run dev</p></blockquote>
<p>依赖包安装成后在 默认会在 <a href="http://localhost:8085/" rel="nofollow noreferrer" target="_blank">http://localhost:8085/</a>打开本地网页，会看到element首页</p>
<h2 id="articleHeader2">进入element文件夹，packages文件夹就是我们要修改源码的目录文件夹</h2>
<p>比如我们进入 button文件夹里面的src文件，找到button.vue，我们修改class="el-button"，添加class="el-button el-button-customize"一个自定义的class,然后保存。切换本地element首页，找到button组件，可以用审查元素查看，就会看到class="el-button el-button-customize"已经被修改了。</p>
<h2 id="articleHeader3">切换到命令行工具 执行</h2>
<blockquote><p>npm run dist</p></blockquote>
<p>命令行执行完毕，会在element文件夹里面生成lib文件夹</p>
<h2 id="articleHeader4">复制lib文件夹到自己的项目目录</h2>
<p>找到node_modules并进入,找到element-ui文件夹替换里面的lib文件夹</p>
<h2 id="articleHeader5">验证是否成功</h2>
<p>进入自己的项目文件目录，打开并运行项目，然后找到任意的button组件，验证button是否添加了自定义的el-button-customize 。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
修改ElementUI源码小计

## 原文链接
[https://segmentfault.com/a/1190000010932321](https://segmentfault.com/a/1190000010932321)

