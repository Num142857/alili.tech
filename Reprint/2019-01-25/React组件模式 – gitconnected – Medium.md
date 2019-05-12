---
title: 'React组件模式 – gitconnected – Medium' 
date: 2019-01-25 2:30:23
hidden: true
slug: 971oxdycsz9
categories: [reprint]
---

{{< raw >}}

            <hr>
<h1>React组件模式</h1>
<h2>Stateful与Stateless， Container与Presentational， HOCs， Render Callbacks和其他</h2>
<p>使用<a href="https://facebook.github.io/react/"><strong>React</strong></a>有一段时间了，React是个Facebook的框架，通过JavaScript来搭建用户界面。如果一开始，我就知道下面这些概念就好了。本文将从我过去学到的经验中，总结出这些模式。对那些将要接触这美妙的组件式世界的开发者而言，是有帮助的。</p>
<p><img src="http://p0.qhimg.com/t01d573e37ce4cc379d.png" alt=""></p>
<h3>Stateful和Stateless组件（有状态和无状态组件）</h3>
<p>就像web服务的有状态和无状态一样，React组件可以在使用的时候保持和修改状态（<strong>有状态</strong>），也可以只是一个接受传入的props属性并显示的简单组件（<strong>无状态</strong>）。</p>
<p>一个简单的<strong>无状态</strong>按钮，只依赖于props属性：</p>
<p><img src="http://p0.qhimg.com/t019406990a31bb72ef.png" alt=""></p>
<p>一个<strong>有状态</strong>的计数组件例子（用到<code>Button</code>组件）：</p>
<p><img src="http://p0.qhimg.com/t01a336a01d8a6ea604.png" alt=""></p>
<p>正如你所见的，后一个例子的构造函数设置了组件的状态，而前一个例子比较简单，它通过传入的props属性来渲染文本。这种分离的想法看起来简单，但却使得<code>Button</code>组件可以高度复用。</p>
<h3>Container与Presentational 组件（容器与展示类组件）</h3>
<p>当用到外部数据的时候，我们可以将组件分离成两个类别。<strong>容器</strong>类组件负责传递在React组件作用域外部的数据，如Redux或者Relay。而<strong>展示</strong>类组件不依赖于应用的其他部分，仅仅依赖于自己的状态或则传入的props属性。让我们看看一个<strong>展示</strong>类组件，用户清单的实现：</p>
<p><img src="http://p0.qhimg.com/t01b9d5936b05ff793e.png" alt=""></p>
<p>这个UserList组件会被<strong>容器</strong>类组件所更新：</p>
<p><img src="http://p0.qhimg.com/t01499740dceb40452c.png" alt=""></p>
<p>通过这个方式，将数据获取从渲染中分离出来，并使得<code>UserList</code>可以复用。如果你想进一步学习这种模式，<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0">Dan Abramov的这篇文章</a>讲解地很清楚。</p>
<h3>高阶组件</h3>
<p>高阶组件，<strong>HOCs</strong>，有助于组件逻辑的复用。高阶组件是一个函数，该函数接受一个组件作为传参，并返回一个新的组件。</p>
<p>假设你需要构建一个可扩展的菜单组件，当用户点击的时候，它将展示子内容。那你可以简单地创建一个通用<strong>HOC</strong>，而不是通过控制父组件的状态来实现。</p>
<p><img src="http://p0.qhimg.com/t01738302e46a64b48a.png" alt=""></p>
<p>这种方式让我们可以使用装饰者语句，将上文的逻辑行为应用到<code>ToggleableMenu</code>组件上。</p>
<p><img src="http://p0.qhimg.com/t015de0fd48fa1494e2.png" alt=""></p>
<p>现在我们可以在<code>ToggleableMenu</code>组件上传入任意子元素：</p>
<p><img src="http://p0.qhimg.com/t012f70d04650d7cf2d.png" alt=""></p>
<p>如果你熟悉<a href="http://redux.js.org/">Redux</a>的<code>connect</code>函数或者<a href="https://github.com/ReactTraining/react-router">React Router</a> 的<code>withRouter</code>函数，那你已经在用<strong>HOCs</strong>了。</p>
<h3>Render Callbacks（回调式渲染）</h3>
<p>另一个使得组件逻辑行为可以复用的方法，是将你的组件的chidren属性转为函数，这也是为什么<strong>Render Callbacks（回调式渲染）</strong>也称之为<strong>Function as Child Components（类子组件函数）</strong>。这里我们用<strong>Render Callbacks</strong>的方式来重写可扩展菜单的<strong>HOC</strong>组件：</p>
<p><img src="http://p0.qhimg.com/t01623b701f36ab2e46.png" alt=""></p>
<p>现在我们可以传入一个函数作为<code>Toggleable</code>的组件的children：</p>
<p><img src="http://p0.qhimg.com/t011588b065b215f50a.png" alt=""></p>
<p>上面的代码就已经使用函数作为子组件，但是，如果想要复用它，就像在<strong>HOC</strong>例子（多菜单）里面一样，我们可以简单地创建一个新的组件，并使用<code>Toggleable</code>的逻辑行为。</p>
<p><img src="http://p0.qhimg.com/t012aff13533cdaf823.png" alt=""></p>
<p>我们全新的组件<code>ToggleableMenu</code>已经可以用了：</p>
<p><img src="http://p0.qhimg.com/t012f70d04650d7cf2d.png" alt=""></p>
<p>我们的<code>Menu</code>组件就和<strong>HOC</strong>例子里面的一样！</p>
<p>当我们要修改渲染内容，而不受状态操作影响的时候，这个方法就会很有用。正如你所看见的，我们把<strong>渲染（render）</strong>的逻辑行为放到<code>ToggleableMenu</code>的子函数里面，但在<code>Toggleable</code>组件里保留住<strong>状态（state）</strong>的逻辑！</p>
<h3>深入阅读</h3>
<p>上面的例子只是一些React模式的基础，如果你想要更进一步的深入这些话题，我建议你看看下面这些：</p>
<ul>
<li><p><a href="https://www.youtube.com/watch?v=YaZg8wg39QQ">React组件模式 - Michael Chan</a></p>
</li>
<li><p><a href="https://github.com/chantastic/reactpatterns.com">React模式</a></p>
</li>
<li><p><a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0">Presentational与Container组件</a></p>
</li>
<li><p><a href="https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e">深入React高阶组件</a></p>
</li>
<li><p><a href="https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9">Function as Child Components</a></p>
</li>
<li><p><a href="https://github.com/acdlite/recompose">Recompose</a></p>
</li>
<li><p><a href="https://github.com/paypal/downshift">Downshift</a></p>
</li>
<li><p><a href="https://medium.com/tag/react?source=post">React</a></p>
</li>
<li><p><a href="https://medium.com/tag/javascript?source=post">JavaScript</a></p>
</li>
<li><p><a href="https://medium.com/tag/components?source=post">Components</a></p>
</li>
<li><p><a href="https://medium.com/tag/higher-order-components?source=post">Higher Order Components</a></p>
</li>
<li><p><a href="https://medium.com/tag/render-callback?source=post">Render Callback</a></p>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React组件模式 – gitconnected – Medium

## 原文链接
[https://www.zcfy.cc/article/react-component-patterns-gitconnected-medium](https://www.zcfy.cc/article/react-component-patterns-gitconnected-medium)

