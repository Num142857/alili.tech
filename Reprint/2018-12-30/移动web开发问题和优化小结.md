---
title: '移动web开发问题和优化小结' 
date: 2018-12-30 2:30:10
hidden: true
slug: g7yld57n1tv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>到目前为止，互联网行业里，手机越来越智能化，移动端占有的比例越来越高，尤其实在电商，新闻，广告，游戏领域。用户要求越来越高，网站功能越来越好，效果越来越炫酷，这就要求我们产品质量越来越高，web前端开发而言是一个挑战，是一个难题，也是一个机遇。如何让我们所开发的手机页面能有更好的交互体验，就是这篇文章的主旨：移动web开发问题和优化小结。这个只是我自己在开发的时候知道的坑，如果大家有遇到什么别的坑，欢迎补充，或者觉得我哪里写错了，欢迎指点！</p>
<h2 id="articleHeader1">2.Meta标签</h2>
<p>页面在手机上显示时，增加这个meta可以让页面强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户通过点击或者缩放等操作对屏幕放大浏览。（这个在ios10以上的版本已经失效了，即使加了下面的meta，用户双击，缩放还是可以缩放页面。大家可以按照开发需求，参考下面的连接进行限制--<a href="http://blog.csdn.net/qq_26744901/article/details/53245006" rel="nofollow noreferrer" target="_blank">ios10中禁止用户缩放页面</a>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;&quot; name=&quot;viewport&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-attr">content="width=device-width,</span> <span class="hljs-attr">initial-scale=1.0,</span> <span class="hljs-attr">maximum-scale=1.0,</span> <span class="hljs-attr">user-scalable=0;"</span> <span class="hljs-attr">name="viewport"</span> /&gt;</code></pre>
<p>禁止ios上自动识别电话</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta content=<span class="hljs-string">"telephone=no"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"format-detection"</span> /&gt;</code></pre>
<p>禁止android上自动识别邮箱</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta content=&quot;email=no&quot; name=&quot;format-detection&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta content=<span class="hljs-string">"email=no"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"format-detection"</span> /&gt;</code></pre>
<p>下面两个是针对ios上的safari上地址栏和顶端样式条的（我的手机是安卓，这个没很仔细测试过，但是都有加上）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot; />
<!-- 听说在ios7以上版本就没效果了 -->
<meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot; />
<!-- 可选default、black、black-translucent 但是我都是用black-->
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- 听说在ios7以上版本就没效果了 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- 可选default、black、black-translucent 但是我都是用black--&gt;</span>
</code></pre>
<h2 id="articleHeader2">3.打电话发短信</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;tel:020-11811922&quot;>打电话给:0755-10086</a>
<a href=&quot;sms:10086&quot;>发短信给: 10086</a>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"tel:020-11811922"</span>&gt;</span>打电话给:0755-10086<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"sms:10086"</span>&gt;</span>发短信给: 10086<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</code></pre>
<h2 id="articleHeader3">4.css3过渡动画开启硬件加速</h2>
<p>ps：网上有说这个用了，手机的耗电量也会增加。我自己也在手机上粗略试过，确实有那么一回事，平常看博客，5分钟左右少1%，用了硬件加速3分钟左右就少1%，大家注意合理使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".translate3d{
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.translate3d</span>{
   <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
   <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
   <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
   <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
}</code></pre>
<p>说到这里，也顺便说下动画或者过渡的两个建议：<br>1.在手机上（其实PC也是一样）。CSS3动画或者过渡尽量使用transform和opacity来实现动画，不要使用left和top。<br>2.动画和过渡能用css3解决的，就不要使用js。如果是复杂的动画可以使用css3+js（或者html5+css3+js）配合开发，效果只有想不到，没有做不到。</p>
<h2 id="articleHeader4">5.移动端click屏幕产生200-300 ms的延迟响应</h2>
<p>click事件因为要等待确认是否是双击事件，会有300ms的延迟（两次点击事件间隔小于300ms就认为是双击），体验并不好。现在的解决方案，第一个就是采用touchstart或者touchend代替click。或者封装tap事件来代替click 事件，所谓的tap事件由touchstart事件+ touchmove（判断是否是滑动事件）+touchend事件封装组成。<br>关于touch和鼠标事件的延迟说明，我引用叶小钗大神博客里面的一张图片，如下</p>
<p><span class="img-wrap"><img data-src="/img/bVVq6N?w=609&amp;h=354" src="https://static.alili.tech/img/bVVq6N?w=609&amp;h=354" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在手机上，click的延迟将近400ms。对于用户而言，是一个很严重的延迟了！所以在手机上，并不建议用click。<br>附上叶小钗大神的原文--<a href="http://www.cnblogs.com/yexiaochai/p/3377900.html" rel="nofollow noreferrer" target="_blank">手持设备点击响应速度，鼠标事件与touch事件的那些事</a></p>
<h2 id="articleHeader5">6.图片优化</h2>
<h3 id="articleHeader6">6-1.base64编码图片替换url图片</h3>
<p>这个应该没什么好解释的，就是能不发请求的就不要发，对于一些小图标（我这做法是把8K以下的图标都转换成base64）之类的，可以将图片用base64，来减少请求的发送。尤其是在移动端，请求显得特别珍贵，在网速的不好的情况下，请求就是珍贵中的珍贵。</p>
<h3 id="articleHeader7">6-2.图片压缩</h3>
<p>对于整个网站来说，图片是最占流量的资源之一，能不使用就不适用，图标可是使用base64编码，字体图标代替，SVG等来代替，使用就要选择最合适的格式，合适的尺寸，然后压缩--这里推荐腾讯推出的<a href="http://zhitu.isux.us/" rel="nofollow noreferrer" target="_blank">智图</a>。<br>PS：过度压缩图片大小影响图片显示效果，可能会使得图片变得模糊，一般来说，品质在60左右就差不多了！</p>
<h3 id="articleHeader8">6-3.图片懒加载</h3>
<p>首屏加载的快慢，直接影响用户的体验，建议将非首屏的图片资源放到用户需要时才加载。这样可以大大优化首屏加载，减少首屏加载所需要的时间！<br>ps：懒加载要使用js频繁操作dom，期间会导致大量重绘渲染，影响性能。</p>
<h3 id="articleHeader9">6-4.img还是background</h3>
<p>图片的展示方式有两种，一种是以图片标签显示，一种是以背景图片显示！下面写了这两者的区别。<br><strong>img</strong>:<code>html</code>中的标签<code>img</code>是网页结构的一部分会在加载结构的过程中和其他标签一起加载。<br><strong>background</strong>：以<code>css</code>背景图存在的图片<code>background</code>会等到结构加载完成（网页的内容全部显示以后）才开始加载<br>也就是说，网页会先加载标签<code>img</code>的内容，再加载背景图片<code>background</code>引用的图片。引入一张图片，那么在这个图片加载完成之前，<code>img</code>后的内容不会显示。而用<code>background</code>来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，网页内容能正常浏览，但是看不到背景图片。至于这两种，大家按照习惯，需求等权重因素选择！</p>
<h2 id="articleHeader10">7.快速回弹滚动</h2>
<p>在ios上，如果存在局部滚动，就要加这个属性了！如果不加，滚动会很慢，看起来也会有一卡一卡的感觉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-overflow-scrolling: touch;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">-webkit-overflow-<span class="hljs-keyword">scrolling: </span>touch<span class="hljs-comment">;</span></code></pre>
<p>但是，加上了这个，在ios上会产生bug。</p>
<p>如下布局</p>
<p><span class="img-wrap"><img data-src="/img/bVVs2o?w=800&amp;h=365" src="https://static.alili.tech/img/bVVs2o?w=800&amp;h=365" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>.fb-box</code>是一个大div，包含着页面上的所有元素,包括所看到的那个弹窗<code>.dialog-img</code>，并且设置了<code>height:100%;-webkit-overflow-scrolling:touch;position:relative;</code></p>
<p>定位需要，<code>-webkit-overflow-scrolling:touch;</code>也需要，但是这样设置，在<code>ios</code>上会有一个<code>bug</code>,页面滚动一定的距离后，点击了显示弹窗，再关闭的话，就会发现，弹窗的一部分还“留在页面上”。</p>
<p><span class="img-wrap"><img data-src="/img/bVO8vu?w=415&amp;h=670" src="https://static.alili.tech/img/bVO8vu?w=415&amp;h=670" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>解决方案1：<br>把弹窗的<code>div</code>和<code>.fb-box</code>以兄弟节点的方式布局，在外层再弄一个<code>div</code>包住,这个坑就算爬起来了，效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVVs2Q?w=800&amp;h=377" src="https://static.alili.tech/img/bVVs2Q?w=800&amp;h=377" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVO8vV?w=415&amp;h=670" src="https://static.alili.tech/img/bVO8vV?w=415&amp;h=670" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>解决方案2：<br><code>.fb-box</code>去掉<code>position:ralative;</code>。让弹窗的<code>div</code>参考<code>body</code>定位！</p>
<h2 id="articleHeader11">8.谨慎使用fixed</h2>
<p>ios下<code>fixed</code>元素容易定位出错，软键盘弹出时，影响<code>fixed</code>元素定位，会发生元素错位（滚动一下又恢复），有时候会出现闪屏的效果。我也搜过一下这个问题，发现别人还遇到了我没遇到过的问题！真是，哎~。所以在手机上，不建议用<code>fixed</code>定位，使用<code>absolute</code>代替！如果一定要用，写好了之后，一定要多测试几次！</p>
<h2 id="articleHeader12">9.消除transition闪屏</h2>
<p>PS：这个问题，我近段时间开发，貌似不加上这个代码也没什么影响，但是以前就是要求加，就加上了，现在没加上，也没反馈有什么问题！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".no-flash { 
    -webkit-transform-style: preserve-3d; 
    -webkit-backface-visibility: hidden; 
    -webkit-perspective: 1000; 
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.no-flash</span> { 
    <span class="hljs-attribute">-webkit-transform-style</span>: preserve-<span class="hljs-number">3</span>d; 
    <span class="hljs-attribute">-webkit-backface-visibility</span>: hidden; 
    <span class="hljs-attribute">-webkit-perspective</span>: <span class="hljs-number">1000</span>; 
} 
</code></pre>
<h2 id="articleHeader13">10.ios系统中去掉元素被触摸时产生的半透明灰色遮罩</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>{<span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0;)}
</code></pre>
<h2 id="articleHeader14">11.ios中去掉默认input默认样式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input,button,textarea{-webkit-appearance: none;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,textarea{-webkit-appearance: <span class="hljs-attribute">none</span>;}
</code></pre>
<h2 id="articleHeader15">12.左右滑动，避免页面跟着滑动</h2>
<p>这个细节是我在基于vue开发焦点图的时候遇到的，后来自己找不到方法，直接在sf上提问了，大家可以去参考下：<a href="https://segmentfault.com/q/1010000010814525">移动端轮播图，上下滑动的时候不触发页面的滚动</a><br>ps：滑动我没有使用什么库，是我根据touchstart和touchend的移动距离来判断是左右滑动或者上下滑动！</p>
<h2 id="articleHeader16">13.vue-router与微信分享的问题</h2>
<p>分享发送的连接是下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.example.com/dist/html#/index?utm_source=share
http://www.example.com/dist/html#/index.html/index?utm_source=share" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>http:<span class="hljs-regexp">//</span>www.example.com<span class="hljs-regexp">/dist/</span>html<span class="hljs-comment">#/index?utm_source=share</span>
http:<span class="hljs-regexp">//</span>www.example.com<span class="hljs-regexp">/dist/</span>html<span class="hljs-comment">#/index.html/index?utm_source=share</span></code></pre>
<p>但是分享之后的实际连接是下面这样的，别人点击的分享出去的链接，就会打不开网页</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.example.com/dist/html?from=xxxx#/index&amp;utm_source=share
http://www.example.com/dist/html#/index.html?from=xxxx/index&amp;utm_source=share    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>http:<span class="hljs-regexp">//</span>www.example.com<span class="hljs-regexp">/dist/</span>html?from=xxxx<span class="hljs-comment">#/index&amp;utm_source=share</span>
http:<span class="hljs-regexp">//</span>www.example.com<span class="hljs-regexp">/dist/</span>html<span class="hljs-comment">#/index.html?from=xxxx/index&amp;utm_source=share    </span>
</code></pre>
<p>解决方案<br>1.自定义分享URL地址<br>2.避免使用单文件应用</p>
<h2 id="articleHeader17">14.iphoneX的齐刘海</h2>
<p>苹果公司新出的手机，出了没多久，段子手就坐不住了，各种调侃，但是今天我们聊那个！聊下iphoneX给前端带来的困扰，也是给ui带来的困扰吧！下面引入大漠，张鑫旭等人对iphoneX齐刘海的一个解决方案！避免到时候跳坑！<br><a href="https://www.w3cplus.com/css/the-notch-and-css.html" rel="nofollow noreferrer" target="_blank">iPhone X的缺口和CSS</a><br><a href="http://www.zhangxinxu.com/wordpress/2017/09/css-shapes-outside-iphone-x-head/" rel="nofollow noreferrer" target="_blank">借助CSS Shapes实现元素滚动自动环绕iPhone X的刘海</a><br><a href="http://mp.weixin.qq.com/s/6YSN3g86jcU22xwcloNk3A" rel="nofollow noreferrer" target="_blank">剖析 iOS 11 网页适配问题</a><br><a href="https://segmentfault.com/a/1190000011308923">手机管家iPhoneX的适配总结</a></p>
<h2 id="articleHeader18">15.其它参考</h2>
<p>上面所说都是遇到的具体问题，至于还有一些比较笼统的细节优化，或者开发遇到的问题，比如：压缩代码，图片，合并文件等。大家可以参考下面的资源，这些我不展开说了！</p>
<p>1.<a href="https://www.zhihu.com/question/23198146?sort=created" rel="nofollow noreferrer" target="_blank">web移动前端有哪些优化方案？</a><br>2.<a href="http://blog.csdn.net/u010683915/article/details/71043188" rel="nofollow noreferrer" target="_blank">web移动端页面性能优化方案</a><br>3.<a href="http://www.csdn.net/article/2013-09-23/2817020-web-performance-optimization" rel="nofollow noreferrer" target="_blank">Web前端优化最佳实践及工具集锦</a><br>4.<a href="http://tgideas.qq.com/webplat/info/news_version3/804/808/811/m579/201412/293834.shtml" rel="nofollow noreferrer" target="_blank">移动前端系列——移动页面性能优化</a><br>5.<a href="http://www.cnblogs.com/wizcabbit/p/web-image-optimization.html" rel="nofollow noreferrer" target="_blank">Web性能优化：图片优化</a></p>
<h2 id="articleHeader19">16.小结</h2>
<p>我在移动web(手机网站)上，遇到的问题，暂时就是上面这些了！肯定还是会有很多我没遇到过的问题，这些以后会记录，但是不一定会以文章方式发表。如果大家在开发移动网站的时候，有遇到过什么大大小小的问题，在评论或者自己以文章方式提醒！方便让以后的避免踩坑！最后，如果大家有什么补充或者觉得我哪里写得不好，写错了！欢迎指点！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动web开发问题和优化小结

## 原文链接
[https://segmentfault.com/a/1190000011338800](https://segmentfault.com/a/1190000011338800)

