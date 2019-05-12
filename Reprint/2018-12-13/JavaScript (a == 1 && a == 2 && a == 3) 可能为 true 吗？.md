---
title: 'JavaScript (a == 1 && a == 2 && a == 3) 可能为 true 吗？' 
date: 2018-12-13 2:30:07
hidden: true
slug: hfr4d5ds8e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>简评：你认为这个问题是一个好的面试题吗？</blockquote>
<p><strong>在 JavaScript 中 (a ==1 &amp;&amp; a== 2 &amp;&amp; a==3) 可能为 true 吗？</strong></p>
<p>这个问题是国外一位求职者最近在面试一家大型科技公司时遇到的一个问题。</p>
<p>他的回答是「不可能」，而面试方说「nothing is impossible」，然后就没有然后了。</p>
<p>虽然在实际工作中可能没人会写这样的代码，但题主还是放不下，苦思冥想了两个礼拜，终于还是决定在 Stack Overflow 上寻求解答。</p>
<p>大家可以先自己想一想。</p>
<p>...</p>
<p>...</p>
<p>...</p>
<p>这里给一个最高赞的答案：</p>
<p>自定义 toString（或者 valueOf）方法，每次调用改变一次返回值，从而满足判断条件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}

if(a == 1 &amp;&amp; a == 2 &amp;&amp; a == 3) {
  console.log('Hello World!');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> a = {
  <span class="hljs-attr">i</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> a.i++;
  }
}

<span class="hljs-keyword">if</span>(a == <span class="hljs-number">1</span> &amp;&amp; a == <span class="hljs-number">2</span> &amp;&amp; a == <span class="hljs-number">3</span>) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello World!'</span>);
}
</code></pre>
<p>当使用 == 时，如果两个参数的类型不一样，那么 JS 会尝试将其中一个的类型转换为和另一个相同。在这里左边对象，右边数字的情况下，会首先尝试调用 valueOf（如果可以调用的话）来将对象转换为数字，如果失败，再调用 toString。</p>
<p>其实，还有很多其他的实现，感兴趣的可以点击<a href="https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true" rel="nofollow noreferrer" target="_blank">链接</a>看看。</p>
<p>比如，我比较喜欢这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="with({
  get a() {
    return Math.floor(Math.random()*4);
  }
}){
  for(var i=0;i<1000;i++){
    if (a == 1 &amp;&amp; a == 2 &amp;&amp; a == 3){
      console.log(&quot;after &quot;+(i+1)+&quot; trials, it becomes true finally!!!&quot;);
      break;
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">with</span>({
  <span class="hljs-keyword">get</span> a() {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">4</span>);
  }
}){
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">1000</span>;i++){
    <span class="hljs-keyword">if</span> (a == <span class="hljs-number">1</span> &amp;&amp; a == <span class="hljs-number">2</span> &amp;&amp; a == <span class="hljs-number">3</span>){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"after "</span>+(i+<span class="hljs-number">1</span>)+<span class="hljs-string">" trials, it becomes true finally!!!"</span>);
      <span class="hljs-keyword">break</span>;
    }
  }
}
</code></pre>
<blockquote>问题：<a href="https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true" rel="nofollow noreferrer" target="_blank">Can (a ==1 &amp;&amp; a== 2 &amp;&amp; a==3) ever evaluate to true?</a> reddit<br>讨论：<a href="https://www.reddit.com/r/programming/comments/7qv7pu/javascript_can_a_1_a_2_a3_ever_evaluate_to_true/" rel="nofollow noreferrer" target="_blank">Javascript: Can (a ==1 &amp;&amp; a== 2 &amp;&amp; a==3) ever evaluate to true? r/programming</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript (a == 1 && a == 2 && a == 3) 可能为 true 吗？

## 原文链接
[https://segmentfault.com/a/1190000013318865](https://segmentfault.com/a/1190000013318865)

