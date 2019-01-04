---
title: '使用原生js实现轮播图效果' 
date: 2019-01-05 2:30:10
hidden: true
slug: o41jnzmukd
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://zhuanlan.zhihu.com/p/27537029" rel="nofollow noreferrer" target="_blank">知乎原文</a>  <a href="http://heternally.ka94.com/index.php/archives/20/" rel="nofollow noreferrer" target="_blank">我的博客</a>  <a href="https://mp.weixin.qq.com/s?__biz=MzIxNTk1OTAwOQ==&amp;mid=2247483663&amp;idx=1&amp;sn=a2318c989365caf5871f83169ec903ca&amp;chksm=97911581a0e69c978347257bb17d0c3390aa32a0109069cc231f2ec05eb5cf99fad5bef0068f#rd" rel="nofollow noreferrer" target="_blank">微信公众号</a><br>这几天在逛网站的时候，发现很多网站都有轮播图这个效果，所以我就仿照小米的官网用原生js写了一个轮播图效果，希望大家喜欢。<br>这是我发布在github上的最后实现的效果：<a href="https://heternally.github.io/banner/" rel="nofollow noreferrer" target="_blank">https://heternally.github.io/...</a></p>
<p>下面我简单跟大家说一下我实现该效果的过程，如果有什么错误的地方，欢迎大家说出来，以方便大家互相学习。</p>
<p>我相信前面简单的html+css大家应该都会，我这里就不说了，简单给大家展示一下代码：</p>
<p><strong>HTML部分</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;wrap&quot;>
<div class=&quot;banner&quot;>
    <div class=&quot;banner-img&quot;>
        <img src=&quot;images/1.jpg&quot; width=&quot;1226&quot; height=&quot;460&quot; alt=&quot;轮播图1&quot;>
    </div>
</div>

<div class=&quot;banner&quot;>
    <div class=&quot;banner-img&quot;>
        <img src=&quot;images/2.jpg&quot; width=&quot;1226&quot; height=&quot;460&quot; alt=&quot;轮播图2&quot;>
    </div>
</div>

<div class=&quot;banner&quot;>
    <div class=&quot;banner-img&quot;>
        <img src=&quot;images/3.jpg&quot; width=&quot;1226&quot; height=&quot;460&quot; alt=&quot;轮播图3&quot;>
    </div>
</div>

<div class=&quot;banner&quot;>
    <div class=&quot;banner-img&quot;>
        <img src=&quot;images/4.jpg&quot; width=&quot;1226&quot; height=&quot;460&quot; alt=&quot;轮播图4&quot;>
    </div>
</div>

<div class=&quot;banner&quot;>
    <div class=&quot;banner-img&quot;>
        <img src=&quot;images/5.jpg&quot; width=&quot;1226&quot; height=&quot;460&quot; alt=&quot;轮播图5&quot;>
    </div>
</div>

<div class=&quot;tab&quot;>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>

<div class=&quot;prev&quot;>

</div>
<div class=&quot;next&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner-img"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/1.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1226"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"460"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"轮播图1"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner-img"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/2.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1226"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"460"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"轮播图2"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner-img"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/3.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1226"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"460"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"轮播图3"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner-img"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/4.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1226"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"460"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"轮播图4"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"banner-img"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/5.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1226"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"460"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"轮播图5"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"prev"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"next"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>css部分</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
  margin:0;
  padding:0;
}
#wrap {
  position:relative;
  margin:20px auto;
  width:1226px;
  height:460px;
}
#wrap .banner {
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  opacity:0;
  transition: opacity 2s;
}
#wrap .tab{
  position:absolute;
  bottom:10px;
  right:10px;
}
    #wrap .tab span{
      display: inline-block;
      width:6px;
      height:6px;
      margin:3px;
      background:rgba(105,105,105,0.5);
      border-radius:50%;
      cursor: pointer;
      border:2px solid #887B6E;
    }
    #wrap .tab span.on{
      background:#E2CEB7;
    }
    #wrap .tab span:hover{
      background:#E2CEB7;
    }
#wrap .prev {
  position:absolute;
  left:20px;
  top:210px;
  width:41px;
  height:69px;
  background: url(&quot;images/icon-slides.png&quot;) 82px;
  cursor:pointer;
}
#wrap .prev:hover{
  background: url(&quot;images/icon-slides.png&quot;);
} 
#wrap .next {
  position:absolute;
  right:20px;
  top:210px;
  width:41px;
  height:69px;
  background: url(&quot;images/icon-slides.png&quot;) 41px;
  cursor:pointer;
}
#wrap .next:hover{
  background: url(&quot;images/icon-slides.png&quot;) 123px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">* {
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#wrap</span> {
  <span class="hljs-attribute">position</span>:relative;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">20px</span> auto;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">1226px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">460px</span>;
}
<span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.banner</span> {
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">2s</span>;
}
<span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.tab</span>{
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">bottom</span>:<span class="hljs-number">10px</span>;
  <span class="hljs-attribute">right</span>:<span class="hljs-number">10px</span>;
}
    <span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.tab</span> <span class="hljs-selector-tag">span</span>{
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>:<span class="hljs-number">6px</span>;
      <span class="hljs-attribute">height</span>:<span class="hljs-number">6px</span>;
      <span class="hljs-attribute">margin</span>:<span class="hljs-number">3px</span>;
      <span class="hljs-attribute">background</span>:<span class="hljs-built_in">rgba</span>(105,105,105,0.5);
      <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>;
      <span class="hljs-attribute">cursor</span>: pointer;
      <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#887B6E</span>;
    }
    <span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.tab</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.on</span>{
      <span class="hljs-attribute">background</span>:<span class="hljs-number">#E2CEB7</span>;
    }
    <span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.tab</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:hover</span>{
      <span class="hljs-attribute">background</span>:<span class="hljs-number">#E2CEB7</span>;
    }
<span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.prev</span> {
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">left</span>:<span class="hljs-number">20px</span>;
  <span class="hljs-attribute">top</span>:<span class="hljs-number">210px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">41px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">69px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"images/icon-slides.png"</span>) <span class="hljs-number">82px</span>;
  <span class="hljs-attribute">cursor</span>:pointer;
}
<span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.prev</span><span class="hljs-selector-pseudo">:hover</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"images/icon-slides.png"</span>);
} 
<span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.next</span> {
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">right</span>:<span class="hljs-number">20px</span>;
  <span class="hljs-attribute">top</span>:<span class="hljs-number">210px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">41px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">69px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"images/icon-slides.png"</span>) <span class="hljs-number">41px</span>;
  <span class="hljs-attribute">cursor</span>:pointer;
}
<span class="hljs-selector-id">#wrap</span> <span class="hljs-selector-class">.next</span><span class="hljs-selector-pseudo">:hover</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"images/icon-slides.png"</span>) <span class="hljs-number">123px</span>;
}</code></pre>
<p>上面的代码都很简单，稍微看看就可以了，下面开始重点说下js部分</p>
<p><strong>首先我先获取各个节点，通过类名，ID等方法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oBody = document.getElementsByTagName(&quot;body&quot;)[0];
var aBanner = document.getElementsByClassName(&quot;banner&quot;);
var aSpan = document.getElementsByClassName(&quot;tab&quot;) [0].getElementsByTagName(&quot;span&quot;);
var oNext = document.getElementsByClassName(&quot;next&quot;)[0];
var Oprev = document.getElementsByClassName(&quot;prev&quot;)[0];
var Oon = document.getElementsByClassName(&quot;on&quot;)[0];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> oBody = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"body"</span>)[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> aBanner = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"banner"</span>);
<span class="hljs-keyword">var</span> aSpan = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"tab"</span>) [<span class="hljs-number">0</span>].getElementsByTagName(<span class="hljs-string">"span"</span>);
<span class="hljs-keyword">var</span> oNext = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"next"</span>)[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> Oprev = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"prev"</span>)[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> Oon = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"on"</span>)[<span class="hljs-number">0</span>];</code></pre>
<p><strong>接下来是初始化界面，因为我在css里面设置了图片的不透明度opacity:0;所以我在实现轮播图前先使得第一张图片显示和第一个小圆点颜色为白色：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="aBanner[0].style.opacity = &quot;1&quot;;
aSpan[0].className = &quot;on&quot;;
var num = 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">aBanner[<span class="hljs-number">0</span>].style.opacity = <span class="hljs-string">"1"</span>;
aSpan[<span class="hljs-number">0</span>].className = <span class="hljs-string">"on"</span>;
<span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;</code></pre>
<p><strong>然后就是设置前一张，后一张，小圆点的按钮效果了，实现点击小圆点，会使相对应的图片显示，点击前一张，会使前一张图片显示；后一张效果一样：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0;i < aSpan.length;i++){
aSpan[i].index = i;
aSpan[i].onclick = function(){  //点击小圆点图片相对应的进行切换
for(var j = 0 ;j < aSpan.length; j++){
  num = this.index;
  aSpan[j].className = &quot;&quot;;
  aBanner[j].style.opacity = &quot;0&quot;;
}
aSpan[num].className = &quot;on&quot;;
aBanner[num].style.opacity = &quot;1&quot;;
}
oNext.onclick = function(){//按下图片切换到后一张
  for(var j = 0 ;j < aSpan.length; j++){
  if(aSpan[j].className == &quot;on&quot;){
      aSpan[j].className = &quot;&quot;;
      aBanner[j].style.opacity = &quot;0&quot;;
      j++;
      num++;
      if(j > 4){
      j = 0;
  }
      aSpan[j].className = &quot;on&quot;;
aBanner[j].style.opacity = &quot;1&quot;;

  }
}
}

  Oprev.onclick = function(){  //按下图片切换到前一张
  for(var j = 0 ;j < aSpan.length; j++){
      if(aSpan[j].className == &quot;on&quot;){
          aSpan[j].className = &quot;&quot;;
          aBanner[j].style.opacity = &quot;0&quot;;
          j--;
          num--;
          if(j < 0){
          j = 4;
      }
          aSpan[j].className = &quot;on&quot;;
  aBanner[j].style.opacity = &quot;1&quot;;

  }
}
}  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; aSpan.length;i++){
aSpan[i].index = i;
aSpan[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  <span class="hljs-comment">//点击小圆点图片相对应的进行切换</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span> ;j &lt; aSpan.length; j++){
  num = <span class="hljs-keyword">this</span>.index;
  aSpan[j].className = <span class="hljs-string">""</span>;
  aBanner[j].style.opacity = <span class="hljs-string">"0"</span>;
}
aSpan[num].className = <span class="hljs-string">"on"</span>;
aBanner[num].style.opacity = <span class="hljs-string">"1"</span>;
}
oNext.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//按下图片切换到后一张</span>
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span> ;j &lt; aSpan.length; j++){
  <span class="hljs-keyword">if</span>(aSpan[j].className == <span class="hljs-string">"on"</span>){
      aSpan[j].className = <span class="hljs-string">""</span>;
      aBanner[j].style.opacity = <span class="hljs-string">"0"</span>;
      j++;
      num++;
      <span class="hljs-keyword">if</span>(j &gt; <span class="hljs-number">4</span>){
      j = <span class="hljs-number">0</span>;
  }
      aSpan[j].className = <span class="hljs-string">"on"</span>;
aBanner[j].style.opacity = <span class="hljs-string">"1"</span>;

  }
}
}

  Oprev.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  <span class="hljs-comment">//按下图片切换到前一张</span>
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span> ;j &lt; aSpan.length; j++){
      <span class="hljs-keyword">if</span>(aSpan[j].className == <span class="hljs-string">"on"</span>){
          aSpan[j].className = <span class="hljs-string">""</span>;
          aBanner[j].style.opacity = <span class="hljs-string">"0"</span>;
          j--;
          num--;
          <span class="hljs-keyword">if</span>(j &lt; <span class="hljs-number">0</span>){
          j = <span class="hljs-number">4</span>;
      }
          aSpan[j].className = <span class="hljs-string">"on"</span>;
  aBanner[j].style.opacity = <span class="hljs-string">"1"</span>;

  }
}
}  
}</code></pre>
<ol>
<li><p>在这部分给一个for循环，length为小圆点的个数，在这个循环中，先给每个圆点的下标值赋值，使得每个圆点对应一张图片；</p></li>
<li><p>然后编写点击圆点的函数，在函数中实现当前圆点的时候，获取当前的下标值，讲该值赋给全局变量num，将所以图片的opacity设置为o，去掉所有圆点的"on"样式，然后将第num张图片的opacity设置为1，添加"on"样式，这样就实现了点击圆点跳转到相应的图片。</p></li>
<li><p>同样的就可以实现向前向后按钮效果.</p></li>
</ol>
<p><strong>最后设置一个定时器的函数，实现图片轮播：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Time(){/*设置定时器运行的函数*/
num++;
if(num < 5){
    for(var j = 0 ;j < aSpan.length; j++){
    aSpan[j].className = &quot;&quot;;
    aBanner[j].style.opacity = &quot;0&quot;;
}
aSpan[num].className = &quot;on&quot;;
aBanner[num].style.opacity = &quot;1&quot;;
}else {
    num = -1;
}         
}
clearInterval(timer);
var timer = setInterval(&quot;Time()&quot;,2000);/*调用定时器*/

oBody.onmouseover = function(){/*鼠标引入，清除定时器，轮播图停止*/
    clearInterval(timer);
};
oBody.onmouseout = function(){/*鼠标移出，重新调用定时器，轮播图开始*/
    clearInterval(timer);
     timer = setInterval(&quot;Time()&quot;,2000);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Time</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/*设置定时器运行的函数*/</span>
num++;
<span class="hljs-keyword">if</span>(num &lt; <span class="hljs-number">5</span>){
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span> ;j &lt; aSpan.length; j++){
    aSpan[j].className = <span class="hljs-string">""</span>;
    aBanner[j].style.opacity = <span class="hljs-string">"0"</span>;
}
aSpan[num].className = <span class="hljs-string">"on"</span>;
aBanner[num].style.opacity = <span class="hljs-string">"1"</span>;
}<span class="hljs-keyword">else</span> {
    num = <span class="hljs-number">-1</span>;
}         
}
clearInterval(timer);
<span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-string">"Time()"</span>,<span class="hljs-number">2000</span>);<span class="hljs-comment">/*调用定时器*/</span>

oBody.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/*鼠标引入，清除定时器，轮播图停止*/</span>
    clearInterval(timer);
};
oBody.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/*鼠标移出，重新调用定时器，轮播图开始*/</span>
    clearInterval(timer);
     timer = setInterval(<span class="hljs-string">"Time()"</span>,<span class="hljs-number">2000</span>);
};</code></pre>
<p>在调用定时器的时候，我用的使setInterval，或者你要使用setTimerout也是可以的；</p>
<p>在调用定时器要先清除定时器，不然会让定时器一直叠加，使得轮播速度越来越快；我还加了当鼠标移入的时候，轮播图停止，即定时器被清除了，当鼠标移出的时候，定时器又重新被调用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用原生js实现轮播图效果

## 原文链接
[https://segmentfault.com/a/1190000010581158](https://segmentfault.com/a/1190000010581158)

