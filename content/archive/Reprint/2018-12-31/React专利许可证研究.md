---
title: 'React专利许可证研究' 
date: 2018-12-31 2:30:29
hidden: true
slug: ji2hj6clo7i
categories: [reprint]
---

{{< raw >}}

                    
<p>几天前，知乎上出来一个热门话题《如何看待百度要求内部全面停止使用 React / React Native?》，一时间被邀请回答的大咖们就展开了这场没有硝烟的战争。主要有正反两方，跟个大辩论赛似的，很是激烈。我顺道总结下：</p>
<h2 id="articleHeader0">洗白方</h2>
<p>洗白方的论据主要有5点：</p>
<h3 id="articleHeader1">协议一直如此，而且本身是防御性的</h3>
<p>（1）<code>Facebook</code>的<code>React</code>专利授权是关于分享其代码同时保留它能够抵御的专利诉讼<br>（2）<code>React</code>本身是开源的，受保护的是React里用到的专利<br>（3）<code>Facebook</code>不能主动使用<code>React</code>里的专利起诉你，因为这个授权是<code>irrevocable</code>的，除非你主动发起专利诉讼</p>
<h3 id="articleHeader2">开源条例太苛刻</h3>
<p>ASF （Apache软件基金会）要求开源软件是没有限制的，所以依赖有<code>Facebook's BSD+ Patents license</code>的软件不被允许加入<code>ASF</code>。但也人会说<code>ASF</code>这个开源条件太苛刻，而如果不是<code>ASF</code>的软件没必要遵循这个限制。</p>
<h3 id="articleHeader3">程序员过分解读 license</h3>
<p>（1）本质上你的软件不是要发布到 <code>ASF</code> 上就不会有问题<br>（2）只要不与 <code>FB</code> 有专利冲突就不受影响<br>（3）美国专利不在我国申请的话，不受我国法律保护（<code>Facebook</code>在我国并没有注册<code>React</code>相关专利）<br>（4）前端库互相抄袭的现象太多，法律和道德界限模糊</p>
<h3 id="articleHeader4">分析百度为什么这么做</h3>
<p>（1）百度是一家在美国上市的公司<br>（2）百度有很多核心专利如人工智能 可能在未来和<code>FB</code>有利益冲突</p>
<h3 id="articleHeader5">使用替代品依然有风险</h3>
<p>（1）<code>vue</code>和<code>preact</code>某些特性对React专利有侵权嫌疑，如<code>weex</code>还在使用<code>Yoga</code>引擎<br>（2）重构有成本，很多计划要重新部署，周期加长</p>
<h2 id="articleHeader6">否定方</h2>
<p>否定方的理由很简单，共2个方面：</p>
<h3 id="articleHeader7">事实依据</h3>
<p>（1）<code>Apache</code>、<code>WordPress</code>、百度纷纷叫停<code>React</code>，其严重性可见一斑<br>（2）阿里也计划逐步干掉<code>React</code>及其生态圈，准备了<code>Rax</code>、<code>Vue</code>和<code>Weex</code>等替代品</p>
<h3 id="articleHeader8">专利风险</h3>
<p>（1）如果不想弃用<code>React</code>，那么你不能主动起诉<code>Facebook</code>，期间<code>Facebook</code>可以免费使用你的所有专利（对，是所有）。<br>（2）如果因此诉讼 <code>Facebook</code>，就失去了使用<code>React</code>的授权（相当于把柄被别人抓住）<br>（3）<code>React</code>生态圈的东西用的越多，被<code>Facebook</code>扣的把柄也越多<br>（4）等真到了打官司的时候 完全剥离<code>React</code>难度和成本都很大，那还不如趁早。</p>
<h2 id="articleHeader9">陈述</h2>
<p>正方双方说的都有一定道理，我先做下客观评论：<br>（1）<code>Facebook</code>这个专利许可证确实不地道，虽然个人没有和它有利益冲突，但作为公司管理层，站在公司的立场上还是觉得芒刺在背（尽管公司短期内不可能和<code>Facebook</code>会有利益竞争，但梦还是要有的，未来——虽然远，但多一事不如少一事）。</p>
<blockquote><p>如果公司的核心技术已申请了专利，并且非常有前景的话，而且打算几年内在美上市的，绝壁不能用React及一切生态圈的东西。不管公司<code>React</code>搞得有多6，还是要忍痛割爱，长痛不如短痛（内部系统应该还能用，人家应该也管不着）。</p></blockquote>
<p>（2）而对于国内一些创业型企业，说实话，真和你没有半毛钱关系。<code>React</code>技术虽然有专利许可证，但<code>Facebook</code>免费让你用，并且<code>React</code>这门框架设计得确实好，没有理由不用啊。</p>
<blockquote><p>这里也不藏私，我从2015年开始搞<code>React</code>，到现在也算是深度患者，<code>React</code>是我所用过最好的框架，尽管它的全家桶有些不怎么好用，但框架本身的设计真的非常优秀（同意吧）。而且现在主流的几款替代品<code>Preact</code>和<code>vue</code>也"借鉴"了不少<code>React</code>的东西，但是前端界"互相借鉴"这种事大家都是笑而不语的（哈哈，这种讨打的话各位自己去脑补吧）。</p></blockquote>
<p>（3）然后说说对未来的预测，这次风波后，国内<code>React</code>的占有率会有一定的下降，并且会持续下降（蚂蚁金服也作出回应<code>antd</code>会逐步放弃<code>React</code>向<code>Preact</code>或类似的<code>React</code>替代品方向发展）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011290290" src="https://static.alili.tech/img/remote/1460000011290290" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>并且阿里的的 <code>Rax</code>、<code>Vue</code>和<code>Weex</code>等技术也在不断推进，干掉<code>React</code>及<code>ReactNative</code>是时间的问题吧（如果<code>Facebook</code>不公开作出承诺不会以<code>React</code>为要挟随意使用其他公司的专利），当然一些小公司和没有对外专利技术的公司还是会继续用<code>React</code>及其生态圈，但屁股决定大脑，随着人才不断从大公司涌出渗透到小公司，<code>React</code>前端一哥的地位岌岌可危啊！</p></blockquote>
<h2 id="articleHeader10">牢骚</h2>
<p>想起 <a href="https://www.zhihu.com/people/morgancheng/activities" rel="nofollow noreferrer" target="_blank">程墨Morgan</a> 在 知乎专栏里的几句话：两种公司会从此弃用<code>React</code>，第一是牛逼到足以和<code>Facebook</code>竞争的大公司，第二是装逼到自以为会和<code>Facebook</code>竞争的小公司（感觉我们公司属于第二种，哈哈）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011290291" src="https://static.alili.tech/img/remote/1460000011290291" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>最惨的应该是我，<code>md</code>我的<code>ReactNative</code>三端融合方案刚进行到一半，响应公司高层号召，现在要换成<code>vue + Weex</code>了。不过整理一下发型，想来做为一名卓越的前端工程师，也不能太依赖一门框架，没有<code>React</code>太阳照常升起，说到底还是<code>JavaScript</code>嘛，换个API，换个套路，继续搞起吧 ~_~。</p>
<p>唉，想起那年夕阳下的蹦跑，那是我逝去的青春 ——</p>
<h2 id="articleHeader11">参考资料</h2>
<ul>
<li><a href="http://blog.sina.com.cn/s/blog_12f1266bc0102yx2d.html" rel="nofollow noreferrer" target="_blank">新浪：都该了解的 React license 争议</a></li>
<li><a href="https://coolshell.cn/articles/18140.html#comments" rel="nofollow noreferrer" target="_blank">酷壳：关于FACEBOOK 的 REACT 专利许可证</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/29420396" rel="nofollow noreferrer" target="_blank">知乎：关于百度停用React</a></li>
<li><a href="https://www.zhihu.com/question/65437198" rel="nofollow noreferrer" target="_blank">知乎：如何看待百度要求内部全面停止使用 React / React Native?</a></li>
<li><a href="https://www.zhihu.com/question/65446071" rel="nofollow noreferrer" target="_blank">知乎：阿里还会使用react吗？</a></li>
</ul>
<p>个人之见，大咖勿喷 ---</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React专利许可证研究

## 原文链接
[https://segmentfault.com/a/1190000011290285](https://segmentfault.com/a/1190000011290285)

