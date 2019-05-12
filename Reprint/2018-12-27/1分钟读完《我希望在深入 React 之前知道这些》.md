---
title: '1分钟读完《我希望在深入 React 之前知道这些》' 
date: 2018-12-27 2:30:12
hidden: true
slug: scuih3kkvmr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">我希望在深入 React 之前知道这些</h1>
<p><a href="https://engineering.opsgenie.com/@morellic" rel="nofollow noreferrer" target="_blank">Canberk Morelli</a> 是 OpsGenie 的一名前端工程师，正在使用 React 构建公司内部项目。通过这篇文章可以使初学者不要犯同样的错误。</p>
<h2 id="articleHeader1">1、每次调用 <code>setState</code> 都会引起组件的重新渲染 re-render</h2>
<p>每次<strong>state 改变</strong>或者<strong>传入新的 props</strong> 都会调用 <code>shouldComponentUpdate</code>。</p>
<p><code>shouldComponentUpdate</code> 默认返回 <code>true</code>，开发者可以根据自己的逻辑决定是否返回 <code>false</code>。</p>
<p>注意：</p>
<ul>
<li>不正确的 <code>shouldComponentUpdate</code> 逻辑可能引发错误：应该渲染的时候没有渲染，或者不应该渲染的时候却渲染了</li>
<li>在 <code>shouldComponentUpdate</code> 进行复杂的判断容易引发性能问题，可以通过 <a href="https://reactjs.org/docs/perf.html" rel="nofollow noreferrer" target="_blank">React’s Performance Tools</a> 来查找。</li>
</ul>
<h2 id="articleHeader2">2、<code>setState</code> 对状态的改变是异步的</h2>
<p>调用 <code>setState</code> 后，组件的 <code>state</code> 并<strong>不会</strong>立即改变。</p>
<p>一个经常犯的错误就是在 <code>setState</code> 后马上使用 <code>this.state</code>。</p>
<p><code>setState</code> 还有另一种用法：<code>setState(updater, [callback])</code>，通过传递一个函数 <code>updater</code>。<br>第 2 个参数是修改完状态后的回调，但是不推荐在这里写业务逻辑，一个比较不错的地方是写到 <code>componentDidUpdate</code> 函数里。</p>
<h2 id="articleHeader3">3、组件生命周期很重要</h2>
<p>生命周期大概分为 3 类：</p>
<p><strong>挂载</strong>：组件被创建并插入到 DOM</p>
<p><span class="img-wrap"><img data-src="/img/bVXIrR?w=1600&amp;h=1003" src="https://static.alili.tech/img/bVXIrR?w=1600&amp;h=1003" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>更新</strong>：组件正在重新渲染，一般是由 props 或 state 的改变引起的</p>
<p><span class="img-wrap"><img data-src="/img/bVXIrX?w=800&amp;h=755" src="https://static.alili.tech/img/bVXIrX?w=800&amp;h=755" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>卸载</strong>：组件从 DOM 上移除</p>
<p><span class="img-wrap"><img data-src="/img/bVXIrZ?w=1600&amp;h=238" src="https://static.alili.tech/img/bVXIrZ?w=1600&amp;h=238" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">4、<code>componentWillReceiveProps</code> 的使用</h2>
<p>当<strong>组件的 props 改变时需要更新 state</strong>时使用这个方法。</p>
<p>注意：</p>
<ul>
<li>即使 props 没有改变，也会调用 <code>componentWillReceiveProps</code>，因此需要在函数内部比较 <code>this.props</code> 和 <code>nextProps</code>
</li>
<li>在一个<strong>已挂载</strong>组件接收新 props 前，<code>componentWillReceiveProps</code> 被调用，因此在挂载阶段是<strong>不会</strong>调用 <code>componentWillReceiveProps</code> 的</li>
</ul>
<h2 id="articleHeader5">5、使用 React Developer Tools</h2>
<p>React Developer Tools 可以更方便的调试 React 应用。</p>
<h2 id="articleHeader6">6、使用 Create React App</h2>
<p>官方推出的 Create React App 让开发者已<strong>零配置</strong>的方式快速创建 React 应用。</p>
<hr>
<blockquote>
<p>阅读原文：<a href="https://engineering.opsgenie.com/i-wish-i-knew-these-before-diving-into-react-301e0ee2e488" rel="nofollow noreferrer" target="_blank">I wish I knew these before diving into React</a></p>
<p>讨论地址：<a href="https://github.com/dev-reading/fe/issues/2" rel="nofollow noreferrer" target="_blank">我希望在深入 React 之前知道这些</a></p>
<p>如果你想参与讨论，请<a href="https://github.com/dev-reading/fe" rel="nofollow noreferrer" target="_blank">点击这里</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
1分钟读完《我希望在深入 React 之前知道这些》

## 原文链接
[https://segmentfault.com/a/1190000011809919](https://segmentfault.com/a/1190000011809919)

