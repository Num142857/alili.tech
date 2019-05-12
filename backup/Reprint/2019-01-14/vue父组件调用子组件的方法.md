---
title: 'vue父组件调用子组件的方法' 
date: 2019-01-14 2:30:07
hidden: true
slug: i5li5x7l1b
categories: [reprint]
---

{{< raw >}}

                    
<p>vue组件与组件通信有如下几种情况：</p>
<ul>
<li><p>平行组件</p></li>
<li><p>父组件与子组件</p></li>
<li><p>子组件与父组件</p></li>
</ul>
<p>它们之间通信有几种方法有：</p>
<ul>
<li><p>props</p></li>
<li><p>自定义事件</p></li>
<li><p>vuex</p></li>
</ul>
<p>今天我们聊一下父组件调用子组件的一种方法</p>
<h2 id="articleHeader0">parent.vue</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h1>我是父组件</h1>
        <child ref=&quot;child&quot;></child>
    </div>
</template>
<script>
    import child from './child'
    export default{
        components:{ child },
        methods:{
            parent(){
                this.$.refs.child.childFn()
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./child'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        <span class="hljs-attr">components</span>:{ child },
        <span class="hljs-attr">methods</span>:{
            parent(){
                <span class="hljs-keyword">this</span>.$.refs.child.childFn()
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader1">child.vue</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
       <h2>我是子组件</h2>
    </div>
</template>
<script>
    import child from './child'
    export default{
        components:{ child },
        methods:{
            childFn(){
                alert('父组件调用了我')
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./child'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span></span></span><span class="hljs-template-variable">{
        components:{ child }</span><span class="xml"><span class="undefined">,
        methods:</span></span><span class="hljs-template-variable">{
            childFn(){
                alert('父组件调用了我')
            }</span><span class="xml"><span class="undefined">
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>欢迎指正和补充！~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue父组件调用子组件的方法

## 原文链接
[https://segmentfault.com/a/1190000009525355](https://segmentfault.com/a/1190000009525355)

