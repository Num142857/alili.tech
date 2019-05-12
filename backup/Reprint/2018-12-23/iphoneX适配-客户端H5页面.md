---
title: 'iphoneX适配-客户端H5页面' 
date: 2018-12-23 2:30:07
hidden: true
slug: 07k767inonxt
categories: [reprint]
---

{{< raw >}}

                    
<p>由于iphoneX做了全面屏并且还保留一块小刘海，因此很多以前的移动端H5页面需要结合App客户端做出相应的适配，具体如下：</p>
<h4><strong>1、顶部通栏</strong></h4>
<p>之前的客户端一直采用状态栏20pt+导航栏44pt的做法。由于iphoneX多了一块小刘海，因此iphoneX单独采用状态栏44pt+导航栏44pt，意味着内嵌的H5页面整体下移24pt。</p>
<h4><strong>2、底部操作栏</strong></h4>
<p>由于iphoneX是全面屏，页面最底部会被弯曲的拐角截掉一部分，特别是有底部固定悬浮的tab条会严重受到影响。这时候需要底部留出一块空白安全区域，页面内容最终的底线应在手机拐角处。<strong>该安全区域的高度为34pt。</strong></p>
<h4><strong>3、适配方法</strong></h4>
<p>终上所述，结合iphoneX目前特有的手机参数我们可以采用的适配方法为：</p>
<p>（1）meta标签</p>
<p>ios11为了适配iphoneX对现有的viewport meta标签新增一个特性：viewport-fit，如果客户端没有做全屏适配，那么页面想要全屏覆盖，则可使用该特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width,viewport-fit=cover&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="ruby hljs"><code class="ruby" style="word-break: break-word; white-space: initial;">&lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width,viewport-fit=cover"</span>&gt;</code></pre>
<p>（2）媒体查询</p>
<p>1、利用constant函数</p>
<p>只有设置了viewport-fit=cover才能使用constant函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@supports(bottom:constant(safe-area-inset-bottom)) {
    selector{
        padding-bottom:constant(safe-area-inset-bottom); 
        padding-bottom:calc(30px(假设值) + constant(safe-area-inset-bottom)); //根据实际情况选择适配方法
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="ruby hljs"><code class="ruby">@supports(<span class="hljs-symbol">bottom:</span>constant(safe-area-inset-bottom)) {
    selector{
        padding-<span class="hljs-symbol">bottom:</span>constant(safe-area-inset-bottom); 
        padding-<span class="hljs-symbol">bottom:</span>calc(<span class="hljs-number">30</span>px(假设值) + constant(safe-area-inset-bottom)); <span class="hljs-regexp">//</span>根据实际情况选择适配方法
    }
}</code></pre>
<p>2、利用iphoneX独特的型号参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
    #buy {
        padding-bottom:34px; 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="ruby hljs"><code class="ruby">@media only screen <span class="hljs-keyword">and</span> (device-<span class="hljs-symbol">width:</span> <span class="hljs-number">375</span>px) <span class="hljs-keyword">and</span> (device-<span class="hljs-symbol">height:</span><span class="hljs-number">812</span>px) <span class="hljs-keyword">and</span> (-webkit-device-pixel-<span class="hljs-symbol">ratio:</span><span class="hljs-number">3</span>) {
    <span class="hljs-comment">#buy {</span>
        padding-<span class="hljs-symbol">bottom:</span><span class="hljs-number">34</span>px; 
    }
}</code></pre>
<p>（3）js判断（以下采用Jquery）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if($(window).width() === 375 &amp;&amp; $(window).height() === 724 &amp;&amp; window.devicePixelRatio === 3){
    #buy {
        padding-bottom:34px; 
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="ruby hljs"><code class="ruby"><span class="hljs-keyword">if</span>($(window).width() === <span class="hljs-number">375</span> &amp;&amp; $(window).height() === <span class="hljs-number">724</span> &amp;&amp; window.devicePixelRatio === <span class="hljs-number">3</span>){
    <span class="hljs-comment">#buy {</span>
        padding-<span class="hljs-symbol">bottom:</span><span class="hljs-number">34</span>px; 
    }
}
</code></pre>
<p>（4）客户端协议<br>也可以根据客户端协议请求客户端查询是否是iphoneX，以此来保持和客户端一致。</p>
<h4><strong>4、参数解释</strong></h4>
<p>以上代码中的参数解释如下：</p>
<ul>
<li>safe-area-inset-bottom — ios11新增特性，用于设定安全区域与边界的距离</li>
<li>375 — iphoneX设备的宽度</li>
<li>812 — iphoneX设备的高度</li>
<li>&nbsp; &nbsp; 3 — iphoneX设备的分辨率</li>
<li>724 — iphoneX设备的高度(812) - 顶部通栏高度(88)</li>
<li>&nbsp;&nbsp;34 — 底部安全区域高度</li>
</ul>
<p><strong>以上参数均以标准的1pt=1px进行计算，如果H5页面采用缩放的rem方式，那么1pt = 1px * 3（iphoneX分辨率）</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iphoneX适配-客户端H5页面

## 原文链接
[https://segmentfault.com/a/1190000012309030](https://segmentfault.com/a/1190000012309030)

