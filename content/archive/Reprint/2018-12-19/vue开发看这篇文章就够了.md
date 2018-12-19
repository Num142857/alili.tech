---
title: 'vue开发看这篇文章就够了' 
date: 2018-12-19 2:30:07
hidden: true
slug: y1cmlzfr52
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue -渐进式JavaScript框架</h1>
<h2 id="articleHeader1">介绍</h2>
<ul>
<li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue 中文网</a></li>
<li><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue github</a></li>
<li>Vue.js 是一套构建用户界面(UI)的渐进式JavaScript框架</li>
</ul>
<h2 id="articleHeader2">库和框架的区别</h2>
<ul><li><a href="https://zhuanlan.zhihu.com/p/26078359?group_id=830801800406917120" rel="nofollow noreferrer" target="_blank">我们所说的前端框架与库的区别？</a></li></ul>
<h3 id="articleHeader3">Library</h3>
<blockquote>库，本质上是一些函数的集合。每次调用函数，实现一个特定的功能，接着把<code>控制权</code>交给使用者</blockquote>
<ul>
<li>代表：jQuery</li>
<li>jQuery这个库的核心：DOM操作，即：封装DOM操作，简化DOM操作</li>
</ul>
<h3 id="articleHeader4">Framework</h3>
<blockquote>框架，是一套完整的解决方案，使用框架的时候，需要把你的代码放到框架合适的地方，框架会在合适的时机调用你的代码</blockquote>
<ul>
<li>框架规定了自己的编程方式，是一套完整的解决方案</li>
<li>使用框架的时候，由框架控制一切，我们只需要按照规则写代码</li>
</ul>
<h3 id="articleHeader5">主要区别</h3>
<ul>
<li>You call Library, Framework calls you</li>
<li>
<p>核心点：谁起到主导作用（控制反转）</p>
<ul>
<li>框架中控制整个流程的是框架</li>
<li>使用库，由开发人员决定如何调用库中提供的方法（辅助）</li>
</ul>
</li>
<li>好莱坞原则：Don't call us, we'll call you.</li>
<li>框架的侵入性很高（从头到尾）</li>
</ul>
<h2 id="articleHeader6">MVVM的介绍</h2>
<ul>
<li>MVVM，一种更好的UI模式解决方案</li>
<li><a href="http://www.cnblogs.com/indream/p/3602348.html" rel="nofollow noreferrer" target="_blank">从Script到Code Blocks、Code Behind到MVC、MVP、MVVM - 科普</a></li>
</ul>
<h3 id="articleHeader7">MVC</h3>
<ul>
<li>M: Model 数据模型（专门用来操作数据，数据的CRUD）</li>
<li>V：View 视图（对于前端来说，就是页面）</li>
<li>C：Controller 控制器（是视图和数据模型沟通的桥梁，用于处理业务逻辑）</li>
</ul>
<h3 id="articleHeader8">MVVM组成</h3>
<ul>
<li>MVVM ===&gt; M / V / VM</li>
<li>M：model数据模型</li>
<li>V：view视图</li>
<li>VM：ViewModel 视图模型</li>
</ul>
<h3 id="articleHeader9">优势对比</h3>
<ul>
<li>MVC模式，将应用程序划分为三大部分，实现了职责分离</li>
<li>在前端中经常要通过 JS代码 来进行一些逻辑操作，最终还要把这些逻辑操作的结果现在页面中。也就是需要频繁的操作DOM</li>
<li>
<p>MVVM通过<code>数据双向绑定</code>让数据自动地双向同步</p>
<ul>
<li>V（修改数据） -&gt; M</li>
<li>M（修改数据） -&gt; V</li>
<li>数据是核心</li>
</ul>
</li>
<li>Vue这种MVVM模式的框架，不推荐开发人员手动操作DOM</li>
</ul>
<h3 id="articleHeader10">Vue中的MVVM</h3>
<blockquote>虽然没有完全遵循 MVVM 模型，Vue 的设计无疑受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的简称) 这个变量名表示 Vue 实例</blockquote>
<h3 id="articleHeader11">学习Vue要转化思想</h3>
<ul><li>不要在想着怎么操作DOM，而是想着如何操作数据！！！</li></ul>
<h2 id="articleHeader12">起步 - Hello Vue</h2>
<ul><li>安装：<code>npm i -S vue</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 指定vue管理内容区域，需要通过vue展示的内容都要放到找个元素中  通常我们也把它叫做边界 数据只在边界内部解析-->
<div id=&quot;app&quot;>"{{" msg "}}"</div>

<!-- 引入 vue.js -->
<script src=&quot;vue.js&quot;></script>

<!-- 使用 vue -->
<script>
  var vm = new Vue({
    // el：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标
    el: '#app',
    // Vue 实例的数据对象，用于给 View 提供数据
    data: {
      msg: 'Hello Vue'
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 指定vue管理内容区域，需要通过vue展示的内容都要放到找个元素中  通常我们也把它叫做边界 数据只在边界内部解析--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 引入 vue.js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 使用 vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// el：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标</span>
    el: <span class="hljs-string">'#app'</span>,
    <span class="hljs-comment">// Vue 实例的数据对象，用于给 View 提供数据</span>
    data: {
      msg: <span class="hljs-string">'Hello Vue'</span>
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader13">Vue实例</h3>
<ul>
<li>注意 1：<strong>先在data中声明数据，再使用数据</strong>
</li>
<li>注意 2：可以通过 <code>vm.$data</code> 访问到data中的所有属性，或者 <code>vm.msg</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: {
    msg: '大家好，...'
  }
})

vm.$data.msg === vm.msg // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">msg</span>: <span class="hljs-string">'大家好，...'</span>
  }
})

vm.$data.msg === vm.msg <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader14">数据绑定</h3>
<ul>
<li>最常用的方式：<code>Mustache(插值语法)</code>，也就是 <code>"{{""}}"</code> 语法</li>
<li>解释：<code>"{{""}}"</code>从数据对象<code>data</code>中获取数据</li>
<li>说明：数据对象的属性值发生了改变，插值处的内容都会更新</li>
<li>说明：<code>"{{""}}"</code>中只能出现JavaScript表达式 而不能解析js语句</li>
<li>注意：<strong>Mustache 语法不能作用在 HTML 元素的属性上</strong>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>Hello, "{{" msg "}}".</h1>
<p>"{{" 1 + 2 "}}"</p>
<p>"{{" isOk ? 'yes': 'no' "}}"</p>

<!-- ！！！错误示范！！！ -->
<h1 title=&quot;"{{" err "}}"&quot;></h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, "{{" msg "}}".<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" 1 + 2 "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" isOk ? 'yes': 'no' "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ！！！错误示范！！！ --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">title</span>=<span class="hljs-string">""{{" err "}}""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<h2 id="articleHeader15">双向数据绑定 Vue two way data binding</h2>
<ul>
<li>
<p>双向数据绑定：将DOM与Vue实例的data数据绑定到一起，彼此之间相互影响</p>
<ul>
<li>数据的改变会引起DOM的改变</li>
<li>DOM的改变也会引起数据的变化</li>
</ul>
</li>
<li>
<p>原理：<code>Object.defineProperty</code>中的<code>get</code>和<code>set</code>方法</p>
<ul>
<li>
<code>getter</code>和<code>setter</code>：访问器</li>
<li>作用：指定<code>读取或设置</code>对象属性值的时候，执行的操作</li>
</ul>
</li>
<li><a href="https://cn.vuejs.org/v2/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">Vue - 深入响应式原理</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">MDN - Object.defineProperty()</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*  defineProperty语法 介绍 */
var obj = {}
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg = &quot;1&quot; 时set方法会被系统调用 参数分别是设置后和设置前的值
  set: function (newVal, oldVal) {  },
  // 读取 obj.msg 时get方法会被系统调用
  get: function ( newVal, oldVal ) {}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*  defineProperty语法 介绍 */</span>
<span class="hljs-keyword">var</span> obj = {}
<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'msg'</span>, {
  <span class="hljs-comment">// 设置 obj.msg = "1" 时set方法会被系统调用 参数分别是设置后和设置前的值</span>
  set: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal, oldVal</span>) </span>{  },
  <span class="hljs-comment">// 读取 obj.msg 时get方法会被系统调用</span>
  get: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> newVal, oldVal </span>) </span>{}
})</code></pre>
<h3 id="articleHeader16">Vue双向绑定的极简实现</h3>
<ul><li><a href="https://segmentfault.com/a/1190000006599500">剖析Vue原理&amp;实现双向绑定MVVM</a></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 示例 -->
<input type=&quot;text&quot; id=&quot;txt&quot; />
<span id=&quot;sp&quot;></span>

<script>
var txt = document.getElementById('txt'),
    sp = document.getElementById('sp'),
    obj = {}

// 给对象obj添加msg属性，并设置setter访问器
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg  当obj.msg反生改变时set方法将会被调用  
  set: function (newVal) {
    // 当obj.msg被赋值时 同时设置给 input/span
    txt.value = newVal
    sp.innerText = newVal
  }
})

// 监听文本框的改变 当文本框输入内容时 改变obj.msg
txt.addEventListener('keyup', function (event) {
  obj.msg = event.target.value
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 示例 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"txt"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sp"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> txt = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'txt'</span>),
    sp = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'sp'</span>),
    obj = {}

<span class="hljs-comment">// 给对象obj添加msg属性，并设置setter访问器</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">'msg'</span>, {
  <span class="hljs-comment">// 设置 obj.msg  当obj.msg反生改变时set方法将会被调用  </span>
  set: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
    <span class="hljs-comment">// 当obj.msg被赋值时 同时设置给 input/span</span>
    txt.value = newVal
    sp.innerText = newVal
  }
})

<span class="hljs-comment">// 监听文本框的改变 当文本框输入内容时 改变obj.msg</span>
txt.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  obj.msg = event.target.value
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader17">动态添加数据的注意点</h3>
<ul>
<li>注意：只有<code>data</code>中的数据才是响应式的，动态添加进来的数据默认为非响应式</li>
<li>
<p>可以通过以下方式实现动态添加数据的响应式</p>
<ul>
<li>1 <code>Vue.set(object, key, value)</code> - 适用于添加单个属性</li>
<li>2 <code>Object.assign()</code> - 适用于添加多个属性</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: {
    stu: {
      name: 'jack',
      age: 19
    }
  }
})

/* Vue.set */
Vue.set(vm.stu, 'gender', 'male')

/* Object.assign 将参数中的所有对象属性和值 合并到第一个参数 并返回合并后的对象*/
vm.stu = Object.assign({}, vm.stu, { gender: 'female', height: 180 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">stu</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'jack'</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-number">19</span>
    }
  }
})

<span class="hljs-comment">/* Vue.set */</span>
Vue.set(vm.stu, <span class="hljs-string">'gender'</span>, <span class="hljs-string">'male'</span>)

<span class="hljs-comment">/* Object.assign 将参数中的所有对象属性和值 合并到第一个参数 并返回合并后的对象*/</span>
vm.stu = <span class="hljs-built_in">Object</span>.assign({}, vm.stu, { <span class="hljs-attr">gender</span>: <span class="hljs-string">'female'</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">180</span> })</code></pre>
<h3 id="articleHeader18">异步DOM更新</h3>
<ul>
<li>说明：Vue 异步执行 DOM 更新，监视所有数据改变，一次性更新DOM</li>
<li>优势：可以去除重复数据，对于避免不必要的计算和 避免重复 DOM 操作上，非常重要</li>
<li>
<p>如果需要那到更新后dom中的数据 则需要通过 <code>Vue.nextTick(callback)</code>：在DOM更新后，执行某个操作（属于DOM操作）</p>
<ul><li>实例调用<code>vm.$nextTick(function () {})</code>
</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  fn() {
    this.msg = 'change'
    this.$nextTick(function () {
      console.log('$nextTick中打印：', this.$el.children[0].innerText);
    })
    console.log('直接打印：', this.$el.children[0].innerText);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">methods: {
  fn() {
    <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">'change'</span>
    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'$nextTick中打印：'</span>, <span class="hljs-keyword">this</span>.$el.children[<span class="hljs-number">0</span>].innerText);
    })
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'直接打印：'</span>, <span class="hljs-keyword">this</span>.$el.children[<span class="hljs-number">0</span>].innerText);
  }
}</code></pre>
<h2 id="articleHeader19">指令</h2>
<ul>
<li>解释：指令 (Directives) 是带有 <code>v-</code> 前缀的特殊属性</li>
<li>作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM</li>
</ul>
<h3 id="articleHeader20">v-text</h3>
<ul><li>解释：更新DOM对象的 textContent</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1 v-text=&quot;msg&quot;></h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<h3 id="articleHeader21">v-html</h3>
<ul><li>解释：更新DOM对象的 innerHTML</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1 v-html=&quot;msg&quot;></h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></code></pre>
<h3 id="articleHeader22">v-bind</h3>
<ul>
<li>作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM</li>
<li>语法：<code>v-bind:title="msg"</code>
</li>
<li>简写：<code>:title="msg"</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 完整语法 -->
<a v-bind:href=&quot;url&quot;></a>
<!-- 缩写 -->
<a :href=&quot;url&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 完整语法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-bind:href</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 缩写 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h3 id="articleHeader23">v-on</h3>
<ul>
<li>作用：绑定事件</li>
<li>语法：<code>v-on:click="say"</code> or <code>v-on:click="say('参数', $event)"</code>
</li>
<li>简写：<code>@click="say"</code>
</li>
<li>说明：绑定的事件定义在<code>methods</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 完整语法 -->
<a v-on:click=&quot;doSomething&quot;></a>
<!-- 缩写 -->
<a @click=&quot;doSomething&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 完整语法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"doSomething"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 缩写 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"doSomething"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h3 id="articleHeader24">事件修饰符</h3>
<ul>
<li>
<code>.stop</code>       阻止冒泡，调用 event.stopPropagation()</li>
<li>
<code>.prevent</code>    阻止默认行为，调用 event.preventDefault()</li>
<li>
<code>.capture</code>    添加事件侦听器时使用事件<code>捕获</code>模式</li>
<li>
<code>.self</code>       只当事件在该元素本身（比如不是子元素）触发时，才会触发事件</li>
<li>
<code>.once</code>       事件只触发一次</li>
</ul>
<h3 id="articleHeader25">v-model</h3>
<ul>
<li>作用：在表单元素上创建双向数据绑定</li>
<li>说明：监听用户的输入事件以更新数据</li>
<li>案例：计算器</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; v-model=&quot;message&quot; placeholder=&quot;edit me&quot;>
<p>Message is: "{{" message "}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"message"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"edit me"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Message is: "{{" message "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<h3 id="articleHeader26">v-for</h3>
<ul><li>作用：基于源数据多次渲染元素或模板块</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 1 基础用法 -->
<div v-for=&quot;item in items&quot;>
  "{{" item.text "}}"
</div>

<!-- item 为当前项，index 为索引 -->
<p v-for=&quot;(item, index) in list&quot;>"{{"item"}}" -- "{{"index"}}"</p>
<!-- item 为值，key 为键，index 为索引 -->
<p v-for=&quot;(item, key, index) in obj&quot;>"{{"item"}}" -- "{{"key"}}"</p>
<p v-for=&quot;item in 10&quot;>"{{"item"}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 1 基础用法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>
  "{{" item.text "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- item 为当前项，index 为索引 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in list"</span>&gt;</span>"{{"item"}}" -- "{{"index"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!-- item 为值，key 为键，index 为索引 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, key, index) in obj"</span>&gt;</span>"{{"item"}}" -- "{{"key"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in 10"</span>&gt;</span>"{{"item"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<h3 id="articleHeader27">key属性</h3>
<ul>
<li>推荐：使用 <code>v-for</code> 的时候提供 <code>key</code> 属性，以获得性能提升。</li>
<li>说明：使用 key，VUE会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。</li>
<li><a href="https://cn.vuejs.org/v2/guide/list.html#key" rel="nofollow noreferrer" target="_blank">vue key</a></li>
<li><a href="https://www.zhihu.com/question/61064119/answer/183717717" rel="nofollow noreferrer" target="_blank">vue key属性的说明</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-for=&quot;item in items&quot; :key=&quot;item.id&quot;>
  <!-- 内容 -->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 内容 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader28">样式处理 -class和style</h2>
<ul>
<li>使用方式：<code>v-bind:class="expression"</code> or <code>:class="expression"</code>
</li>
<li>表达式的类型：字符串、数组、对象（重点）</li>
<li>语法：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 1 -->
<div v-bind:class=&quot;{ active: true }&quot;></div> ===> 解析后
<div class=&quot;active&quot;></div>

<!-- 2 -->
<div :class=&quot;['active', 'text-danger']&quot;></div> ===>解析后
<div class=&quot;active text-danger&quot;></div>

<!-- 3 -->
<div v-bind:class=&quot;[{ active: true }, errorClass]&quot;></div> ===>解析后
<div class=&quot;active text-danger&quot;></div>


--- style ---
<!-- 1 -->
<div v-bind:style=&quot;{ color: activeColor, 'font-size': fontSize + 'px' }&quot;></div>
<!-- 2 将多个 样式对象 应用到一个元素上-->
<!-- baseStyles 和 overridingStyles 都是data中定义的对象 -->
<div v-bind:style=&quot;[baseStyles, overridingStyles]&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 1 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:class</span>=<span class="hljs-string">"{ active: true }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> ===&gt; 解析后
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 2 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"['active', 'text-danger']"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> ===&gt;解析后
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active text-danger"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 3 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:class</span>=<span class="hljs-string">"[{ active: true }, errorClass]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> ===&gt;解析后
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active text-danger"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


--- style ---
<span class="hljs-comment">&lt;!-- 1 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"{ color: activeColor, 'font-size': fontSize + 'px' }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 2 将多个 样式对象 应用到一个元素上--&gt;</span>
<span class="hljs-comment">&lt;!-- baseStyles 和 overridingStyles 都是data中定义的对象 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"[baseStyles, overridingStyles]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader29">v-if 和 v-show</h3>
<ul>
<li><a href="https://cn.vuejs.org/v2/guide/conditional.html" rel="nofollow noreferrer" target="_blank">条件渲染</a></li>
<li>
<code>v-if</code>：根据表达式的值的真假条件，销毁或重建元素</li>
<li>
<code>v-show</code>：根据表达式之真假值，切换元素的 display CSS 属性</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-show=&quot;isShow&quot;>这个元素展示出来了吗？？？</p>
<p v-if=&quot;isShow&quot;>这个元素，在HTML结构中吗？？？</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShow"</span>&gt;</span>这个元素展示出来了吗？？？<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isShow"</span>&gt;</span>这个元素，在HTML结构中吗？？？<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<h3 id="articleHeader30">提升性能：v-pre</h3>
<ul><li>说明：vue会跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-pre>"{{" this will not be compiled "}}"</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-pre</span>&gt;</span>"{{" this will not be compiled "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h3 id="articleHeader31">提升性能：v-once</h3>
<ul><li>说明：vue只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-once>This will never change: "{{"msg"}}"</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-once</span>&gt;</span>This will never change: "{{"msg"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h2 id="articleHeader32">过滤器 filter</h2>
<ul>
<li>作用：文本数据格式化</li>
<li>过滤器可以用在两个地方：<code>"{{""}}"</code>和 v-bind 表达式</li>
<li>两种过滤器：1 全局过滤器 2 局部过滤器</li>
</ul>
<h3 id="articleHeader33">全局过滤器</h3>
<ul>
<li>说明：通过全局方式创建的过滤器，在任何一个vue实例中都可以使用</li>
<li>注意：使用全局过滤器的时候，需要先创建全局过滤器，再创建Vue实例</li>
<li>显示的内容由过滤器的返回值决定</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.filter('filterName', function (value) {
  // value 表示要过滤的内容
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.filter(<span class="hljs-string">'filterName'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// value 表示要过滤的内容</span>
})</code></pre>
<ul><li>示例：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>"{{" dateStr | date "}}"</div>
<div>"{{" dateStr | date('YYYY-MM-DD hh:mm:ss') "}}"</div>

<script>
  Vue.filter('date', function(value, format) {
    // value 要过滤的字符串内容，比如：dateStr
    // format 过滤器的参数，比如：'YYYY-MM-DD hh:mm:ss'
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" dateStr | date "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" dateStr | date('YYYY-MM-DD hh:mm:ss') "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  Vue.filter(<span class="hljs-string">'date'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, format)</span> </span>{
    <span class="hljs-comment">// value 要过滤的字符串内容，比如：dateStr</span>
    <span class="hljs-comment">// format 过滤器的参数，比如：'YYYY-MM-DD hh:mm:ss'</span>
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader34">局部过滤器</h3>
<ul><li>说明：局部过滤器是在某一个vue实例的内容创建的，只在当前实例中起作用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  data: {},
  // 通过 filters 属性创建局部过滤器
  // 注意：此处为 filters
  filters: {
    filterName: function(value, format) {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">data</span>: {},
  <span class="hljs-comment">// 通过 filters 属性创建局部过滤器</span>
  <span class="hljs-comment">// 注意：此处为 filters</span>
  filters: {
    <span class="hljs-attr">filterName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, format</span>) </span>{}
  }
}</code></pre>
<h2 id="articleHeader35">按键值修饰符</h2>
<ul>
<li>说明：在监听键盘事件时，Vue 允许为 <code>v-on</code> 在监听键盘事件时添加关键修饰符</li>
<li><a href="https://cn.vuejs.org/v2/guide/events.html#" rel="nofollow noreferrer" target="_blank">键盘事件 - 键值修饰符</a></li>
<li>其他：修饰键（.ctrl等）、鼠标按键修饰符（.left等）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只有在 keyCode 是 13 时调用 vm.submit()
@keyup.13=&quot;submit&quot;
// 使用全局按键别名
@keyup.enter=&quot;add&quot;

---

// 通过全局 config.keyCodes 对象自定义键值修饰符别名
Vue.config.keyCodes.f2 = 113
// 使用自定义键值修饰符
@keyup.enter.f2=&quot;add&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 只有在 keyCode 是 13 时调用 vm.submit()</span>
@keyup<span class="hljs-number">.13</span>=<span class="hljs-string">"submit"</span>
<span class="hljs-comment">// 使用全局按键别名</span>
@keyup.enter=<span class="hljs-string">"add"</span>

---

<span class="hljs-comment">// 通过全局 config.keyCodes 对象自定义键值修饰符别名</span>
Vue.config.keyCodes.f2 = <span class="hljs-number">113</span>
<span class="hljs-comment">// 使用自定义键值修饰符</span>
@keyup.enter.f2=<span class="hljs-string">"add"</span></code></pre>
<h2 id="articleHeader36">监视数据变化 - watch</h2>
<ul>
<li>概述：<code>watch</code>是一个对象，键是需要观察的表达式，值是对应回调函数</li>
<li>作用：当表达式的值发生变化后，会调用对应的回调函数完成响应的监视操作</li>
<li><a href="https://cn.vuejs.org/v2/api/#vm-watch" rel="nofollow noreferrer" target="_blank">VUE $watch</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  data: { a: 1, b: { age: 10 } },
  watch: {
    a: function(val, oldVal) {
      // val 表示当前值
      // oldVal 表示旧值
      console.log('当前值为：' + val, '旧值为：' + oldVal)
    },

    // 监听对象属性的变化
    b: {
      handler: function (val, oldVal) { /* ... */ },
      // deep : true表示是否监听对象内部属性值的变化 
      deep: true
    },

    // 只监视user对象中age属性的变化
    'user.age': function (val, oldVal) {
    },
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: { <span class="hljs-attr">age</span>: <span class="hljs-number">10</span> } },
  <span class="hljs-attr">watch</span>: {
    <span class="hljs-attr">a</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, oldVal</span>) </span>{
      <span class="hljs-comment">// val 表示当前值</span>
      <span class="hljs-comment">// oldVal 表示旧值</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'当前值为：'</span> + val, <span class="hljs-string">'旧值为：'</span> + oldVal)
    },

    <span class="hljs-comment">// 监听对象属性的变化</span>
    b: {
      <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val, oldVal</span>) </span>{ <span class="hljs-comment">/* ... */</span> },
      <span class="hljs-comment">// deep : true表示是否监听对象内部属性值的变化 </span>
      deep: <span class="hljs-literal">true</span>
    },

    <span class="hljs-comment">// 只监视user对象中age属性的变化</span>
    <span class="hljs-string">'user.age'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val, oldVal</span>) </span>{
    },
  }
})</code></pre>
<h2 id="articleHeader37">计算属性</h2>
<ul>
<li>说明：计算属性是基于它们的依赖进行缓存的，只有在它的依赖发生改变时才会重新求值</li>
<li>注意：Mustache语法（"{{""}}"）中不要放入太多的逻辑，否则会让模板过重、难以理解和维护</li>
<li>注意：<strong><code>computed</code>中的属性不能与<code>data</code>中的属性同名，否则会报错</strong>
</li>
<li><a href="http://www.cnblogs.com/kidney/p/7384835.html?utm_source=debugrun&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">Vue computed属性原理</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#app',
  data: {
    firstname: 'jack',
    lastname: 'rose'
  },
  computed: {
    fullname() {
      return this.firstname + '.' + this.lastname
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">firstname</span>: <span class="hljs-string">'jack'</span>,
    <span class="hljs-attr">lastname</span>: <span class="hljs-string">'rose'</span>
  },
  <span class="hljs-attr">computed</span>: {
    fullname() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstname + <span class="hljs-string">'.'</span> + <span class="hljs-keyword">this</span>.lastname
    }
  }
})</code></pre>
<h2 id="articleHeader38">实例生命周期</h2>
<ul>
<li>所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象即可 (一些根实例特有的选项除外)。</li>
<li>实例生命周期也叫做：组件生命周期</li>
</ul>
<h3 id="articleHeader39">生命周期介绍</h3>
<ul>
<li><a href="https://cn.vuejs.org/v2/api/#" rel="nofollow noreferrer" target="_blank">vue生命周期钩子函数</a></li>
<li>简单说：<strong>一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期</strong>
</li>
</ul>
<p>生命周期钩子函数的定义：从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，这些事件，统称为组件的生命周期函数！</p>
<ul>
<li>注意：Vue在执行过程中会自动调用<code>生命周期钩子函数</code>，我们只需要提供这些钩子函数即可</li>
<li>注意：钩子函数的名称都是Vue中规定好的！</li>
</ul>
<h3 id="articleHeader40">钩子函数 - beforeCreate()</h3>
<ul>
<li>说明：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用</li>
<li>注意：此时，无法获取 data中的数据、methods中的方法</li>
</ul>
<h3 id="articleHeader41">钩子函数 - <strong>created()</strong>
</h3>
<ul>
<li>注意：这是一个常用的生命周期，可以调用methods中的方法、改变data中的数据</li>
<li><a href="https://segmentfault.com/a/1190000008879966">vue实例生命周期 参考1</a></li>
<li><a href="https://segmentfault.com/a/1190000008010666" target="_blank">vue实例生命周期 参考2</a></li>
<li>使用场景：发送请求获取数据</li>
</ul>
<h3 id="articleHeader42">钩子函数 - beforeMounted()</h3>
<ul><li>说明：在挂载开始之前被调用</li></ul>
<h3 id="articleHeader43">钩子函数 - <strong>mounted()</strong>
</h3>
<ul><li>说明：此时，vue实例已经挂载到页面中，可以获取到el中的DOM元素，进行DOM操作</li></ul>
<h3 id="articleHeader44">钩子函数 - beforeUpdated()</h3>
<ul>
<li>说明：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。</li>
<li>注意：此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的</li>
</ul>
<h3 id="articleHeader45">钩子函数 - updated()</h3>
<ul><li>说明：组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。</li></ul>
<h3 id="articleHeader46">钩子函数 - beforeDestroy()</h3>
<ul>
<li>说明：实例销毁之前调用。在这一步，实例仍然完全可用。</li>
<li>使用场景：实例销毁之前，执行清理任务，比如：清除定时器等</li>
</ul>
<h3 id="articleHeader47">钩子函数 - destroyed()</h3>
<ul><li>说明：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</li></ul>
<h2 id="articleHeader48">axios</h2>
<ul>
<li>
<p>Promise based HTTP client for the browser and node.js</p>
<ul>
<li>以Promise为基础的HTTP客户端，适用于：浏览器和node.js</li>
<li>封装ajax，用来发送请求，异步获取数据</li>
</ul>
</li>
<li>安装：<code>npm i -S axios</code>
</li>
<li><a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">axios</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在浏览器中使用，直接引入js文件使用下面的GET/POST请求方式即可
// 1 引入 axios.js
// 2 直接调用axios提供的API发送请求
created: function () {
  axios.get(url)
    .then(function(resp) {})
}

---
// 配合 webpack 使用方式如下：
import Vue from 'vue'
import axios from 'axios'
// 将 axios 添加到 Vue.prototype 中
Vue.prototype.$axios = axios

---
// 在组件中使用：
methods: {
  getData() {
    this.$axios.get('url')
      .then(res => {})
      .catch(err => {})
  }
}

---
// API使用方式：

axios.get(url[, config])
axios.post(url[, data[, config]])
axios(url[, config])
axios(config)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在浏览器中使用，直接引入js文件使用下面的GET/POST请求方式即可</span>
<span class="hljs-comment">// 1 引入 axios.js</span>
<span class="hljs-comment">// 2 直接调用axios提供的API发送请求</span>
created: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  axios.get(url)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resp</span>) </span>{})
}

---
<span class="hljs-comment">// 配合 webpack 使用方式如下：</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-comment">// 将 axios 添加到 Vue.prototype 中</span>
Vue.prototype.$axios = axios

---
<span class="hljs-comment">// 在组件中使用：</span>
methods: {
  getData() {
    <span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'url'</span>)
      .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {})
      .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {})
  }
}

---
<span class="hljs-comment">// API使用方式：</span>

axios.get(url[, config])
axios.post(url[, data[, config]])
axios(url[, config])
axios(config)</code></pre>
<h3 id="articleHeader49">Get 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const url = 'http://vue.studyit.io/api/getnewslist'

// url中带有query参数
axios.get('/user?id=89')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// url和参数分离，使用对象
axios.get('/user', {
  params: {
    id: 12345
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> url = <span class="hljs-string">'http://vue.studyit.io/api/getnewslist'</span>

<span class="hljs-comment">// url中带有query参数</span>
axios.get(<span class="hljs-string">'/user?id=89'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(response);
  })
  .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
  });

<span class="hljs-comment">// url和参数分离，使用对象</span>
axios.get(<span class="hljs-string">'/user'</span>, {
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-number">12345</span>
  }
})</code></pre>
<h3 id="articleHeader50">Post 请求</h3>
<ul>
<li><a href="https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format" rel="nofollow noreferrer" target="_blank">不同环境中处理 POST请求</a></li>
<li>默认情况下，axios 会将JS对象序列化为JSON对象。为了使用 <code>application/x-www-form-urlencoded</code> 格式发送请求，我们可以这样：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 qs 包，处理将对象序列化为字符串
// npm i -S qs
// var qs = require('qs')
import qs from 'qs'
qs.stringify({ 'bar': 123 }) ===> &quot;bar=123&quot;
axios.post('/foo', qs.stringify({ 'bar': 123 }))

// 或者：
axios.post('/foo', 'bar=123&amp;age=19')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用 qs 包，处理将对象序列化为字符串</span>
<span class="hljs-comment">// npm i -S qs</span>
<span class="hljs-comment">// var qs = require('qs')</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>
qs.stringify({ <span class="hljs-string">'bar'</span>: <span class="hljs-number">123</span> }) ===&gt; <span class="hljs-string">"bar=123"</span>
axios.post(<span class="hljs-string">'/foo'</span>, qs.stringify({ <span class="hljs-string">'bar'</span>: <span class="hljs-number">123</span> }))

<span class="hljs-comment">// 或者：</span>
axios.post(<span class="hljs-string">'/foo'</span>, <span class="hljs-string">'bar=123&amp;age=19'</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const url = 'http://vue.studyit.io/api/postcomment/17'
axios.post(url, 'content=点个赞不过份')

axios.post('/user', qs.stringify({
    firstName: 'Fred',
    lastName: 'Flintstone'
  }))
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> url = <span class="hljs-string">'http://vue.studyit.io/api/postcomment/17'</span>
axios.post(url, <span class="hljs-string">'content=点个赞不过份'</span>)

axios.post(<span class="hljs-string">'/user'</span>, qs.stringify({
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Fred'</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">'Flintstone'</span>
  }))
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(response);
  })
  .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
  });</code></pre>
<h3 id="articleHeader51">全局配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置请求公共路径：
axios.defaults.baseURL = 'http://vue.studyit.io'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 设置请求公共路径：</span>
axios.defaults.baseURL = <span class="hljs-string">'http://vue.studyit.io'</span></code></pre>
<h3 id="articleHeader52">拦截器</h3>
<ul><li>拦截器会拦截发送的每一个请求，请求发送之前执行<code>request</code>中的函数，请求发送完成之后执行<code>response</code>中的函数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 所有请求之前都要执行的操作

    return config;
  }, function (error) {
    // 错误处理

    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 所有请求完成后都要执行的操作

    return response;
  }, function (error) {
    // 错误处理
    return Promise.reject(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
    <span class="hljs-comment">// 所有请求之前都要执行的操作</span>

    <span class="hljs-keyword">return</span> config;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 错误处理</span>

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });

<span class="hljs-comment">// 响应拦截器</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// 所有请求完成后都要执行的操作</span>

    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 错误处理</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });</code></pre>
<h2 id="articleHeader53">自定义指令</h2>
<ul>
<li>作用：进行DOM操作</li>
<li>使用场景：对纯 DOM 元素进行底层操作，比如：文本框获得焦点</li>
<li><a href="https://juejin.im/entry/58b7c5d8ac502e006cfee34a" rel="nofollow noreferrer" target="_blank">vue 自定义指令用法实例</a></li>
<li>两种指令：1 全局指令 2 局部指令</li>
</ul>
<h3 id="articleHeader54">全局自定义指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一个参数：指令名称
// 第二个参数：配置对象，指定指令的钩子函数
Vue.directive('directiveName', {
  // bind中只能对元素自身进行DOM操作，而无法对父级元素操作
  // 只调用一次 指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind( el，binding, vnode ) {
    // 参数详解
    // el：指令所绑定的元素，可以用来直接操作 DOM 。
    // binding：一个对象，包含以下属性：
      // name：指令名，不包括 v- 前缀。
      // value：指令的绑定值，等号后面的值 。
      // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      // expression：字符串形式的指令表达式 等号后面的字符串 形式
      // arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 &quot;foo&quot;。
      // modifiers：指令修饰符。例如：v-directive.foo.bar中，修饰符对象为 { foo: true, bar: true }。
    // vnode：Vue 编译生成的虚拟节点。。
    // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
  },
  // inserted这个钩子函数调用的时候，当前元素已经插入页面中了，也就是说可以获取到父级节点了
  inserted (  el，binding, vnode ) {},
  //  DOM重新渲染前
  update(el，binding, vnode,oldVnode) {},
  // DOM重新渲染后
  componentUpdated ( el，binding, vnode,oldVnode ) {},
  // 只调用一次，指令与元素解绑时调用
  unbind ( el ) {
    // 指令所在的元素在页面中消失，触发
  }
})
// 简写 如果你想在 bind 和 update 时触发相同行为，而不关心其它的钩子:
Vue.directive('自定义指令名', function( el, binding ) {})
// 例：
Vue.directive('color', function(el, binding) {
  el.style.color = binging.value
})
// 使用 注意直接些会被i成data中的数据“red” 需要字符串则嵌套引号&quot;'red'&quot;
<p v-color=&quot;'red'&quot;></p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一个参数：指令名称</span>
<span class="hljs-comment">// 第二个参数：配置对象，指定指令的钩子函数</span>
Vue.directive(<span class="hljs-string">'directiveName'</span>, {
  <span class="hljs-comment">// bind中只能对元素自身进行DOM操作，而无法对父级元素操作</span>
  <span class="hljs-comment">// 只调用一次 指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</span>
  bind( el，binding, vnode ) {
    <span class="hljs-comment">// 参数详解</span>
    <span class="hljs-comment">// el：指令所绑定的元素，可以用来直接操作 DOM 。</span>
    <span class="hljs-comment">// binding：一个对象，包含以下属性：</span>
      <span class="hljs-comment">// name：指令名，不包括 v- 前缀。</span>
      <span class="hljs-comment">// value：指令的绑定值，等号后面的值 。</span>
      <span class="hljs-comment">// oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</span>
      <span class="hljs-comment">// expression：字符串形式的指令表达式 等号后面的字符串 形式</span>
      <span class="hljs-comment">// arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</span>
      <span class="hljs-comment">// modifiers：指令修饰符。例如：v-directive.foo.bar中，修饰符对象为 { foo: true, bar: true }。</span>
    <span class="hljs-comment">// vnode：Vue 编译生成的虚拟节点。。</span>
    <span class="hljs-comment">// oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</span>
  },
  <span class="hljs-comment">// inserted这个钩子函数调用的时候，当前元素已经插入页面中了，也就是说可以获取到父级节点了</span>
  inserted (  el，binding, vnode ) {},
  <span class="hljs-comment">//  DOM重新渲染前</span>
  update(el，binding, vnode,oldVnode) {},
  <span class="hljs-comment">// DOM重新渲染后</span>
  componentUpdated ( el，binding, vnode,oldVnode ) {},
  <span class="hljs-comment">// 只调用一次，指令与元素解绑时调用</span>
  unbind ( el ) {
    <span class="hljs-comment">// 指令所在的元素在页面中消失，触发</span>
  }
})
<span class="hljs-comment">// 简写 如果你想在 bind 和 update 时触发相同行为，而不关心其它的钩子:</span>
Vue.directive(<span class="hljs-string">'自定义指令名'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> el, binding </span>) </span>{})
<span class="hljs-comment">// 例：</span>
Vue.directive(<span class="hljs-string">'color'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding</span>) </span>{
  el.style.color = binging.value
})
<span class="hljs-comment">// 使用 注意直接些会被i成data中的数据“red” 需要字符串则嵌套引号"'red'"</span>
&lt;p v-color=<span class="hljs-string">"'red'"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
</code></pre>
<h3 id="articleHeader55">局部自定义指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el : &quot;#app&quot;,
  directives: {
    directiveName: { }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span> : <span class="hljs-string">"#app"</span>,
  <span class="hljs-attr">directives</span>: {
    <span class="hljs-attr">directiveName</span>: { }
  }
})</code></pre>
<ul><li><a href="https://segmentfault.com/a/1190000006599500">vue 剖析Vue原理&amp;实现双向绑定MVVM</a></li></ul>
<h2 id="articleHeader56">组件</h2>
<blockquote>组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树</blockquote>
<ul><li>创建组件的两种方式：1 全局组件 2 局部组件</li></ul>
<h3 id="articleHeader57">全局组件</h3>
<ul>
<li>说明：全局组件在所有的vue实例中都可以使用</li>
<li>注意：<strong>先注册组件，再初始化根实例</strong>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1 注册全局组件  
Vue.component('my-component', {
  // template 只能有一个根元素
  template: '<p>A custom component!</p>',
  // 组件中的 `data` 必须是函数 并且函数的返回值必须是对象
  data() {
    return {
      msg: '注意：组件的data必须是一个函数！！！'
    }
  }
})

// 2 使用：以自定义元素的方式
<div id=&quot;example&quot;>
  <my-component></my-component>
</div>

// =====> 渲染结果
<div id=&quot;example&quot;>
  <p>A custom component!</p>
</div>


// 3 template属性的值可以是：
  - 1 模板字符串
  - 2 模板id  template: '#tpl'
<script type=&quot;text/x-template&quot; id=&quot;tpl&quot;>
  <p>A custom component!</p>
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1 注册全局组件  </span>
Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-comment">// template 只能有一个根元素</span>
  template: <span class="hljs-string">'&lt;p&gt;A custom component!&lt;/p&gt;'</span>,
  <span class="hljs-comment">// 组件中的 `data` 必须是函数 并且函数的返回值必须是对象</span>
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'注意：组件的data必须是一个函数！！！'</span>
    }
  }
})

<span class="hljs-comment">// 2 使用：以自定义元素的方式</span>
&lt;div id=<span class="hljs-string">"example"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="hljs-comment">// =====&gt; 渲染结果</span>
&lt;div id=<span class="hljs-string">"example"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>A custom component!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;


/</span><span class="hljs-regexp">/ 3 template属性的值可以是：
  - 1 模板字符串
  - 2 模板id  template: '#tpl'
&lt;script type="text/</span>x-template<span class="hljs-string">" id="</span>tpl<span class="hljs-string">"&gt;
  &lt;p&gt;A custom component!&lt;/p&gt;
&lt;/script&gt;
</span></code></pre>
<ul><li>
<code>extend</code>：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

var Home = Vue.extend({
  template: '',
  data() {}
})
Vue.component('home', Home)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 注册组件，传入一个扩展过的构造器</span>
Vue.component(<span class="hljs-string">'my-component'</span>, Vue.extend({ <span class="hljs-comment">/* ... */</span> }))

<span class="hljs-comment">// 注册组件，传入一个选项对象 (自动调用 Vue.extend)</span>
Vue.component(<span class="hljs-string">'my-component'</span>, { <span class="hljs-comment">/* ... */</span> })

<span class="hljs-keyword">var</span> Home = Vue.extend({
  <span class="hljs-attr">template</span>: <span class="hljs-string">''</span>,
  data() {}
})
Vue.component(<span class="hljs-string">'home'</span>, Home)</code></pre>
<h3 id="articleHeader58">局部组件</h3>
<ul><li>说明：局部组件，是在某一个具体的vue实例中定义的，只能在这个vue实例中使用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // 注意：此处为 components
  components: {
    // <my-component> 将只在当前vue实例中使用
    // my-component 为组件名 值为配置对象 
    'my-component': {
      template: ``,
      data () { return { } },
      props : []
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Child = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
}

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-comment">// 注意：此处为 components</span>
  components: {
    <span class="hljs-comment">// &lt;my-component&gt; 将只在当前vue实例中使用</span>
    <span class="hljs-comment">// my-component 为组件名 值为配置对象 </span>
    <span class="hljs-string">'my-component'</span>: {
      <span class="hljs-attr">template</span>: <span class="hljs-string">``</span>,
      data () { <span class="hljs-keyword">return</span> { } },
      <span class="hljs-attr">props</span> : []
    }
  }
})</code></pre>
<h3 id="articleHeader59">is特性</h3>
<blockquote>在某些特定的标签中只能存在指定表恰 如ul &gt; li 如果要浏览器正常解析则需要使用is</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 案例 -->
<ul id=&quot;app&quot;>
  <!-- 不能识别 -->
  <my-li></my-li> 
  正常识别
  <li is=&quot;my-li&quot;></li>
</ul>

<script>
  var vm = new Vue({
    el: &quot;#app&quot;,
    components : {
      myLi : {
        template : `<li>内容</li>`
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 案例 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 不能识别 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-li</span>&gt;</span> 
  正常识别
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-li"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">"#app"</span>,
    <span class="hljs-attr">components</span> : {
      <span class="hljs-attr">myLi</span> : {
        <span class="hljs-attr">template</span> : <span class="hljs-string">`&lt;li&gt;内容&lt;/li&gt;`</span>
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader60">组件通讯</h2>
<h3 id="articleHeader61">父组件到子组件</h3>
<ul>
<li>方式：通过子组件<code>props</code>属性来传递数据 props是一个数组</li>
<li>注意：属性的值必须在组件中通过<code>props</code>属性显示指定，否则，不会生效</li>
<li>说明：传递过来的<code>props</code>属性的用法与<code>data</code>属性的用法相同</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <!-- 如果需要往子组件总传递父组件data中的数据 需要加v-bind=&quot;数据名称&quot; -->
  <hello v-bind:msg=&quot;info&quot;></hello>
  <!-- 如果传递的是字面量 那么直接写-->
  <hello my-msg=&quot;abc&quot;></hello>
</div>

<!-- js -->
<script>
  new Vue({
    el: &quot;#app&quot;,
    data : {
      info : 15
    },
    components: {
      hello: {
        // 创建props及其传递过来的属性
        props: ['msg', 'myMsg'],
        template: '<h1>这是 hello 组件，这是消息："{{"msg"}}" --- "{{"myMsg"}}"</h1>'
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 如果需要往子组件总传递父组件data中的数据 需要加v-bind="数据名称" --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hello</span> <span class="hljs-attr">v-bind:msg</span>=<span class="hljs-string">"info"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 如果传递的是字面量 那么直接写--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hello</span> <span class="hljs-attr">my-msg</span>=<span class="hljs-string">"abc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">"#app"</span>,
    data : {
      info : <span class="hljs-number">15</span>
    },
    components: {
      hello: {
        <span class="hljs-comment">// 创建props及其传递过来的属性</span>
        props: [<span class="hljs-string">'msg'</span>, <span class="hljs-string">'myMsg'</span>],
        template: <span class="hljs-string">'&lt;h1&gt;这是 hello 组件，这是消息："{{"msg"}}" --- "{{"myMsg"}}"&lt;/h1&gt;'</span>
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader62">子组件到父组件</h3>
<p>方式：父组件给子组件传递一个函数，由子组件调用这个函数</p>
<ul><li>说明：借助vue中的自定义事件（v-on:cunstomFn="fn"）</li></ul>
<p>步骤:</p>
<ul>
<li>1、在父组件中定义方法 parentFn</li>
<li>2、在子组件 组件引入标签 中绑定自定义事件 v-on:自定义事件名="父组件中的方法" ==&gt; @pfn="parentFn"</li>
<li>3、子组件中通过<code>$emit()</code>触发自定义事件事件  this.$emit(pfn,参数列表。。。)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello @pfn=&quot;parentFn&quot;></hello>

<script>
  Vue.component('hello', {
    template: '<button @click=&quot;fn&quot;>按钮</button>',
    methods: {
      // 子组件：通过$emit调用
      fn() {
        this.$emit('pfn', '这是子组件传递给父组件的数据')
      }
    }
  })
  new Vue({
    methods: {
      // 父组件：提供方法
      parentFn(data) {
        console.log('父组件：', data)
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">hello</span> @<span class="hljs-attr">pfn</span>=<span class="hljs-string">"parentFn"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  Vue.component(<span class="hljs-string">'hello'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;button @click="fn"&gt;按钮&lt;/button&gt;'</span>,
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">// 子组件：通过$emit调用</span>
      fn() {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'pfn'</span>, <span class="hljs-string">'这是子组件传递给父组件的数据'</span>)
      }
    }
  })
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">// 父组件：提供方法</span>
      parentFn(data) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'父组件：'</span>, data)
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader63">非父子组件通讯</h3>
<blockquote>在简单的场景下，可以使用一个空的 Vue 实例作为事件总线</blockquote>
<ul><li>
<code>$on()</code>：绑定自定义事件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue()

// 在组件 B 绑定自定义事件
bus.$on('id-selected', function (id) {
  // ...
})
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue()

<span class="hljs-comment">// 在组件 B 绑定自定义事件</span>
bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-comment">// 触发组件 A 中的事件</span>
bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>)
</code></pre>
<ul><li>示例：组件A ---&gt; 组件B</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 组件A： -->
<com-a></com-a>
<!-- 组件B： -->
<com-b></com-b>

<script>
  // 中间组件
  var bus = new Vue()
  // 通信组件
  var vm = new Vue({
    el: '#app',
    components: {
      comB: {
        template: '<p>组件A告诉我："{{"msg"}}"</p>',
        data() {
          return {
            msg: ''
          }
        },
        created() {
          // 给中间组件绑定自定义事件 注意:如果用到this 需要用箭头函数
          bus.$on('tellComB', (msg) => {
            this.msg = msg
          })
        }
      },
      comA: {
        template: '<button @click=&quot;emitFn&quot;>告诉B</button>',
        methods: {
          emitFn() {
            // 触发中间组件中的自定义事件
            bus.$emit('tellComB', '土豆土豆我是南瓜')
          }
        }
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 组件A： --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">com-a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">com-a</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 组件B： --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">com-b</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">com-b</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-comment">// 中间组件</span>
  <span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue()
  <span class="hljs-comment">// 通信组件</span>
  <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    components: {
      comB: {
        template: <span class="hljs-string">'&lt;p&gt;组件A告诉我："{{"msg"}}"&lt;/p&gt;'</span>,
        data() {
          <span class="hljs-keyword">return</span> {
            msg: <span class="hljs-string">''</span>
          }
        },
        created() {
          <span class="hljs-comment">// 给中间组件绑定自定义事件 注意:如果用到this 需要用箭头函数</span>
          bus.$on(<span class="hljs-string">'tellComB'</span>, (msg) =&gt; {
            <span class="hljs-keyword">this</span>.msg = msg
          })
        }
      },
      comA: {
        template: <span class="hljs-string">'&lt;button @click="emitFn"&gt;告诉B&lt;/button&gt;'</span>,
        methods: {
          emitFn() {
            <span class="hljs-comment">// 触发中间组件中的自定义事件</span>
            bus.$emit(<span class="hljs-string">'tellComB'</span>, <span class="hljs-string">'土豆土豆我是南瓜'</span>)
          }
        }
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader64">内容分发</h3>
<ul><li>通过&lt;slot&gt;&lt;/slot&gt; 标签指定内容展示区域</li></ul>
<p>案例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html代码 -->
<div id=&quot;app&quot;>
  <hello>
    <!-- 如果只有一个slot插槽 那么不需要指定名称 -->
    <p slot=&quot;插槽名称&quot;>我是额外的内容</p>
  </hello>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html代码 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 如果只有一个slot插槽 那么不需要指定名称 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"插槽名称"</span>&gt;</span>我是额外的内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// js代码
new vue({
  el : &quot;#app&quot;,
  components : {
    hello : {
      template : `
          <div>
            <p>我是子组件中的内容</p>
            <slot name=&quot;名称&quot;></slot>
          </div>
        `
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// js代码</span>
<span class="hljs-keyword">new</span> vue({
  <span class="hljs-attr">el</span> : <span class="hljs-string">"#app"</span>,
  <span class="hljs-attr">components</span> : {
    <span class="hljs-attr">hello</span> : {
      <span class="hljs-attr">template</span> : <span class="hljs-string">`
          &lt;div&gt;
            &lt;p&gt;我是子组件中的内容&lt;/p&gt;
            &lt;slot name="名称"&gt;&lt;/slot&gt;
          &lt;/div&gt;
        `</span>
    }
  }
})</code></pre>
<h3 id="articleHeader65">获取组件（或元素） - refs</h3>
<ul>
<li>说明：<code>vm.$refs</code> 一个对象，持有已注册过 ref 的所有子组件（或HTML元素）</li>
<li>使用：在 HTML元素 中，添加<code>ref</code>属性，然后在JS中通过<code>vm.$refs.属性</code>来获取</li>
<li>注意：如果获取的是一个子组件，那么通过ref就能获取到子组件中的data和methods</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div ref=&quot;dv&quot;></div>
  <my res=&quot;my&quot;></my>
</div>

<!-- js -->
<script>
  new Vue({
    el : &quot;#app&quot;,
    mounted() {
      this.$refs.dv //获取到元素
      this.$refs.my //获取到组件
    },
    components : {
      my : {
        template: `<a>sss</a>`
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"dv"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my</span> <span class="hljs-attr">res</span>=<span class="hljs-string">"my"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span> : <span class="hljs-string">"#app"</span>,
    mounted() {
      <span class="hljs-keyword">this</span>.$refs.dv <span class="hljs-comment">//获取到元素</span>
      <span class="hljs-keyword">this</span>.$refs.my <span class="hljs-comment">//获取到组件</span>
    },
    <span class="hljs-attr">components</span> : {
      <span class="hljs-attr">my</span> : {
        <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;a&gt;sss&lt;/a&gt;`</span>
      }
    }
  })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader66">SPA -单页应用程序</h2>
<h3 id="articleHeader67">SPA： Single Page Application</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="单页Web应用（single page application，SPA），就是只有一个Web页面的应用，
是加载单个HTML页面，并在用户与应用程序交互时动态更新该页面的Web应用程序。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>单页Web应用（single page <span class="hljs-built_in">application</span>，SPA），就是只有一个Web页面的应用，
是加载单个HTML页面，并在用户与应用程序交互时动态更新该页面的Web应用程序。
</code></pre>
<ul>
<li>
<p>单页面应用程序：</p>
<ul><li>只有第一次会加载页面, 以后的每次请求, 仅仅是获取必要的数据.然后, 由页面中js解析获取的数据, 展示在页面中</li></ul>
</li>
<li>
<p>传统多页面应用程序：</p>
<ul><li>对于传统的多页面应用程序来说, 每次请求服务器返回的都是一个完整的页面</li></ul>
</li>
</ul>
<p>优势</p>
<ul>
<li>1 减少了请求体积，加快页面响应速度，降低了对服务器的压力</li>
<li>2 更好的用户体验，让用户在web app感受native app的流畅</li>
</ul>
<p>实现思路和技术点</p>
<ul>
<li>1 ajax</li>
<li>2 锚点的使用（window.location.hash #）</li>
<li>3 hashchange 事件  window.addEventListener("hashchange",function () {})</li>
<li>4 监听锚点值变化的事件，根据不同的锚点值，请求相应的数据</li>
<li>5 原本用作页面内部进行跳转，定位并展示相应的内容</li>
</ul>
<h3 id="articleHeader68">路由</h3>
<ul>
<li>路由即：浏览器中的哈希值（# hash）与展示视图内容（template）之间的对应规则</li>
<li>vue中的路由是：hash 和 component的对应关系<p>在 Web app 中，通过一个页面来展示和管理整个应用的功能。<br>SPA往往是功能复杂的应用，为了有效管理所有视图内容，前端路由 应运而生！<br>简单来说，路由就是一套映射规则（一对一的对应规则），由开发人员制定规则。<br>当URL中的哈希值（# hash）发生改变后，路由会根据制定好的规则，展示对应的视图内容</p>
</li>
</ul>
<h4>基本使用</h4>
<ul><li>安装：npm i -S vue-router</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div id=&quot;app&quot;>
      <!-- 5 路由入口 指定跳转到只定入口 -->
      <router-link to=&quot;/home&quot;>首页</router-link>
      <router-link to=&quot;/login&quot;>登录</router-link>
    
      <!-- 7 路由出口：用来展示匹配路由视图内容 -->
      <router-view></router-view>
    </div>
    
    <!-- 1 导入 vue.js -->
    <script src=&quot;./vue.js&quot;></script>
    <!-- 2 导入 路由文件 -->
    <script src=&quot;./node_modules/vue-router/dist/vue-router.js&quot;></script>
    <script>
      // 3 创建两个组件
      const Home = Vue.component('home', {
        template: '<h1>这是 Home 组件</h1>'
      })
      const Login = Vue.component('login', {
        template: '<h1>这是 Login 组件</h1>'
      })
    
      // 4 创建路由对象
      const router = new VueRouter({
        routes: [
          // 路径和组件一一对应
          { path: '/home', component: Home },
          { path: '/login', component: Login }
        ]
      })
    
      var vm = new Vue({
        el: '#app',
        // 6 将路由实例挂载到vue实例
        router
      })
    </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 5 路由入口 指定跳转到只定入口 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    
      <span class="hljs-comment">&lt;!-- 7 路由出口：用来展示匹配路由视图内容 --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!-- 1 导入 vue.js --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 2 导入 路由文件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./node_modules/vue-router/dist/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
      <span class="hljs-comment">// 3 创建两个组件</span>
      <span class="hljs-keyword">const</span> Home = Vue.component(<span class="hljs-string">'home'</span>, {
        template: <span class="hljs-string">'&lt;h1&gt;这是 Home 组件&lt;/h1&gt;'</span>
      })
      <span class="hljs-keyword">const</span> Login = Vue.component(<span class="hljs-string">'login'</span>, {
        template: <span class="hljs-string">'&lt;h1&gt;这是 Login 组件&lt;/h1&gt;'</span>
      })
    
      <span class="hljs-comment">// 4 创建路由对象</span>
      <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
        routes: [
          <span class="hljs-comment">// 路径和组件一一对应</span>
          { path: <span class="hljs-string">'/home'</span>, component: Home },
          { path: <span class="hljs-string">'/login'</span>, component: Login }
        ]
      })
    
      <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        <span class="hljs-comment">// 6 将路由实例挂载到vue实例</span>
        router
      })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h4>重定向</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  将path 重定向到 redirect
{ path: '/', redirect: '/home' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//  将path 重定向到 redirect</span>
{ <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/home'</span> }</code></pre>
<h4>路由其他配置</h4>
<ul>
<li>
<p>路由导航高亮</p>
<ul>
<li>说明：当前匹配的导航链接，会自动添加router-link-exact-active router-link-active类</li>
<li>配置：linkActiveClass</li>
</ul>
</li>
<li>
<p>匹配路由模式</p>
<ul><li>配置：mode</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Router({
  routers:[],
  mode: &quot;hash&quot;, //默认hash | history 可以达到隐藏地址栏hash值 | abstract，如果发现没有浏览器的 API 则强制进入
  linkActiveClass : &quot;now&quot; //当前匹配的导航链接将被自动添加now类
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routers</span>:[],
  <span class="hljs-attr">mode</span>: <span class="hljs-string">"hash"</span>, <span class="hljs-comment">//默认hash | history 可以达到隐藏地址栏hash值 | abstract，如果发现没有浏览器的 API 则强制进入</span>
  linkActiveClass : <span class="hljs-string">"now"</span> <span class="hljs-comment">//当前匹配的导航链接将被自动添加now类</span>
})</code></pre>
<h4>路由参数</h4>
<ul>
<li>说明：我们经常需要把某种模式匹配到的所有路由，全都映射到同一个组件，此时，可以通过路由参数来处理</li>
<li>语法：/user/:id</li>
<li>使用：当匹配到一个路由时，参数值会被设置到 this.$route.params</li>
<li>其他：可以通过 $route.query 获取到 URL 中的查询参数 等</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 方式一
    <router-link to=&quot;/user/1001&quot;>如果你需要在模版中使用路由参数 可以这样 "{{"$router.params.id"}}"</router-link>
    // 方式二
    <router-link :to=&quot;{path:'/user',query:{name:'jack',age:18"}}"&quot;>用户 Rose</router-link>


    <script>
    // 路由
    var router = new Router({
      routers : [
        // 方式一 注意 只有/user/1001这种形式能被匹配 /user | /user/ | /user/1001/ 都不能被匹配
        // 将来通过$router.params获取参数返回 {id:1001}
        { path: '/user/:id', component: User }, 
        // 方式二
        { path: &quot;user&quot; , component: User}
      ]
    })
    
    // User组件：
    const User = {
      template: `<div>User "{{" $route.params.id "}}"</div>`
    }
    </script>  
    <!-- 如果要子啊vue实例中获取路由参数 则使用this.$router.params 获取路由参数对象 -->
    <!--  "{{"$router.query"}}" 获取路由中的查询字符串 返回对象 -->
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    // 方式一
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/1001"</span>&gt;</span>如果你需要在模版中使用路由参数 可以这样 "{{"$router.params.id"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    // 方式二
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{path:'/user',query:{name:'jack',age:18"}}""</span>&gt;</span>用户 Rose<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>


    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 路由</span>
    <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> Router({
      <span class="hljs-attr">routers</span> : [
        <span class="hljs-comment">// 方式一 注意 只有/user/1001这种形式能被匹配 /user | /user/ | /user/1001/ 都不能被匹配</span>
        <span class="hljs-comment">// 将来通过$router.params获取参数返回 {id:1001}</span>
        { <span class="hljs-attr">path</span>: <span class="hljs-string">'/user/:id'</span>, <span class="hljs-attr">component</span>: User }, 
        <span class="hljs-comment">// 方式二</span>
        { <span class="hljs-attr">path</span>: <span class="hljs-string">"user"</span> , <span class="hljs-attr">component</span>: User}
      ]
    })
    
    <span class="hljs-comment">// User组件：</span>
    <span class="hljs-keyword">const</span> User = {
      <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;User "{{" $route.params.id "}}"&lt;/div&gt;`</span>
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  
    <span class="hljs-comment">&lt;!-- 如果要子啊vue实例中获取路由参数 则使用this.$router.params 获取路由参数对象 --&gt;</span>
    <span class="hljs-comment">&lt;!--  "{{"$router.query"}}" 获取路由中的查询字符串 返回对象 --&gt;</span>
</code></pre>
<h4>嵌套路由 - 子路由</h4>
<ul>
<li>路由是可以嵌套的，即：路由中又包含子路由</li>
<li>规则：父组件中包含 router-view，在路由规则中使用 children 配置</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 父组件：
    const User = Vue.component('user', {
      template: `
        <div class=&quot;user&quot;>
          <h2>User Center</h2>
          <router-link to=&quot;/user/profile&quot;>个人资料</router-link>
          <router-link to=&quot;/user/posts&quot;>岗位</router-link>
          <!-- 子路由展示在此处 -->
          <router-view></router-view>
        </div>
        `
    })
    
    // 子组件[简写]
    const UserProfile = {
      template: '<h3>个人资料：张三</h3>'
    }
    const UserPosts = {
      template: '<h3>岗位：FE</h3>'
    }
    
    // 路由
    var router =new Router({
      routers : [

        { path: '/user', component: User,
          // 子路由配置：
          children: [
            {
              // 当 /user/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: 'profile',
              component: UserProfile
            },
            {
              // 当 /user/posts 匹配成功
              // UserPosts 会被渲染在 User 的 <router-view> 中
              path: 'posts',
              component: UserPosts
            }
          ]
        }
      ]
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// 父组件：</span>
    <span class="hljs-keyword">const</span> User = Vue.component(<span class="hljs-string">'user'</span>, {
      <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;div class="user"&gt;
          &lt;h2&gt;User Center&lt;/h2&gt;
          &lt;router-link to="/user/profile"&gt;个人资料&lt;/router-link&gt;
          &lt;router-link to="/user/posts"&gt;岗位&lt;/router-link&gt;
          &lt;!-- 子路由展示在此处 --&gt;
          &lt;router-view&gt;&lt;/router-view&gt;
        &lt;/div&gt;
        `</span>
    })
    
    <span class="hljs-comment">// 子组件[简写]</span>
    <span class="hljs-keyword">const</span> UserProfile = {
      <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;h3&gt;个人资料：张三&lt;/h3&gt;'</span>
    }
    <span class="hljs-keyword">const</span> UserPosts = {
      <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;h3&gt;岗位：FE&lt;/h3&gt;'</span>
    }
    
    <span class="hljs-comment">// 路由</span>
    <span class="hljs-keyword">var</span> router =<span class="hljs-keyword">new</span> Router({
      <span class="hljs-attr">routers</span> : [

        { <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>, <span class="hljs-attr">component</span>: User,
          <span class="hljs-comment">// 子路由配置：</span>
          children: [
            {
              <span class="hljs-comment">// 当 /user/profile 匹配成功，</span>
              <span class="hljs-comment">// UserProfile 会被渲染在 User 的 &lt;router-view&gt; 中</span>
              path: <span class="hljs-string">'profile'</span>,
              <span class="hljs-attr">component</span>: UserProfile
            },
            {
              <span class="hljs-comment">// 当 /user/posts 匹配成功</span>
              <span class="hljs-comment">// UserPosts 会被渲染在 User 的 &lt;router-view&gt; 中</span>
              path: <span class="hljs-string">'posts'</span>,
              <span class="hljs-attr">component</span>: UserPosts
            }
          ]
        }
      ]
    })</code></pre>
<h2 id="articleHeader69">前端模块化</h2>
<blockquote>为什么需要模块化</blockquote>
<ul>
<li>1 最开始的js就是为了实现客户端验证以及一些简单的效果</li>
<li>2 后来，js得到重视，应用越来越广泛，前端开发的复杂度越来越高</li>
<li>3 旧版本的js中没有提供与模块（module）相关的内容</li>
</ul>
<h3 id="articleHeader70">模块的概念</h3>
<ul>
<li>在js中，一个模块就是实现特定功能的文件（js文件）</li>
<li>遵循模块的机制，想要什么功能就加载什么模块</li>
<li>模块化开发需要遵循规范</li>
</ul>
<h3 id="articleHeader71">模块化解决的问题</h3>
<ul>
<li>1 命名冲突</li>
<li>2 文件依赖（加载文件）</li>
<li>3 模块的复用</li>
<li>4 统一规范和开发方式</li>
</ul>
<h3 id="articleHeader72">JS实现模块化的规范</h3>
<ul>
<li>
<p>AMD 浏览器端</p>
<ul><li>requirejs</li></ul>
</li>
<li>
<p>CommonJS nodejs</p>
<ul>
<li>加载模块：require()</li>
<li>导出模块：module.exports = {} / exports = {}</li>
</ul>
</li>
<li>ES6 中的 import / export</li>
<li>
<p>CMD 浏览器端</p>
<ul><li>玉伯（阿里前端大神） -&gt; seajs</li></ul>
</li>
<li>UMD 通用模块化规范，可以兼容 AMD、CommonJS、浏览器中没有模块化规范 等这些语法</li>
</ul>
<p>AMD 的使用</p>
<blockquote>Asynchronous Module Definition：异步模块定义，浏览器端模块开发的规范 代表：require.js 特点：模块被异步加载，模块加载不影响后面语句的运行</blockquote>
<p>1、定义模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 语法:define(name, dependencies?, factory);
    // name表示：当前模块的名称，是一个字符串 可有可无
    // dependencies表示：当前模块的依赖项，是一个数组无论依赖一项还是多项 无则不写
    // factory表示：当前模块要完成的一些功能，是一个函数
    
    // 定义对象模块
    define({})
    // 定义方法模块
    define(function() {
      return {}
    })
    // 定义带有依赖项的模块
    define(['js/a'], function() {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// 语法:define(name, dependencies?, factory);</span>
    <span class="hljs-comment">// name表示：当前模块的名称，是一个字符串 可有可无</span>
    <span class="hljs-comment">// dependencies表示：当前模块的依赖项，是一个数组无论依赖一项还是多项 无则不写</span>
    <span class="hljs-comment">// factory表示：当前模块要完成的一些功能，是一个函数</span>
    
    <span class="hljs-comment">// 定义对象模块</span>
    define({})
    <span class="hljs-comment">// 定义方法模块</span>
    define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> {}
    })
    <span class="hljs-comment">// 定义带有依赖项的模块</span>
    define([<span class="hljs-string">'js/a'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{})</code></pre>
<p>2、加载模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// - 注意：require的第一个参数必须是数组

    // 参数必须是数组 表示模块路径 以当前文件为基准,通过回调函数中的参数获取加载模块中的变量 参数与模块按照顺序一一对应
    require(['a', 'js/b'], function(a, b) {
      // 使用模块a 和 模块b 中的代码
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// - 注意：require的第一个参数必须是数组</span>

    <span class="hljs-comment">// 参数必须是数组 表示模块路径 以当前文件为基准,通过回调函数中的参数获取加载模块中的变量 参数与模块按照顺序一一对应</span>
    <span class="hljs-built_in">require</span>([<span class="hljs-string">'a'</span>, <span class="hljs-string">'js/b'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
      <span class="hljs-comment">// 使用模块a 和 模块b 中的代码</span>
    })</code></pre>
<p>3、路径查找配置</p>
<ul>
<li>requirejs 默认使用 baseUrl+paths 的路径解析方式</li>
<li>
<p>可以使用以下方式避开此设置：</p>
<ul>
<li>1 以.js结尾</li>
<li>2 以 / 开始</li>
<li>3 包含协议：<a>https://</a> 或 <a>http://</a>
</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 配置示例
    // 注意配置应当在使用之前
    require.config({
      baseUrl: './js' // 配置基础路径为：当前目录下的js目录
    })
    require(['a'])    // 查找 基础路径下的 ./js/a.js

// 简化加载模块路径
    require.config({
      baseUrl: './js',
      // 配置一次即可，直接通过路径名称（template || jquery）加载模块
      paths: {
        template: 'assets/artTemplate/template-native',
        jquery: 'assets/jquery/jquery.min'
      }
    })
    // 加载jquery template模块
    require(['jquery', 'template'])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 配置示例</span>
    <span class="hljs-comment">// 注意配置应当在使用之前</span>
    <span class="hljs-built_in">require</span>.config({
      <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">'./js'</span> <span class="hljs-comment">// 配置基础路径为：当前目录下的js目录</span>
    })
    <span class="hljs-built_in">require</span>([<span class="hljs-string">'a'</span>])    <span class="hljs-comment">// 查找 基础路径下的 ./js/a.js</span>

<span class="hljs-comment">// 简化加载模块路径</span>
    <span class="hljs-built_in">require</span>.config({
      <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">'./js'</span>,
      <span class="hljs-comment">// 配置一次即可，直接通过路径名称（template || jquery）加载模块</span>
      paths: {
        <span class="hljs-attr">template</span>: <span class="hljs-string">'assets/artTemplate/template-native'</span>,
        <span class="hljs-attr">jquery</span>: <span class="hljs-string">'assets/jquery/jquery.min'</span>
      }
    })
    <span class="hljs-comment">// 加载jquery template模块</span>
    <span class="hljs-built_in">require</span>([<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'template'</span>])</code></pre>
<p>4、非模块化和依赖项支持</p>
<ul>
<li>1 添加模块的依赖模块，保证加载顺序（deps）</li>
<li>2 将非模块化模块，转化为模块化（exports）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 示例
    require.config({
      baseUrl: './js',
      paths: {
        // 配置路径
        noModule: 'assets/demo/noModule'
      },
      // 配置不符合规范的模块项
      shim: {
        // 模块名称
        noModule: {
          deps: [],         // 依赖项
          exports: 'sayHi'  // 导出模块中存在的函数或变量
        }
      }
    });

// 注意点  如果定义模块的时候，指定了模块名称，需要使用该名称来引用模块
    // 定义 这个模块名称与paths中的名称相同
    define('moduleA', function() {})
    // 导入
    require.config({
      paths: {
        // 此处的模块名：moduleA
        moduleA: 'assets/demo/moduleA'
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 示例</span>
    <span class="hljs-built_in">require</span>.config({
      <span class="hljs-attr">baseUrl</span>: <span class="hljs-string">'./js'</span>,
      <span class="hljs-attr">paths</span>: {
        <span class="hljs-comment">// 配置路径</span>
        noModule: <span class="hljs-string">'assets/demo/noModule'</span>
      },
      <span class="hljs-comment">// 配置不符合规范的模块项</span>
      shim: {
        <span class="hljs-comment">// 模块名称</span>
        noModule: {
          <span class="hljs-attr">deps</span>: [],         <span class="hljs-comment">// 依赖项</span>
          exports: <span class="hljs-string">'sayHi'</span>  <span class="hljs-comment">// 导出模块中存在的函数或变量</span>
        }
      }
    });

<span class="hljs-comment">// 注意点  如果定义模块的时候，指定了模块名称，需要使用该名称来引用模块</span>
    <span class="hljs-comment">// 定义 这个模块名称与paths中的名称相同</span>
    define(<span class="hljs-string">'moduleA'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{})
    <span class="hljs-comment">// 导入</span>
    <span class="hljs-built_in">require</span>.config({
      <span class="hljs-attr">paths</span>: {
        <span class="hljs-comment">// 此处的模块名：moduleA</span>
        moduleA: <span class="hljs-string">'assets/demo/moduleA'</span>
      }
    })</code></pre>
<p>5、路径加载规则</p>
<ul><li>
<p>路径配置的优先级：</p>
<ul>
<li>1 通过 config 配置规则查找</li>
<li>2 通过 data-main 指定的路径查找</li>
<li>3 以引入 requirejs 的页面所在路径为准查找</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!-- 
      设置data-main属性
      1 data-main属性指定的文件也会同时被加载
      2 用于指定查找其他模块的基础路径
    -->
    <script src=&quot;js/require.js&quot; data-main=&quot;js/main&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-comment">&lt;!-- 
      设置data-main属性
      1 data-main属性指定的文件也会同时被加载
      2 用于指定查找其他模块的基础路径
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/require.js"</span> <span class="hljs-attr">data-main</span>=<span class="hljs-string">"js/main"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader73">Webpack</h2>
<ul>
<li><a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack 官网</a></li>
<li>bundle <code>[ˈbʌndl]</code> 捆绑，收集，归拢，把…塞入</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 webpack 将带有依赖项的各个模块打包处理后，变成了独立的浏览器能够识别的文件
2 webpack 合并以及解析带有依赖项的模块" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">1 webpack 将带有依赖项的各个模块打包处理后，变成了独立的浏览器能够识别的文件
2 webpack 合并以及解析带有依赖项的模块</code></pre>
<h3 id="articleHeader74">概述</h3>
<blockquote>webpack 是一个现代 JavaScript 应用程序的模块打包器(特点 module、 bundler)  <br>webpack 是一个<strong>模块化方案（预编译）</strong>  <br>webpack获取具有依赖关系的模块，并生成表示这些模块的静态资源</blockquote>
<ul><li>四个核心概念：<strong>入口(entry)</strong>、<strong>输出(output)</strong>、<strong>加载器loader</strong>、<strong>插件(plugins)</strong>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对比
模块化方案: webpack 和 requirejs（通过编写代码的方式将前端的功能，划分成独立的模块）

browserify 是与 webpack 相似的模块化打包工具

webpack 预编译 (在开发阶段通过webpack进行模块化处理, 最终项目上线, 就不在依赖于 webpack)
requirejs 线上的编译( 代码运行是需要依赖与 requirejs 的 )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">对比
模块化方案: webpack 和 requirejs（通过编写代码的方式将前端的功能，划分成独立的模块）

browserify 是与 webpack 相似的模块化打包工具

webpack 预编译 (在开发阶段通过webpack进行模块化处理, 最终项目上线, 就不在依赖于 webpack)
requirejs 线上的编译( 代码运行是需要依赖与 requirejs 的 )</code></pre>
<h3 id="articleHeader75">webpack起源</h3>
<ul><li>
<p>webpack解决了现存模块打包器的两个痛点：</p>
<ul>
<li>1 <strong>Code Spliting</strong> - 代码分离 按需加载</li>
<li>2 <strong>静态资源的模块化处理方案</strong>
</li>
</ul>
</li></ul>
<h3 id="articleHeader76">webpack与模块</h3>
<ul>
<li><a href="http://zhaoda.net/webpack-handbook/module-system.html" rel="nofollow noreferrer" target="_blank">前端模块系统的演进</a></li>
<li>在webpack看来：所有的<strong>静态资源都是模块</strong>
</li>
<li>webpack 模块能够识别以下等形式的模块之间的依赖：</li>
<li>
<p>JS的模块化规范：</p>
<ul>
<li>ES2015 <code>import</code> <code>export</code>
</li>
<li>CommonJS <code>require()</code> <code>module.exports</code>
</li>
<li>AMD <code>define</code> 和 <code>require</code>
</li>
</ul>
</li>
<li>
<p>非JS等静态资源：</p>
<ul>
<li>css/sass/less 文件中的 <code>@import</code>
</li>
<li>图片连接，比如：样式 <code>url(...)</code> 或 HTML <code>&lt;img src=...&gt;</code>
</li>
<li>字体 等</li>
</ul>
</li>
</ul>
<h3 id="articleHeader77">webpack文档和资源</h3>
<ul>
<li><a href="https://doc.webpack-china.org/" rel="nofollow noreferrer" target="_blank">webpack 中文网</a></li>
<li><a href="http://webpack.github.io/docs/what-is-webpack.html" rel="nofollow noreferrer" target="_blank">webpack 1.0</a></li>
<li><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack 2.x+</a></li>
<li><a href="http://www.jianshu.com/p/42e11515c10f#" rel="nofollow noreferrer" target="_blank">入门Webpack，看这篇就够了</a></li>
</ul>
<hr>
<h2 id="articleHeader78">安装webpack</h2>
<ul>
<li>
<p>全局安装：<code>npm i -g webpack</code></p>
<ul><li>目的：在任何目录中通过CLI使用 <code>webpack</code> 这个命令</li></ul>
</li>
<li>
<p>项目安装：<code>npm i -D webpack</code></p>
<ul><li>目的：执行当前项目的构建</li></ul>
</li>
</ul>
<h2 id="articleHeader79">webpack的基本使用</h2>
<ul>
<li>安装：<code>npm i -D webpack</code>
</li>
<li>webpack的两种使用方式：1 命令行 2 配置文件（<code>webpack.config.js</code>）</li>
</ul>
<h3 id="articleHeader80">命令行方式演示 - 案例：隔行变色</h3>
<ul>
<li>1 使用<code>npm init -y</code> 初始package.json，使用npm来管理项目中的包</li>
<li>2 新建<code>index.html</code>和<code>index.js</code>，实现隔行变色功能</li>
<li>3 运行<code>webpack src/js/index.js dist/bundle.js</code>进行打包构建，语法是：<code>webpack 入口文件 输出文件</code>
</li>
<li>4 注意：需要在页面中引入 输出文件 的路径（此步骤可通过配置webpack去掉）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  src/js/index.js
*/

// 1 导入 jQuery
import $ from 'jquery'
// 2 获取页面中的li元素
const $lis = $('#ulList').find('li')
// 3 隔行变色
// jQuery中的 filter() 方法用来过滤jquery对象
$lis.filter(':odd').css('background-color', '#def')
$lis.filter(':even').css('background-color', 'skyblue')

//命令行运行 `webpack src/js/index.js   dist/bundle.js   目录生成在命令行运行目录
/*
  运行流程：
  1、webpack 根据入口找到入口文件
  2、分析js中的模块化语法 
  3、将所有关联文件 打包合并输出到出口
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
  src/js/index.js
*/</span>

<span class="hljs-comment">// 1 导入 jQuery</span>
<span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>
<span class="hljs-comment">// 2 获取页面中的li元素</span>
<span class="hljs-keyword">const</span> $lis = $(<span class="hljs-string">'#ulList'</span>).find(<span class="hljs-string">'li'</span>)
<span class="hljs-comment">// 3 隔行变色</span>
<span class="hljs-comment">// jQuery中的 filter() 方法用来过滤jquery对象</span>
$lis.filter(<span class="hljs-string">':odd'</span>).css(<span class="hljs-string">'background-color'</span>, <span class="hljs-string">'#def'</span>)
$lis.filter(<span class="hljs-string">':even'</span>).css(<span class="hljs-string">'background-color'</span>, <span class="hljs-string">'skyblue'</span>)

<span class="hljs-comment">//命令行运行 `webpack src/js/index.js   dist/bundle.js   目录生成在命令行运行目录</span>
<span class="hljs-comment">/*
  运行流程：
  1、webpack 根据入口找到入口文件
  2、分析js中的模块化语法 
  3、将所有关联文件 打包合并输出到出口
*/</span></code></pre>
<h2 id="articleHeader81">webpack-dev-server 配置</h2>
<h3 id="articleHeader82">一、package.json配置方式</h3>
<ul>
<li>安装：<code>npm i -D webpack-dev-server</code>
</li>
<li>作用：配合webpack，创建开发环境（启动服务器、监视文件变化、自动编译、刷新浏览器等），提高开发效率</li>
<li>注意：无法直接在终端中执行 <code>webpack-dev-server</code>，需要通过 <code>package.json</code> 的 <code>scripts</code> 实现</li>
<li>使用方式：<code>npm run dev</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数解释  注意参数是无序的 有值的参数空格隔开
// --open 自动打开浏览器
// --contentBase ./  指定浏览器 默认打开的页面路径中的 index.html 文件
// --open 自动打开浏览器
// --port 8080 端口号
// --hot 热更新，只加载修改的文件(按需加载修改的内容)，而非全部加载
&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --open --contentBase ./ --port 8080 --hot&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">// 参数解释  注意参数是无序的 有值的参数空格隔开
// --open 自动打开浏览器
// --contentBase ./  指定浏览器 默认打开的页面路径中的 index.html 文件
// --open 自动打开浏览器
// --port <span class="hljs-number">8080</span> 端口号
// --hot 热更新，只加载修改的文件(按需加载修改的内容)，而非全部加载
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --open --contentBase ./ --port 8080 --hot"</span>
}
</code></pre>
<h3 id="articleHeader83">二、webpack.config.js 配置方式(推荐)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
module.exports = {
  // 入口文件
  entry: path.join(__dirname, 'src/js/index.js'),

  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'),   // 输出文件的路径
    filename: 'bundle.js'                 // 输出文件的名称
  }
}

const webpack = require('webpack')

devServer: {
  // 服务器的根目录 Tell the server where to serve content from
  // https://webpack.js.org/configuration/dev-server/#devserver-contentbase
  contentBase: path.join(__dirname, './'),
  // 自动打开浏览器
  open: true,
  // 端口号
  port: 8888,

  // --------------- 1 热更新 -----------------
  hot: true
},

plugins: [
  // ---------------- 2 启用热更新插件 ----------------
  new webpack.HotModuleReplacementPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 入口文件</span>
  entry: path.join(__dirname, <span class="hljs-string">'src/js/index.js'</span>),

  <span class="hljs-comment">// 输出文件</span>
  output: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),   <span class="hljs-comment">// 输出文件的路径</span>
    filename: <span class="hljs-string">'bundle.js'</span>                 <span class="hljs-comment">// 输出文件的名称</span>
  }
}

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

devServer: {
  <span class="hljs-comment">// 服务器的根目录 Tell the server where to serve content from</span>
  <span class="hljs-comment">// https://webpack.js.org/configuration/dev-server/#devserver-contentbase</span>
  contentBase: path.join(__dirname, <span class="hljs-string">'./'</span>),
  <span class="hljs-comment">// 自动打开浏览器</span>
  open: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// 端口号</span>
  port: <span class="hljs-number">8888</span>,

  <span class="hljs-comment">// --------------- 1 热更新 -----------------</span>
  hot: <span class="hljs-literal">true</span>
},

<span class="hljs-attr">plugins</span>: [
  <span class="hljs-comment">// ---------------- 2 启用热更新插件 ----------------</span>
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
]</code></pre>
<ul><li>
<p>html-webpack-plugin 插件</p>
<ul>
<li>安装：<code>npm i -D html-webpack-plugin</code>
</li>
<li>作用：根据模板，自动生成html页面</li>
<li>优势：页面存储在内存中，自动引入<code>bundle.js</code>、<code>css</code>等文件</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */
const htmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
  new htmlWebpackPlugin({
    // 模板页面路径
    template: path.join(__dirname, './index.html'),
    // 在内存中生成页面路径，默认值为：index.html
    filename: 'index.html'
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>
<span class="hljs-keyword">const</span> htmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
plugins: [
  <span class="hljs-keyword">new</span> htmlWebpackPlugin({
    <span class="hljs-comment">// 模板页面路径</span>
    template: path.join(__dirname, <span class="hljs-string">'./index.html'</span>),
    <span class="hljs-comment">// 在内存中生成页面路径，默认值为：index.html</span>
    filename: <span class="hljs-string">'index.html'</span>
  })
]</code></pre>
<h3 id="articleHeader84">Loaders（加载器）</h3>
<ul>
<li><a href="https://webpack.js.org/loaders/" rel="nofollow noreferrer" target="_blank">webpack - Loaders</a></li>
<li><a href="https://doc.webpack-china.org/guides/asset-management" rel="nofollow noreferrer" target="_blank">webpack - 管理资源示例</a></li>
</ul>
<blockquote>webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript.</blockquote>
<ul>
<li>webpack只能处理JavaScript资源</li>
<li>webpack通过loaders处理非JavaScript静态资源</li>
</ul>
<p>1、 CSS打包</p>
<ul>
<li>安装：<code>npm i -D style-loader css-loader</code>
</li>
<li>注意：use中模块的顺序不能颠倒，加载顺序：从右向左加载</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 在index.js  导入 css 文件*/
import './css/app.css'

/* webpack.config.js 配置各种资源文件的loader加载器*/
module: {
  // 配置匹配规则
  rules: [
    // test 用来配置匹配文件规则（正则）
    // use  是一个数组，按照从后往前的顺序执行加载
    {test: /\.css$/, use: ['style-loader', 'css-loader']},
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 在index.js  导入 css 文件*/</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./css/app.css'</span>

<span class="hljs-comment">/* webpack.config.js 配置各种资源文件的loader加载器*/</span>
<span class="hljs-built_in">module</span>: {
  <span class="hljs-comment">// 配置匹配规则</span>
  rules: [
    <span class="hljs-comment">// test 用来配置匹配文件规则（正则）</span>
    <span class="hljs-comment">// use  是一个数组，按照从后往前的顺序执行加载</span>
    {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]},
  ]
}</code></pre>
<p>2、 使用webpack打包sass文件</p>
<ul>
<li>安装：<code>npm i -D sass-loader node-sass</code>
</li>
<li>注意：<code>sass-loader</code> 依赖于 <code>node-sass</code> 模块</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */
// 参考：https://webpack.js.org/loaders/sass-loader/#examples
// &quot;style-loader&quot;  ：creates style nodes from JS strings 创建style标签
// &quot;css-loader&quot;    ：translates CSS into CommonJS 将css转化为CommonJS代码
// &quot;sass-loader&quot;   ：compiles Sass to CSS 将Sass编译为css
module:{
  rules:[
    {test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>
<span class="hljs-comment">// 参考：https://webpack.js.org/loaders/sass-loader/#examples</span>
<span class="hljs-comment">// "style-loader"  ：creates style nodes from JS strings 创建style标签</span>
<span class="hljs-comment">// "css-loader"    ：translates CSS into CommonJS 将css转化为CommonJS代码</span>
<span class="hljs-comment">// "sass-loader"   ：compiles Sass to CSS 将Sass编译为css</span>
<span class="hljs-built_in">module</span>:{
  <span class="hljs-attr">rules</span>:[
    {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(scss|sass)$/</span>, <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'sass-loader'</span>]},
  ]
}</code></pre>
<p>3、 图片和字体打包</p>
<ul>
<li>安装：<code>npm i -D url-loader file-loader</code>
</li>
<li>
<code>file-loader</code>：加载并重命名文件（图片、字体 等）</li>
<li>
<code>url-loader</code>：将图片或字体转化为base64编码格式的字符串，嵌入到样式文件中</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */
module: {
  rules:[
    // 打包 图片文件
    { test: /\.(jpg|png|gif|jpeg)$/, use: 'url-loader' },

    // 打包 字体文件
    { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>
<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>:[
    <span class="hljs-comment">// 打包 图片文件</span>
    { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(jpg|png|gif|jpeg)$/</span>, <span class="hljs-attr">use</span>: <span class="hljs-string">'url-loader'</span> },

    <span class="hljs-comment">// 打包 字体文件</span>
    { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff|woff2|eot|ttf|otf)$/</span>, <span class="hljs-attr">use</span>: <span class="hljs-string">'file-loader'</span> }
  ]
}</code></pre>
<h4>图片打包细节</h4>
<ul>
<li>
<p><code>limit</code>参数的作用：（单位为：字节(byte)）</p>
<ul>
<li>当图片文件大小（字节）<code>小于</code>指定的limit时，图片被转化为base64编码格式</li>
<li>当图片文件大小（字节）<code>大于等于</code>指定的limit时，图片被重命名以url路径形式加载（此时，需要<code>file-loader</code>来加载图片）</li>
</ul>
</li>
<li>图片文件重命名，保证相同文件不会被加载多次。例如：一张图片（a.jpg）拷贝一个副本（b.jpg），同时引入这两张图片，重命名后只会加载一次，因为这两张图片就是同一张</li>
<li>文件重命名以后，会通过MD5加密的方式，来计算这个文件的名称</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */

module: {
  rules: [
    // {test: /\.(jpg|png|gif|jpeg)$/, use: 'url-loader?limit=100'},
    {
      test: /\.(jpg|png|gif|jpeg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>

<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [
    <span class="hljs-comment">// {test: /\.(jpg|png|gif|jpeg)$/, use: 'url-loader?limit=100'},</span>
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(jpg|png|gif|jpeg)$/</span>,
      <span class="hljs-attr">use</span>: [
        {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>
          }
        }
      ]
    }
  ]
}</code></pre>
<h3 id="articleHeader85">字体文件打包说明</h3>
<ul><li>处理方式与图片相同，可以使用：<code>file-loader</code>或<code>url-loader</code>
</li></ul>
<h2 id="articleHeader86">babel</h2>
<ul>
<li><a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">babel</a></li>
<li><a href="http://2ality.com/2015/12/babel6-loose-mode.html" rel="nofollow noreferrer" target="_blank">es2015-loose</a></li>
<li><a href="https://github.com/brunoyang/blog/issues/20" rel="nofollow noreferrer" target="_blank">babel全家桶</a></li>
<li>安装：<code>npm i -D babel-core babel-loader</code>
</li>
<li>安装：<code>npm i -D babel-preset-env</code>
</li>
</ul>
<h3 id="articleHeader87">基本使用（两步）</h3>
<ul><li>第一步：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */

module: {
  rules: [
    // exclude 排除，不需要编译的目录，提高编译速度
    {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>

<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [
    <span class="hljs-comment">// exclude 排除，不需要编译的目录，提高编译速度</span>
    {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-attr">use</span>: <span class="hljs-string">'babel-loader'</span>, <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>}
  ]
}</code></pre>
<ul><li>第二步：在项目根目录中新建<code>.babelrc</code>配置文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 创建 .babelrc 文件*/
// 将来babel-loader运行的时候，会检查这个配置文件，并读取相关的语法和插件配置
{
  &quot;presets&quot;: [&quot;env&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">/* 创建 .babelrc 文件*/
// 将来babel-loader运行的时候，会检查这个配置文件，并读取相关的语法和插件配置
{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"env"</span>]
}</code></pre>
<h2 id="articleHeader88">babel的说明</h2>
<ul><li>
<p>babel的作用：</p>
<ul>
<li>1 语法转换：将新的ES语法转化为浏览器能识别的语法（babel-preset-*）</li>
<li>2 polyfill浏览器兼容：让低版本浏览器兼容最新版ES的API</li>
</ul>
</li></ul>
<h3 id="articleHeader89">babel-preset-*</h3>
<blockquote>Babel通过语法转换器，能够支持最新版本的JavaScript语法  <br>babel-preset-* 用来指定我们书写的是什么版本的JS代码</blockquote>
<ul>
<li>作用：将新的ES语法转化为浏览器能识别的ES5代码</li>
<li>
<p><a href="http://es6.ruanyifeng.com/#docs/intro#" rel="nofollow noreferrer" target="_blank">ES6语法提案的批准流程</a></p>
<ul>
<li>ES2015 也就是 ES6, 下一个版本是ES7, 从 ES6 到 ES7之间经历了 5 个阶段</li>
<li>babel-preset-es2015 转换es6的语法</li>
<li>babel-preset-stage-0 转换比es6更新的语法</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Stage 0 - Strawman（展示阶段）
Stage 1 - Proposal（征求意见阶段）
Stage 2 - Draft（草案阶段）
Stage 3 - Candidate（候选人阶段）
Stage 4 - Finished（定案阶段）

Stage 0 is &quot;i've got a crazy idea&quot;,
stage 1 is &quot;this idea might not be stupid&quot;,
stage 2 is &quot;let's use polyfills and transpilers to play with it&quot;,
stage 3 is &quot;let's let browsers implement it and see how it goes&quot;,
stage 4 is &quot;now it's javascript&quot;." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">Stage 0 - Strawman（展示阶段）
Stage 1 - Proposal（征求意见阶段）
Stage 2 - Draft（草案阶段）
Stage 3 - Candidate（候选人阶段）
Stage 4 - Finished（定案阶段）

Stage 0 is "i've got a crazy idea",
stage 1 is "this idea might not be stupid",
stage 2 is "let's use polyfills and transpilers to play with it",
stage 3 is "let's let browsers implement it and see how it goes",
stage 4 is "now it's javascript".</code></pre>
<h3 id="articleHeader90">babel-polyfill 和 transform-runtime</h3>
<ul>
<li>
<p>作用：实现浏览器对不支持API的兼容（兼容旧环境、填补）</p>
<ul><li>在低版本浏览器中使用高级的ES6或ES7的方法或函数，比如：<code>'abc'.padStart(10)</code>
</li></ul>
</li>
<li><a href="https://babeljs.io/docs/usage/polyfill/#usage-in-node-browserify-webpack" rel="nofollow noreferrer" target="_blank">方式一 polyfill</a></li>
<li><a href="https://babeljs.io/docs/plugins/transform-runtime/" rel="nofollow noreferrer" target="_blank">方式二 transform-runtime</a></li>
<li>方式一：<code>npm i -S babel-polyfill</code>
</li>
<li>
<p>方式二：<code>npm i -D babel-plugin-transform-runtime</code> 和 <code>npm i -S babel-runtime</code></p>
<ul><li>注意：babel-runtime包中的代码会被打包到你的代码中（-S）</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="区别：
polyfill 所有兼容性问题，都可以通过polyfill解决（包括：实例方法）、污染全局环境
runtime  除了实例方法以外，其他兼容新问题都能解决、不污染全局环境

polyfill：如果想要支持全局对象（比如：`Promise`）、静态方法（比如：`Object.assign`）或者**实例方法**（比如：`String.prototype.padStart`）等，那么就需要使用`babel-polyfill`

babel-runtime ：提供了兼容旧环境的函数，使用的时候，需要我们自己手动引入
  比如： const Promise = require('babel-runtime/core-js/promise')
  存在的问题：
    1 手动引入太繁琐
    2 多个文件引入同一个helper（定义），造成代码重复，增加代码体积
babel-plugin-transform-runtime：
    1 自动引入helper（比如，上面引入的 Promise）
    2 babel-runtime提供helper定义，引入这个helper即可使用，避免重复
    3 依赖于 babel-runtime 插件

transform-runtime插件的使用：
  直接在 .bablerc 文件中，添加一个 plugins 的配置项即可！！！
  &quot;plugins&quot;: [
    &quot;transform-runtime&quot;
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">区别：
polyfill 所有兼容性问题，都可以通过polyfill解决（包括：实例方法）、污染全局环境
runtime  除了实例方法以外，其他兼容新问题都能解决、不污染全局环境

polyfill：如果想要支持全局对象（比如：`Promise`）、静态方法（比如：`Object.assign`）或者**实例方法**（比如：`String.prototype.padStart`）等，那么就需要使用`babel-polyfill`

babel-runtime ：提供了兼容旧环境的函数，使用的时候，需要我们自己手动引入
  比如： const Promise = require('babel-runtime/core-js/promise')
  存在的问题：
    1 手动引入太繁琐
    2 多个文件引入同一个helper（定义），造成代码重复，增加代码体积
babel-plugin-transform-runtime：
    1 自动引入helper（比如，上面引入的 Promise）
    2 babel-runtime提供helper定义，引入这个helper即可使用，避免重复
    3 依赖于 babel-runtime 插件

transform-runtime插件的使用：
  直接在 .bablerc 文件中，添加一个 plugins 的配置项即可！！！
  "plugins": [
    "transform-runtime"
  ]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  babel-polyfill 的使用步骤：
  1 main.js
*/
// 第一行引入
require(&quot;babel-polyfill&quot;)

var s = 'abc'.padStart(4)
console.log(s)


// 2 webpack.config.js 配置
module.exports = {
  entry: ['babel-polyfill', './js/main.js']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
  babel-polyfill 的使用步骤：
  1 main.js
*/</span>
<span class="hljs-comment">// 第一行引入</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-polyfill"</span>)

<span class="hljs-keyword">var</span> s = <span class="hljs-string">'abc'</span>.padStart(<span class="hljs-number">4</span>)
<span class="hljs-built_in">console</span>.log(s)


<span class="hljs-comment">// 2 webpack.config.js 配置</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">'babel-polyfill'</span>, <span class="hljs-string">'./js/main.js'</span>]
}</code></pre>
<h3 id="articleHeader91">总结</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel-core babel核心包

babel-loader 用来解析js文件

babel-preset-* 新ES语法的解析和转换

transform-runtime / babel-polyfill 兼容旧浏览器，到达支持新API目的

// 判断浏览器是否兼容 padStart 这个 API
if (!String.prototype.padStart) {
  // 如果不兼容, 就自己模拟 padStart的功能实现一份
  String.prototype.padStart = function padStart(targetLength,padString) {
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">babel-core babel核心包

babel-loader 用来解析js文件

babel-preset-* 新ES语法的解析和转换

transform-runtime / babel-polyfill 兼容旧浏览器，到达支持新API目的

// 判断浏览器是否兼容 padStart 这个 API
if (!String.prototype.padStart) {
  // 如果不兼容, 就自己模拟 padStart的功能实现一份
  String.prototype.padStart = function padStart(targetLength,padString) {
  }
}</code></pre>
<h2 id="articleHeader92">vue单文件组件</h2>
<ul>
<li><a href="https://vue-loader.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-loader</a></li>
<li>single-file components(单文件组件)</li>
<li>后缀名：<code>.vue</code>，该文件需要被预编译后才能在浏览器中使用</li>
<li>注意：单文件组件依赖于两个包 <strong>vue-loader</strong> / <strong>vue-template-compiler</strong>
</li>
<li>安装：<code>npm i -D vue-loader vue-template-compiler</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- App.vue 示例代码： -->
<template>
  <div>
    <h1>VUE 单文件组件示例 -- App.vue</h1>
    <p>这是 模板内容</p>
  </div>
</template>

<script>
  // 组件中的逻辑代码
  export default {}
</script>

<style>
/* 组件样式 */
h1 {
  color: red;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- App.vue 示例代码： --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>VUE 单文件组件示例 -- App.vue<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是 模板内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">// 组件中的逻辑代码</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-comment">/* 组件样式 */</span>
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js 配置：
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js 配置：</span>
<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>
    }
  ]
}</code></pre>
<h3 id="articleHeader93">使用单文件组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* main.js */

import Vue from 'vue'
// 导入 App 组件
import App from './App.vue'

const vm = new Vue({
  el: '#app',
  // 通过 render 方法，渲染App组件
  render: c => c(App)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* main.js */</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">// 导入 App 组件</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

<span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-comment">// 通过 render 方法，渲染App组件</span>
  render: <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c(App)
})</code></pre>
<h3 id="articleHeader94">单文件组件使用步骤</h3>
<ul>
<li>1 安装：<code>npm i -D vue-loader vue-template-compiler</code>
</li>
<li>
<p>2 在 <code>webpack.config.js</code> 中配置 <code>.vue</code> 文件的loader</p>
<ul><li><code>{ test: /\.vue$/, use: 'vue-loader' }</code></li></ul>
</li>
<li>3 创建 <code>App.vue</code> 单文件组件，注意：App可以是任意名称</li>
<li>4 在 <code>main.js</code> 入口文件中，导入 <code>vue</code> 和 <code>App.vue</code>组件，通过 render 将组件与实例挂到一起</li>
</ul>
<h3 id="articleHeader95">单文件组件+路由</h3>
<ul>
<li><a href="https://cn.vuejs.org/v2/api/#Vue-use" rel="nofollow noreferrer" target="_blank">vue - Vue.use</a></li>
<li><a href="https://cn.vuejs.org/v2/guide/plugins.html#" rel="nofollow noreferrer" target="_blank">Vue.use 和 路由</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'

// ------------- vue路由配置 开始 --------------
import Home from './components/home/Home.vue'
import Login from './components/login/Login.vue'

// 1 导入 路由模块
import VueRouter from 'vue-router'
// 2 ** 调用use方法使用插件 **
Vue.use(VueRouter)
// 3 创建路由对象
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})

// ------------- vue路由配置 结束 --------------

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  // 4 挂载到 vue 实例中
  router
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

<span class="hljs-comment">// ------------- vue路由配置 开始 --------------</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home/Home.vue'</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/login/Login.vue'</span>

<span class="hljs-comment">// 1 导入 路由模块</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-comment">// 2 ** 调用use方法使用插件 **</span>
Vue.use(VueRouter)
<span class="hljs-comment">// 3 创建路由对象</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/home'</span>, <span class="hljs-attr">component</span>: Home },
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>, <span class="hljs-attr">component</span>: Login }
  ]
})

<span class="hljs-comment">// ------------- vue路由配置 结束 --------------</span>

<span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c(App),
  <span class="hljs-comment">// 4 挂载到 vue 实例中</span>
  router
})</code></pre>
<h2 id="articleHeader96">Mint-UI</h2>
<ul>
<li>基于 Vue.js 的移动端组件库</li>
<li><a href="http://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint-UI</a></li>
</ul>
<h3 id="articleHeader97">快速开始</h3>
<ul><li>安装：<code>npm i -S mint-ui</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1 导入 mint-ui模块
import MintUI from 'mint-ui'
// 2 导入 样式
import 'mint-ui/lib/style.css'
// 3 注册插件
Vue.use(MintUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1 导入 mint-ui模块</span>
<span class="hljs-keyword">import</span> MintUI <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>
<span class="hljs-comment">// 2 导入 样式</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'mint-ui/lib/style.css'</span>
<span class="hljs-comment">// 3 注册插件</span>
Vue.use(MintUI)</code></pre>
<h2 id="articleHeader98">MUI</h2>
<ul>
<li><a href="http://dev.dcloud.net.cn/mui/" rel="nofollow noreferrer" target="_blank">MUI</a></li>
<li>MUI 也是移动端的UI库</li>
<li>使用：从github下载包，找到dist文件夹，只需要导入样式即可</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只需要导入 MUI的样式 即可，根据MUI的例子，直接使用HTML结果即可
// 导入样式
import './lib/mui/css/mui.min.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 只需要导入 MUI的样式 即可，根据MUI的例子，直接使用HTML结果即可</span>
<span class="hljs-comment">// 导入样式</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./lib/mui/css/mui.min.css'</span></code></pre>
<h2 id="articleHeader99">ElementUI</h2>
<ul>
<li>这是PC端的UI组件库</li>
<li>安装：<code>npm i -S element-ui</code>
</li>
<li><a href="http://element.eleme.io/#/zh-CN/component/quickstart" rel="nofollow noreferrer" target="_blank">饿了吗 - ElementUI</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;es2015&quot;, { &quot;modules&quot;: false }], &quot;stage-0&quot;
  ],

  &quot;plugins&quot;: [
    [&quot;component&quot;, [
      {
        &quot;libraryName&quot;: &quot;mint-ui&quot;,
        &quot;style&quot;: true
      },
      {
        &quot;libraryName&quot;: &quot;element-ui&quot;,
        &quot;styleLibraryName&quot;: &quot;theme-default&quot;
      }
    ]]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"presets"</span>: [
    [<span class="hljs-string">"es2015"</span>, { <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span> }], <span class="hljs-string">"stage-0"</span>
  ],

  <span class="hljs-string">"plugins"</span>: [
    [<span class="hljs-string">"component"</span>, [
      {
        <span class="hljs-string">"libraryName"</span>: <span class="hljs-string">"mint-ui"</span>,
        <span class="hljs-string">"style"</span>: <span class="hljs-literal">true</span>
      },
      {
        <span class="hljs-string">"libraryName"</span>: <span class="hljs-string">"element-ui"</span>,
        <span class="hljs-string">"styleLibraryName"</span>: <span class="hljs-string">"theme-default"</span>
      }
    ]]
  ]
}</code></pre>
<h2 id="articleHeader100">Webpack 发布项目</h2>
<ul>
<li><a href="https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html" rel="nofollow noreferrer" target="_blank">webpack 打包的各种坑</a></li>
<li>
<code>webpack</code> 命令能够生成dist目录到磁盘中，最终，把打包后的代码，部署服务器中去</li>
<li>
<code>webpack-dev-server</code> 仅是在内存中生成的文件，并没有写到磁盘中，所以，只能在开发期间使用</li>
</ul>
<h3 id="articleHeader101">创建项目发布配置文件</h3>
<ul>
<li>开发期间配置文件：<code>webpack.config.js</code>
</li>
<li>项目发布配置文件：<code>webpack.prod.js</code> （文件名称非固定 production 生产环境）</li>
<li>命令：<code>webpack --config webpack.prod.js</code> 指定配置文件名称运行webpack</li>
<li>参数：<code>--display-error-details</code> 用于显示webpack打包的错误信息</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* package.json */

&quot;scripts&quot;: {
  &quot;build&quot;: &quot;webpack --config webpack.prod.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">/* package.json */

<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack --config webpack.prod.js"</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 在项目根目录中创建 webpack.prod.js 文件
2 在 package.json 中, 配置一个 scripts
3 在 终端中 通过 npm run build 对项目进行打包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">1 在项目根目录中创建 webpack.prod.js 文件
2 在 package.json 中, 配置一个 scripts
3 在 终端中 通过 npm run build 对项目进行打包</code></pre>
<h3 id="articleHeader102">打包处理过程</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 删除掉 devServer 相关的配置项
2 将图片和字体文件输出到指定的文件夹中
3 自动删除dist目录
4 分离第三方包（将使用的vue等第三方包抽离到 vender.js 中）
5 压缩混淆JS 以及 指定生成环境
6 抽取和压缩CSS文件
7 压缩HTML页面
8 配合vue的异步组件，实现按需加载功能" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">1 删除掉 devServer 相关的配置项
2 将图片和字体文件输出到指定的文件夹中
3 自动删除dist目录
4 分离第三方包（将使用的vue等第三方包抽离到 vender.js 中）
5 压缩混淆JS 以及 指定生成环境
6 抽取和压缩CSS文件
7 压缩HTML页面
8 配合vue的异步组件，实现按需加载功能</code></pre>
<h3 id="articleHeader103">处理图片路径</h3>
<ul>
<li>注意：如果<code>limit</code>小于比图片大，那么图片将被转化为<code>base64</code>编码格式</li>
<li><a href="https://github.com/webpack-contrib/file-loader" rel="nofollow noreferrer" target="_blank">name参数介绍</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.prod.js */
// 处理URL路径的loader

{
  test: /\.(jpg|png|gif|bmp|jpeg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'images/[hash:7].[ext]' // 作用：将图片输出到images文件夹中，文件名采用7位的哈希值（MD5），并且保持原来的图片文件扩展名

      // name：指定文件输出路径和输出文件命令规则
      // [hash:7]：表示使用7位哈希值代表文件名称
      // [ext]：表示保持文件原有后缀名
      // name: 'imgs/img-[hash:7].[ext]'
    }
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.prod.js */</span>
<span class="hljs-comment">// 处理URL路径的loader</span>

{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(jpg|png|gif|bmp|jpeg)$/</span>,
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'images/[hash:7].[ext]'</span> <span class="hljs-comment">// 作用：将图片输出到images文件夹中，文件名采用7位的哈希值（MD5），并且保持原来的图片文件扩展名</span>

      <span class="hljs-comment">// name：指定文件输出路径和输出文件命令规则</span>
      <span class="hljs-comment">// [hash:7]：表示使用7位哈希值代表文件名称</span>
      <span class="hljs-comment">// [ext]：表示保持文件原有后缀名</span>
      <span class="hljs-comment">// name: 'imgs/img-[hash:7].[ext]'</span>
    }
  }
},</code></pre>
<h3 id="articleHeader104">自动删除dist目录</h3>
<ul>
<li>安装：<code>npm i -D clean-webpack-plugin</code>
</li>
<li>作用: 每次打包之前, 删除上一次打包的dist目录</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.prod.js */
const cleanWebpackPlugin = require('clean-webpack-plugin')

plugins: [
  // 创建一个删除文件夹的插件，删除dist目录
  new cleanWebpackPlugin(['./dist'])
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.prod.js */</span>
<span class="hljs-keyword">const</span> cleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>)

plugins: [
  <span class="hljs-comment">// 创建一个删除文件夹的插件，删除dist目录</span>
  <span class="hljs-keyword">new</span> cleanWebpackPlugin([<span class="hljs-string">'./dist'</span>])
]</code></pre>
<h3 id="articleHeader105">分离第三方包</h3>
<ul><li>
<p>目的：将公共的第三方包，抽离为一个单独的包文件，这样防止重复打包！</p>
<ul>
<li>例如：main.js、router、vuex中都引入了vue，不分离的话，vue会被打包3次</li>
<li>抽离后, vue文件只会被打包一次, 用到的地方仅仅是引用</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.prod.js */

// 1 入口 -- 打包文件的入口
entry: {
  // 项目代码入口
  app: path.join(__dirname, './src/js/main.js'),
  // 第三方包入口
  vendor: ['vue', 'vue-router', 'axios']
},

output: {
  // 2 修改输出文件路径和命名规则
  filename: 'js/[name].[chunkhash].js',
},

plugins: [
  // 3 抽离第三方包
  new webpack.optimize.CommonsChunkPlugin({
    // 将 entry 中指定的 ['vue', 'vue-router', 'axios'] 打包到名为 vendor 的js文件中
    // 第三方包入口名称，对应 entry 中的 vendor 属性
    name: 'vendor',
  }),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.prod.js */</span>

<span class="hljs-comment">// 1 入口 -- 打包文件的入口</span>
entry: {
  <span class="hljs-comment">// 项目代码入口</span>
  app: path.join(__dirname, <span class="hljs-string">'./src/js/main.js'</span>),
  <span class="hljs-comment">// 第三方包入口</span>
  vendor: [<span class="hljs-string">'vue'</span>, <span class="hljs-string">'vue-router'</span>, <span class="hljs-string">'axios'</span>]
},

<span class="hljs-attr">output</span>: {
  <span class="hljs-comment">// 2 修改输出文件路径和命名规则</span>
  filename: <span class="hljs-string">'js/[name].[chunkhash].js'</span>,
},

<span class="hljs-attr">plugins</span>: [
  <span class="hljs-comment">// 3 抽离第三方包</span>
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-comment">// 将 entry 中指定的 ['vue', 'vue-router', 'axios'] 打包到名为 vendor 的js文件中</span>
    <span class="hljs-comment">// 第三方包入口名称，对应 entry 中的 vendor 属性</span>
    name: <span class="hljs-string">'vendor'</span>,
  }),
]</code></pre>
<h3 id="articleHeader106">压缩混淆JS</h3>
<ul><li>注意：<strong>uglifyjs 无法压缩ES6的代码</strong>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  // 优化代码
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v0.4.6
  new webpack.optimize.UglifyJsPlugin({
    // 压缩
    compress: {
      // 移除警告
      warnings: false
    }
  }),

  // 指定环境为生产环境：vue会根据这一项启用压缩后的vue文件
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-comment">// 优化代码</span>
  <span class="hljs-comment">// https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v0.4.6</span>
  <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
    <span class="hljs-comment">// 压缩</span>
    compress: {
      <span class="hljs-comment">// 移除警告</span>
      warnings: <span class="hljs-literal">false</span>
    }
  }),

  <span class="hljs-comment">// 指定环境为生产环境：vue会根据这一项启用压缩后的vue文件</span>
  <span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">'process.env'</span>: {
      <span class="hljs-string">'NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'production'</span>)
    }
  })
]</code></pre>
<h3 id="articleHeader107">抽取和压缩CSS文件</h3>
<ul>
<li>安装：抽离 <code>npm i -D extract-text-webpack-plugin</code>
</li>
<li>安装：压缩 <code>npm i -D optimize-css-assets-webpack-plugin</code>
</li>
<li><a href="https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/" rel="nofollow noreferrer" target="_blank">webpack 抽离CSS文档</a></li>
<li><a href="https://www.npmjs.com/package/optimize-css-assets-webpack-plugin" rel="nofollow noreferrer" target="_blank">压缩抽离后的CSS</a></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="压缩和抽离CSS报错的说明：
Error processing file: css/style.css
postcss-svgo: Error in parsing SVG: Unquoted attribute value

原因：压缩和抽离CSS的插件中只允许 SVG 使用双引号" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">压缩和抽离CSS报错的说明：
Error processing file: css/style.css
postcss-svgo: Error in parsing SVG: Unquoted attribute value

原因：压缩和抽离CSS的插件中只允许 SVG 使用双引号</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.prod.js */

// 分离 css 到独立的文件中
const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// bug描述: 生成后面的css文件中图片路径错误，打开页面找不到图片
// 解决：google搜索 webpack css loader 样式图片路径
output: {
  // ...

  // https://doc.webpack-china.org/configuration/output/#output-publicpath
  // 设置公共路径
  publicPath: '/',
},

module: {
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: &quot;css-loader&quot;
      })
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: ['css-loader', 'sass-loader']
      })
    },
  ]
},
plugins: [
  // 通过插件抽离 css (参数)
  new ExtractTextPlugin(&quot;css/style.css&quot;),
  // 抽离css 的辅助压缩插件
  new OptimizeCssAssetsPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.prod.js */</span>

<span class="hljs-comment">// 分离 css 到独立的文件中</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
<span class="hljs-comment">// 压缩 css 资源文件</span>
<span class="hljs-keyword">const</span> OptimizeCssAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)

<span class="hljs-comment">// bug描述: 生成后面的css文件中图片路径错误，打开页面找不到图片</span>
<span class="hljs-comment">// 解决：google搜索 webpack css loader 样式图片路径</span>
output: {
  <span class="hljs-comment">// ...</span>

  <span class="hljs-comment">// https://doc.webpack-china.org/configuration/output/#output-publicpath</span>
  <span class="hljs-comment">// 设置公共路径</span>
  publicPath: <span class="hljs-string">'/'</span>,
},

<span class="hljs-attr">module</span>: {
  <span class="hljs-attr">rules</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
      <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">"style-loader"</span>,
        <span class="hljs-attr">use</span>: <span class="hljs-string">"css-loader"</span>
      })
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
      <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">"style-loader"</span>,
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'sass-loader'</span>]
      })
    },
  ]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-comment">// 通过插件抽离 css (参数)</span>
  <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"css/style.css"</span>),
  <span class="hljs-comment">// 抽离css 的辅助压缩插件</span>
  <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin()
]</code></pre>
<h3 id="articleHeader108">压缩HTML页面</h3>
<ul><li>详细的配置可以参考<a href="https://github.com/kangax/html-minifier#options-quick-reference" rel="nofollow noreferrer" target="_blank">html-minifier</a>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new htmlWebpackPlugin({
  // 模板页面
  template: path.join(__dirname, './index.html'),

  // 压缩HTML
  minify: {
    // 移除空白
    collapseWhitespace: true,
    // 移除注释
    removeComments: true,
    // 移除属性中的双引号
    removeAttributeQuotes: true
  }
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> htmlWebpackPlugin({
  <span class="hljs-comment">// 模板页面</span>
  template: path.join(__dirname, <span class="hljs-string">'./index.html'</span>),

  <span class="hljs-comment">// 压缩HTML</span>
  minify: {
    <span class="hljs-comment">// 移除空白</span>
    collapseWhitespace: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 移除注释</span>
    removeComments: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 移除属性中的双引号</span>
    removeAttributeQuotes: <span class="hljs-literal">true</span>
  }
}),</code></pre>
<h3 id="articleHeader109">vue配合webpack实现路由按需加载</h3>
<ul>
<li><a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">Vue 路由懒加载</a></li>
<li><a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">Vue 异步组件</a></li>
<li><a href="http://www.cnblogs.com/zhanyishu/p/6587571.html" rel="nofollow noreferrer" target="_blank">Vue 组件懒加载浅析</a></li>
<li>[Vue.js路由懒加载[译]](<a href="http://www.jianshu.com/p/abb02075b56b)" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/abb0...</a>
</li>
</ul>
<h4>步骤</h4>
<ul><li>1 修改组件的引用方式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方式一: require.ensure()
const NewsList = r => require.ensure([], () => r(require('../components/news/newslist.vue')), 'news')

// 方式二: import() -- 推荐
// 注意：/* webpackChunkName: &quot;newsinfo&quot; */ 是一个特殊的语法，表示生成js文件的名称
const NewsInfo = () => import(/* webpackChunkName: &quot;newsinfo&quot; */ '../components/news/newsinfo.vue')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 方式一: require.ensure()</span>
<span class="hljs-keyword">const</span> NewsList = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], () =&gt; r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../components/news/newslist.vue'</span>)), <span class="hljs-string">'news'</span>)

<span class="hljs-comment">// 方式二: import() -- 推荐</span>
<span class="hljs-comment">// 注意：/* webpackChunkName: "newsinfo" */ 是一个特殊的语法，表示生成js文件的名称</span>
<span class="hljs-keyword">const</span> NewsInfo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "newsinfo" */</span> <span class="hljs-string">'../components/news/newsinfo.vue'</span>)</code></pre>
<ul><li>2 修改 webpack 配置文件的output</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  // ------添加 chunkFilename, 指定输出js文件的名称------
  chunkFilename: 'js/[name].[chunkhash].js',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">output: {
  <span class="hljs-comment">// ------添加 chunkFilename, 指定输出js文件的名称------</span>
  chunkFilename: <span class="hljs-string">'js/[name].[chunkhash].js'</span>,
},</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue开发看这篇文章就够了

## 原文链接
[https://segmentfault.com/a/1190000012692321](https://segmentfault.com/a/1190000012692321)

