---
title: 'vue中的provide/inject的学习' 
date: 2018-12-08 2:30:30
hidden: true
slug: kzinrvqotbl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在看element-ui的源码，发现了一个这样的属性:inject.遂查看官网<a href="https://cn.vuejs.org/v2/api/#provide-inject" rel="nofollow noreferrer" target="_blank">provider/inject</a></p>
<p>provider/inject：简单的来说就是在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量。</p>
<blockquote>需要注意的是这里不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。而不是局限于只能从当前父组件的prop属性来获取数据。</blockquote>
<p>下面我们来验证下猜想：</p>
<ul><li>first：定义一个parent component</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
<childOne></childOne>
  </div>
</template>

<script>
  import childOne from '../components/test/ChildOne'
  export default {
    name: &quot;Parent&quot;,
    provide: {
      for: &quot;demo&quot;
    },
    components:{
      childOne
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">childOne</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">childOne</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> childOne <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/test/ChildOne'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Parent"</span>,
    <span class="hljs-attr">provide</span>: {
      <span class="hljs-attr">for</span>: <span class="hljs-string">"demo"</span>
    },
    <span class="hljs-attr">components</span>:{
      childOne
    }
  }</span></code></pre>
<p>在这里我们在父组件中provide for这个变量。</p>
<ul><li>second 定义一个子组件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    "{{"demo"}}"
    <childtwo></childtwo>
  </div>
</template>

<script>
  import childtwo from './ChildTwo'
  export default {
    name: &quot;childOne&quot;,
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      childtwo
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"demo"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">childtwo</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">childtwo</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> childtwo <span class="hljs-keyword">from</span> <span class="hljs-string">'./ChildTwo'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"childOne"</span>,
    <span class="hljs-attr">inject</span>: [<span class="hljs-string">'for'</span>],
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">demo</span>: <span class="hljs-keyword">this</span>.for
      }
    },
    <span class="hljs-attr">components</span>: {
      childtwo
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<ul><li>third 定义另一个子组件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    "{{"demo"}}"
  </div>
</template>

<script>
  export default {
    name: &quot;&quot;,
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"demo"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">inject</span>: [<span class="hljs-string">'for'</span>],
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">demo</span>: <span class="hljs-keyword">this</span>.for
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在2个子组件中我们使用jnject注入了provide提供的变量for，并将它提供给了data属性。</p>
<blockquote>这里官网注明例子只工作在 Vue 2.2.1 或更高版本。低于这个版本时，注入的值会在 props 和 data 初始化之后得到。</blockquote>
<p>运行之后看下结果</p>
<p><span class="img-wrap"><img data-src="/img/bV7iTZ?w=362&amp;h=176" src="https://static.alili.tech/img/bV7iTZ?w=362&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>从上面这个例子可以看出，只要在父组件中调用了，那么在这个父组件生效的生命周期内，所有的子组件都可以调用inject来注入父组件中的值。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中的provide/inject的学习

## 原文链接
[https://segmentfault.com/a/1190000014095107](https://segmentfault.com/a/1190000014095107)

