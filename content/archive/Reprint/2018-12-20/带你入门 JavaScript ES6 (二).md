---
title: '带你入门 JavaScript ES6 (二)' 
date: 2018-12-20 2:30:10
hidden: true
slug: h81zal7bfpa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文同步 <a href="http://blog.phpzendo.com/?p=86" rel="nofollow noreferrer" target="_blank">带你入门 JavaScript ES6 (二)</a>，转载请注明出处。</blockquote>
<p>上一篇<a href="https://segmentfault.com/a/1190000012583233">学习下一代 JavaScript 语法: ES6 (一)</a>，我们学习了关于块作用域变量或常量声明 let 和 const 语法、新的字符串拼接语法<strong>模版字面量</strong>、数组元素或对象元素的解构赋值和对象字面量简写的相关知识。</p>
<p>这一章我们将学习</p>
<ul>
<li>for of 迭代语法</li>
<li>神奇的扩展语法(...：展开运算符、剩余参数)</li>
</ul>
<h2 id="articleHeader0">一、for of 迭代语法</h2>
<p>先让我们看看 ES6 之前的对象变量迭代(遍历)方式：</p>
<p>1.1 for 语句</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for" rel="nofollow noreferrer" target="_blank">for 语句</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numerics = [0, 1, 2, 3]

for (let i = 0; i < numerics.length; i++) {
    console.log(numerics[i])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> numerics = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; numerics.length; i++) {
    <span class="hljs-built_in">console</span>.log(numerics[i])
}</code></pre>
<p><strong>for 语法:</strong> 在变量对象时，需要定义<strong>计数器(i)</strong>进行循环跟踪和访问数据中的值；<strong>循环退出条件</strong>(i &lt; numeric.length)</p>
<p>为了解决这个问题，就有了 <strong>for in 语句</strong></p>
<p>1.2 for in 语句</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in" rel="nofollow noreferrer" target="_blank">for in 语句</a></p>
<p>它解决了 <strong>for 语句</strong> 的计数器和推出条件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numerics = [0, 1, 2, 3]

for (let index in numerics) {
    console.log(numerics[index])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> numerics = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">in</span> numerics) {
    <span class="hljs-built_in">console</span>.log(numerics[index])
}</code></pre>
<p>但是 <strong>for in</strong> 语句依然需要定义 <strong>index</strong>，作为访问数据的索引</p>
<p>1.3 for of 语句</p>
<p>现在在 ES6 中，只要是<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/iterable" rel="nofollow noreferrer" target="_blank">可迭代对象</a>都可以使用 <strong>for of</strong>进行迭代访问数据元素。</p>
<p><strong>for of 语法</strong> 同 <strong>for in 语法</strong> 类似，只是将 in 替换成了 of</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numerics = [0, 1, 2, 3]

for (let numeric in numerics) {
    console.log(numeric)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> numerics = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> numeric <span class="hljs-keyword">in</span> numerics) {
    <span class="hljs-built_in">console</span>.log(numeric)
}
</code></pre>
<h2 id="articleHeader1">二、 扩展语法</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator" rel="nofollow noreferrer" target="_blank">扩展语法</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters" rel="nofollow noreferrer" target="_blank">剩余参数</a></p>
<p>扩展语法运算符是 <strong>...</strong>，在上一篇<a href="https://segmentfault.com/a/1190000012583233">学习下一代 JavaScript 语法: ES6 (一)</a>的「3.1」节中我们使用了将数组中剩余元素解构赋值到一个变量。这便是扩展运算符的用途之一。</p>
<p>现在我们学习更多扩展运算符的语法知识</p>
<p>2.1  作为展开运算符使用</p>
<p>先来了解如何使用展开运算符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let languages = ['php', 'javascript', 'python', 'c++']

console.log(...languages)// php javascript python c++
console.log(languages)// [&quot;php&quot;, &quot;javascript&quot;, &quot;python&quot;, &quot;c++&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> languages = [<span class="hljs-string">'php'</span>, <span class="hljs-string">'javascript'</span>, <span class="hljs-string">'python'</span>, <span class="hljs-string">'c++'</span>]

<span class="hljs-built_in">console</span>.log(...languages)<span class="hljs-comment">// php javascript python c++</span>
<span class="hljs-built_in">console</span>.log(languages)<span class="hljs-comment">// ["php", "javascript", "python", "c++"]</span></code></pre>
<p>上例中，使用 <strong>...languages</strong> 对数组内的所有元素作为单独的变量输出</p>
<p>2.1.1 展开运算符实现数组的连接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let langs = ['php', 'javascipt']
let langs2 = ['c++', 'python']

console.log([...langs, ...langs2])// [&quot;php&quot;, &quot;javascipt&quot;, &quot;c++&quot;, &quot;python&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> langs = [<span class="hljs-string">'php'</span>, <span class="hljs-string">'javascipt'</span>]
<span class="hljs-keyword">let</span> langs2 = [<span class="hljs-string">'c++'</span>, <span class="hljs-string">'python'</span>]

<span class="hljs-built_in">console</span>.log([...langs, ...langs2])<span class="hljs-comment">// ["php", "javascipt", "c++", "python"]</span></code></pre>
<p>2.1.2 concat 方法实现数组的拼接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let langs = ['php', 'javascipt']
let langs2 = ['c++', 'python']

console.log(langs.concat(langs2))// [&quot;php&quot;, &quot;javascipt&quot;, &quot;c++&quot;, &quot;python&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> langs = [<span class="hljs-string">'php'</span>, <span class="hljs-string">'javascipt'</span>]
<span class="hljs-keyword">let</span> langs2 = [<span class="hljs-string">'c++'</span>, <span class="hljs-string">'python'</span>]

<span class="hljs-built_in">console</span>.log(langs.concat(langs2))<span class="hljs-comment">// ["php", "javascipt", "c++", "python"]</span></code></pre>
<p>相较于使用展开运算符 <strong>langs.concat</strong> 在实现上稍微复杂一些</p>
<p>2.2  作为剩余参数运算符使用</p>
<p>在上一篇[学习下一代 JavaScript 语法: ES6 (一)]()的 3.1 节中我们已经使用了该用法，再来看下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let seasons = ['Spring', 'Summer', 'Autumn', 'Winter']
let [spring, summer, ...autumnAndWinter] = seasons

console.log(spring)//Spring
console.log(summer)// Summer
console.log(autumnAndWinter)// ['Autumn', 'Winter']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> seasons = [<span class="hljs-string">'Spring'</span>, <span class="hljs-string">'Summer'</span>, <span class="hljs-string">'Autumn'</span>, <span class="hljs-string">'Winter'</span>]
<span class="hljs-keyword">let</span> [spring, summer, ...autumnAndWinter] = seasons

<span class="hljs-built_in">console</span>.log(spring)<span class="hljs-comment">//Spring</span>
<span class="hljs-built_in">console</span>.log(summer)<span class="hljs-comment">// Summer</span>
<span class="hljs-built_in">console</span>.log(autumnAndWinter)<span class="hljs-comment">// ['Autumn', 'Winter']</span></code></pre>
<p>2.3 作为可变参数运算符使用</p>
<p><strong>可变参数函数</strong> 是接受不定数量参数的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一般定义函数方法
function sum(a, b, c) {
    return a + b + c
}

// 使用可变参数运算符定义采纳数方法
function sumPro(...nums) {
    let sum = 0
    for (let num of nums) {
        sum += num
    }

    return sum
}

console.log(sum(1, 2, 3))

console.log(sumPro(1, 2))
console.log(sumPro(1, 2, 3))
console.log(sumPro(1, 2, 3, 4))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一般定义函数方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-keyword">return</span> a + b + c
}

<span class="hljs-comment">// 使用可变参数运算符定义采纳数方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sumPro</span>(<span class="hljs-params">...nums</span>) </span>{
    <span class="hljs-keyword">let</span> sum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> num <span class="hljs-keyword">of</span> nums) {
        sum += num
    }

    <span class="hljs-keyword">return</span> sum
}

<span class="hljs-built_in">console</span>.log(sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>))

<span class="hljs-built_in">console</span>.log(sumPro(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>))
<span class="hljs-built_in">console</span>.log(sumPro(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>))
<span class="hljs-built_in">console</span>.log(sumPro(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>))</code></pre>
<p>参考资料:<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla" rel="nofollow noreferrer" target="_blank">MDN</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带你入门 JavaScript ES6 (二)

## 原文链接
[https://segmentfault.com/a/1190000012618266](https://segmentfault.com/a/1190000012618266)

