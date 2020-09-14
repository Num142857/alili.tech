---
title: '在ES6模块特性中，import时如何正确使用花括号"{ }"' 
date: 2019-01-04 2:30:10
hidden: true
slug: 4mq83oos5hp
categories: [reprint]
---

{{< raw >}}

                    
<p>在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。</p>
<p>上文引用自：阮一峰老师的<a href="http://es6.ruanyifeng.com/#docs/module" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a>。</p>
<hr>
<p>而我们这里要说的是在使用<code>import</code>语法引用模块时，如何正确使用<code>{}</code>。</p>
<p>假如有一个<code>B.js</code>，想要通过<code>import</code>语法引用模块<code>A.js</code>，那么可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// B.js
import A from './A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// B.js</span>
<span class="hljs-keyword">import</span> A <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span></code></pre>
<p>而上面的代码生效的前提是，只有在如下<code>A.js</code>中有<strong>默认导出</strong>的<code>export default</code>语法时才会生效。也就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// A.js
export default 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-comment">// A.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-number">42</span></code></pre>
<p>在这种不使用<code>{}</code>来引用模块的情况下，<code>import</code>模块时的命名是随意的，即如下三种引用命名都是正确的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// B.js
import A from './A'
import MyA from './A'
import Something from './A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// B.js</span>
<span class="hljs-keyword">import</span> A <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span>
<span class="hljs-keyword">import</span> MyA <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span>
<span class="hljs-keyword">import</span> Something <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span></code></pre>
<p>因为它总是会解析到<code>A.js</code>中默认的<code>export default</code>。</p>
<hr>
<p>而下面是使用了花括号命名的方式<code>{A}</code>来导入<code>A.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { A } from './A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { A } <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span></code></pre>
<p>上面代码生效的前提是，只有在模块<code>A.js</code>中有如下<strong>命名导出</strong>为<code>A</code>的<code>export name</code>的代码，也就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const A = 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> A = <span class="hljs-number">42</span></code></pre>
<p>而且，在明确声明了命名导出后，那么在另一个<code>js</code>中使用<code>{}</code>引用模块时，<code>import</code>时的模块命名是有意义的，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// B.js
import { A } from './A'                 // 正确，因为A.js中有命名为A的export
import { myA } from './A'               // 错误！因为A.js中没有命名为myA的export
import { Something } from './A'         // 错误！因为A.js中没有命名为Something的export" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// B.js</span>
<span class="hljs-keyword">import</span> { A } <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span>                 <span class="hljs-comment">// 正确，因为A.js中有命名为A的export</span>
<span class="hljs-keyword">import</span> { myA } <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span>               <span class="hljs-comment">// 错误！因为A.js中没有命名为myA的export</span>
<span class="hljs-keyword">import</span> { Something } <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span>         <span class="hljs-comment">// 错误！因为A.js中没有命名为Something的export</span></code></pre>
<p>要想上述代码正确执行，你需要明确声明每一个命名导出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// A.js
export const A = 42
export const myA = 43
export const Something = 44" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-comment">// A.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> A = <span class="hljs-number">42</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> myA = <span class="hljs-number">43</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Something = <span class="hljs-number">44</span></code></pre>
<p><strong>ps: 一个模块中只能有一个默认导出<code>export default</code>，但是却可以有任意命名导出（0个、1个、多个）</strong>，你也可以如下，一次性将他们导入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// B.js
import A, { myA, Something } from './A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// B.js</span>
<span class="hljs-keyword">import</span> A, { myA, Something } <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span></code></pre>
<p>这里我们使用导入默认导出<code>A</code>，以及命名导出<code>myA</code>和<code>Something</code>。</p>
<p>我们甚至可以在导入的时候重命名导入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import X, { myA as myX, Something as XSomething } from './A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> X, { myA <span class="hljs-keyword">as</span> myX, Something <span class="hljs-keyword">as</span> XSomething } <span class="hljs-keyword">from</span> <span class="hljs-string">'./A'</span></code></pre>
<p><strong>总结：</strong>模块的<strong>默认导出</strong>通常是用在你期望该从模块中获取到任何想要的内容；而<strong>命名导出</strong>则是用于一些有用的公共方法，但是这些方法并不总是必要的。</p>
<blockquote><p>原文stackoverflow：<a href="https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281" rel="nofollow noreferrer" target="_blank">原文地址</a>，如有问题欢迎指出。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在ES6模块特性中，import时如何正确使用花括号'{ }'

## 原文链接
[https://segmentfault.com/a/1190000010651936](https://segmentfault.com/a/1190000010651936)

