---
title: 'ES6系列文章 块级作用域' 
date: 2018-12-29 2:30:10
hidden: true
slug: y9wq2ghihw
categories: [reprint]
---

{{< raw >}}

                    
<p>ES5之前javascript语言只有函数作用域和全局作用域，使用var来声明变量，var声明的变量还存在变量提升使人困惑不已。我们先来复习一下ES5的var声明，再对比学习let和const 。</p>
<h2 id="articleHeader0">var</h2>
<h3 id="articleHeader1">var声明之函数作用域和全局作用域。</h3>
<p>来段代码体会一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName() {
    if (1 + 1 === 2) {
        var name = 'xixi';
    }

    console.log(name);
}

getName();//xixi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> + <span class="hljs-number">1</span> === <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">var</span> name = <span class="hljs-string">'xixi'</span>;
    }

    <span class="hljs-built_in">console</span>.log(name);
}

getName();<span class="hljs-comment">//xixi</span></code></pre>
<p>在c或java语言中name本应该只在if块中使用的，但是在if的外面也可以访问到，这个就是 js没有块级作用域的一种体现。这个弊端在for循环中体现的十分明显：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 10; i ++) {
    // ...
}

console.log(i);// 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {
    <span class="hljs-comment">// ...</span>
}

<span class="hljs-built_in">console</span>.log(i);<span class="hljs-comment">// 10</span></code></pre>
<p>var i的本意是声明个临时变量i，用来遍历数组等，本不应该在for循环的外部访问到，但现在却可以被访问到你说闹不闹心？好一点的程序员会用立即执行函数来模拟块级作用域，原来的我会注意一下尽量不使用相同的变量名?。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    for (var i = 0; i < 10; i ++) {
        // ...
    }
})();

console.log(i);// undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {
        <span class="hljs-comment">// ...</span>
    }
})();

<span class="hljs-built_in">console</span>.log(i);<span class="hljs-comment">// undefined</span></code></pre>
<p>以上：大家知道了 js 没有块级作用域。</p>
<h3 id="articleHeader2">变量可以重复声明</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'xixi';
console.log(name);// xixi
var name= '一步';
console.log(name);// 一步" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'xixi'</span>;
<span class="hljs-built_in">console</span>.log(name);<span class="hljs-comment">// xixi</span>
<span class="hljs-keyword">var</span> name= <span class="hljs-string">'一步'</span>;
<span class="hljs-built_in">console</span>.log(name);<span class="hljs-comment">// 一步</span></code></pre>
<p>不报错，困惑不困惑，这个就是变量可以重复声明。</p>
<h3 id="articleHeader3">变量提升</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName() {
    console.log(name);
    var name = 'xixi';
    // ...
}

getName();// undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(name);
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">'xixi'</span>;
    <span class="hljs-comment">// ...</span>
}

getName();<span class="hljs-comment">// undefined</span></code></pre>
<p>console.log打印name为undefined。为啥不报错呢，对于一直使用js语言的人来说这个现象还好理解，如果是后台转前端的人来说估计得骂人了。这就是所谓的变量提升。简单的向大家解释一下吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = 'xixi';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'xixi'</span>;</code></pre>
<p>这是一条被我们写烂了的语句，包含两个过程：var name; name = 'xixi';分别为变量声明和变量初始化。</p>
<blockquote><p>变量提升： 无论变量声明<code>var name;</code>处于什么位置，都会被提到作用域的顶部进行。</p></blockquote>
<h2 id="articleHeader4">let</h2>
<p>ES6为让变量生命周期更加可控，引入两个非常好的特性<code>let</code>、<code>const</code>。块级作用域、不能重复声明、临时性死区等特性用来解决 var 变量存在的种种问题。</p>
<h3 id="articleHeader5">块级作用域</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName4ES6() {
    if (1 + 1 === 2) {
        let name = 'xixi';
    }

    console.log(name);
}

getName4ES6(); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName4ES6</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> + <span class="hljs-number">1</span> === <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">let</span> name = <span class="hljs-string">'xixi'</span>;
    }

    <span class="hljs-built_in">console</span>.log(name);
}

getName4ES6(); <span class="hljs-comment">// undefined</span></code></pre>
<p>终于在<code>{}</code>外面访问不到name了。for循环也变的简单了，大家试一下将for循环的var换成 let.</p>
<h3 id="articleHeader6">同一块级作用域内不能重复声明变量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function redefineValue() {
    let name = 'xixi';
    let name = '一步';
}

redefineValue();// Uncaught SyntaxError: Identifier 'name' has already been declared" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">redefineValue</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> name = <span class="hljs-string">'xixi'</span>;
    <span class="hljs-keyword">let</span> name = <span class="hljs-string">'一步'</span>;
}

redefineValue();<span class="hljs-comment">// Uncaught SyntaxError: Identifier 'name' has already been declared</span></code></pre>
<p>重复声明会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    let name = 'xixi';
    console.log(name);// xixi
    {
        let name = 'yibu';
        console.log(name); // yibu
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-keyword">let</span> name = <span class="hljs-string">'xixi'</span>;
    <span class="hljs-built_in">console</span>.log(name);<span class="hljs-comment">// xixi</span>
    {
        <span class="hljs-keyword">let</span> name = <span class="hljs-string">'yibu'</span>;
        <span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">// yibu</span>
    }
}</code></pre>
<p>注意： 在 ES6中，<code>{}</code>就是一个块级作用域。</p>
<h3 id="articleHeader7">临时性死区</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName4ES6() {
    console.log(name);
    for (let i = 0; i < 10; i ++) {

    }
    let name = 'xixi';
    // ...
}

getName4ES6();// Uncaught ReferenceError: name is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName4ES6</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(name);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i ++) {

    }
    <span class="hljs-keyword">let</span> name = <span class="hljs-string">'xixi'</span>;
    <span class="hljs-comment">// ...</span>
}

getName4ES6();<span class="hljs-comment">// Uncaught ReferenceError: name is not defined</span></code></pre>
<p>在上文ES5中，name还会存在变量提升，值为undefined。ES6中又报错了。怎么解释呢？。。。。这个就是临时性死区的概念，在作用域块中不可以在变量声明前就使用变量，若使用是会出错的。</p>
<blockquote><p>javascript引擎在发现变量声明时，要么将变量声明提升到作用域的顶部(var声明变量时)，要么将变量放在临时性死区中(let、const声明变量时)，访问临时性死区中的变量会触发运行时错误。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWbnl?w=976&amp;h=408" src="https://static.alili.tech/img/bVWbnl?w=976&amp;h=408" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">const</h2>
<p>const和let同样具有块级作用域，不能重复声明，临时性死区的概念。它还具有两个特有的特性：声明的同时必须初始化、变量引用不可以改变。</p>
<h3 id="articleHeader9">声明的同时必须初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const name;//Uncaught SyntaxError: Missing initializer in const declaration" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> name;<span class="hljs-comment">//Uncaught SyntaxError: Missing initializer in const declaration</span></code></pre>
<p>不赋值，就报错。这个也很好理解const的本意就是用来定义常量，不可变的值。若不在声明时给出初始值以后就再也没有机会了。</p>
<h3 id="articleHeader10">值不可变</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const name = 'x9x9'；
name = 'yyy';// Uncaught SyntaxError: Invalid or unexpected token" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> name = <span class="hljs-string">'x9x9'</span>；
name = <span class="hljs-string">'yyy'</span>;<span class="hljs-comment">// Uncaught SyntaxError: Invalid or unexpected token</span></code></pre>
<p>那么对象会怎样呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const person = {
    name: 'lala',
    age: 40
};

person = {};// VM1042:6 Uncaught TypeError: Assignment to constant variable. at <anonymous>:6:8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'lala'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">40</span>
};

person = {};<span class="hljs-comment">// VM1042:6 Uncaught TypeError: Assignment to constant variable. at &lt;anonymous&gt;:6:8</span></code></pre>
<p>引用是不可变的，那我们在看看对象的属性值是什么情况吧~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="person.name = 'yoyo';
console.log(person);// {name: &quot;yoyo&quot;, age: 40}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">person.name = <span class="hljs-string">'yoyo'</span>;
<span class="hljs-built_in">console</span>.log(person);<span class="hljs-comment">// {name: "yoyo", age: 40}</span></code></pre>
<p>没有报错，对象引用不可改变，对象属性可以变更。</p>
<h2 id="articleHeader11">let vs const</h2>
<p>大家可能会困惑，什么时候使用let，什么时候使用const。let能做的const好像都可以。网上有一种流行做法：能用const就绝不用let，简单粗暴，不过很好用。<br>个人看法：若变量在后续方法中会被改变，就使用let。一些常量声明使用const, const声明的变量名全部大写。代码中的变量，如果是let声明的就代表其可变，若是const声明的，不论是简单数据类型还是引用类型变量就都不要改变它的值。这样，程序会更加的健壮，大家合作起来也比较方便。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6系列文章 块级作用域

## 原文链接
[https://segmentfault.com/a/1190000011444396](https://segmentfault.com/a/1190000011444396)

