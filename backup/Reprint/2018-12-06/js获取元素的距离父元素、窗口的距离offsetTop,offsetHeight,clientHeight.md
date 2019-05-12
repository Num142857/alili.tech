---
title: 'js获取元素的距离父元素、窗口的距离offsetTop,offsetHeight,clientHeight' 
date: 2018-12-06 2:30:09
hidden: true
slug: dosb3fxv2rm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>相信很多项目中都会有这样一个小需求（PC端，移动端则是点击），<code>鼠标移上某个菜单或者某个位置，显示一个弹出框，移开则隐藏弹出框，就是css中hover效果，这种通常做法是每个子菜单下都有一个弹框，父元素相对定位，子元素绝对定位，只需要控制的弹框的显示与隐藏即可，但是，当鼠标移动到边界的菜单上时，弹框可能会超出外部元素的范围</code>，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV78qV?w=666&amp;h=413" src="https://static.alili.tech/img/bV78qV?w=666&amp;h=413" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">解决办法</h1>
<h3 id="articleHeader2"><code>动态的计算弹框距离外部元素的位置，即获取元素的offsetLeft、offsetTop、offsetWidth、offsetHeight，如果弹框的宽度（offsetWidth）+距离左边的距离（offsetLeft）大于父元素的宽度，则判断为超出外部元素范围，需要动态改变弹框距离边框的位置</code></h3>
<h3 id="articleHeader3">下面是对offsetTop,offsetHeight,clientHeight,scrollHeight,scrollTop图解</h3>
<p><span class="img-wrap"><img data-src="/img/bV78AZ?w=609&amp;h=602" src="https://static.alili.tech/img/bV78AZ?w=609&amp;h=602" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">注意，这里对弹框的布局有限制，虽然弹框要隐藏，但是不能使用<code>display:none</code>的方式隐藏，可以使用<code>opacity:0</code>或者<code>visibility: hidden</code>隐藏元素，因为<code>display:none</code>方式不能获取到元素的高度，宽度等</h3>
<h3 id="articleHeader5">下面是我写的一个demo</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<style>
    #box {
        width: 500px;
        height: 500px;
        background: #0a67fb;
        margin: 100px auto;
        position: relative;
    }

    #inner-box {
        width: 200px;
        height: 200px;
        background: #00F7DE;
        position: absolute;
        top: 50px;
        left: 320px;
        visibility: hidden;
    }
</style>
<body>
<div id=&quot;box&quot;>
    <div id=&quot;inner-box&quot;>
    </div>
</div>
<script>
    var box = document.querySelector('#box');
    var innerbox = document.querySelector('#inner-box');

    box.onmouseenter = function (e) {
        var wrapperBoxWidth = box.offsetWidth;// 获取父容器宽度
        var wrapperBoxHeight = box.offsetHeight;// 获取父容器高度

        var innerBoxWidth = innerbox.offsetWidth;// 获取弹框宽度
        var innerBoxHeight = innerbox.offsetHeight;// 获取弹框高度
        var innerBoxLeft = innerbox.offsetLeft;// 获取弹框距离左侧宽度
        var innerBoxTop = innerbox.offsetTop;// 获取弹框距离顶部高度

        innerbox.style.visibility = 'visible'  // 鼠标移入时显示弹框
        
        // 如果弹框宽度+距离左侧宽度大于外部元素的宽度，则右侧溢出
        if (innerBoxLeft + innerBoxWidth > wrapperBoxWidth) {
            innerbox.style.left = 'auto'
            innerbox.style.right = '10px'
        }

        // 如果弹框高度+距离顶部高度大于外部元素的高度，则底部溢出
        if (innerBoxTop + innerBoxHeight > wrapperBoxHeight) {
            innerbox.style.top = 'auto'
            innerbox.style.bottom = '10px'
        }
    }
    box.onmouseleave = function () {
        innerbox.style.visibility = 'hidden' // 鼠标移开时隐藏弹框
    }
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#0a67fb</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-id">#inner-box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#00F7DE</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">320px</span>;
        <span class="hljs-attribute">visibility</span>: hidden;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inner-box"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#box'</span>);
    <span class="hljs-keyword">var</span> innerbox = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#inner-box'</span>);

    box.onmouseenter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> wrapperBoxWidth = box.offsetWidth;<span class="hljs-comment">// 获取父容器宽度</span>
        <span class="hljs-keyword">var</span> wrapperBoxHeight = box.offsetHeight;<span class="hljs-comment">// 获取父容器高度</span>

        <span class="hljs-keyword">var</span> innerBoxWidth = innerbox.offsetWidth;<span class="hljs-comment">// 获取弹框宽度</span>
        <span class="hljs-keyword">var</span> innerBoxHeight = innerbox.offsetHeight;<span class="hljs-comment">// 获取弹框高度</span>
        <span class="hljs-keyword">var</span> innerBoxLeft = innerbox.offsetLeft;<span class="hljs-comment">// 获取弹框距离左侧宽度</span>
        <span class="hljs-keyword">var</span> innerBoxTop = innerbox.offsetTop;<span class="hljs-comment">// 获取弹框距离顶部高度</span>

        innerbox.style.visibility = <span class="hljs-string">'visible'</span>  <span class="hljs-comment">// 鼠标移入时显示弹框</span>
        
        <span class="hljs-comment">// 如果弹框宽度+距离左侧宽度大于外部元素的宽度，则右侧溢出</span>
        <span class="hljs-keyword">if</span> (innerBoxLeft + innerBoxWidth &gt; wrapperBoxWidth) {
            innerbox.style.left = <span class="hljs-string">'auto'</span>
            innerbox.style.right = <span class="hljs-string">'10px'</span>
        }

        <span class="hljs-comment">// 如果弹框高度+距离顶部高度大于外部元素的高度，则底部溢出</span>
        <span class="hljs-keyword">if</span> (innerBoxTop + innerBoxHeight &gt; wrapperBoxHeight) {
            innerbox.style.top = <span class="hljs-string">'auto'</span>
            innerbox.style.bottom = <span class="hljs-string">'10px'</span>
        }
    }
    box.onmouseleave = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        innerbox.style.visibility = <span class="hljs-string">'hidden'</span> <span class="hljs-comment">// 鼠标移开时隐藏弹框</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>以上代码亲测可以解决弹框溢出问题，如果道友有更好的解决办法，欢迎指出，不胜感激！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js获取元素的距离父元素、窗口的距离offsetTop,offsetHeight,clientHeight

## 原文链接
[https://segmentfault.com/a/1190000014293962](https://segmentfault.com/a/1190000014293962)

