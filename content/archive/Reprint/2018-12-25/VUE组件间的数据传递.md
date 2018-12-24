---
title: 'VUE组件间的数据传递' 
date: 2018-12-25 2:30:11
hidden: true
slug: 5umuiocz0v8
categories: [reprint]
---

{{< raw >}}

                    
<p>众所周知，Vue 是基于组件来构建 web 应用的。组件将模块和组合发挥到了极致。Vue 是虽说吸取了 AngularJs 的 MVVM的思想，但是它是单向数据流的，也就是说子组件无法直接改变父组件状态。下面总结出常用的组件消息传递的方式。</p>
<h2 id="articleHeader0">父组件向子组件传递数据</h2>
<p>该方式的数据传递是遵循 Vue 单向数据流的规则的，因此使用起来十分的自然。若父组件的数据改变子组件的 UI 展现也随之变化。<br>Parent.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>Parent</h1>
    <child :name=&quot;childName&quot; />
    <button @click=&quot;changeChildName&quot;>change the child name</button>
  </div>
</template>
<script>
import Child from './Child';

export default {
  components: {
    Child,
  },
  data() {
    return {
      childName: 'child name is what?',
    };
  },
  methods: {
    changeChildName() {
      this.childName = 'no name';
    },
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Parent<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"childName"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeChildName"</span>&gt;</span>change the child name<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">'./Child'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    Child,
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">childName</span>: <span class="hljs-string">'child name is what?'</span>,
    };
  },
  <span class="hljs-attr">methods</span>: {
    changeChildName() {
      <span class="hljs-keyword">this</span>.childName = <span class="hljs-string">'no name'</span>;
    },
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>Child.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>"{{"name"}}"</div>
</template>
<script>
export default {
  props: ['name'],
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'name'</span>],
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bVYWS2?w=660&amp;h=188" src="https://static.alili.tech/img/bVYWS2?w=660&amp;h=188" alt="parent-child.gif" title="parent-child.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">子组件修改父组件的数据</h2>
<p>这里介绍两种方式：<br>1、子组件触发事件，父组件监听事件做出数据改变<br>2、父组件将数据变更方法以 props 的形式传给子组件（借鉴 react 的父子通信方式）</p>
<h3 id="articleHeader2">监听事件</h3>
<p>父组件上通过 v-on 监听子组件所触发的事件。<br>EventParent.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>Event Parent</h1>
    <child :name=&quot;childName&quot; @changeParent=&quot;changeChildName&quot; />
  </div>
</template>
<script>
import Child from './Child';

export default {
  components: {
    Child,
  },
  data() {
    return {
      childName: 'child name is what?',
    };
  },
  methods: {
    changeChildName() {
      this.childName = 'no name';
    },
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Event Parent<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"childName"</span> @<span class="hljs-attr">changeParent</span>=<span class="hljs-string">"changeChildName"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">'./Child'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    Child,
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">childName</span>: <span class="hljs-string">'child name is what?'</span>,
    };
  },
  <span class="hljs-attr">methods</span>: {
    changeChildName() {
      <span class="hljs-keyword">this</span>.childName = <span class="hljs-string">'no name'</span>;
    },
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>EventChild.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    "{{"name"}}"
     <button @click=&quot;changeParentData&quot;>change the parent name</button>
  </div>
</template>
<script>
export default {
  props: ['name'],
  methods: {
    changeParentData() {
      this.$emit('changeParent');
    },
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    "{{"name"}}"
     <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeParentData"</span>&gt;</span>change the parent name<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'name'</span>],
  <span class="hljs-attr">methods</span>: {
    changeParentData() {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'changeParent'</span>);
    },
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bVYWTk?w=660&amp;h=161" src="https://static.alili.tech/img/bVYWTk?w=660&amp;h=161" alt="event-parent-child.gif" title="event-parent-child.gif" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">传递props</h3>
<p>因为自己写 react 较多，所以好奇 Vue 是否支持子组件回调父组件的事件处理函数，试了一下是可以的。好像 Element UI 使用该方式较多。个人认为该方法和事件方式同样灵活。<br>Parent.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>Props Parent</h1>
    <child :name=&quot;childName&quot; :changeName=&quot;changeChildName&quot; />
  </div>
</template>
<script>
import Child from './Child';

export default {
  components: {
    Child,
  },
  data() {
    return {
      childName: 'child name is what?',
    };
  },
  methods: {
    changeChildName() {
      this.childName = 'no name';
    },
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Props Parent<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"childName"</span> <span class="hljs-attr">:changeName</span>=<span class="hljs-string">"changeChildName"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">'./Child'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    Child,
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">childName</span>: <span class="hljs-string">'child name is what?'</span>,
    };
  },
  <span class="hljs-attr">methods</span>: {
    changeChildName() {
      <span class="hljs-keyword">this</span>.childName = <span class="hljs-string">'no name'</span>;
    },
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>Child.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <div>"{{"name"}}"</div>
    <button @click=&quot;changeName&quot;>Change Name</button>
  </div>
</template>
<script>
export default {
  props: ['name', 'changeName'],
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeName"</span>&gt;</span>Change Name<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'name'</span>, <span class="hljs-string">'changeName'</span>],
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYWTq?w=660&amp;h=161" src="https://static.alili.tech/img/bVYWTq?w=660&amp;h=161" alt="props-parent-child.gif" title="props-parent-child.gif" style="cursor: pointer; display: inline;"></span></p>
<p>以 props 的这种方式大家可以尝试实现一下是一种新的思路。</p>
<h2 id="articleHeader4">非父子组件间的通信</h2>
<p>上述三个实例都在讲述父子组件的通信，那么不相关的组件该如何通信呢？可以创建一个 Vue 的实例作为<code>桥</code>来中转事件。<br>eventHub.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';

export default new Vue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue();</code></pre>
<p>Child01.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <div>我是哥哥，我来触发事件</div>
    <button @click=&quot;clickButton&quot;>CLICK</button>
  </div>
</template>
<script>
import EventHub from './eventHub';

export default {
  methods: {
    clickButton() {
      EventHub.$emit('emitevent');
    },
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是哥哥，我来触发事件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clickButton"</span>&gt;</span>CLICK<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> EventHub <span class="hljs-keyword">from</span> <span class="hljs-string">'./eventHub'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    clickButton() {
      EventHub.$emit(<span class="hljs-string">'emitevent'</span>);
    },
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>Child02.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <div>我是弟弟，我来监听哥哥触发的事件来改变自己的数据</div>
    <span>"{{"title"}}"</span>
  </div>
</template>
<script>
import EventHub from './eventHub';

export default {
  created() {
    EventHub.$on('emitevent', () => {
      this.title = 'Hi Brother';
    });
  },
  data() {
    return {
      title: 'Hello EveryOne~',
    };
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弟弟，我来监听哥哥触发的事件来改变自己的数据<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> EventHub <span class="hljs-keyword">from</span> <span class="hljs-string">'./eventHub'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  created() {
    EventHub.$on(<span class="hljs-string">'emitevent'</span>, () =&gt; {
      <span class="hljs-keyword">this</span>.title = <span class="hljs-string">'Hi Brother'</span>;
    });
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Hello EveryOne~'</span>,
    };
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>效果如图：<br><span class="img-wrap"><img data-src="/img/bVYXPV?w=660&amp;h=161" src="https://static.alili.tech/img/bVYXPV?w=660&amp;h=161" alt="siblings-demo.gif" title="siblings-demo.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>父组件改变子组件的数据利用正常单向数据流的特性即可，子组件改变父组件的数据可以通过事件或者函数 props 两种方式实现，非父子组件通信则利用 EventHub 中转一下。</p>
<p><a href="https://github.com/xiyuanyuan/vue-components-communication" rel="nofollow noreferrer" target="_blank">实例代码</a></p>
<p>欢迎大家指正批评、或留言。QQ群：538631558</p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE组件间的数据传递

## 原文链接
[https://segmentfault.com/a/1190000012103728](https://segmentfault.com/a/1190000012103728)

