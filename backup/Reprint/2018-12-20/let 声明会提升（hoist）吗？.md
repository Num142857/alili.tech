---
title: 'let 声明会提升（hoist）吗？' 
date: 2018-12-20 2:30:10
hidden: true
slug: qgm9c78ogpe
categories: [reprint]
---

{{< raw >}}

                    
<p>本文为<a href="https://jirengu.com" rel="nofollow noreferrer" target="_blank">饥人谷讲师方方</a>原创文章，首发于 <a href="https://zhuanlan.zhihu.com/study-fe" rel="nofollow noreferrer" target="_blank">前端学习指南</a>。</p>
<p>前端日子我上课的时候跟饥人谷的学生讲了《let 声明的五个特点》，其中一个就是「let 声明会提升到所在块的顶部」，然而今天早上有个学生就问我了：</p>
<p><span class="img-wrap"><img data-src="https://i.loli.net/2017/12/27/5a433e9980229.jpg" src="https://static.alili.techhttps://i.loli.net/2017/12/27/5a433e9980229.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>MDN 上说 let 不会提升，为什么你说 let 会提升呢？</blockquote>
<p>当时我心里一方：难道我讲错了？</p>
<p>于是我看了 MDN 英文版的原文，发现写的也是：</p>
<blockquote>In ECMAScript 2015, let do not support Variable Hoisting, which means the declarations made using "let", do not move to the top of the execution block.</blockquote>
<p>看来我真的错了？于是我继续翻看 ECMA-262.pdf，发现了两处地方支持我的论点。</p>
<p>首先是 13.3.1 Let and Const Declarations</p>
<blockquote>let and const declarations define variables that are scoped to the running execution context's LexicalEnvironment. The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable's LexicalBinding is evaluated.</blockquote>
<p>这说明即使是 block 最后一行的 let 声明，也会影响 block 的第一行。这就是提升（hoisting）（这句话存疑）。</p>
<p>以及 18.2.1.2 Runtime Semantics: EvalDeclarationInstantiation( body, varEnv, lexEnv, strict)</p>
<blockquote>The environment of with statements cannot contain any lexical declaration so it doesn't need to be checked for var/let hoisting conflicts.</blockquote>
<p>这句话从侧面证明了 let hoisting 的存在。 </p>
<p>ECMAScript 都提到了 var/let hoisting，我不知道还有什么理由认为 let hoisting 不存在。</p>
<p>所以，我就把 MDN 的英文版和<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#let_%E7%9A%84%E6%9A%82%E5%AD%98%E6%AD%BB%E5%8C%BA%E4%B8%8E%E9%94%99%E8%AF%AF" rel="nofollow noreferrer" target="_blank">中文版</a>给纠正过来了：（后来又被 TC39 的人改了）</p>
<blockquote>在 ECMAScript 2015中, let 也会提升到语句块的顶部。但是，在这个语句块中，在变量声明之前引用这个变量会导致一个 ReferenceError的结果</blockquote>
<p>希望被之前 MDN 某个版本误导的同学周知。</p>
<h4>总结一下：</h4>
<ol>
<li>let 声明会提升到块顶部</li>
<li>从块顶部到该变量的初始化语句，这块区域叫做 TDZ（临时死区）</li>
<li>如果你在 TDZ 内使用该变量，JS 就会报错</li>
<li>我可没说 TDZ 跟 hoisting 等价啊摔</li>
</ol>
<h4>更新：</h4>
<p>有些同学还是认为 let 不会提升，试试理解下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1
{
  a = 2
  let a
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
{
  <span class="hljs-selector-tag">a</span> = <span class="hljs-number">2</span>
  let <span class="hljs-selector-tag">a</span>
}</code></pre>
<p>如果 let 不会提升，那么 a = 2 就会将外面的 a 由 1 变成 2 啊。</p>
<p>运行发现 a = 2 报错：Uncaught ReferenceError: a is not defined</p>
<p>这说明上面的代码近似近似近似近似近似近似地可以理解为：（注意看注释中的 TDZ）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 1
{
  let a // TDZ 开始的地方就是这里
  'start a TDZ'
  a = 2 // 由于 a = 2 在 TDZ 中，所以报错
  a // TDZ 结束的地方就是这里
  'end a TDZ'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let <span class="hljs-selector-tag">a</span> = <span class="hljs-number">1</span>
{
  let <span class="hljs-selector-tag">a</span> <span class="hljs-comment">// TDZ 开始的地方就是这里</span>
  <span class="hljs-string">'start a TDZ'</span>
  <span class="hljs-selector-tag">a</span> = <span class="hljs-number">2</span> <span class="hljs-comment">// 由于 a = 2 在 TDZ 中，所以报错</span>
  <span class="hljs-selector-tag">a</span> <span class="hljs-comment">// TDZ 结束的地方就是这里</span>
  <span class="hljs-string">'end a TDZ'</span>
}</code></pre>
<p>所以，let 提升了。但是由于 TDZ 的存在，你不能在声明之前使用这个变量。</p>
<h4>更新2：</h4>
<p><strong>什么是 hoisting？</strong></p>
<p>我并没有查到明确的定义，只能综合理解一下。</p>
<p>JS 的 var 的 hoisting 最好理解：不管你把 var a 写在函数的哪一行，都好像写在第一行一样；当前函数作用域里的所有 a 都表示你写的这个 a，这就是 hoisting。</p>
<p>以下是维基百科的释义：</p>
<blockquote>Variables are <a href="http://t.cn/RHtFVtT" rel="nofollow noreferrer" target="_blank">lexically scoped</a> at <a href="http://t.cn/RHtFoZy" rel="nofollow noreferrer" target="_blank">function level</a> (not <a href="http://t.cn/RHtFWk1" rel="nofollow noreferrer" target="_blank">block level</a> as in C), and this does not depend on order (<a href="https://en.wikipedia.org/wiki/Forward_declaration" rel="nofollow noreferrer" target="_blank">forward declaration</a> is not necessary): if a variable is declared inside a function (at any point, in any block), then inside the function, the name will resolve to that variable. This is equivalent in block scoping to variables being forward declared at the top of the function, and is referred to as hoisting.</blockquote>
<p><strong>什么是 TDZ？</strong></p>
<p>这个依然没要找到明确的定义，大意是「在某个时间点之前，你不能访问某个变量，即使这个变量已经存在了」。</p>
<p>JS 的 let 中这个「时间点」就是 LexicalBinding。</p>
<p>JS 的 let 中这个「存在」的意思是「The variables are created」。 </p>
<p>至于 TDZ 里这个变量有没有被声明，不是 TDZ 关心的。</p>
<h4>我的结论：</h4>
<ol>
<li>let 和 var 都有 hoisting</li>
<li>let 有 TDZ，var 没有 TDZ</li>
</ol>
<p>不过说句实在话，let 有没有 hoist 都无所谓，代码还不是那样写。对 let 先使用再声明的都是在耍流氓（面试官最喜欢刷流氓了）</p>
<p>感谢 @寸志 @胡子大哈 @Code Hz 的补充。本文相关概念确实都没有明确定义，大部分是语言设计者造的概念，所以语言使用者理解起来有差异也是正常的</p>
<p>出现各种误解的症结也正是因为这些概念名没有明确的定义。有兴趣的话可以看看 GitHub 上的讨论：<a href="https://github.com/getify/You-Dont-Know-JS/issues/767" rel="nofollow noreferrer" target="_blank"><code>let</code> hoisting? · Issue #767 · getify/You-Dont-Know-JS</a></p>
<p>我会在下一篇文章中详细说明什么是变量的生命周期，然后部分推翻我自己这篇文章的结论（打脸？）。（对啊，只记结论是没有用的）</p>
<p>加微信号: astak10或者长按识别下方二维码进入前端技术交流群 ，暗号：写代码啦</p>
<p>每日一题，每周资源推荐，精彩博客推荐，工作、笔试、面试经验交流解答，免费直播课，群友轻分享... ，数不尽的福利免费送</p>
<p><span class="img-wrap"><img data-src="https://i.loli.net/2017/12/27/5a43467ec99b9.png" src="https://static.alili.techhttps://i.loli.net/2017/12/27/5a43467ec99b9.png" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
let 声明会提升（hoist）吗？

## 原文链接
[https://segmentfault.com/a/1190000012605272](https://segmentfault.com/a/1190000012605272)

