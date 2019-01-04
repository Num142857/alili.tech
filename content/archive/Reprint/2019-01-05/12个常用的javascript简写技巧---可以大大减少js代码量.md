---
title: '12个常用的javascript简写技巧---可以大大减少js代码量' 
date: 2019-01-05 2:30:10
hidden: true
slug: 3e9rnam5hd6
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://mp.weixin.qq.com/s?__biz=MzIxNTk1OTAwOQ==&amp;mid=2247483663&amp;idx=1&amp;sn=a2318c989365caf5871f83169ec903ca&amp;chksm=97911581a0e69c978347257bb17d0c3390aa32a0109069cc231f2ec05eb5cf99fad5bef0068f#rd" rel="nofollow noreferrer" target="_blank">微信公众号</a>      <a href="http://heternally.ka94.com/index.php/2017/08/10/37.html" rel="nofollow noreferrer" target="_blank">个人博客</a>   <a href="https://zhuanlan.zhihu.com/p/28447227" rel="nofollow noreferrer" target="_blank">知乎</a></p>
<p><strong>本文是并非本人所写，只是我看了觉得对自己很有帮助，所以分享给大家，原文链接在最下面，谢谢观看。</strong><br><strong>1. 空(null, undefined)验证</strong><br>当我们创建了一个新的变量，我们通常会去验证该变量的值是否为空(null)或者未定义(undefined)。这对于JavaScript编程来说，是一个经常要考虑到的验证。<br>如果直接写，像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (variable1 !== null || variable1 !== undefined || variable1 !== ''){
   let variable2 = variable1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== null || <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== undefined || <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== <span class="hljs-string">''</span>){
   <span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span>;
}</code></pre>
<p>我们可以使用一个更加简洁的版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let variable2 = variable1 || '';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> || <span class="hljs-string">''</span>;</code></pre>
<p>如果你不信，可以在谷歌浏览器开发者模式下的控制台中试试！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//值为null的例子
let variable1 = null;
let variable2 = variable1 || '';
console.log(variable2);
//输出: ''
//值为undefined的例子
let variable1 = undefined;
let variable2 = variable1 || '';
console.log(variable2);
//输出: ''
//正常情况
let variable1 = 'hi there';
let variable2 = variable1 || '';
console.log(variable2);
//输出: 'hi there'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">//值为null的例子</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> = null;
<span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> || <span class="hljs-string">''</span>;
console.log(<span class="hljs-keyword">variable</span><span class="hljs-number">2</span>);
<span class="hljs-comment">//输出: ''</span>
<span class="hljs-comment">//值为undefined的例子</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> = undefined;
<span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> || <span class="hljs-string">''</span>;
console.log(<span class="hljs-keyword">variable</span><span class="hljs-number">2</span>);
<span class="hljs-comment">//输出: ''</span>
<span class="hljs-comment">//正常情况</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> = <span class="hljs-string">'hi there'</span>;
<span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> || <span class="hljs-string">''</span>;
console.log(<span class="hljs-keyword">variable</span><span class="hljs-number">2</span>);
<span class="hljs-comment">//输出: 'hi there'</span></code></pre>
<p>在这里要注意的是，你在调试完一组代码后要刷新下页面，或者定义不同的变量，不然会报错：</p>
<hr>
<p><strong>修改：有读者评论应该加上0和false，我也去运行了，的确应该加上，但这边原作者写的标题是null和undefined的鉴定，或许是因为这样才没加上去。那我在这边就自己修改一下</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (variable1 !== null || variable1 !== undefined || variable1 !== '' || variable1 !== 0 || variable1 !== false){
   let variable2 = variable1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== null || <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== undefined || <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== <span class="hljs-string">''</span> || <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== <span class="hljs-number">0</span> || <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> !== false){
   <span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span>;
}</code></pre>
<p>简化后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let variable2 = variable1 || '';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> <span class="hljs-keyword">variable</span><span class="hljs-number">2</span> = <span class="hljs-keyword">variable</span><span class="hljs-number">1</span> || <span class="hljs-string">''</span>;</code></pre>
<hr>
<p><strong>2. 数组</strong><br>这个好像比较简单！ <br>非优化代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = new Array(); a[0] = &quot;myString1&quot;; a[1] = &quot;myString2&quot;; a[2] = &quot;myString3&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">let a = new Array(); a<span class="hljs-string">[0]</span> = <span class="hljs-string">"myString1"</span>; a<span class="hljs-string">[1]</span> = <span class="hljs-string">"myString2"</span>; a<span class="hljs-string">[2]</span> = <span class="hljs-string">"myString3"</span>;</code></pre>
<p>优化代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = [&quot;myString1&quot;, &quot;myString2&quot;, &quot;myString3&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let a</span> = [<span class="hljs-string">"myString1"</span>, <span class="hljs-string">"myString2"</span>, <span class="hljs-string">"myString3"</span>];</code></pre>
<p><strong>3. if true .. else 的优化</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let big;
if (x > 10) {
big = true;
}
else {
big = false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">let</span> big;
<span class="hljs-attribute">if</span> (x &gt; <span class="hljs-number">10</span>) {
<span class="hljs-attribute">big</span> = <span class="hljs-literal">true</span>;
}
<span class="hljs-section">else</span> {
<span class="hljs-attribute">big</span> = <span class="hljs-literal">false</span>;
}</code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let big = x > 10 ? true : false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> <span class="hljs-attr">big</span> = x &gt; <span class="hljs-number">10</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;</code></pre>
<p>这是三目运算，当判断条件和结果都只有一个的时候可以使用。<br>极大的简化了代码量！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let big = (x > 10);
let x = 3,
big = (x > 10) ? &quot;greater 10&quot; : (x < 5) ? &quot;less 5&quot; : &quot;between 5 and 10&quot;;
console.log(big); //&quot;less 5&quot;
let x = 20,
big = {true: x>10, false : x< =10};
console.log(big); //&quot;Object {true=true, false=false}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">big</span> = (x &gt; <span class="hljs-number">10</span>);
<span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">3</span>,
<span class="hljs-attr">big</span> = (x &gt; <span class="hljs-number">10</span>) ? <span class="hljs-string">"greater 10"</span> : (x &lt; <span class="hljs-number">5</span>) ? <span class="hljs-string">"less 5"</span> : <span class="hljs-string">"between 5 and 10"</span>;
console.log(big); //<span class="hljs-string">"less 5"</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">20</span>,
<span class="hljs-attr">big</span> = {<span class="hljs-literal">true</span>: x&gt;<span class="hljs-number">10</span>, <span class="hljs-literal">false</span> : x&lt; =<span class="hljs-number">10</span>};
console.log(big); //<span class="hljs-string">"Object {true=true, false=false}"</span></code></pre>
<p><strong>4. 变量声明</strong><br>尽管JavaScript会自动讲变量上提（hoist），使用该方法可以讲所有的变量都在函数的头部用一行搞定。<br>优化钱:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x;
let y;
let z = 3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> x;
<span class="hljs-keyword">let</span> y;
<span class="hljs-keyword">let</span> <span class="hljs-attr">z</span> = <span class="hljs-number">3</span>;</code></pre>
<p>优化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x, y, z=3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> x, y, <span class="hljs-attr">z=3;</span></code></pre>
<p><strong>5. 赋值语句的简化</strong><br>简化前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x=x+1;
minusCount = minusCount - 1;
y=y*10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">x</span>=x+1;
<span class="hljs-attribute">minusCount</span> = minusCount - 1;
<span class="hljs-attribute">y</span>=y*10;</code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x++;
minusCount --;
y*=10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>x++<span class="hljs-comment">;</span>
minusCount --<span class="hljs-comment">;</span>
y*=<span class="hljs-number">10</span><span class="hljs-comment">;</span></code></pre>
<p>假设x=10，y=5，那么基本的算术操作可以使用如下的简写方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x += y // x=15
x -= y // x=5
x *= y // x=50
x /= y // x=2
x %= y // x=0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code><span class="hljs-keyword">x</span> += y // <span class="hljs-keyword">x</span>=<span class="hljs-number">15</span>
<span class="hljs-keyword">x</span> -= y // <span class="hljs-keyword">x</span>=<span class="hljs-number">5</span>
<span class="hljs-keyword">x</span> *= y // <span class="hljs-keyword">x</span>=<span class="hljs-number">50</span>
<span class="hljs-keyword">x</span> /= y // <span class="hljs-keyword">x</span>=<span class="hljs-number">2</span>
<span class="hljs-keyword">x</span> %= y // <span class="hljs-keyword">x</span>=<span class="hljs-number">0</span></code></pre>
<p><strong>6. 避免使用RegExp对象</strong><br>简化前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var re = new RegExp(&quot;\d+(.)+\d+&quot;,&quot;igm&quot;),
result = re.exrc(&quot;padding 01234 text text 56789 padding&quot;);
console.log(result);//&quot;01234 text text 56789&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> re = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"\d+(.)+\d+"</span>,<span class="hljs-string">"igm"</span>),
result = re.exrc(<span class="hljs-string">"padding 01234 text text 56789 padding"</span>);
<span class="hljs-built_in">console</span>.log(result);<span class="hljs-comment">//"01234 text text 56789"</span></code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = /d+(.)+d+/igm.exec(&quot;padding 01234 text text 56789 padding&quot;);
console.log(result); //&quot;01234 text text 56789&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> result = <span class="hljs-regexp">/d+(.)+d+/igm</span>.exec(<span class="hljs-string">"padding 01234 text text 56789 padding"</span>);
<span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">//"01234 text text 56789"</span></code></pre>
<p><strong>7. If 条件优化</strong><br>简化前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (likeJavaScript === true)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (<span class="hljs-attr">likeJavaScript</span> === <span class="hljs-literal">true</span>)</code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (likeJavaScript)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> <span class="hljs-comment">(likeJavaScript)</span></code></pre>
<p>我们再来个判断非真的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c;
if ( c!= true ) {
// do something...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">c</span>;
<span class="hljs-keyword">if</span> ( <span class="hljs-built_in">c</span>!= <span class="hljs-literal">true</span> ) {
<span class="hljs-comment">// do something...</span>
}</code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c;
if ( !c ) {
// do something...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">c</span>;
<span class="hljs-keyword">if</span> ( !<span class="hljs-built_in">c</span> ) {
<span class="hljs-comment">// do something...</span>
}</code></pre>
<p><strong>9. 函数参数优化</strong><br>我个人倾向于使用获取对象元素的方式来访问函数参数，当然这个见仁见智啦！<br>通常使用的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction( myString, myNumber, myObject, myArray, myBoolean ) {
// do something...
}
myFunction( &quot;String&quot;, 1, [], {}, true );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">( myString, myNumber, myObject, myArray, myBoolean )</span> </span>{
<span class="hljs-comment">// do something...</span>
}
myFunction( <span class="hljs-string">"String"</span>, <span class="hljs-number">1</span>, [], {}, <span class="hljs-literal">true</span> );</code></pre>
<p>我喜欢的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction() {
/* 注释部分
console.log( arguments.length ); // 返回 5
for ( i = 0; i < arguments.length; i++ ) {
console.log( typeof arguments[i] ); // 返回 string, number, object, object, boolean
}
*/
}
myFunction( &quot;String&quot;, 1, [], {}, true );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">()</span> </span>{
<span class="hljs-comment">/* 注释部分
console.log( arguments.length ); // 返回 5
for ( i = 0; i &lt; arguments.length; i++ ) {
console.log( typeof arguments[i] ); // 返回 string, number, object, object, boolean
}
*/</span>
}
myFunction( <span class="hljs-string">"String"</span>, <span class="hljs-number">1</span>, [], {}, <span class="hljs-literal">true</span> );</code></pre>
<p>译者注：原文下方有评论表示不建议用楼主的方法，使用第一种方法函数参数的顺序是可以变动的，第二种你就要小心了。<br><strong>10. charAt()的替代品</strong><br>简化前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;myString&quot;.charAt(0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"myString"</span>.charAt(<span class="hljs-number">0</span>)<span class="hljs-comment">;</span></code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;myString&quot;[0];//返回'm'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"myString"</span>[<span class="hljs-number">0</span>];<span class="hljs-regexp">//</span>返回<span class="hljs-string">'m'</span></code></pre>
<p>译者注：我相信用第一种方法的人已经不多了吧！<br><strong>11. 函数调用还可以更短</strong><br>简化前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function x() {console.log('x')};function y() {console.log('y')};
let z = 3;
if (z == 3)
{
x();
} else
{
y();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">x</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'x'</span>)};<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">y</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'y'</span>)};
<span class="hljs-keyword">let</span> z = <span class="hljs-number">3</span>;
<span class="hljs-keyword">if</span> (z == <span class="hljs-number">3</span>)
{
x();
} <span class="hljs-keyword">else</span>
{
y();
}</code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function x() {console.log('x')};function y() {console.log('y')};let z = 3;
(z==3?x:y)();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">x</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'x'</span>)};<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">y</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'y'</span>)};<span class="hljs-keyword">let</span> z = <span class="hljs-number">3</span>;
(z==<span class="hljs-number">3</span>?x:y)();</code></pre>
<p><strong>12. 如何优雅的表示大数字</strong><br>在JavaScript中，有一个简写数字的方法，也许你忽略了。1e7表示10000000。<br>简化前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 10000; i++) {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (let <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; <span class="hljs-number">10000</span>; <span class="hljs-built_in">i</span>++) {</code></pre>
<p>简化后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < 1e7; i++) {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">for</span> (let <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; <span class="hljs-number">1e7</span>; <span class="hljs-built_in">i</span>++) {</code></pre>
<p><strong>译者</strong>：Fundebug<br><strong>译文</strong>：<a href="http://www.cnblogs.com/fundebug/p/7125282.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fundeb...</a><br><strong>原文</strong>：<a href="https://hackernoon.com/12-amazing-javascript-shorthand-techniques-fef16cdbc7fe" rel="nofollow noreferrer" target="_blank">https://hackernoon.com/12-ama...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
12个常用的javascript简写技巧---可以大大减少js代码量

## 原文链接
[https://segmentfault.com/a/1190000010602924](https://segmentfault.com/a/1190000010602924)

