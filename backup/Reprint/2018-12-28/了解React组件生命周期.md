---
title: '了解React组件生命周期' 
date: 2018-12-28 2:30:10
hidden: true
slug: clta3s86q07
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">问题</h3>
<p>了解React组件的生命周期</p>
<h3 id="articleHeader1">知识点</h3>
<p><strong>React流程状态图</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000011694930?w=761&amp;h=690" src="https://static.alili.tech/img/remote/1460000011694930?w=761&amp;h=690" alt="React流程状态图.png" title="React流程状态图.png" style="cursor: pointer; display: inline;"></span></p>
<p>注意：流程状态图为使用React.createClass方法的生命周期</p>
<ul>
<li>使用<code>ajax</code>获取后台数据渲染时，一般将调用<code>ajax</code>方法放在<code>componentDidMount</code>中，这样可以先渲染<code>虚拟dom</code>再展示数据，当再次调用<code>ajax</code>数据改变时，<code>dom</code>内数据会再次渲染，而不用再次加载整个<code>dom</code>。如果在该dom要根据条件<strong>只通过<code>ajax</code>获取一次数据</strong>，则可以将调用<code>ajax</code>的方法放在<code>componentWillMount</code>。</li>
<li>当工程中未加载<code>jQuery</code>，异步请求也可以使用<code>fetch</code>等</li>
<li>在<code>componentWillUpdate</code>中，尽量避免使用<code>setState()</code>或<code>setProps()</code>方法。若无条件判断情况下使用<code>setState()</code>或<code>setProps()</code>，会导致死循环，同样<code>componentDidUpdate</code>中使用<code>setState()</code>若无条件限制也会导致死循环。</li>
<li>通过<code>shouldComponentUpdate</code>可以对是否进行渲染的条件判断，能够作为性能调优的手段，避免无意义渲染。</li>
<li>
<code>componentWillReceiveProps</code>可以通过<code>nextProps</code>获取新传入的参数值，例如：<code>nextProps.operationType</code>获取operationType</li>
<li>建议使用<code>setState()</code>的周期为：<code>componentWillMount</code>、<code>componentDidMount</code>、<code>componentWillReceiveProps</code>、<code>componentDidUpdate</code>
</li>
<li>注意对应周期中<code>this.state</code>的值</li>
</ul>
<p>通过构建列表树后总结补充：</p>
<ul>
<li>
<code>setState</code>不会立即生效，要经过<code>render</code>过程才能真正改变<code>state</code>值</li>
<li>在<code>return</code>时调用方法<code>setState</code>，会引起<code>shouldComponentUpdate</code>周期，而此时<code>componentDidMount</code>周期已完成。</li>
</ul>
<h4>参考文章</h4>
<p><a href="http://react-china.org/t/react/1740" rel="nofollow noreferrer" target="_blank">React组件生命周期过程说明</a><br><a href="https://segmentfault.com/a/1190000006792687">React组件生命周期</a><br><a href="https://segmentfault.com/q/1010000008133309" target="_blank">React数据获取为什么一定要在componentDidMount里面调用？</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
了解React组件生命周期

## 原文链接
[https://segmentfault.com/a/1190000011694925](https://segmentfault.com/a/1190000011694925)

