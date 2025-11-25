---
title: '优雅的H5下拉刷新【minirefresh】' 
date: 2018-12-21 2:30:11
hidden: true
slug: vxobmapk3bl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">序</h2>
<p>严格的来说，这是我第一个完全投入的开源项目，它的出现是为了统一移动H5中的下拉刷新，想通过一套框架，多主题拓展方式，适应于任意需求下的任意下拉刷新场景。</p>
<p>另外，这个项目作为独立项目存在，希望能有更多的人参与进来！</p>
<p><a href="https://www.npmjs.com/package/minirefresh" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://img.shields.io/npm/v/minirefresh.svg" src="https://static.alili.techhttps://img.shields.io/npm/v/minirefresh.svg" alt="" title="" style="cursor: pointer; display: inline;"></span></a></p>
<p><a href="https://github.com/minirefresh/minirefresh" rel="nofollow noreferrer" target="_blank">【minirefresh】优雅的H5下拉刷新。零依赖，高性能，多主题，易拓展。</a></p>
<h2 id="articleHeader1">特点</h2>
<ul>
<li>零依赖（原生JS实现，不依赖于任何库）</li>
<li>多平台支持。一套代码，多端运行，支持Android，iOS，主流浏览器</li>
<li>丰富的主题，官方提供多种主题（包括默认，applet-仿小程序，drawer3d-3d抽屉效果，taobao-仿淘宝等）</li>
<li>高性能。动画采用css3+硬件加速，在主流手机上流畅运行</li>
<li>良好的兼容性。支持和各种Scroll的嵌套（包括mui-scroll,IScroll,Swipe等），支持Vue环境下的使用</li>
<li>易拓展，三层架构，专门抽取UI层面，方便实现各种的主题，实现一套主题非常方便，而且几乎可以实现任何的效果</li>
<li>优雅的API和源码，API设计科学，简单，源码严谨，所有源码通过<code>ESlint</code>检测</li>
<li>完善的文档与示例，提供完善的showcase，以及文档</li>
</ul>
<h2 id="articleHeader2">源码</h2>
<p><a href="https://github.com/minirefresh/minirefresh" rel="nofollow noreferrer" target="_blank">https://github.com/minirefresh/minirefresh</a></p>
<p><a href="https://www.npmjs.com/package/minirefresh" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/minirefresh</a></p>
<h2 id="articleHeader3">官网与文档</h2>
<p><a href="http://www.minirefresh.com" rel="nofollow noreferrer" target="_blank">http://www.minirefresh.com</a></p>
<p><a href="https://minirefresh.github.io/" rel="nofollow noreferrer" target="_blank">https://minirefresh.github.io/</a></p>
<h2 id="articleHeader4">效果</h2>
<h3 id="articleHeader5">基础示例</h3>
<p><strong>1. 【基础新闻列表】最基本的下拉刷新使用</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-fee5ca8f8124fe91.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-fee5ca8f8124fe91.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2. 【多列表单容器】每次切换菜单时刷新容器</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-36d159d3706af86f.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-36d159d3706af86f.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3. 【多列表多容器】多个列表都有一个Minirefresh对象</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-11747d7447cf25b3.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-11747d7447cf25b3.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>4. 【Vue支持】支持Vue下的使用</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-2ee778ad2af952f2.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-2ee778ad2af952f2.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">嵌套示例</h3>
<p><strong>1. 【Mui-Slider】内部嵌套图片轮播</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-bffde4f572065e37.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-bffde4f572065e37.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>2. 【Mui-Scroll】嵌套在Mui-Scroll中</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-3e2c2da6b10cf719.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-3e2c2da6b10cf719.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>3. 【Swipe】嵌套在Swipe中</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-1afc950419ecf010.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-1afc950419ecf010.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">主题示例</h3>
<p><strong>1. 【applet】仿微信小程序主题</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-d4ebd7f71b558d33.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-d4ebd7f71b558d33.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>2. 【taobao】仿淘宝刷新主题</strong></p>
<p><span class="img-wrap"><img data-src="https://minirefresh.github.io/minirefresh/staticresource/screenshoot/theme_taobao.gif" src="https://static.alili.techhttps://minirefresh.github.io/minirefresh/staticresource/screenshoot/theme_taobao.gif" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>3. 【drawer3d】3D抽屉效果主题</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-50898ed3b337de9e.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-50898ed3b337de9e.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>4. 【drawer-slider】滑动抽屉效果主题</strong></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-5ee5029f9b3277d4.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-5ee5029f9b3277d4.gif?imageMogr2/auto-orient/strip" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">showcase</h2>
<p>可以直接在线体验效果</p>
<p><a href="https://minirefresh.github.io/minirefresh/examples/" rel="nofollow noreferrer" target="_blank">https://minirefresh.github.io/minirefresh/examples/</a></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3437876-f8d5a8830bd98f8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3437876-f8d5a8830bd98f8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">快速开始</h2>
<h3 id="articleHeader10">引入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;xxx/minirefresh.css&quot; />
<script type=&quot;text/javascript&quot; src=&quot;xxx/minirefresh.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"xxx/minirefresh.css"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"xxx/minirefresh.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>或require</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MiniRefreshTools = require('xxx/minirefresh.js');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> MiniRefreshTools = <span class="hljs-built_in">require</span>(<span class="hljs-string">'xxx/minirefresh.js'</span>);</code></pre>
<p><strong>或import</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { MiniRefreshTools } from 'xxx/minirefresh.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { MiniRefreshTools } <span class="hljs-keyword">from</span> <span class="hljs-string">'xxx/minirefresh.js'</span>;</code></pre>
<h3 id="articleHeader11">页面布局</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- minirefresh开头的class请勿修改 -->
<div id=&quot;minirefresh&quot; class=&quot;minirefresh-wrap&quot;>
    <div class=&quot;minirefresh-scroll&quot;>        
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- minirefresh开头的class请勿修改 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"minirefresh"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"minirefresh-wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"minirefresh-scroll"</span>&gt;</span>        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader12">初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
var miniRefresh = new MiniRefresh({
    container: '#minirefresh',
    down: {
        callback: function() {
            // 下拉事件
        }
    },
    up: {

        callback: function() {
            // 上拉事件
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量</span>
<span class="hljs-keyword">var</span> miniRefresh = <span class="hljs-keyword">new</span> MiniRefresh({
    <span class="hljs-attr">container</span>: <span class="hljs-string">'#minirefresh'</span>,
    <span class="hljs-attr">down</span>: {
        <span class="hljs-attr">callback</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 下拉事件</span>
        }
    },
    <span class="hljs-attr">up</span>: {

        <span class="hljs-attr">callback</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 上拉事件</span>
        }
    }
});</code></pre>
<h3 id="articleHeader13">结束刷新</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 结束下拉刷新
miniRefresh.endDownLoading();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 结束下拉刷新</span>
miniRefresh.endDownLoading();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 结束上拉加载
// 参数为true代表没有更多数据，否则接下来可以继续加载
miniRefresh.endUpLoading(true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 结束上拉加载</span>
<span class="hljs-comment">// 参数为true代表没有更多数据，否则接下来可以继续加载</span>
miniRefresh.endUpLoading(<span class="hljs-literal">true</span>);</code></pre>
<h3 id="articleHeader14">更多</h3>
<p>更多的使用请参考官方文档</p>
<h2 id="articleHeader15">贡献</h2>
<p><strong><code>minirefresh</code>需要你!</strong></p>
<p>来为项目添砖加瓦，新的<code>Idea</code>，新的主题，重大Bug发现，新的设计资源（如图标，官网设计等）</p>
<p>都可以通过<code>Issue</code>或<code>PR</code>的方式提交！</p>
<p>更多参考：<a href="https://minirefresh.github.io/minirefresh-doc/site/contribute/howtocontributor.html" rel="nofollow noreferrer" target="_blank">https://minirefresh.github.io/minirefresh-doc/site/contribute/howtocontributor.html</a></p>
<h2 id="articleHeader16">讨论</h2>
<ul>
<li><a href="https://gitter.im/minirefreshjs/minirefresh" rel="nofollow noreferrer" target="_blank">gitter</a></li>
<li>QQ群（<code>601988892</code>）</li>
</ul>
<p><em>注意，申请加入群时请添加验证信息，例如：minirefresh使用遇到问题等等</em></p>
<h2 id="articleHeader17">最后关于灵感与参考</h2>
<p>核心架构是参考的我自己以前的项目 <a href="https://github.com/dailc/pulltorefresh-h5-iscroll" rel="nofollow noreferrer" target="_blank">https://github.com/dailc/pulltorefresh-h5-iscroll</a>，只不过把依赖IScroll换成了原生JS与CSS3实现，并且完全的重构与优化</p>
<p>做这个项目的灵感与原动力是受 <a href="https://github.com/mescroll/mescroll" rel="nofollow noreferrer" target="_blank">https://github.com/mescroll/mescroll</a> 启发，但是由于那个项目里的代码不符合我的个人风格，一些主题拓展也没有达到我的要求，因此我自己重新写了一个项目而不是基于mescroll拓展</p>
<p>还有就是写这个项目也是对自己的一种锻炼，里面包含了</p>
<ul>
<li>JS与CSS3的熟练运用，并进行合理架构</li>
<li>ESlint严格的代码检测</li>
<li>Gulp 自动构建</li>
<li>Karma+Mocha单元测试（待完善）</li>
<li>Circleci，Codecov，Sauce等自动集成与测试网址，</li>
<li>Gitbook构建API与教程文档</li>
<li>Hexo构建官方网站（待完善）</li>
<li>域名备案，CDN加速等（待完善）</li>
<li>Npm发布与Github项目团队</li>
</ul>
<p>当然了，迫于一些原因，没有用全新的ES6或TS写，而是用的ES5严格模式。</p>
<p>另外，这个项目是托管在<code>Github</code>的<code>minirefresh</code>组织上的，希望有更多的人能参与，成为组织的一员，共同维护，毕竟在不断的分享交流中才能进步更快...</p>
<h2 id="articleHeader18">附录</h2>
<h3 id="articleHeader19">博客</h3>
<p>初次发布<code>2016.09.02</code>于我个人博客上面</p>
<p><a href="http://www.dailichun.com/2017/09/02/minirefresh.html" rel="nofollow noreferrer" target="_blank">http://www.dailichun.com/2017/09/02/minirefresh.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
优雅的H5下拉刷新【minirefresh】

## 原文链接
[https://segmentfault.com/a/1190000012482370](https://segmentfault.com/a/1190000012482370)

