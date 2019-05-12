---
title: '关于element的导航怎么路由，vue-router。。看官方文档你会疯的哦!' 
date: 2019-01-29 2:30:10
hidden: true
slug: taly8stynj
categories: [reprint]
---

{{< raw >}}

                    
<p>研究了20来分钟，真的觉得element的说明文档很难懂。<br>好吧，我就用例子说明element的导航怎么不在不适用&lt;router-link&gt;进行路由<br>（1）在el-menu这个标签的属性中添加 router ,官方文档的解释是：启用vue-router 这种模式<br>（2）在el-menu-item标签中的index属性直接书写的路由，就可以实现正常vue-router了哈</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-menu default-active=&quot;2&quot; router class=&quot;menu&quot; @open=&quot;handleOpen&quot; @close=&quot;handleClose&quot;>
<el-menu-item index=&quot;/mainPage/zhecai&quot;><i class=&quot;el-icon-star-on&quot;></i>脆爽浙菜</el-menu-item>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;el-menu <span class="hljs-keyword">default</span>-active=<span class="hljs-string">"2"</span> router <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"menu"</span> @open=<span class="hljs-string">"handleOpen"</span> @close=<span class="hljs-string">"handleClose"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"/mainPage/zhecai"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-star-on"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>脆爽浙菜<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span></span></code></pre>
<p>我写的例子大家可以参考：<a href="https://github.com/yuanyuanshen/element-demo" rel="nofollow noreferrer" target="_blank">https://github.com/yuanyuansh...</a></p>
<p><strong>忘了哈，如果文章帮助了你，麻烦点个赞啥的，，声望好低，写个头条都不让</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于element的导航怎么路由，vue-router。。看官方文档你会疯的哦!

## 原文链接
[https://segmentfault.com/a/1190000007810151](https://segmentfault.com/a/1190000007810151)

