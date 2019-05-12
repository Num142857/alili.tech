---
title: 'JavaScript学习笔记一' 
date: 2018-12-03 2:30:08
hidden: true
slug: yb53pyijqpg
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>个人学习笔记</li>
<li>参考<a href="https://javascript.ruanyifeng.com" rel="nofollow noreferrer">阮一峰的JavaScript教学</a>
</li>
<li>2.1-2.2章</li>
</ul>
<h2>变量</h2>
<p>1<br>变量的声明和赋值，是分开的两个步骤，上面的代码将它们合在了一起，实际的步骤是下面这样。</p>
<pre><code>
var a;
a = 1;</code></pre>
<p>如果只是<strong>声明</strong>变量而没有赋值，则该变量的值是<code>undefined</code>。<code>undefined</code>是一个 JavaScript <strong>关键字</strong>，表示<strong>“无定义”</strong>。<br>2<br>如果变量赋值的时候，忘了写var命令，这条语句也是有效的。</p>
<pre><code>var a = 1;
// 基本等同
a = 1;
</code></pre>
<p>但是，不写var的做法，<strong>不利于表达意图</strong>，而且容易不知不觉地创建<strong>全局变量</strong>，所以建议总是使用var命令声明变量。</p>
<p>JavaScript 是一种<strong>动态类型语言</strong>，也就是说，变量的<strong>类型没有限制</strong>，<strong>变量可以随时更改类型</strong>。</p>
<pre><code>var a = 1;
a = 'hello';
</code></pre>
<h4>变量提升</h4>
<p>JavaScript 引擎的工作方式是，<strong>先解析代码</strong>，<strong>获取</strong>所有被声明的<strong>变量</strong>，然后再<strong>一行一行</strong>地运行。这造成的结果，就是所有的变量的声明语句，都会被<strong>提升到代码的头部</strong>，这就叫做变量提升（hoisting）。</p>
<pre><code>
console.log(a);
var a = 1;</code></pre>
<p>上面代码首先使用console.log方法，在控制台（console）显示变量a的值。这时变量a还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。<strong>因为存在变量提升</strong>，真正运行的是下面的代码。</p>
<pre><code>
var a;
console.log(a);
a = 1;</code></pre>
<p>最后的结果是显示<code>undefined</code>，表示变量<strong>a已声明，但还未赋值</strong>。</p>
<h2>标识符</h2>
<blockquote>第一个字符，可以是任意 Unicode 字母（包括英文字母和其他语言的字母），以及美元符号（<code>$</code>）和下划线（<code>_</code>）。<br>第二个字符及后面的字符，除了 Unicode 字母、美元符号和下划线，还可以用数字<code>0-9</code>。</blockquote>
<pre><code>arg0
_tmp
$elem
π</code></pre>
<p>上面都合法</p>
<h2>if…else 结构</h2>
<p><code>else</code>代码块总是与离自己最近的那个<code>if</code>语句配对。</p>
<pre><code>var m = 1;
var n = 2;

if (m !== 1)
if (n === 2) console.log('hello');
else console.log('world');
</code></pre>
<p>上面代码<strong>不会有任何输出</strong>，<code>else</code>代码块不会得到执行，因为它跟着的是最近的那个<code>if</code>语句，相当于下面这样。</p>
<pre><code>if (m !== 1) {
  if (n === 2) {
    console.log('hello');    
  } else {
    console.log('world');
  }
}
</code></pre>
<p>如果想让<code>else</code>代码块跟随最上面的那个<code>if</code>语句，就要改变大括号的位置。</p>
<pre><code>if (m !== 1) {
  if (n === 2) {
    console.log('hello');    
  }
} else {
  console.log('world');
}
// world
</code></pre>
<h2>
<code>switch</code>结构</h2>
<p>多个<code>if...else</code>连在一起使用的时候，可以转为使用更方便的<code>switch</code>结构。</p>
<pre><code>switch (fruit) {
  case "banana":
    // ...
    break;
  case "apple":
    // ...
    break;
  default:
    // ...
}
</code></pre>
<p>上面代码根据变量<code>fruit</code>的值，选择执行相应的<code>case</code>。<strong>如果所有<code>case</code>都不符合</strong>，则执行最后的<code>default</code>部分。需要注意的是，<strong>每个<code>case</code>代码块内部的<code>break</code>语句不能少</strong>，否则会接下去执行下一个<code>case</code>代码块，而不是跳出<code>switch</code>结构。</p>
<h4>注意</h4>
<p>需要注意的是，<code>switch</code>语句后面的表达式，与<code>case</code>语句后面的表示式比较运行结果时，采用的是<strong>严格相等运算符（<code>===</code>）</strong>，而不是相等运算符（<code>==</code>），这意味着<strong>比较时不会发生类型转换</strong>。</p>
<pre><code>var x = 1;

switch (x) {
  case true:
    console.log('x 发生类型转换');
  default:
    console.log('x 没有发生类型转换');
}
// x 没有发生类型转换
</code></pre>
<p>上面代码中，由于变量<code>x</code>没有发生类型转换,<strong>所以不会执行<code>case true</code></strong>的情况。这表明，switch语句内部采用的是“严格相等运算符”，详细解释请参考《运算符》一节。</p>
<h2>三元运算符 <code>?:</code>
</h2>
<p>JavaScript还有一个三元运算符（即该运算符需要<strong>三个运算子</strong>）<code>?:</code>，也可以用于<strong>逻辑判断</strong>。</p>
<pre><code>(条件) ? 表达式1 : 表达式2
</code></pre>
<p>上面代码中，如果“条件”为<code>true</code>，则返回“表达式1”的值，否则返回“表达式2”的值。</p>
<pre><code>var even = (n % 2 === 0) ? true : false;
</code></pre>
<p>上面代码中，如果n可以被2整除，则even等于true，否则等于false。它等同于下面的形式。</p>
<pre><code>var even;
if (n % 2 === 0) {
  even = true;
} else {
  even = false;
}
</code></pre>
<p>这个三元运算符可以被视为<code>if...else...</code>的简写形式，因此可以用于多种场合。</p>
<pre><code>var myVar;
console.log(
  myVar ?
  'myVar has a value' :
  'myVar do not has a value'
)
// myVar do not has a value
</code></pre>
<p>上面代码利用三元运算符，输出相应的提示。</p>
<pre><code>var msg = '数字' + n + '是' + (n % 2 === 0 ? '偶数' : '奇数');
</code></pre>
<p>上面代码利用三元运算符，在字符串之中插入不同的值。</p>
<h2>break 语句和 continue 语句</h2>
<p><code>break</code>语句和<code>continue</code>语句都具有跳转作用，可以让代码不按既有的顺序执行。</p>
<p><code>break</code>语句用于<strong>跳出代码块或循环</strong>。</p>
<pre><code>var i = 0;

while(i &lt; 100) {
  console.log('i 当前为：' + i);
  i++;
  if (i === 10) break;
}
</code></pre>
<p>上面代码只会执行10次循环，一旦i等于10，就会跳出循环。</p>
<p>for循环也可以使用break语句跳出循环。</p>
<pre><code>for (var i = 0; i &lt; 5; i++) {
  console.log(i);
  if (i === 3)
    break;
}
// 0
// 1
// 2
// 3
</code></pre>
<p>上面代码执行到i等于3，就会跳出循环。</p>
<p>continue语句用于<strong>立即终止本轮循环</strong>，返回循环结构的头部，开始下一轮循环。</p>
<pre><code>var i = 0;

while (i &lt; 100){
  i++;
  if (i % 2 === 0) continue;
  console.log('i 当前为：' + i);
}
</code></pre>
<p>上面代码只有在i为奇数时，才会输出i的值。如果i为偶数，则直接进入下一轮循环。</p>
<p>如果存在多重循环，不带参数的break语句和continue语句都只<strong>针对最内层循环</strong>。</p>
<h2>数据类型</h2>
<p><a href="https://javascript.ruanyifeng.com/grammar/types.html#toc0" rel="nofollow noreferrer">数据类型详解</a><br><span class="img-wrap"><img data-src="/img/remote/1460000014658479" src="https://static.alili.tech/img/remote/1460000014658479" alt="数据类型" title="数据类型"></span></p>
<h2>typeof 运算符</h2>
<p><a href="https://javascript.ruanyifeng.com/grammar/types.html#toc1" rel="nofollow noreferrer">typeof 运算符详解</a><br><span class="img-wrap"><img data-src="/img/remote/1460000014658480?w=1528&amp;h=641" src="https://static.alili.tech/img/remote/1460000014658480?w=1528&amp;h=641" alt="typeof 运算符" title="typeof 运算符"></span></p>
<h2>null 和 undefined</h2>
<h3>相同点</h3>
<ol>
<li>
<code>null</code>与<code>undefined</code>都可以表示“没有”，含义非常相似.将一个变量赋值为<code>undefined</code>或<code>null</code>，老实说，语法效果几<strong>乎没区别</strong>。</li>
<li>在<code>if</code>语句中，它们都会被自动转为<code>false</code>，相等运算符（<code>==</code>）甚至直接报告<strong>两者相等</strong>。</li>
</ol>
<pre><code>if (!undefined) {
  console.log('undefined is false');
}
// undefined is false

if (!null) {
  console.log('null is false');
}
// null is false

undefined == null
// true</code></pre>
<h3>区别</h3>
<ol><li>
<code>null</code>转为数字时，自动变成<code>0</code>
</li></ol>
<pre><code>Number(null) // 0
5 + null // 5</code></pre>
<p>上面代码中，<code>null</code>转为数字时，自动变成<code>0</code>。</p>
<ol><li>
<code>undefined</code>是一个表示”此处无定义”的原始值，转为<strong>数值</strong>时为<code>NaN</code>。</li></ol>
<pre><code>Number(undefined) // NaN
5 + undefined // NaN</code></pre>
<ol><li>
<code>null</code>在调用函数时的用法</li></ol>
<p><code>null</code>表示空值，即该处的值现在为空。<strong>调用函数</strong>时，某个参数未设置任何值，这时就可以传入<code>null</code>，表示<strong>该参数为空</strong>。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入<code>null</code>，表示<strong>未发生错误</strong>。</p>
<ol><li>
<code>undefined</code>表示“未定义”，下面是返回undefined的典型场景</li></ol>
<pre><code>// 变量声明了，但没有赋值
var i;
i // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x;
}
f() // undefined

// 对象没有赋值的属性
var  o = new Object();
o.p // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f() // undefined</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014658481?w=186&amp;h=185" src="https://static.alili.tech/img/remote/1460000014658481?w=186&amp;h=185" alt="示例" title="示例"></span></p>
<h3>NaN</h3>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN" rel="nofollow noreferrer">NaN-MDN详解</a></p>
<ol><li>全局属性 <code>NaN</code> 的值表示<strong>不是一个数字</strong>（Not-A-Number）.<code>NaN</code> 是一个<strong>全局对象</strong>的<strong>属性</strong>。<br><code>NaN</code> 属性的初始值就是 <code>NaN</code>，和<code>Number.NaN</code>的值一样。在现代浏览器中（ES5中）， <code>NaN</code>         属性是一个<strong>不可配置</strong>（non-configurable），<strong>不可写</strong>（non-writable）的属性。</li></ol>
<p>编码中很少直接使用到 <code>NaN</code>。</p>
<ul>
<li>通常都是在<strong>计算失败</strong>时，作为 <code>Math</code> 的某个方法的返回值出现的（例如<code>：Math.sqrt(-1)</code>）</li>
<li>或者尝试将一个字符串<strong>解析成数字但失败了的时候</strong>（例如：<code>parseInt("blabla")</code>）。</li>
</ul>
<hr>
<ol><li>判断一个值是否是NaN<br>等号运算符（== 和 ===） 不能被用来判断一个值是否是 NaN。必须使用 Number.isNaN() 或 isNaN() 函数。</li></ol>
<p><strong>在执行自比较之中：NaN，也只有NaN，比较之中不等于它自己。</strong></p>
<pre><code>NaN === NaN;        // false
Number.NaN === NaN; // false
isNaN(NaN);         // true
isNaN(Number.NaN);  // true

function valueIsNaN(v) { return v !== v; }
valueIsNaN(1);          // false
valueIsNaN(NaN);        // true
valueIsNaN(Number.NaN); // true</code></pre>
<p>自己的测试:<br><span class="img-wrap"><img data-src="/img/remote/1460000014658482?w=320&amp;h=416" src="https://static.alili.tech/img/remote/1460000014658482?w=320&amp;h=416" alt="自己的测试" title="自己的测试"></span></p>
<h2>布尔值</h2>
<ol><li>下列运算符会返回布尔值：</li></ol>
<blockquote>两元逻辑运算符： &amp;&amp; (And)，|| (Or)<br>前置逻辑运算符： ! (Not)<br>相等运算符：===，!==，==，!=<br>比较运算符：&gt;，&gt;=，&lt;，&lt;=</blockquote>
<ol><li>如果 JavaScript 预期<strong>某个位置</strong>应该是布尔值，会将该位置上现有的值<strong>自动转为布尔值</strong>。转换规则是除了下面<strong>六个</strong>值被转为<code>false</code>，其他值都视为<code>true</code>。</li></ol>
<pre><code>undefined
null
false
0
NaN
""或''（空字符串）</code></pre>
<p><strong>注意</strong>，空数组（<code>[]</code>）和空对象（<code>{}</code>）对应的布尔值，都是<code>true</code>。</p>
<pre><code>if ([]) {
  console.log('true');
}
// true

if ({}) {
  console.log('true');
}
// true</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript学习笔记一

## 原文链接
[https://segmentfault.com/a/1190000014658470](https://segmentfault.com/a/1190000014658470)

