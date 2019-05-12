---
title: 'gcoord: 转换WGS84、GCJ02、BD09坐标，解决百度地图高德地图坐标系不统一的问题' 
date: 2018-12-13 2:30:07
hidden: true
slug: vzwsftwce2l
categories: [reprint]
---

{{< raw >}}

                    
<p>做过地图相关开发的同学肯定会遇到这样一个问题：同样的经纬度坐标，在百度地图和高德地图上位置不一样。<br><span class="img-wrap"><img data-src="/img/remote/1460000013350013" src="https://static.alili.tech/img/remote/1460000013350013" alt="crs.jpg" title="crs.jpg" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">关于坐标系</h2>
<p>我们通常用经纬度来表示一个地理位置，但是由于一些原因，我们从不同渠道得到的经纬度信息可能并不是在同一个坐标系下。</p>
<ul>
<li>高德地图、腾讯地图以及谷歌中国区地图使用的是<strong>GCJ-02</strong>坐标系</li>
<li>百度地图使用的是<strong>BD-09</strong>坐标系</li>
<li>底层接口(HTML5 Geolocation或ios、安卓API)通过GPS设备获取的坐标使用的是<strong>WGS-84</strong>坐标系</li>
</ul>
<p>不同的坐标系之间可能有几十到几百米的偏移，所以在开发基于地图的产品，或者做地理数据可视化时，我们需要修正不同坐标系之间的偏差。</p>
<h3 id="articleHeader1">WGS-84 - 世界大地测量系统</h3>
<p>WGS-84（World Geodetic System, WGS）是使用最广泛的坐标系，也是世界通用的坐标系，GPS设备得到的经纬度就是在WGS84坐标系下的经纬度。通常通过底层接口得到的定位信息都是WGS84坐标系。</p>
<h3 id="articleHeader2">GCJ-02 - 国测局坐标</h3>
<p>GCJ-02（G-Guojia国家，C-Cehui测绘，J-Ju局），又被称为火星坐标系，是一种基于WGS-84制定的大地测量系统，由中国国测局制定。此坐标系所采用的混淆算法会在经纬度中加入随机的偏移。</p>
<p>国家规定，<strong>中国大陆所有公开地理数据都需要至少用GCJ-02进行加密</strong>，也就是说我们从国内公司的产品中得到的数据，一定是经过了加密的。绝大部分国内互联网地图提供商都是使用GCJ-02坐标系，包括高德地图，谷歌地图中国区等。</p>
<blockquote>导航电子地图在公开出版、销售、传播、展示和使用前，必须进行空间位置技术处理。— GB 20263―2006《导航电子地图安全处理技术基本要求》，4.1</blockquote>
<h3 id="articleHeader3">BD-09 - 百度坐标系</h3>
<p>BD-09（Baidu, BD）是百度地图使用的地理坐标系，其在GCJ-02上多增加了一次变换，用来保护用户隐私。从百度产品中得到的坐标都是BD-09坐标系。</p>
<h2 id="articleHeader4">解决方案</h2>
<p>百度地图以及高德地图都提供了一些方法来转换不同坐标系下的坐标，但是它们都需要进行网络请求，性能很差。<br>在春节假期时，我做了一个库<a href="https://github.com/hujiulong/gcoord" rel="nofollow noreferrer" target="_blank">gcoord</a>来做这些事。</p>
<h3 id="articleHeader5"><a href="https://github.com/hujiulong/gcoord" rel="nofollow noreferrer" target="_blank">gcoord</a></h3>
<p>gcoord主要解决了两个问题</p>
<ul>
<li>能将坐标在不同坐标系下相互转换</li>
<li>能够处理GeoJSON</li>
</ul>
<p>GeoJSON是地理行业一种通用的数据格式，它本质上就是JSON，不过对字段有一些约定。</p>
<p>gcoord使用起来非常简单<br>例如从手机的GPS得到一个经纬度坐标，需要将其展示在百度地图上，则可以通过gcoord将当前坐标从WGS-84坐标系转换为BD-09坐标系</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = gcoord.transform(
    [ 116.403988, 39.914266 ],    // 经纬度坐标
    gcoord.WGS84,                 // 当前坐标系
    gcoord.BD09                   // 目标坐标系
);
console.log( result );  // [ 116.41661560068297, 39.92196580126834 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = gcoord.transform(
    [ <span class="hljs-number">116.403988</span>, <span class="hljs-number">39.914266</span> ],    <span class="hljs-comment">// 经纬度坐标</span>
    gcoord.WGS84,                 <span class="hljs-comment">// 当前坐标系</span>
    gcoord.BD09                   <span class="hljs-comment">// 目标坐标系</span>
);
<span class="hljs-built_in">console</span>.log( result );  <span class="hljs-comment">// [ 116.41661560068297, 39.92196580126834 ]</span></code></pre>
<blockquote>详细的使用方式请查看<a href="https://github.com/hujiulong/gcoord" rel="nofollow noreferrer" target="_blank">gcoord的文档</a>
</blockquote>
<p>欢迎大家star</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
gcoord: 转换WGS84、GCJ02、BD09坐标，解决百度地图高德地图坐标系不统一的问题

## 原文链接
[https://segmentfault.com/a/1190000013350008](https://segmentfault.com/a/1190000013350008)

