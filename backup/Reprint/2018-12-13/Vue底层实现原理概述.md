---
title: 'Vue底层实现原理概述' 
date: 2018-12-13 2:30:07
hidden: true
slug: 0g4s45wsdvuv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在研究 <a href="https://segmentfault.com/a/1190000006599500">剖析Vue原理&amp;实现双向绑定MVVM</a> 这篇文章，一边学习一边总结一下自己的思考。</p>
<p>Vue是一个典型的MVVM框架，模型（Model）只是普通的JavaScript对象，修改它则视图（View）会自动更新。这种设计让状态管理变得非常简单而直观。那么Vue是如何把模型和视图建立起关联的呢？</p>
<h2 id="articleHeader1">实现原理概述</h2>
<p>这是前言提到的文章里的代码，一段典型的体现了Vue特点的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;mvvm-app&quot;>
    <input type=&quot;text&quot; v-model=&quot;word&quot;>
    <p>"{{"word"}}"</p>
    <button v-on:click=&quot;sayHi&quot;>change model</button> //点击这个button，word的值会发生改变
</div>

<script src=&quot;./js/observer.js&quot;></script>
<script src=&quot;./js/watcher.js&quot;></script>
<script src=&quot;./js/compile.js&quot;></script>
<script src=&quot;./js/mvvm.js&quot;></script>
<script>
    var vm = new MVVM({
        el: '#mvvm-app',
        data: {
            word: 'Hello World!'
        },
        methods: {
            sayHi: function() {
                this.word = 'Hi, everybody!';
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div id=<span class="hljs-string">"mvvm-app"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"word"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"word"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"sayHi"</span>&gt;</span>change model<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> //点击这个button，word的值会发生改变
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;script src=<span class="hljs-string">"./js/observer.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"./js/watcher.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"./js/compile.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script src=<span class="hljs-string">"./js/mvvm.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script&gt;
    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> MVVM({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#mvvm-app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">word</span>: <span class="hljs-string">'Hello World!'</span>
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">sayHi</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.word = <span class="hljs-string">'Hi, everybody!'</span>;
            }
        }
    });
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>Vue实现这种数据双向绑定的效果，需要三大模块：</p>
<ol>
<li>
<strong>Observer</strong>：能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者</li>
<li>
<strong>Compile</strong>：对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数</li>
<li>
<strong>Watcher</strong>：作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图</li>
</ol>
<h2 id="articleHeader2">Observer</h2>
<p>Observer的核心是通过<code>Obeject.defineProperty()</code>来监听数据的变动，这个函数内部可以定义<code>setter</code>和<code>getter</code>，每当数据发生变化，就会触发<code>setter</code>。这时候<code>Observer</code>就要通知订阅者，订阅者就是<code>Watcher</code>。</p>
<h2 id="articleHeader3">Watcher</h2>
<p><code>Watcher</code>订阅者作为<code>Observer</code>和<code>Compile</code>之间通信的桥梁，主要做的事情是：</p>
<ol>
<li>在自身实例化时往属性订阅器(dep)里面添加自己</li>
<li>自身必须有一个<code>update()</code>方法</li>
<li>待属性变动<code>dep.notice()</code>通知时，能调用自身的update()方法，并触发<code>Compile</code>中绑定的回调</li>
</ol>
<h2 id="articleHeader4">Compile</h2>
<p><code>Compile</code>主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。</p>
<h2 id="articleHeader5">总结</h2>
<p>关于每部分具体的代码实现，可以参阅 <a href="https://segmentfault.com/a/1190000006599500" target="_blank">剖析Vue原理&amp;实现双向绑定MVVM</a> 这篇文章，这篇文章写得非常好。我打算研究透彻之后自己实现一下简易的Vue框架。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue底层实现原理概述

## 原文链接
[https://segmentfault.com/a/1190000013294870](https://segmentfault.com/a/1190000013294870)

