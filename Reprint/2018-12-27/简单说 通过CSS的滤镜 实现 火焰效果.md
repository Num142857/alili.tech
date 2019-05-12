---
title: '简单说 通过CSS的滤镜 实现 火焰效果' 
date: 2018-12-27 2:30:12
hidden: true
slug: 417tovjnouf
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>上次我们了解了一些css滤镜的基础知识，   <br><a href="https://segmentfault.com/a/1190000011820571?_ea=2771051">简单说 CSS滤镜 filter属性</a>    <br>这次我们就来用css的滤镜实现一个 火焰的效果。</p>
<h3 id="articleHeader1">解释</h3>
<p><span class="img-wrap"><img data-src="/img/bVXMPB?w=256&amp;h=253" src="https://static.alili.tech/img/bVXMPB?w=256&amp;h=253" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>要实现上面的火焰效果，我们先来了解一些必要的东西。  <br>上次我们说过两个滤镜，blur 和 contrast。  <br>blur 是给图像设置高斯模糊，    <br>contrast 是调整图像的对比度，   <br>他们一起使用会产生融合的效果。    <br><strong>效果图</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXMPC?w=305&amp;h=313" src="https://static.alili.tech/img/bVXMPC?w=305&amp;h=313" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图中 红色背景 设置了  <code>filter:contrast(20);</code> 这点很重要，两个圆设置了 <code>filter:blur(10px);</code>   如果还不清楚，我们对比看看。   </p>
<p><span class="img-wrap"><img data-src="/img/bVXMPA?w=319&amp;h=437" src="https://static.alili.tech/img/bVXMPA?w=319&amp;h=437" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXMPy?w=310&amp;h=407" src="https://static.alili.tech/img/bVXMPy?w=310&amp;h=407" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好的知道这些，我们开始实现火焰效果吧。    <br>大致需要这 3 步：<br>1、先用边框画出三角形    <br>要知道，如果 width是0，height也是0，只用边框的话，边框是三角形的，我们看看 width 和 height 都是0的，但边框宽度是100px的元素的样子    </p>
<p><span class="img-wrap"><img data-src="/img/bVXMPw?w=207&amp;h=215" src="https://static.alili.tech/img/bVXMPw?w=207&amp;h=215" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上图，4边的边框颜色是不一样的，我们很清楚的看见了4个三角形，我们现在需要下面这样一个东西，相信大家知道怎么实现了。    </p>
<p><span class="img-wrap"><img data-src="/img/bVXMPv?w=409&amp;h=413" src="https://static.alili.tech/img/bVXMPv?w=409&amp;h=413" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2、调整三角形的大小与颜色，实现类似火焰的样子   <br>这一步很简单，我们只需要在上面已经实现的三角形上加这三行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border-radius: 45%;
transform: scaleX(.4);
filter: blur(20px) contrast(30);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">border-radius</span>: <span class="hljs-number">45%</span>;
<span class="hljs-attribute">transform</span>: scaleX(.<span class="hljs-number">4</span>);
<span class="hljs-attribute">filter</span>: blur(<span class="hljs-number">20px</span>) contrast(<span class="hljs-number">30</span>);</code></pre>
<p><strong>效果图</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXMPz?w=309&amp;h=509" src="https://static.alili.tech/img/bVXMPz?w=309&amp;h=509" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>3、让火焰动起来  <br>这一步算是比较麻烦的了，不过也很好理解，就是利用上面提到的融合效果，让许多小圆随机的穿过这个三角形就可以了，看看下面这张图，就能理解原理。     </p>
<p><span class="img-wrap"><img data-src="/img/bVXMPx?w=258&amp;h=255" src="https://static.alili.tech/img/bVXMPx?w=258&amp;h=255" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>好的，理解这些看代码绝对很容易了。    <br><strong>完成代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <style>
    body {
        background: #000;
    }

    .container {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        background-color: #000;
    }

    .fire {
        position: absolute;
        bottom: 0;
        left: 50%;
        border-radius: 45%;
        box-sizing: border-box;
        border: 200px solid #000;
        border-bottom: 200px solid #b5932f;
        transform: translate(-50%, 0) scaleX(.4);
        filter: blur(20px) contrast(30);
    }
    
    /* 小圆的样式 */
    .dot {
        position: absolute;
        bottom: -110px;
        left: 0;
        width: 24px;
        height: 24px;
        background: #000;
        border-radius: 50%;
    }

    @keyframes move {
        100% {
            transform: translateY(-350px);
        }
    }
    </style>
</head>

<body>
    <div class=&quot;container&quot;>
        <div class=&quot;fire&quot;>
        </div>
    </div>
    <script>
    //创建一个元素，放所有的小圆
    var circleBox = document.createElement('div');
    //获取随机数   from 参数表示从哪个数开始  to参数表示到哪个数结束 from<= num <= to
    function randomNum(from, to) {
        from = Number(from);
        to = Number(to);
        var Range = to - from;
        var num = from + Math.round(Math.random() * Range); //四舍五入
        return num;
    };  
    
    for (var i = 0; i < 40; i++) {
        //创建小圆
        var circle = document.createElement('div');

        // 下面的4个变量 代表小圆随机位置  和 随机持续时间和延迟
        var bottom = randomNum(-300, -250);
        var left = randomNum(-200, 200);
        var duration = randomNum(10, 30) / 10;
        var delay = randomNum(0, 50) / 10;

        //给生成的每个小圆 加上动画和位置属性
        circle.style.cssText += `animation:move ${duration}s linear ${delay}s infinite;bottom:${bottom}px;left:${left}px;`;
        circle.className += &quot; dot&quot;;

        //把每个小圆 都加入这个div
        circleBox.appendChild(circle);
    };
    
    var fire = document.querySelector(&quot;.fire&quot;);
    //把有40个随机小圆的 div 加入DOM树
    fire.appendChild(circleBox);
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
    }

    <span class="hljs-selector-class">.container</span> {
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#000</span>;
    }

    <span class="hljs-selector-class">.fire</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">45%</span>;
        <span class="hljs-attribute">box-sizing</span>: border-box;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">200px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">200px</span> solid <span class="hljs-number">#b5932f</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, 0) <span class="hljs-built_in">scaleX</span>(.4);
        <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(20px) <span class="hljs-built_in">contrast</span>(30);
    }
    
    <span class="hljs-comment">/* 小圆的样式 */</span>
    <span class="hljs-selector-class">.dot</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">110px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    }

    @<span class="hljs-keyword">keyframes</span> move {
        100% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-350px);
        }
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fire"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//创建一个元素，放所有的小圆</span>
    <span class="hljs-keyword">var</span> circleBox = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    <span class="hljs-comment">//获取随机数   from 参数表示从哪个数开始  to参数表示到哪个数结束 from&lt;= num &lt;= to</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomNum</span>(<span class="hljs-params">from, to</span>) </span>{
        <span class="hljs-keyword">from</span> = <span class="hljs-built_in">Number</span>(<span class="hljs-keyword">from</span>);
        to = <span class="hljs-built_in">Number</span>(to);
        <span class="hljs-keyword">var</span> Range = to - <span class="hljs-keyword">from</span>;
        <span class="hljs-keyword">var</span> num = <span class="hljs-keyword">from</span> + <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random() * Range); <span class="hljs-comment">//四舍五入</span>
        <span class="hljs-keyword">return</span> num;
    };  
    
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">40</span>; i++) {
        <span class="hljs-comment">//创建小圆</span>
        <span class="hljs-keyword">var</span> circle = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);

        <span class="hljs-comment">// 下面的4个变量 代表小圆随机位置  和 随机持续时间和延迟</span>
        <span class="hljs-keyword">var</span> bottom = randomNum(<span class="hljs-number">-300</span>, <span class="hljs-number">-250</span>);
        <span class="hljs-keyword">var</span> left = randomNum(<span class="hljs-number">-200</span>, <span class="hljs-number">200</span>);
        <span class="hljs-keyword">var</span> duration = randomNum(<span class="hljs-number">10</span>, <span class="hljs-number">30</span>) / <span class="hljs-number">10</span>;
        <span class="hljs-keyword">var</span> delay = randomNum(<span class="hljs-number">0</span>, <span class="hljs-number">50</span>) / <span class="hljs-number">10</span>;

        <span class="hljs-comment">//给生成的每个小圆 加上动画和位置属性</span>
        circle.style.cssText += <span class="hljs-string">`animation:move <span class="hljs-subst">${duration}</span>s linear <span class="hljs-subst">${delay}</span>s infinite;bottom:<span class="hljs-subst">${bottom}</span>px;left:<span class="hljs-subst">${left}</span>px;`</span>;
        circle.className += <span class="hljs-string">" dot"</span>;

        <span class="hljs-comment">//把每个小圆 都加入这个div</span>
        circleBox.appendChild(circle);
    };
    
    <span class="hljs-keyword">var</span> fire = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".fire"</span>);
    <span class="hljs-comment">//把有40个随机小圆的 div 加入DOM树</span>
    fire.appendChild(circleBox);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader2">总结</h3>
<p>这次，说的火焰效果就结束了，css的滤镜当然还能实现其他更有趣的效果，那就等大家自己去探索了。    </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说 通过CSS的滤镜 实现 火焰效果

## 原文链接
[https://segmentfault.com/a/1190000011826691](https://segmentfault.com/a/1190000011826691)

