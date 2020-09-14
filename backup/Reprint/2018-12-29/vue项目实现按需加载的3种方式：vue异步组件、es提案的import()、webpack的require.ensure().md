---
title: 'vue项目实现按需加载的3种方式：vue异步组件、es提案的import()、webpack的require.ensure()' 
date: 2018-12-29 2:30:10
hidden: true
slug: lmmux4t5ix
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1. vue异步组件技术</h3>
<ul><li>vue-router配置路由，使用vue的<a href="https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">异步组件</a>技术，可以实现按需加载。</li></ul>
<p>但是，这种情况下一个组件生成一个js文件。<br>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        {
            path: '/promisedemo',
            name: 'PromiseDemo',
            component: resolve => require(['../components/PromiseDemo'], resolve)
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/promisedemo'</span>,
            name: <span class="hljs-string">'PromiseDemo'</span>,
            component: resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/PromiseDemo'</span>], resolve)
        }</code></pre>
<h3 id="articleHeader1">2. es提案的import()</h3>
<ul>
<li>推荐使用这种方式(需要webpack &gt; 2.4)</li>
<li>webpack官方文档：<a href="https://doc.webpack-china.org/guides/code-splitting#-dynamic-imports-" rel="nofollow noreferrer" target="_blank">webpack中使用import()</a>
</li>
</ul>
<p>vue官方文档：<a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">路由懒加载(使用import())</a></p>
<ul><li>vue-router配置路由，代码如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。
const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
const ImportFuncDemo2 = () => import('../components/ImportFuncDemo2')
// 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。
// const ImportFuncDemo = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo')
// const ImportFuncDemo2 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')
export default new Router({
    routes: [
        {
            path: '/importfuncdemo1',
            name: 'ImportFuncDemo1',
            component: ImportFuncDemo1
        },
        {
            path: '/importfuncdemo2',
            name: 'ImportFuncDemo2',
            component: ImportFuncDemo2
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>// 下面<span class="hljs-number">2</span>行代码，没有指定webpackChunkName，每个组件打包成一个js文件。
<span class="hljs-title">const</span> <span class="hljs-type">ImportFuncDemo1</span> = () =&gt; <span class="hljs-keyword">import</span>('../<span class="hljs-title">components</span>/<span class="hljs-type">ImportFuncDemo1</span>')
<span class="hljs-title">const</span> <span class="hljs-type">ImportFuncDemo2</span> = () =&gt; <span class="hljs-keyword">import</span>('../<span class="hljs-title">components</span>/<span class="hljs-type">ImportFuncDemo2</span>')
// 下面<span class="hljs-number">2</span>行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。
// const <span class="hljs-type">ImportFuncDemo</span> = () =&gt; <span class="hljs-keyword">import</span>(/* <span class="hljs-title">webpackChunkName</span>: '<span class="hljs-type">ImportFuncDemo</span>' */ '../<span class="hljs-title">components</span>/<span class="hljs-type">ImportFuncDemo</span>')
// const <span class="hljs-type">ImportFuncDemo2</span> = () =&gt; <span class="hljs-keyword">import</span>(/* <span class="hljs-title">webpackChunkName</span>: '<span class="hljs-type">ImportFuncDemo</span>' */ '../<span class="hljs-title">components</span>/<span class="hljs-type">ImportFuncDemo2</span>')
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> new <span class="hljs-type">Router</span>({
    <span class="hljs-title">routes</span>: [
        {
            <span class="hljs-title">path</span>: '/<span class="hljs-title">importfuncdemo1'</span>,
            <span class="hljs-title">name</span>: '<span class="hljs-type">ImportFuncDemo1</span>',
            <span class="hljs-title">component</span>: <span class="hljs-type">ImportFuncDemo1</span>
        },
        {
            <span class="hljs-title">path</span>: '/<span class="hljs-title">importfuncdemo2'</span>,
            <span class="hljs-title">name</span>: '<span class="hljs-type">ImportFuncDemo2</span>',
            <span class="hljs-title">component</span>: <span class="hljs-type">ImportFuncDemo2</span>
        }
    ]
})</code></pre>
<h3 id="articleHeader2">3. webpack提供的require.ensure()</h3>
<ul><li>vue-router配置路由，使用webpack的<a href="https://doc.webpack-china.org/api/module-methods#require-ensure" rel="nofollow noreferrer" target="_blank">require.ensure</a>技术，也可以实现按需加载。</li></ul>
<p>这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。<br>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        {
            path: '/promisedemo',
            name: 'PromiseDemo',
            component: resolve => require.ensure([], () => resolve(require('../components/PromiseDemo')), 'demo')
        },
        {
            path: '/hello',
            name: 'Hello',
            // component: Hello
            component: resolve => require.ensure([], () => resolve(require('../components/Hello')), 'demo')
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/promisedemo'</span>,
            name: <span class="hljs-string">'PromiseDemo'</span>,
            component: resolve =&gt; require.<span class="hljs-built_in">ensure</span>([], () =&gt; <span class="hljs-built_in">resolve</span>(require(<span class="hljs-string">'../components/PromiseDemo'</span>)), <span class="hljs-string">'demo'</span>)
        },
        {
            <span class="hljs-attribute">path</span>: <span class="hljs-string">'/hello'</span>,
            name: <span class="hljs-string">'Hello'</span>,
            // component: Hello
            component: resolve =&gt; require.<span class="hljs-built_in">ensure</span>([], () =&gt; <span class="hljs-built_in">resolve</span>(require(<span class="hljs-string">'../components/Hello'</span>)), <span class="hljs-string">'demo'</span>)
        }</code></pre>
<ul><li>详细代码在github仓库：<a href="https://github.com/cag2050/vue_product_demo" rel="nofollow noreferrer" target="_blank">https://github.com/cag2050/vu...</a>
</li></ul>
<p>项目路由配置文件：<a href="https://github.com/cag2050/vue_product_demo/blob/master/src/router/index.js" rel="nofollow noreferrer" target="_blank">https://github.com/cag2050/vu...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目实现按需加载的3种方式：vue异步组件、es提案的import()、webpack的require.ensure()

## 原文链接
[https://segmentfault.com/a/1190000011519350](https://segmentfault.com/a/1190000011519350)

