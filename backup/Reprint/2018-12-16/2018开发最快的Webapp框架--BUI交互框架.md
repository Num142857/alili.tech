---
title: '2018开发最快的Webapp框架--BUI交互框架' 
date: 2018-12-16 2:30:10
hidden: true
slug: m7p4lja8o5f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、案例代表</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013034396?w=346&amp;h=612" src="https://static.alili.tech/img/remote/1460000013034396?w=346&amp;h=612" alt="点击预览QQ交互效果GIF" title="点击预览QQ交互效果GIF" style="cursor: pointer; display: inline;"></span></p>
<p>这是你看下去的动力, 我用BUI仿照QQ的手机截图做出来的一个demo, 包含QQ的常见交互, <code>侧滑边栏</code>,<code>TAB切换</code>,<code>侧滑列表</code>,<code>下拉刷新</code>,<code>下拉菜单</code>,<code>弹窗搜索</code>等交互操作, 这几种操作很多UI框架都有, 但几种操作结合在一块, 不同方向之间的交互冲突, 不是那么简单的事情. 使用BUI<code>耗时1天</code>. </p>
<p>通过这个看似简单的例子, 使用BUI快速开发出来的应用是可以上得了台面的.<code>在没有设计稿的情况下, 我们可以仿照任何一款APP开发,并且按照APP的相同比例完美还原</code>. 另外一个是在各种复杂的手势操作交互里面, BUI游刃有余.</p>
<p>请使用手机扫码操作看看.  </p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2H4u" src="https://static.alili.techhttps://segmentfault.com/img/bV2H4u" alt="QQ演示地址" title="QQ演示地址" style="cursor: pointer;"></span></p>
<p><code>建议扫码在手机预览, PC预览不支持手势操作.</code></p>
<p><a href="http://www.easybui.com/case/preview.html?url=/case/source/qq/demo/" rel="nofollow noreferrer" target="_blank">点击PC预览Demo</a></p>
<p><a href="http://www.easybui.com/demo/" rel="nofollow noreferrer" target="_blank">BUI控件demo</a></p>
<h2 id="articleHeader1">二、前言</h2>
<p>今天的主角就是BUI交互框架, 又不仅仅只是框架, 这是一整套<code>快速开发Webapp的解决方案</code>. 请查看<a href="http://www.easybui.com/" rel="nofollow noreferrer" target="_blank">BUI官网</a>, 里面有DEMO演示, 给你最直观的感受. </p>
<p>如果你也跟我一样在寻找一款快速开发的Webapp框架, 相信我,你来对地方了. 欢迎加入BUI 移动开发交流群: <code>691560280</code>满 <br>BUI 移动开发交流群2: <code>4170980</code>新</p>
<p>我自己从2011年开始接触移动混合app开发至今, 开发的应用也有几十个了, 这些经验可能对别人也会有所帮助. 于是我把它整理出来, 围绕着快速开发,BUI做了很多事情, 看完你就会明白, BUI的快是有意义的.</p>
<h3 id="articleHeader2">面向的开发者</h3>
<ul>
<li>混合App开发者</li>
<li>后端开发者</li>
<li>前端</li>
<li>美工</li>
</ul>
<h3 id="articleHeader3">我对框架的要求</h3>
<p>我找过很多框架, 对框架有一些要求:</p>
<ol>
<li>简单学习上手快;</li>
<li>能够轻松定制UI;</li>
<li>开发一次,跨平台全适配,什么安卓,IOS,微信,淘宝,支付宝,钉钉,浏览器等等;</li>
<li>控件要多,至少满足平常所需;</li>
<li>能结合第三方打包平台,打包成独立应用;</li>
<li>有案例或者模板可以参考;</li>
<li>支持物理按键后退;</li>
<li>支持后退刷新;</li>
<li>支持后退到指定页面带动画;</li>
<li>模块化开发;</li>
<li>反应速度快;</li>
</ol>
<p>...</p>
<p>这样的要求不过分吧? <br>但发现每个UI框架都有自己的定位, 跟我要的还不太一样, 于是我们只能自己造轮子.<br>既然自己造轮子,那就要先做最适合自己的,然后才是适合别人. 这里有必要交待一下背景.</p>
<h2 id="articleHeader4">三、背景</h2>
<p>早在2011年, 品高公司就开始接触移动互联网, 并有了第一个基于Cordova的混合app开发框架及打包平台--Bingotouch (那个时候除了Appcan,没有像Dcloud,APICloud等比较成熟的平台) ,为了配合Bingotouch开发框架, 我们需要有一个UI, 于是我们有了一个简单的UI, 那时只有一些简单的基础控件, 简单的适配(可以在打包自适应,但无法在浏览器预览),  页面切换传参使用原生的切换, 其它复杂点的就用第三方的插件, 下拉刷新就用iscroll, 投入到项目开发中就没去管UI了, 一晃就4年过去了, 简直就是奇迹.</p>
<p>但随着混合应用的技术推广及系统的升级,手机屏幕越来越大,我们的UI存在的一些不足,我们意识到,我们的UI必须升级了. 经过4年的移动开发项目经验沉淀, 于是2015年底我们就开始着手UI的改造.</p>
<h2 id="articleHeader5">四、移动开发的难点</h2>
<p>这里顺便交待一下我们的旧UI存在的问题吧.</p>
<h3 id="articleHeader6"><strong>1.viewport问题</strong></h3>
<p>旧UI采用viewport固定宽度的方式适应, 把设计稿更改成320大小, 然后我们按这个大小量取间隙,还原设计稿, 这样会导致在浏览器整个页面变大, 之前不考虑浏览器,所以问题还不大, 但随着viewport在不同手机设备的表现, 这种方式瓶颈越来越大, if else 越来越多.</p>
<h3 id="articleHeader7"><strong>2.UI组件少</strong></h3>
<p>早期的时候,基于zepto的控件还要适应移动端, 是少之又少, 所以我们经常需要上网找或者自己写控件, 这样就造成每个控件的使用方式不一, 兼容不一, 较难上手.</p>
<h3 id="articleHeader8"><strong>3.不同平台需要多次开发</strong></h3>
<p>由于页面切换是使用原生切换,这样体验较好, 但是也带来一个问题,跟框架结合过于紧密, 有些项目需求, 开发以后,客户要求在微信上线, 这样就得开发2次, 如果还要在其它平台呢? 不敢想象.</p>
<p>... </p>
<p>正是因为有了这些问题, 才让我们的新BUI适应性越来越强.</p>
<h2 id="articleHeader9">五、设计思路</h2>
<blockquote>很多看完文档不太理解BUI的更多是Native模块, 这里是我们区别于其它webapp开发框架的地方, BUI的一个控件或者一个方法不止做一件事情. 我们这里主要分析一下Native模块的设计.</blockquote>
<p>前面谈到我们的页面切换传参是用的原生切换, 在安卓2.多的系统,如果使用location.href跳转会泛白,单页在不同安卓下的表现也不尽完美, 所以我们这里采用的原生, 而原生在web浏览器是不能运行的. 于是我们想采用一种兼容的方式, 像混合应用一样, 中间做一层转换, 这样就可以各取所需, 需要web时, 整体切换成web.</p>
<blockquote>Method &lt;- web &lt;- <strong>BUI</strong> -&gt; Bingotouch -&gt; Native</blockquote>
<h3 id="articleHeader10">1. 思路1</h3>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2DMi" src="https://static.alili.techhttps://segmentfault.com/img/bV2DMi" alt="BUI设计思路1" title="BUI设计思路1" style="cursor: pointer;"></span></p>
<blockquote>思路解析: bui 通过 bui.isWebapp (旧版是<del>bui.debug</del>) 来选择是web,或者native, 所有native模块需要在 bui.ready 里面去初始化, 就这样,我们把Bingotouch 里面常用的交互, 页面跳转, 传参, 刷新, 回退, 请求, 上传, 下载 等常用的功能模块做了封装统一API, 每个native模块的方法都对应两个不同的方法, 这样在使用过程,用户不需要关注是原生还是web, 只需要知道,我在浏览器运行, 就设置 <code>bui.isWebapp</code> 为true, 需要打包, 就用 <code>bui.isWebapp</code> 为false;</blockquote>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2DMJ" src="https://static.alili.techhttps://segmentfault.com/img/bV2DMJ" alt="BUI设计思路2" title="BUI设计思路2" style="cursor: pointer;"></span></p>
<blockquote>以上就是我们的BUI 为我们公司的Bingotouch而实现的一套UI思路, 细心的你可能会发现, Bingotouch 跟互联网上的第三方平台很像, 没错的, 但是我们出来比较早. 这点我觉得很引以为豪. 所以看下那个设计思路, 我们也是为了扩展到第三方平台预留了接口. 于是我们有了不同版本的 bui.js .</blockquote>
<h3 id="articleHeader11">2. 思路2</h3>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2GgS" src="https://static.alili.techhttps://segmentfault.com/img/bV2GgS" alt="BUI设计思路3" title="BUI设计思路3" style="cursor: pointer;"></span></p>
<p><strong>场景1: 客户指定要使用第三方平台打包;</strong></p>
<p>我们的Bingotouch就派不上用场,即使我们很优秀, 但是客户不放心, 用第三方平台后面可以不依赖于某一家公司, 可以很容易找到其他开发者, 客户的担心也不无道理.</p>
<p>第三方平台的出现方便了开发者,但也带来了新的难题, 一个第三方平台,会有自己的开发生态, 工具, API, UI, 开发者要学习的东西太多. </p>
<p>于是我们BUI又可以派上用场了, 我们还是用我们熟悉的方式开发, 只是特殊部分原生接口,使用第三方的就可以了, 这样你只需要学习一次BUI,就能开发其它平台,使用其它平台的部分原生接口,想想是很美好的事情. 后面发现每个平台的上传,下载,文件处理等的方式都不同, 处理起来很耗费时间, 针对第三方平台我们精简了部分Native方法, 只保留了 页面加载,传参,后退,请求,刷新这些.</p>
<p>这样, 客户不管指定哪个平台,都可以使用我们的UI来做开发交互, 开发人员都不用再学习新的UI, 能减少一点是一点啊.</p>
<h2 id="articleHeader12">六、框架特点</h2>
<p>围绕这个想法去设计, 再分析了互联网上的一些UI的特点, 我们的框架应该是这样子的:<br>介于webapp跟混合app开发之间, 大部分应用有80%以上的功能都是由UI实现的, 这样通过学习一次BUI, 你就可以游刃于不同平台之间. </p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2LRr" src="https://static.alili.techhttps://segmentfault.com/img/bV2LRr" alt="BUI成本优势" title="BUI成本优势" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">1. 简单学习,快速上手</h3>
<p>在软件公司里面, 开发者占多数以及人员的流动等因素, 如果开发者愿意去学习使用, 可以解决招不到合适的前端问题. 所以学习要快,简单.</p>
<h4><strong>技术选型</strong></h4>
<p>我们在技术上没有依赖于vue,react等先进理念, 我们就是要简单, Dom是最基础也是最容易理解的, 所以我们基于zepto或者jquery.</p>
<h4><strong>工具</strong></h4>
<p>开发者习惯用什么工具,就用什么工具.习惯用什么 webpack,gulp,sass,less 完全由自己做主. 但是如果使用我们推荐的sublimetext工具, 我们有针对这个工具的一个插件, 可以快速书写,事半功倍.</p>
<h4><strong>丰富的文档及入门视频</strong></h4>
<p><a href="http://www.easybui.com/docs/" rel="nofollow noreferrer" target="_blank">BUI的入门文档</a>只需要5分钟 <br><a href="http://www.easybui.com/docs/?id=api" rel="nofollow noreferrer" target="_blank">BUI的控件API文档</a> <br><a href="http://www.easybui.com/docs/?id=doc" rel="nofollow noreferrer" target="_blank">BUI的规范文档</a><br><a href="http://www.easybui.com/docs/?id=faq" rel="nofollow noreferrer" target="_blank">BUI的FAQ</a></p>
<h3 id="articleHeader14">2. 多终端多平台适配</h3>
<p>我们采用独有的规范,使用REM适配,开发出来的页面,能够在各种安卓IOS系统,webkit浏览器(淘宝,微信,QQ,钉钉),第三方打包平台(Dcloud,APICloud,APPCan等) 不同分辨率,保持一致的缩放效果. 跟web保持一致的切图习惯,只是在做单位转换的时候, 是基于<code>540px设计稿</code>,<code>1rem=100px</code>; <br>这是很多UI欠缺的, 给你一个设计稿,没有什么指引告诉你图要怎么切, 大部分是采用响应式自适应出来的效果, 看上去一样,实际效果是跟效果图有出入的. </p>
<p>如图, 其它UI的适配的高度是固定的, 随着屏幕增高, 底部的空白会越来越多, 而BUI是整体等比缩放, 像一张大图缩放到合适的屏幕一样. 真正是一次开发,多平台适配.</p>
<blockquote>其它UI的适配:</blockquote>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2EPH" src="https://static.alili.techhttps://segmentfault.com/img/bV2EPH" alt="其它UI的适配" title="其它UI的适配" style="cursor: pointer;"></span></p>
<blockquote>BUI的适配:</blockquote>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2EPM" src="https://static.alili.techhttps://segmentfault.com/img/bV2EPM" alt="BUI的适配" title="BUI的适配" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">3. 丰富的交互组件</h3>
<p><a href="http://www.easybui.com/demo/" rel="nofollow noreferrer" target="_blank">BUI控件演示Demo</a></p>
<p>前面我们也说过,旧UI我们需要经常找插件,找来的插件也不一定能用, 调用系统原生的交互,在安卓跟ios会有不同的表现, 为了避免这种情况, 我们把互联网上常见的插件都统一开发出来, <code>一致的交互, 一致的使用方式, 一致的API</code>.</p>
<p>BUI的组件还有些不太一样的地方, 我们关注控件的交互,<code>主张相同交互由同一个控件实现</code>. 我们的组件是内容跟结构交互分离, 一个组件可以做多件事情, 例如: </p>
<p>bui.slide 是一个焦点图组件, 它除了自身支持, 横向,纵向,全屏,自动播放等功能以外, 我们稍微改变了参数, 它就变成了 tab 组件. </p>
<p><code>**(这里不能直接上传gif交互图,我把重要的交互展示一下,想看更多交互请直接点击预览交互效果)**</code></p>
<h4>bui.slide 焦点图控件</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000831?w=320&amp;h=568" src="https://static.alili.tech/img/remote/1460000013000831?w=320&amp;h=568" alt="预览交互效果" title="预览交互效果" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="js:
var uiSlide = bui.slide({
    id:&quot;#uiSlide&quot;,
    height:200
})
html:
<div id=&quot;uiSlide&quot; class=&quot;bui-slide&quot;>
    <div class=&quot;bui-slide-main&quot;>
        <ul>
            <li>
                <!--第1屏-->
                <img src=&quot;&quot; alt=&quot;&quot;>
                <div class=&quot;bui-slide-title&quot;>图片标题</div>
            </li>
        </ul>
    </div>
    <!-- 分屏菜单 -->
    <div class=&quot;bui-slide-head&quot;>
        <ul >
            <li>1</li>
        </ul>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>js:
<span class="hljs-keyword">var</span> uiSlide = bui.slide({
    <span class="hljs-attr">id</span>:<span class="hljs-string">"#uiSlide"</span>,
    <span class="hljs-attr">height</span>:<span class="hljs-number">200</span>
})
html:
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"uiSlide"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-slide-main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-comment">&lt;!--第1屏--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-slide-title"</span>&gt;</span>图片标题<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 分屏菜单 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-slide-head"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h4>TAB 选项卡</h4>
<p><strong>TAB初始化</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="js: 
var uiSlideTab = bui.slide({
    id:&quot;#uiSlideTab&quot;,
    menu:&quot;.bui-nav&quot;,
    children:&quot;.bui-tab-main ul&quot;,
    scroll: true
})
html:
<div id=&quot;uiSlide&quot; class=&quot;bui-tab&quot;>
    <div class=&quot;bui-tab-head&quot;>
        <ul class=&quot;bui-nav&quot;>
            <!-- 分屏菜单 active 是激活的TAB样式 -->
            <li class=&quot;bui-btn active&quot;>Tab1</li>
        </ul>
    </div>
    <div class=&quot;bui-tab-main&quot;>
        <ul>
            <li>
                第1屏
            </li>
        </ul>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>js: 
<span class="hljs-keyword">var</span> uiSlideTab = bui.slide({
    <span class="hljs-attr">id</span>:<span class="hljs-string">"#uiSlideTab"</span>,
    <span class="hljs-attr">menu</span>:<span class="hljs-string">".bui-nav"</span>,
    <span class="hljs-attr">children</span>:<span class="hljs-string">".bui-tab-main ul"</span>,
    <span class="hljs-attr">scroll</span>: <span class="hljs-literal">true</span>
})
html:
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"uiSlide"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-tab"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-tab-head"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-nav"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 分屏菜单 active 是激活的TAB样式 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-btn active"</span>&gt;</span>Tab1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bui-tab-main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                第1屏
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>仔细观察下这两个的结构及交互,变的只是父层的样式, 其它结构及操作都是一样的. 我们把TAB的结构再拆分一下, 就变成了 TAB在顶部以及在底部的效果.</p>
<p><strong>TAB在顶部</strong></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2FfK" src="https://static.alili.techhttps://segmentfault.com/img/bV2FfK" alt="TAB在顶部" title="TAB在顶部" style="cursor: pointer;"></span></p>
<p><strong>TAB在底部</strong></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2Ff6" src="https://static.alili.techhttps://segmentfault.com/img/bV2Ff6" alt="TAB在底部" title="TAB在底部" style="cursor: pointer;"></span></p>
<p><strong>TAB在侧边</strong></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2Fgd" src="https://static.alili.techhttps://segmentfault.com/img/bV2Fgd" alt="TAB在侧边" title="TAB在侧边" style="cursor: pointer;"></span></p>
<p>这样是方便了,但是要记住的参数很多,怎么破? 这就要谈到我们的BUI Fast插件了, 一个快速书写的 Sublimetext插件, 这个后面篇幅再介绍. 我们把比较重要的组件给大家介绍一下.</p>
<p>还有什么是bui.slide能做的? 例如: 微信里面的推广,经常是整屏往上滑动, 我还用过 bui.slide 去拓展了一个简单的有动画效果的路由. 发挥你的想象前, 先仔细了解控件的特性.  后面我们有自己更简单的单页路由.</p>
<h4>bui.list 下拉刷新及上拉加载控件</h4>
<p>bui.list是基于 bui.scroll 扩展的一个加载分页及刷新的一个控件, 默认把分页都处理好了,你只需要配置一个数据请求的地址, 能返回一个数组就行了, 如果返回的字段不一样, 也是提供了字段映射的配置, 开发一个加载及下拉刷新功能的列表, 只要5分钟. 如果这个满足不了你的需求, 你可以再看 bui.scroll 及 bui.pullrefresh 这两个控件.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000832?w=320&amp;h=568" src="https://static.alili.tech/img/remote/1460000013000832?w=320&amp;h=568" alt="预览交互效果12" title="预览交互效果12" style="cursor: pointer;"></span></p>
<h4>bui.dialog 弹出层组件</h4>
<p>bui.dialog 弹出层插件同样是一个扩展性特别强的插件, 支持从不同方向进入, 支持关闭打开, 支持全屏等, 支持动态创建以及静态渲染,<br>这两者的区别 例如,</p>
<blockquote>
<strong>动态渲染</strong><br>bui.confirm, bui.alert, bui.prompt 都是基于dialog动态创建的控件, 这种方式简单,只需要传入content参数;<br><strong>静态渲染</strong><br>还有bui.select,bui.actionsheet, bui.pickerdate 等控件. select及actionsheet 的底层都是一个静态渲染的对话框, 这样有个好处就是, 对话框的内容都自由定义.</blockquote>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2E53" src="https://static.alili.techhttps://segmentfault.com/img/bV2E53" alt="bui.dialog" title="bui.dialog" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-dialog_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果GIF</a></p>
<h4>bui.select 选择控件</h4>
<p>选择控件,支持单选,多选, 支持弹窗或者不弹窗, 支持静态或者动态渲染.</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2E6S" src="https://static.alili.techhttps://segmentfault.com/img/bV2E6S" alt="bui.select" title="bui.select" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-select_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果GIF</a></p>
<h4>bui.actionsheet 上拉菜单控件</h4>
<p>上拉菜单控件, 常用于分享</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2E5g" src="https://static.alili.techhttps://segmentfault.com/img/bV2E5g" alt="bui.actionsheet" title="bui.actionsheet" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-actionsheet_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果</a></p>
<h4>bui.swipe 滑动组件</h4>
<p>bui.swipe 也是很强大的一个控件, 解决同一个页面的各种手势操作冲突. 像 bui.sidebar ,bui.listview 都是基于bui.swipe扩展的插件. </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000833?w=320&amp;h=568" src="https://static.alili.tech/img/remote/1460000013000833?w=320&amp;h=568" alt="预览交互效果16" title="预览交互效果16" style="cursor: pointer;"></span></p>
<h4>bui.sidebar 侧边栏组件</h4>
<p>支持左边跟右边,支持同时, 但还是建议同一个页面不要出现太多这类交互. </p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2E5D" src="https://static.alili.techhttps://segmentfault.com/img/bV2E5D" alt="bui.sidebar" title="bui.sidebar" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-sidebar_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果GIF</a></p>
<h4>bui.listview 侧滑列表组件</h4>
<p>侧滑列表控件,支持菜单在左边或者右边</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000834?w=320&amp;h=568" src="https://static.alili.tech/img/remote/1460000013000834?w=320&amp;h=568" alt="预览交互效果18" title="预览交互效果18" style="cursor: pointer;"></span></p>
<h4>bui.hint 自动消失提醒组件</h4>
<p>消息提醒自动消失, 支持上中下等方向, 并且支持自动关闭或者手动关闭, 可以指定在某个容器内.</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2E7a" src="https://static.alili.techhttps://segmentfault.com/img/bV2E7a" alt="bui.hint" title="bui.hint" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-hint_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果GIF</a></p>
<h4>bui.accordion 折叠组件</h4>
<p>折叠菜单, 显示隐藏, 支持全部显示,或者一次只能显示一个.</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2E5a" src="https://static.alili.techhttps://segmentfault.com/img/bV2E5a" alt="bui.accordion" title="bui.accordion" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-accordion_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果GIF</a></p>
<h4>bui.dropdown 下拉菜单组件</h4>
<p>下拉菜单, 常用于搜索旁边的选择, 选项不宜过多.</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2FvI" src="https://static.alili.techhttps://segmentfault.com/img/bV2FvI" alt="bui.dropdown" title="bui.dropdown" style="cursor: pointer;"></span></p>
<p><a href="http://www.easybui.com/static/images/controls/bui-dropdown_low.gif" rel="nofollow noreferrer" target="_blank">预览交互效果GIF</a></p>
<p>这些都是基本的组件, <a href="http://www.easybui.com/" rel="nofollow noreferrer" target="_blank">BUI官网</a>其实还有很多, 就不一一列举了.</p>
<h3 id="articleHeader16">4. 轻松定制UI</h3>
<p>BUI是有规范可循的,这个在输出设计稿的时候,尤其有用. 而且BUI更多的是关注UI交互这块, 只要遵循BUI的结构规范, 里面的内容是可以自由定制的, UI也是随你怎么修改,只要ID不变, 交互就不变.</p>
<h3 id="articleHeader17">5. 快速开发</h3>
<p><code>重头戏来了, 前面这些都只是铺垫</code>, 只有简单的文档, 丰富的组件, 这些每个框架都有, 不能算快. <br>我们围绕着开发人员快速开发, 做了很多事情, 让你如虎添翼.</p>
<h4>5.1 <a href="http://www.easybui.com/docs/?id=buifast" rel="nofollow noreferrer" target="_blank">BUIFast插件</a>
</h4>
<p>BUIFast 是Sublimetext的一个插件, 前面我们也说了,我们并不要求用户使用某个工具, 但如果用户使用我们推荐的工具, 那就是如虎添翼. Sublimetext是一个优秀的编辑器. 安装好BUIFast插件以后, 你可以使用BUI的快速书写. </p>
<p>规则如下: <br>ui- 生成结构, bui- 生成脚本</p>
<p>ui-html 生成BUI的标准引用<br>ui-page 生成BUI标准结构页面</p>
<p>ui-控件名 生成 控件的结构;<br>bui-控件名 生成 控件的初始化; <br>两个前呼后应.</p>
<p>后面我们新增了 bu-控件名-demo 直接生成示例代码. 所以前面说的, 你根本不需要去记住结构,你只需要记住有什么控件名. 比方 bui-slide-tab</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000835?w=1024&amp;h=600" src="https://static.alili.tech/img/remote/1460000013000835?w=1024&amp;h=600" alt="点击预览效果22" title="点击预览效果22" style="cursor: pointer;"></span></p>
<h4>5.2 <a href="https://github.com/imouou/buijs-cli" rel="nofollow noreferrer" target="_blank">buijs Node命令行工具</a>
</h4>
<p>全局安装buijs以后,每次创建如果有新版本都会从github获取, 可以在任意地方创建, 并且可以指定模板及打包平台. </p>
<p><strong>安装</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo npm install -g buijs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">sudo npm <span class="hljs-keyword">install</span> -g buijs</code></pre>
<p><strong>简单创建工程包(默认webapp平台)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="buijs create demo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">buijs </span>create demo</code></pre>
<p><strong>指定模板</strong> <br>同一个工程可以重复新增模板, main- 开头会覆盖main 模块, page-开头是新增模块. <a href="https://github.com/imouou/BUI-Template/" rel="nofollow noreferrer" target="_blank">点击查看更多模板预览</a>  部分模板我们还增加了常用的交互处理, 比如登录输入框的删除, 注册发送验证码的倒计时, 如果不需要可以自行删除.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="buijs create demo -t main-tab" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;">buijs <span class="hljs-keyword">create</span> demo -t main-<span class="hljs-built_in">tab</span></code></pre>
<p><strong>指定dcloud平台</strong><br>指定平台以后,创建的工程可以直接覆盖到平台新创建的应用目录, 默认bui绑定了物理后退按键的处理.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="buijs create demo -p dcloud" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">buijs create demo -<span class="hljs-selector-tag">p</span> dcloud</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000836?w=776&amp;h=432" src="https://static.alili.tech/img/remote/1460000013000836?w=776&amp;h=432" alt="点击预览效果23" title="点击预览效果23" style="cursor: pointer;"></span></p>
<h4>5.3 <a href="https://github.com/imouou/BUI-Template/" rel="nofollow noreferrer" target="_blank">模板库</a>
</h4>
<p>模板库有2个,一个是配合buijs工具创建的, 但由于每次创建都会获取最新,如果太多模板,这里创建工程就会偏慢, 所以我们只把常用的模板放github上面, 我们还有一个<a href="http://www.easybui.com/scenes/" rel="nofollow noreferrer" target="_blank">新模板库</a>, 那里下载下来每个都是 CSS,js,html 一起的. </p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2HZP" src="https://static.alili.techhttps://segmentfault.com/img/bV2HZP" alt="模板库" title="模板库" style="cursor: pointer; display: inline;"></span></p>
<h4>5.4 <a href="http://www.easybui.com/plugins/" rel="nofollow noreferrer" target="_blank">插件库</a>
</h4>
<p>bui的官方组件只是一些基本的组件, 后续还会扩展.</p>
<h4>5.5 <a href="http://www.easybui.com/case/preview.html?url=/case/source/qq/demo/" rel="nofollow noreferrer" target="_blank">案例库</a>
</h4>
<p>除了插件,模板,官网还提供了一个案例库, 这个案例是一些通用的例子, 下载下来就能拿去开发. <br>这里比较有代表性的一个案例是仿照QQ的一个交互, 交互复杂,但开发起来我们只耗时1天. </p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2FQf" src="https://static.alili.techhttps://segmentfault.com/img/bV2FQf" alt="BUI代表案例QQ" title="BUI代表案例QQ" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.easybui.com/case/preview.html?url=/case/source/qq/demo/" rel="nofollow noreferrer" target="_blank">点击预览</a><br>建议扫码在手机预览, PC预览不支持手势操作.</p>
<h2 id="articleHeader18">七、设计思路改进</h2>
<h3 id="articleHeader19">1. 去平台化</h3>
<p>从BUI出来诞生到现在, 在品高内部已经两年了, 服务了近百个项目, 其中也暴露出来了一些问题.</p>
<p>1.第三方打包平台如雨后春笋般增长, 我们的兼容何时才休?</p>
<blockquote>用户在做开发的时候,一开始选择了平台其实也不会再转换其它平台了, 虽然我们提供了这种可能, 对于用户来说, 在webapp及打包平台间切换用场会比 APICloud 平台转换到 Dcloud平台之类的场景要多得多, 所以我们目前只兼容 Bingotouch, APICloud, Dcloud 有对应的 bui.js , 其它平台暂时不考虑.</blockquote>
<p>2.由于我们基于DOM开发,入门门槛低,带来的问题是开发过程中的代码质量无法保证;<br>3.每个人喜欢用的模块化不一样, 有人喜欢用requirejs, 有人喜欢用seajs, 同样的模块不能在项目之间共享;</p>
<h3 id="articleHeader20">2. 单页路由</h3>
<p>在用第三方平台的原生跳转里面, 也有一定的局限性, 比方, 后退刷新, 后退多层到指定页面 等, 这些每个平台的处理都不一样, 而且有的都不允许这么处理. 我们需要更灵活的路由, 支持效果自定义, 支持后退刷新, 支持后退到指定页面, 支持物理后退 等, 这一切创建对应工程包的时候, 你就已经拥有.</p>
<h4>路由效果</h4>
<p>这里我们默认采用的是微信的切换效果, 你还可以选择其它交互, 例如 dcloud 的 cover, QQ 的slide 切换效果, 这些效果都是为了让你的应用更好的嵌入对应的平台. 这种特别在原生跟轻应用之间切换较为常用. </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013000977?w=320&amp;h=568" src="https://static.alili.tech/img/remote/1460000013000977?w=320&amp;h=568" alt="预览交互效果26" title="预览交互效果26" style="cursor: pointer;"></span></p>
<h3 id="articleHeader21">3. 模块化</h3>
<p>我们使用我们自己的模块化,跟路由一起配合使用, 开发的模块在项目之间的共享成为了可能, 我们还按照requirejs,seajs 的接口设置, 可以兼容之前的模块.</p>
<h3 id="articleHeader22">4. 路由及模块化的原理</h3>
<p>当你打开index.html的时候,就会自动加载main模块, 模块的命名, 除了main, 其它匿名模块默认都是.html前面的路径名, 比方: main 模块有个按钮, 按钮有个链接(注意不能使用a标签)</p>
<p><strong>main模块</strong>, 路径: pages/main/main.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bui-btn&quot; href=&quot;pages/sidebar/sidebar.html&quot;>跳转到sidebar</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bui-btn"</span> href=<span class="hljs-string">"pages/sidebar/sidebar.html"</span>&gt;跳转到sidebar&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>点击会自动跳转到 <code>pages/sidebar/sidebar.html</code> , 这时会自动加载 <code>pages/sidebar/sidebar.js</code> </p>
<p><strong>sidebar.js </strong> 路径: pages/sidebar/sidebar.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader.define(function(require,exports,module){
    
    module.exports = {};
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>loader.define(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(require,exports,module)</span>{</span>
    
    <span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {};
})</code></pre>
<p>这样, 如果其它页面要调用sidebar的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader.require(&quot;pages/sidebar/sidebar&quot;,function(sidebar){
   //  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>loader.<span class="hljs-keyword">require</span>(<span class="hljs-string">"pages/sidebar/sidebar"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(sidebar)</span></span>{
   <span class="hljs-comment">//  </span>
})</code></pre>
<p>这是路由最简单的用法, 当然他还有很多其它定义, 具体需要自己查看API了.</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV2F6k" src="https://static.alili.techhttps://segmentfault.com/img/bV2F6k" alt="路由" title="路由" style="cursor: pointer;"></span></p>
<h2 id="articleHeader23">八、总结</h2>
<p>与其说bui是一个交互框架,我觉得我们更像是一个<code>移动快速开发解决方案</code>, 围绕开发过程中的效率,一点一点的进步优化, 我们也针对了常用的平台的快速创建工程包, 创建完覆盖到对应的平台应用包里面就能使用了, 是不是开发最快的webapp框架? 我希望是, 但我更希望整理的这些内容对别人有所帮助. </p>
<p><code>BUI的目的不是要成为一个很优秀的框架, 而是可以帮助大家解决80%问题的框架.</code></p>
<p>一个人快, 节省的只是一个项目的时间, 如果每个人都能开发更快, 节省的是N个项目的时间. 后面我们会在 segmentfault的 <a href="https://segmentfault.com/blog/easybui">BUI的专栏</a> 里,把一些常用的技巧,及使用上的FAQ整理一下, 欢迎一起理性探讨.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2018开发最快的Webapp框架--BUI交互框架

## 原文链接
[https://segmentfault.com/a/1190000012994082](https://segmentfault.com/a/1190000012994082)

