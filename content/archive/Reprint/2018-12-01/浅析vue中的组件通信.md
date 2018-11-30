---
title: '浅析vue中的组件通信' 
date: 2018-12-01 2:30:12
hidden: true
slug: rxjzpxn0deg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>为了方便展示，所有的组件都是以<strong>单文件组件</strong>的方式编写的</blockquote>
<h2 id="articleHeader0">1. 父组件对子组件通信</h2>
<blockquote>在父组件内使用<code>v-on</code>绑定自定义事件，在子组件内使用<code>props</code>传递<strong>自定义的事件名称</strong>
</blockquote>
<p>如下是<code>父组件</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <child :message=&quot;title&quot;/>
    <!--使用v-on绑定自定义事件-->
  </div>
</template>

<script>
  import Child from './components/Child' // 导入子组件

  export default {
    name: 'App',
    components: {Child}, // 注册子组件
    data() {
      return {
        title: '父组件向我传递了信息'
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:message</span>=<span class="hljs-string">"title"</span>/&gt;</span>
    <span class="hljs-comment">&lt;!--使用v-on绑定自定义事件--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Child'</span> <span class="hljs-comment">// 导入子组件</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,
    <span class="hljs-attr">components</span>: {Child}, <span class="hljs-comment">// 注册子组件</span>
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">title</span>: <span class="hljs-string">'父组件向我传递了信息'</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如下是<code>子组件</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    "{{"message"}}"
  </div>
</template>

<script>
  export default {
    props: ['message'] // 使用props传递数据
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    "{{"message"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'message'</span>] <span class="hljs-comment">// 使用props传递数据</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>&lt;!--more--&gt;</p>
<h2 id="articleHeader1">2.子组件对父组件通信</h2>
<blockquote>子组件对父组件通信我们只能通过<code>自定义事件</code>去进行触发，而无法像<strong>父对子通信</strong>那样直接进行数据传递</blockquote>
<p>首先我们必须了解Vue暴露两个实例方法</p>
<ul>
<li>
<code>vm.$emit( event, […args] )</code>，触发当前实例上的事件，<strong>附加参数都会传给监听器回调</strong>
</li>
<li>
<code>vm.$on( event, callback )</code>，监听当前实例上的自定义事件，<strong>事件可以由vm.$emit触发，回调函数会接收所有传入事件触发函数的额外参数</strong>
</li>
</ul>
<p>总结一下：我们用$on去监听一个**自定义事件**，这个自定义事件由$emit触发，触发的同时将<code>data</code>放在附加参数里，传给$on接收</p>
<p>如下是<code>父组件</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <child v-on:receiveData=&quot;consoleData&quot;/>
    <!--监听自定义事件receiveData，监听到之后触发consoleData获取子组件传递的数据-->
  </div>
</template>

<script>
  import Child from './components/Child' // 导入子组件

  export default {
    name: 'App',
    components: {Child}, // 注册子组件
    methods: {
      consoleData(data) {
        // 这里的参数是由$emit传递来的数据
        console.log(data) // [&quot;子组件向我传递信息啦&quot;, &quot;测试&quot;]
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">v-on:receiveData</span>=<span class="hljs-string">"consoleData"</span>/&gt;</span>
    <span class="hljs-comment">&lt;!--监听自定义事件receiveData，监听到之后触发consoleData获取子组件传递的数据--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Child'</span> <span class="hljs-comment">// 导入子组件</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,
    <span class="hljs-attr">components</span>: {Child}, <span class="hljs-comment">// 注册子组件</span>
    methods: {
      consoleData(data) {
        <span class="hljs-comment">// 这里的参数是由$emit传递来的数据</span>
        <span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">// ["子组件向我传递信息啦", "测试"]</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如下是<code>子组件</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <button @click=&quot;transData&quot;>点我，向父组件传递数据</button>
    <!--绑定transData事件，以便执行器内部的$emit-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '子组件向我传递信息啦',
        title: '测试'
      }
    },
    methods: {
      transData() {
        // 触发自定义事件receiveData，将数据传递给父组件
        this.$emit('receiveData', [this.message, this.title])
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"transData"</span>&gt;</span>点我，向父组件传递数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-comment">&lt;!--绑定transData事件，以便执行器内部的$emit--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'子组件向我传递信息啦'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'测试'</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      transData() {
        <span class="hljs-comment">// 触发自定义事件receiveData，将数据传递给父组件</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'receiveData'</span>, [<span class="hljs-keyword">this</span>.message, <span class="hljs-keyword">this</span>.title])
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">3.兄弟组件之间进行通信</h2>
<blockquote>主要我们通过全局注册一个<code>eventBus</code>单文件组件，这个组件的作用充当着<code>vm.$emit( event, […args] )</code>里的<code>vm</code>，其它形式与第二小节类似，不作过多说明了</blockquote>
<p>新建一个js文件，作为EventBus</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue' // 导入vue模块

export default new Vue({}) // 新建一个空的vue实例作为EventBus" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span> <span class="hljs-comment">// 导入vue模块</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue({}) <span class="hljs-comment">// 新建一个空的vue实例作为EventBus</span></code></pre>
<p>如下是<code>父组件</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <!--两个子组件-->
    <child1/>
    <child2/>
  </div>
</template>

<script>
  import Child1 from './components/Child' // 导入子组件1
  import Child2 from './components/child2' // 导入子组件2

  export default {
    name: 'App',
    components: {Child1, Child2}// 注册两个子组件
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--两个子组件--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child1</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child2</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Child1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Child'</span> <span class="hljs-comment">// 导入子组件1</span>
  <span class="hljs-keyword">import</span> Child2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/child2'</span> <span class="hljs-comment">// 导入子组件2</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,
    <span class="hljs-attr">components</span>: {Child1, Child2}<span class="hljs-comment">// 注册两个子组件</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如下是<code>子组件1</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <button @click=&quot;transData&quot;>点我，向兄弟组件Child2传递数据</button>
    <!--绑定transData事件，以便执行器内部的$emit-->
  </div>
</template>

<script>
  import eventBus from './EventBus' // 导入EventBus

  export default {
    data() {
      return {
        message: 'Child2，你好呀',
        title: '测试'
      }
    },
    methods: {
      transData() {
        // 通过EventBus触发自定义事件receiveData，将数据传递给Child2组件
        eventBus.$emit('receiveData', [this.message, this.title])
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"transData"</span>&gt;</span>点我，向兄弟组件Child2传递数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-comment">&lt;!--绑定transData事件，以便执行器内部的$emit--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> eventBus <span class="hljs-keyword">from</span> <span class="hljs-string">'./EventBus'</span> <span class="hljs-comment">// 导入EventBus</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'Child2，你好呀'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'测试'</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      transData() {
        <span class="hljs-comment">// 通过EventBus触发自定义事件receiveData，将数据传递给Child2组件</span>
        eventBus.$emit(<span class="hljs-string">'receiveData'</span>, [<span class="hljs-keyword">this</span>.message, <span class="hljs-keyword">this</span>.title])
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如下是<code>子组件2</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>我的兄弟组件Child1向我传递了信息："{{"message"}}"</h1>
    <!--绑定transData事件，以便执行器内部的$emit-->
  </div>
</template>

<script>
  import eventBus from './EventBus' // 导入EventBus

  export default {
    data() {
      return {
        message: ''
      }
    },
    created() {
      eventBus.$on('receiveData', data => {
        // 注意这里使用箭头函数是因为需要将this绑定父级的context，否则this指向eventBus
        this.message = data
      })
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我的兄弟组件Child1向我传递了信息："{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-comment">&lt;!--绑定transData事件，以便执行器内部的$emit--&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> eventBus <span class="hljs-keyword">from</span> <span class="hljs-string">'./EventBus'</span> <span class="hljs-comment">// 导入EventBus</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-string">''</span>
      }
    },
    created() {
      eventBus.$on(<span class="hljs-string">'receiveData'</span>, data =&gt; {
        <span class="hljs-comment">// 注意这里使用箭头函数是因为需要将this绑定父级的context，否则this指向eventBus</span>
        <span class="hljs-keyword">this</span>.message = data
      })
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析vue中的组件通信

## 原文链接
[https://segmentfault.com/a/1190000014790132](https://segmentfault.com/a/1190000014790132)

