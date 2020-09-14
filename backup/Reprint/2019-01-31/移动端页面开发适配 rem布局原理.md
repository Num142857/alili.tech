---
title: '移动端页面开发适配 rem布局原理' 
date: 2019-01-31 2:31:16
hidden: true
slug: gpgerxmzcje
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">移动端页面开发适配 rem布局原理</h2>
<h3 id="articleHeader1">什么是适配，为什么要适配</h3>
<p>我们拿到的设计图一般是以640，750，1080分辨率为基准设计的，而现在的手机终端各式各样，分辨率不同，逻辑像素不同 ，视口不同，所以为了让我们的页面在每个设备上都可以良好的展示，那么就需要为这些设备做统一的处理，这个过程就称为移动端适配。</p>
<h3 id="articleHeader2">需要知道的一些概念：</h3>
<blockquote><p>物理像素(physical pixel)</p></blockquote>
<p>一个物理像素是显示器(手机屏幕)上最小的物理显示单元，可以理解为我们平时说的分辨率。</p>
<blockquote><p>设备独立像素(density-independent pixel)</p></blockquote>
<p>设备独立像素(也叫密度无关像素)，可以认为是计算机坐标系统中得一个点，这个点代表一个可以由程序使用的虚拟像素(比如: css像素)，然后由相关系统转换为物理像素，在这里可以理解为我们说的视觉视口的大小；</p>
<p>所以说，物理像素和设备独立像素之间存在着一定的对应关系，这就是接下来要说的设备像素比。</p>
<blockquote><p>设备像素比(device pixel ratio)</p></blockquote>
<p>设备像素比(简称dpr)定义了物理像素和设备独立像素的对应关系，它的值可以按如下的公式的得到：<br>设备像素比 = 物理像素 / 设备独立像素 // 在某一方向上，x方向或者y方向</p>
<p>设备像素比也是设备生产的时候设置好的，在javascript中，可以通window.devicePixelRatio获取到当前设备的dpr。</p>
<h3 id="articleHeader3">视口（viewport）</h3>
<p>pc端视口指浏览器窗口内的内容区域，不包含工具条，滚动条.</p>
<hr>
<p>移动浏览器中视口分为几种情况:</p>
<ul>
<li><p>&lt;metaname="viewport"content=“width=device-width,minimum-scale=1.0,maximum-scale=1.0”/&gt;中content所设置的视口，称为布局视口，最大值由浏览器厂商规定 ,可以document.documentElement.clientWidth获取其宽度.</p></li>
<li><p>而我们看到的浏览器的窗口，网页区域的大小，称为视觉视口，用css像素表示（设备逻辑像素）</p></li>
</ul>
<h3 id="articleHeader4">rem</h3>
<p>rem是css3 的一个长度单位 ，相对文档跟元素 html；比如设置html  font-size=100px;那么1rem=100px;之后的所有元素都可以用这个基准值来设置大小；</p>
<h2 id="articleHeader5">常用的方案：</h2>
<ul><li><p>固定高度，宽度自适应（百分比，em）</p></li></ul>
<ul><li><p>使用 rem布局</p></li></ul>
<h2 id="articleHeader6">下面总结了网易 淘宝首页使用rem的方案</h2>
<h3 id="articleHeader7">网易的做法：</h3>
<p>1) 将布局适口设置为视觉视口，不进行缩放，即理想视口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot;content=&quot;initial-scale=1,maximum-scale=1, minimum-scale=1”>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>&lt;meta name=<span class="hljs-string">"viewport"</span>content=<span class="hljs-string">"initial-scale=1,maximum-scale=1, minimum-scale=1”&gt;</span>
</code></pre>
<hr>
<p>2)  以设计稿分辨率为基准，取100px为font-size的参照，那么设计稿的宽如果是640，body元素的宽度就可以设置为width:6.4rem（640/100），当我们将布局视口设置为320时，于是html的<code>font-size=deviceWidth / 6.4。</code></p>
<hr>
<p>3)  通过document.documentElement.clientWidth获取<code>deviceWidth；</code></p>
<hr>
<p>4)  当页面的dom ready后设置html font-size,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.documentElement.style.fontSize =document.documentElement.clientWidth / 6.4 + ‘px’
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.fontSize</span> =document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientWidth</span> / <span class="hljs-number">6.4</span> + ‘px’
</code></pre>
<p>5) 通过<code>mediaQuery</code> 设置字体大小，字体大小不可以使用rem,原因是误差太大。</p>
<hr>
<p>以640的设计稿为例最终的设置html font-size代码如下，布局时拿设计稿标注的尺寸除以100，就是rem的值，相当简单啊</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth > 640) deviceWidth = 640;
document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> deviceWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth;
<span class="hljs-keyword">if</span>(deviceWidth &gt; <span class="hljs-number">640</span>) deviceWidth = <span class="hljs-number">640</span>;
<span class="hljs-built_in">document</span>.documentElement.style.fontSize = deviceWidth / <span class="hljs-number">6.4</span> + <span class="hljs-string">'px'</span>;    
</code></pre>
<p>这里if(deviceWidth &gt; 640) deviceWidth = 640;  是因为当deviceWidth大于640时物理分辨率已经大于1280（取决于<code>dpr</code>），应该去访问pc的网站；</p>
<h3 id="articleHeader8">淘宝的做法：</h3>
<blockquote><p>原理</p></blockquote>
<p>1)  通过dpr设置缩放比，实现布局视口大小，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scale = 1 / devicePixelRatio;  
 document.querySelector('meta[name=&quot;viewport&quot;]').setAttribute('content','initial-scale='+ scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">scale</span> = <span class="hljs-number">1</span> / devicePixelRatio;  
 document.querySelector('meta[name=<span class="hljs-string">"viewport"</span>]').setAttribute('<span class="hljs-built_in">content</span>','initial-<span class="hljs-built_in">scale</span>='+ <span class="hljs-built_in">scale</span> + ', maximum-<span class="hljs-built_in">scale</span>=' + <span class="hljs-built_in">scale</span> + ', minimum-<span class="hljs-built_in">scale</span>=' + <span class="hljs-built_in">scale</span> + ', user-scalable=no');
</code></pre>
<p>2)   动态计算html的font-size</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + ‘px’；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.fontSize</span> = document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientWidth</span> / <span class="hljs-number">10</span> + ‘px’；
</code></pre>
<p>这里的意思是，clientWidth / 10 得到是布局视口下的rem基准值（以iphone6为例 1rem＝75px），那么设计稿正好也是 750，所以对应的关系  clientWidth / 10＝＝设计稿的尺寸/x,  那么x=设计稿的尺寸/rem基准值。<br>如果是iphone6 plus  rem基准值等于clientWidth / 10 等于124.2，那么x＝750/124.2。</p>
<hr>
<p>关于具体的实现 淘宝提供了一个开源的方案lib-flexible：<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">https://github.com/amfe/lib-f...</a>；</p>
<h3 id="articleHeader9">具体逻辑 ：</h3>
<p>1）判断head中是否设置了viewport，如果有设置，按照已有viewport 设置缩放比；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">if</span> (metaEl) {
        console.warn(<span class="hljs-string">'将根据已有的meta标签来设置缩放比例'</span>);
        var <span class="hljs-keyword">match</span> = metaEl.getAttribute(<span class="hljs-string">'content'</span>).<span class="hljs-keyword">match</span>(/initial\-<span class="hljs-keyword">scale</span>=([\d\.]+)/);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">match</span>) {
            <span class="hljs-keyword">scale</span> = parseFloat(<span class="hljs-keyword">match</span>[<span class="hljs-number">1</span>]);
            dpr = parseInt(<span class="hljs-number">1</span> / <span class="hljs-keyword">scale</span>);
        }
    }
</code></pre>
<p>2）如果没有设置meta viewport，判断是否设置dpr，如果有，通过dpr计算缩放scale。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);//maximum 设置最大值，与initial的值比较，取最小值；
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-keyword">var</span> content = flexibleEl.getAttribute(<span class="hljs-string">'content'</span>);
        <span class="hljs-keyword">if</span> (content) {
            <span class="hljs-keyword">var</span> initialDpr = content.match(<span class="hljs-regexp">/initial\-dpr=([\d\.]+)/</span>);
            <span class="hljs-keyword">var</span> maximumDpr = content.match(<span class="hljs-regexp">/maximum\-dpr=([\d\.]+)/</span>);<span class="hljs-comment">//maximum 设置最大值，与initial的值比较，取最小值；</span>
            <span class="hljs-keyword">if</span> (initialDpr) {
                dpr = <span class="hljs-built_in">parseFloat</span>(initialDpr[<span class="hljs-number">1</span>]);
                scale = <span class="hljs-built_in">parseFloat</span>((<span class="hljs-number">1</span> / dpr).toFixed(<span class="hljs-number">2</span>));    
            }
            <span class="hljs-keyword">if</span> (maximumDpr) {
                dpr = <span class="hljs-built_in">parseFloat</span>(maximumDpr[<span class="hljs-number">1</span>]);
                scale = <span class="hljs-built_in">parseFloat</span>((<span class="hljs-number">1</span> / dpr).toFixed(<span class="hljs-number">2</span>));    
            }
        }
</code></pre>
<p>3）如果 dpr &amp;scale都没有设置，那么就通过设备的dpr设置起缩放 scale，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!dpr &amp;&amp; !scale) {//meta[name=&quot;viewport&quot;]&amp;&amp;meta[name=&quot;flexible&quot;]都不存在。
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 &amp;&amp; (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 &amp;&amp; (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">if</span> (!dpr &amp;&amp; !scale) {<span class="hljs-comment">//meta[name="viewport"]&amp;&amp;meta[name="flexible"]都不存在。</span>
    <span class="hljs-keyword">var</span> isAndroid = <span class="hljs-keyword">win</span>.navigator.appVersion.<span class="hljs-built_in">match</span>(/android/gi);
    <span class="hljs-keyword">var</span> isIPhone = <span class="hljs-keyword">win</span>.navigator.appVersion.<span class="hljs-built_in">match</span>(/iphone/gi);
    <span class="hljs-keyword">var</span> devicePixelRatio = <span class="hljs-keyword">win</span>.devicePixelRatio;
    <span class="hljs-keyword">if</span> (isIPhone) {
        <span class="hljs-comment">// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案</span>
        <span class="hljs-keyword">if</span> (devicePixelRatio &gt;= 3 &amp;&amp; (!dpr || dpr &gt;= 3)) {                
            dpr = 3;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (devicePixelRatio &gt;= 2 &amp;&amp; (!dpr || dpr &gt;= 2)){
            dpr = 2;
        } <span class="hljs-keyword">else</span> {
            dpr = 1;
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 其他设备下，仍旧使用1倍的方案</span>
        dpr = 1;
    }
    scale = 1 / dpr;
}
</code></pre>
<p>4）得到scale之后 ，如果meta 的viewport不存在，那么就创建一meta[name=“viewport”],将scale配置进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    if (docEl.firstElementChild) {

        docEl.firstElementChild.appendChild(metaEl);
         
    } 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>    metaEl = doc.createElement(<span class="hljs-string">'meta'</span>);
    metaEl.setAttribute(<span class="hljs-string">'name'</span>, <span class="hljs-string">'viewport'</span>);
    metaEl.setAttribute(<span class="hljs-string">'content'</span>, <span class="hljs-string">'initial-scale='</span> + <span class="hljs-keyword">scale</span> + <span class="hljs-string">', maximum-scale='</span> + <span class="hljs-keyword">scale</span> + <span class="hljs-string">', minimum-scale='</span> + <span class="hljs-keyword">scale</span> + <span class="hljs-string">', user-scalable=no'</span>);

    <span class="hljs-keyword">if</span> (docEl.firstElementChild) {

        docEl.firstElementChild.appendChild(metaEl);
         
    } 
</code></pre>
<p>5）动态改写html的font-size</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var width = docEl.getBoundingClientRect().width;//获取html的宽度
    if (width / dpr > 540) {//判断屏幕逻辑像素大于540时，取540
        width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> <span class="hljs-built_in">width</span> = docEl.getBoundingClientRect().<span class="hljs-built_in">width</span>;//获取html的宽度
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">width</span> / dpr &gt; <span class="hljs-number">540</span>) {//判断屏幕逻辑像素大于<span class="hljs-number">540</span>时，取<span class="hljs-number">540</span>
        <span class="hljs-built_in">width</span> = <span class="hljs-number">540</span> * dpr;
    }
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">rem</span> = <span class="hljs-built_in">width</span> / <span class="hljs-number">10</span>;
    docEl.<span class="hljs-built_in">style</span>.fontSize = <span class="hljs-built_in">rem</span> + 'px';
    flexible.<span class="hljs-built_in">rem</span> = win.<span class="hljs-built_in">rem</span> = <span class="hljs-built_in">rem</span>;
</code></pre>
<p>总结：</p>
<ul>
<li><p>使用rem布局，实质都是通过动态改写html的font-size基准值，来实现不同设备下的良好统一适配；</p></li>
<li><p>网易与淘宝不同 的地方是 ，网易将布局视口设置成了 视觉视口，淘宝将布局视口设置成了物理像素大小，通过 scale缩放嵌入了 视觉视口中；</p></li>
<li><p>容器元素的字体大小都不使用rem，需要额外的media查询；</p></li>
</ul>
<hr>
<p>参考文章链接：<br><a href="http://www.cnblogs.com/lyzg/p/4877277.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/lyzg/p...</a>；<br><a href="http://mobile.51cto.com/web-484304.htm" rel="nofollow noreferrer" target="_blank">http://mobile.51cto.com/web-4...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端页面开发适配 rem布局原理

## 原文链接
[https://segmentfault.com/a/1190000007526917](https://segmentfault.com/a/1190000007526917)

