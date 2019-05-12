---
title: '从零开始搭建vue-ssr系列之一：写在前面的话' 
date: 2019-01-14 2:30:07
hidden: true
slug: nb4ufjex47
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>为什么要用vue-ssr?</blockquote>
<ul>
<li>前端用的是vue, 后端渲染用<code>vue-ssr</code>,可以无缝的和前端连接起来</li>
<li>使用vue-ssr可以把数据渲染成HTML, 并在首屏展示, 用户体验好, 传统的前端vue, 服务器第一次请求只返回#app的空DOM, 当js和ajax请求完成, 才会展示, 体验差</li>
<li>利于SEO</li>
</ul>
<blockquote>是所有情况都适用vue-ssr吗?</blockquote>
<ul><li>当然不是, 他的最最主要作用是<strong>首屏渲染</strong>, 其他都是次要的, 比如有3个tab页签, 只有第一个页签是首屏展示的, 其他两个是通过点击才展示数据, 那这样就没有必要把另外两个页签的数据也取出来, 做vue-ssr, 这样会<strong>增加服务器端的压力和流量</strong>, 这个后面会说到</li></ul>
<blockquote>vue-ssr很容易上手吗?</blockquote>
<ul><li>说实话, 不是很容易, 虽然现在网上的例子很多, 官方也有一个例子<code>vue-hackernews</code>, 但是官方给出的例子太复杂, 属于大而全的例子, 不太适合原理不太清楚的新手, 网上的例子一般都是半个流程, 比如只告诉你渲染简单的模板, 根本不会把项目中用到的整个流程都串起来, 而且机理性的东西的文章也少，增加了学习的难度。</li></ul>
<blockquote>说了这么多，你写的东西能干啥？</blockquote>
<ul><li>这个系列文章是从头开始搭建整个项目的，从一个实际的一个简单的场景，告诉你怎么样用client端渲染，怎么在server端取数据，并传递给前端，达到数据共享，以及告诉你用ssr时踩的一些坑，如何解决的。我搞这个也搞了一段时间，网上资料也查了好多，我也算是集各家之所长吧，尽量写的详细些，帮忙各位能从0开始搭建起来。</li></ul>
<blockquote>技术栈是什么？</blockquote>
<ul><li>vue2+webpack2+vuex+axios</li></ul>
<blockquote>Vue-SSR系列目录</blockquote>
<p><a href="https://segmentfault.com/a/1190000009352740">从零开始搭建vue-ssr系列之一：写在前面的话</a></p>
<p><a href="https://segmentfault.com/a/1190000009372772" target="_blank">从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项</a></p>
<p><a href="https://segmentfault.com/a/1190000009373793">从零开始搭建vue-ssr系列之三：服务器渲染的奥秘</a></p>
<p><a href="https://segmentfault.com/a/1190000009452832" target="_blank">从零开始搭建vue-ssr系列之四：Vuex详解</a></p>
<p><a href="https://segmentfault.com/a/1190000009510509">从零开始搭建vue-ssr系列之五：开始第一个简单的server-render</a></p>
<p><a href="https://segmentfault.com/a/1190000009554693" target="_blank">从零开始搭建vue-ssr系列之六：一个完整的项目</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建vue-ssr系列之一：写在前面的话

## 原文链接
[https://segmentfault.com/a/1190000009352740](https://segmentfault.com/a/1190000009352740)

