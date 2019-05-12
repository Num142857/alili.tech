---
title: '理解async/await' 
date: 2018-11-24 2:30:10
hidden: true
slug: fyg1qv6pczk
categories: [reprint]
---

{{< raw >}}
<p>&#x9996;&#x5148;&#x660E;&#x786E;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48; <code>Node.js</code> &#x9700;&#x8981;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#xFF1F;</p><p><code>JavaScript</code> &#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x5728;&#x53D1;&#x51FA;&#x4E00;&#x4E2A;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x5728;&#x6CA1;&#x6709;&#x5F97;&#x5230;&#x7ED3;&#x679C;&#x4E4B;&#x524D;&#xFF0C;&#x8BE5;&#x8C03;&#x7528;&#x5C31;&#x4E0D;&#x8FD4;&#x56DE;&#xFF0C;&#x610F;&#x601D;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x8005;&#x4E3B;&#x52A8;&#x7B49;&#x5F85;&#x8C03;&#x7528;&#x7ED3;&#x679C;&#xFF0C;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;&#x5FC5;&#x987B;&#x7B49;&#x5F85;&#x4E0A;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x5B8C;&#x624D;&#x80FD;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x8FD9;&#x79CD;&#x6267;&#x884C;&#x6A21;&#x5F0F;&#x53EB;&#xFF1A;<strong>&#x540C;&#x6B65;</strong>&#x3002;<br><code>Node.js</code> &#x7684;&#x4E3B;&#x8981;&#x5E94;&#x7528;&#x573A;&#x666F;&#x662F;&#x5904;&#x7406;&#x9AD8;&#x5E76;&#x53D1;&#xFF08;&#x5355;&#x4F4D;&#x65F6;&#x95F4;&#x5185;&#x6781;&#x5927;&#x7684;&#x8BBF;&#x95EE;&#x91CF;&#xFF09;&#x548C; <code>I/O</code> &#x5BC6;&#x96C6;&#x573A;&#x666F;&#xFF08;ps: <code>I/O</code> &#x64CD;&#x4F5C;&#x5F80;&#x5F80;&#x975E;&#x5E38;&#x8017;&#x65F6;&#xFF0C;&#x6240;&#x4EE5;&#x5F02;&#x6B65;&#x7684;&#x5173;&#x952E;&#x5728;&#x4E8E;&#x89E3;&#x51B3; <code>I/O</code> &#x8017;&#x65F6;&#x95EE;&#x9898;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x91C7;&#x7528;&#x540C;&#x6B65;&#x7F16;&#x7A0B;&#xFF0C;&#x95EE;&#x9898;&#x5C31;&#x6765;&#x4E86;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x5904;&#x7406;&#x4E00;&#x4E2A; <code>I/O</code> &#x8BF7;&#x6C42;&#x9700;&#x8981;&#x5927;&#x91CF;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x8BF7;&#x6C42;&#x90FD;&#x5C06;&#x6392;&#x961F;&#xFF0C;&#x9020;&#x6210;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;&#x5361;&#x987F;&#x3002;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x80FD;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;<br>&#x6240;&#x8C13;<strong>&#x5F02;&#x6B65;</strong>&#xFF0C;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x5728;&#x53D1;&#x51FA;&#x540E;&#xFF0C;&#x8FD9;&#x4E2A;&#x8C03;&#x7528;&#x5C31;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E86;&#xFF0C;&#x8C03;&#x7528;&#x8005;&#x4E0D;&#x4F1A;&#x7ACB;&#x5373;&#x5F97;&#x5230;&#x7ED3;&#x679C;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#xFF0C;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x540E;&#x7EED;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x88AB;&#x8C03;&#x7528;&#x8005;&#x6267;&#x884C;&#x5F97;&#x5230;&#x7ED3;&#x679C;&#x540E;&#x901A;&#x8FC7;&#x72B6;&#x6001;&#x3001;&#x4E8B;&#x4EF6;&#x6765;&#x901A;&#x77E5;&#x8C03;&#x7528;&#x8005;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF08; <code>callback</code>&#xFF09;&#x6765;&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x7ED3;&#x679C;&#x3002;Node&#x5728;&#x5904;&#x7406;&#x8017;&#x65F6;&#x7684; <code>I/O</code> &#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x5C06;&#x5176;&#x4EA4;&#x7ED9;&#x5176;&#x4ED6;&#x7EBF;&#x7A0B;&#x5904;&#x7406;&#xFF0C;&#x81EA;&#x5DF1;&#x7EE7;&#x7EED;&#x5904;&#x7406;&#x5176;&#x4ED6;&#x8BBF;&#x95EE;&#x8BF7;&#x6C42;&#xFF0C;&#x5F53; <code>I/O</code> &#x64CD;&#x4F5C;&#x5904;&#x7406;&#x597D;&#x540E;&#x5C31;&#x4F1A;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x901A;&#x77E5; Node &#x7528;&#x56DE;&#x8C03;&#x505A;&#x540E;&#x7EED;&#x5904;&#x7406;&#x3002;<br>&#x6709;&#x4E2A;&#x4F8B;&#x5B50;&#x975E;&#x5E38;&#x597D;&#xFF1A;</p><blockquote>&#x4F60;&#x6253;&#x7535;&#x8BDD;&#x95EE;&#x4E66;&#x5E97;&#x8001;&#x677F;&#x6709;&#x6CA1;&#x6709;&#x300A;&#x5206;&#x5E03;&#x5F0F;&#x7CFB;&#x7EDF;&#x300B;&#x8FD9;&#x672C;&#x4E66;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x540C;&#x6B65;&#x901A;&#x4FE1;&#x673A;&#x5236;&#xFF0C;&#x4E66;&#x5E97;&#x8001;&#x677F;&#x4F1A;&#x8BF4;&#xFF0C;&#x4F60;&#x7A0D;&#x7B49;&#xFF0C;&#x201D;&#x6211;&#x67E5;&#x4E00;&#x4E0B;&quot;&#xFF0C;&#x7136;&#x540E;&#x5F00;&#x59CB;&#x67E5;&#x554A;&#x67E5;&#xFF0C;&#x7B49;&#x67E5;&#x597D;&#x4E86;&#xFF08;&#x53EF;&#x80FD;&#x662F;5&#x79D2;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x5929;&#xFF09;&#x544A;&#x8BC9;&#x4F60;&#x7ED3;&#x679C;&#xFF08;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF09;&#x3002;&#x800C;&#x5F02;&#x6B65;&#x901A;&#x4FE1;&#x673A;&#x5236;&#xFF0C;&#x4E66;&#x5E97;&#x8001;&#x677F;&#x76F4;&#x63A5;&#x544A;&#x8BC9;&#x4F60;&#x6211;&#x67E5;&#x4E00;&#x4E0B;&#x554A;&#xFF0C;&#x67E5;&#x597D;&#x4E86;&#x6253;&#x7535;&#x8BDD;&#x7ED9;&#x4F60;&#xFF0C;&#x7136;&#x540E;&#x76F4;&#x63A5;&#x6302;&#x7535;&#x8BDD;&#x4E86;&#xFF08;&#x4E0D;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF09;&#x3002;&#x7136;&#x540E;&#x67E5;&#x597D;&#x4E86;&#xFF0C;&#x4ED6;&#x4F1A;&#x4E3B;&#x52A8;&#x6253;&#x7535;&#x8BDD;&#x7ED9;&#x4F60;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#x8001;&#x677F;&#x901A;&#x8FC7;&#x201C;&#x56DE;&#x7535;&#x201D;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x56DE;&#x8C03;&#x3002;</blockquote><p>&#x4E0B;&#x9762;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#x662F;&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x7684;&#x8FDB;&#x5316;&#x8FC7;&#x7A0B;&#xFF1A;</p><h3 id="articleHeader0">CallBacks</h3><p>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x51FD;&#x6570;A&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;B&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x672A;&#x6765;&#x67D0;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x88AB;&#x8C03;&#x7528;&#x3002;callback&#x7684;&#x5F02;&#x6B65;&#x6A21;&#x5F0F;&#x6700;&#x5927;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#xFF0C;&#x7406;&#x89E3;&#x56F0;&#x96BE;&#x52A0;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#xFF08;callback hell&#xFF09;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A();
ajax(&apos;url1&apos;, function(){
    B();
    ajax(&apos;url2&apos;, function(){
        C();
    }
    D();
});
E();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript">A();
ajax(<span class="hljs-string">&apos;url1&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    B();
    ajax(<span class="hljs-string">&apos;url2&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        C();
    }
    D();
});
E();</code></pre><p>&#x5176;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E3A;&#xFF1A;<code>A =&gt; E =&gt; B =&gt; D =&gt; C</code>&#xFF0C;&#x8FD9;&#x79CD;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x7684;&#x786E;&#x4F1A;&#x8BA9;&#x4EBA;&#x5934;&#x8111;&#x53D1;&#x660F;&#xFF0C;&#x53E6;&#x5916;&#x7531;&#x4E8E;&#x7531;&#x4E8E;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x4E4B;&#x95F4;&#x5F80;&#x5F80;&#x4F1A;&#x8026;&#x5408;&#xFF0C;&#x53EA;&#x8981;&#x4E2D;&#x95F4;&#x4E00;&#x4E2A;&#x64CD;&#x4F5C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#xFF0C;&#x90A3;&#x4E48;&#x5B83;&#x7684;&#x4E0A;&#x5C42;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x548C;&#x4E0B;&#x5C42;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x90FD;&#x53EF;&#x80FD;&#x8981;&#x4FEE;&#x6539;&#xFF0C;&#x8FD9;&#x5C31;&#x9677;&#x5165;&#x4E86;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x3002;&#x800C; Promise &#x5BF9;&#x8C61;&#x5C31;&#x5F88;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x4E86;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x4E4B;&#x95F4;&#x7684;&#x8026;&#x5408;&#x95EE;&#x9898;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;&#x540C;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5199;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader1">Promise</h3><p><code>Promise</code> &#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x751F;&#x6210;<code>promise</code>&#x5B9E;&#x4F8B;&#x3002;<code>Promise</code> &#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF1A;<code>pending&#xFF0C;resolved</code>&#xFF08;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F;&#x7531; <code>pending</code>&#x53D8;&#x4E3A; <code>resolved</code>&#xFF09;&#xFF0C;<code>rejected</code>&#xFF08;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5931;&#x8D25;&#x7531; <code>pending</code>&#x53D8;&#x4E3A; <code>rejected</code>&#xFF09;&#xFF0C;&#x4E00;&#x65E6;&#x53D8;&#x4E3A;&#x540E;&#x4E24;&#x79CD;&#x72B6;&#x6001;&#x5C06;&#x4E0D;&#x4F1A;&#x518D;&#x6539;&#x53D8;&#x3002;<code>Promise</code>&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53C8;&#x63A5;&#x53D7; <code>resolve</code> &#x548C;<code>reject</code> &#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x505A;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x662F;JS&#x5185;&#x7F6E;&#x7684;&#xFF0C;&#x65E0;&#x9700;&#x914D;&#x7F6E;&#x3002;<code>resolve</code> &#x51FD;&#x6570;&#x5728;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F;&#x540E;&#x8C03;&#x7528;&#xFF0C;&#x5C06;<code>pending</code>&#x72B6;&#x6001;&#x53D8;&#x4E3A;<code>resolved</code>&#xFF0C;&#x5E76;&#x5C06;&#x5B83;&#x7684;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF1B;<code>reject</code> &#x51FD;&#x6570;&#x5728;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5931;&#x8D25;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x5C06;<code>pending</code>&#x72B6;&#x6001;&#x53D8;&#x4E3A;<code>rejected</code>&#xFF0C;&#x5E76;&#x5C06;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><ul><li><h4>Promise.prototype.then()</h4></li></ul><p><code>Promise</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;<code>then</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x662F; <code>resolved</code> &#x72B6;&#x6001;&#x548C; <code>rejected</code> &#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x8FD9;&#x4E24;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570;&#x5206;&#x522B;&#x662F;<code>Promise</code>&#x5B9E;&#x4F8B;&#x4E2D;<code>resolve</code>&#x51FD;&#x6570;&#x548C;<code>reject</code><strong>&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x53C2;&#x6570;</strong>&#x3002; &#x53E6;&#x5916;<code>rejected</code>&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x53EF;&#x7701;&#x7565;&#x7684;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const instance = new Promise((resolve, reject) =&gt; {
    // &#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;
    if(/*&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F;*/) {
      resolve(value);
    } else {
      reject(error);
    }
  }
})
instance.then(value =&gt; {
  // do something...
}, error =&gt; {
  // do something...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> instance = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">// &#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-comment">/*&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F;*/</span>) {
      resolve(value);
    } <span class="hljs-keyword">else</span> {
      reject(error);
    }
  }
})
instance.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-comment">// do something...</span>
}, error =&gt; {
  <span class="hljs-comment">// do something...</span>
})</code></pre><p>&#x6CE8;&#x610F;Promise&#x5B9E;&#x4F8B;&#x5728;&#x751F;&#x6210;&#x540E;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x800C; <code>then</code>&#x65B9;&#x6CD5;&#x53EA;&#x6709;&#x5728;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x5B8C;&#x540E;&#x624D;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x770B;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise((resolve, reject) =&gt; {
  console.log(&apos;async task begins!&apos;);
  setTimeout(() =&gt; {
    resolve(&apos;done, pending -&gt; resolved!&apos;);
  }, 1000);
})

promise.then(value =&gt; {
  console.log(value);
}) 

console.log(&apos;1.please wait&apos;);
console.log(&apos;2.please wait&apos;);
console.log(&apos;3.please wait&apos;);
// async task begins!
// 1.please wait
// 2.please wait
// 3.please wait
// done, pending -&gt; resolved!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;async task begins!&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-string">&apos;done, pending -&gt; resolved!&apos;</span>);
  }, <span class="hljs-number">1000</span>);
})

promise.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(value);
}) 

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1.please wait&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;2.please wait&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;3.please wait&apos;</span>);
<span class="hljs-comment">// async task begins!</span>
<span class="hljs-comment">// 1.please wait</span>
<span class="hljs-comment">// 2.please wait</span>
<span class="hljs-comment">// 3.please wait</span>
<span class="hljs-comment">// done, pending -&gt; resolved!</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x5B9E;&#x4F8B;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;Promise&#x5B9E;&#x4F8B;&#x751F;&#x6210;&#x540E;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x9996;&#x5148;&#x8F93;&#x51FA; <code>&apos;async task begins!&apos;</code>&#xFF0C;&#x968F;&#x540E;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C; <code>setTimeout</code>&#xFF0C;1&#x79D2;&#x540E;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x9700;&#x7B49;&#x5F85;&#xFF0C;&#x5411;&#x4E0B;&#x6267;&#x884C;&#xFF0C;&#x800C;<code>then</code>&#x65B9;&#x6CD5;&#x6307;&#x5B9A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8981;&#x5728;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x5B8C;&#x540E;&#x624D;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x5148;&#x8F93;&#x51FA;&#x4E86;3&#x4E2A;<code>&apos;please wait&apos;</code>&#xFF0C;&#x6700;&#x540E;&#x8F93;&#x51FA;<code>&apos;done, pending -&gt; resolved!&apos;</code>&#x3002;(&#x6B64;&#x5904;&#x7701;&#x7565;&#x4E86;<code>then</code>&#x65B9;&#x6CD5;&#x4E2D;&#x7684;<code>reject</code>&#x56DE;&#x8C03;&#xFF0C;&#x4E00;&#x822C;&#x4E0D;&#x5728;<code>then</code>&#x4E2D;&#x505A;<code>rejected</code>&#x72B6;&#x6001;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x800C;&#x4F7F;&#x7528;<code>catch</code>&#x65B9;&#x6CD5;&#x4E13;&#x95E8;&#x5904;&#x7406;&#x9519;&#x8BEF;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;<code>.then(null, reject)</code>)</p><ul><li><h4>&#x94FE;&#x5F0F;&#x8C03;&#x7528; then &#x65B9;&#x6CD5;</h4><p><code>then</code> &#x65B9;&#x6CD5;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Promise &#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x5206;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x6765;&#x770B;&#xFF1A;</p></li></ul><ol><li>&#x6307;&#x5B9A;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x65B0;&#x7684; Promise &#x5BF9;&#x8C61;&#xFF0C;&#x5982;<code>return new Promise(...)</code>&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x6CA1;&#x5565;&#x597D;&#x8BF4;&#x7684;&#xFF0C;&#x7531;&#x4E8E;&#x8FD4;&#x56DE;&#x7684;&#x662F; <code>Promise</code>&#xFF0C;&#x540E;&#x9762;&#x663E;&#x7136;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x8C03;&#x7528;<code>then</code>&#x65B9;&#x6CD5;&#x3002;</li><li>&#x8FD4;&#x56DE;&#x503C;&#x4E0D;&#x662F;Promise&#xFF0C; &#x5982;&#xFF1A;<code>return 1</code> &#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x8FD8;&#x662F;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; <code>Promise</code>&#xFF0C;&#x5E76;&#x4E14;&#x8FD9;&#x4E2A;<code>Promise</code> &#x7ACB;&#x5373;&#x6267;&#x884C;&#x56DE;&#x8C03; <code>resolve(1)</code>&#x3002;&#x6240;&#x4EE5;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;<code>then</code>&#x65B9;&#x6CD5;&#x3002;&#xFF08;&#x6CE8;&#xFF1A;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6307;&#x5B9A;<code>return</code>&#x8BED;&#x53E5;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x8FD4;&#x56DE;&#x4E86;<code>undefined</code>&#xFF09;</li></ol><p>&#x4F7F;&#x7528; then &#x7684;&#x94FE;&#x5F0F;&#x5199;&#x6CD5;&#xFF0C;&#x6309;&#x987A;&#x5E8F;&#x5B9E;&#x73B0;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x540C;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x5F62;&#x5F0F;&#x53BB;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6765;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5B9E;&#x73B0;&#x9694;&#x4E24;&#x79D2;&#x6253;&#x4E00;&#x6B21;&#x62DB;&#x547C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHi(name) {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      resolve(name);
    }, 2000)
  })
}

sayHi(&apos;&#x5F20;&#x4E09;&apos;)
  .then(name =&gt; {
    console.log(`&#x4F60;&#x597D;&#xFF0C; ${name}`);
    return sayHi(&apos;&#x674E;&#x56DB;&apos;);    // &#x6700;&#x7EC8; resolved &#x51FD;&#x6570;&#x4E2D;&#x7684;&#x53C2;&#x6570;&#x5C06;&#x4F5C;&#x4E3A;&#x503C;&#x4F20;&#x9012;&#x7ED9;&#x4E0B;&#x4E00;&#x4E2A;then
  })
  // name &#x662F;&#x4E0A;&#x4E00;&#x4E2A;then&#x4F20;&#x9012;&#x51FA;&#x6765;&#x7684;&#x53C2;&#x6570;
  .then(name =&gt; {                
    console.log(`&#x4F60;&#x597D;&#xFF0C; ${name}`);
    return sayHi(&apos;&#x738B;&#x4E8C;&#x9EBB;&#x5B50;&apos;);
  })
  .then(name =&gt; {
    console.log(`&#x4F60;&#x597D;&#xFF0C; ${name}`);
  })
// &#x4F60;&#x597D;&#xFF0C; &#x5F20;&#x4E09;
// &#x4F60;&#x597D;&#xFF0C; &#x674E;&#x56DB;
// &#x4F60;&#x597D;&#xFF0C; &#x738B;&#x4E8C;&#x9EBB;&#x5B50;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve(name);
    }, <span class="hljs-number">2000</span>)
  })
}

sayHi(<span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>)
  .then(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F60;&#x597D;&#xFF0C; <span class="hljs-subst">${name}</span>`</span>);
    <span class="hljs-keyword">return</span> sayHi(<span class="hljs-string">&apos;&#x674E;&#x56DB;&apos;</span>);    <span class="hljs-comment">// &#x6700;&#x7EC8; resolved &#x51FD;&#x6570;&#x4E2D;&#x7684;&#x53C2;&#x6570;&#x5C06;&#x4F5C;&#x4E3A;&#x503C;&#x4F20;&#x9012;&#x7ED9;&#x4E0B;&#x4E00;&#x4E2A;then</span>
  })
  <span class="hljs-comment">// name &#x662F;&#x4E0A;&#x4E00;&#x4E2A;then&#x4F20;&#x9012;&#x51FA;&#x6765;&#x7684;&#x53C2;&#x6570;</span>
  .then(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {                
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F60;&#x597D;&#xFF0C; <span class="hljs-subst">${name}</span>`</span>);
    <span class="hljs-keyword">return</span> sayHi(<span class="hljs-string">&apos;&#x738B;&#x4E8C;&#x9EBB;&#x5B50;&apos;</span>);
  })
  .then(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F60;&#x597D;&#xFF0C; <span class="hljs-subst">${name}</span>`</span>);
  })
<span class="hljs-comment">// &#x4F60;&#x597D;&#xFF0C; &#x5F20;&#x4E09;</span>
<span class="hljs-comment">// &#x4F60;&#x597D;&#xFF0C; &#x674E;&#x56DB;</span>
<span class="hljs-comment">// &#x4F60;&#x597D;&#xFF0C; &#x738B;&#x4E8C;&#x9EBB;&#x5B50;</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4F7F;&#x7528;&#x94FE;&#x5F0F;then&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5C06;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x53D8;&#x6210;&#x4E86;&#x540C;&#x6B65;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x5E26;&#x6765;&#x4E86;&#x65B0;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x53D8;&#x6210;&#x4E86;&#x5F88;&#x957F;&#x7684;then&#x94FE;&#xFF0C;&#x65B0;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5C31;&#x662F;<code>Generator</code>&#xFF0C;&#x8FD9;&#x91CC;&#x8DE8;&#x8FC7;&#x5B83;&#x76F4;&#x63A5;&#x8BF4;&#x5B83;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF1A;<code>async/await</code>&#x3002;</p><h3 id="articleHeader2">async/await</h3><ul><li><h4>async</h4></li></ul><p><code>async/await</code>&#x5B9E;&#x9645;&#x4E0A;&#x662F;<code>Generator</code>&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;<code>async</code>&#x5173;&#x952E;&#x5B57;&#x4EE3;&#x8868;&#x540E;&#x9762;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;<code>await</code>&#x8868;&#x793A;&#x7B49;&#x5F85;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x3002;&#x58F0;&#x660E;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x53EA;&#x9700;&#x5728;&#x666E;&#x901A;&#x51FD;&#x6570;&#x524D;&#x9762;&#x52A0;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5B57;<code>async</code>&#x5373;&#x53EF;&#xFF0C;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function funcA() {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcA</span>(<span class="hljs-params"></span>) </span>{}</code></pre><p><code>async</code> &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;&#xFF08;&#x5982;&#x679C;&#x6307;&#x5B9A;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4E0D;&#x662F;Promise&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x7ACB;&#x5373; <code>resolve</code>&#xFF0C;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x540C; <code>then</code>&#x65B9;&#x6CD5;&#xFF09;&#xFF0C;&#x56E0;&#x6B64; <code>async</code>&#x51FD;&#x6570;&#x901A;&#x8FC7; <code>return</code>&#x8FD4;&#x56DE;&#x7684;&#x503C;&#xFF0C;&#x4F1A;&#x6210;&#x4E3A; <code>then</code>&#x65B9;&#x6CD5;&#x4E2D;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function funcA() {
  return &apos;hello!&apos;;
}

funcA().then(value =&gt; {
  console.log(value);
})
// hello!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcA</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;hello!&apos;</span>;
}

funcA().then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(value);
})
<span class="hljs-comment">// hello!</span></code></pre><p>&#x5355;&#x72EC;&#x4E00;&#x4E2A; <code>async</code>&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x5B9E;&#x4E0E;Promise&#x6267;&#x884C;&#x7684;&#x529F;&#x80FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x6765;&#x770B;&#x770B; <code>await</code>&#x90FD;&#x5E72;&#x4E86;&#x4E9B;&#x5565;&#x3002;</p><ul><li><h4>await</h4></li></ul><p>&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C; <code>await</code> &#x5C31;&#x662F;&#x5F02;&#x6B65;&#x7B49;&#x5F85;&#xFF0C;&#x5B83;&#x7B49;&#x5F85;&#x7684;&#x662F;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x56E0;&#x6B64; <code>await</code>&#x540E;&#x9762;&#x5E94;&#x8BE5;&#x5199;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;Promise&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x88AB;&#x8F6C;&#x6210;&#x4E00;&#x4E2A;&#x7ACB;&#x5373; <code>resolve</code>&#x7684;Promise&#x3002; <code>async</code>&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x540E;&#x5C31;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x65E6;&#x9047;&#x5230; <code>await</code>&#x5C31;&#x4F1A;&#x5148;&#x8FD4;&#x56DE;&#xFF0C;&#x7B49;&#x5230;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6267;&#x884C;&#x5B8C;&#x6210;&#xFF0C;&#x518D;&#x63A5;&#x7740;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x540E;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x3002;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x5C31;&#x662F;&#xFF1A;<code>async</code>&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E0D;&#x4F1A;&#x9020;&#x6210;&#x4EE3;&#x7801;&#x7684;&#x963B;&#x585E;&#xFF0C;&#x4F46;&#x662F;<code>await</code>&#x4F1A;&#x5F15;&#x8D77;<code>async</code>&#x51FD;&#x6570;&#x5185;&#x90E8;&#x4EE3;&#x7801;&#x7684;&#x963B;&#x585E;&#x3002;&#x770B;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function func() {
  console.log(&apos;async function is running!&apos;);
  const num1 = await 200;
  console.log(`num1 is ${num1}`);
  const num2 = await num1+ 100;
  console.log(`num2 is ${num2}`);
  const num3 = await num2 + 100;
  console.log(`num3 is ${num3}`);
}

func();
console.log(&apos;run me before await!&apos;);
// async function is running!
// run me before await!
// num1 is 200
// num2 is 300
// num3 is 400" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;async function is running!&apos;</span>);
  <span class="hljs-keyword">const</span> num1 = <span class="hljs-keyword">await</span> <span class="hljs-number">200</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`num1 is <span class="hljs-subst">${num1}</span>`</span>);
  <span class="hljs-keyword">const</span> num2 = <span class="hljs-keyword">await</span> num1+ <span class="hljs-number">100</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`num2 is <span class="hljs-subst">${num2}</span>`</span>);
  <span class="hljs-keyword">const</span> num3 = <span class="hljs-keyword">await</span> num2 + <span class="hljs-number">100</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`num3 is <span class="hljs-subst">${num3}</span>`</span>);
}

func();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;run me before await!&apos;</span>);
<span class="hljs-comment">// async function is running!</span>
<span class="hljs-comment">// run me before await!</span>
<span class="hljs-comment">// num1 is 200</span>
<span class="hljs-comment">// num2 is 300</span>
<span class="hljs-comment">// num3 is 400</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x8C03;&#x7528; <code>async func</code> &#x51FD;&#x6570;&#x540E;&#xFF0C;&#x5B83;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x9996;&#x5148;&#x8F93;&#x51FA;&#x4E86;<code>&apos;async function is running!&apos;</code>&#xFF0C;&#x63A5;&#x7740;&#x9047;&#x5230;&#x4E86; <code>await</code>&#x5F02;&#x6B65;&#x7B49;&#x5F85;&#xFF0C;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#xFF0C;&#x5148;&#x6267;&#x884C;<code>func()</code>&#x540E;&#x9762;&#x7684;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#xFF0C;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x5B8C;&#x540E;&#xFF0C;&#x63A5;&#x7740;await&#x7B49;&#x5F85;&#x7684;&#x4F4D;&#x7F6E;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x6267;&#x884C;&#x3002;&#x53EF;&#x4EE5;&#x8BF4;&#xFF0C;<code>async</code>&#x51FD;&#x6570;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5305;&#x88C5;&#x6210;&#x7684;&#x4E00;&#x4E2A;Promise &#x5BF9;&#x8C61;&#xFF0C;&#x800C;<code>await</code>&#x547D;&#x4EE4;&#x5C31;&#x662F;&#x5185;&#x90E8;<code>then</code>&#x547D;&#x4EE4;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;</p><p>&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C; <code>await</code> &#x540E;&#x9762;&#x7684; Promise &#x5BF9;&#x8C61;&#x4E0D;&#x603B;&#x662F;&#x8FD4;&#x56DE; <code>resolved</code>&#x72B6;&#x6001;&#xFF0C;&#x53EA;&#x8981;&#x4E00;&#x4E2A; <code>await</code>&#x540E;&#x9762;&#x7684;Promise&#x72B6;&#x6001;&#x53D8;&#x4E3A; <code>rejected</code>&#xFF0C;&#x6574;&#x4E2A; <code>async</code>&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x4E2D;&#x65AD;&#x6267;&#x884C;&#xFF0C;&#x4E3A;&#x4E86;&#x4FDD;&#x5B58;&#x9519;&#x8BEF;&#x7684;&#x4F4D;&#x7F6E;&#x548C;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7528; <code>try...catch</code> &#x8BED;&#x53E5;&#x6765;&#x5C01;&#x88C5;&#x591A;&#x4E2A; <code>await</code>&#x8FC7;&#x7A0B;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function func() {
  try {
    const num1 = await 200;
    console.log(`num1 is ${num1}`);
    const num2 = await Promise.reject(&apos;num2 is wrong!&apos;);
    console.log(`num2 is ${num2}`);
    const num3 = await num2 + 100;
    console.log(`num3 is ${num3}`);
  } catch (error) {
    console.log(error);
  }
}

func();
// num1 is 200
// &#x51FA;&#x9519;&#x4E86;
// num2 is wrong!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> num1 = <span class="hljs-keyword">await</span> <span class="hljs-number">200</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`num1 is <span class="hljs-subst">${num1}</span>`</span>);
    <span class="hljs-keyword">const</span> num2 = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">&apos;num2 is wrong!&apos;</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`num2 is <span class="hljs-subst">${num2}</span>`</span>);
    <span class="hljs-keyword">const</span> num3 = <span class="hljs-keyword">await</span> num2 + <span class="hljs-number">100</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`num3 is <span class="hljs-subst">${num3}</span>`</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-built_in">console</span>.log(error);
  }
}

func();
<span class="hljs-comment">// num1 is 200</span>
<span class="hljs-comment">// &#x51FA;&#x9519;&#x4E86;</span>
<span class="hljs-comment">// num2 is wrong!</span></code></pre><p>&#x5982;&#x4E0A;&#x6240;&#x793A;&#xFF0C;&#x5728; <code>num2</code>&#x5904; <code>await</code>&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x4E3A; <code>rejected</code>&#x7684;Promise&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x9519;&#x8BEF;&#x4F1A;&#x88AB;&#x4F20;&#x9012;&#x5230; <code>catch</code>&#x8BED;&#x53E5;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9A;&#x4F4D;&#x9519;&#x8BEF;&#x53D1;&#x751F;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p><ul><li><h4>async/await&#x6BD4;Promise&#x5F3A;&#x5728;&#x54EA;&#x513F;&#xFF1F;</h4></li></ul><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x7528;<code>async/await</code>&#x6539;&#x5199;&#x4E00;&#x4E0B;Promise&#x7AE0;&#x8282;&#x4E2D;&#x5173;&#x4E8E;<code>sayHi</code>&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHi(name) {
  return new Promise((resolved, rejected) =&gt; {
    setTimeout(() =&gt; {
      resolved(name);
    }, 2000)
  })
}

async function sayHi_async(name) {
  const sayHi_1 = await sayHi(name)
  console.log(`&#x4F60;&#x597D;&#xFF0C; ${sayHi_1}`)
  const sayHi_2 = await sayHi(&apos;&#x674E;&#x56DB;&apos;)
  console.log(`&#x4F60;&#x597D;&#xFF0C; ${sayHi_2}`)
  const sayHi_3 = await sayHi(&apos;&#x738B;&#x4E8C;&#x9EBB;&#x5B50;&apos;)
  console.log(`&#x4F60;&#x597D;&#xFF0C; ${sayHi_3}`)
}

sayHi_async(&apos;&#x5F20;&#x4E09;&apos;)
// &#x4F60;&#x597D;&#xFF0C; &#x5F20;&#x4E09;
// &#x4F60;&#x597D;&#xFF0C; &#x674E;&#x56DB;
// &#x4F60;&#x597D;&#xFF0C; &#x738B;&#x4E8C;&#x9EBB;&#x5B50;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolved, rejected</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolved(name);
    }, <span class="hljs-number">2000</span>)
  })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi_async</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">const</span> sayHi_1 = <span class="hljs-keyword">await</span> sayHi(name)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F60;&#x597D;&#xFF0C; <span class="hljs-subst">${sayHi_1}</span>`</span>)
  <span class="hljs-keyword">const</span> sayHi_2 = <span class="hljs-keyword">await</span> sayHi(<span class="hljs-string">&apos;&#x674E;&#x56DB;&apos;</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F60;&#x597D;&#xFF0C; <span class="hljs-subst">${sayHi_2}</span>`</span>)
  <span class="hljs-keyword">const</span> sayHi_3 = <span class="hljs-keyword">await</span> sayHi(<span class="hljs-string">&apos;&#x738B;&#x4E8C;&#x9EBB;&#x5B50;&apos;</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F60;&#x597D;&#xFF0C; <span class="hljs-subst">${sayHi_3}</span>`</span>)
}

sayHi_async(<span class="hljs-string">&apos;&#x5F20;&#x4E09;&apos;</span>)
<span class="hljs-comment">// &#x4F60;&#x597D;&#xFF0C; &#x5F20;&#x4E09;</span>
<span class="hljs-comment">// &#x4F60;&#x597D;&#xFF0C; &#x674E;&#x56DB;</span>
<span class="hljs-comment">// &#x4F60;&#x597D;&#xFF0C; &#x738B;&#x4E8C;&#x9EBB;&#x5B50;</span></code></pre><p>&#x4E0E;&#x4E4B;&#x524D;&#x957F;&#x957F;&#x7684;then&#x94FE;&#x548C;then&#x65B9;&#x6CD5;&#x91CC;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x76F8;&#x6BD4;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x5199;&#x6CD5;&#x770B;&#x8D77;&#x6765;&#x50CF;&#x662F;&#x540C;&#x6B65;&#x5199;&#x6CD5;&#x5E76;&#x4E14;&#x66F4;&#x52A0;&#x6E05;&#x723D;&#xFF0C;&#x66F4;&#x52A0;&#x7B26;&#x5408;&#x7F16;&#x7A0B;&#x4E60;&#x60EF;&#x3002;</p><h4>&#x53C2;&#x8003;&#x6587;&#x7AE0;</h4><p><a href="https://segmentfault.com/a/1190000007535316">https://segmentfault.com/a/11...</a><br><a href="https://segmentfault.com/a/1190000006138882" target="_blank">https://segmentfault.com/a/11...</a><br><a href="https://www.zhihu.com/question/19732473/answer/20851256" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解async/await

## 原文链接
[https://segmentfault.com/a/1190000015488033](https://segmentfault.com/a/1190000015488033)

