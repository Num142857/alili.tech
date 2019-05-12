---
title: 'JS魔法堂：彻底理解0.1 + 0.2 === 0.30000000000000004的背后' 
date: 2019-02-11 2:30:49
hidden: true
slug: c5o31gi2txw
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Brief</h3>
<p>一天有个朋友问我“JS中计算0.7 * 180怎么会等于125.99999999998，坑也太多了吧！”那时我猜测是二进制表示数值时发生round-off error所导致，但并不清楚具体是如何导致，并且有什么方法去规避。于是用了3周时间静下心把这个问题搞懂，在学习的过程中还发现不仅0.7 * 180==125.99999999998，还有以下的坑</p>
<ol>
<li><p>著名的 0.1 + 0.2 === 0.30000000000000004</p></li>
<li><p>1000000000000000128 === 1000000000000000129</p></li>
</ol>
<h3 id="articleHeader1">IEEE 754 Floating-point</h3>
<p>众所周知JS仅有Number这个数值类型，而Number采用的时IEEE 754 64位双精度浮点数编码。而浮点数表示方式具有以下特点：</p>
<ol>
<li><p>浮点数可表示的值范围比同等位数的整数表示方式的值范围要大得多；</p></li>
<li><p>浮点数无法精确表示其值范围内的所有数值，而有符号和无符号整数则是精确表示其值范围内的每个数值；</p></li>
<li><p>浮点数只能精确表示m*2e的数值；</p></li>
<li><p>当biased-exponent为2e-1-1时，浮点数能精确表示该范围内的各整数值；</p></li>
<li><p>当biased-exponent不为2e-1-1时，浮点数不能精确表示该范围内的各整数值。</p></li>
</ol>
<p>由于部分数值无法精确表示（存储），于是在运算统计后偏差会愈见明显。</p>
<p>想了解更多浮点数的知识可参考以下文章：</p>
<ul>
<li><p><a href="http://www.cnblogs.com/fsjohnhuang/p/5060242.html" rel="nofollow noreferrer" target="_blank">《基础野：细说原码、反码和补码》</a></p></li>
<li><p><a href="http://www.cnblogs.com/fsjohnhuang/p/5078290.html" rel="nofollow noreferrer" target="_blank">《基础野：细说无符号整数》</a></p></li>
<li><p><a href="http://www.cnblogs.com/fsjohnhuang/p/5082829.html" rel="nofollow noreferrer" target="_blank">《基础野：细说有符号整数》</a></p></li>
<li><p><a href="http://www.cnblogs.com/fsjohnhuang/p/5109766.html" rel="nofollow noreferrer" target="_blank">《基础野：细说浮点数》</a></p></li>
</ul>
<h3 id="articleHeader2">Why 0.1 + 0.2 === 0.30000000000000004?</h3>
<p>在浮点数运算中产生误差值的示例中，最出名应该是0.1 + 0.2 === 0.30000000000000004了，到底有多有名？看看这个网站就知道了<a href="http://0.30000000000000004.com/" rel="nofollow noreferrer" target="_blank">http://0.30000000000000004.com/</a>。也就是说不仅是JavaScript会产生这种问题，只要是采用IEEE 754 Floating-point的浮点数编码方式来表示浮点数时，则会产生这类问题。下面我们来分析整个运算过程。</p>
<ol>
<li><p>0.1 的二进制表示为 1.1001100110011001100110011001100110011001100110011001 1(0011)+ * 2^-4；</p></li>
<li><p>当64bit的存储空间无法存储完整的无限循环小数，而IEEE 754 Floating-point采用round to nearest, tie to even的舍入模式，因此0.1实际存储时的位模式是0-01111111011-1001100110011001100110011001100110011001100110011010；</p></li>
<li><p>0.2 的二进制表示为 1.1001100110011001100110011001100110011001100110011001 1(0011)+ * 2^-3；</p></li>
<li><p>当64bit的存储空间无法存储完整的无限循环小数，而IEEE 754 Floating-point采用round to nearest, tie to even的舍入模式，因此0.2实际存储时的位模式是0-01111111100-1001100110011001100110011001100110011001100110011010；</p></li>
<li><p>实际存储的位模式作为操作数进行浮点数加法，得到 0-01111111101-0011001100110011001100110011001100110011001100110100。转换为十进制即为0.30000000000000004。</p></li>
</ol>
<h3 id="articleHeader3">Why 0.7 * 180===125.99999999998?</h3>
<ol>
<li><p>0.7实际存储时的位模式是0-01111111110-0110011001100110011001100110011001100110011001100110；</p></li>
<li><p>180实际存储时的位模式是0-10000000110-0110100000000000000000000000000000000000000000000000；</p></li>
<li><p>实际存储的位模式作为操作数进行浮点数乘法，得到0-10000000101-1111011111111111111111111111111111111111101010000001。转换为十进制即为125.99999999998。</p></li>
</ol>
<h3 id="articleHeader4">Why 1000000000000000128 === 1000000000000000129?</h3>
<ol>
<li><p>1000000000000000128实际存储时的位模式是0-10000111010-1011110000010110110101100111010011101100100000000001；</p></li>
<li><p>1000000000000000129实际存储时的位模式是0-10000111010-1011110000010110110101100111010011101100100000000001；</p></li>
<li><p>因此1000000000000000128和1000000000000000129的实际存储的位模式是一样的。</p></li>
</ol>
<h3 id="articleHeader5">Solution</h3>
<p>到这里我们都理解只要采取IEEE 754 FP的浮点数编码的语言均会出现上述问题，只是它们的标准类库已经为我们提供了解决方案而已。而JS呢？显然没有。坏处自然是掉坑了，而好处恰恰也是掉坑了:)</p>
<p>针对不同的应用需求，我们有不同的实现方式。</p>
<h4>Solution 0x00 - Simple implementation</h4>
<p>对于小数和小整数的简单运算可用如下方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function numAdd(num1/*:String*/, num2/*:String*/) { 
    var baseNum, baseNum1, baseNum2; 
    try { 
        baseNum1 = num1.split(&quot;.&quot;)[1].length; 
    } catch (e) { 
        baseNum1 = 0; 
    } 
    try { 
        baseNum2 = num2.split(&quot;.&quot;)[1].length; 
    } catch (e) { 
        baseNum2 = 0;
    } 
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2)); 
    return (num1 * baseNum + num2 * baseNum) / baseNum; 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">function</span> numAdd(num1<span class="hljs-comment">/*:String*/</span>, num2<span class="hljs-comment">/*:String*/</span>) { 
    var <span class="hljs-keyword">baseNum, </span><span class="hljs-keyword">baseNum1, </span><span class="hljs-keyword">baseNum2; </span>
    try { 
        <span class="hljs-keyword">baseNum1 </span>= num1.split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length<span class="hljs-comment">; </span>
    } catch (e) { 
        <span class="hljs-keyword">baseNum1 </span>= <span class="hljs-number">0</span><span class="hljs-comment">; </span>
    } 
    try { 
        <span class="hljs-keyword">baseNum2 </span>= num2.split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length<span class="hljs-comment">; </span>
    } catch (e) { 
        <span class="hljs-keyword">baseNum2 </span>= <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    } 
    <span class="hljs-keyword">baseNum </span>= Math.pow(<span class="hljs-number">10</span>, Math.max(<span class="hljs-keyword">baseNum1, </span><span class="hljs-keyword">baseNum2)); </span>
    return (num1 * <span class="hljs-keyword">baseNum </span>+ num2 * <span class="hljs-keyword">baseNum) </span>/ <span class="hljs-keyword">baseNum; </span>
}<span class="hljs-comment">;</span></code></pre>
<h4>Solution 0x01 - math.js</h4>
<p>若需要复杂且全面的运算功能那必须上math.js，其内部引用了decimal.js和fraction.js。功能异常强大，用于生产环境上妥妥的！</p>
<h4>Solution 0x02 - D.js</h4>
<p>D.js算是我的练手项目吧，截止本文发表时D.js版本为V0.2.0，仅实现了加、减、乘和整除运算而已，bug是一堆堆的，但至少解决了0.1+0.2的问题了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = D.add(0.1, 0.2)
console.log(sum + '') // 0.3

var product = D.mul(&quot;1e-2&quot;, &quot;2e-4&quot;)
console.log(product + '') // 0.000002

var quotient = D.div(-3, 2)
console.log(quotient + '') // -(1+1/2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-keyword">sum</span> = D.add(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>)
console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">sum</span> + <span class="hljs-string">''</span>) <span class="hljs-comment">// 0.3</span>

<span class="hljs-built_in">var</span> product = D.mul(<span class="hljs-string">"1e-2"</span>, <span class="hljs-string">"2e-4"</span>)
console.<span class="hljs-keyword">log</span>(product + <span class="hljs-string">''</span>) <span class="hljs-comment">// 0.000002</span>

<span class="hljs-built_in">var</span> quotient = D.div(<span class="hljs-number">-3</span>, <span class="hljs-number">2</span>)
console.<span class="hljs-keyword">log</span>(quotient + <span class="hljs-string">''</span>) <span class="hljs-comment">// -(1+1/2)</span></code></pre>
<p>解题思路：</p>
<ol>
<li><p>由于仅位于Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER间的整数才能被精准地表示，也就是只要保证运算过程的操作数和结果均落在这个阀值内，那么运算结果就是精准无误的；</p></li>
<li><p>问题的关键落在如何将小数和极大数转换或拆分为Number.MIN_SAFE_INTEGER至Number.MAX_SAFE_INTEGER阀值间的数了；</p></li>
<li><p>小数转换为整数，自然就是通过科学计数法表示，并通过右移小数点，减小幂的方式处理；(如0.000123 等价于 123 * 10-6)</p></li>
<li>
<p>而极大数则需要拆分，拆分的规则是多样的。</p>
<ol>
<li><p>按因式拆分：假设对12345进行拆分得到 5 * 2469；</p></li>
<li><p>按位拆分：假设以3个数值为一组对12345进行拆分得到345和12，而实际值为12*1000 + 345。<br> 就我而言，1 的拆分规则结构不稳定，而且不直观；而 2 的规则直观，且拆分和恢复的公式固定。</p></li>
</ol>
</li>
<li><p>余数由符号位、分子和分母组成，而符号与整数部分一致，因此只需考虑如何表示分子和分母即可。</p></li>
<li><p>无限循环数则仅需考虑如何表示循环数段即可。（如10.2343434则分成10.23 和循环数34和34的权重即可）</p></li>
</ol>
<p>得到编码规则后，那就剩下基于指定编码如何实现各种运算的问题了。</p>
<ol>
<li><p>基于上述的数值编码规则如何实现加、减运算呢？</p></li>
<li><p>基于上述的数值编码规则如何实现乘、除运算呢？（其实只要加、减运算解决了，乘除必然可解，就是效率问题而已）</p></li>
<li><p>基于上述的数值编码规则如何实现其它如sin、tan、%等数学运算呢？</p></li>
</ol>
<p>另外由于涉及数学运算，那么将作为add、sub、mul和div等入参的变量保持如同数学公式运算数般纯净（Persistent/Immutable Data Structure）是必须的，那是否还要引入immutable.js呢？（D.js现在采用按需生成副本的方式，可预见随着代码量的增加，这种方式会导致整体代码无法维护）</p>
<h3 id="articleHeader6">Conclusion</h3>
<p>依照我的尿性，D.js将采取不定期持续更新的策略（待我理解Persistent/Immutable Data Structure后吧:)）。欢迎各位指教！</p>
<p>尊重原创，转载请注明来自：<a href="http://www.cnblogs.com/fsjohnhuang/p/5115672.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fsjohnhuang/p/5115672.html</a> ^_^肥子John</p>
<h3 id="articleHeader7">Thanks</h3>
<p><a href="http://es5.github.io" rel="nofollow noreferrer" target="_blank">http://es5.github.io</a><br><a href="https://github.com/MikeMcl/decimal.js/" rel="nofollow noreferrer" target="_blank">https://github.com/MikeMcl/decimal.js/</a><br><a href="http://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html</a><br><a href="http://demon.tw/copy-paste/javascript-precision.html" rel="nofollow noreferrer" target="_blank">http://demon.tw/copy-paste/javascript-precision.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS魔法堂：彻底理解0.1 + 0.2 === 0.30000000000000004的背后

## 原文链接
[https://segmentfault.com/a/1190000005022170](https://segmentfault.com/a/1190000005022170)

