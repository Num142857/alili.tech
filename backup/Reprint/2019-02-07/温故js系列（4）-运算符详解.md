---
title: '温故js系列（4）-运算符详解' 
date: 2019-02-07 2:30:15
hidden: true
slug: 6qk3uhezdwj
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/5" rel="nofollow noreferrer" target="_blank">运算符</a></p>
<h2 id="articleHeader0">JavaScript-运算符</h2>
<p>JavaScript 有一系列操作数据值的运算符，运算符按照特定运算规则对操作数进行运算，将简单的表达式组合成复杂的表达式。</p>
<h3 id="articleHeader1">一元运算符</h3>
<p>一元运算符只能操作一个值。</p>
<p>累加累减运算符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123;
xzavier++  //把变量累加1，相当于xavier = xavier + 1
++xzavier  //把变量累加1，相当于xavier = xavier + 1
xzavier--  //把变量累减1，相当于xavier = xavier - 1
--xzavier  //把变量累减1，相当于xavier = xavier - 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span>;
xzavier++  <span class="hljs-comment">//把变量累加1，相当于xavier = xavier + 1</span>
++xzavier  <span class="hljs-comment">//把变量累加1，相当于xavier = xavier + 1</span>
xzavier--  <span class="hljs-comment">//把变量累减1，相当于xavier = xavier - 1</span>
--xzavier  <span class="hljs-comment">//把变量累减1，相当于xavier = xavier - 1</span>
</code></pre>
<p>上述代码不只是<code>++--</code>前后置的区别，当有赋值操作时，区别为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 1;
var num1 = ++xzavier; //num1 值为2   -- 第1点
var num2 = xzavier++; //num2 值为1   -- 第2点
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> num1 = ++xzavier; <span class="hljs-comment">//num1 值为2   -- 第1点</span>
<span class="hljs-keyword">var</span> num2 = xzavier++; <span class="hljs-comment">//num2 值为1   -- 第2点</span>
</code></pre>
<p>对于第1点：</p>
<p><code>num1</code>得到的值是 <code>++xzavier</code>表达式的返回值，这个表达式返回<code>xzavier</code>自加<code>1</code>之后的值，这一点可以在控制台打印来观察。当然，<code>xzavier</code>变量也自加<code>1</code>，值也变为了<code>2</code></p>
<p>对于第2点：</p>
<p><code>num2</code>得到的值是 <code>++xzavier</code>表达式的返回值，这个表达式返回<code>xzavier</code>本身的值（自加<code>1</code>之前的值），这一点可以在控制台打印来观察。之后<code>++</code>后置操作符对<code>xzavier</code>起作用，于是<code>xzavier</code>自加<code>1</code>，<code>xzavier</code>的值现在是<code>2</code>了。</p>
<p>也就是说，如果定义<code>num1</code>和<code>num2</code>之后的这个表达式返回值作用的优先级为<code>R</code>，那么++前置操作符作用的优先级是大于<code>R</code>的，而++后置操作符作用的优先级是小于<code>R</code>的。</p>
<p>加减运算符本应参与运算，但也可以进行类型转换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier1 = 'xzavier', xzavier2 = '123', xzavier3 = false, xzavier4 = 123, xzavier5 = '-123';
+xzavier1  //NaN
+xzavier2  //123
+xzavier3  //0
+xzavier4  //123
+xzavier5  //-123
-xzavier1  //NaN
-xzavier2  //-123
-xzavier3  //0
-xzavier4  //-123
-xzavier5  //123

// 用+转换规则手写一个parseInt
function myParseInt(value) {
    if(typeof value === 'number') {
        return value;
    }

    if(typeof value === 'string' &amp;&amp; value.length > 0) {
        value = value.match(/^\d+/);
        if (Array.isArray(value)) {
            return +value[0];
        }
    }

    return NaN;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> xzavier1 = <span class="hljs-string">'xzavier'</span>, xzavier2 = <span class="hljs-string">'123'</span>, xzavier3 = <span class="hljs-literal">false</span>, xzavier4 = <span class="hljs-number">123</span>, xzavier5 = <span class="hljs-string">'-123'</span>;
+xzavier1  <span class="hljs-comment">//NaN</span>
+xzavier2  <span class="hljs-comment">//123</span>
+xzavier3  <span class="hljs-comment">//0</span>
+xzavier4  <span class="hljs-comment">//123</span>
+xzavier5  <span class="hljs-comment">//-123</span>
-xzavier1  <span class="hljs-comment">//NaN</span>
-xzavier2  <span class="hljs-comment">//-123</span>
-xzavier3  <span class="hljs-comment">//0</span>
-xzavier4  <span class="hljs-comment">//-123</span>
-xzavier5  <span class="hljs-comment">//123</span>

<span class="hljs-comment">// 用+转换规则手写一个parseInt</span>
<span class="hljs-function">function <span class="hljs-title">myParseInt</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span> === <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>;
    }

    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span> === <span class="hljs-string">'string'</span> &amp;&amp; <span class="hljs-keyword">value</span>.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>.match(/^\d+/);
        <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">value</span>)) {
            <span class="hljs-keyword">return</span> +<span class="hljs-keyword">value</span>[<span class="hljs-number">0</span>];
        }
    }

    <span class="hljs-keyword">return</span> NaN;
} 
</code></pre>
<p>当然，还有一些方法也可以被当做一元运算符，比如：</p>
<ul>
<li>typeof 方法是一元运算符，可操作单个值，判断类型。</li>
<li>delete 也是一元运算符， 它用来删除对象属性或者数组元素。</li>
</ul>
<h3 id="articleHeader2">算术运算符</h3>
<p>在运算时候如果运算值不是数值，那么后台会先使用 <code>Number()</code> 转型函数将其转换为数值，隐式转换：</p>
<p>加法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123 + 456;     //579
var xzavier = 1 + NaN;       //NaN，只要运算中有一个NaN，计算值就为NaN
var xzavier = 123 + 'abc';   //123abc  有字符串时未字符串连接符
var xzavier = 123 + Object;  //123[object Object]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> + <span class="hljs-number">456</span>;     <span class="hljs-comment">//579</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">1</span> + <span class="hljs-literal">NaN</span>;       <span class="hljs-comment">//NaN，只要运算中有一个NaN，计算值就为NaN</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> + <span class="hljs-string">'abc'</span>;   <span class="hljs-comment">//123abc  有字符串时未字符串连接符</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> + <span class="hljs-built_in">Object</span>;  <span class="hljs-comment">//123[object Object]</span>
</code></pre>
<p>对象会内部调用 <code>toString()</code> 或 <code>valueOf()</code> 方法进行转换为原始值。（这里有提到 valueOf 和 toString 方法的转换：<a href="https://segmentfault.com/a/1190000005863067">JavaScript-数据类型浅析</a>）</p>
<p>减法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123 - 12; //111
var xzavier = -123 - 12 //-135
var xzavier = 123 - true; //122 true会隐式转换为1
var xzavier = 123 - 'xzavier'; //NaN
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> - <span class="hljs-number">12</span>; <span class="hljs-comment">//111</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">-123</span> - <span class="hljs-number">12</span> <span class="hljs-comment">//-135</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> - <span class="hljs-literal">true</span>; <span class="hljs-comment">//122 true会隐式转换为1</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> - <span class="hljs-string">'xzavier'</span>; <span class="hljs-comment">//NaN</span>
</code></pre>
<p>乘法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123 * 2; //246
var xzavier = 123 * NaN; //NaN
var xzavier = 123 * true; //123
var xzavier = 123 * ''; //0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> * <span class="hljs-number">2</span>; <span class="hljs-comment">//246</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> * <span class="hljs-literal">NaN</span>; <span class="hljs-comment">//NaN</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> * <span class="hljs-literal">true</span>; <span class="hljs-comment">//123</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> * <span class="hljs-string">''</span>; <span class="hljs-comment">//0</span>
</code></pre>
<p>除法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123 / 3; //41
var xzavier = 123 / 4; //30.75
var xzavier = 123 / NaN; //NaN
var xzavier = 123 / true; //123
var xzavier = 123 / ''; //Infinity
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> / <span class="hljs-number">3</span>; <span class="hljs-comment">//41</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> / <span class="hljs-number">4</span>; <span class="hljs-comment">//30.75</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> / <span class="hljs-literal">NaN</span>; <span class="hljs-comment">//NaN</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> / <span class="hljs-literal">true</span>; <span class="hljs-comment">//123</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> / <span class="hljs-string">''</span>; <span class="hljs-comment">//Infinity</span>
</code></pre>
<p>求余</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123 % 3; //0
var xzavier = 123 % 4; //3
var xzavier = 123 % NaN; //NaN
var xzavier = 123 % true; //0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> % <span class="hljs-number">3</span>; <span class="hljs-comment">//0</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> % <span class="hljs-number">4</span>; <span class="hljs-comment">//3</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> % <span class="hljs-literal">NaN</span>; <span class="hljs-comment">//NaN</span>
<span class="hljs-keyword">var</span> xzavier = <span class="hljs-number">123</span> % <span class="hljs-literal">true</span>; <span class="hljs-comment">//0</span>
</code></pre>
<h3 id="articleHeader3">关系运算符</h3>
<p>用于比较的运算符称作为关系运算符：小于 <code>&lt;</code>、大于 <code>&gt;</code>、小于等于 <code>&lt;=</code>、大于等于 <code>&gt;=</code>、相等 <code>==</code>、不等 <code>!=</code>、全等(恒等) <code>===</code>、不全等(不恒等) <code>!==</code>：</p>
<ol>
<li>两个操作数都是数值，则数值比较；</li>
<li>两个操作数都是字符串，则比较两个字符串对应的字符编码值；</li>
<li>两个操作数有一个是数值，则将另一个转换为数值，再进行数值比较；</li>
<li>两个操作数有一个是对象，则先调用 <code>valueOf()</code> 方法或 <code>toString()</code> 方法，再用结果比较。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="321 > 123; //true
123 > 321; //false
'123' > 321; //false
'321' > '1234'; //true
'a' > 'b'; //false a=97,b=98
'a' > 'B'; //true B=66
1 > Object; //false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">321 </span>&gt; <span class="hljs-number">123</span>; //true
<span class="hljs-symbol">123 </span>&gt; <span class="hljs-number">321</span>; //false
<span class="hljs-comment">'123' &gt; 321; //false</span>
<span class="hljs-comment">'321' &gt; '1234'; //true</span>
<span class="hljs-comment">'a' &gt; 'b'; //false a=97,b=98</span>
<span class="hljs-comment">'a' &gt; 'B'; //true B=66</span>
<span class="hljs-symbol">1 </span>&gt; Object; //false
</code></pre>
<p>在相等和不等的比较上，如果操作数是非数值，则遵循一下规则：</p>
<ol>
<li>一个操作数是布尔值，则比较之前将其转换为数值，false 转成 0，true 转成 1；</li>
<li>一个操作数是字符串，则比较之前将其转成为数值再比较；</li>
<li>一个操作数是对象，则先调用 <code>valueOf()</code> 或 <code>toString()</code> 方法后再和返回值比较；</li>
<li>不需要任何转换的情况下，null 和 undefined 是相等的；</li>
<li>一个操作数是 NaN，则 <code>==</code> 返回 false，<code>!=</code> 返回 true；并且 NaN 和自身不等；</li>
<li>两个操作数都是对象，则比较他们是否是同一个对象，如果都指向同一个对象，则返回 true，否则返回 false；</li>
<li>在全等和全不等的判断上，只有值和类型都相等，才返回 true，否则返回 false。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="123 == 123; //true
'123' == 123; //true，'123'会转成成数值123
false == 0; //true，false 转成数值就是0
'a' == 'A'; //false，转换后的编码不一样
123 == {}; //false，执行toString()或valueOf()会改变
123 == NaN; //false，只要有NaN，都是false
{} == {}; //false，比较的是他们的地址，每个新创建对象的引用地址都不同

null == undefined //true
'NaN' == NaN //false
123 == NaN //false
NaN == NaN //false
false == 0 //true
true == 1 //true
true == 2 //false
undefined == 0 //false
null == 0 //false
'123' == 123 //true
'123' === 123 //false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">123</span> == <span class="hljs-number">123</span>; <span class="hljs-comment">//true</span>
<span class="hljs-string">'123'</span> == <span class="hljs-number">123</span>; <span class="hljs-comment">//true，'123'会转成成数值123</span>
<span class="hljs-literal">false</span> == <span class="hljs-number">0</span>; <span class="hljs-comment">//true，false 转成数值就是0</span>
<span class="hljs-string">'a'</span> == <span class="hljs-string">'A'</span>; <span class="hljs-comment">//false，转换后的编码不一样</span>
<span class="hljs-number">123</span> == {}; <span class="hljs-comment">//false，执行toString()或valueOf()会改变</span>
<span class="hljs-number">123</span> == <span class="hljs-literal">NaN</span>; <span class="hljs-comment">//false，只要有NaN，都是false</span>
{} == {}; <span class="hljs-comment">//false，比较的是他们的地址，每个新创建对象的引用地址都不同</span>

<span class="hljs-literal">null</span> == <span class="hljs-literal">undefined</span> <span class="hljs-comment">//true</span>
<span class="hljs-string">'NaN'</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">//false</span>
<span class="hljs-number">123</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">NaN</span> == <span class="hljs-literal">NaN</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">false</span> == <span class="hljs-number">0</span> <span class="hljs-comment">//true</span>
<span class="hljs-literal">true</span> == <span class="hljs-number">1</span> <span class="hljs-comment">//true</span>
<span class="hljs-literal">true</span> == <span class="hljs-number">2</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">undefined</span> == <span class="hljs-number">0</span> <span class="hljs-comment">//false</span>
<span class="hljs-literal">null</span> == <span class="hljs-number">0</span> <span class="hljs-comment">//false</span>
<span class="hljs-string">'123'</span> == <span class="hljs-number">123</span> <span class="hljs-comment">//true</span>
<span class="hljs-string">'123'</span> === <span class="hljs-number">123</span> <span class="hljs-comment">//false</span>
</code></pre>
<h3 id="articleHeader4">逻辑运算符</h3>
<p>逻辑运算符通常用于布尔值的操作，一般和关系运算符配合使用，有三个逻辑运算符：</p>
<p>逻辑与（AND）：<code>&amp;&amp;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="num1 &amp;&amp; num2
true    true    true
true    false   false
false   true    false
false   false   false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">num1</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-string">num2</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">true</span>    <span class="hljs-literal">true</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">true</span>    <span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>
</code></pre>
<p>如果两边的操作数有一个操作数不是布尔值的情况下，与运算就不一定返回布尔值，此时，遵循已下规则：</p>
<ol>
<li>第一个操作数是对象，则返回第二个操作数；</li>
<li>第二个操作数是对象，则第一个操作数返回 true，才返回第二个操作数，否则返回 false；</li>
<li>有一个操作数是 null，则返回 null；</li>
<li>有一个操作数是 undefined，则返回 undefined。</li>
</ol>
<p>逻辑或（OR）：<code>||</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="num1 || num2
true    true     true
true    false    true
false   true     true
false   false    false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">num1</span> <span class="hljs-string">||</span> <span class="hljs-string">num2</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">true</span>     <span class="hljs-literal">true</span>
<span class="hljs-literal">true</span>    <span class="hljs-literal">false</span>    <span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">true</span>     <span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>   <span class="hljs-literal">false</span>    <span class="hljs-literal">false</span>
</code></pre>
<p>如果两边的操作数有一个操作数不是布尔值的情况下，逻辑与运算就不一定返回布尔值，此时，遵循已下规则：</p>
<ol>
<li>第一个操作数是对象，则返回第一个操作数；</li>
<li>第一个操作数的求值结果为 false，则返回第二个操作数；</li>
<li>两个操作数都是对象，则返回第一个操作数；</li>
<li>两个操作数都是 null，则返回 null；</li>
<li>两个操作数都是 NaN，则返回 NaN；</li>
<li>两个操作数都是 undefined，则返回 undefined。</li>
</ol>
<p>逻辑非（NOT）：<code>!</code></p>
<p>逻辑非参考： <a href="https://segmentfault.com/a/1190000006672446" target="_blank">JavaScript数据判断</a><br>逻辑非运算符可以用于任何值。无论这个值是什么数据类型，这个运算符都会返回一个布尔值。它的流程是：先将这个值转换成布尔值，然后取反，规则如下：</p>
<ol>
<li>操作数是一个对象，返回 false；</li>
<li>操作数是一个空字符串，返回 true；</li>
<li>操作数是一个非空字符串，返回 false；</li>
<li>操作数是数值 0，返回 true；</li>
<li>操作数是任意非 0 数值（包括 Infinity），false；</li>
<li>操作数是 null，返回 true；</li>
<li>操作数是 NaN，返回 true；</li>
<li>操作数是 undefined，返回 true。</li>
</ol>
<p>不过，逻辑非也比较特殊。可以更好的记忆：<a href="https://segmentfault.com/a/1190000006672446#articleHeader2">!的判断</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = !(123 > 12); //false
var xzavier = !{}; //false
var xzavier = !''; //true
var xzavier = !'xzavier'; //false
var xzavier = !0; //true
var xzavier = !123; //false
var xzavier = !null; //true
var xzavier = !NaN; //true
var xzavier = !undefined; //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xzavier = !(<span class="hljs-number">123</span> &gt; <span class="hljs-number">12</span>); <span class="hljs-comment">//false</span>
<span class="hljs-keyword">var</span> xzavier = !{}; <span class="hljs-comment">//false</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-string">''</span>; <span class="hljs-comment">//true</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-string">'xzavier'</span>; <span class="hljs-comment">//false</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-number">0</span>; <span class="hljs-comment">//true</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-number">123</span>; <span class="hljs-comment">//false</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-literal">null</span>; <span class="hljs-comment">//true</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-literal">NaN</span>; <span class="hljs-comment">//true</span>
<span class="hljs-keyword">var</span> xzavier = !<span class="hljs-literal">undefined</span>; <span class="hljs-comment">//true</span>
</code></pre>
<h3 id="articleHeader5">位运算符</h3>
<p>在一般的应用中，我们基本上用不到位运算符。位非 NOT <code>~</code>、位与 AND <code>&amp;</code>、位或 OR <code>|</code>、位异或 XOR <code>^</code>、左移 <code>&lt;&lt;</code>、有符号右移 <code>&gt;&gt;</code>、无符号右移 <code>&gt;&gt;&gt;</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = ~123; //-124
var xzavier = 123 &amp; 3; //3
var xzavier = 123 | 3; //123
var xzavier = 123 << 3; //984
var xzavier = 123 >> 3; //15
var xzavier = 123 >>> 3; //15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var xzavier = ~<span class="hljs-number">123</span>; <span class="hljs-comment">//-124</span>
var xzavier = <span class="hljs-number">123</span> &amp; <span class="hljs-number">3</span>; <span class="hljs-comment">//3</span>
var xzavier = <span class="hljs-number">123</span> | <span class="hljs-number">3</span>; <span class="hljs-comment">//123</span>
var xzavier = <span class="hljs-number">123</span> &lt;&lt; <span class="hljs-number">3</span>; <span class="hljs-comment">//984</span>
var xzavier = <span class="hljs-number">123</span> &gt;&gt; <span class="hljs-number">3</span>; <span class="hljs-comment">//15</span>
var xzavier = <span class="hljs-number">123</span> &gt;&gt;&gt; <span class="hljs-number">3</span>; <span class="hljs-comment">//15</span></code></pre>
<p>过程勉强看一下哈，不想写很多0101，所以写在纸上O(∩_∩)O~<br><span class="img-wrap"><img data-src="/img/bVCy3O?w=960&amp;h=720" src="https://static.alili.tech/img/bVCy3O?w=960&amp;h=720" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">赋值运算符</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xzavier = 123; //把123赋值给xzavier变量
xzavier = xzavier +123; //246
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var xzavier = <span class="hljs-number">123</span>; <span class="hljs-comment">//把123赋值给xzavier变量</span>
xzavier = xzavier +<span class="hljs-number">123</span>; <span class="hljs-comment">//246</span>
</code></pre>
<p>更多类似赋值运算符</p>
<ol>
<li>乘/赋 <code>*=</code>
</li>
<li>除/赋 <code>/=</code>
</li>
<li>取余/赋 <code>%=</code>
</li>
<li>加/赋 <code>+=</code>
</li>
<li>减/赋 <code>-=</code>
</li>
<li>左移/赋 <code>&lt;&lt;=</code>
</li>
<li>有符号右移/赋 <code>&gt;&gt;=</code>
</li>
<li>无符号右移/赋 <code>&gt;&gt;&gt;=</code>
</li>
</ol>
<h3 id="articleHeader7">三目运算符</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function absN(xzavier) {
    return xzavier > 0 ? xzavier : -xzavier;
}
absN(-123);  //123
absN(123);  //123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">absN</span><span class="hljs-params">(xzavier)</span> </span>{
    <span class="hljs-keyword">return</span> xzavier &gt; <span class="hljs-number">0</span> ? xzavier : -xzavier;
}
absN(<span class="hljs-number">-123</span>);  <span class="hljs-comment">//123</span>
absN(<span class="hljs-number">123</span>);  <span class="hljs-comment">//123</span></code></pre>
<h3 id="articleHeader8">逗号运算符</h3>
<p>逗号运算符用于对两个表达式求值，并返回后一个表达式的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'xza', 'vier' // &quot;vier&quot;

var x = 0;
var y = (x++, 10);  
x // 1 
y // 10

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-string">'xza'</span>, <span class="hljs-string">'vier'</span> <span class="hljs-comment">// "vier"</span>

<span class="hljs-keyword">var</span> x = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> y = (x++, <span class="hljs-number">10</span>);  
x <span class="hljs-comment">// 1 </span>
y <span class="hljs-comment">// 10</span>

</code></pre>
<h3 id="articleHeader9">运算符优先级</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=". [] ()                          对象成员存取、数组下标、函数调用等
++ -- ~ ! delete new typeof void 一元运算符
乘法 / %                          乘法、除法、去模
加法 - +                          加法、减法、字符串连接
<< >> >>>                        位移
< <= > >= instanceof             关系比较、检测类实例
== != === !==                    恒等(全等)
&amp;                                位与
^                                位异或
|                                位或
&amp;&amp;                               逻辑与
||                               逻辑或
?:                               三元条件
= x=                             赋值、运算赋值
,                                多重赋值、数组元素分隔符
圆括号()可以用来提高运算的优先级，因为它的优先级是最高的，即圆括号中的表达式会第一个运算。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-bullet">. </span>[] ()                          对象成员存取、数组下标、函数调用等
++ -- ~ ! delete new typeof void 一元运算符
乘法 / %                          乘法、除法、去模
加法 - +                          加法、减法、字符串连接
&lt;&lt; &gt;&gt; &gt;&gt;&gt;                        位移
&lt; &lt;= &gt; &gt;= instanceof             关系比较、检测类实例
<span class="hljs-section">== != === !==                    恒等(全等)</span>
&amp;                                位与
^                                位异或
|                                位或
&amp;&amp;                               逻辑与
||                               逻辑或
?:                               三元条件
<span class="hljs-section">= x=                             赋值、运算赋值</span>
,                                多重赋值、数组元素分隔符
圆括号()可以用来提高运算的优先级，因为它的优先级是最高的，即圆括号中的表达式会第一个运算。
</code></pre>
<p>几个有意思的等式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2] + [3,4] == &quot;1,23,4&quot;;  //true
[4,[3,2]][7][0] == 3;  //true
++[[]][+[]]+[+[]] == '10';  //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>[1,2] + [3,4] == "1,23,4";  //true
[<span class="hljs-string">4,[3,2</span>]][<span class="hljs-string">7</span>][<span class="hljs-symbol">0</span>] == 3;  //true
++[<span class="hljs-string">[</span>]][+[]]+[+[]] == '10';  //true
</code></pre>
<p>今天好天气，打篮球去咯。代码，篮球，生活...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（4）-运算符详解

## 原文链接
[https://segmentfault.com/a/1190000005927342](https://segmentfault.com/a/1190000005927342)

