---
title: '打造最美HTML5 3D机房（MONO哥强势归来，第四季惊艳发布）' 
date: 2019-02-09 2:30:58
hidden: true
slug: 0q7mbbs55i6b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>初次见面的朋友们大家好，简单自我介绍一下：我是Mono哥，性别男，爱好。。。编程，自从一年多前入了HTML5和WebGL的坑，就再也没有爬出来过，目前正在钻研3D机房以及相关的3D应用。这篇文章是“打造最美3D机房”系列的第四季，感兴趣的朋友可从头开始观看，以下是正确的阅读顺序：</p>
<p><a href="https://segmentfault.com/a/1190000002775741">HTML5，不只是看上去很美 （第一弹：彩虹爆炸图）</a><br><a href="https://segmentfault.com/a/1190000002866653" target="_blank">HTML5，不只是看上去很美（第二弹：打造最美3D机房）</a><br><a href="https://segmentfault.com/a/1190000003711760">打造最美HTML5 3D机房（第二季）</a><br><a href="https://segmentfault.com/a/1190000003863028" target="_blank">打造最美HTML5 3D机房（第三季）</a><br><a href="https://segmentfault.com/a/1190000002920762">HTML5，不只是看上去很美（第三弹：拓扑图分组）</a> </p>
<p>想看视频的同学，可以直接戳优酷链接：<br><div class="video-prev vp_XMTY0MzA3NDc5Ng=="><div class="clearfix video-header"><img class="pull-left" src="https://static.alili.techundefined"><div class="pull-left"><h5>数据中心可视化系统</h5><span class="text-muted">http://v.youku.com/v_show/id_XMTY0MzA3NDc5Ng==.html</span></div></div></div></p>
<p>没想到经过一年多的创作，哥的作品也需要整理时间轴了，怎么想起了端午刚按顺序补完的X战警系列？不过我保证，这篇文章比杀马特天启可强多了，至少也是金刚狼的实力。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006765896" src="https://static.alili.tech/img/remote/1460000006765896" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>------------------------------------------哇哈哈哈，哥是自带BGM的男人------------------------------------------</p>
<h1 id="articleHeader1">叙旧</h1>
<p>啰嗦了一堆，跟再次见面的观众朋友们打个招呼，想说的一切尽在下图中： <br><span class="img-wrap"><img data-src="/img/remote/1460000005699004" src="https://static.alili.tech/img/remote/1460000005699004" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>阔别了半年多，哥其实没闲着，在憋大招来着。期间陆续收到朋友的留言和来信，提了不少特别棒的意见和想法，项目也有了很大的进展，在接下来的文章里，哥会无私和大家分享。</p>
<h1 id="articleHeader2">答一些读者问</h1>
<p>不扯了，进入正题。首先，想说一个最近一直在和大家探讨的问题：HTML5好还是插件好？</p>
<p>无论是在学习还是在做项目的一些朋友都提到了这个问题。尽管web3d技术风起云涌，大体还是分为两大流派：插件派和HTML5派。插件派的技术路线是，在浏览器中安装一个企业自己做的插件，然后在这个插件上提供3D的开发能力。典型代表例如Flash插件、Unity3D插件（简称U3D）。另外一派就是无插件的HTML5路线，它使用H5的WEBGL标准和Canvas技术来实现浏览器中的3D/2D技术，而无需安装插件。</p>
<p>插件的好处是可以适配各种老型号的浏览器（例如老版本的IE），效率应该也会好一点。缺点是，需要安装插件，跨手机平板也麻烦，语言上要使用插件要求的语言。HTML5的好处是不安装插件，效率也很不错，语言简单统一，都是javascript，而且是目前最火的技术方向。</p>
<p>本人相信 “插件必死”的发展趋势。要是不服，就看看Flash，和那些被坑在Flex技术上现在还爬不出来眼看着别人学HTML5拿高薪恨得吐血的程序猿们吧。谁又能保证Unity3D不会有一天变成另外一个Flash呢？看看现在日新月异每天大量涌现的HTML5技术和应用，我们有时间争论插件好还是H5好这样的无聊问题，还不如实实在在地干起来。达成共识后，我们来开始看此次的一大波更新。</p>
<h1 id="articleHeader3">鹰眼</h1>
<p>上次的小机房功能已经基本完成了，客户对演示效果也非常满意。由于客户使用过我们之前做的2D系统，看到过鹰眼功能（也就是缩略图），所以这次毫不犹豫也要求3D机房监控界面增加鹰眼功能。这个把哥难了一阵子。</p>
<p>为了寻找思路，哥首先打开了我们之前做过的2D的拓扑图，寻找灵感。鹰眼看上去是这样子的：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765897" src="https://static.alili.tech/img/remote/1460000006765897" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上面的界面是同事给客户做的虚拟机开通、配置的编辑界面，右下角的这块试图就是鹰眼缩略图。咨询同事，他说鹰眼在2D实现的时候，可以考虑把2D大图做一个内存缩略图更新到鹰眼视图，或在大图发生任何属性变化时候进行监听，然后动态生成缩略图更新鹰眼视图。不过在3D里面会有所不同：弄一个小尺寸的webgl的canvas实时刷新，应该负载也不大。所以决定再new一个network放在右下角试试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var overview = new mono.Overview3D(network);
overview.adjustBounds(200,200);
var rootView = overview.getRootView();
network3d.getRootView().appendChild(rootView);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> overview = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">mono</span>.<span class="hljs-title">Overview3D</span>(network);
<span class="hljs-title">overview</span>.<span class="hljs-title">adjustBounds</span>(<span class="hljs-number">200</span>,<span class="hljs-number">200</span>);
<span class="hljs-title">var</span> <span class="hljs-title">rootView</span> = <span class="hljs-title">overview</span>.<span class="hljs-title">getRootView</span>();
<span class="hljs-title">network3d</span>.<span class="hljs-title">getRootView</span>().<span class="hljs-title">appendChild</span>(rootView);</span></code></pre>
<p>同时，还要把镜头固定到头顶上方垂直向下看，并去掉鼠标的交互机制。经过一番折腾，终于把一个鹰眼画布放在大的场景画布的右下方，看看效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765898" src="https://static.alili.tech/img/remote/1460000006765898" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">设备编辑器</h1>
<p>这次项目中据说有200多种不同的设备，每个设备面板都不一样，要给每一个设备建模，这不是纯体力活吗？就算丢给美工组做，也得耗费好多个人天呢，而且模型的复用性也不高。考虑再三，项目组紧急开发了设备面板的编辑器，很好地解决了这个问题。我试了一下，以做一个标准的机架设备为例，还是很快的：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765899" src="https://static.alili.tech/img/remote/1460000006765899" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>编辑器里面把常见的端口和面板都做好了，拖拖拽拽、对齐吸附，放上logo，很快一个像模像样的交换机就出来了，真是个良心产品！点击按钮导出json，可以直接在项目里面用了。当然，我这边的用法是把设备继续往机柜上放。机架编辑器是我这里开发的，效果差不多，可以直接把设计好的设备拖放到机柜的位置上：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765900" src="https://static.alili.tech/img/remote/1460000006765900" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来，再把机柜往房间里面拖，房间的形状也要编辑的：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765901" src="https://static.alili.tech/img/remote/1460000006765901" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>直接点击3D按钮可以预览一下：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765902" src="https://static.alili.tech/img/remote/1460000006765902" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>对了，这里要注意的是一排机柜一般都会配置一个列头柜，专门控制电路等信息的，双击它会弹出一个电路配置界面：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765903" src="https://static.alili.tech/img/remote/1460000006765903" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>据说这个界面也有编辑器可以直接拖拽生成，这样就更方便了。</p>
<h1 id="articleHeader5">更多场景</h1>
<p>其实对于机柜场景的编辑，模型稍作变化，就可以应付其他行业的应用。</p>
<h2 id="articleHeader6">3D仓库</h2>
<p>例如把机柜变成货架，把服务器变成货物，简单拖拽，会是什么场景呢？可以想象一下。<br><span class="img-wrap"><img data-src="/img/remote/1460000006765904" src="https://static.alili.tech/img/remote/1460000006765904" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">3D工厂</h2>
<p>继续想象，如果把机柜变成生产加工车间的机床，简单拖拽、添加告警信息，又是怎么样一番景象呢？<br><span class="img-wrap"><img data-src="/img/remote/1460000006765905" src="https://static.alili.tech/img/remote/1460000006765905" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006765906" src="https://static.alili.tech/img/remote/1460000006765906" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">3D变电站</h2>
<p>再比如，把场景里面的模型换为变电站里面的变压器、楼房、龙门架等，加上告警和交互，不就是一个户外变电站监控的应用吗？<br><span class="img-wrap"><img data-src="/img/remote/1460000006765907" src="https://static.alili.tech/img/remote/1460000006765907" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">3D加油站</h2>
<p>如果把模型换为加油站，就是一个加油站SCADA和监控的应用：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006765908" src="https://static.alili.tech/img/remote/1460000006765908" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005699013" src="https://static.alili.tech/img/remote/1460000005699013" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">3D工控应用</h2>
<p>当然如果跟硬件连上，就可以做工业上各种检测和控制了：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765909" src="https://static.alili.tech/img/remote/1460000006765909" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当然自动控制应用需要数据采集存储转发云平台组态系统等内容，等以后有机会单独写一篇和大家探讨。</p>
<h1 id="articleHeader11">管线</h1>
<p>机房里有很多物理的或逻辑的链路信息，例如网线、光纤，一些业务上的连接关系等。这些管线要显示在机房中，就需要对管线进行建模、存储、显示。显示的部分，我这里做了简单的空间自动路径，寻找最合适的路线走向，并将A端和Z端设备之外的物体虚化，可以把管线显示的更清晰：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006765910" src="https://static.alili.tech/img/remote/1460000006765910" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>对于跨楼层的链路，也可以清晰的呈现：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765911" src="https://static.alili.tech/img/remote/1460000006765911" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader12">会议室</h1>
<p>根据客户要求，会议室场景也应该建模。经过同事现场拍照考察，会议室结构并不复杂，于是依旧让美工妹妹操刀，很快做完了会议室模型：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006765912" src="https://static.alili.tech/img/remote/1460000006765912" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当然，这里面的场景并不是固定不变的，例如双击投影仪可以让他在投影幕布上播放视频；双击门可以打开，等等。这是因为我们对这里面的模型进行了分拆、动作定义。</p>
<p>例如下面墙上的电视屏幕，双击可以显示机房的统计信息图。<br><span class="img-wrap"><img data-src="/img/remote/1460000006765913" src="https://static.alili.tech/img/remote/1460000006765913" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>继续双击屏幕上的统计图，可以把2D的统计图程序界面直接显示出来，进行交互。<br><span class="img-wrap"><img data-src="/img/remote/1460000006765914" src="https://static.alili.tech/img/remote/1460000006765914" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这也是使用HTML5的2D和3D技术的混合优势。</p>
<h1 id="articleHeader13">园区</h1>
<p>客户要求机房所在的园区也要加到场景中，想一想也合理。项目大了后，机房会分布在好几个楼宇的不同楼层，要查看必须有一个3D全景场景进去才方便。这个难度倒是不大，找美工妹子帮忙。妹子比开发商还快，用了几个小时，一个全新楼盘便在3D Max中诞生了。转obj，导入系统，急忙打开浏览器看效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765915" src="https://static.alili.tech/img/remote/1460000006765915" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里的一个经验是，如果要做到双击大楼能够进去，就要把大楼拆成单独的模型进行加载、监听事件。</p>
<h1 id="articleHeader14">地球</h1>
<p>问题又来了。客户说北京上海全国各地有多处机房，需要统一显示和管理。看来园区已经不够用了，需要一个全国地图。如果过几天客户说美国还有一个机房怎么办？干脆直接整个地球显示吧，一步到位。等客户要求火星有机房的时候再说吧。</p>
<p>弄一个地球用3D太简单方便了，贴图加光晕，分分钟出来：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765916" src="https://static.alili.tech/img/remote/1460000006765916" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来把中国的区域高亮出来，突出我国的地位。这个做法是准备一个透明的中国地图轮廓，如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765917" src="https://static.alili.tech/img/remote/1460000006765917" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>然后把地图作为贴图叠加在地球上，调整位置：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765918" src="https://static.alili.tech/img/remote/1460000006765918" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来做几个数据中心的节点。用一个小小的球就可以吧！<br><span class="img-wrap"><img data-src="/img/remote/1460000006765919" src="https://static.alili.tech/img/remote/1460000006765919" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>为了防止看上去枯燥，把数据中心的连线用流动动画显示，每个数据中心用一个发光的图片动画做成旋转发光效果，看上去就生动多了。</p>
<p>当然我们项目里最后做成的效果是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005699037" src="https://static.alili.tech/img/remote/1460000005699037" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>有没有瞬间高大上的感觉？这还不算完，另外一个同事把我的代码拿过去，又增加了一些乱七八糟的效果，变成了这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006765920" src="https://static.alili.tech/img/remote/1460000006765920" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>主要是增加了一些地理位置的热点，环绕地球的卫星，以及一些弹道导弹的攻击动画效果。据说某国防单位需要这样的显示方法，具体咱就不了解啦，总之有点科幻感了。</p>
<p>说道弹道攻击效果，想起项目中另外一个网络攻击的显示界面，也很有意思，虽然是2D的，但是也有不错的动画效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005699038" src="https://static.alili.tech/img/remote/1460000005699038" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里面的爆炸效果、弹道效果，都用了HTML5的canvas里面2D的一些API绘制，例如模糊、渐变等。综合利用2D+3D来呈现网络攻击，还是非常直观的。还可以把网络攻击的应对流程通过3D化的泳道图显示出来进行分析：<br><span class="img-wrap"><img data-src="/img/remote/1460000006765921" src="https://static.alili.tech/img/remote/1460000006765921" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>至此，一个“从地球到设备端口”的多层次、大型综合3D机房系统就构建成了。怎么样，HTML5的3D技术不是“小玩具”吧？只要认真打造，完全可以支撑各种大型行业应用了。咱们程序猿也不要徘徊等待了，抓紧学习HTML5的2D、3D技术吧！</p>
<p>最后老规矩，觉得图片不过瘾，需要一睹3D机房真容的同学，可以发邮件到<a>tw-service@servasoft.com</a>，索取程序代码，依然真诚欢迎大家各抒已见，共同进步~</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005699042" src="https://static.alili.tech/img/remote/1460000005699042" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
打造最美HTML5 3D机房（MONO哥强势归来，第四季惊艳发布）

## 原文链接
[https://segmentfault.com/a/1190000005699001](https://segmentfault.com/a/1190000005699001)

