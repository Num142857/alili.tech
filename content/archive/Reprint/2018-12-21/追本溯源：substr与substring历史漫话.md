---
title: '追本溯源：substr与substring历史漫话' 
date: 2018-12-21 2:30:10
hidden: true
slug: jfhfmp919vf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>引子： 很多时候，当我要字符串截取时，我会想到substr和substring的方法，但是具体要怎么传参数时，我总是记不住。哪个应该传个字符串长度，哪个又应该传个开始和结尾的下标，如果我不去查查这两个函数，我始终不敢去使用它们。所以我总是觉得，这个两个方法名起的真是蹩脚。然而事实是这样的吗？</blockquote>
<p><code>看来是时候扒一扒这两个方法的历史了。</code></p>
<h1 id="articleHeader0">1 基因追本溯源</h1>
<p><span class="img-wrap"><img data-src="/img/bV0ROK?w=700&amp;h=218" src="https://static.alili.tech/img/bV0ROK?w=700&amp;h=218" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在编程语言的历史长河中，曾经出现过很多编程语言。然而大浪淘沙，铅华洗尽之后，很多早已折戟沉沙，有些却依旧光彩夺目。那么stubstr与substring的DNA究竟来自何处？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012562186?w=1192&amp;h=1256" src="https://static.alili.tech/img/remote/1460000012562186?w=1192&amp;h=1256" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>1950与1960年代</blockquote>
<ul>
<li>1954 - FORTRAN</li>
<li>1958 - LISP</li>
<li>1959 - COBOL</li>
<li>1964 - BASIC</li>
<li>1970 - Pascal</li>
</ul>
<blockquote>1967-1978：确立了基础范式</blockquote>
<ul>
<li>1972 - <code>C语言</code>
</li>
<li>1975 - Scheme</li>
<li>1978 - SQL (起先只是一种查询语言，扩充之后也具备了程序结构)</li>
</ul>
<blockquote>1980年代：增强、模块、性能</blockquote>
<ul>
<li>1983 - <code>C++ (就像有类别的C)</code>
</li>
<li>1988 - Tcl</li>
</ul>
<blockquote>1990年代：互联网时代</blockquote>
<ul>
<li>1991 - <code>Python</code>
</li>
<li>1991 - Visual Basic</li>
<li>1993 - <code>Ruby</code>
</li>
<li>1995 - <code>Java</code>
</li>
<li>1995 - Delphi (Object Pascal)</li>
<li>1995 - <code>JavaScript</code>
</li>
<li>1995 - <code>PHP</code>
</li>
<li>2009 - <code>Go</code>
</li>
<li>2014 - <code>Swift (编程语言)</code>
</li>
</ul>
<h2 id="articleHeader1">1.1 在C++中首次出现substr()</h2>
<p><span class="img-wrap"><img data-src="/img/bV0RPk?w=540&amp;h=540" src="https://static.alili.tech/img/bV0RPk?w=540&amp;h=540" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在c语言中，并没有出现substr或者substring方法。然而在1983，substr()方法已经出现在C++语言中了。然而这时候还没有出现substring, 所以可以见得：<code>substr是stustring的老大哥</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="string substr (size_t pos = 0, size_t len = npos) const;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-built_in">string</span> <span class="hljs-title">substr</span> <span class="hljs-params">(<span class="hljs-keyword">size_t</span> pos = <span class="hljs-number">0</span>, <span class="hljs-keyword">size_t</span> len = npos)</span> <span class="hljs-keyword">const</span></span>;</code></pre>
<p>从C++的方法定义中可以看到, <code>substr的参数是开始下标，以及字符串长度。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  std::string str=&quot;We think in generalities, but we live in details.&quot;;
  std::string str2 = str.substr (3,5);     // &quot;think&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>  <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> str=<span class="hljs-string">"We think in generalities, but we live in details."</span>;
  <span class="hljs-built_in">std</span>::<span class="hljs-built_in">string</span> str2 = str.substr (<span class="hljs-number">3</span>,<span class="hljs-number">5</span>);     <span class="hljs-comment">// "think"</span></code></pre>
<h2 id="articleHeader2">1.2 在Java中首次出现substring()</h2>
<p><span class="img-wrap"><img data-src="/img/bV0RPE?w=512&amp;h=512" src="https://static.alili.tech/img/bV0RPE?w=512&amp;h=512" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>距离substr()方法出现已经有了将近十年之隔，此间涌现一批后起之秀，如: Python, Ruby, VB之类，然而他们之中并没有stustring的基因，在Java的String类中，我们看到两个方法。从这两个方法之中我们可以看到：substring方法基本原型的参数是开始和结束的下标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String substring(int beginIndex) // 返回一个新的字符串，它是此字符串的一个子字符串。

String substring(int beginIndex, int endIndex)
// 返回一个新字符串，它是此字符串的一个子字符串。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">String</span> substring(<span class="hljs-keyword">int</span> beginIndex) <span class="hljs-comment">// 返回一个新的字符串，它是此字符串的一个子字符串。</span>

<span class="hljs-keyword">String</span> substring(<span class="hljs-keyword">int</span> beginIndex, <span class="hljs-keyword">int</span> endIndex)
<span class="hljs-comment">// 返回一个新字符串，它是此字符串的一个子字符串。</span></code></pre>
<h1 id="articleHeader3">1.3 JavaScript的历史继承</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012560954?w=1600&amp;h=700" src="https://static.alili.tech/img/remote/1460000012560954?w=1600&amp;h=700" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>1995年，网景公司招募了Brendan Eich，目的是将Scheme编程语言嵌入到Netscape Navigator中。在开始之前，Netscape Communications与Sun Microsystems公司合作，在Netscape Navigator中引入了更多的静态编程语言Java，以便与微软竞争用户采用Web技术和平台。网景公司决定，他们想创建的脚本语言将补充Java，并且应该有一个类似的语法，排除采用Perl，Python，TCL或Scheme等其他语言。为了捍卫对竞争性提案的JavaScript的想法，公司需要一个原型。 1995年5月，Eich在10天内写完。</blockquote>
<p>上帝用七天时间创造万物, Brendan Eich用10天时间创造了一门语言。或许用创造并不合适，因为JavaScript是站在了Perl，Python，TCL或Scheme等其他巨人的肩膀上而产生的。</p>
<p>JavaScript并不像C那样出身名门，在贝尔实验室精心打造，但是JavaScript在往后的<code>自然选择</code>中，并没有因此萧条，反而借助于C,C++, Java, Perl，Python，TCL, Scheme优秀基因，进化出更加强大强大的生命力。</p>
<p>因此可以想象，在10天之内，当Brendan Eich写到String的substr和substring方法时，或许他并没困惑着两个方法的参数应该如何设置，<code>因为在C++和Java的实现中，已经有了类似的定义。</code> 如果你了解历史，你就不会困惑现在。</p>
<h1 id="articleHeader4">2 所以，substr和substring究竟有什么不同？</h1>
<p>如下图所示：substr和substring都接受两个参数，他们的第一个参数的含义是相同的，<code>不同的是第二个参数。substr的第二个参数是到达结束点的距离，substring是结束的位置。</code></p>
<p><span class="img-wrap"><img data-src="/img/bV0ROv?w=1440&amp;h=1080" src="https://static.alili.tech/img/bV0ROv?w=1440&amp;h=1080" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader5">3 参考文献</h1>
<ul>
<li><a href="https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80%E6%AD%B7%E5%8F%B2" rel="nofollow noreferrer" target="_blank">维基百科：程式語言歷史</a></li>
<li><a href="http://www.cplusplus.com/reference/string/string/substr/" rel="nofollow noreferrer" target="_blank">C++ std::string::substr</a></li>
<li><a href="https://en.wikipedia.org/wiki/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript</a></li>
</ul>
<p>如有不正确的地方，欢迎指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
追本溯源：substr与substring历史漫话

## 原文链接
[https://segmentfault.com/a/1190000012560949](https://segmentfault.com/a/1190000012560949)

