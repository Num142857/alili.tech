---
title: '《javascript高级程序设计》笔记：关系运算符与相等运算符' 
date: 2019-01-05 2:30:10
hidden: true
slug: l0gzucudy4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关系运算符</h2>
<p>关系运算符有小于(&lt;)、大于(&gt;)、小于等于(&lt;=)和大于等于(&gt;=)四种，它们都返回一个布尔值</p>
<p>《javascript高级程序设计》书中的规则是这样描述运算规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）如果两个操作数都是数值，则执行数值比较；
（2）如果两个操作数都是字符串，则比较两个字符串对应的字符编码值；
（3）如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较；
（4）如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面> 的规则执行比较，如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面的规则执行比较；
（5）如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>（<span class="hljs-number">1</span>）如果两个操作数都是数值，则执行数值比较；
（<span class="hljs-number">2</span>）如果两个操作数都是字符串，则比较两个字符串对应的字符编码值；
（<span class="hljs-number">3</span>）如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较；
（<span class="hljs-number">4</span>）如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面&gt; 的规则执行比较，如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面的规则执行比较；
（<span class="hljs-number">5</span>）如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。</code></pre>
<p>关系运算图谱：<br><span class="img-wrap"><img data-src="/img/bVSuhF?w=1044&amp;h=552" src="https://static.alili.tech/img/bVSuhF?w=1044&amp;h=552" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>==&gt; <strong>图谱分析：</strong><br>（1）undefined本质是NaN，任何操作数与 NaN 进行关系比较，结果都是 false<br>（2）null本质是0，boolean本质是0或1<br>（3）如果两个操作数都是字符串，则比较两个字符串对应的字符编码值（a-97，A-65， 0-48）；<br>（4）object可能隐式转换成numbe或者string，视情况而定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Brick&quot; < &quot;alphabet&quot;; // true
&quot;23&quot; < &quot;3&quot;; // true
&quot;23&quot; < 3; //false
&quot;a&quot; < 3; // false，因为&quot;a&quot;被转换成了 NaN

undefined < 1; // false，因为undefined会被转换成NaN
undefined > 1; // false
null < 1; // true，因为undefined会被转换成0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-string">"Brick"</span> &lt; <span class="hljs-string">"alphabet"</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
<span class="hljs-string">"23"</span> &lt; <span class="hljs-string">"3"</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>
<span class="hljs-string">"23"</span> &lt; <span class="hljs-number">3</span>; <span class="hljs-regexp">//false</span>
<span class="hljs-string">"a"</span> &lt; <span class="hljs-number">3</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>，因为<span class="hljs-string">"a"</span>被转换成了 NaN

undefined &lt; <span class="hljs-number">1</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>，因为undefined会被转换成NaN
undefined &gt; <span class="hljs-number">1</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">false</span>
null &lt; <span class="hljs-number">1</span>; <span class="hljs-regexp">//</span> <span class="hljs-keyword">true</span>，因为undefined会被转换成<span class="hljs-number">0</span></code></pre>
<h2 id="articleHeader1">相等操作符</h2>
<p>相等操作符有两组：相等和不相等—先转换再比较，全等和不全等—仅比较而不转换</p>
<blockquote><p>== 和 ！= 两个操作符都会先转换操作数(通常称为强制转型)，然后再比较它们的相等性</p></blockquote>
<p>《javascript高级程序设计》书中的规则是这样描述运算规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值—false 转换为 0，而true 转换为 1;
（2）如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值;
（3）如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较;

这两个操作符在进行比较时则要遵循下列规则。
（4）null 和 undefined 是相等的。
（5）要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。
（6）如果有一个操作数是 NaN，则相等操作符返回 false，而不相等操作符返回 true。重要提示:即使两个操作数都是 NaN，相等操作符也返回 false;因为按照规则，NaN 不等于 NaN。
（7）如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true;否则，返回 false。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>（<span class="hljs-number">1</span>）如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值—<span class="hljs-literal">false</span> 转换为 <span class="hljs-number">0</span>，而<span class="hljs-literal">true</span> 转换为 <span class="hljs-number">1</span>;
（<span class="hljs-number">2</span>）如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值;
（<span class="hljs-number">3</span>）如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较;

这两个操作符在进行比较时则要遵循下列规则。
（<span class="hljs-number">4</span>）<span class="hljs-literal">null</span> 和 <span class="hljs-literal">undefined</span> 是相等的。
（<span class="hljs-number">5</span>）要比较相等性之前，不能将 <span class="hljs-literal">null</span> 和 <span class="hljs-literal">undefined</span> 转换成其他任何值。
（<span class="hljs-number">6</span>）如果有一个操作数是 <span class="hljs-literal">NaN</span>，则相等操作符返回 <span class="hljs-literal">false</span>，而不相等操作符返回 <span class="hljs-literal">true</span>。重要提示:即使两个操作数都是 <span class="hljs-literal">NaN</span>，相等操作符也返回 <span class="hljs-literal">false</span>;因为按照规则，<span class="hljs-literal">NaN</span> 不等于 <span class="hljs-literal">NaN</span>。
（<span class="hljs-number">7</span>）如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 <span class="hljs-literal">true</span>;否则，返回 <span class="hljs-literal">false</span>。</code></pre>
<p>相等运算图谱：<br><span class="img-wrap"><img data-src="/img/bVSujD?w=1048&amp;h=558" src="https://static.alili.tech/img/bVSujD?w=1048&amp;h=558" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>==&gt; <strong>图谱分析：</strong><br>（1）null 和 undefined 是相等且不能将 null 和 undefined 转换成其他任何值<br>（2）对象是否相等由其指向决定<br>（3）boolean的本质依然是0和1，字符串和数值的比较要转成数值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null == undefined; // true
&quot;NaN&quot; == NaN; // false
5 == NaN; // false
NaN == NaN; // false
NaN != NaN; // true
false == 0; // true
true == 1; // true
true == 2; // false
undefined == 0; // false
null == 0; // false
&quot;5&quot; == 5; //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="javscript"><span class="hljs-literal">null</span> <span class="hljs-string">==</span> <span class="hljs-string">undefined;</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-string">"NaN"</span> <span class="hljs-string">==</span> <span class="hljs-string">NaN;</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-number">5</span> <span class="hljs-string">==</span> <span class="hljs-string">NaN;</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">NaN</span> <span class="hljs-string">==</span> <span class="hljs-string">NaN;</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">NaN</span> <span class="hljs-string">!=</span> <span class="hljs-string">NaN;</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-literal">false</span> <span class="hljs-string">==</span> <span class="hljs-number">0</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-literal">true</span> <span class="hljs-string">==</span> <span class="hljs-number">1</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-literal">true</span> <span class="hljs-string">==</span> <span class="hljs-number">2</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">undefined</span> <span class="hljs-string">==</span> <span class="hljs-number">0</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-literal">null</span> <span class="hljs-string">==</span> <span class="hljs-number">0</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">"5"</span> <span class="hljs-string">==</span> <span class="hljs-number">5</span><span class="hljs-string">;</span> <span class="hljs-string">//true</span></code></pre>
<blockquote><p>=== 和 !== 两个操作符不会进行类型转换直接比较相等性</p></blockquote>
<p><strong>建议：在知晓变量类型的情况下使用全等和不全等进行判别</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：关系运算符与相等运算符

## 原文链接
[https://segmentfault.com/a/1190000010563778](https://segmentfault.com/a/1190000010563778)

