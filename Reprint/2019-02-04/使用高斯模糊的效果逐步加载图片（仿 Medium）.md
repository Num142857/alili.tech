---
title: '使用高斯模糊的效果逐步加载图片（仿 Medium）' 
date: 2019-02-04 2:30:58
hidden: true
slug: jak378joz6a
categories: [reprint]
---

{{< raw >}}

                    
<p>用过 Medium 的用户不会不记得它的图片加载方式——<strong>纯色-高斯模糊-加载完成并显示</strong>。</p>
<p>这是一种很优雅的图片预加载的方式(因为 Medium 的图片质量都很高，如果全部一下加载的话，需要的时间难以想象，所以，这是一种很棒的做法)。从第一次打开 Medium 这个网站开始，我就被这种技术给吸引住了——好吧，直到今天才去研究它。</p>
<p>在 Medium 网站，打开任何一篇文章，然后，我们来 inspect 一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<figure name=&quot;512a&quot; 
        id=&quot;512a&quot; 
        class=&quot;graf--figure graf--layoutCroppedHeightPreview graf-after--h3&quot;
>
    <div class=&quot;aspectRatioPlaceholder is-locked&quot;>
        <div class=&quot;aspectRatioPlaceholder-fill&quot; 
             style=&quot;padding-bottom: 30%;&quot;
        ></div>
        <div class=&quot;progressiveMedia js-progressiveMedia graf-image is-canvasLoaded&quot; 
             data-image-id=&quot;1*dZnfeZiXxf2BgN3VSQuOlA.jpeg&quot; 
             data-width=&quot;3600&quot; 
             data-height=&quot;3600&quot; 
             data-scroll=&quot;native&quot;
        >
            <img src=&quot;https://cdn-images-1.medium.com/freeze/fit/t/60/18/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg?q=20&quot; 
                 crossorigin=&quot;anonymous&quot; 
                 class=&quot;progressiveMedia-thumbnail js-progressiveMedia-thumbnail&quot;
            >
            <canvas class=&quot;progressiveMedia-canvas js-progressiveMedia-canvas&quot; 
                    width=&quot;75&quot; 
                    height=&quot;22&quot;
            ></canvas>
            <img class=&quot;progressiveMedia-image js-progressiveMedia-image&quot; 
                 data-src=&quot;https://cdn-images-1.medium.com/fit/t/1600/480/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg&quot; 
                 src=&quot;https://cdn-images-1.medium.com/fit/t/1600/480/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg&quot;
            >
            <noscript class=&quot;js-progressiveMedia-inner&quot;>
                &amp;lt;img class=&quot;progressiveMedia-noscript js-progressiveMedia-inner&quot; src=&quot;https://cdn-images-1.medium.com/fit/t/1600/480/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg&quot;&amp;gt;
            </noscript>
        </div>
    </div>
</figure>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"512a"</span> 
        <span class="hljs-attr">id</span>=<span class="hljs-string">"512a"</span> 
        <span class="hljs-attr">class</span>=<span class="hljs-string">"graf--figure graf--layoutCroppedHeightPreview graf-after--h3"</span>
&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"aspectRatioPlaceholder is-locked"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"aspectRatioPlaceholder-fill"</span> 
             <span class="hljs-attr">style</span>=<span class="hljs-string">"padding-bottom: 30%;"</span>
        &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progressiveMedia js-progressiveMedia graf-image is-canvasLoaded"</span> 
             <span class="hljs-attr">data-image-id</span>=<span class="hljs-string">"1*dZnfeZiXxf2BgN3VSQuOlA.jpeg"</span> 
             <span class="hljs-attr">data-width</span>=<span class="hljs-string">"3600"</span> 
             <span class="hljs-attr">data-height</span>=<span class="hljs-string">"3600"</span> 
             <span class="hljs-attr">data-scroll</span>=<span class="hljs-string">"native"</span>
        &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn-images-1.medium.com/freeze/fit/t/60/18/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg?q=20"</span> 
                 <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">"anonymous"</span> 
                 <span class="hljs-attr">class</span>=<span class="hljs-string">"progressiveMedia-thumbnail js-progressiveMedia-thumbnail"</span>
            &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progressiveMedia-canvas js-progressiveMedia-canvas"</span> 
                    <span class="hljs-attr">width</span>=<span class="hljs-string">"75"</span> 
                    <span class="hljs-attr">height</span>=<span class="hljs-string">"22"</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progressiveMedia-image js-progressiveMedia-image"</span> 
                 <span class="hljs-attr">data-src</span>=<span class="hljs-string">"https://cdn-images-1.medium.com/fit/t/1600/480/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg"</span> 
                 <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn-images-1.medium.com/fit/t/1600/480/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg"</span>
            &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">noscript</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"js-progressiveMedia-inner"</span>&gt;</span>
                &amp;lt;img class="progressiveMedia-noscript js-progressiveMedia-inner" src="https://cdn-images-1.medium.com/fit/t/1600/480/1*dZnfeZiXxf2BgN3VSQuOlA.jpeg"&amp;gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">noscript</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre>
<p>可以看到，Medium 为每一张图片都设置了这么长的一段 HTML。这样做的目的就是为了让这个图片的逐步加载过程能够平滑如一，同时还能在一定程度上提升用户体验。就算图片没有加载出来，显示给用户的是一个高斯模糊的图片，其实也不失美感。</p>
<p>那么，这个图片的逐步加载过程具体是什么样的呢？</p>
<ol>
<li><p>渲染一个 <code>div</code> 容器，这个容器就是用来显示最终展示给用户的图片的。通过对容器设置一个百分比的 <code>padding-bottom</code> 来让其比例和大小与最终图片的比例和大小相同，这样，就能避免图片加载出来的时候导致的页面的重排；</p></li>
<li><p>使用 <code>img</code> 标签来加载一张原图质量的 10% ~ 20% 左右的图片，这张图片的质量很低，而且很小，所以可以马上加载出来；</p></li>
<li><p>一旦小图加载完成，就开始使用 canvas 来进行绘制，添加模糊效果，同时，开始请求最终要加载的大图；</p></li>
<li><p>当最终的大图也加载完成之后，显示大图，隐藏掉 canvas。</p></li>
</ol>
<p>以上就是 Medium 的做法。</p>
<hr>
<p>我们可以自己来实现这个效果，实现过程如下：</p>
<ol>
<li><p>渲染一个容器，保持与原图的比例和尺寸相同，填充一个较浅的背景色；</p></li>
<li><p>先加载小图，同时使用模糊效果；</p></li>
<li><p>小图加载完成，开始请求大图；</p></li>
<li><p>大图加载完成，显示大图，隐藏小图。</p></li>
</ol>
<p>所以，综合来看，其实并不复杂。</p>
<p>首先，我们可以把大图和小图的 URL 和尺寸都存起来，通过标签的 <code>data</code> 属性去动态获取。所以，我们的 HTML 可以像下面这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<figure name=&quot;blur&quot;
        class=&quot;blur-img-container&quot;
        data-real-width=&quot;1174&quot;
        data-real-height=&quot;670&quot;
        data-src=&quot;images/sm2.jpeg&quot;
        src=&quot;https://cdn-images-1.medium.com/max/2000/1*0WwtDkE1q6HGZwD6Kn9SuQ.jpeg&quot;
></figure>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"blur"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"blur-img-container"</span>
        <span class="hljs-attr">data-real-width</span>=<span class="hljs-string">"1174"</span>
        <span class="hljs-attr">data-real-height</span>=<span class="hljs-string">"670"</span>
        <span class="hljs-attr">data-src</span>=<span class="hljs-string">"images/sm2.jpeg"</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn-images-1.medium.com/max/2000/1*0WwtDkE1q6HGZwD6Kn9SuQ.jpeg"</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span></code></pre>
<p>其中各个参数代表的含义是：</p>
<ul>
<li><p><code>data-real-width</code>: 大图的宽度</p></li>
<li><p><code>data-real-height</code>: 大图的高度</p></li>
<li><p><code>data-src</code>: 小图的 URL</p></li>
<li><p><code>src</code>: 大图的 URL</p></li>
</ul>
<p>同时，我们需要定义一些 CSS 的 class 来对大图和小图进行处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".blur-img-container {
    position: relative;
    background: #eeeeee;
    background-size: cover;
    overflow: hidden;
}

.blur-img-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.4s ease-in-out;
}

.blur-img-container .thumb-loaded {
    opacity: 1;
    filter: blur(10px);
    transform: scale(1);
}

.blur-img-container .large-loaded {
    opacity: 1;
}

.blur-img-container .thumb-hidden {
    opacity: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.blur-img-container</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#eeeeee</span>;
    <span class="hljs-attribute">background-size</span>: cover;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.blur-img-container</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> ease-in-out;
}

<span class="hljs-selector-class">.blur-img-container</span> <span class="hljs-selector-class">.thumb-loaded</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(10px);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1);
}

<span class="hljs-selector-class">.blur-img-container</span> <span class="hljs-selector-class">.large-loaded</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.blur-img-container</span> <span class="hljs-selector-class">.thumb-hidden</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>然后，我们的重点在于 JavaScript 的处理。</p>
<ul>
<li><p>需要动态的设置每个图片的容器的 <code>padding-bottom</code> 以防止页面发生重排；</p></li>
<li><p>通过 <code>image</code> 的 <code>onload</code> 事件来控制其样式和进度</p></li>
</ul>
<p>第一点，动态设置我们的容器的 <code>padding-bottom</code>。可以通过计算宽高比然后换算成百分比：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elem.style.paddingBottom = `${(realHeight / realWidth) * 100}%`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">elem.style.paddingBottom = <span class="hljs-string">`<span class="hljs-subst">${(realHeight <span class="hljs-regexp">/ realWidth) * 100}%`;</span></span></span></code></pre>
<p>第二点，使用图像的 <code>onload</code> 事件来控制加载的进度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let thumb = new Image();
thumb.src = thumbSrc;
thumb.onload = () => {
    // 小图加载完成，显示小图，设置样式
    setStyle(thumb, 'thumb-loaded');
};
elem.appendChild(thumb);

let realImg = new Image();
realImg.src = lgSrc;
realImg.onload = () => {
    // 大图加载完成，显示大图，隐藏小图
    setStyle(realImg, 'large-loaded');
    setStyle(thumb, 'thumb-hidden');
};

// 将大图添加到页面中
elem.appendChild(realImg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> thumb = <span class="hljs-keyword">new</span> Image();
thumb.src = thumbSrc;
thumb.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// 小图加载完成，显示小图，设置样式</span>
    setStyle(thumb, <span class="hljs-string">'thumb-loaded'</span>);
};
elem.appendChild(thumb);

<span class="hljs-keyword">let</span> realImg = <span class="hljs-keyword">new</span> Image();
realImg.src = lgSrc;
realImg.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// 大图加载完成，显示大图，隐藏小图</span>
    setStyle(realImg, <span class="hljs-string">'large-loaded'</span>);
    setStyle(thumb, <span class="hljs-string">'thumb-hidden'</span>);
};

<span class="hljs-comment">// 将大图添加到页面中</span>
elem.appendChild(realImg);</code></pre>
<p>其实，只要把上面两点主要的功能做好了，我们的这个效果基本上就实现了。</p>
<hr>
<p><strong>可以通过我的 GitHub Repo 来查看完整的源代码和例子 <a href="https://github.com/Erichain/blur-image" rel="nofollow noreferrer" target="_blank">blur-image</a></strong>。</p>
<p><strong>同时，我将这个小功能封装成了一个 package，需要的朋友可以通过 <code>npm install blur-image</code> 或者 <code>bower install blur-image</code> 进行安装和使用。具体的安装和使用方法可以查看文档</strong>。</p>
<blockquote><p>参考链接<br><a href="https://jmperezperez.com/medium-image-progressive-loading-placeholder/" rel="nofollow noreferrer" target="_blank">How Medium does progressive image loading</a><br><a href="https://css-tricks.com/the-blur-up-technique-for-loading-background-images/" rel="nofollow noreferrer" target="_blank">The “Blur Up” Technique for Loading Background Images</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用高斯模糊的效果逐步加载图片（仿 Medium）

## 原文链接
[https://segmentfault.com/a/1190000006743512](https://segmentfault.com/a/1190000006743512)

