---
title: 'JavaScript变量提升的相关讨论' 
date: 2018-12-19 2:30:07
hidden: true
slug: 21ocy6hlglm
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>2017年的事情还是2017年完成吧。话不多说，现在开始：</strong></p>
<p>之前翻译过两篇发表在Medium上的两篇文章，关于变量和函数提升的问题。后来发现，一个读者（Gavin Orland）与作者（Bhuvan Malik）就函数和变量提升的问题产生了分歧，是留言形式的。最后作者还专门又写了一篇文章来回应问题，我想也是想让大家都看见吧。所以我自己整理一下，现将他们的讨论也做一个搬运吧。</p>
<h2 id="articleHeader0">Gavin Orland 与 Bhuvan Malik 就提升话题中“问题1”和“问题3”的讨论</h2>
<p><strong>Gavin Orland</strong>：<br><em>Explanations 1 and 3 are slightly incorrect as function declarations are actually hoisted above variable declarations.</em><br>解释1和3有点不正确，实际上函数声明实际上是在变量声明之上提升的。</p>
<p><strong>Bhuvan Malik：</strong><br><em>For the first question’s behind the scenes, I have purposely shown the effects of hoisting only inside the functional scope of b().</em><br>对于第一个问题，我刻意仅在b()的功能范围内展示了提升的效果。</p>
<p><em>As for the third question, var hoisted = “I’m a variable”; comes first and therefore the variable “hoisted” should be hoisted first with an “undefined” value. I could be wrong in which case you can point me to a source which proves me wrong, in which case I’d be happy make the change.</em> ?<br>第三个问题：var hoisted = “I‘m a variable’”; 因此首先应该提升“提升”的变量，并且具有“undefined”的值。我可能是错的，在这种情况下，你可以指出我的来源，证明我错了，在这种情况下，我会很高兴做出改变。?</p>
<p><strong>Gavin Orland</strong>：<br><em>Here’s what goes on behind the scenes for explanation 3:</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parent() {  
// Function declaration hoisted first  
    function hoisted() { 
        return &quot;I'm a function&quot;; 
    } 
// Variable re-assigned (declaration ignored) 
 hoisted = &quot;I'm a variable&quot;;  
return hoisted(); 
} 
console.log(parent());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parent</span>(<span class="hljs-params"></span>) </span>{  
<span class="hljs-comment">// Function declaration hoisted first  </span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hoisted</span>(<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-keyword">return</span> <span class="hljs-string">"I'm a function"</span>; 
    } 
<span class="hljs-comment">// Variable re-assigned (declaration ignored) </span>
 hoisted = <span class="hljs-string">"I'm a variable"</span>;  
<span class="hljs-keyword">return</span> hoisted(); 
} 
<span class="hljs-built_in">console</span>.log(parent());</code></pre>
<p><a href="https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&amp;%20closures/ch4.md#functions-first" rel="nofollow noreferrer" target="_blank">Here’s</a> a source for this.<br>源码在这里。</p>
<p><strong>Bhuvan Malik</strong>：<br><em>What you’re trying to say is correct. However, saying that function declarations get hoisted “above” variable declarations, which implies that variable declarations “get hoisted below” is wrong. In such a case, what is happening is that the hoisting of var declarations simply gets ignored. I will update this.</em> ?<br>你想证明你说的是对的。然而说函数声明提升在变量声明提升之上，在暗示变量声明“提升在下面”是错的。在这样的情况下，发生的事情就是简单地忽略var声明的提升。 我会更新这个。?</p>
<p><strong>Gavin Orland</strong>：<br><em>I’m not “trying” to say anything, I’m simply saying it: function declarations are hoisted above variable declarations. What is unclear about that? Yes, therefore variable declarations are then logically hoisted below function declarations, if you want to think about it like that. It is not wrong to say that — please prove to me that is wrong.</em><br>我没有试着说什么，我只是在说：函数声明被提升到了变量声明之上。有什么不清楚的呢？是的，因此变量声明在函数声明下面逻辑地提升，如果你觉得他是这样，那样说也没错--请向我证明我是错的。</p>
<p><em>In your first reply you said</em>:<br><em>在你第一次回复中你说</em>：</p>
<blockquote>var hoisted = “I’m a variable”; comes first and therefore the variable “hoisted” should be hoisted first with an “undefined” value</blockquote>
<p><em>This is incorrect — a declaration will be hoisted after the function with this value. Then the string value is immediately assigned to it.</em><br>这是错的-- 一个声明将在具有这个值的函数之后被提升。然后，字符串值立即分配给它。</p>
<p><em>Indeed, in the case of example 3, the declaration is ignored (in contradiction to your explanation), as I explained, because the variable has already been declared in the form of the function, but in other cases (such as example 1, which you do not want to correct) function declarations are hoisted first, then variable declarations.</em><br>确实，在案例3的情况中，这个声明被忽略（与你的解释相矛盾），正如我所解释的，因为变量已经以函数的形式被声明了，但在其他情况（如示例1，您不想纠正）函数声明首先被提升，然后是变量声明。</p>
<p><em>Function and variable declarations are always hoisted in this manner, the assignment to the variable will take place wherever it appears in the code.</em><br>函数和变量声明总是用这样的方式被提升，变量的赋值将在代码中的任何位置出现。</p>
<p><em>It’s odd you should accept my correction and then somehow claim you are right and I am wrong?! Anyway, I see you have now corrected the article (otherwise very good, and thanks for writing it).</em><br>这很奇怪，你应该接受我的更正，然后以某种方式声称你是对的，我错了？无论如何，我看你现在已经纠正了这篇文章（其他的非常好，谢谢你写了这些）。</p>
<p><strong>Bhuvan Malik</strong>：<br><em>First of all, thanks for correcting me sir and I appreciate your explanations. You say that variable declaration will get hoisted after the function with an “undefined” value, and then the string value will be immediately assigned. My doubt here is that what if we only have the variable declaration without a string value being assigned like so:</em><br>首先，感谢先生纠正我，我感谢你的解释。你说那个变量声明在函数之后被赋值“undefined”，然后字符串值将立即分配。这里我的疑问是，如果我们只有变量声明没有被赋值的字符串值，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parent() { 
    var hoisted;
    function hoisted() {  
        return &quot;I'm a function&quot;; 
    } 
    return hoisted(); 
} 
console.log(parent());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parent</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">var</span> hoisted;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hoisted</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-keyword">return</span> <span class="hljs-string">"I'm a function"</span>; 
    } 
    <span class="hljs-keyword">return</span> hoisted(); 
} 
<span class="hljs-built_in">console</span>.log(parent());</code></pre>
<p><em>If variable declaration does get hoisted after the function, then behind the scenes for this according to your explanation should be:</em><br>如果变量声明在函数之后被挂起，那么根据你的解释，这个后台应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parent() {  
    // Hoisted first  
    function hoisted() { 
        return &quot;I'm a function&quot;; 
    } 
    // Hoisted second with a value of undefined
    var hoisted; return hoisted(); 
} 
console.log(parent());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parent</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-comment">// Hoisted first  </span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hoisted</span>(<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-keyword">return</span> <span class="hljs-string">"I'm a function"</span>; 
    } 
    <span class="hljs-comment">// Hoisted second with a value of undefined</span>
    <span class="hljs-keyword">var</span> hoisted; <span class="hljs-keyword">return</span> hoisted(); 
} 
<span class="hljs-built_in">console</span>.log(parent());</code></pre>
<p><em>If the variable declaration is indeed hoisted second, then hoisted should finally get the value of “undefined” after the hoisting of the function and the program should finally throw an error because hoisted is no longer a function.</em><br>如果变量声明确实是第二次提升的话，那么在提升函数后最终得到的值是“undefined”，程序最终会因为提升函数而抛出一个错误。</p>
<p><em>However, the output still comes out to be “I’m a function”.</em><br>然而，这里输出的是“I’m a function”</p>
<p><em>This is the reason why I think there is no variable declaration hoisting happening here. I agree that a variable declaration hoisting in such a case simply gets ignored. Getting me?</em><br><em>Again, I could be wrong. I’m just trying to learn here by discussing with you.</em><br>就是这个原因我认为变量声明没有提升。 我同意，在这种情况下提交的变量声明只是被忽略。 再联系我？再次，我可能是错的。 我只是想通过讨论和你一起来学习。</p>
<p><strong>Gavin Orland</strong>：<br><em>No problem, I can explain this. In fact I think we have already covered it, really.</em><br>没问题，我能解释这个。事实上我认为我们已经把它覆盖了，真的。</p>
<p><em>Variable declarations are hoisted after (or below) function declarations. But, in the case where the names match function declarations (or any variable already declared), they have no effect, so are ignored.</em><br>变量声明在函数声明之后（或者下面）被提升。但是，在名称匹配函数声明的情况下（或任何已经声明的变量），它们没有效果，因此被忽略了。</p>
<p><em>So, redeclaring a variable does not render it undefined, it has no effect. Only re-assigning an already declared variable has an effect.</em><br>因此，重新声明变量不能给与它“undefined”,这没有效果。只能重新给一个已经声明的变量分配才会有效果。</p>
<p><em>Here’s a simple but illuminating example of this variable hoisting, btw:</em><br>这是个关于变量提升的简单又又明确例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(x); // undefined 
var x = y; 
function y(){} 
console.log(x); // function y(){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">// undefined </span>
<span class="hljs-keyword">var</span> x = y; 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">y</span>(<span class="hljs-params"></span>)</span>{} 
<span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">// function y(){}</span></code></pre>
<p><em>This is understood as:</em><br>这被理解为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function y(){} 
var x;  
console.log(x); // undefined 
x = y;  
console.log(x); // function y(){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">y</span>(<span class="hljs-params"></span>)</span>{} 
<span class="hljs-keyword">var</span> x;  
<span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">// undefined </span>
x = y;  
<span class="hljs-built_in">console</span>.log(x); <span class="hljs-comment">// function y(){}</span></code></pre>
<p><strong>Bhuvan Malik</strong>:<br><em>Got it now. Thank you so much!</em><br>现在明白了。 非常感谢！</p>
<p>以上就是这位读者（Gavin Orland ）和作者（Bhuvan Malik）之间的讨论。还是得到些启发。因为读者给的源码可是大名鼎鼎的《你不知道的JavaScript》里面的例子。我也算完成了搬运，好了~ 可以没有欠债（我自己的债）的度过2017了。</p>
<p>Peace ✌️</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript变量提升的相关讨论

## 原文链接
[https://segmentfault.com/a/1190000012656415](https://segmentfault.com/a/1190000012656415)

