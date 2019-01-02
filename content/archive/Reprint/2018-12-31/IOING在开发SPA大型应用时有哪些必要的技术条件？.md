---
title: 'IOING在开发SPA大型应用时有哪些必要的技术条件？' 
date: 2018-12-31 2:30:29
hidden: true
slug: f78234uopxw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>之前公众号《前端早读课》推了我的文章（在这里表示感谢），很多同学有在底下留言，问我 Ionic 和 IOING 是什么关系？从名字来看两者的开头虽然都是 IO 打头但其实两者毫无关系，一丁点儿都没有。</p>
<p>IOING 是一款高性能的前端开发引擎。它为创建一个大型应用提供一整套的完备方案，如页面模块化拆分、层级路由控制、可编程CSS、热拔插组件、双向数据绑定、DOM语法扩展、自动兼容处理等</p>
<p>IOING 的历史大概有5年之久了，一直作为私人项目使用，使用文档也在近期发布的。我在这之前将其中的两个功能点作为推广试水，于是收到了很多朋友的邮件和微信表示对该项目很感兴趣，所以我想 IOING 在用户接受程度上还是蛮高的，于是有了这篇文章来讨论 IOING 的独特之处</p>
<h1 id="articleHeader1">打造 SPA 应用应该具备的技术条件</h1>
<h2 id="articleHeader2">条件一：自有滚动</h2>
<p>作为一款应用应该能和 WEB 体验有明显区分，首先主要体现在布局上，合适的布局至少让应用从外观上看起来就更像是个 App，比如你的 WebApp 应当有 header 和 footer，当然这些技术实现上都比较简单，稍微复杂的例子是多重滚动嵌套视图，比如下面的效果   </p>
<p><span class="img-wrap"><img data-src="/img/bVVjli?w=320&amp;h=560" src="https://static.alili.tech/img/bVVjli?w=320&amp;h=560" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>（示例：1-1）</p>
<p>这个例子中的有三个可滚动区域，一个最外层的父级滚动，另外两个是 tab 页面的子滚动，且子滚动和父级滚动有着事件的交互传递</p>
<p><span class="img-wrap"><img data-src="/img/bVVjnT?w=320&amp;h=560" src="https://static.alili.tech/img/bVVjnT?w=320&amp;h=560" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>（示例：1-2）</p>
<p>对于 1-2 示例就要更复杂一些了，首先最外层是页面滚动，组件父级是一个横向滑动，左右滑动时切换不同选项卡，鼠标上下滑动到底也需要切换卡片，每个卡片内部还有很多的子滚动</p>
<p>这么多层嵌套的滚动效果对于前端开发来说无疑是一个很大的工作量，而我们将其抽象来看的话我们需要什么呢？我们需要一个强大的滚动 API，而这一点需求浏览器恰恰没有提供。我们目可用的滚动除了可怜的 body 滚动外还有部分可以使用 overflow-scrolling:touch 来支持区域滚动的方法，body 滚动只局限在窗口，并且滚动条会覆盖 header 和 footer 非常丑陋，在不同设备上滚动惯性也不一致，效果非常不好，而 overflow-scrolling 除了有兼容问题外自身 API 也基本没有，所以我们只能放弃以上方案，自己造轮子吧。</p>
<p>关于 js滚动库中也存在着很多问题，iscroll.js 就是一个知名的滚动库，我先来简单说一下关于 js滚动库的缺点</p>
<ol>
<li>不当的 CSS 布局可导致其性能急剧下滑</li>
<li>无法通过设置 0s 动画来停止当前 CSS3 动画的兼容问题</li>
<li>内容更新时不能及时更新滚动对象</li>
<li>大数据列表时可导致 GPU 内存不足，从而严重卡顿</li>
<li>Android 中触摸反馈动画掉帧严重</li>
</ol>
<p>嗯、好像问题不少，要解决这写问题要从很多方面思考，这里就不展开详解只简单说一下这里关联到的 IOING 中的另一个神奇：DOM 引擎，通过该引擎能自动化处理很多问题，比如像下面这样创建一个滚动控件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<scroll fullscreen x y>
    <scrolling>
        内容...
    </scrolling>
</scroll>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">scroll</span> <span class="hljs-attr">fullscreen</span> <span class="hljs-attr">x</span> <span class="hljs-attr">y</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">scrolling</span>&gt;</span>
        内容...
    <span class="hljs-tag">&lt;/<span class="hljs-name">scrolling</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">scroll</span>&gt;</span></code></pre>
<p>这样就完成了一个全屏的横竖向滚动控件</p>
<h2 id="articleHeader3">条件二：模块转场与模块控制和沙盒机制</h2>
<p>作为一个 App，功能模块间切换一定是要保持状态的，即每个模块的浏览痕迹不能销毁，比如你在 A列表页进行浏览，这时看到一条吸引你的内容点进去 B内容页，点击的一瞬间会通过一个动画将 A列表页和 B内容页同时进行动画转场，此时两个模块就必须都有自有滚动控件了，当返回时 A列表页应停留在历史位置。滚动控件的问题在上面有解决方案了，除了历史位置问题外，想要完成模块切换还有更多的问题：</p>
<ol>
<li>载入模块越来越多，大家都堆放在同一个 DOM Tree下，必然会带来高耦合，同时一颗庞大的 DOM Tree 也导致了严重的性能问题。这些功能模块的CSS、Js、html 被放置在一起时，将很难避免相互影响，造成难以测试的 bug。</li>
<li>高耦合下模块在卸载时难以卸载干净，余留的全局变量或僵尸事件将一直影响着后续操作</li>
<li>直接访问任何一个路由页面时应当能在返回时返回到程序主屏幕</li>
<li>历史记录应按照应用层级返回，比如访问历史：商品列表页-详情页-订单页-支付页-支付完成页，此时如果用户完成交易后点击返回是不应该再进入订单页和支付页的，而应该直接进去详情页或列表页，所以在路由控制上必须有解决方案</li>
<li>模块与模块间不应能够直接操作，应该有通信规范</li>
<li>模块被缓存时应有生命周期管理，以保证模块正常更新</li>
<li>模块数据资源也应有生命周期管理，以保证数据的正常更新</li>
<li>模块的更新操作应保证旧数据与新数据更替间不出现白屏现象</li>
<li>模块应该有自己的资源管理，数据管理，事件管理，配置管理等方案</li>
<li>模块智能预载方案</li>
<li>模块类型方案：嵌入式模块，系统模块，独立模块</li>
<li>不同类型模块的转场，并提供动画接口</li>
<li>保证动画性能，需要建立动画队列，对所有动画操作进行统一封装</li>
</ol>
<p>以上部分都是当你决定要做模块页面转场时不得不考虑的问题，除了这些主要问题外还有很多细节问题需要考虑，比如动画前指定加载模块如何迅速渲染完毕等等。<br>模块中可对模块配置自定义函数动画，也可以使用内置默认动画，向下面这样的效果</p>
<p><code>animation:'fade'</code></p>
<p><span class="img-wrap"><img data-src="/img/bVVkgh?w=320&amp;h=570" src="https://static.alili.tech/img/bVVkgh?w=320&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>animation:'flip'</code></p>
<p><span class="img-wrap"><img data-src="/img/bVVkhb?w=320&amp;h=568" src="https://static.alili.tech/img/bVVkhb?w=320&amp;h=568" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>animation:'zoom'</code></p>
<p><span class="img-wrap"><img data-src="/img/bVVkhV?w=320&amp;h=570" src="https://static.alili.tech/img/bVVkhV?w=320&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>animation:'slide'</code></p>
<p><span class="img-wrap"><img data-src="/img/bVVkh3?w=320&amp;h=570" src="https://static.alili.tech/img/bVVkh3?w=320&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>对于模块管理方面 IOING 设计了很多方案，比如资源管理方面IOING 通过一个配置文件进行统一管理</p>
<p>(模块配置文件)<br>在模块配置文件中描述了该模块的资源库、类型、事件、级别、运行方式、以及转场动画等，其中<code>sandbox</code>项能让模块在沙盒下运行，即保证模块拥有自己的独立运行空间</p>
<h2 id="articleHeader4">条件三：可拔插组件及组件通信</h2>
<p>其实在 webComponent 技术规范之前我们就已经在使用 web 组件了，最常见的 web 组件就是 input，那我们怎么才能实现一个想 input 这样的组件呢？<br>浏览器需要支持如下特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. Custom elements
2. Template
3. Shadow DOM
4. <script type=&quot;module&quot;>
5. HTML imports" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span> Custom elements
<span class="hljs-number">2.</span> Template
<span class="hljs-number">3.</span> Shadow DOM
<span class="hljs-number">4.</span> &lt;script type=<span class="hljs-string">"module"</span>&gt;
<span class="hljs-number">5.</span> HTML imports</code></pre>
<p>对于这些特性都是需要浏览器自身实现的，而当你不确定你的受众设备是否满足这些条件时你需要找到完美降级方案，比如在 IOING 中使用 <code>&lt;shadow&gt;标签</code> 可以创建一个新的 ShadowDom，以保证新元素不会增加外部高耦合 </p>
<p><span class="img-wrap"><img data-src="/img/bVVkfc?w=1682&amp;h=760" src="https://static.alili.tech/img/bVVkfc?w=1682&amp;h=760" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>(示例 3-1)</p>
<p>该示例是一个组件在浏览器中所呈现的结构</p>
<p>当你在一个或多个模块中引用了多个相同组件时就会涉及一个问题：组件通信。<br>比如你每个组件副本都需要获取一段数据，那么如果每个组件都各自进行获取数据源显然是不正确的，那么此时就需要一个总控来进行做数据管理<br>再来一个例子你有一个开关的组件在多个模块中都被引用到，此时当你关闭了其中一个开关组件，那该数据应同步到所有其他开关组件中</p>
<h2 id="articleHeader5">条件四：可编程CSS及物理像素</h2>
<p>做过手机端 h5 开发的同学都应该有体会，尤其是在 ios 上，1px 总是比预期的要粗，因为这个问题不少前端也被视觉同学吐槽过。<br>那为什么会出现这样的问题呢？这是因为现在的手机分辨率越来越高，如果把 iphone 的 1px 像素点和普通 pc显示器的 1像素点放在一起对比，你会发现 iphone 的1px 要小很多，这个小于标准像素的倍数就是我们常说的<code>devicePixelRatio</code>，既然像素变小了那应该在 iphone 上看同一个页面应该更小才对呀，也正是因为这样问题才催生了<code>viewport</code>。<br><code>viewport</code> 的作用就像是等比拉伸一张图那样，最终图像中 1px 的细节很明显受到影响，失去发髻线效果。因此我们首先要做的就是把<code>viewport</code>特性干掉，而干掉后我们还需要一个新单位来解决适配问题，于是就有了新单位<code>dp</code> dp = density px = devicePixelRatio * px<br>当然有了dp还不够，我们还需要结合vm，vh，vw等来做更多的适配工作，但是并不是所有设备都支持这些单位，所以我们还需要一个 CSS引擎来处理这些问题，比如 calc计算</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    width: calc(50vw - 20dp + 1px)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(50vw - 20dp + 1px)
}</code></pre>
<p>多个单位合并计算的场景在 App设计过程中很常见，如果不能兼容掉将会非常影响开发效率<br>再来一个例子，在你的 App中 header的高度等于 60dp，并且它还有 1px 的边线，因此它在 DPI为 3 的设备下应该等于 181px，在DPI 为 2的设备下等于 121dp，在另一个模块的 CSS中我们希望知道 header 的高度时同样应该有一种机制让模块间共享数据，在 IOING 中就像下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*主模块 CSS文件*/
@global {
    header-height: calc(60dp + 1px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*主模块 CSS文件*/</span>
@<span class="hljs-keyword">global</span> {
    <span class="hljs-selector-tag">header-height</span>: <span class="hljs-selector-tag">calc</span>(60<span class="hljs-selector-tag">dp</span> + 1<span class="hljs-selector-tag">px</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*A模块 CSS文件*/
div {
    top: [header-height];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*A模块 CSS文件*/</span>
<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">top</span>: [header-height];
}</code></pre>
<p>有时候光满足 CSS 内变量代换还不够，我们还要支持 CSS 中引入模块数据源，就像模版语法那样，CSS也应该有自己的逻辑语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@if(device.os.ios) {
    header {
        backdrop-filter: blur(20dp);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">if</span>(<span class="hljs-keyword">device</span>.<span class="hljs-keyword">os</span>.<span class="hljs-keyword">ios</span>) {
    <span class="hljs-selector-tag">header</span> {
        <span class="hljs-attribute">backdrop-filter</span>: <span class="hljs-built_in">blur</span>(20dp);
    }
}</code></pre>
<p>更多用法关注这里<a href="http://ioing.com/#docs-css-scope/" rel="nofollow noreferrer" target="_blank">http://ioing.com/#docs-css-scope/</a></p>
<hr>
<p>华丽分割线</p>
<hr>
<h1 id="articleHeader6">QA</h1>
<h3 id="articleHeader7">IOING 是什么？</h3>
<p>IOING 是一款高性能的前端开发引擎。它为创建一个大型应用提供一整套的完备方案，如页面模块化拆分、层级路由控制、可编程CSS、热拔插组件、双向数据绑定、DOM语法扩展、自动兼容处理等</p>
<h3 id="articleHeader8">IOING 项目还需要 SASS、LESS、Stylus 等吗？</h3>
<p>不需要。IOING 是一个纯前端引擎，所有服务都是前端运行的结果</p>
<h3 id="articleHeader9">IOING 和 React、vue、Angular 的区别在哪里？</h3>
<p>IOING 从容器层解决了很多 web开发难题，目的是为了提供一套完整的 SPA开发方案，而不是解决某几方面的问题。</p>
<h1 id="articleHeader10">结尾</h1>
<p>IOING 的文档目前还不够完善，但完全可以满足必要的开发。对于文档的更新工作我日后会持续，也欢迎对 IOING 该兴趣的同学关注我的公众号或 star我</p>
<p>项目地址：<a href="https://github.com/ioing/IOING" rel="nofollow noreferrer" target="_blank">https://github.com/ioing/IOING</a></p>
<p>公众号请扫：</p>
<p><span class="img-wrap"><img data-src="/img/bVVkYc?w=430&amp;h=430" src="https://static.alili.tech/img/bVVkYc?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IOING在开发SPA大型应用时有哪些必要的技术条件？

## 原文链接
[https://segmentfault.com/a/1190000011243084](https://segmentfault.com/a/1190000011243084)

