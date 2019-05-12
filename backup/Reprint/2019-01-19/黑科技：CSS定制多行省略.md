---
title: '黑科技：CSS定制多行省略' 
date: 2019-01-19 2:30:09
hidden: true
slug: 71qzg0zrtcc
categories: [reprint]
---

{{< raw >}}

                    
<p>转载请注明出处：<a href="http://hai.li/2017/03/08/css-multiline-overflow-ellipsis.html" rel="nofollow noreferrer" target="_blank">http://hai.li/2017/03/08/css-...</a></p>
<h2 id="articleHeader0">什么是多行省略？</h2>
<p><span class="img-wrap"><img data-src="/img/bVKr2N?w=660&amp;h=325" src="https://static.alili.tech/img/bVKr2N?w=660&amp;h=325" alt="什么是多行省略" title="什么是多行省略" style="cursor: pointer; display: inline;"></span></p>
<p>当字数多到一定程度就显示省略号点点点。最初只是简单的点点点，之后花样越来越多，点点点加下箭头，点点点加更多，点点点加更多加箭头...。多行省略就是大段文字后面的花式点点点。</p>
<hr>
<h2 id="articleHeader1">同行这么做：</h2>
<p><span class="img-wrap"><img data-src="/img/bVKr22?w=660&amp;h=587" src="https://static.alili.tech/img/bVKr22?w=660&amp;h=587" alt="同行这么做" title="同行这么做" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>Google Plus用透明到白色的渐变遮罩，渐变遮罩在文字超出的时候才显示，但无法挤出文字，且背景只能纯色，不理想。</p></li>
<li><p>豌豆荚则更简单粗暴换行显示，换行显示则文字未超出时依然显示 ...xxx，更不理想！</p></li>
</ol>
<h2 id="articleHeader2">我这样做：</h2>
<p><span class="img-wrap"><img data-src="/img/bVKr3m?w=660&amp;h=1176" src="https://static.alili.tech/img/bVKr3m?w=660&amp;h=1176" alt="我这样做" title="我这样做" style="cursor: pointer; display: inline;"></span></p>
<p>在QQ浏览器的页面用了一个<strong>原创</strong>的mod-more UI组件，实现了<strong>定制</strong>的多行省略，还是<strong>纯CSS</strong>的，领先同行一大截，赞！赞！赞！只可惜，mod-more组件的高度是固定的。对mod-more进一步进化，完美自适应高度，而且代码简化易用。</p>
<hr>
<h2 id="articleHeader3">怎么做到的？</h2>
<p><span class="img-wrap"><img data-src="/img/bVKr3W?w=658&amp;h=564" src="https://static.alili.tech/img/bVKr3W?w=658&amp;h=564" alt="怎么做到的" title="怎么做到的" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader4">原理详解！</h2>
<h3 id="articleHeader5">按需显示<code>...更多</code>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVKr4p?w=320&amp;h=127" src="https://static.alili.tech/img/bVKr4p?w=320&amp;h=127" alt="按需显示...更多" title="按需显示...更多" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px"}}"/*测试*/</style>
<div style=&quot;font-size:12px;line-height: 18px;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);&quot;>
    <div style=&quot;float:right;margin-left: -50px;width:100%;position:relative;background: hsla(229, 100%, 75%, 0.5);&quot;>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
    <div style=&quot;float:right;position:relative;width:50px;height: 108px;color:transparent;background: hsla(334, 100%, 75%, 0.5);&quot;>placeholder</div>
    <div style=&quot;float:right;width:50px;height:18px;position: relative;background: hsla(27, 100%, 75%, 0.5);&quot;>...更多</div>
</div>
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> width-change {0%,100%{<span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>} 50%{<span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>"}}"<span class="hljs-comment">/*测试*/</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:12px;line-height: 18px;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;margin-left: -50px;width:100%;position:relative;background: hsla(229, 100%, 75%, 0.5);"</span>&gt;</span>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;position:relative;width:50px;height: 108px;color:transparent;background: hsla(334, 100%, 75%, 0.5);"</span>&gt;</span>placeholder<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;width:50px;height:18px;position: relative;background: hsla(27, 100%, 75%, 0.5);"</span>&gt;</span>...更多<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>利用右浮动原理——右浮动元素从右到左依次排列，不够空间则换行。蓝色块、粉色块、橙色块依次右浮动，蓝色块高度小于6行文字时，橙色块在右边，蓝色块高度大于6行文字时，左下角刚好够橙色块排列的空间，于是橙色块就到左边了</p>
<p><span class="img-wrap"><img data-src="/img/bVKr4w?w=590&amp;h=127" src="https://static.alili.tech/img/bVKr4w?w=590&amp;h=127" alt="按需显示...更多2" title="按需显示...更多2" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px"}}"/*测试*/</style>
<div style=&quot;font-size:12px;line-height: 18px;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);&quot;>
    <div style=&quot;float:right;margin-left: -50px;width:100%;position:relative;background: hsla(229, 100%, 75%, 0.5);&quot;>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
    <div style=&quot;float:right;position:relative;width:50px;height: 108px;color:transparent;background: hsla(334, 100%, 75%, 0.5);&quot;>placeholder</div>
    <div style=&quot;float:right;width:50px;height:18px;position: relative;background: hsla(27, 100%, 75%, 0.5);left: 100%;-webkit-transform: translate(-100%,-100%);&quot;>...更多</div>
</div>
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> width-change {0%,100%{<span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>} 50%{<span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>"}}"<span class="hljs-comment">/*测试*/</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:12px;line-height: 18px;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;margin-left: -50px;width:100%;position:relative;background: hsla(229, 100%, 75%, 0.5);"</span>&gt;</span>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;position:relative;width:50px;height: 108px;color:transparent;background: hsla(334, 100%, 75%, 0.5);"</span>&gt;</span>placeholder<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;width:50px;height:18px;position: relative;background: hsla(27, 100%, 75%, 0.5);left: 100%;-webkit-transform: translate(-100%,-100%);"</span>&gt;</span>...更多<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>进一步将橙色块偏移到正确位置就大功告成了！细心的同学会发现，将橙色块加上渐变底就是Google Plus在用的方案。</p>
<h3 id="articleHeader6">文字溢出截断</h3>
<p><span class="img-wrap"><img data-src="/img/bVKr4z?w=321&amp;h=125" src="https://static.alili.tech/img/bVKr4z?w=321&amp;h=125" alt="文字溢出截断" title="文字溢出截断" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px"}}"/*测试*/</style>
<div style=&quot;font-size: 12px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: red;line-height: 18px;position: relative;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);&quot;>
    <div style=&quot;color:#000;display: inline;vertical-align: top;background: rgb(204, 204, 204);&quot;>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
</div>
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> width-change {0%,100%{<span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>} 50%{<span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>"}}"<span class="hljs-comment">/*测试*/</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size: 12px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: red;line-height: 18px;position: relative;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:#000;display: inline;vertical-align: top;background: rgb(204, 204, 204);"</span>&gt;</span>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>-webkit-line-clamp</code>是webkit内核的私有css属性，用于进行多行省略，在安卓和ios上全支持。但它固定使用省略号，无法直接扩展。而且自带了溢出截断逻辑，作用于容器高度。仔细考察可发现它使用的省略号是单字符<code>…</code>，可以用文字css属性如<code>font-size</code>,<code>letter-spacing</code>,<code>color</code>等控制。</p>
<p><span class="img-wrap"><img data-src="/img/bVKr4H?w=321&amp;h=125" src="https://static.alili.tech/img/bVKr4H?w=321&amp;h=125" alt="文字溢出截断2" title="文字溢出截断2" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px"}}"/*测试*/</style>
<div style=&quot;font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: red;line-height: 18px;position: relative;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);&quot;>
    <div style=&quot;color:#000;display: inline;font-size: 12px;vertical-align: top;letter-spacing: 0;background: rgb(204, 204, 204);&quot;>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
</div>
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> width-change {0%,100%{<span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>} 50%{<span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>"}}"<span class="hljs-comment">/*测试*/</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: red;line-height: 18px;position: relative;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:#000;display: inline;font-size: 12px;vertical-align: top;letter-spacing: 0;background: rgb(204, 204, 204);"</span>&gt;</span>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>设置外容器的<code>font-size</code>、<code>letter-spacing</code>、<code>color</code>，并在子容器里恢复就可以单独设置省略号。这里外容器设置<code>font-size</code>的值等于2倍行高（余下要撑开的宽度可用<code>letter-spacing</code>补足，也可仅用<code>font-size</code>撑开全部的宽度），<code>color:transparent</code>可以让line-clamp既挤出文字又不截断容器高度，外容器高度达到7行而不是默认表现的6行，从而达到需要的溢出截断效果</p>
<p><span class="img-wrap"><img data-src="/img/bVKr4T?w=362&amp;h=552" src="https://static.alili.tech/img/bVKr4T?w=362&amp;h=552" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">合体！定制多行省略</h3>
<p><span class="img-wrap"><img data-src="/img/bVKr4U?w=480&amp;h=127" src="https://static.alili.tech/img/bVKr4U?w=480&amp;h=127" alt="合体！定制多行省略" title="合体！定制多行省略" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px"}}"/*测试*/</style>
<div style=&quot;position: relative;line-height:18px;-webkit-animation: width-change 8s ease infinite;max-height: 108px;&quot;>
    <div style=&quot;font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: transparent;line-height: 18px;position: relative;&quot;>
        <div style=&quot;font-size:12px;color: #000;display: inline;vertical-align: top;letter-spacing: 0;&quot;>
        腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。
        </div>
        <div style=&quot;position:absolute;top: 0;left: 50%;width: 100%;height: 100%;letter-spacing: 0;color: #000;font-size: 12px;background: rgba(173, 216, 230, 0.5);&quot;>
            <div style=&quot;float: right;width: 50%;height: 100%;background: rgba(255, 192, 203, 0.5);&quot;></div>
            <div style=&quot;float: right;width: 50%;height: 108px;background: hsla(223, 100%, 50%, 0.19);&quot;></div>
            <div style=&quot;float: right;width: 50px;height: 18px;position: relative;background: rgba(255, 165, 0, 0.5);&quot; class=&quot;&quot;>... 更多</div>
        </div>
    </div>
</div>   
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> width-change {0%,100%{<span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>} 50%{<span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>"}}"<span class="hljs-comment">/*测试*/</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: relative;line-height:18px;-webkit-animation: width-change 8s ease infinite;max-height: 108px;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: transparent;line-height: 18px;position: relative;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:12px;color: #000;display: inline;vertical-align: top;letter-spacing: 0;"</span>&gt;</span>
        腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:absolute;top: 0;left: 50%;width: 100%;height: 100%;letter-spacing: 0;color: #000;font-size: 12px;background: rgba(173, 216, 230, 0.5);"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float: right;width: 50%;height: 100%;background: rgba(255, 192, 203, 0.5);"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float: right;width: 50%;height: 108px;background: hsla(223, 100%, 50%, 0.19);"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float: right;width: 50px;height: 18px;position: relative;background: rgba(255, 165, 0, 0.5);"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&gt;</span>... 更多<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>将<code>-webkit-line-clamp</code>实现的文字溢出截断代码为主体，叠加绝对定位同步的按需显示<code>...更多</code>结构。因为绝对定位，这里使用百分比简化代码。最外包一层结构限制最大高度。</p>
<p><span class="img-wrap"><img data-src="/img/bVKr47?w=321&amp;h=111" src="https://static.alili.tech/img/bVKr47?w=321&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html><body>
<style>
/*
 * 行高 h
 * 最大行数 n
 * ...更多容器的宽 w
 * 字号 f
 */

@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px"}}"
.ellipsis {
    position: relative;
    background: rgb(230, 230, 230);
    width: 260px;
    max-height: 108px; /* h*n */
    line-height: 18px; /* h */
    overflow: hidden;
    -webkit-animation: width-change 8s ease infinite;
}
.ellipsis-container {
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6; /* n */
    font-size: 50px; /* w */
    color: transparent;
}
.ellipsis-content {
    color: #000;
    display: inline;
    vertical-align: top;
    font-size: 12px; /* f */
}
.ellipsis-ghost {
    position:absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    color: #000;
}
.ellipsis-ghost:before {
    content: &quot;&quot;;
    display: block;
    float: right;
    width: 50%;
    height: 100%;
}
.ellipsis-placeholder {
    content: &quot;&quot;;
    display: block;
    float: right;
    width: 50%;
    height: 108px; /* h*n */
}
.ellipsis-more {
    float: right;
    font-size: 12px; /* f */
    width: 50px; /* w */
    height: 18px; /* h */
    margin-top: -18px; /* -h */
}
</style>
<div class=&quot;ellipsis&quot;>
    <div class=&quot;ellipsis-container&quot;>
        <div class=&quot;ellipsis-content&quot;>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
        <div class=&quot;ellipsis-ghost&quot;>
            <div class=&quot;ellipsis-placeholder&quot;></div>
            <div class=&quot;ellipsis-more&quot;>...更多</div>
        </div>
    </div>
</div>   
</body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-comment">/*
 * 行高 h
 * 最大行数 n
 * ...更多容器的宽 w
 * 字号 f
 */</span>

@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> width-change {0%,100%{<span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>} 50%{<span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>"}}"
<span class="hljs-selector-class">.ellipsis</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgb</span>(230, 230, 230);
    <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span>;
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">108px</span>; <span class="hljs-comment">/* h*n */</span>
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">18px</span>; <span class="hljs-comment">/* h */</span>
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">-webkit-animation</span>: width-change <span class="hljs-number">8s</span> ease infinite;
}
<span class="hljs-selector-class">.ellipsis-container</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">6</span>; <span class="hljs-comment">/* n */</span>
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>; <span class="hljs-comment">/* w */</span>
    <span class="hljs-attribute">color</span>: transparent;
}
<span class="hljs-selector-class">.ellipsis-content</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">display</span>: inline;
    <span class="hljs-attribute">vertical-align</span>: top;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>; <span class="hljs-comment">/* f */</span>
}
<span class="hljs-selector-class">.ellipsis-ghost</span> {
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}
<span class="hljs-selector-class">.ellipsis-ghost</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.ellipsis-placeholder</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">108px</span>; <span class="hljs-comment">/* h*n */</span>
}
<span class="hljs-selector-class">.ellipsis-more</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>; <span class="hljs-comment">/* f */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>; <span class="hljs-comment">/* w */</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">18px</span>; <span class="hljs-comment">/* h */</span>
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">18px</span>; <span class="hljs-comment">/* -h */</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ellipsis"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ellipsis-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ellipsis-content"</span>&gt;</span>腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ellipsis-ghost"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ellipsis-placeholder"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ellipsis-more"</span>&gt;</span>...更多<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<hr>
<h2 id="articleHeader8">为什么这么做？</h2>
<h3 id="articleHeader9">line-clamp有<strong>3</strong>宗罪</h3>
<p><span class="img-wrap"><img data-src="/img/bVKr5z?w=320&amp;h=72" src="https://static.alili.tech/img/bVKr5z?w=320&amp;h=72" alt="text-align:justify一起用会使省略号和文字相叠" title="text-align:justify一起用会使省略号和文字相叠" style="cursor: pointer;"></span></p>
<p><code>text-align:justify</code>一起用会使省略号和文字相叠</p>
<p><span class="img-wrap"><img data-src="/img/bVKr9O?w=320&amp;h=152" src="https://static.alili.tech/img/bVKr9O?w=320&amp;h=152" alt="超出截断后会截掉部分行高" title="超出截断后会截掉部分行高" style="cursor: pointer;"></span></p>
<p>超出截断后会截掉部分行高</p>
<p><span class="img-wrap"><img data-src="/img/bVKr7a?w=320&amp;h=103" src="https://static.alili.tech/img/bVKr7a?w=320&amp;h=103" alt="省略号出现在单词中间" title="省略号出现在单词中间" style="cursor: pointer; display: inline;"></span></p>
<p>省略号出现在单词中间</p>
<h3 id="articleHeader10">定制省略当然某问题啦</h3>
<p><span class="img-wrap"><img data-src="/img/bVKr9P?w=320&amp;h=108" src="https://static.alili.tech/img/bVKr9P?w=320&amp;h=108" alt="text-align:justify时如期所示，没问题！" title="text-align:justify时如期所示，没问题！" style="cursor: pointer; display: inline;"></span></p>
<p><code>text-align:justify</code>时如期所示，没问题！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008648963?w=320&amp;h=181" src="https://static.alili.tech/img/remote/1460000008648963?w=320&amp;h=181" alt="截断时如期所示，也没问题！" title="截断时如期所示，也没问题！" style="cursor: pointer;"></span></p>
<p>截断时如期所示，也没问题！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008648964?w=320&amp;h=120" src="https://static.alili.tech/img/remote/1460000008648964?w=320&amp;h=120" alt="省略号在有单词时如期显示，依然没问题！" title="省略号在有单词时如期显示，依然没问题！" style="cursor: pointer;"></span></p>
<p>省略号在有单词时如期显示，依然没问题！</p>
<h3 id="articleHeader11">更别说点点点花样增改</h3>
<p><span class="img-wrap"><img data-src="/img/bVKr9K?w=225&amp;h=225" src="https://static.alili.tech/img/bVKr9K?w=225&amp;h=225" alt="后退，我要开始装逼了" title="后退，我要开始装逼了" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008648966?w=320&amp;h=108" src="https://static.alili.tech/img/remote/1460000008648966?w=320&amp;h=108" alt="简单增改文字加链接只是小case" title="简单增改文字加链接只是小case" style="cursor: pointer;"></span></p>
<p>简单增改文字加链接只是小case</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008648967?w=340&amp;h=148" src="https://static.alili.tech/img/remote/1460000008648967?w=340&amp;h=148" alt="用折角还是其他图片表示文本溢出可以增添趣味" title="用折角还是其他图片表示文本溢出可以增添趣味" style="cursor: pointer;"></span></p>
<p>用折角还是其他图片表示文本溢出可以增添趣味</p>
<p><span class="img-wrap"><img data-src="/img/bVKr9U?w=320&amp;h=108" src="https://static.alili.tech/img/bVKr9U?w=320&amp;h=108" alt="溢出时显示溢出字数增加了实用用途" title="溢出时显示溢出字数增加了实用用途" style="cursor: pointer;"></span></p>
<p>溢出时显示溢出字数增加了实用用途</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008648969?w=203&amp;h=204" src="https://static.alili.tech/img/remote/1460000008648969?w=203&amp;h=204" alt="这B装的beautiful" title="这B装的beautiful" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
黑科技：CSS定制多行省略

## 原文链接
[https://segmentfault.com/a/1190000008649988](https://segmentfault.com/a/1190000008649988)

