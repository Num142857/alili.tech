---
title: 'JavaScript正则表达式RegExp' 
date: 2019-01-18 2:30:34
hidden: true
slug: 0yy98aknirqi
categories: [reprint]
---

{{< raw >}}

                    
<p>正则表达式，也称规则表达式，经常使用其来完成对字符串的校验和过滤。由于正则表达式的灵活性、逻辑性和功能性都非常强大，而且 可以利用很简单的方式完成对复杂字符串的控制，所以很多程序语言都支持正则表达式。在<code>JavaScript</code>中正则表示也非常强大和实用。</p>
<h2 id="articleHeader0">基本形式</h2>
<p>正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用作按照“给定模式”匹配文本的工具。比如，正则表达式给出一个Email地址的模式，然后用它来确定一个字符串是否为Email地址。JavaScript的正则表达式体系是参照Perl 5建立的。</p>
<p>新建正则表达式有两种方法。一种是使用字面量，以斜杠表示开始和结束。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 字面量形式
var telRegex1 = /^1[3|5|7|8]\d{9}$/;
// 构造函数形式
var telRegex2 = new RegExp('^1[3|5|7|8]\\d{9}$');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-comment">// 字面量形式</span>
<span class="hljs-keyword">var</span> telRegex1 = <span class="hljs-regexp">/^1[3|5|7|8]\d{9}$/</span>;
<span class="hljs-comment">// 构造函数形式</span>
<span class="hljs-keyword">var</span> telRegex2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'^1[3|5|7|8]\\d{9}$'</span>);</code></pre>
<p>以上都是创建了一个内容为<code>^1[3|5|7|8]\d{9}$</code>的正则表达式，其表示对一个手机号码的校验。必须以1开始，第二位为3/5/7/8，之后为9位数字。</p>
<p>这两种写法——字面量和构造函数——在运行时有一个细微的区别。采用字面量的写法，正则对象在代码载入时（即编译时）生成；采用构造函数的方法，正则对象在代码运行时生成。考虑到书写的便利和直观，实际应用中，基本上都采用字面量的写法。</p>
<p>有一点需要注意，使用构造函数创建正则表达式时，传入的参数是字符串形式的，在字符串内部，<code>\</code>本身也是一个转义符，因此需要再使用一个<code>\</code>来对其进行正则表达式的转义。上面第二个示例中，<code>\\d</code>才能代表任意数字。</p>
<p>关于正则表达式中，各种符号的含义，以及使用方法，请看后面的介绍:</p>
<h2 id="articleHeader1">元字符</h2>
<p>一些常用的元字符如下:</p>
<ul>
<li><p><code>.</code> 匹配除换行符之外的任意字符</p></li>
<li><p><code>\w</code>    匹配字母或数字或下划线或汉字</p></li>
<li><p><code>\s</code>    匹配任意的空白符</p></li>
<li><p><code>\d</code>    匹配数字</p></li>
<li><p><code>\b</code>    匹配单词的开始或结束</p></li>
<li><p><code>^</code>    匹配字符串的开始处</p></li>
<li><p><code>$</code>   匹配字符串的结束处。</p></li>
<li><p><code>*</code>   匹配前面的子表达式任意次。</p></li>
<li><p><code>?</code>  匹配前面子表达式0次或一次，等价于<code>{0, 1}</code>。</p></li>
<li><p><code>+</code>  匹配之前子表达式一次到多次，等价于<code>{1, }</code>。</p></li>
<li><p><code>{n}</code>  匹配之前的子表达式n次。</p></li>
<li><p><code>{m,n}</code>  匹配之前的子表达式最少m次，最多n次。</p></li>
<li><p><code>{n, }</code>  匹配之前的子表达式至少n次。</p></li>
<li><p><code>[xyz]</code>  字符集合，表示其中任意一个字符。表示范围可用<code>-</code>链接，例如<code>[a-z]</code> 表示a-z之间的任意一个字母。还可以这样书写<code>[A-Za-z0-9]</code>。</p></li>
<li><p><code>[^xyz]</code> 字符即可，表示非其中任意一个字符。表示范围可用<code>-</code>链接，例如<code>[^a-z]</code> 表示非 a-z之间的任意一个字母。</p></li>
<li><p><code>|</code>   表示<code>或(or)</code>关系,例如 <code>com|cn</code>，表示匹配com或者cn。</p></li>
<li><p><code>()</code>  用于分组，其分组中的内容可已通过<code>$1-$9</code>按顺序获取(字符串相关方法中)，之后的正则中也可以通过<code>\1-\9</code>进行引用(正则表达式内部)。(分组0表示整个正则匹配内容或整个正则表达式)</p></li>
</ul>
<blockquote><p>在正则表达式中，以上这些以及一些未列出的元字符都是有自身含义的，如果我们需要匹配这些元字符本身，可以使用<code>\</code>对其进行转义即可。</p></blockquote>
<p>更多元字符可以查看:<a href="http://baike.baidu.com/link?url=ToYsbDLfsxlj5KkD3KwCyiAAkCpvk8TQgX5FbHgCAeBJCnBcr8VweLIaQlVX7i7AWoP0fwEF1_oHBUtkKFXX0a#4" rel="nofollow noreferrer" target="_blank">正则表达式</a></p>
<h2 id="articleHeader2">属性</h2>
<h3 id="articleHeader3">修饰符</h3>
<ul>
<li><p><code>ignoreCase</code>：返回一个布尔值，表示是否设置了i修饰符，该属性只读。</p></li>
<li><p><code>global</code>：返回一个布尔值，表示是否设置了g修饰符，该属性只读。</p></li>
<li><p><code>multiline</code>：返回一个布尔值，表示是否设置了m修饰符，该属性只读。</p></li>
<li><p><code>sticky</code>：<strong>ES6</strong>返回一个布尔值，表示是否设置了y修饰符，只读。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var r = /abc/igm;

r.ignoreCase; // true
r.global;  // true
r.multiline;  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> r = <span class="hljs-regexp">/abc/igm</span>;

r.ignoreCase; <span class="hljs-comment">// true</span>
r.global;  <span class="hljs-comment">// true</span>
r.multiline;  <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader4">匹配时属性</h3>
<ul>
<li><p><code>lastIndex</code>：返回下一次开始搜索的位置。该属性可读写，但是只在设置了g修饰符时有意义。</p></li>
<li><p><code>source</code>：<strong>ES5</strong>返回正则表达式的字符串形式（不包括反斜杠），该属性只读。</p></li>
<li><p><code>flags</code>：<strong>ES6</strong>返回正则表达式中的修饰符。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var r = /abc/igm;

r.lastIndex; // 0
r.source; // &quot;abc&quot;
r.flags; //&quot;igm&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> r = <span class="hljs-regexp">/abc/igm</span>;

r.lastIndex; <span class="hljs-comment">// 0</span>
r.source; <span class="hljs-comment">// "abc"</span>
r.flags; <span class="hljs-comment">//"igm"</span></code></pre>
<h2 id="articleHeader5">方法</h2>
<h3 id="articleHeader6">test()</h3>
<p>正则对象的<code>test</code>对象接收一个字符串，表示测试字符串，返回一个布尔值，表示是此字符串是否满足匹配条件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="telRegex1.test('13612341234'); // true
telRegex2.test('13612341234'); // true
telRegex1.test('136123412'); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n">telRegex1.test(<span class="hljs-string">'13612341234'</span>); <span class="hljs-comment">// true</span>
telRegex2.test(<span class="hljs-string">'13612341234'</span>); <span class="hljs-comment">// true</span>
telRegex1.test(<span class="hljs-string">'136123412'</span>); <span class="hljs-comment">// false</span></code></pre>
<p>如果正则表达式带有<code>g</code>修饰符，则每一次<code>test</code>方法都从上一次结束的位置开始向后匹配。同时，可以通过正则对象的<code>lastIndex</code>属性指定开始搜索的位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xReg = /x/g;
var str = 'xyz_x1_y1_x3';

xReg.lastIndex; // 0
xReg.test(str); // true

xReg.lastIndex; // 1
xReg.test(str); // true
xReg.lastIndex; // 5

// 指定位置开始 指定下次匹配从最后一位开始，就匹配不到了
xReg.lastIndex = 11; // 11
xReg.test(str); // false

xReg.lastIndex; // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> xReg = <span class="hljs-regexp">/x/g</span>;
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'xyz_x1_y1_x3'</span>;

xReg.lastIndex; <span class="hljs-comment">// 0</span>
xReg.test(str); <span class="hljs-comment">// true</span>

xReg.lastIndex; <span class="hljs-comment">// 1</span>
xReg.test(str); <span class="hljs-comment">// true</span>
xReg.lastIndex; <span class="hljs-comment">// 5</span>

<span class="hljs-comment">// 指定位置开始 指定下次匹配从最后一位开始，就匹配不到了</span>
xReg.lastIndex = <span class="hljs-number">11</span>; <span class="hljs-comment">// 11</span>
xReg.test(str); <span class="hljs-comment">// false</span>

xReg.lastIndex; <span class="hljs-comment">// 0</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var indexReg = /^(?:http|https).+\/jwebui\/pages\/themes\/(\w+)\/\1\.jspx(\?\S+)?$/i ;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> indexReg = <span class="hljs-regexp">/^(?:http|https).+\/jwebui\/pages\/themes\/(\w+)\/\1\.jspx(\?\S+)?$/i</span> ;</code></pre>
<p>上面是一个F8中检查是否为首页的正则表达式。</p>
<ul>
<li><p>最开始的<code>^</code> 和最后的<code>$</code>分别表示匹配的开始和结束。</p></li>
<li><p><code>(?:http|https)</code>表示两者之一，这么写是非获取的组匹配，<code>()</code>不会被分组存储。也可以写成<code>(http|https)</code> 但是后面的<code>\1</code>就需要替换成<code>\2</code>了，因为这么写时此处形成了第一个分组。</p></li>
<li><p><code>.+</code> 就是任意字符至少出现一次。</p></li>
<li><p><code>\/jwebui\/pages\/themes\/</code> 就是匹配字符串<code>"/jwebui/pages/themes/"</code>。</p></li>
<li><p><code>(\w+)</code> 作为第一个分组，表示任意字母或数字或下划线或汉字至少出现一次。</p></li>
<li><p><code>\1</code>表示对第一个分组的引用，再重复第一分组的内容 。</p></li>
<li><p><code>\.jspx</code> 表示<code>.jspx</code>。</p></li>
<li>
<p><code>(\?\S+)?</code> 表示<code>(\?\S+)</code> 匹配的内容出现0次或一次。其中:</p>
<ul>
<li><p><code>\?</code> 表示<code>？</code> 。</p></li>
<li><p><code> \S+</code> 表示任意可见字符出现至少一次。<br>`</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader7">exec()</h3>
<p>正则对象的<code>exec</code>方法，可以返回匹配结果。如果发现匹配，就返回一个数组，成员是每一个匹配成功的子字符串，否则返回<code>null</code>。</p>
<p>如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。整个数组的<code>length</code>属性等于组匹配的数量再加1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ipReg = /(\d{1,3}\.){3}(\d{1,3})/;
var ipStr = 'My ip is &quot;192.168.118.47&quot; , please tell me yours';

ipReg.exec(ipStr); // [&quot;192.168.118.47&quot;, &quot;118.&quot;, &quot;47&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> ipReg = <span class="hljs-regexp">/(\d{1,3}\.){3}(\d{1,3})/</span>;
<span class="hljs-keyword">var</span> ipStr = <span class="hljs-string">'My ip is "192.168.118.47" , please tell me yours'</span>;

ipReg.exec(ipStr); <span class="hljs-comment">// ["192.168.118.47", "118.", "47"]</span></code></pre>
<p>上面第一段代码表示一个简单的IP检验，数字的1-3位之后紧跟一个<code>.</code>，接着这个整体要出现3次，最后再有一段数字的1-3位。结果数组中，第一个值表示匹配到的结果,之后的表示正则分组匹配到的内容。</p>
<p>如果正则表达式加上g修饰符，则可以使用多次exec方法，下一次搜索的位置从上一次匹配成功结束的位置开始。同时还可以指定<code>lastIndex</code>,使之下次从指定位置开始(可见之前的<code>test</code>示例)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ipLastReg = /\d+(?=;)/g;

var ipsStr = '192.168.118.47;192.168.118.46;192.168.118.48;';

ipLastReg.exec(ipsStr); // [&quot;47&quot;]
ipLastReg.exec(ipsStr); // [&quot;46&quot;]
ipLastReg.exec(ipsStr); // [&quot;48&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> ipLastReg = <span class="hljs-regexp">/\d+(?=;)/g</span>;

<span class="hljs-keyword">var</span> ipsStr = <span class="hljs-string">'192.168.118.47;192.168.118.46;192.168.118.48;'</span>;

ipLastReg.exec(ipsStr); <span class="hljs-comment">// ["47"]</span>
ipLastReg.exec(ipsStr); <span class="hljs-comment">// ["46"]</span>
ipLastReg.exec(ipsStr); <span class="hljs-comment">// ["48"]</span></code></pre>
<p>上面代码中正则中的<code>(?=;)</code>表示先行断言，表示只匹配在<code>;</code>前面<code>\d+</code>。</p>
<blockquote><p>如果只是为了得到是否匹配，请使用<code> RegExp.test()</code>方法或字符串实例的<code>.search() </code>替代，效率更高。</p></blockquote>
<h3 id="articleHeader8">字符串相关方法</h3>
<p>之所以称之为字符串相关方法是因为其是在字符串上调用的(虽然ES6开始，内部调用的是正则上的方法，但还是在字符串上提供的入口)。</p>
<ul>
<li><p><code>match()</code>：返回一个数组，成员是所有匹配的子字符串。</p></li>
<li><p><code>search()</code>：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。</p></li>
<li><p><code>replace()</code>：按照给定的正则表达式进行替换，返回替换后的字符串。</p></li>
<li><p><code>split()</code>：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。</p></li>
</ul>
<h4>match()</h4>
<p><code>match</code>方法对字符串进行正则匹配，返回匹配结果。此方法方法与正则对象的<code>exec</code>方法非常类似：匹配成功返回一个数组，匹配失败返回<code>null</code>。如果正则表达式带有<code>g</code>修饰符，则该方法与正则对象的<code>exec</code>方法行为不同，会一次性返回所有匹配成功的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ipLastReg = /\d+(?=;)/g;
var ipsStr = '192.168.118.47;192.168.118.46;192.168.118.48;';

ipsStr.match(ipLastReg); // [&quot;47&quot;, &quot;46&quot;, &quot;48&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> ipLastReg = <span class="hljs-regexp">/\d+(?=;)/g</span>;
<span class="hljs-keyword">var</span> ipsStr = <span class="hljs-string">'192.168.118.47;192.168.118.46;192.168.118.48;'</span>;

ipsStr.match(ipLastReg); <span class="hljs-comment">// ["47", "46", "48"]</span></code></pre>
<p>上面的正则是匹配IP中的最后一位，其中使用了<code>(?=;)</code>意为先行断言，表示只匹配在<code>;</code>之前的内容，但是不包括<code>;</code>。关于更多先行断言，请看下文。</p>
<h4>search()</h4>
<p><code>search</code>方法，返回第一个满足条件的匹配结果(可直接使用字符串，不一定是正则对象)在整个字符串中的位置。如果没有任何匹配，则返回<code>-1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var nowDateStr = '2016-11-1';
var testReg = /-/g;

nowDateStr.search(testReg); // 4
// 再次查找还是4
nowDateStr.search(testReg); // 4

//  检查lastIndex 并设置 
testReg.lastIndex; // 0
testReg.lastIndex = 6;
nowDateStr.search(testReg); // 4  结果仍为4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> nowDateStr = <span class="hljs-string">'2016-11-1'</span>;
<span class="hljs-keyword">var</span> testReg = <span class="hljs-regexp">/-/g</span>;

nowDateStr.search(testReg); <span class="hljs-comment">// 4</span>
<span class="hljs-comment">// 再次查找还是4</span>
nowDateStr.search(testReg); <span class="hljs-comment">// 4</span>

<span class="hljs-comment">//  检查lastIndex 并设置 </span>
testReg.lastIndex; <span class="hljs-comment">// 0</span>
testReg.lastIndex = <span class="hljs-number">6</span>;
nowDateStr.search(testReg); <span class="hljs-comment">// 4  结果仍为4</span></code></pre>
<blockquote><p><code>search</code>方法<strong>总是</strong>从字符串的<strong>开始位置</strong>查找，与正则表达式的<code>g</code>修饰符和<code>lastIndex</code>属性无关。</p></blockquote>
<h4>replace()</h4>
<p><code>replace</code>方法可以替换匹配的值，返回替换后的新字符串。它接受两个参数，第一个是搜索模式(可直接使用字符串，不一定是正则对象)，第二个是替换的内容(可使用字符串或一个函数)。搜索模式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。</p>
<p>其中<code>replace</code>方法的第二个参数可以使用美元符号$，用来指代所替换的内容，具体如下所示:</p>
<ul>
<li><p><code>$&amp;</code> 指代匹配的子字符串。</p></li>
<li><p><code>$`</code> 指代匹配结果前面的文本。</p></li>
<li><p><code>$'</code> 指代匹配结果后面的文本。</p></li>
<li><p><code>$n</code> 指代匹配成功的第n组内容，n是从1开始的自然数。</p></li>
<li><p><code>$$</code> 指代美元符号$。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var re = /-/g; 
var str = '2016-11-01';
var newstr = str.replace(re,'.');
console.log(newstr);  // &quot;2016.11.01&quot;

'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1');
// &quot;world hello&quot;

'abc'.replace('b', '[$`-$&amp;-$\']');
// &quot;a[a-b-c]c&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/-/g</span>; 
<span class="hljs-keyword">var</span> str = <span class="hljs-string">'2016-11-01'</span>;
<span class="hljs-keyword">var</span> newstr = str.replace(re,<span class="hljs-string">'.'</span>);
<span class="hljs-built_in">console</span>.log(newstr);  <span class="hljs-comment">// "2016.11.01"</span>

<span class="hljs-string">'hello world'</span>.replace(<span class="hljs-regexp">/(\w+)\s(\w+)/</span>, <span class="hljs-string">'$2 $1'</span>);
<span class="hljs-comment">// "world hello"</span>

<span class="hljs-string">'abc'</span>.replace(<span class="hljs-string">'b'</span>, <span class="hljs-string">'[$`-$&amp;-$\']'</span>);
<span class="hljs-comment">// "a[a-b-c]c"</span></code></pre>
<p>第二个参数为函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toCamelStyle(str) {
    // 匹配-以及之后的一个字符，其中这个字符在一个分组内
    var camelRegExp = /-([a-z])/ig;

    return str.replace(camelRegExp, function(all, letter) {
        // all为匹配到的内容，letter为组匹配        
        return letter.toUpperCase();
    });
}

toCamelStyle('margin-left'); // &quot;marginLeft&quot;
toCamelStyle('aa-bb-cccc'); // &quot;aaBbCccc&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toCamelStyle</span>(<span class="hljs-params">str</span>) </span>{
    <span class="hljs-comment">// 匹配-以及之后的一个字符，其中这个字符在一个分组内</span>
    <span class="hljs-keyword">var</span> camelRegExp = <span class="hljs-regexp">/-([a-z])/ig</span>;

    <span class="hljs-keyword">return</span> str.replace(camelRegExp, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">all, letter</span>) </span>{
        <span class="hljs-comment">// all为匹配到的内容，letter为组匹配        </span>
        <span class="hljs-keyword">return</span> letter.toUpperCase();
    });
}

toCamelStyle(<span class="hljs-string">'margin-left'</span>); <span class="hljs-comment">// "marginLeft"</span>
toCamelStyle(<span class="hljs-string">'aa-bb-cccc'</span>); <span class="hljs-comment">// "aaBbCccc"</span></code></pre>
<p>以上代码展示通过正则将<code>aa-bb-cccc</code>这样的字符串转化为<code>aaBbCccc</code> 这种形式。<code>replace</code>回调函数接收两个参数，第一个为匹配到的内容，第二个为匹配到的分组，有多少组就可以传多少个参数，在此之后还可以有两个参数，一个为匹配到内容在原字符串的位置，另一个是原字符串。</p>
<h4>split()</h4>
<p><code>split</code>方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。该方法接受两个参数，第一个参数是分隔规则(可直接使用字符串，不一定是正则对象)，第二个参数是返回数组的最大成员数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'2016-11-01'.split('-'); // [&quot;2016&quot;, &quot;11&quot;, &quot;01&quot;]
'2016-11-01'.split(/-/); // [&quot;2016&quot;, &quot;11&quot;, &quot;01&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-string">'2016-11-01'</span>.split(<span class="hljs-string">'-'</span>); <span class="hljs-comment">// ["2016", "11", "01"]</span>
<span class="hljs-string">'2016-11-01'</span>.split(<span class="hljs-regexp">/-/</span>); <span class="hljs-comment">// ["2016", "11", "01"]</span></code></pre>
<h2 id="articleHeader9">贪婪模式和懒惰模式</h2>
<p>当正则表达式中包含能接受重复的限定符时，通常的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符，称之为<strong>贪婪模式</strong>。</p>
<p>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = 'aaa';
s.match(/a+/); // [&quot;aaa&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> s = <span class="hljs-string">'aaa'</span>;
s.match(<span class="hljs-regexp">/a+/</span>); <span class="hljs-comment">// ["aaa"]</span></code></pre>
<p>有时，我们更需要懒惰匹配，也就是匹配尽可能少的字符。前面给出的限定符都可以被转化为懒惰匹配模式，只要在它后面加上一个问号?。这样.*?就意味着匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = 'aaa';
s.match(/a+?/); // [&quot;a&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> s = <span class="hljs-string">'aaa'</span>;
s.match(<span class="hljs-regexp">/a+?/</span>); <span class="hljs-comment">// ["a"]</span></code></pre>
<p>以下是一些说明</p>
<ul>
<li><p><code>*?</code> 重复任意次，但尽可能少重复</p></li>
<li><p><code>+?</code> 重复1次或更多次，但尽可能少重复</p></li>
<li><p><code>??</code> 重复0次或1次，但尽可能少重复</p></li>
<li><p><code>{n,m}?</code> 重复n到m次，但尽可能少重复</p></li>
<li><p><code>{n,}?</code> 重复n次以上，但尽可能少重复</p></li>
</ul>
<p>也就是说默认情况下，都是贪婪模式，加上一个<code>？</code>时就转化为了懒惰模式，也称非贪婪模式。</p>
<h2 id="articleHeader10">组匹配</h2>
<p>通常一个<code>()</code>中的内容就构成了一个分组，此分组内容将被存储，可在之后的正则表达式(使用<code>\1-\9</code>)和相关方法中(使用<code> $1-$9</code>)引用，前面已经介绍过了，就不再说了。</p>
<p>关于组匹配，还有以下几种情况:</p>
<h3 id="articleHeader11">非捕获组</h3>
<p><code>(?:x)</code> 称为非捕获组（Non-capturing group），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正常匹配
var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// [&quot;http://google.com/&quot;, &quot;http&quot;, &quot;google.com&quot;, &quot;/&quot;]

// 非捕获组匹配
var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// [&quot;http://google.com/&quot;, &quot;google.com&quot;, &quot;/&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-comment">// 正常匹配</span>
<span class="hljs-keyword">var</span> url = <span class="hljs-regexp">/(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/</span>;

url.exec(<span class="hljs-string">'http://google.com/'</span>);
<span class="hljs-comment">// ["http://google.com/", "http", "google.com", "/"]</span>

<span class="hljs-comment">// 非捕获组匹配</span>
<span class="hljs-keyword">var</span> url = <span class="hljs-regexp">/(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/</span>;

url.exec(<span class="hljs-string">'http://google.com/'</span>);
<span class="hljs-comment">// ["http://google.com/", "google.com", "/"]</span></code></pre>
<blockquote><p>之后<strong>先行断言</strong>和<strong>先行否定断言</strong>也都是非捕获组</p></blockquote>
<h3 id="articleHeader12">先行断言</h3>
<p><code>x(?=y)</code>称为先行断言（Positive look-ahead），<code>x</code>只有在<code>y</code>前面才匹配，<code>y</code>不会被计入返回结果。</p>
<p>比如之前匹配ip的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ipLastReg = /\d+(?=;)/g;
var ipsStr = '192.168.118.47;192.168.118.46;192.168.118.48;';

ipsStr.match(ipLastReg); // [&quot;47&quot;, &quot;46&quot;, &quot;48&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> ipLastReg = <span class="hljs-regexp">/\d+(?=;)/g</span>;
<span class="hljs-keyword">var</span> ipsStr = <span class="hljs-string">'192.168.118.47;192.168.118.46;192.168.118.48;'</span>;

ipsStr.match(ipLastReg); <span class="hljs-comment">// ["47", "46", "48"]</span></code></pre>
<p>上面正则对象中<code>(?=;)</code>就表示只匹配在<code>;</code>之前的内容，但是不包括<code>;</code>。</p>
<h3 id="articleHeader13">先行否定断言</h3>
<p><code>x(?!y)</code>称为先行否定断言（Negative look-ahead），<code>x</code>只有不在<code>y</code>前面才匹配，<code>y</code>不会被计入返回结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xreg = /\d+(?!%)/g ;
xreg.exec('100% is 1'); // [&quot;10&quot;]
xreg.exec('100% is 1'); // [&quot;1&quot;]
/\d+?(?!%)/.exec('100% is 1'); // [&quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> xreg = <span class="hljs-regexp">/\d+(?!%)/g</span> ;
xreg.exec(<span class="hljs-string">'100% is 1'</span>); <span class="hljs-comment">// ["10"]</span>
xreg.exec(<span class="hljs-string">'100% is 1'</span>); <span class="hljs-comment">// ["1"]</span>
/\d+?(?!%)/.exec(<span class="hljs-string">'100% is 1'</span>); <span class="hljs-comment">// ["1"]</span></code></pre>
<p>上面代码表示匹配不在<code>%</code>前的数字，<code>xreg</code>中直接书写的<code>\d+</code> 表示贪婪模式，因此第一次匹配到的是10，第二次才会匹配到后面的1，因为作为数字10本身也不在<code>%</code>前面，正则不会将100当成一个整体(注意:这里需要定义一个正则对象来调用，直接以字面量形式的正则调用时，每次调用都是一个新对象，结果始终是<code>10</code>)。</p>
<p><del>为了一次匹配到最后的<code>1</code>，我们在<code>\d+</code>之后加一个<code>?</code>将其转为<strong>非贪婪模式</strong>即可。</del></p>
<p>为了一次匹配到前面<code>100</code>中的<code>1</code>，我们在<code>\d+</code>之后加一个<code>?</code>将其转为<strong>非贪婪模式</strong>即可。</p>
<blockquote><p>ES6之前，<code>JavaScript</code>中不支持<strong>后行断言</strong>和<strong>否定后行断言</strong>，ES6中添加了对此的支持，请看之后的ES扩展部分。</p></blockquote>
<h2 id="articleHeader14">ES6扩展</h2>
<h3 id="articleHeader15">构造函数</h3>
<p>RegExp构造函数的参数有两种情况。</p>
<ul>
<li><p>第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。</p></li>
<li><p>第二种情况是，参数是一个正则表示式，此时不能有第二个参数，会返回一个原有正则表达式的拷贝。</p></li>
</ul>
<p><strong>ES6</strong> 针对第二种情况，允许传入第二个参数，用于设置第一个参数正则表达式的修饰符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var regex = new RegExp(/xyz/, 'i'); // ES6之前 语法错误

new RegExp(/abc/ig, 'i'); // ES6中结果为: /abc/i  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> regex = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/xyz/</span>, <span class="hljs-string">'i'</span>); <span class="hljs-comment">// ES6之前 语法错误</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/abc/ig</span>, <span class="hljs-string">'i'</span>); <span class="hljs-comment">// ES6中结果为: /abc/i  </span>
</code></pre>
<h3 id="articleHeader16">字符串的正则方法</h3>
<p>字符串对象共有4个方法，可以使用正则表达式：<code>match()</code>、<code>replace()</code>、<code>search()</code>和<code>split()</code>。</p>
<p>ES6将这4个方法，在语言内部全部调用<code>RegExp</code>的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。</p>
<h3 id="articleHeader17">修饰符</h3>
<p>ES6对正则表达式添加了<code>u</code>修饰符，含义为“<code>Unicode</code>模式”，用来正确处理大于uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。</p>
<p>ES6还为正则表达式添加了<code>y</code>修饰符，叫做“粘连”（<code>sticky</code>）修饰符。</p>
<p><code>y</code>修饰符的作用与<code>g</code>修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，<code>g</code>修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

// 第一次都能正确匹配
r1.exec(s); // [&quot;aaa&quot;]
r2.exec(s); // [&quot;aaa&quot;]

// 第二次结果就不一致了
r1.exec(s); // [&quot;aa&quot;]
r2.exec(s); // null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-keyword">var</span> s = <span class="hljs-string">'aaa_aa_a'</span>;
<span class="hljs-keyword">var</span> r1 = <span class="hljs-regexp">/a+/g</span>;
<span class="hljs-keyword">var</span> r2 = <span class="hljs-regexp">/a+/y</span>;

<span class="hljs-comment">// 第一次都能正确匹配</span>
r1.exec(s); <span class="hljs-comment">// ["aaa"]</span>
r2.exec(s); <span class="hljs-comment">// ["aaa"]</span>

<span class="hljs-comment">// 第二次结果就不一致了</span>
r1.exec(s); <span class="hljs-comment">// ["aa"]</span>
r2.exec(s); <span class="hljs-comment">// null</span></code></pre>
<p>个人理解，<code>\y</code>是类似于在每次匹配时隐式地添加了<code>^</code>，表示开始位置。</p>
<h3 id="articleHeader18">属性</h3>
<p>ES5中，正则对象存在<code>source</code>属性，用于返回正则表达式本身。</p>
<p>ES6中，又添加了<code>flags</code>属性，用于返回正则对象的所有修饰符。</p>
<h3 id="articleHeader19">后行断言</h3>
<p>后行断言于先行断言相反。例如<code>/(?&lt;=y)x/</code> 表示匹配<code>x</code>，但是要求<code>x</code>必须在<code>y</code>后面。</p>
<p>同理 后行否定断言则为:<code>/(?&lt;!=y)x/</code> 表示匹配<code>x</code>，但是要求<code>x</code>不能在<code>y</code>后面。</p>
<blockquote><p>需要注意的是，存在后行断言时，正则执行顺序发生了改变，会先匹配后行断言的这部分，再匹配其他的的，顺序变成了从右向左。因此一些匹配操作的结果可能大不一致，而且正则中的<code>\1-\9</code>的引用顺序也会发生变化。</p></blockquote>
<h2 id="articleHeader20">参考链接</h2>
<ul>
<li><p><a href="http://es6.ruanyifeng.com/#docs/regex" rel="nofollow noreferrer" target="_blank"> ES6入门 - 正则表达式 </a></p></li>
<li><p><a href="http://javascript.ruanyifeng.com/stdlib/regexp.html#toc4" rel="nofollow noreferrer" target="_blank"> JavaScript RegExp </a></p></li>
<li><p><a href="http://deerchao.net/tutorials/regex/regex.htm" rel="nofollow noreferrer" target="_blank"> 正则表达式30分钟入门教程 </a></p></li>
</ul>
<p>原文发表在我的博客<a href="http://blog.cdswyda.com/post/javascript/2016-11-01-regexp" rel="nofollow noreferrer" target="_blank">JavaScript正则表达式RegExp</a>，欢迎访问！</p>
<h2 id="articleHeader21">错误修正</h2>
<p><strong> 先行否定断言中 </strong></p>
<p><del>为了一次匹配到最后的<code>1</code>，我们在<code>\d+</code>之后加一个<code>?</code>将其转为<strong>非贪婪模式</strong>即可。</del></p>
<p>为了一次匹配到前面<code>100</code>中的<code>1</code>，我们在<code>\d+</code>之后加一个<code>?</code>将其转为<strong>非贪婪模式</strong>即可。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript正则表达式RegExp

## 原文链接
[https://segmentfault.com/a/1190000008812676](https://segmentfault.com/a/1190000008812676)

