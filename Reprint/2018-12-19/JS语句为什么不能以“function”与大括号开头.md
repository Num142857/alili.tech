---
title: 'JS语句为什么不能以“function”与大括号开头' 
date: 2018-12-19 2:30:07
hidden: true
slug: 0pf15wixaew
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>前段时间调试代码，查看对象的toString的返回数据，由于比较简单，直接在浏览器的控制台输出代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{}.toString();    // Uncaught SyntaxError: Unexpected token ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{}.toString();    <span class="hljs-comment">// Uncaught SyntaxError: Unexpected token .</span></code></pre>
<p>“.”不是期待的表达式，{}在JS中不是一个再正常不过的对象么,于是试了一下其他对象类型数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].toString();    // &quot;&quot;
function(){}.toString();    // Uncaught SyntaxError: Unexpected token (
/^\.$/.toString();    // &quot;/^\.$/&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[].toString();    <span class="hljs-comment">// ""</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}.toString();    <span class="hljs-comment">// Uncaught SyntaxError: Unexpected token (</span>
/^\.$/.toString();    <span class="hljs-comment">// "/^\.$/"</span></code></pre>
<p>查资料看了一下，总的来说涉及到JS这门语言设计的几个概念：语句、函数声明、语句块等</p>
<h3 id="articleHeader1">语句</h3>
<blockquote>JS中，应用程序是由许多<strong>语法正确</strong>的语句组成的，语句的作用就是告诉浏览器应该怎样执行程序。语句之间使用“；”作为结尾，其中主要包括表达式语句、块语句、空语句和声明语句，这里不细讲。</blockquote>
<p>注意上面一段话中的<strong>语法正确</strong>一词，在前言的demo代码中，数组和正则表达式可以正常调用的，但是对象和方法类型调用却是失败的，网上大部分答案回答都比较浅显：”JS中语句不能以function或者大括号作为开始，会报错“。对于这句话，只能说对错一半吧！</p>
<p>先来说一下为什么语句不能以”function“开始，这里涉及到函数声明的概念。</p>
<h3 id="articleHeader2">函数声明</h3>
<blockquote>函数声明：定义一个具有指定参数的函数，以function开头， 其中包括函数名，参数名，和函数语句块</blockquote>
<p>举个栗子?:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function funcName(arg1, arg2) {
    // 语句块
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcName</span>(<span class="hljs-params">arg1, arg2</span>) </span>{
    <span class="hljs-comment">// 语句块</span>
}</code></pre>
<p>我们代码中调用toString方法”function(){}.toString“,是以”function“开头的， JS中会将以”function“ 开头的语句认定为函数声明语句，那么代码必须符合函数声明语句规范，很明显”function“后未包括函数名，这条函数声明语句明显不符合规范。</p>
<p>正确的做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以”(“开头的语句JS并不会将其视作函数声明
(function(){}).toString();
// 匿名函数
(function(){})()
// 匿名函数装B一点的写法
void function(){}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 以”(“开头的语句JS并不会将其视作函数声明</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}).toString();
<span class="hljs-comment">// 匿名函数</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{})()
<span class="hljs-comment">// 匿名函数装B一点的写法</span>
<span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}()</code></pre>
<p>非函数申明代码不可以“function”作为语句开头，那大括号又是怎么回事呢。</p>
<h3 id="articleHeader3">语句块</h3>
<blockquote>将零个或多个语句联合在一起，形成一条复合语句，用大括号将其包括</blockquote>
<p>有的文档上叫“块语句”，也有人的文档上叫复合语句，举个栗子?，我们可以这样写代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    console.info('输出一个语句');
    console.info('不出错，是不是很神奇');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'输出一个语句'</span>);
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'不出错，是不是很神奇'</span>);
};</code></pre>
<p>也就是说如果我们以大括号开头，浏览器会理解将其视作一个语句块，语句块中的代码和外面的代码并没有本质的区别，也是从上至下而执行。再看个栗子?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{};    // undefined
{a: 'a'};    // 'a';
{a: 'a'}.a;    // Uncaught SyntaxError: Unexpected token ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{};    <span class="hljs-comment">// undefined</span>
{<span class="hljs-attr">a</span>: <span class="hljs-string">'a'</span>};    <span class="hljs-comment">// 'a';</span>
{<span class="hljs-attr">a</span>: <span class="hljs-string">'a'</span>}.a;    <span class="hljs-comment">// Uncaught SyntaxError: Unexpected token .</span></code></pre>
<p>第一行很好理解，没有任何执行语句，当然输出undefined<br>第二行代码呢，输出“a”，这里不要被“:”给蒙蔽了，这里的的冒号是一个标识符，类似于C语言中的标记符，不同的是JS中通过“break”与“continue”跳转到标记符，二C语言中是通过“goto”，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label" rel="nofollow noreferrer" target="_blank">关于标记符</a><br>第三行代码等同于：“a: 'a'; .a;” 没有通过对象主体获取属性“a”，所以报错。</p>
<p>综上所述，“{}.toString();” 等同于: “; .toString();” 未通过对象主体调用“toString”方法，不符合JS中<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Unexpected_token" rel="nofollow noreferrer" target="_blank">期待的表达式</a></p>
<p>说了这么多，用语句块有什么好处呢，我能想到的唯一好处只有“装B耍酷”...</p>
<h3 id="articleHeader4">总结在最后</h3>
<p>JS语句为什么不能以“function”和大括号开头呢？</p>
<ul>
<li>以function开头，但必须是一个函数声明语句</li>
<li>以大括号开头，但该大括号不再被当做一个对象处理，而是当做一个语句块处理</li>
<li>综上两条说明，JS语句可以以function，也可以以大括号作为开头，前提是必须符合JS中的语法规范</li>
</ul>
<hr>
<h3 id="articleHeader5">参考资料</h3>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements" rel="nofollow noreferrer" target="_blank">MDN 语句</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block" rel="nofollow noreferrer" target="_blank">MDN 语句块</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label" rel="nofollow noreferrer" target="_blank">MDN 标记符</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Unexpected_token" rel="nofollow noreferrer" target="_blank">MDN Unexpected token</a><br><a href="http://2ality.com/2012/09/expressions-vs-statements.html" rel="nofollow noreferrer" target="_blank">expressions-vs-statements</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators" rel="nofollow noreferrer" target="_blank">MDN Expressions_and_Operators</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS语句为什么不能以“function”与大括号开头

## 原文链接
[https://segmentfault.com/a/1190000012721319](https://segmentfault.com/a/1190000012721319)

