---
title: 'Vue 模板编译原理' 
date: 2018-12-10 2:30:07
hidden: true
slug: 3tmjy8mnjax
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.codedata.cn/hacknews/152110789460328114" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<h1 id="articleHeader0">Vue 模板编译原理</h1>
<p>关于vue的内部原理其实有很多个重要的部分，变化侦测，模板编译，virtualDOM，整体运行流程等。</p>
<p>之前写过一篇<a href="https://github.com/berwin/Blog/issues/17" rel="nofollow noreferrer" target="_blank">《深入浅出 - vue变化侦测原理》</a> 讲了关于变化侦测的实现原理。</p>
<p>那今天主要把 <strong>模板编译</strong> 这部分的实现原理单独拿出来讲一讲。</p>
<p>本文我可能不会在文章中说太多细节部分的处理，我会把 vue 对模板编译这部分的整体原理讲清楚，主要是让读者读完文章后对模板编译的整体实现原理有一个清晰的思路和理解。</p>
<p>关于 Vue 编译原理这块的整体逻辑主要分三个部分，也可以说是分三步，这三个部分是有前后关系的：</p>
<ul>
<li>第一步是将 <code>模板字符串</code> 转换成 <code>element ASTs</code>（解析器）</li>
<li>第二步是对 <code>AST</code> 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）</li>
<li>第三步是 使用 <code>element ASTs</code> 生成 <code>render</code> 函数代码字符串（代码生成器）</li>
</ul>
<h2 id="articleHeader1">解析器</h2>
<p>解析器主要干的事是将 <code>模板字符串</code> 转换成 <code>element ASTs</code>，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;div&gt;
  &lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>上面这样一个简单的 <code>模板</code> 转换成 <code>element AST</code> 后是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  tag: &quot;div&quot;
  type: 1,
  staticRoot: false,
  static: false,
  plain: true,
  parent: undefined,
  attrsList: [],
  attrsMap: {},
  children: [
      {
      tag: &quot;p&quot;
      type: 1,
      staticRoot: false,
      static: false,
      plain: true,
      parent: {tag: &quot;div&quot;, ...},
      attrsList: [],
      attrsMap: {},
      children: [{
          type: 2,
          text: &quot;"{{"name"}}"&quot;,
          static: false,
          expression: &quot;_s(name)&quot;
      }]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">{
  tag: <span class="hljs-string">"div"</span>
  type: <span class="hljs-number">1</span>,
  staticRoot: <span class="hljs-literal">false</span>,
  <span class="hljs-keyword">static</span>: <span class="hljs-literal">false</span>,
  plain: <span class="hljs-literal">true</span>,
  parent: undefined,
  attrsList: [],
  attrsMap: {},
  children: [
      {
      tag: <span class="hljs-string">"p"</span>
      type: <span class="hljs-number">1</span>,
      staticRoot: <span class="hljs-literal">false</span>,
      <span class="hljs-keyword">static</span>: <span class="hljs-literal">false</span>,
      plain: <span class="hljs-literal">true</span>,
      parent: {tag: <span class="hljs-string">"div"</span>, ...},
      attrsList: [],
      attrsMap: {},
      children: [{
          type: <span class="hljs-number">2</span>,
          text: <span class="hljs-string">""{{"name"}}""</span>,
          <span class="hljs-keyword">static</span>: <span class="hljs-literal">false</span>,
          expression: <span class="hljs-string">"_s(name)"</span>
      }]
    }
  ]
}</code></pre>
<p>我们先用这个简单的例子来说明这个解析器的内部究竟发生了什么。</p>
<p>这段模板字符串会扔到 <code>while</code> 中去循环，然后 <strong>一段一段</strong> 的截取，把截取到的 <strong>每一小段字符串</strong> 进行解析，直到最后截没了，也就解析完了。</p>
<p>上面这个简单的模板截取的过程是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;div&gt;
  &lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;/p&gt;
&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;/div&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;/div&gt;</code></pre>
<p>那是根据什么截的呢？换句话说截取字符串有什么规则么？</p>
<p>当然有</p>
<p>只要判断模板字符串是不是以 <code>&lt;</code> 开头我们就可以知道我们接下来要截取的这一小段字符串是 <code>标签</code> 还是 <code>文本</code>。</p>
<p>举个?：</p>
<p><code>&lt;div&gt;&lt;/div&gt;</code> 这样的一段字符串是以 <code>&lt;</code> 开头的，那么我们通过正则把 <code>&lt;div&gt;</code> 这一部分 <code>match</code> 出来，就可以拿到这样的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  tagName: 'div',
  attrs: [],
  unarySlash: '',
  start: 0,
  end: 5
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">{
  tagName: 'div',
  attrs: [],
  unarySlash: '',
  start: <span class="hljs-number">0</span>,
  end: <span class="hljs-number">5</span>
}</code></pre>
<p>好奇如何用正则解析出 tagName 和 attrs 等信息的同学可以看下面这个demo代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
let html = `<div></div>`
let index = 0
const start = html.match(startTagOpen)

const match = {
  tagName: start[1],
  attrs: [],
  start: 0
}
html = html.substring(start[0].length)
index += start[0].length
let end, attr
while (!(end = html.match(startTagClose)) &amp;&amp; (attr = html.match(attribute))) {
  html = html.substring(attr[0].length)
  index += attr[0].length
  match.attrs.push(attr)
}
if (end) {
  match.unarySlash = end[1]
  html = html.substring(end[0].length)
  index += end[0].length
  match.end = index
}
console.log(match)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">const ncname = '[a-zA-<span class="hljs-type">Z_</span>][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new <span class="hljs-type">RegExp</span>(`^&lt;${qnameCapture}`)
const startTagClose = /^\s*(\/?)&gt;/
<span class="hljs-keyword">let</span> html = `&lt;div&gt;&lt;/div&gt;`
<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>
const start = html.match(startTagOpen)

const match = {
  tagName: start[<span class="hljs-number">1</span>],
  attrs: [],
  start: <span class="hljs-number">0</span>
}
html = html.substring(start[<span class="hljs-number">0</span>].length)
index += start[<span class="hljs-number">0</span>].length
<span class="hljs-keyword">let</span> end, attr
<span class="hljs-keyword">while</span> (!(end = html.match(startTagClose)) &amp;&amp; (attr = html.match(attribute))) {
  html = html.substring(attr[<span class="hljs-number">0</span>].length)
  index += attr[<span class="hljs-number">0</span>].length
  match.attrs.push(attr)
}
<span class="hljs-keyword">if</span> (end) {
  match.unarySlash = end[<span class="hljs-number">1</span>]
  html = html.substring(end[<span class="hljs-number">0</span>].length)
  index += end[<span class="hljs-number">0</span>].length
  match.end = index
}
console.log(match)</code></pre>
<h3 id="articleHeader2">Stack</h3>
<p>用正则把 <code>开始标签</code> 中包含的数据（attrs, tagName 等）解析出来之后还要做一个很重要的事，就是要维护一个 <code>stack</code>。</p>
<p>那这个 <code>stack</code> 是用来干什么的呢？</p>
<p><strong>这个 <code>stack</code> 是用来记录一个层级关系的，用来记录DOM的深度。</strong></p>
<p>更准确的说，当解析到一个 <code>开始标签</code> 或者 <code>文本</code>，无论是什么， <code>stack</code> 中的最后一项，永远是当前正在被解析的节点的 <code>parentNode</code> 父节点。</p>
<p>通过 <code>stack</code> 解析器就可以把当前解析到的节点 <code>push</code> 到 父节点的 <code>children</code> 中。</p>
<p>也可以把当前正在解析的节点的 <code>parent</code> 属性设置为 父节点。</p>
<p>事实上也确实是这么做的。</p>
<p>但并不是只要解析到一个标签的开始部分就把当前标签 <code>push</code> 到 <code>stack</code> 中。</p>
<p>因为在 HTML 中有一种 <code>自闭和标签</code>，比如 <code>input</code>。</p>
<p><code>&lt;input /&gt;</code> 这种 <code>自闭和的标签</code> 是不需要 <code>push</code> 到 <code>stack</code> 中的，因为 <code>input</code> 并不存在子节点。</p>
<p>所以当解析到一个标签的开始时，要判断当前被解析的标签是否是自闭和标签，如果不是自闭和标签才 <code>push</code> 到 <code>stack</code> 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!unary) {
  currentParent = element
  stack.push(element)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-keyword">if</span> (!unary) {
  currentParent = element
  stack.push(element)
}</code></pre>
<p>现在有了 DOM 的层级关系，也可以解析出DOM的 <code>开始标签</code>，这样每解析一个 <code>开始标签</code> 就生成一个 <code>ASTElement</code> (存储当前标签的attrs，tagName 等信息的object）</p>
<p>并且把当前的 <code>ASTElement</code> push 到 <code>parentNode</code> 的 <code>children</code> 中，同时给当前 <code>ASTElement</code> 的 <code>parent</code> 属性设置为 <code>stack</code> 中的最后一项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="currentParent.children.push(element)
element.parent = currentParent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">currentParent.children.push(element)
element.parent = currentParent</code></pre>
<h3 id="articleHeader3">
<code>&lt;</code> 开头的几种情况</h3>
<p>但并不是所有以 <code>&lt;</code> 开头的字符串都是 <code>开始标签</code>，以 <code>&lt;</code> 开头的字符串有以下几种情况：</p>
<ul>
<li>开始标签 <code>&lt;div&gt;</code>
</li>
<li>结束标签 <code>&lt;/div&gt;</code>
</li>
<li>HTML注释 <code>&lt;!-- 我是注释 --&gt;</code>
</li>
<li>Doctype <code>&lt;!DOCTYPE html&gt;</code>
</li>
<li>条件注释（<a href="https://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment" rel="nofollow noreferrer" target="_blank">Downlevel-revealed conditional comment</a>）</li>
</ul>
<p>当然我们解析器在解析的过程中遇到的最多的是 <code>开始标签</code> <code>结束标签</code> 和 <code>注释</code></p>
<h3 id="articleHeader4">截取文本</h3>
<p>我们继续上面的例子解析，<code>div</code> 的 <code>开始标签</code> 解析之后剩余的模板字符串是下面的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>这一次我们在解析发现 模板字符串 不是以 <code>&lt;</code> 开头了。</p>
<p>那么如果模板字符串不是以 <code>&lt;</code> 开头的怎么处理呢？？</p>
<p>其实如果字符串不是以 <code>&lt;</code> 开头可能会出现这么几种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我是text <div></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">我是text &lt;div&gt;&lt;/div&gt;</code></pre>
<p>或者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我是text </p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">我是text &lt;/p&gt;</code></pre>
<p>不论是哪种情况都会将标签前面的文本部分解析出来，截取这段文本其实并不难，看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 可以直接将本 demo 放到浏览器 console 中去执行
const html = '我是text </p>'
let textEnd = html.indexOf('<')
const text = html.substring(0, textEnd)
console.log(text)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// 可以直接将本 demo 放到浏览器 console 中去执行</span>
const html = '我是text &lt;/p&gt;'
<span class="hljs-keyword">let</span> textEnd = html.indexOf('&lt;')
const text = html.substring(<span class="hljs-number">0</span>, textEnd)
console.log(text)</code></pre>
<p>当然 vue 对文本的截取不只是这么简单，vue对文本的截取做了很安全的处理，如果 <code>&lt;</code> 是文本的一部分，那上面 DEMO 中截取的内容就不是我们想要的，例如这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a < b </p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">a &lt; b &lt;/p&gt;</code></pre>
<p>如果是这样的文本，上面的 demo 肯定就挂了，截取出的文本就会遗漏一部分，而 vue 对这部分是进行了处理的，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let textEnd = html.indexOf('<')
let text, rest, next
if (textEnd >= 0) {
  rest = html.slice(textEnd)
  // 剩余部分的 HTML 不符合标签的格式那肯定就是文本
  // 并且还是以 < 开头的文本
  while (
    !endTag.test(rest) &amp;&amp;
    !startTagOpen.test(rest) &amp;&amp;
    !comment.test(rest) &amp;&amp;
    !conditionalComment.test(rest)
  ) {
    // < in plain text, be forgiving and treat it as text
    next = rest.indexOf('<', 1)
    if (next < 0) break
    textEnd += next
    rest = html.slice(textEnd)
  }
  text = html.substring(0, textEnd)
  html = html.substring(0, textEnd)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-keyword">let</span> textEnd = html.indexOf('&lt;')
<span class="hljs-keyword">let</span> text, rest, next
<span class="hljs-keyword">if</span> (textEnd &gt;= <span class="hljs-number">0</span>) {
  rest = html.slice(textEnd)
  <span class="hljs-comment">// 剩余部分的 HTML 不符合标签的格式那肯定就是文本</span>
  <span class="hljs-comment">// 并且还是以 &lt; 开头的文本</span>
  <span class="hljs-keyword">while</span> (
    !endTag.test(rest) &amp;&amp;
    !startTagOpen.test(rest) &amp;&amp;
    !comment.test(rest) &amp;&amp;
    !conditionalComment.test(rest)
  ) {
    <span class="hljs-comment">// &lt; in plain text, be forgiving and treat it as text</span>
    next = rest.indexOf('&lt;', <span class="hljs-number">1</span>)
    <span class="hljs-keyword">if</span> (next &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">break</span>
    textEnd += next
    rest = html.slice(textEnd)
  }
  text = html.substring(<span class="hljs-number">0</span>, textEnd)
  html = html.substring(<span class="hljs-number">0</span>, textEnd)
}</code></pre>
<p>这段代码的逻辑是如果文本截取完之后，剩余的 <code>模板字符串</code> 开头不符合标签的格式规则，那么肯定就是有没截取完的文本</p>
<p>这个时候只需要循环把 <code>textEnd</code> 累加，直到剩余的 <code>模板字符串</code> 符合标签的规则之后在一次性把 <code>text</code> 从 <code>模板字符串</code> 中截取出来就好了。</p>
<p>继续上面的例子，当前剩余的 <code>模板字符串</code> 是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>截取之后剩余的 <code>模板字符串</code> 是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>被截取出来的文本是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;
 &quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-string">"
 "</span></code></pre>
<p>截取之后就需要对文本进行解析，不过在解析文本之前需要进行预处理，也就是先简单加工一下文本，vue 是这样做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const children = currentParent.children
text = inPre || text.trim()
  ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
  // only preserve whitespace if its not right after a starting tag
  : preserveWhitespace &amp;&amp; children.length ? ' ' : ''" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">const children = currentParent.children
text = inPre || text.trim()
  ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
  <span class="hljs-comment">// only preserve whitespace if its not right after a starting tag</span>
  : preserveWhitespace &amp;&amp; children.length ? ' ' : ''</code></pre>
<p>这段代码的意思是：</p>
<ul>
<li>
<p>如果文本不为空，判断父标签是不是script或style，</p>
<ol>
<li>如果是则什么都不管，</li>
<li>如果不是需要 <code>decode</code> 一下编码，使用github上的 he 这个类库的 <code>decodeHTML</code> 方法</li>
</ol>
</li>
<li>
<p>如果文本为空，判断有没有兄弟节点，也就是 <code>parent.children.length</code> 是不是为 0</p>
<ol>
<li>如果大于0 返回 <code>' '</code>
</li>
<li>如果为 0 返回 <code>''</code>
</li>
</ol>
</li>
</ul>
<p>结果发现这一次的 text 正好命中最后的那个 <code>''</code>，所以这一次就什么都不用做继续下一轮解析就好</p>
<p>继续上面的例子，现在的 <code>模板字符串</code> 变是这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;p&gt;"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>接着解析 <code>&lt;p&gt;</code>，解析流程和上面的 <code>&lt;div&gt;</code> 一样就不说了，直接继续：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"name"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">"{{"name"}}"&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>通过上面写的文本的截取方式这一次截取出来的文本是这个样子的 <code>""{{"name"}}""</code></p>
<h3 id="articleHeader5">解析文本</h3>
<p>其实解析文本节点并不难，只需要将文本节点 <code>push</code> 到 <code>currentParent.children.push(ast)</code> 就行了。</p>
<p>但是带变量的文本和不带变量的纯文本是不同的处理方式。</p>
<p>带变量的文本是指 <code>Hello "{{" name "}}"</code> 这个 <code>name</code> 就是变量。</p>
<p>不带变量的文本是这样的 <code>Hello Berwin</code> 这种没有访问数据的纯文本。</p>
<p>纯文本比较简单，直接将 文本节点的ast <code>push</code> 到 <code>parent</code> 节点的 <code>children</code> 中就行了，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="children.push({
  type: 3,
  text: '我是纯文本'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">children.push({
  type: <span class="hljs-number">3</span>,
  text: '我是纯文本'
})</code></pre>
<p>而带变量的文本要多一个解析文本变量的操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const expression = parseText(text, delimiters) // 对变量解析 "{{"name"}}" => _s(name)
children.push({
  type: 2,
  expression,
  text
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">const expression = parseText(text, delimiters) <span class="hljs-comment">// 对变量解析 "{{"name"}}" =&gt; _s(name)</span>
children.push({
  type: <span class="hljs-number">2</span>,
  expression,
  text
})</code></pre>
<p>上面例子中 <code>""{{"name"}}""</code> 是一个带变量的文本，经过 <code>parseText</code> 解析后 <code>expression</code> 是 <code>_s(name)</code>，所以最后 <code>push</code> 到 <code>currentParent.children</code> 中的节点是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  expression: &quot;_s(name)&quot;,
  text: &quot;"{{"name"}}"&quot;,
  type: 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">{
  expression: <span class="hljs-string">"_s(name)"</span>,
  text: <span class="hljs-string">""{{"name"}}""</span>,
  type: <span class="hljs-number">2</span>
}</code></pre>
<h3 id="articleHeader6">结束标签的处理</h3>
<p>现在文本解析完之后，剩余的 <code>模板字符串</code> 变成了这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;/p&gt;
&lt;/div&gt;</code></pre>
<p>这一次还是用上面说的办法，<code>html.indexOf('&lt;') === 0</code>，发现是 <code>&lt;</code> 开头的，然后用正则去 <code>match</code> 发现符合 <code>结束标签的格式</code>，把它截取出来。</p>
<p>并且还要做一个处理是用当前标签名在 <code>stack</code> 从后往前找，将找到的 <code>stack</code> 中的位置往后的所有标签全部删除（意思是，已经解析到当前的结束标签，那么它的子集肯定都是解析过的，试想一下当前标签都关闭了，它的子集肯定也都关闭了，所以需要把当前标签位置往后从 <code>stack</code>中都清掉）</p>
<p>结束标签不需要解析，只需要将 <code>stack</code> 中的当前标签删掉就好。</p>
<p>虽然不用解析，但 <code>vue</code> 还是做了一个优化处理，<code>children</code> 中的最后一项如果是空格 <code>" "</code>，则删除最后这一项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (lastNode &amp;&amp; lastNode.type === 3 &amp;&amp; lastNode.text === ' ' &amp;&amp; !inPre) {
  element.children.pop()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-keyword">if</span> (lastNode &amp;&amp; lastNode.type === <span class="hljs-number">3</span> &amp;&amp; lastNode.text === ' ' &amp;&amp; !inPre) {
  element.children.pop()
}</code></pre>
<p>因为最后这一项空格是没有用的，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;ul&gt;
  &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
<p>上面例子中解析成 <code>element ASTs</code>之后 <code>ul</code> 的结束标签 <code>&lt;/ul&gt;</code> 和 <code>li</code> 的结束标签 <code>&lt;/li&gt;</code> 之间有一个空格，这个空格也属于文本节点在 <code>ul</code> 的 <code>children</code> 中，这个空格是没有用的，把这个空格删掉每次渲染dom都会少渲染一个文本节点，可以节省一定的性能开销。</p>
<p>现在剩余的 <code>模板字符串</code> 已经不多了，是下面的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;/div&gt;</code></pre>
<p>然后解析文本，就是一个其实就是一个空格的文本节点。</p>
<p>然后再一次解析结束标签 <code>&lt;/div&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;/div&gt;</code></pre>
<p>解析完毕退出 <code>while</code> 循环。</p>
<p>解析完之后拿到的 <code>element ASTs</code> 就是文章开头写的那样。</p>
<p><strong>总结一下</strong></p>
<p>其实这样一个模板解析器的原理不是特别难，主要就是两部分内容，一部分是 <code>截取</code> 字符串，一部分是对截取之后的字符串做 <code>解析</code></p>
<p>每截取一段标签的开头就 <code>push</code> 到 <code>stack</code>中，解析到标签的结束就 <code>pop</code> 出来，当所有的字符串都截没了也就解析完了。</p>
<p>上文中的例子是比较简单的，不涉及一些循环啊，什么的，注释的处理这些也都没有涉及到，但其实这篇文章中想表达的内容也不是来扣细节的，如果扣细节可能要写一本小书才够，一篇文章的字数可能只够把一个大体的逻辑给大家讲清楚，希望同学们见谅，如果对细节感兴趣可以在下面评论，咱们一起讨论共同学习进步~</p>
<h2 id="articleHeader7">优化器</h2>
<p>优化器的目标是找出那些静态节点并打上标记，而静态节点指的是 <code>DOM</code> 不需要发生变化的节点，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>我是静态节点，我不需要发生变化</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;p&gt;我是静态节点，我不需要发生变化&lt;/p&gt;</code></pre>
<p>标记静态节点有两个好处：</p>
<ol>
<li>每次重新渲染的时候不需要为静态节点创建新节点</li>
<li>在 Virtual DOM 中 patching 的过程可以被跳过</li>
</ol>
<p>优化器的实现原理主要分两步：</p>
<ul>
<li>第一步：用递归的方式将所有节点添加 <code>static</code> 属性，标识是不是静态节点</li>
<li>第二步：标记所有静态根节点</li>
</ul>
<p>什么是静态根节点？ 答：子节点全是静态节点的节点就是静态根节点，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>我是静态节点，我不需要发生变化</li>
  <li>我是静态节点2，我不需要发生变化</li>
  <li>我是静态节点3，我不需要发生变化</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;ul&gt;
  &lt;li&gt;我是静态节点，我不需要发生变化&lt;/li&gt;
  &lt;li&gt;我是静态节点<span class="hljs-number">2</span>，我不需要发生变化&lt;/li&gt;
  &lt;li&gt;我是静态节点<span class="hljs-number">3</span>，我不需要发生变化&lt;/li&gt;
&lt;/ul&gt;</code></pre>
<p>ul 就是静态根节点。</p>
<h3 id="articleHeader8">如何将所有节点标记 <code>static</code> 属性？</h3>
<p>vue 判断一个节点是不是静态节点的做法其实并不难：</p>
<ol>
<li>先根据自身是不是静态节点做一个标记 <code>node.static = isStatic(node)</code>
</li>
<li>然后在循环 <code>children</code>，如果 <code>children</code> 中出现了哪怕一个节点不是静态节点，在将当前节点的标记修改成 <code>false</code>： <code>node.static = false</code>。</li>
</ol>
<h4>如何判断一个节点是不是静态节点？</h4>
<p>也就是说 <code>isStatic</code> 这个函数是如何判断静态节点的？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isStatic (node: ASTNode): boolean {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings &amp;&amp; // no dynamic bindings
    !node.if &amp;&amp; !node.for &amp;&amp; // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) &amp;&amp; // not a built-in
    isPlatformReservedTag(node.tag) &amp;&amp; // not a component
    !isDirectChildOfTemplateFor(node) &amp;&amp;
    Object.keys(node).every(isStaticKey)
  ))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function isStatic (node: <span class="hljs-type">ASTNode</span>): boolean {
  <span class="hljs-keyword">if</span> (node.type === <span class="hljs-number">2</span>) { <span class="hljs-comment">// expression</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
  <span class="hljs-keyword">if</span> (node.type === <span class="hljs-number">3</span>) { <span class="hljs-comment">// text</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">return</span> !!(node.pre || (
    !node.hasBindings &amp;&amp; <span class="hljs-comment">// no dynamic bindings</span>
    !node.<span class="hljs-keyword">if</span> &amp;&amp; !node.<span class="hljs-keyword">for</span> &amp;&amp; <span class="hljs-comment">// not v-if or v-for or v-else</span>
    !isBuiltInTag(node.tag) &amp;&amp; <span class="hljs-comment">// not a built-in</span>
    isPlatformReservedTag(node.tag) &amp;&amp; <span class="hljs-comment">// not a component</span>
    !isDirectChildOfTemplateFor(node) &amp;&amp;
    <span class="hljs-type">Object</span>.keys(node).every(isStaticKey)
  ))
}</code></pre>
<p>先解释一下，在上文讲的解析器中将 <code>模板字符串</code> 解析成 <code>AST</code> 的时候，会根据不同的文本类型设置一个 <code>type</code>：</p>
<table>
<thead><tr>
<th>type</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>1</td>
<td>元素节点</td>
</tr>
<tr>
<td>2</td>
<td>带变量的动态文本节点</td>
</tr>
<tr>
<td>3</td>
<td>不带变量的纯文本节点</td>
</tr>
</tbody>
</table>
<p>所以上面 <code>isStatic</code> 中的逻辑很明显，如果 <code>type === 2</code> 那肯定不是 <code>静态节点</code> 返回 <code>false</code>，如果 <code>type === 3</code> 那就是静态节点，返回 <code>true</code>。</p>
<p>那如果 <code>type === 1</code>，就有点复杂了，元素节点判断是不是静态节点的条件很多，咱们先一个个看。</p>
<p>首先如果 <code>node.pre</code> 为 <code>true</code> 直接认为当前节点是静态节点，关于 <code>node.pre</code> 是什么 <a href="https://vuejs.org/v2/api/#v-pre" rel="nofollow noreferrer" target="_blank">请狠狠的点击我</a>。</p>
<p><strong>其次 <code>node.hasBindings</code> 不能为 <code>true</code>。</strong></p>
<p><code>node.hasBindings</code> 属性是在解析器转换 <code>AST</code> 时设置的，如果当前节点的 <code>attrs</code> 中，有 <code>v-</code>、<code>@</code>、<code>:</code>开头的 <code>attr</code>，就会把 <code>node.hasBindings</code> 设置为 <code>true</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dirRE = /^v-|^@|^:/
if (dirRE.test(attr)) {
  // mark element as dynamic
  el.hasBindings = true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">const dirRE = /^v-|^@|^:/
<span class="hljs-keyword">if</span> (dirRE.test(attr)) {
  <span class="hljs-comment">// mark element as dynamic</span>
  el.hasBindings = <span class="hljs-literal">true</span>
}</code></pre>
<p><strong>并且元素节点不能有 <code>if</code> 和 <code>for</code>属性。</strong></p>
<p><code>node.if</code> 和 <code>node.for</code> 也是在解析器转换 <code>AST</code> 时设置的。</p>
<p>在解析的时候发现节点使用了 <code>v-if</code>，就会在解析的时候给当前节点设置一个 <code>if</code> 属性。</p>
<p>就是说元素节点不能使用 <code>v-if</code> <code>v-for</code> <code>v-else</code> 等指令。</p>
<p><strong>并且元素节点不能是 <code>slot</code> 和 <code>component</code>。</strong></p>
<p><strong>并且元素节点不能是组件。</strong></p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<List></List>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-type">List</span>&gt;&lt;/<span class="hljs-type">List</span>&gt;</code></pre>
<p>不能是上面这样的自定义组件</p>
<p><strong>并且元素节点的父级节点不能是带 <code>v-for</code> 的 <code>template</code>，查看详情 <a href="https://vuejs.org/v2/guide/list.html#v-for-on-a-lt-template-gt" rel="nofollow noreferrer" target="_blank">请狠狠的点击我</a>。</strong></p>
<p><strong>并且元素节点上不能出现额外的属性。</strong></p>
<p>额外的属性指的是不能出现 <code>type</code>  <br><code>tag</code> <code>attrsList</code> <code>attrsMap</code> <code>plain</code> <code>parent</code> <code>children</code> <code>attrs</code> <code>staticClass</code> <code>staticStyle</code> 这几个属性之外的其他属性，如果出现其他属性则认为当前节点不是静态节点。</p>
<p>只有符合上面所有条件的节点才会被认为是静态节点。</p>
<h4>如何标记所有节点？</h4>
<p>上面讲如何判断单个节点是否是静态节点，<code>AST</code> 是一棵树，我们如何把所有的节点都打上标记（<code>static</code>）呢？</p>
<p>还有一个问题是，判断 <strong>元素节点</strong>是不是<strong>静态节点</strong>不能光看它自身是不是<strong>静态节点</strong>，如果它的<strong>子节点</strong>不是<strong>静态节点</strong>，那就算它自身符合上面讲的<strong>静态节点</strong>的条件，它也不是<strong>静态节点</strong>。</p>
<p>所以在 vue 中有这样一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0, l = node.children.length; i < l; i++) {
  const child = node.children[i]
  markStatic(child)
  if (!child.static) {
    node.static = false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = node.children.length; i &lt; l; i++) {
  const child = node.children[i]
  markStatic(child)
  <span class="hljs-keyword">if</span> (!child.<span class="hljs-keyword">static</span>) {
    node.<span class="hljs-keyword">static</span> = <span class="hljs-literal">false</span>
  }
}</code></pre>
<p><code>markStatic</code> 可以给节点标记，规则上面刚讲过，vue.js 通过循环 <code>children</code> 打标记，然后每个不同的子节点又会走相同的逻辑去循环它的 <code>children</code> 这样递归下来所有的节点都会被打上标记。</p>
<p>然后在循环中判断，如果某个子节点不是 <strong>静态节点</strong>，那么讲当前节点的标记改为 <code>false</code>。</p>
<p>这样一圈下来之后 <code>AST</code> 上的所有节点都被准确的打上了标记。</p>
<h3 id="articleHeader9">如何标记静态根节点？</h3>
<p>标记静态根节点其实也是递归的过程。</p>
<p>vue 中的实现大概是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function markStaticRoots (node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static &amp;&amp; node.children.length &amp;&amp; !(
      node.children.length === 1 &amp;&amp;
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function markStaticRoots (node: <span class="hljs-type">ASTNode</span>, isInFor: boolean) {
  <span class="hljs-keyword">if</span> (node.type === <span class="hljs-number">1</span>) {
    <span class="hljs-comment">// For a node to qualify as a static root, it should have children that</span>
    <span class="hljs-comment">// are not just static text. Otherwise the cost of hoisting out will</span>
    <span class="hljs-comment">// outweigh the benefits and it's better off to just always render it fresh.</span>
    <span class="hljs-keyword">if</span> (node.<span class="hljs-keyword">static</span> &amp;&amp; node.children.length &amp;&amp; !(
      node.children.length === <span class="hljs-number">1</span> &amp;&amp;
      node.children[<span class="hljs-number">0</span>].type === <span class="hljs-number">3</span>
    )) {
      node.staticRoot = <span class="hljs-literal">true</span>
      <span class="hljs-keyword">return</span>
    } <span class="hljs-keyword">else</span> {
      node.staticRoot = <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">if</span> (node.children) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = node.children.length; i &lt; l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.<span class="hljs-keyword">for</span>)
      }
    }
  }
}</code></pre>
<p>这段代码其实就一个意思：</p>
<p>当前节点是<strong>静态节点</strong>，并且有<strong>子节点</strong>，并且<strong>子节点</strong>不是单个<strong>静态文本节点</strong>这种情况会将当前节点标记为<strong>根静态节点</strong>。</p>
<p>额，，可能有点绕口，重新解释下。</p>
<p>上面我们标记 <strong>静态节点</strong> 的时候有一段逻辑是只有所有 <strong>子节点</strong> 都是 <strong>静态节点</strong>，当前节点才是真正的 <strong>静态节点</strong>。</p>
<p>所以这里我们如果发现一个节点是 <strong>静态节点</strong>，那就能证明它的所有 <strong>子节点</strong> 也都是静态节点，而我们要标记的是 <strong>静态根节点</strong>，所以如果一个静态节点只包含了一个<strong>文本节点</strong>那就不会被标记为 <strong>静态根节点</strong>。</p>
<p>其实这么做也是为了性能考虑，vue 在注释中也说了，如果把一个只包含静态文本的节点标记为根节点，那么它的成本会超过收益~</p>
<p><strong>总结一下</strong></p>
<p>整体逻辑其实就是递归 <code>AST</code> 这颗树，然后将 <strong>静态节点</strong> 和 <strong>静态根节点</strong> 找到并打上标记。</p>
<h2 id="articleHeader10">代码生成器</h2>
<p>代码生成器的作用是使用 <code>element ASTs</code> 生成 <code>render</code> 函数代码字符串。</p>
<p>使用本文开头举的例子中的模板生成后的 <code>AST</code> 来生成 <code>render</code> 后是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  render: `with(this){return _c('div',[_c('p',[_v(_s(name))])])}`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">{
  render: `with(this){<span class="hljs-keyword">return</span> _c('div',[_c('p',[_v(_s(name))])])}`
}</code></pre>
<p>格式化后是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="with(this){
  return _c(
    'div',
    [
      _c(
        'p',
        [
          _v(_s(name))
        ]
      )
    ]
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">with(this){
  <span class="hljs-keyword">return</span> _c(
    'div',
    [
      _c(
        'p',
        [
          _v(_s(name))
        ]
      )
    ]
  )
}</code></pre>
<p>生成后的代码字符串中看到了有几个函数调用 <code>_c</code>，<code>_v</code>，<code>_s</code>。</p>
<p><code>_c</code> 对应的是 <code>createElement</code>，它的作用是创建一个元素。</p>
<ol>
<li>第一个参数是一个HTML标签名</li>
<li>第二个参数是元素上使用的属性所对应的数据对象，可选项</li>
<li>第三个参数是 <code>children</code>
</li>
</ol>
<p>例如：</p>
<p>一个简单的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p title=&quot;Berwin&quot; @click=&quot;c&quot;>1</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">&lt;p title=<span class="hljs-string">"Berwin"</span> @click=<span class="hljs-string">"c"</span>&gt;<span class="hljs-number">1</span>&lt;/p&gt;</code></pre>
<p>生成后的代码字符串是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`with(this){return _c('p',{attrs:{&quot;title&quot;:&quot;Berwin&quot;},on:{&quot;click&quot;:c"}}",[_v(&quot;1&quot;)])}`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">`with(this){<span class="hljs-keyword">return</span> _c('p',{attrs:{<span class="hljs-string">"title"</span>:<span class="hljs-string">"Berwin"</span>},on:{<span class="hljs-string">"click"</span>:<span class="hljs-built_in">c</span>"}}",[_v(<span class="hljs-string">"1"</span>)])}`</code></pre>
<p>格式化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="with(this){
  return _c(
    'p',
    {
      attrs:{&quot;title&quot;:&quot;Berwin&quot;},
      on:{&quot;click&quot;:c}
    },
    [_v(&quot;1&quot;)]
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">with(this){
  <span class="hljs-keyword">return</span> _c(
    'p',
    {
      attrs:{<span class="hljs-string">"title"</span>:<span class="hljs-string">"Berwin"</span>},
      on:{<span class="hljs-string">"click"</span>:<span class="hljs-built_in">c</span>}
    },
    [_v(<span class="hljs-string">"1"</span>)]
  )
}</code></pre>
<p>关于 <code>createElement</code> 想了解更多<a href="https://vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">请狠狠的点击我</a>。</p>
<p><code>_v</code> 的意思是创建一个文本节点。</p>
<p><code>_s</code> 是返回参数中的字符串。</p>
<p>代码生成器的总体逻辑其实就是使用 <code>element ASTs</code> 去递归，然后拼出这样的 <code>_c('div',[_c('p',[_v(_s(name))])])</code> 字符串。</p>
<p>那如何拼这个字符串呢？？</p>
<p>请看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function genElement (el: ASTElement, state: CodegenState) {
  const data = el.plain ? undefined : genData(el, state)
  const children = el.inlineTemplate ? null : genChildren(el, state, true)
    
  let code = `_c('${el.tag}'${
    data ? `,${data}` : '' // data
  }${
    children ? `,${children}` : '' // children
  })`
  
  return code
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function genElement (el: <span class="hljs-type">ASTElement</span>, state: <span class="hljs-type">CodegenState</span>) {
  const data = el.plain ? undefined : genData(el, state)
  const children = el.inlineTemplate ? null : genChildren(el, state, <span class="hljs-literal">true</span>)
    
  <span class="hljs-keyword">let</span> code = `_c('${el.tag}'${
    data ? `,${data}` : '' <span class="hljs-comment">// data</span>
  }${
    children ? `,${children}` : '' <span class="hljs-comment">// children</span>
  })`
  
  <span class="hljs-keyword">return</span> code
}</code></pre>
<p>因为 _c 的参数需要 <code>tagName</code>、<code>data</code> 和 <code>children</code>。</p>
<p>所以上面这段代码的主要逻辑就是用 <code>genData</code> 和 <code>genChildren</code> 获取 <code>data</code> 和 <code>children</code>，然后拼到 <code>_c</code> 中去，拼完后把拼好的 <code>"_c(tagName, data, children)"</code> 返回。</p>
<p>所以我们现在比较关心的两个问题：</p>
<ol>
<li>data 如何生成的（genData 的实现逻辑）？</li>
<li>children 如何生成的（genChildren 的实现逻辑）？</li>
</ol>
<p>我们先看 <code>genData</code> 是怎样的实现逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  // key
  if (el.key) {
    data += `key:${el.key},`
  }
  // ref
  if (el.ref) {
    data += `ref:${el.ref},`
  }
  if (el.refInFor) {
    data += `refInFor:true,`
  }
  // pre
  if (el.pre) {
    data += `pre:true,`
  }
  // ... 类似的还有很多种情况
  data = data.replace(/,$/, '') + '}'
  return data
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function genData (el: <span class="hljs-type">ASTElement</span>, state: <span class="hljs-type">CodegenState</span>): string {
  <span class="hljs-keyword">let</span> data = '{'
  <span class="hljs-comment">// key</span>
  <span class="hljs-keyword">if</span> (el.key) {
    data += `key:${el.key},`
  }
  <span class="hljs-comment">// ref</span>
  <span class="hljs-keyword">if</span> (el.ref) {
    data += `ref:${el.ref},`
  }
  <span class="hljs-keyword">if</span> (el.refInFor) {
    data += `refInFor:<span class="hljs-literal">true</span>,`
  }
  <span class="hljs-comment">// pre</span>
  <span class="hljs-keyword">if</span> (el.pre) {
    data += `pre:<span class="hljs-literal">true</span>,`
  }
  <span class="hljs-comment">// ... 类似的还有很多种情况</span>
  data = data.replace(/,$/, '') + '}'
  <span class="hljs-keyword">return</span> data
}</code></pre>
<p>可以看到，就是根据 <code>AST</code> 上当前节点上都有什么属性，然后针对不同的属性做一些不同的处理，最后拼出一个字符串~</p>
<p>然后我们在看看 <code>genChildren</code> 是怎样的实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function genChildren (
  el: ASTElement,
  state: CodegenState
): string | void {
  const children = el.children
  if (children.length) {
    return `[${children.map(c => genNode(c, state)).join(',')}]`
  }
}

function genNode (node: ASTNode, state: CodegenState): string {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 &amp;&amp; node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function genChildren (
  el: <span class="hljs-type">ASTElement</span>,
  state: <span class="hljs-type">CodegenState</span>
): string | void {
  const children = el.children
  <span class="hljs-keyword">if</span> (children.length) {
    <span class="hljs-keyword">return</span> `[${children.<span class="hljs-built_in">map</span>(<span class="hljs-built_in">c</span> =&gt; genNode(<span class="hljs-built_in">c</span>, state)).<span class="hljs-built_in">join</span>(',')}]`
  }
}

function genNode (node: <span class="hljs-type">ASTNode</span>, state: <span class="hljs-type">CodegenState</span>): string {
  <span class="hljs-keyword">if</span> (node.type === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> genElement(node, state)
  } <span class="hljs-keyword">if</span> (node.type === <span class="hljs-number">3</span> &amp;&amp; node.isComment) {
    <span class="hljs-keyword">return</span> genComment(node)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> genText(node)
  }
}</code></pre>
<p>从上面代码中可以看出，生成 <code>children</code> 的过程其实就是循环 <code>AST</code> 中当前节点的 <code>children</code>，然后把每一项在重新按不同的节点类型去执行 <code>genElement</code> <code>genComment</code> <code>genText</code>。如果 <code>genElement</code> 中又有 <code>children</code> 在循环生成，如此反复递归，最后一圈跑完之后能拿到一个完整的 <code>render</code> 函数代码字符串，就是类似下面这个样子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;_c('div',[_c('p',[_v(_s(name))])])&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"_c('div',[_c('p',[_v(_s(name))])])"</span></code></pre>
<p>最后把生成的 <code>code</code> 装到 <code>with</code> 里。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  const state = new CodegenState(options)
  // 如果ast为空，则创建一个空div
  const code = ast ? genElement(ast, state) : '_c(&quot;div&quot;)'
  return {
    render: `with(this){return ${code"}}"`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">export function generate (
  ast: <span class="hljs-type">ASTElement</span> | void,
  options: <span class="hljs-type">CompilerOptions</span>
): <span class="hljs-type">CodegenResult</span> {
  const state = new <span class="hljs-type">CodegenState</span>(options)
  <span class="hljs-comment">// 如果ast为空，则创建一个空div</span>
  const code = ast ? genElement(ast, state) : '_c(<span class="hljs-string">"div"</span>)'
  <span class="hljs-keyword">return</span> {
    render: `with(this){<span class="hljs-keyword">return</span> ${code"}}"`
  }
}</code></pre>
<p>关于代码生成器的部分到这里就说完了，其实源码中远不止这么简单，很多细节我都没有去说，我只说了一个大体的流程，对具体细节感兴趣的同学可以自己去看源码了解详情。</p>
<h2 id="articleHeader11">总结</h2>
<p>本篇文章我们说了 vue 对模板编译的整体流程分为三个部分：解析器（parser），优化器（optimizer）和代码生成器（code generator）。</p>
<p>解析器（parser）的作用是将 <code>模板字符串</code> 转换成 <code>element ASTs</code>。</p>
<p>优化器（optimizer）的作用是找出那些静态节点和静态根节点并打上标记。</p>
<p>代码生成器（code generator）的作用是使用 <code>element ASTs</code> 生成 render函数代码（generate render function code from element ASTs）。</p>
<p>用一张图来表示：</p>
<p>[图片上传失败...(image-4ad47f-1521111234756)]</p>
<p>解析器（parser）的原理是一小段一小段的去截取字符串，然后维护一个 <code>stack</code> 用来保存DOM深度，每截取到一段标签的开始就 <code>push</code> 到 <code>stack</code> 中，当所有字符串都截取完之后也就解析出了一个完整的 <code>AST</code>。</p>
<p>优化器（optimizer）的原理是用递归的方式将所有节点打标记，表示是否是一个 <code>静态节点</code>，然后再次递归一遍把 <code>静态根节点</code> 也标记出来。</p>
<p>代码生成器（code generator）的原理也是通过递归去拼一个函数执行代码的字符串，递归的过程根据不同的节点类型调用不同的生成方法，如果发现是一颗元素节点就拼一个 <code>_c(tagName, data, children)</code> 的函数调用字符串，然后 <code>data</code> 和 <code>children</code> 也是使用 <code>AST</code> 中的属性去拼字符串。</p>
<p>如果 <code>children</code> 中还有 <code>children</code> 则递归去拼。</p>
<p>最后拼出一个完整的 <code>render</code> 函数代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 模板编译原理

## 原文链接
[https://segmentfault.com/a/1190000013763590](https://segmentfault.com/a/1190000013763590)

