---
title: 'ES6 常用新特性讲解' 
date: 2019-01-08 2:30:11
hidden: true
slug: eballdjqaae
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVQ5GW?w=1024&amp;h=675" src="https://static.alili.tech/img/bVQ5GW?w=1024&amp;h=675" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上周在公司组织了 <code>ES6</code> 新特性的分享会，主要讲了工程化简介、<code>ES6</code> 的新特性与前端常用的几种构建工具的配合使用。<code>ES6</code> 这块主要讲了一些我们平时开发中经常会用到的新特性。在这里整理一下关于 <code>ES6</code> 的部分。<br>&lt;!--more--&gt;<br>一共讲解了 8 个常用的 <code>ES6</code> 新特性，讲解过程也是由浅入深。废话不多说，下面进入正文。</p>
<hr>
<h3 id="articleHeader0">函数默认值</h3>
<h4>特性 &amp; 语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
function decimal(num, fix) {
    fix = fix === void(0) ? 2 : fix;

    return +num.toFixed(fix);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decimal</span>(<span class="hljs-params">num, fix</span>) </span>{
    fix = fix === <span class="hljs-keyword">void</span>(<span class="hljs-number">0</span>) ? <span class="hljs-number">2</span> : fix;

    <span class="hljs-keyword">return</span> +num.toFixed(fix);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// After
function decimal(num, fix = 2) {
    return +num.toFixed(fix);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// After</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decimal</span>(<span class="hljs-params">num, fix = <span class="hljs-number">2</span></span>) </span>{
    <span class="hljs-keyword">return</span> +num.toFixed(fix);
}</code></pre>
<p>　　首先，我们看一下之前我们是怎么写函数默认值的：我们通常会使用三元运算符来判断入参是否有值，然后决定是否使用默认值运行函数（如示例中 <code>fix = fix === void(0) ? 2 : fix</code>）</p>
<p>　　而在 <code>ES6</code> 中，我们可以直接在函数的显示入参中指定函数默认值（<code>function decimal(num, fix = 2){}</code>），很明显，这种写法更自然易懂，也更加方便，不过有一点需要注意：</p>
<ul><li><p>设定了默认值的入参，应该放在没有设置默认值的参数之后，也就是我们<strong>不应该</strong>这样写：<code>function decimal(fix = 2, num){}</code>，虽然通过变通手段也可以正常运行，但<strong>不符合规范</strong>。</p></li></ul>
<hr>
<h3 id="articleHeader1">模板字符串</h3>
<h4>特性 &amp; 语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
// Before.1
var type = 'simple';
'This is a ' + type + ' string join.'

// Before.2
var type = 'multiline';
'This \nis \na \n' + type + '\nstring.'

// Before.3
var type = 'pretty singleline';
'This \
is \
a \
' + type + '\
string.'
// OR
// Before.4
'This ' +
'is' +
'a' +
type +
'string.'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before</span>
<span class="hljs-comment">// Before.1</span>
<span class="hljs-keyword">var</span> type = <span class="hljs-string">'simple'</span>;
<span class="hljs-string">'This is a '</span> + type + <span class="hljs-string">' string join.'</span>

<span class="hljs-comment">// Before.2</span>
<span class="hljs-keyword">var</span> type = <span class="hljs-string">'multiline'</span>;
<span class="hljs-string">'This \nis \na \n'</span> + type + <span class="hljs-string">'\nstring.'</span>

<span class="hljs-comment">// Before.3</span>
<span class="hljs-keyword">var</span> type = <span class="hljs-string">'pretty singleline'</span>;
<span class="hljs-string">'This \
is \
a \
'</span> + type + <span class="hljs-string">'\
string.'</span>
<span class="hljs-comment">// OR</span>
<span class="hljs-comment">// Before.4</span>
<span class="hljs-string">'This '</span> +
<span class="hljs-string">'is'</span> +
<span class="hljs-string">'a'</span> +
type +
<span class="hljs-string">'string.'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// After
var type = 'singleline';
`This is a ${type} string.`

var type = 'multiline';
`This
is
a
${type}
string.`

var type = 'pretty singleline';
`This \
is \
a \
${type} \
string.`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// After</span>
<span class="hljs-keyword">var</span> type = <span class="hljs-string">'singleline'</span>;
<span class="hljs-string">`This is a <span class="hljs-subst">${type}</span> string.`</span>

<span class="hljs-keyword">var</span> type = <span class="hljs-string">'multiline'</span>;
<span class="hljs-string">`This
is
a
<span class="hljs-subst">${type}</span>
string.`</span>

<span class="hljs-keyword">var</span> type = <span class="hljs-string">'pretty singleline'</span>;
<span class="hljs-string">`This \
is \
a \
<span class="hljs-subst">${type}</span> \
string.`</span></code></pre>
<p>　　我们之前在对字符串和变量进行拼接的时候，通常都是反复一段一段使用引号包裹的字符串，再反复使用加号进行拼接（Before.1）。多行字符串的时候我们还要写上蹩脚的 <code>\n</code> 来换行以得到一个多行的字符串（Before.2）。</p>
<p>　　在字符串过长的时候可能会使用 <code>\</code> 在编辑器中书写多行字符串来表示单行字符串，用来方便较长的字符串在编辑器中的阅读（Before.3），或者简单粗暴的反复引号加号这样多行拼接（Before.4）。</p>
<p>　　<code>ES6</code> 中我们可以使用反引号（`，位于 <code>TAB</code> 上方）来输入一段简单明了的多行字符串，还可以在字符串中通过 <code>${变量名}</code> 的形式方便地插入一个变量，是不是方便多了！</p>
<hr>
<h3 id="articleHeader2">解构赋值</h3>
<h4>数组解构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var [a, ,b] = [1, 2, 3, 4, 5];
console.log(a); // => 1
console.log(b); // => 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> [a, ,b] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// =&gt; 1</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// =&gt; 3</span></code></pre>
<p>　　数组解构，使用变量声明关键字声明一个形参数组（<code>[a, , b]</code>），等号后跟一个待解构目标数组（<code>[1, 2, 3]</code>），解构时可以通过留空的方式跳过数组中间的个别元素，但是在形参数组中<strong>必须留有相应空位</strong>才可以继续解构之后的元素，如果要跳过的元素处于<strong>数组末端</strong>，则在形参数组中<strong>可以不予留空</strong>。</p>
<h4>对象解构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var {b, c} = {a: 1, b: 2, c: 3};
console.log(b); // => 2
console.log(c); // => 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> {b, c} = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>};
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// =&gt; 2</span>
<span class="hljs-built_in">console</span>.log(c); <span class="hljs-comment">// =&gt; 3</span></code></pre>
<p>　　对象解构与数组解构大体相同，不过需要注意一点</p>
<ul><li><p>形参对象（<code>{b, c}</code>）的属性或方法名必须与待解构的目标对象中的属性或方法名完全相同才能解构到对应的属性或方法</p></li></ul>
<h4>对象匹配解构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var example = function() {
    return {a: 1, b: 2, c: 3};
}
var {a: d, b: e, c: f} = example();
console.log(d, e, f); // => 1, 2, 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> example = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>};
}
<span class="hljs-keyword">var</span> {<span class="hljs-attr">a</span>: d, <span class="hljs-attr">b</span>: e, <span class="hljs-attr">c</span>: f} = example();
<span class="hljs-built_in">console</span>.log(d, e, f); <span class="hljs-comment">// =&gt; 1, 2, 3</span></code></pre>
<p>　　对象匹配解构是对象解构的一种延伸用法，我们可以在形参对象中使用<code>:</code>来更改解构后的变量名。</p>
<h4>函数入参解构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example({param: value}) {
    return value;
}
console.log(example({param: 5})); // => 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params">{param: value}</span>) </span>{
    <span class="hljs-keyword">return</span> value;
}
<span class="hljs-built_in">console</span>.log(example({<span class="hljs-attr">param</span>: <span class="hljs-number">5</span>})); <span class="hljs-comment">// =&gt; 5</span></code></pre>
<p>　　函数的入参解构也是对象解构的一种延伸用法，我们可以通过改写入参对象目标值为变量名的方式，在函数内部直接获取到入参对象中某个属性或方法的值。</p>
<h4>函数入参默认值解构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example({x, y, z = 0}) {
    return x + y + z;
}
console.log(example({x: 1, y: 2}));       // => 3
console.log(example({x: 1, y: 2, z: 3})); // => 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params">{x, y, z = <span class="hljs-number">0</span>}</span>) </span>{
    <span class="hljs-keyword">return</span> x + y + z;
}
<span class="hljs-built_in">console</span>.log(example({<span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">2</span>}));       <span class="hljs-comment">// =&gt; 3</span>
<span class="hljs-built_in">console</span>.log(example({<span class="hljs-attr">x</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">z</span>: <span class="hljs-number">3</span>})); <span class="hljs-comment">// =&gt; 6</span></code></pre>
<p>　　这是入参解构的另一种用法，我们可以在入参对象的形参属性或方法中使用等号的方式给入参对象的某些属性或方法设定默认值。</p>
<hr>
<h3 id="articleHeader3">Let &amp; Const</h3>
<h4>Let</h4>
<ul><li><p><strong>无</strong>变量提升</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
console.log(num); // => undefined
var num = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before</span>
<span class="hljs-built_in">console</span>.log(num); <span class="hljs-comment">// =&gt; undefined</span>
<span class="hljs-keyword">var</span> num = <span class="hljs-number">1</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// After
console.log(num); // => ReferenceError
let num = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// After</span>
<span class="hljs-built_in">console</span>.log(num); <span class="hljs-comment">// =&gt; ReferenceError</span>
<span class="hljs-keyword">let</span> num = <span class="hljs-number">1</span>;</code></pre>
<p>　　使用 <code>var</code> 声明的变量会自动提升到当前作用域的顶部，如果声明位置与作用域顶部之间有另一个同名变量，很容易引起难以预知的错误。使用 <code>let</code> 声明的变量则不会进行变成提升，规避了这个隐患。</p>
<blockquote><p>注意：<code>var</code> 声明的变量提升后虽然在声明语句之前输出为 <code>undefined</code>，但这<strong>并不代表</strong> <code>num</code> 变量还没有被声明，此时 <code>num</code> 变量<strong>已经完成声明并分配了相应内存</strong>，只不过该变量<strong>目前的值</strong>为 <code>undefined</code>，并不是我们声明语句中赋的初始值 <code>1</code>。</p></blockquote>
<ul><li><p><strong>有</strong>块级作用域</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
{
    var num = 1;

    console.log(num); // => 1
}
console.log(num);     // => 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before</span>
{
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">1</span>;

    <span class="hljs-built_in">console</span>.log(num); <span class="hljs-comment">// =&gt; 1</span>
}
<span class="hljs-built_in">console</span>.log(num);     <span class="hljs-comment">// =&gt; 1</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// After
{
    let num = 1;
    
    console.log(num); // => 1
}
console.log(num);     // => ReferenceError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// After</span>
{
    <span class="hljs-keyword">let</span> num = <span class="hljs-number">1</span>;
    
    <span class="hljs-built_in">console</span>.log(num); <span class="hljs-comment">// =&gt; 1</span>
}
<span class="hljs-built_in">console</span>.log(num);     <span class="hljs-comment">// =&gt; ReferenceError</span></code></pre>
<p>　　<code>let</code> 声明的变量只能在当前块级作用域中使用，最常见的应用大概就是 <code>for(let i = 0, i &lt; 10; i++) {}</code>，相信许多小伙伴在面试题中见过，哈哈。</p>
<ul><li><p><strong>禁止</strong>重复声明</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
var dev = true;
var dev = false;

console.log(dev); // => false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before</span>
<span class="hljs-keyword">var</span> dev = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> dev = <span class="hljs-literal">false</span>;

<span class="hljs-built_in">console</span>.log(dev); <span class="hljs-comment">// =&gt; false</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// After
let dev = true;
let dev = false; // => SyntaxError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// After</span>
<span class="hljs-keyword">let</span> dev = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">let</span> dev = <span class="hljs-literal">false</span>; <span class="hljs-comment">// =&gt; SyntaxError</span></code></pre>
<p>　　<code>var</code> 声明的变量可以重复声明，而且不会有任何警告或者提示，就这样悄悄的覆盖了一个值，隐患如变量提升一样让人担忧。(￣┰￣*)</p>
<p>　　而 <code>let</code> 声明的变量如果进行重复声明，则会直接抛出一个<strong>语法错误</strong>（是的，就是直接明确地告诉你：你犯了一个相当低级的<strong>语法错误</strong>哦）</p>
<h4>Const</h4>
<ul>
<li><p>无变量提升</p></li>
<li><p>有块级作用域</p></li>
<li><p>禁止重复声明</p></li>
</ul>
<blockquote><p>前 3 点跟 <code>let</code> 一个套路，就不多说了</p></blockquote>
<ul><li><p>禁止重复赋值</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DEV = true;
DEV = false; // => TypeError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> DEV = <span class="hljs-literal">true</span>;
DEV = <span class="hljs-literal">false</span>; <span class="hljs-comment">// =&gt; TypeError</span></code></pre>
<p>　　基于静态常量的定义我们可以很明显知道，<code>const</code> 声明的常量一经声明便不能再更改其值，无需多说。</p>
<ul><li><p>必须附初始值</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DEV; // => SyntaxError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> DEV; <span class="hljs-comment">// =&gt; SyntaxError</span></code></pre>
<p>　　也是基于定义，<code>const</code> 声明的常量既然一经声明便不能再更改其值，那声明的时候没有附初始值显然是不合理的，一个没有任何值的常量是没有意义的，浪费内存。</p>
<hr>
<h3 id="articleHeader4">新增库函数</h3>
<p>　　<code>ES6</code> 新增了许多（相当多）的库函数，这里只介绍一些比较常用的。</p>
<blockquote><p>题外话：多了解一下内建函数与方法有时候可以很方便高效地解决问题。有时候绞尽脑汁写好的一个算法，没准已经有内建函数实现了！而且内建函数经过四海八荒众神的考验，性能一定不错，哈哈。</p></blockquote>
<h4>Number</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.EPSILON
Number.isInteger(Infinity); // => false
Number.isNaN('NaN');        // => false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Number</span>.EPSILON
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-literal">Infinity</span>); <span class="hljs-comment">// =&gt; false</span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'NaN'</span>);        <span class="hljs-comment">// =&gt; false</span></code></pre>
<p>　　首先是 ᶓ 这个常量属性，表示小数的极小值，主要用来判断浮点数计算是否精确，如果计算误差小于该阈值，则可以认为计算结果是正确的。</p>
<p>　　然后是 <code>isInteger()</code> 这个方法用来判断一个数是否为整数，返回布尔值。</p>
<p>　　最后是 <code>isNaN()</code> 用来判断入参是否为 <code>NaN</code>。是的，我们再也不用通过 <code>NaN</code> 不等于 <code>NaN</code> 才能确定一个 <code>NaN</code> 就是 <code>NaN</code> 这种反人类的逻辑来判断一个 <code>NaN</code> 值了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(NaN !== NaN) {
    console.log(&quot;Yes! This is actually the NaN!&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(<span class="hljs-literal">NaN</span> !== <span class="hljs-literal">NaN</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Yes! This is actually the NaN!"</span>);
}</code></pre>
<p>　　另外还有两个小改动：两个全局函数 <code>parseInt()</code> 与 <code>parseFloat()</code> 被移植到 <code>Number</code> 中，入参反参保持不变。这样所有数字处理相关的都在 <code>Number</code> 对象上嘞！规范多了。</p>
<h4>String</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'abcde'.includes('cd'); // => true
'abc'.repeat(3);        // => 'abcabcabc'
'abc'.startsWith('a');  // => true
'abc'.endsWith('c');    // => true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'abcde'</span>.includes(<span class="hljs-string">'cd'</span>); <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-string">'abc'</span>.repeat(<span class="hljs-number">3</span>);        <span class="hljs-comment">// =&gt; 'abcabcabc'</span>
<span class="hljs-string">'abc'</span>.startsWith(<span class="hljs-string">'a'</span>);  <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-string">'abc'</span>.endsWith(<span class="hljs-string">'c'</span>);    <span class="hljs-comment">// =&gt; true</span></code></pre>
<ul>
<li><p><code>inclueds()</code> 方法用来判断一个字符串中是否存在指定字符串</p></li>
<li><p><code>repeat()</code> 方法用来重复一个字符串生成一个新的字符串</p></li>
<li><p><code>startsWith()</code> 方法用来判断一个字符串是否以指定字符串开头，可以传入一个整数作为第二个参数，用来设置查找的起点，默认为 <code>0</code>，即从字符串第一位开始查找</p></li>
<li><p><code>endsWith()</code> 与 <code>startsWith()</code> 方法相反</p></li>
</ul>
<h4>Array</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.from(document.querySelectorAll('*')); // => returns a real array.
[0, 0, 0].fill(7, 1); // => [0, 7, 7]
[1, 2, 3].findIndex(function(x) {
    return x === 2;
}); // => 1
['a', 'b', 'c'].entries(); // => Iterator [0: 'a'], [1: 'b'], [2: 'c']
['a', 'b', 'c'].keys();    // => Iterator 0, 1, 2
['a', 'b', 'c'].values();  // => Iterator 'a', 'b', 'c'
// Before
new Array();        // => []
new Array(4);       // => [,,,]
new Array(4, 5, 6); // => [4, 5, 6]
// After
Array.of();         // => []
Array.of(4);        // => [4]
Array.of(4, 5, 6);  // => [4, 5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'*'</span>)); <span class="hljs-comment">// =&gt; returns a real array.</span>
[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>].fill(<span class="hljs-number">7</span>, <span class="hljs-number">1</span>); <span class="hljs-comment">// =&gt; [0, 7, 7]</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].findIndex(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> x === <span class="hljs-number">2</span>;
}); <span class="hljs-comment">// =&gt; 1</span>
[<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>].entries(); <span class="hljs-comment">// =&gt; Iterator [0: 'a'], [1: 'b'], [2: 'c']</span>
[<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>].keys();    <span class="hljs-comment">// =&gt; Iterator 0, 1, 2</span>
[<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>].values();  <span class="hljs-comment">// =&gt; Iterator 'a', 'b', 'c'</span>
<span class="hljs-comment">// Before</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();        <span class="hljs-comment">// =&gt; []</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">4</span>);       <span class="hljs-comment">// =&gt; [,,,]</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>); <span class="hljs-comment">// =&gt; [4, 5, 6]</span>
<span class="hljs-comment">// After</span>
<span class="hljs-built_in">Array</span>.of();         <span class="hljs-comment">// =&gt; []</span>
<span class="hljs-built_in">Array</span>.of(<span class="hljs-number">4</span>);        <span class="hljs-comment">// =&gt; [4]</span>
<span class="hljs-built_in">Array</span>.of(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>);  <span class="hljs-comment">// =&gt; [4, 5, 6]</span></code></pre>
<p>　　首先是 <code>from()</code> 方法，该方法可以将一个类数组对象转换成一个<strong>真正的数组</strong>。还记得我们之前常写的 <code>Array.prototype.slice.call(arguments)</code> 吗？现在可以跟他说拜拜了~</p>
<p>　　之后的 <code>fill()</code> 方法，用来填充一个数组，第一个参数为将要被填充到数组中的值，可选第二个参数为填充起始索引（默认为 0），可选第三参数为填充终止索引（默认填充到数组末端）。</p>
<p>　　<code>findIndex()</code> 用来查找指定元素的索引值，入参为函数，函数形参跟 <code>map()</code> 方法一致，不多说。最终输出符合该条件的元素的索引值。</p>
<p>　　<code>entries()</code>、<code>keys()</code>、<code>values()</code> 三个方法各自返回对应键值对、键、值的遍历器，可供循环结构使用。</p>
<p>　　最后一个新增的 <code>of()</code> 方法主要是为了弥补 <code>Array</code> 当做构造函数使用时产生的怪异结果。</p>
<h4>Object</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let target = {
    a: 1,
    b: 3
};
let source = {
    b: 2,
    c: 3
};

Object.assign(target, source); // => { a: 1, b: 2, c: 3}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> target = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">3</span>
};
<span class="hljs-keyword">let</span> source = {
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
};

<span class="hljs-built_in">Object</span>.assign(target, source); <span class="hljs-comment">// =&gt; { a: 1, b: 2, c: 3}</span></code></pre>
<p>　　<code>assign()</code> 方法用于合并两个对象，不过需要注意的是这种合并是<strong>浅拷贝</strong>。可能看到这个方法我们还比较陌生，不过了解过 <code>jQuery</code> 源码的应该知道 <code>$.extend()</code> 这个方法，例如在下面这个粗糙的 <code>$.ajax()</code> 模型中的应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax = function(opts) {
    var defaultOpts = {
        method: 'GET',
        async: true,
        //...
    };
    opts = $.extend(defaultOpts, opts);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opts</span>) </span>{
    <span class="hljs-keyword">var</span> defaultOpts = {
        <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
        <span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//...</span>
    };
    opts = $.extend(defaultOpts, opts);
}</code></pre>
<p>　　从这我们可以看到 <code>TC39</code> 也是在慢慢吸收百家所长，努力让 <code>JavaScript</code> 变得更好，更方便开发者的使用。</p>
<blockquote><p><code>Object</code> 新增的特性当然不止这一个 <code>assign()</code> 方法，一共增加了十多个新特性，特别是对属性或方法名字面量定义的增强方面，很值得一看，感兴趣的自行查找资料进行了解哈，印象会更深刻！</p></blockquote>
<h4>Math</h4>
<p>　　<code>Math</code> 对象上同样增加了许多新特性，大部分都是数学计算方法，这里只介绍两个常用的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.sign(5);     // => +1
Math.sign(0);     // => 0
Math.sign(-5);    // => -1

Math.trunc(4.1);  // => 4
Math.trunc(-4.1); // => -4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">5</span>);     <span class="hljs-comment">// =&gt; +1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">0</span>);     <span class="hljs-comment">// =&gt; 0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-5</span>);    <span class="hljs-comment">// =&gt; -1</span>

<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">4.1</span>);  <span class="hljs-comment">// =&gt; 4</span>
<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-number">-4.1</span>); <span class="hljs-comment">// =&gt; -4</span></code></pre>
<p>　　<code>sign()</code> 方法用来判断一个函数的正负，使用与对应返回值如上。</p>
<p>　　<code>trunc()</code> 用来取数值的整数部分，我们之前可能经常使用 <code>floor()</code> 方法进行取整操作，不过这个方法有一个问题就是：它本身是向下取整，当被取整值为正数的时候计算结果完全 OK，但是当被取整值为负数的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.floor(-4.1); // => -5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">-4.1</span>); <span class="hljs-comment">// =&gt; -5</span></code></pre>
<blockquote><p>插播一个小 Tip：使用位操作符也可以很方便的进行取整操作，例如：<code>~~3.14</code> or <code>3.14 | 0</code>，也许这更加方便 : )</p></blockquote>
<hr>
<h3 id="articleHeader5">箭头函数</h3>
<p>　　箭头函数无疑是 <code>ES6</code> 中一个相当重要的新特性。</p>
<h4>特性</h4>
<ul>
<li><p>共享父级 <code>this</code> 对象</p></li>
<li><p>共享父级 <code>arguments</code></p></li>
<li><p>不能当做构造函数</p></li>
</ul>
<h4>语法</h4>
<h5>最简表达式</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3, 4, 5, 6];

// Before
arr.filter(function(v) {
    return v > 3;
});
// After
arr.filter(v => v > 3); // => [4, 5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];

<span class="hljs-comment">// Before</span>
arr.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
    <span class="hljs-keyword">return</span> v &gt; <span class="hljs-number">3</span>;
});
<span class="hljs-comment">// After</span>
arr.filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v &gt; <span class="hljs-number">3</span>); <span class="hljs-comment">// =&gt; [4, 5, 6]</span></code></pre>
<p>　　前后对比很容易理解，可以明显看出箭头函数极大地减少了代码量。</p>
<h5>完整语法</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3, 4, 5, 6];

arr.map((v, k, thisArr) => {
    return thisArr.reverse()[k] * v;
})  // => [6, 10, 12, 12, 10, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];

arr.map(<span class="hljs-function">(<span class="hljs-params">v, k, thisArr</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> thisArr.reverse()[k] * v;
})  <span class="hljs-comment">// =&gt; [6, 10, 12, 12, 10, 6]</span></code></pre>
<p>　　一个简单的首尾相乘的算法，对比最简表达式我们可以发现，函数的前边都省略了 <code>function</code> 关键字，但是多个入参时需用括号包裹入参，单个入参是时可省略括号，入参写法保持一致。后面使用胖箭头 <code>=&gt;</code> 连接函数名与函数体，函数体的写法保持不变。</p>
<h5>函数上下文 this</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before
var obj = {
    arr: [1, 2, 3, 4, 5, 6],
    getMaxPow2: function() {
        var that = this,
            getMax = function() {
                return Math.max.apply({}, that.arr);
            };
        
        return Math.pow(getMax(), 2);
    }
}
// After
var obj = {
    arr: [1, 2, 3, 4, 5, 6],
    getMaxPow2: function() {
        var getMax = () => {
            return Math.max.apply({}, this.arr);
        }

        return Math.pow(getMax(), 2);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>],
    <span class="hljs-attr">getMaxPow2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>,
            getMax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max.apply({}, that.arr);
            };
        
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.pow(getMax(), <span class="hljs-number">2</span>);
    }
}
<span class="hljs-comment">// After</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>],
    <span class="hljs-attr">getMaxPow2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> getMax = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max.apply({}, <span class="hljs-keyword">this</span>.arr);
        }

        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.pow(getMax(), <span class="hljs-number">2</span>);
    }
}</code></pre>
<p>　　注意看中第 5 行 <code>var that = this</code> 这里声明的一个<strong>临时变量 <code>that</code></strong>。在对象或者原型链中，我们以前经常会写这样一个临时变量，或 <code>that</code> 或 <code>_this</code>，诸如此类，以达到在一个函数内部访问到父级或者祖先级 <code>this</code> 对象的目的。</p>
<p>　　如今在箭头函数中，函数体内部没有自己的 <code>this</code>，默认在其内部调用 <code>this</code> 的时候，会自动查找其<strong>父级</strong>上下文的 <code>this</code> 对象（如果父级同样是箭头函数，则会按照作用域链继续向上查找），这无疑方便了许多，我们无需在多余地声明一个临时变量来做这件事了。</p>
<p>　　<strong>注意</strong>：</p>
<ol>
<li><p>某些情况下我们可能需要函数有自己的 <code>this</code>，例如 <code>DOM</code> 事件绑定时事件回调函数中，我们往往需要使用 <code>this</code> 来操作当前的 <code>DOM</code>，这时候就需要使用传统匿名函数而非箭头函数。</p></li>
<li><p>在严格模式下，如果箭头函数的上层函数均为箭头函数，那么 <code>this</code> 对象将不可用。</p></li>
</ol>
<blockquote><p>另，由于箭头函数没有自己的 <code>this</code> 对象，所以箭头函数不能当做构造函数。</p></blockquote>
<h5>父级函数 arguments</h5>
<p>　　我们知道在函数体中有 <code>arguments</code> 这样一个伪数组对象，该对象中包含该函数所有的入参（显示入参 + 隐式入参），当函数体中有另外一个函数，并且该函数为箭头函数时，该箭头函数的函数体中可以直接访问父级函数的 <code>arguments</code> 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSum() {
    var example = () => {
        return Array
            .prototype
            .reduce
            .call(arguments, (pre, cur) => pre + cur);
    }

    return example();
}
getSum(1, 2, 3); // => 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> example = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>
            .prototype
            .reduce
            .call(<span class="hljs-built_in">arguments</span>, (pre, cur) =&gt; pre + cur);
    }

    <span class="hljs-keyword">return</span> example();
}
getSum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// =&gt; 6</span></code></pre>
<blockquote><p>由于箭头函数本身没有 <code>arguments</code> 对象，所以如果他的上层函数都是箭头函数的话，那么 <code>arguments</code> 对象将不可用。</p></blockquote>
<p>　　最后再巩固一下箭头函数的语法：</p>
<ol>
<li><p>当箭头函数入参只有一个时可以省略入参括号；</p></li>
<li><p>当入参多余一个或<strong>没有入参</strong>时必须写括号；</p></li>
<li><p>当函数体只有一个 <code>return</code> 语句时可以省略函数体的花括号与 <code>return</code> 关键字。</p></li>
</ol>
<hr>
<h3 id="articleHeader6">类 &amp; 继承</h3>
<p>　　类也是 <code>ES6</code> 一个不可忽视的新特性，虽然只是句法上的语法糖，但是相对于 <code>ES5</code>，学习 <code>ES6</code> 的类之后对原型链会有更加清晰的认识。</p>
<h4>特性</h4>
<ul>
<li><p>本质为对原型链的二次包装</p></li>
<li><p>类没有提升</p></li>
<li><p>不能使用字面量定义属性</p></li>
<li><p>动态继承类的构造方法中 <code>super</code> 优先 <code>this</code></p></li>
</ul>
<h4>类的定义</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 类不会被提升 */
let puppy = new Animal('puppy'); // => ReferenceError

class Animal {
    constructor(name) {
        this.name = name;
    }

    sleep() {
        console.log(`The ${this.name} is sleeping...`);
    }

    static type() {
        console.log('This is an Animal class.');
    }
}

let puppy = new Animal('puppy');

puppy.sleep();    // => The puppy is sleeping...

/* 实例化后无法访问静态方法 */
puppy.type();     // => TypeError

Animal.type();    // => This is an Animal class.

/* 实例化前无法访问动态方法 */
Animal.sleep();   // => TypeError

/* 类不能重复定义 */
class Animal() {} // => SyntaxError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 类不会被提升 */</span>
<span class="hljs-keyword">let</span> puppy = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'puppy'</span>); <span class="hljs-comment">// =&gt; ReferenceError</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
    <span class="hljs-keyword">constructor</span>(name) {
        <span class="hljs-keyword">this</span>.name = name;
    }

    sleep() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`The <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> is sleeping...`</span>);
    }

    <span class="hljs-keyword">static</span> type() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'This is an Animal class.'</span>);
    }
}

<span class="hljs-keyword">let</span> puppy = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'puppy'</span>);

puppy.sleep();    <span class="hljs-comment">// =&gt; The puppy is sleeping...</span>

<span class="hljs-comment">/* 实例化后无法访问静态方法 */</span>
puppy.type();     <span class="hljs-comment">// =&gt; TypeError</span>

Animal.type();    <span class="hljs-comment">// =&gt; This is an Animal class.</span>

<span class="hljs-comment">/* 实例化前无法访问动态方法 */</span>
Animal.sleep();   <span class="hljs-comment">// =&gt; TypeError</span>

<span class="hljs-comment">/* 类不能重复定义 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span>() </span>{} <span class="hljs-comment">// =&gt; SyntaxError</span></code></pre>
<p>　　以上我们使用 <code>class</code> 关键字声明了一个名为 <code>Animal</code> 的类。</p>
<blockquote><p>虽然类的定义中并未要求类名的大小写，但鉴于代码规范，推荐类名的首字母大写。</p></blockquote>
<p>　　两点注意事项：</p>
<ol>
<li><p>在类的定义中有一个特殊方法 <code>constructor()</code>，该方法名固定，表示该类的构造函数（方法），在类的实例化过程中会被调用（<code>new Animal('puppy')</code>）；</p></li>
<li><p>类中无法像对象一样使用 <code>prop: value</code> 或者 <code>prop = value</code> 的形式定义一个类的属性，我们只能在类的构造方法或其他方法中使用 <code>this.prop = value</code> 的形式为类添加属性。</p></li>
</ol>
<p>　　最后对比一下我们之前是怎样写类的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(name) {
    this.name = name;
}

Animal.prototype = {
    sleep: function(){
        console.log('The ' + this.name + 'is sleeping...');
    }
};

Animal.type = function() {
    console.log('This is an Animal class.');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}

Animal.prototype = {
    <span class="hljs-attr">sleep</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The '</span> + <span class="hljs-keyword">this</span>.name + <span class="hljs-string">'is sleeping...'</span>);
    }
};

Animal.type = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'This is an Animal class.'</span>);
}</code></pre>
<blockquote><p><code>class</code> 关键字真真让这一切变得清晰易懂了~</p></blockquote>
<h4>类的继承</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Programmer extends Animal {
    constructor(name) {
        /* 在 super 方法之前 this 不可用 */
        console.log(this); // => ReferenceError
        super(name);
        console.log(this); // Right!
    }
    
    program() {
        console.log(&quot;I'm coding...&quot;);
    }

    sleep() {
        console.log('Save all files.');
        console.log('Get into bed.');
        super.sleep();
    }
}

let coder = new Programmer('coder');
coder.program(); // => I'm coding...
coder.sleep();   // => Save all files. => Get into bed. => The coder is sleeping." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Programmer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span> </span>{
    <span class="hljs-keyword">constructor</span>(name) {
        <span class="hljs-comment">/* 在 super 方法之前 this 不可用 */</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// =&gt; ReferenceError</span>
        <span class="hljs-keyword">super</span>(name);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// Right!</span>
    }
    
    program() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm coding..."</span>);
    }

    sleep() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Save all files.'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Get into bed.'</span>);
        <span class="hljs-keyword">super</span>.sleep();
    }
}

<span class="hljs-keyword">let</span> coder = <span class="hljs-keyword">new</span> Programmer(<span class="hljs-string">'coder'</span>);
coder.program(); <span class="hljs-comment">// =&gt; I'm coding...</span>
coder.sleep();   <span class="hljs-comment">// =&gt; Save all files. =&gt; Get into bed. =&gt; The coder is sleeping.</span></code></pre>
<p>　　这里我们使用 <code>class</code> 定义了一个类 <code>Programmer</code>，使用 <code>extends</code> 关键字让该类继承于另一个类 <code>Animal</code>。</p>
<p>　　如果子类有构造方法，那么在子类构造方法中使用 <code>this</code> 对象之前必须使用 <code>super()</code> 方法运行父类的构造方法以对父类进行初始化。</p>
<p>　　在子类方法中我们也可以使用 <code>super</code> 对象来调用父类上的方法。如示例代码中子类的 <code>sleep()</code> 方法：在这里我们重写了父类中的 <code>sleep()</code> 方法，添加了两条语句，并在方法末尾使用 <code>super</code> 对象调用了父类上的 <code>sleep()</code> 方法。</p>
<p>　　俗话讲：没有对比就没有伤害 (*゜ー゜*)，我们最后来看一下以前我们是怎么来写继承的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Programmer(name) {
    Animal.call(this, name);
}

Programmer.prototype = Object.create(Animal.prototype, {
    program: {
        value: function() {
            console.log(&quot;I'm coding...&quot;);
        }
    },
    sleep: {
        value: function() {
            console.log('Save all files.');
            console.log('Get into bed.');
            Animal.prototype.sleep.apply(this, arguments);
        }
    }
});

Programmer.prototype.constructor = Programmer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Programmer</span>(<span class="hljs-params">name</span>) </span>{
    Animal.call(<span class="hljs-keyword">this</span>, name);
}

Programmer.prototype = <span class="hljs-built_in">Object</span>.create(Animal.prototype, {
    <span class="hljs-attr">program</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm coding..."</span>);
        }
    },
    <span class="hljs-attr">sleep</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Save all files.'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Get into bed.'</span>);
            Animal.prototype.sleep.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
    }
});

Programmer.prototype.constructor = Programmer;</code></pre>
<p>　　如果前文类的定义中的前后对比不足为奇，那么这个。。。</p>
<p>　　给你一个眼神，自己去体会 (⊙ˍ⊙)，一脸懵逼.jpg</p>
<hr>
<h3 id="articleHeader7">模块</h3>
<blockquote><p>啊哈，终于写到最后一部分了。</p></blockquote>
<p>　　模块系统是一切模块化的前提，在未推出 <code>ES6 Module</code> 标准之前，相信大伙儿已经被满世界飞的 <code>AMD</code>、<code>CMD</code>、<code>UMD</code>、<code>CommonJS</code> 等等百花齐放的模块化标准搞的晕头转向了吧。<strong>但是</strong>，现在 <code>TC39</code> 在 <code>ECMAScript2015(ES6)</code> 版本里<strong>终于推出了正式的模块化规范</strong>，前端模块系统的大一统时代已经到来了！</p>
<blockquote><p>OMG，这段话写的好燃 orz</p></blockquote>
<p>　　废话有点多。。。</p>
<p>　　下面咱们来了解一个这个模块系统的基本规范。</p>
<blockquote><p>为方便描述，下文中<strong>导出对象</strong>指一切可导出的内容（变量、函数、对象、类等），勿与对象（<code>Object</code>）混淆。<br><strong>导入对象</strong>同理。</p></blockquote>
<h4>特性</h4>
<ul>
<li><p>封闭的代码块<br>每个模块都有自己完全独立的代码块，跟作用域类似，但是更加封闭。</p></li>
<li><p>无限制导出导出<br>一个模块理论上可以导出无数个变量、函数、对象属性、对象方法，甚至一个完整的类。但是我们应该时刻牢记<strong>单一职责</strong>这一程序设计的基本原则，不要试图去开发一个臃肿的巨大的面面俱到的模块，合理控制代码的颗粒度也是开发可维护系统必不可少的一部分。</p></li>
<li><p>严格模式下运行<br>模块默认情况下在严格模式下运行（<code>'use strict;'</code>），这时候要注意一些取巧甚至有风险的写法应该避免，这也是保证代码健壮性的前提。</p></li>
</ul>
<h4>模块的定义与导出</h4>
<h5>内联导出</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const DEV = true;
export function example() {
    //...
}
export class expClass {
    //...
}
export let obj = {
    DEV,
    example,
    expClass,
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DEV = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//...</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">expClass</span> </span>{
    <span class="hljs-comment">//...</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> obj = {
    DEV,
    example,
    expClass,
    <span class="hljs-comment">//...</span>
}</code></pre>
<p>　　使用 <code>export</code> 关键字，后面紧跟声明关键字（<code>let</code>、<code>function</code> 等）声明一个导出对象，这种声明并同时导出的导出方式称作<strong>内联导出</strong>。<br>　　未被导出的内容（变量、函数、类等）由于独立代码块的原因，将仅供模块内部使用（可类比成一种闭包）。</p>
<h5>对象导出</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// module example.js
const DEV = true;
function example() {
    //...
}
class expClass {
    //...
}
let obj = {
    DEV,
    example,
    expClass,
    //...
}
// module example.js
export {DEV, example, expClass, obj};
export {DEV, example as exp, expClass, obj};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// module example.js</span>
<span class="hljs-keyword">const</span> DEV = <span class="hljs-literal">true</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//...</span>
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">expClass</span> </span>{
    <span class="hljs-comment">//...</span>
}
<span class="hljs-keyword">let</span> obj = {
    DEV,
    example,
    expClass,
    <span class="hljs-comment">//...</span>
}
<span class="hljs-comment">// module example.js</span>
<span class="hljs-keyword">export</span> {DEV, example, expClass, obj};
<span class="hljs-keyword">export</span> {DEV, example <span class="hljs-keyword">as</span> exp, expClass, obj};</code></pre>
<p>　　相对于内联导出，上边的这种方式为<strong>对象导出</strong>。我们可以像写普通 <code>JS</code> 文件一样写主要的功能逻辑，最后通过 <code>export</code> 集中导出。</p>
<p>　　在导出时我们可以使用 <code>as</code> 关键字改变导出对象的名称。</p>
<h5>默认导出</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {DEV, example as exp, expClass, obj};
// OR
export default obj;
// OR
export default const DEV = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {DEV, example <span class="hljs-keyword">as</span> exp, expClass, obj};
<span class="hljs-comment">// OR</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> obj;
<span class="hljs-comment">// OR</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">const</span> DEV = <span class="hljs-literal">true</span>;</code></pre>
<p>　　我们可以在 <code>export</code> 关键字后接 <code>default</code> 来设置模块的默认导出对象，需要注意的是：<strong>一个模块只能有一个默认导出</strong>。</p>
<p>　　先不多说，后面讲导入的时候再细讲相互之间的关联。</p>
<h4>模块的导入与使用</h4>
<h5>自定义模块</h5>
<p>　　前文我们定义了一个名为 <code>example</code> 的模块，写在文件 <code>example.js</code>中，下面我们来导入并使用这个模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import example from './example.js';
// OR 
import default as example from './example.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> example <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.js'</span>;
<span class="hljs-comment">// OR </span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> example <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.js'</span>;</code></pre>
<p>　　使用 <code>import</code> 关键字导入一个模块，上边这两种写法是等效的。默认导入对象既是模块默认导出对象，即对应模块定义中的 <code>export default</code> 所导出的内容。</p>
<p>　　此外我们还可以这样导入一个模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {DEV, example} from './example.js';
import * as exp from './example.js';
import {default as expMod, * as expAll, DEV, example as exp} from './example.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {DEV, example} <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.js'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> exp <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.js'</span>;
<span class="hljs-keyword">import</span> {<span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> expMod, * <span class="hljs-keyword">as</span> expAll, DEV, example <span class="hljs-keyword">as</span> exp} <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.js'</span>;</code></pre>
<p>　　这种导入方式对应模块定义中的 <code>export {DEV, example, expClass, obj}</code> 或 <code>export const DEV = true</code>。下面我们逐行分析：</p>
<p>　　第一行，我们使用对象导入的方式导入一个模块内容，可能有些人已经发现，这跟<strong>解构赋值</strong>很相似，但也有不同，下面会讲到。需要注意的是形参对象（<code>{DEV, example}</code>）与模块定义中导出的名称<strong>必须保持一致</strong>。</p>
<p>　　第二行，导入时可以使用通配符 <code>*</code> 配合 <code>as</code> 关键字一次性导出模块中所有内容，最终导入的内容放在 <code>exp</code> 对象中。</p>
<p>　　第三行，在使用对象导入来导入一个模块的指定内容时，也可以使用 <code>as</code> 关键字更改最终导入对象的名称，这里表现出<strong>与解构赋值的一个不同之处</strong>，忘记解构赋值的小伙伴可以翻翻前文对比一下哈~</p>
<p>　　最后，在导入一个模块后我们就可以直接使用模块的函数、变量、类等了，完整的代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {DEV, example, expClass as EC} from './example.js';

if(DEV) {
    let exp = new EC();
    // anything you want...
    example();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {DEV, example, expClass <span class="hljs-keyword">as</span> EC} <span class="hljs-keyword">from</span> <span class="hljs-string">'./example.js'</span>;

<span class="hljs-keyword">if</span>(DEV) {
    <span class="hljs-keyword">let</span> exp = <span class="hljs-keyword">new</span> EC();
    <span class="hljs-comment">// anything you want...</span>
    example();
}</code></pre>
<hr>
<p>　　好嘞！到这里，<code>ES6</code> 常用的 8 个新特性就讲完了，恭喜你耐心地看完了。当然，还有许多地方没有讲到，有时间的话会考虑继续写一些。</p>
<p>　　好嘞，就这样吧，希望对你有所帮助，拜拜~&lt;(*￣▽￣*)/。</p>
<blockquote><p>文中部分专业名词由于未找到合适译文，最后自行翻译，如有不妥，欢迎指正。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 常用新特性讲解

## 原文链接
[https://segmentfault.com/a/1190000010230939](https://segmentfault.com/a/1190000010230939)

