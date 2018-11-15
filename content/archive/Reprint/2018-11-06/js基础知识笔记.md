---
title: js基础知识笔记
hidden: true
categories: reprint
slug: 27b392b3
date: 2018-11-06 02:30:12
---

{{< raw >}}
<ol><li><p><code>&lt;script&gt;</code><br><code>defer</code> &#x811A;&#x672C;&#x5EF6;&#x8FDF;&#x6267;&#x884C;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x5916;&#x90E8;&#x811A;&#x672C;&#x6587;&#x4EF6;<br><code>async</code> &#x7ACB;&#x5373;&#x4E0B;&#x8F7D;&#xFF0C;&#x4E0D;&#x4FDD;&#x8BC1;&#x987A;&#x5E8F;&#xFF08;&#x5EFA;&#x8BAE;&#x4E0D;&#x4FEE;&#x6539;DOM&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x7ED8;&#xFF09;<br>CDN&#x52A0;&#x901F; (Content Delivery Network&#xFF0C;&#x5185;&#x5BB9;&#x5206;&#x53D1;&#x7F51;&#x7EDC;) &#x63D0;&#x9AD8;&#x8BBF;&#x95EE;&#x7F51;&#x7AD9;&#x7684;&#x54CD;&#x5E94;&#x901F;&#x5EA6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
&#x3000;function loadScript(){
    document.write(unescape(&quot;%3Cscript src=&apos;&#x9632;&#x9519;&#x6587;&#x4EF6;&apos; %3E%3C/script%3E&quot;))
  }
&lt;/script&gt;
&lt;script src=&quot;cdn&#x6587;&#x4EF6;&quot; onerror=&quot;loadScript()&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
&#x3000;<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadScript</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">unescape</span>(<span class="hljs-string">&quot;%3Cscript src=&apos;&#x9632;&#x9519;&#x6587;&#x4EF6;&apos; %3E%3C/script%3E&quot;</span>))
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;cdn&#x6587;&#x4EF6;&quot;</span> <span class="hljs-attr">onerror</span>=<span class="hljs-string">&quot;loadScript()&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre></li><li>&#x5185;&#x5B58;<br>js&#x5185;&#x5B58;&#x56DE;&#x6536;&#x673A;&#x5236;&#xFF1A;&#x89E3;&#x9664;&#x5F15;&#x7528;<br>&#x5185;&#x5B58;&#x6EA2;&#x51FA;&#xFF1A;&#x5185;&#x5B58;&#x4E0D;&#x591F;&#xFF0C;&#x7CFB;&#x7EDF;&#x4F1A;&#x63D0;&#x793A;&#x5185;&#x5B58;&#x6EA2;&#x51FA;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x4F1A;&#x81EA;&#x52A8;&#x5173;&#x95ED;&#x8F6F;&#x4EF6;<br><strong>&#x5185;&#x5B58;&#x6CC4;&#x6F0F;</strong>&#xFF1A;&#x672A;&#x80FD;&#x91CA;&#x653E;&#x5DF2;&#x7ECF;&#x4E0D;&#x518D;&#x4F7F;&#x7528;&#x7684;&#x5185;&#x5B58;&#xFF0C;&#x4E0D;&#x662F;&#x6307;&#x5185;&#x5B58;&#x5728;&#x7269;&#x7406;&#x4E0A;&#x7684;&#x6D88;&#x5931;&#xFF0C;&#x800C;&#x662F;<strong>&#x5185;&#x5B58;&#x7684;&#x6D6A;&#x8D39;</strong>&#x3002;<br>&#x5E38;&#x89C1;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x60C5;&#x5F62;&#xFF1A;1.&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x3001;2.&#x88AB;&#x5FD8;&#x8BB0;&#x7684;<code>Timers</code>&#x6216;&#x8005;<code>callbacks</code>&#x3001;3.&#x95ED;&#x5305;&#x3001;4.DOM&#x5F15;&#x7528;</li><li>&#x95ED;&#x5305;<br>&#x6982;&#x5FF5;&#xFF1A;<strong>&#x6709;&#x6743;&#x8BBF;&#x95EE;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x53D8;&#x91CF;&#x7684;&#x51FD;&#x6570;</strong>&#x3002;<br>&#x4F5C;&#x7528;&#xFF1A;&#x533F;&#x540D;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x3001;&#x7ED3;&#x679C;&#x7F13;&#x5B58;&#x3001;&#x5C01;&#x88C5;&#x3001;&#x5B9E;&#x73B0;&#x7C7B;&#x548C;&#x7EE7;&#x627F;</li><li><p>&#x51FD;&#x6570;&#x5C01;&#x88C5;&#x6A21;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF1A;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x521B;&#x5EFA;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
function createClass0(params){
  var o = new Object();
  o.name = params;
  o.fn0 = function(){
    console.log(this.name);
  }
  return o;
}

var obj = createClass0(params);
console.log(obj.constructor == createClass0); //false
console.log(obj instanceof createClass0); //false

//&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF1A;es6&#x7684;&#x7C7B;&#x4E5F;&#x662F;&#x901A;&#x8FC7;&#x8BE5;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;
function Class0(params){
  this.name = params;
  this.fn0 = fn0;
  this.fn1 = function(){
    console.log(this.name)
  }
}
function fn0(){
  console.log(this.name)
}

var obj = new Class0(params);
console.log(obj.constructor == Class0); //true
console.log(obj instanceof Class0); //true

//&#x539F;&#x578B;&#x6A21;&#x5F0F;&#xFF1A;&#x5C5E;&#x6027;&#x4E0E;&#x65B9;&#x6CD5;&#x6302;&#x5728;&#x539F;&#x578B;&#x94FE;&#x4E0A;
function Class0(){}
Class0.prototype = {
  name: params,
  fn0: function(){
    console.log(this.name)
  }
}
var obj = new Class0();
console.log(obj.constructor == Class0);//true
console.log(obj instanceof Class0); //true
Object.defineProperty(Class0.prototype,&quot;constructor&quot;,{
  enumerable: false,
  value: Class0
})
console.log(obj.constructor == Class0); //false

//&#x52A8;&#x6001;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#xFF1A;
function Class0(params){
  this.name = params;
  if(typeof this.fn0 != &quot;function&quot;){
    Class0.prototype.fn0 = function(){
      console.log(this.name)
    }
  }
}
var obj = new Class0(params);
console.log(obj.constructor == Class0); //true
console.log(obj instanceof Class0); //true

//&#x5BC4;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF1A;
function Class0(params){
  var o = new Object();
  o.name = params;
  return o;
}

var obj = new Class0(params);
console.log(obj.constructor == Class0); //false
console.log(obj instanceof Class0); //false

//&#x7A33;&#x59A5;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF1A;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x5176;&#x5C5E;&#x6027;
function Class0(params){
  var o = new Object();
  var name = params;
  o.fn0 = function(){
    console.log(name);
  }
  return o;
}

var obj = Class0(params);
console.log(obj.constructor == Class0); //false
console.log(obj instanceof Class0); //false

//&#x7EE7;&#x627F;&#xFF1A;js&#x6CA1;&#x6709;&#x501F;&#x53E3;&#x7EE7;&#x627F;&#xFF0C;&#x53EA;&#x6709;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x4F9D;&#x9760;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;
//&#x7ECF;&#x5178;&#x7EE7;&#x627F;:&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;
function Class0(params){
  this.name0 = params;
  this.fn0 = function(){
    console.log(this.name);
  }
}
function subClass0(params){
  Class0.call(this,params);  
  this.name1 = params;
  subClass0.prototype.fn1 = function(){
    console.log(this.name1);
  }
}
  
var obj = new subClass0(params);
console.log(obj.constructor == subClass0); //true
console.log(obj instanceof subClass0); //true
console.log(obj.constructor == Class0); //false
console.log(obj instanceof Class0); //false

//&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#xFF1A;es6&#x7C7B;&#x7684;&#x7EE7;&#x627F;&#x901A;&#x8FC7;&#x8BE5;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;
function Class0(params){
  this.name0 = params;
  this.fn0 = function(){
    console.log(this.name0);
  }
}
function subClass0(params){
  Class0.call(this,params);
  this.name1 = params;
  subClass0.prototype.fn1 = function(){
    console.log(this.name1);
  }
}
subClass0.prototype = new Class0();
subClass0.prototype.constructor = subClass0;

  
var obj = new subClass0(params);
console.log(obj.constructor == subClass0); //true
console.log(obj instanceof subClass0); //true
console.log(obj.constructor == Class0); //false
console.log(obj instanceof Class0); //true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF1A;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x521B;&#x5EFA;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createClass0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
  o.name = params;
  o.fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }
  <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> obj = createClass0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == createClass0); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> createClass0); <span class="hljs-comment">//false</span>

<span class="hljs-comment">//&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF1A;es6&#x7684;&#x7C7B;&#x4E5F;&#x662F;&#x901A;&#x8FC7;&#x8BE5;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">this</span>.name = params;
  <span class="hljs-keyword">this</span>.fn0 = fn0;
  <span class="hljs-keyword">this</span>.fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn0</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
}

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Class0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//true</span>

<span class="hljs-comment">//&#x539F;&#x578B;&#x6A21;&#x5F0F;&#xFF1A;&#x5C5E;&#x6027;&#x4E0E;&#x65B9;&#x6CD5;&#x6302;&#x5728;&#x539F;&#x578B;&#x94FE;&#x4E0A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params"></span>)</span>{}
Class0.prototype = {
  <span class="hljs-attr">name</span>: params,
  <span class="hljs-attr">fn0</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
}
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Class0();
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0);<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">Object</span>.defineProperty(Class0.prototype,<span class="hljs-string">&quot;constructor&quot;</span>,{
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">value</span>: Class0
})
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//false</span>

<span class="hljs-comment">//&#x52A8;&#x6001;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#xFF1A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">this</span>.name = params;
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.fn0 != <span class="hljs-string">&quot;function&quot;</span>){
    Class0.prototype.fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
  }
}
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Class0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//true</span>

<span class="hljs-comment">//&#x5BC4;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF1A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
  o.name = params;
  <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Class0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//false</span>

<span class="hljs-comment">//&#x7A33;&#x59A5;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF1A;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x5176;&#x5C5E;&#x6027;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
  <span class="hljs-keyword">var</span> name = params;
  o.fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(name);
  }
  <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> obj = Class0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//false</span>

<span class="hljs-comment">//&#x7EE7;&#x627F;&#xFF1A;js&#x6CA1;&#x6709;&#x501F;&#x53E3;&#x7EE7;&#x627F;&#xFF0C;&#x53EA;&#x6709;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x4F9D;&#x9760;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;</span>
<span class="hljs-comment">//&#x7ECF;&#x5178;&#x7EE7;&#x627F;:&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">this</span>.name0 = params;
  <span class="hljs-keyword">this</span>.fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subClass0</span>(<span class="hljs-params">params</span>)</span>{
  Class0.call(<span class="hljs-keyword">this</span>,params);  
  <span class="hljs-keyword">this</span>.name1 = params;
  subClass0.prototype.fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name1);
  }
}
  
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> subClass0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == subClass0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> subClass0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//false</span>

<span class="hljs-comment">//&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#xFF1A;es6&#x7C7B;&#x7684;&#x7EE7;&#x627F;&#x901A;&#x8FC7;&#x8BE5;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class0</span>(<span class="hljs-params">params</span>)</span>{
  <span class="hljs-keyword">this</span>.name0 = params;
  <span class="hljs-keyword">this</span>.fn0 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name0);
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subClass0</span>(<span class="hljs-params">params</span>)</span>{
  Class0.call(<span class="hljs-keyword">this</span>,params);
  <span class="hljs-keyword">this</span>.name1 = params;
  subClass0.prototype.fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name1);
  }
}
subClass0.prototype = <span class="hljs-keyword">new</span> Class0();
subClass0.prototype.constructor = subClass0;

  
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> subClass0(params);
<span class="hljs-built_in">console</span>.log(obj.constructor == subClass0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> subClass0); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(obj.constructor == Class0); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(obj <span class="hljs-keyword">instanceof</span> Class0); <span class="hljs-comment">//true</span></code></pre></li><li>BOM<br>&#x6982;&#x5FF5;&#xFF1A;<strong>&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x8C61;&#x6A21;&#x578B;</strong><br>&#x6838;&#x5FC3;&#x5BF9;&#x8C61;&#xFF1A;<code>window</code>&#xFF0C;&#x901A;&#x8FC7;js&#x8BBF;&#x95EE;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#xFF0C;&#x4E5F;&#x662F;<code>ECMAScript</code>&#x89C4;&#x5B9A;&#x7684;<code>Global</code>&#x5BF9;&#x8C61;&#x3002;<br>&#x7A97;&#x53E3;&#x6846;&#x67B6;&#xFF1A;<code>frame</code>&#x3001;<code>iframe</code><br>&#x7A97;&#x53E3;&#x4F4D;&#x7F6E;&#xFF1A;<code>window.screenLeft/window.screenX&#xFF0C;window.moveBy(x,y); window.moveTo(x,y);</code><br>&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#xFF1A;<code>window.resizeTo(width,height); window.resizeBy(dWidth,dHeight);</code><br>&#x5BFC;&#x822A;&#x5F39;&#x7A97;&#xFF1A;<code>let win = window.open(&quot;...&quot;); win.close();</code></li><li><code>location</code><br><code>hash</code>&#xFF1A;<code>URL</code>&#x7684;<code>hash</code>&#x5B57;&#x7B26;&#x4E32;<br><code>host</code>&#xFF1A;&#x670D;&#x52A1;&#x5668;&#x540D;&#x79F0;&#x548C;&#x7AEF;&#x53E3;&#x53F7;<br><code>hostname</code>&#xFF1A;&#x670D;&#x52A1;&#x5668;&#x540D;&#x79F0;<br><code>href</code>&#xFF1A;&#x5F53;&#x524D;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#x7684;&#x5B8C;&#x6574;<code>URL</code><br><code>pathname</code>&#xFF1A;<code>URL</code>&#x4E2D;&#x7684;&#x76EE;&#x5F55;<br><code>port</code>&#xFF1A;<code>URL</code>&#x4E2D;&#x5236;&#x5B9A;&#x7684;&#x7AEF;&#x53E3;&#x53F7;<br><code>prptocol</code>&#xFF1A;&#x9875;&#x9762;&#x4F7F;&#x7528;&#x7684;&#x534F;&#x8BAE;<br><code>search</code>&#xFF1A;<code>URL</code>&#x7684;&#x67E5;&#x8BE2;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4EE5;<code>?</code>&#x5F00;&#x5934;<br>&#x6539;&#x53D8;<code>URL</code>&#x4F1A;&#x751F;&#x6210;&#x65B0;&#x8BB0;&#x5F55;&#xFF0C;&#x7981;&#x7528;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x8DF3;&#x8F6C;&#x53EF;&#x901A;&#x8FC7;<code>location.replace(&quot;...&quot;)</code>&#x5B9E;&#x73B0;<br>&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF1A;<code>location.reload();</code> <code>location.reload(true);</code></li><li><p><code>navigator</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x79BB;&#x7EBF;&#x68C0;&#x6D4B;&#xFF1A;onLine
&#x5730;&#x7406;&#x4FE1;&#x606F;&#xFF1A;geolocation
navigator.geolocation.getCurrentPosition((position)=&gt;{
  //&#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;
},(error)=&gt;{
  //&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;
},{
  enableHighAccuracy: true, //&#x5C3D;&#x53EF;&#x80FD;&#x4F7F;&#x7528;&#x6700;&#x51C6;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#x4FE1;&#x606F;
  timeout: 5000,  //&#x7B49;&#x5F85;&#x4F4D;&#x7F6E;&#x4FE1;&#x606F;&#x7684;&#x6700;&#x957F;&#x65F6;&#x95F4;
  maximumAge: 25000 //&#x4E0A;&#x4E00;&#x6B21;&#x53D6;&#x5F97;&#x5750;&#x6807;&#x4FE1;&#x606F;&#x7684;&#x6709;&#x6548;&#x65F6;&#x95F4;&#xFF0C;&#x65F6;&#x95F4;&#x5230;&#x5219;&#x91CD;&#x65B0;&#x83B7;&#x53D6;
});

//&#x8DDF;&#x8E2A;&#x76D1;&#x63A7;
let watchId = navigator.geolocation.watchPosition(position)=&gt;{
  //&#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;
},(error)=&gt;{
  //&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;
});

clearWatch(watchId); //&#x5173;&#x95ED;&#x8DDF;&#x8E2A;

&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5B89;&#x88C5;&#x7684;&#x63D2;&#x4EF6;&#x4FE1;&#x606F;&#xFF1A;plugins
//IE&#x6D4F;&#x89C8;&#x5668;&#x65E0;&#x6548;
function hasPlugin(name){
  return Array.from(navigator.plugins).some(item =&gt; item.name.toLowerCase().includes(name.toLowerCase()) )
}
hasPlugin(&quot;Flash&quot;);
//IE&#x6D4F;&#x89C8;&#x5668;
function hasIEPlugin(name){
  try{
    new ActiveXObject(name);
    return true;
  }catch(ex){
    return false;
  }
}
hasIEPlugin(&quot;ShockwaveFlash.ShockwaveFlash&quot;);

cookie&#x662F;&#x5426;&#x542F;&#x7528;&#xFF1A;cookieEnabled
&#x6D4F;&#x89C8;&#x5668;&#x6240;&#x5728;&#x7684;&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;&#xFF1A;platform
&#x7528;&#x6237;&#x4EE3;&#x7406;&#xFF1A;userAgent&#xFF08;&#x53EF;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x5F15;&#x64CE;&#x3001;&#x7248;&#x672C;&#x3001;&#x7EC8;&#x7AEF;&#x7B49;&#xFF09;

//&#x7B80;&#x6613;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;&#x5224;&#x65AD;
function browserType(){ //&#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;
  let userAgent = navigator.userAgent;
  let type;
  switch(userAgent){
    case userAgent.includes(&quot;MSIE&quot;):
      type = &quot;IE&quot;;
      break;
    case userAgent.includes(&quot;Firefox&quot;):
      type = &quot;Firefox&quot;;
      break;
    case userAgent.includes(&quot;Chrome&quot;):
      type = &quot;Chrome&quot;;
      break;
    case userAgent.includes(&quot;Opera&quot;):
      type = &quot;Opera&quot;;
      break;
    case userAgent.includes(&quot;Safari&quot;):
      type = &quot;Safari&quot;;
      break;
    case userAgent.includes(&quot;Netscape&quot;):
      type = &quot;Netscape&quot;;
      break;
    default:
      console.log(userAgent);
      break;
  }
  return type;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>&#x79BB;&#x7EBF;&#x68C0;&#x6D4B;&#xFF1A;onLine
&#x5730;&#x7406;&#x4FE1;&#x606F;&#xFF1A;geolocation
navigator.geolocation.getCurrentPosition(<span class="hljs-function">(<span class="hljs-params">position</span>)=&gt;</span>{
  <span class="hljs-comment">//&#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;</span>
},<span class="hljs-function">(<span class="hljs-params">error</span>)=&gt;</span>{
  <span class="hljs-comment">//&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;</span>
},{
  enableHighAccuracy: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x5C3D;&#x53EF;&#x80FD;&#x4F7F;&#x7528;&#x6700;&#x51C6;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#x4FE1;&#x606F;</span>
  timeout: <span class="hljs-number">5000</span>,  <span class="hljs-comment">//&#x7B49;&#x5F85;&#x4F4D;&#x7F6E;&#x4FE1;&#x606F;&#x7684;&#x6700;&#x957F;&#x65F6;&#x95F4;</span>
  maximumAge: <span class="hljs-number">25000</span> <span class="hljs-comment">//&#x4E0A;&#x4E00;&#x6B21;&#x53D6;&#x5F97;&#x5750;&#x6807;&#x4FE1;&#x606F;&#x7684;&#x6709;&#x6548;&#x65F6;&#x95F4;&#xFF0C;&#x65F6;&#x95F4;&#x5230;&#x5219;&#x91CD;&#x65B0;&#x83B7;&#x53D6;</span>
});

<span class="hljs-comment">//&#x8DDF;&#x8E2A;&#x76D1;&#x63A7;</span>
<span class="hljs-keyword">let</span> watchId = navigator.geolocation.watchPosition(position)=&gt;{
  <span class="hljs-comment">//&#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;</span>
},<span class="hljs-function">(<span class="hljs-params">error</span>)=&gt;</span>{
  <span class="hljs-comment">//&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;</span>
});

clearWatch(watchId); <span class="hljs-comment">//&#x5173;&#x95ED;&#x8DDF;&#x8E2A;</span>

&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5B89;&#x88C5;&#x7684;&#x63D2;&#x4EF6;&#x4FE1;&#x606F;&#xFF1A;plugins
<span class="hljs-comment">//IE&#x6D4F;&#x89C8;&#x5668;&#x65E0;&#x6548;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasPlugin</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(navigator.plugins).some(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.name.toLowerCase().includes(name.toLowerCase()) )
}
hasPlugin(<span class="hljs-string">&quot;Flash&quot;</span>);
<span class="hljs-comment">//IE&#x6D4F;&#x89C8;&#x5668;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasIEPlugin</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">try</span>{
    <span class="hljs-keyword">new</span> ActiveXObject(name);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }<span class="hljs-keyword">catch</span>(ex){
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}
hasIEPlugin(<span class="hljs-string">&quot;ShockwaveFlash.ShockwaveFlash&quot;</span>);

cookie&#x662F;&#x5426;&#x542F;&#x7528;&#xFF1A;cookieEnabled
&#x6D4F;&#x89C8;&#x5668;&#x6240;&#x5728;&#x7684;&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;&#xFF1A;platform
&#x7528;&#x6237;&#x4EE3;&#x7406;&#xFF1A;userAgent&#xFF08;&#x53EF;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x5F15;&#x64CE;&#x3001;&#x7248;&#x672C;&#x3001;&#x7EC8;&#x7AEF;&#x7B49;&#xFF09;

<span class="hljs-comment">//&#x7B80;&#x6613;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;&#x5224;&#x65AD;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">browserType</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//&#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x7C7B;&#x578B;</span>
  <span class="hljs-keyword">let</span> userAgent = navigator.userAgent;
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">type</span>;
  <span class="hljs-keyword">switch</span>(userAgent){
    <span class="hljs-keyword">case</span> userAgent.includes(<span class="hljs-string">&quot;MSIE&quot;</span>):
      <span class="hljs-keyword">type</span> = <span class="hljs-string">&quot;IE&quot;</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> userAgent.includes(<span class="hljs-string">&quot;Firefox&quot;</span>):
      <span class="hljs-keyword">type</span> = <span class="hljs-string">&quot;Firefox&quot;</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> userAgent.includes(<span class="hljs-string">&quot;Chrome&quot;</span>):
      <span class="hljs-keyword">type</span> = <span class="hljs-string">&quot;Chrome&quot;</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> userAgent.includes(<span class="hljs-string">&quot;Opera&quot;</span>):
      <span class="hljs-keyword">type</span> = <span class="hljs-string">&quot;Opera&quot;</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> userAgent.includes(<span class="hljs-string">&quot;Safari&quot;</span>):
      <span class="hljs-keyword">type</span> = <span class="hljs-string">&quot;Safari&quot;</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> userAgent.includes(<span class="hljs-string">&quot;Netscape&quot;</span>):
      <span class="hljs-keyword">type</span> = <span class="hljs-string">&quot;Netscape&quot;</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
      <span class="hljs-built_in">console</span>.log(userAgent);
      <span class="hljs-keyword">break</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">type</span>;
}</code></pre></li><li><code>history</code><br>&#x9875;&#x9762;&#x524D;&#x8FDB;&#xFF1A;<code>history.forward(); history.go(1);</code><br>&#x9875;&#x9762;&#x540E;&#x9000;&#xFF1A;<code>history.back(); history.go(-1);</code><br>&#x8DF3;&#x8F6C;&#x81F3;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x7684;&#x6700;&#x8FD1;&#x67D0;&#x4E2A;&#x9875;&#x9762;(&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x505A;)&#xFF1A;<code>history.go(&quot;...&quot;);</code><br>&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x6570;&#x91CF;&#xFF1A;<code>history.length</code>(<code>hash</code>&#x6539;&#x53D8;&#x4F1A;&#x4F7F;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x589E;&#x52A0;)</li><li><p>&#x7CFB;&#x7EDF;&#x5BF9;&#x8BDD;&#x6846;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(val);&#x3000;//&#x8B66;&#x544A;&#x7A97;
confirm(val); //&#x786E;&#x8BA4;&#x7A97;&#xFF0C;&#x9009;&#x62E9;OK,&#x5219;&#x8FD4;&#x56DE;true
prompt(val,&quot;&quot;); //&#x8F93;&#x5165;&#x7A97;&#xFF0C;&#x9009;&#x62E9;OK,&#x5219;&#x8FD4;&#x56DE;&#x8F93;&#x5165;&#x6846;&#x5185;&#x5BB9;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;null" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fsharp"><code>alert(<span class="hljs-keyword">val</span>);&#x3000;<span class="hljs-comment">//&#x8B66;&#x544A;&#x7A97;</span>
confirm(<span class="hljs-keyword">val</span>); <span class="hljs-comment">//&#x786E;&#x8BA4;&#x7A97;&#xFF0C;&#x9009;&#x62E9;OK,&#x5219;&#x8FD4;&#x56DE;true</span>
prompt(<span class="hljs-keyword">val</span>,<span class="hljs-string">&quot;&quot;</span>); <span class="hljs-comment">//&#x8F93;&#x5165;&#x7A97;&#xFF0C;&#x9009;&#x62E9;OK,&#x5219;&#x8FD4;&#x56DE;&#x8F93;&#x5165;&#x6846;&#x5185;&#x5BB9;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;null</span></code></pre></li><li><p>&#x6570;&#x636E;&#x5B58;&#x50A8;<br><code>cookie</code>&#xFF1A;&#x4FE1;&#x606F;&#x8D8A;&#x5927;&#xFF0C;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x8BF7;&#x6C42;&#x65F6;&#x95F4;&#x8D8A;&#x957F;&#xFF0C;&#x6545;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x5176;&#x5927;&#x5C0F;&#x6709;&#x9650;&#x5236;&#xFF0C;&#x603B;&#x91CF;&#x4E0D;&#x5230;4K</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x521B;&#x5EFA;cookie
function setCookie(name, value, expires, path, domain, secure) {
  var cookieText = encodeURIComponent(name) + &apos;=&apos; + encodeURIComponent(value);//&#x9632;&#x6B62;&#x4E2D;&#x6587;&#x4E71;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x7F16;&#x7801;
  (expires instanceof Date) &amp;&amp; (cookieText += &apos;; expires=&apos; + expires); //&#x6709;&#x6548;&#x671F;
  path &amp;&amp; (cookieText += &apos;; path=&apos; + path); //&#x8BBE;&#x7F6E;&#x57DF;&#x7684;&#x8DEF;&#x5F84;
  domain &amp;&amp; (cookieText += &apos;; domain=&apos; + domain); //&#x8BBE;&#x7F6E;&#x54EA;&#x4E2A;&#x57DF;&#x7684;&#x8BF7;&#x6C42;&#x4E2D;&#x90FD;&#x4F1A;&#x5305;&#x542B;&#x8BE5;cookie&#x4FE1;&#x606F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x8BBE;&#x7F6E;cookie&#x7684;&#x57DF;
  secure &amp;&amp; (cookieText += &apos;; secure&apos;); //&#x53EA;&#x6709;&#x5728;&#x4F7F;&#x7528;SSL&#x8FDE;&#x63A5;&#x7684;&#x65F6;&#x5019;&#x624D;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;
  document.cookie = cookieText;
}

//&#x83B7;&#x53D6;cookie
function getCookie(name) {
  var cookieName = encodeURIComponent(name) + &apos;=&apos;;
  var cookieStart = document.cookie.indexOf(cookieName);
  var cookieValue = null;
  if (cookieStart &gt; -1) {
    var cookieEnd = document.cookie.indexOf(&apos;;&apos;, cookieStart);
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length;
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
  }
  return cookieValue;
}

//&#x5220;&#x9664;cookie
function unsetCookie(name) {
  document.cookie = name + &quot;= ; expires=&quot; + new Date(0);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x521B;&#x5EFA;cookie</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span>(<span class="hljs-params">name, value, expires, path, domain, secure</span>) </span>{
  <span class="hljs-keyword">var</span> cookieText = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(value);<span class="hljs-comment">//&#x9632;&#x6B62;&#x4E2D;&#x6587;&#x4E71;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x7F16;&#x7801;</span>
  (expires <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) &amp;&amp; (cookieText += <span class="hljs-string">&apos;; expires=&apos;</span> + expires); <span class="hljs-comment">//&#x6709;&#x6548;&#x671F;</span>
  path &amp;&amp; (cookieText += <span class="hljs-string">&apos;; path=&apos;</span> + path); <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x57DF;&#x7684;&#x8DEF;&#x5F84;</span>
  domain &amp;&amp; (cookieText += <span class="hljs-string">&apos;; domain=&apos;</span> + domain); <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x54EA;&#x4E2A;&#x57DF;&#x7684;&#x8BF7;&#x6C42;&#x4E2D;&#x90FD;&#x4F1A;&#x5305;&#x542B;&#x8BE5;cookie&#x4FE1;&#x606F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&#x8BBE;&#x7F6E;cookie&#x7684;&#x57DF;</span>
  secure &amp;&amp; (cookieText += <span class="hljs-string">&apos;; secure&apos;</span>); <span class="hljs-comment">//&#x53EA;&#x6709;&#x5728;&#x4F7F;&#x7528;SSL&#x8FDE;&#x63A5;&#x7684;&#x65F6;&#x5019;&#x624D;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;</span>
  <span class="hljs-built_in">document</span>.cookie = cookieText;
}

<span class="hljs-comment">//&#x83B7;&#x53D6;cookie</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> cookieName = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&apos;=&apos;</span>;
  <span class="hljs-keyword">var</span> cookieStart = <span class="hljs-built_in">document</span>.cookie.indexOf(cookieName);
  <span class="hljs-keyword">var</span> cookieValue = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">if</span> (cookieStart &gt; <span class="hljs-number">-1</span>) {
    <span class="hljs-keyword">var</span> cookieEnd = <span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">&apos;;&apos;</span>, cookieStart);
    <span class="hljs-keyword">if</span> (cookieEnd == <span class="hljs-number">-1</span>) {
      cookieEnd = <span class="hljs-built_in">document</span>.cookie.length;
    }
    cookieValue = <span class="hljs-built_in">decodeURIComponent</span>(<span class="hljs-built_in">document</span>.cookie.substring(cookieStart + cookieName.length, cookieEnd));
  }
  <span class="hljs-keyword">return</span> cookieValue;
}

<span class="hljs-comment">//&#x5220;&#x9664;cookie</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsetCookie</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">&quot;= ; expires=&quot;</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>);
}</code></pre><p><code>localStorage</code>&#xFF1A;&#x672C;&#x5730;&#x5B58;&#x50A8;&#xFF0C;&#x5BB9;&#x91CF;5M&#x5DE6;&#x53F3;&#xFF0C;&#x503C;&#x7C7B;&#x578B;&#x9650;&#x5B9A;&#x4E3A;<code>string</code>&#x7C7B;&#x578B;&#xFF0C;<code>localStorage</code>&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x5BF9;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x8BFB;&#x53D6;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x50A8;&#x5185;&#x5BB9;&#x591A;&#x7684;&#x8BDD;&#x4F1A;&#x6D88;&#x8017;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x53D8;&#x5361;&#xFF0C;&#x53E6;&#x5916;&#x5728;&#x90E8;&#x5206;&#x6D4F;&#x89C8;&#x5668;&#x9690;&#x79C1;&#x6A21;&#x5F0F;&#x4E0B;&#x4E0D;&#x53EF;&#x8BFB;&#x53D6;&#x3002;<br><code>sessionStorage</code>&#xFF1A;&#x4F1A;&#x8BDD;&#x5B58;&#x50A8;(<strong>&#x5237;&#x65B0;&#x9875;&#x9762;&#x4F9D;&#x65E7;&#x5B58;&#x5728;</strong>)&#xFF0C;&#x4E0E;<code>localStorage</code>&#x5728;&#x6301;&#x4E45;&#x4E0A;&#x4E0D;&#x540C;&#x5916;&#xFF0C;&#x5176;&#x4F59;&#x4E00;&#x81F4;&#x3002;<br><code>indexedDB</code>&#xFF1A;&#x50A8;&#x5B58;&#x7A7A;&#x95F4;&#x4E0D;&#x5C11;&#x4E8E;250M&#xFF0C;&#x6CA1;&#x6709;&#x4E0A;&#x9650;&#xFF0C;&#x5F02;&#x6B65;&#x8BBE;&#x8BA1;&#xFF0C;&#x652F;&#x6301;&#x4E8C;&#x8FDB;&#x5236;&#x50A8;&#x5B58;&#xFF08;<code>ArrayBuffer</code>&#x5BF9;&#x8C61;&#x548C;<code>Blob</code>&#x5BF9;&#x8C61;&#xFF09;<br><code>localforage</code>&#xFF1A;<strong>js&#x5E93;</strong>&#xFF0C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF08;&#x81EA;&#x52A8;&#x52A0;&#x8F7D;&#x6700;&#x4F73;&#x9A71;&#x52A8;&#x7A0B;&#x5E8F;&#xFF0C;&#x4ECE;<code>IndexedDB</code>&#x5230;<code>localStorage</code>&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B58;&#x50A8;
localforage.setItem(&apos;key&apos;, &apos;value&apos;);

localforage.setItem(&apos;key&apos;, &apos;value&apos;).then(()=&gt;{
  ...
}).catch(err=&gt;{
  console.log(err);
});

localforage.setItem(&apos;key&apos;, &apos;value&apos;).then(()=&gt;{
  return localforage.getItem(&apos;key&apos;);
}).then(val=&gt;{
  console.log(val);
}).catch(err=&gt;{
  console.log(err);
});

//&#x83B7;&#x53D6;
localforage.getItem(&apos;key&apos;).then(()=&gt;{
  ...
}).catch(err=&gt;{
  console.log(err);
});

//&#x5220;&#x9664;
localforage.removeItem(&apos;key&apos;);

localforage.removeItem(&apos;key&apos;).then(()=&gt;{
  ...
}).catch(err=&gt;{
  console.log(err);
});

//&#x6E05;&#x7A7A;
localforage.clear();

localforage.clear().then(()=&gt;{
  ...
}).catch(err=&gt;{
  console.log(err);
})

//&#x904D;&#x5386;
localforage.iterate((value, key)=&gt;{
  console.log(key,value);
}).then(()=&gt;{
  ...
}).catch(err=&gt;{
  console.log(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>&#x5B58;&#x50A8;
localforage.setItem(<span class="hljs-string">&apos;key&apos;</span>, <span class="hljs-string">&apos;value&apos;</span>);

localforage.setItem(<span class="hljs-string">&apos;key&apos;</span>, <span class="hljs-string">&apos;value&apos;</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  ...
}).<span class="hljs-keyword">catch</span>(err=&gt;{
  <span class="hljs-built_in">console</span>.log(err);
});

localforage.setItem(<span class="hljs-string">&apos;key&apos;</span>, <span class="hljs-string">&apos;value&apos;</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-keyword">return</span> localforage.getItem(<span class="hljs-string">&apos;key&apos;</span>);
}).<span class="hljs-keyword">then</span>(val=&gt;{
  <span class="hljs-built_in">console</span>.log(val);
}).<span class="hljs-keyword">catch</span>(err=&gt;{
  <span class="hljs-built_in">console</span>.log(err);
});

<span class="hljs-regexp">//</span>&#x83B7;&#x53D6;
localforage.getItem(<span class="hljs-string">&apos;key&apos;</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  ...
}).<span class="hljs-keyword">catch</span>(err=&gt;{
  <span class="hljs-built_in">console</span>.log(err);
});

<span class="hljs-regexp">//</span>&#x5220;&#x9664;
localforage.removeItem(<span class="hljs-string">&apos;key&apos;</span>);

localforage.removeItem(<span class="hljs-string">&apos;key&apos;</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  ...
}).<span class="hljs-keyword">catch</span>(err=&gt;{
  <span class="hljs-built_in">console</span>.log(err);
});

<span class="hljs-regexp">//</span>&#x6E05;&#x7A7A;
localforage.clear();

localforage.clear().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  ...
}).<span class="hljs-keyword">catch</span>(err=&gt;{
  <span class="hljs-built_in">console</span>.log(err);
})

<span class="hljs-regexp">//</span>&#x904D;&#x5386;
localforage.iterate(<span class="hljs-function"><span class="hljs-params">(value, key)</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(key,value);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  ...
}).<span class="hljs-keyword">catch</span>(err=&gt;{
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre></li><li><p><code>DOM</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//querySelector&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x8FD4;&#x56DE;&#x5339;&#x914D;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;
let parentElement = document.querySelector(&quot;.container&quot;);
//&#x521B;&#x5EFA;&#x5143;&#x7D20;
let element = document.createElement(&quot;button&quot;);
//&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;
element.setAttribute(&quot;onclick&quot;, `javascript:alert(&apos;click the span!&apos;);`);  
//&#x8BBE;&#x7F6E;&#x5185;&#x5BB9;,innerText&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#xFF0C;&#x91C7;&#x7528;innerHTML&#x8F83;&#x4E3A;&#x65B9;&#x4FBF;
element.innerHTML = &quot;&#x521B;&#x5EFA;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&quot;; 
//&#x8BBE;&#x7F6E;&#x5185;&#x8054;&#x6837;&#x5F0F;
element.style.color = &quot;blue&quot;;
//&#x5728;&#x5BB9;&#x5668;&#x4E2D;&#x672B;&#x5C3E;&#x52A0;&#x5165;&#x5143;&#x7D20;
parentElement.appendChild(element);

//&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x8BE5;&#x65B9;&#x5F0F;&#x9002;&#x5408;&#x4E00;&#x6B21;&#x6027;&#x521B;&#x5EFA;&#x591A;&#x8282;&#x70B9;
let elementHtml = `&lt;button style=&quot;color:blue&quot; onclick=&quot;javascript:alert(&apos;click the span!&apos;);&quot;&gt;innerHTML&#x65B9;&#x5F0F;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&lt;/button&gt;`
parentElement.innerHTML += elementHtml;

//&#x5143;&#x7D20;&#x7684;&#x514B;&#x9686;.cloneNode(true)&#xFF0C;&#x7236;&#x8282;&#x70B9;.parentNode&#xFF0C;&#x9996;&#x4E2A;&#x5B50;&#x8282;&#x70B9;.firstChild&#x3001;&#x4E0B;&#x4E00;&#x4E2A;&#x5144;&#x5F1F;&#x8282;&#x70B9;.nextElementSibling&#xFF0C;&#x52A0;&#x5165;&#x5230;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;refNode.parentNode.insertBefore(newNode,refNode)
parentElement.insertBefore(parentElement.parentNode.cloneNode(true), parentElement.firstChild.nextElementSibling);//&#x514B;&#x9686;&#x4E00;&#x4EFD;parentElement&#x7684;&#x7236;&#x8282;&#x70B9;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x653E;&#x5728;parentElement&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;

let newElement = element.cloneNode(true);
newElement.innerHTML = &quot;newElement&quot;;

//&#x5BB9;&#x5668;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;.lastChild&#xFF0C;&#x4E0A;&#x4E00;&#x4E2A;&#x5144;&#x5F1F;&#x8282;&#x70B9;.previousElementSibling&#xFF0C;&#x66FF;&#x6362;&#x5143;&#x7D20;refNode.parentNode.insertBefore(newNode,refNode)
parentElement.replaceChild(newElement, parentElement.lastChild.previousElementSibling);//&#x66FF;&#x6362;parentElement&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;

//querySelectorAll&#x9009;&#x62E9;&#x5668;&#x8FD4;&#x56DE;NodeList
let firstContainer = document.querySelectorAll(&quot;.container&quot;)[0];

//&#x5220;&#x9664;&#x5143;&#x7D20;node.parentNode.removeChild(node)&#xFF0C;&#x5143;&#x7D20;&#x5B50;&#x8282;&#x70B9;.children
firstContainer.removeChild(firstContainer.children[0]);//&#x5220;&#x9664;firstContainer&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;

//&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x6837;&#x5F0F;&#x89C4;&#x5219;
document.querySelector(&quot;head&quot;).innerHTML += `&lt;style&gt;.container{ height: 800px; background: red; }&lt;/style&gt;`

//&#x79FB;&#x52A8;&#x6EDA;&#x52A8;&#x6761;&#x81F3;firstContainer&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x53EF;&#x89C1;&#xFF0C;true&#x6216;&#x4E0D;&#x4F20;&#x8868;&#x793A;&#x5143;&#x7D20;&#x9876;&#x7AEF;&#x5BF9;&#x9F50;&#xFF0C;false&#x8868;&#x793A;&#x5E95;&#x7AEF;&#x5728;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x4E2D;&#x95F4;
firstContainer.scrollIntoView(true);

//&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x771F;&#x6B63;&#x6837;&#x5F0F; window.getComputedStyle(element)
console.log(window.getComputedStyle(firstContainer)) //&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x771F;&#x6B63;&#x6837;&#x5F0F;
console.log(firstContainer.style); //&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5185;&#x8054;&#x6837;&#x5F0F;

//&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x53CA;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x89C6;&#x7A97;&#x53E3;&#x7684;&#x4F4D;&#x7F6E;&#xFF08;&#x975E;&#x6587;&#x6863;&#xFF0C;&#x6545;&#x9875;&#x9762;&#x53D1;&#x751F;&#x6EDA;&#x52A8;&#x4F1A;&#x6539;&#x53D8;&#xFF09;.getBoundingClientRect()&#xFF0C;&#x5728;&#x8BA1;&#x7B97;&#x5750;&#x6807;&#x4F7F;&#x7528;&#x65F6;&#x53EF;&#x7528;clientX&#x914D;&#x5408;getBoundingClientRect().left
console.log(firstContainer.getBoundingClientRect());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//querySelector&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x8FD4;&#x56DE;&#x5339;&#x914D;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</span>
<span class="hljs-keyword">let</span> parentElement = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.container&quot;</span>);
<span class="hljs-comment">//&#x521B;&#x5EFA;&#x5143;&#x7D20;</span>
<span class="hljs-keyword">let</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;button&quot;</span>);
<span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;</span>
element.setAttribute(<span class="hljs-string">&quot;onclick&quot;</span>, <span class="hljs-string">`javascript:alert(&apos;click the span!&apos;);`</span>);  
<span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5185;&#x5BB9;,innerText&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#xFF0C;&#x91C7;&#x7528;innerHTML&#x8F83;&#x4E3A;&#x65B9;&#x4FBF;</span>
element.innerHTML = <span class="hljs-string">&quot;&#x521B;&#x5EFA;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&quot;</span>; 
<span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5185;&#x8054;&#x6837;&#x5F0F;</span>
element.style.color = <span class="hljs-string">&quot;blue&quot;</span>;
<span class="hljs-comment">//&#x5728;&#x5BB9;&#x5668;&#x4E2D;&#x672B;&#x5C3E;&#x52A0;&#x5165;&#x5143;&#x7D20;</span>
parentElement.appendChild(element);

<span class="hljs-comment">//&#x6DFB;&#x52A0;&#x5143;&#x7D20;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x8BE5;&#x65B9;&#x5F0F;&#x9002;&#x5408;&#x4E00;&#x6B21;&#x6027;&#x521B;&#x5EFA;&#x591A;&#x8282;&#x70B9;</span>
<span class="hljs-keyword">let</span> elementHtml = <span class="hljs-string">`&lt;button style=&quot;color:blue&quot; onclick=&quot;javascript:alert(&apos;click the span!&apos;);&quot;&gt;innerHTML&#x65B9;&#x5F0F;&#x6DFB;&#x52A0;&#x7684;&#x5143;&#x7D20;&lt;/button&gt;`</span>
parentElement.innerHTML += elementHtml;

<span class="hljs-comment">//&#x5143;&#x7D20;&#x7684;&#x514B;&#x9686;.cloneNode(true)&#xFF0C;&#x7236;&#x8282;&#x70B9;.parentNode&#xFF0C;&#x9996;&#x4E2A;&#x5B50;&#x8282;&#x70B9;.firstChild&#x3001;&#x4E0B;&#x4E00;&#x4E2A;&#x5144;&#x5F1F;&#x8282;&#x70B9;.nextElementSibling&#xFF0C;&#x52A0;&#x5165;&#x5230;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;refNode.parentNode.insertBefore(newNode,refNode)</span>
parentElement.insertBefore(parentElement.parentNode.cloneNode(<span class="hljs-literal">true</span>), parentElement.firstChild.nextElementSibling);<span class="hljs-comment">//&#x514B;&#x9686;&#x4E00;&#x4EFD;parentElement&#x7684;&#x7236;&#x8282;&#x70B9;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x653E;&#x5728;parentElement&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x524D;&#x9762;</span>

<span class="hljs-keyword">let</span> newElement = element.cloneNode(<span class="hljs-literal">true</span>);
newElement.innerHTML = <span class="hljs-string">&quot;newElement&quot;</span>;

<span class="hljs-comment">//&#x5BB9;&#x5668;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;.lastChild&#xFF0C;&#x4E0A;&#x4E00;&#x4E2A;&#x5144;&#x5F1F;&#x8282;&#x70B9;.previousElementSibling&#xFF0C;&#x66FF;&#x6362;&#x5143;&#x7D20;refNode.parentNode.insertBefore(newNode,refNode)</span>
parentElement.replaceChild(newElement, parentElement.lastChild.previousElementSibling);<span class="hljs-comment">//&#x66FF;&#x6362;parentElement&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;</span>

<span class="hljs-comment">//querySelectorAll&#x9009;&#x62E9;&#x5668;&#x8FD4;&#x56DE;NodeList</span>
<span class="hljs-keyword">let</span> firstContainer = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;.container&quot;</span>)[<span class="hljs-number">0</span>];

<span class="hljs-comment">//&#x5220;&#x9664;&#x5143;&#x7D20;node.parentNode.removeChild(node)&#xFF0C;&#x5143;&#x7D20;&#x5B50;&#x8282;&#x70B9;.children</span>
firstContainer.removeChild(firstContainer.children[<span class="hljs-number">0</span>]);<span class="hljs-comment">//&#x5220;&#x9664;firstContainer&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;</span>

<span class="hljs-comment">//&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x6837;&#x5F0F;&#x89C4;&#x5219;</span>
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;head&quot;</span>).innerHTML += <span class="hljs-string">`&lt;style&gt;.container{ height: 800px; background: red; }&lt;/style&gt;`</span>

<span class="hljs-comment">//&#x79FB;&#x52A8;&#x6EDA;&#x52A8;&#x6761;&#x81F3;firstContainer&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x53EF;&#x89C1;&#xFF0C;true&#x6216;&#x4E0D;&#x4F20;&#x8868;&#x793A;&#x5143;&#x7D20;&#x9876;&#x7AEF;&#x5BF9;&#x9F50;&#xFF0C;false&#x8868;&#x793A;&#x5E95;&#x7AEF;&#x5728;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x4E2D;&#x95F4;</span>
firstContainer.scrollIntoView(<span class="hljs-literal">true</span>);

<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x771F;&#x6B63;&#x6837;&#x5F0F; window.getComputedStyle(element)</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.getComputedStyle(firstContainer)) <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x771F;&#x6B63;&#x6837;&#x5F0F;</span>
<span class="hljs-built_in">console</span>.log(firstContainer.style); <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5185;&#x8054;&#x6837;&#x5F0F;</span>

<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x53CA;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x89C6;&#x7A97;&#x53E3;&#x7684;&#x4F4D;&#x7F6E;&#xFF08;&#x975E;&#x6587;&#x6863;&#xFF0C;&#x6545;&#x9875;&#x9762;&#x53D1;&#x751F;&#x6EDA;&#x52A8;&#x4F1A;&#x6539;&#x53D8;&#xFF09;.getBoundingClientRect()&#xFF0C;&#x5728;&#x8BA1;&#x7B97;&#x5750;&#x6807;&#x4F7F;&#x7528;&#x65F6;&#x53EF;&#x7528;clientX&#x914D;&#x5408;getBoundingClientRect().left</span>
<span class="hljs-built_in">console</span>.log(firstContainer.getBoundingClientRect());</code></pre></li><li>&#x4E8B;&#x4EF6;&#x6D41;<br>&#x4E8B;&#x4EF6;&#x6D41;&#x8FC7;&#x7A0B;&#xFF1A;&#x6355;&#x83B7;&#x8FC7;&#x7A0B;&#x3001;&#x76EE;&#x6807;&#x3001;&#x5192;&#x6CE1;&#x8FC7;&#x7A0B;<br>&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#xFF1A;&#x4ECE;&#x5927;&#x5230;&#x5C0F;&#xFF0C;&#x6781;&#x5C11;&#x4F7F;&#x7528;<br>&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF1A;&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#xFF0C;&#x5E38;&#x7528;&#xFF0C;&#x867D;&#x7136;&#x5404;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x4E9B;&#x5DEE;&#x5F02;<br>&#x963B;&#x6B62;&#x5192;&#x6CE1;&#xFF1A;<code>e.stopPropagation()</code>&#xFF0C;IE9&#x524D;&#x4F7F;&#x7528;<code>e.cancelBubble=true</code><br>&#x963B;&#x6B62;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#xFF1A;<code>e.preventDefault()</code>&#xFF0C;IE9&#x524D;&#x4F7F;&#x7528;<code>e.returnValue=false</code><br>&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#xFF1A;&#x5982;&#x8868;&#x5355;&#x6309;&#x94AE;&#x7684;&#x63D0;&#x4EA4;&#xFF0C;<code>&lt;a&gt;</code>&#x6807;&#x7B7E;&#x7684;&#x8DF3;&#x8F6C;&#x7B49;<br>&#x4E8B;&#x4EF6;<strong>&#x59D4;&#x6258;</strong>&#xFF1A;&#x5229;&#x7528;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#xFF0C;&#x76D1;&#x542C;&#x9876;&#x7EA7;&#x7684;DOM(&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x6570;&#x91CF;&#x5173;&#x7CFB;&#x5230;&#x9875;&#x9762;&#x7684;&#x6574;&#x4F53;&#x8FD0;&#x884C;&#x6027;&#x80FD;)</li><li><p>&#x9875;&#x9762;&#x4E8B;&#x4EF6;<br><code>pageshow</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x9875;&#x9762;&#x663E;&#x793A;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;&#x4E3A;<code>document</code>&#xFF0C;&#x4F46;&#x5FC5;&#x987B;&#x5C06;&#x5176;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x6DFB;&#x52A0;&#x5230;<code>window</code>&#xFF0C;&#x53C2;&#x6570;&#x4E3A;<code>event</code><br><code>pagehide</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x9875;&#x9762;&#x5378;&#x8F7D;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;&#x4E3A;<code>document</code>&#xFF0C;&#x4F46;&#x5FC5;&#x987B;&#x5C06;&#x5176;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x6DFB;&#x52A0;&#x5230;<code>window</code>&#xFF0C;&#x53C2;&#x6570;&#x4E3A;<code>event</code><br><code>haschange</code>&#x4E8B;&#x4EF6;&#xFF1A;<code>URL</code>&#x7684;&#x53C2;&#x6570;&#x5217;&#x8868;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x4F46;&#x5FC5;&#x987B;&#x5C06;&#x5176;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#x6DFB;&#x52A0;&#x5230;<code>window</code>&#xFF0C;&#x53C2;&#x6570;&#x4E3A;<code>event</code><br><code>visibilitychange</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x7ED1;&#x5B9A;&#x5728;<code>document</code>&#x4E0A;&#xFF0C;&#x5F53;&#x9875;&#x9762;&#x6700;&#x5C0F;&#x5316;&#x6216;&#x5207;&#x6362;&#x6D4F;&#x89C8;&#x5668;&#x6807;&#x7B7E;&#x7B49;&#x53EF;&#x89C1;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x89E6;&#x53D1;&#xFF0C;<code>documen.hidden</code>&#x53EF;&#x67E5;&#x770B;&#x9875;&#x9762;&#x53EF;&#x89C1;&#x5EA6;&#x72B6;&#x6001;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(&apos;visibilitychange&apos;,function(){
  console.log(document.hidden);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;visibilitychange&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.hidden);
})</code></pre></li><li>&#x8868;&#x5355;&#x4E8B;&#x4EF6;<br>&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#xFF1A;&#x8868;&#x5355;&#x4E2D;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x4F1A;&#x81EA;&#x52A8;&#x63D0;&#x4EA4;&#x8868;&#x5355;<br><code>form.submit()</code>&#x4E3B;&#x52A8;&#x63D0;&#x4EA4;&#x8868;&#x5355;<br><code>form.reset()</code>&#x91CD;&#x7F6E;&#x8868;&#x5355;<br><code>form.checkValidity()</code>&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x914D;&#x5408;require&#x548C;pattern&#x4F7F;&#x7528;<br><code>noValidate</code>&#x5C5E;&#x6027;&#x7981;&#x7528;&#x8868;&#x5355;&#x9A8C;&#x8BC1;<br>&#x8FC7;&#x6EE4;&#x8F93;&#x5165;&#xFF0C;&#x5C4F;&#x853D;&#x67D0;&#x4E9B;&#x8BCD;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#xFF1A;&#x76D1;&#x542C;<code>keypress</code>&#x4E8B;&#x4EF6;&#xFF0C;<code>e.preventDefault();</code><br>&#x5BCC;&#x6587;&#x672C;&#x7F16;&#x8F91;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;<br>&#x2460;<code>iframe</code>&#x5B9E;&#x73B0;&#xFF0C;&#x7A7A;&#x6587;&#x6863;&#x7684;<code>designMode</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>on</code>&#xFF0C;<code>getSeclection</code>&#x4E8B;&#x4EF6;&#x83B7;&#x53D6;&#x5177;&#x4F53;&#x4FE1;&#x606F;&#xFF1B;<br>&#x2461;&#x8BBE;&#x7F6E;<code>contenteditable</code>&#x5C5E;&#x6027;&#x5B9E;&#x73B0;&#xFF0C;&#x901A;&#x8FC7;<code>document.execCommand()</code>&#x5B9E;&#x73B0;&#x5BCC;&#x6587;&#x672C;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;<code>document.execCommand(&quot;blod&quot;, false, null);</code>&#x5B9E;&#x73B0;&#x7C97;&#x4F53;&#x6587;&#x672C;&#x3002;</li><li>&#x9F20;&#x6807;&#x4E8B;&#x4EF6;<br>&#x53CC;&#x51FB;&#x4E8B;&#x4EF6;&#x987A;&#x5E8F;&#xFF1A;<code>mousedown</code>&#x3001;<code>mouseup</code>&#x3001;<code>click</code>&#x3001;<code>mousedown</code>&#x3001;<code>mouseup</code>&#x3001;<code>click</code>&#x3001;<code>dblclick</code><br>&#x79FB;&#x5165;&#x5BB9;&#x5668;&#x4E8B;&#x4EF6;&#x987A;&#x5E8F;&#x8FC7;&#x7A0B;&#xFF1A;<code>mouseover</code>&#xFF08;&#x5728;&#x4E0D;&#x540C;&#x5143;&#x7D20;&#x95F4;&#x89E6;&#x53D1;&#xFF09;&#x3001;<code>mouseenter</code>&#x3001;<code>mousemove</code>&#x3001;<code>mouseout</code>&#xFF08;&#x5728;&#x4E0D;&#x540C;&#x5143;&#x7D20;&#x95F4;&#x89E6;&#x53D1;&#xFF09;&#x3001;<code>mouseleave</code><br>&#x53F3;&#x952E;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF1A;<code>contextmenu</code>(H5&#x4E8B;&#x4EF6;)<br>&#x4F4D;&#x7F6E;&#x4FE1;&#x606F;&#xFF1A;<br>&#x3000;&#x3000;<code>clientX</code>(&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x53EF;&#x89C6;&#x533A;&#x57DF;&#x7684;X&#x5750;&#x6807;)<br>&#x3000;&#x3000;<code>offsetX</code>(&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x6E90;&#x5143;&#x7D20;&#x7684;X&#x5750;&#x6807;,&#x5B58;&#x5728;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;)<br>&#x3000;&#x3000;<code>screenX</code>(&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x7528;&#x6237;&#x663E;&#x793A;&#x5668;&#x5C4F;&#x5E55;&#x5DE6;&#x4E0A;&#x89D2;&#x7684;X&#x5750;&#x6807;)<br>&#x3000;&#x3000;<code>pageX</code>(&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x6587;&#x6863;&#x533A;&#x57DF;&#x7684;X&#x5750;&#x6807;,&#x5B58;&#x5728;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;)<br>event&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF1A;<br>&#x3000;&#x3000;<code>type</code>(&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;)<br>&#x3000;&#x3000;<code>detail</code>(&#x70B9;&#x51FB;&#x6B21;&#x6570;)<br>&#x3000;&#x3000;<code>target</code>(&#x4E8B;&#x4EF6;&#x6E90;&#x5143;&#x7D20;)<br>&#x3000;&#x3000;<code>path</code>(&#x6570;&#x7EC4;&#xFF0C;&#x5192;&#x6CE1;&#x7684;&#x8DEF;&#x5F84;)</li><li><p>&#x62D6;&#x653E;&#x4E8B;&#x4EF6;<br>&#x76F8;&#x5173;&#x4E8B;&#x4EF6;&#xFF1A;<code>dragstart&#x3001;drag&#x3001;dragend&#x3001;dragenter&#x3001;dragover&#x3001;dragleave&#x3001;drop</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;section ondrop=&quot;drop(event)&quot; ondragover=&quot;dragover(event)&quot;&gt;&#x6295;&#x653E;&#x76EE;&#x6807;&lt;/section&gt;
&lt;div id=&quot;dragObj&quot; src=&quot;xxx&quot; draggable=&quot;true&quot; ondragstart=&quot;drag(event)&quot;&gt;&#x88AB;&#x62D6;&#x62FD;&#x7684;&#x7269;&#x4F53;&lt;/div&gt;

dragover(e){
  e.preventDefault();
}
drag(e){
  e.dataTransfer.setData(&quot;id&quot;,e.target.id);
}
drop(e){
  e.preventDefault();
  let data = e.dataTransfer.getData(&quot;id&quot;);
  e.target.appendChild(document.getElementById(data));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;section ondrop=<span class="hljs-string">&quot;drop(event)&quot;</span> ondragover=<span class="hljs-string">&quot;dragover(event)&quot;</span>&gt;&#x6295;&#x653E;&#x76EE;&#x6807;&lt;/section&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;dragObj&quot;</span> src=<span class="hljs-string">&quot;xxx&quot;</span> draggable=<span class="hljs-string">&quot;true&quot;</span> ondragstart=<span class="hljs-string">&quot;drag(event)&quot;</span>&gt;&#x88AB;&#x62D6;&#x62FD;&#x7684;&#x7269;&#x4F53;&lt;/<span class="hljs-keyword">div</span>&gt;

dragover(e){
  e.preventDefault();
}
drag(e){
  e.dataTransfer.setData(<span class="hljs-string">&quot;id&quot;</span>,e.target.<span class="hljs-built_in">id</span>);
}
drop(e){
  e.preventDefault();
  let data = e.dataTransfer.getData(<span class="hljs-string">&quot;id&quot;</span>);
  e.target.appendChild(document.getElementById(data));
}</code></pre></li><li>&#x89E6;&#x6478;&#x4E0E;&#x624B;&#x52BF;&#x4E8B;&#x4EF6;<br>&#x79FB;&#x52A8;&#x7AEF;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x987A;&#x5E8F;&#xFF1A;<code>touchstart</code>&#x3001;<code>touchend</code>&#x3001;<code>mouseover</code>&#x3001;<code>mouseenter</code>&#x3001;<code>mousemove</code>&#x3001;<code>mousedown</code>&#x3001;<code>mouseup</code>&#x3001;<code>click</code><br><code>touchmove</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x9700;&#x8981;&#x963B;&#x6B62;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x4EE5;&#x9632;&#x6B62;&#x5C4F;&#x5E55;&#x6EDA;&#x52A8;<br><code>touchcancel</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x5F53;&#x7CFB;&#x7EDF;&#x505C;&#x6B62;&#x8DDF;&#x8E2A;&#x89E6;&#x6478;&#x65F6;&#x89E6;&#x53D1;<br><code>gesturestart</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x5F53;&#x4E00;&#x4E2A;&#x624B;&#x6307;&#x5DF2;&#x7ECF;&#x6309;&#x5728;&#x5C4F;&#x5E55;&#x4E0A;&#x800C;&#x53E6;&#x4E00;&#x4E2A;&#x624B;&#x6307;&#x53C8;&#x89E6;&#x6478;&#x65F6;&#x89E6;&#x53D1;<br><code>gesturechange</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x5F53;&#x89E6;&#x6478;&#x5C4F;&#x5E55;&#x7684;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x624B;&#x6307;&#x7684;&#x4F4D;&#x7F6E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x6539;&#x53D8;<br><code>gestureend</code>&#x4E8B;&#x4EF6;&#xFF1A;&#x5F53;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x624B;&#x6307;&#x4ECE;&#x5C4F;&#x5E55;&#x4E0A;&#x9762;&#x79FB;&#x5F00;&#x65F6;&#x89E6;&#x53D1;<br>&#x89E6;&#x6478;&#x4E8B;&#x4EF6;&#x7279;&#x6709;&#x7684;event&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF1A;<br>&#x3000;&#x3000;<code>touches</code>(&#x8868;&#x793A;&#x5F53;&#x524D;&#x8DDF;&#x8E2A;&#x7684;&#x89E6;&#x6478;&#x64CD;&#x4F5C;&#x7684;Touch&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x7EC4;)<br>&#x3000;&#x3000;<code>targetTouchs</code>(&#x7279;&#x5B9A;&#x4E8E;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;&#x7684;Touch&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x7EC4;)<br>&#x3000;&#x3000;<code>changeTouches</code>(&#x4E0A;&#x6B21;&#x89E6;&#x6478;&#x4EE5;&#x6765;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#x6539;&#x53D8;&#x7684;Touch&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x7EC4;)<br>&#x3000;&#x3000;<code>rotation</code>(&#x624B;&#x52BF;&#x53D8;&#x5316;&#x5F15;&#x8D77;&#x7684;&#x65CB;&#x8F6C;&#x89D2;&#x5EA6;&#xFF0C;&#x4ECE;0&#x5F00;&#x59CB;&#xFF0C;&#x987A;&#x6B63;&#x9006;&#x8D1F;)<br>&#x3000;&#x3000;<code>scal</code>(&#x624B;&#x6307;&#x95F4;&#x7684;&#x8DDD;&#x79BB;&#x53D8;&#x5316;&#xFF0C;&#x4ECE;1&#x5F00;&#x59CB;&#xFF0C;&#x4E0E;&#x8DDD;&#x79BB;&#x5448;&#x6B63;&#x76F8;&#x5173;)</li><li><p>&#x6A21;&#x62DF;&#x4E8B;&#x4EF6;<br><code>UIEvents</code> UI&#x4E8B;&#x4EF6;<br><code>MouseEvents</code> &#x9F20;&#x6807;&#x4E8B;&#x4EF6;<br><code>MutationEvents</code> DOM&#x53D8;&#x52A8;&#x4E8B;&#x4EF6;<br><code>HTMLEvents</code> HTML&#x4E8B;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6A21;&#x62DF;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF1A;
1.&#x521B;&#x5EFA;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#x7684;event&#x5BF9;&#x8C61;
let event = document.createEvent(&quot;MouseEvents&quot;);
2.&#x8BBE;&#x7F6E;&#x89E6;&#x53D1;&#x7684;&#x53C2;&#x6570; //&#x53EF;&#x7B80;&#x5199;&#xFF0C;&#x5982;event.initMouseEvent(&apos;click&apos;);
event.initMouseEvent(&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;,...event&#x5BF9;&#x8C61;&#x5176;&#x4ED6;&#x53C2;&#x6570;);
/*&#x53C2;&#x6570;&#x987A;&#x5E8F;&#xFF1A;type&#x3001;bubbles(&#x662F;&#x5426;&#x5192;&#x6CE1;)&#x3001;cancelable(&#x4E8B;&#x4EF6;&#x662F;&#x5426;&#x53EF;&#x53D6;&#x6D88;)&#x3001;view(document.defaultView)&#x3001;detail&#x3001;screenX&#x3001;screenY&#x3001;clientX&#x3001;clientY&#x3001;ctrlKey(&#x662F;&#x5426;&#x6309;&#x4E0B;ctrl)&#x3001;altKey(&#x662F;&#x5426;&#x6309;&#x4E0B;alt)&#x3001;shiftKey(&#x662F;&#x5426;&#x6309;&#x4E0B;shiftKey)&#x3001;metaKey(&#x662F;&#x5426;&#x6309;&#x4E0B;metaKey)&#x3001;button(&#x8868;&#x793A;&#x6309;&#x4E0B;&#x54EA;&#x4E2A;&#x9F20;&#x6807;&#x952E;)&#x3001;relatedTarget(&#x4E8B;&#x4EF6;&#x76F8;&#x5173;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x4E8E;&#x6A21;&#x62DF;mouseover/mouseout)*/
3.&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;
document.getElementById(&apos;btn&apos;).dispatchEvent(event);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code>&#x6A21;&#x62DF;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF1A;
<span class="hljs-number">1.</span>&#x521B;&#x5EFA;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#x7684;event&#x5BF9;&#x8C61;
<span class="hljs-title">let</span> event = document.createEvent(<span class="hljs-string">&quot;MouseEvents&quot;</span>);
<span class="hljs-number">2.</span>&#x8BBE;&#x7F6E;&#x89E6;&#x53D1;&#x7684;&#x53C2;&#x6570; //&#x53EF;&#x7B80;&#x5199;&#xFF0C;&#x5982;event.initMouseEvent(&apos;click&apos;);
<span class="hljs-title">event</span>.initMouseEvent(&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;,...event&#x5BF9;&#x8C61;&#x5176;&#x4ED6;&#x53C2;&#x6570;);
/*&#x53C2;&#x6570;&#x987A;&#x5E8F;&#xFF1A;<span class="hljs-keyword">type</span>&#x3001;bubbles(&#x662F;&#x5426;&#x5192;&#x6CE1;)&#x3001;cancelable(&#x4E8B;&#x4EF6;&#x662F;&#x5426;&#x53EF;&#x53D6;&#x6D88;)&#x3001;view(document.defaultView)&#x3001;detail&#x3001;screenX&#x3001;screenY&#x3001;clientX&#x3001;clientY&#x3001;ctrlKey(&#x662F;&#x5426;&#x6309;&#x4E0B;ctrl)&#x3001;altKey(&#x662F;&#x5426;&#x6309;&#x4E0B;alt)&#x3001;shiftKey(&#x662F;&#x5426;&#x6309;&#x4E0B;shiftKey)&#x3001;metaKey(&#x662F;&#x5426;&#x6309;&#x4E0B;metaKey)&#x3001;button(&#x8868;&#x793A;&#x6309;&#x4E0B;&#x54EA;&#x4E2A;&#x9F20;&#x6807;&#x952E;)&#x3001;relatedTarget(&#x4E8B;&#x4EF6;&#x76F8;&#x5173;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x4E8E;&#x6A21;&#x62DF;mouseover/mouseout)*/
<span class="hljs-number">3.</span>&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;
<span class="hljs-title">document</span>.getElementById(&apos;btn&apos;).dispatchEvent(event);</code></pre></li><li>&#x5A92;&#x4F53;&#x5143;&#x7D20;<br>&#x97F3;&#x9891;&#x64AD;&#x653E;&#x5668;&#xFF1A;<code>audio</code><br>&#x89C6;&#x9891;&#x64AD;&#x653E;&#x5668;&#xFF1A;<code>video</code><br>&#x901A;&#x8FC7;<code>play()</code>&#x548C;<code>pause()</code>&#x53EF;&#x624B;&#x5DE5;&#x63A7;&#x5236;&#x5A92;&#x4F53;&#x6587;&#x4EF6;&#x7684;&#x64AD;&#x653E;&#x548C;&#x6682;&#x505C;&#xFF0C;<code>ended</code>&#x4E8B;&#x4EF6;&#x5F53;&#x64AD;&#x653E;&#x7ED3;&#x675F;&#x65F6;&#x89E6;&#x53D1;</li><li><p>&#x7ED8;&#x56FE;&#x6280;&#x672F;<br><code>canvas</code>&#xFF1A;2D&#x7ED8;&#x56FE;&#xFF0C;&#x53EF;&#x8FDB;&#x884C;&#x56FE;&#x7247;&#x4E0E;&#x56FE;&#x50CF;&#x7684;&#x4E92;&#x8F6C;&#xFF0C;&#x901A;&#x8FC7;&#x53D8;&#x6362;&#x548C;&#x5408;&#x6210;&#x7ED8;&#x5236;&#x590D;&#x6742;&#x56FE;&#x50CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;canvas&#x5185;&#x5BB9;&#x751F;&#x6210;&#x7684;URI
let imgURI = canvas.toDataURL(&quot;image/png&quot;);
let img = document.createElement(&quot;img&quot;);
img.src = imgURI;
document.body.appendChild(img);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x83B7;&#x53D6;canvas&#x5185;&#x5BB9;&#x751F;&#x6210;&#x7684;URI</span>
<span class="hljs-keyword">let</span> imgURI = canvas.toDataURL(<span class="hljs-string">&quot;image/png&quot;</span>);
<span class="hljs-keyword">let</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;img&quot;</span>);
img.src = imgURI;
<span class="hljs-built_in">document</span>.body.appendChild(img);</code></pre><p><code>svg</code>&#xFF1A;&#x652F;&#x6301;&#x4E8B;&#x4EF6;&#x9A71;&#x52A8;&#xFF0C;&#x901A;&#x8FC7;<code>foreignObject</code>&#x53EF;&#x5B9E;&#x73B0;<code>svg</code>&#x548C;&#x666E;&#x901A;<code>HTML</code>&#x5143;&#x7D20;&#x7684;&#x878D;&#x5408;<br><code>WebGL</code>&#xFF1A;3D&#x7ED8;&#x56FE;&#xFF0C;&#x975E;W3C&#x6807;&#x51C6;</p></li><li><p>ajax<br><code>Asynchronous Javascript And XML</code>&#xFF0C;&#x5373;<strong>&#x5F02;&#x6B65;JavaScript&#x548C;XML</strong>&#xFF0C;&#x662F;&#x4E00;&#x79CD;&#x521B;&#x5EFA;&#x4EA4;&#x4E92;&#x5F0F;&#x7F51;&#x9875;&#x5E94;&#x7528;&#x7684;&#x7F51;&#x9875;&#x5F00;&#x53D1;&#x6280;&#x672F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5C01;&#x88C5;ajax
function ajax(obj) {
  var xhr = new XMLHttpRequest(); //&#x521B;&#x5EFA;XMLHttpRequest&#x5B9E;&#x4F8B;
  obj.url = obj.url + &apos;?rand=&apos; + Math.random(); //&#x4E3A;url&#x52A0;&#x65F6;&#x95F4;&#x6233;
  if(obj.method === &apos;get&apos;) obj.url += &apos;&amp;&apos; + obj.data;
  if(obj.async) xhr.onreadystatechange = ()=&gt;{ (xhr.readyState == 4) &amp;&amp; callback(); } //&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x5F53;readyState == 4&#x624D;&#x6267;&#x884C;&#x56DE;&#x8C03;
  xhr.open(obj.method, obj.url, obj.async); //&#x53D1;&#x9001;&#x8BF7;&#x6C42;
  if(obj.method === &apos;post&apos;){
    xhr.setRequestHeader(&apos;Content-Type&apos;, &apos;application/x-www-form-urlencoded&apos;);
    xhr.send(obj.data); 
  }else{
    xhr.send(null);
  }
  if(!obj.async) callback(); //&#x540C;&#x6B65;&#x8BF7;&#x6C42;
  function callback() {
    if(xhr.status == 200){ obj.success(xhr.responseText); } //&#x56DE;&#x8C03;&#x4F20;&#x9012;&#x53C2;&#x6570;
    else{ console.log(&apos;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x9519;&#x8BEF;&#xFF01;&#x9519;&#x8BEF;&#x4EE3;&#x53F7;&#xFF1A;&apos; + xhr.status + &apos;&#xFF0C;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF1A;&apos; + xhr.statusText); }
  }
}

ajax({
  method : &apos;post/get&apos;,
  url : &apos;...&apos;,
  data : &quot;&quot;,
  success : (res)=&gt;{
    console.log(res);
  },
  async : true
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5C01;&#x88C5;ajax</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest(); <span class="hljs-comment">//&#x521B;&#x5EFA;XMLHttpRequest&#x5B9E;&#x4F8B;</span>
  obj.url = obj.url + <span class="hljs-string">&apos;?rand=&apos;</span> + <span class="hljs-built_in">Math</span>.random(); <span class="hljs-comment">//&#x4E3A;url&#x52A0;&#x65F6;&#x95F4;&#x6233;</span>
  <span class="hljs-keyword">if</span>(obj.method === <span class="hljs-string">&apos;get&apos;</span>) obj.url += <span class="hljs-string">&apos;&amp;&apos;</span> + obj.data;
  <span class="hljs-keyword">if</span>(obj.async) xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{ (xhr.readyState == <span class="hljs-number">4</span>) &amp;&amp; callback(); } <span class="hljs-comment">//&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x5F53;readyState == 4&#x624D;&#x6267;&#x884C;&#x56DE;&#x8C03;</span>
  xhr.open(obj.method, obj.url, obj.async); <span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
  <span class="hljs-keyword">if</span>(obj.method === <span class="hljs-string">&apos;post&apos;</span>){
    xhr.setRequestHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;application/x-www-form-urlencoded&apos;</span>);
    xhr.send(obj.data); 
  }<span class="hljs-keyword">else</span>{
    xhr.send(<span class="hljs-literal">null</span>);
  }
  <span class="hljs-keyword">if</span>(!obj.async) callback(); <span class="hljs-comment">//&#x540C;&#x6B65;&#x8BF7;&#x6C42;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(xhr.status == <span class="hljs-number">200</span>){ obj.success(xhr.responseText); } <span class="hljs-comment">//&#x56DE;&#x8C03;&#x4F20;&#x9012;&#x53C2;&#x6570;</span>
    <span class="hljs-keyword">else</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x9519;&#x8BEF;&#xFF01;&#x9519;&#x8BEF;&#x4EE3;&#x53F7;&#xFF1A;&apos;</span> + xhr.status + <span class="hljs-string">&apos;&#xFF0C;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF1A;&apos;</span> + xhr.statusText); }
  }
}

ajax({
  <span class="hljs-attr">method</span> : <span class="hljs-string">&apos;post/get&apos;</span>,
  <span class="hljs-attr">url</span> : <span class="hljs-string">&apos;...&apos;</span>,
  <span class="hljs-attr">data</span> : <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">success</span> : <span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res);
  },
  <span class="hljs-attr">async</span> : <span class="hljs-literal">true</span>
});</code></pre></li><li>get&#x4E0E;post&#x8BF7;&#x6C42;<br><code>get</code>&#x8BF7;&#x6C42;&#xFF1A;&#x4ECE;&#x6307;&#x5B9A;&#x7684;&#x8D44;&#x6E90;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x548C;&#x7C7B;&#x578B;&#x6709;&#x9650;&#x5236;&#xFF08;&#x56E0;&#x4E3A;&#x6570;&#x636E;&#x653E;&#x5728;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x5176;&#x957F;&#x5EA6;&#x6709;&#x9650;&#x5236;&#xFF09;&#xFF0C;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#xFF0C;&#x4E14;&#x6570;&#x636E;&#x5728;<code>url</code>&#x4E0A;&#x53EF;&#x89C1;&#xFF0C;&#x5BFC;&#x81F4;&#x5B89;&#x5168;&#x6027;&#x76F8;&#x5BF9;&#x4F4E;&#x70B9;&#x3002;<br><code>post</code>&#x8BF7;&#x6C42;&#xFF1A;&#x5411;&#x6307;&#x5B9A;&#x7684;&#x8D44;&#x6E90;&#x63D0;&#x4EA4;&#x88AB;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x548C;&#x7C7B;&#x578B;&#x6CA1;&#x9650;&#x5236;&#xFF0C;&#x4E0D;&#x4E3B;&#x52A8;&#x7F13;&#x5B58;&#xFF0C;&#x9875;&#x9762;&#x5237;&#x65B0;&#x6570;&#x636E;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x63D0;&#x4EA4;&#x3002;<br><strong>&#x5E95;&#x5C42;&#x5206;&#x6790;</strong>&#xFF1A;&#x5BF9;&#x4E8E;get&#x8BF7;&#x6C42;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x628A;<code>http header</code>&#x548C;<code>data</code>&#x4E00;&#x5E76;&#x53D1;&#x9001;&#x51FA;&#x53BB;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x54CD;&#x5E94;200&#xFF08;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF09;&#xFF0C;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;TCP&#x6570;&#x636E;&#x5305;&#xFF1B;&#x5BF9;&#x4E8E;post&#x8BF7;&#x6C42;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5148;&#x53D1;&#x9001;<code>header</code>&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x54CD;&#x5E94;100 continue&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x518D;&#x53D1;&#x9001;<code>data</code>&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x54CD;&#x5E94;200 ok&#xFF08;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF09;&#xFF0C;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x4EA7;&#x751F;<strong>&#x4E24;&#x4E2A;TCP&#x6570;&#x636E;&#x5305;&#xFF0C;&#x5BFC;&#x81F4;&#x65F6;&#x95F4;&#x6D88;&#x8017;</strong>&#xFF0C;&#x7F51;&#x7EDC;&#x73AF;&#x5883;&#x7545;&#x901A;&#x60C5;&#x51B5;&#x4E0B;&#x53EF;&#x65E0;&#x89C6;&#x3002;</li><li><p><code>File API</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reader = new FileReader();
reader.readAsText(file,encoding); //&#x4EE5;&#x7EAF;&#x6587;&#x672C;&#x7684;&#x5F62;&#x5F0F;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x8BFB;&#x53D6;&#x5230;&#x7684;&#x6587;&#x672C;&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;
//reader.readAsDataURL(file); //&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x4EE5;&#x6570;&#x636E;URI&#x7684;&#x5F62;&#x5F0F;&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;
//reader.readAsBinaryString(file); //&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x5E76;&#x5C06;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x8868;&#x793A;&#x4E00;&#x5B57;&#x8282;
//reader.readAsArrayBuffer(file); //&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x5E76;&#x5C06;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7684;ArrayBuffer&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;
reader.progress = (event)=&gt;{
  if(event.lengthComputable){
    console.log(event.loaded + &apos;/&apos; + event.total);
  }
}
reader.onerror = ()=&gt;{
  console.log(reader.error.code);
}
reader.onload = function(){
  console.log(reader.result);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> reader = <span class="hljs-keyword">new</span> FileReader();
reader.readAsText(file,encoding); <span class="hljs-comment">//&#x4EE5;&#x7EAF;&#x6587;&#x672C;&#x7684;&#x5F62;&#x5F0F;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x8BFB;&#x53D6;&#x5230;&#x7684;&#x6587;&#x672C;&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;</span>
<span class="hljs-comment">//reader.readAsDataURL(file); //&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x4EE5;&#x6570;&#x636E;URI&#x7684;&#x5F62;&#x5F0F;&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;</span>
<span class="hljs-comment">//reader.readAsBinaryString(file); //&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x5E76;&#x5C06;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x8868;&#x793A;&#x4E00;&#x5B57;&#x8282;</span>
<span class="hljs-comment">//reader.readAsArrayBuffer(file); //&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x5E76;&#x5C06;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x7684;ArrayBuffer&#x4FDD;&#x5B58;&#x5728;result&#x5C5E;&#x6027;&#x4E2D;</span>
reader.progress = <span class="hljs-function">(<span class="hljs-params">event</span>)=&gt;</span>{
  <span class="hljs-keyword">if</span>(event.lengthComputable){
    <span class="hljs-built_in">console</span>.log(event.loaded + <span class="hljs-string">&apos;/&apos;</span> + event.total);
  }
}
reader.onerror = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(reader.error.code);
}
reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(reader.result);
}</code></pre></li><li><p>&#x5BF9;&#x8C61;&#x9632;&#x7BE1;&#x6539;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.preventExtensions(obj);  //&#x5BF9;&#x8C61;&#x4E0D;&#x53EF;&#x62D3;&#x5C55;&#xFF0C;&#x7981;&#x6B62;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;
Object.seal(obj); //&#x5BC6;&#x5C01;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x53EF;&#x5220;&#x9664;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
Object.freeze(obj); //&#x51BB;&#x7ED3;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x53EF;&#x62D3;&#x5C55;&#x3001;&#x4E14;&#x5BC6;&#x5C01;&#x3001;&#x4E0D;&#x53EF;&#x7F16;&#x8F91;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-built_in">Object</span>.preventExtensions(obj);  <span class="hljs-comment">//&#x5BF9;&#x8C61;&#x4E0D;&#x53EF;&#x62D3;&#x5C55;&#xFF0C;&#x7981;&#x6B62;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;</span>
<span class="hljs-built_in">Object</span>.seal(obj); <span class="hljs-comment">//&#x5BC6;&#x5C01;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x53EF;&#x5220;&#x9664;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</span>
<span class="hljs-built_in">Object</span>.freeze(obj); <span class="hljs-comment">//&#x51BB;&#x7ED3;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x53EF;&#x62D3;&#x5C55;&#x3001;&#x4E14;&#x5BC6;&#x5C01;&#x3001;&#x4E0D;&#x53EF;&#x7F16;&#x8F91;</span></code></pre></li><li><p><code>String&#x3001;JSON&#x3001;Object</code>&#x76F8;&#x4E92;&#x8F6C;&#x5316;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js&#x5BF9;&#x8C61;&#x8F6C;JSON
function jsToJSON(obj){
  let objFnToStr = fnToStr(obj);
  return JSON.stringify(objFnToStr);
}

//&#x5B57;&#x7B26;&#x4E32;&#x8F6C;JSON
function strToJSON(str){
  let obj = eval(&apos;(&apos;+str+&apos;)&apos;);
  return jsToJSON(obj);
}

//JSON&#x8F6C;js&#x5BF9;&#x8C61;
function JSONToJs(json){
  let obj = JSON.parse(json);
  return strToFn(obj);
}

//&#x5C06;js&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x89E3;&#x6790;&#x4E3A;&#x51FD;&#x6570;
function strToFn(obj){
  var o = obj instanceof Array ? [] : {};
  for(var k in obj) {
    switch(typeof(obj[k])){
      case &apos;object&apos;:
        o[k] = obj[k] ? strToFn(obj[k]) : null;
        break;
      case &apos;string&apos;:
        o[k] = obj[k].match(/^\s*(function\s*\(.*\)\s*)|(\(.*\)\s*\=&gt;\s*)/) ? eval(&apos;(&apos;+obj[k]+&apos;)&apos;) : obj[k];
        break;
      default:
        o[k] = obj[k];
        break;
    }
  }
  return o;
}

//&#x5C06;js&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;
function fnToStr(obj){
  var o = obj instanceof Array ? [] : {};
  for(var k in obj) {
    switch(typeof(obj[k])){
      case &apos;object&apos;:
        o[k] = obj[k] ? fnToStr(obj[k]) : null;
        break;
      case &apos;function&apos;:
        o[k] = obj[k] + &apos;&apos;;
        break;
      default:
        o[k] = obj[k];
        break;
    }
  }
  return o;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//js&#x5BF9;&#x8C61;&#x8F6C;JSON</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsToJSON</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-keyword">let</span> objFnToStr = fnToStr(obj);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(objFnToStr);
}

<span class="hljs-comment">//&#x5B57;&#x7B26;&#x4E32;&#x8F6C;JSON</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strToJSON</span>(<span class="hljs-params">str</span>)</span>{
  <span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">eval</span>(<span class="hljs-string">&apos;(&apos;</span>+str+<span class="hljs-string">&apos;)&apos;</span>);
  <span class="hljs-keyword">return</span> jsToJSON(obj);
}

<span class="hljs-comment">//JSON&#x8F6C;js&#x5BF9;&#x8C61;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">JSONToJs</span>(<span class="hljs-params">json</span>)</span>{
  <span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">JSON</span>.parse(json);
  <span class="hljs-keyword">return</span> strToFn(obj);
}

<span class="hljs-comment">//&#x5C06;js&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x5B57;&#x7B26;&#x4E32;&#x89E3;&#x6790;&#x4E3A;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strToFn</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-keyword">var</span> o = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">switch</span>(<span class="hljs-keyword">typeof</span>(obj[k])){
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;object&apos;</span>:
        o[k] = obj[k] ? strToFn(obj[k]) : <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;string&apos;</span>:
        o[k] = obj[k].match(<span class="hljs-regexp">/^\s*(function\s*\(.*\)\s*)|(\(.*\)\s*\=&gt;\s*)/</span>) ? <span class="hljs-built_in">eval</span>(<span class="hljs-string">&apos;(&apos;</span>+obj[k]+<span class="hljs-string">&apos;)&apos;</span>) : obj[k];
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        o[k] = obj[k];
        <span class="hljs-keyword">break</span>;
    }
  }
  <span class="hljs-keyword">return</span> o;
}

<span class="hljs-comment">//&#x5C06;js&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fnToStr</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-keyword">var</span> o = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">switch</span>(<span class="hljs-keyword">typeof</span>(obj[k])){
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;object&apos;</span>:
        o[k] = obj[k] ? fnToStr(obj[k]) : <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;function&apos;</span>:
        o[k] = obj[k] + <span class="hljs-string">&apos;&apos;</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        o[k] = obj[k];
        <span class="hljs-keyword">break</span>;
    }
  }
  <span class="hljs-keyword">return</span> o;
}</code></pre></li><li><p>&#x5B9A;&#x65F6;&#x5668;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5EF6;&#x8FDF;&#x8C03;&#x7528;
let timeId = setTimeout(fn,time);
clearTimeout(timeId);

//&#x95F4;&#x6B47;&#x8C03;&#x7528;
let timeId = setInterval(fn,time);
clearInterval(timeId);

//&#x5B9A;&#x65F6;&#x5668;&#x4E2D;&#x7684;&#x5B9A;&#x65F6;&#x5668;
setTimeout(function(){
  //...
  setTimeout(arguments.callee, interval);
})

//&#x6C89;&#x7761;&#x6392;&#x5E8F;&#x6CD5;
[1,5,2,4,100,3].forEach(n=&gt;{
  setTimeout(()=&gt;{ console.log(n) }, n);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5EF6;&#x8FDF;&#x8C03;&#x7528;</span>
<span class="hljs-keyword">let</span> timeId = setTimeout(fn,time);
clearTimeout(timeId);

<span class="hljs-comment">//&#x95F4;&#x6B47;&#x8C03;&#x7528;</span>
<span class="hljs-keyword">let</span> timeId = setInterval(fn,time);
clearInterval(timeId);

<span class="hljs-comment">//&#x5B9A;&#x65F6;&#x5668;&#x4E2D;&#x7684;&#x5B9A;&#x65F6;&#x5668;</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">//...</span>
  setTimeout(<span class="hljs-built_in">arguments</span>.callee, interval);
})

<span class="hljs-comment">//&#x6C89;&#x7761;&#x6392;&#x5E8F;&#x6CD5;</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">100</span>,<span class="hljs-number">3</span>].forEach(<span class="hljs-function"><span class="hljs-params">n</span>=&gt;</span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(n) }, n);
})</code></pre></li><li><p><code>html</code>&#x4E0E;&#x6587;&#x672C;&#x7684;&#x8F6C;&#x6362;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B57;&#x7B26;&#x4E32;&#x8F6C;html&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x53C2;&#x6570;&#xFF1A;html&#x4F20;&#x5165;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;type&#x662F;&#x5426;&#x8FD4;&#x56DE;&#x6807;&#x7B7E;&#x7ED3;&#x6784;&#xFF0C;&#x9ED8;&#x8BA4;&#x53EA;&#x8FD4;&#x56DE;&#x5185;&#x5BB9;&#xFF0C;secape&#x6807;&#x7B7E;&#x662F;&#x5426;&#x9700;&#x8981;&#x8F6C;&#x4E49;
function escapeHtml(html,type,escape){ //type:content/html,escape:&#x8F6C;&#x4E49;/&#x4E0D;&#x8F6C;&#x4E49;
  let objE = document.createElement(&quot;div&quot;);
  objE.innerHTML = html;
  type 
    ? (escape 
      ? (html.includes(&apos;&amp;&apos;) ? (objE.innerText = html) : (objE.innerText = new Option(str).innerHTML)) 
      : (html.includes(&apos;&lt;&apos;) &amp;&amp; (objE.innerText = html)
    : (objE.innerHTML = objE.innerText);
  return objE.innerText;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">//&#x5B57;&#x7B26;&#x4E32;&#x8F6C;html&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x53C2;&#x6570;&#xFF1A;html&#x4F20;&#x5165;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;type&#x662F;&#x5426;&#x8FD4;&#x56DE;&#x6807;&#x7B7E;&#x7ED3;&#x6784;&#xFF0C;&#x9ED8;&#x8BA4;&#x53EA;&#x8FD4;&#x56DE;&#x5185;&#x5BB9;&#xFF0C;secape&#x6807;&#x7B7E;&#x662F;&#x5426;&#x9700;&#x8981;&#x8F6C;&#x4E49;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">escapeHtml</span>(<span class="hljs-params">html,<span class="hljs-keyword">type</span>,<span class="hljs-built_in">escape</span></span>)</span>{ <span class="hljs-comment">//type:content/html,escape:&#x8F6C;&#x4E49;/&#x4E0D;&#x8F6C;&#x4E49;</span>
  <span class="hljs-keyword">let</span> objE = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;div&quot;</span>);
  objE.innerHTML = html;
  <span class="hljs-keyword">type</span> 
    ? (<span class="hljs-built_in">escape</span> 
      ? (html.includes(<span class="hljs-string">&apos;&amp;&apos;</span>) ? (objE.innerText = html) : (objE.innerText = <span class="hljs-keyword">new</span> Option(str).innerHTML)) 
      : (html.includes(<span class="hljs-string">&apos;&lt;&apos;</span>) &amp;&amp; (objE.innerText = html)
    : (objE.innerHTML = objE.innerText);
  <span class="hljs-keyword">return</span> objE.innerText;
}</code></pre></li><li><p>&#x9519;&#x8BEF;&#x5904;&#x7406;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x76D1;&#x542C;&#x9664; try catch &#x6355;&#x6349;&#x7684;&#x9519;&#x8BEF;
window.onerror = (...error)=&gt;{
  window.open(&quot;http://stackoverflow.com/search?q=[js] + &quot;+error[0]);
}

//&#x5F3A;&#x5236;&#x62A5;&#x9519;
var err = new Error(&quot;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&quot;);
console.error(err); //&#x5355;&#x7EAF;&#x65E5;&#x5FD7;&#x8F93;&#x51FA;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x4EE3;&#x7801;&#x6267;&#x884C;
throw err; //&#x663E;&#x793A;&#x62A5;&#x9519;&#xFF0C;&#x5BFC;&#x81F4;&#x540E;&#x9762;&#x4EE3;&#x7801;&#x4E0D;&#x89E3;&#x6790;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">//&#x76D1;&#x542C;&#x9664; try catch &#x6355;&#x6349;&#x7684;&#x9519;&#x8BEF;</span>
<span class="hljs-keyword">window</span>.onerror = (...<span class="hljs-keyword">error</span>)=&gt;{
  <span class="hljs-keyword">window</span>.<span class="hljs-keyword">open</span>(<span class="hljs-string">&quot;http://stackoverflow.com/search?q=[js] + &quot;</span>+<span class="hljs-keyword">error</span>[0]);
}

<span class="hljs-comment">//&#x5F3A;&#x5236;&#x62A5;&#x9519;</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">err</span> = new <span class="hljs-keyword">Error</span>(<span class="hljs-string">&quot;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&quot;</span>);
console.<span class="hljs-keyword">error</span>(<span class="hljs-keyword">err</span>); <span class="hljs-comment">//&#x5355;&#x7EAF;&#x65E5;&#x5FD7;&#x8F93;&#x51FA;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x4EE3;&#x7801;&#x6267;&#x884C;</span>
throw <span class="hljs-keyword">err</span>; <span class="hljs-comment">//&#x663E;&#x793A;&#x62A5;&#x9519;&#xFF0C;&#x5BFC;&#x81F4;&#x540E;&#x9762;&#x4EE3;&#x7801;&#x4E0D;&#x89E3;&#x6790;</span></code></pre></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js基础知识笔记

## 原文链接
[https://segmentfault.com/a/1190000016587290](https://segmentfault.com/a/1190000016587290)

