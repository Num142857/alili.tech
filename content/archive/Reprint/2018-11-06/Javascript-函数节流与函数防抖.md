---
title: Javascript-函数节流与函数防抖
hidden: true
categories: reprint
slug: ffa82191
date: 2018-11-06 15:28:31
---

{{< raw >}}
<h3 id="articleHeader0">&#x51FD;&#x6570;&#x8282;&#x6D41;&#xFF08;throttle&#xFF09;</h3><h4>&#x540D;&#x8BCD;&#x89E3;&#x91CA;</h4><p>&#x51FD;&#x6570;&#x8282;&#x6D41;&#xFF08;throttle&#xFF09;&#xFF1A;&#x8FDE;&#x7EED;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x9694;&#x4E00;&#x5B9A;&#x65F6;&#x95F4;&#x6267;&#x884C;&#x51FD;&#x6570;</p><h4>&#x4F7F;&#x7528;&#x573A;&#x666F;</h4><p>&#x9F20;&#x6807;&#x79FB;&#x52A8;&#xFF0C;mousemove &#x4E8B;&#x4EF6;<br>DOM &#x5143;&#x7D20;&#x52A8;&#x6001;&#x5B9A;&#x4F4D;&#xFF0C;window&#x5BF9;&#x8C61;&#x7684;resize&#x548C;scroll &#x4E8B;&#x4EF6;<br>&#x7B49;&#x7B49;...</p><h4>&#x51FD;&#x6570;&#x8282;&#x6D41;&#xFF08;throttle&#xFF09;&#x7B80;&#x5355;&#x5B9E;&#x73B0;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function throttle(fn, delay) {
        var last; // &#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x65F6;&#x95F4;
        var timer; // &#x5B9A;&#x65F6;&#x5668;
        delay || (delay = 250); // &#x9ED8;&#x8BA4;&#x95F4;&#x9694;&#x4E3A;250ms
        return function() {
            var context = this;
            var args = arguments;
            var now = +new Date(); // &#x73B0;&#x5728;&#x7684;&#x65F6;&#x95F4;
            if (last &amp;&amp; now &lt; last + delay) { // &#x5F53;&#x524D;&#x8DDD;&#x79BB;&#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x65F6;&#x95F4;&#x5C0F;&#x4E8E;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x95F4;&#x95F4;&#x9694;
                clearTimeout(timer); // &#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;
                timer = setTimeout(function() { // delay&#x65F6;&#x95F4;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x51FD;&#x6570;
                    last = now;
                    fn.apply(context, args);
                }, delay);
            } else { // &#x5F53;&#x524D;&#x8DDD;&#x79BB;&#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x65F6;&#x95F4;&#x5927;&#x4E8E;&#x7B49;&#x4E8E;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x51FD;&#x6570;
                last = now;
                fn.apply(context, args);
            }
        };
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn, delay</span>) </span>{
        <span class="hljs-keyword">var</span> last; <span class="hljs-comment">// &#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x65F6;&#x95F4;</span>
        <span class="hljs-keyword">var</span> timer; <span class="hljs-comment">// &#x5B9A;&#x65F6;&#x5668;</span>
        delay || (delay = <span class="hljs-number">250</span>); <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x95F4;&#x9694;&#x4E3A;250ms</span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
            <span class="hljs-keyword">var</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">// &#x73B0;&#x5728;&#x7684;&#x65F6;&#x95F4;</span>
            <span class="hljs-keyword">if</span> (last &amp;&amp; now &lt; last + delay) { <span class="hljs-comment">// &#x5F53;&#x524D;&#x8DDD;&#x79BB;&#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x65F6;&#x95F4;&#x5C0F;&#x4E8E;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x95F4;&#x95F4;&#x9694;</span>
                clearTimeout(timer); <span class="hljs-comment">// &#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;</span>
                timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// delay&#x65F6;&#x95F4;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x51FD;&#x6570;</span>
                    last = now;
                    fn.apply(context, args);
                }, delay);
            } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// &#x5F53;&#x524D;&#x8DDD;&#x79BB;&#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x65F6;&#x95F4;&#x5927;&#x4E8E;&#x7B49;&#x4E8E;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x51FD;&#x6570;</span>
                last = now;
                fn.apply(context, args);
            }
        };
    }</code></pre><h3 id="articleHeader1">&#x51FD;&#x6570;&#x9632;&#x6296;&#xFF08;debounce&#xFF09;</h3><h4>&#x540D;&#x8BCD;&#x89E3;&#x91CA;</h4><p>&#x51FD;&#x6570;&#x9632;&#x6296;&#xFF08;debounce&#xFF09;&#xFF1A;&#x7A7A;&#x95F2;&#x65F6;&#x95F4;&#x5FC5;&#x987B;&#x5927;&#x4E8E;&#x6216;&#x7B49;&#x4E8E;&#x4E00;&#x5B9A;&#x503C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x8C03;&#x7528;&#x65B9;&#x6CD5;</p><h4>&#x4F7F;&#x7528;&#x573A;&#x666F;</h4><p>&#x6587;&#x672C;&#x8F93;&#x5165;keydown &#x4E8B;&#x4EF6;<br>&#x7B49;&#x7B49;...</p><h4>&#x51FD;&#x6570;&#x9632;&#x6296;&#xFF08;debounce&#xFF09;&#x7B80;&#x5355;&#x5B9E;&#x73B0;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function debounce(fn, delay) {
        var timer; // &#x5B9A;&#x65F6;&#x5668;
        delay || (delay = 250); // &#x9ED8;&#x8BA4;&#x7A7A;&#x95F2;&#x65F6;&#x95F4;250ms
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timer); // &#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;
            timer = setTimeout(function() { // delay&#x65F6;&#x95F4;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x51FD;&#x6570;
                fn.apply(context, args);
            }, delay);
        };
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn, delay</span>) </span>{
        <span class="hljs-keyword">var</span> timer; <span class="hljs-comment">// &#x5B9A;&#x65F6;&#x5668;</span>
        delay || (delay = <span class="hljs-number">250</span>); <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x7A7A;&#x95F2;&#x65F6;&#x95F4;250ms</span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
            clearTimeout(timer); <span class="hljs-comment">// &#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;</span>
            timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// delay&#x65F6;&#x95F4;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x51FD;&#x6570;</span>
                fn.apply(context, args);
            }, delay);
        };
    }</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript-函数节流与函数防抖

## 原文链接
[https://segmentfault.com/a/1190000016548877](https://segmentfault.com/a/1190000016548877)

