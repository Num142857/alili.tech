---
title: '高级 Vue 组件模式 (1)' 
date: 2019-02-13 2:31:22
hidden: true
slug: pw1e3azhdgr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前头</h2>
<p>去年，曾经阅读过一系列关于高级 react 组件模式的文章，今年上半年，又抽空陆陆续续地翻译了一系列关于高级 angular 组件模式的文章，碰巧最近接手了一个公司项目，前端这块的技术栈是 vue。我对于 vue 本身还是比较熟悉的，不过大多都是一些很简单的个人项目，在构建相对比较复杂的应用中缺乏实践经验，就想着也搜搜类似题材的文章，涨涨知识。结果似乎没有找到（其实也是有一些的，只不过不是和 react 和 angular 对比来写的），不如就按照 react 和 angular 这两个系列文章的思路，使用 vue 来亲自实现一次吧。</p>
<p>由于三个框架的设计思想、语法都有比较大的区别，所以在实现过程中，均使用更符合 vue 风格的方式去解决问题，同时也提供一些对比，供读者参考，如果观点有误，还望指正。</p>
<h2 id="articleHeader1">01 实现一个 toggle 组件</h2>
<p>这个系列的文章的第一篇，都会从实现一个最简单的 toggle 组件开始。</p>
<p>在 Vue 中，我们通过 data 来声明一个 <code>checked</code> 属性，这个属性所控制的状态代表组件本身的开关状态，这个状态会传递给负责渲染开关变换逻辑的 <code>switch</code> 组件中，关于 <code>switch</code> 组件，这里不做过多介绍，你把它当作一个私有组件即可，其内部实现与该篇文章没有太大的关联。同时这个组件还拥有一个 <code>on</code> 属性，用来初始化 <code>checked</code> 的状态值。</p>
<p>通过在 <code>switch</code> 组件注册原生 click 事件，<code>toggle</code> 组件还会触发一个 <code>toggled</code> 事件，在 App 组件中，我们会监听这个事件，并将其回传的值打印到控制台中。你可以下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/4qn23p43ww" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-1" rel="nofollow noreferrer" target="_blank">part-1</a>
</li>
</ul>
<h2 id="articleHeader2">总结</h2>
<p><code>toggle</code>组件的实现是一个很典型的利用单向数据流作为数据源的简单组件：</p>
<ul>
<li>
<code>on</code> 是单向数据源，<code>checked</code> 代表组件内部的开关状态</li>
<li>通过触发 <code>toggle</code> 事件，将 <code>checked</code> 状态的变化传递给父组件</li>
</ul>
<h2 id="articleHeader3">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (1)

## 原文链接
[https://segmentfault.com/a/1190000016747215](https://segmentfault.com/a/1190000016747215)

