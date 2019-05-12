---
title: '[聊一聊系列]聊一聊iconfont那些事儿' 
date: 2019-02-07 2:30:16
hidden: true
slug: ti50rmd47dj
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎大家收看聊一聊系列，这一套系列文章，可以帮助前端工程师们了解前端的方方面面（不仅仅是代码）：<br><a href="https://segmentfault.com/blog/frontenddriver">https://segmentfault.com/blog/frontenddriver</a></p>
<h2 id="articleHeader0">1. 从FONT-FACE说起</h2>
<p>要想了解iconfont，得从一个新的css3规则说起。css3中，新增了一种样式规则，@font-face，这个规则可以用来引入自定义的字体，到客户端。以前，我们的字体只能听任客户端的。因为用户没有安装的话，我们强制要求显示也没有办法。<br>现在使用@font-face则可以引入在web服务器上存放的字体文件，从而达到，可以使用一些客户端浏览器上不存在的字体，等到浏览器去访问并渲染时，去下载font-face指定的字体。并命名为我们想要的字体。如图1.1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <style>
            @font-face {
                font-family: myfont;
                src: url('./myfont.otf');
            }   
            .usefont {
                font-family: myfont;
            }   
        </style>
    </head>
    <body>
        <h1 class=&quot;usefont&quot;>
            测试1
        </h1>
        <h1>
            测试2
        </h1>
    </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            @<span class="hljs-keyword">font-face</span> {
                <span class="hljs-attribute">font-family</span>: myfont;
                <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'./myfont.otf'</span>);
            }   
            <span class="hljs-selector-class">.usefont</span> {
                <span class="hljs-attribute">font-family</span>: myfont;
            }   
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"usefont"</span>&gt;</span>
            测试1
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
            测试2
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyWcV" src="https://static.alili.tech/img/bVyWcV" alt="134559_SbuN_1177792.png" title="134559_SbuN_1177792.png" style="cursor: pointer; display: inline;"></span><br>图1.1</p>
<p>上面的自已个h1中使用的，正是我们存在服务端的字体。由于各个浏览器的兼容性问题，</p>
<p>1.IE浏览器：EOT<br>2.Mozilla浏览器：OTF，TTF<br>3.Safari浏览器：OTF，TTF​​，SVG<br>4.歌剧：OTF，TTF​​，SVG<br>5.Chrome浏览器：TTF，SVG</p>
<p>所以，我们需要准备多个格式的不同的字体文件。指代同一份字体。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-face {
    font-family: 'icons';
    src: url(../font/curiconfont.eot#iefix) format('embedded-opentype'),
         url(../font/curiconfont.woff) format('woff'),
         url(../font/curiconfont.ttf) format('truetype'),
         url(../font/curiconfont.svg?#iconfont) format('svg');
    font-weight: normal;
    font-style: normal;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">font-face</span> {
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'icons'</span>;
    <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(../font/curiconfont.eot#iefix) <span class="hljs-built_in">format</span>(<span class="hljs-string">'embedded-opentype'</span>),
         <span class="hljs-built_in">url</span>(../font/curiconfont.woff) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>),
         <span class="hljs-built_in">url</span>(../font/curiconfont.ttf) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>),
         <span class="hljs-built_in">url</span>(../font/curiconfont.svg?#iconfont) <span class="hljs-built_in">format</span>(<span class="hljs-string">'svg'</span>);
    <span class="hljs-attribute">font-weight</span>: normal;
    <span class="hljs-attribute">font-style</span>: normal;
}
</code></pre>
<p>后面的format指代的是墙面的资源是那种格式的。如想更详细了解，可以百度一下font-face。上面提到的例子可以在github上的hellofontface.html中找到。</p>
<h2 id="articleHeader1">2 什么是iconfont</h2>
<p>既然font-face可以指定字体文件，那么字体长成什么样，不就是开发者说的算了么。我们可以描述一个字体，它长成这样：<span class="img-wrap"><img data-src="/img/bVyWdc" src="https://static.alili.tech/img/bVyWdc" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>。其实，话说回来，文字不就是图像么。人类最早发明文字的时候就是按照图像来发明的。所以，我们可以把一些字符，描述成图像。在我们的网页上，当成图像来使用。这就是iconfont了。把一些零散的icon做成字体。我们调用文字的时候，渲染出来的就是icon图像了。</p>
<h2 id="articleHeader2">3 iconfont怎么用</h2>
<p>我们来拿手机百度首页的字体做个小例子试试(如图3.1)，我们新加入一个font-face，起名为myFont，在需要使用这份iconfont的部分，font-family设置为myFont，则这部分区域可以使用上该font文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE HTML>
<html>
    <head>
        <meta charset=&quot;utf-8&quot; />
        <style>
            @font-face {
                font-family: myfont;
                src: url('http://m.baidu.com/static/index/iconfont/iconfont_c0634602.woff');
            }   
            .usefont {
                font-family: myfont;
            }   
        </style>
    </head>
    <body>
        <h1 class=&quot;usefont&quot;>
            &amp;#xe609;
        </h1>
        <h1>
            &amp;#xe609;
        </h1>
    </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            @<span class="hljs-keyword">font-face</span> {
                <span class="hljs-attribute">font-family</span>: myfont;
                <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'http://m.baidu.com/static/index/iconfont/iconfont_c0634602.woff'</span>);
            }   
            <span class="hljs-selector-class">.usefont</span> {
                <span class="hljs-attribute">font-family</span>: myfont;
            }   
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"usefont"</span>&gt;</span>
            &amp;#xe609;
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
            &amp;#xe609;
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyWdg" src="https://static.alili.tech/img/bVyWdg" alt="140105_VXcp_1177792.png" title="140105_VXcp_1177792.png" style="cursor: pointer;"></span><br>图3.1<br>我们看到我们在网页上写了一个字符，本来这个字符对应的文字应该是什么都没有：<br><span class="img-wrap"><img data-src="/img/bVyWdq" src="https://static.alili.tech/img/bVyWdq" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>但是，我们的iconfont中赋予了这个字符的图像：<span class="img-wrap"><img data-src="/img/bVyWds" src="https://static.alili.tech/img/bVyWds" alt="140030_aPBx_1177792.png" title="140030_aPBx_1177792.png" style="cursor: pointer;"></span>，于是，我们将这个字符所在的区域的字体，设置为我们的iconfont文件。于是浏览器就渲染出了这个字符在我们的font文件中，对应的图像。这里要注意一下---- ，是一个字符的html编码。这个字符在浏览器中没有定义，但是在iconfont中有定义。我们可以使用unicode码来唯一标识一个字符，将这个字符在我们的文件中画出来。这样就可以利用上iconfont了。</p>
<h2 id="articleHeader3">4 iconfont怎么做？</h2>
<p>既然知道了怎么用，就要开始了解一下，如何制作一个iconfont了。国内有阿里巴巴的iconfont平台，可以选自己喜欢的图标导出iconfont。</p>
<p><a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">http://www.iconfont.cn/</a></p>
<p>如果我们手里有一些图标，想转换为iconfont的话，可以直接使在线工具转换：</p>
<p><a href="http://image.online-convert.com/convert-to-svg" rel="nofollow noreferrer" target="_blank">http://image.online-convert.com/convert-to-svg</a></p>
<p>设计师们也可以使用illustrator直接将图片导出为svg，具体导出方式可以参考如下链接：</p>
<p><a href="http://www.w3cplus.com/svg/svg-files-from-illustrator-to-the-web.html" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/svg/svg-files-from-illustrator-to-the-web.html</a></p>
<p>导出单个icon的svg后，可以上传至阿里巴巴的iconfont平台，与其他图标拼合成一张字体文件。(后续会更新一个我们自产的iconfont生成框架)</p>
<h2 id="articleHeader4">5 iconfont的利与弊</h2>
<p>看到这里，一些同学肯定会问，那我们为什么要用iconfont呢？直接用图片不就好了。</p>
<p>这里我们分析一下使用iconfont的利与弊</p>
<h3 id="articleHeader5">5.1 iconfont的利</h3>
<h4>5.1.1 iconfont图像放大后，不会失真。</h4>
<p>相信读者们没有见过文字在网页上放大的时候会失真的状况吧，因为字体是矢量的，字体的描绘只记录绘制的路径。而图片不是，我们如果把一张小图放大若干倍之后，会发现图像变得模糊了。因为图像是基于像素点的描述，放大后，之前图像的一个像素，被放大为多个像素。自然是会失真的</p>
<h4>5.1.2 iconfont节省流量</h4>
<p>在图片清晰度要求越高的情况下，我们的图片本身就会越大。这样非常耗费资源，而且，图像需要的色彩值信息，也会存储。这样也极大的浪费了空间。iconfont颜色由css决定，尺寸要求变大的话，则适应性的变大。传输的大小不会变大。</p>
<h4>5.1.3 iconfont在颜色变幻方面很简单</h4>
<p>试想，如果一个图标一开始是黑色的hover上去的时候变为蓝色的话，如果这个icon是用图片来实现的话，我们需要在hover的时候，更换背景图片，如果使用iconfont的话，则可以直接替换icon的color就行。</p>
<h3 id="articleHeader6">5.2 iconfont的弊</h3>
<h4>5.2.1 iconfont不能支持一个图像里面混入多重颜色</h4>
<p>作为文字，是不会出现左边是红色右边是绿色的状况的。一个文字，是一个整体，统一的颜色。这个颜色就取决于css的color了。所以使用iconfont做图标的话，最好使用纯色的图标。</p>
<h4>5.2.2 iconfont的使用没有使用图片那么直接，简单。</h4>
<p>如果单论直接使用的话，图片还是比较便捷的。</p>
<p>至于自己的网站要不要使用iconfont就看各位了。</p>
<p>本章的例子在github上，需要的同学请自行查看：</p>
<p><a href="https://github.com/houyu01/iconfontsample" rel="nofollow noreferrer" target="_blank">https://github.com/houyu01/iconfontsample</a></p>
<p><strong>接下来的一篇文章，我将会和读者们一起聊聊前端模板拼装与渲染的那些事儿，不要走开，请关注我.....</strong><br><a href="https://segmentfault.com/a/1190000005916423">前端模板拼装与渲染的那些事儿</a><br>原创文章,版权所有,转载请注明出处</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[聊一聊系列]聊一聊iconfont那些事儿

## 原文链接
[https://segmentfault.com/a/1190000005904616](https://segmentfault.com/a/1190000005904616)

