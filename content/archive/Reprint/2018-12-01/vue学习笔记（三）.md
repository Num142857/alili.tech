---
title: 'vue学习笔记（三）' 
date: 2018-12-01 2:30:12
hidden: true
slug: w00leu2y6cl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">组件</h2>
<blockquote>是前端在单页面上最好的一种实现方式，每个组件有独立的作用域，且可以相互通信。</blockquote>
<h2 id="articleHeader1">单页面应用 -- SPA</h2>
<blockquote>页面之间的跳转变成了组件之间的切换，不需要重新加载整个页面，也不用考虑页面的生命周期，换成组件的生命周期，在性能上大大的提升了。</blockquote>
<h2 id="articleHeader2">Vue 组件的实现</h2>
<h4>全局组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <!-- 组件的使用 -->
    <global-component></global-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 组件的使用 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">global-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">global-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 组件的定义：Vue.component(组件名称，{template}) -->
Vue.component('global-component',{
    template:'<h1>全局组件</h1>'
})
let vm = new Vue({
    el:'#app'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!-- 组件的定义：Vue.component(组件名称，</span></span><span class="hljs-template-variable">{template}</span><span class="xml"><span class="hljs-comment">) --&gt;</span>
Vue.component('global-component',</span><span class="hljs-template-variable">{
    template:'&lt;h1&gt;全局组件&lt;/h1&gt;'
}</span><span class="xml">)
let vm = new Vue(</span><span class="hljs-template-variable">{
    el:'#app'
}</span><span class="xml">);</span></code></pre>
<p>最终的渲染结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;#app&quot;>
    <h1>全局组件</h1>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"#app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>全局组件<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>局部组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <!-- 组件的使用 -->
    <private-component></private-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 组件的使用 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">private-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">private-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 局部组件的定义：components:{组件名字：{"}}"
let vm = new Vue({
    el:'#app',
    components:{
        'private-component':{
             template:'<h1>局部组件</h1>'
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// 局部组件的定义：components:{组件名字：{"}}"
<span class="hljs-keyword">let</span> vm = new Vue({
    el:<span class="hljs-string">'#app'</span>,
    components:{
        <span class="hljs-string">'private-component'</span>:{
             template:<span class="hljs-string">'&lt;h1&gt;局部组件&lt;/h1&gt;'</span>
        }
    }
});</code></pre>
<p>最终渲染的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <h1>局部组件</h1>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>局部组件<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>组件是一个单独的作用域</h4>
<p>每一个组件有单独的作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let vm = new Vue({
    el:'#app',
    data:{count:10},
    methods:{
        increment:function(){
            this.count +=1;
        }
    },
    components:{
        <!-- 这里写组件 -->
        'component1':{
            template:'<button v-on:click=&quot;increament&quot;>"{{"count"}}"</button>',
            data:function(){
                return {count:0}
            },
            methods:{
                increment:function(){
                    this.count +=1;
                }
            }
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">count</span>:<span class="hljs-number">10</span>},
    <span class="hljs-attr">methods</span>:{
        <span class="hljs-attr">increment</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.count +=<span class="hljs-number">1</span>;
        }
    },
    <span class="hljs-attr">components</span>:{
        &lt;!-- 这里写组件 --&gt;
        <span class="hljs-string">'component1'</span>:{
            <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;button v-on:click="increament"&gt;"{{"count"}}"&lt;/button&gt;'</span>,
            <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">return</span> {<span class="hljs-attr">count</span>:<span class="hljs-number">0</span>}
            },
            <span class="hljs-attr">methods</span>:{
                <span class="hljs-attr">increment</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-keyword">this</span>.count +=<span class="hljs-number">1</span>;
                }
            }
        }
    }
});</code></pre>
<p>渲染结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <p>10</p>
    <!--
        此按钮每次点击都会自增，而p标签永远都是为10，
        原因是组件的作用域是单独的
    -->
    <button>0</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>10<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!--
        此按钮每次点击都会自增，而p标签永远都是为10，
        原因是组件的作用域是单独的
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader3">特殊的HTML结构中使用 is</h2>
<blockquote>特殊结构：下拉列表（select）子元素必须为option，则在使用组件的时候用is</blockquote>
<ul><li>作用：主要用于tab切换</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 使用v-for指令时：单个不用加（）; -->
components:{
    template:'<select><option :value=&quot;obj.value&quot; v-for=&quot;obj in geder&quot;>"{{"obj.text"}}"</option></select>',
    data:function(){
        return {
            geder:[{text:'男',value:1}{text:'女',value:0}]
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 使用v-for指令时：单个不用加（）; --&gt;</span>
components:{
    template:'<span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"obj.value"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"obj in geder"</span>&gt;</span></span><span class="hljs-template-variable">"{{"obj.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>',
    data:function(){
        return {
            geder:[{text:'男',value:1}{text:'女',value:0}]
        }
    }
}</span></code></pre>
<h2 id="articleHeader4">动态组件 :is</h2>
<blockquote>通过控制:is=''的值（即组件的名字）来显示不同的组件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.color = this.color == 'red' ? 'green' : 'red';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.color = <span class="hljs-keyword">this</span>.color == <span class="hljs-string">'red'</span> ? <span class="hljs-string">'green'</span> : <span class="hljs-string">'red'</span>;</code></pre>
<h2 id="articleHeader5">组件封装</h2>
<blockquote>内部返回对象使用闭包函数返回一个对象；</blockquote>
<h2 id="articleHeader6">组件属性</h2>
<p>组件的属性要先声明后使用：即先使用props['属性名'...]，再进行调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <!-- 组件的使用 -->
    <componnent1 title=&quot;组件属性&quot; on-bind:text=&quot;mess&quot;></componnent1>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 组件的使用 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">componnent1</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"组件属性"</span> <span class="hljs-attr">on-bind:text</span>=<span class="hljs-string">"mess"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">componnent1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全局组件的定义 Vue.component(组件名称，{template})

// 局部组件的定义
let vm = new Vue({
    el:'#app',
    data:{
        mess:'动态属性'
    },
    <!-- 局部组件 -->
    componnets:{
        'componnent1':{
            template:'<h1>"{{"title+text"}}"</h1>',
            props:['title','text']
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">// 全局组件的定义 Vue.component(组件名称，</span><span class="hljs-template-variable">{template}</span><span class="xml">)

// 局部组件的定义
let vm = new Vue(</span><span class="hljs-template-variable">{
    el:'#app',
    data:{
        mess:'动态属性'
    }</span><span class="xml">,
    <span class="hljs-comment">&lt;!-- 局部组件 --&gt;</span>
    componnets:</span><span class="hljs-template-variable">{
        'componnent1':{
            template:'&lt;h1&gt;"{{"title+text}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>',
            props:['title','text']
        }
    }
});</span></code></pre>
<p>最终渲染结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <h1>组件属性</h1>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>组件属性<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader7">组件自定义属性</h2>
<ul>
<li>格式：&lt;组件名 v-on:自定义事件名=""&gt;</li>
<li>使用：自定义事件名不需要声明，直接用$emit()触发</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义：
<div id=&quot;app&quot;>
    <!-- 组件名 -->
    <component v-on:事件名><component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 定义：
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 组件名 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">v-on:</span>事件名&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用：直接使用组件对象 this.$emit('事件名')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">//</span> 调用：直接使用组件对象 this.<span class="hljs-variable">$emit</span>(<span class="hljs-string">'事件名'</span>)</code></pre>
<h2 id="articleHeader8">slot分发内容</h2>
<p>Vue组件默认是覆盖渲染的，则使用slot分发内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('component1',{
    tempalte:`
        <div>
            <h1>Tom<h1>
            <!-- 使用slot接收组件中的标签 -->
            <slot></slot>
        </div>
    `
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>Vue.component(<span class="hljs-string">'component1'</span>,{
    tempalte:`<span class="javascript">
        &lt;div&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Tom<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 使用slot接收组件中的标签 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span></span>`
})</code></pre>
<h2 id="articleHeader9">具名 slot</h2>
<p>作用：用于将标签放到特定的位置，则可以使用slot属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <!-- 使用组件 -->
    <component1>
        <!-- 显示标签:使用slot 属性 -->
        <h1 slot=tom&quot;&quot;>tom</h1>
    </component1>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 使用组件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component1</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 显示标签:使用slot 属性 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">tom</span>""&gt;</span>tom<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">component1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('component1'{
    template:'<div><slot name ='tom'></slot><button></button></div>'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>Vue.component('component1'{
    template:'<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span> =<span class="hljs-string">'tom'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>'
});</code></pre>
<h2 id="articleHeader10">模板写法</h2>
<blockquote>将template的内容单独拿出来，写成一个template标签<br>只能有一个根节点\</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义
<template id=&quot;template1&quot;>
    <div></div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 定义
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用
let vm = new Vue({
    el:'#app',
    components:{
        component1:{
            template:'#template1'
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// 使用
<span class="hljs-keyword">let</span> vm = new Vue({
    el:<span class="hljs-string">'#app'</span>,
    components:{
        component1:{
            template:<span class="hljs-string">'#template1'</span>
        }
    }
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue学习笔记（三）

## 原文链接
[https://segmentfault.com/a/1190000014823030](https://segmentfault.com/a/1190000014823030)

