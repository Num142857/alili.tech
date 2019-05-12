---
title: 'iconfont实践小结' 
date: 2019-01-07 2:30:11
hidden: true
slug: au7s5326zr
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVRnAC?w=431&amp;h=220" src="https://static.alili.tech/img/bVRnAC?w=431&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>之前写了一篇关于<a href="https://zhuanlan.zhihu.com/p/23873229" rel="nofollow noreferrer" target="_blank">雪碧图的博文</a>， 评论里有说用<a href="https://ye11ow.gitbooks.io/http2-explained/content/part2.html" rel="nofollow noreferrer" target="_blank">http2</a>、或用SVG也有说用图标字体代替，大家知识面是挺广，但深入了解技术点的似乎却不多，否则不会有雪碧图过时无用，用<a href="https://ye11ow.gitbooks.io/http2-explained/content/part2.html" rel="nofollow noreferrer" target="_blank">http2</a>或图标字体取代就好了的想法；<a href="https://ye11ow.gitbooks.io/http2-explained/content/part2.html" rel="nofollow noreferrer" target="_blank">http2</a>后续有时间再写一篇个人实践、理解博文， 本文主要讲图标字体（iconfont）技术点，从实践开发角度讲述个人对<strong>图标字体</strong>的理解。</p>
<h1 id="articleHeader0">一.iconfont使用场景（优缺点）；</h1>
<p>一般我们项目决定要使用一个技术点前，会查相关资料对其有大概的理解。例如， 这次要使用iconfont实现功能， 理解相关资料后归纳、总结出它的优、缺点以及它的使用场景。</p>
<p><strong>图标字体优、缺点：</strong></p>
<p>1.优点；</p>
<p>轻量（文件体积小）、灵活（样式可改变图标）、兼容性好（IE8+）。</p>
<p>2.缺点；</p>
<p>图标只能单色调（太复杂的多色图标无法实现）、生成图标字体相对花时间。</p>
<p>跟webfont一样iconfont实现的关键代码是“@font-face”（<a href="http://www.zhangxinxu.com/wordpress/2017/03/css3-font-face-src-local/" rel="nofollow noreferrer" target="_blank">细谈CSS@font face</a>）查看其浏览器兼容信息为IE8+:</p>
<p><span class="img-wrap"><img data-src="/img/bVRnAF?w=649&amp;h=175" src="https://static.alili.tech/img/bVRnAF?w=649&amp;h=175" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>低版本浏览器其实也有方法兼容，<a href="https://icomoon.io/app/" rel="nofollow noreferrer" target="_blank">icoMoon</a>是图标字体开发时生成字体文件及demo的网站，用过<a href="https://icomoon.io/app/" rel="nofollow noreferrer" target="_blank">icoMoon</a>的同学都知道其有一个“Support IE 7”选项， icoMoon IE7支持实现原理：样式上用*zoom 触发重绘（触发haslayout）， 脚本上检测 关键字className动态插入dom节点实现；考虑到IE7目前的市场份额，以及该方式带来的性能消耗，本人不建议去兼容。</p>
<p>另外，图标只能单色调这个问题也有办法解决，<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">阿里巴巴iconfont+</a> 也是图标字体开发时生成字体文件及demo的网站；<a href="https://zhuanlan.zhihu.com/p/27950197/goog_238653260" rel="nofollow noreferrer" target="_blank">阿里巴巴</a><a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont+</a> 生成的demo可以解决图标单色调问题，其原理是 生成svg合集， 然后使用svg呈现图标。但该方式兼容性较差（<a href="http://www.zhangxinxu.com/wordpress/2013/09/svg-fallbacks/" rel="nofollow noreferrer" target="_blank">SVG兼容小结</a>）， 如是移动端开发不考虑低版本浏览器兼容问题可以尝试该方式。</p>
<p>根据以上图标字体的优缺点， 个人总结的使用场景如下：</p>
<p><strong>1.web app(H5) 小图标 放大失真问题解决；</strong></p>
<p>移动页面大多数情况没办法用雪碧图，用了雪碧图表示图片大小固定了，而移动端需要兼容不同屏幕大小的移动设备，这就需要图片是可以根据屏幕尺寸而改变的。 如果你的图尺寸是固定的，那就可以用雪碧图。</p>
<p><strong>2.PC端小图标性能更佳、小图标尺寸修改不用改原图；</strong></p>
<p>PC端页面优化，可将部分雪碧图换成小图标，字体图标比雪碧图的http请求少、体积小；（加载一个页面时分模块开发关系可能有多张雪碧图，但使用字体图标，文件一个就够）</p>
<p>PC端做换肤业务时，使用了字体图标实现起来更加的优雅、方便。（之前做页面换皮肤功能时发现换肤时小图标得多出一套雪碧图略麻烦， 如果是字体图标直接更新颜色样式就OK）</p>
<p>知乎、斗鱼、Bilibili这类网站不少地方使用了雪碧图，如果我们维护这类网站，能用图标字体替换么？</p>
<p>从两方面考虑：</p>
<p>1.开发时间成本问题， 使用自定义图标字体替换雪碧图需要一定时间，如果要求快速更新小图标建议维持用雪碧图；</p>
<p>2.字体小图标兼容、单调色问题， 如果网站需要兼容低版本浏览器、且图标复杂、或者多色那还是得用雪碧图。</p>
<p><span class="img-wrap"><img data-src="/img/bVRnAK?w=439&amp;h=230" src="https://static.alili.tech/img/bVRnAK?w=439&amp;h=230" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVRnAL?w=675&amp;h=95" src="https://static.alili.tech/img/bVRnAL?w=675&amp;h=95" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVRnAM?w=558&amp;h=176" src="https://static.alili.tech/img/bVRnAM?w=558&amp;h=176" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>所以实现小图标时雪碧图 跟 图标字体会在一个网站共存，自定义图标字体 为什么比较耗时，且太复杂图标无法实现？请往下看iconfont开发流程就了解了。</p>
<h1 id="articleHeader1">二.iconfont开发流程；</h1>
<p>接下来就是本文篇幅最大的章节， 我将从自己实现图标字体小demo上详细的列出所有步骤。</p>
<p><strong>使用免费图标字体：</strong></p>
<p>如果网站使用的不是自定义的图标字体，而是网上开源的免费图标那实现上将非常的简单；</p>
<p>例如， 我要使用<a href="https://zhuanlan.zhihu.com/p/27950197/goog_238653260" rel="nofollow noreferrer" target="_blank">阿里巴巴</a><a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont+</a> 上的图标字体， 进入网站并登陆（可以用github账号登录），从图标库选取自己喜欢的图标：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnAU?w=2338&amp;h=984" src="https://static.alili.tech/img/bVRnAU?w=2338&amp;h=984" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里我选取了三个小图标，点击右上角购物车，将选取的图标添加到新建项目,然后点选“下载至本地”：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnAV?w=1488&amp;h=560" src="https://static.alili.tech/img/bVRnAV?w=1488&amp;h=560" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下载下来的压缩包就包括了 三小图标字体文件， 以及三种实现方式的demo；</p>
<p><span class="img-wrap"><img data-src="/img/bVRnAW?w=494&amp;h=522" src="https://static.alili.tech/img/bVRnAW?w=494&amp;h=522" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>下载图标字体的三种用法，打开对应html（demo_fontclass.html、demo_symbol.html、demo_unicode.html）文件即可了解（也可直接打开我<a href="http://wteam-xq.github.io/testDemo/iconfont/index.html" rel="nofollow noreferrer" target="_blank">demo</a>里的这三个文件查看用法，所以用法这里不冗述了）；有4个字体文件（EOT/SVG/TTF/WOFF）是为了兼容所有浏览器，因为不同浏览器对字体格式兼容是不一样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnAY?w=495&amp;h=157" src="https://static.alili.tech/img/bVRnAY?w=495&amp;h=157" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>使用自定义图标字体：</strong></p>
<p>实际开发中基本都是使用自定义生成的图标字体,大致步骤如下：</p>
<p>1）使用PS-矩形工具 生成图标；</p>
<p>2）AI软件打开PSD文件，File-&gt;Scripts-&gt;SaveDocsAsSVG 生成SVG文件；</p>
<p>3）访问阿里巴巴iconfont+(或iconMoon)上传SVG生成字体文件；</p>
<p>PS: 教程<a href="http://www.cnblogs.com/yincheng/p/icon-font-practice.html" rel="nofollow noreferrer" target="_blank">雪碧图vs图标字体 </a>中多了PS导出AI文件的步骤，经实践PS生成的AI文件打开容易显示空白，且AI软件可直接打开PSD文件，该步骤可省略.</p>
<p>其实生成自定义图标字体一般交给设计部同事完成（可能设计同事是用Sketch而不是PS生成小图标）， 因为要了解整个流程细节，所以请教了设计部同事生成自定义图标字体的技巧跟方法； 这里就分享下生成自定义图标字体的具体流程：</p>
<p>首先，下载生成小图标的软件： PS(Photoshop)、AI(Adobe Illustrator);</p>
<p><span class="img-wrap"><img data-src="/img/bVGpCx?w=600&amp;h=416" src="https://static.alili.tech/img/bVGpCx?w=600&amp;h=416" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>PS下载地址：<a href="https://pan.baidu.com/s/1i5HOgM5" rel="nofollow noreferrer" target="_blank">mac 版</a>、<a href="https://pan.baidu.com/s/1slCimy5%23list/path=/" rel="nofollow noreferrer" target="_blank">windows版</a></p>
<p><span class="img-wrap"><img data-src="/img/bVRnA2?w=450&amp;h=272" src="https://static.alili.tech/img/bVRnA2?w=450&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>AI下载地址：<a href="https://pan.baidu.com/s/1geLnsMR" rel="nofollow noreferrer" target="_blank">mac 版</a>、<a href="http://vdisk.weibo.com/s/ahNyypC_3Hmyz" rel="nofollow noreferrer" target="_blank">windows版</a></p>
<p><strong>1）使用PS-矩形工具 生成图标；</strong></p>
<p>预计demo功能： 三个小图标：笑脸、黑脸、帽子； 默认显示笑脸+帽子，鼠标hover，变成黑脸+帽子（颜色变绿）；</p>
<p>将要实现的小demo将有三个小图标， 接下来就使用PS生成这三个小图标；</p>
<p>无论是用Sketch还是Photoshop绘制小图标的思路都差不多，使用各种基本图形相加相减得到想要的小图标；所以太复杂的图形实现起来会耗时甚至无法实现。（<a href="http://www.uisdc.com/vector-icon-design-6-skills" rel="nofollow noreferrer" target="_blank">PS矢量小图标制作</a>、<a href="http://sketch.im/video/23" rel="nofollow noreferrer" target="_blank">Sketch小图标制作技巧</a>）</p>
<p>笑脸PSD：</p>
<p>使用PS新建165px <em> 124px 图层， 使用 “圆角矩形工具”创建100px</em>100px的圆（颜色#666）：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnA6?w=496&amp;h=372" src="https://static.alili.tech/img/bVRnA6?w=496&amp;h=372" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>继续用 “圆角矩形工具”绘制小图标的眼睛（为了直观可改成白色）：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnA7?w=498&amp;h=374" src="https://static.alili.tech/img/bVRnA7?w=498&amp;h=374" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>ctrl+e(command+e)</code> 合并形状并选择“排除重叠形状”：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBd?w=492&amp;h=374" src="https://static.alili.tech/img/bVRnBd?w=492&amp;h=374" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>小图标的嘴巴有点复杂，使用钢笔工具或使用两个圆形相减（“排除重叠形状” ）+矩形工具（“与形状区域相交”）生成嘴巴:</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBh?w=494&amp;h=356" src="https://static.alili.tech/img/bVRnBh?w=494&amp;h=356" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>然后 <code>ctrl+e(command+e)</code> 合并形状并选择“排除重叠形状”生成笑脸</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBi?w=498&amp;h=376" src="https://static.alili.tech/img/bVRnBi?w=498&amp;h=376" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>黑脸PSD：</p>
<p>与笑脸PSD一样流程， 只把嘴巴旋转180度就行：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBm?w=498&amp;h=370" src="https://static.alili.tech/img/bVRnBm?w=498&amp;h=370" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>帽子PSD：<br>使用PS新建165px <em> 124px 图层， 使用 “椭圆工具”创建150px</em>20px的椭圆（颜色#666），然后画一个90px*110px的椭圆：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBn?w=498&amp;h=378" src="https://static.alili.tech/img/bVRnBn?w=498&amp;h=378" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在第二个椭圆图层使用矩形工具（“减去顶层形状”）删减该椭圆内容然后与第一个椭圆 <code>ctrl+e(command+e)</code> 合并形状：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBv?w=498&amp;h=376" src="https://static.alili.tech/img/bVRnBv?w=498&amp;h=376" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>2）AI软件打开PSD文件，File-&gt;Scripts-&gt;SaveDocsAsSVG 生成SVG文件；</strong></p>
<p>生成三个小图标的PSD后，我们使用AI软件打开三个文件， 然后分别处理生成SVG文件：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBw?w=928&amp;h=262" src="https://static.alili.tech/img/bVRnBw?w=928&amp;h=262" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVRnBy?w=644&amp;h=220" src="https://static.alili.tech/img/bVRnBy?w=644&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>3）访问阿里巴巴iconfont+(或iconMoon)上传SVG生成字体文件；</strong></p>
<p>将上述步骤生成的SVG文件在<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">阿里巴巴iconfont+</a>中上传，然后这几个小图标就在“我上传的icon”中：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBz?w=816&amp;h=272" src="https://static.alili.tech/img/bVRnBz?w=816&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVRnBB?w=930&amp;h=538" src="https://static.alili.tech/img/bVRnBB?w=930&amp;h=538" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVRnBJ?w=1914&amp;h=1028" src="https://static.alili.tech/img/bVRnBJ?w=1914&amp;h=1028" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVRnBM?w=722&amp;h=394" src="https://static.alili.tech/img/bVRnBM?w=722&amp;h=394" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>将图标添加入库， 然后添加到项目， 最后就能下载字体及demo到本地了：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBP?w=726&amp;h=312" src="https://static.alili.tech/img/bVRnBP?w=726&amp;h=312" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVRnBQ?w=596&amp;h=1186" src="https://static.alili.tech/img/bVRnBQ?w=596&amp;h=1186" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVRnBS?w=1210&amp;h=558" src="https://static.alili.tech/img/bVRnBS?w=1210&amp;h=558" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>字体文件下载好后， 就能轻松实现我的小demo:</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBY?w=703&amp;h=391" src="https://static.alili.tech/img/bVRnBY?w=703&amp;h=391" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://wteam-xq.github.io/testDemo/iconfont/myDemo/my_demo.html" rel="nofollow noreferrer" target="_blank">小demo演示地址；</a></p>
<h1 id="articleHeader2">三.iconfont实践注意事项.</h1>
<p>1.生成图标字体注意事项；</p>
<p><span class="img-wrap"><img data-src="/img/bVRnBZ?w=1926&amp;h=866" src="https://static.alili.tech/img/bVRnBZ?w=1926&amp;h=866" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>截图来自<a href="http://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.12&amp;helptype=draw" rel="nofollow noreferrer" target="_blank">阿里巴巴iconfont+</a>；</p>
<p>更多生成图标字体注意点，请阅读参考资料中<a href="http://www.cnblogs.com/yincheng/p/icon-font-practice.html" rel="nofollow noreferrer" target="_blank">《雪碧图vs图标字体》</a>-&gt;如何制作图标字体；</p>
<p>2.使用图标字体注意事项;</p>
<p>跨域问题</p>
<p>1）配置自己的服务器；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# For Apache
<FilesMatch &quot;.(eot|ttf|otf|woff)&quot;>
Header set Access-Control-Allow-Origin &quot;*&quot;
</FilesMatch>
# For nginx
location ~* \.(eot|ttf|woff)$ {
add_header Access-Control-Allow-Origin *;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code><span class="hljs-comment"># For Apache</span>
<span class="hljs-variable">&lt;FilesMatch ".(eot|ttf|otf|woff)"&gt;</span>
Header set Access-Control-Allow-Origin <span class="hljs-string">"*"</span>
<span class="hljs-variable">&lt;/FilesMatch&gt;</span>
<span class="hljs-comment"># For nginx</span>
location ~<span class="hljs-symbol">*</span> \.(eot|<span class="hljs-string">ttf</span>|<span class="hljs-string">woff)$ {
add_header Access-Control-Allow-Origin *;
}</span></code></pre>
<p>2）放在同一个域；</p>
<p>3）使用base64置入CSS中(Icomoon在导出图标时，设置里勾选Encode &amp; Embed Font in CSS选项，IE8+支持base64)。</p>
<p>字体图标出现锯齿的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>-webkit-<span class="hljs-attribute">font</span>-smoothing: antialiased;
-moz-osx-<span class="hljs-attribute">font</span>-smoothing: grayscale;</code></pre>
<p>@font-face与性能问题</p>
<p>1）只在你确定你非常需要 @font-face的时候才使用它;</p>
<p>2）将你的@font-face定义在所有的script标签前;</p>
<p>3）如果你有许多字体文件，考虑将它们分散到几个域名下;</p>
<p>4）不要包含没有使用的 @font-face声明——IE将不分它使用与否，通通加载;</p>
<p>5）Gzip字体文件，同时给它们一个未来的过期头部声明;</p>
<p>6）考虑字体文件的后加载，起码对于IE。</p>
<p>--以上使用图标字体注意事项来源<a href="http://isux.tencent.com/icon-font.html" rel="nofollow noreferrer" target="_blank">《浅谈图标字体》</a>；</p>
<p>关于字体文件跨域可能是大家最关心的问题， 三种解决跨域的方式中base64至入CSS是比较主流的做法，例如&nbsp;<a href="https://www.mi.com/index.html" rel="nofollow noreferrer" target="_blank">小米官网</a>&nbsp;的小图标就是用base64至入CSS中实现。</p>
<blockquote><p>Icomoon在导出图标时，设置里勾选Encode &amp; Embed Font in CSS选项</p></blockquote>
<p>目前 Icomoon 勾选生成base64样式会出现收费的问题，那目前实现base64至入CSS有哪些方式呢？<br><strong>1.使用在线 网站将字体文件 生成base64样式；</strong><br>百度关键字“图标字体转base64”能找到不少， 这里推荐&nbsp;<a href="http://www.css-js.com/tools/base64.html" rel="nofollow noreferrer" target="_blank">转base64在线工具&nbsp;</a>；</p>
<p><span class="img-wrap"><img data-src="/img/bVRnB1?w=2000&amp;h=1092" src="https://static.alili.tech/img/bVRnB1?w=2000&amp;h=1092" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在线工具要求源文件不能大于100K，如果文件过大可以考虑本地构件工具；</p>
<p><strong>2.使用webpack、gulp等构件工具在本地将字体文件转成base64样式；</strong><br>本demo使用&nbsp;<a href="https://www.npmjs.com/package/gulp-base64" rel="nofollow noreferrer" target="_blank">gulp base64&nbsp;</a>实现转换：</p>
<p><span class="img-wrap"><img data-src="/img/bVRnB8?w=1812&amp;h=882" src="https://static.alili.tech/img/bVRnB8?w=1812&amp;h=882" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>PS： 本demo的“base64”指令 配置的有点粗糙， 如果在生产中会考虑 接受参数 以及 自动将生成的样式合并到 指定样式文件等，大家可以查看&nbsp;<a href="https://www.npmjs.com/package/gulp-base64" rel="nofollow noreferrer" target="_blank">gulp base64&nbsp;</a>官网了解更详细的使用方法。</p>
<p>参考资料：</p>
<p><a href="http://www.zhangxinxu.com/wordpress/2017/03/css3-font-face-src-local/" rel="nofollow noreferrer" target="_blank">细谈CSS@font face；</a></p>
<p><a href="http://isux.tencent.com/icon-font.html" rel="nofollow noreferrer" target="_blank">浅谈图标字体；</a></p>
<p><a href="http://www.zhangxinxu.com/wordpress/2013/09/svg-fallbacks/" rel="nofollow noreferrer" target="_blank">SVG向下兼容优雅降级技术；</a></p>
<p><a href="http://sketch.im/video/23" rel="nofollow noreferrer" target="_blank">Sketch 绘制小图标技巧；</a></p>
<p><a href="http://www.cnblogs.com/yincheng/p/icon-font-practice.html" rel="nofollow noreferrer" target="_blank">雪碧图vs图标字体；</a></p>
<p><a href="http://www.uisdc.com/vector-icon-design-6-skills" rel="nofollow noreferrer" target="_blank">PS矢量小图标设计；</a></p>
<p>本文对应源码：</p>
<p><a href="https://github.com/wteam-xq/testDemo/tree/master/iconfont" rel="nofollow noreferrer" target="_blank">github源码地址</a>；</p>
<p><a href="http://wteam-xq.github.io/testDemo/iconfont/index.html" rel="nofollow noreferrer" target="_blank">demo演示地址；</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iconfont实践小结

## 原文链接
[https://segmentfault.com/a/1190000010299811](https://segmentfault.com/a/1190000010299811)

