---
title: 'Vue生命周期深入' 
date: 2018-12-02 2:30:15
hidden: true
slug: wa5obtg186f
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000014775073">下一篇：Vue组件通信深入</a></p>
<p>这篇博客将会从下面四个常见的应用诠释组件的生命周期，以及各个生命周期应该干什么事</p>
<ol>
<li>单组件的生命周期</li>
<li>父子组件的生命周期</li>
<li>兄弟组件的生命周期</li>
<li>宏mixin的生命周期</li>
</ol>
<p><strong>建议：博客中的例子都放在<a href="https://github.com/lxyc/vue_blog_project" rel="nofollow noreferrer" target="_blank">vue_blog_project</a>工程中，推荐结合工程实例与博客一同学习</strong></p>
<blockquote>生命周期：Vue 实例从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期，各个阶段有相对应的事件钩子</blockquote>
<h2 id="articleHeader0">1. 生命周期钩子函数</h2>
<p>下面这张图是vue生命周期各个阶段的执行情况：</p>
<p><span class="img-wrap"><img data-src="/img/bV9RGP?w=1200&amp;h=3039" src="https://static.alili.tech/img/bV9RGP?w=1200&amp;h=3039" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<table>
<thead><tr>
<th>生命周期钩子</th>
<th>组件状态</th>
<th>最佳实践</th>
</tr></thead>
<tbody>
<tr>
<td>beforeCreate</td>
<td>实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据</td>
<td>常用于初始化非响应式变量</td>
</tr>
<tr>
<td>created</td>
<td>实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性，$ref属性内容为空数组</td>
<td>常用于简单的ajax请求，页面的初始化</td>
</tr>
<tr>
<td>beforeMount</td>
<td>在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数</td>
<td>-</td>
</tr>
<tr>
<td>mounted</td>
<td>实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问</td>
<td>常用于获取VNode信息和操作，ajax请求</td>
</tr>
<tr>
<td>beforeupdate</td>
<td>响应式数据更新时调用，发生在虚拟DOM打补丁之前</td>
<td>适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器</td>
</tr>
<tr>
<td>updated</td>
<td>虚拟 DOM 重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作</td>
<td>避免在这个钩子函数中操作数据，可能陷入死循环</td>
</tr>
<tr>
<td>beforeDestroy</td>
<td>实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例</td>
<td>常用于销毁定时器、解绑全局事件、销毁插件对象等操作</td>
</tr>
<tr>
<td>destroyed</td>
<td>实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁</td>
<td>-</td>
</tr>
</tbody>
</table>
<p>注意：</p>
<ol>
<li>created阶段的ajax请求与mounted请求的区别：前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态</li>
<li>
<code>mounted</code> 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染</li>
</ol>
<p>完毕，可以用 <a href="https://cn.vuejs.org/v2/api/#vm-nextTick" rel="nofollow noreferrer" target="_blank">vm.$nextTick</a></p>
<ol><li>vue2.0之后主动调用$destroy()不会移除dom节点，作者不推荐直接destroy这种做法，如果实在需要这样用可以在这个生命周期钩子中手动移除dom节点</li></ol>
<h2 id="articleHeader1">2. 单个组件的生命周期</h2>
<p>现根据实际代码执行情况分析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h3>单组件</h3>
        <el-button @click=&quot;dataVar += 1&quot;>更新 "{{"dataVar"}}"</el-button>
        <el-button @click=&quot;handleDestroy&quot;>销毁</el-button>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>单组件<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dataVar += 1"</span>&gt;</span>更新 "{{"dataVar"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleDestroy"</span>&gt;</span>销毁<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data() {
        return {
            dataVar: 1
        }
    },
    beforeCreate() {
        this.compName = 'single'
        console.log(`--${this.compName}--beforeCreate`)
    },
    created() {
        console.log(`--${this.compName}--created`)
    },
    beforeMount() {
        console.log(`--${this.compName}--beforeMount`)
    },
    mounted() {
        console.log(`--${this.compName}--mounted`)
    },
    beforeUpdate() {
        console.log(`--${this.compName}--beforeUpdate`)
    },
    updated() {
        console.log(`--${this.compName}--updated`)
    },
    beforeDestroy() {
        console.log(`--${this.compName}--beforeDestroy`)
    },
    destroyed() {
        console.log(`--${this.compName}--destroyed`)
    },
    methods: {
        handleDestroy() {
            this.$destroy()
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">dataVar</span>: <span class="hljs-number">1</span>
        }
    },
    beforeCreate() {
        <span class="hljs-keyword">this</span>.compName = <span class="hljs-string">'single'</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--beforeCreate`</span>)
    },
    created() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--created`</span>)
    },
    beforeMount() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--beforeMount`</span>)
    },
    mounted() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--mounted`</span>)
    },
    beforeUpdate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--beforeUpdate`</span>)
    },
    updated() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--updated`</span>)
    },
    beforeDestroy() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--beforeDestroy`</span>)
    },
    destroyed() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${<span class="hljs-keyword">this</span>.compName}</span>--destroyed`</span>)
    },
    <span class="hljs-attr">methods</span>: {
        handleDestroy() {
            <span class="hljs-keyword">this</span>.$destroy()
        }
    }
}</code></pre>
<p>初始化组件时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RJM?w=564&amp;h=196" src="https://static.alili.tech/img/bV9RJM?w=564&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当data中的值变化时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RKc?w=506&amp;h=90" src="https://static.alili.tech/img/bV9RKc?w=506&amp;h=90" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当组件销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RKo?w=470&amp;h=88" src="https://static.alili.tech/img/bV9RKo?w=470&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从打印结果可以看出:</p>
<ol>
<li>初始化组件时，仅执行了beforeCreate/Created/beforeMount/mounted四个钩子函数</li>
<li>当改变data中定义的变量（响应式变量）时，会执行beforeUpdate/updated钩子函数</li>
<li>当切换组件（当前组件未缓存）时，会执行beforeDestory/destroyed钩子函数</li>
<li><strong>初始化和销毁时的生命钩子函数均只会执行一次，beforeUpdate/updated可多次执行</strong></li>
</ol>
<h2 id="articleHeader2">3. 父子组件的生命周期</h2>
<p>将单组件作为基础组件（由于props在beforeCreate()中未初始化），需要做如下更改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    compName: {
        type: String,
        default: 'single'
    }
},
beforeCreate() {
    // this.compName = 'single'
    // console.log(`--${this.compName}--beforeCreate`)

    console.log(` --data未初始化--beforeCreate`)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">props: {
    <span class="hljs-attr">compName</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-string">'single'</span>
    }
},
beforeCreate() {
    <span class="hljs-comment">// this.compName = 'single'</span>
    <span class="hljs-comment">// console.log(`--${this.compName}--beforeCreate`)</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">` --data未初始化--beforeCreate`</span>)
},</code></pre>
<p>父组件代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;complex&quot;>
        <h3>复杂组件</h3>
        <lifecycle-single compName=&quot;child&quot;></lifecycle-single>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"complex"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>复杂组件<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">lifecycle-single</span> <span class="hljs-attr">compName</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">lifecycle-single</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COMPONENT_NAME = 'complex'

import LifecycleSingle from './LifeCycleSingle'

export default {
    beforeCreate() {
        console.log(`--${COMPONENT_NAME}--beforeCreate`)
    },
    created() {
        console.log(`--${COMPONENT_NAME}--created`)
    },
    beforeMount() {
        console.log(`--${COMPONENT_NAME}--beforeMount`)
    },
    mounted() {
        console.log(`--${COMPONENT_NAME}--mounted`)
    },
    beforeUpdate() {
        console.log(`--${COMPONENT_NAME}--beforeUpdate`)
    },
    updated() {
        console.log(`--${COMPONENT_NAME}--updated`)
    },
    beforeDestroy() {
        console.log(`--${COMPONENT_NAME}--beforeDestroy`)
    },
    destroyed() {
        console.log(`--${COMPONENT_NAME}--destroyed`)
    },
    components: {
        LifecycleSingle
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COMPONENT_NAME = <span class="hljs-string">'complex'</span>

<span class="hljs-keyword">import</span> LifecycleSingle <span class="hljs-keyword">from</span> <span class="hljs-string">'./LifeCycleSingle'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    beforeCreate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeCreate`</span>)
    },
    created() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--created`</span>)
    },
    beforeMount() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeMount`</span>)
    },
    mounted() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--mounted`</span>)
    },
    beforeUpdate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeUpdate`</span>)
    },
    updated() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--updated`</span>)
    },
    beforeDestroy() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeDestroy`</span>)
    },
    destroyed() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--destroyed`</span>)
    },
    <span class="hljs-attr">components</span>: {
        LifecycleSingle
    }
}</code></pre>
<p>初始化组件时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RLM?w=618&amp;h=424" src="https://static.alili.tech/img/bV9RLM?w=618&amp;h=424" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当子组件data中的值变化时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RLS?w=556&amp;h=88" src="https://static.alili.tech/img/bV9RLS?w=556&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当父组件data中的值变化时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RL1?w=574&amp;h=88" src="https://static.alili.tech/img/bV9RL1?w=574&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当props改变时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RL8?w=518&amp;h=156" src="https://static.alili.tech/img/bV9RL8?w=518&amp;h=156" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当子组件销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RMf?w=536&amp;h=94" src="https://static.alili.tech/img/bV9RMf?w=536&amp;h=94" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当父组件销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RMo?w=450&amp;h=170" src="https://static.alili.tech/img/bV9RMo?w=450&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从打印结果可以看出:</p>
<ol>
<li>仅当子组件完成挂载后，父组件才会挂载</li>
<li>当子组件完成挂载后，父组件会主动执行一次beforeUpdate/updated钩子函数（仅首次）</li>
<li>父子组件在data变化中是分别监控的，但是在更新props中的数据是关联的（可实践）</li>
<li>销毁父组件时，先将子组件销毁后才会销毁父组件</li>
</ol>
<h2 id="articleHeader3">4. 兄弟组件的生命周期</h2>
<p>在上面的基础上，复杂组件做如下更改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;complex&quot;>
        <h3>复杂组件</h3>
        <lifecycle-single compName=&quot;cihld1&quot;></lifecycle-single>
        <lifecycle-single compName=&quot;child2&quot;></lifecycle-single>
        <el-button @click=&quot;dataVar += 1&quot;>complex更新 "{{"dataVar"}}"</el-button>
        <el-button @click=&quot;handleDestroy&quot;>complex销毁</el-button>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"complex"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>复杂组件<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">lifecycle-single</span> <span class="hljs-attr">compName</span>=<span class="hljs-string">"cihld1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">lifecycle-single</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">lifecycle-single</span> <span class="hljs-attr">compName</span>=<span class="hljs-string">"child2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">lifecycle-single</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dataVar += 1"</span>&gt;</span>complex更新 "{{"dataVar"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleDestroy"</span>&gt;</span>complex销毁<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>初始化组件时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RMU?w=746&amp;h=556" src="https://static.alili.tech/img/bV9RMU?w=746&amp;h=556" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当child1更新和销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RM5?w=610&amp;h=160" src="https://static.alili.tech/img/bV9RM5?w=610&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当child2更新和销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RNb?w=546&amp;h=170" src="https://static.alili.tech/img/bV9RNb?w=546&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当父组件销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RNl?w=578&amp;h=240" src="https://static.alili.tech/img/bV9RNl?w=578&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从打印结果可以看出:</p>
<ol>
<li>组件的初始化（mounted之前）分开进行，挂载是从上到下依次进行</li>
<li>当没有数据关联时，兄弟组件之间的更新和销毁是互不关联的</li>
</ol>
<h2 id="articleHeader4">5. 宏mixin的生命周期</h2>
<p>在上面的基础上，添加一个mixin.js文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const COMPONENT_NAME = 'lifecycleMixin'
export default {
    name: COMPONENT_NAME,
    beforeCreate() {
        console.log(`--${COMPONENT_NAME}--beforeCreate`)
    },
    created() {
        console.log(`--${COMPONENT_NAME}--created`)
    },
    beforeMount() {
        console.log(`--${COMPONENT_NAME}--beforeMount`)
    },
    mounted() {
        console.log(`--${COMPONENT_NAME}--mounted`)
    },
    beforeUpdate() {
        console.log(`--${COMPONENT_NAME}--beforeUpdate`)
    },
    updated() {
        console.log(`--${COMPONENT_NAME}--updated`)
    },
    beforeDestroy() {
        console.log(`--${COMPONENT_NAME}--beforeDestroy`)
    },
    destroyed() {
        console.log(`--${COMPONENT_NAME}--destroyed`)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> COMPONENT_NAME = <span class="hljs-string">'lifecycleMixin'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: COMPONENT_NAME,
    beforeCreate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeCreate`</span>)
    },
    created() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--created`</span>)
    },
    beforeMount() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeMount`</span>)
    },
    mounted() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--mounted`</span>)
    },
    beforeUpdate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeUpdate`</span>)
    },
    updated() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--updated`</span>)
    },
    beforeDestroy() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--beforeDestroy`</span>)
    },
    destroyed() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`--<span class="hljs-subst">${COMPONENT_NAME}</span>--destroyed`</span>)
    }
}</code></pre>
<p>同样的，复杂组件做如下更改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import lifecycleMixin from './mixin'

export default {
    mixins: [lifecycleMixin],
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> lifecycleMixin <span class="hljs-keyword">from</span> <span class="hljs-string">'./mixin'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">mixins</span>: [lifecycleMixin],
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>组件初始化时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RNS?w=702&amp;h=786" src="https://static.alili.tech/img/bV9RNS?w=702&amp;h=786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>组件销毁时，打印：<br><span class="img-wrap"><img data-src="/img/bV9RNZ?w=622&amp;h=320" src="https://static.alili.tech/img/bV9RNZ?w=622&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从打印结果可以看出:<br>mixin中的生命周期与引入该组件的生命周期是仅仅关联的，且<strong>mixin的生命周期优先执行</strong></p>
<p><a href="https://segmentfault.com/a/1190000014775073">下一篇：Vue组件通信深入</a></p>
<p>参考：</p>
<ol>
<li><a href="https://cn.vuejs.org/v2/guide/instance.html" rel="nofollow noreferrer" target="_blank">vue官网教程</a></li>
<li><a href="https://cn.vuejs.org/v2/api/#beforeCreate" rel="nofollow noreferrer" target="_blank">vue官网API</a></li>
<li><a href="https://segmentfault.com/a/1190000013956945">Vue2.0生命周期（组件钩子函数与路由守卫）</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue生命周期深入

## 原文链接
[https://segmentfault.com/a/1190000014705819](https://segmentfault.com/a/1190000014705819)

