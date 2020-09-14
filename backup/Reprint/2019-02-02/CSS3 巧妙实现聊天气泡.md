---
title: 'CSS3 巧妙实现聊天气泡' 
date: 2019-02-02 2:30:11
hidden: true
slug: dc9tmbt89lc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVEcKn?w=4136&amp;h=1956" src="https://static.alili.tech/img/bVEcKn?w=4136&amp;h=1956" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>前一阵子敢玩的 Mobile 页改版完成了，就之前的页面风格更加扁平化，从暗色系为主背景转到亮色背景，去掉更多的阴影，给用户简约的体验风格，哈哈我不是设计师不过多评价啦。感兴趣的朋友可以直接去 <a href="https://mobile.idarex.com/" rel="nofollow noreferrer" target="_blank">idarex移动端主页</a>。</p>
<p>这次改版的所有 style 都是 orange 写的，感触颇多，分期分享给大家</p>
<p>下面说正题，说好的聊天气泡呢？</p>
<h2 id="articleHeader0">传统的聊天气泡</h2>
<p>什么又是传统的聊天气泡,直接上图</p>
<p><span class="img-wrap"><img data-src="/img/bVEcJ1?w=1096&amp;h=264" src="https://static.alili.tech/img/bVEcJ1?w=1096&amp;h=264" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;comment&quot;></div>

<style type=&quot;text/css&quot;>
  .comment {
    width: 150px;
    height: 35px;
    position: relative;
    margin: 30px auto 0;
    background: #f8ac09;
    border-radius: 5px;
  }

  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    right: -16px;
    border: solid 8px;
    border-color: transparent transparent transparent #f8ac09;
    font-size: 0;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.comment</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f8ac09</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  }

  <span class="hljs-selector-class">.comment</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">16px</span>;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">border-color</span>: transparent transparent transparent <span class="hljs-number">#f8ac09</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>实现方式大家早有耳闻，圆角矩形和三角形嘛，三角形原理就是 border 可以设置为透明，可以复制上例中的代码修改 <code>border-color</code> 属性摸索三角形的实现。</p>
<blockquote>注：IE8 更早版本对 border 的 transparent 支持不是很好。大家可以无视低版本缺陷，因为大部分浏览器都显示正常，非要兼容的话把 transparent 属性设置为主背景色而不是气泡背景色（前提是背景为纯色）。</blockquote>
<p>想必大家都知道，这里不赘述，聊一聊其他实现方法。</p>
<p>这里的三角形部分可以使用正方形代替，实现同样效果，方法就是旋转小正方形使其一部分露在外面。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".comment {
  position: relative;
  width: 150px;
  height: 35px;
  background: #f8ac09;
  border-radius: 5px;
  margin: 30px auto 0;
}

.comment:after {
  content: '';
  position:absolute;
  top: 10px;
  right: -4px;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color: #f8ac09;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.comment</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f8ac09</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.comment</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">4px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f8ac09</span>;
}</code></pre>
<p>缺点是小三角只能是直角三角形，当然也可以通过变换得到菱形再进行拼接，变换多了感觉没有第一种方式直接，浏览器兼容 transform(2D) 属性如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEcKp?w=5048&amp;h=1108" src="https://static.alili.tech/img/bVEcKp?w=5048&amp;h=1108" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>总体还不错，几种方法都能放心使用，不存在大的兼容问题。</p>
<h2 id="articleHeader1">现实案例</h2>
<p>这里的设计稿多了一个边框，直接上设计稿</p>
<p><span class="img-wrap"><img data-src="/img/bVEcKq?w=3012&amp;h=2976" src="https://static.alili.tech/img/bVEcKq?w=3012&amp;h=2976" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>?️ 想一想怎么处理，我们回顾上文</p>
<p>第一种方式本身就是 <code>border</code> 透明，怎么再给它设置 <code>border</code> 是个问题，暂且先不考虑。</p>
<p>第二种方式如果使用小正方形旋转，层级叠加是个问题，因为设计稿中的气泡背景为 <code>rgba(247, 188, 10, 0.03)</code> 先看下实现代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".comment {
  width: 150px;
  height: 35px;
  position:relative;
  margin: 30px auto 0;
  background-color: rgba(247, 188, 10, 0.03);
  border: 1px solid rgba(252, 185, 8, 0.35);
  border-radius: 5px;
}

.comment:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: 10px;
  right: -4px;
  transform: rotate(45deg);
  background-color: rgba(247, 188, 10, 0.03);
  border: 1px solid rgba(252, 185, 8, 0.35);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.comment</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">position</span>:relative;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(247, 188, 10, 0.03);
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgba</span>(252, 185, 8, 0.35);
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
}

<span class="hljs-selector-class">.comment</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">4px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(247, 188, 10, 0.03);
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgba</span>(252, 185, 8, 0.35);
}</code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEcJ2?w=1128&amp;h=268" src="https://static.alili.tech/img/bVEcJ2?w=1128&amp;h=268" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上面的思路有问题，因为小正方形与气泡的一部分会重合，半透明背景的部分总会出现问题，有人说了偷个懒总可以吧，把透明后的背景色吸取出来然后再进行叠加（因为大家注意到设计稿的整体背景是纯色）</p>
<p>按着这个思路去实现，那么问题又来了。具体两个问题如下。</p>
<p>1.如果小正方形叠加在上，那么小正方形左半部分的边框就会显示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".comment {
  width: 150px;
  height: 35px;
  position: relative;
  margin: 30px auto 0;
  background-color: #faf8f3;
  border: 1px solid #fbe2a0;
  border-radius: 5px;
}

.comment:after {
  content: '';
  width: 8px;
  height: 8px;
  position:absolute;
  top: 10px;
  right: -4px;
  transform: rotate(45deg);
  background-color: #faf8f3;
  border: 1px solid #fbe2a0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.comment</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#faf8f3</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#fbe2a0</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
}

<span class="hljs-selector-class">.comment</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">4px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#faf8f3</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#fbe2a0</span>;
}</code></pre>
<p>效果如下，比较之前的图片圆角矩形的右边确实遮住了，但小正方形左边的边框显示出来了</p>
<p><span class="img-wrap"><img data-src="/img/bVEcJ3?w=900&amp;h=300" src="https://static.alili.tech/img/bVEcJ3?w=900&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>处理方式呢，可以这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".comment:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: 10px;
  right: -5px;
  transform: rotate(45deg);
  background-color: #faf8f3;
  border: 1px #fbe2a0;
  border-style: solid solid none none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.comment</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">5px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#faf8f3</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> <span class="hljs-number">#fbe2a0</span>;
  <span class="hljs-attribute">border-style</span>: solid solid none none;
}</code></pre>
<p>我们发现问题解决了。效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEcJ4?w=852&amp;h=272" src="https://static.alili.tech/img/bVEcJ4?w=852&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>设计稿是有 <code>padding</code> 的，亲测本案例中可行，但是本着认真的原则 <code>padding-right</code> 如果过小，会出现什么问题呢？</p>
<p>我们向 div 中加文字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;comment&quot;>Hello,orange.Welcome to FrontEnd World!</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>Hello,orange.Welcome to FrontEnd World!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEcKo?w=1012&amp;h=264" src="https://static.alili.tech/img/bVEcKo?w=1012&amp;h=264" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们发现字母 o 的右下角被小正方形左侧覆盖了，当然可以通过 <code>z-index</code> 属性 hack。</p>
<p>2.如果小正方形在圆角矩形下，那么圆角矩形的右边框就会完整显示，大家自行脑补，此方案不合理，不过多解释。</p>
<p>以上的方法缺点也都很明显，那怎么做才能更严谨，能根据需求的变化不大伤筋骨呢？</p>
<p>我们还用三角形的方案！ what? 不是说三角形的方案不可行了嘛 ？</p>
<p>一个三角形是不可行那两个呢，我们有请 <code>after</code> 的兄弟 <code>before</code> 出场。项目的真实代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".reply {
  position: relative;
  margin: 0.672rem 0 0.096rem 0;
  padding: 0.408rem 0.816rem;

  border: 1px solid rgba(#fcb908, 0.35);
  border-radius: 0.2rem;
  background-color: rgba(#f7bc0a, 0.03);

  &amp;:after {
    content: '';
    width: 0px;
    height: 0px;
    border-color:  transparent transparent #faf8f3 transparent ;
    border-style: solid;
    border-width: 6px;
    position: absolute;
    top: -11px;
    border-radius: 3px;
    left: 18px;
    right: auto;
  }

  &amp;:before {
    content: '';
    width: 0px;
    height: 0px;
    border-color: transparent transparent rgba(#fcb908, 0.35) transparent;
    border-style: solid;
    border-width: 7px;
    position: absolute;
    top: -14px;
    border-radius: 3px;
    left: 17px;
    right: auto;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.reply</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.672rem</span> <span class="hljs-number">0</span> <span class="hljs-number">0.096rem</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.408rem</span> <span class="hljs-number">0.816rem</span>;

  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid rgba(<span class="hljs-number">#fcb908</span>, <span class="hljs-number">0.35</span>);
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.2rem</span>;
  <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">#f7bc0a</span>, <span class="hljs-number">0.03</span>);

  &amp;:after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">border-color</span>:  transparent transparent <span class="hljs-number">#faf8f3</span> transparent ;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">6px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">11px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">18px</span>;
    <span class="hljs-attribute">right</span>: auto;
  }

  &amp;:before {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">border-color</span>: transparent transparent rgba(<span class="hljs-number">#fcb908</span>, <span class="hljs-number">0.35</span>) transparent;
    <span class="hljs-attribute">border-style</span>: solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">7px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">14px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">17px</span>;
    <span class="hljs-attribute">right</span>: auto;
  }
}</code></pre>
<blockquote>注：这段代码用的是 SASS 进行预编译，如果从头仔细看到这里的话不难理解，两个三角形叠加，大三角形颜色是边框的颜色，小三角形是内部背景色，小三角形绝对定位时向下移 3px 把圆角矩形的一部分上边框遮挡，这样小三角下部也有溢出，具体在两像素之内，实际上不存在遮挡文本问题。</blockquote>
<h2 id="articleHeader2">总结</h2>
<p>实际问题解决的方法很多，就看大家怎么去思考，这个方案也不是最满意的方案，因为多了一个伪元素，主要还是设计思想的多样性，总之 css 很灵活。</p>
<p>有人不禁会问，这里设计稿给的是向上的箭头，为什么例子里却都是向右的，这里向右的都是我写的 demo ，理解原理的话，改变个位置方向都是大同小异。</p>
<p>最后，读本文有收获的或者有更好想法的朋友，欢迎下方留言交流。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3 巧妙实现聊天气泡

## 原文链接
[https://segmentfault.com/a/1190000007159738](https://segmentfault.com/a/1190000007159738)

