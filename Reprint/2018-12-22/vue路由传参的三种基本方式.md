---
title: 'vue路由传参的三种基本方式' 
date: 2018-12-22 2:30:11
hidden: true
slug: ocvznujzans
categories: [reprint]
---

{{< raw >}}

                    
<p>现有如下场景，点击父组件的li元素跳转到子组件中，并携带参数，便于子组件获取数据。<br>父组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <li v-for=&quot;article in articles&quot; @click=&quot;getDescribe(article.id)&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">  &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"article in articles"</span> @click=<span class="hljs-string">"getDescribe(article.id)"</span>&gt;</code></pre>
<p>methods：</p>
<h2 id="articleHeader0">方案一：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      getDescribe(id) {
//   直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/describe/${id}`,
        })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>      getDescribe(id) {
<span class="hljs-regexp">//</span>   直接调用<span class="hljs-variable">$router</span>.push 实现携带参数的跳转
        this.<span class="hljs-variable">$router</span>.push({
          path: `<span class="hljs-regexp">/describe/</span><span class="hljs-variable">${id}</span>`,
        })</code></pre>
<p>方案一，需要对应路由配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   {
     path: '/describe/:id',
     name: 'Describe',
     component: Describe
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>   {
     <span class="hljs-attribute">path</span>: <span class="hljs-string">'/describe/:id'</span>,
     name: <span class="hljs-string">'Describe'</span>,
     component: Describe
   }</code></pre>
<p>很显然，需要在path中添加/:id来对应 $router.push 中path携带的参数。在子组件中可以使用来获取传递的参数值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$route.params.id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.id</span></code></pre>
<h2 id="articleHeader1">方案二：</h2>
<p>父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       this.$router.push({
          name: 'Describe',
          params: {
            id: id
          }
        })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>       <span class="hljs-keyword">this</span>.$router.push({
          <span class="hljs-attribute">name</span>: <span class="hljs-string">'Describe'</span>,
          <span class="hljs-attribute">params</span>: {
            <span class="hljs-attribute">id:</span><span class="hljs-string"> id</span>
          }
        })</code></pre>
<p>对应路由配置: 注意这里不能使用:/id来传递参数了，因为父组件中，已经使用params来携带参数了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>   {
     <span class="hljs-attribute">path</span>: <span class="hljs-string">'/describe'</span>,
     name: <span class="hljs-string">'Describe'</span>,
     component: Describe
   }</code></pre>
<p>子组件中: 这样来获取参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$route.params.id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.id</span></code></pre>
<h2 id="articleHeader2">方案三：</h2>
<p>父组件：使用path来匹配路由，然后通过query来传递参数<br>这种情况下 query传递的参数会显示在url后面?id=？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.$router.push({
          path: '/describe',
          query: {
            id: id
          }
        })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>    <span class="hljs-keyword">this</span>.$router.push({
          <span class="hljs-attribute">path</span>: <span class="hljs-string">'/describe'</span>,
          <span class="hljs-attribute">query</span>: {
            <span class="hljs-attribute">id:</span><span class="hljs-string"> id</span>
          }
        })</code></pre>
<p>对应路由配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>   {
     <span class="hljs-attribute">path</span>: <span class="hljs-string">'/describe'</span>,
     name: <span class="hljs-string">'Describe'</span>,
     component: Describe
   }</code></pre>
<p>对应子组件: 这样来获取参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$route.query.id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.id</span></code></pre>
<blockquote>这里要特别注意 在子组件中 获取参数的时候是$route.params 而不是<br>$router 这很重要~~~</blockquote>
<p>[<em>更多详情</em>]（<a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-...</a>）</p>
<blockquote>tips<br>可能上面少了this 会误导新手 直接使用 $route来获取，所以这边加上this</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue路由传参的三种基本方式

## 原文链接
[https://segmentfault.com/a/1190000012393587](https://segmentfault.com/a/1190000012393587)

