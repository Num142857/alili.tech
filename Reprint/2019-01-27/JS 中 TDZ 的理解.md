---
title: 'JS 中 TDZ 的理解' 
date: 2019-01-27 2:31:00
hidden: true
slug: xwquh4g09bl
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://acrens.github.io/2017/01/22/2017-01-22-TDZ/" rel="nofollow noreferrer" target="_blank">https://acrens.github.io/2017/01/22/2017-01-22-TDZ/</a><br>春节快到了，假期也快到了，空闲之余刷个微博，看见 @ruanyf 提出了一个问题与 TDZ 有关，但是貌似阮大当时还没有意识到这个问题，多亏一些其他业内同仁提出了与 TDZ 相关；当然，以阮大的能力这都不是事。由于当时我本身也还不知道 TDZ 这一回事没有看懂，所以就花了一些时间去搞清楚什么是 TDZ 及TDZ会带来一些什么问题，本文主要是用于介绍我对 TDZ 的一些理解，如有问题，多谢指出。</p>
<h4>示例</h4>
<ul>
<li>
<p>案例一</p>
<ol><li><p>代码</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let y = 1;
function foo(x = y, y) {
    console.log(x);
}
foo();  // ReferenceError: y is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> y = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x = y, y</span>) </span>{
    <span class="hljs-built_in">console</span>.log(x);
}
foo();  <span class="hljs-comment">// ReferenceError: y is not defined</span></code></pre>
<ol>
<li>
<p>解读</p>
<ul>
<li><p>当函数存在默认参数时，且调用方法不传任何参数，会存在三个作用域环境；</p></li>
<li><p>全局作用域、参数作用域、函数体作用域；</p></li>
<li><p>当执行 foo 函数时，参数作用域在 x = y 之后才定义 let y，注意：let 定义，所以根据 let 定义变量的作用知道 x = y 肯定会报错；</p></li>
</ul>
</li>
<li><p>代码翻译：将以上代码翻译之后可以按下面代码片段阅读更易于理解</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function analysis() {
    &quot;use strict&quot;;
    let y = 1;

    function foo() {  
        let x = arguments[0] !== (void 0) ? arguments[0] : y;   // y not defined
        let y = arguments[1];
    }
    foo();

    return {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">analysis</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-keyword">let</span> y = <span class="hljs-number">1</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-keyword">let</span> x = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] !== (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) ? <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] : y;   <span class="hljs-comment">// y not defined</span>
        <span class="hljs-keyword">let</span> y = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
    }
    foo();

    <span class="hljs-keyword">return</span> {};
}</code></pre>
</li>
<li>
<p>案例二</p>
<ol><li><p>代码</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let y = 1;
function foo(x = function(){console.log(y)}, y = 2) {
    x(); // 2
    y = 3;
    x(); // 3
}
foo();
console.log(y); //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> y = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x = function(</span>)</span>{<span class="hljs-built_in">console</span>.log(y)}, y = <span class="hljs-number">2</span>) {
    x(); <span class="hljs-comment">// 2</span>
    y = <span class="hljs-number">3</span>;
    x(); <span class="hljs-comment">// 3</span>
}
foo();
<span class="hljs-built_in">console</span>.log(y); <span class="hljs-comment">//1</span></code></pre>
<ol>
<li>
<p>解读</p>
<ul>
<li><p>当函数存在默认参数时，且调用方法不传任何参数，会存在三个作用域环境；</p></li>
<li><p>全局作用域、参数作用域、函数体作用域；</p></li>
<li><p>当执行 foo 函数时，x 被申明为匿名函数变量，此时函数并未被执行，所以正常；之后定义 y 值为 2，此时调用 x() 输出的当然是变量 y 的值，之后继续修改 y 的值，再继续调用 x()，输出 y 最新值 3；当执行外部 console.log(y) 时并不能访问内部函数变量，访问的变量是当前域下的 y = 1 的值 1，所以输出 1；</p></li>
</ul>
</li>
<li><p>代码翻译：将以上代码翻译之后可以按下面代码片段阅读更易于理解</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function analysis() {
    &quot;use strict&quot;;
    let y = 1;

    function foo() {  
        let x = arguments[0] !== (void 0) ? arguments[0] : function() {
            console.log(y);
        };
        let y = arguments[1] !== (void 0) ? arguments[1] : 2;
        x(); // 2
        y = 3;
        x();    // 3
    }
    foo();
    console.log(y); // 1

    return {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">analysis</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-keyword">let</span> y = <span class="hljs-number">1</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-keyword">let</span> x = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] !== (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) ? <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(y);
        };
        <span class="hljs-keyword">let</span> y = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] !== (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) ? <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] : <span class="hljs-number">2</span>;
        x(); <span class="hljs-comment">// 2</span>
        y = <span class="hljs-number">3</span>;
        x();    <span class="hljs-comment">// 3</span>
    }
    foo();
    <span class="hljs-built_in">console</span>.log(y); <span class="hljs-comment">// 1</span>

    <span class="hljs-keyword">return</span> {};
}</code></pre>
</li>
<li>
<p>案例三</p>
<ol><li><p>代码</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let y = 1;
function foo(x = function(){console.log(y)}) {
    let y = 3;
    x(); // 1
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> y = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x = function(</span>)</span>{<span class="hljs-built_in">console</span>.log(y)}) {
    <span class="hljs-keyword">let</span> y = <span class="hljs-number">3</span>;
    x(); <span class="hljs-comment">// 1</span>
}
foo();</code></pre>
<ol>
<li>
<p>解读</p>
<ul>
<li><p>当函数存在默认参数时，且调用方法不传任何参数，会存在三个作用域环境；</p></li>
<li><p>全局作用域、参数作用域、函数体作用域；</p></li>
<li><p>当执行 foo 函数时，x 被赋值为一个匿名函数的变量，且存在与参数作用域内，let y = 3 会被定义到函数体作用域内，属于参数作用域的内部函数；当 x() 执行时是在函数体作用域定被调用，但是其定义是在参数作用域，所以执行环境是在参数作用域内，此时在参数作用域没有定义 y 变量，也不能访问内部函数 funBody 内部定义的变量 y，此时往上级函数查找是否存在 y 被定义，如果被定义则输出其值，所以输出最外层变量 y 的值 1；</p></li>
</ul>
</li>
<li><p>代码翻译：将以上代码翻译之后可以按下面代码片段阅读更易于理解</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function analysis() {
    &quot;use strict&quot;;
    let y = 1;

    function foo() {  
        let x = arguments[0] !== (void 0) ? arguments[0] : function() {
            console.log(y);
        };

        function funBody() {
            let y = 3;
            x();
        }
        funBody();
    }
    foo();

    return {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">analysis</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-keyword">let</span> y = <span class="hljs-number">1</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-keyword">let</span> x = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] !== (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) ? <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(y);
        };

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funBody</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">let</span> y = <span class="hljs-number">3</span>;
            x();
        }
        funBody();
    }
    foo();

    <span class="hljs-keyword">return</span> {};
}</code></pre>
</li>
<li>
<p>案例四</p>
<ol><li><p>代码</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(x = function(){console.log(y)}) {
    let y = 3;
    x(); // // ReferenceError: y is not defined
}
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x = function(</span>)</span>{<span class="hljs-built_in">console</span>.log(y)}) {
    <span class="hljs-keyword">let</span> y = <span class="hljs-number">3</span>;
    x(); <span class="hljs-comment">// // ReferenceError: y is not defined</span>
}
foo();</code></pre>
<ol>
<li>
<p>解读</p>
<ul>
<li><p>当函数存在默认参数时，且调用方法不传任何参数，会存在三个作用域环境；</p></li>
<li><p>全局作用域、参数作用域、函数体作用域；</p></li>
<li><p>当执行 foo 函数时，x 被赋值为一个匿名函数的变量，且存在与参数作用域内，let y = 3 会被定义到函数体作用域内，属于参数作用域的内部函数；当 x() 执行时是在函数体作用域定被调用，但是其定义是在参数作用域，所以执行环境是在参数作用域内，此时在参数作用域没有定义 y 变量，也不能访问内部函数 funBody 内部定义的变量 y，此时往上级函数查找是否存在 y 被定义，如果被定义则输出其值，否则报 y 没有被定义错误，此案例只是案例三的一种测试；</p></li>
</ul>
</li>
<li><p>代码翻译：将以上代码翻译之后可以按下面代码片段阅读更易于理解</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function analysis() {
    &quot;use strict&quot;;
    function foo() {  
        let x = arguments[0] !== (void 0) ? arguments[0] : function() {
            console.log(y);
        };

        function funBody() {
            let y = 3;
            x();
        }
        funBody();
    }
    foo();

    return {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">analysis</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-keyword">let</span> x = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] !== (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) ? <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(y);
        };

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funBody</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">let</span> y = <span class="hljs-number">3</span>;
            x();
        }
        funBody();
    }
    foo();

    <span class="hljs-keyword">return</span> {};
}</code></pre>
</li>
</ul>
<h4>参考</h4>
<p>以上核心部分在代码翻译部分，通过配合一下资料及个人的理解，翻译出通俗易懂的代码：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let</a>；</p></li>
<li><p><a href="http://dmitrysoshnikov.com/ecmascript/es6-notes-default-values-of-parameters/#tdz-temporal-dead-zone-for-parameters" rel="nofollow noreferrer" target="_blank">http://dmitrysoshnikov.com/ecmascript/es6-notes-default-values-of-parameters/#tdz-temporal-dead-zone-for-parameters</a>；</p></li>
<li><p><a href="https://github.com/google/traceur-compiler/issues/1604" rel="nofollow noreferrer" target="_blank">https://github.com/google/traceur-compiler/issues/1604</a>。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 中 TDZ 的理解

## 原文链接
[https://segmentfault.com/a/1190000008194770](https://segmentfault.com/a/1190000008194770)

