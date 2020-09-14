---
title: 'CSS3实现全景图特效' 
date: 2019-02-11 2:30:49
hidden: true
slug: voqruccpl8
categories: [reprint]
---

{{< raw >}}

                    
<p>本篇文章将给大家带来一个css3的黑科技：如何仅仅使用css来实现全景图的效果？</p>
<p>最终效果演示：<a href="http://ansenhuang.github.io/demo/css/panorama-photo.html" rel="nofollow noreferrer" target="_blank">demo</a></p>
<h2 id="articleHeader0">页面布局</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;panorama&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panorama"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader1">基础样式</h2>
<p>首先定义一些基本的样式和动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panorama {
  width: 300px;
  height: 300px;
  background-image: url(http://7vilbi.com1.z0.glb.clouddn.com/blog/6608185829213862083.jpg);
  background-size: auto 100%;
  cursor: pointer;
  animation: panorama 10s linear infinite alternate;
}

@keyframes panorama {
  to {
    background-position: 100% 0;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panorama</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(http://7vilbi.com1.z0.glb.clouddn.com/blog/6608185829213862083.jpg);
  <span class="hljs-attribute">background-size</span>: auto <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">animation</span>: panorama <span class="hljs-number">10s</span> linear infinite alternate;
}

@<span class="hljs-keyword">keyframes</span> panorama {
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
  }
}</code></pre>
<p><code>background-size: auto 100%;</code> 这段代码的意思是让图片的高等于容器的高，并且水平方向自动，即图片最左边贴着容器左侧。</p>
<p>执行动画的流程是：周而复始、往复交替、线性并且时间周期是10s。</p>
<h2 id="articleHeader2">手动控制动画执行</h2>
<p>到这里为止，当我们打开该网页后，立马会出现一张图片来回水平滑动的效果。但是这样的话，访客可能会被动画吸引而忽略了真正的内容。<br>我们的要求是当鼠标悬浮于图片时才让它动起来，我们当然可以很简单的实现这个效果。</p>
<p>删除之前的<code>animation</code>，添加以下样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panorama:hover,
.panorama:focus {
  animation: panorama 10s linear infinite alternate;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panorama</span><span class="hljs-selector-pseudo">:hover</span>,
<span class="hljs-selector-class">.panorama</span><span class="hljs-selector-pseudo">:focus</span> {
  <span class="hljs-attribute">animation</span>: panorama <span class="hljs-number">10s</span> linear infinite alternate;
}</code></pre>
<p>现在的效果是：鼠标移入图片，图片开始水平来回滑动。</p>
<h2 id="articleHeader3">动画的优化</h2>
<p>虽然效果达到了，但是你会发现，当鼠标移出图片，图片立刻回到初始位置。<br>对于我们来说，这有点突然，如何记录图片当前的位置并且当鼠标移入时继续执行动画呢？</p>
<p>我们可以依靠这个属性<code>animation-play-state: paused | running</code>，它表示动画的两个状态：暂停和运行。</p>
<h2 id="articleHeader4">完整css代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".panorama {
  width: 300px;
  height: 300px;
  background-image: url(http://7vilbi.com1.z0.glb.clouddn.com/blog/6608185829213862083.jpg);
  background-size: auto 100%;
  cursor: pointer;
  animation: panorama 10s linear infinite alternate;
  animation-play-state: paused;
}

.panorama:hover,
.panorama:focus {
  animation-play-state: running;
}

@keyframes panorama {
  to {
    background-position: 100% 0;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.panorama</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(http://7vilbi.com1.z0.glb.clouddn.com/blog/6608185829213862083.jpg);
  <span class="hljs-attribute">background-size</span>: auto <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">animation</span>: panorama <span class="hljs-number">10s</span> linear infinite alternate;
  <span class="hljs-attribute">animation-play-state</span>: paused;
}

<span class="hljs-selector-class">.panorama</span><span class="hljs-selector-pseudo">:hover</span>,
<span class="hljs-selector-class">.panorama</span><span class="hljs-selector-pseudo">:focus</span> {
  <span class="hljs-attribute">animation-play-state</span>: running;
}

@<span class="hljs-keyword">keyframes</span> panorama {
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span>;
  }
}</code></pre>
<p>你也可以在<a href="http://ansenhuang.github.io/" rel="nofollow noreferrer" target="_blank">我的博客</a>上阅览本篇文章，你的关注是我最大的写作动力，感谢你的支持。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3实现全景图特效

## 原文链接
[https://segmentfault.com/a/1190000004957353](https://segmentfault.com/a/1190000004957353)

