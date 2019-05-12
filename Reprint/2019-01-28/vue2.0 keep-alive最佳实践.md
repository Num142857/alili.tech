---
title: 'vue2.0 keep-alive最佳实践' 
date: 2019-01-28 2:30:09
hidden: true
slug: 3si0nbj7wwp
categories: [reprint]
---

{{< raw >}}

                    
<h4>1.基本用法</h4>
<p>vue2.0提供了一个keep-alive组件<br>用来缓存组件,避免多次加载相应的组件,减少性能消耗</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
<component>
  <!-- 组件将被缓存 -->
</component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 组件将被缓存 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<p>有时候 可能需要缓存整个站点的所有页面,而页面一般一进去都要触发请求的<br>在使用<code>keep-alive</code>的情况下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive><router-view></router-view></keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;keep-alive&gt;</span><span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span><span class="hljs-section">&lt;/keep-alive&gt;</span></code></pre>
<p>将首次触发请求写在<code>created</code>钩子函数中,就能实现缓存,<br>比如列表页,去了详情页 回来,还是在原来的页面</p>
<h4>2.缓存部分页面或者组件</h4>
<h5>(1)使用router. meta属性</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是目前用的比较多的方式
<keep-alive>
    <router-view v-if=&quot;$route.meta.keepAlive&quot;></router-view>
</keep-alive>
<router-view v-if=&quot;!$route.meta.keepAlive&quot;></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 这是目前用的比较多的方式</span>
&lt;<span class="hljs-keyword">keep</span>-alive&gt;
    &lt;router-<span class="hljs-keyword">view</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"$route.meta.keepAlive"</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;/<span class="hljs-keyword">keep</span>-alive&gt;
&lt;router-<span class="hljs-keyword">view</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!$route.meta.keepAlive"</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;</code></pre>
<p><code>router</code>设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="... 
  routes: [
    { path: '/', redirect: '/index',  component: Index, meta: { keepAlive: true "}}",
    {
      path: '/common',
      component: TestParent,
      children: [
        { path: '/test2', component: Test2, meta: { keepAlive: true } } 
      ]
    }
    ....
    // 表示index和test2都使用keep-alive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">...</span> 
<span class="hljs-attr">  routes:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">'/'</span><span class="hljs-string">,</span> <span class="hljs-attr">redirect:</span> <span class="hljs-string">'/index'</span><span class="hljs-string">,</span>  <span class="hljs-attr">component:</span> <span class="hljs-string">Index,</span> <span class="hljs-attr">meta:</span> <span class="hljs-string">{</span> <span class="hljs-attr">keepAlive:</span> <span class="hljs-literal">true</span> <span class="hljs-string">"}}",</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      path:</span> <span class="hljs-string">'/common'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      component:</span> <span class="hljs-string">TestParent,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">'/test2'</span><span class="hljs-string">,</span> <span class="hljs-attr">component:</span> <span class="hljs-string">Test2,</span> <span class="hljs-attr">meta:</span> <span class="hljs-string">{</span> <span class="hljs-attr">keepAlive:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span> <span class="hljs-string">}</span> 
      <span class="hljs-string">]</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">....</span>
    <span class="hljs-string">//</span> <span class="hljs-string">表示index和test2都使用keep-alive</span></code></pre>
<h5>(2).使用新增属性inlcude/exclude</h5>
<p>2.1.0后提供了<code>include/exclude</code>两个属性 可以针对性缓存相应的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- comma-delimited string -->
<keep-alive include=&quot;a,b&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>
<!-- regex (use v-bind) -->
<keep-alive :include=&quot;/a|b/&quot;>
  <component :is=&quot;view&quot;></component>
</keep-alive>

//其中a,b是组件的name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- comma-delimited string --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">"a,b"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
<span class="hljs-comment">&lt;!-- regex (use v-bind) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">:include</span>=<span class="hljs-string">"/a|b/"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

//其中a,b是组件的name</code></pre>
<p><code>注意</code>:这种方法都是预先知道组件的名称的</p>
<h5>(2)动态判断</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive :include=&quot;includedComponents&quot;>
  <router-view></router-view>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">keep</span>-alive :<span class="hljs-keyword">include</span>=<span class="hljs-string">"includedComponents"</span>&gt;
  &lt;router-<span class="hljs-keyword">view</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;/<span class="hljs-keyword">keep</span>-alive&gt;</code></pre>
<p><code>includedComponents</code>动态设置即可</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0 keep-alive最佳实践

## 原文链接
[https://segmentfault.com/a/1190000008123035](https://segmentfault.com/a/1190000008123035)

