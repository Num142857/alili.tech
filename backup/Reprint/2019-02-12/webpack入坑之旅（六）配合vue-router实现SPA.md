---
title: 'webpack入坑之旅（六）配合vue-router实现SPA' 
date: 2019-02-12 2:30:12
hidden: true
slug: 275aclkqks
categories: [reprint]
---

{{< raw >}}

                    
<p>这是一系列文章，此系列所有的练习都存在了我的github仓库中<a href="https://github.com/guowenfh/vue-webpack" rel="nofollow noreferrer" target="_blank">vue-webpack</a>，在本人有了新的理解与认识之后,会对文章有不定时的更正与更新。下面是目前完成的列表：</p>
<ul>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（一）不是开始的开始</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-02-deploy/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（二）loader入门</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-03-config/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（三）webpack.config入门</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-04-custom/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（四）扬帆起航</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/25/vue-webpack-05-vue/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（五）加载vue单文件组件</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/28/vue-webpack-06-router/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（六）配合vue-router实现SPA</a></p></li>
</ul>
<p>在上面的练习当中我们已经成功的加载了一个<code>.vue</code>格式的单文件组件，并且实现了在使用vue情况下的自动刷新。</p>
<p>但是我们最终的目的还是要实现单页面应用程序，这个时候我们就必不可少的需要使用到路由管理器来进行SPA的开发，vue官方为我们提供了一个官方库<a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vue-router</a>，并且配有对应的<a href="http://vuejs.github.io/vue-router/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">中文文档</a>。关于里面的内容大家自行前去观看。在这里，只会把我们需要的东西拿出来讲。</p>
<h2 id="articleHeader0">vue组件</h2>
<blockquote><p><a href="http://cn.vuejs.org/guide/components.html" rel="nofollow noreferrer" target="_blank">官网对于组件讲解</a></p></blockquote>
<p>在<code>Vue</code>中定义一个组件非常简单，只需要一对<strong>自定义标签</strong>，在其中填入内容就可以进行我们的组件编写了，然后使用<code>Vue.component()</code>去注册我们的组件下面来看一个例子，来直观的看看vue的组件。</p>
<h3 id="articleHeader1">组件入门</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script src=&quot;js/vue.js&quot;></script>
<body>
    <div id=&quot;app&quot;>
        <my-component></my-component>
        <!-- 自定义标签作为组件名称 -->
        <my-component></my-component>
        <!-- 复用 -->
    </div>
    <script>
        // 定义并且注册组件
        // 在官方的示例中使用 Vue.extend({})先注册了一个定义模板，再引用，看个人喜好吧
        Vue.component(&quot;my-component&quot;, {
            template:&quot;<h2>hello Vue component</h2>&quot;
        })
        // 创建根实例
        // 在这里 定义并且注册组件 必须创建根实例前，不然会报错，因为解析顺序的问题？
        new Vue({
            el:&quot;#app&quot;
        });
    </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 自定义标签作为组件名称 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 复用 --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">// 定义并且注册组件</span>
        <span class="hljs-comment">// 在官方的示例中使用 Vue.extend({})先注册了一个定义模板，再引用，看个人喜好吧</span>
        Vue.component(<span class="hljs-string">"my-component"</span>, {
            template:<span class="hljs-string">"&lt;h2&gt;hello Vue component&lt;/h2&gt;"</span>
        })
        <span class="hljs-comment">// 创建根实例</span>
        <span class="hljs-comment">// 在这里 定义并且注册组件 必须创建根实例前，不然会报错，因为解析顺序的问题？</span>
        <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">"#app"</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>上面就是最简单的定义组件的方式，<strong><code>template</code>属性中写的东西</strong>:就是<code>&lt;my-component&gt;</code>这个自定义标签渲染后展现出来的样式，这里渲染为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <h2>hello Vue component</h2>
    <h2>hello Vue component</h2>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>hello Vue component<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>hello Vue component<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader2">使用template标签</h3>
<p>在上面这段代码中组件内的内容都被写在<code>template</code>属性中，如果组件中的内容继续增加，一堆的引号和加号来拼接这些字符串简直就是噩梦。所以Vue 引入了<code>template</code>标签（html5定义的，浏览器默认不去解析里面的内容）。<strong><code>&lt;template&gt; 不能用在 &lt;table&gt; 内</code></strong>下面来看看它的使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script src=&quot;js/vue.js&quot;></script>
<body>
<!-- 使用 template 并且添加选择器(只能使用id)-->
    <template id=&quot;myTemp&quot;>
        <h2>This is Template </h2>
        <p>add ...</p>
    </template>
    <div id=&quot;app&quot;>
        <my-component></my-component>
        <my-component></my-component>
    </div>

    <script>
        Vue.component(&quot;my-component&quot;, {
            template:&quot;#myTemp&quot;//对应上面定义的template标签中的选择器
        })
        new Vue({
            el:&quot;#app&quot;
        });
    </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 使用 template 并且添加选择器(只能使用id)--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myTemp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>This is Template <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>add ...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">"my-component"</span>, {
            template:<span class="hljs-string">"#myTemp"</span><span class="hljs-comment">//对应上面定义的template标签中的选择器</span>
        })
        <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">"#app"</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>可以看到在注册组件中，可以<code>template</code>可以使用选择器来获取到上面我们<code>&lt;template&gt;</code>标签中的内容。所以这里应该会被渲染为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <h2>This is Template </h2>
    <p>add ...</p>
    <h2>This is Template </h2>
    <p>add ...</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>This is Template <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>add ...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>This is Template <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>add ...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>组件的基础介绍就到这，更多详细内容请移步<a href="http://cn.vuejs.org/guide/" rel="nofollow noreferrer" target="_blank">官网</a></p>
<h2 id="articleHeader3">vue-router</h2>
<p>刚刚已经对于vue的组件有了一定的了解。现在来结合vue-router，来进行一下动态的切换。</p>
<p>首先是安装，如果使用npm的形式的话，直接运行<code>npm install vue-router --save</code>,就可以看到<code>vue-router</code>，已经被添加到了项目依赖中。直接上<code>ES6</code>的语法来进行引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import VueRouter from &quot;vue-router&quot;;
Vue.use(VueRouter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-router"</span>;
Vue.use(VueRouter);</code></pre>
<h3 id="articleHeader4">起步</h3>
<p>其实这一部分<code>vue-router</code>的<a href="http://vuejs.github.io/vue-router/zh-cn/basic.html" rel="nofollow noreferrer" target="_blank">中文文档</a>中已经讲的非常详细了。。在这里与它不同的是它用的<code>CommonJS</code>的规范来进行模块安装，而我使用ES6的import，有兴趣自己去看- -。其他的内容我就直接扒下来了。</p>
<p>html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <h1>Hello App!</h1>
  <p>
    <!-- 使用指令 v-link 进行导航。 -->
    <a v-link=&quot;{ path: '/foo' }&quot;>Go to Foo</a>
    <a v-link=&quot;{ path: '/bar' }&quot;>Go to Bar</a>
  </p>
  <!-- 路由外链 -->
  <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello App!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 使用指令 v-link 进行导航。 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ path: '/foo' }"</span>&gt;</span>Go to Foo<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ path: '/bar' }"</span>&gt;</span>Go to Bar<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 路由外链 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>javascript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义组件
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})
var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})
// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({})
// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()
// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">// 定义组件</span>
<span class="hljs-keyword">var</span> Foo = Vue.extend({
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;This is foo!&lt;/p&gt;'</span>
})
<span class="hljs-keyword">var</span> Bar = Vue.extend({
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;This is bar!&lt;/p&gt;'</span>
})
<span class="hljs-comment">// 路由器需要一个根组件。</span>
<span class="hljs-comment">// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板</span>
<span class="hljs-keyword">var</span> App = Vue.extend({})
<span class="hljs-comment">// 创建一个路由器实例</span>
<span class="hljs-comment">// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置</span>
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter()
<span class="hljs-comment">// 定义路由规则</span>
<span class="hljs-comment">// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend</span>
<span class="hljs-comment">// 创建的组件构造函数，也可以是一个组件选项对象。</span>
<span class="hljs-comment">// 稍后我们会讲解嵌套路由</span>
router.map({
    <span class="hljs-string">'/foo'</span>: {
        <span class="hljs-attr">component</span>: Foo
    },
    <span class="hljs-string">'/bar'</span>: {
        <span class="hljs-attr">component</span>: Bar
    }
})
<span class="hljs-comment">// 现在我们可以启动应用了！</span>
<span class="hljs-comment">// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。</span>
router.start(App, <span class="hljs-string">'#app'</span>)</code></pre>
<p>我个人感觉这部分还是很好理解的，官方也给了一个<a href="http://jsfiddle.net/yyx990803/xyu276sa/" rel="nofollow noreferrer" target="_blank">在线示例应用</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/xyu276sa/" data-typeid="0">点击预览</button>。很好的展现了它的路由切换。</p>
<p>简单的介绍到这，下面最重要的部分到了，看看如何结合我们定义的<code>.vue</code>单文件组件。</p>
<p>首先来看我们的文件目录结构：</p>
<p><span class="img-wrap"><img data-src="http://guowenfh.github.io/images/vue-webpack/01-webpack-vuerouter.jpg" src="https://static.alili.techhttp://guowenfh.github.io/images/vue-webpack/01-webpack-vuerouter.jpg" alt="01-webpack-vuerouter" title="01-webpack-vuerouter" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">定义路由规则</h3>
<p><strong>最主要是<code>main.js</code></strong>的变化，直接在文件中讲解了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入vue以及vue-router
import Vue from &quot;vue&quot;;
import VueRouter from &quot;vue-router&quot;;
Vue.use(VueRouter);
// 引入组件！直接使用es6的语法
import index from './components/app.vue';
import list from './components/list.vue';
import hello from './components/hello.vue';
//开启debug模式
Vue.config.debug = true;
// new Vue(app);//这是上一篇用到的，新建一个vue实例，现在使用vue-router就不需要了。
// 路由器需要一个根组件。
var App = Vue.extend({});
// 创建一个路由器实例
var router = new VueRouter();
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({//定义路由映射
    '/index':{//访问地址
        name:'index',//定义路由的名字。方便使用。
        component:index,//引用的组件名称，对应上面使用`import`导入的组件
        //component:require(&quot;components/app.vue&quot;)//还可以直接使用这样的方式也是没问题的。不过会没有import集中引入那么直观
    },
    '/list': {
        name:'list',
        component: list
    },
});
router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*':&quot;/index&quot;//重定向任意未匹配路径到/index
});
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="js"><span class="hljs-comment">// 引入vue以及vue-router</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-router"</span>;
Vue.use(VueRouter);
<span class="hljs-comment">// 引入组件！直接使用es6的语法</span>
<span class="hljs-keyword">import</span> index <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/app.vue'</span>;
<span class="hljs-keyword">import</span> list <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/list.vue'</span>;
<span class="hljs-keyword">import</span> hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/hello.vue'</span>;
<span class="hljs-comment">//开启debug模式</span>
Vue.config.debug = <span class="hljs-literal">true</span>;
<span class="hljs-comment">// new Vue(app);//这是上一篇用到的，新建一个vue实例，现在使用vue-router就不需要了。</span>
<span class="hljs-comment">// 路由器需要一个根组件。</span>
<span class="hljs-keyword">var</span> App = Vue.extend({});
<span class="hljs-comment">// 创建一个路由器实例</span>
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter();
<span class="hljs-comment">// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend创建的组件构造函数，也可以是一个组件选项对象。</span>
<span class="hljs-comment">// 稍后我们会讲解嵌套路由</span>
router.map({<span class="hljs-comment">//定义路由映射</span>
    <span class="hljs-string">'/index'</span>:{<span class="hljs-comment">//访问地址</span>
        name:<span class="hljs-string">'index'</span>,<span class="hljs-comment">//定义路由的名字。方便使用。</span>
        component:index,<span class="hljs-comment">//引用的组件名称，对应上面使用`import`导入的组件</span>
        <span class="hljs-comment">//component:require("components/app.vue")//还可以直接使用这样的方式也是没问题的。不过会没有import集中引入那么直观</span>
    },
    <span class="hljs-string">'/list'</span>: {
        <span class="hljs-attr">name</span>:<span class="hljs-string">'list'</span>,
        <span class="hljs-attr">component</span>: list
    },
});
router.redirect({<span class="hljs-comment">//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。</span>
    <span class="hljs-string">'*'</span>:<span class="hljs-string">"/index"</span><span class="hljs-comment">//重定向任意未匹配路径到/index</span>
});
<span class="hljs-comment">// 现在我们可以启动应用了！</span>
<span class="hljs-comment">// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。</span>
router.start(App, <span class="hljs-string">'#app'</span>);
</code></pre>
<p>在index.html需要有用于渲染匹配的组件，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div id=&quot;app&quot;>
        <router-view></router-view>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>现在当我们运行 <code>npm start</code> 进入<code>http://localhost:8080/</code>就会自动跳转到<code>http://localhost:8080/#!/index</code>，并且读取里面的内容。</p>
<h3 id="articleHeader6">实现路由跳转</h3>
<p>主要抽出<code>app.vue</code>中的内容来讲解，的内容是：(<code>list.vue</code>里面的内容自行设置查看吧)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
    <h1>姓名："{{"name"}}"</h1>
    <h2>"{{"age"}}"</h2>
    <button @click=&quot;golist&quot;>$route.router.go查看</button>
    <a v-link=&quot;{ name: 'list' }&quot;>v-link查看列表</a>
    <a v-link=&quot;{ name: 'index' }&quot;>回去主页</a>
</div>
</template>
<script>
    export default {//这里是官方的写法，默认导出，ES6
        data () { //ES6，等同于data:function(){}
            return {    //必须使用这样的形式，才能创建出单一的作用域
                name:&quot;guowenfh&quot;,
                age:&quot;21&quot;
            }
        },
        methods :{
            golist () {//方法，定义路由跳转，注意这里必须使用this，不然报错
                this.$route.router.go({name:&quot;list&quot;});
            }
        }
    }
</script>
<style></style>
<!-- 样式自行设置，或者直接看源码就好 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>姓名："{{"name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{"age"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"golist"</span>&gt;</span>$route.router.go查看<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ name: 'list' }"</span>&gt;</span>v-link查看列表<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ name: 'index' }"</span>&gt;</span>回去主页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {<span class="hljs-comment">//这里是官方的写法，默认导出，ES6</span>
        data () { <span class="hljs-comment">//ES6，等同于data:function(){}</span>
            <span class="hljs-keyword">return</span> {    <span class="hljs-comment">//必须使用这样的形式，才能创建出单一的作用域</span>
                name:<span class="hljs-string">"guowenfh"</span>,
                <span class="hljs-attr">age</span>:<span class="hljs-string">"21"</span>
            }
        },
        <span class="hljs-attr">methods</span> :{
            golist () {<span class="hljs-comment">//方法，定义路由跳转，注意这里必须使用this，不然报错</span>
                <span class="hljs-keyword">this</span>.$route.router.go({<span class="hljs-attr">name</span>:<span class="hljs-string">"list"</span>});
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 样式自行设置，或者直接看源码就好 --&gt;</span></code></pre>
<p>因为自刷新的缘故，直接切换到浏览器。</p>
<p>点击上面使用的<code>v-link</code>，与<code>router.go</code>的方式都可以跳转到<code>list</code>定义的路由。（<strong>观察浏览器地址栏的变化</strong>）在这里我们使用的<code>{name:"list"}</code>，使用<code>{ path: '/list' }</code>会有同样的效果。</p>
<h2 id="articleHeader7">引用Vue组件</h2>
<p>在第一小点里面我们看到了在页面内的组件的使用方法，第二小点中学习到了<code>vue-router</code>的制定路由规则。</p>
<p>看过这两个地方之后，我们把思维发散开来，应该就能触类旁通的想到如何在页面中嵌套加载别的组件了。<br>我们创建一个<code>hello.vue</code> ，里面内容随意。现在我们如果要在<code>app.vue</code>中加载它，那么只需要在<code>app.vue</code>中使用<code>import hello from "./hello.vue"</code>（其实这个达到了使用require两步的效果。引入赋值）。</p>
<p>引入之后，只需要如下注册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    //其它的就
    components:{
        hello//若还有更多的组件，只需要在import的情况下，以逗号分割，继续注册就好
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">//其它的就</span>
    components:{
        hello<span class="hljs-comment">//若还有更多的组件，只需要在import的情况下，以逗号分割，继续注册就好</span>
    }
}</code></pre>
<p>最后在<code>app.vue</code>中添加<code>&lt;hello&gt;&lt;/hello&gt;</code>这一对自定义标签，就可以实现加载<code>hello.vue</code>中的内容。</p>
<p>组件的嵌套也就是这样，很简单的描述完了，但是怎么样去抽离组件，在工作中积累可以复用的组件才是我们真正需要去思考的。</p>
<p>那么先到这，关于组件之间通信的问题，留到以后慢慢了解。</p>
<h2 id="articleHeader8">路由嵌套</h2>
<p>还是刚刚的代码与目录结构，我们已经实现了组件之间的嵌套，但是有时并不希望组件直接就加载进来，而是在用户点击后才展现在页面中，这是就需要使用到路由嵌套。</p>
<p>为了偷懒，这里就直接使用<code>hello.vue</code>。实现嵌套路由主要有以下几步：</p>
<p>第一步：制定嵌套路由规则：</p>
<p>看<code>main.js</code>下面这部分的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.map({
    '/index':{
        name:'index',
        component:index,
        // 在/index下设置一个子路由
        subRoutes:{ 
            // 当匹配到/index/hello时，会在index的<router-view>内渲染
            '/hello':{
                name:'hello',//可有可无，主要是为了方便使用
                // 一个hello组件
                component:hello
            }
        }
    },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="js">router.map({
    <span class="hljs-string">'/index'</span>:{
        <span class="hljs-attr">name</span>:<span class="hljs-string">'index'</span>,
        <span class="hljs-attr">component</span>:index,
        <span class="hljs-comment">// 在/index下设置一个子路由</span>
        subRoutes:{ 
            <span class="hljs-comment">// 当匹配到/index/hello时，会在index的&lt;router-view&gt;内渲染</span>
            <span class="hljs-string">'/hello'</span>:{
                <span class="hljs-attr">name</span>:<span class="hljs-string">'hello'</span>,<span class="hljs-comment">//可有可无，主要是为了方便使用</span>
                <span class="hljs-comment">// 一个hello组件</span>
                component:hello
            }
        }
    },
});</code></pre>
<p>第二步：在组件中添加<code>&lt;router-view&gt;</code></p>
<blockquote><p>来自官网的解释：<code>&lt;router-view&gt;</code> 用于渲染匹配的组件，它基于Vue的动态组件系统，所以它继承了一个正常动态组件的很多特性。</p></blockquote>
<p>将<code>&lt;router-view&gt;</code>写在<code>app.vue</code>的<code>&lt;template&gt;&lt;/template&gt;</code>标签中。</p>
<p>第三步：写入跳转路径</p>
<p>还是在<code>app.vue</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-link=&quot;{ name: 'index' }&quot;>回去主页</a>
<!-- 点击这两个标签就会实现页面内的切换效果 -->
<a v-link=&quot;{ name: 'hello' }&quot;>嵌套的路由</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ name: 'index' }"</span>&gt;</span>回去主页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 点击这两个标签就会实现页面内的切换效果 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ name: 'hello' }"</span>&gt;</span>嵌套的路由<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>，切换到浏览器，点击该<code>嵌套的路由</code>即可让<code>hello.vue</code>中的展现出来，在这里直接使用了<code>v-link</code>来实现跳转（知道为什么要写name了吧。。如果使用path会是这样的<code>{ path: '/index/hello' }</code>- -。 ） ，当然<code>router.go</code>同理。（注意在点击两个不同的文字时，地址栏的变化，以及展现内容的切换）</p>
<p><strong>注意：</strong></p>
<p>在我的源码中是在<code>&lt;style scoped&gt;&lt;/style&gt;</code>标签中定义样式的，请注意<code>scoped</code>的使用，它表示在该<code>style</code>中定义的样式只会在当前的组件中起到效果，而不会去影响全局的css样式。</p>
<p>最简单的理解应该就是：</p>
<p>未写该<code>scoped</code>属性的所有组件中的样式，在经过<code>vue-loader</code>编译之后拥有全局作用域。相当于共用一份<code>css</code>样式表。</p>
<p>而写了该属性的的组件中定义的样式，拥有独立作用域。相当于除去引入了公用的一份<code>css</code>样式表外，但单独拥有一份<code>css</code>的样式表。</p>
<p>好了，先到这。讲的有些凌乱，下次见</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack入坑之旅（六）配合vue-router实现SPA

## 原文链接
[https://segmentfault.com/a/1190000004873414](https://segmentfault.com/a/1190000004873414)

