---
title: 'VUE 单页面应用 修改页面title' 
date: 2019-01-09 2:30:11
hidden: true
slug: yhm11tnxae
categories: [reprint]
---

{{< raw >}}

                    
<h4>路由配置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes: [
    {
        name:'home',
          path: '/home/:openname',
          component: Home,
          meta: {
            title: '首页'
        }
    }
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">routes</span>: [
    {
        <span class="hljs-attribute">name</span>:<span class="hljs-string">'home'</span>,
          <span class="hljs-attribute">path</span>: <span class="hljs-string">'/home/:openname'</span>,
          <span class="hljs-attribute">component</span>: Home,
          <span class="hljs-attribute">meta</span>: {
            <span class="hljs-attribute">title</span>: <span class="hljs-string">'首页'</span>
        }
    }
  ]</code></pre>
<h4>主要代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>router.beforeEach((<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, next) =&gt; {
  <span class="hljs-comment">/* 路由发生变化修改页面title */</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.meta.title) {
    <span class="hljs-built_in">document</span>.title = <span class="hljs-keyword">to</span>.meta.title;
  }
  next();
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE 单页面应用 修改页面title

## 原文链接
[https://segmentfault.com/a/1190000010139214](https://segmentfault.com/a/1190000010139214)

