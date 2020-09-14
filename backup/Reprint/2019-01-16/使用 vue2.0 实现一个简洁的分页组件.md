---
title: '使用 vue2.0 实现一个简洁的分页组件' 
date: 2019-01-16 2:30:08
hidden: true
slug: 4jstfqprbih
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<blockquote><ol>
<li><p>使用 vue-cli 初始化项目</p></li>
<li><p>使用 vuex 管理数据</p></li>
<li><p>node v6.9.2，npm v3.10.9</p></li>
</ol></blockquote>
<ul><li>
<p>分页效果预览：</p>
<ul>
<li><p><a href="https://luyilin.github.io/Minemine-pagination/dist/index.html" rel="nofollow noreferrer" target="_blank">在线 demo</a></p></li>
<li><p><a href="https://github.com/luyilin/Minemine-pagination" rel="nofollow noreferrer" target="_blank">github 地址</a></p></li>
<li><p>分页效果截图<span class="img-wrap"><img data-src="/img/remote/1460000009126098?w=1346&amp;h=186" src="https://static.alili.tech/img/remote/1460000009126098?w=1346&amp;h=186" alt="messagedboard" title="messagedboard" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
</li></ul>
<h3 id="articleHeader1">分页原理</h3>
<ul><li><p>实现分页主要依靠两个参数，偏移量（offset）、限制数（limit）。点击分页发送 Ajax 请求，将这两个参数传给后端，后端从数据库筛选出对应的数据返回给前端，前端将获取到的数据添加到页面中，分页组件根据偏移量和限制数显示对应的页码，这是一个简单地实现分页的思路。</p></li></ul>
<h3 id="articleHeader2">分页类型</h3>
<ul>
<li><p>分页一般分为两种类型，一种经常用于移动端的滚动加载，或是一个按钮点击即可加载更多。这种分页实现起来比较简单，前端仅需定义一个 offset 变量，每次 ajax 请求时 offset += limit，然后将获取到的内容 append 上去即可。</p></li>
<li><p>另一种是显示总页数、当前页数、上一页、下一页按钮，且页数较多时将中间页数用省略号表示。这种分页实现起来稍微复杂一点，但用户体验更好，本文讨论的就是如何使用 vue 实现这样的分页组件。</p></li>
</ul>
<h3 id="articleHeader3">分页组件</h3>
<ul>
<li>
<p>创建 pagination.vue 文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;page-wrap&quot;>
      <ul v-show=&quot;prePage&quot; class=&quot;li-page&quot; v-tap=&quot;{methods: goPrePage}&quot;>上一页</ul>
      <ul>
        <li v-for=&quot;i in showPageBtn&quot; :class=&quot;{active: i === currentPage, pointer: i, hover: i &amp;&amp; i !== currentPage}&quot;
            v-tap=&quot;{methods: goPage, i: i}&quot;>
          <a v-if=&quot;i&quot; class=&quot;notPointer&quot;>"{{"i"}}"</a>
          <a v-else>···</a>
        </li>
      </ul>
      <ul v-show=&quot;nextPage&quot; class=&quot;li-page&quot; v-tap=&quot;{methods: goNextPage}&quot;>下一页</ul>
    </div>

</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-wrap"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"prePage"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"li-page"</span> <span class="hljs-attr">v-tap</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{methods: goPrePage}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>上一页<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"i in showPageBtn"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: i === currentPage, pointer: i, hover: i &amp;&amp; i !== currentPage}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
            <span class="hljs-attr">v-tap</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{methods: goPage, i: i}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"i"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notPointer"</span>&gt;</span></span><span class="hljs-template-variable">"{{"i}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-else</span>&gt;</span>···<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"nextPage"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"li-page"</span> <span class="hljs-attr">v-tap</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{methods: goNextPage}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>下一页<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
</li>
<li>
<p>组件的作用域是独立的，父组件通信通过 props 向其传递数据，分页组件通过 $emit 触发在父组件定义的事件实现和父组件的通信，因此预设从父组件获取到需显示的总数 num 为 30 , limit 为 5，当然你也可以随意设置这两个值～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let that
export default{
    data(){
      that = this
      return{
        num: 30,
        limit: 5
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">let</span> <span class="hljs-literal">that</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
      <span class="hljs-literal">that</span> = <span class="hljs-keyword">this</span>
      <span class="hljs-keyword">return</span>{
        num: <span class="hljs-number">30</span>,
        limit: <span class="hljs-number">5</span>
      }
    }
}</code></pre>
</li>
<li>
<p>计算几个变量，在这里可以使用 vue 的计算属性 computed</p>
<ul><li><p>总页数 totalPage 应该等于需显示的总数除以每页显示的个数，并向上取整。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    computed: {
      totalPage() {
        return Math.ceil(that.num / that.limit)
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    computed: {
      totalPage() {
<span class="hljs-built_in">        return</span> Math.ceil(<span class="hljs-keyword">that</span>.num / <span class="hljs-keyword">that</span>.limit)
      }
    }</code></pre>
<ul><li><p>偏移量 offset，因为点击上下页、制定页码均会改变 offset 变量，父组件也需要用到这个变量发送 ajax 请求，因此使用 vuex 存储 offset。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // pagination.vue
    computed: {
      offset() {
          return that.$store.state.offset
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>    // pagination.vue
    computed: {
      offset() {
          return that.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.offset
      }
    }</code></pre>
<ul><li><p>当前页面 currentPage，当前页面是比较重要的一个变量，显示用户当前所处页数，已知偏移量和每页显示数量可以得出当前页面是二者的余数向上取整，因为页数不从0开始，因此</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    computed: {
      currentPage() {
        return Math.ceil(that.offset / that.limit) + 1
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    computed: {
      currentPage() {
<span class="hljs-built_in">        return</span> Math.ceil(<span class="hljs-keyword">that</span>.<span class="hljs-built_in">offset</span> / <span class="hljs-keyword">that</span>.limit) + <span class="hljs-number">1</span>
      }
    }</code></pre>
<ul><li><p>是否显示上一页按钮 prePage，因为在首页的时候偏移量为0，因此只要偏移量不等于0则当前页面肯定不在第一页，则显示上一页按钮，并且 num 不等于 0。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    coumputed: {
      prePage() {
        return that.offset !== 0 &amp;&amp; that.num
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    coumputed: {
      prePage() {
<span class="hljs-built_in">        return</span> <span class="hljs-keyword">that</span>.<span class="hljs-built_in">offset</span> !== <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">that</span>.num
      }
    }</code></pre>
<ul><li><p>是否显示下一页按钮 nextPage，这个也很好理解，只要偏移量和每页显示的个数相加小于需显示的总数，则显示下一页按钮，并且 num 不等于 0。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    computed: {
      nextPage() {
        return (that.offset + that.limit < that.num) &amp;&amp; that.num
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    computed: {
      nextPage() {
<span class="hljs-built_in">        return</span> (<span class="hljs-keyword">that</span>.<span class="hljs-built_in">offset</span> + <span class="hljs-keyword">that</span>.limit &lt; <span class="hljs-keyword">that</span>.num) &amp;&amp; <span class="hljs-keyword">that</span>.num
      }
    }</code></pre>
<ul><li><p>页码计算 showPageBtn，页码计算是这个分页组件的核心内容，基本思路是当总页数不大于5时，显示全部页码；当总页数大于5时，始终显示首尾页码，当当前页码距首页小于2时，显示前三页页码和省略号；当当前页码距尾页小于2时，显示后三页页码，当当前页码距首页等于2时，显示前四页页码和省略号；当当前页码距尾页等于2时，显示后四页页码和省略号；当当前页码距首页大于3且距尾页大于3时，显示当前页码和当前页码的前一页和后一页，两边各有一个省略号；在这里我们使用0代表省略号</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    computed: {
      showPageBtn() {
          let pageNum = that.totalPage,
              index = that.currentPage,
              arr = []
          if (pageNum <= 5) {
            for(let i = 1; i <= pageNum; i++) {
              arr.push(i)
            }
            return arr
          }
          if (index <= 2) return [1,2,3,0,pageNum]
          if (index >= pageNum -1) return [1,0, pageNum -2, pageNum -1, pageNum]
          if (index === 3) return [1,2,3,4,0,pageNum]
          if (index === pageNum -2) return [1,0, pageNum-3, pageNum-2, pageNum-1, pageNum]
          return [1,0, index-1, index, index + 1, 0, pageNum]
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>    computed: {
      showPageBtn() {
          let pageNum = that.totalPage,
              <span class="hljs-keyword">index</span> = that.currentPage,
              arr = []
          <span class="hljs-keyword">if</span> (pageNum &lt;= <span class="hljs-number">5</span>) {
            <span class="hljs-keyword">for</span>(let i = <span class="hljs-number">1</span>; i &lt;= pageNum; i++) {
              arr.push(i)
            }
            <span class="hljs-keyword">return</span> arr
          }
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">index</span> &lt;= <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">0</span>,pageNum]
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">index</span> &gt;= pageNum <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>, pageNum <span class="hljs-number">-2</span>, pageNum <span class="hljs-number">-1</span>, pageNum]
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">index</span> === <span class="hljs-number">3</span>) <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">0</span>,pageNum]
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">index</span> === pageNum <span class="hljs-number">-2</span>) <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>, pageNum<span class="hljs-number">-3</span>, pageNum<span class="hljs-number">-2</span>, pageNum<span class="hljs-number">-1</span>, pageNum]
          <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>, <span class="hljs-keyword">index</span><span class="hljs-number">-1</span>, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">index</span> + <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, pageNum]
        }
    }</code></pre>
</li>
<li><p>跳转事件，分别点击上一页、下一页和指定页码。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    methods: {
      goPage(params) {
        if (params.i === 0 || params.i === that.currentPage) return
        that.$store.commit('GO_PAGE', (params.i-1) * that.limit)
        that.$emit('getNew')
      },
      goPrePage() {
        that.$store.commit('PRE_PAGE', that.limit)
        that.$emit('getNew')
      },
      goNextPage() {
        that.$store.commit('NEXT_PAGE', that.limit)
        that.$emit('getNew')
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>    methods: {
      goPage(<span class="hljs-keyword">params</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">params</span>.i === <span class="hljs-number">0</span> || <span class="hljs-keyword">params</span>.i === that.currentPage) <span class="hljs-keyword">return</span>
        that.$store.commit(<span class="hljs-string">'GO_PAGE'</span>, (<span class="hljs-keyword">params</span>.i<span class="hljs-number">-1</span>) * that.limit)
        that.$emit(<span class="hljs-string">'getNew'</span>)
      },
      goPrePage() {
        that.$store.commit(<span class="hljs-string">'PRE_PAGE'</span>, that.limit)
        that.$emit(<span class="hljs-string">'getNew'</span>)
      },
      goNextPage() {
        that.$store.commit(<span class="hljs-string">'NEXT_PAGE'</span>, that.limit)
        that.$emit(<span class="hljs-string">'getNew'</span>)
      }
    }</code></pre>
<h3 id="articleHeader4">vuex 部分</h3>
<ul>
<li>
<p>在此介绍一下 vuex 部分的实现，学习了二哲大大的 vuex 部分的结构。在 src 目录下（和 components 目录平级），新建 store 目录，其中 index.js 文件传入 mutation，初始化 vuex；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vuex store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
offset: 0
};

export default new Vuex.Store({
state,
mutations
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// vuex store/index.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>

Vue.use(Vuex);

<span class="hljs-keyword">const</span> state = {
<span class="hljs-attr">offset</span>: <span class="hljs-number">0</span>
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
state,
mutations
})</code></pre>
</li>
<li>
<p>mutation-types.js 记录所有的事件名，其实这个文件最大的好处是能让我们更直观地管理所有的 vuex 方法，它的优点会在项目复杂后凸显出来，项目复杂时我们可能会使用 vuex 存储很多数据、定义很多方法，这时 mutation-types.js 就能更好更直观地管理这些方法。这也是一种设计理念嘛，有利于后期维护。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mutation-types.js
export const PRE_PAGE = 'PRE_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const GO_PAGE = 'GO_PAGE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// mutation-types.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> PRE_PAGE = <span class="hljs-string">'PRE_PAGE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> NEXT_PAGE = <span class="hljs-string">'NEXT_PAGE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> GO_PAGE = <span class="hljs-string">'GO_PAGE'</span></code></pre>
</li>
<li>
<p>mutation.js 这是 vuex 的核心文件，注册了实现的所有事件，我们定义了点击上一页、下一页和跳转到指定页面的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mutation.js
import * as types from './mutation-types'

export default {
// 分页 上一页
[types.PRE_PAGE] (state, offset) {
  state.offset -= offset
},
// 分页 下一页
[types.NEXT_PAGE] (state, offset) {
  state.offset += offset
},
// 分页 跳转到指定页码
[types.GO_PAGE] (state, offset) {
  state.offset = offset
}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// mutation.js
import * as types <span class="hljs-keyword">from</span> './mutation-types'

export <span class="hljs-keyword">default</span> {
// 分页 上一页
[types.PRE_PAGE] (<span class="hljs-keyword">state</span>, offset) {
  <span class="hljs-keyword">state</span>.offset -= offset
},
// 分页 下一页
[types.NEXT_PAGE] (<span class="hljs-keyword">state</span>, offset) {
  <span class="hljs-keyword">state</span>.offset += offset
},
// 分页 跳转到指定页码
[types.GO_PAGE] (<span class="hljs-keyword">state</span>, offset) {
  <span class="hljs-keyword">state</span>.offset = offset
}
};</code></pre>
</li>
</ul>
<h3 id="articleHeader5">how to run</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install 

$ npm run dev

// 访问 http://localhost:8088/index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>npm install 

<span class="hljs-variable">$ </span>npm run dev

/<span class="hljs-regexp">/ 访问 http:/</span><span class="hljs-regexp">/localhost:8088/index</span>.html</code></pre>
<p>最后打个小广告? ๑乛◡乛๑<br>  我的个人网站：<a href="https://minemine.cc/" rel="nofollow noreferrer" target="_blank">https://minemine.cc/</a><br>  github 地址：<a href="https://github.com/luyilin" rel="nofollow noreferrer" target="_blank">https://github.com/luyilin</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 vue2.0 实现一个简洁的分页组件

## 原文链接
[https://segmentfault.com/a/1190000009126095](https://segmentfault.com/a/1190000009126095)

