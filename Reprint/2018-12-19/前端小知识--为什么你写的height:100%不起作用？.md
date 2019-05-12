---
title: '前端小知识--为什么你写的height:100%不起作用？' 
date: 2018-12-19 2:30:07
hidden: true
slug: itwqh9ynvb
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">为什么你写的height:100%不起作用？</h3>
<blockquote>这个知识不算冷门的，但是用的时候可能还是会有些懵逼，不能生效时搜一搜就能找到答案了，但是你真的懂了吗？为什么想要设置一个全屏元素的时候，高度不受%的控制？</blockquote>
<h4>1.百分比宽高的设定</h4>
<p>按照w3c中的width和height属性，可以明确%设定宽高是根据父元素的宽高来的：<br><a href="http://www.w3school.com.cn/cssref/pr_dim_width.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/cs...</a><br><a href="http://www.w3school.com.cn/cssref/pr_dim_height.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/cs...</a></p>
<p><span class="img-wrap"><img data-src="/img/bV1tik?w=865&amp;h=216" src="https://static.alili.tech/img/bV1tik?w=865&amp;h=216" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>2.width:100%;</h4>
<p>我们写下这样一段代码，随意设置一个背景色便于观察元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div style=&quot;width:100%;height:100%;background-color:blueviolet;&quot;>
    width:100%;height:100%;
    </div>
</body>
//宽100%，我们现在看到的高是属于font-size的，而不是100%；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;body&gt;</span>
    <span class="hljs-params">&lt;div style="width:<span class="hljs-number">100</span>%;height:<span class="hljs-number">100</span>%;background-color:blueviolet;"&gt;</span>
<span class="hljs-symbol">    width:</span><span class="hljs-number">100</span>%;height:<span class="hljs-number">100</span>%;
    <span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/body&gt;</span>
<span class="hljs-comment">//宽100%，我们现在看到的高是属于font-size的，而不是100%；</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1tqr?w=1362&amp;h=87" src="https://static.alili.tech/img/bV1tqr?w=1362&amp;h=87" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div style=&quot;width:100%;height:200px;background-color:blueviolet;&quot;>
    width:100%;height:200px;
    </div>
</body>
//效果如下" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;body&gt;</span>
    <span class="hljs-params">&lt;div style="width:<span class="hljs-number">100</span>%;height:<span class="hljs-number">200</span>px;background-color:blueviolet;"&gt;</span>
<span class="hljs-symbol">    width:</span><span class="hljs-number">100</span>%;height:<span class="hljs-number">200</span>px;
    <span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/body&gt;</span>
<span class="hljs-comment">//效果如下</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1tnJ?w=1366&amp;h=546" src="https://static.alili.tech/img/bV1tnJ?w=1366&amp;h=546" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到基本上宽的100%很容易就实现的，但是这里的height却不能设置成%比的（该元素会消失看不见），这是为什么呢？</p>
<h4>3.浏览器是如何计算高度和宽度的</h4>
<p>Web浏览器在计算有效宽度时会考虑浏览器窗口的打开宽度。如果你不给宽度设定任何缺省值，那浏览器会自动将页面内容平铺填满整个横向宽度。即我们不设置宽，会自动填满整个横向宽度，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;height:100%;&quot;>height:100%;</div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">div</span> style=<span class="hljs-string">"height:100%;"</span>&gt;<span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;&lt;/div&gt;  </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1tr3?w=1358&amp;h=72" src="https://static.alili.tech/img/bV1tr3?w=1358&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是高度的计算方式完全不一样。事实上，浏览器根本就不计算内容的高度，除非内容超出了视窗范围(导致滚动条出现)。或者你给整个页面设置一个绝对高度。否则，浏览器就会简单的让内容往下堆砌，页面的高度根本就无需考虑。<br>因为页面并没有缺省的高度值，所以，当你让一个元素的高度设定为百分比高度时，无法根据获取父元素的高度，也就无法计算自己的高度。<br>即父元素的高度只是一个缺省值：height: auto;我们设置height：100%时，是要求浏览器根据这样一个缺省值来计算百分比高度时，只能得到undefined的结果。也就是一个null值，浏览器不会对这个值有任何的反应。<br>各个浏览器对于宽高的解析也不相同，大家可以自己搜索一下。<br>参考：<a href="http://www.webhek.com/post/css-100-percent-height.html" rel="nofollow noreferrer" target="_blank">http://www.webhek.com/post/cs...</a></p>
<h4>4.如何解决</h4>
<p>现在你知道了吧，%是一个相对父元素计算得来的高度，要想使他有效，我们需要设置父元素的height;<br>要特别注意的一点是，在&lt;body&gt;之中的元素的父元素并不仅仅只是&lt;body&gt;，还包括了&lt;html&gt;。<br>所以我们要同时设置这两者的height，只设置其中一个是不行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        html,body{
            height: 100%;
            margin: 0;
            padding: 0;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1tv7?w=1358&amp;h=727" src="https://static.alili.tech/img/bV1tv7?w=1358&amp;h=727" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>5.关于line-height居中的一点误解？</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
    <style>
        html,body{
            height: 100%;
            margin: 0;
            padding: 0;
        }
        div {
            color: white;
            text-align: center;
            font-size: 30px;
            line-height: 100%;
            background-color: blueviolet;
        }
    </style>
</head>

<body>
    <!-- <div style=&quot;width:100%;height:100%;&quot;>width:100%;height:100%;</div> -->
    <div style=&quot;height:100%;&quot;>height:100%;</div>
    <!-- <div style=&quot;width:100%;height:200px;&quot;>width:100%;height:200px;</div> -->
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">color</span>: white;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">background-color</span>: blueviolet;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;div style="width:100%;height:100%;"&gt;width:100%;height:100%;&lt;/div&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:100%;"</span>&gt;</span>height:100%;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;div style="width:100%;height:200px;"&gt;width:100%;height:200px;&lt;/div&gt; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>全部代码如上，可以看到设置了line-height为100%没有居中，这是为什么呢，因为这时候的%是相对于字体尺寸的？所以直接作用于没有绝对高度的元素是不行的。</p>
<p><span class="img-wrap"><img data-src="/img/bV1tRO?w=822&amp;h=240" src="https://static.alili.tech/img/bV1tRO?w=822&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>line-height属性说明：<a href="http://www.w3school.com.cn/cssref/pr_dim_line-height.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/cs...</a><br>这时候要想居中，可以如下，做一个div嵌套，一个负责高度，一个负责居中，虽然感觉并不会这样用到，但是居中还是很灵验的~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        .div1 {
            background-color: blueviolet;
            position: relative;
        }

        .div2 {
            font-size: 30px;    
            color: white;
            text-align: center;                    
            width: 400px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%)  translateY(-50%);
        }
    </style>
</head>

<body>
    <!-- <div style=&quot;width:100%;height:100%;&quot;>width:100%;height:100%;</div> -->
    <div style=&quot;height:100%;&quot; class=&quot;div1&quot;>
        <div class=&quot;div2&quot;>height:100%;</div>
    </div>
    <!-- <div style=&quot;width:100%;height:200px;&quot;>width:100%;height:200px;</div> -->
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span>,
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.div1</span> {
            <span class="hljs-attribute">background-color</span>: blueviolet;
            <span class="hljs-attribute">position</span>: relative;
        }

        <span class="hljs-selector-class">.div2</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;    
            <span class="hljs-attribute">color</span>: white;
            <span class="hljs-attribute">text-align</span>: center;                    
            <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%)  <span class="hljs-built_in">translateY</span>(-50%);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;div style="width:100%;height:100%;"&gt;width:100%;height:100%;&lt;/div&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:100%;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div2"</span>&gt;</span>height:100%;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;div style="width:100%;height:200px;"&gt;width:100%;height:200px;&lt;/div&gt; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1tUa?w=1366&amp;h=637" src="https://static.alili.tech/img/bV1tUa?w=1366&amp;h=637" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>6.源码</h4>
<p><a href="https://github.com/JiaXinYi/ife-study/blob/master/height/height.html" rel="nofollow noreferrer" target="_blank">https://github.com/JiaXinYi/i...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端小知识--为什么你写的height:100%不起作用？

## 原文链接
[https://segmentfault.com/a/1190000012707337](https://segmentfault.com/a/1190000012707337)

