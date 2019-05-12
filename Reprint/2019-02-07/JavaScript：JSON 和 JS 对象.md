---
title: 'JavaScript：JSON 和 JS 对象' 
date: 2019-02-07 2:30:15
hidden: true
slug: 6xls09ejjqt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">区别</h2>
<p>JSON（JavaScript Object Notation）仅仅是一种数据格式（或者叫数据形式）。数据格式其实就是一种规范，按照这种规范来存诸和交换数据。就好像 XML 格式一样。</p>
<table>
<thead><tr>
<th align="left">区别</th>
<th align="left">Json</th>
<th align="left">Javascript对象</th>
</tr></thead>
<tbody>
<tr>
<td align="left">含义</td>
<td align="left">仅仅是一种数据格式</td>
<td align="left">对象的实例</td>
</tr>
<tr>
<td align="left">传输</td>
<td align="left">可以跨平台数据传输，速度快</td>
<td align="left">不能传输</td>
</tr>
<tr>
<td align="left">表现</td>
<td align="left">1. 键值对<br>2. 键必须加双引号<br> 3. 值不能为方法函数/undefined/NaN</td>
<td align="left">1.键值对<br> 2.值可以是函数、对象、字符串、数字、boolean 等</td>
</tr>
<tr>
<td align="left">相互转换</td>
<td align="left">Json → JS 对象：<br>1. <code>var obj = JSON.parse(jsonstring);</code><br>2. <code>var obj = eval("("+jsonstring+")");</code>
</td>
<td align="left">JS 对象 → Json：<br><code>JSON.stringify(obj);</code>
</td>
</tr>
</tbody>
</table>
<p>JSON 文本格式在语法上与创建 JavaScript 对象的代码相同，但本质是不同的。我们不能把以下的对象叫 JSON，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {}; // 这只是 JS 对象

// 可把这个称做：JSON 格式的 JavaScript 对象 
var obj2 = {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;};

// 可把这个称做：JSON 格式的字符串
var str1 = '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;}';

// 这个可叫 JSON 格式的数组，是 JSON 的稍复杂一点的形式
var arr = [
    {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},
    {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},
    {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},
];
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// 这个可叫稍复杂一点的 JSON 格式的字符串&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
var str2='['+
    '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},'+
    '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},'+
    '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},'+
']';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj1 = {}; <span class="hljs-comment">// 这只是 JS 对象</span>

<span class="hljs-comment">// 可把这个称做：JSON 格式的 JavaScript 对象 </span>
<span class="hljs-keyword">var</span> obj2 = {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>};

<span class="hljs-comment">// 可把这个称做：JSON 格式的字符串</span>
<span class="hljs-keyword">var</span> str1 = <span class="hljs-string">'{"width":100,"height":200,"name":"rose"}'</span>;

<span class="hljs-comment">// 这个可叫 JSON 格式的数组，是 JSON 的稍复杂一点的形式</span>
<span class="hljs-keyword">var</span> arr = [
    {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>},
    {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>},
    {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>},
];
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span class="hljs-comment">// 这个可叫稍复杂一点的 JSON 格式的字符串&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
<span class="hljs-keyword">var</span> str2=<span class="hljs-string">'['</span>+
    <span class="hljs-string">'{"width":100,"height":200,"name":"rose"},'</span>+
    <span class="hljs-string">'{"width":100,"height":200,"name":"rose"},'</span>+
    <span class="hljs-string">'{"width":100,"height":200,"name":"rose"},'</span>+
<span class="hljs-string">']'</span>;</code></pre>
<p>但 JSON 和 JavaScript 确实存在渊源，JSON 本身的意思就是 JavaScript 对象表示法（JavaScript Object Notation），可以说这种数据格式是从 JavaScript 对象中演变出来的。<strong>JSON 语法是 JavaScript 对象表示法语法的子集</strong>。</p>
<p>JSON 格式的数据，主要是为了跨平台交流数据用的。JSON 独立于语言和平台，JSON 解析器和 JSON 库支持许多不同的编程语言。</p>
<h2 id="articleHeader1">语法</h2>
<p>1、JSON 语法规则：</p>
<ul>
<li><p>数据在名称/值对中</p></li>
<li><p>数据由逗号分隔</p></li>
<li><p>花括号保存对象</p></li>
<li><p>方括号保存数组</p></li>
</ul>
<p>2、JSON 数据值：</p>
<ul>
<li><p>数字（整数或浮点数）</p></li>
<li><p>字符串（在双引号中）</p></li>
<li><p>逻辑值（true 或 false）</p></li>
<li><p>数组（在方括号中）</p></li>
<li><p>对象（在花括号中）</p></li>
<li><p>null</p></li>
</ul>
<p>JSON 数据结构有两种，这两种结构就是对象和数组，通过这两种结构可以表示各种复杂的结构。<br>JSON 使用严格的 JavaScript 对象表示法来表示结构化的数据，因此 <strong>JSON 的属性名必须有双引号</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;company&quot;: &quot;Apple&quot;,
    &quot;age&quot;: 18,
    &quot;IPO&quot;, true,
    &quot;employees&quot;: [
        { &quot;firstName&quot;:&quot;John&quot; , &quot;lastName&quot;:&quot;Doe&quot; }, 
        { &quot;firstName&quot;:&quot;Anna&quot; , &quot;lastName&quot;:&quot;Smith&quot; }, 
        { &quot;firstName&quot;:&quot;Peter&quot; , &quot;lastName&quot;:&quot;Jones&quot; }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"company"</span>: <span class="hljs-string">"Apple"</span>,
    <span class="hljs-string">"age"</span>: <span class="hljs-number">18</span>,
    <span class="hljs-string">"IPO"</span>, <span class="hljs-literal">true</span>,
    <span class="hljs-string">"employees"</span>: [
        { <span class="hljs-string">"firstName"</span>:<span class="hljs-string">"John"</span> , <span class="hljs-string">"lastName"</span>:<span class="hljs-string">"Doe"</span> }, 
        { <span class="hljs-string">"firstName"</span>:<span class="hljs-string">"Anna"</span> , <span class="hljs-string">"lastName"</span>:<span class="hljs-string">"Smith"</span> }, 
        { <span class="hljs-string">"firstName"</span>:<span class="hljs-string">"Peter"</span> , <span class="hljs-string">"lastName"</span>:<span class="hljs-string">"Jones"</span> }
    ]
}</code></pre>
<h2 id="articleHeader2">数据转换</h2>
<h3 id="articleHeader3">JSON 数据转换为 JS 对象</h3>
<p>1、JS 解析器：eval() 函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建包含 JSON 语法的 JavaScript 字符串
var txt = '{ &quot;employees&quot; : [' +  
'{ &quot;firstName&quot;:&quot;John&quot; , &quot;lastName&quot;:&quot;Doe&quot; },' +  
'{ &quot;firstName&quot;:&quot;Anna&quot; , &quot;lastName&quot;:&quot;Smith&quot; },' +  
'{ &quot;firstName&quot;:&quot;Peter&quot; , &quot;lastName&quot;:&quot;Jones&quot; } ]}';

//使用 JS 解析器，解析 JSON 文本并生成 JS 对象
var obj = eval(&quot;(&quot; + txt + &quot;)&quot;);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建包含 JSON 语法的 JavaScript 字符串</span>
<span class="hljs-keyword">var</span> txt = <span class="hljs-string">'{ "employees" : ['</span> +  
<span class="hljs-string">'{ "firstName":"John" , "lastName":"Doe" },'</span> +  
<span class="hljs-string">'{ "firstName":"Anna" , "lastName":"Smith" },'</span> +  
<span class="hljs-string">'{ "firstName":"Peter" , "lastName":"Jones" } ]}'</span>;

<span class="hljs-comment">//使用 JS 解析器，解析 JSON 文本并生成 JS 对象</span>
<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">eval</span>(<span class="hljs-string">"("</span> + txt + <span class="hljs-string">")"</span>);  </code></pre>
<p>使用 eval() 函数时，必须为传入的 JSON 数据参数添加括号'()'，否则会报语法错误。</p>
<p>2、 解析器：parse()函数</p>
<p>但 eval() 的问题在于，除了可以解析 JSON 数据，也可以用于执行 JavaScript 脚本片段，这就会带来潜在的安全问题。JSON 提供了专门的 JSON Parser 来实现只用于解析 JSON 数据，不会执行 JavaScript 脚本，而且速度更快。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = JSON.parse(txt);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">JSON</span>.parse(txt);</code></pre>
<p>较新的浏览器和最新的 ECMAScript (JavaScript) 标准中均包含了原生的对 JSON 的支持。</p>
<h3 id="articleHeader4">JS 数据转换为 JSON 文本</h3>
<p>使用 JSON.strigify() 函数，将 Javascript 对象转换为 JSON 文本数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {a:1,b:2}
var&nbsp;txt&nbsp;=&nbsp;JSON.stringify(obj);
console.log(txt);
结果：
&quot;{&quot;a&quot;:1,&quot;b&quot;:2}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>}
<span class="hljs-keyword">var</span>&nbsp;txt&nbsp;=&nbsp;<span class="hljs-built_in">JSON</span>.stringify(obj);
<span class="hljs-built_in">console</span>.log(txt);
结果：
<span class="hljs-string">"{"</span>a<span class="hljs-string">":1,"</span>b<span class="hljs-string">":2}"</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript：JSON 和 JS 对象

## 原文链接
[https://segmentfault.com/a/1190000005943794](https://segmentfault.com/a/1190000005943794)

