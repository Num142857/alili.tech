---
title: 'ES2018 新特征之：正则表达式 dotAll 模式' 
date: 2018-12-11 2:30:10
hidden: true
slug: ilwjcjk2b6n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ES2018 新特性</h2>
<ul>
<li><a href="http://esnext.justjavac.com/proposal/async-iteration.html" rel="nofollow noreferrer" target="_blank">异步迭代器</a></li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-lookbehind.html" rel="nofollow noreferrer" target="_blank">正则表达式反向(lookbehind)断言</a></li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-unicode-property-escapes.html" rel="nofollow noreferrer" target="_blank">正则表达式 Unicode 转义</a></li>
<li><a href="http://esnext.justjavac.com/proposal/template-literal-revision.html" rel="nofollow noreferrer" target="_blank">非转义序列的模板字符串</a></li>
<li>
<strong>正则表达式 s/dotAll 模式</strong>（本文）</li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-named-groups.html" rel="nofollow noreferrer" target="_blank">正则表达式命名捕获组</a></li>
<li><a href="http://esnext.justjavac.com/proposal/object-rest-spread.html" rel="nofollow noreferrer" target="_blank">对象展开运算符</a></li>
<li><a href="http://esnext.justjavac.com/api/Promise.prototype.finally.html" rel="nofollow noreferrer" target="_blank">Promise.prototype.finally</a></li>
</ul>
<hr>
<p>“正则表达式的 <code>s</code> (dotAll) flag” 提案 <a href="https://github.com/tc39/proposal-regexp-dotall-flag" rel="nofollow noreferrer" target="_blank">proposal-regexp-dotall-flag</a> 由 Mathias Bynens 负责，目前已经进入 stage 4，并将成为 ES9(ES2018) 的一部分。</p>
<h2 id="articleHeader1">1. 概述</h2>
<p>在 JavaScript 正则表达式中 <code>.</code> 用来匹配任何单个字符。但是有 2 个例外：</p>
<h3 id="articleHeader2">1.1 多字节 emoji 字符</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let regex = /^.$/;
regex.test('?');   // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> regex = <span class="hljs-regexp">/^.$/</span>;
regex.test(<span class="hljs-string">'?'</span>);   <span class="hljs-comment">// false</span></code></pre>
<p>我们可以通过设置 <code>u</code> 标志来解决，<code>u</code> 的含义是 unicode：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let regex = /^.$/u;
regex.test('?');   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> regex = <span class="hljs-regexp">/^.$/u</span>;
regex.test(<span class="hljs-string">'?'</span>);   <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader3">1.2 行终结符(line terminator characters)</h3>
<p>行终结符包含：</p>
<ul>
<li>U+000A LINE FEED (LF) (<code>\n</code>) - 换行</li>
<li>U+000D CARRIAGE RETURN (CR) (<code>\r</code>) - 回车</li>
<li>U+2028 LINE SEPARATOR - 行分隔符</li>
<li>U+2029 PARAGRAPH SEPARATOR - 段分隔符</li>
</ul>
<p>还有一些其它字符，也可以作为一行的开始：</p>
<ul>
<li>U+000B VERTICAL TAB (<code>\v</code>)</li>
<li>U+000C FORM FEED (<code>\f</code>)</li>
<li>U+0085 NEXT LINE</li>
</ul>
<p>目前 JavaScript 正则表达式的 <code>.</code> 可以匹配其中的一部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let regex = /./;

regex.test('\n');       // false
regex.test('\r');       // false
regex.test('\u{2028}'); // false
regex.test('\u{2029}'); // false

regex.test('\v');       // true
regex.test('\f');       // true
regex.test('\u{0085}'); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> regex = <span class="hljs-regexp">/./</span>;

regex.test(<span class="hljs-string">'\n'</span>);       <span class="hljs-comment">// false</span>
regex.test(<span class="hljs-string">'\r'</span>);       <span class="hljs-comment">// false</span>
regex.test(<span class="hljs-string">'\u{2028}'</span>); <span class="hljs-comment">// false</span>
regex.test(<span class="hljs-string">'\u{2029}'</span>); <span class="hljs-comment">// false</span>

regex.test(<span class="hljs-string">'\v'</span>);       <span class="hljs-comment">// true</span>
regex.test(<span class="hljs-string">'\f'</span>);       <span class="hljs-comment">// true</span>
regex.test(<span class="hljs-string">'\u{0085}'</span>); <span class="hljs-comment">// true</span></code></pre>
<p>在正则表达式中，用于表示字符串开头和字符串结尾的元字符是 <code>^</code> 和 <code>$</code>, 因此一个变通的方式是使用 <code>^</code> 来匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/foo.bar/.test('foo\nbar');     // false
/foo[^]bar/.test('foo\nbar');   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">/foo.bar/.test(<span class="hljs-string">'foo\nbar'</span>);     <span class="hljs-comment">// false</span>
/foo[^]bar/.test(<span class="hljs-string">'foo\nbar'</span>);   <span class="hljs-comment">// true</span></code></pre>
<p>或者使用 <code>\s</code> 来匹配空白字符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/foo.bar/.test('foo\nbar');     // false
/foo[\s]bar/.test('foo\nbar');   // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">/foo.bar/.test(<span class="hljs-string">'foo\nbar'</span>);     <span class="hljs-comment">// false</span>
/foo[\s]bar/.test(<span class="hljs-string">'foo\nbar'</span>);   <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader4">2. 增加 s/dotAll 标志</h2>
<p>在最新的 ECMAScript 规范中，为 JavaScript 的正则表达式增加了一个新的标志 <code>s</code> 用来表示 dotAll。以使 <code>.</code> 可以匹配任意字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/foo.bar/s.test('foo\nbar');    // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">/foo.bar/s.test(<span class="hljs-string">'foo\nbar'</span>);    <span class="hljs-comment">// true</span></code></pre>
<p>High-level API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const re = /foo.bar/s;  //  等价于 const re = new RegExp('foo.bar', 's');
re.test('foo\nbar');    // true
re.dotAll;      // true
re.flags;       // &quot;s&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> re = <span class="hljs-regexp">/foo.bar/</span>s;  <span class="hljs-comment">//  等价于 const re = new RegExp('foo.bar', 's');</span>
re.test(<span class="hljs-string">'foo\nbar'</span>);    <span class="hljs-comment">// true</span>
re.dotAll;      <span class="hljs-comment">// true</span>
re.flags;       <span class="hljs-comment">// "s"</span></code></pre>
<h2 id="articleHeader5">3. 命名由来</h2>
<p>既然是为了实现 dotAll 功能，为什么不命名为 <code>d</code> 或者 <code>a</code>。因为在其它语言的正则表达式实现中，已经使用 <code>s</code> 标志了：</p>
<ul>
<li>Java 使用 <code>Pattern.DOTALL</code>
</li>
<li>C# 和 VB 使用 <code>RegexOptions.Singleline</code>
</li>
<li>Python 同时支持 <code>re.DOTALL</code> 和 <code>re.S</code>
</li>
</ul>
<p>在支持正则表达式使用 flag 的语言如 Perl、PHP 也使用 <code>s</code> 作为标志。</p>
<p><code>s</code> 的含义是 singleline 和 dotAll。</p>
<p>singleline(单行)对应的是 multiline(多行)。</p>
<p><code>m</code> 标志用于指定多行输入字符串应该被视为多个行。如果使用 <code>m</code> 标志，<code>^</code> 和 <code>$</code> 匹配的开始或结束是字符串中的每一行，而不是整个字符串的开始或结束。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/^java/.test('just\njava\n');   // false
/^java/m.test('just\njava\n');  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">/^java/.test(<span class="hljs-string">'just\njava\n'</span>);   <span class="hljs-comment">// false</span>
/^java/m.test(<span class="hljs-string">'just\njava\n'</span>);  <span class="hljs-comment">// true</span></code></pre>
<ul>
<li>
<code>m</code> 标志只影响 <code>^</code> 和 <code>$</code>
</li>
<li>
<code>s</code> 标志只影响 <code>.</code>
</li>
</ul>
<p>目前在 JavaScript 正则表示中所有修饰符的含义：</p>
<ul>
<li>g → global</li>
<li>i → ignoreCase</li>
<li>m → multiline</li>
<li>y → sticky</li>
<li>u → unicode</li>
<li>s → dotAll</li>
</ul>
<h2 id="articleHeader6">4. 实现</h2>
<ul>
<li>
<a href="https://bugs.chromium.org/p/v8/issues/detail?id=6172" rel="nofollow noreferrer" target="_blank">V8</a> - Chrome 62</li>
<li>
<a href="https://bugs.webkit.org/show_bug.cgi?id=172634" rel="nofollow noreferrer" target="_blank">JavaScriptCore</a> - <a href="https://developer.apple.com/safari/technology-preview/release-notes/" rel="nofollow noreferrer" target="_blank">Safari Technology Preview 39a</a>
</li>
<li>
<a href="https://github.com/Moddable-OpenSource/moddable/blob/public/xs/sources/xsre.c" rel="nofollow noreferrer" target="_blank">XS</a>, shipping in Moddable as of <a href="http://blog.moddable.tech/blog/january-17-2017-big-update-to-moddable-sdk/" rel="nofollow noreferrer" target="_blank">the January 17, 2018 update</a>
</li>
<li>
<p><a href="https://github.com/mathiasbynens/regexpu" rel="nofollow noreferrer" target="_blank">regexpu (transpiler)</a> with the <code>{ dotAllFlag: true }</code> option enabled</p>
<ul>
<li><a href="https://mothereff.in/regexpu#input=const+regex+%3D+/foo.bar/s%3B%0Aconsole.log%28%0A++regex.test%28%27foo%5Cnbar%27%29%0A%29%3B%0A//+%E2%86%92+true&amp;dotAllFlag=1" rel="nofollow noreferrer" target="_blank">online demo</a></li>
<li><a href="https://github.com/mathiasbynens/babel-plugin-transform-dotall-regex" rel="nofollow noreferrer" target="_blank">Babel plugin</a></li>
</ul>
</li>
<li>
<p><a href="https://github.com/dmitrysoshnikov/regexp-tree#using-compat-transpiler-api" rel="nofollow noreferrer" target="_blank">Compat-transpiler of RegExp Tree</a></p>
<ul><li><a href="https://github.com/dmitrysoshnikov/babel-plugin-transform-modern-regexp" rel="nofollow noreferrer" target="_blank">Babel plugin</a></li></ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES2018 新特征之：正则表达式 dotAll 模式

## 原文链接
[https://segmentfault.com/a/1190000013544567](https://segmentfault.com/a/1190000013544567)

