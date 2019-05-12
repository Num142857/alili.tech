---
title: '聊聊Vue.js组件间通信的几种姿势' 
date: 2018-12-28 2:30:11
hidden: true
slug: 98lwarhpsyj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>因为对Vue.js很感兴趣，而且平时工作的技术栈也是Vue.js，这几个月花了些时间研究学习了一下Vue.js源码，并做了总结与输出。</p>
<p>文章的原地址：<a href="https://github.com/answershuto/learnVue" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue</a>。</p>
<p>在学习过程中，为Vue加上了中文的注释<a href="https://github.com/answershuto/learnVue/tree/master/vue-src" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue/tree/master/vue-src</a>，希望可以对其他想学习Vue源码的小伙伴有所帮助。</p>
<p>可能会有理解存在偏差的地方，欢迎提issue指出，共同学习，共同进步。</p>
<h2 id="articleHeader1">什么是Vue组件？</h2>
<p><a href="https://cn.vuejs.org/v2/guide/components.html" rel="nofollow noreferrer" target="_blank">组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。</a></p>
<p><br><br><br></p>
<h2 id="articleHeader2">Vue组件间通信</h2>
<h3 id="articleHeader3">父组件向子组件通信</h3>
<h4>方法一：props</h4>
<p>使用<a href="https://cn.vuejs.org/v2/guide/components.html#Prop" rel="nofollow noreferrer" target="_blank">props</a>，父组件可以使用props向子组件传递数据。</p>
<p>父组件vue模板father.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <child :msg=&quot;message&quot;></child>
</template>

<script>

import child from './child.vue';

export default {
    components: {
        child
    },
    data () {
        return {
            message: 'father message';
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">"message"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./child.vue'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
        child
    },
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">message</span>: <span class="hljs-string">'father message'</span>;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>子组件vue模板child.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>"{{"msg"}}"</div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">msg</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><br></p>
<h4>方法二 使用$children</h4>
<p>使用<a href="https://cn.vuejs.org/v2/api/#vm-children" rel="nofollow noreferrer" target="_blank">$children</a>可以在父组件中访问子组件。</p>
<p><br><br><br></p>
<h3 id="articleHeader4">子组件向父组件通信</h3>
<p><br></p>
<h4>方法一:使用<a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">vue事件</a>
</h4>
<p>父组件向子组件传递事件方法，子组件通过$emit触发事件，回调给父组件。</p>
<p>父组件vue模板father.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <child @msgFunc=&quot;func&quot;></child>
</template>

<script>

import child from './child.vue';

export default {
    components: {
        child
    },
    methods: {
        func (msg) {
            console.log(msg);
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> @<span class="hljs-attr">msgFunc</span>=<span class="hljs-string">"func"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./child.vue'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
        child
    },
    <span class="hljs-attr">methods</span>: {
        func (msg) {
            <span class="hljs-built_in">console</span>.log(msg);
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>子组件vue模板child.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <button @click=&quot;handleClick&quot;>点我</button>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    methods () {
        handleClick () {
            //........
            this.$emit('msgFunc');
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>点我<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">msg</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
        }
    },
    methods () {
        handleClick () {
            <span class="hljs-comment">//........</span>
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'msgFunc'</span>);
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><br></p>
<h4>方法二： 通过修改父组件传递的props来修改父组件数据</h4>
<p>这种方法只能在父组件传递一个引用变量时可以使用，字面变量无法达到相应效果。因为饮用变量最终无论是父组件中的数据还是子组件得到的props中的数据都是指向同一块内存地址，所以修改了子组件中props的数据即修改了父组件的数据。</p>
<p>但是并不推荐这么做，并不建议直接修改props的值，如果数据是用于显示修改的，在实际开发中我经常会将其放入data中，在需要回传给父组件的时候再用事件回传数据。这样做保持了组件独立以及解耦，不会因为使用同一份数据而导致数据流异常混乱，只通过特定的接口传递数据来达到修改数据的目的，而内部数据状态由专门的data负责管理。</p>
<p><br></p>
<h4>方法三：使用$parent</h4>
<p>使用<a href="https://cn.vuejs.org/v2/api/#vm-parent" rel="nofollow noreferrer" target="_blank">$parent</a>可以访问父组件的数据。</p>
<p><br><br><br></p>
<h3 id="articleHeader5">非父子组件、兄弟组件之间的数据传递</h3>
<p>非父子组件通信，Vue官方推荐<a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">使用一个Vue实例作为中央事件总线</a>。</p>
<p>Vue内部有一个事件机制，可以参考<a href="https://github.com/vuejs/vue/blob/dev/src/core/instance/events.js" rel="nofollow noreferrer" target="_blank">源码</a>。</p>
<p>$on方法用来监听一个事件。</p>
<p>$emit用来触发一个事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*新建一个Vue实例作为中央事件总嫌*/
let event = new Vue();

/*监听事件*/
event.$on('eventName', (val) => {
    //......do something
});

/*触发事件*/
event.$emit('eventName', 'this is a message.');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*新建一个Vue实例作为中央事件总嫌*/</span>
<span class="hljs-keyword">let</span> event = <span class="hljs-keyword">new</span> Vue();

<span class="hljs-comment">/*监听事件*/</span>
event.$on(<span class="hljs-string">'eventName'</span>, (val) =&gt; {
    <span class="hljs-comment">//......do something</span>
});

<span class="hljs-comment">/*触发事件*/</span>
event.$emit(<span class="hljs-string">'eventName'</span>, <span class="hljs-string">'this is a message.'</span>);</code></pre>
<p><br><br><br></p>
<h3 id="articleHeader6">多层级父子组件通信：</h3>
<p>在Vue1.0中实现了$broadcast与$dispatch两个方法用来向子组件（或父组件）广播（或派发），当子组件（或父组件）上监听了事件并返回true的时候会向爷孙级组件继续广播（或派发）事件。但是这个方法在Vue2.0里面已经被移除了。</p>
<p>之前在学习饿了么的开源组件库<a href="https://github.com/ElemeFE/element" rel="nofollow noreferrer" target="_blank">element</a>的时候发现他们重新实现了broadcast以及dispatch的方法，以mixin的方式引入，具体可以参考<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E8%AF%B4%E8%AF%B4element%E7%BB%84%E4%BB%B6%E5%BA%93broadcast%E4%B8%8Edispatch.MarkDown" rel="nofollow noreferrer" target="_blank">《说说element组件库broadcast与dispatch》</a>。但是跟Vue1.0的两个方法实现有略微的不同。这两个方法实现了向子孙组件事件广播以及向多层级父组件事件派发的功能。但是并非广义上的事件广播，它需要指定一个commentName进行向指定组件名组件定向广播（派发）事件。</p>
<p>其实这两个方法内部实现还是用到的还是$parent以及$children，用以遍历子节点或是逐级向上查询父节点，访问到指定组件名的时候，调用$emit触发指定事件。</p>
<p><br><br><br></p>
<h3 id="articleHeader7">复杂的单页应用数据管理</h3>
<p>当应用足够复杂情况下，请使用<a href="https://cn.vuejs.org/v2/guide/state-management.html" rel="nofollow noreferrer" target="_blank">vuex</a>进行数据管理。</p>
<h2 id="articleHeader8">关于</h2>
<p>作者：染陌 </p>
<p>Email：answershuto@gmail.com  or  answershuto@126.com</p>
<p>Github:  <a href="https://github.com/answershuto" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto</a></p>
<p>Blog：<a href="http://answershuto.github.io/" rel="nofollow noreferrer" target="_blank">http://answershuto.github.io/</a></p>
<p>知乎主页：<a href="https://www.zhihu.com/people/cao-yang-49/activities" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/people/cao-yang-49/activities</a></p>
<p>知乎专栏：<a href="https://zhuanlan.zhihu.com/ranmo" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/ranmo</a></p>
<p>掘金： <a href="https://juejin.im/user/58f87ae844d9040069ca7507" rel="nofollow noreferrer" target="_blank">https://juejin.im/user/58f87ae844d9040069ca7507</a></p>
<p>osChina：<a href="https://my.oschina.net/u/3161824/blog" rel="nofollow noreferrer" target="_blank">https://my.oschina.net/u/3161824/blog</a></p>
<p>转载请注明出处，谢谢。</p>
<p>欢迎关注我的公众号</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011335965" src="https://static.alili.tech/img/remote/1460000011335965" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊Vue.js组件间通信的几种姿势

## 原文链接
[https://segmentfault.com/a/1190000011667132](https://segmentfault.com/a/1190000011667132)

