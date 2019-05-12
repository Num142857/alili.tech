---
title: 'web前端面试题一' 
date: 2019-01-28 2:30:09
hidden: true
slug: mhif8y5rnv
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>写在前面的话</strong> <br>一般来说，面试质量的高低很大程度影响公司是否想接受改人才，也影响了人才是否愿意去公司。质量高的面试，公司能表明对人才的要求，个人也能表明所期待的公司是一个什么模式的公司。最终会有利于双向选择的过程。能尽早的把问题暴露在面试过程中，而不会人才进入公司后。</p>
<p>公司和个人都会根据技术面试的情况去给个人和公司一个总体技术评价，直接影响最终的面试结果。如何能用几个技术面试题来判断面试者的知识储备是一个很值得探讨的问题。好的面试题能引导面试者，而不是故意去为难面试者，在解决问题的过程体现其思考方向。目前，web前端面试题，部分公司准备和个人准备都存在一定的问题，这几个问题，导致面试质量不高。本文旨在思考如何能提高web前端面试题的质量。</p>
<p><strong>面试题常见问题</strong><br>一.准备不足<br>个人在面试之前一定要有充足的准备，包括公司的业务，技术，发展方向。<br>面试官也要对面试者的项目有一定了解，面试题也应该有一个思考。</p>
<p>二.面试题来源<br>面试官常常会从网上搜面试题，模仿面试题。往往这些面试题和自己想招的人才所需的技术储备还是存在一定差距。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'java'
var obj = {
    name: 'javascript',
    func: function() {
        return this.name;
    }
};
console.log(name);
console.log(obj.func());
var newFunc = obj.func;
console.log(newFunc());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">'java'</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'javascript'</span>,
    <span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
};
<span class="hljs-built_in">console</span>.log(name);
<span class="hljs-built_in">console</span>.log(obj.func());
<span class="hljs-keyword">var</span> newFunc = obj.func;
<span class="hljs-built_in">console</span>.log(newFunc());</code></pre>
<p>网上存在大量这样的面试题，请问这样的面试题能考验出来人才什么技能，什么思维方式？在没思考清楚这两个问题之前，无需拿此题去跟面试者谈论。</p>
<p><strong>面试题</strong><br>好的面试题应该能考查思维方式和技术能力，本文会持续分享这样的面试题。方式主要以对话的方式。</p>
<p>需求：一个输入框，用户输入时有联想搜索，每次用户输入都会触发请求，过多的请求会造成服务器的压力，如何去解决这个问题？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax() {
    ...   //请求函数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span><span class="hljs-params">()</span> </span>{
    ...   <span class="hljs-comment">//请求函数</span>
}</code></pre>
<p>面试者：延迟发送可以去解决这样的问题。</p>
<p>面试官：这是常见的解决方法，请写出代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timer = 0;
$('input').on('change', function(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        ajax()
    }, 1000)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> timer = <span class="hljs-number">0</span>;
$(<span class="hljs-string">'input'</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    clearTimeout(timer);
    timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        ajax()
    }, <span class="hljs-number">1000</span>)
});</code></pre>
<p>面试官：这样是正确的，可以解决问题。但是全局变量timer不好，throttle与输入处理函数耦合在一起，能提取一个公共函数出来吗？</p>
<p>面试者：我想想。</p>
<p>面试官：试试闭包？timer作为一个自执行函数的变量？</p>
<p>面试者：我试试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = (function(){
    var timer = 0;
    return function(fn, time) {
        clearTimeout(timer);
        timer = setTimeout(fn, time)
    }
})();
$('input').on('change', function(){
    delay(function() {
        ajax()
    }, 1000);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> delay = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> timer = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, time</span>) </span>{
        clearTimeout(timer);
        timer = setTimeout(fn, time)
    }
})();
$(<span class="hljs-string">'input'</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    delay(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        ajax()
    }, <span class="hljs-number">1000</span>);
});</code></pre>
<p>面试官：问题基本解决了，但是页面上如果有两个这样的输入框，分别对应不同的联想搜索，输入框一输入完成之后马上在输入框二输入，有什么Bug吗？</p>
<p>面试者：输入框一没有发送请求吗？</p>
<p>面试官：是的！造成这个问题的原因是什么？怎么去解决这个问题？</p>
<p>面试者：原因是公用了timer。解决这个问题需要把timer分开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = function(){
    var timer = 0;
    return function(fn, time) {
        clearTimeout(timer);
        timer = setTimeout(fn, time)
    }
};
var deday1 = delay();
var delay2 = delay();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">delay</span> = function(){
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">timer</span> = <span class="hljs-number">0</span>;
    <span class="hljs-built_in">return</span> function(fn, <span class="hljs-built_in">time</span>) {
        clearTimeout(<span class="hljs-built_in">timer</span>);
        <span class="hljs-built_in">timer</span> = setTimeout(fn, <span class="hljs-built_in">time</span>)
    }
};
<span class="hljs-built_in">var</span> deday1 = <span class="hljs-built_in">delay</span>();
<span class="hljs-built_in">var</span> delay2 = <span class="hljs-built_in">delay</span>();</code></pre>
<p>面试官：OK，问题解决了！lodash的throttle可以很好的解决这些问题。</p>
<p>面试官：如果不考虑性能，不允许使用clearTimeout，如何去解决这个问题呢？</p>
<p>面试者：...</p>
<p>面试官：不能用clearTimeout，也就是说每次setTimeout都必然执行。执不执行fn回调函数与setTimeout并没有直接关系，是不是可以考虑之前的定时器不去执行fn回调函数呢？只有最后一次执行fn回调函数。</p>
<p>面试者：我有思路了！</p>
<p>......</p>
<p><em>解决的方法有很多，就不给出代码了。</em></p>
<p>该面试题的小结：</p>
<ol>
<li><p>考查了解决这样异步问题的方案好解决问题的思路。</p></li>
<li><p>对闭包的理解和高阶函数的理解。比直接问是否理解闭包，是不是更清晰呢？</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web前端面试题一

## 原文链接
[https://segmentfault.com/a/1190000008125999](https://segmentfault.com/a/1190000008125999)

