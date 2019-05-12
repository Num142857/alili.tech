---
title: 'JavaScript 类型转换深度学习' 
date: 2019-02-01 2:30:10
hidden: true
slug: fwosouhbhmj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVEWkS?w=3376&amp;h=1312" src="https://static.alili.tech/img/bVEWkS?w=3376&amp;h=1312" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>JavaScript 是一门弱类型语言，刚接触的时候感觉方便快捷（不需要声明变量类型了耶！），接触久了会发现它带来的麻烦有的时候不在预期之内</p>
<p>呵呵一笑，哪有这么夸张，可能有人看过这样一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+(![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]+(![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+![]+[![]]+([]+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]])()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+(![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]+(![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+![]+[![]]+([]+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]])()</code></pre>
<p>这个占了好大的篇幅哈 3167 个字符，粘贴到浏览器的 Console 控制台，直接弹出了 orange，随叫随到有不有</p>
<p>对于不知道原理出处的给大家一个地址：<a href="http://www.jsfuck.com/" rel="nofollow noreferrer" target="_blank">http://www.jsfuck.com/</a></p>
<p>JSFuck 的变态程度达到了极致，因为它的理念是 Write any JavaScript with 6 Characters: <code>[]()!+</code></p>
<p>或许又有人说：这个只是搞怪的吧，实际谁这么写代码啊</p>
<p>说的没错，当一段代码变得晦涩难懂的时候，甚至到上文的混乱字符（天书），却能实现任意功能这就变得不可预期，也就是说 JS 代码的安全性没有保障</p>
<p>当然本文不会研究这些无意义的字符原理是怎么实现的因为人家的 Github 文档已经描述的特别全面了，感兴趣的可以研究下：<a href="https://github.com/aemkei/jsfuck" rel="nofollow noreferrer" target="_blank">https://github.com/aemkei/jsfuck</a></p>
<p>我们聊一聊每天能看到用到的方法底层是怎么解析的，熟知转换分成两种一种是隐式转换，另一种是强制的类型转换</p>
<h2 id="articleHeader0">隐式转换</h2>
<p>当遇到以下几种情况，JavaScript会自动转换数据类型：</p>
<ul>
<li>不同类型的数据进行互相运算</li>
<li>对非布尔值类型的数据求布尔值</li>
<li>对非数值类型的数据使用一元运算符（即 "+" 和 "-"）</li>
</ul>
<h3 id="articleHeader1">隐式转换为 Boolean</h3>
<p>大多数在做 if 判断时会用到，这里只需记住六个转换为 false，其它全部为 true</p>
<ul>
<li>null</li>
<li>undefined</li>
<li>NaN</li>
<li>''</li>
<li>-0</li>
<li>+0</li>
</ul>
<h3 id="articleHeader2">隐式转换为 String</h3>
<p>字符串的自动转换，主要发生在加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'1' + 2  // '12'
'1' + true  // &quot;1true&quot;
'1' + false  // &quot;1false&quot;
'1' + {}  // &quot;1[object Object]&quot;
'1' + []  // &quot;1&quot;
'1' + function (){}  // &quot;1function (){}&quot;
'1' + undefined  // &quot;1undefined&quot;
'1' + null  // &quot;1null&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'1'</span> + <span class="hljs-number">2</span>  <span class="hljs-comment">// '12'</span>
<span class="hljs-string">'1'</span> + <span class="hljs-literal">true</span>  <span class="hljs-comment">// "1true"</span>
<span class="hljs-string">'1'</span> + <span class="hljs-literal">false</span>  <span class="hljs-comment">// "1false"</span>
<span class="hljs-string">'1'</span> + {}  <span class="hljs-comment">// "1[object Object]"</span>
<span class="hljs-string">'1'</span> + []  <span class="hljs-comment">// "1"</span>
<span class="hljs-string">'1'</span> + <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{}  <span class="hljs-comment">// "1function (){}"</span>
<span class="hljs-string">'1'</span> + <span class="hljs-literal">undefined</span>  <span class="hljs-comment">// "1undefined"</span>
<span class="hljs-string">'1'</span> + <span class="hljs-literal">null</span>  <span class="hljs-comment">// "1null"</span></code></pre>
<h3 id="articleHeader3">隐式转换为 Number</h3>
<p>除了加法运算符有可能把运算子转为字符串，其他运算符都会把两侧的运算子自动转成数值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'5' - '2'  // 3
'5' * '2'  // 10
true - 1  // 0
false - 1  // -1
'1' - 1  // 0
'5' * []  // 0
false / '5'  // 0
'abc' - 1  // NaN
+'abc'  // NaN
-'abc'  // NaN
+true  // 1
-false  // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'5'</span> - <span class="hljs-string">'2'</span>  <span class="hljs-comment">// 3</span>
<span class="hljs-string">'5'</span> * <span class="hljs-string">'2'</span>  <span class="hljs-comment">// 10</span>
<span class="hljs-literal">true</span> - <span class="hljs-number">1</span>  <span class="hljs-comment">// 0</span>
<span class="hljs-literal">false</span> - <span class="hljs-number">1</span>  <span class="hljs-comment">// -1</span>
<span class="hljs-string">'1'</span> - <span class="hljs-number">1</span>  <span class="hljs-comment">// 0</span>
<span class="hljs-string">'5'</span> * []  <span class="hljs-comment">// 0</span>
<span class="hljs-literal">false</span> / <span class="hljs-string">'5'</span>  <span class="hljs-comment">// 0</span>
<span class="hljs-string">'abc'</span> - <span class="hljs-number">1</span>  <span class="hljs-comment">// NaN</span>
+<span class="hljs-string">'abc'</span>  <span class="hljs-comment">// NaN</span>
-<span class="hljs-string">'abc'</span>  <span class="hljs-comment">// NaN</span>
+<span class="hljs-literal">true</span>  <span class="hljs-comment">// 1</span>
-<span class="hljs-literal">false</span>  <span class="hljs-comment">// 0</span></code></pre>
<blockquote>隐式转换的基础表现都在这了，强调的是这些转换的背后都伴随着强制转换，使用 Boolean、Number 和 String，下面重点讲一下强制转换的原理</blockquote>
<h2 id="articleHeader4">强制转换</h2>
<p>看到上面例子也许你已经有些许疑问了，比如上面的这个 <code>'1' + {}</code> 怎么就输出 <code>1[object Object]</code> 了呢</p>
<p>如上面强调的，你会猜测首先执行 <code>String({})</code> 得到 <code>"[object Object]"</code> ，然后再字符串拼接，是的我们总能得到转换背后的实现原理，其实真实原理要比这个复杂，见下文</p>
<h3 id="articleHeader5">强制转换为 Boolean</h3>
<p>这里略过因为与隐式转换相同，切记 <code>[]、{}</code> 都转换成 true</p>
<h3 id="articleHeader6">强制转换为 String</h3>
<p>基本类型的转换结果与隐式转换相同，这里说一下对象的转换，加深上面引用例子的解析</p>
<p>对象转换字符串分成三步</p>
<ol>
<li>先调用toString方法，如果toString方法返回的是原始类型的值，则对该值使用String方法，不再进行以下步骤</li>
<li>如果toString方法返回的是复合类型的值，再调用valueOf方法，如果valueOf方法返回的是原始类型的值，则对该值使用String方法，不再进行以下步骤</li>
<li>如果valueOf方法返回的是复合类型的值，则报错</li>
</ol>
<p>再分解这个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String({})
// &quot;[object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">String</span>({})
<span class="hljs-comment">// "[object Object]"</span></code></pre>
<p>上面代码相当于下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String({}.toString())
// &quot;[object Object]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">String</span>({}.toString())
<span class="hljs-comment">// "[object Object]"</span></code></pre>
<p>如果 toString 方法和 valueOf 方法，返回的都不是原始类型的值，则 String 方法报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  valueOf: function () {
    console.log(&quot;valueOf&quot;);
    return {};
  },
  toString: function () {
    console.log(&quot;toString&quot;);
    return {};
  }
};

String(obj)
// TypeError: Cannot convert object to primitive value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"valueOf"</span>);
    <span class="hljs-keyword">return</span> {};
  },
  <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"toString"</span>);
    <span class="hljs-keyword">return</span> {};
  }
};

<span class="hljs-built_in">String</span>(obj)
<span class="hljs-comment">// TypeError: Cannot convert object to primitive value</span></code></pre>
<p>我们不难看出可以对 toString 方法和 valueOf 方法进行改写，测试其先后运行的顺序也简单的多</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String({toString:function(){return 3;"}}")
// &quot;3&quot;

String({valueOf:function (){return 2;"}}")
// &quot;[object Object]&quot;

String({valueOf:function (){return 2;},toString:function(){return 3;"}}")
// &quot;3&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">String</span>({<span class="hljs-attr">toString</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;"}}")
<span class="hljs-comment">// "3"</span>

<span class="hljs-built_in">String</span>({<span class="hljs-attr">valueOf</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;"}}")
<span class="hljs-comment">// "[object Object]"</span>

<span class="hljs-built_in">String</span>({<span class="hljs-attr">valueOf</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;},<span class="hljs-attr">toString</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;"}}")
<span class="hljs-comment">// "3"</span></code></pre>
<p>结果表示toString方法先于valueOf方法执行</p>
<h3 id="articleHeader7">强制转换为 Number</h3>
<p>基本类型转换如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(&quot;123&quot;) // 123

Number(&quot;123abc&quot;) // NaN

Number(&quot;&quot;) // 0

Number(false) // 0

Number(undefined) // NaN

Number(null) // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Number</span>(<span class="hljs-string">"123"</span>) <span class="hljs-comment">// 123</span>

<span class="hljs-built_in">Number</span>(<span class="hljs-string">"123abc"</span>) <span class="hljs-comment">// NaN</span>

<span class="hljs-built_in">Number</span>(<span class="hljs-string">""</span>) <span class="hljs-comment">// 0</span>

<span class="hljs-built_in">Number</span>(<span class="hljs-literal">false</span>) <span class="hljs-comment">// 0</span>

<span class="hljs-built_in">Number</span>(<span class="hljs-literal">undefined</span>) <span class="hljs-comment">// NaN</span>

<span class="hljs-built_in">Number</span>(<span class="hljs-literal">null</span>) <span class="hljs-comment">// 0</span></code></pre>
<p>对象转换一样要复杂些，与 String 唯一不同的就是 valueOf 方法在前， toString 方法在后，其它不赘述见上文例子。</p>
<p>isNaN() 并不陌生，<code>isNaN({}) //true</code> 的内在转换过程是相同的</p>
<h2 id="articleHeader8">总结</h2>
<p>其它的转换原则还有很多，看到这我们还是不能解释文章开始的代码转换的过程，掌握这些更多是保证正常书写代码规避错误的发生，十分好奇的可以研究下比较特殊的转化原则，还有好多好多。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 类型转换深度学习

## 原文链接
[https://segmentfault.com/a/1190000007334978](https://segmentfault.com/a/1190000007334978)

