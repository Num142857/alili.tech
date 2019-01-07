---
title: '一道JavaScript编程题的拓展' 
date: 2019-01-08 2:30:11
hidden: true
slug: 7r78ocsl3d6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>在下前端小白，近日在刷各种算法/编程题，今天碰到一编程题，考点是<code>apply</code>，虽说简单，但在解题时发现了一个挺有意思的东东，特来分享一下。欢迎各位大佬指点~</p>
<hr>
<h2 id="articleHeader1">正文</h2>
<p>话不多说，直接上题目：二次封装函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
1、返回一个函数 result，该函数接受一个参数
2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>已知函数 <span class="hljs-meta">fn</span> 执行需要 <span class="hljs-number">3</span> 个参数。请实现函数 partial，调用之后满足如下条件：
<span class="hljs-number">1</span>、返回一个函数 result，该函数接受一个参数
<span class="hljs-number">2</span>、执行 result(<span class="hljs-keyword">str3) </span>，返回的结果与 <span class="hljs-meta">fn</span>(<span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span><span class="hljs-keyword">str3) </span>一致
</code></pre>
<p>哈哈，这题简单！稍微学过js的朋友就能写出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function partial(fn,str1,str2) {
    var result = function(str3) {
        return fn(str1,str2,str3);
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partial</span>(<span class="hljs-params">fn,str1,str2</span>) </span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str3</span>) </span>{
        <span class="hljs-keyword">return</span> fn(str1,str2,str3);
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>这里用个<code>call</code>可能会显得有点<em>逼格</em>（笑），当然<code>apply</code>,<code>bind</code>也能达到一样的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function partial(fn,str1,str2) {
    var result = function(str3) {
        return fn.call(null,str1,str2,str3);
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partial</span>(<span class="hljs-params">fn,str1,str2</span>) </span>{
    <span class="hljs-keyword">var</span> result = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str3</span>) </span>{
        <span class="hljs-keyword">return</span> fn.call(<span class="hljs-literal">null</span>,str1,str2,str3);
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>不多停留，我们来看下一题，同样是二次封装函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="实现函数 partialUsingArguments，调用之后满足如下条件：
1、返回一个函数 result
2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>实现函数 partialUsingArguments，调用之后满足如下条件：
<span class="hljs-number">1</span>、返回一个函数 <span class="hljs-literal">result</span>
<span class="hljs-number">2</span>、调用 <span class="hljs-literal">result</span> 之后，返回的结果与调用函数 fn 的结果一致
<span class="hljs-number">3</span>、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 <span class="hljs-literal">result</span> 的调用参数
</code></pre>
<p>emmmmm，传入的参数不固定？ 有了！ 用<code>arguments</code>~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function partialUsingArguments(fn) {
  var _arguments = Array.prototype.slice.call(arguments,1)
  var result = function() {
    var newArguments = _arguments.concat(Array.prototype.slice.call(arguments,0));
    return fn.apply(null,newArguments)
  }
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partialUsingArguments</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">var</span> _arguments = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>,<span class="hljs-number">1</span>)
  <span class="hljs-keyword">var</span> result = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> newArguments = _arguments.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>,<span class="hljs-number">0</span>));
    <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>,newArguments)
  }
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>唔，好像也没什么难的，<code>_arguments</code>就是<em>partialUsingArguments</em>第一个参数后的所有参数组成的数组，将它和<em>result</em>的所有参数合并起来，利用<code>apply</code>传入fn，ok~解决了！</p>
<hr>
<p>诶诶？有意思的东西呢？这特么一点意思都没啊。<br>说出来你们可能不信，其实我看到这题的时候，虽然我想到了用<code>apply</code>，但我并没有想到<code>fn.apply(null,newArguments)</code>。那我想到的是什么呢？</p>
<p><code>Function.prototype.call.apply</code></p>
<p>什么鬼？我也不知道是在哪看过这东西（也许没看过），又好像是</p>
<p><code>Function.prototype.call.call</code>？</p>
<p>还是</p>
<p><code>Function.prototype.apply.apply</code>？</p>
<p>还是</p>
<p><code>Function.prototype.apply.call</code>？</p>
<p>好像都差不多，妈个鸡，试试就知道了！</p>
<p><code>return Function.prototype.call.apply(fn,newArguments)</code><br>浏览器一跑，好像对了？不对！我传入的第一个参数怎么不见了？<br>Google之~ 噢~ 原来第一个参数被吃了。<br>原来<code>Function.prototype.call.apply(fn,newArguments)</code>同等于<code>fn.call(a,b,c,...z)</code> // newArguments = [a,b,c,...z],这里的...z不是ES6中的<code>...rest</code>哦，只是表示省略了中间的参数。</p>
<p>知道了原理（并不知道），那就好办了，我给newArguments数组的头部补一个元素上去不就好了~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newArguments.unshift(0);
Function.prototype.call.apply(fn,newArguments)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">newArguments.unshift(<span class="hljs-number">0</span>);
<span class="hljs-built_in">Function</span>.prototype.call.apply(fn,newArguments)</code></pre>
<p>浏览器一跑——没毛病老铁！</p>
<p>完了吗？</p>
<h3 id="articleHeader2">并没有！</h3>
<p>既然<code>.call.apply</code>可以用，那其他3个按理来说也能用，况且这里多了一步对数组的操作，能不能更<em>优雅</em>一点呢？（另外3个怎么用，观众老爷们心里有答案吗？）<br>本着 <em>求知</em> 以及 <em>code less,do more</em> 的精神，我对剩下的3种组合进行了深♂入的研究。</p>
<h2 id="articleHeader3">分析及结论如下</h2>
<p>原理其实很简单，<code>Function.prototype.apply(call)</code>其实就是一个函数，将视为一个整体，记作A。原式就可以转换成：<code>A.apply(参数)</code>或<code>A.call(参数)</code>，然后进一步转换，<code>参数1.A(参数2)</code>，什么参数、参数1、参数2的？<br>相信大家也看出来了，这里唯一的难点（？）就是参数。参数怎么写呢？ </p>
<p>其实很简单，apply就传数组，call就传一个序列。</p>
<p><code>apply</code>和<code>call</code>的区别大家肯定知道，我就不多说了。第一个参数肯定是fn，这个没跑了。关键就在第二个参数上。</p>
<p>第二个参数，首先它形式上要看后一个<code>apply/call</code>，如果是apply，我们就传数组进去，如果是call，就传一个序列。然后它的内容就要看A了，也就是前一个<code>apply/call</code>，同理，如果是apply，就传<em>数组参数</em>，如果是call，就传<em>序列参数</em>。</p>
<p>所以我们可以得出以下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.apply.apply(fn,[null,newArguments])
Function.prototype.call.call(fn,null,...newArguments])
Function.prototype.apply.call(fn,null,newArguments])
//上面3式可以实际上等于
fn.apply(null,newArguments)
fn.call(null,...newArguments) //...为扩展运算符，...[arr] = arr[0],arr[1],...arr[n]
fn.apply(null,newArguments)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Function</span>.prototype.apply.apply(fn,[<span class="hljs-literal">null</span>,newArguments])
<span class="hljs-built_in">Function</span>.prototype.call.call(fn,<span class="hljs-literal">null</span>,...newArguments])
<span class="hljs-built_in">Function</span>.prototype.apply.call(fn,<span class="hljs-literal">null</span>,newArguments])
<span class="hljs-comment">//上面3式可以实际上等于</span>
fn.apply(<span class="hljs-literal">null</span>,newArguments)
fn.call(<span class="hljs-literal">null</span>,...newArguments) <span class="hljs-comment">//...为扩展运算符，...[arr] = arr[0],arr[1],...arr[n]</span>
fn.apply(<span class="hljs-literal">null</span>,newArguments)</code></pre>
<p>绕了一大圈，又回来了~ :)<br>  而上面的<code>Function.prototype.call.apply</code>也可以改写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Function.prototype.call.apply(fn,[null,...newArguments])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">Function</span>.prototype.call.apply(fn,[<span class="hljs-literal">null</span>,...newArguments])</code></pre>
<p>从而减少了对数组newArguments的操作。</p>
<h2 id="articleHeader4">写在最后</h2>
<p>第一次写文章（水贴），十分紧张，删了改，改完了删，总觉得写的不好、十分啰嗦。<br>可能会有人觉得毫无意义，但我觉得这个倒是可以作为一道面试题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="请在填写空白内容使等式成立：
fn.apply(null,args) = Function.prototype.apply.apply(_____)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>请在填写空白内容使等式成立：
fn.<span class="hljs-built_in">apply</span>(null,args) = <span class="hljs-keyword">Function</span>.prototype.<span class="hljs-built_in">apply</span>.<span class="hljs-built_in">apply</span>(_____)</code></pre>
<p>如果真的有人遇到，请回来点赞^ ^<br>也希望此文能多少帮助到前端新人，大家一起学习，进步！<br>哪里要是写不好可以直说！帮助我进步。谢谢！<br>不废话了，<br>完。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一道JavaScript编程题的拓展

## 原文链接
[https://segmentfault.com/a/1190000010244861](https://segmentfault.com/a/1190000010244861)

