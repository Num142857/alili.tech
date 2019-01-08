---
title: 'vue.js 组件之间传递数据' 
date: 2019-01-09 2:30:12
hidden: true
slug: n42tijy1ive
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>组件是 vue.js 最强大的功能之一，而组件实例的作用域是相互独立的，这就意味着不同组件之间的数据无法相互引用。如何传递数据也成了组件的重要知识点之一。</p>
<h2 id="articleHeader1">组件</h2>
<p>组件与组件之间，还存在着不同的关系。父子关系与兄弟关系（不是父子的都暂称为兄弟吧）。</p>
<h3 id="articleHeader2">父子组件</h3>
<p>父子关系即是组件 A 在它的模板中使用了组件 B，那么组件 A 就是父组件，组件 B 就是子组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册一个子组件
Vue.component('child', {
    data: function(){
        return {
            text: '我是father的子组件！'
        }
    },
    template: '<span>"{{" text "}}"</span>'
})
// 注册一个父组件
Vue.component('father', {
    template: '<div><child></child></div>'  // 在模板中使用了child组件
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 注册一个子组件</span>
Vue.component(<span class="hljs-string">'child'</span>, {
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">text</span>: <span class="hljs-string">'我是father的子组件！'</span>
        }
    },
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" text "}}"&lt;/span&gt;'</span>
})
<span class="hljs-comment">// 注册一个父组件</span>
Vue.component(<span class="hljs-string">'father'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;child&gt;&lt;/child&gt;&lt;/div&gt;'</span>  <span class="hljs-comment">// 在模板中使用了child组件</span>
})</code></pre>
<p>直接使用 father 组件的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <father></father>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">father</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">father</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>页面中就会渲染出 ：我是father的子组件！</p>
<p>father 组件在模板中使用了 child 组件，所以它就是父组件，child 组件被使用，所以 child 组件就是子组件。</p>
<h3 id="articleHeader3">兄弟组件</h3>
<p>两个组件互不引用，则为兄弟组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('brother1', {
    template: '<div>我是大哥</div>'
})
Vue.component('brother2', {
    template: '<div>我是小弟</div>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'brother1'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;我是大哥&lt;/div&gt;'</span>
})
Vue.component(<span class="hljs-string">'brother2'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;我是小弟&lt;/div&gt;'</span>
})</code></pre>
<p>使用组件的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <brother1></brother1>
    <brother2></brother2>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">brother1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">brother1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">brother2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">brother2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>页面中就会渲染出 ：</p>
<p>我是大哥</p>
<p>我是小弟</p>
<h2 id="articleHeader4">Prop</h2>
<p>子组件想要使用父组件的数据，我们需要通过子组件的 props 选项来获得父组件传过来的数据。以下我使用在 .vue 文件中的格式来写例子。</p>
<h3 id="articleHeader5">如何传递数据</h3>
<p>在父组件 father.vue 中引用子组件 child.vue，把 name 的值传给 child 组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;app&quot;>
        // message 定义在子组件的 props 中
        <child :message=&quot;name&quot;></child>
    </div>
</template>
<script>
    import child from './child.vue';
    export default {
        components: {
            child
        },
        data() {
            return {
                name: 'linxin'
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
        // message 定义在子组件的 props 中
        <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:message</span>=<span class="hljs-string">"name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./child.vue'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            child
        },
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'linxin'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在子组件 child.vue 中的 props 选项中声明它期待获得的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <span>Hello "{{"message"}}"</span>
</template>
<script>
    export default {
        // 在 props 中声明获取父组件的数据通过 message 传过来
        props: ['message']
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello "{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-comment">// 在 props 中声明获取父组件的数据通过 message 传过来</span>
        props: [<span class="hljs-string">'message'</span>]
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>那么页面中就会渲染出：Hello linxin</p>
<h3 id="articleHeader6">单向数据流</h3>
<p>当父组件的 name 发生改变，子组件也会自动地更新视图。但是在子组件中，我们不要去修改 prop。如果你必须要修改到这些数据，你可以使用以下方法：</p>
<p>方法一：把 prop 赋值给一个局部变量，然后需要修改的话就修改这个局部变量，而不影响 prop</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data(){
        return {
            newMessage: null
        } 
    },
    props: ['message'],
    created(){
        this.newMessage = this.message;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">newMessage</span>: <span class="hljs-literal">null</span>
        } 
    },
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'message'</span>],
    created(){
        <span class="hljs-keyword">this</span>.newMessage = <span class="hljs-keyword">this</span>.message;
    }
}</code></pre>
<p>方法二：在计算属性中对 prop 进行处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    props: ['message'],
    computed: {
        newMessage(){
            return this.newMessage + ' 哈哈哈';
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'message'</span>],
    <span class="hljs-attr">computed</span>: {
        newMessage(){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.newMessage + <span class="hljs-string">' 哈哈哈'</span>;
        }
    }
}</code></pre>
<h2 id="articleHeader7">自定义事件</h2>
<p>prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。修改子组件的 prop 值，是不会传回给父组件去更新视图的。那么子组件要如何去与父组件通讯呢？</p>
<p>那就是自定义事件。通过在父组件 $on(eventName) 监听自定义事件，当子组件里 $emit(eventName) 触发该自定义事件的时候，父组件执行相应的操作。</p>
<p>比如在父组件中控制一个弹框子组件的显示，在子组件中按下关闭之后，告诉父组件去隐藏它，然后父组件就执行操作隐藏弹框。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;app&quot;>
        // hide 为自定义事件，名字可以自己随便起，不能有大写字母，可以使用短横线
        // @hide 监听子组件触发 hide 事件，则会执行 hideDialog 方法
        <dialog :is-show=&quot;show&quot; @hide=&quot;hideDialog&quot;></dialog>
        <button @click=&quot;showDialog&quot;>显示弹框</button>
    </div>
</template>
<script>
    import dialog from './dialog.vue';
    export default {
        components: { dialog },
        data() {
            return {
                show: false
            }
        },
        methods: {
            showDialog() {
                this.show = true;
            },
            hideDialog() {
                this.show = false;
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app"</span>&gt;</span>
        // hide 为自定义事件，名字可以自己随便起，不能有大写字母，可以使用短横线
        // @hide 监听子组件触发 hide 事件，则会执行 hideDialog 方法
        <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">:is-show</span>=<span class="hljs-string">"show"</span> @<span class="hljs-attr">hide</span>=<span class="hljs-string">"hideDialog"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showDialog"</span>&gt;</span>显示弹框<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./dialog.vue'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: { dialog },
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            showDialog() {
                <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>;
            },
            hideDialog() {
                <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在子组件 dialog.vue 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;dialog&quot; v-show=&quot;isShow&quot;>
        <p>这里是弹框子组件</p>
        <button @click=&quot;toHide&quot;>关闭弹框</button>
    </div>
</template>
<script>
    export default {
        // 驼峰式命名的 prop 需要转换为相对应的短横线隔开式 is-show
        props: ['isShow'],
        methods: {
            toHide(){
                // $emit 方法触发父组件的监听事件
                this.$emit('hide');
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里是弹框子组件<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toHide"</span>&gt;</span>关闭弹框<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-comment">// 驼峰式命名的 prop 需要转换为相对应的短横线隔开式 is-show</span>
        props: [<span class="hljs-string">'isShow'</span>],
        <span class="hljs-attr">methods</span>: {
            toHide(){
                <span class="hljs-comment">// $emit 方法触发父组件的监听事件</span>
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'hide'</span>);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样就实现了父子组件之间的相互通讯。</p>
<h2 id="articleHeader8">Event Bus</h2>
<p>有时候两个组件之间需要进行通信，但是它们彼此不是父子组件的关系。在一些简单场景，你可以使用一个空的 Vue 实例作为一个事件总线中心(central event bus)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue();

// 在组件 A 的 methods 方法中触发事件
bus.$emit('say-hello', 'world')

// 在组件 B 的 created 钩子函数中监听事件
bus.$on('say-hello', function (arg) {
  console.log('hello ' + arg);          // hello world
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue();

<span class="hljs-comment">// 在组件 A 的 methods 方法中触发事件</span>
bus.$emit(<span class="hljs-string">'say-hello'</span>, <span class="hljs-string">'world'</span>)

<span class="hljs-comment">// 在组件 B 的 created 钩子函数中监听事件</span>
bus.$on(<span class="hljs-string">'say-hello'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arg</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello '</span> + arg);          <span class="hljs-comment">// hello world</span>
})</code></pre>
<h2 id="articleHeader9">Vuex</h2>
<p>在复杂场景中，你应该考虑使用专门的状态管理模式 Vuex。关于 Vuex，可查看我的另一篇文章：<a href="https://github.com/lin-xin/blog/issues/5" rel="nofollow noreferrer" target="_blank">Vuex 模块化实现待办事项的状态管理</a></p>
<h2 id="articleHeader10">总结</h2>
<p>组件通讯并不是一定要使用必须要使用 Vuex，对于一些简单的数据传递，prop 也可以完成。本文主要是对组件传参的一些基础知识点的记录，实战可以参考 <a href="https://github.com/lin-xin/notepad" rel="nofollow noreferrer" target="_blank">notepad</a> 这个例子，使用 prop 实现子组件的显示与隐藏，使用 vuex 来实现组件间的数据状态管理。</p>
<h3 id="articleHeader11">更多文章：<a href="http://blog.gdfengshuo.com/" rel="nofollow noreferrer" target="_blank">blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 组件之间传递数据

## 原文链接
[https://segmentfault.com/a/1190000010115321](https://segmentfault.com/a/1190000010115321)

