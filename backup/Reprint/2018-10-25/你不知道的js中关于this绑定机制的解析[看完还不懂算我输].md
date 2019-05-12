---
title: '你不知道的js中关于this绑定机制的解析[看完还不懂算我输]'
hidden: true
categories: [reprint]
slug: 7a3516ab
date: 2018-10-25 09:08:15
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/005Y4rCogy1fstcwvzkjzj30sg0g0qqn.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/005Y4rCogy1fstcwvzkjzj30sg0g0qqn.jpg" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x6B63;&#x5728;&#x770B;&#x300A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;JavaScript&#x300B;&#xFF0C;&#x91CC;&#x9762;&#x5173;&#x4E8E;this&#x7ED1;&#x5B9A;&#x673A;&#x5236;&#x7684;&#x90E8;&#x5206;&#x8BB2;&#x7684;&#x7279;&#x522B;&#x597D;&#xFF0C;&#x5F88;&#x6E05;&#x6670;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x5BF9;&#x6211;&#x4EEC;js&#x7684;&#x4F7F;&#x7528;&#x4E5F;&#x662F;&#x76F8;&#x5F53;&#x5173;&#x952E;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x8FD9;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x9762;&#x8BD5;&#x7684;&#x9AD8;&#x9891;&#x8003;&#x70B9;&#xFF0C;&#x6240;&#x4EE5;&#x6574;&#x7406;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x8FD9;&#x90E8;&#x5206;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x76F8;&#x4FE1;&#x770B;&#x672C;&#x6587;&#x7684;&#x89E3;&#x6790;&#xFF0C;&#x4F60;&#x4E00;&#x5B9A;&#x4F1A;&#x6709;&#x6240;&#x6536;&#x83B7;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x559C;&#x6B22;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x70B9;&#x6CE2;&#x8D5E;/&#x5173;&#x6CE8;&#xFF0C;&#x652F;&#x6301;&#x4E00;&#x4E0B;&#x3002;</p><blockquote>&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF1A;<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a></blockquote><hr><h3 id="articleHeader1">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;this&#xFF1A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function identify() {
  console.log(&quot;Hello,I&apos;m &quot; + this.name);
}
let me = {
  name: &quot;Kyle&quot;
};
let you = {
  name: &quot;Reader&quot;
};
identify.call(me); // Hello,I&apos;m Kyle
identify.call(you); // Hello,I&apos;m Reader
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">identify</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Hello,I&apos;m &quot;</span> + <span class="hljs-keyword">this</span>.name);
}
<span class="hljs-keyword">let</span> me = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Kyle&quot;</span>
};
<span class="hljs-keyword">let</span> you = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Reader&quot;</span>
};
identify.call(me); <span class="hljs-comment">// Hello,I&apos;m Kyle</span>
identify.call(you); <span class="hljs-comment">// Hello,I&apos;m Reader</span>
</code></pre><p>&#x8FD9;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6817;&#x5B50;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x5BF9;&#x8C61;&#x4E2D;&#x590D;&#x7528;&#x51FD;&#x6570;<code>identify</code>&#xFF0C;&#x4E0D;&#x7528;&#x9488;&#x5BF9;&#x6BCF;&#x4E2A;&#x5BF9;&#x8C61;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#x3002;</p><p><strong>this&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;:</strong></p><p>this&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x66F4;&#x4F18;&#x96C5;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x9690;&#x5F0F;&apos;&#x4F20;&#x9012;&apos;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;<strong>&#x5C06;API&#x8BBE;&#x8BA1;&#x5F97;&#x66F4;&#x52A0;&#x7B80;&#x6D01;&#x5E76;&#x4E14;&#x6613;&#x4E8E;&#x590D;&#x7528;</strong>&#x3002;</p><h2 id="articleHeader2">this&#x7684;&#x56DB;&#x79CD;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#xFF1A;</h2><h3 id="articleHeader3">&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#xFF1A;</h3><p><strong>&#x89C4;&#x5219;</strong>&#xFF1A;&#x5728;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x7684;<code>this</code>&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#xFF0C;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;<code>this</code>&#x6307;&#x5411;undefined</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log(this.a); // this&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;
}
var a = 2;
foo(); // 2
function foo2() {
  &quot;use strict&quot;; // &#x4E25;&#x683C;&#x6A21;&#x5F0F;this&#x7ED1;&#x5B9A;&#x5230;undefined
  console.log(this.a); 
}
foo2(); // TypeError:a undefined
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a); <span class="hljs-comment">// this&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;</span>
}
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
foo(); <span class="hljs-comment">// 2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo2</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">  &quot;use strict&quot;</span>; <span class="hljs-comment">// &#x4E25;&#x683C;&#x6A21;&#x5F0F;this&#x7ED1;&#x5B9A;&#x5230;undefined</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a); 
}
foo2(); <span class="hljs-comment">// TypeError:a undefined</span>
</code></pre><p>&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#x5982;&#x4E0A;&#x8FF0;&#x6817;&#x5B50;&#xFF0C;&#x4E66;&#x4E2D;&#x8FD8;&#x63D0;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x5FAE;&#x5999;&#x7684;&#x7EC6;&#x8282;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  console.log(this.a); // foo&#x51FD;&#x6570;&#x4E0D;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F; &#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;
}
var a = 2;
function foo2(){
  &quot;use strict&quot;;
  foo(); // &#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x8C03;&#x7528;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;
}
foo2(); // 2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a); <span class="hljs-comment">// foo&#x51FD;&#x6570;&#x4E0D;&#x662F;&#x4E25;&#x683C;&#x6A21;&#x5F0F; &#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;</span>
}
<span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo2</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">  &quot;use strict&quot;</span>;
  foo(); <span class="hljs-comment">// &#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x8C03;&#x7528;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;</span>
}
foo2(); <span class="hljs-comment">// 2</span>
</code></pre><p>&#x6240;&#x4EE5;&#xFF1A;&#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x6765;&#x8BF4;&#xFF0C;<strong>&#x51B3;&#x5B9A;this&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x662F;&#x51FD;&#x6570;&#x4F53;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;</strong>&#xFF0C;&#x4E25;&#x683C;&#x6307;&#x5411;undefined&#xFF0C;&#x975E;&#x4E25;&#x683C;&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x901A;&#x5E38;&#x4E0D;&#x4F1A;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x6DF7;&#x7528;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x548C;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x5F88;&#x7F55;&#x89C1;&#xFF0C;&#x77E5;&#x9053;&#x4E00;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x907F;&#x514D;&#x67D0;&#x4E9B;&#x53D8;&#x6001;&#x7684;&#x9762;&#x8BD5;&#x9898;&#x6316;&#x5751;&#x3002;</p><h3 id="articleHeader4">&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#xFF1A;</h3><p><strong>&#x89C4;&#x5219;</strong>&#xFF1A;&#x51FD;&#x6570;&#x5728;&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#xFF0C;&#x662F;&#x5426;&#x6709;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x90A3;&#x4E48;this&#x5C31;&#x4F1A;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x5230;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function foo() {
      console.log(this.a);
    }
    var a = &quot;Oops, global&quot;;
    let obj2 = {
      a: 2,
      foo: foo
    };
    let obj1 = {
      a: 22,
      obj2: obj2
    };
    obj2.foo(); // 2 this&#x6307;&#x5411;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x5BF9;&#x8C61;
    obj1.obj2.foo(); // 2 this&#x6307;&#x5411;&#x6700;&#x540E;&#x4E00;&#x5C42;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x5BF9;&#x8C61;
    
    // &#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4E22;&#x5931;
    let bar = obj2.foo; // bar&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x522B;&#x540D; &#x662F;obj2.foo&#x7684;&#x4E00;&#x4E2A;&#x5F15;&#x7528;
    bar(); // &quot;Oops, global&quot; - &#x6307;&#x5411;&#x5168;&#x5C40;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
    }
    <span class="hljs-keyword">var</span> a = <span class="hljs-string">&quot;Oops, global&quot;</span>;
    <span class="hljs-keyword">let</span> obj2 = {
      <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">foo</span>: foo
    };
    <span class="hljs-keyword">let</span> obj1 = {
      <span class="hljs-attr">a</span>: <span class="hljs-number">22</span>,
      <span class="hljs-attr">obj2</span>: obj2
    };
    obj2.foo(); <span class="hljs-comment">// 2 this&#x6307;&#x5411;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x5BF9;&#x8C61;</span>
    obj1.obj2.foo(); <span class="hljs-comment">// 2 this&#x6307;&#x5411;&#x6700;&#x540E;&#x4E00;&#x5C42;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x5BF9;&#x8C61;</span>
    
    <span class="hljs-comment">// &#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4E22;&#x5931;</span>
    <span class="hljs-keyword">let</span> bar = obj2.foo; <span class="hljs-comment">// bar&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x522B;&#x540D; &#x662F;obj2.foo&#x7684;&#x4E00;&#x4E2A;&#x5F15;&#x7528;</span>
    bar(); <span class="hljs-comment">// &quot;Oops, global&quot; - &#x6307;&#x5411;&#x5168;&#x5C40;</span>
</code></pre><p><strong>&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4E22;&#x5931;&#xFF1A;</strong></p><p>&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4E22;&#x5931;&#x7684;&#x95EE;&#x9898;&#xFF1A;<strong>&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#xFF0C;&#x53EA;&#x662F;&#x5BF9;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;</strong>&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x5BFC;&#x81F4;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4E22;&#x5931;&#x3002;</p><p>&#x540C;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD8;&#x53D1;&#x751F;&#x5728;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x66F4;&#x52A0;&#x5E38;&#x89C1;&#xFF0C;&#x5E76;&#x4E14;&#x9690;&#x853D;&#xFF0C;&#x7C7B;&#x4F3C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    test(obj2.foo); // &#x4F20;&#x5165;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x8C03;&#x7528;&#x65F6;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>    test<span class="hljs-comment">(obj2.foo)</span>; <span class="hljs-comment">// &#x4F20;&#x5165;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x8C03;&#x7528;&#x65F6;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x3002;</span>
</code></pre><h3 id="articleHeader5">&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;:</h3><p>&#x5C31;&#x50CF;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5355;&#x7EAF;&#x4F7F;&#x7528;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x80AF;&#x5B9A;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x5F97;&#x5230;&#x671F;&#x671B;&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x5E78;&#x597D;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;<strong>&#x5728;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#x5F3A;&#x5236;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;&#x800C;&#x5C06;<code>this</code>&#x7ED1;&#x5B9A;&#x5728;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E0A;</strong>&#x3002;</p><p><strong>&#x89C4;&#x5219;</strong>&#xFF1A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>apply</code>&#x3001;<code>call</code>&#x3001;<code>bind</code>&#x5C06;&#x51FD;&#x6570;&#x4E2D;&#x7684;<code>this</code>&#x7ED1;&#x5B9A;&#x5230;&#x6307;&#x5B9A;&#x5BF9;&#x8C61;&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log(this.a);
}
let obj = {
    a: 2
};
foo.call(obj); // 2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};
foo.call(obj); <span class="hljs-comment">// 2</span>
</code></pre><p><strong>&#x4F20;&#x5165;&#x7684;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#xFF1A;</strong></p><p>&#x5982;&#x679C;&#x4F60;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E2A;&#x539F;&#x59CB;&#x503C;(&#x5B57;&#x7B26;&#x4E32;,&#x5E03;&#x5C14;&#x7C7B;&#x578B;&#xFF0C;&#x6570;&#x5B57;&#x7C7B;&#x578B;)&#xFF0C;&#x6765;&#x5F53;&#x505A;this&#x7684;&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;&#x539F;&#x59CB;&#x503C;&#x8F6C;&#x6362;&#x6210;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x628A;<code>null</code>&#x6216;&#x8005;<code>undefined</code>&#x4F5C;&#x4E3A;this&#x7684;&#x7ED1;&#x5B9A;&#x5BF9;&#x8C61;&#x4F20;&#x5165;<code>call</code>/<code>apply</code>/<code>bind</code>&#xFF0C;&#x8FD9;&#x4E9B;&#x503C;&#x4F1A;&#x5728;&#x8C03;&#x7528;&#x65F6;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x7684;&#x662F;&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#x3002;</p><h3 id="articleHeader6">new&#x7ED1;&#x5B9A;&#xFF1A;</h3><blockquote>&#x4E66;&#x4E2D;&#x63D0;&#x5230;&#xFF1A;&#x5728;js&#x4E2D;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5E76;&#x4E0D;&#x5B58;&#x5728;&#x6240;&#x8C13;&#x7684;&apos;&#x6784;&#x9020;&#x51FD;&#x6570;&apos;&#xFF0C;&#x53EA;&#x6709;&#x5BF9;&#x4E8E;&#x51FD;&#x6570;&#x7684;&apos;&#x6784;&#x9020;&#x8C03;&#x7528;&apos;&#x3002;</blockquote><p><strong>new&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x505A;&#x54EA;&#x4E9B;&#x4E8B;&#x60C5;&#xFF1A;</strong></p><ol><li><strong>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x5BF9;&#x8C61;</strong>&#x3002;</li><li>&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x4F1A;&#x88AB;&#x6267;&#x884C; [[Prototype]] &#x8FDE;&#x63A5;&#x3002;</li><li><strong>&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x4F1A;&#x7ED1;&#x5B9A;&#x5230;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x7684;this</strong>&#x3002;</li><li>&#x5982;&#x679C;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;new&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4F1A;&#x81EA;&#x52A8;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x3002;</li></ol><p><strong>&#x89C4;&#x5219;</strong>&#xFF1A;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;this&#x4F1A;&#x81EA;&#x52A8;&#x7ED1;&#x5B9A;&#x5728;new&#x671F;&#x95F4;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a) {
  this.a = a; // this&#x7ED1;&#x5B9A;&#x5230;bar&#x4E0A;
}
let bar = new foo(2);
console.log(bar.a); // 2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">this</span>.a = a; <span class="hljs-comment">// this&#x7ED1;&#x5B9A;&#x5230;bar&#x4E0A;</span>
}
<span class="hljs-keyword">let</span> bar = <span class="hljs-keyword">new</span> foo(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(bar.a); <span class="hljs-comment">// 2</span>
</code></pre><h3 id="articleHeader7">this&#x56DB;&#x79CD;&#x7ED1;&#x5B9A;&#x89C4;&#x5219;&#x7684;&#x4F18;&#x5148;&#x7EA7;</h3><p>&#x5982;&#x679C;&#x5728;&#x67D0;&#x4E2A;&#x8C03;&#x7528;&#x4F4D;&#x7F6E;&#x5E94;&#x7528;&#x4E86;&#x591A;&#x6761;&#x89C4;&#x5219;&#xFF0C;&#x5982;&#x4F55;&#x786E;&#x5B9A;&#x54EA;&#x6761;&#x89C4;&#x5219;&#x751F;&#x6548;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    obj.foo.call(obj2); // this&#x6307;&#x5411;obj2 &#x663E;&#x5F0F;&#x7ED1;&#x5B9A;&#x6BD4;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x3002;
    new obj.foo(); // thsi&#x6307;&#x5411;new&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61; new&#x7ED1;&#x5B9A;&#x6BD4;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>    obj.foo.call(obj2); <span class="hljs-regexp">//</span> <span class="hljs-keyword">this</span>&#x6307;&#x5411;obj2 &#x663E;&#x5F0F;&#x7ED1;&#x5B9A;&#x6BD4;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x3002;
    <span class="hljs-keyword">new</span> obj.foo(); <span class="hljs-regexp">//</span> thsi&#x6307;&#x5411;<span class="hljs-keyword">new</span>&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61; <span class="hljs-keyword">new</span>&#x7ED1;&#x5B9A;&#x6BD4;&#x9690;&#x5F0F;&#x7ED1;&#x5B9A;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x3002;
</code></pre><p>&#x663E;&#x5F0F;&#x7ED1;&#x5B9A;&#x548C;new&#x7ED1;&#x5B9A;&#x65E0;&#x6CD5;&#x76F4;&#x63A5;&#x6BD4;&#x8F83;((&#x4F1A;&#x62A5;&#x9519;),&#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;&#x662F;&#x4E0D;&#x5E94;&#x7528;&#x5176;&#x4ED6;&#x89C4;&#x5219;&#x4E4B;&#x540E;&#x7684;&#x515C;&#x5E95;&#x7ED1;&#x5B9A;&#x6240;&#x4EE5;&#x4F18;&#x5148;&#x7EA7;&#x6700;&#x4F4E;&#xFF0C;&#x6700;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;</p><p><strong>&#x663E;&#x5F0F;&#x7ED1;&#x5B9A; &gt; &#x9690;&#x5F0F;&#x7ED1;&#x5B9A; &gt; &#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;</strong></p><p><strong>new&#x7ED1;&#x5B9A; &gt; &#x9690;&#x5F0F;&#x7ED1;&#x5B9A; &gt; &#x9ED8;&#x8BA4;&#x7ED1;&#x5B9A;</strong></p><h3 id="articleHeader8">&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x6307;&#x5411;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;&#x4E0A;&#x8FF0;&#x7684;&#x56DB;&#x6761;&#x89C4;&#x5219;&#xFF1A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  return () =&gt; {
    console.log(this.a);
  };
}
let obj1 = {
  a: 2
};
let obj2 = {
  a: 22
};
let bar = foo.call(obj1); // foo this&#x6307;&#x5411;obj1
bar.call(obj2); // &#x8F93;&#x51FA;2 &#x8FD9;&#x91CC;&#x6267;&#x884C;&#x7BAD;&#x5934;&#x51FD;&#x6570; &#x5E76;&#x8BD5;&#x56FE;&#x7ED1;&#x5B9A;this&#x6307;&#x5411;&#x5230;obj2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
  };
}
<span class="hljs-keyword">let</span> obj1 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>
};
<span class="hljs-keyword">let</span> obj2 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">22</span>
};
<span class="hljs-keyword">let</span> bar = foo.call(obj1); <span class="hljs-comment">// foo this&#x6307;&#x5411;obj1</span>
bar.call(obj2); <span class="hljs-comment">// &#x8F93;&#x51FA;2 &#x8FD9;&#x91CC;&#x6267;&#x884C;&#x7BAD;&#x5934;&#x51FD;&#x6570; &#x5E76;&#x8BD5;&#x56FE;&#x7ED1;&#x5B9A;this&#x6307;&#x5411;&#x5230;obj2</span>
</code></pre><p>&#x4ECE;&#x4E0A;&#x8FF0;&#x6817;&#x5B50;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;this&#x89C4;&#x5219;&#xFF1A;</p><ol><li><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x7684;<code>this</code>&#x7EE7;&#x627F;&#x4E8E;&#x5B83;&#x5916;&#x9762;&#x7B2C;&#x4E00;&#x4E2A;&#x4E0D;&#x662F;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x51FD;&#x6570;&#x7684;<code>this</code>&#x6307;&#x5411;</strong>&#x3002;</li><li><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684; this &#x4E00;&#x65E6;&#x7ED1;&#x5B9A;&#x4E86;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x88AB;&#x4EFB;&#x4F55;&#x4EE3;&#x7801;&#x6539;&#x53D8;</strong>&#x3002;</li></ol><hr><h2 id="articleHeader9">&#x7ED3;&#x8BED;</h2><p>&#x8BA4;&#x771F;&#x770B;&#x5B8C;&#x7684;&#x8BDD;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x5DF2;&#x7ECF;get&#x5230;this&#x7684;&#x7528;&#x6CD5;&#x4E86;&#xFF0C;&#x6700;&#x540E;&#x63A8;&#x8350;&#x4E00;&#x4E0B;&#x300A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;JavaScript&#x300B;&#xFF0C;&#x8FD9;&#x672C;&#x4E66;&#x771F;&#x7684;&#x5F88;&#x597D;&#xFF0C;&#x5199;&#x7684;&#x4E5F;&#x5F88;&#x6709;&#x8DA3;&#xFF0C;&#x6CA1;&#x770B;&#x8FC7;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x6293;&#x7D27;&#x5165;&#x624B;&#x4E86;&#x3002;</p><p>PS&#xFF1A;&#x76EE;&#x524D;&#x79BB;&#x804C;&#x4E2D;&#xFF0C;&#x5927;&#x4F6C;&#x4EEC;&#x6709;&#x5751;&#x4F4D;&#x53EF;&#x4EE5;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x5440;&#xFF0C;base&#xFF1A;&#x4E0A;&#x6D77;&#x957F;&#x5B81;&#x3002;</p><h3 id="articleHeader10">&#x5E0C;&#x671B;&#x770B;&#x5B8C;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x70B9;&#x4E2A;&#x559C;&#x6B22;/&#x5173;&#x6CE8;&#xFF0C;&#x60A8;&#x7684;&#x652F;&#x6301;&#x662F;&#x5BF9;&#x6211;&#x6700;&#x5927;&#x7684;&#x9F13;&#x52B1;&#x3002;</h3><p><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;</a></strong>&#xFF0C;&#x5982;&#x9700;&#x8F6C;&#x8F7D;&#xFF0C;&#x8BF7;&#x653E;&#x4E0A;&#x539F;&#x6587;&#x94FE;&#x63A5;&#x5E76;&#x7F72;&#x540D;&#x3002;&#x7801;&#x5B57;&#x4E0D;&#x6613;&#xFF0C;<strong>&#x611F;&#x8C22;</strong>&#x652F;&#x6301;&#xFF01;</p><p>&#x5982;&#x679C;&#x559C;&#x6B22;&#x672C;&#x6587;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x8BA2;&#x9605;&#x53F7;&#xFF0C;&#x6F2B;&#x6F2B;&#x6280;&#x672F;&#x8DEF;&#xFF0C;&#x671F;&#x5F85;&#x672A;&#x6765;&#x5171;&#x540C;&#x5B66;&#x4E60;&#x6210;&#x957F;&#x3002;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&amp;h=344&amp;f=jpeg&amp;s=8317" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&amp;h=344&amp;f=jpeg&amp;s=8317" alt="" title="" style="cursor:pointer"></span></p><p>&#x4EE5;&#x4E0A;2018.6.30</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的js中关于this绑定机制的解析[看完还不懂算我输]

## 原文链接
[https://segmentfault.com/a/1190000015444951](https://segmentfault.com/a/1190000015444951)

