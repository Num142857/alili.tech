---
title: '新手开发中常用ES6基础知识总结' 
date: 2019-01-05 2:30:10
hidden: true
slug: bae7muryc5c
categories: [reprint]
---

{{< raw >}}

                    
<p>很早之前就学过TypeScript和ES6，后来做项目的时候零零散散用了些。这几天又系统地把ES6的知识看了一遍。感觉对我这种没实习没工作的新手，虽然一些高级的功能暂时用不上，但是一些基础的知识还是为平时的开发提供了巨大的便利。ES6学习告一段落，现在结合平时的开发，总结一些常用的知识。</p>
<h2 id="articleHeader0">let与const及其相关</h2>
<h3 id="articleHeader1">块级作用域</h3>
<p>ES6新增了块级作用域，总结一句话大致就是：大括号<code>{}</code>包起来的代码块基本山都可以当做块级作用域。</p>
<p>常见的有</p>
<ol>
<li>
<p>直接使用<code>{}</code>包起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
var a = 4
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> {
<span class="hljs-keyword">var</span> a = <span class="hljs-number">4</span>
 }</code></pre>
</li>
<li>
<p>函数体大括号，<code>if-else</code>大括号，<code>for</code>循环大括号，<code>switch</code>大括号，<code>try-catch</code>大括号等。<br>需要注意的是，<code>for</code>循环，每一次循环时的<code>{}</code>都是一个独立的块级作用域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let i=0; a < 5; i++){
   let j = i
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">for</span><span class="hljs-params">(let i=<span class="hljs-number">0</span>; a &lt; <span class="hljs-number">5</span>; i++)</span></span>{
   let j = <span class="hljs-selector-tag">i</span>
}</code></pre>
</li>
</ol>
<p>上面代码循环了五次，实际上有五个独立的<code>j</code>。</p>
<p>日常开发中，我们就可以利用这个特性，来创建块级作用域了。</p>
<h3 id="articleHeader2">块级作用域变量<code>let</code>与<code>const</code>
</h3>
<p>使用<code>let</code>或<code>const</code>声明的变量只在当前块级作用域生效，出了这个代码块，就无法访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   let a = 5
 }
console.log(a) //  Uncaught ReferenceError: a is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> {
   <span class="hljs-keyword">let</span> a = <span class="hljs-number">5</span>
 }
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">//  Uncaught ReferenceError: a is not defined</span></code></pre>
<p>日常开发中，块级作用域中使用的变量，尽量使用<code>let</code>或者<code>const</code>声明。</p>
<p>需要注意的问题:</p>
<ol>
<li><p><code>let</code>和<code>const</code>变量一定要先声明，再使用，避免出错。不要试图利用变量提升的特性。</p></li>
<li><p><code>const</code>声明变量时，一定要初始化，否则会报错。<code>let</code>建议也在声明时初始化。</p></li>
<li>
<p><code>const</code>声明的变量一旦初始化，以后就不可以在进行赋值操作，但可以对其引用的对象进行更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const noChangeMe;    // Uncaught SyntaxError: Missing initializer in const declaration
const noChangeMe = [1,2,4]
noChangeMe = [2, 3]    // Uncaught TypeError: Assignment to constant variable
noChangeMe[100] = 100        // everything is OK" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const noChangeMe;    <span class="hljs-comment">// Uncaught SyntaxError: Missing initializer in const declaration</span>
const noChangeMe = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>]
noChangeMe = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]    <span class="hljs-comment">// Uncaught TypeError: Assignment to constant variable</span>
noChangeMe[<span class="hljs-number">100</span>] = <span class="hljs-number">100</span>        <span class="hljs-comment">// everything is OK</span></code></pre>
</li>
<li>
<p><code>let</code>和<code>const</code>声明的变量不能再重复声明。<br>虽然<code>var</code>可以无限次重复声明，但是并不适用于这两个新的声明方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1
let a = 2        // Identifier 'a' has already been declared" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
let <span class="hljs-selector-tag">a</span> = <span class="hljs-number">2</span>        <span class="hljs-comment">// Identifier 'a' has already been declared</span></code></pre>
</li>
<li><p>不要用<code>window.xxx</code>去调用<code>let</code>与<code>const</code>声明的变量<br>ES6规定，<code>let</code>、<code>const</code>、<code>class</code>声明的全局变量，不属于顶层对象的属性。</p></li>
</ol>
<h2 id="articleHeader3">String</h2>
<h3 id="articleHeader4">使用反引号"`"</h3>
<p>使用<code>``</code>将字符串包起来，可以解决下面的问题:</p>
<ul>
<li><p>字符串不能换行，如果换行只能使用<code>+</code>号</p></li>
<li><p>字符串中的引号如果和最外层相同，需要进行转义</p></li>
<li><p>字符串中插入变量，需要用<code>+</code>号<br>以前这样的写法:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'world'
var str = &quot;小明说:\&quot;hello, &quot; + name + &quot;\&quot;&quot; // 小明说:&quot;hello, world&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> name = <span class="hljs-string">'world'</span>
<span class="hljs-selector-tag">var</span> str = <span class="hljs-string">"小明说:\"hello, "</span> + name + <span class="hljs-string">"\""</span> <span class="hljs-comment">// 小明说:"hello, world"</span></code></pre>
<p>现在可以方便的写作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'world'
str str = `小明说：&quot;hello, ${name}&quot;`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var <span class="hljs-built_in">name</span> = <span class="hljs-string">'world'</span>
<span class="hljs-built_in">str</span> <span class="hljs-built_in">str</span> = `小明说：<span class="hljs-string">"hello, ${name}"</span>`</code></pre>
<p>总的来说，有三个好处:</p>
<ol>
<li><p>不怕字符串中出现的引号；</p></li>
<li><p>不怕换行，反引号包起来的字符串可以随便换行；</p></li>
<li><p>使用<code>${}</code>将变量或表达式包起来直接放在字符串中，不用写很多<code>+</code></p></li>
</ol>
<h3 id="articleHeader5">遍历字符串</h3>
<p>使用<code>for...of</code>代替<code>for</code>循环:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var string = 'string'
for(var i of string) {
    console.log(i)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">string</span> = <span class="hljs-string">'string'</span>
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i <span class="hljs-keyword">of</span> <span class="hljs-built_in">string</span>) {
    <span class="hljs-built_in">console</span>.log(i)
}</code></pre>
<h3 id="articleHeader6">
<code>includes()</code>,<code>startsWidth()</code>,<code>endsWidth()</code>
</h3>
<p>不用使用<code>indexOf()</code>判断字符串中是否包含某个值了，使用<code>includes()</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var string = 'string'
    string.includes('i'， 0)            // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">string</span> = <span class="hljs-string">'string'</span>
    <span class="hljs-keyword">string</span>.includes(<span class="hljs-string">'i'</span>， <span class="hljs-number">0</span>)            <span class="hljs-comment">// true</span></code></pre>
<p><code>includes</code>第二个参数表示查找的起始索引。<br>还可以使用<code>startsWidth()</code>和<code>endsWidth()</code>判断字符串是否以某些字符开始或结尾。</p>
<h2 id="articleHeader7">函数</h2>
<h3 id="articleHeader8">参数的默认值</h3>
<p>方便地设置函数参数的默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print( a = 2 ){
    console.log(a)
}
print()    //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function print( <span class="hljs-selector-tag">a</span> = <span class="hljs-number">2</span> ){
    console.log(a)
}
<span class="hljs-function"><span class="hljs-title">print</span><span class="hljs-params">()</span></span>    <span class="hljs-comment">//2</span></code></pre>
<h3 id="articleHeader9">扩展运算符...获取其余参数</h3>
<p>可以使用<code>...</code>加上变量名保存其他参数全部数量。<br>当只知道函数的前几个具体参数，不确定之后会有多少个参数传入时，可以使用<code>...</code>把其他传入的参数保存到一个<strong>数组</strong>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function print(value1, value2, ...values){
    console.log(values.join('--'))
}
print(1, 2, '参数3')        // 参数3
print(1, 2, '参数3', '参数4', '参数5')    // print(1, 2, '参数3', '参数4', '参数5')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span><span class="hljs-params">(value1, value2, <span class="hljs-rest_arg">...values</span>)</span></span>{
    console.log(values.join(<span class="hljs-string">'--'</span>))
}
print(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">'参数3'</span>)        <span class="hljs-comment">// 参数3</span>
print(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">'参数3'</span>, <span class="hljs-string">'参数4'</span>, <span class="hljs-string">'参数5'</span>)    <span class="hljs-comment">// print(1, 2, '参数3', '参数4', '参数5')</span></code></pre>
<h3 id="articleHeader10">使用箭头函数</h3>
<p>使用箭头函数有两个好处:</p>
<ol>
<li><p>代码更加简洁</p></li>
<li>
<p>静态绑定<code>this</code><br>箭头函数中，<code>this</code>指向的是定义箭头函数的对象中的<code>this</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'outer'
var obj = {
name: 'inner',
func: () => {
    console.log(this.name)
}
}
var obj2 = {
name: 'inner',
func: function() {
    console.log(this.name)
}
}
obj.func() // &quot;outer&quot;
obj2.func()    // &quot;inner&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">'outer'</span>
<span class="hljs-keyword">var</span> obj = {
<span class="hljs-attr">name</span>: <span class="hljs-string">'inner'</span>,
<span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
}
<span class="hljs-keyword">var</span> obj2 = {
<span class="hljs-attr">name</span>: <span class="hljs-string">'inner'</span>,
<span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}
}
obj.func() <span class="hljs-comment">// "outer"</span>
obj2.func()    <span class="hljs-comment">// "inner"</span></code></pre>
</li>
</ol>
<p>第一个使用了箭头函数，由于箭头函数的<code>this</code>与其所在环境中的<code>this</code>相同，也就是与obj的<code>this</code>相同，而obj处于全局环境的活动对象中，<code>this</code>指向全局对象，这里指<code>window</code>，所以输出<code>outer</code>。</p>
<p><strong>注意:</strong>obj对象的<code>this</code>与它的属性中的<code>this</code>不一样。</p>
<p>第二个使用了寻常函数，作为obj2的一个属性，<code>func</code>方法中的<code>this</code>指向了所在的对象。输出<code>inner</code>。</p>
<h2 id="articleHeader11">数组</h2>
<h3 id="articleHeader12">使用<code>Array.from()</code>把类数组对象转为数组</h3>
<p>一般来说，含有<code>length</code>属性的对象就可以当作类数组对象。平时获取多个DOM对象后，不能使用数组中的很多方法。我们可以使用<code>Array.from</code>方便的转换为数组,。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var divs = Array.from(document.querySelectorAll('div'))
divs.forEach((value, index) => {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>var divs = Array.<span class="hljs-keyword">from</span>(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'div'</span>))
divs.forEach(<span class="hljs-function"><span class="hljs-params">(value, index)</span> =&gt;</span> {})</code></pre>
<h3 id="articleHeader13">使用<code>fill()</code>初始化数组</h3>
<p>想要以某个值初始化数组，需要遍历。而使用<code>fill()</code>方法，就方便了很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array(100)  // 建立一个100元素的数组
arr.fill('初始值', 0, arr.length)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-number">100</span>)  <span class="hljs-comment">// 建立一个100元素的数组</span>
arr.fill(<span class="hljs-string">'初始值'</span>, <span class="hljs-number">0</span>, arr.length)</code></pre>
<p>第一个参数是要填充的值，后面两个与一般的数组方法一样，起始索引和结束索引(不包括)。</p>
<h3 id="articleHeader14">使用<code>includes</code>方法</h3>
<p>和字符串的<code>includes</code>方法一样，看数组中是否有给定值。</p>
<h2 id="articleHeader15">对象</h2>
<h3 id="articleHeader16">使用简单的属性表示和方法表示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'John'
var a = {
    name: name,
    sayName: function(){ console.log(this.name) }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var <span class="hljs-keyword">name</span> = <span class="hljs-string">'John'</span>
var a = {
    <span class="hljs-keyword">name</span>: <span class="hljs-keyword">name</span>,
    sayName: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ console.<span class="hljs-built_in">log</span>(this.<span class="hljs-keyword">name</span>) }
}</code></pre>
<p>改写为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'John'
var a = {
    name,
    sayName () { console.log(this.name) }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> name = <span class="hljs-string">'John'</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = {
    name,
    sayName () { console.log(this.name) }
}</code></pre>
<h3 id="articleHeader17">记得<code>Object.is()</code>这个方法</h3>
<p>其与<code>===</code>的差别:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NaN === NaN // false
Object.is(NaN, NaN) // true

-0 === +0   //true
Object.is(+0, -0)        // false
Object.is(+0, 0)        / true
Object.is(-0, 0)        / false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>NaN === NaN <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(NaN, NaN) <span class="hljs-comment">// true</span>

<span class="hljs-number">-0</span> === +<span class="hljs-number">0</span>   <span class="hljs-comment">//true</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(+<span class="hljs-number">0</span>, <span class="hljs-number">-0</span>)        <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(+<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)        / <span class="hljs-keyword">true</span>
<span class="hljs-built_in">Object</span>.<span class="hljs-keyword">is</span>(<span class="hljs-number">-0</span>, <span class="hljs-number">0</span>)        / <span class="hljs-keyword">false</span></code></pre>
<p>可以这样理解,遵循的原则: 是同一个东西就要相等。<br><code>NaN</code>与<code>NaN</code>就是一个东西，而<code>-0</code>带了个负号，和<code>0</code>与<code>+0</code>不一样。<code>0</code>和<code>+0</code>相同就像<code>1</code>和<code>+1</code>相同一样。</p>
<h3 id="articleHeader18">使用<code>Object.assign()</code>合并多个对象</h3>
<p><code>Object.assign()</code>是用来合并对象的。<code>assign</code>，译作<code>分配,指派</code>。这个方法本意是将某些对象自己的属性拷贝到目标对象上。它不回去复制继承来的属性。<br>比如可以在定义某个配置的时候，定义一个基础配置，在定义两个不同情况下的配置。使用时，进行合并。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pathConfig = {
    path: 'style/images'
}
var devConfig = {
    baseUrl: 'http://localhost:8080/'
}
var buildConfig = {
    baseUrl: 'https://192.128.0.2'
}
// 使用时，合并
var mode = 'dev'
var config = Object.assign({}, pathConfig, mode === 'dev' ? devConfig : buildConfig)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> pathConfig = {
    path: <span class="hljs-symbol">'style</span>/images'
}
<span class="hljs-keyword">var</span> devConfig = {
    baseUrl: <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//localhost:8080/'</span>
}
<span class="hljs-keyword">var</span> buildConfig = {
    baseUrl: <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//192.128.0.2'</span>
}
<span class="hljs-comment">// 使用时，合并</span>
<span class="hljs-keyword">var</span> mode = <span class="hljs-symbol">'de</span>v'
<span class="hljs-keyword">var</span> config = <span class="hljs-type">Object</span>.assign({}, pathConfig, mode === <span class="hljs-symbol">'de</span>v' ? devConfig : buildConfig)</code></pre>
<p>只是举个例子。</p>
<h3 id="articleHeader19">
<code>Object.keys()</code>，<code>Object.values()</code>，<code>Object.entries</code>
</h3>
<p>这三个方法返回对象<strong>自身</strong>的，<strong>可枚举</strong>的，属性名为<strong>字符串</strong>的属性相关的东西，分别为：</p>
<ul>
<li><p><code>Object.keys()</code>: 属性名组成的数组</p></li>
<li><p><code>Object.values()</code>： 属性值组成的数组</p></li>
<li><p><code>Object.entries</code>: <code>["key", "value"]</code>组成的数组。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var john = {
    name: 'John',
    age: 12
}
Object.keys(john) //  [&quot;name&quot;, &quot;age&quot;]
Object.values(john) //  [&quot;John&quot;, 12]
Object.entries(john) // [[&quot;name&quot;, &quot;John&quot;], [&quot;age&quot;, 12]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var john = {
    name: <span class="hljs-string">'John'</span>,
    age: <span class="hljs-number">12</span>
}
<span class="hljs-symbol">Object</span>.keys(john) //  [<span class="hljs-string">"name"</span>, <span class="hljs-string">"age"</span>]
<span class="hljs-symbol">Object</span>.values(john) //  [<span class="hljs-string">"John"</span>, <span class="hljs-number">12</span>]
<span class="hljs-symbol">Object</span>.entries(john) // [[<span class="hljs-string">"name"</span>, <span class="hljs-string">"John"</span>], [<span class="hljs-string">"age"</span>, <span class="hljs-number">12</span>]]</code></pre>
<h2 id="articleHeader20">常用<code>...</code>运算符</h2>
<p>前面在函数的剩余参数处理中提到了<code>...</code>扩展运算符。总结了一下，感觉有两个用法:</p>
<ol>
<li><p>用来读取数组或者对象的时候，是把数组或对象给扩展开；</p></li>
<li><p>用来给对象或者数组赋值的时候，自动给对象或数组添加属性或元素。</p></li>
</ol>
<h3 id="articleHeader21">用来读取</h3>
<p>读取的时候就是把数组或者对象给扩展开来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [...[1,2,3], 4]        // 把数组的每一项都展出来
a  // [1, 2, 3, 4]
var obj = {
    name: 'John',
    age: 12
}
var newObj  = {...obj, job: 'teacher' }        // 把某个属性展出来
newObj // {name: &quot;John&quot;, age: 12, job: &quot;teacher&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = [...[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], <span class="hljs-number">4</span>]        <span class="hljs-comment">// 把数组的每一项都展出来</span>
<span class="hljs-selector-tag">a</span>  <span class="hljs-comment">// [1, 2, 3, 4]</span>
<span class="hljs-selector-tag">var</span> obj = {
    name: <span class="hljs-string">'John'</span>,
    age: <span class="hljs-number">12</span>
}
<span class="hljs-selector-tag">var</span> newObj  = {..<span class="hljs-selector-class">.obj</span>, job: <span class="hljs-string">'teacher'</span> }        <span class="hljs-comment">// 把某个属性展出来</span>
newObj <span class="hljs-comment">// {name: "John", age: 12, job: "teacher"}</span></code></pre>
<p>所以可以很方便的用来扩展，合并数组或对象。</p>
<h3 id="articleHeader22">用作赋值</h3>
<p>用作赋值的时候，是用作解构赋值，含义就是把等号右边表达式的剩余属性或数组项都放到<code>...</code>后面的变量里。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a, restB
[a, ...restB] = [1, 3, 5]
a // 1
restB //    [3, 5]

var c, restD
{ name, ...restD } = {name: 'John', age: 12, job: 'teacher'}
name  //  &quot;John&quot;  是一个属性的值
restD    //     { c, ...restD } = {name: 'John', age: 12, job: 'teacher'} 是一个对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span>, restB
[<span class="hljs-selector-tag">a</span>, ...restB] = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>]
<span class="hljs-selector-tag">a</span> <span class="hljs-comment">// 1</span>
restB <span class="hljs-comment">//    [3, 5]</span>

<span class="hljs-selector-tag">var</span> c, restD
{ name, ..<span class="hljs-selector-class">.restD</span> } = {name: <span class="hljs-string">'John'</span>, age: <span class="hljs-number">12</span>, job: <span class="hljs-string">'teacher'</span>}
name  <span class="hljs-comment">//  "John"  是一个属性的值</span>
restD    <span class="hljs-comment">//     { c, ...restD } = {name: 'John', age: 12, job: 'teacher'} 是一个对象</span></code></pre>
<p>对于对象的解构赋值，会把对应不到的属性全部放进<code>...</code>后面的变量对象中。</p>
<p><strong>注意</strong>：因为是把剩下没人要的属性或者数组项都收下，所以<code>...</code>应该放在数组或者对象中的最后，且只能有一个。</p>
<p>本文首发于<a href="https://zhuqingguang.github.io" rel="nofollow noreferrer" target="_blank">我的博客</a><br>如有错误，欢迎指出!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
新手开发中常用ES6基础知识总结

## 原文链接
[https://segmentfault.com/a/1190000010605175](https://segmentfault.com/a/1190000010605175)

