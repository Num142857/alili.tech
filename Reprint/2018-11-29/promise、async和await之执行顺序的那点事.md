---
title: 'promise、async和await之执行顺序的那点事' 
date: 2018-11-29 9:33:05
hidden: true
slug: v6dbs3vqvx
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://lvdingjin.github.io/tech/2018/05/27/async-and-await.html" rel="nofollow noreferrer" target="_blank">https://lvdingjin.github.io/tech/2018/05/27/async-and-await.html</a>
</blockquote>
<p>&#x6545;&#x4E8B;&#x8981;&#x4ECE;&#x4E00;&#x9053;&#x4ECA;&#x65E5;&#x5934;&#x6761;&#x7684;&#x7B14;&#x8BD5;&#x9898;&#x8BF4;&#x8D77;&#xFF5E; <br>&#x9898;&#x76EE;&#x6765;&#x6E90;&#xFF1A;<a href="https://juejin.im/post/5b03e79951882542891913e8" rel="nofollow noreferrer" target="_blank">&#x534A;&#x5E74;&#x5DE5;&#x4F5C;&#x7ECF;&#x9A8C;&#x4ECA;&#x65E5;&#x5934;&#x6761;&#x548C;&#x7F8E;&#x56E2;&#x9762;&#x8BD5;&#x9898;&#x9762;&#x7ECF;&#x5206;&#x4EAB;&#xFF01;&#xFF01;&#xFF01;&#xFF01;&#xFF01;</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function async1(){
    console.log(&apos;async1 start&apos;)
    await async2()
    console.log(&apos;async1 end&apos;)
}
async function async2(){
    console.log(&apos;async2&apos;)
}
console.log(&apos;script start&apos;)
setTimeout(function(){
    console.log(&apos;setTimeout&apos;) 
},0)  
async1();
new Promise(function(resolve){
    console.log(&apos;promise1&apos;)
    resolve();
}).then(function(){
    console.log(&apos;promise2&apos;)
})
console.log(&apos;script end&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;async1 start&apos;</span>)
    <span class="hljs-keyword">await</span> async2()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;async1 end&apos;</span>)
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;async2&apos;</span>)
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;script start&apos;</span>)
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setTimeout&apos;</span>) 
},<span class="hljs-number">0</span>)  
async1();
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;promise1&apos;</span>)
    resolve();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;promise2&apos;</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;script end&apos;</span>)</code></pre>
<p>&#x6C42;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</p>
<p>&#x76F8;&#x4FE1;&#x662F;&#x4E2A;&#x524D;&#x7AEF;&#x90FD;&#x77E5;&#x9053;&#x5566;&#xFF0C;&#x8FD9;&#x9053;&#x9898;&#x76EE;&#x8003;&#x7684;&#x5C31;&#x662F;js&#x91CC;&#x9762;&#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x548C;&#x56DE;&#x8C03;&#x961F;&#x5217;&#x54AF;&#xFF5E;<br>&#x4ECA;&#x5929;&#x9898;&#x4E3B;&#x5047;&#x8BBE;&#x770B;&#x5BA2;&#x90FD;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;&#x4E86;setTimeout&#x662F;&#x5B8F;&#x4EFB;&#x52A1;&#x4F1A;&#x5728;&#x6700;&#x540E;&#x6267;&#x884C;&#x7684;&#x524D;&#x63D0;&#xFF08;&#x56E0;&#x4E3A;&#x5B83;&#x4E0D;&#x662F;&#x4ECA;&#x5929;&#x8981;&#x8BA8;&#x8BBA;&#x7684;&#x91CD;&#x70B9;&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x6765;&#x8BB2;&#x8BB2;<strong>promise</strong>&#x3001;<strong>async</strong>&#x548C;<strong>await</strong>&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x3002;</p>
<p>&#x5148;&#x4E0A;&#x6B63;&#x786E;&#x7B54;&#x6848;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="script start
async1 start
async2
promise1
script end
promise2
async1 end
setTimeout" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">script</span> start
async1 start
async2
promise1
<span class="hljs-keyword">script</span> <span class="hljs-keyword">end</span>
promise2
async1 <span class="hljs-keyword">end</span>
setTimeout</code></pre>
<p>&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x6CA1;&#x6709;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6267;&#x884C;&#x6253;&#x5370;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x5B83;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x8F93;&#x51FA;&#x7684;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="script start
async1 start
async2
async1 end
promise1
script end
promise2
setTimeout" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">script</span> start
async1 start
async2
async1 <span class="hljs-keyword">end</span>
promise1
<span class="hljs-keyword">script</span> <span class="hljs-keyword">end</span>
promise2
setTimeout</code></pre>
<p>&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x6837;&#x8BA4;&#x4E3A;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#xFF08;&#x7C97;&#x6D45;&#x5730;&#xFF09;&#x77E5;&#x9053;await&#x4E4B;&#x540E;&#x7684;&#x8BED;&#x53E5;&#x4F1A;&#x7B49;await&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x5F97;&#x5230;&#x7ED3;&#x679C;&#x540E;&#xFF0C;&#x624D;&#x4F1A;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x3002;</p>
<p><strong>MDN</strong>&#x662F;&#x8FD9;&#x6837;&#x63CF;&#x8FF0;await&#x7684;&#xFF1A;</p>
<blockquote>async &#x51FD;&#x6570;&#x4E2D;&#x53EF;&#x80FD;&#x4F1A;&#x6709; await &#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8FD9;&#x4F1A;&#x4F7F; async &#x51FD;&#x6570;&#x6682;&#x505C;&#x6267;&#x884C;&#xFF0C;&#x7B49;&#x5F85;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684; Promise &#x89E3;&#x6790;&#x5B8C;&#x6210;&#x540E;&#x7EE7;&#x7EED;&#x6267;&#x884C; async &#x51FD;&#x6570;&#x5E76;&#x8FD4;&#x56DE;&#x89E3;&#x51B3;&#x7ED3;&#x679C;&#x3002;</blockquote>
<p>&#x4F1A;&#x8BA4;&#x4E3A;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x662F;&#x4EE5;&#x4E0A;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x771F;&#x6B63;&#x7406;&#x89E3;&#x8FD9;&#x53E5;&#x8BDD;&#x7684;&#x542B;&#x4E49;&#x3002;</p>
<p>&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x89E3;&#x91CA;&#x6211;&#x89C9;&#x5F97;&#x66F4;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#xFF1A;</p>
<blockquote>async &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x65E6;&#x9047;&#x5230; await &#x5C31;&#x4F1A;&#x5148;&#x8FD4;&#x56DE;&#xFF0C;&#x7B49;&#x5230;&#x89E6;&#x53D1;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#xFF0C;&#x518D;&#x63A5;&#x7740;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x540E;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x3002;</blockquote>
<p>&#x5BF9;&#x5566;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#xFF0C;MDN&#x63CF;&#x8FF0;&#x7684;&#x6682;&#x505C;&#x6267;&#x884C;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x662F;<strong>&#x8BA9;&#x51FA;&#x4E86;&#x7EBF;&#x7A0B;&#xFF08;&#x8DF3;&#x51FA;async&#x51FD;&#x6570;&#x4F53;&#xFF09;</strong>&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x540E;&#x9762;&#x7684;&#x811A;&#x672C;&#x7684;&#x3002;&#x8FD9;&#x6837;&#x4E00;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x660E;&#x767D;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x518D;&#x770B;&#x770B;&#x4E0A;&#x9762;&#x90A3;&#x9053;&#x9898;&#xFF0C;&#x6309;&#x7167;&#x8FD9;&#x6837;&#x63CF;&#x8FF0;&#x90A3;&#x4E48;&#x4ED6;&#x7684;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5C31;&#x5E94;&#x8BE5;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">script</span> start
async1 start
async2
promise1
<span class="hljs-keyword">script</span> <span class="hljs-keyword">end</span>
async1 <span class="hljs-keyword">end</span>
promise2
setTimeout</code></pre>
<p>&#x597D;&#x50CF;&#x54EA;&#x91CC;&#x4E0D;&#x592A;&#x5BF9;&#xFF1F;&#x5BF9;&#x6BD4;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x7684;&#x6B63;&#x786E;&#x7ED3;&#x679C;&#xFF0C;&#x54A6;&#xFF5E;&#x6709;&#x4E24;&#x53E5;&#x8F93;&#x51FA;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x5440;&#xFF01;&#xFF01;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async1 end
promise2" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ada"><code>async1 <span class="hljs-keyword">end</span>
promise2</code></pre>
<p>&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8FD9;&#x6837;&#x5462;&#xFF1F;&#x8FD9;&#x4E5F;&#x662F;&#x8FD9;&#x9053;&#x9898;&#x76EE;&#x6700;&#x96BE;&#x7406;&#x89E3;&#x7684;&#x4E00;&#x4E2A;&#x5730;&#x65B9;&#x3002;&#x8981;&#x641E;&#x660E;&#x767D;&#x8FD9;&#x4E2A;&#x4E8B;&#x60C5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x6765;&#x56DE;&#x987E;&#x4E00;&#x4E9B;&#x6982;&#x5FF5;&#xFF1A;</p>
<h3 id="articleHeader0">async</h3>
<blockquote>async function &#x58F0;&#x660E;&#x5C06;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE; AsyncFunction &#x5BF9;&#x8C61;&#x7684;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x3002;<p>&#x5F53;&#x8C03;&#x7528;&#x4E00;&#x4E2A; async &#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#x3002;&#x5F53;&#x8FD9;&#x4E2A; async &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x503C;&#x65F6;&#xFF0C;Promise &#x7684; resolve &#x65B9;&#x6CD5;&#x4F1A;&#x8D1F;&#x8D23;&#x4F20;&#x9012;&#x8FD9;&#x4E2A;&#x503C;&#xFF1B;&#x5F53; async &#x51FD;&#x6570;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x65F6;&#xFF0C;Promise &#x7684; reject &#x65B9;&#x6CD5;&#x4E5F;&#x4F1A;&#x4F20;&#x9012;&#x8FD9;&#x4E2A;&#x5F02;&#x5E38;&#x503C;&#x3002;</p>
</blockquote>
<p>&#x6240;&#x4EE5;&#x4F60;&#x73B0;&#x5728;&#x77E5;&#x9053;&#x54AF;&#xFF0C;&#x4F7F;&#x7528; <strong>async</strong> &#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x5B83;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x5B83;&#x8FD4;&#x56DE;&#x7684;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;&#x3002;<br><br>&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x770B; <strong>await</strong> &#x8868;&#x8FBE;&#x5F0F;&#x6267;&#x884C;&#x4F1A;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x503C;&#x3002;</p>
<h3 id="articleHeader1">await</h3>
<blockquote>&#x8BED;&#x6CD5;&#xFF1A;[return_value] = await expression;<p>&#x8868;&#x8FBE;&#x5F0F;&#xFF08;express&#xFF09;&#xFF1A;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#x6216;&#x8005;&#x4EFB;&#x4F55;&#x8981;&#x7B49;&#x5F85;&#x7684;&#x503C;&#x3002;</p>
<p>&#x8FD4;&#x56DE;&#x503C;&#xFF08;return_value&#xFF09;&#xFF1A;&#x8FD4;&#x56DE; Promise &#x5BF9;&#x8C61;&#x7684;<strong>&#x5904;&#x7406;&#x7ED3;&#x679C;</strong>&#x3002;&#x5982;&#x679C;&#x7B49;&#x5F85;&#x7684;&#x4E0D;&#x662F; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x503C;&#x672C;&#x8EAB;&#x3002;</p>
</blockquote>
<p>&#x6240;&#x4EE5;&#xFF0C;&#x5F53;await&#x64CD;&#x4F5C;&#x7B26;&#x540E;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x662F;&#x4E00;&#x4E2A;Promise&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;Promise&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;resolve&#x7684;&#x53C2;&#x6570;&#x3002;</p>
<p>&#x660E;&#x767D;&#x4E86;&#x8FD9;&#x4E24;&#x4E2A;&#x4E8B;&#x60C5;&#x540E;&#xFF0C;&#x6211;&#x8FD8;&#x8981;&#x518D;&#x5570;&#x55E6;&#x4E24;&#x53E5;&#x3002;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;Promise&#x662F;&#x4E00;&#x4E2A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x4ED6;&#x7684;&#x6210;&#x529F;&#xFF08;&#x6216;&#x5931;&#x8D25;&#xFF1A;reject&#xFF09;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;resolve&#x5374;&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x3002;<strong>&#x5F53;&#x6267;&#x884C;&#x5230;resolve()&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x4EFB;&#x52A1;&#x4F1A;&#x88AB;&#x653E;&#x5165;&#x5230;&#x56DE;&#x8C03;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x7B49;&#x5F85;&#x8C03;&#x7528;&#x6808;&#x6709;&#x7A7A;&#x95F2;&#x65F6;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x518D;&#x6765;&#x53D6;&#x8D70;&#x5B83;&#x3002;</strong></p>
<h4>&#x7EC8;&#x4E8E;&#x8FDB;&#x5165;&#x6B63;&#x6587;&#xFF1A;&#x89E3;&#x9898;</h4>
<p>&#x597D;&#x4E86;&#x94FA;&#x57AB;&#x5B8C;&#x8FD9;&#x4E9B;&#x6982;&#x5FF5;&#xFF0C;&#x6211;&#x4EEC;&#x56DE;&#x8FC7;&#x5934;&#x770B;&#x4E0A;&#x9762;&#x90A3;&#x9053;&#x9898;&#x76EE;&#x56F0;&#x60D1;&#x7684;&#x90A3;&#x4E24;&#x53E5;&#x5173;&#x952E;&#x7684;&#x5730;&#x65B9;&#xFF08;&#x5EFA;&#x8BAE;&#x4E00;&#x8FB9;&#x5BF9;&#x7740;&#x9898;&#x76EE;&#x4E00;&#x8FB9;&#x770B;&#x89E3;&#x6790;&#x6211;&#x6015;&#x6211;&#x8BB2;&#x7684;&#x592A;&#x5FEB;&#x4F60;&#x8DDF;&#x4E0D;&#x4E0A;&#x554A;&#x54C8;&#x54C8;&#x1F602;&#xFF09;&#x3002;</p>
<p>&#x6267;&#x884C;&#x5230; async1 &#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x9996;&#x5148;&#x4F1A;&#x6253;&#x5370;&#x51FA;&#x201C;async1 start&#x201D;&#xFF08;&#x8FD9;&#x4E2A;&#x4E0D;&#x7528;&#x591A;&#x8BF4;&#x4E86;&#x5427;&#xFF0C;async &#x8868;&#x8FBE;&#x5F0F;&#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#xFF09;&#xFF1B;</p>
<p>&#x7136;&#x540E;&#x6267;&#x884C;&#x5230; await async2()&#xFF0C;&#x53D1;&#x73B0; async2 &#x4E5F;&#x662F;&#x4E2A; async &#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x4E86;&#x201C;console.log(&apos;async2&apos;)&#x201D;&#xFF0C;&#x540C;&#x65F6;async2&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;Promise&#xFF0C;<strong>&#x5212;&#x91CD;&#x70B9;&#xFF1A;&#x6B64;&#x65F6;&#x8FD4;&#x56DE;&#x7684;Promise&#x4F1A;&#x88AB;&#x653E;&#x5165;&#x5230;&#x56DE;&#x8C03;&#x961F;&#x5217;&#x4E2D;&#x7B49;&#x5F85;&#xFF0C;await&#x4F1A;&#x8BA9;&#x51FA;&#x7EBF;&#x7A0B;&#xFF08;js&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x8FD8;&#x7528;&#x6211;&#x4ECB;&#x7ECD;&#x5417;&#xFF09;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x4F1A;&#x8DF3;&#x51FA; async1&#x51FD;&#x6570; &#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x6267;&#x884C;&#x3002;</strong></p>
<p>&#x7136;&#x540E;&#x6267;&#x884C;&#x5230; new Promise&#xFF0C;&#x524D;&#x9762;&#x8BF4;&#x8FC7;&#x4E86;promise&#x662F;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5148;&#x6253;&#x5370;&#x51FA;&#x6765;&#x201C;promise1&#x201D;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;&#x5230; resolve &#x7684;&#x65F6;&#x5019;&#xFF0C;resolve&#x8FD9;&#x4E2A;&#x4EFB;&#x52A1;&#x5C31;&#x88AB;&#x653E;&#x5230;&#x56DE;&#x8C03;&#x961F;&#x5217;&#x4E2D;&#xFF08;&#x524D;&#x9762;&#x90FD;&#x8BB2;&#x8FC7;&#x4E86;&#x4E0A;&#x8BFE;&#x8981;&#x597D;&#x597D;&#x542C;&#x554A;&#x5582;&#xFF09;&#x7B49;&#x5F85;&#xFF0C;&#x7136;&#x540E;&#x8DF3;&#x51FA;Promise&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x6267;&#x884C;&#xFF0C;&#x8F93;&#x51FA;&#x201C;script end&#x201D;&#x3002;</p>
<p>&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x91CD;&#x5934;&#x620F;&#x3002;&#x540C;&#x6B65;&#x7684;&#x4E8B;&#x4EF6;&#x90FD;&#x5FAA;&#x73AF;&#x6267;&#x884C;&#x5B8C;&#x4E86;&#xFF0C;&#x8C03;&#x7528;&#x6808;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x7A7A;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x5C31;&#x4F1A;&#x53BB;&#x56DE;&#x8C03;&#x961F;&#x5217;&#x91CC;&#x9762;&#x53D6;&#x4EFB;&#x52A1;&#x7EE7;&#x7EED;&#x653E;&#x5230;&#x8C03;&#x7528;&#x6808;&#x91CC;&#x9762;&#x4E86;&#x3002;</p>
<p>&#x8FD9;&#x65F6;&#x5019;&#x53D6;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x5C31;&#x662F;&#x524D;&#x9762; async1 &#x653E;&#x8FDB;&#x53BB;&#x7684;Promise&#xFF0C;&#x6267;&#x884C;Promise&#x65F6;&#x53D1;&#x73B0;&#x53C8;&#x9047;&#x5230;&#x4E86;&#x4ED6;&#x7684;&#x771F;&#x547D;&#x5929;&#x5B50;resolve&#x51FD;&#x6570;&#xFF0C;<strong>&#x5212;&#x91CD;&#x70B9;&#xFF1A;&#x8FD9;&#x4E2A;resolve&#x53C8;&#x4F1A;&#x88AB;&#x653E;&#x5165;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x7EE7;&#x7EED;&#x7B49;&#x5F85;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6B21;&#x8DF3;&#x51FA; async1&#x51FD;&#x6570; &#x7EE7;&#x7EED;&#x4E0B;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#x3002;</strong></p>
<p>&#x63A5;&#x4E0B;&#x6765;&#x53D6;&#x5230;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x5C31;&#x662F;&#x524D;&#x9762; new Promise &#x653E;&#x8FDB;&#x53BB;&#x7684; <strong>resolve&#x56DE;&#x8C03;</strong> &#x5566; yohoo&#xFF5E;&#x8FD9;&#x4E2A;resolve&#x88AB;&#x653E;&#x5230;&#x8C03;&#x7528;&#x6808;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x8F93;&#x51FA;&#x201C;promise2&#x201D;&#xFF0C;&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x53D6;&#x4E0B;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#x3002;</p>
<p>&#x540E;&#x9762;&#x7684;&#x4E8B;&#x60C5;&#x76F8;&#x4FE1;&#x4F60;&#x5DF2;&#x7ECF;&#x731C;&#x5230;&#x4E86;&#xFF0C;&#x6CA1;&#x9519;&#x8C03;&#x7528;&#x6808;&#x518D;&#x6B21;&#x7A7A;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x5C31;&#x53D6;&#x5230;&#x4E86;&#x4E0B;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF1A;<strong>&#x5386;&#x7ECF;&#x5343;&#x8F9B;&#x4E07;&#x82E6;&#x7EC8;&#x4E8E;&#x8F6E;&#x5230;&#x7684;&#x90A3;&#x4E2A;Promise&#x7684;resolve&#x56DE;&#x8C03;&#xFF01;&#xFF01;&#xFF01;</strong>&#x6267;&#x884C;&#x5B83;&#xFF08;&#x5565;&#x4E5F;&#x4E0D;&#x4F1A;&#x6253;&#x5370;&#x7684;&#xFF0C;&#x56E0;&#x4E3A; async2 &#x5E76;&#x6CA1;&#x6709;return&#x4E1C;&#x897F;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;resolve&#x7684;&#x53C2;&#x6570;&#x662F;undefined&#xFF09;&#xFF0C;&#x6B64;&#x65F6; await &#x5B9A;&#x4E49;&#x7684;&#x8FD9;&#x4E2A; Promise &#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x4E86;&#x7ED3;&#x679C;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x6267;&#x884C; async1&#x51FD;&#x6570; &#x540E;&#x9762;&#x7684;&#x4EFB;&#x52A1;&#x4E86;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x201C;console.log(&apos;async1 end&apos;)&#x201D;&#x3002;</p>
<p>&#x8C1C;&#x4E4B;&#x56F0;&#x60D1;&#x7684;&#x90A3;&#x4E24;&#x53E5;&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF08;&#x201C;promise2&#x201D;&#x3001;&#x201C;async1 end&#x201D;&#xFF09;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x6765;&#x7684;&#xFF5E;</p>
<h3 id="articleHeader2">&#x603B;&#x7ED3;</h3>
<p>&#x603B;&#x7ED3;&#x4E0B;&#x6765;&#x8FD9;&#x9053;&#x9898;&#x76EE;&#x8003;&#x7684;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x70B9;&#xFF1A;</p>
<ol>
<li>&#x8C03;&#x7528;&#x6808;</li>
<li>&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</li>
<li>&#x4EFB;&#x52A1;&#x961F;&#x5217;</li>
<li>promise&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6267;&#x884C;</li>
<li>async&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8FD4;&#x56DE;&#x503C;</li>
<li>await&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x4F5C;&#x7528;&#x548C;&#x8FD4;&#x56DE;&#x503C;</li>
</ol>
<p>&#x7406;&#x89E3;&#x4E86;&#x8FD9;&#x4E9B;&#xFF0C;&#x81EA;&#x7136;&#x5C31;&#x660E;&#x767D;&#x4E86;&#x4E3A;&#x4EC0;&#x4E48;&#x7B54;&#x6848;&#x662F;&#x8FD9;&#x6837;&#xFF08;&#x7B54;&#x51FA;&#x7B14;&#x8BD5;&#x9898;&#x8FD8;&#x8981;&#x5206;&#x6790;&#x7ED9;&#x9762;&#x8BD5;&#x5B98;&#x539F;&#x56E0;&#x54C8;&#x54C8;&#x54C8;&#xFF09;&#xFF5E;</p>
<p>&#x5173;&#x4E8E;<strong>&#x8C03;&#x7528;&#x6808;&#x3001;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x3001;&#x4EFB;&#x52A1;&#x961F;&#x5217;</strong>&#x53EF;&#x4EE5;<a href="https://github.com/xitu/gold-miner/blob/master/TODO/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with.md" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x8FD9;&#x91CC;</a>&#x4E86;&#x89E3;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x63CF;&#x8FF0;&#x3002;<br><br>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x76F4;&#x63A5;&#x8D34;&#x56FE;:<br><span class="img-wrap"><img data-src="/img/remote/1460000015057283?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000015057283?w=800&amp;h=600" alt="tupian" title="tupian" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5173;&#x4E8E;async&#x548C;await&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;<a href="https://segmentfault.com/a/1190000011296839">&#x8FD9;&#x91CC;</a>&#x4E5F;&#x6709;&#x5F88;&#x8BE6;&#x7EC6;&#x7684;&#x5206;&#x6790;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF5E;</p>
<p>&#x8D44;&#x6599;&#x53C2;&#x8003;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000011296839" target="_blank">https://segmentfault.com/a/1190000011296839</a><br><a href="https://github.com/xitu/gold-miner/blob/master/TODO/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with.md" rel="nofollow noreferrer" target="_blank">https://github.com/xitu/gold-miner/blob/master/TODO/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with.md</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
promise、async和await之执行顺序的那点事

## 原文链接
[https://segmentfault.com/a/1190000015057278](https://segmentfault.com/a/1190000015057278)

