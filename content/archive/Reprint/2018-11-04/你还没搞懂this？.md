---
title: 你还没搞懂this？
hidden: true
categories: reprint
slug: c226ecbb
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x524D;&#x8A00;</h2><p>this&#x5173;&#x952E;&#x5B57;&#x662F;JavaScript&#x4E2D;&#x6700;&#x590D;&#x6742;&#x7684;&#x673A;&#x5236;&#x4E4B;&#x4E00;&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x7279;&#x522B;&#x7684;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x88AB;&#x81EA;&#x52A8;&#x5B9A;&#x4E49;&#x5728;&#x6240;&#x6709;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x3002;&#x5BF9;&#x4E8E;&#x90A3;&#x4E9B;&#x6CA1;&#x6709;&#x6295;&#x5165;&#x65F6;&#x95F4;&#x5B66;&#x4E60;this&#x673A;&#x5236;&#x7684;JavaScript&#x5F00;&#x53D1;&#x8005;&#x6765;&#x8BF4;&#xFF0C;this&#x7684;&#x6307;&#x5411;&#x4E00;&#x76F4;&#x662F;&#x4E00;&#x4EF6;&#x975E;&#x5E38;&#x4EE4;&#x4EBA;&#x56F0;&#x60D1;&#x7684;&#x4E8B;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016680888?w=1093&amp;h=588" src="https://static.alili.tech/img/remote/1460000016680888?w=1093&amp;h=588" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x4E86;&#x89E3;this</h2><p><strong>&#x5B66;&#x4E60;this&#x7684;&#x7B2C;&#x4E00;&#x6B65;&#x662F;&#x660E;&#x767D;this&#x65E2;&#x4E0D;&#x6307;&#x5411;&#x51FD;&#x6570;&#x81EA;&#x8EAB;&#x4E5F;&#x4E0D;&#x6307;&#x5411;&#x51FD;&#x6570;&#x7684;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;</strong>&#xFF0C;&#x4F60;&#x4E5F;&#x8BB8;&#x88AB;&#x8FD9;&#x6837;&#x7684;&#x89E3;&#x91CA;&#x8BEF;&#x5BFC;&#x8FC7;&#xFF0C;&#x4F46;&#x5176;&#x5B9E;&#x5B83;&#x4EEC;&#x90FD;&#x662F;&#x9519;&#x8BEF;&#x7684;&#x3002;&#x968F;&#x7740;&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x573A;&#x5408;&#x7684;&#x4E0D;&#x540C;&#xFF0C;this&#x7684;&#x503C;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;&#x4F46;&#x603B;&#x6709;&#x4E00;&#x6761;&#x539F;&#x5219;&#x5C31;&#x662F;<strong>JS&#x4E2D;&#x7684;this&#x4EE3;&#x8868;&#x7684;&#x662F;&#x5F53;&#x524D;&#x884C;&#x4E3A;&#x6267;&#x884C;&#x7684;&#x4E3B;&#x4F53;</strong>&#xFF0C;&#x5728;JS&#x4E2D;&#x4E3B;&#x8981;&#x7814;&#x7A76;&#x7684;&#x90FD;&#x662F;&#x51FD;&#x6570;&#x4E2D;&#x7684;this&#xFF0C;&#x4F46;&#x5E76;&#x4E0D;&#x662F;&#x8BF4;&#x53EA;&#x6709;&#x5728;&#x51FD;&#x6570;&#x91CC;&#x624D;&#x6709;this&#xFF0C;<strong>this&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5728;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#x53D1;&#x751F;&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x5B83;&#x6307;&#x5411;&#x4EC0;&#x4E48;&#x5B8C;&#x5168;&#x53D6;&#x51B3;&#x4E8E;&#x51FD;&#x6570;&#x5728;&#x54EA;&#x91CC;&#x88AB;&#x8C03;&#x7528;</strong>&#x3002;&#x5982;&#x4F55;&#x7684;&#x533A;&#x5206;this&#x5462;&#xFF1F;</p><h2 id="articleHeader2">&#x4E09;&#x3001;this&#x5230;&#x5E95;&#x662F;&#x8C01;</h2><p>&#x8FD9;&#x8981;&#x5206;&#x60C5;&#x51B5;&#x8BA8;&#x8BBA;&#xFF0C;&#x5E38;&#x89C1;&#x6709;&#x4E94;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><h4>1&#x3001;&#x51FD;&#x6570;&#x6267;&#x884C;&#x65F6;&#x9996;&#x5148;&#x770B;&#x51FD;&#x6570;&#x540D;&#x524D;&#x9762;&#x662F;&#x5426;&#x6709;&quot;.&quot;&#xFF0C;&#x6709;&#x7684;&#x8BDD;&#xFF0C;&quot;.&quot;&#x524D;&#x9762;&#x662F;&#x8C01;,this&#x5C31;&#x662F;&#x8C01;&#xFF1B;&#x6CA1;&#x6709;&#x7684;&#x8BDD;this&#x5C31;&#x662F;window</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
  console.log(this);
}
var obj={fn:fn};
fn();//this-&gt;window
obj.fn();//this-&gt;obj
function sum(){
     fn();//this-&gt;window
}
sum();
var oo={
 sum:function(){
 console.log(this);//this-&gt;oo
       fn()&#xFF1B;//this-&gt;window
  }
};
oo.sum();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">var</span> obj={<span class="hljs-attr">fn</span>:fn};
fn();<span class="hljs-comment">//this-&gt;window</span>
obj.fn();<span class="hljs-comment">//this-&gt;obj</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>)</span>{
     fn();<span class="hljs-comment">//this-&gt;window</span>
}
sum();
<span class="hljs-keyword">var</span> oo={
 <span class="hljs-attr">sum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//this-&gt;oo</span>
       fn()&#xFF1B;<span class="hljs-comment">//this-&gt;window</span>
  }
};
oo.sum();</code></pre><h4>2&#x3001;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4E2D;&#x7684;this&#x6C38;&#x8FDC;&#x662F;window</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  (function(){ //this-&gt;window })();
  ~function(){ //this-&gt;window }();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">//this-&gt;window })();</span>
  ~<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">//this-&gt;window }();</span></code></pre><h4>3&#x3001;&#x7ED9;&#x5143;&#x7D20;&#x7684;&#x67D0;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x662F;&#x5F53;&#x524D;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x9664;&#x4E86;IE6~8&#x4E0B;&#x4F7F;&#x7528;attachEvent&#xFF08;IE&#x4E00;&#x4E2A;&#x8457;&#x540D;&#x7684;bug&#xFF09;</h4><ul><li>DOM&#x96F6;&#x7EA7;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  oDiv.onclick=function(){
     //this-&gt;oDiv
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  oDiv.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
     <span class="hljs-comment">//this-&gt;oDiv</span>
  };</code></pre><ul><li>DOM&#x4E8C;&#x7EA7;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  oDiv.addEventListener(&quot;click&quot;,function(){
     //this-&gt;oDiv
  },false);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  oDiv.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
     <span class="hljs-comment">//this-&gt;oDiv</span>
  },<span class="hljs-literal">false</span>);</code></pre><ul><li>&#x5728;IE6~8&#x4E0B;&#x4F7F;&#x7528;attachEvent&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;this&#x5C31;&#x662F;&#x6307;&#x7684;window&#x5BF9;&#x8C61;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  oDiv.attachEvent(&quot;click&quot;,function(){
       //this-&gt;window
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  oDiv.attachEvent(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
       <span class="hljs-comment">//this-&gt;window</span>
  });</code></pre><p>&#x6211;&#x4EEC;&#x5927;&#x591A;&#x6570;&#x65F6;&#x5019;&#xFF0C;&#x9047;&#x5230;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF0C;&#x5982;&#x4E0B;&#x9762;&#x4F8B;&#x5B50;&#x8FD9;&#x79CD;&#xFF0C;&#x5BF9;&#x4E8E;IE6~8&#x4E0B;&#x4F7F;&#x7528;attachEvent&#x4E0D;&#x5FC5;&#x592A;&#x8F83;&#x771F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
  console.log(this);
}
document.getElementById(&quot;div1&quot;).onclick=fn;//fn&#x4E2D;&#x7684;this&#x5C31;&#x662F;#divl
document.getElementById(&quot;div1&quot;).onclick=function(){
console.log(this);//this-&gt;#div1
fn();//this-&gt;window
}&#xFF1B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;div1&quot;</span>).onclick=fn;<span class="hljs-comment">//fn&#x4E2D;&#x7684;this&#x5C31;&#x662F;#divl</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;div1&quot;</span>).onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//this-&gt;#div1</span>
fn();<span class="hljs-comment">//this-&gt;window</span>
}&#xFF1B;</code></pre><h4>4&#x3001;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x4E2D;&#xFF0C;&#x7C7B;&#x4E2D;(&#x51FD;&#x6570;&#x4F53;&#x4E2D;)&#x51FA;&#x73B0;&#x7684;this.xxx=xxx&#x4E2D;&#x7684;this&#x662F;&#x5F53;&#x524D;&#x7C7B;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CreateJsPerson(name,age){
//&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x4F8B;p1-&gt;this
this.name=name;//-&gt;p1.name=name
this.age=age;
this.writeJs=function&#xFF08;&#xFF09;{
console.log(&quot;my name is&quot;+this.name +&quot;,i can write Js&quot;);
   };
//&#x6D4F;&#x89C8;&#x5668;&#x518D;&#x628A;&#x521B;&#x5EFA;&#x7684;&#x5B9E;&#x4F8B;&#x9ED8;&#x8BA4;&#x7684;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;
}
var p1=new CreateJsPerson(&quot;&#x5C39;&#x534E;&#x829D;&quot;,48);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CreateJsPerson</span>(<span class="hljs-params">name,age</span>)</span>{
<span class="hljs-comment">//&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x4F8B;p1-&gt;this</span>
<span class="hljs-keyword">this</span>.name=name;<span class="hljs-comment">//-&gt;p1.name=name</span>
<span class="hljs-keyword">this</span>.age=age;
<span class="hljs-keyword">this</span>.writeJs=<span class="hljs-function"><span class="hljs-keyword">function</span>&#xFF08;&#xFF09;</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;my name is&quot;</span>+<span class="hljs-keyword">this</span>.name +<span class="hljs-string">&quot;,i can write Js&quot;</span>);
   };
<span class="hljs-comment">//&#x6D4F;&#x89C8;&#x5668;&#x518D;&#x628A;&#x521B;&#x5EFA;&#x7684;&#x5B9E;&#x4F8B;&#x9ED8;&#x8BA4;&#x7684;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;</span>
}
<span class="hljs-keyword">var</span> p1=<span class="hljs-keyword">new</span> CreateJsPerson(<span class="hljs-string">&quot;&#x5C39;&#x534E;&#x829D;&quot;</span>,<span class="hljs-number">48</span>);</code></pre><p>&#x5FC5;&#x987B;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF1A;<strong>&#x7C7B;&#x4E2D;&#x67D0;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x503C;(&#x65B9;&#x6CD5;)&#xFF0C;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x9700;&#x8981;&#x770B;&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x524D;&#x9762;&#x662F;&#x5426;&#x6709;&quot;.&quot;,&#x624D;&#x80FD;&#x77E5;&#x9053;this&#x662F;&#x8C01;</strong>&#x3002;&#x5927;&#x5BB6;&#x4E0D;&#x59A8;&#x770B;&#x4E0B;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5C31;&#x53EF;&#x660E;&#x767D;&#x662F;&#x5565;&#x610F;&#x601D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Fn(){
this.x=100&#xFF1B;//this-&gt;f1
this.getX=function(){
console.log(this.x);//this-&gt;&#x9700;&#x8981;&#x770B;getX&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x77E5;&#x9053;
   }
}
var f1=new Fn;
f1.getX();//-&gt;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x662F;f1&#xFF0C;&#x6240;&#x4EE5;f1.x=100
var ss=f1.getX;
ss();//-&gt;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x662F;window -&gt;undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">this</span>.x=<span class="hljs-number">100</span>&#xFF1B;<span class="hljs-comment">//this-&gt;f1</span>
<span class="hljs-keyword">this</span>.getX=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);<span class="hljs-comment">//this-&gt;&#x9700;&#x8981;&#x770B;getX&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x77E5;&#x9053;</span>
   }
}
<span class="hljs-keyword">var</span> f1=<span class="hljs-keyword">new</span> Fn;
f1.getX();<span class="hljs-comment">//-&gt;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x662F;f1&#xFF0C;&#x6240;&#x4EE5;f1.x=100</span>
<span class="hljs-keyword">var</span> ss=f1.getX;
ss();<span class="hljs-comment">//-&gt;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x662F;window -&gt;undefined</span></code></pre><h4>5.call&#x3001;apply&#x548C;bind</h4><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x60F3;&#x5728;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;this&#x7ED1;&#x5B9A;obj,&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj={name:&quot;&#x6D6A;&#x91CC;&#x884C;&#x821F;&quot;};
function fn(){
console.log(this);//this=&gt;window
}
fn();
obj.fn();//-&gt;Uncaught TypeError:obj.fn is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>var obj={name:<span class="hljs-string">&quot;&#x6D6A;&#x91CC;&#x884C;&#x821F;&quot;</span>};
function <span class="hljs-function"><span class="hljs-keyword">fn</span><span class="hljs-params">()</span>{
console.<span class="hljs-built_in">log</span><span class="hljs-params">(this)</span></span>;<span class="hljs-comment">//this=&gt;window</span>
}
<span class="hljs-function"><span class="hljs-keyword">fn</span><span class="hljs-params">()</span></span>;
obj.<span class="hljs-keyword">fn</span>();<span class="hljs-comment">//-&gt;Uncaught TypeError:obj.fn is not a function</span></code></pre><p>&#x5982;&#x679C;&#x76F4;&#x63A5;&#x7ED1;&#x5B9A;obj.fn(),&#x7A0B;&#x5E8F;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x7528;fn.call(obj)&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;this&#x7ED1;&#x5B9A;obj,&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E0B;call&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li><strong>call&#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;:</strong></li></ul><p><strong>&#x2460;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8BA9;&#x539F;&#x578B;&#x4E0A;&#x7684;call&#x65B9;&#x6CD5;&#x6267;&#x884C;&#xFF0C;&#x5728;&#x6267;&#x884C;call&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x8BA9;fn&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x53D8;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x503C;obj&#xFF1B;&#x7136;&#x540E;&#x518D;&#x628A;fn&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;&#x3002;</strong></p><p><strong>&#x2461;call&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x503C;&#xFF0C;&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x548C;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5F97;&#x5230;&#x503C;&#x4E0D;&#x4E00;&#x6837;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5728;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;
var obj={name:&quot;&#x6D6A;&#x91CC;&#x884C;&#x821F; &quot;};
function fn(num1,num2){
console.log(num1+num2);
console.log(this);
}
fn.call(100,200);//this-&gt;100 num1=200 num2=undefined
fn.call(obj,100,200);//this-&gt;obj num1=100 num2=200
fn.call();//this-&gt;window
fn.call(null);//this-&gt;window
fn.call(undefined);//this-&gt;window" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-comment">//&#x5728;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;</span>
var obj={name:<span class="hljs-string">&quot;&#x6D6A;&#x91CC;&#x884C;&#x821F; &quot;</span>};
function <span class="hljs-function"><span class="hljs-keyword">fn</span><span class="hljs-params">(num1,num2)</span>{
console.<span class="hljs-built_in">log</span><span class="hljs-params">(num1+num2)</span></span>;
console.<span class="hljs-built_in">log</span>(this);
}
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(<span class="hljs-number">100</span>,<span class="hljs-number">200</span>)</span></span>;<span class="hljs-comment">//this-&gt;100 num1=200 num2=undefined</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(obj,<span class="hljs-number">100</span>,<span class="hljs-number">200</span>)</span></span>;<span class="hljs-comment">//this-&gt;obj num1=100 num2=200</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">()</span></span>;<span class="hljs-comment">//this-&gt;window</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(<span class="hljs-built_in">null</span>)</span></span>;<span class="hljs-comment">//this-&gt;window</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(undefined)</span></span>;<span class="hljs-comment">//this-&gt;window</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B; 
fn.call();//&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;this-&gt;undefined
fn.call(null);// &#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F; &#x4E0B;this-&gt;null
fn.call(undefined);//&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;this-&gt;undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-comment">//&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B; </span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">()</span></span>;<span class="hljs-comment">//&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;this-&gt;undefined</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(<span class="hljs-built_in">null</span>)</span></span>;<span class="hljs-comment">// &#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F; &#x4E0B;this-&gt;null</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(undefined)</span></span>;<span class="hljs-comment">//&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;this-&gt;undefined</span></code></pre><ul><li>**apply&#x548C;call&#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x90FD;&#x662F;&#x7528;&#x6765;&#x6539;&#x53D8;&#x65B9;&#x6CD5;&#x7684;this&#x5173;&#x952E;&#x5B57;&#x5E76;&#x4E14;&#x628A;&#x65B9;&#x6CD5;</li></ul><p>&#x6267;&#x884C;&#xFF0C;&#x800C;&#x4E14;&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x548C;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;null/undefined&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x89C4;<br>&#x5F8B;&#x4E5F;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;**</p><p>&#x4E24;&#x8005;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#xFF1A;call&#x5728;&#x7ED9;fn&#x4F20;&#x9012;&#x53C2;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x4E2A;&#x7684;&#x4F20;&#x9012;&#x503C;&#x7684;&#xFF0C;&#x800C;apply&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x4E2A;&#x4F20;&#xFF0C;&#x800C;&#x662F;&#x628A;&#x8981;&#x7ED9;fn&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;&#x503C;&#x7EDF;&#x4E00;&#x7684;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x4F46;&#x662F;&#x4E5F;&#x76F8;&#x5F53;&#x5B50;&#x4E00;&#x4E2A;&#x4E2A;&#x7684;&#x7ED9;fn&#x7684;&#x5F62;&#x53C2;&#x8D4B;&#x503C;&#x3002;<strong>&#x603B;&#x7ED3;&#x4E00;&#x53E5;&#x8BDD;:call&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5F00;&#x59CB;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5217;&#x8868;,apply&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5F00;&#x59CB;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x6570;&#x7EC4;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn.call(obj,100,200);
fn.apply(obj,[100,200]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-keyword">call</span><span class="hljs-params">(obj,<span class="hljs-number">100</span>,<span class="hljs-number">200</span>)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">fn</span>.apply<span class="hljs-params">(obj,[<span class="hljs-number">100</span>,<span class="hljs-number">200</span>])</span></span>;</code></pre><ul><li><strong>bind&#xFF1A;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5728;IE6&#xFF5E;8&#x4E0B;&#x4E0D;&#x517C;&#x5BB9;&#xFF0C;&#x548C;call/apply&#x7C7B;&#x4F3C;&#x90FD;&#x662F;&#x7528;&#x6765;&#x6539;&#x53D8;this&#x5173;&#x952E;&#x5B57;&#x7684;</strong>&#xFF0C;&#x4F46;&#x662F;&#x548C;&#x8FD9;&#x4E24;&#x8005;&#x6709;&#x660E;&#x663E;&#x533A;&#x522B;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn.call(obj,1,2);//-&gt;&#x6539;&#x53D8;this&#x548C;&#x6267;&#x884C;fn&#x51FD;&#x6570;&#x662F;&#x4E00;&#x8D77;&#x90FD;&#x5B8C;&#x6210;&#x4E86;
fn.bind(obj,1,2);//-&gt;&#x53EA;&#x662F;&#x6539;&#x53D8;&#x4E86;fn&#x4E2D;&#x7684;this&#x4E3A;obj&#xFF0C;&#x5E76;&#x4E14;&#x7ED9;fn&#x4F20;&#x9012;&#x4E86;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x503C;1&#x3001;2&#xFF0C;
                     &#x4F46;&#x662F;&#x6B64;&#x65F6;&#x5E76;&#x6CA1;&#x6709;&#x628A;fn&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;
var tempFn=fn.bind(obj,1,2);
tempFn(); //&#x8FD9;&#x6837;&#x624D;&#x628A;fn&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code><span class="hljs-keyword">fn</span>.call(obj,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);<span class="hljs-regexp">//</span>-&gt;&#x6539;&#x53D8;this&#x548C;&#x6267;&#x884C;<span class="hljs-keyword">fn</span>&#x51FD;&#x6570;&#x662F;&#x4E00;&#x8D77;&#x90FD;&#x5B8C;&#x6210;&#x4E86;
<span class="hljs-keyword">fn</span>.bind(obj,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);<span class="hljs-regexp">//</span>-&gt;&#x53EA;&#x662F;&#x6539;&#x53D8;&#x4E86;<span class="hljs-keyword">fn</span>&#x4E2D;&#x7684;this&#x4E3A;obj&#xFF0C;&#x5E76;&#x4E14;&#x7ED9;<span class="hljs-keyword">fn</span>&#x4F20;&#x9012;&#x4E86;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x503C;<span class="hljs-number">1</span>&#x3001;<span class="hljs-number">2</span>&#xFF0C;
                     &#x4F46;&#x662F;&#x6B64;&#x65F6;&#x5E76;&#x6CA1;&#x6709;&#x628A;<span class="hljs-keyword">fn</span>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;
var tempFn=<span class="hljs-keyword">fn</span>.bind(obj,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);
tempFn(); <span class="hljs-regexp">//</span>&#x8FD9;&#x6837;&#x624D;&#x628A;<span class="hljs-keyword">fn</span>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6267;&#x884C;</code></pre><p><strong>bind&#x4F53;&#x73B0;&#x4E86;&#x9884;&#x5904;&#x7406;&#x601D;&#x60F3;&#xFF1A;&#x4E8B;&#x5148;&#x628A;fn&#x7684;this&#x6539;&#x53D8;&#x4E3A;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5E76;&#x4E14;&#x628A;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x503C;&#x4E5F;&#x51C6;&#x5907;&#x597D;&#xFF0C;&#x4EE5;&#x540E;&#x8981;&#x7528;&#x5230;&#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x7684;&#x6267;&#x884C;&#x5373;&#x53EF;&#x3002;</strong></p><p><strong>call&#x548C;apply&#x76F4;&#x63A5;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x800C;bind&#x9700;&#x8981;&#x518D;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var a ={
        name : &quot;Cherry&quot;,
        fn : function (a,b) {
            console.log( a + b)
        }
    }
  var b = a.fn;
  b.bind(a,1,2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> a ={
        <span class="hljs-attr">name</span> : <span class="hljs-string">&quot;Cherry&quot;</span>,
        <span class="hljs-attr">fn</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a,b</span>) </span>{
            <span class="hljs-built_in">console</span>.log( a + b)
        }
    }
  <span class="hljs-keyword">var</span> b = a.fn;
  b.bind(a,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016680889" src="https://static.alili.tech/img/remote/1460000016680889" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x6CA1;&#x6709;&#x6267;&#x884C;&#xFF0C;bind&#x8FD4;&#x56DE;&#x6539;&#x53D8;&#x4E86;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x8981;&#x624B;&#x52A8;&#x53BB;&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" b.bind(a,1,2)() //3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial"> <span class="hljs-selector-tag">b</span>.bind(<span class="hljs-selector-tag">a</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)() <span class="hljs-comment">//3</span></code></pre><p><strong>&#x5FC5;&#x987B;&#x8981;&#x58F0;&#x660E;&#x4E00;&#x70B9;&#xFF1A;&#x9047;&#x5230;&#x7B2C;&#x4E94;&#x79CD;&#x60C5;&#x51B5;&#xFF08;call apply&#x548C;bind),&#x524D;&#x9762;&#x56DB;&#x79CD;&#x5168;&#x90E8;&#x8BA9;&#x6B65;&#x3002;</strong></p><h2 id="articleHeader3">&#x56DB;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;this&#x6307;&#x5411;</h2><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6B63;&#x5982;&#x540D;&#x79F0;&#x6240;&#x793A;&#x90A3;&#x6837;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x201C;&#x7BAD;&#x5934;&#x201D;(=&gt;)&#x6765;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684;&#x65B0;&#x8BED;&#x6CD5;&#xFF0C;&#x4F46;&#x5B83;&#x4F18;&#x4E8E;&#x4F20;&#x7EDF;&#x7684;&#x51FD;&#x6570;,&#x4E3B;&#x8981;&#x4F53;&#x73B0;&#x4E24;&#x70B9;&#xFF1A;<strong>&#x66F4;&#x7B80;&#x77ED;&#x7684;&#x51FD;&#x6570;&#x5E76;&#x4E14;&#x4E0D;&#x7ED1;&#x5B9A;this</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this&#x6307;&#x5411;window&#x6216;undefined
        };
        return fn();
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">birth</span>: <span class="hljs-number">1990</span>,
    <span class="hljs-attr">getAge</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> b = <span class="hljs-keyword">this</span>.birth; <span class="hljs-comment">// 1990</span>
        <span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getFullYear() - <span class="hljs-keyword">this</span>.birth; <span class="hljs-comment">// this&#x6307;&#x5411;window&#x6216;undefined</span>
        };
        <span class="hljs-keyword">return</span> fn();
    }
};</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5B8C;&#x5168;&#x4FEE;&#x590D;&#x4E86;this&#x7684;&#x6307;&#x5411;&#xFF0C;<strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684;this&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x4E0D;&#x662F;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x51B3;&#x5B9A;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x5B9A;&#x4E49;&#x7684;&#x65F6;&#x5019;&#x5904;&#x5728;&#x7684;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x5B83;&#x7684;this</strong>&#x3002;</p><p>&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;<strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x770B;&#x5916;&#x5C42;&#x7684;&#x662F;&#x5426;&#x6709;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x5916;&#x5C42;&#x51FD;&#x6570;&#x7684;this&#x5C31;&#x662F;&#x5185;&#x90E8;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#xFF0C;&#x5219;this&#x662F;window</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button id=&quot;btn1&quot;&gt;&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_1&lt;/button&gt;
    &lt;button id=&quot;btn2&quot;&gt;&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_2&lt;/button&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;   
        let btn1 = document.getElementById(&apos;btn1&apos;);
        let obj = {
            name: &apos;kobe&apos;,
            age: 39,
            getName: function () {
                btn1.onclick = () =&gt; {
                    console.log(this);//obj
                };
            }
        };
        obj.getName();
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn1&quot;</span>&gt;</span>&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn2&quot;</span>&gt;</span>&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_2<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">   
        <span class="hljs-keyword">let</span> btn1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;btn1&apos;</span>);
        <span class="hljs-keyword">let</span> obj = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;kobe&apos;</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">39</span>,
            <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                btn1.onclick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//obj</span>
                };
            }
        };
        obj.getName();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016680890" src="https://static.alili.tech/img/remote/1460000016680890" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x4F8B;&#x4E2D;&#xFF0C;&#x7531;&#x4E8E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0D;&#x4F1A;&#x521B;&#x5EFA;&#x81EA;&#x5DF1;&#x7684;this,&#x5B83;&#x53EA;&#x4F1A;&#x4ECE;&#x81EA;&#x5DF1;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x7684;&#x4E0A;&#x4E00;&#x5C42;&#x7EE7;&#x627F;this&#x3002;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x4E3A;&#x5982;&#x4E0B;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   let btn1 = document.getElementById(&apos;btn1&apos;);
        let obj = {
            name: &apos;kobe&apos;,
            age: 39,
            getName: function () {
                console.log(this)
            }
        };
   obj.getName();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   <span class="hljs-keyword">let</span> btn1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;btn1&apos;</span>);
        <span class="hljs-keyword">let</span> obj = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;kobe&apos;</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">39</span>,
            <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
            }
        };
   obj.getName();</code></pre><p>&#x90A3;&#x5047;&#x5982;&#x4E0A;&#x4E00;&#x5C42;&#x5E76;&#x4E0D;&#x5B58;&#x5728;&#x51FD;&#x6570;&#xFF0C;this&#x6307;&#x5411;&#x53C8;&#x662F;&#x8C01;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;button id=&quot;btn1&quot;&gt;&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_1&lt;/button&gt;
    &lt;button id=&quot;btn2&quot;&gt;&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_2&lt;/button&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;   
        let btn2 = document.getElementById(&apos;btn2&apos;);
        let obj = {
            name: &apos;kobe&apos;,
            age: 39,
            getName: () =&gt; {
                btn2.onclick = () =&gt; {
                    console.log(this);//window
                };
            }
        };
        obj.getName();
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn1&quot;</span>&gt;</span>&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn2&quot;</span>&gt;</span>&#x6D4B;&#x8BD5;&#x7BAD;&#x5934;&#x51FD;&#x6570;this_2<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">   
        <span class="hljs-keyword">let</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;btn2&apos;</span>);
        <span class="hljs-keyword">let</span> obj = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;kobe&apos;</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">39</span>,
            <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                btn2.onclick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//window</span>
                };
            }
        };
        obj.getName();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016680891" src="https://static.alili.tech/img/remote/1460000016680891" alt="" title="" style="cursor:pointer"></span></p><p>&#x4E0A;&#x4F8B;&#x4E2D;&#xFF0C;&#x867D;&#x7136;&#x5B58;&#x5728;&#x4E24;&#x4E2A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x5B9E;this&#x53D6;&#x51B3;&#x4E8E;&#x6700;&#x5916;&#x5C42;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;,&#x7531;&#x4E8E;obj&#x662F;&#x4E2A;&#x5BF9;&#x8C61;&#x800C;&#x975E;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;this&#x6307;&#x5411;&#x4E3A;Window&#x5BF9;&#x8C61;</p><p>&#x7531;&#x4E8E;this&#x5728;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x5DF2;&#x7ECF;&#x6309;&#x7167;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#x7ED1;&#x5B9A;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;<strong>&#x7528;call()&#x6216;&#x8005;apply()&#x8C03;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5BF9;this&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#xFF0C;&#x5373;&#x4F20;&#x5165;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x88AB;&#x5FFD;&#x7565;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) =&gt; y - this.birth; // this.birth&#x4ECD;&#x662F;1990
        return fn.call({birth:2000}, year);
    }
};
obj.getAge(2018); // 28" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">birth</span>: <span class="hljs-number">1990</span>,
    <span class="hljs-attr">getAge</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">year</span>) </span>{
        <span class="hljs-keyword">var</span> b = <span class="hljs-keyword">this</span>.birth; <span class="hljs-comment">// 1990</span>
        <span class="hljs-keyword">var</span> fn = <span class="hljs-function">(<span class="hljs-params">y</span>) =&gt;</span> y - <span class="hljs-keyword">this</span>.birth; <span class="hljs-comment">// this.birth&#x4ECD;&#x662F;1990</span>
        <span class="hljs-keyword">return</span> fn.call({<span class="hljs-attr">birth</span>:<span class="hljs-number">2000</span>}, year);
    }
};
obj.getAge(<span class="hljs-number">2018</span>); <span class="hljs-comment">// 28</span></code></pre><p><strong>&#x6587;&#x7AE0;&#x4E8E;2018.9.25&#x91CD;&#x65B0;&#x4FEE;&#x6539;,&#x5982;&#x679C;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;GitHub&#x535A;&#x5BA2;</a>&#x70B9;&#x8D5E;&#x548C;&#x5173;&#x6CE8;&#xFF0C;&#x611F;&#x6FC0;&#x4E0D;&#x5C3D;&#xFF01;</strong></p><h2 id="articleHeader4">&#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><h3 id="articleHeader5"><a href="https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001438565969057627e5435793645b7acaee3b6869d1374000" rel="nofollow noreferrer" target="_blank">&#x5ED6;&#x96EA;&#x5CF0;&#x7684;&#x5B98;&#x65B9;&#x7F51;&#x7AD9;</a></h3><h3 id="articleHeader6"><a href="https://juejin.im/post/5aa1eb056fb9a028b77a66fd" rel="nofollow noreferrer" target="_blank">JS&#x4E2D;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0E;this</a></h3><h3 id="articleHeader7"><a href="https://juejin.im/post/59bfe84351882531b730bac2" rel="nofollow noreferrer" target="_blank">this&#x3001;apply&#x3001;call&#x3001;bind</a></h3>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你还没搞懂this？

## 原文链接
[https://segmentfault.com/a/1190000016680885](https://segmentfault.com/a/1190000016680885)

