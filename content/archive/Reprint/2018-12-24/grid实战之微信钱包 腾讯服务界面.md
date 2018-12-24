---
title: 'grid实战之微信钱包 腾讯服务界面' 
date: 2018-12-24 2:30:07
hidden: true
slug: 1mdzfeo3puy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">网格布局简介</h2>
<p>CSS3网格布局是让开发人员设计一个网格并将内容放在这些网格内。而不是使用浮动制作一个网格，实际上是你将一个元素声明为一个网格容器，并把元素内容置于网格中。</p>
<p>有一些浏览器是不支持网格布局的，可以从<a href="https://caniuse.com/#" rel="nofollow noreferrer" target="_blank">caniuse</a>这个网站查看各个浏览器是否支持这些css3中的新属性,绿色表示支持，红色表示不支持，另一种颜色表示部分支持，如图（查看各个浏览器是否支持grid布局）：</p>
<p><span class="img-wrap"><img data-src="/img/bVZm0H?w=955&amp;h=590" src="https://static.alili.tech/img/bVZm0H?w=955&amp;h=590" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过下面这张图片可以了解网格布局的基本概念</p>
<p><span class="img-wrap"><img data-src="/img/bVZndn?w=900&amp;h=650" src="https://static.alili.tech/img/bVZndn?w=900&amp;h=650" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>先来个表情包happy一下吧哈哈哈</p>
<p><span class="img-wrap"><img data-src="/img/bVZne4?w=690&amp;h=457" src="https://static.alili.tech/img/bVZne4?w=690&amp;h=457" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">代码部分</h2>
<p>页面布局：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>WEUI GRID</title>
  <script src=&quot;http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js&quot;></script>
  <link rel=&quot;stylesheet&quot; href=&quot;./static/css/common.css&quot;>
  <link rel=&quot;stylesheet&quot; href=&quot;./static/css/grid.css&quot;>
  <link rel=&quot;stylesheet&quot; href=&quot;./static/css/iconfont.css&quot;>
</head>
<body>
  <div class=&quot;container&quot;>
        <div class=&quot;page__hd&quot;>
          <p class=&quot;page__title&quot;>腾讯服务</p>
        </div>
      <!-- 九宫格 start-->
      <div class=&quot;grids&quot;>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
              <i class=&quot;iconfont icon-xinyongkahuankuan&quot;></i>
              <p class=&quot;grid__label&quot;>信用卡还款</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-jieqian&quot;></i>
              <p class=&quot;grid__label&quot;>微粒贷借钱</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-dibugeicon_jieqian&quot;></i>
              <p class=&quot;grid__label&quot;>手机充值</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-licaitong&quot;></i>
              <p class=&quot;grid__label&quot;>理财通</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-shenghuojiaofei&quot;></i>
              <p class=&quot;grid__label&quot;>生活缴费</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-qq&quot;></i>
              <p class=&quot;grid__label&quot;>Q币充值</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-chengshifuwu&quot;></i>
              <p class=&quot;grid__label&quot;>城市服务</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;>
                <i class=&quot;iconfont icon-love&quot;></i>
              <p class=&quot;grid__label&quot;>腾讯公益</p>
          </a>
          <a href=&quot;#&quot; class=&quot;grid&quot;></a>
      </div>
      <!-- 九宫格 end -->
    </div>
  </div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>WEUI GRID<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./static/css/common.css"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./static/css/grid.css"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./static/css/iconfont.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__title"</span>&gt;</span>腾讯服务<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 九宫格 start--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grids"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-xinyongkahuankuan"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>信用卡还款<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-jieqian"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>微粒贷借钱<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-dibugeicon_jieqian"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>手机充值<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-licaitong"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>理财通<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-shenghuojiaofei"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>生活缴费<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-qq"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>Q币充值<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-chengshifuwu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>城市服务<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-love"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid__label"</span>&gt;</span>腾讯公益<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 九宫格 end --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>公共样式css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    margin: 0;
    padding: 0;
  }

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  line-height: 1.6;
  background-color: #EFEFF4;
}
.container{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0.37037037rem;
}
.page__hd {
  padding: 10px;
}
.page__title {
  text-align: left;
  color: #716F76;
}
.grids {
  display: grid;
  grid-template-columns: repeat(3,3.33333333rem);
  grid-template-rows: repeat(3,3.33333333rem);
}
.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  background-color: #FFFFFF;
  color: #707070;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>* {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  }

<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">overflow-x</span>: hidden;
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.6</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EFEFF4</span>;
}
<span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.37037037rem</span>;
}
<span class="hljs-selector-class">.page__hd</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.page__title</span> {
  <span class="hljs-attribute">text-align</span>: left;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#716F76</span>;
}
<span class="hljs-selector-class">.grids</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3,3.33333333rem);
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">repeat</span>(3,3.33333333rem);
}
<span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">flex-direction</span>: column;
  <span class="hljs-attribute">text-decoration</span>: none;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFFFFF</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#707070</span>;
}
</code></pre>
<p>在grids中设置网格布局，display:grid;grid-template-columns属性设置网格布局中每列的宽度，grid-template-rows属性设置网格布局中每行的高度，由于在head中导入了淘宝的flexible，所以设置宽高时用了相对单位rem，grid-template-columns: repeat(3,3.33333333rem)相当于grid-template-columns: 3.33333333rem 3.33333333rem 3.33333333rem,grid-template-rows: repeat(3,3.33333333rem)同理；</p>
<p>在微信的界面中是有“边框的”，这里用了伪元素来实现<br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* author: 倪子红
date: 17-11-28 */
.grids {
    position: relative;
    overflow: hidden;
}
.grids:before {
   content: &quot;&quot;;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 1px;
   border-top: 1px solid #E5E5E5;
   /* 1px 问题 retina 手机 1px很粗*/
   /* -webkit-transform: scaleY(0.5);
   transform: scaleY(0.5);
   -webkit-transform-origin: 0 0;
   transform-origin: 0 0; */
}
.grids:after {
    content: &quot;&quot;;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #E5E5E5;
 }
 .grid {
     position: relative;
     float: left;
     padding: 20px 10px;
     box-sizing: border-box;
 }
 .grid:before {
     content: &quot;&quot;;
     position: absolute;
     right: 0;
     top: 0;
     bottom: 0;
     width: 1px;
     border-right: 1px solid #E5E5E5;
 }
 .grid:after {
    content: &quot;&quot;;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #E5E5E5;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* author: 倪子红
date: 17-11-28 */</span>
<span class="hljs-selector-class">.grids</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.grids</span><span class="hljs-selector-pseudo">:before</span> {
   <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
   <span class="hljs-attribute">position</span>: absolute;
   <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
   <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
   <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
   <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
   <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#E5E5E5</span>;
   <span class="hljs-comment">/* 1px 问题 retina 手机 1px很粗*/</span>
   <span class="hljs-comment">/* -webkit-transform: scaleY(0.5);
   transform: scaleY(0.5);
   -webkit-transform-origin: 0 0;
   transform-origin: 0 0; */</span>
}
<span class="hljs-selector-class">.grids</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#E5E5E5</span>;
 }
 <span class="hljs-selector-class">.grid</span> {
     <span class="hljs-attribute">position</span>: relative;
     <span class="hljs-attribute">float</span>: left;
     <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">10px</span>;
     <span class="hljs-attribute">box-sizing</span>: border-box;
 }
 <span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">:before</span> {
     <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
     <span class="hljs-attribute">position</span>: absolute;
     <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
     <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
     <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
     <span class="hljs-attribute">width</span>: <span class="hljs-number">1px</span>;
     <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#E5E5E5</span>;
 }
 <span class="hljs-selector-class">.grid</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#E5E5E5</span>;
}</code></pre>
<p>有的手机存在“1px问题”，可以通过transform和transform-origin属性来解决这个问题</p>
<p>我的所有图标是从<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a>这个网站得到的，下面也放出图标的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@font-face {font-family: &quot;iconfont&quot;;
  src: url('../iconfont.eot?t=1511887164151'); /* IE9*/
  src: url('../iconfont.eot?t=1511887164151#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('../iconfont.ttf?t=1511887164151') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../iconfont.svg?t=1511887164151#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:&quot;iconfont&quot; !important;
  font-size: 0.78703704rem;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-xinyongkahuankuan {
  color: #00B25E;
}
.icon-qq {
  color: #47A6DF;
}
.icon-love {
  color: #EC6066;
}
.icon-shenghuojiaofei {
  color: #00B25E;
}
.icon-chengshifuwu {
  color: #00B25E;
}
.icon-licaitong {
  color: #439DD1;
}
.icon-dibugeicon_jieqian {
  color: #588DB4;
}
.icon-jieqian {
  color: #D5912B;
}

.icon-xinyongkahuankuan:before { content: &quot;\e621&quot;; }

.icon-qq:before { content: &quot;\e61e&quot;; }

.icon-dibugeicon_jieqian:before { content: &quot;\e633&quot;; }

.icon-love:before { content: &quot;\e612&quot;; }

.icon-shenghuojiaofei:before { content: &quot;\e609&quot;; }

.icon-chengshifuwu:before { content: &quot;\e60a&quot;; }

.icon-licaitong:before { content: &quot;\e60b&quot;; }

.icon-jieqian:before { content: &quot;\e60c&quot;; }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
@<span class="hljs-keyword">font-face</span> {<span class="hljs-attribute">font-family</span>: <span class="hljs-string">"iconfont"</span>;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../iconfont.eot?t=1511887164151'</span>); <span class="hljs-comment">/* IE9*/</span>
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../iconfont.eot?t=1511887164151#iefix'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'embedded-opentype'</span>), <span class="hljs-comment">/* IE6-IE8 */</span>
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAsgAAsAAAAADwAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW8kgqY21hcAAAAYAAAACXAAACCGdFARRnbHlmAAACGAAABqIAAAfck5S57mhlYWQAAAi8AAAAMQAAADYPqqh4aGhlYQAACPAAAAAgAAAAJAfjA4NobXR4AAAJEAAAABoAAAAoJ+r/+WxvY2EAAAksAAAAFgAAABYLhAjubWF4cAAACUQAAAAdAAAAIAEcAI9uYW1lAAAJZAAAAUUAAAJtPlT+fXBvc3QAAAqsAAAAdAAAAJggGtG0eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sc4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDwzZm7438AQw9zO0AIUZgTJAQApiAyweJzFkTEOwyAQBJdASHCQC8u1Jffp/Ju8hCJ1qrxzv+EsHFLkF3jRIO1J3KE9AFcAXjxFANwXDlUfVV2rewytHvCSH3HHBRGFmRMXrtz2XfXCdPB/Ob0ZMfdTfcRNXZJme/WqUyNOkztv9FG53e/ukigdfZHJUHbgYChF8GEoTzAb9S0no+6Xi1H3zNVQ7uBmIPwAwqQjpAB4nE1Ua2wcVxW+59557Wt2Z2Z3HuvdnZ2dnRl7bW+8790kXruu28SOiV25ThU3CS5JbNEXgVYkbdxigkpSgVBQqkIRD4FCE9oIgUoTJFpQ1f4JAgECidYgBZQIIQFCFeJRyV5zry0kRnOPzpx7z5l7vvt9F/EIbf2RvEFMpKF+VEGTaA4hEAahIOMsOEG9jAch5fApIymTwA0c0S2UySgYBSGpV5t13xBEIQ4y5KDmVJtBGQfQqHfxHqjqWQCrLz2vehmVXISwGeSe603jb0HKdjPx7nBvamgsWc1r0umoqlqq+nlJ4HkJYy4uw2OGHuJDYaF3mY+nU2/YA9iGqBWkZw7H8n3qQxfqj2c9IwSwtgZaX16+MqakFfqupnVNtcRETDLTMbeYhNN3IqYWzfq3EX2AGfJn/DYq0I9mq1Fv6TbotAOnkFKSOmugodT9wJEhC0kD/0EEgeBXCYC0cUFyLLJoOY618bLlSLgMoiIBwCXMiyD1rrMZvMt0ABxzXtz+FabYrpJfkfOojc4hxLuCH7gyBELgB36z5QfUL0Or0YUW/eyC0dSNHIg5MHQKqh8I1BWp59VY3NCbDbo3mrC9Vjco2BD4raYv+g26G5+upMbQRZlmGc0WraazSgUhC4Jeo39p4h8r8U+UxP5T8mrFIJDPanElSOVkHGn0c2ZMe29x8T1VNrn+RgQLrj6gxLWcDcQY6r2TlyVtoTDXrfBRSfRNwQmploQjFS8MfBLHU7dN87YOcazxEPYqYSxZSsgRrH5JivEVPHafs6CG1sDyPAu4ip4v7FZytm4J0Q85XHul1BmN3rwoiF+8GR3tlFbawvGUaJp2TtldsPXyExA2TLrbhFcA3oq0x+MkZpt2vrboheS9/SAm1o+EQw+uJyRc2hMLFx+s2bZlx0h8vB2x+EKRyHliGmFE6HmscYisoQgy0DTjORJ1ZDRRy0eEgkkhojjLQNxGjXF7kEJW9wtxCjOluw0uI/0eSNFDTOpGLZWDKmURRbbuY7Teu8Xz4Kyvg8PzvVvrr7/P8++/vm2lc+dU01TPrMT6nNjSUszpi62cYZGd+DkwiyYwl6yxzP+rtLH4vxrUwtKEWbSWZSfNiqQdedkqmhPbyR3VstQOcynvuG2ev4J/jfJoF+2TKbq5TYUu7UQQKVlkYIxi/NnmSRd4XWDtU+rUWURsMhpRgoqMqE2WS1ulid3t3C7gfPlQKtEajprOXcuhgRMdP6P2f2Fm8Wp31PxI5+ND2j1wg5zt8kYo7akpo//4N++/O+9dfaDPFAwrc+/KQXckf2CVI/t3hbIXCrpdGMQ/DfWX9j3XrD1RLj025rXjiRlv7tFBbeHe6TcdxfOHJqem6jimhHFRzlQSWeHp2PP7FsZUc59bmMt1Lvn+fPbIbKUty/HroQmDf2hbf2vkNfIsyiCXnTbTE22Jta1S3QQCZigwYfieWBNbbouUqvG7hzLF733qmauZ5LWvJ2Xztd9oxs2X//6Wpt7VO3ns4uSPvnQM7435k9+fXXoBZ84/ex5C5/y91rXed7/9tSt67LeffPgH5Q++c+tthKStja3rHEemkY08NIj2oQNoFs2jBxDy6B60QCS7oEYCdn2yIQpM5zWHyhtaBp0jhuaLLXAKO7Ifw1T3tWatqts4hwURaim3RQdloivSQbb4agk+dhg8gcfXvgLdj5p+san0KTl10MAfiOOTvb+NH4LI5/76FMx8GeDnm2kclVJRJZpd5pLLVaIk9i8kxX/kA6E41DtcrS5Xq3empmB6+sX6rAHFyU7vDiThwsMn/xQ6cQpwwW49P9KX5XKnMR6o9/7JEfjZdO8vx2PvbHZC0cKHXQtIfnU/wbOHslykPjNn4meq1epBvWEgsrW59QInkSfp3dhBExSRJmuSvuz+yzGiMTIyUHxGzC4jo1tm1tgh745Y6cm5TIZUpgL5RSqcGf7MkegNTfwJhTTbp6UhEW2+9OiTPxyBx0+ZETHXTkvt4Tgn1dJh7T+/e+n3I05FVTObVw7ByHSlMj3y1iM3Dj51yQ7JJw9eFsdnzyRwmz/bPnCYS3z1zWM3HwlGrVKV56S5/dzo5aVXfpmOnf10OEjru1/1KpWpSmVHexzC76IQiiEFDSOkpWoNR3FTNQUcxTHo8IxWreG2AtENRINOGK0UtXQZjT7dJWH76AaQz24wd+Nf8A2OmywFbiPeKfR7E5xw9Ghpdha/e8LvzY3h4c05PNDtzf8bSwNd/f77zM4Azw3RBSX0Xwy6dskAAHicY2BkYGAAYua5pWXx/DZfGbhZGEDgmvMmGxj9/8//GhYO5nYgl4OBCSQKACz6C2AAAAB4nGNgZGBgbvjfwBDDwvD/z/8fLBwMQBEUwAUAoHYGbXicY2FgYGB+ycDAwoAN//8DxH9BbABBDAUIAAAAAAAAAHYArgF2AeoCbgKuAzwDqAPuAAB4nGNgZGBg4GJoZuBgAAEmMI8LSP4H8xkAFtsBrAAAAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nG2MwQrCMBBEd2K1NgpCf1DSmCZbyy6hRtu/N6JHH8xheMyQoS+W/mNhsEODPQ5ocUQHixNh7VeWTSVmdqk4udeYnPsbDyUG9irXiUOV0sz6DJclBYmp6MROx8Bn/+lL4rG8Sjezd/yoZ+1vQ/QGMvkkpg=='</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>),
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'../iconfont.ttf?t=1511887164151'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>), <span class="hljs-comment">/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/</span>
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'../iconfont.svg?t=1511887164151#iconfont'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'svg'</span>); <span class="hljs-comment">/* iOS 4.1- */</span>
}

<span class="hljs-selector-class">.iconfont</span> {
  <span class="hljs-attribute">font-family</span>:<span class="hljs-string">"iconfont"</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.78703704rem</span>;
  <span class="hljs-attribute">font-style</span>:normal;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}
<span class="hljs-selector-class">.icon-xinyongkahuankuan</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#00B25E</span>;
}
<span class="hljs-selector-class">.icon-qq</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#47A6DF</span>;
}
<span class="hljs-selector-class">.icon-love</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#EC6066</span>;
}
<span class="hljs-selector-class">.icon-shenghuojiaofei</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#00B25E</span>;
}
<span class="hljs-selector-class">.icon-chengshifuwu</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#00B25E</span>;
}
<span class="hljs-selector-class">.icon-licaitong</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#439DD1</span>;
}
<span class="hljs-selector-class">.icon-dibugeicon_jieqian</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#588DB4</span>;
}
<span class="hljs-selector-class">.icon-jieqian</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#D5912B</span>;
}

<span class="hljs-selector-class">.icon-xinyongkahuankuan</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e621"</span>; }

<span class="hljs-selector-class">.icon-qq</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e61e"</span>; }

<span class="hljs-selector-class">.icon-dibugeicon_jieqian</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e633"</span>; }

<span class="hljs-selector-class">.icon-love</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e612"</span>; }

<span class="hljs-selector-class">.icon-shenghuojiaofei</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e609"</span>; }

<span class="hljs-selector-class">.icon-chengshifuwu</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e60a"</span>; }

<span class="hljs-selector-class">.icon-licaitong</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e60b"</span>; }

<span class="hljs-selector-class">.icon-jieqian</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e60c"</span>; }

</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVZner?w=282&amp;h=506" src="https://static.alili.tech/img/bVZner?w=282&amp;h=506" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果有错误或者不理解的地方，希望可以指出和交流，谢谢！<br><span class="img-wrap"><img data-src="/img/bVZneH?w=240&amp;h=226" src="https://static.alili.tech/img/bVZneH?w=240&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
grid实战之微信钱包 腾讯服务界面

## 原文链接
[https://segmentfault.com/a/1190000012205007](https://segmentfault.com/a/1190000012205007)

