---
title: 'vue2.0开发聊天程序（三）组件的通信' 
date: 2019-01-28 2:30:10
hidden: true
slug: m02hlm4bzh
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>天地不仁以万物为刍狗，宇宙无义视众生如蝼蚁</strong><br><strong>　　　　　　　　　　　　　　　　　　——萧鼎和我</strong></p>
<p>上一节列出了５个关键点，第一个路由已经解决了，接下来解决第二个问题：</p>
<blockquote><p>组件的通信问题</p></blockquote>
<p><strong>一、组件的关系</strong></p>
<p>组件之间的关系无非就是两种<strong>父子关系</strong>和<strong>没有父子关系</strong>。为什么我这样说呢？<br>按道理应该还有兄弟关系（也就是并列的组件，比如一个组件中引用了hreder和footer组件。），还有爷孙关系（比如我有七个Calabash Brothers组件，放在的HanHan组件下，而HanHan组件放在了Chairman Mao组件下）<br>那么不应该是父子、爷孙、兄弟关系吗？<br>然而并不是，因为我看了vue的文档。他的意思就是父子通信和非父子通信。</p>
<p><strong>二、父子之间的通信——Prop和自定义事件</strong></p>
<p>组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。<br>prop 是父组件用来传递数据的一个自定义属性。子组件需要显式地用 props 选项声明 “prop”。<br>将我们的App.vue当作父组件，将test当作子组件(什么当作，本来就是)。<br>在App.vue中修改我们的&lt;test&gt;：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!-- 传递一个say值 -->
   <test say=&quot;你是猪&quot;></test> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-comment">&lt;!-- 传递一个say值 --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">test</span> <span class="hljs-attr">say</span>=<span class="hljs-string">"你是猪"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">test</span>&gt;</span> </code></pre>
<p>在Test.vue中接收，并在页面中显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <p>我是全英雄联盟最骚的骚猪</p>
           <p>说： "{{"say"}}"</p>    
           <!-- 绑定say值到页面上 -->
    </div>
</template>

<script>
export default {
  name: 'test',
  props: ['say'] //这里接收父组件穿过来的say值
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是全英雄联盟最骚的骚猪<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>说： </span><span class="hljs-template-variable">"{{"say"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>    
           <span class="hljs-comment">&lt;!-- 绑定say值到页面上 --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'say'</span>] <span class="hljs-comment">//这里接收父组件穿过来的say值</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>然后在浏览器的显示效果如下：<br><span class="img-wrap"><img data-src="/img/bVHAJs?w=468&amp;h=509" src="https://static.alili.tech/img/bVHAJs?w=468&amp;h=509" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>综上所述可以看出，其实所谓的prop就是在<strong>&lt;test&gt;&lt;/test&gt;</strong>标签添加一个自定义的属性，然后在子组件中取出这个属性，用Jquery也可以做嘛(满脑子，骚，骚想法.jpg)。</p>
<p>上面的例子很漂亮的把父传子的通信方式展现出来了。但是子传父呢？<br>vue文档中使用的自定义事件。</p>
<blockquote><p>使用 $on(eventName) 监听事件<br>使用 $emit(eventName) 触发事件</p></blockquote>
<p>我们还是用APP.vue作为父组件，Test.vue作为子组件<br>App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
/*增加一个位置来显示子组件传过来的值*/
<p>我儿子对我说: "{{"noSay"}}"</p>
/* 增加一个自定义的事件mychild,并给他指定触发的方法*/
<test say=&quot;你是猪&quot; v-on:myChild=&quot;toFatherSay&quot;></test>
...
data () {
    return {
      noSay: '' // 用来接收子组件穿过来的数据
    }
  },
  methods: {
    toFatherSay: function(massage) { // mychlid事件触发调用的方法
      this.noSay = massage // massage就是子组件穿过来的内容
    }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>...
<span class="hljs-comment">/*增加一个位置来显示子组件传过来的值*/</span>
&lt;p&gt;我儿子对我说: "{{"noSay"}}"&lt;/p&gt;
<span class="hljs-comment">/* 增加一个自定义的事件mychild,并给他指定触发的方法*/</span>
&lt;test say=<span class="hljs-string">"你是猪"</span> v-on:myChild=<span class="hljs-string">"toFatherSay"</span>&gt;&lt;/test&gt;
...
data () {
    <span class="hljs-keyword">return</span> {
      noSay: <span class="hljs-string">''</span> <span class="hljs-comment">// 用来接收子组件穿过来的数据</span>
    }
  },
  methods: {
    toFatherSay: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(massage)</span> </span>{ <span class="hljs-comment">// mychlid事件触发调用的方法</span>
      <span class="hljs-keyword">this</span>.noSay = massage <span class="hljs-comment">// massage就是子组件穿过来的内容</span>
    }
  }
</code></pre>
<p>Test.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="....
/*增加一个按钮，一点击就向父组件传值*/
<button v-on:click=&quot;toFather&quot;>点我传给父组件</button>
....
data() {
      return {
          massage: '我才不说呢' // 定义一个向父组件传递的值
      }
  },
  methods: {
      toFather: function() { // 按钮点击触发的方法
          this.$emit('myChild',this.massage)// 使用$emit来向父组件传播
      }
  },
...." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>....
<span class="hljs-comment">/*增加一个按钮，一点击就向父组件传值*/</span>
&lt;button v-on:click=<span class="hljs-string">"toFather"</span>&gt;点我传给父组件&lt;/button&gt;
....
<span class="hljs-keyword">data</span>() {
      <span class="hljs-keyword">return</span> {
          massage: <span class="hljs-string">'我才不说呢'</span> <span class="hljs-comment">// 定义一个向父组件传递的值</span>
      }
  },
  methods: {
      toFather: function() { <span class="hljs-comment">// 按钮点击触发的方法</span>
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'myChild'</span>,<span class="hljs-keyword">this</span>.massage)<span class="hljs-comment">// 使用$emit来向父组件传播</span>
      }
  },
....</code></pre>
<p>做完以上操作之后在浏览器上测试：<br><span class="img-wrap"><img data-src="/img/bVHBEy?w=930&amp;h=630" src="https://static.alili.tech/img/bVHBEy?w=930&amp;h=630" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>三、非父子关系之间的通信——eventBus</strong></p>
<p>在veu文档上，非父子之间的通信是通过使用一个空的Vue实例作为中央事件总线。<br><strong>空的Vue实例？ and 中央事件总线？</strong><br>空的Vue实例也就是说</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var bus = new Vue(); // 的确是一个空的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>(); <span class="hljs-comment">// 的确是一个空的</span></code></pre>
<p>中央事件总线，难道组件通信要通过全局的事件来进行？<br>的确是这样，vue提供了$emit和$on方法来进行参数监听(其实就是个发布订阅模式)。<br>创建一个空的Vue实例 Bus.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
export default new Vue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue();</code></pre>
<p>将我们的Apart.vue和Bpart.vue当作非父子关系组件：<br>Apart.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <p>我是Apart</p>
        <a v-on:click=&quot;goPage&quot;>点我切换</a>
    </div>
</template>

<script>
import Bus from '../Bus' //引入创建的Bus对象

export default {
  name: 'test',
  methods: {
      goPage: function () {
          Bus.$emit('whiteSay', '克里斯，关下门') // 使用$emit方法创建一个键值对
          this.$router.push('/bb')
      }
  },
  /*将引入的Bus组件注入我们的组件对象中 import进来是不够的 还要让组件对象知道 */
  components: {
      Bus
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
div {
    width: 100%;
    height: 100px;
    background-color: green;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是Apart<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"goPage"</span>&gt;</span>点我切换<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../Bus'</span> <span class="hljs-comment">//引入创建的Bus对象</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">methods</span>: {
      <span class="hljs-attr">goPage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          Bus.$emit(<span class="hljs-string">'whiteSay'</span>, <span class="hljs-string">'克里斯，关下门'</span>) <span class="hljs-comment">// 使用$emit方法创建一个键值对</span>
          <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/bb'</span>)
      }
  },
  <span class="hljs-comment">/*将引入的Bus组件注入我们的组件对象中 import进来是不够的 还要让组件对象知道 */</span>
  components: {
      Bus
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: green;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>Bpart.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <p>我是Bpart</p>
        <p>Apart对我说： "{{"whiteSay"}}"</p>
        <a v-on:click=&quot;goPage&quot;>点我切换</a>
    </div>
</template>

<script>
import Bus from '../Bus' // 同样要引入Bus

export default {
  name: 'test',
  data () { // data用于存放组件的数据，必须是一个function，并且返回一个对象
      return {
          whiteSay: 'nihao'
      }
  },
  methods: {
      goPage: function () {
          this.$router.push('/')
      }
  },
  components: { // 同样要注入Bus
      Bus
  },
  created: function() { // 在组件被创建时候将会执行此函数  相当于进入页面的自执行
      Bus.$on('whiteSay', function(data) { // 使用$on方法监听white属性并执行一个回调函数
          this.whiteSay = data
          console.log(this.whiteSay)
      });
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
div {
    width: 100%;
    height: 100px;
    background-color: yellow;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是Bpart<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Apart对我说： </span><span class="hljs-template-variable">"{{"whiteSay"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"goPage"</span>&gt;</span>点我切换<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../Bus'</span> <span class="hljs-comment">// 同样要引入Bus</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  data () { <span class="hljs-comment">// data用于存放组件的数据，必须是一个function，并且返回一个对象</span>
      <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">whiteSay</span>: <span class="hljs-string">'nihao'</span>
      }
  },
  <span class="hljs-attr">methods</span>: {
      <span class="hljs-attr">goPage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
      }
  },
  <span class="hljs-attr">components</span>: { <span class="hljs-comment">// 同样要注入Bus</span>
      Bus
  },
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 在组件被创建时候将会执行此函数  相当于进入页面的自执行</span>
      Bus.$on(<span class="hljs-string">'whiteSay'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-comment">// 使用$on方法监听white属性并执行一个回调函数</span>
          <span class="hljs-keyword">this</span>.whiteSay = data
          <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.whiteSay)
      });
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: yellow;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>然后在浏览器中测试一下：<br><span class="img-wrap"><img data-src="/img/bVHBj4?w=930&amp;h=630" src="https://static.alili.tech/img/bVHBj4?w=930&amp;h=630" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>有问题！！！无论怎么点击我们发现Bpart中定义的whiteSay并没有改变，并且第一次点击控制台没有打印。我在Bpart中写了这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   data () {
      return {
          whiteSay: 'nihao'
      }
  },
  created: function() { // 在组件被创建时候将会执行此函数  相当于进入页面的自执行
      Bus.$on('whiteSay', function(data) { // 使用$on方法监听white属性并执行一个回调函数
          this.whiteSay = data
          console.log(this.whiteSay)
      });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>   data () {
      <span class="hljs-keyword">return</span> {
          <span class="hljs-attribute">whiteSay</span>: <span class="hljs-string">'nihao'</span>
      }
  },
  <span class="hljs-attribute">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 在组件被创建时候将会执行此函数  相当于进入页面的自执行</span>
      Bus.$<span class="hljs-keyword">on</span>(<span class="hljs-string">'whiteSay'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-comment">// 使用$on方法监听white属性并执行一个回调函数</span>
          <span class="hljs-keyword">this</span>.whiteSay = data
          <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.whiteSay)
      });
  }</code></pre>
<p>按道理在元素被创建的时候，会将监听到的值赋给whiteSay并且打印。但是我们注意到第一次点击，两个操作都没有执行，也就是说没有监听到whiteSay值的变化。而第二次之后都监听到了。这是为什么？为什么把值赋给data中定义的whiteSay之后没有网页没有更新？<br>带着这两个问题我去问了度娘和股哥。一下是答案：<br><strong>第一个为什么：</strong> 项目中使用了vue-router，会先加載新的組件，等新的組件渲染好但是還沒掛載前，銷毀舊組件，在掛載新組件。将Apart.vue的代码修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
 methods: {
      goPage: function () {
          this.$router.push('/bb')
      }
  },
  /*Vue 实例销毁后调用 就是所谓的生命周期钩子*/
  destroyed() {
    Bus.$emit('whiteSay', '克里斯，关下门') // 使用$emit方法创建一个键值对
    },
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    ...
 methods: {
      goPage: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
          this.$router.push(<span class="hljs-string">'/bb'</span>)
      }
  },
  <span class="hljs-comment">/*Vue 实例销毁后调用 就是所谓的生命周期钩子*/</span>
  destroyed() {
    Bus.$emit(<span class="hljs-string">'whiteSay'</span>, <span class="hljs-string">'克里斯，关下门'</span>) <span class="hljs-comment">// 使用$emit方法创建一个键值对</span>
    },
    ...</code></pre>
<p>这样第一个问题就解决了。附上找到的答案连接：<a href="https://segmentfault.com/q/1010000007879907">https://segmentfault.com/q/10...</a><br><strong>第二个为什么：</strong>这个是我自己代码有问题，问了隔壁大神。说是我的作用域有问题，将Bpart.vue中的代码改为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="···
 created: function() { // 在组件被创建时候将会执行此函数  相当于进入页面的自执行
     var _self = this; // 将当前作用域保存在变量中，和$on()的作用域区分开来
      Bus.$on('whiteSay', function(data) { // 使用$on方法监听white属性并执行一个回调函数
          _self.whiteSay = data
          console.log(_self.whiteSay)
      });
  }
···" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>···
 <span class="hljs-attribute">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 在组件被创建时候将会执行此函数  相当于进入页面的自执行</span>
     <span class="hljs-built_in">var</span> _self = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// 将当前作用域保存在变量中，和$on()的作用域区分开来</span>
      Bus.$<span class="hljs-keyword">on</span>(<span class="hljs-string">'whiteSay'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{ <span class="hljs-comment">// 使用$on方法监听white属性并执行一个回调函数</span>
          _self.whiteSay = data
          <span class="hljs-built_in">console</span>.log(_self.whiteSay)
      });
  }
···</code></pre>
<p>这样所有的问题就都解决了。</p>
<p><strong>四、Vuex</strong><br>当我使用了上面几种方法来实现组件的通信存在着一些缺陷。比如父组件向子组件传一个值，子组件将值处理完了返回给父组件，这将同时用到prop和自定义事件。还不如直接写一个所有组件都可以访问的变量呢来得方便呢。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*这是vuex文档中的例子*/
const sourceOfTruth = {}
const vmA = new Vue({
  data: sourceOfTruth
})
const vmB = new Vue({
  data: sourceOfTruth
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-comment">/*这是vuex文档中的例子*/</span>
<span class="hljs-keyword">const</span> sourceOfTruth = {}
<span class="hljs-keyword">const</span> vmA = <span class="hljs-keyword">new</span> Vue({
  data: sourceOfTruth
})
<span class="hljs-keyword">const</span> vmB = <span class="hljs-keyword">new</span> Vue({
  data: sourceOfTruth
})</code></pre>
<p>再比如当项目过大，组件之间的通信将变得难以管理。veux的初衷就是为何更好的管理组件的状态。一下是vuex文档对vuex的定义：</p>
<blockquote><p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。</p></blockquote>
<p>写得好累，还好最近没事做，不会被boss骂。</p>
<p>接下来直接开始使用vuex。</p>
<p><strong>先下载</strong><br>在根目录下打开cmd：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex -save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vuex -<span class="hljs-keyword">save</span></code></pre>
<p>下载成功看到一下数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Users\59227\Desktop\x-chat>npm install vuex --save
x-chat@1.0.0 C:\Users\59227\Desktop\x-chat
`-- vuex@2.1.1

npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.0.15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">C</span>:\Users\<span class="hljs-number">59227</span>\Desktop\x-chat&gt;npm install vuex --save
x-chat<span class="hljs-variable">@1</span>.<span class="hljs-number">0.0</span> <span class="hljs-attribute">C</span>:\Users\<span class="hljs-number">59227</span>\Desktop\x-chat
`-- vuex<span class="hljs-variable">@2</span>.<span class="hljs-number">1.1</span>

npm WARN optional Skipping failed optional dependency /chokidar/<span class="hljs-attribute">fsevents</span>:
npm WARN notsup Not compatible with your operating system or <span class="hljs-attribute">architecture</span>: fsevents<span class="hljs-variable">@1</span>.<span class="hljs-number">0.15</span></code></pre>
<p><strong>然后在main.js中引用，并安装到Vue上面</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from 'vuex'

Vue.use(Vuex)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex)</code></pre>
<p>前面两步将Vuex引入到了项目当中，接下来如何使用Vuex。<br><strong>Vuex的核心是一个store（仓库）这个仓库的作用就是用来管理应用中的state（状态）</strong>。这里状态该怎么理解？<br>我个人的理解是：所有组件共享的并可以进行更改的对象。<br>除了state的，store还有getter、Mutations、Actions以及Modules。在vuex文档中都有非常详细的说明：<a href="http://vuex.vuejs.org/zh-cn/state.html" rel="nofollow noreferrer" target="_blank">http://vuex.vuejs.org/zh-cn/s...</a><br>笼统的说：</p>
<blockquote><p>组件获取 state 用 vuex 的 getter<br>组件触发动作用 vuex 的 action<br>修改 state 用 vuex 的 mutation</p></blockquote>
<p>知乎上看到的，说得很贴切易懂。</p>
<p>直接上代码，建议撸完代码，再去看一遍vuex的文档。</p>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="....
const store = new Vuex.Store({ //创建一个仓库
    state: {  
        showDagger: true, // 定义一个状态
    },
    mutations: {// 定义 mutation ，更改 Vuex 的 store 中的状态的唯一方法是提交mutation
        daggerCtrl (state) { // 一定要传入state，并且是第一个参数
            state.showDagger = !state.showDagger  // 将showDagger值取反
        }
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 将router对象传给vue，这样就可以通过this.$router获取到router对象了
  store, // 将store对象传给vue，这样就可以通过this.$store获取到store对象了
  template: '<App/>', 
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>....
const store = new Vuex.Store({ //创建一个仓库
    <span class="hljs-keyword">state</span>: {  
        showDagger: true, // 定义一个状态
    },
    mutations: {// 定义 mutation ，更改 Vuex 的 store 中的状态的唯一方法是提交mutation
        daggerCtrl (<span class="hljs-keyword">state</span>) { // 一定要传入<span class="hljs-keyword">state</span>，并且是第一个参数
            <span class="hljs-keyword">state</span>.showDagger = !<span class="hljs-keyword">state</span>.showDagger  // 将showDagger值取反
        }
    }
})
/* eslint-disable no-new */
new Vue({
  el: '<span class="hljs-comment">#app',</span>
  router, // 将router对象传给vue，这样就可以通过this.<span class="hljs-variable">$router</span>获取到router对象了
  store, // 将store对象传给vue，这样就可以通过this.<span class="hljs-variable">$store</span>获取到store对象了
  template: '<span class="hljs-variable">&lt;App/&gt;</span>', 
  components: { App }
})</code></pre>
<p>然后更改App.vue：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <p>我儿子对我说: "{{"noSay"}}"</p>
    <test say=&quot;你是猪&quot; v-on:myChild=&quot;toFatherSay&quot;></test>
    <router-view></router-view>
    <!-- @click是v-on:click的简写方式 -->
    <button @click=&quot;changeDagger&quot;>dagger</button>       1.添加按钮和组件
    <dagger></dagger>
  </div>
</template>

<script>
import Test from './components/Test'  // 这里引入Test组件
import Dagger from './components/Dagger' // 引入Dagger组件        2.引入Dagger

export default {
  name: 'app',
  components: {
    Test, // 在components中添加Test
    Dagger                                                3.注入Dagger
  },
  data () {
    return {
      noSay: ''
    }
  },
  methods: {
    toFatherSay: function(massage) {
      this.noSay = massage
    },
    changeDagger: function() {                       4.增加按钮点击触发的事件
      this.$store.commit('daggerCtrl') // 使用commit(提交)方法唤醒名为daggerCtrl的mutation
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我儿子对我说: </span><span class="hljs-template-variable">"{{"noSay"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">test</span> <span class="hljs-attr">say</span>=<span class="hljs-string">"你是猪"</span> <span class="hljs-attr">v-on:myChild</span>=<span class="hljs-string">"toFatherSay"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">test</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- @click是v-on:click的简写方式 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeDagger"</span>&gt;</span>dagger<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>       1.添加按钮和组件
    <span class="hljs-tag">&lt;<span class="hljs-name">dagger</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dagger</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Test <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Test'</span>  <span class="hljs-comment">// 这里引入Test组件</span>
<span class="hljs-keyword">import</span> Dagger <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Dagger'</span> <span class="hljs-comment">// 引入Dagger组件        2.引入Dagger</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    Test, <span class="hljs-comment">// 在components中添加Test</span>
    Dagger                                                <span class="hljs-number">3.</span>注入Dagger
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">noSay</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">toFatherSay</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">massage</span>) </span>{
      <span class="hljs-keyword">this</span>.noSay = massage
    },
    <span class="hljs-attr">changeDagger</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{                       <span class="hljs-number">4.</span>增加按钮点击触发的事件
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'daggerCtrl'</span>) <span class="hljs-comment">// 使用commit(提交)方法唤醒名为daggerCtrl的mutation</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>dagger.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;dagger&quot; v-if=&quot;this.$store.state.showDagger&quot;>
        <h1>Dagger</h1>
    </div>
</template>

<script>

</script>

<style scoped>
.dagger {
    margin: 0 auto;
    width: 50%;
    height: 100px;
    background-color: red;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dagger"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"this.$store.state.showDagger"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Dagger<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.dagger</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>打开浏览器 看效果：<br><span class="img-wrap"><img data-src="/img/bVHCbZ?w=700&amp;h=600" src="https://static.alili.tech/img/bVHCbZ?w=700&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>使用vuex实现组件通信就搞定了，更多的用法请参考vuex文档。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0开发聊天程序（三）组件的通信

## 原文链接
[https://segmentfault.com/a/1190000007970524](https://segmentfault.com/a/1190000007970524)

