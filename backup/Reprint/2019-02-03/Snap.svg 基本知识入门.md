---
title: 'Snap.svg 基本知识入门' 
date: 2019-02-03 2:30:40
hidden: true
slug: 853kqfmqmf7
categories: [reprint]
---

{{< raw >}}

                    
<p>最近做了一个关于SVG的应用的技术分享网站<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">svgtrick.com</a>，会同步一些文章到这里来，更多的可以去网站看看。</p>
<p>工欲善其事，必先利其器。要用svg制作复杂或者是高级的动画效果，javascript就必不可少来。今天我们就来学习下svg中的jQuery库<a href="http://snapsvg.io/" rel="nofollow noreferrer" target="_blank">Snap.svg</a>这一js库，它的功能跟jQuery在dom的作用差不多，只不过它是专门用来操作svg的。有了它，我们就可以轻松的使用javascript和svg打交道了。</p>
<p>接下来以实际的例子来讲解下Snap的使用方法。</p>
<h3 id="articleHeader0">Snap的那些事儿</h3>
<p>说起Snap就不得不提<a href="http://raphaeljs.com/" rel="nofollow noreferrer" target="_blank">Raphäel.js</a>这个库。因为Snap的创造者正是Raphäel.js的创造者<a href="http://dmitry.baranovskiy.com/" rel="nofollow noreferrer" target="_blank">Dmitry Baranovskiy</a>，而Raphäel.js也是用来操作svg的。它的主要一个功能是能使老版本的IE浏览器也能支持svg，比如ie6等。</p>
<p>而snap的出现，则是实现了svg中的一些高级特性的功能，比如蒙板、渐变、分组以及动画等高级特性，而且也不再对老版本的不支持svg的浏览器进行兼容，大大减少了代码量更加能发挥svg的特性。</p>
<h3 id="articleHeader1">Snap能做些什么</h3>
<p>从官方的文档<a href="http://snapsvg.io/docs/" rel="nofollow noreferrer" target="_blank">API documentation</a>可以看到，所有svg的特性我们都可以使用Snap来操作，比如<a href="http://snapsvg.io/docs/#Paper.mask" rel="nofollow noreferrer" target="_blank">mask</a>,<a href="http://snapsvg.io/docs/#Paper.mask" rel="nofollow noreferrer" target="_blank">group</a>,<a href="http://snapsvg.io/docs/#Paper.gradient" rel="nofollow noreferrer" target="_blank">gradient</a>,<a href="http://snapsvg.io/docs/#Snap.filter.blur" rel="nofollow noreferrer" target="_blank">filter</a>,<a href="http://snapsvg.io/docs/#Snap.animate" rel="nofollow noreferrer" target="_blank">animate</a>,<br><a href="http://snapsvg.io/docs/#Element.pattern" rel="nofollow noreferrer" target="_blank">pattern</a>等属性。</p>
<p>使用snap能帮助我们创建svg格式的图形，当然也能基于现有的svg图形来进行操作。意味着我们不一定要使用snap来创建图形，我们可以先使用一些适量编辑软件如Adobe IIIustrator,Inkscape,或者是Sketch来制作svg图形，然后再使用snap来进行一些操作。</p>
<h3 id="articleHeader2">开始使用Snap</h3>
<p>方便起见，我们这里使用<a href="http://codepen.io/" rel="nofollow noreferrer" target="_blank">codepen</a>来做一些demo。</p>
<p>首先准备一个基本开始骨架，基本的hmtl结构以及引入snapsvg.js这个库。</p>
<p>准备好后就可以开始编码啦。</p>
<p>其实它的使用方法跟jQuery差不多，开始之前需要初始化Snap，即使用Snap来制定我们需要操作svg的节点并把它指定给一个变量。我们这里就定义为s。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = Snap(&quot;#svg&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var s</span> = Snap(<span class="hljs-string">"#svg"</span>);</code></pre>
<p>是不是似增相识。</p>
<p>现在我们就可以使用Snap提供的各种方法来操作<strong>s</strong>这个变量，比如圆或者是矩形。</p>
<ul>
<li><p>圆，创建圆需要三个参数：X(x轴的坐标)，Y(y轴的坐标)，半径。具体可以参考文档<a href="http://snapsvg.io/docs/#Paper.circle" rel="nofollow noreferrer" target="_blank">circle API</a></p></li>
<li><p>矩形，需要四个参数：X，Y，宽，高。文档地址<a href="http://snapsvg.io/docs/#Paper.rect" rel="nofollow noreferrer" target="_blank">rect API</a></p></li>
<li><p>椭圆，需要四个参数：X，Y，horizontal radius(水平方向的半径)，vertical radius(垂直方向的半径)。文档地址<a href="http://snapsvg.io/docs/#Paper.ellipse" rel="nofollow noreferrer" target="_blank">ellipse API</a></p></li>
</ul>
<p>我们输入下面的js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //创建床半径为80的圆
    var circle = s.circle(90,120,80);
    // 宽为210de的juxing
    var square = s.rect(210,40,160,160);
    //椭圆
    var ellipse = s.ellipse(460,120,50,80);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-comment">//创建床半径为80的圆</span>
    var circle = s.circle(<span class="hljs-number">90</span>,<span class="hljs-number">120</span>,<span class="hljs-number">80</span>);
    <span class="hljs-comment">// 宽为210de的juxing</span>
    var square = s.rect(<span class="hljs-number">210</span>,<span class="hljs-number">40</span>,<span class="hljs-number">160</span>,<span class="hljs-number">160</span>);
    <span class="hljs-comment">//椭圆</span>
    var ellipse = s.ellipse(<span class="hljs-number">460</span>,<span class="hljs-number">120</span>,<span class="hljs-number">50</span>,<span class="hljs-number">80</span>);
</code></pre>
<p>就会为我们绘制下面这三个图形：</p>
<p><span class="img-wrap"><img data-src="http://i1.piimg.com/567571/4a5808b70839058c.png" src="https://static.alili.techhttp://i1.piimg.com/567571/4a5808b70839058c.png" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="http://codepen.io/janily/pen/Igmka" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/Igmka" data-typeid="3">点击预览</button></p>
<p>从代码运行的结果来看，默认填充的颜色是黑色。下面我们使用snap来设置一些样式，如填充、透明度、边框、边框的宽度等属性。具体可以去看看文档<br><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute" rel="nofollow noreferrer" target="_blank">SVG attributes</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    circle.attr({
      fill: 'coral',
      stroke: 'coral',
      strokeOpacity: .3,
      strokeWidth: 10
    });
 
    square.attr({
      fill: 'lightblue',
      stroke: 'lightblue',
      strokeOpacity: .3,
      strokeWidth: 10
    });
 
    ellipse.attr({
      fill: 'mediumturquoise',
      stroke: 'mediumturquoise',
      strokeOpacity: .2,
      strokeWidth: 10
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">circle</span><span class="hljs-selector-class">.attr</span>({
      <span class="hljs-attribute">fill</span>: <span class="hljs-string">'coral'</span>,
      stroke: <span class="hljs-string">'coral'</span>,
      strokeOpacity: .<span class="hljs-number">3</span>,
      strokeWidth: <span class="hljs-number">10</span>
    });
 
    <span class="hljs-selector-tag">square</span><span class="hljs-selector-class">.attr</span>({
      <span class="hljs-attribute">fill</span>: <span class="hljs-string">'lightblue'</span>,
      stroke: <span class="hljs-string">'lightblue'</span>,
      strokeOpacity: .<span class="hljs-number">3</span>,
      strokeWidth: <span class="hljs-number">10</span>
    });
 
    <span class="hljs-selector-tag">ellipse</span><span class="hljs-selector-class">.attr</span>({
      <span class="hljs-attribute">fill</span>: <span class="hljs-string">'mediumturquoise'</span>,
      stroke: <span class="hljs-string">'mediumturquoise'</span>,
      strokeOpacity: .<span class="hljs-number">2</span>,
      strokeWidth: <span class="hljs-number">10</span>
    });
</code></pre>
<p>这样我们的图形看起来比前面就更漂亮来些！</p>
<p><span class="img-wrap"><img data-src="http://i1.piimg.com/567571/f2be11d5ed1e5813.png" src="https://static.alili.techhttp://i1.piimg.com/567571/f2be11d5ed1e5813.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/janily/pen/hKpaA" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/hKpaA" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader3">分组操作图形</h3>
<p><a href="http://snapsvg.io/" rel="nofollow noreferrer" target="_blank">Snap</a>为我们提供来分组操作<a href="http://snapsvg.io/docs/#Paper.group" rel="nofollow noreferrer" target="_blank">group</a>这一强大的功能，顾名思义，使用它我们可以把多个图形编成一组，使之变为一个图形。</p>
<p>先来创建两个图形，然后把它们编成一组。再来操作它们的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var circle_1 = s.circle(200, 200, 140);
    var circle_2 = s.circle(150, 200, 140);
 
    var circles = s.group(circle_1, circle_2);
 
    circles.attr({
      fill: 'coral',
      fillOpacity: .6
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-keyword">var</span> circle_1 = s.circle(<span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">140</span>);
    <span class="hljs-keyword">var</span> circle_2 = s.circle(<span class="hljs-number">150</span>, <span class="hljs-number">200</span>, <span class="hljs-number">140</span>);
 
    <span class="hljs-keyword">var</span> circles = s.<span class="hljs-keyword">group</span>(circle_1, circle_2);
 
    circles.attr({
      fill: <span class="hljs-string">'coral'</span>,
      fillOpacity: <span class="hljs-number">.6</span>
    });</code></pre>
<p>结果如下：</p>
<p><span class="img-wrap"><img data-src="http://i1.piimg.com/567571/b1b846cfe08e2dc4.png" src="https://static.alili.techhttp://i1.piimg.com/567571/b1b846cfe08e2dc4.png" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="http://codepen.io/janily/pen/Dgros" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/Dgros" data-typeid="3">点击预览</button></p>
<p>在文章开始部分，我们说过会做一个眼睛的例子。需要用到svg中的蒙板属性<a href="http://snapsvg.io/docs/#Paper.mask" rel="nofollow noreferrer" target="_blank">mask</a>。首先我们来创建一个椭圆并放置在上组图形的中间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var circle_1 = s.circle(300, 200, 140);
    var circle_2 = s.circle(250, 200, 140);
 
    var circles = s.group(circle_1, circle_2);
 
    var ellipse = s.ellipse(275, 220, 170, 90);
 
    circles.attr({
      fill: 'coral',
      fillOpacity: .6,
    });
 
    ellipse.attr({
      opacity: .4
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> circle_1 = s.circle(<span class="hljs-number">300</span>, <span class="hljs-number">200</span>, <span class="hljs-number">140</span>);
    <span class="hljs-built_in">var</span> circle_2 = s.circle(<span class="hljs-number">250</span>, <span class="hljs-number">200</span>, <span class="hljs-number">140</span>);
 
    <span class="hljs-built_in">var</span> circles = s.group(circle_1, circle_2);
 
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">ellipse</span> = s.<span class="hljs-built_in">ellipse</span>(<span class="hljs-number">275</span>, <span class="hljs-number">220</span>, <span class="hljs-number">170</span>, <span class="hljs-number">90</span>);
 
    circles.attr({
      fill: 'coral',
      fillOpacity: .<span class="hljs-number">6</span>,
    });
 
    <span class="hljs-built_in">ellipse</span>.attr({
      <span class="hljs-built_in">opacity</span>: .<span class="hljs-number">4</span>
    });
    </code></pre>
<p><span class="img-wrap"><img data-src="http://i1.piimg.com/567571/76e3c748c4095e58.png" src="https://static.alili.techhttp://i1.piimg.com/567571/76e3c748c4095e58.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/janily/pen/BovgL" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/BovgL" data-typeid="3">点击预览</button></p>
<p>现在我们就以椭圆为蒙板来对图形进行剪裁，并且对椭圆填充为白色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    circles.attr({
      fill: 'coral',
      fillOpacity: .6,
      mask: ellipse
    })
 
    ellipse.attr({
      fill: '#fff',
      opacity: .8
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">circles</span><span class="hljs-selector-class">.attr</span>({
      <span class="hljs-attribute">fill</span>: <span class="hljs-string">'coral'</span>,
      fillOpacity: .<span class="hljs-number">6</span>,
      mask: ellipse
    })
 
    <span class="hljs-selector-tag">ellipse</span><span class="hljs-selector-class">.attr</span>({
      <span class="hljs-attribute">fill</span>: <span class="hljs-string">'#fff'</span>,
      opacity: .<span class="hljs-number">8</span>
    });
    </code></pre>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/3c680708b7e7d59b.png" src="https://static.alili.techhttp://i2.buimg.com/567571/3c680708b7e7d59b.png" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="http://codepen.io/janily/pen/fAFJa" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/fAFJa" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader4">让图形动起来</h3>
<p>眼睛的形状就完成来，不过要是让眼睛动起来会更加有趣一点。使用Snap中的<a href="http://snapsvg.io/docs/#Set.animate" rel="nofollow noreferrer" target="_blank">animate</a>方法来实现动画效果非常方便。要使眼睛动起来，我们只需要让椭圆的垂直的半径从1增加到90就可以了。</p>
<p>先来创建一个名为<strong>blink</strong>的动画函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function blink(){
        ellipse.animate({ry:1)},220,function(){
            ellipse.animate({ry:90},300);
            )}
    };
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">blink</span><span class="hljs-params">()</span></span>{
        ellipse.animate({ry:<span class="hljs-number">1</span>)},<span class="hljs-number">220</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            ellipse.animate({ry:<span class="hljs-number">90</span>},<span class="hljs-number">300</span>);
            )}
    };
    </code></pre>
<p>现在我们可以使用<strong>setInterval</strong>函数来循环执行<strong>blink</strong>动画，这样我们的眼睛就会不停的运动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    setInterval(blink,3000);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>    setInterval(<span class="hljs-name">blink</span>,<span class="hljs-number">3000</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>最后完整的代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var circle_1 = s.circle(300, 200, 140);
    var circle_2 = s.circle(250, 200, 140);
 
    // 编组图形
 
    var circles = s.group(circle_1, circle_2);
 
    var ellipse = s.ellipse(275, 220, 170, 90);
 
    // 填充颜色并使用蒙版
    
    circles.attr({
      fill: 'coral',
      fillOpacity: .6,
      mask: ellipse
    });
 
    ellipse.attr({
      fill: '#fff',
      opacity: .8
    });
 
    // 眨眼动画让椭圆的垂直的半径从1增加到90
 
    function blink(){
      ellipse.animate({ry:1}, 220, function(){
    ellipse.animate({ry: 90}, 300);
      });
    };
 
    // 每三秒执行一次动画
 
    setInterval(blink, 3000);
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> circle_1 = s.circle(<span class="hljs-number">300</span>, <span class="hljs-number">200</span>, <span class="hljs-number">140</span>);
    <span class="hljs-keyword">var</span> circle_2 = s.circle(<span class="hljs-number">250</span>, <span class="hljs-number">200</span>, <span class="hljs-number">140</span>);
 
    <span class="hljs-comment">// 编组图形</span>
 
    <span class="hljs-keyword">var</span> circles = s.group(circle_1, circle_2);
 
    <span class="hljs-keyword">var</span> ellipse = s.ellipse(<span class="hljs-number">275</span>, <span class="hljs-number">220</span>, <span class="hljs-number">170</span>, <span class="hljs-number">90</span>);
 
    <span class="hljs-comment">// 填充颜色并使用蒙版</span>
    
    circles.attr({
      fill: <span class="hljs-string">'coral'</span>,
      fillOpacity: <span class="hljs-number">.6</span>,
      mask: ellipse
    });
 
    ellipse.attr({
      fill: <span class="hljs-string">'#fff'</span>,
      opacity: <span class="hljs-number">.8</span>
    });
 
    <span class="hljs-comment">// 眨眼动画让椭圆的垂直的半径从1增加到90</span>
 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">blink</span><span class="hljs-params">()</span></span>{
      ellipse.animate({ry:<span class="hljs-number">1</span>}, <span class="hljs-number">220</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    ellipse.animate({ry: <span class="hljs-number">90</span>}, <span class="hljs-number">300</span>);
      });
    };
 
    <span class="hljs-comment">// 每三秒执行一次动画</span>
 
    setInterval(blink, <span class="hljs-number">3000</span>);
    </code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="http://i2.buimg.com/567571/5cc3043fee1dc229.gif" src="https://static.alili.techhttp://i2.buimg.com/567571/5cc3043fee1dc229.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/janily/pen/DGebI" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="janily/pen/DGebI" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader5">浏览器支持</h3>
<p>要注意的使，Snap只支持<strong>IE9+</strong>,chrome,safari,firefox以及opera等现代浏览器。</p>
<h3 id="articleHeader6">开源</h3>
<p>Snap.svg使开源的，意味着我们可以免费使用它来开发。</p>
<p>参考文章：</p>
<p><a href="http://webdesign.tutsplus.com/articles/how-to-manipulate-and-animate-svg-with-snapsvg--cms-21323" rel="nofollow noreferrer" target="_blank">How to Manipulate and Animate SVG With Snap.svg</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Snap.svg 基本知识入门

## 原文链接
[https://segmentfault.com/a/1190000006961922](https://segmentfault.com/a/1190000006961922)

