---
title: 使用Jest测试JavaScript(Mock篇)
hidden: true
categories: reprint
slug: 65b518a6
date: 2018-11-03 10:03:44
---

{{< raw >}}
<p>&#x5728;&#x672C;&#x7BC7;&#x6559;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4ECB;&#x7ECD; <code>Jest</code> &#x4E2D;&#x7684;&#x4E09;&#x4E2A;&#x4E0E; <code>Mock</code> &#x51FD;&#x6570;&#x76F8;&#x5173;&#x7684;API&#xFF0C;&#x5206;&#x522B;&#x662F;<code>jest.fn()</code>&#x3001;<code>jest.spyOn()</code>&#x3001;<code>jest.mock()</code>&#x3002;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x521B;&#x5EFA;Mock&#x51FD;&#x6570;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x66F4;&#x597D;&#x7684;&#x6D4B;&#x8BD5;&#x9879;&#x76EE;&#x4E2D;&#x4E00;&#x4E9B;&#x903B;&#x8F91;&#x8F83;&#x590D;&#x6742;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F8B;&#x5982;&#x6D4B;&#x8BD5;&#x51FD;&#x6570;&#x7684;&#x5D4C;&#x5957;&#x8C03;&#x7528;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x7B49;&#x3002;</p><blockquote>&#x5982;&#x679C;&#x4F60;&#x8FD8;&#x4E0D;&#x77E5;&#x9053;<code>Jest</code>&#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x8BF7;&#x5148;&#x9605;&#x8BFB;: <a href="https://www.jianshu.com/p/70a4f026a0f1" rel="nofollow noreferrer" target="_blank">&#x300A;&#x4F7F;&#x7528;Jest&#x6D4B;&#x8BD5;JavaScript (&#x5165;&#x95E8;&#x7BC7;)&#x300B;</a></blockquote><h3 id="articleHeader0"><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;Mock&#x51FD;&#x6570;&#xFF1F;</strong></h3><p>&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;&#x5185;&#x5E38;&#x5E38;&#x4F1A;&#x53BB;&#x8C03;&#x7528;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x5728;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x5185;&#x90E8;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x7684;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x548C;&#x7ED3;&#x679C;&#xFF0C;&#x53EA;&#x60F3;&#x77E5;&#x9053;&#x5B83;&#x662F;&#x5426;&#x88AB;&#x6B63;&#x786E;&#x8C03;&#x7528;&#x5373;&#x53EF;&#xFF0C;&#x751A;&#x81F3;&#x4F1A;&#x6307;&#x5B9A;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;Mock&#x51FD;&#x6570;&#x662F;&#x5341;&#x5206;&#x6709;&#x5FC5;&#x8981;&#x3002;</p><p>Mock&#x51FD;&#x6570;&#x63D0;&#x4F9B;&#x7684;&#x4EE5;&#x4E0B;&#x4E09;&#x79CD;&#x7279;&#x6027;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x5199;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x65F6;&#x5341;&#x5206;&#x6709;&#x7528;&#xFF1A;</p><ul><li>&#x6355;&#x83B7;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x60C5;&#x51B5;</li><li>&#x8BBE;&#x7F6E;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;</li><li>&#x6539;&#x53D8;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;</li></ul><blockquote>&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x4F7F;&#x7528;<a href="https://www.jianshu.com/p/70a4f026a0f1" rel="nofollow noreferrer" target="_blank">&#x4E0A;&#x7BC7;&#x6587;&#x7AE0;</a>&#x4E2D;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;&#x5728;<code>test/functions.test.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x7F16;&#x5199;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF0C;<code>src/</code>&#x76EE;&#x5F55;&#x4E0B;&#x5199;&#x88AB;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x3002;</blockquote><h3 id="articleHeader1"><strong>1. jest.fn()</strong></h3><p><code>jest.fn()</code>&#x662F;&#x521B;&#x5EFA;Mock&#x51FD;&#x6570;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;<code>jest.fn()</code>&#x4F1A;&#x8FD4;&#x56DE;<code>undefined</code>&#x4F5C;&#x4E3A;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// functions.test.js

test(&apos;&#x6D4B;&#x8BD5;jest.fn()&#x8C03;&#x7528;&apos;, () =&gt; {
  let mockFn = jest.fn();
  let result = mockFn(1, 2, 3);

  // &#x65AD;&#x8A00;mockFn&#x7684;&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;undefined
  expect(result).toBeUndefined();
  // &#x65AD;&#x8A00;mockFn&#x88AB;&#x8C03;&#x7528;
  expect(mockFn).toBeCalled();
  // &#x65AD;&#x8A00;mockFn&#x88AB;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x6B21;
  expect(mockFn).toBeCalledTimes(1);
  // &#x65AD;&#x8A00;mockFn&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4E3A;1, 2, 3
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// functions.test.js</span>

test(<span class="hljs-string">&apos;&#x6D4B;&#x8BD5;jest.fn()&#x8C03;&#x7528;&apos;</span>, () =&gt; {
  <span class="hljs-keyword">let</span> mockFn = jest.fn();
  <span class="hljs-keyword">let</span> result = mockFn(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);

  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x7684;&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;undefined</span>
  expect(result).toBeUndefined();
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x88AB;&#x8C03;&#x7528;</span>
  expect(mockFn).toBeCalled();
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x88AB;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x6B21;</span>
  expect(mockFn).toBeCalledTimes(<span class="hljs-number">1</span>);
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4E3A;1, 2, 3</span>
  expect(mockFn).toHaveBeenCalledWith(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
})</code></pre><p><code>jest.fn()</code>&#x6240;&#x521B;&#x5EFA;&#x7684;Mock&#x51FD;&#x6570;&#x8FD8;&#x53EF;&#x4EE5;<strong>&#x8BBE;&#x7F6E;&#x8FD4;&#x56DE;&#x503C;</strong>&#xFF0C;<strong>&#x5B9A;&#x4E49;&#x5185;&#x90E8;&#x5B9E;&#x73B0;</strong>&#x6216;<strong>&#x8FD4;&#x56DE;<code>Promise</code>&#x5BF9;&#x8C61;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// functions.test.js

test(&apos;&#x6D4B;&#x8BD5;jest.fn()&#x8FD4;&#x56DE;&#x56FA;&#x5B9A;&#x503C;&apos;, () =&gt; {
  let mockFn = jest.fn().mockReturnValue(&apos;default&apos;);
  // &#x65AD;&#x8A00;mockFn&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;default
  expect(mockFn()).toBe(&apos;default&apos;);
})

test(&apos;&#x6D4B;&#x8BD5;jest.fn()&#x5185;&#x90E8;&#x5B9E;&#x73B0;&apos;, () =&gt; {
  let mockFn = jest.fn((num1, num2) =&gt; {
    return num1 * num2;
  })
  // &#x65AD;&#x8A00;mockFn&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;100
  expect(mockFn(10, 10)).toBe(100);
})

test(&apos;&#x6D4B;&#x8BD5;jest.fn()&#x8FD4;&#x56DE;Promise&apos;, async () =&gt; {
  let mockFn = jest.fn().mockResolvedValue(&apos;default&apos;);
  let result = await mockFn();
  // &#x65AD;&#x8A00;mockFn&#x901A;&#x8FC7;await&#x5173;&#x952E;&#x5B57;&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;default
  expect(result).toBe(&apos;default&apos;);
  // &#x65AD;&#x8A00;mockFn&#x8C03;&#x7528;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x662F;Promise&#x5BF9;&#x8C61;
  expect(Object.prototype.toString.call(mockFn())).toBe(&quot;[object Promise]&quot;);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// functions.test.js</span>

test(<span class="hljs-string">&apos;&#x6D4B;&#x8BD5;jest.fn()&#x8FD4;&#x56DE;&#x56FA;&#x5B9A;&#x503C;&apos;</span>, () =&gt; {
  <span class="hljs-keyword">let</span> mockFn = jest.fn().mockReturnValue(<span class="hljs-string">&apos;default&apos;</span>);
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;default</span>
  expect(mockFn()).toBe(<span class="hljs-string">&apos;default&apos;</span>);
})

test(<span class="hljs-string">&apos;&#x6D4B;&#x8BD5;jest.fn()&#x5185;&#x90E8;&#x5B9E;&#x73B0;&apos;</span>, () =&gt; {
  <span class="hljs-keyword">let</span> mockFn = jest.fn(<span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> num1 * num2;
  })
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;100</span>
  expect(mockFn(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>)).toBe(<span class="hljs-number">100</span>);
})

test(<span class="hljs-string">&apos;&#x6D4B;&#x8BD5;jest.fn()&#x8FD4;&#x56DE;Promise&apos;</span>, <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">let</span> mockFn = jest.fn().mockResolvedValue(<span class="hljs-string">&apos;default&apos;</span>);
  <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> mockFn();
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x901A;&#x8FC7;await&#x5173;&#x952E;&#x5B57;&#x6267;&#x884C;&#x540E;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;default</span>
  expect(result).toBe(<span class="hljs-string">&apos;default&apos;</span>);
  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x8C03;&#x7528;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x662F;Promise&#x5BF9;&#x8C61;</span>
  expect(<span class="hljs-built_in">Object</span>.prototype.toString.call(mockFn())).toBe(<span class="hljs-string">&quot;[object Promise]&quot;</span>);
})</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x662F;<code>jest.fn()</code>&#x63D0;&#x4F9B;&#x7684;&#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;API&#x548C;&#x65AD;&#x8A00;&#x8BED;&#x53E5;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5728;<code>src/fetch.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x5199;&#x4E00;&#x4E9B;&#x88AB;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x66F4;&#x52A0;&#x63A5;&#x8FD1;&#x4E1A;&#x52A1;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x7406;&#x89E3;Mock&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x3002;</p><blockquote>&#x88AB;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x4E2D;&#x4F9D;&#x8D56;&#x4E86;<code>axios</code>&#x8FD9;&#x4E2A;&#x5E38;&#x7528;&#x7684;&#x8BF7;&#x6C42;&#x5E93;&#x548C;<code>JSONPlaceholder</code>&#x8FD9;&#x4E2A;&#x4E0A;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x63D0;&#x5230;&#x514D;&#x8D39;&#x7684;&#x8BF7;&#x6C42;&#x63A5;&#x53E3;&#xFF0C;&#x8BF7;&#x5148;&#x5728;<code>shell</code>&#x4E2D;&#x6267;&#x884C;<code>npm install axios --save</code>&#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#xFF0C;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// fetch.js

import axios from &apos;axios&apos;;

export default {
  async fetchPostsList(callback) {
    return axios.get(&apos;https://jsonplaceholder.typicode.com/posts&apos;).then(res =&gt; {
      return callback(res.data);
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// fetch.js</span>

<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">async</span> fetchPostsList(callback) {
    <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">&apos;https://jsonplaceholder.typicode.com/posts&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> callback(res.data);
    })
  }
}</code></pre><p>&#x6211;&#x4EEC;&#x5728;<code>fetch.js</code>&#x4E2D;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;<code>fetchPostsList</code>&#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x4E86;<code>JSONPlaceholder</code>&#x63D0;&#x4F9B;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x5E76;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x5904;&#x7406;&#x8FC7;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x6D4B;&#x8BD5;&#x8BE5;&#x63A5;&#x53E3;&#x80FD;&#x591F;&#x88AB;&#x6B63;&#x5E38;&#x8BF7;&#x6C42;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x6355;&#x83B7;&#x5230;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x80FD;&#x591F;&#x88AB;&#x6B63;&#x5E38;&#x7684;&#x8C03;&#x7528;&#x5373;&#x53EF;&#x3002;&#x4E0B;&#x9762;&#x662F;<code>functions.test.js</code>&#x4E2D;&#x7684;&#x6D4B;&#x8BD5;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fetch from &apos;../src/fetch.js&apos;

test(&apos;fetchPostsList&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x80FD;&#x591F;&#x88AB;&#x8C03;&#x7528;&apos;, async () =&gt; {
  expect.assertions(1);
  let mockFn = jest.fn();
  await fetch.fetchPostsList(mockFn);

  // &#x65AD;&#x8A00;mockFn&#x88AB;&#x8C03;&#x7528;
  expect(mockFn).toBeCalled();
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../src/fetch.js&apos;</span>

test(<span class="hljs-string">&apos;fetchPostsList&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x80FD;&#x591F;&#x88AB;&#x8C03;&#x7528;&apos;</span>, <span class="hljs-keyword">async</span> () =&gt; {
  expect.assertions(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">let</span> mockFn = jest.fn();
  <span class="hljs-keyword">await</span> fetch.fetchPostsList(mockFn);

  <span class="hljs-comment">// &#x65AD;&#x8A00;mockFn&#x88AB;&#x8C03;&#x7528;</span>
  expect(mockFn).toBeCalled();
})</code></pre><h3 id="articleHeader2"><strong>2. jest.mock()</strong></h3><p><code>fetch.js</code>&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x5C01;&#x88C5;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x6211;&#x4EEC;&#x5728;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x5B9E;&#x9645;&#x7684;&#x8BF7;&#x6C42;&#xFF08;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x5DF2;&#x7ECF;&#x901A;&#x8FC7;&#x5355;&#x4FA7;&#x6216;&#x9700;&#x8981;&#x8BE5;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x975E;&#x771F;&#x5B9E;&#x6570;&#x636E;&#xFF09;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;<code>jest.mock(&#xFF09;</code>&#x53BB;mock&#x6574;&#x4E2A;&#x6A21;&#x5757;&#x662F;&#x5341;&#x5206;&#x6709;&#x5FC5;&#x8981;&#x7684;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5728;<code>src/fetch.js</code>&#x7684;&#x540C;&#x7EA7;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>src/events.js</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// events.js

import fetch from &apos;./fetch&apos;;

export default {
  async getPostList() {
    return fetch.fetchPostsList(data =&gt; {
      console.log(&apos;fetchPostsList be called!&apos;);
      // do something
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// events.js</span>

<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./fetch&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">async</span> getPostList() {
    <span class="hljs-keyword">return</span> fetch.fetchPostsList(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fetchPostsList be called!&apos;</span>);
      <span class="hljs-comment">// do something</span>
    });
  }
}</code></pre><p><code>functions.test.js</code>&#x4E2D;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// functions.test.js

import events from &apos;../src/events&apos;;
import fetch from &apos;../src/fetch&apos;;

jest.mock(&apos;../src/fetch.js&apos;);

test(&apos;mock &#x6574;&#x4E2A; fetch.js&#x6A21;&#x5757;&apos;, async () =&gt; {
  expect.assertions(2);
  await events.getPostList();
  expect(fetch.fetchPostsList).toHaveBeenCalled();
  expect(fetch.fetchPostsList).toHaveBeenCalledTimes(1);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// functions.test.js</span>

<span class="hljs-keyword">import</span> events <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../src/events&apos;</span>;
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../src/fetch&apos;</span>;

jest.mock(<span class="hljs-string">&apos;../src/fetch.js&apos;</span>);

test(<span class="hljs-string">&apos;mock &#x6574;&#x4E2A; fetch.js&#x6A21;&#x5757;&apos;</span>, <span class="hljs-keyword">async</span> () =&gt; {
  expect.assertions(<span class="hljs-number">2</span>);
  <span class="hljs-keyword">await</span> events.getPostList();
  expect(fetch.fetchPostsList).toHaveBeenCalled();
  expect(fetch.fetchPostsList).toHaveBeenCalledTimes(<span class="hljs-number">1</span>);
});</code></pre><p>&#x5728;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;<code>jest.mock(&apos;../src/fetch.js&apos;)</code>&#x53BB;mock&#x6574;&#x4E2A;<code>fetch.js</code>&#x6A21;&#x5757;&#x3002;&#x5982;&#x679C;&#x6CE8;&#x91CA;&#x6389;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x6267;&#x884C;&#x6D4B;&#x8BD5;&#x811A;&#x672C;&#x65F6;&#x4F1A;&#x51FA;&#x73B0;&#x4EE5;&#x4E0B;&#x62A5;&#x9519;&#x4FE1;&#x606F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016717359" src="https://static.alili.tech/img/remote/1460000016717359" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x8FD9;&#x4E2A;&#x62A5;&#x9519;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x603B;&#x7ED3;&#x51FA;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x7ED3;&#x8BBA;&#xFF1A;</p><blockquote>&#x5728;jest&#x4E2D;&#x5982;&#x679C;&#x60F3;&#x6355;&#x83B7;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x60C5;&#x51B5;&#xFF0C;&#x5219;&#x8BE5;&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x88AB;mock&#x6216;&#x8005;spy&#xFF01;</blockquote><h3 id="articleHeader3"><strong>3. jest.spyOn()</strong></h3><p><code>jest.spyOn()</code>&#x65B9;&#x6CD5;&#x540C;&#x6837;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;mock&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x8BE5;mock&#x51FD;&#x6570;&#x4E0D;&#x4EC5;&#x80FD;&#x591F;&#x6355;&#x83B7;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x60C5;&#x51B5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x7684;&#x6267;&#x884C;&#x88AB;spy&#x7684;&#x51FD;&#x6570;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;<code>jest.spyOn()</code>&#x662F;<code>jest.fn()</code>&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x5B83;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x548C;&#x88AB;spy&#x7684;&#x51FD;&#x6570;&#x5177;&#x6709;&#x76F8;&#x540C;&#x5185;&#x90E8;&#x4EE3;&#x7801;&#x7684;mock&#x51FD;&#x6570;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016717360" src="https://static.alili.tech/img/remote/1460000016717360" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x56FE;&#x662F;&#x4E4B;&#x524D;<code>jest.mock()</code>&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x6B63;&#x786E;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x7684;&#x622A;&#x56FE;&#xFF0C;&#x4ECE;shell&#x811A;&#x672C;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>console.log(&apos;fetchPostsList be called!&apos;);</code>&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5E76;&#x6CA1;&#x6709;&#x5728;shell&#x4E2D;&#x88AB;&#x6253;&#x5370;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x901A;&#x8FC7;<code>jest.mock()</code>&#x540E;&#xFF0C;&#x6A21;&#x5757;&#x5185;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;jest&#x6240;&#x5B9E;&#x9645;&#x6267;&#x884C;&#x7684;&#x3002;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>jest.spyOn()</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// functions.test.js

import events from &apos;../src/events&apos;;
import fetch from &apos;../src/fetch&apos;;

test(&apos;&#x4F7F;&#x7528;jest.spyOn()&#x76D1;&#x63A7;fetch.fetchPostsList&#x88AB;&#x6B63;&#x5E38;&#x8C03;&#x7528;&apos;, async() =&gt; {
  expect.assertions(2);
  const spyFn = jest.spyOn(fetch, &apos;fetchPostsList&apos;);
  await events.getPostList();
  expect(spyFn).toHaveBeenCalled();
  expect(spyFn).toHaveBeenCalledTimes(1);
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// functions.test.js</span>

<span class="hljs-keyword">import</span> events <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../src/events&apos;</span>;
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../src/fetch&apos;</span>;

test(<span class="hljs-string">&apos;&#x4F7F;&#x7528;jest.spyOn()&#x76D1;&#x63A7;fetch.fetchPostsList&#x88AB;&#x6B63;&#x5E38;&#x8C03;&#x7528;&apos;</span>, <span class="hljs-keyword">async</span>() =&gt; {
  expect.assertions(<span class="hljs-number">2</span>);
  <span class="hljs-keyword">const</span> spyFn = jest.spyOn(fetch, <span class="hljs-string">&apos;fetchPostsList&apos;</span>);
  <span class="hljs-keyword">await</span> events.getPostList();
  expect(spyFn).toHaveBeenCalled();
  expect(spyFn).toHaveBeenCalledTimes(<span class="hljs-number">1</span>);
})
</code></pre><p>&#x6267;&#x884C;<code>npm run test</code>&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;shell&#x4E2D;&#x7684;&#x6253;&#x5370;&#x4FE1;&#x606F;&#xFF0C;&#x8BF4;&#x660E;&#x901A;&#x8FC7;<code>jest.spyOn()</code>&#xFF0C;<code>fetchPostsList</code>&#x88AB;&#x6B63;&#x5E38;&#x7684;&#x6267;&#x884C;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016717361" src="https://static.alili.tech/img/remote/1460000016717361" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader4">4. <strong>&#x603B;&#x7ED3;</strong></h3><p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;<code>jest.fn()</code>,<code>jest.mock()</code>&#x548C;<code>jest.spyOn()</code>&#x6765;&#x521B;&#x5EFA;mock&#x51FD;&#x6570;&#xFF0C;&#x901A;&#x8FC7;mock&#x51FD;&#x6570;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#x7279;&#x6027;&#x53BB;&#x66F4;&#x597D;&#x7684;&#x7F16;&#x5199;&#x6211;&#x4EEC;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF1A;</p><ul><li>&#x6355;&#x83B7;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x60C5;&#x51B5;</li><li>&#x8BBE;&#x7F6E;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;</li><li>&#x6539;&#x53D8;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;</li></ul><p>&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4E2D;&#xFF0C;<code>jest.fn()</code>&#x5E38;&#x88AB;&#x7528;&#x6765;&#x8FDB;&#x884C;&#x67D0;&#x4E9B;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x6D4B;&#x8BD5;&#xFF1B;<code>jest.mock()</code>&#x53EF;&#x4EE5;mock&#x6574;&#x4E2A;&#x6A21;&#x5757;&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;&#x67D0;&#x4E2A;&#x6A21;&#x5757;&#x5DF2;&#x7ECF;&#x88AB;&#x5355;&#x5143;&#x6D4B;&#x8BD5;100%&#x8986;&#x76D6;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;<code>jest.mock()</code>&#x53BB;mock&#x8BE5;&#x6A21;&#x5757;&#xFF0C;&#x8282;&#x7EA6;&#x6D4B;&#x8BD5;&#x65F6;&#x95F4;&#x548C;&#x6D4B;&#x8BD5;&#x7684;&#x5197;&#x4F59;&#x5EA6;&#x662F;&#x5341;&#x5206;&#x5FC5;&#x8981;&#xFF1B;&#x5F53;&#x9700;&#x8981;&#x6D4B;&#x8BD5;&#x67D0;&#x4E9B;&#x5FC5;&#x987B;&#x88AB;&#x5B8C;&#x6574;&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5E38;&#x5E38;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>jest.spyOn()</code>&#x3002;&#x8FD9;&#x4E9B;&#x90FD;&#x9700;&#x8981;&#x5F00;&#x53D1;&#x8005;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7075;&#x6D3B;&#x9009;&#x62E9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Jest测试JavaScript(Mock篇)

## 原文链接
[https://segmentfault.com/a/1190000016717356](https://segmentfault.com/a/1190000016717356)

