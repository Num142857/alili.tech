---
title: 'Vue2 利用 v-model 实现组件props双向绑定的优美解决方案' 
date: 2019-01-18 2:30:35
hidden: true
slug: d8knhetsf7v
categories: [reprint]
---

{{< raw >}}

                    
<p>在项目中开始使用vue2来构建项目了，跟 vue1 很大的一处不同在于2 取消了props 的双向绑定，改成只能从父级传到子级的单向数据流，初衷当然是好的，为了避免双向绑定在项目中容易造成的数据混乱。</p>
<h3 id="articleHeader0">解决方案一</h3>
<p>然后开始参考网上和github上的方案等等，发现很多解决方案是这样的</p>
<ol>
<li><p>用data对象中创建一个props属性的副本</p></li>
<li><p>watch props属性 赋予data副本 来同步组件外对props的修改</p></li>
<li><p>watch data副本，emit一个函数 通知到组件外</p></li>
</ol>
<p>这里以最常见的 modal为例子：<br>modal挺合适双向绑定的，外部可以控制组件的 显示或者隐藏，组件内部的关闭可以控制 visible属性隐藏，同时visible 属性同步传输到外部</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
///modal.vue  组件
<template>
  <div class=&quot;modal&quot; v-show=&quot;visible&quot;>
      <div class=&quot;close&quot; @click=&quot;cancel&quot;>X</div>
  </div>
</template>

<script>
export default {
    name:'modal',
    props: {
      value: {
        type: Boolean,
        default:false
      }
    },

  data () {
    return {
      visible:false
    }
  },
  watch:{
      value(val) {
        console.log(val);
        this.visible = val;
      },
      visible(val) {
        this.$emit(&quot;visible-change&quot;,val);
      }
  },
  methods:{
    cancel(){
      this.visible = false;
    }
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  }
}
</script>


///调用modal组件
<modal :value=&quot;isShow&quot; @visible-change=&quot;modalVisibleChange&quot;></modal>

export default {
  name: 'app',
  data () {
    return {
      isShow:true,
    }
  },
  methods:{
     modalVisibleChange(val){
       this.isShow = val;
     }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">///modal.vue  组件</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"visible"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"cancel"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
    name:'modal',
    props: {
      value: {
        type: Boolean,
        default:false
      }
    },

  data () {
    return {
      visible:false
    }
  },
  watch:{
      value(val) {
        console.log(val);
        this.visible = val;
      },
      visible(val) {
        this.$emit("visible-change",val);
      }
  },
  methods:{
    cancel(){
      this.visible = false;
    }
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  }
}
&lt;/</span>script&gt;


<span class="hljs-comment">///调用modal组件</span>
&lt;modal :value=<span class="hljs-string">"isShow"</span> @visible-change=<span class="hljs-string">"modalVisibleChange"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">modal</span>&gt;</span></span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">isShow</span>:<span class="hljs-literal">true</span>,
    }
  },
  <span class="hljs-attr">methods</span>:{
     modalVisibleChange(val){
       <span class="hljs-keyword">this</span>.isShow = val;
     }
  }
}
</code></pre>
<p>这样就解决了 组件props 双向绑定的问题。 但是这样有一个不是太美观的现象就是 在父级调用 modal组件的时候，还需要写一个 modalVisibleChange 的methods. 总是显得这部分代码是多余的。 特别是写一个让别人用的公共组件，这样调用太麻烦了。<br>能不能不写method来实现props的双向绑定呢，答案是可以的。</p>
<h3 id="articleHeader1">优美解决方案</h3>
<p>那就是利用 v-model,  然后使用value来保存v-model的值，进行双向绑定</p>
<p>改成如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;modal&quot; :value=&quot;value&quot; v-show=&quot;visible&quot;>
      <div class=&quot;close&quot; @click=&quot;cancel&quot;>X</div>
  </div>
</template>

<script>
export default {
    props: {
      value: {
        type: Boolean,
        default:false
      }
    },

  data () {
    return {
      visible:false
    }
  },
  watch:{
      value(val) {
        console.log(val);
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
      }
  },
  methods:{
    cancel(){
      this.visible = false;
    }
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  }
}
</script>


///调用modal组件

  <modal v-model=&quot;isShow&quot;></modal>

export default {
  name: 'app',
  data () {
    return {
      isShow:false
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"value"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"visible"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"cancel"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
    props: {
      value: {
        type: Boolean,
        default:false
      }
    },

  data () {
    return {
      visible:false
    }
  },
  watch:{
      value(val) {
        console.log(val);
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
      }
  },
  methods:{
    cancel(){
      this.visible = false;
    }
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  }
}
&lt;/</span>script&gt;


<span class="hljs-comment">///调用modal组件</span>

  &lt;modal v-model=<span class="hljs-string">"isShow"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">modal</span>&gt;</span></span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">isShow</span>:<span class="hljs-literal">false</span>
    }
  }
}
&lt;<span class="hljs-regexp">/script&gt;
</span></code></pre>
<p>这样调用组件的代码是不是很简洁，其他人员要调用的话，会很轻松，只要设置 isShow 就可以控制 modal 组件的显示或者隐藏，同时 如果是modal 组件内部关闭按钮关闭的，状态也会传到 isShow</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 利用 v-model 实现组件props双向绑定的优美解决方案

## 原文链接
[https://segmentfault.com/a/1190000008662112](https://segmentfault.com/a/1190000008662112)

