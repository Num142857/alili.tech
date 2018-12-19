---
title: 'jQuery 图片查看插件 Magnify 开发简介（仿 Windows 照片查看器）' 
date: 2018-12-20 2:30:10
hidden: true
slug: jp8itle5nff
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565638?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565638?w=750&amp;h=375" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>因为一些特殊的业务需求，经过一个多月的蛰伏及思考，我开发了这款 jQuery 图片查看器插件 Magnify，它实现了 Windows 照片查看器的所有功能，比如模态窗的拖拽、调整大小、最大化，图片的缩放、平移、旋转，键盘控制等。插件的样式都是最基础的 CSS，定制非常容易，可以轻松修改成自己喜欢的样式。随后会陆续发布 React 及 Vue 相关版本的插件。本文主要介绍插件的特点及使用方法，而关于插件开发的细节将会在之后的具体文章中说明。</p>
<blockquote>Github: <a href="https://github.com/nzbin/magnify" rel="nofollow noreferrer" target="_blank">https://github.com/nzbin/magnify</a><p>Website:  <a href="https://nzbin.github.io/magnify" rel="nofollow noreferrer" target="_blank">https://nzbin.github.io/magnify</a></p>
</blockquote>
<h2 id="articleHeader1">开发小记</h2>
<p>由于最近工作繁忙，几乎每天都是晚上十点到家，然后开始编写插件，睡觉时已过凌晨，如今身心俱疲。因为没有找到相关的插件，所以很多问题都是绞尽脑汁独立思考，比如以鼠标为中心缩放图片、改变弹窗大小时对图片移动的限制、图片旋转之后的缩放、平移等问题，而开发插件最让人头疼的就是细节，甚至大部分时间是在修复单一功能的 bug 。</p>
<p>另外，开发插件的最大难度不是功能实现，而是如何设计插件，如何让插件的使用更简单、更方便。关于如何设计插件并不是本篇文章的重点，我会在之后专门写一篇介绍插件设计思想的文章。</p>
<p>插件所有的代码几乎都是在调整弹窗或者图片的 width、height、left、top ，所以兼容性问题不大，主要是 2D 旋转问题，IE 9 以下需要使用滤镜实现。为了方便调整样式，其中有很多相对位置的计算。</p>
<p>Magnify 采用了文件分离的方式编写，使用 npm 插件打包，并没有使用新语法，也没有使用现在流行的打包工具。使用 npm 工具已经是项目开发打包发布的一个趋势。</p>
<h2 id="articleHeader2">演示</h2>
<p>如果你不想点开网址查看示例的话，可以通过下面的 CodePen 查看插件效果，除了视窗的大小之外，两种方式没有任何区别：</p>
<p>See the Pen <a href="https://codepen.io/nzbin/pen/xpEvNp/" rel="nofollow noreferrer" target="_blank">A jQuery lightbox plugin to view images just like in Windows.</a><button class="btn btn-xs btn-default ml10 preview" data-url="nzbin/pen/xpEvNp/" data-typeid="3">点击预览</button></p>
<p>如果你的网速和其他原因不能打开 CodePen 的话，可以查看下面的图片演示。</p>
<h2 id="articleHeader3">主要功能</h2>
<p>Magnify 的功能可以参考 Windows 照片查看器，基本完成了可以实现的所有功能。</p>
<h3 id="articleHeader4">1.模态窗拖拽</h3>
<p>如果图片尺寸不大于展示区域，通过图片展示区域也可以拖拽弹窗。这和 QQ 图片查看器的操作方式是相同的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565639?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565639?w=750&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">2.模态窗调整大小</h3>
<p>可以通过参数设置模态窗的最小宽高。目前的调整大小存在一点 bug，但不影响整体的使用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565640?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565640?w=750&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">3.模态窗最大化</h3>
<p>除了弹窗最大化，开发初期也设计了最小化的功能，但感觉有些鸡肋，所以暂时没有添加。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565641?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565641?w=750&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">4.图片缩放</h3>
<p>可以通过鼠标滚轮、按钮、键盘等操作。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565642?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565642?w=750&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">5.图片旋转</h3>
<p>目前的图片旋转功能还没有添加支持 IE9 以下版本的代码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565643?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565643?w=750&amp;h=375" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">6.键盘控制</h3>
<p>Magnify 和 Windows 照片查看器的按键是一样的。</p>
<ul>
<li>
<code>←</code> 上一张</li>
<li>
<code>→</code> 下一张</li>
<li>
<code>+</code> 放大</li>
<li>
<code>-</code> 缩小</li>
<li>
<code>ctrl + alt + 0</code> 实际尺寸</li>
<li>
<code>ctrl + ,</code> 向左旋转</li>
<li>
<code>ctrl + .</code> 向右旋转</li>
</ul>
<h3 id="articleHeader10">7.全屏显示</h3>
<p>Magnify 的全屏显示只实现了基本的展示功能，还没有实现幻灯片自动轮播的功能。全屏环境下使用键盘控制图片。</p>
<h2 id="articleHeader11">使用方法</h2>
<p>Magnify 的使用和其他大多数 lightbox 插件的用法并没有两样，如果你习惯了其它插件的使用，使用 Magnify 也不会有任何障碍。</p>
<h3 id="articleHeader12">1.需要引用的文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<link href=&quot;/path/to/magnify.css&quot; rel=&quot;stylesheet&quot;>
<script src=&quot;/path/to/jquery.js&quot;></script>
<script src=&quot;/path/to/jquery.magnify.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/path/to/magnify.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/path/to/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/path/to/jquery.magnify.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Magnify 默认使用 font-awesome 的图标，所以需要引用 font-awesome 的 css 文件。如果你想使用其它图标，可以修改 options 的 icons 参数。在之后的版本中，我可能会添加定制的字体图标文件或者使用 svg 图标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<link href=&quot;https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css&quot; rel=&quot;stylesheet&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
</code></pre>
<h3 id="articleHeader13">2.HTML 结构</h3>
<p>Magnify 默认使用以下结构，这样的结构可以做兼容处理，也是大多数 lightbox 使用的结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a data-magnify=&quot;gallery&quot; href=&quot;big-1.jpg&quot;>
  <img src=&quot;small-1.jpg&quot;>
</a>
<a data-magnify=&quot;gallery&quot; href=&quot;big-2.jpg&quot;>
  <img src=&quot;small-2.jpg&quot;>
</a>
<a data-magnify=&quot;gallery&quot; href=&quot;big-3.jpg&quot;>
  <img src=&quot;small-3.jpg&quot;>
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">data-magnify</span>=<span class="hljs-string">"gallery"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"big-1.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"small-1.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">data-magnify</span>=<span class="hljs-string">"gallery"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"big-2.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"small-2.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">data-magnify</span>=<span class="hljs-string">"gallery"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"big-3.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"small-3.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>也可以使用下面更简洁的结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<img data-magnify=&quot;gallery&quot; data-src=&quot;big-1.jpg&quot; src=&quot;small-1.jpg&quot;>
<img data-magnify=&quot;gallery&quot; data-src=&quot;big-2.jpg&quot; src=&quot;small-2.jpg&quot;>
<img data-magnify=&quot;gallery&quot; data-src=&quot;big-3.jpg&quot; src=&quot;small-3.jpg&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">data-magnify</span>=<span class="hljs-string">"gallery"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"big-1.jpg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"small-1.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">data-magnify</span>=<span class="hljs-string">"gallery"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"big-2.jpg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"small-2.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">data-magnify</span>=<span class="hljs-string">"gallery"</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">"big-3.jpg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"small-3.jpg"</span>&gt;</span>
</code></pre>
<p>Magnify 的 HTML 结构包含以下几个选项</p>
<ul>
<li>添加 <code>data-src</code> 属性可以链接到大图。如果在 <code>&lt;a&gt;</code> 标签中使用，它会覆盖 <code>href</code> 属性的值。</li>
<li>添加 <code>data-caption</code> 属性可以显示标题。如果你不使用这个属性，插件会显示 URL 中的图片名。</li>
<li>添加 <code>data-group</code> 属性可以对图片分组。</li>
</ul>
<h3 id="articleHeader14">3.初始化插件</h3>
<p>如果在 HTML 中添加 <code>data-magnify</code> 属性，插件会自动初始化。</p>
<p>手动初始化插件的方法和所有 jQuery 插件一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('[data-magnify=gallery]').magnify(options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'[data-magnify=gallery]'</span>).magnify(options);</code></pre>
<h2 id="articleHeader15">参数配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="options = {
    draggable: true,
    resizable: true,
    movable: true,
    keyboard: true,
    title: true,
    modalWidth: 320,
    modalHeight: 320,
    fixedContent: true,
    fixedModalSize: false,
    initMaximized: false,
    gapThreshold: 0.02,
    ratioThreshold: 0.1,
    minRatio: 0.1,
    maxRatio: 16,
    headToolbar: [
      'maximize',
      'close'
    ],
    footToolbar: [
      'zoomIn',
      'zoomOut',
      'prev',
      'fullscreen',
      'next',
      'actualSize',
      'rotateRight'
    ],
    icons: {
      maximize: 'fa fa-window-maximize',
      close: 'fa fa-close',
      zoomIn: 'fa fa-search-plus',
      zoomOut: 'fa fa-search-minus',
      prev: 'fa fa-arrow-left',
      next: 'fa fa-arrow-right',
      fullscreen: 'fa fa-photo',
      actualSize: 'fa fa-arrows-alt',
      rotateLeft: 'fa fa-rotate-left',
      rotateRight: 'fa fa-rotate-right'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">options = {
    <span class="hljs-attr">draggable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">resizable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">movable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">keyboard</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">modalWidth</span>: <span class="hljs-number">320</span>,
    <span class="hljs-attr">modalHeight</span>: <span class="hljs-number">320</span>,
    <span class="hljs-attr">fixedContent</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">fixedModalSize</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">initMaximized</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">gapThreshold</span>: <span class="hljs-number">0.02</span>,
    <span class="hljs-attr">ratioThreshold</span>: <span class="hljs-number">0.1</span>,
    <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.1</span>,
    <span class="hljs-attr">maxRatio</span>: <span class="hljs-number">16</span>,
    <span class="hljs-attr">headToolbar</span>: [
      <span class="hljs-string">'maximize'</span>,
      <span class="hljs-string">'close'</span>
    ],
    <span class="hljs-attr">footToolbar</span>: [
      <span class="hljs-string">'zoomIn'</span>,
      <span class="hljs-string">'zoomOut'</span>,
      <span class="hljs-string">'prev'</span>,
      <span class="hljs-string">'fullscreen'</span>,
      <span class="hljs-string">'next'</span>,
      <span class="hljs-string">'actualSize'</span>,
      <span class="hljs-string">'rotateRight'</span>
    ],
    <span class="hljs-attr">icons</span>: {
      <span class="hljs-attr">maximize</span>: <span class="hljs-string">'fa fa-window-maximize'</span>,
      <span class="hljs-attr">close</span>: <span class="hljs-string">'fa fa-close'</span>,
      <span class="hljs-attr">zoomIn</span>: <span class="hljs-string">'fa fa-search-plus'</span>,
      <span class="hljs-attr">zoomOut</span>: <span class="hljs-string">'fa fa-search-minus'</span>,
      <span class="hljs-attr">prev</span>: <span class="hljs-string">'fa fa-arrow-left'</span>,
      <span class="hljs-attr">next</span>: <span class="hljs-string">'fa fa-arrow-right'</span>,
      <span class="hljs-attr">fullscreen</span>: <span class="hljs-string">'fa fa-photo'</span>,
      <span class="hljs-attr">actualSize</span>: <span class="hljs-string">'fa fa-arrows-alt'</span>,
      <span class="hljs-attr">rotateLeft</span>: <span class="hljs-string">'fa fa-rotate-left'</span>,
      <span class="hljs-attr">rotateRight</span>: <span class="hljs-string">'fa fa-rotate-right'</span>
    }
}</code></pre>
<p>关于插件参数的具体含义，我就不在此复制黏贴了，请大家参考 <a href="https://nzbin.github.io/magnify" rel="nofollow noreferrer" target="_blank">官方文档</a> 的详细说明，以后的参数变化不会在博客中更新。如有问题，可以在此留言。</p>
<h2 id="articleHeader16">自定义样式</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012565644?w=750&amp;h=375" src="https://static.alili.tech/img/remote/1460000012565644?w=750&amp;h=375" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>因为插件的样式比较简单，所以修改起来也比较容易。除了 Windows 照片查看器，QQ 的图片查看器也非常的高大上。我们只要简单修改就可以实现 QQ 图片查看器的效果，但是部分功能比如缩略图还没有实现。</p>
<p>See the Pen <a href="https://codepen.io/nzbin/pen/GyNpEr/" rel="nofollow noreferrer" target="_blank">Magnify with another viewer style</a><button class="btn btn-xs btn-default ml10 preview" data-url="nzbin/pen/GyNpEr/" data-typeid="3">点击预览</button><br>面对这样的图片查看器足以令人心旷神怡~</p>
<h2 id="articleHeader17">总结</h2>
<p>目前插件整体已经趋于完善，但仍然有很多需要修改及添加的细节，尤其对移动端的支持，大家可以 star 一下随时关注项目的更新动态。关于插件的介绍就不再赘述了，如果大家发现了 Bug 或者有更好的建议，可以在 <a href="https://github.com/nzbin/magnify" rel="nofollow noreferrer" target="_blank">GitHub</a> 中提问，也可以在此留言，大家的支持是我前进的最大动力！如果这款插件对你有帮助或者你在项目中使用了这款插件，欢迎留言告知！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery 图片查看插件 Magnify 开发简介（仿 Windows 照片查看器）

## 原文链接
[https://segmentfault.com/a/1190000012565635](https://segmentfault.com/a/1190000012565635)

