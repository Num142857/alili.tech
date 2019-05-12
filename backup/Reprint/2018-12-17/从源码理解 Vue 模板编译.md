---
title: '从源码理解 Vue 模板编译' 
date: 2018-12-17 2:30:06
hidden: true
slug: wifmfslnvh
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 的 template 是如何编译成真正的 HTML 并做到双向绑定等等特殊功能的呢？以往这个问题对我来说一直是个黑洞。最近看了 Vue 的源码，对模板编译的整个过程的脉络有了更为清晰的了解。</p>
<h2 id="articleHeader0">先甩一张图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922347" src="https://static.alili.tech/img/remote/1460000012922347" alt="Vue 渲染过程" title="Vue 渲染过程" style="cursor: pointer; display: inline;"></span><br>在这张图中，我们可以看到 Vue 的模板编译是在 $mount 的过程中进行的，在 $mount 的时候执行了 compile 这个方法来将 template 里的内容转换成真正的 HTML 代码。complie 之后执行的事情也蛮重要的，这个我们留到最后再说。complie 最终生成 render 函数，等待调用。这个方法分为三步：</p>
<ul>
<li>parse 函数解析 template</li>
<li>optimize 函数优化静态内容</li>
<li>generate 函数创建 render 函数字符串</li>
</ul>
<h2 id="articleHeader1">parse 解析</h2>
<p>在了解 parse 的过程之前，我们需要了解 AST，AST 的全称是 Abstract Syntax Tree，也就是所谓抽象语法树，用来表示代码的数据结构。在 Vue 中我把它理解为<strong>嵌套的、携带标签名、属性和父子关系的 JS 对象，以树来表现 DOM 结构。</strong><br>下面是 Vue 里的 AST 的定义：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922348?w=652&amp;h=851" src="https://static.alili.tech/img/remote/1460000012922348?w=652&amp;h=851" alt="AST" title="AST" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到 AST 有三种类型，并且通过 children 这个字段层层嵌套形成了树状的结构。而每一个 AST 节点存放的就是我们的 HTML 元素、插值表达式或文本内容。AST 正是 parse 函数生成和返回的。<br>parse 函数里定义了许多的正则表达式，通过对标签名开头、标签名结尾、属性字段、文本内容等等的递归匹配。把字符串类型的 template 转化成了树状结构的 AST。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parse 里定义的一些正则
export const onRE = /^@|^v-on:/ //匹配 v-on
export const dirRE = /^v-|^@|^:/ //匹配 v-on 和 v-bind
export const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/ //匹配 v-for 属性
export const forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/ //匹配 v-for 的多种形式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// parse 里定义的一些正则</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onRE = <span class="hljs-regexp">/^@|^v-on:/</span> <span class="hljs-comment">//匹配 v-on</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> dirRE = <span class="hljs-regexp">/^v-|^@|^:/</span> <span class="hljs-comment">//匹配 v-on 和 v-bind</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> forAliasRE = <span class="hljs-regexp">/(.*?)\s+(?:in|of)\s+(.*)/</span> <span class="hljs-comment">//匹配 v-for 属性</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> forIteratorRE = <span class="hljs-regexp">/\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/</span> <span class="hljs-comment">//匹配 v-for 的多种形式</span></code></pre>
<p>我们可以把这个过程理解为一个截取的过程，它把 template 字符串里的元素、属性和文本一个个地截取出来，其中的细节十分琐碎，涉及到各种不同情况（比如不同类型的 v-for，各种 vue 指令、空白节点以及父子关系等等），我们不再赘述。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012922349?w=690&amp;h=309" src="https://static.alili.tech/img/remote/1460000012922349?w=690&amp;h=309" alt="Parse 过程" title="Parse 过程" style="cursor: pointer;"></span></p>
<p>假设我们有一个元素<code>&lt;div id="test"&gt;texttext&lt;/div&gt;</code>，在 parse 完之后会变成如下的结构并返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ele1 = {
    type: 1,
    tag: &quot;div&quot;,
    attrsList: [{name: &quot;id&quot;, value: &quot;test&quot;}],
    attrsMap: {id: &quot;test&quot;},
    parent: undefined,
    children: [{
        type: 3,
        text: 'texttext'
      }
    ],
    plain: true,
    attrs: [{name: &quot;id&quot;, value: &quot;'test'&quot;}]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  ele1 = {
    <span class="hljs-attr">type</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">tag</span>: <span class="hljs-string">"div"</span>,
    <span class="hljs-attr">attrsList</span>: [{<span class="hljs-attr">name</span>: <span class="hljs-string">"id"</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">"test"</span>}],
    <span class="hljs-attr">attrsMap</span>: {<span class="hljs-attr">id</span>: <span class="hljs-string">"test"</span>},
    <span class="hljs-attr">parent</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-attr">children</span>: [{
        <span class="hljs-attr">type</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">text</span>: <span class="hljs-string">'texttext'</span>
      }
    ],
    <span class="hljs-attr">plain</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">attrs</span>: [{<span class="hljs-attr">name</span>: <span class="hljs-string">"id"</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">"'test'"</span>}]
  }</code></pre>
<h2 id="articleHeader2">optimize 优化</h2>
<p>在第二步中，会对 parse 生成的 AST 进行静态内容的优化。静态内容指的是<strong>和数据没有关系，不需要每次都刷新的内容。</strong>标记静态节点的作用是为了在后面做 Vnode 的 diff 时起作用，用来确认一个节点是否应该做 patch 还是直接跳过。optimize 的过程分为两步：</p>
<ul>
<li>标记所有的静态和非静态结点</li>
<li>标记静态根节点</li>
</ul>
<h3 id="articleHeader3">标记所有的静态和非静态结点</h3>
<p>关于这一段我们可以直接看源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function markStatic (node: ASTNode) {
  // 标记 static 属性
  node.static = isStatic(node)
  if (node.type === 1) {
    // 注意这个判断逻辑
    if (
      !isPlatformReservedTag(node.tag) &amp;&amp;
      node.tag !== 'slot' &amp;&amp;
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        node.static = false
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">markStatic</span> (<span class="hljs-params">node: ASTNode</span>) </span>{
  <span class="hljs-comment">// 标记 static 属性</span>
  node.static = isStatic(node)
  <span class="hljs-keyword">if</span> (node.type === <span class="hljs-number">1</span>) {
    <span class="hljs-comment">// 注意这个判断逻辑</span>
    <span class="hljs-keyword">if</span> (
      !isPlatformReservedTag(node.tag) &amp;&amp;
      node.tag !== <span class="hljs-string">'slot'</span> &amp;&amp;
      node.attrsMap[<span class="hljs-string">'inline-template'</span>] == <span class="hljs-literal">null</span>
    ) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = node.children.length; i &lt; l; i++) {
      <span class="hljs-keyword">const</span> child = node.children[i]
      markStatic(child)
      <span class="hljs-keyword">if</span> (!child.static) {
        node.static = <span class="hljs-literal">false</span>
      }
    }
  }
}</code></pre>
<p>上面的代码中有几个需要注意的地方：</p>
<ul><li>isStatic 函数</li></ul>
<p>isStatic 函数顾名思义是判断该节点是否 static 的函数，符合如下内容的节点就会被认为是 static 的节点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 如果是表达式AST节点，直接返回 false
2. 如果是文本AST节点，直接返回 true
3. 如果元素是元素节点，阶段有 v-pre 指令 ||
  1. 没有任何指令、数据绑定、事件绑定等 &amp;&amp;
  2. 没有 v-if 和 v-for &amp;&amp;
  3. 不是 slot 和 component &amp;&amp;
  4. 是 HTML 保留标签 &amp;&amp;
  5. 不是 template 标签的直接子元素并且没有包含在 for 循环中
  则返回 true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-number">1.</span> 如果是表达式AST节点，直接返回 <span class="hljs-literal">false</span>
<span class="hljs-number">2.</span> 如果是文本AST节点，直接返回 <span class="hljs-literal">true</span>
<span class="hljs-number">3.</span> 如果元素是元素节点，阶段有 v-pre 指令 ||
  <span class="hljs-number">1.</span> 没有任何指令、数据绑定、事件绑定等 &amp;&amp;
  <span class="hljs-number">2.</span> 没有 v-<span class="hljs-keyword">if</span> 和 v-<span class="hljs-keyword">for</span> &amp;&amp;
  <span class="hljs-number">3.</span> 不是 slot 和 component &amp;&amp;
  <span class="hljs-number">4.</span> 是 HTML 保留标签 &amp;&amp;
  <span class="hljs-number">5.</span> 不是 template 标签的直接子元素并且没有包含在 <span class="hljs-keyword">for</span> 循环中
  则返回 <span class="hljs-literal">true</span></code></pre>
<ul><li>if 判断条件</li></ul>
<ol>
<li>!isPlatformReservedTag(node.tag)：node.tag 不是 HTML 保留标签时返回true。</li>
<li>node.tag !== 'slot'：标签不是slot。</li>
<li>node.attrsMap['inline-template'] == null：node不是一个内联模板容器。</li>
</ol>
<p>如果满足上面的所有条件，那么这个节点的 static 就会被置为 false 并且不递归子元素，当不满足上面某一个条件时，递归子元素判断子元素是否 static，只有所有元素都是 static 的时候，该元素才是 static。</p>
<h3 id="articleHeader4">标记静态根节点</h3>
<p>这部分理解起来很简单，只有当一个节点是 static 并且其不能只拥有一个静态文本节点时才能被称为 static root。因为作者认为这种情况去做优化，其消耗会超过获得的收益。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (node.static &amp;&amp; node.children.length &amp;&amp; !(
  node.children.length === 1 &amp;&amp;
  node.children[0].type === 3
)) {
  node.staticRoot = true
  return
} else {
  node.staticRoot = false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (node.static &amp;&amp; node.children.length &amp;&amp; !(
  node.children.length === <span class="hljs-number">1</span> &amp;&amp;
  node.children[<span class="hljs-number">0</span>].type === <span class="hljs-number">3</span>
)) {
  node.staticRoot = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">return</span>
} <span class="hljs-keyword">else</span> {
  node.staticRoot = <span class="hljs-literal">false</span>
}</code></pre>
<h2 id="articleHeader5">generate 生成 render</h2>
<p>生成 render 的 generate 函数的输入也是 AST，它递归了 AST 树，为不同的 AST 节点创建了不同的内部调用方法，等待后面的调用。生成 render 函数的过程如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012922350?w=690&amp;h=159" src="https://static.alili.tech/img/remote/1460000012922350?w=690&amp;h=159" alt="generate 函数" title="generate 函数" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="几种内部方法
_c：对应的是 createElement 方法，顾名思义，它的含义是创建一个元素(Vnode)
_v：创建一个文本结点。
_s：把一个值转换为字符串。（eg: "{{"data"}}"）
_m：渲染静态内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>几种内部方法
<span class="hljs-variable">_c</span>：对应的是 createElement 方法，顾名思义，它的含义是创建一个元素(Vnode)
<span class="hljs-variable">_v</span>：创建一个文本结点。
<span class="hljs-variable">_s</span>：把一个值转换为字符串。（eg: "{{"data"}}"）
<span class="hljs-variable">_m</span>：渲染静态内容</code></pre>
<p>假设我们有这么一段 template</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;test&quot;>
    "{{"val"}}"
    <img src=&quot;http://xx.jpg&quot;>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"val"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://xx.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>最终会被转换成这样子的函数字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{render: &quot;with(this){return _c('div',{attrs:{&quot;id&quot;:&quot;test&quot;"}}",[[_v(_s(val))]),_v(&quot; &quot;),_m(0)])}&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-attr">render</span>: <span class="hljs-string">"with(this){return _c('div',{attrs:{"</span>id<span class="hljs-string">":"</span>test<span class="hljs-string">""}}",[[_v(_s(val))]),_v("</span> <span class="hljs-string">"),_m(0)])}"</span>}</code></pre>
<h2 id="articleHeader6">后话</h2>
<p>整个 Vue 渲染过程，前面我们说了 complie 的过程，在做完 parse、optimize 和 generate 之后，我们得到了一个 render 函数字符串。<br>那么接下来 Vue 做的事情就是 new watcher，这个时候会对绑定的数据执行监听，render 函数就是数据监听的回调所调用的，其结果便是重新生成 vnode。当这个 render 函数字符串在第一次 mount、或者绑定的数据更新的时候，都会被调用，生成 Vnode。如果是数据的更新，那么 Vnode 会与数据改变之前的 Vnode 做 diff，对内容做改动之后，就会更新到我们真正的 DOM 上啦~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从源码理解 Vue 模板编译

## 原文链接
[https://segmentfault.com/a/1190000012922342](https://segmentfault.com/a/1190000012922342)

