---
title: 'javascript框架学习计划' 
date: 2019-02-07 2:30:16
hidden: true
slug: znfuhk3nwi
categories: [reprint]
---

{{< raw >}}

                    
<p><em>前言：终于要做这个计划了，前端框架千千万，绝不能一头扎进去盲目开始，本片文章总结一下目前前各种端框架，以及它们的用途主要解决什么问题，然后最后做出学习计划。希望入了前端坑的同学们可以有所帮助。</em></p>
<h2 id="articleHeader0">1.库与框架</h2>
<p>什么是库，什么是框架？<br>库：是针对特定问题的一个解答，具有专业针对性；<code>不控制应用程序流程的流程</code>；被动的被调用<br>框架：<code>控制反转</code>；决定应用程序生命周期；一般会集成大量的库</p>
<p>是不是框架都集成了大量的库呢？其实这么理解是不对的，框架与库最大的区别就是控制反转，框架就像程序的骨架，拥有默认的有意义的行为，知道在特定情况下该做什么样的事情，在适当的时候框架会调用你的代码，从而整个程序实现你想实现的功能。但是库与框架很难严格区分，所以统一称为解决方案。<br><span class="img-wrap"><img data-src="/img/bVyRD1" src="https://static.alili.tech/img/bVyRD1" alt="库与框架的关系" title="库与框架的关系" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2.前端开发中常见问题</h2>
<p>既然库和框架都是解决方案，那么它们都是要解决前端开发中的特定问题，目前前端开发中主要有以下7个方面的问题，各种解决方案也是针对这些问题被开发出来的。</p>
<ol>
<li><p>DOM操作 （DOM）</p></li>
<li><p>通信     （Communication）</p></li>
<li><p>工具库    （Utility）</p></li>
<li><p>模版技术    （Templating）</p></li>
<li><p>组件        （Component）</p></li>
<li><p>路由        （Routing）</p></li>
<li><p>架构         （Architecture）</p></li>
</ol>
<p>why？</p>
<ol>
<li><p>开发效率</p></li>
<li><p>可靠性：浏览器兼容性／测试覆盖</p></li>
<li><p>更好的配套：文档／DEMO／工具</p></li>
<li><p>设计的更好</p></li>
<li><p>专业性</p></li>
</ol>
<p>HOw</p>
<ol>
<li><p>开放：基于一个外部模块系统，自由组合</p></li>
<li><p>半开放：基于一个定制过的模块系统，内部－外部的解决方案共存</p></li>
<li><p>大教堂：深度定制的模块系统，很少引入外部模块</p></li>
</ol>
<h2 id="articleHeader2">3.DOM操作的解决方案</h2>
<p>DOM主要有以下几点：Selector／Manipulation／Event／Animation<br>选择器／DOM操作／事件（简化事件绑定，提供事件代理之类）／动画<br><br>职责：</p>
<ol>
<li><p>提供便利的DOM查询／操作／移动 等操作</p></li>
<li><p>提供事件绑定／事件代理等支持</p></li>
<li><p>浏览器特性检测，UserAgent侦测</p></li>
<li><p>提供节点属性、样式、类名等操作</p></li>
<li><p>所有以上操作实现目标平台的跨浏览器支持</p></li>
</ol>
<p>相关的框架：</p>
<ol>
<li><p><code>JQuery</code></p></li>
<li><p><code>zepto.js</code></p></li>
<li><p><code>MOOTOOLS</code></p></li>
</ol>
<p><code>JQuery</code>：定义了两义型的接口，可读性不够<br><code>MOOTOOLS</code>：严格遵循Commond－Query，没有两翼型接口，直接扩展了DOM原生对象：<code>Element.propotype.inject = function(){}</code></p>
<p>三者对比：</p>
<ol>
<li><p><code>MooTools</code>：大小：96K，兼容性：IE6+；<code>优点</code>：概念清晰，没有包装对象；接口设计优秀；源码清晰易懂；不局限于DOM和Ajax。<code>缺点</code>：扩展了原生对象（致命）；社区衰弱</p></li>
<li><p><code>JQuery</code>：大小：94K，兼容性：IE6+；<code>优点</code>：社区强大，普及率高；包装对象，不污染原生；基本上专注于DOM； <code>缺点</code>：包装对象，容易混淆；接口两义性；社区水平层次不齐，容易踩坑。</p></li>
<li><p><code>Zepto.js</code>:大小：25K，兼容性：IE10+；<code>优点</code>：小，启动快；接口与JQuery兼容；提供了简单的手势；<code>缺点</code>：与JQuery不能做到100%对应，支持的浏览器少，功能较弱。</p></li>
</ol>
<p>建议：</p>
<ol>
<li><p><code>MooTools</code>：最好的源码阅读学习的资源，小型项目可以用</p></li>
<li><p><code>JQuery</code>：最稳妥的方案</p></li>
<li><p><code>Zepto.js</code>：移动端的备选品</p></li>
</ol>
<p>DOM专业领域解决方案：</p>
<ol>
<li><p>手势：<code>Hammer.js</code>:大小：12k；常见手势封装，包括tap，hold，transform，swipe等等，并支持自定义扩展。</p></li>
<li><p>局部滚动：<code>iscroll.js</code>：大小：13k；移动端position：fix＋overflow：scroll的救星</p></li>
<li><p>高级动画：<code>Velocity.js</code>:大小：12k；复杂动画序列实现，不仅限于dom</p></li>
<li><p>视频播放：<code>vedio.js</code>:大小：101k，类似原生vedio标签的使用方式，对低级浏览器回退到flash播放。</p></li>
</ol>
<h2 id="articleHeader3">4.通信问题解决方案</h2>
<p>职责：</p>
<ol>
<li><p>处理与服务器的请求与响应</p></li>
<li><p>预处理请求数据／响应数据Error／Success的判断封装</p></li>
<li><p>多种类型请求，统一接口（xmlHttpRequest1/2，JSONP，Iframe）</p></li>
<li><p>处理浏览器兼容性</p></li>
</ol>
<p>相关框架：<br>JQuery和前面的框架基本都有通信的支持，但是推荐两个备选选择：</p>
<ol>
<li><p><code>Reqwest</code>：大小：3.4k；<code>优点</code>：JSONP支持；稳定／兼容IE6+；CROS跨域； Promise／A支持</p></li>
<li><p><code>qwest</code>：大小：2.5k；<code>优点</code>：更小的代码量；支持XmlHttpRequest2；CORS跨域；支持搞基数据类型，如：ArrayBuffer，Blob和FormData</p></li>
<li><p>socket.io:实时性；支持二进制数据流；智能自动的回退支持（非二进制数据流）；多种后端语言支持</p></li>
</ol>
<h2 id="articleHeader4">5.工具包框架</h2>
<p>职责：</p>
<ol>
<li><p>弥补js语言原生不提供的功能。</p></li>
<li><p>方法门面包装，使其更易于使用（某些方法比较繁琐，包装后方便使用）</p></li>
<li><p>异步队列／流程控制等等</p></li>
</ol>
<p>相关框架；</p>
<ol>
<li><p><code>es5-shim</code>（部分支持）：大小53k；提供语言垫片；Github：es－shims／es5-shim</p></li>
<li><p><code>es6-shim</code>：大小38k；Github：paulmillr／es6-shim</p></li>
<li><p><code>underscore</code>：大小：16.5k；兼容IE6+</p></li>
<li><p><code>Lodash</code>：大小：50k；兼容IE6+；是underscore的高性能版本，方法大部分是runtime编译出来</p></li>
</ol>
<h2 id="articleHeader5">6.模版技术</h2>
<h3 id="articleHeader6">基于字符串的模版</h3>
<p>通过字符串生成DOM之后就不再变化，DOM无关，（解析到DOM时间很快），安全性差：用到innerHTML<br>解决方案：<code>dustjs</code>；<code>hogan</code>（mustache实现之一）；<code>dot.js</code>(体小速快)<br><span class="img-wrap"><img data-src="/img/bVyTvC" src="https://static.alili.tech/img/bVyTvC" alt="基于字符串的模版处理过程" title="基于字符串的模版处理过程" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">基于DOM的模版</h3>
<p>可以动态修改更新，语法要写在节点上；初始化时间慢<br>解决方案：<code>Angularjs</code>；<code>Vuejs</code>； <code>Knockout</code><br><span class="img-wrap"><img data-src="/img/bVyTvu" src="https://static.alili.tech/img/bVyTvu" alt="基于DOM的模版处理过程" title="基于DOM的模版处理过程" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">活动模版技术</h3>
<p>可以动态更新，DOM无关，实现局部更新，安全性高（不使用innerHTML）<br>解决方案：<code>Regularjs</code>；<code>Ractivejs</code>；<code>htmlbar</code><br><span class="img-wrap"><img data-src="/img/bVyTv1" src="https://static.alili.tech/img/bVyTv1" alt="活动模版技术处理过程" title="活动模版技术处理过程" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">7.组件</h2>
<p>职责：</p>
<ol>
<li><p>提供基础组件CSS支持</p></li>
<li><p>提供常用组件：Slider，Modal</p></li>
<li><p>提供声明式的调用方式（在HTML中绑定属性初始化组件）</p></li>
</ol>
<p>解决方案（基于JQuery）：</p>
<ol>
<li><p><code>Bootstrap</code></p></li>
<li><p><code>Foundation</code><br>相同点：Mobile First的流式栅格，可定制UI，都是基于JQuery，MIT开源协议。</p></li>
</ol>
<p>解决方案（非JQuery版本）</p>
<ol>
<li><p>Knockout－Bootstrap</p></li>
<li><p>UI Bootstrap</p></li>
<li><p>React Bootstrap</p></li>
</ol>
<h2 id="articleHeader10">8.路由</h2>
<p>职责：</p>
<ol>
<li><p>监听URL变化，并通知注册的模块</p></li>
<li><p>通过javascript进行主动跳转</p></li>
<li><p>历史管理</p></li>
<li><p>对目标浏览器兼容性的支持</p></li>
</ol>
<p>解决方案：</p>
<ol>
<li><p><code>page.js</code>:大小：6.2k；兼容IE8+；</p></li>
<li><p><code>Director.js</code>:大小：10k，兼容IE6+；可以前后端使用一套规则来定义路由</p></li>
<li><p><code>stateman</code>：10k；兼容IE6+；用于处理深层复杂路由的独立路由库。</p></li>
<li><p><code>crossroad.js</code>： 大小：7.5k；老牌Routing库，API定义繁琐，两年未更新。</p></li>
</ol>
<h2 id="articleHeader11">9.架构（解耦）</h2>
<p><code>MVC</code>／<code>MVVM</code>／<code>MV＊</code></p>
<p>职责：</p>
<ol>
<li><p>提供一种范式帮助（强制）开发者进行模块解耦</p></li>
<li><p>视图与模型分离</p></li>
<li><p>更容易进行单元测试</p></li>
<li><p>更容易实现应用程序的扩展</p></li>
</ol>
<p>例子：<br><code>MVVM</code>为例</p>
<ol>
<li><p><code>Model</code>：数据实体，用于记录应用程序的数据</p></li>
<li><p><code>View</code>：展示友好的界面，它是数据的定制反映，它包含样式结构定义以及vm享有的声明式数据、事件绑定</p></li>
<li><p><code>ViewModel</code>：view和model的粘合剂，它通过绑定、事件与view交互，并可以调用Sevice处理数据持久化，当然也能通过数据绑定将Model的变动更新到View中</p></li>
</ol>
<h2 id="articleHeader12">10.常用网站介绍</h2>
<p><a href="http://www.javascripting.com/" rel="nofollow noreferrer" target="_blank">http://www.javascripting.com/</a><br><a href="http://www.javascriptoo.com/" rel="nofollow noreferrer" target="_blank">http://www.javascriptoo.com/</a><br><a href="http://microjs.com" rel="nofollow noreferrer" target="_blank">http://microjs.com</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript框架学习计划

## 原文链接
[https://segmentfault.com/a/1190000005894507](https://segmentfault.com/a/1190000005894507)

