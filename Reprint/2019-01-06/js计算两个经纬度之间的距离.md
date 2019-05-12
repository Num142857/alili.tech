---
title: 'js计算两个经纬度之间的距离' 
date: 2019-01-06 2:30:10
hidden: true
slug: e9mvm6wkv0g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">如何获取两个经纬度之间的距离</h2>
<p>js如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法定义 lat,lng 
function GetDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
// 调用 return的距离单位为km
GetDistance(10.0,113.0,12.0,114.0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cpp hljs"><code class="cpp"><span class="hljs-comment">// 方法定义 lat,lng </span>
<span class="hljs-function">function <span class="hljs-title">GetDistance</span><span class="hljs-params">( lat1,  lng1,  lat2,  lng2)</span></span>{
    var radLat1 = lat1*Math.PI / <span class="hljs-number">180.0</span>;
    var radLat2 = lat2*Math.PI / <span class="hljs-number">180.0</span>;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / <span class="hljs-number">180.0</span> - lng2*Math.PI / <span class="hljs-number">180.0</span>;
    var s = <span class="hljs-number">2</span> * Math.<span class="hljs-built_in">asin</span>(Math.<span class="hljs-built_in">sqrt</span>(Math.<span class="hljs-built_in">pow</span>(Math.<span class="hljs-built_in">sin</span>(a/<span class="hljs-number">2</span>),<span class="hljs-number">2</span>) +
    Math.<span class="hljs-built_in">cos</span>(radLat1)*Math.<span class="hljs-built_in">cos</span>(radLat2)*Math.<span class="hljs-built_in">pow</span>(Math.<span class="hljs-built_in">sin</span>(b/<span class="hljs-number">2</span>),<span class="hljs-number">2</span>)));
    s = s *<span class="hljs-number">6378.137</span> ;<span class="hljs-comment">// EARTH_RADIUS;</span>
    s = Math.round(s * <span class="hljs-number">10000</span>) / <span class="hljs-number">10000</span>;
    <span class="hljs-keyword">return</span> s;
}
<span class="hljs-comment">// 调用 return的距离单位为km</span>
GetDistance(<span class="hljs-number">10.0</span>,<span class="hljs-number">113.0</span>,<span class="hljs-number">12.0</span>,<span class="hljs-number">114.0</span>)</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js计算两个经纬度之间的距离

## 原文链接
[https://segmentfault.com/a/1190000010371592](https://segmentfault.com/a/1190000010371592)

