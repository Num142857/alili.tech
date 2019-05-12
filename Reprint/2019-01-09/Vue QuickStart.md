---
title: 'Vue QuickStart' 
date: 2019-01-09 2:30:12
hidden: true
slug: bia7yhx661
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>由于很多视频和教程在谈及 Vue 的时候，总是习惯于从 Vue-cli 谈起，而组件化的开发方式相比 jQuery ，在思路上有着很大的不同。此外，这种开发方式往往会连带着会使用很多其他的技术，容易使得初学者感到不适。这里依据自己学习 Vue 的过程，帮助大家通览 Vue 学习中可能会使用的一些技术和知识。</p></blockquote>
<h2 id="articleHeader0">Why Vue?</h2>
<p>这里谈谈自己目前的看法：</p>
<p>当我们调用 API 从后台拉取数据后，如果想将这些数据渲染到页面中，就不得不使用循环，将拼接的 DOM 对象插入页面某一元素之中。在这一过程中，我们仅仅想操纵数据，却不得不为了渲染，而加入大量的标签拼接和 DOM 元素操作。这一点在进行复杂的 DOM 交互的时候体现的更为明显。</p>
<p>我们操作 DOM 元素，目的之一即是改变 DOM 的一些属性（HTML 属性、CSS 样式、子元素等）。而这些属性抽象来看都是数据，如果我们能够把对 DOM 的操作变为对数据的操作，而把数据与 DOM 之间的关联交给另一种机制处理，那么，很多需求都会得以优雅的实现。</p>
<p>使用 Vue 可以很好的解决上述问题，帮助开发者把时间更多地投入在核心业务实现上。</p>
<p>PS：当然，这不是 Vue 的唯一优点，但已经足够吸引我们去学习它。</p>
<h2 id="articleHeader1">Vue 的简单应用</h2>
<h3 id="articleHeader2">引入 Vue</h3>
<p>和其他 js 文件的引入方式相同，下载 vue.js 文件后，使用以下方式即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;./vue.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当然也可以使用 CDN 方式引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdn.bootcss.com/vue/2.3.3/vue.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.3/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注意，官方提供的 Vue 下载方式分为开发版本和生产版本，前者可以提供更为全面的报错信息。Vue 文件可以从以下网址中下载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://cn.vuejs.org/v2/guide/installation.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">https</span>://<span class="hljs-meta">cn</span>.vuejs.org/<span class="hljs-built_in">v2</span>/guide/installation.html</code></pre>
<h3 id="articleHeader3">Vue 实例</h3>
<blockquote><p>每个 Vue.js 应用都是</p></blockquote>
<p>通过构造函数 Vue 创建一个 Vue 的根实例 启动的。</p>
<p>解释下官方文档的意思：Vue.js 起作用的所有代码都是以 Vue 实例为入口的（或者说都会汇集到 Vue 实例之中）。而得到一个 Vue 实例只需使用以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;./vue.js&quot;></script>
<script>
    var app = new Vue({
        // 配置选项
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-comment">// 配置选项</span>
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注：Vue 代码需要在引入 vue.js 之后书写。</p>
<h3 id="articleHeader4">Vue 作用范围</h3>
<p>在 Vue 实例化的代码中，我们可以传入一个 <code>{}</code> 对象作为配置选项。而这其中最为重要的是 <code>el</code>，他标示着 Vue 代码作用的 DOM 元素范围。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>

</div>

<script>
    var app = new Vue({
        el: '#app'
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>通过设定 <code>el : '#app'</code>，使得 Vue 会监控 id 为 app 的 DOM 元素，从而使得 Vue 起到作用。</p>
<p>这也就意味着，除了这个 id 为 app 的 div 之外的元素，Vue 是无法作用的。</p>
<p>注意，这里的 <code>el</code> 最终只会定位到一个 DOM 元素。也就是说，即使这里写成 <code>.app</code> 或 <code>div</code>，也只会定位到第一个符合的 DOM。</p>
<h3 id="articleHeader5">data 配置和数据绑定</h3>
<p>另一个重要的配置是 <code>data</code>，标示 Vue 作用域之中可以使用的变量，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    "{{" msg "}}"
</div>

<script>
    var app = new Vue({
        el: '.app',
        data: {
            msg: 'hello'
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'.app'</span>,
        data: {
            msg: <span class="hljs-string">'hello'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>使用 moustache 语法（双花括号），Vue 会按照 <code>"{{" msg "}}"</code> 寻找 <code>data</code> 配置中的 <code>msg</code> 变量，并将其与 <code>"{{" msg "}}"</code> 替换。注意，这里的 msg 是处于 <code>data</code> 配置中的变量。如果需要使用字符串，需要写成 <code>"{{" 'string' "}}"</code>。</p>
<p>此外，<code>data</code> 配置对象中的每一项都会暴露出来，也就意味着我们可以使用以下方式得到 <code>msg</code> 的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '.app',
    data: {
        msg: 'hello'
    }
});
console.log(app.msg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> app = <span class="hljs-literal">new</span> Vue({
    el: <span class="hljs-string">'.app'</span>,
    <span class="hljs-built_in">data</span>: {
        msg: <span class="hljs-string">'hello'</span>
    }
});
console.<span class="hljs-keyword">log</span>(app.msg);</code></pre>
<p>而对于其他的配置项，想要使用他们，就需要使用以下方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(app.$el);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">app</span>.<span class="hljs-variable">$el</span>);</code></pre>
<p>这也就意味着，想要得到 <code>msg</code>，我们还可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(app.$data.msg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">app</span>.<span class="hljs-variable">$data</span>.msg);</code></pre>
<p>打通了这一步，我们已经可以做很多事情了。在上面的代码中，我们将 <code>data</code> 中的 <code>msg</code> 渲染为文本，这实际上是 <code>div#app</code> 的 <code>innerHTML</code> 属性。那么，其他的属性是不是也能照本宣科地替换呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <p title=&quot;"{{" title "}}"&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            title: 'p-title'
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{" title "}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            title: <span class="hljs-string">'p-title'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>打开浏览器，在审查元素中，我们发现 <code>title</code> 属性并没有被替换。而在控制台中会显示警告：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">Interpolation <span class="hljs-keyword">inside </span>attributes has <span class="hljs-keyword">been </span>removed. Use v-<span class="hljs-keyword">bind </span><span class="hljs-keyword">or </span>the colon <span class="hljs-keyword">shorthand </span><span class="hljs-keyword">instead.</span></code></pre>
<p>这表明，我们不能直接套用之前的方式来操作 DOM 的 HTML 属性。想要这么做的话，我们需要使用指令。</p>
<h3 id="articleHeader6">基础指令</h3>
<h4>v-bind</h4>
<p>为了能够操作 HTML 属性，我们需要使用如下方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <p v-bind:title=&quot;title&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            title: 'p-title'
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            title: <span class="hljs-string">'p-title'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这种 <code>v-</code> 的方式被称为指令，<code>v-bind</code> 为非常常用的一种。<code>v-bind:title="title"</code> 可以将 HTML 属性 title 替换为 <code>data</code> 中的 <code>title</code>。注意，这里我们无需再使用双花括号形式，写在指令中的值都会被认为是变量而从 <code>data</code> 中寻找。</p>
<p>想要使用字符串的话，可以加上单引号：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <p v-bind:title=&quot;'string title'&quot;></p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"'string title'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>同理，我们可以类比上例来改变其他属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <p v-bind:id=&quot;id&quot; v-bind:class=&quot;myclass&quot; v-bind:title=&quot;title&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            title: 'p-title',
            id: 'p-id',
            myclass: 'p-class'
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-bind:id</span>=<span class="hljs-string">"id"</span> <span class="hljs-attr">v-bind:class</span>=<span class="hljs-string">"myclass"</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            title: <span class="hljs-string">'p-title'</span>,
            id: <span class="hljs-string">'p-id'</span>,
            myclass: <span class="hljs-string">'p-class'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注意，这里使用 <code>myclass</code> 是为了防止与 <code>class</code> 关键字冲突。</p>
<h4>v-text &amp; v-html</h4>
<p>除了使用之前 <code>"{{" xxx "}}"</code> 的方式向 DOM 中插入文本值以外，我们也可以通过指令的方式做到这一点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <div v-text=&quot;text&quot;></div>
    <div v-html=&quot;html&quot;></div>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            text: '<h1> H1 TEXT </h1>',
            html: '<h1> H1 HTML </h1>'
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"html"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            text: <span class="hljs-string">'&lt;h1&gt; H1 TEXT &lt;/h1&gt;'</span>,
            html: <span class="hljs-string">'&lt;h1&gt; H1 HTML &lt;/h1&gt;'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>从字面意思也能看出，使用 <code>v-text</code> 插入的值会以文本形式展现，其中的 HTML 标签会被转义，而 <code>v-html</code> 则会直接以 HTML 代码的形式加入页面之中。</p>
<h4>v-if &amp; v-show</h4>
<p>在前端业务中，控制某些元素的显隐是很常见的功能，我们可以使用 <code>v-if</code> 进行控制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <div v-if=&quot;canShow&quot;>SHOW</div>
    <div v-if=&quot;!canShow&quot;>HIDE</div>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            canShow: true,
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"canShow"</span>&gt;</span>SHOW<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!canShow"</span>&gt;</span>HIDE<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            canShow: <span class="hljs-literal">true</span>,
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>打开浏览器，在审查元素中我们可以看到，SHOW 这一 div 会存在于页面之中，而另一个则不会。注意，这不是简单的 <code>display:none</code>，而是在 DOM 树中删除了这一节点。</p>
<p>如果我们想通过 <code>display</code> 控制显隐，可以使用 <code>v-show</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <div v-show=&quot;canShow&quot;>SHOW</div>
    <div v-show=&quot;!canShow&quot;>HIDE</div>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            canShow: true;
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"canShow"</span>&gt;</span>SHOW<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!canShow"</span>&gt;</span>HIDE<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            canShow: <span class="hljs-literal">true</span>;
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>打开审查元素可以看到，这里的隐藏是通过 <code>display:none</code> 进行控制的。</p>
<p>注意，这里我们使用了非运算符 <code>!canShow</code>。在属性绑定之中，单运算符是可以使用的，而对于如条件语句等相对复杂的计算，我们可以使用其他的方式，见后续 <code>computed</code> 配置内容。</p>
<h4>v-for</h4>
<p>提到前端应用，循环渲染也是经常使用的，最常见的便是表格渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <table v-for=&quot;rows in tables&quot; style=&quot;border: 1px solid #000;&quot;>
        <thead>
            <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>年龄</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for=&quot;(row, index) in rows&quot;>
                <td>"{{" index + 1 "}}"</td>
                <td>"{{" row.name "}}"</td>
                <td>"{{" row.age "}}"</td>
            </tr>
        </tbody>
    </table>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            tables: [
                [
                    {
                        name: 'foo1',
                        age: 'age1'
                    },
                    {
                        name: 'foo1',
                        age: 'age1'
                    }
                ],
                [
                    {
                        name: 'foo2',
                        age: 'age2'
                    }
                ]
            ],
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"rows in tables"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border: 1px solid #000;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>序号<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>年龄<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(row, index) in rows"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{" index + 1 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{" row.name "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{" row.age "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            tables: [
                [
                    {
                        name: <span class="hljs-string">'foo1'</span>,
                        age: <span class="hljs-string">'age1'</span>
                    },
                    {
                        name: <span class="hljs-string">'foo1'</span>,
                        age: <span class="hljs-string">'age1'</span>
                    }
                ],
                [
                    {
                        name: <span class="hljs-string">'foo2'</span>,
                        age: <span class="hljs-string">'age2'</span>
                    }
                ]
            ],
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这里注意，循环写在了循环项之中，而不是循环项的父级元素，需要与其他模板框架作区分。</p>
<h4>v-bind 指令的简写</h4>
<p>形如 <code>v-bind:xxx</code> 的指令中，<code>xxx</code> 成为指令的参数，而对于 <code>v-bind</code> 这种指令，参数是一定会有的，每次都写 <code>v-bind</code> 显得很是繁琐。Vue 为其提供了简写形式，使得我们可以使用 <code>:</code> 代替 <code>v-bind:</code> 书写这类指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <button :title=&quot;title&quot; :id=&quot;id&quot;>
        测试按钮
    </button>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            title: 'btn-text',
            id: 'btn-id',
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"id"</span>&gt;</span>
        测试按钮
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            title: <span class="hljs-string">'btn-text'</span>,
            id: <span class="hljs-string">'btn-id'</span>,
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader7">双向绑定</h3>
<p>在以上指令的例子中，数据单向的由 Vue 实例输出到 DOM 之中。在 vue.js 中，我们还可以使用 <code>v-model</code> 指令用以实现数据从 DOM 向 Vue 实例的输出。</p>
<p>事实上，用户能在浏览器 DOM 中手动改变的属性也就是 value 值，最直观的便是 input 标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <input type=&quot;text&quot; v-model=&quot;username&quot;>
    <p v-text=&quot;username&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            username: 'default-username',
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"username"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"username"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            username: <span class="hljs-string">'default-username'</span>,
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里，<code>v-model</code> 实现了数据的双向绑定，从而把 input, p 标签和 <code>data.username</code> 绑定在了一起。</p>
<p>同样的，具有 value 属性的元素都可以通过 <code>v-model</code> 实现双向绑定。</p>
<h4>texearea</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <textarea name=&quot;name&quot; rows=&quot;8&quot; cols=&quot;80&quot; v-model=&quot;description&quot;></textarea>
    <p v-text=&quot;description&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            description: 'default-description',
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"8"</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"80"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"description"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"description"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            description: <span class="hljs-string">'default-description'</span>,
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>radio</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <label for=&quot;&quot;><input type=&quot;radio&quot; name=&quot;gender&quot; value=&quot;male&quot; v-model=&quot;gender&quot;> 男 </label>
    <label for=&quot;&quot;><input type=&quot;radio&quot; name=&quot;gender&quot; value=&quot;female&quot; v-model=&quot;gender&quot;> 女 </label>

    <p v-text=&quot;gender&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            gender: 'male',
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"gender"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"male"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"gender"</span>&gt;</span> 男 <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"gender"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"female"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"gender"</span>&gt;</span> 女 <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"gender"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            gender: <span class="hljs-string">'male'</span>,
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>checkbox</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <label for=&quot;&quot;><input type=&quot;checkbox&quot; name=&quot;holiday&quot; value=&quot;Monday&quot; v-model=&quot;holiday&quot;> 周一 </label>
    <label for=&quot;&quot;><input type=&quot;checkbox&quot; name=&quot;holiday&quot; value=&quot;Tuesday&quot; v-model=&quot;holiday&quot;> 周二 </label>
    <label for=&quot;&quot;><input type=&quot;checkbox&quot; name=&quot;holiday&quot; value=&quot;Wednesday&quot; v-model=&quot;holiday&quot;> 周三 </label>

    <p v-text=&quot;holiday&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            holiday: [],
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"holiday"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Monday"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"holiday"</span>&gt;</span> 周一 <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"holiday"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Tuesday"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"holiday"</span>&gt;</span> 周二 <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"holiday"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Wednesday"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"holiday"</span>&gt;</span> 周三 <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"holiday"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            holiday: [],
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注意，多选框中需要把 <code>holiday</code> 设置为 <code>[]</code>。</p>
<h4>单选 select</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <select v-model=&quot;holiday&quot; style=&quot;width: 50px&quot;>
        <option value=&quot;Monday&quot;>Monday</option>
        <option value=&quot;Tuesday&quot;>Tuesday</option>
        <option value=&quot;Wednesday&quot;>Wednesday</option>
  </select>
  <p v-text=&quot;holiday&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            holiday: null,
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"holiday"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 50px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Monday"</span>&gt;</span>Monday<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Tuesday"</span>&gt;</span>Tuesday<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Wednesday"</span>&gt;</span>Wednesday<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"holiday"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            holiday: <span class="hljs-literal">null</span>,
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>多选 select</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <select v-model=&quot;holiday&quot; multiple style=&quot;width: 50px&quot;>
        <option value=&quot;Monday&quot;>Monday</option>
        <option value=&quot;Tuesday&quot;>Tuesday</option>
        <option value=&quot;Wednesday&quot;>Wednesday</option>
  </select>
  <p v-text=&quot;holiday&quot;></p>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            holiday: [],
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"holiday"</span> <span class="hljs-attr">multiple</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 50px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Monday"</span>&gt;</span>Monday<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Tuesday"</span>&gt;</span>Tuesday<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Wednesday"</span>&gt;</span>Wednesday<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"holiday"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            holiday: [],
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader8">计算属性</h3>
<p>有时，我们可能需要对 <code>data</code> 中的一些值进行简单的计算，从而得到一个可能会复用的计算后的值。在 Vue 中，可以通过 <code>computed</code> 配置实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <h1>"{{" info "}}"</h1>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            name: 'my-name',
            age: 'my-age',
        },
        computed: {
            info: function(){
                return 'Name: ' + this.name + ', Age: ' + this.age;
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" info "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            name: <span class="hljs-string">'my-name'</span>,
            age: <span class="hljs-string">'my-age'</span>,
        },
        computed: {
            info: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">return</span> <span class="hljs-string">'Name: '</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">', Age: '</span> + <span class="hljs-keyword">this</span>.age;
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在这里，我们通过 <code>computed</code> 配置中的 <code>info</code> 计算了 <code>name</code> 和 <code>age</code> 的值。而对于计算属性 <code>info</code>，它的使用和 <code>data</code> 是相同的。</p>
<p><code>info</code> 会监听 <code>name</code> 和 <code>age</code> 的变化，当他们的值改变时，<code>info</code> 都会改变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <input type=&quot;text&quot; v-model=&quot;name&quot;>
    <input type=&quot;text&quot; v-model=&quot;age&quot;>
    <h1>"{{" info "}}"</h1>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            name: 'my-name',
            age: 'my-age',
        },
        computed: {
            info: function(){
                return 'Name: ' + this.name + ', Age: ' + this.age;
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"name"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"age"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" info "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            name: <span class="hljs-string">'my-name'</span>,
            age: <span class="hljs-string">'my-age'</span>,
        },
        computed: {
            info: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">return</span> <span class="hljs-string">'Name: '</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">', Age: '</span> + <span class="hljs-keyword">this</span>.age;
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h3 id="articleHeader9">事件</h3>
<p>在前端应用中，事件机制是必不可少的，Vue 中使用 <code>v-on:xxx</code> 来为元素绑定事件。而在事件触发机制中，事件被配置在 <code>methods</code> 之中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <button v-on:click=&quot;add&quot;>增加</button>
    <h1>"{{" count "}}"</h1>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            count: 0,
        },
        methods: {
            add: function(){
                this.count++;
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"add"</span>&gt;</span>增加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" count "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            count: <span class="hljs-number">0</span>,
        },
        methods: {
            add: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">this</span>.count++;
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在这里，我们通过 <code>v-on:click="add"</code> 为 button 添加了一个点击时间，并使其在点击后触发 <code>methods</code> 之中的 <code>add</code> 方法。</p>
<p>此外，我们也经常遇到检测键盘按键事件的需求，比如检测回车键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <input type=&quot;text&quot; v-on:keydown=&quot;keydown&quot;>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            count: 0,
        },
        methods: {
            keydown: function(e){
                if(13 === e.keyCode){
                    console.log('Enter pressed.');
                }
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-on:keydown</span>=<span class="hljs-string">"keydown"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">keydown</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                <span class="hljs-keyword">if</span>(<span class="hljs-number">13</span> === e.keyCode){
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Enter pressed.'</span>);
                }
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>Vue 中提供了一种更为简便的方式来针对性地检测按键类别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <input type=&quot;text&quot; v-on:keydown.enter=&quot;keydown&quot;>
</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            count: 0,
        },
        methods: {
            keydown: function(e){
                console.log('Enter pressed.');
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-on:keydown.enter</span>=<span class="hljs-string">"keydown"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">keydown</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Enter pressed.'</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这种形如 <code>v-on:keydown.enter</code> 的写法被称为修饰符。在 Vue 中，可以使用的修饰符有很多，能够大大简化我们的代码。</p>
<p>与 <code>v-bind:xxx</code> 相同，<code>v-on:xxx</code> 也比较常用。在 Vue 中，我可以使用如下方式简写这一指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <input type=&quot;text&quot; @keydown.enter=&quot;keydown&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"app"</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> @keydown.enter=<span class="hljs-string">"keydown"</span>&gt;
&lt;/div&gt;</code></pre>
<h3 id="articleHeader10">组件</h3>
<h4>局部组件和全局组件</h4>
<p>在很多前端框架中，我们可以使用 <code>class="navbar"</code> 来得到一个具有导航样式的 DOM 元素。试想，如果我们可以使用 <code>&lt;Navbar&gt;&lt;/Navbar&gt;</code> 来创建导航元素，那么在语义层面会显得更容易理解。页面的布局也会显得更为清晰（事实上，在 HTML5 中，也新增了一些语义化的标签）。</p>
<p>想要实现这一点，我们就需要使用 Vue 中的组件。关于组件有很多东西要说，这里先简单的介绍下组件的简单用法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>

<script>
    var app = new Vue({
        el: '#app',
        components: {
            'navbar' : {
                template: '<div> --- hello navbar --- </div>'
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        components: {
            <span class="hljs-string">'navbar'</span> : {
                template: <span class="hljs-string">'&lt;div&gt; --- hello navbar --- &lt;/div&gt;'</span>
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我们使用 <code>components</code> 配置了一个名为 <code>navbar</code> 的组件。而后 Vue 会根据配置，将对应的标签替换为 <code>template</code> 中的内容。</p>
<p>注意，这种组件注册的方式为局部注册，即该组件只能在当前 Vue 实例的作用域（<code>el</code> 配置的 DOM 元素下）才有效果。除此之外，我们也可以在全局注册组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<div> --- global component --- </div>',
    });

    var app = new Vue({
        el: '#app',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;div&gt; --- global component --- &lt;/div&gt;'</span>,
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我们可以通过多个 <code>Vue.component('component-name', { /*config*/ })</code> 在全局注册多个组件。</p>
<p>所谓全局，也就是说，在任意 Vue 实例中都是起作用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>
<div id=&quot;foo&quot;>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<div> --- global component --- </div>',
    });

    var app = new Vue({
        el: '#app',
    });

    var foo = new Vue({
        el: '#foo',
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"foo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;div&gt; --- global component --- &lt;/div&gt;'</span>,
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });

    <span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#foo'</span>,
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>组件的另一种引用方式</h4>
<p>直接在 <code>template</code> 配置中以字符串的形式写入标签显得很突兀，Vue 还提供了另一种引入模板的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>
<div id=&quot;foo&quot;>
    <navbar></navbar>
</div>

<script type=&quot;text/x-template&quot; id=&quot;my-template&quot;>
    <div> --- global component --- </div>
</script>

<script>
    Vue.component('navbar', {
        template: '#my-template',
    });

    var app = new Vue({
        el: '#app',
    });

    var foo = new Vue({
        el: '#foo',
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"foo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"my-template"</span>&gt;</span><span class="javascript">
    &lt;div&gt; --- global component --- <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'#my-template'</span>,
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });

    <span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#foo'</span>,
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注意，<code>x-template</code> 脚本务必写在 Vue 代码之上，不然会因为引入顺序的问题导致 Vue 找不到模板。</p>
<h4>组件命名约定</h4>
<p>如文档中所说，在注册组件的时候，对命名的方式是没有限制的，但在使用时却需要使用短横线形式：</p>
<blockquote><p>当注册组件（或者 props）时，可以使用短横线（kebab-case） ，小驼峰（camelCase） ，或大驼峰（TitleCase） 。Vue 不关心这个。<br>而在 HTML 模版中，请使用 kebab-case 形式。</p></blockquote>
<p>这也就是说，形如下列形式的组件命名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components: {
  'kebab-cased-component': { /* ... */ },
  'camelCasedComponent': { /* ... */ },
  'TitleCasedComponent': { /* ... */ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">components:</span> {
  <span class="hljs-string">'kebab-cased-component'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-string">'camelCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-string">'TitleCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> }
}</code></pre>
<p>在使用时，都需要变为短横线形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;kebab-cased-component&gt;</span><span class="hljs-section">&lt;/kebab-cased-component&gt;</span>
<span class="hljs-section">&lt;camel-cased-component&gt;</span><span class="hljs-section">&lt;/camel-cased-component&gt;</span>
<span class="hljs-section">&lt;title-cased-component&gt;</span><span class="hljs-section">&lt;/title-cased-component&gt;</span></code></pre>
<h4>组件插值</h4>
<p>在全局注册方式之下，我们可以通过以下方式引入 <code>data</code> 值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<div> "{{" count "}}" </div>',
        data: {
            count: 1,
        }
    });

    var app = new Vue({
        el: '#app',

    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, </span></span><span class="hljs-template-variable">{
        template: '&lt;div&gt; "{{" count }</span><span class="xml"><span class="handlebars"><span class="xml">} <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>',
        data: </span></span></span><span class="hljs-template-variable">{
            count: 1,
        }</span><span class="xml"><span class="actionscript">
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue(</span></span><span class="hljs-template-variable">{
        el: '#app',

    }</span><span class="xml"><span class="undefined">);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>注意，这里的 <code>data</code> 值写在了全局的 <code>component</code> 之中，而非 Vue 实例。</p>
<p>当我们这么写时，浏览器会报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="The &quot;data&quot; option should be a function that returns a per-instance value in component definitions." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">The <span class="hljs-string">"data"</span> option should be <span class="hljs-selector-tag">a</span> function that returns <span class="hljs-selector-tag">a</span> per-instance value <span class="hljs-keyword">in</span> component definitions.</code></pre>
<p>借用文档中的方法，我们可以使用如下方式使 data 返回函数，从而跳过报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = {
    count: 1
};

Vue.component('navbar', {
    template: '<div> "{{" count "}}" </div>',
    data: function(){
        return data;
    }
});

var app = new Vue({
    el: '#app',
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> data = {
    <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
};

Vue.component(<span class="hljs-string">'navbar'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt; "{{" count "}}" &lt;/div&gt;'</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> data;
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
});</code></pre>
<p>但当我们这样书写代码时，就会发现出现了问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
    <navbar></navbar>
    <navbar></navbar>
</div>

<script>
    let data = {
        count: 1
    };

    Vue.component('navbar', {
        template: '<button @click=&quot;count = count + 1&quot;> "{{" count "}}" </button>',
        data: function(){
            return data;
        },
    });

    var app = new Vue({
        el: '#app',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> data = {
        <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
    };

    Vue.component(<span class="hljs-string">'navbar'</span>, {
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;button @click="count = count + 1"&gt; "{{" count "}}" &lt;/button&gt;'</span>,
        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> data;
        },
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这是官方文档中的一个例子，在这一例子中，点击任意一个 <code>navbar</code> 组件，都会使得 <code>count</code> 值加 1，这意味着组件间共用了 <code>count</code> 变量。</p>
<p>有时我们确实需要组件间共享变量，但更多的需求是各个组件独享，这时我们便需要将 <code>data</code> 写为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
    <navbar></navbar>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<button @click=&quot;count = count + 1&quot;> "{{" count "}}" </button>',
        data: function(){
            return {
                count: 1
            };
        }
    });

    var app = new Vue({
        el: '#app',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;button @click="count = count + 1"&gt; "{{" count "}}" &lt;/button&gt;'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> {
                count: <span class="hljs-number">1</span>
            };
        }
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>乍一看，这种方式和之前的写法似乎是一样的（只是把 let data 替换掉而已），可是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
    count: 1
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">return</span> {
    <span class="hljs-attribute">count</span>: <span class="hljs-number">1</span>
};</code></pre>
<p>的写法实际相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return new Object({
    count: 1
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Object</span>({
    <span class="hljs-attribute">count</span>: <span class="hljs-number">1</span>
});</code></pre>
<p>如果读者在之前有了解过深拷贝和浅拷贝的知识的话，就会很容易理解这一点了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = {
    count: 1
};

Vue.component('navbar', {
    template: '<button @click=&quot;count = count + 1&quot;> "{{" count "}}" </button>',
    data: function(){
        return data;
    },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>let <span class="hljs-keyword">data</span> = {
    <span class="hljs-built_in">count</span>: <span class="hljs-number">1</span>
};

Vue.component(<span class="hljs-string">'navbar'</span>, {
    template: <span class="hljs-string">'&lt;button @click="count = count + 1"&gt; "{{" count "}}" &lt;/button&gt;'</span>,
    <span class="hljs-keyword">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>;
    },
});</code></pre>
<p>这种方式使得每个组件操作的数值都是同一个 <code>data</code>，而组件触发事件后所修改的值都是同一个 <code>data</code> 的 <code>count</code> 键，自然会导致之前的结果。</p>
<p>而当代码写成以下形式时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
    count: 1
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">return</span> {
    <span class="hljs-attribute">count</span>: <span class="hljs-number">1</span>
};</code></pre>
<p>每次的返回值都是一个新的 <code>Object</code>，这样就可以使得各个组件独享数据了。</p>
<p>但是问题又来了，当需要各个组件共享某一变量时该怎么做呢？参照上述的内容，我们可以使用如下方式实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
    <navbar></navbar>
    <navbar></navbar>
</div>

<script>
    let store = {
        globalCount : 0,
    }

    Vue.component('navbar', {
        template: '<div><button @click=&quot;localCount += 1&quot;> Local: "{{" localCount "}}" </button> <button @click=&quot;store.globalCount += 1&quot;> Global: "{{" store.globalCount "}}" </button></div>',
        data: function(){
            return {
                localCount: 1,
                store: store,
            };
        }
    });

    var app = new Vue({
        el: '#app',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> store = </span></span><span class="hljs-template-variable">{
        globalCount : 0,
    }</span><span class="xml"><span class="actionscript">

    Vue.component(<span class="hljs-string">'navbar'</span>, </span></span><span class="hljs-template-variable">{
        template: '&lt;div&gt;&lt;button @click="localCount += 1"&gt; Local: "{{" localCount }</span><span class="xml"><span class="handlebars"><span class="xml">} <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"store.globalCount += 1"</span>&gt;</span> Global: </span></span></span><span class="hljs-template-variable">"{{" store.globalCount }</span><span class="xml"><span class="handlebars"><span class="xml">} <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>',
        data: function()</span></span></span><span class="hljs-template-variable">{
            return {
                localCount: 1,
                store: store,
            }</span><span class="xml"><span class="actionscript">;
        }
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue(</span></span><span class="hljs-template-variable">{
        el: '#app',
    }</span><span class="xml"><span class="undefined">);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>类比深拷贝和浅拷贝的知识，上例会比较容易理解。在使用中，共享和独享数据需要根据需求针对选择。</p>
<p>注意，这里我们把 <code>template</code> 写成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <button @click=&quot;localCount += 1&quot;> Local: "{{" localCount "}}" </button> 
    <button @click=&quot;store.globalCount += 1&quot;> Global: "{{" store.globalCount "}}" </button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"localCount += 1"</span>&gt;</span> Local: </span><span class="hljs-template-variable">"{{" localCount "}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"store.globalCount += 1"</span>&gt;</span> Global: </span><span class="hljs-template-variable">"{{" store.globalCount "}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>是因为组件必须只有一个元素作为根元素，直接写成两个 <code>button</code> 标签会出现如下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Component</span> template should contain exactly one root element. <span class="hljs-keyword">If</span> you are using v-<span class="hljs-keyword">if</span> <span class="hljs-keyword">on</span> multiple elements, <span class="hljs-keyword">use</span> v-<span class="hljs-keyword">else</span>-<span class="hljs-keyword">if</span> <span class="hljs-keyword">to</span> chain them instead.</code></pre>
<h4>组件注意事项</h4>
<p>如官方文档所说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 <ul> ，<ol>，<table> ，<select> 限制了能被它包裹的元素， 而一些像 <option> 这样的元素只能出现在某些其它元素内部。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">当使用 DOM 作为模版时（例如，将 <span class="hljs-keyword">el</span> 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 <span class="hljs-symbol">&lt;ul&gt;</span> ，<span class="hljs-symbol">&lt;ol&gt;</span>，<span class="hljs-symbol">&lt;table&gt;</span> ，<span class="hljs-symbol">&lt;select&gt;</span> 限制了能被它包裹的元素， 而一些像 <span class="hljs-symbol">&lt;option&gt;</span> 这样的元素只能出现在某些其它元素内部。</code></pre>
<p>在某些时候，我们需要使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
  <tr is=&quot;my-row&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-row"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>来代替：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-row></my-row>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;my-row&gt;</span><span class="hljs-section">&lt;/my-row&gt;</span></code></pre>
<h4>组件传参</h4>
<p>大家应该会注意到，以上我们在使用数据时，<code>data</code> 字段是写于 <code>Vue.component</code> 之中而非 Vue 实例中的。这是因为，组件是不能直接访问全局数据的，这一机制实际上防止了组件数据的污染。当我们写成如下形式时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<div> Local: "{{" count "}}" </div>',
    });

    var app = new Vue({
        el: '#app',
        data: function(){
            return {
                count: 1,
            };
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;div&gt; Local: "{{" count "}}" &lt;/div&gt;'</span>,
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> {
                count: <span class="hljs-number">1</span>,
            };
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>会有报错信息，提示 <code>count</code> 值找不到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: Property or method &quot;count&quot; is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code style="word-break: break-word; white-space: initial;">[Vue warn]: <span class="hljs-keyword">Property</span> <span class="hljs-keyword">or</span> <span class="hljs-function"><span class="hljs-keyword">method</span> "<span class="hljs-title">count</span>" <span class="hljs-title">is</span> <span class="hljs-title">not</span> <span class="hljs-title">defined</span> <span class="hljs-title">on</span> <span class="hljs-title">the</span> <span class="hljs-title">instance</span> <span class="hljs-title">but</span> <span class="hljs-title">referenced</span> <span class="hljs-title">during</span> <span class="hljs-title">render</span>. <span class="hljs-title">Make</span> <span class="hljs-title">sure</span> <span class="hljs-title">to</span> <span class="hljs-title">declare</span> <span class="hljs-title">reactive</span> <span class="hljs-title">data</span> <span class="hljs-title">properties</span> <span class="hljs-title">in</span> <span class="hljs-title">the</span> <span class="hljs-title">data</span> <span class="hljs-title">option</span>.</span></code></pre>
<p>当组件需要使用全局数据时，需要通过传参的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar :counter=&quot;count&quot;></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<div> Local: "{{" counter "}}" </div>',
        props: [
            'counter'
        ]
    });

    var app = new Vue({
        el: '#app',
        data: function(){
            return {
                count: 1,
            };
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span> <span class="hljs-attr">:counter</span>=<span class="hljs-string">"count"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;div&gt; Local: "{{" counter "}}" &lt;/div&gt;'</span>,
        props: [
            <span class="hljs-string">'counter'</span>
        ]
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> {
                count: <span class="hljs-number">1</span>,
            };
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上例中，<code>Vue.component</code> 配置中的 <code>props</code> 规定了该组件可以传递的参数。之后便可以在通过 <code>&lt;navbar :counter="count"&gt;&lt;/navbar&gt;</code> 实现参数传递。</p>
<p>我们把这种传参方式抽象来看，这其实形成了父组件到子组件的数据流。</p>
<p>这里务必注意以下两种方式的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<navbar :counter=&quot;count&quot;></navbar>
<navbar counter=&quot;count&quot;></navbar>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;navbar <span class="hljs-symbol">:counter=<span class="hljs-string">"count"</span>&gt;&lt;/navbar&gt;</span>
&lt;navbar counter=<span class="hljs-string">"count"</span>&gt;&lt;<span class="hljs-regexp">/navbar&gt;</span></code></pre>
<p>根据之前数据绑定的内容，前者中的 <code>counter</code> 相当于 <code>v-bind:counter</code>，这里的 <code>count</code> 为变量；而后者的 <code>count</code> 只相当于字符串 <code>'count'</code>。</p>
<p>这里引出另一个问题：在 <code>v-bind:xxx="foo"</code> 中出现的 <code>foo</code> 其实是变量名，如果想输入字符串，需要写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-bind:xxx=&quot;'foo'&quot;  # 注意单引号" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code style="word-break: break-word; white-space: initial;">v-<span class="hljs-keyword">bind</span>:xxx=<span class="hljs-string">"'foo'"</span>  <span class="hljs-comment"># 注意单引号</span></code></pre>
<p>这里涉及到字面量值的问题，比如当我们需要传递数字 1 的时候，使用 <code>counter="1"</code> 实际传入字符串 <code>'1'</code>。我需要通过 <code>v-bind:counter="1"</code> 才能正确地传入数字 1；</p>
<h4>事件传递</h4>
<p>现在我们知道，父组件可以通过 <code>props</code> 向子组件传递参数，数据流实现了自根向叶的传递，那么子组件如何向父组件传递信息呢？</p>
<p>在 Vue 中，我们需要通过自定义事件来实现数据的反向流动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar @my-event=&quot;pop&quot; ></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<button @click=&quot;clicker&quot;>POP</button>',
        methods: {
            clicker: function(){
                this.$emit('my-event');
            }
        }
    });

    var app = new Vue({
        el: '#app',
        methods: {
            pop: function(){
                alert('A child component pops.');
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span> @<span class="hljs-attr">my-event</span>=<span class="hljs-string">"pop"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;button @click="clicker"&gt;POP&lt;/button&gt;'</span>,
        methods: {
            clicker: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'my-event'</span>);
            }
        }
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        methods: {
            pop: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                alert(<span class="hljs-string">'A child component pops.'</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在上例中，子组件捕捉 <code>clicker</code> 事件后，通过 <code>this.$emit('my-event')</code> 向上传递了 <code>my-event</code> 事件。而在 <code>&lt;navbar @my-event="pop" &gt;&lt;/navbar&gt;</code> 中，捕获了 <code>my-event</code> 这一自定义事件，从而打通了反向的通路。</p>
<p>可是似乎我们只是打通了通路，数据应该怎么传递呢？在 Vue 中，我们只需在事件函数中添加参数即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('navbar', {
    template: '<button @click=&quot;clicker&quot;>POP</button>',
    methods: {
        clicker: function(){
            let paramA = 'hello';
            let paramB = 'vue';

            this.$emit('my-event', paramA, paramB);
        }
    }
});

var app = new Vue({
    el: '#app',
    methods: {
        pop: function(pA, pB){
            alert('A child component pops with params: ' + pA + ', ' + pB);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.component(<span class="hljs-string">'navbar'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;button @click="clicker"&gt;POP&lt;/button&gt;'</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">clicker</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> paramA = <span class="hljs-string">'hello'</span>;
            <span class="hljs-keyword">let</span> paramB = <span class="hljs-string">'vue'</span>;

            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'my-event'</span>, paramA, paramB);
        }
    }
});

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">pop</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">pA, pB</span>)</span>{
            alert(<span class="hljs-string">'A child component pops with params: '</span> + pA + <span class="hljs-string">', '</span> + pB);
        }
    }
});</code></pre>
<h4>原生事件传递</h4>
<p>使用自定义事件固然可以做到业务逻辑的反向流动，但面对一些开源的组件库，直接修改源码显然不显示。如果此时我们希望对一些组件绑定诸如点击等事件，就需要使用到 <code>native</code> 修饰符实现。</p>
<p>如下代码中，直接对组件绑定点击事件是无效的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <child @click='clicker'></child>
</div>

<script src=&quot;./vue.js&quot;></script>
<script>
    Vue.component('child', {
        template: '<button>POP</button>'
    });

    var app = new Vue({
        el: '#app',
        methods: {
            clicker: function() {
                alert('A child component click.');
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'clicker'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'child'</span>, {
        template: <span class="hljs-string">'&lt;button&gt;POP&lt;/button&gt;'</span>
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        methods: {
            clicker: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
                alert(<span class="hljs-string">'A child component click.'</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>面对这种情况，我们需要使用 <code>native</code> 修饰符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <child @click.native='clicker'></child>
</div>

<script src=&quot;./vue.js&quot;></script>
<script>
    Vue.component('child', {
        template: '<button>POP</button>'
    });

    var app = new Vue({
        el: '#app',
        methods: {
            clicker: function() {
                alert('A child component click.');
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> @<span class="hljs-attr">click.native</span>=<span class="hljs-string">'clicker'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'child'</span>, {
        template: <span class="hljs-string">'&lt;button&gt;POP&lt;/button&gt;'</span>
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        methods: {
            clicker: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
                alert(<span class="hljs-string">'A child component click.'</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader11">渲染函数</h3>
<p>在之前已经说过，我们可以通过以下方式实现组件渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<h1>template...</h1>',
    });

    var app = new Vue({
        el: '#app',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;h1&gt;template...&lt;/h1&gt;'</span>,
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 Vue 中，采用这种 <code>template</code> 的方式（包括 <code>&lt;script type='text/x-template'&gt;&lt;/script&gt;</code>）后，Vue 会将其编译为 <code>render</code> 函数。形如以下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
</div>

<script>
    Vue.component('navbar', {
        render: function(createElement){
            return createElement('h1', 'template..');
        },
    });

    var app = new Vue({
        el: '#app',
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span></span>{
            <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'h1'</span>, <span class="hljs-string">'template..'</span>);
        },
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在这里演示了简单的 <code>render</code> 函数应用，<code>createElement('h1', 'some content')</code> 相当于 <code>&lt;h1&gt;some content&lt;/h1&gt;</code>。</p>
<p>对于更为复杂的模板，我们可以使用如下方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar :proptitle=&quot;mytitle&quot;></navbar>
</div>

<script>
    Vue.component('navbar', {
        render: function(createElement) {
            return createElement('div', {
                domProps: {
                    innerText: 'content..',
                },
                attrs: {
                    id: 'my-id',
                    title: this.proptitle
                },
                props: ['proptitle']
            });
        },
    });

    var app = new Vue({
        el: '#app',
        data: function() {
            return {
                mytitle: 'my-title'
            };
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span> <span class="hljs-attr">:proptitle</span>=<span class="hljs-string">"mytitle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(createElement)</span> </span>{
            <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">'div'</span>, {
                domProps: {
                    innerText: <span class="hljs-string">'content..'</span>,
                },
                attrs: {
                    id: <span class="hljs-string">'my-id'</span>,
                    title: <span class="hljs-keyword">this</span>.proptitle
                },
                props: [<span class="hljs-string">'proptitle'</span>]
            });
        },
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> {
                mytitle: <span class="hljs-string">'my-title'</span>
            };
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上例中，我们使用 <code>domProps</code> 设置了 <code>v-text</code>；使用 <code>attrs</code> 设置了标签的 HTML 属性。其中，<code>title: this.proptitle</code> 将 <code>title</code> 属性与 <code>proptitle</code> 关联了起来。</p>
<p>采用 <code>template</code> 的写法相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar :proptitle=&quot;mytitle&quot;></navbar>
</div>

<script>
    Vue.component('navbar', {
        template: '<div id=&quot;my-id&quot; title=&quot;proptitle&quot;>content</div>',
        props: ['proptitle']
    });

    var app = new Vue({
        el: '#app',
        data: function() {
            return {
                mytitle: 'my-title'
            };
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span> <span class="hljs-attr">:proptitle</span>=<span class="hljs-string">"mytitle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;div id="my-id" title="proptitle"&gt;content&lt;/div&gt;'</span>,
        props: [<span class="hljs-string">'proptitle'</span>]
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> {
                mytitle: <span class="hljs-string">'my-title'</span>
            };
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>可以看出，<code>render</code> 函数相当于实现了标签到对象的编译过程。</p>
<h4>createElement 别名</h4>
<p>根据文档中所说，我们可以使用 <code>h</code> 作为 <code>createElement</code> 的别名，从而遵守 Vue 社区的规范。</p>
<blockquote><p>将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 h 失去作用， 在应用中会触发报错。</p></blockquote>
<p>即写为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('App', {
    render: function(h) {
        return h('div', {
            
        });
    },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.component(<span class="hljs-string">'App'</span>, {
    render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(h)</span> </span>{
        <span class="hljs-keyword">return</span> h(<span class="hljs-string">'div'</span>, {
            
        });
    },
});</code></pre>
<h4>运行时构建和独立构建</h4>
<p>在 Vue 中，运行过程可以分为编译为 <code>render</code> 函数，以及渲染函数被调用两步。</p>
<p>我们可以把这两部都放在浏览器中进行，这种方式被称之为运行时构建。由于运行时构建不会先产生编译后的 <code>render</code> 函数，因而文件比较小。</p>
<p>除了运行时构建，我们还可以将编译为 <code>render</code> 函数的过程放在服务端（非浏览器端）进行，比如采用 <code>vue-loader</code> 一类的工具实现进行编译（如进行 vue 单文件组件开发时）。而这一类便为称为独立构建。可想而知，独立构建会产生不少 <code>render</code> 函数，从而使得其文件体积较大。</p>
<h3 id="articleHeader12">字符串模板与非字符串模板</h3>
<p>由于 HTML 中并无标签和属性的大小写区别，所以 <code>mytitle="xxx"</code> 和 <code>myTitle="xxx"</code> 是一样的。这也就意味着，当我们需要使用一些属性向模板传值的时候，小驼峰（camelCased ）的命名形式需要转为短横线（kebab-case）形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar :prop-title=&quot;mytitle&quot;></navbar>
</div>

<script type=&quot;text/x-template&quot; id=&quot;template&quot;>
    <h1 :title=&quot;propTitle&quot;>"{{"propTitle"}}"</h1>
</script>

<script>
    Vue.component('navbar', {
        template: '#template',
        props: ['propTitle']
    });

    var app = new Vue({
        el: '#app',
        data: function() {
            return {
                mytitle: 'title_content'
            };
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span> <span class="hljs-attr">:prop-title</span>=<span class="hljs-string">"mytitle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"propTitle"</span>&gt;</span></span><span class="hljs-template-variable">"{{"propTitle"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'#template'</span>,
        props: [<span class="hljs-string">'propTitle'</span>]
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> {
                mytitle: <span class="hljs-string">'title_content'</span>
            };
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当我们采用驼峰形式作为属性向模板中传值时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<navbar :propTitle=&quot;mytitle&quot;></navbar>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;navbar <span class="hljs-symbol">:propTitle=<span class="hljs-string">"mytitle"</span>&gt;&lt;/navbar&gt;</span></code></pre>
<p>实际接收到的属性为：<code>proptitle</code>，而在定义中，注册的属性变量为：<code>propTitle</code>，因而不能正确的传递信息。此时，Vue 会在控制台给出提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue tip]: Prop &quot;proptitle&quot; is passed to component <Navbar>, but the declared prop name is &quot;propTitle&quot;. Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM templates. You should probably use &quot;prop-title&quot; instead of &quot;propTitle&quot;." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;">[Vue tip]: Prop <span class="hljs-string">"proptitle"</span> <span class="hljs-keyword">is</span> passed <span class="hljs-keyword">to</span> <span class="hljs-keyword">component</span> &lt;Navbar&gt;, but the declared prop name <span class="hljs-keyword">is</span> <span class="hljs-string">"propTitle"</span>. <span class="hljs-literal">Note</span> that HTML attributes are <span class="hljs-keyword">case</span>-insensitive <span class="hljs-keyword">and</span> camelCased props need <span class="hljs-keyword">to</span> <span class="hljs-keyword">use</span> their kebab-<span class="hljs-keyword">case</span> equivalents <span class="hljs-keyword">when</span> using <span class="hljs-keyword">in</span>-DOM templates. You should probably <span class="hljs-keyword">use</span> <span class="hljs-string">"prop-title"</span> instead <span class="hljs-keyword">of</span> <span class="hljs-string">"propTitle"</span>.</code></pre>
<p>在上例中，我们使用 <code>&lt;navbar :prop-title="mytitle"&gt;&lt;/navbar&gt;</code> 的形式在 <code>#app</code> 作用域下使用了模板。如之前所说，这种形式会受制于 HTML 无视大小写的问题，为了规避这一问题，除了上述所说的短横线形式之外，我们还可以使用其他调用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <demo></demo>
</div>

<script>
    Vue.component('navbar', {
        template: '<h1 :title=&quot;propTitle&quot;>"{{"propTitle"}}"</h1>',
        props: ['propTitle']
    });

    Vue.component('demo', {
        template: '<navbar :prop-title=&quot;mytitle&quot;></navbar>',
        data: function() {
            return {
                mytitle: 'title_content'
            };
        }
    });

    var app = new Vue({
        el: '#app'
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">demo</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">demo</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Vue.component(<span class="hljs-string">'navbar'</span>, {
        template: <span class="hljs-string">'&lt;h1 :title="propTitle"&gt;"{{"propTitle"}}"&lt;/h1&gt;'</span>,
        props: [<span class="hljs-string">'propTitle'</span>]
    });

    Vue.component(<span class="hljs-string">'demo'</span>, {
        template: <span class="hljs-string">'&lt;navbar :prop-title="mytitle"&gt;&lt;/navbar&gt;'</span>,
        data: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> {
                mytitle: <span class="hljs-string">'title_content'</span>
            };
        }
    });

    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注：这里写成短横线形式也是可以的。</p>
<p>在本例中，我们使用 <code>demo</code> 标签调用 <code>demo</code> 组件，进而调用 <code>navbar</code>，注意，由于 <code>&lt;navbar :prop-title="mytitle"&gt;&lt;/navbar&gt;</code> 并没有直接以 HTML 的形式存在，而是以字符串的方式出现在 <code>template</code> 的配置中。如上述关于渲染函数的<br>介绍，这种形式可以规避 HTML 本身大小写不敏感而导致的问题。</p>
<p>同理，之前提到的组件命名约定所需保证的短横线引用形式，在字符串模式中也是无需遵守的。</p>
<p><strong>注：文档中采用字符串模板和非字符串模板来表示二者的区分，个人觉得这样的描述反而容易引起歧义。实际上，无论是采用上述写法或是用渲染函数（又或是后续会提及的单文件组件），只要能够跳过 HTML 的直接形式，都可以避免大小写不敏感而导致的问题。</strong></p>
<h3 id="articleHeader13">Vue 生命周期</h3>
<p>文档中提到了 Vue 实例的生命周期，以及与之相关的生命周期钩子函数。所谓钩子函数，即是在进入生命周期的各个阶段时触发的函数。为了正确的使用这些生命周期钩子函数，我们首先需要了解 Vue 到底有哪些生命周期。</p>
<p>一个 Vue 示例的生命周期大体上为：data 的创建，DOM 节点的创建，data 的更新，以及实例的销毁。</p>
<p>根据 Vue 实例在各个阶段的任务，Vue 提供了以下生命周期钩子函数，用于在进入具体的某一阶段时，自定义地执行一些操作：</p>
<h4>beforeCreate &amp; created</h4>
<p>二者相对 Vue 实例中的 <code>data</code> 而言。</p>
<p>在 <code>beforeCreate</code> 阶段，<code>data</code> 还未创建，即配置在 Vue <code>data</code> 中的数据还处于 <code>undefined</code> 状态。</p>
<p>在 <code>created</code> 阶段，<code>data</code> 按照配置被赋予相应的值。</p>
<h4>beforeMount &amp; mounted</h4>
<p>二者相对于 DOM 而言。</p>
<p>在 <code>beforeMount</code> 阶段，最终的 DOM 以虚拟 DOM 的方式存在。</p>
<p>而在 <code>mounted</code> 阶段，DOM 被创建，且 DOM 中引用的 Vue 中的 data 被替换成相应的值。</p>
<h4>beforeUpdate &amp; updated</h4>
<p>二者相对于 <code>data</code> 的更新而言。</p>
<p>在 Vue 生命周期之中，<code>data</code> 会不断地发生变化，每一次变化都会一次触发 <code>beforeUpdate</code> 和 <code>updated</code>。</p>
<h4>beforeDestroy &amp; destroyed</h4>
<p>二者相对于 Vue 实例的销毁而言。</p>
<h4>示例</h4>
<p>我们通过以下代码进行测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
        "{{" username "}}"
    </div>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                username: 'dailybird',
                created_at : '2017.6.12'
            },
            beforeCreate: function(){
                console.log(this.username);
                console.log(this.$el);
            },
            created: function(){
                console.log(this.username);
                console.log(this.$el);
            },
            beforeMount: function(){
                console.log(this.username);
                console.log(this.$el);
            },
            mounted: function(){
                console.log(this.username);
                console.log(this.$el);
            },
            beforeUpdate: function(){
                console.log('before update');
            },
            updated: function(){
                console.log('updated');
            },
            beforeDestroy(){
                console.log('before destroy');
            },
            destroyed(){
                console.log('destroyed');
            }
        });

        app.username = 'dailybirdo';
        setTimeout('app.$destroy()', 100);
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{" username "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">username</span>: <span class="hljs-string">'dailybird'</span>,
                <span class="hljs-attr">created_at</span> : <span class="hljs-string">'2017.6.12'</span>
            },
            <span class="hljs-attr">beforeCreate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.username);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            },
            <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.username);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            },
            <span class="hljs-attr">beforeMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.username);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            },
            <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.username);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            },
            <span class="hljs-attr">beforeUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before update'</span>);
            },
            <span class="hljs-attr">updated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'updated'</span>);
            },
            beforeDestroy(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before destroy'</span>);
            },
            destroyed(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'destroyed'</span>);
            }
        });

        app.username = <span class="hljs-string">'dailybirdo'</span>;
        setTimeout(<span class="hljs-string">'app.$destroy()'</span>, <span class="hljs-number">100</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>浏览器控制台中输出的结果为：<br><span class="img-wrap"><img data-src="/img/remote/1460000010100877" src="https://static.alili.tech/img/remote/1460000010100877" alt="image_1bie7qdfjfua1dgk34i116k3kd9.png-44.8kB" title="image_1bie7qdfjfua1dgk34i116k3kd9.png-44.8kB" style="cursor: pointer;"></span></p>
<p>注意，这里在调用 <code>app.$destroy()</code> 之前延迟了一段时间，是防止 Vue 实例销毁之时，数据的更新还没有完成的情况。</p>
<h4>用法</h4>
<p>那么，这些生命周期钩子函数应该用于什么场景和需求呢？</p>
<p>对于一些网页应用而言，数据的获取是网页在浏览器中加载时异步进行的。也就是说，页面框架和数据渲染不是同时推送到浏览器中的。参考于 Vue 实例的两个重要阶段：<code>created</code> 和 <code>mounted</code>，二者分别表示 <code>data</code> 和 DOM 的创建完成时机。</p>
<p>如果我们在 <code>mounted</code> 之时进行数据接口调用，而此时 DOM 元素已经渲染，就会出现页面元素中的 <code>data</code> 值先填充为 Vue 实例中配置的默认 <code>data</code>，然后被后台返回的真实数据替换的情况。</p>
<p>因而，这里推荐在 <code>created</code> 阶段进行数据获取 API 的调用。尽管由于异步原因，仍可能出现数据返回之时，Vue 实例已经进入 <code>mounted</code> 阶段，但这已是相对合适的调用时机了。</p>
<p>如果我们选择在 <code>beforeCreated</code> 阶段调用 API，此时 <code>data</code> 还没有被创建，如果 API 返回的速度很快，早于 <code>created</code>，就会出现真实的后台数据被 Vue 配置中的 <code>data</code> 覆盖的情况。</p>
<p>为了优化由于异步调用方式而可能造成问题，我们可以在 <code>beforeCreated</code> 阶段展示一个加载框，或使用合适的默认值如：<code>正在加载数据...</code> 来提升用户体验。</p>
<p>关于生命周期钩子的详细应用可以参考：<a href="https://segmentfault.com/a/1190000008771768?_ea=1739750">Vue 实例中的生命周期钩子详解</a>。</p>
<h2 id="articleHeader14">需要准备的 ES6 知识</h2>
<p>作为新的 JavaScript 标准，ES6 引入了很多新的特性和语法，为开发带来了便捷。然而现在还有很多浏览器不支持 ES6，这一点的解决方法我们会在之后谈及 Webpack 和 Bebel 时提到。</p>
<p>以下介绍一些在 Vue 开发中必备的 ES6 知识，至于全部的 ES6 内容，大家可以参考 <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a>。</p>
<h3 id="articleHeader15">let</h3>
<p><code>let</code> 关键字改变了 JavaScript 语言没有块级作用域的情况。</p>
<p>在原先使用 <code>var</code> 关键字的情况下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i = 0;
while(true){
    i = 2;
    break;
}
console.log(i); // i = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    i = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">break</span>;
}
<span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// i = 2</span></code></pre>
<p>而改为 <code>let</code> 后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let i = 0;
while(true){
    let i = 2;
    break;
}
console.log(i); // i = 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">break</span>;
}
<span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// i = 0</span></code></pre>
<p>还有非常经典的闭包问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 4; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000 * i);
}
// 每隔一秒输出一个 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">4</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    }, <span class="hljs-number">1000</span> * i);
}
<span class="hljs-comment">// 每隔一秒输出一个 4</span></code></pre>
<p>之前的解决方式是使用函数级作用域形成闭包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var index = 0; index < 4; index++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        }, 1000 * i);
    })(index)
}
// 每隔一秒依次输出 0 - 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>for(var <span class="hljs-built_in">index</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">index</span> &lt; <span class="hljs-number">4</span>; <span class="hljs-built_in">index</span>++){
    (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(i)</span></span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            console.<span class="hljs-built_in">log</span>(i);
        }, <span class="hljs-number">1000</span> * i);
    })(<span class="hljs-built_in">index</span>)
}
// 每隔一秒依次输出 <span class="hljs-number">0</span> - <span class="hljs-number">3</span></code></pre>
<p>而现在，我们可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 4; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000 * i);
}
// 每隔一秒依次输出 0 - 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">4</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    }, <span class="hljs-number">1000</span> * i);
}
<span class="hljs-comment">// 每隔一秒依次输出 0 - 3</span></code></pre>
<p>有关闭包和作用域问题可以参考之前的撰文：<a href="https://segmentfault.com/a/1190000008352300">谈谈 setTimeout 这道经典题目</a>。</p>
<p>为了保持与其他语言在变量作用域上的统一，以免跳进大坑，建议使用 <code>let</code> 关键字。</p>
<h3 id="articleHeader16">对象</h3>
<h4>对象和 JSON的区别</h4>
<p>对象和 JSON 看上去很像，都是使用花括号包裹，都是键值对的形式。但二者仍有很多不同：</p>
<ul>
<li><p>对象中键可以不加引号，但 JSON 中键必须用<strong>双引号</strong>包裹（不能使用单引号）；</p></li>
<li><p>对象的值可以为函数，而 JSON 的键值都必须为字符串；</p></li>
<li><p>JSON 中，最后一项的末尾不能加逗号，而对象无此限制。</p></li>
</ul>
<h4>键值对的简化写法</h4>
<p>一般，我们可以使用如下方式定义一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    keyA: &quot;valueA&quot;,
    keyB: &quot;valueB&quot;
};
console.log(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>let obj = {
<span class="hljs-symbol">    keyA:</span> <span class="hljs-string">"valueA"</span>,
<span class="hljs-symbol">    keyB:</span> <span class="hljs-string">"valueB"</span>
};
console.log(obj);</code></pre>
<p>有时，当键值同名时，我们仍然不得不写成如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let keyA = &quot;keyA&quot;;
let keyB = &quot;keyB&quot;;

let obj = {
    keyA: keyA,
    keyB: keyB
};
console.log(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">keyA</span> = <span class="hljs-string">"keyA"</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">keyB</span> = <span class="hljs-string">"keyB"</span>;

<span class="hljs-keyword">let</span> <span class="hljs-attr">obj</span> = {
    keyA: keyA,
    keyB: keyB
};
console.log(obj);</code></pre>
<p>而现在，我们可以使用以下方式简化写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let keyA = &quot;keyA&quot;;
let keyB = &quot;keyB&quot;;

let obj = {
    keyA,
    keyB
};
console.log(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">keyA</span> = <span class="hljs-string">"keyA"</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">keyB</span> = <span class="hljs-string">"keyB"</span>;

<span class="hljs-keyword">let</span> <span class="hljs-attr">obj</span> = {
    keyA,
    keyB
};
console.log(obj);</code></pre>
<h4>值为函数的简化写法</h4>
<p>当我们需要在一个对象中将键与一个函数对应时，通常会写成如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: 'My name',
    funcA: function(){
        console.log(this.name);
    }
}
obj.funcA();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'My name'</span>,
    <span class="hljs-attr">funcA</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
}
obj.funcA();</code></pre>
<p>现在我们可以简化成如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: 'My name',
    funcA(){
        console.log(this.name);
    }
}
obj.funcA();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>let obj = {
    <span class="hljs-built_in">name</span>: 'My <span class="hljs-built_in">name</span>',
    funcA(){
        console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>);
    }
}
obj.funcA();</code></pre>
<p>以上两点在 Vue 的组件化开发之中非常常用。</p>
<h4>解构传参</h4>
<p>有时，我们会向函数中传入对象的值，比如表单数据，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    username: 'my-username',
    password: 'my-password',
};

function destruct(username, password){
    console.log(username, password);
}

let username = obj.username;
let password = obj.password;
destruct(username, password);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">username</span>: <span class="hljs-string">'my-username'</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">'my-password'</span>,
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">destruct</span>(<span class="hljs-params">username, password</span>)</span>{
    <span class="hljs-built_in">console</span>.log(username, password);
}

<span class="hljs-keyword">let</span> username = obj.username;
<span class="hljs-keyword">let</span> password = obj.password;
destruct(username, password);</code></pre>
<p>现在，我们可以通过解构的方式重新定义形参：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    username: 'my-username',
    password: 'my-password',
};

function destruct({username, password});{
    console.log(username, password);
}

destruct(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">username</span>: <span class="hljs-string">'my-username'</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">'my-password'</span>,
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">destruct</span>(<span class="hljs-params">{username, password}</span>);</span>{
    <span class="hljs-built_in">console</span>.log(username, password);
}

destruct(obj);</code></pre>
<p>这样可以简化一定的代码。</p>
<h3 id="articleHeader17">常量函数名</h3>
<p>我们可以使用常量在对象中定义函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    funcname(){
        console.log('xxx');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj = {
    funcname(){
        console.log(<span class="hljs-string">'xxx'</span>);
    }
}</code></pre>
<p>可以写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let FUNC_NAME = 'funcname';
let obj = {
    [FUNC_NAME](){
        console.log('xxx');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> FUNC_NAME = <span class="hljs-string">'funcname'</span>;
<span class="hljs-keyword">let</span> obj = {
    [FUNC_NAME](){
        console.log(<span class="hljs-string">'xxx'</span>);
    }
}</code></pre>
<p>将函数名称提取成常量方式可以一定程度上减少函数名修改导致的副作用。</p>
<h3 id="articleHeader18">箭头函数</h3>
<p>通常，我们使用如下方式定义并调用函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(name, age){
    console.log(name, age);
}
func('dailybird', 22);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>function <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(name, age)</span>{</span>
    console.<span class="hljs-built_in">log</span>(name, age)<span class="hljs-comment">;</span>
}
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(<span class="hljs-string">'dailybird'</span>, <span class="hljs-number">22</span>)</span>;</span></code></pre>
<p>现在，我们可以简化它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(name, age) => {
    console.log(name, age);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>(<span class="hljs-keyword">name</span>, age) =&gt; {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">name</span>, age);
}</code></pre>
<p>大家可以注意到，采用箭头函数的写法更适合于匿名函数的场景。在 JavaScript 中，匿名函数出现最为频繁的场景即是回调函数。如异步 API 调用后的数据获取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.post((response) => {
    let data = response.data;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">_</span>.post((response) =&gt; {
    <span class="hljs-keyword">let</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = response.<span class="hljs-keyword">data</span>;</span>
})</code></pre>
<p>此外，箭头函数还可以明确 <code>this</code> 指向问。在以下代码中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: 'dailybird',
    getName: function(){
        setTimeout(function(){
            console.log(this.name);
        }, 1000);
    }
}
obj.getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'dailybird'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        }, <span class="hljs-number">1000</span>);
    }
}
obj.getName();</code></pre>
<p><code>getName</code> 并不能得到 <code>name</code> 值，这是因为套在 <code>setTimeout</code> 之中匿名函数的 <code>this</code> 指向全局空间。</p>
<p>我们可以使用 <code>bind</code> 进行 <code>this</code> 的绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: 'dailybird',
    getName: function(){
        setTimeout(function(){
            console.log(this.name);
        }.bind(this), 1000);
    }
}
obj.getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'dailybird'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">1000</span>);
    }
}
obj.getName();</code></pre>
<p>也可以使用 <code>self = this</code> 避免 <code>this</code> 指向被调换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: 'dailybird',
    getName: function(){
        // 这里的 let 和 var 并无区别
        let self = this;
        setTimeout(function(){
            console.log(self.name);
        }, 1000);
    }
}
obj.getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'dailybird'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// 这里的 let 和 var 并无区别</span>
        <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(self.name);
        }, <span class="hljs-number">1000</span>);
    }
}
obj.getName();</code></pre>
<p>现在，我们也能通过箭头函数来解决这一问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    name: 'dailybird',
    getName: function(){
        setTimeout(() => {
            console.log(this.name);
        }, 1000);
    }
}
obj.getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'dailybird'</span>,
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        }, <span class="hljs-number">1000</span>);
    }
}
obj.getName();</code></pre>
<p>在 Vue 应用中，会大量出现调用接口后，在回调函数中对所属实例的数据进行修改的情况。这时，妥善处理 <code>this</code> 指向问题就显得极为重要。</p>
<h3 id="articleHeader19">对象展开符</h3>
<h2 id="articleHeader20">Node.js</h2>
<p>Node.js 是一个比较大的话题，这里只说一些与 Vue 开发有关的内容。</p>
<p>后续的内容会提到：我们可以使用高阶的 JavaScript 语法和代码规范进行项目开发，然后使用类似「编译」的方式「开发模式」的代码「编译」成大多数浏览器可以运行的「发布模式」代码。</p>
<p>而为了提供支持这一过程的环境，我们需要 Node.js 及其包管理工具 <code>npm</code>。</p>
<p>通过 Node.js 环境，我们可以在非浏览器环境使用 JavaScript 代码，输出大多数「浏览器」支持的 JavaScript。</p>
<h3 id="articleHeader21">安装</h3>
<p>Node.js 的安装相对傻瓜，从 <a href="http://nodejs.cn/download/" rel="nofollow noreferrer" target="_blank">官方网站</a> 下载后，双击安装即可，这里推荐使用最新版本。</p>
<h3 id="articleHeader22">测试</h3>
<p>安装完成后，在命令行执行以下代码可以查看安装的 <code>Node.js</code> 版本，以及气包管理工具 <code>npm</code> 的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Node.js 版本
node -v

# Node.js 的包管理工具 npm 的版本
npm -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment"># Node.js 版本</span>
<span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>

<span class="hljs-comment"># Node.js 的包管理工具 npm 的版本</span>
npm -v</code></pre>
<p>完成这一步之后，我们便可以开始之后的内容了。</p>
<h2 id="articleHeader23">Babel</h2>
<p>尽管 ES6 提供了大量新语法，可以简化编码、提高开发效率，但浏览器兼容性问题一直都是 B/S 模式的通病。直至目前为止，各个浏览器对 ES6 的兼容程度都不乐观。这也就意味着，即使是最新的主流浏览器，都无法保证可以正常运行 ES6 语法的 JavaScript 代码，更不用提那些老版本的浏览器了。</p>
<p>为了使我们既能使用 ES6 的新语法，又不会受制于浏览器版本问题，我们需要考虑一种类似「编译」的过程，将原有的 ES6 代码「编译」为 ES5。这样一来，我们既可以在开发环境中使用简洁、语义化更强的新语法，又可以通过「编译」后的低版本代码兼容更多的浏览器。</p>
<h3 id="articleHeader24">Babel 在线编译</h3>
<p>我们可以使用 Babel 在线编译快速体验这一过程，访问 <a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel 首页展示</a> 或 <a href="https://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">Babel 在线编译</a> 均可。</p>
<p>下面我们就尝试将之前提到的 ES6 语法进行转义。</p>
<h4>let 关键字</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100878" src="https://static.alili.tech/img/remote/1460000010100878" alt="image_1bjongp671dcm14l01slk1s0r5md9.png-25.3kB" title="image_1bjongp671dcm14l01slk1s0r5md9.png-25.3kB" style="cursor: pointer; display: inline;"></span></p>
<p>当不涉及到作用域问题时，<code>let</code> 直接编译为 <code>var</code>。</p>
<p>下面我们尝试对之前提到的块级作用域问题进行编译：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100879" src="https://static.alili.tech/img/remote/1460000010100879" alt="image_1bjorcilb5rd931bh016u21gcm.png-51.9kB" title="image_1bjorcilb5rd931bh016u21gcm.png-51.9kB" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，Bebel 面对这一问题的解决思路和我们之前的想法是一致的。</p>
<h4>键值对的简写方法</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100880" src="https://static.alili.tech/img/remote/1460000010100880" alt="image_1bjormte110r71dlr47e134a8vk13.png-43.3kB" title="image_1bjormte110r71dlr47e134a8vk13.png-43.3kB" style="cursor: pointer;"></span></p>
<h4>值为函数的简写方法</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100881" src="https://static.alili.tech/img/remote/1460000010100881" alt="image_1bjoros1hk1813l5vnj9d8g8t1g.png-45.1kB" title="image_1bjoros1hk1813l5vnj9d8g8t1g.png-45.1kB" style="cursor: pointer;"></span></p>
<h4>解构传参</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100882" src="https://static.alili.tech/img/remote/1460000010100882" alt="image_1bk85g4ck1ij51ou9l3q1pom1b8u9.png-47.7kB" title="image_1bk85g4ck1ij51ou9l3q1pom1b8u9.png-47.7kB" style="cursor: pointer;"></span></p>
<p>可以看到，这里编译的结果显示解构传参实际上就是语法帮助我们简化了步骤。<br>注意，正因为这种写法，在函数体内是不对 <code>obj</code> 产生直接修改的。</p>
<p>如果需要修改 <code>obj</code> 的值，需要使用非解构方式，通过 <code>obj.username = 'xxx'</code> 实现修改。</p>
<h4>常量函数名</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100883" src="https://static.alili.tech/img/remote/1460000010100883" alt="image_1bkdigna290v8m11fmt1g7i13nb13.png-11.3kB" title="image_1bkdigna290v8m11fmt1g7i13nb13.png-11.3kB" style="cursor: pointer;"></span></p>
<p>代码会被编译为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100884" src="https://static.alili.tech/img/remote/1460000010100884" alt="image_1bkdih8611oh812f0n6i6215km1g.png-33.7kB" title="image_1bkdih8611oh812f0n6i6215km1g.png-33.7kB" style="cursor: pointer;"></span></p>
<h4>箭头函数</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100885" src="https://static.alili.tech/img/remote/1460000010100885" alt="image_1bjorrk5tg8a1q4v1hl3sjn1ru71t.png-37.9kB" title="image_1bjorrk5tg8a1q4v1hl3sjn1ru71t.png-37.9kB" style="cursor: pointer;"></span></p>
<p>之前提到，箭头函数可以改善 <code>this</code> 指向问题，我们看看 Babel 的解决方案：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100886" src="https://static.alili.tech/img/remote/1460000010100886" alt="image_1bjos6dep1s0c1sck1jgfbamdt52a.png-60.2kB" title="image_1bjos6dep1s0c1sck1jgfbamdt52a.png-60.2kB" style="cursor: pointer;"></span></p>
<p>可以看出，Babel 也是使用将 <code>this</code> 关键字使用局部变量进行保存的方式改善了指向问题。</p>
<h3 id="articleHeader25">在项目中使用 Babel</h3>
<h4>初始化</h4>
<p>首先，我们在项目目录下执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>一路回车确认后，可看到项目下出现了 <code>package.json</code> 文件，其中记录了当前项目的依赖管理配置。为了使得 Bebel 能够正常起到作用，现在执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-preset-es2015" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-preset-es2015</code></pre>
<p>可以看到项目中出现了一个新的文件夹 <code>node_modules</code>。这个文件夹类似于项目的依赖库。此外，执行之后，在 <code>package.json</code> 之中，会增加这一句配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;devDependencies&quot;: {
    &quot;babel-preset-es2015&quot;: &quot;^6.24.1&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.24.1"</span>
}</code></pre>
<p>注意到，安装时添加了 <code>--save-dev</code> 的参数，这一参数的意义在于将所安装项目定义为开发时使用的（因为 Babel 的作用只是在代码运行前进行编译）。</p>
<p>相比之下，对于一些需要在运行时使用的库，如 <code>jQuery</code>、<code>Angular</code> 或 <code>Vue</code> 等，安装时需要添加的参数即为 <code>--save</code> 而非 <code>--save-dev</code> 了。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install some-component --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">some</span>-component <span class="hljs-comment">--save</span></code></pre>
<p>在这句代码执行完毕之后，<code>package.json</code> 中会增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;some-component&quot;: &quot;^version&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"some-component"</span>: <span class="hljs-string">"^version"</span>
}</code></pre>
<p>这之后，我们还需要在全局安装 Babel 转码工具。执行以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --global babel-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --<span class="hljs-built_in">global</span> babel-cli</code></pre>
<p>这里我们使用了另一个参数 <code>--global</code>，这一参数表示本次安装会在全局起作用。</p>
<h4>.babelrc 文件</h4>
<p>想要使用 Babel 进行编译，除了进行上一步骤的安装之外，还需要对编译进行一些配置，而这些配置需要存于 <code>.babelrc</code> 文件中。</p>
<p>该文件对转码规则和用到的插件进行了定义，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;es2015&quot;
  ],
  &quot;plugins&quot;: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"es2015"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: []
}</code></pre>
<p>这里我们定义了转码规则为 <code>es2015</code>，即 <code>ES6</code>。更多的转码规则可以参考 <a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">Babel 入门教程</a>。</p>
<h4>编译测试</h4>
<p>下面我们创建一个文件 <code>origin.js</code>，书写一些带有 ES6 新语法的代码，如之前提到的作用域问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// origin.js

for (let i = 0; i < 4; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000 * i);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// origin.js</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">4</span>; i++) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    }, <span class="hljs-number">1000</span> * i);
}</code></pre>
<p>然后执行以下指令（注意，.babelrc 文件需要事先创建）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel origin.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">babel </span>origin.js</code></pre>
<p>可以看到命令行中打印出了编译后的结果。</p>
<p>可是我们需要把编译后的结果输出到一个文件之中，此时需要执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel origin.js -o output.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">babel</span> <span class="hljs-selector-tag">origin</span><span class="hljs-selector-class">.js</span> <span class="hljs-selector-tag">-o</span> <span class="hljs-selector-tag">output</span><span class="hljs-selector-class">.js</span></code></pre>
<p>这样，我们就可以在 <code>output.js</code> 中看到编译的结果了。</p>
<p>关于 Babel 的话题就谈到这里，更多深入的内容可以参考其他文档。</p>
<h2 id="articleHeader26">webpack</h2>
<p>Babel 帮助我们解决了 ES6 代码浏览器兼容性的问题。为了实现前端工程化开发，我们还需要一个功能的支持，即在 JavaScript 代码中引入其他的 JavaScript 代码。</p>
<p>只有完成这一点，我们才能将 JavaScript 代码依据逻辑进行拆分，然后通过某种方式组合起来，从而实现组件化、模块化的开发。</p>
<p>由于 webpack 的内容和使用方式很多，对 webpack 更深入的了解可以参考其他博客。这里只介绍最为重要的部分，即 import 和 export。</p>
<h3 id="articleHeader27">安装</h3>
<p>webpack 作为一个指令，建议通过全局的方式安装，这样一来，我们就可以全局使用 <code>webpack</code> 指令了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init  
npm install -g webpack " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init  
<span class="hljs-built_in">npm</span> install -g webpack </code></pre>
<h4>报错解决</h4>
<p>在安装过程中，可能会出现以下报错信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ERR! Refusing to install webpack as a dependency of itself" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">npm ERR! Refusing <span class="hljs-built_in">to</span> install webpack <span class="hljs-keyword">as</span> <span class="hljs-keyword">a</span> dependency <span class="hljs-keyword">of</span> itself</code></pre>
<p>这是因为 <code>package.json</code> 的 <code>name</code> 值也被写成了 <code>webpack</code>，修改即可，可参考：<a href="https://segmentfault.com/q/1010000005148384">局部安装webpack提示无法依赖</a>。</p>
<h3 id="articleHeader28">配置</h3>
<p>为了能够正常使用 webpack，我们需要对其进行一些配置。当然，webpack 的配置项很多，这里只介绍最为重要的一部分，即 <code>export</code> 和 <code>import</code>，更多有关 webpack 的知识可以参考这一套视频教程：<a href="https://www.bilibili.com/video/av11128844/" rel="nofollow noreferrer" target="_blank">【DevOpen.Club 出品】Webpack 2 视频教程</a>。</p>
<p>我们在项目根目录下新建 <code>webpack.config.js</code> 文件，这是 webpack 配置文件的默认名。内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = {
    entry: __dirname+'/app/entry.js',
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [

        ]
    }
};

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = {
    entry: __dirname+<span class="hljs-string">'/app/entry.js'</span>,
    output: {
        path: __dirname+<span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'bundle.js'</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [

        ]
    }
};

<span class="hljs-keyword">module</span>.exports = <span class="hljs-built_in">config</span>;</code></pre>
<p>这一配置文件指定了入口文件，即 <code>/app/entry.js</code>，以及打包后的输出文件 <code>/dist/bundle.js</code>。</p>
<h3 id="articleHeader29">import &amp; export</h3>
<p>在模块化开发之中，通常会将 JavaScript 代码分散到多个文件之中。这时，我们需要使用 <code>import</code> 和 <code>export</code> 关键字关联起 JavaScript 代码，从而提高代码的复用能力。这一点在 Vue 的组件化开发之中体现地尤为明显。借助 webpack，我们可以从一个入口文件开始，通过导入导出，实现代码的组合，以及项目的工程化。</p>
<p>首先，我们在 <code>app</code> 目录下新建 <code>entry.js</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import API from './componentA'

console.dir(API);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> API <span class="hljs-keyword">from</span> <span class="hljs-string">'./componentA'</span>

<span class="hljs-built_in">console</span>.dir(API);</code></pre>
<p>这里引入了 <code>componentA.js</code>，注意，文件后缀是可以省略的。</p>
<p>之后，我们新建这一文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const GET_PRODUCTS = 'www.xxx.com/products';

export default {
    GET_PRODUCTS
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> GET_PRODUCTS = <span class="hljs-string">'www.xxx.com/products'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
    GET_PRODUCTS
}</code></pre>
<p>即 <code>entry.js</code> 引入了 <code>componentA.js</code> 中的输出，从而引入了其中的 <code>GET_PRODUCTS</code> 变量。</p>
<p>现在，我们在项目根目录下执行 <code>webpack</code>，可以看到提示信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100887" src="https://static.alili.tech/img/remote/1460000010100887" alt="image_1bkg1a0vg1sp2as9re1gam1d95m.png-19.3kB" title="image_1bkg1a0vg1sp2as9re1gam1d95m.png-19.3kB" style="cursor: pointer;"></span></p>
<p>提示我们已经根据配置，生成了 <code>dist/bundle.js</code>。</p>
<p>而后，我们在根目录下新建 <code>index.html</code> 并引入 <code>bundle.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;./dist/bundle.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>打开后，可以在浏览器控制台中看到输出效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100888" src="https://static.alili.tech/img/remote/1460000010100888" alt="image_1bkg0cq1rhi717ncapauhjvu99.png-14.3kB" title="image_1bkg0cq1rhi717ncapauhjvu99.png-14.3kB" style="cursor: pointer;"></span></p>
<h4>报错解决</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR in Entry module not found: Error: Can't resolve 'xxx/webpack/app' in 'xxx/webpack'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">ERROR </span>in Entry module not found: Error: Can't resolve 'xxx/webpack/app' in 'xxx/webpack'</code></pre>
<p>这是因为 <code>webpack.config.js</code> 的 entry 只能指定为单个 JavaScript 文件，当指定为目录时，默认为该路径下的 <code>index.js</code> 文件。如果入口文件名不是 <code>index.js</code>，会抛出错误。</p>
<h3 id="articleHeader30">export 和 export default</h3>
<p>在输出文件中，可以有两种形式，下面我们介绍这两种形式的使用方式：</p>
<h4>export</h4>
<p>导出方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const GET_PRODUCTS = 'www.xxx.com/products';

export GET_PRODUCTS;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> GET_PRODUCTS = <span class="hljs-string">'www.xxx.com/products'</span>;

<span class="hljs-keyword">export</span> GET_PRODUCTS;</code></pre>
<p>导入方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {GET_PRODUCTS} from './componentA'

console.log(GET_PRODUCTS);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> {GET_PRODUCTS} <span class="hljs-keyword">from</span> <span class="hljs-string">'./componentA'</span>

<span class="hljs-built_in">console</span>.log(GET_PRODUCTS);</code></pre>
<p>注：一个输出文件中可以有多个 <code>export</code>。</p>
<h4>export default</h4>
<p>导出方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const GET_PRODUCTS = 'www.xxx.com/products';

export default {
    GET_PRODUCTS
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> GET_PRODUCTS = <span class="hljs-string">'www.xxx.com/products'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
    GET_PRODUCTS
}</code></pre>
<p>导入方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import API from './componentA'

console.log(API.GET_PRODUCTS);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> API <span class="hljs-keyword">from</span> <span class="hljs-string">'./componentA'</span>

<span class="hljs-built_in">console</span>.log(API.GET_PRODUCTS);</code></pre>
<p>注：一个输出文件中只能有一个 <code>export default</code>。</p>
<h2 id="articleHeader31">组件开发</h2>
<h3 id="articleHeader32">Vue-cli</h3>
<p>进行 Vue 组件化开发需要 webpack 及一系列插件的支持，自行配置 <code>package.json</code> 和 webpack 相对麻烦，为了简化这些繁琐的重复工作，我们可以使用 Vue 脚手架工具来快速构建项目结构。</p>
<p>执行以下指令，全局安装 Vue-cli：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --global vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --<span class="hljs-built_in">global</span> vue-cli</code></pre>
<p>之后我们可以执行以下指令，创建一个 Vue 工程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack project_name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue</span> init webpack project_name</code></pre>
<p>这条指令中，webpack 表示该 vue 工程使用 webpack 的方式进行打包。而 project_name 表示自定义地项目名字。</p>
<p>执行之后，会依次询问一些信息，如项目名称、项目描述、作者等会作为项目信息存于 <code>package.json</code> 之中。构建方式、vue-router。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="? Project name (xxx) # 项目名称 （随意填写）
? Project description (A Vue.js project) # 项目描述 （随意填写）
? Author (yangning <yangning3@jd.com>)  # 作者 （随意填写）
? Vue build (Use arrow keys)  # 构建方式 （回车即可）
? Install vue-router? (Y/n)  # 是否使用 vue-router （可选，有关 vue 路由会在后续小节中提到）
? Use ESLint to lint your code? (Y/n)  # 是否使用 ESlint 规范代码 （建议 N）
? Setup unit tests with Karma + Mocha? # 是否使用 Karma + Mocha 测试框架（建议 N）
? Setup e2e tests with Nightwatch? (Y/n) # 是否使用 Nightwatch 端到端测试框架（建议 N）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>? <span class="hljs-selector-tag">Project</span> <span class="hljs-selector-tag">name</span> (xxx) # 项目名称 （随意填写）
? <span class="hljs-selector-tag">Project</span> <span class="hljs-selector-tag">description</span> (A Vue.js project) # 项目描述 （随意填写）
? <span class="hljs-selector-tag">Author</span> (yangning &lt;yangning3<span class="hljs-variable">@jd</span>.com&gt;)  # 作者 （随意填写）
? <span class="hljs-selector-tag">Vue</span> <span class="hljs-selector-tag">build</span> (Use arrow keys)  # 构建方式 （回车即可）
? <span class="hljs-selector-tag">Install</span> <span class="hljs-selector-tag">vue-router</span>? (Y/n)  # 是否使用 <span class="hljs-selector-tag">vue-router</span> （可选，有关 <span class="hljs-selector-tag">vue</span> 路由会在后续小节中提到）
? <span class="hljs-selector-tag">Use</span> <span class="hljs-selector-tag">ESLint</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">lint</span> <span class="hljs-selector-tag">your</span> <span class="hljs-selector-tag">code</span>? (Y/n)  # 是否使用 <span class="hljs-selector-tag">ESlint</span> 规范代码 （建议 <span class="hljs-selector-tag">N</span>）
? <span class="hljs-selector-tag">Setup</span> <span class="hljs-selector-tag">unit</span> <span class="hljs-selector-tag">tests</span> <span class="hljs-selector-tag">with</span> <span class="hljs-selector-tag">Karma</span> + <span class="hljs-selector-tag">Mocha</span>? # 是否使用 <span class="hljs-selector-tag">Karma</span> + <span class="hljs-selector-tag">Mocha</span> 测试框架（建议 <span class="hljs-selector-tag">N</span>）
? <span class="hljs-selector-tag">Setup</span> <span class="hljs-selector-tag">e2e</span> <span class="hljs-selector-tag">tests</span> <span class="hljs-selector-tag">with</span> <span class="hljs-selector-tag">Nightwatch</span>? (Y/n) # 是否使用 <span class="hljs-selector-tag">Nightwatch</span> 端到端测试框架（建议 <span class="hljs-selector-tag">N</span>）</code></pre>
<p>这之后，我们需要使用以下指令实现安装（可以在 <code>package.json</code> 中找到依赖的库）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<p>以下对 Vue 工程中的部分文件进行介绍。</p>
<h3 id="articleHeader33">package.json</h3>
<p>在 <code>package.json</code> 中可以找到如下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
},</code></pre>
<p>根据之前所说，<code>scripts</code> 中的配置可以作为指令，以 <code>npm run xxx</code> 的方式执行。</p>
<p>在这里，使用 <code>scripts</code> 中定义的指令的效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev # 启动热部署，为开发模式
npm run build # 同 npm run dev
npm run build # 使用发布模式编译，生成 /dist 文件作为编译结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev <span class="hljs-comment"># 启动热部署，为开发模式</span>
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build <span class="hljs-comment"># 同 npm run dev</span>
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build <span class="hljs-comment"># 使用发布模式编译，生成 /dist 文件作为编译结果</span></span></code></pre>
<p>Vue 项目中的 webpack 比较复杂，这里对重要的地方进行介绍。</p>
<h3 id="articleHeader34">webpack.base.conf.js</h3>
<p>这是 webpack 的基础配置，其中在 <code>module</code> 中使用了 <code>vue-loader</code>，<code>babel-loader</code> 进行处理。</p>
<p>在 <code>resolve</code> 中，可以看到如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>)
    }
},</code></pre>
<p>其中，<code>alias</code> 中定义了 <code>@</code> 符号用以指向项目根目录下的 <code>src</code> 文件夹。</p>
<h3 id="articleHeader35">路径问题</h3>
<p>在 Vue 项目中，如何正确找到如图片、字体文件、第三方库文件等是相对重要的事情。以下提供几种正确使用路径的方法。</p>
<h4>第三方库文件引入</h4>
<p>在 Vue 中，经常需要引入第三方库，比如在 <code>/src/main.js</code> 文件中，使用以下方式引入了 Vue.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span></code></pre>
<p>采用这种方式引入的库文件，会在 <code>/node_modules</code> 中进行寻找。</p>
<h4>静态资源文件</h4>
<p>前端页面中不可避免地会使用到很多静态资源文件，引用这些静态文件可以通过以下方式：</p>
<ol>
<li><p>相对路径<br>采用相对路径当然可行，但对于那些层级较深的文件而言，引用较低层级的静态资源就比较麻烦了。而且，由于字体文件等编译后与 js 文件的相对路径会发生改变，所以也不适合使用相对路径引用。</p></li>
<li><p>使用 <code>@</code> 符号<br>如上所说，<code>@</code> 符号被定位到了 <code>/src</code> 中，所以我们可以使用 <code>@/dir/file.png</code> 定位到 <code>/src/dir/file.png</code>。</p></li>
</ol>
<p>注意，由于 <code>@</code> 符号的解析只会默认在 JavaScript 中生效，若要在 HTML 中使用 <code>@</code>，我们需要使用 <code>~@</code>，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;~@/dir/file.png&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"~@/dir/file.png"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ol><li><p>使用 <code>/</code><br>在 Vue 项目中，<code>/</code> 被指向 <code>/static</code> 目录，通常用于字体文件及图片等资源的引入。</p></li></ol>
<h3 id="articleHeader36">启动项目</h3>
<p>我们可以使用以下指令开启热部署模式以进行开发调试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>执行后浏览器会自动打开一个窗口，并访问：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:8080/#/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">localhost:</span><span class="hljs-number">8080</span>/<span class="hljs-meta">#/</span></code></pre>
<p>由于热部署的存在，我们对代码的修改都会立刻同步到浏览器中。</p>
<h3 id="articleHeader37">Vue 组件模板</h3>
<p>在 Vue 项目中，我们可以新建 <code>.vue</code> 后缀的文件，作为一个单独的组件。该组件的模板如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>

</style>

<template>
  <div>
  
  </div>
</template>

<script>
export default {

}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{

}</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在 <code>.vue</code> 文件中，包含了一个组件的三个部分，即 HTML 结构部分（写于 <code>template</code> 之中）；CSS 样式部分（写于 <code>style</code> 之中）；以及 Vue 实例对象部分（写于 <code>export default{  }</code> 之中）。</p>
<p>在这里，<code>export default{  }</code> 实际相当于 <code>export default new Vue({  })</code>。即一个 <code>.vue</code> 文件实际提供了一个组件样式，及以此组件为作用域的 Vue 实例。</p>
<p>注意，在 JavaScript 代码中，我们可以省略 <code>el: xxx</code>，即对作用域的声明。在 <code>vue</code> 文件中，其作用域为 <code>template</code> 标签下的第一层标签。这也就是说，下面这两种种写法是不正确的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
    
    </div>
    <div>
    
    </div>
</template>

<template>
    <div v-for=&quot;item in list&quot;>
    
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>&lt;<span class="hljs-keyword">template</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;
    
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;
    
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;

&lt;<span class="hljs-keyword">template</span>&gt;
    &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in list"</span>&gt;
    
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;</code></pre>
<p>使用这种写法时，会抛出如下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Component</span> template should contain exactly one root element. <span class="hljs-keyword">If</span> you are using v-<span class="hljs-keyword">if</span> <span class="hljs-keyword">on</span> multiple elements, <span class="hljs-keyword">use</span> v-<span class="hljs-keyword">else</span>-<span class="hljs-keyword">if</span> <span class="hljs-keyword">to</span> chain them instead.</code></pre>
<p>需要保证 <code>template</code> 标签下只有一个父级标签，循环和多 if 语句这种可能导致出现多个标签的行为也不允许。</p>
<h3 id="articleHeader38">使用组件构建页面</h3>
<p>在很多站点中，页面都会配备首部导航条、页脚，而页面间的切换一般只会导致中心内容区的变动。</p>
<p>采用传统方式开发的页面存在以下两个问题：</p>
<ol>
<li><p>在不使用后端模板引擎的情况下，需要在每个页面中重复书写首部导航条和页脚；</p></li>
<li><p>即使使用了后端模板引擎，每一次页面跳转也都会导致页面的全部刷新，而非内容区的局部刷新。</p></li>
</ol>
<p>第二个问题涉及到前端路由和单页应用，我们会在后续的 Vue Router 中讨论。</p>
<p>为了解决第一个问题，我们可以考虑把后端模板引擎的工作放到前端完成，也就是 Vue 组件。</p>
<p>现在，我们在 <code>/src/components</code> 文件夹下新建两个文件，分别是：<code>Navbar.vue</code> 和 <code>Footbar.vue</code>，其中代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Navar.vue

<style scoped>
    div{
        background-color: tan;
    }
</style>

<template>
    <div>
        头部导航条
        "{{" msg "}}"
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'navbar'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// Navar.vue

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: tan;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        头部导航条
        </span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'navbar'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Footbar.vue

<style scoped>
    div{
        background-color: deepskyblue;
    }
</style>

<template>
    <div>
        底部导航条
        "{{" msg "}}"
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'navbar'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// Footbar.vue

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: deepskyblue;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        底部导航条
        </span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'navbar'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这样，我们就新建了两个 Vue 组件，分别作为首部导航条和页脚；</p>
<p>然后我们修改 <code>/src/App.vue</code> 文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    div{
        background-color: aquamarine;
    }
</style>

<template>
    <div>
        <Navbar></Navbar>
        中心内容
        <Footbar></Footbar>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Footbar from './components/Footbar'
    export default {
        components: {
            Navbar, Footbar
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: aquamarine;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Navbar</span>&gt;</span>
        中心内容
        <span class="hljs-tag">&lt;<span class="hljs-name">Footbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Footbar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Navbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Navbar'</span>
    <span class="hljs-keyword">import</span> Footbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Footbar'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            Navbar, Footbar
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里，我们引入了之前所写的两个 Vue 组件。对比前几节中提到的 Vue 组件，这里的不同只不过是把每个组件都放到了一个单独的 <code>.vue</code> 文件中而已。</p>
<p>创建、修改文件并点击保存后，由于之前启动了 <code>npm run dev</code>，即热部署，此时，浏览器会自动刷新并显示如下效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100889" src="https://static.alili.tech/img/remote/1460000010100889" alt="image_1bk89cjke7cf1thgdpf1kvc1r83m.png-9.7kB" title="image_1bk89cjke7cf1thgdpf1kvc1r83m.png-9.7kB" style="cursor: pointer;"></span></p>
<p>这里可以注意到两点：</p>
<ol>
<li><p>虽然 <code>Navbar</code> 和 <code>Footbar</code> 中均有 <code>msg</code> 这一数据，但二者并不冲突；</p></li>
<li><p><code>Navbar</code>、<code>Footbar</code>、<code>App</code> 这三个组件中均对 <code>div</code> 标签定义了背景颜色，但三者并未在样式上相互覆盖。</p></li>
</ol>
<p>这表明一个 Vue 组件的样式、数据等均是与其他组件隔离的。</p>
<h3 id="articleHeader39">组件间数据传递</h3>
<p>以下演示 <code>App</code> 组件向 <code>Navbar</code> 组件传参的方法：</p>
<p>修改 <code>Navbar.vue</code> 代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
    div{
        background-color: tan;
    }
</style>

<template>
    <div>
        头部导航条
        "{{" msg "}}"
        "{{" navbarMsg "}}"
    </div>
</template>

<script>
    export default {
        props: [
            'navbarMsg'
        ],
        data () {
            return {
                msg: 'navbar'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: tan;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        头部导航条
        </span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml">
        </span><span class="hljs-template-variable">"{{" navbarMsg "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: [
            <span class="hljs-string">'navbarMsg'</span>
        ],
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'navbar'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>修改 <code>App.vue</code> 的代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    div{
        background-color: aquamarine;
    }
</style>

<template>
    <div>
        <Navbar navbar-msg=&quot;params&quot;></Navbar>
        中心内容
        <Footbar></Footbar>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Footbar from './components/Footbar'
    export default {
        components: {
            Navbar, Footbar
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: aquamarine;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Navbar</span> <span class="hljs-attr">navbar-msg</span>=<span class="hljs-string">"params"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Navbar</span>&gt;</span>
        中心内容
        <span class="hljs-tag">&lt;<span class="hljs-name">Footbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Footbar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Navbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Navbar'</span>
    <span class="hljs-keyword">import</span> Footbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Footbar'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            Navbar, Footbar
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里的传参方式和之前提到的相同。注意，<code>navbar-msg</code> 这里涉及到字面量问题，大家可以翻看之前的内容。</p>
<p>保存后，页面会更新为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100890" src="https://static.alili.tech/img/remote/1460000010100890" alt="image_1bk8avoj111t79b6ockrv11ufj13.png-7.9kB" title="image_1bk8avoj111t79b6ockrv11ufj13.png-7.9kB" style="cursor: pointer;"></span></p>
<h3 id="articleHeader40">组件间事件传递</h3>
<p>以下演示 <code>Footbar</code> 中想让传递事件的方法：</p>
<p>修改 <code>Footbar.vue</code> 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
    div{
        background-color: deepskyblue;
    }
</style>

<template>
    <div @click=&quot;clicker&quot;>
        底部导航条
        "{{" msg "}}"
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'navbar'
            }
        },
        methods: {
            clicker(){
                console.log('component click');
                this.$emit('navbar-click', 'params1', 'params2');
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: deepskyblue;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clicker"</span>&gt;</span>
        底部导航条
        </span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'navbar'</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            clicker(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'component click'</span>);
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'navbar-click'</span>, <span class="hljs-string">'params1'</span>, <span class="hljs-string">'params2'</span>);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>修改 <code>App.vue</code> 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    div{
        background-color: aquamarine;
    }
</style>

<template>
    <div>
        <Navbar navbar-msg=&quot;params&quot;></Navbar>
        中心内容
        <Footbar @navbar-click=&quot;trigger&quot;></Footbar>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Footbar from './components/Footbar'
    export default {
        components: {
            Navbar, Footbar
        },
        methods: {
            trigger(param1, param2){
                console.log('get event with', param1, param2);
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: aquamarine;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Navbar</span> <span class="hljs-attr">navbar-msg</span>=<span class="hljs-string">"params"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Navbar</span>&gt;</span>
        中心内容
        <span class="hljs-tag">&lt;<span class="hljs-name">Footbar</span> @<span class="hljs-attr">navbar-click</span>=<span class="hljs-string">"trigger"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Footbar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Navbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Navbar'</span>
    <span class="hljs-keyword">import</span> Footbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Footbar'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            Navbar, Footbar
        },
        <span class="hljs-attr">methods</span>: {
            trigger(param1, param2){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'get event with'</span>, param1, param2);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样，当我们点击底部导航条后，控制台会输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="component click
get event with params1 params2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>component click
<span class="hljs-keyword">get</span> <span class="hljs-keyword">event</span> <span class="hljs-keyword">with</span> params1 params2</code></pre>
<p>这里要注意两点：</p>
<ol>
<li><p>子组件抛出 ( emit ) 事件时，并不考虑父组件会不会捕获该事件。相当于只提供接口，而不依赖它；</p></li>
<li><p>父组件捕获事件时并不会干涉到子组件的执行，使用 <code>return false;</code> 也不可以。</p></li>
</ol>
<h3 id="articleHeader41">组件传参和事件传递中的问题</h3>
<p>组件传参和事件传递实际构成了组件间数据传递的正反线路。但从以上的使用方式中，可以感觉到采用这两种方式进行数据传递的局限性。</p>
<ol>
<li><p>全局状态难以维护；</p></li>
<li><p>同级组件间数据难以传输；</p></li>
<li><p>存在大量只起到传输数据作用的事件；</p></li>
<li><p>API 调用过程缺少管理方案，会存在重复的 API 请求代码；</p></li>
<li><p>调用 API 之类的异步请求和修改数据的同步操作糅合在一起。</p></li>
</ol>
<p>而 Vue 本身是推荐在项目中使用数据驱动运行的。面对组件间的复杂关系，我们需要一种全局的数据管理工具来帮助我们方便的获取数据，并基于此满足一系列的需求。</p>
<p>此外，针对不可避免的 API 请求，我们也需要一种机制进行管理。</p>
<p>所以，我们需要一种状态管理器来帮助我们完成这些功能，这就是 Vuex。</p>
<h2 id="articleHeader42">Vuex</h2>
<p>如上所说，Vuex 是一个状态管理机制，那么，状态是指哪些呢？</p>
<p>在这里，Vuex 需要帮我们维护的内容分为三类：</p>
<ol>
<li><p>存储数据的 state；</p></li>
<li><p>同步修改数据的 mutations；</p></li>
<li><p>异步获取数据的 actions；</p></li>
</ol>
<h3 id="articleHeader43">Vuex 安装和引入</h3>
<p>按下 <code>CTRL + C</code> 退出热部署，执行以下指令进行 vuex 的安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vuex <span class="hljs-comment">--save</span></code></pre>
<p>然后修改 <code>main.js</code>：</p>
<p>在文件首部添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from 'vuex'

Vue.use(Vuex);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex);</code></pre>
<p>然后实例化一个 Vuex.Store 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Vuex.Store({
    state: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {},
    actions: {}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> store = new Vuex.Store({
    state: {
        navbar: {
            title: <span class="hljs-string">'navbar-title'</span>
        }
    },
    mutations: {},
    actions: {}
});</code></pre>
<p>注意，这里包含了 <code>state</code>, <code>mutations</code> 和 <code>actions</code>。</p>
<p>然后在 <code>new Vue({})</code> 中加入 <code>store</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
    store,
    <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
    <span class="hljs-attribute">components</span>: {App}
})</code></pre>
<p>注意，这里加入 <code>store</code> 意味着我们可以其他 Vue 实例中使用 <code>this.$store</code> 来得到实例化的 <code>Vuex.Store</code> 对象。</p>
<p>自此，我们便可以通过修改 <code>store</code> 变量中的 <code>state</code>，<code>mutations</code> 和 <code>actions</code> 来实现状态管理了。</p>
<h3 id="articleHeader44">state</h3>
<p>如上所示，我们已经在 <code>state</code> 中添加了 <code>navbar</code> 对象，相当于将其交给 Vuex 进行管理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Vuex.Store({
    state: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {},
    actions: {}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> store = new Vuex.Store({
    state: {
        navbar: {
            title: <span class="hljs-string">'navbar-title'</span>
        }
    },
    mutations: {},
    actions: {}
});</code></pre>
<p>然后，我们可以在 Vue 组件中得到该值。比如 <code>Navbar</code> 组件（这里省略了 <code>style</code> 部分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        头部导航条 "{{" title "}}"
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        computed: {
            title(){
                return this.$store.state.navbar.title;
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        头部导航条 </span><span class="hljs-template-variable">"{{" title "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {

            }
        },
        <span class="hljs-attr">computed</span>: {
            title(){
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.navbar.title;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>注意，这里我们使用 <code>computed</code> 来得到 <code>state</code> 中管理的值，是方便在 <code>state</code> 中的值发生变化时同步更新。有关 <code>computed</code> 和 <code>data</code> 在 Vuex 中的使用可以参考 「<a href="https://segmentfault.com/q/1010000009696383">获取 vuex state 中的值一定要使用 computed 而不能使用 data 吗？</a>」。</p>
<p>然后我们可以通过以下方式对其进行修改，这里我们通过一个点击事件实现对 <code>state</code> 中值的修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Navbar.vue

<template>
    <div @click=&quot;trigger&quot;>
        头部导航条 "{{" title "}}"
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        computed: {
            title(){
                return this.$store.state.navbar.title;
            }
        },
        methods: {
            trigger(){
                this.$store.state.navbar.title = 'after modified';
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// Navbar.vue

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"trigger"</span>&gt;</span>
        头部导航条 </span><span class="hljs-template-variable">"{{" title "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {

            }
        },
        <span class="hljs-attr">computed</span>: {
            title(){
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.navbar.title;
            }
        },
        <span class="hljs-attr">methods</span>: {
            trigger(){
                <span class="hljs-keyword">this</span>.$store.state.navbar.title = <span class="hljs-string">'after modified'</span>;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>当然，在 Vuex 中，并不推荐直接使用这种方式对 <code>state</code> 中管理的内容进行修改，从规范上来说，一切的修改操作都应该在 <code>mutations</code> 中进行。</p>
<h3 id="articleHeader45">mutations</h3>
<p>我们修改 <code>main.js</code> 为其添加 <code>mutations</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Vuex.Store({
    state: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {
        setNavbarTitle(state, value){
            state.navbar.title = value;
        }
    },
    actions: {}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {
        <span class="hljs-built_in">set</span>NavbarTitle(<span class="hljs-keyword">state</span>, value){
            <span class="hljs-keyword">state</span>.navbar.title = value;
        }
    },
    actions: {}
});</code></pre>
<p>注意，<code>mutations</code> 中的方法接收两个参数，第一个参数即为 <code>store.state</code>，第二个是附带的值，一般为修改的目标值（在官方文档中，这一参数被称为载荷 ( payload ) ）。注意，<code>mutations</code> 中的方法只能接收两个参数。</p>
<p>调用 <code>mutations</code> 中的方法可以使用 <code>commit</code> 进行，<code>commit</code> 同样需要传递两个参数，第一个参数为所需调用的 <code>mutations</code> 中的方法名，第二个参数为目标值，即等同于 <code>mutations</code> 方法中的第二个参数。</p>
<p>我们修改 <code>Navbar.vue</code> 中的 <code>trigger</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    trigger(){
        this.$store.commit('setNavbarTitle', 'after modified');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>methods: {
    trigger(){
        this.$store.commit(<span class="hljs-string">'setNavbarTitle'</span>, <span class="hljs-string">'after modified'</span>);
    }
}</code></pre>
<p>这样一来，此后所有涉及到对 <code>state</code> 中 <code>navbar.title</code> 内容的修改都可以使用这一方式进行。</p>
<h3 id="articleHeader46">actions</h3>
<p>在网页开发中，大量的需求都伴随着 API 的调用，相比于 <code>mutations</code> 对 <code>state</code> 中数据的同步修改，此类 API 的调用过程属于异步。整个过程为：先异步调用后台接口获得数据，再同步将数据更新到 <code>store.state</code> 中。</p>
<p>在 Vuex 中，后者使用 <code>mutations</code> 进行操作，而前者则是使用 <code>actions</code> 进行。由于调用后台接口的过程涉及到一些其他的库和跨域问题，我们这里暂且使用伪代码，仅为了理清程序的逻辑。</p>
<p>首先，我们修改 <code>store</code> 的 <code>actions</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Vuex.Store({
    state: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {
        setNavbarTitle(state, value){
            state.navbar.title = value;
        }
    },
    actions: {
        loadNavbarTitle(context, appendix){
            // 调用后台 API 的伪代码
            let title = _.get('http://api.xxx.com/navbar/title');
            context.commit('setNavbarTitle', title);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {
        <span class="hljs-built_in">set</span>NavbarTitle(<span class="hljs-keyword">state</span>, value){
            <span class="hljs-keyword">state</span>.navbar.title = value;
        }
    },
    actions: {
        <span class="hljs-built_in">load</span>NavbarTitle(context, appendix){
            // 调用后台 API 的伪代码
            let title = _.get('http://api.xxx.com/navbar/title');
            context.commit('<span class="hljs-built_in">set</span>NavbarTitle', title);
        }
    }
});</code></pre>
<p>然后修改 <code>Navbar.vue</code> 中的 <code>trigger</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="trigger(){
    this.$store.dispatch('loadNavbarTitle', 'test');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>trigger(){
    <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'loadNavbarTitle'</span>, <span class="hljs-string">'test'</span>);
}</code></pre>
<p>类比 <code>mutations</code>，我们使用 <code>dispatch</code> 调用 <code>actions</code>，其中第一个参数为 <code>actions</code> 的方法名，第二个为附带参数。</p>
<p>而在 <code>actions</code> 中，会存在两个参数，第一个为 <code>context</code>，即为 <code>store</code>（注意区别 <code>mutations</code> 的第一个参数），第二个为附带参数。</p>
<h3 id="articleHeader47">actions 的另一使用场景</h3>
<p>有时，我们可能想要把对数据的更新或 API 的调用切分成更小的部分，即从一个入口 <code>mutations</code> 调用多个颗粒度小的 <code>mutations</code>，或者是一个 <code>actions</code> 调用多个其他的 <code>actions</code>。</p>
<p>如果我们想要在 <code>mutations</code> 或 <code>actions</code> 中继续调用其他的 <code>mutations</code> 或 <code>actions</code>，只能试图通过方法中的参数或 <code>this</code> 进行。</p>
<p>让我们观察一下 <code>mutations</code> 中获得的参数：第二个参数为传递的附加参数，自然不能做些什么；第一个参数为 <code>store.state</code>，通过这一值已经无法再调用 <code>mutations</code> 或 <code>actions</code> 了。</p>
<p>那么 <code>this</code> 关键字呢？当我们在其中使用 <code>console.log(this)</code> 时，发现输出为 <code>undefined</code>。事实上，<code>this</code> 指针已经无法再定位到 <code>store</code> 了。</p>
<p>现在我们考虑 <code>actions</code>，之前已经说过，<code>actions</code> 的第一个参数为 <code>store</code>，而通过这一参数，我们可以继续使用 <code>commit</code> 或 <code>dispatch</code> 操作 <code>mutations</code> 或 <code>actions</code>，或者直接操作 <code>state</code>。</p>
<p>基于以上，我们发现 <code>actions</code> 还具有另一种使用场景，即通过 <code>actions</code> 继续分发多个 <code>mutations</code>（或 <code>actions</code>），从而更灵活的组织代码，以减少代码的冗余。</p>
<p>参考以下示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = new Vuex.Store({
    state: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {
        setNavbarTitle(state, value){
            state.navbar.title = value;
        },
        test1(state){
            console.log('test1');
        },
        test2(state){
            console.log('test2');
        },
    },
    actions: {
        loadNavbarTitle(context){
            // 分发到两个 mutations 之中
            context.commit('test1');
            context.commit('test2');
        }
    },
    func(){
        console.log('func');
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        navbar: {
            title: 'navbar-title'
        }
    },
    mutations: {
        <span class="hljs-built_in">set</span>NavbarTitle(<span class="hljs-keyword">state</span>, value){
            <span class="hljs-keyword">state</span>.navbar.title = value;
        },
        test1(<span class="hljs-keyword">state</span>){
            console.<span class="hljs-keyword">log</span>('test1');
        },
        test2(<span class="hljs-keyword">state</span>){
            console.<span class="hljs-keyword">log</span>('test2');
        },
    },
    actions: {
        <span class="hljs-built_in">load</span>NavbarTitle(context){
            // 分发到两个 mutations 之中
            context.commit('test1');
            context.commit('test2');
        }
    },
    func(){
        console.<span class="hljs-keyword">log</span>('func');
    }
});</code></pre>
<h3 id="articleHeader48">官方数据流</h3>
<p>通过以上铺垫，我们便可以祭出官方给出的状态管理架构图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100891" src="https://static.alili.tech/img/remote/1460000010100891" alt="image_1bk8qdeq4dno14591d1al2512t41g.png-30.1kB" title="image_1bk8qdeq4dno14591d1al2512t41g.png-30.1kB" style="cursor: pointer;"></span></p>
<p>根据之前给出的代码，我们可以得到 Vuex 的一般使用流程：</p>
<ol>
<li><p>组件捕获事件，调用 <code>dispatch</code> 触发 <code>actions</code>；</p></li>
<li><p>在 <code>actions</code> 中调用后台 API 获取数据；</p></li>
<li><p>调用 <code>commit</code> 触发 <code>mutations</code> 更新存储于 <code>state</code> 之中的数据；</p></li>
<li><p>组件中的 <code>computed</code> 更新到组件的视图中。</p></li>
</ol>
<p>以上过程形成了闭环。也是官方标准的数据流。但在使用中，如果部分过程无需调用后台 API，也可以由组件直接调用 <code>commit</code> 触发 <code>mutations</code>，从而跳过不必要的 <code>actions</code>。</p>
<h3 id="articleHeader49">目录结构</h3>
<p>从之前的介绍中可以隐约感觉到，如果我们将所有的 <code>state</code>，<code>mutations</code>，<code>actions</code> 都放在 <code>Vuex.Store({})</code> 中的话，随着项目规模的扩大，其中的内容会越来越多，这样会导致代码难以维护。为了避免这个问题，我们需要将不同职责的 <code>store</code> 代码进行拆分。</p>
<p>官方给出了推荐的项目结构：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010100892" src="https://static.alili.tech/img/remote/1460000010100892" alt="image_1bk8r66gu1kf71j1l1f7i1mkn1caa1t.png-36.5kB" title="image_1bk8r66gu1kf71j1l1f7i1mkn1caa1t.png-36.5kB" style="cursor: pointer;"></span></p>
<p>在这一目录结构中，<code>state</code> 中的值被拆分为各个模块（modules），并连同 <code>actions</code>、<code>mutations</code> 一起在 <code>index.js</code> 进行汇集。</p>
<p>这其中，<code>actions</code> 和 <code>mutations</code> 包含全局性质的操作。而把每个小模块的 <code>state</code>，<code>mutations</code>，<code>actions</code> 都写在单独的 JavaScript 代码中并在 <code>modules</code> 中汇集。</p>
<p>有关 <code>modules</code> 和官方目录结构还有很多东西可以谈及，留待之后再撰文。</p>
<h2 id="articleHeader50">Vue-Resource</h2>
<p>在 vue 中，我们可以使用一些库实现后台 API 的调用，比较常用的由 <code>vue-resource</code> 和 <code>axios</code>，这里简单介绍 <code>vue-resource</code>。</p>
<h3 id="articleHeader51">安装</h3>
<p>和其他的库一样，使用 <code>npm</code> 安装即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-resource --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">resource</span> <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader52">使用</h3>
<p>类似于 Vuex 的使用，我们需要在 <code>main.js</code> 文件中进行修改，添加以下两句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VUeResource from 'vue-resource'

Vue.use(VUeResource);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VUeResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

Vue.use(VUeResource);</code></pre>
<p>然后，我们可以在组件中进行使用。这里提供一个测试用的 API 地址，来自 <a href="http://apistore.baidu.com/" rel="nofollow noreferrer" target="_blank">百度 APIStore</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span>//apis.baidu.com/apistore/iplookup/iplookup_paid?<span class="hljs-built_in">ip</span>=<span class="hljs-number">117.89</span><span class="hljs-meta">.35</span><span class="hljs-meta">.58</span></code></pre>
<p>由于这些 API 服务需要购买才可以返回正确的信息。这里只用于走通形式，不在乎返回数据的正确与否。</p>
<p>以下对最常用的 GET 和 POST 请求进行介绍，更多的使用方法可以参考 <a href="https://github.com/pagekit/vue-resource/blob/develop/docs/http.md" rel="nofollow noreferrer" target="_blank">API 文档</a>。</p>
<h4>GET 请求</h4>
<p>我们在 <code>Footbar.vue</code> 的 <code>script</code> 中使用以下方式发起 GET 请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    created(){
        let api = 'http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58';
        this.$http.get(api).then(response => {
            console.log('接口调用成功');
            console.log(response);
        }, response => {
            console.log('接口调用错误');
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    created(){
        <span class="hljs-keyword">let</span> api = <span class="hljs-string">'http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58'</span>;
        <span class="hljs-keyword">this</span>.$http.get(api).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接口调用成功'</span>);
            <span class="hljs-built_in">console</span>.log(response);
        }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接口调用错误'</span>);
        });
    }
}</code></pre>
<p>这里在 <code>create()</code> 生命周期中触发了 GET 方法。可以看到浏览器中输出的结果。</p>
<p>以上示例使用了 <code>this.$http</code> 发起请求，需要在 Vue 组件之中。如果不借助 <code>this</code>，我们可以通过如下方式调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let api = 'http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58';
Vue.http.get(api).then(response => {
    console.log('接口调用成功');
    console.log(response);
}, response => {
    console.log('接口调用错误');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> api = <span class="hljs-string">'http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58'</span>;
Vue.http.get(api).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接口调用成功'</span>);
    <span class="hljs-built_in">console</span>.log(response);
}, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接口调用错误'</span>);
});</code></pre>
<p>注意，这里的 <code>http</code> 是没有 <code>$</code> 符号的。</p>
<h4>POST 请求</h4>
<p>GET 和 POST 请求的使用方式稍有不同，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let api = 'http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58';
this.$http.post(api, {
    username: 'xxx'
}).then(response => {
    console.log('接口调用成功');
    console.log(response);
}, response => {
    console.log('接口调用错误');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> api = <span class="hljs-string">'http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58'</span>;
<span class="hljs-keyword">this</span>.$http.post(api, {
    username: <span class="hljs-string">'xxx'</span>
}).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接口调用成功'</span>);
    <span class="hljs-built_in">console</span>.log(response);
}, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接口调用错误'</span>);
});</code></pre>
<p>由于测试 API 不支持 POST 方式，控制台会打印出接口调用错误的提示，同时会抛出一个很重要的错误信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="XMLHttpRequest cannot load http://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=117.89.35.58. Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">XMLHttpRequest cannot <span class="hljs-keyword">load</span> <span class="hljs-keyword">http</span>://apis.baidu.com/apistore/iplookup/iplookup_paid?ip=<span class="hljs-number">117.89</span><span class="hljs-number">.35</span><span class="hljs-number">.58</span>. Request header <span class="hljs-keyword">field</span> <span class="hljs-keyword">Content</span>-<span class="hljs-keyword">Type</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> allowed <span class="hljs-keyword">by</span> <span class="hljs-keyword">Access</span>-Control-<span class="hljs-keyword">Allow</span>-Headers <span class="hljs-keyword">in</span> preflight response.</code></pre>
<p>即是跨域问题。</p>
<h3 id="articleHeader53">跨域问题</h3>
<p>这是由于我们通过 A 域名的 JavaScript 代码请求 B 域名的 API 时，在不做任何处理的情况下，会违背 <a href="https://www.zhihu.com/question/25427931/answer/30848852" rel="nofollow noreferrer" target="_blank">浏览器同源政策 </a> 而被浏览器拒绝。</p>
<p>这会在前后端分离架构中导致两个致命的问题：</p>
<ol>
<li><p>API 请求无法发送；</p></li>
<li><p>Cookie 信息无法传递；</p></li>
</ol>
<p>解决这个问题的方案通常有两类：jsonp 或是添加响应头。这里提供一些解决方法以供读者参考：</p>
<ol>
<li><p><a href="http://blog.csdn.net/asd136912/article/details/67638772" rel="nofollow noreferrer" target="_blank">vue 与 vue-resource 跨域问题解决</a></p></li>
<li><p><a href="https://www.zhihu.com/question/46202188" rel="nofollow noreferrer" target="_blank">Vue.js如何实现跨域请求？</a></p></li>
<li><p><a href="http://www.cnblogs.com/youzhuxiaoyao/p/6039888.html" rel="nofollow noreferrer" target="_blank">Vue2.0 vue-source.js jsonp demo vue跨域请求</a></p></li>
<li><p><a href="http://www.cnblogs.com/gabrielchen/p/5066120.html" rel="nofollow noreferrer" target="_blank">用nginx的反向代理机制解决前端跨域问题</a></p></li>
</ol>
<h2 id="articleHeader54">Vue Router</h2>
<p>基于 Vue 的组件开发方式可以让我们在切换页面时只替换某一部分的组件，从而实现局部刷新。想要实现这一点，需要由前端拦截请求，通过 JavaScript 代码根据访问的 URL 替换不同的组件从而实现局部刷新效果。</p>
<p>在介绍这一点前，我们先提一下 <code>iframe</code> 的方式。采用 <code>iframe</code> 标签，通过修改其 <code>src</code> 属性，可以实现页面局部（即 <code>iframe</code> DOM 元素）刷新。但这样的局部刷新存在一些问题：</p>
<ol>
<li><p>内部 <code>iframe</code> 的 URL 变化无法在浏览器中显示出来。也就是说，当 <code>iframe</code> 局部刷新的时候，浏览器上访问的 URL 是不变化的，这就使得用户无法通过赋值 URL 的方式再次打开同样的页面。这一点在很多应用中是致命的；</p></li>
<li><p>外部无法捕获内部 <code>iframe</code> 的变化。当用户在 <code>iframe</code> 中的页面进行跳转或类似操作时，外部无法得知。又因为浏览器同源政策的存在，使得内外部的 DOM、数据等是绝缘的。这样的方式在很多场景下极其受限。</p></li>
</ol>
<h3 id="articleHeader55">安装</h3>
<p>同之前所说的其他 Vue 插件一样，我们通过 npm 进行安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-router <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader56">使用</h3>
<p>首先，我们在 <code>src</code> 目录下新建一个 <code>router</code> 目录，在其中创建 <code>index.js</code> 文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import ContentA from '../components/ContentA';
import ContentB from '../components/ContentB';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/a',
            name: 'ContentA',
            component: ContentA
        },
        {
            path: '/b',
            name: 'ContentB',
            component: ContentB
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> ContentA <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/ContentA'</span>;
<span class="hljs-keyword">import</span> ContentB <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/ContentB'</span>;

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    routes: [
        {
            path: <span class="hljs-string">'/a'</span>,
            name: <span class="hljs-string">'ContentA'</span>,
            component: ContentA
        },
        {
            path: <span class="hljs-string">'/b'</span>,
            name: <span class="hljs-string">'ContentB'</span>,
            component: ContentB
        }
    ]
})</code></pre>
<p>这个文件相当于 Vue Router 的路由配置文件。注意到，在最上方，我们引入了两个组件。现在我们创建这两个组件。</p>
<p>在 <code>src/components</code> 文件夹下新建 <code>ContentA.vue</code> 和 <code>ContentB.vue</code> 两个文件，并在其中随便写入一些内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// `ContentA.vue`

<style scoped>

</style>

<template>
    <div>
        这里是 A 号组件
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'index content'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// `ContentA.vue`

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        这里是 A 号组件
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'index content'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// `ContentB.vue`

<style scoped>

</style>

<template>
    <div>
        这里是 B 号组件
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'index content'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// `ContentB.vue`

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        这里是 B 号组件
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'index content'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这之后需要修改 <code>main.js</code> 文件，在首部添加以下内容，即引入 <code>src/router/index.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import router from './router/index'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/index'</span></code></pre>
<p>最后，我们需要对 <code>App.vue</code> 进行修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    div{
        background-color: aquamarine;
    }
</style>

<template>
    <div>
        <Navbar></Navbar>
        <router-view></router-view>
        <Footbar></Footbar>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Footbar from './components/Footbar'
    export default {
        components: {
            Navbar, Footbar
        },
        methods: {

        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background-color</span>: aquamarine;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Navbar</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Footbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Footbar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> Navbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Navbar'</span>
    <span class="hljs-keyword">import</span> Footbar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Footbar'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            Navbar, Footbar
        },
        <span class="hljs-attr">methods</span>: {

        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注意到，我们在 <code>template</code> 标签中加入了 <code>&lt;router-view&gt;&lt;/router-view&gt;</code> 标签。作为 Vue Router 填充组件的标志。</p>
<p>根据配置，当我们访问 <code>/a</code> 时，<code>&lt;router-view&gt;&lt;/router-view&gt;</code> 会被替换为 <code>ContentA</code> 组件；当访问 <code>/b</code> 时，其会被替换为 <code>ContentB</code>。</p>
<p>现在我们做一下尝试，在执行了 <code>npm run dev</code> 之后，访问  <code>http://localhost:8080/#/a</code> 和 <code>http://localhost:8080/#/b</code>，查看效果。</p>
<p>当访问这两个 URL 时，可以在控制台的网络中进行监控，已验证网页确实没有重新请求。</p>
<h3 id="articleHeader57">History</h3>
<p>可以注意到，我们访问的 URL 中存在一个 <code>#</code>，官方的解释如下：</p>
<blockquote>
<p>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。</p>
<p>如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。</p>
</blockquote>
<p>此时我们需要修改 <code>router/index.js</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    mode: 'history',
    routes: [...]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">mode</span>: <span class="hljs-string">'history'</span>,
    routes: [...]
})</code></pre>
<p>但是，这样一来，当我们直接输入 <code>localhost:8080/xxx</code> 而非从 <code>localhost:8080/</code> 跳转过去的时候，Vue Router 无法正常完成功能。这是由于，当我们访问 <code>localhost:8080/xxx</code> 时，后端会在其配置中寻找该 URL 应该转发的文件，而不是交给 <code>/index.html</code> 再由其中引入的 JavaScript 代码进行路由控制。</p>
<p>为了能够支持这一需求，我们需要修改服务器端的配置，可以参考官方说明中的 <a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">后端配置例子</a>。</p>
<p>如在 Nginx 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location / {
    try_files $uri $uri/ /index.html;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">location</span> / {
    <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html;
}</code></pre>
<p>可以看到，这即是将请求都导向 index.html 从而使得 JavaScript 获得了对请求的路由控制。</p>
<h3 id="articleHeader58">编程式导航</h3>
<p>在组件中，我们可以通过以下方式进行跳转：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.push({
    name: 'a'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">this</span>.$router.<span class="hljs-keyword">push</span>({
    name: <span class="hljs-string">'a'</span>
})</code></pre>
<p>注意，这里的 <code>name</code> 即为我们在 <code>router/index.js</code> 中配置的 <code>name</code> 值。</p>
<h3 id="articleHeader59">导航钩子</h3>
<p>有时，我们想要在 URL 跳转时做一些处理，比如根据当前状态判断此次跳转能否执行。此时就需要使用到导航钩子。我们可以在 <code>router/index.js</code> 中配置一个导航钩子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let router = new Router({
    routes: [...]
})

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    next();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>let router = <span class="hljs-keyword">new</span> Router({
    routes: [...]
})

router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, next)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(to);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>);
    next();
})</code></pre>
<p>在该导航钩子中，对跳转前、跳转后的元信息进行了打印，我们可以通过它们获得路由配置的信息，从而根据实际需求进行相应的控制。</p>
<h3 id="articleHeader60">
<code>this.$router</code> 和 <code>this.$route</code>
</h3>
<p>我们可以通过 <code>this.$router</code> 进行跳转。但当我们想要获得如当前 URL 的一些信息（如含参路由）时，需要通过 <code>this.$route</code> 获得。上面提到的导航钩子中的 <code>to</code> 和 <code>from</code> 都是 <code>this.$route</code> 的形式。</p>
<h3 id="articleHeader61">注意事项</h3>
<ol>
<li><p>Vue Router 的引入会使得打包的 JavaScript 文件已经包含了所有的组件和逻辑代码。随着项目的扩大，JavaScript 文件会越来越大，使得初次加载的时间变长。应对这一问题，我们可以考略在业务层面进行拆分，并将从属于某一业务的多个组件放在一起打包，从而降低加载文件的大小；</p></li>
<li><p>在配置了钩子函数之后，当页面刷新时，会自动触发一次从首页到访问页的跳转事件。即 from = 首页，to = 访问页。在使用钩子函数进行跳转权限判定时需要注意。</p></li>
</ol>
<hr>
<h2 id="articleHeader62">参考</h2>
<ol>
<li><p><a href="https://segmentfault.com/a/1190000008010666#articleHeader1">Vue2.0 探索之路——生命周期和钩子函数的一些理解 - segmentfault</a></p></li>
<li><p><a href="http://www.cnblogs.com/gagag/p/6246493.html" rel="nofollow noreferrer" target="_blank">Vue生命周期 - 博客园</a></p></li>
<li><p><a href="http://www.jianshu.com/p/ebfeb687eb70" rel="nofollow noreferrer" target="_blank">30分钟掌握ES6/ES2015核心内容 - 简书</a></p></li>
<li><p><a href="http://www.cnblogs.com/diligenceday/p/5503777.html.html" rel="nofollow noreferrer" target="_blank">ES6新特性：使用export和import实现模块化 - 博客园</a></p></li>
<li><p><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a></p></li>
<li><p><a href="https://stackoverflow.com/questions/40190524/how-to-set-favicon-ico-properly-on-vue-js-webpack-project" rel="nofollow noreferrer" target="_blank">How to set favicon.ico properly on vue.js webpack project? - Stack Overflow</a></p></li>
<li><p><a href="https://www.v2ex.com/t/338798" rel="nofollow noreferrer" target="_blank">为什么直接绑定在 Vue 自定义组件标签上的事件无法触发 - V2EX</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">Babel 入门教程</a></p></li>
<li><p><a href="http://www.cnblogs.com/hollen/p/5956012.html" rel="nofollow noreferrer" target="_blank">npm install --save 与 npm install --save-dev 的区别 - 博客园</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue QuickStart

## 原文链接
[https://segmentfault.com/a/1190000010100874](https://segmentfault.com/a/1190000010100874)

