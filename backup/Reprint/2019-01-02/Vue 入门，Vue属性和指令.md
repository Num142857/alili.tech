---
title: 'Vue 入门，Vue属性和指令' 
date: 2019-01-02 2:30:09
hidden: true
slug: 0f1i67z5s9ca
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">初步认识vue</h1>
<blockquote><p>github地址：<a href="https://github.com/jiaoshibo/vue" rel="nofollow noreferrer" target="_blank">https://github.com/jiaoshibo/vue</a></p></blockquote>
<p>vue是一套构建用户界面的渐进式框架，是mvvm框架的一种。vue采用了自底向上增量开发的设计，其核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。</p>
<blockquote><p>vue有三个部分组成 : 视图-数据-视图模型。视图即HTML部分。</p></blockquote>
<blockquote><p>vue的引入：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue&quot;></script>
//或者直接引入文件
<script src=&quot;js/vue.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
//或者直接引入文件
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader1">声明式渲染</h2>
<p>vue的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    "{{"message"}}"
</div>

<script>
    var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    "{{"message"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    data: {
        message: <span class="hljs-string">'Hello Vue!'</span>
    }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>就这样，数据和DOM进行了绑定，视图将数据引入，并进行渲染，显示出来，而且元素是响应式的，打开控制台，修改 app.message 的值，就会发现视图的文本也会相应的更新。</p>
<p>除了文本插值，我们还可以使用指令的方式绑定DOM元素属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app-2&quot;>
  <span v-bind:title=&quot;message&quot;>
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
<script>
    var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString()
    }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app-2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"message"</span>&gt;</span>
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> app2 = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app-2'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'页面加载于 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString()
    }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如上，v-bind 属性被称为指令，其前缀 v- 表示其为vue提供的特殊属性。这里该指令的作用是：“将这个元素节点的 title 属性和 Vue 实例的 message 属性保持一致”。</p>
<h2 id="articleHeader2">条件与循环</h2>
<p>控制一个元素的显示与隐藏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app-3&quot;>
    <p v-if=&quot;seen&quot;>显示</p>
</div>
<script>
    var app3=new Vue({
        el:&quot;#app-3&quot;,
        data:{
            seen:true
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app-3"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"seen"</span>&gt;</span>显示<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app3=<span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app-3"</span>,
        data:{
            seen:<span class="hljs-literal">true</span>
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如果在控制台输入 app3.seen=false ，你就发现上例的文本隐藏了。</p>
<p>利用 v-for 指令绑定数组的数据来渲染一个项目列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app-4&quot;>
    <ol>
        <li v-for=&quot;todo in todos&quot;>
            "{{"todo.text"}}"
        </li>
    </ol>
</div>
<script>
    var app4=new Vue({
        el:&quot;#app-4&quot;,
        data:{
            todos:[
                {text:&quot;HTML&quot;},
                {text:&quot;JAVASCRIPT&quot;},
                {text:&quot;VUE.JS&quot;},
            ]
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app-4"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
            "{{"todo.text"}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app4=<span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app-4"</span>,
        data:{
            todos:[
                {text:<span class="hljs-string">"HTML"</span>},
                {text:<span class="hljs-string">"JAVASCRIPT"</span>},
                {text:<span class="hljs-string">"VUE.JS"</span>},
            ]
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.HTML
2.JAVASCRIPT
3.VUE.JS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span><span class="hljs-selector-class">.HTML</span>
<span class="hljs-number">2</span><span class="hljs-selector-class">.JAVASCRIPT</span>
<span class="hljs-number">3</span><span class="hljs-selector-class">.VUE</span><span class="hljs-selector-class">.JS</span></code></pre>
<p>在控制台输入 app3.todos.push({text:"CSS"}) ，列表中会增加一个新项</p>
<h1 id="articleHeader3">处理用户输入</h1>
<p>利用 v-on 绑定一个事件监听器，使用户和应用之间进行互动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app-5&quot;>
    <p>"{{"message"}}"</p>
    <input type=&quot;button&quot; value=&quot;逆转消息&quot; v-on:click=&quot;reverse&quot;>
</div>
<script>
    var app5=new Vue({
        el:&quot;#app-5&quot;,
        data:{
            message:&quot;Hello world!&quot;
        },
        methods:{
            reverse:function(){
                this.message=this.message.split(&quot;&quot;).reverse().join(&quot;&quot;)
            }
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app-5"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"逆转消息"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"reverse"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app5=<span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app-5"</span>,
        data:{
            message:<span class="hljs-string">"Hello world!"</span>
        },
        methods:{
            reverse:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">this</span>.message=<span class="hljs-keyword">this</span>.message.split(<span class="hljs-string">""</span>).reverse().join(<span class="hljs-string">""</span>)
            }
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>通过 v-model 指令，可以轻松实现表单输入和应用状态之间的双向绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app-6&quot;>
    <p>"{{"message"}}"</p>
    <input type=&quot;text&quot; v-model=&quot;message&quot;>
</div>
<script>
    var app6=new Vue({
        el:&quot;#app-6&quot;,
        data:{
            message:&quot;hello&quot;
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app-6"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"message"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app6=<span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app-6"</span>,
        data:{
            message:<span class="hljs-string">"hello"</span>
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader4">组件化应用构建</h2>
<p>使用 v-bind 指令将todo传到每一个重复的组件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app-7&quot;>
    <ol>
        <todo-item v-for=&quot;item in groceryLIst&quot; v-bind:todo=&quot;item&quot; v-bind:key=&quot;item.id&quot;></todo-item>
    </ol>
</div>
<script>
    Vue.component(&quot;todo-item&quot;,{
        props:[&quot;todo&quot;],
        template:&quot;<li>"{{"todo.text"}}"</li>&quot;
    })
    var app7=new Vue({
        el:&quot;#app-7&quot;,
        data:{
            groceryLIst:[
                {id:0,text:&quot;JAVASCRIPT&quot;},
                {id:1,text:&quot;HTML&quot;},
                {id:2,text:&quot;VUE&quot;}
            ]
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app-7"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">todo-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in groceryLIst"</span> <span class="hljs-attr">v-bind:todo</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">v-bind:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">todo-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">"todo-item"</span>,{
        props:[<span class="hljs-string">"todo"</span>],
        template:<span class="hljs-string">"&lt;li&gt;"{{"todo.text"}}"&lt;/li&gt;"</span>
    })
    <span class="hljs-keyword">var</span> app7=<span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">"#app-7"</span>,
        data:{
            groceryLIst:[
                {id:<span class="hljs-number">0</span>,text:<span class="hljs-string">"JAVASCRIPT"</span>},
                {id:<span class="hljs-number">1</span>,text:<span class="hljs-string">"HTML"</span>},
                {id:<span class="hljs-number">2</span>,text:<span class="hljs-string">"VUE"</span>}
            ]
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.JAVASCRIPT
2.HTML
3.VUE" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span><span class="hljs-selector-class">.JAVASCRIPT</span>
<span class="hljs-number">2</span><span class="hljs-selector-class">.HTML</span>
<span class="hljs-number">3</span>.VUE</code></pre>
<p>在上面的例子中，我们已经设法将应用分割成了两个更小的单元，子单元通过 props 接口实现了与父单元很好的解耦。</p>
<h1 id="articleHeader5">To be continued......</h1>
<blockquote><p>下一篇：Vuede 模板语法和计算属性：<a href="https://segmentfault.com/a/1190000010936841">https://segmentfault.com/a/11...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 入门，Vue属性和指令

## 原文链接
[https://segmentfault.com/a/1190000010917625](https://segmentfault.com/a/1190000010917625)

