---
title: '【elementUI+vue-cli】构建后台管理界面' 
date: 2019-01-13 2:30:11
hidden: true
slug: sxc2zel0ccl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote><p>前段时间关注了一下基于vue的PC端UI组件elementUI，我觉得很漂亮而且也很实用，我就尝试着做了一个用elementUI构建的一个后台系统，功能很简单。。咳咳咳，小白请进，大神绕道</p></blockquote>
<h2 id="articleHeader1">技术框架</h2>
<blockquote><p>vue-cli + elementUI + vue-charts</p></blockquote>
<h2 id="articleHeader2">安装</h2>
<p><strong>npm安装</strong><br>  推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。</p>
<p><code>npm i element-ui -S</code></p>
<blockquote><p>由于项目是基于vue-cli构建的，那么我们现在就可以直接在main.js文件中引用elementUI啦</p></blockquote>
<p><strong>在main.js中写入以下内容</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

Vue.use(ElementUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

Vue.use(ElementUI)</code></pre>
<blockquote><p>综上所述elementUI算是安装好啦</p></blockquote>
<h3 id="articleHeader3">项目部分截图<span class="img-wrap"><img data-src="/img/bVOxRR?w=1431&amp;h=754" src="https://static.alili.tech/img/bVOxRR?w=1431&amp;h=754" alt="page1.png" title="page1.png" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVOxRT?w=1438&amp;h=759" src="https://static.alili.tech/img/bVOxRT?w=1438&amp;h=759" alt="page2.png" title="page2.png" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVOxRV?w=1434&amp;h=750" src="https://static.alili.tech/img/bVOxRV?w=1434&amp;h=750" alt="page3.png" title="page3.png" style="cursor: pointer; display: inline;"></span>
</h3>
<h3 id="articleHeader4">目的</h3>
<blockquote><p>这是一个很小的项目，主要还是拿来练练手，个人的感悟就是，elementUI这套框架非常适合拿来做后来管理程序，这套UI在很多地方都帮你把交互做好了，我们需要做的只是将数据填充即可，后续我还会继续维护这个项目，真正意义上做到一个大而全的后台系统，共勉！</p></blockquote>
<h3 id="articleHeader5">源码地址</h3>
<blockquote><p><a href="https://github.com/Recklesslmz/elementUI" rel="nofollow noreferrer" target="_blank">链接描述</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【elementUI+vue-cli】构建后台管理界面

## 原文链接
[https://segmentfault.com/a/1190000009624300](https://segmentfault.com/a/1190000009624300)

