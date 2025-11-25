---
title: 'Angular、Vue、React三大框架鼎力2017' 
date: 2018-12-21 2:30:11
hidden: true
slug: twjtioqtsul
categories: [reprint]
---

{{< raw >}}

                    
<p>2017年前端炒的火热的莫非于三大框架，angular、vue、react，谈谈我对这三大框架的理解</p>
<p>期初在前三四年或者更早，前端还没被完全分离出来，原生js开发前端页面，似乎并不优雅，好比我们盖房子，一块砖一块砖的盖，很耗时，也不方便维护，渐渐地jQuery库的产生，提高了开发人员的效率，减少了浏览器的兼容，一时间很多涨粉，到现在一些旧的项目仍然在使用，but，他没有mvc，mvvm构架，需要自己进行配置。</p>
<p>后来出现了mvc框架的angular，这个效率比较低，只要发生变化，就得重新遍历计算；</p>
<p>然后出现了react，react的虚拟dom减少了dom操作，降低了项目成本，提高效率和程序性能，但是react是基于view层的，他需要配合一些其他的框架，如flux,redux等，如果拿react跟vue比较的话，使用起来会相对复杂，比如，不能使用指令，遍历不方便，；</p>
<p>而vue相对react而言，没有react灵活，搭配自如，但是他开发起来很高效，vue的插件，组件，生态系统对于我们一般的项目已经足够了，虽然vue的是个人主导的，react是Facebook团队维护的，社区比较繁荣，但vue适合很多项目，也正在慢慢的扩大，前景也是很不错的。</p>
<h3 id="articleHeader0">Angular</h3>
<p>作为元老级的Angular，前后经angular1、angular2、angular4，每个版本似乎都是一个新的框架。</p>
<p>angular1中的ng-if和vue的v-if很相像，因为vue的指令系统就是从angular1中获取的灵感，而且angular1中 的很多问题在vue中得以解决；</p>
<p>到了angular2，他比起1来说，是一个全新的框架，比如说，有更优秀的组件系统，api也变了很多等等，虽然改进了很多，但还是很臃肿；</p>
<p>相比于angular2，angular4的功能列表中添加了许多新功能，同时还有一些旧功能的改进，使用angular4程序将会消耗更少的空间，比起以前的版本运行的更快。</p>
<ul><li>使用场景</li></ul>
<p>当项目对性能要求不高的时候，可以使用angular，或者一些曾经一直用的angular1的项目有必要升级一下了，而且哪有不要求性能的项目，所以angular对于一些新型项目慎重考虑...</p>
<h3 id="articleHeader1">React</h3>
<p>官方说react是因为Facebook对市场上的mvc框架都不满意，自己写了一套用来架构Instagram网站，因为好用，2013年5月开源的，到先在2017年底，react已经升级到了16.2，路由react-router3升为react-router4，react-router-dom</p>
<ul><li>虚拟dom</li></ul>
<p>react不得不提的是虚拟DOM(Virtual DOM)，当页面初次加载的时候会产生一颗dom树，内存中会产生一颗render树，当数据发生更改的时候，会将更改的内容和存有的render树进行对比，找出最优的算法，然后更改render树，最后重新生成页面的dom树，有了虚拟dom，前端的性能提高了很多。</p>
<ul><li>组件化</li></ul>
<p>react的组件化思想尤为体现，将view层分成各个独立的组件，降低耦合度，组件化使得组件间可组合，可重用，可维护，从而大大提高开发效率</p>
<ul><li>灵活性</li></ul>
<p>react是基于view层的，要想发挥他的作用，必须配合一些插件，例如flux，redux等，当然，可以配合更多的库来达到更好的效果</p>
<ul><li>使用场景</li></ul>
<p>react的使用基本上是大型项目的首选，组件化和灵活性是大型项目的条件，其次，react native可以让react运行在移动设备上。</p>
<h3 id="articleHeader2">Vue</h3>
<p>Vue是2014年2月开源的，尤大牛主导的vue编写，到目前为止升级到了v2.5,vue的全家桶Vue-router,Vuex,服务端渲染，以及vue的虚拟dom，组件化，性能，不差于react，对于没有Angular 和react经验的团队，并且规模不是很大的前端项目来说，vue是一个很好的选择</p>
<h3 id="articleHeader3">总结</h3>
<p>框架的选型不仅要看项目本身，还要综合公司团队，团队的技术栈可能直接导致项目框架的选型</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular、Vue、React三大框架鼎力2017

## 原文链接
[https://segmentfault.com/a/1190000012531045](https://segmentfault.com/a/1190000012531045)

