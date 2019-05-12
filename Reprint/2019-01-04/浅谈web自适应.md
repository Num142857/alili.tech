---
title: '浅谈web自适应' 
date: 2019-01-04 2:30:10
hidden: true
slug: 725gmuvor7a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>转自：<a href="http://www.cnblogs.com/constantince/p/5708930.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/consta...</a></p></blockquote>
<blockquote><p>前言</p></blockquote>
<p>随着移动设备的普及，移动web在前端工程师们的工作中占有越来越重要的位置。移动设备更新速度频繁，手机厂商繁多，导致的问题是每一台机器的屏幕宽度和分辨率不一样。这给我们在编写前端界面时增加了困难，适配问题在当下显得越来越突出。记得刚刚开始开发移动端产品的时候向设计MM要了不同屏幕的设计图，结果可想而知。本篇文章分享了一些处理多屏幕自适应的经验，希望有益于各位。<br>特别说明：在开始这一切之前，请开发移动界面的工程师们在头部加上下面这条meta：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-attr">name="viewport"</span> <span class="hljs-attr">content="width=device-width,</span> <span class="hljs-attr">initial-scale=1.0,</span> <span class="hljs-attr">maximum-scale=1.0,</span> <span class="hljs-attr">user-scalable=0"&gt;</span></code></pre>
<p><strong>简单事情简单做-宽度自适应</strong><br>所谓宽度自适应严格来说是一种pc端的自适应布局方式在移动端的延伸。在处理pc端的前端界面时候需要用到全屏布局时采用的就是此种布局方式。它的实现方式也比较简单，将外层容器元素按照百分比铺满的方式，里面的子元素固定或者左右浮动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".div {
  width:100%; height:100px;
}
.child {
  float: left; 
}
.child {
  float:right;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.div</span> {
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">float</span>: left; 
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">float</span>:right;
}</code></pre>
<p>由于父级元素采用百分比的布局方式，随着屏幕的拉伸，它的宽度会无限的拉伸。而子元素由于采用浮动，那么它们的位置也会固定在两端。该宽度自适应在新的时代有了新的方法，随着弹性布局的普及，它经常被flex的伸缩性布局方式替代，变得越来越“弹性”十足。需要了解弹性布局，请前往flex布局教程。</p>
<p><strong>大小之辨-完成自适应</strong></p>
<p>这种解决方案相对前一种来说进步不少，不仅仅宽度实现了自适应，而且界面所有的元素大小和高度都会根据不同的分辨率和屏幕宽度的设备来调整元素、字体、图片、高度等属性的值。简单来说就是在不同的屏幕下，你看到的字体和元素高度的大小是不一样的。在这里，有人就会说利用的是媒体查询属性，根据不同的屏幕宽度，调整样式。我之前也是这样想的，但是你需要考虑到界面上的许多元素需要设置字体，如果用media query为每个元素在不同的设备下都设置不同的属性的话，那么有多少中屏幕我们的css就会增加多少倍。实际上在这里，我们采用的是js和css属性rem来解决这个问题的。<br>REM属性指的是相对于根元素设置某个元素的字体大小。它同时也可以用作为设置高度等一系列可以用px来标注的单位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
 font-size: 10px;
}
div {
 font-size: 1rem;
 height: 2rem;
 width: 3rem;
 border: .1rem solid #000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
 <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">div</span> {
 <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
 <span class="hljs-attribute">height</span>: <span class="hljs-number">2rem</span>;
 <span class="hljs-attribute">width</span>: <span class="hljs-number">3rem</span>;
 <span class="hljs-attribute">border</span>: .<span class="hljs-number">1rem</span> solid <span class="hljs-number">#000</span>;
}</code></pre>
<p>采用以上写法，div继承到了html节点的font-size，为本身定义了一系列样式属性，此时1em计算为10px，即根节点的font-size值。所以，这时div的高度就是20px，宽度是30px，边框是1px，字体大小则是10px；一旦有了这样的方法，我们自然可以根据不同的屏幕宽度设置不同的根节点字体大小。假设我们现在设计的标准是iphone5s，iphone5系列的屏幕分辨率是640。为了统一规范，我们将iphone5 分辨率下的根元素font-size设置为100px;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--iphone5-->
html {
 font-size: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--iphone5--&gt;</span>
html {
 font-size: 100px;
}</code></pre>
<p>那么以此为基准，可以计算出一个比例值6.4。我们可以得知其他手机分辨率的设备下根元素字体大小：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
数据计算公式 640/100 = device-width / x  可以设置其他设备根元素字体大小
ihone5: 640  ： 100
iphone6: 750 : 117
iphone6s: 1240 : 194
*/
var deviceWidth = window.documentElement.clientWidth;
document.documentElement.style.fontSize = (deviceWidth / 6.4) + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">/*
数据计算公式 640/100 = device-width / x  可以设置其他设备根元素字体大小
ihone5: 640  ： 100
iphone6: 750 : 117
iphone6s: 1240 : 194
*/</span>
<span class="hljs-keyword">var</span> deviceWidth = <span class="hljs-built_in">window</span>.documentElement.clientWidth;
<span class="hljs-built_in">document</span>.documentElement.style.fontSize = (deviceWidth / <span class="hljs-number">6.4</span>) + <span class="hljs-string">'px'</span>;</code></pre>
<p>在head中，我们将以上代码加入，动态地改变根节点的font-size值。<br>接下来我们可以根据根元素的字体大小用rem设置各种属性的相对值。当然，如果是移动设备，屏幕会有一个上下限制，我们可以控制分辨率在某个范围内，超过了该范围，我们就不再增加根元素的字体大小了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deviceWidth = document.documentElement.clientWidth > 1300 ? 1300 : document.documentElement.clientWidth;
document.documentElement.style.fontSize = (deviceWidth / 6.4) + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> deviceWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth &gt; <span class="hljs-number">1300</span> ? <span class="hljs-number">1300</span> : <span class="hljs-built_in">document</span>.documentElement.clientWidth;
<span class="hljs-built_in">document</span>.documentElement.style.fontSize = (deviceWidth / <span class="hljs-number">6.4</span>) + <span class="hljs-string">'px'</span>;</code></pre>
<p>一般的情况下，你是不需要考虑屏幕动态地拉伸和收缩。当然，假如用户开启了转屏设置，在网页加载之后改变了屏幕的宽度，那么我们就要考虑这个问题了。解决此问题也很简单，监听屏幕的变化就可以做到动态切换元素样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = function(){
      var deviceWidth = document.documentElement.clientWidth > 1300 ? 1300 : document.documentElement.clientWidth;
      document.documentElement.style.fontSize = (deviceWidth / 6.4) + 'px';
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> deviceWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth &gt; <span class="hljs-number">1300</span> ? <span class="hljs-number">1300</span> : <span class="hljs-built_in">document</span>.documentElement.clientWidth;
      <span class="hljs-built_in">document</span>.documentElement.style.fontSize = (deviceWidth / <span class="hljs-number">6.4</span>) + <span class="hljs-string">'px'</span>;
 };</code></pre>
<p>为了提高性能，让代码开起来更加完美，可以为它加上节流阀函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = _.debounce(function() {
      var deviceWidth = document.documentElement.clientWidth > 1300 ? 1300 : document.documentElement.clientWidth;
      document.documentElement.style.fontSize = (deviceWidth / 6.4) + 'px';
}, 50);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onresize = _.debounce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> deviceWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth &gt; <span class="hljs-number">1300</span> ? <span class="hljs-number">1300</span> : <span class="hljs-built_in">document</span>.documentElement.clientWidth;
      <span class="hljs-built_in">document</span>.documentElement.style.fontSize = (deviceWidth / <span class="hljs-number">6.4</span>) + <span class="hljs-string">'px'</span>;
}, <span class="hljs-number">50</span>);</code></pre>
<p>顺带解决高保真标注与实际开发值比例问题<br>如果你们设计稿标准是iphone5，那么拿到设计稿的时候一定会发现，完全不能按照高保真上的标注来写css，而是将各个值取半，这是因为移动设备分辨率不一样。设计师们是在真实的iphone5机器上做的标注，而iphone5系列的分辨率是640，实际上我们在开发只需要按照320的标准来。为了节省时间，不至于每次都需要将标注取半，我们可以将整个网页缩放比例，模拟提高分辨率。这个做法很简单，为不同的设备设置不同的meta即可:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scale = 1 / devicePixelRatio;
document.querySelector('meta[name=&quot;viewport&quot;]').setAttribute('content', 'initial-scal" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> scale = <span class="hljs-number">1</span> / devicePixelRatio;
<span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'meta[name="viewport"]'</span>).setAttribute(<span class="hljs-string">'content'</span>, <span class="hljs-string">'initial-scal</span></code></pre>
<p>这样设置同样可以解决在安卓机器下1px像素看起来过粗的问题，因为在像素为1px的安卓下机器下，边框的1px被压缩成了0.5px了。总之是一劳永逸！淘宝和网易新闻的手机web端就是采用以上这种方式，自适应各种设备屏幕的，大家有兴趣可以去参考参考。下面是完整的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <title>测试</title>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width,user-scalable=no,maximum-scale=1&quot; />
  <script type=&quot;text/javascript&quot;>
(function() {
  // deicePixelRatio ：设备像素
  var scale = 1 / devicePixelRatio;
  //设置meta 压缩界面 模拟设备的高分辨率
  document.querySelector('meta[name=&quot;viewport&quot;]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  //debounce 为节流函数，自己实现。或者引入underscore即可。
  var reSize = _.debounce(function() {
      var deviceWidth = document.documentElement.clientWidth > 1300 ? 1300 : document.documentElement.clientWidth;
      //按照640像素下字体为100px的标准来，得到一个字体缩放比例值 6.4
      document.documentElement.style.fontSize = (deviceWidth / 6.4) + 'px';
  }, 50);
 
  window.onresize = reSize;
})();
  </script>
  <style type=&quot;text/css&quot;>
    html {
      height: 100%;
      width: 100%;
      overflow: hidden;
      font-size: 16px;
    }
 
    div {
      height: 0.5rem;
      widows: 0.5rem;
      border: 0.01rem solid #19a39e;
    }
 
    ........
  </style>
  <body>
    <div>
    </div>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>测试<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,user-scalable=no,maximum-scale=1"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// deicePixelRatio ：设备像素</span>
  <span class="hljs-keyword">var</span> scale = <span class="hljs-number">1</span> / devicePixelRatio;
  <span class="hljs-comment">//设置meta 压缩界面 模拟设备的高分辨率</span>
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'meta[name="viewport"]'</span>).setAttribute(<span class="hljs-string">'content'</span>, <span class="hljs-string">'initial-scale='</span> + scale + <span class="hljs-string">', maximum-scale='</span> + scale + <span class="hljs-string">', minimum-scale='</span> + scale + <span class="hljs-string">', user-scalable=no'</span>);
  <span class="hljs-comment">//debounce 为节流函数，自己实现。或者引入underscore即可。</span>
  <span class="hljs-keyword">var</span> reSize = _.debounce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> deviceWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth &gt; <span class="hljs-number">1300</span> ? <span class="hljs-number">1300</span> : <span class="hljs-built_in">document</span>.documentElement.clientWidth;
      <span class="hljs-comment">//按照640像素下字体为100px的标准来，得到一个字体缩放比例值 6.4</span>
      <span class="hljs-built_in">document</span>.documentElement.style.fontSize = (deviceWidth / <span class="hljs-number">6.4</span>) + <span class="hljs-string">'px'</span>;
  }, <span class="hljs-number">50</span>);
 
  <span class="hljs-built_in">window</span>.onresize = reSize;
})();
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span> {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">overflow</span>: hidden;
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    }
 
    <span class="hljs-selector-tag">div</span> {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">0.5rem</span>;
      <span class="hljs-attribute">widows</span>: <span class="hljs-number">0.5rem</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">0.01rem</span> solid <span class="hljs-number">#19a39e</span>;
    }
 
    ........
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>让元素飞起来-媒体查询 <br>运用css新属性media query 特性也可以实现我们上说到过的布局样式。为尺寸设置根元素字体大小:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen and (device-width: 640px) { /*iphone4/iphon5*/
    html {
        font-size: 100px;
      }
    }
 
@media screen and (device-width: 750px) { /*iphone6*/
    html {
        font-size: 117.188px;
      }
    }
    @media screen and (device-width: 1240px) { /*iphone6s*/
      html {
        font-size: 194.063px;
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">media</span> screen and (device-width: <span class="hljs-number">640px</span>) { <span class="hljs-comment">/*iphone4/iphon5*/</span>
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
      }
    }
 
@<span class="hljs-keyword">media</span> screen and (device-width: <span class="hljs-number">750px</span>) { <span class="hljs-comment">/*iphone6*/</span>
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">117.188px</span>;
      }
    }
    @<span class="hljs-keyword">media</span> screen and (device-width: <span class="hljs-number">1240px</span>) { <span class="hljs-comment">/*iphone6s*/</span>
      <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">194.063px</span>;
      }
    }</code></pre>
<p>这种方式也是可行的，缺点是灵活性不高，取每个设备的精确值需要自己去计算，所以只能取范围值。考虑设备屏幕众多，分辨率也参差不齐，把每一种机型的css代码写出来是不太可能的。但是它也有优点，就是无需监听浏览器的窗口变化，它会跟随屏幕动态变化。媒体查询的用法当然不仅仅像在此处这么简单，相对于第二种自适应来说有很多地方是前者所远远不及的。最明显的就是它可以根据不同设备显示不同的布局样式！请注意，这里已经不是改变字体和高度那么简单了，它直接改变的是布局样式！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen and (min-width: 320px) and (max-width: 650px) { /*手机*/
  .class {
    float: left;
  }
}
 
@media screen and (min-width: 650px) and (max-width: 980px) { /*pad*/
  .class {
    float: right;
  }
}
 
@media screen and (min-width: 980px)  and (max-width: 1240px) { /*pc*/
  .class {
    float: clear;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">320px</span>) and (max-width: <span class="hljs-number">650px</span>) { <span class="hljs-comment">/*手机*/</span>
  <span class="hljs-selector-class">.class</span> {
    <span class="hljs-attribute">float</span>: left;
  }
}
 
@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">650px</span>) and (max-width: <span class="hljs-number">980px</span>) { <span class="hljs-comment">/*pad*/</span>
  <span class="hljs-selector-class">.class</span> {
    <span class="hljs-attribute">float</span>: right;
  }
}
 
@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">980px</span>)  and (max-width: <span class="hljs-number">1240px</span>) { <span class="hljs-comment">/*pc*/</span>
  <span class="hljs-selector-class">.class</span> {
    <span class="hljs-attribute">float</span>: clear;
  }
}</code></pre>
<p>此种自适应布局一般常用在兼容PC和手机设备，由于屏幕跨度很大，界面的元素以及远远不是改改大小所能满足的。这时候需要重新设计整界面的布局和排版了。<br>许多css框架经常用到这样的多端解决方案，著名的bootstrap就是采用此种方式进行栅格布局的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈web自适应

## 原文链接
[https://segmentfault.com/a/1190000010660312](https://segmentfault.com/a/1190000010660312)

