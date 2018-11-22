---
title: 'Iterator：访问数据集合的统一接口' 
date: 2018-11-22 11:48:09
hidden: true
slug: n2m0rudg8nb
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5BFC;&#x8BED;</h2><p>&#x904D;&#x5386;&#x5668;<code>Iterator</code>&#x662F;ES6&#x4E3A;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x96C6;&#x5408;&#x63D0;&#x4F9B;&#x7684;&#x7EDF;&#x4E00;&#x63A5;&#x53E3;&#x3002;&#x4EFB;&#x4F55;&#x5185;&#x90E8;&#x90E8;&#x7F72;&#x4E86;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x96C6;&#x5408;&#xFF0C;&#x5BF9;&#x4E8E;&#x7528;&#x6237;&#x6765;&#x8BF4;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x76F8;&#x540C;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x6700;&#x65B0;&#x7248;<code>Chrome</code>&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x8981;&#x77E5;&#x9053;&#x2014;&#x2014;&#x6211;&#x4EEC;&#x6240;&#x719F;&#x6089;&#x7684;&#x6570;&#x7EC4;&#x5C0F;&#x59D0;&#xFF0C;&#x5DF2;&#x6084;&#x6084;&#x7684;&#x6253;&#x5F00;&#x4E86;&#x53E6;&#x4E00;&#x6247;&#x53EF;&#x62B5;&#x8FBE;&#x5979;&#x5FC3;&#x6249;&#x7684;&#x5C0F;&#x5F84;&#x3002;</p><h2 id="articleHeader1">1 &#x6B63;&#x9898;</h2><p>&#x67D0;&#x4E2A;&#x6570;&#x636E;&#x96C6;&#x5408;&#x90E8;&#x7F72;&#x4E86;<code>Iterator</code>&#x63A5;&#x53E3;&#xFF0C;&#x662F;&#x6307;&#x5176;<code>Symbol.iterator</code>&#x5C5E;&#x6027;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x80FD;&#x8FD4;&#x56DE;<code>Iterator</code>&#x63A5;&#x53E3;&#x7684;&#x51FD;&#x6570;&#x3002;&#x4EFB;&#x4F55;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x904D;&#x5386;&#x5668;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x96C6;&#x5408;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x6B64;&#x5C5E;&#x6027;&#x4EE5;&#x5F97;&#x5230;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x518D;&#x6309;&#x7167;&#x8BBE;&#x5B9A;&#x7684;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x8BBF;&#x95EE;&#x8BE5;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x6210;&#x5458;&#xFF08;&#x5173;&#x4E8E;<code>Symbol.iterator</code>&#x8BF7;&#x770B;&#x6700;&#x540E;&#x4E00;&#x8282;&#x7684;&#x5EF6;&#x4F38;&#x9605;&#x8BFB;&#xFF09;&#x3002;&#x6BD4;&#x5982;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x7684;&#x904D;&#x5386;&#x5668;&#x4E3A;<code>[][Symbol.iterator]</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x5176;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x83B7;&#x53D6;<code>Array.prototype[Symbol.iterator]</code>&#x3002;</p><h3 id="articleHeader2">1.1 &#x57FA;&#x672C;&#x884C;&#x4E3A;</h3><p>&#x8C03;&#x7528;<code>Iterator</code>&#x63A5;&#x53E3;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#xFF08;&#x6307;&#x9488;&#x5BF9;&#x8C61;&#xFF09;&#x3002;<br>&#x5BF9;&#x8C61;&#x4E2D;&#x5FC5;&#x7136;&#x6709;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x8BBF;&#x95EE;&#x4E0B;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x6210;&#x5458;&#x3002;&#x6307;&#x9488;&#x521D;&#x59CB;&#x65F6;&#x6307;&#x5411;&#x5F53;&#x524D;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#x3002;</p><p>&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6307;&#x9488;&#x6307;&#x5411;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x6210;&#x5458;&#x3002;<br>&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6307;&#x9488;&#x6307;&#x5411;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x6210;&#x5458;&#x3002;<br>&#x4E0D;&#x65AD;&#x7684;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#x7684;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x76F4;&#x5230;&#x5B83;&#x6307;&#x5411;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x3002;</p><p>&#x6BCF;&#x6B21;&#x8C03;&#x7528;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;&#x76F8;&#x540C;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF1A;<code>{ value, done }</code>&#x3002;<br>&#x5176;&#x4E2D;<code>value</code>&#x8868;&#x793A;&#x5F53;&#x524D;&#x6307;&#x5411;&#x6210;&#x5458;&#x7684;&#x503C;&#xFF0C;&#x6CA1;&#x6709;&#x5219;&#x4E3A;<code>undefined</code>&#x3002;<br>&#x5176;&#x4E2D;<code>done</code>&#x662F;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x904D;&#x5386;&#x662F;&#x5426;&#x7ED3;&#x675F;&#xFF0C;&#x7ED3;&#x675F;&#x4E3A;<code>true</code>&#xFF0C;&#x5426;&#x5219;<code>false</code>&#x3002;</p><p>&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x6807;&#x51C6;&#x5341;&#x5206;&#x7B80;&#x6D01;&#xFF0C;&#x4E0D;&#x63D0;&#x4F9B;&#x8BF8;&#x5982;&#xFF1A;&#x64CD;&#x4F5C;&#x5185;&#x90E8;&#x6307;&#x9488;&#x3001;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x503C;&#x7B49;&#x7B49;&#x65B9;&#x6CD5;&#x3002;&#x53EA;&#x9700;&#x8981;&#x4E00;&#x76F4;&#x4E0D;&#x65AD;&#x7684;&#x8C03;&#x7528;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;<code>done</code>&#x4E3A;<code>false</code>&#x65F6;&#x83B7;&#x53D6;&#x5F53;&#x65F6;&#x7684;<code>value</code>&#xFF0C;<code>done</code>&#x4E3A;<code>true</code>&#x65F6;&#x505C;&#x6B62;&#x5373;&#x53EF;&#x3002;&#x7B2C;&#x4E00;&#x6B21;&#x63A5;&#x89E6;&#x904D;&#x5386;&#x5668;&#x7684;&#x884C;&#x4E3A;&#x6A21;&#x5F0F;&#x662F;&#x5728;2016&#x7684;&#x51AC;&#x5929;&#xFF0C;&#x90A3;&#x65F6;&#x5E95;&#x8574;&#x4E0D;&#x591F;&#x9E21;&#x6BDB;&#x4E5F;&#x6CA1;&#x957F;&#x5168;&#xFF0C;&#x7406;&#x89E3;&#x4E0D;&#x4E86;&#x7B80;&#x6D01;&#x6027;&#x7684;&#x9002;&#x7528;&#x548C;&#x5F3A;&#x5927;&#x3002;&#x76F4;&#x5230;&#x73B0;&#x5728;&#x2014;&#x2014;&#x5728;&#x5373;&#x5C06;&#x6253;&#x5305;&#x88AB;&#x8FEB;&#x79BB;&#x5F00;&#x516C;&#x53F8;&#x7684;&#x524D;&#x5915;&#x624D;&#x84E6;&#x7136;&#x7684;&#x9192;&#x89C9;&#x3002;&#x591A;&#x4E48;&#x75DB;&#x7684;&#x9886;&#x609F;&#x554A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let iterator = [1, 2, 3][Symbol.iterator]();

console.log( iterator.next() ); // {value: 1, done: false}
console.log( iterator.next() ); // {value: 2, done: false}
console.log( iterator.next() ); // {value: 3, done: false}
console.log( iterator.next() ); // {value: undefined, done: true}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> iterator = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>][<span class="hljs-built_in">Symbol</span>.iterator]();

<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: 1, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: 2, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: 3, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: undefined, done: true}</span></code></pre><h3 id="articleHeader3">1.2 &#x7B80;&#x5355;&#x5B9E;&#x73B0;</h3><p>&#x9762;&#x5411;&#x4E0D;&#x540C;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x904D;&#x5386;&#x5668;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x4E0B;&#x6570;&#x7EC4;&#x7684;&#x904D;&#x5386;&#x5668;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let res = null;
let iterator = myIterator([3, 7]);

console.log( iterator.next() ); // {value: 3, done: false}
console.log( iterator.next() ); // {value: 7, done: false}
console.log( iterator.next() ); // {value: undefined, done: true}

function myIterator(array = []) {
  let index = 0;
  return {
    next() {
      return index &lt; array.length 
        ? { value: array[index++], done: false }
        : { value: undefined, done: true };
    }
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> res = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">let</span> iterator = myIterator([<span class="hljs-number">3</span>, <span class="hljs-number">7</span>]);

<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: 3, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: 7, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: undefined, done: true}</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myIterator</span>(<span class="hljs-params">array = []</span>) </span>{
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">return</span> {
    next() {
      <span class="hljs-keyword">return</span> index &lt; array.length 
        ? { <span class="hljs-attr">value</span>: array[index++], <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> }
        : { <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
    }
  };
}</code></pre><h3 id="articleHeader4">1.3 return &amp; throw</h3><p>&#x9664;&#x4E86;&#x4E3A;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x90E8;&#x7F72;<code>next</code>&#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6709;<code>return</code>&#x548C;<code>throw</code>&#x65B9;&#x6CD5;&#x3002;&#x5176;&#x4E2D;<code>return</code>&#x65B9;&#x6CD5;&#x4F1A;&#x5728;&#x63D0;&#x524D;&#x9000;&#x51FA;<code>for of</code>&#x5FAA;&#x73AF;&#x65F6;&#xFF08;&#x901A;&#x5E38;&#x662F;&#x56E0;&#x4E3A;&#x51FA;&#x9519;&#xFF0C;&#x6216;&#x89E6;&#x53D1;&#x4E86;<code>break</code>&#x8BED;&#x53E5;&#xFF09;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x800C;<code>throw</code>&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x662F;&#x914D;&#x5408;<code>Generator</code>&#x51FD;&#x6570;&#x4F7F;&#x7528;&#xFF0C;&#x4E00;&#x822C;&#x7684;&#x904D;&#x5386;&#x5668;&#x5BF9;&#x8C61;&#x7528;&#x4E0D;&#x5230;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4E88;&#x4ECB;&#x7ECD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  [Symbol.iterator]() {
    let index = 0;
    let array = [1, 2, 3];

    return {
      next() {
        return index &lt; array.length 
          ? { value: array[index++], done: false }
          : { value: undefined, done: true };
      },
      return() {
        console.log(&apos;Trigger return.&apos;);
        return {};
      }
    };
  }
};

for (let v of obj) {
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3&#xFF0C;&#x6CA1;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;
}

for (let v of obj) {
  if (v === 2) break;
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1&#xFF0C;&#x4E4B;&#x540E;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;
}

for (let v of obj) {
  if (v === 3) break;
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2&#xFF0C;&#x4E4B;&#x540E;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;
}

for (let v of obj) {
  if (v === 4) break;
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3&#xFF0C;&#x6CA1;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;
}

for (let v of obj) {
  if (v === 2) throw Error(&apos;error&apos;);
  console.log(v); // &#x6253;&#x5370;&#x51FA;&#xFF1A;1&#xFF0C;&#x4E4B;&#x540E;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x62A5;&#x9519;&#x505C;&#x6B62;&#x6267;&#x884C;&#x3002;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  [<span class="hljs-built_in">Symbol</span>.iterator]() {
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> array = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

    <span class="hljs-keyword">return</span> {
      next() {
        <span class="hljs-keyword">return</span> index &lt; array.length 
          ? { <span class="hljs-attr">value</span>: array[index++], <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> }
          : { <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
      },
      <span class="hljs-keyword">return</span>() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Trigger return.&apos;</span>);
        <span class="hljs-keyword">return</span> {};
      }
    };
  }
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> obj) {
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3&#xFF0C;&#x6CA1;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> obj) {
  <span class="hljs-keyword">if</span> (v === <span class="hljs-number">2</span>) <span class="hljs-keyword">break</span>;
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;1&#xFF0C;&#x4E4B;&#x540E;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> obj) {
  <span class="hljs-keyword">if</span> (v === <span class="hljs-number">3</span>) <span class="hljs-keyword">break</span>;
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2&#xFF0C;&#x4E4B;&#x540E;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> obj) {
  <span class="hljs-keyword">if</span> (v === <span class="hljs-number">4</span>) <span class="hljs-keyword">break</span>;
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3&#xFF0C;&#x6CA1;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#x3002;</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> obj) {
  <span class="hljs-keyword">if</span> (v === <span class="hljs-number">2</span>) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;error&apos;</span>);
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;1&#xFF0C;&#x4E4B;&#x540E;&#x89E6;&#x53D1; return &#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x62A5;&#x9519;&#x505C;&#x6B62;&#x6267;&#x884C;&#x3002;</span>
}</code></pre><h2 id="articleHeader5">2 &#x539F;&#x751F;&#x652F;&#x6301;</h2><h3 id="articleHeader6">2.1 &#x9ED8;&#x8BA4;&#x6301;&#x6709;&#x904D;&#x5386;&#x5668;</h3><p>&#x539F;&#x751F;&#x9ED8;&#x8BA4;&#x6301;&#x6709;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6709;&#xFF1A;<br>&#x57FA;&#x672C;&#x7C7B;&#x578B;&#xFF1A;<code>Array</code>, <code>Set</code>, <code>Map</code>&#xFF08;&#x56DB;&#x79CD;&#x57FA;&#x672C;&#x6570;&#x636E;&#x96C6;&#x5408;&#xFF1A;<code>Array</code>, <code>Object</code>, <code>Set</code> &#x548C; <code>Map</code>&#xFF09;&#x3002;<br>&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF1A;<code>arguments</code>, <code>NodeList</code>, <code>String</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let iterator = &apos;123&apos;[Symbol.iterator]();

console.log( iterator.next() ); // {value: &quot;1&quot;, done: false}
console.log( iterator.next() ); // {value: &quot;2&quot;, done: false}
console.log( iterator.next() ); // {value: &quot;3&quot;, done: false}
console.log( iterator.next() ); // {value: undefined, done: true}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> iterator = <span class="hljs-string">&apos;123&apos;</span>[<span class="hljs-built_in">Symbol</span>.iterator]();

<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: &quot;1&quot;, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: &quot;2&quot;, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: &quot;3&quot;, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: undefined, done: true}</span></code></pre><p><strong>&#x904D;&#x5386;&#x5668;&#x4E0E;&#x5148;&#x524D;&#x7684;&#x904D;&#x5386;&#x65B9;&#x6CD5;</strong><br>&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x96C6;&#x5408;&#x62E5;&#x6709;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#xFF0C;&#x5E76;&#x4E0D;&#x610F;&#x5473;&#x7740;&#x6240;&#x6709;&#x904D;&#x5386;&#x5B83;&#x7684;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x4F7F;&#x7528;&#x6B64;&#x63A5;&#x53E3;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x53EA;&#x6709;ES6&#x65B0;&#x589E;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#x548C;&#x67D0;&#x4E9B;&#x65B9;&#x6CD5;&#x4F1A;&#x4F7F;&#x7528;&#xFF0C;&#x4E0B;&#x9762;&#x4F1A;&#x6709;&#x4ECB;&#x7ECD;&#x3002;&#x4EE5;&#x6570;&#x7EC4;&#x6765;&#x8BF4;&#xFF0C;&#x5BF9;&#x5176;&#x4F7F;&#x7528;<code>for</code>&#x548C;<code>for of</code>&#x867D;&#x7136;&#x53EF;&#x8BBF;&#x95EE;&#x5230;&#x76F8;&#x540C;&#x7684;&#x6210;&#x5458;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x5F0F;&#x5374;&#x4E0D;&#x540C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6539;&#x53D8;&#x6570;&#x7EC4;&#x9ED8;&#x8BA4;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x3002;
Array.prototype[Symbol.iterator] = function () {
  let index = 0;
  let array = this;

  console.log(&apos;Use iterator&apos;);

  return {
    next() {
      return index &lt; array.length 
        ? { value: array[index++], done: false }
        : { value: undefined, done: true };
    }
  }
};

let arr = [1, 2];

for (let v of arr) {
  console.log(v); // &#x6253;&#x5370;&#x51FA; Use iterator, 1, 2&#x3002;
}

for (let i = 0; i &lt; arr.length; i++) {
  console.log(arr[i]); // &#x6253;&#x5370;&#x51FA; 1, 2&#x3002;
}

arr.forEach(d =&gt; {
  console.log(d); // &#x6253;&#x5370;&#x51FA; 1, 2&#x3002;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6539;&#x53D8;&#x6570;&#x7EC4;&#x9ED8;&#x8BA4;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x3002;</span>
<span class="hljs-built_in">Array</span>.prototype[<span class="hljs-built_in">Symbol</span>.iterator] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">let</span> array = <span class="hljs-keyword">this</span>;

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Use iterator&apos;</span>);

  <span class="hljs-keyword">return</span> {
    next() {
      <span class="hljs-keyword">return</span> index &lt; array.length 
        ? { <span class="hljs-attr">value</span>: array[index++], <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> }
        : { <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
    }
  }
};

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> arr) {
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA; Use iterator, 1, 2&#x3002;</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
  <span class="hljs-built_in">console</span>.log(arr[i]); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA; 1, 2&#x3002;</span>
}

arr.forEach(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(d); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA; 1, 2&#x3002;</span>
});</code></pre><p><strong>&#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;</strong><br>&#x4E3A;&#x4EC0;&#x4E48;&#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#xFF1F;&#x8FD9;&#x8981;&#x4ECE;&#x4E24;&#x65B9;&#x9762;&#x8BF4;&#x660E;&#x3002;&#x4E00;&#x4E3A;&#x904D;&#x5386;&#x5668;&#x662F;&#x79CD;&#x7EBF;&#x6027;&#x5904;&#x7406;&#x7ED3;&#x6784;&#xFF0C;&#x5BF9;&#x4E8E;&#x4EFB;&#x4F55;&#x975E;&#x7EBF;&#x6027;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x90E8;&#x7F72;&#x4E86;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#xFF0C;&#x5C31;&#x7B49;&#x4E8E;&#x90E8;&#x7F72;&#x4E00;&#x79CD;&#x7EBF;&#x6027;&#x8F6C;&#x6362;&#x3002;&#x4E8C;&#x662F;&#x5BF9;&#x8C61;&#x672C;&#x6765;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x65E0;&#x5E8F;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x5982;&#x679C;&#x5E0C;&#x671B;&#x5176;&#x6709;&#x5E8F;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>Map</code>&#x4EE3;&#x66FF;&#x3002;&#x8FD9;&#x5373;&#x662F;&#x5404;&#x6709;&#x5176;&#x957F;&#xFF0C;&#x5404;&#x5B89;&#x5176;&#x804C;&#x3002;&#x5C4E;&#x58F3;&#x90CE;&#x5982;&#x679C;&#x4E0D;&#x6EDA;&#x7CAA;&#x7403;&#x800C;&#x53BB;&#x91C7;&#x871C;&#xFF0C;&#x90A3;&#xFF0C;&#x5443;&#xFF0C;&#x82B1;&#x59B9;&#x59B9;&#x53EF;&#x80FD;&#x5C31;&#x906D;&#x6B83;&#x54AF;&#x3002;</p><p>&#x81EA;&#x884C;&#x751F;&#x6210;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF08;&#x62E5;&#x6709;<code>length</code>&#x5C5E;&#x6027;&#xFF09;&#xFF0C;&#x4E0D;&#x5177;&#x5907;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x3002;&#x8FD9;&#x4E0E;<code>String</code>&#x7B49;&#x539F;&#x751F;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x4E0D;&#x540C;&#xFF0C;&#x6BD5;&#x7ADF;&#x4EBA;&#x5BB6;&#x662F;&#x4EB2;&#x751F;&#x7684;&#xFF0C;&#x4E00;&#x51FA;&#x751F;&#x5C31;&#x542B;&#x7740;&#x91D1;&#x94A5;&#x5319;&#xFF08;&#x4E5F;&#x4E0D;&#x6015;&#x8BEF;&#x541E;&#xFF09;&#x3002;&#x4E0D;&#x8FC7;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x6570;&#x7EC4;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x76F4;&#x63A5;&#x5E94;&#x7528;&#x4E8E;&#x81EA;&#x884C;&#x751F;&#x6210;&#x7684;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF0C;&#x7B80;&#x5355;&#x6709;&#x6548;&#x65E0;&#x526F;&#x4F5C;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  0: &apos;a&apos;,
  1: &apos;b&apos;,
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

let iterator = obj[Symbol.iterator]();
console.log( iterator.next() ); // {value: &quot;a&quot;, done: false}
console.log( iterator.next() ); // {value: &quot;b&quot;, done: false}
console.log( iterator.next() ); // {value: undefined, done: true}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-number">0</span>: <span class="hljs-string">&apos;a&apos;</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">&apos;b&apos;</span>,
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>,
  [<span class="hljs-built_in">Symbol</span>.iterator]: <span class="hljs-built_in">Array</span>.prototype[<span class="hljs-built_in">Symbol</span>.iterator]
};

<span class="hljs-keyword">let</span> iterator = obj[<span class="hljs-built_in">Symbol</span>.iterator]();
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: &quot;a&quot;, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: &quot;b&quot;, done: false}</span>
<span class="hljs-built_in">console</span>.log( iterator.next() ); <span class="hljs-comment">// {value: undefined, done: true}</span></code></pre><p>&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#xFF0C;&#x4E5F;&#x4E0D;&#x5F71;&#x54CD;&#x4E4B;&#x524D;&#x4E0D;&#x4F7F;&#x7528;&#x904D;&#x5386;&#x5668;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;<code>for in</code>, <code>Object.keys</code>&#x7B49;&#x7B49;&#xFF08;&#x4E24;&#x8005;&#x4E0D;&#x7B49;&#x540C;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  0: &apos;a&apos;,
  1: &apos;b&apos;,
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

console.log( Object.keys(obj) ); // [&quot;0&quot;, &quot;1&quot;, &quot;length&quot;]

for (let v of obj) {
  console.log(v); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;&quot;a&quot;, &quot;b&quot;&#x3002;
}

for (let k in obj) {
  console.log(k); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;&quot;0&quot;, &quot;1&quot;, &quot;length&quot;&#x3002;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-number">0</span>: <span class="hljs-string">&apos;a&apos;</span>,
  <span class="hljs-number">1</span>: <span class="hljs-string">&apos;b&apos;</span>,
  <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>,
  [<span class="hljs-built_in">Symbol</span>.iterator]: <span class="hljs-built_in">Array</span>.prototype[<span class="hljs-built_in">Symbol</span>.iterator]
};

<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Object</span>.keys(obj) ); <span class="hljs-comment">// [&quot;0&quot;, &quot;1&quot;, &quot;length&quot;]</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> obj) {
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;&quot;a&quot;, &quot;b&quot;&#x3002;</span>
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> obj) {
  <span class="hljs-built_in">console</span>.log(k); <span class="hljs-comment">// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;&quot;0&quot;, &quot;1&quot;, &quot;length&quot;&#x3002;</span>
}</code></pre><h3 id="articleHeader7">2.2 &#x9ED8;&#x8BA4;&#x8C03;&#x7528;&#x904D;&#x5386;&#x5668;</h3><p><strong>for of</strong><br><code>for of</code>&#x662F;&#x4E13;&#x95E8;&#x7528;&#x6765;&#x6D88;&#x8D39;&#x904D;&#x5386;&#x5668;&#x7684;&#xFF0C;&#x5176;&#x904D;&#x5386;&#x7684;&#x662F;&#x952E;&#x503C;&#xFF08;<code>for in</code>&#x904D;&#x5386;&#x7684;&#x662F;&#x952E;&#x540D;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let v of [1, 2, 3])  {
  console.log(v); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3&#x3002;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])  {
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3&#x3002;</span>
}</code></pre><p><strong>&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;</strong><br>&#x65E0;&#x8BBA;&#x662F;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x6216;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x90FD;&#x662F;&#x9ED8;&#x8BA4;&#x8C03;&#x7528;&#x904D;&#x5386;&#x5668;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [...a] = [3, 2, 1]; // [3, 2, 1]
let b = [...[3, 2, 1]]; // [3, 2, 1]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> [...a] = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>]; <span class="hljs-comment">// [3, 2, 1]</span>
<span class="hljs-keyword">let</span> b = [...[<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>]]; <span class="hljs-comment">// [3, 2, 1]</span></code></pre><p><strong>yield</strong>*<br>&#x5728;<code>Generator</code>&#x51FD;&#x6570;&#x4E2D;&#x6709;<code>yield*</code>&#x547D;&#x4EE4;&#xFF0C;&#x5982;&#x679C;&#x5176;&#x540E;&#x9762;&#x8DDF;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x904D;&#x5386;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x5B83;&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x7ED3;&#x6784;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let v of G()) {
  console.log(v); // &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3, 4, 5
}

function* G() {
  yield 1;
  yield* [2,3,4];
  yield 5;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> v <span class="hljs-keyword">of</span> G()) {
  <span class="hljs-built_in">console</span>.log(v); <span class="hljs-comment">// &#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;1, 2, 3, 4, 5</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">G</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">yield</span>* [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
  <span class="hljs-keyword">yield</span> <span class="hljs-number">5</span>;
}</code></pre><p><strong>&#x5176;&#x5B83;&#x573A;&#x5408;</strong><br>&#x6709;&#x4E9B;&#x63A5;&#x53D7;&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F1A;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x904D;&#x5386;&#x5668;&#x63A5;&#x53E3;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x7B49;&#x540C;&#x4E8E;&#x9ED8;&#x8BA4;&#x8C03;&#x7528;&#x3002;&#x6BD4;&#x5982;<code>Array.from()</code>, <code>Promise.all()</code>&#x3002;</p><h2 id="articleHeader8">&#x5EF6;&#x4F38;&#x9605;&#x8BFB;</h2><p>&#x5173;&#x4E8E;ES6&#x7684;<code>Symbol</code>&#xFF1A;<a href="https://segmentfault.com/a/1190000015244917#articleHeader3">&#x94FE;&#x63A5;</a>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Iterator：访问数据集合的统一接口

## 原文链接
[https://segmentfault.com/a/1190000015701263](https://segmentfault.com/a/1190000015701263)

