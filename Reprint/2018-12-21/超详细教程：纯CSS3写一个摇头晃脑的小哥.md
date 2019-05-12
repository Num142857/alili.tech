---
title: '超详细教程：纯CSS3写一个摇头晃脑的小哥' 
date: 2018-12-21 2:30:11
hidden: true
slug: gc5c7oibtdo
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1.制作背景</h1>
<p>1.1作为一个刚刚打算要入行的准前端，并没有什么基础，暂时是按照网上的前辈们的指导，按部就班地学习中。首先就要学习CSS3的使用。前期，做过几个比较简单的网站首页的仿制，现在想要试试动画效果的制作。如果有什么写得不对的地方，欢迎批评指正：我要进步！<br>1.2没有什么美术基础，不会设计，所以找到了一个挺有兴趣的案例，就想要拿来试试看。到现在为止，都没有看过原作的代码。没能完全实现人家的效果，以后有机会再详细修改。也没能做到像素级还原，所以我做的小哥跟人家的长得不太一样……<br>来源（我做的是案例1）： <a href="http://www.html5tricks.com/7-pure-css3-animation.html" rel="nofollow noreferrer" target="_blank">链接描述</a><br>这是我在GitHub上的完整代码：<a href="https://github.com/alma1024/practice/tree/master/shakehead" rel="nofollow noreferrer" target="_blank">链接描述</a><br><span class="img-wrap"><img data-src="/img/bV0FT2?w=364&amp;h=322" src="https://static.alili.tech/img/bV0FT2?w=364&amp;h=322" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">2.静态效果</h1>
<p>2.1 背景部分<br>2.1.1 首先是图中那个圆背景，这个比较好实现。<br><span class="img-wrap"><img data-src="/img/bV0FP3?w=275&amp;h=289" src="https://static.alili.tech/img/bV0FP3?w=275&amp;h=289" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>为了定位在屏幕中央，并且与顶部有一定距离，首先设置了如下样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;container&quot;>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    margin:50px 0 0 0;
}
.container{
    margin-left:auto;
    margin-right: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">margin-left</span>:auto;
    <span class="hljs-attribute">margin-right</span>: auto;
}</code></pre>
<p>下面是具体内容：<br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bg-circle&quot;>
    <div class=&quot;bg&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg-circle"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bg{    
    height: 30px;
    width: 300px;
    background-color: #699;
}        
.bg-circle{    
    margin-left:auto;
    margin-right:auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bg</span>{    
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#699</span>;
}        
<span class="hljs-selector-class">.bg-circle</span>{    
    <span class="hljs-attribute">margin-left</span>:auto;
    <span class="hljs-attribute">margin-right</span>:auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>一般说来，css部分可以是一个单独的文件，引入它的时候只需要在&lt;head&gt;&lt;/head&gt;里面写这样一句就可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <link rel=&quot;stylesheet&quot; href=&quot;shakehead.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"shakehead.css"</span>&gt;</span></code></pre>
<p>我是把这个html页和css页放在了同级目录中，所以路径href里面直接写文件名即可。在上面的代码中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin-left:auto;margin-right:auto;可以确保水平方向的居中显示。
border-radius: 50%;可以把正方形变成一个正圆。
overflow: hidden;可以确保子元素不会超出这个元素所给出的区域。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin-left</span>:auto;<span class="hljs-attribute">margin-right</span>:auto;可以确保水平方向的居中显示。
<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;可以把正方形变成一个正圆。
<span class="hljs-attribute">overflow</span>: hidden;可以确保子元素不会超出这个元素所给出的区域。</code></pre>
<p>另外，因为.bg-circle设置了overflow: hidden;所以.bg的宽高只要大于300px，就根本看不出来区别的（捂脸……）。</p>
<p>2.1.2 左右各有一块影子，考虑到都不能超出那个圆形的边框，所以要作为.bg-circle的子标签才行：<br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bg-circle&quot;>
    <div class=&quot;bg&quot;></div>
    <div class=&quot;shadow-left&quot;></div>
    <div class=&quot;shadow-right&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg-circle"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shadow-left{
    position: absolute;
    z-index: 59;
    width: 240px;
    height: 100px;
    background-color: #476b6b;
    opacity: .8;
    transform: rotate(45deg);
}
.shadow-right{
    position: absolute;
    width: 320px;
    height: 100px;
    background-color: #e0ebeb;
    opacity: .7;
    transform: rotate(-35deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.shadow-left</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">59</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#476b6b</span>;
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">8</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
}
<span class="hljs-selector-class">.shadow-right</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#e0ebeb</span>;
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">7</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-35deg);
}</code></pre>
<p>细心的话，应该已经发现，左侧那个影子，有点盖住了小伙儿的身子，还盖住了一个字母，所以它要比别的层要高。就必须要设置z-index属性，具体的值，可以根据你要叠压的层的数据来写，大它1点也是大，姐也是上面那个，嘿嘿！但是，想要设置z-index，就必须要设position：relative, absolute或者fixed都可以。<br>另外，如果只是简单的倾斜，transform: rotate(Xdeg);就可以做到了，但是有时候还要考虑这个倾斜掉的元素的定位，所以严谨一点的话，还可以设置transform-origin这个属性。这个的应用网上有挺多的，相信一般人都可以看懂。最主要就是记住：第一个值是水平（X），第二个值是竖直（Y）；默认的中心是50%，50%，左上角是0，0，右下角是100%，100%。<br>但是因为这两个阴影是过了一会儿才出来的，所以现在的代码写完，是看不到它们的。为了调试，可以暂时定位成最终位置：<br><span class="img-wrap"><img data-src="/img/bV0FQ6?w=269&amp;h=282" src="https://static.alili.tech/img/bV0FQ6?w=269&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shadow-left{
    left:-100px;bottom:-10px;
}
.shadow-right{
    right: -100px;bottom:10px;
}；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.shadow-left</span>{
    <span class="hljs-attribute">left</span>:-<span class="hljs-number">100px</span>;<span class="hljs-attribute">bottom</span>:-<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.shadow-right</span>{
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">100px</span>;<span class="hljs-attribute">bottom</span>:<span class="hljs-number">10px</span>;
}；</code></pre>
<p>或者右键－检查，在Elements区域，选中要看的标签，也可以显示它在哪里。<br><span class="img-wrap"><img data-src="/img/bV0FRb?w=660&amp;h=549" src="https://static.alili.tech/img/bV0FRb?w=660&amp;h=549" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>2.2 人物头部<br>2.2.1 人物的头部，组成结构应该算是全图中最复杂的了。从目的上，我要做一个纯CSS3的网页，就想尽最不靠切图来完成；从效果上，几乎每一个部分都要有动作，切一个人头出来也没有什么用，如果是切各个部分出来，说实话我不太会用PS，有那功夫还不如我用CSS写；另外，据说用CSS写的网页快一些，嘿嘿！<br>放眼望去，头部的所有部分，是的，所有部分，都是圆角不同的矩形元素。所以我们要做的就是调整好每个元素的高宽、合适的圆角，做好各层的叠压关系，最后布局在合适的位置，就算完成了。<br>2.2.2 首先，在动画中，头部作为一个整体，有一个动作，所以必需有一个包裹在外面的层存在，这里就是.head这个标签。<br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;head&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>另外，在定位的时候，有一个包裹层，也有利于里面的眉毛眼睛鼻子等的定位，我觉得还是挺方便的。<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".head{
    position: absolute;
    top: 20px;
    left: 50%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.head</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
}</code></pre>
<p>绝对定位有助于把这个头定位在我要的地方，也就是top,left可以在此基础上进行设置。<br>在做水平居中显示的时候，一般都是left:50%;margin-left:-a px;（a为要水平居中的元素的宽度的一半）组合出现的（或者全用right侧也可以）。但是因为我这里.head只是一个包裹层，并没有设置宽高的必要，所以我只用了left: 50%；这一句。打开浏览器自带的检查工具，可以看到，.head在中轴线的右侧一点点，并且没有面积。<br>2.2.3 在图中，最显眼的就是那张大脸，也是最好写的部分：<br><span class="img-wrap"><img data-src="/img/bV0FRp?w=260&amp;h=269" src="https://static.alili.tech/img/bV0FRp?w=260&amp;h=269" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;head&quot;>
    <div class=&quot;face&quot;></div>    
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>只需要让“脸”--.face作为.head的子元素而存在就可以了。<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".face{
    position: absolute;
    top:75px;
    left: 50%;
    margin-left: -60px;
    width: 120px;
    height: 170px;
    border-radius: 30px;
    background-color:  #fff7e5;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.face</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">75px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">60px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">170px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#fff7e5</span>;
}</code></pre>
<p>因为.face是头部的最底层，所以可以不设置z-index属性。<br>在给.face做居中定位的时候，就用到了这一对好朋友：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="left: 50%;
margin-left: -60px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">left</span>: 50%;
<span class="hljs-selector-tag">margin-left</span>: <span class="hljs-selector-tag">-60px</span>;</code></pre>
<p>其中，60px刚好是width: 120px;的一半。<br>为了做出这个小伙儿圆润的下巴，我设置了border-radius: 30px;其实是四个角都圆了，反正上面那两个角也看不到，被头发盖住了（就像我有个朋友因为有刘海，所以不用认真画眉毛，搞得我们露出额头每天花时间让眉毛对称的人心里很气一样）。但是，如果你强迫症比我重的话，可以只设置border-bottom-left-radius和border-bottom-right-radius的值，也是一样的。但是据说这样的话，你就写了两行代码，从代码优化的角度来讲，后者并不是最优的选择哦！<br>2.2.4 然后，我想到了要加上头发，我觉得也是挺好写的，但是理想总是很丰满……毕竟，头发是一个拱门的形状，做出主体之后，还要露出额头来，而且头顶有一搓呆毛，额头中央要耷拉下来一小丛，而且严格意义上来讲，还有耳朵前面的小鬓角我的天……在实际制作的时候，我选择把鬓角留给耳朵，毕竟它们位置关系比较近，这种时候就不要管它是不是头发了不是嘛，嘿嘿。<br>2.2.4.1 首先确定html结构。<br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;head&quot;>
    <div class=&quot;face&quot;></div>
    <div class=&quot;hair&quot;>
    <div class=&quot;forehead&quot;></div>
    <div class=&quot;rub-up&quot;></div>
    <div class=&quot;rub-down&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hair"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"forehead"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rub-up"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rub-down"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>结合刚才的结构分析，我在头发这层标签里面，又设置了额头（.forehead）、呆毛（.rub-up）和刘海（.rub-down）（英语差不多忘没了，多数都是百度到的，如果用词有不对的地方，欢迎指正，谢谢大家！）。<br>2.2.4.2 先是头发的主体部分。<br><span class="img-wrap"><img data-src="/img/bV0FRE?w=260&amp;h=278" src="https://static.alili.tech/img/bV0FRE?w=260&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hair{
    position: absolute;
    z-index: 9;
    top:160px;
    left: 50%;
    margin-left: -70px;
    width: 140px;
    background-color: #ffd11a;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hair</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">9</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">160px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">70px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">140px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffd11a</span>;
}</code></pre>
<p>头发要放在眉毛和眼睛的下层，所以z-index的值要比一会儿写的眉眼的小就可以。但是考虑到，进行动画的时候，耳朵实际上是从头发的后面冒出来的，所以要给它们留出余地，因此我在这里给.hair的z-index设置为9。<br>这里要提前说一下动画的问题：<br>在最终效果里面，头发的部分是从底部向上进行显示的，所以不能上来就给出高度和圆角，一并都写在动画效果的最终状态里面了，会在后面提到；宽度却是没有变化的，所以在这里可以先写好。因为没有高度，所以我们现在看不到头发。但是它没有高度，后面的呆毛和刘海就没法显示了，所以我先给.hair加上以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    height: 100px;
    top:60px;
    border-radius: 40px 40px 0 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">60px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">40px</span> <span class="hljs-number">40px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>2.2.4.3 然后是额头。<br><span class="img-wrap"><img data-src="/img/bV0FRK?w=263&amp;h=278" src="https://static.alili.tech/img/bV0FRK?w=263&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".forehead{
    position: absolute;
    bottom:0;
    left: 50%;
    margin-left: -55px;
    width: 110px;
    height: 65px;
    border-radius: 25px 25px 0 0;
    background-color: #fff7e5;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.forehead</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">55px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">110px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">65px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">25px</span> <span class="hljs-number">25px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff7e5</span>;
}</code></pre>
<p>用一个跟脸的背景色相同的层盖在头发所示的层之上，并设置顶部的两个圆角，就形成了一个拱形的头发效果。这里面用到了简写的方法：跟margin和padding的简写用“上－右－下－左”的顺序不同，border-radius是“左上－右上－右下－左下”（ps:多的我就不说了，网上都能找到，我只说我用到的是个什么就行了哈）。<br>2.2.4.4 头顶的呆毛和刘海。<br><span class="img-wrap"><img data-src="/img/bV0FRR?w=263&amp;h=278" src="https://static.alili.tech/img/bV0FRR?w=263&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rub-up{
    position: absolute;
    top: -10px;
    left: 50%;
    margin-left: -40px;
    width: 80px;
    border-top-right-radius: 15px;
    background-color: #ffd11a;
}        
.rub-down{
    position: absolute;
    top: 25px;
    left: 50%;
    margin-left: -20px; 
    width: 40px;
    border-bottom-left-radius:20px;
    background-color:  #ffd11a;
}
.hair,.rub-up,.rub-down{
    background-color:  #ffd11a;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rub-up</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">40px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffd11a</span>;
}        
<span class="hljs-selector-class">.rub-down</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">border-bottom-left-radius</span>:<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#ffd11a</span>;
}
<span class="hljs-selector-class">.hair</span>,<span class="hljs-selector-class">.rub-up</span>,<span class="hljs-selector-class">.rub-down</span>{
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#ffd11a</span>;    
}</code></pre>
<p>头发上方的呆毛只需要右上角的圆角，所以只写border-top-right-radius: 15px;这一个就可以。需要注意的是，跟中文说话顺序不同，这里要先说“上/下”，再说“左/右”。同样的，刘海只要左下的圆角，于是用到了border-bottom-left-radius:20px。<br>这两撮头发都是通过改变高度和定位来实现动画效果的，这里为了说明最终的结果，我把下面这些代码先加进来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rub-up{
    height: 30px;
    transform:rotate(0deg);
}
.rub-down{
    height: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rub-up</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(0deg);
}
<span class="hljs-selector-class">.rub-down</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<p>最后，给三部分的头发用同一个颜色，于是看起来浑然一体，非常像那么回事儿啦！这里就用到了CSS多个类写在一起的写法：多个类名之间用一个“,”隔开就可以了（一定一定要用英文逗号哦！）。其实还可以给每一个需要用到头发颜色的标签都写一个共同的类名，<br>比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;hair hair-color&quot;>
    <div class=&quot;forehead&quot;></div>
    <div class=&quot;rub-up hair-color&quot;></div>
    <div class=&quot;rub-down hair-color&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hair hair-color"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"forehead"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rub-up hair-color"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rub-down hair-color"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后给这个类单独设置颜色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hair-color{
    background-color:  #ffd11a;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hair-color</span>{
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#ffd11a</span>;    
}</code></pre>
<p>这样的话，后面如果还要用这个背景色，只需添加这个类即可。我觉得在代码优化的前提下，如果能保证使用方便并且尽量地语义化，更有利于整个代码的编写和后期的修改和维护。<br>2.2.5 按照从上到下的顺序，接下来我们要分别说一说眉毛、眼睛、耳朵和嘴。为什么不提鼻子呢？我想你已经猜到了，后面我再说这个，嘿嘿！<br>2.2.5.1 首先确定html结构。<br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;eyebrows&quot;>
    <div class=&quot;brow-left&quot;></div>
    <div class=&quot;brow-right&quot;></div>
</div>
<div class=&quot;eyes&quot;>
    <div class=&quot;eye-left&quot;></div>
    <div class=&quot;eye-right&quot;></div>
</div>
<div class=&quot;sockets&quot;>
    <div class=&quot;socket-left&quot;></div>
    <div class=&quot;socket-right&quot;></div>
</div>
<div class=&quot;earsandtemples&quot;>
    <div class=&quot;ear-left&quot;></div>
    <div class=&quot;ear-right&quot;></div>
    <div class=&quot;temple-left&quot;></div>
    <div class=&quot;temple-right&quot;></div>
</div>
<div class=&quot;mouth&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"eyebrows"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"brow-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"brow-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"eyes"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"eye-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"eye-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sockets"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"socket-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"socket-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"earsandtemples"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ear-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ear-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"temple-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"temple-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mouth"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>上面这些div（.eyebrows、.eyes、.sockets、.earsandtemples及.mouth）都是.head的子元素，也就是.face还有.hair的同辈元素。前面说过，因为位置相近，我把耳朵和鬃角写在了一起。其实本来眼睛和黑眼圈我也是想要写在一起的，你猜我这什么拆开了？对，因为动画中，眼睛是一眨一眨的，而且是一起眨的。我当时的想法是，给眼睛所在的包裹层写那个动作，写上之后，好的，黑眼圈也眨了起来……不信邪的话，可以试试看，效果棒棒……但是现在写这个文章的时候我忽然想到，如果我给每一只眼睛单独写动画，写同样的，也是可以的啊，我为什么那么一根筋（捂脸……）我觉得，这也说明，要想实现相同的效果，其实有很多种方法的，这也正是写代码的乐趣不是吗？<br>2.2.5.2 样式呢，我们先从眉毛开始：就是两个矩形的div，右边的那个稍作倾斜就OK啦。<br><span class="img-wrap"><img data-src="/img/bV0FSv?w=263&amp;h=278" src="https://static.alili.tech/img/bV0FSv?w=263&amp;h=278" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyebrows{
    position: absolute;
    z-index: 59;
    top:-50px;/*-----动画结束的最终效果是top:120px;*/
    left: 50%;
    margin-left: -45px;
    width: 90px;
}
.brow-left,.brow-right{
    width: 30px;
    height: 8px;
    background-color: #ffd11a;
}
.brow-left{
    float: left;
}
.brow-right{
    float:right;
    transform: rotate(10deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyebrows</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">59</span>;
    <span class="hljs-attribute">top</span>:-<span class="hljs-number">50px</span>;<span class="hljs-comment">/*-----动画结束的最终效果是top:120px;*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">45px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90px</span>;
}
<span class="hljs-selector-class">.brow-left</span>,<span class="hljs-selector-class">.brow-right</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffd11a</span>;
}
<span class="hljs-selector-class">.brow-left</span>{
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.brow-right</span>{
    <span class="hljs-attribute">float</span>:right;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(10deg);
}</code></pre>
<p>因为刚刚.hair的z-index: 9;其中就有额头这个部分，所以眉毛如果想显示出来，就至少要是9，少一点都不行，多一些没关系。所以我这里设的59也是可以的。两条眉毛被包裹在一个.eyebrows里面，只要这个父元素被绝对定位好了，写清楚宽度，里面两个眉毛就一左一右进行浮动即可，我觉得是很方便。不知道还有没有更好的方法了（一脸求知）。因为两条眉毛大小相同、颜色一致，所以样式写在了一起。<br>看起来在右边（应该是小伙儿本人的左边）的那条眉毛要倾斜一下，只需要transform: rotate(Xdeg);就行了，而且默认的旋转中心是该元素的正中心，刚好是我要的，我就没有特意去写transform-origin这个样式。<br>2.2.5.3 下面该说到眼睛和黑眼圈了（说它是眼眶也是可以……）。<br><span class="img-wrap"><img data-src="/img/bV0FSy?w=266&amp;h=279" src="https://static.alili.tech/img/bV0FSy?w=266&amp;h=279" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eyes{
    position: absolute;
    z-index: 69;
    bottom: -162px;
    left: 50%;
    margin-left: -35px;
    width: 70px;
}
.eye-left,.eye-right{
    width: 14px;
    border-radius: 7px;
    background-color:  #264c73;
    /*------动画结束的最终效果要加上:*/
        height: 22px;
}
.eye-left{
    float: left;
}
.eye-right{
    margin-left: 56px;
}        
.sockets{
    position: absolute;
    z-index: 59;
    top:155px;
    left: 50%;
    margin-left: -38px;
    width: 76px;
}
.socket-left{
    float: left;
}
.socket-right{
    float: right;
}
.socket-left,.socket-right{
    height: 10px;
    width: 20px;
    border-radius: 0 0 10px 10px;
    /*------动画结束的最终效果要加上:*/
        background-color: #cc6600;
        opacity: 0.1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eyes</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">69</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">162px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">35px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70px</span>;
}
<span class="hljs-selector-class">.eye-left</span>,<span class="hljs-selector-class">.eye-right</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">7px</span>;
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#264c73</span>;
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">22px</span>;
}
<span class="hljs-selector-class">.eye-left</span>{
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.eye-right</span>{
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">56px</span>;
}        
<span class="hljs-selector-class">.sockets</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">59</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">155px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">38px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">76px</span>;
}
<span class="hljs-selector-class">.socket-left</span>{
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.socket-right</span>{
    <span class="hljs-attribute">float</span>: right;
}
<span class="hljs-selector-class">.socket-left</span>,<span class="hljs-selector-class">.socket-right</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#cc6600</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.1</span>;
}</code></pre>
<p>眼睛在眼眶之上，所以z-index这个属性上，眼眶（59）还是要比头发（59）高（至少也要相等），但是眼睛（69）要比眼眶高。<br>看到这里，我们已经多次用到了border-radius这个属性。我感觉它可以实现非常多种的形状，很神奇！比如这里的眼睛，看起来上下两头是半圆、中间是长方形，但实际上只要让border-radius的值等于宽度的一半就可以了。看到这儿，如果最开始的正圆没有弄懂怎么回事的朋友也能懂了吧？只要让被圆角的元素宽高一致就可以了！如果宽高不一致，就会像这里的眼睛一个效果啦~<br>于是，半圆形的眼眶也是很好写的吧？只设置底部两个的圆角border-radius: 0 0 10px 10px即可。<br>但是！我并没有给眼眶设置初始颜色，所以现在这样是看不到它们的，为了展示效果，这里我先加上。因为在动画效果里，它们是淡出的，所以我直接写在了动画里面，不然的话，嗯，有兴趣的朋友可以自己试试看……<br>2.2.5.3 鬓角和耳朵的部分，前面提到过，要注意叠压关系。<br><span class="img-wrap"><img data-src="/img/bV0FS4?w=266&amp;h=279" src="https://static.alili.tech/img/bV0FS4?w=266&amp;h=279" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".earsandtemples{
    position: absolute;
    z-index:1;    
    top:160px;
    left: 50%;
    margin-left:-70px;
    width: 140px;
}
.ear-left,.ear-right{    
    position: absolute;
    width: 10px;
    background-color: #fff7e5;
}
.ear-left{
    border-bottom-left-radius:10px; 
}
.ear-right{
    border-bottom-right-radius: 10px;
}
.temple-left,.temple-right{
    position: absolute;
    width: 5px;    
    /*------动画结束的最终效果要加上:*/
        height: 20px;
        bottom:-20px;
        opacity: 1;
}
.temple-left{
    left: 10px;
}
.temple-right{
    right: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.earsandtemples</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>:<span class="hljs-number">1</span>;    
    <span class="hljs-attribute">top</span>:<span class="hljs-number">160px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">70px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">140px</span>;
}
<span class="hljs-selector-class">.ear-left</span>,<span class="hljs-selector-class">.ear-right</span>{    
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff7e5</span>;
}
<span class="hljs-selector-class">.ear-left</span>{
    <span class="hljs-attribute">border-bottom-left-radius</span>:<span class="hljs-number">10px</span>; 
}
<span class="hljs-selector-class">.ear-right</span>{
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.temple-left</span>,<span class="hljs-selector-class">.temple-right</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>;    
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">bottom</span>:-<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.temple-left</span>{
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.temple-right</span>{
    <span class="hljs-attribute">right</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p>并且把这两个鬓角类名也加在前面设置头发颜色的地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hair,.rub-up,.rub-down,.temple-left,.temple-right{
    background-color:  #ffd11a;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.hair</span>,<span class="hljs-selector-class">.rub-up</span>,<span class="hljs-selector-class">.rub-down</span>,<span class="hljs-selector-class">.temple-left</span>,<span class="hljs-selector-class">.temple-right</span>{
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#ffd11a</span>;    
}</code></pre>
<p>这里面有点意思的是，它们都是从大概太阳穴那个位置的头发里面冒出来的，所以先设一个position: absolute;就可以，具体的位置写在动画里面，通过改变top、bottom、left或者right，来让它们实现最终的效果。<br>2.2.5.3 嘴的写法和黑眼圈是一样的。<br><span class="img-wrap"><img data-src="/img/bV0FTh?w=266&amp;h=279" src="https://static.alili.tech/img/bV0FTh?w=266&amp;h=279" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mouth{
    position: absolute;
    top: 195px;
    left: 50%;
    margin-left: -25px;
    width: 50px;
    border-radius: 0 0 25px 25px;
    background-color: #fff;
    /*------动画结束的最终效果要加上:*/
        height: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.mouth</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">195px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">25px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">25px</span> <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>我写盖在脸上的那层额头的时候，到耳朵的上方就结束了，所以在嘴这里，z-index可以不写了。<br>2.2.6 现在，头部就只差那个占了半张脸的阴影，以及跟它一起出现的鼻子了。我把它们写在了一起。是的，还是因为位置相近，所以我把鼻子写在这里啦！朋友，你猜对了吗？<br><span class="img-wrap"><img data-src="/img/bV0FTm?w=269&amp;h=282" src="https://static.alili.tech/img/bV0FTm?w=269&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;shadowandnose&quot;>
    <div class=&quot;shadow&quot;></div>
    <div class=&quot;nose&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadowandnose"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nose"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这里面，.shadowandnose同样是.head的子元素。<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shadowandnose{
    position: absolute;
    z-index: 79;
    top:75px;    
    left: 50%;
    margin-left: -60px;
    width: 120px;
}
.shadow{
    width: 60px;
    height: 170px;
    border-radius: 30px;
    /*------动画结束的最终效果要加上:*/
        opacity: .1;
        background-color: #555;
}
.nose{
    position: absolute;
    left: 50%;
    top:50%;
    margin-top:-5px;
    height: 30px;
    border-top-left-radius: 15px;
    background-color:  #fff7e5;
    /*------动画结束的最终效果要加上:*/
        width: 15px;
        margin-left: -15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.shadowandnose</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">79</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">75px</span>;    
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">60px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
}
<span class="hljs-selector-class">.shadow</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">170px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">1</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#555</span>;
}
<span class="hljs-selector-class">.nose</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#fff7e5</span>;
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">15px</span>;
}</code></pre>
<p>.shadowandnose的z-index只要大于等于69即可，这里，我设置的是79。另外，因为.nose这个标签是写在.shadow之后的，默认就会在它的上层，可以不写z-index属性。反之，如果把这两个标签的前后顺序换一下，就必须要写了，有兴趣的朋友可以试一下。<br>另外呢，头顶的部分是要超出圆形边框的，所以整个头部所在的div，也就是.head，不能是被包裹在.bg-circle里的，且其z-index要高于.bg-circle。所以我把它们设为了同辈元素，并且因为前面.bg-circle的z-index：0，于是.head即使不设置z-index，也可以显示在其上方了。<br>到这里，小伙子的头部就基本完成了，其中有少量的代码需要写出动作之后才能有完整的体现，但是我也全都先写出来啦！<br>2.3 人物身子<br>2.3.1 相比上面说到的头部，人物身子的部分比较简单些。先来说说那件黑T-shirt。<br><span class="img-wrap"><img data-src="/img/bV0FTA?w=269&amp;h=282" src="https://static.alili.tech/img/bV0FTA?w=269&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bg-circle&quot;>
    <div class=&quot;bg&quot;></div>
    <div class=&quot;shirt&quot;></div>    
    <div class=&quot;shadow-left&quot;></div>
    <div class=&quot;shadow-right&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg-circle"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shirt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>因为它跟那两片阴影有些叠压的关系，所以我把它也作为了.bg-circle的子元素来写。<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shirt{    
    position: absolute;
    z-index: 39;
    bottom: -10px; 
    left: 50%;  
    margin-left: -90px;
    width: 180px;
    background-color: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.shirt</span>{    
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">39</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">10px</span>; 
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;  
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">90px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">background-color</span>: black;
}</code></pre>
<p>在这里，我要让黑T-shirt在浅阴影之上，在深阴影之下。在写浅阴影的时候，我没有给z-index的值，所以黑T-shirt只要z-index大于0即可；深阴影我当时写的z-index: 59，所以黑T-shirt小于59就行了。但是要考虑到黑T-shirt上面还有几个字，不能把z-index设太高，所以这里我设的z-index: 39。<br>2.3.2 这几个T-shirt上面的字母，因为动画中是一个一个出现的，所以我把它们每一个单独写出来。<br><span class="img-wrap"><img data-src="/img/bV0FTC?w=269&amp;h=282" src="https://static.alili.tech/img/bV0FTC?w=269&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bg-circle&quot;>
    <div class=&quot;bg&quot;></div>
    <div class=&quot;shirt&quot;></div>            
    <div class=&quot;logo&quot;>
        <div class=&quot;i&quot;>I</div>
        <div class=&quot;love&quot;>♥</div>
        <div class=&quot;c&quot;>C</div>
        <div class=&quot;s1&quot;>S</div>
        <div class=&quot;s2&quot;>S</div>
    </div>
    <div class=&quot;shadow-left&quot;></div>
    <div class=&quot;shadow-right&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg-circle"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shirt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>            
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"i"</span>&gt;</span>I<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"love"</span>&gt;</span>♥<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c"</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s1"</span>&gt;</span>S<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s2"</span>&gt;</span>S<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shadow-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>到此，.bg-circle的结构就完整了！<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo{
    display: flex;
    justify-content: space-around;
    position: absolute;
    z-index: 49;
    left:50%;
    bottom:-35px;
    margin-left:-60px; 
    width: 120px;
    height: 105px;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
}
.love{
    color:red;
}
.i,.love,.c,.s1,.s2{
    margin-top:100px;
    /*------动画结束的最终效果要加上:*/
        margin-top:25px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.logo</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-around;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">49</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">bottom</span>:-<span class="hljs-number">35px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">60px</span>; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">105px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">22px</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
}
<span class="hljs-selector-class">.love</span>{
    <span class="hljs-attribute">color</span>:red;
}
<span class="hljs-selector-class">.i</span>,<span class="hljs-selector-class">.love</span>,<span class="hljs-selector-class">.c</span>,<span class="hljs-selector-class">.s1</span>,<span class="hljs-selector-class">.s2</span>{
    <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-comment">/*------动画结束的最终效果要加上:*/</span>
        <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">25px</span>;
}</code></pre>
<p>为了更方便地让这几个字母保持等间距，我用了display: flex;属性，并设置justify-content: space-around;属性，使每个元素两侧的间隔相等，并且在两端都留有空间。其实如果我修改一下，把justify-content设为space-between，效果也是差不多的。 <br>那个小心心是我从案例的网页里复制过来的，我不知道怎么输入它(/ω＼)。<br>这几个字母在黑T-shirt的上面，又要能被深色的阴影盖住，所以这里我设的z-index: 49。<br>2.4 那两个晃动的音符就更好写了。如果不考虑动画效果，只要让它们出现、并且位于整个中央的部分之上，就可以了。<br><span class="img-wrap"><img data-src="/img/bV0FTI?w=286&amp;h=274" src="https://static.alili.tech/img/bV0FTI?w=286&amp;h=274" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;notes&quot;>
    <div class=&quot;note2&quot;><img src=&quot;note2.png&quot;></div>
    <div class=&quot;note1&quot;><img src=&quot;note1.png&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notes"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"note2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"note2.png"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"note1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"note1.png"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>和头部.head一个道理，要想显示在圆形区域.bg-circle之上，就要跟它是同辈元素，并且因为.bg-circle{z-index:0;}的设置，这里可以不写.notes的z-index。<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".notes{
    position: absolute;
    left: 50%;
    margin-left:-170px;
    width: 340px;
}
.note2{
    float: left;
    margin-left: 30px;
    opacity: 0;
}
.note1{
    float: right;
    margin-right: 30px;
    opacity: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.notes</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">170px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">340px</span>;
}
<span class="hljs-selector-class">.note2</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.note1</span>{
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>别的应该都不用我说，但是可能有人会问，上来就设成opacity: 0要干什么？说实话，我自己写完这个也小半个月了，我都懵了(◎_◎;)。我回去试了一下，发现原来是这么回事儿：因为这两个音符的动画是有延迟值的，不是上来就开始晃悠的，要等脸上的动作做完，于是它们在stand by的时候，就要隐身才行，等到要它们出场了，再在动画效果里给它们显示出来。<br>为了说明问题，我随便取了它们运动中的一个值加上去，能看出来它们在哪就行。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".note1,.note2{
    transform: rotate(0deg);
    opacity: .7;
    margin-top:-150px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.note1</span>,<span class="hljs-selector-class">.note2</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">7</span>;
    <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">150px</span>;
}</code></pre>
<p>2.5 到这里，并没有完。不知道你还记不记得，有四个黄色的环依次出现，只出场那么一次？<br><span class="img-wrap"><img data-src="/img/bV0FTR?w=307&amp;h=320" src="https://static.alili.tech/img/bV0FTR?w=307&amp;h=320" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>html代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;rounds&quot;>
    <div class=&quot;round1&quot;></div>
    <div class=&quot;round2&quot;></div>
    <div class=&quot;round3&quot;></div>
    <div class=&quot;round4&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rounds"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"round1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"round2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"round3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"round4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>.rounds也是.bg-circle它们的同辈元素，这样，才能不被.bg-circle的over-flow:hidden影响，且位于头发、音符之下。<br>css代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".round1,.round2,.round3,.round4{
    position: absolute;
    top:76px;
    left: 50%;
    margin-left: -124px;
    border-radius: 50%;
    background-color: transparent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.round1</span>,<span class="hljs-selector-class">.round2</span>,<span class="hljs-selector-class">.round3</span>,<span class="hljs-selector-class">.round4</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">76px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">124px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: transparent;
}</code></pre>
<p>如果只按上面这样写，它们是隐形的。我还是取它们动画中的一个过程值让一个圈出来现身说法一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".round1{
    border:1px solid #ffd11a;
    width: 240px;
    height: 240px;
    transform: scale(1.2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.round1</span>{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ffd11a</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.2);
}</code></pre>
<p>可能只是个人习惯吧，我写了一个包裹层.rounds，但是实际上并没有给它设置样式。我试着把它删掉，于结果上毫无影响。现在看来，只有在我想把各部分内容折叠起来的时候，包裹层确实是有用的。我现在理解得也不多，以后有新想法了再来补充修改吧。<br>还有一点是挺有意思的。如果把现在的样式写在.rounds里，而不是分别给这几个.roundX定义，会产生非常神奇的效果，我觉得这些尝试也有助于新手理解css效果的实现，有兴趣的朋友不妨动手试一试。<br>代码是看不会的，只能是动手敲会的。我觉得，做别的事也是一样。（职业病，可能晚期了，大概是治不好了吧……）</p>
<h1 id="articleHeader2">3.实现动画</h1>
<p>3.1 参照案例，记录每一个部位的动画效果和出现顺序<br>我当时用了一个比较笨的方法，用一个小本儿，一遍一遍地刷新页面，看最先出来的是哪个动作，然后是啥，每个动作是什么效果，有没有同时出现的别的动作。但是毕竟是靠估计出来的时间差还有各种角度，所以没能高度还原，就整个差不多意思，就成了。不然我可能要用出更土的招儿，比如弄个计时器什么的(/ω＼)。<br>下面是我记录的时间轴，或者说进程图？<br>开始<br>--&gt;[蓝背景大圆(出现-变大-正常,0.8s)+黑T(出现-变大-正常,1s)]+脸(变大-正常,0.5s,迟1s)<br>--&gt;[头发主体(由下向上,0.8s,迟1.5s)+鬓角(0.4s,迟2.3s)]<br>--&gt;顶毛（0.6s,迟2.3s）<br>--&gt;耳朵(0.4s,迟2.9s)<br>--&gt;刘海(0.4s,迟3.3s)<br>--&gt;{[眼睛出现(0.5s,迟3.7s)]+眼窝(0.3s,迟3.7s)+[眉毛出现(0.4s,迟3.7s),右边眉毛(3s,迟2.5s)]}<br>--&gt;嘴(0.5s,迟4.2s)<br>--&gt;字母(1s,迟4s+)<br>--&gt;[两侧阴影(5.7s,延迟写在动画里了)+四个圈(1s+,迟5s+)+脸的侧影(0.5s,迟4.7s)+鼻子(0.5s,迟4.7s)+摇头(1s,迟5.2s)+眨眼(5s,迟5.2s)]<br>--&gt;音符(2s,迟5s+)。<br>其实这个部分是最耗时的，我感觉。当时记录就很费劲，现在写起来又是一笔烂账……但是写下来或者记下来，形成类似计划书或者时间轴的东西，总是比看一点儿做一点儿要好些的。<br>3.2 制作动画<br>3.2.1 基本操作：<br>做好规划之后，写动画效果其实是最简单的啦！首先，我们以那个圆背景为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bg-circle{    
    /*这部分代码前面写过了，此处略过*/
    animation: bigger .8s forwards linear;
}
@keyframes bigger{
    0%{height: 200px;width: 200px;margin-top: 40px;}
    75%{transform: scale(1.0,1.0);}
    100%{transform: scale(0.8,0.8);margin-top: 0;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bg-circle</span>{    
    <span class="hljs-comment">/*这部分代码前面写过了，此处略过*/</span>
    <span class="hljs-attribute">animation</span>: bigger .<span class="hljs-number">8s</span> forwards linear;
}
@<span class="hljs-keyword">keyframes</span> bigger{
    0%{<span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;<span class="hljs-attribute">margin-top</span>: <span class="hljs-number">40px</span>;}
    75%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.0,1.0);}
    100%{<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.8,0.8);<span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;}
}</code></pre>
<p>在要写入动画效果的元素的样式里面，加入一句animation:...;就可以了（我这里用到的是简写的方法，也可以每个动画效果单独写出来，这个在网上可以找到很多，我不系统地列举了）。<br>其中：<br>第一个属性（bigger）是我要调用的动画的名字，即animation-name；<br>第二个属性（.8s，或者写成0.8s）是完成这个动画所需的时间，如果是要多次播放的，这个时间就是每一个周期的时间，即animation-duration；<br>第三个属性（forwards）是说完成这个动画之后，该元素以什么样式存在，即animation-fill-mode。forwards是设置动画完成时，保持住最终这个姿态，别动。这个属性还有很多值，我还没用过别的，不敢多说；<br>第四个属性（linear）是设定这个动作的速度曲线，即animation-timing-function，是挺好用的一个属性。我这里设的linear是从头到尾一个速度。后面我还用过ease，慢－快－慢的效果，很自然。这个属性也有很多值，多试试，以后更好上手。<br>因为我自己用的是Chrome浏览器，暂时就没有进行浏览器兼容的练习（以后如果遇到了，我再单独写）。所以直接用@keyframes bigger{...}来定义动画就可以了。<br>在@keyframes youranimation{...}里面，据说最好是一定要设置from/0%和to/100%，这两种写法我是没什么研究，哪种写法我测试的时候都没什么问题。其他的过程值，可以随便设置，不用拘泥于50%、75%之类的，我设过88%来调试，也行的。但是如果没有太大的必要，效果要是差得不多，也不用非得难为自己去用animation-duration乘以88%来计算每个动作的时间吧。<br>3.2.2 简化代码：<br>3.2.2.1 有的时候，一个元素要设定两个动作，比如眼睛：开场的时候，要变大再回到正常大小，然后等脸上的东西全出现了，随着摇头的动作，眼睛还要眨起来。而且，我们还需要让这个动作等一会儿再开始，也就是常说的延迟。这时候，动作效果可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".eye-left,.eye-right{
    /*这部分代码前面写过了，此处略过*/
    animation:openeyes 0.5s 3.7s forwards,wink 5s 5.2s infinite;
}
@keyframes openeyes{
    0%{}
    75%{height: 33px;width: 21px;opacity: 0.4;border-radius: 0;}
    100%{height: 22px;}
}
@keyframes wink{
    0%,90%{height:22px;}
    95%{height: 0;}
    100%{height:22px;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.eye-left</span>,<span class="hljs-selector-class">.eye-right</span>{
    <span class="hljs-comment">/*这部分代码前面写过了，此处略过*/</span>
    <span class="hljs-attribute">animation</span>:openeyes <span class="hljs-number">0.5s</span> <span class="hljs-number">3.7s</span> forwards,wink <span class="hljs-number">5s</span> <span class="hljs-number">5.2s</span> infinite;
}
@<span class="hljs-keyword">keyframes</span> openeyes{
    0%{}
    75%{<span class="hljs-attribute">height</span>: <span class="hljs-number">33px</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">21px</span>;<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.4</span>;<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span>;}
    100%{<span class="hljs-attribute">height</span>: <span class="hljs-number">22px</span>;}
}
@<span class="hljs-keyword">keyframes</span> wink{
    0%,90%{<span class="hljs-attribute">height</span>:<span class="hljs-number">22px</span>;}
    95%{<span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;}
    100%{<span class="hljs-attribute">height</span>:<span class="hljs-number">22px</span>;}
}</code></pre>
<p>对于同一个元素，要设置两个动作的时候，一定要写在同一个animation里面，用“,”隔开。如果写了两个animation:...;后面一个会覆盖前面的，就相当于是只写了一条。<br>另外，每一组简写的animation:...;里面，都有两个时间值，不用担心，浏览器自己懂的，第一个是动画的周期长短，第二个是延迟时间，即animation-delay。一开始，我担心会不会造成什么误会，还坚持分开写来着。后来发现网上有例子，就是简写的方式，我就把我的代码都改成这样了。毕竟，看在代码优化的份上，能省一行是一行！<br>3.2.2.2 在@keyframes youranimation{...}里面，也可以用简写的方式。如果这个动作里面，有几个时间点是同一个效果，就可以写在一起，比如上面这段，写wink这个眨眼的动作时，我直接把0%,90%写成了同一个效果，相当于用整个动画过程的90%的时间，来当作延迟来完成。<br>再比如我在写呆毛的动画的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes upper{
    0%,90%,100%{transform-origin: 80% 100%;}
    0%{height: 0;top:5px;transform:rotate(-5deg);}
    90%{height: 30px;transform:rotate(10deg);}
    100%{height: 30px;transform:rotate(0deg);}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> upper{
    0%,90%,100%{<span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">80%</span> <span class="hljs-number">100%</span>;}
    0%{<span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">5px</span>;<span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(-5deg);}
    90%{<span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;<span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(10deg);}
    100%{<span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;<span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(0deg);}
}</code></pre>
<p>在我的代码里，这个用法是比较常见的。<br>3.2.2.3 还有一种情况，当多个元素同时调用一个预设动画的时候，我们只需要作一些微调，就可以让这多个元素产生不一样的效果。比如那四个由中心向外扩张的环，还记得吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".round2{
    animation:rd2 .8s 5.6s forwards;
}
.round3{
    animation:rd2 .8s 5.7s forwards;
}
.round4{
    animation:rd2 .8s 5.8s forwards;
}
@keyframes rd2{
    0%{border:2px solid #ffd11a;width: 240px;height: 240px;}
    90%{border:1px solid #ffd11a;width: 240px;height: 240px;transform: scale(1.3);}
    100%{opacity:0;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.round2</span>{
    <span class="hljs-attribute">animation</span>:rd2 .<span class="hljs-number">8s</span> <span class="hljs-number">5.6s</span> forwards;
}
<span class="hljs-selector-class">.round3</span>{
    <span class="hljs-attribute">animation</span>:rd2 .<span class="hljs-number">8s</span> <span class="hljs-number">5.7s</span> forwards;
}
<span class="hljs-selector-class">.round4</span>{
    <span class="hljs-attribute">animation</span>:rd2 .<span class="hljs-number">8s</span> <span class="hljs-number">5.8s</span> forwards;
}
@<span class="hljs-keyword">keyframes</span> rd2{
    0%{<span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#ffd11a</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;}
    90%{<span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ffd11a</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">240px</span>;<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.3);}
    100%{<span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;}
}</code></pre>
<p>我这里改得还比较少，只是让每一个环的延迟不一样，就做到了现在的效果。有机会我还会试试其他的变化，这东西挺有意思！</p>
<h1 id="articleHeader3">4.结语</h1>
<p>当初打算要照着人家的案例做练习的时候呢，我心里是拒绝的……毕竟我从来没有让css动起来的经验。但是想到当初第一次接触flex的时候也是这么想的。虽然不能说自己现在有多么精通，但是我经过几次的使用，至少知道flex能干什么、如果不会了要去哪里找答案。这个过程我觉得是很重要的。所以这一次，我也给自己加油，告诉自己能做得到！<br>制做的过程中呢，遇到很多问题，尤其是定位的问题。我之前没经历过这么复杂的定位关系，其实从这一点也能看出来我基础有多渣……但是我总是问自己：别人能行，因为啥？是因为他是天才？还是因为他做个梦就能会？如果都不是，那人家也是一点点儿学的，我也可以。我可能慢一些，也可能没人家一点就通，但我总是能学会的，总比看到了困难就止步不前要好。所以，每次遇到不明白的地方，就上网查教程，看有没有人提问，看别人的回答。实在看不懂，就慢点儿看；再看不懂，就把人家代码全写上去，一句一句的删掉，看是哪句话起了作用，有没有几句话是要一起发挥作用的。在这个过程中，我发现借助浏览器自带的检查工具，是非常有效的。<br>当时全写完了之后，我缓了好一阵儿，觉得自己相当有才了！像是翻过一座大山似的！缓了没多久，第二天吧，就开始学Jquery了，看了一本书，写了一个大转盘的案例。然后才想起来，这些东西不能写完就算了，得做总结啊，不然以后肯定就忘没了！这也就一两个星期的事儿吧，我今天再回头来写这篇文章的时候，我有这么几个想法：我当时怎么想的？这东西哪里难了，有什么？这些代码的顺序为什么这么奇怪？我感觉，这说明我确实是在进步的，也说明不作记录的话，真的会慢慢忘掉原以为不会忘的东西。<br>忘了怎么发现的了，是说css代码应该按照一定的顺序书写，位置、大小、文字、背景及其他。我写这篇文章的时候，才发现当时我真是，想起什么写什么啊，并没有所谓顺序可言。而且，还有很多冗余的代码，并没有作用，可能是某次不成功的调试留下的痕迹。在这次整理中，我一并都进行了修改。<br>之前是看到别的技术大牛写自己的经验之谈的时候，写到说要抽时间做这样的总结。为名，可以提高自己的关注度；为己，也是进一步内化所学知识的过程。必须要能沉下心来，积淀自己的思想。内视，也是一种修行。我在这样的启发下，咬着牙、强迫自己也这样做一次。<br>说实话，一想到要开始写这篇文章，我头都疼。为了逃避，我甚至开始给自己找别的事做，让自己好像没时间一样。但是后来我还是正视自己，不要跑，跑得过初一又跑不过十五。想想也是，骗自己干什么呢？当我真正开始做这件事的时候，又时时刻刻体会到其重要性，以及它带给我的好处。最直接、也最残忍的一面，就是把自己之前的不足和缺陷，一五一十地摔在眼前：这就是你以为的你很好，这就是所谓的你做完了？！但是值得庆幸的是，我是第一个看到这些不足的人，不是很好吗？总好过沾沾自己喜地把成果给别人看，然后被批评得一无是处强。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
超详细教程：纯CSS3写一个摇头晃脑的小哥

## 原文链接
[https://segmentfault.com/a/1190000012515079](https://segmentfault.com/a/1190000012515079)

