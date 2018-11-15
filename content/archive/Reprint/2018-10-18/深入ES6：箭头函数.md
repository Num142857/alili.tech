---
title: 深入ES6：箭头函数
reprint: true
categories: reprint
abbrlink: 87f6ebe4
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>箭头从一开始就一直是JavaScript的一部分。第一个JavaScript教程建议在HTML注释中包装内联脚本。这会阻止不支持JS的浏览器错误地将JS代码显示为文本。你会写这样的东西：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">language</span>=<span class="hljs-string">"javascript"</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>旧的浏览器会看到两个不支持的标签和评论;只有新的浏览器会看到JS代码。</p>
<p>为了支持这种奇怪的黑客攻击，浏览器中的JavaScript引擎对待这些字符也表示单行注释。奇怪的是，而在HTML中 - &gt;之前的字符是注释，在JS中， - &gt;之后的其余部分是注释。</p>
<p>只有当它出现在一行的开头时，此箭头才表示注释。这是因为在其他情况下， - &gt;是JS中的运算符，“递减至”运算符！</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countdown</span><span class="hljs-params">(n)</span> </span>{
  <span class="hljs-keyword">while</span> (n --&gt; <span class="hljs-number">0</span>)  <span class="hljs-comment">// "n goes to zero"</span>
    alert(n);
  blastoff();
}

</code></pre><p>循环运行直到n变为0.这也不是ES6中的一项新功能，而是熟悉的功能的组合。你能弄清楚这里发生了什么吗？像往常一样，这个难题的答案可以在<a href="http://stackoverflow.com/questions/1642028/what-is-the-name-of-the-operator">StackOverflow</a>中找到.。</p>
<p>当然也有小于或等于运算符，&lt;=。也许你可以在你的JS代码中找到更多箭头。</p>
<h3>函数表达式无处不在</h3>
<p>JavaScript的一个有趣功能是，只要您需要某个功能，您就可以在运行代码的中间直接键入该功能。</p>
<p>例如，假设你试图告诉浏览器当用户点击一个特定的按钮时该做什么。你开始输入：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash">(<span class="hljs-string">"#confetti-btn"</span>).click()</span>

</code></pre><p>jQuery的.click（）方法有一个参数：function。没问题。你可以在这里输入一个函数：</p>
<pre><code class="hljs javascript">$(<span class="hljs-string">"#confetti-btn"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  playTrumpet();
  fireConfettiCannon();
});

</code></pre><p>像这样编写代码现在对我们来说很自然。所以很奇怪，在JavaScript推广这种编程之前，许多语言都没有这个功能。当然，Lisp在1958年有函数表达式，也称为lambda函数。但是C ++，Python，C＃和Java都存在多年，没有它们。</p>
<h3>令人震惊的箭头函数</h3>
<p>ES6引入了写入函数的新语法。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// ES5</span>
<span class="hljs-keyword">var</span> selected = allJobs.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">job</span>) </span>{
  <span class="hljs-keyword">return</span> job.isSelected();
});

<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">var</span> selected = allJobs.filter(<span class="hljs-function"><span class="hljs-params">job</span> =&gt;</span> job.isSelected());

</code></pre><p>当你只需要一个带有一个参数的简单函数时，新的箭头函数语法就是<em>Identifier =&gt; Expression</em>。你可以跳过键入function并返回，以及一些括号，大括号和分号。</p>
<p>要用多个参数（或者没有参数，或者其他<a href="https://hacks.mozilla.org/2015/05/es6-in-depth-rest-parameters-and-defaults/">参数或者默认值</a>，或者一个<a href="https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/">解构参数</a> ）来编写一个函数，你需要在参数列表中添加括号。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// ES5</span>
<span class="hljs-keyword">var</span> total = values.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b;
}, <span class="hljs-number">0</span>);

<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">var</span> total = values.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);

</code></pre><p>我觉得它看起来不错。</p>
<p>那么没有如此功能的设置呢？箭头函数可以包含一个语句块，而不仅仅是一个表达式。回想一下我们之前的例子：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// ES5</span>
$(<span class="hljs-string">"#confetti-btn"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  playTrumpet();
  fireConfettiCannon();
});

</code></pre><p>以下是ES6的写法：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// ES6</span>
$(<span class="hljs-string">"#confetti-btn"</span>).click(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  playTrumpet();
  fireConfettiCannon();
});

</code></pre><p>请注意，具有块体的箭头函数不会自动返回值。为此使用返回语句。</p>
<p>使用箭头函数创建简单对象时有一个警告。所以需要始终用圆括号包装对象：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// create a new empty object for each puppy to play with</span>
<span class="hljs-keyword">var</span> chewToys = puppies.map(<span class="hljs-function"><span class="hljs-params">puppy</span> =&gt;</span> {});   <span class="hljs-comment">// BUG!</span>
<span class="hljs-keyword">var</span> chewToys = puppies.map(<span class="hljs-function"><span class="hljs-params">puppy</span> =&gt;</span> ({})); <span class="hljs-comment">// ok</span>

</code></pre><p>不幸的是，空对象{}和空块{}看起来完全一样。 ES6中的规则是{紧跟在箭头后面总是被视为块的开始，而不是对象的开始。代码<em>puppy =&gt; {}</em>因此被默默地解释为一个不执行任何操作并返回未定义的箭头函数。</p>
<p>更令人困惑的是，像{key：value}这样的对象文字看起来就像一个包含标签语句的块 - 至少，这就是它对JavaScript引擎的外观。幸运的是 "{ " 是唯一不明确的字符，所以用圆括号包装对象文字是你需要记住的唯一技巧。</p>
<h3>关于this</h3>
<p>普通函数函数和箭头函数之间的行为有一个细微的差别：箭头函数内部的this是词法作用域，由上下文确定</p>
<p>在我们试图找出实际意义之前，让我们稍微回顾一下。</p>
<p>让我们看看下面这个例子：</p>
<pre><code class="hljs clojure">{
  ...
  addAll: function addAll(<span class="hljs-name">pieces</span>) {
    var self = this; // 如果不使用,this指向window或undefined
    _.each(<span class="hljs-name">pieces</span>, function (<span class="hljs-name">piece</span>) {
      self.add(<span class="hljs-name">piece</span>)<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
  },
  ...
}

</code></pre><p>在这里，你想在内部函数中使用this.add（piece）。所以，临时变量self用于将"this"外部值偷运到内部函数中。 （另一种方法是在内部函数中使用.bind（this），这两种方法都不是特别漂亮。）</p>
<pre><code class="hljs typescript"><span class="hljs-comment">// ES6</span>
{
  ...
  addAll: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addAll</span>(<span class="hljs-params">pieces</span>) </span>{
    _.each(pieces, <span class="hljs-function"><span class="hljs-params">piece</span> =&gt;</span> <span class="hljs-keyword">this</span>.add(piece));
  },
  ...
}

</code></pre><p>在ES6版本中，请注意addAll方法从其调用者接收到此信息。内部函数是一个箭头函数，所以它从封闭范围继承此函数。</p>
<p>ES6还提供了一种在对象文字中编写方法的更简便方法！所以上面的代码可以进一步简化：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-string">//</span> ES6 with method syntax
{
  <span class="hljs-string">...</span>
  addAll<span class="hljs-params">(pieces)</span> {
    _.each<span class="hljs-params">(pieces, <span class="hljs-attr">piece</span> =&gt; this.add(piece)</span>);
  },
  <span class="hljs-string">...</span>
}

</code></pre><p>在方法和箭头之间，我可能再也不会输入“function”了。</p>
<h3>我什么时候可以使用箭头？</h3>
<p>2013年，我通过Firefox实现了ES6箭头功能.Jan de Mooij让他们快速完成工作。感谢Tooru Fujisawa和ziyunfei的补丁。</p>
<p>箭头函数也在Microsoft Edge预览版中实现。如果您有兴趣在Web上使用它们，它们也可以在<a href="http://babeljs.io/">Babel</a>，<a href="https://github.com/google/traceur-compiler#what-is-traceur">Traceur</a>, 和 <a href="http://www.typescriptlang.org/">TypeScript</a>中使用。</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/es6-in-depth-arrow-functions-mozilla-hacks-the-web-developer-blog](https://www.zcfy.cc/article/es6-in-depth-arrow-functions-mozilla-hacks-the-web-developer-blog)
原文标题: 深入ES6：箭头函数
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
