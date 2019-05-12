---
title: 'WeUI基础样式库——写一个移动端界面' 
date: 2018-12-25 2:30:11
hidden: true
slug: u0mj64t2yqe
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>WeUI是一套基础样式库，同微信原生视觉体验一致，由微信官方设计团队为微信内网页和微信小程序量身设计的。</strong><br>我们来看看这个基础库样式到底长什么样。<br><span class="img-wrap"><img data-src="/img/bVYCKd?w=1111&amp;h=478" src="https://static.alili.tech/img/bVYCKd?w=1111&amp;h=478" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这些密密麻麻的就是压缩后的样式库。密密麻麻地看起来简直要急死密集恐惧症啊。不要急，您请往下看。<br>仔细看我们能看到，这个样式库为很多类写了样式。也就是说，我们只要在html页面中使用这些样式，就能构建一个页面了。【只要写类名，省去了为很多标签定义样式，是不是省事多了呢?】<br>对WeUI的介绍就到这了，下面都是满满的干货啦。</p>
<h2 id="articleHeader0">开始写页面前的准备</h2>
<p>要想有这个样式库，当然要先下载WeUI的样式库啦，我提供了两个下载的地址。</p>
<ul>
<li><p>一个是腾讯的GitHub下载地址：<a href="https://github.com/weui/weui" rel="nofollow noreferrer" target="_blank">https://github.com/weui/weui</a></p></li>
<li><p>另一个是我放在GitHub上的weui.min.css样式：<a href="https://raw.githubusercontent.com/TeanLee/qs_html5_lesson/master/talk_in_weui/css/weui.min.css" rel="nofollow noreferrer" target="_blank">https://raw.githubusercontent...</a></p></li>
</ul>
<p>接下来就为我们的页面引入这个基础样式库。<br>我把这个基础样式库放在本地了，就这么引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;./css/weui.min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./css/weui.min.css"</span>&gt;</span></code></pre>
<p>为了更好的说明这个基础样式库的使用，接下来我将介绍两个例子。单页应用页面和弹出框。</p>
<h2 id="articleHeader1">单页应用页面</h2>
<p><span class="img-wrap"><img data-src="/img/bVYCTu?w=313&amp;h=547" src="https://static.alili.tech/img/bVYCTu?w=313&amp;h=547" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们致敬vue，模仿这个页面。<br>纵观整个页面，可以分为以下几个模块。</p>
<ul>
<li><p>最顶上放置logo</p></li>
<li><p>中间有两个cells 也就是单元格，来显示数据</p></li>
<li><p>最底部有一个tabbar导航条</p></li>
</ul>
<p>引入代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;height:100%&quot;>
    <div class=&quot;center&quot;>
    </div>
    <div class=&quot;weui-cells&quot;>
    </div>
    <div class=&quot;weui-cells&quot;>
    </div>
    <p class=&quot;vue-version&quot;>current vue version 2.5.2</p>
    <div class=&quot;weui-tabbar&quot;>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"height:100%"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"center"</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"weui-cells"</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"weui-cells"</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">"vue-version"</span>&gt;current vue <span class="hljs-built_in">version</span> <span class="hljs-number">2.5</span><span class="hljs-number">.2</span>&lt;/p&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"weui-tabbar"</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>顶部的图片插入比较简单，直接引入图片就行。我们说说中间cells中内容的添加。<br>我们看一个单元格，很典型的左中右格式，分为三个结构层次，</p>
<ul>
<li><p>左边是一张图片，WeUI样式库为我们定义了类名，也就是单元格的头部：weui-cell__hd</p></li>
<li><p>中间是一段文字，也就是这个单元格的身体：weui-cell__bd</p></li>
<li><p>最右边是一个小箭头，也就是单元格的尾部：weui-cell__ft</p></li>
</ul>
<p>引入代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;weui-cells&quot;>
    <!-- _access能显示一个箭头 -->
    <a href=&quot;#&quot; class=&quot;weui-cell weui-cell_access&quot;>
    <div class=&quot;weui-cell__hd&quot;>
    <img src=&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=&quot; alt=&quot;&quot;>
    </div>
    <div class=&quot;weui-cell__bd&quot;>
    <p>Live Demo</p>
    </div>
    <div class=&quot;weui-cell__ft&quot;></div>
    </a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"weui-cells"</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- _access能显示一个箭头 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell weui-cell_access"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__hd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__bd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Live Demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__ft"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>这样，我们就写完了一个单元格。<br>第二个单元格有两个小格怎么办呢？<br>不要紧，weui-cell是单元格中的一个小格子，有多少个小格子就嵌套在一个weui-cells中就可以了，每一格weui-cell还是按照上面的左中右方式进行命名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;weui-cells&quot;>
    <a href=&quot;&quot; class=&quot;weui-cell weui-cell_access&quot;>
    <span class=&quot;weui-cell__hd&quot;></span>
    <span class=&quot;weui-cell__bd&quot;></span>
    <span class=&quot;weui-cell__ft&quot;>
        <!-- weui-badge是显示在箭头前面的红色提示小框 -->
        <div class=&quot;weui-badge&quot;></div>
    </span>
    </a>
    <a href=&quot;&quot; class=&quot;weui-cell weui-cell_access&quot;>
    <span class=&quot;weui-cell__hd&quot;></span>
    <span class=&quot;weui-cell__bd&quot;></span>
    <span class=&quot;weui-cell__ft&quot;></span>
    </a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cells"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell weui-cell_access"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__hd"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__bd"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__ft"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- weui-badge是显示在箭头前面的红色提示小框 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-badge"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell weui-cell_access"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__hd"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__bd"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-cell__ft"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>接下来是最底部的tabbar。<br>最尾部的导航条类名为weui-tabbar，里面有三项内容，也就是有三个weui-tabbar__item。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;weui-tabbar&quot;>
    <a href=&quot;&quot; class=&quot;weui-tabbar__item&quot;>
    </a>
    <a href=&quot;&quot; class=&quot;weui-tabbar__item&quot;>
    </a>
    <a href=&quot;&quot; class=&quot;weui-tabbar__item&quot;>
    </a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"weui-tabbar"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__item"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
    &lt;a href=<span class="hljs-string">""</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"weui-tabbar__item"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
    &lt;a href=<span class="hljs-string">""</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"weui-tabbar__item"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>为每一个weui-tabbar__item添加内容吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;weui-tabbar&quot;>
    <a href=&quot;&quot; class=&quot;weui-tabbar__item&quot;>
        <img src=&quot;./images/icon_tabbar.png&quot; alt=&quot;&quot; class=&quot;weui-tabbar__icon&quot;>
        <p class=&quot;weui-tabbar__label&quot;>Home</p>
    </a>
    <a href=&quot;&quot; class=&quot;weui-tabbar__item&quot;>
        <span style=&quot;position:relative;display:inline-block&quot;>
            <img src=&quot;./images/icon_tabbar.png&quot; alt=&quot;&quot; class=&quot;weui-tabbar__icon&quot;>
            <!-- weui-badge表示一个红色的展示区 -->
            <span class=&quot;weui-badge&quot; style=&quot;position:absolute;top:-6;right:-11px&quot;>8</span>
        </span>
        <p class=&quot;weui-tabbar__label&quot;>Demos</p>
    </a>
    <a href=&quot;&quot; class=&quot;weui-tabbar__item&quot;>
        <span style=&quot;position:relative;display:inline-block&quot;>
            <img src=&quot;./images/icon_tabbar.png&quot; alt=&quot;&quot; class=&quot;weui-tabbar__icon&quot;>
            <!-- weui-badge_dot小圆点，给一个相对于span的定位，放在右上角 -->
            <span class=&quot;weui-badge weui-badge_dot&quot; style=&quot;position:absolute;top:0;right:-6px&quot;></span>
        </span>
        <p class=&quot;weui-tabbar__label&quot;>Donate</p>
    </a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__item"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/icon_tabbar.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__icon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__label"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__item"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:relative;display:inline-block"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/icon_tabbar.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__icon"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- weui-badge表示一个红色的展示区 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-badge"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:absolute;top:-6;right:-11px"</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__label"</span>&gt;</span>Demos<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__item"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:relative;display:inline-block"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./images/icon_tabbar.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__icon"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- weui-badge_dot小圆点，给一个相对于span的定位，放在右上角 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-badge weui-badge_dot"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:absolute;top:0;right:-6px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-tabbar__label"</span>&gt;</span>Donate<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我放在GitHub上的项目地址：<a href="https://github.com/TeanLee/qs_html5_lesson/blob/master/talk_in_weui/vux_start.html" rel="nofollow noreferrer" target="_blank">https://github.com/TeanLee/qs...</a><br>这就完成了第一个单页页面的编写。<br><br><br>接下来我们说说一个弹出框。</p>
<h2 id="articleHeader2">页面弹出框</h2>
<p>放上我们要写的页面成品图：<br><span class="img-wrap"><img data-src="/img/bVYC4h?w=309&amp;h=550" src="https://static.alili.tech/img/bVYC4h?w=309&amp;h=550" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这就是我们平常很常见的弹出框了。这里是点击了第一个按钮就弹出这个弹框，点击取消，弹框消失，当然你也可以添加别的事件，点击取消和保存都会让弹框消失并且执行相应的步骤。<br><br><br>首先，我们为dialog弹出框制作一个“家”，也就是dialog放置的页面：<br>weui-btn 是weui的基本组件是一个按钮</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;page dialog&quot;>
  <div class=&quot;page__hd&quot;>
    <h1 class=&quot;page__title&quot;>Dialog</h1>
    <p class=&quot;page__desc&quot;>对话框</p>
  </div>
  <div class=&quot;page__bd page__bd__spacing&quot;>
    <!-- 设置三个按钮，但是我只为第一个按钮绑定了弹框弹出的事件 -->
    <a href=&quot;#&quot; class=&quot;weui-btn weui-btn_default&quot; id=&quot;showIOSDialog1&quot;>IOS Dialog样式 default</a>
    <a href=&quot;#&quot; class=&quot;weui-btn weui-btn_primary&quot;>IOS Dialog样式 primary</a>
    <a href=&quot;#&quot; class=&quot;weui-btn weui-btn_warn&quot;>IOS Dialog样式 warn</a>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"page dialog"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__title"</span>&gt;</span>Dialog<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__desc"</span>&gt;</span>对话框<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"page__bd page__bd__spacing"</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- 设置三个按钮，但是我只为第一个按钮绑定了弹框弹出的事件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-btn weui-btn_default"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"showIOSDialog1"</span>&gt;</span>IOS Dialog样式 default<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-btn weui-btn_primary"</span>&gt;</span>IOS Dialog样式 primary<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-btn weui-btn_warn"</span>&gt;</span>IOS Dialog样式 warn<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>接下来，我们的dialog就要登场了。直接把dialog的div放在放置按钮div的后面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;dialogs&quot;>
  <div id=&quot;iosDialog1&quot; class=&quot;js_dialog&quot; style=&quot;display: none&quot;>
      <!-- weui-mask 遮罩层 -->
    <div class=&quot;weui-mask&quot;></div>
    <div class=&quot;weui-dialog&quot;>
      <div class=&quot;weui-dialog__hd&quot;>
        <div class=&quot;weui-dialog__title&quot;>弹窗标题</div>
      </div>
      <div class=&quot;weui-dialog__bd&quot;>
        <!-- 任何东西  说明文字， 表单 -->
        弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
      </div>
      <!-- 弹窗底部的两个小按钮，有两个选项就放置两个 weui-dialog__btn  -->
      <div class=&quot;weui-dialog__ft&quot;>
        <a href=&quot;#&quot; class=&quot;weui-dialog__btn weui-dialog__btn_default&quot; id=&quot;dialogCancle&quot;>取消</a>
        <a href=&quot;#&quot; class=&quot;weui-dialog__btn weui-dialog__btn_primary&quot;>保存</a>
      </div>
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"dialogs"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"iosDialog1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"js_dialog"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- weui-mask 遮罩层 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-mask"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog__hd"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog__title"</span>&gt;</span>弹窗标题<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog__bd"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 任何东西  说明文字， 表单 --&gt;</span>
        弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 弹窗底部的两个小按钮，有两个选项就放置两个 weui-dialog__btn  --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog__ft"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog__btn weui-dialog__btn_default"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialogCancle"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-dialog__btn weui-dialog__btn_primary"</span>&gt;</span>保存<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>这里的遮罩层是为整个页面蒙上一层灰色的背景，把用户的吸引力引到弹框上。<br>弹框的内容还是分为三个层次：</p>
<ul>
<li><p>weui-dialog__hd：弹框的头部写标题；</p></li>
<li><p>weui-dialog__bd：弹框的身体写具体内容；</p></li>
<li><p>weui-dialog__ft：弹框的尾部放置按钮；</p></li>
</ul>
<p>接下来，就是给第一个按钮添加绑定事件了，点击第一个按钮就跳出来弹框。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  document.getElementById('showIOSDialog1').click(function () {
    $('#iosDialog1').show();
  });
  document.getElementById('dialogCancle').click(function () {
    $('#iosDialog1').show();
  });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'showIOSDialog1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'#iosDialog1'</span>).show();
  });
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'dialogCancle'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'#iosDialog1'</span>).show();
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我放在GitHub上的弹框具体代码：<a href="https://github.com/TeanLee/qs_html5_lesson/blob/master/talk_in_weui/weui_dialog_start.html" rel="nofollow noreferrer" target="_blank">https://github.com/TeanLee/qs...</a><br><br><br>当然，weu基础样式库还有很多很多组件可以使用，可以进入<a href="https://weui.io/" rel="nofollow noreferrer" target="_blank">https://weui.io/</a>  查看更多的基础组件。<br>接下来让我们一起学习更多吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WeUI基础样式库——写一个移动端界面

## 原文链接
[https://segmentfault.com/a/1190000012028117](https://segmentfault.com/a/1190000012028117)

