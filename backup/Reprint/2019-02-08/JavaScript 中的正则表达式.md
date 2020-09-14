---
title: 'JavaScript 中的正则表达式' 
date: 2019-02-08 2:30:40
hidden: true
slug: 84una3k90ie
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">正则表达式的模式匹配</h3>
<p><code>正则表达式</code>(<code>regular expression</code>)是一个描述字符模式的对象。javascript的<code>RegExp</code>对象表示正则表达式，<code>String</code>和<code>RegExp</code>都定义了方法，后者<code>使用正则表达式进行强大的模式匹配和文本检索与替换功能</code>。<code>Javascript</code>的正则表达式是<code>Perl5</code>的正则表达式语法的大型子集，所以对于有Perl编程经验的程序员来说。学习<code>Javascript</code>的正则表达式是小菜一碟。</p>
<h3 id="articleHeader1">正则表达式的意义</h3>
<p>Javascript中的正则表达式使用<code>RegExp</code>表示，可以使用<code>RegExp()构造函数</code>来创建RegExp对象，不过RegExp对象更多的是通过一种特殊的直接量语法来创建。就像通过引号包裹字符的方式来创建字符串直接量一样。正则表达式直接了定义为包含在一对<code>斜杠(/)</code>之间的字符，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var patterns = /s$/;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var patterns</span> = /s$/;</code></pre>
<p>运行这段代码创建一个新的RegExp对象，并将它赋值给变量patterns。这个特殊的RegExp对象用来匹配所有以字符“s”结尾的字符串。用构造函数RegExp也可以定义一个与之等价的正则表达式，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = new RegExp('s$');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> pattern = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'s$'</span>);</code></pre>
<p>正则表达式的模式规则是由一个字符序列组成的。包括所有字母和数字在内，大多数的字符都是按照直接量仅描述匹配的字符的。如此说来，正则表达式<code>/java/</code>可以匹配任何包含“java”子串的字符串。除此之外，正则表达式中还有其他具有特殊语义的字符，这些字符并不按照字面含义进行匹配。比如，正则表达式<code>/s$/</code>包含两个字符，第一个字符“s”按照字面含义匹配，第二个字符“$”是一个具有特殊语义的字符，用以匹配字符串的结束。因此这个表达式可以匹配任何以“s”结束的字符串。</p>
<h4>RegExp直接量和对象的创建</h4>
<p>就像字符和数字一样，程序中每个取值相同的原始类型直接量均表示相同的值，这是显而易见的。程序运行时每次遇到对象直接量（初始化表达式）诸如<code>{}</code>和<code>[]</code>的时候都会创建新对象。比如，如果在循环体中写<code>var a = [];</code>，则每次遍历都会创建一个新的空数组。</p>
<p>正则表达式直接量则与此不同，<code>ECMAScript 3</code>规范规定，一个正则表达式直接量会在执行到它时转换为一个RegExp对象，同一段代码所表示<code>正则表达式直接量的每次运算都返回同一个对象</code>。<code>ECMAScript 5</code>规范则做了相反的规定，<code>同一段代码所表示的正则表达式直接量的每次运算都返回新对象</code>。IE一直都是按照ECMAScript 5的规范实现的，多数最新版本的浏览器也开始遵循ECMAScript 5，尽管目前该标准并为全面广泛推行。如下列代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getReg() {
    var reg = /[a-z]/;
    reg.foo = &quot;bar&quot;;
    return reg;
}
var reg = getReg();
var reg2 = getReg();
console.log(reg === reg2); // 在Firefox 3.6中返回true，在Firefox 4+中返回flase
reg.foo = &quot;baz&quot;;
console.log(reg2.foo); // 在Firefox 3.6中返回“baz”，在Firefox 4+中返回“bar”" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function getReg() {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /[a-z]/;
    <span class="hljs-keyword">reg</span>.foo = <span class="hljs-string">"bar"</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">reg</span>;
}
<span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = getReg();
<span class="hljs-keyword">var</span> reg2 = getReg();
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">reg</span> === reg2); <span class="hljs-comment">// 在Firefox 3.6中返回true，在Firefox 4+中返回flase</span>
<span class="hljs-keyword">reg</span>.foo = <span class="hljs-string">"baz"</span>;
console.<span class="hljs-built_in">log</span>(reg2.foo); <span class="hljs-comment">// 在Firefox 3.6中返回“baz”，在Firefox 4+中返回“bar”</span></code></pre>
<p>原因可以在<code>ECMAScript 5</code>规范第24页和第247页中找到，也就是说在<code>ECMAScript 3</code>规范中，<em>用正则表达式创建的RegExp对象会共享一个实例</em>，而在<code>ECMAScript 5</code>中则是<em>两个独立的实例</em>。很明显<code>ECMAScript 5</code>的规范更符合开发者的期望。</p>
<h3 id="articleHeader2">直接量字符串</h3>
<p>正如上文提到的，正则表达式中的所有字母和数字都是按照字面含义进行匹配的。JavaScript正则表达式也支持非字母的字符匹配，这些字符通过反斜线()作为前缀进行转义。比如，转义字符n用来匹配换行符。</p>
<ul>
<li><p><code>o</code>  NUL字符(u0000)</p></li>
<li><p><code>t</code>  制表符(u0009)</p></li>
<li><p><code>n</code>  换行符(u000A)</p></li>
<li><p><code>v</code>  垂直制表符(u000B)</p></li>
<li><p><code>f</code>  换页符(u000C)</p></li>
<li><p><code>r</code>  回车符(u000D)</p></li>
<li><p><code>xnn</code>  有十六进制数nn指定为拉丁字符，例如，x0A等价于n</p></li>
<li><p><code>uxxxx</code>  由十六进制数xxxx指定的Unicode字符，例如u0009等价于t</p></li>
<li><p><code>cX</code>  控制字符^X，例如，cJ等价于换行符n</p></li>
</ul>
<p>在正则表达式中，许多（共18个）标点符号具有特殊含义，它们是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="^ $ . * + ? : ! = \ / | [ ] { } ( ) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">^ $ . * + ? : ! = \ / <span class="hljs-string">| [ ] { } ( ) </span></code></pre>
<p>在接下来的几节里，我们将学习这些符号的含义，某些符合只有在正则表达式的某些上下文中才具有特殊含义，在其他上下文中则被当成直接量处理。然而，如果想在正则表达式中使用这些字符的直接量进行匹配，则必须使用前缀``，这是一条通用的规则。其他标点符号（比如@和引号）没有特殊含义，在正则表达式中按照字面含义进行匹配。</p>
<p><strong>如果不记得那些标点符号需要反斜线转移，可以使用每个标点符号前都加上反斜线。另外需要注意，许多字符和数字在有反斜线做前缀是也有特殊含义`，所以对于想按照直接量进行匹配的字母和数字，进行不要用反斜线对其转义。当然，想要在正则表达式中按照直接量匹配反斜线本身，则必须使用反斜线将其转义。比如，正则表达式“/\/”用以匹配任何包含反斜线的字符串。</strong></p>
<h3 id="articleHeader3">字符类</h3>
<p>将<code>直接量字符串</code>单独放进方括号内就组成了<code>字符类</code>(<code>character class</code>)。一个字符类可以匹配它所包含的任意字符。因此，正则表达式<code>/[abc]/</code>就和字母“a”、“b”、“c”中的任意一个都匹配。定义<code>否定字符类</code>时，将一个“^”字符做为左方括号内的第一字符。正则表达式<code>/[^abc]/</code>匹配的是“a”、“b”、“c”之外的所有字符。字符类可以使用<code>连字符</code>来表示字符范围。要匹配拉丁字母表中的小写字母，可以使用<code>/[a-z]/</code>，要匹配拉丁字母表中任何字母和数字，则使用<code>/[a-zA-Z0-9]/</code>。</p>
<p>由于某些字符类非常常用，因为在JavaScript的正则表达式语法中，使用了这些特殊字符的转义字符来表示它们。例如，<code>s</code>匹配的是空格符、制表符和其他Unicode空白符(\o、 \t、 \n、 \v、 \f、 \r等)，<code>S</code>匹配的是非Unicode 空白符的字符。下面列出了这些字符，并且总结了字符类的语法（注意，有些字符类转义字符只能匹配ASCII字符，还没有扩展到可以处理Unicode字符，但可以通过十六进制表示方法来显示定义Unicode字符类，例如，<code>/[u2e80-u9fff]/</code>用来匹配所有汉字）。</p>
<ul>
<li><p><code>[...]</code>   方括号内的任意字符</p></li>
<li><p><code>[^...]</code>    不在方括号内的任意字符</p></li>
<li><p><code>.</code>    除换行符和其他Unicode行终止符之外的任意字符</p></li>
<li><p><code>w</code>    任何ASCII字符组成的单词，等价于[a-zA-Z0-9]</p></li>
<li><p><code>W</code>    任何不适ASCII字符组成的单词，等价于[^a-zA-Z0-9]</p></li>
<li><p><code>s</code>    任何Unicode空白符</p></li>
<li><p><code>S</code>    任何非Unicode空白符的字符，注意W和S的不同</p></li>
<li><p><code>d</code>    任何ASCII数字，等价于[0-9]</p></li>
<li><p><code>D</code>    除了ASCII数字之外的任何字符，等价于[^0-9]</p></li>
<li><p><code>[b]</code>    推格直接量(特例)</p></li>
</ul>
<p><em>注意，在方括号之内也可以写这些特殊转义字符。比如，由于\s匹配所有的空白符，\d匹配的是所有数字，因为/[\d\s]/匹配的就是任意空白符或者数字。注意，这里有一个特例。下面我们将会看到转义符\b具有的特殊含义，当用在字符类时，它表示的是退格字符，所以要在正则表达式中按照直接量表示一个退格符，只需要使用具有一个元素的字符类/[\b]/。</em></p>
<h3 id="articleHeader4">重复</h3>
<p>用刚刚学过的正则表达式的语法，可以把两位数描述成<code>/dd/</code>，四位数描述成<code>/dddd/</code>。但是目前为止，还没有一种方法可以用来描述任意多位的数字活着描述由三个字母和一个数字构成的字符串。这些正则表达式语法中较为复杂的模式都提到了正则表达式中某元素的"重复出现次数"。</p>
<p>我们在正则模式之后跟随用以制定字符重复的标记。由于某些重复种类非常常用，因此就有一些专门用于表示这种情况的特殊字符。例如，“+”用以匹配前一个模式的一个或多个副本。下面总结了这些表示重复的正则语法。</p>
<ul>
<li><p><code>{n,m}</code>    匹配前一项至少n次，但不能超过m次</p></li>
<li><p><code>{n,}</code>    匹配前一项n次或者更多次</p></li>
<li><p><code>{n}</code>    匹配前一项n次</p></li>
<li><p><code>?</code>    匹配前一项0次或者1次，也就是说前一项是可选的，等价于{0，1}</p></li>
<li><p><code>+</code>    匹配前一项1次或者多次，等价于{1,}</p></li>
<li><p><code>*</code>    匹配前一项0次或者多次，等价于{0,}</p></li>
</ul>
<p>这里有一些例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg1 = /\d{2,4}/  // 匹配2～4个数字
var reg2 = /\w{3}\d?/  // 精确匹配三个单词和一个可选数字
var reg3 = /\s+java\s+/  // 匹配前后带有一个或多个空格的字符串“java”
var reg4 = /[^(]*/  // 匹配一个或多个非左括号的字符" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg1 = <span class="hljs-regexp">/\d{2,4}/</span>  <span class="hljs-comment">// 匹配2～4个数字</span>
<span class="hljs-keyword">var</span> reg2 = <span class="hljs-regexp">/\w{3}\d?/</span>  <span class="hljs-comment">// 精确匹配三个单词和一个可选数字</span>
<span class="hljs-keyword">var</span> reg3 = <span class="hljs-regexp">/\s+java\s+/</span>  <span class="hljs-comment">// 匹配前后带有一个或多个空格的字符串“java”</span>
<span class="hljs-keyword">var</span> reg4 = <span class="hljs-regexp">/[^(]*/</span>  <span class="hljs-comment">// 匹配一个或多个非左括号的字符</span></code></pre>
<p>在使用“＊”和“？”时要注意，由于这些字符可能匹配0个字符，因此它们允许什么都不匹配。例如，正则表达式/a*/实际与字符串“bbbb”匹配，因为这个字符串含有0个a。</p>
<h3 id="articleHeader5">非贪婪的重复</h3>
<p>上面列出的匹配重复字符是尽可能多的匹配，而且允许后续的正则表达式继续匹配。因此，我们称之为“<code>贪婪的</code>”匹配。我们同样可以使用正则表达式进行<code>非贪婪匹配</code>。只须在待匹配的字符后跟随一个问号即可：“??”、“+?”、“*?”或“{1,5}?”。比如，正则表达式<code>/a+/</code>可以匹配一个或多个连续的字符a。当使用“aaa”作为匹配字符串时，正则表达式会匹配它的三个字符。但是<code>/a+?/</code>也可以匹配一个或多个连续字母a，但它是尽可能少地匹配。我们同样将“aaa”作为匹配字符串，但后一个模式只能匹配第一个a。</p>
<p>使用<code>非贪婪</code>的匹配模式所得到的结果可能和期望并不一致。考虑以下正则表达式<code>/a+b/</code>，它可以匹配一个或多个a，以及一个b。当使用“aaab”作为匹配字符串时，她会匹配整个字符串，现在再试一下非贪婪匹配的版本<code>/a+?b/</code>，它匹配尽可能少的a和一个b。当用它来匹配“aaab”时，你期望它能匹配一个a和最后一个b。但实际上，这个模式却匹配了整个字符串，和该模式的贪婪匹配一摸一样。这是因为正则表达式的模式匹配总是会寻找字符串中第一个可能匹配的位置。由于该匹配是从字符串的第一个字符开始的。因此在这里不考虑他的子串中更短的匹配。</p>
<h3 id="articleHeader6">选择、分组和引用</h3>
<p>正则表达式的语法还包括<code>制定选择项</code>、<code>子表达式分组</code>和<code>引用前一个子表达式的特殊字符</code>。字符“｜”用于分割供选择的字符。例如，<code>/ab|cd|ef/</code>可以匹配“ab”，可以可以匹配符串“cd”，还可以匹配字符串“ef”。<code>/d{3}|[a-z]{4}/</code>匹配的时三位数字或者四个小写字母。</p>
<p>注意，选择项的尝试匹配次序是<code>从左到右</code>，直到发现匹配项。如果左边的选择项匹配，就会忽略右边的匹配项，即使它产生更好的匹配。因此，当正则表达式<code>/a|ab/</code>匹配字符串“ab”时，它只能匹配第一个字符。</p>
<p>正则表达式中的圆括号有多种作用。第一个作用是<strong>把单独的项组合成子表达式</strong>，以便可以像处理一个独立的单元那样用“｜”、“ * ”、“ + ”或者“ ? ”等来对单元内的项进行处理。例如，<code>/java(Script)?/</code>可以匹配字符串“java”，其后可以有“Script”也可以没有。<code>/(ab|cd)+|ef/</code>可以匹配字符串“ef”，也可以匹配字符串“ab”或者“cd”的一次或多次重复。例如，将“font-size”改为“fontSize”：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;font-size&quot;;
str = str.replace(/-(\w)/,function(str,$1){
    return $1.toUpperCase();
});
console.log(str); // => fontSize" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>var <span class="hljs-built_in">str</span> = <span class="hljs-string">"font-size"</span>;
<span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span>.replace(/-(\w)/,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(str,$<span class="hljs-number">1</span>)</span>{</span>
    return $<span class="hljs-number">1</span>.toUpperCase();
});
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">str</span>); <span class="hljs-comment">// =&gt; fontSize</span></code></pre>
<p>在正则表达式中，圆括号的另一个作用是<strong>在完整的模式中定义子模式</strong>。当一个正则表达式成功地和目标字符串相互匹配时，可以从目标字符串中抽出和圆括号汇总的字母是相匹配的部分（我们将在随后的部分中看到如何取得这些匹配的子串）。例如，嘉定我们正在检索的模式是一个或多个小写字母后面跟随了一位或多位数字，则可以使用模式<code>/[a-z]+d+/</code>。但假定我们真正关心的是每个匹配尾部的数字，那么如果将模式的数字部分放在括号中(<code>/[a-z]+(d+)/</code>)，就可以从检索到的匹配中抽取数字了。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /[a-z]+\d+/;
var str = 'abcde123';
str.match(reg); 
// => [&quot;abcde123&quot;]
var reg2 = /[a-z]+(\d+)/;
str.match(reg2); 
// => [&quot;abcde123&quot;, &quot;123&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /[a-z]+\<span class="hljs-keyword">d</span>+/;
<span class="hljs-keyword">var</span> str = 'abcde123';
str.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); 
<span class="hljs-comment">// =&gt; ["abcde123"]</span>
<span class="hljs-keyword">var</span> reg2 = /[a-z]+(\<span class="hljs-keyword">d</span>+)/;
str.<span class="hljs-built_in">match</span>(reg2); 
<span class="hljs-comment">// =&gt; ["abcde123", "123"]</span></code></pre>
<p>带圆括号的表达式的另一个用途就是<strong>允许在同一正则表达式的后部引用前面的子表达式</strong>。这是通过在字符<code>“”</code>后加一位或多位数字来实现的。这个数字指定了带圆括号的子表达式在正则表达式中的位置。例如，<code>1</code>引用的是第一个带圆括号的子表达式，<code>3</code>引用的是第三个带圆括号的子表达式。注意，因为子表达式可以嵌套另外一个子表达式，所以它的问题是参与计数的左括号的位置。例如，下面的正则表达式中，嵌套的子表达式([Ss]cript)可以使用<code>2</code>来指代</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/;
var str = 'javascript is fun that java';
var match = str.match(reg);
console.log(match);
// => [&quot;javascript is fun&quot;, &quot;javascript&quot;, &quot;script&quot;, &quot;fun&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> reg = /([Jj]ava([Ss]cript)?)\sis\s(<span class="hljs-function"><span class="hljs-keyword">fun</span>\w*)/;</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'javascript is fun that java'</span>;
<span class="hljs-keyword">var</span> match = str.match(reg);
console.log(match);
<span class="hljs-comment">// =&gt; ["javascript is fun", "javascript", "script", "fun"]</span></code></pre>
<p><strong>对正则表达式中前一个子表达式的引用，并不是只对子表达式的引用，而是指与那个模式相匹配的文本的引用</strong>。这样，<code>引用</code>可以用于实施一条约束，即一个字符串各个单独部分包含的是完全相同的字符。例如，下面的正则表达式匹配的就是位于单引号或双引号之内的0个或多个字符。但是，它并不要求左侧和右侧的引号匹配(即加入的两个引号都是单引号或都是双引号)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /['&quot;][^'&quot;]*['&quot;]/;
var str = '&quot;hello\'';
reg.test(str); // => true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>var reg = /[<span class="hljs-string">'"</span>][<span class="hljs-symbol">^'"</span>]*['"]/;
var str = '"hello\'';
reg.test(str); // =&gt; true</code></pre>
<p>如果要匹配左侧和右侧的引号完全相同，可以使用如下引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /(['&quot;])[^'&quot;]*\1/;
var str = '&quot;hello\'';
reg.test(str); // => false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /(['<span class="hljs-string">"])[^'"</span>]*\1/;
<span class="hljs-keyword">var</span> str = '"hello\'';
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str); <span class="hljs-comment">// =&gt; false </span></code></pre>
<p>因为左侧和右侧的引号不一致，所以false。<code>1</code>匹配的是第一个带圆括号的子表达式所匹配的模式。在这个例子中，存在这样一条约束，那就是左侧的引号必须和右侧的引号相匹配。正则表达式不允许用双引号括起来的内容有单引号，反之亦然。不能在字符类中使用这种引用，所以下面的写法是非法的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /(['&quot;])[^\1]*\1/;
var str = '&quot;hello\'';
reg.test(str); // => false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /(['"])[^\1]*\1/;
<span class="hljs-keyword">var</span> str = '"hello\'';
<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>(str); <span class="hljs-comment">// =&gt; false </span></code></pre>
<p>正如上面重点标注的那段说明。<code>对正则表达式中前一个子表达式的引用，并不是只对子表达式的引用，而是指与那个模式相匹配的文本的引用</code> 所以这个是false。</p>
<p>在接下来，我们会看到一种带圆括号的子表达式的引用，这是正则表达式的<code>检索和替换操作的强大特性</code>之一。</p>
<p>同样，在正则表达式中不用创建带数字编码的<code>引用</code>，也可以对子表达式进行<code>分组</code>。它不是以“ ( ”和“ ) ”进行分组，而是以“ (?: ”和“ ) ”来进行分组，比如，考虑下面这个模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/;
var str = 'javascript is fun that java';
var match = str.match(reg);
// => [&quot;javascript is fun&quot;, &quot;javascript&quot;, &quot;fun&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> reg = /([Jj]ava(?:[Ss]cript)?)\sis\s(<span class="hljs-function"><span class="hljs-keyword">fun</span>\w*)/;</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'javascript is fun that java'</span>;
<span class="hljs-keyword">var</span> match = str.match(reg);
<span class="hljs-comment">// =&gt; ["javascript is fun", "javascript", "fun"]</span></code></pre>
<p>我们会发现这里匹配的结果跟前面匹配的结果“<code>["javascript is fun", "javascript", "script", "fun"]</code>”相比，少了一个<code>"script"</code>。这是因为子表达式(?:[sS]cript)仅仅用于分组，不参与引用。因此复制符号"?"可以应用到各个分组。这种改进的圆括号并不生成引用，所以这个正则表达式中，<code>2</code>引用了与<code>(funW*)</code>匹配的文本。</p>
<p>下面是对正则表达式的选择、分组和引用运算符做了总结。</p>
<blockquote><ul>
<li><p>｜    选择，匹配的是该符号左边的子表达式或右边的子表达式</p></li>
<li><p>(...)    组合，将几个项组合为一个单元，这个单元可通过“ * ”、“ ? ”、“ + ”和“ | ”等符号加以修饰，而且可以记住和这个组合相匹配的字符串以供此后的引用使用</p></li>
<li><p>(?:...)    只组合，把项组合到一个单元，但不记忆和改组相匹配的字符</p></li>
<li><p>\n    和第n个分组第一次匹配的字符相匹配，组是圆括号中的子表达式（也可能是嵌套的），组索引是从左到右的左括号，“(?:”形式的分组不参与编码</p></li>
</ul></blockquote>
<h3 id="articleHeader7">指定匹配位置</h3>
<p>正如前面所介绍的，正则表达式中的多个元素才能够匹配字符串中的一个字符。例如，<code>s</code>匹配的只是一个空白符。还有一些正则表达式的元素匹配的是字符之间的位置，而不是实际的字符。例如，<code>b</code>匹配一个单词的边界，即位于<strong>w（ASCII单词）字符和W（非ASCII单词）之间的边界，或位于一个ASCII单词与字符串的开始或结束之间的边界</strong>。像<code>b</code>这样的元素不匹配某个可见的字符，它们指定匹配发生的合法位置。有时我们称这些元素为正则表达式的<code>锚</code>，因为它们将模式定位在搜索字符串的特定位置上。最常用的锚元素是<code>^</code>，它是用来匹配字符串的起始位置，锚元素<code>$</code>用以匹配字符串的结束位置。</p>
<p>例如，要匹配单词“javascript”，可以使用正则表达式<code>/^[Jj]ava[Ss]cript$/</code>。如果想匹配"java"这个单词本身（不像在“JavaScript”中作为单词的前缀），可以使用正则表达式<code>/sJava/</code>，可以匹配前后都有空格的单词“java”。但是这样做有两个问题，第一，<strong>如果“java”出现在字符串的开始或者结尾，就是匹配不成功，除非开始和结尾处各有一个空格。</strong>第二个问题是，<strong>当找到了与之匹配的字符串时，它返回的匹配字符串的前端和后端都有空格没这并不是我们想要的。</strong>因此我们使用单词的边界b来代替真正的空格符s进行匹配（或定位）。这样正则表达式就写成了<code>/b[Jj]avab/</code>。元素<code>B</code>将把匹配的錨点定位在不适单词的边界之处。因此正则表达式<code>/B[Ss]cript/</code>于“JavaScript”和“posrscript”匹配，但是不与“script”和“Scripting” 匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg =/\bjava\b/;

var str = 'javascript is more fun that java';
str.match(reg); // => [&quot;java&quot;]

var str2 = 'javascript is more fun that javac';
str.match(reg); // => null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> =/\bjava\b/;

<span class="hljs-keyword">var</span> str = 'javascript is <span class="hljs-keyword">more</span> fun that java';
str.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; ["java"]</span>

<span class="hljs-keyword">var</span> str2 = 'javascript is <span class="hljs-keyword">more</span> fun that javac';
str.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; null</span></code></pre>
<p><strong>任意正则表达式都可以作为锚点条件</strong>。就像上面例子中<code>/bjavab/</code>中的"java"。如果在富豪“ (?= ”和“ ) ”之间加入一个表达式，他就是一个<code>先行断言</code>，用以说明圆括号内的表达式必须正确匹配，但并不是真正意义上的匹配。比如，要匹配一种常用的程序设计语言的名字，但只在其后有冒号时才匹配，可以使用<code>/[Jj]ava([Ss]cript)?(?=:)/</code>。这个正则表达式可以匹配“Javascript: beautiful language”中的“JavaScript”，但是不能匹配“java in a Nutshell”中的“Java”，因为它后面没有冒号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg =/[Jj]ava([Ss]cript)?(?=\:)/;
var str1 = &quot;Javascript: beautiful language&quot;;
str1.match(reg); // => [&quot;Javascript&quot;, &quot;script&quot;]
var str2 = &quot;java in a Nutshell&quot;;
str2.match(reg); // => null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> =/[Jj]ava([Ss]cript)?(?=\:)/;
<span class="hljs-keyword">var</span> str1 = <span class="hljs-string">"Javascript: beautiful language"</span>;
str1.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; ["Javascript", "script"]</span>
<span class="hljs-keyword">var</span> str2 = <span class="hljs-string">"java in a Nutshell"</span>;
str2.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; null</span></code></pre>
<p>带有“ (?! ”的断言是负向先行断言，用一指定接下来的字符都不必匹配。例如，<code>/Java(?!Script)[A-Z]w*/</code>可以匹配“Java”后跟随一个大写字母和任意多个ASCII单词，但Java后不能跟随“Script”。它可以匹配”JavaBeans“，但是不能匹配”Javanese“。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /Java(?!Script)[A-Z]\w*/;
var str = &quot;JavaBeans&quot;;
str.match(reg); // => [&quot;JavaBeans&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /Java(?!Script)[A-Z]\w*/;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"JavaBeans"</span>;
str.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; ["JavaBeans"]</span></code></pre>
<blockquote><ul>
<li><p>^    匹配字符串的开头，再多行检索中，匹配一行的开头</p></li>
<li><p>$    匹配字符串的结尾，再多行检索中，匹配一行的结尾</p></li>
<li><p>\b    匹配一个单词的边界，简言之，就是位于字符w和W之间的位置，或位于字符W和匹配字符串的开头或者结尾的位置</p></li>
<li><p>\B    匹配非单词边界的位置</p></li>
<li><p>(?=pattern)    正向先行断言，要就接下来的字符都与pattern匹配，但是不能包含匹配pattern的那些字符</p></li>
<li><p>(?!pattern)    负向(反向)先行断言，要就接下来的字符都不与pattern匹配</p></li>
</ul></blockquote>
<h3 id="articleHeader8">修饰符</h3>
<p>正则表达式中的语法还有最后一个知识点，即正则表达式的<code>修饰符</code>，用以说明高级匹配模式的规则。和之前讨论的正则表达式语法不同，修饰符是放在“/”符号之外的，也就是说，它们不是出现两条斜线之间，而是第二条斜线之后。JavaScript支持三个修饰符，修饰符<code>“i”</code>用以说明模式匹配是<strong>不区分大小写</strong>。修饰符<code>“g”</code>说明<em>*模式匹配应该是全局的</em>，*也就是说，应该找出被检索字符串中所有的匹配。修饰符<code>“m”</code>用以在多行模式中执行匹配，在这种模式下，如果待检索的字符串包含多行，那么<code>^</code>和<code>$</code>锚字符除了匹配整个字符串的开始和结尾之外，还能匹配每行的开始和结束。比如正则表达式<code>/java$/im</code>可以匹配“java”也可以匹配“Javan is fun”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg = /java$/im;
var str1 = 'java';
str1.match(reg); // => [&quot;java&quot;]
var str2 = 'java\n is fun';
str2.match(reg); // => [&quot;java&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span> = /java$/im;
<span class="hljs-keyword">var</span> str1 = 'java';
str1.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; ["java"]</span>
<span class="hljs-keyword">var</span> str2 = 'java\<span class="hljs-keyword">n</span> is fun';
str2.<span class="hljs-built_in">match</span>(<span class="hljs-keyword">reg</span>); <span class="hljs-comment">// =&gt; ["java"]</span></code></pre>
<p><strong>这些修饰符可以任意组合</strong>，比如，要想不区分大小写匹配字符串中的第一个单词“java”，可以使用不区分大小写的修饰符来定义正则表达式<code>/bjavab/i</code>。要想匹配字符串中所有单词，则需要添加修饰符g：<code>/bjavab/gi</code>。</p>
<blockquote><ul>
<li><p>i    执行不区分大小写的匹配</p></li>
<li><p>g    执行一个全局匹配，简言之，即找到所有的匹配，而不是在找到第一个之后停止</p></li>
<li><p>m    多行匹配模式，^匹配一行的开头和字符串的开头，$匹配行的结尾和字符串的结尾</p></li>
</ul></blockquote>
<p>获取指定的querystring</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function param(key, url) {
    var reg = new RegExp(&quot;(?:^|\\?|#|&amp;)&quot; + key + &quot;=([^&amp;#]*)(?:$|&amp;|#)&quot;, &quot;i&quot;);
    var o = reg.exec(url || location.href);
    return o ? encodeURI(o[1]) : &quot;&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">param</span>(<span class="hljs-params">key, url</span>) </span>{
    <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(?:^|\\?|#|&amp;)"</span> + key + <span class="hljs-string">"=([^&amp;#]*)(?:$|&amp;|#)"</span>, <span class="hljs-string">"i"</span>);
    <span class="hljs-keyword">var</span> o = reg.exec(url || location.href);
    <span class="hljs-keyword">return</span> o ? <span class="hljs-built_in">encodeURI</span>(o[<span class="hljs-number">1</span>]) : <span class="hljs-string">""</span>;
}</code></pre>
<p>获取所有的querystring</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getAllParam() {
    var reg=/[?&amp;]([^=?&amp;]+)=([^=?&amp;]+)/ig
    var url={};
    while(reg.exec(location.href)){
        url[RegExp.$1]=RegExp.$2;
    }
    return url;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAllParam</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> reg=<span class="hljs-regexp">/[?&amp;]([^=?&amp;]+)=([^=?&amp;]+)/ig</span>
    <span class="hljs-keyword">var</span> url={};
    <span class="hljs-keyword">while</span>(reg.exec(location.href)){
        url[<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>]=<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">2</span>;
    }
    <span class="hljs-keyword">return</span> url;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 中的正则表达式

## 原文链接
[https://segmentfault.com/a/1190000005858057](https://segmentfault.com/a/1190000005858057)

