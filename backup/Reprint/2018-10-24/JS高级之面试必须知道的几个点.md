---
title: JS高级之面试必须知道的几个点
hidden: true
categories: [reprint]
slug: '1249e040'
date: 2018-10-24 08:17:53
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<blockquote>&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#x7A81;&#x7136;&#x53D1;&#x73B0;JS&#x539F;&#x751F;&#x597D;&#x591A;&#x4E1C;&#x897F;&#x90FD;&#x5FD8;&#x8BB0;&#x4E86;,&#x4F46;&#x6709;&#x4E9B;&#x4E1C;&#x897F;&#x786E;&#x5B9E;&#x5F88;&#x91CD;&#x8981;,&#x6240;&#x4EE5;&#x53C8;&#x91CD;&#x65B0;&#x518D;&#x68B3;&#x7406;&#x4E00;&#x6B21;&#x3002;&#x4E3B;&#x8981;&#x6709;&#x51FD;&#x6570;&#x7684;3&#x79CD;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#xFF0C;ES5&#x51FD;&#x6570;this&#x6307;&#x5411;&#xFF0C;call&#x4E0E;appl&#x7528;&#x6CD5;,JS&#x5E38;&#x89C1;&#x7684;4&#x79CD;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;,&#x539F;&#x578B;&#x94FE;,&#x539F;&#x578B;&#x94FE;&#x548C;&#x7EE7;&#x627F;&#x7684;&#x65B9;&#x5F0F;(ES5&#x548C;ES6)</blockquote>
<h2 id="articleHeader1">1.&#x51FD;&#x6570;&#x7684;3&#x79CD;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;</h2>
<h3 id="articleHeader2">1.1 &#x51FD;&#x6570;&#x58F0;&#x660E;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES5
function getSum(){}
function (){}//&#x533F;&#x540D;&#x51FD;&#x6570;
//ES6
()=&gt;{}//&#x5982;&#x679C;{}&#x5185;&#x5BB9;&#x53EA;&#x6709;&#x4E00;&#x884C;{}&#x548C;return&#x5173;&#x952E;&#x5B57;&#x53EF;&#x7701;,
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span><span class="hljs-params">()</span></span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{}<span class="hljs-comment">//&#x533F;&#x540D;&#x51FD;&#x6570;</span>
<span class="hljs-comment">//ES6</span>
()=&gt;{}<span class="hljs-comment">//&#x5982;&#x679C;{}&#x5185;&#x5BB9;&#x53EA;&#x6709;&#x4E00;&#x884C;{}&#x548C;return&#x5173;&#x952E;&#x5B57;&#x53EF;&#x7701;,</span>
</code></pre>
<h3 id="articleHeader3">1.2 &#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;(&#x51FD;&#x6570;&#x5B57;&#x9762;&#x91CF;)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES5
var sum=function(){}
//ES6
let sum=()=&gt;{}//&#x5982;&#x679C;{}&#x5185;&#x5BB9;&#x53EA;&#x6709;&#x4E00;&#x884C;{}&#x548C;return&#x5173;&#x952E;&#x5B57;&#x53EF;&#x7701;," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//ES5</span>
<span class="hljs-keyword">var</span> sum=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-comment">//ES6</span>
<span class="hljs-keyword">let</span> sum=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{}<span class="hljs-comment">//&#x5982;&#x679C;{}&#x5185;&#x5BB9;&#x53EA;&#x6709;&#x4E00;&#x884C;{}&#x548C;return&#x5173;&#x952E;&#x5B57;&#x53EF;&#x7701;,</span></code></pre>
<h3 id="articleHeader4">1.3 &#x6784;&#x9020;&#x51FD;&#x6570;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum=new GetSum(num1,num2)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> sum=<span class="hljs-keyword">new</span> <span class="hljs-type">GetSum</span>(num1,num2)
</code></pre>
<h3 id="articleHeader5">1.4 &#x4E09;&#x79CD;&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x6BD4;</h3>
<p>1.&#x51FD;&#x6570;&#x58F0;&#x660E;&#x6709;&#x9884;&#x89E3;&#x6790;,&#x800C;&#x4E14;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;&#x53D8;&#x91CF;;<br>2.&#x4F7F;&#x7528;Function&#x6784;&#x9020;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;,&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4F1A;&#x5BFC;&#x81F4;&#x89E3;&#x6790;&#x4E24;&#x6B21;&#x4EE3;&#x7801;&#xFF0C;&#x5F71;&#x54CD;&#x6027;&#x80FD;&#x3002;&#x7B2C;&#x4E00;&#x6B21;&#x89E3;&#x6790;&#x5E38;&#x89C4;&#x7684;JavaScript&#x4EE3;&#x7801;&#xFF0C;&#x7B2C;&#x4E8C;&#x6B21;&#x89E3;&#x6790;&#x4F20;&#x5165;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5B57;&#x7B26;&#x4E32;</p>
<h2 id="articleHeader6">2.ES5&#x4E2D;&#x51FD;&#x6570;&#x7684;4&#x79CD;&#x8C03;&#x7528;</h2>
<p>&#x5728;ES5&#x4E2D;&#x51FD;&#x6570;&#x5185;&#x5BB9;&#x7684;this&#x6307;&#x5411;&#x548C;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x6709;&#x5173;</p>
<h3 id="articleHeader7">2.1 &#x51FD;&#x6570;&#x8C03;&#x7528;&#x6A21;&#x5F0F;</h3>
<p>&#x5305;&#x62EC;&#x51FD;&#x6570;&#x540D;()&#x548C;&#x533F;&#x540D;&#x51FD;&#x6570;&#x8C03;&#x7528;,this&#x6307;&#x5411;window</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function getSum() {
    console.log(this) //window
 }
 getSum()
 
 (function() {
    console.log(this) //window
 })()
 
 var getSum=function() {
    console.log(this) //window
 }
 getSum()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//window</span>
 }
 getSum()
 
 (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//window</span>
 })()
 
 <span class="hljs-keyword">var</span> getSum=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//window</span>
 }
 getSum()</code></pre>
<h3 id="articleHeader8">2.2 &#x65B9;&#x6CD5;&#x8C03;&#x7528;</h3>
<p>&#x5BF9;&#x8C61;.&#x65B9;&#x6CD5;&#x540D;(),this&#x6307;&#x5411;&#x5BF9;&#x8C61;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objList = {
   name: &apos;methods&apos;,
   getSum: function() {
     console.log(this) //objList&#x5BF9;&#x8C61;
   }
}
objList.getSum()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> objList = {
   <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;methods&apos;</span>,
   <span class="hljs-attr">getSum</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//objList&#x5BF9;&#x8C61;</span>
   }
}
objList.getSum()</code></pre>
<h3 id="articleHeader9">2.3 &#x6784;&#x9020;&#x5668;&#x8C03;&#x7528;</h3>
<p>new &#x6784;&#x9020;&#x51FD;&#x6570;&#x540D;(),this&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person() {
  console.log(this); //&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;Person
}
var personOne = new Person();
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;Person</span>
}
<span class="hljs-keyword">var</span> personOne = <span class="hljs-keyword">new</span> Person();
</code></pre>
<h3 id="articleHeader10">2.4 &#x95F4;&#x63A5;&#x8C03;&#x7528;</h3>
<p>&#x5229;&#x7528;call&#x548C;apply&#x6765;&#x5B9E;&#x73B0;,this&#x5C31;&#x662F;call&#x548C;apply&#x5BF9;&#x5E94;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;,&#x5982;&#x679C;&#x4E0D;&#x4F20;&#x503C;&#x6216;&#x8005;&#x7B2C;&#x4E00;&#x4E2A;&#x503C;&#x4E3A;null,undefined&#x65F6;this&#x6307;&#x5411;window</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
   console.log(this);
}
foo.apply(&apos;&#x6211;&#x662F;apply&#x6539;&#x53D8;&#x7684;this&#x503C;&apos;);//&#x6211;&#x662F;apply&#x6539;&#x53D8;&#x7684;this&#x503C;
foo.call(&apos;&#x6211;&#x662F;call&#x6539;&#x53D8;&#x7684;this&#x503C;&apos;);//&#x6211;&#x662F;call&#x6539;&#x53D8;&#x7684;this&#x503C;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
foo.apply(<span class="hljs-string">&apos;&#x6211;&#x662F;apply&#x6539;&#x53D8;&#x7684;this&#x503C;&apos;</span>);<span class="hljs-comment">//&#x6211;&#x662F;apply&#x6539;&#x53D8;&#x7684;this&#x503C;</span>
foo.call(<span class="hljs-string">&apos;&#x6211;&#x662F;call&#x6539;&#x53D8;&#x7684;this&#x503C;&apos;</span>);<span class="hljs-comment">//&#x6211;&#x662F;call&#x6539;&#x53D8;&#x7684;this&#x503C;</span></code></pre>
<h3 id="articleHeader11">3.ES6&#x4E2D;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;</h3>
<p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0D;&#x53EF;&#x4EE5;&#x5F53;&#x4F5C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F7F;&#x7528;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x80FD;&#x7528;new&#x547D;&#x4EE4;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;<br>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x662F;&#x548C;&#x5B9A;&#x4E49;&#x65F6;&#x6709;&#x5173;&#x548C;&#x8C03;&#x7528;&#x65E0;&#x5173;<br>&#x8C03;&#x7528;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6A21;&#x5F0F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(() =&gt; {
   console.log(this)//window
})()

let arrowFun = () =&gt; {
  console.log(this)//window
}
arrowFun()

let arrowObj = {
  arrFun: function() {
   (() =&gt; {
     console.log(this)//arrowObj
   })()
   }
 }
 arrowObj.arrFun();
 " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)<span class="hljs-comment">//window</span>
})()

<span class="hljs-keyword">let</span> arrowFun = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)<span class="hljs-comment">//window</span>
}
arrowFun()

<span class="hljs-keyword">let</span> arrowObj = {
  <span class="hljs-attr">arrFun</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   (<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
     <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)<span class="hljs-comment">//arrowObj</span>
   })()
   }
 }
 arrowObj.arrFun();
 </code></pre>
<h2 id="articleHeader12">4.call,apply&#x548C;bind</h2>
<p>1.IE5&#x4E4B;&#x524D;&#x4E0D;&#x652F;&#x6301;call&#x548C;apply,bind&#x662F;ES5&#x51FA;&#x6765;&#x7684;;<br>2.call&#x548C;apply&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x51FD;&#x6570;,&#x6539;&#x53D8;this,&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x548C;&#x501F;&#x7528;&#x522B;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;;</p>
<h3 id="articleHeader13">4.1 call&#x548C;apply&#x5B9A;&#x4E49;</h3>
<p>&#x8C03;&#x7528;&#x65B9;&#x6CD5;,&#x7528;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x66FF;&#x6362;&#x6389;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;(this)<br>&#x5BF9;&#x8C61;.call(&#x65B0;this&#x5BF9;&#x8C61;,&#x5B9E;&#x53C2;1,&#x5B9E;&#x53C2;2,&#x5B9E;&#x53C2;3.....)<br>&#x5BF9;&#x8C61;.apply(&#x65B0;this&#x5BF9;&#x8C61;,[&#x5B9E;&#x53C2;1,&#x5B9E;&#x53C2;2,&#x5B9E;&#x53C2;3.....])</p>
<h3 id="articleHeader14">4.2 call&#x548C;apply&#x7528;&#x6CD5;</h3>
<p>1.&#x95F4;&#x63A5;&#x8C03;&#x7528;&#x51FD;&#x6570;,&#x6539;&#x53D8;&#x4F5C;&#x7528;&#x57DF;&#x7684;this&#x503C;<br>2.&#x52AB;&#x6301;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
  name:&quot;&#x5F20;&#x4E09;&quot;,
  logName:function(){
    console.log(this.name);
  }
}
var bar={
  name:&quot;&#x674E;&#x56DB;&quot;
};
foo.logName.call(bar);//&#x674E;&#x56DB;
&#x5B9E;&#x8D28;&#x662F;call&#x6539;&#x53D8;&#x4E86;foo&#x7684;this&#x6307;&#x5411;&#x4E3A;bar,&#x5E76;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = {
  <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;&#x5F20;&#x4E09;&quot;</span>,
  <span class="hljs-attr">logName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }
}
<span class="hljs-keyword">var</span> bar={
  <span class="hljs-attr">name</span>:<span class="hljs-string">&quot;&#x674E;&#x56DB;&quot;</span>
};
foo.logName.call(bar);<span class="hljs-comment">//&#x674E;&#x56DB;</span>
&#x5B9E;&#x8D28;&#x662F;call&#x6539;&#x53D8;&#x4E86;foo&#x7684;<span class="hljs-keyword">this</span>&#x6307;&#x5411;&#x4E3A;bar,&#x5E76;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;
</code></pre>
<p>3.&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(name){   
  this.name = name;   
  this.showName = function(){   
    console.log(this.name);   
  }   
}   
function Cat(name){  
  Animal.call(this, name);  
}    
var cat = new Cat(&quot;Black Cat&quot;);   
cat.showName(); //Black Cat
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>)</span>{   
  <span class="hljs-keyword">this</span>.name = name;   
  <span class="hljs-keyword">this</span>.showName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{   
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);   
  }   
}   
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span>(<span class="hljs-params">name</span>)</span>{  
  Animal.call(<span class="hljs-keyword">this</span>, name);  
}    
<span class="hljs-keyword">var</span> cat = <span class="hljs-keyword">new</span> Cat(<span class="hljs-string">&quot;Black Cat&quot;</span>);   
cat.showName(); <span class="hljs-comment">//Black Cat</span>
</code></pre>
<p>4.&#x4E3A;&#x7C7B;&#x6570;&#x7EC4;(arguments&#x548C;nodeList)&#x6DFB;&#x52A0;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;push,pop</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
  Array.prototype.push.call(arguments,&apos;&#x738B;&#x4E94;&apos;);
  console.log(arguments);//[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]
})(&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(){
  Array.prototype.push.call(<span class="hljs-name">arguments</span>,<span class="hljs-symbol">&apos;&#x738B;&#x4E94;</span>&apos;)<span class="hljs-comment">;</span>
  console.log(<span class="hljs-name">arguments</span>)<span class="hljs-comment">;//[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]</span>
})(<span class="hljs-symbol">&apos;&#x5F20;&#x4E09;</span>&apos;,<span class="hljs-symbol">&apos;&#x674E;&#x56DB;</span>&apos;)
</code></pre>
<p>5.&#x5408;&#x5E76;&#x6570;&#x7EC4;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr1=[1,2,3]; 
let arr2=[4,5,6]; 
Array.prototype.push.apply(arr1,arr2); //&#x5C06;arr2&#x5408;&#x5E76;&#x5230;&#x4E86;arr1&#x4E2D;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>let arr1=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]; 
let arr2=[<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]; 
Array.prototype.push.apply(arr1,arr2); <span class="hljs-comment">//&#x5C06;arr2&#x5408;&#x5E76;&#x5230;&#x4E86;arr1&#x4E2D;</span>
</code></pre>
<p>6.&#x6C42;&#x6570;&#x7EC4;&#x6700;&#x5927;&#x503C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.max.apply(null,arr)
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>Math<span class="hljs-selector-class">.max</span><span class="hljs-selector-class">.apply</span>(null,arr)
</code></pre>
<p>7.&#x5224;&#x65AD;&#x5B57;&#x7B26;&#x7C7B;&#x578B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call({})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>({})</code></pre>
<h3 id="articleHeader15">4.3 bind</h3>
<p>bind&#x662F;function&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6269;&#x5C55;&#x65B9;&#x6CD5;&#xFF0C;bind&#x4EE5;&#x540E;&#x4EE3;&#x7801;&#x91CD;&#x65B0;&#x7ED1;&#x5B9A;&#x4E86;func&#x5185;&#x90E8;&#x7684;this&#x6307;&#x5411;,&#x4E0D;&#x4F1A;&#x8C03;&#x7528;&#x65B9;&#x6CD5;,&#x4E0D;&#x517C;&#x5BB9;IE8</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &apos;&#x674E;&#x56DB;&apos;
 var foo = {
   name: &quot;&#x5F20;&#x4E09;&quot;,
   logName: function(age) {
   console.log(this.name, age);
   }
 }
 var fooNew = foo.logName;
 var fooNewBind = foo.logName.bind(foo);
 fooNew(10)//&#x674E;&#x56DB;,10
 fooNewBind(11)//&#x5F20;&#x4E09;,11  &#x56E0;&#x4E3A;bind&#x6539;&#x53D8;&#x4E86;fooNewBind&#x91CC;&#x9762;&#x7684;this&#x6307;&#x5411;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">&apos;&#x674E;&#x56DB;&apos;</span>
 <span class="hljs-keyword">var</span> foo = {
   <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;&#x5F20;&#x4E09;&quot;</span>,
   <span class="hljs-attr">logName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">age</span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name, age);
   }
 }
 <span class="hljs-keyword">var</span> fooNew = foo.logName;
 <span class="hljs-keyword">var</span> fooNewBind = foo.logName.bind(foo);
 fooNew(<span class="hljs-number">10</span>)<span class="hljs-comment">//&#x674E;&#x56DB;,10</span>
 fooNewBind(<span class="hljs-number">11</span>)<span class="hljs-comment">//&#x5F20;&#x4E09;,11  &#x56E0;&#x4E3A;bind&#x6539;&#x53D8;&#x4E86;fooNewBind&#x91CC;&#x9762;&#x7684;this&#x6307;&#x5411;</span></code></pre>
<h2 id="articleHeader16">5.JS&#x5E38;&#x89C1;&#x7684;&#x56DB;&#x79CD;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</h2>
<h3 id="articleHeader17">5.1 &#x5DE5;&#x5382;&#x6A21;&#x5F0F;</h3>
<p>&#x7B80;&#x5355;&#x7684;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x89E3;&#x51B3;&#x591A;&#x4E2A;&#x76F8;&#x4F3C;&#x7684;&#x95EE;&#x9898;;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CreatePerson(name,age,sex) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
        return this.name;
    }
    return obj;
}
var p1 = new CreatePerson(&quot;longen&quot;,&apos;28&apos;,&apos;&#x7537;&apos;);
var p2 = new CreatePerson(&quot;tugenhua&quot;,&apos;27&apos;,&apos;&#x5973;&apos;);
console.log(p1.name); // longen
console.log(p1.age);  // 28
console.log(p1.sex);  // &#x7537;
console.log(p1.sayName()); // longen

console.log(p2.name);  // tugenhua
console.log(p2.age);   // 27
console.log(p2.sex);   // &#x5973;
console.log(p2.sayName()); // tugenhua  " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CreatePerson</span>(<span class="hljs-params">name,age,sex</span>) </span>{
    <span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
    <span class="hljs-keyword">return</span> obj;
}
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> CreatePerson(<span class="hljs-string">&quot;longen&quot;</span>,<span class="hljs-string">&apos;28&apos;</span>,<span class="hljs-string">&apos;&#x7537;&apos;</span>);
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> CreatePerson(<span class="hljs-string">&quot;tugenhua&quot;</span>,<span class="hljs-string">&apos;27&apos;</span>,<span class="hljs-string">&apos;&#x5973;&apos;</span>);
<span class="hljs-built_in">console</span>.log(p1.name); <span class="hljs-comment">// longen</span>
<span class="hljs-built_in">console</span>.log(p1.age);  <span class="hljs-comment">// 28</span>
<span class="hljs-built_in">console</span>.log(p1.sex);  <span class="hljs-comment">// &#x7537;</span>
<span class="hljs-built_in">console</span>.log(p1.sayName()); <span class="hljs-comment">// longen</span>

<span class="hljs-built_in">console</span>.log(p2.name);  <span class="hljs-comment">// tugenhua</span>
<span class="hljs-built_in">console</span>.log(p2.age);   <span class="hljs-comment">// 27</span>
<span class="hljs-built_in">console</span>.log(p2.sex);   <span class="hljs-comment">// &#x5973;</span>
<span class="hljs-built_in">console</span>.log(p2.sayName()); <span class="hljs-comment">// tugenhua  </span></code></pre>
<h3 id="articleHeader18">5.2&#x5355;&#x4F8B;&#x6A21;&#x5F0F;</h3>
<p>&#x53EA;&#x80FD;&#x88AB;&#x5B9E;&#x4F8B;&#x5316;(&#x6784;&#x9020;&#x51FD;&#x6570;&#x7ED9;&#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x4E0E;&#x65B9;&#x6CD5;)&#x4E00;&#x6B21;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5355;&#x4F53;&#x6A21;&#x5F0F;
var Singleton = function(name){
    this.name = name;
};
Singleton.prototype.getName = function(){
    return this.name;
}
// &#x83B7;&#x53D6;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;
var getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {//&#x76F8;&#x5F53;&#x4E8E;&#x4E00;&#x4E2A;&#x4E00;&#x6B21;&#x6027;&#x9600;&#x95E8;,&#x53EA;&#x80FD;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x6B21;
            instance = new Singleton(name);
        }
        return instance;
    }
})();
// &#x6D4B;&#x8BD5;&#x5355;&#x4F53;&#x6A21;&#x5F0F;&#x7684;&#x5B9E;&#x4F8B;,&#x6240;&#x4EE5;a===b
var a = getInstance(&quot;aa&quot;);
var b = getInstance(&quot;bb&quot;);  
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x5355;&#x4F53;&#x6A21;&#x5F0F;</span>
<span class="hljs-keyword">var</span> Singleton = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
};
Singleton.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
<span class="hljs-comment">// &#x83B7;&#x53D6;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">var</span> getInstance = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> instance = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(name)</span> </span>{
        <span class="hljs-keyword">if</span>(!instance) {<span class="hljs-comment">//&#x76F8;&#x5F53;&#x4E8E;&#x4E00;&#x4E2A;&#x4E00;&#x6B21;&#x6027;&#x9600;&#x95E8;,&#x53EA;&#x80FD;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x6B21;</span>
            instance = <span class="hljs-keyword">new</span> Singleton(name);
        }
        <span class="hljs-keyword">return</span> instance;
    }
})();
<span class="hljs-comment">// &#x6D4B;&#x8BD5;&#x5355;&#x4F53;&#x6A21;&#x5F0F;&#x7684;&#x5B9E;&#x4F8B;,&#x6240;&#x4EE5;a===b</span>
<span class="hljs-keyword">var</span> a = getInstance(<span class="hljs-string">&quot;aa&quot;</span>);
<span class="hljs-keyword">var</span> b = getInstance(<span class="hljs-string">&quot;bb&quot;</span>);  
</code></pre>
<h3 id="articleHeader19">5.3 &#x6C99;&#x7BB1;&#x6A21;&#x5F0F;</h3>
<p>&#x5C06;&#x4E00;&#x4E9B;&#x51FD;&#x6570;&#x653E;&#x5230;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x91CC;&#x9762;,&#x4F46;&#x8981;&#x7528;&#x95ED;&#x5305;&#x66B4;&#x9732;&#x63A5;&#x53E3;,&#x7528;&#x53D8;&#x91CF;&#x63A5;&#x6536;&#x66B4;&#x9732;&#x7684;&#x63A5;&#x53E3;,&#x518D;&#x8C03;&#x7528;&#x91CC;&#x9762;&#x7684;&#x503C;,&#x5426;&#x5219;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x91CC;&#x9762;&#x7684;&#x503C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let sandboxModel=(function(){
    function sayName(){};
    function sayAge(){};
    return{
        sayName:sayName,
        sayAge:sayAge
    }
})()
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> sandboxModel=(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayName</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayAge</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">sayName</span>:sayName,
        <span class="hljs-attr">sayAge</span>:sayAge
    }
})()
</code></pre>
<h3 id="articleHeader20">5.4 &#x53D1;&#x5E03;&#x8005;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;</h3>
<p>&#x5C31;&#x4F8B;&#x5982;&#x5982;&#x6211;&#x4EEC;&#x5173;&#x6CE8;&#x4E86;&#x67D0;&#x4E00;&#x4E2A;&#x516C;&#x4F17;&#x53F7;,&#x7136;&#x540E;&#x4ED6;&#x5BF9;&#x5E94;&#x7684;&#x6709;&#x65B0;&#x7684;&#x6D88;&#x606F;&#x5C31;&#x4F1A;&#x7ED9;&#x4F60;&#x63A8;&#x9001;,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x53D1;&#x5E03;&#x8005;&#x4E0E;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;
    var shoeObj = {}; // &#x5B9A;&#x4E49;&#x53D1;&#x5E03;&#x8005;
    shoeObj.list = []; // &#x7F13;&#x5B58;&#x5217;&#x8868; &#x5B58;&#x653E;&#x8BA2;&#x9605;&#x8005;&#x56DE;&#x8C03;&#x51FD;&#x6570;

    // &#x589E;&#x52A0;&#x8BA2;&#x9605;&#x8005;
    shoeObj.listen = function(fn) {
        shoeObj.list.push(fn); // &#x8BA2;&#x9605;&#x6D88;&#x606F;&#x6DFB;&#x52A0;&#x5230;&#x7F13;&#x5B58;&#x5217;&#x8868;
    }

    // &#x53D1;&#x5E03;&#x6D88;&#x606F;
    shoeObj.trigger = function() {
            for (var i = 0, fn; fn = this.list[i++];) {
                fn.apply(this, arguments);//&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53EA;&#x662F;&#x6539;&#x53D8;fn&#x7684;this,
            }
        }
     // &#x5C0F;&#x7EA2;&#x8BA2;&#x9605;&#x5982;&#x4E0B;&#x6D88;&#x606F;
    shoeObj.listen(function(color, size) {
        console.log(&quot;&#x989C;&#x8272;&#x662F;&#xFF1A;&quot; + color);
        console.log(&quot;&#x5C3A;&#x7801;&#x662F;&#xFF1A;&quot; + size);
    });

    // &#x5C0F;&#x82B1;&#x8BA2;&#x9605;&#x5982;&#x4E0B;&#x6D88;&#x606F;
    shoeObj.listen(function(color, size) {
        console.log(&quot;&#x518D;&#x6B21;&#x6253;&#x5370;&#x989C;&#x8272;&#x662F;&#xFF1A;&quot; + color);
        console.log(&quot;&#x518D;&#x6B21;&#x6253;&#x5370;&#x5C3A;&#x7801;&#x662F;&#xFF1A;&quot; + size);
    });
    shoeObj.trigger(&quot;&#x7EA2;&#x8272;&quot;, 40);
    shoeObj.trigger(&quot;&#x9ED1;&#x8272;&quot;, 42);  
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//&#x53D1;&#x5E03;&#x8005;&#x4E0E;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;</span>
    <span class="hljs-built_in">var</span> shoeObj = {}; <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x53D1;&#x5E03;&#x8005;</span>
    shoeObj.list = []; <span class="hljs-comment">// &#x7F13;&#x5B58;&#x5217;&#x8868; &#x5B58;&#x653E;&#x8BA2;&#x9605;&#x8005;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>

    <span class="hljs-comment">// &#x589E;&#x52A0;&#x8BA2;&#x9605;&#x8005;</span>
    shoeObj.listen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
        shoeObj.list.push(fn); <span class="hljs-comment">// &#x8BA2;&#x9605;&#x6D88;&#x606F;&#x6DFB;&#x52A0;&#x5230;&#x7F13;&#x5B58;&#x5217;&#x8868;</span>
    }

    <span class="hljs-comment">// &#x53D1;&#x5E03;&#x6D88;&#x606F;</span>
    shoeObj.trigger = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, fn; fn = <span class="hljs-keyword">this</span>.list[i++];) {
                fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);<span class="hljs-comment">//&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53EA;&#x662F;&#x6539;&#x53D8;fn&#x7684;this,</span>
            }
        }
     <span class="hljs-comment">// &#x5C0F;&#x7EA2;&#x8BA2;&#x9605;&#x5982;&#x4E0B;&#x6D88;&#x606F;</span>
    shoeObj.listen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">color, size</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x989C;&#x8272;&#x662F;&#xFF1A;&quot;</span> + <span class="hljs-built_in">color</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5C3A;&#x7801;&#x662F;&#xFF1A;&quot;</span> + <span class="hljs-built_in">size</span>);
    });

    <span class="hljs-comment">// &#x5C0F;&#x82B1;&#x8BA2;&#x9605;&#x5982;&#x4E0B;&#x6D88;&#x606F;</span>
    shoeObj.listen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">color, size</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x518D;&#x6B21;&#x6253;&#x5370;&#x989C;&#x8272;&#x662F;&#xFF1A;&quot;</span> + <span class="hljs-built_in">color</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x518D;&#x6B21;&#x6253;&#x5370;&#x5C3A;&#x7801;&#x662F;&#xFF1A;&quot;</span> + <span class="hljs-built_in">size</span>);
    });
    shoeObj.trigger(<span class="hljs-string">&quot;&#x7EA2;&#x8272;&quot;</span>, <span class="hljs-number">40</span>);
    shoeObj.trigger(<span class="hljs-string">&quot;&#x9ED1;&#x8272;&quot;</span>, <span class="hljs-number">42</span>);  
</code></pre>
<p>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x662F;&#x7528;&#x6570;&#x7EC4;&#x5B58;&#x8D2E;&#x8BA2;&#x9605;&#x8005;, &#x53D1;&#x5E03;&#x8005;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x901A;&#x77E5;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x904D;&#x5386;&#x8BA2;&#x9605;&#x8005;&#x6570;&#x7EC4;,&#x5E76;&#x5C06;&#x53D1;&#x5E03;&#x8005;&#x5185;&#x5BB9;&#x4F20;&#x5165;&#x8BA2;&#x9605;&#x8005;&#x6570;&#x7EC4;</p>
<p>&#x66F4;&#x591A;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x8BF7;&#x6233;:<a href="https://www.cnblogs.com/tugenhua0707/p/5198407.html" rel="nofollow noreferrer" target="_blank">Javascript&#x5E38;&#x7528;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x8BE6;&#x89E3;</a></p>
<h2 id="articleHeader21">6.&#x539F;&#x578B;&#x94FE;</h2>
<h3 id="articleHeader22">6.1 &#x5B9A;&#x4E49;</h3>
<p>&#x5BF9;&#x8C61;&#x7EE7;&#x627F;&#x5C5E;&#x6027;&#x7684;&#x4E00;&#x4E2A;&#x94FE;&#x6761;</p>
<h3 id="articleHeader23">6.2&#x6784;&#x9020;&#x51FD;&#x6570;,&#x5B9E;&#x4F8B;&#x4E0E;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5173;&#x7CFB;</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bV8wcf?w=638&amp;h=241" del-src="https://static.alili.tech/img/bV8wcf?w=638&amp;h=241" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Person = function (name) { this.name = name; }//person&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;
var o3personTwo = new Person(&apos;personTwo&apos;)//personTwo&#x662F;&#x5B9E;&#x4F8B;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(name)</span> </span>{ <span class="hljs-keyword">this</span>.name = name; }<span class="hljs-comment">//person&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">var</span> o3personTwo = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;personTwo&apos;</span>)<span class="hljs-comment">//personTwo&#x662F;&#x5B9E;&#x4F8B;</span></code></pre>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bV8wdm?w=534&amp;h=333" del-src="https://static.alili.tech/img/bV8wcf?w=638&amp;h=241" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x7684;constructor&#x5C5E;&#x6027;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;</p>
<h3 id="articleHeader24">6.3 &#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x6CD5;</h3>
<p>1.&#x5B57;&#x9762;&#x91CF;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj={&apos;name&apos;:&apos;&#x5F20;&#x4E09;&apos;}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj={<span class="hljs-string">&apos;name&apos;</span>:<span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>}
</code></pre>
<p>2.Object&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Obj=new Object()
Obj.name=&apos;&#x5F20;&#x4E09;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> Obj=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>()
Obj.name=<span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span></code></pre>
<p>3.&#x4F7F;&#x7528;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createPerson(name){
 var o = new Object();
 o.name = name;
 };
 return o; 
}
var person1 = createPerson(&apos;&#x5F20;&#x4E09;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPerson</span>(<span class="hljs-params">name</span>)</span>{
 <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
 o.name = name;
 };
 <span class="hljs-keyword">return</span> o; 
}
<span class="hljs-keyword">var</span> person1 = createPerson(<span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>);</code></pre>
<p>4.&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
 this.name = name;
}
var person1 = new Person(&apos;&#x5F20;&#x4E09;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span></span>{
 <span class="hljs-keyword">this</span>.name = name;
}
<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>);</code></pre>
<h3 id="articleHeader25">6.4 new&#x8FD0;&#x7B97;&#x7B26;</h3>
<p>1.&#x521B;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;;<br>2.this&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;;<br>3.&#x6784;&#x9020;&#x51FD;&#x6570;&#x6709;&#x8FD4;&#x56DE;,&#x4F1A;&#x66FF;&#x6362;new&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;,&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x662F;new&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;<br>4.&#x624B;&#x52A8;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;new&#x8FD0;&#x7B97;&#x7B26;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var new2 = function (func) {
    var o = Object.create(func.prototype); &#x3000;&#x3000; //&#x521B;&#x5EFA;&#x5BF9;&#x8C61;
    var k = func.call(o);&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;//&#x6539;&#x53D8;this&#x6307;&#x5411;&#xFF0C;&#x628A;&#x7ED3;&#x679C;&#x4ED8;&#x7ED9;k
    if (typeof k === &apos;object&apos;) {&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;//&#x5224;&#x65AD;k&#x7684;&#x7C7B;&#x578B;&#x662F;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;
        return k;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000; //&#x662F;&#xFF0C;&#x8FD4;&#x56DE;k
    } else {
        return o;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000; //&#x4E0D;&#x662F;&#x8FD4;&#x56DE;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x7ED3;&#x679C;
    }
}  " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> new2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">func</span>) </span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-built_in">Object</span>.create(func.prototype); &#x3000;&#x3000; <span class="hljs-comment">//&#x521B;&#x5EFA;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">var</span> k = func.call(o);&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;<span class="hljs-comment">//&#x6539;&#x53D8;this&#x6307;&#x5411;&#xFF0C;&#x628A;&#x7ED3;&#x679C;&#x4ED8;&#x7ED9;k</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> k === <span class="hljs-string">&apos;object&apos;</span>) {&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;<span class="hljs-comment">//&#x5224;&#x65AD;k&#x7684;&#x7C7B;&#x578B;&#x662F;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">return</span> k;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000; <span class="hljs-comment">//&#x662F;&#xFF0C;&#x8FD4;&#x56DE;k</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> o;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000; <span class="hljs-comment">//&#x4E0D;&#x662F;&#x8FD4;&#x56DE;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x7ED3;&#x679C;</span>
    }
}  </code></pre>
<p>&#x66F4;&#x591A;&#x8BE6;&#x60C5;:<a href="https://www.cnblogs.com/chengzp/p/prototype.html" rel="nofollow noreferrer" target="_blank">&#x8BE6;&#x8C08;JavaScript&#x539F;&#x578B;&#x94FE;</a></p>
<h3 id="articleHeader26">6.5 &#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x94FE;</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bV8wf4?w=570&amp;h=709" del-src="https://static.alili.tech/img/bV8wcf?w=638&amp;h=241" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<h2 id="articleHeader27">7.&#x7EE7;&#x627F;&#x7684;&#x65B9;&#x5F0F;</h2>
<p>JS&#x662F;&#x4E00;&#x95E8;&#x5F31;&#x7C7B;&#x578B;&#x52A8;&#x6001;&#x8BED;&#x8A00;,&#x5C01;&#x88C5;&#x548C;&#x7EE7;&#x627F;&#x662F;&#x4ED6;&#x7684;&#x4E24;&#x5927;&#x7279;&#x6027;</p>
<h3 id="articleHeader28">7.1&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h3>
<p>&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;<br>1.&#x4EE3;&#x7801;&#x5B9E;&#x73B0;<br>&#x5B9A;&#x4E49;&#x7236;&#x7C7B;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x52A8;&#x7269;&#x7C7B;
function Animal (name) {
  // &#x5C5E;&#x6027;
  this.name = name || &apos;Animal&apos;;
  // &#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;
  this.sleep = function(){
    console.log(this.name + &apos;&#x6B63;&#x5728;&#x7761;&#x89C9;&#xFF01;&apos;);
  }
}
// &#x539F;&#x578B;&#x65B9;&#x6CD5;
Animal.prototype.eat = function(food) {
  console.log(this.name + &apos;&#x6B63;&#x5728;&#x5403;&#xFF1A;&apos; + food);
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x52A8;&#x7269;&#x7C7B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-comment">// &#x5C5E;&#x6027;</span>
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">&apos;Animal&apos;</span>;
  <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos;&#x6B63;&#x5728;&#x7761;&#x89C9;&#xFF01;&apos;</span>);
  }
}
<span class="hljs-comment">// &#x539F;&#x578B;&#x65B9;&#x6CD5;</span>
Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">food</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">&apos;&#x6B63;&#x5728;&#x5403;&#xFF1A;&apos;</span> + food);
};
</code></pre>
<p>&#x5B50;&#x7C7B;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = &apos;cat&apos;;

//&#x3000;Test Code
var cat = new Cat();
console.log(cat.name);//cat
console.log(cat.eat(&apos;fish&apos;));//cat&#x6B63;&#x5728;&#x5403;&#xFF1A;fish  undefined
console.log(cat.sleep());//cat&#x6B63;&#x5728;&#x7761;&#x89C9;&#xFF01; undefined
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code>function <span class="hljs-keyword">Cat</span>(){ 
}
<span class="hljs-keyword">Cat</span>.prototype = new Animal();
<span class="hljs-keyword">Cat</span>.prototype.name = &apos;<span class="hljs-keyword">cat</span>&apos;;

<span class="hljs-comment">//&#x3000;Test Code</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">cat</span> = new <span class="hljs-keyword">Cat</span>();
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span>.name);<span class="hljs-comment">//cat</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span>.eat(&apos;fish&apos;));<span class="hljs-comment">//cat&#x6B63;&#x5728;&#x5403;&#xFF1A;fish  undefined</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span>.<span class="hljs-keyword">sleep</span>());<span class="hljs-comment">//cat&#x6B63;&#x5728;&#x7761;&#x89C9;&#xFF01; undefined</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span> instanceof Animal); <span class="hljs-comment">//true </span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">cat</span> instanceof <span class="hljs-keyword">Cat</span>); <span class="hljs-comment">//true</span>
</code></pre>
<p>2.&#x4F18;&#x7F3A;&#x70B9;<br>&#x7B80;&#x5355;&#x6613;&#x4E8E;&#x5B9E;&#x73B0;,&#x4F46;&#x662F;&#x8981;&#x60F3;&#x4E3A;&#x5B50;&#x7C7B;&#x65B0;&#x589E;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5728;new Animal()&#x8FD9;&#x6837;&#x7684;&#x8BED;&#x53E5;&#x4E4B;&#x540E;&#x6267;&#x884C;,&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x591A;&#x7EE7;&#x627F;</p>
<h3 id="articleHeader29">7.2 &#x6784;&#x9020;&#x7EE7;&#x627F;</h3>
<p>&#x5B9E;&#x8D28;&#x662F;&#x5229;&#x7528;call&#x6765;&#x6539;&#x53D8;Cat&#x4E2D;&#x7684;this&#x6307;&#x5411;<br>1.&#x4EE3;&#x7801;&#x5B9E;&#x73B0;<br>&#x5B50;&#x7C7B;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name){
  Animal.call(this);
  this.name = name || &apos;Tom&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span><span class="hljs-params">(name)</span></span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">&apos;Tom&apos;</span>;
}</code></pre>
<p>2.&#x4F18;&#x7F3A;&#x70B9;<br>&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x591A;&#x7EE7;&#x627F;,&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x539F;&#x578B;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;</p>
<h3 id="articleHeader30">7.3 &#x5B9E;&#x4F8B;&#x7EE7;&#x627F;</h3>
<p>&#x4E3A;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x8FD4;&#x56DE;<br>1.&#x4EE3;&#x7801;&#x5B9E;&#x73B0;<br>&#x5B50;&#x7C7B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name){
  var instance = new Animal();
  instance.name = name || &apos;Tom&apos;;
  return instance;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs smali"><code>function Cat(name){
  var<span class="hljs-built_in"> instance </span>=<span class="hljs-built_in"> new </span>Animal();
  instance.name = name || &apos;Tom&apos;;
 <span class="hljs-built_in"> return </span>instance;
}</code></pre>
<p>2.&#x4F18;&#x7F3A;&#x70B9;<br>&#x4E0D;&#x9650;&#x5236;&#x8C03;&#x7528;&#x65B9;&#x5F0F;,&#x4F46;&#x4E0D;&#x80FD;&#x5B9E;&#x73B0;&#x591A;&#x7EE7;&#x627F;</p>
<h3 id="articleHeader31">7.4 &#x62F7;&#x8D1D;&#x7EE7;&#x627F;</h3>
<p>&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x62F7;&#x8D1D;&#x4E00;&#x4EFD;&#x5230;&#x5B50;&#x7C7B;&#x4E2D;<br>1.&#x5B50;&#x7C7B;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || &apos;Tom&apos;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span><span class="hljs-params">(name)</span></span>{
  <span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal();
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> p <span class="hljs-keyword">in</span> animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || <span class="hljs-string">&apos;Tom&apos;</span>;
}</code></pre>
<p>2.&#x4F18;&#x7F3A;&#x70B9;<br>&#x652F;&#x6301;&#x591A;&#x7EE7;&#x627F;,&#x4F46;&#x662F;&#x6548;&#x7387;&#x4F4E;&#x5360;&#x7528;&#x5185;&#x5B58;</p>
<h3 id="articleHeader32">7.5 &#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3>
<p>&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x6784;&#x9020;&#xFF0C;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5E76;&#x4FDD;&#x7559;&#x4F20;&#x53C2;&#x7684;&#x4F18;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x590D;&#x7528;<br>1.&#x5B50;&#x7C7B;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name){
  Animal.call(this);
  this.name = name || &apos;Tom&apos;;
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span><span class="hljs-params">(name)</span></span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">&apos;Tom&apos;</span>;
}
Cat.prototype = <span class="hljs-keyword">new</span> Animal();
Cat.prototype.constructor = Cat;</code></pre>
<h3 id="articleHeader33">7.6 &#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Cat(name){
  Animal.call(this);
  this.name = name || &apos;Tom&apos;;
}
(function(){
  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x7684;&#x7C7B;
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //&#x5C06;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;
  Cat.prototype = new Super();
})();
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cat</span><span class="hljs-params">(name)</span></span>{
  Animal.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.name = name || <span class="hljs-string">&apos;Tom&apos;</span>;
}
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x7684;&#x7C7B;</span>
  <span class="hljs-keyword">var</span> Super = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
  Super.prototype = Animal.prototype;
  <span class="hljs-comment">//&#x5C06;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;</span>
  Cat.prototype = <span class="hljs-keyword">new</span> Super();
})();
</code></pre>
<h3 id="articleHeader34">7.7 ES6&#x7684;extends&#x7EE7;&#x627F;</h3>
<p>ES6 &#x7684;&#x7EE7;&#x627F;&#x673A;&#x5236;&#x662F;&#x5148;&#x521B;&#x9020;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;this&#xFF08;&#x6240;&#x4EE5;&#x5FC5;&#x987B;&#x5148;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7528;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4FEE;&#x6539;this,<a href="http://es6.ruanyifeng.com/#docs/class-extends" rel="nofollow noreferrer" target="_blank">&#x94FE;&#x63A5;&#x63CF;&#x8FF0;</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7236;&#x7C7B;
class Person {
    //constructor&#x662F;&#x6784;&#x9020;&#x65B9;&#x6CD5;
    constructor(skin, language) {
        this.skin = skin;
        this.language = language;
    }
    say() {
        console.log(&apos;&#x6211;&#x662F;&#x7236;&#x7C7B;&apos;)
    }
}

//&#x5B50;&#x7C7B;
class Chinese extends Person {
    constructor(skin, language, positon) {
        //console.log(this);//&#x62A5;&#x9519;
        super(skin, language);
        //super();&#x76F8;&#x5F53;&#x4E8E;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
        //console.log(this);&#x8C03;&#x7528;super&#x540E;&#x5F97;&#x5230;&#x4E86;this&#xFF0C;&#x4E0D;&#x62A5;&#x9519;&#xFF0C;this&#x6307;&#x5411;&#x5B50;&#x7C7B;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x8C03;&#x7528;&#x4E86;&#x7236;&#x7C7B;.prototype.constructor.call(this)
        this.positon = positon;
    }
    aboutMe() {
        console.log(`${this.skin} ${this.language}  ${this.positon}`);
    }
}

//&#x8C03;&#x7528;&#x53EA;&#x80FD;&#x901A;&#x8FC7;new&#x7684;&#x65B9;&#x6CD5;&#x5F97;&#x5230;&#x5B9E;&#x4F8B;,&#x518D;&#x8C03;&#x7528;&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;
let obj = new Chinese(&apos;&#x7EA2;&#x8272;&apos;, &apos;&#x4E2D;&#x6587;&apos;, &apos;&#x9999;&#x6E2F;&apos;);
obj.aboutMe();
obj.say();
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x7236;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-comment">//constructor&#x662F;&#x6784;&#x9020;&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">constructor</span>(skin, language) {
        <span class="hljs-keyword">this</span>.skin = skin;
        <span class="hljs-keyword">this</span>.language = language;
    }
    say() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x662F;&#x7236;&#x7C7B;&apos;</span>)
    }
}

<span class="hljs-comment">//&#x5B50;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Chinese</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>(skin, language, positon) {
        <span class="hljs-comment">//console.log(this);//&#x62A5;&#x9519;</span>
        <span class="hljs-keyword">super</span>(skin, language);
        <span class="hljs-comment">//super();&#x76F8;&#x5F53;&#x4E8E;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
        <span class="hljs-comment">//console.log(this);&#x8C03;&#x7528;super&#x540E;&#x5F97;&#x5230;&#x4E86;this&#xFF0C;&#x4E0D;&#x62A5;&#x9519;&#xFF0C;this&#x6307;&#x5411;&#x5B50;&#x7C7B;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x8C03;&#x7528;&#x4E86;&#x7236;&#x7C7B;.prototype.constructor.call(this)</span>
        <span class="hljs-keyword">this</span>.positon = positon;
    }
    aboutMe() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.skin}</span> <span class="hljs-subst">${<span class="hljs-keyword">this</span>.language}</span>  <span class="hljs-subst">${<span class="hljs-keyword">this</span>.positon}</span>`</span>);
    }
}

<span class="hljs-comment">//&#x8C03;&#x7528;&#x53EA;&#x80FD;&#x901A;&#x8FC7;new&#x7684;&#x65B9;&#x6CD5;&#x5F97;&#x5230;&#x5B9E;&#x4F8B;,&#x518D;&#x8C03;&#x7528;&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">new</span> Chinese(<span class="hljs-string">&apos;&#x7EA2;&#x8272;&apos;</span>, <span class="hljs-string">&apos;&#x4E2D;&#x6587;&apos;</span>, <span class="hljs-string">&apos;&#x9999;&#x6E2F;&apos;</span>);
obj.aboutMe();
obj.say();
</code></pre>
<p>&#x66F4;&#x591A;&#x8BE6;&#x60C5;&#x8BF7;&#x6233;:<a href="https://www.cnblogs.com/humin/p/4556820.html#undefined" rel="nofollow noreferrer" target="_blank">JS&#x7EE7;&#x627F;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;</a></p>
<h2 id="articleHeader35">&#x53C2;&#x8003;&#x6587;&#x732E;:</h2>
<p><a href="https://www.cnblogs.com/tugenhua0707/p/5198407.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/tugen...</a><br><a href="https://www.cnblogs.com/humin/p/4556820.html#undefined" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/humin...</a><br><a href="https://www.cnblogs.com/chengzp/p/prototype.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/cheng...</a><br><a href="https://www.cnblogs.com/chengzp/p/prototype.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/cheng...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS高级之面试必须知道的几个点

## 原文链接
[https://segmentfault.com/a/1190000014405410](https://segmentfault.com/a/1190000014405410)

