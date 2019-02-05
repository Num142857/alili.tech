---
title: 'JS实现时钟效果' 
date: 2019-02-06 2:30:09
hidden: true
slug: b4212cjcsr5
categories: [reprint]
---

{{< raw >}}

                    
<p>闲来无事，用JS写了个时钟，只要思路理清了，做起来其实还挺简单的。</p>
<p>先发个效果链接    <a href="https://jsfiddle.net/sunny_zhang/jcm8h4qe/" rel="nofollow noreferrer" target="_blank">点击查看</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/jcm8h4qe/" data-typeid="0">点击预览</button></p>
<h2 id="articleHeader0">Demo</h2>
<p><span class="img-wrap"><img data-src="/img/bVzKLJ" src="https://static.alili.tech/img/bVzKLJ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">代码实现</h2>
<p><strong>HTML</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;warp&quot; >
    <div id=&quot;clock&quot; >
            <div id=&quot;number&quot;>
                <div><span>9</span></div>
                <div><span>10</span></div>
                <div><span>11</span></div>
                <div><span>12</span></div>
                <div><span>1</span></div>
                <div><span>2</span></div>
                <div><span>3</span></div>
                <div><span>4</span></div>
                <div><span>5</span></div>
                <div><span>6</span></div>
                <div><span>7</span></div>
                <div><span>8</span></div>
            </div>
            <div id=&quot;houre&quot; class=&quot;pointer&quot; ></div>
            <div id=&quot;minute&quot; class=&quot;pointer&quot; ></div>
            <div id=&quot;second&quot; class=&quot;pointer&quot; ></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"warp"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"clock"</span> &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"number"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>10<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>11<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>12<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"houre"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pointer"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"minute"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pointer"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"second"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pointer"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>CSS</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
    padding：0；
    margin：0；
}
html, body {
    height: 100%;
    background: #9c9;
}
#warp{
    width:230px;
    height:230px;
    margin:50px auto;
}
#clock{
    width:200px;
    height:200px;
    border-radius:115px;
    border:15px solid #f96;
    background:white;
    position:relative;
}
#number div{
    width:190px;
    height:20px;
    position:absolute;
    left:10px;
    top:90px;
}
#number span{
    display:block;
    width:20px;
    height:20px;
}
.pointer{
    position:absolute;
    bottom:90px;
    transform-origin:50% 90%;
    -webkit-transform-origin:50% 90%;
}
#houre{
    width:5px;
    height:60px;
    left:98px;
    background:black;
}
#minute{
    width:3px;
    height:70px;
    left:99px;
    background:gray;
}
#second{
    width:1px;
    height:80px;
    left:100px;
    background:red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>*{
    <span class="hljs-attribute">padding</span>：0；
    <span class="hljs-attribute">margin</span>：0；
}
<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#9c9</span>;
}
<span class="hljs-selector-id">#warp</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">230px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">230px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> auto;
}
<span class="hljs-selector-id">#clock</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">115px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">15px</span> solid <span class="hljs-number">#f96</span>;
    <span class="hljs-attribute">background</span>:white;
    <span class="hljs-attribute">position</span>:relative;
}
<span class="hljs-selector-id">#number</span> <span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">190px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">90px</span>;
}
<span class="hljs-selector-id">#number</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.pointer</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">90px</span>;
    <span class="hljs-attribute">transform-origin</span>:<span class="hljs-number">50%</span> <span class="hljs-number">90%</span>;
    -webkit-<span class="hljs-attribute">transform-origin</span>:<span class="hljs-number">50%</span> <span class="hljs-number">90%</span>;
}
<span class="hljs-selector-id">#houre</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">60px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">98px</span>;
    <span class="hljs-attribute">background</span>:black;
}
<span class="hljs-selector-id">#minute</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">3px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">70px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">99px</span>;
    <span class="hljs-attribute">background</span>:gray;
}
<span class="hljs-selector-id">#second</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">1px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>:red;
}</code></pre>
<p>这里要注意的是number里面div的宽度给够，要不然后面用JS布局会出现问题。</p>
<p><strong>JavaScript</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oNumber=document.getElementById(&quot;number&quot;);
var oDiv=oNumber.getElementsByTagName(&quot;div&quot;);
var oSpan=oNumber.getElementsByTagName(&quot;span&quot;);
for(var i=0;i<oDiv.length;i++){
    oDiv[i].style.WebkitTransform=&quot;rotate(&quot; + i * 30 + &quot;deg)&quot;;
}    
for(var j=0;j<oSpan.length;j++){
    oSpan[j].style.WebkitTransform=&quot;rotate(&quot;+ j * -30 + &quot;deg)&quot;;
}    
function ColorNumber(){
    var oHoure=document.getElementById(&quot;houre&quot;);
    var oMinute=document.getElementById(&quot;minute&quot;);
    var oSecond=document.getElementById(&quot;second&quot;);

    var nowTime=new Date();
    var nowHoure=nowTime.getHours();
    var nowMinute=nowTime.getMinutes();
    var nowSecond=nowTime.getSeconds();
    var houreDeg=(nowMinute/60)*30;
    var minuteDeg=(nowSecond/60)*6;
    oHoure.style.WebkitTransform=&quot;rotate(&quot;+ (nowHoure * 30+houreDeg) + &quot;deg)&quot;;
    oMinute.style.WebkitTransform=&quot;rotate(&quot;+ (nowMinute * 6+ minuteDeg) + &quot;deg)&quot;;
    oSecond.style.WebkitTransform=&quot;rotate(&quot;+ (nowSecond * 6) + &quot;deg)&quot;;
}
ColorNumber();
setInterval(ColorNumber,1000);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oNumber=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"number"</span>);
<span class="hljs-keyword">var</span> oDiv=oNumber.getElementsByTagName(<span class="hljs-string">"div"</span>);
<span class="hljs-keyword">var</span> oSpan=oNumber.getElementsByTagName(<span class="hljs-string">"span"</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;oDiv.length;i++){
    oDiv[i].style.WebkitTransform=<span class="hljs-string">"rotate("</span> + i * <span class="hljs-number">30</span> + <span class="hljs-string">"deg)"</span>;
}    
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>;j&lt;oSpan.length;j++){
    oSpan[j].style.WebkitTransform=<span class="hljs-string">"rotate("</span>+ j * <span class="hljs-number">-30</span> + <span class="hljs-string">"deg)"</span>;
}    
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ColorNumber</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> oHoure=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"houre"</span>);
    <span class="hljs-keyword">var</span> oMinute=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"minute"</span>);
    <span class="hljs-keyword">var</span> oSecond=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"second"</span>);

    <span class="hljs-keyword">var</span> nowTime=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">var</span> nowHoure=nowTime.getHours();
    <span class="hljs-keyword">var</span> nowMinute=nowTime.getMinutes();
    <span class="hljs-keyword">var</span> nowSecond=nowTime.getSeconds();
    <span class="hljs-keyword">var</span> houreDeg=(nowMinute/<span class="hljs-number">60</span>)*<span class="hljs-number">30</span>;
    <span class="hljs-keyword">var</span> minuteDeg=(nowSecond/<span class="hljs-number">60</span>)*<span class="hljs-number">6</span>;
    oHoure.style.WebkitTransform=<span class="hljs-string">"rotate("</span>+ (nowHoure * <span class="hljs-number">30</span>+houreDeg) + <span class="hljs-string">"deg)"</span>;
    oMinute.style.WebkitTransform=<span class="hljs-string">"rotate("</span>+ (nowMinute * <span class="hljs-number">6</span>+ minuteDeg) + <span class="hljs-string">"deg)"</span>;
    oSecond.style.WebkitTransform=<span class="hljs-string">"rotate("</span>+ (nowSecond * <span class="hljs-number">6</span>) + <span class="hljs-string">"deg)"</span>;
}
ColorNumber();
setInterval(ColorNumber,<span class="hljs-number">1000</span>);
</code></pre>
<p>这里主要代码就两段，一段是布局用的，让数字旋转到相应的位置并调整方向：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0;i<oDiv.length;i++){
    oDiv[i].style.WebkitTransform=&quot;rotate(&quot; + i * 30 + &quot;deg)&quot;;
}    
for(var j=0;j<oSpan.length;j++){
    oSpan[j].style.WebkitTransform=&quot;rotate(&quot;+ j * -30 + &quot;deg)&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>;i&lt;oDiv.<span class="hljs-built_in">length</span>;i++){
    oDiv[i].<span class="hljs-built_in">style</span>.WebkitTransform=<span class="hljs-string">"rotate("</span> + i * <span class="hljs-number">30</span> + <span class="hljs-string">"deg)"</span>;
}    
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> j=<span class="hljs-number">0</span>;j&lt;oSpan.<span class="hljs-built_in">length</span>;j++){
    oSpan[j].<span class="hljs-built_in">style</span>.WebkitTransform=<span class="hljs-string">"rotate("</span>+ j * -<span class="hljs-number">30</span> + <span class="hljs-string">"deg)"</span>;
}</code></pre>
<p>另一段是计算指针的角度，其中最重要的是在不满一小时或不满一分钟时，时针或分针应该转多少度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var houreDeg=(nowMinute/60)*30;
var minuteDeg=(nowSecond/60)*6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var houreDeg</span>=(nowMinute/60)*30;
<span class="hljs-attribute">var minuteDeg</span>=(nowSecond/60)*6;</code></pre>
<p>It's done.是不是很简单......</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS实现时钟效果

## 原文链接
[https://segmentfault.com/a/1190000006099464](https://segmentfault.com/a/1190000006099464)

