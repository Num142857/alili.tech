---
title: '到底vuex是什么？' 
date: 2019-01-31 2:31:16
hidden: true
slug: p66a1uqbc7o
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">广告</h3>
<p>Vue.js小书已经出版，尤小右作序推荐：<a href="http://www.ituring.com.cn/book/1956" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>欢迎购买。<br>Swift iOS 小书 <a href="http://www.ituring.com.cn/book/2413" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a></p>
<h3 id="articleHeader1">正文</h3>
<p>关于vuex类的新闻最近很多，看到眼热就去查了下资料，然后扯出来一堆flux、redux、state、state之类的概念，以及大型工程必要性之类的。看官方手册也是昏昏然。</p>
<p>然而，我还是弄懂了!我准备从demo出发，以同样的一个最简单的demo，演示两种情况下的代码编写情况：</p>
<ol>
<li><p>单纯依赖于vue.js</p></li>
<li><p>依赖vue.js，也使用了vuex技术</p></li>
</ol>
<p>目的是通过对比引出vuex的概念、优势和劣势。也许这是目前最接地气的vuex的介绍吧：）。所以无论如何在了解vuex之前，你必须懂得vue.js(好像废话：）。现在开始。</p>
<p>假设一个微小的应用，有一个标签显示数字，两个按钮分别做数字的加一和减一的操作。用户界面看起来是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVFHAz?w=114&amp;h=29" src="https://static.alili.tech/img/bVFHAz?w=114&amp;h=29" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>使用vue的话，就是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div id=&quot;app&quot;>
  <p>"{{"count"}}"
    <button @click=&quot;inc&quot;>+</button>
    <button @click=&quot;dec&quot;>-</button>
  </p>
</div>
<script>
new Vue({
  el:'#app',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    inc () {
      this.count++
    },
    dec () {
      this.count--
    }
  }
})
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"count"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"inc"</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dec"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">new</span> Vue({
  el:<span class="hljs-string">'#app'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      count: <span class="hljs-number">0</span>
    }
  },
  methods: {
    inc () {
      <span class="hljs-keyword">this</span>.count++
    },
    dec () {
      <span class="hljs-keyword">this</span>.count--
    }
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>我写的代码代码可以直接拷贝到你的html内并且打开执行，你可以不费多余的劲儿，就把应用跑起来，按按按钮，看看界面上的反应是否如你预期。</p>
<p>整个代码结构非常清晰，代码是代码，数据是数据，这也是我一直以来非常喜欢vue.js的重要原因。代码就是放在methods数组内的两个函数inc、dec，被指令@click关联到button上。而data内返回一个属性count，此属性通过"{{"count"}}"绑定到标签p内。</p>
<p>现在来看看，同样的demo app，使用vuex完成的代码的样子，再一次，如下代码不是代码片段，是可以贴入到你的html文件内，并且直接使用浏览器打开运行的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<script src=&quot;https://unpkg.com/vuex@next&quot;></script>
<div id=&quot;app&quot;>
  <p>"{{"count"}}"
    <button @click=&quot;inc&quot;>+</button>
    <button @click=&quot;dec&quot;>-</button>
  </p>
</div>
<script>

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
      inc: state => state.count++,
    dec: state => state.count--
  }
})

const app = new Vue({
  el: '#app',
  computed: {
    count () {
        return store.state.count
    }
  },
  methods: {
    inc () {
      store.commit('inc')
    },
    dec () {
        store.commit('dec')
    }
  }
})
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vuex@next"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"count"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"inc"</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dec"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
  },
  <span class="hljs-attr">mutations</span>: {
      <span class="hljs-attr">inc</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.count++,
    <span class="hljs-attr">dec</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.count--
  }
})

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">computed</span>: {
    count () {
        <span class="hljs-keyword">return</span> store.state.count
    }
  },
  <span class="hljs-attr">methods</span>: {
    inc () {
      store.commit(<span class="hljs-string">'inc'</span>)
    },
    dec () {
        store.commit(<span class="hljs-string">'dec'</span>)
    }
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>我们先看到有哪些重要的变化：</p>
<ol>
<li><p>新的代码添加了对vuex@next脚本的依赖。这是当然的，因为你需要使用vuex的技术，当然需要引用它</p></li>
<li><p>methods数组还是这两个方法，这和demo1是一样的；但是方法内的计算逻辑，不再是在函数内进行，而是提交给store对象！这是一个新的对象！</p></li>
<li><p>count数据也不再是一个data函数返回的对象的属性；而是通过计算字段来返回，并且在计算字段内的代码也不是自己算的，而是转发给store对象。再一次store对象！</p></li>
</ol>
<p>就是说，之前在vue实例内做的操作和数据的计算现在都不再自己做了，而是交由对象store来做了。这突然让我想到就先餐厅现在都不在洗碗了，都交给政府认证的机构来洗了。</p>
<p>说回正题。store对象是Vuex.Store的实例。在store内有分为state对象和mutations对象，其中的state放置<code>状态</code>,mutations则是一个会引发状态改变的所有方法。正如我们看到的，目前的state对象，其中的状态就只有一个count。而mutations有两个成员，它们参数为state，在函数体内对state内的count成员做加1和减1的操作。</p>
<p>活还是那些活，现在引入了一个store对象，把数据更新的活给揽过去，不再需要vue实例自己计算了，代价是引入了新的概念和层次。那么好处是什么（一个土耳其古老的发问）？</p>
<p>vuex解决了组件之间共享同一状态的麻烦问题。当我们的应用遇到多个组件共享状态时，会需要：</p>
<ol>
<li><p>多个组件依赖于同一状态。传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。这需要你去学习下，vue编码中多个组件之间的通讯的做法。</p></li>
<li><p>来自不同组件的行为需要变更同一状态。我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。</p></li>
</ol>
<p>以上的这些模式非常脆弱，通常会导致无法维护的代码。来自官网的一句话：<code>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态</code>。这里的关键在于<code>集中式存储管理</code>。这意味着本来需要共享状态的更新是需要组件之间通讯的，而现在有了vuex，就组件就都和store通讯了。问题就自然解决了。</p>
<p>这就是为什么官网再次会提到Vuex构建大型应用的价值。<code>如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex</code>。</p>
<h2 id="articleHeader2">关于</h2>
<p>作者：刘传君</p>
<p>创建过产品，创过业。好读书，求甚解。<br>可以通过 1000copy#gmail.com 联系到我</p>
<h2 id="articleHeader3">出品</h2>
<p>bootstrap小书 <a href="https://www.gitbook.com/book/1000copy/bootstrap/details" rel="nofollow noreferrer" target="_blank">https://www.gitbook.com/book/...</a><br>http小书 <a href="http://www.ituring.com.cn/book/1791" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>Git小书  <a href="http://www.ituring.com.cn/book/1870" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>Vue.js小书 <a href="http://www.ituring.com.cn/book/1956" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
到底vuex是什么？

## 原文链接
[https://segmentfault.com/a/1190000007516967](https://segmentfault.com/a/1190000007516967)

