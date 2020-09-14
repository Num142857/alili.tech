---
title: '整理4种Vue组件通信方式' 
date: 2018-12-14 2:30:11
hidden: true
slug: ws22w4ov9kq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">整理4种Vue组件通信方式</h1>
<p>重点是梳理了前两个,父子组件通信和eventBus通信,我觉得Vue文档里的说明还是有一些简易,我自己第一遍是没看明白。</p>
<ul>
<li>父子组件的通信</li>
<li>非父子组件的eventBus通信</li>
<li>利用本地缓存实现组件通信</li>
<li>Vuex通信</li>
</ul>
<h2 id="articleHeader1">第一种通信方式:父子组件通信</h2>
<h3 id="articleHeader2">父组件向子组件传递数据</h3>
<ul><li>
<p>父组件一共需要做4件事</p>
<ul>
<li>1.import son from './son.js' 引入子组件 son</li>
<li>2.在components : {"son"} 里注册所有子组件名称</li>
<li>3.在父组件的template应用子组件, &lt;son&gt;&lt;/son&gt;</li>
<li>4.如果需要传递数据给子组件,就在template模板里写 &lt;son :num="number"&gt;&lt;/son&gt;</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 1.引入子组件
 
     import counter from './counter'
     import son from './son'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> <span class="hljs-comment">// 1.引入子组件</span>
 
     <span class="hljs-keyword">import</span> counter <span class="hljs-keyword">from</span> <span class="hljs-string">'./counter'</span>
     <span class="hljs-keyword">import</span> son <span class="hljs-keyword">from</span> <span class="hljs-string">'./son'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2.在ccmponents里注册子组件

    components : {
        counter,
        son
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 2.在ccmponents里注册子组件</span>

    <span class="hljs-string">components :</span> {
        counter,
        son
    },</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 3.在template里使用子组件

   <son></son>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// 3.在template里使用子组件</span>

   <span class="hljs-params">&lt;son&gt;</span><span class="hljs-params">&lt;/son&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 4.如果需要传递数据,也是在templete里写
 
   <counter :num=&quot;number&quot;></counter>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">// 4.如果需要传递数据,也是在templete里写</span>
 
   &lt;counter :num=<span class="hljs-string">"number"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">counter</span>&gt;</span></span>
</code></pre>
<ul><li>
<p>子组件只需要做1件事</p>
<ul>
<li>1.用props接受数据,就可以直接使用数据</li>
<li><strong><em>2.子组件接受到的数据,不能去修改。如果你的确需要修改,可以用计算属性,或者把数据赋值给子组件data里的一个变量</em></strong></li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   // 1.用Props接受数据
      props: [
               'num'
           ],
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>   <span class="hljs-comment">// 1.用Props接受数据</span>
      <span class="hljs-attribute">props</span>: [
               <span class="hljs-string">'num'</span>
           ],
   </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2.如果需要修改得到的数据,可以这样写
   props: [
            'num'
        ],
  data () {
        return {
            number : this.num
        }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 2.如果需要修改得到的数据,可以这样写</span>
   props: [
            <span class="hljs-string">'num'</span>
        ],
  <span class="hljs-keyword">data</span> () {
        <span class="hljs-keyword">return</span> {
            number : <span class="hljs-keyword">this</span>.num
        }
    },</code></pre>
<h3 id="articleHeader3">子组件向父组件传递数据</h3>
<ul><li>
<p>父组件一共需要做2件事情</p>
<ul>
<li>在template里定义事件</li>
<li>在methods里写函数,监听子组件的事件触发</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. 在templete里应用子组件时,定义事件changeNumber
      <counter :num=&quot;number&quot;
                 @changeNumber=&quot;changeNumber&quot;
      >
      </counter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 1. 在templete里应用子组件时,定义事件changeNumber</span>
      &lt;counter :<span class="hljs-built_in">num</span>=<span class="hljs-string">"number"</span>
                 <span class="hljs-meta">@changeNumber</span>=<span class="hljs-string">"changeNumber"</span>
      &gt;
      &lt;/counter&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2. 用changeNumber监听事件是否触发
        methods: {
            changeNumber(e){
                console.log('子组件emit了',e);
                this.number = e
            },
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 2. 用changeNumber监听事件是否触发</span>
        methods: {
            changeNumber(e){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'子组件emit了'</span>,e);
                <span class="hljs-keyword">this</span>.number = e
            },
        }</code></pre>
<ul><li>
<p>子组件一共需要1件事情</p>
<ul><li>在数据变化后,用$emit触发即可</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. 子组件在数据变化后,用$emit触发即可,第二个参数可以传递参数
        methods: {
            increment(){
                    this.number++
                    this.$emit('changeNumber', this.number)
                },
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 1. 子组件在数据变化后,用$emit触发即可,第二个参数可以传递参数</span>
        methods: {
            increment(){
                    <span class="hljs-keyword">this</span>.number++
                    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'changeNumber'</span>, <span class="hljs-keyword">this</span>.number)
                },
        }</code></pre>
<h2 id="articleHeader4">第二种通信方式: eventBus</h2>
<p>eventBus这种通信方式,针对的是非父子组件之间的通信,它的原理还是通过事件的触发和监听。</p>
<p>但是因为是非父子组件的关系,他们需要有一个中间组件来连接。</p>
<p>我是使用的通过在根组件,也就是#app组件上定义了一个所有组件都可以访问到的组件,具体使用方式如下</p>
<p>使用eventBus传递数据,我们一共需要做3件事情</p>
<ul>
<li>1.给app组件添加Bus属性 (这样所有组件都可以通过this.$root.Bus访问到它,而且不需要引入任何文件)</li>
<li>2.在组件1里,this.$root.Bus.$emit触发事件</li>
<li>3.在组件2里,this.$root.Bus.$on监听事件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.在main.js里给app组件,添加bus属性
import Vue from 'vue'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  data(){
    return {
      Bus : new Vue()
    }
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 1.在main.js里给app组件,添加bus属性</span>
<span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  components: { App },
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  data(){
    <span class="hljs-built_in">return</span> {
      Bus : <span class="hljs-keyword">new</span> Vue()
    }
  }
})
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 2.在组件1里,触发emit

increment(){
        this.number++
        this.$root.Bus.$emit('eventName', this.number)
    },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 2.在组件1里,触发emit</span>

<span class="hljs-function"><span class="hljs-title">increment</span><span class="hljs-params">()</span></span>{
        this.number++
        this.<span class="hljs-variable">$root</span><span class="hljs-selector-class">.Bus</span>.<span class="hljs-variable">$emit</span>(<span class="hljs-string">'eventName'</span>, this.number)
    },
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 3.在组件2里,监听事件,接受数据

mounted(){
    this.$root.Bus.$on('eventName', value => {
        this.number = value
        console.log('busEvent');
    })
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 3.在组件2里,监听事件,接受数据</span>

mounted(){
    <span class="hljs-keyword">this</span>.$root.Bus.$<span class="hljs-keyword">on</span>(<span class="hljs-string">'eventName'</span>, <span class="hljs-keyword">value</span> =&gt; {
        <span class="hljs-keyword">this</span>.number = <span class="hljs-keyword">value</span>
        console.log(<span class="hljs-string">'busEvent'</span>);
    })
},
</code></pre>
<h2 id="articleHeader5">第三种通信方式: 利用localStorage或者sessionStorage</h2>
<p>这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。</p>
<p>通过window.localStorage.getItem(key) 获取数据<br>通过window.localStorage.setItem(key,value) 存储数据</p>
<p>注意用JSON.parse() / JSON.stringify() 做数据格式转换。</p>
<h2 id="articleHeader6">第四种通信方式: 利用Vuex</h2>
<p>Vuex比较复杂,可以单独写一篇</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
整理4种Vue组件通信方式

## 原文链接
[https://segmentfault.com/a/1190000013168979](https://segmentfault.com/a/1190000013168979)

