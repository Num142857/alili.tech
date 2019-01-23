---
title: '两分钟学会 React 16 componentDidCatch 生命周期方法' 
date: 2019-01-24 2:30:11
hidden: true
slug: 8hnlewqz5xw
categories: [reprint]
---

{{< raw >}}

            <p><img src="http://p0.qhimg.com/t0128f92aebd7084e77.jpg" alt=""></p>
<h4>什么是错误处理?</h4>
<blockquote>
<p>“错误处理指的是React组件中<strong>能捕获子组件树中的任何Javascript异常，打印出来，并且展示出备用UI的生命周期方法</strong> 从而避免了组件树崩溃。它能在整个渲染及构建dom树的过程中捕获异常” -<a href="https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries"><strong>Dan Abramov</strong></a></p>
</blockquote>
<p>创建方法：
定义新的生命周期方法：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">componentDidCatch</span><span class="hljs-params">(error, errorInfo)</span></span>
</code></pre><h4>componentDidCatch() 生命周期方法</h4>
<blockquote>
<p>componentDidCatch(error, errorInfo) {}</p>
</blockquote>
<p>第一个参数指的是抛出的实际错误。第二个参数是指错误信息，它返回带有“componentStack”属性的对象，“componentStack”属性包含组件的错误跟踪信息。
<code>componentDidCatch()</code>生命周期类似Javascript中的<code>catch {}</code>语句。只不过是将子组件包裹在一个大的 try/catch 语句块中.它不能捕获自身的错误，而是将错误传给离它最近的异常上。是不是听起来很熟悉?</p>
<p><em>小提示: JavaScript</em> <code>_catch {}_</code> <em>模块.</em></p>
<h4>为什么需要componentDidCatch()?</h4>
<p>React 16之前, 组件内部的错误经常会引出莫名奇妙的异常，这些错误还不能在组件中去审查，OMG！不堪回首啊！</p>
<p>React 16 的错误处理来拯救了!</p>
<p><strong>优势</strong></p>
<ol>
<li><p>声明式 vs 命令式。React的其中一个优势是它的声明式编程风格，组件自身来声明哪些部分应该被渲染。错误处理沿袭了React的声明式编码风格。因此使用者不需要再使用命令式编程类似 <code>try/catch</code> 或 <code>if/else</code> 来避免渲染时候出现的UI错误。</p>
</li>
<li><p>合乎常规。无论组件中的错误隐藏的多深，错误处理会将错误置于离它最近的异常上。</p>
</li>
<li><p>可修复性. 使用者可以编写一个错误处理组件，并在整个应用程序中重新使用它。</p>
</li>
<li><p>一切皆组件。</p>
</li>
</ol>
<p><strong>问题:</strong></p>
<h4>如何使用错误处理?</h4>
<p>我在Codepen上写了关于 <code>componentDidCatch()</code> 生命周期的demo，请点击下面链接。建议 fork我，把代码拷下来多敲，在实践中发现问题。</p>
<p><img src="http://p0.qhimg.com/t01339f07e7e6872582.png" alt=""></p>
<p><a href="https://codepen.io/sgroff04/pen/dVbgJy/">https://codepen.io/sgroff04/pen/dVbgJy/</a></p>
<h4>什么时候使用错误处理?</h4>
<blockquote>
<p>在实践中，大多数时候你会想要声明一个错误处理组件，并在整个应用程序中使用它。-<a href="https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries"><strong>Dan Abramov</strong></a></p>
</blockquote>
<p>封装顶级路由组件还是封装需要传递参数的组件，取决于具体场景，选择最好的方案避免应用程序崩溃。
错误处理鼓励在生产环境中的使用<code>componentDidCatch()</code>生命周期方法触发JavaScript的错误报告机制</p>
<p><em>了解更多请点击</em> <a href="https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html"><strong>React 16_错误处理</strong></a> <em>by Dan Abramov.</em></p>
<p>译者推荐：在 React 16 中使用高阶组件来捕获异常<a href="https://www.jianshu.com/p/cf85a4317f36">https://www.jianshu.com/p/cf85a4317f36</a> </p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
两分钟学会 React 16 componentDidCatch 生命周期方法

## 原文链接
[https://www.zcfy.cc/article/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method](https://www.zcfy.cc/article/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method)

