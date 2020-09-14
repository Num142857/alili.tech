---
title: '我们是如何构建Twitter Lite的' 
date: 2019-01-25 2:30:23
hidden: true
slug: 84ezp8lesnv
categories: [reprint]
---

{{< raw >}}

            <p>非常激动向大家介绍 <a href="https://blog.twitter.com/2017/introducing-twitter-lite/">Twitter Lite</a> ，一个已经能在<a href="https://mobile.twitter.com/">mobile.twitter.com</a>上体验的<a href="https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/">渐进式网页应用</a>。 Twitter Lite速度更快，应用了响应式设计，流量消耗更少，占用的存储空间也更小，并且在现代浏览器中支持消息推送和离线使用。网页正在逐渐成为一个承载按需使用、安装简易、渐进更新的轻量级应用的平台。近几年我们逐渐采用了新的、开放的网页端API，极大提升了网页应用的性能和用户体验。</p>
<h4>架构纵观</h4>
<p>Twitter Lite包括一个客户端的JavaScript应用和一个简单的<a href="https://nodejs.org/en/">Node.js</a>服务器。服务器负责处理用户验证，绘制应用的初始状态，并渲染出应用的初始HTML结构。一旦浏览器完成初次加载，应用会直接从Twitter API请求数据。这种基本架构的简单性帮助我们提供了出色的大规模的可靠性、高效性服务——Twitter Lite比起服务端渲染的桌面网站运行起来消耗更少。</p>
<p>在客户端JavaScript应用的开发、构建和测试中，我们使用了非常多的开源框架，包括<a href="https://facebook.github.io/react/">React</a>, <a href="http://redux.js.org/">Redux</a>, <a href="https://github.com/paularmstrong/normalizr">Normalizr</a>, <a href="https://github.com/globalizejs/globalize">Globalize</a>, <a href="https://babeljs.io/">Babel</a>, <a href="https://webpack.js.org/">Webpack</a>, <a href="https://facebook.github.io/jest/">Jest</a>, <a href="http://webdriver.io/">WebdriverIO</a>, and <a href="https://yarnpkg.com/">Yarn</a>。依托着已经成熟的开源软件，我们有了更多的时间去提升用户体验，提高迭代速度和解决一些Twitter中现存的问题，比如定制化和操控时间线和推中包含的数据。</p>
<p>我们书写现代化的JavaScript（ES2015及以后），然后由Babel编译，Webpack打包。API返回的数据在被送往不同的Redux模块之前，首先由Normalizr处理——我们能够删除重复数据并将数据转换成多种格式——之后则用于取出、存储、取回远程和本地数据。UI由数以百计的React组件构成，这些组件负责从小到渲染文本，大到管理虚拟列表、懒加载模块和延迟渲染的所有事务。Twitter Lite支持42种语言，我们用Globalize来定制化数字、日期和信息的显示。</p>
<h4>为性能而生</h4>
<p>每个月有数十亿的人访问mobile.twitter.com。我们想要让Twitter Lite在您的网络速度慢、低可用、受限制或费用昂贵时，成为您访问Twitter的最佳选择。我们通过<a href="https://developers.google.com/web/fundamentals/performance/prpl-pattern/">PRPL pattern</a> 做了一系列的性能升级，并使用了安卓平台上支持<a href="https://github.com/w3c/ServiceWorker">Service Worker</a>, <a href="https://w3c.github.io/IndexedDB/">IndexedDB</a>, <a href="https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/">Web App Install Banners</a>, and <a href="https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/">Web Push Notifications</a>等新功能的现代浏览器(比如Google Chrome)，现在我们已经大大提升了访问速度和可靠性。</p>
<h5>可靠性</h5>
<p>Twitter Lite拥有网络自适应性。如果我们想达到每一个人，我们就必须达到使用低速、低可用网络的人。如果支持，我们会使用Service Worker来启用临时性的离线浏览和重复访问时的瞬间加载，不管网络状况如何。Service Worker会缓存HTML应用骨架和静态资源，还有一些流行的表情。当脚本或者取回数据失败时，我们会提供“重试”按钮，帮助用户重新获取数据。这些改进共同帮助我们提升了应用的可靠性，并且在重复访问时，大大提升加载速度、缩短启动时间。</p>
<h5>渐进式加载</h5>
<p>Twitter Lite在大多数使用3G的设备上五秒钟内便可以进入正常交互状态。这个世界上大部分人还使用着2G或者3G网络；初次体验的快速性是很重要的。在过去的三个月里，我们将平均加载时间降低了30%，并将进入交互状态之前的延迟降低了25%。为了达到这些，在服务器构建应用的初始状态时，应用会将初始的HTML响应流发送到浏览器端，并发送一系列的预加载指令，用来加载关键资源。应用了Webpack之后，应用的脚本会被打散到一个一个的小包之中，按需加载。这意味着初次加载仅需要请求在页面可见部分上使用的资源。（如果支持，Service Workder会预先缓存附加的资源和保证其它路由的瞬时加载。）这些改变支持我们渐进式地加载应用，因此人们可以更快地查看和创建推。</p>
<h5>渲染</h5>
<p>Twitter Lite打碎了昂贵的渲染工作。尽管我们已经优化了组件的渲染，推仍然是一个复杂的复合型组件，渲染超长列表依旧需要我们做额外的性能上的考虑。我们使用了虚拟列表组件，它只渲染当前视口可见的内容，使用requestAnimationFrame API渲染多帧上的条目，并保留不同页面的滚动状态。使用<a href="https://w3c.github.io/requestidlecallback/">requestIdleCallback</a> API，我们还可以推迟非关键渲染至空闲时段，这可以让应用的性能再上升一个台阶。</p>
<h5>数据使用</h5>
<p>Twitter Lite默认降低数据使用，措施包括请求小体积资源和依赖缓存。我们优化了您时间线上的图片显示，流量使用最高可降低40%。“省流量”模式会通过将推和消息中图片替换为小且模糊的预览图，大大减少流量使用。对图片使用HEAD请求可以帮助我们显示图片的体积大小，然后由用户决定是否加载。Twitter Lite只需要非常小的一片存储空间，因为它的体积只有原生应用的1%-3%。</p>
<h5>设计系统和迭代速度</h5>
<p>Twitter Lite的快速迭代性可以帮助我们维持高质量的用户体验。我们主要依赖弹性伸缩盒布局和其它一些固定数值的颜色、字体和尺寸。Twitter Lite建立在以组件为基础的自适应设计系统之上，适用于各种尺寸的设备。通过使用UI组件，我们建立了一套可以供设计与工程并用的语法，以此来展开快速迭代和组件复用的工作。我们的一些非常复杂的特性，比如内容混合的时间线，最短使用30行代码即可创建，其中包括配置和链接Redux模块与React组件。</p>
<h5>展望</h5>
<p>搭建一个这么大规模的快速的网页应用，并且让其持续保持这种状态，对来自Twitter不同团队的设计、产品、开发人员来讲都是一个很大的挑战。我们现在的进度相当不错，并且一直在通过使用HTTP/2、GraphQL和其它压缩格式试验如何将加载时间和流量消耗降至更低。在接下来的几个月里，我们会在可用性、安全性、设计、实用性和性能方面，在Twitter Lite中加入更多的改进。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我们是如何构建Twitter Lite的

## 原文链接
[https://www.zcfy.cc/article/how-we-built-twitter-lite](https://www.zcfy.cc/article/how-we-built-twitter-lite)

