---
title: 'javaScript链式调用原理以及加法实现' 
date: 2019-01-18 2:30:35
hidden: true
slug: esqn1cpwmzn
categories: [reprint]
---

{{< raw >}}

                    
<p>相信很多小伙伴在面试的过程中都被问过js链式调用的原理，甚至有些面试官还会让你用其实现例如加法操作，举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="add(1)(2)(3)    //6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">add</span><span class="hljs-params">(<span class="hljs-number">1</span>)</span><span class="hljs-params">(<span class="hljs-number">2</span>)</span><span class="hljs-params">(<span class="hljs-number">3</span>)</span></span>    <span class="hljs-comment">//6</span></code></pre>
<p>第一次看到这个题目时，或许你没有什么头绪，不要紧，让我们慢慢来；首先，大家还是否记得在使用jQuery时，我们会经常这样去操作一个jQuery节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;elem&quot;).show().css(&quot;color&quot;,&quot;red&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$(</span><span class="hljs-string">"elem"</span>).show().css(<span class="hljs-string">"color"</span>,<span class="hljs-string">"red"</span>);</code></pre>
<p>这是怎么做到的？原理很简单：就是jQuery节点在调用api后都会返回节点自身，类似于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Obj = {
    a: 1,
    func: function(){
        this.a += 1;
        return this
    }
}
Obj.func().func();
console.log(Obj.a);    //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">func</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.a += <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
}
Obj.func().func();
<span class="hljs-built_in">console</span>.log(Obj.a);    <span class="hljs-comment">//3</span></code></pre>
<p>现在大致理解了链式调用的原理了吧！然后我们再来看如何实现文章开头的题目；首先我们来分析一下有哪几点是我们需要注意的：</p>
<ol>
<li><p>add函数在后续的链式调用时，应该记录之前的加和，如何实现？</p></li>
<li><p>add函数在每次调用后既要保留自身的引用，又要返回操作结果，如何实现？</p></li>
</ol>
<p>先上代码，然后我们逐一分析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add (num) {
    var count = num;
    var _b = function(l){
        count += l;
        return _b
    }
    _b.valueOf = function(){
        return count
    }
    return _b
}
var c = add(1)(2)(3);
console.log(c)    //6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">var</span> count = num;
    <span class="hljs-keyword">var</span> _b = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">l</span>)</span>{
        count += l;
        <span class="hljs-keyword">return</span> _b
    }
    _b.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> count
    }
    <span class="hljs-keyword">return</span> _b
}
<span class="hljs-keyword">var</span> c = add(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(c)    <span class="hljs-comment">//6</span></code></pre>
<p>下面我们来详细分析一下代码：<br>1.首先，在add方法内部，我们是通过私有的_b方法实现的加法，而不是在add方法自身实现的，这里涉及到了函数式编程，这个概念我们就不在此做展开了，有兴趣的童鞋可以自己研究一下，可以说这是一种很不错的开发模式；add第一次执行后，返回了_b方法<br>2.在返回的_b方法中我们形成了对count的闭包，这样我们可以实现累计加和；还有一点需要注意，就是_b方法每次执行时都返回了它自身，这就实现了链式<br>3.最后，也是比较关键的，就是在输出add的结果，即add(1)(2)(3)的结果时，如何让它输出count，这里涉及了valueOf和toString方法的知识，还是那句话，感兴趣的童鞋可以自己研究一下；在这里最后能够正确输出6的原理是：_b是Function，是Object的一种特殊形式，当我们做类似打印console等操作时，会自动调用其valueOf方法（其实底层实现没有我说的这么简单，哈哈，但是大概是这么个意思），所以我们重写了valueOf方法来达到返回count的目的</p>
<hr>
<p><strong>结语</strong><br>以上就是我对链式调用的一个粗略认识，有些概念可能表达的不是很清晰；其实楼主的目的就是想引导大家去研究一下链式调用所涉及到的一些js知识，不喜请轻喷O(∩_∩)O哈哈~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javaScript链式调用原理以及加法实现

## 原文链接
[https://segmentfault.com/a/1190000008724608](https://segmentfault.com/a/1190000008724608)

