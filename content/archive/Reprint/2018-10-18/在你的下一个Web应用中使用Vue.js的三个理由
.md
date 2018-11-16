---
title: 在你的下一个Web应用中使用Vue.js的三个理由
hidden: true
categories: [reprint]
slug: d3f22047
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h4>Vue.js是那么地易上手，它在提供了大量开箱即用的功能的同时也提供了良好的性能。请继续阅读以下事例及代码片段以便更加了解Vue.js。</h4>
<p>选择一个JavaScript框架真是太难了——因为有太多的框架可以供我们使用，并且它们之间的差距并不是很明显。如果你认为生产率（“我开发起来有多快”）和性能（“我的网页性能如何”）是最重要的两点的话，就让我展示一下为什么Vue.js是一个非常可靠的构建网页以及SPA（单页Web应用）的框架吧。</p>
<h2>1) 组件库基于HTML/CSS和JS，使其易于入门</h2>
<p>你需要做的第一件事就是设置你的环境。Vue.js非常容易上手，并不一定需要像Webpack这样的构建工具。你所要做的就是在标签中进行导入：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>首先，我们要去创建一个简单的组件。其目的是为了展示一下你写的模版和JavaScript代码是如何连接起来的。</p>
<h3>如何去创建你的第一个组件</h3>
<p>你有两种方式去创建一个组件，让我们先试试简单的那个方法。它只是一个HTML和JavaScript的一种简单格式的组合。</p>
<p><strong>app.js</strong></p>
<pre><code class="hljs lasso"><span class="hljs-built_in">var</span> app = <span class="hljs-literal">new</span> Vue({
 el: <span class="hljs-string">'#app'</span>,
 <span class="hljs-built_in">data</span>: {
   name: <span class="hljs-string">'James'</span>
 }
})

</code></pre><p><strong>app.html</strong></p>
<pre><code class="hljs applescript">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span>&gt;
 Hello &lt;input type=<span class="hljs-string">"text"</span> value={{ <span class="hljs-built_in">name</span> }} /&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

</code></pre><p><strong>app.css</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-id">#app</span> <span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#121212</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}

</code></pre><p>这几乎就是你创建第一个应用所需的全部。</p>
<p>如你所见，我们通过id为app的这个元素保存了模版和JavaScript之间的对应关系。然后我们仅仅提供了数据，你就能看到这些数据在你的HTML中自动绑定并渲染。</p>
<h3>如何连接数据和其模版？</h3>
<p>Vue.js 设计了一个双向绑定系统，这意味着你可以通过JavaScript或者模版的其中任意一种方式改变数据。让我们考虑一下上面的代码：如果你改变了输入框中的内容，它会自动地更新你在JavaScript中对应的变量。同样的，如果你在JavaScript文件中改变了数据，它会在你的模版中渲染出改变后的数值。</p>
<h3>一种Web组件的共享方法</h3>
<p>Vue.js 非常依赖模版声明，这能确保你的代码在第一眼看到的时候就能被理解。</p>
<p>它也是你可以获得的最接近 <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">Web自定义元素标准</a> 的模版，并且它没有繁杂的polyfill，在老式浏览器中也没有糟糕的性能。你可以在一些Web组件实现（例如 Polymer）中找到它。</p>
<h2>2) 路由及数据管理等基本功能已被官方库支持</h2>
<p>Vue.js包含的核心模块可以构建我们所创建的组件，但它还包括些组由Vue.js团队自己构建/维护的自定义库，例如管理路由的vue-router，管理数据的Vuex， 可以迅速创建一个新项目的脚手架vue-cli等。</p>
<h3>如何创建一个路由</h3>
<p>对于任何Web APP，路由都是重点之一。你可以放心的使用vue-router，可以以非常简洁的方式声明并创建所有的路由，同时只需要在组件中使用几行代码来配置动态路由的参数。</p>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">import</span> Page <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/page'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> VueRouter({
  [
    { path: <span class="hljs-string">'/page/:uid'</span>, component: Page }
  ]
});

</code></pre><h3>组件间如何通信？</h3>
<p>Web APP中的另一个基本功能是组件之间的通信，以及管理数据的方式。</p>
<p>Vuex是一个受Redux和Elm架构启发而诞生的模块。它提供了一种非常清晰的方式来处理组件中的操作并将数据传递给任何受它管辖组件。</p>
<pre><code class="hljs pf">const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    doc: null
  },
  mutations: {
    <span class="hljs-built_in">set</span>Document(<span class="hljs-keyword">state</span>, doc) {
      <span class="hljs-keyword">state</span>.doc = doc
    }
  },
  actions: {
    async queryDocument({ commit }, { customType, uid }) {
      commit('<span class="hljs-built_in">set</span>Document', await Prismic.getByUID(customType, uid))
    }
  }
})

</code></pre><h3>如何创建一个将Vuex和vue-router联系起来的组件</h3>
<p>现在，是时候去让所有功能运行在一个简单的组件中了。</p>
<pre><code class="hljs lisp">var app = new Vue({
 el: '#page,
 beforeRouteUpdate(<span class="hljs-name">to</span>, from, next) {
  store.dispatch('queryDocument', { customType: 'homepage', uid: to.params.uid })
  .then(<span class="hljs-name">next</span>)
})

</code></pre><p>beforeRouteUpdate只是一个组件声明周期钩子，用于在组件切换路由之后应执行的代码。</p>
<h3>使用vue-cli快速创建项目</h3>
<p>vue-cli是一个命令行工具，可以使用其已经配置好的构建工具快速创建一个简单的项目。</p>
<p>在扩展名为.vue的文件中书写组件的方式非常好用，它允许你将HTML，CSS和JavaScript放在同一个文件中，并且确保其在正确的作用域内。</p>
<p>它对你写JavaScript代码也很有用，因为你可以使用像babel这样的工具来使用JS中的新语法，比如async / await。</p>
<p>你可以在 <a href="https://cli.vuejs.org">Vue.js官方文档</a> 中寻找到更多帮你起步的知识。</p>
<h2>3) 虚拟DOM技术确保页面快速渲染，进而使得加载时间变短</h2>
<h3>30KB!</h3>
<p>Vue.js 核心模块，路由器和Vuex，Vue.js加起来通过gzip压缩后只有大约 30 KB 。</p>
<p>最小的占用空间也就意味着较短的加载时间，这意味着用户可以更快地使用你的Web APP，同时也可以得到更好的Google爬虫的访问速度评估值。</p>
<h3>虚拟 DOM!</h3>
<p>Vue.js也从ReactJS中获得了灵感，从版本2.0开始实现了虚拟 DOM技术。虚拟DOM简单来说是一种 在每次改变状态时，将其与实际DOM进行比对，同时在内存中生成DOM更新后版本的方法，因此你只需要更新你所改变的部分而不是重新渲染整个页面。</p>
<h3>基准测试</h3>
<p>正如以下基准测试的数据，Vue.js在各方面都提供了非常好的性能：</p>
<p><img src="https://p0.ssl.qhimg.com/t01aafa835ef482e90b.png" alt=""></p>
<p><strong>运行时间（毫秒） ± 标准差</strong></p>
<p><img src="https://p0.ssl.qhimg.com/t015ef8a7638bba08e1.png" alt=""></p>
<p><strong>内存消耗（以MB为单位）</strong></p>
<p>(来源: <a href="https://www.stefankrause.net/js-frameworks-benchmark7/table.html">third-party benchmarks</a> by Stefan Krause)</p>
<h2>如何管理Vue.js项目中的文件</h2>
<p>在Prismic，我们认为Vue.js是构建复杂Web应用程序的一种非常平易近人的框架，可以通过其API很轻松地集成外部的工具。</p>
<p>如果您有兴趣将内容管理系统集成到你的Vue.js项目中——以便非技术的作者和文章编辑可以在他们所熟悉的环境下编辑网站的内容的话——请查看Vue.js的官方完整文档以及插件库和启动项目等。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/3-reasons-to-use-vue-js-in-your-next-web-project](https://www.zcfy.cc/article/3-reasons-to-use-vue-js-in-your-next-web-project)
原文标题: 在你的下一个Web应用中使用Vue.js的三个理由

本文仅用于学习、研究和交流目的，欢迎非商业转载。转载请注明出处、完整链接。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
