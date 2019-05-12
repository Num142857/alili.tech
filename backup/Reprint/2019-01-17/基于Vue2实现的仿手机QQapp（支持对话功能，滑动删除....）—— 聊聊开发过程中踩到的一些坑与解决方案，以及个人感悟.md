---
title: '基于Vue2实现的仿手机QQapp（支持对话功能，滑动删除....）—— 聊聊开发过程中踩到的一些坑与解决方案，以及个人感悟' 
date: 2019-01-17 2:30:25
hidden: true
slug: m6yid1tdcxs
categories: [reprint]
---

{{< raw >}}

                    
<p>使用Vue2进行的仿手机QQ的webapp的制作，在ui上，参考了设计师kaokao的作品，作品由个人独立开发，源码中进行了详细的注释。 由于自己也是初学Vue2，所以注释写的不够精简，请见谅。</p>
<p><strong>目前已实现：</strong> 整体数据的流动，接入聊天机器人，信息左滑删除，个人信息侧边栏, 搜索好友功能.....</p>
<p><strong>项目地址：</strong> <a href="https://github.com/jiangqizheng/vue-MiniQQ" rel="nofollow noreferrer" target="_blank">https://github.com/jiangqizhe...</a></p>
<h2 id="articleHeader0">动态图预览</h2>
<p><strong>侧边栏与个人主页</strong><br><span class="img-wrap"><img data-src="/img/bVLh9z?w=375&amp;h=666" src="https://static.alili.tech/img/bVLh9z?w=375&amp;h=666" alt="侧边栏与个人主页" title="侧边栏与个人主页" style="cursor: pointer; display: inline;"></span></p>
<p><strong>滑动删除</strong><br><span class="img-wrap"><img data-src="/img/bVLh9J?w=375&amp;h=666" src="https://static.alili.tech/img/bVLh9J?w=375&amp;h=666" alt="滑动删除" title="滑动删除" style="cursor: pointer; display: inline;"></span></p>
<p><strong>对话功能</strong><br><span class="img-wrap"><img data-src="/img/bVLiab?w=375&amp;h=666" src="https://static.alili.tech/img/bVLiab?w=375&amp;h=666" alt="对话功能" title="对话功能" style="cursor: pointer;"></span></p>
<p><strong>搜索</strong><br><span class="img-wrap"><img data-src="/img/bVLiat?w=375&amp;h=666" src="https://static.alili.tech/img/bVLiat?w=375&amp;h=666" alt="搜索" title="搜索" style="cursor: pointer;"></span></p>
<p><strong>整体ui</strong><br><span class="img-wrap"><img data-src="/img/bVLiay?w=375&amp;h=666" src="https://static.alili.tech/img/bVLiay?w=375&amp;h=666" alt="整体ui" title="整体ui" style="cursor: pointer;"></span></p>
<hr>
<h1 id="articleHeader1">以上是项目介绍，后面就进入正题，聊聊开发过程中踩到的一些坑，解决方案，以及个人感悟</h1>
<h2 id="articleHeader2">关于踩到的坑与解决方案</h2>
<p><strong>一像素</strong><br>解决方案有好几种，本来想着用css3缩放解决，后来仔细看了看效果，突然发现用不到1px边线，于是不了了之。</p>
<p><strong>布局,兼容性</strong><br>主要采用flex布局，参考阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">Flex 布局教程</a>。</p>
<p><strong>单位</strong><br>由于懒，所以使用了 <strong>vh</strong>，<strong>vw</strong>，感觉吧，兼容性好像也没啥大问题。</p>
<p><strong>关于输如文字时，软键盘弹出，遮挡底部输入框</strong><br>使用<code>scrollIntoView()</code>方法，在输入框获得焦点时，设置定时器执行<code>scrollIntoView(false)</code>,输入框失去焦点时清除定时器，完美解决。</p>
<p><strong>关于聊天时对话内容保持在底部</strong><br>不知道为啥，scrollTop的值一直是0，断了我想用js控制内容滚动的想法。于是索性在最下方设置了一锚点，在每次输入信息或者组件更新时，模拟点击锚点，这样就使聊天界面一直保持在最下方了......方法虽然粗暴，但奈何实用，并且暂时未找到scrollTop一直为0的原因（。</p>
<p><strong>关于接入聊天机器人api遇到的跨域问题</strong><br>起初，天真的以为官方应该提供了jsonp用的接口，然而没有找到。但是问题总是要解决的，功能也得实现，于是就在webpack的零时Dev中写了向机器人api的请求，把webapp起的零时服务器做中转层，然后前端代码直接请求webapp服务器提供的api，这样就完美的避开的跨域限制。（项目中用的聊天机器人是图灵机器人，有需要的自行百度）</p>
<p><strong>关于监听for循环渲染dom内容是否完成</strong><br>产生这个需求后，找到了一个方法，<code>nextTick()</code>在下次 DOM 更新循环结束之后执行延迟回调,然后发现在遇到的场景中好像，并没有产生应有的效果，可能是我代码错误，所以为了偷懒，就暂时设置了一个延时一秒执行的定时器，后续会做出修改。</p>
<p><strong>关于左滑删除</strong><br>把父级宽度设置为120%然后左右浮动内容，监听<code>touchstart</code>与<code>touchmove</code>事件</p>
<p><strong>关于Vue不能检测利用索引直接修改的数组中值的变动</strong><br>在看教程时对于这部分，没有太过在意，以至于后面实际写的时候，不知道哪里出了问题，于是回头翻万能的教程，发现，竟然不能用索引更改数组中的值，于是恍然大悟....得用<code>splice（）</code></p>
<p><strong>关于ui的一些吐槽</strong><br>项目中使用的ui是muse-ui，使用它纯粹是因为感觉跟设计稿挺搭，在此之前没有使用过（之前使用的是饿了吗的轮子），实际使用时发现一些小问题，ui的很多接口没有提供，例如，想在输入框上设置事件，想要对avatar组件中的图片设置懒加载等...。以至于想要去修改ui组件，另外muse提供了单组件的加载，但是由于是个人作品。主要做测试用，所以就直接整体引入了。</p>
<p>还有些其他零零碎碎的大小问题，反正这俩天谷歌百度频率明显有了增加</p>
<h2 id="articleHeader3">个人感悟</h2>
<p>主要是对vuex理解了很多，在此之前，只写过一些简单的小例子，当时认为，vuex（Flux 架构）好像有种多此一举的感觉，但是在这个个人项目中，由于数据量的增加导致了复杂度的几何度增加，使得Vuex成为了我的必需品，难以想象如果组件间的数据通信还是使用父子间通信，或者设置一个数据中心的方法，会是怎么的混乱。</p>
<p><code>Flux 架构就像眼镜：您自会知道什么时候需要它。</code></p>
<p><strong>最后，由于作者只是个新手，所以欢迎交流，写这篇文章的内容也是希望能够帮助到一些，正在学习vue中的小伙伴们，另外希望给个Star，作为第一次写较复杂的个人demo的我来说，还是比较希望得到大家的认可。</strong></p>
<p><strong>项目地址：</strong> <a href="https://github.com/jiangqizheng/vue-MiniQQ" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/jiangqizheng/vue-MiniQQ" rel="nofollow noreferrer" target="_blank">https://github.com/jiangqizhe...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue2实现的仿手机QQapp（支持对话功能，滑动删除....）—— 聊聊开发过程中踩到的一些坑与解决方案，以及个人感悟

## 原文链接
[https://segmentfault.com/a/1190000008850029](https://segmentfault.com/a/1190000008850029)

