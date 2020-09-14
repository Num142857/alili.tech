---
title: '这些JavaScript方法将会在几分钟内提高你的技能' 
date: 2018-11-30 2:30:11
hidden: true
slug: f7z0cm6zz4a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">这些JavaScript方法将会在几分钟内提高你的技能</h1>
<p>现在创建的大多数应用都会需要对一些数据集合做修改。处理集合中的元素是你最可能遇到的操作。不要再使用常规的像是<code>(const i; i &lt; value.length; i++ )</code>的<code>for-loop</code>方式。<br>如果你想要展示一个商品列表，并且对这个数据集合做分类、筛选、搜索、修改和更新。或者你想做一些快速计算比如求和，相乘等等。实现这些操作的最佳方式是什么？<br>可能你不喜欢<strong>箭头函数</strong>，你也不想花费太多时间去学习这些新东西，或者它们跟你没有关系。放心，并不是只有你这样。我会同时在ES5（普通函数）和ES6（箭头函数）中展示给你看怎么实现。<br><strong>注意：</strong>箭头函数和函数声明/表达式不是等价的，而且也不能<a href="https://stackoverflow.com/questions/34361379/arrow-function-vs-function-declaration-expressions-are-they-equivalent-exch?utm_medium=organic&amp;utm_source=google_rich_qa&amp;utm_campaign=google_rich_qa" rel="nofollow noreferrer" target="_blank">盲目替换</a>。你要记得<code>this</code>关键字在两者之间的作用不一样的。</p>
<h4>这些方法将会被使用</h4>
<ol>
<li>Spread operator（扩展运算符，三个点）</li>
<li>for…of iterator</li>
<li>includes()</li>
<li>some()</li>
<li>every()</li>
<li>filter()</li>
<li>map()</li>
<li>reduce()</li>
</ol>
<h3 id="articleHeader1">1. 扩展操作符</h3>
<p>扩展运算符用于把一个数组<strong>展开</strong>变为一个数组元素序列（一系列逗号隔开的值）。也可以展开对象字面量。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>简单且快速的方式列出数组元素</li>
<li>同时用于数组和对象</li>
<li>快速且直观的方式传递参数</li>
<li>只需要写三个点</li>
</ul>
<h4>例子：</h4>
<p>假如你想展示一个喜爱的水果列表，但不是通过一个循环函数的方式。你可以用一个扩展操作符，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const favoriteFood = ['Pizza', 'Fries', 'Swedish-meatballs'];

console.log(...favoriteFood);
//Pizza Fries Swedish-meatballs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> favoriteFood = [<span class="hljs-string">'Pizza'</span>, <span class="hljs-string">'Fries'</span>, <span class="hljs-string">'Swedish-meatballs'</span>];

<span class="hljs-built_in">console</span>.log(...favoriteFood);
<span class="hljs-comment">//Pizza Fries Swedish-meatballs</span></code></pre>
<h3 id="articleHeader2">2. for…of 迭代器</h3>
<p><code>for...of</code>利用循环/迭代器表达式遍历集合，为你提供了修改特定元素的能力。它可以替代常规的<code>for-loop</code>方式。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>一种简单的方式添加、更新一个元素</li>
<li>执行计算（累加、相乘）</li>
<li>代码简单，可读性高</li>
</ul>
<h4>例子：</h4>
<p>如果你有一个工具箱，你想要展示里面所有的工具。<code>for...of</code>迭代器会让它变得更简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const toolBox = ['Hammer', 'Screwdriver', 'Ruler']
for(const item of toolBox) {
  console.log(item)
}

// Hammer
// Screwdriver
// Ruler" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> toolBox = [<span class="hljs-string">'Hammer'</span>, <span class="hljs-string">'Screwdriver'</span>, <span class="hljs-string">'Ruler'</span>]
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> toolBox) {
  <span class="hljs-built_in">console</span>.log(item)
}

<span class="hljs-comment">// Hammer</span>
<span class="hljs-comment">// Screwdriver</span>
<span class="hljs-comment">// Ruler</span></code></pre>
<h3 id="articleHeader3">3. Includes() 方法</h3>
<p><code>include()</code>方法被用来检查数集合中是否包含指定元素，如果存在则返回<code>true</code>，否则返回<code>false</code>。记得，他是区分大小写的：如果集合中的这个元素是<code>SCHOOL</code>，但你查询的是<code>school</code>，那么它将会返回<code>false</code>。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>可以构建简单的查询代码块</li>
<li>一种直观的方法来确定元素是否存在</li>
<li>它使用条件语句来修改、过滤等等</li>
<li>代码可读性高</li>
</ul>
<h4>例子：</h4>
<p>假如，无论什么原因，你不知道车库里有什么车，你需要一个系统检查你想要的车在不在车库里。<code>includes()</code>可以拯救你！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const garge = ['BMW', 'AUDI', 'VOLVO'];
const findCar = garge.includes('BMW');
console.log(findCar);

// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> garge = [<span class="hljs-string">'BMW'</span>, <span class="hljs-string">'AUDI'</span>, <span class="hljs-string">'VOLVO'</span>];
<span class="hljs-keyword">const</span> findCar = garge.includes(<span class="hljs-string">'BMW'</span>);
<span class="hljs-built_in">console</span>.log(findCar);

<span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader4">4. Some() 方法</h3>
<p><code>some()</code>方法检查在数组中是否存在某些元素，如果存在返回<code>true</code>否则返回<code>false</code>。这跟<code>includes</code>方法有几分相似，但是参数是一个函数，而不是一个字符串。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>可以确保<strong>某些</strong>项测试通过</li>
<li>用函数执行条件表达式</li>
<li>使你的代码更直观</li>
<li>它非常好用</li>
</ul>
<h4>例子：</h4>
<p>假如你是一个酒吧老板，也不在乎谁进入这家酒吧。但是某些人是不允许进来的，因为他们已经喝了很多酒了。下面分别用ES5和ES6检查他们的不同：</p>
<h4>ES5</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const age = [16, 14, 18];
age.some(function(person) {
  return person >= 18;
});

// Output: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> age = [<span class="hljs-number">16</span>, <span class="hljs-number">14</span>, <span class="hljs-number">18</span>];
age.some(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">person</span>) </span>{
  <span class="hljs-keyword">return</span> person &gt;= <span class="hljs-number">18</span>;
});

<span class="hljs-comment">// Output: true</span></code></pre>
<h4>ES6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const age = [16, 14, 18];
age.some((person) => person >= 18);
// true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> age = [<span class="hljs-number">16</span>, <span class="hljs-number">14</span>, <span class="hljs-number">18</span>];
age.some(<span class="hljs-function">(<span class="hljs-params">person</span>) =&gt;</span> person &gt;= <span class="hljs-number">18</span>);
<span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader5">5. Every() 方法</h3>
<p><code>every()</code>方法遍历数组，检查数组中的每一项是否都可以通过，如果都通过返回<code>true</code>否则返回<code>false</code>。与<code>some()</code>方法概念有些相似。但是每一项都必须通过条件表达式，否则，它会返回<code>false</code>。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>可以确保<strong>所有</strong>项测试通过</li>
<li>可以用函数执行条件表达式</li>
<li>使代码更直观</li>
</ul>
<h4>例子：</h4>
<p>上次你用<code>some()</code>方法让某些未成年学生进了酒吧，有人举报了这事，并且警察逮捕了你。这次你害怕还会发生这样的事情，你将用<code>every()</code>方法确保<strong>每一个</strong>进来酒吧的人都是满足年龄限制的。</p>
<h4>ES5</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const age = [15, 20, 19];
age.every(function(person) {
  return person >= 18;
})

// Output: false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> age = [<span class="hljs-number">15</span>, <span class="hljs-number">20</span>, <span class="hljs-number">19</span>];
age.every(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">person</span>) </span>{
  <span class="hljs-keyword">return</span> person &gt;= <span class="hljs-number">18</span>;
})

<span class="hljs-comment">// Output: false</span></code></pre>
<h4>ES6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const age = [15, 20, 19];
age.every((person)=> person >= 18);
//false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> age = [<span class="hljs-number">15</span>, <span class="hljs-number">20</span>, <span class="hljs-number">19</span>];
age.every(<span class="hljs-function">(<span class="hljs-params">person</span>)=&gt;</span> person &gt;= <span class="hljs-number">18</span>);
<span class="hljs-comment">//false</span>
</code></pre>
<h3 id="articleHeader6">6. Filter() 方法</h3>
<p><code>filter()</code>方法会创建一个包含所有满足条件的元素的新数组。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>可以避免对原始数组的修改</li>
<li>可以让你过滤掉那些你不需要的元素</li>
<li>让你的代码可读性更高</li>
</ul>
<h4>例子：</h4>
<p>假如你只想要大于或者等于30的价格，过滤掉其他价格。</p>
<h4>ES5</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//array
const prices = [25, 30, 15, 55, 40, 10];

prices.filter(function(price){
  return price >= 30;
})

// Output:&nbsp;[30, 55, 40]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//array</span>
<span class="hljs-keyword">const</span> prices = [<span class="hljs-number">25</span>, <span class="hljs-number">30</span>, <span class="hljs-number">15</span>, <span class="hljs-number">55</span>, <span class="hljs-number">40</span>, <span class="hljs-number">10</span>];

prices.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">price</span>)</span>{
  <span class="hljs-keyword">return</span> price &gt;= <span class="hljs-number">30</span>;
})

<span class="hljs-comment">// Output:&nbsp;[30, 55, 40]</span></code></pre>
<h4>ES6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const prices = [25, 30, 15, 55, 40, 10];
prices.filter((price) => price >= 30);
// [30, 55, 40]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> prices = [<span class="hljs-number">25</span>, <span class="hljs-number">30</span>, <span class="hljs-number">15</span>, <span class="hljs-number">55</span>, <span class="hljs-number">40</span>, <span class="hljs-number">10</span>];
prices.filter(<span class="hljs-function">(<span class="hljs-params">price</span>) =&gt;</span> price &gt;= <span class="hljs-number">30</span>);
<span class="hljs-comment">// [30, 55, 40]</span></code></pre>
<h3 id="articleHeader7">7. Map() 方法</h3>
<p><code>map()</code>方法跟<code>filter()</code>方法想似，也是会返回一个新数组。但是，唯一的区别是它用于修改数组中的元素。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>可以避免对原始数组的修改</li>
<li>可以修改你想修改的元素</li>
<li>代码可读性更高</li>
</ul>
<h4>例子：</h4>
<p>假如你有一个商品的价格列表，你的经理要展示一个被征收25%的税之前的价格列表。<code>map()</code>方法可以帮你实现它。</p>
<h4>ES5</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const productPriceList = [200, 356, 1500, 5000];
productPriceList.map(function(item){
  return item * 0.75;
})
//&nbsp;[150, 267, 1125, 3750]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> productPriceList = [<span class="hljs-number">200</span>, <span class="hljs-number">356</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">5000</span>];
productPriceList.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
  <span class="hljs-keyword">return</span> item * <span class="hljs-number">0.75</span>;
})
<span class="hljs-comment">//&nbsp;[150, 267, 1125, 3750]</span>
</code></pre>
<h4>ES6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const productPriceList = [200, 356, 1500, 5000];
productPriceList.map((item) => item * 0.75);
//&nbsp;[150, 267, 1125, 3750]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> productPriceList = [<span class="hljs-number">200</span>, <span class="hljs-number">356</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">5000</span>];
productPriceList.map(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item * <span class="hljs-number">0.75</span>);
<span class="hljs-comment">//&nbsp;[150, 267, 1125, 3750]</span>
</code></pre>
<h3 id="articleHeader8">8. Reduce() 方法</h3>
<p><code>reduce()</code>方法用来把一个数组转化为一个int值，一个对象，一个promises串（顺序执行的promises）等等。实际上，一个简单的用例就是对一系列int值求和。简单来说，它就是把数组中的所有值最终"缩短"为一个值。</p>
<h4>为什么我应该用它？</h4>
<ul>
<li>合并计算为一个值</li>
<li>重复执行计算</li>
<li>把对象按照属性分组</li>
<li>顺序执行promises代码块</li>
<li>一种快速的执行运算函数的方式</li>
</ul>
<h4>例子：</h4>
<p>假如你想得到这一周的消费总和，<code>reduce()</code>可以帮你实。</p>
<h4>ES5</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const weeklyExpenses = [200, 350, 1500, 5000, 450, 680, 350]
weeklyExpenses.reduce(function(first, last) {
  return first + last;
})
// 8530" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const weeklyExpenses = [<span class="hljs-number">200</span>, <span class="hljs-number">350</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">5000</span>, <span class="hljs-number">450</span>, <span class="hljs-number">680</span>, <span class="hljs-number">350</span>]
weeklyExpenses.reduce(function(first, last) {
  return first + last;
})
<span class="hljs-comment">// 8530</span></code></pre>
<h4>ES6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const weeklyExpenses = [200, 350, 1500, 5000, 450, 680, 350]
weeklyExpenses.reduce((first, last) => first + last);
// 8530" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const weeklyExpenses = [<span class="hljs-number">200</span>, <span class="hljs-number">350</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">5000</span>, <span class="hljs-number">450</span>, <span class="hljs-number">680</span>, <span class="hljs-number">350</span>]
weeklyExpenses.reduce((first, last) =&gt; first + last);
<span class="hljs-comment">// 8530</span></code></pre>
<p>原文链接：<a href="https://medium.freecodecamp.org/7-javascript-methods-that-will-boost-your-skills-in-less-than-8-minutes-4cc4c3dca03f" rel="nofollow noreferrer" target="_blank">These JavaScript methods will boost your skills in just a few minutes</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
这些JavaScript方法将会在几分钟内提高你的技能

## 原文链接
[https://segmentfault.com/a/1190000014913511](https://segmentfault.com/a/1190000014913511)

