---
title: 'Vue 中的 v-cloak 解读' 
date: 2019-01-18 2:30:34
hidden: true
slug: n2ofcej3nj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue 中的 v-cloak 解读</h1>
<h2 id="articleHeader1">v-cloak 的作用和用法</h2>
<p>用法：</p>
<blockquote><p>这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 <code>[v-cloak] { display: none }</code> 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。<a href="https://cn.vuejs.org/v2/api/#v-cloak" rel="nofollow noreferrer" target="_blank">官方API</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    "{{"msg"}}"
</div>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span>&gt;
    "{{"msg"}}"
&lt;/<span class="hljs-keyword">div</span>&gt;

</code></pre>
<p>HTML 绑定 Vue实例，在页面加载时会闪烁</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008819709" src="https://static.alili.tech/img/remote/1460000008819709" alt="闪烁内容" title="闪烁内容" style="cursor: pointer; display: inline;"></span></p>
<p>然后才会出现 <code>加载完成</code> 字样，为了效果更明显，我们可以延后加载 Vue 实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
    new Vue({
        el: '#app',
        data: {
            msg: 'hello'
        }
    })
},2000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">setTimeout</span>(() =&gt; {
    <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
        <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attribute">data</span>: {
            <span class="hljs-attribute">msg</span>: <span class="hljs-string">'hello'</span>
        }
    })
},<span class="hljs-selector-tag">2000</span>)
</code></pre>
<p>v-cloak 可以解决这一问题，在 css 中加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[v-cloak] {
  display: none;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[v-cloak]</span> {
  <span class="hljs-attribute">display</span>: none;
}
</code></pre>
<p>在 html 中的加载点加上 v-cloak，就可以解决这一问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot; v-cloak>
    "{{"msg"}}"
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span> v-cloak&gt;
    "{{"msg"}}"
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<h2 id="articleHeader2">Vue1.x 与 Vue2 中 v-cloak 的不同</h2>
<p>Vue1 中，允许将 Vue 实例挂载在 body 上，而 Vue2 是不允许的，想对整个页面实例化，需要另外用一个 div 来容纳整个页面内容，对其进行实例化</p>
<p>这样在使用 v-cloak 时，同样需要用到这种方法</p>
<h2 id="articleHeader3">为什么我用的 v-cloak 无效？</h2>
<p>在实际项目中，我们常通过 @import 来加载 css 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;style.css&quot;
@import &quot;index.css&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-keyword">@import</span> <span class="hljs-string">"style.css"</span>
<span class="hljs-variable">@import</span> <span class="hljs-string">"index.css"</span>
</code></pre>
<p>而 @import 是在页面 DOM 完全载入后才会进行加载，如果我们将 <code>[v-cloak]</code> 写在 @import 加载的 css 文件中，就会导致页面仍旧闪烁。</p>
<p>为了避免这种情况，我们可以将 <code>[v-cloak]</code> 写在 link 引入的 css 中，或者写一个内联 css 样式，这样就得到了解决。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 中的 v-cloak 解读

## 原文链接
[https://segmentfault.com/a/1190000008819667](https://segmentfault.com/a/1190000008819667)

