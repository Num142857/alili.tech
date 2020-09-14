---
title: 'CSS魔法堂：Box-Shadow 没那么简单啦:)' 
date: 2019-02-10 2:30:42
hidden: true
slug: isk04d3yhes
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>说起box-shadow那第一个想法当然就是用来实现阴影，其实它还能用于实现其他好玩的效果的，本篇就打算说说box-shadow的那些事。</p>
<h2 id="articleHeader1">二话不说看效果</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006781652" src="https://static.alili.tech/img/remote/1460000006781652" alt="" title="" style="cursor: pointer; display: inline;"></span><br><em>3D小球</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.ball{
  background: rgba(100,100,100,0.2);
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 50%;
  box-shadow: -14px 8px 100px #333 inset, 
              0 0 2px #888,
          3px -1px 4px #444;
}
</style>
<div class=&quot;ball&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.ball</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(100,100,100,0.2);
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">14px</span> <span class="hljs-number">8px</span> <span class="hljs-number">100px</span> <span class="hljs-number">#333</span> inset, 
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">#888</span>,
          <span class="hljs-number">3px</span> -<span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-number">#444</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094324" src="https://static.alili.tech/img/remote/1460000005094324" alt="" title="" style="cursor: pointer;"></span><br><em>纸张阴影(来自@张鑫旭老师)</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.curved_box {
    display: inline-block;
    *display: inline;
    width: 200px;
    height: 248px;
    margin: 20px;
    background-color: #fff;
    border: 1px solid #eee;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset; 
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    position: relative;
    *zoom: 1;
}

.curved_box:before {
    -webkit-transform: skew(-15deg) rotate(-6deg);
    -moz-transform: skew(-15deg) rotate(-6deg);
    transform: skew(-15deg) rotate(-6deg);
    left: 15px;
}
.curved_box:after {
    -webkit-transform: skew(15deg) rotate(6deg);
    -moz-transform: skew(15deg) rotate(6deg);
    transform: skew(15deg) rotate(6deg);
    right: 15px;
}

.curved_box:before, .curved_box:after {
    width: 70%;
    height: 55%;
    content: ' ';
    
    -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    
    position: absolute;
    bottom: 10px;
    z-index: -1;    
}
</style>
<div class=&quot;curved_box&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;<span class="hljs-built_in">style</span> type=<span class="hljs-string">"text/css"</span>&gt;
.curved_box {
    <span class="hljs-built_in">display</span>: inline-<span class="hljs-built_in">block</span>;
    *<span class="hljs-built_in">display</span>: inline;
    <span class="hljs-built_in">width</span>: 200px;
    <span class="hljs-built_in">height</span>: 248px;
    margin: 20px;
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: #fff;
    <span class="hljs-built_in">border</span>: 1px solid #eee;
    -webkit-<span class="hljs-built_in">box</span>-shadow: <span class="hljs-number">0</span> 1px 4px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.27</span>), <span class="hljs-number">0</span> <span class="hljs-number">0</span> 60px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.06</span>) inset;
    -moz-<span class="hljs-built_in">box</span>-shadow: <span class="hljs-number">0</span> 1px 4px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.27</span>), <span class="hljs-number">0</span> <span class="hljs-number">0</span> 40px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.06</span>) inset; 
    <span class="hljs-built_in">box</span>-shadow: <span class="hljs-number">0</span> 1px 4px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.27</span>), <span class="hljs-number">0</span> <span class="hljs-number">0</span> 40px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.06</span>) inset;
    <span class="hljs-built_in">position</span>: relative;
    *zoom: <span class="hljs-number">1</span>;
}

.curved_box:before {
    -webkit-<span class="hljs-built_in">transform</span>: skew(-15deg) rotate(-6deg);
    -moz-<span class="hljs-built_in">transform</span>: skew(-15deg) rotate(-6deg);
    <span class="hljs-built_in">transform</span>: skew(-15deg) rotate(-6deg);
    left: 15px;
}
.curved_box:after {
    -webkit-<span class="hljs-built_in">transform</span>: skew(15deg) rotate(6deg);
    -moz-<span class="hljs-built_in">transform</span>: skew(15deg) rotate(6deg);
    <span class="hljs-built_in">transform</span>: skew(15deg) rotate(6deg);
    right: 15px;
}

.curved_box:before, .curved_box:after {
    <span class="hljs-built_in">width</span>: <span class="hljs-number">70</span><span class="hljs-symbol">%</span>;
    <span class="hljs-built_in">height</span>: <span class="hljs-number">55</span><span class="hljs-symbol">%</span>;
    <span class="hljs-built_in">content</span>: ' ';
    
    -webkit-<span class="hljs-built_in">box</span>-shadow: <span class="hljs-number">0</span> 8px 16px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.3</span>);
    -moz-<span class="hljs-built_in">box</span>-shadow: <span class="hljs-number">0</span> 8px 16px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.3</span>); 
    <span class="hljs-built_in">box</span>-shadow: <span class="hljs-number">0</span> 8px 16px rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.3</span>);
    
    <span class="hljs-built_in">position</span>: absolute;
    bottom: 10px;
    z-index: -<span class="hljs-number">1</span>;    
}
&lt;/<span class="hljs-built_in">style</span>&gt;
&lt;div class=<span class="hljs-string">"curved_box"</span>&gt;&lt;/div&gt;</code></pre>
<h2 id="articleHeader2">细读属性</h2>
<p>看到上面这么绚丽的效果，是不是迫不及待想弄清box-shadow呢？下面我们来一步步解密它吧！</p>
<h3 id="articleHeader3">概述属性语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-shadow: none | <shadow>[,<shadow>]*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">box-shadow: <span class="hljs-keyword">none</span> | <span class="hljs-variable">&lt;shadow&gt;</span>[,<span class="hljs-variable">&lt;shadow&gt;</span>]*</code></pre>
<p>默认值为<code>none</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<shadow>`:`inset? &amp;&amp; <length>{2,4} &amp;&amp; <color>?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">shadow</span>&gt;</span>`:`inset? &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">length</span>&gt;</span></span><span class="hljs-template-variable">{2,4}</span><span class="xml"> &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">color</span>&gt;</span>?</span></code></pre>
<ul>
<li><p><strong>shadow pattern</strong> 默认为outset，即采用outer box-shadow。通过设置为inset时，则采用inner box-shadow。</p></li>
<li><p><strong>horizontal offset</strong> 阴影距离原位置的水平位移，正数表示向右移动，负数表示向左移动。</p></li>
<li><p><strong>vertical offset</strong> 阴影距离原位置的垂直位移，正数表示向下移动，负数表示向上移动。</p></li>
<li><p><strong>blur radius</strong> 默认值为0，阴影模糊度半径。</p></li>
<li><p><strong>spread distance</strong> 默认值为0，扩展或缩小阴影的作用面积。</p></li>
<li><p><strong><code>&lt;color&gt;</code></strong> 阴影颜色，默认与<code>color</code>属性一致。</p></li>
</ul>
<p>注意：我们可以同时设置多个阴影，而阴影的z-index值从左向右递减。</p>
<h3 id="articleHeader4">outer box-shadow 和 inner box-shadow怎么玩？</h3>
<p>默认情况下采用的是outer box-shadow，当在<code>box-shadow</code>中添加inset关键词后，则采用inner box-shadow了，但到底它俩的效果是如何的呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094329" src="https://static.alili.tech/img/remote/1460000005094329" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.box{
  float: left;

  background: #888;
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.outer-box-shadow{
  box-shadow: 10px 10px #F00;
}
.inner-box-shadow{
  box-shadow: 10px 10px #F00 inset;
}
</style>
<div class=&quot;box outer-box-shadow&quot;></div>
<div class=&quot;box inner-box-shadow&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">float</span>: left;

  <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.outer-box-shadow</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">#F00</span>;
}
<span class="hljs-selector-class">.inner-box-shadow</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">#F00</span> inset;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box outer-box-shadow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box inner-box-shadow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>outer-box-shadow</strong></p>
<p>特点：阴影落在元素的border box之外。</p>
<p>实现原理：</p>
<ol>
<li><p>创建一个与元素border box尺寸一致的阴影盒子;</p></li>
<li><p>将阴影盒子定位到于元素border box重合，并位于元素之下;</p></li>
<li><p>根据<code>horizontal offset</code>和<code>vertical offset</code>来相对原位置作移动;</p></li>
<li><p>根据<code>spread distance</code>缩放阴影盒子的尺寸（会改变盒子的位移）;</p></li>
<li><p>根据<code>blur radius</code>对阴影盒子作加工;</p></li>
<li><p>最后将阴影盒子与元素border box重合部分剪切掉。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094333" src="https://static.alili.tech/img/remote/1460000005094333" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.box{
  background: #888;
  width: 100px;
  height: 100px;
}
.outer-box-shadow{
  box-shadow: 90px 10px #F00;
}
</style>
<div class=&quot;box outer-box-shadow&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.outer-box-shadow</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">90px</span> <span class="hljs-number">10px</span> <span class="hljs-number">#F00</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box outer-box-shadow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>模拟一下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094344" src="https://static.alili.tech/img/remote/1460000005094344" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.box{
  position: relative;
}
.box-shadow{
  position: absolute;
  z-index: -1;
  background: #F00;
  width: 100px;
  height: 100px;
  left: 20px;
  top: 20px;
}
.box-content{
  background: #888;
  width: 100px;
  height: 100px;
}
</style>
<div class=&quot;box&quot;>
  <div class=&quot;box-shadow&quot;></div>
  <div class=&quot;box-content&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.box-shadow</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#F00</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.box-content</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-shadow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>inner-box-shadow</strong></p>
<p>特点：阴影落在元素的padding box之内。</p>
<p>实现原理(纯个人理解)：</p>
<ol>
<li><p>创建一个与元素padding box尺寸一致的阴影盒子;</p></li>
<li><p>将阴影盒子定位到于元素padding box重合，并位于元素之上;</p></li>
<li><p>水平和垂直各画两条线，分别跟元素padding edge重合;(共4条分别记为left/top/right/bottom-guideline)</p></li>
<li><p>根据<code>horizontal offset</code>和<code>vertical offset</code>移动left/top/right/bottom-guideline。</p></li>
<li><p>根据<code>spread distance</code>移动4条线。spread distance为正数时，left-guideline向右移动，top-guideline向下移动，right-guideline向左移动和bottom-guidelien向上移动；spread distance为负数时，则相反。</p></li>
<li><p>根据<code>blur radius</code>加工元素各padding edge至其对应的guideline间的区域.</p></li>
<li>
<p>对阴影盒子进行剪裁</p>
<ol>
<li><p>剪切掉不与元素padding box重叠的部分；</p></li>
<li><p>仅显示元素各padding edge至其对应的guideline间的区域。</p></li>
</ol>
</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094346" src="https://static.alili.tech/img/remote/1460000005094346" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.box{
  float: left;
  background: #888;
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.box1{
  box-shadow: 0 0 0 20px red inset;
}
.box2{
  box-shadow: 10px 0 0 20px red inset;
}
.box3{
  box-shadow: 10px 0 10px 20px red inset;
}
.box4{
  box-shadow: 0 0 10px 50px red inset;
}
</style>
<div class=&quot;box box1&quot;></div>
<div class=&quot;box box2&quot;></div>
<div class=&quot;box box3&quot;></div>
<div class=&quot;box box4&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.box1</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> red inset;
}
<span class="hljs-selector-class">.box2</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> red inset;
}
<span class="hljs-selector-class">.box3</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">20px</span> red inset;
}
<span class="hljs-selector-class">.box4</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">50px</span> red inset;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box box4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>模拟一下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094348" src="https://static.alili.tech/img/remote/1460000005094348" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.box-shadow{
  position: relative;
  display: inline-block;
  background: red;
  overflow: hidden;
}
.bg{
  position: absolute;
  background: #888;
  left: 30px;
  right: 10px;
  top: 20px;
  bottom: 20px;
}
.content{
  position: relative;
  z-index: 1;
  width: 80px;
  height: 80px;
  padding: 20px;
}
</style>
<div class=&quot;box-shadow&quot;>
  <div class=&quot;bg&quot;></div>
  <div class=&quot;content&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box-shadow</span>{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">background</span>: red;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.bg</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.content</span>{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-shadow"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader5">模糊边框 by <code>blur radius</code>
</h3>
<p>W3C spec中没有规定浏览器厂商使用哪种方式实现模糊效果，反正效果与高斯模糊效果差不多就是了。但有一点我们需要注意的，那就是<strong>模糊效果会扩大阴影的面积</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094342" src="https://static.alili.tech/img/remote/1460000005094342" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.outline{
  border: 1px solid red;
  margin: 40px 0;
}
.s{
  background: rgba(255, 100, 100, 0.1);
  width: 100px;
  height: 100px;
}
.s1{
  box-shadow: 110px 0 0 #333;
}
.s2{
  box-shadow: 110px 0 20px #333;
}
.s3{
  box-shadow: 110px 0 40px #333;
}
</style>
<div class=&quot;outline&quot;>
  <div class=&quot;s s1&quot;>sample1</div>
</div>
<div class=&quot;outline&quot;>
  <div class=&quot;s s2&quot;>sample2</div>
</div>
<div class=&quot;outline&quot;>
  <div class=&quot;s s3&quot;>sample3</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.outline</span>{
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">40px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.s</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(255, 100, 100, 0.1);
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.s1</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-class">.s2</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-class">.s3</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span> <span class="hljs-number">#333</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outline"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s s1"</span>&gt;</span>sample1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outline"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s s2"</span>&gt;</span>sample2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outline"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s s3"</span>&gt;</span>sample3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>sample1是<code>blur radius</code>为0的效果，可以看到阴影尺寸与元素尺寸一模一样。而sample2是<code>blur radius</code>为20px的效果，可以看到阴影尺寸有所扩展了，而sample3则扩展得更多一些。</p>
<p>现在我们感性上认知到<code>blur radius</code>值大于0时会扩展阴影尺寸，那么到底扩展多少呢？那我们要先明确模糊发生的起始位置了。</p>
<ol>
<li><p>对于outer-shadow-box而言，模糊发生的起始位置就是阴影盒子的各边；</p></li>
<li><p>对于inner-shadow-box而言，模糊发生的起始位置就是各guideline。</p></li>
</ol>
<p>然后模糊效果是从发生的位置，对于水平方向的边或guideline则向垂直方向发散，对于垂直方向的边或guideline则向水平方向发散，且发散的距离相同。</p>
<p>发散的距离相同，因此每个方向各发散为<strong><code>blur radius/2</code></strong>的距离。看sample3中阴影尺寸已经与元素盒子重叠了，因为阴影盒子左边框向左发散了20px了，超过它俩之间10px的水平距离了，而sample2则恰恰邻近而已。</p>
<h3 id="articleHeader6">缩放阴影尺寸 by <code>spread distance</code>
</h3>
<p>如果说<code>blur radius</code>是暗地里扩大阴影的尺寸，那么<code>spread distance</code>则是明目张胆地缩放阴影的尺寸了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094350" src="https://static.alili.tech/img/remote/1460000005094350" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.outline{
  border: 1px solid red;
  margin: 40px 0;
}
.s{
  background: rgba(255, 100, 100, 0.1);
  width: 100px;
  height: 100px;
}
.s1{
  box-shadow: 110px 0 0 #333;
}
.s2{
  box-shadow: 110px 0 0 10px #333;
}
.s3{
  box-shadow: 110px 0 0 -10px #333;
}
</style>
<div class=&quot;outline&quot;>
  <div class=&quot;s s1&quot;>sample1</div>
</div>
<div class=&quot;outline&quot;>
  <div class=&quot;s s2&quot;>sample2</div>
</div>
<div class=&quot;outline&quot;>
  <div class=&quot;s s3&quot;>sample3</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.outline</span>{
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">40px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.s</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(255, 100, 100, 0.1);
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.s1</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-class">.s2</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-class">.s3</span>{
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">10px</span> <span class="hljs-number">#333</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outline"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s s1"</span>&gt;</span>sample1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outline"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s s2"</span>&gt;</span>sample2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"outline"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s s3"</span>&gt;</span>sample3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>还记得<a href="http://www.cnblogs.com/fsjohnhuang/p/5436087.html" rel="nofollow noreferrer" target="_blank">《CSS魔法堂：重拾Border之——解构Border》</a>中提及通过<code>border-top/right/bottom/left-colors</code>实现彩虹边框吗？由于兼容性问题和1px对应一种color的缘故，实际应用得很少，但通过outer-box-shadow和<code>spread distance</code>我们就可以得到效果更好，兼容性很高的实现方案了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094352" src="https://static.alili.tech/img/remote/1460000005094352" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.rainbow{
  margin: 50px;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 0 2px rgb(255,0,0),
              0 0 0 5px rgb(255,165,0),
              0 0 0 8px rgb(255,255,0),
              0 0 0 10px rgb(0,255,0),
              0 0 0 12px rgb(0,127,255),
              0 0 0 15px rgb(0,0,255),
              0 0 0 20px rgb(139,0,255);
}
</style>
<div class=&quot;rainbow&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.rainbow</span>{
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-built_in">rgb</span>(255,0,0),
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-built_in">rgb</span>(255,165,0),
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-built_in">rgb</span>(255,255,0),
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgb</span>(0,255,0),
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">12px</span> <span class="hljs-built_in">rgb</span>(0,127,255),
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">15px</span> <span class="hljs-built_in">rgb</span>(0,0,255),
              <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-built_in">rgb</span>(139,0,255);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rainbow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader7">弄清各图层的z-index</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094354" src="https://static.alili.tech/img/remote/1460000005094354" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图可以看到没有阴影时，各图层的z-index顺序。那么阴影呢？</p>
<ol>
<li><p>对于outer-box-shadow，则其z-index高于margin图层，低于background-color图层;</p></li>
<li><p>对于inner-box-shadow，则其z-index高于padding图层，低于content图层。</p></li>
</ol>
<h3 id="articleHeader8">阴影的position</h3>
<p>通过<code>horizontal/vertical offset</code>重定位阴影盒子，通过<code>blur radius</code>或<code>spread distance</code>缩放阴影盒子的尺寸，但请注意的是<strong>阴影盒子不影响其他盒子的布局</strong>，其实阴影盒子就相当于采用absolute定位一样，不会占据Normal flow的空间，也不会影响其他元素的布局，因此仅修改阴影位置或尺寸时，只会触发repaint，而不会触发reflow。</p>
<h2 id="articleHeader9">圆角or直角box-shadow傻傻分不清楚？</h2>
<p>阴影不仅默认尺寸与元素盒子一致，默认形状也一致。也就是元素盒子采用圆角时，阴影的默认形状也是圆角的。既然说是默认形状一致，就是说可以不一致咯！那到底如何不一致呢，下面我们一起来看个究竟吧！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094355" src="https://static.alili.tech/img/remote/1460000005094355" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.s1{
  background: #0EF;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 110px 0 0 -10px #333,
        220px 0 0 0 #666,
        360px 0 0 20px #888;
}
</style>
<div class=&quot;s1&quot;>sample1</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.s1</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#0EF</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">10px</span> <span class="hljs-number">#333</span>,
        <span class="hljs-number">220px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#666</span>,
        <span class="hljs-number">360px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">#888</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s1"</span>&gt;</span>sample1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>当设置<code>spread distance</code>后，border-radius的值也将随之变化，具体公式为<code>border-radius + spread-distance * (1 + (border-radius / spread-distance - 1)^3)</code>。<br>因此<code>spread distance</code>为正数时，border-radius会变大; 而<code>spread distance</code>为负数时，border-radius会减小，直至为0px为止。</p>
<h2 id="articleHeader10">被割裂的box-shadow</h2>
<p>当设置box-shadow的盒子被拆分为多个盒子时，其对应的box-shadow又会如何呢？其实这不仅仅是box-shadow的问题，如border、background-image等均会遇到同样的问题。CSS3中引入一个新特性<code>box-decoration-break</code>来设置上述情况时的渲染效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-decoration-break: slice | clone" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">box</span>-decoration-<span class="hljs-keyword">break</span>: slice | clone</code></pre>
<ul>
<li><p><strong>slice</strong>是默认值，表示首先按未拆分时的状态渲染border、background-image等样式，然后再将其直接拆分为多个盒子;</p></li>
<li><p><strong>clone</strong>表示首先将其直接拆分为多个盒子，然后再逐个盒子渲染border、background-image等样式。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094357" src="https://static.alili.tech/img/remote/1460000005094357" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.intro{
  font-size: 14px;
  line-height: 1.5;
  text-indent: 1em;
  width: 300px;
}
.intro span{
  border: 1px solid #666;
  border-radius: 5px;
  box-shadow: 5px 3px 3px #AAA;
}
.slice{
  -webkit-box-decoration-break: slice;
}
.clone{
  -webkit-box-decoration-break: clone;
}
</style>
<p class=&quot;intro&quot;>
<span class=&quot;slice&quot;>
Hey there, welcome to be here to share something aboute CSS together:) My name is fsjohnhuang, a FE from Midea. Enjoy the evolution of FE, and feel excited in the work I'm doing now.
</span>
</p>
<p class=&quot;intro&quot;>
<span class=&quot;clone&quot;>
Hey there, welcome to be here to share something aboute CSS together:) My name is fsjohnhuang, a FE from Midea. Enjoy the evolution of FE, and feel excited in the work I'm doing now.
</span>
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.intro</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5</span>;
  <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
}
<span class="hljs-selector-class">.intro</span> <span class="hljs-selector-tag">span</span>{
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#666</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">5px</span> <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">#AAA</span>;
}
<span class="hljs-selector-class">.slice</span>{
  <span class="hljs-attribute">-webkit-box-decoration-break</span>: slice;
}
<span class="hljs-selector-class">.clone</span>{
  <span class="hljs-attribute">-webkit-box-decoration-break</span>: clone;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"intro"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slice"</span>&gt;</span>
Hey there, welcome to be here to share something aboute CSS together:) My name is fsjohnhuang, a FE from Midea. Enjoy the evolution of FE, and feel excited in the work I'm doing now.
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"intro"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clone"</span>&gt;</span>
Hey there, welcome to be here to share something aboute CSS together:) My name is fsjohnhuang, a FE from Midea. Enjoy the evolution of FE, and feel excited in the work I'm doing now.
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>从上面可以看到，与其说<code>box-decoration-break</code>的属性值影响<code>box-shadow</code>的效果，还不如说是<code>box-decoration-break</code>的属性值影响<code>border-radius</code>和<code>border</code>作用到元素盒子的效果，然后由盒子的效果再间接影响<code>box-shadow</code>的效果。</p>
<p><strong>兼容性</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094359" src="https://static.alili.tech/img/remote/1460000005094359" alt="" title="" style="cursor: pointer;"></span></p>
<p>IE和Edge均不支持，FF支持得最好，而Webkit内核的则要加-webkit-前缀。对于不支持的浏览器，其效果如同<code>box-decoration-break:slice</code>。</p>
<h2 id="articleHeader11">兼容性</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005094361" src="https://static.alili.tech/img/remote/1460000005094361" alt="" title="" style="cursor: pointer;"></span></p>
<p>IE9都支持<code>box-shadow</code>多让人可喜可贺的消息啊（因为我工作中只需兼容IE9+就Ok了:)）。但IE6~8呢？方案很多啦，上面也有简单的介绍到。@张鑫旭老师提到在模拟blur radius效果时，采用以下方案</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ieBlock{
    height:100px;
    width:100px;
    background:#000;
    filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=10);
    -ms-filter:&quot;progid:DXImageTransform.Microsoft.Blur(pixelradius=10)&quot;; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ieBlock</span>{
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
    <span class="hljs-attribute">filter</span>:progid:DXImageTransform.Microsoft.<span class="hljs-built_in">Blur</span>(pixelradius=10);
    <span class="hljs-attribute">-ms-filter</span>:<span class="hljs-string">"progid:DXImageTransform.Microsoft.Blur(pixelradius=10)"</span>; 
}</code></pre>
<p>要比采用以下方案要好！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shadow {
    -moz-box-shadow: 3px 3px 4px #000;
    -webkit-box-shadow: 3px 3px 4px #000;
    box-shadow: 3px 3px 4px #000;
    /* For IE 8 */
    -ms-filter: &quot;progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')&quot;;
    /* For IE 5.5 - 7 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.shadow</span> {
    <span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">4px</span> <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">4px</span> <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">4px</span> <span class="hljs-number">#000</span>;
    <span class="hljs-comment">/* For IE 8 */</span>
    <span class="hljs-attribute">-ms-filter</span>: <span class="hljs-string">"progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')"</span>;
    <span class="hljs-comment">/* For IE 5.5 - 7 */</span>
    <span class="hljs-attribute">filter</span>: progid:DXImageTransform.Microsoft.<span class="hljs-built_in">Shadow</span>(Strength=4, Direction=135, Color=<span class="hljs-string">'#000000'</span>);
}</code></pre>
<p>另外若想不假思索地用到生产环境中，还是用成熟的CSS库较好。具体请参考 <a href="http://www.zhangxinxu.com/wordpress/2010/07/pie%E4%BD%BFie%E6%94%AF%E6%8C%81css3%E5%9C%86%E8%A7%92%E7%9B%92%E9%98%B4%E5%BD%B1%E4%B8%8E%E6%B8%90%E5%8F%98%E6%B8%B2%E6%9F%93/" rel="nofollow noreferrer" target="_blank">PIE使IE支持CSS3圆角盒阴影与渐变渲染</a>。</p>
<h2 id="articleHeader12">总结</h2>
<p>尊重原创，转载请注明来自：<a href="http://www.cnblogs.com/fsjohnhuang/p/5477194.html%5E_%5E" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fsjohnhuang/p/5477194.html^_^</a>肥仔John</p>
<h2 id="articleHeader13">感谢</h2>
<p><a href="https://www.w3.org/TR/css3-background/#the-box-shadow" rel="nofollow noreferrer" target="_blank">the-box-shadow</a><br><a href="https://www.w3.org/TR/2014/WD-css3-break-20140116/#break-decoration" rel="nofollow noreferrer" target="_blank">break-decoration</a><br><a href="http://www.zhangxinxu.com/wordpress/2010/12/css3-box-shadow%E5%AE%9E%E7%8E%B0%E7%BA%B8%E5%BC%A0%E7%9A%84%E6%9B%B2%E7%BA%BF%E6%8A%95%E5%BD%B1%E6%95%88%E6%9E%9C/" rel="nofollow noreferrer" target="_blank">CSS3 box-shadow实现纸张的曲线投影效果</a><br><a href="http://www.zhangxinxu.com/wordpress/2010/04/css%E5%AE%9E%E7%8E%B0%E8%B7%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7%E7%9A%84%E7%9B%92%E9%98%B4%E5%BD%B1%E6%95%88%E6%9E%9C/" rel="nofollow noreferrer" target="_blank">CSS实现跨浏览器兼容性的盒阴影效果</a><br><a href="http://www.zhangxinxu.com/wordpress/2010/07/css%E5%AE%9E%E7%8E%B0%E8%B7%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84box-shadow%E7%9B%92%E9%98%B4%E5%BD%B1%E6%95%88%E6%9E%9C2/" rel="nofollow noreferrer" target="_blank">CSS实现跨浏览器的box-shadow盒阴影效果(2)</a><br><a href="http://www.zhangxinxu.com/wordpress/2010/07/pie%E4%BD%BFie%E6%94%AF%E6%8C%81css3%E5%9C%86%E8%A7%92%E7%9B%92%E9%98%B4%E5%BD%B1%E4%B8%8E%E6%B8%90%E5%8F%98%E6%B8%B2%E6%9F%93/" rel="nofollow noreferrer" target="_blank">PIE使IE支持CSS3圆角盒阴影与渐变渲染</a><br>《图解CSS3核心技术与案例实战》 —— 3.5 CSS3盒子阴影属性</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：Box-Shadow 没那么简单啦:)

## 原文链接
[https://segmentfault.com/a/1190000005094319](https://segmentfault.com/a/1190000005094319)

