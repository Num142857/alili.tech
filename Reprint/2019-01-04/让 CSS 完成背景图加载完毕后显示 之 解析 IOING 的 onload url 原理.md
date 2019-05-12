---
title: '让 CSS 完成背景图加载完毕后显示 之 解析 IOING 的 onload url 原理' 
date: 2019-01-04 2:30:11
hidden: true
slug: k4hjuapfo5
categories: [reprint]
---

{{< raw >}}

                    
<p>WEB 之所以看起来很 WEB，除了自身慢的问题还有因为它具备了一些独有的特性，比如链接跳转，物理像素，不能获取软键盘高度等具有 WEB 特色的问题。</p>
<p>而今天我想讲一点大家都不在意的一个问题，图片流式加载的问题</p>
<p>我们先来看一个短片：</p>
<p><span class="img-wrap"><img data-src="/img/bVSMlW?w=480&amp;h=327" src="https://static.alili.tech/img/bVSMlW?w=480&amp;h=327" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>很明显我们能看出问题所在，这个仿 iOS 桌面程序的背景加载非常具有 WEB 特色，虽然在某些场景来说这是一个优点，比如传统网页上，但对于一个应用级产品（对于如此般挑剔的我来说）这样的体验还是难以接受的</p>
<p>那么我们就上手改造吧，先把改造后的效果 po 出来：</p>
<p><span class="img-wrap"><img data-src="/img/bVSNbR?w=480&amp;h=338" src="https://static.alili.tech/img/bVSNbR?w=480&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>对于这样的效果很多同学都能拿出各种的方案，如果今天我们只是讨论传统方案就没意思了，我们看一下 IOING 中的实现方法是怎样的，然后分析一下它是如何做到的。<br><a href="http://ioing.com/#docs-css-background-onload" rel="nofollow noreferrer" target="_blank">传送门：IOING 的相关文档</a></p>
<p>这里给出两段 CSS 示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*片段 1*/
.bg {
    background: #fff onload url(./bg.png) center no-repeat;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*片段 1*/</span>
<span class="hljs-selector-class">.bg</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span> onload <span class="hljs-built_in">url</span>(./bg.png) center no-repeat;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--片段 2-->
<div style=&quot;background-image: onload url(./bg.png);&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--片段 2--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-image: onload url(./bg.png);"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们仔细看一下后发现，这个语法中多了一个 onload 的属性，这个定义就是表示后面 url 中的背景图在载入完成后才会进行展示</p>
<p>上面这两段 CSS 示例中第二个示例的解决方案还是比较好梳理的，在 IOING 中模版文件会被解析成虚拟 DOM 树，在这解析过程中会把 style 属性的内容丢给 IOING 内置的 CSS 引擎来处理，而第一段的 CSS 则没有明确关联的 DOM 节点，但没关系，我们可以分为两个逻辑段分别处理</p>
<p>先来看一下<strong>片段 2</strong> 的解决流程</p>
<ol>
<li>语法分析，把设定‘onload’属性的节点的背景图设置为空</li>
<li>把该背景图放置在沙盒中加载</li>
<li>图片加载完成后把该节点的背景图重新设置回来</li>
</ol>
<p>其实原理比较简单，重点是如何把 CSS 与 DOM 节点关联起来，显然第一段的实现就难在这个问题上，由于 CSS 在解析时 IOING 的内置引擎是知道该 CSS 的来源的，比如是模块 CSS 或者是组件 CSS，这样我们就可以首先定位到所作用的 DOM Tree</p>
<ol>
<li>找到 CSS 的来源模块（在 IOING 中功能页面都是按模块来开发的）</li>
<li>CSS 对应的节点是否在 Shadow-root 中</li>
<li>以上都确定后就可以找到对应 DOM Tree 的根节点了</li>
<li>在每一个 DOM Tree 节点插入文档前设定一个‘end’事件</li>
<li>CSS 引擎接收到 ‘end’ 事件时在对应的 DOM Tree 中查找匹配的节点</li>
<li>找到匹配节点后将节点的 background-image 设为 ‘none’</li>
<li>监听背景图‘load’事件，加载成功后将节点的 background-image 设为 ‘’</li>
</ol>
<p>到这里基本就完成了使用 CSS 语法定义背景图的渲染方式了，原理其实并不复杂，对于不了解 IOING 的 DOM 引擎 和 CSS 引擎 的同学看到这里可能还是不太会明白。不过没关系，接下来我会在这里不定期更新关于 IOING 的种种，包括大家最关心的如何把 WEB App 做成 Native 的体验</p>
<p>附上一个用 IOING 半天开发的小demo</p>
<p><a href="http://ioing.com/#!demo/app-ios!/" rel="nofollow noreferrer" target="_blank">传送门：IOING 仿ios界面</a></p>
<hr>
<p>扫码二维码关注我的公众号</p>
<p><span class="img-wrap"><img data-src="/img/bVSN8m?w=430&amp;h=430" src="https://static.alili.tech/img/bVSN8m?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让 CSS 完成背景图加载完毕后显示 之 解析 IOING 的 onload url 原理

## 原文链接
[https://segmentfault.com/a/1190000010637511](https://segmentfault.com/a/1190000010637511)

