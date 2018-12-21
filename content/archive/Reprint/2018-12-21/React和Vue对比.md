---
title: 'React和Vue对比' 
date: 2018-12-21 2:30:11
hidden: true
slug: dss65kwp0c9
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/3297464-3aa21898fa4fa0ba.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/3297464-3aa21898fa4fa0ba.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="title" title="title" style="cursor: pointer; display: inline;"></span></p>
<blockquote>首次发表在<a href="http://wangyaxing.cn" rel="nofollow noreferrer" target="_blank">个人博客</a>
</blockquote>
<h2 id="articleHeader0">相同点</h2>
<ul>
<li>都支持服务器端渲染</li>
<li>都有Virtual DOM,组件化开发,通过props参数进行父子组件数据的传递,都实现webComponent规范</li>
<li>数据驱动视图</li>
<li>都有支持native的方案,React的React native,Vue的weex</li>
</ul>
<h2 id="articleHeader1">不同点</h2>
<ul>
<li>React严格上只针对MVC的view层,Vue则是MVVM模式</li>
<li>virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制</li>
<li>组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js'; Vue推荐的做法是<code>webpack+vue-loader</code>的单文件组件格式,即html,css,jd写在同一个文件;</li>
<li>数据绑定: vue实现了数据的双向绑定,react数据流动是单向的</li>
<li>state对象在react应用中不可变的,需要使用setState方法更新状态;在vue中,state对象不是必须的,数据由data属性在vue对象中管理</li>
</ul>
<p>后续将会对vue和react的这些对比做详细的分析讲解,敬请期待?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React和Vue对比

## 原文链接
[https://segmentfault.com/a/1190000012479834](https://segmentfault.com/a/1190000012479834)

