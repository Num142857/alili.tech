---
title: 'Axios实现多个并行请求' 
date: 2018-11-22 2:30:10
hidden: true
slug: eyi0lbtj75w
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x5F00;&#x53D1;&#x80CC;&#x666F;&#xFF1A;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x9879;&#x76EE;&#x9700;&#x6C42;&#x662F;&#x83B7;&#x53D6;&#x6700;&#x8FD1;30&#x5929;&#x7684;&#x987E;&#x5BA2;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x767E;&#x5EA6;&#x667A;&#x5BA2;&#x5BF9;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x4E00;&#x6B21;&#x53EA;&#x80FD;&#x83B7;&#x53D6;&#x67D0;&#x4E00;&#x5929;&#x7684;&#x987E;&#x5BA2;&#x6570;&#x636E;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x9700;&#x8981;&#x53D1;&#x9001;30&#x4E2A;&#x8BF7;&#x6C42;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">  &#x9879;&#x76EE;&#x9700;&#x6C42;&#x662F;&#x83B7;&#x53D6;&#x6700;&#x8FD1;<span class="hljs-number">30</span>&#x5929;&#x7684;&#x987E;&#x5BA2;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x767E;&#x5EA6;&#x667A;&#x5BA2;&#x5BF9;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x4E00;&#x6B21;&#x53EA;&#x80FD;&#x83B7;&#x53D6;&#x67D0;&#x4E00;&#x5929;&#x7684;&#x987E;&#x5BA2;&#x6570;&#x636E;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x9700;&#x8981;&#x53D1;&#x9001;<span class="hljs-number">30</span>&#x4E2A;&#x8BF7;&#x6C42;&#x3002;</code></pre><h3 id="articleHeader1">&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#xFF1A;</h3><p>&#x56E0;&#x4E3A;&#x9879;&#x76EE;&#x662F;&#x7528;axios&#x53D1;&#x9001;http&#x8BF7;&#x6C42;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9996;&#x5148;&#x60F3;&#x5230;&#x4E86;axios&#x7684;&#x65B9;&#x6CD5;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbd7z8?w=408&amp;h=287" src="https://static.alili.tech/img/bVbd7z8?w=408&amp;h=287" alt="concurrent requests" title="concurrent requests" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#xFF1A;</h3><blockquote>&#x8FD9;&#x91CC;&#x7528;<a href="https://jsonplaceholder.typicode.com/" rel="nofollow noreferrer" target="_blank">jsonplaceholder</a>&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;axios&#x5B9E;&#x73B0;&#x5E76;&#x884C;&#x8BF7;&#x6C42;&#x7684;&#x65B9;&#x6CD5;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPosts() {
  // &#x5B58;&#x50A8;&#x6240;&#x6709;http&#x8BF7;&#x6C42;
  let reqList = []
  // &#x5B58;&#x50A8;&#x540E;&#x53F0;&#x54CD;&#x5E94;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;
  let resList = []

  for(let i = 0; i&lt; 30; i++) {
    let req = axios.get(&apos;https://jsonplaceholder.typicode.com/posts/&apos; + (i + 1))
    
    reqList.push(req)
    resList.push((&apos;post&apos; + (i + 1)).replace(/[&apos;]+/g, &apos;&apos;))
  }

  return axios.all(reqList).then(axios.spread(function(...resList) {
    return resList // &#x62FF;&#x5230;&#x6240;&#x6709;posts&#x6570;&#x636E;
  }))
}   

async function renderPage() {
  let posts = await getPosts()
  let docfrag = document.createDocumentFragment()

  for(let i = 0; i&lt; posts.length; i++) {
    if (posts[i] &amp;&amp; posts[i].status === 200) {
      let newLi = document.createElement(&apos;li&apos;)
      
      newLi.innerText = posts[i].data.title
      docfrag.appendChild(newLi)
    }
  }
  document.querySelector(&apos;.posts&apos;).appendChild(docfrag)
}

renderPage()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPosts</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// &#x5B58;&#x50A8;&#x6240;&#x6709;http&#x8BF7;&#x6C42;</span>
  <span class="hljs-keyword">let</span> reqList = []
  <span class="hljs-comment">// &#x5B58;&#x50A8;&#x540E;&#x53F0;&#x54CD;&#x5E94;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</span>
  <span class="hljs-keyword">let</span> resList = []

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i&lt; <span class="hljs-number">30</span>; i++) {
    <span class="hljs-keyword">let</span> req = axios.get(<span class="hljs-string">&apos;https://jsonplaceholder.typicode.com/posts/&apos;</span> + (i + <span class="hljs-number">1</span>))
    
    reqList.push(req)
    resList.push((<span class="hljs-string">&apos;post&apos;</span> + (i + <span class="hljs-number">1</span>)).replace(<span class="hljs-regexp">/[&apos;]+/g</span>, <span class="hljs-string">&apos;&apos;</span>))
  }

  <span class="hljs-keyword">return</span> axios.all(reqList).then(axios.spread(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...resList</span>) </span>{
    <span class="hljs-keyword">return</span> resList <span class="hljs-comment">// &#x62FF;&#x5230;&#x6240;&#x6709;posts&#x6570;&#x636E;</span>
  }))
}   

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderPage</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> posts = <span class="hljs-keyword">await</span> getPosts()
  <span class="hljs-keyword">let</span> docfrag = <span class="hljs-built_in">document</span>.createDocumentFragment()

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i&lt; posts.length; i++) {
    <span class="hljs-keyword">if</span> (posts[i] &amp;&amp; posts[i].status === <span class="hljs-number">200</span>) {
      <span class="hljs-keyword">let</span> newLi = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;li&apos;</span>)
      
      newLi.innerText = posts[i].data.title
      docfrag.appendChild(newLi)
    }
  }
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.posts&apos;</span>).appendChild(docfrag)
}

renderPage()</code></pre><h3 id="articleHeader3">&#x5728;&#x7EBF;&#x793A;&#x4F8B;:</h3><p><a href="https://codepen.io/Tom_chao/pen/WKROzp?editors=1010" rel="nofollow noreferrer" target="_blank">axios&#x5B9E;&#x73B0;&#x591A;&#x4E2A;&#x5E76;&#x884C;&#x8BF7;&#x6C42;</a><button class="btn btn-xs btn-default ml10 preview" data-url="Tom_chao/pen/WKROzp" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Axios实现多个并行请求

## 原文链接
[https://segmentfault.com/a/1190000015719831](https://segmentfault.com/a/1190000015719831)

