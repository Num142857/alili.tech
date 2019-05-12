---
title: '【二次元的CSS】—— 用 DIV + CSS3 画咸蛋超人（详解步骤）' 
date: 2019-02-10 2:30:42
hidden: true
slug: nr8hit67t1
categories: [reprint]
---

{{< raw >}}

                    
<p>仅仅使用div作为身体的布局，用css3的各种transform和圆角属性来绘制各部位的形状，当然也不会使用任何图片哦。那就没意思了。<br>有的同学说，用canvas不是能画得更逼真而且更简单吗？这点我也非常赞同，但我的理由还是，那就没意思了。</p>
<p>这次写的详细一点，把各个部位都拆出来分析。</p>
<blockquote><p>GitHub传送门：<a href="https://github.com/lancer07/css3Ultraman" rel="nofollow noreferrer" target="_blank">https://github.com/lancer07/css3Ultraman</a></p></blockquote>
<h3 id="articleHeader0">第一步：头部轮廓</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzgq" src="https://static.alili.tech/img/bVvzgq" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header></header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;header&gt;</span><span class="hljs-section">&lt;/header&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ultraman header {
  border: 7px solid #000;
  border-top: 15px solid #000;
  width: 200px;
  height: 200px;
  border-radius: 50% 50% 60% 60%;
  position: absolute;
  background: #fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ultraman</span> <span class="hljs-selector-tag">header</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">7px</span> solid <span class="hljs-number">#000</span>;
  <span class="hljs-attribute">border-top</span>: <span class="hljs-number">15px</span> solid <span class="hljs-number">#000</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">60%</span> <span class="hljs-number">60%</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}</code></pre>
<h3 id="articleHeader1">第二步：就算作是头发吧</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzgG" src="https://static.alili.tech/img/bVvzgG" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
    <div class=&quot;hair&quot;></div>        
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hair"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ultraman header .hair {
  position: absolute;
  top: -40px;
  left: 80px;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 140px solid #000;
  border-radius: 30% 30% 50% 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ultraman</span> <span class="hljs-selector-tag">header</span> <span class="hljs-selector-class">.hair</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">80px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">20px</span> solid transparent;
  <span class="hljs-attribute">border-right</span>: <span class="hljs-number">20px</span> solid transparent;
  <span class="hljs-attribute">border-top</span>: <span class="hljs-number">140px</span> solid <span class="hljs-number">#000</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30%</span> <span class="hljs-number">30%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>;
}</code></pre>
<h3 id="articleHeader2">第三步：眼睛</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzhZ" src="https://static.alili.tech/img/bVvzhZ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
    <div class=&quot;hair&quot;></div>
    <div class=&quot;left_eye&quot;></div>
    <div class=&quot;right_eye&quot;></div>
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;header&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hair"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"left_eye"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"right_eye"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/header&gt;</span></code></pre>
<p><strong>因为我是用less写的嘛，所以先定义了一个眼睛的类，然后再生成2个眼睛</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eye(@l,@r,@deg){
    border:5px solid #000;
    width:70px;
    height:70px;
    background:#ffc30a;
    border-radius:@l @r;
    transform:rotate(@deg);
    position:absolute;
    top:60px;
}
.left_eye{
    .eye(50%,80%,-15deg);
    left:10px;
}
.right_eye{
    .eye(80%,50%,15deg);
    right:10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.eye</span>(<span class="hljs-variable">@l</span>,<span class="hljs-variable">@r</span>,<span class="hljs-variable">@deg</span>){
    <span class="hljs-attribute">border</span>:<span class="hljs-number">5px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">70px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">70px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#ffc30a</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-variable">@l</span> <span class="hljs-variable">@r</span>;
    <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-variable">@deg</span>);
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">60px</span>;
}
<span class="hljs-selector-class">.left_eye</span>{
    <span class="hljs-selector-class">.eye</span>(<span class="hljs-number">50%</span>,<span class="hljs-number">80%</span>,-<span class="hljs-number">15deg</span>);
    <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.right_eye</span>{
    <span class="hljs-selector-class">.eye</span>(<span class="hljs-number">80%</span>,<span class="hljs-number">50%</span>,<span class="hljs-number">15deg</span>);
    <span class="hljs-attribute">right</span>:<span class="hljs-number">10px</span>;
}</code></pre>
<h3 id="articleHeader3">第四步：耳朵</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzik" src="https://static.alili.tech/img/bVvzik" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
    <div class=&quot;hair&quot;></div>
    <div class=&quot;left_eye&quot;></div>
    <div class=&quot;right_eye&quot;></div>
    <div class=&quot;left_ear&quot;></div>
    <div class=&quot;right_ear&quot;></div>
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;header&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hair"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"left_eye"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"right_eye"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"left_ear"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"right_ear"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/header&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ear(@deg){
    width:20px;
    height:50px;
    border:5px solid #000;
    position:absolute;
    top:70px;
    z-index:-1;
    transform:rotate(@deg);
    background:#fff;
}
.left_ear{
    .ear(-7deg);
    left:-20px
}
.right_ear{
    .ear(7deg);
    right:-20px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.ear</span>(<span class="hljs-variable">@deg</span>){
    <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">5px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">70px</span>;
    <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-variable">@deg</span>);
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.left_ear</span>{
    <span class="hljs-selector-class">.ear</span>(-<span class="hljs-number">7deg</span>);
    <span class="hljs-attribute">left</span>:-<span class="hljs-number">20px</span>
}
<span class="hljs-selector-class">.right_ear</span>{
    <span class="hljs-selector-class">.ear</span>(<span class="hljs-number">7deg</span>);
    <span class="hljs-attribute">right</span>:-<span class="hljs-number">20px</span>
}</code></pre>
<h3 id="articleHeader4">第五步：小身体</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzi3" src="https://static.alili.tech/img/bVvzi3" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;body&quot;>
    <div class=&quot;light&quot;><span></span></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"body"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"light"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p><strong>身上有个灯，时间到了，会嘀嘟嘀嘟叫的，所以加一个动画效果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@keyframes jump{
    0%{
        background:#48e1e7;
    }
    50%{
        background:#961e1e;
    }
    100%{
        background:#48e1e7;
    }
}

.body{
        width:100px;
        height:80px;
        background:#fff;
        border:7px solid #000;
        position:absolute;
        top:180px;
        left:50px;
        border-radius:0 0 20% 20%;
        z-index:-1;
        .light{
            width:40px;
            height:40px;
            border:3px solid #000;
            position:relative;
            top:20px;
            left:30px;
            background:red;
            transform:rotate(-45deg);
            span{
                width:8px;
                height:8px;
                border:2px solid #000;
                background:#48e1e7;
                display:block;
                position:absolute;
                left:3px;
                top:26px;
                border-radius:50%;
                z-index:2;
                animation:jump 0.5s infinite;
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>
@keyframes jump{
    0%{
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#48e1e7</span>;
    }
    50%{
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#961e1e</span>;
    }
    100%{
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#48e1e7</span>;
    }
}

<span class="hljs-selector-class">.body</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">7px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">180px</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50px</span>;
        <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20%</span> <span class="hljs-number">20%</span>;
        <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">1</span>;
        <span class="hljs-selector-class">.light</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">40px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">3px</span> solid <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">position</span>:relative;
            <span class="hljs-attribute">top</span>:<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">30px</span>;
            <span class="hljs-attribute">background</span>:red;
            <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">45deg</span>);
            <span class="hljs-selector-tag">span</span>{
                <span class="hljs-attribute">width</span>:<span class="hljs-number">8px</span>;
                <span class="hljs-attribute">height</span>:<span class="hljs-number">8px</span>;
                <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#000</span>;
                <span class="hljs-attribute">background</span>:<span class="hljs-number">#48e1e7</span>;
                <span class="hljs-attribute">display</span>:block;
                <span class="hljs-attribute">position</span>:absolute;
                <span class="hljs-attribute">left</span>:<span class="hljs-number">3px</span>;
                <span class="hljs-attribute">top</span>:<span class="hljs-number">26px</span>;
                <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>;
                <span class="hljs-attribute">z-index</span>:<span class="hljs-number">2</span>;
                <span class="hljs-attribute">animation</span>:jump <span class="hljs-number">0.5s</span> infinite;
            }
        }
    }</code></pre>
<h3 id="articleHeader5">第六步：手</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzjF" src="https://static.alili.tech/img/bVvzjF" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;left_hand&quot;></div>
<div class=&quot;right_hand&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"left_hand"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"right_hand"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><strong>手只要旋转一下就好了，比出一个十字</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hand{
        width:30px;
        height:100px;
        border-radius:60% 60% 50% 50%;
        border:7px solid #000;
        position:absolute;
        background:#fff;
    }
    .left_hand{
        .hand;
        top:160px;
        left:30px;
    }
    .right_hand{
        .hand;
        top:160px;
        left:90px;
        transform:rotate(-90deg);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.hand</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">60%</span> <span class="hljs-number">60%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">7px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-class">.left_hand</span>{
        <span class="hljs-selector-class">.hand</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">160px</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">30px</span>;
    }
    <span class="hljs-selector-class">.right_hand</span>{
        <span class="hljs-selector-class">.hand</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">160px</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">90px</span>;
        <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">90deg</span>);
    }</code></pre>
<h3 id="articleHeader6">第七步：裤子</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzjZ" src="https://static.alili.tech/img/bVvzjZ" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;trousers&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"trousers"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".trousers{
    border:7px solid #000;
    position:absolute;
    background:red;
    width:100px;
    height:45px;
    top:240px;
    left:50px;
    z-index:-2;
    border-radius:0 0 15% 15%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.trousers</span>{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">7px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">background</span>:red;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">45px</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">240px</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">2</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">15%</span> <span class="hljs-number">15%</span>;
}</code></pre>
<h3 id="articleHeader7">第八步：腿</h3>
<p><span class="img-wrap"><img data-src="/img/bVvzeF" src="https://static.alili.tech/img/bVvzeF" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;left_footer&quot;></div>
<div class=&quot;right_footer&quot;></div>
<div class=&quot;egg&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"left_footer"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"right_footer"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"egg"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>至于egg是什么， 我就不赘述了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".footer{
        width:34px;
        height:80px;
        border-radius:50% 50% 60% 60%;
        border:7px solid #000;
        position:absolute;
        background:#fff;
        z-index:-3;
    }
    .left_footer{
        .footer;
        left:46px;
        top:260px;
        transform:rotate(20deg);
    }
    .right_footer{
        .footer;
        right:20px;
        top:270px;
        transform:rotate(-50deg);
    }
    .egg{
        background:#75d8f9;
        width: 18px;
        height: 30px;
        top: 286px;
        left: 97px;
        position: absolute;
        border-radius: 50%;
        border-top:7px solid #000;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.footer</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">34px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
        <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">60%</span> <span class="hljs-number">60%</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">7px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">3</span>;
    }
    <span class="hljs-selector-class">.left_footer</span>{
        <span class="hljs-selector-class">.footer</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">46px</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">260px</span>;
        <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-number">20deg</span>);
    }
    <span class="hljs-selector-class">.right_footer</span>{
        <span class="hljs-selector-class">.footer</span>;
        <span class="hljs-attribute">right</span>:<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">270px</span>;
        <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">50deg</span>);
    }
    <span class="hljs-selector-class">.egg</span>{
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#75d8f9</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">18px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">286px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">97px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">border-top</span>:<span class="hljs-number">7px</span> solid <span class="hljs-number">#000</span>;
    }</code></pre>
<h3 id="articleHeader8">收工</h3>
<p>欢迎大家吐槽</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【二次元的CSS】—— 用 DIV + CSS3 画咸蛋超人（详解步骤）

## 原文链接
[https://segmentfault.com/a/1190000005101636](https://segmentfault.com/a/1190000005101636)

