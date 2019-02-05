---
title: '学习Vue.js的五个小例子' 
date: 2019-02-06 2:30:08
hidden: true
slug: ey3jcbxf316
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在学习vue.js，学着写了几个小例子，自己记录一下，例子都比较简单，希望给初学vue.js的小伙伴一些参考。</p>
<h2 id="articleHeader1">双向数据绑定</h2>
<p><a href="https://jsfiddle.net/sunny_zhang/6yx0shkm/" rel="nofollow noreferrer" target="_blank">点击查看</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/6yx0shkm/" data-typeid="0">点击预览</button></p>
<blockquote><p>数据绑定是vue.js的基础。本例中就是利用了vue.js的v-model指令在表单元素上创建双向数据绑定。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--这是我们的View-->
<div id=&quot;app&quot;>
    <p>"{{" message "}}"</p>
    <input type=&quot;text&quot; v-model=&quot;message&quot;/>
</div>

<script>
    // 这是我们的Model
    new Vue({
        el: '#app',
        data: {
            message:'Hello World!'
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--这是我们的View--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"message"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">// 这是我们的Model</span>
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            message:<span class="hljs-string">'Hello World!'</span>
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>将message绑定到文本框，当更改文本框的值时，<code>&lt;p&gt;"{{" message "}}"&lt;/p&gt;</code> 中的内容也会被更新。</p>
<h2 id="articleHeader2">导航切换</h2>
<p><a href="https://jsfiddle.net/sunny_zhang/6n33LgLq/" rel="nofollow noreferrer" target="_blank">点击查看</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/6n33LgLq/" data-typeid="0">点击预览</button></p>
<blockquote><p>这里主要应用了vue.js的<a href="http://cn.vuejs.org/guide/list.html" rel="nofollow noreferrer" target="_blank">v-for</a>指令来渲染一个列表、<a href="http://cn.vuejs.org/guide/class-and-style.html" rel="nofollow noreferrer" target="_blank">v-bind</a>指令来绑定class以及<a href="http://cn.vuejs.org/guide/events.html" rel="nofollow noreferrer" target="_blank">v-on</a>指令来处理事件</p></blockquote>
<h2 id="articleHeader3">即时搜索</h2>
<p><a href="https://jsfiddle.net/sunny_zhang/hm6294p3/" rel="nofollow noreferrer" target="_blank">链接描述</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/hm6294p3/" data-typeid="0">点击预览</button></p>
<blockquote><p>这个例子主要应用了vue.js的自定义过滤器，可以通过<code>Vue.filter()</code>注册一个全局过滤器，具体用法可以参考<a href="http://cn.vuejs.org/guide/custom-filter.html" rel="nofollow noreferrer" target="_blank">这里</a>，vue.js也提供了一些<a href="http://cn.vuejs.org/api/#%E8%BF%87%E6%BB%A4%E5%99%A8" rel="nofollow noreferrer" target="_blank">内置过滤器</a>。</p></blockquote>
<h2 id="articleHeader4">布局转换</h2>
<p><a href="https://jsfiddle.net/sunny_zhang/5c78vzx7/" rel="nofollow noreferrer" target="_blank">链接描述</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/5c78vzx7/" data-typeid="0">点击预览</button></p>
<blockquote><p>本例应用了vue.js的<a href="http://cn.vuejs.org/guide/conditional.html" rel="nofollow noreferrer" target="_blank">v-if</a>指令进行了条件渲染，以及v-bind绑定class和v-on处理事件</p></blockquote>
<h2 id="articleHeader5">合计总价</h2>
<p><a href="https://jsfiddle.net/sunny_zhang/bj4duum6/" rel="nofollow noreferrer" target="_blank">链接描述</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/bj4duum6/" data-typeid="0">点击预览</button></p>
<blockquote><p>这个例子类似购物车那种选中合计总价的功能，也是对各种指令以及数据绑定的综合应用吧。</p></blockquote>
<h2 id="articleHeader6">后记</h2>
<p>文章可能比较简单，只是分享了几个小例子，没有对vue.js的用法进行详细说明，大家可以看官方文档。有时间后面我也会分享更多vue.js的学习笔记。<br><strong>参考资料</strong><br><a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue.js中文文档</a><br><a href="http://www.tuicool.com/articles/qEnqyau" rel="nofollow noreferrer" target="_blank">五个小案例带你学习火热的Vue.js</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习Vue.js的五个小例子

## 原文链接
[https://segmentfault.com/a/1190000006165434](https://segmentfault.com/a/1190000006165434)

