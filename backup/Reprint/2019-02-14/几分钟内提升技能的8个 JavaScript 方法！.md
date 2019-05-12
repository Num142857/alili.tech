---
title: '几分钟内提升技能的8个 JavaScript 方法！' 
date: 2019-02-14 2:30:37
hidden: true
slug: 80j8257sac6
categories: [reprint]
---

{{< raw >}}

                    
<p>我们今天构建的大多数应用程序都需要进行某种数据收集修改。您最常遇到的常见操作是处理集合中的项。不要再使用 for-loop 循环的传统方式（ let i=0; i &lt; value.length; i++ ）。</p>
<p>请注意，在 for 循环中使用 const 会报一个错误。原因是因为它在每次执行期间重新赋值，因此 i 被 i++ 修改。所以每当你想到使用 const 或 let 时，问问自己 – 这个值会被重新声明吗？如果答案是肯定的，请选择 let ，如果不是，请选择 const 。</p>
<p>假设您要显示产品列表并对集合进行分类，过滤，搜索，修改或更新。或者您可能希望执行快速计算，例如求和，乘法等。实现这一目标的最佳方法是什么？</p>
<p>也许你不喜欢箭头功能，你不想花太多时间学习新东西，或者它们与你无关。放心，并不是只有你这样。我将向您展示如何在 ES5（普通函数）和 ES6（箭头功能）中实现。</p>
<p>请注意：箭头函数和函数声明/表达式不是等效的，不能 盲目替换。请记住，this 关键字在两者之间的工作方式不同。</p>
<p><strong>我们将要关注的方法有：</strong></p>
<p>Spread operator（展开操作符）</p>
<p>for…of 迭代器</p>
<p>includes()</p>
<p>some()</p>
<p>every()</p>
<p>filter()</p>
<p>map()</p>
<p>reduce()</p>
<p>如果您想成为更好的Web开发人员，开始自己的事业，教别人或提高您的开发技能，我将每周发布最新的关于 Web 开发语言的技术和技巧。</p>
<p><strong>1. Spread operator（展开操作符）</strong><br>Spread operator（展开操作符）将数组展开为其对应的元素。它也可以用于对象字面量。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>这是一种简单且快速的方式来列出数组元素</li>
<li>同时适用于数组和对象</li>
<li>这是一种快速直观的传递参数的方法</li>
<li>它只需要三个点 ...</li>
</ul>
<p><strong>示例：</strong></p>
<p>假如你想展示一个喜爱的水果列表，但不是通过一个循环函数的方式。你可以用一个扩展操作符，像这样：</p>
<p>JavaScript 代码:</p>
<p>const favoriteFood = ['Pizza', 'Fries', 'Swedish-meatballs'];</p>
<p>console.log(...favoriteFood);</p>
<p>//Pizza Fries Swedish-meatballs</p>
<p><strong>2. for…of 迭代器</strong><br>for...of 语句循环/遍历集合，为你提供了修改特定元素的功能。 它取代传统的 for-loop 方式。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>这是添加或更新项的简单方法</li>
<li>执行计算（求和，乘法等）</li>
<li>和条件语句结合使用（if，while，switch等）</li>
<li>代码干净，可读性高</li>
</ul>
<p><strong>示例：</strong></p>
<p>假设你有一个工具箱，你想要展示里面所有的工具。for...of 迭代器会让它变得更简单。</p>
<p>JavaScript 代码:</p>
<p>const toolBox = ['Hammer', 'Screwdriver', 'Ruler']</p>
<p>for(const item of toolBox) {</p>
<p>console.log(item)</p>
<p>}</p>
<p>// Hammer</p>
<p>// Screwdriver</p>
<p>// Ruler</p>
<p><strong>3. Includes() 方法</strong><br>include() 方法被用来检查数集合中是否包含指定的元素，如果存在则返回 true，否则返回 false。 请记住，它是区分大小写的：如果集合中的某项元素是 SCHOOL，并且但你查询的是 school ，那么它将会返回 false。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>构建简单的搜索功能</li>
<li>这是一种确定元素项是否存在的直观方法</li>
<li>它使用条件语句来修改，过滤等</li>
<li>代码可读性高</li>
</ul>
<p><strong>示例：</strong></p>
<p>比如，无论出于什么原因，你不知道车库里有什么车，你需要一个系统检查你想要的车是否在车库里。includes() 可以拯救你！</p>
<p>JavaScript 代码:</p>
<p>const garge = ['BMW', 'AUDI', 'VOLVO'];</p>
<p>const findCar = garge.includes('BMW');</p>
<p>console.log(findCar);</p>
<p>// true</p>
<p><strong>4. Some() 方法</strong><br>some() 方法检查在数组中是否存在某些元素，如果存在返回true，否则返回 false 。这和 includes()方法相似，但是 some() 方法的参数是一个函数，而不是一个字符串。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>它确保某些项目通过测试</li>
<li>它使用函数执行条件语句</li>
<li>使您的代码更具声明性</li>
<li>它足够好用</li>
</ul>
<p><strong>示例：</strong></p>
<p>假如你是一个俱乐部老板，并不在乎谁进入这俱乐部吧。但是有些人是不允许进来的，因为他们已经喝了很多酒（我的想象力很好）。查看以下 ES5 和 ES6 之间的差异：</p>
<p>ES5:</p>
<p>JavaScript 代码:</p>
<p>const age = [16, 14, 18];</p>
<p>age.some(function(person) {</p>
<p>return person &gt;= 18;</p>
<p>});</p>
<p>// Output: true</p>
<p>ES6:</p>
<p>JavaScript 代码:</p>
<p>const age = [16, 14, 18];</p>
<p>age.some((person) =&gt; person &gt;= 18);</p>
<p>// true</p>
<p><strong>5. Every() 方法</strong><br>every() 方法循环遍历数组，检查数组中的每个元素项，并返回 true 或 false 。与 some() 概念相似。但是每一项都必须通过条件表达式，否则返回 false 。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>它确保每个项目都通过测试</li>
<li>您可以使用函数执行条件语句</li>
<li>使您的代码更具声明性</li>
</ul>
<p><strong>示例：</strong></p>
<p>上次你用 some()方法允许一些未成年学生进入俱乐部，有人举报了这事，警察抓住了你。这次你不会让这种情况再次发生，你将用 every() 方法确保每一个进来俱乐部的人都是满足年龄限制的。</p>
<p>ES5:</p>
<p>JavaScript 代码:</p>
<p>const age = [15, 20, 19];</p>
<p>age.every(function(person) {</p>
<p>return person &gt;= 18;</p>
<p>})</p>
<p>// Output: false</p>
<p>ES6:</p>
<p>JavaScript 代码:</p>
<p>const age = [15, 20, 19];</p>
<p>age.every((person)=&gt; person &gt;= 18);</p>
<p>// false</p>
<p><strong>6. Filter() 方法</strong><br>filter() 方法创建一个包含所有通过测试的元素的新数组。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>你可以修改原始数组</li>
<li>你可以让你过滤掉那些你不需要的元素项</li>
<li>让你的代码可读性更高</li>
</ul>
<p><strong>示例：</strong></p>
<p>假如你只想要大于或者等于30的价格，过滤掉其他价格。</p>
<p>ES5:</p>
<p>JavaScript 代码:</p>
<p>//array</p>
<p>const prices = [25, 30, 15, 55, 40, 10];</p>
<p>prices.filter(function(price){</p>
<p>return price &gt;= 30;</p>
<p>})</p>
<p>// Output: [30, 55, 40]</p>
<p>ES6:</p>
<p>JavaScript 代码:</p>
<p>const prices = [25, 30, 15, 55, 40, 10];</p>
<p>prices.filter((price) =&gt; price &gt;= 30);</p>
<p>// [30, 55, 40]</p>
<p><strong>7. Map() 方法</strong><br>在返回新数组方面，map() 方法跟 filter() 方法相似。但是，唯一的区别是它用于修改数组中的元素项。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>它可以让你避免对原始数组进行修改</li>
<li>你可以修改你所需的元素项</li>
<li>代码可读性更高</li>
</ul>
<p><strong>示例：</strong></p>
<p>假如你有一份价格清单。 您的经理需要一个清单，以便展示在税率增加25％后的新价格。 map()方法可以帮助你。</p>
<p>ES5:</p>
<p>JavaScript 代码:</p>
<p>const productPriceList = [200, 356, 1500, 5000];</p>
<p>productPriceList.map(function(item){</p>
<p>return item * 0.75;</p>
<p>})</p>
<p>// [150, 267, 1125, 3750]</p>
<p>ES6:</p>
<p>JavaScript 代码:</p>
<p>const productPriceList = [200, 356, 1500, 5000];</p>
<p>productPriceList.map((item) =&gt; item * 0.75);</p>
<p>// [150, 267, 1125, 3750]</p>
<p><strong>8. Reduce() 方法</strong><br>reduce()方法可用于将数组转换为其他内容，可以是整数，对象，promises 链（顺序执行的promises）等等。出于实际原因，一个简单的用例是对整数列表求和。简而言之，它将整个数组“缩短”为一个你想要的值。</p>
<p><strong>为什么我应该用它呢？</strong></p>
<ul>
<li>执行计算</li>
<li>计算一个值</li>
<li>计算重复数</li>
<li>按属性分组对象</li>
<li>按顺序执行promises</li>
<li>这是一种快速执行计算的方法</li>
</ul>
<p><strong>示例：</strong></p>
<p>假如你想得到这一周的消费总和，reduce()可以帮你实。</p>
<p>ES5:</p>
<p>JavaScript 代码:</p>
<p>const weeklyExpenses = [200, 350, 1500, 5000, 450, 680, 350]</p>
<p>weeklyExpenses.reduce(function(first, last) {</p>
<p>return first + last;</p>
<p>})</p>
<p>// 8530</p>
<p>ES6:</p>
<p>JavaScript 代码:</p>
<p>const weeklyExpenses = [200, 350, 1500, 5000, 450, 680, 350]</p>
<p>weeklyExpenses.reduce((first, last) =&gt; first + last);</p>
<p>// 8530</p>
<p><strong>希望你的 JavaScript 技能有所提升！</strong><br>原文链接：<a href="https://www.jianshu.com/p/22f796df053c" rel="nofollow noreferrer" target="_blank">https://www.jianshu.com/p/22f...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
几分钟内提升技能的8个 JavaScript 方法！

## 原文链接
[https://segmentfault.com/a/1190000016891527](https://segmentfault.com/a/1190000016891527)

