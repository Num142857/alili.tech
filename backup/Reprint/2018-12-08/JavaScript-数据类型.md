---
title: 'JavaScript-数据类型' 
date: 2018-12-08 2:30:30
hidden: true
slug: sxfp0o5kxls
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、动态类型</h2>
<blockquote>JavaScript 是一种<strong>弱类型</strong>或者说<strong>动态语言</strong>。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。（解释一行，执行一行）这也意味着你可以使用<strong>同一个变量保存不同类型的数据</strong>：</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV51yX?w=522&amp;h=74" src="https://static.alili.tech/img/bV51yX?w=522&amp;h=74" alt="JavaScript" title="JavaScript" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">二、数据类型</h2>
<p>最新的 ECMAScript 标准定义了 <strong>7 种</strong> 数据类型:</p>
<p><strong>6种 原型数据类型</strong>:</p>
<ol>
<li>Boolean.  布尔值，true 和 false.</li>
<li>null. 一个表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此 null 与 Null、NULL或其他变量完全不同。</li>
<li>undefined.  变量未定义时的属性。</li>
<li>Number.  表示数字，例如： 42 或者 3.14159。</li>
<li>String.  表示字符串，例如："Howdy"</li>
<li>Symbol ( 在 ECMAScript 6 中新添加的类型).。一种数据类型，它的实例是唯一且不可改变的。</li>
</ol>
<p>以及 <strong>Object 对象</strong></p>
<h2 id="articleHeader2">三、原始值( primitive values )</h2>
<blockquote>除 Object 以外的所有<strong>类型都是不可变的</strong>（值本身无法被改变）。例如，与 C 语言不同，<strong>JavaScript中字符串是不可变的</strong>（译注：如，JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变）。我们称这些类型的值为“原始值”：</blockquote>
<ol>
<li>Boolean</li>
<li>null</li>
<li>undefined</li>
<li>Number</li>
<li>String</li>
<li>Symbol</li>
</ol>
<h2 id="articleHeader3">四、Boolean（布尔值）</h2>
<blockquote>布尔值数据类型只能有两个值，它们是文本 true 和 false。<strong>布尔值是一个真值：它指定条件是否为 true。</strong>
</blockquote>
<h3 id="articleHeader4">4.1 比较相同</h3>
<p>true 和 1 比较是相同，false 和 0 比较是相同（是 <strong>“==” 比较</strong>），因为内部会实现<strong>数据类型转化</strong>，将 true 转换成 1，将 false 转换成 0。但是使用 <strong>“===”</strong> 就不相等了，因为他们的<strong>数据类型不等</strong>。</p>
<h3 id="articleHeader5">4.2 Boolean()</h3>
<p>虽然Boolean类型的字面值只有两个，但JavaScript中所有类型的值都有与这两个Boolean值等价的值。要将一个值转换为其对应的Boolean值，可以调用类型转换函数Boolean()，例如：</p>
<p><span class="img-wrap"><img data-src="/img/bV51Pm?w=526&amp;h=52" src="https://static.alili.tech/img/bV51Pm?w=526&amp;h=52" alt="Boolean()" title="Boolean()" style="cursor: pointer; display: inline;"></span></p>
<p>在这个例子中，字符串message被转换成了一个Boolean值，该值被保存在messageAsBoolean变量中。可以对任何数据类型的值调用Boolean()函数，而且总会返回一个Boolean值。至于返回的这个值是true还是false，**取决于要转换值的数据类型及其实际值。</p>
<h3 id="articleHeader6">4.3 数据类型及其对象的转换规则</h3>
<table>
<thead><tr>
<th>数据类型</th>
<th align="left">转换为true的值</th>
<th align="left">转换为false的值</th>
</tr></thead>
<tbody>
<tr>
<td>Boolean</td>
<td align="left">true</td>
<td align="left">false</td>
</tr>
<tr>
<td>String</td>
<td align="left">任何非空的字符串</td>
<td align="left">""(空字符串)</td>
</tr>
<tr>
<td>Number</td>
<td align="left">任何非0数值（包括无穷大）</td>
<td align="left">0和NAN</td>
</tr>
<tr>
<td>Object</td>
<td align="left">任何对象</td>
<td align="left">null</td>
</tr>
<tr>
<td>Undefined</td>
<td align="left">不适用</td>
<td align="left">undefined</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader7">4.4 if()语句的()内部调用 Boolean 函数</h3>
<h2 id="articleHeader8">五、Null 数据类型</h2>
<blockquote>Null 数据类型在 JavaScript 中<strong>仅具有一个值：null</strong>。null 关键字不能用作函数或变量的名称。</blockquote>
<h3 id="articleHeader9">5.1 清除变量内容</h3>
<p>包含 null 的变量<strong>不包含</strong>有效的数字、字符串、布尔值、数组或对象。通过为变量赋 null值可以<strong>清除变量的内容（不删除变量）。</strong></p>
<h3 id="articleHeader10">5.2 typeof检测null返回object</h3>
<p>（1）在 JavaScript 中，<strong>null 与 0 不同</strong>（在 C 和 C++ 中）。  </p>
<p>（2）JavaScript 中的 typeof 运算符将 null 值报告为 <strong>Object</strong> 类型而不是 Null 类型。（从逻辑角度来看，null值表示一个<strong>空对象指针</strong>）  </p>
<p><span class="img-wrap"><img data-src="/img/bV52AI?w=434&amp;h=26" src="https://static.alili.tech/img/bV52AI?w=434&amp;h=26" alt="object" title="object" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">5.3 初始化为null</h3>
<p>如果定义的变量准备在将来用于<strong>保存对象</strong>，那么最好将该变量<strong>初始化为null</strong>而不是其他值。这样一来，只要直接检测null值就可以知道相应的变量是否已经保存了一个<strong>对象的引用</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV52AB?w=335&amp;h=74" src="https://static.alili.tech/img/bV52AB?w=335&amp;h=74" alt="初始化为null" title="初始化为null" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">5.4 undefined值派生自null值</h3>
<p>实际上，undefined值是派生自null值的，因此ECMA-262规定对它们的相等性测试要返回<strong>true</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV52AA?w=504&amp;h=29" src="https://static.alili.tech/img/bV52AA?w=504&amp;h=29" alt="undefined值派生自null值" title="undefined值派生自null值" style="cursor: pointer;"></span></p>
<p>尽管null和undefined有这样的关系，但它们的用途完全不同。无论在什么情况下都没有必要<strong>把一个变量的值显式地设置为undefined，可是同样的规则对null却不适用</strong>。</p>
<p>换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分null和undefined。</p>
<h2 id="articleHeader13">六、Undefined 数据类型</h2>
<blockquote>Undefined 类型只有一个值，即特殊的 <strong>undefined</strong>。在使用var声明变量但<strong>未对其加以初始化</strong>时，这个变量的值就是 undefined。</blockquote>
<p>undefined 翻译中文 → 未定义（defined 翻译中文 → 定义）</p>
<h3 id="articleHeader14">6.1 兼容旧版浏览器</h3>
<p>在早期的JavaScript版本中是没有规定undefined这个值的，所以在有些框架中为了兼容旧版浏览器，会给<strong>window对象添加undefined值。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV52CC?w=592&amp;h=76" src="https://static.alili.tech/img/bV52CC?w=592&amp;h=76" alt="兼容旧版浏览器" title="兼容旧版浏览器" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">七、null 和 undefined 的区分</h2>
<p>1、若使用 “==” 进行比较，则他们是相等的，因为比较的是<strong>值</strong></p>
<p>2、区分他们的两种方法（比较他们的数据类型）</p>
<p>（1）使用 typeof 将他们区分</p>
<p>（2）若使用全等 “===” ，比较的是<strong>值</strong>和<strong>数据类型</strong>，只有全都相同才返回 true</p>
<p><span class="img-wrap"><img data-src="/img/bV52KW?w=639&amp;h=77" src="https://static.alili.tech/img/bV52KW?w=639&amp;h=77" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader16">八、Number（数字）</h2>
<blockquote>Number类型用来表示<strong>整数值</strong>和<strong>浮点数值</strong>，还有一种特殊的数值，即 <strong>NaN</strong>（非数值 Not a Number）。</blockquote>
<h3 id="articleHeader17">8.1 整数值</h3>
<blockquote>整数值可以是<strong>正整数</strong>、<strong>负整数</strong>和 <strong>0</strong>。  它们可通过以 10 为基数（十进制）、以 16 为基数（十六进制）和以 8<br>为基数（八进制）来表示。  JavaScript 中的<strong>大多数数字都写成十进制形式</strong>。</blockquote>
<h4>8.1.1 十六进制</h4>
<p>通过在整数前面加前导“0x”（零和 x|X）来表示十六进制（“hex”）整数。  字母 A 到 F 以单个数字的形式表示以 10 为基数的 10 到 15。  字母 A 到 F 用于以单个数字的形式表示以 10 为基数的 10 到 15。  即，0xF 相当于 15，0x10 相当于 16。</p>
<h4>8.1.2 八进制</h4>
<p>通过在八进制整数前面加前导“0”（零）来表示八进制整数。  八进制整数只包含 0 到 7 的数字。  具有前导“0”并包含数字“8”和/或“9”的数字将被解释为十进制数字。</p>
<p><span class="img-wrap"><img data-src="/img/bV51FY?w=785&amp;h=80" src="https://static.alili.tech/img/bV51FY?w=785&amp;h=80" alt="整数值" title="整数值" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">8.2 浮点数值</h3>
<blockquote>浮点值可以是<strong>带有小数部分的整数</strong>。此外，还可以用<strong>科学计数法</strong>来表示它们。即，使用大写或小写字母“e”来表示“10 的幂”。</blockquote>
<p>JavaScript 使用数字表示形式的 8 字节 IEEE 754 浮点标准来表示数字。  这意味着您可以编写最大为 1.79769x10308 和最小为 5x10-324 的数字。  包含小数点且小数点前面有单个“0”的数字被解释为十进制浮点数。</p>
<h3 id="articleHeader19">8.3 NaN</h3>
<p>NaN → 英文翻译 Not A Number</p>
<blockquote>NaN 用于表示一个<strong>本来要返回数值的操作数未返回数值</strong>的情况（这样就不会抛出错误了）。例如，在其他编程语言中，任何数值除以0都会导致错误，从而停止代码执行。但在<strong>JavaScript中，任何数值除以0会返回NaN</strong>，因此不会影响其他代码的执行。</blockquote>
<h4>8.3.1 两个特点</h4>
<p>NaN本身有两个非同寻常的特点。首先，<strong>任何涉及NaN的操作（例如NaN/10）都会返回NaN</strong>，这个特点在多步计算中有可能导致问题。其次，<strong>NaN与任何值都不相等，包括NaN本身</strong>。例如，下面的代码会返回false。</p>
<p><span class="img-wrap"><img data-src="/img/bV51It?w=370&amp;h=26" src="https://static.alili.tech/img/bV51It?w=370&amp;h=26" alt="NaN" title="NaN" style="cursor: pointer; display: inline;"></span></p>
<h4>8.3.2 isNaN()函数</h4>
<p>isNaN()函数，用于<strong>判断是否是一个非数字类型</strong>。如果传入的参数是一个非数字类型，那么返回true；否则返回false;</p>
<p>isNaN()函数，传入一个参数，函数会先<strong>将参数转换为数值</strong>。如果参数类型为<strong>对象类型</strong>，会先调用对象的<strong>valueOf()</strong>方法， 再确定该方法返回的值是否可以转换为数值类型。如果<strong>不能</strong>，再调用对象的<strong>toString()</strong>方法，再确定返回值。</p>
<p><span class="img-wrap"><img data-src="/img/bV52AO?w=1030&amp;h=131" src="https://static.alili.tech/img/bV52AO?w=1030&amp;h=131" alt="isNaN()函数" title="isNaN()函数" style="cursor: pointer;"></span></p>
<h2 id="articleHeader20">九、String（字符串）</h2>
<blockquote>JavaScript的字符串类型用于表示文本数据。</blockquote>
<h2 id="articleHeader21">9.1 索引和长度</h2>
<p>String是一组16位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。<strong>第一个元素的索引为0</strong>，下一个是索引1，依此类推。<strong>字符串的长度是它的元素的数量。</strong></p>
<h2 id="articleHeader22">9.2 不可更改</h2>
<p>不同于类 C 语言，JavaScript 字符串是<strong>不可更改的</strong>。这意味着字符串一旦被创建，就不能被修改。但是，可以<strong>基于对原始字符串的操作来创建新的字符串。</strong></p>
<p>（1）获取一个字符串的<strong>子串</strong>可通过选择个别字母或者使用 String.substr()</p>
<p>（2）两个字符串的<strong>连接</strong>使用连接操作符 (+) 或者 String.concat()</p>
<h2 id="articleHeader23">9.3 toString()</h2>
<p>toString()方法将其他数据类型<strong>转换成 String 类型</strong>。但<strong>若对 null 或 undefined 进行操作，则会报错。</strong></p>
<h2 id="articleHeader24">9.4 String()</h2>
<p>String()方法同样能实现 toString()的效果，并且可以对 null 和 undefined 进行操作。</p>
<p>原理：先调用 toString()，如果可以转换成字符串，就将结果直接返回。否，再进行判断是 null 还是 undefined，然后返回‘null' 或 ‘undefined'</p>
<h2 id="articleHeader25">十、Symbol（符号类型）</h2>
<blockquote>符号(Symbols)是ECMAScript 第6版新定义的。符号类型是唯一的并且是<strong>不可修改的</strong>,并且也可以用来作为Object的key的值。在某些语言当中也有类似的原子类型(Atoms)，你也可以认为为它们是C里面的枚举类型。</blockquote>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript-数据类型

## 原文链接
[https://segmentfault.com/a/1190000014028397](https://segmentfault.com/a/1190000014028397)

