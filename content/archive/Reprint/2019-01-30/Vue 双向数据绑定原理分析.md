---
title: 'Vue 双向数据绑定原理分析' 
date: 2019-01-30 2:30:23
hidden: true
slug: 1ij0b5hldxt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于双向数据绑定</h2>
<p>当我们在前端开发中采用MV*的模式时，M - model，指的是模型，也就是数据，V - view，指的是视图，也就是页面展现的部分。通常，我们需要编写代码，将从服务器获取的数据进行“渲染”，展现到视图上。每当数据有变更时，我们会再次进行渲染，从而更新视图，使得视图与数据保持一致。也就是：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697393" src="https://static.alili.tech/img/remote/1460000007697393" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>而另一方面，页面也会通过用户的交互，产生状态、数据的变化，这个时候，我们则编写代码，将视图对数据的更新同步到数据，以致于同步到后台服务器。也就是：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697394" src="https://static.alili.tech/img/remote/1460000007697394" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>不同的前端 MV* 框架对于这种 Model 和 View 间的数据同步有不同的处理。在 Backbone 中，Model 到 View 的数据传递，可以在 View 中监听 Model 的 change 事件，每当 Model 更新，View 中重新执行 render。而 View 到 Model 的数据传递，可以监听 View 对应的 DOM 元素的各种事件，在检测到 View 状态变更后，将变更的数据发送到 Model。相较于 Backbone，AngularJS 所代表的 MVVM 框架则更进一步，从框架层面支持这种数据同步机制，而且是双向数据绑定：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697395" src="https://static.alili.tech/img/remote/1460000007697395" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>不过在不同的 MVVM 框架中，实现双向数据绑定的技术有所不同。</p>
<p>AngularJS 采用“脏值检测”的方式，数据发生变更后，对于所有的数据和视图的绑定关系进行一次检测，识别是否有数据发生了改变，有变化进行处理，可能进一步引发其他数据的改变，所以这个过程可能会循环几次，一直到不再有数据变化发生后，将变更的数据发送到视图，更新页面展现。如果是手动对 ViewModel 的数据进行变更，为确保变更同步到视图，需要手动触发一次“脏值检测”。</p>
<p>VueJS 则使用 ES5 提供的 Object.defineProperty() 方法，监控对数据的操作，从而可以自动触发数据同步。并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。</p>
<p>参考：</p>
<ul>
<li><p><a href="http://stackoverflow.com/questions/13504906/what-is-two-way-binding" rel="nofollow noreferrer" target="_blank">What is two way binding?</a></p></li>
<li><p><a href="https://github.com/xufei/blog/issues/10" rel="nofollow noreferrer" target="_blank">Angular沉思录（一）数据绑定</a></p></li>
</ul>
<h2 id="articleHeader1">Vue 双向数据绑定实现</h2>
<p>数据与视图的绑定与同步，最终体现在对数据的读写处理过程中，也就是 Object.defineProperty() 定义的数据 set、get 函数中。Vue 中对于的函数为 defineReactive，在精简版实现中，我只保留了一些基本特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive(obj, key, value) {
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            if (value === newVal) {
                return
            } else {
                value = newVal
                dep.notify()
            }
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">obj, key, value</span>) </span>{
    <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep()
    <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (Dep.target) {
                dep.depend()
            }
            <span class="hljs-keyword">return</span> value
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span>(<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-keyword">if</span> (value === newVal) {
                <span class="hljs-keyword">return</span>
            } <span class="hljs-keyword">else</span> {
                value = newVal
                dep.notify()
            }
        }
    })
}</code></pre>
<p>在对数据进行读取时，如果当前有 Watcher（对数据的观察者吧，watcher 会负责将获取的新数据发送给视图），那将该 Watcher 绑定到当前的数据上（dep.depend()，dep 关联当前数据和所有的 watcher 的依赖关系），是一个检查并记录依赖的过程。而在对数据进行赋值时，如果数据发生改变，则通知所有的 watcher（借助 dep.notify()）。这样，即便是我们手动改变了数据，框架也能够自动将数据同步到视图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697396" src="https://static.alili.tech/img/remote/1460000007697396" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">数据绑定关系的识别过程</h2>
<p>Vue 和 AngularJS 中，都是通过在 HTML 中添加指令的方式，将视图元素与数据的绑定关系进行声明。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;test&quot;>
  <input type=&quot;text&quot; v-model=&quot;name&quot;>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"name"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<p>以上的 HTML 代码表示该 input 元素与 name 数据进行绑定。在 JS 代码中可以这样进行初始化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#test',
  data: {
    name: 'luobo'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#test'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'luobo'</span>
  }
})</code></pre>
<p>代码正确执行后，页面上 input 元素对应的位置会显示上面代码中给出的初始值：luobo。</p>
<p>由于双向数据绑定已经建立，因此：</p>
<ul>
<li><p>执行 <code>vm.name = 'mickey'</code> 后，页面上 input 也会更新为显示： mickey</p></li>
<li><p>在页面文本框中修改内容为：tang，则通过<code>vm.name</code> 获取的值为：<code>"tang"</code></p></li>
</ul>
<p>那么初始化的过程中，Vue 是如何识别出这种绑定关系的呢？</p>
<p>通过分析源码，在初始化过程中（new Vue() 执行时），主要执行两个步骤：</p>
<ul>
<li><p>compile</p></li>
<li><p>link</p></li>
</ul>
<p>compile 过程中，对于给定的目标元素进行解析，识别出所有绑定在元素（通过 el 属性传入）上的指令。<br>link 过程中，建立这些指令与对应数据（通过 data 属性传入初始值）的绑定关系，并以数据的初始值进行渲染。绑定关系建立后，就可以双向同步数据了。</p>
<p>除了基本的双向数据绑定，Vue 还提供了更多的特性和功能，如果只是对双向数据绑定感兴趣，可以看下我的精简版实现：<br><a href="https://github.com/luobotang/simply-vue" rel="nofollow noreferrer" target="_blank">https://github.com/luobotang/...</a><br>基本是从 Vue 代码中精简、改造得到的，主要保留了 Vue 中与双向数据绑定有关的部分（包括 compile、link 相关代码），指令只保留了 input[type="text"] 和普通文本两种类型，用于演示数据绑定的效果。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 双向数据绑定原理分析

## 原文链接
[https://segmentfault.com/a/1190000007697390](https://segmentfault.com/a/1190000007697390)

