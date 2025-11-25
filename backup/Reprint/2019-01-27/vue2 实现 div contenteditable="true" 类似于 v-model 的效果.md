---
title: 'vue2 实现 div contenteditable="true" 类似于 v-model 的效果' 
date: 2019-01-27 2:30:59
hidden: true
slug: apfpcioj7x7
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">问题</h3>
<p>在 <code>vue2</code> 中对表单控件有着良好的双向数据绑定机制，但是对于要特定实现某些功能的输入时，我们就不得不使用到 <code>contenteditable="true"</code> 的 <code>div</code> ，而在这个 <code>div</code> 上是使用 <code>v-model</code> 是没有效果的。那么问题就来了，输入是非常需要双向绑定的，这里的双向数据绑定该如何实现？</p>
<h3 id="articleHeader1">解决思路一：自定义指令</h3>
<p>当然，说在这一段的前面，这种解决方式在 <code>vue2</code> 中是不行的，为什么这么说，因为现在去搜索这个问题绝大多数的搜索结果是这个，所以放在前面。</p>
<h4>实现的原理以及为什么不能用了</h4>
<p>原理：自定义一个双向数据绑定的指令，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('demo', {
    twoWay: true,
    bind: function () {
        this.handler = function () {
            this.set(this.el.innerHTML)
        }.bind(this)
        this.el.addEventListener('input', this.handler)
    },
    update: function (newValue, oldValue) {
        this.el.innerHTML = newValue || ''
    },
    unbind: function () {
        this.el.removeEventListener('input', this.handler)
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.directive(<span class="hljs-string">'demo'</span>, {
    twoWay: <span class="hljs-literal">true</span>,
    bind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.handler = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.set(<span class="hljs-keyword">this</span>.el.innerHTML)
        }.bind(<span class="hljs-keyword">this</span>)
        <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.handler)
    },
    update: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(newValue, oldValue)</span> </span>{
        <span class="hljs-keyword">this</span>.el.innerHTML = newValue || <span class="hljs-string">''</span>
    },
    unbind: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.el.removeEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.handler)
    }
})</code></pre>
<p>至于 <code>this</code> 下的这些方法，在 <code>vue</code> 官网上可能不太容易找到，因为这些是 <code>vue1</code> 中的内容，而在 <code>vue2</code> 中已经被移除了。所以在 <code>vue2</code> 中我们是不能这么干的，当然如果你使用的是 <code>vue1</code> 那么完全没问题，直接拿去用即可。</p>
<h3 id="articleHeader2">解决思路二：使用组件</h3>
<p>单独声明一个组件，在组件内部处理数据（也就是<code>innerHTML</code>），并将数据返回给父组件。<br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div contenteditable=&quot;true&quot;
         v-html=&quot;innerText&quot;
         @input=&quot;changeText&quot;></div>
</template>
<script>
    export default {
        props: ['value'],
        data(){
            return {innerText:this.value}
        },
        methods:{
            changeText(){
                this.innerText = this.$el.innerHTML;
                this.$emit('input',this.innerText);
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">"true"</span>
         <span class="hljs-attr">v-html</span>=<span class="hljs-string">"innerText"</span>
         @<span class="hljs-attr">input</span>=<span class="hljs-string">"changeText"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'value'</span>],
        data(){
            <span class="hljs-keyword">return</span> {<span class="hljs-attr">innerText</span>:<span class="hljs-keyword">this</span>.value}
        },
        <span class="hljs-attr">methods</span>:{
            changeText(){
                <span class="hljs-keyword">this</span>.innerText = <span class="hljs-keyword">this</span>.$el.innerHTML;
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>,<span class="hljs-keyword">this</span>.innerText);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后在父组件中直接使用 <code>v-model</code> 就可以了（这里我把组件名称定义成了 v-edit-div）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <v-edit-div v-model='text'></v-edit-div>
        <span>"{{"text"}}"</span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                text:'改一下试一试',
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">v-edit-div</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">'text'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v-edit-div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data(){
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">text</span>:<span class="hljs-string">'改一下试一试'</span>,
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>至于为什么可以直接用 <code>v-model</code> ,看官网的 API 吧。<br><a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank"> v-model 传送门</a> 使用自定义事件的表单输入组件，那一章节。</p>
<p>问题解决。</p>
<p>=============== 分割线：更新于17-08-25 =====================</p>
<p>忙的不行，之前在评论区也有发现这个例子其实会有不少的问题，包括如何实现异步数据的刷新，更新值之后光标定位的问题等等，在考虑了异步数据和光标问题后，有了以下的这个版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;edit-div&quot;
         v-html=&quot;innerText&quot;
         :contenteditable=&quot;canEdit&quot;
         @focus=&quot;isLocked = true&quot;
         @blur=&quot;isLocked = false&quot;
         @input=&quot;changeText&quot;>
    </div>
</template>
<script type=&quot;text/ecmascript-6&quot;>
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            'value'(){
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
            }
        }
    }
</script>
<style lang=&quot;scss&quot; rel=&quot;stylesheet/scss&quot;>
    .edit-div {
        width: 100%;
        height: 100%;
        overflow: auto;
        word-break: break-all;
        outline: none;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        &amp;[contenteditable=true]{
            user-modify: read-write-plaintext-only;
            &amp;:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;template&gt;
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">edit</span>-<span class="hljs-title">div</span>"</span>
         v-html=<span class="hljs-string">"innerText"</span>
         :contenteditable=<span class="hljs-string">"canEdit"</span>
         <span class="hljs-meta">@focus</span>=<span class="hljs-string">"isLocked = true"</span>
         <span class="hljs-meta">@blur</span>=<span class="hljs-string">"isLocked = false"</span>
         <span class="hljs-meta">@input</span>=<span class="hljs-string">"changeText"</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script type=<span class="hljs-string">"text/ecmascript-6"</span>&gt;
    export <span class="hljs-keyword">default</span>{
        name: <span class="hljs-string">'editDiv'</span>,
        props: {
            value: {
                type: String,
                <span class="hljs-keyword">default</span>: <span class="hljs-string">''</span>
            },
            canEdit: {
                type: <span class="hljs-built_in">Boolean</span>,
                <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
            }
        },
        <span class="hljs-keyword">data</span>(){
            <span class="hljs-keyword">return</span> {
                innerText: <span class="hljs-keyword">this</span>.value,
                isLocked: <span class="hljs-literal">false</span>
            }
        },
        watch: {
            <span class="hljs-string">'value'</span>(){
                <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isLocked || !<span class="hljs-keyword">this</span>.innerText) {
                    <span class="hljs-keyword">this</span>.innerText = <span class="hljs-keyword">this</span>.value;
                }
            }
        },
        methods: {
            changeText(){
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.$el.innerHTML);
            }
        }
    }
&lt;/script&gt;
&lt;style lang=<span class="hljs-string">"scss"</span> rel=<span class="hljs-string">"stylesheet/scss"</span>&gt;
    .edit-div {
        width: <span class="hljs-number">100</span>%;
        height: <span class="hljs-number">100</span>%;
        overflow: auto;
        word-<span class="hljs-keyword">break</span>: <span class="hljs-keyword">break</span>-all;
        outline: none;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        &amp;[contenteditable=<span class="hljs-literal">true</span>]{
            user-modify: read-write-plaintext-only;
            &amp;:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }
    }
&lt;/style&gt;
</code></pre>
<p>这个版本是在项目中最终使用的版本，需要用的直接拿走用即可。<br>注：</p>
<ol>
<li>
<code>canEdit</code> 标志这个div是否是可编辑的，在父组件直接使用 <code>v-model</code> 即可。</li>
<li>该组件应该是一个div元素（也不一定非要是div）的子元素，父元素的大小即为子元素的大小。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2 实现 div contenteditable="true" 类似于 v-model 的效果

## 原文链接
[https://segmentfault.com/a/1190000008261449](https://segmentfault.com/a/1190000008261449)

