---
title: 'JavaScript匿名函数以及在循环中的匿名函数' 
date: 2019-01-10 2:30:08
hidden: true
slug: lpob9ydet0g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一 历史</h2>
<p>JavaScript其实是一门奇异的语言，TA的一大特性是没有块级作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0;i<10;i++){

}
console.log(i)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>;<span class="hljs-built_in">i</span>&lt;<span class="hljs-number">10</span>;<span class="hljs-built_in">i</span>++){

}
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">i</span>)
</code></pre>
<p>大家猜测下值是多少？<br>答案是 10， 虽然我们在一个块内申明了变量，但i却是在全范围内起作用的，所以就引入了匿名函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){
   var i=0;
   ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
   <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;
   ...
}</code></pre>
<p><strong>以函数的作用域来限定变量作用域</strong></p>
<h2 id="articleHeader1">二 立即执行匿名函数</h2>
<p>当然，还立即执行的匿名函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
   do sth.....
})()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
   do sth.....
})()
</code></pre>
<p>第一次看到感觉真tm古怪，还tm要这样写，太tm古怪了，我们可以这样看:<br>定义一个虚拟变量 var foo = function(){...}<br>然后foo要执行，所以就</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo() = (function(){
       do sth.....
    })()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>foo() = (<span class="hljs-name">function</span>(){
       do sth.....
    })()
</code></pre>
<p>好了，匿名函数就立即执行了</p>
<h2 id="articleHeader2">三 循环中的匿名函数</h2>
<p>大家看下面一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    var arr = [];
    for(var i =0;i<5;i++){
      arr[i] = function(){
        //console.log(i) 来看看什么时候运行
        return i;   //定义函数时i的值并没有初始化，指向函数外的i，因此，当匿名函数运行时，这个值就指向最大的i了
   }
  }
  return arr;
}

var a = foo();   //arr的赋值没有被执行
for (var i = 0; i< 5 ;i++){
  alert(a[i]());
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i =<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">5</span>;i++){
      arr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//console.log(i) 来看看什么时候运行</span>
        <span class="hljs-keyword">return</span> i;   <span class="hljs-comment">//定义函数时i的值并没有初始化，指向函数外的i，因此，当匿名函数运行时，这个值就指向最大的i了</span>
   }
  }
  <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-keyword">var</span> a = foo();   <span class="hljs-comment">//arr的赋值没有被执行</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt; <span class="hljs-number">5</span> ;i++){
  alert(a[i]());
}</code></pre>
<p>有兴趣的不妨运行一下，答案是5个5，发生什么事了呢？<br>我们在对arr赋值的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" arr[i] = function(){
            return i;  
       }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code> arr[i] = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">i</span>;  
       }</code></pre>
<p>函数里面的i是没有分配具体的值的，它指向了最外层的i，而运行时才会赋值，所以，它就是最大的5了，再看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = document.getElementsByTagName(&quot;p&quot;);
            for(var i = 0; i < arr.length;i++){
                arr[i].onclick = function(){
                    alert(i);
                }
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"p"</span>);
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length;i++){
                arr[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    alert(i);
                }
            }</code></pre>
<p>这是一个DOM的onclick事件，当点击的时想能够弹出不同的i值，实际上是无法实现的，所以，必须使用匿名函数的立即执行来限定作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = document.getElementsByTagName(&quot;p&quot;);
                for(var i = 0; i < arr.length;i++){
                    (function(j){
                        arr[j].onclick = function(){
                            alert(j);
                        }
                    })(i)
                }
                
        
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"p"</span>);
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length;i++){
                    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>)</span>{
                        arr[j].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                            alert(j);
                        }
                    })(i)
                }
                
        
</code></pre>
<h2 id="articleHeader3">四 循环中的异步函数</h2>
<p>这样一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0;i<n;i++){
  ajax(i,function(....)) //这里是一个异步调用，还有request，http等
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;n;i++){
  ajax(i,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">....)) //这里是一个异步调用，还有request</span>，http等
}
</span></span></code></pre>
<p>这里i会是最大值，为何呢？因为这是一个异步函数，而非同步立即返回的函数，此时由于js奇怪的单线程机制，会待同步全部结束后再运行异步的代码，所以i始终是最大值，那么要用什么方法解决呢？是的，加一个闭包。</p>
<p>这里留下一个问题，如果写成这样，你觉得可以么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i=0;i<n;i++){
  var j={a:i}
  ajax(j.a,function(....))
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">for</span><span class="hljs-params">(var i=<span class="hljs-number">0</span>;i&lt;n;i++)</span></span>{
  <span class="hljs-selector-tag">var</span> j={<span class="hljs-selector-tag">a</span>:i}
  ajax(j<span class="hljs-selector-class">.a</span>,function(....))
}
</code></pre>
<p>总之，js真是一门奇异的语言</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript匿名函数以及在循环中的匿名函数

## 原文链接
[https://segmentfault.com/a/1190000009968288](https://segmentfault.com/a/1190000009968288)

