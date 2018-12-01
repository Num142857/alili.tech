---
title: '深入理解js对象的引用' 
date: 2018-12-02 2:30:15
hidden: true
slug: 54rrfvz2zql
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript 有七种内置类型，其中：</h2>
<p><strong>基本类型</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="• 空值(null)
• 未定义(undefined)
• 布尔值( boolean)
• 数字(number)
• 字符串(string)
• 符号(symbol，ES6 中新增)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>• 空值<span class="hljs-comment">(null)</span>
• 未定义<span class="hljs-comment">(undefined)</span>
• 布尔值<span class="hljs-comment">( boolean)</span>
• 数字<span class="hljs-comment">(number)</span>
• 字符串<span class="hljs-comment">(string)</span>
• 符号<span class="hljs-comment">(symbol，ES6 中新增)</span></code></pre>
<p><strong>引用类型</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="• 对象(object)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;">• 对象(<span class="hljs-keyword">object</span>)</code></pre>
<p>对于基本类型，赋值（=）是值的拷贝，比较（===）的是实际的值，而对于引用类型（Array也是一种Object），赋值（=）是引用地址的拷贝，比较（===）的是引用地址：</p>
<p><strong>注：下面图例中用类似于X000001，X000002表示引用地址，只为了更好的举例说明，并不是真实的值</strong></p>
<h2 id="articleHeader1">案例一</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = '哈哈'
const b = '哈哈'
console.log(a === b) // true

const c = {}
const d = {}
console.log(c === d) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-keyword">const</span> a = <span class="hljs-string">'哈哈'</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-string">'哈哈'</span>
console.<span class="hljs-built_in">log</span>(a === b) // <span class="hljs-literal">true</span>

<span class="hljs-keyword">const</span> c = {}
<span class="hljs-keyword">const</span> d = {}
console.<span class="hljs-built_in">log</span>(c === d) // <span class="hljs-literal">false</span></code></pre>
<p><strong>注解：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.a和b是字符串，比较的是值，完全相等
2.c和d是对象，比较的是引用地址，c和d都是一个新对象，方别指向不同的地址，所以不相等" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>1<span class="hljs-selector-class">.a</span>和<span class="hljs-selector-tag">b</span>是字符串，比较的是值，完全相等
2<span class="hljs-selector-class">.c</span>和<span class="hljs-selector-tag">d</span>是对象，比较的是引用地址，<span class="hljs-selector-tag">c</span>和<span class="hljs-selector-tag">d</span>都是一个新对象，方别指向不同的地址，所以不相等</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9Tnd?w=1296&amp;h=1022" src="https://static.alili.tech/img/bV9Tnd?w=1296&amp;h=1022" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">案例二</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = { z: 5, y: 9 }
let b = a
b.z = 6
delete b.y
b.x = 8 
console.log(a) // {z: 6, x: 8}
console.log(a === b) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">a</span> = { z: <span class="hljs-number">5</span>, y: <span class="hljs-number">9</span> }
<span class="hljs-keyword">let</span> <span class="hljs-attr">b</span> = a
b.<span class="hljs-attr">z</span> = <span class="hljs-number">6</span>
delete b.y
b.<span class="hljs-attr">x</span> = <span class="hljs-number">8</span> 
console.log(a) // {z: <span class="hljs-number">6</span>, x: <span class="hljs-number">8</span>}
console.log(<span class="hljs-attr">a</span> === b) // <span class="hljs-literal">true</span></code></pre>
<p><strong>注解：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.a是对象，b=a是将a的引用地址赋值给b
2.a和b都指向与同一个对象，修改这个对象，a和b都会变化" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-number">1.</span><span class="hljs-keyword">a</span>是对象，b=<span class="hljs-keyword">a</span>是将<span class="hljs-keyword">a</span>的引用地址赋值给b
<span class="hljs-number">2.</span><span class="hljs-keyword">a</span>和b都指向与同一个对象，修改这个对象，<span class="hljs-keyword">a</span>和b都会变化</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9Tz1?w=1254&amp;h=966" src="https://static.alili.tech/img/bV9Tz1?w=1254&amp;h=966" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">案例三</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = { z: 5 }
let b = a
b = {z: 6}
console.log(a.z) // 5
console.log(a === b) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">a</span> = { z: <span class="hljs-number">5</span> }
<span class="hljs-keyword">let</span> <span class="hljs-attr">b</span> = a
<span class="hljs-attr">b</span> = {z: <span class="hljs-number">6</span>}
console.log(a.z) // <span class="hljs-number">5</span>
console.log(<span class="hljs-attr">a</span> === b) // <span class="hljs-literal">false</span></code></pre>
<p><strong>注解：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.a是对象，b=a是将a的引用地址赋值给b
2.b = {z: 6}新对象赋值给b，切断了a和b的联系，分别指向于不同的对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.a是对象，b=a是将a的引用地址赋值给<span class="hljs-selector-tag">b</span>
<span class="hljs-number">2</span><span class="hljs-selector-class">.b</span> = {z: <span class="hljs-number">6</span>}新对象赋值给b，切断了a和b的联系，分别指向于不同的对象</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9Tsg?w=1230&amp;h=968" src="https://static.alili.tech/img/bV9Tsg?w=1230&amp;h=968" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4"><strong>总结：(精髓所在)</strong></h2>
<ol>
<li>只操作（修改，删除，添加）对象的属性，不会与之前对象断开连接（案例二）</li>
<li>直接操作对象本身，也就是最外层，会和之前的对象断开连接（案例三）</li>
<li>数组也是对象</li>
</ol>
<h2 id="articleHeader5">案例四</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = { z: 5, y: {x: 8}, w: {r: 10} }
let b = {...a}
b.z = 6
b.y.x = 9
b.w = {r: 11}
console.log(a) // { z: 5, y: {x: 9}, w: {r: 10"}}"
console.log(a.y === b.y) // true
console.log(a.w === b.w) // false
console.log(a === b) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>let a = { <span class="hljs-attribute">z</span>: 5, y: {x: 8}, w: {r: 10} }
let b = {..<span class="hljs-variable">.a</span>}
b<span class="hljs-variable">.z</span> = 6
b<span class="hljs-variable">.y</span><span class="hljs-variable">.x</span> = 9
b<span class="hljs-variable">.w</span> = {r: 11}
console<span class="hljs-variable">.log</span>(a) // { z: 5, y: {x: 9}, w: {r: 10"}}"
console<span class="hljs-variable">.log</span>(a<span class="hljs-variable">.y</span> === b<span class="hljs-variable">.y</span>) // true
console<span class="hljs-variable">.log</span>(a<span class="hljs-variable">.w</span> === b<span class="hljs-variable">.w</span>) // false
console<span class="hljs-variable">.log</span>(a === b) // false</code></pre>
<p><strong>注解：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.b = {...a}中，z是基本类型直接拷贝值，y和w是对象，是引用地址的拷贝
2.y是只操作属性，连接不会断开，w操作了本身，生产了一个新对象，连接断开（参考上面的总结）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>b = {...a}中，z是基本类型直接拷贝值，y和w是对象，是引用地址的拷贝
<span class="hljs-number">2.</span>y是只操作属性，连接不会断开，w操作了本身，生产了一个新对象，连接断开（参考上面的总结）</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9T6J?w=1794&amp;h=978" src="https://static.alili.tech/img/bV9T6J?w=1794&amp;h=978" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><strong>案例四理解之后应该就知道为什么js对象有浅拷贝和深拷贝的区分了</strong></p>
<h2 id="articleHeader6">应用</h2>
<p><strong>场景：</strong>目前有多个用户，每个用户有自己的属性，展示并且可以修改<br><strong>程序实现（例如vue）</strong></p>
<ol>
<li>首先我们将每一个用户都封装成一个单独的模块（.vue），用户初始数据存放在model里面（vuex）</li>
<li>一般来说修改model里面数据，都需要用它的mutations和actions里面的方式，如果用户属性比较多，每一项都需要去定义一个mutations或actions的话，那开发量是相当的大</li>
<li>利用对象的引用关系，传过来的数据不和源对象，切断关系，是直接可以操作源对象，组件与组件之间的通信也可以这个实现</li>
<li>有利也有弊，这种操作起来很简单，但一旦切断他们的联系之后，不好维护，用这种方式需要对对象引用有深入的理解，知道什么时候会断开联系</li>
<li>个人建议只在这种多个相同组件中使用。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV9Wz2?w=1278&amp;h=866" src="https://static.alili.tech/img/bV9Wz2?w=1278&amp;h=866" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">附加福利</h2>
<p>判断两个对象值是否相等（只是纯值，不管引用地址）<br><a href="https://segmentfault.com/a/1190000014792693">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解js对象的引用

## 原文链接
[https://segmentfault.com/a/1190000014724227](https://segmentfault.com/a/1190000014724227)

