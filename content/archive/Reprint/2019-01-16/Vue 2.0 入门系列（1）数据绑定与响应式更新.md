---
title: 'Vue 2.0 入门系列（1）数据绑定与响应式更新' 
date: 2019-01-16 2:30:07
hidden: true
slug: u4ei2ej5t9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1.数据绑定与响应式更新</h1>
<h2 id="articleHeader1">Hello Vue</h2>
<p>我们从一个基本的输入框开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; id=&quot;input&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input"</span>&gt;</span></code></pre>
<p>如果用 JavaScript 让输入框显示 <code>你好，Vue</code> 呢？实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    var data = {
        message: &quot;你好，Vue&quot;
    };

    document.querySelector('#input').value = data.message;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
    <span class="hljs-keyword">var</span> data = {
        <span class="hljs-attr">message</span>: <span class="hljs-string">"你好，Vue"</span>
    };

    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#input'</span>).value = data.message;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>代码说明：</p>
<ol>
<li><p>定义一个 <code>data</code> 对象；</p></li>
<li><p>使用 js 提供的 <code>querySelector</code> 方法，来选择 <code>id</code> 为 <code>input</code> 的元素，并对 <code>input</code> 元素的 <code>value</code> 进行赋值。</p></li>
</ol>
<p>那么，这个例子用 Vue 来实现是怎样的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html
<input type=&quot;text&quot; id=&quot;input&quot; v-model=&quot;message&quot;>

// js
var data = {
    message: &quot;你好，Vue&quot;
};

var vm = new Vue({
    el: '#input',
    data:data
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// html</span>
&lt;input type=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"input"</span> v-model=<span class="hljs-string">"message"</span>&gt;

<span class="hljs-comment">// js</span>
<span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">message</span>: <span class="hljs-string">"你好，Vue"</span>
};

<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#input'</span>,
    <span class="hljs-attr">data</span>:data
})</code></pre>
<p>我们来详细说明下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue();</code></pre>
<p>首先，调用构造函数 <code>Vue</code> 创建一个新的 Vue 实例，命名为 <code>vm</code>；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el: '#input'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">el: <span class="hljs-string">'#input'</span>,</code></pre>
<p>Vue 的实例必须挂载到某个元素上，可以通过 <code>el</code> 属性来设置。在本例中，实例被挂在到了 <code>input</code> 元素上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    message: &quot;你好，Vue&quot;
};
    
data:data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">message</span>: <span class="hljs-string">"你好，Vue"</span>
};
    
data:data</code></pre>
<p>我们定义另一个 <code>data</code> 对象，然后将其传给了 Vue 实例的 <code>data</code> 属性，该属性专门负责管理数据。这样，Vue 会全权代理 <code>data</code> 对象。比如，通过 <code>vm.message</code> 就可以访问 <code>data</code> 对象的 <code>message</code> 属性了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; id=&quot;input&quot; v-model=&quot;message&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"message"</span>&gt;</span></code></pre>
<p>最后，我们使用 Vue 提供的指令 <code>v-model</code>，该指令通常用于对表单控件的双向绑定。什么是双向绑定？接下来会介绍。</p>
<h2 id="articleHeader2">安装调试工具</h2>
<p>在进一步学习 Vue 之前，首先来安装相应的调试工具：<a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">官方地址</a>。</p>
<p>安装之后，要允许其访问文件网址：</p>
<p><span class="img-wrap"><img data-src="/img/bVMJz7?w=848&amp;h=332" src="https://static.alili.tech/img/bVMJz7?w=848&amp;h=332" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里与 Google Chrome 为例，安装好之后，右上角就会多出一个 Vue 的标记。如果你打开的是一个 Vue 页面，那么该图标就会点亮。</p>
<h2 id="articleHeader3">感受响应式更新</h2>
<p>先来看看第一节例子，只做了稍微改动:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.2.6/vue.js&quot;></script>
    
</head>
<body>
<div id=&quot;root&quot;>
    <input type=&quot;text&quot; id=&quot;input&quot; v-model=&quot;message&quot;>
    <p>"{{" message "}}"</p>
</div>

<script>

    let data = {
        message: &quot;你好，Vue&quot;
    };

    var vm = new Vue({
        el: '#root',  // 绑定 id 为 root 的元素
        data:data
    })
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script src="https://cdn.bootcss.com/vue/2.2.6/vue.js"&gt;&lt;/script&gt;
    
&lt;/head&gt;
&lt;body&gt;
&lt;div id="root"&gt;
    &lt;input type="text" id="input" v-model="message"&gt;
    &lt;p&gt;"{{" message "}}"&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;

    let data = {
        message: "你好，Vue"
    };

    var vm = new Vue({
        el: '#root',  // 绑定 id 为 root 的元素
        data:data
    })
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>使用插值符号 <code>"{{" "}}"</code> 为元素赋值，在这里，也可以使用 <code>v-text</code> 指定元素的 <code>contentText</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-text=&quot;message&quot;></p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"message"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>在浏览器中打开该例，打开 Chrome 的控制台，进行如下操作：点击 <code>Root</code> 元素，令其与 <code>$vm0</code> 绑定。点哪个节点，那个节点就会绑定 <code>$vm0</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bVMJAk?w=420&amp;h=193" src="https://static.alili.tech/img/bVMJAk?w=420&amp;h=193" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在，我们可以使用 <code>$vm0</code> 在控制台中访问实例，我们马上来直观感受下什么是响应式更新：</p>
<p><span class="img-wrap"><img data-src="/img/bVMKkR?w=600&amp;h=400" src="https://static.alili.tech/img/bVMKkR?w=600&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以看出：</p>
<ul>
<li><p>输入框的值改变后，控制台中访问 <code>message</code> 发现跟着变化；</p></li>
<li><p>控制台中操作 <code>message</code> 的值，输入框也实时跟着变化；</p></li>
</ul>
<p>这就是响应式更新啦。需要注意的是 <code>v-model</code> 只能用于表单控件，不能用于 <code>div</code>、<code>p</code> 等其他元素。</p>
<hr>
<p>附录：</p>
<ul><li><p><a href="https://gist.github.com/ihuangmx/a47dbd62ee474c231c88e68674245e18" rel="nofollow noreferrer" target="_blank">本节源码</a><button class="btn btn-xs btn-default ml10 preview" data-url="ihuangmx/a47dbd62ee474c231c88e68674245e18" data-typeid="1">点击预览</button></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 入门系列（1）数据绑定与响应式更新

## 原文链接
[https://segmentfault.com/a/1190000009202617](https://segmentfault.com/a/1190000009202617)

