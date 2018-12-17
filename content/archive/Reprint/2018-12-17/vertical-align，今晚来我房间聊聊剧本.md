---
title: 'vertical-align，今晚来我房间聊聊剧本' 
date: 2018-12-17 2:30:07
hidden: true
slug: cj9pkx9kqwp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在GitHub阅读，更有味道哦：<a href="https://github.com/veedrin/blog/issues/3" rel="nofollow noreferrer" target="_blank">vertical-align，今晚来我房间聊聊剧本</a><p>作者博客：<a href="https://github.com/veedrin/blog" rel="nofollow noreferrer" target="_blank">blog</a></p>
<p>还是来GitHub点个Star吧，啊，各位吴彦祖和高圆圆？</p>
</blockquote>
<h2 id="articleHeader0">写在前面</h2>
<p>CSS最令人困惑的属性是什么？<code>vertival-align</code></p>
<p>因为它总是达不到我们想要的效果</p>
<p>一个logo加一个标题，一个头像加一个名字，要让它们俩垂直居中</p>
<p>一通乱试之后，是不是只能恼怒的用<code>float</code>或者<code>margin</code>、<code>padding</code></p>
<p>今天，我们就来好好调教一下<code>vertival-align</code>这个傲娇女神</p>
<h2 id="articleHeader1">概念</h2>
<ul><li>line box</li></ul>
<p>由若干行内元素占据的一行，会有一个虚拟的框，该行所有行内元素都在这个框里面，W3C把这个框叫做<code>line box</code></p>
<p><code>line box</code>的高度由里面最高的行内元素撑起</p>
<p>如果里面行内元素的总宽度超过一行，则换行显示</p>
<ul><li>text box</li></ul>
<p>假如<code>line box</code>里面有一个英文字母x，这个字母的所有属性均继承自父元素</p>
<p>你把字母x用span包裹起来，设置背景颜色，背景颜色覆盖的高度就是<code>text box</code>的高度</p>
<p>当然，它是由<code>font-size</code>和<code>line-height</code>共同决定的</p>
<p><code>text box</code>是有其实的，你看那字母x明晃晃的背景颜色</p>
<p>只不过名字是我杜撰的，跟<code>line box</code>对应</p>
<p>W3C叫它<code>父元素的文字</code>，我觉得不是很好理解</p>
<ul><li>金线</li></ul>
<p><code>vertival-align</code>是垂直对齐属性，那它是跟谁对齐呢？</p>
<p>肯定是跟<code>line box</code>相关的某条线对齐，我把它叫做金线</p>
<p>我们都知道，小写字母x落在<code>text box</code>的基线上，小写字母g落在<code>text box</code>的底线上</p>
<p>字母x的下边缘就是<code>vertival-align: baseline;</code>所要对齐的金线</p>
<p>金线这个名字也是我取的，因为它是一个准绳</p>
<p>其实说白了<code>vertival-align</code>默认值对齐的就是<code>text box</code>的基线，所以它跟父元素的<code>font-size</code>和<code>line-height</code>都有关系</p>
<p>本文不讨论它们之间的关系，假设父元素的<code>font-size</code>和<code>line-height</code>都是固定的</p>
<p>当然不同的属性值，金线的标的也是不一样的，后面会讲到</p>
<p>金线虽然是一个准绳，它却没什么骨气，有时候会去迁就比较高的行内元素</p>
<ul><li>inline元素和inline-block元素</li></ul>
<p><code>vertival-align</code>只对这两种元素（或者变种）有效</p>
<h2 id="articleHeader2">一招鲜</h2>
<p>咱们先来一个命中率极高的解决方案</p>
<p>回到最前面的问题：一个logo加一个标题，一个头像加一个名字，要让它们俩垂直居中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <img src=&quot;avatar.png&quot;>
    <span>biu</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"avatar.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>biu<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>你给<code>span</code>加<code>vertical-align: middle;</code>，可是达不到效果</p>
<p>你给<code>img</code>加<code>vertical-align: middle;</code>，还是达不到效果</p>
<p>不是说好的垂直居中嘛，无赖呀！</p>
<p>其实，你给它们俩都加上<code>vertical-align: middle;</code>试试，效果是不是出来了？</p>
<p>我们潜意识肯定认为<code>vertical-align</code>是相对另一个元素对齐，否则怎么会期望达到我们想要的效果呢？</p>
<p>因为<code>vertical-align</code>是相对金线对齐，每个元素都要分别设置才能统一实现垂直居中</p>
<p>那你说我写在父元素上可不可以？</p>
<p>想走捷径，可以</p>
<p>你在父元素上写<code>vertical-align: middle;</code>，然后你还要在每一个行内元素上写<code>vertical-align: inherit;</code></p>
<p>因为<code>vertical-align</code>默认是不继承的</p>
<p>惊不惊喜！</p>
<p>当然，如果父元素显式的设置了高度，并且比里面任何行内元素都要高，那一招鲜也蔫了，后面有例子</p>
<h2 id="articleHeader3">属性值</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012882574?w=1918&amp;h=869" src="https://static.alili.tech/img/remote/1460000012882574?w=1918&amp;h=869" alt="垂直对齐" title="垂直对齐" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
    body {
        margin: 0;
    }
    .line-box {
        padding: 0 80px;
        background: #ff0;
    }
    .x {
        background: #6ade91;
    }
    .rect {
        display: inline-block;
        width: 100px;
        margin: 0 20px;
        background: #6ade91;
        overflow: hidden;
    }
    .top {
        height: 300px;
        vertical-align: top;
    }
    .bottom {
        height: 100px;
        vertical-align: bottom;
    }
    .text-top {
        height: 200px;
        vertical-align: text-top;
    }
    .text-bottom {
        height: 400px;
        vertical-align: text-bottom;
    }
    .middle {
        height: 100px;
        vertical-align: middle;
    }
    .baseline {
        height: 200px;
        vertical-align: baseline;
    }
    .visible {
        height: 200px;
        background: #f00;
        vertical-align: baseline;
        overflow: visible;
    }
</style>

<div class=&quot;line-box&quot;>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect top&quot;>top</span>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect bottom&quot;>bottom</span>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect text-top&quot;>text-top</span>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect text-bottom&quot;>text-bottom</span>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect middle&quot;>middle</span>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect baseline&quot;>baseline</span>
    <span class=&quot;x&quot;>x</span>
    <span class=&quot;rect visible&quot;>
        <span>baseline</span>
        <span>visible</span>
    </span>
    <span class=&quot;x&quot;>x</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.line-box</span> {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
    }
    <span class="hljs-selector-class">.x</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#6ade91</span>;
    }
    <span class="hljs-selector-class">.rect</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#6ade91</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-class">.top</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">vertical-align</span>: top;
    }
    <span class="hljs-selector-class">.bottom</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">vertical-align</span>: bottom;
    }
    <span class="hljs-selector-class">.text-top</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">vertical-align</span>: text-top;
    }
    <span class="hljs-selector-class">.text-bottom</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">vertical-align</span>: text-bottom;
    }
    <span class="hljs-selector-class">.middle</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
    <span class="hljs-selector-class">.baseline</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">vertical-align</span>: baseline;
    }
    <span class="hljs-selector-class">.visible</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
        <span class="hljs-attribute">vertical-align</span>: baseline;
        <span class="hljs-attribute">overflow</span>: visible;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect top"</span>&gt;</span>top<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect bottom"</span>&gt;</span>bottom<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect text-top"</span>&gt;</span>text-top<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect text-bottom"</span>&gt;</span>text-bottom<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect middle"</span>&gt;</span>middle<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect baseline"</span>&gt;</span>baseline<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rect visible"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>baseline<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>visible<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>通过这张图，我们来聊一聊不同属性值所对应的金线是什么</p>
<ul>
<li>top: 金线所在的位置是<code>line box</code>的上边</li>
<li>bottom: 金线所在的位置是<code>line box</code>的下边</li>
<li>text-top: 金线所在的位置是<code>text box</code>的上边，也就是字母x背景颜色的上边</li>
<li>text-bottom: 金线所在的位置是<code>text box</code>的下边，也就是字母x背景颜色的下边</li>
<li>middle: 金线所在的位置是字母x的中部，也就是叉相交的地方</li>
<li>baseline: 金线所在的位置是字母x的下边</li>
</ul>
<p>需要注意的是，最后一个矩形和前一个矩形都是<code>vertical-align: baseline;</code>，不同的是最后一个矩形<code>overflow</code>的属性值是<code>visible</code></p>
<p>而前面所有矩形都是<code>overflow: hidden;</code></p>
<p>为什么呢？</p>
<p>因为如果行内元素里面有文字，而行内元素的垂直对齐又是默认值时，是以行内元素里面最底部的文字基线和<code>text box</code>的基线对齐</p>
<p>然而如果设置了<code>overflow: hidden;</code>，就会触发BFC，文字就不会影响对齐点了</p>
<p>我是为了附上文字，方便比较，所以让前面的矩形都触发了BFC</p>
<h2 id="articleHeader4">一个例子</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012882575?w=1261&amp;h=750" src="https://static.alili.tech/img/remote/1460000012882575?w=1261&amp;h=750" alt="垂直对齐" title="垂直对齐" style="cursor: pointer;"></span></p>
<p>我希望实现图片垂直居中，怎么弄？</p>
<p>直接给图片设置<code>vertical-align: middle;</code>肯定是不行的</p>
<p>因为图片比较高，金线会去迁就图片</p>
<p>结果就是图片纹丝不动，字母x对齐图片中间</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012882576?w=1238&amp;h=750" src="https://static.alili.tech/img/remote/1460000012882576?w=1238&amp;h=750" alt="垂直对齐" title="垂直对齐" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
    body {
        margin: 0;
    }
    .box {
        height: 500px;
        padding-left: 300px;
        background: #ff0;
    }
    .box img {
        width: 200px;
        vertical-align: middle;
    }
</style>

<div class=&quot;box&quot;>
    <span>x</span>
    <img src=&quot;Adjani.png&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"Adjani.png"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我看到网上有一篇文章是这样做的</p>
<p>加一个span标签，变成<code>inline-block</code>元素，高度和父元素一样高，宽度1px，如果没有背景颜色，它几乎可以忽略不计</p>
<p>然后给图片和这个span同时设置<code>vertical-align: middle;</code></p>
<p>哎，发现真的可行</p>
<p>他解释说图片需要一个居中对齐的标杆，所以生造一个span，就可以使图片居中了</p>
<p>效果是达到了，然而解释是错误的</p>
<p>图片对齐span，那span对齐谁呢？</p>
<p>其实图片和span都是对齐金线，因为span的高度和父元素的高度一致，金线为了迁就它，就跑到父元素中间去了。然后图片再去对齐金线，于是图片也居中了</p>
<p>标杆永远是金线，只不过金线的位置是动态计算的，有时候要去迁就比较高的行内元素</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012882577?w=1244&amp;h=751" src="https://static.alili.tech/img/remote/1460000012882577?w=1244&amp;h=751" alt="垂直对齐" title="垂直对齐" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
    body {
        margin: 0;
    }
    .box {
        height: 500px;
        padding-left: 300px;
        background: #ff0;
    }
    .box img {
        width: 200px;
        vertical-align: middle;
    }
    .box .blank {
        display: inline-block;
        width: 1px;
        height: 500px;
        background: #f00;
        vertical-align: middle;
    }
</style>

<div class=&quot;box&quot;>
    <span>x</span>
    <img src=&quot;Adjani.png&quot;>
    <span class=&quot;blank&quot;></span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.blank</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"Adjani.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"blank"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>其实还有一种办法，给父元素设置行高等于高度</p>
<p>这时候<code>text box</code>的高度和父元素的高度是一样的，金线不需要去迁就任何人，图片只管对齐它就是了</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012882578?w=1232&amp;h=751" src="https://static.alili.tech/img/remote/1460000012882578?w=1232&amp;h=751" alt="垂直对齐" title="垂直对齐" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
    body {
        margin: 0;
    }
    .box {
        height: 500px;
        line-height: 500px;
        padding-left: 300px;
        background: #ff0;
    }
    .box img {
        width: 200px;
        vertical-align: middle;
    }
</style>

<div class=&quot;box&quot;>
    <span>x</span>
    <img src=&quot;Adjani.png&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>x<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"Adjani.png"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader5">总结</h2>
<p>首先，<code>line box</code>里有一个<code>text box</code>，同时还有一根金线</p>
<p>不同的垂直对齐属性值，对标的金线是不同的，所以多个元素可能对标多根金线，这是没问题的</p>
<p>金线虽然是准绳，但它的高度是动态计算的，有可能要去迁就很高的行内元素</p>
<p>如果行内元素里面有文字，且属性值为baseline的时候，是以里面文字的基线去对齐金线</p>
<p>但如果触发BFC，则上一条失效</p>
<p>张鑫旭讲到过，middle只是近似垂直居中，有兴趣的可以去了解一下</p>
<p>如果金线跟<code>text box</code>有关，你可以在<code>line box</code>里放一个没有任何样式的小写字母x，给它一个背景色（好吧背景色也是样式），方便查看金线大概在哪里</p>
<p>金线，当它是<code>text box</code>的一部分时，肯定跟父元素的<code>font-size</code>和<code>line-height</code>是有关的，这个以后咱么再聊</p>
<p>其实大多数情况，一招鲜都可以解决，就是给所有行内元素设置垂直居中</p>
<p>总之，找到金线，你就找到组织了</p>
<h2 id="articleHeader6">写在后面</h2>
<p>我和你们一样，每次见到一行有多个行内元素就犯怵</p>
<p>所以下定决心弄清楚<code>vertical-align</code>的原理，希望对大家有一点微小的启发</p>
<p>以上都是我自己的理解，金线也是我自创的，可能不是很严谨</p>
<p>CSS是一门玄学，够用就好</p>
<blockquote>在GitHub阅读，更有味道哦：<a href="https://github.com/veedrin/blog/issues/3" rel="nofollow noreferrer" target="_blank">vertical-align，今晚来我房间聊聊剧本</a><p>作者博客：<a href="https://github.com/veedrin/blog" rel="nofollow noreferrer" target="_blank">blog</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vertical-align，今晚来我房间聊聊剧本

## 原文链接
[https://segmentfault.com/a/1190000012882569](https://segmentfault.com/a/1190000012882569)

