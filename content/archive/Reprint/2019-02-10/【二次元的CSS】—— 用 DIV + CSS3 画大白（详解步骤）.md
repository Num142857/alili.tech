---
title: '【二次元的CSS】—— 用 DIV + CSS3 画大白（详解步骤）' 
date: 2019-02-10 2:30:42
hidden: true
slug: pyzlj8jay2d
categories: [reprint]
---

{{< raw >}}

                    
<p>原本自己也想画大白，正巧看到一位同学（github：<a href="https://github.com/shiyiwang" rel="nofollow noreferrer" target="_blank">https://github.com/shiyiwang</a>）也用相同的方法画了。 且细节相当到位。所以我就fork了一下，在此我也分享一下。<br>同时，我也希望有更多的同学发挥自己的想象力，来找个东西画画。</p>
<p><span class="img-wrap"><img data-src="/img/bVvI6e" src="https://static.alili.tech/img/bVvI6e" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>如果看过我前几次的分享，肯定能马上想到大白的各个部位是怎么实现的。</strong></p>
<blockquote><p>GitHub传送门：<a href="https://github.com/lancer07/css3_Baymax" rel="nofollow noreferrer" target="_blank">https://github.com/lancer07/css3_Baymax</a></p></blockquote>
<h3 id="articleHeader0">第一步：头</h3>
<p><span class="img-wrap"><img data-src="/img/bVvI6M" src="https://static.alili.tech/img/bVvI6M" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;baymax-head&quot;>
  <div class=&quot;head-highlight&quot;></div>
  <div class=&quot;baymax-eyes&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-head"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"head-highlight"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-eyes"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".baymax-head {
  position: absolute;
  left: 50%;
  margin-left: -21px;
  width: 42px;
  height: 28px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  -webkit-transform: rotate(5deg);
  -moz-transform: rotate(5deg);
  -ms-transform: rotate(5deg);
  -o-transform: rotate(5deg);
  transform: rotate(5deg);
  z-index: 3;
  overflow: hidden;
  -webkit-box-shadow: 0 6px 8px -5px rgba(128, 128, 128, 0.75), inset 0 -6px 8px -5px rgba(204, 204, 204, 0.5);
  -moz-box-shadow: 0 6px 8px -5px rgba(128, 128, 128, 0.75), inset 0 -6px 8px -5px rgba(204, 204, 204, 0.5);
  box-shadow: 0 6px 8px -5px rgba(128, 128, 128, 0.75), inset 0 -6px 8px -5px rgba(204, 204, 204, 0.5);
}

.baymax-head .head-highlight {
  position: absolute;
  top: 12%;
  right: 25%;
  width: 45%;
  height: 1%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  background: #ffffff;
  -webkit-box-shadow: 0 0 18px 9px #ffffff, 0 0 0 0 transparent;
  -moz-box-shadow: 0 0 18px 9px #ffffff, 0 0 0 0 transparent;
  box-shadow: 0 0 18px 9px #ffffff, 0 0 0 0 transparent;
}

.baymax-head .baymax-eyes {
  position: relative;
  top: 10px;
  left: 50%;
  -webkit-transform: translateX(-10px);
  -moz-transform: translateX(-10px);
  -ms-transform: translateX(-10px);
  -o-transform: translateX(-10px);
  transform: translateX(-10px);
  height: 1px;
  width: 20px;
  background: #333333;
}

.baymax-head .baymax-eyes:before, .baymax-head .baymax-eyes:after {
  top: -3px;
  width: 6px;
  height: 6px;
  background: #333333;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
}

.baymax-head .baymax-eyes:before {
  left: -2px;
}

.baymax-head .baymax-eyes:after {
  right: -2px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.baymax-head</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">21px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">42px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">28px</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">3</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-number">8px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(128, 128, 128, 0.75), inset <span class="hljs-number">0</span> -<span class="hljs-number">6px</span> <span class="hljs-number">8px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(204, 204, 204, 0.5);
  <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-number">8px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(128, 128, 128, 0.75), inset <span class="hljs-number">0</span> -<span class="hljs-number">6px</span> <span class="hljs-number">8px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(204, 204, 204, 0.5);
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-number">8px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(128, 128, 128, 0.75), inset <span class="hljs-number">0</span> -<span class="hljs-number">6px</span> <span class="hljs-number">8px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(204, 204, 204, 0.5);
}

<span class="hljs-selector-class">.baymax-head</span> <span class="hljs-selector-class">.head-highlight</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">12%</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">45%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1%</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">18px</span> <span class="hljs-number">9px</span> <span class="hljs-number">#ffffff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">18px</span> <span class="hljs-number">9px</span> <span class="hljs-number">#ffffff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">18px</span> <span class="hljs-number">9px</span> <span class="hljs-number">#ffffff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
}

<span class="hljs-selector-class">.baymax-head</span> <span class="hljs-selector-class">.baymax-eyes</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-10px);
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#333333</span>;
}

<span class="hljs-selector-class">.baymax-head</span> <span class="hljs-selector-class">.baymax-eyes</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.baymax-head</span> <span class="hljs-selector-class">.baymax-eyes</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">3px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">6px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">6px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#333333</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.baymax-head</span> <span class="hljs-selector-class">.baymax-eyes</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">2px</span>;
}

<span class="hljs-selector-class">.baymax-head</span> <span class="hljs-selector-class">.baymax-eyes</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">2px</span>;
}</code></pre>
<h3 id="articleHeader1">第二步：身体</h3>
<p><span class="img-wrap"><img data-src="/img/bVvI6X" src="https://static.alili.tech/img/bVvI6X" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;baymax-body&quot;>
  <div class=&quot;body-highlight&quot;></div>
  <div class=&quot;baymax-heart&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-body"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"body-highlight"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-heart"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".baymax-body {
  position: absolute;
  top: 18.66667px;
  left: 50%;
  -webkit-transform: translateX(-62px);
  -moz-transform: translateX(-62px);
  -ms-transform: translateX(-62px);
  -o-transform: translateX(-62px);
  transform: translateX(-62px);
  width: 124px;
  height: 180px;
  -webkit-border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  -moz-border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  -ms-border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  overflow: hidden;
  z-index: 2;
}

.baymax-body .body-highlight {
  position: absolute;
  top: 20%;
  right: 40%;
  width: 0%;
  height: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  background: #ffffff;
  -webkit-box-shadow: 0 0 45px 25px #ffffff, 0 0 0 0 transparent;
  -moz-box-shadow: 0 0 45px 25px #ffffff, 0 0 0 0 transparent;
  box-shadow: 0 0 45px 25px #ffffff, 0 0 0 0 transparent;
}

.baymax-body .baymax-heart {
  position: absolute;
  top: 35px;
  right: 30%;
  height: 12px;
  width: 12px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
}

.baymax-body:before, .baymax-body:after {
  top: 55px;
  width: 15px;
  height: 40px;
}

.baymax-body:before {
  left: -8px;
  -webkit-transform: rotate(15deg);
  -moz-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  -o-transform: rotate(15deg);
  transform: rotate(15deg);
}

.baymax-body:after {
  right: -8px;
  -webkit-transform: rotate(-15deg);
  -moz-transform: rotate(-15deg);
  -ms-transform: rotate(-15deg);
  -o-transform: rotate(-15deg);
  transform: rotate(-15deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.baymax-body</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">18.66667px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(-62px);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">translateX</span>(-62px);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">translateX</span>(-62px);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">translateX</span>(-62px);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-62px);
  <span class="hljs-attribute">width</span>: <span class="hljs-number">124px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">180px</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">60%</span> <span class="hljs-number">60%</span> <span class="hljs-number">40%</span> <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">60%</span> <span class="hljs-number">60%</span> <span class="hljs-number">40%</span> <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">60%</span> <span class="hljs-number">60%</span> <span class="hljs-number">40%</span> <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">60%</span> <span class="hljs-number">60%</span> <span class="hljs-number">40%</span> <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
}

<span class="hljs-selector-class">.baymax-body</span> <span class="hljs-selector-class">.body-highlight</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">20%</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">0%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">45px</span> <span class="hljs-number">25px</span> <span class="hljs-number">#ffffff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">45px</span> <span class="hljs-number">25px</span> <span class="hljs-number">#ffffff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">45px</span> <span class="hljs-number">25px</span> <span class="hljs-number">#ffffff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
}

<span class="hljs-selector-class">.baymax-body</span> <span class="hljs-selector-class">.baymax-heart</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">30%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.baymax-body</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.baymax-body</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">top</span>: <span class="hljs-number">55px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-class">.baymax-body</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">8px</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(15deg);
}

<span class="hljs-selector-class">.baymax-body</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">8px</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(-15deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(-15deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(-15deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(-15deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-15deg);
}</code></pre>
<h3 id="articleHeader2">第三步：双手</h3>
<p><span class="img-wrap"><img data-src="/img/bVvI7K" src="https://static.alili.tech/img/bVvI7K" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;baymax-arm baymax-left-arm&quot;>
   <div class=&quot;arm-highlight larm-highlight&quot;></div>
</div>
<div class=&quot;baymax-arm baymax-right-arm&quot;>
   <div class=&quot;arm-highlight rarm-highlight&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-arm baymax-left-arm"</span>&gt;
   &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"arm-highlight larm-highlight"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-arm baymax-right-arm"</span>&gt;
   &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"arm-highlight rarm-highlight"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".baymax-arm {
  position: absolute;
  top: 28px;
  height: 145px;
  width: 40px;
  overflow: hidden;
  z-index: 1;
}

.baymax-arm:after {
  top: 60px;
  height: 50px;
  width: 25px;
}

.baymax-arm .arm-highlight {
  position: absolute;
  top: 25%;
  width: 1%;
  height: 65%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  background: #ffffff;
  -webkit-box-shadow: 0 0 16px 7px rgba(255, 255, 255, 0.8), 0 0 0 0 transparent;
  -moz-box-shadow: 0 0 16px 7px rgba(255, 255, 255, 0.8), 0 0 0 0 transparent;
  box-shadow: 0 0 16px 7px rgba(255, 255, 255, 0.8), 0 0 0 0 transparent;
}

.baymax-left-arm {
  left: 65px;
  -webkit-transform: rotate(25deg);
  -moz-transform: rotate(25deg);
  -ms-transform: rotate(25deg);
  -o-transform: rotate(25deg);
  transform: rotate(25deg);
  -webkit-border-radius: 90px 20px 20px 90px/200px 40px 40px 200px;
  -moz-border-radius: 90px 20px 20px 90px/200px 40px 40px 200px;
  -ms-border-radius: 90px 20px 20px 90px/200px 40px 40px 200px;
  border-radius: 90px 20px 20px 90px/200px 40px 40px 200px;
}

.baymax-left-arm:after {
  left: -20px;
}

.baymax-left-arm .larm-highlight {
  left: 30%;
}

.baymax-right-arm {
  right: 65px;
  -webkit-transform: rotate(-25deg);
  -moz-transform: rotate(-25deg);
  -ms-transform: rotate(-25deg);
  -o-transform: rotate(-25deg);
  transform: rotate(-25deg);
  -webkit-border-radius: 20px 90px 90px 20px/40px 200px 200px 40px;
  -moz-border-radius: 20px 90px 90px 20px/40px 200px 200px 40px;
  -ms-border-radius: 20px 90px 90px 20px/40px 200px 200px 40px;
  border-radius: 20px 90px 90px 20px/40px 200px 200px 40px;
}

.baymax-right-arm:after {
  right: -20px;
}

.baymax-right-arm .rarm-highlight {
  right: 30%;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.baymax-arm</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">28px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">145px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.baymax-arm</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">top</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25px</span>;
}

<span class="hljs-selector-class">.baymax-arm</span> <span class="hljs-selector-class">.arm-highlight</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">65%</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">16px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">16px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">16px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
}

<span class="hljs-selector-class">.baymax-left-arm</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">65px</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(25deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(25deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(25deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(25deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(25deg);
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">90px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">90px</span>/<span class="hljs-number">200px</span> <span class="hljs-number">40px</span> <span class="hljs-number">40px</span> <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">90px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">90px</span>/<span class="hljs-number">200px</span> <span class="hljs-number">40px</span> <span class="hljs-number">40px</span> <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">90px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">90px</span>/<span class="hljs-number">200px</span> <span class="hljs-number">40px</span> <span class="hljs-number">40px</span> <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">90px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">90px</span>/<span class="hljs-number">200px</span> <span class="hljs-number">40px</span> <span class="hljs-number">40px</span> <span class="hljs-number">200px</span>;
}

<span class="hljs-selector-class">.baymax-left-arm</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.baymax-left-arm</span> <span class="hljs-selector-class">.larm-highlight</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">30%</span>;
}

<span class="hljs-selector-class">.baymax-right-arm</span> {
  <span class="hljs-attribute">right</span>: <span class="hljs-number">65px</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(-25deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(-25deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(-25deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(-25deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-25deg);
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">20px</span> <span class="hljs-number">90px</span> <span class="hljs-number">90px</span> <span class="hljs-number">20px</span>/<span class="hljs-number">40px</span> <span class="hljs-number">200px</span> <span class="hljs-number">200px</span> <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">20px</span> <span class="hljs-number">90px</span> <span class="hljs-number">90px</span> <span class="hljs-number">20px</span>/<span class="hljs-number">40px</span> <span class="hljs-number">200px</span> <span class="hljs-number">200px</span> <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">20px</span> <span class="hljs-number">90px</span> <span class="hljs-number">90px</span> <span class="hljs-number">20px</span>/<span class="hljs-number">40px</span> <span class="hljs-number">200px</span> <span class="hljs-number">200px</span> <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">20px</span> <span class="hljs-number">90px</span> <span class="hljs-number">90px</span> <span class="hljs-number">20px</span>/<span class="hljs-number">40px</span> <span class="hljs-number">200px</span> <span class="hljs-number">200px</span> <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-class">.baymax-right-arm</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.baymax-right-arm</span> <span class="hljs-selector-class">.rarm-highlight</span> {
  <span class="hljs-attribute">right</span>: <span class="hljs-number">30%</span>;
}
</code></pre>
<h3 id="articleHeader3">第四步：双腿</h3>
<p><span class="img-wrap"><img data-src="/img/bVvI6e" src="https://static.alili.tech/img/bVvI6e" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;baymax-leg baymax-left-leg&quot;>
    <div class=&quot;leg-highlight lleg-highlight&quot;></div>
    <div class=&quot;crosspart&quot;></div>
</div>
<div class=&quot;baymax-leg baymax-right-leg&quot;>
    <div class=&quot;leg-highlight rleg-highlight&quot;></div>
    <div class=&quot;crosspart&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-leg baymax-left-leg"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"leg-highlight lleg-highlight"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"crosspart"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"baymax-leg baymax-right-leg"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"leg-highlight rleg-highlight"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"crosspart"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".baymax-leg {
  position: absolute;
  top: 165px;
  width: 48px;
  height: 85px;
  overflow: hidden;
  z-index: 1;
}

.baymax-leg:before {
  top: -50px;
  height: 100px;
  width: 30px;
}

.baymax-leg:after {
  bottom: -22px;
  height: 30px;
  width: 60px;
}

.baymax-leg .leg-highlight {
  position: absolute;
  top: 40%;
  width: 1%;
  height: 38%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  background: #ffffff;
  -webkit-box-shadow: 0 0 16px 7px rgba(255, 255, 255, 0.8), 0 0 0 0 transparent;
  -moz-box-shadow: 0 0 16px 7px rgba(255, 255, 255, 0.8), 0 0 0 0 transparent;
  box-shadow: 0 0 16px 7px rgba(255, 255, 255, 0.8), 0 0 0 0 transparent;
}

.baymax-leg .crosspart {
  content: &quot;&quot;;
  position: absolute;
  top: 0;
  width: 48px;
  height: 85px;
  -webkit-box-shadow: inset 0px 0px 15px 0px #cccccc, 0 0 0 0 transparent;
  -moz-box-shadow: inset 0px 0px 15px 0px #cccccc, 0 0 0 0 transparent;
  box-shadow: inset 0px 0px 15px 0px #cccccc, 0 0 0 0 transparent;
}

.baymax-left-leg {
  left: 50%;
  margin-left: -50px;
  -webkit-border-radius: 20% 0 30% 50%/50% 0 30% 50%;
  -moz-border-radius: 20% 0 30% 50%/50% 0 30% 50%;
  -ms-border-radius: 20% 0 30% 50%/50% 0 30% 50%;
  border-radius: 20% 0 30% 50%/50% 0 30% 50%;
}

.baymax-left-leg:before {
  left: -20px;
}

.baymax-left-leg:after {
  left: 0;
}

.baymax-left-leg .lleg-highlight {
  left: 25px;
  -webkit-transform: rotate(-5deg);
  -moz-transform: rotate(-5deg);
  -ms-transform: rotate(-5deg);
  -o-transform: rotate(-5deg);
  transform: rotate(-5deg);
}

.baymax-right-leg {
  right: 50%;
  margin-right: -50px;
  -webkit-border-radius: 0 20% 50% 30%/0 50% 50% 30%;
  -moz-border-radius: 0 20% 50% 30%/0 50% 50% 30%;
  -ms-border-radius: 0 20% 50% 30%/0 50% 50% 30%;
  border-radius: 0 20% 50% 30%/0 50% 50% 30%;
}

.baymax-right-leg:before {
  right: -20px;
}

.baymax-right-leg:after {
  right: 0;
}

.baymax-right-leg .rleg-highlight {
  right: 20px;
  -webkit-transform: rotate(5deg);
  -moz-transform: rotate(5deg);
  -ms-transform: rotate(5deg);
  -o-transform: rotate(5deg);
  transform: rotate(5deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.baymax-leg</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">165px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">48px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">85px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.baymax-leg</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
}

<span class="hljs-selector-class">.baymax-leg</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">22px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
}

<span class="hljs-selector-class">.baymax-leg</span> <span class="hljs-selector-class">.leg-highlight</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">40%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">38%</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">16px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">16px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">16px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.8), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
}

<span class="hljs-selector-class">.baymax-leg</span> <span class="hljs-selector-class">.crosspart</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">48px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">85px</span>;
  <span class="hljs-attribute">-webkit-box-shadow</span>: inset <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">15px</span> <span class="hljs-number">0px</span> <span class="hljs-number">#cccccc</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">-moz-box-shadow</span>: inset <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">15px</span> <span class="hljs-number">0px</span> <span class="hljs-number">#cccccc</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">15px</span> <span class="hljs-number">0px</span> <span class="hljs-number">#cccccc</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> transparent;
}

<span class="hljs-selector-class">.baymax-left-leg</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">20%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">20%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">20%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">20%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>/<span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.baymax-left-leg</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.baymax-left-leg</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.baymax-left-leg</span> <span class="hljs-selector-class">.lleg-highlight</span> {
  <span class="hljs-attribute">left</span>: <span class="hljs-number">25px</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-5deg);
}

<span class="hljs-selector-class">.baymax-right-leg</span> {
  <span class="hljs-attribute">right</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">20%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>/<span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>;
  <span class="hljs-attribute">-moz-border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">20%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>/<span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>;
  <span class="hljs-attribute">-ms-border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">20%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>/<span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">20%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>/<span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">30%</span>;
}

<span class="hljs-selector-class">.baymax-right-leg</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">right</span>: -<span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.baymax-right-leg</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.baymax-right-leg</span> <span class="hljs-selector-class">.rleg-highlight</span> {
  <span class="hljs-attribute">right</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(5deg);
}</code></pre>
<p><strong>欢迎大家吐槽</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【二次元的CSS】—— 用 DIV + CSS3 画大白（详解步骤）

## 原文链接
[https://segmentfault.com/a/1190000005139322](https://segmentfault.com/a/1190000005139322)

