---
title: '心路历程：vue2.0+webpack+koa2 前后端同构实践（二）' 
date: 2019-02-07 2:30:15
hidden: true
slug: ytc2g6banlf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue2.0之JSX初体验</h1>
<h2 id="articleHeader1">JSX入门</h2>
<p>JSX来至于React，上手并不复杂，在Vue中使用只有小部分差异</p>
<ul>
<li><p><a href="http://reactjs.cn/react/docs/jsx-in-depth.html" rel="nofollow noreferrer" target="_blank">JSX语法介绍</a></p></li>
<li><p><a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx" rel="nofollow noreferrer" target="_blank">Vue中的JSX语法差异</a></p></li>
</ul>
<h3 id="articleHeader2">标签必须闭合</h3>
<blockquote>
<p>在 JSX 中， &lt;MyComponent /&gt; 是合法的，而 &lt;MyComponent&gt; 就不合法。 <br>所有的标签都必须闭合，可以是自闭和的形式，也可以是常规的闭合。</p>
<p>&lt;div /&gt;和&lt;div&gt;&lt;/div&gt; 是等价的。</p>
</blockquote>
<h3 id="articleHeader3">标签与组件</h3>
<blockquote><p>要渲染 HTML 标签，只需在 JSX 里使用小写字母开头的标签名。<br>要渲染 React 组件，只需创建一个大写字母开头的本地变量。</p></blockquote>
<h3 id="articleHeader4">分支 if/else</h3>
<p><a href="http://reactjs.cn/react/tips/if-else-in-JSX.html" rel="nofollow noreferrer" target="_blank">if-else-in-JSX</a></p>
<p><del>但是实践时，发现vue2.0并不支持，也许是我的姿势不对，稍后填坑。</del></p>
<p>发现可能是一个bug插入JSX中的变量为空字符串时导致如下问题，已经提了<a href="https://github.com/vuejs/vue/issues/3301" rel="nofollow noreferrer" target="_blank">issue</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. Bailing hydration and performing full client-side render. " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code style="word-break: break-word; white-space: initial;">[Vue warn]: The client-side rendered <span class="hljs-keyword">virtual</span> DOM tree <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">matching</span> server-rendered content. Bailing hydration <span class="hljs-keyword">and</span> performing full client-side render. </code></pre>
<h3 id="articleHeader5">循环 for</h3>
<h3 id="articleHeader6">编辑器中格式化插件支持</h3>
<p>推荐插件js-beautify，对html+css(less)+js(es6)都良好支持。<br>支持JSX只要在.jsbeautify文件中添加如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ....
    &quot;e4x&quot;: true
    ....
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>{
    ....
    <span class="hljs-string">"e4x"</span>: true
    ....
}</code></pre>
<h2 id="articleHeader7">从官网例子开始</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Column from './column'

export default {
  props: ['row'],
  serverCacheKey: props => {
    return props.row.id + '::' + props.row.items.length
  },
  render (h) {
    return (
      <tr>
        <th>{this.row.id}</th>
        {this.row.items.map(item => <Column item={item}/>)}
      </tr>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Column <span class="hljs-keyword">from</span> <span class="hljs-string">'./column'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'row'</span>],
  <span class="hljs-attr">serverCacheKey</span>: <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> props.row.id + <span class="hljs-string">'::'</span> + props.row.items.length
  },
  render (h) {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>{this.row.id}<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
        {this.row.items.map(item =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Column</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}/</span>&gt;</span>)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    )
  }
}</span></code></pre>
<p><a href="https://github.com/yyx990803/vue-ssr-demo/blob/master/src/components/row.js" rel="nofollow noreferrer" target="_blank">源码</a></p>
<h3 id="articleHeader8">注意点</h3>
<p>render 方法的参数名必须是h，原因没深究研究，github有提到。</p>
<h3 id="articleHeader9">给自己挖坑</h3>
<p>开始看源码时，误将render写法等同于以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: h => {
    return (
        ...
        <th>{this.row.id}</th>
        ...
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>render: h =&gt; {
    <span class="hljs-keyword">return</span> (
        ...
        &lt;th&gt;{<span class="hljs-keyword">this</span>.row.id}&lt;/th&gt;
        ...
    )
}</code></pre>
<p>导致编译结果<strong>this</strong> 被编译成 <strong>undefined</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function render(h) {
    return h(
        ...
          &quot;th&quot;,
          [undefined.row.id]
        ...
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span><span class="hljs-params">(h)</span> </span>{
    <span class="hljs-keyword">return</span> h(
        ...
          <span class="hljs-string">"th"</span>,
          [<span class="hljs-literal">undefined</span>.row.id]
        ...
    )
}</code></pre>
<h3 id="articleHeader10">作者的回复</h3>
<p>尤大大已经解答了这个<a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/9" rel="nofollow noreferrer" target="_blank">问题</a></p>
<blockquote><p>arrow functions uses lexical this, you can only use normal functions if you want this.</p></blockquote>
<h3 id="articleHeader11">箭头函数</h3>
<p>回头翻看了下阮老师写的<a href="http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a>箭头函数章节，之前看时没能理解到位。</p>
<blockquote><p>函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。</p></blockquote>
<h2 id="articleHeader12">使用JSX实现Vue2.0功能的一些方案</h2>
<h3 id="articleHeader13">插入HTML格式与filters的使用</h3>
<p><a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/4" rel="nofollow noreferrer" target="_blank">基本和JSX一样</a></p>
<h3 id="articleHeader14">Vue组件中的slot[name]标签替代方案</h3>
<p>如果是单slot可以通过子节点表达式插入，一个组件有多solt时怎么处理呢？</p>
<h3 id="articleHeader15">如何实现双向绑定？</h3>
<p>目前的方案基于Vuex来做单向数据流，告别双向绑定。到时候遇到做表单的时候再来仔细考虑下这个问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
心路历程：vue2.0+webpack+koa2 前后端同构实践（二）

## 原文链接
[https://segmentfault.com/a/1190000006004428](https://segmentfault.com/a/1190000006004428)

