---
title: '有了 indexOf，为什么 ECMAScript 7 还添加了 Array.prototype.includes' 
date: 2019-01-02 2:30:09
hidden: true
slug: f3cnpp9qzeq
categories: [reprint]
---

{{< raw >}}

                    
<p><code>ECMAScript 7</code> 中新增了用于检测数组中是否包含某个元素 <code>Array.prototype.includes()</code> API，想到了 <code>Array</code> 其实有很多相关 API 可以检测到是否包含某个元素，比如 <code>Array.prototype.indexOf</code>，于是好奇为什么要实现这样一个 "看起来功能有点重复的 API"。</p>
<blockquote><p>前端开发 QQ 群：377786580</p></blockquote>
<p>原文发表于 <a href="http://tasaid.com/blog/20170829180527.html?sgs=sf20170829180527" rel="nofollow noreferrer" target="_blank">http://tasaid.com</a>，转载请参阅 <a href="http://tasaid.com/Blog/20160906231305.html?sgs=sf20170829180527" rel="nofollow noreferrer" target="_blank">转载授权</a>。</p>
<h2 id="articleHeader0">前言</h2>
<p>最近又看了下 ECMAScript 7 规范，看到新的规范中包含 <code>Array.prototype.includes()</code>，方法签名如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.includes(value : any): boolean" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>.prototype.includes(value : <span class="hljs-built_in">any</span>): <span class="hljs-built_in">boolean</span></code></pre>
<p><code>Array.prototype.includes()</code> 是用于检测数组中是否包含某个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0, 1].includes(1) // true
['foo', 'bar'].includes('baz') // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>].includes(<span class="hljs-number">1</span>) <span class="hljs-comment">// true</span>
[<span class="hljs-string">'foo'</span>, <span class="hljs-string">'bar'</span>].includes(<span class="hljs-string">'baz'</span>) <span class="hljs-comment">// false</span></code></pre>
<p>想到了 <code>Array</code> 其实有很多相关 API 可以检测到是否包含某个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0, 1].findIndex(i => i == 1) // 1
['foo', 'baz'].find(i => i == 'foo') // foo
['foo', 'baz'].indexOf('foo') // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>].findIndex(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> i == <span class="hljs-number">1</span>) <span class="hljs-comment">// 1</span>
[<span class="hljs-string">'foo'</span>, <span class="hljs-string">'baz'</span>].find(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> i == <span class="hljs-string">'foo'</span>) <span class="hljs-comment">// foo</span>
[<span class="hljs-string">'foo'</span>, <span class="hljs-string">'baz'</span>].indexOf(<span class="hljs-string">'foo'</span>) <span class="hljs-comment">// 0</span></code></pre>
<ul>
<li>
<code>Array.prototype.findIndex()</code>：返回数组中满足提供的测试函数的第一个元素的索引。否则返回 -1</li>
<li>
<code>Array.prototype.find()</code>：返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined</li>
<li>
<code>Array.prototype.indexOf()</code>：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 -1</li>
</ul>
<p>我们可以简单的通过判断实现<strong>类似</strong> <code>Array.prototype.includes()</code> 的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const includes = (sources : any[] searchElement: any): boolean => {
    return !!~any.indexOf(searchElement)
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> includes = (sources : <span class="hljs-built_in">any</span>[] searchElement: <span class="hljs-built_in">any</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> !!~<span class="hljs-built_in">any</span>.indexOf(searchElement)
} </code></pre>
<p>于是好奇为什么要实现这样一个 "看起来功能有点重复的 API"。</p>
<p>查询了 StackOverflow 和 TC39 (Technical Committee 39，JavaScript 委员会) 的 <a href="https://github.com/tc39/proposals" rel="nofollow noreferrer" target="_blank">ECMAScript 提案</a>，找到一些细节。</p>
<h2 id="articleHeader1">Array.prototype.includes 前身</h2>
<p>早前的 <code>Array.prototype.includes</code> 的提案名为 <code>Array.prototype.contains</code>，但由于有很多网站自行 hack 了 <code>Array.prototype.contains</code>（其实主要是因为 <a href="https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible" rel="nofollow noreferrer" target="_blank">MooTools 导致的</a>），看起来就跟上面的代码类似。</p>
<p>JavaScript 中所有原生提供的方法属性都是 <strong>不可枚举的( enumerable )</strong> 的，我们可以通过 <code>Object.getOwnPropertyDescriptor(object: any, prototypeName : String)</code> 来获取这个属性的属性描述符 (Property Descriptor)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getOwnPropertyDescriptor(Array.prototype, 'indexOf')
// output { writable: true, enumerable: false, configurable: true, value: ƒ() }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-built_in">Array</span>.prototype, <span class="hljs-string">'indexOf'</span>)
<span class="hljs-comment">// output { writable: true, enumerable: false, configurable: true, value: ƒ() }</span></code></pre>
<p>给对象赋值，是不会改变原属性的属性描述符，我们可以给 <code>Array.prototype.indexOf</code> 重新赋值，之后获取它的属性描述符，会发现 <code>indexOf</code> 仍是不可枚举的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.indexOf = () => { return -1 }
Object.getOwnPropertyDescriptor(Array.prototype, 'indexOf')
// output { writable: true, enumerable: false, configurable: true, value: ƒ() }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-built_in">Array</span>.prototype.indexOf = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span> }
<span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-built_in">Array</span>.prototype, <span class="hljs-string">'indexOf'</span>)
<span class="hljs-comment">// output { writable: true, enumerable: false, configurable: true, value: ƒ() }</span></code></pre>
<p>而这些网站自行 <code>hack</code> 的 <code>contains()</code> 是可以被枚举的，也就是可以通过 <code>for..in</code> 读出来。</p>
<p>发现问题了么？</p>
<p>如果规范实现 <code>contains()</code>，会导致 <code>contains()</code> 无法被 <code>for..in</code> 读出来，而之前自行 <code>hack</code> 的 <code>contains()</code> 是可以被读出来的，所以会出现代码没变动，但是在新规范推出后会产生 bug 的情况。</p>
<p>在 <code>Array.prototype.contains</code> 初稿阶段，考虑到新的规范不能让世界上许多现有的网站出问题，所以改名成了 <code>Array.prototype.includes</code>。</p>
<h2 id="articleHeader2">细节</h2>
<h3 id="articleHeader3">起源</h3>
<p>虽然我们可以使用 <code>indexOf()</code> 来模拟 <code>includes()</code> 的行为，但是 <code>indexOf()</code> 在语义上无法清晰的描述这个场景。</p>
<p><code>includes()</code> 是明确的判断 "是否包含该项"，而 <code>indexOf()</code> 是 "查找数组中第一次出现对应元素的索引是什么，再针对返回的索引进一步处理逻辑"，例如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// indexOf
if (~arr.indexOf(1)) { 
   // do something
}

// includes
if (arr.includes(1)) { 
   // do something
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// indexOf</span>
<span class="hljs-keyword">if</span> (~arr.indexOf(<span class="hljs-number">1</span>)) { 
   <span class="hljs-comment">// do something</span>
}

<span class="hljs-comment">// includes</span>
<span class="hljs-keyword">if</span> (arr.includes(<span class="hljs-number">1</span>)) { 
   <span class="hljs-comment">// do something</span>
}</code></pre>
<h3 id="articleHeader4">为什么叫做 includes 而不是 has</h3>
<p><code>has</code> 是用于 <code>key</code> 的，而 <code>includes</code> 是检测 <code>value</code> 的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = new Map()
foo.set('name', 'linkFly')
foo.has('name') // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> foo = <span class="hljs-keyword">new</span> Map()
foo.set(<span class="hljs-string">'name'</span>, <span class="hljs-string">'linkFly'</span>)
foo.has(<span class="hljs-string">'name'</span>) <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader5">SameValueZero</h3>
<p><code>Array.prototype.includes</code> 底层使用了 <a href="http://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero" rel="nofollow noreferrer" target="_blank">SameValueZero()</a> 进行元素比较。</p>
<p>目前 ES2015 草案中有四种相等算法：</p>
<ul>
<li>
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-abstract-equality-comparison" rel="nofollow noreferrer" target="_blank">抽象标准相等比较</a>：实现接口是 <code>==</code> 运算符</li>
<li>
<a href="http://www.ecma-international.org/ecma-262/7.0/#sec-strict-equality-comparison" rel="nofollow noreferrer" target="_blank">严格相等比较</a>：实现接口是 <code>===</code> 运算符，<code>Array.prototype.indexOf</code> 就是使用这种比较</li>
<li>
<p><a href="http://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero" rel="nofollow noreferrer" target="_blank">SameValueZero()</a>：没有直接暴露的接口，内部实现接口是 <code>Map</code> 与 <code>Set</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = new Map()
foo.set(0, '0') // Map(1) {0 => &quot;0&quot;}
foo.set('0', 'zero') // Map(2) {0 => &quot;0&quot;, &quot;0&quot; => &quot;zero&quot;}
foo.get(0) // 0
foo.get('0') // zero" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">new</span> Map()
foo.set(<span class="hljs-number">0</span>, <span class="hljs-string">'0'</span>) <span class="hljs-comment">// Map(1) {0 =&gt; "0"}</span>
foo.set(<span class="hljs-string">'0'</span>, <span class="hljs-string">'zero'</span>) <span class="hljs-comment">// Map(2) {0 =&gt; "0", "0" =&gt; "zero"}</span>
foo.get(<span class="hljs-number">0</span>) <span class="hljs-comment">// 0</span>
foo.get(<span class="hljs-string">'0'</span>) <span class="hljs-comment">// zero</span></code></pre>
</li>
<li>
<p><a href="http://www.ecma-international.org/ecma-262/7.0/#sec-samevalue" rel="nofollow noreferrer" target="_blank">SameValue()</a>：实现接口是 <code>Object.is()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NaN === NaN // false
Object.is(NaN, NaN) // true

-0 === +0 // true
Object.is(-0, +0) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-literal">NaN</span> === <span class="hljs-literal">NaN</span> <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.is(<span class="hljs-literal">NaN</span>, <span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true</span>

<span class="hljs-number">-0</span> === +<span class="hljs-number">0</span> <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.is(<span class="hljs-number">-0</span>, +<span class="hljs-number">0</span>) <span class="hljs-comment">// false</span></code></pre>
</li>
</ul>
<p>和 <code>SameValue()</code> 不同的是，<code>SameValueZero()</code> 不区分 <code>+0</code> 和 <code>-0</code>。而 <code>includes</code> <a href="http://speakingjs.com/es5/ch11.html#two_zeros" rel="nofollow noreferrer" target="_blank">为了和 JavaScript 其他特性保持一致</a> 所以内部也采用了 <code>SameValueZero</code> 实现。</p>
<p>所以 <code>Array.prototype.includes</code> 也不区分 <code>+0</code> 和 <code>-0</code> ，当然也可以检测 <code>NaN</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[-0].includes(+0) // true
[NaN].includes(NaN) // true
[NaN].indexOf(NaN) // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">[<span class="hljs-number">-0</span>].includes(+<span class="hljs-number">0</span>) <span class="hljs-comment">// true</span>
[<span class="hljs-literal">NaN</span>].includes(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true</span>
[<span class="hljs-literal">NaN</span>].indexOf(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// -1</span></code></pre>
<p>具体的相等比较运算符差异请参阅 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#A" rel="nofollow noreferrer" target="_blank">MDN - Equality comparisons and sameness</a>。</p>
<p>具体 <code>Array.prototype.includes</code> 实现的细节可以参考 <code>ecma-262/ECMAScript 7</code> <a href="http://www.ecma-international.org/ecma-262/7.0/#sec-array.prototype.includes" rel="nofollow noreferrer" target="_blank">实现规范</a>。</p>
<h2 id="articleHeader6">参考和引用</h2>
<ul>
<li><a href="https://github.com/tc39/Array.prototype.includes" rel="nofollow noreferrer" target="_blank">tc39 - Array.prototype.includes Proposal</a></li>
<li><a href="https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible" rel="nofollow noreferrer" target="_blank">Having a non-enumerable Array.prototype.contains may not be    web-compatible</a></li>
<li><a href="http://www.ecma-international.org/ecma-262/7.0/#sec-array.prototype.includes" rel="nofollow noreferrer" target="_blank">ECMAScript® 2016 Language Specification - Array.prototype.includes</a></li>
<li><a href="http://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero" rel="nofollow noreferrer" target="_blank">ECMAScript® 2015 Language Specification - SameValueZero</a></li>
<li><a href="https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript" rel="nofollow noreferrer" target="_blank">stackoverflow - How do I check if an array includes an object in JavaScript?</a></li>
<li><a>http://2ality.com/2016/02/array-prototype-includes.html</a></li>
<li><a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1075059" rel="nofollow noreferrer" target="_blank">Bugzilla@Mozilla - non-enumerable Array.prototype.contains is not web-compatible (breaks jsfiddle.net)</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
有了 indexOf，为什么 ECMAScript 7 还添加了 Array.prototype.includes

## 原文链接
[https://segmentfault.com/a/1190000010911972](https://segmentfault.com/a/1190000010911972)

