---
title: '【前端Talkking】CSS系列-红月亮、蓝月亮、X月亮，还是渐变月亮好' 
date: 2018-12-15 2:30:11
hidden: true
slug: 57r9k68ge22
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.写在前面</h2>
<p>这两天，大家一定是被红月亮刷屏了吧？我们都被下面漂亮的月亮迷倒了吧？<br><span class="img-wrap"><img data-src="/img/bV21NB?w=102&amp;h=101" src="https://static.alili.tech/img/bV21NB?w=102&amp;h=101" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>哈哈，大家清醒清醒，那么漂亮的月亮，大家有没有想过我们的css可以搞定任意颜色的月亮呢？答案是：肯定可以的。那么今天就给大家讲讲任意颜色的月亮怎么实现：使用线性渐变<code>linear-gradient</code>，so easy!如果对这个属性不熟悉的，可以先看我之前写的关于线性渐变的文章<a href="https://segmentfault.com/a/1190000012882599">【前端Talkking】CSS系列-css3之线性渐变初探</a>。</p>
<h2 id="articleHeader1">2.如何实现</h2>
<p>其实很简单,假设我们有以下的基础图片：<br><span class="img-wrap"><img data-src="/img/bV21JZ?w=293&amp;h=291" src="https://static.alili.tech/img/bV21JZ?w=293&amp;h=291" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后我们有如下html代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body>
<div class=&quot;demo&quot;></div>
</body>
</html>

<style>
    .demo{
        width: 290px;
        height: 290px;
        border-radius: 50%;
        background:  url(./moon3.png) no-repeat;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.demo</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">290px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">290px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">url</span>(./moon3.png) no-repeat;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>然后利用css背景的可重复性，修改css中的<code>background</code>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background: linear-gradient(to bottom left, #cd0000, rgba(255,255,255,0)), url(./moon3.png) no-repeat;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">background</span>: linear-gradient(to bottom left, <span class="hljs-number">#cd0000</span>, rgba(<span class="hljs-number">255</span>,<span class="hljs-number">255</span>,<span class="hljs-number">255</span>,<span class="hljs-number">0</span>)), url(<span class="hljs-string">./moon3.png</span>) no-repeat;
</code></pre>
<p>此时就可以实现红月亮了：<br><span class="img-wrap"><img data-src="/img/bV21Kv?w=298&amp;h=301" src="https://static.alili.tech/img/bV21Kv?w=298&amp;h=301" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果想实现其他颜色的月亮，直接修改<code>linear-gradient</code>中的渐变颜色即可，即箭头指向的颜色：<br><span class="img-wrap"><img data-src="/img/bV21KR?w=1006&amp;h=168" src="https://static.alili.tech/img/bV21KR?w=1006&amp;h=168" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下面是作者修改颜色实现的几种不同颜色的效果：<br><span class="img-wrap"><img data-src="/img/bV21KX?w=299&amp;h=300" src="https://static.alili.tech/img/bV21KX?w=299&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV21KY?w=309&amp;h=299" src="https://static.alili.tech/img/bV21KY?w=309&amp;h=299" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV21K5?w=295&amp;h=297" src="https://static.alili.tech/img/bV21K5?w=295&amp;h=297" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV21K7?w=301&amp;h=297" src="https://static.alili.tech/img/bV21K7?w=301&amp;h=297" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>是不是很酷？这样我们就不需要在寒冷的冬天等待红月亮了，也不用再担心多少年一遇的月亮了，想什么颜色的月亮，就可以在电脑上分分钟实现。</p>
<h2 id="articleHeader2">3.写在最后</h2>
<p>这篇文章很短，也没有特别的难点，如果对<code>linear-gradient</code>比较熟悉，分分钟就可以实现，关键是思路。这就告诉我们了CSS很强大，多思考，多动脑，很多酷炫的效果我们自己都可以实现的。<br><strong>图片左侧有黑色的部分，是因为截图的原因，这里只是跟大家讲解这个思路</strong>。<br>大家有什么问题可以在评论区留言。感谢阅读，大家晚安。</p>
<p>ps:今天是部门职级晋升成功的老板们请客吃饭，在等餐的过程中，跟同事聊起了红月亮的事，同事开玩笑说，你可以用你前几天分享的渐变实现红月亮效果呀，要什么自行车？同事一句话提醒了我，回到家10点多了，打开电脑，试了下，用<code>线性渐变</code>确实可以实现红月亮的的效果。发了个朋友圈就洗洗睡了，但是怎么睡都睡不着，于是爬起来把这个记下来跟大家分享下。</p>
<hr>
<p><strong>遇见了，不妨关注下我的微信公众号「前端Talkking」</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV2dtf?w=258&amp;h=258" src="https://static.alili.tech/img/bV2dtf?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端Talkking】CSS系列-红月亮、蓝月亮、X月亮，还是渐变月亮好

## 原文链接
[https://segmentfault.com/a/1190000013075879](https://segmentfault.com/a/1190000013075879)

