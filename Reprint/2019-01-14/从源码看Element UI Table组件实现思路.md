---
title: '从源码看Element UI Table组件实现思路' 
date: 2019-01-14 2:30:07
hidden: true
slug: zn156i0uxn
categories: [reprint]
---

{{< raw >}}

                    
<p>在你实现一个组件过程中，一定要注意一下几点</p>
<ul>
<li><p>将代码模块化并且分离。如果你将大量的逻辑或者是代码都放在钩子函数中（比如mounted），那么写出来的组件代码将非常丑陋，这样子写出的代码也往往难以维护。</p></li>
<li><p>第二就是要注意可扩展性。因为定制一个基础组件，也许当你日后还想对它的功能进行扩展的话，那么一定要注意自己代码的编写结构。<br>接下来来看一下element ui是如何编写一个table组件的，在看源码之前，首先还是要对他的table组件的大致功能有一个了解，这样我们在看源码的时候才会知道这一段大概实现了什么功能。</p></li>
</ul>
<p>点开table的src目录下，有这么几个文件</p>
<ul>
<li><p>dropdown.js</p></li>
<li><p>filter-panel.vue（实现表格勾选的组件）</p></li>
<li><p>table-body.js （实现表格body的组件）</p></li>
<li><p>table-column.js （实现表中中每一列的组件）</p></li>
<li><p>table-footer.js （定义表格尾部的组件，会有一些合计的功能）</p></li>
<li><p>table-header.js（定义表格thead的文件）</p></li>
<li><p>table-layout.js （定义表格布局的文件）</p></li>
<li><p>table-store.js（定义事件的方法集中在这里）</p></li>
<li><p>table.vue（最终将上述组件整合后的一个最终table组件）</p></li>
<li><p>util.js（定义了一些工具函数）<br>对于这个结构也就是像一开始提到的那样，将代码尽量拆分，这样组织下来结构清晰。分析的时候我将举例每一种情况的代表，类似的照着实现就可以了。</p></li>
</ul>
<p>首先是事件的实现</p>
<p>以row-click为例，我们使用这个事件的方式是@row-click=“dosomething”,那组件内部如何触发这个事件呢，最简单的方法就是在每一次tr循环的时候都去绑定上一个@click事件就好，在这个事件里面去emit（‘row-click’）事件就好，可是这就是会有一个问题，事件一多，代码都集中在methods中，会写出非常长的代码，这个时候就需要分离，我们新建一个store.js，用来管理各种事件。大致实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const TableStore = function (table,initialSatate) {
  this.table = table
  this.states = {}
}
TableStore.prototype.mutations = {
  handleRowClick () {
    this.table.emit('row-click')
  }
}
Table.prototype.commit = function (name,..agrs){
  mutations[name].apply(name,args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>const TableStore = function (<span class="hljs-selector-tag">table</span>,initialSatate) {
  this<span class="hljs-selector-class">.table</span> = <span class="hljs-selector-tag">table</span>
  this<span class="hljs-selector-class">.states</span> = {}
}
TableStore<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.mutations</span> = {
  handleRowClick () {
    this<span class="hljs-selector-class">.table</span><span class="hljs-selector-class">.emit</span>(<span class="hljs-string">'row-click'</span>)
  }
}
Table<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.commit</span> = function (name,..agrs){
  mutations[name].apply(name,args)
}</code></pre>
<p>我们在表格table创建一开始，在data (){}中就会创建一个新的tableStore对象，我们在每一行点击的时候只用this.store.commit('handleRowClick');基于这个流程，如果以后还需要继续添加事件，你就可以在mutations里面去定义。</p>
<p>layout.js也是一样的道理，这里我只是对表格的高度去进行了设定，对于一个vue对象来说，不能用dom思路去实现它的高度，我是将vue对象打印出来，在一步一步寻找那个style属性</p>
<p>TableColumn的实现</p>
<p>其实对于一个表格来说，他的表头将会很重要。在蚂蚁金服的那个antd组件库中，他们对于表头的定义是这样的，你需要传入一个columns（props），里面将你定义的每一列信息写进去，而vue在实现的过程中，是将作为</p>
<p>组件children元素,在组件里再去定义每一列的属性，基于这两种实现方式的不同，我觉得很大程度上是因为vue中有一个标签（也可能是别的原因），但是又有一个问题，就是在table-header/table-body/table-column中，他们都是用的render方法去渲染组件，我在参考他们官方编写的过程中，用到了jsx语法的模式，不是很理解为什么又采用这种方式去编写组件。<br>最后我实现的table<a href="https://github.com/z2014/Vue-component/tree/master/BasicTable" rel="nofollow noreferrer" target="_blank">功能文档</a><br>以及最终的一个样例<a href="https://z2014.github.io/Vue-component/Table-Demo/index.html" rel="nofollow noreferrer" target="_blank">demo</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从源码看Element UI Table组件实现思路

## 原文链接
[https://segmentfault.com/a/1190000009412413](https://segmentfault.com/a/1190000009412413)

