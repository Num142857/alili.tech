---
title: 'axios请求超时,设置重新请求的完美解决方法' 
date: 2018-11-29 9:27:39
hidden: true
slug: 17p6ug6ummj
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x81EA;&#x4ECE;&#x4F7F;&#x7528;Vue2&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x4F7F;&#x7528;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;axios&#x7684;&#x63D2;&#x4EF6;&#x6765;&#x8C03;&#x7528;API&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x670D;&#x52A1;&#x5668;&#x6216;&#x8005;&#x7F51;&#x7EDC;&#x4E0D;&#x7A33;&#x5B9A;&#x6389;&#x5305;&#x4E86;, &#x4F60;&#x4EEC;&#x8BE5;&#x5982;&#x4F55;&#x5904;&#x7406;&#x5462;? &#x4E0B;&#x9762;&#x6211;&#x7ED9;&#x4F60;&#x4EEC;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x6211;&#x7684;&#x7ECF;&#x5386;&#x3002;</p>
<h4>&#x5177;&#x4F53;&#x539F;&#x56E0;</h4>
<p>&#x6700;&#x8FD1;&#x516C;&#x53F8;&#x5728;&#x505A;&#x4E00;&#x4E2A;&#x9879;&#x76EE;, &#x670D;&#x52A1;&#x7AEF;&#x6570;&#x636E;&#x63A5;&#x53E3;&#x7528;&#x7684;&#x662F;Php&#x8F93;&#x51FA;&#x7684;API, &#x6709;&#x65F6;&#x5019;&#x5728;&#x8C03;&#x7528;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x5931;&#x8D25;, &#x5728;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x8FB9;&#x663E;&#x793A;Provisional headers are shown&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015157934?w=582&amp;h=131" src="https://static.alili.tech/img/remote/1460000015157934?w=582&amp;h=131" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6309;&#x7167;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x7ED9;&#x51FA;&#x6765;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x89E3;&#x51B3;&#x4E0D;&#x4E86;&#x6211;&#x7684;&#x95EE;&#x9898;.   </p>

<p>&#x6700;&#x8FD1;&#x5728;&#x7814;&#x7A76;AOP&#x8FD9;&#x4E2A;&#x5F00;&#x53D1;&#x7F16;&#x7A0B;&#x7684;&#x6982;&#x5FF5;&#xFF0C;axios&#x5F00;&#x53D1;&#x8BF4;&#x660E;&#x91CC;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#x680F;&#x622A;&#x5668;(axios.Interceptors)&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x79CD;&#x673A;&#x5236;&#xFF0C;&#x964D;&#x4F4E;&#x4EE3;&#x7801;&#x8026;&#x5408;&#x5EA6;&#xFF0C;&#x63D0;&#x9AD8;&#x7A0B;&#x5E8F;&#x7684;&#x53EF;&#x91CD;&#x7528;&#x6027;&#xFF0C;&#x540C;&#x65F6;&#x63D0;&#x9AD8;&#x4E86;&#x5F00;&#x53D1;&#x7684;&#x6548;&#x7387;&#x3002;</p>

<h4>&#x5E26;&#x5751;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E00;</h4>
<p>&#x6211;&#x7684;&#x7ECF;&#x9A8C;&#x6709;&#x9650;&#xFF0C;&#x89C9;&#x5F97;&#x552F;&#x4E00;&#x80FD;&#x505A;&#x7684;&#xFF0C;&#x5C31;&#x662F;axios&#x8BF7;&#x6C42;&#x8D85;&#x65F6;&#x4E4B;&#x540E;&#x505A;&#x4E00;&#x4E2A;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x3002;&#x901A;&#x8FC7;&#x7814;&#x7A76; axios&#x7684;&#x4F7F;&#x7528;&#x8BF4;&#x660E;&#xFF0C;&#x7ED9;&#x5B83;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;timeout = 6000</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.timeout =  6000;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">axios.defaults.timeout =  <span class="hljs-number">6000</span>;</code></pre>
<p>&#x7136;&#x540E;&#x52A0;&#x4E00;&#x4E2A;&#x680F;&#x622A;&#x5668;.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Add a request interceptor</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
    <span class="hljs-comment">// Do something before request is sent</span>
    <span class="hljs-keyword">return</span> config;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// Do something with request error</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-comment">// Add a response interceptor</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// Do something with response data</span>
    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// Do something with response error</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});</code></pre>
<p>&#x8FD9;&#x4E2A;&#x680F;&#x622A;&#x5668;&#x4F5C;&#x7528;&#x662F; &#x5982;&#x679C;&#x5728;&#x8BF7;&#x6C42;&#x8D85;&#x65F6;&#x4E4B;&#x540E;&#xFF0C;&#x680F;&#x622A;&#x5668;&#x53EF;&#x4EE5;&#x6355;&#x6293;&#x5230;&#x4FE1;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x60F3;&#x8981;&#x7528; &#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x3002;</p>
<p>&#x8FD9;&#x91CC;&#x662F;&#x76F8;&#x5173;&#x7684;&#x9875;&#x9762;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$axios.get(url, {params:{load:&apos;noload&apos;"}}").then(function (response) {
    //dosomething();
}).catch(error =&gt; {
    //&#x8D85;&#x65F6;&#x4E4B;&#x540E;&#x5728;&#x8FD9;&#x91CC;&#x6355;&#x6293;&#x9519;&#x8BEF;&#x4FE1;&#x606F;.
    if (error.response) {
        console.log(&apos;error.response&apos;)
        console.log(error.response);
    } else if (error.request) {
        console.log(error.request)
        console.log(&apos;error.request&apos;)
        if(error.request.readyState == 4 &amp;&amp; error.request.status == 0){
            //&#x6211;&#x5728;&#x8FD9;&#x91CC;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;
        }
    } else {
        console.log(&apos;Error&apos;, error.message);
    }
    console.log(error.config);
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.$axios.get(url, {<span class="hljs-attr">params</span>:{<span class="hljs-attr">load</span>:<span class="hljs-string">&apos;noload&apos;</span>"}}").then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">//dosomething();</span>
}).catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-comment">//&#x8D85;&#x65F6;&#x4E4B;&#x540E;&#x5728;&#x8FD9;&#x91CC;&#x6355;&#x6293;&#x9519;&#x8BEF;&#x4FE1;&#x606F;.</span>
    <span class="hljs-keyword">if</span> (error.response) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error.response&apos;</span>)
        <span class="hljs-built_in">console</span>.log(error.response);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (error.request) {
        <span class="hljs-built_in">console</span>.log(error.request)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error.request&apos;</span>)
        <span class="hljs-keyword">if</span>(error.request.readyState == <span class="hljs-number">4</span> &amp;&amp; error.request.status == <span class="hljs-number">0</span>){
            <span class="hljs-comment">//&#x6211;&#x5728;&#x8FD9;&#x91CC;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;</span>
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Error&apos;</span>, error.message);
    }
    <span class="hljs-built_in">console</span>.log(error.config);
});</code></pre>

<p>&#x8D85;&#x65F6;&#x4E4B;&#x540E;, &#x62A5;&#x51FA; Uncaught (in promise) Error: timeout of  xxx ms exceeded&#x7684;&#x9519;&#x8BEF;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015157935?w=646&amp;h=67" src="https://static.alili.tech/img/remote/1460000015157935?w=646&amp;h=67" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5728; catch&#x90A3;&#x91CC;&#xFF0C;&#x5B83;&#x8FD4;&#x56DE;&#x7684;&#x662F;error.request&#x9519;&#x8BEF;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x5728;&#x8FD9;&#x91CC;&#x505A; retry&#x7684;&#x529F;&#x80FD;,  &#x7ECF;&#x8FC7;&#x6D4B;&#x8BD5;&#x662F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x7684;&#x529F;&#x529F;&#x80FD;&#xFF0C; &#x867D;&#x7136;&#x80FD;&#x591F;&#x5B9E;&#x73B0; &#x8D85;&#x65F6;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x5F88;&#x9EBB;&#x70E6;&#xFF0C;&#x9700;&#x8981;&#x6BCF;&#x4E00;&#x4E2A;&#x8BF7;API&#x7684;&#x9875;&#x9762;&#x91CC;&#x8FB9;&#x8981;&#x8BBE;&#x7F6E;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015157936?w=486&amp;h=359" src="https://static.alili.tech/img/remote/1460000015157936?w=486&amp;h=359" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x770B;&#x4E0A;&#x9762;&#xFF0C;&#x6211;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x6709;&#x51E0;&#x5341;&#x4E2A;.vue &#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x8981;&#x53BB;&#x8BBE;&#x7F6E;&#x8D85;&#x65F6;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x90A3;&#x6211;&#x8981;&#x75AF;&#x6389;&#x7684;. </p>
<p>&#x800C;&#x4E14;&#x8FD9;&#x4E2A;&#x673A;&#x5236;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x4E25;&#x91CD;&#x7684;bug&#xFF0C;&#x5C31;&#x662F;&#x88AB;&#x8BF7;&#x6C42;&#x7684;&#x94FE;&#x63A5;&#x5931;&#x6548;&#x6216;&#x5176;&#x4ED6;&#x539F;&#x56E0;&#x9020;&#x6210;&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x4E2A;&#x673A;&#x5236;&#x5931;&#x6548;&#x4E86;&#xFF0C;&#x5B83;&#x4E0D;&#x4F1A;&#x7B49;&#x5F85;&#x6211;&#x8BBE;&#x5B9A;&#x7684;6&#x79D2;&#xFF0C;&#x800C;&#x4E14;&#x4E00;&#x76F4;&#x5728;&#x5237;&#xFF0C;&#x4E00;&#x79D2;&#x79CD;&#x8BF7;&#x6C42;&#x51E0;&#x5341;&#x6B21;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x5C31;&#x628A;&#x670D;&#x52A1;&#x5668;&#x641E;&#x57AE;&#x4E86;&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x56FE;, &#x4E00;&#x7728;&#x773C;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5B83;&#x5C31;&#x8BF7;&#x6C42;&#x4E86;146&#x6B21;&#x3002;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015157937?w=1059&amp;h=247" src="https://static.alili.tech/img/remote/1460000015157937?w=1059&amp;h=247" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>&#x5E26;&#x5751;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E8C;</h4>
<p>&#x7814;&#x7A76;&#x4E86;axios&#x7684;&#x6E90;&#x4EE3;&#x7801;&#xFF0C;&#x8D85;&#x65F6;&#x540E;,  &#x4F1A;&#x5728;&#x62E6;&#x622A;&#x5668;&#x90A3;&#x91CC; axios.interceptors.response &#x6355;&#x6293;&#x5230;&#x9519;&#x8BEF;&#x4FE1;&#x606F;,  &#x4E14; error.code = &quot;ECONNABORTED&quot;&#xFF0C;&#x5177;&#x4F53;&#x94FE;&#x63A5;</p>
<p><a href="https://github.com/axios/axios/blob/26b06391f831ef98606ec0ed406d2be1742e9850/lib/adapters/xhr.js#L95-L101" rel="nofollow noreferrer" target="_blank">https://github.com/axios/axio...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError(&apos;timeout of &apos; + config.timeout + &apos;ms exceeded&apos;, config, &apos;ECONNABORTED&apos;,
        request));

      // Clean up request
      request = null;
    };" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// Handle timeout</span>
    request.ontimeout = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleTimeout</span>(<span class="hljs-params"></span>) </span>{
      reject(createError(<span class="hljs-string">&apos;timeout of &apos;</span> + config.timeout + <span class="hljs-string">&apos;ms exceeded&apos;</span>, config, <span class="hljs-string">&apos;ECONNABORTED&apos;</span>,
        request));

      <span class="hljs-comment">// Clean up request</span>
      request = <span class="hljs-literal">null</span>;
    };</code></pre>
<p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x7684;&#x5168;&#x5C40;&#x8D85;&#x65F6;&#x91CD;&#x65B0;&#x83B7;&#x53D6;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x8FD9;&#x6837;&#x7684;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.interceptors.response.use(function(response){
....
}, function(error){
    var originalRequest = error.config;
    if(error.code == &apos;ECONNABORTED&apos; &amp;&amp; error.message.indexOf(&apos;timeout&apos;)!=-1 &amp;&amp; !originalRequest._retry){
            originalRequest._retry = true
            return axios.request(originalRequest);
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
....
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-keyword">var</span> originalRequest = error.config;
    <span class="hljs-keyword">if</span>(error.code == <span class="hljs-string">&apos;ECONNABORTED&apos;</span> &amp;&amp; error.message.indexOf(<span class="hljs-string">&apos;timeout&apos;</span>)!=<span class="hljs-number">-1</span> &amp;&amp; !originalRequest._retry){
            originalRequest._retry = <span class="hljs-literal">true</span>
            <span class="hljs-keyword">return</span> axios.request(originalRequest);
    }
});</code></pre>
<p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5F97;&#x65B0;&#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x6709;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;1&#x662F;&#x5B83;&#x53EA;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;1&#x6B21;&#xFF0C;&#x5982;&#x679C;&#x518D;&#x8D85;&#x65F6;&#x7684;&#x8BDD;&#xFF0C;&#x5B83;&#x5C31;&#x505C;&#x6B62;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x8BF7;&#x6C42;&#x3002;&#x7B2C;2&#x4E2A;&#x95EE;&#x9898;&#x662F;&#xFF0C;&#x6211;&#x5728;&#x6BCF;&#x4E2A;&#x6709;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#x7684;&#x9875;&#x9762;&#x90A3;&#x91CC;&#xFF0C;&#x505A;&#x4E86;&#x8BB8;&#x591A;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982; this.$axios.get(url).then&#x4E4B;&#x540E;&#x64CD;&#x4F5C;&#x3002;</p>
<h4>&#x5B8C;&#x7F8E;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;</h4>
<p>&#x4EE5;AOP&#x7F16;&#x7A0B;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x9700;&#x8981;&#x7684;&#x662F;&#x4E00;&#x4E2A; &#x8D85;&#x65F6;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x7684;&#x5168;&#x5C40;&#x529F;&#x80FD;&#xFF0C; &#x8981;&#x5728;axios.Interceptors&#x4E0B;&#x529F;&#x592B;&#xFF0C;&#x5728;github&#x7684;axios&#x7684;issue&#x627E;&#x4E86;&#x522B;&#x4EBA;&#x7684;&#x4E00;&#x4E9B;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF0C;&#x7EC8;&#x4E8E;&#x627E;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x5B8C;&#x7F8E;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x3002;</p>
<p><a href="https://github.com/axios/axios/issues/164#issuecomment-327837467" rel="nofollow noreferrer" target="_blank">https://github.com/axios/axio...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5728;main.js&#x8BBE;&#x7F6E;&#x5168;&#x5C40;&#x7684;&#x8BF7;&#x6C42;&#x6B21;&#x6570;&#xFF0C;&#x8BF7;&#x6C42;&#x7684;&#x95F4;&#x9699;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we&apos;ve maxed out the total number of retries
    if(config.__retryCount &gt;= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5728;main.js&#x8BBE;&#x7F6E;&#x5168;&#x5C40;&#x7684;&#x8BF7;&#x6C42;&#x6B21;&#x6570;&#xFF0C;&#x8BF7;&#x6C42;&#x7684;&#x95F4;&#x9699;</span>
axios.defaults.retry = <span class="hljs-number">4</span>;
axios.defaults.retryDelay = <span class="hljs-number">1000</span>;

axios.interceptors.response.use(<span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">axiosRetryInterceptor</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">var</span> config = err.config;
    <span class="hljs-comment">// If config does not exist or the retry option is not set, reject</span>
    <span class="hljs-keyword">if</span>(!config || !config.retry) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
    
    <span class="hljs-comment">// Set the variable for keeping track of the retry count</span>
    config.__retryCount = config.__retryCount || <span class="hljs-number">0</span>;
    
    <span class="hljs-comment">// Check if we&apos;ve maxed out the total number of retries</span>
    <span class="hljs-keyword">if</span>(config.__retryCount &gt;= config.retry) {
        <span class="hljs-comment">// Reject with the error</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
    }
    
    <span class="hljs-comment">// Increase the retry count</span>
    config.__retryCount += <span class="hljs-number">1</span>;
    
    <span class="hljs-comment">// Create new promise to handle exponential backoff</span>
    <span class="hljs-keyword">var</span> backoff = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            resolve();
        }, config.retryDelay || <span class="hljs-number">1</span>);
    });
    
    <span class="hljs-comment">// Return the promise in which recalls axios to retry the request</span>
    <span class="hljs-keyword">return</span> backoff.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> axios(config);
    });
});</code></pre>
<p>&#x5176;&#x4ED6;&#x7684;&#x90A3;&#x4E2A;&#x51E0;&#x5341;&#x4E2A;.vue&#x9875;&#x9762;&#x7684; this.$axios&#x7684;get &#x548C;post &#x7684;&#x65B9;&#x6CD5;&#x6839;&#x672C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x53BB;&#x4FEE;&#x6539;&#x5B83;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x8C22;&#x8C22;jooger&#x7ED9;&#x4E88;&#x5927;&#x91CF;&#x7684;&#x6280;&#x672F;&#x652F;&#x6301;&#xFF0C;&#x8FD9;&#x662F;&#x4ED6;&#x7684;&#x4E2A;&#x4EBA;&#x4FE1;&#x606F; <a href="https://github.com/jo0ger" rel="nofollow noreferrer" target="_blank">https://github.com/jo0ger</a> &#xFF0C; &#x8C22;&#x8C22;&#x3002;</p>
<p>&#x4EE5;&#x4E0B;&#x662F;&#x6211;&#x505A;&#x7684;&#x4E00;&#x4E2A;&#x8BD5;&#x9A8C;&#x3002;&#x3002;&#x628A;axios.defaults.retryDelay = 500, &#x8BF7;&#x6C42; www.facebook.com</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015157938?w=834&amp;h=206" src="https://static.alili.tech/img/remote/1460000015157938?w=834&amp;h=206" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5982;&#x6709;&#x66F4;&#x597D;&#x7684;&#x5EFA;&#x8BAE;&#xFF0C;&#x8BF7;&#x544A;&#x8BC9;&#x6211;&#xFF0C;&#x8C22;&#x8C22;&#x3002;</p>
<p><a href="https://github.com/ssttm169/use-axios-well" rel="nofollow noreferrer" target="_blank">github&#x6E90;&#x4EE3;&#x7801;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios请求超时,设置重新请求的完美解决方法

## 原文链接
[https://segmentfault.com/a/1190000015157929](https://segmentfault.com/a/1190000015157929)

