---
title: '原生js实现图片放大镜效果' 
date: 2019-01-06 2:30:10
hidden: true
slug: u6cg4013bff
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">放大镜原理</h3>
<hr>
<p>放大镜的实现过程是将一个小图放置在一个盒子里。宽高都是100%。当鼠标在小图盒子里移动时，出现一个移动块(阴影区域)。右侧大图片盒子出现一个等比例放大的在小图盒子移动块中的图片内容。如图(请勿过于认真看图片，注意圈圈(￢_￢))：</p>
<p><span class="img-wrap"><img data-src="/img/bVRICu?w=851&amp;h=345" src="https://static.alili.tech/img/bVRICu?w=851&amp;h=345" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>一定要理解上图中圈起来的阴影块是箭头指向的粉红色圈的等比缩小版。理解了这个在接下来的代码中，我们才知道怎么去计算右侧大图区域中的left、top值。也可以说成阴影移动块是模拟右侧大图盒子。右侧大图盒子中放置的是一张大的图片，然后盒子设置成溢出隐藏。而我们的移动块也是，不在阴影块中的内容，你都可以认为是溢出隐藏掉了。</p>
<p>当小图盒子中的移动块移动时，根据移动的距离去计算右侧大图盒子中图片移动的坐标。此时方便理解，你可以想像成阴影块是静止的，是阴影块下面的图片在移动。所以，我们需要计算出图片向x轴、y轴移动了多少，根据等比例公式换算出右侧大图盒子中的图片需要移动的坐标值。</p>
<h3 id="articleHeader1">代码分析</h3>
<hr>
<blockquote><p>html</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>放大镜</title>
    <meta charset=&quot;utf-8&quot;>
</head>
<body>
    <div id=&quot;small&quot;>
        <img src=&quot;./fangdajing.png&quot;>
        <p id=&quot;move&quot;></p>
    </div>
    <div id=&quot;big&quot;>
        <img src=&quot;./fangdajing.png&quot; id=&quot;look_girl&quot;>
    </div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>放大镜<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"small"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./fangdajing.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"move"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"big"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./fangdajing.png"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"look_girl"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<blockquote><p>css</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
        *{
            margin: 0px;
            padding: 0px;
        }
        body{
            width: 960px;
            margin:40px auto;
        }
        #small{
            width: 300px;
            height: 200px;
            border:1px solid #eee;
            border-radius: 4px;
            position: relative;
        }

        #small img{
            width: 100%;
            height: 100%;
        }

        div    {
            float: left;
            margin-right: 10px;
        }

        #big{
            width: 300px;
            height: 200px;
            overflow: hidden;
            position: relative;
            border:1px solid #eee;
            border-radius: 4px;
            display: none;
        }

        #look_girl{
            position: absolute;
            left: 0px;
            top:0px;
        }

        #move{
            width: 100px;
            height: 100px;
            background:#000;
            opacity: .5;
            position: absolute;
            display: none;
            left: 0px;
            top: 0px;
        }
    </style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        *{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
        }
        <span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">960px</span>;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">40px</span> auto;
        }
        <span class="hljs-selector-id">#small</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#eee</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">position</span>: relative;
        }

        <span class="hljs-selector-id">#small</span> <span class="hljs-selector-tag">img</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        }

        <span class="hljs-selector-tag">div</span>    {
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
        }

        <span class="hljs-selector-id">#big</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#eee</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">display</span>: none;
        }

        <span class="hljs-selector-id">#look_girl</span>{
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
            <span class="hljs-attribute">top</span>:<span class="hljs-number">0px</span>;
        }

        <span class="hljs-selector-id">#move</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
            <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">5</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">display</span>: none;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<blockquote><p>js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    var move = document.getElementById('move');    
    var small = document.getElementById('small');
    var big = document.getElementById('big');
    var look_girl = document.getElementById('look_girl');
    small.onmousemove = function(event){
        event = event || window.event;
        this.style.cursor = 'move';
        // 计算move移动块的left值
        var move_left = event.clientX - this.offsetLeft - move.offsetWidth/2;
        // 计算move移动块的top值
        var move_top = event.clientY - this.offsetTop - move.offsetHeight/2;
        // 超出左边界赋值为0
        move_left = move_left < 0 ? 0 : move_left;
        // 超出右边界赋值为盒子宽度-移动块的宽度
        move_left = move_left > this.offsetWidth - move.offsetWidth ? this.offsetWidth - move.offsetWidth : move_left;
        // 超出上边界赋值为0
        move_top = move_top < 0 ? 0 : move_top;
        // 超出下边界赋值为盒子高度-移动块高度
        move_top = move_top > this.offsetHeight - move.offsetHeight ? this.offsetHeight - move.offsetHeight : move_top;
        // 修改移动块left、top值
        move.style.left = move_left + 'px';
        move.style.top = move_top + 'px';
        /*
            计算图片需要移动的坐标

            距离左边left    图片宽度      盒子宽度          距离左边left    图片宽度           盒子宽度
            big_x/(look_girl.offsetWidth-big.offsetWidth) = move_left/(small.offsetWidth-move.offsetWidth);

            big_y/(look_girl.offsetHeight-big.offsetHeight) = move_top/(small.offsetHeight-move.offsetHeight);

        */

        var big_x = move_left/(small.offsetWidth-move.offsetWidth) * (look_girl.offsetWidth-big.offsetWidth);
        var big_y = move_top/(small.offsetHeight-move.offsetHeight) * (look_girl.offsetHeight-big.offsetHeight);
        // 修改图片定位
        look_girl.style.left = -big_x + 'px';
        look_girl.style.top = -big_y + 'px';
    }

    small.onmouseover = function(){
        move.style.display = 'block';
        big.style.display = 'block';
    }

    small.onmouseout = function(){
        move.style.display = 'none';
        big.style.display = 'none';
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> move = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'move'</span>);    
    <span class="hljs-keyword">var</span> small = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'small'</span>);
    <span class="hljs-keyword">var</span> big = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'big'</span>);
    <span class="hljs-keyword">var</span> look_girl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'look_girl'</span>);
    small.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
        event = event || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">this</span>.style.cursor = <span class="hljs-string">'move'</span>;
        <span class="hljs-comment">// 计算move移动块的left值</span>
        <span class="hljs-keyword">var</span> move_left = event.clientX - <span class="hljs-keyword">this</span>.offsetLeft - move.offsetWidth/<span class="hljs-number">2</span>;
        <span class="hljs-comment">// 计算move移动块的top值</span>
        <span class="hljs-keyword">var</span> move_top = event.clientY - <span class="hljs-keyword">this</span>.offsetTop - move.offsetHeight/<span class="hljs-number">2</span>;
        <span class="hljs-comment">// 超出左边界赋值为0</span>
        move_left = move_left &lt; <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : move_left;
        <span class="hljs-comment">// 超出右边界赋值为盒子宽度-移动块的宽度</span>
        move_left = move_left &gt; <span class="hljs-keyword">this</span>.offsetWidth - move.offsetWidth ? <span class="hljs-keyword">this</span>.offsetWidth - move.offsetWidth : move_left;
        <span class="hljs-comment">// 超出上边界赋值为0</span>
        move_top = move_top &lt; <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : move_top;
        <span class="hljs-comment">// 超出下边界赋值为盒子高度-移动块高度</span>
        move_top = move_top &gt; <span class="hljs-keyword">this</span>.offsetHeight - move.offsetHeight ? <span class="hljs-keyword">this</span>.offsetHeight - move.offsetHeight : move_top;
        <span class="hljs-comment">// 修改移动块left、top值</span>
        move.style.left = move_left + <span class="hljs-string">'px'</span>;
        move.style.top = move_top + <span class="hljs-string">'px'</span>;
        <span class="hljs-comment">/*
            计算图片需要移动的坐标

            距离左边left    图片宽度      盒子宽度          距离左边left    图片宽度           盒子宽度
            big_x/(look_girl.offsetWidth-big.offsetWidth) = move_left/(small.offsetWidth-move.offsetWidth);

            big_y/(look_girl.offsetHeight-big.offsetHeight) = move_top/(small.offsetHeight-move.offsetHeight);

        */</span>

        <span class="hljs-keyword">var</span> big_x = move_left/(small.offsetWidth-move.offsetWidth) * (look_girl.offsetWidth-big.offsetWidth);
        <span class="hljs-keyword">var</span> big_y = move_top/(small.offsetHeight-move.offsetHeight) * (look_girl.offsetHeight-big.offsetHeight);
        <span class="hljs-comment">// 修改图片定位</span>
        look_girl.style.left = -big_x + <span class="hljs-string">'px'</span>;
        look_girl.style.top = -big_y + <span class="hljs-string">'px'</span>;
    }

    small.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        move.style.display = <span class="hljs-string">'block'</span>;
        big.style.display = <span class="hljs-string">'block'</span>;
    }

    small.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        move.style.display = <span class="hljs-string">'none'</span>;
        big.style.display = <span class="hljs-string">'none'</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader2">移动块行为分析</h3>
<hr>
<p>当鼠标移动到小图盒子中时，会出现移动块（下图阴影部分）我们需要做的是移动块位于鼠标的中间，且跟随鼠标移动。当然了也不能溢出边界。看图说话(￢_￢)</p>
<p><span class="img-wrap"><img data-src="/img/bVRICR?w=976&amp;h=517" src="https://static.alili.tech/img/bVRICR?w=976&amp;h=517" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再看看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 计算move移动块的left值
var move_left = event.clientX - this.offsetLeft - move.offsetWidth/2;
// 计算move移动块的top值
var move_top = event.clientY - this.offsetTop - move.offsetHeight/2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 计算move移动块的left值</span>
<span class="hljs-keyword">var</span> move_left = <span class="hljs-keyword">event</span>.clientX - <span class="hljs-keyword">this</span>.offsetLeft - move.offsetWidth/<span class="hljs-number">2</span>;
<span class="hljs-comment">// 计算move移动块的top值</span>
<span class="hljs-keyword">var</span> move_top = <span class="hljs-keyword">event</span>.clientY - <span class="hljs-keyword">this</span>.offsetTop - move.offsetHeight/<span class="hljs-number">2</span>;
</code></pre>
<p>ok，完美解决 ʅ（´◔౪◔）ʃ</p>
<h3 id="articleHeader3">计算放大区域图片left/top值</h3>
<hr>
<p>上面说过了，移动块模拟的是放大区域。所以此时移动块与放大区域的盒子，移动块中的图片大小与放大区域盒子图片大小应该是成比例的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    计算图片需要移动的坐标
    big_x/(look_girl.offsetWidth-big.offsetWidth) = move_left/(small.offsetWidth-move.offsetWidth);
    big_y/(look_girl.offsetHeight-big.offsetHeight) = move_top/(small.offsetHeight-move.offsetHeight);
*/

var big_x = move_left/(small.offsetWidth-move.offsetWidth) * (look_girl.offsetWidth-big.offsetWidth);
var big_y = move_top/(small.offsetHeight-move.offsetHeight) * (look_girl.offsetHeight-big.offsetHeight);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-comment">/*
    计算图片需要移动的坐标
    big_x/(look_girl.offsetWidth-big.offsetWidth) = move_left/(small.offsetWidth-move.offsetWidth);
    big_y/(look_girl.offsetHeight-big.offsetHeight) = move_top/(small.offsetHeight-move.offsetHeight);
*/</span>

<span class="hljs-symbol">var</span> <span class="hljs-keyword">big_x </span>= <span class="hljs-keyword">move_left/(small.offsetWidth-move.offsetWidth) </span>* (look_girl.offsetWidth-<span class="hljs-keyword">big.offsetWidth);
</span><span class="hljs-symbol">var</span> <span class="hljs-keyword">big_y </span>= <span class="hljs-keyword">move_top/(small.offsetHeight-move.offsetHeight) </span>* (look_girl.offsetHeight-<span class="hljs-keyword">big.offsetHeight);
</span></code></pre>
<p>此时小图盒子的宽度（<code>small.offsetWidth</code>）正好是移动块中图片的宽度（认为不在移动块中显式的图片都溢出隐藏了）。然后就好像没有什么要解释的了...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js实现图片放大镜效果

## 原文链接
[https://segmentfault.com/a/1190000010380615](https://segmentfault.com/a/1190000010380615)

