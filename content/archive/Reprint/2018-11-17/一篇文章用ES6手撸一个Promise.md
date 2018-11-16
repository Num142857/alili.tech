---
title: '一篇文章用ES6手撸一个Promise' 
date: 2018-11-17 2:30:13
hidden: true
slug: js2j3zq5bwl
categories: reprint
---

{{< raw >}}
<blockquote>&#x8BF4;&#x5230;Promise&#xFF0C;&#x90FD;&#x77E5;&#x9053;&#x5B83;&#x662F;&#x6BD4;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x66F4;&#x4F18;&#x7684;&#x4E00;&#x79CD;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x903B;&#x8F91;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#xFF0C;&#x662F;&#x89E3;&#x51B3;&#x5730;&#x72F1;&#x56DE;&#x8C03;&#x7684;&#x4E00;&#x79CD;&#x5C1D;&#x8BD5;&#x3002;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x5C06;&#x4F1A;&#x5C1D;&#x8BD5;&#x7528;&#x7B80;&#x5355;&#x6613;&#x61C2;&#x7684;&#x8BED;&#x8A00;&#x63CF;&#x8FF0;Promise&#x7684;&#x539F;&#x7406;&#xFF0C;&#x5E76;&#x4E14;&#x7528;es6&#x624B;&#x64B8;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Promise&#x3002;</blockquote><h2 id="articleHeader0">1. Promise&#x7684;&#x539F;&#x7406;</h2><blockquote>&#x539F;&#x7406;&#xFF1A;promise&#x5BF9;&#x8C61;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF0C;pending&#x3001;fulfilled&#x548C;rejected&#x3002;promise&#x5BF9;&#x8C61;&#x5185;&#x90E8;&#x4FDD;&#x5B58;&#x4E00;&#x4E2A;&#x9700;&#x8981;&#x6267;&#x884C;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;<strong>&#x5F53;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6267;&#x884C;&#x7ED3;&#x675F;&#x540E;&#x53EF;&#x4EE5;&#x8C03;&#x7528;resolve&#x6216;reject&#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x6539;&#x53D8;promise&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;</strong>&#xFF0C;&#x72B6;&#x6001;&#x4E00;&#x65E6;&#x6539;&#x53D8;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x53D8;&#x3002;new&#x4E00;&#x4E2A;promise&#x540E;<strong>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;then&#x65B9;&#x6CD5;&#xFF0C;&#x6307;&#x5B9A;resolved&#x548C;rejected&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</strong>&#x3002;&#x4E0B;&#x9762;&#x662F;&#x6211;&#x4EEC;&#x65E5;&#x5E38;&#x4F7F;&#x7528;Promise&#x7684;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getAsyncData = new Promise((resolve, reject) =&gt; {
    // &#x6267;&#x884C;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;
    if (// &#x5982;&#x679C;&#x6210;&#x529F;) {
        // ...&#x6267;&#x884C;&#x4EE3;&#x7801;
        resolve();
    } else { // &#x5982;&#x679C;&#x5931;&#x8D25;
        // ...&#x6267;&#x884C;&#x4EE3;&#x7801;
        reject();
    }
})

);
getAsyncData.then(success, fail).then(success, fail)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code><span class="hljs-keyword">let</span> getAsyncData = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Promise</span>((resolve, reject) =&gt;</span> {
    <span class="hljs-comment">// &#x6267;&#x884C;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-comment">// &#x5982;&#x679C;&#x6210;&#x529F;) {</span>
        <span class="hljs-comment">// ...&#x6267;&#x884C;&#x4EE3;&#x7801;</span>
        resolve();
    } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// &#x5982;&#x679C;&#x5931;&#x8D25;</span>
        <span class="hljs-comment">// ...&#x6267;&#x884C;&#x4EE3;&#x7801;</span>
        reject();
    }
})

);
getAsyncData.<span class="hljs-keyword">then</span>(success, fail).<span class="hljs-keyword">then</span>(success, fail)</code></pre><p>&#x7ED3;&#x5408;Promise A+&#x89C4;&#x8303;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#xFF1A;</p><ul><li>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x673A;&#xFF0C;&#x6709;&#x4E09;&#x4E2A;&#x72B6;&#x6001;&#xFF0C;pending&#x3001;fulfilled&#x3001;rejected&#xFF0C;&#x72B6;&#x6001;&#x4E4B;&#x95F4;&#x7684;&#x8F6C;&#x5316;&#x53EA;&#x80FD;&#x662F;pending-&gt;fulfilled&#x3001;pending-&gt;rejected&#xFF0C;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x4E0D;&#x53EF;&#x9006;&#x3002;</li><li>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;then&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;</li><li>then&#x65B9;&#x6CD5;&#x8981;&#x80FD;&#x88AB;&#x8C03;&#x7528;&#x591A;&#x6B21;&#xFF0C;&#x6240;&#x4EE5;then&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x6BCF;&#x6B21;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;promise&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x6837;&#x624D;&#x80FD;&#x652F;&#x6301;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x3002;</li><li>&#x6784;&#x9020;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x8981;&#x6709;&#x4E00;&#x4E2A;value&#x503C;&#xFF0C;&#x7528;&#x6765;&#x4FDD;&#x5B58;&#x4E0A;&#x6B21;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x62A5;&#x9519;&#xFF0C;&#x5219;&#x4FDD;&#x5B58;&#x7684;&#x662F;&#x5F02;&#x5E38;&#x4FE1;&#x606F;&#x3002;</li></ul><p>&#x90A3;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x5C31;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x539F;&#x7406;&#x548C;&#x89C4;&#x8303;&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;Promise&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p><h2 id="articleHeader1">2. &#x5B9E;&#x73B0;</h2><h3 id="articleHeader2">2.1 &#x5B9E;&#x73B0;&#x72B6;&#x6001;&#x673A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// promise.js
class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = &apos;&apos;;
    executor(this.resolve, this.reject);
  }

  resolve (value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED; 
    }
  }

  reject (value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = REJECTED;
    }
  }

  then (onfulfilled, onrejected) {
    if (this.status === FULFILLED) {
      onfulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onrejected(this.value);
    }
  }
}

const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

const test = new Promise((resolve, reject) =&gt; {
  resolve(100);
});
test.then((data) =&gt; {
  console.log(data);
},(data) =&gt; {});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// promise.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Promise</span> </span>{
  <span class="hljs-keyword">constructor</span> (executor) {
    <span class="hljs-keyword">this</span>.status = PENDING;
    <span class="hljs-keyword">this</span>.value = <span class="hljs-string">&apos;&apos;</span>;
    executor(<span class="hljs-keyword">this</span>.resolve, <span class="hljs-keyword">this</span>.reject);
  }

  resolve (value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.value = value;
      <span class="hljs-keyword">this</span>.status = FULFILLED; 
    }
  }

  reject (value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.value = value;
      <span class="hljs-keyword">this</span>.status = REJECTED;
    }
  }

  then (onfulfilled, onrejected) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === FULFILLED) {
      onfulfilled(<span class="hljs-keyword">this</span>.value);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === REJECTED) {
      onrejected(<span class="hljs-keyword">this</span>.value);
    }
  }
}

const PENDING = <span class="hljs-string">&apos;pending&apos;</span>;
const FULFILLED = <span class="hljs-string">&apos;fulfilled&apos;</span>;
const REJECTED = <span class="hljs-string">&apos;rejected&apos;</span>;

const test = new Promise((resolve, reject) =&gt; {
  resolve(<span class="hljs-number">100</span>);
});
test.then((<span class="hljs-keyword">data</span>) =&gt; {
  console.log(<span class="hljs-keyword">data</span>);
},(<span class="hljs-keyword">data</span>) =&gt; {});
</code></pre><p>&#x56E0;&#x4E3A;Promise&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x7528;ES6&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x9996;&#x5148;&#x60F3;&#x5230;&#x7684;&#x5C31;&#x662F;&#x6709;&#x663E;&#x5F0F;constructor&#x58F0;&#x660E;&#x7684;class&#x3002;&#x4E0A;&#x9762;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7528;class&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x673A;&#xFF0C;&#x6709;status, value&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x548C;resolve, reject, then&#x4E09;&#x4E2A;&#x51FD;&#x6570;&#xFF1B;&#x540C;&#x65F6;&#x5B83;&#x6709;pending, fulfilled&#x548C;rejected&#x4E09;&#x4E2A;&#x72B6;&#x6001;&#xFF0C;&#x5176;&#x4E2D;pending&#x5C31;&#x53EF;&#x4EE5;&#x5207;&#x6362;&#x4E3A;fulfilled&#x6216;&#x8005;rejected&#x4E24;&#x79CD;&#x3002;</p><p>&#x770B;&#x6765;&#x8D77;&#x8FD8;&#x884C;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x5C1D;&#x8BD5;&#x7740;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF0C;&#x62A5;&#x9519;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReferenceError: resolve is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code style="word-break:break-word;white-space:initial">ReferenceError: resolve <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined</code></pre><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5728;class&#x4E2D;&#x4F7F;&#x7528;this&#x8981;&#x683C;&#x5916;&#x5C0F;&#x5FC3;&#xFF0C;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x5982;&#x679C;&#x542B;&#x6709;this&#xFF0C;&#x5B83;&#x9ED8;&#x8BA4;&#x6307;&#x5411;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF08;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#x7684;resolve(100)&#xFF09;&#xFF0C;this&#x5C31;&#x4F1A;&#x6307;&#x5411;&#x8BE5;&#x65B9;&#x6CD5;&#x8FD0;&#x884C;&#x65F6;&#x6240;&#x5728;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x4ECE;&#x800C;&#x56E0;&#x4E3A;&#x627E;&#x4E0D;&#x5230;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x800C;&#x62A5;&#x9519;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x8981;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7ED1;&#x5B9A;this&#x3002;constructor&#x6539;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  constructor (executor) {
    this.status = PENDING;
    this.value = &apos;&apos;;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    executor(this.resolve, this.reject);
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>  <span class="hljs-keyword">constructor</span> (executor) {
    <span class="hljs-keyword">this</span>.status = PENDING;
    <span class="hljs-keyword">this</span>.value = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.resolve = <span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.reject = <span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.then = <span class="hljs-keyword">this</span>.then.bind(<span class="hljs-keyword">this</span>);
    executor(<span class="hljs-keyword">this</span>.resolve, <span class="hljs-keyword">this</span>.reject);
  }</code></pre><p>&#x518D;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF0C;&#x8F93;&#x51FA;&#x4E86;<code>100</code>&#xFF0C;&#x4F46;&#x662F;&#x73B0;&#x5728;&#x5176;&#x5B9E;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x65B9;&#x6848;&#xFF0C;&#x4EE3;&#x7801;&#x5148;&#x8FD0;&#x884C;&#x4E86;resolve(100)&#x7136;&#x540E;&#x53C8;&#x8FD0;&#x884C;&#x4E86;then&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x5B9E;&#x5BF9;&#x4E8E;&#x5F02;&#x6B65;&#x7684;&#x60C5;&#x51B5;&#x6CA1;&#x6709;&#x5904;&#x7406;&#xFF0C;&#x4E0D;&#x4FE1;&#x7684;&#x8BDD;&#x5C31;&#x7ED9;resolve&#x52A0;&#x4E00;&#x4E2A;setTimeout&#xFF0C;&#x597D;&#x4E86;&#xFF0C;&#x4EE3;&#x7801;&#x53C8;&#x6CA1;&#x6709;&#x8F93;&#x51FA;&#x4E86;&#x3002;</p><h3 id="articleHeader3">2.2 &#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x8BBE;&#x7F6E;&#x72B6;&#x6001;</h3><p>&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x662F;&#x4F1A;&#x5148;&#x8BBE;&#x7F6E;&#x597D;&#x4E0D;&#x540C;&#x5F02;&#x6B65;&#x8FD4;&#x56DE;&#x540E;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF08;&#x5373;then&#x7684;&#x6210;&#x529F;&#x3001;&#x5931;&#x8D25;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5B89;&#x5FC3;&#x7B49;&#x5F85;&#x5F02;&#x6B65;&#x6267;&#x884C;&#xFF0C;&#x6700;&#x540E;&#x518D;&#x5F02;&#x6B65;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x7CFB;&#x7EDF;&#x4F1A;&#x81EA;&#x52A8;&#x6839;&#x636E;&#x6211;&#x4EEC;&#x7684;&#x903B;&#x8F91;&#x9009;&#x62E9;&#x8C03;&#x7528;&#x4E0D;&#x540C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;<strong>then&#x51FD;&#x6570;&#x8981;&#x5BF9;status&#x4E3A;pending&#x7684;&#x72B6;&#x6001;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;&#x5904;&#x7406;&#x7684;&#x539F;&#x7406;&#x662F;&#x8BBE;&#x7F6E;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5728;pending&#x72B6;&#x6001;&#x4E0B;&#x5206;&#x522B;&#x4FDD;&#x5B58;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x540E;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x72B6;&#x6001;&#x53BB;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x4E2D;&#x4FDD;&#x5B58;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</strong>&#x3002;</p><p>&#x6211;&#x4EEC;&#x5C06;&#x4EE3;&#x7801;&#x6539;&#x53D8;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = &apos;&apos;;
    this.onfulfilledArr = [];
    this.onrejectedArr = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    executor(this.resolve, this.reject);
  }

  resolve (value) {
    if (this.status === PENDING) {
      this.value = value;
      this.onfulfilledArr.forEach(item =&gt; {
        item(this.value);
      })
      this.status = FULFILLED; 
    }
  }

  reject (value) {
    if (this.status === PENDING) {
      this.value = value;
      this.onrejectedArr.forEach(item =&gt; {
        item(this.value);
      })
      this.status = REJECTED;
    }
  }

  then (onfulfilled, onrejected) {
    if (this.status === FULFILLED) {
      onfulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onrejected(this.value);
    }
    if (this.status === PENDING) {
      this.onfulfilledArr.push(onfulfilled);
      this.onrejectedArr.push(onrejected);
    }
  }
}

const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

const test = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(100);
  }, 2000)
});
test.then((data) =&gt; {
  console.log(data);
},(data) =&gt; {});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Promise</span> </span>{
  <span class="hljs-keyword">constructor</span> (executor) {
    <span class="hljs-keyword">this</span>.status = PENDING;
    <span class="hljs-keyword">this</span>.value = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.onfulfilledArr = [];
    <span class="hljs-keyword">this</span>.onrejectedArr = [];
    <span class="hljs-keyword">this</span>.resolve = <span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.reject = <span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.then = <span class="hljs-keyword">this</span>.then.bind(<span class="hljs-keyword">this</span>);
    executor(<span class="hljs-keyword">this</span>.resolve, <span class="hljs-keyword">this</span>.reject);
  }

  resolve (value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.value = value;
      <span class="hljs-keyword">this</span>.onfulfilledArr.forEach(item =&gt; {
        item(<span class="hljs-keyword">this</span>.value);
      })
      <span class="hljs-keyword">this</span>.status = FULFILLED; 
    }
  }

  reject (value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.value = value;
      <span class="hljs-keyword">this</span>.onrejectedArr.forEach(item =&gt; {
        item(<span class="hljs-keyword">this</span>.value);
      })
      <span class="hljs-keyword">this</span>.status = REJECTED;
    }
  }

  then (onfulfilled, onrejected) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === FULFILLED) {
      onfulfilled(<span class="hljs-keyword">this</span>.value);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === REJECTED) {
      onrejected(<span class="hljs-keyword">this</span>.value);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.onfulfilledArr.push(onfulfilled);
      <span class="hljs-keyword">this</span>.onrejectedArr.push(onrejected);
    }
  }
}

const PENDING = <span class="hljs-string">&apos;pending&apos;</span>;
const FULFILLED = <span class="hljs-string">&apos;fulfilled&apos;</span>;
const REJECTED = <span class="hljs-string">&apos;rejected&apos;</span>;

const test = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(<span class="hljs-number">100</span>);
  }, <span class="hljs-number">2000</span>)
});
test.then((<span class="hljs-keyword">data</span>) =&gt; {
  console.log(<span class="hljs-keyword">data</span>);
},(<span class="hljs-keyword">data</span>) =&gt; {});</code></pre><p>&#x518D;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF0C;ok&#x6B63;&#x5E38;&#x8F93;&#x51FA;&#x4E86;&#x3002;&#x4F46;&#x662F;Promise&#x7684;&#x4E00;&#x5927;&#x7279;&#x70B9;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5373;test.then(success, fail).then(success, fail)...&#x8FD9;&#x5C31;&#x9700;&#x8981;then&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Promise&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x7684;&#x7A0B;&#x5E8F;&#x73B0;&#x5728;&#x660E;&#x663E;&#x7684;&#x662F;&#x4E0D;&#x652F;&#x6301;&#x7684;&#x3002;&#x90A3;&#x4E48;&#x7EE7;&#x7EED;&#x6539;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader4">2.3 &#x5B9E;&#x73B0;&#x94FE;&#x5F0F;&#x8C03;&#x7528;</h3><p>&#x518D;&#x89C2;&#x5BDF;&#x4E00;&#x4E0B;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x8FD9;&#x4E2A;&#x503C;&#x8981;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x7ED9;&#x4E0B;&#x4E2A;then&#x51FD;&#x6570;&#x7684;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x56DE;&#x8C03;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x5728;&#x8FD4;&#x56DE;&#x7684;new Promise&#x4E2D;&#x8C03;&#x7528;&#x76F8;&#x5E94;&#x7684;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = &apos;&apos;;
    this.onfulfilledArr = [];
    this.onrejectedArr = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    executor(this.resolve, this.reject);
  }

  resolve (value) {
    if (this.status === PENDING) {
      this.value = value;
      this.onfulfilledArr.forEach(item =&gt; {
        item(this.value);
      })
      this.status = FULFILLED; 
    }
  }

  reject (value) {
    if (this.status === PENDING) {
      this.value = value;
      this.onrejectedArr.forEach(item =&gt; {
        item(this.value);
      })
      this.status = REJECTED;
    }
  }

  then (onfulfilled, onrejected) {
    if (this.status === FULFILLED) {
      const res = onfulfilled(this.value);
      return new Promise(function(resolve, reject) {
        resolve(res);
      })
    }
    if (this.status === REJECTED) {
      const res = onrejected(this.value);
      return new Promise(function(resolve, reject) {
        reject(res);
      })
    }
    if (this.status === PENDING) {
      const self = this;
      return new Promise(function(resolve, reject) {
        self.onfulfilledArr.push(() =&gt; {
          const res = onfulfilled(self.value)
          resolve(res);
        });
        self.onrejectedArr.push(() =&gt; {
          const res = onrejected(self.value)
          reject(res);
        });
      })
    }
  }
}

const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

const test = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(100);
  }, 2000)
});
test.then((data) =&gt; {
  console.log(data);
  return data + 5;
},(data) =&gt; {})
.then((data) =&gt; {
  console.log(data)
},(data) =&gt; {});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">class</span> <span class="hljs-built_in">Promise</span> {
  <span class="hljs-keyword">constructor</span> (<span class="hljs-params">executor</span>) {
    <span class="hljs-keyword">this</span>.status = PENDING;
    <span class="hljs-keyword">this</span>.value = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.onfulfilledArr = [];
    <span class="hljs-keyword">this</span>.onrejectedArr = [];
    <span class="hljs-keyword">this</span>.resolve = <span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.reject = <span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.then = <span class="hljs-keyword">this</span>.then.bind(<span class="hljs-keyword">this</span>);
    executor(<span class="hljs-keyword">this</span>.resolve, <span class="hljs-keyword">this</span>.reject);
  }

  resolve (value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.value = value;
      <span class="hljs-keyword">this</span>.onfulfilledArr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        item(<span class="hljs-keyword">this</span>.value);
      })
      <span class="hljs-keyword">this</span>.status = FULFILLED; 
    }
  }

  reject (value) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">this</span>.value = value;
      <span class="hljs-keyword">this</span>.onrejectedArr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        item(<span class="hljs-keyword">this</span>.value);
      })
      <span class="hljs-keyword">this</span>.status = REJECTED;
    }
  }

  then (onfulfilled, onrejected) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === FULFILLED) {
      <span class="hljs-keyword">const</span> res = onfulfilled(<span class="hljs-keyword">this</span>.value);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        resolve(res);
      })
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === REJECTED) {
      <span class="hljs-keyword">const</span> res = onrejected(<span class="hljs-keyword">this</span>.value);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        reject(res);
      })
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === PENDING) {
      <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        self.onfulfilledArr.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">const</span> res = onfulfilled(self.value)
          resolve(res);
        });
        self.onrejectedArr.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">const</span> res = onrejected(self.value)
          reject(res);
        });
      })
    }
  }
}

<span class="hljs-keyword">const</span> PENDING = <span class="hljs-string">&apos;pending&apos;</span>;
<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-string">&apos;fulfilled&apos;</span>;
<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-string">&apos;rejected&apos;</span>;

<span class="hljs-keyword">const</span> test = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-number">100</span>);
  }, <span class="hljs-number">2000</span>)
});
test.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data);
  <span class="hljs-keyword">return</span> data + <span class="hljs-number">5</span>;
},<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {})
.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(data)
},<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {});
</code></pre><p>&#x518D;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF0C;&#x8F93;&#x51FA;100&#xFF0C;105&#x3002;&#x597D;&#x4E86;&#xFF0C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Promise&#x5C31;&#x5B9E;&#x73B0;&#x597D;&#x4E86;&#x3002;</p><h2 id="articleHeader5">3. &#x603B;&#x7ED3;</h2><p>Promise&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5BF9;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x4E00;&#x79CD;&#x5C01;&#x88C5;&#x65B9;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x56DE;&#x8C03;&#x7684;&#x6D41;&#x7A0B;&#x53D8;&#x5F97;&#x6E05;&#x6670;&#x4E00;&#x4E9B;&#xFF0C;&#x4F46;&#x662F;&#x672C;&#x8D28;&#x4E0A;&#x5E76;&#x4E0D;&#x89E3;&#x51B3;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x3002;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x6709;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5D4C;&#x5957;&#xFF0C;then&#x4E5F;&#x8981;&#x4E00;&#x76F4;&#x5199;&#x4E0B;&#x53BB;&#x3002;&#x6240;&#x4EE5;&#x540E;&#x6765;ES6&#x53C8;&#x6709;&#x4E86;Generator&#xFF0C;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x7528;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5199;&#x5F02;&#x6B65;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x53CA;&#x5B83;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;async/await&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x5C31;&#x662F;&#x540E;&#x8BDD;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇文章用ES6手撸一个Promise

## 原文链接
[https://segmentfault.com/a/1190000015969127](https://segmentfault.com/a/1190000015969127)

