---
title: 'vue非父子组件怎么进行通信' 
date: 2019-01-28 2:30:09
hidden: true
slug: 98hq3w0e3ha
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文只在个人博客和 SegmentFault 社区个人专栏发表，转载请注明出处 <br>个人博客: <a href="https://zengxiaotao.github.io" rel="nofollow noreferrer" target="_blank">https://zengxiaotao.github.io</a> <br>SegmentFault 个人专栏: <a href="https://segmentfault.com/blog/zengxiaotao">https://segmentfault.com/blog...</a></p></blockquote>
<h3 id="articleHeader0">写在前面</h3>
<p>组件是 vue 的核心部分，而组件之间通信方式是必不可少的。 父子之间的通信方式很简单，父组件通过 props 向子组件传值，而子组件通过自定义事件把数据传递回父组件，那么非父子关系组件怎么进行通信？  <br>Vue2.x 废弃了 broadcast 和 dispatch 之后，可以通过 vuex ，还有 event bus 来解决。这里不讲 vuex ，讲起来是另外一个话题，就讲一下怎么在非父子组件之间通过 event bus 进行通信。</p>
<h3 id="articleHeader1">demo</h3>
<p>首先我们要实现的效果是</p>
<p><span class="img-wrap"><img data-src="/img/bVHUkt?w=231&amp;h=180" src="https://static.alili.tech/img/bVHUkt?w=231&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上下分别是 foo组件和 bar 组件，它们之间是非父子关系，分别点击各自的 button ，另一个组件的 count 对应增加。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>非父子组件通信</title>
    <script src=&quot;https://unpkg.com/vue@2.1.8/dist/vue.js&quot;></script>
</head>
<body>
    <div id='app'>
        <foo></foo>
        <hr>
        <bar></bar>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>非父子组件通信<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue@2.1.8/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'app'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">foo</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">foo</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>以上就是这个 demo 结构。看看 js 的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册一个空的 Vue 实例，作为 ‘中转站’
var eventBus = new Vue({})
// foo 组件
var foo = {
    template: '<div><p>the count of foo is "{{"fooCount"}}"</p>' +
                '<button @click=&quot;addBar&quot;>add bar\'s count</button></div>',
    data: function() {
        return {
            fooCount: 0            
        }
    },
    methods: {
        addBar: function() {
            // 触发事件
            eventBus.$emit('addBar')    
        }
    },
    mounted: function() {
        eventBus.$on('addFoo', function(num) {
            this.fooCount +=num
        }.bind(this)) 
        // 这里必须将 this 绑定在组件实例上。如果不使用 bind , 也可以使用箭头函数。
    }
}
// bar 组件
var bar = {
    template: '<div><p>the count of bar is "{{"barCount"}}"</p>' +
                '<button @click=&quot;addFoo&quot;>add foo\'s count</button></div>',
    data: function() {
        return {
            barCount: 0
        }
    },
    methods: {
        addFoo: function() {
            // 触发事件，同时传递一个参数
            eventBus.$emit('addFoo', 2)
        }
    },
    // 在 组件创建的钩子函数中 监听事件
    mounted: function() {
        eventBus.$on('addBar', function() {
            this.barCount++
        }.bind(this))
    }
}
var vm = new Vue({
    el: '#app',
    components: {
        foo,
        bar
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 注册一个空的 Vue 实例，作为 ‘中转站’</span>
<span class="hljs-keyword">var</span> eventBus = <span class="hljs-keyword">new</span> Vue({})
<span class="hljs-comment">// foo 组件</span>
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;p&gt;the count of foo is "{{"fooCount"}}"&lt;/p&gt;'</span> +
                <span class="hljs-string">'&lt;button @click="addBar"&gt;add bar\'s count&lt;/button&gt;&lt;/div&gt;'</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">fooCount</span>: <span class="hljs-number">0</span>            
        }
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">addBar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 触发事件</span>
            eventBus.$emit(<span class="hljs-string">'addBar'</span>)    
        }
    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        eventBus.$on(<span class="hljs-string">'addFoo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
            <span class="hljs-keyword">this</span>.fooCount +=num
        }.bind(<span class="hljs-keyword">this</span>)) 
        <span class="hljs-comment">// 这里必须将 this 绑定在组件实例上。如果不使用 bind , 也可以使用箭头函数。</span>
    }
}
<span class="hljs-comment">// bar 组件</span>
<span class="hljs-keyword">var</span> bar = {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;p&gt;the count of bar is "{{"barCount"}}"&lt;/p&gt;'</span> +
                <span class="hljs-string">'&lt;button @click="addFoo"&gt;add foo\'s count&lt;/button&gt;&lt;/div&gt;'</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">barCount</span>: <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">addFoo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 触发事件，同时传递一个参数</span>
            eventBus.$emit(<span class="hljs-string">'addFoo'</span>, <span class="hljs-number">2</span>)
        }
    },
    <span class="hljs-comment">// 在 组件创建的钩子函数中 监听事件</span>
    mounted: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        eventBus.$on(<span class="hljs-string">'addBar'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.barCount++
        }.bind(<span class="hljs-keyword">this</span>))
    }
}
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">components</span>: {
        foo,
        bar
    }
})</code></pre>
<p>以上就实现了一个简易的 非父子组件之间的通信方式。通过 event bus ，在一个组件创建时的钩子函数中监听 某个事件，而在需要与其进行通信的组件中触发这个函数，同时交换数据。  </p>
<p>当然，event bus 只适于某些不复杂的场景，在需要频繁进行组件通信的情况下，还是应该尽量使用 Vuex ，不仅使用上更加简单，同时数据流的流向也会相对清晰。</p>
<blockquote><p>全文完</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue非父子组件怎么进行通信

## 原文链接
[https://segmentfault.com/a/1190000008042320](https://segmentfault.com/a/1190000008042320)

