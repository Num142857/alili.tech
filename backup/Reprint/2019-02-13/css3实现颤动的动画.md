---
title: 'css3实现颤动的动画' 
date: 2019-02-13 2:31:22
hidden: true
slug: anxoboz8kef
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">需求</h1>
<p>页面要做一个活动入口，不能太显眼，但是又要用户能一眼就看出来。</p>
<h1 id="articleHeader1">演示</h1>
<p><a href="https://jsfiddle.net/vtsxc18q/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/vtsxc18q/</a><button class="btn btn-xs btn-default ml10 preview" data-url="vtsxc18q/" data-typeid="0">点击预览</button></p>
<h1 id="articleHeader2">实现 （部分动画代码）</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes chanDong {
            5% {
                -webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -10deg);
                transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -10deg);
            }
            6%,
            8%,
            10%,
            12% {
                -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 10deg);
                transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 10deg);
            }

            7%,
            9%,
            11% {
                -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);
                transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);
            }

            13% {
                -webkit-transform: scale3d(1, 1, 1);
                transform: scale3d(1, 1, 1);
            }

        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> chanDong {
            5% {
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale3d</span>(1, 1, 1) <span class="hljs-built_in">rotate3d</span>(0, 0, 1, -10deg);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale3d</span>(1, 1, 1) <span class="hljs-built_in">rotate3d</span>(0, 0, 1, -10deg);
            }
            6%,
            8%,
            10%,
            12% {
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale3d</span>(1.1, 1.1, 1.1) <span class="hljs-built_in">rotate3d</span>(0, 0, 1, 10deg);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale3d</span>(1.1, 1.1, 1.1) <span class="hljs-built_in">rotate3d</span>(0, 0, 1, 10deg);
            }

            7%,
            9%,
            11% {
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale3d</span>(1.1, 1.1, 1.1) <span class="hljs-built_in">rotate3d</span>(0, 0, 1, -10deg);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale3d</span>(1.1, 1.1, 1.1) <span class="hljs-built_in">rotate3d</span>(0, 0, 1, -10deg);
            }

            13% {
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale3d</span>(1, 1, 1);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale3d</span>(1, 1, 1);
            }

        }</code></pre>
<h1 id="articleHeader3">Github 代码</h1>
<p><a href="https://github.com/lmxdawn/test/blob/master/html/%E9%A2%A4%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB.html" rel="nofollow noreferrer" target="_blank">https://github.com/lmxdawn/te...</a></p>
<h1 id="articleHeader4">另附一个 vue 搭建的后台管理</h1>
<p>另附一个 vue 搭建的后台管理 <a href="https://segmentfault.com/a/1190000015619977">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css3实现颤动的动画

## 原文链接
[https://segmentfault.com/a/1190000016735426](https://segmentfault.com/a/1190000016735426)

