---
title: '一篇文章了解HTML文档流(normal flow)' 
date: 2018-12-22 2:30:10
hidden: true
slug: w9bvad632q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">题外话</h2>
<p>之前在知乎中写的几篇文章，但是由于不太适合写技术文章，所以来到了这里，接下来的几篇文章就搬运过来吧！</p>
<p>PS：排版很费时间啊。。。</p>
<h2 id="articleHeader1">文档流（normal flow）</h2>
<p>要想了解什么是文档流，那就要知道流的概念。想象一下，什么是“流”？我们平常说的“水流”“流体”，我们就可以把像河流那样长长的东西作为流。</p>
<p><span class="img-wrap"><img data-src="/img/bV0izy?w=260&amp;h=322" src="https://static.alili.tech/img/bV0izy?w=260&amp;h=322" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那这里所指的文档流指的是什么呢？由于这是显示在浏览器上面的，显示在电脑屏幕前的。如果我们将屏幕的两侧想象成河道，将屏幕的上面作为流的源头，将屏幕的底部作为流的结尾的话，那我们就抽象出来了文档流 ！</p>
<p><span class="img-wrap"><img data-src="/img/bV0izU?w=600&amp;h=273" src="https://static.alili.tech/img/bV0izU?w=600&amp;h=273" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>像水流，流动的是水，电磁流流动的是电磁。那文档流流动的又是什么呢？那就是元素！可以将屏幕中显示的内容都可以一一对应为文档中的一个元素，在这里就引出两个概念：<strong>内联元素</strong>与<strong>块级元素</strong></p>
<h2 id="articleHeader2">块级元素和内联元素</h2>
<p>别被这两个东西吓到了，块级元素（block）内联元素（inline）。看过英文是不是很简单呢？<br>块级元素：四四方方的块，在文档中自己占一行。如<code>&lt;div&gt;</code> <code>&lt;p&gt;</code><br>内联元素：（行内元素）多个内联元素，可以在一行显示。如<code>&lt;span&gt;</code> <code>&lt;img&gt;</code></p>
<p>我们对块级元素和内联元素的初级印象已经掌握，但是还不够！</p>
<hr>
<h4>如何区分哪些是块级元素，哪些是内联元素？</h4>
<p>如果我们是开发html的语言的人，你会把什么元素设计成块状（杜占一行）什么元素又设计成内联元素呢？以我的观点来看，将<strong>展现宏观</strong>的元素设置成块（<strong>相对宏大</strong>） 将<strong>修饰细节</strong>的东西设置成行内元素（相对细微）。例如：<code>&lt;div&gt;</code>元素就是作为容器出道的，他肯定就是块级元素。而<code>&lt;strong&gt;</code> 这些修饰个别文字的样式，就是内联元素。当然这不是绝对，只是我yy的结果。</p>
<p>是不是还感觉到蒙蒙的状态呢？再来一剂提神醒脑的神药！<br>多说无意，请看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--html中-->
<body>
        <span class=&quot;inline&quot;>hello</span>
        <span class=&quot;inline&quot;>world</span>
        <div class=&quot;block&quot;>
            hello world
        </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--html中--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>world<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
            hello world
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>有两个内联元素，这一次再深刻的理解一下，在《CSS权威》中：内联元素是始终以“行布局”，意思是，始终以行的形式表现。不理解没关系，马上你就会知道了。</p>
<p>没加CSS样式的效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bV0iCe?w=600&amp;h=182" src="https://static.alili.tech/img/bV0iCe?w=600&amp;h=182" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来我们再加上边框效果，你会看的更清晰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*CSS样式表*/
.inline{
    border:1px solid #ccc;
}

.block{
    
    border:1px solid #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*CSS样式表*/</span>
<span class="hljs-selector-class">.inline</span>{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}

<span class="hljs-selector-class">.block</span>{
    
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bV0iCv?w=490&amp;h=108" src="https://static.alili.tech/img/bV0iCv?w=490&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>我们能看见：</strong></p>
<ul>
<li>内联元素有两个框，并且在一行显示，而块级元素，虽然第一行的后面能“放下”它，但是却另起一行。（可以更加简单粗暴的理解为前后都加了一个换行符）</li>
<li>内联元素的连接不是绝对的无缝连接，而是正好是一个空格单位的间隔。你可能会问会不会是&lt;span&gt;元素的特殊性呢？</li>
</ul>
<p>我们接下来继续测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--在上面html代码中修改-->
<body>
        <span class=&quot;inline&quot;>hello</span>
        <span class=&quot;inline&quot;>world</span>
        hello
        <div class=&quot;block&quot;>
            hello world
        </div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--在上面html代码中修改--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>world<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        hello
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
            hello world
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV0iC6?w=318&amp;h=95" src="https://static.alili.tech/img/bV0iC6?w=318&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可见新加的元素也是一空格分隔。先别急着下结论，接着看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--在上面html代码中修改-->
<body>
        <span class=&quot;inline&quot;>hello</span>
        <span class=&quot;inline&quot;>w<strong>o</strong>rld</span>
        hello
        <div class=&quot;block&quot;>
            hello world
        </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--在上面html代码中修改--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>w<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>o<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>rld<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        hello
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
            hello world
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV0iC6?w=318&amp;h=95" src="https://static.alili.tech/img/bV0iC6?w=318&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>并没有以空格分隔。<br>关于空格问题的进一步思考：这两个不同显示的区别在哪里呢？第一次<code>span</code>是在新起一行，而第二个<code>strong</code> 则是在其他元素的前面。所以猜测有可能是这个换行符搞的鬼！</p>
<p>现在我们将<code>strong</code>新起一行显示，观察效果。</p>
<p><span class="img-wrap"><img data-src="/img/bV0kfy?w=414&amp;h=97" src="https://static.alili.tech/img/bV0kfy?w=414&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Amazing！</p>
<h4>由此我们总结一下</h4>
<p><strong>在内联元素中回车符会被显示成为一个空格，所以很好的解决了矛盾</strong></p>
<p>然而行内元素并非只有文本，图片元素仍然是一个头疼的问题，原因是：他的大小不一定啊，和文字不同。所以有必要再拿图片来测试一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
        <span class=&quot;inline&quot;>hello</span>
        <span class=&quot;inline&quot;>w<strong>o</strong><span>r</span>ld</span>
        hello
        <img  class=&quot;inline&quot; src=&quot;test.gif&quot;/>
        <div class=&quot;block&quot;>
            hello world
        </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>w<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>o<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>r<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>ld<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        hello
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.gif"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
            hello world
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bV0iEY?w=600&amp;h=358" src="https://static.alili.tech/img/bV0iEY?w=600&amp;h=358" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好好观察有没有一点熟悉呢？像不像word里面的排版呢？让我们来看一下word中的排版。<br><span class="img-wrap"><img data-src="/img/bV0iFr?w=600&amp;h=357" src="https://static.alili.tech/img/bV0iFr?w=600&amp;h=357" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>是不是容易理解多了呢？在图片后面添加内联元素，就和word中添加文字一样！按这样类比的话，块级元素就是多加了一个回车（真正意义上的）！！！</p>
<p>由此行内元素和块级元素已经总结完。</p>
<h2 id="articleHeader3">块级元素和行内元素的转换</h2>
<p>类似于文档的排版，我可以把一个内联元素加两个回车，换成块级元素。在CSS中是如何实现这种转换的呢？<br>可以说是灰常的easy了，还记得开头的两个英文吗？块级元素（block） 行内元素（inline）<br>只要加上<code>display:block;</code>或者是<code>display：inline</code>就可以转换了！</p>
<p>举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--Html-->
    <body>
        <span class=&quot;inline&quot;>hello</span>
        <span class=&quot;inline&quot;>w<strong>o</strong><span>r</span>ld</span>
        hello
        <img  class=&quot;inline&quot; src=&quot;test.gif&quot;/>
        <div class=&quot;block&quot;>
            hello world
        </div>
    </body>

/*CSS*/
.inline{
    border:1px solid #ccc;
    display:block;
}

.block{
    display:inline;
    border:1px solid #ccc;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--Html--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span>&gt;</span>w<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>o<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>r<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>ld<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        hello
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"inline"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.gif"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
            hello world
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

/*CSS*/
.inline{
    border:1px solid #ccc;
    display:block;
}

.block{
    display:inline;
    border:1px solid #ccc;
}
</code></pre>
<p>图片描述</p>
<h4>还没有结束</h4>
<p>关于内联元素的东西还有很多，进一步探究行内元素，必看！（很重要）（由于还没有所以先不放链接）</p>
<h2 id="articleHeader4">脱离文档流</h2>
<p>但是仅有的两种排版，就满足了我们的需求吗？肯定是不够的！！应该有一种更加自由的变换，从而满足多样的世界。有三种方式脱离文档流：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position:absolute
position:fixed
float" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">position</span>:absolute
<span class="hljs-built_in">position</span>:fixed
<span class="hljs-keyword">float</span></code></pre>
<p>回到文章开头的例子上面，将文档流比作是河流的话，水就相当于文档流里面的元素。而脱离文档流就相当于脱离水跑到水的上面飘着，就像河流上的小船。关于定位的内容，会在之后的文章中继续讲解。</p>
<p><span class="img-wrap"><img data-src="/img/bV0iGk?w=600&amp;h=417" src="https://static.alili.tech/img/bV0iGk?w=600&amp;h=417" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>看到这里都不点个赞吗？<br>以上参杂了自己的一些理解，如有错误，欢迎指出，禁止转载。</p>
<h2 id="articleHeader6">更新记录</h2>
<p>2017.11.21    第一版<br>2017.12.02    第二版：更新图片不清晰的问题，加入关于内联元素排列空格的问题。<br>2017.12.03    第三版：加入内敛元素不能更改width，，，等的说明。<br>2017.12.04    第四版：更新了第三版加入的错误。进一步探究。<br>2017.12.14    第五版：将内联元素的空格问题这个错误修复</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇文章了解HTML文档流(normal flow)

## 原文链接
[https://segmentfault.com/a/1190000012425858](https://segmentfault.com/a/1190000012425858)

