---
title: '深入理解 Javascript 之 对象' 
date: 2018-11-17 14:34:54
hidden: true
slug: mbkl8jawdgl
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x64B8;js&#x57FA;&#x7840;&#x4E4B;&#x5BF9;&#x8C61;</h1><h2 id="articleHeader1">&#x56FE;&#x4F8B;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000015949904?w=768&amp;h=448" src="https://static.alili.tech/img/remote/1460000015949904?w=768&amp;h=448" alt="" title="" style="cursor:pointer;display:inline"></span></p><hr><h2 id="articleHeader2">&#x5148;&#x8C08;&#x8C08; ECMAScript &#x4E2D;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;</h2><p><strong>ES6 &#x4E4B;&#x524D; ECMAScript &#x4E2D;&#x6709; 5 &#x79CD;&#x7B80;&#x5355;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF08;&#x4E5F;&#x79F0;&#x4E3A;&#x3010;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3011;&#xFF09;&#xFF1A;<code>Undefined</code>&#x3001;<code>Null</code>&#x3001;<code>Boolean</code>&#x3001;<code>Number</code>&#x548C; <code>String</code>&#x3002;</strong></p><p><strong>&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x590D;&#x6742;&#x7684;&#x3010;&#x5F15;&#x7528;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3011;<code>Object</code>&#x3002;</strong></p><p><strong><code>ES6</code>&#x5F15;&#x5165;&#x4E86;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x539F;&#x59CB;&#x6570;&#x636E;&#x7C7B;&#x578B; <code>Symbol</code>&#xFF0C;&#x8868;&#x793A;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#x503C;&#x3002;&#x5B83;&#x662F; JavaScript &#x8BED;&#x8A00;&#x7684;&#x7B2C;&#x4E03;&#x79CD;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3002;&#x5B83;&#x4E5F;&#x662F;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3002;</strong></p><ul><li>&#x7279;&#x70B9;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x6309;&#x503C;&#x8BBF;&#x95EE;&#x7684;
&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x53EF;&#x53D8;&#x7684;
&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x6BD4;&#x8F83;&#x662F;&#x5B83;&#x4EEC;&#x7684;&#x503C;&#x7684;&#x6BD4;&#x8F83;
&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x5B58;&#x653E;&#x5728;&#x6808;&#x5185;&#x5B58;&#xFF08;Stack&#xFF09;&#x91CC;&#x7684;

&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x6309;&#x5F15;&#x7528;&#x8BBF;&#x95EE;&#x7684;
&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x53EF;&#x53D8;&#x7684;
&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x6BD4;&#x8F83;&#x662F;&#x5F15;&#x7528;&#x7684;&#x6BD4;&#x8F83;
&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x4FDD;&#x5B58;&#x5728;&#x5806;&#x5185;&#x5B58;&#xFF08;Heap&#xFF09;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#xFF08;Object&#xFF09; &#x4E0E;&#x5176;&#x4ED6;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x4E0D;&#x540C;&#xFF0C;JavaScript &#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#xFF08;&#x5806;&#x5185;&#x5B58;&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x6309;&#x503C;&#x8BBF;&#x95EE;&#x7684;
&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x4E0D;&#x53EF;&#x53D8;&#x7684;
&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x6BD4;&#x8F83;&#x662F;&#x5B83;&#x4EEC;&#x7684;&#x503C;&#x7684;&#x6BD4;&#x8F83;
&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x5B58;&#x653E;&#x5728;&#x6808;&#x5185;&#x5B58;&#xFF08;Stack&#xFF09;&#x91CC;&#x7684;

&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x6309;&#x5F15;&#x7528;&#x8BBF;&#x95EE;&#x7684;
&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x53EF;&#x53D8;&#x7684;
&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x6BD4;&#x8F83;&#x662F;&#x5F15;&#x7528;&#x7684;&#x6BD4;&#x8F83;
&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x662F;&#x4FDD;&#x5B58;&#x5728;&#x5806;&#x5185;&#x5B58;&#xFF08;<span class="hljs-keyword">Heap</span>&#xFF09;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#xFF08;Object&#xFF09; &#x4E0E;&#x5176;&#x4ED6;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x4E0D;&#x540C;&#xFF0C;JavaScript &#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#xFF08;&#x5806;&#x5185;&#x5B58;&#xFF09;</code></pre><p><strong>&#x56FE;&#x89E3;&#xFF1A;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015949905?w=760&amp;h=302" src="https://static.alili.tech/img/remote/1460000015949905?w=760&amp;h=302" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015949906?w=526&amp;h=800" src="https://static.alili.tech/img/remote/1460000015949906?w=526&amp;h=800" alt="" title="" style="cursor:pointer;display:inline"></span></p><hr><h2 id="articleHeader3">&#x68C0;&#x6D4B;&#x53D8;&#x91CF;&#x7C7B;&#x578B;</h2><p><strong>typeof</strong></p><blockquote>&#x9002;&#x5408;&#x5224;&#x65AD;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x548C;function&#x7684;&#x5224;&#x65AD;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof &quot;sss&quot; ===&gt; &quot;string&quot;
typeof 123 ===&gt; &quot;Number&quot;
typeof [1,2,3] ===&gt; &quot;object&quot;
typeof new Date() ===&gt; &quot;object&quot;
typeof function(){alert(&apos;111&apos;);}  ===&gt; &quot;function&quot;
typeof undefined ===&gt; &quot;undefined&quot;
typeof NaN ===&gt; &quot;number&quot;
typeof null ===&gt; &quot;object&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span> <span class="hljs-string">&quot;sss&quot;</span> ===&gt; <span class="hljs-string">&quot;string&quot;</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-number">123</span> ===&gt; <span class="hljs-string">&quot;Number&quot;</span>
<span class="hljs-keyword">typeof</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] ===&gt; <span class="hljs-string">&quot;object&quot;</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() ===&gt; <span class="hljs-string">&quot;object&quot;</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{alert(<span class="hljs-string">&apos;111&apos;</span>);}  ===&gt; <span class="hljs-string">&quot;function&quot;</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span> ===&gt; <span class="hljs-string">&quot;undefined&quot;</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">NaN</span> ===&gt; <span class="hljs-string">&quot;number&quot;</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span> ===&gt; <span class="hljs-string">&quot;object&quot;</span></code></pre><p><strong>instanceof</strong></p><blockquote>&#x5224;&#x65AD;&#x5DF2;&#x77E5;&#x7684;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x6216;&#x8005;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5BF9;&#x8C61;</blockquote><ul><li>&#x76EE;&#x6807;&#x5BF9;&#x8C61; + instanceof + &#x51FD;&#x6570;&#x6784;&#x9020;&#x5668;[&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x662F;&#x67D0;&#x4E2A;&#x6784;&#x9020;&#x5668;&#x7684;&#x5B9E;&#x4F8B;]</li><li>&#x539F;&#x7406;&#xFF1A; &#x5224;&#x65AD;&#x5DE6;&#x8FB9;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x662F;&#x5426;&#x6709;&#x53F3;&#x4FA7;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;prototype&#x5C5E;&#x6027;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,3] instanceof Array === true
new Array(&apos;1, 3,4&apos;) instanceof Array === true
new Object() instanceof Object === true
new String(&quot;string&quot;) instanceof String === true
function(){this.name=&quot;22&quot;;} instanceof Function === true

// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;
function Person(){
    
}
// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;
function Student(){

}
// &#x6BCF;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x90FD;&#x6709;&#x4E00;&#x4E2A;prototype&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF0C; &#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x5C06;&#x4F1A;&#x4F5C;&#x4E3A;&#x901A;&#x8FC7;new Person()&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x3002;
// &#x4E5F;&#x5C31;&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x5728;new &#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x5C31;&#x6307;&#x5411;&#x4E86;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;prototype&#x3002;

Student.prototype = new Person(); // student&#x7EE7;&#x627F;&#x81F3;person

var bson = new Student();
bson instanceof Student
// false

bson instanceof Person
// true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>[<span class="hljs-number">1</span>,<span class="hljs-number">3</span>] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> === <span class="hljs-literal">true</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-string">&apos;1, 3,4&apos;</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> === <span class="hljs-literal">true</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>() <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> === <span class="hljs-literal">true</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">&quot;string&quot;</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span> === <span class="hljs-literal">true</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">this</span>.name=<span class="hljs-string">&quot;22&quot;</span>;} <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span> === <span class="hljs-literal">true</span>

<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
    
}
<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params"></span>)</span>{

}
<span class="hljs-comment">// &#x6BCF;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x90FD;&#x6709;&#x4E00;&#x4E2A;prototype&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF0C; &#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x5C06;&#x4F1A;&#x4F5C;&#x4E3A;&#x901A;&#x8FC7;new Person()&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x3002;</span>
<span class="hljs-comment">// &#x4E5F;&#x5C31;&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x5728;new &#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x5C31;&#x6307;&#x5411;&#x4E86;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;prototype&#x3002;</span>

Student.prototype = <span class="hljs-keyword">new</span> Person(); <span class="hljs-comment">// student&#x7EE7;&#x627F;&#x81F3;person</span>

<span class="hljs-keyword">var</span> bson = <span class="hljs-keyword">new</span> Student();
bson <span class="hljs-keyword">instanceof</span> Student
<span class="hljs-comment">// false</span>

bson <span class="hljs-keyword">instanceof</span> Person
<span class="hljs-comment">// true</span></code></pre><p><strong>Object.prototype.toString.apply()</strong></p><blockquote>&#x5224;&#x65AD;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x548C;&#x5185;&#x7F6E;&#x5BF9;&#x8C61;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.apply([]) === &quot;[object Array]&quot;
Object.prototype.toString.apply(function(){}) === &quot;[object Function]&quot;

Object.prototype.toString.apply(new Function); // &quot;[object Function]&quot;
Object.prototype.toString.apply(new Object);       // &quot;[object Object]&quot;
Object.prototype.toString.apply(new Date);         // &quot;[object Date]&quot;
Object.prototype.toString.apply(new Array);        // &quot;[object Array]&quot;
Object.prototype.toString.apply(new RegExp);       // &quot;[object RegExp]&quot;
Object.prototype.toString.apply(new ArrayBuffer);  // &quot;[object ArrayBuffer]&quot;
Object.prototype.toString.apply(Math);             // &quot;[object Math]&quot;
Object.prototype.toString.apply(JSON);             // &quot;[object JSON]&quot;
var promise = new Promise(function(resolve, reject) {
    resolve();
});
Object.prototype.toString.apply(promise);          // &quot;[object Promise]&quot;
Object.prototype.toString.apply(124)
// &quot;[object Number]&quot;
Object.prototype.toString.apply(&quot;222&quot;)
// &quot;[object String]&quot;
Object.prototype.toString.apply(true)
// &quot;[object Boolean]&quot;
Object.prototype.toString.apply(null)
// &quot;[object Null]&quot;
Object.prototype.toString.apply(null) === &quot;[object Null]&quot;   // &#x5728;IE6/7/8&#x4E0B;&#x5B58;&#x5728;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.prototype.toString.apply([]) === <span class="hljs-string">&quot;[object Array]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}) === <span class="hljs-string">&quot;[object Function]&quot;</span>

<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>); <span class="hljs-comment">// &quot;[object Function]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>);       <span class="hljs-comment">// &quot;[object Object]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>);         <span class="hljs-comment">// &quot;[object Date]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>);        <span class="hljs-comment">// &quot;[object Array]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>);       <span class="hljs-comment">// &quot;[object RegExp]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>);  <span class="hljs-comment">// &quot;[object ArrayBuffer]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-built_in">Math</span>);             <span class="hljs-comment">// &quot;[object Math]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-built_in">JSON</span>);             <span class="hljs-comment">// &quot;[object JSON]&quot;</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve();
});
<span class="hljs-built_in">Object</span>.prototype.toString.apply(promise);          <span class="hljs-comment">// &quot;[object Promise]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-number">124</span>)
<span class="hljs-comment">// &quot;[object Number]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-string">&quot;222&quot;</span>)
<span class="hljs-comment">// &quot;[object String]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-literal">true</span>)
<span class="hljs-comment">// &quot;[object Boolean]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-literal">null</span>)
<span class="hljs-comment">// &quot;[object Null]&quot;</span>
<span class="hljs-built_in">Object</span>.prototype.toString.apply(<span class="hljs-literal">null</span>) === <span class="hljs-string">&quot;[object Null]&quot;</span>   <span class="hljs-comment">// &#x5728;IE6/7/8&#x4E0B;&#x5B58;&#x5728;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</span></code></pre><h2 id="articleHeader4">&#x521B;&#x5EFA;&#x5BF9;&#x8C61;</h2><p><strong>&#x4F7F;&#x7528; Object &#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x7684;&#x521B;&#x5EFA;
var obj = new Object() 
obj.key = &apos;value&apos;   //&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x8D4B;&#x503C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// &#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x7684;&#x521B;&#x5EFA;</span>
<span class="hljs-selector-tag">var</span> obj = new Object() 
obj<span class="hljs-selector-class">.key</span> = <span class="hljs-string">&apos;value&apos;</span>   <span class="hljs-comment">//&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x8D4B;&#x503C;</span></code></pre><p><strong>&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x8868;&#x793A;&#x6CD5;&#x521B;&#x5EFA;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4F7F;&#x7528;&#x5B57;&#x9762;&#x91CF;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
var obj = {
    key1: &apos;value1&apos;,
    key2: &apos;value2&apos;
}  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">//&#x4F7F;&#x7528;&#x5B57;&#x9762;&#x91CF;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
<span class="hljs-selector-tag">var</span> obj = {
    key1: <span class="hljs-string">&apos;value1&apos;</span>,
    key2: <span class="hljs-string">&apos;value2&apos;</span>
}  </code></pre><p><strong>ES6&#x4E2D;&#x8FD8;&#x6709;&#x66F4;&#x7B80;&#x6D01;&#x7684;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var age = 20
var sex = &quot;sexy&quot;
 
var a = {
    name: &apos;jack&apos;,
 
    // &#x7B80;&#x6D01;&#x8868;&#x793A;&#x6CD5;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; age: age
    age, 
 
    // &#x7B80;&#x6D01;&#x8868;&#x793A;&#x6CD5;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; sayName: function() {}
    sayName(){}, 
 
    // &#x5C5E;&#x6027;&#x540D;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; lover: &apos;rose&apos;
    [&apos;lo&apos; + &apos;ver&apos;]: &apos;rose&apos;, 
 
    // &#x5C5E;&#x6027;&#x540D;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; sexy: &apos;male&apos;
    [sex]: &apos;male&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> age = <span class="hljs-number">20</span>
<span class="hljs-selector-tag">var</span> sex = <span class="hljs-string">&quot;sexy&quot;</span>
 
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = {
    name: <span class="hljs-string">&apos;jack&apos;</span>,
 
    <span class="hljs-comment">// &#x7B80;&#x6D01;&#x8868;&#x793A;&#x6CD5;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; age: age</span>
    age, 
 
    <span class="hljs-comment">// &#x7B80;&#x6D01;&#x8868;&#x793A;&#x6CD5;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; sayName: function() {}</span>
    sayName(){}, 
 
    <span class="hljs-comment">// &#x5C5E;&#x6027;&#x540D;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; lover: &apos;rose&apos;</span>
    [<span class="hljs-string">&apos;lo&apos;</span> + <span class="hljs-string">&apos;ver&apos;</span>]: <span class="hljs-string">&apos;rose&apos;</span>, 
 
    <span class="hljs-comment">// &#x5C5E;&#x6027;&#x540D;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; sexy: &apos;male&apos;</span>
    [sex]: <span class="hljs-string">&apos;male&apos;</span>
}</code></pre><h2 id="articleHeader5">&#x5DE5;&#x5382;&#x6A21;&#x5F0F;[&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x76F8;&#x4F3C;&#x7684;&#x5BF9;&#x8C61;]</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createPerson (name, age){
    var o = {};
    o.name = name;
    o.age = age;
    o.sayName = function(){
        console.log(this);
    }
    return o;
}

var a = createPerson (&apos;zjj&apos;, 20);
var b = createPerson (&apos;zmf&apos;, 30);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> createPerson (name, age){
    <span class="hljs-keyword">var</span> o = {};
    o.name = name;
    o.age = age;
    o.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    }
    <span class="hljs-keyword">return</span> o;
}

<span class="hljs-keyword">var</span> a = createPerson (<span class="hljs-string">&apos;zjj&apos;</span>, <span class="hljs-number">20</span>);
<span class="hljs-keyword">var</span> b = createPerson (<span class="hljs-string">&apos;zmf&apos;</span>, <span class="hljs-number">30</span>);</code></pre><p><strong>&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x867D;&#x7136;&#x89E3;&#x51B3;&#x591A;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x76F8;&#x4F3C;&#x5BF9;&#x8C61;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x5374;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x5BF9;&#x8C61;&#x8BC6;&#x522B;&#x7684;&#x95EE;&#x9898;&#xFF08;&#x5373;&#x600E;&#x6837;&#x77E5;&#x9053;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x7C7B;&#x578B;&#xFF09;&#x3002;</strong></p><hr><h2 id="articleHeader6">&#x6A21;&#x4EFF;&#x201C;&#x7C7B;&#x201D;&#x7684;&#x8BBE;&#x8BA1;</h2><p><strong>&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person (name, age) {
    this.name = name;
    thia.age = age;
    this.sayName = function() { alert(this.age) }
}
Person.prototype.count = 2;
var a = new Person(&apos;a&apos;, 20)
var b = new Person(&apos;b&apos;, 22)
 
a instanceof Person // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> <span class="hljs-params">(name, age)</span> </span>{
    <span class="hljs-keyword">this</span>.name = name;
    thia.age = age;
    <span class="hljs-keyword">this</span>.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{ alert(<span class="hljs-keyword">this</span>.age) }
}
Person.prototype.count = <span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-number">20</span>)
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-number">22</span>)
 
a <span class="hljs-keyword">instanceof</span> Person <span class="hljs-comment">// true</span></code></pre><ul><li>&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0E;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#x5C31;&#x5728;&#x4E8E;&#x8C03;&#x7528;&#x4ED6;&#x4EEC;&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#x3002;&#x4EFB;&#x4F55;&#x51FD;&#x6570;&#x53EA;&#x8981;&#x901A;&#x8FC7;new &#x64CD;&#x4F5C;&#x7B26;&#x6765;&#x8C03;&#x7528;&#xFF0C;&#x90A3;&#x5B83;&#x5C31;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</li></ul><p><strong>&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;&#x7B26;&#x8C03;&#x7528;&#x51FD;&#x6570;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CO(){  
    this.p = &#x201C;I&#x2019;m in constructed object&#x201D;;  
    this.alertP = function(){  
        alert(this.p);  
    }  
}  

var o2 = new CO();  


var obj = {}; // &#x7B2C;&#x4E00;&#x6B65;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;
obj.__proto__ = CO.prototype; // &#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x94FE;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684; prototype &#x6240;&#x6307;&#x5411;&#x7684;&#x5BF9;&#x8C61;&#x3002;
CO.call(obj); // &#x7B2C;&#x4E09;&#x6B65;&#xFF0C;&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x8D4B;&#x503C;&#x7ED9;&#x65B0;&#x7684;&#x5BF9;&#x8C61;
return obj; // &#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x5BF9;&#x8C61;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CO</span><span class="hljs-params">()</span></span>{  
    <span class="hljs-keyword">this</span>.p = &#x201C;I&#x2019;m <span class="hljs-keyword">in</span> constructed object&#x201D;;  
    <span class="hljs-keyword">this</span>.alertP = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{  
        alert(<span class="hljs-keyword">this</span>.p);  
    }  
}  

<span class="hljs-keyword">var</span> o2 = <span class="hljs-keyword">new</span> CO();  


<span class="hljs-keyword">var</span> obj = {}; <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x6B65;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;</span>
obj.__proto__ = CO.prototype; <span class="hljs-comment">// &#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x94FE;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684; prototype &#x6240;&#x6307;&#x5411;&#x7684;&#x5BF9;&#x8C61;&#x3002;</span>
CO.call(obj); <span class="hljs-comment">// &#x7B2C;&#x4E09;&#x6B65;&#xFF0C;&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x8D4B;&#x503C;&#x7ED9;&#x65B0;&#x7684;&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">return</span> obj; <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x5BF9;&#x8C61;</span></code></pre><hr><p><strong>&#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;new()</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
  this.name = name;
  this.age = age;
}

function New(f) {

  return function() {
    var o = {&quot;__proto__&quot;: f.prototype}
    f.apply(o, arguments);
    return o;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">New</span>(<span class="hljs-params">f</span>) </span>{

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> o = {<span class="hljs-string">&quot;__proto__&quot;</span>: f.prototype}
    f.apply(o, <span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> o;
  }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe69H?w=442&amp;h=316" src="https://static.alili.tech/img/bVbe69H?w=442&amp;h=316" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><hr><blockquote>&#x4E0A;&#x9762;&#x8FD9;&#x79CD;&#x6784;&#x9020;&#x51FD;&#x6570;&#x89E3;&#x51B3;&#x4E86;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x8BC6;&#x522B;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x8981;&#x5728;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E0A;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x4E00;&#x904D;&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;a &#x548C; b &#x90FD;&#x6709;&#x4E2A;&#x540D;&#x4E3A;sayName()&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x867D;&#x7136;&#x540D;&#x5B57;&#x3001;&#x5185;&#x5BB9;&#x3001;&#x529F;&#x80FD;&#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x5374;&#x5206;&#x522B;&#x5728; a &#x548C; b &#x4E2D;&#x90FD;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x8FD9;&#x662F;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x7684;&#x3002;</blockquote><p>&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x5E94;&#x8BE5;&#x662F;&#x5C06;&#x516C;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x653E;&#x5230;&#x4ED6;&#x4EEC;&#x7684;&#x539F;&#x578B;&#x4E0A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x8BF4;&#x7684;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x3002;</p><p><strong>&#x539F;&#x578B;&#x6A21;&#x5F0F;</strong></p><p><strong>&#x6240;&#x6709;&#x51FD;&#x6570;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;&#x7684; prototype&#xFF08;&#x539F;&#x578B;&#xFF09;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x662F;&#x4E00;&#x4E2A;&#x6307;&#x9488;&#xFF0C;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.prototype" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code style="word-break:break-word;white-space:initial"><span class="hljs-type">Person</span>.proto<span class="hljs-keyword">type</span></code></pre><p>&#x8FD4;&#x56DE;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbe5rk?w=649&amp;h=440" src="https://static.alili.tech/img/bVbe5rk?w=649&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><blockquote>&#x4ED4;&#x7EC6;&#x5206;&#x6790;&#x4E0B;&#x9762;&#x7684;&#x56FE;&#xFF0C;&#x5C06;&#x4F1A;&#x52A0;&#x6DF1;&#x4F60;&#x7684;&#x7406;&#x89E3;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbe5Tw?w=398&amp;h=282" src="https://static.alili.tech/img/bVbe5Tw?w=398&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>prototype &#x548C; <strong>proto</strong></strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015951899?w=800&amp;h=782" src="https://static.alili.tech/img/remote/1460000015951899?w=800&amp;h=782" alt="" title="" style="cursor:pointer"></span></p><p>&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;person&#x7C7B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person (name, age) {
    this.name = name;
    thia.age = age;
    this.sayName = function() { alert(this.age) }
}
Person.prototype.count = 2;
var p = new Person(&apos;zjj&apos;, 10);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    thia.age = age;
    <span class="hljs-keyword">this</span>.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ alert(<span class="hljs-keyword">this</span>.age) }
}
Person.prototype.count = <span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;zjj&apos;</span>, <span class="hljs-number">10</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe5UY?w=613&amp;h=203" src="https://static.alili.tech/img/bVbe5UY?w=613&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5BF9;&#x8C61;p&#x6709;&#x4E00;&#x4E2A;__proto__&#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x6307;&#x5411;&#x6784;&#x9020;&#x5668;&#x7684;&#x539F;&#x578B;</p><p><span class="img-wrap"><img data-src="/img/bVbe5UZ?w=574&amp;h=144" src="https://static.alili.tech/img/bVbe5UZ?w=574&amp;h=144" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbe5U5?w=319&amp;h=56" src="https://static.alili.tech/img/bVbe5U5?w=319&amp;h=56" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbe5U7?w=499&amp;h=132" src="https://static.alili.tech/img/bVbe5U7?w=499&amp;h=132" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>p.__proto__ == Person.prototype</strong></p><p><span class="img-wrap"><img data-src="/img/bVbe5Tw?w=398&amp;h=282" src="https://static.alili.tech/img/bVbe5Tw?w=398&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo &#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#xFF08;&#x6784;&#x9020;&#x5668;&#xFF09;
fooObj&#x662F;new foo() &#x4E4B;&#x540E;&#x4EA7;&#x751F;&#x7684;&#x3002;
fooObj&#x7684; __proto__ &#x6307;&#x5411;&#x6784;&#x9020;&#x5668;&#x539F;&#x578B;&#xFF08;foo.prototype&#xFF09;
foo &#x901A;&#x8FC7;prototype &#x6307;&#x5411; &#x6784;&#x9020;&#x5668;&#x539F;&#x578B;&#xFF08;foo.prototype&#xFF09;
&#x6784;&#x9020;&#x5668;&#x539F;&#x578B;&#xFF08;foo.prototype&#xFF09;&#x7684;&#x6784;&#x9020;&#x5668;&#x5C5E;&#x6027;constructor &#x6307;&#x5411; foo" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code>foo &#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#xFF08;&#x6784;&#x9020;&#x5668;&#xFF09;
fooObj&#x662F;<span class="hljs-keyword">new</span> foo() &#x4E4B;&#x540E;&#x4EA7;&#x751F;&#x7684;&#x3002;
fooObj&#x7684; __proto__ &#x6307;&#x5411;&#x6784;&#x9020;&#x5668;&#x539F;&#x578B;&#xFF08;foo.prototype&#xFF09;
foo &#x901A;&#x8FC7;prototype &#x6307;&#x5411; &#x6784;&#x9020;&#x5668;&#x539F;&#x578B;&#xFF08;foo.prototype&#xFF09;
&#x6784;&#x9020;&#x5668;&#x539F;&#x578B;&#xFF08;foo.prototype&#xFF09;&#x7684;&#x6784;&#x9020;&#x5668;&#x5C5E;&#x6027;<span class="hljs-function"><span class="hljs-keyword">constructor</span> &#x6307;&#x5411; <span class="hljs-title">foo</span></span></code></pre><p><strong>Person.__proto__ === Function.prototype</strong></p><p><span class="img-wrap"><img data-src="/img/bVbe5XS?w=706&amp;h=298" src="https://static.alili.tech/img/bVbe5XS?w=706&amp;h=298" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><hr><p><strong>__proto__&#x7A76;&#x7ADF;&#x6307;&#x5411;&#x8C01;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbe5Xr?w=800&amp;h=1562" src="https://static.alili.tech/img/bVbe5Xr?w=800&amp;h=1562" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader7">&#x539F;&#x578B;&#x94FE;</h2><p><strong>&#x7531;&#x4E8E;Person.prototype.__proto__ === Object.prototype&#xFF0C;&#x8FD9;&#x5C31;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbe5X6?w=800&amp;h=632" src="https://static.alili.tech/img/bVbe5X6?w=800&amp;h=632" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbe5YI?w=1092&amp;h=431" src="https://static.alili.tech/img/bVbe5YI?w=1092&amp;h=431" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbe9pn?w=670&amp;h=765" src="https://static.alili.tech/img/bVbe9pn?w=670&amp;h=765" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x76F8;&#x4FE1;&#x770B;&#x4E86;&#x4E0A;&#x9762;&#x4E24;&#x5E45;&#x56FE;&#xFF0C;&#x5927;&#x5BB6;&#x4E00;&#x5B9A;&#x5BF9;&#x539F;&#x578B;&#x94FE;&#x6709;&#x4E86;&#x66F4;&#x6DF1;&#x7684;&#x7406;&#x89E3;&#x548C;&#x8BA4;&#x8BC6;&#x4E86;&#x5427;&#xFF01;&#xFF01;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 对象

## 原文链接
[https://segmentfault.com/a/1190000015949901](https://segmentfault.com/a/1190000015949901)

