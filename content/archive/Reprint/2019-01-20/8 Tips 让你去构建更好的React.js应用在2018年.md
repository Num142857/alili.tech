---
title: '8 Tips 让你去构建更好的React.js应用在2018年' 
date: 2019-01-20 2:30:11
hidden: true
slug: 7g70e2rodwi
categories: [reprint]
---

{{< raw >}}

            <p> <a href="https://blog.risingstack.com/"><img src="https://resources.risingstack.com/risingstack-logo-2017.svg" alt="RisingStack"></a> </p>
<hr>
<h1>8个技巧在2018年构建非常赞的react.js应用程序</h1>
<p><img src="https://blog-assets.risingstack.com/2017/01/bertalan_miklos-risingstack.jpg" alt="Bertalan Miklos's Picture"> by <a href="https://blog.risingstack.com/author/bertalan"><strong>Bertalan Miklos</strong></a>(<a href="https://twitter.com/@solkimicreb1">@solkimicreb1</a>), risestack的全栈开发人员</p>
<p>新的一年，更好的代码: 介绍这些react.js最佳实践，以提高代码的质量. <strong>这篇文章是2018年react.js必不可少的技巧和窍门的一个小集合</strong> 我希望每个人都能找到有用的东西.</p>
<h2>Tip #1: 请使用 React 16</h2>
<p>React 16 在四个月前发布了! 现在大家该开始使用它的时候了. 你可以通过一个简单的版本碰撞迁移来升级,它提供了一些简洁的改进. 我最喜欢的是<a href="https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-core-architecture">Fiber 架构</a> 和  <a href="https://reactjs.org/blog/2017/09/26/react-v16.0.html#support-for-custom-dom-attributes">支持自定义DOM属性</a>.  从官方 <a href="https://reactjs.org/blog/2017/09/26/react-v16.0.html">发型说明</a>了解了解你看中的功能并开始使用它们.</p>
<h2>Tip #2: 最简法则</h2>
<p>聪明的选择你的构建工具,避免过度复杂. <a href="https://github.com/facebookincubator/create-react-app">Create-react-app</a> 可以在几秒中初始化一个新的项目, <a href="https://github.com/zeit/serve">serve</a> 可以让你使用一个命令在网上分享它同时 <a href="https://zeit.co/now">now</a>可以使用一个命令把它部署在互联网上 .</p>
<p>使用你熟悉并且易用的工具. 让项目在开发的进程中不必使引入于复杂的技术.</p>
<h2>Tip #3: 学习react.js模式</h2>
<p>各种前端库和框架,层出不穷, 但是好的模式不变的.  从 <a href="https://reactpatterns.com/">React Patterns</a> 中你最喜欢的例子来帮助你学习常见的模式.</p>
<p>如果任何一个例子引起你的兴趣，你都通过下面的文章中加深你对 <a href="https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e">高阶组件</a>, <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0">容器和纯展示组件</a>, <a href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/">受控组件与非受控表单</a> 和 <a href="https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9">函数作为子组件</a>理解.</p>
<h2>Tip #4: 尝试react.js生态系统中的新事物</h2>
<p>当你有时间时,不要害怕尝试新的事物. React.js拥有一个领人难以置信的生态系统, 你几乎总能给你的问题找到一个适合的解决方案. 通过运行 <a href="https://github.com/enaqx/awesome-react">awesome-react list</a> 找出吸引你注意的内容. 请务必查看更多的工具，样式和状态管理库，并在缺乏灵感时查看示例项目。.</p>
<h2>Tip #5: 拥抱平台</h2>
<p>用户期望wep应用程序可以通过历史按钮进行导航,可通过分享的URL并将会话保存在网络存储中. 丢失其中的任何一项,用户都会感觉沮丧. 做出额外的努力和浏览器正确的整合在一起.</p>
<p>在你正确理解这些内容的同时, 那就去熟悉新的 <a href="https://developer.mozilla.org/en-US/docs/WebAPI">Web APIs</a>. 在过去的几年中这些发生了很大的变化. 网页对基础设备的控制越来越强
, 充分利用它！</p>
<h2>Tip #6: 离线</h2>
<p>针对不稳定的连接进行优化.<a href="https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/">离线指南</a> 详细的介绍了介绍了Service Workers. 虽然是相当新的技术，但浏览器支持程度正在<a href="https://caniuse.com/#feat=serviceworkers">迎头赶上</a>.</p>
<p>不要担心这一开始很难. Create-react-app create-react-app会给你的app提供离线支持，这是一个不错的开始. 尽管如此，仍然需要准备好用于离线使用的数据. <a href="https://developers.google.com/web/tools/workbox/">Google Workbox</a> 和<a href="https://firebase.google.com/">Firebase</a> 可以帮助你开始.</p>
<h2>Tip #7: 优化慢速设备</h2>
<p>用户可能会使用网速非常慢的设备. 不要满足于它在你的 MacBook上的速度, 但是也不太要过于针对性能的优化. 坚持这条法则: 行动之前要考虑好.</p>
<p>通过 <a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</a>来确定一个大致的优化路线,然后使用 <a href="https://github.com/FormidableLabs/webpack-dashboard">webpack dashboard</a> 或者<a href="https://github.com/webpack-contrib/webpack-bundle-analyzer">webpack bundler analyzer</a> 看看哪里还能优化代码.</p>
<p>如果你真的需要各方面的提升, 性能还可以通过 <a href="https://developers.google.com/web/updates/2017/11/dynamic-import">代码拼接和动态导入</a>, <a href="https://blog.risingstack.com/node-js-http-2-push/">HTTP/2'的复用和推送功能</a> 和新的 <a href="https://css-tricks.com/prefetching-preloading-prebrowsing/">链接预加载</a> -优化.</p>
<p>最终这不仅是代码量的大小, 还有质量. 通过官方的<a href="https://reactjs.org/docs/optimizing-performance.html">React.js 优化技巧</a>来提高你的应用程序性能 . 这是一个非常好的列表。.</p>
<h2>Tip #8: 看看底层</h2>
<p>学习react.js背后的概念是值得的花费时间的. 试着在<a href="https://reactjs.org/docs/react-without-jsx.html">没有 JSX</a>的情况下创建一个虚拟项目来靠近vDom. 通过深化你对vDOM和<a href="https://reactjs.org/docs/reconciliation.html">reconciliation</a>理解, 你可以更有效地优化你的应用程序.</p>
<p>熟悉 <a href="https://reactjs.org/docs/context.html">context Api及其所有问题</a>. 它为许多流行的库提供了基本支持。 例如 MobX 和 Redux. 最后, 掌握住<a href="https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-core-architecture">React.js Fiber</a>.</p>
<hr>
<p>via: <a href="https://blog.risingstack.com/8-tips-to-build-better-react-apps-in-2018/">https://blog.risingstack.com/8-tips-to-build-better-react-apps-in-2018/</a></p>
<p>作者: <a href="">Bertalan Miklos</a> 选题者: <a href="https://github.com/undefined">@undefined</a> 译者: <a href="https://github.com/译者ID">svenzhao</a> 校对: <a href="https://github.com/校对者ID">校对者ID</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
8 Tips 让你去构建更好的React.js应用在2018年

## 原文链接
[https://www.zcfy.cc/article/8-tips-to-build-awesome-react-js-apps-in-2018](https://www.zcfy.cc/article/8-tips-to-build-awesome-react-js-apps-in-2018)

