---
title: '使用 Canvas 绘制一个游戏人物属性图' 
date: 2019-01-05 2:30:10
hidden: true
slug: mo1uernrg47
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前言</strong></h2>
<p><strong>身为一个程序员竟然沉迷游戏，wtf？？？ 都怪腾讯前几天出了一款叫做寻仙的手游，作为曾经的资深玩家，小V君犹豫再三还是忍不住入坑了。入坑了怎么不去打游戏，还在这里发文章？ 不不不，小V君今天在这里可不是要跟大家讨论游戏，作为一个好好学习，天天向上的有位少年，游戏嘛，只是业余的，码代码才是王道！！！所以小V君今天给大家分享一下怎么使用Canvas来绘制一个游戏登录界面的人物属性图！</strong></p>
<p>先上一波图片，怎么样？ 人物是不是很帅，很中国风？？？小V君当年可是花了四年时间来玩这个人物哦。。。</p>
<p><span class="img-wrap"><img data-src="/img/bVSD8E?w=1187&amp;h=948" src="https://static.alili.tech/img/bVSD8E?w=1187&amp;h=948" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1"><strong>一. 什么是Canvas？</strong></h2>
<p>canvas 元素用于在网页上绘制图形。HTML5 的 canvas 元素使用 JavaScript 在网页上绘制2D图像。 在矩形区域的画布上，控制其每一像素，JavaScript 来绘制 2D图形，逐像素进行渲染。可以通过多种方法使用canvas 元素绘制路径、矩形、圆形、字符以及添加图像。</p>
<p><strong>注意！！！</strong></p>
<p><strong>canvas 标签本身是不具备绘图功能，只能使用 JavaScript 在网页上绘制图像哦。</strong></p>
<h2 id="articleHeader2"><strong>二. 任务分析</strong></h2>
<p>为了简洁明了，小V君没有在页面上花什么时间，希望大家不要介意，毕竟JS才是今天的主角哦。<br>首先，我们来简单分析一下。这个人物的属性图是由六个内嵌的正六边形组成的，再由六根线从连接这个正六边形的中心，最后根据人物的属性进行颜色的填充。怎么样？是不是很简单，只要三步就可以绘制出这个游戏人物属性图哦。可能大家会觉得小V君说起来容易，实际又该怎么操作呢？各位看官大爷别着急，小的这就送上代码。</p>
<h2 id="articleHeader3"><strong>三. 代码部分</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mW = 400,
    mH = 400,
    mCtx = null,
    mCount = 6,
    mCenter = mW/2,
    mRadius = mCenter - 50,
    mAngle = Math.PI*2/mCount,
    mColorPolygon = '#000000',
    mData = [
      ['爆发', 100],
      ['防御', 60],
      ['治疗', 50],
      ['控制', 60],
      ['辅助', 30],
      ['机动', 70]
    ],
    mColorText = '#000000',
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = mW;
    canvas.height = mH;
    mCtx = canvas.getContext('2d');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>var <span class="hljs-attr">mW</span> = <span class="hljs-number">400</span>,
    <span class="hljs-attr">mH</span> = <span class="hljs-number">400</span>,
    <span class="hljs-attr">mCtx</span> = <span class="hljs-literal">null</span>,
    <span class="hljs-attr">mCount</span> = <span class="hljs-number">6</span>,
    <span class="hljs-attr">mCenter</span> = mW/<span class="hljs-number">2</span>,
    <span class="hljs-attr">mRadius</span> = mCenter - <span class="hljs-number">50</span>,
    <span class="hljs-attr">mAngle</span> = Math.PI*<span class="hljs-number">2</span>/mCount,
    <span class="hljs-attr">mColorPolygon</span> = '<span class="hljs-comment">#000000',</span>
    <span class="hljs-attr">mData</span> = [
      ['爆发', <span class="hljs-number">100</span>],
      ['防御', <span class="hljs-number">60</span>],
      ['治疗', <span class="hljs-number">50</span>],
      ['控制', <span class="hljs-number">60</span>],
      ['辅助', <span class="hljs-number">30</span>],
      ['机动', <span class="hljs-number">70</span>]
    ],
    <span class="hljs-attr">mColorText</span> = '<span class="hljs-comment">#000000',</span>
    <span class="hljs-attr">canvas</span> = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.<span class="hljs-attr">width</span> = mW;
    canvas.<span class="hljs-attr">height</span> = mH;
    <span class="hljs-attr">mCtx</span> = canvas.getContext('<span class="hljs-number">2</span>d');</code></pre>
<p>首先，我们需要指定一个id属性 (脚本中经常引用), 再使用width 和 height 属性定义的画布的大小.在这里我将画布的宽和高都设置为400，六边形嘛，数量当然是6，图形的中心等于它自身宽度的一半，线条的颜色就使用黑色，在利用一个数组写上自定义的数据就可以开始绘画啦。</p>
<p><strong>细心的朋友可能会问mRadius为什么等于mCenter减50呢？在这里，请允许小V君卖个关子，大家看完就自然知道结果啦~~~</strong></p>
<h2 id="articleHeader4">绘制六个内嵌的六边形</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawPolygon(ctx) {
    ctx.save();   // save the default state
    ctx.strokeStyle = mColorPolygon;
    var r = mRadius / mCount;
    for(var i = 0; i < mCount; i++) {
        ctx.beginPath();   //开始路径
        var currR = r * (i + 1);
        for(var j = 0; j < mCount; j++) {
            var x = mCenter + currR*Math.cos(mAngle*j);
            var y = mCenter + currR*Math.sin(mAngle*j);
            ctx.lineTo(x, y);  
        }
        ctx.closePath();  //闭合路径
        ctx.stroke()  // restore to the default state
    }
    ctx.restore();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawPolygon</span>(<span class="hljs-params">ctx</span>) </span>{
    ctx.save();   <span class="hljs-comment">// save the default state</span>
    ctx.strokeStyle = mColorPolygon;
    <span class="hljs-keyword">var</span> r = mRadius / mCount;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; mCount; i++) {
        ctx.beginPath();   <span class="hljs-comment">//开始路径</span>
        <span class="hljs-keyword">var</span> currR = r * (i + <span class="hljs-number">1</span>);
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; mCount; j++) {
            <span class="hljs-keyword">var</span> x = mCenter + currR*<span class="hljs-built_in">Math</span>.cos(mAngle*j);
            <span class="hljs-keyword">var</span> y = mCenter + currR*<span class="hljs-built_in">Math</span>.sin(mAngle*j);
            ctx.lineTo(x, y);  
        }
        ctx.closePath();  <span class="hljs-comment">//闭合路径</span>
        ctx.stroke()  <span class="hljs-comment">// restore to the default state</span>
    }
    ctx.restore();
}</code></pre>
<p>为了代码整体的美观和复用性，我们定一个名为drawPolygon的函数，再使用一个for循环来完成六边形的绘制。看到这里，大家可能会问怎么还使用了sin和cos函数了，想当年学数学那可是一个受罪，怎么现在还要受它的折磨。。。小V君也深表无奈，代码跟数学本来就是一家，代码里面很多地方都要运用Math函数，所以在数学这个坑上小V君与大家同在(┬＿┬)。（ps：js中需要用到的数学公式很多网上都有，不需要自己手写，只要增加点印象，一个复制就可以拉过来用了，啦啦啦，小V君也很会偷懒的，哈哈哈~~~）</p>
<p><span class="img-wrap"><img data-src="/img/bVSHRe?w=447&amp;h=417" src="https://static.alili.tech/img/bVSHRe?w=447&amp;h=417" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">绘制直线</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawLines(ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = mColorPolygon;
  for( var i = 0; i< mCount; i++){
    var x = mCenter + mRadius * Math.cos(mAngle*i);
    var y = mCenter + mRadius * Math.sin(mAngle*i);
    ctx.moveTo(mCenter, mCenter);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>function drawLines(ctx) {
  ctx.save()<span class="hljs-comment">;</span>
  ctx.<span class="hljs-keyword">beginPath();
</span>  ctx.strokeStyle = mColorPolygon<span class="hljs-comment">;</span>
  for( var i = <span class="hljs-number">0</span><span class="hljs-comment">; i&lt; mCount; i++){</span>
    var x = mCenter + mRadius * Math.cos(mAngle*i)<span class="hljs-comment">;</span>
    var y = mCenter + mRadius * Math.sin(mAngle*i)<span class="hljs-comment">;</span>
    ctx.<span class="hljs-keyword">moveTo(mCenter, </span>mCenter)<span class="hljs-comment">;</span>
    ctx.lineTo(x, y)<span class="hljs-comment">;</span>
  }
  ctx.stroke()<span class="hljs-comment">;</span>
  ctx.restore()<span class="hljs-comment">;</span>
}</code></pre>
<p>同理，定义一个名为drawLines的函数来实现这部分功能。Canvas画线相对来说比较简单，比较难理解的估计还是在这个for循环的函数里面，对于六边形的绘制大家可以参考一下这篇博文 ? <a href="http://blog.csdn.net/sysuzjz/article/details/53107594" rel="nofollow noreferrer" target="_blank">如何绘制六边形</a></p>
<p><span class="img-wrap"><img data-src="/img/bVSHRv?w=449&amp;h=407" src="https://static.alili.tech/img/bVSHRv?w=449&amp;h=407" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">绘制覆盖区域</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawRegion(ctx) {
  ctx.save();
  ctx.beginPath();
  for(var i = 0; i< mCount; i++){
    var x = mCenter + mRadius*Math.cos(mAngle*i)*mData[i][5]/100;
    var y = mCenter + mRadius*Math.sin(mAngle*i)*mData[i][6]/100;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,0,0,.5)';
  ctx.fill();
  ctx.store();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawRegion</span>(<span class="hljs-params">ctx</span>) </span>{
  ctx.save();
  ctx.beginPath();
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt; mCount; i++){
    <span class="hljs-keyword">var</span> x = mCenter + mRadius*<span class="hljs-built_in">Math</span>.cos(mAngle*i)*mData[i][<span class="hljs-number">5</span>]/<span class="hljs-number">100</span>;
    <span class="hljs-keyword">var</span> y = mCenter + mRadius*<span class="hljs-built_in">Math</span>.sin(mAngle*i)*mData[i][<span class="hljs-number">6</span>]/<span class="hljs-number">100</span>;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = <span class="hljs-string">'rgba(255,0,0,.5)'</span>;
  ctx.fill();
  ctx.store();
}</code></pre>
<p>写到这里，我们的属性图差不多就绘制完成了。但是，图形内的颜色具体是怎么进行填充的呢？在这里我们使用了fill语法进行填充，在代码中只需要使用ctx.fill()就可以实现了。</p>
<p>解释：填充，是将闭合的路径的内容填充具体的颜色,在这里我设置了透明度为0.5的红色，默认颜色黑色。如果所有的描点没有构成封闭结构，也会自动构成一个封闭图形。</p>
<p><span class="img-wrap"><img data-src="/img/bVSHRF?w=449&amp;h=424" src="https://static.alili.tech/img/bVSHRF?w=449&amp;h=424" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">绘制文本</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawText(ctx) {
  ctx.save();
  var fontSize = mCenter/12;
  ctx.font = fontSize + 'px Microsoft Yahei';
  ctx.fillStyle = mColorText;
  for(var i = 0; i< mCount; i++){
    var x = mCenter + mRadius*Math.cos(mAngle*i);
    var y = mCenter + mRadius*Math.sin(mAngle*i);
    //通过不同的位置，调整文本的显示位置
    if( mAngle * i >= 0 &amp;&amp; mAngle * i <= Math.PI / 2 ){
            ctx.fillText(mData[i][0], x, y + fontSize);
        }else if(mAngle * i > Math.PI / 2 &amp;&amp; mAngle * i <= Math.PI){
            ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y + fontSize);
        }else if(mAngle * i > Math.PI &amp;&amp; mAngle * i <= Math.PI * 3 / 2){
            ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y);
        }else{
            ctx.fillText(mData[i][0], x, y);
        }
  }
  ctx.restore();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawText</span>(<span class="hljs-params">ctx</span>) </span>{
  ctx.save();
  <span class="hljs-keyword">var</span> fontSize = mCenter/<span class="hljs-number">12</span>;
  ctx.font = fontSize + <span class="hljs-string">'px Microsoft Yahei'</span>;
  ctx.fillStyle = mColorText;
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt; mCount; i++){
    <span class="hljs-keyword">var</span> x = mCenter + mRadius*<span class="hljs-built_in">Math</span>.cos(mAngle*i);
    <span class="hljs-keyword">var</span> y = mCenter + mRadius*<span class="hljs-built_in">Math</span>.sin(mAngle*i);
    <span class="hljs-comment">//通过不同的位置，调整文本的显示位置</span>
    <span class="hljs-keyword">if</span>( mAngle * i &gt;= <span class="hljs-number">0</span> &amp;&amp; mAngle * i &lt;= <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span> ){
            ctx.fillText(mData[i][<span class="hljs-number">0</span>], x, y + fontSize);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(mAngle * i &gt; <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span> &amp;&amp; mAngle * i &lt;= <span class="hljs-built_in">Math</span>.PI){
            ctx.fillText(mData[i][<span class="hljs-number">0</span>], x - ctx.measureText(mData[i][<span class="hljs-number">0</span>]).width, y + fontSize);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(mAngle * i &gt; <span class="hljs-built_in">Math</span>.PI &amp;&amp; mAngle * i &lt;= <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">3</span> / <span class="hljs-number">2</span>){
            ctx.fillText(mData[i][<span class="hljs-number">0</span>], x - ctx.measureText(mData[i][<span class="hljs-number">0</span>]).width, y);
        }<span class="hljs-keyword">else</span>{
            ctx.fillText(mData[i][<span class="hljs-number">0</span>], x, y);
        }
  }
  ctx.restore();
}</code></pre>
<p>至此，我们的人物属性图就绘制好了。不知道各位看完之后有没有想明白前面小V君埋下的问题呢？50px，对的，mRadius等于mCenter减50中的那50px就是给我们的文本留出来的位置，代码中的if语句就是通过不同的位置来调整文本的显示位置。</p>
<p><span class="img-wrap"><img data-src="/img/bVSHRW?w=471&amp;h=434" src="https://static.alili.tech/img/bVSHRW?w=471&amp;h=434" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8"><strong>四. 小结</strong></h2>
<p>综上所述，简单说明了如何使用Canvas来绘制一个人物属性图，以上内容属个人理解和网上学习总结，如有错误，欢迎指正共勉。关于Canvas这个元素，它应用的领域可是非常的广阔哦。比如在游戏方面，canvas在基于Web的图像显示方面比Flash更加立体、更加精巧，canvas游戏在流畅度和跨平台方面更牛。在可视化数据方面，百度的echart、d3.js、three.js等等用运用到了canvas。如果你以为Canvas的运用只有这些，那就打错特错了，在现在以及未来的智能机时代，HTML5技术能够在banner广告上发挥巨大作用，而使用Canvas来实现动态的广告效果再合适不过。</p>
<h2 id="articleHeader9">?<a href="http://www.runoob.com/html/html5-canvas.html" rel="nofollow noreferrer" target="_blank">更多Canvas内容，点这里</a>～</h2>
<h2 id="articleHeader10"><a href="https://github.com/Ernest96317/Canvas" rel="nofollow noreferrer" target="_blank">?源码地址：Github<span style="font-weight:normal;">✨</span><span style="font-weight:normal;">✨</span>求你的小星星～</a></h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Canvas 绘制一个游戏人物属性图

## 原文链接
[https://segmentfault.com/a/1190000010618202](https://segmentfault.com/a/1190000010618202)

