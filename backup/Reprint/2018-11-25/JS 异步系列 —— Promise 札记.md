---
title: 'JS 异步系列 —— Promise 札记' 
date: 2018-11-25 2:30:07
hidden: true
slug: qqwiszt8w6i
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015444020" src="https://static.alili.tech/img/remote/1460000015444020" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader0">Promise &#x672D;&#x8BB0;</h3><p>&#x7814;&#x7A76; Promise &#x7684;&#x52A8;&#x673A;&#x5927;&#x4F53;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p><ul><li>&#x5BF9;&#x5176; api &#x7684;&#x4E0D;&#x719F;&#x6089;&#x4EE5;&#x53CA;&#x5BF9;&#x5B9E;&#x73B0;&#x673A;&#x5236;&#x7684;&#x597D;&#x5947;;</li><li>&#x5F88;&#x591A;&#x5E93;(&#x6BD4;&#x5982; fetch)&#x662F;&#x57FA;&#x4E8E; Promise &#x5C01;&#x88C5;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x8981;&#x4E86;&#x89E3;&#x8FD9;&#x4E9B;&#x5E93;&#x7684;&#x524D;&#x7F6E;&#x6761;&#x4EF6;&#x5F97;&#x5148;&#x719F;&#x6089; Promise;</li><li>&#x8981;&#x4E86;&#x89E3;&#x5176;&#x5B83;&#x66F4;&#x4E3A;&#x9AD8;&#x7EA7;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5F97;&#x5148;&#x719F;&#x6089; Promise;</li></ul><p>&#x57FA;&#x4E8E;&#x8FD9;&#x4E9B;&#x76EE;&#x7684;&#xFF0C;&#x5B9E;&#x8DF5;&#x4E86;&#x4E00;&#x4E2A;&#x7B26;&#x5408; Promise/A+ &#x89C4;&#x8303;&#x7684; <a href="https://github.com/MuYunyun/repromise" rel="nofollow noreferrer" target="_blank">repromise</a></p><p>&#x672C;&#x672D;&#x8BB0;&#x7CFB;&#x5217;&#x603B;&#x5171;&#x4E09;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x4F5C;&#x4E3A;&#x4E4B;&#x524D;&#x7684;&#x6587;&#x7AE0; <a href="https://github.com/MuYunyun/blog/issues/7" rel="nofollow noreferrer" target="_blank">Node.js &#x5F02;&#x6B65;&#x5F02;&#x95FB;&#x5F55;</a> &#x7684;&#x62C6;&#x5206;&#x548C;&#x77EB;&#x6B63;&#x3002;</p><ul><li><a href="https://github.com/MuYunyun/blog/blob/master/BasicSkill/readES6/Promise" rel="nofollow noreferrer" target="_blank">Promise&#x672D;&#x8BB0;</a></li><li><a href="https://github.com/MuYunyun/blog/blob/master/BasicSkill/readES6/Generator" rel="nofollow noreferrer" target="_blank">Generator&#x672D;&#x8BB0;</a></li><li><a href="https://github.com/MuYunyun/blog/blob/master/BasicSkill/readES6/Async" rel="nofollow noreferrer" target="_blank">Async&#x672D;&#x8BB0;</a></li></ul><h3 id="articleHeader1">Promise/A+ &#x6838;&#x5FC3;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015444021" src="https://static.alili.tech/img/remote/1460000015444021" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B26;&#x5408; Promise/A+ &#x89C4;&#x8303;&#x7684; promise &#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x4E86;&#x89E3;&#x4E0B; Promise/A+ &#x6838;&#x5FC3;&#xFF0C;&#x60F3;&#x66F4;&#x5168;&#x9762;&#x5730;&#x4E86;&#x89E3;&#x53EF;&#x4EE5;&#x9605;&#x8BFB; <a href="https://segmentfault.com/a/1190000002452115">Promise/A+&#x89C4;&#x8303;</a></p><ul><li>Promise &#x64CD;&#x4F5C;&#x53EA;&#x4F1A;&#x5904;&#x5728; 3 &#x79CD;&#x72B6;&#x6001;&#x7684;&#x4E00;&#x79CD;&#xFF1A;&#x672A;&#x5B8C;&#x6210;&#x6001;(pending)&#x3001;&#x5B8C;&#x6210;&#x6001;(resolved) &#x548C;&#x5931;&#x8D25;&#x6001;(rejected);</li><li>Promise &#x7684;&#x72B6;&#x6001;&#x53EA;&#x4F1A;&#x51FA;&#x73B0;&#x4ECE;&#x672A;&#x5B8C;&#x6210;&#x6001;&#x5411;&#x5B8C;&#x6210;&#x6001;&#x6216;&#x5931;&#x8D25;&#x6001;&#x8F6C;&#x5316;;</li><li>Promise &#x7684;&#x72B6;&#x6001;&#x4E00;&#x65E6;&#x8F6C;&#x5316;&#xFF0C;&#x5C06;&#x4E0D;&#x80FD;&#x88AB;&#x66F4;&#x6539;;</li></ul><h3 id="articleHeader2">repromise api &#x98DF;&#x7528;&#x624B;&#x518C;</h3><h4>Promise.resolve()</h4><p>Promise.resolve() &#x62EC;&#x53F7;&#x5185;&#x6709; 4 &#x79CD;&#x60C5;&#x51B5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8DDF; Promise &#x5BF9;&#x8C61; */
Promise.resolve(Promise.resolve(1))
// Promise&#xA0;{state: &quot;resolved&quot;, data: 1, callbackQueue: Array(0)}

/* &#x8DDF; thenable &#x5BF9;&#x8C61; */
var thenable = {
  then: function(resolve, reject) {
    resolve(1)
  }
}

Promise.resolve(thenable)
// Promise&#xA0;{state: &quot;resolved&quot;, data: 1, callbackQueue: Array(0)}

/* &#x666E;&#x901A;&#x53C2;&#x6570; */
Promise.resolve(1)
// Promise&#xA0;{state: &quot;resolved&quot;, data: 1, callbackQueue: Array(0)}

/* &#x4E0D;&#x8DDF;&#x53C2;&#x6570; */
Promise.resolve()
// Promise&#xA0;{state: &quot;resolved&quot;, data: undefined, callbackQueue: Array(0)}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* &#x8DDF; Promise &#x5BF9;&#x8C61; */</span>
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>))
<span class="hljs-comment">// Promise&#xA0;{state: &quot;resolved&quot;, data: 1, callbackQueue: Array(0)}</span>

<span class="hljs-comment">/* &#x8DDF; thenable &#x5BF9;&#x8C61; */</span>
<span class="hljs-keyword">var</span> thenable = {
  <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-number">1</span>)
  }
}

<span class="hljs-built_in">Promise</span>.resolve(thenable)
<span class="hljs-comment">// Promise&#xA0;{state: &quot;resolved&quot;, data: 1, callbackQueue: Array(0)}</span>

<span class="hljs-comment">/* &#x666E;&#x901A;&#x53C2;&#x6570; */</span>
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
<span class="hljs-comment">// Promise&#xA0;{state: &quot;resolved&quot;, data: 1, callbackQueue: Array(0)}</span>

<span class="hljs-comment">/* &#x4E0D;&#x8DDF;&#x53C2;&#x6570; */</span>
<span class="hljs-built_in">Promise</span>.resolve()
<span class="hljs-comment">// Promise&#xA0;{state: &quot;resolved&quot;, data: undefined, callbackQueue: Array(0)}</span></code></pre><h4>Promise.reject()</h4><p>&#x76F8;&#x8F83;&#x4E8E; Promise.resolve()&#xFF0C;Promise.reject() &#x539F;&#x5C01;&#x4E0D;&#x52A8;&#x5730;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x503C;</p><h4>Promise.all(arr)</h4><p>&#x5BF9;&#x4E8E; Promise.all(arr) &#x6765;&#x8BF4;&#xFF0C;&#x5728;&#x53C2;&#x6570;&#x6570;&#x7EC4;&#x4E2D;&#x6240;&#x6709;&#x5143;&#x7D20;&#x90FD;&#x53D8;&#x4E3A;&#x51B3;&#x5B9A;&#x6001;&#x540E;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x8FD4;&#x56DE;&#x65B0;&#x7684; promise&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE5;&#x4E0B; demo&#xFF0C;&#x8BF7;&#x6C42;&#x4E24;&#x4E2A; url&#xFF0C;&#x5F53;&#x4E24;&#x4E2A;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x8FD4;&#x8FD8;&#x7ED3;&#x679C;&#x540E;&#xFF0C;&#x518D;&#x8BF7;&#x6C42;&#x7B2C;&#x4E09;&#x4E2A; url
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)

Promise.all([p1, p2])
  .then((datas) =&gt; { // &#x6B64;&#x5904; datas &#x4E3A;&#x8C03;&#x7528; p1, p2 &#x540E;&#x7684;&#x7ED3;&#x679C;&#x7684;&#x6570;&#x7EC4;
    return request(`http://some.url.3?a=${datas[0]}&amp;b=${datas[1]}`)
  })
  .then((data) =&gt; {
    console.log(msg)
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4EE5;&#x4E0B; demo&#xFF0C;&#x8BF7;&#x6C42;&#x4E24;&#x4E2A; url&#xFF0C;&#x5F53;&#x4E24;&#x4E2A;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x8FD4;&#x8FD8;&#x7ED3;&#x679C;&#x540E;&#xFF0C;&#x518D;&#x8BF7;&#x6C42;&#x7B2C;&#x4E09;&#x4E2A; url</span>
<span class="hljs-keyword">const</span> p1 = request(<span class="hljs-string">`http://some.url.1`</span>)
<span class="hljs-keyword">const</span> p2 = request(<span class="hljs-string">`http://some.url.2`</span>)

<span class="hljs-built_in">Promise</span>.all([p1, p2])
  .then(<span class="hljs-function">(<span class="hljs-params">datas</span>) =&gt;</span> { <span class="hljs-comment">// &#x6B64;&#x5904; datas &#x4E3A;&#x8C03;&#x7528; p1, p2 &#x540E;&#x7684;&#x7ED3;&#x679C;&#x7684;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">return</span> request(<span class="hljs-string">`http://some.url.3?a=<span class="hljs-subst">${datas[<span class="hljs-number">0</span>]}</span>&amp;b=<span class="hljs-subst">${datas[<span class="hljs-number">1</span>]}</span>`</span>)
  })
  .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(msg)
  })</code></pre><h4>Promise.race(arr)</h4><p>&#x5BF9;&#x4E8E; Promise.race(arr) &#x6765;&#x8BF4;&#xFF0C;&#x53EA;&#x8981;&#x53C2;&#x6570;&#x6570;&#x7EC4;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x53D8;&#x4E3A;&#x51B3;&#x5B9A;&#x6001;&#xFF0C;&#x4FBF;&#x8FD4;&#x56DE;&#x65B0;&#x7684; promise&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// race &#x8BD1;&#x4E3A;&#x7ADE;&#x4E89;&#xFF0C;&#x540C;&#x6837;&#x662F;&#x8BF7;&#x6C42;&#x4E24;&#x4E2A; url&#xFF0C;&#x5F53;&#x4E14;&#x4EC5;&#x5F53;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x8FD4;&#x8FD8;&#x7ED3;&#x679C;&#x540E;&#xFF0C;&#x5C31;&#x8BF7;&#x6C42;&#x7B2C;&#x4E09;&#x4E2A; url
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)

Promise.race([p1, p2])
  .then((data) =&gt; { // &#x6B64;&#x5904; data &#x53D6;&#x8C03;&#x7528; p1, p2 &#x540E;&#x4F18;&#x5148;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;
    return request(`http://some.url.3?value=${data}`)
  })
  .then((data) =&gt; {
    console.log(data)
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// race &#x8BD1;&#x4E3A;&#x7ADE;&#x4E89;&#xFF0C;&#x540C;&#x6837;&#x662F;&#x8BF7;&#x6C42;&#x4E24;&#x4E2A; url&#xFF0C;&#x5F53;&#x4E14;&#x4EC5;&#x5F53;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x8FD4;&#x8FD8;&#x7ED3;&#x679C;&#x540E;&#xFF0C;&#x5C31;&#x8BF7;&#x6C42;&#x7B2C;&#x4E09;&#x4E2A; url</span>
<span class="hljs-keyword">const</span> p1 = request(<span class="hljs-string">`http://some.url.1`</span>)
<span class="hljs-keyword">const</span> p2 = request(<span class="hljs-string">`http://some.url.2`</span>)

<span class="hljs-built_in">Promise</span>.race([p1, p2])
  .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> { <span class="hljs-comment">// &#x6B64;&#x5904; data &#x53D6;&#x8C03;&#x7528; p1, p2 &#x540E;&#x4F18;&#x5148;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;</span>
    <span class="hljs-keyword">return</span> request(<span class="hljs-string">`http://some.url.3?value=<span class="hljs-subst">${data}</span>`</span>)
  })
  .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data)
  })</code></pre><h4>Promise.wrap(fn) &#x2014;&#x2014; &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8F6C; Promise</h4><p>&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;&#xFF0C;&#x63D0;&#x4F9B;&#x56DE;&#x8C03;&#x51FD;&#x6570; Promise &#x5316;&#x7684;&#x601D;&#x8DEF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a, b, cb) {
  ajax(
    `http://some.url?a=${a}&amp;b=${b}`,
    cb
  )
}

foo(1, 2, function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a, b, cb</span>) </span>{
  ajax(
    <span class="hljs-string">`http://some.url?a=<span class="hljs-subst">${a}</span>&amp;b=<span class="hljs-subst">${b}</span>`</span>,
    cb
  )
}

foo(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-built_in">console</span>.log(err)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(data)
  }
})</code></pre><p>&#x5982;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x4F20;&#x7EDF;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x6848;&#x4F8B;&#xFF0C;&#x53EA;&#x8981;&#x4F7F;&#x7528; Promise.wrap() &#x5305;&#x88F9; foo &#x51FD;&#x6570;&#x5C31;&#x5BF9;&#x5176;&#x5B8C;&#x6210;&#x4E86; promise &#x5316;&#xFF0C;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promiseFoo = Promise.wrap(foo)

promiseFoo(1, 2)
  .then((data) =&gt; {
    console.log(data)
  })
  .catch((err) =&gt; {
    console.log(err)
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> promiseFoo = <span class="hljs-built_in">Promise</span>.wrap(foo)

promiseFoo(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
  .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data)
  })
  .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err)
  })</code></pre><p>Promise.wrap &#x7684;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x4E5F;&#x987A;&#x5E26;&#x5217;&#x51FA;&#x6765;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.wrap = function(fn) {
  return funtion() {
    const args = [].slice.call(arguments)
    return new Promise((resolve, reject) =&gt; {
      fn.apply(null, args.concat((err, data) =&gt; {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }))
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.wrap = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> funtion() {
    <span class="hljs-keyword">const</span> args = [].slice.call(<span class="hljs-built_in">arguments</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      fn.apply(<span class="hljs-literal">null</span>, args.concat(<span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (err) {
          reject(err)
        } <span class="hljs-keyword">else</span> {
          resolve(data)
        }
      }))
    })
  }
}</code></pre><h4>then/catch/done</h4><p>&#x8FD9;&#x51E0;&#x4E2A; api &#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5408;&#x8D77;&#x6765;&#x4E00;&#x8D77;&#x5E26;&#x8FC7;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(1)
  .then((data) =&gt; {console.log(data)}, (err) =&gt; {console.log(err)}) // &#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x4E00;&#x4E2A;&#x53C2;&#x6570;(&#x63A8;&#x8350;)&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;
  .catch((err) =&gt; {console.log(err)}) // &#x6355;&#x83B7;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x4E2D;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF; || &#x6355;&#x83B7;&#x53D8;&#x4E3A;&#x5931;&#x8D25;&#x6001;&#x7684;&#x503C;
  .done()                             // &#x80FD;&#x6355;&#x83B7;&#x524D;&#x9762;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x9519;&#x8BEF;(&#x5305;&#x62EC; catch &#x4E2D;)&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x4E5F;&#x53EF;&#x4E0D;&#x4F20;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {<span class="hljs-built_in">console</span>.log(data)}, (err) =&gt; {<span class="hljs-built_in">console</span>.log(err)}) <span class="hljs-comment">// &#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x4E00;&#x4E2A;&#x53C2;&#x6570;(&#x63A8;&#x8350;)&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;</span>
  .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {<span class="hljs-built_in">console</span>.log(err)}) <span class="hljs-comment">// &#x6355;&#x83B7;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x4E2D;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF; || &#x6355;&#x83B7;&#x53D8;&#x4E3A;&#x5931;&#x8D25;&#x6001;&#x7684;&#x503C;</span>
  .done()                             <span class="hljs-comment">// &#x80FD;&#x6355;&#x83B7;&#x524D;&#x9762;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x9519;&#x8BEF;(&#x5305;&#x62EC; catch &#x4E2D;)&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x4E5F;&#x53EF;&#x4E0D;&#x4F20;</span></code></pre><h3 id="articleHeader3">&#x5B9E;&#x8DF5;&#x8FC7;&#x7A0B;&#x603B;&#x7ED3;</h3><h4>&#x5751;&#x70B9; 1&#xFF1A;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;</h4><blockquote>&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF1A;&#x540C;&#x6B65;&#x961F;&#x5217;&#x6267;&#x884C;&#x5B8C;&#x540E;&#xFF0C;&#x5728;&#x6307;&#x5B9A;&#x65F6;&#x95F4;&#x540E;&#x518D;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x961F;&#x5217;&#x7684;&#x5185;&#x5BB9;&#x3002;</blockquote><p>&#x4E4B;&#x6240;&#x4EE5;&#x8981;&#x5355;&#x5217;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF0C;&#x56E0;&#x4E3A;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E0E;&#x5176;&#x606F;&#x606F;&#x76F8;&#x5173;&#xFF0C;&#x6B64;&#x5904;&#x7528; setTimeout &#x6765;&#x6A21;&#x62DF;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF1B;</p><p>&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E2D;&#xFF0C;&#x2460; &#x5904;&#x6267;&#x884C;&#x5B8C;&#x5E76;&#x4E0D;&#x4F1A;&#x9A6C;&#x4E0A;&#x6267;&#x884C; setTimeout() &#x4E2D;&#x7684;&#x4EE3;&#x7801;(&#x2462;)&#xFF0C;&#x800C;&#x662F;&#x6B64;&#x65F6;&#x6709;&#x591A;&#x5C11;&#x6B21; then &#x7684;&#x8C03;&#x7528;&#xFF0C;&#x5C31;&#x4F1A;&#x91CD;&#x65B0;&#x8FDB;&#x5165; &#x2461; &#x5904;&#x591A;&#x5C11;&#x6B21;&#x540E;&#xFF0C;&#x518D;&#x8FDB;&#x5165; &#x2462;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="excuteAsyncCallback(callback, value) {
  const that = this
  setTimeout(function() {
    const res = callback(value) // &#x2462;
    that.excuteCallback(&apos;fulfilled&apos;, res)
  }, 4)
}

then(onResolved, onRejected) {
  const promise = new this.constructor()
  if (this.state !== &apos;PENDING&apos;) {
    const callback = this.state === &apos;fulfilled&apos; ? onResolved : onRejected
    this.excuteAsyncCallback.call(promise, callback, this.data)              // &#x2460;
  } else {
    this.callbackArr.push(new CallbackItem(promise, onResolved, onRejected)) // &#x2461;
  }
  return promise
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">excuteAsyncCallback(callback, value) {
  <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> res = callback(value) <span class="hljs-comment">// &#x2462;</span>
    that.excuteCallback(<span class="hljs-string">&apos;fulfilled&apos;</span>, res)
  }, <span class="hljs-number">4</span>)
}

then(onResolved, onRejected) {
  <span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.constructor()
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state !== <span class="hljs-string">&apos;PENDING&apos;</span>) {
    <span class="hljs-keyword">const</span> callback = <span class="hljs-keyword">this</span>.state === <span class="hljs-string">&apos;fulfilled&apos;</span> ? onResolved : onRejected
    <span class="hljs-keyword">this</span>.excuteAsyncCallback.call(promise, callback, <span class="hljs-keyword">this</span>.data)              <span class="hljs-comment">// &#x2460;</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.callbackArr.push(<span class="hljs-keyword">new</span> CallbackItem(promise, onResolved, onRejected)) <span class="hljs-comment">// &#x2461;</span>
  }
  <span class="hljs-keyword">return</span> promise
}</code></pre><h4>&#x5751;&#x70B9; 2&#xFF1A;this &#x7684;&#x6307;&#x5411;&#x95EE;&#x9898;</h4><p>this.callbackArr.push() &#x4E2D;&#x7684; this &#x6307;&#x5411;&#x7684;&#x662F; &#x2018;&#x4E0A;&#x4E00;&#x4E2A;&#x2019; promise&#xFF0C;&#x6240;&#x4EE5;&#x7C7B; CallbackItem &#x4E2D;&#xFF0C;this.promise &#x5B58;&#x50A8;&#x7684;&#x662F;&apos;&#x4E0B;&#x4E00;&#x4E2A;&apos; promise(then &#x5BF9;&#x8C61;)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Promise {
  ...
  then(onResolved, onRejected) {
    const promise = new this.constructor()
    if (this.state !== &apos;PENDING&apos;) {        // &#x7B2C;&#x4E00;&#x6B21;&#x8FDB;&#x5165; then&#xFF0C;&#x72B6;&#x6001;&#x662F; RESOLVED &#x6216;&#x8005;&#x662F; REJECTED
      const callback = this.state === &apos;fulfilled&apos; ? onResolved : onRejected
      this.excuteAsyncCallback.call(promise, callback, this.data)  // &#x7ED1;&#x5B9A; this &#x5230; promise
    } else {                               // &#x4ECE;&#x7B2C;&#x4E8C;&#x6B21;&#x5F00;&#x59CB;&#x4EE5;&#x540E;&#xFF0C;&#x8FDB;&#x5165; then&#xFF0C;&#x72B6;&#x6001;&#x662F; PENDING
      this.callbackArr.push(new CallbackItem(promise, onResolved, onRejected)) // &#x8FD9;&#x91CC;&#x7684; this &#x4E5F;&#x662F;&#x6307;&#x5411;&#x2018;&#x4E0A;&#x4E00;&#x4E2A;&#x2019; promise
    }
    return promise
  }
  ...
}

class CallbackItem {
  constructor(promise, onResolve, onReject) {
    this.promise = promise // &#x76F8;&#x5E94;&#x5730;&#xFF0C;&#x8FD9;&#x91CC;&#x5B58;&#x50A8;&#x7684; promise &#x662F;&#x6765;&#x81EA;&#x4E0B;&#x4E00;&#x4E2A; then &#x7684;
    this.onResolve = typeof(onResolve) === &apos;function&apos; ? onResolve : (resolve) =&gt; {}
    this.onReject = typeof(onRejected) === &apos;function&apos; ? onRejected : (rejected) =&gt; {}
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Promise</span> </span>{
  ...
  then(onResolved, onRejected) {
    <span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.constructor()
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state !== <span class="hljs-string">&apos;PENDING&apos;</span>) {        <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x6B21;&#x8FDB;&#x5165; then&#xFF0C;&#x72B6;&#x6001;&#x662F; RESOLVED &#x6216;&#x8005;&#x662F; REJECTED</span>
      <span class="hljs-keyword">const</span> callback = <span class="hljs-keyword">this</span>.state === <span class="hljs-string">&apos;fulfilled&apos;</span> ? onResolved : onRejected
      <span class="hljs-keyword">this</span>.excuteAsyncCallback.call(promise, callback, <span class="hljs-keyword">this</span>.data)  <span class="hljs-comment">// &#x7ED1;&#x5B9A; this &#x5230; promise</span>
    } <span class="hljs-keyword">else</span> {                               <span class="hljs-comment">// &#x4ECE;&#x7B2C;&#x4E8C;&#x6B21;&#x5F00;&#x59CB;&#x4EE5;&#x540E;&#xFF0C;&#x8FDB;&#x5165; then&#xFF0C;&#x72B6;&#x6001;&#x662F; PENDING</span>
      <span class="hljs-keyword">this</span>.callbackArr.push(<span class="hljs-keyword">new</span> CallbackItem(promise, onResolved, onRejected)) <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684; this &#x4E5F;&#x662F;&#x6307;&#x5411;&#x2018;&#x4E0A;&#x4E00;&#x4E2A;&#x2019; promise</span>
    }
    <span class="hljs-keyword">return</span> promise
  }
  ...
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CallbackItem</span> </span>{
  <span class="hljs-keyword">constructor</span>(promise, onResolve, onReject) {
    <span class="hljs-keyword">this</span>.promise = promise <span class="hljs-comment">// &#x76F8;&#x5E94;&#x5730;&#xFF0C;&#x8FD9;&#x91CC;&#x5B58;&#x50A8;&#x7684; promise &#x662F;&#x6765;&#x81EA;&#x4E0B;&#x4E00;&#x4E2A; then &#x7684;</span>
    <span class="hljs-keyword">this</span>.onResolve = <span class="hljs-keyword">typeof</span>(onResolve) === <span class="hljs-string">&apos;function&apos;</span> ? onResolve : <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {}
    <span class="hljs-keyword">this</span>.onReject = <span class="hljs-keyword">typeof</span>(onRejected) === <span class="hljs-string">&apos;function&apos;</span> ? onRejected : <span class="hljs-function">(<span class="hljs-params">rejected</span>) =&gt;</span> {}
  }
  ...
}</code></pre><h3 id="articleHeader4">more</h3><p>&#x5B9E;&#x8DF5;&#x7684;&#x66F4;&#x591A;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://github.com/MuYunyun/repromise/tree/master/test" rel="nofollow noreferrer" target="_blank">&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;</a>&#x3002;&#x6709;&#x597D;&#x7684;&#x610F;&#x89C1;&#x6B22;&#x8FCE;&#x4EA4;&#x6D41;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 异步系列 —— Promise 札记

## 原文链接
[https://segmentfault.com/a/1190000015444017](https://segmentfault.com/a/1190000015444017)

