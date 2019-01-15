---
title: 'vue2 ref的用法，简单易懂——vue2子组件索引' 
date: 2019-01-16 2:30:08
hidden: true
slug: eaco4s0csd
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar></navbar>
    <pagefooter></pagefooter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pagefooter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pagefooter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('navbar',{
    template:'#navbar',
    data:function () {
        return {
            navs:[]
        }
    }
});

Vue.component('pagefooter',{
    template:'#pagefooter',
    data:function () {
        return {
            footer:''
        }
    }
});
new Vue({
    el:'#app',
    mounted:function () {
        //ready,
        //这里怎么直接访问navbar的navs和pagefooter的footer值呢，
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'navbar'</span>,{
    <span class="hljs-attribute">template</span>:<span class="hljs-string">'#navbar'</span>,
    <span class="hljs-attribute">data</span>:function () {
        return {
            <span class="hljs-attribute">navs</span>:[]
        }
    }
});

<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'pagefooter'</span>,{
    <span class="hljs-attribute">template</span>:<span class="hljs-string">'#pagefooter'</span>,
    <span class="hljs-attribute">data</span>:function () {
        return {
            <span class="hljs-attribute">footer</span>:<span class="hljs-string">''</span>
        }
    }
});
<span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>:<span class="hljs-string">'#app'</span>,
    <span class="hljs-attribute">mounted</span>:function () {
        <span class="hljs-comment">//ready,</span>
        <span class="hljs-comment">//这里怎么直接访问navbar的navs和pagefooter的footer值呢，</span>
    }
})</code></pre>
<p>这就用到ref了</p>
<p>修改组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <navbar ref=&quot;navbar&quot;></navbar>
    <pagefooter ref=&quot;pagefooter&quot;></pagefooter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navbar</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"navbar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pagefooter</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"pagefooter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pagefooter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el:'#app',
    mounted:function () {
        //ready,
        //这里怎么直接访问navbar的navs和pagefooter的footer值呢，
        console.log(this.$refs.navbar.navs);
        console.log(this.$refs.pagefooter.footer);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//ready,</span>
        <span class="hljs-comment">//这里怎么直接访问navbar的navs和pagefooter的footer值呢，</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$refs.navbar.navs);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$refs.pagefooter.footer);
    }
})</code></pre>
<p>如果仅仅用到一个普通标签上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ref=&quot;demo&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-keyword">ref</span>=<span class="hljs-string">"demo"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>他的作用和：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('[ref=demo]');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'[ref=demo]'</span>);</code></pre>
<p>的作用一样</p>
<p><a href="http://cn.vuejs.org/v2/guide/components.html#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%B4%A2%E5%BC%95" rel="nofollow noreferrer" target="_blank"></a><a href="http://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/v2/guide/...</a>子组件索引</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2 ref的用法，简单易懂——vue2子组件索引

## 原文链接
[https://segmentfault.com/a/1190000009052002](https://segmentfault.com/a/1190000009052002)

