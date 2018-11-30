---
title: 'Vue组件通信深入' 
date: 2018-12-01 2:30:12
hidden: true
slug: 9vafzrai1m
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000014705819">上一篇：vue生命周期深入</a><br><a href="https://segmentfault.com/a/1190000014798001" target="_blank">下一篇：Vue组件通信深入Vuex</a></p>
<p><strong>建议：博客中的例子都放在<a href="https://github.com/lxyc/vue_blog_project" rel="nofollow noreferrer" target="_blank">vue_blog_project</a>工程中，推荐结合工程实例与博客一同学习</strong></p>
<blockquote>vue中，组件是带有一个名字、可复用的<strong> Vue 实例</strong>。由于 Vue 是面向视图的MVVM框架，<strong>组件可以看做是对数据和方法的简单封装、具有独立的逻辑和功能的界面</strong>，多个组件按照一定规则的组合最终成为一个完整的应用</blockquote>
<h2 id="articleHeader0">1. 组件的注册</h2>
<h3 id="articleHeader1">1.1 全局注册</h3>
<p><code>Vue.component()</code>用来创建<strong>全局组件，一旦注册，即可在该实例Vue下的任何子组件中使用，常用于一些使用较为频繁的基础组件</strong>，如Alert组件、Button组件、布局组件等</p>
<p>使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component', {
    // vue实例方法和生命周期（el除外）
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'my-component'</span>, {
    <span class="hljs-comment">// vue实例方法和生命周期（el除外）</span>
})</code></pre>
<p>如果你使用过 <code>element-ui</code> ，下面的写法你可能比较熟悉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>;

Vue.use(ElementUI);

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});</code></pre>
<p>其中<code>Vue.use(ElementUI);</code>的方式便是间接调用了全局组件注册的方式，在<code>element-ui</code>内部：<br>（插件中，使用<code>Vue.use()</code>的方式，相当于调用了其中的install方法）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const install = function(Vue, opts = {}) {
// ...
components.map(component => {
    Vue.component(component.name, component);
});
// ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue, opts = {}</span>) </span>{
<span class="hljs-comment">// ...</span>
components.map(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
    Vue.component(component.name, component);
});
<span class="hljs-comment">// ...</span>
};</code></pre>
<p>可以看出，在其内部也是依次全局注册了<code>element</code>中的插件</p>
<h3 id="articleHeader2">1.2 局部注册</h3>
<p>Vue官网上如是说：</p>
<blockquote>全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。</blockquote>
<p>正是因为上面的原因，<strong>除了一些常用的基础组件外，尽可能的使用局部注册的方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 普通引入方式
var ComponentA = { /* ... */ }

// ES6引入方式
import ComponentA from './ComponentA.vue'

export default {
    // ...
    components: {
        'component-a': ComponentA,
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 普通引入方式</span>
<span class="hljs-keyword">var</span> ComponentA = { <span class="hljs-comment">/* ... */</span> }

<span class="hljs-comment">// ES6引入方式</span>
<span class="hljs-keyword">import</span> ComponentA <span class="hljs-keyword">from</span> <span class="hljs-string">'./ComponentA.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// ...</span>
    components: {
        <span class="hljs-string">'component-a'</span>: ComponentA,
    }
}</code></pre>
<p>值得注意的是：<strong>局部注册方式仅能在当前组件中使用，在其子组件中使用需要再次注册</strong></p>
<h2 id="articleHeader3">2. 组件的组织</h2>
<p>上面提到，<code>多个组件按照一定规则的组合最终成为一个完整的应用</code>，因此，我们可以将组件看作是Vue页面中的最小单元，那么应该如何组织组件，整合成一个页面呢？</p>
<blockquote>有这样一个需求：要求按照下图组织页面结构</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV99MF?w=1562&amp;h=726" src="https://static.alili.tech/img/bV99MF?w=1562&amp;h=726" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以这样组织：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;m-body&quot;>
    我是主体内容
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.m-body {
    min-height: 500px;
    color: #fff;
    padding: 20px;
    background-color: #39f;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-body"</span>&gt;</span>
    我是主体内容
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.m-body</span> {
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">500px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#39f</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>按照这种方式，依次写出header、aside、content、footer四个组件，并用一个组件作为这四个组件的父组件来组织页面结构，最后的结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV99M5?w=488&amp;h=280" src="https://static.alili.tech/img/bV99M5?w=488&amp;h=280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>父组件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;comp&quot;>
    <m-header />
    <div class=&quot;main&quot;>
        <m-side />
        <m-body />
    </div>
    <m-footer />
</div>
</template>

<script>
import MHeader from './MHeader'
import MFooter from './MFooter'
import MBody from './MBody'
import MSide from './MSide'

export default {
    components: {
        MHeader,
        MFooter,
        MBody,
        MSide
    }
}
</script>

<style lang=&quot;scss&quot; scoped>
.main {
    margin: 10px 0;
    display: flex;
    .m-side {
        width: 200px;
        margin-right: 10px;
    }
    .m-body {
        flex: 1;
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-header</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">m-side</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">m-body</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-footer</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> MHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'./MHeader'</span>
<span class="hljs-keyword">import</span> MFooter <span class="hljs-keyword">from</span> <span class="hljs-string">'./MFooter'</span>
<span class="hljs-keyword">import</span> MBody <span class="hljs-keyword">from</span> <span class="hljs-string">'./MBody'</span>
<span class="hljs-keyword">import</span> MSide <span class="hljs-keyword">from</span> <span class="hljs-string">'./MSide'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
        MHeader,
        MFooter,
        MBody,
        MSide
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
.main {
    margin: 10px 0;
    display: flex;
    .m-side {
        width: 200px;
        margin-right: 10px;
    }
    .m-body {
        flex: 1;
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>打开Vue调试界面，将看到如下的结构</p>
<p><span class="img-wrap"><img data-src="/img/bV99Nw?w=1058&amp;h=610" src="https://static.alili.tech/img/bV99Nw?w=1058&amp;h=610" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>注意：<strong>父组件负责控制容器结构样式（各个直接子组件的位置、大小等），子组件负责其内部的样式，不要在子组件中写自己的容器样式</strong></p>
<h2 id="articleHeader4">3. 组件之间的数据传递</h2>
<p>组件的组合仅仅只是将页面结构搭建了起来，要完成页面的交互功能，组件之间必定会有数据传递<br>按照页面结构，大体上可以将组件间的数据传递分成两种：</p>
<ol>
<li><strong>父子组件间的数据传递</strong></li>
<li><strong>兄弟组件间的数据传递</strong></li>
<li><strong>非直接关联性组件间的数据传递</strong></li>
</ol>
<h3 id="articleHeader5">3.1 组件间简单的数据通信</h3>
<p><strong>Vue官网中对props、$emit、slot有非常详细的描述，在此不再唠述</strong></p>
<blockquote>现有新的<strong>需求</strong>：在上面例子的基础上，需要满足：header中有一个数值，side中新增重置和增加按钮，body中新增数组输入框，当对按钮和表单作操作时，对应的数值作相应改变</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV99NB?w=1036&amp;h=354" src="https://static.alili.tech/img/bV99NB?w=1036&amp;h=354" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>基本<strong>思路</strong>：将数值放在几个组件公共上层组件中，header中prop接受该值，side和body中点击按钮向他们的公共上层组件分发$emit事件，改变该数值，核心思路：<strong>多个组件操作的值均为上层组件的变量</strong></p>
<p>代码如下：</p>
<p>（1）<strong>父级组件</strong>：主要用于数据传递与接收子组件分发的事件来改变对应的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;comp&quot;>
    <m-header :num=&quot;num&quot; />
    <div class=&quot;main&quot;>
        <m-side @add=&quot;handleAdd&quot; @reset=&quot;handleReset&quot; />
        <m-body :num=&quot;num&quot; @change=&quot;handleChange&quot; />
    </div>
    <m-footer />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-header</span> <span class="hljs-attr">:num</span>=<span class="hljs-string">"num"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">m-side</span> @<span class="hljs-attr">add</span>=<span class="hljs-string">"handleAdd"</span> @<span class="hljs-attr">reset</span>=<span class="hljs-string">"handleReset"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">m-body</span> <span class="hljs-attr">:num</span>=<span class="hljs-string">"num"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"handleChange"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-footer</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data () {
        return {
            num: 0
        }
    },
    methods: {
        handleAdd () {
            this.num += 1
        },
        handleChange (val) {
            this.num = val
        },
        handleReset () {
            this.num = 0
        }
    },
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        handleAdd () {
            <span class="hljs-keyword">this</span>.num += <span class="hljs-number">1</span>
        },
        handleChange (val) {
            <span class="hljs-keyword">this</span>.num = val
        },
        handleReset () {
            <span class="hljs-keyword">this</span>.num = <span class="hljs-number">0</span>
        }
    },
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>（2）<strong>Header组件</strong>：接受并展示数值<br>template中仅添加<code>"{{" num "}}"</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    num: {
        type: Number,
        default: 0
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">props: {
    <span class="hljs-attr">num</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
    }
}</code></pre>
<p>（3）<strong>Side组件</strong>：向上分发增加和重置事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 新增 -->
<el-button @click=&quot;add&quot;>ADD</el-button>
<el-button @click=&quot;reset&quot;>RESET</el-button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 新增 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add"</span>&gt;</span>ADD<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"reset"</span>&gt;</span>RESET<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    add () {
        this.$emit('add')
    },
    reset () {
        this.$emit('reset')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods: {
    add () {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'add'</span>)
    },
    reset () {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'reset'</span>)
    }
}</code></pre>
<p>（4）<strong>Body组件</strong>：监控传值，向上分发事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 新增 -->
<el-input-number v-model=&quot;currentVal&quot; @change=&quot;handleChange&quot;></el-input-number>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 新增 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-input-number</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"currentVal"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"handleChange"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input-number</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    num: {
        type: Number,
        default: 0
    }
},
data () {
    return {
        currentVal: 0
    }
},
// 外层数据改变时，currentVal值需要同步修改
watch: {
    num: {
        handler (val) {
            this.currentVal = val
        },
        immediate: true
    }
},
methods: {
    handleChange (val) {
        this.$emit('change', val)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">props: {
    <span class="hljs-attr">num</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
    }
},
data () {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">currentVal</span>: <span class="hljs-number">0</span>
    }
},
<span class="hljs-comment">// 外层数据改变时，currentVal值需要同步修改</span>
watch: {
    <span class="hljs-attr">num</span>: {
        handler (val) {
            <span class="hljs-keyword">this</span>.currentVal = val
        },
        <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span>
    }
},
<span class="hljs-attr">methods</span>: {
    handleChange (val) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, val)
    }
}</code></pre>
<p>这种简单的数据交互使用prop和$emit足以应付，但是<br>（1）对于深层组件嵌套中的数据传递，使用这种通信方式则需要一层一层向下prop，改变时需要一层一层向上$emit<br>（2）对于兄弟组件之间的数据传递，先要向上分发，再向下prop，<strong>过于繁琐且不易监控调试</strong></p>
<blockquote>这里有一个<strong>新的需求</strong>：在最初组件组合的基础上，side组件中有一个数据展示，要求通过body中深层嵌套的组件操作以改变side中的数据</blockquote>
<p>修改：在body组件中添加<code>&lt;slot&gt;&lt;/slot&gt;</code>，并新增一个组件挂载在该插槽上，用以模拟深层嵌套（当然了，实际的工作中的嵌套可能涉及到四层甚至更多）</p>
<h3 id="articleHeader6">3.2 $root方式</h3>
<p>上面方法的核心是所有子组件统一管理和操作父组件的数据，子组件负责展示和分发事件，实际操作值的始终在父组件，Vue提供了一个能访问到根组件的方法，官网中如是描述：<a href="https://cn.vuejs.org/v2/guide/components-edge-cases.html" rel="nofollow noreferrer" target="_blank">处理边界情况</a>中访问根实例部分</p>
<p>（1）在入口文件<code>main.js</code>中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        rootNum: 0
    },
    // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">rootNum</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-comment">// ...</span>
})</code></pre>
<p>（2）在<strong>父组件</strong>中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 局部注册不作详述 -->
<m-body>
    <m-body-item></m-body-item>
</m-body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 局部注册不作详述 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">m-body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-body-item</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">m-body-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">m-body</span>&gt;</span></code></pre>
<p>（3）<strong>新添加的组件</strong><code>MBodyItem</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;m-body-item&quot;>
    <el-button @click=&quot;add&quot;>ADD</el-button>
    <el-button @click=&quot;reset&quot;>RESET</el-button>
</div>
</template>

<script>
// 可直接操作$root中声明的变量
export default {
    methods: {
        add () {
            this.$root.rootNum += 1
        },
        reset () {
            this.$root.rootNum = 0
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-body-item"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add"</span>&gt;</span>ADD<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"reset"</span>&gt;</span>RESET<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 可直接操作$root中声明的变量</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
        add () {
            <span class="hljs-keyword">this</span>.$root.rootNum += <span class="hljs-number">1</span>
        },
        reset () {
            <span class="hljs-keyword">this</span>.$root.rootNum = <span class="hljs-number">0</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>（4）<strong>side组件</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;m-side&quot;>
    我是侧边栏"{{" $root.rootNum "}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-side"</span>&gt;</span>
    我是侧边栏"{{" $root.rootNum "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>对于 demo 或非常小型的有少量组件的应用来说直接使用$root的方式很方便。不过这个模式扩展到中大型应用来说就不然了，数据量过大不易维护，也不易追踪数据的变化</strong></p>
<h3 id="articleHeader7">3.3 总线Bus方式</h3>
<p>总线Bus的思路：将事件的注册和触发单独放在一个Vue实例中，点击按钮时触发指定的事件以驱动接下来的操作。<strong>Bus总线仅仅是用来驱动事件</strong>的，具体的数据操作还是在原有的组件中</p>
<p>在$root的结构基础上，作如下更改：<br>（1）原入口文件<code>main.js</code>还原，去掉data属性<br>（2）新定义一个总线文件<code>bus.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
export default new Vue()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue()</code></pre>
<p>（3）side组件中注册总线事件并显示数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Bus from './bus'
export default {
    data () {
        return {
            sideNum: 0
        }
    },
    created () {
        Bus.$on('change', (step) => {
            this.sideNum += step
        })
        Bus.$on('reset', () => {
            this.sideNum = 0
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'./bus'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">sideNum</span>: <span class="hljs-number">0</span>
        }
    },
    created () {
        Bus.$on(<span class="hljs-string">'change'</span>, (step) =&gt; {
            <span class="hljs-keyword">this</span>.sideNum += step
        })
        Bus.$on(<span class="hljs-string">'reset'</span>, () =&gt; {
            <span class="hljs-keyword">this</span>.sideNum = <span class="hljs-number">0</span>
        })
    }
}</code></pre>
<p>（4）bodyItem组件中分发总线事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Bus from './bus'
export default {
    methods: {
        add () {
            Bus.$emit('change', 1)
        },
        reset () {
            Bus.$emit('reset')
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'./bus'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
        add () {
            Bus.$emit(<span class="hljs-string">'change'</span>, <span class="hljs-number">1</span>)
        },
        reset () {
            Bus.$emit(<span class="hljs-string">'reset'</span>)
        }
    }
}</code></pre>
<p><strong>总线的方式，将原有的数据传递转换成了事件驱动的形式，这一点规避了组件层级的嵌套问题，但是开发人员无法追踪调试数据</strong></p>
<h3 id="articleHeader8">3.4 Vuex方式</h3>
<p>由于内容较多，将在下一篇博客中详细介绍，敬请期待..</p>
<p><a href="https://segmentfault.com/a/1190000014705819">上一篇：vue生命周期深入</a><br><a href="https://segmentfault.com/a/1190000014798001" target="_blank">下一篇：Vue组件通信深入Vuex</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue组件通信深入

## 原文链接
[https://segmentfault.com/a/1190000014775073](https://segmentfault.com/a/1190000014775073)

