---
title: ECMAScript正则表达式6个最新特性
reprint: true
categories: reprint
abbrlink: e54a5961
date: 2018-10-22 00:00:00
---

{{% raw %}}

                    
<p><strong>译者按：</strong> 还没学好ES6？ECMAScript 2018已经到来啦！</p>
<ul>
<li>
<strong>原文</strong>：<a href="https://mathiasbynens.be/notes/es-regexp-proposals" rel="nofollow noreferrer" target="_blank">ECMAScript regular expressions are getting better!</a>
</li>
<li>
<strong>作者</strong>: <a href="https://github.com/mathiasbynens" rel="nofollow noreferrer" target="_blank">Mathias Bynens</a>: Google V8引擎开发者</li>
<li>
<strong>译者</strong>：<a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p>1999年，ECMAScript 3添加了对正则表达式的支持。</p>
<p>16年之后，ECMAScript 6(即ECMAScript 2015或者ES6)引入了<a href="https://mathiasbynens.be/notes/es6-unicode-regex" rel="nofollow noreferrer" target="_blank">Unicode模式(u选项)</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky#Description" rel="nofollow noreferrer" target="_blank">sticky模式(y选项)</a>以及<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags" rel="nofollow noreferrer" target="_blank">RegExp.prototype.flags的getter方法</a>。</p>
<p>这篇博客将介绍ECMAScript正则表达式的最新<strong>特性</strong>：</p>
<ul>
<li><a href="https://mathiasbynens.be/notes/es-regexp-proposals#dotAll" rel="nofollow noreferrer" target="_blank">dotAll模式(s选项)</a></li>
<li><a href="https://mathiasbynens.be/notes/es-regexp-proposals#lookbehinds" rel="nofollow noreferrer" target="_blank">Lookbehind断言</a></li>
<li><a href="https://mathiasbynens.be/notes/es-regexp-proposals#named-capture-groups" rel="nofollow noreferrer" target="_blank">Named capture groups</a></li>
<li><a href="https://mathiasbynens.be/notes/es-regexp-proposals#unicode-property-escapes" rel="nofollow noreferrer" target="_blank">Unicode property escapes</a></li>
<li><a href="https://mathiasbynens.be/notes/es-regexp-proposals#matchAll" rel="nofollow noreferrer" target="_blank">String.prototype.matchAll</a></li>
<li><a href="https://mathiasbynens.be/notes/es-regexp-proposals#legacy" rel="nofollow noreferrer" target="_blank">规范RegExp遗留特性</a></li>
</ul>
<h3 id="articleHeader0">1. dotAll模式(s选项)</h3>
<blockquote>这个特性已经在ECMAScript 2018正式发布了。</blockquote>
<p>默认情况下，<code>.</code>可以匹配任意字符，除了换行符:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/foo.bar/u.test('foo\nbar'); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/foo.bar/u.test(<span class="hljs-string">'foo\nbar'</span>); <span class="hljs-comment">// false</span></code></pre>
<p>另外，<code>.</code>不能匹配Unicode字符，需要使用<code>u</code>选项启用Unicode模式才行。</p>
<p>ES2018引入了<a href="https://github.com/tc39/proposal-regexp-dotall-flag" rel="nofollow noreferrer" target="_blank">dotAll模式</a>，通过<code>s</code>选项可以启用，这样，<code>.</code>就可以匹配换行符了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/foo.bar/su.test('foo\nbar'); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/foo.bar/su.test(<span class="hljs-string">'foo\nbar'</span>); <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader1">2. Lookbehind断言</h3>
<blockquote>这个特性已经在ECMAScript 2018正式发布了。</blockquote>
<p>ECMAScript目前仅支持lookahead断言。</p>
<p>下面示例是Positive lookahead，匹配字符串“42 dollars”中紧跟着是"dollars"的数字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pattern = /\d+(?= dollars)/u;
const result = pattern.exec('42 dollars');
console.log(result[0]); // 打印42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pattern = <span class="hljs-regexp">/\d+(?= dollars)/u</span>;
<span class="hljs-keyword">const</span> result = pattern.exec(<span class="hljs-string">'42 dollars'</span>);
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]); <span class="hljs-comment">// 打印42</span></code></pre>
<p>下面示例是Negative lookahead，匹配字符串“42 pesos”中紧跟着的不是"dollars"的数字:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pattern = /\d+(?! dollars)/u;
const result = pattern.exec('42 pesos');
console.log(result[0]); // 打印42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pattern = <span class="hljs-regexp">/\d+(?! dollars)/u</span>;
<span class="hljs-keyword">const</span> result = pattern.exec(<span class="hljs-string">'42 pesos'</span>);
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]); <span class="hljs-comment">// 打印42</span></code></pre>
<p>ES2018添加了<a href="https://github.com/tc39/proposal-regexp-lookbehind" rel="nofollow noreferrer" target="_blank">lookbehind断言</a>。</p>
<p>下面示例是Positive lookbehind，匹配字符串“$42”中前面是"\$"的数字:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pattern = /(?<=\$)\d+/u;
const result = pattern.exec('$42');
console.log(result[0]); // 打印42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pattern = <span class="hljs-regexp">/(?&lt;=\$)\d+/u</span>;
<span class="hljs-keyword">const</span> result = pattern.exec(<span class="hljs-string">'$42'</span>);
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]); <span class="hljs-comment">// 打印42</span></code></pre>
<p>下面示例是Negative lookbehind，匹配字符串“$42”中前面不是是"\$"的数字:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pattern = /(?<!\$)\d+/u;
const result = pattern.exec('€42');
console.log(result[0]); // 打印42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pattern = <span class="hljs-regexp">/(?&lt;!\$)\d+/u</span>;
<span class="hljs-keyword">const</span> result = pattern.exec(<span class="hljs-string">'€42'</span>);
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]); <span class="hljs-comment">// 打印42</span></code></pre>
<p><em><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于网页、微信小程序、微信小游戏，支付宝小程序，React Native，Node.js和Java线上BUG实时监控，欢迎免费试用</em></p>
<h3 id="articleHeader2">3. Named capture groups</h3>
<blockquote>这个特性已经在ECMAScript 2018正式发布了。</blockquote>
<p>目前，正则表达式中小括号匹配的分组是通过数字编号的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pattern = /(\d{4})-(\d{2})-(\d{2})/u;
const result = pattern.exec('2017-01-25');
console.log(result[0]); // 打印&quot;2017-01-25&quot;
console.log(result[1]); // 打印&quot;2017&quot;
console.log(result[2]); // 打印&quot;01&quot;
console.log(result[3]); // 打印&quot;25&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pattern = <span class="hljs-regexp">/(\d{4})-(\d{2})-(\d{2})/u</span>;
<span class="hljs-keyword">const</span> result = pattern.exec(<span class="hljs-string">'2017-01-25'</span>);
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]); <span class="hljs-comment">// 打印"2017-01-25"</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">1</span>]); <span class="hljs-comment">// 打印"2017"</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">2</span>]); <span class="hljs-comment">// 打印"01"</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">3</span>]); <span class="hljs-comment">// 打印"25"</span></code></pre>
<p>这样很方便，但是可读性很差，且不易维护。一旦正则表达式中小括号的顺序有变化时，我们就需要更新对应的数字编号。</p>
<p>ES2018添加<a href="https://github.com/tc39/proposal-regexp-named-groups" rel="nofollow noreferrer" target="_blank">named capture groups</a>, 可以指定小括号中匹配内容的名称，这样可以提高代码的可读性，也便于维护。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
const result = pattern.exec('2017-01-25');
console.log(result.groups.year); // 打印&quot;2017&quot;
console.log(result.groups.month); // 打印&quot;01&quot;
console.log(result.groups.day); // 打印&quot;25&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> pattern = <span class="hljs-regexp">/(?&lt;year&gt;\d{4})-(?&lt;month&gt;\d{2})-(?&lt;day&gt;\d{2})/u</span>;
<span class="hljs-keyword">const</span> result = pattern.exec(<span class="hljs-string">'2017-01-25'</span>);
<span class="hljs-built_in">console</span>.log(result.groups.year); <span class="hljs-comment">// 打印"2017"</span>
<span class="hljs-built_in">console</span>.log(result.groups.month); <span class="hljs-comment">// 打印"01"</span>
<span class="hljs-built_in">console</span>.log(result.groups.day); <span class="hljs-comment">// 打印"25"</span></code></pre>
<h3 id="articleHeader3">4. Unicode property escapes</h3>
<blockquote>这个特性已经在ECMAScript 2018正式发布了。</blockquote>
<p>Unicode标准为每一个字符分配了多个属性。比如，当你要匹配希腊语字符时，则可以搜索Script_Extensions属性为Greek的字符。</p>
<p><a href="https://mathiasbynens.be/notes/es-unicode-property-escapes" rel="nofollow noreferrer" target="_blank">Unicode property escapes</a>使得我们可以使用ECMAScript正则表达式直接匹配Unicode字符的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const regexGreekSymbol = /\p{Script_Extensions=Greek}/u;
console.log(regexGreekSymbol.test('π')); // 打印true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> regexGreekSymbol = <span class="hljs-regexp">/\p{Script_Extensions=Greek}/u</span>;
<span class="hljs-built_in">console</span>.log(regexGreekSymbol.test(<span class="hljs-string">'π'</span>)); <span class="hljs-comment">// 打印true</span></code></pre>
<h3 id="articleHeader4">5. String.prototype.matchAll</h3>
<blockquote>这个特性还处在Stage 3 Draft</blockquote>
<p>g和y选项通常用于匹配一个字符串，然后遍历所有匹配的子串，包括小括号匹配的分组。<a href="https://github.com/tc39/proposal-string-matchall" rel="nofollow noreferrer" target="_blank">String.prototype.matchAll</a>让这个操作变得更加简单了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const string = 'Magic hex numbers: DEADBEEF CAFE 8BADF00D';
const regex = /\b[0-9a-fA-F]+\b/g;
for (const match of string.matchAll(regex)) {
    console.log(match);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> string = <span class="hljs-string">'Magic hex numbers: DEADBEEF CAFE 8BADF00D'</span>;
<span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/\b[0-9a-fA-F]+\b/g</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> match <span class="hljs-keyword">of</span> string.matchAll(regex)) {
    <span class="hljs-built_in">console</span>.log(match);
}</code></pre>
<p>每一个迭代所返回的match对象与regex.exec(string)所返回的结果相同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Iteration 1:
[
    'DEADBEEF',
    index: 19,
    input: 'Magic hex numbers: DEADBEEF CAFE 8BADF00D'
]

// Iteration 2:
[
    'CAFE',
    index: 28,
    input: 'Magic hex numbers: DEADBEEF CAFE 8BADF00D'
]

// Iteration 3:
[
    '8BADF00D',
    index: 33,
    input: 'Magic hex numbers: DEADBEEF CAFE 8BADF00D'
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Iteration 1:</span>
[
    <span class="hljs-string">'DEADBEEF'</span>,
    <span class="hljs-attr">index</span>: <span class="hljs-number">19</span>,
    <span class="hljs-attr">input</span>: <span class="hljs-string">'Magic hex numbers: DEADBEEF CAFE 8BADF00D'</span>
]

<span class="hljs-comment">// Iteration 2:</span>
[
    <span class="hljs-string">'CAFE'</span>,
    <span class="hljs-attr">index</span>: <span class="hljs-number">28</span>,
    <span class="hljs-attr">input</span>: <span class="hljs-string">'Magic hex numbers: DEADBEEF CAFE 8BADF00D'</span>
]

<span class="hljs-comment">// Iteration 3:</span>
[
    <span class="hljs-string">'8BADF00D'</span>,
    <span class="hljs-attr">index</span>: <span class="hljs-number">33</span>,
    <span class="hljs-attr">input</span>: <span class="hljs-string">'Magic hex numbers: DEADBEEF CAFE 8BADF00D'</span>
]</code></pre>
<p>注意，这个特性还处在<a href="https://tc39.github.io/proposal-string-matchall/" rel="nofollow noreferrer" target="_blank">Stage 3 Draft</a>，因此还存在变化的可能性，示例代码是根据最新的提案写的。另外，浏览器也还没有支持这个特性。String.prototype.matchAll最快可以被加入到ECMAScript 2019中。</p>
<h3 id="articleHeader5">6. 规范RegExp遗留特性</h3>
<blockquote>这个提案还处在Stage 3 Draft</blockquote>
<p>这个提案<a href="https://github.com/tc39/proposal-regexp-legacy-features" rel="nofollow noreferrer" target="_blank">规范了RegExp的遗留特性</a>，比如<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile" rel="nofollow noreferrer" target="_blank">RegExp.prototype.compile</a>方法以及它的静态属性从<strong>RegExp.&amp;dollar;1</strong>到<strong>RegExp.&amp;dollar;9</strong>。虽然这些特性已经弃用(deprecated)了，但是为了兼容性我们不能将他们去。因此，规范这些RegExp遗留特性是最好的方法。因此，这个提案有助于保证兼容性。</p>
<h3 id="articleHeader6">参考</h3>
<ul>
<li><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">阮一峰 - ECMAScript 6 入门</a></li>
<li><a href="https://blog.fundebug.com/2018/05/02/advanced_regular_expression/" rel="nofollow noreferrer" target="_blank">Fundebug博客 - JavaScript正则表达式进阶指南</a></li>
<li><a href="http://2ality.com/2017/02/ecmascript-2018.html" rel="nofollow noreferrer" target="_blank">ECMAScript 2018: the final feature set</a></li>
</ul>
<h3 id="articleHeader7">关于Fundebug</h3>
<p><a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了6亿+错误事件，得到了Google、360、金山软件等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbhe1G?w=400&amp;h=225" src="https://static.alili.tech/img/bVbhe1G?w=400&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">版权声明</h3>
<p>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2018/08/30/ecmascript-regular-expression-new-features/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2018/08/30/ecmascript-regular-expression-new-features/</a></p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016202186](https://segmentfault.com/a/1190000016202186)

## 原文标题
ECMAScript正则表达式6个最新特性
