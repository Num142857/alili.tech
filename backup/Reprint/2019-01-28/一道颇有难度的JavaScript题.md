---
title: '一道颇有难度的JavaScript题' 
date: 2019-01-28 2:30:10
hidden: true
slug: 3vhoe2mo09k
categories: [reprint]
---

{{< raw >}}

                    
<p>　　上次分享了一道题，大家反响不错，很开心自己写的东西有人愿意花时间去看，也给了自己莫大的鼓舞，其实做题虽然不比真正的编程，但是也能够让你发现一些你之前没有注意到的语言层面的问题。所以，这次再分享一道稍微有难度的JavaScript题目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo() {
    getName = function () { 
        console.log('1');
    };
    return this;
}
Foo.getName = function () {
    console.log('2');
};
Foo.prototype.getName = function () { 
    console.log('3');
};
var getName = function () { 
    console.log('4');
};
function getName() { 
    console.log(5);
}

Foo.getName();  
getName();    
Foo().getName(); 
getName();  
new Foo.getName(); 
new Foo().getName();   
new new Foo().getName();        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);
    };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
Foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
};
Foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
};
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
}

Foo.getName();  
getName();    
Foo().getName(); 
getName();  
<span class="hljs-keyword">new</span> Foo.getName(); 
<span class="hljs-keyword">new</span> Foo().getName();   
<span class="hljs-keyword">new</span> <span class="hljs-keyword">new</span> Foo().getName();        </code></pre>
<p>　　 请问上述代码在浏览器环境下，输出结果是多少？<br>　　 揭晓一下最终答案:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2 4 1 1 2 3 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-number">2</span> <span class="hljs-number">4</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">3</span></code></pre>
<p>　　前四道难度不是很大，主要是后三道，基本是全军覆没，感叹实在是太绕了了。后面慢慢分析了一下，逐个讲一下吧。<br>　　首先必须注意一个问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo() {
    getName = function () { 
        console.log('1');
    };
    return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);
    };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<p>　　在函数内部声明的<code>getName</code>变量，前面是不带有<code>var</code>、<code>let</code>,<code>const</code>的，所以其实根据<strong>LHS</strong>(这个的介绍可以去的我博客看一下关于LHS和RHS的总结)，声明的<code>getName</code>是在全局范围内(也是就<code>window</code>)。<br>　　其次需要明确你是否知道下面代码在浏览器中的执行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getName = function () { 
    console.log('4');
};
function getName() { 
    console.log(5);
}
getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
}
getName();</code></pre>
<p>　　上述代码的执行结果是:<code>4</code>。原因是这样的，<code>var</code>声明的变量和函数声明<code>function</code>都会被提升，但是函数声明的提升的级别是比<br><code>var</code>要高的，所以上面的代码的实际执行结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName() { 
    console.log(5);
}
var getName = function () { 
    console.log('4');
};
getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
}
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
};
getName();</code></pre>
<p>　　后一个函数表达式<code>getName</code>覆盖了前面的函数声明<code>getName</code>,实际执行的是函数表达式（也就是是为什么JavaScript永远不会有函数重载这么一说了），所以输出的是<code>4</code>。<br>　　首先我给下面的代码添加一下必要的注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//函数声明
function Foo() {
    //全局变量
    getName = function () { 
        console.log('1');
    };
    return this;
}
//为函数添加属性getName,其类型是Function，所以这里也可以看出来，Function也是一种Object
Foo.getName = function () {
    console.log('2');
};
//为Foo的原型添加方法getName
Foo.prototype.getName = function () { 
    console.log('3');
};
var getName = function () { 
    console.log('4');
};
function getName() { 
    console.log(5);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//函数声明</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//全局变量</span>
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);
    };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
<span class="hljs-comment">//为函数添加属性getName,其类型是Function，所以这里也可以看出来，Function也是一种Object</span>
Foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
};
<span class="hljs-comment">//为Foo的原型添加方法getName</span>
Foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
};
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
}</code></pre>
<p>　　下面执行第一条语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo.getName();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Foo.getName();  </code></pre>
<p>　　函数<code>Foo</code>本身并没有执行，执行的是函数的属性<code>getName</code>，当然输出的是：<code>2</code>.<br>　　接下来执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getName();    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">getName();    </code></pre>
<p>　　这是在全局范围内执行了<code>getName()</code>，有两条对应的<code>getName</code>的声明，根据前面我们所提到的提升的级别来看实际执行是函数表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getName = function () { 
    console.log('4');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
};</code></pre>
<p>　　所以输出的是<code>4</code>。<br>　　接下来执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo().getName(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Foo().getName(); </code></pre>
<p>首先看一下JavaScript的操作符优先级,从高到低排序<br><span class="img-wrap"><img data-src="/img/remote/1460000007979733?w=1332&amp;h=1128" src="https://static.alili.tech/img/remote/1460000007979733?w=1332&amp;h=1128" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span><br>　　从上面可以看出来<code>()</code>与<code>.</code>优先级相同，所以<code>Foo().getName()</code>从左至右执行。首先运行<code>Foo()</code>,全局的<code>getName</code>被覆盖成输出<code>console.log('1')</code>,并且返回的<code>this</code>此时代表的是<code>window</code>。随后相当于执行的<code>window.getName()</code>,那么输出的实际就是<code>1</code>(被覆盖)。<br>　　下面到了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getName();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code class="javscrpit" style="word-break: break-word; white-space: initial;">getName()<span class="hljs-comment">;  </span></code></pre>
<p>　　这个不用说了，执行的还是：<code>1</code>(和上面一毛一样)。<br>　　下面到了三个最难的部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Foo.getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> Foo.getName();</code></pre>
<p>对于这条语句的执行，有两种可能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(new Foo).getName()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">(<span class="hljs-keyword">new</span> Foo).getName()</code></pre>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new (Foo.getName)()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> (Foo.getName)()</code></pre>
<p>　　但是我们根据操作符优先级表可以得知，其实上<code>.</code>操作符要比<code>new</code>优先级要高，所以实际执行的是第二种，所以是对</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo.getName = function () {
    console.log('2');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
};</code></pre>
<p>函数执行了<code>new</code>操作，当然输出的是<code>2</code>。<br>下面到了执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Foo().getName();   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> Foo().getName();   </code></pre>
<p>　　这个语句的可能性也有两种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(new Foo()).getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code class="javascit" style="word-break: break-word; white-space: initial;">(<span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Foo</span>()).<span class="hljs-title">getName</span>();</span></code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new (Foo().getName)();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> (Foo().getName)();</code></pre>
<p>　　那么应该是那种的呢？原来我以为会是第二种的执行方式，后面通过浏览器调试发现真实的执行的方式是第一种。我看到题目的作者是这么解释的：</p>
<blockquote><p>首先看运算符优先级括号高于new。实际执行为(new Foo()).getName()。遂先执行Foo函数。</p></blockquote>
<p>　　我觉得上面的解释是有问题的，对比上面两种执行方式，第一种是先执行<code>new</code>，然后执行的是<code>.</code>操作符，然后执行的是<code>()</code>。第二种是先执行了<code>()</code>,再执行的是<code>.</code>，最后执行<code>new</code>操作符。如果真的按照引用所说的用优先级的方式判别，其实恰恰应该执行的是第二种而不是第一种。<br>　　后来总算找到原因了，原来之前那个出现的比较多的JavaScript优先级的表并不完整，万能的MDN给出了最权威的JavaScript优先级表<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence" rel="nofollow noreferrer" target="_blank">运算符优先级</a><br>　　我列举出最重要的部分（由高到低）：<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000007979734?w=1196&amp;h=630" src="https://static.alili.tech/img/remote/1460000007979734?w=1196&amp;h=630" alt="优先级表格" title="优先级表格" style="cursor: pointer;"></span><br>　　所以带参数的<code>new</code>操作符是优先级最高的，这下就没有问题了，执行顺序确实应该是第一种。<br>　　那么按照<code>(new Foo()).getName();</code>来执行，情况就就很简单了，<code>(new Foo())</code>返回了新生成的对象，该对象没有<code>getName()</code>方法，所以在<code>prototype</code>中找到了<code>getName()</code>方法。所以输出的是<code>3</code>。<br>　　胜利就在眼前，我们看一下最后一问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new new Foo().getName();        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-keyword">new</span> Foo().getName();        </code></pre>
<p>　　和上一步一样的方法，我们按照优先级表给分析一下这个语句到底是怎么执行的。<br>　　首先带参数的<code>new</code>操作符优先级最高，第一步划分为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new (new Foo().getName)();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code class="javacript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-type"></span>(<span class="hljs-keyword">new</span> <span class="hljs-type">Foo</span>().getName)();</code></pre>
<p>　　第二步划分为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new ((new Foo()).getName)();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> ((<span class="hljs-keyword">new</span> Foo()).getName)();</code></pre>
<p>　　所以执行<code>(new Foo()).getName</code>这个函数是对应的Foo.prototype.getName,所以执行<code>new (Foo.prototype.getName)()</code>肯定输出的是<code>3</code>。<br>　　哈哈哈，这么难得题终于解决了，开心~总结一下吧，首先JavaScript知识最好去MDN去查，万一别的地方写错了真的是害人不浅。其次，如果在写代码的时候还是少利用操作符优先级这种东西，一旦不明确的地方就立刻用<code>()</code>，代码的可阅读性真的是很重要！很重要！很重要！毕竟代码还是给人看~<br>　　如果有写的不正确的地方，欢迎大家指出，资历深浅，请多指教。欢迎大家去围观我的博客呀~~<a href="http://mrerhu.github.io" rel="nofollow noreferrer" target="_blank">http://mrerhu.github.io</a><br>　　</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一道颇有难度的JavaScript题

## 原文链接
[https://segmentfault.com/a/1190000007979730](https://segmentfault.com/a/1190000007979730)

