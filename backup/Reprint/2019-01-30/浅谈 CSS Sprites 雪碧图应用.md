---
title: '浅谈 CSS Sprites 雪碧图应用' 
date: 2019-01-30 2:30:23
hidden: true
slug: sj0qzqivy68
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVGpAw?w=518&amp;h=156" src="https://static.alili.tech/img/bVGpAw?w=518&amp;h=156" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">前言</h1>
<p>网站开发90%会用到小图标， 多小图标调用显示是前端开发常见的问题；目前小图标显示常见有两种方式（其他方式欢迎补充）：<br>1.图标字体 显示；如<a href="http://www.mi.com/" rel="nofollow noreferrer" target="_blank">小米官网</a>左侧菜单栏：<br><span class="img-wrap"><img data-src="/img/bVGpAI?w=283&amp;h=336" src="https://static.alili.tech/img/bVGpAI?w=283&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.CSS Sprite(CSS 精灵), 也称作 雪碧图；如<a href="http://www.huawei.com/cn/" rel="nofollow noreferrer" target="_blank">华为官网</a>右侧提示栏：<br><span class="img-wrap"><img data-src="/img/bVGpAV?w=154&amp;h=304" src="https://static.alili.tech/img/bVGpAV?w=154&amp;h=304" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图标字体是个比较大的技术讨论点， 关于它可以出好几篇博文，可惜本文主角不是它， 今天主要探讨下 CSS Sprite --&nbsp;<strong>雪碧图</strong>&nbsp;的各种实现。</p>
<h1 id="articleHeader1">CSS 雪碧图简介</h1>
<p>开始说雪碧图各种实现前， 简单说下什么是雪碧图？雪碧图的原理是什么？<br><strong>什么是雪碧图？</strong></p>
<blockquote><p>雪碧图也叫CSS精灵， 是一CSS图像合成技术；</p></blockquote>
<p>上面解释说它是一项技术，但我们开发人员往往将小图标 合并在一起之后的<strong>图片</strong>称作<strong>雪碧图</strong>；术语定义其实不用纠结， 我们知道它主要用在小图标显示上就行了。</p>
<p><strong>CSS 雪碧图应用原理：</strong></p>
<p>只有一张大的合并图， 每个小图标节点如何显示单独的小图标呢？<br>其实就是&nbsp;<strong>截取</strong>&nbsp;大图一部分显示，而这部分就是一个小图标，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpAN?w=694&amp;h=332" src="https://static.alili.tech/img/bVGpAN?w=694&amp;h=332" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如显示上面 QQ 小图标， 则在合并图中X轴向右60像素， Y轴0像素， 截取宽高均为48像素；则 这个小图标就出来了：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpA6?w=58&amp;h=59" src="https://static.alili.tech/img/bVGpA6?w=58&amp;h=59" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关键样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background-image: url(&quot;sprite.png&quot;);
background-position: -60px 0px;
width:48px;
height:48px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">background-image</span>: <span class="hljs-selector-tag">url</span>("<span class="hljs-selector-tag">sprite</span><span class="hljs-selector-class">.png</span>");
<span class="hljs-selector-tag">background-position</span>: <span class="hljs-selector-tag">-60px</span> 0<span class="hljs-selector-tag">px</span>;
<span class="hljs-selector-tag">width</span><span class="hljs-selector-pseudo">:48px</span>;
<span class="hljs-selector-tag">height</span><span class="hljs-selector-pseudo">:48px</span>;</code></pre>
<p>接下来， 就开始进入实践环节， 如果我们要实现如下效果， 该怎么做呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVGpBh?w=316&amp;h=94" src="https://static.alili.tech/img/bVGpBh?w=316&amp;h=94" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVGpBi?w=319&amp;h=92" src="https://static.alili.tech/img/bVGpBi?w=319&amp;h=92" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>按正常开发流程， 我们的设计部同事会给我们这样的一个设计稿（实际设计稿会有更多无关图层）：<br><span class="img-wrap"><img data-src="/img/bVGpBm?w=918&amp;h=362" src="https://static.alili.tech/img/bVGpBm?w=918&amp;h=362" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>然后就是前端作为切图仔表现的时候了， 简单说下切图步骤（高级切图仔请跳过）：<br>1.裁剪工具（快捷键C）， 选中 切片工具：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpBs?w=234&amp;h=158" src="https://static.alili.tech/img/bVGpBs?w=234&amp;h=158" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.选中要导出的图标（建议快键键z用缩放工具放大然后选切图区）：<br><span class="img-wrap"><img data-src="/img/bVGpBA?w=288&amp;h=217" src="https://static.alili.tech/img/bVGpBA?w=288&amp;h=217" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVGpBB?w=600&amp;h=164" src="https://static.alili.tech/img/bVGpBB?w=600&amp;h=164" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>3.导出为web格式图片快捷键：Alt+Shift+Ctrl+S(mac: Alt+Shift+Commond+S)</p>
<p><span class="img-wrap"><img data-src="/img/bVGpBF?w=314&amp;h=318" src="https://static.alili.tech/img/bVGpBF?w=314&amp;h=318" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVGpBG?w=366&amp;h=144" src="https://static.alili.tech/img/bVGpBG?w=366&amp;h=144" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>需要说下的， 新版本 photoshop 从2015 CC开始就不用这么麻烦去切图了， 直接选中小图标图层右键“快速导出为PNG”， 即可得到对应小图标的png文件；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpBQ?w=213&amp;h=143" src="https://static.alili.tech/img/bVGpBQ?w=213&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>Photoshop软件版本不够新怎么办？ 你可以看看&nbsp;<a href="http://www.shejidaren.com/21-photoshop-plugins-for-designer.html" rel="nofollow noreferrer" target="_blank">21款强大高效的Photoshop扩展插件</a><br>第10个Breezy 即为切图插件；快速导出 或 切图 成功后， 就有了以下四个小图标了：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpBT?w=207&amp;h=133" src="https://static.alili.tech/img/bVGpBT?w=207&amp;h=133" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>小图标素材整理好后， 接下里就是针对上述页面效果的各种实现以及对比了。</p>
<h1 id="articleHeader2">传统网页调用小图标（原始方式）</h1>
<p>首先说下雪碧图技术没推广开来 或 新手小白开发以上效果时， 是这样实现的：demo地址：<br><a href="http://wteam-xq.github.io/testDemo/sass/gulp-sass/index_orig.html" rel="nofollow noreferrer" target="_blank">小图标调用Demo(原始版)</a><br>代码地址：<br><a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/index_orig.html" rel="nofollow noreferrer" target="_blank">小图标调用源码(原始版)</a><br>分别为四个小图标定义不同的四张小图标， 关键样式代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ps_demo_wrap .demo_icon{
    position: relative;
    float:left;
    margin:13px 0px 0px 10px;
    cursor: pointer;
    width:54px;
    height:54px;
}
.ps_demo_wrap .weibo_icon{ background-image:url(&quot;../scss/images/icon_weibo.png&quot;); }
.ps_demo_wrap .qq_icon{ background-image:url(&quot;../scss/images/icon_qq.png&quot;); }
.ps_demo_wrap .douban_icon{ background-image:url(&quot;../scss/images/icon_douban.png&quot;); }
.ps_demo_wrap .renren_icon{ background-image:url(&quot;../scss/images/icon_renren.png&quot;); }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.demo_icon</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">13px</span> <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">54px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">54px</span>;
}
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.weibo_icon</span>{ <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"../scss/images/icon_weibo.png"</span>); }
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.qq_icon</span>{ <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"../scss/images/icon_qq.png"</span>); }
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.douban_icon</span>{ <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"../scss/images/icon_douban.png"</span>); }
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.renren_icon</span>{ <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"../scss/images/icon_renren.png"</span>); }</code></pre>
<p>不使用雪碧图， 单纯调用小图片有以下优缺点：<br>优点：调用简单、维护方便；&nbsp;缺点：请求文件过多、引发性能问题；<br>为什么不建议使用该方式显示小图标？<br>每个小图标都单独调用一图片， 即意味着每个小图标的显示都产生一个HTTP请求；学习过<a href="http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html" rel="nofollow noreferrer" target="_blank">HTTP相关知识</a>应该知道，一般情况下每次创建一 HTTP请求，请求到的内容 往往是次要的（除非文件特别大）， 性能开销主要在请求、以及响应阶段；使用以上方式实现如 斗鱼直播间<a href="https://shark.douyucdn.cn/app/douyu/res/page/room-normal/level/level-csssprite.png?20161019" rel="nofollow noreferrer" target="_blank">雪碧图</a>或以下知乎的雪碧图， 造成的性能消耗肯定不小！</p>
<p><span class="img-wrap"><img data-src="/img/bVGpBY?w=308&amp;h=250" src="https://static.alili.tech/img/bVGpBY?w=308&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>综上所述， 网站开发中遇到小图标显示， 优先考虑雪碧图实现； 那么问题来了， 小图标合并成一张图片，如果需求有改动导致雪碧图修改（新增或修改小图标）， 更糟糕的是多个开发人员的功能模块都得调用该雪碧图（意味着多人会修改到雪碧图）， 该如何开发、维护雪碧图呢？</p>
<h1 id="articleHeader3">雪碧图实现1： CSS Gaga</h1>
<p><span class="img-wrap"><img data-src="/img/bVGpCg?w=555&amp;h=415" src="https://static.alili.tech/img/bVGpCg?w=555&amp;h=415" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="http://www.imooc.com/learn/93" rel="nofollow noreferrer" target="_blank">慕课网雪碧图教程</a>推荐软件，<a href="http://www.99css.com/cssgaga/" rel="nofollow noreferrer" target="_blank">CssGaga 帮助索引</a>PS： 该软件只有windows版本， 并未找到mac版；CssGaga如何实现雪碧图呢？<br>1.<a href="http://www.99css.com/1524/" rel="nofollow noreferrer" target="_blank">下载</a>安装该软件；<br>2.选中“<strong>图片合成</strong>”菜单后， 将小图标拖入软件首页即可生成对应的雪碧图以及CSS Sprite代码；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCj?w=568&amp;h=426" src="https://static.alili.tech/img/bVGpCj?w=568&amp;h=426" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>3.根据上述生成的雪碧图以及对应图标位置，编写CSS；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ps_demo_wrap .weibo_icon,
.ps_demo_wrap .qq_icon,
.ps_demo_wrap .douban_icon,
.ps_demo_wrap .renren_icon{
  width:54px;
  height:54px;
  background:url(&quot;../images/CssGaga.png&quot;);
}
.ps_demo_wrap .weibo_icon{ background-position: -168px 0px; }
.ps_demo_wrap .qq_icon{ background-position: -56px 0px; }
.ps_demo_wrap .douban_icon{ background-position: 0px 0px; }
.ps_demo_wrap .renren_icon{ background-position: -112px 0px; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.weibo_icon</span>,
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.qq_icon</span>,
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.douban_icon</span>,
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.renren_icon</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">54px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">54px</span>;
  <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"../images/CssGaga.png"</span>);
}
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.weibo_icon</span>{ <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">168px</span> <span class="hljs-number">0px</span>; }
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.qq_icon</span>{ <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">56px</span> <span class="hljs-number">0px</span>; }
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.douban_icon</span>{ <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span>; }
<span class="hljs-selector-class">.ps_demo_wrap</span> <span class="hljs-selector-class">.renren_icon</span>{ <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">112px</span> <span class="hljs-number">0px</span>; }</code></pre>
<p>demo地址：<br><a href="http://wteam-xq.github.io/testDemo/sass/gulp-sass/index_cssgaga.html" rel="nofollow noreferrer" target="_blank">雪碧图实现1Demo</a><br>代码地址：<br><a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/index_cssgaga.html" rel="nofollow noreferrer" target="_blank">雪碧图实现1源码</a></p>
<p>实现方案1问题比较多：</p>
<p>1.只支持windows操作系统， 对于很多mac开发的人而言不友好；</p>
<p>2.多人维护雪碧图时，沟通成本较高(得确认新的雪碧图中旧小图标位置是否有变化)；<br>接下来分析的实现方案2普及率比较高， 应该是目前大部分前端组的实现方式；</p>
<h1 id="articleHeader4">雪碧图实现2：photoShop</h1>
<p>虽然我们不是设计人员，但作为传统web开发人员photoShop几乎是必学技能； 当然随着前端技术的不断发展， 前端开发人员使用photoShop的几率会越来越少；<br>回归正题， 雪碧图的实现方案2就是使用photoShop来生成雪碧图， 并且雪碧图以PSD文件格式保留， 后续修改图标（或新增图标）只需要找到并修改该PSD即可， 再也不用保存原来的小图标了~<br>实现步骤：</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCx?w=600&amp;h=416" src="https://static.alili.tech/img/bVGpCx?w=600&amp;h=416" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.新建PSD文件根据设计稿确定初始大小：300*150；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCy?w=600&amp;h=298" src="https://static.alili.tech/img/bVGpCy?w=600&amp;h=298" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>3.复制设计稿图层；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCA?w=520&amp;h=296" src="https://static.alili.tech/img/bVGpCA?w=520&amp;h=296" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>4.雪碧图PSD新建参考线；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCF?w=600&amp;h=335" src="https://static.alili.tech/img/bVGpCF?w=600&amp;h=335" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVGpCH?w=429&amp;h=200" src="https://static.alili.tech/img/bVGpCH?w=429&amp;h=200" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>5.根据参考线确定小图标位置；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCM?w=204&amp;h=157" src="https://static.alili.tech/img/bVGpCM?w=204&amp;h=157" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVGpCN?w=239&amp;h=177" src="https://static.alili.tech/img/bVGpCN?w=239&amp;h=177" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVGpCO?w=277&amp;h=370" src="https://static.alili.tech/img/bVGpCO?w=277&amp;h=370" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>6.使用裁剪工具裁剪后，PSD导出为png, 快捷键： Alt+Shift+Ctrl+S(mac: Alt+Shift+Commond+S)；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCT?w=617&amp;h=162" src="https://static.alili.tech/img/bVGpCT?w=617&amp;h=162" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>7.获取小图标大小、位置；<br>选中图层， Ctrl+T (mac: Commond + T)， 在信息面板查看图层信息；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpC0?w=558&amp;h=255" src="https://static.alili.tech/img/bVGpC0?w=558&amp;h=255" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>8.根据雪碧图 编写对应CSS；</p>
<p><span class="img-wrap"><img data-src="/img/bVGpDc?w=600&amp;h=244" src="https://static.alili.tech/img/bVGpDc?w=600&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>以上步骤虽然多 熟悉后其实很快， 但 其对新手而言的确不友好；</p>
<p>demo地址：<br><a href="http://wteam-xq.github.io/testDemo/sass/gulp-sass/index_ps.html" rel="nofollow noreferrer" target="_blank">雪碧图实现2Demo</a><br>代码地址：<br><a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/index_ps.html" rel="nofollow noreferrer" target="_blank">雪碧图实现2源码</a></p>
<p>实现方案2问题：</p>
<p>1.操作PSD步骤有点多， 需要开发人员熟悉PS操作；</p>
<p>2.PSD文件比较大， 也不太适合保存在项目中， 一般放SVN共享维护；（SVN服务器宕机、PSD文件冲突等也需要不少时间成本）<br>好了，接下来分析的是实现方式3， 使用自动化部署工具gulp生成雪碧图，也是本文<strong>推荐</strong>的雪碧图实现方式！</p>
<h1 id="articleHeader5">雪碧图实现3：gulp</h1>
<p>如果读者从未听说gulp或者对gulp了解的比较少， 建议网上搜索并阅读gulp相关资料后继续观看以下内容！</p>
<p><span class="img-wrap"><img data-src="/img/bVGpDl?w=580&amp;h=425" src="https://static.alili.tech/img/bVGpDl?w=580&amp;h=425" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>gulp环境搭建无非就是 安装<a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank">nodejs&nbsp;</a>然后通过npm(建议使用<a href="https://cnpmjs.org/" rel="nofollow noreferrer" target="_blank">cnpm</a>)安装gulp模块；<br>具体可参考：<a href="http://www.cnblogs.com/2050/p/4198792.html" rel="nofollow noreferrer" target="_blank">前端构建工具gulp的使用</a>；<br>使用gulp自动生成雪碧图有两种实现方式&nbsp;<strong>gulp生成 css 代码</strong></p>
<p><strong>实现步骤：</strong></p>
<p>1.安装 gulp 开发雪碧图的依赖模块，具体要哪些模块可参考本demo的<a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/gulpfile.js" rel="nofollow noreferrer" target="_blank">配置文件</a>；<br>PS: 为什么不直接参考本demo的package.json文件？因为本demo所在工程引用的其他nodejs模块较多容易造成干扰。</p>
<p>2.编写<a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/gulpfile.js" rel="nofollow noreferrer" target="_blank">配置文件</a>， 以下是关键配置代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 雪碧图合并task( 输出到 css文件 )
* 参数1：执行目录；
* 参数2：生成的sass和图片的文件名；
* example：gulp sprite-css --scss --index_css_gulp
*/
gulp.task('sprite-css', function(){
  var DEST_NAME = args[1];
  return  gulp.src(`${WATCH_SRC}/**/*.png`)
              .pipe(spritesmith({
                  imgName: DEST_NAME + '.png',
                  cssName: DEST_NAME + '.css',
                  imgPath: '../images/' + DEST_NAME + '.png'
              }))
              .pipe(gulpif('*.png', gulp.dest('images/')))
              .pipe(gulpif('*.css', gulp.dest('css/')));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
* 雪碧图合并task( 输出到 css文件 )
* 参数1：执行目录；
* 参数2：生成的sass和图片的文件名；
* example：gulp sprite-css --scss --index_css_gulp
*/</span>
gulp.task(<span class="hljs-string">'sprite-css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> DEST_NAME = args[<span class="hljs-number">1</span>];
  <span class="hljs-keyword">return</span>  gulp.src(<span class="hljs-string">`<span class="hljs-subst">${WATCH_SRC}</span>/**/*.png`</span>)
              .pipe(spritesmith({
                  <span class="hljs-attr">imgName</span>: DEST_NAME + <span class="hljs-string">'.png'</span>,
                  <span class="hljs-attr">cssName</span>: DEST_NAME + <span class="hljs-string">'.css'</span>,
                  <span class="hljs-attr">imgPath</span>: <span class="hljs-string">'../images/'</span> + DEST_NAME + <span class="hljs-string">'.png'</span>
              }))
              .pipe(gulpif(<span class="hljs-string">'*.png'</span>, gulp.dest(<span class="hljs-string">'images/'</span>)))
              .pipe(gulpif(<span class="hljs-string">'*.css'</span>, gulp.dest(<span class="hljs-string">'css/'</span>)));
});</code></pre>
<p>之所以推荐gulp， 是因为gulp非常的灵活， 看懂gulp模块的API可以根据你的项目情况编写对应的配置文件。所以以上配置文件只是一个参考， 实现的功能几乎不可能迁移到其他项目。</p>
<p>3.编写好配置文件后， cmd(windows)或终端(mac)到配置文件同级目录（gulpfile.js， gulp规定配置文件名字必须为gulpfile）然后执行指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp sprite-css --scss --index_css_gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">gulp</span> <span class="hljs-comment">sprite</span><span class="hljs-literal">-</span><span class="hljs-comment">css</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">scss</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">index_css_gulp</span></code></pre>
<p>就会在指定路径生成index_css_gulp.css 以及 index_css_gulp.png, 一般是拷贝index_css_gulp.css样式后再删除该css文件， 本demo功能比较简单， 所以直接在index_css_gulp.css添加新样式；<br>demo地址：<br><a href="http://wteam-xq.github.io/testDemo/sass/gulp-sass/index_css_gulp.html" rel="nofollow noreferrer" target="_blank">雪碧图实现3_1Demo</a><br>代码地址：<br><a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/index_css_gulp.html" rel="nofollow noreferrer" target="_blank">雪碧图实现3_1源码</a></p>
<p><strong>gulp 生成 sass 代码（推荐）</strong></p>
<p>比起上述用gulp生成css代码， 本人更推荐使用gulp生成sass代码，因为你已经安装了gulp了那顺便安装下gulp-sass很简单。越是大型的项目， sass 的优势越明显， 当然小项目用它也不差。（sass可以明显提高编写样式的效率）</p>
<p><span class="img-wrap"><img data-src="/img/bVEXYF?w=440&amp;h=220" src="https://static.alili.tech/img/bVEXYF?w=440&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>实现步骤</strong>：</p>
<p>1、2、3步骤同上， 只是第三步骤指定的指令为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp sprite --scss --mySprite" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">gulp</span> <span class="hljs-comment">sprite</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">scss</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">mySprite</span></code></pre>
<p>关键配置代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 雪碧图合并task( 输出到 scss文件)
* 参数1：执行目录；
* 参数2：生成的sass和图片的文件名；
* 参数3：输出目录（非必填），不填的话输出目录为执行目录
* example：gulp sprite --scss --mySprite
*/
gulp.task('sprite', function(){
    var DEST_SRC = args[2] !== undefined ? args[2] : args[0];
    var DEST_NAME = args[1];
    var spriteData = gulp.src(`${WATCH_SRC}/**/*.png`).pipe(spritesmith({
        imgName: DEST_NAME + '.png',
        imgPath: '../images/' + DEST_NAME + '.png',
        cssName: '_' + DEST_NAME + '.scss'
    }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe($.imagemin())
        .pipe(gulp.dest('images'));

    var cssStream = spriteData.css
        .pipe(gulp.dest(`${DEST_SRC}`));

    return merge(imgStream, cssStream);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
* 雪碧图合并task( 输出到 scss文件)
* 参数1：执行目录；
* 参数2：生成的sass和图片的文件名；
* 参数3：输出目录（非必填），不填的话输出目录为执行目录
* example：gulp sprite --scss --mySprite
*/</span>
gulp.task(<span class="hljs-string">'sprite'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> DEST_SRC = args[<span class="hljs-number">2</span>] !== <span class="hljs-literal">undefined</span> ? args[<span class="hljs-number">2</span>] : args[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> DEST_NAME = args[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">var</span> spriteData = gulp.src(<span class="hljs-string">`<span class="hljs-subst">${WATCH_SRC}</span>/**/*.png`</span>).pipe(spritesmith({
        <span class="hljs-attr">imgName</span>: DEST_NAME + <span class="hljs-string">'.png'</span>,
        <span class="hljs-attr">imgPath</span>: <span class="hljs-string">'../images/'</span> + DEST_NAME + <span class="hljs-string">'.png'</span>,
        <span class="hljs-attr">cssName</span>: <span class="hljs-string">'_'</span> + DEST_NAME + <span class="hljs-string">'.scss'</span>
    }));

    <span class="hljs-keyword">var</span> imgStream = spriteData.img
        .pipe(buffer())
        .pipe($.imagemin())
        .pipe(gulp.dest(<span class="hljs-string">'images'</span>));

    <span class="hljs-keyword">var</span> cssStream = spriteData.css
        .pipe(gulp.dest(<span class="hljs-string">`<span class="hljs-subst">${DEST_SRC}</span>`</span>));

    <span class="hljs-keyword">return</span> merge(imgStream, cssStream);
});</code></pre>
<p>执行完指令后会在对应目录生成_mySprite.scss 、mySprite.png, 根据sass语法带“_”前缀的文件为调用模块， 只能被其他sass文件调用不会被编译成同名css文件；生成的_mySprite.scss文件手动添加到目标样式index.scss中调用， 然后通过监听（配置文件的sass:watch）自动生成index.css文件，配置文件可以在执行指令的时候指定路径，所以能适应更多的场景。</p>
<p>demo地址：<br><a href="http://wteam-xq.github.io/testDemo/sass/gulp-sass/index.html" rel="nofollow noreferrer" target="_blank">雪碧图实现3_2Demo</a><br>代码地址：<br><a href="https://github.com/wteam-xq/testDemo/blob/master/sass/gulp-sass/index.html" rel="nofollow noreferrer" target="_blank">雪碧图实现3_2源码</a></p>
<p>实现方案3问题：<br>1.gulp 相关知识得熟悉才能写出对应的配置文件；</p>
<p>2.如使用gulp生成scss文件还得学习<a href="http://www.w3cplus.com/sassguide/" rel="nofollow noreferrer" target="_blank">sass相关资料</a>；</p>
<p>PS: gulp 跟 sass 都是大部分前端组要求掌握的技能；</p>
<h1 id="articleHeader6">雪碧图实现4：webpack</h1>
<p>说到webpack很多人会联想到ReactJs， 的确前段时间 ReactJs 的大热让更多的人知道了webpack， 但webpack并不是ReactJs内置的模块， 它是德国人开发出来的模块加载工具。因为很好用所以被ReactJs作为推荐加载工具， webpack可以跟其他库一起完成项目，本demo单独使用webpack完成。</p>
<p><span class="img-wrap"><img data-src="/img/bVGpD7?w=2598&amp;h=1299" src="https://static.alili.tech/img/bVGpD7?w=2598&amp;h=1299" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>实现步骤</strong>：</p>
<p>1.<a href="http://webpackdoc.com/install.html" rel="nofollow noreferrer" target="_blank">配置webpack开发环境</a>（其实也是安装nodejs环境+cnpm安装对应模块而已）；</p>
<p>2.安装雪碧图依赖模块：<a href="https://www.npmjs.com/package/webpack-spritesmith" rel="nofollow noreferrer" target="_blank">webpack-spritesmith</a>;</p>
<p>3.将素材小图标放入对应文件夹，编写配置文件-webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
        new SpritesmithPlugin({
          src: {
            cwd: path.resolve(__dirname, 'app/images/'),
            glob: '*.png'
          },
          target: {
            image: path.resolve(__dirname, 'build/images/sprite.png'),
            css: path.resolve(__dirname, 'build/css/sprite.css')
          },
          apiOptions: {
            cssImageRef: '../images/sprite.png'
          },
          spritesmithOptions: {
            algorithm: 'top-down'
          }
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>var <span class="hljs-built_in">path</span> = require(<span class="hljs-string">'path'</span>);
var SpritesmithPlugin = require(<span class="hljs-string">'webpack-spritesmith'</span>);

module.exports = {
    entry: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'app/main.js'</span>),
    output: {
        <span class="hljs-built_in">path</span>: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'build'</span>),
        filename: <span class="hljs-string">'bundle.js'</span>,
    },
    plugins: [
        new SpritesmithPlugin({
          src: {
            cwd: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'app/images/'</span>),
            glob: <span class="hljs-string">'*.png'</span>
          },
          target: {
            image: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'build/images/sprite.png'</span>),
            css: <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'build/css/sprite.css'</span>)
          },
          apiOptions: {
            cssImageRef: <span class="hljs-string">'../images/sprite.png'</span>
          },
          spritesmithOptions: {
            algorithm: <span class="hljs-string">'top-down'</span>
          }
        })
    ]
};</code></pre>
<p>4.在配置文件同级目录下，执行指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">webpack</span></code></pre>
<p>同实现3_1在生成的sprite.css手动添加样式demo就完成了！该实现方式类似gulp， 都使用“ spritesmith”模块，都写配置文件+执行指令生成雪碧图，当然webpack方式也可以生成scss文件， 限于本文篇幅就不做介绍了（其实是还不会[一脸懵逼挠头])。 </p>
<p>demo地址：<br><a href="http://wteam-xq.github.io/testDemo/webpack/build/index.html" rel="nofollow noreferrer" target="_blank">雪碧图实现4Demo</a><br>代码地址：<br><a href="https://github.com/wteam-xq/testDemo/blob/master/webpack/build/index.html" rel="nofollow noreferrer" target="_blank">雪碧图实现4源码</a> </p>
<p>实现方案4问题：</p>
<p>1.需要学习<a href="http://webpack.github.io/docs/tutorials/getting-started/" rel="nofollow noreferrer" target="_blank">webpack相关知识</a>；（现在webpack官网教程完善些了，不像早些时候官网教程外链到别人博客，评论区里各种吐槽表情包~~~）</p>
<p>2.webpack是一套完整的模块引用工具，不止样式， 其他功能不一定用的上。</p>
<h1 id="articleHeader7">结语：</h1>
<p>除了 gulp 跟 webpack 外，还有国产前端部署的解决方案<a href="http://fis.baidu.com/fis3/docs/beginning/intro.html" rel="nofollow noreferrer" target="_blank">FIS3</a>, 其对小图标也有一套部署配置流程， 因为不了解就不写了， 感兴趣的同学可以去学习下；webpack跟FIS3包含的其他功能多一些（特别是FIS3可称为完整的解决方案），一般项目如果大方向的技术选型没定webpack或FIS3,就单纯完成雪碧图而言不太推荐；<br>最后说明下， 上述的demo实现是有浏览器兼容问题的， IE8(包括IE8)以下版本不支持圆角和rgba单位值：<br>border-radius:50%;background-color: rgba(0,0,0,.5);<br>rgba颜色方面倒是可以使用透明+滤镜（低版本浏览器）实现， 圆角就只有新增图标了， 当然以上只是demo不用在意其他细节了哈~</p>
<hr>
<p><strong>参考资料</strong>：<br><a href="http://www.imooc.com/learn/93" rel="nofollow noreferrer" target="_blank">CSS Sprite实践应用-慕课网</a><br><a href="https://pan.baidu.com/s/1nvIwOBn" rel="nofollow noreferrer" target="_blank">Photoshop实践分享PPT</a><br><a href="http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html" rel="nofollow noreferrer" target="_blank">HTTP协议详解</a><br><a href="http://www.shejidaren.com/21-photoshop-plugins-for-designer.html" rel="nofollow noreferrer" target="_blank">21款强大高效的Photoshop扩展插件</a><br><a href="http://www.99css.com/cssgaga/" rel="nofollow noreferrer" target="_blank">CssGaga 帮助索引</a><br><a href="http://www.cnblogs.com/2050/p/4198792.html" rel="nofollow noreferrer" target="_blank">前端构建工具gulp的使用</a><br><a href="http://www.w3cplus.com/sassguide/" rel="nofollow noreferrer" target="_blank">十分钟学会sass</a><br><a href="http://webpackdoc.com/" rel="nofollow noreferrer" target="_blank">webpack中文指南</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈 CSS Sprites 雪碧图应用

## 原文链接
[https://segmentfault.com/a/1190000007686042](https://segmentfault.com/a/1190000007686042)

