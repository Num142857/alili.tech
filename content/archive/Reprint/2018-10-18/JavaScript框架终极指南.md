---
title: JavaScript框架终极指南
hidden: true
categories: [reprint]
slug: ee781fe9
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>紧跟JavaScript框架的脚步是一个挑战。现在有太多的框架，几乎一个月就会出来一个新的。那么如何知道到底哪一个比较合适你的项目呢？它们分别有什么优点和缺点呢？你要如何开始呢？</p>
<p>这就是这篇指南出来的意义。它是一个活生生的文档，是所有已知前端JavaScript框架的参考（不包括归档或弃用的项目）。在这种情况下，“框架”一词在广义上被广泛使用。它包括像React这样的用户界面(UI)库，以及像Angular一样的完整框架。</p>
<h3>为什么这个有益?</h3>
<p>你们当中有些人可能会好奇，为什么这个指南有益。大多数读者最终会使用我称之为“三巨头”的框架之一—React, Angular and Vue。很好，他们是很好的选择。那也就是说，这篇指南有其存在的价值。这里有个例子...</p>
<p>也许你听说过 <a href="#dojo">Dojo</a> 这个框架。也许没有，虽然，Dojo专注于一些使其独特的事情—可访问性。默认情况下，所有的Dojo小部件都是可以访问的，并且它提供了一切国际化所需要的应用程序。</p>
<p>另一个例子...也许你正在开发一款应用程序，在网络上需要很好的性能。下面列出一些很好的高性能库和框架，可能正好符合这个要求。</p>
<p>还有一些小框架可以提供极好的学习机会。你可以深入了解代码并了解如何构建此类软件。<a href="#picodom">Picodom</a>是一个可以用来构建自己的framework库，很酷，对吧？</p>
<h3>如何组织本指南</h3>
<p>这些框架被分为广泛的类别 — 你将会在下面列出的表中看到。在可能的范围内，每个框架都有一个部分来解释这个框架的基本原理、优缺点以及一些额外的学习资源。</p>
<p>如果你是框架的作者—或者粉丝 —并且你没有看到列出你的框架，或者希望能够纠正一些信息， 在Twitter上<a href="https://twitter.com/__jhannah">联系我</a>，我会很乐意增加或者更新清单。</p>
<h3>指南图标:</h3>
<p>下面的图标旨在帮助读者了解框架的一般特征和趋势。他们只是粗略的向导。</p>
<p>🔥性能：在<a href="https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html">基准测试</a>  中排名前五。<br><img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""> 函数式编程范式<br><img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""> 反应性编程范式<br><img src="https://p0.ssl.qhimg.com/t015fb9e99445bc5612.png" alt="">
面向对象的编程范式<br><img src="https://p0.ssl.qhimg.com/t0128c32448ef5f04ec.png" alt=""> TypeScript作为主要的开发语言</p>
<h3><a href="#big3">三大巨头</a></h3>
<table>
    <tbody>
        <tr> 
            <td>React <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
            <td> Angular  <img src="https://p0.ssl.qhimg.com/t0128c32448ef5f04ec.png" alt=""> <img src="https://p0.ssl.qhimg.com/t015fb9e99445bc5612.png" alt=""> <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
            <td>Vue.js <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
        </tr>
    </tbody>
</table>

<h3><a href="#legacy">具有历史意义的</a></h3>
<table>
    <tbody>
        <tr> 
            <td>AngularJS</td>
            <td>Backbone</td>
            <td>Ember</td>
        </tr>
    </tbody>
</table>

<h3><a href="#notable">值得注意的</a></h3>
<table>
    <tbody>
        <tr> 
            <td>Aurelia</td>
            <td>Elm <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""> <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
            <td>Inferno 🔥<img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
        </tr>
    <tr>
      <td>Polymer</td>
      <td>Preact <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
      <td>ReasonML <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
    </tr>
    <tr>
       <td>Svelte 🔥</td>
    </tr>
    </tbody>
</table>

<h3><a href="#rest">剩下的包</a></h3>
<table>
    <tbody>
        <tr>
      <td>AppRun <img src="https://p0.ssl.qhimg.com/t0128c32448ef5f04ec.png" alt=""></td>
            <td>Binding.scala <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
            <td>Bobril 🔥 <img src="https://p0.ssl.qhimg.com/t0128c32448ef5f04ec.png" alt=""></td>
        </tr>
    <tr>
            <td>Choo <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
            <td>CxJS</td>
      <td>Cycle.js <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""> <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
    </tr>
    <tr>
            <td>DIO 🔥<img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
      <td>Dojo <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""> <img src="https://p0.ssl.qhimg.com/t0128c32448ef5f04ec.png" alt=""></td>
       <td>Domvm 🔥</td>
    </tr>
        <tr>
             <td>DoneJS</td>
       <td>Etch</td>
       <td>Gruu</td>
        </tr>
     <tr>
       <td>Glimmer  <img src="https://p0.ssl.qhimg.com/t0128c32448ef5f04ec.png" alt=""></td>
       <td>Hyperapp 🔥<img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
       <td>Hyperdom <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
    </tr>
     <tr>
       <td>hyperHTML <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
       <td>Ivi 🔥</td>
       <td>Knockout <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
    </tr>
     <tr>
       <td>Maquette <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
       <td>Marko <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
       <td>Mithril</td>
    </tr>
     <tr>
       <td>Moon</td>
       <td>Nerv <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
       <td>NX</td>
    </tr>
     <tr>
       <td>petit-dom 🔥</td>
       <td>Pux</td>
       <td>Ractive <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
    </tr>
     <tr>
       <td>react-lite <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
       <td>RE:DOM 🔥</td>
       <td>Reflex</td>
    </tr>
     <tr>
       <td>Riot <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""> <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
       <td>rxdomh <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""></td>
       <td>San</td>
    </tr>
     <tr>
       <td>Simulacra.js</td>
       <td>Slim.js</td>
       <td>Stem JS <img src="https://p0.ssl.qhimg.com/t015fb9e99445bc5612.png" alt=""></td>
    </tr>
     <tr>
             <td>Stencil</td>
             <td>Stimulus</td>
       <td>Surplus 🔥 <img src="https://p0.ssl.qhimg.com/t0100a14ac770020834.png" alt=""> <img src="https://p0.ssl.qhimg.com/t01e094691998eceba7.png" alt=""></td>
    </tr>
     <tr>
       <td>Thermite</td>
       <td>TSERS</td>
             <td>Ultradom 🔥</td>
    </tr>
        <tr>
             <td>Vidom</td>
       <td>Vuera</td>
        </tr>
    </tbody>
</table>

<h2>三大巨头</h2>
<p>目前在流行和使用中占主导地位的三个框架是React, Angular 和Vue。他们每个都有庞大的社区和大量可用的培训资源。如果你是一个初级开发人员，学习一个框架能够更好的帮助你找到一份工作，这三个是你最好的选择。以下是他们过去六个月的npm下载情况：
<a href="https://images.contentful.com/f42iyx0drm0u/2PuqVJe5AAqUCEmaMIGACA/54a1940e62057dacfddf5fa14eecf023/react-angular-vue-jan-2018.png"><img src="https://images.contentful.com/f42iyx0drm0u/2PuqVJe5AAqUCEmaMIGACA/54a1940e62057dacfddf5fa14eecf023/react-angular-vue-jan-2018.png?w=900&amp;h=413" alt=""></a>  </p>
<p>我们可以看到React远超Angular and Vue。不太明显的是，过去一年，Vue的增长速度与Angular速度相比大约翻了一番。如果GitHub上的星是开发者热情或兴趣的标志，那么Vue在那里看起来也很强大，有79000颗星，而Angular只有32000颗。在这篇文章中，React有近8.6万颗星。</p>
<h3>React</h3>
<p><img src="https://p0.ssl.qhimg.com/t01f270f794050f7e60.png" alt="React logo"> <a href="https://reactjs.org/">React</a> 2013年5月作为一个开源项目被引入。最初的作者是Facebook的工程师乔丹·沃克(Jordan Walke)。</p>
<p>React自称是“构建用户界面的JavaScript库”，而不是像Angular这样的完整框架。诸如路由、状态管理和数据获取等问题都留给了第三方。这就产生了一个巨大而活跃的生态系统。</p>
<p>许多大的React应用会使用流行的<a href="https://redux.js.org/">Redux</a> 库进行状态管理，<a href="https://reacttraining.com/react-router/">React Router</a> 作为路由，但是还有其它好的选择。</p>
<p>React负责在新一代开发人员中推广<a href="https://github.com/getify/Functional-Light-JS/tree/master/manuscript">函数式编程</a>原则。虽然它不是一个纯粹的函数库，但它允许开发人员以主要的函数样式工作，特别是与Redux结合使用时。</p>
<p>想了解更多React组件与其它组件的对比，看我的文章在<a href="https://javascriptreport.com/why-is-react-more-popular-than-angular/">React and Angular</a>，另外还有<a href="https://javascriptreport.com/how-is-react-different-from-vue/">React and Vue</a>。</p>
<h4>优点</h4>
<ul>
<li>非常受欢迎，有强大的就业市场</li>
<li>大量的培训资源和第三方库帮助加速开发</li>
<li>跨平台团队的最佳选择(web、移动、桌面、其他设备)</li>
<li>通用性</li>
<li>强大的企业支持(Facebook)</li>
</ul>
<h4>缺点</h4>
<ul>
<li>大量的选择让人不知所措</li>
<li>新手并不清楚如何是最佳实践</li>
<li>学习曲线对于构建更大的应用程序是很困难的</li>
</ul>
<h4>其它的资源</h4>
<ul>
<li><a href="https://medium.freecodecamp.org/yes-react-is-taking-over-front-end-development-the-question-is-why-40837af8ab76">是的，React正在接管前端开发。问题是为什么。</a></li>
<li><a href="https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/">我从Angular转向React的10个原因</a></li>
<li><a href="http://blog.scottlogic.com/2016/04/04/a-functional-front-end-with-react.html">React的前端功能</a></li>
<li><a href="https://egghead.io/courses/the-beginner-s-guide-to-reactjs">初学者指南</a> (免费视频教程)  </li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a></p>
<h3>Angular</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/1XKikNcdGAGmKEKC2A2q0S/f541d5e19773e3703af7b04002f51f29/angular.png?w=100" alt="Angular logo"><a href="https://angular.io/">Angular</a> 是AngularJS的继承。它是一个完整并且稳定的框架，它提供了默认的数据抓取，状态管理，开发语言以及构建工具链。</p>
<p>也许Angular最引人注意的是 <a href="https://www.typescriptlang.org/">TypeScript</a> 作为开发语言进行使用。这使得框架很<a href="https://yakovfain.com/2016/01/03/why-java-developers-will-embrace-angular-2-and-typescript/">适合</a> 那些传统的面向对象语言，比如Java和c#，TypeScript能从这些语言中汲取灵感。</p>
<p>据说"企业"是Angular的目标用户。从某种意义上来说，很多大公司的成员比较熟悉Java和其它一些面向对象的语言，这也许是对的。</p>
<h5>优点</h5>
<ul>
<li>功能齐全的框架以及默认经过了很好的测试</li>
<li>TypeScript提供了很熟悉的语言，对于那些有面向对象编程背景的人</li>
<li>强大的企业支持(Google)</li>
<li>清晰的最佳实践</li>
</ul>
<h5>缺点</h5>
<ul>
<li>学习曲线很艰难</li>
<li>TypeScript很难被采纳</li>
<li>在基准测试中启动指标不佳</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://softwareengineering.stackexchange.com/questions/197599/why-would-i-use-angular">为什么我要使用Angular?</a></li>
<li><a href="http://blog.rangle.io/why-use-angular-2-on-a-new-application/">新项目中使用Angular 2实列</a></li>
<li><a href="https://www.youtube.com/watch?v=KhzGSHNhnbI">Angular 4的60分钟讲解</a> (免费的视频教程)</li>
<li><a href="https://auth0.com/blog/making-use-of-rxjs-angular/">Angular中使用RxJS</a></li>
<li><a href="https://dev.to/aspittel/learning-angular-5-as-a-react-and-vue-developer-5dp3">作为React和Vue的开发者学习Angular5</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Vue.js</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/3Pxb9zXE00MuEEaoMMQc8C/c5b75f893717dd912d12ad8d978a2239/Vue.png?w=100" alt="Vue logo">虽然经常被视为"新来的孩子", <a href="https://vuejs.org/">Vue</a>从2013年就已经开始了。尤雨溪是创造者以及主要的开发者，不像React和Angular，vue没有大公司的直接支持，相反，它依赖于个人和企业的捐赠。</p>
<p>在这三大流行的框架中，Vue被视为是最易上手的。它在很多方面类似React，但是也有很多类似AngularJS—例如，指令和模板。</p>
<p>Vue的相对简单性、开发人员体验和良好的性能使得它的流行度猛增。</p>
<p>其中一个值得注意的vue特点是它是"先进的框架"，可以用作jQuery替换，也可以用于大型单页应用程序。从Vue文档：</p>
<blockquote>
<p>与其他单片框架不同，Vue从头设计到尾都是渐进可采用的。核心库只关注视图层，并且很容易与其他库或现有项目进行收集和集成。</p>
</blockquote>
<p>虽然在路由和状态管理等问题上，Angular持偏执的态度，React持不可知的态度，但是Vue采用了一种中间的方法，使用官方的路由和状态管理解决方案，这些解决方案是可选的，但是与核心库保持同步</p>
<p>想了解更多关于Vue组件与React的对比，看<a href="https://javascriptreport.com/how-is-react-different-from-vue/">我的文章</a> 综述了两者不同。</p>
<h5>优点</h5>
<ul>
<li>简单易学</li>
<li>好的文档</li>
<li>在流行和使用上激增</li>
<li>前三种框架的最佳性能</li>
</ul>
<h5>缺点</h5>
<ul>
<li>目前的就业市场比React和Angular都要小。</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://vuejs.org/v2/guide/comparison.html">各种框架之间的对比</a></li>
<li><a href="https://about.gitlab.com/2016/10/20/why-we-chose-vue/">为什么我们选择Vue.js</a></li>
<li><a href="https://laracasts.com/series/learn-vue-2-step-by-step">学习Vue 2: 一步一步</a> (免费的视频课程)</li>
<li><a href="https://vuejs.org/v2/guide/reactivity.html">深度剖析相关性</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h2>具有历史意义的</h2>
<p>几年前，这些框架曾一度被认为是“三巨头”。虽然现在不太流行，但它们仍然被广泛使用，并且在后来的框架的开发中具有影响力。</p>
<h3>AngularJS</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/5pgSrDJ63608UmqQUE2ySy/abcbce8ef53dabc058813804df4796c3/AngularJS_logo.png?w=100" alt="AngularJS logo">在2013年, <a href="https://angularjs.org/">AngularJS</a> 是最流行的框架。在此期间，导致它流行的一些因素是它的MVC架构，声明式编程风格、双向数据绑定和健壮的特性集。</p>
<p>AngularJS有一种固执已见的方法，目的是为开发人员提供一个<a href="https://docs.angularjs.org/guide/introduction">完整解决方案</a>:</p>
<blockquote>
<p>在构建web应用程序的客户端这个整体难题中，AngularJS不是一个单独的部分。它处理你曾经手工编写的DOM和AJAX粘合代码，并将其放入定义良好的结构中。这使得AngularJS对构建CRUD(创建、读取、更新、删除)应用程序的方式有自己的看法。但它是固执已见的，它还确保它的观点只是你可以轻易改变的起点。</p>
</blockquote>
<p>2013年之后React出现。React使用单向数据流，并认为双向数据绑定使应用程序变得困难，特别是他们进行推测。在2014年，Angular团队推出了Angular 2，一个后来被简单的进行重命名。<a href="#angular">Angular</a>。这个新的版本将引入单向数据流以及其它<a href="http://eisenbergeffect.bluespire.com/all-about-angular-2-0/">主要变化</a>。这标志着AngularJS的受欢迎程度开始下降。</p>
<p>尽管其后续项目不断发展，AngularJS仍然被广泛的使用，并正在积极的开发中。</p>
<h5>优点</h5>
<ul>
<li>丰富的训练资源</li>
<li>好的文档</li>
<li>很好的被建立</li>
<li>全功能</li>
</ul>
<h5>缺点</h5>
<ul>
<li>双向数据绑定，其它的技术问题可能不需要的</li>
<li>不断下滑的支持率(很少的工作)</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://www.pluralsight.com/blog/software-development/tutorial-angularjs">深入理解AngularJS</a></li>
<li><a href="https://docs.angularjs.org/tutorial">PhoneCat教程App</a></li>
<li><a href="https://www.awwwards.com/practical-uses-of-angularjs-create-a-single-page-application-spa-or-a-website-menu-in-an-instant.html">实际使用的AngularJS</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Backbone</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/AFRKH9ankGeKC0q6eS6eo/dde426b8c4a45f7b1ebdb8004695cc00/backbone.png?w=100" alt="Backbone logo">由杰里米·阿什肯纳斯(Jeremy Ashkenas)创作，他还创作了咖啡剧本。<a href="http://backbonejs.org/">Backbone</a> 最初是在2010年秋天发布的。Backbone生态系统的关键部分是<a href="https://marionettejs.com/">Marionette</a>，简化开发的框架。</p>
<p>Backbone是重要的，因为它是第一个通过实现<a href="https://blog.codinghorror.com/understanding-model-view-controller/">MVC模式</a>将更多结构引入前端应用程序的框架之一。从文档:</p>
<blockquote>
<p>Backbone可以帮助您的唯一最重要的事情是将业务逻辑与用户界面分开。当两者纠缠在一起时，改变就很难了;当逻辑不依赖UI时，您的接口就更容易使用了。</p>
</blockquote>
<p>近几年，Backbone的使用量在下降，尽管它继续在Drupal内容管理系统的最新版本中发布，一个相关的<a href="https://benmccormick.org/2016/03/07/the sad-view-backbone -ecosystem">评论</a>关于下降的可能原因:</p>
<blockquote>
<p>Backbone的作者，Jeremy Ashkenas在1.0发布后决定根据API和特性集来调用Backbone。这样做的好处是，到目前为止，Backbone仍然是最稳定的主要JavaScript框架，但这阻碍了从其他框架中吸取教训的努力。</p>
</blockquote>
<h5>优点</h5>
<ul>
<li>提供了代码结构</li>
<li>稳定的项目</li>
</ul>
<h5>缺点</h5>
<ul>
<li>不断下滑的支持率(很少的工作)</li>
<li>命令式编程风格(与流行的声明式风格相反)</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="http://rahulrajatsingh.com/2014/07/backbone-tutorial-part-1-introduction-to-backbone-js/">backbone教程-第1部分:Backbone.Js的介绍。</a></li>
<li><a href="https://code.tutsplus.com/tutorials/getting-started-with-backbonejs--net-19751">开始使用Backbone.js</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Ember</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/CmTdkS22aWg82MYqoSOiE/d3780bbce78ca5b50c0cebb3633c7b07/ember.png?w=100" alt="Ember logo"><a href="https://www.emberjs.com/">Ember</a> 作者是Yehuda Katz，许多开源项目的多产作者或贡献者。Ember是基于MVVM模式，并且有丰富的特性集。它还有强大的<a href="https://en.wikipedia.org/wiki/Ember.js">哲学观点</a>:</p>
<blockquote>
<p>Ember着手为客户端应用程序问题提供一个整体解决方案。这与许多JavaScript框架形成了鲜明的对比，这些框架首先在MVC(模型-视图-控制器)中为V提供解决方案，然后尝试从这些框架中成长……</p>
</blockquote>
<blockquote>
<p>Ember是一组工具的组成部分，它们共同工作以提供完整的开发栈。这些工具的目的是使开发人员迅速高效工作。例如，Ember CLI提供了标准的应用程序结构和构建管道。它还有一个可插拔的体系结构和超过3500个插件来增强和扩展它。</p>
</blockquote>
<p>其中一个主要的批评是Ember的大体积，这对性能有负面影响。Ember也被认为是一个陡峭的学习过程和难以掌握。</p>
<h5>优点</h5>
<ul>
<li>清晰最佳实践</li>
<li>很好的建造</li>
<li>完整性</li>
</ul>
<h5>缺点</h5>
<ul>
<li>大体积</li>
<li>学习艰难</li>
<li>不断下滑的支持率(很少的工作)</li>
</ul>
<h5>Additional Resources</h5>
<ul>
<li><a href="https://guides.emberjs.com/v2.14.0/tutorial/ember-cli/">创造你自己的APP</a></li>
<li><a href="http://yoember.com/">Ember.js指南</a></li>
<li><a href="https://www.codeschool.com/courses/warming-up-with-ember-js">Ember.js正在慢慢热门起来</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h2>值得注意</h2>
<p>本节中列出的框架都具有良好的文档和健康的社区。虽然它们不像“三巨头”那样被广泛使用，但它们填补了重要的空白，并以其独特或创新的方法而闻名。</p>
<h3>Aurelia</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/2hIx26Q1sEGua0ewOiiUCC/0a4b53b1d853f97522d83c04b73c8040/aurelia.png?w=100" alt="Aurelia logo"><a href="http://aurelia.io/">Aurelia</a>, 罗伯特·艾森伯格(Rob Eisenberg)著有《天使》(AngularJS)和艾森伯格之前的框架《杜兰达尔》(Durandal)。在创建奥雷里亚之前，艾森伯格是Angular的一员，2014年底因与Angular2项目的方向不一致而离开。</p>
<p>Aurelia是一个完整的框架。下面是文档的基本介绍:</p>
<blockquote>
<p>Aurelia提供了一些核心功能，比如依赖注入、模板化、路由和发布/订阅，因此您不必为了构建应用程序而拼凑一堆库。在这个丰富的核心之上，Aurelia还为国际化、验证、模态对话框、UI虚拟化等提供了许多额外的插件。</p>
</blockquote>
<blockquote>
<p>你也不需要拼凑一堆不同的工具。Aurelia提供了一个用于生成和构建项目的CLI，一个用于调试的浏览器插件和一个VS代码插件。但是，您不必使用其中的任何一个，因为Aurelia的结构使您能够交换任何细节，甚至包括模板/绑定引擎，以确保最大的灵活性。</p>
</blockquote>
<h5>优点</h5>
<ul>
<li>完整的方案</li>
<li>语言不可知，适用于JavaScript、TypeScript和其他语言。</li>
<li>稳定的API</li>
</ul>
<h5>缺点</h5>
<ul>
<li>较小的社区与顶级框架</li>
<li>很少的工作机会</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://www.pluralsight.com/blog/software-development/angular-2-vs-aurelia">Aurelia和Angular2应该如何选择?</a></li>
<li><a href="http://aurelia.io/docs/tutorials/creating-a-todo-app">创建一个Todo应用</a></li>
<li><a href="https://hashnode.blog/rob-eisenberg-on-aurelia-and-how-it-stacks-up-against-angular-2-and-react-82721d714449">Rob Eisenberg对Aurelia以及它如何与Angular2和React进行抗争</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Elm</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/41teYJRcmQ6OqiKiKmaSC0/189e48f023c910cb992068d7e51da9ea/Elm.png?w=100" alt="Elm logo"><a href="http://elm-lang.org/">Elm</a> 在这个列表中是唯一的。相比于一个特别的框架，它实际上是一种编译JavaScript的独立语言，类似于<a href="# Reason">Reason</a>。但是，它将自己定位为React的备选办法：</p>
<blockquote>
<p>Elm是一种编译为JavaScript的函数语言。它与一些项目竞争，如作为创建网站和web应用的工具的React。Elm是一款非常注重简单，易使用，并且保证质量的工具...我可以很放心保证，如果你给Elm一个机会，在里面做项目，最终您将编写更好的JavaScript并对代码进行响应。</p>
</blockquote>
<p>Elm也有很大的影响力，包括成为流行的<a href="https://redux.js.org/docs/tion/priorart.html">Redux</a>状态管理库的灵感来源之一。</p>
<p>Elm基本优点：</p>
<blockquote>
<p>忘记你听说过的函数式编程。花言巧语，奇思妙想，糟糕的工具。恶心。Elm是关于：</p>
<ul>
<li>在实践中没有运行时错误。没有空。没有未定义的不是函数。</li>
<li>友好的错误消息可以帮助您更快地添加特性。</li>
<li>有良好架构的代码，在应用程序增长时保持良好架构。</li>
<li>为所有的Elm包自动执行语义版本控制。
JS库的任何组合都不能提供这种功能，但在Elm中，这一切都是免费和容易的。现在，这些美好的事情是可能的，因为Elm建立在40多年的类型化函数语言上。</li>
</ul>
</blockquote>
<h5>优点</h5>
<ul>
<li>消除几乎所有运行时错误</li>
<li>强壮的架构</li>
<li>简化的重构</li>
</ul>
<h5>Cons</h5>
<ul>
<li>在某些情况下需要使用JavaScript的互操作性(增加了复杂性)。</li>
<li>很小的社区</li>
<li>很少的工作机会</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://guide.elm-lang.org/">Elm的介绍</a></li>
<li><a href="https://egghead.io/courses/start-using-elm-to-build-web-applications"> 开始使用Elm搭建web应用程序</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Inferno</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/2sta2RFiqE8y4OcSkkC6Og/8a65bda7c2f422d60b2005b6ef73b20b/inferno.png?w=100" alt="Inferno logo">如果性能是你最关心的，<a href="https://infernojs.org/">Inferno</a>正是适合你的框架。最开始的作者是多米尼克·甘纳韦—现在，作为React团队的一员，Inferno最初的设计目的是为了证明JavaScript框架可以在移动设备上运行良好。</p>
<blockquote>
<p>Inferno两年前开始的，看看UI库是否真的能改善移动设备上的体验、电池、内存使用和性能。当时，我们真的很难在任何UI库/框架上获得良好的性能——它根本就没有发生……</p>
</blockquote>
<blockquote>
<p>Inferno证明它在移动上更快是可能的...就性能而言，Inferno是目前JavaScript UI库最快的—无论是在基准测试中还是实际的真实场景中。它在初始页面加载、解析时间、呈现时间和更新时间方面优于浏览器。Inferno的服务器端渲染比React要快5倍，比Angular2快3倍，比Preact和Vue快1.5倍。</p>
</blockquote>
<p>Inferno有一个API，跟React非常像，并且使用“Inferno -compat”库可以直接将React应用程序移植到Inferno中。</p>
<p>Inferno也有它自己的路由，并且很快将更新版本以匹配React 路由4的API，同时与Redux和Mobx状态管理库兼容。</p>
<h5>优点</h5>
<ul>
<li>非常好的性能</li>
<li>对React开发人员来说，熟悉的API</li>
<li>好的文档</li>
</ul>
<h5>缺点</h5>
<ul>
<li>很小的社区</li>
<li>使用 <code>inferno-compat</code> 也许会影响性能</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://infernojs.org/docs/guides/installation">Inferno指南</a></li>
<li><a href="https://auth0.com/blog/learn-about-inferno-js-build-and-authenticate-an-app/">学习InfernoJS: 构建并验证应用程序</a></li>
<li><a href="https://survivejs.com/blog/inferno-interview/">采访多米尼克Gannaway</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Polymer</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/1xLcr81wegoCookgq8sKAi/a5c7efcf07bfcf343da6546e06df022e/polymer.png?w=100" alt="Polymer logo"><a href="https://www.polymer-project.org/">Polymer</a>是谷歌支持的库，专注于<a href="https://www.w3.org/standards/techs/components#w3c_all">Web组件</a>,一组目前在浏览器中不受良好支持的技术。Polymer，伴随着Polymer App工具，帮助开发者使用这些技术来建立web应用程序。</p>
<blockquote>
<p>Polymer是一个轻量级的库，帮你充分利用web组件 
使用Web组件，您可以创建可重用的自定义元素，这些元素与浏览器的内置元素进行无缝交互，或者将应用程序分解为大小合适的组件，使代码更简洁，维护成本更低。 
Polymer在标准的web组件上撒了一点糖，能够使你很轻松的得到很好的结果。</p>
</blockquote>
<p>Polymer项目的主要动机是推动web平台前进。Polymer团队有一个#UseThePlatform标签，他们在他们的About页面上解释：</p>
<blockquote>
<p>...在平台本身之外和之上做太多的事情是有代价的—开发者和用户都需要支付费用。开发人员的成本以复杂性和锁定的形式出现。</p>
<p>随着时间的推移，我们在平台之上构建的栈已经将web开发从简单的视图源和切换刷新推到一个每个项目都以巨大的海洋选择开始的地方。</p>
<p>由于有了新的原始web平台，现在平台本身就可以满足我们围绕平台构建的许多需求...</p>
<p>我们相信我们研究的模式、库和工具是有益的，并且我们是很开心的看到他们被广泛的采纳。但是我们的#UseThePlatform的活动最终并不是关于驱动人们使用Polymer项目构建的东西。它是关于推广使用web平台来交付尽可能最好的应用程序。</p>
</blockquote>
<p>如果您多年来一直关注谷歌为推广web平台所做的备受赞赏的努力，那么这些努力中的大部分将听起来耳熟能详，并与公司的其他努力保持一致。</p>
<h5>优点</h5>
<ul>
<li>强大的企业支持 (Google)</li>
<li>支持新兴的web标准</li>
</ul>
<h5>缺点</h5>
<ul>
<li>社区的沟通抱怨</li>
<li>差的浏览器支持限制了视觉的选项/实现</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://scotch.io/tutorials/build-a-real-time-polymer-to-do-app">创建一个真实的Polymer的To-Do应用</a></li>
<li><a href="https://www.polymer-project.org/1.0/start/">Polymer: 开始使用</a></li>
<li><a href="https://auth0.com/blog/build-your-first-app-with-polymer-and-web-components/">用Polymer创建自己的App以及Web组件</a></li>
<li><a href="https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/">Web组件的失信</a></li>
<li><a href="https://github.com/Polymer/project/issues/36">Polymer团队 - 我真的很沮丧</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Preact</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/7jomguCDTOAkI6w2gaI66I/dc569b96c927a004d72c343e0ac7a093/preact.png?w=100" alt="Preact logo">作者是詹森•米勒，<a href="https://preactjs.com/">Preact</a>是一个非常好的React替代品，注重小库的体积。Preact使用与React相同的API，并且与大部分生态系统兼容。</p>
<blockquote>
<p>Preact本身并不是要重新实施React。这里有一些差异。许多这些差异都是微不足道的，或者可以通过使用Preact -compat完全消除，这是一层薄薄的Preact层，试图达到与React 100%的兼容性</p>
<p>Preact不尝试包含React的每个特性的原因是为了保持小而专注——否则，简单地向React项目提交优化就更有意义了，该项目已经是一个非常复杂、架构良好的代码库。</p>
</blockquote>
<p>Preact被许多大型组织使用，包括Lyft、Pepsi和<a href="https://eng.uber.com/m-uber/">Uber</a>。尽管Preact启动性能(例如页面加载)比React要好，但在最新的基准测试中，React在加载页面之后更新UI的速度更快。</p>
<h5>优点</h5>
<ul>
<li>轻量</li>
<li>好的文档</li>
<li>React-兼容性</li>
</ul>
<h5>缺点</h5>
<ul>
<li>相比于React非常小的社区(但是有很多重叠，相互交织)</li>
<li>使用 <code>preact-compat</code>也许会影响性能</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://preactjs.com/guide/getting-started">开始入门</a></li>
<li><a href="https://blog.codeinfuse.com/getting-started-with-preactjs-a-step-by-step-guide-f3197f871753">开始使用PreactJS — 一步一步的指南</a></li>
<li><a href="https://blog.logrocket.com/introduction-to-preact-a-smaller-faster-react-alternative-ad5532eb6d79">Preact的介绍 — 一个小，快的React替代品</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Reason</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/3cubmjES7e8Ayo2Cmqi8OE/39815a267b449d151f0276c9b815340c/reason.png?w=100" alt="Reason logo">在某种方式上, <a href="https://reasonml.github.io/">Reason</a> 可以认为是React生态系统的一部分。Reason是一种语言上的语法。它可以编译成JavaScript，但也可以编译到程序集，用于构建桌面和移动应用程序。以下是文件的进一步解释：</p>
<blockquote>
<p>Reason不是一个新的语言；它是一种新的语法和工具链，由经过战斗测试的语言OCaml提供支持。Reason为OCaml提供了一种熟悉的面向JavaScript程序的语法，并且迎合了现有的人们已经知道的NPM/Yarn工作流...</p>
<p>由于我们的合作伙伴项目BuckleScript, 将OCaml/Reason编译成具有流畅互操作的可读JavaScript。由于OCaml本身，Reason也可以编译成快速的、光骨组装。</p>
</blockquote>
<p>Reason(有时被称为推理机)有一个伴生项目，<a href="https://reasonml.github.io/reason-react/">ReasonReact</a>：</p>
<blockquote>
<p>ReasonReact是一种更安全、更简单的构建React组件的方式。</p>
<p>通过利用后者强大的类型系统、表达性的语言特性和与JS的流畅互操作性，ReasonReact将ReactJS的特性变成了一个API，即：</p>
<ul>
<li>安全和静态类型 </li>
<li>简单和精益</li>
<li>熟悉和容易插入到现有的ReactJS代码库。</li>
<li><p>经过深思熟虑(由ReactJS的创造者自己做的!)  </p>
<p>人们常说，编写ReactJS代码就像“使用JavaScript”。同样的道理也适用于ReasonReact，但我们进一步推动它；编写路由、数据管理、组件组合和组件本身感觉就像“仅仅使用Reason”。</p>
</li>
</ul>
</blockquote>
<h5>优点</h5>
<ul>
<li>强大的企业支持 (Facebook)</li>
<li>好的文档</li>
<li>通用性</li>
<li>对React开发者很熟悉</li>
</ul>
<h5>缺点</h5>
<ul>
<li>非常新??</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://medium.com/@rlucha/reasonml-first-impressions-79f81ccfcf19">ReasonML第一印象</a></li>
<li><a href="https://reasonml.github.io/reason-react/docs/en/installation.html">ReasonReact文档</a></li>
<li><a href="https://stackoverflow.com/questions/46147250/reasonml-vs-typescript">ReasonML大战TypeScript</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Svelte</h3>
<p><img src="https://images.contentful.com/f42iyx0drm0u/6gU9pBmwc8ysGgomkCCemw/93d06b4522399f515c7c532e41901079/svelte.png?w=100" alt="Svelte logo">作者是Rich Harris, <a href="https://github.com/sveltejs/svelte">Svelte</a> 采取了独特的方法。它在构建时编译您的应用程序，这样您就可以交付最轻量级的代码。从文档：</p>
<blockquote>
<p>...Svelte有一个重要的不同之处：不是在运行时解释应用程序代码，您的应用程序在构建时被转换成理想的JavaScript。这意味着你不需要支付框架抽象的性能成本，或者当你的应用程序第一次加载时，你会受到惩罚。</p>
<p>同时因为没有开销，您可以在现有的应用程序中逐步采用Svelte，或者将小部件作为独立的包发布到任何地方。</p>
</blockquote>
<p>一个与Svelte相关的有趣项目是<a href="https://sapper.svelte.technology/">Sapper</a>，在一定程度上与<a href="https://learnnextjs.com/">Next.js</a>类似的框架，但是更加强调性能。</p>
<blockquote>
<p>Sapper是一个用于构建高性能web应用的框架……有两个基本概念：</p>
<ul>
<li>应用程序的每一页都是一个Svelte的组件</li>
<li>您可以通过将文件添加到项目的路径目录来创建页面。这些将通过服务器呈现，以便用户第一次访问您的应用程序时尽可能快，然后由客户端应用程序接管</li>
</ul>
<p>用所有现代的最佳实践——代码拆分、脱机支持、使用客户端水化的服务器呈现视图——构建一个应用程序极其复杂。Sapper为你做了所有无聊的事情，这样你就可以继续进行创造性的部分。</p>
</blockquote>
<h5>优点</h5>
<ul>
<li>快速并且轻量级</li>
<li>好的文档</li>
<li>创新</li>
</ul>
<h5>缺点</h5>
<ul>
<li>很小的社区 </li>
<li>非常新(但是有前途！)</li>
</ul>
<h5>其它的资源</h5>
<ul>
<li><a href="https://svelte.technology/guide">Svelte指南</a></li>
<li><a href="https://survivejs.com/blog/svelte-interview/">Svelte - 神奇消失的UI框架-采访Rich Harris</a></li>
<li><a href="https://www.infoworld.com/article/3146966/javascript/slim-speedy-svelte-framework-puts-javascript-on-a-diet.html">Slim、快速的Svelte框架将JavaScript置于平衡之中</a></li>
<li><a href="https://svelte.technology/blog/frameworks-without-the-framework">没有框架的框架：为什么我们不早点想到这个呢?</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h2>剩下的包</h2>
<p>这里有一些很有趣的框架。其中一些是单个开发人员的产品，而另一些则拥有强大的社区，有大量的贡献者和企业赞助。</p>
<p>如果你是作者或者这些项目里面的贡献者，想要提供更多或者更新信息，请 <a href="https://twitter.com/__jhannah">联系我</a>.  </p>
<h3>Binding.scala</h3>
<p>Binding.scala 是一种用Scala编写的单向数据库，尽管它同时针对JavaScript和JVM。从<a href="https://github.com/ThoughtWorksInc/Binding.scala">文档</a>:</p>
<blockquote>
<p>Binding.scala可以在web和桌面GUI开发中用作reactive模板语言。它使您能够使用本地XHTML文字语法来创建reactive的DOM节点，这些节点能够在数据源发生更改时自动更改…绑定。scala比其他的reactive web框架(如ReactJS)有更多的特性和更少的概念。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://blog.scalac.io/binding-scala.html">使用Binding.scala轻松创建UI</a></li>
<li><a href="http://todomvc.com/examples/binding-scala/#/">Binding.scala Todo MVC</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Bobril</h3>
<p><a href="http://bobril.com/">Bobril</a> 从React和<a href="#mithril">Mithril</a>中获取灵感，从文档中：</p>
<blockquote>
<p>它是很快的，基于虚拟DOM渲染的小体积框架。主要关注代码生成的速度和简单性……任何页面的内容和行为都可以通过组合JavaScript对象来定义。</p>
<p>页面内容呈现基于对虚拟dom的比较。应用程序具有一定的时间状态，bobril应用程序根据该状态生成虚拟DOM。虚拟DOM是最终DOM的对象表示。如果发生了一些状态更改事件，并且之前的虚拟DOM与当前生成的虚拟DOM不同，那么实际的DOM将根据此更改而更改。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://www.codeproject.com/Articles/1044425/Bobril-I-Getting-Started">Bobril - I -开始使用</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Choo</h3>
<p><a href="https://choo.io/">Choo</a> 是用于构建用户界面的函数库。它很小(4KB)，支持服务器渲染。Choo哲学:</p>
<blockquote>
<p>我们认为框架应该是一次性的，组件应该是可回收的。我们不想要一个有围墙的花园相互竞争的网络。通过使DOM成为最小公分母，从一个框架切换到另一个框架将变得无摩擦。Choo在设计上很谦虚；我们不相信它会永远排在全班第一，所以我们把它弄得既容易又容易收拾。我们希望团队中的每个人，无论大小，都能充分理解应用程序是如何布局的。一旦构建了应用程序，我们希望它很小，性能好，易于推理。所有这些都使得调试代码、更好的结果和超级笑脸变得容易。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://yoshuawuyts.gitbooks.io/choo/content/02_your_first_app.html">你的第一个app</a></li>
<li><a href="https://www.sitepoint.com/functional-programming-choo/">有趣的函数式编程与Choo框架</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Cycle.js</h3>
<p>作为“可预测代码的功能和reactive JavaScript框架”<a href="https://cycle.js.org/">Cycle.js</a>主要是<a href="https://twitter.com/andrestaltz">Andre Staltz</a>的工作。它有超过100个贡献者和企业赞助。从文档：</p>
<blockquote>
<p>Cycle的核心抽象是您的应用程序作为一个纯函数main()，其中输入来自外部世界的读效果(源)，输出(汇聚)是影响外部世界的写效果。外部世界中的这些I/O效果由驱动程序管理：处理DOM效果、HTTP效果等的插件。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://egghead.io/courses/cycle-js-fundamentals">Cycle.js的基本原理</a> (free video course)</li>
<li><a href="https://alligator.io/cyclejs/intro-to-cycle-js/">简单介绍一下Cycle.js</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>DIO</h3>
<p><a href="https://dio.js.org/">DIO</a> 是一个轻量级(7KB)的声明式UI库，提供了一种响应的替代方法：</p>
<blockquote>
<p>这里有很多小细节，让它的边缘不再触及新的API，而是创建一个更大的表面积，它已经支持并添加了这个。</p>
<p>例如，React可以渲染字符串、数字、元素和组件，但如果它能渲染Promises或回调呢?这将有助于解决大量的“问题”，数据抓取和延迟加载是可能的，但并没有在库级别上进行声明性的激励。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://dio.js.org/misc/comparison.html">DIO与React的对比</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Dojo</h3>
<p><a href="https://dojo.io/">Dojo</a>背后的一个重要原则是易访问性，这使我认为它是政府和高等教育项目的潜在候选者，这些项目通常都有严格的合规要求。从网站：</p>
<blockquote>
<p>Dojo 2基于这样的信念：在线可访问性与物理环境中的可访问性一样重要，两者的架构师都有相同的责任来提供对所有人的访问……所有的Dojo 2小部件都被设计为可以在默认情况下访问，并且满足WCAG标准所需的任何已经集成到@dojo/widget-core和@dojo/widgets工具中。</p>
</blockquote>
<p>国际化是另一个重点领域：</p>
<blockquote>
<p>国际化(i18n)是将应用程序与特定语言或文化分离的过程，是大多数企业应用程序的主要需求。因此，国际化是Dojo 2的核心关注点之一。Dojo /i18n, Dojo 2的国际化生态系统，提供了国际化和本地化应用程序所需的一切，从特定于本地的消息传递到日期、数字和单元格式。</p>
</blockquote>
<p>像Angular，Dojo将TypeScript作为它的开发语言。</p>
<h5>其它的资源</h5>
<ul>
<li><a href="https://www.sitepen.com/blog/2016/08/24/the-long-and-winding-road-to-dojo-2/">通往Dojo2的漫长而曲折的道路</a></li>
<li><a href="https://skillsmatter.com/skillscasts/7522-an-in-depth-introduction-to-dojo-2">Dojo 2的深入介绍</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Domvm</h3>
<p><a href="http://leeoniya.github.io/domvm/">Domvm</a>是一个"小，快，相互间无依赖的vdom视图层"。像Vue，它可以作为jQuery的替代品使用。与React很类似，它将关注点放在视图之外的其他库中(但是提供了一个很好的选项列表)。从文档：</p>
<blockquote>
<p> domvm很灵活，pure-js视图层用于构建高性能web应用程序。像jQuery，它将愉快地适合任何现有的代码库，而无需引入新的工具或需要进行重大的架构更改...作为视图层，domvm并没有包含一些你在大框架里面发现的东西。这使您可以自由地为常见任务选择您已经知道或喜欢的libs第三方框架。domvm为路由、流和不变的libs集成提供了一个小的、通用的表面。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://www.reddit.com/r/javascript/comments/5m70ex/reacts_tictactoe_demo_using_domvm/">React的井字游戏demo用的是domvm</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Etch</h3>
<p>尽管<a href="https://github.com/atom/etch">Etch</a>能够被前端web应用程序使用，它的目标用途是在Atom包和电子桌面框架中。从文档：</p>
<blockquote>
<p>Etch是一个用于编写基于html的用户界面组件的库，它提供了虚拟DOM的便利性，同时力求最小化、互操作和显式。Etch可以在任何地方使用，但它是想特别设计与原子包和电子应用。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://arcath.net/2017/05/etch-router/">Etch路由</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Gruu</h3>
<p><a href="https://gruujs.com/">Gruu</a>是一种相对较新的Marek Łabuz框架。从Marek的文章介绍Gruu：</p>
<blockquote>
<p>我相信没有哪个存在的库是完美的。每当一个库/框架被创造，一些新的想法就会被覆盖。无论这个新库是好还是坏。它总是会带来一些有价值的独特的东西。</p>
<p>许多前端库依赖于每次发生变化时调用的呈现函数，无论变化会影响什么。它导致应用程序的部分不必要的呈现，但我们仍然需要检查它，因为我们不确定……Gruu去掉了渲染函数。相反，它只在开始时呈现一次，然后它只改变视图的这部分，而实际上在没有呈现整个组件的情况下，它实际上已经改变了。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://medium.com/@lmrk/creating-web-applications-in-gruu-ab68737d34e5">Gruu创造单页面应用</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Glimmer</h3>
<p><a href="https://glimmerjs.com/">Glimmer</a>是Ember生态系统的一部分，甚至使用Ember CLI管理项目。正如在讨论Ember时提到的，它是一个大型框架。Glimmer为Ember开发人员提供了一个轻量级的用于创建单页面应用程序的选项。如果需要的话，闪光组件可以直接投到Ember中，而不会出现问题。</p>
<h5>其它的资源</h5>
<ul>
<li><a href="https://medium.com/@tomdale/glimmer-js-whats-the-deal-with-typescript-f666d1a3aad0">Glimmer.js: TypeScript是怎么回事?</a></li>
<li><a href="https://simplabs.com/blog/2017/08/28/creating-web-components-with-glimmer.html">Glimmer来创造web组件</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Hyperapp</h3>
<p>以非常纤细的1KB的速度进来，<a href="https://hyperapp.js.org/">Hyperapp</a> 
Coming in at a very slender 1KB, [Hyperapp]是一个具有最低限度API的库。但是，它支持服务器渲染。Hyperapp做法：</p>
<blockquote>
<p>Hyperapp是一个JavaScript库来创建web应用程序</p>
<p>最小化：Hyperapp的诞生是为了用更少的资源做更多的事情。我们积极地最小化了您需要理解的概念，同时保持与其他框架相同的功能。</p>
<p>功能： Hyperapp的设计灵感来自Elm架构。使用功能范例创建可伸缩的基于浏览器的应用程序。问题是你不需要学习一门新的语言。</p>
<p>batteriers - Out of the box, Hyperapp结合了状态管理和支持键控更新和生命周期事件的VDOM引擎——所有这些都没有依赖关系。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://glebbahmutov.com/blog/pure-programming-with-hyper-app/">纯编程与超应用</a></li>
<li><a href="https://survivejs.com/blog/hyperapp-interview/">HyperApp—用于前端应用程序的微型库—访问Jorge Bucaran</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Hyperdom</h3>
<p>以前命名为Plastiq， <a href="https://github.com/featurist/hyperdom">Hyperdom</a>是一个“快速、特性丰富的构建动态浏览器应用程序的虚拟dom框架”。从文档：</p>
<blockquote>
<p>Hyperdom应用程序由常规的JavaScript对象组成，这些对象用render()方法表示应用程序的状态，这些方法定义如何在HTML中表示该状态。Hyperdom支持一个简单的事件-更新-呈现周期，承诺异步操作、JSX、非JSX、客户端路由、SVG、双向数据绑定，并优化应用程序架构的性能、开发人员可用性和简洁性。</p>
</blockquote>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>hyperHTML</h3>
<p>框架不可知，<a href="https://viperhtml.js.org/">hyperHTML</a>被创建为“简化DOM性能最佳实践……”是100%的ECMAScript兼容，重量小于4Kb”。介绍性的文章：</p>
<blockquote>
<p>它只不过是一个函数，与DOM节点和片段作为上下文绑定在一起。您可以绑定一次目标节点，如果您不介意的话，可以绑定更多节点，并且只需简单地传递新数据，就可以一次又一次地呈现相同的模板文本。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://medium.com/@WebReflection/hyperhtml-a-virtual-dom-alternative-279db455ee0e">hyperHTML：虚拟DOM替代</a></li>
<li><a href="https://medium.com/@WebReflection/new-in-hyperhtml-v1-b951a9233557">新hyperHTML v1</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Ivi</h3>
<p><a href="https://github.com/ivijs/ivi">Ivi</a>文档指出，虽然Ivi很小，但是大小在优先事项列表的底部：</p>
<blockquote>
<p>看起来现在javascript社区的许多人都被洗脑了，小的库大小是快速性能和简单实现的同义词。实际上，它通常意味着库使用不同的技巧来减少代码的大小，方法是使用不适当的数据结构(较低的性能)、在运行时初始化数据结构(较低的引导性能)、为许多不同的数据类型重用代码(较低的性能)等等。</p>
<p>ivi图书馆的图书馆大小在优先次序列表的底部：</p>
<ul>
<li>正确性</li>
<li>一致性/可预测的行为</li>
<li>性能/开发经验</li>
<li>图书馆的规模</li>
</ul>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://github.com/ivijs/todomvc/">Ivi Todo MVC</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Knockout</h3>
<p>使用MVVM模式，<a href="http://knockoutjs.com/">Knockout</a>是一个已经存在了一段时间的库。从文档：</p>
<blockquote>
<p>Knockout是JavaScript MVVM (MVC的一种现代变体)库，可以更容易地使用JavaScript和HTML创建丰富的、类似桌面的用户界面。它利用观察者使UI自动与底层数据模型保持同步，并使用一组强大的、可扩展的声明性绑定来支持生产性开发。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="http://learn.knockoutjs.com/#/?tutorial=intro">学习Knockout</a></li>
<li><a href="https://stackoverflow.com/questions/5101113/whats-the-difference-between-knockout-js-and-rx-js">Knockout.js and Rx.js之间有何区别?</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Maquette</h3>
<p><a href="https://maquettejs.org/">Maquette</a> 是一个轻量级(3KB)库，灵感来自于React, Mithril和Mercury：</p>
<blockquote>
<p>Maquette是一个虚拟的DOM实现，它的速度和简单性都非常出色。它解决了保持用户界面与底层数据同步的问题。</p>
<p>Maquette允许使用普通Javascript指定UI。这使得maquette易于学习、易于调试和易于部署。Maquette不受设计的影响，尽可能不费力地与其他框架和库集成。</p>
</blockquote>
<p>虽然这不是默认设置，但是您可以使用带有Maquette的TypeScript。</p>
<h5>其它的资源</h5>
<ul>
<li><a href="https://maquettejs.org/tutorial/01-intro.html">The Maquette指南</a></li>
<li><a href="https://medium.com/maquette-news/maquette-with-typescript-quick-start-ac63149fc971">Maquette和Typescript快速启动</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Marko</h3>
<p>eBay开源产品<a href="https://markos.com/">Marko</a>是一个强调UI性能的被动前端框架。与Vue类似，您可以使用包含组件逻辑、模板和CSS的单个文件组件。</p>
<p>这里引用了Marko vs React首席开发者Patrick Steele-Idem的一句话：</p>
<blockquote>
<p>虽然Marko的许多特性都受到了React的启发，但Marko和React提供了非常不同的可用性和性能特征。Marko设计的目的是避免几乎所有的样板文件，并且与HTML更紧密地结合在一起。在几乎所有的情况下，Marko UI组件需要的代码行都少于其与React JSX等效的代码行，同时保持可读性并允许与JSX具有相同的表达性。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://hackernoon.com/marko-vs-react-an-in-depth-look-767de0a5f9a6">Marko vs React： 深入透析</a></li>
<li><a href="https://markojs.com/docs/color-picker/">建立一个颜色拾色器的组件</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Mithril</h3>
<p><a href="https://mithril.js.org/">Mithril</a>是一个lighweight框架。与React不同，它包含用于路由、XHR和状态管理的功能。虚构的Mithril：</p>
<blockquote>
<p>为什么使用Mithril？在某种意义上：因为Mithril是务实的。这10分钟指南就是一个很好的例子：这就是学习组件、XHR和路由所需的时间—这差不多就是构建有用应用程序所需的知识。</p>
<p>Mithril都是关于有效地完成有意义的工作。文件上传干什么?文档会告诉你怎么做。身份验证?记录。退出动画吗?你明白了。没有额外的库，没有魔法。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://isomorphic-mithril.mvlabs.it/en/">具有Mithril.js的同构web应用程序</a></li>
<li><a href="https://www.youtube.com/watch?v=tNMiCr39Fx0">Mithril - 你从未听说过的最小框架</a> (YouTube)</li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a></p>
<h3>Moon</h3>
<p>一个小的(7KB)库，<a href="http://moonjs.ga/">Moon</a>将自己定位为React、Vue和Mithril的替代品。</p>
<blockquote>
<p>Moon是一个用于构建用户界面的小型、快速的库。它将流行的库的优点集成到一个小包中。它是超轻量的，并且包含高级优化以确保快速渲染时间。这个API很小，很直观，但是仍然很强大。Moon与IE9+兼容。</p>
<p>是的，最近发布了很多前端库，很多人喜欢这些库的不同部分。例如，React提供了使用JSX和使用虚拟DOM的能力，angle提供了易于使用的指令，Ember提供了内置的一个不错的模板引擎。</p>
<p>Moon旨在将这些库中最好的部分合并到一个单独的、轻量级的包中，同时提供更好的性能。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://sabe.io/tutorials/getting-started-with-moon-js">开始使用Moon.js</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Nerv</h3>
<p>(Nerv)(<a href="https://nerv.aotu.io/)是中国的新框架。它标榜自己是“快速React的替代品，与IE8兼容，React16”。实际上，只需在webpack配置中添加一个别名，就可以将React应用程序转换为Nerv。所有这些以及4.4">https://nerv.aotu.io/)是中国的新框架。它标榜自己是“快速React的替代品，与IE8兼容，React16”。实际上，只需在webpack配置中添加一个别名，就可以将React应用程序转换为Nerv。所有这些以及4.4</a> KB的库大小。</p>
<p>因为它太新了，并且声称拥有卓越的性能vs React  — React团体的一些成员要求澄清这些说法，以及关于Nerv的更多信息。从作者的回答:</p>
<blockquote>
<p>依我拙见，与preact，Inferno, and Nerv最大不同之处，不是像实现React特性的正确方法那样的技术问题。它是关于一个库想要达到的目标。在preact中，他们可能只是想要一个lite库，Inferno想要尽可能快，React只想要额外的兼容性，他们都需要一个compat模块来实现这一点。但是对于Nerv来说，与React兼容是我们的主要目标，通过这样做，我们可以牺牲性能和规模。</p>
<p>彼得·米基什的批评是正确的。Nerv无法通过React fiber(16) 100%的单元测试，这是可以预测的——React团队要花整整一年的时间才能达成目标，两个不知从哪里来的家伙(Hacker news上某个家伙说)怎么可能做到这一点呢?</p>
<p>所以，权衡是什么?显然，一些第三方的React组件/库不能在Nerv中正常工作。但是哪一个呢?老实说，我不知道。我很高兴听到你这样说。js的下一个新闻开始了第一次尝试。但与此同时，基准标签在Firefox(修复)中无法工作——所有这些，如果我们不公开的话，我们都不知道。</p>
<p>冰冻三尺，非一日之寒。Nerv不是完美的，没有库，特别是在早期阶段，可能还有很多我们不知道的bug。所以我们决定开源，上市，我们需要社区的帮助，我们需要你的帮助。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://github.com/NervJS/nerv/issues/10">什么是权衡?</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>NX</h3>
<p>NX是RisingStack的JavaScript工程师Bertalan Miklos的成果。(NX)(<a href="https://github.com/nx-js/framework)的文档：">https://github.com/nx-js/framework)的文档：</a></p>
<blockquote>
<p>NX是一个模块化的前端框架——由ES6和Web组件构建。NX的构建块是核心、中间件、组件和实用程序。这些都托管在单独的GitHub repos和npm包中。</p>
<p>NX核心是一个很小的库，只负责一件事。它允许您创建无声组件并使用中间件来增强它们。当组件附加到DOM时，它将执行它的中间件，并从中获得所有额外的功能。NX提供了一些现成的核心中间件，您可以在下面找到。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://blog.risingstack.com/writing-a-javascript-framework-project-structuring/">编写javascript框架 - 项目结构</a></li>
<li><a href="https://github.com/nx-js/todomvc-example">TodoMVC</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>petit-dom</h3>
<p>Yassine Elouafi是性能基准测试中速度最快的人之一， <a href="https://github.com/yelouafi/petit-dom">petit-dom</a>采用了一种极简主义的方法:</p>
<blockquote>
<p>Diff algroithm基于<a href="https://neil.fraser.name/writing/diff/">https://neil.fraser.name/writing/diff/</a>
所描述的预优化和论文《An O(ND)差分算法及其变化》中提出的算法。还有一篇优秀的文章解释了算法的工作原理。本文包含一个GUI应用程序来处理该算法。</p>
</blockquote>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Picodom</h3>
<p><a href="https://github.com/picodom/picodom">Picodom</a>有趣的是，它是由<a href="# Hyperapp">Hyperapp</a>的作者Jorge Bucaran所写。Picodom是一个“1kb VDOM构建器和补丁函数”，可以用来构建自己的框架：</p>
<blockquote>
<p>Picodom支持键控更新和生命周期事件——都没有依赖项。与您喜欢的状态管理库或创建您自己的自定义视图框架混合使用。</p>
</blockquote>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Pux</h3>
<p><a href="http://purescript-pux.org/">Pux</a> 是一个使用<a href="http://www.purescript.org/">PureScript</a>的框架，这是一种强类型的函数式编程语言，遵从JavaScript。目前性能存在以下问题：</p>
<blockquote>
<p>缓慢的性能来自于翻译Pux的(smolder)虚拟DOM以React的虚拟DOM。目标是为smolder编写一个purescript虚拟DOM模块，这样可以避免转换步骤，并且可以针对一元数据结构进行优化。我怀疑这将达到与Halogen同等的性能。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://github.com/alexmingoia/purescript-pux/tree/master/examples/">Pux例子</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Ractive.js</h3>
<p><a href="https://ractive.js.org/">Ractive</a>最初是为在卫报网站上使用而创建的，是一个被动的、模板驱动的UI库：</p>
<blockquote>
<p>与其他框架不同，Ractive为您工作，而不是反过来。它对您想要使用的其他工具没有意见。它还适用于您希望采用的方法。你不会固守于特定框架的思维方式。如果你出于某种原因讨厌你的一个工具，你可以很容易地用它换另一个，然后继续向生活前进。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://ractive.js.org/tutorials/hello-world/">你好, 世界!</a></li>
<li><a href="http://todomvc.com/examples/ractive/">Todo MVC</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>react-lite</h3>
<p>旨在成为轻量版的React，<a href="https://github.com/lucifier129 /react-lite">react-lite</a>是“针对小脚本尺寸的React的实现。”从文档：</p>
<blockquote>
<p>当您不需要浏览器中的服务器端呈现时(不需要任何React。renderToString &amp; ReactDOM.renderToStaticMarkup)，React-lite支持响应的核心api，如虚拟DOM，作为React的替代。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://survivejs.com/blog/react-lite-interview/">react-lite - 小尺寸优化React的实现——Jade访谈</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>RE:DOM</h3>
<p>作者是Juha Lindstedt，<a href="https://redom.js.org/">RE:DOM</a>是一个小(2KB)并且很快的UI框架。事实上，它是最新的基准测试中表现最好之一。从网站：</p>
<blockquote>
<p>RE:DOM是Juha Lindstedt和贡献者创建的一个小(2 KB) DOM库，它添加了有用的助手来创建DOM元素并使它们与数据保持同步。</p>
<p>因为RE:DOM与金属非常接近，而且不使用虚拟DOM，所以它实际上比几乎所有基于虚拟DOM的库(包括React (benchmark))更快，占用的内存也更少。</p>
<p>它是很容易的使用RE:DOM来创造重复使用的组件。</p>
<p>另一个好处是，你可以使用纯粹的JavaScript,因此不需要学习复杂的模板语言。另外，RE:DOM和其他人相处得很好。不需要为谷歌映射之类的东西编写包装器。</p>
</blockquote>
<h5>其它的资源</h5>
<p><a href="https://redom.js.org/documentation/">文档指南</a></p>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Reflex</h3>
<p>作者Irakli Gozalishvili， <a href="https://github.com/mozilla/reflex">Reflex</a>是一个深受Elm启发的库:</p>
<blockquote>
<p> Reflex是一个功能性的、reactive的UI库，深受elm(基本上是elm的一个端口)的启发，它的架构非常简单，但是非常强大，响应式中的“flux”只是模式的副产品。为了保持elm -代数数据类型和类型安全的主要吸引力，库使用了流，JS的静态类型检查器。所有类型都与实现分离，因此，如果您想利用它或忽略它，就需要调用它。</p>
</blockquote>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Riot</h3>
<p><a href="http://riotjs.com/">Riot</a>文档直入主题:</p>
<blockquote>
<p>前端的空间确实很拥挤，但我们真的觉得解决方案仍然“在那里”。我们相信Riot提供了正确的平衡来解决这个大难题。React公司似乎做到了这一点，但它们有一些严重的弱点，Riot会解决。</p>
</blockquote>
<p>Riot的一个主要特性是自定义标记(它看起来很像Vue单个文件组件):</p>
<blockquote>
<p>自定义标记将相关的HTML和JavaScript粘合在一起，形成一个可重用的组件。像React + Polymer，但有愉快的语法和一个小的学习曲线。</p>
</blockquote>
<p>同时...</p>
<blockquote>
<p>Riot是每个人的组件。像React + Polymer但没有膨胀。它使用起来很直观，而且重量几乎为零。今天，它的工作原理。不是重新发明轮子，而是利用现有的好的部分，使最简单的工具成为可能。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="http://riotjs.com/play/">鲜活的demo</a></li>
<li><a href="http://tutorials.jenkov.com/riotjs/index.html">Riot.js指南</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>rxdomh</h3>
<p>尽管很有趣，<a href="https://github.com/xialvjun/rx-domh">rxdomh</a>有非常丰富的项目。它是受<a href="#binding">Binding.scala</a> 和react-flyd启发的。</p>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>San</h3>
<p><a href="https://ecomfe.github.io/san/">San</a>是来自中国开发者的另一个项目。它的文档是中文，但是Chrome提供了很好的翻译：</p>
<blockquote>
<p>San, 是一个MVVM组件框架。它的体积是(12K)，好的兼容性(IE6)，高性能是实现响应性用户界面的可靠而可靠的解决方案。</p>
<p>San同时还支持data-to-view绑定指令,在业务发展最常用的分支,循环指令,等除了支持所有本机HTML，通过声明的语法特性类似HTML视图模板，保持充分利用的基础上，基于模板字符串解析完整的框架，并建立一个视图层节点的关系树，生成的用户界面视图快速视图的高性能引擎。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://ecomfe.github.io/san/tutorial/start/">San指南</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Simulacra.js</h3>
<p>可以说，没有其他框架的API比<a href="https://simulacra.js.org/">Simulacra</a>更小：</p>
<blockquote>
<p>Simulacra.js当一个对象发生改变时， 返回一个Dom节点。它的API是一个函数，不引入任何新的语法或模板语言。它递归地将元编程特性添加到普通的数据结构中。</p>
<p>这是一个相当低成本的抽象，尽管它可能没有手工优化的代码那么快。这个库的大致大小约为5kb(缩小和gzipped)。</p>
</blockquote>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Slim.js</h3>
<p>作者Avichay Eyal，<a href="https://github.com/eavichay/slim.js">Slim.js</a> 是一个轻量级web组件创作库:</p>
<blockquote>
<p>Slim.js是一个快速开发本地web组件和基于定制元素的现代应用程序的库。涉及任何魔法。它使用了es6+DOM原生API，并用超能力增强了HTML元素。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="http://slimjs.com/#/getting-started">文档指南</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Stem JS</h3>
<p>作者Mihai Ciucu, <a href="https://stemjs.org/">Stem JS</a>是试图不成为框架的框架：</p>
<blockquote>
<p>语法可能看起来很熟悉，但是Stem是为单个组件而不是框架而设计的……</p>
<p>不管您的项目有100或100k行代码，Stem都是以代码可维护性为主要目的进行设计的。</p>
<p>我们也不喜欢库迫使程序员跳过一些障碍，对它进行任何非标准的更改，因此所有东西都设计得很容易修改。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://stemjs.org/blog/another_javascript_framework/">另一个Javascript框架</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Surplus</h3>
<p>在性能基准测试中，<a href="https://github.com/adamhaile/surplus">Surplus</a>非常快。它也有一个不同的方法，利用S.js:</p>
<blockquote>
<p>Surplus是一个编译器和运行时允许S.js应用程序，使用JSX创建高性能web视图。得益于JSX，视图是UI的明确的声明性定义。多亏了S，当你的数据发生变化时，它们会自动有效地更新。 </p>
</blockquote>
<p>同时...</p>
<blockquote>
<p>Surplus不是一个React“相似工作”，但是它使用React流行的JSX语法来定义它的视图……JSX减轻了采用(或放弃)Surplus的一些风险。许多多余的JSX代码已经作为无状态函数组件来工作，反之亦然。Surplus可以避免任意的差异，并在可行的情况下做出反应。</p>
</blockquote>
<h5>与React不同之处:</h5>
<ol>
<li>Surplus使真正的DOM元素，而不是虚拟的，它们自动更新。这将删除大部分React API。</li>
<li>ref属性接受可指定的引用，而不是函数。</li>
<li>事件是本地事件，而不是响应的合成事件。</li>
<li>对于它接受的属性名，Surplus稍微宽松一些，比如onClick/ onClick、className/class等。</li>
</ol>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Thermite</h3>
<p><a href="https://github.com/paf31/purescript-thermite">Thermite</a>是另一个使用<a href="http://www.purescript.org/">PureScript</a>(编译为JavaScript的函数语言)的库。从文档:</p>
<blockquote>
<p>它没有提供React的所有功能，而是为其API中最常用的部分提供了一个干净的API。对于更特殊的用例，可以使用purescript-react。</p>
</blockquote>
<h5>其它资源</h5>
<ul>
<li><a href="https://github.com/tfausak/purescript-thermite-example">App样例</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>TSERS</h3>
<p><a href="https://github.com/tsers-js/core">TSERS</a>表示反应流的转换信号-执行器框架。从文档:</p>
<blockquote>
<p>在JavaScript疲劳的时代，新的JS框架如雨后春笋般冒了出来，每个框架都提供了一些新的革命性的概念。所以势不可挡!这就是为什么要创建TSERS。它没有提供任何新的东西。相反，它结合了一些旧的和众所周知的技术/概念，并将它们打包成适合现代web应用程序开发的单一紧凑的形式。</p>
<p>从技术上讲，与TSERS最接近的是Cycle.js,但概念上最近的一个是CALM^2。大约可以是说TSERS试图结合优秀的状态一致性维护策略，从CALM^2和明确的输入/输出门的周期中——来自两个世界中最好的。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://github.com/tsers-js/examples">TSERSful样例</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Vidom</h3>
<p>作者Filatov Dmitry, <a href="https://github.com/dfilatov/vidom">Vidom</a>是另一个受React启发的库：</p>
<blockquote>
<p>Vidom只是一个用来构建UI的库。它的灵感来自于“React”，基于同样的想法。它的主要目标是用与React相似的API尽可能快地提供轻量级实现。</p>
</blockquote>
<h5>其它的资源</h5>
<ul>
<li><a href="https://github.com/dfilatov/vidom/wiki/Tutorial">指南</a></li>
<li><a href="https://github.com/dfilatov/vidom-todomvc">开始MVC</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a>  </p>
<h3>Vuera</h3>
<p><a href="https://github.com/akxcv/vuera">Vuera</a>是一个不同寻常的库。它允许您在Vue中使用React组件，反之亦然。预期的用例是在React和Vue之间进行迁移或在单个项目中同时使用这两个框架时使用的用例。</p>
<h5>其它的资源</h5>
<ul>
<li><a href="https://x-team.com/blog/react-vue-component-integration/">在一个应用程序中集成React和Vue组件</a></li>
</ul>
<p>⬆️ <a href="#top">返回顶部</a></p>
<p>Hey!你一路下来的!如果你喜欢这篇文章，那就订阅我的每周时事通讯吧。我从网上收集了最好的JavaScript代码，并在每周四向读者发布。注册表格就在这篇文章下面。</p>
<p>下次再续，快乐编程...</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/the-ultimate-guide-to-javascript-frameworks](https://www.zcfy.cc/article/the-ultimate-guide-to-javascript-frameworks)
原文标题: JavaScript框架终极指南
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
