---
title: 'JS代码运行过程简述（一）' 
date: 2019-01-12 2:30:24
hidden: true
slug: s4h2hdhgjmk
categories: [reprint]
---

{{< raw >}}

                    
<p>JS 是动态语言，任何一段代码在执行之前都需要编译，它跟传统的语言不同，它不是提前编译的，编译结果也不能在分布式系统中进行移植。  <br>但是JS引擎进行编译的步骤和传统的编译语言非常相似，在某些环节可能比预想的要复杂。</p>
<h3 id="articleHeader0">传统的编译</h3>
<ul><li><p>分词/词法分析（Tokenizing/Lexing）  <br>这个过程会将由字符串组成的字符串分解成（对编程语言来说）有意义的代码块，这些代码块被称为词法单元（token）</p></li></ul>
<p>e.g. var a = 2;  <br>通常会被解析成var 、a、=、2、;  <br>空格是否被当做此法单元，取决于空格在这门语言中是否具有意义</p>
<ul><li><p>解析/语法分析（Parsing）  <br>  这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树（抽象语法树，Abstract Syntax Tree, AST）</p></li></ul>
<p>var a = 2;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration
|
|------ a
|------AssignmentExpression
    |-----2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>VariableDeclaration
<span class="hljs-string">|</span>
<span class="hljs-string">|------ a</span>
<span class="hljs-string">|------AssignmentExpression</span>
    <span class="hljs-string">|-----2</span></code></pre>
<ul><li><p>代码生成  <br>  将AST转换成可执行代码的过程。</p></li></ul>
<p>var a = 2;  <br>  通过特定方法将var = 2;的AST转化为一组机器指令，用来创建一个叫作a的变量（包括内存分配等），并将一个值存储到a中。</p>
<h3 id="articleHeader1">JS 编译</h3>
<p>JS 的编译步骤和传统还是非常相似的，只是某些环节比较复杂，这里我详细说一下“预编译”，其他三个步骤同传统的编译</p>
<ul>
<li><p>分词/词法分析（Tokenizing/Lexing）</p></li>
<li><p>解析/语法分析（Parsing）</p></li>
<li><p>预编译  <br>首先先看一个例子：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(b) {    
      alert(b); 
    function b() {            
        alert(b);       
    }        
    b();    
}    
a(1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">(b)</span> </span>{    
      alert(b); 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">()</span> </span>{            
        alert(b);       
    }        
    b();    
}    
a(<span class="hljs-number">1</span>);
</code></pre>
<p>答案先不说， 现在看具体的预编译过程：</p>
<ol><li><p>预编译--全局  <br>  1). 创建Global Object对象（GO）</p></li></ol>
<p>2). 查找变量声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-> 如果GO上还没有该属性，则添加该属性，值为undefined  
-> 如果GO上已经有该属性，则不做任何处理 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">&gt; 如果GO上还没有该属性，则添加该属性，值为undefined  
</span>-<span class="ruby">&gt; 如果GO上已经有该属性，则不做任何处理 
</span></code></pre>
<p>3). 查找函数声明（eg. function foo () {}）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-> 如果GO上还没有foo属性，则把函数赋值给foo属性  
 -> 如果GO上已经存在foo属性，则直接覆盖
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">&gt; 如果GO上还没有foo属性，则把函数赋值给foo属性  
</span> -<span class="ruby">&gt; 如果GO上已经存在foo属性，则直接覆盖
</span> </code></pre>
<ol><li><p>预编译--函数  <br>  1). 函数运行前的一瞬间，生成Activation Object（活动对象），简称AO</p></li></ol>
<p>2). 分析参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" -> 把声明的参数形成AO的属性，值全为undefined  
 -> 接收实参，形成AO相应属性的值  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code> -<span class="ruby">&gt; 把声明的参数形成AO的属性，值全为undefined  
</span> -<span class="ruby">&gt; 接收实参，形成AO相应属性的值  </span></code></pre>
<p>3). 分析变量声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" -> 如果AO上还没有该属性，则添加该属性，值为undefined  
 -> 如果AO上已经有该属性，则不做任何处理  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code> -<span class="ruby">&gt; 如果AO上还没有该属性，则添加该属性，值为undefined  
</span> -<span class="ruby">&gt; 如果AO上已经有该属性，则不做任何处理  </span></code></pre>
<p>4). 分析函数声明（eg. function foo () {}）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" -> 如果AO上还没有foo属性，则把函数赋值给foo属性  
 -> 如果AO上已经存在foo属性，则直接覆盖
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code> -<span class="ruby">&gt; 如果AO上还没有foo属性，则把函数赋值给foo属性  
</span> -<span class="ruby">&gt; 如果AO上已经存在foo属性，则直接覆盖
</span></code></pre>
<ul><li><p>代码生成  <br>JS执行过程简单的介绍完了，Do you get it?, 下面看之前例子分析：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(b) {    
      alert(b); 
    function b() {            
        alert(b);       
    }        
    b();    
}    
a(1);


// 分析如下
/*
 * 1. 创建GO对象（包含JS全局对象的内置对象Math、String、Date、etc）
 * 2. 查找变量声明，没有
 * 3. 查找函数声明，定义函数a, GO = {a: function () {"}}"
 * 4. 执行a(1)
 * // 以下为函数a运行前的编译
 * 5. 创建活动对象AO  AO={this, arguments}
 * 6. 分析形参 AO = {this, arguments, b: undefined}
 * 7. 接收实参 AO = {this, arguments, b: 1}
 * 8. 分析变量声明 AO = {this, arguments, b: 1}
 * 9. 分析函数声明 
     AO = {
         this
         argunments,
         b: function () {}
     }
 
 * // 执行
 * alert(b)  // function () { ... }
 * b()   // function () { ... }
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">(b)</span></span> {    
      alert(b); 
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span><span class="hljs-params">()</span></span> {            
        alert(b);       
    }        
    b();    
}    
a(<span class="hljs-number">1</span>);


// 分析如下
/*
 * <span class="hljs-number">1.</span> 创建GO对象（包含JS全局对象的内置对象Math、String、Date、etc）
 * <span class="hljs-number">2.</span> 查找变量声明，没有
 * <span class="hljs-number">3.</span> 查找函数声明，定义函数a, GO = {a: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {"}}"
 * <span class="hljs-number">4.</span> 执行a(<span class="hljs-number">1</span>)
 * // 以下为函数a运行前的编译
 * <span class="hljs-number">5.</span> 创建活动对象AO  AO={this, arguments}
 * <span class="hljs-number">6.</span> 分析形参 AO = {this, arguments, b: undefined}
 * <span class="hljs-number">7.</span> 接收实参 AO = {this, arguments, b: <span class="hljs-number">1</span>}
 * <span class="hljs-number">8.</span> 分析变量声明 AO = {this, arguments, b: <span class="hljs-number">1</span>}
 * <span class="hljs-number">9.</span> 分析函数声明 
     AO = {
         this
         argunments,
         b: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> {}
     }
 
 * // 执行
 * alert(b)  // <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> { ... }
 * b()   // <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span> { ... }
 */</code></pre>
<p>从以上分析很清晰就能够知道弹出两个function，是不是很简单啊。其实在执行b(),还有函数b也要编译哦，编译步骤同函数a,这里就不做分析了。<br>习题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(b) {    
      alert(b); 
    b = function() {            
        alert(b);       
    }        
    b();    
}    
a(1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">(b)</span> </span>{    
      alert(b); 
    b = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{            
        alert(b);       
    }        
    b();    
}    
a(<span class="hljs-number">1</span>);
</code></pre>
<p>自己试着分析一下，结果是1和function，你做对了么？难点：b = function () {}这个是一个赋值语句</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS代码运行过程简述（一）

## 原文链接
[https://segmentfault.com/a/1190000009851856](https://segmentfault.com/a/1190000009851856)

