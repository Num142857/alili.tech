---
title: '用CSS3 transition属性实现淡入淡出轮播图' 
date: 2019-01-30 2:30:23
hidden: true
slug: isuwakrbo9
categories: [reprint]
---

{{< raw >}}

                    
<p>最近想自己写下轮播图，在网上发现一个网友用CSS transition属性实现的轮播，赶脚<strong>超简单</strong>哦，自己学习了后整理如下。（找不到原网址了-.-...就不贴了...）<br>（如果不了解transition，先去<a href="http://www.w3school.com.cn/cssref/pr_transition.asp" rel="nofollow noreferrer" target="_blank">这里（点我，点我）</a>学习下）</p>
<h2 id="articleHeader0">思路</h2>
<p>图片淡入淡出效果是不透明度（<a href="http://www.w3school.com.cn/cssref/pr_opacity.asp" rel="nofollow noreferrer" target="_blank">CSS opacity属性</a>）的变换过程。举例，让图片淡出，就是图片的<code>opacity</code>属性在一段时间内逐渐从<code>1</code>变为<code>0</code>，淡入呢，则是图片的<code>opacity</code>属性在一段时间内逐渐从<code>0</code>变为<code>1</code>，用transition可以轻松实现啊。</p>
<p>我们设置图片的CSS样式如下，先不考虑布局和宽高这些。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img{
  opacity: 0;
  transition: opacity 1s;
}
img.active{
  opacity: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.active</span>{
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>这段CSS能实现什么呢？</p>
<p>一开始，<code>img</code>的<code>opacity</code>为<code>0</code>，所以我们看不见。如果我们用JS给<code>img</code>加上<code>active</code>类，<code>img</code>的<code>opacity</code>就要变成<code>1</code>对吧，由于有<code>transition</code>属性，所以要等<code>1s</code>，<code>opacity</code>才能完全变为<code>1</code>，实现了淡入。</p>
<p>那淡出呢？你想下，等<code>img</code>淡入完了之后，我又用JS删掉<code>img</code>的<code>active</code>类会怎么样？这时候<code>img</code>的<code>opacity</code>应该从<code>1</code>变为<code>0</code>对吧，又由于有<code>transition</code>属性，所以<code>opacity</code>要等<code>1s</code>才能变为<code>0</code>，这就实现了淡出。</p>
<p>JS的<code>setInterval(code,millisec)</code>（<a href="http://www.w3school.com.cn/jsref/met_win_setinterval.asp" rel="nofollow noreferrer" target="_blank">点我学习该函数</a>）可以每隔一段时间就执行指定代码。如果我每隔<code>1s</code>就更改下<code>img</code>的类名，如果有<code>active</code>类就删掉，如果没有就加上，这样图片就不断地淡入 → 淡出 → 淡入 →  淡出。</p>
<p>怎么实现多张图片轮流淡入淡出呢？</p>
<p>你每次删掉当前图片的<code>active</code>类（淡出），然后给下一张图片加上<code>active</code>类（淡入），这样就实现了图片的切换。</p>
<p>剩下的就是每隔固定时间间隔，执行切换图片函数就行了。</p>
<p>先上两个效果图。</p>
<p><a href="http://codepen.io/liu_xiao/pen/zoPoqM" rel="nofollow noreferrer" target="_blank">点我跳转CodePen看本文代码最终效果</a><button class="btn btn-xs btn-default ml10 preview" data-url="liu_xiao/pen/zoPoqM" data-typeid="3">点击预览</button>，打开可能有点慢，耐心等等。这个是图片自动轮播，也可以通过图片底部的页码选择图片。</p>
<p><a href="http://codepen.io/liu_xiao/pen/QGOqqa" rel="nofollow noreferrer" target="_blank">点我跳转看稍微变动后的另一种效果</a><button class="btn btn-xs btn-default ml10 preview" data-url="liu_xiao/pen/QGOqqa" data-typeid="3">点击预览</button>（这是仿的京东首页轮播图效果，鼠标滑到图片上时会显示左右按钮框，点击左右按钮框也可实现图片切换。）</p>
<h2 id="articleHeader1">只有图片的轮播</h2>
<p>HTML比较简单，就是一个<code>&lt;div&gt;</code>里面扔三个<code>&lt;img&gt;</code>（假设是三张轮播图哈）。第一张图片已经加上了<code>active</code>类，这样网页加载的时候就会有图片，通过JS来添加<code>active</code>类初始化比较慢，要等JS加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;slideshow&quot;>
  <!-- 插入轮播的图片们 -->
  <img class=&quot;active&quot; src=&quot;http://img.kumi.cn/photo/01/69/30/016930f03d2e34cc.jpg&quot; />
  <img src=&quot;http://image2.sina.com.cn/dongman/pic/chshidzrcji/U1595P55T4D115697F50DT20070406083109.jpeg&quot; />
  <img src=&quot;http://t1.mmonly.cc/uploads/tu/201602/198/qh1spjs3guk.jpg&quot; />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slideshow"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 插入轮播的图片们 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://img.kumi.cn/photo/01/69/30/016930f03d2e34cc.jpg"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://image2.sina.com.cn/dongman/pic/chshidzrcji/U1595P55T4D115697F50DT20070406083109.jpeg"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://t1.mmonly.cc/uploads/tu/201602/198/qh1spjs3guk.jpg"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS如下。设置好<code>&lt;div id="slideshow"&gt;</code>和<code>&lt;img&gt;</code>的尺寸，让<code>&lt;img&gt;</code>重叠在一起，并且<code>opacity</code>为<code>0</code>。而具有<code>active</code>类的<code>&lt;img&gt;</code>的<code>opacity</code>为<code>1</code>。当然，别忘了设置<code>transition: opacity 1s linear;</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
  padding: 0;
  margin: 0;
}
#slideshow{
  width: 800px;  
  height: 350px;
  margin: 0 auto; /*设置在页面水平居中*/
  overflow: hidden;
  position: relative;  
}
#slideshow img{
  width: 800px;
  position: absolute; /*图片采取绝对定位，均位于左上角，重叠在一起*/
  top: 0;
  left: 0;
  opacity: 0; /*初始不透明度为0，图片都看不见*/
  transition: opacity 1s linear; /*--重点--定义一个关于透明度的transition*/
}
#slideshow img.active{
  opacity: 1; /*有active类的图片不透明度为1，即显示图片*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#slideshow</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;  
  <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto; <span class="hljs-comment">/*设置在页面水平居中*/</span>
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">position</span>: relative;  
}
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
  <span class="hljs-attribute">position</span>: absolute; <span class="hljs-comment">/*图片采取绝对定位，均位于左上角，重叠在一起*/</span>
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; <span class="hljs-comment">/*初始不透明度为0，图片都看不见*/</span>
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">1s</span> linear; <span class="hljs-comment">/*--重点--定义一个关于透明度的transition*/</span>
}
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.active</span>{
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; <span class="hljs-comment">/*有active类的图片不透明度为1，即显示图片*/</span>
}</code></pre>
<p>JS如下。在轮播函数<code>slideshow()</code>里，定义了图片淡出函数<code>slideOff()</code>，图片淡入函数<code>slideOn()</code>和切换图片函数<code>changeSlide()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//---------主角：轮播图函数-------------
function slideshow() {
  var slideshow=document.getElementById(&quot;slideshow&quot;),
  imgs=slideshow.getElementsByTagName(&quot;img&quot;), //得到图片们
  current=0; //current为当前活跃的图片编号

  function slideOff() {
    imgs[current].className=&quot;&quot;; //图片淡出
  }
  function slideOn() {
    imgs[current].className=&quot;active&quot;; //图片淡入
  }

  function changeSlide() { //切换图片的函数
    slideOff(); //图片淡出
    current++; //自增1
    if(current>=3) current=0;
    slideOn(); //图片淡入
  }
  
  //每2s调用changeSlide函数进行图片轮播
  var slideon=setInterval(changeSlide,2000);  
}

slideshow();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//---------主角：轮播图函数-------------</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideshow</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> slideshow=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"slideshow"</span>),
  imgs=slideshow.getElementsByTagName(<span class="hljs-string">"img"</span>), <span class="hljs-comment">//得到图片们</span>
  current=<span class="hljs-number">0</span>; <span class="hljs-comment">//current为当前活跃的图片编号</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideOff</span>(<span class="hljs-params"></span>) </span>{
    imgs[current].className=<span class="hljs-string">""</span>; <span class="hljs-comment">//图片淡出</span>
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideOn</span>(<span class="hljs-params"></span>) </span>{
    imgs[current].className=<span class="hljs-string">"active"</span>; <span class="hljs-comment">//图片淡入</span>
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeSlide</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//切换图片的函数</span>
    slideOff(); <span class="hljs-comment">//图片淡出</span>
    current++; <span class="hljs-comment">//自增1</span>
    <span class="hljs-keyword">if</span>(current&gt;=<span class="hljs-number">3</span>) current=<span class="hljs-number">0</span>;
    slideOn(); <span class="hljs-comment">//图片淡入</span>
  }
  
  <span class="hljs-comment">//每2s调用changeSlide函数进行图片轮播</span>
  <span class="hljs-keyword">var</span> slideon=setInterval(changeSlide,<span class="hljs-number">2000</span>);  
}

slideshow();</code></pre>
<p>这里有个问题哦，轮播图一般鼠标移入图片后，轮播就停止了，当鼠标移出后，轮播又开始对吧。我们用JS的<code>onmouseover</code>和<code>onmouseout</code>来实现。</p>
<p>在JS的<code>slideshow()</code>函数中加入以下代码即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="slideshow.onmouseover=function () {
  clearInterval(slideon); //当鼠标移入时清除轮播事件
}
slideshow.onmouseout=function () {
  slideon=setInterval(changeSlide,2000); //当鼠标移出时重新开始轮播事件
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>slideshow.onmouseover=<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  clearInterval(slideon); <span class="hljs-comment">//当鼠标移入时清除轮播事件</span>
}
slideshow.onmouseout=<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  slideon=setInterval(changeSlide,<span class="hljs-number">2000</span>); <span class="hljs-comment">//当鼠标移出时重新开始轮播事件</span>
}</code></pre>
<p>具体效果见<a href="http://codepen.io/liu_xiao/pen/RovNEE" rel="nofollow noreferrer" target="_blank">CodePen链接</a><button class="btn btn-xs btn-default ml10 preview" data-url="liu_xiao/pen/RovNEE" data-typeid="3">点击预览</button>。</p>
<h2 id="articleHeader2">加上页码</h2>
<p>恩，然后我们加上和每张图片相对应的页码，并实现鼠标移上去就会显示相应图片这个功能。</p>
<p>在HTML的<code>&lt;div id="slideshow"&gt;</code>中要添加如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 插入轮播的页码们 -->
<div>
  <span class=&quot;active&quot;>1</span>
  <span>2</span>
  <span>3</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 插入轮播的页码们 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>第一个<code>&lt;span&gt;</code>我也是已经添加了<code>active</code>类。</p>
<p>然后设置页码的样式，让它们位于图片的底部，一字排开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 设置页码的样式 */
#slideshow div{
  width: 100%;
  position: absolute;
  bottom: 10px;
  text-align: center;
}
#slideshow span{
  display: inline-block;
  width: 25px;
  line-height: 25px;  /*当只有一行文本时height等于line-height*/
  border-radius: 25px;  /*设置页码为圆形*/
  margin: 0 15px;  
  background: white;
  font-size: 16px;
}
#slideshow span.active{
  color: white;
  background: #FFDD55;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* 设置页码的样式 */</span>
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">span</span>{
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;  <span class="hljs-comment">/*当只有一行文本时height等于line-height*/</span>
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">25px</span>;  <span class="hljs-comment">/*设置页码为圆形*/</span>
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">15px</span>;  
  <span class="hljs-attribute">background</span>: white;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.active</span>{
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFDD55</span>;
}</code></pre>
<p>在JS中，<code>slideOff()</code>和<code>slideOn()</code>函数都要更新下，因为淡入淡出时<code>&lt;span&gt;</code>的类名也要进行变更。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function slideOff() {
  imgs[current].className=&quot;&quot;; //图片淡出
  pages[current].className=&quot;&quot;;
}
function slideOn() {
  imgs[current].className=&quot;active&quot;; //图片淡入
  pages[current].className=&quot;active&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideOff</span><span class="hljs-params">()</span> </span>{
  imgs[current].className=<span class="hljs-string">""</span>; <span class="hljs-comment">//图片淡出</span>
  pages[current].className=<span class="hljs-string">""</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideOn</span><span class="hljs-params">()</span> </span>{
  imgs[current].className=<span class="hljs-string">"active"</span>; <span class="hljs-comment">//图片淡入</span>
  pages[current].className=<span class="hljs-string">"active"</span>;
}</code></pre>
<p>再就是鼠标移入<code>&lt;span&gt;</code>时，需要显示对应的图片对吧。我们先把当前图片淡出，然后得到当前<code>&lt;span&gt;</code>对应的<code>current</code>，再让图片淡入就好啦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0; i<pages.length; i++) { //定义鼠标移入和移出页码事件
  pages[i].onmouseover=function(){
    slideOff(); //图片淡出
    current=this.innerHTML-1; //得到鼠标停留的页码对应的current
    slideOn(); //图片淡出
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;pages.length; i++) { <span class="hljs-comment">//定义鼠标移入和移出页码事件</span>
  pages[i].onmouseover=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    slideOff(); <span class="hljs-comment">//图片淡出</span>
    current=<span class="hljs-keyword">this</span>.innerHTML<span class="hljs-number">-1</span>; <span class="hljs-comment">//得到鼠标停留的页码对应的current</span>
    slideOn(); <span class="hljs-comment">//图片淡出</span>
  }
}</code></pre>
<p>具体效果见<a href="http://codepen.io/liu_xiao/pen/RovNdv" rel="nofollow noreferrer" target="_blank">CodePen链接</a><button class="btn btn-xs btn-default ml10 preview" data-url="liu_xiao/pen/RovNdv" data-typeid="3">点击预览</button>。</p>
<h2 id="articleHeader3">加上图片描述</h2>
<p>描述文字我设成了横着进入横着出去效果。怎么实现的呢？有点像滑动式的轮播图其实。</p>
<p>文本我设成<code>position: absolute;</code>，然后是不是可以通过更改<code>left</code>值来进行横向移位呢，再结合<code>transition</code>形成动画效果就好啦。</p>
<p>HTML需要增加如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 插入图片的描述们 -->
<p class=&quot;active&quot;>这是第一幅图片哈哈哈</p>
<p>这是第二幅图片咩</p>
<p>到第三幅了！</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 插入图片的描述们 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span>这是第一幅图片哈哈哈<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是第二幅图片咩<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>到第三幅了！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>对文本设置样式。注意看<code>left</code>和<code>transition</code>。<code>left</code>为负值是什么意思呢？<code>left</code>为<code>0</code>就是紧挨着<code>#slideshow</code>左侧对吧，为负的话就是继续往左移越过左侧啦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*-- 设置图片描述文本的样式 --*/
#slideshow p{
  position: absolute;
  top: 30px;
  left: -400px; /*相对于轮播图左侧左移400px*/
  line-height: 30px;
  padding: 5px 30px;
  font-size: 20px;
  color: white;
  background-color: rgba(100,100,100,0.6); /*用rgba设置一个带透明度的背景颜色*/
  opacity: 0;
  transition: all 0.5s;
}
#slideshow p.active{
  left: 0;
  opacity: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*-- 设置图片描述文本的样式 --*/</span>
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">p</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">400px</span>; <span class="hljs-comment">/*相对于轮播图左侧左移400px*/</span>
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(100,100,100,0.6); <span class="hljs-comment">/*用rgba设置一个带透明度的背景颜色*/</span>
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.5s</span>;
}
<span class="hljs-selector-id">#slideshow</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.active</span>{
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>JS很简单，更新下<code>slideOff()</code>和<code>slideOn()</code>函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function slideOff() {
  imgs[current].className=&quot;&quot;; //图片淡出
  pages[current].className=&quot;&quot;;
  descrips[current].className=&quot;&quot;;
}
function slideOn() {
  imgs[current].className=&quot;active&quot;; //图片淡入
  pages[current].className=&quot;active&quot;;
  descrips[current].className=&quot;active&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideOff</span><span class="hljs-params">()</span> </span>{
  imgs[current].className=<span class="hljs-string">""</span>; <span class="hljs-comment">//图片淡出</span>
  pages[current].className=<span class="hljs-string">""</span>;
  descrips[current].className=<span class="hljs-string">""</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slideOn</span><span class="hljs-params">()</span> </span>{
  imgs[current].className=<span class="hljs-string">"active"</span>; <span class="hljs-comment">//图片淡入</span>
  pages[current].className=<span class="hljs-string">"active"</span>;
  descrips[current].className=<span class="hljs-string">"active"</span>;
}</code></pre>
<p>具体效果见<a href="http://codepen.io/liu_xiao/pen/zoPoqM" rel="nofollow noreferrer" target="_blank">CodePen链接</a><button class="btn btn-xs btn-default ml10 preview" data-url="liu_xiao/pen/zoPoqM" data-typeid="3">点击预览</button>。</p>
<h2 id="articleHeader4">还可以完善的几点</h2>
<p>一是，轮播图一般是可以点的链接，所以<code>&lt;img&gt;</code>应该是嵌套在<code>&lt;a&gt;</code>里面的，这里我偷懒了。二是，当鼠标移到<code>&lt;span&gt;</code>的文字上时，光标变成了工字型（<code>cursor: text;</code>），因为光标是默认设置，在文本上时就变了，我们可以在<code>&lt;span&gt;</code>的CSS中设置<code>cursor: Default;</code>，这样就一直是普通的鼠标样式了。三是，<code>&lt;span&gt;</code>的文字如果双击是可以选中的，比较丑，我们加上下面的代码让文本不能被选取就好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*设置不能选择文本*/
-ms-user-select:none;/*IE10*/
-webkit-user-select:none;/*webkit浏览器*/
user-select:none;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-comment">/*设置不能选择文本*/</span>
-ms-user-<span class="hljs-keyword">select</span>:<span class="hljs-keyword">none</span>;<span class="hljs-comment">/*IE10*/</span>
-webkit-user-<span class="hljs-keyword">select</span>:<span class="hljs-keyword">none</span>;<span class="hljs-comment">/*webkit浏览器*/</span>
user-<span class="hljs-keyword">select</span>:<span class="hljs-keyword">none</span>;</code></pre>
<hr>
<p>完。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用CSS3 transition属性实现淡入淡出轮播图

## 原文链接
[https://segmentfault.com/a/1190000007648070](https://segmentfault.com/a/1190000007648070)

