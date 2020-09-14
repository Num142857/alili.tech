---
title: '解析js中的this对象' 
date: 2018-12-19 2:30:07
hidden: true
slug: tdy0oteyoqi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><em>（几天之前写了源码分析之后，感觉太疲惫了，写一些相对轻巧的内容调剂一下，希望喜欢的同学可以点个赞和收藏~）</em><br>进入正题，this对象在js中是很常见，但是在这里也经常会出错，本文将对常见的this对象的情况做一些总结</p>
<h2 id="articleHeader1">正文</h2>
<blockquote>
<code>this</code>对象是在函数<strong>运行</strong>时，基于函数的执行环境绑定的。</blockquote>
<p><strong>其实这句话的本质就是，谁调用了函数，<code>this</code>就指向谁</strong></p>
<p>具体的来说，通常有以下几种情况：</p>
<h3 id="articleHeader2">全局函数</h3>
<p><strong>在全局环境中，this指向Window</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //例子1
  function A() {
    console.log(this)
  }
  A();//Window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">//例子1</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
  }
  A();<span class="hljs-comment">//Window</span></code></pre>
<p>上面的例子很简单，函数A在全局环境中执行，也就是全局对象<code>Window</code>调用了函数。此时this指向<code>Window</code></p>
<h3 id="articleHeader3">对象方法</h3>
<p><strong>作为对象方法调用时，this指向调用该方法的对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子2
var  b = {
    getThis:function(){
        console.log(this)
    }
}
b.getThis()//b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子2</span>
<span class="hljs-keyword">var</span>  b = {
    <span class="hljs-attr">getThis</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
    }
}
b.getThis()<span class="hljs-comment">//b</span></code></pre>
<p>到这里我们举的例子都比较简单易懂，接下来来一个有意思的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子3
  var c = {
    getFunc:function(){
      return function(){
        console.log(this)
      }
    }
  }
  var cFun = c.getFunc()
  cFun()//Window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子3</span>
  <span class="hljs-keyword">var</span> c = {
    <span class="hljs-attr">getFunc</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
      }
    }
  }
  <span class="hljs-keyword">var</span> cFun = c.getFunc()
  cFun()<span class="hljs-comment">//Window</span></code></pre>
<p>这个例子和前一个例子不一样，运行<code>c.getFunc()</code>时，首先返回的是一个匿名函数，我们将这个函数赋值给<code>cFun</code>，接着在<strong>全局环境</strong>中调用了<code>cFun()</code>，所以此时<code>this</code>指向的还是<code>Window</code>。</p>
<p>如果我们一定要让这里返回的是<code>c</code>对象呢？在开头我们说过，<code>this</code>对象是在函数<strong>执行</strong>时确定的，在例子3中，执行<code>c.getFunc()</code>时，<code>this</code>对象指向的还是c，所以我们只要保持住这个<code>this</code>就好了,对上面的代码稍微改动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子4
  var c = {
    getFunc:function(){
        var that = this //在这里保留住this
      return function(){
        console.log(that)
      }
    }
  }
  var cFun = c.getFunc()
  cFun()//c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子4</span>
  <span class="hljs-keyword">var</span> c = {
    <span class="hljs-attr">getFunc</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span> <span class="hljs-comment">//在这里保留住this</span>
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(that)
      }
    }
  }
  <span class="hljs-keyword">var</span> cFun = c.getFunc()
  cFun()<span class="hljs-comment">//c</span></code></pre>
<p>这也就是我们经常可以在一些代码中看到<code>var self = this</code>或者<code>var that = this</code>之类的原因了。</p>
<h3 id="articleHeader4">call和apply</h3>
<p><strong>此时this对象通常指向函数中指定的this值</strong>(注意这里的通常2字，考试要考的)</p>
<p><code>call</code>和<code>apply</code>算是老生常谈，但还是稍微介绍下，怕新同学可能没接触过（其实是为了凑点字数），拿<code>call</code>来说，语法是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fun.call(thisArg, arg1, arg2, ...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">fun</span>.<span class="hljs-title">call</span></span>(thisArg, arg1, arg2, ...)</code></pre>
<p>这个方法怎么用呢，看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子5
var d = {
    getThis:function(){
        console.log(this)
    }
}
var e = {
   name:'e'//(给e写个`name`属性只是因为觉得孤零零的太难看了~~)
}
d.getThis.call(e)//e" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子5</span>
<span class="hljs-keyword">var</span> d = {
    <span class="hljs-attr">getThis</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
    }
}
<span class="hljs-keyword">var</span> e = {
   <span class="hljs-attr">name</span>:<span class="hljs-string">'e'</span><span class="hljs-comment">//(给e写个`name`属性只是因为觉得孤零零的太难看了~~)</span>
}
d.getThis.call(e)<span class="hljs-comment">//e</span></code></pre>
<p>在这里我们就可以看出call函数的意思了:指定一个对象<code>o1</code>去调用其他对象<code>o2</code>的方法，此时<code>this</code>对象指向<code>o1</code></p>
<p>好了，那为什么前面我们说<strong>通常</strong>呢？因为，有2种例外的情况:</p>
<ol>
<li>
<code>thisArg</code>指定为<code>null</code>和<code>undefined</code>时，<code>this</code>指向<code>window</code>。</li>
<li>
<code>thisArg</code>指定为原始值(数字，字符串，布尔值),<code>this</code>会指向该原始值的<strong>自动包装对象</strong>（<strong>这一点感谢评论区的读者补充</strong>）。请看：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子6
var d = {
    getThis:function(){
        console.log(this)
    }
}
  d.getThis.call(null)//Window
  d.getThis.call(undefined)//Window
  d.getThis.call(1) //Number
  d.getThis.call(&quot;hello&quot;) //String
  d.getThis.call(true) //Boolean" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//例子6</span>
<span class="hljs-selector-tag">var</span> d = {
    getThis:function(){
        console.log(this)
    }
}
  d<span class="hljs-selector-class">.getThis</span><span class="hljs-selector-class">.call</span>(null)<span class="hljs-comment">//Window</span>
  d<span class="hljs-selector-class">.getThis</span><span class="hljs-selector-class">.call</span>(undefined)<span class="hljs-comment">//Window</span>
  d<span class="hljs-selector-class">.getThis</span><span class="hljs-selector-class">.call</span>(<span class="hljs-number">1</span>) <span class="hljs-comment">//Number</span>
  d<span class="hljs-selector-class">.getThis</span><span class="hljs-selector-class">.call</span>(<span class="hljs-string">"hello"</span>) <span class="hljs-comment">//String</span>
  d<span class="hljs-selector-class">.getThis</span><span class="hljs-selector-class">.call</span>(true) <span class="hljs-comment">//Boolean</span></code></pre>
<h4>番外：基本包装类型</h4>
<p>既然讲到包装类型，那这里顺便补充介绍一下基本包装类型：基本包装类型（包括Boolean,String,Number）是一类特殊的引用类型，它们具有引用类型的基本特征，还具有对应的基本类型的特殊行为，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//基本包装类型
var str = &quot;hello World&quot;;
var str2 = s1.substring(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//基本包装类型</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"hello World"</span>;
<span class="hljs-keyword">var</span> str2 = s1.substring(<span class="hljs-number">2</span>);</code></pre>
<p>首先，<code>str</code>是字符串，字符串是基本数据类型，但是在第二行代码中，<code>str.substring(2)</code>调用了<code>str</code>的方法，我们知道，基本数据类型不是对象，本来是是不应该有方法的，但是实际上我们知道string，number类型都有对应的方法，因为<strong>从内存中访问str时，访问进入了一种读取模式，在后台自动做了以下转换：</strong></p>
<ol>
<li>创建一个<code>String</code>类型的实例</li>
<li>在实例上调用相应方法</li>
<li>销毁该实例</li>
</ol>
<p>特点：<strong>自动创建</strong>的基本包装类型的对象<strong>只存在于执行代码的瞬间</strong>，然后立即销毁。<br>那么可以<strong>手动创建</strong>基本包装类型吗？当然可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var  str = new String(&quot;Hello&quot;)//注意这里是new一个实例，而不是用String类型转换函数
typeof(str)//object
var str2 = String(222)//如果使用类型转换函数得到的还是类型
ypeof(str2)//string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span>  str = new String(<span class="hljs-string">"Hello"</span>)<span class="hljs-comment">//注意这里是new一个实例，而不是用String类型转换函数</span>
<span class="hljs-function"><span class="hljs-title">typeof</span><span class="hljs-params">(str)</span></span><span class="hljs-comment">//object</span>
<span class="hljs-selector-tag">var</span> str2 = String(<span class="hljs-number">222</span>)<span class="hljs-comment">//如果使用类型转换函数得到的还是类型</span>
<span class="hljs-function"><span class="hljs-title">ypeof</span><span class="hljs-params">(str2)</span></span><span class="hljs-comment">//string</span></code></pre>
<p>此时的<code>str</code>就是一个显式创建的基本包装类型对象，只是一般来说很少这样去使用</p>
<h3 id="articleHeader5">箭头函数</h3>
<p>es6中的箭头函数现在也用的比较频繁，但是有个需要注意的点是：</p>
<blockquote>函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。</blockquote>
<p>其实出现这种情况的根本原因是:<strong>箭头函数没有this对象，所以箭头函数的this就是外层代码的this</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子7
  var f = {
      getThis:()=>{
          console.log(this)
      }
  }
  f.getThis()//Window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子7</span>
  <span class="hljs-keyword">var</span> f = {
      <span class="hljs-attr">getThis</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
      }
  }
  f.getThis()<span class="hljs-comment">//Window</span></code></pre>
<p>这个例子和前面例子2是基本一样的，只是把普通函数改写成箭头函数，但是此时的this对象已经指向了外层的<code>Window</code>。</p>
<p>考虑到这一点可能不好理解，我们再看几个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子8
  var g = {
    getThis:function(){
      return function(){console.log(this)}
    }
  }
  var h = {
    getThis:function(){
      return ()=> console.log(this)
    }
  }
  g.getThis()()//Window
  h.getThis()()//h
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子8</span>
  <span class="hljs-keyword">var</span> g = {
    <span class="hljs-attr">getThis</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)}
    }
  }
  <span class="hljs-keyword">var</span> h = {
    <span class="hljs-attr">getThis</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
    }
  }
  g.getThis()()<span class="hljs-comment">//Window</span>
  h.getThis()()<span class="hljs-comment">//h</span>
</code></pre>
<p>这个例子里，g的<code>getThis</code>写法就和之前的例子3一样，由于函数在全局环境中<strong>运行</strong>，所以此时<code>this</code>指向<code>Window</code>；h的<code>getThis</code>使用了箭头函数，所以this指向了<strong>外层代码块的this</strong>所以，此时<code>this</code>指向的是h。</p>
<h2 id="articleHeader6">总结</h2>
<p>小结一下，</p>
<ul>
<li>一般情况下<code>this</code>对象指向调用函数的对象，全局环境中执行函数<code>this</code>对象指向<code>Window</code>
</li>
<li>在<code>call和apply</code>函数中<code>this</code>指向指定的对象，如果指定的对为<code>undefined</code>或者<code>null</code>，那么<code>this</code>对象指向<code>Window</code>
</li>
<li>在箭头函数中，<code>this</code>对象等同于外层代码块的<code>this</code>
</li>
</ul>
<p>然后依然是每次都一样的结尾，<strong>如果内容有错误的地方欢迎指出；如果对你有帮助，欢迎点赞和收藏，转载请征得同意后著明出处，如果有问题也欢迎私信交流，主页添加了邮箱地址~溜了</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解析js中的this对象

## 原文链接
[https://segmentfault.com/a/1190000012704180](https://segmentfault.com/a/1190000012704180)

