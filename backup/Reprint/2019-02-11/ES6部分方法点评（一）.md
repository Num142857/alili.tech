---
title: 'ES6部分方法点评（一）' 
date: 2019-02-11 2:30:49
hidden: true
slug: b9m062uch3f
categories: [reprint]
---

{{< raw >}}

                    
<p>一直以来，我对ES6都不甚感兴趣，一是因为在生产环境中使用ES5已是处处碰壁，其次则是只当这ES6是语法糖不曾重视。<br>只是最近学习react生态，用起babel来转换jsx之余，也不免碰到诸多用上ES6的教程、案例，因此便稍作学习。这一学习，便觉得这语法糖实在是甜，忍不住尝鲜，于是记录部分自觉对自己有用的方法在此。</p>
<h2 id="articleHeader0">箭头函数(Arrow Functions)</h2>
<p>箭头函数是一个典型的语法糖，即创造了一种新语法来简化javascript中函数的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
var selected = allJobs.filter(function (job) {
  return job.isSelected();
});
// ES6
var selected = allJobs.filter(job => job.isSelected());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES5</span>
<span class="hljs-keyword">var</span> selected = allJobs.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">job</span>) </span>{
  <span class="hljs-keyword">return</span> job.isSelected();
});
<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">var</span> selected = allJobs.filter(<span class="hljs-function"><span class="hljs-params">job</span> =&gt;</span> job.isSelected());
</code></pre>
<p>上面这是函数只有一个形参的情况，下面列举函数有多个形参的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
var total = values.reduce(function (a, b) {
  return a + b;
}, 0);
// ES6
var total = values.reduce((a, b) => a + b, 0);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES5</span>
<span class="hljs-keyword">var</span> total = values.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
}, <span class="hljs-number">0</span>);
<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">var</span> total = values.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);
</code></pre>
<p>语法大体是这样：([函数的形参，多个参数则以逗号分隔]) =&gt; [函数返回的值/表达式]<br>另外，箭头函数也可以使用<code>{}</code>来引入函数块语句，不过这样的话其实就只是简写了<code>function</code>这一个单词了，意义不是很大，下面放个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
$(&quot;#confetti-btn&quot;).click(function (event) {
  playTrumpet();
  fireConfettiCannon();
});
// ES6
$(&quot;#confetti-btn&quot;).click(event => {
  playTrumpet();
  fireConfettiCannon();
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES5</span>
$(<span class="hljs-string">"#confetti-btn"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  playTrumpet();
  fireConfettiCannon();
});
<span class="hljs-comment">// ES6</span>
$(<span class="hljs-string">"#confetti-btn"</span>).click(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  playTrumpet();
  fireConfettiCannon();
});
</code></pre>
<p>对我来说，简写并不吸引我，吸引我的，是箭头函数的一个重要特性：<strong>箭头函数没有它自己的this值，箭头函数内的this值继承自外围作用域。</strong></p>
<hr>
<p>2016-05-31修改： <code>@n͛i͛g͛h͛t͛i͛r͛e͛</code>同学指出</p>
<blockquote>arrow function 不是“没有自己的 this”，而是绑定了定义时的 context；这一特性等价于以前的<br>Function.prototype.bind</blockquote>
<p>我翻查了一下MDN，里面是这么写的：</p>
<blockquote>箭头函数则会捕获其所在上下文的  this 值，作为自己的 this 值。</blockquote>
<p>因此，<code>@n͛i͛g͛h͛t͛i͛r͛e͛</code>同学的说法是有理的。</p>
<hr>
<p>这在编写回调函数的时候就非常好用了，我们再也不需要利用闭包来保存this了（尤其是，很容易忘记保存this而直接在回调函数里用了this）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  add: function(piece) {},
  ...
  addAll: function addAll(pieces) {
    var self = this;
    _.each(pieces, function (piece) {
      self.add(piece);
    });
  },
  ...
}

// ES6
{
  add: function(piece) {},
  ...
  addAll: function addAll(pieces) {
    _.each(pieces, piece => this.add(piece));
  },
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>{
  add: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(piece)</span> </span>{},
  ...
  addAll: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addAll</span><span class="hljs-params">(pieces)</span> </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;
    _.each(pieces, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(piece)</span> </span>{
      <span class="hljs-keyword">self</span>.add(piece);
    });
  },
  ...
}

<span class="hljs-comment">// ES6</span>
{
  add: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(piece)</span> </span>{},
  ...
  addAll: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addAll</span><span class="hljs-params">(pieces)</span> </span>{
    _.each(pieces, piece =&gt; this.add(piece));
  },
  ...
}
</code></pre>
<h2 id="articleHeader1">let</h2>
<p>自ES6中<code>let</code>的出现，javascript终于迎来了块级作用域（{}、for、if）。</p>
<hr>
<p>2016-05-31修改：<br>此处表达有误，应为：自ES6，javascript开始拥有块级作用域，而<code>let</code>则是配合块级作用域，作为替代<code>var</code>的一个语法定义。</p>
<hr>
<p>有了块级作用域，再也不用担心临时变量污染到外层的变量了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> n = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">let</span> n = <span class="hljs-number">10</span>;
  }
  <span class="hljs-built_in">console</span>.log(n); <span class="hljs-comment">// 5</span>
}
</code></pre>
<h2 id="articleHeader2">const</h2>
<p><code>const</code>是用来定义常量的，一旦定义了就不可修改（一修改就报错）。用途嘛，也比较单一，就是定义一下配置项什么的，免得被团队里的愣头青写的代码给瞎改了。</p>
<hr>
<p>2016-05-31修改 <code>@n͛i͛g͛h͛t͛i͛r͛e͛</code>同学提出一个“命名绑定”的概念，并举出一个相应的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = {};
config.env = 'development';  // 这不会报错

config = {};  // 这才会报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> config = {};
config.env = <span class="hljs-string">'development'</span>;  <span class="hljs-comment">// 这不会报错</span>

config = {};  <span class="hljs-comment">// 这才会报错</span></code></pre>
<p>请恕我才疏学浅，尚不能理解“命名绑定”呀、函数式编程之类的。我对上面这个例子的理解是，config只是一个object的引用，无论这个object本身怎么变化，只要config这个变量的“指向”没变化，那就不会报错。</p>
<hr>
<h2 id="articleHeader3">destructuring</h2>
<blockquote>
<p>destructuring是解构的意思，ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。来两个例子看看大家就明白了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

// 数组的解构赋值
let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo); // 1
console.log(bar); // 2
console.log(baz); // 3

// 对象的解构赋值
var { foo, bar } = { foo: &quot;aaa&quot;, bar: &quot;bbb&quot; };
console.log(foo);   // &quot;aaa&quot;
console.log(bar );  // &quot;bbb&quot;

// 字符串的解构赋值
const [a, b, c, d, e] = 'hello';
console.log(a + b + c + e); // 'hello'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// 数组的解构赋值</span>
<span class="hljs-keyword">let</span> [foo, [[bar], baz]] = [<span class="hljs-number">1</span>, [[<span class="hljs-number">2</span>], <span class="hljs-number">3</span>]];
<span class="hljs-built_in">console</span>.log(foo); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(bar); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(baz); <span class="hljs-comment">// 3</span>

<span class="hljs-comment">// 对象的解构赋值</span>
<span class="hljs-keyword">var</span> { foo, bar } = { <span class="hljs-attr">foo</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">"bbb"</span> };
<span class="hljs-built_in">console</span>.log(foo);   <span class="hljs-comment">// "aaa"</span>
<span class="hljs-built_in">console</span>.log(bar );  <span class="hljs-comment">// "bbb"</span>

<span class="hljs-comment">// 字符串的解构赋值</span>
<span class="hljs-keyword">const</span> [a, b, c, d, e] = <span class="hljs-string">'hello'</span>;
<span class="hljs-built_in">console</span>.log(a + b + c + e); <span class="hljs-comment">// 'hello'</span></code></pre>
</blockquote>
<p>跟箭头函数一样，也是个语法糖，那这是用在什么地方呢？请不要着急，听我细细道来：<br>在我们封装函数的时候，如果形参较多，为了使用者不需要按顺序来传入参数，往往用一个object来承载所有的参数，例如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 二逼青年写法
function study(id, name, sex, grade, nickname, age, address) {
    console.log(id);
    console.log(name);
    console.log(sex);
    console.log(grade);
    console.log(nickname);
    console.log(age);
    console.log(address);
}
// 正常青年写法
function study(params) {
    console.log(params.id);
    console.log(params.name);
    console.log(params.sex);
    console.log(params.grade);
    console.log(params.nickname);
    console.log(params.age);
    console.log(params.address);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// 二逼青年写法</span>
function study(id, <span class="hljs-built_in">name</span>, sex, grade, nickname, age, address) {
    console.<span class="hljs-built_in">log</span>(id);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);
    console.<span class="hljs-built_in">log</span>(sex);
    console.<span class="hljs-built_in">log</span>(grade);
    console.<span class="hljs-built_in">log</span>(nickname);
    console.<span class="hljs-built_in">log</span>(age);
    console.<span class="hljs-built_in">log</span>(address);
}
<span class="hljs-comment">// 正常青年写法</span>
function study(<span class="hljs-built_in">params</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.id);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.<span class="hljs-built_in">name</span>);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.sex);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.grade);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.nickname);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.age);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">params</span>.address);
}</code></pre>
<p>这种做法，虽说使用者是方便了，但写函数的人却麻烦了，每次用参数都要带上<code>params.</code>，或者再写个<code>var id = params.id</code>来让后续的使用方便一些。<br>然而，有了<code>destructuring</code>后，我们有了更方便的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function study({id, name, sex, grade, nickname, age, address}) {
    console.log(id);
    console.log(name);
    console.log(sex);
    console.log(grade);
    console.log(nickname);
    console.log(age);
    console.log(address);    
}
study({
    id: 1,
    name: '林有德',
    sex: '男',
    grade: '一年级',
    nickname: '布莱德',
    age: 12,
    address: '木马号'
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">study</span>({<span class="hljs-selector-tag">id</span>, <span class="hljs-selector-tag">name</span>, <span class="hljs-selector-tag">sex</span>, <span class="hljs-selector-tag">grade</span>, <span class="hljs-selector-tag">nickname</span>, <span class="hljs-selector-tag">age</span>, <span class="hljs-selector-tag">address</span>}) {
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(id);
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(name);
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(sex);
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(grade);
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(nickname);
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(age);
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(address);    
}
<span class="hljs-selector-tag">study</span>({
    <span class="hljs-attribute">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'林有德'</span>,
    <span class="hljs-attribute">sex</span>: <span class="hljs-string">'男'</span>,
    <span class="hljs-attribute">grade</span>: <span class="hljs-string">'一年级'</span>,
    <span class="hljs-attribute">nickname</span>: <span class="hljs-string">'布莱德'</span>,
    <span class="hljs-attribute">age</span>: <span class="hljs-number">12</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'木马号'</span>
});
</code></pre>
<p>这样一来，使用者用起来很方便，而函数内部又直接解构赋值到各变量上，用起来也方便多了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6部分方法点评（一）

## 原文链接
[https://segmentfault.com/a/1190000005042668](https://segmentfault.com/a/1190000005042668)

