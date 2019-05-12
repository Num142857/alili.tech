---
title: '细数JavaScript中那些神乎其神的技巧' 
date: 2019-01-28 2:30:09
hidden: true
slug: 35nlfyf30f2
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><strong>闲来无事，整理一下JavaScript中那些神乎其神的技巧，假装大牛的样子</strong></h3>
<h2 id="articleHeader1">1. 字符串转换为数字</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = &quot;123&quot;;
    console.log(+a);         // 123
    console.log(typeof +a);  // number

    // 同样可用于日期转换为数值：
    var b = +new Date();     // 1468545682168" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> a = <span class="hljs-string">"123"</span>;
    <span class="hljs-built_in">console</span>.log(+a);         <span class="hljs-comment">// 123</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> +a);  <span class="hljs-comment">// number</span>

    <span class="hljs-comment">// 同样可用于日期转换为数值：</span>
    <span class="hljs-keyword">var</span> b = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();     <span class="hljs-comment">// 1468545682168</span></code></pre>
<h2 id="articleHeader2">2. 数值向下取整</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = ~~3.14;   // 3
    var b = 3.14>>0;  // 3
    var c = 3.14|0;   // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    var a = ~~<span class="hljs-number">3.14</span>;   <span class="hljs-comment">// 3</span>
    var b = <span class="hljs-number">3.14</span>&gt;&gt;<span class="hljs-number">0</span>;  <span class="hljs-comment">// 3</span>
    var c = <span class="hljs-number">3.14</span>|<span class="hljs-number">0</span>;   <span class="hljs-comment">// 3</span></code></pre>
<h2 id="articleHeader3">3. 字符串转换为数值并取整&lt;!-- more --&gt;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = &quot;3.14&quot;|0;  // 3
    var b = &quot;3.14&quot;^0;  // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">var</span> a = <span class="hljs-string">"3.14"</span>|<span class="hljs-number">0</span>;  <span class="hljs-comment">// 3</span>
    <span class="hljs-keyword">var</span> b = <span class="hljs-string">"3.14"</span>^<span class="hljs-number">0</span>;  <span class="hljs-comment">// 3</span></code></pre>
<blockquote><p>谢谢 <a href="/u/kaishixuexiqianduan">@开始学习前端</a> 指正，<strong>该取整直接去除小数点后数字，仅对正数有效</strong></p></blockquote>
<h2 id="articleHeader4">4. 函数设置默认值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function func(arg){
        var arg = arg || &quot;default&quot;; 
        // arg 为 undefined, null, &quot;&quot;, 0, false, NaN 时最后都得到&quot;default&quot;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span><span class="hljs-params">(arg)</span></span>{
        var <span class="hljs-built_in">arg</span> = <span class="hljs-built_in">arg</span> || <span class="hljs-string">"default"</span>; 
        // <span class="hljs-built_in">arg</span> 为 undefined, null, <span class="hljs-string">""</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>, NaN 时最后都得到<span class="hljs-string">"default"</span>
    }</code></pre>
<h2 id="articleHeader5">5. 变量值交换</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var a = 1,
        b = 2;
    a = [b, b = a][0];
    console.log(a);  // 2
    console.log(b);  // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>,
        b = <span class="hljs-number">2</span>;
    a = [b, b = a][<span class="hljs-number">0</span>];
    <span class="hljs-built_in">console</span>.log(a);  <span class="hljs-comment">// 2</span>
    <span class="hljs-built_in">console</span>.log(b);  <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader6">6. 使用<code>for in</code>遍历对象取到属性名与属性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var obj = {
        a: 1,
        b: 2
    }
    for(var i in obj) {
        console.log(&quot;obj.&quot; + i + &quot; = &quot; + obj[i]);
    }
    // output: obj.a = 1
    //         obj.b = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"obj."</span> + i + <span class="hljs-string">" = "</span> + obj[i]);
    }
    <span class="hljs-comment">// output: obj.a = 1</span>
    <span class="hljs-comment">//         obj.b = 2</span></code></pre>
<h2 id="articleHeader7">7. 截断数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var arr = [1, 2, 3, 4, 5, 6];
    arr.length = 3;
    console.log(arr);  // [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    var arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>];
    arr.length = <span class="hljs-number">3</span>;
    console.log(arr);  <span class="hljs-comment">// [1, 2, 3]</span></code></pre>
<h2 id="articleHeader8">8. 提高遍历较大Enumerable数据的性能</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var arr = [1, 2, 3, 4, 5, 6, ...];
    var len = arr.length;  // 缓存arr.length
    for(var i = 0; i < len; i++) {
        console.log(arr[i]);
    }
    
    // 也可将缓存写在for的声明中
    for(var i = 0, len = a.length; i < len; i++) {
        console.log(arr[i]);
    }

    // 或者（！注意：若数组中键值存在undefined、null、0、false等数据时会中断遍历）
    for(var i = 0, a; a = arr[i++];) {
        console.log(a);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, ...];
    <span class="hljs-built_in">var</span> len = arr.<span class="hljs-built_in">length</span>;  // 缓存arr.<span class="hljs-built_in">length</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        console.<span class="hljs-built_in">log</span>(arr[i]);
    }
    
    // 也可将缓存写在<span class="hljs-keyword">for</span>的声明中
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, len = a.<span class="hljs-built_in">length</span>; i &lt; len; i++) {
        console.<span class="hljs-built_in">log</span>(arr[i]);
    }

    // 或者（！注意：若数组中键值存在undefined、null、<span class="hljs-number">0</span>、<span class="hljs-literal">false</span>等数据时会中断遍历）
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, a; a = arr[i++];) {
        console.<span class="hljs-built_in">log</span>(a);
    }</code></pre>
<h2 id="articleHeader9">9. 使用 <code>&amp;&amp;</code> 替代单一条件判断</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 你可能这样写过
    if(!token) {
        login();
    }
    // 其实这样也可以
    !token &amp;&amp; login();
    // 或
    token || login();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>    <span class="hljs-comment">// 你可能这样写过</span>
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">token</span>) {
        login();
    }
    <span class="hljs-comment">// 其实这样也可以</span>
    !<span class="hljs-built_in">token</span> &amp;&amp; login();
    <span class="hljs-comment">// 或</span>
    <span class="hljs-built_in">token</span> || login();</code></pre>
<h2 id="articleHeader10">10. 检测 对象/数组 中是否有指定 属性/元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var CURD = {
        add: function() {},
        delete: function() {},
        edit: function() {}
    }
    console.log(&quot;add&quot; in CURD);   // true
    console.log(&quot;find&quot; in CURD);  // false

    /* 误 */
    // var arr = [1, 2, 3];
    // console.log(1 in arr);  // true
    // console.log(6 in arr);  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> CURD = {
        <span class="hljs-attr">add</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">delete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">edit</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"add"</span> <span class="hljs-keyword">in</span> CURD);   <span class="hljs-comment">// true</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"find"</span> <span class="hljs-keyword">in</span> CURD);  <span class="hljs-comment">// false</span>

    <span class="hljs-comment">/* 误 */</span>
    <span class="hljs-comment">// var arr = [1, 2, 3];</span>
    <span class="hljs-comment">// console.log(1 in arr);  // true</span>
    <span class="hljs-comment">// console.log(6 in arr);  // false</span></code></pre>
<blockquote><p>谢谢 <a href="/u/zaaack">@zaaack</a> 指正，<strong>数组的存在检测实质上是检测的是数组下标</strong></p></blockquote>
<h2 id="articleHeader11">11. 通过闭包调用setTimeout</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    for(var i = 0; i < 10; i++) {
        setTimeout(function(){
            console.log(i);  // 10 10 10 ...
        },500);
    }

    for(var i = 0; i < 10; i++) {
        (function(i){
            setTimeout(function(){
                console.log(i);  // 0 1 2 3 ...
            },500)
        })(i);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>    for(<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {</span>
        setTimeout(<span class="hljs-name">function</span>(){
            console.log(<span class="hljs-name">i</span>)<span class="hljs-comment">;  // 10 10 10 ...</span>
        },<span class="hljs-number">500</span>)<span class="hljs-comment">;</span>
    }

    for(<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {</span>
        (<span class="hljs-name">function</span>(<span class="hljs-name">i</span>){
            setTimeout(<span class="hljs-name">function</span>(){
                console.log(<span class="hljs-name">i</span>)<span class="hljs-comment">;  // 0 1 2 3 ...</span>
            },<span class="hljs-number">500</span>)
        })(<span class="hljs-name">i</span>)<span class="hljs-comment">;</span>
    }</code></pre>
<h2 id="articleHeader12">12. <code>To be continue...</code>
</h2>
<hr>
<h4><strong>Started At <a href="http://blog.tail.cc/JavaScript/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%EF%BC%9A%E6%9F%AF%E9%87%8C%E5%8C%96%E7%9A%84%E5%8F%98%E5%9E%8B%E5%BA%94%E7%94%A8/" rel="nofollow noreferrer" target="_blank">函数式编程：柯里化的变型应用 | 熊D博客</a></strong></h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
细数JavaScript中那些神乎其神的技巧

## 原文链接
[https://segmentfault.com/a/1190000008017702](https://segmentfault.com/a/1190000008017702)

