---
title: 'Vue.js基础详解' 
date: 2019-01-02 2:30:09
hidden: true
slug: juusy45lxnd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue.js</h1>
<h2 id="articleHeader1">vue介绍</h2>
<p>Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。<br>vue是一款简单的mvvm（model-view-viewmodel）框架。</p>
<h2 id="articleHeader2">vue起步</h2>
<p>vue的引入与javascript其他库的引入相同，通过一对闭合的script标签包裹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;&quot;></script>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;script src=<span class="hljs-string">""</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>  </code></pre>
<h2 id="articleHeader3">声明式渲染</h2>
<p>vue是一个允许采用简洁的模板语法来声明式的将数据渲染进DOM</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>"{{"msg"}}"</div> 
<!-- view 模板 -->
<!-- mustache语法"{{""}}" -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>"{{"msg"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-comment">&lt;!-- view 模板 --&gt;</span>
<span class="hljs-comment">&lt;!-- mustache语法"{{""}}" --&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data={
    msg:&quot;世界舞王，尼古拉斯-赵四&quot;
}
// model-模型  数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> data={
    <span class="hljs-attr">msg</span>:<span class="hljs-string">"世界舞王，尼古拉斯-赵四"</span>
}
<span class="hljs-comment">// model-模型  数据</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = new Vue({
    el:&quot;#box&quot;,
    data:data   
})
// viewmodel视图模型 用来将数据渲染到模板上
// 用new Vue 创建一个 Vue 对象
// el：接选择器 类选择器，id选择器等都可以" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> box = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">"#box"</span>,
    <span class="hljs-attr">data</span>:data   
})
<span class="hljs-comment">// viewmodel视图模型 用来将数据渲染到模板上</span>
<span class="hljs-comment">// 用new Vue 创建一个 Vue 对象</span>
<span class="hljs-comment">// el：接选择器 类选择器，id选择器等都可以</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="世界舞王，尼古拉斯-赵四" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">世界舞王，尼古拉斯-赵四</code></pre>
<p>现在我们就运用声明式渲染生成了我们第一个Vue应用。</p>
<p>除了给文本赋值，我们还可以利用Vue绑定DOM元素属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <span v-bind:title=&quot;msg&quot;>
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
</div>
<!-- v-bind 动态绑定一个或多个属性 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"msg"</span>&gt;</span>
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- v-bind 动态绑定一个或多个属性 --&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = new Vue({
    el:&quot;#box&quot;,
    data: {
        msg: '页面加载于' + new Date().toLocaleString()
        }  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> box = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">"#box"</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">msg</span>: <span class="hljs-string">'页面加载于'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString()
        }  
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="鼠标悬停几秒钟查看此处动态绑定的提示信息！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">鼠标悬停几秒钟查看此处动态绑定的提示信息！</code></pre>
<p>这里我们遇到点新东西。你看到的 v-bind 属性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 msg 属性保持一致”。<br>再次打开浏览器的 JavaScript 控制台输入 box.msg = '新消息'，就会再一次看到这个绑定了 title 属性的 HTML 已经进行了更新。<br>Vue更多的学习指令和组件。</p>
<h2 id="articleHeader4">条件与循环</h2>
<p>Vue控制一个DOM元素的显示和隐藏也很简单，只需运用指令v-if就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <p v-if=&quot;seen&quot;>显示模式</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"seen"</span>&gt;</span>显示模式<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#box',
    data: {
        seen: true
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#box'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">seen</span>: <span class="hljs-literal">true</span>
    }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="显示模式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">显示模式</code></pre>
<p>当我们将data数据里的seen更改为false时，我们会发现元素已经隐藏。</p>
<p>如果们需要将数据渲染到一个项目列表中，那么我们就需要使用到v-for指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <ol>
        <li v-for=&quot;todo in todos&quot;>
            "{{" todo.text "}}"
        </li>
    </ol>
</div>
<!-- todo 就是我们自定义的变量 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
            "{{" todo.text "}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- todo 就是我们自定义的变量 --&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#box',
        data: {
            todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '整个牛项目' }
            ]
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#box'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">todos</span>: [
            { <span class="hljs-attr">text</span>: <span class="hljs-string">'学习 JavaScript'</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">'学习 Vue'</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">'整个牛项目'</span> }
            ]
    }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.学习 JavaScript
2.学习 Vue
3.整个牛项目" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>学习 JavaScript
<span class="hljs-number">2.</span>学习 Vue
<span class="hljs-number">3.</span>整个牛项目</code></pre>
<p>在控制台里，输入 box.todos.push({ text: '新项目' })，你会发现列表中添加了一个新项。</p>
<h2 id="articleHeader5">处理用户事件</h2>
<p>v-on可以绑定一个事件监听器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <p>"{{" message "}}"</p>
    <button v-on:click=&quot;reverseMessage&quot;>逆转消息</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" message "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"reverseMessage"</span>&gt;</span>逆转消息<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#box',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
    }
}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#box'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue.js!'</span>
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">reverseMessage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.message = <span class="hljs-keyword">this</span>.message.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
    }
}
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010917657" src="https://static.alili.tech/img/remote/1460000010917657" alt="Image text" title="Image text" style="cursor: pointer;"></span><br>v-model可以实现模板和数据之间的双向绑定，我们既可以通过改变数据改变值，还可以通过改变模板内的值改变数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <p>"{{" message "}}"</p>
    <input v-model=&quot;message&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" message "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"message"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#box',
    data: {
        message: 'Hello Vue!'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#box'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue!'</span>
    }
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010917658" src="https://static.alili.tech/img/remote/1460000010917658" alt="Image text" title="Image text" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">组化应用构建</h2>
<p>组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用</p>
<h3 id="articleHeader7">首先我们需要注册一个组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('EXPle', {
    template: '<li>这是个待办项</li>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'EXPle'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;li&gt;这是个待办项&lt;/li&gt;'</span>
})</code></pre>
<h3 id="articleHeader8">然后我们需要为组件创建一个模板</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol>
    <EXPle></EXPle>
</ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">EXPle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">EXPle</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<p>我们可以用上面刚刚学到的v-for来为几个不同的标签防止不同的值<br>所以组件我们应当这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // &quot;prop&quot;，类似于一个自定义属性
  // 这个属性名为 todo。
  props: ['todo'],
  template: '<li>"{{" todo.text "}}"</li>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'todo-item'</span>, {
  <span class="hljs-comment">// todo-item 组件现在接受一个</span>
  <span class="hljs-comment">// "prop"，类似于一个自定义属性</span>
  <span class="hljs-comment">// 这个属性名为 todo。</span>
  props: [<span class="hljs-string">'todo'</span>],
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;li&gt;"{{" todo.text "}}"&lt;/li&gt;'</span>
})</code></pre>
<p>我们还要运用v-bind将指令穿如不同的值，所以html应当这样修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <ol>
    <!--
    现在我们为每个 todo-item 提供 todo 对象
    todo 对象是变量，即其内容可以是动态的。
    我们也需要为每个组件提供一个“key”，晚些时候我们会做个解释。
    -->
    <todo-item
    v-for=&quot;item in groceryList&quot;
    v-bind:todo=&quot;item&quot;
    v-bind:key=&quot;item.id&quot;>
    </todo-item>
    </ol>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-comment">&lt;!--
    现在我们为每个 todo-item 提供 todo 对象
    todo 对象是变量，即其内容可以是动态的。
    我们也需要为每个组件提供一个“key”，晚些时候我们会做个解释。
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">todo-item</span>
    <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in groceryList"</span>
    <span class="hljs-attr">v-bind:todo</span>=<span class="hljs-string">"item"</span>
    <span class="hljs-attr">v-bind:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">todo-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>最后，我们需要为box赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app7 = new Vue({
    el: '#box',
    data: {
    groceryList: [
    { id: 0, text: '世界舞王' },
    { id: 1, text: '尼古拉斯' },
    { id: 2, text: '赵四' }
    ]
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app7 = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#box'</span>,
    <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">groceryList</span>: [
    { <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'世界舞王'</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'尼古拉斯'</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'赵四'</span> }
    ]
    }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.世界舞王
2.尼古拉斯
3.赵四" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>世界舞王
<span class="hljs-number">2.</span>尼古拉斯
<span class="hljs-number">3.</span>赵四</code></pre>
<p>Vue 初学就到这里了，相信你已经在脑子里确定了Vue的原理<br>model-view-viewmodel的概念也已经非常清楚了，希望你能够在学习Vue的道路上越走越远，最后感谢你的浏览。</p>
<h2 id="articleHeader9">喜欢的点个赞呗！</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js基础详解

## 原文链接
[https://segmentfault.com/a/1190000010917654](https://segmentfault.com/a/1190000010917654)

