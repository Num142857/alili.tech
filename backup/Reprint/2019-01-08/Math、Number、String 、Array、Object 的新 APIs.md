---
title: 'Math、Number、String 、Array、Object 的新 APIs' 
date: 2019-01-08 2:30:11
hidden: true
slug: twz1qm9x0h
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Math</h1>
<h3 id="articleHeader1">Math.trunc()</h3>
<h3 id="articleHeader2">取出一个小数的小数部分，返回整数部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.trunc(1.239);  //1
Math.trunc(-3,1415926);  //-2
Math.trunc(3.9);  //3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>Math.trunc(<span class="hljs-number">1.239</span>);  <span class="hljs-comment">//1</span>
Math.trunc(<span class="hljs-number">-3</span>,<span class="hljs-number">1415926</span>);  <span class="hljs-comment">//-2</span>
Math.trunc(<span class="hljs-number">3.9</span>);  <span class="hljs-comment">//3</span>
</code></pre>
<h3 id="articleHeader3">对于空值和无法截取整数的值，返回NaN</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.trunc(&quot;a&quot;);  //NaN
Math.trunc();  //NaN
Math.trunc(NaN);  //NaN
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Math</span>.trunc(<span class="hljs-string">"a"</span>);  <span class="hljs-comment">//NaN</span>
<span class="hljs-built_in">Math</span>.trunc();  <span class="hljs-comment">//NaN</span>
<span class="hljs-built_in">Math</span>.trunc(<span class="hljs-literal">NaN</span>);  <span class="hljs-comment">//NaN</span>
</code></pre>
<h3 id="articleHeader4">Math.sign()</h3>
<h3 id="articleHeader5">判断正数，负数或是0,   正数返回1，负数返回-1，0返回0 其他值返回NaN</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.sign(11.22);  //1
Math.sign(253);  //1
Math.sign(0);  //0
Math.sign(0.0);  //0
Math.sign(-0.0);  //-0
Math.sign(-0);  //-0
Math.sign(-345);  //-1
Math.sign(-2.983958);  //-1
Math.sign('a');  //NaN
Math.sign();  //NaN
Math.sign(NaN);  //NaN
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">11.22</span>);  <span class="hljs-comment">//1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">253</span>);  <span class="hljs-comment">//1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">0</span>);  <span class="hljs-comment">//0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">0.0</span>);  <span class="hljs-comment">//0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-0.0</span>);  <span class="hljs-comment">//-0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-0</span>);  <span class="hljs-comment">//-0</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-345</span>);  <span class="hljs-comment">//-1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-number">-2.983958</span>);  <span class="hljs-comment">//-1</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-string">'a'</span>);  <span class="hljs-comment">//NaN</span>
<span class="hljs-built_in">Math</span>.sign();  <span class="hljs-comment">//NaN</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-literal">NaN</span>);  <span class="hljs-comment">//NaN</span>
</code></pre>
<h3 id="articleHeader6">Math.cbrt()</h3>
<h3 id="articleHeader7">计算一个数的立方根 其他值返回NaN</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.cbrt(8);  //2
Math.cbrt(-64);  //-4
Math.cbrt(-27);//3
Math.sign('a');  //NaN
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Math</span>.cbrt(<span class="hljs-number">8</span>);  <span class="hljs-comment">//2</span>
<span class="hljs-built_in">Math</span>.cbrt(<span class="hljs-number">-64</span>);  <span class="hljs-comment">//-4</span>
<span class="hljs-built_in">Math</span>.cbrt(<span class="hljs-number">-27</span>);<span class="hljs-comment">//3</span>
<span class="hljs-built_in">Math</span>.sign(<span class="hljs-string">'a'</span>);  <span class="hljs-comment">//NaN</span>
</code></pre>
<h3 id="articleHeader8">Number.isInteger()</h3>
<h3 id="articleHeader9">判断一个值是否为整数。是返回true 不是返回false</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isInteger(25) // true  
Number.isInteger(25.0) // true  
Number.isInteger(25.1) // false  
Number.isInteger(&quot;15&quot;) // false  
Number.isInteger(true) // false  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code><span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">25</span>) // <span class="hljs-literal">true</span>  
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">25.0</span>) // <span class="hljs-literal">true</span>  
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-number">25.1</span>) // <span class="hljs-literal">false</span>  
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-string">"15"</span>) // <span class="hljs-literal">false</span>  
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-literal">true</span>) // <span class="hljs-literal">false</span>  
</code></pre>
<h3 id="articleHeader10">Number.isNaN()</h3>
<h3 id="articleHeader11">用来查看一个值是否为NaN</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.isNaN(NaN) // true  
Number.isNaN(15) // false  
Number.isNaN('15') // false  
Number.isNaN(true) // false 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">NaN</span>) <span class="hljs-comment">// true  </span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-number">15</span>) <span class="hljs-comment">// false  </span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">'15'</span>) <span class="hljs-comment">// false  </span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-literal">true</span>) <span class="hljs-comment">// false </span>
</code></pre>
<h1 id="articleHeader12">String</h1>
<h3 id="articleHeader13">includes()</h3>
<h3 id="articleHeader14">用来查看是否包含数组中的相连的任意几个 包含返回ture 不包含false</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;weirenshi&quot;;
str.includes(&quot;shi&quot;)//ture
str.includes(&quot;ei&quot;)//ture
str.includes(&quot;df&quot;)//false
str.includes(&quot;dfghjk&quot;)//false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span>=<span class="hljs-string">"weirenshi"</span>;
<span class="hljs-keyword">str</span>.includes(<span class="hljs-string">"shi"</span>)<span class="hljs-comment">//ture</span>
<span class="hljs-keyword">str</span>.includes(<span class="hljs-string">"ei"</span>)<span class="hljs-comment">//ture</span>
<span class="hljs-keyword">str</span>.includes(<span class="hljs-string">"df"</span>)<span class="hljs-comment">//false</span>
<span class="hljs-keyword">str</span>.includes(<span class="hljs-string">"dfghjk"</span>)<span class="hljs-comment">//false</span>
</code></pre>
<h3 id="articleHeader15">startsWidth()</h3>
<h3 id="articleHeader16">以字符串字母开头(一个或两个)  是返回ture 不是包含false</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;weirenshi&quot;;
str.startsWidth(&quot;w&quot;)//ture
str.startsWidth(&quot;we&quot;)//ture
str.startsWidth(&quot;d&quot;)//false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span>=<span class="hljs-string">"weirenshi"</span>;
<span class="hljs-keyword">str</span>.startsWidth(<span class="hljs-string">"w"</span>)<span class="hljs-comment">//ture</span>
<span class="hljs-keyword">str</span>.startsWidth(<span class="hljs-string">"we"</span>)<span class="hljs-comment">//ture</span>
<span class="hljs-keyword">str</span>.startsWidth(<span class="hljs-string">"d"</span>)<span class="hljs-comment">//false</span>
</code></pre>
<h3 id="articleHeader17">endsWidth</h3>
<h3 id="articleHeader18">以字符串字母结尾(一个或两个)  是返回ture 不是包含false</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;weirenshi&quot;;
str.endsWidth(&quot;i&quot;)//ture
str.endsWidth(&quot;hi&quot;)//ture
str.endsWidth(&quot;d&quot;)//false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>var <span class="hljs-keyword">str</span>=<span class="hljs-string">"weirenshi"</span>;
<span class="hljs-keyword">str</span>.endsWidth(<span class="hljs-string">"i"</span>)<span class="hljs-comment">//ture</span>
<span class="hljs-keyword">str</span>.endsWidth(<span class="hljs-string">"hi"</span>)<span class="hljs-comment">//ture</span>
<span class="hljs-keyword">str</span>.endsWidth(<span class="hljs-string">"d"</span>)<span class="hljs-comment">//false</span>
</code></pre>
<h1 id="articleHeader19">repeat</h1>
<h3 id="articleHeader20">复制 定义几个就会复制几个</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;abc&quot;.repeat(3) // &quot;abcabcabc&quot;
&quot;wei&quot;.repeat(5) // &quot;weiweiweiweiwei&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-string">"abc"</span>.<span class="hljs-keyword">repeat</span><span class="hljs-comment">(3)</span> <span class="hljs-comment">// "abcabcabc"</span>
<span class="hljs-string">"wei"</span>.<span class="hljs-keyword">repeat</span><span class="hljs-comment">(5)</span> <span class="hljs-comment">// "weiweiweiweiwei"</span>
</code></pre>
<h3 id="articleHeader21">Array</h3>
<h3 id="articleHeader22">Array.from 复制给一个数组，原封不动的复制下来</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[1,2,3,4,5];
var ass=Array.from(arr);//[1,2,3,4,5]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
var ass=Array.from(arr);<span class="hljs-comment">//[1,2,3,4,5]</span>
</code></pre>
<h3 id="articleHeader23">Array.of  放到一个数组里</h3>
<h3 id="articleHeader24">类似于 new Array</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.of(1, 2, 3);//[1,2,3]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>Array.of(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);<span class="hljs-comment">//[1,2,3]</span>
</code></pre>
<h1 id="articleHeader25">fill</h1>
<h3 id="articleHeader26">1代表从第一位开始，7代表从第一位开始后面都是7</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0, 0, 0].fill(7, 1) // [0,7,7]
[0, 0, 0, 4, 6, 3, 4].fill(9, 3) // [0,0,9,9,9,9,9]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>].fill(<span class="hljs-number">7</span>, <span class="hljs-number">1</span>) <span class="hljs-comment">// [0,7,7]</span>
[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>].fill(<span class="hljs-number">9</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// [0,0,9,9,9,9,9]</span>
</code></pre>
<h1 id="articleHeader27">Object</h1>
<h3 id="articleHeader28">Object.assign浅拷贝  第一个参数是目标对象，后面的参数都是源对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var aa = { a: 1 };  
var qq = { b: 2 };  
var zz = { c: 3 };  
Object.assign(aa, qq, zz);  
target // {a:1, b:2, c:3} 

var ss={x:1,y:2};
var bb={};
Object.assign(ss,bb);
bb.x=3;
ss//x:1,y:2;
bb//x:3,y:2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>
<span class="hljs-keyword">var</span> aa = <span class="hljs-comment">{ a: 1 }</span>;  
<span class="hljs-keyword">var</span> qq = <span class="hljs-comment">{ b: 2 }</span>;  
<span class="hljs-keyword">var</span> zz = <span class="hljs-comment">{ c: 3 }</span>;  
<span class="hljs-keyword">Object</span>.assign(aa, qq, zz);  
target <span class="hljs-comment">// {a:1, b:2, c:3} </span>

<span class="hljs-keyword">var</span> ss=<span class="hljs-comment">{x:1,y:2}</span>;
<span class="hljs-keyword">var</span> bb=<span class="hljs-comment">{}</span>;
<span class="hljs-keyword">Object</span>.assign(ss,bb);
bb.x=<span class="hljs-number">3</span>;
ss<span class="hljs-comment">//x:1,y:2;</span>
bb<span class="hljs-comment">//x:3,y:2;</span>
</code></pre>
<h3 id="articleHeader29">直接拷贝，合并对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ff={x:1,y:2};
var vv={k:9,l:8};
var kk=Object.assign(ff,vv)//{x:1,y:2,k:9,l:8}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> ff={x:<span class="hljs-number">1</span>,y:<span class="hljs-number">2</span>};
<span class="hljs-keyword">var</span> vv={k:<span class="hljs-number">9</span>,l:<span class="hljs-number">8</span>};
<span class="hljs-keyword">var</span> kk=<span class="hljs-built_in">Object</span>.assign(ff,vv)<span class="hljs-comment">//{x:1,y:2,k:9,l:8}</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Math、Number、String 、Array、Object 的新 APIs

## 原文链接
[https://segmentfault.com/a/1190000010176865](https://segmentfault.com/a/1190000010176865)

