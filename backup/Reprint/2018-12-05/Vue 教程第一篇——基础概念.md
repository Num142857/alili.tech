---
title: 'Vue 教程第一篇——基础概念' 
date: 2018-12-05 2:30:09
hidden: true
slug: noc3k7y20to
categories: [reprint]
---

{{< raw >}}

                    
<h1>认识 Vue</h1>
<p>关于 Vue 的描述有不少，不外乎都会拿来与 Angular 和 React 对比，同样头顶 MVVM 双向数据驱动设计模式光环的 Angular 自然被对比的最多，但到目前为止，Angular 在热度上已明显不及 Vue，性能已成为最大的诟病。</p>
<p>在我看来，Vue 和 Angular 的对比有种早些年 Java 和 ASP.NET 的对比，对于开发者而言，ASP.NET 官方本身已实现好了大量的框架和功能，使用起来非常的方便快捷，同时也提供了无限的可扩展性，对比起 Java 而言，后者在本身框架和功能上都不及 ASP.NET，但同样都拥有无限的可扩展性，相比之下，本来 ASP.NET 很有一统天下的可能，但现实终归现实，ASP.NET 本身的框架和功能实现并没有换来多少称赞，反在性能和安全性方面被诟病。回看 Vue 和 Angular 的阵营，我也总有这么一种感觉。</p>
<p>所以，在这个开源的年代，我认为一个框架功能不需要有多么强大，再强大再完善的功能都抵不上“适合”两字，反而轻量级且有无限可扩展性会成为所有开发者的追求。</p>
<p>关于 Vue、React 和 Angular，其实都是在原生 JS 基础上，对面向对象不一样的实现方式而已，所以要想使用这三者中的任意一种，首先要有一定的 JS 基础和对面向对象有一定的认识。</p>
<p>在代码层面，Vue 只是一个构造函数，整个 Vue 的实现都在实例化这个构造函数开始。</p>
<pre><code class="html">  &lt;script src="https://unpkg.com/vue/dist/vue.js"&gt;&lt;/script&gt;</code></pre>
<pre><code class="html">  &lt;div id="app"&gt;&lt;/div&gt;</code></pre>
<pre><code class="javascript">  var vm = new Vue({
    el: '#app'// Vue 实例元素
    data: {
      //数据
    }
    ...
  })</code></pre>
<h1>认识数据驱动模式</h1>
<p>开始接触前端编程的基本上都是先学习 DOM 节点操作，jQuery 在这一领域上一度成为了标准，所以在前端编程的领域中，jQuery 几乎是每个开发者的标配。随着前后端分离的成熟，产品或项目都趋于分布式部署，开发者已不满足于操作 DOM 节点， 设计模式便慢慢的被前端化。</p>
<p>数据驱动的设计模式在思维逻辑上与 DOM 节点操作完全不一样。</p>
<pre><code class="html">  &lt;div id="div1"&gt;&lt;/div&gt;
  &lt;div id="app"&gt;
    &lt;span&gt;"{{"message"}}"&lt;/span&gt;
  &lt;/div&gt;</code></pre>
<pre><code class="javascript">  //DOM 节点操作
  document.getElementById('div1').innerText = '节点被动改变'  

  //Vue 数据驱动： 当 message 发生改变的时候，span 会相应的发生改变，而不需要手动去改变 span。
  var vm = new Vue({
    el: '#app',
    data: {
      message: '我是通过映射显示的文本'
    }
  })
</code></pre>
<h1>认识 MVVM 模式</h1>
<p>M：Model，称之为数据模型，在前端以对象的形式表现。</p>
<pre><code class="javascript">  var data = {message: '我就是一个数据模型'}</code></pre>
<p>V：View，视图，也就是 HTML</p>
<pre><code class="html">  &lt;div id="app"&gt;
    &lt;span&gt;我是视图&lt;/span&gt;
  &lt;/div&gt;</code></pre>
<p>VM：ViewModel，就是连接数据和视图的桥梁，当 Model 发生改变的时候，ViewModel 便将数据映射到视图。</p>
<p>那么数据驱动模式和 MVVM 模式有什么关系，换句话说，MVVM 是数据驱动模式的一种实现，Vue 是 MVVM 的一种实现。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 教程第一篇——基础概念

## 原文链接
[https://segmentfault.com/a/1190000014462638](https://segmentfault.com/a/1190000014462638)

