---
title: '有意思的clip-path' 
date: 2018-12-30 2:30:10
hidden: true
slug: 26kjsqgieir
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间朋友介绍了一个很帅的网站 <a href="http://www.species-in-pieces.com/" rel="nofollow noreferrer" target="_blank">http://www.species-in-pieces.com/</a> <br><br>F12看了一下 Dom 结构，发现作者只是结合了 CSS3 的 clip-path 和 transition 特性，就实现了很厉害的效果，每个转场和动物的细节都做得很棒。 <br></p>
<p>然后我根据自己的理解做了一个Demo, 并将核心js部分打包了出来，欢迎感兴趣的朋友一起交流</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011394206?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000011394206?w=800&amp;h=600" alt="Demo for ani-clipath" title="Demo for ani-clipath" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>Demo中的图片来自 <a href="https://www.behance.net/tomanders" rel="nofollow noreferrer" target="_blank">https://www.behance.net/tomanders</a>, 我只是做了低边处理</p></blockquote>
<h4>预览地址: <a href="https://luosijie.github.io/ani-clipath/" rel="nofollow noreferrer" target="_blank">https://luosijie.github.io/ani-clipath/</a>
</h4>
<h4>源码地址: <a href="https://github.com/luosijie/ani-clipath" rel="nofollow noreferrer" target="_blank">https://github.com/luosijie/ani-clipath</a>
</h4>
<h2 id="articleHeader0">实现过程</h2>
<p>先从一个简单的 clip-path 变形开始</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011394207?w=618&amp;h=300" src="https://static.alili.tech/img/remote/1460000011394207?w=618&amp;h=300" alt="clip-path 动画" title="clip-path 动画" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
  <title>simple move</title>
  <style>
    .polygon{
      width: 600px;
      height: 300px;
      background-color: black;
      clip-path: polygon(20% 30%, 0 70%, 40% 70%);
      animation: move 1s infinite alternate;
    }
    @keyframes move {
      to {
        background-color: grey;
        clip-path: polygon(80% 70%, 100% 30%, 60% 30%);
      }
    }
  </style>
</head>
<body>
 <div class=&quot;polygon&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>simple move<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.polygon</span>{
      <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
      <span class="hljs-attribute">background-color</span>: black;
      <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(20% 30%, 0 70%, 40% 70%);
      <span class="hljs-attribute">animation</span>: move <span class="hljs-number">1s</span> infinite alternate;
    }
    @<span class="hljs-keyword">keyframes</span> move {
      <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">background-color</span>: grey;
        <span class="hljs-attribute">clip-path</span>: <span class="hljs-built_in">polygon</span>(80% 70%, 100% 30%, 60% 30%);
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"polygon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这就是Demo中所需要的基本动画 <strong>变形</strong> + <strong>变色</strong>, 至于如何构建精美的图形变化, 就需要一点想象力和设计能力了</p>
<h3 id="articleHeader1">设计</h3>
<p>我们需要先设计出满意的低边图案，注意控制三角形的数量，越少越好越少越好越少越好越少越好越少越好越少越好</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011394208?w=801&amp;h=600" src="https://static.alili.tech/img/remote/1460000011394208?w=801&amp;h=600" alt="shark" title="shark" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011394209?w=801&amp;h=600" src="https://static.alili.tech/img/remote/1460000011394209?w=801&amp;h=600" alt="shark" title="shark" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011394210?w=801&amp;h=600" src="https://static.alili.tech/img/remote/1460000011394210?w=801&amp;h=600" alt="shark" title="shark" style="cursor: pointer;"></span></p>
<p>接下来，需要将每个三角形的坐标和色值转化为数据格式。我目前找不到很高效的转化方式，就用标注软件标注完后，手工录入,最后画了3个就结束了。所以三角形的数量越少越好越少越好越少越好越少越好越少越好越少越好。</p>
<blockquote><p>或者你有很好的方式介绍，请一定要告诉我。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011394211?w=805&amp;h=569" src="https://static.alili.tech/img/remote/1460000011394211?w=805&amp;h=569" alt="图形转为数据" title="图形转为数据" style="cursor: pointer; display: inline;"></span></p>
<p>现在准备工作完成了，最痛苦的阶段也已经过去了</p>
<h3 id="articleHeader2">码起</h3>
<p>代码实现的基本思路是这样的</p>
<ol>
<li>每个动物都是由 <strong>36</strong> 个不同颜色的三角形拼接而成, 所以需要 <strong>36</strong> 个 div 来显示</li>
<li>每一次变化都将 36 个div 的 clip-path 属性重新赋值</li>
<li>每个 div 都设置 transition 属性, 让转场自动实现</li>
</ol>
<p>区区几行代码就不贴出来了，感兴趣的移步 <a href="https://github.com/luosijie/ani-clipath" rel="nofollow noreferrer" target="_blank">github</a></p>
<h2 id="articleHeader3">不过我想介绍一下封装好的插件的使用方法</h2>
<h3 id="articleHeader4">安装</h3>
<h4>CDN</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/ani-clipath/dist/ani-clipath.min.js&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/ani-clipath/dist/ani-clipath.min.js"</span>&gt;</span></code><span class="undefined"></span></pre>
<h4>NPM</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save ani-clipath" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save ani-clipath</code></pre>
<h3 id="articleHeader5">使用</h3>
<p>需要自定义一个 DOM 容器，并设置好<strong>width</strong>和<strong>height</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  .shapes{
    width: 800px;
    height: 600px;
  }
</style>
...
<div class=&quot;shapes&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.shapes</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shapes"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>初始化一个实例，并传入参数</p>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>el</td>
<td>String</td>
<td>绑定DOM容器</td>
</tr>
<tr>
<td>speed</td>
<td>Number</td>
<td>控制变化速度</td>
</tr>
<tr>
<td>delay</td>
<td>Number</td>
<td>控制变化的延迟</td>
</tr>
<tr>
<td>shapes</td>
<td>Array</td>
<td>低边图形的坐标</td>
</tr>
</tbody>
</table>
<p>使用公共方法切换</p>
<table>
<thead><tr>
<th>方法</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>next()</td>
<td>切换下一个图形</td>
</tr>
<tr>
<td>previous()</td>
<td>切换上一个图形</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  var aniClipath = new AniClipath({
    el: '.shapes',
    speed: 1000,
    delay: 30,
    shapes: data
  })
  setInterval(function(){
    aniClipath.next()
  },3000)
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
  <span class="hljs-keyword">var</span> aniClipath = <span class="hljs-keyword">new</span> AniClipath({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'.shapes'</span>,
    <span class="hljs-attr">speed</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">delay</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">shapes</span>: data
  })
  setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    aniClipath.next()
  },<span class="hljs-number">3000</span>)
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>shapes 属性的数据格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [
 &nbsp;第 1 个低边图形
 &nbsp;[
 &nbsp; &nbsp;// 基本图形参数
 &nbsp; &nbsp;{ 
 &nbsp; &nbsp; &nbsp;// 颜色
 &nbsp; &nbsp; &nbsp;c: '#1A1A1A',
 &nbsp; &nbsp; &nbsp;// polygon坐标
 &nbsp; &nbsp; &nbsp;p: [ { x: '50%', y: '30%' }, { x: '30%', y: '70%' }, { x: '70%', y: '70%' }]
    }
    ...
 &nbsp;],
 &nbsp;第 2 个低边图形
 &nbsp;[
    {
      c: '#E6E6E6',
      p: [ { x: '50%', y: '70%' }, { x: '30%', y: '30%' }, { x: '70%', y: '30%' }]
    }
    ...
  ]
  ...
 &nbsp;第 n 个低边图形
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = [
 &nbsp;第 <span class="hljs-number">1</span> 个低边图形
 &nbsp;[
 &nbsp; &nbsp;<span class="hljs-comment">// 基本图形参数</span>
 &nbsp; &nbsp;{ 
 &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 颜色</span>
 &nbsp; &nbsp; &nbsp;c: <span class="hljs-string">'#1A1A1A'</span>,
 &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// polygon坐标</span>
 &nbsp; &nbsp; &nbsp;p: [ { <span class="hljs-attr">x</span>: <span class="hljs-string">'50%'</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">'30%'</span> }, { <span class="hljs-attr">x</span>: <span class="hljs-string">'30%'</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">'70%'</span> }, { <span class="hljs-attr">x</span>: <span class="hljs-string">'70%'</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">'70%'</span> }]
    }
    ...
 &nbsp;],
 &nbsp;第 <span class="hljs-number">2</span> 个低边图形
 &nbsp;[
    {
      <span class="hljs-attr">c</span>: <span class="hljs-string">'#E6E6E6'</span>,
      <span class="hljs-attr">p</span>: [ { <span class="hljs-attr">x</span>: <span class="hljs-string">'50%'</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">'70%'</span> }, { <span class="hljs-attr">x</span>: <span class="hljs-string">'30%'</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">'30%'</span> }, { <span class="hljs-attr">x</span>: <span class="hljs-string">'70%'</span>, <span class="hljs-attr">y</span>: <span class="hljs-string">'30%'</span> }]
    }
    ...
  ]
  ...
 &nbsp;第 n 个低边图形
]</code></pre>
<blockquote><p>先这样了 欢迎star</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
有意思的clip-path

## 原文链接
[https://segmentfault.com/a/1190000011394201](https://segmentfault.com/a/1190000011394201)

