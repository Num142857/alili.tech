---
title: 'vue nextTick用法' 
date: 2019-01-28 2:30:09
hidden: true
slug: 1c7h84odcnc
categories: [reprint]
---

{{< raw >}}

                    
<p>项目中有个点击显示搜索并让搜索框获取焦点的需求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showsou(){//点击显示搜索框并获取焦点的函数
  this.showit = true
  document.getElementById(&quot;keywords&quot;).focus()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">showsou</span><span class="hljs-params">()</span></span>{<span class="hljs-comment">//点击显示搜索框并获取焦点的函数</span>
  this<span class="hljs-selector-class">.showit</span> = true
  document.getElementById(<span class="hljs-string">"keywords"</span>).focus()
}</code></pre>
<p>按照这种写法，搜索框可以显示，但并未获取焦点，最后看官方文档受到了启发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 修改数据</span>
vm.msg = <span class="hljs-string">'Hello'</span>
<span class="hljs-comment">// DOM 还没有更新</span>
Vue.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// DOM 更新了</span>
})</code></pre>
<p>使用vue nextTick可以解决，最终代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <div class=&quot;soubox&quot;>
      <button class=&quot;showsearch&quot; @click=&quot;showsou&quot;>搜索</button>
      <div class=&quot;sou&quot; v-show=&quot;showit&quot;>
        <input type=&quot;text&quot; name=&quot;&quot; id=&quot;keywords&quot;>
        <div class=&quot;closesou&quot; @click=&quot;hidesou&quot;>X</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showit: false
    }
  },
  methods:{
    showsou(){
      this.showit = true
      this.$nextTick(function () {
        // DOM 更新了
        document.getElementById(&quot;keywords&quot;).focus()
      })
    },
    hidesou(){
      this.showit = false
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
.soubox{position: relative;width:300px;margin:0 auto;}
.sou{position: absolute;left: 0;top:100%;width:100%;}
.closesou{font-size:30px;color:red;cursor: pointer;}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"soubox"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"showsearch"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showsou"</span>&gt;</span>搜索<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sou"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showit"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"keywords"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"closesou"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"hidesou"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">showit</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">methods</span>:{
    showsou(){
      <span class="hljs-keyword">this</span>.showit = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// DOM 更新了</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"keywords"</span>).focus()
      })
    },
    hidesou(){
      <span class="hljs-keyword">this</span>.showit = <span class="hljs-literal">false</span>
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
<span class="hljs-selector-class">.soubox</span>{<span class="hljs-attribute">position</span>: relative;<span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;}
<span class="hljs-selector-class">.sou</span>{<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;}
<span class="hljs-selector-class">.closesou</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;<span class="hljs-attribute">color</span>:red;<span class="hljs-attribute">cursor</span>: pointer;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>亲测可用，特此记录！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue nextTick用法

## 原文链接
[https://segmentfault.com/a/1190000007991925](https://segmentfault.com/a/1190000007991925)

