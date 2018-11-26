---
title: 'ES6精华：函数扩展' 
date: 2018-11-27 2:30:12
hidden: true
slug: awhwst7u526
categories: [reprint]
---

{{< raw >}}
<p><code>ES6</code>&#x5728;&#x51FD;&#x6570;&#x65B9;&#x9762;&#x7684;&#x6269;&#x5C55;&#x6BD4;&#x8F83;&#x4E30;&#x5BCC;&#x4E5F;&#x5F88;&#x5B9E;&#x7528;&#xFF0C;&#x672C;&#x7BC7;&#x6982;&#x62EC;&#x4E86;&#x8FD9;&#x4E2D;&#x7684;&#x7CBE;&#x534E;&#x77E5;&#x8BC6;&#x3002;</p><h2 id="articleHeader0">1 &#x7BAD;&#x5934;&#x51FD;&#x6570;</h2><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x662F;<code>ES6</code>&#x4E2D;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684;&#x65B0;&#x5F62;&#x5F0F;&#x3002;<br>&#x65B0;&#x5F62;&#x5F0F;&#x4E0D;&#x4EC5;&#x7B80;&#x5316;&#x4E86;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#xFF0C;&#x66F4;&#x4E3A;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x51CF;&#x91CD;&#xFF08;&#x5176;<code>this</code>, <code>argumnets</code>&#x7B49;&#x4E0E;&#x4E4B;&#x524D;&#x4E0D;&#x540C;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fn = () =&gt; {
  console.log(&apos;fn&apos;);
};
fn(); // &apos;fn&apos;

&#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x7701;&#x7565;&#x62EC;&#x53F7;&#x3002;
(n =&gt; {
  console.log(n);
})(1); // 1

&#x5982;&#x679C;&#x4E0D;&#x5E26; {} &#xFF0C;&#x610F;&#x5473;&#x7740;&#x76F4;&#x63A5;&#x8FD4;&#x56DE; =&gt; &#x6307;&#x5411;&#x7684;&#x76EE;&#x6807;&#x3002;
console.log( (n =&gt; 2)(1) ); // 2
&#x6CE8;&#x610F;&#xFF0C;&#x6307;&#x5411;&#x7684;&#x76EE;&#x6807;&#x53EA;&#x80FD;&#x662F;&#x5355;&#x4F53;&#xFF0C;&#x5982;&#x679C;&#x4E3A;&#x8868;&#x8FBE;&#x5F0F;&#x9700;&#x8981;&#x7528; () &#x5305;&#x88F9;&#x5F62;&#x6210;&#x5355;&#x4F53;&#x3002;
console.log( (n =&gt; (n + 1))(1) ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> fn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn&apos;</span>);
};
fn(); <span class="hljs-comment">// &apos;fn&apos;</span>

&#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x7701;&#x7565;&#x62EC;&#x53F7;&#x3002;
(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(n);
})(<span class="hljs-number">1</span>); <span class="hljs-comment">// 1</span>

&#x5982;&#x679C;&#x4E0D;&#x5E26; {} &#xFF0C;&#x610F;&#x5473;&#x7740;&#x76F4;&#x63A5;&#x8FD4;&#x56DE; =&gt; &#x6307;&#x5411;&#x7684;&#x76EE;&#x6807;&#x3002;
<span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> <span class="hljs-number">2</span>)(<span class="hljs-number">1</span>) ); <span class="hljs-comment">// 2</span>
&#x6CE8;&#x610F;&#xFF0C;&#x6307;&#x5411;&#x7684;&#x76EE;&#x6807;&#x53EA;&#x80FD;&#x662F;&#x5355;&#x4F53;&#xFF0C;&#x5982;&#x679C;&#x4E3A;&#x8868;&#x8FBE;&#x5F0F;&#x9700;&#x8981;&#x7528; () &#x5305;&#x88F9;&#x5F62;&#x6210;&#x5355;&#x4F53;&#x3002;
<span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> (n + <span class="hljs-number">1</span>))(<span class="hljs-number">1</span>) ); <span class="hljs-comment">// 2</span></code></pre><h3 id="articleHeader1">1.1 this</h3><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684;<code>this</code>&#xFF0C;&#x5176;&#x4F7F;&#x7528;&#x7684;<code>this</code>&#x662F;&#x5F15;&#x7528;&#x5916;&#x5C42;&#x7684;&#xFF08;&#x7C7B;&#x4F3C;&#x95ED;&#x5305;&#xFF09;&#x3002;<br>&#x56E0;&#x6B64;&#x5176;&#x91CC;&#x9762;&#x7684;<code>this</code>&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x5728;&#x5B9A;&#x4E49;&#x7684;&#x90A3;&#x4E00;&#x523B;&#x8D77;&#x5C31;&#x5DF2;&#x7ECF;&#x786E;&#x5B9A;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x3002;

--- &#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x662F;&#x6267;&#x884C;&#x65F6;&#x786E;&#x5B9A; this &#x3002;
window.id = 0;

let obj = { id: 1 };
let fn = function () {
  console.log(this.id);
};

fn(); // 0&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; window &#x3002;
obj.fn = fn;
obj.fn(); // 1&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; obj &#x3002;


--- &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x662F;&#x5B9A;&#x4E49;&#x65F6;&#x786E;&#x5B9A; this &#x3002;
window.id = 0;

let obj = { id: 1 };
let fn = () =&gt; {
  console.log(this.id);
};

fn();  // 0&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; window &#x3002;
obj.fn = fn;
obj.fn(); // 0&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; window &#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x3002;

--- &#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x662F;&#x6267;&#x884C;&#x65F6;&#x786E;&#x5B9A; <span class="hljs-keyword">this</span> &#x3002;
<span class="hljs-built_in">window</span>.id = <span class="hljs-number">0</span>;

<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> };
<span class="hljs-keyword">let</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id);
};

fn(); <span class="hljs-comment">// 0&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; window &#x3002;</span>
obj.fn = fn;
obj.fn(); <span class="hljs-comment">// 1&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; obj &#x3002;</span>


--- &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x662F;&#x5B9A;&#x4E49;&#x65F6;&#x786E;&#x5B9A; <span class="hljs-keyword">this</span> &#x3002;
<span class="hljs-built_in">window</span>.id = <span class="hljs-number">0</span>;

<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> };
<span class="hljs-keyword">let</span> fn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id);
};

fn();  <span class="hljs-comment">// 0&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; window &#x3002;</span>
obj.fn = fn;
obj.fn(); <span class="hljs-comment">// 0&#xFF0C;&#x5F15;&#x7528;&#x7684;&#x662F; window &#x3002;</span></code></pre><p>&#x518D;&#x5229;&#x7528;&#x591A;&#x5C42;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6765;&#x8BF4;&#x660E;&#x3002;<br>&#x591A;&#x5C42;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;<code>this</code>&#x7684;&#x5BFB;&#x627E;&#x9014;&#x5F84;&#x662F;&#x4E00;&#x5C42;&#x5C42;&#x5411;&#x4E0A;&#x67E5;&#x627E;&#x7684;&#xFF0C;&#x7C7B;&#x4F3C;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x67E5;&#x627E;&#x3002;<br>&#x6240;&#x4EE5;&#x591A;&#x5C42;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5728;&#x521D;&#x6B21;&#x83B7;&#x53D6;&#x5230;<code>this</code>&#x65F6;&#xFF0C;&#x5168;&#x90E8;&#x51FD;&#x6570;&#x7684;<code>this</code>&#x4FBF;&#x90FD;&#x786E;&#x5B9A;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo.call({id: 1})()(); // id: 1

function foo() {
  return () =&gt; {
    return () =&gt; {
      console.log(&apos;id:&apos;, this.id);
    };
  };
}

--- &#x7B49;&#x4EF7;&#x4E8E;

function foo() {
  let _this = this;
  return function() {
    return function() {
      console.log(&apos;id:&apos;, _this.id);
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">foo.call({<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>})()(); <span class="hljs-comment">// id: 1</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;id:&apos;</span>, <span class="hljs-keyword">this</span>.id);
    };
  };
}

--- &#x7B49;&#x4EF7;&#x4E8E;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> _this = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;id:&apos;</span>, _this.id);
    }
  }
}</code></pre><p>&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x81EA;&#x8EAB;&#x7684;<code>this</code>&#x3002;<br>&#x6240;&#x4EE5;&#x65E0;&#x6CD5;&#x6210;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;<code>new</code>&#x64CD;&#x4F5C;&#x7B26;&#x3002;<br>&#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x7528;<code>call</code>, <code>apply</code>&#x548C;<code>bind</code>&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x6539;&#x53D8;<code>this</code>&#x7684;&#x6307;&#x5411;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Person = () =&gt; {};
let p = new Person(); // &#x62A5;&#x9519;&#xFF0C;Person is not a constructor&#x3002;

window.id = &apos;000&apos;;
let fn = () =&gt; { console.log(this.id) };
let fn1 = fn.bind({ id: &apos;111&apos; });
fn1(); // &apos;000&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> Person = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {};
<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Person(); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;Person is not a constructor&#x3002;</span>

<span class="hljs-built_in">window</span>.id = <span class="hljs-string">&apos;000&apos;</span>;
<span class="hljs-keyword">let</span> fn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.id) };
<span class="hljs-keyword">let</span> fn1 = fn.bind({ <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;111&apos;</span> });
fn1(); <span class="hljs-comment">// &apos;000&apos;</span></code></pre><h3 id="articleHeader2">1.2 &#x5176;&#x5B83;&#x7684;&#x4E0D;&#x540C;</h3><p>&#x51FD;&#x6570;&#x4F53;&#x5185;&#x6CA1;&#x6709;<code>arguments</code>&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>rest</code>&#x53C2;&#x6570;&#x4EE3;&#x66FF;&#x3002;<br>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;<code>yield</code>&#x547D;&#x4EE4;&#xFF0C;&#x56E0;&#x6B64;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E0D;&#x80FD;&#x7528;&#x4F5C;<code>Generator</code>&#x51FD;&#x6570;&#xFF08;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>async</code>&#x51FD;&#x6570;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fn = (...args) =&gt; {
  console.log(args); // [1, 2]
  console.log(arguments); // &#x62A5;&#x9519;&#xFF0C;arguments is not defined&#x3002;
};
fn(1, 2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> fn = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(args); <span class="hljs-comment">// [1, 2]</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;arguments is not defined&#x3002;</span>
};
fn(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);</code></pre><h2 id="articleHeader3">2 &#x51FD;&#x6570;&#x53C2;&#x6570;</h2><h3 id="articleHeader4">2.1 &#x9ED8;&#x8BA4;&#x503C;</h3><p>&#x53EF;&#x4EE5;&#x4E3A;&#x53C2;&#x6570;&#x8BBE;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;<br>&#x5F53;&#x6CA1;&#x6709;&#x4F20;&#x9012;&#x8BE5;&#x53C2;&#x6570;&#x6216;&#x503C;&#x4E3A;<code>undefined</code>&#x65F6;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x5C06;&#x88AB;&#x4F7F;&#x7528;&#x3002;<br>&#x501F;&#x7528;&#x6B64;&#x65B9;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x5E76;&#x4F7F;&#x53C2;&#x6570;&#x7684;&#x6027;&#x8D28;&#x3001;&#x7C7B;&#x578B;&#x7B49;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- ES6 &#x4E4B;&#x524D;
function fn(id, conf) {
  id || requiredParam();
  conf = conf || {};
  
  conf.name = conf.name || &apos;&apos;;
  conf.ago = conf.ago || 0;
  
  console.log(id, conf);
}

--- ES6 &#x4E4B;&#x540E;
function fn(
  id = requiredParam(),
  conf = {
    name: &apos;&apos;,
    ago: 0
  }
) {
  console.log(id, conf);
}

function requiredParam() {
  throw Error(&apos;Missing parameter.&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- ES6 &#x4E4B;&#x524D;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">id, conf</span>) </span>{
  id || requiredParam();
  conf = conf || {};
  
  conf.name = conf.name || <span class="hljs-string">&apos;&apos;</span>;
  conf.ago = conf.ago || <span class="hljs-number">0</span>;
  
  <span class="hljs-built_in">console</span>.log(id, conf);
}

--- ES6 &#x4E4B;&#x540E;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">
  id = requiredParam(</span>),
  <span class="hljs-title">conf</span> = </span>{
    name: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-attr">ago</span>: <span class="hljs-number">0</span>
  }
) {
  <span class="hljs-built_in">console</span>.log(id, conf);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requiredParam</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Missing parameter.&apos;</span>);
}</code></pre><h3 id="articleHeader5">2.2 &#x89E3;&#x6784;&#x8D4B;&#x503C;</h3><p>&#x7ED3;&#x5408;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x8BBE;&#x5B9A;&#x7684;&#x529F;&#x80FD;&#x4F1A;&#x66F4;&#x4E3A;&#x5F3A;&#x5927;&#x3002;<br>&#x5173;&#x4E8E;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF0C;&#x53EF;&#x53C2;&#x8003;&#x6B64;<a href="https://segmentfault.com/a/1190000015072149">&#x94FE;&#x63A5;</a>&#x3002;<br>&#x4E3A;&#x4E86;&#x76F4;&#x89C2;&#x7684;&#x663E;&#x793A;&#x5B83;&#x7684;&#x4F18;&#x52BF;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;&#x5206;&#x6210;&#x4E09;&#x6B65;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF0C;&#x5FEB;&#x901F;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x8D4B;&#x4E88;&#x76F8;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;

fn({
  id: &apos;0003&apos;
}); // &#x4E24;&#x8005;&#x90FD;&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0003&apos; undefined

--- ES6 &#x4E4B;&#x524D;
function fn(conf) {
  let id = conf.id;
  let name = conf.name;
  console.log(id, name);
}

--- ES6 &#x4E4B;&#x540E;
function fn({id, name}) {
  console.log(id, name);
}


2.&#x7D27;&#x63A5;&#x7740;&#xFF0C;&#x4E3A;&#x89E3;&#x6784;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x8BBE;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;

fn({
  id: &apos;0003&apos;
}); // &#x4E24;&#x8005;&#x90FD;&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0003&apos; &apos;Unnamed&apos;

--- ES6 &#x4E4B;&#x524D;
function fn(conf) {
  let id = conf.id || &apos;0000&apos;;
  let name = conf.name || &apos;Unnamed&apos;;
  console.log(id, name);
}

--- ES6 &#x4E4B;&#x540E;
function fn({
  id = &apos;0000&apos;,
  name = &apos;Unnamed&apos;
}) {
  console.log(id, name);
}


3.&#x6700;&#x540E;&#xFF0C;&#x518D;&#x4E3A;&#x6B64;&#x53C2;&#x6570;&#x8BBE;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;

fn(); // &#x4E24;&#x8005;&#x90FD;&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0000&apos; &apos;Unnamed&apos;

--- ES6 &#x4E4B;&#x524D;
function fn(conf) {
  conf = conf || {
    id: &apos;0000&apos;,
    name: &apos;Unnamed&apos;
  };
  
  let id = conf.id;
  let name = conf.name;
  
  console.log(id, name);
}

--- ES6 &#x4E4B;&#x540E;
function fn({
  id = &apos;0000&apos;,
  name = &apos;Unnamed&apos;
} = {}) {
  console.log(id, name);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span>&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#xFF0C;&#x5FEB;&#x901F;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x8D4B;&#x4E88;&#x76F8;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;

fn({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;0003&apos;</span>
}); <span class="hljs-comment">// &#x4E24;&#x8005;&#x90FD;&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0003&apos; undefined</span>

--- ES6 &#x4E4B;&#x524D;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">conf</span>) </span>{
  <span class="hljs-keyword">let</span> id = conf.id;
  <span class="hljs-keyword">let</span> name = conf.name;
  <span class="hljs-built_in">console</span>.log(id, name);
}

--- ES6 &#x4E4B;&#x540E;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">{id, name}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(id, name);
}


<span class="hljs-number">2.</span>&#x7D27;&#x63A5;&#x7740;&#xFF0C;&#x4E3A;&#x89E3;&#x6784;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x8BBE;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;

fn({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;0003&apos;</span>
}); <span class="hljs-comment">// &#x4E24;&#x8005;&#x90FD;&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0003&apos; &apos;Unnamed&apos;</span>

--- ES6 &#x4E4B;&#x524D;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">conf</span>) </span>{
  <span class="hljs-keyword">let</span> id = conf.id || <span class="hljs-string">&apos;0000&apos;</span>;
  <span class="hljs-keyword">let</span> name = conf.name || <span class="hljs-string">&apos;Unnamed&apos;</span>;
  <span class="hljs-built_in">console</span>.log(id, name);
}

--- ES6 &#x4E4B;&#x540E;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">{
  id = <span class="hljs-string">&apos;0000&apos;</span>,
  name = <span class="hljs-string">&apos;Unnamed&apos;</span>
}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(id, name);
}


<span class="hljs-number">3.</span>&#x6700;&#x540E;&#xFF0C;&#x518D;&#x4E3A;&#x6B64;&#x53C2;&#x6570;&#x8BBE;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;

fn(); <span class="hljs-comment">// &#x4E24;&#x8005;&#x90FD;&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0000&apos; &apos;Unnamed&apos;</span>

--- ES6 &#x4E4B;&#x524D;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">conf</span>) </span>{
  conf = conf || {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;0000&apos;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Unnamed&apos;</span>
  };
  
  <span class="hljs-keyword">let</span> id = conf.id;
  <span class="hljs-keyword">let</span> name = conf.name;
  
  <span class="hljs-built_in">console</span>.log(id, name);
}

--- ES6 &#x4E4B;&#x540E;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">{
  id = <span class="hljs-string">&apos;0000&apos;</span>,
  name = <span class="hljs-string">&apos;Unnamed&apos;</span>
} = {}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(id, name);
}</code></pre><p>&#x518D;&#x601D;&#x8003;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x662F;&#x5728;&#x89E3;&#x6784;&#x4E2D;&#x8FD8;&#x662F;&#x5728;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&#x4E2D;&#x8BBE;&#x5B9A;&#x5C5E;&#x6027;&#x7684;&#x503C;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1(x = {}, {a = 1, b = 2} = x) { console.log(a, b, x) }
function fn2(x = {a: 1, b: 2}, {a, b} = x) { console.log(a, b, x) }

&#x8FD9;&#x4E24;&#x65B9;&#x6CD5;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF1A;&#x53D8;&#x91CF;a, b&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x8BBE;&#x7F6E;&#x5730;&#x70B9;&#x3002;
&#x5982;&#x679C;&#x8981;&#x4F18;&#x5148;&#x786E;&#x4FDD;&#x89E3;&#x6790;&#x540E;&#x7684;&#x53D8;&#x91CF;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x66F4;&#x4E3A;&#x6709;&#x6548;&#x3002;

fn1(); // 1 2 {}
fn2(); // 1 2 {a:1, b:2}

fn1({}); // 1 2 {}
fn2({}); // undefined undefined {}

fn1({ a: 0 }); // 0 2 {a:0}
fn2({ a: 0 }); // 0 undefined {a:0}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params">x = {}, {a = <span class="hljs-number">1</span>, b = <span class="hljs-number">2</span>} = x</span>) </span>{ <span class="hljs-built_in">console</span>.log(a, b, x) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params">x = {a: <span class="hljs-number">1</span>, b: <span class="hljs-number">2</span>}, {a, b} = x</span>) </span>{ <span class="hljs-built_in">console</span>.log(a, b, x) }

&#x8FD9;&#x4E24;&#x65B9;&#x6CD5;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF1A;&#x53D8;&#x91CF;a, b&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x8BBE;&#x7F6E;&#x5730;&#x70B9;&#x3002;
&#x5982;&#x679C;&#x8981;&#x4F18;&#x5148;&#x786E;&#x4FDD;&#x89E3;&#x6790;&#x540E;&#x7684;&#x53D8;&#x91CF;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x66F4;&#x4E3A;&#x6709;&#x6548;&#x3002;

fn1(); <span class="hljs-comment">// 1 2 {}</span>
fn2(); <span class="hljs-comment">// 1 2 {a:1, b:2}</span>

fn1({}); <span class="hljs-comment">// 1 2 {}</span>
fn2({}); <span class="hljs-comment">// undefined undefined {}</span>

fn1({ <span class="hljs-attr">a</span>: <span class="hljs-number">0</span> }); <span class="hljs-comment">// 0 2 {a:0}</span>
fn2({ <span class="hljs-attr">a</span>: <span class="hljs-number">0</span> }); <span class="hljs-comment">// 0 undefined {a:0}</span></code></pre><h3 id="articleHeader6">2.3 rest &#x53C2;&#x6570;</h3><p>&#x5C06;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x4F5C;&#x7528;&#x4E8E;&#x53C2;&#x6570;&#xFF0C;&#x5373;&#x4E3A;<code>rest</code>&#x53C2;&#x6570;&#x3002;<br>&#x5B83;&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x76F8;&#x5E94;&#x7684;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;<code>rest</code>&#x53C2;&#x6570;&#x3002;<br><code>rest</code>&#x53C2;&#x6570;&#x53EA;&#x80FD;&#x662F;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6CA1;&#x6709;&#x6B63;&#x5219;&#x4E2D;&#x6240;&#x8C13;&#x7684;&#x8D2A;&#x5A6A;&#x6027;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6253;&#x5370;&#x51FA;&#xFF1A;&apos;0001&apos; [&apos;m1&apos;,&apos;m2&apos;]&#x3002;

fn(&apos;0001&apos;, &apos;m1&apos;, &apos;m2&apos;);

function fn(groupId, ...members) {
  console.log(groupId, members);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x6253;&#x5370;&#x51FA;&#xFF1A;<span class="hljs-string">&apos;0001&apos;</span> [<span class="hljs-string">&apos;m1&apos;</span>,<span class="hljs-string">&apos;m2&apos;</span>]&#x3002;

fn(<span class="hljs-string">&apos;0001&apos;</span>, <span class="hljs-string">&apos;m1&apos;</span>, <span class="hljs-string">&apos;m2&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">groupId, ...members</span>) </span>{
  <span class="hljs-built_in">console</span>.log(groupId, members);
}</code></pre><h3 id="articleHeader7">2.4 &#x4F5C;&#x7528;&#x57DF;</h3><p>&#x5982;&#x679C;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x4F7F;&#x7528;&#x4E86;&#x9ED8;&#x8BA4;&#x503C;&#x3001;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x6216;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x53C2;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x3002;</p><p>&#x6267;&#x884C;&#x51FD;&#x6570;&#x4F53;&#x65F6;&#xFF0C;&#x4F1A;&#x5148;&#x9ED8;&#x8BA4;&#x58F0;&#x660E;&#x53C2;&#x6570;&#x53D8;&#x91CF;&#x3002;<br>&#x5982;&#x679C;&#x5B58;&#x5728;&#x53C2;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4F1A;&#x5148;&#x6267;&#x884C;&#x5B83;&#xFF0C;&#x518D;&#x5230;&#x51FD;&#x6570;&#x4F53;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x3002;<br>&#x521D;&#x59CB;&#x5316;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x53C2;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x6D88;&#x5931;&#xFF0C;&#x4E4B;&#x540E;&#x51FD;&#x6570;&#x4F53;&#x4F1A;&#x9ED8;&#x8BA4;&#x58F0;&#x660E;&#x540C;&#x540D;&#x53D8;&#x91CF;&#x6307;&#x5411;&#x76F8;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x53D8;&#x91CF;&#x3002;</p><p>&#x56E0;&#x4E3A;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x5B58;&#x5728;&#xFF0C;&#x53C2;&#x6570;&#x662F;&#x60F0;&#x6027;&#xFF08;&#x8C03;&#x7528;&#x65F6;&#xFF09;&#x6C42;&#x503C;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let n = 0;

fn(); // 1

n = 1;
fn(); // 2

function fn(num = (n + 1)) {
  console.log(num);  
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> n = <span class="hljs-number">0</span>;

fn(); <span class="hljs-comment">// 1</span>

n = <span class="hljs-number">1</span>;
fn(); <span class="hljs-comment">// 2</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">num = (n + <span class="hljs-number">1</span></span>)) </span>{
  <span class="hljs-built_in">console</span>.log(num);  
}</code></pre><p>&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;&#x58F0;&#x660E;&#x539F;&#x5219;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x4E2D;&#x58F0;&#x660E;&#x540C;&#x540D;&#x53C2;&#x6570;&#x76F8;&#x5F53;&#x4E8C;&#x6B21;&#x58F0;&#x660E;&#x3002;<br>&#x4F7F;&#x7528;<code>let</code>, <code>const</code>&#x76F8;&#x5F53;&#x91CD;&#x590D;&#x58F0;&#x660E;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#x3002;<br>&#x4F7F;&#x7528;<code>var</code>&#x4F1A;&#x89E3;&#x7ED1;&#x51FD;&#x6570;&#x4F53;&#x4E0E;&#x53C2;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x5173;&#x8054;&#xFF0C;&#x53D8;&#x91CF;&#x4FBF;&#x6210;&#x4E86;&#x7EAF;&#x7CB9;&#x7684;&#x51FD;&#x6570;&#x4F53;&#x53D8;&#x91CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- &#x666E;&#x901A;
let x = 0;
fn(1); // 2
function fn(x, y = () =&gt; { console.log(x) }) {
  x = 2;
  y();
}

--- &#x89E3;&#x7ED1;
let x = 0;
fn(1); // 1
function fn(x, y = () =&gt; { console.log(x) }) {
  var x = 2;
  y();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- &#x666E;&#x901A;
<span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>;
fn(<span class="hljs-number">1</span>); <span class="hljs-comment">// 2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">x, y = (</span>) =&gt; </span>{ <span class="hljs-built_in">console</span>.log(x) }) {
  x = <span class="hljs-number">2</span>;
  y();
}

--- &#x89E3;&#x7ED1;
<span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>;
fn(<span class="hljs-number">1</span>); <span class="hljs-comment">// 1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">x, y = (</span>) =&gt; </span>{ <span class="hljs-built_in">console</span>.log(x) }) {
  <span class="hljs-keyword">var</span> x = <span class="hljs-number">2</span>;
  y();
}</code></pre><p>&#x5982;&#x679C;&#x5B58;&#x5728;&#x53C2;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5C31;&#x4E0D;&#x80FD;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x4E2D;&#x663E;&#x5F0F;&#x7684;&#x8BBE;&#x5B9A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;<br>&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x5E94;&#x8BE5;&#x540C;&#x65F6;&#x4F5C;&#x7528;&#x4E8E;&#x51FD;&#x6570;&#x4F53;&#x548C;&#x53C2;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x3002;<br>&#x4F46;&#x662F;&#x53EA;&#x6709;&#x8FDB;&#x5165;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x624D;&#x80FD;&#x77E5;&#x9053;&#x662F;&#x5426;&#x6709;&#x663E;&#x5F0F;&#x5730;&#x58F0;&#x660E;&#xFF0C;&#x800C;&#x53C2;&#x6570;&#x4F53;&#x5374;&#x5148;&#x4E8E;&#x51FD;&#x6570;&#x4F53;&#x6267;&#x884C;&#x3002;<br>&#x4E0D;&#x8FC7;&#x53EF;&#x4EE5;&#x53D8;&#x901A;&#x7684;&#xFF0C;&#x5C06;&#x6B64;&#x51FD;&#x6570;&#x7F6E;&#x4E8E;&#x4E00;&#x4E2A;&#x5904;&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x7684;&#x73AF;&#x5883;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x62A5;&#x9519;&#xFF1A;Illegal &apos;use strict&apos; directive ...
function fn(n = 0) {
  &quot;use strict&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x62A5;&#x9519;&#xFF1A;Illegal <span class="hljs-string">&apos;use strict&apos;</span> directive ...
function fn(n = <span class="hljs-number">0</span>) {
  <span class="hljs-string">&quot;use strict&quot;</span>;
}</code></pre><h2 id="articleHeader8">3 &#x51FD;&#x6570;&#x5C5E;&#x6027;</h2><h3 id="articleHeader9">3.1 name</h3><p>&#x4E0D;&#x540C;&#x5F62;&#x5F0F;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5176;<code>name</code>&#x5C5E;&#x6027;&#x503C;&#x6784;&#x5EFA;&#x7684;&#x65B9;&#x5F0F;&#x4E5F;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x4E2A;&#x4EBA;&#x603B;&#x7ED3;&#x7684;&#x516B;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x58F0;&#x660E;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x4E3A;&#x51FD;&#x6570;&#x540D;&#x3002;
console.log(fn.name); // &apos;fn&apos;
function fn() {}

2.&#x547D;&#x540D;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x4E3A;&#x51FD;&#x6570;&#x540D;&#x3002;
let fn1 = function fn() {};
console.log(fn1.name); // &apos;fn&apos;

3.&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E3A;&#x7B2C;&#x4E00;&#x6B21;&#x8D4B;&#x503C;&#x7684;&#x53D8;&#x91CF;/&#x5C5E;&#x6027;&#x3002;
let fn = function() {};
console.log(fn.name); // &apos;fn&apos;
let fn1 = fn();
console.log(fn.name); // &apos;fn&apos;
let obj = { fn: function() {} };
console.log(fn.name); // &apos;fn&apos;

4.&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x7684;&#x533F;&#x540D;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E3A;&#x7A7A;&#x3002;
console.log( (function() {}).name ); // &apos;&apos;

5.&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;&#x751F;&#x6210;&#x7684;&#xFF0C;&#x4E3A; anonymous &#x3002;
console.log( (new Function()).name ); // &apos;anonymous&apos;

6.&#x901A;&#x8FC7; bind() &#x751F;&#x6210;&#x7684;&#xFF0C;name &#x5C5E;&#x6027;&#x503C;&#x4F1A;&#x52A0;&#x4E0A; bound &#x524D;&#x7F00;&#x3002;
console.log( (function() {}).bind({}).name ); // &apos;bound &apos;
console.log( (function fn() {}).bind({}).name ); // &apos;bound fn&apos;

7.&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#x4E3A; Symbol &#x503C;&#xFF0C;name &#x5C5E;&#x6027;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x6B64; Symbol &#x7684;&#x63CF;&#x8FF0;&#x3002;
let s1 = Symbol();
let s2 = Symbol(&apos;s2&apos;);
console.log( ({ [s1]() {} })[s1].name ); // &apos;&apos;
console.log( ({ [s2]() {} })[s2].name ); // [s2]

8.getter/setter &#x51FD;&#x6570;&#x7684; name &#x5C5E;&#x6027;&#xFF0C;&#x5728;&#x5176;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x7684; get/set &#x5C5E;&#x6027;&#x4E0A;&#xFF0C;&#x4E3A; get/set &#x51FD;&#x6570;&#x540D;&#x3002;
let obj = {
   get name() {}
};
Object.getOwnPropertyDescriptor(obj, &apos;name&apos;).get.name; // &apos;get name&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1.</span>&#x58F0;&#x660E;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x4E3A;&#x51FD;&#x6570;&#x540D;&#x3002;
<span class="hljs-built_in">console</span>.log(fn.name); <span class="hljs-comment">// &apos;fn&apos;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-number">2.</span>&#x547D;&#x540D;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x4E3A;&#x51FD;&#x6570;&#x540D;&#x3002;
<span class="hljs-keyword">let</span> fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-built_in">console</span>.log(fn1.name); <span class="hljs-comment">// &apos;fn&apos;</span>

<span class="hljs-number">3.</span>&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E3A;&#x7B2C;&#x4E00;&#x6B21;&#x8D4B;&#x503C;&#x7684;&#x53D8;&#x91CF;/&#x5C5E;&#x6027;&#x3002;
<span class="hljs-keyword">let</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-built_in">console</span>.log(fn.name); <span class="hljs-comment">// &apos;fn&apos;</span>
<span class="hljs-keyword">let</span> fn1 = fn();
<span class="hljs-built_in">console</span>.log(fn.name); <span class="hljs-comment">// &apos;fn&apos;</span>
<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">fn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{} };
<span class="hljs-built_in">console</span>.log(fn.name); <span class="hljs-comment">// &apos;fn&apos;</span>

<span class="hljs-number">4.</span>&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x7684;&#x533F;&#x540D;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E3A;&#x7A7A;&#x3002;
<span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}).name ); <span class="hljs-comment">// &apos;&apos;</span>

<span class="hljs-number">5.</span>&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;&#x751F;&#x6210;&#x7684;&#xFF0C;&#x4E3A; anonymous &#x3002;
<span class="hljs-built_in">console</span>.log( (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>()).name ); <span class="hljs-comment">// &apos;anonymous&apos;</span>

<span class="hljs-number">6.</span>&#x901A;&#x8FC7; bind() &#x751F;&#x6210;&#x7684;&#xFF0C;name &#x5C5E;&#x6027;&#x503C;&#x4F1A;&#x52A0;&#x4E0A; bound &#x524D;&#x7F00;&#x3002;
<span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}).bind({}).name ); <span class="hljs-comment">// &apos;bound &apos;</span>
<span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{}).bind({}).name ); <span class="hljs-comment">// &apos;bound fn&apos;</span>

<span class="hljs-number">7.</span>&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#x4E3A; <span class="hljs-built_in">Symbol</span> &#x503C;&#xFF0C;name &#x5C5E;&#x6027;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x6B64; <span class="hljs-built_in">Symbol</span> &#x7684;&#x63CF;&#x8FF0;&#x3002;
<span class="hljs-keyword">let</span> s1 = <span class="hljs-built_in">Symbol</span>();
<span class="hljs-keyword">let</span> s2 = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">&apos;s2&apos;</span>);
<span class="hljs-built_in">console</span>.log( ({ [s1]() {} })[s1].name ); <span class="hljs-comment">// &apos;&apos;</span>
<span class="hljs-built_in">console</span>.log( ({ [s2]() {} })[s2].name ); <span class="hljs-comment">// [s2]</span>

<span class="hljs-number">8.</span>getter/setter &#x51FD;&#x6570;&#x7684; name &#x5C5E;&#x6027;&#xFF0C;&#x5728;&#x5176;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x7684; get/set &#x5C5E;&#x6027;&#x4E0A;&#xFF0C;&#x4E3A; get/set &#x51FD;&#x6570;&#x540D;&#x3002;
<span class="hljs-keyword">let</span> obj = {
   get name() {}
};
<span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, <span class="hljs-string">&apos;name&apos;</span>).get.name; <span class="hljs-comment">// &apos;get name&apos;</span></code></pre><h3 id="articleHeader10">3.2 length</h3><p>&#x5176;&#x672C;&#x8D28;&#x542B;&#x4E49;&#x662F;&#x8BE5;&#x51FD;&#x6570;&#x9884;&#x671F;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x3002;<br>&#x5982;&#x679C;&#x53C2;&#x6570;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x6216;&#x4E3A;<code>rest</code>&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x5B83;&#x4EE5;&#x53CA;&#x5B83;&#x4E4B;&#x540E;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x8BA1;&#x7B97;&#x5728;&#x5185;&#x3002;<br>&#x57FA;&#x4E8E;&#x8FD9;&#x70B9;&#xFF0C;&#x5728;&#x53C2;&#x6570;&#x8BBE;&#x8BA1;&#x4E0A;&#xFF0C;&#x4E00;&#x822C;&#x628A;&#x53EF;&#x4EE5;&#x7701;&#x7565;&#x6216;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x4E3A;&#x5C3E;&#x53C2;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( (function(...args) {}).length ); // 0
console.log( (function(a, {b}, c = 5, d) {}).length ); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) </span>{}).length ); <span class="hljs-comment">// 0</span>
<span class="hljs-built_in">console</span>.log( (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, {b}, c = <span class="hljs-number">5</span>, d</span>) </span>{}).length ); <span class="hljs-comment">// 2</span></code></pre><h3 id="articleHeader11">3.3 arguments</h3><p>&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;<code>arguments</code>&#x4FDD;&#x5B58;&#x7684;&#x4EC5;&#x4EC5;&#x5B58;&#x50A8;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x65F6;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x53C2;&#x6570;&#x3002;<br>&#x8FD9;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x53C2;&#x6570;&#x3001;&#x89E3;&#x6784;&#x53C2;&#x6570;&#x6216;<code>rest</code>&#x53C2;&#x6570;&#x7B49;&#x90FD;&#x4E0D;&#x5728;&#x5176;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (name = &apos;Wmaker&apos;) {
  console.log(name, arguments.length);
})(); // &apos;Wmaker&apos; 0

(function ({a, b}) {
  console.log(a, b, arguments.length);
})({ a: 1, b: 2 }); // 1 2 1

(function (...arr) {
  console.log(arr, arguments.length);
})(1, 2, 3); // [1, 2, 3] 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name = <span class="hljs-string">&apos;Wmaker&apos;</span></span>) </span>{
  <span class="hljs-built_in">console</span>.log(name, <span class="hljs-built_in">arguments</span>.length);
})(); <span class="hljs-comment">// &apos;Wmaker&apos; 0</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{a, b}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(a, b, <span class="hljs-built_in">arguments</span>.length);
})({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> }); <span class="hljs-comment">// 1 2 1</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...arr</span>) </span>{
  <span class="hljs-built_in">console</span>.log(arr, <span class="hljs-built_in">arguments</span>.length);
})(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// [1, 2, 3] 3</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：函数扩展

## 原文链接
[https://segmentfault.com/a/1190000015352725](https://segmentfault.com/a/1190000015352725)

