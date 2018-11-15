---
title: axios基于常见业务场景的二次封装
hidden: true
categories: reprint
slug: cab82713
date: 2018-11-08 02:30:09
---

{{< raw >}}
<h2 id="articleHeader0">axios</h2><p><a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">axios</a> &#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; promise &#x7684; HTTP &#x5E93;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x548C; node.js &#x4E2D;&#x3002;<br>&#x5728;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x4E2D;&#x7684;&#x5E94;&#x7528;&#x4E5F;&#x662F;&#x7279;&#x522B;&#x5E7F;&#x6CDB;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;vue&#x8FD8;&#x662F;react&#xFF0C;&#x90FD;&#x6709;&#x5F88;&#x591A;&#x9879;&#x76EE;&#x7528;axios&#x4F5C;&#x4E3A;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5E93;&#x3002;<br>&#x6211;&#x5728;&#x6700;&#x8FD1;&#x7684;&#x51E0;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x90FD;&#x6709;&#x4F7F;&#x7528;axios&#xFF0C;&#x5E76;&#x57FA;&#x4E8E;axios&#x6839;&#x636E;&#x5E38;&#x89C1;&#x7684;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;request&#x670D;&#x52A1;&#x3002;</p><p><strong>&#x4E1A;&#x52A1;&#x573A;&#x666F;&#xFF1A;</strong></p><ol><li>&#x5168;&#x5C40;&#x8BF7;&#x6C42;&#x914D;&#x7F6E;&#x3002;</li><li>get,post,put,delete&#x7B49;&#x8BF7;&#x6C42;&#x7684;promise&#x5C01;&#x88C5;&#x3002;</li><li>&#x5168;&#x5C40;&#x8BF7;&#x6C42;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;</li><li>&#x53D6;&#x6D88;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&#x3002;</li><li>&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x53D6;&#x6D88;&#x5F53;&#x524D;&#x9875;&#x9762;&#x8BF7;&#x6C42;&#x3002;</li><li>&#x8BF7;&#x6C42;&#x643A;&#x5E26;token&#xFF0C;&#x6743;&#x9650;&#x9519;&#x8BEF;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x3002;</li></ol><h2 id="articleHeader1">&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</h2><hr><p>&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.timeout = 10000 //&#x8D85;&#x65F6;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;
axios.defaults.headers.post[&apos;Content-Type&apos;] = &apos;application/json;charset=UTF-8&apos;
axios.defaults.baseURL = process.env.BASE_URL //&#x6302;&#x8F7D;&#x5728;process&#x4E0B;&#x7684;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#xFF0C;&#x5728;&#x6211;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6709;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.timeout</span> = <span class="hljs-number">10000</span> <span class="hljs-comment">//&#x8D85;&#x65F6;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;</span>
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span><span class="hljs-selector-class">.post</span>[<span class="hljs-string">&apos;Content-Type&apos;</span>] = <span class="hljs-string">&apos;application/json;charset=UTF-8&apos;</span>
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.baseURL</span> = process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.BASE_URL</span> <span class="hljs-comment">//&#x6302;&#x8F7D;&#x5728;process&#x4E0B;&#x7684;&#x73AF;&#x5883;&#x5E38;&#x91CF;&#xFF0C;&#x5728;&#x6211;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6709;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;</span></code></pre><p><a href="https://segmentfault.com/a/1190000014899779">&#x5982;&#x4F55;&#x5B9A;&#x4E49;&#x591A;&#x73AF;&#x5883;&#x5E38;&#x91CF;</a></p><hr><p>&#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#xFF08;&#x975E;&#x5E38;&#x89C1;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#xFF0C;&#x4EC5;&#x4F5C;&#x4ECB;&#x7ECD;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x8BBE;&#x7F6E;&#x914D;&#x7F6E;&#x7684;&#x9ED8;&#x8BA4;&#x503C;
var instance = axios.create({
  baseURL: &apos;https://api.another.com&apos;
});
// &#x5728;&#x5B9E;&#x4F8B;&#x5DF2;&#x521B;&#x5EFA;&#x540E;&#x4FEE;&#x6539;&#x9ED8;&#x8BA4;&#x503C;
instance.defaults.headers.common[&apos;Authorization&apos;] = AUTH_TOKEN;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smali"><code>// &#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x8BBE;&#x7F6E;&#x914D;&#x7F6E;&#x7684;&#x9ED8;&#x8BA4;&#x503C;
var<span class="hljs-built_in"> instance </span>= axios.create({
  baseURL: &apos;https://api.another.com&apos;
});
// &#x5728;&#x5B9E;&#x4F8B;&#x5DF2;&#x521B;&#x5EFA;&#x540E;&#x4FEE;&#x6539;&#x9ED8;&#x8BA4;&#x503C;
instance.defaults.headers.common[&apos;Authorization&apos;] = AUTH_TOKEN;</code></pre><p>&#x4F18;&#x5148;&#x7EA7;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E; &gt; &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</p><h1 id="articleHeader2">&#x8BF7;&#x6C42;&#x53CA;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;</h1><p>&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x53CA;&#x53D6;&#x6D88;&#x91CD;&#x590D;&#x8BF7;&#x6C42;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BF7;&#x6C42;&#x5217;&#x8868;
const requestList = []
// &#x53D6;&#x6D88;&#x5217;&#x8868;
const CancelToken = axios.CancelToken
let sources = {}
axios.interceptors.request.use((config) =&gt; {
  //&#x5C06;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x53CA;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x8BF7;&#x6C42;
  const request = JSON.stringify(config.url) + JSON.stringify(config.data)
  config.cancelToken = new CancelToken((cancel) =&gt; {
    sources[request] = cancel
  })
  //1.&#x5224;&#x65AD;&#x8BF7;&#x6C42;&#x662F;&#x5426;&#x5DF2;&#x5B58;&#x5728;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&#xFF0C;&#x5C06;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x6DFB;&#x52A0;&#x8FDB;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x6570;&#x7EC4;&#xFF1B;
  requestList.includes(request) ? sources[request](&apos;&#x53D6;&#x6D88;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&apos;) : requestList.push(request)
  //2.&#x8BF7;&#x6C42;&#x5F00;&#x59CB;&#xFF0C;&#x6539;&#x53D8;loading&#x72B6;&#x6001;&#x4F9B;&#x52A0;&#x8F7D;&#x52A8;&#x753B;&#x4F7F;&#x7528;
  store.dispatch(&apos;changeGlobalState&apos;, {loading: true})
  //3.&#x4ECE;store&#x4E2D;&#x83B7;&#x53D6;token&#x5E76;&#x6DFB;&#x52A0;&#x5230;&#x8BF7;&#x6C42;&#x5934;&#x4F9B;&#x540E;&#x7AEF;&#x4F5C;&#x6743;&#x9650;&#x6821;&#x9A8C;
  const token = store.getters.userInfo.token
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x8BF7;&#x6C42;&#x5217;&#x8868;</span>
<span class="hljs-keyword">const</span> requestList = []
<span class="hljs-comment">// &#x53D6;&#x6D88;&#x5217;&#x8868;</span>
<span class="hljs-keyword">const</span> CancelToken = axios.CancelToken
<span class="hljs-keyword">let</span> sources = {}
axios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
  <span class="hljs-comment">//&#x5C06;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x53CA;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x8BF7;&#x6C42;</span>
  <span class="hljs-keyword">const</span> request = <span class="hljs-built_in">JSON</span>.stringify(config.url) + <span class="hljs-built_in">JSON</span>.stringify(config.data)
  config.cancelToken = <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function">(<span class="hljs-params">cancel</span>) =&gt;</span> {
    sources[request] = cancel
  })
  <span class="hljs-comment">//1.&#x5224;&#x65AD;&#x8BF7;&#x6C42;&#x662F;&#x5426;&#x5DF2;&#x5B58;&#x5728;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#xFF0C;&#x907F;&#x514D;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&#xFF0C;&#x5C06;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x6DFB;&#x52A0;&#x8FDB;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x6570;&#x7EC4;&#xFF1B;</span>
  requestList.includes(request) ? sources[request](<span class="hljs-string">&apos;&#x53D6;&#x6D88;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&apos;</span>) : requestList.push(request)
  <span class="hljs-comment">//2.&#x8BF7;&#x6C42;&#x5F00;&#x59CB;&#xFF0C;&#x6539;&#x53D8;loading&#x72B6;&#x6001;&#x4F9B;&#x52A0;&#x8F7D;&#x52A8;&#x753B;&#x4F7F;&#x7528;</span>
  store.dispatch(<span class="hljs-string">&apos;changeGlobalState&apos;</span>, {<span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>})
  <span class="hljs-comment">//3.&#x4ECE;store&#x4E2D;&#x83B7;&#x53D6;token&#x5E76;&#x6DFB;&#x52A0;&#x5230;&#x8BF7;&#x6C42;&#x5934;&#x4F9B;&#x540E;&#x7AEF;&#x4F5C;&#x6743;&#x9650;&#x6821;&#x9A8C;</span>
  <span class="hljs-keyword">const</span> token = store.getters.userInfo.token
  <span class="hljs-keyword">if</span> (token) {
    config.headers.token = token
  }
  <span class="hljs-keyword">return</span> config
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})</code></pre><p>1.&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x5C06;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x6DFB;&#x52A0;&#x8FDB;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x53D8;&#x91CF;&#xFF0C;&#x4E3A;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x53CA;loading&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x505A;&#x51C6;&#x5907;&#xFF1B;&#x5F53;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x5DF2;&#x5B58;&#x5728;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x5219;&#x4E0D;&#x54CD;&#x5E94;&#x8BE5;&#x8BF7;&#x6C42;&#x3002;<br>2.&#x8BF7;&#x6C42;&#x4E00;&#x65E6;&#x5F00;&#x59CB;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x542F;&#x52A8;&#x753B;&#x52A0;&#x8F7D;&#x6548;&#x679C;&#x3002;<br>3.&#x7528;&#x6237;&#x767B;&#x5F55;&#x540E;&#x53EF;&#x4EE5;&#x5728;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;&#x643A;&#x5E26;token&#x505A;&#x6743;&#x9650;&#x6821;&#x9A8C;&#x4F7F;&#x7528;&#x3002;</p><hr><p>&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.interceptors.response.use(function (response) {
  // 1.&#x5C06;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x4E2D;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x4E2D;&#x5220;&#x9664;
  const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
  requestList.splice(requestList.findIndex(item =&gt; item === request), 1)
  // 2.&#x5F53;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x4E3A;&#x7A7A;&#x65F6;&#xFF0C;&#x66F4;&#x6539;loading&#x72B6;&#x6001;
  if (requestList.length === 0) {
    store.dispatch(&apos;changeGlobalState&apos;, {loading: false})
  }
  // 3.&#x7EDF;&#x4E00;&#x5904;&#x7406;&#x6743;&#x9650;&#x8BA4;&#x8BC1;&#x9519;&#x8BEF;&#x7BA1;&#x7406;
  if (response.data.code === 900401) {
    window.ELEMENT.Message.error(&apos;&#x8BA4;&#x8BC1;&#x5931;&#x6548;&#xFF0C;&#x8BF7;&#x91CD;&#x65B0;&#x767B;&#x5F55;&#xFF01;&apos;, 1000)
    router.push(&apos;/login&apos;)
  }
  return response
}, function (error) {
  // 4.&#x5904;&#x7406;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;
  if (axios.isCancel(error)) {
    requestList.length = 0
    store.dispatch(&apos;changeGlobalState&apos;, {loading: false})
    throw new axios.Cancel(&apos;cancel request&apos;)
  } else {
    // 5.&#x5904;&#x7406;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;
    window.ELEMENT.Message.error(&apos;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&apos;, 1000)
  }
  return Promise.reject(error)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
  <span class="hljs-comment">// 1.&#x5C06;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x4E2D;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x4E2D;&#x5220;&#x9664;</span>
  <span class="hljs-keyword">const</span> request = <span class="hljs-built_in">JSON</span>.stringify(response.config.url) + <span class="hljs-built_in">JSON</span>.stringify(response.config.data)
  requestList.splice(requestList.findIndex(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === request), <span class="hljs-number">1</span>)
  <span class="hljs-comment">// 2.&#x5F53;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x4E3A;&#x7A7A;&#x65F6;&#xFF0C;&#x66F4;&#x6539;loading&#x72B6;&#x6001;</span>
  <span class="hljs-keyword">if</span> (requestList.length === <span class="hljs-number">0</span>) {
    store.dispatch(<span class="hljs-string">&apos;changeGlobalState&apos;</span>, {<span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>})
  }
  <span class="hljs-comment">// 3.&#x7EDF;&#x4E00;&#x5904;&#x7406;&#x6743;&#x9650;&#x8BA4;&#x8BC1;&#x9519;&#x8BEF;&#x7BA1;&#x7406;</span>
  <span class="hljs-keyword">if</span> (response.data.code === <span class="hljs-number">900401</span>) {
    <span class="hljs-built_in">window</span>.ELEMENT.Message.error(<span class="hljs-string">&apos;&#x8BA4;&#x8BC1;&#x5931;&#x6548;&#xFF0C;&#x8BF7;&#x91CD;&#x65B0;&#x767B;&#x5F55;&#xFF01;&apos;</span>, <span class="hljs-number">1000</span>)
    router.push(<span class="hljs-string">&apos;/login&apos;</span>)
  }
  <span class="hljs-keyword">return</span> response
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// 4.&#x5904;&#x7406;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;</span>
  <span class="hljs-keyword">if</span> (axios.isCancel(error)) {
    requestList.length = <span class="hljs-number">0</span>
    store.dispatch(<span class="hljs-string">&apos;changeGlobalState&apos;</span>, {<span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>})
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> axios.Cancel(<span class="hljs-string">&apos;cancel request&apos;</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 5.&#x5904;&#x7406;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;</span>
    <span class="hljs-built_in">window</span>.ELEMENT.Message.error(<span class="hljs-string">&apos;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&apos;</span>, <span class="hljs-number">1000</span>)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})</code></pre><p>1.&#x54CD;&#x5E94;&#x8FD4;&#x56DE;&#x540E;&#x5C06;&#x76F8;&#x5E94;&#x7684;&#x8BF7;&#x6C42;&#x4ECE;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x4E2D;&#x5220;&#x9664;<br>2.&#x5F53;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x4E3A;&#x7A7A;&#x65F6;&#xFF0C;&#x5373;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x7ED3;&#x675F;&#xFF0C;&#x52A0;&#x8F7D;&#x52A8;&#x753B;&#x7ED3;&#x675F;<br>3.&#x6743;&#x9650;&#x8BA4;&#x8BC1;&#x62A5;&#x9519;&#x7EDF;&#x4E00;&#x62E6;&#x622A;&#x5904;&#x7406;<br>4.&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x5904;&#x7406;&#x9700;&#x8981;&#x7ED3;&#x5408;&#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x8BF4;&#x660E;<br>5.&#x7531;&#x4E8E;&#x9879;&#x76EE;&#x540E;&#x7AEF;&#x5E76;&#x6CA1;&#x6709;&#x91C7;&#x7528;RESTful&#x98CE;&#x683C;&#x7684;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#xFF0C;200&#x4EE5;&#x5916;&#x90FD;&#x5F52;&#x4E3A;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;</p><h1 id="articleHeader3">promise&#x5C01;&#x88C5;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = function (url, params, config, method) {
  return new Promise((resolve, reject) =&gt; {
    axios[method](url, params, Object.assign({}, config)).then(response =&gt; {
      resolve(response.data)
    }, err =&gt; {
      if (err.Cancel) {
        console.log(err)
      } else {
        reject(err)
      }
    }).catch(err =&gt; {
      reject(err)
    })
  })
}

const post = (url, params, config = {}) =&gt; {
  return request(url, params, config, &apos;post&apos;)
}

const get = (url, params, config = {}) =&gt; {
  return request(url, params, config, &apos;get&apos;)
}
//3.&#x5BFC;&#x51FA;cancel token&#x5217;&#x8868;&#x4F9B;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x4F7F;&#x7528;
export {sources, post, get}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> request = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url, params, config, method</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios[method](url, params, <span class="hljs-built_in">Object</span>.assign({}, config)).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
      resolve(response.data)
    }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (err.Cancel) {
        <span class="hljs-built_in">console</span>.log(err)
      } <span class="hljs-keyword">else</span> {
        reject(err)
      }
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      reject(err)
    })
  })
}

<span class="hljs-keyword">const</span> post = <span class="hljs-function">(<span class="hljs-params">url, params, config = {}</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> request(url, params, config, <span class="hljs-string">&apos;post&apos;</span>)
}

<span class="hljs-keyword">const</span> <span class="hljs-keyword">get</span> = <span class="hljs-function">(<span class="hljs-params">url, params, config = {}</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> request(url, params, config, <span class="hljs-string">&apos;get&apos;</span>)
}
<span class="hljs-comment">//3.&#x5BFC;&#x51FA;cancel token&#x5217;&#x8868;&#x4F9B;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x4F7F;&#x7528;</span>
<span class="hljs-keyword">export</span> {sources, post, <span class="hljs-keyword">get</span>}</code></pre><p>1.axios cancel token API<br>2.&#x5B58;&#x5165;&#x9700;&#x8981;&#x53D6;&#x6D88;&#x7684;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x5BFC;&#x51FA;&#x7ED9;&#x5BFC;&#x822A;&#x5B88;&#x536B;&#x4F7F;&#x7528;<br>3.&#x8DEF;&#x7531;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x53D6;&#x6D88;&#x5F53;&#x524D;&#x9875;&#x9762;&#x8FD8;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x5728;&#x590D;&#x6742;&#x7684;&#x9875;&#x9762;&#x4E2D;&#x8BF7;&#x6C42;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#xFF0C;&#x589E;&#x52A0;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x8BA9;&#x9875;&#x9762;&#x5207;&#x6362;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x5361;&#x987F;&#x3002;<br>/src/router.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
import { sources } from &apos;../service/request&apos;
...
router.beforeEach((to, from, next) =&gt; {
  document.title = to.meta.title || to.name
    //&#x8DEF;&#x7531;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x53D6;&#x6D88;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;
  Object.keys(sources).forEach(item =&gt; {
    sources[item](&apos;&#x53D6;&#x6D88;&#x524D;&#x9875;&#x9762;&#x8BF7;&#x6C42;&apos;)
  })
  for (var key in sources) {
    delete sources[key]
  }
  next()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>...
<span class="hljs-keyword">import</span> { sources } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../service/request&apos;</span>
...
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-built_in">document</span>.title = to.meta.title || to.name
    <span class="hljs-comment">//&#x8DEF;&#x7531;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x53D6;&#x6D88;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;</span>
  <span class="hljs-built_in">Object</span>.keys(sources).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    sources[item](<span class="hljs-string">&apos;&#x53D6;&#x6D88;&#x524D;&#x9875;&#x9762;&#x8BF7;&#x6C42;&apos;</span>)
  })
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> sources) {
    <span class="hljs-keyword">delete</span> sources[key]
  }
  next()
})</code></pre><h1 id="articleHeader4">request.js&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#xFF1A;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

// &#x5F15;&#x5165;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5E93; https://github.com/axios/axios

import axios from &apos;axios&apos;
import store from &apos;../store&apos;
import router from &apos;../router&apos;

// &#x8BF7;&#x6C42;&#x5217;&#x8868;
const requestList = []
// &#x53D6;&#x6D88;&#x5217;&#x8868;
const CancelToken = axios.CancelToken
let sources = {}

// axios.defaults.timeout = 10000
axios.defaults.headers.post[&apos;Content-Type&apos;] = &apos;application/json;charset=UTF-8&apos;

axios.defaults.baseURL = process.env.BASE_URL

axios.interceptors.request.use((config) =&gt; {
  const request = JSON.stringify(config.url) + JSON.stringify(config.data)

  config.cancelToken = new CancelToken((cancel) =&gt; {
    sources[request] = cancel
  })

  requestList.includes(request) ? sources[request](&apos;&#x53D6;&#x6D88;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&apos;) : requestList.push(request)

  store.dispatch(&apos;changeGlobalState&apos;, {loading: true})

  const token = store.getters.userInfo.token
  if (token) {
    config.headers.token = token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
  requestList.splice(requestList.findIndex(item =&gt; item === request), 1)
  if (requestList.length === 0) {
    store.dispatch(&apos;changeGlobalState&apos;, {loading: false})
  }
  if (response.data.code === 900401) {
    window.ELEMENT.Message.error(&apos;&#x8BA4;&#x8BC1;&#x5931;&#x6548;&#xFF0C;&#x8BF7;&#x91CD;&#x65B0;&#x767B;&#x5F55;&#xFF01;&apos;, 1000)
    router.push(&apos;/login&apos;)
  }
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    requestList.length = 0
    store.dispatch(&apos;changeGlobalState&apos;, {loading: false})
    throw new axios.Cancel(&apos;cancel request&apos;)
  } else {
    window.ELEMENT.Message.error(&apos;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&apos;, 1000)
  }
  return Promise.reject(error)
})

const request = function (url, params, config, method) {
  return new Promise((resolve, reject) =&gt; {
    axios[method](url, params, Object.assign({}, config)).then(response =&gt; {
      resolve(response.data)
    }, err =&gt; {
      if (err.Cancel) {
        console.log(err)
      } else {
        reject(err)
      }
    }).catch(err =&gt; {
      reject(err)
    })
  })
}

const post = (url, params, config = {}) =&gt; {
  return request(url, params, config, &apos;post&apos;)
}

const get = (url, params, config = {}) =&gt; {
  return request(url, params, config, &apos;get&apos;)
}

export {sources, post, get}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="javascript"><span class="hljs-comment">// &#x5F15;&#x5165;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5E93; https://github.com/axios/axios</span>

<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../store&apos;</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../router&apos;</span>

<span class="hljs-comment">// &#x8BF7;&#x6C42;&#x5217;&#x8868;</span>
<span class="hljs-keyword">const</span> requestList = []
<span class="hljs-comment">// &#x53D6;&#x6D88;&#x5217;&#x8868;</span>
<span class="hljs-keyword">const</span> CancelToken = axios.CancelToken
<span class="hljs-keyword">let</span> sources = {}

<span class="hljs-comment">// axios.defaults.timeout = 10000</span>
axios.defaults.headers.post[<span class="hljs-string">&apos;Content-Type&apos;</span>] = <span class="hljs-string">&apos;application/json;charset=UTF-8&apos;</span>

axios.defaults.baseURL = process.env.BASE_URL

axios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> request = <span class="hljs-built_in">JSON</span>.stringify(config.url) + <span class="hljs-built_in">JSON</span>.stringify(config.data)

  config.cancelToken = <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function">(<span class="hljs-params">cancel</span>) =&gt;</span> {
    sources[request] = cancel
  })

  requestList.includes(request) ? sources[request](<span class="hljs-string">&apos;&#x53D6;&#x6D88;&#x91CD;&#x590D;&#x8BF7;&#x6C42;&apos;</span>) : requestList.push(request)

  store.dispatch(<span class="hljs-string">&apos;changeGlobalState&apos;</span>, {<span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>})

  <span class="hljs-keyword">const</span> token = store.getters.userInfo.token
  <span class="hljs-keyword">if</span> (token) {
    config.headers.token = token
  }

  <span class="hljs-keyword">return</span> config
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})

axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">const</span> request = <span class="hljs-built_in">JSON</span>.stringify(response.config.url) + <span class="hljs-built_in">JSON</span>.stringify(response.config.data)
  requestList.splice(requestList.findIndex(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === request), <span class="hljs-number">1</span>)
  <span class="hljs-keyword">if</span> (requestList.length === <span class="hljs-number">0</span>) {
    store.dispatch(<span class="hljs-string">&apos;changeGlobalState&apos;</span>, {<span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>})
  }
  <span class="hljs-keyword">if</span> (response.data.code === <span class="hljs-number">900401</span>) {
    <span class="hljs-built_in">window</span>.ELEMENT.Message.error(<span class="hljs-string">&apos;&#x8BA4;&#x8BC1;&#x5931;&#x6548;&#xFF0C;&#x8BF7;&#x91CD;&#x65B0;&#x767B;&#x5F55;&#xFF01;&apos;</span>, <span class="hljs-number">1000</span>)
    router.push(<span class="hljs-string">&apos;/login&apos;</span>)
  }
  <span class="hljs-keyword">return</span> response
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-keyword">if</span> (axios.isCancel(error)) {
    requestList.length = <span class="hljs-number">0</span>
    store.dispatch(<span class="hljs-string">&apos;changeGlobalState&apos;</span>, {<span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>})
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> axios.Cancel(<span class="hljs-string">&apos;cancel request&apos;</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">window</span>.ELEMENT.Message.error(<span class="hljs-string">&apos;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&apos;</span>, <span class="hljs-number">1000</span>)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})

<span class="hljs-keyword">const</span> request = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url, params, config, method</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios[method](url, params, <span class="hljs-built_in">Object</span>.assign({}, config)).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
      resolve(response.data)
    }, err =&gt; {
      <span class="hljs-keyword">if</span> (err.Cancel) {
        <span class="hljs-built_in">console</span>.log(err)
      } <span class="hljs-keyword">else</span> {
        reject(err)
      }
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      reject(err)
    })
  })
}

<span class="hljs-keyword">const</span> post = <span class="hljs-function">(<span class="hljs-params">url, params, config = {}</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> request(url, params, config, <span class="hljs-string">&apos;post&apos;</span>)
}

<span class="hljs-keyword">const</span> get = <span class="hljs-function">(<span class="hljs-params">url, params, config = {}</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> request(url, params, config, <span class="hljs-string">&apos;get&apos;</span>)
}

<span class="hljs-keyword">export</span> {sources, post, get}

</span></code></pre><p>&#x4EE5;&#x4E0A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios基于常见业务场景的二次封装

## 原文链接
[https://segmentfault.com/a/1190000016474460](https://segmentfault.com/a/1190000016474460)

