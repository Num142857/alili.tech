---
title: 'ES6 的解构赋值前每次都创建一个对象吗？会加重 GC 的负担吗？' 
date: 2018-11-25 2:30:08
hidden: true
slug: rg0oddj3fs
categories: [reprint]
---

{{< raw >}}
<p>&#x672C;&#x6587;&#x6765;&#x6E90;&#x4E8E;&#x77E5;&#x4E4E;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;<a href="https://www.zhihu.com/question/282228797/answer/427739238" rel="nofollow noreferrer" target="_blank">&#x63D0;&#x95EE;</a>&#x3002;</p><p>&#x4E3A;&#x4E86;&#x7A0B;&#x5E8F;&#x7684;&#x6613;&#x8BFB;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528; ES6 &#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f({a,b}){}
f({a:1,b:2});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">{a,b}</span>)</span>{}
f({<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>});</code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E2D;&#xFF0C;&#x4F1A;&#x771F;&#x7684;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5417;&#xFF1F;&#x5982;&#x679C;&#x4F1A;&#xFF0C;&#x90A3;&#x5927;&#x91CF;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4F1A;&#x767D;&#x767D;&#x751F;&#x6210;&#x5F88;&#x591A;&#x6709;&#x5F85; GC &#x91CA;&#x653E;&#x7684;&#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x610F;&#x5473;&#x7740;&#x5728;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x5C11;&#x65F6;&#xFF0C;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x5C3D;&#x91CF;&#x907F;&#x514D;&#x91C7;&#x7528;&#x89E3;&#x6784;&#x4F20;&#x53C2;&#xFF0C;&#x800C;&#x4F7F;&#x7528;&#x4F20;&#x7EDF;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(a,b){}
f(1,2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">a,b</span>)</span>{}
f(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x63CF;&#x8FF0;&#x5176;&#x5B9E;&#x540C;&#x65F6;&#x63D0;&#x4E86;&#x597D;&#x51E0;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x4F1A;&#x4E0D;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF1F;</li><li>&#x53C2;&#x6570;&#x5C11;&#x65F6;&#xFF0C;&#x662F;&#x5426;&#x9700;&#x8981;&#x5C3D;&#x91CF;&#x907F;&#x514D;&#x91C7;&#x7528;&#x89E3;&#x6784;&#x4F20;&#x53C2;&#xFF1F;</li><li>&#x5BF9;&#x6027;&#x80FD;(CPU/&#x5185;&#x5B58;)&#x7684;&#x5F71;&#x54CD;&#x591A;&#x5927;&#xFF1F;</li></ol><h2 id="articleHeader0">1. &#x4ECE; V8 &#x5B57;&#x8282;&#x7801;&#x5206;&#x6790;&#x4E24;&#x8005;&#x7684;&#x6027;&#x80FD;&#x8868;&#x73B0;</h2><p>&#x9996;&#x5148;&#x4ECE;&#x4E0A;&#x9762;&#x7ED9;&#x7684;&#x4EE3;&#x7801;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x786E;&#x5B9E;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x4F46;&#x662F;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6709;&#x5F88;&#x5927;&#x7684;&#x6982;&#x7387;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x4EA7;&#x751F;&#x8FD9;&#x4E2A;&#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#x7684;&#x3002;</p><p>&#x6211;&#x4E4B;&#x524D;&#x5199;&#x8FC7;&#x4E00;&#x7BC7;&#x6587;&#x7AE0; <a href="https://zhuanlan.zhihu.com/p/25122691" rel="nofollow noreferrer" target="_blank">&#x4F7F;&#x7528; D8 &#x5206;&#x6790; javascript &#x5982;&#x4F55;&#x88AB; V8 &#x5F15;&#x64CE;&#x4F18;&#x5316;&#x7684;</a>&#x3002;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x4F60;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(a,b){
 return a+b;
}

const d = f(1, 2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">a,b</span>)</span>{
 <span class="hljs-keyword">return</span> a+b;
}

<span class="hljs-keyword">const</span> d = f(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);</code></pre><p>&#x9274;&#x4E8E;&#x5F88;&#x591A;&#x4EBA;&#x6CA1;&#x6709; d8&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x4F7F;&#x7528; node.js &#x4EE3;&#x66FF;&#x3002;&#x8FD0;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --print-bytecode add.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">node</span> <span class="hljs-title">--print-bytecode</span> add.js</code></pre><p>&#x5176;&#x4E2D;&#x7684; <code>--print-bytecode</code> &#x53EF;&#x4EE5;&#x67E5;&#x770B; V8 &#x5F15;&#x64CE;&#x751F;&#x6210;&#x7684;&#x5B57;&#x8282;&#x7801;&#x3002;&#x5728;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x4E2D;&#x67E5;&#x627E; <code>[generating bytecode for function: f]</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[generating bytecode for function: ]
Parameter count 6
Frame size 32
         0000003AC126862A @    0 : 6e 00 00 02       CreateClosure [0], [0], #2
         0000003AC126862E @    4 : 1e fb             Star r0
   10 E&gt; 0000003AC1268630 @    6 : 91                StackCheck 
   98 S&gt; 0000003AC1268631 @    7 : 03 01             LdaSmi [1]
         0000003AC1268633 @    9 : 1e f9             Star r2
         0000003AC1268635 @   11 : 03 02             LdaSmi [2]
         0000003AC1268637 @   13 : 1e f8             Star r3
   98 E&gt; 0000003AC1268639 @   15 : 51 fb f9 f8 01    CallUndefinedReceiver2 r0, r2, r3, [1]
         0000003AC126863E @   20 : 04                LdaUndefined 
  107 S&gt; 0000003AC126863F @   21 : 95                Return 
Constant pool (size = 1)
Handler Table (size = 16)
[generating bytecode for function: f]
Parameter count 3
Frame size 0
   72 E&gt; 0000003AC1268A6A @    0 : 91                StackCheck 
   83 S&gt; 0000003AC1268A6B @    1 : 1d 02             Ldar a1
   91 E&gt; 0000003AC1268A6D @    3 : 2b 03 00          Add a0, [0]
   94 S&gt; 0000003AC1268A70 @    6 : 95                Return 
Constant pool (size = 0)
Handler Table (size = 16)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[generating bytecode <span class="hljs-keyword">for</span> <span class="hljs-function"><span class="hljs-keyword">function</span>: ]
<span class="hljs-title">Parameter</span> <span class="hljs-title">count</span> 6
<span class="hljs-title">Frame</span> <span class="hljs-title">size</span> 32
         0000003<span class="hljs-title">AC126862A</span> @    0 : 6<span class="hljs-title">e</span> 00 00 02       <span class="hljs-title">CreateClosure</span> [0], [0], #2
         0000003<span class="hljs-title">AC126862E</span> @    4 : 1<span class="hljs-title">e</span> <span class="hljs-title">fb</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r0</span>
   10 <span class="hljs-title">E</span>&gt; 0000003<span class="hljs-title">AC1268630</span> @    6 : 91                <span class="hljs-title">StackCheck</span> 
   98 <span class="hljs-title">S</span>&gt; 0000003<span class="hljs-title">AC1268631</span> @    7 : 03 01             <span class="hljs-title">LdaSmi</span> [1]
         0000003<span class="hljs-title">AC1268633</span> @    9 : 1<span class="hljs-title">e</span> <span class="hljs-title">f9</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r2</span>
         0000003<span class="hljs-title">AC1268635</span> @   11 : 03 02             <span class="hljs-title">LdaSmi</span> [2]
         0000003<span class="hljs-title">AC1268637</span> @   13 : 1<span class="hljs-title">e</span> <span class="hljs-title">f8</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r3</span>
   98 <span class="hljs-title">E</span>&gt; 0000003<span class="hljs-title">AC1268639</span> @   15 : 51 <span class="hljs-title">fb</span> <span class="hljs-title">f9</span> <span class="hljs-title">f8</span> 01    <span class="hljs-title">CallUndefinedReceiver2</span> <span class="hljs-title">r0</span>, <span class="hljs-title">r2</span>, <span class="hljs-title">r3</span>, [1]
         0000003<span class="hljs-title">AC126863E</span> @   20 : 04                <span class="hljs-title">LdaUndefined</span> 
  107 <span class="hljs-title">S</span>&gt; 0000003<span class="hljs-title">AC126863F</span> @   21 : 95                <span class="hljs-title">Return</span> 
<span class="hljs-title">Constant</span> <span class="hljs-title">pool</span> (<span class="hljs-params">size = <span class="hljs-number">1</span></span>)
<span class="hljs-title">Handler</span> <span class="hljs-title">Table</span> (<span class="hljs-params">size = <span class="hljs-number">16</span></span>)
[<span class="hljs-title">generating</span> <span class="hljs-title">bytecode</span> <span class="hljs-title">for</span> <span class="hljs-title">function</span>: <span class="hljs-title">f</span>]
<span class="hljs-title">Parameter</span> <span class="hljs-title">count</span> 3
<span class="hljs-title">Frame</span> <span class="hljs-title">size</span> 0
   72 <span class="hljs-title">E</span>&gt; 0000003<span class="hljs-title">AC1268A6A</span> @    0 : 91                <span class="hljs-title">StackCheck</span> 
   83 <span class="hljs-title">S</span>&gt; 0000003<span class="hljs-title">AC1268A6B</span> @    1 : 1<span class="hljs-title">d</span> 02             <span class="hljs-title">Ldar</span> <span class="hljs-title">a1</span>
   91 <span class="hljs-title">E</span>&gt; 0000003<span class="hljs-title">AC1268A6D</span> @    3 : 2<span class="hljs-title">b</span> 03 00          <span class="hljs-title">Add</span> <span class="hljs-title">a0</span>, [0]
   94 <span class="hljs-title">S</span>&gt; 0000003<span class="hljs-title">AC1268A70</span> @    6 : 95                <span class="hljs-title">Return</span> 
<span class="hljs-title">Constant</span> <span class="hljs-title">pool</span> (<span class="hljs-params">size = <span class="hljs-number">0</span></span>)
<span class="hljs-title">Handler</span> <span class="hljs-title">Table</span> (<span class="hljs-params">size = <span class="hljs-number">16</span></span>)</span></code></pre><p><code>Star r0</code> &#x5C06;&#x5F53;&#x524D;&#x5728;&#x7D2F;&#x52A0;&#x5668;&#x4E2D;&#x7684;&#x503C;&#x5B58;&#x50A8;&#x5728;&#x5BC4;&#x5B58;&#x5668; <code>r0</code> &#x4E2D;&#x3002;</p><p><code>LdaSmi [1]</code> &#x5C06;&#x5C0F;&#x6574;&#x6570;&#xFF08;Smi&#xFF09;<code>1</code> &#x52A0;&#x8F7D;&#x5230;&#x7D2F;&#x52A0;&#x5668;&#x5BC4;&#x5B58;&#x5668;&#x4E2D;&#x3002;</p><p>&#x800C;&#x51FD;&#x6570;&#x4F53;&#x53EA;&#x6709;&#x4E24;&#x884C;&#x4EE3;&#x7801;&#xFF1A;<code>Ldar a1</code> &#x548C; Add a0<code>, [0]</code>&#x3002;</p><p>&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x540E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[generating bytecode for function: ]
Parameter count 6
Frame size 24
         000000D24A568662 @    0 : 6e 00 00 02       CreateClosure [0], [0], #2
         000000D24A568666 @    4 : 1e fb             Star r0
   10 E&gt; 000000D24A568668 @    6 : 91                StackCheck 
  100 S&gt; 000000D24A568669 @    7 : 6c 01 03 29 f9    CreateObjectLiteral [1], [3], #41, r2
  100 E&gt; 000000D24A56866E @   12 : 50 fb f9 01       CallUndefinedReceiver1 r0, r2, [1]
         000000D24A568672 @   16 : 04                LdaUndefined 
  115 S&gt; 000000D24A568673 @   17 : 95                Return 
Constant pool (size = 2)
Handler Table (size = 16)
[generating bytecode for function: f]
Parameter count 2
Frame size 40
   72 E&gt; 000000D24A568AEA @    0 : 91                StackCheck 
         000000D24A568AEB @    1 : 1f 02 fb          Mov a0, r0
         000000D24A568AEE @    4 : 1d fb             Ldar r0
         000000D24A568AF0 @    6 : 89 06             JumpIfUndefined [6] (000000D24A568AF6 @ 12)
         000000D24A568AF2 @    8 : 1d fb             Ldar r0
         000000D24A568AF4 @   10 : 88 10             JumpIfNotNull [16] (000000D24A568B04 @ 26)
         000000D24A568AF6 @   12 : 03 3f             LdaSmi [63]
         000000D24A568AF8 @   14 : 1e f8             Star r3
         000000D24A568AFA @   16 : 09 00             LdaConstant [0]
         000000D24A568AFC @   18 : 1e f7             Star r4
         000000D24A568AFE @   20 : 53 e8 00 f8 02    CallRuntime [NewTypeError], r3-r4
   74 E&gt; 000000D24A568B03 @   25 : 93                Throw 
   74 S&gt; 000000D24A568B04 @   26 : 20 fb 00 02       LdaNamedProperty r0, [0], [2]
         000000D24A568B08 @   30 : 1e fa             Star r1
   76 S&gt; 000000D24A568B0A @   32 : 20 fb 01 04       LdaNamedProperty r0, [1], [4]
         000000D24A568B0E @   36 : 1e f9             Star r2
   85 S&gt; 000000D24A568B10 @   38 : 1d f9             Ldar r2
   93 E&gt; 000000D24A568B12 @   40 : 2b fa 06          Add r1, [6]
   96 S&gt; 000000D24A568B15 @   43 : 95                Return 
Constant pool (size = 2)
Handler Table (size = 16)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[generating bytecode <span class="hljs-keyword">for</span> <span class="hljs-function"><span class="hljs-keyword">function</span>: ]
<span class="hljs-title">Parameter</span> <span class="hljs-title">count</span> 6
<span class="hljs-title">Frame</span> <span class="hljs-title">size</span> 24
         000000<span class="hljs-title">D24A568662</span> @    0 : 6<span class="hljs-title">e</span> 00 00 02       <span class="hljs-title">CreateClosure</span> [0], [0], #2
         000000<span class="hljs-title">D24A568666</span> @    4 : 1<span class="hljs-title">e</span> <span class="hljs-title">fb</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r0</span>
   10 <span class="hljs-title">E</span>&gt; 000000<span class="hljs-title">D24A568668</span> @    6 : 91                <span class="hljs-title">StackCheck</span> 
  100 <span class="hljs-title">S</span>&gt; 000000<span class="hljs-title">D24A568669</span> @    7 : 6<span class="hljs-title">c</span> 01 03 29 <span class="hljs-title">f9</span>    <span class="hljs-title">CreateObjectLiteral</span> [1], [3], #41, <span class="hljs-title">r2</span>
  100 <span class="hljs-title">E</span>&gt; 000000<span class="hljs-title">D24A56866E</span> @   12 : 50 <span class="hljs-title">fb</span> <span class="hljs-title">f9</span> 01       <span class="hljs-title">CallUndefinedReceiver1</span> <span class="hljs-title">r0</span>, <span class="hljs-title">r2</span>, [1]
         000000<span class="hljs-title">D24A568672</span> @   16 : 04                <span class="hljs-title">LdaUndefined</span> 
  115 <span class="hljs-title">S</span>&gt; 000000<span class="hljs-title">D24A568673</span> @   17 : 95                <span class="hljs-title">Return</span> 
<span class="hljs-title">Constant</span> <span class="hljs-title">pool</span> (<span class="hljs-params">size = <span class="hljs-number">2</span></span>)
<span class="hljs-title">Handler</span> <span class="hljs-title">Table</span> (<span class="hljs-params">size = <span class="hljs-number">16</span></span>)
[<span class="hljs-title">generating</span> <span class="hljs-title">bytecode</span> <span class="hljs-title">for</span> <span class="hljs-title">function</span>: <span class="hljs-title">f</span>]
<span class="hljs-title">Parameter</span> <span class="hljs-title">count</span> 2
<span class="hljs-title">Frame</span> <span class="hljs-title">size</span> 40
   72 <span class="hljs-title">E</span>&gt; 000000<span class="hljs-title">D24A568AEA</span> @    0 : 91                <span class="hljs-title">StackCheck</span> 
         000000<span class="hljs-title">D24A568AEB</span> @    1 : 1<span class="hljs-title">f</span> 02 <span class="hljs-title">fb</span>          <span class="hljs-title">Mov</span> <span class="hljs-title">a0</span>, <span class="hljs-title">r0</span>
         000000<span class="hljs-title">D24A568AEE</span> @    4 : 1<span class="hljs-title">d</span> <span class="hljs-title">fb</span>             <span class="hljs-title">Ldar</span> <span class="hljs-title">r0</span>
         000000<span class="hljs-title">D24A568AF0</span> @    6 : 89 06             <span class="hljs-title">JumpIfUndefined</span> [6] (<span class="hljs-params"><span class="hljs-number">000000</span>D24A568AF6 @ <span class="hljs-number">12</span></span>)
         000000<span class="hljs-title">D24A568AF2</span> @    8 : 1<span class="hljs-title">d</span> <span class="hljs-title">fb</span>             <span class="hljs-title">Ldar</span> <span class="hljs-title">r0</span>
         000000<span class="hljs-title">D24A568AF4</span> @   10 : 88 10             <span class="hljs-title">JumpIfNotNull</span> [16] (<span class="hljs-params"><span class="hljs-number">000000</span>D24A568B04 @ <span class="hljs-number">26</span></span>)
         000000<span class="hljs-title">D24A568AF6</span> @   12 : 03 3<span class="hljs-title">f</span>             <span class="hljs-title">LdaSmi</span> [63]
         000000<span class="hljs-title">D24A568AF8</span> @   14 : 1<span class="hljs-title">e</span> <span class="hljs-title">f8</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r3</span>
         000000<span class="hljs-title">D24A568AFA</span> @   16 : 09 00             <span class="hljs-title">LdaConstant</span> [0]
         000000<span class="hljs-title">D24A568AFC</span> @   18 : 1<span class="hljs-title">e</span> <span class="hljs-title">f7</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r4</span>
         000000<span class="hljs-title">D24A568AFE</span> @   20 : 53 <span class="hljs-title">e8</span> 00 <span class="hljs-title">f8</span> 02    <span class="hljs-title">CallRuntime</span> [<span class="hljs-title">NewTypeError</span>], <span class="hljs-title">r3</span>-<span class="hljs-title">r4</span>
   74 <span class="hljs-title">E</span>&gt; 000000<span class="hljs-title">D24A568B03</span> @   25 : 93                <span class="hljs-title">Throw</span> 
   74 <span class="hljs-title">S</span>&gt; 000000<span class="hljs-title">D24A568B04</span> @   26 : 20 <span class="hljs-title">fb</span> 00 02       <span class="hljs-title">LdaNamedProperty</span> <span class="hljs-title">r0</span>, [0], [2]
         000000<span class="hljs-title">D24A568B08</span> @   30 : 1<span class="hljs-title">e</span> <span class="hljs-title">fa</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r1</span>
   76 <span class="hljs-title">S</span>&gt; 000000<span class="hljs-title">D24A568B0A</span> @   32 : 20 <span class="hljs-title">fb</span> 01 04       <span class="hljs-title">LdaNamedProperty</span> <span class="hljs-title">r0</span>, [1], [4]
         000000<span class="hljs-title">D24A568B0E</span> @   36 : 1<span class="hljs-title">e</span> <span class="hljs-title">f9</span>             <span class="hljs-title">Star</span> <span class="hljs-title">r2</span>
   85 <span class="hljs-title">S</span>&gt; 000000<span class="hljs-title">D24A568B10</span> @   38 : 1<span class="hljs-title">d</span> <span class="hljs-title">f9</span>             <span class="hljs-title">Ldar</span> <span class="hljs-title">r2</span>
   93 <span class="hljs-title">E</span>&gt; 000000<span class="hljs-title">D24A568B12</span> @   40 : 2<span class="hljs-title">b</span> <span class="hljs-title">fa</span> 06          <span class="hljs-title">Add</span> <span class="hljs-title">r1</span>, [6]
   96 <span class="hljs-title">S</span>&gt; 000000<span class="hljs-title">D24A568B15</span> @   43 : 95                <span class="hljs-title">Return</span> 
<span class="hljs-title">Constant</span> <span class="hljs-title">pool</span> (<span class="hljs-params">size = <span class="hljs-number">2</span></span>)
<span class="hljs-title">Handler</span> <span class="hljs-title">Table</span> (<span class="hljs-params">size = <span class="hljs-number">16</span></span>)</span></code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4EE3;&#x7801;&#x660E;&#x663E;&#x589E;&#x52A0;&#x4E86;&#x5F88;&#x591A;&#xFF0C;<code>CreateObjectLiteral</code> &#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x672C;&#x6765;&#x53EA;&#x6709; 2 &#x6761;&#x6838;&#x5FC3;&#x6307;&#x4EE4;&#x7684;&#x51FD;&#x6570;&#x7A81;&#x7136;&#x589E;&#x52A0;&#x5230;&#x4E86;&#x8FD1; 20 &#x6761;&#x3002;&#x5176;&#x4E2D;&#x4E0D;&#x4E4F;&#x6709; <code>JumpIfUndefined</code>&#x3001;<code>CallRuntime</code> &#x3001;<code>Throw</code> &#x8FD9;&#x79CD;&#x6307;&#x4EE4;&#x3002;</p><ul><li>&#x6269;&#x5C55;&#x9605;&#x8BFB;&#xFF1A;<a href="https://zhuanlan.zhihu.com/p/28590489" rel="nofollow noreferrer" target="_blank">&#x7406;&#x89E3; V8 &#x7684;&#x5B57;&#x8282;&#x7801;&#x300C;&#x8BD1;&#x300D;</a></li></ul><h2 id="articleHeader1">2. &#x4F7F;&#x7528; --trace-gc &#x53C2;&#x6570;&#x67E5;&#x770B;&#x5185;&#x5B58;</h2><p>&#x7531;&#x4E8E;&#x8FD9;&#x4E2A;&#x5185;&#x5B58;&#x5360;&#x7528;&#x5F88;&#x5C0F;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x52A0;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(a, b){
 return a + b;
}

for (let i = 0; i &lt; 1e8; i++) {
 const d = f(1, 2);
}

console.log(%GetHeapUsage());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">a, b</span>)</span>{
 <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1e8</span>; i++) {
 <span class="hljs-keyword">const</span> d = f(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
}

<span class="hljs-built_in">console</span>.log(%GetHeapUsage());</code></pre><p><code>%GetHeapUsage()</code> &#x51FD;&#x6570;&#x6709;&#x4E9B;&#x7279;&#x6B8A;&#xFF0C;&#x4EE5;&#x767E;&#x5206;&#x53F7;(%)&#x5F00;&#x5934;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F; V8 &#x5F15;&#x64CE;&#x5185;&#x90E8;&#x8C03;&#x8BD5;&#x4F7F;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570; <code>--allow-natives-syntax</code> &#x6765;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --trace-gc --allow-natives-syntax add.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">node</span> <span class="hljs-title">--trace-gc</span> --allow-natives-syntax add.js</code></pre><p>&#x5F97;&#x5230;&#x7ED3;&#x679C;&#xFF08;&#x4E3A;&#x4E86;&#x4FBF;&#x4E8E;&#x9605;&#x8BFB;&#xFF0C;&#x6211;&#x8C03;&#x6574;&#x4E86;&#x8F93;&#x51FA;&#x683C;&#x5F0F;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[10192:0000000000427F50]
26 ms: Scavenge 3.4 (6.3) -&gt; 3.1 (7.3) MB, 1.3 / 0.0 ms  allocation failure

[10192:0000000000427F50]
34 ms: Scavenge 3.6 (7.3) -&gt; 3.5 (8.3) MB, 0.8 / 0.0 ms  allocation failure

4424128" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">10192</span>:<span class="hljs-number">0000000000427</span>F50]
<span class="hljs-number">26</span> ms: Scavenge <span class="hljs-number">3.4</span> (<span class="hljs-number">6.3</span>) -&gt; <span class="hljs-number">3.1</span> (<span class="hljs-number">7.3</span>) MB, <span class="hljs-number">1.3</span> / <span class="hljs-number">0.0</span> ms  allocation failure

[<span class="hljs-number">10192</span>:<span class="hljs-number">0000000000427</span>F50]
<span class="hljs-number">34</span> ms: Scavenge <span class="hljs-number">3.6</span> (<span class="hljs-number">7.3</span>) -&gt; <span class="hljs-number">3.5</span> (<span class="hljs-number">8.3</span>) MB, <span class="hljs-number">0.8</span> / <span class="hljs-number">0.0</span> ms  allocation failure

<span class="hljs-number">4424128</span></code></pre><p>&#x5F53;&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x540E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[7812:00000000004513E0]
27 ms: Scavenge 3.4 (6.3) -&gt; 3.1 (7.3) MB, 1.0 / 0.0 ms  allocation failure

[7812:00000000004513E0]
36 ms: Scavenge 3.6 (7.3) -&gt; 3.5 (8.3) MB, 0.7 / 0.0 ms  allocation failure

[7812:00000000004513E0]
56 ms: Scavenge 4.6 (8.3) -&gt; 4.1 (11.3) MB, 0.5 / 0.0 ms  allocation failure

4989872" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">7812</span>:<span class="hljs-number">00000000004513E0</span>]
<span class="hljs-number">27</span> ms: Scavenge <span class="hljs-number">3.4</span> (<span class="hljs-number">6.3</span>) -&gt; <span class="hljs-number">3.1</span> (<span class="hljs-number">7.3</span>) MB, <span class="hljs-number">1.0</span> / <span class="hljs-number">0.0</span> ms  allocation failure

[<span class="hljs-number">7812</span>:<span class="hljs-number">00000000004513E0</span>]
<span class="hljs-number">36</span> ms: Scavenge <span class="hljs-number">3.6</span> (<span class="hljs-number">7.3</span>) -&gt; <span class="hljs-number">3.5</span> (<span class="hljs-number">8.3</span>) MB, <span class="hljs-number">0.7</span> / <span class="hljs-number">0.0</span> ms  allocation failure

[<span class="hljs-number">7812</span>:<span class="hljs-number">00000000004513E0</span>]
<span class="hljs-number">56</span> ms: Scavenge <span class="hljs-number">4.6</span> (<span class="hljs-number">8.3</span>) -&gt; <span class="hljs-number">4.1</span> (<span class="hljs-number">11.3</span>) MB, <span class="hljs-number">0.5</span> / <span class="hljs-number">0.0</span> ms  allocation failure

<span class="hljs-number">4989872</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x591A;&#x4E86;&#x56E0;&#x6B64;&#x5185;&#x5B58;&#x5206;&#x914D;&#xFF0C;&#x800C;&#x4E14;&#x5806;&#x7A7A;&#x95F4;&#x7684;&#x4F7F;&#x7528;&#x4E5F;&#x6BD4;&#x4E4B;&#x524D;&#x591A;&#x4E86;&#x3002;&#x4F7F;&#x7528; <code>--trace_gc_verbose</code> &#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x67E5;&#x770B; gc &#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD9;&#x4E9B;&#x5185;&#x5B58;&#x90FD;&#x662F;&#x65B0;&#x751F;&#x4EE3;&#xFF0C;&#x6E05;&#x7406;&#x8D77;&#x6765;&#x7684;&#x5F00;&#x9500;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x5C0F;&#x7684;&#x3002;</p><h2 id="articleHeader2">3. Escape Analysis &#x9003;&#x9038;&#x5206;&#x6790;</h2><p>&#x901A;&#x8FC7;&#x9003;&#x9038;&#x5206;&#x6790;&#xFF0C;V8 &#x5F15;&#x64CE;&#x53EF;&#x4EE5;&#x628A;&#x4E34;&#x65F6;&#x5BF9;&#x8C61;&#x53BB;&#x9664;&#x3002;</p><p>&#x8FD8;&#x8003;&#x8651;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add({a, b}){
   return a + b;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">{a, b}</span>)</span>{
   <span class="hljs-keyword">return</span> a + b;
}</code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;<code>double</code>&#xFF0C;&#x7528;&#x4E8E;&#x7ED9;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x52A0;&#x500D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function double(x) {
   return add({a:x, b:x});
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">x</span>) </span>{
   <span class="hljs-keyword">return</span> add({<span class="hljs-attr">a</span>:x, <span class="hljs-attr">b</span>:x});
}</code></pre><p>&#x800C;&#x8FD9;&#x4E2A; <code>double</code> &#x51FD;&#x6570;&#x6700;&#x7EC8;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function double(x){
    return x + x;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">return</span> x + x;
}</code></pre><p>&#x5728; V8 &#x5F15;&#x64CE;&#x5185;&#x90E8;&#xFF0C;&#x4F1A;&#x6309;&#x7167;&#x5982;&#x4E0B;&#x6B65;&#x9AA4;&#x8FDB;&#x884C;&#x9003;&#x9038;&#x5206;&#x6790;&#x5904;&#x7406;&#xFF1A;</p><p>&#x9996;&#x5148;&#xFF0C;&#x589E;&#x52A0;&#x4E2D;&#x95F4;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(o){
 return o.a + o.b;
}

function double(x) {
   let o = {a:x, b:x};
   return add(o);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">o</span>)</span>{
 <span class="hljs-keyword">return</span> o.a + o.b;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">x</span>) </span>{
   <span class="hljs-keyword">let</span> o = {<span class="hljs-attr">a</span>:x, <span class="hljs-attr">b</span>:x};
   <span class="hljs-keyword">return</span> add(o);
}</code></pre><p>&#x628A;&#x5BF9;&#x51FD;&#x6570; <code>add</code> &#x7684;&#x8C03;&#x7528;&#x8FDB;&#x884C;&#x5185;&#x8054;&#x5C55;&#x5F00;&#xFF0C;&#x53D8;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function double(x) {
   let o = {a:x, b:x};
   return o.a + o.b;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">x</span>) </span>{
   <span class="hljs-keyword">let</span> o = {<span class="hljs-attr">a</span>:x, <span class="hljs-attr">b</span>:x};
   <span class="hljs-keyword">return</span> o.a + o.b;
}</code></pre><p>&#x66FF;&#x6362;&#x5BF9;&#x5B57;&#x6BB5;&#x7684;&#x8BBF;&#x95EE;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function double(x) {
   let o = {a:x, b:x};
   return x + x;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">x</span>) </span>{
   <span class="hljs-keyword">let</span> o = {<span class="hljs-attr">a</span>:x, <span class="hljs-attr">b</span>:x};
   <span class="hljs-keyword">return</span> x + x;
}</code></pre><p>&#x5220;&#x9664;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x5185;&#x5B58;&#x5206;&#x914D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function double(x) {
   return x + x;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">x</span>) </span>{
   <span class="hljs-keyword">return</span> x + x;
}</code></pre><p>&#x901A;&#x8FC7; V8 &#x7684;&#x9003;&#x9038;&#x5206;&#x6790;&#xFF0C;&#x628A;&#x672C;&#x6765;&#x5206;&#x914D;&#x5230;&#x5806;&#x4E0A;&#x7684;&#x5BF9;&#x8C61;&#x53BB;&#x9664;&#x4E86;&#x3002;</p><h2 id="articleHeader3">4. &#x7ED3;&#x8BBA;</h2><p>&#x4E0D;&#x8981;&#x505A;&#x8FD9;&#x79CD;&#x8BED;&#x6CD5;&#x5C42;&#x9762;&#x7684;&#x5FAE;&#x4F18;&#x5316;&#xFF0C;&#x5F15;&#x64CE;&#x4F1A;&#x53BB;&#x4F18;&#x5316;&#x7684;&#xFF0C;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x8FD8;&#x662F;&#x66F4;&#x52A0;&#x5173;&#x6CE8;&#x53EF;&#x8BFB;&#x6027;&#x548C;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x3002;&#x5982;&#x679C;&#x4F60;&#x5199;&#x7684;&#x662F;&#x5E93;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x8FD9;&#x79CD;&#x4F18;&#x5316;&#xFF0C;&#x628A;&#x53C2;&#x6570;&#x5C55;&#x5F00;&#x540E;&#x76F4;&#x63A5;&#x4F20;&#x9012;&#xFF0C;&#x5230;&#x5E95;&#x80FD;&#x5E26;&#x6765;&#x591A;&#x5C11;&#x6027;&#x80FD;&#x6536;&#x76CA;&#x8FD8;&#x5F97;&#x770B;&#x6700;&#x7EC8;&#x7684;&#x57FA;&#x51C6;&#x6D4B;&#x8BD5;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x5C31;&#x662F; Chrome 49 &#x5F00;&#x59CB;&#x652F;&#x6301; <code>Proxy</code>&#xFF0C;&#x76F4;&#x5230;&#x4E00;&#x5E74;&#x4E4B;&#x540E;&#x7684; Chrome 62 &#x624D;&#x6539;&#x8FDB;&#x4E86; <code>Proxy</code> &#x7684;&#x6027;&#x80FD;&#xFF0C;&#x4F7F; <code>Proxy</code> &#x7684;&#x6574;&#x4F53;&#x6027;&#x80FD;&#x63D0;&#x5347;&#x4E86; 24% ~ 546%&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 的解构赋值前每次都创建一个对象吗？会加重 GC 的负担吗？

## 原文链接
[https://segmentfault.com/a/1190000015421599](https://segmentfault.com/a/1190000015421599)

