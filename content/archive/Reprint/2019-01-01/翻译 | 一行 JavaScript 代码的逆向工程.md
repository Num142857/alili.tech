---
title: '翻译 | 一行 JavaScript 代码的逆向工程' 
date: 2019-01-01 2:30:07
hidden: true
slug: 4knm3gep6kq
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>原文地址：<a href="https://www.alexkras.com/reverse-engineering-one-line-of-javascript" rel="nofollow noreferrer" target="_blank">Reverse Engineering One Line of JavaScript</a>
</li>
<li>原文作者：<a href="https://www.alexkras.com/author/admin/" rel="nofollow noreferrer" target="_blank">Alex Kras</a>
</li>
<li>译者：李波</li>
<li>校对者：冬青、小萝卜</li>
</ul>
<p>几个月前，我看到一个邮件问：有没有人可以解析这一行 JavaScript 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<pre id=p><script>n=setInterval(&quot;for(n+=7,i=k,P='p.\\n';i-=1/k;P+=P[i%2?(i%2*j-j+n/k^j)&amp;1:2])j=k/i;p.innerHTML=P&quot;,k=64)</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;pre id=p&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">n=setInterval(<span class="hljs-string">"for(n+=7,i=k,P='p.\\n';i-=1/k;P+=P[i%2?(i%2*j-j+n/k^j)&amp;1:2])j=k/i;p.innerHTML=P"</span>,k=<span class="hljs-number">64</span>)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这一行代码会被渲染成下图的效果。你可以在<a href="https://codepen.io/akras14/pen/yXGzVd" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="akras14/pen/yXGzVd" data-typeid="3">点击预览</button>用浏览器打开来观看。这是 Mathieu ‘p01’ Henri 写的，你还可以在作者的网站<a>www.p01.org</a>里看到更多很酷的例子。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073914" src="https://static.alili.tech/img/remote/1460000011073914" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>好的！我决定接受挑战</p>
<h2 id="articleHeader0">第一步：让代码变得可读</h2>
<p>第一件事，让 HTML 文件里只有 HTML 代码，然后把 JavaScript 代码放到 <code>code.js</code> 文件里。我还用 <code>id="p"</code> 来包装 pre 标签。</p>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;code.js&quot;></script>
<pre id=&quot;p&quot;></pre>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"code.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">pre</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"p"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span></code></pre>
<p>我注意到变量 <code>k</code> 只是一个常量，所以把它移出来，然后重命名为 <code>delay</code>。</p>
<p>code.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> draw = <span class="hljs-string">"for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P"</span>;
<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>接下来，因为 <code>setInterval</code> 可以接收一个函数或者字符串来执行，字符串 <code>var draw</code> 会被 setInterval 用 <code>eval</code> 来解析并执行。所以我把它移到一个新建的函数体内。 然后保留旧的那行代码，以供参考。</p>
<p>我注意到的另一个点，变量 <code>p</code> 指向了存在于 HTML 的 DOM 结构里 id 为 <code>p</code> 的标签，就是那个之前我包装过的 pre 标签。事实上，元素标签可以通过他们的 id 用 JavaScript 来获取，只要 id 仅由字母数字组成。这里，我通过 <code>document.getElementById("p")</code> 来让它更加直观。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var p = document.getElementById(&quot;p&quot;); // < --------------
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var draw = function() {
    for (n += 7, i = delay, P = 'p.\n'; i -= 1 / delay; P += P[i % 2 ? (i % 2 * j - j + n / delay ^ j) &amp; 1 : 2]) {
        j = delay / i; p.innerHTML = P;
    }
};
var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>); <span class="hljs-comment">// &lt; --------------</span>
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (n += <span class="hljs-number">7</span>, i = delay, P = <span class="hljs-string">'p.\n'</span>; i -= <span class="hljs-number">1</span> / delay; P += P[i % <span class="hljs-number">2</span> ? (i % <span class="hljs-number">2</span> * j - j + n / delay ^ j) &amp; <span class="hljs-number">1</span> : <span class="hljs-number">2</span>]) {
        j = delay / i; p.innerHTML = P;
    }
};
<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>下一步，我声明了变量 <code>i</code>、<code>p</code> 和 <code>j</code>，然后把他们放在函数的顶部。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var p = document.getElementById(&quot;p&quot;);
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var draw = function() {
    var i = delay; // < ---------------
    var P ='p.\n';
    var j;
    for (n += 7; i > 0 ;P += P[i % 2 ? (i % 2 * j - j + n / delay ^ j) &amp; 1 : 2]) {
        j = delay / i; p.innerHTML = P;
        i -= 1 / delay;
    }
};
var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>);
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = delay; <span class="hljs-comment">// &lt; ---------------</span>
    <span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>;
    <span class="hljs-keyword">var</span> j;
    <span class="hljs-keyword">for</span> (n += <span class="hljs-number">7</span>; i &gt; <span class="hljs-number">0</span> ;P += P[i % <span class="hljs-number">2</span> ? (i % <span class="hljs-number">2</span> * j - j + n / delay ^ j) &amp; <span class="hljs-number">1</span> : <span class="hljs-number">2</span>]) {
        j = delay / i; p.innerHTML = P;
        i -= <span class="hljs-number">1</span> / delay;
    }
};
<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>我把 <code>for</code> 循环分解成 <code>while</code> 循环。只保留了 <code>for</code> 的CHECK_EVERY_LOOP部分（for的三个部分分别是RUNS_ONCE_ON_INIT; CHECK_EVERY_LOOP; DO_EVERY_LOOP），然后分别把其他的代码移到循环的内外部。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var p = document.getElementById(&quot;p&quot;);
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var draw = function() {
    var i = delay;
    var P ='p.\n';
    var j;
    n += 7;
    while (i > 0) { // <----------------------
        //Update HTML
        p.innerHTML = P;

        j = delay / i;
        i -= 1 / delay;
        P += P[i % 2 ? (i % 2 * j - j + n / delay ^ j) &amp; 1 : 2];
    }
};
var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>);
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = delay;
    <span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>;
    <span class="hljs-keyword">var</span> j;
    n += <span class="hljs-number">7</span>;
    <span class="hljs-keyword">while</span> (i &gt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// &lt;----------------------</span>
        <span class="hljs-comment">//Update HTML</span>
        p.innerHTML = P;

        j = delay / i;
        i -= <span class="hljs-number">1</span> / delay;
        P += P[i % <span class="hljs-number">2</span> ? (i % <span class="hljs-number">2</span> * j - j + n / delay ^ j) &amp; <span class="hljs-number">1</span> : <span class="hljs-number">2</span>];
    }
};
<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>接着我将会展开 <code>P += P[i % 2 ? (i % 2 * j - j + n / delay ^ j) &amp; 1 : 2]</code> 中的三元操作（<code>判断条件 ？ true时运行 ：false时运行</code>）</p>
<p><code>i % 2</code> 是用来检测 <code>i</code> 是奇数还是偶数，如果 i 是偶数，则返回 2。如果是奇数，则返回 <code>(i % 2 * j - j + n / delay ^ j) &amp; 1</code> 的计算结果（更多的是这种情况）。</p>
<p>最终，这个返回值被当作索引，被用于获取字符串P的某个字符，因此它可以写成 <code>P += P[index]</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var p = document.getElementById(&quot;p&quot;);
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var draw = function() {
    var i = delay;
    var P ='p.\n';
    var j;
    n += 7;
    while (i > 0) {
        //Update HTML
        p.innerHTML = P;

        j = delay / i;
        i -= 1 / delay;

        let index;
        let iIsOdd = (i % 2 != 0); // <---------------

        if (iIsOdd) { // <---------------
            index = (i % 2 * j - j + n / delay ^ j) &amp; 1;
        } else {
            index = 2;
        }

        P += P[index];
    }
};
var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>);
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = delay;
    <span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>;
    <span class="hljs-keyword">var</span> j;
    n += <span class="hljs-number">7</span>;
    <span class="hljs-keyword">while</span> (i &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-comment">//Update HTML</span>
        p.innerHTML = P;

        j = delay / i;
        i -= <span class="hljs-number">1</span> / delay;

        <span class="hljs-keyword">let</span> index;
        <span class="hljs-keyword">let</span> iIsOdd = (i % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>); <span class="hljs-comment">// &lt;---------------</span>

        <span class="hljs-keyword">if</span> (iIsOdd) { <span class="hljs-comment">// &lt;---------------</span>
            index = (i % <span class="hljs-number">2</span> * j - j + n / delay ^ j) &amp; <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            index = <span class="hljs-number">2</span>;
        }

        P += P[index];
    }
};
<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>下一步，我会把 <code>index = (i % 2 * j - j + n / delay ^ j) &amp; 1</code> 里的 <code>&amp; 1</code> 分解到另外的 if 表达式里。</p>
<p>这是一种聪明的方法来检测括号内的值是奇数还是偶数，如果是偶数则返回 0，反之返回 1.<code>&amp;</code> 是与的位运算符。与的逻辑如下：</p>
<ul>
<li>1 &amp; 1 = 1</li>
<li>0 &amp; 1 = 0</li>
</ul>
<p>因此 <code>something &amp; 1</code> 则可以看成把“something”转化成二进制，接着在 1 的前面填充对应数量的 0，从而保持和 something 的长度一致，然后仅仅返回与运算的最后一位。例如，5的二进制是 <code>101</code>。如果我们和 <code>1</code> 进行与运算，将会得到如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    101
AND 001
    001" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-number">101</span>
AND <span class="hljs-number">001</span>
    <span class="hljs-number">001</span></code></pre>
<p>或者说，5是一个奇数，<code>5 &amp; 1</code> 的结果是 1。用 JavaScript 的控制台很容易可以证明下面这个逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0 &amp; 1 // 0 - even return 0
1 &amp; 1 // 1 - odd return 1
2 &amp; 1 // 0 - even return 0
3 &amp; 1 // 1 - odd return 1
4 &amp; 1 // 0 - even return 0
5 &amp; 1 // 1 - odd return 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0</span> &amp; <span class="hljs-number">1</span> <span class="hljs-comment">// 0 - even return 0</span>
<span class="hljs-number">1</span> &amp; <span class="hljs-number">1</span> <span class="hljs-comment">// 1 - odd return 1</span>
<span class="hljs-number">2</span> &amp; <span class="hljs-number">1</span> <span class="hljs-comment">// 0 - even return 0</span>
<span class="hljs-number">3</span> &amp; <span class="hljs-number">1</span> <span class="hljs-comment">// 1 - odd return 1</span>
<span class="hljs-number">4</span> &amp; <span class="hljs-number">1</span> <span class="hljs-comment">// 0 - even return 0</span>
<span class="hljs-number">5</span> &amp; <span class="hljs-number">1</span> <span class="hljs-comment">// 1 - odd return 1</span></code></pre>
<p>注意，我将上述 <code>index</code> 的剩余部分重命名为 <code>magic</code>。因此这些代码加上展开 <code>&amp; 1</code> 后的代码看起来是下面这样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var p = document.getElementById(&quot;p&quot;);
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var draw = function() {
    var i = delay;
    var P ='p.\n';
    var j;
    n += 7;
    while (i > 0) {
        //Update HTML
        p.innerHTML = P;

        j = delay / i;
        i -= 1 / delay;

        let index;
        let iIsOdd = (i % 2 != 0);

        if (iIsOdd) {
            let magic = (i % 2 * j - j + n / delay ^ j);
            let magicIsOdd = (magic % 2 != 0); // &amp;1 < --------------------------
            if (magicIsOdd) { // &amp;1 <--------------------------
                index = 1;
            } else {
                index = 0;
            }
        } else {
            index = 2;
        }

        P += P[index];
    }
};
var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>);
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = delay;
    <span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>;
    <span class="hljs-keyword">var</span> j;
    n += <span class="hljs-number">7</span>;
    <span class="hljs-keyword">while</span> (i &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-comment">//Update HTML</span>
        p.innerHTML = P;

        j = delay / i;
        i -= <span class="hljs-number">1</span> / delay;

        <span class="hljs-keyword">let</span> index;
        <span class="hljs-keyword">let</span> iIsOdd = (i % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>);

        <span class="hljs-keyword">if</span> (iIsOdd) {
            <span class="hljs-keyword">let</span> magic = (i % <span class="hljs-number">2</span> * j - j + n / delay ^ j);
            <span class="hljs-keyword">let</span> magicIsOdd = (magic % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>); <span class="hljs-comment">// &amp;1 &lt; --------------------------</span>
            <span class="hljs-keyword">if</span> (magicIsOdd) { <span class="hljs-comment">// &amp;1 &lt;--------------------------</span>
                index = <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                index = <span class="hljs-number">0</span>;
            }
        } <span class="hljs-keyword">else</span> {
            index = <span class="hljs-number">2</span>;
        }

        P += P[index];
    }
};
<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>接下来，我将会分解 <code>P += P[index]</code> 到一个 switch 表达式里。现在我们可以很清晰的知道 index的值只可能为 0、1 和 2 中的一个。也可以知道 P 的初始化总是 <code>var P ='p.\n'</code>， index 为 0 时指向 <code>p</code>，为 1 时指向 <code>.</code>，为 2 时指向 <code>\n</code> —— 新的一行字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var delay = 64;
var p = document.getElementById(&quot;p&quot;);
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;
var draw = function() {
    var i = delay;
    var P ='p.\n';
    var j;
    n += 7;
    while (i > 0) {
        //Update HTML
        p.innerHTML = P;

        j = delay / i;
        i -= 1 / delay;

        let index;
        let iIsOdd = (i % 2 != 0);

        if (iIsOdd) {
            let magic = (i % 2 * j - j + n / delay ^ j);
            let magicIsOdd = (magic % 2 != 0); // &amp;1
            if (magicIsOdd) { // &amp;1
                index = 1;
            } else {
                index = 0;
            }
        } else {
            index = 2;
        }

        switch (index) { // P += P[index]; <-----------------------
            case 0:
                P += &quot;p&quot;; // aka P[0]
                break;
            case 1:
                P += &quot;.&quot;; // aka P[1]
                break;
            case 2:
                P += &quot;\n&quot;; // aka P[2]
        }
    }
};

var n = setInterval(draw, delay);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> delay = <span class="hljs-number">64</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>);
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = delay;
    <span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>;
    <span class="hljs-keyword">var</span> j;
    n += <span class="hljs-number">7</span>;
    <span class="hljs-keyword">while</span> (i &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-comment">//Update HTML</span>
        p.innerHTML = P;

        j = delay / i;
        i -= <span class="hljs-number">1</span> / delay;

        <span class="hljs-keyword">let</span> index;
        <span class="hljs-keyword">let</span> iIsOdd = (i % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>);

        <span class="hljs-keyword">if</span> (iIsOdd) {
            <span class="hljs-keyword">let</span> magic = (i % <span class="hljs-number">2</span> * j - j + n / delay ^ j);
            <span class="hljs-keyword">let</span> magicIsOdd = (magic % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>); <span class="hljs-comment">// &amp;1</span>
            <span class="hljs-keyword">if</span> (magicIsOdd) { <span class="hljs-comment">// &amp;1</span>
                index = <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                index = <span class="hljs-number">0</span>;
            }
        } <span class="hljs-keyword">else</span> {
            index = <span class="hljs-number">2</span>;
        }

        <span class="hljs-keyword">switch</span> (index) { <span class="hljs-comment">// P += P[index]; &lt;-----------------------</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
                P += <span class="hljs-string">"p"</span>; <span class="hljs-comment">// aka P[0]</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                P += <span class="hljs-string">"."</span>; <span class="hljs-comment">// aka P[1]</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                P += <span class="hljs-string">"\n"</span>; <span class="hljs-comment">// aka P[2]</span>
        }
    }
};

<span class="hljs-keyword">var</span> n = setInterval(draw, delay);</code></pre>
<p>我将简化 <code>var n = setInterval(draw, delay)</code>。<code>setInterval</code> 会返回一个从 1 开始的整数，并且每次执行完 <code>setInterval</code> 之后返回值都会递增。这个整数可以在 <code>clearInterval</code> 方法里面用到（用来取消定时器）。在我们的代码里， <code>setInterval</code> 仅仅只会执行一次，所以 n 可以简单的设置为 1.</p>
<p>我还把 <code>delay</code> 重命名为 <code>DELAY</code> 让它看起来是一个常量。</p>
<p>最后但并非不重要的一点，我用括号把 <code>i % 2 * j - j + n / DELAY</code> 包起来，指明 <code>^</code> 异或运算的执行优先度低于 <code>%</code>,<code>*</code>,<code>-</code>,<code>+</code>和<code>/</code>操作。或者说，所有的运算操作都会比 <code>^</code> 先执行。包装后的代码应该是这样的 <code>((i % 2 * j - j + n / DELAY) ^ j)</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 之前我把 `p.innerHTML = P;` 放错地方了，更新后，把它移出了while循环

const DELAY = 64; // approximately 15 frames per second 15 frames per second * 64 seconds = 960 frames
var n = 1;
var p = document.getElementById(&quot;p&quot;);
// var draw = &quot;for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P&quot;;

/**
 * Draws a picture
 * 128 chars by 32 chars = total 4096 chars
 */
var draw = function() {
    var i = DELAY; // 64
    var P ='p.\n'; // First line, reference for chars to use
    var j;

    n += 7;

    while (i > 0) {

        j = DELAY / i;
        i -= 1 / DELAY;

        let index;
        let iIsOdd = (i % 2 != 0);

        if (iIsOdd) {
            let magic = ((i % 2 * j - j + n / DELAY) ^ j); // < ------------------
            let magicIsOdd = (magic % 2 != 0); // &amp;1
            if (magicIsOdd) { // &amp;1
                index = 1;
            } else {
                index = 0;
            }
        } else {
            index = 2;
        }

        switch (index) { // P += P[index];
            case 0:
                P += &quot;p&quot;; // aka P[0]
                break;
            case 1:
                P += &quot;.&quot;; // aka P[1]
                break;
            case 2:
                P += &quot;\n&quot;; // aka P[2]
        }
    }
    //Update HTML
    p.innerHTML = P;
};

setInterval(draw, 64);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// 之前我把 `p.innerHTML = P;` 放错地方了，更新后，把它移出了while循环</span>

<span class="hljs-keyword">const</span> DELAY = <span class="hljs-number">64</span>; <span class="hljs-comment">// approximately 15 frames per second 15 frames per second * 64 seconds = 960 frames</span>
<span class="hljs-keyword">var</span> n = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"p"</span>);
<span class="hljs-comment">// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&amp;1:2])j=delay/i;p.innerHTML=P";</span>

<span class="hljs-comment">/**
 * Draws a picture
 * 128 chars by 32 chars = total 4096 chars
 */</span>
<span class="hljs-keyword">var</span> draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = DELAY; <span class="hljs-comment">// 64</span>
    <span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>; <span class="hljs-comment">// First line, reference for chars to use</span>
    <span class="hljs-keyword">var</span> j;

    n += <span class="hljs-number">7</span>;

    <span class="hljs-keyword">while</span> (i &gt; <span class="hljs-number">0</span>) {

        j = DELAY / i;
        i -= <span class="hljs-number">1</span> / DELAY;

        <span class="hljs-keyword">let</span> index;
        <span class="hljs-keyword">let</span> iIsOdd = (i % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>);

        <span class="hljs-keyword">if</span> (iIsOdd) {
            <span class="hljs-keyword">let</span> magic = ((i % <span class="hljs-number">2</span> * j - j + n / DELAY) ^ j); <span class="hljs-comment">// &lt; ------------------</span>
            <span class="hljs-keyword">let</span> magicIsOdd = (magic % <span class="hljs-number">2</span> != <span class="hljs-number">0</span>); <span class="hljs-comment">// &amp;1</span>
            <span class="hljs-keyword">if</span> (magicIsOdd) { <span class="hljs-comment">// &amp;1</span>
                index = <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                index = <span class="hljs-number">0</span>;
            }
        } <span class="hljs-keyword">else</span> {
            index = <span class="hljs-number">2</span>;
        }

        <span class="hljs-keyword">switch</span> (index) { <span class="hljs-comment">// P += P[index];</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
                P += <span class="hljs-string">"p"</span>; <span class="hljs-comment">// aka P[0]</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                P += <span class="hljs-string">"."</span>; <span class="hljs-comment">// aka P[1]</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                P += <span class="hljs-string">"\n"</span>; <span class="hljs-comment">// aka P[2]</span>
        }
    }
    <span class="hljs-comment">//Update HTML</span>
    p.innerHTML = P;
};

setInterval(draw, <span class="hljs-number">64</span>);</code></pre>
<p>你可以在<a href="https://codepen.io/akras14/pen/qjgrxz" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="akras14/pen/qjgrxz" data-typeid="3">点击预览</button>看到最后的结果。</p>
<h2 id="articleHeader1">第二步：理解代码</h2>
<p>这部分将会介绍什么内容呢？不要心急，让我们一步一步来解析。</p>
<p><code>i</code> 通过 <code>var i = DELAY</code>，被初始化为 64，然后每次循环递减 1/64，等于0.015625（i -= 1 / DELAY）。循环持续到 <code>i</code> 小于 0 时（<code>while (i &gt; 0) {</code>）。每次执行循环，<code>i</code> 将会减少 1/64，所以每执行 64 次循环，<code>i</code> 就会减 1 （64 / 64 = 1），总得来说， <code>i</code> 需要执行 64 x 64 = 4096 次，之后小于 0.</p>
<p>之前的图片中，一共有 32 行，每行包含了 128 个字符。恰巧的是 64 x 64 = 32 x 128 = 4096。我们触发 32 次 <code>i</code> 为严谨的偶数的情况，<code>i</code> 是绝对的偶数时，<code>i</code> 才为偶数（非奇数 <code>let iIsOdd = (i % 2 != 0)</code>; 译者提示：偶数是整数，所以2.2是奇数），例如 <code>i</code> 为 64，62，60等。在这 32 次里，index 通过 <code>index = 2</code> 赋值为 2，意味着字符串将添加 <code>P += "\n"; // aka P[2]</code> 从而换行，开始一行新的字符串。剩余的 127 个字符则都是 <code>p</code> 和 <code>.</code>。</p>
<p>那么我们根据什么来判断何时用 <code>p</code> 或者 <code>.</code> ?</p>
<p>当然，之前我们就已经知道了，当 <code>let magic = ((i % 2 * j - j + n / DELAY) ^ j)</code> 中的 magic 是奇数的时候用 <code>.</code> ，如果是偶数则用 <code>p</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var P ='p.\n';

...

if (magicIsOdd) { // &amp;1
    index = 1; // second char in P - .
} else {
    index = 0; // first char in P - p
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> P =<span class="hljs-string">'p.\n'</span>;

...

if (magicIsOdd) { <span class="hljs-comment">// &amp;1</span>
    index = <span class="hljs-number">1</span>; <span class="hljs-comment">// second char in P - .</span>
} <span class="hljs-keyword">else</span> {
    index = <span class="hljs-number">0</span>; <span class="hljs-comment">// first char in P - p</span>
}</code></pre>
<p>但我们很难知道 magic 是奇数还是偶数，这是一个很有分量的问题。在此之前，让我们证实一些事情。</p>
<p>如果我们把 <code>+ n/DELAY</code> 从 <code>let magic = ((i % 2 * j - j + n / DELAY) ^ j)</code> 当中移除掉，我们最终将会看到一个静态的布局，如下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073915" src="https://static.alili.tech/img/remote/1460000011073915" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在，让我们来看看移除了 <code>+ n/DELAY</code> 的 <code>magic</code>。如何能得到上面漂亮的图片。</p>
<p><code>(i % 2 * j - j) ^ j</code></p>
<p>注意到每次循环里，我们都会执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="j = DELAY / i;
i -= 1 / DELAY;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">j = DELAY / i;
i -= <span class="hljs-number">1</span> / DELAY;</code></pre>
<p>换句话说，我们可以将上述表达式中的 <code>j</code> 用 <code>i</code> 表示，变成 <code>j = DELAY/ (i + 1/DELAY)</code>，但因为 1/DELAY 是一个非常小的数值，所以我们暂时去掉 <code>+ 1/DELAY</code> 并简化成 <code>j = DELAY/i = 64/i</code></p>
<blockquote>
<p>// 译者注</p>
<p>为何这里不是 j = DELAY/ (i - 1/DELAY)呢？</p>
<p>原因：</p>
<p><code>i -= 1 / DELAY</code> 转化成 <code>i = i - 1 / DELAY</code></p>
<p>这里有 2 个 <code>i</code> 可以代入消元，但是因为 <code>j</code> 的表达式在 <code>i</code> 前面，所以 <code>j</code> 取得 <code>i</code> 应<br>该是自减前的 <code>i</code>，故 <code>i = i + 1/ DELAY</code></p>
</blockquote>
<p>因此我们可以重写 <code>(i % 2 * j - j) ^ j</code> 为 <code>(i % 2 * 64/i - 64/i) ^ 64/i</code></p>
<p>让我们用<a href="https://www.desmos.com/calculator" rel="nofollow noreferrer" target="_blank">在线的图形计算器</a>来绘制那些函数</p>
<p>首先，我们来绘制下 <code>i%2</code> 的图</p>
<p>从下面的图形可以看出，y 的值区间在 0 到 2 之间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073916" src="https://static.alili.tech/img/remote/1460000011073916" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果我们绘制 <code>64 / i</code> 则会得到如下图形</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073917" src="https://static.alili.tech/img/remote/1460000011073917" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果我们绘制 <code>(i % 2 * 64/i - 64/i)</code> 表达式，我们将得到一个混合了上面两张图的一个图形，如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073918" src="https://static.alili.tech/img/remote/1460000011073918" alt="" title="" style="cursor: pointer;"></span></p>
<p>最后，如果我们把2个函数同时绘制出来，将会是如下的图（红线为 <code>j</code> 的关系图）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073919" src="https://static.alili.tech/img/remote/1460000011073919" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">我们能从图形里知道些什么？</h2>
<p>让我们回忆下我们要去解答的问题：如何得到如下静止图像：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073920" src="https://static.alili.tech/img/remote/1460000011073920" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>好的，我们知道如果 <code>(i % 2 * j - j) ^ j</code> 的值是一个偶数，那么我们将添加 <code>p</code>，如果是一个奇数则添加 <code>.</code> 。</p>
<p>让我们专注在图形的前面 16 行，<code>i</code> 的值在 64 到 32 之间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073921" src="https://static.alili.tech/img/remote/1460000011073921" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>异或运算在 JavaScript 里会把小数点右边的值忽略掉，所以它看起来和执行 <code>Math.floor</code> 的效果一样。</p>
<p>其实当2个对比位都是 1 或者 0 的时候, 异或操作会返回0。</p>
<p>这里我们的 <code>j</code> 初始值为 1，且慢慢的递增趋向于 2，但始终小于 2，所以我们可以把它当成 1 来处理（<code>Math.floor(1.9999) === 1</code>），为了得到结果为 0 （意味着是偶数），我们还需要异或表达式的左边也是 1，使得返回一个 <code>p</code> 给我们。</p>
<p>换句话说，每条藏青色的倾斜线都相当于我们图像中的一行，因为前面16行的 <code>j</code> 值总是介于 1 和 2 之间，而唯一能得到奇数值的方法是让 <code>(i % 2 * j - j) ^ j</code>（也可以说<code>i % 2 * i/64 - i/64</code> 或者藏青色的倾斜线）大于 1 或小于 -1。</p>
<p>为了将这个地方讲清楚，这里有一些Javascript控制台的输出，0 或者 -2 意味着结果是偶数，1 则是奇数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 ^ 1 // 0 - even p
1.1 ^ 1.1 // 0 - even p
0.9 ^ 1 // 1 - odd .
0 ^ 1 // 1 - odd .
-1 ^ 1 // -2 - even p
-1.1 ^ 1.1 // -2 - even p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span> ^ <span class="hljs-number">1</span> <span class="hljs-comment">// 0 - even p</span>
<span class="hljs-number">1.1</span> ^ <span class="hljs-number">1.1</span> <span class="hljs-comment">// 0 - even p</span>
<span class="hljs-number">0.9</span> ^ <span class="hljs-number">1</span> <span class="hljs-comment">// 1 - odd .</span>
<span class="hljs-number">0</span> ^ <span class="hljs-number">1</span> <span class="hljs-comment">// 1 - odd .</span>
<span class="hljs-number">-1</span> ^ <span class="hljs-number">1</span> <span class="hljs-comment">// -2 - even p</span>
<span class="hljs-number">-1.1</span> ^ <span class="hljs-number">1.1</span> <span class="hljs-comment">// -2 - even p</span></code></pre>
<p>如果我们观察下我们的图形，可以看出原点右边的斜线大部分都是大于 1 或者小于 -1（几乎没有偶数，或者说几乎没有 p），且越靠后（靠近原点）越如此。第 16 行几乎介于 2 和 -2 之间。第 16 行之后，我们可以看到图形是另外一种模式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073922" src="https://static.alili.tech/img/remote/1460000011073922" alt="" title="" style="cursor: pointer;"></span></p>
<p>16 行之后 <code>j</code> 超过了 2，使得结果发生了变化。现在当藏青色的斜线大于 2 ，小于 -2 ，或者在1和-1之间且不等于的时候，我们将会得到一个偶数。这也是为什么在 17 行之后我们会在一行内看到两组和两组以上的 <code>p</code>。</p>
<p>如果你仔细看动图的最底部几行，你会发现这几行不符合上面的规则，图表曲线看起来起伏非常大。</p>
<p>现在让我们把 <code>+ n/DELAY</code> 加回来。在代码里我们可以看到 <code>n</code> 的初始值是 8 （初始是 1 ，但是每次定时器被调用时就加 7），它会在每次执行定时器时增加 7。</p>
<p>当 <code>n</code> 变成 64，图形会变成如下样子。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073923" src="https://static.alili.tech/img/remote/1460000011073923" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以注意到，<code>j</code> 总是 ~1（这里的 ~ 是近似的意思），但是现在红斜线的左半边位于 62-63 区间的值无限趋近于 0，红斜线的右半边位于 63-64 则无限趋近与 1。因为我们的字符按64到62的顺序排列，那么我们可以猜测斜线的 63-64 部分（1^1=0 是偶数）添加的是一段 <code>p</code>，左边 62-63 部分（1^0=1 是奇数）添加的是一段 <code>.</code>。就像普通的英语单词一样，从左到右的添加上。</p>
<p>用 HTML 渲染出来的话，将会看到下图（你可以自己在 codepen 改变 <code>n</code> 来观看效果）。这和我们的预期一致。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073924" src="https://static.alili.tech/img/remote/1460000011073924" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这一时刻 <code>p</code> 的数量已经增长了一定的数量。例如第一行里面就有一半的值是偶数，从现在起，一大段的<code>p</code> 和 <code>s</code> 将移动他们的位置。</p>
<p>为了说明这一点，我们可以看到当 <code>n</code> 在下一个定时器里增加了 7 时，图形就会有稍微的变化</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073925" src="https://static.alili.tech/img/remote/1460000011073925" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>注意，第一行的斜线（在 64 附近）已经稍微移动了 1 小格，假设 4 个方格代表 128 个字符，1 个方格 相当于 32 个字符，那么 1 个小格则相当于 32/5=6.4 个字符（大约）。正如下图所示，我们可以看到第一行实际上向右移动了 7 个字符。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073926" src="https://static.alili.tech/img/remote/1460000011073926" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>最后一个例子。就是当定时器被调用超过 7 次时（n 等于 64+9x7）会发生什么。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073927" src="https://static.alili.tech/img/remote/1460000011073927" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>对于第一行，<code>j</code> 还等于 1。现在红斜线的上部分在 64 左右的值趋向于 2，下部分趋向于 1。这个图片将会翻转，因为现在 <code>1^2 = 3 是奇数-输出.</code> 而 <code>1^1 = 0 是偶数- 输出p</code>。所以我们预期在一大段 <code>p</code> 之后会是一大段 <code>.</code>。</p>
<p>他会这么渲染。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073928" src="https://static.alili.tech/img/remote/1460000011073928" alt="" title="" style="cursor: pointer;"></span></p>
<p>自此，图形将会以这种形式无限循环下去。</p>
<p>我希望我解释清楚了。我不认为自己有能力写出这样的代码，但是我很享受理解它的过程。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011073929" src="https://static.alili.tech/img/remote/1460000011073929" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p>
<p><a href="https://m.bosszhipin.com/weijd/v2/job/7bbfc95b9f1e9c4a1nRy2926FVA~?date8=20170905&amp;sid=self_jd" rel="nofollow noreferrer" target="_blank">沪江Web前端上海团队招聘【Web前端架构师】，有意者简历至：zhouyao@hujiang.com</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
翻译 | 一行 JavaScript 代码的逆向工程

## 原文链接
[https://segmentfault.com/a/1190000011073909](https://segmentfault.com/a/1190000011073909)

