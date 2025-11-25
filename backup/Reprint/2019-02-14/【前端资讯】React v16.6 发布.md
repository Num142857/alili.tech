---
title: '【前端资讯】React v16.6 发布' 
date: 2019-02-14 2:30:37
hidden: true
slug: 7jvgs3ub4al
categories: [reprint]
---

{{< raw >}}

                    
<p>本文转自 FEPulse 公众号（微信搜索 <strong>FEPulse</strong>，精选国内外最新前端资讯，为你把握前端脉搏）。</p>
<p>React v16.6 发布，包含一些便捷的功能，我们对此进行梳理。<br><span class="img-wrap"><img data-src="/img/bVbiHhT?w=1192&amp;h=1146" src="https://static.alili.tech/img/bVbiHhT?w=1192&amp;h=1146" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">React.memo</h3>
<p>React.memo 是一个高阶组件，类似于 React.PureComponent，但参数是函数组件而不是类组件。</p>
<p>纯函数的意思是传入同样的输入应该得到同样的输出，对应的，对于一个函数组件而言，如果传入同样的 props，渲染结果也应该一样的话，那么使用 React.memo 包裹这个函数组件则可以获得较大的性能提升。<br><span class="img-wrap"><img data-src="/img/bVbiHhY?w=1360&amp;h=198" src="https://static.alili.tech/img/bVbiHhY?w=1360&amp;h=198" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>原理是 React 会对传入的 props 进行浅比较，如果 props 没有变化，则直接返回上一次渲染结果，避免重复渲染。你也可以在 React.memo 的第二个参数中定制自己的比较逻辑。<br><span class="img-wrap"><img data-src="/img/bVbiHhZ?w=1360&amp;h=486" src="https://static.alili.tech/img/bVbiHhZ?w=1360&amp;h=486" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里有个小插曲，在起名上，有人问为啥不叫 React.pure，而叫 React.memo 呢？对此，React 的作者 Dan 对此回应：React.memo 中的 memo 是 memoization，即缓存的意思，React.memo 赋予了函数组件缓存的能力，并且 memoization 太难拼写，因此这个方法最终被称为 React.memo。<br><span class="img-wrap"><img data-src="/img/bVbiHh1?w=1198&amp;h=1204" src="https://static.alili.tech/img/bVbiHh1?w=1198&amp;h=1204" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">React.lazy: Code-Splitting with Suspense</h3>
<p>Suspense 最初是由 Dan 在今年 3 月份的 JSConf Iceland 2018 中提出，我们对此也做了详细介绍：<a href="https://mp.weixin.qq.com/s?__biz=MzI4NzEyMjUxMA==&amp;mid=2649066284&amp;idx=1&amp;sn=f7e0f6aec239fa50449ee656188c9d0c&amp;chksm=f3c35e0dc4b4d71be29ee781dfb7f580bc1dee6f5274937d736fd3e657814a95ec7266f23645&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">【前端资讯】React 的未来：Time Slicing 和 Suspense</a></p>
<p>从 v16.6 开始，你可以使用 Suspense 组件和 React.lazy 方法做 Code Splitting。<br><span class="img-wrap"><img data-src="/img/bVbiHig?w=1360&amp;h=450" src="https://static.alili.tech/img/bVbiHig?w=1360&amp;h=450" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>需要注意的是，这种使用方式还不支持 SSR。</p>
<h3 id="articleHeader2">static contextType</h3>
<p>从 v16.3 开始，React 引进了 new Context API，但发布之后反馈不太理想，使用起来比较困难，因此从 v16.6 开始添加了一个便利的 API 来使用类组件中的 context value。<br><span class="img-wrap"><img data-src="/img/bVbiHiq?w=1360&amp;h=918" src="https://static.alili.tech/img/bVbiHiq?w=1360&amp;h=918" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">static getDerivedStateFromError()</h3>
<p>React v16 引入了 Error Boundaries 来处理渲染时抛出的错误，同时错误发生时也会触发 componentDidCatch。在触发之前，错误的组件将被当做 null 处理，但这可能不符合父组件的 ref 不能为 null 的预期。同时，它也无法从服务器上的错误中恢复，因为 Did 开头的生命周期方法在服务器端并不会触发。</p>
<p>因此，React v16.6 添加了 static getDerivedStateFromError(error) 方法，允许开发者在 render 完成之前渲染 Fallback UI。这个生命周期函数触发的条件是子组件抛出错误，然后 getDerivedStateFromError 接收这个错误参数后更新 state。<br><span class="img-wrap"><img data-src="/img/bVbiHiv?w=1360&amp;h=810" src="https://static.alili.tech/img/bVbiHiv?w=1360&amp;h=810" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">Deprecations in StrictMode</h3>
<p>弃用了 StrictMode 中的两个 API：ReactDOM.findDOMNode() 和 Legacy Context。</p>
<p><span class="img-wrap"><img data-src="/img/bVbitqp?w=1080&amp;h=537" src="https://static.alili.tech/img/bVbitqp?w=1080&amp;h=537" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端资讯】React v16.6 发布

## 原文链接
[https://segmentfault.com/a/1190000016810366](https://segmentfault.com/a/1190000016810366)

