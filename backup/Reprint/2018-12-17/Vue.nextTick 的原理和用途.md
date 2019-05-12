---
title: 'Vue.nextTick 的原理和用途' 
date: 2018-12-17 2:30:07
hidden: true
slug: jcrrq78e27i
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对于 Vue.nextTick 方法，自己有些疑惑。在查询了各种资料后，总结了一下其原理和用途，如有错误，请不吝赐教。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>对于 Vue<span class="hljs-selector-class">.nextTick</span> 方法，自己有些疑惑。在查询了各种资料后，总结了一下其原理和用途，如有错误，请不吝赐教。
</code></pre>
<h1 id="articleHeader0">概览</h1>
<blockquote>官方文档说明：</blockquote>
<ul><li>用法：</li></ul>
<p>在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。</p>
<blockquote>疑问：</blockquote>
<ol>
<li>DOM 更新循环是指什么？</li>
<li>下次更新循环是什么时候？</li>
<li>修改数据之后使用，是加快了数据更新进度吗？</li>
<li>在什么情况下要用到？</li>
</ol>
<h1 id="articleHeader1">原理</h1>
<h2 id="articleHeader2">异步说明</h2>
<blockquote>Vue 实现响应式并<strong>不是数据发生变化之后 DOM 立即变化</strong>，而是按一定的策略进行 DOM 的更新。</blockquote>
<p>在 Vue 的<a href="https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97" rel="nofollow noreferrer" target="_blank">文档</a>中，说明 Vue 是<strong>异步</strong>执行 DOM 更新的。关于异步的解析，可以查看阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>。截取关键部分如下：</p>
<p>具体来说，异步执行的运行机制如下。</p>
<blockquote>（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。<br>（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。<br>（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。<br>（4）主线程不断重复上面的第三步。</blockquote>
<p>下图就是主线程和任务队列的示意图。</p>
<p><span class="img-wrap"><img data-src="/img/bVEBug?w=581&amp;h=420" src="https://static.alili.tech/img/bVEBug?w=581&amp;h=420" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">事件循环说明</h2>
<p>简单来说，Vue 在修改数据后，视图不会立刻更新，而是等<strong>同一事件循环</strong>中的所有数据变化完成之后，再统一进行视图更新。</p>
<p><a href="https://www.zhihu.com/question/50879936" rel="nofollow noreferrer" target="_blank">知乎</a>上的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    console.log(vm.$el.textContent) //可以得到'changed'
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>//改变数据
<span class="hljs-keyword">vm</span>.message = <span class="hljs-string">'changed'</span>

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">el</span>.textContent) // 并不会得到<span class="hljs-string">'changed'</span>

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">el</span>.textContent) //可以得到<span class="hljs-string">'changed'</span>
})
</code></pre>
<p>图解：</p>
<p><span class="img-wrap"><img data-src="/img/bV17xC?w=423&amp;h=512" src="https://static.alili.tech/img/bV17xC?w=423&amp;h=512" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>事件循环：</blockquote>
<p>第一个 tick（图例中第一个步骤，即'本次更新循环'）：</p>
<ol>
<li>首先修改数据，这是同步任务。同一事件循环的所有的同步任务都在主线程上执行，形成一个执行栈，此时还未涉及 DOM 。</li>
<li>Vue 开启一个异步队列，并缓冲在此事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。</li>
</ol>
<p>第二个 tick（图例中第二个步骤，即'下次更新循环'）：</p>
<p>同步任务执行完毕，开始执行异步 watcher 队列的任务，更新 DOM 。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel 方法，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。</p>
<p>第三个 tick（图例中第三个步骤）：</p>
<p>此时就是文档所说的</p>
<blockquote>下次 DOM 更新循环结束之后</blockquote>
<p>此时通过 Vue.nextTick 获取到改变后的 DOM 。通过 setTimeout(fn, 0) 也可以同样获取到。</p>
<hr>
<p>简单总结事件循环：</p>
<p>同步代码执行 -&gt; 查找异步队列，推入执行栈，执行Vue.nextTick[事件循环1] -&gt;查找异步队列，推入执行栈，执行Vue.nextTick[事件循环2]...</p>
<p>总之，异步是单独的一个tick，不会和同步在一个 tick 里发生，也是 DOM 不会马上改变的原因。</p>
<h1 id="articleHeader4">用途</h1>
<blockquote>应用场景：需要在视图更新之后，基于新的视图进行操作。</blockquote>
<h2 id="articleHeader5">created、mounted</h2>
<p>需要注意的是，在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。</p>
<p>官方文档说明：</p>
<blockquote>注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>mounted: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Code that will run only after the</span>
    <span class="hljs-comment">// entire view has been rendered</span>
  })
}
</code></pre>
<h2 id="articleHeader6">其他应用场景</h2>
<p>其他应用场景如下三例：</p>
<p>例子1：</p>
<p>点击按钮显示原本以 v-show = false 隐藏起来的输入框，并获取焦点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showsou(){
  this.showit = true //修改 v-show
  document.getElementById(&quot;keywords&quot;).focus()  //在第一个 tick 里，获取不到输入框，自然也获取不到焦点
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">showsou</span><span class="hljs-params">()</span></span>{
  this<span class="hljs-selector-class">.showit</span> = true <span class="hljs-comment">//修改 v-show</span>
  document.getElementById(<span class="hljs-string">"keywords"</span>).focus()  <span class="hljs-comment">//在第一个 tick 里，获取不到输入框，自然也获取不到焦点</span>
}</code></pre>
<p>修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showsou(){
  this.showit = true
  this.$nextTick(function () {
    // DOM 更新了
    document.getElementById(&quot;keywords&quot;).focus()
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>showsou(){
  <span class="hljs-keyword">this</span>.showit = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// DOM 更新了</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"keywords"</span>).focus()
  })
}</code></pre>
<p>例子2：</p>
<p>点击获取元素宽度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <p ref=&quot;myWidth&quot; v-if=&quot;showMe&quot;>"{{" message "}}"</p>
    <button @click=&quot;getMyWidth&quot;>获取p元素宽度</button>
</div>

getMyWidth() {
    this.showMe = true;
    //this.message = this.$refs.myWidth.offsetWidth;
    //报错 TypeError: this.$refs.myWidth is undefined
    this.$nextTick(()=>{
        //dom元素更新后执行，此时能拿到p元素的属性
        this.message = this.$refs.myWidth.offsetWidth;
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>&lt;div id=<span class="hljs-string">"app"</span>&gt;
    &lt;p ref=<span class="hljs-string">"myWidth"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"showMe"</span>&gt;"{{" message "}}"&lt;/p&gt;
    &lt;button @click=<span class="hljs-string">"getMyWidth"</span>&gt;获取p元素宽度&lt;/button&gt;
&lt;/div&gt;

getMyWidth() {
    <span class="hljs-keyword">this</span>.showMe = <span class="hljs-literal">true</span>;
    <span class="hljs-regexp">//</span><span class="hljs-keyword">this</span>.message = <span class="hljs-keyword">this</span>.$refs.myWidth.offsetWidth;
    <span class="hljs-regexp">//</span>报错 TypeError: <span class="hljs-keyword">this</span>.$refs.myWidth <span class="hljs-keyword">is</span> <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-regexp">//</span>dom元素更新后执行，此时能拿到p元素的属性
        <span class="hljs-keyword">this</span>.message = <span class="hljs-keyword">this</span>.$refs.myWidth.offsetWidth;
  })
}</code></pre>
<p>例子3：</p>
<p>使用 swiper 插件通过 ajax 请求图片后的滑动问题。</p>
<h2 id="articleHeader7">实例理解 nextTick 应用</h2>
<p>下面的例子来自 <a href="https://www.cnblogs.com/hity-tt/p/6729118.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/hity-...</a>， 稍有改动。各位可以复制运行一遍，加深理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <ul>
            <li class=&quot;example&quot; v-for=&quot;item in list1&quot;>"{{"item"}}"</li>
        </ul>
        <ul>
            <li class=&quot;example&quot; v-for=&quot;item in list2&quot;>"{{"item"}}"</li>
        </ul>
        <ol>
            <li class=&quot;example&quot; v-for=&quot;item in list3&quot;>"{{"item"}}"</li>
        </ol>
        <ol>
            <li class=&quot;example&quot; v-for=&quot;item in list4&quot;>"{{"item"}}"</li>
        </ol>
        <ol>
            <li class=&quot;example&quot; v-for=&quot;item in list5&quot;>"{{"item"}}"</li>
        </ol>
    </div>
</template>
<script type=&quot;text/javascript&quot;>
export default {
    data() {
        return {
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            list5: []
        }
    },
    created() {
        this.composeList12()
        this.composeList34()
        this.composeList5()
        this.$nextTick(function() {
            // DOM 更新了
            console.log('finished test ' + new Date().toString(),document.querySelectorAll('.example').length)
        })
    },
    methods: {
        composeList12() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list1, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list1 ' + new Date().toString(),document.querySelectorAll('.example').length)

            for (let i = 0; i < count; i++) {
                this.$set(me.list2, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list2 ' + new Date().toString(),document.querySelectorAll('.example').length)

            this.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick1&amp;2 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
        },
        composeList34() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list3, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list3 ' + new Date().toString(),document.querySelectorAll('.example').length)

            this.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick3 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })

            setTimeout(me.setTimeout1, 0)
        },
        setTimeout1() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list4, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list4 ' + new Date().toString(),document.querySelectorAll('.example').length)

            me.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick4 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
        },
        composeList5() {
            let me = this
            let count = 10000

            this.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick5-1 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })

            setTimeout(me.setTimeout2, 0)
        },
        setTimeout2() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list5, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list5 ' + new Date().toString(),document.querySelectorAll('.example').length)

            me.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick5 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list1"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list2"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list3"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list4"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list5"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">list1</span>: [],
            <span class="hljs-attr">list2</span>: [],
            <span class="hljs-attr">list3</span>: [],
            <span class="hljs-attr">list4</span>: [],
            <span class="hljs-attr">list5</span>: []
        }
    },
    created() {
        <span class="hljs-keyword">this</span>.composeList12()
        <span class="hljs-keyword">this</span>.composeList34()
        <span class="hljs-keyword">this</span>.composeList5()
        <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// DOM 更新了</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished test '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)
        })
    },
    <span class="hljs-attr">methods</span>: {
        composeList12() {
            <span class="hljs-keyword">let</span> me = <span class="hljs-keyword">this</span>
            <span class="hljs-keyword">let</span> count = <span class="hljs-number">10000</span>

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; count; i++) {
                <span class="hljs-keyword">this</span>.$set(me.list1, i, <span class="hljs-string">'I am a 测试信息～～啦啦啦'</span> + i)
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished list1 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; count; i++) {
                <span class="hljs-keyword">this</span>.$set(me.list2, i, <span class="hljs-string">'I am a 测试信息～～啦啦啦'</span> + i)
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished list2 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)

            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// DOM 更新了</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished tick1&amp;2 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)
            })
        },
        composeList34() {
            <span class="hljs-keyword">let</span> me = <span class="hljs-keyword">this</span>
            <span class="hljs-keyword">let</span> count = <span class="hljs-number">10000</span>

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; count; i++) {
                <span class="hljs-keyword">this</span>.$set(me.list3, i, <span class="hljs-string">'I am a 测试信息～～啦啦啦'</span> + i)
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished list3 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)

            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// DOM 更新了</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished tick3 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)
            })

            setTimeout(me.setTimeout1, <span class="hljs-number">0</span>)
        },
        setTimeout1() {
            <span class="hljs-keyword">let</span> me = <span class="hljs-keyword">this</span>
            <span class="hljs-keyword">let</span> count = <span class="hljs-number">10000</span>

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; count; i++) {
                <span class="hljs-keyword">this</span>.$set(me.list4, i, <span class="hljs-string">'I am a 测试信息～～啦啦啦'</span> + i)
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished list4 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)

            me.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// DOM 更新了</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished tick4 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)
            })
        },
        composeList5() {
            <span class="hljs-keyword">let</span> me = <span class="hljs-keyword">this</span>
            <span class="hljs-keyword">let</span> count = <span class="hljs-number">10000</span>

            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// DOM 更新了</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished tick5-1 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)
            })

            setTimeout(me.setTimeout2, <span class="hljs-number">0</span>)
        },
        setTimeout2() {
            <span class="hljs-keyword">let</span> me = <span class="hljs-keyword">this</span>
            <span class="hljs-keyword">let</span> count = <span class="hljs-number">10000</span>

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; count; i++) {
                <span class="hljs-keyword">this</span>.$set(me.list5, i, <span class="hljs-string">'I am a 测试信息～～啦啦啦'</span> + i)
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished list5 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)

            me.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// DOM 更新了</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finished tick5 '</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString(),<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.example'</span>).length)
            })
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>结果：</p>
<p><span class="img-wrap"><img data-src="/img/bV1752?w=720&amp;h=288" src="https://static.alili.tech/img/bV1752?w=720&amp;h=288" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader8">参考文章</h1>
<p><a href="https://www.cnblogs.com/hity-tt/p/6729118.html" rel="nofollow noreferrer" target="_blank">vue nextTick深入理解－vue性能优化、DOM更新时机、事件循环机制；</a><br><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">JavaScript 运行机制详解：再谈Event Loop</a><br><a href="https://www.zhihu.com/question/50879936" rel="nofollow noreferrer" target="_blank">知乎：vue.js$nextTick的一个问题</a><br><a href="http://www.cnblogs.com/hity-tt/p/6733062.html" rel="nofollow noreferrer" target="_blank">JS 事件循环机制 - 任务队列、web API、JS主线程的相互协同</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.nextTick 的原理和用途

## 原文链接
[https://segmentfault.com/a/1190000012861862](https://segmentfault.com/a/1190000012861862)

