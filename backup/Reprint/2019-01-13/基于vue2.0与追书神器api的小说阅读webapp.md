---
title: '基于vue2.0与追书神器api的小说阅读webapp' 
date: 2019-01-13 2:30:11
hidden: true
slug: 2rkxzjpq1ga
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-nReader</h1>
<p>整个项目一共14个页面（包括通用组件），主要使用了vue2.0+vue-router+vuex，主要实现了小说排行榜，小说分类，小说详情，小说阅读，搜索页面，小说阅读记录等页面。达到了可用来看小说的基本需求。</p>
<p>项目地址：<a href="https://github.com/zimplexing/vue-nReader" rel="nofollow noreferrer" target="_blank">https://github.com/zimplexing...</a></p>
<p>项目中使用的api是通过charles进行抓取的，抓取了笔趣阁和追书神器的api，但是笔趣阁的api有一个问题，就是请求的成功率太低了，时不时地就挂了，在使用这个app的时候是在不好受，所以最后使用的追书神器的api，想当年追书神器免费的时候，真的是看小说神器啊，现在也开始收费了。</p>
<ul>
<li><p><a href="http://zhangxin.loan/2017/04/03/biquge-api/" rel="nofollow noreferrer" target="_blank">笔趣阁api</a></p></li>
<li><p><a href="https://github.com/zimplexing/vue-nReader/blob/master/src/libs/api.js" rel="nofollow noreferrer" target="_blank">追书神器api</a></p></li>
</ul>
<p>​之前没有过开发移动端的经历，看完vue官方文档，执行完npm install vue-cli -g,然后生成项目结构之后，就懵逼了。webapp页面怎么布局？肯定不能使用px，那要用什么？直接拿一个移动端的UI组件来用？等等一些很傻的问题在我的脑海中出现了。</p>
<ol>
<li><p><a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">一个比较完善的用vue2.0写的饿了么</a> 用来参考</p></li>
<li><p><a href="https://github.com/Justineo/vue-awesome" rel="nofollow noreferrer" target="_blank">支持vue的图标库</a> 以及图标库的 <a href="http://fontawesome.io/icons/" rel="nofollow noreferrer" target="_blank">图标展示</a> （后来使用了iview组件，图标也一起使用了iview集成的图标了）</p></li>
<li><p><a href="http://router.vuejs.org/zh-cn/api/router-link.html" rel="nofollow noreferrer" target="_blank">vue-router</a>的官方指导文档 一开始使用路由，特别是对vue还不是很熟的情况下，还是需要多看看官方的文档</p></li>
<li><p><a href="https://github.com/simaQ/cssfun/issues/1" rel="nofollow noreferrer" target="_blank">7个你可能不认识的CSS单位</a> 如何在移动端使用合适的单位有疑问的，靠这篇解惑了。</p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">Flex 布局教程：语法篇</a>和<a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" rel="nofollow noreferrer" target="_blank">Flex 布局教程：实例篇</a> 使用flex布局，基本能够使用所有的使用场景了。</p></li>
</ol>
<p>利用下班时间，写写停停，大概花了一个月的时间，终于把这个小项目搞定了。这个项目不仅仅是用来给自己练手用，也是自己打发业余时间的需要。两全其美。</p>
<p>这些是我在开发过程中遇到的一些疑问或者是困惑或者是还没有解决的，第一次使用vue开发，遇到的一些问题还是一些比较基础的，重在记录:</p>
<h1 id="articleHeader1">开发中的问题：</h1>
<ul><li><p><strong>每次切换tab页后都重新加载数据,使用keep-alive后，排行榜页面还是会发送请求</strong></p></li></ul>
<blockquote><p>解决方法：使用created钩子进行请求数据，使用beforeEnterRoute重复发请求</p></blockquote>
<ul><li><p><strong>列表一次性全部加载，没有实现滚动加载</strong></p></li></ul>
<blockquote><p>解决方法：使用vue-scroll获取滚动的高度，更新渲染的数据</p></blockquote>
<ul><li><p><strong>使用$router.push()后使用浏览器返回会完全还原历史路径</strong></p></li></ul>
<blockquote><p>解决方法：存在二次跳转的，最好使用重定向解决，不要使用mounted之后在进行push操作</p></blockquote>
<ul><li><p><strong>有多层页面，并且上级页面不确定时，路由返回错误</strong></p></li></ul>
<blockquote><p>解决方法：将每层的页面路径分类并放到state中（二级页面，三级页面等等）分开管理，向state提交上级路径时，排除当页面的所有下级页面路径</p></blockquote>
<ul><li><p><strong>异步获取数据后渲染模板 模板会先报错再等数据返回之后再做一次渲染</strong></p></li></ul>
<blockquote>
<p>解决方法1：在渲染需要用到异步获取的数据的地方都先进行判断</p>
<p>解决方法2：事件在data定义异步获取数据的数据格式，避免报错</p>
</blockquote>
<ul><li><p><strong>tab切换渲染加载等待加载动画效果</strong></p></li></ul>
<blockquote><p>解决方法：使用vue-spinner组件</p></blockquote>
<ul><li><p><strong>数据过滤或者是时间格式化问题</strong></p></li></ul>
<blockquote><p>解决方法：使用filters加moment解决</p></blockquote>
<ul><li><p><strong>跳转到相应路由标记active</strong></p></li></ul>
<blockquote><p>解决方法：使用vue-router并设置exact属性即可</p></blockquote>
<ul><li><p><strong><code>api</code>为第三方网站的，存在跨域问题</strong></p></li></ul>
<blockquote><p>使用代理将请求进行转发</p></blockquote>
<ul><li><p><strong>事件绑定都是使用的是click，在移动端火出现延迟</strong></p></li></ul>
<blockquote><p>解决方法：使用vue-touch#next，使用tap替代click事件</p></blockquote>
<h1 id="articleHeader2">预览地址</h1>
<p>项目放在google云的虚拟主机上，访问速度看人品。代理也运行在上面，所以加载速度可能会比较慢。其中有一些小说封面会加载不出来，这个是api的问题，并不是网络的原因。</p>
<p>电脑端请开启开发者模式<br><a href="http://35.189.165.140:8080/" rel="nofollow noreferrer" target="_blank">在线预览地址</a></p>
<p>手机扫码：<br><span class="img-wrap"><img data-src="/img/remote/1460000009653459?w=250&amp;h=250" src="https://static.alili.tech/img/remote/1460000009653459?w=250&amp;h=250" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">屏幕截图</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009653488?w=637&amp;h=1133" src="https://static.alili.tech/img/remote/1460000009653488?w=637&amp;h=1133" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009653490?w=637&amp;h=1133" src="https://static.alili.tech/img/remote/1460000009653490?w=637&amp;h=1133" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009653491?w=637&amp;h=1133" src="https://static.alili.tech/img/remote/1460000009653491?w=637&amp;h=1133" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>![]<a href="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/book.png?raw=true)" rel="nofollow noreferrer" target="_blank">https://github.com/zimplexing...</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009653492?w=637&amp;h=1133" src="https://static.alili.tech/img/remote/1460000009653492?w=637&amp;h=1133" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009653493?w=637&amp;h=1133" src="https://static.alili.tech/img/remote/1460000009653493?w=637&amp;h=1133" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue2.0与追书神器api的小说阅读webapp

## 原文链接
[https://segmentfault.com/a/1190000009653444](https://segmentfault.com/a/1190000009653444)

